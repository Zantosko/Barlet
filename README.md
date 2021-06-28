# Barlet

## Description

This is a social media app that is mix of Twitter and Yelp, but with an emphasis on bars/pubs. Key features of this project include rendering nearest bar locations using React-Google-Maps, photo uploads to the server using Multer, and incorporating an infinite scroll using the Intersection Observer API. This is only version 1, future updates coming soon.

## Links

<a href='https://zachary-antosko.medium.com/barlet-551e0d650ed1'>Medium Article</a>

<a href='https://youtu.be/C5_SngzzMrE'>Demo Video</a>

## Wire-framing

<p align='center'>
  <img src='client/src/assets/screenshots/FrontendMap.png' height='300' width='300'/>
</p>

<p align='center'>
  <img src='client/src/assets/screenshots/DatabaseMap.png' height='300' width='300'/>
</p>

## Screenshots

<p align='center'>
  <img src='client/src/assets/screenshots/Home.png' height='300' width='300'/>
</p>
<p align='center'>
  <img src='client/src/assets/screenshots/LiveFeed.png' height='300' width='300'/>
</p>
<p align='center'>
  <img src='client/src/assets/screenshots/Profile.png' height='300' width='300'/>
</p>

## Website Color Palette

<p align='center'>
  <img src='client/src/assets/screenshots/ColorPalette.png' height='400' width='500'/>
</p>

## Key Features

- **Find closest bars in your area** - This feature allows a user find the closest 20 bars in their area. By default the map radius is set to the Houston area, but if user clicks on the compass icon it will find their current location (must have location enabled on browser) and find the closest 20 bars to them. Users also have the option to scroll away from the set radius or zoom in and out. Once this occurs the map component will re-render a new set of bars based on the given radius.

- **Infinite Scroll** - Like any other social media application a user can submit posts/reviews and scroll through them. Instead of creating multiple pages for each set of posts, an infinite scroll was implemented to fetch the next set of posts (paginate) once a certain intersection point is reached. The last post will then trigger a reference and callback a function to either increment page number or stop anymore posts from being displayed on the page if all posts are shown.

- **Image Uploading** - This allows a user change their profile pic to any picture on their local machine (file extension limited to specific types: .jpg, .jpeg, .png) (max file size allowed is 1.5MB).

## Technologies Used

**Client Side**:

- React/Redux
- React Router
- Styled Components
- React Toastify
- Font Awesome
- Antd Design Library
- React Player
- React Google Maps API

**Server Side**:

- Node.js
- Express.js
- JSON Web Token (JWT)
- PostgreSQL
- Sequelize
- Bcrypt
- Multer

**NPM Packages**:

`Client`:

- “react-redux”: “^7.2.4”
- “react-router-dom”: “^5.2.0”
- “react-scripts”: “4.0.3”
- “react-toastify”: “^7.0.4”
- “redux”: “^4.1.0”
- “redux-logger”: “^3.0.6”
- “styled-components”: “^5.3.0”
- “@ant-design/icons”: “^4.6.2”
- “@fortawesome/fontawesome-svg-core”: “^1.2.35”
- “@fortawesome/free-solid-svg-icons”: “^5.15.3”
- “@fortawesome/react-fontawesome”: “^0.1.14”
- “@react-google-maps/api”: “^2.2.0”
- “react-player”: “^2.9.0”

`Server`:

- “bcrypt”: “^5.0.1”
- “cors”: “^2.8.5”
- “dotenv”: “^10.0.0”
- “express”: “^4.17.1”
- “jsonwebtoken”: “^8.5.1”
- “sequelize”: “^6.6.2”
- “sequelize-cli”: “^6.2.0”
- “multer”: “^1.4.2”
- “pg”: “^8.6.0”

## Challenges

1. Creating custom hamburger menu and having it render at a certain break-point.
2. Deciding when it was appropriate store a state variable in the Redux store or just store it in local state.
3. Having the make the decision to not use Formik for form submission. It was taking up too much time.
4. Working with Google Maps API was very difficult and it took up the most time in this project. The biggest challenge of setting it up was allowing geo-location search while also allowing a user to freely scroll way and render new results.
5. Found a notable bug, while working on the live-feed feature I noticed that all posts and reviews would all show that they belonged to the logged in user. To get around this I made a new end point that will check user-ID of the post and render its proper owner.
6. Infinite scroll feature was also very difficult to implement. At first I was planning to use React-Infinite-Scroll-Component, but it didn’t work well with how I paginated my database. So I then decided to implement it manually using the Intersection Observer API along with React Hooks (useState, useEffect, useRef, useCallback).
7. There was a learning curve when it came to using Multer for photo uploads. I had to learn how to properly store them on the back-end and how to access them from the front-end.

## What was Learned?

- Became more familiar with the useRef and useCallback hooks and when it's appropriate to implement them.
- Gained an overall better understanding of the Google Maps API and how use it in React.
- Was able to successfully implement Intersection Observer API and Geolocation API.
- Learned how to upload photos and store them on the server using Multer. I also learned how to access multer uploads from the front-end.
- Learned how to manulally setup an infinite scroll and paginate a database.
- Figured out that it's possible to conditionally set props on React components.
