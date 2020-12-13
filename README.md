This project consist of landing page of my ways home along with login and sign up functionalities using react and nodeJs.
Follow the below steps to run it on your local environement.
IMP ON LOGIN AND SIGN UP YOU HAVE TO CHECK DB FOR VERIFICATION AS LANDING PAGES FOR SUCCESS IS NOT ADDED
IMP FOR SUCCESSFULL WORKING OF THE APPLICATION ALL THE SERVERS I.E NODE SERVER, REACT SERVER AND MONGO SERVER SHOULD BE RUNNING ON DEFINED PORTS

Step 1: On pulling this version of repo you will have a folder with separate backend and frontend folders, 
        Go to frontend folder -> mywayshome and run the following command `npm i react axios react-bootstrap react-router-dom react-dom` this should install all the dependencies required by the project on the front end
        On the backend folder run the following command `npm i nodemon express body-parser express-session lodash mongoose passport passport-local-mongoose` this should install all the dependencies required by the project on the back end. 
Step 2: Since the backend and front end are different, you need to make sure the backend server is running while the react frontend is running. To do this simply go to the backend directory where server.js is situated and run `node server.js` or `nodemon server.js` in the terminal. The backend server should be running on port 3001, the front end on 3000 and the mongo server on 27017. This is important as the axios post requests from the front end is hardcoded as 'http://localhost:3001'
Step 3: Make sure the mongoDB server is running while you use the application. You can use ROBO3T to see the changes in the db made. The DB is encrypted with layer 6 security so the password is hashed along with the salt, so you will have to remember the password that you saved for login.

I think following all this should make the app work.
Contact me if you have any problems!
Cheers,
Agam
