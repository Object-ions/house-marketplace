import { useEffect, useState } from 'react';
import {
  collection,
  getDocs,
  query,
  where,
  orderBy,
  limit,
  startAfter,
} from 'firebase/firestore';
import { db } from '../newFirebase.config';
import { toast } from 'react-toastify';
import Spinner from '../components/Spinner';
import ListingItem from '../components/ListingItem';

const Offers = () => {
  const [listings, setListings] = useState(null);
  const [loading, setLoading] = useState(true);
  const [lastFetchedListing, setLastFetchedListing] = useState(null);

  useEffect(() => {
    const fetchListings = async () => {
      try {
        // Get a reference
        const listingsRef = collection(db, 'listings');

        // Create a query
        const q = query(
          listingsRef,
          where('offer', '==', true),
          orderBy('timestamp', 'desc'),
          limit(10)
        );

        // Execute the query
        const querySnap = await getDocs(q);

        // Pagination
        const lastVisible = querySnap.docs[querySnap.docs.length - 1];
        setLastFetchedListing(lastVisible);

        let listings = [];

        querySnap.forEach((doc) => {
          // console.log(doc.data());
          return listings.push({
            id: doc.id,
            data: doc.data(),
          });
        });

        setListings(listings);
        setLoading(false);
      } catch (error) {
        toast.error("Couldn't find listings");
      }
    };

    fetchListings();
  }, []);

   // Load more (pagination)
   const onFetchMoreListings = async () => {
    try {
      // Get a reference
      const listingsRef = collection(db, 'listings');

      // Create a query
      const q = query(
        listingsRef,
        where('offer', '===', true),
        orderBy('timestamp', 'desc'),
        startAfter(lastFetchedListing),
        
        // How many more listings to add in the new fetch
        limit(10)
      );

      // Execute the query
      const querySnap = await getDocs(q);

      // Pagination
      const lastVisible = querySnap.docs[querySnap.docs.length - 1]
      setLastFetchedListing(lastVisible)

      const listings = []

      querySnap.forEach((doc) => {
        return listings.push({
          id: doc.id,
          data: doc.data(),
        })
      })

      // If we want to keep adding 10 more listings and not replce them then we need to spread across the previous state
      setListings((prevState) => [...prevState, ...listings])
      setLoading(false)
    } catch (error) {
      toast.error('Could not fetch listings')
    }
  };


  return (
    <div className="category">
      <header>
        <p className="pageHeader">Offers</p>
      </header>

      {loading ? (
        <Spinner />
      ) : listings && listings.length > 0 ? (
        <>
          <main>
            <ul className="categoryListings">
              {listings.map((listing) => (
                <ListingItem
                  listing={listing.data}
                  id={listing.id}
                  key={listing.id}
                />
              ))}
            </ul>
          </main>


          <br />
          <br />

          {lastFetchedListing && (
            <p className="loadMore" onClick={onFetchMoreListings}>Load More</p>
          )}
        </>
      ) : (
        <p>There are not current offers</p>
      )}
    </div>
  );
};

export default Offers;
