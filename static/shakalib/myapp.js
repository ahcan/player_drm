var manifestUri = 'https://mdrm1.fbox.fpt.vn/vod/DATA/03_The_Transporter/_/HLS/03_The_Transporter.m3u8';
// 'https://storage.googleapis.com/shaka-demo-assets/angel-one/dash.mpd';
//"https://cdn.demo.anevia.com/live/DATA/Test_EZDRM/DASH_EZDRM/Test_EZDRM.mpd";
var drmproxy = "https://widevine-dash.ezdrm.com/widevine-php/widevine-foreignkey.php?pX=3C7705";


function play_new(){
  manifestUri = document.getElementById("strUrl").value;
  console.log(manifestUri);
  initApp();
}

function initApp() {
  // Install built-in polyfills to patch browser incompatibilities.
  var tmp = document.getElementById("username").value;
  drmproxy = "https://widevine-dash.ezdrm.com/widevine-php/widevine-foreignkey.php?pX=3C7705";
  shaka.polyfill.installAll();
  drmproxy = drmproxy + "&user=" + tmp;
  console.log(drmproxy);
  // Check to see if the browser supports the basic APIs Shaka needs.
  if (shaka.Player.isBrowserSupported()) {
    // Everything looks good!
    initPlayer();
  } else {
    // This browser does not have the minimum set of APIs we need.
    console.error('Browser not supported!');
  }
}

function initPlayer() {
  // Create a Player instance.
  var video = document.getElementById('video');
  var player = new shaka.Player(video);

  // Attach player to the window to make it easy to access in the JS console.
  window.player = player;

  // Listen for error events.
  player.addEventListener('error', onErrorEvent);

  //define config player
  player.configure({
    drm:{
      servers:{
        'com.widevine.alpha': drmproxy,
        'com.microsoft.playready': 'https://foo.bar/drm/playready'
      }
    }
  });
  // Try to load a manifest.
  // This is an asynchronous process.
  player.load(manifestUri).then(function() {
    // This runs if the asynchronous load is successful.
    console.log('The video has now been loaded!');
  }).catch(onError);  // onError is executed if the asynchronous load fails.
  console.log(player.getConfiguration());
}

function onErrorEvent(event) {
  // Extract the shaka.util.Error object from the event.
  onError(event.detail);
}

function onError(error) {
  // Log the error.
  console.error('Error code', error.code, 'object', error);
}

document.addEventListener('DOMContentLoaded', initApp);
