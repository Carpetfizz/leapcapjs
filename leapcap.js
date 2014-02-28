/*
 * The MIT License (MIT)
 *
 * Copyright (c) 2014 Ajay Ramesh
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy of
 * this software and associated documentation files (the "Software"), to deal in
 * the Software without restriction, including without limitation the rights to
 * use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of
 * the Software, and to permit persons to whom the Software is furnished to do so,
 * subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS
 * FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR
 * COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER
 * IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
 * CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 * ---------------------------------------------------------------------------------
 * Usage and examples can be found at https://github.com/Carpetfizz/leapcapjs
 * To contact me you may use the following emails, or simply report a bug in GitHub
 * carpetfizz@gmail.com
 * aramesh.sj@mysummitps.org
 */

(function(LeapCap){
/* THREE JS GLOBAL VARS*/
var SCENE = new THREE.Scene();
var CAMERA = new THREE.PerspectiveCamera(65, window.innerWidth / window.innerHeight, 0.1, 1000);
var RENDERER = new THREE.WebGLRenderer();
RENDERER.setSize(window.innerWidth, window.innerHeight);
//document.body.appendChild(RENDERER.domElement);
RENDERER.setClearColorHex(0xEEEEEE, 1.0);
RENDERER.clear();
CAMERA.position.z = 7;

/*THREE JS GEOMETRY DECLARATIONS*/
var G_HAND_GEOMETRY = new THREE.CubeGeometry(0.75, 0.75, 0.75);
var G_FINGER_GEOMETRY = new THREE.CubeGeometry(0.25, 1, 0.25);
var MAT_HAND = new THREE.MeshPhongMaterial({
    color: 0xCC0000
});
var M_GROUND = new THREE.Mesh(new THREE.PlaneGeometry(300, 300), new THREE.MeshNormalMaterial());

/*THREE JS LIGHTING*/
var L_POINT_LIGHT = new THREE.PointLight(0xFFFFFF);
L_POINT_LIGHT.position.x = 10;
L_POINT_LIGHT.position.y = 50;
L_POINT_LIGHT.position.z = 130;
var L_AMBIENT_LIGHT = new THREE.AmbientLight(0x000044);
SCENE.add(L_AMBIENT_LIGHT);
SCENE.add(L_POINT_LIGHT);

/*LEAP CONTROLLER*/
var LEAP_CONTROLLER = new Leap.Controller();

/*UTIL VARS*/
var HAND_MESHES = []; //stores the THREE.JS generated hand_mesh objects 
var SAVED_FRAMES = []; //stores the frameData objects created on each frame
var PAUSE_LEAP = false; //boolean to check if the LEAP_CONTROLLER listner should call drawWith()
var PLAY_INTERVAL; //setInterval object
var FRAME_NUMBER = 0; //counter to check how many frames PLAY_INTERVAL has played
var RECORD_FRAMES = false; //boolean to check if SAVED_FRAMES should be updated

/**
 * Initializes the scene by preconstructing the hand and finger meshes, and putting them off screen
 * Adds the hand_mesh to the global HAND_MESHES array
 */
function initHand() {
    for (var j = 0; j < 2; j++) {
        var hand_mesh = new THREE.Mesh(G_HAND_GEOMETRY, MAT_HAND);
        hand_mesh.position.x = 1000;
        hand_mesh.fingers = [];
        for (var x = 0; x < 5; x++) {
            var finger_mesh = new THREE.Mesh(G_FINGER_GEOMETRY, MAT_HAND);
            finger_mesh.position.x = 1000;
            SCENE.add(finger_mesh);
            hand_mesh.fingers.push(finger_mesh);
        }

        SCENE.add(hand_mesh);
        HAND_MESHES.push(hand_mesh);
    }
}

/**
 * Updates the THREE JS scene based on receieved frame information
 * @param {frameData} frameData - contains LEAP interaction box and LEAP detected hands
 * @param {bool} isPlaying - the function is or is not being used to replay SAVED_FRAMES
 * @param {bool} shouldRepeat - the function should or should not replay SAVED_FRAMES
 */
function drawWith(frameData, isPlaying, shouldRepeat) {
    for (var i = 0; i <= 1; i++) {
        if (frameData.hands[i]) {
            var handMesh = HAND_MESHES[i];
            handMesh.position = leapToScene(frameData.interaction_box, frameData.hands[i].palmPosition);
            handMesh.rotation.x = frameData.hands[i].direction[1] * 3;
            for (var x = 0; x < 5; x++) {
                if (frameData.hands[i].fingers[x]) {
                    var pos = leapToScene(frameData.interaction_box, frameData.hands[i].fingers[x].tipPosition);
                    handMesh.fingers[x].position.x = pos.x;
                    handMesh.fingers[x].position.y = pos.y - 0.5;
                    handMesh.fingers[x].position.z = pos.z + 0.5;
                    handMesh.fingers[x].rotation.x = frameData.hands[i].direction[1] * 3;
                    handMesh.fingers[x].rotation.z = frameData.hands[i].direction[0] * 1.5;

                } else {
                    handMesh.fingers[x].position.x = 1000;
                }
            }
            if (!isPlaying && RECORD_FRAMES) {
                SAVED_FRAMES.push(frameData);
            }
        } else {
            HAND_MESHES[i].position.x = 1000;
        }

    }
    if (isPlaying) {
        FRAME_NUMBER += 1;
        if (FRAME_NUMBER + 1 == SAVED_FRAMES.length) {
            if (shouldRepeat) {
                FRAME_NUMBER = 0;
            } else {
                window.clearInterval(PLAY_INTERVAL);
            }
            PAUSE_LEAP = false;
        }
    }
}

/**
 * Converts real world LEAP coordinates into THREE JS 3D Vector
 * @param {interactionBox} interactionBox - Area of interaction calculated by LEAP_CONTROLLER
 * @param {array} leapPos  - Array of x,y,z positions interpreted by LEAP_CONTROLLER
 */
function leapToScene(interactionBox, leapPos) {
    var interactionBox = interactionBox;
    var x = leapPos[0] / interactionBox.size[0] * 5;
    var y = leapPos[1] / interactionBox.size[1] * 5 - 4;
    var z = leapPos[2] / interactionBox.size[2] * 5;
    return new THREE.Vector3(x, y, z);
}

/*Boilerplate THREE JS render function calls itself*/
function render() {
    requestAnimationFrame(render);
    RENDERER.render(SCENE, CAMERA);
}

/*EXPOSED FUNCTIONS*/

/**
 * Starts to capture and display LEAP data
 * @param {config} config - contains information (usually from DOM) that leapcap uses to render scene
 * Connects and starts LEAP event listener on page load
 * Checks if PAUSE_LEAP is false to see if it should draw the scene
 * frameData contains the minimal data needed to draw a scene
 */
LeapCap.initLeapCap = function (config) {
    config.scene.appendChild(RENDERER.domElement);
    LEAP_CONTROLLER.connect();
    LEAP_CONTROLLER.on('frame', function (frame) {
        if (!PAUSE_LEAP) {
            var frameData = {
                'interaction_box': frame.interactionBox,
                'hands': frame.hands
            };
            drawWith(frameData);
        }
    });
    initHand();
    render();
}


/**
 * Plays captured frames using drawWith()
 * PAUSE_LEAP's the LEAP_CONTROLLER's listener
 * Animation has not started yet so FRAME_NUMBER is 0
 * Plays the animation at frame / 25 ms
 * FRAME_NUMBER is incremented by drawWith()
 */
LeapCap.play = function() {
    FRAME_NUMBER = 0;
    if(SAVED_FRAMES.length>0){
        PLAY_INTERVAL = window.setInterval(function () {
            drawWith(SAVED_FRAMES[FRAME_NUMBER], true, false);
        }, 25);
        PAUSE_LEAP = true;
        RECORD_FRAMES = false;
    }
}

/**
 * Enables drawWith() to save frames
 */
LeapCap.record = function(){
    RECORD_FRAMES = !RECORD_FRAMES;
    if(RECORD_FRAMES){
        return true;
    }
    else{
        return false;
    }
}

/**
 * Deletes all the items in SAVED_FRAMES array
 */
LeapCap.clearFrames = function(){
    SAVED_FRAMES.splice(0,SAVED_FRAMES.length);
}

/**
 * Retrieves the SAVED_FRAMES
 */
LeapCap.getSavedFrames = function(){
	return SAVED_FRAMES;
}

}(LeapCap = window.LeapCap||{}));