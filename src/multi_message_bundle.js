import React from "react";
import {connect} from "react-redux";
import {Button, Glyphicon} from "react-bootstrap";
import update from 'immutability-helper';
import {put, select, takeEvery} from 'redux-saga/effects';


function appInitReducer (state, _action) {
  return {...state, messageIndex: 0};
}

function multiMessageIndexChangedReducer (state, {payload: {messageIndex}}) {
  return update(state, {
    messageIndex: {$set: messageIndex},
  });
}

function MultiMessageViewSelector (state) {
  const {
    actions: {multiMessageIndexChanged, taskInit},
    messageIndex,
    taskData: {
      config: {numMessages}
    }
  } = state;
  return {
    index: messageIndex,
    numMessages,
    taskInit,
    multiMessageIndexChanged
  };
}

class MultiMessageView extends React.PureComponent {
  render () {
    const {index, numMessages} = this.props;
    return (
      <div style={{display: "inline-block", width: '100%', padding: '10px 0', textAlign: "center"}}>
        <Button bsSize="large" onClick={this.onPrevious} disabled={index <= 0}>
          <Glyphicon glyph="arrow-left" />
        </Button>
        <span style={{padding: "0 20px"}}> Message : {index + 1} / {numMessages} </span>
        <Button bsSize="large" onClick={this.onNext} disabled={numMessages - 1 <= index}>
          <Glyphicon glyph="arrow-right" />
        </Button>
      </div>
    );
  }
  onNext = () => {
    this.props.dispatch({
      type: this.props.multiMessageIndexChanged,
      payload: {messageIndex: this.props.index + 1}
    });
  };
  onPrevious = () => {
    this.props.dispatch({
      type: this.props.multiMessageIndexChanged,
      payload: {messageIndex: this.props.index - 1}
    });
  };
}

export default {
  actions: {
    multiMessageIndexChanged: "MultiMessage.IndexChanged"
  },
  actionReducers: {
    appInit: appInitReducer,
    multiMessageIndexChanged: multiMessageIndexChangedReducer,
  },
  views: {
    MultiMessage: connect(MultiMessageViewSelector)(MultiMessageView)
  },
  saga: function* () {
    const actions = yield select(({actions}) => actions);
    yield takeEvery(actions.multiMessageIndexChanged, function* () {
      yield put({type: actions.taskRefresh});
      yield put({type: actions.hintRequestFeedbackCleared, payload: {}});
    });
  }
};
