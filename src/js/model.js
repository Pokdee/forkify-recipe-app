import { API_URL, API_URL_NS, RES_PER_PAGE } from './config.js';
import { fetcher } from './helper.js';

export const state = {
  recipe: {},
  search: {
    query: '',
    results: [],
    page: 1,
  },
  bookmarked: [],
};
export const Loadrecipe = async function (id) {
  try {
    const data = await fetcher(`${API_URL}${id.slice(1)}`);
    let { recipe } = data.data;
    state.recipe = {
      id: recipe.id,
      title: recipe.title,
      publisher: recipe.publisher,
      srcUrl: recipe.source_url,
      Image: recipe.image_url,
      serving: recipe.servings,
      cookingTime: recipe.cooking_time,
      ingredients: recipe.ingredients,
    };
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
    const data = await fetcher(`${API_URL_NS}${food}`);
    let recipesArray = data.data.recipes;
    state.search.results = recipesArray.map(rec => {
      return {
        Image: rec.image_url,
        id: rec.id,
        title: rec.title,
        publisher: rec.publisher,
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

export const addBookmark = function (id) {
  ///mark bookmark
  if (state.recipe.id === id) state.recipe.bookmark = true;

  ////add to bookmarked array
  state.bookmarked.push(state.recipe);
};

export const deleteBookmark = function (id) {
  //get index
  const index = state.bookmarked.findIndex(rec => rec.id === id);

  //remove and unbook
  state.bookmarked.splice(index, 1);
  state.recipe.bookmark = false;
};
