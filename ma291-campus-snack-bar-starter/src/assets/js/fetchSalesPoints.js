// Récupérer les points de vente depuis le json
export default async function fetchSalesPoints() {
  const response = await fetch('../data/points-of-sale.json');

  if (!response.ok) {
    throw new Error(`Erreur lors du chargement des points de vente: ${response.status}`);
  }

  return response.json();
}
