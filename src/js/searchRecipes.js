import { renderRecipes } from './displayRecipes.js';
import {
  renderAppareils,
  renderIngredients,
  renderUstensiles,
} from './displayAdvanced.js';
import { getFilteredRecipes } from './utils/recipesFilterUtils.js';
import {
  getAppareils,
  getIngredients,
  getUstensiles,
} from './utils/filterUtils.js';
import { addAdvancedTag, addTag } from './utils/tagsUtils.js';

// ********************************* Variables ********************************* \\

export let searchTags = [];
export let advancedSearchTags = [];

const selectIngredient = document.querySelector('#selectIngredient');
const selectAppareil = document.querySelector('#selectAppareil');
const selectUstensile = document.querySelector('#selectUstensile');

const updateDatas = (searchInputValue = '', advancedSearchTags) => {
  const filteredRecipes = getFilteredRecipes(searchInputValue);

  renderRecipes(filteredRecipes);
  renderIngredients(getIngredients(filteredRecipes), advancedSearchTags);
  renderAppareils(getAppareils(filteredRecipes), advancedSearchTags);
  renderUstensiles(getUstensiles(filteredRecipes), advancedSearchTags);
};

// ********************************* Fonction principale ********************************* \\
export const initializeSearch = (
  searchForm,
  searchInput,
  tagsContainer,
  searchIngredient,
  ingredientDropdownTags,
  ingredientDropdown,
  searchAppareil,
  appareilDropdownTags,
  appareilDropdown,
  searchUstensile,
  ustensileDropdownTags,
  ustensileDropdown
) => {
  let filteredRecipes = getFilteredRecipes();
  let ingredient = getIngredients(filteredRecipes);
  let appareil = getAppareils(filteredRecipes);
  let ustensile = getUstensiles(filteredRecipes);

  searchForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const searchValue = searchInput.value.trim();
    if (
      searchValue.length < 3 ||
      searchTags.includes(searchValue.toLowerCase())
    )
      return;

    addTag(searchValue, tagsContainer);
    searchInput.value = '';
    ingredient = getIngredients(filteredRecipes);
    appareil = getAppareils(filteredRecipes);
    ustensile = getUstensiles(filteredRecipes);
    updateDatas('', advancedSearchTags);
  });

  searchInput.addEventListener('input', (e) => {
    ingredient = getIngredients(filteredRecipes);
    appareil = getAppareils(filteredRecipes);
    ustensile = getUstensiles(filteredRecipes);
    updateDatas(e.target.value, advancedSearchTags);
  });

  /******* INGREDIENT *******/
  searchIngredient.addEventListener('input', (e) => {
    const searchValue = e.target.value.toLowerCase().trim();

    const filteredIngredients = ingredient.filter((ingredient) =>
      ingredient.toLowerCase().includes(searchValue)
    );

    renderIngredients(filteredIngredients);
  });

  selectIngredient.addEventListener('change', (e) => {
    const selectedValue = e.target.value.trim();

    if (selectedValue === '') return;

    addAdvancedTag(
      selectedValue,
      ingredientDropdownTags,
      ingredientDropdown,
      tagsContainer
    );
    selectIngredient.value = '';
    ingredient = getIngredients(filteredRecipes);
    updateDatas('', advancedSearchTags);
    ingredientDropdown.classList.toggle('hidden');
  });

  /******* APPAREIL *******/
  searchAppareil.addEventListener('input', (e) => {
    const searchValue = e.target.value.toLowerCase().trim();

    const filteredAppareils = appareil.filter((appareil) =>
      appareil.toLowerCase().includes(searchValue)
    );

    renderAppareils(filteredAppareils);
  });

  selectAppareil.addEventListener('change', (e) => {
    const selectedValue = e.target.value.toLowerCase().trim();

    if (selectedValue === '') return;

    addAdvancedTag(
      selectedValue,
      appareilDropdownTags,
      appareilDropdown,
      tagsContainer
    );

    selectAppareil.value = '';
    appareil = getAppareils(filteredRecipes);
    updateDatas('', advancedSearchTags);
    appareilDropdown.classList.toggle('hidden');
  });

  /******* USTENSILE *******/
  searchUstensile.addEventListener('input', (e) => {
    const searchValue = e.target.value.toLowerCase().trim();

    const filteredUstensiles = ustensile.filter((ust) =>
      ust.toLowerCase().includes(searchValue)
    );

    renderUstensiles(filteredUstensiles);
  });

  selectUstensile.addEventListener('change', (e) => {
    const selectedValue = e.target.value.trim();

    if (selectedValue === '') return;

    addAdvancedTag(
      selectedValue,
      ustensileDropdownTags,
      ustensileDropdown,
      tagsContainer
    );

    selectUstensile.value = '';
    ustensile = getUstensiles(filteredRecipes);
    updateDatas('', advancedSearchTags);
    ustensileDropdown.classList.toggle('hidden');
  });
};
