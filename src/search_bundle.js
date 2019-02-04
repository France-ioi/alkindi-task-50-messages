
import React from 'react';
import {connect} from 'react-redux';
import update from 'immutability-helper';
import {Button} from 'react-bootstrap';

import {
  selectTaskData, patternToRegex, regexSearch,
  getStartEndOfVisibleRows, calulateHighlightIndexes, getUpdatedRows
} from './utils';
import {takeEvery} from 'redux-saga';
import {select, put} from 'redux-saga/effects';

const defaultState = {
  search: {
    isActive: false,
    pattern: '',
    results: [],
    replacer: () => '',
    numResults: 0,
    highlightFocus: 0,
    highlightFocusData: []
  }
};

// highlight color class for * matched char in pattern match
const starColor = 'group-color-star';
// highlight color class for ? matched char in pattern match
const dotColor = "group-color-dot";
// highlight color class for A-Z matched char in pattern match
const capsColor = "group-color-caps";
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

function searchResultsChangedReducer (state, {payload: {results, replacer, numResults}}) {
  return update(state, {search: {results: {$set: results}, replacer: {$set: replacer}, numResults: {$set: numResults}}});
}

function searchHighlightFocusDataChangedReducer (state, {payload: {highlightFocusData}}) {
  return update(state, {search: {highlightFocusData: {$set: highlightFocusData}}});
}

function searchLateReducer (state) {
  if (state.cipheredText === undefined || state.cipheredText.visible === undefined) return state;
  if (state.search === undefined || state.search.results === null) return state;
  const {cipheredText, decipheredText, search: {highlightFocusData, isActive, results}} = state;
  const {visible: {rows}} = cipheredText;
  const {visible: {rows: rows2}} = decipheredText;
  if (rows === undefined || rows.length === 0 || !isActive || results.length === 0 || highlightFocusData.length === 0) return state;
  const [focusStart, focusEnd, colors] = highlightFocusData;
  let [rowStartPos] = getStartEndOfVisibleRows(cipheredText);
  let i = rowStartPos;
  const newRows = getUpdatedRows(i, focusStart, focusEnd, colors, rows);
  [rowStartPos] = getStartEndOfVisibleRows(decipheredText);
  i = rowStartPos;
  const newRows2 = getUpdatedRows(i, focusStart, focusEnd, colors, rows2);
  return update(state, {
    cipheredText: {visible: {rows: {$set: newRows}}},
    decipheredText: {visible: {rows: {$set: newRows2}}}
  });
}

function* searchSaga () {
  const {actions, messages, messageIndex, searchInfo: {pattern}} = yield select(({actions, taskData:{messages}, messageIndex, search: searchInfo}) => ({actions, messages, messageIndex, searchInfo}));
  if (pattern !== null && pattern !== '') {
    yield put({type: actions.searchIsActiveChanged, payload: {isActive: true}});
    let regexResults = [];
    const [regex, replacer] = patternToRegex(pattern);
    regexResults = regexSearch(regex, messages[messageIndex].cipherText);
    yield put({type: actions.searchResultsChanged, payload: {results: regexResults || [], replacer, numResults: regexResults.length}});
    if (regexResults.length > 0) {
      yield put({type: actions.searchHighlightFocusChanged, payload: {highlightFocus: 0}});
    }
  }
}

function* highlightFocusChangedSaga () {
  const {actions, searchInfo} = yield select(({actions, search: searchInfo}) => ({actions, searchInfo}));
  const {isActive, results, highlightFocus, replacer} = searchInfo;
  const match = results[highlightFocus];
  let highlightFocusData = [];
  if (isActive && match) {
    highlightFocusData = calulateHighlightIndexes(match, replacer, charColors, starColor, dotColor, capsColor);
  }
  yield put({type: actions.searchHighlightFocusDataChanged, payload: {highlightFocusData}});
  yield scrollToHighlightFocusSaga();
  yield scrollToHighlightFocusSaga2();
}

function* scrollToHighlightFocusSaga () {
  const {actions, searchInfo, cipheredText} = yield select(({actions, search: searchInfo, cipheredText}) => ({actions, searchInfo, cipheredText}));
  const {isActive, results, highlightFocus} = searchInfo;
  const {visible: {rows}, cellHeight, pageColumns, pageRows, nbCells} = cipheredText;
  if (!isActive || results.length === 0 || !results[highlightFocus]) {
    yield put({type: actions.cipheredTextScrolled, payload: {scrollTop: 0}});
    return;
  }
  let {scrollTop} = cipheredText;
  const bottom = Math.ceil(nbCells / pageColumns) * cellHeight - 1;
  const maxTop = Math.max(0, bottom + 1 - pageRows * cellHeight);
  const match = results[highlightFocus];
  const startPos = match.index;
  const focusStartRow = Math.floor(startPos / pageColumns);
  const visibleFirstRow = rows[0].index;
  const visibleLastRow = rows[pageRows - 1].index;
  // focus going out of visibla rows
  if (focusStartRow >= visibleLastRow) {
    scrollTop = (focusStartRow - 1) * cellHeight;
    scrollTop = Math.min(maxTop, scrollTop);
  } else if (focusStartRow <= visibleFirstRow) {
    scrollTop = (focusStartRow - 1) * (cellHeight);
    if (scrollTop < 0) {scrollTop = 0;}
  }
  yield put({type: actions.cipheredTextScrolled, payload: {scrollTop}});
}

