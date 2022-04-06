import { API_URL, API_URL_NS, RES_PER_PAGE } from './config.js';
import { fetcher } from './helper.js';
const storedbookmark = JSON.parse(localStorage.getItem('Bookmarks'));

export const state = {
  recipe: {},
  search: {
    query: '',
    results: [],
    page: 1,
  },
  bookmarksid: storedbookmark ? storedbookmark : [],
  bookmarkrecipes: [],
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
    if (state.bookmarksid.includes(state.recipe.id)) {
      state.recipe.bookmark = true;
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

export const storeBookmark = function (recipeid) {
  state.bookmarksid.push(recipeid);
  if (recipeid === state.recipe.id) state.recipe.bookmark = true;
  localStorage.setItem('Bookmarks', JSON.stringify(state.bookmarksid));
};

export const loadBookmarks = async function (id) {
  try {
    const data = await fetcher(`${API_URL}${id}`);
    let { recipe } = data.data;
    recipe = {
      id: recipe.id,
      Image: recipe.image_url,
      title: recipe.title,
      publisher: recipe.publisher,
    };
    state.bookmarkrecipes.push(recipe);
  } catch (error) {
    throw error;
  }
};
