import { API_NIDS, API_URL } from './config.js';
import { API_NS } from './config.js';
import { fetcher } from './helper.js';

export const state = {
  recipe: {},
  search: {
    query: '',
    results: [],
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
    const data = await fetcher(`${API_NS}${food}`);
    let recipesArray = data.recipes;
    state.search.results = recipesArray.map(rec => {
      return {
        Image: rec.image_url,
        id: rec.recipe_id,
        title: rec.title,
        publisher: rec.publisher,
      };
    });
    console.log(state.search.results.length);
  } catch (error) {
    throw error;
  }
};

let start = 0;
let end = 10;

export const sortResult = function () {
  return state.search.results.slice(start, end);
};
