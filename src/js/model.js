import { API_URL } from './config.js';
import { API_NS } from './config.js';
import { fetcher } from './helper.js';

export const state = {
  recipe: {},
  recipesArray: [],
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
    const req = await fetch(`${API_NS}=${food}`);
    const data = await req.json();
    state.recipesArray = data.recipes;
  } catch (error) {
    throw error;
  }
};
