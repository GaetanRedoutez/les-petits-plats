import recipes from './data/recipes.js';
import { renderRecipes } from './displayRecipes.js';

// ********************************* Variables ********************************* \\

let searchTags = [];
let advancedSearchTags = [];

const selectIngredient = document.querySelector('#selectIngredient');
const selectAppareil = document.querySelector('#selectAppareil');
const selectUstensile = document.querySelector('#selectUstensile');

// ********************************* Display les options de dropdown ********************************* \\

export const getIngredients = (recipes) => {
  const ingredientsSet = new Set();
  recipes.forEach((recipe) => {
    recipe.ingredients.forEach((ing) => {
      ingredientsSet.add(ing.ingredient);
    });
  });
  return Array.from(ingredientsSet).sort();
};

export const renderIngredients = (ingredients) => {
  selectIngredient.innerHTML = '';
  const filteredIngredients = ingredients.filter(
    (ingredient) => !advancedSearchTags.includes(ingredient.toLowerCase())
  );

  filteredIngredients.forEach((ingredient) => {
    const option = document.createElement('option');
    option.value = ingredient;
    option.textContent = ingredient;
    option.classList.add('text-sm', 'truncate');
    selectIngredient.appendChild(option);
  });
};

export const getAppareils = (recipes) => {
  const appareilsSet = new Set();
  recipes.forEach((recipe) => {
    appareilsSet.add(recipe.appliance);
  });
  return Array.from(appareilsSet).sort();
};

export const renderAppareils = (appareils) => {
  selectAppareil.innerHTML = '';
  const filteredAppareils = appareils.filter(
    (appareil) => !advancedSearchTags.includes(appareil.toLowerCase())
  );

  filteredAppareils.forEach((appareil) => {
    const option = document.createElement('option');
    option.value = appareil;
    option.textContent = appareil;
    option.classList.add('text-sm', 'truncate');
    selectAppareil.appendChild(option);
  });
};

export const getUstensiles = (recipes) => {
  const ustensilesSet = new Set();
  recipes.forEach((recipe) => {
    recipe.ustensils.forEach((ust) => {
      ustensilesSet.add(ust);
    });
  });
  return Array.from(ustensilesSet).sort();
};

export const renderUstensiles = (ustensiles) => {
  selectUstensile.innerHTML = '';
  const filteredUstensiles = ustensiles.filter(
    (ustensile) => !advancedSearchTags.includes(ustensile.toLowerCase())
  );

  filteredUstensiles.forEach((ustensile) => {
    const option = document.createElement('option');
    option.value = ustensile;
    option.textContent = ustensile;
    option.classList.add('text-sm', 'truncate');
    selectUstensile.appendChild(option);
  });
};

// ********************************* Filtrage ********************************* \\

export const getFilteredRecipes = (searchInputValue = '') => {
  const searchLower = searchInputValue.toLowerCase().trim();
  return recipes.filter(
    (recipe) =>
      recipe.name.toLowerCase().includes(searchLower) ||
      recipe.description.toLowerCase().includes(searchLower) ||
      recipe.ingredients.some((ing) =>
        ing.ingredient.toLowerCase().includes(searchLower)
      )
  );
};

export const getFilteredRecipesFromTags = (searchInputValue = '') => {
  const searchLower = searchInputValue.toLowerCase().trim();
  let filteredRecipes = recipes.filter((recipe) => {
    const matchesSearchTags = searchTags.every(
      (tag) =>
        recipe.name.toLowerCase().includes(tag) ||
        recipe.description.toLowerCase().includes(tag) ||
        recipe.ingredients.some((ing) =>
          ing.ingredient.toLowerCase().includes(tag)
        )
    );

    const matchesAdvancedTags = advancedSearchTags.every(
      (tag) =>
        recipe.ustensils.some((ust) => ust.toLowerCase().includes(tag)) ||
        recipe.appliance.toLowerCase().includes(tag) ||
        recipe.ingredients.some((ing) =>
          ing.ingredient.toLowerCase().includes(tag)
        )
    );

    return matchesSearchTags && matchesAdvancedTags;
  });

  // Filtre si un texte est saisi
  if (searchLower.length >= 3) {
    filteredRecipes = filteredRecipes.filter(
      (recipe) =>
        recipe.name.toLowerCase().includes(searchLower) ||
        recipe.description.toLowerCase().includes(searchLower) ||
        recipe.appliance.toLowerCase().includes(searchLower) ||
        recipe.ingredients.some((ing) =>
          ing.ingredient.toLowerCase().includes(searchLower)
        )
    );
  }

  return filteredRecipes;
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
  let filteredRecipes = getFilteredRecipesFromTags();
  let ingredient = getIngredients(filteredRecipes);
  let appareil = getAppareils(filteredRecipes);
  let ustensile = getUstensiles(filteredRecipes);

  const updateDatas = () => {
    const filteredRecipes = getFilteredRecipesFromTags();

    renderRecipes(filteredRecipes);
    renderIngredients(getIngredients(filteredRecipes));
    renderAppareils(getAppareils(filteredRecipes));
    renderUstensiles(getUstensiles(filteredRecipes));
  };

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
    updateDatas();
  });

  searchInput.addEventListener('input', () => {
    if (searchInput.trim().length >= 3) {
      filteredRecipes = getFilteredRecipes(searchInput.value);
      ingredient = getIngredients(filteredRecipes);
      appareil = getAppareils(filteredRecipes);
      ustensile = getUstensiles(filteredRecipes);
      updateDatas();
    }
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
    updateDatas();
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
    const selectedValue = e.target.value.trim();

    if (selectedValue === '') return;

    addAdvancedTag(
      selectedValue,
      appareilDropdownTags,
      appareilDropdown,
      tagsContainer
    );

    selectAppareil.value = '';
    appareil = getAppareils(filteredRecipes);
    updateDatas();
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
    updateDatas();
    ustensileDropdown.classList.toggle('hidden');
  });
};

