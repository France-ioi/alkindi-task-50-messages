
import update from 'immutability-helper';
import algoreaReactTask from './algorea_react_task';
import {selectTaskData} from './utils';

import 'font-awesome/css/font-awesome.css';
import 'bootstrap/dist/css/bootstrap.css';
import './style.css';

import CipheredTextBundle from './ciphered_text_bundle';
import FrequencyAnalysisBundle from './frequency_analysis_bundle';
import SubstitutionsBundle from './substitutions_bundle';
import DecipheredTextBundle from './deciphered_text_bundle';
import MultiMessageBundle from './multi_message_bundle';
import WorkspaceBundle from './workspace_bundle';
import {dumpSubstitutions, loadSubstitutions} from './utils';

const TaskBundle = {
  actionReducers: {
    appInit: appInitReducer,
    taskInit: taskInitReducer /* possibly move to algorea-react-task */,
    taskRefresh: taskRefreshReducer /* possibly move to algorea-react-task */,
    taskAnswerLoaded: taskAnswerLoaded,
    taskStateLoaded: taskStateLoaded,
  },
  includes: [
    CipheredTextBundle,
    FrequencyAnalysisBundle,
    SubstitutionsBundle,
    DecipheredTextBundle,
    MultiMessageBundle,
    WorkspaceBundle,
  ],
  selectors: {
    getTaskState,
    getTaskAnswer,
  }
};

if (process.env.NODE_ENV === 'development') {
  /* eslint-disable no-console */
  TaskBundle.earlyReducer = function (state, action) {
    console.log('ACTION', action.type, action);
    return state;
  };
}

function appInitReducer (state, _action) {
  const taskMetaData = {
    "id": "http://concours-alkindi.fr/tasks/2018/enigma",
    "language": "fr",
    "version": "fr.01",
    "authors": "Sébastien Carlier",
    "translators": [],
    "license": "",
    "taskPathPrefix": "",
    "modulesPathPrefix": "",
    "browserSupport": [],
    "fullFeedback": true,
    "acceptedAnswers": [],
    "usesRandomSeed": true
  };
  return {...state, taskMetaData};
}

function taskInitReducer (state, _action) {
  const {alphabet, numMessages, hints} = selectTaskData(state);
  const substitutionSpecs = new Array(numMessages).fill([]);
  const substitutions = loadSubstitutions(alphabet,  hints, substitutionSpecs);
  return {...state, substitutions, taskReady: true};
}

function taskRefreshReducer (state, _action) {
  const {alphabet, hints} = selectTaskData(state);
  const dump = dumpSubstitutions(alphabet, state.substitutions);
  const substitutions = loadSubstitutions(alphabet, hints, dump);
  return {...state, substitutions};
}

function getTaskAnswer (state) {
  const {taskData: {alphabet}} = state;
  return {
    substitutions: state.substitutions.map(substitution => substitution.cells.map(({editable}) => alphabet.indexOf(editable)))
  };
}

function taskAnswerLoaded (state, {payload: {answer}}) {
  const {alphabet, hints} = selectTaskData(state);
  const substitutions = loadSubstitutions(alphabet, hints, answer.substitutions);
  return update(state, {substitutions: {$set: substitutions}});
}

function getTaskState (state) {
  console.log(state);
  const {taskData: {alphabet}} = state;
  return {substitutions: dumpSubstitutions(alphabet, state.substitutions)};
}

function taskStateLoaded (state, {payload: {dump}}) {
  const {alphabet, hints} = selectTaskData(state);
  const substitutions = loadSubstitutions(alphabet, hints, dump.substitutions);
  return update(state, {substitutions: {$set: substitutions}});
}

export function run (container, options) {
  return algoreaReactTask(container, options, TaskBundle);
}
