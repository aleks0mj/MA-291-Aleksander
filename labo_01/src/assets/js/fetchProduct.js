/*
    Fonction principale qui charge les produits
    depuis le fichier JSON et les affiche dans la page
*/
async function loadProducts() {

    // Récupérer le conteneur HTML qui doit recevoir les produits
    const container = document.getElementById("product-list");

    // Si le conteneur n'existe pas, on arrête la fonction pour éviter une erreur JavaScript
    if (!container) return;

    try {

        /*
            Récupérer le fichier JSON avec fetch, await permet d'attendre la réponse du serveur
        */
        const response = await fetch("../../data/products.json");

        /*
            2Vérifier si la requête HTTP s'est bien passée, response.ok est vrai si le code HTTP est entre 200 et 299
        */
        if (!response.ok) {
            throw new Error("Erreur lors du chargement du fichier JSON");
        }

        /*
            Convertir la réponse en objet JavaScript, le JSON devient un tableau de produits
        */
        const products = await response.json();

        /*
            Créer un DocumentFragment, cela permet de construire les éléments en mémoire avant de les ajouter au DOM (meilleures performances)
        */
        const fragment = document.createDocumentFragment();

        /*
            Parcourir chaque produit du tableau
        */
        products.forEach(product => {

            /*
                Créer un élément div qui représentera un produit dans la page
            */
            const productItem = document.createElement("div");

            // Ajouter la classe CSS
            productItem.classList.add("product-item");

            /*
                Construire le HTML interne du produit avec les données venant du JSON
            */
            productItem.innerHTML = `
                <img src="${product.image}" alt="${product.alt}">

                <div class="product-info">

                    <h3 class="product-title">${product.title}</h3>

                    <p>${product.description}</p>

                    <p class="product-price">$${product.price}</p>

                    <a href="#" class="btn">Add to Cart</a>

                </div>
            `;

            /*
                Ajouter le produit dans le fragment (pas encore dans la page)
            */
            fragment.appendChild(productItem);

        });

        /*
            Ajouter tous les produits dans le DOM en une seule opération
        */
        container.appendChild(fragment);

    } catch (error) {

        /*
            Gestion des erreurs (problème réseau, fichier introuvable, etc.)
        */
        console.error("Erreur lors du chargement des produits :", error);

    }

}

/*
    Lancer la fonction lorsque le script est chargé
*/
loadProducts();
 