/*
    Fonction principale qui charge les produits
    depuis le fichier JSON et les affiche dans la page
*/
async function loadProducts() {

    const container = document.getElementById("product-list");

    if (!container) return;

    // éviter les doublons si reload
    container.innerHTML = "";

    try {

        const response = await fetch("https://dummyjson.com/products");

        if (!response.ok) {
            throw new Error("Erreur lors du chargement du fichier JSON");
        }

        const data = await response.json();
        const products = data.products;

        const fragment = document.createDocumentFragment();

        products.forEach(product => {

            const productItem = document.createElement("div");
            productItem.classList.add("product-item");

            productItem.innerHTML = `
            <img src="${product.thumbnail}" alt="${product.title}">
        
            <div class="product-info">
                <h3 class="product-title">${product.title}</h3>
                <p>${product.description}</p>
                <p class="product-price">$${product.price}</p>
                <a href="#" class="btn">Add to Cart</a>
            </div>
        `;

            fragment.appendChild(productItem);

        });

        container.appendChild(fragment);

    } catch (error) {
        console.error("Erreur lors du chargement des produits :", error);
    }
}

/*
    Fonction pour vider les produits
*/
function clearProducts() {
    const container = document.getElementById("product-list");
    container.innerHTML = "";
}

/*
    Gestion du bouton Load / Clear
*/
const button = document.getElementById("loadBtn");

let isLoaded = false;

button.addEventListener("click", async () => {

    if (!isLoaded) {
        await loadProducts();
        button.textContent = "Clear data";
        isLoaded = true;
    } else {
        clearProducts();
        button.textContent = "Load data";
        isLoaded = false;
    }

});