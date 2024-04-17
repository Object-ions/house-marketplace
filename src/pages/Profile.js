import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { getAuth, updateProfile } from 'firebase/auth';
import { db } from '../newFirebase.config';
import { updateDoc, doc, collection, getDocs, query, where, orderBy, deleteDoc } from 'firebase/firestore';
import { toast } from 'react-toastify';
import arrowRight from '../assets/svg/keyboardArrowRightIcon.svg';
import homeIcon from '../assets/svg/homeIcon.svg';
import ListingItem from '../components/ListingItem';

const Profile = () => {
  const auth = getAuth();
  const [loading, setLoading] = useState(true);
  const [listings, setListings] = useState(null);
  const [changeDetails, setChangeDetails] = useState(false);
  const [formData, setFormData] = useState({
    name: auth.currentUser.displayName,
    email: auth.currentUser.email,
  });

  const { name, email } = formData;

  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserListings = async () => {
      const listingsRef = collection(db, 'listings')

      const q = query(
        listingsRef,
        where('userRef', '==', auth.currentUser.uid),
        orderBy('timestamp', 'desc')
      )

      const querySnap = await getDocs(q)

      let listings = []

      querySnap.forEach((doc) => {
        return listings.push({
          id: doc.id,
          data: doc.data(),
        })
      })

      setListings(listings)
      console.log(listings)
      setLoading(false)
    }

    fetchUserListings()
  }, [auth.currentUser.uid])

  const onLogOut = () => {
    auth.signOut();
    navigate('/');
  };

  const onSubmit = async () => {
    try {
      // Check if the display name has changed
      /*
      Before attempting any updates, the function checks if the user's display name (auth.currentUser.displayName) is different from the name entered in the form (name). 
      */
      if (auth.currentUser.displayName !== name) {
        // Update display name in Fire Base
        /*
        If the name has changed, the function first updates the user's display name in Firebase Authentication. updateProfile is a Firebase Authentication method that updates the profile information of the user. It takes two arguments: the user object (auth.currentUser) and an object with the profile fields you want to update ({ displayName: name })
        */
        await updateProfile(auth.currentUser, {
          displayName: name,
        });

        // Update in Fire Store
        /*
        Next, the function updates the user's name in Firestore. To do this, it first creates a reference to the user's document in Firestore using doc. The doc function requires the database instance (db), the collection name ('users'), and the document ID, which is the user's UID (auth.currentUser.uid).

        With this reference (userRef), updateDoc is then used to update the document. updateDoc takes two arguments: the document reference and an object with the fields to update ({ name: name }). This operation is also awaited.
        */

        const userRef = doc(db, 'users', auth.currentUser.uid);
        await updateDoc(userRef, {
          name: name,
        });
      }
      // Error handling
      /*
    If any errors occur during the try block execution (either in updating the Firebase Authentication profile or the Firestore document), the catch block catches these errors. The catch block pops a message using Toastify
    */
    } catch (error) {
      toast.error('Error updating profile');
      console.log(error);
    }
  };

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.id]: e.target.value,
    }));
  };

  const onDelete = async (listingId) => {
    if (window.confirm('are you sure you want to delete?')) {
      // Get a reference for the listing using its id to remove from db
      const listingRef = doc(db, 'listings', listingId);

      // Remove listing from DB
      await deleteDoc(listingRef);

      // Filter the deleted listing out
      const updatedListings = listings.filter((listing) => listing.id !== listingId);

      // Update state to show current listings list after deleting the item (Delete from the UI)
      setListings(updatedListings);
      toast.success('Listing deleted successfully');
    }
  }

  const onEdit = (listingId) => navigate(`/edit-listing/${listingId}`);

  return (
    <>
      <div className="profile">
        <header className="profileHeader">
          <p className="pageHeader">My Profile</p>
          <button className="logOut" type="button" onClick={onLogOut}>
            Log Out
          </button>
        </header>

        <main>
          <div className="profileDetailsHeader">
            <p className="profileDetailsText">Personal Details</p>
            <p
              className="changePersonalDetails"
              onClick={() => {
                changeDetails && onSubmit();
                setChangeDetails((prevState) => !prevState);
              }}
            >
              {changeDetails ? 'done' : 'change'}
            </p>
          </div>

          <div className="profileCard">
            <form>
              <input
                type="text"
                id="name"
                className={!changeDetails ? 'profileName' : 'profileNameActive'}
                disabled={!changeDetails}
                value={name}
                onChange={onChange}
              />
              <input
                type="text"
                id="email"
                className={
                  !changeDetails ? 'profileEmail' : 'profileEmailActive'
                }
                disabled={!changeDetails}
                value={email}
                onChange={onChange}
              />
            </form>
          </div>

          <Link to="/create-listing" className="createListing">
            <img src={homeIcon} alt="home" />
            <p>Sell or rent your home</p>
            <img src={arrowRight} alt="arrow right" />
          </Link>

          {!loading && listings?.length > 0 && (
            <>
              <p className="listingText">Your Listings:</p>
              <ul className="listingsList">
                {listings.map((listing) => (
                  <ListingItem key={listing.id} listing={listing.data} id={listing.id} onDelete={() => onDelete(listing.id)} onEdit={() => onEdit(listing.id)}/>
                ))}
              </ul>
            </>
          )}
        </main>
      </div>
    </>
  );
};

export default Profile;
