# Project Title

## Overview

What is your app? Brief description in a couple of sentences.
Blood Bank Management System:
Create a streamlined and efficient process to facilate secure and organized management of blood donations

### Problem

Why is your app needed? Background information around any pain points or other reasons.
- useful in emergency situations
- improve the efficient in retrieving blood products 
- shorten the turnaround timing for locating sites

### User Profile

Who will use your app? How will they use it? Any special considerations that your app must take into account.
- used by all who: 
    - blood donors
    - in need of blood donors
- will be used on mobile

### Features

List the functionality that your app will include. These can be written as user stories or descriptions with related details. Do not describe _how_ these features are implemented, only _what_ needs to be implemented.

### Blood Donors:
- Donor will be able to locate the nearest site for donation

### Blood Requestor:
- Requestor will be able to put a request for blood

## Implementation

### Tech Stack

List technologies that will be used in your app, including any libraries to save time or provide more functionality. Be sure to research any potential limitations.
- React
- MongoDB
- NodeJS
- Mongoose
- ExpressJS

### APIs

List any external sources of data that will be used in your app.
- googleMaps api

### Sitemap

List the pages of your app with brief descriptions. You can show this visually, or write it out.
### Page 1:
- Choose if you are a donor or a requestor
### Page 2: Donor
- See the nearest blood donation sites
### Page 2: Requestor
- See the nearest blood donor to your site

### Mockups

Provide visuals of your app's screens. You can use tools like Figma or pictures of hand-drawn sketches.

### Data

Describe your data and the relationships between them. You can show this visually using diagrams, or write it out. 
- Data of all the hospitals in Ontario with blood bank info
- Data of all the blood donor in the network 

### Endpoints

List endpoints that your server will implement, including HTTP methods, parameters, and example responses.

GET request from the API to get the list of the nearby locations

### Auth

Does your project include any login or user profile functionality? If so, describe how authentication/authorization will be implemented.

## Roadmap

Scope your project as a sprint. Break down the tasks that will need to be completed and map out timeframes for implementation. Think about what you can reasonably complete before the due date. The more detail you provide, the easier it will be to build.

- Work with the GoogleMaps API to get the locations of all the hospitals
- Learn and try MongoDB to create a dataset
- Work on creating mockup of the mobile pages
- work on the implementing the server to get data from database
- work on implement pages 1-3

## Nice-to-haves

Your project will be marked based on what you committed to in the above document. Under nice-to-haves, you can list any additional features you may complete if you have extra time, or after finishing.

- Authentication for the blood donors
- Authenticated uses will be able to fill the form on the go
- Check for if the user is above the age of 18
- Notification for the blood donors to remind them to donot blood
- Donor will be able to see the sites that are in urgent need of blood
- The ability for the requestor to call/message the donor directly
- Reaching out to a donor based on their schedule
- Reviewing donors by the requestors
- Direction to the locations
