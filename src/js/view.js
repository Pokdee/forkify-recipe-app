class ViewControll {
  #previewContainer = document.querySelector('.results');
  #recipeContainer = document.querySelector('.recipe');
  #data = {};

  render(obj) {
    this.#data = obj;
    this.#renderRecipe(this.#data);
    this.#renderPreview(this.#data);
  }

  spinner() {
    const html = `<div class="spinner">
    <svg>
      <use href="src/img/icons.svg#icon-loader"></use>
    </svg>
  </div>`;
    this.#recipeContainer.insertAdjacentHTML('afterbegin', html);
  }

  #cleaner(loca) {
    loca.innerHTML = '';
  }

  #renderPreview(obj) {
    const html = `
        
        <li class="preview">
        <a class="preview__link preview__link--active" href="#23456">
          <figure class="preview__fig">
            <img src="${obj.Image}" alt="${obj.title}" />
          </figure>
          <div class="preview__data">
            <h4 class="preview__title">${obj.title}...</h4>
            <p class="preview__publisher">${obj.publisher}</p>
            <div class="preview__user-generated">
              <svg>
                <use href="src/img/icons.svg#icon-user"></use>
              </svg>
            </div>
          </div>
        </a>
      </li>
        `;
    this.#cleaner(this.#previewContainer);
    this.#previewContainer.insertAdjacentHTML('afterend', html);
  }
  #renderRecipe(obj) {
    const html = `
        
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
              <button class="btn--tiny btn--increase-servings">
                <svg>
                  <use href="src/img/icons.svg#icon-minus-circle"></use>
                </svg>
              </button>
              <button class="btn--tiny btn--increase-servings">
                <svg>
                  <use href="src/img/icons.svg#icon-plus-circle"></use>
                </svg>
              </button>
            </div>
          </div>
      
          <div class="recipe__user-generated">
            <svg>
              <use href="src/img/icons.svg#icon-user"></use>
            </svg>
          </div>
          <button class="btn--round">
            <svg class="">
              <use href="src/img/icons.svg#icon-bookmark-fill"></use>
            </svg>
          </button>
        </div>
      
        <div class="recipe__ingredients">
          <h2 class="heading--2">Recipe ingredients</h2>
          <ul class="recipe__ingredient-list">
      
          ${obj.ingredients
            .map(int => {
              return `
            <li class="recipe__ingredient">
            <svg class="recipe__icon">
              <use href="src/img/icons.svg#icon-check"></use>
            </svg>
            <div class="recipe__quantity">${int.quantity}</div>
            <div class="recipe__description">
              <span class="recipe__unit">${int.unit}</span>
              ${int.description}
            </div>
            </li>
            `;
            })
            .join('')}   
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
    this.#cleaner(this.#recipeContainer);
    this.#recipeContainer.insertAdjacentHTML('afterbegin', html);
  }
}

export default new ViewControll();