// ********************************* TAGS ********************************* \\

const createSimpleTag = (tagText, container) => {
  const lowerTag = tagText.toLowerCase().trim();

  const tagNode = document.createElement('div');
  tagNode.className =
    'tag mx-2 px-4 h-[53px] rounded-lg flex flex-row justify-between items-center bg-amber-300';

  const textNode = document.createElement('span');
  textNode.textContent = tagText;
  textNode.className = 'group-hover:font-bold truncate whitespace-nowrap';

  const removeButton = document.createElement('button');
  removeButton.textContent = 'x';
  removeButton.className = 'remove-tag pl-6 cursor-pointer';

  removeButton.addEventListener('click', () => {
    searchTags = searchTags.filter((tag) => tag !== lowerTag);
    tagNode.remove();
    renderRecipes(getFilteredRecipesFromTags());
  });

  tagNode.appendChild(textNode);
  tagNode.appendChild(removeButton);

  container.appendChild(tagNode);
};

const addTag = (tagText, tagsContainer) => {
  const lowerTag = tagText.toLowerCase();
  if (searchTags.includes(lowerTag)) return;
  searchTags.push(lowerTag);
  createSimpleTag(tagText, tagsContainer);
};

const addAdvancedTag = (tagText, container, dropdown, tagsContainer) => {
  const lowerTag = tagText.toLowerCase();
  if (advancedSearchTags.includes(lowerTag)) return;
  advancedSearchTags.push(lowerTag);

  const removeTag = (isDpTags) => {
    advancedSearchTags = advancedSearchTags.filter((tag) => tag !== lowerTag);
    tagNode.remove();
    dropdownTagNode.remove();
    isDpTags && dropdown.classList.toggle('hidden');
    renderRecipes(getFilteredRecipesFromTags());
  };

  // tagsContainer
  const tagNode = document.createElement('div');
  tagNode.className =
    'tag mx-2 px-4 h-[53px] rounded-lg flex flex-row justify-between items-center bg-amber-300';
  const tagSpan = document.createElement('span');
  tagSpan.textContent = tagText;
  tagSpan.className = 'group-hover:font-bold truncate whitespace-nowrap';
  const removeButton = document.createElement('button');
  removeButton.textContent = 'x';
  removeButton.className = 'remove-tag pl-6 cursor-pointer';
  removeButton.addEventListener('click', () => removeTag(false));
  tagNode.appendChild(tagSpan);
  tagNode.appendChild(removeButton);

  // DropdownTags
  const dropdownTagNode = document.createElement('div');
  dropdownTagNode.className =
    'tag w-full px-4 h-[37px] flex justify-between items-center bg-amber-300 text-sm group';
  const dropdownTagSpan = document.createElement('span');
  dropdownTagSpan.textContent = tagText;
  dropdownTagSpan.className =
    'group-hover:font-bold truncate whitespace-nowrap';
  const dropdownRemoveButton = document.createElement('button');
  dropdownRemoveButton.textContent = 'x';
  dropdownRemoveButton.className =
    'remove-tag ml-2 hidden cursor-pointer group-hover:block';
  dropdownRemoveButton.addEventListener('click', () => removeTag(true));
  dropdownTagNode.appendChild(dropdownTagSpan);
  dropdownTagNode.appendChild(dropdownRemoveButton);

  tagsContainer.appendChild(tagNode);
  container.appendChild(dropdownTagNode);
};
