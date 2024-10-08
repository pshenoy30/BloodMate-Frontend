# Project Title

## Overview

Blood Bank Management System:
Create a streamlined and efficient process to facilate secure and organized management of blood donations

### Problem
- Useful in emergency situations
- Improve the efficient in retrieving blood products 
- Shorten the turnaround timing for locating sites

### User Profile

- Used by all who: 
    - blood donors
    - in need of blood donors
- Will be used on mobile

### Features

### Blood Donors:
- Donor will be able to locate the nearest site for donation 

### Blood Requestor:
- Requestor will be able to put a request for blood

## Implementation

### Tech Stack

- React
- MongoDB
- NodeJS
- Mongoose
- ExpressJS

### APIs

- googleMaps API
- googlePlaces API
- gooleRoutes API

### Sitemap

### Page 1:
- Choose if you are a donor or a requestor
### Page 2: Donor
- See the nearest blood donation sites
### Page 2: Requestor
- See the nearest blood donor to your site

### Mockups

- The site is designed to be used for mobile screens at 370px

### Donor Route
| Step     | Description                                        | Image                                                                                         |
| :----:   |    :----:                                          |     :---:                                                                                     |
| 1        | First Screen Page                                  | <img src="/Mockups/Main Page.png" width=395 height=580>                                       |
| 2        | Get the location of the donor                      | <img src="/Mockups/Donor Site Location.png" width=395 height=580>                             |
| 3        | Showing all the near donor sites                   | <img src="/Mockups/Getting the donor sites near the donor location.png" width=395 height=580> |
| 4        | Showing the route to the nearest donation site     | <img src="/Mockups/Route to the nearest donor location.png" width=395 height=580>             |
| 5        | Showing the information of the donor site on click | <img src="/Mockups/infomation of donor site.png" width=395 height=580>                        |
| 6        | Showing the timing of clicked donation site        | <img src="/Mockups//donor site timing.png" width=395 height=580>                              |
| 7        | Page not found                                     | <img src="/Mockups/404 page.png" width=395 height=580>                                        |


### Requestor Route
| Step     | Description                                        | Image                                                                                         |
| :----:   |    :----:                                          |     :---:                                                                                     |
| 1        | First Screen Page                                  | <img src="/Mockups/Main Page.png" width=395 height=580>                                       |
| 2        | Get the location of the requestor                  | <img src="/Mockups/Retrieve the location of the requestor.png" width=395 height=580>          |
| 3        | Showing all the nearby donors                      | <img src="Mockups/All the donors who are in the given location.png" width=395 height=580>     |
| 4        | Information of the donor selected                  | <img src="/Mockups/Information of the donor selected.png" width=395 height=580>               |
| 5        | Page not found                                     | <img src="/Mockups/404 page.png" width=395 height=580>                                        |

### Data

- Data of all the donations with info
- Data of all the blood donor in the network 

### Endpoints

### Donor Route
GET request from the backend to get the list of the nearby locations based on the given address \
Google Maps API request to get the map based on the address 
Google Maps API request to get the route to the nearest donor site \
Google Maps API request to get markers on the map \
Google Maps API request to show address suggestions 

### Requestor Route
GET request from the backend to show all the donors based on the location

### Auth

Does your project include any login or user profile functionality? If so, describe how authentication/authorization will be implemented.

## Roadmap

:white_check_mark: Create mock data for users who will be either donors or requestors \
:white_check_mark: Scrape the canadian blood services website to get information for all the donation sites \
:white_check_mark: Create mick data for the inventory based on the donation dite id \
:white_check_mark: Implement schemas for based on the 3 datasets for MongoDB  \
:white_check_mark: Implement seeding for based on the 3 datasets for MongoDB  \
:white_check_mark: Implement the server requests for each of the databases  \
:white_check_mark: Implement with the GoogleMaps API to display all the donation sites based on the location \
:white_check_mark: Implement with the GooglePlaces API to autocomplete addresses \
:white_check_mark: Implement Steps 1-7 based on the mockup for donor route \
:white_check_mark: Implement Steps 2-4 based on the mockup for requestor route \

## Nice-to-haves

Your project will be marked based on what you committed to in the above document. Under nice-to-haves, you can list any additional features you may complete if you have extra time, or after finishing.

:white_check_mark: Message to show no donor available \
:white_check_mark: Direction to the locations \
:thought_balloon: Authentication for the blood donors \
:thought_balloon: Authenticated uses will be able to fill the form on the go \
:thought_balloon: Check for if the user is above the age of 18 \
:thought_balloon: Notification for the blood donors to remind them to donot blood \
:thought_balloon: Donor will be able to see the sites that are in urgent need of blood \
:thought_balloon: The ability for the requestor to email the donor directly \
:thought_balloon: Reaching out to a donor based on their schedule \
:thought_balloon: Pop up for no nearby donor site locations 

