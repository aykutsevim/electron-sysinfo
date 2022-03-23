// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// No Node.js APIs are available in this process because
// `nodeIntegration` is turned off. Use `preload.js` to
// selectively enable features needed in the rendering
// process.
// model
let cpuLoadQueues = [];
let initialized = false;

function createCPULoadQueue(coreCount){
  for (let i = 0; i < coreCount; i++){
    let cpuQueue = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
    cpuLoadQueues.push(cpuQueue);
  }
}

function pushToCPULoadQueue(data){
  for (let i = 0; i < cpuLoadQueues.length; i++){
    let cpuLoad = data.cpus[i].load;
    cpuLoadQueues[i].push(cpuLoad);

    if (cpuLoadQueues[i].length > 20){
      cpuLoadQueues[i].shift();
    }
  }
}


const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 70, window.innerWidth / window.innerHeight, 1, 1000 );
camera.position.z = 400;

const texture = new THREE.TextureLoader().load( 'textures/crate.gif' );

const renderer = new THREE.WebGLRenderer( { antialias: true } );
renderer.setPixelRatio( window.devicePixelRatio );
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );		
/*
const geometry = new THREE.BoxGeometry( 20, 20, 20 );
const material = new THREE.MeshBasicMaterial( { map: texture } );
const cube = new THREE.Mesh( geometry, material );
scene.add( cube );
*/
window.addEventListener( 'resize', onWindowResize );

function animate() {
  requestAnimationFrame( animate );
  /*cube.rotation.x += 0.001;
  cube.rotation.y += 0.001;
  cube.scale.z += 0.001;*/
  renderer.render( scene, camera );
}
animate();

function onWindowResize() {

  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();

  renderer.setSize( window.innerWidth, window.innerHeight );

}

const counter = document.getElementById('systeminfo')

let cpuViews = [];

function createCPUViews(coreCount){
  for (let i = 0; i < coreCount; i++){
    let cpuView = [];

    for (let j = 0; j < coreCount; j++){
      const geometry = new THREE.BoxGeometry( 20, 20, 20 );
      const material = new THREE.MeshBasicMaterial( { map: texture } );
      const cube = new THREE.Mesh( geometry, material );
      cube.translateX((i-10) * 40);
      cube.translateY((j-10) * 40);
      scene.add( cube );
    
      cpuView.push(cube);
    }

    cpuViews.push(cpuView);
  }

}

window.electronAPI.handleCPU((event, value) => {
  if (!initialized){
    initialized = true;

    console.log(value.cpus.length);

    const coreCount = value.cpus.length;

    createCPULoadQueue(coreCount);
    createCPUViews(coreCount);
  }

  pushToCPULoadQueue(value);
  
    //counter.innerText = JSON.stringify(cpuLoadQueues, null, 2);
    //event.sender.send('counter-value', newValue)
})