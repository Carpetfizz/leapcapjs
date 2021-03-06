leapcap.js
=========

Library for capturing and playing back 3D hand movements using the [Leap Motion](https://www.leapmotion.com/) and [THREE JS](http://threejs.org/)

Project for 2014 [Google Science Fair](https://www.googlesciencefair.com/en/) and [Synopsys Science & Technology Championship](http://science-fair.org/) by Ajay Ramesh - Junior at [Summit San Jose High School](http://www.summitsanjose.org/). 

leapcap.js is still in early stages of development, but will soon be ready for use. It is in a working state right now and can be used like this:

###Usage###

Include the necessary libraries in your HTML:

    <script src="libs/three.min.js"></script>
    <script src="libs/leap.min.js"></script>
    <script src="leapcap.js"></script>

Initialize with one function, passing in the element you want the WebGL renderer to reside. For example:

    LeapCap.initLeapCap({'scene':document.body});
    
The ThreeJS render window will size itself to the size of your `scene` element.
    
NOTE: jQuery is not a dependency for LeapcapJS, but it can be used to initialize the DOM.

    LeapCap.initLeapCap({'scene':$('#scene_div')});

Accessible functions for LeapCap. You may bind these to buttons, keyboard events, etc. 

    LeapCap.record() //starts to capture frames
    LeapCap.play() //plays back captured frames
    LeapCap.play(savedFrames) //plays back a saved array of captured frames, retrieved using LeapCap.getSavedFrames()
    LeapCap.clearFrames() //deletes captured frames
    LeapCap.getSavedFrames() //returns an array of saved motion data.

File with full implementation can be found in [leapcap_sample.html](https://github.com/Carpetfizz/leapcapjs/blob/master/leapcap_sample.html).

###Todo###
* Better reporting for exposed functions (ie: isConnected, isPlaying, isRecording, stoppedRecord, etc)
* Better error reporting from the Leap
* Give complete control over the canvas


###MIT License###

Copyright (c) 2014 Ajay Ramesh

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.
