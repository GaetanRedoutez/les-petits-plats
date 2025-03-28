import { advancedSearchTags, searchTags } from '../searchRecipes.js';
import recipes from '../data/recipes.js';

const recipeMatchesSearch = (recipe, search) => {
  const lowerSearch = search.toLowerCase().trim();
  return (
    recipe.name.toLowerCase().includes(lowerSearch) ||
    recipe.description.toLowerCase().includes(lowerSearch) ||
    recipe.ingredients.some((ing) =>
      ing.ingredient.toLowerCase().includes(lowerSearch)
    )
  );
};

const recipeMatchesTags = (recipe, tags) =>
  tags.every(
    (tag) =>
      recipe.name.toLowerCase().includes(tag) ||
      recipe.description.toLowerCase().includes(tag) ||
      recipe.ingredients.some((ing) =>
        ing.ingredient.toLowerCase().includes(tag)
      )
  );

const recipeMatchesAdvancedTags = (recipe, tags) =>
  tags.every(
    (tag) =>
      recipe.ustensils.some((ust) => ust.toLowerCase().includes(tag)) ||
      recipe.appliance.toLowerCase().includes(tag) ||
      recipe.ingredients.some((ing) =>
        ing.ingredient.toLowerCase().includes(tag)
      )
  );

export const getFilteredRecipes = (searchInputValue = '') => {
  const searchLower = searchInputValue.toLowerCase().trim();

  let filteredRecipes = recipes.filter((recipe) => {
    return (
      recipeMatchesTags(recipe, searchTags) &&
      recipeMatchesAdvancedTags(recipe, advancedSearchTags)
    );
  });

  if (searchLower.length >= 3) {
    filteredRecipes = filteredRecipes.filter((recipe) =>
      recipeMatchesSearch(recipe, searchLower)
    );
  }

  return filteredRecipes;
};
