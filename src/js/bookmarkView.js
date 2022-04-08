import PreviewView from './previewView.js';
import View from './view.js';
class BookmarkView extends View {
  _parentElement = document.querySelector('.bookmarks__list');
  _data = '';
  _emptyBookMsg = 'No bookmarks yet. Find a nice recipe and bookmark it :)';

  _generateHtml(data) {
    return this._data.map(recipe => PreviewView.render(recipe, false)).join('');
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
}

export default new BookmarkView();
