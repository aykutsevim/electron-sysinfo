// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// No Node.js APIs are available in this process because
// `nodeIntegration` is turned off. Use `preload.js` to
// selectively enable features needed in the rendering
// process.
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 70, window.innerWidth / window.innerHeight, 1, 1000 );
camera.position.z = 400;

const texture = new THREE.TextureLoader().load( 'textures/crate.gif' );

const renderer = new THREE.WebGLRenderer( { antialias: true } );
renderer.setPixelRatio( window.devicePixelRatio );
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );		

const geometry = new THREE.BoxGeometry( 200, 200, 200 );
const material = new THREE.MeshBasicMaterial( { map: texture } );
const cube = new THREE.Mesh( geometry, material );
scene.add( cube );

window.addEventListener( 'resize', onWindowResize );

function animate() {
  requestAnimationFrame( animate );
  cube.rotation.x += 0.001;
  cube.rotation.y += 0.001;
  cube.scale.z += 0.001;
  renderer.render( scene, camera );
}
animate();

function onWindowResize() {

  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();

  renderer.setSize( window.innerWidth, window.innerHeight );

}