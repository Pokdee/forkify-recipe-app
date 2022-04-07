import View from './view.js';

class BookmarkView extends View {
  _parentElement = document.querySelector('.bookmarks__list');
  _data = '';
  _emptyBookMsg = 'No bookmarks yet. Find a nice recipe and bookmark it :)';

  addHandlerBookmark(handler) {
    ['hashchange', 'load'].forEach(ev => window.addEventListener(ev, handler));
  }
  renderEmptyBookmark(message = this._emptyBookMsg) {
    const html = `
    <div class="message">
    <div>
      <svg>
        <use href="src/img/icons.svg#icon-smile"></use>
      </svg>
    </div>
    <p>
      ${message}
    </p>
  </div>
    `;
    this._cleaner();
    this._parentElement.insertAdjacentHTML('beforeend', html);
  }

  _generateHtml() {
    return this._data
      .map(obj => {
        return `
            <li class="preview">
            <a class="preview__link" href="#${obj.id}">
              <figure class="preview__fig">
                <img src="${obj.Image}" alt="Test" />
              </figure>
              <div class="preview__data">
                <h4 class="preview__name">
                ${obj.title}
                </h4>
                <p class="preview__publisher">${obj.publisher}</p>
              </div>
            </a>
          </li>`;
      })
      .join('');
  }
}

export default new BookmarkView();
