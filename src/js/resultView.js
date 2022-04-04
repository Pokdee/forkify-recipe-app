import View from './view.js';

class ResultView extends View {
  _parentElement = document.querySelector('.results');
  _previousBtn;
  _nextBtn;

  _generateHtml() {
    const id = window.location.hash.slice(1);
    return this._data
      .map(recipe => {
        return `
              <li class="preview">
              <a class="preview__link ${
                recipe.id === id ? 'preview__link--active' : ''
              }" href="#${recipe.id}">
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
  update(data) {
    if (!data || data.length === 0) return this.renderError;
    this._data = data;
    const html = this._generateHtml();
    const newDom = document.createRange().createContextualFragment(html);
    const newEl = newDom.querySelectorAll('*');
    const oldEl = this._parentElement.querySelectorAll('*');

    newEl.forEach((n, i) => {
      const curNode = oldEl[i];
      if (
        !n.isEqualNode(curNode) &&
        oldEl[i].classList.contains('preview__link')
      ) {
        oldEl[i].classList = newEl[i].classList;
      }
    });
  }
}

export default new ResultView();
