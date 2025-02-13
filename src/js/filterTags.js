export const renderOptions = (ingredients) => {
  console.log(ingredients);
  while (selectIngredient.firstChild) {
    selectIngredient.removeChild(selectIngredient.firstChild);
  }

  ingredients.some((ingredient) => {
    const option = document.createElement('option');
    option.value = ingredient;
    option.textContent = ingredient;
    selectIngredient.appendChild(option);
    return false;
  });
};
