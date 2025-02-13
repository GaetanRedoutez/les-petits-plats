import recipes from './data/recipes.js';

/**
 * Filtre les recettes en fonction du titre, des ingrédients ou de la description.
 * @param {string} searchInputValue - Le texte de recherche.
 * @returns {Array} - La liste des recettes filtrées.
 */
export function getFilteredRecipes(searchInputValue = '') {
  if (searchInputValue.length < 3) {
    return recipes;
  }

  const searchLower = searchInputValue.toLowerCase();

  return recipes.filter(
    (recipe) =>
      recipe.name.toLowerCase().includes(searchLower) ||
      recipe.description.toLowerCase().includes(searchLower) ||
      recipe.ingredients.some((ing) =>
        ing.ingredient.toLowerCase().includes(searchLower)
      )
  );
}
