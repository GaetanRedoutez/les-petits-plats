const getFilteredValues = (recipes, getValues) => {
  const values = new Set();
  recipes.forEach((recipe) => {
    getValues(recipe).forEach((value) => values.add(value));
  });
  return Array.from(values).sort();
};

export const getIngredients = (recipes) =>
  getFilteredValues(recipes, (recipe) =>
    recipe.ingredients.map((ing) => ing.ingredient)
  );

export const getAppareils = (recipes) =>
  getFilteredValues(recipes, (recipe) => [recipe.appliance]);

export const getUstensiles = (recipes) =>
  getFilteredValues(recipes, (recipe) => recipe.ustensils);
