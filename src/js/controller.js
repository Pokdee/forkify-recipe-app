// https://forkify-api.herokuapp.com/v2
///////////////////////////////////////

import * as model from './model.js';
import SearchView from './searchView.js';
import ResultView from './resultView.js';
import RecipeView from './recipeView.js';
import paginationView from './paginationView.js';
const showRecipe = async function () {
  try {
    const id = '#5ed6604591c37cdc054bc886'; //window.location.hash;
    if (!id) return;
    RecipeView.spinner();

    await model.Loadrecipe(id);
    const { recipe } = model.state;

    RecipeView.render(recipe);
  } catch (err) {
    console.log(err);
    RecipeView.renderError();
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

const servingController = function (serving) {
  const newServing = model.state.recipe.serving + serving;
  model.updateServing(newServing);
  RecipeView.render(model.state.recipe);
};

//subscriber
const init = function () {
  RecipeView.addHandlerRender(showRecipe);
  RecipeView.addHandlerServing(servingController);
  SearchView.addHandlerSearch(loadRecipe);
  paginationView.addHandlerPagi(pagiController);
};
init();
