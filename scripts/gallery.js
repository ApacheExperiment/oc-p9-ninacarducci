// Déclarer une variable globale pour stocker les noms de fichiers des images de la galerie
let images = [];

fetch('./assets/datas/gallery.json')
  .then(response => response.json()) 
  .then(data => {
    // Stocker les noms de fichiers dans la variable globale
    images = data.gallery.map(project => project.image); // Stocker uniquement les noms de fichiers
    handleData(data.gallery);
  })
  .catch(error => console.error('Erreur de chargement du fichier JSON:', error));

// Fonction pour traiter les données et les afficher dans la galerie
function handleData(data) {
  const galerie = document.querySelector('.gallery');
  
  // Parcours des données pour créer et ajouter des éléments d'image à la galerie
  data.forEach((project) => {
    const image = document.createElement('img');
    image.src = `./assets/images/gallery/${project.image}`;
    image.alt = project.title;
    image.setAttribute('data-category-id', project.categoryId); // Ajout de l'ID de la catégorie
    
    // Ajout du gestionnaire d'événement clic pour afficher la modal
    image.addEventListener('click', () => {
      const modal = document.getElementById('modalGallery');
      const modalImg = document.getElementById('modalImage');
      modal.style.display = 'block';
      
      // Récupérer l'index du nom de fichier de l'image dans le tableau des images
      const index = images.indexOf(project.image);
      modalImg.src = `./assets/images/gallery/${project.image}`;
      
    
    });

    galerie.appendChild(image); // Ajoutez l'image à la galerie
  });
}

// Récupération des flèches de navigation
const arrowLeft = document.getElementById('arrowL');
const arrowRight = document.getElementById('arrowR');


// Écouteur d'événement pour la flèche de gauche
arrowLeft.addEventListener('click', () => {
  showPreviousImage();
});

// Écouteur d'événement pour la flèche de droite
arrowRight.addEventListener('click', () => {
  showNextImage();
});

// Fonction pour afficher l'image précédente
function showPreviousImage() {
  const modalImg = document.getElementById('modalImage');
  let currentIndex = images.indexOf(modalImg.src.split('/').pop()); // Extraire le nom de fichier de l'URL de l'image actuelle

  // Si l'index est le premier, ajuster pour afficher la dernière image
  if (currentIndex === 0) {
    currentIndex = images.length; // Dernière image
  }

  const newIndex = currentIndex - 1;
  modalImg.src = `./assets/images/gallery/${images[newIndex]}`; // Utiliser le chemin complet avec le nouveau nom de fichier
  
}

// Fonction pour afficher l'image suivante
function showNextImage() {
  const modalImg = document.getElementById('modalImage');
  let currentIndex = images.indexOf(modalImg.src.split('/').pop()); // Extraire le nom de fichier de l'URL de l'image actuelle

  // Si l'index est le dernier, ajuster pour afficher la première image
  if (currentIndex === images.length - 1) {
    currentIndex = -1; // Première image
  }

  const newIndex = currentIndex + 1;
  modalImg.src = `./assets/images/gallery/${images[newIndex]}`; // Utiliser le chemin complet avec le nouveau nom de fichier
  
}

// Fermer la modal lorsque vous cliquez en dehors d'elle
window.addEventListener('click', (event) => {
  const modal = document.getElementById('modalGallery');
  if (event.target === modal) {
    modal.style.display = 'none';
  }
});

