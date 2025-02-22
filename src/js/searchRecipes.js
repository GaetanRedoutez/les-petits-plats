import recipes from './data/recipes.js';
import { renderRecipes } from './displayRecipes.js';

let searchTags = [];
let advancedSearchTags = [];

/**
 * Crée et affiche un élément de tag.
 * @param {string} tagText - Texte du tag.
 * @param {HTMLElement} container - Conteneur des tags.
 * @param {string} type - Type de tag ('search' ou 'advanced').
 */
function createTagElement(tagText, container, type) {
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
}

/**
 * Ajoute un tag à la liste des filtres actifs (barre de recherche).
 * @param {string} tagText - Texte du tag.
 * @param {HTMLElement} tagsContainer - Conteneur des tags.
 */
export function addTag(tagText, tagsContainer) {
  searchTags.push(tagText.toLowerCase());
  createTagElement(tagText, tagsContainer, 'search');
}

/**
 * Ajoute un tag avancé à la liste des filtres avancés.
 * @param {string} tagText - Texte du tag avancé.
 * @param {HTMLElement} tagsContainer - Conteneur des tags avancés.
 */
export function addAdvancedTag(tagText, tagsContainer) {
  if (advancedSearchTags.includes(tagText.toLowerCase())) return;

  advancedSearchTags.push(tagText.toLowerCase());
  createTagElement(tagText, tagsContainer, 'advanced');
}

/**
 * Filtre les recettes en fonction de la saisie utilisateur uniquement.
 * @param {string} searchInputValue - Texte de recherche.
 * @returns {Array} - Liste des recettes filtrées.
 */
export function getFilteredRecipes(searchInputValue = '') {
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
}

/**
 * Filtre les recettes
 * @param {string} searchInputValue - Texte de la barre de recherche.
 * @returns {Array} - Liste des recettes filtrées.
 */
export function getFilteredRecipesFromTags(searchInputValue = '') {
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
        recipe.ingredients.some((ing) =>
          ing.ingredient.toLowerCase().includes(tag)
        ) ||
        (recipe.category && recipe.category.toLowerCase().includes(tag))
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
}

/**
 * Initialise la gestion des recherches et des tags.
 * @param {HTMLFormElement} searchForm - Le formulaire de recherche.
 * @param {HTMLInputElement} searchInput - Le champ de recherche.
 * @param {HTMLElement} tagsContainer - Conteneur des tags de recherche.
 */
export function initializeSearch(searchForm, searchInput, tagsContainer) {
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
    renderRecipes(getFilteredRecipesFromTags());
  });

  searchInput.addEventListener('input', () => {
    renderRecipes(getFilteredRecipesFromTags(searchInput.value));
  });

  document.querySelectorAll('.advanced-search-option').forEach((btn) => {
    btn.addEventListener('click', () => {
      const tagText = btn.getAttribute('data-tag');
      addAdvancedTag(tagText, advancedTagsContainer);
      renderRecipes(getFilteredRecipesFromTags());
    });
  });
}
