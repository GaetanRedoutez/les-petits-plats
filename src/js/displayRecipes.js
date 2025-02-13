/**
 * Ajoute des classes à un élément.
 * @param {HTMLElement} element - L'élément auquel ajouter des classes.
 * @param {string} classes - Les classes à ajouter.
 */
const addClasses = (element, classes) => {
  element.classList.add(...classes);
};

/**
 * Crée la section d'image d'une recette avec un label de temps.
 * @param {Object} recipe - La recette.
 * @returns {HTMLElement} - La section d'image.
 */
const createImageSection = ({ image, name, time }) => {
  const divImage = document.createElement('div');
  addClasses(divImage, ['relative']);

  const imageElement = document.createElement('img');
  imageElement.src = `../public/images/recipe/${image}`;
  imageElement.alt = name;
  addClasses(imageElement, ['w-full', 'h-[253px]', 'object-cover']);

  const timeLabel = document.createElement('div');
  timeLabel.textContent = `${time}min`;
  addClasses(timeLabel, [
    'absolute',
    'right-5',
    'top-5',
    'font-[Manrope]',
    'text-xs',
    'px-4',
    'py-1',
    'bg-amber-300',
    'rounded-xl',
  ]);

  divImage.append(imageElement, timeLabel);
  return divImage;
};

/**
 * Crée la section d'informations d'une recette (titre et description).
 * @param {Object} recipe - La recette.
 * @returns {HTMLElement} - L'élément contenant les informations.
 */
const createRecipeInfo = ({ name }) => {
  const divOne = document.createElement('div');
  addClasses(divOne, ['px-[25px]', 'pt-[30px]']);

  const title = document.createElement('h3');
  title.textContent = name;
  addClasses(title, ['text-lg']);
  divOne.appendChild(title);

  const divTwo = document.createElement('div');
  addClasses(divTwo, ['font-[Manrope]', 'mt-[29px]']);
  divOne.appendChild(divTwo);

  return { divOne, divTwo };
};

/**
 * Crée la description de la recette.
 * @param {Object} recipe - La recette.
 * @param {HTMLElement} divTwo - L'élément pour ajouter la description.
 */
const createDescription = ({ description }, divTwo) => {
  const recetteLabel = document.createElement('p');
  recetteLabel.textContent = 'Recette';
  addClasses(recetteLabel, [
    'text-xs',
    'text-[#7A7A7A]',
    'mb-[15px]',
    'uppercase',
  ]);
  divTwo.appendChild(recetteLabel);

  const descriptionElement = document.createElement('p');
  descriptionElement.textContent = description;
  addClasses(descriptionElement, [
    'text-sm',
    'mb-[32px]',
    'line-clamp-4',
    'overflow-hidden',
    'text-ellipsis',
  ]);
  divTwo.appendChild(descriptionElement);
};

/**
 * Crée la liste des ingrédients de la recette.
 * @param {Array} ingredients - Les ingrédients de la recette.
 * @param {HTMLElement} divTwo - L'élément pour ajouter la liste des ingrédients.
 */
const createIngredients = (ingredients, divTwo) => {
  const ingredientLabel = document.createElement('p');
  ingredientLabel.textContent = 'Ingrédients';
  addClasses(ingredientLabel, [
    'text-xs',
    'text-[#7A7A7A]',
    'mb-[15px]',
    'uppercase',
  ]);
  divTwo.appendChild(ingredientLabel);

  const ingredientsList = document.createElement('ul');
  addClasses(ingredientsList, ['grid', 'grid-cols-2', 'gap-y-[21px]']);
  ingredients.forEach(({ ingredient, quantity, unit }) => {
    const listItem = document.createElement('li');
    const nameItem = document.createElement('p');
    nameItem.textContent = ingredient;

    const quantityItem = document.createElement('p');
    quantityItem.textContent = `${quantity || ''} ${unit || ''}`.trim();

    listItem.append(nameItem, quantityItem);
    addClasses(listItem, ['text-sm']);
    addClasses(quantityItem, ['text-[#7A7A7A]']);
    ingredientsList.appendChild(listItem);
  });

  divTwo.appendChild(ingredientsList);
};

/**
 * Crée un article pour une recette.
 * @param {Object} recipe - La recette.
 * @returns {HTMLElement} - L'article de recette.
 */
const createArticle = (recipe) => {
  const article = document.createElement('article');
  addClasses(article, [
    'bg-white',
    'shadow-md',
    'rounded-xl',
    'w-[380px]',
    'h-[731px]',
    'overflow-hidden',
  ]);

  const divImage = createImageSection(recipe);
  article.appendChild(divImage);

  const { divOne, divTwo } = createRecipeInfo(recipe);
  article.appendChild(divOne);

  createDescription(recipe, divTwo);
  createIngredients(recipe.ingredients, divTwo);

  return article;
};

/**
 * Affiche toutes les recettes.
 * @param {Array} recipes - La liste des recettes.
 */
export const renderRecipes = (recipes, inputValue) => {
  const container = document.querySelector('#recipes');
  const infoText = document.createElement('p');
  container.innerHTML = ''; // Nettoie le contenu précédent
  console.log(recipes.length, inputValue);
  if (recipes.length >= 1) {
    recipes.forEach((recipe) => {
      const article = createArticle(recipe);
      container.appendChild(article);
    });
  } else {
    infoText.textContent = `Aucune recette ne contient ${inputValue} vous pouvez chercher « tarte aux pommes », « poisson », etc.`;
    container.appendChild(infoText);
  }
};
