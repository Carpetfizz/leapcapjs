leapcap.js
=========

Library for capturing and playing back 3D hand movements using the [Leap Motion](https://www.leapmotion.com/) and [THREE JS](http://threejs.org/)

Project for 2014 [Synopsis Science & Technology Championship](http://science-fair.org/) by Ajay Ramesh - Junior at [Summit San Jose High School](http://www.summitsanjose.org/)

leapcap.js is still in early stages of development, but will soon be ready for use. It is in a working state right now and can be used like this:

###Usage###

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
    LeapCap.getSavedFrames() //returns an array of saved motion data.

File with full implementation can be found in [leapcap_sample.html](https://github.com/Carpetfizz/leapcapjs/blob/master/leapcap_sample.html).


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
