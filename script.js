const landing = document.getElementById("landing");
const enterText = document.getElementById("enter-text");
const gameContainer = document.getElementById("game-container");
const car = document.getElementById("car");
const road = document.getElementById("road");
const portfolios = document.querySelectorAll(".portfolio");

let carPos = { x: 0, y: 0 }; // relative to bottom center
const carSpeed = 5;
let keys = { w: false, a: false, s: false, d: false };
let offsetY = 0; // for infinite road scrolling

// --- Landing click ---
enterText.addEventListener("click", () => {
  enterText.style.transform = "scale(2)";
  enterText.style.opacity = "0";
  landing.style.opacity = "0";

  setTimeout(() => {
    landing.classList.add("hidden");
    gameContainer.classList.remove("hidden");
  }, 1000);
});

// --- WASD Controls ---
document.addEventListener("keydown", (e) => {
  keys[e.key.toLowerCase()] = true;
});

document.addEventListener("keyup", (e) => {
  keys[e.key.toLowerCase()] = false;
});

// --- Game Loop ---
function animate() {
  requestAnimationFrame(animate);

  // Move car horizontally
  if (keys.a) carPos.x -= carSpeed;
  if (keys.d) carPos.x += carSpeed;

  // Keep car on road horizontally
  const roadWidth = 100;
  if (carPos.x < -roadWidth / 2 + 20 || carPos.x > roadWidth / 2 - 20) {
    gameOver();
  }

  // Move road/portfolios down to simulate car moving up
  if (keys.w) offsetY += carSpeed;
  if (keys.s && offsetY > 0) offsetY -= carSpeed;

  road.style.top = -offsetY + "px";

  portfolios.forEach((p) => {
    const pTop = parseInt(p.style.top);
    if (offsetY >= pTop - window.innerHeight / 2) {
      p.style.opacity = 1;
    }
    p.style.top = pTop - offsetY + "px";
  });

  // Update car position
  car.style.transform = `translateX(${carPos.x}px)`;
}

animate();

// --- Game Over ---
function gameOver() {
  car.style.background = "red";
  setTimeout(() => {
    car.style.background = "#ff69b4";
    carPos.x = 0;
    offsetY = 0;
    portfolios.forEach((p) => (p.style.opacity = 0));
  }, 500);
}
