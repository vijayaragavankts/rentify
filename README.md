<div align="center">
 <h1 style="font-size: larger;"> RENTIFY - Where Renting Meets Simplicity </h1>
 
</div>

## Overview

**Rentify** is a web application designed to simplify the rental process for both property owners and tenants. In the post-pandemic world, the demand for real estate has surged, especially in cities with high populations and IT offices. RENTIFY aims to bridge the gap between property owners and tenants by providing a platform where they can easily connect based on their requirements.


## Technologies Used

- **Frontend** : React JS, Chakra UI
- **Backend** :  Node JS, Express JS, REST-API, MongoDB Database, JWT
- **Additional ** : Axios, React-router, EmailJS


## Features

### User Authentication

- **Sign in**: Users can sign in with their details.
- **Login**: Users can log in to the application.

### Property Management

- **Add Property**: Logged-in users can add a new property.
- **Search Properties**: Allows user to search property by location.
- **View Properties**: All users can view the list of available properties.
- **View Property Details**: Logged-in users can view detailed information about a property.
- **My Properties**: Logged-in users can view, update, and delete their properties.

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
