import View from './view.js';

class PaginationView extends View {
  _parentElement = document.querySelector('.pagination');

  addHandlerPagi(handler) {
    this._parentElement.addEventListener('click', e => {
      if (e.target.closest('.btn--inline')) {
        const btn = e.target.closest('.btn--inline');
        if (!btn) return;
        const gotopage = +btn.dataset.goto;

        handler(gotopage);
      }
    });
  }

  _generateHtml() {
    const pageNum = Math.ceil(this._data.results.length / 10);
    const curPage = this._data.page;
    //ON page 1 and there is more page
    if (curPage === 1 && pageNum > curPage) {
      return `
        <button data-goto = "${
          curPage + 1
        }" class="btn--inline pagination__btn--next">
         <span>Page ${curPage + 1}</span>
         <svg class="search__icon">
          <use href="src/img/icons.svg#icon-arrow-right"></use>
         </svg>
        </button>
        <div class="pagination__pages">${curPage} of ${pageNum}</div>
        `;
    }
    //ON last page
    if (curPage === pageNum) {
      return `
      <div class="pagination__pages">${curPage} of ${pageNum}</div>

        <button data-goto = "${
          curPage - 1
        }" class="btn--inline pagination__btn--prev">
        <svg class="search__icon">
          <use href="src/img/icons.svg#icon-arrow-left"></use>
        </svg>
        <span>Page ${curPage - 1}</span>
        </button>
        `;
    }
    // ON middle page and there prev and next page
    if (curPage > 1 && curPage < pageNum) {
      return `
        <button data-goto = "${
          curPage - 1
        }" class="btn--inline pagination__btn--prev">
            <svg class="search__icon">
              <use href="src/img/icons.svg#icon-arrow-left"></use>
            </svg>
            <span>Page ${curPage - 1}</span>
        </button>
        <div class="pagination__pages">${curPage} of ${pageNum}</div>

        <button data-goto = "${
          curPage + 1
        }" class="btn--inline pagination__btn--next">
            <span>Page ${curPage + 1}</span>
            <svg class="search__icon">
              <use href="src/img/icons.svg#icon-arrow-right"></use>
            </svg>
        </button>
        `;
    }
    //ON page 1 and there is no more page
    return '';
  }
}

export default new PaginationView();
