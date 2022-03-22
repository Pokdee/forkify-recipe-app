import View from './view.js';

class ResultView extends View {
  _parentElement = document.querySelector('.results');

  _generateHtml(results) {
    return results
      .map(recipe => {
        return `
              <li class="preview">
              <a class="preview__link preview__link--active" href="_${recipe.id}">
                <figure class="preview__fig">
                  <img src="${recipe.Image}" alt="${recipe.title}" />
                </figure>
                <div class="preview__data">
                  <h4 class="preview__title">${recipe.title}...</h4>
                  <p class="preview__publisher">${recipe.publisher}</p>
                  <div class="preview__user-generated">
                    <svg>
                      <use href="src/img/icons.svg#icon-user"></use>
                    </svg>
                  </div>
                </div>
              </a>
            </li>
              `;
      })
      .join('');
  }
}

export default new ResultView();
