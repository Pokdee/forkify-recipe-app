import View from './view.js';

class BookmarkView extends View {
  _parentElement = document.querySelector('.bookmarks__list');
  _data = '';

  addHandlerBookmark(handler) {
    ['hashchange', 'load'].forEach(ev => window.addEventListener(ev, handler));
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
