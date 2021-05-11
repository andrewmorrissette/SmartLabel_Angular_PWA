# SmartLabelPWAv3

This project was an ongoing research project for the Michigan State Univeristy Broad Art Museum. Due to COVID-19 research funding was re-allocated and this specific project was stopped. 

This project has 2 seperate "projects" within to fit research goals, an App View and a Smart Label View. The App View was more experimental and constantly changing, whereas the Smart Label View needs to be refactored and is finished.

Code runs via Angular/ Bootstrap using WordPress REST API. A specific interface was created for curators to use at the museum within Wordpress. Afterwards the application would pull data from Wordpress and display it.

This project was constantly in rapid prototype/development mode and was more to see what features the museum would want, thus the code isn't production quality (mostly the App portion).

Features we were looking to add: AR, Bluetooth Beacon Tracking. Due to technology advancements and security Bluetooth Beacons were not an option during testing, rather a seperate prototype using Cordova was going to be implemented. AR was starting to be in development via Apple Web VR.

Also implementation of service workers was next on the agenda (to make it an actual PWA)

# Smart Label

This project was an extension of a previous project allowing the use of "Smart Labels". These Smart Labels were mini touch displays using Raspberry Pi's. These Smart Labels were meant for visitors of a museum to go up to an exhibit and see digitally the tombstone conent (Artist Name, Title of Artwork etc.), and then be able to click an arrow and receive even more information (allowing a visitor to learn as much about something as they wanted to). The previous Smart Labels were only using HTML files that were stored within a Google Drive. In order to create another page, or another exhibit's content, HTML files had to be created for each one. A simple example was a translation of one smart label's information had to be created seperately and wouldn't be able to rely on Google Translate etc. 

Thus, the SmartLabelPWA was born.
Using the above created WordPress for exhibit Staff, the Smart label PWA pulled data using the WordPress REST API and displayed it in a Digital Tombstone Layout that was similar to a standard label for museum exhibits. It pulled on the previous idea, but made it much more flexible. Any Staff would be able to easily edit the label, add editions, set timers, add Videos, Photos, etc. and would not have to edit HTML directly. 

This part of the project is still the most updated version the Smart Label Devices are using (However, the Smart Label Devices themselves are mostly used for testing, and not for the public as COVID-19 has brought on many restrictions with touching devices).

[Example](https://culturalnexus.msu.edu/smartlabel/#/)

# App View

This part of the application changed daily. It was mostly used as a playground to test different features and push the limits of a PWA using the Wordpress REST API. One important feature often talked about was to allow visitors to be able to pull up an exhibit's information via QR Code and to be able to use accessibility features on their smart device (such as read aloud the tombstone information).
[Example](https://culturalnexus.msu.edu/PWA)

All Code is Subject to copyright at Michigan State University. Do not Duplicate or Redistribute without further contacting Brian Kirschensteiner at the Eli and Edythe Broad Art Museum.
