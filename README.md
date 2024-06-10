<div align="center">
 <h1 style="font-size: larger;"> RENTIFY - Where Renting Meets Simplicity </h1>
 
</div>

## Overview

**Rentify** is a web application designed to simplify the rental process for both property owners and tenants. In the post-pandemic world, the demand for real estate has surged, especially in cities with high populations and IT offices. RENTIFY aims to bridge the gap between property owners and tenants by providing a platform where they can easily connect based on their requirements. 

Deployed Link : https://rentify--app.vercel.app/

## Technologies Used

- **Frontend** : React JS, Chakra UI
- **Backend** :  Node JS, Express JS, REST-API, MongoDB Database, JWT
- **Additional** : Axios, React-router, EmailJS


## Features

### User Authentication

- **Sign in**: Buyer/Seller can sign in with their details.
- **Login**: Buyer/Seller can log in to the application.

### Property Management

- **Add Property**: Logged-in seller can add a new property.
- **Search Properties**: Allows Buyer/Seller to search property by location.
- **View Properties**: All buyers can view the list of available properties.
- **View Property Details**: Logged-in buyers can view detailed information about a property.
- **My Properties**: Logged-in sellers can view, update, and delete their properties.
- **Like Property**: Logged-in Buyers can like a property.
- **Email Notification**: Buyer and seller receives details of Buyer/Seller through email, when a buyer clicks "I'm Interested" button.

## API Endpoints

### Buyer APIs

- **POST : /buyer/register**: Register a Buyer.
- **POST : /buyer/login**: Log in a Buyer.

### Seller APIs

- **POST : /seller/register**: Register a Seller.
- **POST : /seller/login**: Log in a Seller.

### Property APIs

- **POST : /getItemsfromSeller**: Add a new property.
- **GET : /showItemsToBuyer**: Get all properties.
- **GET : /showItemsToSeller/:id**: Get propeties of user.
- **PUT  : /getItemsfromSeller**: Update property details.
- **DELETE : /deleteItem/:id/delete**: Delete a property.

## Contribution
Contributions are welcome! If you have any suggestions, improvements, or would like to contribute to any of the projects, feel free to open an issue or submit a pull request.
