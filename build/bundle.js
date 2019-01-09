var ReactTask =
webpackJsonpReactTask([0],{

/***/ 251:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireDefault = __webpack_require__(10);

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.run = run;

var _objectSpread2 = _interopRequireDefault(__webpack_require__(22));

var _immutabilityHelper = _interopRequireDefault(__webpack_require__(68));

var _algorea_react_task = _interopRequireDefault(__webpack_require__(252));

__webpack_require__(552);

__webpack_require__(560);

__webpack_require__(566);

var _ciphered_text_bundle = _interopRequireDefault(__webpack_require__(568));

var _frequency_analysis_bundle = _interopRequireDefault(__webpack_require__(569));

var _scheduling_bundle = _interopRequireDefault(__webpack_require__(579));

var _rotors_bundle = _interopRequireDefault(__webpack_require__(580));

var _deciphered_text_bundle = _interopRequireDefault(__webpack_require__(581));

var _workspace_bundle = _interopRequireDefault(__webpack_require__(582));

var _utils = __webpack_require__(82);

var TaskBundle = {
  actionReducers: {
    appInit: appInitReducer,
    taskInit: taskInitReducer
    /* possibly move to algorea-react-task */
    ,
    taskRefresh: taskRefreshReducer
    /* possibly move to algorea-react-task */
    ,
    taskAnswerLoaded: taskAnswerLoaded,
    taskStateLoaded: taskStateLoaded
  },
  includes: [_ciphered_text_bundle.default, _frequency_analysis_bundle.default, _scheduling_bundle.default, _rotors_bundle.default, _deciphered_text_bundle.default, _workspace_bundle.default],
  selectors: {
    getTaskState: getTaskState,
    getTaskAnswer: getTaskAnswer
  }
};

if (undefined === 'development') {
  /* eslint-disable no-console */
  TaskBundle.earlyReducer = function (state, action) {
    console.log('ACTION', action.type, action);
    return state;
  };
}

function appInitReducer(state, _action) {
  var taskMetaData = {
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
  return (0, _objectSpread2.default)({}, state, {
    taskMetaData: taskMetaData
  });
}

function taskInitReducer(state, _action) {
  var _state$taskData = state.taskData,
      alphabet = _state$taskData.alphabet,
      rotorSpecs = _state$taskData.rotors,
      hints = _state$taskData.hints;
  var rotors = (0, _utils.loadRotors)(alphabet, rotorSpecs, hints, rotorSpecs.map(function (_) {
    return [];
  }));
  return (0, _objectSpread2.default)({}, state, {
    rotors: rotors,
    taskReady: true
  });
}

function taskRefreshReducer(state, _action) {
  var _state$taskData2 = state.taskData,
      alphabet = _state$taskData2.alphabet,
      rotorSpecs = _state$taskData2.rotors,
      hints = _state$taskData2.hints;
  var dump = (0, _utils.dumpRotors)(alphabet, state.rotors);
  var rotors = (0, _utils.loadRotors)(alphabet, rotorSpecs, hints, dump);
  return (0, _objectSpread2.default)({}, state, {
    rotors: rotors
  });
}

function getTaskAnswer(state) {
  var alphabet = state.taskData.alphabet;
  return {
    rotors: state.rotors.map(function (rotor) {
      return rotor.cells.map(function (_ref) {
        var editable = _ref.editable;
        return alphabet.indexOf(editable);
      });
    })
  };
}

function taskAnswerLoaded(state, _ref2) {
  var answer = _ref2.payload.answer;
  var _state$taskData3 = state.taskData,
      alphabet = _state$taskData3.alphabet,
      rotorSpecs = _state$taskData3.rotors,
      hints = _state$taskData3.hints;
  var rotors = (0, _utils.loadRotors)(alphabet, rotorSpecs, hints, answer.rotors);
  return (0, _immutabilityHelper.default)(state, {
    rotors: {
      $set: rotors
    }
  });
}

function getTaskState(state) {
  console.log(state);
  var alphabet = state.taskData.alphabet;
  return {
    rotors: (0, _utils.dumpRotors)(alphabet, state.rotors)
  };
}

function taskStateLoaded(state, _ref3) {
  var dump = _ref3.payload.dump;
  var _state$taskData4 = state.taskData,
      alphabet = _state$taskData4.alphabet,
      rotorSpecs = _state$taskData4.rotors,
      hints = _state$taskData4.hints;
  var rotors = (0, _utils.loadRotors)(alphabet, rotorSpecs, hints, dump.rotors);
  return (0, _immutabilityHelper.default)(state, {
    rotors: {
      $set: rotors
    }
  });
}

function run(container, options) {
  return (0, _algorea_react_task.default)(container, options, TaskBundle);
}

/***/ }),

/***/ 252:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireDefault = __webpack_require__(10);

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;

var _regenerator = _interopRequireDefault(__webpack_require__(48));

var _objectSpread2 = _interopRequireDefault(__webpack_require__(22));

var _react = _interopRequireDefault(__webpack_require__(0));

var _reactDom = _interopRequireDefault(__webpack_require__(20));

var _reactRedux = __webpack_require__(35);

var _queryString = _interopRequireDefault(__webpack_require__(383));

var _redux = __webpack_require__(192);

var _reduxSaga = _interopRequireDefault(__webpack_require__(92));

var _effects = __webpack_require__(38);

var _linker = _interopRequireDefault(__webpack_require__(392));

__webpack_require__(400);

var _app_bundle = _interopRequireDefault(__webpack_require__(403));

/*
Change method of use:
- export a bundle that the task can include;
- export a function(saga?) that (creates the API objects and ) dispatches the
  appInit action;

*/
//import './shim'
function _default(container, options, TaskBundle) {
  var platform = window.platform;
  if (undefined === 'development') platform.debug = true;

  var _link = (0, _linker.default)({
    includes: [_app_bundle.default, TaskBundle]
  }),
      actions = _link.actions,
      views = _link.views,
      selectors = _link.selectors,
      reducer = _link.reducer,
      rootSaga = _link.rootSaga;
  /* Build the store. */


  var safeReducer = function safeReducer(state, action) {
    try {
      return reducer(state, action);
    } catch (ex) {
      console.error('action failed to reduce', action, ex);
      return (0, _objectSpread2.default)({}, state, {
        errors: [ex]
      });
    }
  };

  var sagaMiddleware = (0, _reduxSaga.default)();
  var enhancer = (0, _redux.applyMiddleware)(sagaMiddleware);
  var store = (0, _redux.createStore)(safeReducer, {
    actions: actions,
    views: views,
    selectors: selectors
  }, enhancer);
  /* Start the sagas. */

  function start() {
    sagaMiddleware.run(
    /*#__PURE__*/
    _regenerator.default.mark(function _callee() {
      return _regenerator.default.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.prev = 0;
              _context.next = 3;
              return (0, _effects.call)(rootSaga);

            case 3:
              _context.next = 8;
              break;

            case 5:
              _context.prev = 5;
              _context.t0 = _context["catch"](0);
              console.error('sagas crashed', _context.t0);

            case 8:
            case "end":
              return _context.stop();
          }
        }
      }, _callee, this, [[0, 5]]);
    }));
  }

  start();
  /* Dispatch the appInit action. */

  var query = _queryString.default.parse(location.search);

  var taskToken = query.sToken;
  store.dispatch({
    type: actions.appInit,
    payload: {
      options: options,
      taskToken: taskToken,
      platform: platform
    }
  });
  /* Start rendering. */

  _reactDom.default.render(_react.default.createElement(_reactRedux.Provider, {
    store: store
  }, _react.default.createElement(views.App, null)), container);

  return {
    actions: actions,
    views: views,
    store: store,
    start: start
  };
}

/***/ }),

/***/ 392:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireDefault = __webpack_require__(10);

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = link;

var _slicedToArray2 = _interopRequireDefault(__webpack_require__(130));

var _regenerator = _interopRequireDefault(__webpack_require__(48));

var _toConsumableArray2 = _interopRequireDefault(__webpack_require__(396));

var _effects = __webpack_require__(38);

/* Copyright (C) 2017 epixode - All Rights Reserved
 * You may use, distribute and modify this code under the
 * terms of the MIT license.
 */
function link(rootBundle, features) {
  features = features || [Actions, Views, Selectors, EarlyReducers, Reducers, ActionReducers, LateReducers, Sagas];
  var app = {};
  var _iteratorNormalCompletion = true;
  var _didIteratorError = false;
  var _iteratorError = undefined;

  try {
    for (var _iterator = features[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
      var feature = _step.value;
      feature.prepare(app);
    }
  } catch (err) {
    _didIteratorError = true;
    _iteratorError = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion && _iterator.return != null) {
        _iterator.return();
      }
    } finally {
      if (_didIteratorError) {
        throw _iteratorError;
      }
    }
  }

  linkBundle(rootBundle, features, app);
  var _iteratorNormalCompletion2 = true;
  var _didIteratorError2 = false;
  var _iteratorError2 = undefined;

  try {
    for (var _iterator2 = features[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
      var _feature = _step2.value;

      _feature.finalize(app);
    }
  } catch (err) {
    _didIteratorError2 = true;
    _iteratorError2 = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion2 && _iterator2.return != null) {
        _iterator2.return();
      }
    } finally {
      if (_didIteratorError2) {
        throw _iteratorError2;
      }
    }
  }

  return app;
}

function linkBundle(bundle, features, app) {
  var _iteratorNormalCompletion3 = true;
  var _didIteratorError3 = false;
  var _iteratorError3 = undefined;

  try {
    for (var _iterator3 = features[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
      var feature = _step3.value;
      feature.add(app, bundle);
    }
  } catch (err) {
    _didIteratorError3 = true;
    _iteratorError3 = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion3 && _iterator3.return != null) {
        _iterator3.return();
      }
    } finally {
      if (_didIteratorError3) {
        throw _iteratorError3;
      }
    }
  }

  if (bundle.includes) {
    var _iteratorNormalCompletion4 = true;
    var _didIteratorError4 = false;
    var _iteratorError4 = undefined;

    try {
      for (var _iterator4 = bundle.includes[Symbol.iterator](), _step4; !(_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done); _iteratorNormalCompletion4 = true) {
        var subBundle = _step4.value;
        linkBundle(subBundle, features, app);
      }
    } catch (err) {
      _didIteratorError4 = true;
      _iteratorError4 = err;
    } finally {
      try {
        if (!_iteratorNormalCompletion4 && _iterator4.return != null) {
          _iterator4.return();
        }
      } finally {
        if (_didIteratorError4) {
          throw _iteratorError4;
        }
      }
    }
  }
}

var Actions = {
  prepare: function prepare(app) {
    app.actions = {};
  },
  add: function add(app, _ref) {
    var actions = _ref.actions;

    if (actions) {
      Object.assign(app.actions, actions);
    }
  },
  finalize: function finalize(_app) {}
};
var Views = {
  prepare: function prepare(app) {
    app.views = {};
  },
  add: function add(app, _ref2) {
    var views = _ref2.views;

    if (views) {
      Object.assign(app.views, views);
    }
  },
  finalize: function finalize(_app) {}
};
var Reducers = {
  prepare: function prepare(app) {
    app.reducer = undefined;
  },
  add: function add(app, _ref3) {
    var reducer = _ref3.reducer,
        reducers = _ref3.reducers;

    if (reducer) {
      app.reducer = sequenceReducers(app.reducer, reducer);
    }

    if (reducers) {
      app.reducer = sequenceReducers.apply(void 0, [app.reducer].concat((0, _toConsumableArray2.default)(reducers)));
    }
  },
  finalize: function finalize(_app) {}
};
var EarlyReducers = {
  prepare: function prepare(app) {
    app.earlyReducer = undefined;
  },
  add: function add(app, _ref4) {
    var earlyReducer = _ref4.earlyReducer;
    app.earlyReducer = sequenceReducers(app.earlyReducer, earlyReducer);
  },
  finalize: function finalize(app) {
    app.reducer = sequenceReducers(app.earlyReducer, app.reducer);
    delete app.earlyReducer;
  }
};
var LateReducers = {
  prepare: function prepare(app) {
    app.lateReducer = undefined;
  },
  add: function add(app, _ref5) {
    var lateReducer = _ref5.lateReducer;
    app.lateReducer = sequenceReducers(app.lateReducer, lateReducer);
  },
  finalize: function finalize(app) {
    app.reducer = sequenceReducers(app.reducer, app.lateReducer);
    delete app.lateReducer;
  }
};
var ActionReducers = {
  prepare: function prepare(app) {
    app.actionReducers = new Map();
  },
  add: function add(app, _ref6) {
    var actionReducers = _ref6.actionReducers;

    if (actionReducers) {
      var _arr = Object.keys(actionReducers);

      for (var _i = 0; _i < _arr.length; _i++) {
        var key = _arr[_i];
        var reducer = app.actionReducers.get(key);
        reducer = sequenceReducers(reducer, actionReducers[key]);
        app.actionReducers.set(key, reducer);
      }
    }
  },
  finalize: function finalize(app) {
    var actionReducer = makeActionReducer(app);
    app.reducer = sequenceReducers(app.reducer, actionReducer);
    delete app.actionReducers;
  }
};
var Sagas = {
  prepare: function prepare(app) {
    app.sagas = [];
  },
  add: function add(app, _ref7) {
    var saga = _ref7.saga,
        sagas = _ref7.sagas;

    if (saga) {
      app.sagas.push(saga);
    }

    if (sagas) {
      Array.prototype.push.apply(app.sagas, sagas);
    }
  },
  finalize: function finalize(app) {
    var effects = app.sagas.map(function (saga) {
      return (0, _effects.call)(saga);
    });
    app.rootSaga =
    /*#__PURE__*/
    _regenerator.default.mark(function _callee() {
      return _regenerator.default.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.next = 2;
              return (0, _effects.all)(effects);

            case 2:
            case "end":
              return _context.stop();
          }
        }
      }, _callee, this);
    });
    delete app.sagas;
  }
};
var Selectors = {
  prepare: function prepare(app) {
    app.selectors = {};
  },
  add: function add(app, _ref8) {
    var selectors = _ref8.selectors;

    if (selectors) {
      Object.assign(app.selectors, selectors);
    }
  },
  finalize: function finalize(_app) {}
};

function makeActionReducer(_ref9) {
  var actions = _ref9.actions,
      actionReducers = _ref9.actionReducers;
  var map = new Map();
  var _iteratorNormalCompletion5 = true;
  var _didIteratorError5 = false;
  var _iteratorError5 = undefined;

  try {
    for (var _iterator5 = actionReducers.entries()[Symbol.iterator](), _step5; !(_iteratorNormalCompletion5 = (_step5 = _iterator5.next()).done); _iteratorNormalCompletion5 = true) {
      var _step5$value = (0, _slicedToArray2.default)(_step5.value, 2),
          key = _step5$value[0],
          reducer = _step5$value[1];

      map.set(actions[key], reducer);
    }
  } catch (err) {
    _didIteratorError5 = true;
    _iteratorError5 = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion5 && _iterator5.return != null) {
        _iterator5.return();
      }
    } finally {
      if (_didIteratorError5) {
        throw _iteratorError5;
      }
    }
  }

  return function (state, action) {
    var reducer = map.get(action.type);
    return typeof reducer === 'function' ? reducer(state, action) : state;
  };
}

function sequenceReducers() {
  var result = undefined;

  for (var i = 0; i < arguments.length; i += 1) {
    var reducer = i < 0 || arguments.length <= i ? undefined : arguments[i];

    if (!reducer) {
      continue;
    }

    if (typeof reducer !== 'function') {
      throw new Error('reducer must be a function', reducer);
    }

    if (!result) {
      result = reducer;
    } else {
      result = composeReducers(result, reducer);
    }
  }

  return result;
}

function composeReducers(fst, snd) {
  return function (state, action) {
    return snd(fst(state, action), action);
  };
}

/***/ }),

/***/ 400:
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(401);
if(typeof content === 'string') content = [[module.i, content, '']];
// Prepare cssTransformation
var transform;

var options = {"sourceMap":true,"hmr":true}
options.transform = transform
// add the styles to the DOM
var update = __webpack_require__(95)(content, options);
if(content.locals) module.exports = content.locals;
// Hot Module Replacement
if(false) {
	// When the styles change, update the <style> tags
	if(!content.locals) {
		module.hot.accept("!!../../../node_modules/css-loader/index.js??ref--1-1!./styles.css", function() {
			var newContent = require("!!../../../node_modules/css-loader/index.js??ref--1-1!./styles.css");
			if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
			update(newContent);
		});
	}
	// When the module is disposed, remove the <style> tags
	module.hot.dispose(function() { update(); });
}

/***/ }),

/***/ 401:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(94)(false);
// imports


// module
exports.push([module.i, ".task-bar {\n    text-align: center;\n    margin-top: 20px;\n}", ""]);

// exports


/***/ }),

/***/ 403:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireDefault = __webpack_require__(10);

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _classCallCheck2 = _interopRequireDefault(__webpack_require__(39));

var _createClass2 = _interopRequireDefault(__webpack_require__(40));

var _possibleConstructorReturn2 = _interopRequireDefault(__webpack_require__(41));

var _getPrototypeOf3 = _interopRequireDefault(__webpack_require__(43));

var _inherits2 = _interopRequireDefault(__webpack_require__(44));

var _assertThisInitialized2 = _interopRequireDefault(__webpack_require__(42));

var _defineProperty2 = _interopRequireDefault(__webpack_require__(33));

var _regenerator = _interopRequireDefault(__webpack_require__(48));

var _objectSpread2 = _interopRequireDefault(__webpack_require__(22));

var _react = _interopRequireDefault(__webpack_require__(0));

var _reactBootstrap = __webpack_require__(74);

var _reactRedux = __webpack_require__(35);

var _effects = __webpack_require__(38);

var _task_bar = _interopRequireDefault(__webpack_require__(542));

var _spinner = _interopRequireDefault(__webpack_require__(543));

var _task = _interopRequireDefault(__webpack_require__(544));

var _server_api = _interopRequireDefault(__webpack_require__(545));

var _platform_adapter = _interopRequireDefault(__webpack_require__(547));

var _platform_bundle = _interopRequireDefault(__webpack_require__(548));

var _hints_bundle = _interopRequireDefault(__webpack_require__(550));

var _window_height_monitor = __webpack_require__(551);

var _marked =
/*#__PURE__*/
_regenerator.default.mark(appSaga),
    _marked2 =
/*#__PURE__*/
_regenerator.default.mark(appInitSaga),
    _marked3 =
/*#__PURE__*/
_regenerator.default.mark(platformValidateSaga);

function appInitReducer(state, _ref) {
  var _ref$payload = _ref.payload,
      taskToken = _ref$payload.taskToken,
      options = _ref$payload.options;
  return (0, _objectSpread2.default)({}, state, {
    taskToken: taskToken,
    options: options
  });
}

function appInitDoneReducer(state, _ref2) {
  var _ref2$payload = _ref2.payload,
      platformApi = _ref2$payload.platformApi,
      taskApi = _ref2$payload.taskApi,
      serverApi = _ref2$payload.serverApi;
  return (0, _objectSpread2.default)({}, state, {
    platformApi: platformApi,
    taskApi: taskApi,
    serverApi: serverApi
  });
}

function appInitFailedReducer(state, _ref3) {
  var message = _ref3.payload.message;
  return (0, _objectSpread2.default)({}, state, {
    fatalError: message
  });
}

function appSaga() {
  var actions;
  return _regenerator.default.wrap(function appSaga$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.next = 2;
          return (0, _effects.select)(function (_ref4) {
            var actions = _ref4.actions;
            return actions;
          });

        case 2:
          actions = _context.sent;
          _context.next = 5;
          return (0, _effects.takeEvery)(actions.appInit, appInitSaga);

        case 5:
          _context.next = 7;
          return (0, _effects.takeEvery)(actions.platformValidate, platformValidateSaga);

        case 7:
        case "end":
          return _context.stop();
      }
    }
  }, _marked, this);
}

var taskActions = {
  /* map task method names to action types */
  load: 'taskLoadEvent',
  unload: 'taskUnloadEvent',
  updateToken: 'taskUpdateTokenEvent',
  getHeight: 'taskGetHeightEvent',
  getMetaData: 'taskGetMetaDataEvent',
  getViews: 'taskGetViewsEvent',
  showViews: 'taskShowViewsEvent',
  getState: 'taskGetStateEvent',
  reloadState: 'taskReloadStateEvent',
  getAnswer: 'taskGetAnswerEvent',
  reloadAnswer: 'taskReloadAnswerEvent',
  gradeAnswer: 'taskGradeAnswerEvent'
};

function appInitSaga(_ref5) {
  var _ref5$payload, taskToken, options, platform, actions, taskChannel, taskApi, platformApi, serverApi;

  return _regenerator.default.wrap(function appInitSaga$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          _ref5$payload = _ref5.payload, taskToken = _ref5$payload.taskToken, options = _ref5$payload.options, platform = _ref5$payload.platform;
          _context3.next = 3;
          return (0, _effects.select)(function (_ref6) {
            var actions = _ref6.actions;
            return actions;
          });

        case 3:
          actions = _context3.sent;
          _context3.prev = 4;
          serverApi = (0, _server_api.default)(options.server_module, taskToken);
          _context3.next = 8;
          return (0, _effects.call)(_task.default);

        case 8:
          taskChannel = _context3.sent;
          _context3.next = 11;
          return (0, _effects.take)(taskChannel);

        case 11:
          taskApi = _context3.sent.task;
          _context3.next = 14;
          return (0, _effects.takeEvery)(taskChannel,
          /*#__PURE__*/
          _regenerator.default.mark(function _callee(_ref7) {
            var type, payload, action;
            return _regenerator.default.wrap(function _callee$(_context2) {
              while (1) {
                switch (_context2.prev = _context2.next) {
                  case 0:
                    type = _ref7.type, payload = _ref7.payload;
                    action = {
                      type: actions[taskActions[type]],
                      payload: payload
                    };
                    _context2.next = 4;
                    return (0, _effects.put)(action);

                  case 4:
                  case "end":
                    return _context2.stop();
                }
              }
            }, _callee, this);
          }));

        case 14:
          platformApi = (0, _platform_adapter.default)(platform);
          _context3.next = 22;
          break;

        case 17:
          _context3.prev = 17;
          _context3.t0 = _context3["catch"](4);
          _context3.next = 21;
          return (0, _effects.put)({
            type: actions.appInitFailed,
            payload: {
              message: _context3.t0.toString()
            }
          });

        case 21:
          return _context3.abrupt("return");

        case 22:
          _context3.next = 24;
          return (0, _effects.put)({
            type: actions.appInitDone,
            payload: {
              taskApi: taskApi,
              platformApi: platformApi,
              serverApi: serverApi
            }
          });

        case 24:
          /* XXX Ideally platform.initWithTask would take care of setting its global. */
          window.task = taskApi;
          _context3.next = 27;
          return (0, _effects.call)(platformApi.initWithTask, taskApi);

        case 27:
          _context3.next = 29;
          return (0, _effects.fork)(_window_height_monitor.windowHeightMonitorSaga, platformApi);

        case 29:
        case "end":
          return _context3.stop();
      }
    }
  }, _marked2, this, [[4, 17]]);
}

function platformValidateSaga(_ref8) {
  var mode, _ref9, validate;

  return _regenerator.default.wrap(function platformValidateSaga$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          mode = _ref8.payload.mode;
          _context4.next = 3;
          return (0, _effects.select)(function (state) {
            return state.platformApi;
          });

        case 3:
          _ref9 = _context4.sent;
          validate = _ref9.validate;
          _context4.next = 7;
          return (0, _effects.call)(validate, mode);

        case 7:
        case "end":
          return _context4.stop();
      }
    }
  }, _marked3, this);
}

function AppSelector(state) {
  var taskReady = state.taskReady,
      fatalError = state.fatalError,
      Workspace = state.views.Workspace,
      platformValidate = state.actions.platformValidate,
      grading = state.grading;
  return {
    taskReady: taskReady,
    fatalError: fatalError,
    Workspace: Workspace,
    platformValidate: platformValidate,
    grading: grading
  };
}

var App =
/*#__PURE__*/
function (_React$PureComponent) {
  (0, _inherits2.default)(App, _React$PureComponent);

  function App() {
    var _getPrototypeOf2;

    var _this;

    (0, _classCallCheck2.default)(this, App);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = (0, _possibleConstructorReturn2.default)(this, (_getPrototypeOf2 = (0, _getPrototypeOf3.default)(App)).call.apply(_getPrototypeOf2, [this].concat(args)));
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)), "_validate", function () {
      _this.props.dispatch({
        type: _this.props.platformValidate,
        payload: {
          mode: 'done'
        }
      });
    });
    return _this;
  }

  (0, _createClass2.default)(App, [{
    key: "render",
    value: function render() {
      var _this$props = this.props,
          taskReady = _this$props.taskReady,
          Workspace = _this$props.Workspace,
          fatalError = _this$props.fatalError,
          grading = _this$props.grading;

      if (fatalError) {
        return _react.default.createElement("div", null, _react.default.createElement("h1", null, "A fatal error has occurred"), _react.default.createElement("p", null, fatalError));
      }

      if (!taskReady) {
        return _react.default.createElement(_spinner.default, null);
      }

      return _react.default.createElement("div", null, _react.default.createElement(Workspace, null), _react.default.createElement(_task_bar.default, {
        onValidate: this._validate
      }), grading.message && _react.default.createElement("p", {
        style: {
          fontWeight: 'bold'
        }
      }, grading.message), typeof grading.score === 'number' && _react.default.createElement("p", null, "Votre score : ", _react.default.createElement("span", {
        style: {
          fontWeight: 'bold'
        }
      }, grading.score)), grading.error && _react.default.createElement(_reactBootstrap.Alert, {
        bsStyle: "danger"
      }, grading.error));
    }
  }]);
  return App;
}(_react.default.PureComponent);

var _default = {
  actions: {
    appInit: 'App.Init',
    appInitDone: 'App.Init.Done',
    appInitFailed: 'App.Init.Failed',
    platformValidate: 'Platform.Validate'
  },
  actionReducers: {
    appInit: appInitReducer,
    appInitDone: appInitDoneReducer,
    appInitFailed: appInitFailedReducer
  },
  saga: appSaga,
  views: {
    App: (0, _reactRedux.connect)(AppSelector)(App)
  },
  includes: [_platform_bundle.default, _hints_bundle.default]
};
exports.default = _default;

/***/ }),

/***/ 542:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireDefault = __webpack_require__(10);

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(__webpack_require__(0));

var _reactBootstrap = __webpack_require__(74);

function TaskBar(props) {
  return _react.default.createElement("div", {
    className: "task-bar"
  }, _react.default.createElement(_reactBootstrap.Button, {
    onClick: props.onValidate
  }, "Valider"));
}

var _default = TaskBar;
exports.default = _default;

/***/ }),

/***/ 543:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireDefault = __webpack_require__(10);

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(__webpack_require__(0));

function Spinner(_props) {
  return _react.default.createElement("div", {
    className: "text-center",
    style: {
      fontSize: '300%'
    }
  }, _react.default.createElement("i", {
    className: "fa fa-spinner fa-spin"
  }));
}

var _default = Spinner;
exports.default = _default;

/***/ }),

/***/ 544:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;

var _reduxSaga = __webpack_require__(92);

function _default() {
  return (0, _reduxSaga.eventChannel)(function (emit) {
    var task = makeTask(emit);
    emit({
      task: task
    });
    return function () {
      var _arr = Object.keys(task);

      for (var _i = 0; _i < _arr.length; _i++) {
        var prop = _arr[_i];

        task[prop] = function () {
          throw new Error('task channel is closed');
        };
      }
    };
  }, _reduxSaga.buffers.expanding(4));
}

function makeTask(emit) {
  return {
    showViews: function showViews(views, success, error) {
      emit({
        type: 'showViews',
        payload: {
          views: views,
          success: success,
          error: error
        }
      });
    },
    getViews: function getViews(success, error) {
      emit({
        type: 'getViews',
        payload: {
          success: success,
          error: error
        }
      });
    },
    updateToken: function updateToken(token, success, error) {
      emit({
        type: 'updateToken',
        payload: {
          token: token,
          success: success,
          error: error
        }
      });
    },
    getHeight: function getHeight(success, error) {
      emit({
        type: 'getHeight',
        payload: {
          success: success,
          error: error
        }
      });
    },
    unload: function unload(success, error) {
      emit({
        type: 'unload',
        payload: {
          success: success,
          error: error
        }
      });
    },
    getState: function getState(success, error) {
      emit({
        type: 'getState',
        payload: {
          success: success,
          error: error
        }
      });
    },
    getMetaData: function getMetaData(success, error) {
      emit({
        type: 'getMetaData',
        payload: {
          success: success,
          error: error
        }
      });
    },
    reloadAnswer: function reloadAnswer(answer, success, error) {
      emit({
        type: 'reloadAnswer',
        payload: {
          answer: answer,
          success: success,
          error: error
        }
      });
    },
    reloadState: function reloadState(state, success, error) {
      emit({
        type: 'reloadState',
        payload: {
          state: state,
          success: success,
          error: error
        }
      });
    },
    getAnswer: function getAnswer(success, error) {
      emit({
        type: 'getAnswer',
        payload: {
          success: success,
          error: error
        }
      });
    },
    load: function load(views, success, error) {
      emit({
        type: 'load',
        payload: {
          views: views,
          success: success,
          error: error
        }
      });
    },
    gradeAnswer: function gradeAnswer(answer, answerToken, success, error) {
      emit({
        type: 'gradeAnswer',
        payload: {
          answer: answer,
          answerToken: answerToken,
          success: success,
          error: error
        }
      });
    }
  };
}

/***/ }),

/***/ 545:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireDefault = __webpack_require__(10);

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = makeServerApi;

var _objectSpread2 = _interopRequireDefault(__webpack_require__(22));

var _fetchPonyfill2 = _interopRequireDefault(__webpack_require__(546));

var _fetchPonyfill = (0, _fetchPonyfill2.default)(),
    fetch = _fetchPonyfill.fetch;

function makeServerApi(config) {
  return function (service, action, body) {
    return new Promise(function (resolve, reject) {
      var url = new URL(service, config.baseUrl);
      var devel = config.devel ? {
        task: config.devel
      } : {};
      return fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify((0, _objectSpread2.default)({}, body, devel, {
          action: action
        }))
      }).then(function (response) {
        if (response.status !== 200) return reject(response);
        response.json().catch(reject).then(function (result) {
          if (!result.success) return reject(result.error);
          resolve(result.data);
        });
      }).catch(reject);
    });
  };
}

/***/ }),

/***/ 547:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;

function _default(platform) {
  function initWithTask(task) {
    return new Promise(function (resolve, reject) {
      platform.initWithTask(task, resolve, reject);
    });
  }

  function getTaskParams(key, defaultValue) {
    return new Promise(function (resolve, reject) {
      platform.getTaskParams(key, defaultValue, resolve, reject);
    });
  }

  function askHint(hintToken) {
    return new Promise(function (resolve, reject) {
      platform.askHint(hintToken, resolve, reject);
    });
  }

  function validate(mode) {
    return new Promise(function (resolve, reject) {
      platform.validate(mode, resolve, reject);
    });
  }

  function updateDisplay(options) {
    return new Promise(function (resolve, reject) {
      platform.updateDisplay(options, resolve, reject);
    });
  }

  return {
    initWithTask: initWithTask,
    getTaskParams: getTaskParams,
    askHint: askHint,
    validate: validate,
    updateDisplay: updateDisplay
  };
}

/***/ }),

/***/ 548:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireDefault = __webpack_require__(10);

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _regenerator = _interopRequireDefault(__webpack_require__(48));

var _objectSpread2 = _interopRequireDefault(__webpack_require__(22));

var _effects = __webpack_require__(38);

var _jsonStableStringifyWithoutJsonify = _interopRequireDefault(__webpack_require__(549));

var _marked =
/*#__PURE__*/
_regenerator.default.mark(taskShowViewsEventSaga),
    _marked2 =
/*#__PURE__*/
_regenerator.default.mark(taskGetViewsEventSaga),
    _marked3 =
/*#__PURE__*/
_regenerator.default.mark(taskUpdateTokenEventSaga),
    _marked4 =
/*#__PURE__*/
_regenerator.default.mark(taskGetHeightEventSaga),
    _marked5 =
/*#__PURE__*/
_regenerator.default.mark(taskUnloadEventSaga),
    _marked6 =
/*#__PURE__*/
_regenerator.default.mark(taskGetMetaDataEventSaga),
    _marked7 =
/*#__PURE__*/
_regenerator.default.mark(taskGetAnswerEventSaga),
    _marked8 =
/*#__PURE__*/
_regenerator.default.mark(taskReloadAnswerEventSaga),
    _marked9 =
/*#__PURE__*/
_regenerator.default.mark(taskGetStateEventSaga),
    _marked10 =
/*#__PURE__*/
_regenerator.default.mark(taskReloadStateEventSaga),
    _marked11 =
/*#__PURE__*/
_regenerator.default.mark(taskLoadEventSaga),
    _marked12 =
/*#__PURE__*/
_regenerator.default.mark(taskGradeAnswerEventSaga);

function appInitReducer(state, _ref) {
  var _ref$payload = _ref.payload,
      taskToken = _ref$payload.taskToken,
      options = _ref$payload.options;
  return (0, _objectSpread2.default)({}, state, {
    grading: {}
  });
}

function taskDataLoadedReducer(state, _ref2) {
  var taskData = _ref2.payload.taskData;
  return (0, _objectSpread2.default)({}, state, {
    taskData: taskData
  });
}

function taskStateLoadedReducer(state, _ref3) {
  var hints = _ref3.payload.hints;
  return (0, _objectSpread2.default)({}, state, {
    hints: hints
  });
}

function taskAnswerLoadedReducer(state, _ref4) {
  var answer = _ref4.payload.answer;
  return (0, _objectSpread2.default)({}, state, {
    answer: answer
  });
}

function taskShowViewsEventReducer(state, _ref5) {
  var views = _ref5.payload.views;
  return (0, _objectSpread2.default)({}, state, {
    taskViews: views
  });
}

function taskShowViewsEventSaga(_ref6) {
  var success;
  return _regenerator.default.wrap(function taskShowViewsEventSaga$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          success = _ref6.payload.success;
          _context.next = 3;
          return (0, _effects.call)(success);

        case 3:
        case "end":
          return _context.stop();
      }
    }
  }, _marked, this);
}

function taskGetViewsEventSaga(_ref7) {
  var success;
  return _regenerator.default.wrap(function taskGetViewsEventSaga$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          success = _ref7.payload.success;
          _context2.next = 3;
          return (0, _effects.call)(success, {
            'task': {}
          });

        case 3:
        case "end":
          return _context2.stop();
      }
    }
  }, _marked2, this);
}

function taskUpdateTokenEventReducer(state, _ref8) {
  var token = _ref8.payload.token;

  if (token === null) {
    console.warn('ignored task.updateToken with null token');
    return state;
  }

  return (0, _objectSpread2.default)({}, state, {
    taskToken: token
  });
}

function taskUpdateTokenEventSaga(_ref9) {
  var success;
  return _regenerator.default.wrap(function taskUpdateTokenEventSaga$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          success = _ref9.payload.success;
          _context3.next = 3;
          return (0, _effects.call)(success);

        case 3:
        case "end":
          return _context3.stop();
      }
    }
  }, _marked3, this);
}

function taskGetHeightEventSaga(_ref10) {
  var success, d, h;
  return _regenerator.default.wrap(function taskGetHeightEventSaga$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          success = _ref10.payload.success;
          d = document;
          h = Math.max(d.body.offsetHeight, d.documentElement.offsetHeight);
          _context4.next = 5;
          return (0, _effects.call)(success, h);

        case 5:
        case "end":
          return _context4.stop();
      }
    }
  }, _marked4, this);
}

function taskUnloadEventSaga(_ref11) {
  var success;
  return _regenerator.default.wrap(function taskUnloadEventSaga$(_context5) {
    while (1) {
      switch (_context5.prev = _context5.next) {
        case 0:
          success = _ref11.payload.success;
          _context5.next = 3;
          return (0, _effects.call)(success);

        case 3:
        case "end":
          return _context5.stop();
      }
    }
  }, _marked5, this);
}

function taskGetMetaDataEventSaga(_ref12) {
  var _ref12$payload, success, _error, metaData;

  return _regenerator.default.wrap(function taskGetMetaDataEventSaga$(_context6) {
    while (1) {
      switch (_context6.prev = _context6.next) {
        case 0:
          _ref12$payload = _ref12.payload, success = _ref12$payload.success, _error = _ref12$payload.error;
          _context6.next = 3;
          return (0, _effects.select)(function (_ref13) {
            var taskMetaData = _ref13.taskMetaData;
            return taskMetaData;
          });

        case 3:
          metaData = _context6.sent;
          _context6.next = 6;
          return (0, _effects.call)(success, metaData);

        case 6:
        case "end":
          return _context6.stop();
      }
    }
  }, _marked6, this);
}

function taskGetAnswerEventSaga(_ref14) {
  var success, answer, strAnswer;
  return _regenerator.default.wrap(function taskGetAnswerEventSaga$(_context7) {
    while (1) {
      switch (_context7.prev = _context7.next) {
        case 0:
          success = _ref14.payload.success;
          _context7.next = 3;
          return (0, _effects.select)(function (state) {
            return state.selectors.getTaskAnswer(state);
          });

        case 3:
          answer = _context7.sent;
          strAnswer = (0, _jsonStableStringifyWithoutJsonify.default)(answer);
          _context7.next = 7;
          return (0, _effects.call)(success, strAnswer);

        case 7:
        case "end":
          return _context7.stop();
      }
    }
  }, _marked7, this);
}

function taskReloadAnswerEventSaga(_ref15) {
  var _ref15$payload, answer, success, error, _ref16, taskAnswerLoaded, taskRefresh;

  return _regenerator.default.wrap(function taskReloadAnswerEventSaga$(_context8) {
    while (1) {
      switch (_context8.prev = _context8.next) {
        case 0:
          _ref15$payload = _ref15.payload, answer = _ref15$payload.answer, success = _ref15$payload.success, error = _ref15$payload.error;
          _context8.next = 3;
          return (0, _effects.select)(function (_ref17) {
            var actions = _ref17.actions;
            return actions;
          });

        case 3:
          _ref16 = _context8.sent;
          taskAnswerLoaded = _ref16.taskAnswerLoaded;
          taskRefresh = _ref16.taskRefresh;
          _context8.prev = 6;

          if (!answer) {
            _context8.next = 12;
            break;
          }

          _context8.next = 10;
          return (0, _effects.put)({
            type: taskAnswerLoaded,
            payload: {
              answer: JSON.parse(answer)
            }
          });

        case 10:
          _context8.next = 12;
          return (0, _effects.put)({
            type: taskRefresh
          });

        case 12:
          _context8.next = 14;
          return (0, _effects.call)(success);

        case 14:
          _context8.next = 20;
          break;

        case 16:
          _context8.prev = 16;
          _context8.t0 = _context8["catch"](6);
          _context8.next = 20;
          return (0, _effects.call)(error, "bad answer: ".concat(_context8.t0.message));

        case 20:
        case "end":
          return _context8.stop();
      }
    }
  }, _marked8, this, [[6, 16]]);
}

function taskGetStateEventSaga(_ref18) {
  var success, dump, strDump;
  return _regenerator.default.wrap(function taskGetStateEventSaga$(_context9) {
    while (1) {
      switch (_context9.prev = _context9.next) {
        case 0:
          success = _ref18.payload.success;
          _context9.next = 3;
          return (0, _effects.select)(function (state) {
            return state.selectors.getTaskState(state);
          });

        case 3:
          dump = _context9.sent;
          strDump = (0, _jsonStableStringifyWithoutJsonify.default)(dump);
          _context9.next = 7;
          return (0, _effects.call)(success, strDump);

        case 7:
        case "end":
          return _context9.stop();
      }
    }
  }, _marked9, this);
}

function taskReloadStateEventSaga(_ref19) {
  var _ref19$payload, state, success, error, _ref20, taskStateLoaded, taskRefresh;

  return _regenerator.default.wrap(function taskReloadStateEventSaga$(_context10) {
    while (1) {
      switch (_context10.prev = _context10.next) {
        case 0:
          _ref19$payload = _ref19.payload, state = _ref19$payload.state, success = _ref19$payload.success, error = _ref19$payload.error;
          _context10.next = 3;
          return (0, _effects.select)(function (_ref21) {
            var actions = _ref21.actions;
            return actions;
          });

        case 3:
          _ref20 = _context10.sent;
          taskStateLoaded = _ref20.taskStateLoaded;
          taskRefresh = _ref20.taskRefresh;
          _context10.prev = 6;

          if (!state) {
            _context10.next = 12;
            break;
          }

          _context10.next = 10;
          return (0, _effects.put)({
            type: taskStateLoaded,
            payload: {
              dump: JSON.parse(state)
            }
          });

        case 10:
          _context10.next = 12;
          return (0, _effects.put)({
            type: taskRefresh
          });

        case 12:
          _context10.next = 14;
          return (0, _effects.call)(success);

        case 14:
          _context10.next = 20;
          break;

        case 16:
          _context10.prev = 16;
          _context10.t0 = _context10["catch"](6);
          _context10.next = 20;
          return (0, _effects.call)(error, "bad state: ".concat(_context10.t0.message));

        case 20:
        case "end":
          return _context10.stop();
      }
    }
  }, _marked10, this, [[6, 16]]);
}

function taskLoadEventSaga(_ref22) {
  var _ref22$payload, _views, success, error, _ref23, taskDataLoaded, taskInit, _ref25, taskToken, serverApi, taskData;

  return _regenerator.default.wrap(function taskLoadEventSaga$(_context11) {
    while (1) {
      switch (_context11.prev = _context11.next) {
        case 0:
          _ref22$payload = _ref22.payload, _views = _ref22$payload.views, success = _ref22$payload.success, error = _ref22$payload.error;
          _context11.next = 3;
          return (0, _effects.select)(function (_ref24) {
            var actions = _ref24.actions;
            return actions;
          });

        case 3:
          _ref23 = _context11.sent;
          taskDataLoaded = _ref23.taskDataLoaded;
          taskInit = _ref23.taskInit;
          _context11.prev = 6;
          _context11.next = 9;
          return (0, _effects.select)(function (state) {
            return state;
          });

        case 9:
          _ref25 = _context11.sent;
          taskToken = _ref25.taskToken;
          serverApi = _ref25.serverApi;
          _context11.next = 14;
          return (0, _effects.call)(serverApi, 'tasks', 'taskData', {
            task: taskToken
          });

        case 14:
          taskData = _context11.sent;
          _context11.next = 17;
          return (0, _effects.put)({
            type: taskDataLoaded,
            payload: {
              taskData: taskData
            }
          });

        case 17:
          _context11.next = 19;
          return (0, _effects.put)({
            type: taskInit
          });

        case 19:
          _context11.next = 21;
          return (0, _effects.call)(success);

        case 21:
          _context11.next = 27;
          break;

        case 23:
          _context11.prev = 23;
          _context11.t0 = _context11["catch"](6);
          _context11.next = 27;
          return (0, _effects.call)(error, _context11.t0.toString());

        case 27:
        case "end":
          return _context11.stop();
      }
    }
  }, _marked11, this, [[6, 23]]);
}

function taskGradeAnswerEventSaga(_ref26) {
  var _ref26$payload, answer, answerToken, success, error, _ref27, taskAnswerGraded, result, _ref29, taskToken, getTaskParams, serverApi, _ref30, minScore, maxScore, noScore, _ref31, score, message, scoreToken;

  return _regenerator.default.wrap(function taskGradeAnswerEventSaga$(_context12) {
    while (1) {
      switch (_context12.prev = _context12.next) {
        case 0:
          _ref26$payload = _ref26.payload, answer = _ref26$payload.answer, answerToken = _ref26$payload.answerToken, success = _ref26$payload.success, error = _ref26$payload.error;
          _context12.next = 3;
          return (0, _effects.select)(function (_ref28) {
            var actions = _ref28.actions;
            return actions;
          });

        case 3:
          _ref27 = _context12.sent;
          taskAnswerGraded = _ref27.taskAnswerGraded;
          _context12.prev = 5;
          _context12.next = 8;
          return (0, _effects.select)(function (state) {
            return state;
          });

        case 8:
          _ref29 = _context12.sent;
          taskToken = _ref29.taskToken;
          getTaskParams = _ref29.platformApi.getTaskParams;
          serverApi = _ref29.serverApi;
          _context12.next = 14;
          return (0, _effects.call)(getTaskParams, null, null);

        case 14:
          _ref30 = _context12.sent;
          minScore = _ref30.minScore;
          maxScore = _ref30.maxScore;
          noScore = _ref30.noScore;
          _context12.next = 20;
          return (0, _effects.call)(serverApi, 'tasks', 'gradeAnswer', {
            task: taskToken,

            /* XXX task should be named taskToken */
            answer: answerToken,

            /* XXX answer should be named answerToken */
            min_score: minScore,

            /* XXX no real point passing min_score, max_score, no_score to server-side grader */
            max_score: maxScore,
            no_score: noScore
          });

        case 20:
          _ref31 = _context12.sent;
          score = _ref31.score;
          message = _ref31.message;
          scoreToken = _ref31.token;
          _context12.next = 26;
          return (0, _effects.put)({
            type: taskAnswerGraded,
            payload: {
              grading: {
                score: score,
                message: message
              }
            }
          });

        case 26:
          _context12.next = 28;
          return (0, _effects.call)(success, score, message, scoreToken);

        case 28:
          _context12.next = 36;
          break;

        case 30:
          _context12.prev = 30;
          _context12.t0 = _context12["catch"](5);
          _context12.next = 34;
          return (0, _effects.put)({
            type: taskAnswerGraded,
            payload: {
              grading: {
                error: _context12.t0.toString()
              }
            }
          });

        case 34:
          _context12.next = 36;
          return (0, _effects.call)(error, _context12.t0.toString());

        case 36:
        case "end":
          return _context12.stop();
      }
    }
  }, _marked12, this, [[5, 30]]);
}

function taskAnswerGradedReducer(state, _ref32) {
  var grading = _ref32.payload.grading;
  return (0, _objectSpread2.default)({}, state, {
    grading: grading
  });
}

var _default = {
  actions: {
    taskInit: 'Task.Init',
    taskRefresh: 'Task.Refresh',
    taskLoadEvent: 'Task.Event.Load'
    /* {views, success, error} */
    ,
    taskUnloadEvent: 'Task.Event.Unload'
    /* {success, error} */
    ,
    taskUpdateTokenEvent: 'Task.Event.UpdateToken'
    /* {token, success, error} */
    ,
    taskGetHeightEvent: 'Task.Event.GetHeight'
    /* {success, error} */
    ,
    taskGetMetaDataEvent: 'Task.Event.GetMetaData'
    /* {success, error} */
    ,
    taskGetViewsEvent: 'Task.Event.GetViews'
    /* {success, error} */
    ,
    taskShowViewsEvent: 'Task.Event.ShowViews'
    /* {views, success, error} */
    ,
    taskGetStateEvent: 'Task.Event.GetState'
    /* {success, error} */
    ,
    taskReloadStateEvent: 'Task.Event.ReloadState'
    /* {state, success, error} */
    ,
    taskGetAnswerEvent: 'Task.Event.GetAnswer'
    /* {success, error} */
    ,
    taskReloadAnswerEvent: 'Task.Event.ReloadAnswer'
    /* {answer, success, error} */
    ,
    taskGradeAnswerEvent: 'Task.Event.GradeAnswer'
    /* {answer, answerToken, success, error} */
    ,
    taskDataLoaded: 'Task.Data.Loaded',
    taskStateLoaded: 'Task.State.Loaded',
    taskAnswerLoaded: 'Task.Answer.Loaded',
    taskAnswerGraded: 'Task.Answer.Graded'
  },
  actionReducers: {
    appInit: appInitReducer,
    taskShowViewsEvent: taskShowViewsEventReducer,
    taskUpdateTokenEvent: taskUpdateTokenEventReducer,
    taskDataLoaded: taskDataLoadedReducer,
    taskStateLoaded: taskStateLoadedReducer,
    taskAnswerLoaded: taskAnswerLoadedReducer,
    taskAnswerGraded: taskAnswerGradedReducer
  },
  saga:
  /*#__PURE__*/
  _regenerator.default.mark(function saga() {
    var actions;
    return _regenerator.default.wrap(function saga$(_context13) {
      while (1) {
        switch (_context13.prev = _context13.next) {
          case 0:
            _context13.next = 2;
            return (0, _effects.select)(function (_ref33) {
              var actions = _ref33.actions;
              return actions;
            });

          case 2:
            actions = _context13.sent;
            _context13.next = 5;
            return (0, _effects.takeEvery)(actions.taskShowViewsEvent, taskShowViewsEventSaga);

          case 5:
            _context13.next = 7;
            return (0, _effects.takeEvery)(actions.taskGetViewsEvent, taskGetViewsEventSaga);

          case 7:
            _context13.next = 9;
            return (0, _effects.takeEvery)(actions.taskUpdateTokenEvent, taskUpdateTokenEventSaga);

          case 9:
            _context13.next = 11;
            return (0, _effects.takeEvery)(actions.taskGetHeightEvent, taskGetHeightEventSaga);

          case 11:
            _context13.next = 13;
            return (0, _effects.takeEvery)(actions.taskUnloadEvent, taskUnloadEventSaga);

          case 13:
            _context13.next = 15;
            return (0, _effects.takeEvery)(actions.taskGetStateEvent, taskGetStateEventSaga);

          case 15:
            _context13.next = 17;
            return (0, _effects.takeEvery)(actions.taskGetMetaDataEvent, taskGetMetaDataEventSaga);

          case 17:
            _context13.next = 19;
            return (0, _effects.takeEvery)(actions.taskReloadAnswerEvent, taskReloadAnswerEventSaga);

          case 19:
            _context13.next = 21;
            return (0, _effects.takeEvery)(actions.taskReloadStateEvent, taskReloadStateEventSaga);

          case 21:
            _context13.next = 23;
            return (0, _effects.takeEvery)(actions.taskGetAnswerEvent, taskGetAnswerEventSaga);

          case 23:
            _context13.next = 25;
            return (0, _effects.takeEvery)(actions.taskLoadEvent, taskLoadEventSaga);

          case 25:
            _context13.next = 27;
            return (0, _effects.takeEvery)(actions.taskGradeAnswerEvent, taskGradeAnswerEventSaga);

          case 27:
          case "end":
            return _context13.stop();
        }
      }
    }, saga, this);
  })
};
exports.default = _default;

/***/ }),

/***/ 550:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireDefault = __webpack_require__(10);

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _classCallCheck2 = _interopRequireDefault(__webpack_require__(39));

var _createClass2 = _interopRequireDefault(__webpack_require__(40));

var _possibleConstructorReturn2 = _interopRequireDefault(__webpack_require__(41));

var _getPrototypeOf3 = _interopRequireDefault(__webpack_require__(43));

var _inherits2 = _interopRequireDefault(__webpack_require__(44));

var _assertThisInitialized2 = _interopRequireDefault(__webpack_require__(42));

var _defineProperty2 = _interopRequireDefault(__webpack_require__(33));

var _regenerator = _interopRequireDefault(__webpack_require__(48));

var _objectSpread2 = _interopRequireDefault(__webpack_require__(22));

var _react = _interopRequireDefault(__webpack_require__(0));

var _reactBootstrap = __webpack_require__(74);

var _reactRedux = __webpack_require__(35);

var _effects = __webpack_require__(38);

var _immutabilityHelper = _interopRequireDefault(__webpack_require__(68));

var _marked =
/*#__PURE__*/
_regenerator.default.mark(requestHintSaga);

function hintRequestFulfilledReducer(state, _action) {
  return (0, _objectSpread2.default)({}, state, {
    hintRequest: {
      success: true
    }
  });
}

function hintRequestRejectedReducer(state, _ref) {
  var _ref$payload = _ref.payload,
      code = _ref$payload.code,
      error = _ref$payload.error;
  return (0, _objectSpread2.default)({}, state, {
    hintRequest: {
      success: false,
      code: code,
      error: error
    }
  });
}

function hintRequestFeedbackClearedReducer(state, _action) {
  return (0, _objectSpread2.default)({}, state, {
    hintRequest: false
  });
}

function requestHintSaga(_ref2) {
  var request, actions, code, _ref4, _actions, initialTaskToken, serverApi, _ref5, askHint, _ref6, hintToken, updatedTaskToken, taskData;

  return _regenerator.default.wrap(function requestHintSaga$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          request = _ref2.payload.request;
          _context.next = 3;
          return (0, _effects.select)(function (_ref3) {
            var actions = _ref3.actions;
            return actions;
          });

        case 3:
          actions = _context.sent;
          code = 0;
          _context.prev = 5;
          _context.next = 8;
          return (0, _effects.select)(function (state) {
            return state;
          });

        case 8:
          _ref4 = _context.sent;
          _actions = _ref4.actions;
          initialTaskToken = _ref4.taskToken;
          serverApi = _ref4.serverApi;
          code = 10;
          _context.next = 15;
          return (0, _effects.select)(function (state) {
            return state.platformApi;
          });

        case 15:
          _ref5 = _context.sent;
          askHint = _ref5.askHint;
          code = 20;
          /* Contact serverApi to obtain a hintToken for the requested hint. */

          _context.next = 20;
          return (0, _effects.call)(serverApi, 'tasks', 'requestHint', {
            task: initialTaskToken,
            request: request
          });

        case 20:
          _ref6 = _context.sent;
          hintToken = _ref6.hintToken;
          code = 30;
          /* Contact the platform to authorize the hint request. */

          _context.next = 25;
          return (0, _effects.call)(askHint, hintToken);

        case 25:
          code = 40;
          /* When askHint returns an updated taskToken is obtained from the store. */

          _context.next = 28;
          return (0, _effects.select)(function (state) {
            return state.taskToken;
          });

        case 28:
          updatedTaskToken = _context.sent;
          code = 50;
          /* Finally, contact the serverApi to obtain the updated taskData. */

          _context.next = 32;
          return (0, _effects.call)(serverApi, 'tasks', 'taskData', {
            task: updatedTaskToken
          });

        case 32:
          taskData = _context.sent;
          code = 60;
          _context.next = 36;
          return (0, _effects.put)({
            type: _actions.taskDataLoaded,
            payload: {
              taskData: taskData
            }
          });

        case 36:
          _context.next = 38;
          return (0, _effects.put)({
            type: _actions.taskRefresh
          });

        case 38:
          _context.next = 40;
          return (0, _effects.put)({
            type: _actions.hintRequestFulfilled,
            payload: {}
          });

        case 40:
          _context.next = 46;
          break;

        case 42:
          _context.prev = 42;
          _context.t0 = _context["catch"](5);
          _context.next = 46;
          return (0, _effects.put)({
            type: actions.hintRequestRejected,
            payload: {
              code: code,
              error: _context.t0
            }
          });

        case 46:
        case "end":
          return _context.stop();
      }
    }
  }, _marked, this, [[5, 42]]);
}

function HintRequestFeedbackSelector(state) {
  var actions = state.actions,
      hintRequest = state.hintRequest;
  if (!hintRequest) return {};
  var hintRequestFeedbackCleared = actions.hintRequestFeedbackCleared;
  var success = hintRequest.success,
      code = hintRequest.code,
      error = hintRequest.error;
  return {
    visible: true,
    success: success,
    code: code,
    error: error,
    hintRequestFeedbackCleared: hintRequestFeedbackCleared
  };
}

var HintRequestFeedback =
/*#__PURE__*/
function (_React$PureComponent) {
  (0, _inherits2.default)(HintRequestFeedback, _React$PureComponent);

  function HintRequestFeedback() {
    var _getPrototypeOf2;

    var _this;

    (0, _classCallCheck2.default)(this, HintRequestFeedback);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = (0, _possibleConstructorReturn2.default)(this, (_getPrototypeOf2 = (0, _getPrototypeOf3.default)(HintRequestFeedback)).call.apply(_getPrototypeOf2, [this].concat(args)));
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)), "handleDismiss", function () {
      _this.props.dispatch({
        type: _this.props.hintRequestFeedbackCleared,
        payload: {}
      });
    });
    return _this;
  }

  (0, _createClass2.default)(HintRequestFeedback, [{
    key: "render",
    value: function render() {
      var _this$props = this.props,
          visible = _this$props.visible,
          success = _this$props.success;
      if (!visible) return false;

      if (success) {
        return _react.default.createElement(_reactBootstrap.Alert, {
          bsStyle: "success",
          onDismiss: this.handleDismiss
        }, _react.default.createElement("p", null, "L'indice demandé a été délivré."));
      } else {
        var _this$props2 = this.props,
            code = _this$props2.code,
            error = _this$props2.error;
        return _react.default.createElement(_reactBootstrap.Alert, {
          bsStyle: "danger",
          onDismiss: this.handleDismiss
        }, _react.default.createElement("p", null, "L'indice demandé n'a pas pu être délivré."), _react.default.createElement("p", null, "Code ", code), error.status && _react.default.createElement("p", null, "Erreur serveur ", error.status), error.message && _react.default.createElement("p", null, error.toString()));
      }
    }
  }]);
  return HintRequestFeedback;
}(_react.default.PureComponent);

var _default = {
  actions: {
    requestHint: 'Hint.Request',
    hintRequestFulfilled: 'Hint.Request.Fulfilled',
    hintRequestRejected: 'Hint.Request.Rejected',
    hintRequestFeedbackCleared: 'Hint.Request.FeedbackCleared'
  },
  actionReducers: {
    hintRequestFulfilled: hintRequestFulfilledReducer,
    hintRequestRejected: hintRequestRejectedReducer,
    hintRequestFeedbackCleared: hintRequestFeedbackClearedReducer
  },
  views: {
    HintRequestFeedback: (0, _reactRedux.connect)(HintRequestFeedbackSelector)(HintRequestFeedback)
  },
  saga:
  /*#__PURE__*/
  _regenerator.default.mark(function hintsSaga() {
    var actions;
    return _regenerator.default.wrap(function hintsSaga$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.next = 2;
            return (0, _effects.select)(function (_ref7) {
              var actions = _ref7.actions;
              return actions;
            });

          case 2:
            actions = _context2.sent;
            _context2.next = 5;
            return (0, _effects.takeEvery)(actions.requestHint, requestHintSaga);

          case 5:
          case "end":
            return _context2.stop();
        }
      }
    }, hintsSaga, this);
  })
};
exports.default = _default;

/***/ }),

/***/ 551:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireDefault = __webpack_require__(10);

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.windowHeightMonitorSaga = windowHeightMonitorSaga;

var _regenerator = _interopRequireDefault(__webpack_require__(48));

var _effects = __webpack_require__(38);

var _reduxSaga = __webpack_require__(92);

var _marked =
/*#__PURE__*/
_regenerator.default.mark(windowHeightMonitorSaga);

function windowHeightMonitorSaga(platformApi) {
  var channel, lastHeight, _ref, height;

  return _regenerator.default.wrap(function windowHeightMonitorSaga$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          channel = (0, _reduxSaga.eventChannel)(function (emit) {
            function onResize() {
              var height = window.document.body.clientHeight;
              emit({
                height: height
              });
            }

            window.addEventListener('resize', onResize);
            return function () {
              window.removeEventListener('resize', onResize);
            };
          }, _reduxSaga.buffers.sliding(1));
          _context.prev = 1;

        case 2:
          if (false) {
            _context.next = 13;
            break;
          }

          _context.next = 5;
          return (0, _effects.take)(channel);

        case 5:
          _ref = _context.sent;
          height = _ref.height;

          if (!(height !== lastHeight)) {
            _context.next = 11;
            break;
          }

          _context.next = 10;
          return (0, _effects.call)(platformApi.updateDisplay, {
            height: height
          });

        case 10:
          lastHeight = height;

        case 11:
          _context.next = 2;
          break;

        case 13:
          _context.prev = 13;
          channel.close();
          return _context.finish(13);

        case 16:
        case "end":
          return _context.stop();
      }
    }
  }, _marked, this, [[1,, 13, 16]]);
}

/***/ }),

/***/ 566:
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(567);
if(typeof content === 'string') content = [[module.i, content, '']];
// Prepare cssTransformation
var transform;

var options = {"sourceMap":true,"hmr":true}
options.transform = transform
// add the styles to the DOM
var update = __webpack_require__(95)(content, options);
if(content.locals) module.exports = content.locals;
// Hot Module Replacement
if(false) {
	// When the styles change, update the <style> tags
	if(!content.locals) {
		module.hot.accept("!!../node_modules/css-loader/index.js??ref--1-1!./style.css", function() {
			var newContent = require("!!../node_modules/css-loader/index.js??ref--1-1!./style.css");
			if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
			update(newContent);
		});
	}
	// When the module is disposed, remove the <style> tags
	module.hot.dispose(function() { update(); });
}

/***/ }),

/***/ 567:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(94)(false);
// imports


// module
exports.push([module.i, "#container {\n    user-select: none;\n    -moz-user-select: none;\n    -webkit-user-select: none;\n    -ms-user-select: none;\n\twidth: 800px;\n}\n.taskInstructions {\n    text-align: justify;\n}\n.taskInstructions table.pre {\n    margin: 10px auto;\n}\n.taskInstructions table.pre td {\n    padding: 4px 10px;\n}\n.taskInstructions .list-unstyled {\n    padding-left: 30px;\n}\n.text-bold {\n    font-weight: bold;\n}\n.taskWrapper .taskInstructions {\n    padding-top: 30px;\n    position: relative;\n}\n.topPlainWordContainer {\n    margin: 10px 20px;\n    height: 34px;\n}\n.topPlainWord {\n    font-family: Lucida Console,Monaco,monospace;\n    font-size: 18px;\n    display: inline-block;\n    margin-right: 20px;\n    background-color: #fff;\n    border: 1px solid #777;\n    box-shadow: 3px 2px 3px #ccc;\n    line-height: 27px;\n    letter-spacing: 10px;\n    padding-left: 5px;\n}\n.hintsDialog {\n  width: 50%;\n  max-width: 400px;\n  background: #f0f0f0;\n  border: 1px solid black;\n  border-radius: 3px;\n  padding: 5px;\n  position: absolute;\n  bottom: 15px;\n  right: 15px;\n  z-index: 1;\n}\n.hintsDialog p {\n    margin-bottom: 5px;\n}\n.hintsDialog button + button {\n    margin-left: 10px;\n}\n.keyTable {\n    margin-top: 10px;\n}\n.keyTable span {\n    width: 20px;\n    display: inline-block;\n    margin-right: 2px;\n    text-align: center;\n}\n.keyTable span button {\n    padding: 0;\n    width: 100%;\n    border: none;\n}\n.keyTable .keyValue {\n    border: 1px solid #ccc;\n    border-radius: 4px;\n    cursor: pointer;\n}\n.keyTable .keyValue.is-hint {\n    border: none;\n    cursor: default;\n    font-weight: bold;\n}\n.keyTable .keyValue.is-hint-request {\n    background: #000;\n    color: #fff;\n    font-weight: bold;\n}\n.is-hint-mismatch {\n    background-color: #ff4444 !important;\n}\n\n.ciphersAndPlains {\n    font-family: Lucida Console,Monaco,monospace;\n    font-size: 18px;\n}\n.cipherTable {\n    margin-top: 20px;\n}\n.plainTable {\n    background: #efefef;\n}\n.ciphersAndPlains span {\n    width: 20px;\n    display: inline-block;\n    margin-right: 2px;\n    text-align: center;\n    border: 1px solid #ccc;\n    height: 27px;\n    vertical-align: bottom;\n}\n.cipherTable span {border-bottom: none;}\n.plainTable span {border-top: none;}\n.plainTable .plainChar {\n    background-color: #fff;\n    box-shadow: 3px 2px 3px #ccc;\n    border-top: 1px solid;\n    border-color: #777;\n    background-clip: content-box;\n}\n.plainChar + .plainChar {\n    margin-left: -4px;\n    border-left-color: transparent;\n    width: 24px;\n}\n.inputError {\n    border-color: red;\n    box-shadow: 0 0 3px red inset;\n}\n.selectText {\n    position: absolute;\n    cursor: pointer;\n}\n.selectTextInner {\n    background-color: #fff;\n    border: 1px solid #acacac;\n}\n.selectText.selected .selectTextInner {\n    background-color: #ccc;\n}\n.selectTextInner > span {\n    position: absolute;\n    text-align: center;\n}\n.selectText-rows .selectTextInner > span {\n    top: -1px;\n}\n.selectText-columns .selectTextInner > span {\n    left: -1px;\n}\n.taskHeader {\n\n}\n.submitBlock, .scoreBlock, .feedbackBlock, .saveBlock {\n    display: inline-block;\n    line-height: 34px;\n    margin: 0 10px 0 0;\n}\n.taskHeader > *:last-child {\n    margin: 0;\n}\n.scoreBlock, .feedbackBlock {\n    background: #f8f8f8;\n    padding: 0 8px;\n}\n.feedbackBlock {\n    cursor: pointer;\n}\n", ""]);

// exports


/***/ }),

/***/ 568:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireDefault = __webpack_require__(10);

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _classCallCheck2 = _interopRequireDefault(__webpack_require__(39));

var _createClass2 = _interopRequireDefault(__webpack_require__(40));

var _possibleConstructorReturn2 = _interopRequireDefault(__webpack_require__(41));

var _getPrototypeOf3 = _interopRequireDefault(__webpack_require__(43));

var _inherits2 = _interopRequireDefault(__webpack_require__(44));

var _assertThisInitialized2 = _interopRequireDefault(__webpack_require__(42));

var _defineProperty2 = _interopRequireDefault(__webpack_require__(33));

var _objectSpread2 = _interopRequireDefault(__webpack_require__(22));

var _react = _interopRequireDefault(__webpack_require__(0));

var _reactRedux = __webpack_require__(35);

var _utils = __webpack_require__(82);

function appInitReducer(state, _action) {
  return (0, _objectSpread2.default)({}, state, {
    cipheredText: {
      cellWidth: 15,
      cellHeight: 18,
      scrollTop: 0,
      nbCells: 0
    }
  });
}

function taskInitReducer(state, _action) {
  var cipheredText = state.cipheredText,
      cipherText = state.taskData.cipherText;
  cipheredText = (0, _objectSpread2.default)({}, cipheredText, {
    cells: cipherText,
    nbCells: cipherText.length
  });
  cipheredText = (0, _utils.updateGridVisibleRows)(cipheredText);
  return (0, _objectSpread2.default)({}, state, {
    cipheredText: cipheredText
  });
}

function cipheredTextResizedReducer(state, _ref) {
  var width = _ref.payload.width;
  var cipheredText = state.cipheredText;
  cipheredText = (0, _objectSpread2.default)({}, cipheredText, {
    width: width,
    height: 8 * cipheredText.cellHeight
  });
  cipheredText = (0, _utils.updateGridGeometry)(cipheredText);
  cipheredText = (0, _utils.updateGridVisibleRows)(cipheredText);
  return (0, _objectSpread2.default)({}, state, {
    cipheredText: cipheredText
  });
}

function cipheredTextScrolledReducer(state, _ref2) {
  var scrollTop = _ref2.payload.scrollTop;
  var cipheredText = state.cipheredText;
  cipheredText = (0, _objectSpread2.default)({}, cipheredText, {
    scrollTop: scrollTop
  });
  cipheredText = (0, _utils.updateGridVisibleRows)(cipheredText);
  return (0, _objectSpread2.default)({}, state, {
    cipheredText: cipheredText
  });
}

function CipherTextViewSelector(state) {
  var actions = state.actions,
      cipheredText = state.cipheredText;
  var cipheredTextResized = actions.cipheredTextResized,
      cipheredTextScrolled = actions.cipheredTextScrolled;
  var width = cipheredText.width,
      height = cipheredText.height,
      cellWidth = cipheredText.cellWidth,
      cellHeight = cipheredText.cellHeight,
      bottom = cipheredText.bottom,
      pageRows = cipheredText.pageRows,
      pageColumns = cipheredText.pageColumns,
      visible = cipheredText.visible;
  return {
    cipheredTextResized: cipheredTextResized,
    cipheredTextScrolled: cipheredTextScrolled,
    width: width,
    height: height,
    visibleRows: visible.rows,
    cellWidth: cellWidth,
    cellHeight: cellHeight,
    bottom: bottom,
    pageRows: pageRows,
    pageColumns: pageColumns
  };
}

var CipherTextView =
/*#__PURE__*/
function (_React$PureComponent) {
  (0, _inherits2.default)(CipherTextView, _React$PureComponent);

  function CipherTextView() {
    var _getPrototypeOf2;

    var _this;

    (0, _classCallCheck2.default)(this, CipherTextView);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = (0, _possibleConstructorReturn2.default)(this, (_getPrototypeOf2 = (0, _getPrototypeOf3.default)(CipherTextView)).call.apply(_getPrototypeOf2, [this].concat(args)));
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)), "refTextBox", function (element) {
      _this._textBox = element;
      var width = element.clientWidth;
      var height = element.clientHeight;

      _this.props.dispatch({
        type: _this.props.cipheredTextResized,
        payload: {
          width: width,
          height: height
        }
      });
    });
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)), "onScroll", function () {
      var scrollTop = _this._textBox.scrollTop;

      _this.props.dispatch({
        type: _this.props.cipheredTextScrolled,
        payload: {
          scrollTop: scrollTop
        }
      });
    });
    return _this;
  }

  (0, _createClass2.default)(CipherTextView, [{
    key: "render",
    value: function render() {
      var _this$props = this.props,
          width = _this$props.width,
          height = _this$props.height,
          visibleRows = _this$props.visibleRows,
          cellWidth = _this$props.cellWidth,
          cellHeight = _this$props.cellHeight,
          bottom = _this$props.bottom;
      return _react.default.createElement("div", null, _react.default.createElement("div", {
        ref: this.refTextBox,
        onScroll: this.onScroll,
        style: {
          position: 'relative',
          width: width && "".concat(width, "px"),
          height: height && "".concat(height, "px"),
          overflowY: 'scroll'
        }
      }, (visibleRows || []).map(function (_ref3) {
        var index = _ref3.index,
            columns = _ref3.columns;
        return _react.default.createElement("div", {
          key: index,
          style: {
            position: 'absolute',
            top: "".concat(index * cellHeight, "px")
          }
        }, columns.map(function (_ref4) {
          var index = _ref4.index,
              cell = _ref4.cell;
          return _react.default.createElement("span", {
            key: index,
            style: {
              position: 'absolute',
              left: "".concat(index * cellWidth, "px"),
              width: "".concat(cellWidth, "px"),
              height: "".concat(cellHeight, "px")
            }
          }, cell || ' ');
        }));
      }), _react.default.createElement("div", {
        style: {
          position: 'absolute',
          top: "".concat(bottom, "px"),
          width: '1px',
          height: '1px'
        }
      })));
    }
  }]);
  return CipherTextView;
}(_react.default.PureComponent);

var _default = {
  actions: {
    cipheredTextResized: 'CipheredText.Resized'
    /* {width: number, height: number} */
    ,
    cipheredTextScrolled: 'CipheredText.Scrolled'
    /* {scrollTop: number} */

  },
  actionReducers: {
    appInit: appInitReducer,
    taskInit: taskInitReducer,
    cipheredTextResized: cipheredTextResizedReducer,
    cipheredTextScrolled: cipheredTextScrolledReducer
  },
  views: {
    CipheredText: (0, _reactRedux.connect)(CipherTextViewSelector)(CipherTextView)
  }
};
exports.default = _default;

/***/ }),

/***/ 569:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireDefault = __webpack_require__(10);

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _classCallCheck2 = _interopRequireDefault(__webpack_require__(39));

var _createClass2 = _interopRequireDefault(__webpack_require__(40));

var _possibleConstructorReturn2 = _interopRequireDefault(__webpack_require__(41));

var _getPrototypeOf2 = _interopRequireDefault(__webpack_require__(43));

var _inherits2 = _interopRequireDefault(__webpack_require__(44));

var _slicedToArray2 = _interopRequireDefault(__webpack_require__(130));

var _objectSpread2 = _interopRequireDefault(__webpack_require__(22));

var _react = _interopRequireDefault(__webpack_require__(0));

var _reactRedux = __webpack_require__(35);

var _range = __webpack_require__(155);

var _seedrandom = _interopRequireDefault(__webpack_require__(570));

function appInitReducer(state, _action) {
  return (0, _objectSpread2.default)({}, state, {
    frequencyAnalysis: {}
  });
}

function frequencyAnalysisLateReducer(state) {
  if (state.frequencyAnalysis && state.taskData) {
    var _state = state,
        _state$taskData = _state.taskData,
        alphabet = _state$taskData.alphabet,
        referenceFrequencies = _state$taskData.referenceFrequencies,
        frequencies = _state$taskData.frequencies,
        cipherText = _state$taskData.cipherText,
        frequencyAnalysis = _state.frequencyAnalysis;
    var textFrequencies = [];

    if (cipherText && alphabet) {
      var freqMap = new Map(alphabet.split('').map(function (c) {
        return [c, 0];
      }));
      countSymbols(freqMap, cipherText, 0, cipherText.length - 1);
      textFrequencies = normalizeAndSortFrequencies(freqMap.entries());
    }

    frequencyAnalysis = (0, _objectSpread2.default)({}, frequencyAnalysis, {
      textFrequencies: textFrequencies
    });
    state = (0, _objectSpread2.default)({}, state, {
      frequencyAnalysis: frequencyAnalysis
    });
  }

  return state;
}

function countSymbols(map, text, startPos, endPos) {
  for (var pos = startPos; pos <= endPos; pos += 1) {
    countSymbol(map, text[pos]);
  }
}

function countSymbol(map, char) {
  var count = map.get(char);

  if (count !== undefined) {
    map.set(char, count + 1);
  }
}

function sumFrequencies(dst, add) {
  for (var i = 0; i < dst.length; i += 1) {
    dst[i] += add[i];
  }
}

function normalizeAndSortFrequencies(entries) {
  var result = Array.from(entries);
  var totalCount = result.reduce(function (a, x) {
    return a + x[1];
  }, 0);
  result.sort(function (s1, s2) {
    var p1 = s1[1],
        p2 = s2[1];
    return p1 > p2 ? -1 : p1 < p2 ? 1 : 0;
  });
  return result.map(function (_ref) {
    var _ref2 = (0, _slicedToArray2.default)(_ref, 2),
        symbol = _ref2[0],
        count = _ref2[1];

    return {
      symbol: symbol,
      proba: count / totalCount
    };
  });
}

function FrequencyAnalysisSelector(state) {
  var _state$taskData2 = state.taskData,
      alphabet = _state$taskData2.alphabet,
      referenceFrequencies = _state$taskData2.referenceFrequencies,
      textFrequencies = state.frequencyAnalysis.textFrequencies;
  var scale = 30 / referenceFrequencies.reduce(function (a, x) {
    return Math.max(a, x.proba);
  }, 0);
  return {
    alphabetSize: alphabet.length,
    referenceFrequencies: referenceFrequencies,
    textFrequencies: textFrequencies,
    scale: scale
  };
}

var FrequencyAnalysisView =
/*#__PURE__*/
function (_React$PureComponent) {
  (0, _inherits2.default)(FrequencyAnalysisView, _React$PureComponent);

  function FrequencyAnalysisView() {
    (0, _classCallCheck2.default)(this, FrequencyAnalysisView);
    return (0, _possibleConstructorReturn2.default)(this, (0, _getPrototypeOf2.default)(FrequencyAnalysisView).apply(this, arguments));
  }

  (0, _createClass2.default)(FrequencyAnalysisView, [{
    key: "render",
    value: function render() {
      var _this$props = this.props,
          alphabetSize = _this$props.alphabetSize,
          referenceFrequencies = _this$props.referenceFrequencies,
          textFrequencies = _this$props.textFrequencies,
          scale = _this$props.scale;
      if (!referenceFrequencies) return false;
      return _react.default.createElement("div", {
        className: "clearfix"
      }, _react.default.createElement("div", {
        style: {
          float: 'left',
          width: '100px',
          height: '108px',
          fontSize: '10px',
          lineHeight: '10px',
          position: 'relative'
        }
      }, _react.default.createElement("div", {
        style: {
          height: '30px',
          position: 'absolute',
          top: '0px'
        }
      }, "Fréquences dans le texte :"), _react.default.createElement("div", {
        style: {
          height: '20px',
          position: 'absolute',
          top: '32px'
        }
      }, "Symboles du texte :"), _react.default.createElement("div", {
        style: {
          height: '20px',
          position: 'absolute',
          top: '56px'
        }
      }, "Substitutions :"), _react.default.createElement("div", {
        style: {
          height: '30px',
          position: 'absolute',
          top: '78px'
        }
      }, "Fréquences en français :")), (0, _range.range)(0, alphabetSize).map(function (index) {
        return _react.default.createElement("div", {
          key: index,
          style: {
            float: 'left',
            width: '20px',
            height: '108px',
            position: 'relative'
          }
        }, _react.default.createElement(TextFrequencyBox, {
          index: index,
          cell: textFrequencies[index],
          scale: scale
        }), _react.default.createElement(ReferenceFrequencyBox, {
          index: index,
          cell: referenceFrequencies[index],
          scale: scale
        }));
      }));
    }
  }]);
  return FrequencyAnalysisView;
}(_react.default.PureComponent);

var TextFrequencyBox =
/*#__PURE__*/
function (_React$PureComponent2) {
  (0, _inherits2.default)(TextFrequencyBox, _React$PureComponent2);

  function TextFrequencyBox() {
    (0, _classCallCheck2.default)(this, TextFrequencyBox);
    return (0, _possibleConstructorReturn2.default)(this, (0, _getPrototypeOf2.default)(TextFrequencyBox).apply(this, arguments));
  }

  (0, _createClass2.default)(TextFrequencyBox, [{
    key: "render",
    value: function render() {
      var _this$props2 = this.props,
          cell = _this$props2.cell,
          scale = _this$props2.scale;
      if (!cell) return false;
      return _react.default.createElement("div", {
        style: {
          position: 'absolute',
          top: '0px'
        }
      }, _react.default.createElement("div", {
        style: {
          width: '20px',
          height: '30px',
          display: 'table-cell',
          verticalAlign: 'bottom'
        }
      }, _react.default.createElement("div", {
        style: {
          height: "".concat(Math.min(30, Math.round(cell.proba * scale)), "px"),
          width: '8px',
          marginLeft: '5px',
          background: 'black'
        }
      })), _react.default.createElement("div", {
        style: {
          width: '17px',
          height: '20px',
          border: '1px solid white',
          marginBottom: '2px',
          textAlign: 'center'
        }
      }, cell.symbol));
    }
  }]);
  return TextFrequencyBox;
}(_react.default.PureComponent);

var ReferenceFrequencyBox =
/*#__PURE__*/
function (_React$PureComponent3) {
  (0, _inherits2.default)(ReferenceFrequencyBox, _React$PureComponent3);

  function ReferenceFrequencyBox() {
    (0, _classCallCheck2.default)(this, ReferenceFrequencyBox);
    return (0, _possibleConstructorReturn2.default)(this, (0, _getPrototypeOf2.default)(ReferenceFrequencyBox).apply(this, arguments));
  }

  (0, _createClass2.default)(ReferenceFrequencyBox, [{
    key: "render",
    value: function render() {
      var _this$props3 = this.props,
          cell = _this$props3.cell,
          scale = _this$props3.scale;
      return _react.default.createElement("div", {
        style: {
          position: 'absolute',
          top: '56px'
        }
      }, _react.default.createElement("div", {
        style: {
          width: '17px',
          height: '20px',
          border: '1px solid black',
          marginBottom: '2px',
          textAlign: 'center'
        }
      }, cell.symbol), _react.default.createElement("div", {
        style: {
          width: '20px',
          height: '30px',
          verticalAlign: 'top'
        }
      }, _react.default.createElement("div", {
        style: {
          height: "".concat(Math.round(cell.proba * scale), "px"),
          width: '8px',
          marginLeft: '5px',
          background: 'black'
        }
      })));
    }
  }]);
  return ReferenceFrequencyBox;
}(_react.default.PureComponent);

var _default = {
  actionReducers: {
    appInit: appInitReducer
  },
  lateReducer: frequencyAnalysisLateReducer,
  views: {
    FrequencyAnalysis: (0, _reactRedux.connect)(FrequencyAnalysisSelector)(FrequencyAnalysisView)
  }
};
exports.default = _default;

/***/ }),

/***/ 578:
/***/ (function(module, exports) {

/* (ignored) */

/***/ }),

/***/ 579:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireDefault = __webpack_require__(10);

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _classCallCheck2 = _interopRequireDefault(__webpack_require__(39));

var _createClass2 = _interopRequireDefault(__webpack_require__(40));

var _possibleConstructorReturn2 = _interopRequireDefault(__webpack_require__(41));

var _getPrototypeOf3 = _interopRequireDefault(__webpack_require__(43));

var _inherits2 = _interopRequireDefault(__webpack_require__(44));

var _assertThisInitialized2 = _interopRequireDefault(__webpack_require__(42));

var _defineProperty2 = _interopRequireDefault(__webpack_require__(33));

var _regenerator = _interopRequireDefault(__webpack_require__(48));

var _objectSpread2 = _interopRequireDefault(__webpack_require__(22));

var _react = _interopRequireDefault(__webpack_require__(0));

var _reactRedux = __webpack_require__(35);

var _reactBootstrap = __webpack_require__(74);

var _immutabilityHelper = _interopRequireDefault(__webpack_require__(68));

var _reduxSaga = __webpack_require__(92);

var _effects = __webpack_require__(38);

var _utils = __webpack_require__(82);

var _marked =
/*#__PURE__*/
_regenerator.default.mark(schedulingSaga);

function appInitReducer(state, _action) {
  return (0, _objectSpread2.default)({}, state, {
    scheduling: {
      status: 'start',
      speed: 1.0,
      position: 0,
      shifts: [],
      startPosition: 0,
      endPosition: 0,
      currentTrace: []
    }
  });
}

function taskInitReducer(state, _action) {
  var scheduling = state.scheduling,
      cipherText = state.taskData.cipherText;
  scheduling = (0, _objectSpread2.default)({}, scheduling, {
    endPosition: cipherText.length - 1
  });
  return (0, _objectSpread2.default)({}, state, {
    scheduling: scheduling
  });
}

function schedulingStatusChangedReducer(state, _ref) {
  var status = _ref.payload.status;
  var scheduling = state.scheduling;
  var changes = {
    status: {
      $set: status
    }
  };

  if (status === 'start') {
    changes.position = {
      $set: scheduling.startPosition
    };
  } else if (status === 'end') {
    changes.position = {
      $set: scheduling.endPosition
    };
  } else if (status === 'play') {
    if (scheduling.position === scheduling.endPosition) {
      changes.position = {
        $set: scheduling.startPosition
      };
    }
  }

  return (0, _immutabilityHelper.default)(state, {
    scheduling: changes
  });
}

function schedulingStepBackwardReducer(state, _action) {
  var position = state.scheduling.position;
  if (position === 0) return state;
  return (0, _immutabilityHelper.default)(state, {
    scheduling: {
      status: {
        $set: 'pause'
      },
      position: {
        $set: position - 1
      }
    }
  });
}

function schedulingStepForwardReducer(state, _action) {
  var _state$scheduling = state.scheduling,
      position = _state$scheduling.position,
      endPosition = _state$scheduling.endPosition;
  if (position === endPosition) return state;
  return (0, _immutabilityHelper.default)(state, {
    scheduling: {
      status: {
        $set: 'pause'
      },
      position: {
        $set: position + 1
      }
    }
  });
}

function schedulingJumpReducer(state, _ref2) {
  var position = _ref2.payload.position;
  return (0, _immutabilityHelper.default)(state, {
    scheduling: {
      status: {
        $set: 'pause'
      },
      position: {
        $set: position
      }
    }
  });
}

function schedulingTickReducer(state, _action) {
  var _state$scheduling2 = state.scheduling,
      position = _state$scheduling2.position,
      endPosition = _state$scheduling2.endPosition;

  if (position === endPosition) {
    return (0, _immutabilityHelper.default)(state, {
      scheduling: {
        status: {
          $set: 'end'
        }
      }
    });
  }

  return (0, _immutabilityHelper.default)(state, {
    scheduling: {
      position: {
        $set: position + 1
      }
    }
  });
}

function schedulingLateReducer(state) {
  var taskData = state.taskData,
      rotors = state.rotors,
      scheduling = state.scheduling;

  if (!taskData) {
    return state;
  }

  var alphabet = taskData.alphabet,
      cipherText = taskData.cipherText;
  var position = scheduling.position;
  /* Compute the rotor shifts at the current position */

  var shifts = rotors.map(function (rotor) {
    return (0, _utils.getRotorShift)(rotor, position);
  });
  var rank = alphabet.indexOf(cipherText[position]);
  /* Apply the rotors at the current position to obtain a trace (list of rotor
     cells used during decoding), to be highlighted by the rotor views. */

  var currentTrace = rank === -1 ? null : (0, _utils.applyRotors)(rotors, position, rank).trace;
  return (0, _immutabilityHelper.default)(state, {
    scheduling: {
      shifts: {
        $set: shifts
      },
      currentTrace: {
        $set: currentTrace
      }
    }
  });
}

function schedulingSaga() {
  var _ref3, schedulingTick, statusChangingActions;

  return _regenerator.default.wrap(function schedulingSaga$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.next = 2;
          return (0, _effects.select)(function (_ref4) {
            var actions = _ref4.actions;
            return actions;
          });

        case 2:
          _ref3 = _context2.sent;
          schedulingTick = _ref3.schedulingTick;
          _context2.next = 6;
          return (0, _effects.select)(function (_ref5) {
            var actions = _ref5.actions;
            return ['schedulingStatusChanged', 'schedulingStepBackward', 'schedulingStepForward', 'schedulingJump'].map(function (name) {
              return actions[name];
            });
          });

        case 6:
          statusChangingActions = _context2.sent;
          _context2.next = 9;
          return (0, _effects.takeLatest)(statusChangingActions,
          /*#__PURE__*/
          _regenerator.default.mark(function _callee() {
            var status;
            return _regenerator.default.wrap(function _callee$(_context) {
              while (1) {
                switch (_context.prev = _context.next) {
                  case 0:
                    _context.next = 2;
                    return (0, _effects.select)(function (_ref6) {
                      var status = _ref6.scheduling.status;
                      return status;
                    });

                  case 2:
                    status = _context.sent;

                    if (!(status === 'play')) {
                      _context.next = 16;
                      break;
                    }

                  case 4:
                    if (false) {
                      _context.next = 16;
                      break;
                    }

                    _context.next = 7;
                    return (0, _effects.put)({
                      type: schedulingTick
                    });

                  case 7:
                    _context.next = 9;
                    return (0, _effects.select)(function (_ref7) {
                      var status = _ref7.scheduling.status;
                      return status;
                    });

                  case 9:
                    status = _context.sent;

                    if (!('play' !== status)) {
                      _context.next = 12;
                      break;
                    }

                    return _context.abrupt("return");

                  case 12:
                    _context.next = 14;
                    return (0, _reduxSaga.delay)(1000);

                  case 14:
                    _context.next = 4;
                    break;

                  case 16:
                  case "end":
                    return _context.stop();
                }
              }
            }, _callee, this);
          }));

        case 9:
        case "end":
          return _context2.stop();
      }
    }
  }, _marked, this);
}

function SchedulingControlsSelector(state) {
  var actions = state.actions,
      alphabet = state.taskData.alphabet,
      status = state.scheduling.status;
  var schedulingStatusChanged = actions.schedulingStatusChanged,
      schedulingStepBackward = actions.schedulingStepBackward,
      schedulingStepForward = actions.schedulingStepForward;
  var alphabetSize = alphabet.length;
  return {
    schedulingStatusChanged: schedulingStatusChanged,
    schedulingStepBackward: schedulingStepBackward,
    schedulingStepForward: schedulingStepForward,
    status: status,
    alphabetSize: alphabetSize
  };
}

var SchedulingControlsView =
/*#__PURE__*/
function (_React$PureComponent) {
  (0, _inherits2.default)(SchedulingControlsView, _React$PureComponent);

  function SchedulingControlsView() {
    var _getPrototypeOf2;

    var _this;

    (0, _classCallCheck2.default)(this, SchedulingControlsView);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = (0, _possibleConstructorReturn2.default)(this, (_getPrototypeOf2 = (0, _getPrototypeOf3.default)(SchedulingControlsView)).call.apply(_getPrototypeOf2, [this].concat(args)));
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)), "onFastBackwardClicked", function (_event) {
      _this.props.dispatch({
        type: _this.props.schedulingStatusChanged,
        payload: {
          status: 'start'
        }
      });
    });
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)), "onStepBackwardClicked", function (_event) {
      _this.props.dispatch({
        type: _this.props.schedulingStepBackward
      });
    });
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)), "onPlayClicked", function (_event) {
      _this.props.dispatch({
        type: _this.props.schedulingStatusChanged,
        payload: {
          status: 'play'
        }
      });
    });
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)), "onStepForwardClicked", function (_event) {
      _this.props.dispatch({
        type: _this.props.schedulingStepForward
      });
    });
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)), "onFastForwardClicked", function (_event) {
      _this.props.dispatch({
        type: _this.props.schedulingStatusChanged,
        payload: {
          status: 'end'
        }
      });
    });
    return _this;
  }

  (0, _createClass2.default)(SchedulingControlsView, [{
    key: "render",
    value: function render() {
      var _this$props = this.props,
          alphabetSize = _this$props.alphabetSize,
          status = _this$props.status;
      return _react.default.createElement("div", {
        style: {
          width: "".concat(20 * alphabetSize, "px"),
          margin: '0 auto',
          textAlign: 'center'
        }
      }, _react.default.createElement("div", {
        className: "btn-group"
      }, _react.default.createElement(_reactBootstrap.Button, {
        onClick: this.onFastBackwardClicked,
        style: {
          width: '40px'
        },
        active: status === 'start'
      }, _react.default.createElement("i", {
        className: "fa fa-fast-backward"
      })), _react.default.createElement(_reactBootstrap.Button, {
        onClick: this.onStepBackwardClicked,
        style: {
          width: '40px'
        }
      }, _react.default.createElement("i", {
        className: "fa fa-step-backward"
      })), _react.default.createElement(_reactBootstrap.Button, {
        onClick: this.onPlayClicked,
        style: {
          width: '40px'
        },
        active: status === 'play'
      }, _react.default.createElement("i", {
        className: "fa fa-play"
      })), _react.default.createElement(_reactBootstrap.Button, {
        onClick: this.onStepForwardClicked,
        style: {
          width: '40px'
        }
      }, _react.default.createElement("i", {
        className: "fa fa-step-forward"
      })), _react.default.createElement(_reactBootstrap.Button, {
        onClick: this.onFastForwardClicked,
        style: {
          width: '40px'
        },
        active: status === 'end'
      }, _react.default.createElement("i", {
        className: "fa fa-fast-forward"
      }))));
    }
  }]);
  return SchedulingControlsView;
}(_react.default.PureComponent);

var _default = {
  actions: {
    schedulingStatusChanged: 'Scheduling.Status.Changed',
    schedulingStepBackward: 'Scheduling.StepBackward',
    schedulingStepForward: 'Scheduling.StepForward',
    schedulingJump: 'Scheduling.Jump',
    schedulingTick: 'Scheduling.Tick'
  },
  actionReducers: {
    appInit: appInitReducer,
    taskInit: taskInitReducer,
    schedulingStatusChanged: schedulingStatusChangedReducer,
    schedulingStepBackward: schedulingStepBackwardReducer,
    schedulingStepForward: schedulingStepForwardReducer,
    schedulingJump: schedulingJumpReducer,
    schedulingTick: schedulingTickReducer
  },
  lateReducer: schedulingLateReducer,
  saga: schedulingSaga,
  views: {
    SchedulingControls: (0, _reactRedux.connect)(SchedulingControlsSelector)(SchedulingControlsView)
  }
};
exports.default = _default;

/***/ }),

/***/ 580:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireDefault = __webpack_require__(10);

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _classCallCheck2 = _interopRequireDefault(__webpack_require__(39));

var _createClass2 = _interopRequireDefault(__webpack_require__(40));

var _possibleConstructorReturn2 = _interopRequireDefault(__webpack_require__(41));

var _getPrototypeOf4 = _interopRequireDefault(__webpack_require__(43));

var _inherits2 = _interopRequireDefault(__webpack_require__(44));

var _assertThisInitialized2 = _interopRequireDefault(__webpack_require__(42));

var _defineProperty2 = _interopRequireDefault(__webpack_require__(33));

var _objectSpread2 = _interopRequireDefault(__webpack_require__(22));

var _react = _interopRequireDefault(__webpack_require__(0));

var _reactRedux = __webpack_require__(35);

var _classnames = _interopRequireDefault(__webpack_require__(6));

var _range = __webpack_require__(155);

var _immutabilityHelper = _interopRequireDefault(__webpack_require__(68));

var _utils = __webpack_require__(82);

function appInitReducer(state, _action) {
  return (0, _objectSpread2.default)({}, state, {
    rotors: [],
    editing: {}
  });
}

function rotorCellEditStartedReducer(state, _ref) {
  var _ref$payload = _ref.payload,
      rotorIndex = _ref$payload.rotorIndex,
      cellRank = _ref$payload.cellRank;
  var alphabet = state.taskData.alphabet,
      rotors = state.rotors;
  rotorIndex = (0, _utils.wrapAround)(rotorIndex, rotors.length);
  cellRank = (0, _utils.wrapAround)(cellRank, alphabet.length);
  return (0, _immutabilityHelper.default)(state, {
    editing: {
      $set: {
        rotorIndex: rotorIndex,
        cellRank: cellRank
      }
    }
  });
}

function rotorCellEditMovedReducer(state, _ref2) {
  var _ref2$payload = _ref2.payload,
      rotorMove = _ref2$payload.rotorMove,
      cellMove = _ref2$payload.cellMove;
  var alphabet = state.taskData.alphabet,
      rotors = state.rotors,
      _state$editing = state.editing,
      rotorIndex = _state$editing.rotorIndex,
      cellRank = _state$editing.cellRank;
  var rotorStop = rotorIndex,
      cellStop = cellRank;
  if (rotorIndex === undefined || cellRank === undefined) return state;
  var cell;

  do {
    rotorIndex = (0, _utils.wrapAround)(rotorIndex + rotorMove, rotors.length);
    cellRank = (0, _utils.wrapAround)(cellRank + cellMove, alphabet.length);
    cell = rotors[rotorIndex].cells[cellRank];
    /* If we looped back to the starting point, the move is impossible. */

    if (rotorStop == rotorIndex || cellStop == cellRank) return state;
  } while (cell.hint || cell.locked);

  return (0, _immutabilityHelper.default)(state, {
    editing: {
      $set: {
        rotorIndex: rotorIndex,
        cellRank: cellRank
      }
    }
  });
}

function rotorCellEditCancelledReducer(state, _action) {
  return (0, _immutabilityHelper.default)(state, {
    editing: {
      $set: {}
    }
  });
}

function rotorCellCharChangedReducer(state, _ref3) {
  var _ref3$payload = _ref3.payload,
      rotorIndex = _ref3$payload.rotorIndex,
      rank = _ref3$payload.rank,
      symbol = _ref3$payload.symbol;
  var alphabet = state.taskData.alphabet,
      rotors = state.rotors;

  if (symbol.length !== 1 || -1 === alphabet.indexOf(symbol)) {
    symbol = null;
  }

  var rotor = (0, _utils.editRotorCell)(rotors[rotorIndex], rank, symbol);
  return (0, _immutabilityHelper.default)(state, {
    rotors: (0, _defineProperty2.default)({}, rotorIndex, {
      $set: rotor
    })
  });
}

function rotorCellLockChangedReducer(state, _ref4) {
  var _ref4$payload = _ref4.payload,
      rotorIndex = _ref4$payload.rotorIndex,
      rank = _ref4$payload.rank,
      isLocked = _ref4$payload.isLocked;
  var rotor = (0, _utils.lockRotorCell)(state.rotors[rotorIndex], rank, isLocked);
  return (0, _immutabilityHelper.default)(state, {
    rotors: (0, _defineProperty2.default)({}, rotorIndex, {
      $set: rotor
    })
  });
}

function rotorKeyLoadedReducer(state, _ref5) {
  var _ref5$payload = _ref5.payload,
      rotorIndex = _ref5$payload.rotorIndex,
      key = _ref5$payload.key;
  var alphabet = state.taskData.alphabet,
      rotors = state.rotors;
  var rotor = (0, _utils.updateRotorWithKey)(alphabet, rotors[rotorIndex], key);
  return (0, _immutabilityHelper.default)(state, {
    rotors: (0, _defineProperty2.default)({}, rotorIndex, {
      $set: rotor
    })
  });
}

function RotorSelector(state, _ref6) {
  var index = _ref6.index;
  var _state$actions = state.actions,
      rotorCellLockChanged = _state$actions.rotorCellLockChanged,
      rotorCellCharChanged = _state$actions.rotorCellCharChanged,
      rotorCellEditCancelled = _state$actions.rotorCellEditCancelled,
      rotorCellEditStarted = _state$actions.rotorCellEditStarted,
      rotorCellEditMoved = _state$actions.rotorCellEditMoved,
      rotors = state.rotors,
      _state$scheduling = state.scheduling,
      shifts = _state$scheduling.shifts,
      currentTrace = _state$scheduling.currentTrace,
      editing = state.editing;
  var _rotors$index = rotors[index],
      editableRow = _rotors$index.editableRow,
      cells = _rotors$index.cells;
  var shift = shifts[index];
  var activeRank = currentTrace[index] && currentTrace[index].rank;
  var editingRank = editing.rotorIndex === index ? editing.cellRank : null;
  return {
    rotorCellEditStarted: rotorCellEditStarted,
    rotorCellEditCancelled: rotorCellEditCancelled,
    rotorCellEditMoved: rotorCellEditMoved,
    rotorCellLockChanged: rotorCellLockChanged,
    rotorCellCharChanged: rotorCellCharChanged,
    editableRow: editableRow,
    cells: cells,
    shift: shift,
    editingRank: editingRank,
    activeRank: activeRank
  };
}

var RotorView =
/*#__PURE__*/
function (_React$PureComponent) {
  (0, _inherits2.default)(RotorView, _React$PureComponent);

  function RotorView() {
    var _getPrototypeOf2;

    var _this;

    (0, _classCallCheck2.default)(this, RotorView);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = (0, _possibleConstructorReturn2.default)(this, (_getPrototypeOf2 = (0, _getPrototypeOf4.default)(RotorView)).call.apply(_getPrototypeOf2, [this].concat(args)));
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)), "onEditingStarted", function (rank) {
      _this.props.dispatch({
        type: _this.props.rotorCellEditStarted,
        payload: {
          rotorIndex: _this.props.index,
          cellRank: rank
        }
      });
    });
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)), "onEditingCancelled", function () {
      _this.props.dispatch({
        type: _this.props.rotorCellEditCancelled
      });
    });
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)), "onChangeChar", function (rank, symbol) {
      symbol = symbol.toUpperCase();

      _this.props.dispatch({
        type: _this.props.rotorCellCharChanged,
        payload: {
          rotorIndex: _this.props.index,
          rank: rank,
          symbol: symbol
        }
      });
    });
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)), "onChangeLocked", function (rank, isLocked) {
      _this.props.dispatch({
        type: _this.props.rotorCellLockChanged,
        payload: {
          rotorIndex: _this.props.index,
          rank: rank,
          isLocked: isLocked
        }
      });
    });
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)), "editingMoved", function (rotorMove, cellMove) {
      _this.props.dispatch({
        type: _this.props.rotorCellEditMoved,
        payload: {
          rotorMove: rotorMove,
          cellMove: cellMove
        }
      });
    });
    return _this;
  }

  (0, _createClass2.default)(RotorView, [{
    key: "render",
    value: function render() {
      var _this2 = this;

      var _this$props = this.props,
          index = _this$props.index,
          editableRow = _this$props.editableRow,
          cells = _this$props.cells,
          shift = _this$props.shift,
          editingRank = _this$props.editingRank,
          activeRank = _this$props.activeRank;
      var nbCells = cells.length;
      return _react.default.createElement("div", {
        style: {
          width: "100%"
        }
      }, _react.default.createElement("div", {
        className: "clearfix",
        style: {
          marginLeft: "130px"
        }
      }, (0, _range.range)(0, nbCells).map(function (rank) {
        var _cells$rank = cells[rank],
            editable = _cells$rank.editable,
            locked = _cells$rank.locked,
            conflict = _cells$rank.conflict,
            hint = _cells$rank.hint;
        var isActive = activeRank === rank;
        var isEditing = editingRank === rank && !locked && !hint;
        var isLast = nbCells === rank + 1;
        var shiftedIndex = (rank + shift) % nbCells;
        var rotating = cells[shiftedIndex].rotating;
        return _react.default.createElement(RotorCell, {
          key: rank,
          rank: rank,
          isLast: isLast,
          editableRow: editableRow,
          staticChar: rotating,
          editableChar: editable,
          isLocked: locked,
          isHint: hint,
          isEditing: isEditing,
          isActive: isActive,
          onChangeChar: _this2.onChangeChar,
          onChangeLocked: _this2.onChangeLocked,
          onEditingStarted: _this2.onEditingStarted,
          onEditingCancelled: _this2.onEditingCancelled,
          onEditingMoved: _this2.editingMoved,
          isConflict: conflict
        });
      })));
    }
  }]);
  return RotorView;
}(_react.default.PureComponent);

var RotorCell =
/*#__PURE__*/
function (_React$PureComponent2) {
  (0, _inherits2.default)(RotorCell, _React$PureComponent2);

  function RotorCell() {
    var _getPrototypeOf3;

    var _this3;

    (0, _classCallCheck2.default)(this, RotorCell);

    for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
      args[_key2] = arguments[_key2];
    }

    _this3 = (0, _possibleConstructorReturn2.default)(this, (_getPrototypeOf3 = (0, _getPrototypeOf4.default)(RotorCell)).call.apply(_getPrototypeOf3, [this].concat(args)));
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this3)), "startEditing", function () {
      if (!_this3.props.isLocked && !_this3.props.isEditing) {
        _this3.props.onEditingStarted(_this3.props.rank);
      }
    });
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this3)), "keyDown", function (event) {
      var handled = true;

      if (event.key === 'ArrowRight') {
        _this3.props.onEditingMoved(0, 1);
      } else if (event.key === 'ArrowLeft') {
        _this3.props.onEditingMoved(0, -1);
      } else if (event.key === 'ArrowUp') {
        _this3.props.onEditingMoved(-1, 0);
      } else if (event.key === 'ArrowDown') {
        _this3.props.onEditingMoved(1, 0);
      } else if (event.key === 'Escape' || event.key === 'Enter') {
        _this3.props.onEditingCancelled();
      } else {
        handled = false;
      }

      if (handled) {
        event.preventDefault();
        event.stopPropagation();
      }
    });
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this3)), "cellChanged", function () {
      var value = _this3._input.value.substr(-1);
      /* /!\ IE compatibility */


      _this3.props.onChangeChar(_this3.props.rank, value);
    });
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this3)), "lockClicked", function () {
      _this3.props.onChangeLocked(_this3.props.rank, !_this3.props.isLocked);
    });
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this3)), "refInput", function (element) {
      _this3._input = element;
    });
    return _this3;
  }

  (0, _createClass2.default)(RotorCell, [{
    key: "render",

    /* XXX Clicking in the editable div and entering the same letter does not
           trigger a change event.  This behavior is unfortunate. */
    value: function render() {
      var _this$props2 = this.props,
          staticChar = _this$props2.staticChar,
          editableChar = _this$props2.editableChar,
          isLocked = _this$props2.isLocked,
          isHint = _this$props2.isHint,
          isActive = _this$props2.isActive,
          isEditing = _this$props2.isEditing,
          editableRow = _this$props2.editableRow,
          isLast = _this$props2.isLast,
          isConflict = _this$props2.isConflict;
      var columnStyle = {
        float: 'left',
        width: '20px'
      };
      var staticCellStyle = {
        border: '1px solid black',
        borderRightWidth: isLast ? '1px' : '0',
        textAlign: 'center'
      };
      var editableCellStyle = {
        border: '1px solid black',
        borderRightWidth: isLast ? '1px' : '0',
        textAlign: 'center',
        cursor: 'text',
        backgroundColor: isHint ? '#afa' : isConflict ? '#fcc' : '#fff'
      };
      /* Apply active-status separation border style. */

      var bottomCellStyle = editableRow === 'top' ? staticCellStyle : editableCellStyle;

      if (isActive) {
        bottomCellStyle.marginTop = '0';
        bottomCellStyle.borderTopWidth = '3px';
      } else {
        bottomCellStyle.marginTop = '2px';
        bottomCellStyle.borderTopWidth = '1px';
        /* needed because react */
      }

      var staticCell = _react.default.createElement("div", {
        style: staticCellStyle
      }, staticChar || "\xA0");

      var editableCell = _react.default.createElement("div", {
        style: editableCellStyle,
        onClick: this.startEditing
      }, isEditing ? _react.default.createElement("input", {
        ref: this.refInput,
        onChange: this.cellChanged,
        onKeyDown: this.keyDown,
        type: "text",
        value: editableChar || '',
        style: {
          width: '19px',
          height: '20px',
          border: 'none',
          textAlign: 'center'
        }
      }) : editableChar || "\xA0");

      var lock = _react.default.createElement("div", {
        style: {
          marginTop: '2px',
          textAlign: 'center',
          cursor: 'pointer'
        },
        onClick: this.lockClicked
      }, isHint || _react.default.createElement("i", {
        className: (0, _classnames.default)(['fa', isLocked ? 'fa-lock' : 'fa-unlock-alt'])
      }));

      if (editableRow === 'top') {
        return _react.default.createElement("div", {
          style: columnStyle
        }, staticCell, editableCell, lock);
      } else {
        return _react.default.createElement("div", {
          style: columnStyle
        }, staticCell, editableCell, lock);
      }
    }
  }, {
    key: "componentDidUpdate",
    value: function componentDidUpdate() {
      if (this._input) {
        this._input.select();

        this._input.focus();
      }
    }
  }]);
  return RotorCell;
}(_react.default.PureComponent);

var _default = {
  actions: {
    rotorCellEditStarted: 'Rotor.Cell.Edit.Started',
    rotorCellEditMoved: 'Rotor.Cell.Edit.Moved',
    rotorCellEditCancelled: 'Rotor.Cell.Edit.Cancelled',
    rotorCellLockChanged: 'Rotor.Cell.Lock.Changed',
    rotorCellCharChanged: 'Rotor.Cell.Char.Changed',
    rotorKeyLoaded: 'Rotor.Key.Loaded'
  },
  actionReducers: {
    appInit: appInitReducer,
    rotorCellEditStarted: rotorCellEditStartedReducer,
    rotorCellEditMoved: rotorCellEditMovedReducer,
    rotorCellEditCancelled: rotorCellEditCancelledReducer,
    rotorCellLockChanged: rotorCellLockChangedReducer,
    rotorCellCharChanged: rotorCellCharChangedReducer,
    rotorKeyLoaded: rotorKeyLoadedReducer
  },
  views: {
    Rotor: (0, _reactRedux.connect)(RotorSelector)(RotorView)
  }
};
exports.default = _default;

/***/ }),

/***/ 581:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireDefault = __webpack_require__(10);

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _classCallCheck2 = _interopRequireDefault(__webpack_require__(39));

var _createClass2 = _interopRequireDefault(__webpack_require__(40));

var _possibleConstructorReturn2 = _interopRequireDefault(__webpack_require__(41));

var _getPrototypeOf4 = _interopRequireDefault(__webpack_require__(43));

var _inherits2 = _interopRequireDefault(__webpack_require__(44));

var _assertThisInitialized2 = _interopRequireDefault(__webpack_require__(42));

var _defineProperty2 = _interopRequireDefault(__webpack_require__(33));

var _objectSpread2 = _interopRequireDefault(__webpack_require__(22));

var _react = _interopRequireDefault(__webpack_require__(0));

var _reactRedux = __webpack_require__(35);

var _utils = __webpack_require__(82);

/*
- shows a slice of the clearText
- adds deciphered characters from start up to the "current" animation position
  (lazily computed)
- scrolling does not affect the current animation position
*/
function appInitReducer(state, _action) {
  return (0, _objectSpread2.default)({}, state, {
    decipheredText: {
      cellWidth: 15,
      cellHeight: 46,
      scrollTop: 0,
      nbCells: 0
    }
  });
}

function taskInitReducer(state, _action) {
  var decipheredText = state.decipheredText,
      cipherText = state.taskData.cipherText;
  decipheredText = (0, _objectSpread2.default)({}, decipheredText, {
    nbCells: cipherText.length
  });
  return (0, _objectSpread2.default)({}, state, {
    decipheredText: decipheredText
  });
}

function decipheredTextResizedReducer(state, _ref) {
  var width = _ref.payload.width;
  var decipheredText = state.decipheredText;
  decipheredText = (0, _objectSpread2.default)({}, decipheredText, {
    width: width,
    height: 4 * decipheredText.cellHeight
  });
  decipheredText = (0, _utils.updateGridGeometry)(decipheredText);
  return (0, _objectSpread2.default)({}, state, {
    decipheredText: decipheredText
  });
}

function decipheredTextScrolledReducer(state, _ref2) {
  var scrollTop = _ref2.payload.scrollTop;
  var decipheredText = state.decipheredText;
  decipheredText = (0, _objectSpread2.default)({}, decipheredText, {
    scrollTop: scrollTop
  });
  return (0, _objectSpread2.default)({}, state, {
    decipheredText: decipheredText
  });
}

function decipheredTextLateReducer(state, _action) {
  if (!state.taskData) return state;
  var _state$taskData = state.taskData,
      alphabet = _state$taskData.alphabet,
      cipherText = _state$taskData.cipherText,
      position = state.scheduling.position,
      rotors = state.rotors,
      decipheredText = state.decipheredText;

  function getCell(index) {
    var ciphered = cipherText[index];
    var cell = {
      position: index,
      current: index === position,
      ciphered: ciphered
    };
    var rank = alphabet.indexOf(ciphered);

    if (rank === -1) {
      cell.clear = ciphered;
    } else if (index <= position) {
      Object.assign(cell, (0, _utils.applyRotors)(rotors, index, rank));

      if (cell.rank !== -1) {
        cell.clear = alphabet[cell.rank];
      }
    }

    return cell;
  }

  decipheredText = (0, _utils.updateGridVisibleRows)(decipheredText, {
    getCell: getCell
  });
  return (0, _objectSpread2.default)({}, state, {
    decipheredText: decipheredText
  });
}

function DecipheredTextViewSelector(state) {
  var actions = state.actions,
      decipheredText = state.decipheredText;
  var decipheredTextResized = actions.decipheredTextResized,
      decipheredTextScrolled = actions.decipheredTextScrolled,
      schedulingJump = actions.schedulingJump;
  var width = decipheredText.width,
      height = decipheredText.height,
      cellWidth = decipheredText.cellWidth,
      cellHeight = decipheredText.cellHeight,
      bottom = decipheredText.bottom,
      pageRows = decipheredText.pageRows,
      pageColumns = decipheredText.pageColumns,
      visible = decipheredText.visible;
  return {
    decipheredTextResized: decipheredTextResized,
    decipheredTextScrolled: decipheredTextScrolled,
    schedulingJump: schedulingJump,
    width: width,
    height: height,
    visibleRows: visible.rows,
    cellWidth: cellWidth,
    cellHeight: cellHeight,
    bottom: bottom,
    pageRows: pageRows,
    pageColumns: pageColumns
  };
}

var DecipheredTextView =
/*#__PURE__*/
function (_React$PureComponent) {
  (0, _inherits2.default)(DecipheredTextView, _React$PureComponent);

  function DecipheredTextView() {
    var _getPrototypeOf2;

    var _this;

    (0, _classCallCheck2.default)(this, DecipheredTextView);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = (0, _possibleConstructorReturn2.default)(this, (_getPrototypeOf2 = (0, _getPrototypeOf4.default)(DecipheredTextView)).call.apply(_getPrototypeOf2, [this].concat(args)));
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)), "refTextBox", function (element) {
      _this._textBox = element;
      var width = element.clientWidth;
      var height = element.clientHeight;

      _this.props.dispatch({
        type: _this.props.decipheredTextResized,
        payload: {
          width: width,
          height: height
        }
      });
    });
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)), "onScroll", function () {
      var scrollTop = _this._textBox.scrollTop;

      _this.props.dispatch({
        type: _this.props.decipheredTextScrolled,
        payload: {
          scrollTop: scrollTop
        }
      });
    });
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)), "onJump", function (position) {
      _this.props.dispatch({
        type: _this.props.schedulingJump,
        payload: {
          position: position
        }
      });
    });
    return _this;
  }

  (0, _createClass2.default)(DecipheredTextView, [{
    key: "render",
    value: function render() {
      var _this2 = this;

      var _this$props = this.props,
          width = _this$props.width,
          height = _this$props.height,
          visibleRows = _this$props.visibleRows,
          cellWidth = _this$props.cellWidth,
          cellHeight = _this$props.cellHeight,
          bottom = _this$props.bottom;
      return _react.default.createElement("div", {
        ref: this.refTextBox,
        onScroll: this.onScroll,
        style: {
          position: 'relative',
          width: width && "".concat(width, "px"),
          height: height && "".concat(height, "px"),
          overflowY: 'scroll'
        }
      }, (visibleRows || []).map(function (_ref3) {
        var index = _ref3.index,
            columns = _ref3.columns;
        return _react.default.createElement("div", {
          key: index,
          style: {
            position: 'absolute',
            top: "".concat(index * cellHeight, "px")
          }
        }, columns.map(function (_ref4) {
          var index = _ref4.index,
              position = _ref4.position,
              ciphered = _ref4.ciphered,
              clear = _ref4.clear,
              locked = _ref4.locked,
              current = _ref4.current;
          return _react.default.createElement(TextCell, {
            key: index,
            column: index,
            position: position,
            ciphered: ciphered,
            clear: clear,
            locked: locked,
            current: current,
            cellWidth: cellWidth,
            onJump: _this2.onJump
          });
        }));
      }), _react.default.createElement("div", {
        style: {
          position: 'absolute',
          top: "".concat(bottom, "px"),
          width: '1px',
          height: '1px'
        }
      }));
    }
  }]);
  return DecipheredTextView;
}(_react.default.PureComponent);

var TextCell =
/*#__PURE__*/
function (_React$PureComponent2) {
  (0, _inherits2.default)(TextCell, _React$PureComponent2);

  function TextCell() {
    var _getPrototypeOf3;

    var _this3;

    (0, _classCallCheck2.default)(this, TextCell);

    for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
      args[_key2] = arguments[_key2];
    }

    _this3 = (0, _possibleConstructorReturn2.default)(this, (_getPrototypeOf3 = (0, _getPrototypeOf4.default)(TextCell)).call.apply(_getPrototypeOf3, [this].concat(args)));
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this3)), "_jump", function (_event) {
      _this3.props.onJump(_this3.props.position);
    });
    return _this3;
  }

  (0, _createClass2.default)(TextCell, [{
    key: "render",
    value: function render() {
      var _this$props2 = this.props,
          column = _this$props2.column,
          ciphered = _this$props2.ciphered,
          clear = _this$props2.clear,
          locked = _this$props2.locked,
          current = _this$props2.current,
          cellWidth = _this$props2.cellWidth;
      var cellStyle = {
        position: 'absolute',
        left: "".concat(column * cellWidth, "px"),
        width: "".concat(cellWidth, "px"),
        height: "42px",
        border: 'solid #777',
        borderWidth: '1px 0',
        backgroundColor: current ? '#aaa' : locked ? '#ccc' : '#fff',
        cursor: 'pointer'
      };
      return _react.default.createElement("div", {
        style: cellStyle,
        onClick: this._jump
      }, _react.default.createElement("div", {
        style: {
          width: '100%',
          height: '20px',
          borderBottom: '1px solid #ccc',
          textAlign: 'center'
        }
      }, ciphered || ' '), _react.default.createElement("div", {
        style: {
          width: '100%',
          height: '20px',
          textAlign: 'center'
        }
      }, clear || ' '));
    }
  }]);
  return TextCell;
}(_react.default.PureComponent);

var _default = {
  actions: {
    decipheredTextResized: 'DecipheredText.Resized'
    /* {width: number, height: number} */
    ,
    decipheredTextScrolled: 'DecipheredText.Scrolled'
    /* {scrollTop: number} */

  },
  actionReducers: {
    appInit: appInitReducer,
    taskInit: taskInitReducer,
    decipheredTextResized: decipheredTextResizedReducer,
    decipheredTextScrolled: decipheredTextScrolledReducer
  },
  lateReducer: decipheredTextLateReducer,
  views: {
    DecipheredText: (0, _reactRedux.connect)(DecipheredTextViewSelector)(DecipheredTextView)
  }
};
exports.default = _default;

/***/ }),

/***/ 582:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireDefault = __webpack_require__(10);

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _classCallCheck2 = _interopRequireDefault(__webpack_require__(39));

var _createClass2 = _interopRequireDefault(__webpack_require__(40));

var _possibleConstructorReturn2 = _interopRequireDefault(__webpack_require__(41));

var _getPrototypeOf3 = _interopRequireDefault(__webpack_require__(43));

var _inherits2 = _interopRequireDefault(__webpack_require__(44));

var _assertThisInitialized2 = _interopRequireDefault(__webpack_require__(42));

var _defineProperty2 = _interopRequireDefault(__webpack_require__(33));

var _react = _interopRequireDefault(__webpack_require__(0));

var _reactBootstrap = __webpack_require__(74);

var _reactRedux = __webpack_require__(35);

var _range = __webpack_require__(155);

var _classnames = _interopRequireDefault(__webpack_require__(6));

function WorkspaceSelector(state) {
  var _state$views = state.views,
      CipheredText = _state$views.CipheredText,
      SelectedText = _state$views.SelectedText,
      FrequencyAnalysis = _state$views.FrequencyAnalysis,
      Rotor = _state$views.Rotor,
      SchedulingControls = _state$views.SchedulingControls,
      DecipheredText = _state$views.DecipheredText,
      HintRequestFeedback = _state$views.HintRequestFeedback,
      requestHint = state.actions.requestHint,
      rotors = state.rotors,
      editing = state.editing;
  var hintRequest = null;

  if (typeof editing.rotorIndex === 'number') {
    var editingCell = rotors[editing.rotorIndex].cells[editing.cellRank];

    if (!editingCell.hint && !editingCell.locked) {
      hintRequest = editing;
    }
  }

  return {
    CipheredText: CipheredText,
    SelectedText: SelectedText,
    FrequencyAnalysis: FrequencyAnalysis,
    Rotor: Rotor,
    SchedulingControls: SchedulingControls,
    DecipheredText: DecipheredText,
    HintRequestFeedback: HintRequestFeedback,
    requestHint: requestHint,
    hintRequest: hintRequest,
    nbRotors: rotors.length
  };
}

var Workspace =
/*#__PURE__*/
function (_React$PureComponent) {
  (0, _inherits2.default)(Workspace, _React$PureComponent);

  function Workspace() {
    var _getPrototypeOf2;

    var _this;

    (0, _classCallCheck2.default)(this, Workspace);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = (0, _possibleConstructorReturn2.default)(this, (_getPrototypeOf2 = (0, _getPrototypeOf3.default)(Workspace)).call.apply(_getPrototypeOf2, [this].concat(args)));
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)), "requestHint", function () {
      var _this$props = _this.props,
          dispatch = _this$props.dispatch,
          requestHint = _this$props.requestHint,
          hintRequest = _this$props.hintRequest;
      dispatch({
        type: requestHint,
        payload: {
          request: hintRequest
        }
      });
    });
    return _this;
  }

  (0, _createClass2.default)(Workspace, [{
    key: "render",
    value: function render() {
      var _this$props2 = this.props,
          CipheredText = _this$props2.CipheredText,
          SelectedText = _this$props2.SelectedText,
          FrequencyAnalysis = _this$props2.FrequencyAnalysis,
          Rotor = _this$props2.Rotor,
          SchedulingControls = _this$props2.SchedulingControls,
          DecipheredText = _this$props2.DecipheredText,
          nbRotors = _this$props2.nbRotors,
          hintRequest = _this$props2.hintRequest,
          HintRequestFeedback = _this$props2.HintRequestFeedback;
      return _react.default.createElement("div", null, _react.default.createElement("h2", null, "Message chiffré"), _react.default.createElement(CipheredText, null), _react.default.createElement("h2", null, "Analyse de fréquence de la sélection"), _react.default.createElement(FrequencyAnalysis, null), _react.default.createElement("h2", null, "Substitution:"), _react.default.createElement("div", {
        className: "clearfix"
      }, _react.default.createElement("div", null, (0, _range.range)(0, nbRotors).map(function (index) {
        return _react.default.createElement(Rotor, {
          key: index,
          index: index
        });
      }))), _react.default.createElement("div", {
        style: {
          width: "100%",
          margin: "20px 0"
        }
      }, _react.default.createElement("div", {
        style: {
          textAlign: 'center'
        }
      }, _react.default.createElement("h5", null, "Hints"), _react.default.createElement("div", {
        style: {
          display: "inline-grid",
          padding: "10px",
          border: "1px solid #000",
          borderRight: "0",
          width: "30%",
          background: "rgb(202, 202, 202)"
        }
      }, _react.default.createElement("p", {
        style: {
          fontWeight: 'bold',
          textAlign: 'center'
        }
      }, "Indices"), _react.default.createElement("p", null, "Pour un coût de ", _react.default.createElement("span", {
        style: {
          fontWeight: 'bold'
        }
      }, "5 points"), ", cliquez sur une case de rotor et validez pour obtenir sa valeur."), _react.default.createElement("div", {
        style: {
          textAlign: 'center',
          margin: '10px 0'
        }
      }, _react.default.createElement(_reactBootstrap.Button, {
        onClick: this.requestHint,
        disabled: !hintRequest
      }, "Valider"))), _react.default.createElement("div", {
        style: {
          display: "inline-grid",
          padding: "10px",
          border: "1px solid #000",
          borderLeft: "0",
          width: "30%",
          background: "rgb(202, 202, 202)"
        }
      }, _react.default.createElement("p", {
        style: {
          fontWeight: 'bold',
          textAlign: 'center'
        }
      }, "Indices"), _react.default.createElement("p", null, "Pour un coût de ", _react.default.createElement("span", {
        style: {
          fontWeight: 'bold'
        }
      }, "5 points"), ", cliquez sur une case de rotor et validez pour obtenir sa valeur."), _react.default.createElement("div", {
        style: {
          textAlign: 'center',
          margin: '10px 0'
        }
      }, _react.default.createElement(_reactBootstrap.Button, {
        onClick: this.requestHint,
        disabled: !hintRequest
      }, "Valider"))))), _react.default.createElement(HintRequestFeedback, null), _react.default.createElement("h2", null, "Texte déchiffré"), _react.default.createElement(DecipheredText, null));
    }
  }]);
  return Workspace;
}(_react.default.PureComponent);

var _default = {
  views: {
    Workspace: (0, _reactRedux.connect)(WorkspaceSelector)(Workspace)
  }
};
exports.default = _default;

/***/ }),

/***/ 82:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireDefault = __webpack_require__(10);

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.changeSelection = changeSelection;
exports.sortedArrayHasElement = sortedArrayHasElement;
exports.updateGridGeometry = updateGridGeometry;
exports.updateGridVisibleRows = updateGridVisibleRows;
exports.updateGridVisibleColumns = updateGridVisibleColumns;
exports.updateGridVisibleArea = updateGridVisibleArea;
exports.makeRotor = makeRotor;
exports.dumpRotors = dumpRotors;
exports.loadRotors = loadRotors;
exports.editRotorCell = editRotorCell;
exports.lockRotorCell = lockRotorCell;
exports.updateRotorWithKey = updateRotorWithKey;
exports.updatePerms = updatePerms;
exports.getRotorShift = getRotorShift;
exports.applyRotors = applyRotors;
exports.applyRotor = applyRotor;
exports.wrapAround = wrapAround;

var _defineProperty2 = _interopRequireDefault(__webpack_require__(33));

var _slicedToArray2 = _interopRequireDefault(__webpack_require__(130));

var _objectSpread2 = _interopRequireDefault(__webpack_require__(22));

var _immutabilityHelper = _interopRequireDefault(__webpack_require__(68));

function bisect(a, x) {
  var lo = 0,
      hi = a.length,
      mid;

  while (lo < hi) {
    mid = (lo + hi) / 2 | 0;

    if (x < a[mid]) {
      hi = mid;
    } else {
      lo = mid + 1;
    }
  }

  return lo;
}

function changeSelection(values, value, selected) {
  var index = bisect(values, value);

  if (selected) {
    return values[index - 1] === value ? {} : {
      $splice: [[index, 0, value]]
    };
  } else {
    return values[index - 1] !== value ? {} : {
      $splice: [[index - 1, 1]]
    };
  }
}

function sortedArrayHasElement(a, x) {
  var i = bisect(a, x) - 1;
  return a[i] === x;
}

function updateGridGeometry(grid) {
  var width = grid.width,
      height = grid.height,
      cellWidth = grid.cellWidth,
      cellHeight = grid.cellHeight,
      scrollTop = grid.scrollTop,
      nbCells = grid.nbCells;
  var scrollBarWidth = 20;
  var pageColumns = Math.max(40, Math.floor((width - scrollBarWidth) / cellWidth));
  var pageRows = Math.max(8, Math.ceil(height / cellHeight));
  var bottom = Math.ceil(nbCells / pageColumns) * cellHeight - 1;
  var maxTop = Math.max(0, bottom + 1 - pageRows * cellHeight);
  return (0, _objectSpread2.default)({}, grid, {
    pageColumns: pageColumns,
    pageRows: pageRows,
    scrollTop: Math.min(maxTop, scrollTop),
    bottom: bottom,
    maxTop: maxTop
  });
}

function updateGridVisibleRows(grid, options) {
  options = options || {};
  var nbCells = grid.nbCells,
      cellHeight = grid.cellHeight,
      pageColumns = grid.pageColumns,
      pageRows = grid.pageRows,
      cells = grid.cells,
      scrollTop = grid.scrollTop,
      selectedRows = grid.selectedRows;

  if (typeof scrollTop !== 'number') {
    return grid;
  }

  var firstRow = Math.floor(scrollTop / cellHeight);
  var lastRow = Math.min(firstRow + pageRows - 1, Math.ceil(nbCells / pageColumns) - 1);
  var rows = [];
  var getCell = options.getCell || (cells ? function (index) {
    return {
      cell: cells[index]
    };
  } : function (_index) {
    return null;
  });

  for (var rowIndex = firstRow; rowIndex <= lastRow; rowIndex += 1) {
    var rowStartPos = rowIndex * pageColumns;
    var rowCells = [];

    for (var colIndex = 0; colIndex < pageColumns; colIndex += 1) {
      rowCells.push((0, _objectSpread2.default)({
        index: colIndex
      }, getCell(rowStartPos + colIndex)));
    }

    var selected = selectedRows && sortedArrayHasElement(selectedRows, rowIndex);
    rows.push({
      index: rowIndex,
      selected: selected,
      columns: rowCells
    });
  }

  return (0, _objectSpread2.default)({}, grid, {
    visible: {
      rows: rows
    }
  });
}

function updateGridVisibleColumns(grid, options) {
  options = options || {};
  var cellHeight = grid.cellHeight,
      pageColumns = grid.pageColumns,
      pageRows = grid.pageRows,
      cells = grid.cells,
      scrollTop = grid.scrollTop,
      selectedColumns = grid.selectedColumns;

  if (typeof scrollTop !== 'number') {
    return grid;
  }

  var firstRow = Math.floor(scrollTop / cellHeight);
  var lastRow = firstRow + pageRows - 1;
  var columns = [];
  var getCell = options.getCell || (cells ? function (index) {
    return {
      cell: cells[index]
    };
  } : function (_index) {
    return null;
  });

  for (var colIndex = 0; colIndex < pageColumns; colIndex += 1) {
    var colCells = [];

    for (var rowIndex = firstRow; rowIndex <= lastRow; rowIndex += 1) {
      colCells.push((0, _objectSpread2.default)({
        index: rowIndex
      }, getCell(rowIndex * pageColumns + colIndex)));
    }

    var selected = selectedColumns && sortedArrayHasElement(selectedColumns, colIndex);
    columns.push({
      index: colIndex,
      selected: selected,
      rows: colCells
    });
  }

  return (0, _objectSpread2.default)({}, grid, {
    visible: {
      columns: columns
    }
  });
}

function updateGridVisibleArea(grid, options) {
  /* TODO: build a cache key, store it in the grid, use it to skip computation when unchanged */
  if (grid.mode === 'rows') {
    return updateGridVisibleRows(grid, options);
  }

  if (grid.mode === 'columns') {
    return updateGridVisibleColumns(grid, options);
  }

  return grid;
}
/* ROTOR functions */


function makeRotor(alphabet, _ref) {
  var schedule = _ref.schedule,
      editableRow = _ref.editableRow;
  var size = alphabet.length;
  var cells = alphabet.split('').map(function (c, rank) {
    return {
      rank: rank,
      rotating: c,
      editable: null,
      locked: false,
      conflict: false
    };
  });
  var nullPerm = new Array(size).fill(-1);
  return {
    alphabet: alphabet,
    size: size,
    schedule: schedule,
    editableRow: editableRow,
    cells: cells,
    forward: nullPerm,
    backward: nullPerm
  };
}

function dumpRotors(alphabet, rotors) {
  return rotors.map(function (rotor) {
    return rotor.cells.map(function (_ref2) {
      var editable = _ref2.editable,
          locked = _ref2.locked;
      return [alphabet.indexOf(editable), locked ? 1 : 0];
    });
  });
}

function loadRotors(alphabet, rotorSpecs, hints, rotorDumps) {
  return rotorDumps.map(function (cells, rotorIndex) {
    var $cells = [];
    cells.forEach(function (cell, cellIndex) {
      /* Locking information is not included in the answer. */
      if (typeof cell === 'number') cell = [cell, 0];

      var _cell = cell,
          _cell2 = (0, _slicedToArray2.default)(_cell, 2),
          rank = _cell2[0],
          locked = _cell2[1];

      $cells[cellIndex] = {
        editable: {
          $set: rank === -1 ? null : alphabet[rank]
        },
        locked: {
          $set: locked !== 0
        }
      };
    });
    hints.forEach(function (_ref3) {
      var i = _ref3.rotorIndex,
          j = _ref3.cellRank,
          symbol = _ref3.symbol;

      if (rotorIndex === i) {
        $cells[j] = {
          editable: {
            $set: symbol
          },
          hint: {
            $set: true
          }
        };
      }
    });
    var rotor = makeRotor(alphabet, rotorSpecs[rotorIndex]);
    rotor = (0, _immutabilityHelper.default)(rotor, {
      cells: $cells
    });
    rotor = markRotorConflicts(updatePerms(rotor));
    return rotor;
  });
}

function editRotorCell(rotor, rank, symbol) {
  rotor = (0, _immutabilityHelper.default)(rotor, {
    cells: (0, _defineProperty2.default)({}, rank, {
      editable: {
        $set: symbol
      }
    })
  });
  return updatePerms(markRotorConflicts(rotor));
}

function lockRotorCell(rotor, rank, locked) {
  return (0, _immutabilityHelper.default)(rotor, {
    cells: (0, _defineProperty2.default)({}, rank, {
      locked: {
        $set: locked
      }
    })
  });
}

function markRotorConflicts(rotor) {
  var counts = new Map();
  var changes = {};
  var _iteratorNormalCompletion = true;
  var _didIteratorError = false;
  var _iteratorError = undefined;

  try {
    for (var _iterator = rotor.cells[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
      var _ref5 = _step.value;
      var rank = _ref5.rank,
          editable = _ref5.editable,
          conflict = _ref5.conflict;

      if (conflict) {
        changes[rank] = {
          conflict: {
            $set: false
          }
        };
      }

      if (editable !== null) {
        if (!counts.has(editable)) {
          counts.set(editable, [rank]);
        } else {
          counts.get(editable).push(rank);
        }
      }
    }
  } catch (err) {
    _didIteratorError = true;
    _iteratorError = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion && _iterator.return != null) {
        _iterator.return();
      }
    } finally {
      if (_didIteratorError) {
        throw _iteratorError;
      }
    }
  }

  var _iteratorNormalCompletion2 = true;
  var _didIteratorError2 = false;
  var _iteratorError2 = undefined;

  try {
    for (var _iterator2 = counts.values()[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
      var ranks = _step2.value;

      if (ranks.length > 1) {
        var _iteratorNormalCompletion3 = true;
        var _didIteratorError3 = false;
        var _iteratorError3 = undefined;

        try {
          for (var _iterator3 = ranks[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
            var rank = _step3.value;
            changes[rank] = {
              conflict: {
                $set: true
              }
            };
          }
        } catch (err) {
          _didIteratorError3 = true;
          _iteratorError3 = err;
        } finally {
          try {
            if (!_iteratorNormalCompletion3 && _iterator3.return != null) {
              _iterator3.return();
            }
          } finally {
            if (_didIteratorError3) {
              throw _iteratorError3;
            }
          }
        }
      }
    }
  } catch (err) {
    _didIteratorError2 = true;
    _iteratorError2 = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion2 && _iterator2.return != null) {
        _iterator2.return();
      }
    } finally {
      if (_didIteratorError2) {
        throw _iteratorError2;
      }
    }
  }

  return (0, _immutabilityHelper.default)(rotor, {
    cells: changes
  });
}

function updateRotorWithKey(alphabet, rotor, key) {
  var $cells = {};
  key.split('').forEach(function (symbol, cellIndex) {
    $cells[cellIndex] = {
      editable: {
        $set: alphabet.indexOf(symbol) === -1 ? null : symbol
      }
    };
  });
  return updatePerms((0, _immutabilityHelper.default)(rotor, {
    cells: $cells
  }));
}

function updatePerms(rotor) {
  var size = rotor.size,
      alphabet = rotor.alphabet,
      cells = rotor.cells;
  var forward = new Array(size).fill(-1);
  var backward = new Array(size).fill(-1);
  var _iteratorNormalCompletion4 = true;
  var _didIteratorError4 = false;
  var _iteratorError4 = undefined;

  try {
    for (var _iterator4 = cells[Symbol.iterator](), _step4; !(_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done); _iteratorNormalCompletion4 = true) {
      var cell = _step4.value;

      if (cell.editable !== null && !cell.conflict) {
        var source = alphabet.indexOf(cell.editable);
        forward[source] = cell.rank;
        backward[cell.rank] = source;
      }
    }
  } catch (err) {
    _didIteratorError4 = true;
    _iteratorError4 = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion4 && _iterator4.return != null) {
        _iterator4.return();
      }
    } finally {
      if (_didIteratorError4) {
        throw _iteratorError4;
      }
    }
  }

  return (0, _objectSpread2.default)({}, rotor, {
    forward: forward,
    backward: backward
  });
}

function getRotorShift(rotor, position) {
  var size = rotor.size,
      schedule = rotor.schedule;
  return schedule === 0 ? 0 : Math.floor(position / schedule) % size;
}

function applyRotors(rotors, position, rank) {
  var result = {
    rank: rank,
    locks: 0,
    trace: []
  };

  for (var rotorIndex = 0; rotorIndex < rotors.length; rotorIndex += 1) {
    var rotor = rotors[rotorIndex];
    var shift = getRotorShift(rotor, position);
    applyRotor(rotor, shift, result);

    if (result.rank === -1) {
      break;
    }
  }

  if (result.locks === rotors.length) {
    result.locked = true;
  }

  return result;
}

function applyRotor(rotor, shift, result) {
  var rank = result.rank,
      cell;
  /* Negative shift to the static top row before permutation. */

  if (rotor.editableRow === 'bottom') {
    rank = applyShift(rotor.size, -shift, rank);
    cell = rotor.cells[rank];
  }
  /* Apply the permutation. */


  rank = rotor.forward[rank];
  /* Positive shift to the static bottom row after permutation. */

  if (rotor.editableRow === 'top') {
    cell = rotor.cells[rank];
    rank = applyShift(rotor.size, shift, rank);
  }
  /* Save new rank (can be -1) and attributes. */


  result.rank = rank;

  if (cell) {
    /* Save the rotor cell used in the trace. */
    result.trace.push(cell);

    if (cell.locked || cell.hint) {
      result.locks += 1;
    }

    if (cell.collision) {
      result.collision = true;
    }
  }
}

function applyShift(mod, amount, rank) {
  if (rank !== -1) {
    if (amount < 0) {
      amount += mod;
    }

    rank = (rank + amount) % mod;
  }

  return rank;
}

function wrapAround(value, mod) {
  return (value % mod + mod) % mod;
}

/***/ })

},[251]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zcmMvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2FsZ29yZWFfcmVhY3RfdGFzay9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvYWxnb3JlYV9yZWFjdF90YXNrL2xpbmtlci5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvYWxnb3JlYV9yZWFjdF90YXNrL3VpL3N0eWxlcy5jc3M/ZThiOSIsIndlYnBhY2s6Ly8vLi9zcmMvYWxnb3JlYV9yZWFjdF90YXNrL3VpL3N0eWxlcy5jc3MiLCJ3ZWJwYWNrOi8vLy4vc3JjL2FsZ29yZWFfcmVhY3RfdGFzay9hcHBfYnVuZGxlLmpzIiwid2VicGFjazovLy8uL3NyYy9hbGdvcmVhX3JlYWN0X3Rhc2svdWkvdGFza19iYXIuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2FsZ29yZWFfcmVhY3RfdGFzay91aS9zcGlubmVyLmpzIiwid2VicGFjazovLy8uL3NyYy9hbGdvcmVhX3JlYWN0X3Rhc2svbGVnYWN5L3Rhc2suanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2FsZ29yZWFfcmVhY3RfdGFzay9zZXJ2ZXJfYXBpLmpzIiwid2VicGFjazovLy8uL3NyYy9hbGdvcmVhX3JlYWN0X3Rhc2svbGVnYWN5L3BsYXRmb3JtX2FkYXB0ZXIuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2FsZ29yZWFfcmVhY3RfdGFzay9wbGF0Zm9ybV9idW5kbGUuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2FsZ29yZWFfcmVhY3RfdGFzay9oaW50c19idW5kbGUuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2FsZ29yZWFfcmVhY3RfdGFzay93aW5kb3dfaGVpZ2h0X21vbml0b3IuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3N0eWxlLmNzcz8xNWY0Iiwid2VicGFjazovLy8uL3NyYy9zdHlsZS5jc3MiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NpcGhlcmVkX3RleHRfYnVuZGxlLmpzIiwid2VicGFjazovLy8uL3NyYy9mcmVxdWVuY3lfYW5hbHlzaXNfYnVuZGxlLmpzIiwid2VicGFjazovLy9jcnlwdG8gKGlnbm9yZWQpIiwid2VicGFjazovLy8uL3NyYy9zY2hlZHVsaW5nX2J1bmRsZS5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvcm90b3JzX2J1bmRsZS5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvZGVjaXBoZXJlZF90ZXh0X2J1bmRsZS5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvd29ya3NwYWNlX2J1bmRsZS5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvdXRpbHMuanMiXSwibmFtZXMiOlsiVGFza0J1bmRsZSIsImFjdGlvblJlZHVjZXJzIiwiYXBwSW5pdCIsImFwcEluaXRSZWR1Y2VyIiwidGFza0luaXQiLCJ0YXNrSW5pdFJlZHVjZXIiLCJ0YXNrUmVmcmVzaCIsInRhc2tSZWZyZXNoUmVkdWNlciIsInRhc2tBbnN3ZXJMb2FkZWQiLCJ0YXNrU3RhdGVMb2FkZWQiLCJpbmNsdWRlcyIsIkNpcGhlcmVkVGV4dEJ1bmRsZSIsIkZyZXF1ZW5jeUFuYWx5c2lzQnVuZGxlIiwiU2NoZWR1bGluZ0J1bmRsZSIsIlJvdG9yc0J1bmRsZSIsIkRlY2lwaGVyZWRUZXh0QnVuZGxlIiwiV29ya3NwYWNlQnVuZGxlIiwic2VsZWN0b3JzIiwiZ2V0VGFza1N0YXRlIiwiZ2V0VGFza0Fuc3dlciIsInByb2Nlc3MiLCJlYXJseVJlZHVjZXIiLCJzdGF0ZSIsImFjdGlvbiIsImNvbnNvbGUiLCJsb2ciLCJ0eXBlIiwiX2FjdGlvbiIsInRhc2tNZXRhRGF0YSIsInRhc2tEYXRhIiwiYWxwaGFiZXQiLCJyb3RvclNwZWNzIiwicm90b3JzIiwiaGludHMiLCJtYXAiLCJfIiwidGFza1JlYWR5IiwiZHVtcCIsInJvdG9yIiwiY2VsbHMiLCJlZGl0YWJsZSIsImluZGV4T2YiLCJhbnN3ZXIiLCJwYXlsb2FkIiwiJHNldCIsInJ1biIsImNvbnRhaW5lciIsIm9wdGlvbnMiLCJwbGF0Zm9ybSIsIndpbmRvdyIsImRlYnVnIiwiQXBwQnVuZGxlIiwiYWN0aW9ucyIsInZpZXdzIiwicmVkdWNlciIsInJvb3RTYWdhIiwic2FmZVJlZHVjZXIiLCJleCIsImVycm9yIiwiZXJyb3JzIiwic2FnYU1pZGRsZXdhcmUiLCJlbmhhbmNlciIsInN0b3JlIiwic3RhcnQiLCJxdWVyeSIsInF1ZXJ5U3RyaW5nIiwicGFyc2UiLCJsb2NhdGlvbiIsInNlYXJjaCIsInRhc2tUb2tlbiIsInNUb2tlbiIsImRpc3BhdGNoIiwiUmVhY3RET00iLCJyZW5kZXIiLCJsaW5rIiwicm9vdEJ1bmRsZSIsImZlYXR1cmVzIiwiQWN0aW9ucyIsIlZpZXdzIiwiU2VsZWN0b3JzIiwiRWFybHlSZWR1Y2VycyIsIlJlZHVjZXJzIiwiQWN0aW9uUmVkdWNlcnMiLCJMYXRlUmVkdWNlcnMiLCJTYWdhcyIsImFwcCIsImZlYXR1cmUiLCJwcmVwYXJlIiwibGlua0J1bmRsZSIsImZpbmFsaXplIiwiYnVuZGxlIiwiYWRkIiwic3ViQnVuZGxlIiwiT2JqZWN0IiwiYXNzaWduIiwiX2FwcCIsInVuZGVmaW5lZCIsInJlZHVjZXJzIiwic2VxdWVuY2VSZWR1Y2VycyIsImxhdGVSZWR1Y2VyIiwiTWFwIiwia2V5cyIsImtleSIsImdldCIsInNldCIsImFjdGlvblJlZHVjZXIiLCJtYWtlQWN0aW9uUmVkdWNlciIsInNhZ2FzIiwic2FnYSIsInB1c2giLCJBcnJheSIsInByb3RvdHlwZSIsImFwcGx5IiwiZWZmZWN0cyIsImVudHJpZXMiLCJyZXN1bHQiLCJpIiwibGVuZ3RoIiwiRXJyb3IiLCJjb21wb3NlUmVkdWNlcnMiLCJmc3QiLCJzbmQiLCJhcHBTYWdhIiwiYXBwSW5pdFNhZ2EiLCJwbGF0Zm9ybVZhbGlkYXRlU2FnYSIsImFwcEluaXREb25lUmVkdWNlciIsInBsYXRmb3JtQXBpIiwidGFza0FwaSIsInNlcnZlckFwaSIsImFwcEluaXRGYWlsZWRSZWR1Y2VyIiwibWVzc2FnZSIsImZhdGFsRXJyb3IiLCJwbGF0Zm9ybVZhbGlkYXRlIiwidGFza0FjdGlvbnMiLCJsb2FkIiwidW5sb2FkIiwidXBkYXRlVG9rZW4iLCJnZXRIZWlnaHQiLCJnZXRNZXRhRGF0YSIsImdldFZpZXdzIiwic2hvd1ZpZXdzIiwiZ2V0U3RhdGUiLCJyZWxvYWRTdGF0ZSIsImdldEFuc3dlciIsInJlbG9hZEFuc3dlciIsImdyYWRlQW5zd2VyIiwic2VydmVyX21vZHVsZSIsIm1ha2VUYXNrQ2hhbm5lbCIsInRhc2tDaGFubmVsIiwidGFzayIsImFwcEluaXRGYWlsZWQiLCJ0b1N0cmluZyIsImFwcEluaXREb25lIiwiaW5pdFdpdGhUYXNrIiwid2luZG93SGVpZ2h0TW9uaXRvclNhZ2EiLCJtb2RlIiwidmFsaWRhdGUiLCJBcHBTZWxlY3RvciIsIldvcmtzcGFjZSIsImdyYWRpbmciLCJBcHAiLCJwcm9wcyIsIl92YWxpZGF0ZSIsImZvbnRXZWlnaHQiLCJzY29yZSIsIlJlYWN0IiwiUHVyZUNvbXBvbmVudCIsIlBsYXRmb3JtQnVuZGxlIiwiSGludHNCdW5kbGUiLCJUYXNrQmFyIiwib25WYWxpZGF0ZSIsIlNwaW5uZXIiLCJfcHJvcHMiLCJmb250U2l6ZSIsImVtaXQiLCJtYWtlVGFzayIsInByb3AiLCJidWZmZXJzIiwiZXhwYW5kaW5nIiwic3VjY2VzcyIsInRva2VuIiwiYW5zd2VyVG9rZW4iLCJmZXRjaCIsIm1ha2VTZXJ2ZXJBcGkiLCJjb25maWciLCJzZXJ2aWNlIiwiYm9keSIsIlByb21pc2UiLCJyZXNvbHZlIiwicmVqZWN0IiwidXJsIiwiVVJMIiwiYmFzZVVybCIsImRldmVsIiwibWV0aG9kIiwiaGVhZGVycyIsIkpTT04iLCJzdHJpbmdpZnkiLCJ0aGVuIiwicmVzcG9uc2UiLCJzdGF0dXMiLCJqc29uIiwiY2F0Y2giLCJkYXRhIiwiZ2V0VGFza1BhcmFtcyIsImRlZmF1bHRWYWx1ZSIsImFza0hpbnQiLCJoaW50VG9rZW4iLCJ1cGRhdGVEaXNwbGF5IiwidGFza1Nob3dWaWV3c0V2ZW50U2FnYSIsInRhc2tHZXRWaWV3c0V2ZW50U2FnYSIsInRhc2tVcGRhdGVUb2tlbkV2ZW50U2FnYSIsInRhc2tHZXRIZWlnaHRFdmVudFNhZ2EiLCJ0YXNrVW5sb2FkRXZlbnRTYWdhIiwidGFza0dldE1ldGFEYXRhRXZlbnRTYWdhIiwidGFza0dldEFuc3dlckV2ZW50U2FnYSIsInRhc2tSZWxvYWRBbnN3ZXJFdmVudFNhZ2EiLCJ0YXNrR2V0U3RhdGVFdmVudFNhZ2EiLCJ0YXNrUmVsb2FkU3RhdGVFdmVudFNhZ2EiLCJ0YXNrTG9hZEV2ZW50U2FnYSIsInRhc2tHcmFkZUFuc3dlckV2ZW50U2FnYSIsInRhc2tEYXRhTG9hZGVkUmVkdWNlciIsInRhc2tTdGF0ZUxvYWRlZFJlZHVjZXIiLCJ0YXNrQW5zd2VyTG9hZGVkUmVkdWNlciIsInRhc2tTaG93Vmlld3NFdmVudFJlZHVjZXIiLCJ0YXNrVmlld3MiLCJ0YXNrVXBkYXRlVG9rZW5FdmVudFJlZHVjZXIiLCJ3YXJuIiwiZCIsImRvY3VtZW50IiwiaCIsIk1hdGgiLCJtYXgiLCJvZmZzZXRIZWlnaHQiLCJkb2N1bWVudEVsZW1lbnQiLCJfZXJyb3IiLCJtZXRhRGF0YSIsInN0ckFuc3dlciIsInN0ckR1bXAiLCJfdmlld3MiLCJ0YXNrRGF0YUxvYWRlZCIsInRhc2tBbnN3ZXJHcmFkZWQiLCJtaW5TY29yZSIsIm1heFNjb3JlIiwibm9TY29yZSIsIm1pbl9zY29yZSIsIm1heF9zY29yZSIsIm5vX3Njb3JlIiwic2NvcmVUb2tlbiIsInRhc2tBbnN3ZXJHcmFkZWRSZWR1Y2VyIiwidGFza0xvYWRFdmVudCIsInRhc2tVbmxvYWRFdmVudCIsInRhc2tVcGRhdGVUb2tlbkV2ZW50IiwidGFza0dldEhlaWdodEV2ZW50IiwidGFza0dldE1ldGFEYXRhRXZlbnQiLCJ0YXNrR2V0Vmlld3NFdmVudCIsInRhc2tTaG93Vmlld3NFdmVudCIsInRhc2tHZXRTdGF0ZUV2ZW50IiwidGFza1JlbG9hZFN0YXRlRXZlbnQiLCJ0YXNrR2V0QW5zd2VyRXZlbnQiLCJ0YXNrUmVsb2FkQW5zd2VyRXZlbnQiLCJ0YXNrR3JhZGVBbnN3ZXJFdmVudCIsInJlcXVlc3RIaW50U2FnYSIsImhpbnRSZXF1ZXN0RnVsZmlsbGVkUmVkdWNlciIsImhpbnRSZXF1ZXN0IiwiaGludFJlcXVlc3RSZWplY3RlZFJlZHVjZXIiLCJjb2RlIiwiaGludFJlcXVlc3RGZWVkYmFja0NsZWFyZWRSZWR1Y2VyIiwicmVxdWVzdCIsImluaXRpYWxUYXNrVG9rZW4iLCJ1cGRhdGVkVGFza1Rva2VuIiwiaGludFJlcXVlc3RGdWxmaWxsZWQiLCJoaW50UmVxdWVzdFJlamVjdGVkIiwiSGludFJlcXVlc3RGZWVkYmFja1NlbGVjdG9yIiwiaGludFJlcXVlc3RGZWVkYmFja0NsZWFyZWQiLCJ2aXNpYmxlIiwiSGludFJlcXVlc3RGZWVkYmFjayIsImhhbmRsZURpc21pc3MiLCJyZXF1ZXN0SGludCIsImhpbnRzU2FnYSIsImNoYW5uZWwiLCJvblJlc2l6ZSIsImhlaWdodCIsImNsaWVudEhlaWdodCIsImFkZEV2ZW50TGlzdGVuZXIiLCJyZW1vdmVFdmVudExpc3RlbmVyIiwic2xpZGluZyIsImxhc3RIZWlnaHQiLCJjbG9zZSIsImNpcGhlcmVkVGV4dCIsImNlbGxXaWR0aCIsImNlbGxIZWlnaHQiLCJzY3JvbGxUb3AiLCJuYkNlbGxzIiwiY2lwaGVyVGV4dCIsImNpcGhlcmVkVGV4dFJlc2l6ZWRSZWR1Y2VyIiwid2lkdGgiLCJjaXBoZXJlZFRleHRTY3JvbGxlZFJlZHVjZXIiLCJDaXBoZXJUZXh0Vmlld1NlbGVjdG9yIiwiY2lwaGVyZWRUZXh0UmVzaXplZCIsImNpcGhlcmVkVGV4dFNjcm9sbGVkIiwiYm90dG9tIiwicGFnZVJvd3MiLCJwYWdlQ29sdW1ucyIsInZpc2libGVSb3dzIiwicm93cyIsIkNpcGhlclRleHRWaWV3IiwiZWxlbWVudCIsIl90ZXh0Qm94IiwiY2xpZW50V2lkdGgiLCJyZWZUZXh0Qm94Iiwib25TY3JvbGwiLCJwb3NpdGlvbiIsIm92ZXJmbG93WSIsImluZGV4IiwiY29sdW1ucyIsInRvcCIsImNlbGwiLCJsZWZ0IiwiQ2lwaGVyZWRUZXh0IiwiZnJlcXVlbmN5QW5hbHlzaXMiLCJmcmVxdWVuY3lBbmFseXNpc0xhdGVSZWR1Y2VyIiwicmVmZXJlbmNlRnJlcXVlbmNpZXMiLCJmcmVxdWVuY2llcyIsInRleHRGcmVxdWVuY2llcyIsImZyZXFNYXAiLCJzcGxpdCIsImMiLCJjb3VudFN5bWJvbHMiLCJub3JtYWxpemVBbmRTb3J0RnJlcXVlbmNpZXMiLCJ0ZXh0Iiwic3RhcnRQb3MiLCJlbmRQb3MiLCJwb3MiLCJjb3VudFN5bWJvbCIsImNoYXIiLCJjb3VudCIsInN1bUZyZXF1ZW5jaWVzIiwiZHN0IiwiZnJvbSIsInRvdGFsQ291bnQiLCJyZWR1Y2UiLCJhIiwieCIsInNvcnQiLCJzMSIsInMyIiwicDEiLCJwMiIsInN5bWJvbCIsInByb2JhIiwiRnJlcXVlbmN5QW5hbHlzaXNTZWxlY3RvciIsInNjYWxlIiwiYWxwaGFiZXRTaXplIiwiRnJlcXVlbmN5QW5hbHlzaXNWaWV3IiwiZmxvYXQiLCJsaW5lSGVpZ2h0IiwiVGV4dEZyZXF1ZW5jeUJveCIsImRpc3BsYXkiLCJ2ZXJ0aWNhbEFsaWduIiwibWluIiwicm91bmQiLCJtYXJnaW5MZWZ0IiwiYmFja2dyb3VuZCIsImJvcmRlciIsIm1hcmdpbkJvdHRvbSIsInRleHRBbGlnbiIsIlJlZmVyZW5jZUZyZXF1ZW5jeUJveCIsIkZyZXF1ZW5jeUFuYWx5c2lzIiwic2NoZWR1bGluZ1NhZ2EiLCJzY2hlZHVsaW5nIiwic3BlZWQiLCJzaGlmdHMiLCJzdGFydFBvc2l0aW9uIiwiZW5kUG9zaXRpb24iLCJjdXJyZW50VHJhY2UiLCJzY2hlZHVsaW5nU3RhdHVzQ2hhbmdlZFJlZHVjZXIiLCJjaGFuZ2VzIiwic2NoZWR1bGluZ1N0ZXBCYWNrd2FyZFJlZHVjZXIiLCJzY2hlZHVsaW5nU3RlcEZvcndhcmRSZWR1Y2VyIiwic2NoZWR1bGluZ0p1bXBSZWR1Y2VyIiwic2NoZWR1bGluZ1RpY2tSZWR1Y2VyIiwic2NoZWR1bGluZ0xhdGVSZWR1Y2VyIiwicmFuayIsInRyYWNlIiwic2NoZWR1bGluZ1RpY2siLCJuYW1lIiwic3RhdHVzQ2hhbmdpbmdBY3Rpb25zIiwiU2NoZWR1bGluZ0NvbnRyb2xzU2VsZWN0b3IiLCJzY2hlZHVsaW5nU3RhdHVzQ2hhbmdlZCIsInNjaGVkdWxpbmdTdGVwQmFja3dhcmQiLCJzY2hlZHVsaW5nU3RlcEZvcndhcmQiLCJTY2hlZHVsaW5nQ29udHJvbHNWaWV3IiwiX2V2ZW50IiwibWFyZ2luIiwib25GYXN0QmFja3dhcmRDbGlja2VkIiwib25TdGVwQmFja3dhcmRDbGlja2VkIiwib25QbGF5Q2xpY2tlZCIsIm9uU3RlcEZvcndhcmRDbGlja2VkIiwib25GYXN0Rm9yd2FyZENsaWNrZWQiLCJzY2hlZHVsaW5nSnVtcCIsIlNjaGVkdWxpbmdDb250cm9scyIsImVkaXRpbmciLCJyb3RvckNlbGxFZGl0U3RhcnRlZFJlZHVjZXIiLCJyb3RvckluZGV4IiwiY2VsbFJhbmsiLCJyb3RvckNlbGxFZGl0TW92ZWRSZWR1Y2VyIiwicm90b3JNb3ZlIiwiY2VsbE1vdmUiLCJyb3RvclN0b3AiLCJjZWxsU3RvcCIsImhpbnQiLCJsb2NrZWQiLCJyb3RvckNlbGxFZGl0Q2FuY2VsbGVkUmVkdWNlciIsInJvdG9yQ2VsbENoYXJDaGFuZ2VkUmVkdWNlciIsInJvdG9yQ2VsbExvY2tDaGFuZ2VkUmVkdWNlciIsImlzTG9ja2VkIiwicm90b3JLZXlMb2FkZWRSZWR1Y2VyIiwiUm90b3JTZWxlY3RvciIsInJvdG9yQ2VsbExvY2tDaGFuZ2VkIiwicm90b3JDZWxsQ2hhckNoYW5nZWQiLCJyb3RvckNlbGxFZGl0Q2FuY2VsbGVkIiwicm90b3JDZWxsRWRpdFN0YXJ0ZWQiLCJyb3RvckNlbGxFZGl0TW92ZWQiLCJlZGl0YWJsZVJvdyIsInNoaWZ0IiwiYWN0aXZlUmFuayIsImVkaXRpbmdSYW5rIiwiUm90b3JWaWV3IiwidG9VcHBlckNhc2UiLCJjb25mbGljdCIsImlzQWN0aXZlIiwiaXNFZGl0aW5nIiwiaXNMYXN0Iiwic2hpZnRlZEluZGV4Iiwicm90YXRpbmciLCJvbkNoYW5nZUNoYXIiLCJvbkNoYW5nZUxvY2tlZCIsIm9uRWRpdGluZ1N0YXJ0ZWQiLCJvbkVkaXRpbmdDYW5jZWxsZWQiLCJlZGl0aW5nTW92ZWQiLCJSb3RvckNlbGwiLCJldmVudCIsImhhbmRsZWQiLCJvbkVkaXRpbmdNb3ZlZCIsInByZXZlbnREZWZhdWx0Iiwic3RvcFByb3BhZ2F0aW9uIiwidmFsdWUiLCJfaW5wdXQiLCJzdWJzdHIiLCJzdGF0aWNDaGFyIiwiZWRpdGFibGVDaGFyIiwiaXNIaW50IiwiaXNDb25mbGljdCIsImNvbHVtblN0eWxlIiwic3RhdGljQ2VsbFN0eWxlIiwiYm9yZGVyUmlnaHRXaWR0aCIsImVkaXRhYmxlQ2VsbFN0eWxlIiwiY3Vyc29yIiwiYmFja2dyb3VuZENvbG9yIiwiYm90dG9tQ2VsbFN0eWxlIiwibWFyZ2luVG9wIiwiYm9yZGVyVG9wV2lkdGgiLCJzdGF0aWNDZWxsIiwiZWRpdGFibGVDZWxsIiwic3RhcnRFZGl0aW5nIiwicmVmSW5wdXQiLCJjZWxsQ2hhbmdlZCIsImtleURvd24iLCJsb2NrIiwibG9ja0NsaWNrZWQiLCJzZWxlY3QiLCJmb2N1cyIsInJvdG9yS2V5TG9hZGVkIiwiUm90b3IiLCJkZWNpcGhlcmVkVGV4dCIsImRlY2lwaGVyZWRUZXh0UmVzaXplZFJlZHVjZXIiLCJkZWNpcGhlcmVkVGV4dFNjcm9sbGVkUmVkdWNlciIsImRlY2lwaGVyZWRUZXh0TGF0ZVJlZHVjZXIiLCJnZXRDZWxsIiwiY2lwaGVyZWQiLCJjdXJyZW50IiwiY2xlYXIiLCJEZWNpcGhlcmVkVGV4dFZpZXdTZWxlY3RvciIsImRlY2lwaGVyZWRUZXh0UmVzaXplZCIsImRlY2lwaGVyZWRUZXh0U2Nyb2xsZWQiLCJEZWNpcGhlcmVkVGV4dFZpZXciLCJvbkp1bXAiLCJUZXh0Q2VsbCIsImNvbHVtbiIsImNlbGxTdHlsZSIsImJvcmRlcldpZHRoIiwiX2p1bXAiLCJib3JkZXJCb3R0b20iLCJEZWNpcGhlcmVkVGV4dCIsIldvcmtzcGFjZVNlbGVjdG9yIiwiU2VsZWN0ZWRUZXh0IiwiZWRpdGluZ0NlbGwiLCJuYlJvdG9ycyIsInBhZGRpbmciLCJib3JkZXJSaWdodCIsImJvcmRlckxlZnQiLCJiaXNlY3QiLCJsbyIsImhpIiwibWlkIiwiY2hhbmdlU2VsZWN0aW9uIiwidmFsdWVzIiwic2VsZWN0ZWQiLCIkc3BsaWNlIiwic29ydGVkQXJyYXlIYXNFbGVtZW50IiwidXBkYXRlR3JpZEdlb21ldHJ5IiwiZ3JpZCIsInNjcm9sbEJhcldpZHRoIiwiZmxvb3IiLCJjZWlsIiwibWF4VG9wIiwidXBkYXRlR3JpZFZpc2libGVSb3dzIiwic2VsZWN0ZWRSb3dzIiwiZmlyc3RSb3ciLCJsYXN0Um93IiwiX2luZGV4Iiwicm93SW5kZXgiLCJyb3dTdGFydFBvcyIsInJvd0NlbGxzIiwiY29sSW5kZXgiLCJ1cGRhdGVHcmlkVmlzaWJsZUNvbHVtbnMiLCJzZWxlY3RlZENvbHVtbnMiLCJjb2xDZWxscyIsInVwZGF0ZUdyaWRWaXNpYmxlQXJlYSIsIm1ha2VSb3RvciIsInNjaGVkdWxlIiwic2l6ZSIsIm51bGxQZXJtIiwiZmlsbCIsImZvcndhcmQiLCJiYWNrd2FyZCIsImR1bXBSb3RvcnMiLCJsb2FkUm90b3JzIiwicm90b3JEdW1wcyIsIiRjZWxscyIsImZvckVhY2giLCJjZWxsSW5kZXgiLCJqIiwibWFya1JvdG9yQ29uZmxpY3RzIiwidXBkYXRlUGVybXMiLCJlZGl0Um90b3JDZWxsIiwibG9ja1JvdG9yQ2VsbCIsImNvdW50cyIsImhhcyIsInJhbmtzIiwidXBkYXRlUm90b3JXaXRoS2V5Iiwic291cmNlIiwiZ2V0Um90b3JTaGlmdCIsImFwcGx5Um90b3JzIiwibG9ja3MiLCJhcHBseVJvdG9yIiwiYXBwbHlTaGlmdCIsImNvbGxpc2lvbiIsIm1vZCIsImFtb3VudCIsIndyYXBBcm91bmQiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUNBOztBQUNBOztBQUVBOztBQUNBOztBQUNBOztBQUVBOztBQUNBOztBQUNBOztBQUNBOztBQUNBOztBQUNBOztBQUNBOztBQUVBLElBQU1BLFVBQVUsR0FBRztBQUNmQyxnQkFBYyxFQUFFO0FBQ1pDLFdBQU8sRUFBRUMsY0FE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R3ZSLEtBQUssQ0FBQ0MsS0FBTixDQUFZd1YsSUFBWixDQUFQO0FBQ0FBLFFBQUksR0FBRzhLLFVBQVUsQ0FBQ3ZnQixLQUFLLENBQUM4ZSxJQUFQLEVBQWEzRyxLQUFiLEVBQW9CMUMsSUFBcEIsQ0FBakI7QUFDRDtBQUNEOzs7QUFDQTVRLFFBQU0sQ0FBQzRRLElBQVAsR0FBY0EsSUFBZDs7QUFDQSxNQUFJbEUsSUFBSixFQUFVO0FBQ1I7QUFDQTFNLFVBQU0sQ0FBQzZRLEtBQVAsQ0FBYW5SLElBQWIsQ0FBa0JnTixJQUFsQjs7QUFDQSxRQUFJQSxJQUFJLENBQUMrRixNQUFMLElBQWUvRixJQUFJLENBQUM4RixJQUF4QixFQUE4QjtBQUM1QnhTLFlBQU0sQ0FBQ3diLEtBQVAsSUFBZ0IsQ0FBaEI7QUFDRDs7QUFDRCxRQUFJOU8sSUFBSSxDQUFDaVAsU0FBVCxFQUFvQjtBQUNsQjNiLFlBQU0sQ0FBQzJiLFNBQVAsR0FBbUIsSUFBbkI7QUFDRDtBQUNGO0FBQ0Y7O0FBRUQsU0FBU0QsVUFBVCxDQUFxQkUsR0FBckIsRUFBMEJDLE1BQTFCLEVBQWtDakwsSUFBbEMsRUFBd0M7QUFDdEMsTUFBSUEsSUFBSSxLQUFLLENBQUMsQ0FBZCxFQUFpQjtBQUNmLFFBQUlpTCxNQUFNLEdBQUcsQ0FBYixFQUFnQjtBQUNkQSxZQUFNLElBQUlELEdBQVY7QUFDRDs7QUFDRGhMLFFBQUksR0FBRyxDQUFDQSxJQUFJLEdBQUdpTCxNQUFSLElBQWtCRCxHQUF6QjtBQUNEOztBQUNELFNBQU9oTCxJQUFQO0FBQ0Q7O0FBRU0sU0FBU2tMLFVBQVQsQ0FBcUJsSCxLQUFyQixFQUE0QmdILEdBQTVCLEVBQWlDO0FBQ3RDLFNBQU8sQ0FBRWhILEtBQUssR0FBR2dILEdBQVQsR0FBZ0JBLEdBQWpCLElBQXdCQSxHQUEvQjtBQUNELEMiLCJmaWxlIjoiYnVuZGxlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiXG5pbXBvcnQgdXBkYXRlIGZyb20gJ2ltbXV0YWJpbGl0eS1oZWxwZXInO1xuaW1wb3J0IGFsZ29yZWFSZWFjdFRhc2sgZnJvbSAnLi9hbGdvcmVhX3JlYWN0X3Rhc2snO1xuXG5pbXBvcnQgJ2ZvbnQtYXdlc29tZS9jc3MvZm9udC1hd2Vzb21lLmNzcyc7XG5pbXBvcnQgJ2Jvb3RzdHJhcC9kaXN0L2Nzcy9ib290c3RyYXAuY3NzJztcbmltcG9ydCAnLi9zdHlsZS5jc3MnO1xuXG5pbXBvcnQgQ2lwaGVyZWRUZXh0QnVuZGxlIGZyb20gJy4vY2lwaGVyZWRfdGV4dF9idW5kbGUnO1xuaW1wb3J0IEZyZXF1ZW5jeUFuYWx5c2lzQnVuZGxlIGZyb20gJy4vZnJlcXVlbmN5X2FuYWx5c2lzX2J1bmRsZSc7XG5pbXBvcnQgU2NoZWR1bGluZ0J1bmRsZSBmcm9tICcuL3NjaGVkdWxpbmdfYnVuZGxlJztcbmltcG9ydCBSb3RvcnNCdW5kbGUgZnJvbSAnLi9yb3RvcnNfYnVuZGxlJztcbmltcG9ydCBEZWNpcGhlcmVkVGV4dEJ1bmRsZSBmcm9tICcuL2RlY2lwaGVyZWRfdGV4dF9idW5kbGUnO1xuaW1wb3J0IFdvcmtzcGFjZUJ1bmRsZSBmcm9tICcuL3dvcmtzcGFjZV9idW5kbGUnO1xuaW1wb3J0IHtkdW1wUm90b3JzLCBsb2FkUm90b3JzfSBmcm9tICcuL3V0aWxzJztcblxuY29uc3QgVGFza0J1bmRsZSA9IHtcbiAgICBhY3Rpb25SZWR1Y2Vyczoge1xuICAgICAgICBhcHBJbml0OiBhcHBJbml0UmVkdWNlcixcbiAgICAgICAgdGFza0luaXQ6IHRhc2tJbml0UmVkdWNlciAvKiBwb3NzaWJseSBtb3ZlIHRvIGFsZ29yZWEtcmVhY3QtdGFzayAqLyxcbiAgICAgICAgdGFza1JlZnJlc2g6IHRhc2tSZWZyZXNoUmVkdWNlciAvKiBwb3NzaWJseSBtb3ZlIHRvIGFsZ29yZWEtcmVhY3QtdGFzayAqLyxcbiAgICAgICAgdGFza0Fuc3dlckxvYWRlZDogdGFza0Fuc3dlckxvYWRlZCxcbiAgICAgICAgdGFza1N0YXRlTG9hZGVkOiB0YXNrU3RhdGVMb2FkZWQsXG4gICAgfSxcbiAgICBpbmNsdWRlczogW1xuICAgICAgICBDaXBoZXJlZFRleHRCdW5kbGUsXG4gICAgICAgIEZyZXF1ZW5jeUFuYWx5c2lzQnVuZGxlLFxuICAgICAgICBTY2hlZHVsaW5nQnVuZGxlLFxuICAgICAgICBSb3RvcnNCdW5kbGUsXG4gICAgICAgIERlY2lwaGVyZWRUZXh0QnVuZGxlLFxuICAgICAgICBXb3Jrc3BhY2VCdW5kbGUsXG4gICAgXSxcbiAgICBzZWxlY3RvcnM6IHtcbiAgICAgIGdldFRhc2tTdGF0ZSxcbiAgICAgIGdldFRhc2tBbnN3ZXIsXG4gICAgfVxufTtcblxuaWYgKHByb2Nlc3MuZW52Lk5PREVfRU5WID09PSAnZGV2ZWxvcG1lbnQnKSB7XG4gICAgLyogZXNsaW50LWRpc2FibGUgbm8tY29uc29sZSAqL1xuICAgIFRhc2tCdW5kbGUuZWFybHlSZWR1Y2VyID0gZnVuY3Rpb24gKHN0YXRlLCBhY3Rpb24pIHtcbiAgICAgICAgY29uc29sZS5sb2coJ0FDVElPTicsIGFjdGlvbi50eXBlLCBhY3Rpb24pO1xuICAgICAgICByZXR1cm4gc3RhdGU7XG4gICAgfTtcbn1cblxuZnVuY3Rpb24gYXBwSW5pdFJlZHVjZXIgKHN0YXRlLCBfYWN0aW9uKSB7XG4gICAgY29uc3QgdGFza01ldGFEYXRhID0ge1xuICAgICAgIFwiaWRcIjogXCJodHRwOi8vY29uY291cnMtYWxraW5kaS5mci90YXNrcy8yMDE4L2VuaWdtYVwiLFxuICAgICAgIFwibGFuZ3VhZ2VcIjogXCJmclwiLFxuICAgICAgIFwidmVyc2lvblwiOiBcImZyLjAxXCIsXG4gICAgICAgXCJhdXRob3JzXCI6IFwiU8OpYmFzdGllbiBDYXJsaWVyXCIsXG4gICAgICAgXCJ0cmFuc2xhdG9yc1wiOiBbXSxcbiAgICAgICBcImxpY2Vuc2VcIjogXCJcIixcbiAgICAgICBcInRhc2tQYXRoUHJlZml4XCI6IFwiXCIsXG4gICAgICAgXCJtb2R1bGVzUGF0aFByZWZpeFwiOiBcIlwiLFxuICAgICAgIFwiYnJvd3NlclN1cHBvcnRcIjogW10sXG4gICAgICAgXCJmdWxsRmVlZGJhY2tcIjogdHJ1ZSxcbiAgICAgICBcImFjY2VwdGVkQW5zd2Vyc1wiOiBbXSxcbiAgICAgICBcInVzZXNSYW5kb21TZWVkXCI6IHRydWVcbiAgICB9O1xuICAgIHJldHVybiB7Li4uc3RhdGUsIHRhc2tNZXRhRGF0YX07XG59XG5cbmZ1bmN0aW9uIHRhc2tJbml0UmVkdWNlciAoc3RhdGUsIF9hY3Rpb24pIHtcbiAgY29uc3Qge3Rhc2tEYXRhOiB7YWxwaGFiZXQsIHJvdG9yczogcm90b3JTcGVjcywgaGludHN9fSA9IHN0YXRlO1xuICBjb25zdCByb3RvcnMgPSBsb2FkUm90b3JzKGFscGhhYmV0LCByb3RvclNwZWNzLCBoaW50cywgcm90b3JTcGVjcy5tYXAoXyA9PiBbXSkpO1xuICByZXR1cm4gey4uLnN0YXRlLCByb3RvcnMsIHRhc2tSZWFkeTogdHJ1ZX07XG59XG5cbmZ1bmN0aW9uIHRhc2tSZWZyZXNoUmVkdWNlciAoc3RhdGUsIF9hY3Rpb24pIHtcbiAgY29uc3Qge3Rhc2tEYXRhOiB7YWxwaGFiZXQsIHJvdG9yczogcm90b3JTcGVjcywgaGludHN9fSA9IHN0YXRlO1xuICBjb25zdCBkdW1wID0gZHVtcFJvdG9ycyhhbHBoYWJldCwgc3RhdGUucm90b3JzKTtcbiAgY29uc3Qgcm90b3JzID0gbG9hZFJvdG9ycyhhbHBoYWJldCwgcm90b3JTcGVjcywgaGludHMsIGR1bXApO1xuICByZXR1cm4gey4uLnN0YXRlLCByb3RvcnN9O1xufVxuXG5mdW5jdGlvbiBnZXRUYXNrQW5zd2VyIChzdGF0ZSkge1xuICBjb25zdCB7dGFza0RhdGE6IHthbHBoYWJldH19ID0gc3RhdGU7XG4gIHJldHVybiB7XG4gICAgcm90b3JzOiBzdGF0ZS5yb3RvcnMubWFwKHJvdG9yID0+IHJvdG9yLmNlbGxzLm1hcCgoe2VkaXRhYmxlfSkgPT4gYWxwaGFiZXQuaW5kZXhPZihlZGl0YWJsZSkpKVxuICB9O1xufVxuXG5mdW5jdGlvbiB0YXNrQW5zd2VyTG9hZGVkIChzdGF0ZSwge3BheWxvYWQ6IHthbnN3ZXJ9fSkge1xuICBjb25zdCB7dGFza0RhdGE6IHthbHBoYWJldCwgcm90b3JzOiByb3RvclNwZWNzLCBoaW50c319ID0gc3RhdGU7XG4gIGNvbnN0IHJvdG9ycyA9IGxvYWRSb3RvcnMoYWxwaGFiZXQsIHJvdG9yU3BlY3MsIGhpbnRzLCBhbnN3ZXIucm90b3JzKTtcbiAgcmV0dXJuIHVwZGF0ZShzdGF0ZSwge3JvdG9yczogeyRzZXQ6IHJvdG9yc319KTtcbn1cblxuZnVuY3Rpb24gZ2V0VGFza1N0YXRlIChzdGF0ZSkge2NvbnNvbGUubG9nKHN0YXRlKTtcbiAgY29uc3Qge3Rhc2tEYXRhOiB7YWxwaGFiZXR9fSA9IHN0YXRlO1xuICByZXR1cm4ge3JvdG9yczogZHVtcFJvdG9ycyhhbHBoYWJldCwgc3RhdGUucm90b3JzKX07XG59XG5cbmZ1bmN0aW9uIHRhc2tTdGF0ZUxvYWRlZCAoc3RhdGUsIHtwYXlsb2FkOiB7ZHVtcH19KSB7XG4gIGNvbnN0IHt0YXNrRGF0YToge2FscGhhYmV0LCByb3RvcnM6IHJvdG9yU3BlY3MsIGhpbnRzfX0gPSBzdGF0ZTtcbiAgY29uc3Qgcm90b3JzID0gbG9hZFJvdG9ycyhhbHBoYWJldCwgcm90b3JTcGVjcywgaGludHMsIGR1bXAucm90b3JzKTtcbiAgcmV0dXJuIHVwZGF0ZShzdGF0ZSwge3JvdG9yczogeyRzZXQ6IHJvdG9yc319KTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHJ1biAoY29udGFpbmVyLCBvcHRpb25zKSB7XG4gICAgcmV0dXJuIGFsZ29yZWFSZWFjdFRhc2soY29udGFpbmVyLCBvcHRpb25zLCBUYXNrQnVuZGxlKTtcbn1cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9pbmRleC5qcyIsIi8qXG5DaGFuZ2UgbWV0aG9kIG9mIHVzZTpcbi0gZXhwb3J0IGEgYnVuZGxlIHRoYXQgdGhlIHRhc2sgY2FuIGluY2x1ZGU7XG4tIGV4cG9ydCBhIGZ1bmN0aW9uKHNhZ2E/KSB0aGF0IChjcmVhdGVzIHRoZSBBUEkgb2JqZWN0cyBhbmQgKSBkaXNwYXRjaGVzIHRoZVxuICBhcHBJbml0IGFjdGlvbjtcblxuKi9cblxuLy9pbXBvcnQgJy4vc2hpbSdcbmltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgUmVhY3RET00gZnJvbSAncmVhY3QtZG9tJztcbmltcG9ydCB7UHJvdmlkZXJ9IGZyb20gJ3JlYWN0LXJlZHV4JztcbmltcG9ydCBxdWVyeVN0cmluZyBmcm9tICdxdWVyeS1zdHJpbmcnO1xuaW1wb3J0IHtjcmVhdGVTdG9yZSwgYXBwbHlNaWRkbGV3YXJlfSBmcm9tICdyZWR1eCc7XG5pbXBvcnQge2RlZmF1bHQgYXMgY3JlYXRlU2FnYU1pZGRsZXdhcmV9IGZyb20gJ3JlZHV4LXNhZ2EnO1xuaW1wb3J0IHtjYWxsfSBmcm9tICdyZWR1eC1zYWdhL2VmZmVjdHMnO1xuXG5pbXBvcnQgbGluayBmcm9tICcuL2xpbmtlcic7XG5pbXBvcnQgJy4vdWkvc3R5bGVzLmNzcyc7XG5cbmltcG9ydCBBcHBCdW5kbGUgZnJvbSAnLi9hcHBfYnVuZGxlJztcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gKGNvbnRhaW5lciwgb3B0aW9ucywgVGFza0J1bmRsZSkge1xuICAgIGNvbnN0IHBsYXRmb3JtID0gd2luZG93LnBsYXRmb3JtO1xuICAgIGlmIChwcm9jZXNzLmVudi5OT0RFX0VOViA9PT0gJ2RldmVsb3BtZW50JykgcGxhdGZvcm0uZGVidWcgPSB0cnVlO1xuXG4gICAgY29uc3Qge2FjdGlvbnMsIHZpZXdzLCBzZWxlY3RvcnMsIHJlZHVjZXIsIHJvb3RTYWdhfSA9IGxpbmsoe2luY2x1ZGVzOiBbQXBwQnVuZGxlLCBUYXNrQnVuZGxlXX0pO1xuXG4gICAgLyogQnVpbGQgdGhlIHN0b3JlLiAqL1xuICAgIGNvbnN0IHNhZmVSZWR1Y2VyID0gZnVuY3Rpb24gKHN0YXRlLCBhY3Rpb24pIHtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIHJldHVybiByZWR1Y2VyKHN0YXRlLCBhY3Rpb24pO1xuICAgICAgICB9IGNhdGNoIChleCkge1xuICAgICAgICAgICAgY29uc29sZS5lcnJvcignYWN0aW9uIGZhaWxlZCB0byByZWR1Y2UnLCBhY3Rpb24sIGV4KTtcbiAgICAgICAgICAgIHJldHVybiB7Li4uc3RhdGUsIGVycm9yczogW2V4XX07XG4gICAgICAgIH1cbiAgICB9O1xuICAgIGNvbnN0IHNhZ2FNaWRkbGV3YXJlID0gY3JlYXRlU2FnYU1pZGRsZXdhcmUoKTtcbiAgICBjb25zdCBlbmhhbmNlciA9IGFwcGx5TWlkZGxld2FyZShzYWdhTWlkZGxld2FyZSk7XG4gICAgY29uc3Qgc3RvcmUgPSBjcmVhdGVTdG9yZShzYWZlUmVkdWNlciwge2FjdGlvbnMsIHZpZXdzLCBzZWxlY3RvcnN9LCBlbmhhbmNlcik7XG5cbiAgICAvKiBTdGFydCB0aGUgc2FnYXMuICovXG4gICAgZnVuY3Rpb24gc3RhcnQgKCkge1xuICAgICAgICBzYWdhTWlkZGxld2FyZS5ydW4oZnVuY3Rpb24qICgpIHtcbiAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgeWllbGQgY2FsbChyb290U2FnYSk7XG4gICAgICAgICAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoJ3NhZ2FzIGNyYXNoZWQnLCBlcnJvcik7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH1cbiAgICBzdGFydCgpO1xuXG4gICAgLyogRGlzcGF0Y2ggdGhlIGFwcEluaXQgYWN0aW9uLiAqL1xuICAgIGNvbnN0IHF1ZXJ5ID0gcXVlcnlTdHJpbmcucGFyc2UobG9jYXRpb24uc2VhcmNoKTtcbiAgICBjb25zdCB0YXNrVG9rZW4gPSBxdWVyeS5zVG9rZW47XG4gICAgc3RvcmUuZGlzcGF0Y2goe3R5cGU6IGFjdGlvbnMuYXBwSW5pdCwgcGF5bG9hZDoge29wdGlvbnMsIHRhc2tUb2tlbiwgcGxhdGZvcm19fSk7XG5cbiAgICAvKiBTdGFydCByZW5kZXJpbmcuICovXG4gICAgUmVhY3RET00ucmVuZGVyKDxQcm92aWRlciBzdG9yZT17c3RvcmV9Pjx2aWV3cy5BcHAvPjwvUHJvdmlkZXI+LCBjb250YWluZXIpO1xuXG4gICAgcmV0dXJuIHthY3Rpb25zLCB2aWV3cywgc3RvcmUsIHN0YXJ0fTtcbn1cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9hbGdvcmVhX3JlYWN0X3Rhc2svaW5kZXguanMiLCIvKiBDb3B5cmlnaHQgKEMpIDIwMTcgZXBpeG9kZSAtIEFsbCBSaWdodHMgUmVzZXJ2ZWRcbiAqIFlvdSBtYXkgdXNlLCBkaXN0cmlidXRlIGFuZCBtb2RpZnkgdGhpcyBjb2RlIHVuZGVyIHRoZVxuICogdGVybXMgb2YgdGhlIE1JVCBsaWNlbnNlLlxuICovXG5cbmltcG9ydCB7YWxsLCBjYWxsfSBmcm9tICdyZWR1eC1zYWdhL2VmZmVjdHMnO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBsaW5rIChyb290QnVuZGxlLCBmZWF0dXJlcykge1xuICBmZWF0dXJlcyA9IGZlYXR1cmVzIHx8IFtBY3Rpb25zLCBWaWV3cywgU2VsZWN0b3JzLCBFYXJseVJlZHVjZXJzLCBSZWR1Y2VycywgQWN0aW9uUmVkdWNlcnMsIExhdGVSZWR1Y2VycywgU2FnYXNdO1xuICBjb25zdCBhcHAgPSB7fTtcbiAgZm9yIChsZXQgZmVhdHVyZSBvZiBmZWF0dXJlcykge1xuICAgIGZlYXR1cmUucHJlcGFyZShhcHApO1xuICB9XG4gIGxpbmtCdW5kbGUocm9vdEJ1bmRsZSwgZmVhdHVyZXMsIGFwcCk7XG4gIGZvciAobGV0IGZlYXR1cmUgb2YgZmVhdHVyZXMpIHtcbiAgICBmZWF0dXJlLmZpbmFsaXplKGFwcCk7XG4gIH1cbiAgcmV0dXJuIGFwcDtcbn1cblxuZnVuY3Rpb24gbGlua0J1bmRsZSAoYnVuZGxlLCBmZWF0dXJlcywgYXBwKSB7XG4gIGZvciAobGV0IGZlYXR1cmUgb2YgZmVhdHVyZXMpIHtcbiAgICBmZWF0dXJlLmFkZChhcHAsIGJ1bmRsZSk7XG4gIH1cbiAgaWYgKGJ1bmRsZS5pbmNsdWRlcykge1xuICAgIGZvciAobGV0IHN1YkJ1bmRsZSBvZiBidW5kbGUuaW5jbHVkZXMpIHtcbiAgICAgIGxpbmtCdW5kbGUoc3ViQnVuZGxlLCBmZWF0dXJlcywgYXBwKTtcbiAgICB9XG4gIH1cbn1cblxuY29uc3QgQWN0aW9ucyA9IHtcbiAgcHJlcGFyZTogZnVuY3Rpb24gKGFwcCkge1xuICAgIGFwcC5hY3Rpb25zID0ge307XG4gIH0sXG4gIGFkZDogZnVuY3Rpb24gKGFwcCwge2FjdGlvbnN9KSB7XG4gICAgaWYgKGFjdGlvbnMpIHtcbiAgICAgIE9iamVjdC5hc3NpZ24oYXBwLmFjdGlvbnMsIGFjdGlvbnMpO1xuICAgIH1cbiAgfSxcbiAgZmluYWxpemU6IGZ1bmN0aW9uIChfYXBwKSB7XG4gIH1cbn07XG5cbmNvbnN0IFZpZXdzID0ge1xuICBwcmVwYXJlOiBmdW5jdGlvbiAoYXBwKSB7XG4gICAgYXBwLnZpZXdzID0ge307XG4gIH0sXG4gIGFkZDogZnVuY3Rpb24gKGFwcCwge3ZpZXdzfSkge1xuICAgIGlmICh2aWV3cykge1xuICAgICAgT2JqZWN0LmFzc2lnbihhcHAudmlld3MsIHZpZXdzKTtcbiAgICB9XG4gIH0sXG4gIGZpbmFsaXplOiBmdW5jdGlvbiAoX2FwcCkge1xuICB9XG59O1xuXG5jb25zdCBSZWR1Y2VycyA9IHtcbiAgcHJlcGFyZTogZnVuY3Rpb24gKGFwcCkge1xuICAgIGFwcC5yZWR1Y2VyID0gdW5kZWZpbmVkO1xuICB9LFxuICBhZGQ6IGZ1bmN0aW9uIChhcHAsIHtyZWR1Y2VyLCByZWR1Y2Vyc30pIHtcbiAgICBpZiAocmVkdWNlcikge1xuICAgICAgYXBwLnJlZHVjZXIgPSBzZXF1ZW5jZVJlZHVjZXJzKGFwcC5yZWR1Y2VyLCByZWR1Y2VyKTtcbiAgICB9XG4gICAgaWYgKHJlZHVjZXJzKSB7XG4gICAgICBhcHAucmVkdWNlciA9IHNlcXVlbmNlUmVkdWNlcnMoYXBwLnJlZHVjZXIsIC4uLnJlZHVjZXJzKTtcbiAgICB9XG4gIH0sXG4gIGZpbmFsaXplOiBmdW5jdGlvbiAoX2FwcCkge1xuICB9XG59O1xuXG5jb25zdCBFYXJseVJlZHVjZXJzID0ge1xuICBwcmVwYXJlOiBmdW5jdGlvbiAoYXBwKSB7XG4gICAgYXBwLmVhcmx5UmVkdWNlciA9IHVuZGVmaW5lZDtcbiAgfSxcbiAgYWRkOiBmdW5jdGlvbiAoYXBwLCB7ZWFybHlSZWR1Y2VyfSkge1xuICAgIGFwcC5lYXJseVJlZHVjZXIgPSBzZXF1ZW5jZVJlZHVjZXJzKGFwcC5lYXJseVJlZHVjZXIsIGVhcmx5UmVkdWNlcik7XG4gIH0sXG4gIGZpbmFsaXplOiBmdW5jdGlvbiAoYXBwKSB7XG4gICAgYXBwLnJlZHVjZXIgPSBzZXF1ZW5jZVJlZHVjZXJzKGFwcC5lYXJseVJlZHVjZXIsIGFwcC5yZWR1Y2VyKTtcbiAgICBkZWxldGUgYXBwLmVhcmx5UmVkdWNlcjtcbiAgfVxufTtcblxuY29uc3QgTGF0ZVJlZHVjZXJzID0ge1xuICBwcmVwYXJlOiBmdW5jdGlvbiAoYXBwKSB7XG4gICAgYXBwLmxhdGVSZWR1Y2VyID0gdW5kZWZpbmVkO1xuICB9LFxuICBhZGQ6IGZ1bmN0aW9uIChhcHAsIHtsYXRlUmVkdWNlcn0pIHtcbiAgICBhcHAubGF0ZVJlZHVjZXIgPSBzZXF1ZW5jZVJlZHVjZXJzKGFwcC5sYXRlUmVkdWNlciwgbGF0ZVJlZHVjZXIpO1xuICB9LFxuICBmaW5hbGl6ZTogZnVuY3Rpb24gKGFwcCkge1xuICAgIGFwcC5yZWR1Y2VyID0gc2VxdWVuY2VSZWR1Y2VycyhhcHAucmVkdWNlciwgYXBwLmxhdGVSZWR1Y2VyKTtcbiAgICBkZWxldGUgYXBwLmxhdGVSZWR1Y2VyO1xuICB9XG59O1xuXG5jb25zdCBBY3Rpb25SZWR1Y2VycyA9IHtcbiAgcHJlcGFyZTogZnVuY3Rpb24gKGFwcCkge1xuICAgIGFwcC5hY3Rpb25SZWR1Y2VycyA9IG5ldyBNYXAoKTtcbiAgfSxcbiAgYWRkOiBmdW5jdGlvbiAoYXBwLCB7YWN0aW9uUmVkdWNlcnN9KSB7XG4gICAgaWYgKGFjdGlvblJlZHVjZXJzKSB7XG4gICAgICBmb3IgKGxldCBrZXkgb2YgT2JqZWN0LmtleXMoYWN0aW9uUmVkdWNlcnMpKSB7XG4gICAgICAgIGxldCByZWR1Y2VyID0gYXBwLmFjdGlvblJlZHVjZXJzLmdldChrZXkpO1xuICAgICAgICByZWR1Y2VyID0gc2VxdWVuY2VSZWR1Y2VycyhyZWR1Y2VyLCBhY3Rpb25SZWR1Y2Vyc1trZXldKTtcbiAgICAgICAgYXBwLmFjdGlvblJlZHVjZXJzLnNldChrZXksIHJlZHVjZXIpO1xuICAgICAgfVxuICAgIH1cbiAgfSxcbiAgZmluYWxpemU6IGZ1bmN0aW9uIChhcHApIHtcbiAgICBjb25zdCBhY3Rpb25SZWR1Y2VyID0gbWFrZUFjdGlvblJlZHVjZXIoYXBwKTtcbiAgICBhcHAucmVkdWNlciA9IHNlcXVlbmNlUmVkdWNlcnMoYXBwLnJlZHVjZXIsIGFjdGlvblJlZHVjZXIpO1xuICAgIGRlbGV0ZSBhcHAuYWN0aW9uUmVkdWNlcnM7XG4gIH1cbn07XG5cbmNvbnN0IFNhZ2FzID0ge1xuICBwcmVwYXJlOiBmdW5jdGlvbiAoYXBwKSB7XG4gICAgYXBwLnNhZ2FzID0gW107XG4gIH0sXG4gIGFkZDogZnVuY3Rpb24gKGFwcCwge3NhZ2EsIHNhZ2FzfSkge1xuICAgIGlmIChzYWdhKSB7XG4gICAgICBhcHAuc2FnYXMucHVzaChzYWdhKTtcbiAgICB9XG4gICAgaWYgKHNhZ2FzKSB7XG4gICAgICBBcnJheS5wcm90b3R5cGUucHVzaC5hcHBseShhcHAuc2FnYXMsIHNhZ2FzKTtcbiAgICB9XG4gIH0sXG4gIGZpbmFsaXplOiBmdW5jdGlvbiAoYXBwKSB7XG4gICAgY29uc3QgZWZmZWN0cyA9IGFwcC5zYWdhcy5tYXAoZnVuY3Rpb24gKHNhZ2EpIHsgcmV0dXJuIGNhbGwoc2FnYSk7IH0pO1xuICAgIGFwcC5yb290U2FnYSA9IGZ1bmN0aW9uKiAoKSB7IHlpZWxkIGFsbChlZmZlY3RzKTsgfTtcbiAgICBkZWxldGUgYXBwLnNhZ2FzO1xuICB9XG59O1xuXG5jb25zdCBTZWxlY3RvcnMgPSB7XG4gIHByZXBhcmU6IGZ1bmN0aW9uIChhcHApIHtcbiAgICBhcHAuc2VsZWN0b3JzID0ge307XG4gIH0sXG4gIGFkZDogZnVuY3Rpb24gKGFwcCwge3NlbGVjdG9yc30pIHtcbiAgICBpZiAoc2VsZWN0b3JzKSB7XG4gICAgICBPYmplY3QuYXNzaWduKGFwcC5zZWxlY3RvcnMsIHNlbGVjdG9ycyk7XG4gICAgfVxuICB9LFxuICBmaW5hbGl6ZTogZnVuY3Rpb24gKF9hcHApIHtcbiAgfVxufTtcblxuZnVuY3Rpb24gbWFrZUFjdGlvblJlZHVjZXIgKHthY3Rpb25zLCBhY3Rpb25SZWR1Y2Vyc30pIHtcbiAgY29uc3QgbWFwID0gbmV3IE1hcCgpO1xuICBmb3IgKGxldCBba2V5LCByZWR1Y2VyXSBvZiBhY3Rpb25SZWR1Y2Vycy5lbnRyaWVzKCkpIHtcbiAgICBtYXAuc2V0KGFjdGlvbnNba2V5XSwgcmVkdWNlcik7XG4gIH1cbiAgcmV0dXJuIGZ1bmN0aW9uIChzdGF0ZSwgYWN0aW9uKSB7XG4gICAgY29uc3QgcmVkdWNlciA9IG1hcC5nZXQoYWN0aW9uLnR5cGUpO1xuICAgIHJldHVybiB0eXBlb2YgcmVkdWNlciA9PT0gJ2Z1bmN0aW9uJyA/IHJlZHVjZXIoc3RhdGUsIGFjdGlvbikgOiBzdGF0ZTtcbiAgfTtcbn1cblxuZnVuY3Rpb24gc2VxdWVuY2VSZWR1Y2VycyAoLi4ucmVkdWNlcnMpIHtcbiAgbGV0IHJlc3VsdCA9IHVuZGVmaW5lZDtcbiAgZm9yICh2YXIgaSA9IDA7IGkgPCByZWR1Y2Vycy5sZW5ndGg7IGkgKz0gMSkge1xuICAgIHZhciByZWR1Y2VyID0gcmVkdWNlcnNbaV07XG4gICAgaWYgKCFyZWR1Y2VyKSB7XG4gICAgICBjb250aW51ZTtcbiAgICB9XG4gICAgaWYgKHR5cGVvZiByZWR1Y2VyICE9PSAnZnVuY3Rpb24nKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ3JlZHVjZXIgbXVzdCBiZSBhIGZ1bmN0aW9uJywgcmVkdWNlcik7XG4gICAgfVxuICAgIGlmICghcmVzdWx0KSB7XG4gICAgICByZXN1bHQgPSByZWR1Y2VyO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXN1bHQgPSBjb21wb3NlUmVkdWNlcnMocmVzdWx0LCByZWR1Y2VyKTtcbiAgICB9XG4gIH1cbiAgcmV0dXJuIHJlc3VsdDtcbn1cblxuZnVuY3Rpb24gY29tcG9zZVJlZHVjZXJzIChmc3QsIHNuZCkge1xuICByZXR1cm4gZnVuY3Rpb24gKHN0YXRlLCBhY3Rpb24pIHsgcmV0dXJuIHNuZChmc3Qoc3RhdGUsIGFjdGlvbiksIGFjdGlvbik7IH07XG59XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvYWxnb3JlYV9yZWFjdF90YXNrL2xpbmtlci5qcyIsIi8vIHN0eWxlLWxvYWRlcjogQWRkcyBzb21lIGNzcyB0byB0aGUgRE9NIGJ5IGFkZGluZyBhIDxzdHlsZT4gdGFnXG5cbi8vIGxvYWQgdGhlIHN0eWxlc1xudmFyIGNvbnRlbnQgPSByZXF1aXJlKFwiISEuLi8uLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9pbmRleC5qcz8/cmVmLS0xLTEhLi9zdHlsZXMuY3NzXCIpO1xuaWYodHlwZW9mIGNvbnRlbnQgPT09ICdzdHJpbmcnKSBjb250ZW50ID0gW1ttb2R1bGUuaWQsIGNvbnRlbnQsICcnXV07XG4vLyBQcmVwYXJlIGNzc1RyYW5zZm9ybWF0aW9uXG52YXIgdHJhbnNmb3JtO1xuXG52YXIgb3B0aW9ucyA9IHtcInNvdXJjZU1hcFwiOnRydWUsXCJobXJcIjp0cnVlfVxub3B0aW9ucy50cmFuc2Zvcm0gPSB0cmFuc2Zvcm1cbi8vIGFkZCB0aGUgc3R5bGVzIHRvIHRoZSBET01cbnZhciB1cGRhdGUgPSByZXF1aXJlKFwiIS4uLy4uLy4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvbGliL2FkZFN0eWxlcy5qc1wiKShjb250ZW50LCBvcHRpb25zKTtcbmlmKGNvbnRlbnQubG9jYWxzKSBtb2R1bGUuZXhwb3J0cyA9IGNvbnRlbnQubG9jYWxzO1xuLy8gSG90IE1vZHVsZSBSZXBsYWNlbWVudFxuaWYobW9kdWxlLmhvdCkge1xuXHQvLyBXaGVuIHRoZSBzdHlsZXMgY2hhbmdlLCB1cGRhdGUgdGhlIDxzdHlsZT4gdGFnc1xuXHRpZighY29udGVudC5sb2NhbHMpIHtcblx0XHRtb2R1bGUuaG90LmFjY2VwdChcIiEhLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvaW5kZXguanM/P3JlZi0tMS0xIS4vc3R5bGVzLmNzc1wiLCBmdW5jdGlvbigpIHtcblx0XHRcdHZhciBuZXdDb250ZW50ID0gcmVxdWlyZShcIiEhLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvaW5kZXguanM/P3JlZi0tMS0xIS4vc3R5bGVzLmNzc1wiKTtcblx0XHRcdGlmKHR5cGVvZiBuZXdDb250ZW50ID09PSAnc3RyaW5nJykgbmV3Q29udGVudCA9IFtbbW9kdWxlLmlkLCBuZXdDb250ZW50LCAnJ11dO1xuXHRcdFx0dXBkYXRlKG5ld0NvbnRlbnQpO1xuXHRcdH0pO1xuXHR9XG5cdC8vIFdoZW4gdGhlIG1vZHVsZSBpcyBkaXNwb3NlZCwgcmVtb3ZlIHRoZSA8c3R5bGU+IHRhZ3Ncblx0bW9kdWxlLmhvdC5kaXNwb3NlKGZ1bmN0aW9uKCkgeyB1cGRhdGUoKTsgfSk7XG59XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9zcmMvYWxnb3JlYV9yZWFjdF90YXNrL3VpL3N0eWxlcy5jc3Ncbi8vIG1vZHVsZSBpZCA9IDQwMFxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJleHBvcnRzID0gbW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvbGliL2Nzcy1iYXNlLmpzXCIpKGZhbHNlKTtcbi8vIGltcG9ydHNcblxuXG4vLyBtb2R1bGVcbmV4cG9ydHMucHVzaChbbW9kdWxlLmlkLCBcIi50YXNrLWJhciB7XFxuICAgIHRleHQtYWxpZ246IGNlbnRlcjtcXG4gICAgbWFyZ2luLXRvcDogMjBweDtcXG59XCIsIFwiXCJdKTtcblxuLy8gZXhwb3J0c1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlcj8/cmVmLS0xLTEhLi9zcmMvYWxnb3JlYV9yZWFjdF90YXNrL3VpL3N0eWxlcy5jc3Ncbi8vIG1vZHVsZSBpZCA9IDQwMVxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IHtBbGVydH0gZnJvbSAncmVhY3QtYm9vdHN0cmFwJztcbmltcG9ydCB7Y29ubmVjdH0gZnJvbSAncmVhY3QtcmVkdXgnO1xuaW1wb3J0IHtjYWxsLCBmb3JrLCB0YWtlRXZlcnksIHNlbGVjdCwgdGFrZSwgcHV0fSBmcm9tICdyZWR1eC1zYWdhL2VmZmVjdHMnO1xuXG5pbXBvcnQgVGFza0JhciBmcm9tICcuL3VpL3Rhc2tfYmFyJztcbmltcG9ydCBTcGlubmVyIGZyb20gJy4vdWkvc3Bpbm5lcic7XG5pbXBvcnQgbWFrZVRhc2tDaGFubmVsIGZyb20gJy4vbGVnYWN5L3Rhc2snO1xuaW1wb3J0IG1ha2VTZXJ2ZXJBcGkgZnJvbSAnLi9zZXJ2ZXJfYXBpJztcbmltcG9ydCBtYWtlUGxhdGZvcm1BZGFwdGVyIGZyb20gJy4vbGVnYWN5L3BsYXRmb3JtX2FkYXB0ZXInO1xuaW1wb3J0IFBsYXRmb3JtQnVuZGxlIGZyb20gJy4vcGxhdGZvcm1fYnVuZGxlJztcbmltcG9ydCBIaW50c0J1bmRsZSBmcm9tICcuL2hpbnRzX2J1bmRsZSc7XG5pbXBvcnQge3dpbmRvd0hlaWdodE1vbml0b3JTYWdhfSBmcm9tICcuL3dpbmRvd19oZWlnaHRfbW9uaXRvcic7XG5cbmZ1bmN0aW9uIGFwcEluaXRSZWR1Y2VyIChzdGF0ZSwge3BheWxvYWQ6IHt0YXNrVG9rZW4sIG9wdGlvbnN9fSkge1xuICAgIHJldHVybiB7Li4uc3RhdGUsIHRhc2tUb2tlbiwgb3B0aW9uc307XG59XG5cbmZ1bmN0aW9uIGFwcEluaXREb25lUmVkdWNlciAoc3RhdGUsIHtwYXlsb2FkOiB7cGxhdGZvcm1BcGksIHRhc2tBcGksIHNlcnZlckFwaX19KSB7XG4gICAgcmV0dXJuIHsuLi5zdGF0ZSwgcGxhdGZvcm1BcGksIHRhc2tBcGksIHNlcnZlckFwaX07XG59XG5cbmZ1bmN0aW9uIGFwcEluaXRGYWlsZWRSZWR1Y2VyIChzdGF0ZSwge3BheWxvYWQ6IHttZXNzYWdlfX0pIHtcbiAgICByZXR1cm4gey4uLnN0YXRlLCBmYXRhbEVycm9yOiBtZXNzYWdlfTtcbn1cblxuZnVuY3Rpb24qIGFwcFNhZ2EgKCkge1xuICAgIGNvbnN0IGFjdGlvbnMgPSB5aWVsZCBzZWxlY3QoKHthY3Rpb25zfSkgPT4gYWN0aW9ucyk7XG4gICAgeWllbGQgdGFrZUV2ZXJ5KGFjdGlvbnMuYXBwSW5pdCwgYXBwSW5pdFNhZ2EpO1xuICAgIHlpZWxkIHRha2VFdmVyeShhY3Rpb25zLnBsYXRmb3JtVmFsaWRhdGUsIHBsYXRmb3JtVmFsaWRhdGVTYWdhKTtcbn1cblxuY29uc3QgdGFza0FjdGlvbnMgPSB7IC8qIG1hcCB0YXNrIG1ldGhvZCBuYW1lcyB0byBhY3Rpb24gdHlwZXMgKi9cbiAgICBsb2FkOiAndGFza0xvYWRFdmVudCcsXG4gICAgdW5sb2FkOiAndGFza1VubG9hZEV2ZW50JyxcbiAgICB1cGRhdGVUb2tlbjogJ3Rhc2tVcGRhdGVUb2tlbkV2ZW50JyxcbiAgICBnZXRIZWlnaHQ6ICd0YXNrR2V0SGVpZ2h0RXZlbnQnLFxuICAgIGdldE1ldGFEYXRhOiAndGFza0dldE1ldGFEYXRhRXZlbnQnLFxuICAgIGdldFZpZXdzOiAndGFza0dldFZpZXdzRXZlbnQnLFxuICAgIHNob3dWaWV3czogJ3Rhc2tTaG93Vmlld3NFdmVudCcsXG4gICAgZ2V0U3RhdGU6ICd0YXNrR2V0U3RhdGVFdmVudCcsXG4gICAgcmVsb2FkU3RhdGU6ICd0YXNrUmVsb2FkU3RhdGVFdmVudCcsXG4gICAgZ2V0QW5zd2VyOiAndGFza0dldEFuc3dlckV2ZW50JyxcbiAgICByZWxvYWRBbnN3ZXI6ICd0YXNrUmVsb2FkQW5zd2VyRXZlbnQnLFxuICAgIGdyYWRlQW5zd2VyOiAndGFza0dyYWRlQW5zd2VyRXZlbnQnLFxufTtcblxuZnVuY3Rpb24qIGFwcEluaXRTYWdhICh7cGF5bG9hZDoge3Rhc2tUb2tlbiwgb3B0aW9ucywgcGxhdGZvcm19fSkge1xuICAgIGNvbnN0IGFjdGlvbnMgPSB5aWVsZCBzZWxlY3QoKHthY3Rpb25zfSkgPT4gYWN0aW9ucyk7XG4gICAgbGV0IHRhc2tDaGFubmVsLCB0YXNrQXBpLCBwbGF0Zm9ybUFwaSwgc2VydmVyQXBpO1xuICAgIHRyeSB7XG4gICAgICAgIHNlcnZlckFwaSA9IG1ha2VTZXJ2ZXJBcGkob3B0aW9ucy5zZXJ2ZXJfbW9kdWxlLCB0YXNrVG9rZW4pO1xuICAgICAgICB0YXNrQ2hhbm5lbCA9IHlpZWxkIGNhbGwobWFrZVRhc2tDaGFubmVsKTtcbiAgICAgICAgdGFza0FwaSA9ICh5aWVsZCB0YWtlKHRhc2tDaGFubmVsKSkudGFzaztcbiAgICAgICAgeWllbGQgdGFrZUV2ZXJ5KHRhc2tDaGFubmVsLCBmdW5jdGlvbiogKHt0eXBlLCBwYXlsb2FkfSkge1xuICAgICAgICAgICAgY29uc3QgYWN0aW9uID0ge3R5cGU6IGFjdGlvbnNbdGFza0FjdGlvbnNbdHlwZV1dLCBwYXlsb2FkfTtcbiAgICAgICAgICAgIHlpZWxkIHB1dChhY3Rpb24pO1xuICAgICAgICB9KTtcbiAgICAgICAgcGxhdGZvcm1BcGkgPSBtYWtlUGxhdGZvcm1BZGFwdGVyKHBsYXRmb3JtKTtcbiAgICB9IGNhdGNoIChleCkge1xuICAgICAgICB5aWVsZCBwdXQoe3R5cGU6IGFjdGlvbnMuYXBwSW5pdEZhaWxlZCwgcGF5bG9hZDoge21lc3NhZ2U6IGV4LnRvU3RyaW5nKCl9fSk7XG4gICAgICAgIHJldHVybjtcbiAgICB9XG4gICAgeWllbGQgcHV0KHt0eXBlOiBhY3Rpb25zLmFwcEluaXREb25lLCBwYXlsb2FkOiB7dGFza0FwaSwgcGxhdGZvcm1BcGksIHNlcnZlckFwaX19KTtcbiAgICAvKiBYWFggSWRlYWxseSBwbGF0Zm9ybS5pbml0V2l0aFRhc2sgd291bGQgdGFrZSBjYXJlIG9mIHNldHRpbmcgaXRzIGdsb2JhbC4gKi9cbiAgICB3aW5kb3cudGFzayA9IHRhc2tBcGk7XG4gICAgeWllbGQgY2FsbChwbGF0Zm9ybUFwaS5pbml0V2l0aFRhc2ssIHRhc2tBcGkpO1xuICAgIC8qIFhYWCBwbGF0Zm9ybS5pbml0V2l0aFRhc2sgZmFpbHMgdG8gY29uZm9ybSB0byBPcGVyYXRpb25zIEFQSSBhbmQgbmV2ZXJcbiAgICAgICAgICAgcmV0dXJuLCBjYXVzaW5nIHRoZSBzYWdhIHRvIHJlbWFpbiBzdHVjayBhdCB0aGlzIHBvaW50LiAqL1xuICAgIHlpZWxkIGZvcmsod2luZG93SGVpZ2h0TW9uaXRvclNhZ2EsIHBsYXRmb3JtQXBpKTtcbn1cblxuZnVuY3Rpb24qIHBsYXRmb3JtVmFsaWRhdGVTYWdhICh7cGF5bG9hZDoge21vZGV9fSkge1xuICAgIGNvbnN0IHt2YWxpZGF0ZX0gPSB5aWVsZCBzZWxlY3Qoc3RhdGUgPT4gc3RhdGUucGxhdGZvcm1BcGkpO1xuICAgIC8qIFRPRE86IGVycm9yIGhhbmRsaW5nLCB3cmFwIGluIHRyeS9jYXRjaCBibG9jayAqL1xuICAgIHlpZWxkIGNhbGwodmFsaWRhdGUsIG1vZGUpO1xufVxuXG5mdW5jdGlvbiBBcHBTZWxlY3RvciAoc3RhdGUpIHtcbiAgICBjb25zdCB7dGFza1JlYWR5LCBmYXRhbEVycm9yLCB2aWV3czoge1dvcmtzcGFjZX0sIGFjdGlvbnM6IHtwbGF0Zm9ybVZhbGlkYXRlfSwgZ3JhZGluZ30gPSBzdGF0ZTtcbiAgICByZXR1cm4ge3Rhc2tSZWFkeSwgZmF0YWxFcnJvciwgV29ya3NwYWNlLCBwbGF0Zm9ybVZhbGlkYXRlLCBncmFkaW5nfTtcbn1cblxuY2xhc3MgQXBwIGV4dGVuZHMgUmVhY3QuUHVyZUNvbXBvbmVudCB7XG4gICAgcmVuZGVyICgpIHtcbiAgICAgICAgY29uc3Qge3Rhc2tSZWFkeSwgV29ya3NwYWNlLCBmYXRhbEVycm9yLCBncmFkaW5nfSA9IHRoaXMucHJvcHM7XG4gICAgICAgIGlmIChmYXRhbEVycm9yKSB7XG4gICAgICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgICAgIDxkaXY+XG4gICAgICAgICAgICAgICAgICAgIDxoMT57XCJBIGZhdGFsIGVycm9yIGhhcyBvY2N1cnJlZFwifTwvaDE+XG4gICAgICAgICAgICAgICAgICAgIDxwPntmYXRhbEVycm9yfTwvcD5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKCF0YXNrUmVhZHkpIHtcbiAgICAgICAgICAgIHJldHVybiA8U3Bpbm5lci8+O1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICA8ZGl2PlxuICAgICAgICAgICAgICAgIDxXb3Jrc3BhY2UvPlxuICAgICAgICAgICAgICAgIDxUYXNrQmFyIG9uVmFsaWRhdGU9e3RoaXMuX3ZhbGlkYXRlfS8+XG4gICAgICAgICAgICAgICAge2dyYWRpbmcubWVzc2FnZSAmJlxuICAgICAgICAgICAgICAgICAgICA8cCBzdHlsZT17e2ZvbnRXZWlnaHQ6ICdib2xkJ319PntncmFkaW5nLm1lc3NhZ2V9PC9wPn1cbiAgICAgICAgICAgICAgICB7dHlwZW9mIGdyYWRpbmcuc2NvcmUgPT09ICdudW1iZXInICYmXG4gICAgICAgICAgICAgICAgICAgIDxwPntcIlZvdHJlIHNjb3JlIDogXCJ9PHNwYW4gc3R5bGU9e3tmb250V2VpZ2h0OiAnYm9sZCd9fT57Z3JhZGluZy5zY29yZX08L3NwYW4+PC9wPn1cbiAgICAgICAgICAgICAgICB7Z3JhZGluZy5lcnJvciAmJlxuICAgICAgICAgICAgICAgICAgICA8QWxlcnQgYnNTdHlsZT0nZGFuZ2VyJz57Z3JhZGluZy5lcnJvcn08L0FsZXJ0Pn1cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICApO1xuICAgIH1cbiAgICBfdmFsaWRhdGUgPSAoKSA9PiB7XG4gICAgICAgIHRoaXMucHJvcHMuZGlzcGF0Y2goe3R5cGU6IHRoaXMucHJvcHMucGxhdGZvcm1WYWxpZGF0ZSwgcGF5bG9hZDoge21vZGU6ICdkb25lJ319KTtcbiAgICB9O1xufVxuXG5leHBvcnQgZGVmYXVsdCB7XG4gICAgYWN0aW9uczoge1xuICAgICAgICBhcHBJbml0OiAnQXBwLkluaXQnLFxuICAgICAgICBhcHBJbml0RG9uZTogJ0FwcC5Jbml0LkRvbmUnLFxuICAgICAgICBhcHBJbml0RmFpbGVkOiAnQXBwLkluaXQuRmFpbGVkJyxcbiAgICAgICAgcGxhdGZvcm1WYWxpZGF0ZTogJ1BsYXRmb3JtLlZhbGlkYXRlJyxcbiAgICB9LFxuICAgIGFjdGlvblJlZHVjZXJzOiB7XG4gICAgICAgIGFwcEluaXQ6IGFwcEluaXRSZWR1Y2VyLFxuICAgICAgICBhcHBJbml0RG9uZTogYXBwSW5pdERvbmVSZWR1Y2VyLFxuICAgICAgICBhcHBJbml0RmFpbGVkOiBhcHBJbml0RmFpbGVkUmVkdWNlcixcbiAgICB9LFxuICAgIHNhZ2E6IGFwcFNhZ2EsXG4gICAgdmlld3M6IHtcbiAgICAgICAgQXBwOiBjb25uZWN0KEFwcFNlbGVjdG9yKShBcHApXG4gICAgfSxcbiAgICBpbmNsdWRlczogW1xuICAgICAgICBQbGF0Zm9ybUJ1bmRsZSxcbiAgICAgICAgSGludHNCdW5kbGUsXG4gICAgXVxufTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9hbGdvcmVhX3JlYWN0X3Rhc2svYXBwX2J1bmRsZS5qcyIsIlxuaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCB7QnV0dG9ufSBmcm9tICdyZWFjdC1ib290c3RyYXAnO1xuXG5mdW5jdGlvbiBUYXNrQmFyIChwcm9wcykge1xuICByZXR1cm4gKFxuICAgICA8ZGl2IGNsYXNzTmFtZT0ndGFzay1iYXInPlxuICAgICAgICA8QnV0dG9uIG9uQ2xpY2s9e3Byb3BzLm9uVmFsaWRhdGV9PlxuICAgICAgICAgIHtcIlZhbGlkZXJcIn1cbiAgICAgICAgPC9CdXR0b24+XG4gICAgIDwvZGl2PlxuICApO1xufVxuXG5leHBvcnQgZGVmYXVsdCBUYXNrQmFyO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL2FsZ29yZWFfcmVhY3RfdGFzay91aS90YXNrX2Jhci5qcyIsIlxuaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcblxuZnVuY3Rpb24gU3Bpbm5lciAoX3Byb3BzKSB7XG4gIHJldHVybiAoXG4gICAgPGRpdiBjbGFzc05hbWU9J3RleHQtY2VudGVyJyBzdHlsZT17e2ZvbnRTaXplOiAnMzAwJSd9fT5cbiAgICAgIDxpIGNsYXNzTmFtZT1cImZhIGZhLXNwaW5uZXIgZmEtc3BpblwiLz5cbiAgICA8L2Rpdj5cbiAgKTtcbn1cblxuZXhwb3J0IGRlZmF1bHQgU3Bpbm5lcjtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9hbGdvcmVhX3JlYWN0X3Rhc2svdWkvc3Bpbm5lci5qcyIsIlxuaW1wb3J0IHtidWZmZXJzLCBldmVudENoYW5uZWx9IGZyb20gJ3JlZHV4LXNhZ2EnO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiAoKSB7XG4gICAgcmV0dXJuIGV2ZW50Q2hhbm5lbChmdW5jdGlvbiAoZW1pdCkge1xuICAgICAgICBjb25zdCB0YXNrID0gbWFrZVRhc2soZW1pdCk7XG4gICAgICAgIGVtaXQoe3Rhc2t9KTtcbiAgICAgICAgcmV0dXJuIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIGZvciAobGV0IHByb3Agb2YgT2JqZWN0LmtleXModGFzaykpIHtcbiAgICAgICAgICAgICAgICB0YXNrW3Byb3BdID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ3Rhc2sgY2hhbm5lbCBpcyBjbG9zZWQnKTtcbiAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgfVxuICAgICAgICB9O1xuICAgIH0sIGJ1ZmZlcnMuZXhwYW5kaW5nKDQpKTtcbn1cblxuZnVuY3Rpb24gbWFrZVRhc2sgKGVtaXQpIHtcbiAgICByZXR1cm4ge1xuICAgICAgICBzaG93Vmlld3M6IGZ1bmN0aW9uICh2aWV3cywgc3VjY2VzcywgZXJyb3IpIHtcbiAgICAgICAgICAgIGVtaXQoe3R5cGU6ICdzaG93Vmlld3MnLCBwYXlsb2FkOiB7dmlld3MsIHN1Y2Nlc3MsIGVycm9yfX0pO1xuICAgICAgICB9LFxuICAgICAgICBnZXRWaWV3czogZnVuY3Rpb24gKHN1Y2Nlc3MsIGVycm9yKSB7XG4gICAgICAgICAgICBlbWl0KHt0eXBlOiAnZ2V0Vmlld3MnLCBwYXlsb2FkOiB7c3VjY2VzcywgZXJyb3J9fSk7XG4gICAgICAgIH0sXG4gICAgICAgIHVwZGF0ZVRva2VuOiBmdW5jdGlvbiAodG9rZW4sIHN1Y2Nlc3MsIGVycm9yKSB7XG4gICAgICAgICAgICBlbWl0KHt0eXBlOiAndXBkYXRlVG9rZW4nLCBwYXlsb2FkOiB7dG9rZW4sIHN1Y2Nlc3MsIGVycm9yfX0pO1xuICAgICAgICB9LFxuICAgICAgICBnZXRIZWlnaHQ6IGZ1bmN0aW9uIChzdWNjZXNzLCBlcnJvcikge1xuICAgICAgICAgICAgZW1pdCh7dHlwZTogJ2dldEhlaWdodCcsIHBheWxvYWQ6IHtzdWNjZXNzLCBlcnJvcn19KTtcbiAgICAgICAgfSxcbiAgICAgICAgdW5sb2FkOiBmdW5jdGlvbiAoc3VjY2VzcywgZXJyb3IpIHtcbiAgICAgICAgICAgIGVtaXQoe3R5cGU6ICd1bmxvYWQnLCBwYXlsb2FkOiB7c3VjY2VzcywgZXJyb3J9fSk7XG4gICAgICAgIH0sXG4gICAgICAgIGdldFN0YXRlOiBmdW5jdGlvbiAoc3VjY2VzcywgZXJyb3IpIHtcbiAgICAgICAgICAgIGVtaXQoe3R5cGU6ICdnZXRTdGF0ZScsIHBheWxvYWQ6IHtzdWNjZXNzLCBlcnJvcn19KTtcbiAgICAgICAgfSxcbiAgICAgICAgZ2V0TWV0YURhdGE6IGZ1bmN0aW9uIChzdWNjZXNzLCBlcnJvcikge1xuICAgICAgICAgICAgZW1pdCh7dHlwZTogJ2dldE1ldGFEYXRhJywgcGF5bG9hZDoge3N1Y2Nlc3MsIGVycm9yfX0pO1xuICAgICAgICB9LFxuICAgICAgICByZWxvYWRBbnN3ZXI6IGZ1bmN0aW9uIChhbnN3ZXIsIHN1Y2Nlc3MsIGVycm9yKSB7XG4gICAgICAgICAgICBlbWl0KHt0eXBlOiAncmVsb2FkQW5zd2VyJywgcGF5bG9hZDoge2Fuc3dlciwgc3VjY2VzcywgZXJyb3J9fSk7XG4gICAgICAgIH0sXG4gICAgICAgIHJlbG9hZFN0YXRlOiBmdW5jdGlvbiAoc3RhdGUsIHN1Y2Nlc3MsIGVycm9yKSB7XG4gICAgICAgICAgICBlbWl0KHt0eXBlOiAncmVsb2FkU3RhdGUnLCBwYXlsb2FkOiB7c3RhdGUsIHN1Y2Nlc3MsIGVycm9yfX0pO1xuICAgICAgICB9LFxuICAgICAgICBnZXRBbnN3ZXI6IGZ1bmN0aW9uIChzdWNjZXNzLCBlcnJvcikge1xuICAgICAgICAgICAgZW1pdCh7dHlwZTogJ2dldEFuc3dlcicsIHBheWxvYWQ6IHtzdWNjZXNzLCBlcnJvcn19KTtcbiAgICAgICAgfSxcbiAgICAgICAgbG9hZDogZnVuY3Rpb24gKHZpZXdzLCBzdWNjZXNzLCBlcnJvcikge1xuICAgICAgICAgICAgZW1pdCh7dHlwZTogJ2xvYWQnLCBwYXlsb2FkOiB7dmlld3MsIHN1Y2Nlc3MsIGVycm9yfX0pO1xuICAgICAgICB9LFxuICAgICAgICBncmFkZUFuc3dlcjogZnVuY3Rpb24gKGFuc3dlciwgYW5zd2VyVG9rZW4sIHN1Y2Nlc3MsIGVycm9yKSB7XG4gICAgICAgICAgICBlbWl0KHt0eXBlOiAnZ3JhZGVBbnN3ZXInLCBwYXlsb2FkOiB7YW5zd2VyLCBhbnN3ZXJUb2tlbiwgc3VjY2VzcywgZXJyb3J9fSk7XG4gICAgICAgIH0sXG4gICAgfTtcbn1cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9hbGdvcmVhX3JlYWN0X3Rhc2svbGVnYWN5L3Rhc2suanMiLCJcbmltcG9ydCBmZXRjaFBvbnlmaWxsIGZyb20gJ2ZldGNoLXBvbnlmaWxsJztcblxuY29uc3Qge2ZldGNofSA9IGZldGNoUG9ueWZpbGwoKTtcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gbWFrZVNlcnZlckFwaSAoY29uZmlnKSB7XG4gICAgcmV0dXJuIGZ1bmN0aW9uIChzZXJ2aWNlLCBhY3Rpb24sIGJvZHkpIHtcbiAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHtcbiAgICAgICAgICAgIGNvbnN0IHVybCA9IG5ldyBVUkwoc2VydmljZSwgY29uZmlnLmJhc2VVcmwpO1xuICAgICAgICAgICAgY29uc3QgZGV2ZWwgPSBjb25maWcuZGV2ZWwgPyB7dGFzazogY29uZmlnLmRldmVsfSA6IHt9O1xuICAgICAgICAgICAgcmV0dXJuIGZldGNoKHVybCwge1xuICAgICAgICAgICAgICAgIG1ldGhvZDogJ1BPU1QnLFxuICAgICAgICAgICAgICAgIGhlYWRlcnM6IHtcbiAgICAgICAgICAgICAgICAgICAgJ0NvbnRlbnQtVHlwZSc6ICdhcHBsaWNhdGlvbi9qc29uJyxcbiAgICAgICAgICAgICAgICAgICAgJ0FjY2VwdCc6ICdhcHBsaWNhdGlvbi9qc29uJyxcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIGJvZHk6IEpTT04uc3RyaW5naWZ5KHsuLi5ib2R5LCAuLi5kZXZlbCwgYWN0aW9ufSlcbiAgICAgICAgICAgIH0pLnRoZW4oZnVuY3Rpb24gKHJlc3BvbnNlKSB7XG4gICAgICAgICAgICAgICAgaWYgKHJlc3BvbnNlLnN0YXR1cyAhPT0gMjAwKSByZXR1cm4gcmVqZWN0KHJlc3BvbnNlKTtcbiAgICAgICAgICAgICAgICByZXNwb25zZS5qc29uKCkuY2F0Y2gocmVqZWN0KS50aGVuKGZ1bmN0aW9uIChyZXN1bHQpIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKCFyZXN1bHQuc3VjY2VzcykgcmV0dXJuIHJlamVjdChyZXN1bHQuZXJyb3IpO1xuICAgICAgICAgICAgICAgICAgICByZXNvbHZlKHJlc3VsdC5kYXRhKTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH0pLmNhdGNoKHJlamVjdCk7XG4gICAgICAgIH0pO1xuICAgIH07XG59XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvYWxnb3JlYV9yZWFjdF90YXNrL3NlcnZlcl9hcGkuanMiLCJcbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIChwbGF0Zm9ybSkge1xuXG4gICAgZnVuY3Rpb24gaW5pdFdpdGhUYXNrICh0YXNrKSB7XG4gICAgICAgIHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KSB7XG4gICAgICAgICAgICBwbGF0Zm9ybS5pbml0V2l0aFRhc2sodGFzaywgcmVzb2x2ZSwgcmVqZWN0KTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gZ2V0VGFza1BhcmFtcyAoa2V5LCBkZWZhdWx0VmFsdWUpIHtcbiAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHtcbiAgICAgICAgICAgIHBsYXRmb3JtLmdldFRhc2tQYXJhbXMoa2V5LCBkZWZhdWx0VmFsdWUsIHJlc29sdmUsIHJlamVjdCk7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGFza0hpbnQgKGhpbnRUb2tlbikge1xuICAgICAgICByZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkge1xuICAgICAgICAgICAgcGxhdGZvcm0uYXNrSGludChoaW50VG9rZW4sIHJlc29sdmUsIHJlamVjdCk7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIHZhbGlkYXRlIChtb2RlKSB7XG4gICAgICAgIHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KSB7XG4gICAgICAgICAgICBwbGF0Zm9ybS52YWxpZGF0ZShtb2RlLCByZXNvbHZlLCByZWplY3QpO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiB1cGRhdGVEaXNwbGF5IChvcHRpb25zKSB7XG4gICAgICAgIHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KSB7XG4gICAgICAgICAgICBwbGF0Zm9ybS51cGRhdGVEaXNwbGF5KG9wdGlvbnMsIHJlc29sdmUsIHJlamVjdCk7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIHJldHVybiB7aW5pdFdpdGhUYXNrLCBnZXRUYXNrUGFyYW1zLCBhc2tIaW50LCB2YWxpZGF0ZSwgdXBkYXRlRGlzcGxheX07XG5cbn1cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9hbGdvcmVhX3JlYWN0X3Rhc2svbGVnYWN5L3BsYXRmb3JtX2FkYXB0ZXIuanMiLCIvKlxuIyBQZXJmb3JtYW5jZVxuLSB0YXNrLmdldEhlaWdodCBhbmQgdGFzay5nZXRBbnN3ZXIgYXJlIGNhbGxlZCBldmVyeSBzZWNvbmRcbi0gdGFzay5nZXRWaWV3cyBpcyBjYWxsZWQgd2hlbmV2ZXIgdGhlIHdpbmRvdydzIGhlaWdodCBjaGFuZ2VzXG4qL1xuXG5pbXBvcnQge2NhbGwsIHB1dCwgc2VsZWN0LCB0YWtlRXZlcnl9IGZyb20gJ3JlZHV4LXNhZ2EvZWZmZWN0cyc7XG5pbXBvcnQgc3RyaW5naWZ5IGZyb20gJ2pzb24tc3RhYmxlLXN0cmluZ2lmeS13aXRob3V0LWpzb25pZnknO1xuXG5mdW5jdGlvbiBhcHBJbml0UmVkdWNlciAoc3RhdGUsIHtwYXlsb2FkOiB7dGFza1Rva2VuLCBvcHRpb25zfX0pIHtcbiAgICByZXR1cm4gey4uLnN0YXRlLCBncmFkaW5nOiB7fX07XG59XG5cbmZ1bmN0aW9uIHRhc2tEYXRhTG9hZGVkUmVkdWNlciAoc3RhdGUsIHtwYXlsb2FkOiB7dGFza0RhdGF9fSkge1xuICAgIHJldHVybiB7Li4uc3RhdGUsIHRhc2tEYXRhfTtcbn1cblxuZnVuY3Rpb24gdGFza1N0YXRlTG9hZGVkUmVkdWNlciAoc3RhdGUsIHtwYXlsb2FkOiB7aGludHN9fSkge1xuICAgIHJldHVybiB7Li4uc3RhdGUsIGhpbnRzfTtcbn1cblxuZnVuY3Rpb24gdGFza0Fuc3dlckxvYWRlZFJlZHVjZXIgKHN0YXRlLCB7cGF5bG9hZDoge2Fuc3dlcn19KSB7XG4gICAgcmV0dXJuIHsuLi5zdGF0ZSwgYW5zd2VyfTtcbn1cblxuZnVuY3Rpb24gdGFza1Nob3dWaWV3c0V2ZW50UmVkdWNlciAoc3RhdGUsIHtwYXlsb2FkOiB7dmlld3N9fSkge1xuICAgIHJldHVybiB7Li4uc3RhdGUsIHRhc2tWaWV3czogdmlld3N9O1xufVxuXG5mdW5jdGlvbiogdGFza1Nob3dWaWV3c0V2ZW50U2FnYSAoe3BheWxvYWQ6IHtzdWNjZXNzfX0pIHtcbiAgICAvKiBUaGUgcmVkdWNlciBoYXMgc3RvcmVkIHRoZSB2aWV3cyB0byBzaG93LCBqdXN0IGNhbGwgc3VjY2Vzcy4gKi9cbiAgICB5aWVsZCBjYWxsKHN1Y2Nlc3MpO1xufVxuXG5mdW5jdGlvbiogdGFza0dldFZpZXdzRXZlbnRTYWdhICh7cGF5bG9hZDoge3N1Y2Nlc3N9fSkge1xuICAgIC8qIFhYWCBvbmx5IHRoZSAndGFzaycgdmlldyBpcyBkZWNsYXJlZCAqL1xuICAgIHlpZWxkIGNhbGwoc3VjY2Vzcywgeyd0YXNrJzoge319KTtcbn1cblxuZnVuY3Rpb24gdGFza1VwZGF0ZVRva2VuRXZlbnRSZWR1Y2VyIChzdGF0ZSwge3BheWxvYWQ6IHt0b2tlbn19KSB7XG4gICAgaWYgKHRva2VuID09PSBudWxsKSB7XG4gICAgICAgIGNvbnNvbGUud2FybignaWdub3JlZCB0YXNrLnVwZGF0ZVRva2VuIHdpdGggbnVsbCB0b2tlbicpO1xuICAgICAgICByZXR1cm4gc3RhdGU7XG4gICAgfVxuICAgIHJldHVybiB7Li4uc3RhdGUsIHRhc2tUb2tlbjogdG9rZW59O1xufVxuZnVuY3Rpb24qIHRhc2tVcGRhdGVUb2tlbkV2ZW50U2FnYSAoe3BheWxvYWQ6IHtzdWNjZXNzfX0pIHtcbiAgICB5aWVsZCBjYWxsKHN1Y2Nlc3MpO1xufVxuXG5mdW5jdGlvbiogdGFza0dldEhlaWdodEV2ZW50U2FnYSAoe3BheWxvYWQ6IHtzdWNjZXNzfX0pIHtcbiAgICBjb25zdCBkID0gZG9jdW1lbnQ7XG4gICAgY29uc3QgaCA9IE1hdGgubWF4KGQuYm9keS5vZmZzZXRIZWlnaHQsIGQuZG9jdW1lbnRFbGVtZW50Lm9mZnNldEhlaWdodCk7XG4gICAgeWllbGQgY2FsbChzdWNjZXNzLCBoKTtcbn1cblxuZnVuY3Rpb24qIHRhc2tVbmxvYWRFdmVudFNhZ2EgKHtwYXlsb2FkOiB7c3VjY2Vzc319KSB7XG4gICAgLyogWFhYIE5vIGFjdGlvbiBuZWVkZWQ/ICovXG4gICAgeWllbGQgY2FsbChzdWNjZXNzKTtcbn1cblxuZnVuY3Rpb24qIHRhc2tHZXRNZXRhRGF0YUV2ZW50U2FnYSAoe3BheWxvYWQ6IHtzdWNjZXNzLCBlcnJvcjogX2Vycm9yfX0pIHtcbiAgICBjb25zdCBtZXRhRGF0YSA9IHlpZWxkIHNlbGVjdCgoe3Rhc2tNZXRhRGF0YX0pID0+IHRhc2tNZXRhRGF0YSk7XG4gICAgeWllbGQgY2FsbChzdWNjZXNzLCBtZXRhRGF0YSk7XG59XG5cbmZ1bmN0aW9uKiB0YXNrR2V0QW5zd2VyRXZlbnRTYWdhICh7cGF5bG9hZDoge3N1Y2Nlc3N9fSkge1xuICAgIGNvbnN0IGFuc3dlciA9IHlpZWxkIHNlbGVjdChzdGF0ZSA9PiBzdGF0ZS5zZWxlY3RvcnMuZ2V0VGFza0Fuc3dlcihzdGF0ZSkpO1xuICAgIGNvbnN0IHN0ckFuc3dlciA9IHN0cmluZ2lmeShhbnN3ZXIpO1xuICAgIHlpZWxkIGNhbGwoc3VjY2Vzcywgc3RyQW5zd2VyKTtcbn1cblxuZnVuY3Rpb24qIHRhc2tSZWxvYWRBbnN3ZXJFdmVudFNhZ2EgKHtwYXlsb2FkOiB7YW5zd2VyLCBzdWNjZXNzLCBlcnJvcn19KSB7XG4gICAgY29uc3Qge3Rhc2tBbnN3ZXJMb2FkZWQsIHRhc2tSZWZyZXNofSA9IHlpZWxkIHNlbGVjdCgoe2FjdGlvbnN9KSA9PiBhY3Rpb25zKTtcbiAgICB0cnkge1xuICAgICAgICBpZiAoYW5zd2VyKSB7XG4gICAgICAgICAgICB5aWVsZCBwdXQoe3R5cGU6IHRhc2tBbnN3ZXJMb2FkZWQsIHBheWxvYWQ6IHthbnN3ZXI6IEpTT04ucGFyc2UoYW5zd2VyKX19KTtcbiAgICAgICAgICAgIHlpZWxkIHB1dCh7dHlwZTogdGFza1JlZnJlc2h9KTtcbiAgICAgICAgfVxuICAgICAgICB5aWVsZCBjYWxsKHN1Y2Nlc3MpO1xuICAgIH0gY2F0Y2ggKGV4KSB7XG4gICAgICAgIHlpZWxkIGNhbGwoZXJyb3IsIGBiYWQgYW5zd2VyOiAke2V4Lm1lc3NhZ2V9YCk7XG4gICAgfVxufVxuXG5mdW5jdGlvbiogdGFza0dldFN0YXRlRXZlbnRTYWdhICh7cGF5bG9hZDoge3N1Y2Nlc3N9fSkge1xuICAgIGNvbnN0IGR1bXAgPSB5aWVsZCBzZWxlY3Qoc3RhdGUgPT4gc3RhdGUuc2VsZWN0b3JzLmdldFRhc2tTdGF0ZShzdGF0ZSkpO1xuICAgIGNvbnN0IHN0ckR1bXAgPSBzdHJpbmdpZnkoZHVtcCk7XG4gICAgeWllbGQgY2FsbChzdWNjZXNzLCBzdHJEdW1wKTtcbn1cblxuZnVuY3Rpb24qIHRhc2tSZWxvYWRTdGF0ZUV2ZW50U2FnYSAoe3BheWxvYWQ6IHtzdGF0ZSwgc3VjY2VzcywgZXJyb3J9fSkge1xuICAgIGNvbnN0IHt0YXNrU3RhdGVMb2FkZWQsIHRhc2tSZWZyZXNofSA9IHlpZWxkIHNlbGVjdCgoe2FjdGlvbnN9KSA9PiBhY3Rpb25zKTtcbiAgICB0cnkge1xuICAgICAgICBpZiAoc3RhdGUpIHtcbiAgICAgICAgICAgIHlpZWxkIHB1dCh7dHlwZTogdGFza1N0YXRlTG9hZGVkLCBwYXlsb2FkOiB7ZHVtcDogSlNPTi5wYXJzZShzdGF0ZSl9fSk7XG4gICAgICAgICAgICB5aWVsZCBwdXQoe3R5cGU6IHRhc2tSZWZyZXNofSk7XG4gICAgICAgIH1cbiAgICAgICAgeWllbGQgY2FsbChzdWNjZXNzKTtcbiAgICB9IGNhdGNoIChleCkge1xuICAgICAgICB5aWVsZCBjYWxsKGVycm9yLCBgYmFkIHN0YXRlOiAke2V4Lm1lc3NhZ2V9YCk7XG4gICAgfVxufVxuXG5mdW5jdGlvbiogdGFza0xvYWRFdmVudFNhZ2EgKHtwYXlsb2FkOiB7dmlld3M6IF92aWV3cywgc3VjY2VzcywgZXJyb3J9fSkge1xuICAgIGNvbnN0IHt0YXNrRGF0YUxvYWRlZCwgdGFza0luaXR9ID0geWllbGQgc2VsZWN0KCh7YWN0aW9uc30pID0+IGFjdGlvbnMpO1xuICAgIC8qIFRPRE86IGRvIHNvbWV0aGluZyB3aXRoIHZpZXdzICovXG4gICAgdHJ5IHtcbiAgICAgICAgY29uc3Qge3Rhc2tUb2tlbiwgc2VydmVyQXBpfSA9IHlpZWxkIHNlbGVjdChzdGF0ZSA9PiBzdGF0ZSk7XG4gICAgICAgIGNvbnN0IHRhc2tEYXRhID0geWllbGQgY2FsbChzZXJ2ZXJBcGksICd0YXNrcycsICd0YXNrRGF0YScsIHt0YXNrOiB0YXNrVG9rZW59KTtcbiAgICAgICAgeWllbGQgcHV0KHt0eXBlOiB0YXNrRGF0YUxvYWRlZCwgcGF5bG9hZDoge3Rhc2tEYXRhfX0pO1xuICAgICAgICB5aWVsZCBwdXQoe3R5cGU6IHRhc2tJbml0fSk7XG4gICAgICAgIHlpZWxkIGNhbGwoc3VjY2Vzcyk7XG4gICAgfSBjYXRjaCAoZXgpIHtcbiAgICAgICAgeWllbGQgY2FsbChlcnJvciwgZXgudG9TdHJpbmcoKSk7XG4gICAgfVxufVxuXG5mdW5jdGlvbiogdGFza0dyYWRlQW5zd2VyRXZlbnRTYWdhICh7cGF5bG9hZDoge2Fuc3dlciwgYW5zd2VyVG9rZW4sIHN1Y2Nlc3MsIGVycm9yfX0pIHtcbiAgICBjb25zdCB7dGFza0Fuc3dlckdyYWRlZH0gPSB5aWVsZCBzZWxlY3QoKHthY3Rpb25zfSkgPT4gYWN0aW9ucyk7XG4gICAgbGV0IHJlc3VsdDtcbiAgICB0cnkge1xuICAgICAgICBjb25zdCB7dGFza1Rva2VuLCBwbGF0Zm9ybUFwaToge2dldFRhc2tQYXJhbXN9LCBzZXJ2ZXJBcGl9ID0geWllbGQgc2VsZWN0KHN0YXRlID0+IHN0YXRlKTtcbiAgICAgICAgY29uc3Qge21pblNjb3JlLCBtYXhTY29yZSwgbm9TY29yZX0gPSB5aWVsZCBjYWxsKGdldFRhc2tQYXJhbXMsIG51bGwsIG51bGwpO1xuICAgICAgICBjb25zdCB7c2NvcmUsIG1lc3NhZ2UsIHRva2VuOiBzY29yZVRva2VufSA9IHlpZWxkIGNhbGwoc2VydmVyQXBpLCAndGFza3MnLCAnZ3JhZGVBbnN3ZXInLCB7XG4gICAgICAgICAgICB0YXNrOiB0YXNrVG9rZW4sIC8qIFhYWCB0YXNrIHNob3VsZCBiZSBuYW1lZCB0YXNrVG9rZW4gKi9cbiAgICAgICAgICAgIGFuc3dlcjogYW5zd2VyVG9rZW4sICAvKiBYWFggYW5zd2VyIHNob3VsZCBiZSBuYW1lZCBhbnN3ZXJUb2tlbiAqL1xuICAgICAgICAgICAgbWluX3Njb3JlOiBtaW5TY29yZSwgLyogWFhYIG5vIHJlYWwgcG9pbnQgcGFzc2luZyBtaW5fc2NvcmUsIG1heF9zY29yZSwgbm9fc2NvcmUgdG8gc2VydmVyLXNpZGUgZ3JhZGVyICovXG4gICAgICAgICAgICBtYXhfc2NvcmU6IG1heFNjb3JlLFxuICAgICAgICAgICAgbm9fc2NvcmU6IG5vU2NvcmVcbiAgICAgICAgfSk7XG4gICAgICAgIHlpZWxkIHB1dCh7dHlwZTogdGFza0Fuc3dlckdyYWRlZCwgcGF5bG9hZDoge2dyYWRpbmc6IHtzY29yZSwgbWVzc2FnZX19fSk7XG4gICAgICAgIHlpZWxkIGNhbGwoc3VjY2Vzcywgc2NvcmUsIG1lc3NhZ2UsIHNjb3JlVG9rZW4pO1xuICAgIH0gY2F0Y2ggKGV4KSB7XG4gICAgICAgIHlpZWxkIHB1dCh7dHlwZTogdGFza0Fuc3dlckdyYWRlZCwgcGF5bG9hZDoge2dyYWRpbmc6IHtlcnJvcjogZXgudG9TdHJpbmcoKX19fSk7XG4gICAgICAgIHlpZWxkIGNhbGwoZXJyb3IsIGV4LnRvU3RyaW5nKCkpO1xuICAgIH1cbn1cblxuZnVuY3Rpb24gdGFza0Fuc3dlckdyYWRlZFJlZHVjZXIgKHN0YXRlLCB7cGF5bG9hZDoge2dyYWRpbmd9fSkge1xuICAgIHJldHVybiB7Li4uc3RhdGUsIGdyYWRpbmd9O1xufVxuXG5leHBvcnQgZGVmYXVsdCB7XG4gICAgYWN0aW9uczoge1xuICAgICAgICB0YXNrSW5pdDogJ1Rhc2suSW5pdCcsXG4gICAgICAgIHRhc2tSZWZyZXNoOiAnVGFzay5SZWZyZXNoJyxcbiAgICAgICAgdGFza0xvYWRFdmVudDogJ1Rhc2suRXZlbnQuTG9hZCcgLyoge3ZpZXdzLCBzdWNjZXNzLCBlcnJvcn0gKi8sXG4gICAgICAgIHRhc2tVbmxvYWRFdmVudDogJ1Rhc2suRXZlbnQuVW5sb2FkJyAvKiB7c3VjY2VzcywgZXJyb3J9ICovLFxuICAgICAgICB0YXNrVXBkYXRlVG9rZW5FdmVudDogJ1Rhc2suRXZlbnQuVXBkYXRlVG9rZW4nIC8qIHt0b2tlbiwgc3VjY2VzcywgZXJyb3J9ICovLFxuICAgICAgICB0YXNrR2V0SGVpZ2h0RXZlbnQ6ICdUYXNrLkV2ZW50LkdldEhlaWdodCcgLyoge3N1Y2Nlc3MsIGVycm9yfSAqLyxcbiAgICAgICAgdGFza0dldE1ldGFEYXRhRXZlbnQ6ICdUYXNrLkV2ZW50LkdldE1ldGFEYXRhJyAvKiB7c3VjY2VzcywgZXJyb3J9ICovLFxuICAgICAgICB0YXNrR2V0Vmlld3NFdmVudDogJ1Rhc2suRXZlbnQuR2V0Vmlld3MnIC8qIHtzdWNjZXNzLCBlcnJvcn0gKi8sXG4gICAgICAgIHRhc2tTaG93Vmlld3NFdmVudDogJ1Rhc2suRXZlbnQuU2hvd1ZpZXdzJyAvKiB7dmlld3MsIHN1Y2Nlc3MsIGVycm9yfSAqLyxcbiAgICAgICAgdGFza0dldFN0YXRlRXZlbnQ6ICdUYXNrLkV2ZW50LkdldFN0YXRlJyAvKiB7c3VjY2VzcywgZXJyb3J9ICovLFxuICAgICAgICB0YXNrUmVsb2FkU3RhdGVFdmVudDogJ1Rhc2suRXZlbnQuUmVsb2FkU3RhdGUnIC8qIHtzdGF0ZSwgc3VjY2VzcywgZXJyb3J9ICovLFxuICAgICAgICB0YXNrR2V0QW5zd2VyRXZlbnQ6ICdUYXNrLkV2ZW50LkdldEFuc3dlcicgLyoge3N1Y2Nlc3MsIGVycm9yfSAqLyxcbiAgICAgICAgdGFza1JlbG9hZEFuc3dlckV2ZW50OiAnVGFzay5FdmVudC5SZWxvYWRBbnN3ZXInIC8qIHthbnN3ZXIsIHN1Y2Nlc3MsIGVycm9yfSAqLyxcbiAgICAgICAgdGFza0dyYWRlQW5zd2VyRXZlbnQ6ICdUYXNrLkV2ZW50LkdyYWRlQW5zd2VyJyAvKiB7YW5zd2VyLCBhbnN3ZXJUb2tlbiwgc3VjY2VzcywgZXJyb3J9ICovLFxuICAgICAgICB0YXNrRGF0YUxvYWRlZDogJ1Rhc2suRGF0YS5Mb2FkZWQnLFxuICAgICAgICB0YXNrU3RhdGVMb2FkZWQ6ICdUYXNrLlN0YXRlLkxvYWRlZCcsXG4gICAgICAgIHRhc2tBbnN3ZXJMb2FkZWQ6ICdUYXNrLkFuc3dlci5Mb2FkZWQnLFxuICAgICAgICB0YXNrQW5zd2VyR3JhZGVkOiAnVGFzay5BbnN3ZXIuR3JhZGVkJyxcbiAgICB9LFxuICAgIGFjdGlvblJlZHVjZXJzOiB7XG4gICAgICAgIGFwcEluaXQ6IGFwcEluaXRSZWR1Y2VyLFxuICAgICAgICB0YXNrU2hvd1ZpZXdzRXZlbnQ6IHRhc2tTaG93Vmlld3NFdmVudFJlZHVjZXIsXG4gICAgICAgIHRhc2tVcGRhdGVUb2tlbkV2ZW50OiB0YXNrVXBkYXRlVG9rZW5FdmVudFJlZHVjZXIsXG4gICAgICAgIHRhc2tEYXRhTG9hZGVkOiB0YXNrRGF0YUxvYWRlZFJlZHVjZXIsXG4gICAgICAgIHRhc2tTdGF0ZUxvYWRlZDogdGFza1N0YXRlTG9hZGVkUmVkdWNlcixcbiAgICAgICAgdGFza0Fuc3dlckxvYWRlZDogdGFza0Fuc3dlckxvYWRlZFJlZHVjZXIsXG4gICAgICAgIHRhc2tBbnN3ZXJHcmFkZWQ6IHRhc2tBbnN3ZXJHcmFkZWRSZWR1Y2VyLFxuICAgIH0sXG4gICAgc2FnYTogZnVuY3Rpb24qICgpIHtcbiAgICAgICAgY29uc3QgYWN0aW9ucyA9IHlpZWxkIHNlbGVjdCgoe2FjdGlvbnN9KSA9PiBhY3Rpb25zKTtcbiAgICAgICAgeWllbGQgdGFrZUV2ZXJ5KGFjdGlvbnMudGFza1Nob3dWaWV3c0V2ZW50LCB0YXNrU2hvd1ZpZXdzRXZlbnRTYWdhKTtcbiAgICAgICAgeWllbGQgdGFrZUV2ZXJ5KGFjdGlvbnMudGFza0dldFZpZXdzRXZlbnQsIHRhc2tHZXRWaWV3c0V2ZW50U2FnYSk7XG4gICAgICAgIHlpZWxkIHRha2VFdmVyeShhY3Rpb25zLnRhc2tVcGRhdGVUb2tlbkV2ZW50LCB0YXNrVXBkYXRlVG9rZW5FdmVudFNhZ2EpO1xuICAgICAgICB5aWVsZCB0YWtlRXZlcnkoYWN0aW9ucy50YXNrR2V0SGVpZ2h0RXZlbnQsIHRhc2tHZXRIZWlnaHRFdmVudFNhZ2EpO1xuICAgICAgICB5aWVsZCB0YWtlRXZlcnkoYWN0aW9ucy50YXNrVW5sb2FkRXZlbnQsIHRhc2tVbmxvYWRFdmVudFNhZ2EpO1xuICAgICAgICB5aWVsZCB0YWtlRXZlcnkoYWN0aW9ucy50YXNrR2V0U3RhdGVFdmVudCwgdGFza0dldFN0YXRlRXZlbnRTYWdhKTtcbiAgICAgICAgeWllbGQgdGFrZUV2ZXJ5KGFjdGlvbnMudGFza0dldE1ldGFEYXRhRXZlbnQsIHRhc2tHZXRNZXRhRGF0YUV2ZW50U2FnYSk7XG4gICAgICAgIHlpZWxkIHRha2VFdmVyeShhY3Rpb25zLnRhc2tSZWxvYWRBbnN3ZXJFdmVudCwgdGFza1JlbG9hZEFuc3dlckV2ZW50U2FnYSk7XG4gICAgICAgIHlpZWxkIHRha2VFdmVyeShhY3Rpb25zLnRhc2tSZWxvYWRTdGF0ZUV2ZW50LCB0YXNrUmVsb2FkU3RhdGVFdmVudFNhZ2EpO1xuICAgICAgICB5aWVsZCB0YWtlRXZlcnkoYWN0aW9ucy50YXNrR2V0QW5zd2VyRXZlbnQsIHRhc2tHZXRBbnN3ZXJFdmVudFNhZ2EpO1xuICAgICAgICB5aWVsZCB0YWtlRXZlcnkoYWN0aW9ucy50YXNrTG9hZEV2ZW50LCB0YXNrTG9hZEV2ZW50U2FnYSk7XG4gICAgICAgIHlpZWxkIHRha2VFdmVyeShhY3Rpb25zLnRhc2tHcmFkZUFuc3dlckV2ZW50LCB0YXNrR3JhZGVBbnN3ZXJFdmVudFNhZ2EpO1xuICAgIH1cbn07XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvYWxnb3JlYV9yZWFjdF90YXNrL3BsYXRmb3JtX2J1bmRsZS5qcyIsIlxuaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCB7QWxlcnR9IGZyb20gJ3JlYWN0LWJvb3RzdHJhcCc7XG5pbXBvcnQge2Nvbm5lY3R9IGZyb20gJ3JlYWN0LXJlZHV4JztcbmltcG9ydCB7Y2FsbCwgcHV0LCBzZWxlY3QsIHRha2VFdmVyeX0gZnJvbSAncmVkdXgtc2FnYS9lZmZlY3RzJztcbmltcG9ydCB1cGRhdGUgZnJvbSAnaW1tdXRhYmlsaXR5LWhlbHBlcic7XG5cbmZ1bmN0aW9uIGhpbnRSZXF1ZXN0RnVsZmlsbGVkUmVkdWNlciAoc3RhdGUsIF9hY3Rpb24pIHtcbiAgICByZXR1cm4gey4uLnN0YXRlLCBoaW50UmVxdWVzdDoge3N1Y2Nlc3M6IHRydWV9fTtcbn1cblxuZnVuY3Rpb24gaGludFJlcXVlc3RSZWplY3RlZFJlZHVjZXIgKHN0YXRlLCB7cGF5bG9hZDoge2NvZGUsIGVycm9yfX0pIHtcbiAgICByZXR1cm4gey4uLnN0YXRlLCBoaW50UmVxdWVzdDoge3N1Y2Nlc3M6IGZhbHNlLCBjb2RlLCBlcnJvcn19O1xufVxuXG5mdW5jdGlvbiBoaW50UmVxdWVzdEZlZWRiYWNrQ2xlYXJlZFJlZHVjZXIgKHN0YXRlLCBfYWN0aW9uKSB7XG4gICAgcmV0dXJuIHsuLi5zdGF0ZSwgaGludFJlcXVlc3Q6IGZhbHNlfTtcbn1cblxuZnVuY3Rpb24qIHJlcXVlc3RIaW50U2FnYSAoe3BheWxvYWQ6IHtyZXF1ZXN0fX0pIHtcbiAgICBjb25zdCBhY3Rpb25zID0geWllbGQgc2VsZWN0KCh7YWN0aW9uc30pID0+IGFjdGlvbnMpO1xuICAgIGxldCBjb2RlID0gMDtcbiAgICB0cnkge1xuICAgICAgICBjb25zdCB7YWN0aW9ucywgdGFza1Rva2VuOiBpbml0aWFsVGFza1Rva2VuLCBzZXJ2ZXJBcGl9ID0geWllbGQgc2VsZWN0KHN0YXRlID0+IHN0YXRlKTtcbiAgICAgICAgY29kZSA9IDEwO1xuICAgICAgICBjb25zdCB7YXNrSGludH0gPSB5aWVsZCBzZWxlY3Qoc3RhdGUgPT4gc3RhdGUucGxhdGZvcm1BcGkpO1xuICAgICAgICBjb2RlID0gMjA7XG4gICAgICAgIC8qIENvbnRhY3Qgc2VydmVyQXBpIHRvIG9idGFpbiBhIGhpbnRUb2tlbiBmb3IgdGhlIHJlcXVlc3RlZCBoaW50LiAqL1xuICAgICAgICBjb25zdCB7aGludFRva2VufSA9IHlpZWxkIGNhbGwoc2VydmVyQXBpLCAndGFza3MnLCAncmVxdWVzdEhpbnQnLCB7dGFzazogaW5pdGlhbFRhc2tUb2tlbiwgcmVxdWVzdH0pO1xuICAgICAgICBjb2RlID0gMzA7XG4gICAgICAgIC8qIENvbnRhY3QgdGhlIHBsYXRmb3JtIHRvIGF1dGhvcml6ZSB0aGUgaGludCByZXF1ZXN0LiAqL1xuICAgICAgICB5aWVsZCBjYWxsKGFza0hpbnQsIGhpbnRUb2tlbik7XG4gICAgICAgIGNvZGUgPSA0MDtcbiAgICAgICAgLyogV2hlbiBhc2tIaW50IHJldHVybnMgYW4gdXBkYXRlZCB0YXNrVG9rZW4gaXMgb2J0YWluZWQgZnJvbSB0aGUgc3RvcmUuICovXG4gICAgICAgIGNvbnN0IHVwZGF0ZWRUYXNrVG9rZW4gPSB5aWVsZCBzZWxlY3Qoc3RhdGUgPT4gc3RhdGUudGFza1Rva2VuKTtcbiAgICAgICAgY29kZSA9IDUwO1xuICAgICAgICAvKiBGaW5hbGx5LCBjb250YWN0IHRoZSBzZXJ2ZXJBcGkgdG8gb2J0YWluIHRoZSB1cGRhdGVkIHRhc2tEYXRhLiAqL1xuICAgICAgICBjb25zdCB0YXNrRGF0YSA9IHlpZWxkIGNhbGwoc2VydmVyQXBpLCAndGFza3MnLCAndGFza0RhdGEnLCB7dGFzazogdXBkYXRlZFRhc2tUb2tlbn0pO1xuICAgICAgICBjb2RlID0gNjA7XG4gICAgICAgIHlpZWxkIHB1dCh7dHlwZTogYWN0aW9ucy50YXNrRGF0YUxvYWRlZCwgcGF5bG9hZDoge3Rhc2tEYXRhfX0pO1xuICAgICAgICB5aWVsZCBwdXQoe3R5cGU6IGFjdGlvbnMudGFza1JlZnJlc2h9KTtcbiAgICAgICAgeWllbGQgcHV0KHt0eXBlOiBhY3Rpb25zLmhpbnRSZXF1ZXN0RnVsZmlsbGVkLCBwYXlsb2FkOiB7fX0pO1xuICAgIH0gY2F0Y2ggKGV4KSB7XG4gICAgICAgIHlpZWxkIHB1dCh7dHlwZTogYWN0aW9ucy5oaW50UmVxdWVzdFJlamVjdGVkLCBwYXlsb2FkOiB7Y29kZTogY29kZSwgZXJyb3I6IGV4fX0pO1xuICAgIH1cbn1cblxuZnVuY3Rpb24gSGludFJlcXVlc3RGZWVkYmFja1NlbGVjdG9yIChzdGF0ZSkge1xuICAgIGNvbnN0IHthY3Rpb25zLCBoaW50UmVxdWVzdH0gPSBzdGF0ZTtcbiAgICBpZiAoIWhpbnRSZXF1ZXN0KSByZXR1cm4ge307XG4gICAgY29uc3Qge2hpbnRSZXF1ZXN0RmVlZGJhY2tDbGVhcmVkfSA9IGFjdGlvbnM7XG4gICAgY29uc3Qge3N1Y2Nlc3MsIGNvZGUsIGVycm9yfSA9IGhpbnRSZXF1ZXN0O1xuICAgIHJldHVybiB7dmlzaWJsZTogdHJ1ZSwgc3VjY2VzcywgY29kZSwgZXJyb3IsIGhpbnRSZXF1ZXN0RmVlZGJhY2tDbGVhcmVkfTtcbn1cblxuY2xhc3MgSGludFJlcXVlc3RGZWVkYmFjayBleHRlbmRzIFJlYWN0LlB1cmVDb21wb25lbnQge1xuICAgIHJlbmRlciAoKSB7XG4gICAgICAgIGNvbnN0IHt2aXNpYmxlLCBzdWNjZXNzfSA9IHRoaXMucHJvcHM7XG4gICAgICAgIGlmICghdmlzaWJsZSkgcmV0dXJuIGZhbHNlO1xuICAgICAgICBpZiAoc3VjY2Vzcykge1xuICAgICAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgICAgICA8QWxlcnQgYnNTdHlsZT0nc3VjY2Vzcycgb25EaXNtaXNzPXt0aGlzLmhhbmRsZURpc21pc3N9PlxuICAgICAgICAgICAgICAgICAgICA8cD57XCJMJ2luZGljZSBkZW1hbmTDqSBhIMOpdMOpIGTDqWxpdnLDqS5cIn08L3A+XG4gICAgICAgICAgICAgICAgPC9BbGVydD5cbiAgICAgICAgICAgICk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBjb25zdCB7Y29kZSwgZXJyb3J9ID0gdGhpcy5wcm9wcztcbiAgICAgICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICAgICAgPEFsZXJ0IGJzU3R5bGU9J2Rhbmdlcicgb25EaXNtaXNzPXt0aGlzLmhhbmRsZURpc21pc3N9PlxuICAgICAgICAgICAgICAgICAgICA8cD57XCJMJ2luZGljZSBkZW1hbmTDqSBuJ2EgcGFzIHB1IMOqdHJlIGTDqWxpdnLDqS5cIn08L3A+XG4gICAgICAgICAgICAgICAgICAgIDxwPntcIkNvZGUgXCJ9e2NvZGV9PC9wPlxuICAgICAgICAgICAgICAgICAgICB7ZXJyb3Iuc3RhdHVzICYmIDxwPntcIkVycmV1ciBzZXJ2ZXVyIFwifXtlcnJvci5zdGF0dXN9PC9wPn1cbiAgICAgICAgICAgICAgICAgICAge2Vycm9yLm1lc3NhZ2UgJiYgPHA+e2Vycm9yLnRvU3RyaW5nKCl9PC9wPn1cbiAgICAgICAgICAgICAgICA8L0FsZXJ0PlxuICAgICAgICAgICAgKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBoYW5kbGVEaXNtaXNzID0gKCkgPT4ge1xuICAgICAgICB0aGlzLnByb3BzLmRpc3BhdGNoKHt0eXBlOiB0aGlzLnByb3BzLmhpbnRSZXF1ZXN0RmVlZGJhY2tDbGVhcmVkLCBwYXlsb2FkOiB7fX0pO1xuICAgIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQge1xuICAgIGFjdGlvbnM6IHtcbiAgICAgICAgcmVxdWVzdEhpbnQ6ICdIaW50LlJlcXVlc3QnLFxuICAgICAgICBoaW50UmVxdWVzdEZ1bGZpbGxlZDogJ0hpbnQuUmVxdWVzdC5GdWxmaWxsZWQnLFxuICAgICAgICBoaW50UmVxdWVzdFJlamVjdGVkOiAnSGludC5SZXF1ZXN0LlJlamVjdGVkJyxcbiAgICAgICAgaGludFJlcXVlc3RGZWVkYmFja0NsZWFyZWQ6ICdIaW50LlJlcXVlc3QuRmVlZGJhY2tDbGVhcmVkJyxcbiAgICB9LFxuICAgIGFjdGlvblJlZHVjZXJzOiB7XG4gICAgICAgIGhpbnRSZXF1ZXN0RnVsZmlsbGVkOiBoaW50UmVxdWVzdEZ1bGZpbGxlZFJlZHVjZXIsXG4gICAgICAgIGhpbnRSZXF1ZXN0UmVqZWN0ZWQ6IGhpbnRSZXF1ZXN0UmVqZWN0ZWRSZWR1Y2VyLFxuICAgICAgICBoaW50UmVxdWVzdEZlZWRiYWNrQ2xlYXJlZDogaGludFJlcXVlc3RGZWVkYmFja0NsZWFyZWRSZWR1Y2VyLFxuICAgIH0sXG4gICAgdmlld3M6IHtcbiAgICAgICAgSGludFJlcXVlc3RGZWVkYmFjazogY29ubmVjdChIaW50UmVxdWVzdEZlZWRiYWNrU2VsZWN0b3IpKEhpbnRSZXF1ZXN0RmVlZGJhY2spXG4gICAgfSxcbiAgICBzYWdhOiBmdW5jdGlvbiogaGludHNTYWdhICgpIHtcbiAgICAgICAgY29uc3QgYWN0aW9ucyA9IHlpZWxkIHNlbGVjdCgoe2FjdGlvbnN9KSA9PiBhY3Rpb25zKTtcbiAgICAgICAgeWllbGQgdGFrZUV2ZXJ5KGFjdGlvbnMucmVxdWVzdEhpbnQsIHJlcXVlc3RIaW50U2FnYSk7XG4gICAgfVxufTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9hbGdvcmVhX3JlYWN0X3Rhc2svaGludHNfYnVuZGxlLmpzIiwiXG5pbXBvcnQge2NhbGwsIHRha2V9IGZyb20gJ3JlZHV4LXNhZ2EvZWZmZWN0cyc7XG5pbXBvcnQge2J1ZmZlcnMsIGV2ZW50Q2hhbm5lbH0gZnJvbSAncmVkdXgtc2FnYSc7XG5cbmV4cG9ydCBmdW5jdGlvbiogd2luZG93SGVpZ2h0TW9uaXRvclNhZ2EgKHBsYXRmb3JtQXBpKSB7XG4gICAgY29uc3QgY2hhbm5lbCA9IGV2ZW50Q2hhbm5lbChlbWl0ID0+IHtcbiAgICAgICAgZnVuY3Rpb24gb25SZXNpemUgKCkge1xuICAgICAgICAgICAgY29uc3QgaGVpZ2h0ID0gd2luZG93LmRvY3VtZW50LmJvZHkuY2xpZW50SGVpZ2h0O1xuICAgICAgICAgICAgZW1pdCh7aGVpZ2h0fSk7XG4gICAgICAgIH1cbiAgICAgICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ3Jlc2l6ZScsIG9uUmVzaXplKTtcbiAgICAgICAgcmV0dXJuIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHdpbmRvdy5yZW1vdmVFdmVudExpc3RlbmVyKCdyZXNpemUnLCBvblJlc2l6ZSk7XG4gICAgICAgIH07XG4gICAgfSwgYnVmZmVycy5zbGlkaW5nKDEpKTtcbiAgICB0cnkge1xuICAgICAgICBsZXQgbGFzdEhlaWdodDtcbiAgICAgICAgd2hpbGUgKHRydWUpIHtcbiAgICAgICAgICAgIGNvbnN0IHtoZWlnaHR9ID0geWllbGQgdGFrZShjaGFubmVsKTtcbiAgICAgICAgICAgIGlmIChoZWlnaHQgIT09IGxhc3RIZWlnaHQpIHtcbiAgICAgICAgICAgICAgICB5aWVsZCBjYWxsKHBsYXRmb3JtQXBpLnVwZGF0ZURpc3BsYXksIHtoZWlnaHR9KTtcbiAgICAgICAgICAgICAgICBsYXN0SGVpZ2h0ID0gaGVpZ2h0O1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfSBmaW5hbGx5IHtcbiAgICAgICAgY2hhbm5lbC5jbG9zZSgpO1xuICAgIH1cbn1cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9hbGdvcmVhX3JlYWN0X3Rhc2svd2luZG93X2hlaWdodF9tb25pdG9yLmpzIiwiLy8gc3R5bGUtbG9hZGVyOiBBZGRzIHNvbWUgY3NzIHRvIHRoZSBET00gYnkgYWRkaW5nIGEgPHN0eWxlPiB0YWdcblxuLy8gbG9hZCB0aGUgc3R5bGVzXG52YXIgY29udGVudCA9IHJlcXVpcmUoXCIhIS4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2luZGV4LmpzPz9yZWYtLTEtMSEuL3N0eWxlLmNzc1wiKTtcbmlmKHR5cGVvZiBjb250ZW50ID09PSAnc3RyaW5nJykgY29udGVudCA9IFtbbW9kdWxlLmlkLCBjb250ZW50LCAnJ11dO1xuLy8gUHJlcGFyZSBjc3NUcmFuc2Zvcm1hdGlvblxudmFyIHRyYW5zZm9ybTtcblxudmFyIG9wdGlvbnMgPSB7XCJzb3VyY2VNYXBcIjp0cnVlLFwiaG1yXCI6dHJ1ZX1cbm9wdGlvbnMudHJhbnNmb3JtID0gdHJhbnNmb3JtXG4vLyBhZGQgdGhlIHN0eWxlcyB0byB0aGUgRE9NXG52YXIgdXBkYXRlID0gcmVxdWlyZShcIiEuLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2xpYi9hZGRTdHlsZXMuanNcIikoY29udGVudCwgb3B0aW9ucyk7XG5pZihjb250ZW50LmxvY2FscykgbW9kdWxlLmV4cG9ydHMgPSBjb250ZW50LmxvY2Fscztcbi8vIEhvdCBNb2R1bGUgUmVwbGFjZW1lbnRcbmlmKG1vZHVsZS5ob3QpIHtcblx0Ly8gV2hlbiB0aGUgc3R5bGVzIGNoYW5nZSwgdXBkYXRlIHRoZSA8c3R5bGU+IHRhZ3Ncblx0aWYoIWNvbnRlbnQubG9jYWxzKSB7XG5cdFx0bW9kdWxlLmhvdC5hY2NlcHQoXCIhIS4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2luZGV4LmpzPz9yZWYtLTEtMSEuL3N0eWxlLmNzc1wiLCBmdW5jdGlvbigpIHtcblx0XHRcdHZhciBuZXdDb250ZW50ID0gcmVxdWlyZShcIiEhLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvaW5kZXguanM/P3JlZi0tMS0xIS4vc3R5bGUuY3NzXCIpO1xuXHRcdFx0aWYodHlwZW9mIG5ld0NvbnRlbnQgPT09ICdzdHJpbmcnKSBuZXdDb250ZW50ID0gW1ttb2R1bGUuaWQsIG5ld0NvbnRlbnQsICcnXV07XG5cdFx0XHR1cGRhdGUobmV3Q29udGVudCk7XG5cdFx0fSk7XG5cdH1cblx0Ly8gV2hlbiB0aGUgbW9kdWxlIGlzIGRpc3Bvc2VkLCByZW1vdmUgdGhlIDxzdHlsZT4gdGFnc1xuXHRtb2R1bGUuaG90LmRpc3Bvc2UoZnVuY3Rpb24oKSB7IHVwZGF0ZSgpOyB9KTtcbn1cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL3NyYy9zdHlsZS5jc3Ncbi8vIG1vZHVsZSBpZCA9IDU2NlxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJleHBvcnRzID0gbW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvbGliL2Nzcy1iYXNlLmpzXCIpKGZhbHNlKTtcbi8vIGltcG9ydHNcblxuXG4vLyBtb2R1bGVcbmV4cG9ydHMucHVzaChbbW9kdWxlLmlkLCBcIiNjb250YWluZXIge1xcbiAgICB1c2VyLXNlbGVjdDogbm9uZTtcXG4gICAgLW1vei11c2VyLXNlbGVjdDogbm9uZTtcXG4gICAgLXdlYmtpdC11c2VyLXNlbGVjdDogbm9uZTtcXG4gICAgLW1zLXVzZXItc2VsZWN0OiBub25lO1xcblxcdHdpZHRoOiA4MDBweDtcXG59XFxuLnRhc2tJbnN0cnVjdGlvbnMge1xcbiAgICB0ZXh0LWFsaWduOiBqdXN0aWZ5O1xcbn1cXG4udGFza0luc3RydWN0aW9ucyB0YWJsZS5wcmUge1xcbiAgICBtYXJnaW46IDEwcHggYXV0bztcXG59XFxuLnRhc2tJbnN0cnVjdGlvbnMgdGFibGUucHJlIHRkIHtcXG4gICAgcGFkZGluZzogNHB4IDEwcHg7XFxufVxcbi50YXNrSW5zdHJ1Y3Rpb25zIC5saXN0LXVuc3R5bGVkIHtcXG4gICAgcGFkZGluZy1sZWZ0OiAzMHB4O1xcbn1cXG4udGV4dC1ib2xkIHtcXG4gICAgZm9udC13ZWlnaHQ6IGJvbGQ7XFxufVxcbi50YXNrV3JhcHBlciAudGFza0luc3RydWN0aW9ucyB7XFxuICAgIHBhZGRpbmctdG9wOiAzMHB4O1xcbiAgICBwb3NpdGlvbjogcmVsYXRpdmU7XFxufVxcbi50b3BQbGFpbldvcmRDb250YWluZXIge1xcbiAgICBtYXJnaW46IDEwcHggMjBweDtcXG4gICAgaGVpZ2h0OiAzNHB4O1xcbn1cXG4udG9wUGxhaW5Xb3JkIHtcXG4gICAgZm9udC1mYW1pbHk6IEx1Y2lkYSBDb25zb2xlLE1vbmFjbyxtb25vc3BhY2U7XFxuICAgIGZvbnQtc2l6ZTogMThweDtcXG4gICAgZGlzcGxheTogaW5saW5lLWJsb2NrO1xcbiAgICBtYXJnaW4tcmlnaHQ6IDIwcHg7XFxuICAgIGJhY2tncm91bmQtY29sb3I6ICNmZmY7XFxuICAgIGJvcmRlcjogMXB4IHNvbGlkICM3Nzc7XFxuICAgIGJveC1zaGFkb3c6IDNweCAycHggM3B4ICNjY2M7XFxuICAgIGxpbmUtaGVpZ2h0OiAyN3B4O1xcbiAgICBsZXR0ZXItc3BhY2luZzogMTBweDtcXG4gICAgcGFkZGluZy1sZWZ0OiA1cHg7XFxufVxcbi5oaW50c0RpYWxvZyB7XFxuICB3aWR0aDogNTAlO1xcbiAgbWF4LXdpZHRoOiA0MDBweDtcXG4gIGJhY2tncm91bmQ6ICNmMGYwZjA7XFxuICBib3JkZXI6IDFweCBzb2xpZCBibGFjaztcXG4gIGJvcmRlci1yYWRpdXM6IDNweDtcXG4gIHBhZGRpbmc6IDVweDtcXG4gIHBvc2l0aW9uOiBhYnNvbHV0ZTtcXG4gIGJvdHRvbTogMTVweDtcXG4gIHJpZ2h0OiAxNXB4O1xcbiAgei1pbmRleDogMTtcXG59XFxuLmhpbnRzRGlhbG9nIHAge1xcbiAgICBtYXJnaW4tYm90dG9tOiA1cHg7XFxufVxcbi5oaW50c0RpYWxvZyBidXR0b24gKyBidXR0b24ge1xcbiAgICBtYXJnaW4tbGVmdDogMTBweDtcXG59XFxuLmtleVRhYmxlIHtcXG4gICAgbWFyZ2luLXRvcDogMTBweDtcXG59XFxuLmtleVRhYmxlIHNwYW4ge1xcbiAgICB3aWR0aDogMjBweDtcXG4gICAgZGlzcGxheTogaW5saW5lLWJsb2NrO1xcbiAgICBtYXJnaW4tcmlnaHQ6IDJweDtcXG4gICAgdGV4dC1hbGlnbjogY2VudGVyO1xcbn1cXG4ua2V5VGFibGUgc3BhbiBidXR0b24ge1xcbiAgICBwYWRkaW5nOiAwO1xcbiAgICB3aWR0aDogMTAwJTtcXG4gICAgYm9yZGVyOiBub25lO1xcbn1cXG4ua2V5VGFibGUgLmtleVZhbHVlIHtcXG4gICAgYm9yZGVyOiAxcHggc29saWQgI2NjYztcXG4gICAgYm9yZGVyLXJhZGl1czogNHB4O1xcbiAgICBjdXJzb3I6IHBvaW50ZXI7XFxufVxcbi5rZXlUYWJsZSAua2V5VmFsdWUuaXMtaGludCB7XFxuICAgIGJvcmRlcjogbm9uZTtcXG4gICAgY3Vyc29yOiBkZWZhdWx0O1xcbiAgICBmb250LXdlaWdodDogYm9sZDtcXG59XFxuLmtleVRhYmxlIC5rZXlWYWx1ZS5pcy1oaW50LXJlcXVlc3Qge1xcbiAgICBiYWNrZ3JvdW5kOiAjMDAwO1xcbiAgICBjb2xvcjogI2ZmZjtcXG4gICAgZm9udC13ZWlnaHQ6IGJvbGQ7XFxufVxcbi5pcy1oaW50LW1pc21hdGNoIHtcXG4gICAgYmFja2dyb3VuZC1jb2xvcjogI2ZmNDQ0NCAhaW1wb3J0YW50O1xcbn1cXG5cXG4uY2lwaGVyc0FuZFBsYWlucyB7XFxuICAgIGZvbnQtZmFtaWx5OiBMdWNpZGEgQ29uc29sZSxNb25hY28sbW9ub3NwYWNlO1xcbiAgICBmb250LXNpemU6IDE4cHg7XFxufVxcbi5jaXBoZXJUYWJsZSB7XFxuICAgIG1hcmdpbi10b3A6IDIwcHg7XFxufVxcbi5wbGFpblRhYmxlIHtcXG4gICAgYmFja2dyb3VuZDogI2VmZWZlZjtcXG59XFxuLmNpcGhlcnNBbmRQbGFpbnMgc3BhbiB7XFxuICAgIHdpZHRoOiAyMHB4O1xcbiAgICBkaXNwbGF5OiBpbmxpbmUtYmxvY2s7XFxuICAgIG1hcmdpbi1yaWdodDogMnB4O1xcbiAgICB0ZXh0LWFsaWduOiBjZW50ZXI7XFxuICAgIGJvcmRlcjogMXB4IHNvbGlkICNjY2M7XFxuICAgIGhlaWdodDogMjdweDtcXG4gICAgdmVydGljYWwtYWxpZ246IGJvdHRvbTtcXG59XFxuLmNpcGhlclRhYmxlIHNwYW4ge2JvcmRlci1ib3R0b206IG5vbmU7fVxcbi5wbGFpblRhYmxlIHNwYW4ge2JvcmRlci10b3A6IG5vbmU7fVxcbi5wbGFpblRhYmxlIC5wbGFpbkNoYXIge1xcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjZmZmO1xcbiAgICBib3gtc2hhZG93OiAzcHggMnB4IDNweCAjY2NjO1xcbiAgICBib3JkZXItdG9wOiAxcHggc29saWQ7XFxuICAgIGJvcmRlci1jb2xvcjogIzc3NztcXG4gICAgYmFja2dyb3VuZC1jbGlwOiBjb250ZW50LWJveDtcXG59XFxuLnBsYWluQ2hhciArIC5wbGFpbkNoYXIge1xcbiAgICBtYXJnaW4tbGVmdDogLTRweDtcXG4gICAgYm9yZGVyLWxlZnQtY29sb3I6IHRyYW5zcGFyZW50O1xcbiAgICB3aWR0aDogMjRweDtcXG59XFxuLmlucHV0RXJyb3Ige1xcbiAgICBib3JkZXItY29sb3I6IHJlZDtcXG4gICAgYm94LXNoYWRvdzogMCAwIDNweCByZWQgaW5zZXQ7XFxufVxcbi5zZWxlY3RUZXh0IHtcXG4gICAgcG9zaXRpb246IGFic29sdXRlO1xcbiAgICBjdXJzb3I6IHBvaW50ZXI7XFxufVxcbi5zZWxlY3RUZXh0SW5uZXIge1xcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjZmZmO1xcbiAgICBib3JkZXI6IDFweCBzb2xpZCAjYWNhY2FjO1xcbn1cXG4uc2VsZWN0VGV4dC5zZWxlY3RlZCAuc2VsZWN0VGV4dElubmVyIHtcXG4gICAgYmFja2dyb3VuZC1jb2xvcjogI2NjYztcXG59XFxuLnNlbGVjdFRleHRJbm5lciA+IHNwYW4ge1xcbiAgICBwb3NpdGlvbjogYWJzb2x1dGU7XFxuICAgIHRleHQtYWxpZ246IGNlbnRlcjtcXG59XFxuLnNlbGVjdFRleHQtcm93cyAuc2VsZWN0VGV4dElubmVyID4gc3BhbiB7XFxuICAgIHRvcDogLTFweDtcXG59XFxuLnNlbGVjdFRleHQtY29sdW1ucyAuc2VsZWN0VGV4dElubmVyID4gc3BhbiB7XFxuICAgIGxlZnQ6IC0xcHg7XFxufVxcbi50YXNrSGVhZGVyIHtcXG5cXG59XFxuLnN1Ym1pdEJsb2NrLCAuc2NvcmVCbG9jaywgLmZlZWRiYWNrQmxvY2ssIC5zYXZlQmxvY2sge1xcbiAgICBkaXNwbGF5OiBpbmxpbmUtYmxvY2s7XFxuICAgIGxpbmUtaGVpZ2h0OiAzNHB4O1xcbiAgICBtYXJnaW46IDAgMTBweCAwIDA7XFxufVxcbi50YXNrSGVhZGVyID4gKjpsYXN0LWNoaWxkIHtcXG4gICAgbWFyZ2luOiAwO1xcbn1cXG4uc2NvcmVCbG9jaywgLmZlZWRiYWNrQmxvY2sge1xcbiAgICBiYWNrZ3JvdW5kOiAjZjhmOGY4O1xcbiAgICBwYWRkaW5nOiAwIDhweDtcXG59XFxuLmZlZWRiYWNrQmxvY2sge1xcbiAgICBjdXJzb3I6IHBvaW50ZXI7XFxufVxcblwiLCBcIlwiXSk7XG5cbi8vIGV4cG9ydHNcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXI/P3JlZi0tMS0xIS4vc3JjL3N0eWxlLmNzc1xuLy8gbW9kdWxlIGlkID0gNTY3XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIlxuaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCB7Y29ubmVjdH0gZnJvbSAncmVhY3QtcmVkdXgnO1xuXG5pbXBvcnQge3VwZGF0ZUdyaWRHZW9tZXRyeSwgdXBkYXRlR3JpZFZpc2libGVSb3dzfSBmcm9tICcuL3V0aWxzJztcblxuZnVuY3Rpb24gYXBwSW5pdFJlZHVjZXIgKHN0YXRlLCBfYWN0aW9uKSB7XG4gIHJldHVybiB7Li4uc3RhdGUsIGNpcGhlcmVkVGV4dDoge1xuICAgIGNlbGxXaWR0aDogMTUsXG4gICAgY2VsbEhlaWdodDogMTgsXG4gICAgc2Nyb2xsVG9wOiAwLFxuICAgIG5iQ2VsbHM6IDBcbiAgfX07XG59XG5cbmZ1bmN0aW9uIHRhc2tJbml0UmVkdWNlciAoc3RhdGUsIF9hY3Rpb24pIHtcbiAgbGV0IHtjaXBoZXJlZFRleHQsIHRhc2tEYXRhOiB7Y2lwaGVyVGV4dH19ID0gc3RhdGU7XG4gIGNpcGhlcmVkVGV4dCA9IHsuLi5jaXBoZXJlZFRleHQsIGNlbGxzOiBjaXBoZXJUZXh0LCBuYkNlbGxzOiBjaXBoZXJUZXh0Lmxlbmd0aH07XG4gIGNpcGhlcmVkVGV4dCA9IHVwZGF0ZUdyaWRWaXNpYmxlUm93cyhjaXBoZXJlZFRleHQpO1xuICByZXR1cm4gey4uLnN0YXRlLCBjaXBoZXJlZFRleHR9O1xufVxuXG5mdW5jdGlvbiBjaXBoZXJlZFRleHRSZXNpemVkUmVkdWNlciAoc3RhdGUsIHtwYXlsb2FkOiB7d2lkdGh9fSkge1xuICBsZXQge2NpcGhlcmVkVGV4dH0gPSBzdGF0ZTtcbiAgY2lwaGVyZWRUZXh0ID0gey4uLmNpcGhlcmVkVGV4dCwgd2lkdGgsIGhlaWdodDogOCAqIGNpcGhlcmVkVGV4dC5jZWxsSGVpZ2h0fTtcbiAgY2lwaGVyZWRUZXh0ID0gdXBkYXRlR3JpZEdlb21ldHJ5KGNpcGhlcmVkVGV4dCk7XG4gIGNpcGhlcmVkVGV4dCA9IHVwZGF0ZUdyaWRWaXNpYmxlUm93cyhjaXBoZXJlZFRleHQpO1xuICByZXR1cm4gey4uLnN0YXRlLCBjaXBoZXJlZFRleHR9O1xufVxuXG5mdW5jdGlvbiBjaXBoZXJlZFRleHRTY3JvbGxlZFJlZHVjZXIgKHN0YXRlLCB7cGF5bG9hZDoge3Njcm9sbFRvcH19KSB7XG4gIGxldCB7Y2lwaGVyZWRUZXh0fSA9IHN0YXRlO1xuICBjaXBoZXJlZFRleHQgPSB7Li4uY2lwaGVyZWRUZXh0LCBzY3JvbGxUb3B9O1xuICBjaXBoZXJlZFRleHQgPSB1cGRhdGVHcmlkVmlzaWJsZVJvd3MoY2lwaGVyZWRUZXh0KTtcbiAgcmV0dXJuIHsuLi5zdGF0ZSwgY2lwaGVyZWRUZXh0fTtcbn1cblxuZnVuY3Rpb24gQ2lwaGVyVGV4dFZpZXdTZWxlY3RvciAoc3RhdGUpIHtcbiAgY29uc3Qge2FjdGlvbnMsIGNpcGhlcmVkVGV4dH0gPSBzdGF0ZTtcbiAgY29uc3Qge2NpcGhlcmVkVGV4dFJlc2l6ZWQsIGNpcGhlcmVkVGV4dFNjcm9sbGVkfSA9IGFjdGlvbnM7XG4gIGNvbnN0IHt3aWR0aCwgaGVpZ2h0LCBjZWxsV2lkdGgsIGNlbGxIZWlnaHQsIGJvdHRvbSwgcGFnZVJvd3MsIHBhZ2VDb2x1bW5zLCB2aXNpYmxlfSA9IGNpcGhlcmVkVGV4dDtcbiAgcmV0dXJuIHtcbiAgICBjaXBoZXJlZFRleHRSZXNpemVkLCBjaXBoZXJlZFRleHRTY3JvbGxlZCxcbiAgICB3aWR0aCwgaGVpZ2h0LCB2aXNpYmxlUm93czogdmlzaWJsZS5yb3dzLCBjZWxsV2lkdGgsIGNlbGxIZWlnaHQsIGJvdHRvbSwgcGFnZVJvd3MsIHBhZ2VDb2x1bW5zXG4gIH07XG59XG5cbmNsYXNzIENpcGhlclRleHRWaWV3IGV4dGVuZHMgUmVhY3QuUHVyZUNvbXBvbmVudCB7XG5cbiAgcmVuZGVyICgpIHtcbiAgICBjb25zdCB7d2lkdGgsIGhlaWdodCwgdmlzaWJsZVJvd3MsIGNlbGxXaWR0aCwgY2VsbEhlaWdodCwgYm90dG9tfSA9IHRoaXMucHJvcHM7XG4gICAgcmV0dXJuIChcbiAgICAgIDxkaXY+XG4gICAgICAgIDxkaXYgcmVmPXt0aGlzLnJlZlRleHRCb3h9IG9uU2Nyb2xsPXt0aGlzLm9uU2Nyb2xsfSBzdHlsZT17e3Bvc2l0aW9uOiAncmVsYXRpdmUnLCB3aWR0aDogd2lkdGggJiYgYCR7d2lkdGh9cHhgLCBoZWlnaHQ6IGhlaWdodCAmJiBgJHtoZWlnaHR9cHhgLCBvdmVyZmxvd1k6ICdzY3JvbGwnfX0+XG4gICAgICAgICAgeyh2aXNpYmxlUm93c3x8W10pLm1hcCgoe2luZGV4LCBjb2x1bW5zfSkgPT5cbiAgICAgICAgICAgIDxkaXYga2V5PXtpbmRleH0gc3R5bGU9e3twb3NpdGlvbjogJ2Fic29sdXRlJywgdG9wOiBgJHtpbmRleCAqIGNlbGxIZWlnaHR9cHhgfX0+XG4gICAgICAgICAgICAgIHtjb2x1bW5zLm1hcCgoe2luZGV4LCBjZWxsfSkgPT5cbiAgICAgICAgICAgICAgICA8c3BhbiBrZXk9e2luZGV4fSBzdHlsZT17e3Bvc2l0aW9uOiAnYWJzb2x1dGUnLCBsZWZ0OiBgJHtpbmRleCAqIGNlbGxXaWR0aH1weGAsIHdpZHRoOiBgJHtjZWxsV2lkdGh9cHhgLCBoZWlnaHQ6IGAke2NlbGxIZWlnaHR9cHhgfX0+XG4gICAgICAgICAgICAgICAgICB7Y2VsbCB8fCAnICd9XG4gICAgICAgICAgICAgICAgPC9zcGFuPil9XG4gICAgICAgICAgICA8L2Rpdj4pfVxuICAgICAgICAgIDxkaXYgc3R5bGU9e3twb3NpdGlvbjogJ2Fic29sdXRlJywgdG9wOiBgJHtib3R0b219cHhgLCB3aWR0aDogJzFweCcsIGhlaWdodDogJzFweCd9fS8+XG4gICAgICAgIDwvZGl2PlxuICAgICAgPC9kaXY+XG4gICAgKTtcbiAgfVxuXG4gIHJlZlRleHRCb3ggPSAoZWxlbWVudCkgPT4ge1xuICAgIHRoaXMuX3RleHRCb3ggPSBlbGVtZW50O1xuICAgIGNvbnN0IHdpZHRoID0gZWxlbWVudC5jbGllbnRXaWR0aDtcbiAgICBjb25zdCBoZWlnaHQgPSBlbGVtZW50LmNsaWVudEhlaWdodDtcbiAgICB0aGlzLnByb3BzLmRpc3BhdGNoKHt0eXBlOiB0aGlzLnByb3BzLmNpcGhlcmVkVGV4dFJlc2l6ZWQsIHBheWxvYWQ6IHt3aWR0aCwgaGVpZ2h0fX0pO1xuICB9O1xuXG4gIG9uU2Nyb2xsID0gKCkgPT4ge1xuICAgIGNvbnN0IHNjcm9sbFRvcCA9IHRoaXMuX3RleHRCb3guc2Nyb2xsVG9wO1xuICAgIHRoaXMucHJvcHMuZGlzcGF0Y2goe3R5cGU6IHRoaXMucHJvcHMuY2lwaGVyZWRUZXh0U2Nyb2xsZWQsIHBheWxvYWQ6IHtzY3JvbGxUb3B9fSk7XG4gIH07XG5cbn1cblxuZXhwb3J0IGRlZmF1bHQge1xuICBhY3Rpb25zOiB7XG4gICAgY2lwaGVyZWRUZXh0UmVzaXplZDogJ0NpcGhlcmVkVGV4dC5SZXNpemVkJyAvKiB7d2lkdGg6IG51bWJlciwgaGVpZ2h0OiBudW1iZXJ9ICovLFxuICAgIGNpcGhlcmVkVGV4dFNjcm9sbGVkOiAnQ2lwaGVyZWRUZXh0LlNjcm9sbGVkJyAvKiB7c2Nyb2xsVG9wOiBudW1iZXJ9ICovLFxuICB9LFxuICBhY3Rpb25SZWR1Y2Vyczoge1xuICAgIGFwcEluaXQ6IGFwcEluaXRSZWR1Y2VyLFxuICAgIHRhc2tJbml0OiB0YXNrSW5pdFJlZHVjZXIsXG4gICAgY2lwaGVyZWRUZXh0UmVzaXplZDogY2lwaGVyZWRUZXh0UmVzaXplZFJlZHVjZXIsXG4gICAgY2lwaGVyZWRUZXh0U2Nyb2xsZWQ6IGNpcGhlcmVkVGV4dFNjcm9sbGVkUmVkdWNlcixcbiAgfSxcbiAgdmlld3M6IHtcbiAgICBDaXBoZXJlZFRleHQ6IGNvbm5lY3QoQ2lwaGVyVGV4dFZpZXdTZWxlY3RvcikoQ2lwaGVyVGV4dFZpZXcpLFxuICB9XG59O1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL2NpcGhlcmVkX3RleHRfYnVuZGxlLmpzIiwiXG5pbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IHtjb25uZWN0fSBmcm9tICdyZWFjdC1yZWR1eCc7XG5pbXBvcnQge3JhbmdlfSBmcm9tICdyYW5nZSc7XG5pbXBvcnQgc2VlZHJhbmRvbSBmcm9tICdzZWVkcmFuZG9tJztcblxuZnVuY3Rpb24gYXBwSW5pdFJlZHVjZXIgKHN0YXRlLCBfYWN0aW9uKSB7XG4gIHJldHVybiB7Li4uc3RhdGUsIGZyZXF1ZW5jeUFuYWx5c2lzOiB7fX07XG59XG5cbmZ1bmN0aW9uIGZyZXF1ZW5jeUFuYWx5c2lzTGF0ZVJlZHVjZXIgKHN0YXRlKSB7XG4gIGlmIChzdGF0ZS5mcmVxdWVuY3lBbmFseXNpcyAmJiBzdGF0ZS50YXNrRGF0YSkge1xuICAgIGxldCB7dGFza0RhdGE6IHthbHBoYWJldCwgcmVmZXJlbmNlRnJlcXVlbmNpZXMsIGZyZXF1ZW5jaWVzLCBjaXBoZXJUZXh0fSwgZnJlcXVlbmN5QW5hbHlzaXN9ID0gc3RhdGU7XG4gICAgbGV0IHRleHRGcmVxdWVuY2llcyA9IFtdO1xuICAgIGlmIChjaXBoZXJUZXh0ICYmIGFscGhhYmV0KSB7XG4gICAgICBjb25zdCBmcmVxTWFwID0gbmV3IE1hcChhbHBoYWJldC5zcGxpdCgnJykubWFwKGMgPT4gW2MsIDBdKSk7XG4gICAgICBjb3VudFN5bWJvbHMoZnJlcU1hcCwgY2lwaGVyVGV4dCwgMCwgY2lwaGVyVGV4dC5sZW5ndGgtMSk7XG4gICAgICB0ZXh0RnJlcXVlbmNpZXMgPSBub3JtYWxpemVBbmRTb3J0RnJlcXVlbmNpZXMoZnJlcU1hcC5lbnRyaWVzKCkpO1xuICAgIH0gXG4gICAgZnJlcXVlbmN5QW5hbHlzaXMgPSB7Li4uZnJlcXVlbmN5QW5hbHlzaXMsIHRleHRGcmVxdWVuY2llc307XG4gICAgc3RhdGUgPSB7Li4uc3RhdGUsIGZyZXF1ZW5jeUFuYWx5c2lzfTtcbiAgfVxuICByZXR1cm4gc3RhdGU7XG59XG5cbmZ1bmN0aW9uIGNvdW50U3ltYm9scyAobWFwLCB0ZXh0LCBzdGFydFBvcywgZW5kUG9zKSB7XG4gIGZvciAobGV0IHBvcyA9IHN0YXJ0UG9zOyBwb3MgPD0gZW5kUG9zOyBwb3MgKz0gMSkge1xuICAgIGNvdW50U3ltYm9sKG1hcCwgdGV4dFtwb3NdKTtcbiAgfVxufVxuXG5mdW5jdGlvbiBjb3VudFN5bWJvbCAobWFwLCBjaGFyKSB7XG4gIGNvbnN0IGNvdW50ID0gbWFwLmdldChjaGFyKTtcbiAgaWYgKGNvdW50ICE9PSB1bmRlZmluZWQpIHtcbiAgICBtYXAuc2V0KGNoYXIsIGNvdW50ICsgMSk7XG4gIH1cbn1cblxuZnVuY3Rpb24gc3VtRnJlcXVlbmNpZXMgKGRzdCwgYWRkKSB7XG4gIGZvciAobGV0IGkgPSAwOyBpIDwgZHN0Lmxlbmd0aDsgaSArPSAxKSB7XG4gICAgZHN0W2ldICs9IGFkZFtpXTtcbiAgfVxufVxuXG5mdW5jdGlvbiBub3JtYWxpemVBbmRTb3J0RnJlcXVlbmNpZXMgKGVudHJpZXMpIHtcbiAgY29uc3QgcmVzdWx0ID0gQXJyYXkuZnJvbShlbnRyaWVzKTtcbiAgY29uc3QgdG90YWxDb3VudCA9IHJlc3VsdC5yZWR1Y2UoKGEsIHgpID0+IGEgKyB4WzFdLCAwKTtcbiAgcmVzdWx0LnNvcnQoZnVuY3Rpb24gKHMxLCBzMikge1xuICAgICBjb25zdCBwMSA9IHMxWzFdLCBwMiA9IHMyWzFdO1xuICAgICByZXR1cm4gcDEgPiBwMiA/IC0xIDogKHAxIDwgcDIgPyAxIDogMCk7XG4gIH0pO1xuICByZXR1cm4gcmVzdWx0Lm1hcCgoW3N5bWJvbCwgY291bnRdKSA9PiAoe3N5bWJvbCwgcHJvYmE6IGNvdW50IC8gdG90YWxDb3VudH0pKTtcbn1cblxuZnVuY3Rpb24gRnJlcXVlbmN5QW5hbHlzaXNTZWxlY3RvciAoc3RhdGUpIHtcbiAgY29uc3Qge3Rhc2tEYXRhOiB7YWxwaGFiZXQsIHJlZmVyZW5jZUZyZXF1ZW5jaWVzfSwgZnJlcXVlbmN5QW5hbHlzaXM6IHt0ZXh0RnJlcXVlbmNpZXN9fSA9IHN0YXRlO1xuICBjb25zdCBzY2FsZSA9IDMwIC8gcmVmZXJlbmNlRnJlcXVlbmNpZXMucmVkdWNlKChhLCB4KSA9PiBNYXRoLm1heChhLCB4LnByb2JhKSwgMCk7XG4gIHJldHVybiB7XG4gICAgYWxwaGFiZXRTaXplOiBhbHBoYWJldC5sZW5ndGgsXG4gICAgcmVmZXJlbmNlRnJlcXVlbmNpZXMsXG4gICAgdGV4dEZyZXF1ZW5jaWVzLFxuICAgIHNjYWxlXG4gIH07XG59XG5cbmNsYXNzIEZyZXF1ZW5jeUFuYWx5c2lzVmlldyBleHRlbmRzIFJlYWN0LlB1cmVDb21wb25lbnQge1xuICByZW5kZXIgKCkge1xuICAgIGNvbnN0IHthbHBoYWJldFNpemUsIHJlZmVyZW5jZUZyZXF1ZW5jaWVzLCB0ZXh0RnJlcXVlbmNpZXMsIHNjYWxlfSA9IHRoaXMucHJvcHM7XG4gICAgaWYgKCFyZWZlcmVuY2VGcmVxdWVuY2llcykgcmV0dXJuIGZhbHNlO1xuICAgIHJldHVybiAoXG4gICAgICA8ZGl2IGNsYXNzTmFtZT0nY2xlYXJmaXgnPlxuICAgICAgICA8ZGl2IHN0eWxlPXt7ZmxvYXQ6ICdsZWZ0Jywgd2lkdGg6ICcxMDBweCcsIGhlaWdodDogJzEwOHB4JywgZm9udFNpemU6ICcxMHB4JywgbGluZUhlaWdodDogJzEwcHgnLCBwb3NpdGlvbjogJ3JlbGF0aXZlJ319PlxuICAgICAgICAgIDxkaXYgc3R5bGU9e3toZWlnaHQ6ICczMHB4JywgcG9zaXRpb246ICdhYnNvbHV0ZScsIHRvcDogJzBweCd9fT5cbiAgICAgICAgICAgIHtcIkZyw6lxdWVuY2VzIGRhbnMgbGUgdGV4dGUgOlwifVxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgIDxkaXYgc3R5bGU9e3toZWlnaHQ6ICcyMHB4JywgcG9zaXRpb246ICdhYnNvbHV0ZScsIHRvcDogJzMycHgnfX0+XG4gICAgICAgICAgICB7XCJTeW1ib2xlcyBkdSB0ZXh0ZSA6XCJ9XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgPGRpdiBzdHlsZT17e2hlaWdodDogJzIwcHgnLCBwb3NpdGlvbjogJ2Fic29sdXRlJywgdG9wOiAnNTZweCd9fT5cbiAgICAgICAgICAgIHtcIlN1YnN0aXR1dGlvbnMgOlwifVxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgIDxkaXYgc3R5bGU9e3toZWlnaHQ6ICczMHB4JywgcG9zaXRpb246ICdhYnNvbHV0ZScsIHRvcDogJzc4cHgnfX0+XG4gICAgICAgICAgICB7XCJGcsOpcXVlbmNlcyBlbiBmcmFuw6dhaXMgOlwifVxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICA8L2Rpdj5cbiAgICAgICAge3JhbmdlKDAsIGFscGhhYmV0U2l6ZSkubWFwKGluZGV4ID0+XG4gICAgICAgICAgPGRpdiBrZXk9e2luZGV4fSBzdHlsZT17e2Zsb2F0OiAnbGVmdCcsIHdpZHRoOiAnMjBweCcsIGhlaWdodDogJzEwOHB4JywgcG9zaXRpb246ICdyZWxhdGl2ZSd9fT5cbiAgICAgICAgICAgIDxUZXh0RnJlcXVlbmN5Qm94IGluZGV4PXtpbmRleH0gY2VsbD17dGV4dEZyZXF1ZW5jaWVzW2luZGV4XX0gc2NhbGU9e3NjYWxlfSAvPlxuICAgICAgICAgICAgPFJlZmVyZW5jZUZyZXF1ZW5jeUJveCBpbmRleD17aW5kZXh9IGNlbGw9e3JlZmVyZW5jZUZyZXF1ZW5jaWVzW2luZGV4XX0gc2NhbGU9e3NjYWxlfSAvPlxuICAgICAgICAgIDwvZGl2Pil9XG4gICAgICA8L2Rpdj5cbiAgICApO1xuICB9XG59XG5cbmNsYXNzIFRleHRGcmVxdWVuY3lCb3ggZXh0ZW5kcyBSZWFjdC5QdXJlQ29tcG9uZW50IHtcbiAgcmVuZGVyICgpIHtcbiAgICBjb25zdCB7Y2VsbCwgc2NhbGV9ID0gdGhpcy5wcm9wcztcbiAgICBpZiAoIWNlbGwpIHJldHVybiBmYWxzZTtcbiAgICByZXR1cm4gKFxuICAgICAgPGRpdiBzdHlsZT17e3Bvc2l0aW9uOiAnYWJzb2x1dGUnLCB0b3A6ICcwcHgnfX0+XG4gICAgICAgIDxkaXYgc3R5bGU9e3t3aWR0aDogJzIwcHgnLCBoZWlnaHQ6ICczMHB4JywgZGlzcGxheTogJ3RhYmxlLWNlbGwnLCB2ZXJ0aWNhbEFsaWduOiAnYm90dG9tJ319PlxuICAgICAgICAgIDxkaXYgc3R5bGU9e3toZWlnaHQ6IGAke01hdGgubWluKDMwLCBNYXRoLnJvdW5kKGNlbGwucHJvYmEgKiBzY2FsZSkpfXB4YCwgd2lkdGg6ICc4cHgnLCBtYXJnaW5MZWZ0OiAnNXB4JywgYmFja2dyb3VuZDogJ2JsYWNrJ319Lz5cbiAgICAgICAgPC9kaXY+XG4gICAgICAgIDxkaXYgc3R5bGU9e3t3aWR0aDogJzE3cHgnLCBoZWlnaHQ6ICcyMHB4JywgYm9yZGVyOiAnMXB4IHNvbGlkIHdoaXRlJywgbWFyZ2luQm90dG9tOiAnMnB4JywgdGV4dEFsaWduOiAnY2VudGVyJ319PlxuICAgICAgICAgIHtjZWxsLnN5bWJvbH1cbiAgICAgICAgPC9kaXY+XG4gICAgICA8L2Rpdj5cbiAgICApO1xuICB9XG59XG5cbmNsYXNzIFJlZmVyZW5jZUZyZXF1ZW5jeUJveCBleHRlbmRzIFJlYWN0LlB1cmVDb21wb25lbnQge1xuICByZW5kZXIgKCkge1xuICAgIGNvbnN0IHtjZWxsLCBzY2FsZX0gPSB0aGlzLnByb3BzO1xuICAgIHJldHVybiAoXG4gICAgICA8ZGl2IHN0eWxlPXt7cG9zaXRpb246ICdhYnNvbHV0ZScsIHRvcDogJzU2cHgnfX0+XG4gICAgICAgIDxkaXYgc3R5bGU9e3t3aWR0aDogJzE3cHgnLCBoZWlnaHQ6ICcyMHB4JywgYm9yZGVyOiAnMXB4IHNvbGlkIGJsYWNrJywgbWFyZ2luQm90dG9tOiAnMnB4JywgdGV4dEFsaWduOiAnY2VudGVyJ319PlxuICAgICAgICAgIHtjZWxsLnN5bWJvbH1cbiAgICAgICAgPC9kaXY+XG4gICAgICAgIDxkaXYgc3R5bGU9e3t3aWR0aDogJzIwcHgnLCBoZWlnaHQ6ICczMHB4JywgdmVydGljYWxBbGlnbjogJ3RvcCd9fT5cbiAgICAgICAgICA8ZGl2IHN0eWxlPXt7aGVpZ2h0OiBgJHtNYXRoLnJvdW5kKGNlbGwucHJvYmEgKiBzY2FsZSl9cHhgLCB3aWR0aDogJzhweCcsIG1hcmdpbkxlZnQ6ICc1cHgnLCBiYWNrZ3JvdW5kOiAnYmxhY2snfX0vPlxuICAgICAgICA8L2Rpdj5cbiAgICAgIDwvZGl2PlxuICAgICk7XG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQge1xuICBhY3Rpb25SZWR1Y2Vyczoge1xuICAgIGFwcEluaXQ6IGFwcEluaXRSZWR1Y2VyXG4gIH0sXG4gIGxhdGVSZWR1Y2VyOiBmcmVxdWVuY3lBbmFseXNpc0xhdGVSZWR1Y2VyLFxuICB2aWV3czoge1xuICAgIEZyZXF1ZW5jeUFuYWx5c2lzOiBjb25uZWN0KEZyZXF1ZW5jeUFuYWx5c2lzU2VsZWN0b3IpKEZyZXF1ZW5jeUFuYWx5c2lzVmlldylcbiAgfSxcbn07XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvZnJlcXVlbmN5X2FuYWx5c2lzX2J1bmRsZS5qcyIsIi8qIChpZ25vcmVkKSAqL1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIGNyeXB0byAoaWdub3JlZClcbi8vIG1vZHVsZSBpZCA9IDU3OFxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJcbmltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQge2Nvbm5lY3R9IGZyb20gJ3JlYWN0LXJlZHV4JztcbmltcG9ydCB7QnV0dG9ufSBmcm9tICdyZWFjdC1ib290c3RyYXAnO1xuaW1wb3J0IHVwZGF0ZSBmcm9tICdpbW11dGFiaWxpdHktaGVscGVyJztcbmltcG9ydCB7ZGVsYXl9IGZyb20gJ3JlZHV4LXNhZ2EnO1xuaW1wb3J0IHtzZWxlY3QsIHRha2VMYXRlc3QsIHB1dH0gZnJvbSAncmVkdXgtc2FnYS9lZmZlY3RzJztcblxuaW1wb3J0IHthcHBseVJvdG9ycywgZ2V0Um90b3JTaGlmdH0gZnJvbSAnLi91dGlscyc7XG5cbmZ1bmN0aW9uIGFwcEluaXRSZWR1Y2VyIChzdGF0ZSwgX2FjdGlvbikge1xuICByZXR1cm4gey4uLnN0YXRlLCBzY2hlZHVsaW5nOiB7XG4gICAgc3RhdHVzOiAnc3RhcnQnLFxuICAgIHNwZWVkOiAxLjAsXG4gICAgcG9zaXRpb246IDAsXG4gICAgc2hpZnRzOiBbXSxcbiAgICBzdGFydFBvc2l0aW9uOiAwLFxuICAgIGVuZFBvc2l0aW9uOiAwLFxuICAgIGN1cnJlbnRUcmFjZTogW10sXG4gIH19O1xufVxuXG5mdW5jdGlvbiB0YXNrSW5pdFJlZHVjZXIgKHN0YXRlLCBfYWN0aW9uKSB7XG4gIGxldCB7c2NoZWR1bGluZywgdGFza0RhdGE6IHtjaXBoZXJUZXh0fX0gPSBzdGF0ZTtcbiAgc2NoZWR1bGluZyA9IHsuLi5zY2hlZHVsaW5nLCBlbmRQb3NpdGlvbjogY2lwaGVyVGV4dC5sZW5ndGggLSAxfTtcbiAgcmV0dXJuIHsuLi5zdGF0ZSwgc2NoZWR1bGluZ307XG59XG5cbmZ1bmN0aW9uIHNjaGVkdWxpbmdTdGF0dXNDaGFuZ2VkUmVkdWNlciAoc3RhdGUsIHtwYXlsb2FkOiB7c3RhdHVzfX0pIHtcbiAgY29uc3Qge3NjaGVkdWxpbmd9ID0gc3RhdGU7XG4gIGNvbnN0IGNoYW5nZXMgPSB7c3RhdHVzOiB7JHNldDogc3RhdHVzfX07XG4gIGlmIChzdGF0dXMgPT09ICdzdGFydCcpIHtcbiAgICBjaGFuZ2VzLnBvc2l0aW9uID0geyRzZXQ6IHNjaGVkdWxpbmcuc3RhcnRQb3NpdGlvbn07XG4gIH0gZWxzZSBpZiAoc3RhdHVzID09PSAnZW5kJykge1xuICAgIGNoYW5nZXMucG9zaXRpb24gPSB7JHNldDogc2NoZWR1bGluZy5lbmRQb3NpdGlvbn07XG4gIH0gZWxzZSBpZiAoc3RhdHVzID09PSAncGxheScpIHtcbiAgICBpZiAoc2NoZWR1bGluZy5wb3NpdGlvbiA9PT0gc2NoZWR1bGluZy5lbmRQb3NpdGlvbikge1xuICAgICAgY2hhbmdlcy5wb3NpdGlvbiA9IHskc2V0OiBzY2hlZHVsaW5nLnN0YXJ0UG9zaXRpb259O1xuICAgIH1cbiAgfVxuICByZXR1cm4gdXBkYXRlKHN0YXRlLCB7c2NoZWR1bGluZzogY2hhbmdlc30pO1xufVxuXG5mdW5jdGlvbiBzY2hlZHVsaW5nU3RlcEJhY2t3YXJkUmVkdWNlciAoc3RhdGUsIF9hY3Rpb24pIHtcbiAgY29uc3Qge3NjaGVkdWxpbmc6IHtwb3NpdGlvbn19ID0gc3RhdGU7XG4gIGlmIChwb3NpdGlvbiA9PT0gMCkgcmV0dXJuIHN0YXRlO1xuICByZXR1cm4gdXBkYXRlKHN0YXRlLCB7c2NoZWR1bGluZzoge1xuICAgIHN0YXR1czogeyRzZXQ6ICdwYXVzZSd9LFxuICAgIHBvc2l0aW9uOiB7JHNldDogcG9zaXRpb24gLSAxfVxuICB9fSk7XG59XG5cbmZ1bmN0aW9uIHNjaGVkdWxpbmdTdGVwRm9yd2FyZFJlZHVjZXIgKHN0YXRlLCBfYWN0aW9uKSB7XG4gIGNvbnN0IHtzY2hlZHVsaW5nOiB7cG9zaXRpb24sIGVuZFBvc2l0aW9ufX0gPSBzdGF0ZTtcbiAgaWYgKHBvc2l0aW9uID09PSBlbmRQb3NpdGlvbikgcmV0dXJuIHN0YXRlO1xuICByZXR1cm4gdXBkYXRlKHN0YXRlLCB7c2NoZWR1bGluZzoge1xuICAgIHN0YXR1czogeyRzZXQ6ICdwYXVzZSd9LFxuICAgIHBvc2l0aW9uOiB7JHNldDogcG9zaXRpb24gKyAxfVxuICB9fSk7XG59XG5cbmZ1bmN0aW9uIHNjaGVkdWxpbmdKdW1wUmVkdWNlciAoc3RhdGUsIHtwYXlsb2FkOiB7cG9zaXRpb259fSkge1xuICByZXR1cm4gdXBkYXRlKHN0YXRlLCB7c2NoZWR1bGluZzoge1xuICAgIHN0YXR1czogeyRzZXQ6ICdwYXVzZSd9LFxuICAgIHBvc2l0aW9uOiB7JHNldDogcG9zaXRpb259XG4gIH19KTtcbn1cblxuZnVuY3Rpb24gc2NoZWR1bGluZ1RpY2tSZWR1Y2VyIChzdGF0ZSwgX2FjdGlvbikge1xuICBjb25zdCB7c2NoZWR1bGluZzoge3Bvc2l0aW9uLCBlbmRQb3NpdGlvbn19ID0gc3RhdGU7XG4gIGlmIChwb3NpdGlvbiA9PT0gZW5kUG9zaXRpb24pIHtcbiAgICByZXR1cm4gdXBkYXRlKHN0YXRlLCB7c2NoZWR1bGluZzoge1xuICAgICAgc3RhdHVzOiB7JHNldDogJ2VuZCd9XG4gICAgfX0pO1xuICB9XG4gIHJldHVybiB1cGRhdGUoc3RhdGUsIHtzY2hlZHVsaW5nOiB7XG4gICAgcG9zaXRpb246IHskc2V0OiBwb3NpdGlvbiArIDF9XG4gIH19KTtcbn1cblxuZnVuY3Rpb24gc2NoZWR1bGluZ0xhdGVSZWR1Y2VyIChzdGF0ZSkge1xuICBjb25zdCB7dGFza0RhdGEsIHJvdG9ycywgc2NoZWR1bGluZ30gPSBzdGF0ZTtcbiAgaWYgKCF0YXNrRGF0YSkge1xuICAgIHJldHVybiBzdGF0ZTtcbiAgfVxuICBjb25zdCB7YWxwaGFiZXQsIGNpcGhlclRleHR9ID0gdGFza0RhdGE7XG4gIGNvbnN0IHtwb3NpdGlvbn0gPSBzY2hlZHVsaW5nO1xuICAvKiBDb21wdXRlIHRoZSByb3RvciBzaGlmdHMgYXQgdGhlIGN1cnJlbnQgcG9zaXRpb24gKi9cbiAgY29uc3Qgc2hpZnRzID0gcm90b3JzLm1hcChyb3RvciA9PiBnZXRSb3RvclNoaWZ0KHJvdG9yLCBwb3NpdGlvbikpO1xuICBjb25zdCByYW5rID0gYWxwaGFiZXQuaW5kZXhPZihjaXBoZXJUZXh0W3Bvc2l0aW9uXSk7XG4gIC8qIEFwcGx5IHRoZSByb3RvcnMgYXQgdGhlIGN1cnJlbnQgcG9zaXRpb24gdG8gb2J0YWluIGEgdHJhY2UgKGxpc3Qgb2Ygcm90b3JcbiAgICAgY2VsbHMgdXNlZCBkdXJpbmcgZGVjb2RpbmcpLCB0byBiZSBoaWdobGlnaHRlZCBieSB0aGUgcm90b3Igdmlld3MuICovXG4gIGNvbnN0IGN1cnJlbnRUcmFjZSA9IHJhbmsgPT09IC0xID8gbnVsbCA6IGFwcGx5Um90b3JzKHJvdG9ycywgcG9zaXRpb24sIHJhbmspLnRyYWNlO1xuICByZXR1cm4gdXBkYXRlKHN0YXRlLCB7c2NoZWR1bGluZzoge1xuICAgIHNoaWZ0czogeyRzZXQ6IHNoaWZ0c30sIGN1cnJlbnRUcmFjZTogeyRzZXQ6IGN1cnJlbnRUcmFjZX1cbiAgfX0pO1xufVxuXG5mdW5jdGlvbiogc2NoZWR1bGluZ1NhZ2EgKCkge1xuICBjb25zdCB7c2NoZWR1bGluZ1RpY2t9ID0geWllbGQgc2VsZWN0KCh7YWN0aW9uc30pID0+IGFjdGlvbnMpO1xuICBjb25zdCBzdGF0dXNDaGFuZ2luZ0FjdGlvbnMgPSB5aWVsZCBzZWxlY3QoKHthY3Rpb25zfSkgPT4gWydzY2hlZHVsaW5nU3RhdHVzQ2hhbmdlZCcsICdzY2hlZHVsaW5nU3RlcEJhY2t3YXJkJywgJ3NjaGVkdWxpbmdTdGVwRm9yd2FyZCcsICdzY2hlZHVsaW5nSnVtcCddLm1hcChuYW1lID0+IGFjdGlvbnNbbmFtZV0pKTtcbiAgeWllbGQgdGFrZUxhdGVzdChzdGF0dXNDaGFuZ2luZ0FjdGlvbnMsIGZ1bmN0aW9uKiAoKSB7XG4gICAgbGV0IHN0YXR1cyA9IHlpZWxkIHNlbGVjdCgoe3NjaGVkdWxpbmc6IHtzdGF0dXN9fSkgPT4gc3RhdHVzKTtcbiAgICBpZiAoc3RhdHVzID09PSAncGxheScpIHtcbiAgICAgIHdoaWxlICh0cnVlKSB7XG4gICAgICAgIHlpZWxkIHB1dCh7dHlwZTogc2NoZWR1bGluZ1RpY2t9KTtcbiAgICAgICAgc3RhdHVzID0geWllbGQgc2VsZWN0KCh7c2NoZWR1bGluZzoge3N0YXR1c319KSA9PiBzdGF0dXMpO1xuICAgICAgICBpZiAoJ3BsYXknICE9PSBzdGF0dXMpIHtcbiAgICAgICAgICByZXR1cm47IC8qIHJlYWNoZWQgZW5kIG9mIHRleHQgKi9cbiAgICAgICAgfVxuICAgICAgICB5aWVsZCBkZWxheSgxMDAwKTtcbiAgICAgIH1cbiAgICB9XG4gIH0pO1xufVxuXG5mdW5jdGlvbiBTY2hlZHVsaW5nQ29udHJvbHNTZWxlY3RvciAoc3RhdGUpIHtcbiAgY29uc3Qge2FjdGlvbnMsIHRhc2tEYXRhOiB7YWxwaGFiZXR9LCBzY2hlZHVsaW5nOiB7c3RhdHVzfX0gPSBzdGF0ZTtcbiAgY29uc3Qge3NjaGVkdWxpbmdTdGF0dXNDaGFuZ2VkLCBzY2hlZHVsaW5nU3RlcEJhY2t3YXJkLCBzY2hlZHVsaW5nU3RlcEZvcndhcmR9ID0gYWN0aW9ucztcbiAgY29uc3QgYWxwaGFiZXRTaXplID0gYWxwaGFiZXQubGVuZ3RoO1xuICByZXR1cm4ge3NjaGVkdWxpbmdTdGF0dXNDaGFuZ2VkLCBzY2hlZHVsaW5nU3RlcEJhY2t3YXJkLCBzY2hlZHVsaW5nU3RlcEZvcndhcmQsIHN0YXR1cywgYWxwaGFiZXRTaXplfTtcbn1cblxuY2xhc3MgU2NoZWR1bGluZ0NvbnRyb2xzVmlldyBleHRlbmRzIFJlYWN0LlB1cmVDb21wb25lbnQge1xuICByZW5kZXIgKCkge1xuICAgIGNvbnN0IHthbHBoYWJldFNpemUsIHN0YXR1c30gPSB0aGlzLnByb3BzO1xuICAgIHJldHVybiAoXG4gICAgICA8ZGl2IHN0eWxlPXt7d2lkdGg6IGAkezIwKmFscGhhYmV0U2l6ZX1weGAsIG1hcmdpbjogJzAgYXV0bycsIHRleHRBbGlnbjogJ2NlbnRlcid9fT5cbiAgICAgICAgPGRpdiBjbGFzc05hbWU9J2J0bi1ncm91cCc+XG4gICAgICAgICAgPEJ1dHRvbiBvbkNsaWNrPXt0aGlzLm9uRmFzdEJhY2t3YXJkQ2xpY2tlZH0gc3R5bGU9e3t3aWR0aDogJzQwcHgnfX0gYWN0aXZlPXtzdGF0dXMgPT09ICdzdGFydCd9PjxpIGNsYXNzTmFtZT0nZmEgZmEtZmFzdC1iYWNrd2FyZCcvPjwvQnV0dG9uPlxuICAgICAgICAgIDxCdXR0b24gb25DbGljaz17dGhpcy5vblN0ZXBCYWNrd2FyZENsaWNrZWR9IHN0eWxlPXt7d2lkdGg6ICc0MHB4J319PjxpIGNsYXNzTmFtZT0nZmEgZmEtc3RlcC1iYWNrd2FyZCcvPjwvQnV0dG9uPlxuICAgICAgICAgIDxCdXR0b24gb25DbGljaz17dGhpcy5vblBsYXlDbGlja2VkfSBzdHlsZT17e3dpZHRoOiAnNDBweCd9fSBhY3RpdmU9e3N0YXR1cyA9PT0gJ3BsYXknfT48aSBjbGFzc05hbWU9J2ZhIGZhLXBsYXknLz48L0J1dHRvbj5cbiAgICAgICAgICA8QnV0dG9uIG9uQ2xpY2s9e3RoaXMub25TdGVwRm9yd2FyZENsaWNrZWR9IHN0eWxlPXt7d2lkdGg6ICc0MHB4J319PjxpIGNsYXNzTmFtZT0nZmEgZmEtc3RlcC1mb3J3YXJkJy8+PC9CdXR0b24+XG4gICAgICAgICAgPEJ1dHRvbiBvbkNsaWNrPXt0aGlzLm9uRmFzdEZvcndhcmRDbGlja2VkfSBzdHlsZT17e3dpZHRoOiAnNDBweCd9fSBhY3RpdmU9e3N0YXR1cyA9PT0gJ2VuZCd9PjxpIGNsYXNzTmFtZT0nZmEgZmEtZmFzdC1mb3J3YXJkJy8+PC9CdXR0b24+XG4gICAgICAgIDwvZGl2PlxuICAgICAgPC9kaXY+XG4gICAgKTtcbiAgfVxuICBvbkZhc3RCYWNrd2FyZENsaWNrZWQgPSAoX2V2ZW50KSA9PiB7XG4gICAgdGhpcy5wcm9wcy5kaXNwYXRjaCh7dHlwZTogdGhpcy5wcm9wcy5zY2hlZHVsaW5nU3RhdHVzQ2hhbmdlZCwgcGF5bG9hZDoge3N0YXR1czogJ3N0YXJ0J319KTtcbiAgfTtcbiAgb25TdGVwQmFja3dhcmRDbGlja2VkID0gKF9ldmVudCkgPT4ge1xuICAgIHRoaXMucHJvcHMuZGlzcGF0Y2goe3R5cGU6IHRoaXMucHJvcHMuc2NoZWR1bGluZ1N0ZXBCYWNrd2FyZH0pO1xuICB9O1xuICBvblBsYXlDbGlja2VkID0gKF9ldmVudCkgPT4ge1xuICAgIHRoaXMucHJvcHMuZGlzcGF0Y2goe3R5cGU6IHRoaXMucHJvcHMuc2NoZWR1bGluZ1N0YXR1c0NoYW5nZWQsIHBheWxvYWQ6IHtzdGF0dXM6ICdwbGF5J319KTtcbiAgfTtcbiAgb25TdGVwRm9yd2FyZENsaWNrZWQgPSAoX2V2ZW50KSA9PiB7XG4gICAgdGhpcy5wcm9wcy5kaXNwYXRjaCh7dHlwZTogdGhpcy5wcm9wcy5zY2hlZHVsaW5nU3RlcEZvcndhcmR9KTtcbiAgfTtcbiAgb25GYXN0Rm9yd2FyZENsaWNrZWQgPSAoX2V2ZW50KSA9PiB7XG4gICAgdGhpcy5wcm9wcy5kaXNwYXRjaCh7dHlwZTogdGhpcy5wcm9wcy5zY2hlZHVsaW5nU3RhdHVzQ2hhbmdlZCwgcGF5bG9hZDoge3N0YXR1czogJ2VuZCd9fSk7XG4gIH07XG59XG5cbmV4cG9ydCBkZWZhdWx0IHtcbiAgYWN0aW9uczoge1xuICAgIHNjaGVkdWxpbmdTdGF0dXNDaGFuZ2VkOiAnU2NoZWR1bGluZy5TdGF0dXMuQ2hhbmdlZCcsXG4gICAgc2NoZWR1bGluZ1N0ZXBCYWNrd2FyZDogJ1NjaGVkdWxpbmcuU3RlcEJhY2t3YXJkJyxcbiAgICBzY2hlZHVsaW5nU3RlcEZvcndhcmQ6ICdTY2hlZHVsaW5nLlN0ZXBGb3J3YXJkJyxcbiAgICBzY2hlZHVsaW5nSnVtcDogJ1NjaGVkdWxpbmcuSnVtcCcsXG4gICAgc2NoZWR1bGluZ1RpY2s6ICdTY2hlZHVsaW5nLlRpY2snLFxuICB9LFxuICBhY3Rpb25SZWR1Y2Vyczoge1xuICAgIGFwcEluaXQ6IGFwcEluaXRSZWR1Y2VyLFxuICAgIHRhc2tJbml0OiB0YXNrSW5pdFJlZHVjZXIsXG4gICAgc2NoZWR1bGluZ1N0YXR1c0NoYW5nZWQ6IHNjaGVkdWxpbmdTdGF0dXNDaGFuZ2VkUmVkdWNlcixcbiAgICBzY2hlZHVsaW5nU3RlcEJhY2t3YXJkOiBzY2hlZHVsaW5nU3RlcEJhY2t3YXJkUmVkdWNlcixcbiAgICBzY2hlZHVsaW5nU3RlcEZvcndhcmQ6IHNjaGVkdWxpbmdTdGVwRm9yd2FyZFJlZHVjZXIsXG4gICAgc2NoZWR1bGluZ0p1bXA6IHNjaGVkdWxpbmdKdW1wUmVkdWNlcixcbiAgICBzY2hlZHVsaW5nVGljazogc2NoZWR1bGluZ1RpY2tSZWR1Y2VyLFxuICB9LFxuICBsYXRlUmVkdWNlcjogc2NoZWR1bGluZ0xhdGVSZWR1Y2VyLFxuICBzYWdhOiBzY2hlZHVsaW5nU2FnYSxcbiAgdmlld3M6IHtcbiAgICBTY2hlZHVsaW5nQ29udHJvbHM6IGNvbm5lY3QoU2NoZWR1bGluZ0NvbnRyb2xzU2VsZWN0b3IpKFNjaGVkdWxpbmdDb250cm9sc1ZpZXcpLFxuICB9XG59O1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL3NjaGVkdWxpbmdfYnVuZGxlLmpzIiwiXG5pbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IHtjb25uZWN0fSBmcm9tICdyZWFjdC1yZWR1eCc7XG5pbXBvcnQgY2xhc3NuYW1lcyBmcm9tICdjbGFzc25hbWVzJztcbmltcG9ydCB7cmFuZ2V9IGZyb20gJ3JhbmdlJztcbmltcG9ydCB1cGRhdGUgZnJvbSAnaW1tdXRhYmlsaXR5LWhlbHBlcic7XG5cbmltcG9ydCB7d3JhcEFyb3VuZCwgbWFrZVJvdG9yLCBlZGl0Um90b3JDZWxsLCBsb2NrUm90b3JDZWxsLCB1cGRhdGVSb3RvcldpdGhLZXl9IGZyb20gJy4vdXRpbHMnO1xuXG5mdW5jdGlvbiBhcHBJbml0UmVkdWNlciAoc3RhdGUsIF9hY3Rpb24pIHtcbiAgcmV0dXJuIHsuLi5zdGF0ZSwgcm90b3JzOiBbXSwgZWRpdGluZzoge319O1xufVxuXG5mdW5jdGlvbiByb3RvckNlbGxFZGl0U3RhcnRlZFJlZHVjZXIgKHN0YXRlLCB7cGF5bG9hZDoge3JvdG9ySW5kZXgsIGNlbGxSYW5rfX0pIHtcbiAgbGV0IHt0YXNrRGF0YToge2FscGhhYmV0fSwgcm90b3JzfSA9IHN0YXRlO1xuICByb3RvckluZGV4ID0gd3JhcEFyb3VuZChyb3RvckluZGV4LCByb3RvcnMubGVuZ3RoKTtcbiAgY2VsbFJhbmsgPSB3cmFwQXJvdW5kKGNlbGxSYW5rLCBhbHBoYWJldC5sZW5ndGgpO1xuICByZXR1cm4gdXBkYXRlKHN0YXRlLCB7ZWRpdGluZzogeyRzZXQ6IHtyb3RvckluZGV4LCBjZWxsUmFua319fSk7XG59XG5cbmZ1bmN0aW9uIHJvdG9yQ2VsbEVkaXRNb3ZlZFJlZHVjZXIgKHN0YXRlLCB7cGF5bG9hZDoge3JvdG9yTW92ZSwgY2VsbE1vdmV9fSkge1xuICBsZXQge3Rhc2tEYXRhOiB7YWxwaGFiZXR9LCByb3RvcnMsIGVkaXRpbmc6IHtyb3RvckluZGV4LCBjZWxsUmFua319ID0gc3RhdGU7XG4gIGxldCByb3RvclN0b3AgPSByb3RvckluZGV4LCBjZWxsU3RvcCA9IGNlbGxSYW5rO1xuICBpZiAocm90b3JJbmRleCA9PT0gdW5kZWZpbmVkIHx8IGNlbGxSYW5rID09PSB1bmRlZmluZWQpIHJldHVybiBzdGF0ZTtcbiAgbGV0IGNlbGw7XG4gIGRvIHtcbiAgICByb3RvckluZGV4ID0gd3JhcEFyb3VuZChyb3RvckluZGV4ICsgcm90b3JNb3ZlLCByb3RvcnMubGVuZ3RoKTtcbiAgICBjZWxsUmFuayA9IHdyYXBBcm91bmQoY2VsbFJhbmsgKyBjZWxsTW92ZSwgYWxwaGFiZXQubGVuZ3RoKTtcbiAgICBjZWxsID0gcm90b3JzW3JvdG9ySW5kZXhdLmNlbGxzW2NlbGxSYW5rXTtcbiAgICAvKiBJZiB3ZSBsb29wZWQgYmFjayB0byB0aGUgc3RhcnRpbmcgcG9pbnQsIHRoZSBtb3ZlIGlzIGltcG9zc2libGUuICovXG4gICAgaWYgKHJvdG9yU3RvcCA9PSByb3RvckluZGV4IHx8IGNlbGxTdG9wID09IGNlbGxSYW5rKSByZXR1cm4gc3RhdGU7XG4gIH0gd2hpbGUgKGNlbGwuaGludCB8fCBjZWxsLmxvY2tlZCk7XG4gIHJldHVybiB1cGRhdGUoc3RhdGUsIHtlZGl0aW5nOiB7JHNldDoge3JvdG9ySW5kZXgsIGNlbGxSYW5rfX19KTtcbn1cblxuZnVuY3Rpb24gcm90b3JDZWxsRWRpdENhbmNlbGxlZFJlZHVjZXIgKHN0YXRlLCBfYWN0aW9uKSB7XG4gIHJldHVybiB1cGRhdGUoc3RhdGUsIHtlZGl0aW5nOiB7JHNldDoge319fSk7XG59XG5cbmZ1bmN0aW9uIHJvdG9yQ2VsbENoYXJDaGFuZ2VkUmVkdWNlciAoc3RhdGUsIHtwYXlsb2FkOiB7cm90b3JJbmRleCwgcmFuaywgc3ltYm9sfX0pIHtcbiAgbGV0IHt0YXNrRGF0YToge2FscGhhYmV0fSwgcm90b3JzfSA9IHN0YXRlO1xuICBpZiAoc3ltYm9sLmxlbmd0aCAhPT0gMSB8fCAtMSA9PT0gYWxwaGFiZXQuaW5kZXhPZihzeW1ib2wpKSB7XG4gICAgc3ltYm9sID0gbnVsbDtcbiAgfVxuICBjb25zdCByb3RvciA9IGVkaXRSb3RvckNlbGwocm90b3JzW3JvdG9ySW5kZXhdLCByYW5rLCBzeW1ib2wpO1xuICByZXR1cm4gdXBkYXRlKHN0YXRlLCB7cm90b3JzOiB7W3JvdG9ySW5kZXhdOiB7JHNldDogcm90b3J9fX0pO1xufVxuXG5mdW5jdGlvbiByb3RvckNlbGxMb2NrQ2hhbmdlZFJlZHVjZXIgKHN0YXRlLCB7cGF5bG9hZDoge3JvdG9ySW5kZXgsIHJhbmssIGlzTG9ja2VkfX0pIHtcbiAgY29uc3Qgcm90b3IgPSBsb2NrUm90b3JDZWxsKHN0YXRlLnJvdG9yc1tyb3RvckluZGV4XSwgcmFuaywgaXNMb2NrZWQpO1xuICByZXR1cm4gdXBkYXRlKHN0YXRlLCB7cm90b3JzOiB7W3JvdG9ySW5kZXhdOiB7JHNldDogcm90b3J9fX0pO1xufVxuXG5mdW5jdGlvbiByb3RvcktleUxvYWRlZFJlZHVjZXIgKHN0YXRlLCB7cGF5bG9hZDoge3JvdG9ySW5kZXgsIGtleX19KSB7XG4gIGNvbnN0IHt0YXNrRGF0YToge2FscGhhYmV0fSwgcm90b3JzfSA9IHN0YXRlO1xuICBjb25zdCByb3RvciA9IHVwZGF0ZVJvdG9yV2l0aEtleShhbHBoYWJldCwgcm90b3JzW3JvdG9ySW5kZXhdLCBrZXkpO1xuICByZXR1cm4gdXBkYXRlKHN0YXRlLCB7cm90b3JzOiB7W3JvdG9ySW5kZXhdOiB7JHNldDogcm90b3J9fX0pO1xufVxuXG5mdW5jdGlvbiBSb3RvclNlbGVjdG9yIChzdGF0ZSwge2luZGV4fSkge1xuICBjb25zdCB7XG4gICAgYWN0aW9uczoge1xuICAgICAgcm90b3JDZWxsTG9ja0NoYW5nZWQsIHJvdG9yQ2VsbENoYXJDaGFuZ2VkLFxuICAgICAgcm90b3JDZWxsRWRpdENhbmNlbGxlZCwgcm90b3JDZWxsRWRpdFN0YXJ0ZWQsIHJvdG9yQ2VsbEVkaXRNb3ZlZFxuICAgIH0sXG4gICAgcm90b3JzLCBzY2hlZHVsaW5nOiB7c2hpZnRzLCBjdXJyZW50VHJhY2V9LCBlZGl0aW5nXG4gIH0gPSBzdGF0ZTtcbiAgY29uc3Qge2VkaXRhYmxlUm93LCBjZWxsc30gPSByb3RvcnNbaW5kZXhdO1xuICBjb25zdCBzaGlmdCA9IHNoaWZ0c1tpbmRleF07XG4gIGNvbnN0IGFjdGl2ZVJhbmsgPSBjdXJyZW50VHJhY2VbaW5kZXhdICYmIGN1cnJlbnRUcmFjZVtpbmRleF0ucmFuaztcbiAgY29uc3QgZWRpdGluZ1JhbmsgPSBlZGl0aW5nLnJvdG9ySW5kZXggPT09IGluZGV4ID8gZWRpdGluZy5jZWxsUmFuayA6IG51bGw7XG4gIHJldHVybiB7XG4gICAgcm90b3JDZWxsRWRpdFN0YXJ0ZWQsIHJvdG9yQ2VsbEVkaXRDYW5jZWxsZWQsIHJvdG9yQ2VsbEVkaXRNb3ZlZCxcbiAgICByb3RvckNlbGxMb2NrQ2hhbmdlZCwgcm90b3JDZWxsQ2hhckNoYW5nZWQsXG4gICAgZWRpdGFibGVSb3csIGNlbGxzLCBzaGlmdCwgZWRpdGluZ1JhbmssIGFjdGl2ZVJhbmtcbiAgfTtcbn1cblxuY2xhc3MgUm90b3JWaWV3IGV4dGVuZHMgUmVhY3QuUHVyZUNvbXBvbmVudCB7XG4gIHJlbmRlciAoKSB7XG4gICAgY29uc3Qge2luZGV4LCBlZGl0YWJsZVJvdywgY2VsbHMsIHNoaWZ0LCBlZGl0aW5nUmFuaywgYWN0aXZlUmFua30gPSB0aGlzLnByb3BzO1xuICAgIGNvbnN0IG5iQ2VsbHMgPSBjZWxscy5sZW5ndGg7XG4gICAgcmV0dXJuIChcbiAgICAgIDxkaXYgc3R5bGU9e3t3aWR0aDogXCIxMDAlXCJ9fT5cbiAgICAgICAgPGRpdiBjbGFzc05hbWU9J2NsZWFyZml4JyBzdHlsZT17e21hcmdpbkxlZnQ6IFwiMTMwcHhcIn19PlxuICAgICAgICAgIHtyYW5nZSgwLCBuYkNlbGxzKS5tYXAocmFuayA9PiB7XG4gICAgICAgICAgICBjb25zdCB7ZWRpdGFibGUsIGxvY2tlZCwgY29uZmxpY3QsIGhpbnR9ID0gY2VsbHNbcmFua107XG4gICAgICAgICAgICBjb25zdCBpc0FjdGl2ZSA9IGFjdGl2ZVJhbmsgPT09IHJhbms7XG4gICAgICAgICAgICBjb25zdCBpc0VkaXRpbmcgPSBlZGl0aW5nUmFuayA9PT0gcmFuayAmJiAhbG9ja2VkICYmICFoaW50O1xuICAgICAgICAgICAgY29uc3QgaXNMYXN0ID0gbmJDZWxscyA9PT0gcmFuayArIDE7XG4gICAgICAgICAgICBjb25zdCBzaGlmdGVkSW5kZXggPSAocmFuayArIHNoaWZ0KSAlIG5iQ2VsbHM7XG4gICAgICAgICAgICBjb25zdCB7cm90YXRpbmd9ID0gY2VsbHNbc2hpZnRlZEluZGV4XTtcbiAgICAgICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICAgIDxSb3RvckNlbGwga2V5PXtyYW5rfSByYW5rPXtyYW5rfSBpc0xhc3Q9e2lzTGFzdH0gZWRpdGFibGVSb3c9e2VkaXRhYmxlUm93fVxuICAgICAgICAgICAgICAgIHN0YXRpY0NoYXI9e3JvdGF0aW5nfSBlZGl0YWJsZUNoYXI9e2VkaXRhYmxlfSBpc0xvY2tlZD17bG9ja2VkfSBpc0hpbnQ9e2hpbnR9IGlzRWRpdGluZz17aXNFZGl0aW5nfSBpc0FjdGl2ZT17aXNBY3RpdmV9XG4gICAgICAgICAgICAgICAgb25DaGFuZ2VDaGFyPXt0aGlzLm9uQ2hhbmdlQ2hhcn0gb25DaGFuZ2VMb2NrZWQ9e3RoaXMub25DaGFuZ2VMb2NrZWR9XG4gICAgICAgICAgICAgICAgb25FZGl0aW5nU3RhcnRlZD17dGhpcy5vbkVkaXRpbmdTdGFydGVkfSBvbkVkaXRpbmdDYW5jZWxsZWQ9e3RoaXMub25FZGl0aW5nQ2FuY2VsbGVkfVxuICAgICAgICAgICAgICAgIG9uRWRpdGluZ01vdmVkPXt0aGlzLmVkaXRpbmdNb3ZlZH0gaXNDb25mbGljdD17Y29uZmxpY3R9IC8+KTtcbiAgICAgICAgICB9KX1cbiAgICAgICAgPC9kaXY+XG4gICAgICA8L2Rpdj5cbiAgICApO1xuICB9XG4gIG9uRWRpdGluZ1N0YXJ0ZWQgPSAocmFuaykgPT4ge1xuICAgIHRoaXMucHJvcHMuZGlzcGF0Y2goe3R5cGU6IHRoaXMucHJvcHMucm90b3JDZWxsRWRpdFN0YXJ0ZWQsIHBheWxvYWQ6IHtyb3RvckluZGV4OiB0aGlzLnByb3BzLmluZGV4LCBjZWxsUmFuazogcmFua319KTtcbiAgfTtcbiAgb25FZGl0aW5nQ2FuY2VsbGVkID0gKCkgPT4ge1xuICAgIHRoaXMucHJvcHMuZGlzcGF0Y2goe3R5cGU6IHRoaXMucHJvcHMucm90b3JDZWxsRWRpdENhbmNlbGxlZH0pO1xuICB9O1xuICBvbkNoYW5nZUNoYXIgPSAocmFuaywgc3ltYm9sKSA9PiB7XG4gICAgc3ltYm9sID0gc3ltYm9sLnRvVXBwZXJDYXNlKCk7XG4gICAgdGhpcy5wcm9wcy5kaXNwYXRjaCh7dHlwZTogdGhpcy5wcm9wcy5yb3RvckNlbGxDaGFyQ2hhbmdlZCwgcGF5bG9hZDoge3JvdG9ySW5kZXg6IHRoaXMucHJvcHMuaW5kZXgsIHJhbmssIHN5bWJvbH19KTtcbiAgfTtcbiAgb25DaGFuZ2VMb2NrZWQgPSAocmFuaywgaXNMb2NrZWQpID0+IHtcbiAgICB0aGlzLnByb3BzLmRpc3BhdGNoKHt0eXBlOiB0aGlzLnByb3BzLnJvdG9yQ2VsbExvY2tDaGFuZ2VkLCBwYXlsb2FkOiB7cm90b3JJbmRleDogdGhpcy5wcm9wcy5pbmRleCwgcmFuaywgaXNMb2NrZWR9fSk7XG4gIH07XG4gIGVkaXRpbmdNb3ZlZCA9IChyb3Rvck1vdmUsIGNlbGxNb3ZlKSA9PiB7XG4gICAgdGhpcy5wcm9wcy5kaXNwYXRjaCh7dHlwZTogdGhpcy5wcm9wcy5yb3RvckNlbGxFZGl0TW92ZWQsIHBheWxvYWQ6IHtyb3Rvck1vdmUsIGNlbGxNb3ZlfX0pO1xuICB9O1xufVxuXG5jbGFzcyBSb3RvckNlbGwgZXh0ZW5kcyBSZWFjdC5QdXJlQ29tcG9uZW50IHtcbiAgLyogWFhYIENsaWNraW5nIGluIHRoZSBlZGl0YWJsZSBkaXYgYW5kIGVudGVyaW5nIHRoZSBzYW1lIGxldHRlciBkb2VzIG5vdFxuICAgICAgICAgdHJpZ2dlciBhIGNoYW5nZSBldmVudC4gIFRoaXMgYmVoYXZpb3IgaXMgdW5mb3J0dW5hdGUuICovXG4gIHJlbmRlciAoKSB7XG4gICAgY29uc3Qge3N0YXRpY0NoYXIsIGVkaXRhYmxlQ2hhciwgaXNMb2NrZWQsIGlzSGludCwgaXNBY3RpdmUsIGlzRWRpdGluZywgZWRpdGFibGVSb3csIGlzTGFzdCwgaXNDb25mbGljdH0gPSB0aGlzLnByb3BzO1xuICAgIGNvbnN0IGNvbHVtblN0eWxlID0ge1xuICAgICAgZmxvYXQ6ICdsZWZ0JyxcbiAgICAgIHdpZHRoOiAnMjBweCcsXG4gICAgfTtcbiAgICBjb25zdCBzdGF0aWNDZWxsU3R5bGUgPSB7XG4gICAgICBib3JkZXI6ICcxcHggc29saWQgYmxhY2snLFxuICAgICAgYm9yZGVyUmlnaHRXaWR0aDogaXNMYXN0ID8gJzFweCcgOiAnMCcsXG4gICAgICB0ZXh0QWxpZ246ICdjZW50ZXInLFxuICAgIH07XG4gICAgY29uc3QgZWRpdGFibGVDZWxsU3R5bGUgPSB7XG4gICAgICBib3JkZXI6ICcxcHggc29saWQgYmxhY2snLFxuICAgICAgYm9yZGVyUmlnaHRXaWR0aDogaXNMYXN0ID8gJzFweCcgOiAnMCcsXG4gICAgICB0ZXh0QWxpZ246ICdjZW50ZXInLFxuICAgICAgY3Vyc29yOiAndGV4dCcsXG4gICAgICBiYWNrZ3JvdW5kQ29sb3I6IGlzSGludCA/ICcjYWZhJyA6IChpc0NvbmZsaWN0ID8gJyNmY2MnIDogJyNmZmYnKVxuICAgIH07XG4gICAgLyogQXBwbHkgYWN0aXZlLXN0YXR1cyBzZXBhcmF0aW9uIGJvcmRlciBzdHlsZS4gKi9cbiAgICBjb25zdCBib3R0b21DZWxsU3R5bGUgPSBlZGl0YWJsZVJvdyA9PT0gJ3RvcCcgPyBzdGF0aWNDZWxsU3R5bGUgOiBlZGl0YWJsZUNlbGxTdHlsZTtcbiAgICBpZiAoaXNBY3RpdmUpIHtcbiAgICAgIGJvdHRvbUNlbGxTdHlsZS5tYXJnaW5Ub3AgPSAnMCc7XG4gICAgICBib3R0b21DZWxsU3R5bGUuYm9yZGVyVG9wV2lkdGggPSAnM3B4JztcbiAgICB9IGVsc2Uge1xuICAgICAgYm90dG9tQ2VsbFN0eWxlLm1hcmdpblRvcCA9ICcycHgnO1xuICAgICAgYm90dG9tQ2VsbFN0eWxlLmJvcmRlclRvcFdpZHRoID0gJzFweCc7IC8qIG5lZWRlZCBiZWNhdXNlIHJlYWN0ICovXG4gICAgfVxuICAgIGNvbnN0IHN0YXRpY0NlbGwgPSAoXG4gICAgICA8ZGl2IHN0eWxlPXtzdGF0aWNDZWxsU3R5bGV9PlxuICAgICAgICB7c3RhdGljQ2hhciB8fCAnXFx1MDBBMCd9XG4gICAgICA8L2Rpdj5cbiAgICApO1xuICAgIGNvbnN0IGVkaXRhYmxlQ2VsbCA9IChcbiAgICAgIDxkaXYgc3R5bGU9e2VkaXRhYmxlQ2VsbFN0eWxlfSBvbkNsaWNrPXt0aGlzLnN0YXJ0RWRpdGluZ30+XG4gICAgICAgIHtpc0VkaXRpbmdcbiAgICAgICAgICA/IDxpbnB1dCByZWY9e3RoaXMucmVmSW5wdXR9IG9uQ2hhbmdlPXt0aGlzLmNlbGxDaGFuZ2VkfSBvbktleURvd249e3RoaXMua2V5RG93bn1cbiAgICAgICAgICAgICAgdHlwZT0ndGV4dCcgdmFsdWU9e2VkaXRhYmxlQ2hhcnx8Jyd9IHN0eWxlPXt7d2lkdGg6ICcxOXB4JywgaGVpZ2h0OiAnMjBweCcsIGJvcmRlcjogJ25vbmUnLCB0ZXh0QWxpZ246ICdjZW50ZXInfX0gLz5cbiAgICAgICAgICA6IChlZGl0YWJsZUNoYXIgfHwgJ1xcdTAwQTAnKX1cbiAgICAgIDwvZGl2PlxuICAgICk7XG4gICAgY29uc3QgbG9jayA9IChcbiAgICAgIDxkaXYgc3R5bGU9e3ttYXJnaW5Ub3A6ICcycHgnLCB0ZXh0QWxpZ246ICdjZW50ZXInLCBjdXJzb3I6ICdwb2ludGVyJ319IG9uQ2xpY2s9e3RoaXMubG9ja0NsaWNrZWR9PlxuICAgICAgICB7aXNIaW50IHx8IDxpIGNsYXNzTmFtZT17Y2xhc3NuYW1lcyhbJ2ZhJywgaXNMb2NrZWQgPyAnZmEtbG9jaycgOiAnZmEtdW5sb2NrLWFsdCddKX0gLz59XG4gICAgICA8L2Rpdj5cbiAgICApO1xuICAgIGlmIChlZGl0YWJsZVJvdyA9PT0gJ3RvcCcpIHtcbiAgICAgIHJldHVybiAoXG4gICAgICAgIDxkaXYgc3R5bGU9e2NvbHVtblN0eWxlfT5cbiAgICAgICAgICB7c3RhdGljQ2VsbH17ZWRpdGFibGVDZWxsfXtsb2NrfVxuICAgICAgICA8L2Rpdj5cbiAgICAgICk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiAoXG4gICAgICAgIDxkaXYgc3R5bGU9e2NvbHVtblN0eWxlfT5cbiAgICAgICAgICB7c3RhdGljQ2VsbH17ZWRpdGFibGVDZWxsfXtsb2NrfVxuICAgICAgICA8L2Rpdj5cbiAgICAgICk7XG4gICAgfVxuICB9XG4gIGNvbXBvbmVudERpZFVwZGF0ZSAoKSB7XG4gICAgaWYgKHRoaXMuX2lucHV0KSB7XG4gICAgICB0aGlzLl9pbnB1dC5zZWxlY3QoKTtcbiAgICAgIHRoaXMuX2lucHV0LmZvY3VzKCk7XG4gICAgfVxuICB9XG4gIHN0YXJ0RWRpdGluZyA9ICgpID0+IHtcbiAgICBpZiAoIXRoaXMucHJvcHMuaXNMb2NrZWQgJiYgIXRoaXMucHJvcHMuaXNFZGl0aW5nKSB7XG4gICAgICB0aGlzLnByb3BzLm9uRWRpdGluZ1N0YXJ0ZWQodGhpcy5wcm9wcy5yYW5rKTtcbiAgICB9XG4gIH07XG4gIGtleURvd24gPSAoZXZlbnQpID0+IHtcbiAgICBsZXQgaGFuZGxlZCA9IHRydWU7XG4gICAgaWYgKGV2ZW50LmtleSA9PT0gJ0Fycm93UmlnaHQnKSB7XG4gICAgICB0aGlzLnByb3BzLm9uRWRpdGluZ01vdmVkKDAsIDEpO1xuICAgIH0gZWxzZSBpZiAoZXZlbnQua2V5ID09PSAnQXJyb3dMZWZ0Jykge1xuICAgICAgdGhpcy5wcm9wcy5vbkVkaXRpbmdNb3ZlZCgwLCAtMSk7XG4gICAgfSBlbHNlIGlmIChldmVudC5rZXkgPT09ICdBcnJvd1VwJykge1xuICAgICAgdGhpcy5wcm9wcy5vbkVkaXRpbmdNb3ZlZCgtMSwgMCk7XG4gICAgfSBlbHNlIGlmIChldmVudC5rZXkgPT09ICdBcnJvd0Rvd24nKSB7XG4gICAgICB0aGlzLnByb3BzLm9uRWRpdGluZ01vdmVkKDEsIDApO1xuICAgIH0gZWxzZSBpZiAoZXZlbnQua2V5ID09PSAnRXNjYXBlJyB8fCBldmVudC5rZXkgPT09ICdFbnRlcicpIHtcbiAgICAgIHRoaXMucHJvcHMub25FZGl0aW5nQ2FuY2VsbGVkKCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGhhbmRsZWQgPSBmYWxzZTtcbiAgICB9XG4gICAgaWYgKGhhbmRsZWQpIHtcbiAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICBldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICB9XG4gIH07XG4gIGNlbGxDaGFuZ2VkID0gKCkgPT4ge1xuICAgIGNvbnN0IHZhbHVlID0gdGhpcy5faW5wdXQudmFsdWUuc3Vic3RyKC0xKTsgLyogLyFcXCBJRSBjb21wYXRpYmlsaXR5ICovXG4gICAgdGhpcy5wcm9wcy5vbkNoYW5nZUNoYXIodGhpcy5wcm9wcy5yYW5rLCB2YWx1ZSk7XG4gIH07XG4gIGxvY2tDbGlja2VkID0gKCkgPT4ge1xuICAgIHRoaXMucHJvcHMub25DaGFuZ2VMb2NrZWQodGhpcy5wcm9wcy5yYW5rLCAhdGhpcy5wcm9wcy5pc0xvY2tlZCk7XG4gIH07XG4gIHJlZklucHV0ID0gKGVsZW1lbnQpID0+IHtcbiAgICB0aGlzLl9pbnB1dCA9IGVsZW1lbnQ7XG4gIH07XG59XG5cbmV4cG9ydCBkZWZhdWx0IHtcbiAgYWN0aW9uczoge1xuICAgIHJvdG9yQ2VsbEVkaXRTdGFydGVkOiAnUm90b3IuQ2VsbC5FZGl0LlN0YXJ0ZWQnLFxuICAgIHJvdG9yQ2VsbEVkaXRNb3ZlZDogJ1JvdG9yLkNlbGwuRWRpdC5Nb3ZlZCcsXG4gICAgcm90b3JDZWxsRWRpdENhbmNlbGxlZDogJ1JvdG9yLkNlbGwuRWRpdC5DYW5jZWxsZWQnLFxuICAgIHJvdG9yQ2VsbExvY2tDaGFuZ2VkOiAnUm90b3IuQ2VsbC5Mb2NrLkNoYW5nZWQnLFxuICAgIHJvdG9yQ2VsbENoYXJDaGFuZ2VkOiAnUm90b3IuQ2VsbC5DaGFyLkNoYW5nZWQnLFxuICAgIHJvdG9yS2V5TG9hZGVkOiAnUm90b3IuS2V5LkxvYWRlZCcsXG4gIH0sXG4gIGFjdGlvblJlZHVjZXJzOiB7XG4gICAgYXBwSW5pdDogYXBwSW5pdFJlZHVjZXIsXG4gICAgcm90b3JDZWxsRWRpdFN0YXJ0ZWQ6IHJvdG9yQ2VsbEVkaXRTdGFydGVkUmVkdWNlcixcbiAgICByb3RvckNlbGxFZGl0TW92ZWQ6IHJvdG9yQ2VsbEVkaXRNb3ZlZFJlZHVjZXIsXG4gICAgcm90b3JDZWxsRWRpdENhbmNlbGxlZDogcm90b3JDZWxsRWRpdENhbmNlbGxlZFJlZHVjZXIsXG4gICAgcm90b3JDZWxsTG9ja0NoYW5nZWQ6IHJvdG9yQ2VsbExvY2tDaGFuZ2VkUmVkdWNlcixcbiAgICByb3RvckNlbGxDaGFyQ2hhbmdlZDogcm90b3JDZWxsQ2hhckNoYW5nZWRSZWR1Y2VyLFxuICAgIHJvdG9yS2V5TG9hZGVkOiByb3RvcktleUxvYWRlZFJlZHVjZXIsXG4gIH0sXG4gIHZpZXdzOiB7XG4gICAgUm90b3I6IGNvbm5lY3QoUm90b3JTZWxlY3RvcikoUm90b3JWaWV3KVxuICB9XG59O1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL3JvdG9yc19idW5kbGUuanMiLCIvKlxuLSBzaG93cyBhIHNsaWNlIG9mIHRoZSBjbGVhclRleHRcbi0gYWRkcyBkZWNpcGhlcmVkIGNoYXJhY3RlcnMgZnJvbSBzdGFydCB1cCB0byB0aGUgXCJjdXJyZW50XCIgYW5pbWF0aW9uIHBvc2l0aW9uXG4gIChsYXppbHkgY29tcHV0ZWQpXG4tIHNjcm9sbGluZyBkb2VzIG5vdCBhZmZlY3QgdGhlIGN1cnJlbnQgYW5pbWF0aW9uIHBvc2l0aW9uXG4qL1xuXG5cbmltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQge2Nvbm5lY3R9IGZyb20gJ3JlYWN0LXJlZHV4JztcblxuaW1wb3J0IHt1cGRhdGVHcmlkR2VvbWV0cnksIHVwZGF0ZUdyaWRWaXNpYmxlUm93cywgYXBwbHlSb3RvcnN9IGZyb20gJy4vdXRpbHMnO1xuXG5mdW5jdGlvbiBhcHBJbml0UmVkdWNlciAoc3RhdGUsIF9hY3Rpb24pIHtcbiAgcmV0dXJuIHsuLi5zdGF0ZSwgZGVjaXBoZXJlZFRleHQ6IHtcbiAgICBjZWxsV2lkdGg6IDE1LFxuICAgIGNlbGxIZWlnaHQ6IDQ2LFxuICAgIHNjcm9sbFRvcDogMCxcbiAgICBuYkNlbGxzOiAwXG4gIH19O1xufVxuXG5mdW5jdGlvbiB0YXNrSW5pdFJlZHVjZXIgKHN0YXRlLCBfYWN0aW9uKSB7XG4gIGxldCB7ZGVjaXBoZXJlZFRleHQsIHRhc2tEYXRhOiB7Y2lwaGVyVGV4dH19ID0gc3RhdGU7XG4gIGRlY2lwaGVyZWRUZXh0ID0gey4uLmRlY2lwaGVyZWRUZXh0LCBuYkNlbGxzOiBjaXBoZXJUZXh0Lmxlbmd0aH07XG4gIHJldHVybiB7Li4uc3RhdGUsIGRlY2lwaGVyZWRUZXh0fTtcbn1cblxuZnVuY3Rpb24gZGVjaXBoZXJlZFRleHRSZXNpemVkUmVkdWNlciAoc3RhdGUsIHtwYXlsb2FkOiB7d2lkdGh9fSkge1xuICBsZXQge2RlY2lwaGVyZWRUZXh0fSA9IHN0YXRlO1xuICBkZWNpcGhlcmVkVGV4dCA9IHsuLi5kZWNpcGhlcmVkVGV4dCwgd2lkdGgsIGhlaWdodDogNCAqIGRlY2lwaGVyZWRUZXh0LmNlbGxIZWlnaHR9O1xuICBkZWNpcGhlcmVkVGV4dCA9IHVwZGF0ZUdyaWRHZW9tZXRyeShkZWNpcGhlcmVkVGV4dCk7XG4gIHJldHVybiB7Li4uc3RhdGUsIGRlY2lwaGVyZWRUZXh0fTtcbn1cblxuZnVuY3Rpb24gZGVjaXBoZXJlZFRleHRTY3JvbGxlZFJlZHVjZXIgKHN0YXRlLCB7cGF5bG9hZDoge3Njcm9sbFRvcH19KSB7XG4gIGxldCB7ZGVjaXBoZXJlZFRleHR9ID0gc3RhdGU7XG4gIGRlY2lwaGVyZWRUZXh0ID0gey4uLmRlY2lwaGVyZWRUZXh0LCBzY3JvbGxUb3B9O1xuICByZXR1cm4gey4uLnN0YXRlLCBkZWNpcGhlcmVkVGV4dH07XG59XG5cbmZ1bmN0aW9uIGRlY2lwaGVyZWRUZXh0TGF0ZVJlZHVjZXIgKHN0YXRlLCBfYWN0aW9uKSB7XG4gIGlmICghc3RhdGUudGFza0RhdGEpIHJldHVybiBzdGF0ZTtcbiAgbGV0IHt0YXNrRGF0YToge2FscGhhYmV0LCBjaXBoZXJUZXh0fSwgc2NoZWR1bGluZzoge3Bvc2l0aW9ufSwgcm90b3JzLCBkZWNpcGhlcmVkVGV4dH0gPSBzdGF0ZTtcbiAgZnVuY3Rpb24gZ2V0Q2VsbCAoaW5kZXgpIHtcbiAgICBjb25zdCBjaXBoZXJlZCA9IGNpcGhlclRleHRbaW5kZXhdO1xuICAgIGNvbnN0IGNlbGwgPSB7cG9zaXRpb246IGluZGV4LCBjdXJyZW50OiBpbmRleCA9PT0gcG9zaXRpb24sIGNpcGhlcmVkfTtcbiAgICBsZXQgcmFuayA9IGFscGhhYmV0LmluZGV4T2YoY2lwaGVyZWQpO1xuICAgIGlmIChyYW5rID09PSAtMSkge1xuICAgICAgY2VsbC5jbGVhciA9IGNpcGhlcmVkO1xuICAgIH0gZWxzZSBpZiAoaW5kZXggPD0gcG9zaXRpb24pIHtcbiAgICAgIE9iamVjdC5hc3NpZ24oY2VsbCwgYXBwbHlSb3RvcnMocm90b3JzLCBpbmRleCwgcmFuaykpO1xuICAgICAgaWYgKGNlbGwucmFuayAhPT0gLTEpIHtcbiAgICAgICAgY2VsbC5jbGVhciA9IGFscGhhYmV0W2NlbGwucmFua107XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiBjZWxsO1xuICB9XG4gIGRlY2lwaGVyZWRUZXh0ID0gdXBkYXRlR3JpZFZpc2libGVSb3dzKGRlY2lwaGVyZWRUZXh0LCB7Z2V0Q2VsbH0pO1xuICByZXR1cm4gey4uLnN0YXRlLCBkZWNpcGhlcmVkVGV4dH07XG59XG5cbmZ1bmN0aW9uIERlY2lwaGVyZWRUZXh0Vmlld1NlbGVjdG9yIChzdGF0ZSkge1xuICBjb25zdCB7YWN0aW9ucywgZGVjaXBoZXJlZFRleHR9ID0gc3RhdGU7XG4gIGNvbnN0IHtkZWNpcGhlcmVkVGV4dFJlc2l6ZWQsIGRlY2lwaGVyZWRUZXh0U2Nyb2xsZWQsIHNjaGVkdWxpbmdKdW1wfSA9IGFjdGlvbnM7XG4gIGNvbnN0IHt3aWR0aCwgaGVpZ2h0LCBjZWxsV2lkdGgsIGNlbGxIZWlnaHQsIGJvdHRvbSwgcGFnZVJvd3MsIHBhZ2VDb2x1bW5zLCB2aXNpYmxlfSA9IGRlY2lwaGVyZWRUZXh0O1xuICByZXR1cm4ge1xuICAgIGRlY2lwaGVyZWRUZXh0UmVzaXplZCwgZGVjaXBoZXJlZFRleHRTY3JvbGxlZCwgc2NoZWR1bGluZ0p1bXAsXG4gICAgd2lkdGgsIGhlaWdodCwgdmlzaWJsZVJvd3M6IHZpc2libGUucm93cywgY2VsbFdpZHRoLCBjZWxsSGVpZ2h0LCBib3R0b20sIHBhZ2VSb3dzLCBwYWdlQ29sdW1uc1xuICB9O1xufVxuXG5jbGFzcyBEZWNpcGhlcmVkVGV4dFZpZXcgZXh0ZW5kcyBSZWFjdC5QdXJlQ29tcG9uZW50IHtcblxuICByZW5kZXIgKCkge1xuICAgIGNvbnN0IHt3aWR0aCwgaGVpZ2h0LCB2aXNpYmxlUm93cywgY2VsbFdpZHRoLCBjZWxsSGVpZ2h0LCBib3R0b219ID0gdGhpcy5wcm9wcztcbiAgICByZXR1cm4gKFxuICAgICAgPGRpdiByZWY9e3RoaXMucmVmVGV4dEJveH0gb25TY3JvbGw9e3RoaXMub25TY3JvbGx9IHN0eWxlPXt7cG9zaXRpb246ICdyZWxhdGl2ZScsIHdpZHRoOiB3aWR0aCAmJiBgJHt3aWR0aH1weGAsIGhlaWdodDogaGVpZ2h0ICYmIGAke2hlaWdodH1weGAsIG92ZXJmbG93WTogJ3Njcm9sbCd9fT5cbiAgICAgICAgeyh2aXNpYmxlUm93c3x8W10pLm1hcCgoe2luZGV4LCBjb2x1bW5zfSkgPT5cbiAgICAgICAgICA8ZGl2IGtleT17aW5kZXh9IHN0eWxlPXt7cG9zaXRpb246ICdhYnNvbHV0ZScsIHRvcDogYCR7aW5kZXggKiBjZWxsSGVpZ2h0fXB4YH19PlxuICAgICAgICAgICAge2NvbHVtbnMubWFwKCh7aW5kZXgsIHBvc2l0aW9uLCBjaXBoZXJlZCwgY2xlYXIsIGxvY2tlZCwgY3VycmVudH0pID0+XG4gICAgICAgICAgICAgIDxUZXh0Q2VsbCBrZXk9e2luZGV4fSBjb2x1bW49e2luZGV4fSBwb3NpdGlvbj17cG9zaXRpb259IGNpcGhlcmVkPXtjaXBoZXJlZH0gY2xlYXI9e2NsZWFyfSBsb2NrZWQ9e2xvY2tlZH0gY3VycmVudD17Y3VycmVudH0gY2VsbFdpZHRoPXtjZWxsV2lkdGh9IG9uSnVtcD17dGhpcy5vbkp1bXB9IC8+KX1cbiAgICAgICAgICA8L2Rpdj4pfVxuICAgICAgICA8ZGl2IHN0eWxlPXt7cG9zaXRpb246ICdhYnNvbHV0ZScsIHRvcDogYCR7Ym90dG9tfXB4YCwgd2lkdGg6ICcxcHgnLCBoZWlnaHQ6ICcxcHgnfX0vPlxuICAgICAgPC9kaXY+XG4gICAgKTtcbiAgfVxuXG4gIHJlZlRleHRCb3ggPSAoZWxlbWVudCkgPT4ge1xuICAgIHRoaXMuX3RleHRCb3ggPSBlbGVtZW50O1xuICAgIGNvbnN0IHdpZHRoID0gZWxlbWVudC5jbGllbnRXaWR0aDtcbiAgICBjb25zdCBoZWlnaHQgPSBlbGVtZW50LmNsaWVudEhlaWdodDtcbiAgICB0aGlzLnByb3BzLmRpc3BhdGNoKHt0eXBlOiB0aGlzLnByb3BzLmRlY2lwaGVyZWRUZXh0UmVzaXplZCwgcGF5bG9hZDoge3dpZHRoLCBoZWlnaHR9fSk7XG4gIH07XG5cbiAgb25TY3JvbGwgPSAoKSA9PiB7XG4gICAgY29uc3Qgc2Nyb2xsVG9wID0gdGhpcy5fdGV4dEJveC5zY3JvbGxUb3A7XG4gICAgdGhpcy5wcm9wcy5kaXNwYXRjaCh7dHlwZTogdGhpcy5wcm9wcy5kZWNpcGhlcmVkVGV4dFNjcm9sbGVkLCBwYXlsb2FkOiB7c2Nyb2xsVG9wfX0pO1xuICB9O1xuXG4gIG9uSnVtcCA9IChwb3NpdGlvbikgPT4ge1xuICAgIHRoaXMucHJvcHMuZGlzcGF0Y2goe3R5cGU6IHRoaXMucHJvcHMuc2NoZWR1bGluZ0p1bXAsIHBheWxvYWQ6IHtwb3NpdGlvbn19KTtcbiAgfTtcblxufVxuXG5jbGFzcyBUZXh0Q2VsbCBleHRlbmRzIFJlYWN0LlB1cmVDb21wb25lbnQge1xuICByZW5kZXIgKCkge1xuICAgIGNvbnN0IHtjb2x1bW4sIGNpcGhlcmVkLCBjbGVhciwgbG9ja2VkLCBjdXJyZW50LCBjZWxsV2lkdGh9ID0gdGhpcy5wcm9wcztcbiAgICBjb25zdCBjZWxsU3R5bGUgPSB7XG4gICAgICBwb3NpdGlvbjogJ2Fic29sdXRlJyxcbiAgICAgIGxlZnQ6IGAke2NvbHVtbiAqIGNlbGxXaWR0aH1weGAsXG4gICAgICB3aWR0aDogYCR7Y2VsbFdpZHRofXB4YCxcbiAgICAgIGhlaWdodDogYDQycHhgLFxuICAgICAgYm9yZGVyOiAnc29saWQgIzc3NycsXG4gICAgICBib3JkZXJXaWR0aDogJzFweCAwJyxcbiAgICAgIGJhY2tncm91bmRDb2xvcjogY3VycmVudCA/ICcjYWFhJyA6IChsb2NrZWQgPyAnI2NjYycgOiAnI2ZmZicpLFxuICAgICAgY3Vyc29yOiAncG9pbnRlcidcbiAgICB9O1xuICAgIHJldHVybiAoXG4gICAgICA8ZGl2IHN0eWxlPXtjZWxsU3R5bGV9IG9uQ2xpY2s9e3RoaXMuX2p1bXB9PlxuICAgICAgICA8ZGl2IHN0eWxlPXt7d2lkdGg6ICcxMDAlJywgaGVpZ2h0OiAnMjBweCcsIGJvcmRlckJvdHRvbTogJzFweCBzb2xpZCAjY2NjJywgdGV4dEFsaWduOiAnY2VudGVyJ319PntjaXBoZXJlZCB8fCAnICd9PC9kaXY+XG4gICAgICAgIDxkaXYgc3R5bGU9e3t3aWR0aDogJzEwMCUnLCBoZWlnaHQ6ICcyMHB4JywgdGV4dEFsaWduOiAnY2VudGVyJ319PntjbGVhciB8fCAnICd9PC9kaXY+XG4gICAgICA8L2Rpdj5cbiAgICApO1xuICB9XG4gIF9qdW1wID0gKF9ldmVudCkgPT4ge1xuICAgIHRoaXMucHJvcHMub25KdW1wKHRoaXMucHJvcHMucG9zaXRpb24pO1xuICB9O1xufVxuXG5leHBvcnQgZGVmYXVsdCB7XG4gIGFjdGlvbnM6IHtcbiAgICBkZWNpcGhlcmVkVGV4dFJlc2l6ZWQ6ICdEZWNpcGhlcmVkVGV4dC5SZXNpemVkJyAvKiB7d2lkdGg6IG51bWJlciwgaGVpZ2h0OiBudW1iZXJ9ICovLFxuICAgIGRlY2lwaGVyZWRUZXh0U2Nyb2xsZWQ6ICdEZWNpcGhlcmVkVGV4dC5TY3JvbGxlZCcgLyoge3Njcm9sbFRvcDogbnVtYmVyfSAqLyxcbiAgfSxcbiAgYWN0aW9uUmVkdWNlcnM6IHtcbiAgICBhcHBJbml0OiBhcHBJbml0UmVkdWNlcixcbiAgICB0YXNrSW5pdDogdGFza0luaXRSZWR1Y2VyLFxuICAgIGRlY2lwaGVyZWRUZXh0UmVzaXplZDogZGVjaXBoZXJlZFRleHRSZXNpemVkUmVkdWNlcixcbiAgICBkZWNpcGhlcmVkVGV4dFNjcm9sbGVkOiBkZWNpcGhlcmVkVGV4dFNjcm9sbGVkUmVkdWNlcixcbiAgfSxcbiAgbGF0ZVJlZHVjZXI6IGRlY2lwaGVyZWRUZXh0TGF0ZVJlZHVjZXIsXG4gIHZpZXdzOiB7XG4gICAgRGVjaXBoZXJlZFRleHQ6IGNvbm5lY3QoRGVjaXBoZXJlZFRleHRWaWV3U2VsZWN0b3IpKERlY2lwaGVyZWRUZXh0VmlldyksXG4gIH1cbn07XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvZGVjaXBoZXJlZF90ZXh0X2J1bmRsZS5qcyIsIlxuaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCB7QnV0dG9ufSBmcm9tICdyZWFjdC1ib290c3RyYXAnO1xuaW1wb3J0IHtjb25uZWN0fSBmcm9tICdyZWFjdC1yZWR1eCc7XG5pbXBvcnQge3JhbmdlfSBmcm9tICdyYW5nZSc7XG5pbXBvcnQgY2xhc3NuYW1lcyBmcm9tICdjbGFzc25hbWVzJztcblxuZnVuY3Rpb24gV29ya3NwYWNlU2VsZWN0b3IgKHN0YXRlKSB7XG4gIGNvbnN0IHtcbiAgICB2aWV3czoge0NpcGhlcmVkVGV4dCwgU2VsZWN0ZWRUZXh0LCBGcmVxdWVuY3lBbmFseXNpcywgUm90b3IsIFNjaGVkdWxpbmdDb250cm9scywgRGVjaXBoZXJlZFRleHQsIEhpbnRSZXF1ZXN0RmVlZGJhY2t9LFxuICAgIGFjdGlvbnM6IHtyZXF1ZXN0SGludH0sXG4gICAgcm90b3JzLCBlZGl0aW5nXG4gIH0gPSBzdGF0ZTtcbiAgbGV0IGhpbnRSZXF1ZXN0ID0gbnVsbDtcbiAgaWYgKHR5cGVvZiBlZGl0aW5nLnJvdG9ySW5kZXggPT09ICdudW1iZXInKSB7XG4gICAgY29uc3QgZWRpdGluZ0NlbGwgPSByb3RvcnNbZWRpdGluZy5yb3RvckluZGV4XS5jZWxsc1tlZGl0aW5nLmNlbGxSYW5rXTtcbiAgICBpZiAoIWVkaXRpbmdDZWxsLmhpbnQgJiYgIWVkaXRpbmdDZWxsLmxvY2tlZCkge1xuICAgICAgaGludFJlcXVlc3QgPSBlZGl0aW5nO1xuICAgIH1cbiAgfVxuICByZXR1cm4ge1xuICAgIENpcGhlcmVkVGV4dCwgU2VsZWN0ZWRUZXh0LCBGcmVxdWVuY3lBbmFseXNpcywgUm90b3IsIFNjaGVkdWxpbmdDb250cm9scywgRGVjaXBoZXJlZFRleHQsXG4gICAgSGludFJlcXVlc3RGZWVkYmFjaywgcmVxdWVzdEhpbnQsIGhpbnRSZXF1ZXN0LCBuYlJvdG9yczogcm90b3JzLmxlbmd0aFxuICB9O1xufVxuXG5jbGFzcyBXb3Jrc3BhY2UgZXh0ZW5kcyBSZWFjdC5QdXJlQ29tcG9uZW50IHtcbiAgcmVuZGVyICgpIHsgXG4gICAgY29uc3Qge0NpcGhlcmVkVGV4dCwgU2VsZWN0ZWRUZXh0LCBGcmVxdWVuY3lBbmFseXNpcywgUm90b3IsIFNjaGVkdWxpbmdDb250cm9scywgRGVjaXBoZXJlZFRleHQsIG5iUm90b3JzLCBoaW50UmVxdWVzdCwgSGludFJlcXVlc3RGZWVkYmFja30gPSB0aGlzLnByb3BzO1xuXG4gICAgcmV0dXJuIChcbiAgICAgIDxkaXY+XG4gICAgICAgIDxoMj57XCJNZXNzYWdlIGNoaWZmcsOpXCJ9PC9oMj5cbiAgICAgICAgPENpcGhlcmVkVGV4dC8+XG4gICAgICBcbiAgICAgICAgPGgyPntcIkFuYWx5c2UgZGUgZnLDqXF1ZW5jZSBkZSBsYSBzw6lsZWN0aW9uXCJ9PC9oMj5cbiAgICAgICAgPEZyZXF1ZW5jeUFuYWx5c2lzLz5cbiAgICAgICAgPGgyPlN1YnN0aXR1dGlvbjo8L2gyPlxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT0nY2xlYXJmaXgnPlxuICAgICAgICAgIDxkaXY+XG4gICAgICAgICAgICB7cmFuZ2UoMCwgbmJSb3RvcnMpLm1hcChpbmRleCA9PiA8Um90b3Iga2V5PXtpbmRleH0gaW5kZXg9e2luZGV4fS8+KX1cbiAgICAgICAgICAgIHsvKiA8U2NoZWR1bGluZ0NvbnRyb2xzLz4gKi99XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvZGl2PlxuICAgICAgICBcbiAgICAgICAgPGRpdiBzdHlsZT17e3dpZHRoOlwiMTAwJVwiLCBtYXJnaW46XCIyMHB4IDBcIn19PlxuICAgICAgICAgIDxkaXYgc3R5bGU9e3t0ZXh0QWxpZ246J2NlbnRlcid9fT5cbiAgICAgICAgICA8aDUgPkhpbnRzPC9oNT5cbiAgICAgICAgICAgIDxkaXYgc3R5bGU9e3tkaXNwbGF5OiBcImlubGluZS1ncmlkXCIscGFkZGluZzpcIjEwcHhcIixib3JkZXI6IFwiMXB4IHNvbGlkICMwMDBcIiwgYm9yZGVyUmlnaHQ6XCIwXCIsd2lkdGg6IFwiMzAlXCIsIGJhY2tncm91bmQ6XCJyZ2IoMjAyLCAyMDIsIDIwMilcIn19PlxuICAgICAgICAgICAgICA8cCBzdHlsZT17e2ZvbnRXZWlnaHQ6ICdib2xkJywgdGV4dEFsaWduOiAnY2VudGVyJ319PntcIkluZGljZXNcIn08L3A+XG4gICAgICAgICAgICAgIDxwPntcIlBvdXIgdW4gY2/Du3QgZGUgXCJ9PHNwYW4gc3R5bGU9e3tmb250V2VpZ2h0OiAnYm9sZCd9fT57XCI1IHBvaW50c1wifTwvc3Bhbj57XCIsIGNsaXF1ZXogc3VyIHVuZSBjYXNlIGRlIHJvdG9yIGV0IHZhbGlkZXogcG91ciBvYnRlbmlyIHNhIHZhbGV1ci5cIn08L3A+XG4gICAgICAgICAgICAgIDxkaXYgc3R5bGU9e3t0ZXh0QWxpZ246ICdjZW50ZXInLCBtYXJnaW46ICcxMHB4IDAnfX0+XG4gICAgICAgICAgICAgICAgPEJ1dHRvbiBvbkNsaWNrPXt0aGlzLnJlcXVlc3RIaW50fSBkaXNhYmxlZD17IWhpbnRSZXF1ZXN0fT57YFZhbGlkZXJgfTwvQnV0dG9uPlxuICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDwvZGl2PlxuXG4gICAgICAgICAgICA8ZGl2IHN0eWxlPXt7ZGlzcGxheTogXCJpbmxpbmUtZ3JpZFwiLHBhZGRpbmc6XCIxMHB4XCIsYm9yZGVyOiBcIjFweCBzb2xpZCAjMDAwXCIsIGJvcmRlckxlZnQ6XCIwXCIsd2lkdGg6IFwiMzAlXCIsIGJhY2tncm91bmQ6XCJyZ2IoMjAyLCAyMDIsIDIwMilcIn19PlxuICAgICAgICAgICAgICA8cCBzdHlsZT17e2ZvbnRXZWlnaHQ6ICdib2xkJywgdGV4dEFsaWduOiAnY2VudGVyJ319PntcIkluZGljZXNcIn08L3A+XG4gICAgICAgICAgICAgIDxwPntcIlBvdXIgdW4gY2/Du3QgZGUgXCJ9PHNwYW4gc3R5bGU9e3tmb250V2VpZ2h0OiAnYm9sZCd9fT57XCI1IHBvaW50c1wifTwvc3Bhbj57XCIsIGNsaXF1ZXogc3VyIHVuZSBjYXNlIGRlIHJvdG9yIGV0IHZhbGlkZXogcG91ciBvYnRlbmlyIHNhIHZhbGV1ci5cIn08L3A+XG4gICAgICAgICAgICAgIDxkaXYgc3R5bGU9e3t0ZXh0QWxpZ246ICdjZW50ZXInLCBtYXJnaW46ICcxMHB4IDAnfX0+XG4gICAgICAgICAgICAgICAgPEJ1dHRvbiBvbkNsaWNrPXt0aGlzLnJlcXVlc3RIaW50fSBkaXNhYmxlZD17IWhpbnRSZXF1ZXN0fT57YFZhbGlkZXJgfTwvQnV0dG9uPlxuICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICA8L2Rpdj5cbiAgICAgICAgPEhpbnRSZXF1ZXN0RmVlZGJhY2svPlxuICAgICAgICAgIDxoMj57XCJUZXh0ZSBkw6ljaGlmZnLDqVwifTwvaDI+XG4gICAgICAgICAgPERlY2lwaGVyZWRUZXh0Lz5cbiAgICAgIDwvZGl2PlxuICAgICk7XG4gIH1cbiAgcmVxdWVzdEhpbnQgPSAoKSA9PiB7XG4gICAgY29uc3Qge2Rpc3BhdGNoLCByZXF1ZXN0SGludCwgaGludFJlcXVlc3R9ID0gdGhpcy5wcm9wcztcbiAgICBkaXNwYXRjaCh7dHlwZTogcmVxdWVzdEhpbnQsIHBheWxvYWQ6IHtyZXF1ZXN0OiBoaW50UmVxdWVzdH19KTtcbiAgfTtcbn1cblxuZXhwb3J0IGRlZmF1bHQge1xuICB2aWV3czoge1xuICAgIFdvcmtzcGFjZTogY29ubmVjdChXb3Jrc3BhY2VTZWxlY3RvcikoV29ya3NwYWNlKSxcbiAgfVxufTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy93b3Jrc3BhY2VfYnVuZGxlLmpzIiwiXG5pbXBvcnQgdXBkYXRlIGZyb20gJ2ltbXV0YWJpbGl0eS1oZWxwZXInO1xuXG5mdW5jdGlvbiBiaXNlY3QgKGEsIHgpIHtcbiAgICBsZXQgbG8gPSAwLCBoaSA9IGEubGVuZ3RoLCBtaWQ7XG4gICAgd2hpbGUgKGxvIDwgaGkpIHtcbiAgICAgICAgbWlkID0gKGxvICsgaGkpIC8gMiB8IDA7XG4gICAgICAgIGlmICh4IDwgYVttaWRdKSB7XG4gICAgICAgICAgICBoaSA9IG1pZDtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGxvID0gbWlkICsgMTtcbiAgICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gbG87XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBjaGFuZ2VTZWxlY3Rpb24gKHZhbHVlcywgdmFsdWUsIHNlbGVjdGVkKSB7XG4gICAgY29uc3QgaW5kZXggPSBiaXNlY3QodmFsdWVzLCB2YWx1ZSk7XG4gICAgaWYgKHNlbGVjdGVkKSB7XG4gICAgICAgIHJldHVybiB2YWx1ZXNbaW5kZXggLSAxXSA9PT0gdmFsdWUgPyB7fSA6IHskc3BsaWNlOiBbW2luZGV4LCAwLCB2YWx1ZV1dfTtcbiAgICB9IGVsc2Uge1xuICAgICAgICByZXR1cm4gdmFsdWVzW2luZGV4IC0gMV0gIT09IHZhbHVlID8ge30gOiB7JHNwbGljZTogW1tpbmRleCAtIDEsIDFdXX07XG4gICAgfVxufVxuXG5leHBvcnQgZnVuY3Rpb24gc29ydGVkQXJyYXlIYXNFbGVtZW50IChhLCB4KSB7XG4gIGNvbnN0IGkgPSBiaXNlY3QoYSwgeCkgLSAxO1xuICByZXR1cm4gYVtpXSA9PT0geDtcbn1cblxuXG5leHBvcnQgZnVuY3Rpb24gdXBkYXRlR3JpZEdlb21ldHJ5IChncmlkKSB7XG4gIGNvbnN0IHt3aWR0aCwgaGVpZ2h0LCBjZWxsV2lkdGgsIGNlbGxIZWlnaHQsIHNjcm9sbFRvcCwgbmJDZWxsc30gPSBncmlkO1xuICBjb25zdCBzY3JvbGxCYXJXaWR0aCA9IDIwO1xuICBjb25zdCBwYWdlQ29sdW1ucyA9IE1hdGgubWF4KDQwLCBNYXRoLmZsb29yKCh3aWR0aCAtIHNjcm9sbEJhcldpZHRoKSAvIGNlbGxXaWR0aCkpO1xuICBjb25zdCBwYWdlUm93cyA9IE1hdGgubWF4KDgsIE1hdGguY2VpbChoZWlnaHQgLyBjZWxsSGVpZ2h0KSk7XG4gIGNvbnN0IGJvdHRvbSA9IE1hdGguY2VpbChuYkNlbGxzIC8gcGFnZUNvbHVtbnMpICogY2VsbEhlaWdodCAtIDE7XG4gIGNvbnN0IG1heFRvcCA9IE1hdGgubWF4KDAsIGJvdHRvbSArIDEgLSBwYWdlUm93cyAqIGNlbGxIZWlnaHQpO1xuICByZXR1cm4gey4uLmdyaWQsIHBhZ2VDb2x1bW5zLCBwYWdlUm93cywgc2Nyb2xsVG9wOiBNYXRoLm1pbihtYXhUb3AsIHNjcm9sbFRvcCksIGJvdHRvbSwgbWF4VG9wfTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHVwZGF0ZUdyaWRWaXNpYmxlUm93cyAoZ3JpZCwgb3B0aW9ucykge1xuICBvcHRpb25zID0gb3B0aW9ucyB8fCB7fTtcbiAgY29uc3Qge25iQ2VsbHMsIGNlbGxIZWlnaHQsIHBhZ2VDb2x1bW5zLCBwYWdlUm93cywgY2VsbHMsIHNjcm9sbFRvcCwgc2VsZWN0ZWRSb3dzfSA9IGdyaWQ7XG4gIGlmICh0eXBlb2Ygc2Nyb2xsVG9wICE9PSAnbnVtYmVyJykge1xuICAgIHJldHVybiBncmlkO1xuICB9XG4gIGNvbnN0IGZpcnN0Um93ID0gTWF0aC5mbG9vcihzY3JvbGxUb3AgLyBjZWxsSGVpZ2h0KTtcbiAgY29uc3QgbGFzdFJvdyA9IE1hdGgubWluKGZpcnN0Um93ICsgcGFnZVJvd3MgLSAxLCBNYXRoLmNlaWwobmJDZWxscyAvIHBhZ2VDb2x1bW5zKSAtIDEpO1xuICBjb25zdCByb3dzID0gW107XG4gIGNvbnN0IGdldENlbGwgPSBvcHRpb25zLmdldENlbGwgfHwgKGNlbGxzID8gKGluZGV4ID0+ICh7Y2VsbDogY2VsbHNbaW5kZXhdfSkpIDogKF9pbmRleCA9PiBudWxsKSk7XG4gIGZvciAobGV0IHJvd0luZGV4ID0gZmlyc3RSb3c7IHJvd0luZGV4IDw9IGxhc3RSb3c7IHJvd0luZGV4ICs9IDEpIHtcbiAgICBjb25zdCByb3dTdGFydFBvcyA9IHJvd0luZGV4ICogcGFnZUNvbHVtbnM7XG4gICAgY29uc3Qgcm93Q2VsbHMgPSBbXTtcbiAgICBmb3IgKGxldCBjb2xJbmRleCA9IDA7IGNvbEluZGV4IDwgcGFnZUNvbHVtbnM7IGNvbEluZGV4ICs9IDEpIHtcbiAgICAgIHJvd0NlbGxzLnB1c2goe2luZGV4OiBjb2xJbmRleCwgLi4uZ2V0Q2VsbChyb3dTdGFydFBvcyArIGNvbEluZGV4KX0pO1xuICAgIH1cbiAgICBjb25zdCBzZWxlY3RlZCA9IHNlbGVjdGVkUm93cyAmJiBzb3J0ZWRBcnJheUhhc0VsZW1lbnQoc2VsZWN0ZWRSb3dzLCByb3dJbmRleCk7XG4gICAgcm93cy5wdXNoKHtpbmRleDogcm93SW5kZXgsIHNlbGVjdGVkLCBjb2x1bW5zOiByb3dDZWxsc30pO1xuICB9XG4gIHJldHVybiB7Li4uZ3JpZCwgdmlzaWJsZToge3Jvd3N9fTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHVwZGF0ZUdyaWRWaXNpYmxlQ29sdW1ucyAoZ3JpZCwgb3B0aW9ucykge1xuICBvcHRpb25zID0gb3B0aW9ucyB8fCB7fTtcbiAgY29uc3Qge2NlbGxIZWlnaHQsIHBhZ2VDb2x1bW5zLCBwYWdlUm93cywgY2VsbHMsIHNjcm9sbFRvcCwgc2VsZWN0ZWRDb2x1bW5zfSA9IGdyaWQ7XG4gIGlmICh0eXBlb2Ygc2Nyb2xsVG9wICE9PSAnbnVtYmVyJykge1xuICAgIHJldHVybiBncmlkO1xuICB9XG4gIGNvbnN0IGZpcnN0Um93ID0gTWF0aC5mbG9vcihzY3JvbGxUb3AgLyBjZWxsSGVpZ2h0KTtcbiAgY29uc3QgbGFzdFJvdyA9IGZpcnN0Um93ICsgcGFnZVJvd3MgLSAxO1xuICBjb25zdCBjb2x1bW5zID0gW107XG4gIGNvbnN0IGdldENlbGwgPSBvcHRpb25zLmdldENlbGwgfHwgKGNlbGxzID8gKGluZGV4ID0+ICh7Y2VsbDogY2VsbHNbaW5kZXhdfSkpIDogKF9pbmRleCA9PiBudWxsKSk7XG4gIGZvciAobGV0IGNvbEluZGV4ID0gMDsgY29sSW5kZXggPCBwYWdlQ29sdW1uczsgY29sSW5kZXggKz0gMSkge1xuICAgIGNvbnN0IGNvbENlbGxzID0gW107XG4gICAgZm9yIChsZXQgcm93SW5kZXggPSBmaXJzdFJvdzsgcm93SW5kZXggPD0gbGFzdFJvdzsgcm93SW5kZXggKz0gMSkge1xuICAgICAgY29sQ2VsbHMucHVzaCh7aW5kZXg6IHJvd0luZGV4LCAuLi5nZXRDZWxsKHJvd0luZGV4ICogcGFnZUNvbHVtbnMgKyBjb2xJbmRleCl9KTtcbiAgICB9XG4gICAgY29uc3Qgc2VsZWN0ZWQgPSBzZWxlY3RlZENvbHVtbnMgJiYgc29ydGVkQXJyYXlIYXNFbGVtZW50KHNlbGVjdGVkQ29sdW1ucywgY29sSW5kZXgpO1xuICAgIGNvbHVtbnMucHVzaCh7aW5kZXg6IGNvbEluZGV4LCBzZWxlY3RlZCwgcm93czogY29sQ2VsbHN9KTtcbiAgfVxuICByZXR1cm4gey4uLmdyaWQsIHZpc2libGU6IHtjb2x1bW5zfX07XG59XG5cbmV4cG9ydCBmdW5jdGlvbiB1cGRhdGVHcmlkVmlzaWJsZUFyZWEgKGdyaWQsIG9wdGlvbnMpIHtcbiAgLyogVE9ETzogYnVpbGQgYSBjYWNoZSBrZXksIHN0b3JlIGl0IGluIHRoZSBncmlkLCB1c2UgaXQgdG8gc2tpcCBjb21wdXRhdGlvbiB3aGVuIHVuY2hhbmdlZCAqL1xuICBpZiAoZ3JpZC5tb2RlID09PSAncm93cycpIHtcbiAgICByZXR1cm4gdXBkYXRlR3JpZFZpc2libGVSb3dzKGdyaWQsIG9wdGlvbnMpO1xuICB9XG4gIGlmIChncmlkLm1vZGUgPT09ICdjb2x1bW5zJykge1xuICAgIHJldHVybiB1cGRhdGVHcmlkVmlzaWJsZUNvbHVtbnMoZ3JpZCwgb3B0aW9ucyk7XG4gIH1cbiAgcmV0dXJuIGdyaWQ7XG59XG5cbi8qIFJPVE9SIGZ1bmN0aW9ucyAqL1xuXG5cbmV4cG9ydCBmdW5jdGlvbiBtYWtlUm90b3IgKGFscGhhYmV0LCB7c2NoZWR1bGUsIGVkaXRhYmxlUm93fSkge1xuICBjb25zdCBzaXplID0gYWxwaGFiZXQubGVuZ3RoO1xuICBjb25zdCBjZWxscyA9IGFscGhhYmV0LnNwbGl0KCcnKSAubWFwKGZ1bmN0aW9uIChjLCByYW5rKSB7XG4gICAgcmV0dXJuIHtyYW5rLCByb3RhdGluZzogYywgZWRpdGFibGU6IG51bGwsIGxvY2tlZDogZmFsc2UsIGNvbmZsaWN0OiBmYWxzZX07XG4gIH0pO1xuICBjb25zdCBudWxsUGVybSA9IG5ldyBBcnJheShzaXplKS5maWxsKC0xKTtcbiAgcmV0dXJuIHthbHBoYWJldCwgc2l6ZSwgc2NoZWR1bGUsIGVkaXRhYmxlUm93LCBjZWxscywgZm9yd2FyZDogbnVsbFBlcm0sIGJhY2t3YXJkOiBudWxsUGVybX07XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBkdW1wUm90b3JzIChhbHBoYWJldCwgcm90b3JzKSB7XG4gIHJldHVybiByb3RvcnMubWFwKHJvdG9yID0+XG4gICAgcm90b3IuY2VsbHMubWFwKCh7ZWRpdGFibGUsIGxvY2tlZH0pID0+XG4gICAgICBbYWxwaGFiZXQuaW5kZXhPZihlZGl0YWJsZSksIGxvY2tlZCA/IDEgOiAwXSkpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gbG9hZFJvdG9ycyAoYWxwaGFiZXQsIHJvdG9yU3BlY3MsIGhpbnRzLCByb3RvckR1bXBzKSB7XG4gIHJldHVybiByb3RvckR1bXBzLm1hcCgoY2VsbHMsIHJvdG9ySW5kZXgpID0+IHtcbiAgICBjb25zdCAkY2VsbHMgPSBbXTtcbiAgICBjZWxscy5mb3JFYWNoKChjZWxsLCBjZWxsSW5kZXgpID0+IHtcbiAgICAgIC8qIExvY2tpbmcgaW5mb3JtYXRpb24gaXMgbm90IGluY2x1ZGVkIGluIHRoZSBhbnN3ZXIuICovXG4gICAgICBpZiAodHlwZW9mIGNlbGwgPT09ICdudW1iZXInKSBjZWxsID0gW2NlbGwsIDBdO1xuICAgICAgY29uc3QgW3JhbmssIGxvY2tlZF0gPSBjZWxsO1xuICAgICAgJGNlbGxzW2NlbGxJbmRleF0gPSB7XG4gICAgICAgIGVkaXRhYmxlOiB7JHNldDogcmFuayA9PT0gLTEgPyBudWxsIDogYWxwaGFiZXRbcmFua119LFxuICAgICAgICBsb2NrZWQ6IHskc2V0OiBsb2NrZWQgIT09IDB9LFxuICAgICAgfTtcbiAgICB9KTtcbiAgICBoaW50cy5mb3JFYWNoKCh7cm90b3JJbmRleDogaSwgY2VsbFJhbms6IGosIHN5bWJvbH0pID0+IHtcbiAgICAgIGlmIChyb3RvckluZGV4ID09PSBpKSB7XG4gICAgICAgICRjZWxsc1tqXSA9IHtcbiAgICAgICAgICBlZGl0YWJsZTogeyRzZXQ6IHN5bWJvbH0sXG4gICAgICAgICAgaGludDogeyRzZXQ6IHRydWV9LFxuICAgICAgICB9O1xuICAgICAgfVxuICAgIH0pO1xuICAgIGxldCByb3RvciA9IG1ha2VSb3RvcihhbHBoYWJldCwgcm90b3JTcGVjc1tyb3RvckluZGV4XSk7XG4gICAgcm90b3IgPSB1cGRhdGUocm90b3IsIHtjZWxsczogJGNlbGxzfSk7XG4gICAgcm90b3IgPSBtYXJrUm90b3JDb25mbGljdHModXBkYXRlUGVybXMocm90b3IpKTtcbiAgICByZXR1cm4gcm90b3I7XG4gIH0pO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gZWRpdFJvdG9yQ2VsbCAocm90b3IsIHJhbmssIHN5bWJvbCkge1xuICByb3RvciA9IHVwZGF0ZShyb3Rvciwge2NlbGxzOiB7W3JhbmtdOiB7ZWRpdGFibGU6IHskc2V0OiBzeW1ib2x9fX19KTtcbiAgcmV0dXJuIHVwZGF0ZVBlcm1zKG1hcmtSb3RvckNvbmZsaWN0cyhyb3RvcikpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gbG9ja1JvdG9yQ2VsbCAocm90b3IsIHJhbmssIGxvY2tlZCkge1xuICByZXR1cm4gdXBkYXRlKHJvdG9yLCB7Y2VsbHM6IHtbcmFua106IHtsb2NrZWQ6IHskc2V0OiBsb2NrZWR9fX19KTtcbn1cblxuZnVuY3Rpb24gbWFya1JvdG9yQ29uZmxpY3RzIChyb3Rvcikge1xuICBjb25zdCBjb3VudHMgPSBuZXcgTWFwKCk7XG4gIGNvbnN0IGNoYW5nZXMgPSB7fTtcbiAgZm9yIChsZXQge3JhbmssIGVkaXRhYmxlLCBjb25mbGljdH0gb2Ygcm90b3IuY2VsbHMpIHtcbiAgICBpZiAoY29uZmxpY3QpIHtcbiAgICAgIGNoYW5nZXNbcmFua10gPSB7Y29uZmxpY3Q6IHskc2V0OiBmYWxzZX19O1xuICAgIH1cbiAgICBpZiAoZWRpdGFibGUgIT09IG51bGwpIHtcbiAgICAgIGlmICghY291bnRzLmhhcyhlZGl0YWJsZSkpIHtcbiAgICAgICAgY291bnRzLnNldChlZGl0YWJsZSwgW3JhbmtdKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGNvdW50cy5nZXQoZWRpdGFibGUpLnB1c2gocmFuayk7XG4gICAgICB9XG4gICAgfVxuICB9XG4gIGZvciAobGV0IHJhbmtzIG9mIGNvdW50cy52YWx1ZXMoKSkge1xuICAgIGlmIChyYW5rcy5sZW5ndGggPiAxKSB7XG4gICAgICBmb3IgKGxldCByYW5rIG9mIHJhbmtzKSB7XG4gICAgICAgIGNoYW5nZXNbcmFua10gPSB7Y29uZmxpY3Q6IHskc2V0OiB0cnVlfX07XG4gICAgICB9XG4gICAgfVxuICB9XG4gIHJldHVybiB1cGRhdGUocm90b3IsIHtjZWxsczogY2hhbmdlc30pO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gdXBkYXRlUm90b3JXaXRoS2V5IChhbHBoYWJldCwgcm90b3IsIGtleSkge1xuICBjb25zdCAkY2VsbHMgPSB7fTtcbiAga2V5LnNwbGl0KCcnKS5mb3JFYWNoKChzeW1ib2wsIGNlbGxJbmRleCkgPT4ge1xuICAgICRjZWxsc1tjZWxsSW5kZXhdID0ge1xuICAgICAgZWRpdGFibGU6IHskc2V0OiBhbHBoYWJldC5pbmRleE9mKHN5bWJvbCkgPT09IC0xID8gbnVsbCA6IHN5bWJvbH1cbiAgICB9O1xuICB9KTtcbiAgcmV0dXJuIHVwZGF0ZVBlcm1zKHVwZGF0ZShyb3Rvciwge2NlbGxzOiAkY2VsbHN9KSk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiB1cGRhdGVQZXJtcyAocm90b3IpIHtcbiAgY29uc3Qge3NpemUsIGFscGhhYmV0LCBjZWxsc30gPSByb3RvcjtcbiAgY29uc3QgZm9yd2FyZCA9IG5ldyBBcnJheShzaXplKS5maWxsKC0xKTtcbiAgY29uc3QgYmFja3dhcmQgPSBuZXcgQXJyYXkoc2l6ZSkuZmlsbCgtMSk7XG4gIGZvciAobGV0IGNlbGwgb2YgY2VsbHMpIHtcbiAgICBpZiAoY2VsbC5lZGl0YWJsZSAhPT0gbnVsbCAmJiAhY2VsbC5jb25mbGljdCkge1xuICAgICAgY29uc3Qgc291cmNlID0gYWxwaGFiZXQuaW5kZXhPZihjZWxsLmVkaXRhYmxlKTtcbiAgICAgIGZvcndhcmRbc291cmNlXSA9IGNlbGwucmFuaztcbiAgICAgIGJhY2t3YXJkW2NlbGwucmFua10gPSBzb3VyY2U7XG4gICAgfVxuICB9XG4gIHJldHVybiB7Li4ucm90b3IsIGZvcndhcmQsIGJhY2t3YXJkfTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGdldFJvdG9yU2hpZnQgKHJvdG9yLCBwb3NpdGlvbikge1xuICBjb25zdCB7c2l6ZSwgc2NoZWR1bGV9ID0gcm90b3I7XG4gIHJldHVybiBzY2hlZHVsZSA9PT0gMCA/IDAgOiBNYXRoLmZsb29yKHBvc2l0aW9uIC8gc2NoZWR1bGUpICUgc2l6ZTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGFwcGx5Um90b3JzIChyb3RvcnMsIHBvc2l0aW9uLCByYW5rKSB7XG4gIGNvbnN0IHJlc3VsdCA9IHtyYW5rLCBsb2NrczogMCwgdHJhY2U6IFtdfTtcbiAgZm9yIChsZXQgcm90b3JJbmRleCA9IDA7IHJvdG9ySW5kZXggPCByb3RvcnMubGVuZ3RoOyByb3RvckluZGV4ICs9IDEpIHtcbiAgICBjb25zdCByb3RvciA9IHJvdG9yc1tyb3RvckluZGV4XTtcbiAgICBjb25zdCBzaGlmdCA9IGdldFJvdG9yU2hpZnQocm90b3IsIHBvc2l0aW9uKTtcbiAgICBhcHBseVJvdG9yKHJvdG9yLCBzaGlmdCwgcmVzdWx0KTtcbiAgICBpZiAocmVzdWx0LnJhbmsgPT09IC0xKSB7XG4gICAgICBicmVhaztcbiAgICB9XG4gIH1cbiAgaWYgKHJlc3VsdC5sb2NrcyA9PT0gcm90b3JzLmxlbmd0aCkge1xuICAgIHJlc3VsdC5sb2NrZWQgPSB0cnVlO1xuICB9XG4gIHJldHVybiByZXN1bHQ7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBhcHBseVJvdG9yIChyb3Rvciwgc2hpZnQsIHJlc3VsdCkge1xuICBsZXQgcmFuayA9IHJlc3VsdC5yYW5rLCBjZWxsO1xuICAvKiBOZWdhdGl2ZSBzaGlmdCB0byB0aGUgc3RhdGljIHRvcCByb3cgYmVmb3JlIHBlcm11dGF0aW9uLiAqL1xuICBpZiAocm90b3IuZWRpdGFibGVSb3cgPT09ICdib3R0b20nKSB7XG4gICAgcmFuayA9IGFwcGx5U2hpZnQocm90b3Iuc2l6ZSwgLXNoaWZ0LCByYW5rKTtcbiAgICBjZWxsID0gcm90b3IuY2VsbHNbcmFua107XG4gIH1cbiAgLyogQXBwbHkgdGhlIHBlcm11dGF0aW9uLiAqL1xuICByYW5rID0gcm90b3IuZm9yd2FyZFtyYW5rXTtcbiAgLyogUG9zaXRpdmUgc2hpZnQgdG8gdGhlIHN0YXRpYyBib3R0b20gcm93IGFmdGVyIHBlcm11dGF0aW9uLiAqL1xuICBpZiAocm90b3IuZWRpdGFibGVSb3cgPT09ICd0b3AnKSB7XG4gICAgY2VsbCA9IHJvdG9yLmNlbGxzW3JhbmtdO1xuICAgIHJhbmsgPSBhcHBseVNoaWZ0KHJvdG9yLnNpemUsIHNoaWZ0LCByYW5rKTtcbiAgfVxuICAvKiBTYXZlIG5ldyByYW5rIChjYW4gYmUgLTEpIGFuZCBhdHRyaWJ1dGVzLiAqL1xuICByZXN1bHQucmFuayA9IHJhbms7XG4gIGlmIChjZWxsKSB7XG4gICAgLyogU2F2ZSB0aGUgcm90b3IgY2VsbCB1c2VkIGluIHRoZSB0cmFjZS4gKi9cbiAgICByZXN1bHQudHJhY2UucHVzaChjZWxsKTtcbiAgICBpZiAoY2VsbC5sb2NrZWQgfHwgY2VsbC5oaW50KSB7XG4gICAgICByZXN1bHQubG9ja3MgKz0gMTtcbiAgICB9XG4gICAgaWYgKGNlbGwuY29sbGlzaW9uKSB7XG4gICAgICByZXN1bHQuY29sbGlzaW9uID0gdHJ1ZTtcbiAgICB9XG4gIH1cbn1cblxuZnVuY3Rpb24gYXBwbHlTaGlmdCAobW9kLCBhbW91bnQsIHJhbmspIHtcbiAgaWYgKHJhbmsgIT09IC0xKSB7XG4gICAgaWYgKGFtb3VudCA8IDApIHtcbiAgICAgIGFtb3VudCArPSBtb2Q7XG4gICAgfVxuICAgIHJhbmsgPSAocmFuayArIGFtb3VudCkgJSBtb2Q7XG4gIH1cbiAgcmV0dXJuIHJhbms7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiB3cmFwQXJvdW5kICh2YWx1ZSwgbW9kKSB7XG4gIHJldHVybiAoKHZhbHVlICUgbW9kKSArIG1vZCkgJSBtb2Q7XG59XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvdXRpbHMuanMiXSwic291cmNlUm9vdCI6IiJ9