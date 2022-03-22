class SearchView {
  _searchBtn = document.querySelector('.search__btn');
  searchInput = document.querySelector('.search__field');
  getQuery(handler) {
    return this.searchInput.value;
    this._cleanInput();
  }
  addHandlerSearch(handler) {
    this._searchBtn.addEventListener('click', e => {
      e.preventDefault();
      handler();
    });
  }
  _cleanInput() {
    this.searchInput.value = '';
  }
}

export default new SearchView();
