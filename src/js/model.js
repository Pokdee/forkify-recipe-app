import { API_NIDS, API_URL } from './config.js';
import { API_NS } from './config.js';
import { fetcher } from './helper.js';

export const state = {
  recipe: {},
  search: {
    query: '',
    results: [],
    pageLen: '',
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
    // console.log(`${recipesArray.length} items`);
    state.search.pageLen = Math.ceil(recipesArray.length / 10);
  } catch (error) {
    throw error;
  }
};

let start = 0;
let end = 1;
let pageLen = state.search.pageLen;

export const sortResult = function () {
  start = 0;
  end = 1;

  return state.search.results.slice(0, 10);
};

export const sortResultPrevNext = function (pageLen, key = true) {
  if (start < 0 || end > pageLen + 1) return;
  if (key) {
    start++;
    end++;
    return state.search.results.slice(start * 10, end * 10);
  } else {
    start--;
    end--;

    return state.search.results.slice(start * 10, end * 10);
  }
};

// export const sortResultNext = function (pageLen) {
//   if (start < 0 || end > pageLen + 1) return;

//   start++;
//   end++;
//   console.log('model next');
//   return state.search.results.slice(start * 10, end * 10);
// };

// export const sortResultPrev = function (pageLen) {
//   if (start < 0 || end > pageLen + 1) return;

//   start--;
//   end--;
//   console.log('model prev');
//   return state.search.results.slice(start * 10, end * 10);
// };
