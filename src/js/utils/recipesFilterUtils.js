import { advancedSearchTags, searchTags } from '../searchRecipes.js';
import recipes from '../data/recipes.js';

const recipeMatchesSearch = (recipe, search) => {
  const lowerSearch = search.toLowerCase().trim();

  if (
    recipe.name.toLowerCase().includes(lowerSearch) ||
    recipe.description.toLowerCase().includes(lowerSearch)
  ) {
    return true;
  }

  let i = 0;
  while (i < recipe.ingredients.length) {
    if (recipe.ingredients[i].ingredient.toLowerCase().includes(lowerSearch)) {
      return true;
    }
    i++;
  }

  return false;
};

const recipeMatchesTags = (recipe, tags) => {
  for (let i = 0; i < tags.length; i++) {
    const tag = tags[i];
    let found = false;

    if (
      recipe.name.toLowerCase().includes(tag) ||
      recipe.description.toLowerCase().includes(tag)
    ) {
      found = true;
    }

    let j = 0;
    while (j < recipe.ingredients.length) {
      if (recipe.ingredients[j].ingredient.toLowerCase().includes(tag)) {
        found = true;
        break;
      }
      j++;
    }

    if (!found) {
      return false;
    }
  }

  return true;
};

const recipeMatchesAdvancedTags = (recipe, tags) => {
  for (let i = 0; i < tags.length; i++) {
    const tag = tags[i];
    let found = false;

    let j = 0;
    while (j < recipe.ustensils.length) {
      if (recipe.ustensils[j].toLowerCase().includes(tag)) {
        found = true;
        break;
      }
      j++;
    }

    if (recipe.appliance.toLowerCase().includes(tag)) {
      found = true;
    }

    j = 0;
    while (j < recipe.ingredients.length) {
      if (recipe.ingredients[j].ingredient.toLowerCase().includes(tag)) {
        found = true;
        break;
      }
      j++;
    }

    if (!found) {
      return false;
    }
  }

  return true;
};

export const getFilteredRecipes = (searchInputValue = '') => {
  const searchLower = searchInputValue.toLowerCase().trim();
  let filteredRecipes = [];

  for (let i = 0; i < recipes.length; i++) {
    if (
      recipeMatchesTags(recipes[i], searchTags) &&
      recipeMatchesAdvancedTags(recipes[i], advancedSearchTags)
    ) {
      filteredRecipes.push(recipes[i]);
    }
  }

  if (searchLower.length >= 3) {
    let finalRecipes = [];

    for (let i = 0; i < filteredRecipes.length; i++) {
      if (recipeMatchesSearch(filteredRecipes[i], searchLower)) {
        finalRecipes.push(filteredRecipes[i]);
      }
    }

    filteredRecipes = finalRecipes;
  }

  return filteredRecipes;
};
