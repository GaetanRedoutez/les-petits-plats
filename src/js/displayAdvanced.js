import { advancedSearchTags } from './searchRecipes.js';

const selectElements = {
  ingredient: document.querySelector('#selectIngredient'),
  appareil: document.querySelector('#selectAppareil'),
  ustensile: document.querySelector('#selectUstensile'),
};

const renderOptions = (selectElement, options) => {
  selectElement.innerHTML = '';
  options
    .filter((option) => !advancedSearchTags.includes(option.toLowerCase()))
    .forEach((optionText) => {
      const option = document.createElement('option');
      option.value = optionText;
      option.textContent = optionText;
      option.classList.add('text-sm', 'truncate');
      selectElement.appendChild(option);
    });
};

export const renderIngredients = (ingredients) =>
  renderOptions(selectElements.ingredient, ingredients);

export const renderAppareils = (appareils) =>
  renderOptions(selectElements.appareil, appareils);

export const renderUstensiles = (ustensiles) =>
  renderOptions(selectElements.ustensile, ustensiles);
