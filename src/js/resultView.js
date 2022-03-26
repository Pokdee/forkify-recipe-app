import View from './view.js';

class ResultView extends View {
  _parentElement = document.querySelector('.results');
  _previousBtn;
  _nextBtn;

  addHandlerPagi(handlerprev, handlernext) {
    this._pagination.addEventListener('click', e => {
      if (e.target.closest('.pagination__btn--prev')) {
        handlerprev();
      }
      if (e.target.closest('.pagination__btn--next')) {
        handlernext();
      }
    });
  }

  renderPagination(num) {
    const html =
      num > 1
        ? `
    <button class="btn--inline pagination__btn--next">
            <span>Page 2</span>
            <svg class="search__icon">
              <use href="src/img/icons.svg#icon-arrow-right"></use>
            </svg>
    </button>
    `
        : '';
    this._pagination.insertAdjacentHTML('beforeend', html);
    this._nextBtn = document.querySelector('.pagination__btn--next');
  }
  renderNextPagi(start, next, Pagenum) {
    if (next === Pagenum + 1) {
      return `
      <button class="btn--inline pagination__btn--prev">
      <svg class="search__icon">
        <use href="src/img/icons.svg#icon-arrow-left"></use>
      </svg>
      <span>Page ${start}</span>
  </button>
      `;
      start--;
    } else {
      return this._generateBtn(start, next);
    }
  }

  renderPreNextPagi(handlerprev, handlernext, Pagenum) {
    if (!this._nextBtn) return;

    let start = 0;
    let next = 2;
    let html = '';
    this._pagination.addEventListener('click', e => {
      if (e.target.closest('.pagination__btn--next')) {
        if (next === Pagenum + 1) {
          start++;
          html = this.renderNextPagi(start, next, Pagenum);
        } else {
          start++;
          next++;
          html = this.renderNextPagi(start, next, Pagenum);
        }
      }
      if (e.target.closest('.pagination__btn--prev')) {
        if (start === 0) {
          start = 1;
          next = 3;
          html = this.renderPrevPagi(start, next);
        } else {
          start--;
          next--;
          html = this.renderPrevPagi(start, next);
        }
      }

      this._pagination.innerHTML = '';

      this._pagination.insertAdjacentHTML('beforeend', html);
    });
  }

  renderPrevPagi(start, next) {
    if (start === 0) {
      return `
      <button class="btn--inline pagination__btn--next">
              <span>Page 2</span>
              <svg class="search__icon">
                <use href="src/img/icons.svg#icon-arrow-right"></use>
              </svg>
      </button>
      `;
    } else {
      return this._generateBtn(start, next);
    }
  }

  _generateBtn(first, second) {
    return `
    <button class="btn--inline pagination__btn--prev">
    <svg class="search__icon">
      <use href="src/img/icons.svg#icon-arrow-left"></use>
    </svg>
    <span>Page ${first}</span>
</button>
<button class="btn--inline pagination__btn--next">
    <span>Page ${second}</span>
    <svg class="search__icon">
      <use href="src/img/icons.svg#icon-arrow-right"></use>
    </svg>
</button>
    `;
  }

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
