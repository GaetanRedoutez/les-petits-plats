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

  console.log(filteredAppareils, appareils);
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

  console.log(filteredUstensiles, ustensiles);
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
  if (searchInputValue.length < 3) {
    return recipes;
  }

  const searchLower = searchInputValue.toLowerCase().trim();
  return recipes.filter(
    (recipe) =>
      recipe.name.toLowerCase().includes(searchLower) ||
      recipe.description.toLowerCase().includes(searchLower) ||
      recipe.appliance.toLowerCase().includes(searchLower) ||
      recipe.ingredients.some((ing) =>
        ing.ingredient.toLowerCase().includes(searchLower)
      )
  );
};

export const getFilteredRecipesFromTags = (searchInputValue = '') => {
  let filteredRecipes = recipes.filter((recipe) => {
    const matchesSearchTags = searchTags.every(
      (tag) =>
        recipe.name.toLowerCase().includes(tag) ||
        recipe.description.toLowerCase().includes(tag) ||
        recipe.appliance.toLowerCase().includes(tag) ||
        recipe.ingredients.some((ing) =>
          ing.ingredient.toLowerCase().includes(tag)
        )
    );

    const matchesAdvancedTags = advancedSearchTags.every(
      (tag) =>
        recipe.appliance.toLowerCase().includes(tag) ||
        recipe.ingredients.some((ing) =>
          ing.ingredient.toLowerCase().includes(tag)
        )
    );

    return matchesSearchTags && matchesAdvancedTags;
  });

  // Filtre si un texte est saisi
  if (searchInputValue.trim().length >= 3) {
    const searchLower = searchInputValue.toLowerCase().trim();
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
  ingredientDropdownTags,
  searchIngredient,
  searchAppareil,
  appareilDropdownTags,
  searchUstensile,
  ustensileDropdownTags
) => {
  let filteredRecipes = getFilteredRecipesFromTags();
  let ingredient = getIngredients(filteredRecipes);
  let appareil = getAppareils(filteredRecipes);

  const updateDatas = () => {
    renderRecipes(getFilteredRecipesFromTags());
    renderIngredients(getIngredients(getFilteredRecipesFromTags()));
    renderAppareils(getAppareils(getFilteredRecipesFromTags()));
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
    updateDatas();
  });

  searchInput.addEventListener('input', () => {
    filteredRecipes = getFilteredRecipesFromTags(searchInput.value);
    ingredient = getIngredients(filteredRecipes);
    appareil = getAppareils(filteredRecipes);
    updateDatas();
  });

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

    addDropdownTag(selectedValue, ingredientDropdownTags);

    selectIngredient.value = '';
    ingredient = getIngredients(filteredRecipes);
    updateDatas();
    document.querySelector('#ingredientDropdown').classList.toggle('hidden');
  });

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

    addDropdownTag(selectedValue, appareilDropdownTags);

    selectAppareil.value = '';
    appareil = getAppareils(filteredRecipes);
    updateDatas();
    document.querySelector('#appareilDropdown').classList.toggle('hidden');
  });
};

// ********************************* TAGS ********************************* \\

const createTagElement = (tagText, container, type) => {
  const tagElement = document.createElement('div');
  const tagTextNode = document.createTextNode(tagText);
  const removeButton = document.createElement('button');
  removeButton.textContent = 'x';
  removeButton.classList.add('remove-tag', 'pl-6');

  removeButton.addEventListener('click', () => {
    if (type === 'search') {
      searchTags = searchTags.filter((tag) => tag !== tagText.toLowerCase());
    } else {
      advancedSearchTags = advancedSearchTags.filter(
        (tag) => tag !== tagText.toLowerCase()
      );
    }
    tagElement.remove();
    renderRecipes(getFilteredRecipesFromTags());
  });

  tagElement.appendChild(tagTextNode);
  tagElement.appendChild(removeButton);
  tagElement.classList.add(
    'tag',
    'mx-2',
    'px-4',
    'h-[53px]',
    'rounded-lg',
    'flex',
    'flex-row',
    'justify-between',
    'items-center',
    'bg-amber-300'
  );
  container.appendChild(tagElement);
};

export const addTag = (tagText, tagsContainer) => {
  searchTags.push(tagText.toLowerCase());
  createTagElement(tagText, tagsContainer, 'search');
};

const addDropdownTag = (tagText, container, tagsContainer) => {
  if (advancedSearchTags.includes(tagText.toLowerCase())) return;

  advancedSearchTags.push(tagText.toLowerCase());

  const tagElement = document.createElement('div');
  tagElement.classList.add(
    'tag',
    'w-full',
    'px-4',
    'h-[37px]',
    'flex',
    'justify-between',
    'items-center',
    'bg-amber-300',
    'text-sm',
    'group'
  );

  const removeButton = document.createElement('button');
  removeButton.textContent = 'x';
  removeButton.classList.add(
    'remove-tag',
    'ml-2',
    'hidden',
    'cursor-pointer',
    'group-hover:block'
  );

  removeButton.addEventListener('click', () => {
    advancedSearchTags = advancedSearchTags.filter(
      (tag) => tag !== tagText.toLowerCase()
    );
    tagElement.remove();
    renderIngredients(getIngredients(getFilteredRecipesFromTags()));
    renderRecipes(getFilteredRecipesFromTags());
  });

  const tagTextElement = document.createElement('span');
  tagTextElement.textContent = tagText;
  tagTextElement.classList.add(
    'group-hover:font-bold',
    'truncate',
    'whitespace-nowrap'
  );

  tagElement.appendChild(tagTextElement);
  tagElement.appendChild(removeButton);
  container.appendChild(tagElement);
};
