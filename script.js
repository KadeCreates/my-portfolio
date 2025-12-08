// Import Three.js and CSS2DRenderer from CDN
import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.158/build/three.module.js';
import { CSS2DRenderer, CSS2DObject } from 'https://cdn.jsdelivr.net/npm/three@0.158/examples/jsm/renderers/CSS2DRenderer.js';

// === Scene ===
const scene = new THREE.Scene();
scene.background = new THREE.Color(0x87ceeb); // light blue sky

// === Camera ===
const camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.1, 1000);
camera.position.set(0, 5, -10);

// === Renderer ===
const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector('#bg'),
  antialias: true
});
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);

// === Label Renderer ===
const labelRenderer = new CSS2DRenderer();
labelRenderer.setSize(window.innerWidth, window.innerHeight);
labelRenderer.domElement.style.position = "absolute";
labelRenderer.domElement.style.top = "0px";
document.body.appendChild(labelRenderer.domElement);

// === Lights ===
const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
const pointLight = new THREE.PointLight(0xffffff, 1);
pointLight.position.set(20, 20, 20);
scene.add(ambientLight, pointLight);

// === Ground ===
const groundGeo = new THREE.PlaneGeometry(200, 200);
const groundMat = new THREE.MeshStandardMaterial({ color: 0x228B22 });
const ground = new THREE.Mesh(groundGeo, groundMat);
ground.rotation.x = -Math.PI/2;
scene.add(ground);

// === 3D Car ===
const car = new THREE.Group();

// Car body
const bodyGeo = new THREE.BoxGeometry(4,1.5,2);
const bodyMat = new THREE.MeshStandardMaterial({ color: 0xff69b4 });
const body = new THREE.Mesh(bodyGeo, bodyMat);
body.position.y = 1;
car.add(body);

// Wheels
const wheelGeo = new THREE.CylinderGeometry(0.5,0.5,0.5,32);
const wheelMat = new THREE.MeshStandardMaterial({ color: 0x333333 });
const wheelPos = [
  [-1.5, 0.5, -1],
  [1.5, 0.5, -1],
  [-1.5, 0.5, 1],
  [1.5, 0.5, 1]
];
wheelPos.forEach(pos=>{
  const wheel = new THREE.Mesh(wheelGeo, wheelMat);
  wheel.rotation.z = Math.PI/2;
  wheel.position.set(...pos);
  car.add(wheel);
});

scene.add(car);

// === Floating Side Texts ===
const texts = [
  "Hi! I'm Kay, welcome to my portfolio!",
  "I love photography and digital design!",
  "Explore my work as you drive along!"
];

texts.forEach((txt,i)=>{
  const div = document.createElement("div");
  div.className = "label";
  div.textContent = txt;
  const label = new CSS2DObject(div);
  label.position.set(8, 2+i*3, -10-i*10);
  scene.add(label);
});

// === Camera Follow ===
const cameraOffset = new THREE.Vector3(0,5,-10);
function updateCamera(){
  const desiredPos = car.position.clone().add(cameraOffset);
  camera.position.lerp(desiredPos, 0.1);
  camera.lookAt(car.position);
}

// === WASD Controls ===
const keys = { w:false, a:false, s:false, d:false };
document.addEventListener("keydown", e=>{ keys[e.key.toLowerCase()]=true; });
document.addEventListener("keyup", e=>{ keys[e.key.toLowerCase()]=false; });

const carSpeed = 0.2;
const carTurnSpeed = 0.03;

function moveCar(){
  if(keys.a) car.rotation.y += carTurnSpeed;
  if(keys.d) car.rotation.y -= carTurnSpeed;
  const dir = new THREE.Vector3(0,0,-1).applyEuler(car.rotation);
  if(keys.w) car.position.add(dir.clone().multiplyScalar(carSpeed));
  if(keys.s) car.position.add(dir.clone().multiplyScalar(-carSpeed));
}

// === Animation Loop ===
function animate(){
  requestAnimationFrame(animate);
  moveCar();
  updateCamera();
  renderer.render(scene,camera);
  labelRenderer.render(scene,camera);
}

animate();

// === Window Resize ===
window.addEventListener("resize", ()=>{
  camera.aspect = window.innerWidth/window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
  labelRenderer.setSize(window.innerWidth, window.innerHeight);
});
