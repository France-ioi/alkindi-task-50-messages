
import React from 'react';
import {connect} from 'react-redux';
import update from 'immutability-helper';
import {Button} from 'react-bootstrap';

import {selectTaskData, patternToRegex, regexSearch, getStartEndIndex, calulateHighlightIndexes} from './utils';
import {takeEvery} from 'redux-saga';
import {select, put} from 'redux-saga/effects';

const defaultState = {
  search: {
    isActive: false,
    pattern: '',
    results: [],
    numResults: 0,
    highlightFocus: 0
  }
};

// highlight color class for * matched char in pattern match
const starColor = 'group-color-star';
// highlight color class for ? matched char in pattern match
const dotColor = "group-color-dot";
// highlight colors class for a,b,c,d in patterns
const charColors = [
  'group-color-0',
  'group-color-1',
  'group-color-2',
  'group-color-3',
  'group-color-4',
];

function appInitReducer (state, _action) {
  return {...state, ...defaultState};
}

function taskInitReducer (state, _action) {
  return {...state, ...defaultState};
}

function taskRefreshReducer (state) {
  return {...state, search: {...defaultState.search, pattern: state.search.pattern}};
}

function searchIsActiveChangedReducer (state, {payload: {isActive}}) {
  return update(state, {search: {isActive: {$set: isActive}}});
}
function searchPatternChangedReducer (state, {payload: {pattern}}) {
  return update(state, {search: {pattern: {$set: pattern}}});
}

function searchHighlightFocusChangedReducer (state, {payload: {highlightFocus}}) {
  return update(state, {search: {highlightFocus: {$set: highlightFocus}}});
}

function searchResultsChangedReducer (state, {payload: {results, numResults}}) {
  return update(state, {search: {results: {$set: results}, numResults: {$set: numResults}}});
}

function searchLateReducer (state) {
  if (state.cipheredText === undefined || state.cipheredText.visible === undefined) return state;
  if (state.search === undefined || state.search.results === undefined) return state;
  const {cipheredText, search: {pattern, isActive, highlightFocus, results}} = state;
  const {visible: {rows}, scrollTop} = cipheredText;
  if (rows === undefined || results.length === 0 || rows.length === 0 || typeof scrollTop !== 'number') return state;
  let focusStart, focusEnd, colors, match = results[highlightFocus];
  if (match) {
    [focusStart, focusEnd, colors] = calulateHighlightIndexes(pattern, match, charColors, starColor, dotColor);
  }
  const [rowStartPos] = getStartEndIndex(cipheredText);
  let i = rowStartPos;
  const newRows = [];
  rows.forEach((row) => {
    const newCol = [];
    row.columns.forEach((col) => {
      let borderClass = null;
      let colorClass = null;
      if (isActive && match) {
        colorClass = colors[i];
        if (i >= focusStart && i <= focusEnd) {
          // color = lightenDarkenColor(color, 10);
          // color = "#a0ff8e";
          if (i === focusStart) {
            borderClass = "highlight highlight-start";
          } else if (i === focusEnd) {
            borderClass = "highlight highlight-end";
          } else {
            borderClass = "highlight highlight-mid";
          }
        }
      }
      newCol.push(update(col, {colorClass: {$set: colorClass || ''}, borderClass: {$set: borderClass || ''}}));
      i++;
    });
    newRows.push(update(row, {columns: {$set: newCol}}));
  });
  return update(state, {cipheredText: {visible: {rows: {$set: newRows}}}});
}

function* scrollIfNeededSaga () {
  const {actions, search: searchInfo, cipheredText} = yield select(({actions, search: searchInfo, cipheredText}) => ({actions, search: searchInfo, cipheredText}));
  const {isActive, results, highlightFocus} = searchInfo;
  const {visible: {rows}, cellHeight, pageColumns, pageRows, nbCells} = cipheredText;
  if (!isActive || results.length === 0 || !results[highlightFocus]) {
    yield put({type: actions.cipheredTextScrolled, payload: {scrollTop: 0}});
    return;
  }
  let {scrollTop} = cipheredText;
  const startPos = results[highlightFocus].index;
  const nextRow = Math.floor(startPos / pageColumns);
  const currnetPageLastRow = rows[pageRows - 1].index;
  const currnetPageFirstRow = rows[0].index;
  if (nextRow >= currnetPageLastRow) {
    scrollTop = (nextRow - 1) * cellHeight;
    const bottom = Math.ceil(nbCells / pageColumns) * cellHeight - 1;
    const maxTop = Math.max(0, bottom + 1 - pageRows * cellHeight);
    scrollTop = Math.min(maxTop, scrollTop);
  } else if (nextRow <= currnetPageFirstRow) {
    scrollTop = (nextRow - 1) * (cellHeight);
    if (scrollTop < 0) {scrollTop = 0;}
  }
  yield put({type: actions.cipheredTextScrolled, payload: {scrollTop}});

}

