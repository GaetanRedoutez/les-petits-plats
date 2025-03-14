import { renderRecipes } from './displayRecipes.js';
import {
  getAppareils,
  getFilteredRecipes,
  getFilteredRecipesFromTags,
  getIngredients,
  initializeSearch,
  renderAppareils,
  renderIngredients,
} from './searchRecipes.js';

// Query selector
const inputElement = document.querySelector('#search');
const searchForm = document.querySelector('#searchForm');
const tagsContainer = document.querySelector('#tagsContainer');

const ingredientFilter = document.querySelector('#searchIngredientBtn');
const ingredientDropdown = document.querySelector('#ingredientDropdown');
const searchIngredient = document.querySelector('#searchIngredient');
const ingredientDropdownTags = document.querySelector(
  '#ingredientDropdownTags'
);

const appareilFilter = document.querySelector('#searchAppareilBtn');
const appareilDropdown = document.querySelector('#appareilDropdown');
const searchAppareil = document.querySelector('#searchAppareil');
const appareilDropdownTags = document.querySelector('#appareilDropdownTags');

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
  searchIngredient,
  searchAppareil,
  appareilDropdownTags
);

// Fonction pour afficher ou masquer le dropdown des ingrédients
ingredientFilter.addEventListener('click', () => {
  const filteredRecipes = getFilteredRecipesFromTags();
  const ingredient = getIngredients(filteredRecipes);
  renderIngredients(ingredient);
  ingredientDropdown.classList.toggle('hidden');
});

// Fonction pour afficher ou masquer le dropdown des appareils
appareilFilter.addEventListener('click', () => {
  const filteredRecipes = getFilteredRecipesFromTags();
  const appareils = getAppareils(filteredRecipes);
  console.log(appareils);
  renderAppareils(appareils);
  appareilDropdown.classList.toggle('hidden');
});
