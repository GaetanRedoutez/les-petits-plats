const inputElement = document.querySelector('#search');
const recipeSection = document.querySelector('#recipes');

if (recipeSection && inputElement) {
  inputElement.addEventListener('input', (event) => {
    const searchInputValue = event.target.value;

    if (searchInputValue.length >= 3) {
      console.log(searchInputValue);
    }
  });
}
