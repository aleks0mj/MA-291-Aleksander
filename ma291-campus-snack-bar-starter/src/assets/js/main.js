import fetchSnacks from './fetchSnacks.js';
import fetchSalesPoints from './fetchSalesPoints.js';

const loadSnacksBtn = document.querySelector('#load-snacks-btn');
const snacksContainer = document.querySelector('#snacks-container');
const feedback = document.querySelector('#feedback');

// Références pour les points de vente
const toggleSalesBtn = document.querySelector('#toggle-sales-btn');
const salesSection = document.querySelector('#sales-section');
const salesContainer = document.querySelector('#sales-container');
const salesFeedback = document.querySelector('#sales-feedback');

// Variable d'état pour ne pas recharger les données à chaque clic
let salesLoaded = false;
let salesVisible = false;

loadSnacksBtn.addEventListener('click', loadSnacks);
toggleSalesBtn.addEventListener('click', toggleSalesPoints);

// Charger les snacks
async function loadSnacks() {
  feedback.textContent = '';

  try {
    const snacks = await fetchSnacks();
    displaySnacks(snacks);
  } catch (error) {
    console.error(error);
    feedback.textContent = 'Impossible de charger les snacks.';
  }
}

// Afficher les snacks
function displaySnacks(snacks) {
  snacksContainer.innerHTML = snacks.map((snack) => `
    <article class="card">
      <img src="${snack.imageUrl}" alt="${snack.alt}">
      <div class="card-content">
        <h3>${snack.name.toUpperCase()}</h3>
        <p>${snack.description}</p>
        <p class="price">CHF ${snack.price.toFixed(2)}</p>
        <span class="fake-action">Commander</span>
      </div>
    </article>
  `).join('');
}

// Afficher ou masquer les points de vente
async function toggleSalesPoints() {
  // Charger les données seulement la première fois
  if (!salesLoaded) {
    await loadSalesPoints();
  }

  salesVisible = !salesVisible;

  if (salesVisible) {
    salesSection.classList.remove('hidden');
    toggleSalesBtn.textContent = 'Masquer les points de vente';
  } else {
    salesSection.classList.add('hidden');
    toggleSalesBtn.textContent = 'Afficher les points de vente';
  }
}

// Charger les points de vente
async function loadSalesPoints() {
  salesFeedback.textContent = '';

  try {
    const points = await fetchSalesPoints();
    displaySalesPoints(points);
    salesLoaded = true;
  } catch (error) {
    console.error(error);
    salesFeedback.textContent = 'Impossible de charger les points de vente.';
  }
}

// Afficher les points de vente
function displaySalesPoints(points) {
  salesContainer.innerHTML = points.map((point) => `
    <article class="sales-point-card">
      <h3>${point.building}</h3>
      <p><strong>Salle :</strong> ${point.room}</p>
      <p><strong>Horaires :</strong> ${point.openingHours}</p>
      <p><strong>Email :</strong> ${point.email}</p>
    </article>
  `).join('');
}
