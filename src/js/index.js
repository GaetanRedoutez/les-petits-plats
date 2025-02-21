import {
  initializeSearch,
  addTag,
  addAdvancedTag,
  getFilteredRecipesFromTags,
  getFilteredRecipes,
} from './searchRecipes.js';
import { renderRecipes } from './displayRecipes.js';
import { renderOptions } from './filterTags.js';

// Query selector
const inputElement = document.querySelector('#search');
const searchBarButton = document.querySelector('#searchBarBtn');
const searchForm = document.querySelector('#searchForm');
const ingredientFilter = document.querySelector('#searchIngredientBtn');
const ingredientDropdown = document.querySelector('#ingredientDropdown');
const selectIngredient = document.querySelector('#selectIngredient');
const searchIngredient = document.querySelector('#searchIngredient');
const tagsContainer = document.querySelector('#tagsContainer');

// Afficher les recettes au chargement de la page
document.addEventListener('DOMContentLoaded', () => {
  renderRecipes(getFilteredRecipes());
});

// Gestion de la recherche
initializeSearch(searchForm, inputElement, tagsContainer);

// // Afficher les ingredients dans les filtres avancés
// renderOptions(
//   getFilteredRecipes().flatMap((recipe) =>
//     recipe.ingredients.map((ingredient) => ingredient.ingredient)
//   )
// );

// // Mettre à jour les ingrédients lorsqu'il y a une recherche
// inputElement.addEventListener('input', () => {
//   renderOptions(
//     getFilteredRecipes(inputElement.value).flatMap((recipe) =>
//       recipe.ingredients.map((ingredient) => ingredient.ingredient)
//     )
//   );
// });

// ingredientFilter.addEventListener('click', () => {
//   ingredientDropdown.classList.toggle('hidden');
// });

// searchIngredient.addEventListener('input', (event) => {
//   const searchValue = event.target.value.toLowerCase();
//   const filteredIngredients = allIngredients.filter((ingredient) =>
//     ingredient.toLowerCase().includes(searchValue)
//   );
//   renderOptions(filteredIngredients);
// });
