export default class View {
  _pagination = document.querySelector('.pagination');
  _errorMessage = "Sorry we couldn't find this one.Please try another one";
  _successMessage = 'Click the recipe you want to view';
  _data;
  _previousBtn;
  _nextBtn;

  render(data) {
    if (!data) return this.renderError;
    this._data = data;
    const html = this._generateHtml(this._data);
    this._cleaner(this._parentElement);
    this._parentElement.insertAdjacentHTML('beforeend', html);
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

  renderPreNextPagi(Pagenum) {
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
        console.log(start, next);
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
        console.log(start, next);
      }

      this._pagination.innerHTML = '';

      this._pagination.insertAdjacentHTML('beforeend', html);
      this._previousBtn = document.querySelector('.pagination__btn--prev');
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
  renderError(message = this._errorMessage) {
    const html = `
    <div class="error">
            <div>
              <svg>
                <use href="src/img/icons.svg#icon-alert-triangle"></use>
              </svg>
            </div>
        <p>${message} !</p>
    </div> 
    `;
    this._cleaner();
    this._parentElement.insertAdjacentHTML('afterbegin', html);
  }

  renderSuccess(message = this._successMessage) {
    const html = `
    <div class="error">
    <div>
      <svg>
        <use href="src/img/icons.svg#icon-smile"></use>
      </svg>
    </div>
    <p>${message}😍</p>
    </div> 
    `;
    this._cleaner();
    this._parentElement.insertAdjacentHTML('afterbegin', html);
  }

  spinner() {
    const html = `<div class="spinner">
    <svg>
      <use href="src/img/icons.svg#icon-loader"></use>
    </svg>
  </div>`;
    this._parentElement.insertAdjacentHTML('afterbegin', html);
  }

  _cleaner() {
    this._parentElement.innerHTML = '';
  }
}
