(function () {

  var
    AUDIO_FILE        = '/trax/20120922-24-bit-UM06-snip',
    t, kick;

  Dancer.setOptions({
    flashSWF : '/vendor/dancer.js/lib/soundmanager2.swf',
    flashJS  : '/vendor/dancer.js/lib/soundmanager2.js'
  });

  dancer = new Dancer();
  kick = dancer.createKick({
    onKick: function() {
      console.log("kick!");
      cube.rotation.x = cube.rotation.x + 0.05;
      cube.position.z = cube.position.z + 1;
      mesh.material.color.setRGB( Math.random(), Math.random(), Math.random());

      scene.getObjectByName('backleft', true).rotation.y = scene.getObjectByName('backleft', true).rotation.y + 0.1;
      scene.getObjectByName('frontright', true).rotation.y = scene.getObjectByName('frontright', true).rotation.y + 0.1; 
    },
    offKick: function() {      
      // console.log("off kick!");
      // camera.position.y = camera.position.y - 1;
    }
  });

  dancer.onceAt( 0, function () {
    kick.on();
  }).between( 0, 250, function () {
    controls.autoRotate = true;
  }).fft( document.getElementById( 'fft' ) )
    // .load({ src: AUDIO_FILE, codecs: [ 'ogg', 'mp3' ]}) //enable & upload ogg for X browser
    .load({ src: AUDIO_FILE, codecs: [ 'mp3' ]})

  Dancer.isSupported() || loaded();
  !dancer.isLoaded() ? dancer.bind( 'loaded', loaded ) : loaded();

  // why do I have to call this explicitly?
  loaded();

  function loaded() {
    console.log("in loaded()");
    var
      loading = document.getElementById( 'loading' ),
      anchor  = document.createElement('A'),
      help  = document.createElement('P'),
      supported = Dancer.isSupported(),
      p;

    console.log("supported? "+supported);
    anchor.appendChild( document.createTextNode( supported ? 'Play!' : 'Close' ) );
    help.appendChild( document.createTextNode( supported ? 'move the camera with your mouse, scroll wheel zooms' : '' ) );
    anchor.setAttribute( 'href', '#' );
    loading.innerHTML = '';
    loading.appendChild( anchor );
    loading.appendChild( help );

    if ( !supported ) {
      p = document.createElement('P');
      p.appendChild( document.createTextNode( 'Your browser does not currently support either Web Audio API or Audio Data API. The audio may play, but the visualizers will not move to the music; check out the latest Chrome or Firefox browsers!' ) );
      loading.appendChild( p );
    }

    anchor.addEventListener( 'click', function () {
      console.log("dancer.play");
      dancer.play();
      document.getElementById('loading').style.display = 'none';
      document.getElementById('stop').innerHTML = 'pause';  
    }, false );

  }

  // For debugging
  window.dancer = dancer;

})();
