import { API_URL, API_URL_NS, RES_PER_PAGE } from './config.js';
import { fetcher } from './helper.js';

export const state = {
  recipe: {},
  search: {
    query: '',
    results: [],
    page: 1,
  },
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
        id: rec.recipe_id,
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
