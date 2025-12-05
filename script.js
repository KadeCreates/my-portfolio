// Import Three.js as a module
import * as THREE from "https://cdn.jsdelivr.net/npm/three@0.158/build/three.module.js";

// === Scene Setup ===
const scene = new THREE.Scene();
scene.background = new THREE.Color(0x000000); // black background

// === Camera Setup ===
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
camera.position.set(0, 5, 20);

// === Renderer Setup ===
const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector("#bg"),
  antialias: true
});
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);

// === Lights ===
const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
const pointLight = new THREE.PointLight(0xffffff, 1);
pointLight.position.set(20, 20, 20);
scene.add(ambientLight, pointLight);

// === Sample Cube (will later be replaced with 3D car) ===
const geometry = new THREE.BoxGeometry(5, 5, 5);
const material = new THREE.MeshStandardMaterial({ color: 0x00ffea });
const cube = new THREE.Mesh(geometry, material);
scene.add(cube);

// === Animation Loop ===
function animate() {
  requestAnimationFrame(animate);

  // Rotate cube
  cube.rotation.x += 0.01;
  cube.rotation.y += 0.01;

  renderer.render(scene, camera);
}

animate();

// === Handle window resizing ===
window.addEventListener("resize", () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});
