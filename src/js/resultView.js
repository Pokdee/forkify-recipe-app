import PreviewView from './previewView.js';
import View from './view.js';

class ResultView extends View {
  _parentElement = document.querySelector('.results');
  _data = '';

  _generateHtml() {
    return this._data.map(recipe => PreviewView.render(recipe, false)).join('');
  }
}

export default new ResultView();
