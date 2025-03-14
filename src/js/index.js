import { renderRecipes } from './displayRecipes.js';
import {
  getAppareils,
  getFilteredRecipes,
  getFilteredRecipesFromTags,
  getIngredients,
  getUstensiles,
  initializeSearch,
  renderAppareils,
  renderIngredients,
  renderUstensiles,
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

const ustensileFilter = document.querySelector('#searchUstensileBtn');
const ustensileDropdown = document.querySelector('#ustensileDropdown');
const searchUstensile = document.querySelector('#searchUstensile');
const ustensileDropdownTags = document.querySelector('#appareilDropdownTags');

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
  appareilDropdownTags,
  searchUstensile,
  ustensileDropdownTags
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
  renderAppareils(appareils);
  appareilDropdown.classList.toggle('hidden');
});

// Fonction pour afficher ou masquer le dropdown des ustensiles
ustensileFilter.addEventListener('click', () => {
  const filteredRecipes = getFilteredRecipesFromTags();
  const ustensiles = getUstensiles(filteredRecipes);
  console.log(ustensiles);
  renderUstensiles(ustensiles);
  ustensileDropdown.classList.toggle('hidden');
});
