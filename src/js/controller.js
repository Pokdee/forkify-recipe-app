// https://forkify-api.herokuapp.com/v2
// #5ed6604591c37cdc054bcd09
///////////////////////////////////////
import { API_NIDS } from './config.js';
import * as model from './model.js';
import viewControll from './view.js';
import Searchview from './searchView.js';
import view from './view.js';
let recipesArray;
const showRecipe = async function () {
  try {
    const id = window.location.hash;
    if (!id) return;
    viewControll.spinner();

    await model.Loadrecipe(id);
    console.log(model.state.recipe);
    const { recipe } = model.state;
    viewControll.render(recipe);
  } catch (err) {
    console.log(err);
    viewControll.renderError();
  }
};
///////////////
const loadRecipe = async function () {
  try {
    viewControll.cleanAll();
    viewControll.spinner();
    const query = Searchview.getQuery();
    if (!query) {
      viewControll.renderError();
      return;
    }
    await model.loadSearchResult(query);
    recipesArray = model.state.recipesArray;
    viewControll.renderSuccess();
    recipesArray.forEach(recipe => viewControll.renderPreview(recipe));
  } catch (error) {
    console.log(error.message);
    viewControll.renderError();
  }
};
//////////////////

//subscriber

const init = function () {
  viewControll.addHandlerRender(showRecipe);
  Searchview.addHandlerSearch(loadRecipe);
};
init();
