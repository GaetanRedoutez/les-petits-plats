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

// Initialisation de la recherche
initializeSearch(searchForm, inputElement, tagsContainer);
