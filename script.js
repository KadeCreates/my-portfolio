const landing = document.getElementById("landing");
const enterText = document.getElementById("enter-text");
const portfolio = document.getElementById("portfolio");

enterText.addEventListener("click", () => {
  // Animate text and landing fade-out
  enterText.style.transform = "scale(2)";
  enterText.style.opacity = "0";
  landing.style.opacity = "0";

  // Wait for animation to finish
  setTimeout(() => {
    landing.classList.add("hidden");
    portfolio.classList.remove("hidden");
  }, 1000); // matches CSS transition duration
});
