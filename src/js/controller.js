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
let resultPageLen;
const loadRecipe = async function () {
  try {
    ResultView._cleaner();
    ResultView._pagination.innerHTML = '';
    ResultView.spinner();
    const query = SearchView.getQuery();

    if (!query) {
      ResultView.renderError();
      return;
    }
    await model.loadSearchResult(query);
    resultPageLen = Math.ceil(model.state.search.results.length / 10);
    console.log(resultPageLen);
    ResultView.render(model.sortResult());
    ResultView.renderPagination(resultPageLen);
    ResultView.renderPreNextPagi(4);
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
