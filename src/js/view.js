export default class View {
  _errorMessage = "Sorry we couldn't find this one.Please try another one";
  _successMessage = 'Click the recipe you want to view';
  _data;

  render(data) {
    if (!data || data.length === 0) return this.renderError;
    this._data = data;
    const html = this._generateHtml();
    this._cleaner();
    this._parentElement.insertAdjacentHTML('beforeend', html);
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
        curNode.firstChild?.nodeValue.trim() !== ''
      ) {
        oldEl[i].textContent = newEl[i].textContent;
      }
    });
  }
  _cleaner() {
    this._parentElement.innerHTML = '';
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
    this._cleaner();

    this._parentElement.insertAdjacentHTML('afterbegin', html);
  }
}
