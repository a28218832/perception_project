/*
 *  Copyright (c) 2015 The WebRTC project authors. All Rights Reserved.
 *
 *  Use of this source code is governed by a BSD-style license
 *  that can be found  in the LICENSE file in the root of the source
 *  tree.
 */
'use strict';

// Put variables in global scope to make them available to the browser console.
const constraints = window.constraints = {
  audio: false,
  video: true
};


/*
function handleSuccess(stream) {
  const video1 = document.querySelector('#video1');
  const video2 = document.querySelector('#video2');
  const videoTracks = stream.getVideoTracks();
  console.log('Got stream with constraints:', constraints);
  console.log(`Using video device: ${videoTracks[0].label}`);
  window.stream = stream; // make variable available to browser console
  video1.srcObject = stream;
  video2.srcObject = stream;
}
*/

/*
function handleSuccess(stream) {
  const video = document.querySelector('video');
  const videoTracks = stream.getVideoTracks();
  console.log('Got stream with constraints:', constraints);
  console.log(`Using video device: ${videoTracks[0].label}`);
  window.stream = stream; // make variable available to browser console
  video.srcObject = stream;
}
*/

function handleSuccess(stream) {
  const video1 = document.querySelector('#localVideo');
  const video2 = document.querySelector('#remoteVideo');
  const videoTracks = stream.getVideoTracks();
  console.log('Got stream with constraints:', constraints);
  console.log(`Using video device: ${videoTracks[0].label}`);
  window.stream = stream; // make variable available to browser console
  
  video2.srcObject = stream;
  video1.srcObject = stream;
  
}




function handleError(error) {
  if (error.name === 'OverconstrainedError') {
    const v = constraints.video;
    errorMsg(`The resolution ${v.width.exact}x${v.height.exact} px is not supported by your device.`);
  } else if (error.name === 'NotAllowedError') {
    errorMsg('Permissions have not been granted to use your camera and ' +
      'microphone, you need to allow the page access to your devices in ' +
      'order for the demo to work.');
  }
  errorMsg(`getUserMedia error: ${error.name}`, error);
}

function errorMsg(msg, error) {
  const errorElement = document.querySelector('#errorMsg');
  errorElement.innerHTML += `<p>${msg}</p>`;
  if (typeof error !== 'undefined') {
    console.error(error);
  }
}

async function init(e) {
  try {
    const stream = await navigator.mediaDevices.getUserMedia(constraints);
    handleSuccess(stream);
    e.target.disabled = true;
  } catch (e) {
    handleError(e);
  }
}

//document.querySelector('#showVideo').addEventListener('click', e => init(e));




//~~~~~~~~~~~~~~~~~~~~~



const localVideo = document.getElementById('localVideo');
const remoteVideo = document.getElementById('remoteVideo');

localVideo.addEventListener('click', () => {
  if (localVideo.requestFullscreen) {
    localVideo.requestFullscreen();
  } else if (localVideo.webkitRequestFullscreen) { /* Safari */
    localVideo.webkitRequestFullscreen();
  } else if (localVideo.msRequestFullscreen) { /* IE11 */
    localVideo.msRequestFullscreen();
  }
});

remoteVideo.addEventListener('click', () => {
  if (remoteVideo.requestFullscreen) {
    remoteVideo.requestFullscreen();
  } else if (remoteVideo.webkitRequestFullscreen) { /* Safari */
    remoteVideo.webkitRequestFullscreen();
  } else if (remoteVideo.msRequestFullscreen) { /* IE11 */
    remoteVideo.msRequestFullscreen();
  }
});