function SearchToolViewSelector (state) {
  const {actions, search: searchInfo, cipheredText} = state;
  const {cipherText} = selectTaskData(state);
  const {searchIsActiveChanged, searchPatternChanged, searchHighlightFocusChanged, searchResultsChanged, cipheredTextScrolled} = actions;
  const {scrollTop, cellHeight, nbCells, pageRows, pageColumns, visible} = cipheredText;
  return {
    searchIsActiveChanged, searchPatternChanged, searchHighlightFocusChanged, searchResultsChanged, cipheredTextScrolled,
    searchInfo, cipherText,
    scrollTop, cellHeight, nbCells, pageRows, pageColumns, visible
  };
}

class SearchToolView extends React.PureComponent {

  searchPatternChange = (e) => {
    const pattern = e.target.value.replace(/[^abcd?*]|\*(?=\*)/, '');
    if (pattern.length > 50) {
      return;
    }
    const {searchInfo: {isActive}} = this.props;
    if (isActive) {
      this.props.dispatch({type: this.props.searchIsActiveChanged, payload: {isActive: false}});
      this.props.dispatch({type: this.props.searchHighlightFocusChanged, payload: {highlightFocus: 0}});
      this.props.dispatch({type: this.props.searchResultsChanged, payload: {results: [], numResults: 0}});
    }
    this.props.dispatch({type: this.props.searchPatternChanged, payload: {pattern}});
  }

  searchForPatterns = () => {
    const {cipherText, searchInfo: {pattern}} = this.props;
    let regexResults = [];
    this.props.dispatch({type: this.props.searchIsActiveChanged, payload: {isActive: true}});
    const regex = patternToRegex(pattern);
    regexResults = regexSearch(regex, cipherText);
    this.props.dispatch({type: this.props.searchResultsChanged, payload: {results: regexResults || [], numResults: regexResults.length}});
  }

  findNext = () => {
    const {searchInfo: {isActive, results, highlightFocus}} = this.props;
    if (isActive) {
      if (results.length > 0 && highlightFocus + 1 < results.length) {
        this.props.dispatch({type: this.props.searchHighlightFocusChanged, payload: {highlightFocus: highlightFocus + 1}});
      }
    } else {
      this.searchForPatterns();
      this.props.dispatch({type: this.props.searchHighlightFocusChanged, payload: {highlightFocus: 0}});
    }
  }

  findPrevious = () => {
    const {searchInfo: {isActive, results, highlightFocus}} = this.props;
    if (isActive) {
      if (results.length > 0 && highlightFocus > 0) {
        this.props.dispatch({type: this.props.searchHighlightFocusChanged, payload: {highlightFocus: highlightFocus - 1}});
      }
    }
  }

  render () {
    const {searchInfo: {pattern, highlightFocus, isActive, numResults}} = this.props;
    return (
      <div className="search">
        <div className="search-box">
          <label className="title">Pattern: </label>
          <input type="text" className="pattern" value={pattern} onChange={this.searchPatternChange} />
        </div>
        <div className="note">
          <div style={{width: "50%"}}>
            a,b,c and d each represent a symbol, always the same.<br />
            each ? may represent any symbol <br />
            each * may represent any sequence of symbols
          </div>
          <div style={{width: "30%"}}>
            {isActive && (<label style={{float: "right"}}  className="occurrences">{numResults} occurence found</label>)}
            {(isActive && numResults > 0) && (<p style={{float: "right", clear: 'both'}} >current match: {highlightFocus + 1}</p>)}
          </div>
          <div style={{width: "17%"}}>
            <Button onClick={this.findNext.bind(this)}>Next</Button>
            <Button onClick={this.findPrevious.bind(this)}>Previous</Button>
          </div>
        </div>
      </div>
    );
  }
}

export default {
  actions: {
    searchIsActiveChanged: 'Search.IsActive.Changed',
    searchPatternChanged: 'Search.Pattern.Changed',
    searchHighlightFocusChanged: 'Search.HighlightFocus.Changed',
    searchResultsChanged: 'Search.Results.Changed',
  },
  actionReducers: {
    appInit: appInitReducer,
    taskInit: taskInitReducer,
    taskRefresh: taskRefreshReducer,
    searchIsActiveChanged: searchIsActiveChangedReducer,
    searchPatternChanged: searchPatternChangedReducer,
    searchHighlightFocusChanged: searchHighlightFocusChangedReducer,
    searchResultsChanged: searchResultsChangedReducer,
  },
  lateReducer: searchLateReducer,
  saga: function* () {
    const actions = yield select((state) => state.actions);
    yield takeEvery(actions.searchHighlightFocusChanged, scrollIfNeededSaga);
  },
  views: {
    Search: connect(SearchToolViewSelector)(SearchToolView),
  }
};
