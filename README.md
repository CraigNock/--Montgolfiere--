<!-- Final Project Start 23-04-20, Finish 08-05-20 -->
![GitHub repo size](https://img.shields.io/github/repo-size/CraigNock/--Montgolfiere--)
![GitHub contributors](https://img.shields.io/github/contributors/CraigNock/--Montgolfiere--)

# Where <em>is</em> My Balloon

Where <em>is</em> My Balloon was created in two weeks as a final project for Full-Stack Web Development Diploma with Concordia Bootcamps.

This project was borne of the question of what happens to those escaped party balloons that disappear off into the horizon.
"Where <em>is</em> My Balloon?" leverages real-time wind data to allow users to launch a hot-air-balloon and travel the world according to natures whims.

---
## Demo 
<a href='https://youtu.be/-sSS4GtjhEM'><img src='\client\src\assets\screenshots\screen1day.png'/></a>

<img src='.\client\src\assets\screenshots\screen2sunset.png' style='width:100px;margin-left:5%;' />
<img src='.\client\src\assets\screenshots\screen3nightrain.png' style='width:100px' />
<img src='.\client\src\assets\screenshots\screen4profile.png' style='width:100px' />

## Installing
Note that a firebase RealTime Database will need to be set up and various API keys (see Technologies) will be required for full functionality.
1. Clone the repo.
2. In both client and server directory terminals, run commands ```$yarn install``` and  ```$yarn start```.
3. Login using Google Login.

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
Users balloon positions are persistant. If unanchored by user, balloon will also continue to fly for up to an hour after app closure.

Users can chat with other balloons if they are in range. (For now, this allowable range is set to global)

The Background was created from scratch using styled components. It changes dynamically to represent both the time-of-day and weather conditions local to your balloon.

Users can customise their balloon icon, which will be persistant to their profile and visible to other users.

---
## Key learnings and Goals
While progress was solid, there were certainly points where I expanded my knowledge:
- Manipulating normally static mapping frameworks into an interactive gameplay element. 
- Leveraging Firebase Real-Time Database, with no prior experience.
- Troubleshooting proximity gated chat functionality.

There are many additional features I would like to add to this game to both increase gameplay, quality of life and performance.
While the list is expansive here are some shorter term goals:
- Add items to collect from locations across the globe.
- Increase sign-in options. Expand to Facebook etc logins as well as app only credentials.
- Increase security on inputs.
- Add option to disable dynamic background, also off by default for animation reducing global user settings. Saving resources for low performance platforms and increasing accessibility for motion vunerable persons.
- Increase responsiveness, tailor a better user experience on tablet and mobile.
I definitely intend to rewrite this app in a mobile friendlier language such as Flutter.

---
## Contact

If you want to contact me you can reach me at <craigwnockels@gmail.com>.
