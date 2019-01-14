
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

class CipherTextView extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      searchString: '',
      totalString: '',
      shouldHighLightIndexArray: [],
    }
  }

  componentWillReceiveProps = (newProps) => {
    if(newProps.searchString != this.props.searchString) {
      this.setState({ searchString: newProps.searchString } , () => {
        // Get shouldHighlight element Array
        let totalString = this.state.totalString;
        let searchString = this.state.searchString.toUpperCase();
        let searchString_length = searchString.length;

        let shouldHighLightIndexArray = [];
        if(totalString.indexOf(searchString) > -1) {
          for(let k = 0 ; k < searchString_length; k++) {
            shouldHighLightIndexArray.push(totalString.indexOf(searchString) + k)
          }

          this.setState({shouldHighLightIndexArray: shouldHighLightIndexArray})
        }
      })
    }

    if(newProps.visibleRows != this.props.visibleRows) {
      let total =[];
      newProps.visibleRows.forEach((row) => {
        row.columns.forEach((item) => {
          total.push(item.cell)
        })
      });
      this.setState({ totalString : total.join('')})
    }
  }

  checkHighlighted = (column, index) => {
    
    // Get Column Number and Row number;
    let visibleRows = this.props.visibleRows;
    let columnIndex = 0;
    for(let i = 0; i < visibleRows.length; i++) {
      if(JSON.stringify(visibleRows[i].columns) == JSON.stringify(column)) {
        columnIndex = i;
        break;
      }
    }

    let currentItemIndex = columnIndex * 49 + index;
    if(this.state.shouldHighLightIndexArray.indexOf(currentItemIndex) > -1) {
      return true;
    } else {
      return false;
    }
  }

  render () {
    const {width, height, visibleRows, cellWidth, cellHeight, bottom} = this.props;
    return (
      <div>
        <div ref={this.refTextBox} onScroll={this.onScroll} style={{position: 'relative', width: width && `${width}px`, height: height && `${height}px`, overflowY: 'scroll'}}>
          {(visibleRows||[]).map(({index, columns}) =>
            <div key={index} style={{position: 'absolute', top: `${index * cellHeight}px`}}>
              {columns.map(({index, cell}) =>
                <span key={index} style={{position: 'absolute', left: `${index * cellWidth}px`, width: `${cellWidth}px`, height: `${cellHeight}px`, backgroundColor: `${this.checkHighlighted(columns, index) ? '#aaffaa' : ''}`}}>
                  {cell || ' '}
                </span>)}
            </div>)}
          <div style={{position: 'absolute', top: `${bottom}px`, width: '1px', height: '1px'}}/>
        </div>
      </div>
    );
  }

  refTextBox = (element) => {
    this._textBox = element;
    const width = element.clientWidth;
    const height = element.clientHeight;
    this.props.dispatch({type: this.props.cipheredTextResized, payload: {width, height}});
  };

  onScroll = () => {
    const scrollTop = this._textBox.scrollTop;
    this.props.dispatch({type: this.props.cipheredTextScrolled, payload: {scrollTop}});
  };

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
    CipheredText: connect(CipherTextViewSelector)(CipherTextView),
  }
};
