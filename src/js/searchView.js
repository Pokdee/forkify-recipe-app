class Searchview {
  #searchBtn = document.querySelector('.search__btn');
  searchInput = document.querySelector('.search__field');
  getQuery(handler) {
    return this.searchInput.value;
  }
  addHandlerSearch(handler) {
    this.#searchBtn.addEventListener('click', e => {
      e.preventDefault();
      handler();
    });
  }
}

export default new Searchview();
