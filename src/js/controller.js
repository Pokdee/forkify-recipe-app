// https://forkify-api.herokuapp.com/v2
// #5ed6604591c37cdc054bcd09
///////////////////////////////////////
import * as model from './model.js';
import viewControll from './view.js';
const showRecipe = async function () {
  try {
    const id = window.location.hash;
    if (!id) return;
    viewControll.spinner();
    await model.Loadrecipe(id);
    const { recipe } = model.state;
    viewControll.render(recipe);
    // console.log(recipe);
  } catch (err) {
    viewControll.renderError(err.message);
  }
};
//subscriber
const init = function () {
  viewControll.addHandlerRender(showRecipe);
};
init();
