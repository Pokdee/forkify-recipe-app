// https://forkify-api.herokuapp.com/v2
///////////////////////////////////////

import * as model from './model.js';
import SearchView from './searchView.js';
import ResultView from './resultView.js';
import RecipeView from './recipeView.js';
import PaginationView from './paginationView.js';

const showRecipe = async function () {
  try {
    ///take id
    const id = window.location.hash;
    if (!id) return;

    ////Add spinner
    RecipeView.spinner();

    ////load Results
    await model.Loadrecipe(id);
    const { recipe } = model.state;

    /////Reload preview result
    ResultView.update(model.sortResults());

    //////Render result
    RecipeView.render(recipe);
  } catch (err) {
    console.log(err);
    RecipeView.renderError();
  }
};

///////////////
let resultPageLen;
const loadSearchRecipe = async function () {
  try {
    //clean container

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
    const data = await model.loadSearchResult(query);

    //render Result
    ResultView.render(model.sortResults());

    //render Pagination
    PaginationView.render(model.state.search);
  } catch (error) {
    console.log(error);

    ResultView.renderError();
  }
};
//////////////////
const pagiController = function (page) {
  ResultView.render(model.sortResults(page));

  PaginationView.render(model.state.search);
};

const servingController = function (serving) {
  const newServing = model.state.recipe.serving + serving;
  model.updateServing(newServing);
  RecipeView.update(model.state.recipe);
};

//subscriber
const init = function () {
  RecipeView.addHandlerRender(showRecipe);
  RecipeView.addHandlerServing(servingController);
  SearchView.addHandlerSearch(loadSearchRecipe);
  PaginationView.addHandlerPagi(pagiController);
};
init();
