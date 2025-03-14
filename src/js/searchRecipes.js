import recipes from './data/recipes.js';
import { renderRecipes } from './displayRecipes.js';

// ********************************* Variables ********************************* \\

let searchTags = [];
let advancedSearchTags = [];

// ********************************* Display les options de dropdown ********************************* \\

export const renderOptions = (ingredients) => {
  selectIngredient.innerHTML = '';
  const filteredIngredients = ingredients.filter(
    (ingredient) => !advancedSearchTags.includes(ingredient.toLowerCase())
  );
  filteredIngredients.forEach((ingredient) => {
    const option = document.createElement('option');
    option.value = ingredient;
    option.textContent = ingredient;
    selectIngredient.appendChild(option);
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
        recipe.ingredients.some((ing) =>
          ing.ingredient.toLowerCase().includes(tag)
        )
    );

    const matchesAdvancedTags = advancedSearchTags.every((tag) =>
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
  selectIngredient
) => {
  let filteredRecipes = getFilteredRecipesFromTags();
  let ingredient = getIngredients(filteredRecipes);

  const updateDatas = () => {
    renderRecipes(getFilteredRecipesFromTags());
    renderOptions(getIngredients(getFilteredRecipesFromTags()));
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
    updateDatas();
  });

  searchInput.addEventListener('input', () => {
    filteredRecipes = getFilteredRecipesFromTags(searchInput.value);
    ingredient = getIngredients(filteredRecipes);
    updateDatas();
  });

  selectIngredient.addEventListener('change', (e) => {
    const selectedValue = e.target.value;

    if (selectedValue === '' || advancedSearchTags.includes(selectedValue)) {
      return;
    }

    addDropdownTag(selectedValue, ingredientDropdownTags);

    ingredient = getIngredients(filteredRecipes);
    updateDatas();

    document.querySelector('#ingredientDropdown').classList.toggle('hidden');
  });
};

// Récupérer tous les ingrédients des recettes
export const getIngredients = (recipes) => {
  const ingredientsSet = new Set();
  recipes.forEach((recipe) => {
    recipe.ingredients.forEach((ing) => {
      ingredientsSet.add(ing.ingredient);
    });
  });
  return Array.from(ingredientsSet).sort();
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

  const tagTextNode = document.createTextNode(tagText);
  const removeButton = document.createElement('button');
  removeButton.textContent = 'x';
  removeButton.classList.add(
    'remove-tag',
    'ml-2',
    'hidden',
    'cursor-pointer',
    'group-hover:block' // Affiche la croix au survol
  );

  removeButton.addEventListener('click', () => {
    advancedSearchTags = advancedSearchTags.filter(
      (tag) => tag !== tagText.toLowerCase()
    );
    tagElement.remove();
    renderOptions(getIngredients(getFilteredRecipesFromTags()));
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
