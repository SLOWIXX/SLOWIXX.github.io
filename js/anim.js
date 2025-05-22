const carousel = document.querySelector('.carousel');
let speed = 0.4;

function animate() {
  const firstCard = carousel.children[0];
  const firstCardWidth = firstCard.offsetWidth + 20;

  carousel.style.transform = `translateX(-${speed}px)`;

  speed += 0.4;

  if (speed >= firstCardWidth) {
    carousel.appendChild(firstCard);
    carousel.style.transform = 'translateX(0)';
    speed = 0.4;
  }

  requestAnimationFrame(animate);
}

requestAnimationFrame(animate);
