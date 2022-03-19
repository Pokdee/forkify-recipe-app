const timeout = function (s) {
  return new Promise(function (_, reject) {
    setTimeout(function () {
      reject(new Error(`Request took too long! Timeout after ${s} second`));
    }, s * 1000);
  });
};

// https://forkify-api.herokuapp.com/v2
// #5ed6604591c37cdc054bcd09
///////////////////////////////////////
import * as model from './model.js';
import viewControll from './view.js';
import { fraction } from './../../node_modules/fractional';
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
    alert(err);
  }
};
['load', 'hashchange'].forEach(ev => window.addEventListener(ev, showRecipe));
