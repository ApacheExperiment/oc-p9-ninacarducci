const slides = [
	{
		"image":"slide1.webp",
    "alt":"Vue au hauteur de foule d'une scène de concert"
	},
	{
		"image":"slide2.webp",
	},
	{
		"image":"slide3.webp",
	}
]
/*Création des bullet points*/
const banner = document.getElementById('banner');
const dotsContainer = document.createElement('div');
dotsContainer.classList.add('dots');

/*Boucle des slides*/
for (const slide of slides) {
  const dot = document.createElement('div');
  dot.classList.add('dot');
  dotsContainer.appendChild(dot);
}

banner.appendChild(dotsContainer);

/* Mets en surbrillance le point actif (premier point au démarrage)*/
const dots = document.querySelectorAll('.dot');
dots[0].classList.add('dot_selected');

/* Gestion des flèches du carrousel*/
/***Sélection des flèches***/
const arrowLeft = document.querySelector('.arrow_left');
const arrowRight = document.querySelector('.arrow_right');

let currentSlide = 0; // Initialisation à 0, l'index du slide actuel

// Fonction pour avancer automatiquement le carrousel
function autoAdvance() {
  currentSlide++;
  if (currentSlide === slides.length) {
    currentSlide = 0; // Revenir au premier slide si on est à la fin
  }
  // Appel d'une fonction pour mettre à jour le slide
  updateSlide(currentSlide);
}

// Démarrez le défilement automatique au chargement de la page
let intervalId = setInterval(autoAdvance, 4000); // Changer 4000 pour régler la durée en millisecondes entre chaque changement de slide


/***Event Listeners***/
arrowLeft.addEventListener('click', () => {
  clearInterval(intervalId);
  console.log('clic sur la flèche de gauche');
  currentSlide--;
  if (currentSlide < 0) {
    currentSlide = slides.length - 1; // Retourner au dernier slide si on est au premier
  }
  // Appel d'une fonction pour mettre à jour le slide
  updateSlide(currentSlide);
});

arrowRight.addEventListener('click', () => {
  clearInterval(intervalId);
  console.log('clic sur la flèche de droite');
  currentSlide++;
  if (currentSlide === slides.length) {
    currentSlide = 0; // Revenir au premier slide si on est à la fin
  }
  // Appel d'une fonction pour mettre à jour le slide
  updateSlide(currentSlide);
});

/* Fonction pour mettre à jour le slide en fonction de l'index*/
function updateSlide(index) {
  const slideImage = document.querySelector('.banner-img');

  slideImage.src = `./assets/images/slider/${slides[index].image}`;

  /* Mise à jour de la surbrillance des bullet points*/
  dots.forEach(dot => dot.classList.remove('dot_selected'));
  dots[index].classList.add('dot_selected');
}