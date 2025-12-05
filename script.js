// Import Three.js and CSS2DRenderer for floating text
import * as THREE from "https://cdn.jsdelivr.net/npm/three@0.158/build/three.module.js";
import { CSS2DRenderer, CSS2DObject } from "https://cdn.jsdelivr.net/npm/three@0.158/examples/jsm/renderers/CSS2DRenderer.js";

// === Scene Setup ===
const scene = new THREE.Scene();
scene.background = new THREE.Color(0x87ceeb); // light blue sky

// === Camera Setup ===
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
camera.position.set(0, 5, -10);

// === Renderer Setup ===
const renderer = new THREE.WebGLRenderer({ canvas: document.querySelector("#bg"), antialias: true });
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);

// === Label Renderer for floating texts ===
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

// === Ground Plane ===
const groundGeometry = new THREE.PlaneGeometry(200, 200);
const groundMaterial = new THREE.MeshStandardMaterial({ color: 0x228B22 });
const ground = new THREE.Mesh(groundGeometry, groundMaterial);
ground.rotation.x = -Math.PI / 2;
scene.add(ground);

// === Cute Primitive 3D Car ===
const car = new THREE.Group();

// Car body
const bodyGeom = new THREE.BoxGeometry(4, 1.5, 2);
const bodyMat = new THREE.MeshStandardMaterial({ color: 0xff69b4 });
const body = new THREE.Mesh(bodyGeom, bodyMat);
body.position.y = 1;
car.add(body);

// Wheels
const wheelGeom = new THREE.CylinderGeometry(0.5, 0.5, 0.5, 32);
const wheelMat = new THREE.MeshStandardMaterial({ color: 0x333333 });
const positions = [
  [-1.5, 0.5, -1],
  [1.5, 0.5, -1],
  [-1.5, 0.5, 1],
  [1.5, 0.5, 1],
];
positions.forEach(pos => {
  const wheel = new THREE.Mesh(wheelGeom, wheelMat);
  wheel.rotation.z = Math.PI / 2;
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

texts.forEach((text, i) => {
  const div = document.createElement("div");
  div.className = "label";
  div.textContent = text;
  div.style.color = "white";
  div.style.fontSize = "20px";
  div.style.fontWeight = "bold";
  const label = new CSS2DObject(div);
  label.position.set(8, 2 + i * 3, -10 - i * 10);
  scene.add(label);
});

// === Camera Follow Setup ===
const cameraOffset = new THREE.Vector3(0, 5, -10);

function updateCamera() {
  const desiredPos = car.position.clone().add(cameraOffset);
  camera.position.lerp(desiredPos, 0.1); // smooth follow
  camera.lookAt(car.position);
}

// === WASD Controls ===
const keys = { w: false, a: false, s: false, d: false };
document.addEventListener("keydown", (e) => { keys[e.key.toLowerCase()] = true; });
document.addEventListener("keyup", (e) => { keys[e.key.toLowerCase()] = false; });

const carSpeed = 0.2;
const carTurnSpeed = 0.03;

function moveCar() {
  // Turn car
  if (keys.a) car.rotation.y += carTurnSpeed;
  if (keys.d) car.rotation.y -= carTurnSpeed;

  // Move forward/backward along car direction
  const direction = new THREE.Vector3(0, 0, -1).applyEuler(car.rotation);
  if (keys.w) car.position.add(direction.clone().multiplyScalar(carSpeed));
  if (keys.s) car.position.add(direction.clone().multiplyScalar(-carSpeed));
}

// === Animation Loop ===
function animate() {
  requestAnimationFrame(animate);

  moveCar();
  updateCamera();

  renderer.render(scene, camera);
  labelRenderer.render(scene, camera);
}

animate();

// === Handle window resizing ===
window.addEventListener("resize", () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
  labelRenderer.setSize(window.innerWidth, window.innerHeight);
});