function* scrollToHighlightFocusSaga2 () {
  const {actions, searchInfo, decipheredText} = yield select(({actions, search: searchInfo, decipheredText}) => ({actions, searchInfo, decipheredText}));
  const {isActive, results, highlightFocus} = searchInfo;
  let {visible: {rows}, cellHeight, pageColumns, pageRows, nbCells} = decipheredText;
  pageRows = 4;
  if (!isActive || results.length === 0 || !results[highlightFocus]) {
    yield put({type: actions.decipheredTextScrolled, payload: {scrollTop: 0}});
    return;
  }
  let {scrollTop} = decipheredText;
  const bottom = Math.ceil(nbCells / pageColumns) * cellHeight - 1;
  const maxTop = Math.max(0, bottom + 1 - pageRows * cellHeight);
  const match = results[highlightFocus];
  const startPos = match.index;
  const focusStartRow = Math.floor(startPos / pageColumns);
  const visibleFirstRow = rows[0].index;
  const visibleLastRow = rows[pageRows - 1].index;
  // focus going out of visibla rows
  if (focusStartRow >= visibleLastRow) {
    scrollTop = (focusStartRow - 1) * cellHeight;
    scrollTop = Math.min(maxTop, scrollTop);
  } else if (focusStartRow <= visibleFirstRow) {
    scrollTop = (focusStartRow - 1) * (cellHeight);
    if (scrollTop < 0) {scrollTop = 0;}
  }
  yield put({type: actions.decipheredTextScrolled, payload: {scrollTop}});
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
    const pattern = e.target.value.replace(/[^A-Zabcd?*]|\*(?=\*)|^\*/, '');
    if (pattern.length > 50) {
      return;
    }
    const {searchInfo: {isActive}} = this.props;
    if (isActive) {
      this.props.dispatch({type: this.props.searchIsActiveChanged, payload: {isActive: false}});
      this.props.dispatch({type: this.props.searchResultsChanged, payload: {results: [], replacer: () => "", numResults: 0}});
      this.props.dispatch({type: this.props.searchHighlightFocusChanged, payload: {highlightFocus: 0}});
    }
    this.props.dispatch({type: this.props.searchPatternChanged, payload: {pattern}});
  }

  searchForPatterns = () => {
    const {cipherText, searchInfo: {pattern}} = this.props;
    let regexResults = [];
    this.props.dispatch({type: this.props.searchIsActiveChanged, payload: {isActive: true}});
    const [regex, replacer] = patternToRegex(pattern);
    regexResults = regexSearch(regex, cipherText);
    this.props.dispatch({type: this.props.searchResultsChanged, payload: {results: regexResults || [], replacer, numResults: regexResults.length}});
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

  onKeyPress = (e) => {
    if (e.key === "Enter") {
      if (e.shiftKey) {
        this.findPrevious();
      } else {
        this.findNext();
      }
    }
  };

  render () {
    const {searchInfo: {pattern, highlightFocus, isActive, numResults}} = this.props;
    return (
      <div className="search">
        <div className="search-box">
          <label className="title">Motif : </label>
          <input type="text" className="pattern" value={pattern} onChange={this.searchPatternChange} onKeyPress={this.onKeyPress} />
        </div>
        <div className="note">
          <div style={{width: "50%"}}>
            les lettres majuscules se représentent elles mêmes<br />
            chaque ? représente n'importe-quel symbole<br />
            chaque * représente une séquence de symboles<br />
            a,b,c et d représentent chacune toujours le même symbole<br />
          </div>
          <div style={{width: "30%"}}>
            {isActive && (<label style={{float: "right"}} className="occurrences">{numResults} occurrences trouvées</label>)}
            {(isActive && numResults > 0) && (<p style={{float: "right", clear: 'both'}} >occurrence actuelle : {highlightFocus + 1}</p>)}
          </div>
          <div style={{width: "17%"}}>
            <Button onClick={this.findNext.bind(this)}>Suivant</Button>
            <Button onClick={this.findPrevious.bind(this)}>Précédent</Button>
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
    searchHighlightFocusDataChanged: 'Search.HighlightFocusData.Changed',
  },
  actionReducers: {
    appInit: appInitReducer,
    taskInit: taskInitReducer,
    taskRefresh: taskRefreshReducer,
    searchIsActiveChanged: searchIsActiveChangedReducer,
    searchPatternChanged: searchPatternChangedReducer,
    searchHighlightFocusChanged: searchHighlightFocusChangedReducer,
    searchResultsChanged: searchResultsChangedReducer,
    searchHighlightFocusDataChanged: searchHighlightFocusDataChangedReducer,
  },
  lateReducer: searchLateReducer,
  saga: function* () {
    const actions = yield select((state) => state.actions);
    yield takeEvery(actions.searchHighlightFocusChanged, highlightFocusChangedSaga);
    yield takeEvery(actions.multiMessageIndexChanged, searchSaga);
  },
  views: {
    Search: connect(SearchToolViewSelector)(SearchToolView),
  }
};
