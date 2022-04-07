// https://forkify-api.herokuapp.com/v2
///////////////////////////////////////

import * as model from './model.js';
import SearchView from './searchView.js';
import ResultView from './resultView.js';
import RecipeView from './recipeView.js';
import PaginationView from './paginationView.js';
import BookmarkView from './bookmarkView.js';

const bookmarkloader = async function (array) {
  try {
    array.forEach(async function (id) {
      await model.loadBookmarks(id);
      BookmarkView.render(model.state.bookmarkrecipes);
    });
  } catch (error) {
    console.log(error);
  }
};
bookmarkloader(model.state.bookmarksid);
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

const bookmarkController = async function (recipeid) {
  try {
    const id = recipeid.slice(1);

    /////remove Bookmark/////
    if (model.state.bookmarksid.includes(id)) {
      ///remove id from bookmark id
      model.state.bookmarksid = model.state.bookmarksid.filter(
        hash => hash !== id
      );
      //remove id from bookmark recipe
      model.state.bookmarkrecipes = model.state.bookmarkrecipes.filter(
        recipe => recipe.id !== id
      );

      ///save in storage
      localStorage.setItem(
        'Bookmarks',
        JSON.stringify(model.state.bookmarksid)
      );
      ///change id's recipe bookmark to false
      model.removeBookmark(id);

      ////update bookmark btn view
      RecipeView.update(model.state.recipe);

      if (model.state.bookmarksid.length === 0) {
        BookmarkView.renderEmptyBookmark();
        return;
      }

      ///reload bookmarked recipe
      bookmarkloader(model.state.bookmarksid);
      return;
    }
    ///Store bookmark////

    if (!model.state.bookmarksid.includes(id)) {
      model.storeBookmark(id);

      await model.loadBookmarks(id);

      RecipeView.update(model.state.recipe);

      BookmarkView.render(model.state.bookmarkrecipes);
    }
  } catch (error) {
    console.log(error);
  }
};

//subscriber
const init = function () {
  RecipeView.addHandlerRender(showRecipe);
  RecipeView.addHandlerServing(servingController);
  RecipeView.addHandlerBookmark(bookmarkController);
  SearchView.addHandlerSearch(loadSearchRecipe);
  PaginationView.addHandlerPagi(pagiController);
};
init();
// localStorage.clear();
// console.log(model.state.bookmarksid);
