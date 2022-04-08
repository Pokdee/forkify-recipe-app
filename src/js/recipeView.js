import View from './view.js';

class RecipeView extends View {
  // _previewContainer = document.querySelector('.results');
  _parentElement = document.querySelector('.recipe');

  _data = {};

  addHandlerServing(handler) {
    this._parentElement.addEventListener('click', e => {
      const btn = e.target.closest('.btn--tiny');
      if (!btn) return;
      const update = +btn.dataset.update;
      handler(update);
    });
  }
  //publisher
  addHandlerRender(handler) {
    ['load', 'hashchange'].forEach(ev => window.addEventListener(ev, handler));
  }

  addHandlerBookmark(handler) {
    this._parentElement.addEventListener('click', e => {
      if (e.target.closest('.btn--bookmark')) {
        const id = window.location.hash.slice(1);
        handler(id);
      }
    });
  }

  _generateHtml(obj = this._data) {
    return `
          <figure class="recipe__fig">
            <img src="${obj.Image}" alt="${obj.title}" class="recipe__img" />
            <h1 class="recipe__title">
              <span>${obj.title}</span>
            </h1>
          </figure>
        
          <div class="recipe__details">
            <div class="recipe__info">
              <svg class="recipe__info-icon">
                <use href="src/img/icons.svg#icon-clock"></use>
              </svg>
              <span class="recipe__info-data recipe__info-data--minutes">${
                obj.cookingTime
              }</span>
              <span class="recipe__info-text">minutes</span>
            </div>
            <div class="recipe__info">
              <svg class="recipe__info-icon">
                <use href="src/img/icons.svg#icon-users"></use>
              </svg>
              <span class="recipe__info-data recipe__info-data--people">${
                obj.serving
              }</span>
              <span class="recipe__info-text">servings</span>
        
              <div class="recipe__info-buttons">
                <button class="btn--tiny btn--decrease-servings" data-update = "-1">
                  <svg>
                    <use href="src/img/icons.svg#icon-minus-circle"></use>
                  </svg>
                </button>
                <button class="btn--tiny btn--increase-servings" data-update = "1">
                  <svg>
                    <use href="src/img/icons.svg#icon-plus-circle"></use>
                  </svg>
                </button>
              </div>
            </div>
        
          <div class="recipe__user-generated">

            </div>
            <button class="btn--round btn--bookmark">
              <svg class="">
                <use href="src/img/icons.svg#icon-bookmark${
                  obj.bookmark ? '-fill' : ''
                }"></use>
              </svg>
            </button>
          </div>
        
          <div class="recipe__ingredients">
            <h2 class="heading--2">Recipe ingredients</h2>
            <ul class="recipe__ingredient-list">
            ${this._renderIngredients(obj)} 
            </ul>
          </div>
        
          <div class="recipe__directions">
            <h2 class="heading--2">How to cook it</h2>
            <p class="recipe__directions-text">
              This recipe was carefully designed and tested by
              <span class="recipe__publisher">${
                obj.publisher
              }</span>. Please check out
              directions at their website.
            </p>
            <a
              class="btn--small recipe__btn"
              href="${obj.srcUrl}"
              target="_blank"
            >
              <span>Directions</span>
              <svg class="search__icon">
                <use href="src/img/icons.svg#icon-arrow-right"></use>
              </svg>
            </a>
          </div>
          
          `;
  }

  _renderIngredients(obj) {
    const html = obj.ingredients
      .map(int => {
        return `
        <li class="recipe__ingredient">
        <svg class="recipe__icon">
          <use href="src/img/icons.svg#icon-check"></use>
        </svg>
        <div class="recipe__quantity">${
          typeof int.quantity !== 'number' || int.quantity === 0
            ? ''
            : int.quantity.toFixed(1)
        }</div>
        <div class="recipe__description">
          <span class="recipe__unit">${int.unit}</span>
          ${int.description}
        </div>
        </li>
        `;
      })
      .join('');

    return html;
  }
}

export default new RecipeView();
