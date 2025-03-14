import { renderRecipes } from './displayRecipes.js';
import {
  getFilteredRecipes,
  getFilteredRecipesFromTags,
  getIngredients,
  initializeSearch,
  renderOptions,
} from './searchRecipes.js';

// Query selector
const inputElement = document.querySelector('#search');
const searchBarButton = document.querySelector('#searchBarBtn');
const searchForm = document.querySelector('#searchForm');
const ingredientFilter = document.querySelector('#searchIngredientBtn');
const ingredientDropdown = document.querySelector('#ingredientDropdown');
const selectIngredient = document.querySelector('#selectIngredient');
const searchIngredient = document.querySelector('#searchIngredient');
const tagsContainer = document.querySelector('#tagsContainer');
const ingredientDropdownTags = document.querySelector(
  '#ingredientDropdownTags'
);

// Afficher les recettes au chargement de la page
document.addEventListener('DOMContentLoaded', () => {
  renderRecipes(getFilteredRecipes());
});

// Initialisation de la recherche
initializeSearch(
  searchForm,
  inputElement,
  tagsContainer,
  ingredientDropdownTags,
  selectIngredient,
  searchIngredient
);

// Fonction pour afficher ou masquer le dropdown des ingrédients
ingredientFilter.addEventListener('click', () => {
  const filteredRecipes = getFilteredRecipesFromTags();
  const ingredient = getIngredients(filteredRecipes);
  renderOptions(ingredient);
  ingredientDropdown.classList.toggle('hidden');
});
