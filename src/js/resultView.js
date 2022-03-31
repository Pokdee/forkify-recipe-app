import View from './view.js';

class ResultView extends View {
  _parentElement = document.querySelector('.results');
  _previousBtn;
  _nextBtn;

  _generateHtml() {
    return this._data
      .map(recipe => {
        return `
              <li class="preview">
              <a class="preview__link preview__link--active" href="#${recipe.id}">
                <figure class="preview__fig">
                  <img src="${recipe.Image}" alt="${recipe.title}" />
                </figure>
                <div class="preview__data">
                  <h4 class="preview__title">${recipe.title}...</h4>
                  <p class="preview__publisher">${recipe.publisher}</p>
                  <!--<div class="preview__user-generated">
                    <svg>
                      <use href="src/img/icons.svg#icon-user"></use>
                    </svg>
                  </div>-->
                </div>
              </a>
            </li>
              `;
      })
      .join('');
  }
}

export default new ResultView();
