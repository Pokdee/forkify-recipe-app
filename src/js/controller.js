// https://forkify-api.herokuapp.com/v2
///////////////////////////////////////
import { API_NIDS } from './config.js';
import * as model from './model.js';
import SearchView from './searchView.js';
import ResultView from './resultView.js';
import RecipeView from './recipeView.js';
import View from './view.js';

const showRecipe = async function () {
  try {
    const id = window.location.hash;
    if (!id) return;
    ResultView.spinner();

    await model.Loadrecipe(id);
    console.log(model.state.recipe);
    const { recipe } = model.state;
    ResultView.render(recipe);
  } catch (err) {
    console.log(err);
    ResultView.renderError();
  }
};
///////////////
let resultArray;
const loadRecipe = async function () {
  try {
    ResultView._cleaner();
    ResultView.spinner();
    const query = SearchView.getQuery();

    if (!query) {
      ResultView.renderError();
      return;
    }
    await model.loadSearchResult(query);
    resultArray = model.state.search.results;
    ResultView.render(resultArray);
  } catch (error) {
    ResultView.renderError();
  }
};
//////////////////

//subscriber

const init = function () {
  RecipeView.addHandlerRender(showRecipe);
  SearchView.addHandlerSearch(loadRecipe);
};
init();
