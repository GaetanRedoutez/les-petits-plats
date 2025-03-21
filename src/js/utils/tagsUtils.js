import { advancedSearchTags, searchTags } from '../searchRecipes.js';
import { renderRecipes } from '../displayRecipes.js';
import { getFilteredRecipes } from './recipesFilterUtils.js';

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
    const index = searchTags.indexOf(lowerTag);
    if (index !== -1) {
      searchTags.splice(index, 1);
    }
    tagNode.remove();
    renderRecipes(getFilteredRecipes());
  });

  tagNode.appendChild(textNode);
  tagNode.appendChild(removeButton);

  container.appendChild(tagNode);
};

export const addTag = (tagText, tagsContainer) => {
  const lowerTag = tagText.toLowerCase();
  if (searchTags.includes(lowerTag)) return;
  searchTags.push(lowerTag);
  createSimpleTag(tagText, tagsContainer);
};

export const addAdvancedTag = (tagText, container, dropdown, tagsContainer) => {
  const lowerTag = tagText.toLowerCase();
  if (advancedSearchTags.includes(lowerTag)) return;
  advancedSearchTags.push(lowerTag);

  const removeTag = (isDpTags) => {
    const index = advancedSearchTags.indexOf(lowerTag);
    if (index !== -1) {
      advancedSearchTags.splice(index, 1);
    }
    tagNode.remove();
    dropdownTagNode.remove();
    if (isDpTags) dropdown.classList.toggle('hidden');
    renderRecipes(getFilteredRecipes());
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
