// https://forkify-api.herokuapp.com/v2
///////////////////////////////////////

import * as model from './model.js';
import SearchView from './searchView.js';
import ResultView from './resultView.js';
import RecipeView from './recipeView.js';
import PaginationView from './paginationView.js';
import BookmarkView from './bookmarkView.js';
import addRecipeView from './addRecipeView.js';
import { MODAL_TIMEOUT } from './config.js';
import bookmarkView from './bookmarkView.js';

/////////////////////////
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
    BookmarkView.render(model.state.bookmarked);

    //////Render result
    RecipeView.render(recipe);
    BookmarkView.update(model.state.bookmarked);
  } catch (err) {
    RecipeView.renderError();
  }
};

///////////////
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

const bookmarkController = function (recipe) {
  if (model.state.recipe.bookmark) {
    model.deleteBookmark(recipe);
    RecipeView.update(model.state.recipe);
    if (model.state.bookmarked.length === 0) {
      BookmarkView.renderEmptyBookmark();
    }
    BookmarkView.render(model.state.bookmarked);
    return;
  }
  //add bookmark
  model.addBookmark(recipe);
  //update recipeview
  RecipeView.update(model.state.recipe);
  BookmarkView.render(model.state.bookmarked);
};

const formRender = function () {
  setTimeout(() => {
    addRecipeView.renderFormhtml();
  }, MODAL_TIMEOUT + 2 * 1000);
};
const controllUpload = async function (data) {
  try {
    await model.recipeUpload(data);
    addRecipeView.renderSuccess();

    setTimeout(() => {
      addRecipeView.mangeWindow();
    }, MODAL_TIMEOUT * 1000);
    formRender();
    RecipeView.render(model.state.recipe);
    bookmarkView.render(model.state.bookmarked);
    await model.Loadrecipe(`#${model.state.recipe.id}`);

    RecipeView.update(model.state.recipe);

    //update url with history api
    history.pushState(null, null, `#${model.state.recipe.id}`);
  } catch (error) {
    addRecipeView.renderError(error);
    setTimeout(() => {
      addRecipeView.renderFormhtml();
    }, MODAL_TIMEOUT + 2000);
  }
};
//subscriber
const init = function () {
  RecipeView.addHandlerRender(showRecipe);
  RecipeView.addHandlerServing(servingController);
  RecipeView.addHandlerBookmark(bookmarkController);
  SearchView.addHandlerSearch(loadSearchRecipe);
  PaginationView.addHandlerPagi(pagiController);
  addRecipeView.addHandlerUpload(controllUpload);
};
init();
