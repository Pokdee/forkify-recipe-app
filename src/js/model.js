import addRecipeView from './addRecipeView.js';
import { API_KEY, API_URL, API_URL_NS, RES_PER_PAGE } from './config.js';
import { ajaxCall } from './helper.js';
const storage = JSON.parse(localStorage.getItem('bookmarks'));

export const state = {
  recipe: {},
  search: {
    query: '',
    results: [],
    page: 1,
  },
  bookmarked: storage ? storage : [],
};
const objCreator = function (recipe) {
  return {
    id: recipe.id,
    title: recipe.title,
    publisher: recipe.publisher,
    srcUrl: recipe.source_url,
    Image: recipe.image_url,
    serving: recipe.servings,
    cookingTime: recipe.cooking_time,
    ingredients: recipe.ingredients,
    ...(recipe.key && { key: recipe.key }),
  };
};
export const Loadrecipe = async function (id) {
  try {
    const data = await ajaxCall(`${API_URL}/${id.slice(1)}?key=${API_KEY}`);
    let { recipe } = data.data;

    state.recipe = objCreator(recipe);

    if (state.bookmarked.some(recipe => recipe.id === state.recipe.id)) {
      state.recipe.bookmark = true;
    } else {
      state.recipe.bookmark = false;
    }
  } catch (error) {
    throw new Error(error.message);
  }
};

export const loadSearchResult = async function (food) {
  try {
    state.search.query = food;
    const data = await ajaxCall(`${API_URL_NS}/${food}&key=${API_KEY}`);
    let recipesArray = data.data.recipes;
    state.search.results = recipesArray.map(rec => {
      return {
        Image: rec.image_url,
        id: rec.id,
        title: rec.title,
        publisher: rec.publisher,
        ...(rec.key && { key: rec.key }),
      };
    });
  } catch (error) {
    throw error;
  }
};

export const sortResults = function (page = state.search.page) {
  state.search.page = page;
  const start = (page - 1) * RES_PER_PAGE;
  const end = page * RES_PER_PAGE;
  return state.search.results.slice(start, end);
};

export const updateServing = function (newServing) {
  if (newServing === 0) return;

  state.recipe.ingredients.forEach(ing => {
    ing.quantity = (ing.quantity * newServing) / state.recipe.serving; //ingQt * newSv/OldSv
  });
  state.recipe.serving = newServing;
};

export const storeBookmark = function () {
  localStorage.setItem('bookmarks', JSON.stringify(state.bookmarked));
};

export const addBookmark = function (id) {
  ///mark bookmark
  if (state.recipe.id === id) state.recipe.bookmark = true;

  ////add to bookmarked array
  state.bookmarked.push(state.recipe);
  storeBookmark();
};

export const deleteBookmark = function (id) {
  //get index
  const index = state.bookmarked.findIndex(rec => rec.id === id);

  //remove and unbook
  state.bookmarked.splice(index, 1);
  state.recipe.bookmark = false;
  storeBookmark();
};
export const recipeUpload = async function (data) {
  try {
    ///filter ingredient part
    const filterData = Object.entries(data).filter(array => {
      if (array[0].startsWith('ingredient') && array[1] !== '') {
        return array;
      }
    });
    ////remove space and make different array for each ingre
    let ingreArray = filterData.map(array => {
      return array[1].split(',');
    });

    //// make ingredient object
    const ingredient = ingreArray.map(array => {
      if (array.length !== 3) throw new Error('Please input in right format');
      return {
        quantity: array[0] ? +array[0].trim() : null,
        unit: array[1].trim(),
        description: array[2].trim(),
      };
    });
    const recipe = {
      title: data.title,
      cooking_time: +data.cookingTime,
      ingredients: ingredient,
      publisher: data.publisher,
      servings: +data.servings,
      source_url: data.sourceUrl,
      image_url: data.image,
    };
    const req = await ajaxCall(`${API_URL}?key=${API_KEY}`, recipe);
    let returnRecipe = req.data.recipe;

    state.recipe = objCreator(returnRecipe);
    addBookmark(state.recipe);
  } catch (error) {
    throw error;
  }
};

localStorage.clear();
