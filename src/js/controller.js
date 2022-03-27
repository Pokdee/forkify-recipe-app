// https://forkify-api.herokuapp.com/v2
///////////////////////////////////////
import { API_NIDS } from './config.js';
import * as model from './model.js';
import SearchView from './searchView.js';
import ResultView from './resultView.js';
import RecipeView from './recipeView.js';
import paginationView from './paginationView.js';

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
    //clean container
    paginationView._cleaner();
    ResultView._cleaner();
    ResultView._pagination.innerHTML = '';
    ResultView.spinner();
    //get query
    const query = SearchView.getQuery();
    SearchView._cleanInput();

    if (!query) {
      ResultView.renderError();
      return;
    }

    //wait for results
    model.state.search.page = 1;
    await model.loadSearchResult(query);

    //render Result
    ResultView.render(model.sortResults());

    //render Pagination
    paginationView.render(model.state.search);
  } catch (error) {
    ResultView.renderError();
  }
};
//////////////////
const pagiController = function (page) {
  ResultView.render(model.sortResults(page));

  paginationView.render(model.state.search);
};
//subscriber

const init = function () {
  RecipeView.addHandlerRender(showRecipe);
  SearchView.addHandlerSearch(loadRecipe);
  paginationView.addHandlerPagi(pagiController);
};
init();
