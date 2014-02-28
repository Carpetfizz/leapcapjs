leapcap.js
=========

Library for capturing and playing back 3D hand movements using the [Leap Motion](https://www.leapmotion.com/) and [THREE JS](http://threejs.org/)

Project for 2014 [Synopsis Science & Technology Championship](http://science-fair.org/) by Ajay Ramesh - Junior at [Summit San Jose High School](http://www.summitsanjose.org/)

leapcap.js is still in early stages of development, but will soon be ready for use. It is in a working state right now and can be used like this:

Include the necessary libraries in your HTML:

    <script src="libs/three.min.js"></script>
    <script src="libs/leap.min.js"></script>
    <script src="leapcap.js"></script>

Initialize with one function, passing in the element you want the WebGL renderer to reside. For example:

    LeapCap.initLeapCap({'scene':document.body});

Then access the functions to control leapcap. You may bind these to buttons, keyboard events, etc. 

    LeapCap.record() //starts to capture frames
    LeapCap.play() //plays back captured frames
    LeapCap.clearFrames() //deletes captured frames

Full implementation. Also can be found in `leapcap_sample.html`

    <html>
	 <body>
	       <script src="libs/three.min.js"></script>
	       <script src="libs/leap.min.js"></script>
	       <script src="leapcap.js"></script>
	       <script>
	           LeapCap.initLeapCap({'scene':document.body});
	       </script>
	       <button onclick="LeapCap.play()">Play</button>
	       <button onclick="LeapCap.record()">Record</button>
	       <button onclick="LeapCap.clearFrames()">Delete</button>
	</body>
   </html>
