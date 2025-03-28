import { advancedSearchTags } from './searchRecipes.js';

const selectElements = {
  ingredient: document.querySelector('#selectIngredient'),
  appareil: document.querySelector('#selectAppareil'),
  ustensile: document.querySelector('#selectUstensile'),
};

const renderOptions = (selectElement, options) => {
  selectElement.innerHTML = '';
  const allowedOptions = options.filter(
    (option) => !advancedSearchTags.includes(option.toLowerCase())
  );

  allowedOptions.forEach((optionText) => {
    const option = document.createElement('option');
    option.value = optionText;
    option.textContent = optionText;
    option.classList.add('text-sm', 'truncate');
    selectElement.appendChild(option);
  });

  if (allowedOptions.length > 0 && allowedOptions.length < 5) {
    selectElement.size = allowedOptions.length;
  } else if (allowedOptions.length === 0) {
    selectElement.size = 1;
  } else {
    selectElement.size = 5;
  }
};

export const renderIngredients = (ingredients) =>
  renderOptions(selectElements.ingredient, ingredients);

export const renderAppareils = (appareils) =>
  renderOptions(selectElements.appareil, appareils);

export const renderUstensiles = (ustensiles) =>
  renderOptions(selectElements.ustensile, ustensiles);
