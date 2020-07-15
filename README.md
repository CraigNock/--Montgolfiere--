<!-- Final Project Start 23-04-20, Finish 08-05-20 -->
![GitHub repo size](https://img.shields.io/github/repo-size/CraigNock/--Montgolfiere--)
<!-- ![GitHub contributors](https://img.shields.io/github/contributors/CraigNock/--Montgolfiere--) -->

# Where <em>is</em> My Balloon

<strong>Where <em>is</em> My Balloon</strong> was created in two weeks as a final project for Full-Stack Web Development Diploma with <a href='https://concordiabootcamps.ca/' alt='link to Concordia Bootcamps website'>Concordia Bootcamps</a>.

This project was borne of the question of what happens to those escaped party balloons that disappear off into the horizon.
"Where <em>is</em> My Balloon?" leverages real-time wind data to allow users to launch a hot-air-balloon and travel the world according to natures whims.

---
## Demo 
- <a href='https://youtu.be/-sSS4GtjhEM'>https://youtu.be/-sSS4GtjhEM</a>

---
## Screenshots
<img src='.\client\src\assets\screenshots\screen1day.png'/>
<img src='.\client\src\assets\screenshots\screen2sunset.png' />
<img src='.\client\src\assets\screenshots\screen3nightrain.png' />
<img src='.\client\src\assets\screenshots\screen4profile.png'  />
<img src='.\client\src\assets\screenshots\screen5instruct.png'  />

---

## Installing

 Prerequisites:

- Before you begin, ensure you have you have installed the latest version of Node.js and Yarn.

Note that a firebase RealTime Database will need to be set up and various API keys will be required for full functionality.
1. Open up your favourite code editor (such as Visual Studio Code) and git clone the repository.
2. Change directory to the project folder and open the terminal there.
3. In the terminal enter $yarn fullinstall. Concurrently will be installed, then this dependancy will install all the necessary dependancies for both the Server and the React app. (for your convenience!)
4. Head to Firebase and create a Real Time Database! 
    - https://firebase.google.com/products/realtime-database
5. Create a <strong>.env</strong> file in the <strong>client</strong> folder containing the following information & keys:
    - Firebase information: 
    (Once a Firebase Realtime database is created, this info can be found in the Firebase Console sidebar under "Project Settings" {look for the cog!} ) 
    - Located under the heading "Firebase SDK Snippet" Simply copy over the matching values.
      - FB_DATABASE_URL=
      - REACT_APP_FB_APIKEY=
      - REACT_APP_FB_AUTHDOMAIN=
      - REACT_APP_FB_DATABASEURL=
      - REACT_APP_FB_PROJECTID=
      - REACT_APP_FB_STORAGEBUCKET=
      - REACT_APP_FB_MESSAGINSENDERID=
      - REACT_APP_FB_APPID=

    - IP address: 
      - REACT_APP_FB_IP=
        - If you were hosting the backend, you would put the URL for that location here. For local running however, you will want http://localhost:8000/ as it is the default port for the server when not hosted.
  
    - API keys: You will need to obtain your own key for this service
      - REACT_APP_THUNDERFOREST_MAPTILES_KEY=
        - Provides map tiles (<strong>Without</strong>: defaults to OpenStreetMap tiles)
        - https://www.thunderforest.com/docs/apikeys/

4. Create a <strong>.env</strong> file in the <strong>server</strong> folder containing the following information & keys:
    - Firebase information: 
    (Once a Firebase Realtime database is created, this info can be found in the Firebase Console sidebar under "Project Settings" {look for the cog!} )

    - Navigate to the "Service Accounts" tab and you should see a button down the bottom labelled "Generate New Key". Press this and a .JSON file will be downloaded to your computer. Open this .JSON file and copy over the matching information and keys.

      - FB_DATABASE_URL=
      - FIREBASE_PROJECT_ID=
      - FIREBASE_PRIVATE_KEY_ID=
      - FIREBASE_PRIVATE_KEY=
      - FIREBASE_CLIENT_ID=
      - FIREBASE_CLIENT_EMAIL=
      - FIREBASE_CLIENT_CERT=
  
    - API keys: You will need to obtain your own keys for these services
      - DARKSKY_API_KEY= 
        - Provides <strong>wind</strong>, weather and sunrise/set data. <strong>(Essential)</strong>
        - (Darksky no longer accepts new signups, can use alternative: "Openweather One Call API" ) https://openweathermap.org/api/one-call-api
      - THUNDERFOREST_MAPTILES_KEY=
        - Provides map tiles (<strong>Without</strong>: defaults to OpenStreetMap tiles)
        - https://www.thunderforest.com/docs/apikeys/
      - AZURE_COGNITIVE_KEY=
        - Provides nearby location images (<strong>Without</strong>: defaults to built in icons)
        - https://docs.microsoft.com/en-us/azure/cognitive-services/


6. In the terminal enter $yarn dev. Concurrently will start both the Server and the React app (which will open automatically in the browser).
7. Sign In using Google or Guest button. Then launch your balloon!

---
## Technologies
Technologies utilized in this project include:
### Front End:
React, Redux, JavaScript, Styled Components 
### Back End:
Express.js, Node, Firebase Real-Time Database

### Utilizing:
- Mapping was accomplished using Leaflet and Leaflet-React along with OpenStreetMaps.

- Weather and Wind data is retrieved using the Darksky API.

- Nearby images are gathered via Bing Image Search API.
Tracking of closest city to balloon is achieved via the Overpass API.

---
## FEATURES

Main:

- Players can <strong>launch</strong> their balloon to ride the real-world wind according to their location. Balloon can also be <strong>anchored</strong> at anytime to stop movement.

- <strong>Elevation</strong> can be changed which will affect speed (higher=faster). At lowest elevation option is presented for balloon to be <strong>anchored</strong>.

- Optional limited <strong>steering</strong> (changes direction by +-45 degrees) is available by deploying a sail.

- Users balloon positions are <strong>persistant</strong>. 
    - Also if left unanchored by user, their balloon will also continue to fly for up to an hour after app closure.

- Users can <strong>chat</strong> with other balloons, however this is <strong>proximity-gated</strong> to a radius around their balloons. (For now, this allowable range-radius is set to global)

- Users can also choose the <strong>render-radius</strong> of other users balloons on their map.
    - Ranges are Local (chat range), Abroad, and Global (all)
    - Other user balloons will only be rendered if they have been active in the last half-hour.

Displays:

- The <strong>dynamic Background</strong> was created from scratch using styled components. It changes to represent both the time-of-day and weather conditions local to your balloon.

- Up to date <strong>weather conditions</strong> at balloon location are displayed and kept up to date as it travels.

- <strong>Nearest city</strong> and it's distance to balloon is displayed and kept up to date as it travels.
    - Additionally: <strong>Nearest city images</strong> are also found and displayed.

- Users can customise their <strong>balloon icon</strong>, which will be persistant to their profile and visible to other users.

- Optional <strong>Lens effect</strong> over map for that authentic viewing port look.

---
## Key learnings and Goals
While progress was solid during this 2-week build, there were certainly points where I expanded my knowledge:
- Manipulating normally static mapping frameworks into an interactive gameplay element. 
- Leveraging Firebase Real-Time Database, with no prior experience.
- Troubleshooting proximity gated chat functionality.

There are many additional features I would like to eventually add to this game to both increase gameplay, quality of life and performance.
While the list is expansive here are some shorter term goals:
- Add items to collect from locations across the globe.
- Increase sign-in options. Expand to Facebook etc logins as well as app only credentials.
- Add option to disable dynamic background, also off by default for animation reducing global user settings. Saving resources for low performance platforms and increasing accessibility for motion vunerable persons.
- Increase responsiveness, tailor a better user experience on mobile.

---
## Contact

If you want to contact me you can reach me at <craigwnockels@gmail.com>.
