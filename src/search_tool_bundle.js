
import React from 'react';
import {connect} from 'react-redux';

import {updateGridGeometry, updateGridVisibleRows} from './utils';

function appInitReducer (state, _action) {
  return {...state, cipheredText: {
    cellWidth: 15,
    cellHeight: 18,
    scrollTop: 0,
    nbCells: 0
  }};
}

function taskInitReducer (state, _action) {
  let {cipheredText, taskData: {cipherText}} = state;
  cipheredText = {...cipheredText, cells: cipherText, nbCells: cipherText.length};
  cipheredText = updateGridVisibleRows(cipheredText);
  return {...state, cipheredText};
}

function cipheredTextResizedReducer (state, {payload: {width}}) {
  let {cipheredText} = state;
  cipheredText = {...cipheredText, width, height: 8 * cipheredText.cellHeight};
  cipheredText = updateGridGeometry(cipheredText);
  cipheredText = updateGridVisibleRows(cipheredText);
  return {...state, cipheredText};
}

function cipheredTextScrolledReducer (state, {payload: {scrollTop}}) {
  let {cipheredText} = state;
  cipheredText = {...cipheredText, scrollTop};
  cipheredText = updateGridVisibleRows(cipheredText);
  return {...state, cipheredText};
}

function CipherTextViewSelector (state) {
  const {actions, cipheredText} = state;
  const {cipheredTextResized, cipheredTextScrolled} = actions;
  const {width, height, cellWidth, cellHeight, bottom, pageRows, pageColumns, visible} = cipheredText;
  return {
    cipheredTextResized, cipheredTextScrolled,
    width, height, visibleRows: visible.rows, cellWidth, cellHeight, bottom, pageRows, pageColumns
  };
}

class SearchToolView extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      searchString : '',
      totalString: '',

    }
  }

  componentWillReceiveProps = (newProps) => {

    if(newProps.visibleRows != this.props.visibleRows) {
      let total =[];
      newProps.visibleRows.forEach((row) => {
        row.columns.forEach((item) => {
          total.push(item.cell)
        })
      });
      this.setState({ totalString : total.join('')}, () => {
        this.getHighlightsArray();
      })
    }
  }

  searchStringChange = (e) => {
    this.setState({ searchString : e.target.value })
  }

  getHighlightsArray() {
    // Get shouldHighlight element Array
    let totalString = this.state.totalString;
    let searchString = this.state.searchString.toUpperCase();
    let searchString_length = searchString.length;
    let shouldHighLightIndexArray = [];

    if(totalString && searchString) {
      let firstPosition = totalString.indexOf(searchString);
      if(firstPosition > -1) {
        for(let k = 0 ; k < searchString_length; k++) {
          shouldHighLightIndexArray.push(firstPosition + k)
        }
      }
    }

    this.props.getHighlightArray(shouldHighLightIndexArray);
  }

  findString = () => {
    this.getHighlightsArray();
  }

  render () {
    const {width, height, visibleRows, cellWidth, cellHeight, bottom} = this.props;
    return (
      <div className="searchToolWrapper">
        <div className="pattern">
          <label className="caption">Pattern: </label>
          <input type="text" className="searchString" value={this.state.searchString} onChange={this.searchStringChange.bind(this)}/>
          <label className="foundedCounts">1 occurence found</label>
        </div>

        <div className="notification">
          <div style={{width: "80%"}}>
            a,b,c and d each represent a symbol, always the same.<br/>
            each ? may represent any symbol <br/>
            each * may represent any sequence of symbols
          </div>
          <div style={{width: "17%"}}>
            <button className="btn btn-default" onClick={this.findString.bind(this)}>Next</button>
            <button className="btn btn-default">Previous</button>
          </div>
        </div>
      </div>
    );
  }

}

export default {
  actions: {
    cipheredTextResized: 'CipheredText.Resized' /* {width: number, height: number} */,
    cipheredTextScrolled: 'CipheredText.Scrolled' /* {scrollTop: number} */,
  },
  actionReducers: {
    appInit: appInitReducer,
    taskInit: taskInitReducer,
    cipheredTextResized: cipheredTextResizedReducer,
    cipheredTextScrolled: cipheredTextScrolledReducer,
  },
  views: {
    SearchTool: connect(CipherTextViewSelector)(SearchToolView),
  }
};
