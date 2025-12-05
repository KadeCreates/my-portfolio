// === Scene Setup ===
const scene = new THREE.Scene();
scene.background = new THREE.Color(0xBFEFFF); // cute sky-blue

const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
);
camera.position.set(0, 5, 10);

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.getElementById("intro").appendChild(renderer.domElement);

// === Lighting ===
const ambient = new THREE.AmbientLight(0xffffff, 0.8);
scene.add(ambient);

const directional = new THREE.DirectionalLight(0xffffff, 1);
directional.position.set(10, 20, 10);
scene.add(directional);

// === Controls (TEMP for testing) ===
const controls = new THREE.OrbitControls(camera, renderer.domElement);

// === Placeholder Cube (TEMP until we add car model) ===
const geometry = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshStandardMaterial({ color: 0xff69b4 });
const cube = new THREE.Mesh(geometry, material);
scene.add(cube);

// === Animation Loop ===
function animate() {
    requestAnimationFrame(animate);

    cube.rotation.y += 0.01;

    renderer.render(scene, camera);
}
animate();

// === Resize Handling ===
window.addEventListener("resize", () => {
    renderer.setSize(window.innerWidth, window.innerHeight);
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
});
