// Fonction pour créer les boutons de filtre
function createFilterButtons(categories) {
  const filterContainer = document.getElementById('buttonsFilter');
  
  // Bouton "Tous"
  const allButton = document.createElement('button');
  allButton.textContent = 'Tous';
  allButton.setAttribute('data-filter', 'all');
  allButton.classList.add('button-filter');
  allButton.addEventListener('click', handleFilterButtonClick);
  filterContainer.appendChild(allButton);
  
  // Création des boutons pour chaque catégorie
  categories.forEach(category => {
  const button = document.createElement('button');
  button.textContent = category.name;
  button.setAttribute('data-filter', category.id); // Utilisation de l'ID de la catégorie
  button.classList.add('button-filter');
  button.addEventListener('click', handleFilterButtonClick);
  filterContainer.appendChild(button);
  });
}

// Fonction pour gérer le filtrage lorsqu'un bouton de filtrage est cliqué
function handleFilterButtonClick(event) {
    const filterValue = event.target.getAttribute('data-filter');
    const images = document.querySelectorAll('.gallery img');
  
    // Réinitialisation du compteur d'images visibles
    let visibleImageCount = 0;
  
    // Parcours de toutes les images
    images.forEach(image => {
      const categoryId = image.getAttribute('data-category-id');
      if (filterValue === 'all' || categoryId === filterValue) {
        // Afficher l'image si elle correspond au filtre ou si "Tous" est sélectionné
        image.style.display = 'block';
        visibleImageCount++; // Incrémentation du nombre d'images visibles
      } else {
        // Masquer l'image si elle ne correspond pas au filtre
        image.style.display = 'none';
      }
    });
  
    // Réinitialisation de la grille pour masquer les cellules vides
    document.querySelector('.gallery').style.gridAutoRows = 'auto';
  
    // Ajustement de la hauteur de la grille pour cacher les cellules vides
    const rowCount = Math.ceil(visibleImageCount / 3);
    const rowHeight = 440; // Hauteur de chaque ligne
    document.querySelector('.gallery').style.height = `${rowCount * rowHeight}px`;
  }
  

// Chargement des données depuis le fichier JSON
fetch('./assets/datas/gallery.json')
  .then(response => response.json())
  .then(data => {
      const categories = [];
      data.gallery.forEach(project => {
          if (!categories.find(cat => cat.id === project.category.id)) {
              categories.push({ id: project.category.id, name: project.category.name });
          }
      });
      createFilterButtons(categories);
  })
  .catch(error => console.error('Erreur de chargement du fichier JSON:', error));
