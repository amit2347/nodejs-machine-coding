## Introduction
Thank you for this opportunity.

Please refer to the Postman Collection attached inside this repo for the API Endpoints. Its payload and responses.

Please follow the below steps to clone this repo and get it running :
1. Install necessary dependancies.
   * [Node Js](https://nodejs.org/en/download)
   * [SQLITE Studio](https://sqlitestudio.pl/) - This is an optional dependancy for you to view the schema and DB Rows.
   * [Postman](https://www.postman.com/downloads/) - To interact with the server

2. Once dependancies are installed , open a terminal inside this project and run ```npm install```
3. You can finally run the server using ```node index.js```

To view the main API :
1. Hit ```/auth/login``` API with
   ```
   {
    "emailId" : "amitsampat.patil@gmail.com",
    "password" : "Admin@123"
   }
   ```
   OR Sample cURL
   ```
   curl --location 'localhost:3000/api/user/schedule?dayNo=16' \
   --header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE3Mzk3MDkwMTMsInVzZXJJZCI6MSwiaWF0IjoxNzM5NzA1NDEzfQ.Q8rvxuVKp-GXeYD98EDfp-3iMz57HXaO7eLFm43snu0'
   ```
2. Copy the token to the clipboard.
3. Paste it inside the Authorisation -> Bearer Token Section of the ```/api/user/schedule``` Endpoint . Add ```dayNo``` as per your    wish in params of the API.
   Sample cURL
   ```
   curl --location 'localhost:3000/api/user/schedule?dayNo=16' \
   --header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE3Mzk3MDkwMTMsInVzZXJJZCI6MSwiaWF0IjoxNzM5NzA1NDEzfQ.Q8rvxuVKp-GXeYD98EDfp-3iMz57HXaO7eLFm43snu0'
   ```
## Description 
Tech Stack Used : NodeJs , ExpressJs , SQLite3

Simple ER Digram to illustrate my table structure : 

![ER Digram](./ER-Diagram/mermaid-ER-Digram.svg)
Some features : 
* Added middleware to protect our main route. It is not accessible unless the user is authenticated.
* Added two routes -> ```auth/signUp``` and ```auth/login``` for authentication purposes.
* Added a route -> ```activity/status/:id``` as POST to update the status of the activity.This API would serve whenever the user clicks on the tick mark.
* The color coding of the buttons can be determined by the Client based on the frequency.
* The "Maximise" as seen on screen 1 is stored as 9999 Hours/Day in the DB. I have made changes to the response to tackle this case. This case can be tackled by the client too but made it from our side to be readily served by client.
* I had a little conflict when trying to figure out how should we store the frequency of the activity(eg 2 times/per , 3 times/week).There was one way where I could figure it out from the ```Activity_Day_Schedule``` Table but that was creating conflicts with cases such as maximise and 2sounds/day.I finally decided it to normalise and store it myself. Getting some further clarity  in the future will definitly help finalise which approach to use.
* Used SQLite3 so that the Database could be embedded inside the application itself .This was done purely for portability reasons. In production environments we would use a hosted DB.
* I made use of the 2nd Slide Provided in the Assignment Document to build the static Data in the tables. Ideally we would be having separate CRUD API endpoints to populate this data.
* I have normalised the schema as much as I could to reduce redundancy. This has a slight tradefoff being the query being a little complex(refer ```/api/user/schedule``` Endpoint) . But this tradeoff is worth it to keep data integrity in check.
