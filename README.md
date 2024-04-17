# Firebase Auth Starter Template for Mobile Web Applications

by Moses Atia Poston

[Live Website](https://house-marketplace-m-a.netlify.app/)

## Description

The House Marketplace web application is a full-featured platform that allows users to explore, rent, and offer properties. This project was developed following Brad Traversy's comprehensive course on Udemy, ensuring best practices in web development and Firebase integration. The app is seamlessly deployed through Netlify, demonstrating modern deployment practices.

## Features

- **Property Listings**: Users can browse houses for rent or sale, providing a rich interface with detailed descriptions.
- **User Authentication**: Leverages Firebase for secure user registration and authentication.
- **Image Storage**: Integrates Firebase Storage for image uploads, enabling users to add visuals to their listings.
- **Responsive Design**: Crafted for an optimal mobile web experience but scales gracefully to larger screens.
- **Real-time Data**: Utilizes Firebase Firestore for real-time data storage and retrieval.
- **Email and Password Authentication**: Secure registration and sign-in processes for users.
- **Google OAuth**: Offers an alternative sign-in option using Google accounts.
- **Password Recovery**: Functionality to assist users in recovering their accounts.
- **Profile Management**: Users can update their personal details.
- **Data and Image Storage**: Utilizes Firebase Firestore for storing user data and images.

## Deployment

The application is deployed on Netlify, with continuous deployment set up to listen for changes on the main branch. Environment variables are used to securely incorporate API keys and Firebase configuration without exposing them to the public repository.

## Firebase / Firestore Setup

To integrate Firebase and Firestore into your project, follow the detailed instructions provided by Brad Traversy on his GitHub page:

[Set up Firebase Firestore](https://gist.github.com/bradtraversy/caab8ebd8ff4b6e947632887e0183761)

These instructions will guide you through creating a Firebase project, configuring Firestore, and integrating it with this template.

## Configuration

Included in this repository is an example configuration file (`example.newFirebase.config.js`) containing placeholders for your Firebase project's API keys and other necessary information. Rename this file to `newFirebase.config.js` and replace the placeholders with your actual Firebase project details to connect your application to Firebase services.

## Getting Started

1. **Clone the Repository**: Begin by cloning this template repository to your local machine or use it as a template to create a new GitHub repository.
2. **Install Dependencies**: Navigate to the project directory and run `npm install` to install required dependencies.
3. **Configure Firebase**: Follow the Firebase / Firestore setup guide linked above, and update the `newFirebase.config.js` file with your project's specific configurations.
4. **Launch the Application**: Run `npm start` to launch the application. Navigate to the displayed URL in your browser to view and test the authentication.
5. **Environment Variables**: Set up the required environment variables for Firebase and Google API in Netlify as described in the Netlify documentation. - Set up your `.env` file with the necessary environment variables for local development.

```
REACT_APP_GOOGLE_API_TOKEN = "your googleApi token here"
REACT_APP_GOOGLE_API_URL = "https://maps.googleapis.com/maps/api/geocode/json"
```

## License

This project is licensed under the MIT License - see the LICENSE.md file for details.

## Acknowledgments

- A special thanks to Brad Traversy for providing the Firebase Firestore setup guide that aids in the configuration process of this template.

Happy coding!
