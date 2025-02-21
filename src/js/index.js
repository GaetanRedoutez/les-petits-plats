import { renderRecipes } from './displayRecipes.js';
import { getFilteredRecipes, initializeSearch } from './searchRecipes.js';

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
  renderRecipes(getFilteredRecipes(inputElement));
});

// Gestion de la recherche
initializeSearch(searchForm, inputElement, tagsContainer);
