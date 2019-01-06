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
      console.log(visibleRows);
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
          width: "".concat(20 * nbCells, "px")
        }
      }, _react.default.createElement("div", {
        className: "clearfix"
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
        }, editableCell, staticCell, lock);
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
      return _react.default.createElement("div", null, _react.default.createElement("h2", null, "Message chiffré"), _react.default.createElement(CipheredText, null), _react.default.createElement("h2", null, "Analyse de fréquence de la sélection"), _react.default.createElement(FrequencyAnalysis, null), _react.default.createElement("h2", null, "Rotor".concat(nbRotors > 1 ? 's' : '', " de d\xE9chiffrement")), _react.default.createElement("div", {
        className: "clearfix"
      }, _react.default.createElement("div", {
        style: {
          border: '1px solid #ccc',
          float: 'right',
          width: '200px',
          padding: '10px',
          borderRadius: '5px',
          backgroundColor: '#f9f9f9',
          fontSize: '12px',
          marginRight: '15px'
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
          float: 'left'
        }
      }, (0, _range.range)(0, nbRotors).map(function (index) {
        return _react.default.createElement(Rotor, {
          key: index,
          index: index
        });
      }), _react.default.createElement(SchedulingControls, null))), _react.default.createElement(HintRequestFeedback, null), _react.default.createElement("h2", null, "Texte déchiffré"), _react.default.createElement(DecipheredText, null));
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zcmMvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2FsZ29yZWFfcmVhY3RfdGFzay9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvYWxnb3JlYV9yZWFjdF90YXNrL2xpbmtlci5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvYWxnb3JlYV9yZWFjdF90YXNrL3VpL3N0eWxlcy5jc3M/ZThiOSIsIndlYnBhY2s6Ly8vLi9zcmMvYWxnb3JlYV9yZWFjdF90YXNrL3VpL3N0eWxlcy5jc3MiLCJ3ZWJwYWNrOi8vLy4vc3JjL2FsZ29yZWFfcmVhY3RfdGFzay9hcHBfYnVuZGxlLmpzIiwid2VicGFjazovLy8uL3NyYy9hbGdvcmVhX3JlYWN0X3Rhc2svdWkvdGFza19iYXIuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2FsZ29yZWFfcmVhY3RfdGFzay91aS9zcGlubmVyLmpzIiwid2VicGFjazovLy8uL3NyYy9hbGdvcmVhX3JlYWN0X3Rhc2svbGVnYWN5L3Rhc2suanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2FsZ29yZWFfcmVhY3RfdGFzay9zZXJ2ZXJfYXBpLmpzIiwid2VicGFjazovLy8uL3NyYy9hbGdvcmVhX3JlYWN0X3Rhc2svbGVnYWN5L3BsYXRmb3JtX2FkYXB0ZXIuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2FsZ29yZWFfcmVhY3RfdGFzay9wbGF0Zm9ybV9idW5kbGUuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2FsZ29yZWFfcmVhY3RfdGFzay9oaW50c19idW5kbGUuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2FsZ29yZWFfcmVhY3RfdGFzay93aW5kb3dfaGVpZ2h0X21vbml0b3IuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3N0eWxlLmNzcz8xNWY0Iiwid2VicGFjazovLy8uL3NyYy9zdHlsZS5jc3MiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NpcGhlcmVkX3RleHRfYnVuZGxlLmpzIiwid2VicGFjazovLy8uL3NyYy9mcmVxdWVuY3lfYW5hbHlzaXNfYnVuZGxlLmpzIiwid2VicGFjazovLy9jcnlwdG8gKGlnbm9yZWQpIiwid2VicGFjazovLy8uL3NyYy9zY2hlZHVsaW5nX2J1bmRsZS5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvcm90b3JzX2J1bmRsZS5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvZGVjaXBoZXJlZF90ZXh0X2J1bmRsZS5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvd29ya3NwYWNlX2J1bmRsZS5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvdXRpbHMuanMiXSwibmFtZXMiOlsiVGFza0J1bmRsZSIsImFjdGlvblJlZHVjZXJzIiwiYXBwSW5pdCIsImFwcEluaXRSZWR1Y2VyIiwidGFza0luaXQiLCJ0YXNrSW5pdFJlZHVjZXIiLCJ0YXNrUmVmcmVzaCIsInRhc2tSZWZyZXNoUmVkdWNlciIsInRhc2tBbnN3ZXJMb2FkZWQiLCJ0YXNrU3RhdGVMb2FkZWQiLCJpbmNsdWRlcyIsIkNpcGhlcmVkVGV4dEJ1bmRsZSIsIkZyZXF1ZW5jeUFuYWx5c2lzQnVuZGxlIiwiU2NoZWR1bGluZ0J1bmRsZSIsIlJvdG9yc0J1bmRsZSIsIkRlY2lwaGVyZWRUZXh0QnVuZGxlIiwiV29ya3NwYWNlQnVuZGxlIiwic2VsZWN0b3JzIiwiZ2V0VGFza1N0YXRlIiwiZ2V0VGFza0Fuc3dlciIsInByb2Nlc3MiLCJlYXJseVJlZHVjZXIiLCJzdGF0ZSIsImFjdGlvbiIsImNvbnNvbGUiLCJsb2ciLCJ0eXBlIiwiX2FjdGlvbiIsInRhc2tNZXRhRGF0YSIsInRhc2tEYXRhIiwiYWxwaGFiZXQiLCJyb3RvclNwZWNzIiwicm90b3JzIiwiaGludHMiLCJtYXAiLCJfIiwidGFza1JlYWR5IiwiZHVtcCIsInJvdG9yIiwiY2VsbHMiLCJlZGl0YWJsZSIsImluZGV4T2YiLCJhbnN3ZXIiLCJwYXlsb2FkIiwiJHNldCIsInJ1biIsImNvbnRhaW5lciIsIm9wdGlvbnMiLCJwbGF0Zm9ybSIsIndpbmRvdyIsImRlYnVnIiwiQXBwQnVuZGxlIiwiYWN0aW9ucyIsInZpZXdzIiwicmVkdWNlciIsInJvb3RTYWdhIiwic2FmZVJlZHVjZXIiLCJleCIsImVycm9yIiwiZXJyb3JzIiwic2FnYU1pZGRsZXdhcmUiLCJlbmhhbmNlciIsInN0b3JlIiwic3RhcnQiLCJxdWVyeSIsInF1ZXJ5U3RyaW5nIiwicGFyc2UiLCJsb2NhdGlvbiIsInNlYXJjaCIsInRhc2tUb2tlbiIsInNUb2tlbiIsImRpc3BhdGNoIiwiUmVhY3RET00iLCJyZW5kZXIiLCJsaW5rIiwicm9vdEJ1bmRsZSIsImZlYXR1cmVzIiwiQWN0aW9ucyIsIlZpZXdzIiwiU2VsZWN0b3JzIiwiRWFybHlSZWR1Y2VycyIsIlJlZHVjZXJzIiwiQWN0aW9uUmVkdWNlcnMiLCJMYXRlUmVkdWNlcnMiLCJTYWdhcyIsImFwcCIsImZlYXR1cmUiLCJwcmVwYXJlIiwibGlua0J1bmRsZSIsImZpbmFsaXplIiwiYnVuZGxlIiwiYWRkIiwic3ViQnVuZGxlIiwiT2JqZWN0IiwiYXNzaWduIiwiX2FwcCIsInVuZGVmaW5lZCIsInJlZHVjZXJzIiwic2VxdWVuY2VSZWR1Y2VycyIsImxhdGVSZWR1Y2VyIiwiTWFwIiwia2V5cyIsImtleSIsImdldCIsInNldCIsImFjdGlvblJlZHVjZXIiLCJtYWtlQWN0aW9uUmVkdWNlciIsInNhZ2FzIiwic2FnYSIsInB1c2giLCJBcnJheSIsInByb3RvdHlwZSIsImFwcGx5IiwiZWZmZWN0cyIsImVudHJpZXMiLCJyZXN1bHQiLCJpIiwibGVuZ3RoIiwiRXJyb3IiLCJjb21wb3NlUmVkdWNlcnMiLCJmc3QiLCJzbmQiLCJhcHBTYWdhIiwiYXBwSW5pdFNhZ2EiLCJwbGF0Zm9ybVZhbGlkYXRlU2FnYSIsImFwcEluaXREb25lUmVkdWNlciIsInBsYXRmb3JtQXBpIiwidGFza0FwaSIsInNlcnZlckFwaSIsImFwcEluaXRGYWlsZWRSZWR1Y2VyIiwibWVzc2FnZSIsImZhdGFsRXJyb3IiLCJwbGF0Zm9ybVZhbGlkYXRlIiwidGFza0FjdGlvbnMiLCJsb2FkIiwidW5sb2FkIiwidXBkYXRlVG9rZW4iLCJnZXRIZWlnaHQiLCJnZXRNZXRhRGF0YSIsImdldFZpZXdzIiwic2hvd1ZpZXdzIiwiZ2V0U3RhdGUiLCJyZWxvYWRTdGF0ZSIsImdldEFuc3dlciIsInJlbG9hZEFuc3dlciIsImdyYWRlQW5zd2VyIiwic2VydmVyX21vZHVsZSIsIm1ha2VUYXNrQ2hhbm5lbCIsInRhc2tDaGFubmVsIiwidGFzayIsImFwcEluaXRGYWlsZWQiLCJ0b1N0cmluZyIsImFwcEluaXREb25lIiwiaW5pdFdpdGhUYXNrIiwid2luZG93SGVpZ2h0TW9uaXRvclNhZ2EiLCJtb2RlIiwidmFsaWRhdGUiLCJBcHBTZWxlY3RvciIsIldvcmtzcGFjZSIsImdyYWRpbmciLCJBcHAiLCJwcm9wcyIsIl92YWxpZGF0ZSIsImZvbnRXZWlnaHQiLCJzY29yZSIsIlJlYWN0IiwiUHVyZUNvbXBvbmVudCIsIlBsYXRmb3JtQnVuZGxlIiwiSGludHNCdW5kbGUiLCJUYXNrQmFyIiwib25WYWxpZGF0ZSIsIlNwaW5uZXIiLCJfcHJvcHMiLCJmb250U2l6ZSIsImVtaXQiLCJtYWtlVGFzayIsInByb3AiLCJidWZmZXJzIiwiZXhwYW5kaW5nIiwic3VjY2VzcyIsInRva2VuIiwiYW5zd2VyVG9rZW4iLCJmZXRjaCIsIm1ha2VTZXJ2ZXJBcGkiLCJjb25maWciLCJzZXJ2aWNlIiwiYm9keSIsIlByb21pc2UiLCJyZXNvbHZlIiwicmVqZWN0IiwidXJsIiwiVVJMIiwiYmFzZVVybCIsImRldmVsIiwibWV0aG9kIiwiaGVhZGVycyIsIkpTT04iLCJzdHJpbmdpZnkiLCJ0aGVuIiwicmVzcG9uc2UiLCJzdGF0dXMiLCJqc29uIiwiY2F0Y2giLCJkYXRhIiwiZ2V0VGFza1BhcmFtcyIsImRlZmF1bHRWYWx1ZSIsImFza0hpbnQiLCJoaW50VG9rZW4iLCJ1cGRhdGVEaXNwbGF5IiwidGFza1Nob3dWaWV3c0V2ZW50U2FnYSIsInRhc2tHZXRWaWV3c0V2ZW50U2FnYSIsInRhc2tVcGRhdGVUb2tlbkV2ZW50U2FnYSIsInRhc2tHZXRIZWlnaHRFdmVudFNhZ2EiLCJ0YXNrVW5sb2FkRXZlbnRTYWdhIiwidGFza0dldE1ldGFEYXRhRXZlbnRTYWdhIiwidGFza0dldEFuc3dlckV2ZW50U2FnYSIsInRhc2tSZWxvYWRBbnN3ZXJFdmVudFNhZ2EiLCJ0YXNrR2V0U3RhdGVFdmVudFNhZ2EiLCJ0YXNrUmVsb2FkU3RhdGVFdmVudFNhZ2EiLCJ0YXNrTG9hZEV2ZW50U2FnYSIsInRhc2tHcmFkZUFuc3dlckV2ZW50U2FnYSIsInRhc2tEYXRhTG9hZGVkUmVkdWNlciIsInRhc2tTdGF0ZUxvYWRlZFJlZHVjZXIiLCJ0YXNrQW5zd2VyTG9hZGVkUmVkdWNlciIsInRhc2tTaG93Vmlld3NFdmVudFJlZHVjZXIiLCJ0YXNrVmlld3MiLCJ0YXNrVXBkYXRlVG9rZW5FdmVudFJlZHVjZXIiLCJ3YXJuIiwiZCIsImRvY3VtZW50IiwiaCIsIk1hdGgiLCJtYXgiLCJvZmZzZXRIZWlnaHQiLCJkb2N1bWVudEVsZW1lbnQiLCJfZXJyb3IiLCJtZXRhRGF0YSIsInN0ckFuc3dlciIsInN0ckR1bXAiLCJfdmlld3MiLCJ0YXNrRGF0YUxvYWRlZCIsInRhc2tBbnN3ZXJHcmFkZWQiLCJtaW5TY29yZSIsIm1heFNjb3JlIiwibm9TY29yZSIsIm1pbl9zY29yZSIsIm1heF9zY29yZSIsIm5vX3Njb3JlIiwic2NvcmVUb2tlbiIsInRhc2tBbnN3ZXJHcmFkZWRSZWR1Y2VyIiwidGFza0xvYWRFdmVudCIsInRhc2tVbmxvYWRFdmVudCIsInRhc2tVcGRhdGVUb2tlbkV2ZW50IiwidGFza0dldEhlaWdodEV2ZW50IiwidGFza0dldE1ldGFEYXRhRXZlbnQiLCJ0YXNrR2V0Vmlld3NFdmVudCIsInRhc2tTaG93Vmlld3NFdmVudCIsInRhc2tHZXRTdGF0ZUV2ZW50IiwidGFza1JlbG9hZFN0YXRlRXZlbnQiLCJ0YXNrR2V0QW5zd2VyRXZlbnQiLCJ0YXNrUmVsb2FkQW5zd2VyRXZlbnQiLCJ0YXNrR3JhZGVBbnN3ZXJFdmVudCIsInJlcXVlc3RIaW50U2FnYSIsImhpbnRSZXF1ZXN0RnVsZmlsbGVkUmVkdWNlciIsImhpbnRSZXF1ZXN0IiwiaGludFJlcXVlc3RSZWplY3RlZFJlZHVjZXIiLCJjb2RlIiwiaGludFJlcXVlc3RGZWVkYmFja0NsZWFyZWRSZWR1Y2VyIiwicmVxdWVzdCIsImluaXRpYWxUYXNrVG9rZW4iLCJ1cGRhdGVkVGFza1Rva2VuIiwiaGludFJlcXVlc3RGdWxmaWxsZWQiLCJoaW50UmVxdWVzdFJlamVjdGVkIiwiSGludFJlcXVlc3RGZWVkYmFja1NlbGVjdG9yIiwiaGludFJlcXVlc3RGZWVkYmFja0NsZWFyZWQiLCJ2aXNpYmxlIiwiSGludFJlcXVlc3RGZWVkYmFjayIsImhhbmRsZURpc21pc3MiLCJyZXF1ZXN0SGludCIsImhpbnRzU2FnYSIsImNoYW5uZWwiLCJvblJlc2l6ZSIsImhlaWdodCIsImNsaWVudEhlaWdodCIsImFkZEV2ZW50TGlzdGVuZXIiLCJyZW1vdmVFdmVudExpc3RlbmVyIiwic2xpZGluZyIsImxhc3RIZWlnaHQiLCJjbG9zZSIsImNpcGhlcmVkVGV4dCIsImNlbGxXaWR0aCIsImNlbGxIZWlnaHQiLCJzY3JvbGxUb3AiLCJuYkNlbGxzIiwiY2lwaGVyVGV4dCIsImNpcGhlcmVkVGV4dFJlc2l6ZWRSZWR1Y2VyIiwid2lkdGgiLCJjaXBoZXJlZFRleHRTY3JvbGxlZFJlZHVjZXIiLCJDaXBoZXJUZXh0Vmlld1NlbGVjdG9yIiwiY2lwaGVyZWRUZXh0UmVzaXplZCIsImNpcGhlcmVkVGV4dFNjcm9sbGVkIiwiYm90dG9tIiwicGFnZVJvd3MiLCJwYWdlQ29sdW1ucyIsInZpc2libGVSb3dzIiwicm93cyIsIkNpcGhlclRleHRWaWV3IiwiZWxlbWVudCIsIl90ZXh0Qm94IiwiY2xpZW50V2lkdGgiLCJyZWZUZXh0Qm94Iiwib25TY3JvbGwiLCJwb3NpdGlvbiIsIm92ZXJmbG93WSIsImluZGV4IiwiY29sdW1ucyIsInRvcCIsImNlbGwiLCJsZWZ0IiwiQ2lwaGVyZWRUZXh0IiwiZnJlcXVlbmN5QW5hbHlzaXMiLCJmcmVxdWVuY3lBbmFseXNpc0xhdGVSZWR1Y2VyIiwicmVmZXJlbmNlRnJlcXVlbmNpZXMiLCJmcmVxdWVuY2llcyIsInRleHRGcmVxdWVuY2llcyIsImZyZXFNYXAiLCJzcGxpdCIsImMiLCJjb3VudFN5bWJvbHMiLCJub3JtYWxpemVBbmRTb3J0RnJlcXVlbmNpZXMiLCJ0ZXh0Iiwic3RhcnRQb3MiLCJlbmRQb3MiLCJwb3MiLCJjb3VudFN5bWJvbCIsImNoYXIiLCJjb3VudCIsInN1bUZyZXF1ZW5jaWVzIiwiZHN0IiwiZnJvbSIsInRvdGFsQ291bnQiLCJyZWR1Y2UiLCJhIiwieCIsInNvcnQiLCJzMSIsInMyIiwicDEiLCJwMiIsInN5bWJvbCIsInByb2JhIiwiRnJlcXVlbmN5QW5hbHlzaXNTZWxlY3RvciIsInNjYWxlIiwiYWxwaGFiZXRTaXplIiwiRnJlcXVlbmN5QW5hbHlzaXNWaWV3IiwiZmxvYXQiLCJsaW5lSGVpZ2h0IiwiVGV4dEZyZXF1ZW5jeUJveCIsImRpc3BsYXkiLCJ2ZXJ0aWNhbEFsaWduIiwibWluIiwicm91bmQiLCJtYXJnaW5MZWZ0IiwiYmFja2dyb3VuZCIsImJvcmRlciIsIm1hcmdpbkJvdHRvbSIsInRleHRBbGlnbiIsIlJlZmVyZW5jZUZyZXF1ZW5jeUJveCIsIkZyZXF1ZW5jeUFuYWx5c2lzIiwic2NoZWR1bGluZ1NhZ2EiLCJzY2hlZHVsaW5nIiwic3BlZWQiLCJzaGlmdHMiLCJzdGFydFBvc2l0aW9uIiwiZW5kUG9zaXRpb24iLCJjdXJyZW50VHJhY2UiLCJzY2hlZHVsaW5nU3RhdHVzQ2hhbmdlZFJlZHVjZXIiLCJjaGFuZ2VzIiwic2NoZWR1bGluZ1N0ZXBCYWNrd2FyZFJlZHVjZXIiLCJzY2hlZHVsaW5nU3RlcEZvcndhcmRSZWR1Y2VyIiwic2NoZWR1bGluZ0p1bXBSZWR1Y2VyIiwic2NoZWR1bGluZ1RpY2tSZWR1Y2VyIiwic2NoZWR1bGluZ0xhdGVSZWR1Y2VyIiwicmFuayIsInRyYWNlIiwic2NoZWR1bGluZ1RpY2siLCJuYW1lIiwic3RhdHVzQ2hhbmdpbmdBY3Rpb25zIiwiU2NoZWR1bGluZ0NvbnRyb2xzU2VsZWN0b3IiLCJzY2hlZHVsaW5nU3RhdHVzQ2hhbmdlZCIsInNjaGVkdWxpbmdTdGVwQmFja3dhcmQiLCJzY2hlZHVsaW5nU3RlcEZvcndhcmQiLCJTY2hlZHVsaW5nQ29udHJvbHNWaWV3IiwiX2V2ZW50IiwibWFyZ2luIiwib25GYXN0QmFja3dhcmRDbGlja2VkIiwib25TdGVwQmFja3dhcmRDbGlja2VkIiwib25QbGF5Q2xpY2tlZCIsIm9uU3RlcEZvcndhcmRDbGlja2VkIiwib25GYXN0Rm9yd2FyZENsaWNrZWQiLCJzY2hlZHVsaW5nSnVtcCIsIlNjaGVkdWxpbmdDb250cm9scyIsImVkaXRpbmciLCJyb3RvckNlbGxFZGl0U3RhcnRlZFJlZHVjZXIiLCJyb3RvckluZGV4IiwiY2VsbFJhbmsiLCJyb3RvckNlbGxFZGl0TW92ZWRSZWR1Y2VyIiwicm90b3JNb3ZlIiwiY2VsbE1vdmUiLCJyb3RvclN0b3AiLCJjZWxsU3RvcCIsImhpbnQiLCJsb2NrZWQiLCJyb3RvckNlbGxFZGl0Q2FuY2VsbGVkUmVkdWNlciIsInJvdG9yQ2VsbENoYXJDaGFuZ2VkUmVkdWNlciIsInJvdG9yQ2VsbExvY2tDaGFuZ2VkUmVkdWNlciIsImlzTG9ja2VkIiwicm90b3JLZXlMb2FkZWRSZWR1Y2VyIiwiUm90b3JTZWxlY3RvciIsInJvdG9yQ2VsbExvY2tDaGFuZ2VkIiwicm90b3JDZWxsQ2hhckNoYW5nZWQiLCJyb3RvckNlbGxFZGl0Q2FuY2VsbGVkIiwicm90b3JDZWxsRWRpdFN0YXJ0ZWQiLCJyb3RvckNlbGxFZGl0TW92ZWQiLCJlZGl0YWJsZVJvdyIsInNoaWZ0IiwiYWN0aXZlUmFuayIsImVkaXRpbmdSYW5rIiwiUm90b3JWaWV3IiwidG9VcHBlckNhc2UiLCJjb25mbGljdCIsImlzQWN0aXZlIiwiaXNFZGl0aW5nIiwiaXNMYXN0Iiwic2hpZnRlZEluZGV4Iiwicm90YXRpbmciLCJvbkNoYW5nZUNoYXIiLCJvbkNoYW5nZUxvY2tlZCIsIm9uRWRpdGluZ1N0YXJ0ZWQiLCJvbkVkaXRpbmdDYW5jZWxsZWQiLCJlZGl0aW5nTW92ZWQiLCJSb3RvckNlbGwiLCJldmVudCIsImhhbmRsZWQiLCJvbkVkaXRpbmdNb3ZlZCIsInByZXZlbnREZWZhdWx0Iiwic3RvcFByb3BhZ2F0aW9uIiwidmFsdWUiLCJfaW5wdXQiLCJzdWJzdHIiLCJzdGF0aWNDaGFyIiwiZWRpdGFibGVDaGFyIiwiaXNIaW50IiwiaXNDb25mbGljdCIsImNvbHVtblN0eWxlIiwic3RhdGljQ2VsbFN0eWxlIiwiYm9yZGVyUmlnaHRXaWR0aCIsImVkaXRhYmxlQ2VsbFN0eWxlIiwiY3Vyc29yIiwiYmFja2dyb3VuZENvbG9yIiwiYm90dG9tQ2VsbFN0eWxlIiwibWFyZ2luVG9wIiwiYm9yZGVyVG9wV2lkdGgiLCJzdGF0aWNDZWxsIiwiZWRpdGFibGVDZWxsIiwic3RhcnRFZGl0aW5nIiwicmVmSW5wdXQiLCJjZWxsQ2hhbmdlZCIsImtleURvd24iLCJsb2NrIiwibG9ja0NsaWNrZWQiLCJzZWxlY3QiLCJmb2N1cyIsInJvdG9yS2V5TG9hZGVkIiwiUm90b3IiLCJkZWNpcGhlcmVkVGV4dCIsImRlY2lwaGVyZWRUZXh0UmVzaXplZFJlZHVjZXIiLCJkZWNpcGhlcmVkVGV4dFNjcm9sbGVkUmVkdWNlciIsImRlY2lwaGVyZWRUZXh0TGF0ZVJlZHVjZXIiLCJnZXRDZWxsIiwiY2lwaGVyZWQiLCJjdXJyZW50IiwiY2xlYXIiLCJEZWNpcGhlcmVkVGV4dFZpZXdTZWxlY3RvciIsImRlY2lwaGVyZWRUZXh0UmVzaXplZCIsImRlY2lwaGVyZWRUZXh0U2Nyb2xsZWQiLCJEZWNpcGhlcmVkVGV4dFZpZXciLCJvbkp1bXAiLCJUZXh0Q2VsbCIsImNvbHVtbiIsImNlbGxTdHlsZSIsImJvcmRlcldpZHRoIiwiX2p1bXAiLCJib3JkZXJCb3R0b20iLCJEZWNpcGhlcmVkVGV4dCIsIldvcmtzcGFjZVNlbGVjdG9yIiwiU2VsZWN0ZWRUZXh0IiwiZWRpdGluZ0NlbGwiLCJuYlJvdG9ycyIsInBhZGRpbmciLCJib3JkZXJSYWRpdXMiLCJtYXJnaW5SaWdodCIsImJpc2VjdCIsImxvIiwiaGkiLCJtaWQiLCJjaGFuZ2VTZWxlY3Rpb24iLCJ2YWx1ZXMiLCJzZWxlY3RlZCIsIiRzcGxpY2UiLCJzb3J0ZWRBcnJheUhhc0VsZW1lbnQiLCJ1cGRhdGVHcmlkR2VvbWV0cnkiLCJncmlkIiwic2Nyb2xsQmFyV2lkdGgiLCJmbG9vciIsImNlaWwiLCJtYXhUb3AiLCJ1cGRhdGVHcmlkVmlzaWJsZVJvd3MiLCJzZWxlY3RlZFJvd3MiLCJmaXJzdFJvdyIsImxhc3RSb3ciLCJfaW5kZXgiLCJyb3dJbmRleCIsInJvd1N0YXJ0UG9zIiwicm93Q2VsbHMiLCJjb2xJbmRleCIsInVwZGF0ZUdyaWRWaXNpYmxlQ29sdW1ucyIsInNlbGVjdGVkQ29sdW1ucyIsImNvbENlbGxzIiwidXBkYXRlR3JpZFZpc2libGVBcmVhIiwibWFrZVJvdG9yIiwic2NoZWR1bGUiLCJzaXplIiwibnVsbFBlcm0iLCJmaWxsIiwiZm9yd2FyZCIsImJhY2t3YXJkIiwiZHVtcFJvdG9ycyIsImxvYWRSb3RvcnMiLCJyb3RvckR1bXBzIiwiJGNlbGxzIiwiZm9yRWFjaCIsImNlbGxJbmRleCIsImoiLCJtYXJrUm90b3JDb25mbGljdHMiLCJ1cGRhdGVQZXJtcyIsImVkaXRSb3RvckNlbGwiLCJsb2NrUm90b3JDZWxsIiwiY291bnRzIiwiaGFzIiwicmFua3MiLCJ1cGRhdGVSb3RvcldpdGhLZXkiLCJzb3VyY2UiLCJnZXRSb3RvclNoaWZ0IiwiYXBwbHlSb3RvcnMiLCJsb2NrcyIsImFwcGx5Um90b3IiLCJhcHBseVNoaWZ0IiwiY29sbGlzaW9uIiwibW9kIiwiYW1vdW50Iiwid3JhcEFyb3VuZCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQ0E7O0FBQ0E7O0FBRUE7O0FBQ0E7O0FBQ0E7O0FBRUE7O0FBQ0E7O0FBQ0E7O0FBQ0E7O0FBQ0E7O0FBQ0E7O0FBQ0E7O0FBRUEsSUFBTUEsVUFBVSxHQUFHO0FBQ2ZDLGdCQUFjLEVBQUU7QUFDWkMsV0FBTyxFQUFFQyxj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QUFJLEtBQUssQ0FBQyxDQUFkLEVBQWlCO0FBQ2YsUUFBSWlMLE1BQU0sR0FBRyxDQUFiLEVBQWdCO0FBQ2RBLFlBQU0sSUFBSUQsR0FBVjtBQUNEOztBQUNEaEwsUUFBSSxHQUFHLENBQUNBLElBQUksR0FBR2lMLE1BQVIsSUFBa0JELEdBQXpCO0FBQ0Q7O0FBQ0QsU0FBT2hMLElBQVA7QUFDRDs7QUFFTSxTQUFTa0wsVUFBVCxDQUFxQmxILEtBQXJCLEVBQTRCZ0gsR0FBNUIsRUFBaUM7QUFDdEMsU0FBTyxDQUFFaEgsS0FBSyxHQUFHZ0gsR0FBVCxHQUFnQkEsR0FBakIsSUFBd0JBLEdBQS9CO0FBQ0QsQyIsImZpbGUiOiJidW5kbGUuanMiLCJzb3VyY2VzQ29udGVudCI6WyJcbmltcG9ydCB1cGRhdGUgZnJvbSAnaW1tdXRhYmlsaXR5LWhlbHBlcic7XG5pbXBvcnQgYWxnb3JlYVJlYWN0VGFzayBmcm9tICcuL2FsZ29yZWFfcmVhY3RfdGFzayc7XG5cbmltcG9ydCAnZm9udC1hd2Vzb21lL2Nzcy9mb250LWF3ZXNvbWUuY3NzJztcbmltcG9ydCAnYm9vdHN0cmFwL2Rpc3QvY3NzL2Jvb3RzdHJhcC5jc3MnO1xuaW1wb3J0ICcuL3N0eWxlLmNzcyc7XG5cbmltcG9ydCBDaXBoZXJlZFRleHRCdW5kbGUgZnJvbSAnLi9jaXBoZXJlZF90ZXh0X2J1bmRsZSc7XG5pbXBvcnQgRnJlcXVlbmN5QW5hbHlzaXNCdW5kbGUgZnJvbSAnLi9mcmVxdWVuY3lfYW5hbHlzaXNfYnVuZGxlJztcbmltcG9ydCBTY2hlZHVsaW5nQnVuZGxlIGZyb20gJy4vc2NoZWR1bGluZ19idW5kbGUnO1xuaW1wb3J0IFJvdG9yc0J1bmRsZSBmcm9tICcuL3JvdG9yc19idW5kbGUnO1xuaW1wb3J0IERlY2lwaGVyZWRUZXh0QnVuZGxlIGZyb20gJy4vZGVjaXBoZXJlZF90ZXh0X2J1bmRsZSc7XG5pbXBvcnQgV29ya3NwYWNlQnVuZGxlIGZyb20gJy4vd29ya3NwYWNlX2J1bmRsZSc7XG5pbXBvcnQge2R1bXBSb3RvcnMsIGxvYWRSb3RvcnN9IGZyb20gJy4vdXRpbHMnO1xuXG5jb25zdCBUYXNrQnVuZGxlID0ge1xuICAgIGFjdGlvblJlZHVjZXJzOiB7XG4gICAgICAgIGFwcEluaXQ6IGFwcEluaXRSZWR1Y2VyLFxuICAgICAgICB0YXNrSW5pdDogdGFza0luaXRSZWR1Y2VyIC8qIHBvc3NpYmx5IG1vdmUgdG8gYWxnb3JlYS1yZWFjdC10YXNrICovLFxuICAgICAgICB0YXNrUmVmcmVzaDogdGFza1JlZnJlc2hSZWR1Y2VyIC8qIHBvc3NpYmx5IG1vdmUgdG8gYWxnb3JlYS1yZWFjdC10YXNrICovLFxuICAgICAgICB0YXNrQW5zd2VyTG9hZGVkOiB0YXNrQW5zd2VyTG9hZGVkLFxuICAgICAgICB0YXNrU3RhdGVMb2FkZWQ6IHRhc2tTdGF0ZUxvYWRlZCxcbiAgICB9LFxuICAgIGluY2x1ZGVzOiBbXG4gICAgICAgIENpcGhlcmVkVGV4dEJ1bmRsZSxcbiAgICAgICAgRnJlcXVlbmN5QW5hbHlzaXNCdW5kbGUsXG4gICAgICAgIFNjaGVkdWxpbmdCdW5kbGUsXG4gICAgICAgIFJvdG9yc0J1bmRsZSxcbiAgICAgICAgRGVjaXBoZXJlZFRleHRCdW5kbGUsXG4gICAgICAgIFdvcmtzcGFjZUJ1bmRsZSxcbiAgICBdLFxuICAgIHNlbGVjdG9yczoge1xuICAgICAgZ2V0VGFza1N0YXRlLFxuICAgICAgZ2V0VGFza0Fuc3dlcixcbiAgICB9XG59O1xuXG5pZiAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgPT09ICdkZXZlbG9wbWVudCcpIHtcbiAgICAvKiBlc2xpbnQtZGlzYWJsZSBuby1jb25zb2xlICovXG4gICAgVGFza0J1bmRsZS5lYXJseVJlZHVjZXIgPSBmdW5jdGlvbiAoc3RhdGUsIGFjdGlvbikge1xuICAgICAgICBjb25zb2xlLmxvZygnQUNUSU9OJywgYWN0aW9uLnR5cGUsIGFjdGlvbik7XG4gICAgICAgIHJldHVybiBzdGF0ZTtcbiAgICB9O1xufVxuXG5mdW5jdGlvbiBhcHBJbml0UmVkdWNlciAoc3RhdGUsIF9hY3Rpb24pIHtcbiAgICBjb25zdCB0YXNrTWV0YURhdGEgPSB7XG4gICAgICAgXCJpZFwiOiBcImh0dHA6Ly9jb25jb3Vycy1hbGtpbmRpLmZyL3Rhc2tzLzIwMTgvZW5pZ21hXCIsXG4gICAgICAgXCJsYW5ndWFnZVwiOiBcImZyXCIsXG4gICAgICAgXCJ2ZXJzaW9uXCI6IFwiZnIuMDFcIixcbiAgICAgICBcImF1dGhvcnNcIjogXCJTw6liYXN0aWVuIENhcmxpZXJcIixcbiAgICAgICBcInRyYW5zbGF0b3JzXCI6IFtdLFxuICAgICAgIFwibGljZW5zZVwiOiBcIlwiLFxuICAgICAgIFwidGFza1BhdGhQcmVmaXhcIjogXCJcIixcbiAgICAgICBcIm1vZHVsZXNQYXRoUHJlZml4XCI6IFwiXCIsXG4gICAgICAgXCJicm93c2VyU3VwcG9ydFwiOiBbXSxcbiAgICAgICBcImZ1bGxGZWVkYmFja1wiOiB0cnVlLFxuICAgICAgIFwiYWNjZXB0ZWRBbnN3ZXJzXCI6IFtdLFxuICAgICAgIFwidXNlc1JhbmRvbVNlZWRcIjogdHJ1ZVxuICAgIH07XG4gICAgcmV0dXJuIHsuLi5zdGF0ZSwgdGFza01ldGFEYXRhfTtcbn1cblxuZnVuY3Rpb24gdGFza0luaXRSZWR1Y2VyIChzdGF0ZSwgX2FjdGlvbikge1xuICBjb25zdCB7dGFza0RhdGE6IHthbHBoYWJldCwgcm90b3JzOiByb3RvclNwZWNzLCBoaW50c319ID0gc3RhdGU7XG4gIGNvbnN0IHJvdG9ycyA9IGxvYWRSb3RvcnMoYWxwaGFiZXQsIHJvdG9yU3BlY3MsIGhpbnRzLCByb3RvclNwZWNzLm1hcChfID0+IFtdKSk7XG4gIHJldHVybiB7Li4uc3RhdGUsIHJvdG9ycywgdGFza1JlYWR5OiB0cnVlfTtcbn1cblxuZnVuY3Rpb24gdGFza1JlZnJlc2hSZWR1Y2VyIChzdGF0ZSwgX2FjdGlvbikge1xuICBjb25zdCB7dGFza0RhdGE6IHthbHBoYWJldCwgcm90b3JzOiByb3RvclNwZWNzLCBoaW50c319ID0gc3RhdGU7XG4gIGNvbnN0IGR1bXAgPSBkdW1wUm90b3JzKGFscGhhYmV0LCBzdGF0ZS5yb3RvcnMpO1xuICBjb25zdCByb3RvcnMgPSBsb2FkUm90b3JzKGFscGhhYmV0LCByb3RvclNwZWNzLCBoaW50cywgZHVtcCk7XG4gIHJldHVybiB7Li4uc3RhdGUsIHJvdG9yc307XG59XG5cbmZ1bmN0aW9uIGdldFRhc2tBbnN3ZXIgKHN0YXRlKSB7XG4gIGNvbnN0IHt0YXNrRGF0YToge2FscGhhYmV0fX0gPSBzdGF0ZTtcbiAgcmV0dXJuIHtcbiAgICByb3RvcnM6IHN0YXRlLnJvdG9ycy5tYXAocm90b3IgPT4gcm90b3IuY2VsbHMubWFwKCh7ZWRpdGFibGV9KSA9PiBhbHBoYWJldC5pbmRleE9mKGVkaXRhYmxlKSkpXG4gIH07XG59XG5cbmZ1bmN0aW9uIHRhc2tBbnN3ZXJMb2FkZWQgKHN0YXRlLCB7cGF5bG9hZDoge2Fuc3dlcn19KSB7XG4gIGNvbnN0IHt0YXNrRGF0YToge2FscGhhYmV0LCByb3RvcnM6IHJvdG9yU3BlY3MsIGhpbnRzfX0gPSBzdGF0ZTtcbiAgY29uc3Qgcm90b3JzID0gbG9hZFJvdG9ycyhhbHBoYWJldCwgcm90b3JTcGVjcywgaGludHMsIGFuc3dlci5yb3RvcnMpO1xuICByZXR1cm4gdXBkYXRlKHN0YXRlLCB7cm90b3JzOiB7JHNldDogcm90b3JzfX0pO1xufVxuXG5mdW5jdGlvbiBnZXRUYXNrU3RhdGUgKHN0YXRlKSB7Y29uc29sZS5sb2coc3RhdGUpO1xuICBjb25zdCB7dGFza0RhdGE6IHthbHBoYWJldH19ID0gc3RhdGU7XG4gIHJldHVybiB7cm90b3JzOiBkdW1wUm90b3JzKGFscGhhYmV0LCBzdGF0ZS5yb3RvcnMpfTtcbn1cblxuZnVuY3Rpb24gdGFza1N0YXRlTG9hZGVkIChzdGF0ZSwge3BheWxvYWQ6IHtkdW1wfX0pIHtcbiAgY29uc3Qge3Rhc2tEYXRhOiB7YWxwaGFiZXQsIHJvdG9yczogcm90b3JTcGVjcywgaGludHN9fSA9IHN0YXRlO1xuICBjb25zdCByb3RvcnMgPSBsb2FkUm90b3JzKGFscGhhYmV0LCByb3RvclNwZWNzLCBoaW50cywgZHVtcC5yb3RvcnMpO1xuICByZXR1cm4gdXBkYXRlKHN0YXRlLCB7cm90b3JzOiB7JHNldDogcm90b3JzfX0pO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gcnVuIChjb250YWluZXIsIG9wdGlvbnMpIHtcbiAgICByZXR1cm4gYWxnb3JlYVJlYWN0VGFzayhjb250YWluZXIsIG9wdGlvbnMsIFRhc2tCdW5kbGUpO1xufVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL2luZGV4LmpzIiwiLypcbkNoYW5nZSBtZXRob2Qgb2YgdXNlOlxuLSBleHBvcnQgYSBidW5kbGUgdGhhdCB0aGUgdGFzayBjYW4gaW5jbHVkZTtcbi0gZXhwb3J0IGEgZnVuY3Rpb24oc2FnYT8pIHRoYXQgKGNyZWF0ZXMgdGhlIEFQSSBvYmplY3RzIGFuZCApIGRpc3BhdGNoZXMgdGhlXG4gIGFwcEluaXQgYWN0aW9uO1xuXG4qL1xuXG4vL2ltcG9ydCAnLi9zaGltJ1xuaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCBSZWFjdERPTSBmcm9tICdyZWFjdC1kb20nO1xuaW1wb3J0IHtQcm92aWRlcn0gZnJvbSAncmVhY3QtcmVkdXgnO1xuaW1wb3J0IHF1ZXJ5U3RyaW5nIGZyb20gJ3F1ZXJ5LXN0cmluZyc7XG5pbXBvcnQge2NyZWF0ZVN0b3JlLCBhcHBseU1pZGRsZXdhcmV9IGZyb20gJ3JlZHV4JztcbmltcG9ydCB7ZGVmYXVsdCBhcyBjcmVhdGVTYWdhTWlkZGxld2FyZX0gZnJvbSAncmVkdXgtc2FnYSc7XG5pbXBvcnQge2NhbGx9IGZyb20gJ3JlZHV4LXNhZ2EvZWZmZWN0cyc7XG5cbmltcG9ydCBsaW5rIGZyb20gJy4vbGlua2VyJztcbmltcG9ydCAnLi91aS9zdHlsZXMuY3NzJztcblxuaW1wb3J0IEFwcEJ1bmRsZSBmcm9tICcuL2FwcF9idW5kbGUnO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiAoY29udGFpbmVyLCBvcHRpb25zLCBUYXNrQnVuZGxlKSB7XG4gICAgY29uc3QgcGxhdGZvcm0gPSB3aW5kb3cucGxhdGZvcm07XG4gICAgaWYgKHByb2Nlc3MuZW52Lk5PREVfRU5WID09PSAnZGV2ZWxvcG1lbnQnKSBwbGF0Zm9ybS5kZWJ1ZyA9IHRydWU7XG5cbiAgICBjb25zdCB7YWN0aW9ucywgdmlld3MsIHNlbGVjdG9ycywgcmVkdWNlciwgcm9vdFNhZ2F9ID0gbGluayh7aW5jbHVkZXM6IFtBcHBCdW5kbGUsIFRhc2tCdW5kbGVdfSk7XG5cbiAgICAvKiBCdWlsZCB0aGUgc3RvcmUuICovXG4gICAgY29uc3Qgc2FmZVJlZHVjZXIgPSBmdW5jdGlvbiAoc3RhdGUsIGFjdGlvbikge1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgcmV0dXJuIHJlZHVjZXIoc3RhdGUsIGFjdGlvbik7XG4gICAgICAgIH0gY2F0Y2ggKGV4KSB7XG4gICAgICAgICAgICBjb25zb2xlLmVycm9yKCdhY3Rpb24gZmFpbGVkIHRvIHJlZHVjZScsIGFjdGlvbiwgZXgpO1xuICAgICAgICAgICAgcmV0dXJuIHsuLi5zdGF0ZSwgZXJyb3JzOiBbZXhdfTtcbiAgICAgICAgfVxuICAgIH07XG4gICAgY29uc3Qgc2FnYU1pZGRsZXdhcmUgPSBjcmVhdGVTYWdhTWlkZGxld2FyZSgpO1xuICAgIGNvbnN0IGVuaGFuY2VyID0gYXBwbHlNaWRkbGV3YXJlKHNhZ2FNaWRkbGV3YXJlKTtcbiAgICBjb25zdCBzdG9yZSA9IGNyZWF0ZVN0b3JlKHNhZmVSZWR1Y2VyLCB7YWN0aW9ucywgdmlld3MsIHNlbGVjdG9yc30sIGVuaGFuY2VyKTtcblxuICAgIC8qIFN0YXJ0IHRoZSBzYWdhcy4gKi9cbiAgICBmdW5jdGlvbiBzdGFydCAoKSB7XG4gICAgICAgIHNhZ2FNaWRkbGV3YXJlLnJ1bihmdW5jdGlvbiogKCkge1xuICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICB5aWVsZCBjYWxsKHJvb3RTYWdhKTtcbiAgICAgICAgICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICAgICAgICAgICAgY29uc29sZS5lcnJvcignc2FnYXMgY3Jhc2hlZCcsIGVycm9yKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfVxuICAgIHN0YXJ0KCk7XG5cbiAgICAvKiBEaXNwYXRjaCB0aGUgYXBwSW5pdCBhY3Rpb24uICovXG4gICAgY29uc3QgcXVlcnkgPSBxdWVyeVN0cmluZy5wYXJzZShsb2NhdGlvbi5zZWFyY2gpO1xuICAgIGNvbnN0IHRhc2tUb2tlbiA9IHF1ZXJ5LnNUb2tlbjtcbiAgICBzdG9yZS5kaXNwYXRjaCh7dHlwZTogYWN0aW9ucy5hcHBJbml0LCBwYXlsb2FkOiB7b3B0aW9ucywgdGFza1Rva2VuLCBwbGF0Zm9ybX19KTtcblxuICAgIC8qIFN0YXJ0IHJlbmRlcmluZy4gKi9cbiAgICBSZWFjdERPTS5yZW5kZXIoPFByb3ZpZGVyIHN0b3JlPXtzdG9yZX0+PHZpZXdzLkFwcC8+PC9Qcm92aWRlcj4sIGNvbnRhaW5lcik7XG5cbiAgICByZXR1cm4ge2FjdGlvbnMsIHZpZXdzLCBzdG9yZSwgc3RhcnR9O1xufVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL2FsZ29yZWFfcmVhY3RfdGFzay9pbmRleC5qcyIsIi8qIENvcHlyaWdodCAoQykgMjAxNyBlcGl4b2RlIC0gQWxsIFJpZ2h0cyBSZXNlcnZlZFxuICogWW91IG1heSB1c2UsIGRpc3RyaWJ1dGUgYW5kIG1vZGlmeSB0aGlzIGNvZGUgdW5kZXIgdGhlXG4gKiB0ZXJtcyBvZiB0aGUgTUlUIGxpY2Vuc2UuXG4gKi9cblxuaW1wb3J0IHthbGwsIGNhbGx9IGZyb20gJ3JlZHV4LXNhZ2EvZWZmZWN0cyc7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGxpbmsgKHJvb3RCdW5kbGUsIGZlYXR1cmVzKSB7XG4gIGZlYXR1cmVzID0gZmVhdHVyZXMgfHwgW0FjdGlvbnMsIFZpZXdzLCBTZWxlY3RvcnMsIEVhcmx5UmVkdWNlcnMsIFJlZHVjZXJzLCBBY3Rpb25SZWR1Y2VycywgTGF0ZVJlZHVjZXJzLCBTYWdhc107XG4gIGNvbnN0IGFwcCA9IHt9O1xuICBmb3IgKGxldCBmZWF0dXJlIG9mIGZlYXR1cmVzKSB7XG4gICAgZmVhdHVyZS5wcmVwYXJlKGFwcCk7XG4gIH1cbiAgbGlua0J1bmRsZShyb290QnVuZGxlLCBmZWF0dXJlcywgYXBwKTtcbiAgZm9yIChsZXQgZmVhdHVyZSBvZiBmZWF0dXJlcykge1xuICAgIGZlYXR1cmUuZmluYWxpemUoYXBwKTtcbiAgfVxuICByZXR1cm4gYXBwO1xufVxuXG5mdW5jdGlvbiBsaW5rQnVuZGxlIChidW5kbGUsIGZlYXR1cmVzLCBhcHApIHtcbiAgZm9yIChsZXQgZmVhdHVyZSBvZiBmZWF0dXJlcykge1xuICAgIGZlYXR1cmUuYWRkKGFwcCwgYnVuZGxlKTtcbiAgfVxuICBpZiAoYnVuZGxlLmluY2x1ZGVzKSB7XG4gICAgZm9yIChsZXQgc3ViQnVuZGxlIG9mIGJ1bmRsZS5pbmNsdWRlcykge1xuICAgICAgbGlua0J1bmRsZShzdWJCdW5kbGUsIGZlYXR1cmVzLCBhcHApO1xuICAgIH1cbiAgfVxufVxuXG5jb25zdCBBY3Rpb25zID0ge1xuICBwcmVwYXJlOiBmdW5jdGlvbiAoYXBwKSB7XG4gICAgYXBwLmFjdGlvbnMgPSB7fTtcbiAgfSxcbiAgYWRkOiBmdW5jdGlvbiAoYXBwLCB7YWN0aW9uc30pIHtcbiAgICBpZiAoYWN0aW9ucykge1xuICAgICAgT2JqZWN0LmFzc2lnbihhcHAuYWN0aW9ucywgYWN0aW9ucyk7XG4gICAgfVxuICB9LFxuICBmaW5hbGl6ZTogZnVuY3Rpb24gKF9hcHApIHtcbiAgfVxufTtcblxuY29uc3QgVmlld3MgPSB7XG4gIHByZXBhcmU6IGZ1bmN0aW9uIChhcHApIHtcbiAgICBhcHAudmlld3MgPSB7fTtcbiAgfSxcbiAgYWRkOiBmdW5jdGlvbiAoYXBwLCB7dmlld3N9KSB7XG4gICAgaWYgKHZpZXdzKSB7XG4gICAgICBPYmplY3QuYXNzaWduKGFwcC52aWV3cywgdmlld3MpO1xuICAgIH1cbiAgfSxcbiAgZmluYWxpemU6IGZ1bmN0aW9uIChfYXBwKSB7XG4gIH1cbn07XG5cbmNvbnN0IFJlZHVjZXJzID0ge1xuICBwcmVwYXJlOiBmdW5jdGlvbiAoYXBwKSB7XG4gICAgYXBwLnJlZHVjZXIgPSB1bmRlZmluZWQ7XG4gIH0sXG4gIGFkZDogZnVuY3Rpb24gKGFwcCwge3JlZHVjZXIsIHJlZHVjZXJzfSkge1xuICAgIGlmIChyZWR1Y2VyKSB7XG4gICAgICBhcHAucmVkdWNlciA9IHNlcXVlbmNlUmVkdWNlcnMoYXBwLnJlZHVjZXIsIHJlZHVjZXIpO1xuICAgIH1cbiAgICBpZiAocmVkdWNlcnMpIHtcbiAgICAgIGFwcC5yZWR1Y2VyID0gc2VxdWVuY2VSZWR1Y2VycyhhcHAucmVkdWNlciwgLi4ucmVkdWNlcnMpO1xuICAgIH1cbiAgfSxcbiAgZmluYWxpemU6IGZ1bmN0aW9uIChfYXBwKSB7XG4gIH1cbn07XG5cbmNvbnN0IEVhcmx5UmVkdWNlcnMgPSB7XG4gIHByZXBhcmU6IGZ1bmN0aW9uIChhcHApIHtcbiAgICBhcHAuZWFybHlSZWR1Y2VyID0gdW5kZWZpbmVkO1xuICB9LFxuICBhZGQ6IGZ1bmN0aW9uIChhcHAsIHtlYXJseVJlZHVjZXJ9KSB7XG4gICAgYXBwLmVhcmx5UmVkdWNlciA9IHNlcXVlbmNlUmVkdWNlcnMoYXBwLmVhcmx5UmVkdWNlciwgZWFybHlSZWR1Y2VyKTtcbiAgfSxcbiAgZmluYWxpemU6IGZ1bmN0aW9uIChhcHApIHtcbiAgICBhcHAucmVkdWNlciA9IHNlcXVlbmNlUmVkdWNlcnMoYXBwLmVhcmx5UmVkdWNlciwgYXBwLnJlZHVjZXIpO1xuICAgIGRlbGV0ZSBhcHAuZWFybHlSZWR1Y2VyO1xuICB9XG59O1xuXG5jb25zdCBMYXRlUmVkdWNlcnMgPSB7XG4gIHByZXBhcmU6IGZ1bmN0aW9uIChhcHApIHtcbiAgICBhcHAubGF0ZVJlZHVjZXIgPSB1bmRlZmluZWQ7XG4gIH0sXG4gIGFkZDogZnVuY3Rpb24gKGFwcCwge2xhdGVSZWR1Y2VyfSkge1xuICAgIGFwcC5sYXRlUmVkdWNlciA9IHNlcXVlbmNlUmVkdWNlcnMoYXBwLmxhdGVSZWR1Y2VyLCBsYXRlUmVkdWNlcik7XG4gIH0sXG4gIGZpbmFsaXplOiBmdW5jdGlvbiAoYXBwKSB7XG4gICAgYXBwLnJlZHVjZXIgPSBzZXF1ZW5jZVJlZHVjZXJzKGFwcC5yZWR1Y2VyLCBhcHAubGF0ZVJlZHVjZXIpO1xuICAgIGRlbGV0ZSBhcHAubGF0ZVJlZHVjZXI7XG4gIH1cbn07XG5cbmNvbnN0IEFjdGlvblJlZHVjZXJzID0ge1xuICBwcmVwYXJlOiBmdW5jdGlvbiAoYXBwKSB7XG4gICAgYXBwLmFjdGlvblJlZHVjZXJzID0gbmV3IE1hcCgpO1xuICB9LFxuICBhZGQ6IGZ1bmN0aW9uIChhcHAsIHthY3Rpb25SZWR1Y2Vyc30pIHtcbiAgICBpZiAoYWN0aW9uUmVkdWNlcnMpIHtcbiAgICAgIGZvciAobGV0IGtleSBvZiBPYmplY3Qua2V5cyhhY3Rpb25SZWR1Y2VycykpIHtcbiAgICAgICAgbGV0IHJlZHVjZXIgPSBhcHAuYWN0aW9uUmVkdWNlcnMuZ2V0KGtleSk7XG4gICAgICAgIHJlZHVjZXIgPSBzZXF1ZW5jZVJlZHVjZXJzKHJlZHVjZXIsIGFjdGlvblJlZHVjZXJzW2tleV0pO1xuICAgICAgICBhcHAuYWN0aW9uUmVkdWNlcnMuc2V0KGtleSwgcmVkdWNlcik7XG4gICAgICB9XG4gICAgfVxuICB9LFxuICBmaW5hbGl6ZTogZnVuY3Rpb24gKGFwcCkge1xuICAgIGNvbnN0IGFjdGlvblJlZHVjZXIgPSBtYWtlQWN0aW9uUmVkdWNlcihhcHApO1xuICAgIGFwcC5yZWR1Y2VyID0gc2VxdWVuY2VSZWR1Y2VycyhhcHAucmVkdWNlciwgYWN0aW9uUmVkdWNlcik7XG4gICAgZGVsZXRlIGFwcC5hY3Rpb25SZWR1Y2VycztcbiAgfVxufTtcblxuY29uc3QgU2FnYXMgPSB7XG4gIHByZXBhcmU6IGZ1bmN0aW9uIChhcHApIHtcbiAgICBhcHAuc2FnYXMgPSBbXTtcbiAgfSxcbiAgYWRkOiBmdW5jdGlvbiAoYXBwLCB7c2FnYSwgc2FnYXN9KSB7XG4gICAgaWYgKHNhZ2EpIHtcbiAgICAgIGFwcC5zYWdhcy5wdXNoKHNhZ2EpO1xuICAgIH1cbiAgICBpZiAoc2FnYXMpIHtcbiAgICAgIEFycmF5LnByb3RvdHlwZS5wdXNoLmFwcGx5KGFwcC5zYWdhcywgc2FnYXMpO1xuICAgIH1cbiAgfSxcbiAgZmluYWxpemU6IGZ1bmN0aW9uIChhcHApIHtcbiAgICBjb25zdCBlZmZlY3RzID0gYXBwLnNhZ2FzLm1hcChmdW5jdGlvbiAoc2FnYSkgeyByZXR1cm4gY2FsbChzYWdhKTsgfSk7XG4gICAgYXBwLnJvb3RTYWdhID0gZnVuY3Rpb24qICgpIHsgeWllbGQgYWxsKGVmZmVjdHMpOyB9O1xuICAgIGRlbGV0ZSBhcHAuc2FnYXM7XG4gIH1cbn07XG5cbmNvbnN0IFNlbGVjdG9ycyA9IHtcbiAgcHJlcGFyZTogZnVuY3Rpb24gKGFwcCkge1xuICAgIGFwcC5zZWxlY3RvcnMgPSB7fTtcbiAgfSxcbiAgYWRkOiBmdW5jdGlvbiAoYXBwLCB7c2VsZWN0b3JzfSkge1xuICAgIGlmIChzZWxlY3RvcnMpIHtcbiAgICAgIE9iamVjdC5hc3NpZ24oYXBwLnNlbGVjdG9ycywgc2VsZWN0b3JzKTtcbiAgICB9XG4gIH0sXG4gIGZpbmFsaXplOiBmdW5jdGlvbiAoX2FwcCkge1xuICB9XG59O1xuXG5mdW5jdGlvbiBtYWtlQWN0aW9uUmVkdWNlciAoe2FjdGlvbnMsIGFjdGlvblJlZHVjZXJzfSkge1xuICBjb25zdCBtYXAgPSBuZXcgTWFwKCk7XG4gIGZvciAobGV0IFtrZXksIHJlZHVjZXJdIG9mIGFjdGlvblJlZHVjZXJzLmVudHJpZXMoKSkge1xuICAgIG1hcC5zZXQoYWN0aW9uc1trZXldLCByZWR1Y2VyKTtcbiAgfVxuICByZXR1cm4gZnVuY3Rpb24gKHN0YXRlLCBhY3Rpb24pIHtcbiAgICBjb25zdCByZWR1Y2VyID0gbWFwLmdldChhY3Rpb24udHlwZSk7XG4gICAgcmV0dXJuIHR5cGVvZiByZWR1Y2VyID09PSAnZnVuY3Rpb24nID8gcmVkdWNlcihzdGF0ZSwgYWN0aW9uKSA6IHN0YXRlO1xuICB9O1xufVxuXG5mdW5jdGlvbiBzZXF1ZW5jZVJlZHVjZXJzICguLi5yZWR1Y2Vycykge1xuICBsZXQgcmVzdWx0ID0gdW5kZWZpbmVkO1xuICBmb3IgKHZhciBpID0gMDsgaSA8IHJlZHVjZXJzLmxlbmd0aDsgaSArPSAxKSB7XG4gICAgdmFyIHJlZHVjZXIgPSByZWR1Y2Vyc1tpXTtcbiAgICBpZiAoIXJlZHVjZXIpIHtcbiAgICAgIGNvbnRpbnVlO1xuICAgIH1cbiAgICBpZiAodHlwZW9mIHJlZHVjZXIgIT09ICdmdW5jdGlvbicpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcigncmVkdWNlciBtdXN0IGJlIGEgZnVuY3Rpb24nLCByZWR1Y2VyKTtcbiAgICB9XG4gICAgaWYgKCFyZXN1bHQpIHtcbiAgICAgIHJlc3VsdCA9IHJlZHVjZXI7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJlc3VsdCA9IGNvbXBvc2VSZWR1Y2VycyhyZXN1bHQsIHJlZHVjZXIpO1xuICAgIH1cbiAgfVxuICByZXR1cm4gcmVzdWx0O1xufVxuXG5mdW5jdGlvbiBjb21wb3NlUmVkdWNlcnMgKGZzdCwgc25kKSB7XG4gIHJldHVybiBmdW5jdGlvbiAoc3RhdGUsIGFjdGlvbikgeyByZXR1cm4gc25kKGZzdChzdGF0ZSwgYWN0aW9uKSwgYWN0aW9uKTsgfTtcbn1cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9hbGdvcmVhX3JlYWN0X3Rhc2svbGlua2VyLmpzIiwiLy8gc3R5bGUtbG9hZGVyOiBBZGRzIHNvbWUgY3NzIHRvIHRoZSBET00gYnkgYWRkaW5nIGEgPHN0eWxlPiB0YWdcblxuLy8gbG9hZCB0aGUgc3R5bGVzXG52YXIgY29udGVudCA9IHJlcXVpcmUoXCIhIS4uLy4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2luZGV4LmpzPz9yZWYtLTEtMSEuL3N0eWxlcy5jc3NcIik7XG5pZih0eXBlb2YgY29udGVudCA9PT0gJ3N0cmluZycpIGNvbnRlbnQgPSBbW21vZHVsZS5pZCwgY29udGVudCwgJyddXTtcbi8vIFByZXBhcmUgY3NzVHJhbnNmb3JtYXRpb25cbnZhciB0cmFuc2Zvcm07XG5cbnZhciBvcHRpb25zID0ge1wic291cmNlTWFwXCI6dHJ1ZSxcImhtclwiOnRydWV9XG5vcHRpb25zLnRyYW5zZm9ybSA9IHRyYW5zZm9ybVxuLy8gYWRkIHRoZSBzdHlsZXMgdG8gdGhlIERPTVxudmFyIHVwZGF0ZSA9IHJlcXVpcmUoXCIhLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9saWIvYWRkU3R5bGVzLmpzXCIpKGNvbnRlbnQsIG9wdGlvbnMpO1xuaWYoY29udGVudC5sb2NhbHMpIG1vZHVsZS5leHBvcnRzID0gY29udGVudC5sb2NhbHM7XG4vLyBIb3QgTW9kdWxlIFJlcGxhY2VtZW50XG5pZihtb2R1bGUuaG90KSB7XG5cdC8vIFdoZW4gdGhlIHN0eWxlcyBjaGFuZ2UsIHVwZGF0ZSB0aGUgPHN0eWxlPiB0YWdzXG5cdGlmKCFjb250ZW50LmxvY2Fscykge1xuXHRcdG1vZHVsZS5ob3QuYWNjZXB0KFwiISEuLi8uLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9pbmRleC5qcz8/cmVmLS0xLTEhLi9zdHlsZXMuY3NzXCIsIGZ1bmN0aW9uKCkge1xuXHRcdFx0dmFyIG5ld0NvbnRlbnQgPSByZXF1aXJlKFwiISEuLi8uLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9pbmRleC5qcz8/cmVmLS0xLTEhLi9zdHlsZXMuY3NzXCIpO1xuXHRcdFx0aWYodHlwZW9mIG5ld0NvbnRlbnQgPT09ICdzdHJpbmcnKSBuZXdDb250ZW50ID0gW1ttb2R1bGUuaWQsIG5ld0NvbnRlbnQsICcnXV07XG5cdFx0XHR1cGRhdGUobmV3Q29udGVudCk7XG5cdFx0fSk7XG5cdH1cblx0Ly8gV2hlbiB0aGUgbW9kdWxlIGlzIGRpc3Bvc2VkLCByZW1vdmUgdGhlIDxzdHlsZT4gdGFnc1xuXHRtb2R1bGUuaG90LmRpc3Bvc2UoZnVuY3Rpb24oKSB7IHVwZGF0ZSgpOyB9KTtcbn1cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL3NyYy9hbGdvcmVhX3JlYWN0X3Rhc2svdWkvc3R5bGVzLmNzc1xuLy8gbW9kdWxlIGlkID0gNDAwXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsImV4cG9ydHMgPSBtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9saWIvY3NzLWJhc2UuanNcIikoZmFsc2UpO1xuLy8gaW1wb3J0c1xuXG5cbi8vIG1vZHVsZVxuZXhwb3J0cy5wdXNoKFttb2R1bGUuaWQsIFwiLnRhc2stYmFyIHtcXG4gICAgdGV4dC1hbGlnbjogY2VudGVyO1xcbiAgICBtYXJnaW4tdG9wOiAyMHB4O1xcbn1cIiwgXCJcIl0pO1xuXG4vLyBleHBvcnRzXG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyPz9yZWYtLTEtMSEuL3NyYy9hbGdvcmVhX3JlYWN0X3Rhc2svdWkvc3R5bGVzLmNzc1xuLy8gbW9kdWxlIGlkID0gNDAxXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQge0FsZXJ0fSBmcm9tICdyZWFjdC1ib290c3RyYXAnO1xuaW1wb3J0IHtjb25uZWN0fSBmcm9tICdyZWFjdC1yZWR1eCc7XG5pbXBvcnQge2NhbGwsIGZvcmssIHRha2VFdmVyeSwgc2VsZWN0LCB0YWtlLCBwdXR9IGZyb20gJ3JlZHV4LXNhZ2EvZWZmZWN0cyc7XG5cbmltcG9ydCBUYXNrQmFyIGZyb20gJy4vdWkvdGFza19iYXInO1xuaW1wb3J0IFNwaW5uZXIgZnJvbSAnLi91aS9zcGlubmVyJztcbmltcG9ydCBtYWtlVGFza0NoYW5uZWwgZnJvbSAnLi9sZWdhY3kvdGFzayc7XG5pbXBvcnQgbWFrZVNlcnZlckFwaSBmcm9tICcuL3NlcnZlcl9hcGknO1xuaW1wb3J0IG1ha2VQbGF0Zm9ybUFkYXB0ZXIgZnJvbSAnLi9sZWdhY3kvcGxhdGZvcm1fYWRhcHRlcic7XG5pbXBvcnQgUGxhdGZvcm1CdW5kbGUgZnJvbSAnLi9wbGF0Zm9ybV9idW5kbGUnO1xuaW1wb3J0IEhpbnRzQnVuZGxlIGZyb20gJy4vaGludHNfYnVuZGxlJztcbmltcG9ydCB7d2luZG93SGVpZ2h0TW9uaXRvclNhZ2F9IGZyb20gJy4vd2luZG93X2hlaWdodF9tb25pdG9yJztcblxuZnVuY3Rpb24gYXBwSW5pdFJlZHVjZXIgKHN0YXRlLCB7cGF5bG9hZDoge3Rhc2tUb2tlbiwgb3B0aW9uc319KSB7XG4gICAgcmV0dXJuIHsuLi5zdGF0ZSwgdGFza1Rva2VuLCBvcHRpb25zfTtcbn1cblxuZnVuY3Rpb24gYXBwSW5pdERvbmVSZWR1Y2VyIChzdGF0ZSwge3BheWxvYWQ6IHtwbGF0Zm9ybUFwaSwgdGFza0FwaSwgc2VydmVyQXBpfX0pIHtcbiAgICByZXR1cm4gey4uLnN0YXRlLCBwbGF0Zm9ybUFwaSwgdGFza0FwaSwgc2VydmVyQXBpfTtcbn1cblxuZnVuY3Rpb24gYXBwSW5pdEZhaWxlZFJlZHVjZXIgKHN0YXRlLCB7cGF5bG9hZDoge21lc3NhZ2V9fSkge1xuICAgIHJldHVybiB7Li4uc3RhdGUsIGZhdGFsRXJyb3I6IG1lc3NhZ2V9O1xufVxuXG5mdW5jdGlvbiogYXBwU2FnYSAoKSB7XG4gICAgY29uc3QgYWN0aW9ucyA9IHlpZWxkIHNlbGVjdCgoe2FjdGlvbnN9KSA9PiBhY3Rpb25zKTtcbiAgICB5aWVsZCB0YWtlRXZlcnkoYWN0aW9ucy5hcHBJbml0LCBhcHBJbml0U2FnYSk7XG4gICAgeWllbGQgdGFrZUV2ZXJ5KGFjdGlvbnMucGxhdGZvcm1WYWxpZGF0ZSwgcGxhdGZvcm1WYWxpZGF0ZVNhZ2EpO1xufVxuXG5jb25zdCB0YXNrQWN0aW9ucyA9IHsgLyogbWFwIHRhc2sgbWV0aG9kIG5hbWVzIHRvIGFjdGlvbiB0eXBlcyAqL1xuICAgIGxvYWQ6ICd0YXNrTG9hZEV2ZW50JyxcbiAgICB1bmxvYWQ6ICd0YXNrVW5sb2FkRXZlbnQnLFxuICAgIHVwZGF0ZVRva2VuOiAndGFza1VwZGF0ZVRva2VuRXZlbnQnLFxuICAgIGdldEhlaWdodDogJ3Rhc2tHZXRIZWlnaHRFdmVudCcsXG4gICAgZ2V0TWV0YURhdGE6ICd0YXNrR2V0TWV0YURhdGFFdmVudCcsXG4gICAgZ2V0Vmlld3M6ICd0YXNrR2V0Vmlld3NFdmVudCcsXG4gICAgc2hvd1ZpZXdzOiAndGFza1Nob3dWaWV3c0V2ZW50JyxcbiAgICBnZXRTdGF0ZTogJ3Rhc2tHZXRTdGF0ZUV2ZW50JyxcbiAgICByZWxvYWRTdGF0ZTogJ3Rhc2tSZWxvYWRTdGF0ZUV2ZW50JyxcbiAgICBnZXRBbnN3ZXI6ICd0YXNrR2V0QW5zd2VyRXZlbnQnLFxuICAgIHJlbG9hZEFuc3dlcjogJ3Rhc2tSZWxvYWRBbnN3ZXJFdmVudCcsXG4gICAgZ3JhZGVBbnN3ZXI6ICd0YXNrR3JhZGVBbnN3ZXJFdmVudCcsXG59O1xuXG5mdW5jdGlvbiogYXBwSW5pdFNhZ2EgKHtwYXlsb2FkOiB7dGFza1Rva2VuLCBvcHRpb25zLCBwbGF0Zm9ybX19KSB7XG4gICAgY29uc3QgYWN0aW9ucyA9IHlpZWxkIHNlbGVjdCgoe2FjdGlvbnN9KSA9PiBhY3Rpb25zKTtcbiAgICBsZXQgdGFza0NoYW5uZWwsIHRhc2tBcGksIHBsYXRmb3JtQXBpLCBzZXJ2ZXJBcGk7XG4gICAgdHJ5IHtcbiAgICAgICAgc2VydmVyQXBpID0gbWFrZVNlcnZlckFwaShvcHRpb25zLnNlcnZlcl9tb2R1bGUsIHRhc2tUb2tlbik7XG4gICAgICAgIHRhc2tDaGFubmVsID0geWllbGQgY2FsbChtYWtlVGFza0NoYW5uZWwpO1xuICAgICAgICB0YXNrQXBpID0gKHlpZWxkIHRha2UodGFza0NoYW5uZWwpKS50YXNrO1xuICAgICAgICB5aWVsZCB0YWtlRXZlcnkodGFza0NoYW5uZWwsIGZ1bmN0aW9uKiAoe3R5cGUsIHBheWxvYWR9KSB7XG4gICAgICAgICAgICBjb25zdCBhY3Rpb24gPSB7dHlwZTogYWN0aW9uc1t0YXNrQWN0aW9uc1t0eXBlXV0sIHBheWxvYWR9O1xuICAgICAgICAgICAgeWllbGQgcHV0KGFjdGlvbik7XG4gICAgICAgIH0pO1xuICAgICAgICBwbGF0Zm9ybUFwaSA9IG1ha2VQbGF0Zm9ybUFkYXB0ZXIocGxhdGZvcm0pO1xuICAgIH0gY2F0Y2ggKGV4KSB7XG4gICAgICAgIHlpZWxkIHB1dCh7dHlwZTogYWN0aW9ucy5hcHBJbml0RmFpbGVkLCBwYXlsb2FkOiB7bWVzc2FnZTogZXgudG9TdHJpbmcoKX19KTtcbiAgICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICB5aWVsZCBwdXQoe3R5cGU6IGFjdGlvbnMuYXBwSW5pdERvbmUsIHBheWxvYWQ6IHt0YXNrQXBpLCBwbGF0Zm9ybUFwaSwgc2VydmVyQXBpfX0pO1xuICAgIC8qIFhYWCBJZGVhbGx5IHBsYXRmb3JtLmluaXRXaXRoVGFzayB3b3VsZCB0YWtlIGNhcmUgb2Ygc2V0dGluZyBpdHMgZ2xvYmFsLiAqL1xuICAgIHdpbmRvdy50YXNrID0gdGFza0FwaTtcbiAgICB5aWVsZCBjYWxsKHBsYXRmb3JtQXBpLmluaXRXaXRoVGFzaywgdGFza0FwaSk7XG4gICAgLyogWFhYIHBsYXRmb3JtLmluaXRXaXRoVGFzayBmYWlscyB0byBjb25mb3JtIHRvIE9wZXJhdGlvbnMgQVBJIGFuZCBuZXZlclxuICAgICAgICAgICByZXR1cm4sIGNhdXNpbmcgdGhlIHNhZ2EgdG8gcmVtYWluIHN0dWNrIGF0IHRoaXMgcG9pbnQuICovXG4gICAgeWllbGQgZm9yayh3aW5kb3dIZWlnaHRNb25pdG9yU2FnYSwgcGxhdGZvcm1BcGkpO1xufVxuXG5mdW5jdGlvbiogcGxhdGZvcm1WYWxpZGF0ZVNhZ2EgKHtwYXlsb2FkOiB7bW9kZX19KSB7XG4gICAgY29uc3Qge3ZhbGlkYXRlfSA9IHlpZWxkIHNlbGVjdChzdGF0ZSA9PiBzdGF0ZS5wbGF0Zm9ybUFwaSk7XG4gICAgLyogVE9ETzogZXJyb3IgaGFuZGxpbmcsIHdyYXAgaW4gdHJ5L2NhdGNoIGJsb2NrICovXG4gICAgeWllbGQgY2FsbCh2YWxpZGF0ZSwgbW9kZSk7XG59XG5cbmZ1bmN0aW9uIEFwcFNlbGVjdG9yIChzdGF0ZSkge1xuICAgIGNvbnN0IHt0YXNrUmVhZHksIGZhdGFsRXJyb3IsIHZpZXdzOiB7V29ya3NwYWNlfSwgYWN0aW9uczoge3BsYXRmb3JtVmFsaWRhdGV9LCBncmFkaW5nfSA9IHN0YXRlO1xuICAgIHJldHVybiB7dGFza1JlYWR5LCBmYXRhbEVycm9yLCBXb3Jrc3BhY2UsIHBsYXRmb3JtVmFsaWRhdGUsIGdyYWRpbmd9O1xufVxuXG5jbGFzcyBBcHAgZXh0ZW5kcyBSZWFjdC5QdXJlQ29tcG9uZW50IHtcbiAgICByZW5kZXIgKCkge1xuICAgICAgICBjb25zdCB7dGFza1JlYWR5LCBXb3Jrc3BhY2UsIGZhdGFsRXJyb3IsIGdyYWRpbmd9ID0gdGhpcy5wcm9wcztcbiAgICAgICAgaWYgKGZhdGFsRXJyb3IpIHtcbiAgICAgICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICAgICAgPGRpdj5cbiAgICAgICAgICAgICAgICAgICAgPGgxPntcIkEgZmF0YWwgZXJyb3IgaGFzIG9jY3VycmVkXCJ9PC9oMT5cbiAgICAgICAgICAgICAgICAgICAgPHA+e2ZhdGFsRXJyb3J9PC9wPlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoIXRhc2tSZWFkeSkge1xuICAgICAgICAgICAgcmV0dXJuIDxTcGlubmVyLz47XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIDxkaXY+XG4gICAgICAgICAgICAgICAgPFdvcmtzcGFjZS8+XG4gICAgICAgICAgICAgICAgPFRhc2tCYXIgb25WYWxpZGF0ZT17dGhpcy5fdmFsaWRhdGV9Lz5cbiAgICAgICAgICAgICAgICB7Z3JhZGluZy5tZXNzYWdlICYmXG4gICAgICAgICAgICAgICAgICAgIDxwIHN0eWxlPXt7Zm9udFdlaWdodDogJ2JvbGQnfX0+e2dyYWRpbmcubWVzc2FnZX08L3A+fVxuICAgICAgICAgICAgICAgIHt0eXBlb2YgZ3JhZGluZy5zY29yZSA9PT0gJ251bWJlcicgJiZcbiAgICAgICAgICAgICAgICAgICAgPHA+e1wiVm90cmUgc2NvcmUgOiBcIn08c3BhbiBzdHlsZT17e2ZvbnRXZWlnaHQ6ICdib2xkJ319PntncmFkaW5nLnNjb3JlfTwvc3Bhbj48L3A+fVxuICAgICAgICAgICAgICAgIHtncmFkaW5nLmVycm9yICYmXG4gICAgICAgICAgICAgICAgICAgIDxBbGVydCBic1N0eWxlPSdkYW5nZXInPntncmFkaW5nLmVycm9yfTwvQWxlcnQ+fVxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICk7XG4gICAgfVxuICAgIF92YWxpZGF0ZSA9ICgpID0+IHtcbiAgICAgICAgdGhpcy5wcm9wcy5kaXNwYXRjaCh7dHlwZTogdGhpcy5wcm9wcy5wbGF0Zm9ybVZhbGlkYXRlLCBwYXlsb2FkOiB7bW9kZTogJ2RvbmUnfX0pO1xuICAgIH07XG59XG5cbmV4cG9ydCBkZWZhdWx0IHtcbiAgICBhY3Rpb25zOiB7XG4gICAgICAgIGFwcEluaXQ6ICdBcHAuSW5pdCcsXG4gICAgICAgIGFwcEluaXREb25lOiAnQXBwLkluaXQuRG9uZScsXG4gICAgICAgIGFwcEluaXRGYWlsZWQ6ICdBcHAuSW5pdC5GYWlsZWQnLFxuICAgICAgICBwbGF0Zm9ybVZhbGlkYXRlOiAnUGxhdGZvcm0uVmFsaWRhdGUnLFxuICAgIH0sXG4gICAgYWN0aW9uUmVkdWNlcnM6IHtcbiAgICAgICAgYXBwSW5pdDogYXBwSW5pdFJlZHVjZXIsXG4gICAgICAgIGFwcEluaXREb25lOiBhcHBJbml0RG9uZVJlZHVjZXIsXG4gICAgICAgIGFwcEluaXRGYWlsZWQ6IGFwcEluaXRGYWlsZWRSZWR1Y2VyLFxuICAgIH0sXG4gICAgc2FnYTogYXBwU2FnYSxcbiAgICB2aWV3czoge1xuICAgICAgICBBcHA6IGNvbm5lY3QoQXBwU2VsZWN0b3IpKEFwcClcbiAgICB9LFxuICAgIGluY2x1ZGVzOiBbXG4gICAgICAgIFBsYXRmb3JtQnVuZGxlLFxuICAgICAgICBIaW50c0J1bmRsZSxcbiAgICBdXG59O1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL2FsZ29yZWFfcmVhY3RfdGFzay9hcHBfYnVuZGxlLmpzIiwiXG5pbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IHtCdXR0b259IGZyb20gJ3JlYWN0LWJvb3RzdHJhcCc7XG5cbmZ1bmN0aW9uIFRhc2tCYXIgKHByb3BzKSB7XG4gIHJldHVybiAoXG4gICAgIDxkaXYgY2xhc3NOYW1lPSd0YXNrLWJhcic+XG4gICAgICAgIDxCdXR0b24gb25DbGljaz17cHJvcHMub25WYWxpZGF0ZX0+XG4gICAgICAgICAge1wiVmFsaWRlclwifVxuICAgICAgICA8L0J1dHRvbj5cbiAgICAgPC9kaXY+XG4gICk7XG59XG5cbmV4cG9ydCBkZWZhdWx0IFRhc2tCYXI7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvYWxnb3JlYV9yZWFjdF90YXNrL3VpL3Rhc2tfYmFyLmpzIiwiXG5pbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuXG5mdW5jdGlvbiBTcGlubmVyIChfcHJvcHMpIHtcbiAgcmV0dXJuIChcbiAgICA8ZGl2IGNsYXNzTmFtZT0ndGV4dC1jZW50ZXInIHN0eWxlPXt7Zm9udFNpemU6ICczMDAlJ319PlxuICAgICAgPGkgY2xhc3NOYW1lPVwiZmEgZmEtc3Bpbm5lciBmYS1zcGluXCIvPlxuICAgIDwvZGl2PlxuICApO1xufVxuXG5leHBvcnQgZGVmYXVsdCBTcGlubmVyO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL2FsZ29yZWFfcmVhY3RfdGFzay91aS9zcGlubmVyLmpzIiwiXG5pbXBvcnQge2J1ZmZlcnMsIGV2ZW50Q2hhbm5lbH0gZnJvbSAncmVkdXgtc2FnYSc7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uICgpIHtcbiAgICByZXR1cm4gZXZlbnRDaGFubmVsKGZ1bmN0aW9uIChlbWl0KSB7XG4gICAgICAgIGNvbnN0IHRhc2sgPSBtYWtlVGFzayhlbWl0KTtcbiAgICAgICAgZW1pdCh7dGFza30pO1xuICAgICAgICByZXR1cm4gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgZm9yIChsZXQgcHJvcCBvZiBPYmplY3Qua2V5cyh0YXNrKSkge1xuICAgICAgICAgICAgICAgIHRhc2tbcHJvcF0gPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcigndGFzayBjaGFubmVsIGlzIGNsb3NlZCcpO1xuICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICB9XG4gICAgICAgIH07XG4gICAgfSwgYnVmZmVycy5leHBhbmRpbmcoNCkpO1xufVxuXG5mdW5jdGlvbiBtYWtlVGFzayAoZW1pdCkge1xuICAgIHJldHVybiB7XG4gICAgICAgIHNob3dWaWV3czogZnVuY3Rpb24gKHZpZXdzLCBzdWNjZXNzLCBlcnJvcikge1xuICAgICAgICAgICAgZW1pdCh7dHlwZTogJ3Nob3dWaWV3cycsIHBheWxvYWQ6IHt2aWV3cywgc3VjY2VzcywgZXJyb3J9fSk7XG4gICAgICAgIH0sXG4gICAgICAgIGdldFZpZXdzOiBmdW5jdGlvbiAoc3VjY2VzcywgZXJyb3IpIHtcbiAgICAgICAgICAgIGVtaXQoe3R5cGU6ICdnZXRWaWV3cycsIHBheWxvYWQ6IHtzdWNjZXNzLCBlcnJvcn19KTtcbiAgICAgICAgfSxcbiAgICAgICAgdXBkYXRlVG9rZW46IGZ1bmN0aW9uICh0b2tlbiwgc3VjY2VzcywgZXJyb3IpIHtcbiAgICAgICAgICAgIGVtaXQoe3R5cGU6ICd1cGRhdGVUb2tlbicsIHBheWxvYWQ6IHt0b2tlbiwgc3VjY2VzcywgZXJyb3J9fSk7XG4gICAgICAgIH0sXG4gICAgICAgIGdldEhlaWdodDogZnVuY3Rpb24gKHN1Y2Nlc3MsIGVycm9yKSB7XG4gICAgICAgICAgICBlbWl0KHt0eXBlOiAnZ2V0SGVpZ2h0JywgcGF5bG9hZDoge3N1Y2Nlc3MsIGVycm9yfX0pO1xuICAgICAgICB9LFxuICAgICAgICB1bmxvYWQ6IGZ1bmN0aW9uIChzdWNjZXNzLCBlcnJvcikge1xuICAgICAgICAgICAgZW1pdCh7dHlwZTogJ3VubG9hZCcsIHBheWxvYWQ6IHtzdWNjZXNzLCBlcnJvcn19KTtcbiAgICAgICAgfSxcbiAgICAgICAgZ2V0U3RhdGU6IGZ1bmN0aW9uIChzdWNjZXNzLCBlcnJvcikge1xuICAgICAgICAgICAgZW1pdCh7dHlwZTogJ2dldFN0YXRlJywgcGF5bG9hZDoge3N1Y2Nlc3MsIGVycm9yfX0pO1xuICAgICAgICB9LFxuICAgICAgICBnZXRNZXRhRGF0YTogZnVuY3Rpb24gKHN1Y2Nlc3MsIGVycm9yKSB7XG4gICAgICAgICAgICBlbWl0KHt0eXBlOiAnZ2V0TWV0YURhdGEnLCBwYXlsb2FkOiB7c3VjY2VzcywgZXJyb3J9fSk7XG4gICAgICAgIH0sXG4gICAgICAgIHJlbG9hZEFuc3dlcjogZnVuY3Rpb24gKGFuc3dlciwgc3VjY2VzcywgZXJyb3IpIHtcbiAgICAgICAgICAgIGVtaXQoe3R5cGU6ICdyZWxvYWRBbnN3ZXInLCBwYXlsb2FkOiB7YW5zd2VyLCBzdWNjZXNzLCBlcnJvcn19KTtcbiAgICAgICAgfSxcbiAgICAgICAgcmVsb2FkU3RhdGU6IGZ1bmN0aW9uIChzdGF0ZSwgc3VjY2VzcywgZXJyb3IpIHtcbiAgICAgICAgICAgIGVtaXQoe3R5cGU6ICdyZWxvYWRTdGF0ZScsIHBheWxvYWQ6IHtzdGF0ZSwgc3VjY2VzcywgZXJyb3J9fSk7XG4gICAgICAgIH0sXG4gICAgICAgIGdldEFuc3dlcjogZnVuY3Rpb24gKHN1Y2Nlc3MsIGVycm9yKSB7XG4gICAgICAgICAgICBlbWl0KHt0eXBlOiAnZ2V0QW5zd2VyJywgcGF5bG9hZDoge3N1Y2Nlc3MsIGVycm9yfX0pO1xuICAgICAgICB9LFxuICAgICAgICBsb2FkOiBmdW5jdGlvbiAodmlld3MsIHN1Y2Nlc3MsIGVycm9yKSB7XG4gICAgICAgICAgICBlbWl0KHt0eXBlOiAnbG9hZCcsIHBheWxvYWQ6IHt2aWV3cywgc3VjY2VzcywgZXJyb3J9fSk7XG4gICAgICAgIH0sXG4gICAgICAgIGdyYWRlQW5zd2VyOiBmdW5jdGlvbiAoYW5zd2VyLCBhbnN3ZXJUb2tlbiwgc3VjY2VzcywgZXJyb3IpIHtcbiAgICAgICAgICAgIGVtaXQoe3R5cGU6ICdncmFkZUFuc3dlcicsIHBheWxvYWQ6IHthbnN3ZXIsIGFuc3dlclRva2VuLCBzdWNjZXNzLCBlcnJvcn19KTtcbiAgICAgICAgfSxcbiAgICB9O1xufVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL2FsZ29yZWFfcmVhY3RfdGFzay9sZWdhY3kvdGFzay5qcyIsIlxuaW1wb3J0IGZldGNoUG9ueWZpbGwgZnJvbSAnZmV0Y2gtcG9ueWZpbGwnO1xuXG5jb25zdCB7ZmV0Y2h9ID0gZmV0Y2hQb255ZmlsbCgpO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBtYWtlU2VydmVyQXBpIChjb25maWcpIHtcbiAgICByZXR1cm4gZnVuY3Rpb24gKHNlcnZpY2UsIGFjdGlvbiwgYm9keSkge1xuICAgICAgICByZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkge1xuICAgICAgICAgICAgY29uc3QgdXJsID0gbmV3IFVSTChzZXJ2aWNlLCBjb25maWcuYmFzZVVybCk7XG4gICAgICAgICAgICBjb25zdCBkZXZlbCA9IGNvbmZpZy5kZXZlbCA/IHt0YXNrOiBjb25maWcuZGV2ZWx9IDoge307XG4gICAgICAgICAgICByZXR1cm4gZmV0Y2godXJsLCB7XG4gICAgICAgICAgICAgICAgbWV0aG9kOiAnUE9TVCcsXG4gICAgICAgICAgICAgICAgaGVhZGVyczoge1xuICAgICAgICAgICAgICAgICAgICAnQ29udGVudC1UeXBlJzogJ2FwcGxpY2F0aW9uL2pzb24nLFxuICAgICAgICAgICAgICAgICAgICAnQWNjZXB0JzogJ2FwcGxpY2F0aW9uL2pzb24nLFxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgYm9keTogSlNPTi5zdHJpbmdpZnkoey4uLmJvZHksIC4uLmRldmVsLCBhY3Rpb259KVxuICAgICAgICAgICAgfSkudGhlbihmdW5jdGlvbiAocmVzcG9uc2UpIHtcbiAgICAgICAgICAgICAgICBpZiAocmVzcG9uc2Uuc3RhdHVzICE9PSAyMDApIHJldHVybiByZWplY3QocmVzcG9uc2UpO1xuICAgICAgICAgICAgICAgIHJlc3BvbnNlLmpzb24oKS5jYXRjaChyZWplY3QpLnRoZW4oZnVuY3Rpb24gKHJlc3VsdCkge1xuICAgICAgICAgICAgICAgICAgICBpZiAoIXJlc3VsdC5zdWNjZXNzKSByZXR1cm4gcmVqZWN0KHJlc3VsdC5lcnJvcik7XG4gICAgICAgICAgICAgICAgICAgIHJlc29sdmUocmVzdWx0LmRhdGEpO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfSkuY2F0Y2gocmVqZWN0KTtcbiAgICAgICAgfSk7XG4gICAgfTtcbn1cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9hbGdvcmVhX3JlYWN0X3Rhc2svc2VydmVyX2FwaS5qcyIsIlxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gKHBsYXRmb3JtKSB7XG5cbiAgICBmdW5jdGlvbiBpbml0V2l0aFRhc2sgKHRhc2spIHtcbiAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHtcbiAgICAgICAgICAgIHBsYXRmb3JtLmluaXRXaXRoVGFzayh0YXNrLCByZXNvbHZlLCByZWplY3QpO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBnZXRUYXNrUGFyYW1zIChrZXksIGRlZmF1bHRWYWx1ZSkge1xuICAgICAgICByZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkge1xuICAgICAgICAgICAgcGxhdGZvcm0uZ2V0VGFza1BhcmFtcyhrZXksIGRlZmF1bHRWYWx1ZSwgcmVzb2x2ZSwgcmVqZWN0KTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gYXNrSGludCAoaGludFRva2VuKSB7XG4gICAgICAgIHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KSB7XG4gICAgICAgICAgICBwbGF0Zm9ybS5hc2tIaW50KGhpbnRUb2tlbiwgcmVzb2x2ZSwgcmVqZWN0KTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gdmFsaWRhdGUgKG1vZGUpIHtcbiAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHtcbiAgICAgICAgICAgIHBsYXRmb3JtLnZhbGlkYXRlKG1vZGUsIHJlc29sdmUsIHJlamVjdCk7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIHVwZGF0ZURpc3BsYXkgKG9wdGlvbnMpIHtcbiAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHtcbiAgICAgICAgICAgIHBsYXRmb3JtLnVwZGF0ZURpc3BsYXkob3B0aW9ucywgcmVzb2x2ZSwgcmVqZWN0KTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgcmV0dXJuIHtpbml0V2l0aFRhc2ssIGdldFRhc2tQYXJhbXMsIGFza0hpbnQsIHZhbGlkYXRlLCB1cGRhdGVEaXNwbGF5fTtcblxufVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL2FsZ29yZWFfcmVhY3RfdGFzay9sZWdhY3kvcGxhdGZvcm1fYWRhcHRlci5qcyIsIi8qXG4jIFBlcmZvcm1hbmNlXG4tIHRhc2suZ2V0SGVpZ2h0IGFuZCB0YXNrLmdldEFuc3dlciBhcmUgY2FsbGVkIGV2ZXJ5IHNlY29uZFxuLSB0YXNrLmdldFZpZXdzIGlzIGNhbGxlZCB3aGVuZXZlciB0aGUgd2luZG93J3MgaGVpZ2h0IGNoYW5nZXNcbiovXG5cbmltcG9ydCB7Y2FsbCwgcHV0LCBzZWxlY3QsIHRha2VFdmVyeX0gZnJvbSAncmVkdXgtc2FnYS9lZmZlY3RzJztcbmltcG9ydCBzdHJpbmdpZnkgZnJvbSAnanNvbi1zdGFibGUtc3RyaW5naWZ5LXdpdGhvdXQtanNvbmlmeSc7XG5cbmZ1bmN0aW9uIGFwcEluaXRSZWR1Y2VyIChzdGF0ZSwge3BheWxvYWQ6IHt0YXNrVG9rZW4sIG9wdGlvbnN9fSkge1xuICAgIHJldHVybiB7Li4uc3RhdGUsIGdyYWRpbmc6IHt9fTtcbn1cblxuZnVuY3Rpb24gdGFza0RhdGFMb2FkZWRSZWR1Y2VyIChzdGF0ZSwge3BheWxvYWQ6IHt0YXNrRGF0YX19KSB7XG4gICAgcmV0dXJuIHsuLi5zdGF0ZSwgdGFza0RhdGF9O1xufVxuXG5mdW5jdGlvbiB0YXNrU3RhdGVMb2FkZWRSZWR1Y2VyIChzdGF0ZSwge3BheWxvYWQ6IHtoaW50c319KSB7XG4gICAgcmV0dXJuIHsuLi5zdGF0ZSwgaGludHN9O1xufVxuXG5mdW5jdGlvbiB0YXNrQW5zd2VyTG9hZGVkUmVkdWNlciAoc3RhdGUsIHtwYXlsb2FkOiB7YW5zd2VyfX0pIHtcbiAgICByZXR1cm4gey4uLnN0YXRlLCBhbnN3ZXJ9O1xufVxuXG5mdW5jdGlvbiB0YXNrU2hvd1ZpZXdzRXZlbnRSZWR1Y2VyIChzdGF0ZSwge3BheWxvYWQ6IHt2aWV3c319KSB7XG4gICAgcmV0dXJuIHsuLi5zdGF0ZSwgdGFza1ZpZXdzOiB2aWV3c307XG59XG5cbmZ1bmN0aW9uKiB0YXNrU2hvd1ZpZXdzRXZlbnRTYWdhICh7cGF5bG9hZDoge3N1Y2Nlc3N9fSkge1xuICAgIC8qIFRoZSByZWR1Y2VyIGhhcyBzdG9yZWQgdGhlIHZpZXdzIHRvIHNob3csIGp1c3QgY2FsbCBzdWNjZXNzLiAqL1xuICAgIHlpZWxkIGNhbGwoc3VjY2Vzcyk7XG59XG5cbmZ1bmN0aW9uKiB0YXNrR2V0Vmlld3NFdmVudFNhZ2EgKHtwYXlsb2FkOiB7c3VjY2Vzc319KSB7XG4gICAgLyogWFhYIG9ubHkgdGhlICd0YXNrJyB2aWV3IGlzIGRlY2xhcmVkICovXG4gICAgeWllbGQgY2FsbChzdWNjZXNzLCB7J3Rhc2snOiB7fX0pO1xufVxuXG5mdW5jdGlvbiB0YXNrVXBkYXRlVG9rZW5FdmVudFJlZHVjZXIgKHN0YXRlLCB7cGF5bG9hZDoge3Rva2VufX0pIHtcbiAgICBpZiAodG9rZW4gPT09IG51bGwpIHtcbiAgICAgICAgY29uc29sZS53YXJuKCdpZ25vcmVkIHRhc2sudXBkYXRlVG9rZW4gd2l0aCBudWxsIHRva2VuJyk7XG4gICAgICAgIHJldHVybiBzdGF0ZTtcbiAgICB9XG4gICAgcmV0dXJuIHsuLi5zdGF0ZSwgdGFza1Rva2VuOiB0b2tlbn07XG59XG5mdW5jdGlvbiogdGFza1VwZGF0ZVRva2VuRXZlbnRTYWdhICh7cGF5bG9hZDoge3N1Y2Nlc3N9fSkge1xuICAgIHlpZWxkIGNhbGwoc3VjY2Vzcyk7XG59XG5cbmZ1bmN0aW9uKiB0YXNrR2V0SGVpZ2h0RXZlbnRTYWdhICh7cGF5bG9hZDoge3N1Y2Nlc3N9fSkge1xuICAgIGNvbnN0IGQgPSBkb2N1bWVudDtcbiAgICBjb25zdCBoID0gTWF0aC5tYXgoZC5ib2R5Lm9mZnNldEhlaWdodCwgZC5kb2N1bWVudEVsZW1lbnQub2Zmc2V0SGVpZ2h0KTtcbiAgICB5aWVsZCBjYWxsKHN1Y2Nlc3MsIGgpO1xufVxuXG5mdW5jdGlvbiogdGFza1VubG9hZEV2ZW50U2FnYSAoe3BheWxvYWQ6IHtzdWNjZXNzfX0pIHtcbiAgICAvKiBYWFggTm8gYWN0aW9uIG5lZWRlZD8gKi9cbiAgICB5aWVsZCBjYWxsKHN1Y2Nlc3MpO1xufVxuXG5mdW5jdGlvbiogdGFza0dldE1ldGFEYXRhRXZlbnRTYWdhICh7cGF5bG9hZDoge3N1Y2Nlc3MsIGVycm9yOiBfZXJyb3J9fSkge1xuICAgIGNvbnN0IG1ldGFEYXRhID0geWllbGQgc2VsZWN0KCh7dGFza01ldGFEYXRhfSkgPT4gdGFza01ldGFEYXRhKTtcbiAgICB5aWVsZCBjYWxsKHN1Y2Nlc3MsIG1ldGFEYXRhKTtcbn1cblxuZnVuY3Rpb24qIHRhc2tHZXRBbnN3ZXJFdmVudFNhZ2EgKHtwYXlsb2FkOiB7c3VjY2Vzc319KSB7XG4gICAgY29uc3QgYW5zd2VyID0geWllbGQgc2VsZWN0KHN0YXRlID0+IHN0YXRlLnNlbGVjdG9ycy5nZXRUYXNrQW5zd2VyKHN0YXRlKSk7XG4gICAgY29uc3Qgc3RyQW5zd2VyID0gc3RyaW5naWZ5KGFuc3dlcik7XG4gICAgeWllbGQgY2FsbChzdWNjZXNzLCBzdHJBbnN3ZXIpO1xufVxuXG5mdW5jdGlvbiogdGFza1JlbG9hZEFuc3dlckV2ZW50U2FnYSAoe3BheWxvYWQ6IHthbnN3ZXIsIHN1Y2Nlc3MsIGVycm9yfX0pIHtcbiAgICBjb25zdCB7dGFza0Fuc3dlckxvYWRlZCwgdGFza1JlZnJlc2h9ID0geWllbGQgc2VsZWN0KCh7YWN0aW9uc30pID0+IGFjdGlvbnMpO1xuICAgIHRyeSB7XG4gICAgICAgIGlmIChhbnN3ZXIpIHtcbiAgICAgICAgICAgIHlpZWxkIHB1dCh7dHlwZTogdGFza0Fuc3dlckxvYWRlZCwgcGF5bG9hZDoge2Fuc3dlcjogSlNPTi5wYXJzZShhbnN3ZXIpfX0pO1xuICAgICAgICAgICAgeWllbGQgcHV0KHt0eXBlOiB0YXNrUmVmcmVzaH0pO1xuICAgICAgICB9XG4gICAgICAgIHlpZWxkIGNhbGwoc3VjY2Vzcyk7XG4gICAgfSBjYXRjaCAoZXgpIHtcbiAgICAgICAgeWllbGQgY2FsbChlcnJvciwgYGJhZCBhbnN3ZXI6ICR7ZXgubWVzc2FnZX1gKTtcbiAgICB9XG59XG5cbmZ1bmN0aW9uKiB0YXNrR2V0U3RhdGVFdmVudFNhZ2EgKHtwYXlsb2FkOiB7c3VjY2Vzc319KSB7XG4gICAgY29uc3QgZHVtcCA9IHlpZWxkIHNlbGVjdChzdGF0ZSA9PiBzdGF0ZS5zZWxlY3RvcnMuZ2V0VGFza1N0YXRlKHN0YXRlKSk7XG4gICAgY29uc3Qgc3RyRHVtcCA9IHN0cmluZ2lmeShkdW1wKTtcbiAgICB5aWVsZCBjYWxsKHN1Y2Nlc3MsIHN0ckR1bXApO1xufVxuXG5mdW5jdGlvbiogdGFza1JlbG9hZFN0YXRlRXZlbnRTYWdhICh7cGF5bG9hZDoge3N0YXRlLCBzdWNjZXNzLCBlcnJvcn19KSB7XG4gICAgY29uc3Qge3Rhc2tTdGF0ZUxvYWRlZCwgdGFza1JlZnJlc2h9ID0geWllbGQgc2VsZWN0KCh7YWN0aW9uc30pID0+IGFjdGlvbnMpO1xuICAgIHRyeSB7XG4gICAgICAgIGlmIChzdGF0ZSkge1xuICAgICAgICAgICAgeWllbGQgcHV0KHt0eXBlOiB0YXNrU3RhdGVMb2FkZWQsIHBheWxvYWQ6IHtkdW1wOiBKU09OLnBhcnNlKHN0YXRlKX19KTtcbiAgICAgICAgICAgIHlpZWxkIHB1dCh7dHlwZTogdGFza1JlZnJlc2h9KTtcbiAgICAgICAgfVxuICAgICAgICB5aWVsZCBjYWxsKHN1Y2Nlc3MpO1xuICAgIH0gY2F0Y2ggKGV4KSB7XG4gICAgICAgIHlpZWxkIGNhbGwoZXJyb3IsIGBiYWQgc3RhdGU6ICR7ZXgubWVzc2FnZX1gKTtcbiAgICB9XG59XG5cbmZ1bmN0aW9uKiB0YXNrTG9hZEV2ZW50U2FnYSAoe3BheWxvYWQ6IHt2aWV3czogX3ZpZXdzLCBzdWNjZXNzLCBlcnJvcn19KSB7XG4gICAgY29uc3Qge3Rhc2tEYXRhTG9hZGVkLCB0YXNrSW5pdH0gPSB5aWVsZCBzZWxlY3QoKHthY3Rpb25zfSkgPT4gYWN0aW9ucyk7XG4gICAgLyogVE9ETzogZG8gc29tZXRoaW5nIHdpdGggdmlld3MgKi9cbiAgICB0cnkge1xuICAgICAgICBjb25zdCB7dGFza1Rva2VuLCBzZXJ2ZXJBcGl9ID0geWllbGQgc2VsZWN0KHN0YXRlID0+IHN0YXRlKTtcbiAgICAgICAgY29uc3QgdGFza0RhdGEgPSB5aWVsZCBjYWxsKHNlcnZlckFwaSwgJ3Rhc2tzJywgJ3Rhc2tEYXRhJywge3Rhc2s6IHRhc2tUb2tlbn0pO1xuICAgICAgICB5aWVsZCBwdXQoe3R5cGU6IHRhc2tEYXRhTG9hZGVkLCBwYXlsb2FkOiB7dGFza0RhdGF9fSk7XG4gICAgICAgIHlpZWxkIHB1dCh7dHlwZTogdGFza0luaXR9KTtcbiAgICAgICAgeWllbGQgY2FsbChzdWNjZXNzKTtcbiAgICB9IGNhdGNoIChleCkge1xuICAgICAgICB5aWVsZCBjYWxsKGVycm9yLCBleC50b1N0cmluZygpKTtcbiAgICB9XG59XG5cbmZ1bmN0aW9uKiB0YXNrR3JhZGVBbnN3ZXJFdmVudFNhZ2EgKHtwYXlsb2FkOiB7YW5zd2VyLCBhbnN3ZXJUb2tlbiwgc3VjY2VzcywgZXJyb3J9fSkge1xuICAgIGNvbnN0IHt0YXNrQW5zd2VyR3JhZGVkfSA9IHlpZWxkIHNlbGVjdCgoe2FjdGlvbnN9KSA9PiBhY3Rpb25zKTtcbiAgICBsZXQgcmVzdWx0O1xuICAgIHRyeSB7XG4gICAgICAgIGNvbnN0IHt0YXNrVG9rZW4sIHBsYXRmb3JtQXBpOiB7Z2V0VGFza1BhcmFtc30sIHNlcnZlckFwaX0gPSB5aWVsZCBzZWxlY3Qoc3RhdGUgPT4gc3RhdGUpO1xuICAgICAgICBjb25zdCB7bWluU2NvcmUsIG1heFNjb3JlLCBub1Njb3JlfSA9IHlpZWxkIGNhbGwoZ2V0VGFza1BhcmFtcywgbnVsbCwgbnVsbCk7XG4gICAgICAgIGNvbnN0IHtzY29yZSwgbWVzc2FnZSwgdG9rZW46IHNjb3JlVG9rZW59ID0geWllbGQgY2FsbChzZXJ2ZXJBcGksICd0YXNrcycsICdncmFkZUFuc3dlcicsIHtcbiAgICAgICAgICAgIHRhc2s6IHRhc2tUb2tlbiwgLyogWFhYIHRhc2sgc2hvdWxkIGJlIG5hbWVkIHRhc2tUb2tlbiAqL1xuICAgICAgICAgICAgYW5zd2VyOiBhbnN3ZXJUb2tlbiwgIC8qIFhYWCBhbnN3ZXIgc2hvdWxkIGJlIG5hbWVkIGFuc3dlclRva2VuICovXG4gICAgICAgICAgICBtaW5fc2NvcmU6IG1pblNjb3JlLCAvKiBYWFggbm8gcmVhbCBwb2ludCBwYXNzaW5nIG1pbl9zY29yZSwgbWF4X3Njb3JlLCBub19zY29yZSB0byBzZXJ2ZXItc2lkZSBncmFkZXIgKi9cbiAgICAgICAgICAgIG1heF9zY29yZTogbWF4U2NvcmUsXG4gICAgICAgICAgICBub19zY29yZTogbm9TY29yZVxuICAgICAgICB9KTtcbiAgICAgICAgeWllbGQgcHV0KHt0eXBlOiB0YXNrQW5zd2VyR3JhZGVkLCBwYXlsb2FkOiB7Z3JhZGluZzoge3Njb3JlLCBtZXNzYWdlfX19KTtcbiAgICAgICAgeWllbGQgY2FsbChzdWNjZXNzLCBzY29yZSwgbWVzc2FnZSwgc2NvcmVUb2tlbik7XG4gICAgfSBjYXRjaCAoZXgpIHtcbiAgICAgICAgeWllbGQgcHV0KHt0eXBlOiB0YXNrQW5zd2VyR3JhZGVkLCBwYXlsb2FkOiB7Z3JhZGluZzoge2Vycm9yOiBleC50b1N0cmluZygpfX19KTtcbiAgICAgICAgeWllbGQgY2FsbChlcnJvciwgZXgudG9TdHJpbmcoKSk7XG4gICAgfVxufVxuXG5mdW5jdGlvbiB0YXNrQW5zd2VyR3JhZGVkUmVkdWNlciAoc3RhdGUsIHtwYXlsb2FkOiB7Z3JhZGluZ319KSB7XG4gICAgcmV0dXJuIHsuLi5zdGF0ZSwgZ3JhZGluZ307XG59XG5cbmV4cG9ydCBkZWZhdWx0IHtcbiAgICBhY3Rpb25zOiB7XG4gICAgICAgIHRhc2tJbml0OiAnVGFzay5Jbml0JyxcbiAgICAgICAgdGFza1JlZnJlc2g6ICdUYXNrLlJlZnJlc2gnLFxuICAgICAgICB0YXNrTG9hZEV2ZW50OiAnVGFzay5FdmVudC5Mb2FkJyAvKiB7dmlld3MsIHN1Y2Nlc3MsIGVycm9yfSAqLyxcbiAgICAgICAgdGFza1VubG9hZEV2ZW50OiAnVGFzay5FdmVudC5VbmxvYWQnIC8qIHtzdWNjZXNzLCBlcnJvcn0gKi8sXG4gICAgICAgIHRhc2tVcGRhdGVUb2tlbkV2ZW50OiAnVGFzay5FdmVudC5VcGRhdGVUb2tlbicgLyoge3Rva2VuLCBzdWNjZXNzLCBlcnJvcn0gKi8sXG4gICAgICAgIHRhc2tHZXRIZWlnaHRFdmVudDogJ1Rhc2suRXZlbnQuR2V0SGVpZ2h0JyAvKiB7c3VjY2VzcywgZXJyb3J9ICovLFxuICAgICAgICB0YXNrR2V0TWV0YURhdGFFdmVudDogJ1Rhc2suRXZlbnQuR2V0TWV0YURhdGEnIC8qIHtzdWNjZXNzLCBlcnJvcn0gKi8sXG4gICAgICAgIHRhc2tHZXRWaWV3c0V2ZW50OiAnVGFzay5FdmVudC5HZXRWaWV3cycgLyoge3N1Y2Nlc3MsIGVycm9yfSAqLyxcbiAgICAgICAgdGFza1Nob3dWaWV3c0V2ZW50OiAnVGFzay5FdmVudC5TaG93Vmlld3MnIC8qIHt2aWV3cywgc3VjY2VzcywgZXJyb3J9ICovLFxuICAgICAgICB0YXNrR2V0U3RhdGVFdmVudDogJ1Rhc2suRXZlbnQuR2V0U3RhdGUnIC8qIHtzdWNjZXNzLCBlcnJvcn0gKi8sXG4gICAgICAgIHRhc2tSZWxvYWRTdGF0ZUV2ZW50OiAnVGFzay5FdmVudC5SZWxvYWRTdGF0ZScgLyoge3N0YXRlLCBzdWNjZXNzLCBlcnJvcn0gKi8sXG4gICAgICAgIHRhc2tHZXRBbnN3ZXJFdmVudDogJ1Rhc2suRXZlbnQuR2V0QW5zd2VyJyAvKiB7c3VjY2VzcywgZXJyb3J9ICovLFxuICAgICAgICB0YXNrUmVsb2FkQW5zd2VyRXZlbnQ6ICdUYXNrLkV2ZW50LlJlbG9hZEFuc3dlcicgLyoge2Fuc3dlciwgc3VjY2VzcywgZXJyb3J9ICovLFxuICAgICAgICB0YXNrR3JhZGVBbnN3ZXJFdmVudDogJ1Rhc2suRXZlbnQuR3JhZGVBbnN3ZXInIC8qIHthbnN3ZXIsIGFuc3dlclRva2VuLCBzdWNjZXNzLCBlcnJvcn0gKi8sXG4gICAgICAgIHRhc2tEYXRhTG9hZGVkOiAnVGFzay5EYXRhLkxvYWRlZCcsXG4gICAgICAgIHRhc2tTdGF0ZUxvYWRlZDogJ1Rhc2suU3RhdGUuTG9hZGVkJyxcbiAgICAgICAgdGFza0Fuc3dlckxvYWRlZDogJ1Rhc2suQW5zd2VyLkxvYWRlZCcsXG4gICAgICAgIHRhc2tBbnN3ZXJHcmFkZWQ6ICdUYXNrLkFuc3dlci5HcmFkZWQnLFxuICAgIH0sXG4gICAgYWN0aW9uUmVkdWNlcnM6IHtcbiAgICAgICAgYXBwSW5pdDogYXBwSW5pdFJlZHVjZXIsXG4gICAgICAgIHRhc2tTaG93Vmlld3NFdmVudDogdGFza1Nob3dWaWV3c0V2ZW50UmVkdWNlcixcbiAgICAgICAgdGFza1VwZGF0ZVRva2VuRXZlbnQ6IHRhc2tVcGRhdGVUb2tlbkV2ZW50UmVkdWNlcixcbiAgICAgICAgdGFza0RhdGFMb2FkZWQ6IHRhc2tEYXRhTG9hZGVkUmVkdWNlcixcbiAgICAgICAgdGFza1N0YXRlTG9hZGVkOiB0YXNrU3RhdGVMb2FkZWRSZWR1Y2VyLFxuICAgICAgICB0YXNrQW5zd2VyTG9hZGVkOiB0YXNrQW5zd2VyTG9hZGVkUmVkdWNlcixcbiAgICAgICAgdGFza0Fuc3dlckdyYWRlZDogdGFza0Fuc3dlckdyYWRlZFJlZHVjZXIsXG4gICAgfSxcbiAgICBzYWdhOiBmdW5jdGlvbiogKCkge1xuICAgICAgICBjb25zdCBhY3Rpb25zID0geWllbGQgc2VsZWN0KCh7YWN0aW9uc30pID0+IGFjdGlvbnMpO1xuICAgICAgICB5aWVsZCB0YWtlRXZlcnkoYWN0aW9ucy50YXNrU2hvd1ZpZXdzRXZlbnQsIHRhc2tTaG93Vmlld3NFdmVudFNhZ2EpO1xuICAgICAgICB5aWVsZCB0YWtlRXZlcnkoYWN0aW9ucy50YXNrR2V0Vmlld3NFdmVudCwgdGFza0dldFZpZXdzRXZlbnRTYWdhKTtcbiAgICAgICAgeWllbGQgdGFrZUV2ZXJ5KGFjdGlvbnMudGFza1VwZGF0ZVRva2VuRXZlbnQsIHRhc2tVcGRhdGVUb2tlbkV2ZW50U2FnYSk7XG4gICAgICAgIHlpZWxkIHRha2VFdmVyeShhY3Rpb25zLnRhc2tHZXRIZWlnaHRFdmVudCwgdGFza0dldEhlaWdodEV2ZW50U2FnYSk7XG4gICAgICAgIHlpZWxkIHRha2VFdmVyeShhY3Rpb25zLnRhc2tVbmxvYWRFdmVudCwgdGFza1VubG9hZEV2ZW50U2FnYSk7XG4gICAgICAgIHlpZWxkIHRha2VFdmVyeShhY3Rpb25zLnRhc2tHZXRTdGF0ZUV2ZW50LCB0YXNrR2V0U3RhdGVFdmVudFNhZ2EpO1xuICAgICAgICB5aWVsZCB0YWtlRXZlcnkoYWN0aW9ucy50YXNrR2V0TWV0YURhdGFFdmVudCwgdGFza0dldE1ldGFEYXRhRXZlbnRTYWdhKTtcbiAgICAgICAgeWllbGQgdGFrZUV2ZXJ5KGFjdGlvbnMudGFza1JlbG9hZEFuc3dlckV2ZW50LCB0YXNrUmVsb2FkQW5zd2VyRXZlbnRTYWdhKTtcbiAgICAgICAgeWllbGQgdGFrZUV2ZXJ5KGFjdGlvbnMudGFza1JlbG9hZFN0YXRlRXZlbnQsIHRhc2tSZWxvYWRTdGF0ZUV2ZW50U2FnYSk7XG4gICAgICAgIHlpZWxkIHRha2VFdmVyeShhY3Rpb25zLnRhc2tHZXRBbnN3ZXJFdmVudCwgdGFza0dldEFuc3dlckV2ZW50U2FnYSk7XG4gICAgICAgIHlpZWxkIHRha2VFdmVyeShhY3Rpb25zLnRhc2tMb2FkRXZlbnQsIHRhc2tMb2FkRXZlbnRTYWdhKTtcbiAgICAgICAgeWllbGQgdGFrZUV2ZXJ5KGFjdGlvbnMudGFza0dyYWRlQW5zd2VyRXZlbnQsIHRhc2tHcmFkZUFuc3dlckV2ZW50U2FnYSk7XG4gICAgfVxufTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9hbGdvcmVhX3JlYWN0X3Rhc2svcGxhdGZvcm1fYnVuZGxlLmpzIiwiXG5pbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IHtBbGVydH0gZnJvbSAncmVhY3QtYm9vdHN0cmFwJztcbmltcG9ydCB7Y29ubmVjdH0gZnJvbSAncmVhY3QtcmVkdXgnO1xuaW1wb3J0IHtjYWxsLCBwdXQsIHNlbGVjdCwgdGFrZUV2ZXJ5fSBmcm9tICdyZWR1eC1zYWdhL2VmZmVjdHMnO1xuaW1wb3J0IHVwZGF0ZSBmcm9tICdpbW11dGFiaWxpdHktaGVscGVyJztcblxuZnVuY3Rpb24gaGludFJlcXVlc3RGdWxmaWxsZWRSZWR1Y2VyIChzdGF0ZSwgX2FjdGlvbikge1xuICAgIHJldHVybiB7Li4uc3RhdGUsIGhpbnRSZXF1ZXN0OiB7c3VjY2VzczogdHJ1ZX19O1xufVxuXG5mdW5jdGlvbiBoaW50UmVxdWVzdFJlamVjdGVkUmVkdWNlciAoc3RhdGUsIHtwYXlsb2FkOiB7Y29kZSwgZXJyb3J9fSkge1xuICAgIHJldHVybiB7Li4uc3RhdGUsIGhpbnRSZXF1ZXN0OiB7c3VjY2VzczogZmFsc2UsIGNvZGUsIGVycm9yfX07XG59XG5cbmZ1bmN0aW9uIGhpbnRSZXF1ZXN0RmVlZGJhY2tDbGVhcmVkUmVkdWNlciAoc3RhdGUsIF9hY3Rpb24pIHtcbiAgICByZXR1cm4gey4uLnN0YXRlLCBoaW50UmVxdWVzdDogZmFsc2V9O1xufVxuXG5mdW5jdGlvbiogcmVxdWVzdEhpbnRTYWdhICh7cGF5bG9hZDoge3JlcXVlc3R9fSkge1xuICAgIGNvbnN0IGFjdGlvbnMgPSB5aWVsZCBzZWxlY3QoKHthY3Rpb25zfSkgPT4gYWN0aW9ucyk7XG4gICAgbGV0IGNvZGUgPSAwO1xuICAgIHRyeSB7XG4gICAgICAgIGNvbnN0IHthY3Rpb25zLCB0YXNrVG9rZW46IGluaXRpYWxUYXNrVG9rZW4sIHNlcnZlckFwaX0gPSB5aWVsZCBzZWxlY3Qoc3RhdGUgPT4gc3RhdGUpO1xuICAgICAgICBjb2RlID0gMTA7XG4gICAgICAgIGNvbnN0IHthc2tIaW50fSA9IHlpZWxkIHNlbGVjdChzdGF0ZSA9PiBzdGF0ZS5wbGF0Zm9ybUFwaSk7XG4gICAgICAgIGNvZGUgPSAyMDtcbiAgICAgICAgLyogQ29udGFjdCBzZXJ2ZXJBcGkgdG8gb2J0YWluIGEgaGludFRva2VuIGZvciB0aGUgcmVxdWVzdGVkIGhpbnQuICovXG4gICAgICAgIGNvbnN0IHtoaW50VG9rZW59ID0geWllbGQgY2FsbChzZXJ2ZXJBcGksICd0YXNrcycsICdyZXF1ZXN0SGludCcsIHt0YXNrOiBpbml0aWFsVGFza1Rva2VuLCByZXF1ZXN0fSk7XG4gICAgICAgIGNvZGUgPSAzMDtcbiAgICAgICAgLyogQ29udGFjdCB0aGUgcGxhdGZvcm0gdG8gYXV0aG9yaXplIHRoZSBoaW50IHJlcXVlc3QuICovXG4gICAgICAgIHlpZWxkIGNhbGwoYXNrSGludCwgaGludFRva2VuKTtcbiAgICAgICAgY29kZSA9IDQwO1xuICAgICAgICAvKiBXaGVuIGFza0hpbnQgcmV0dXJucyBhbiB1cGRhdGVkIHRhc2tUb2tlbiBpcyBvYnRhaW5lZCBmcm9tIHRoZSBzdG9yZS4gKi9cbiAgICAgICAgY29uc3QgdXBkYXRlZFRhc2tUb2tlbiA9IHlpZWxkIHNlbGVjdChzdGF0ZSA9PiBzdGF0ZS50YXNrVG9rZW4pO1xuICAgICAgICBjb2RlID0gNTA7XG4gICAgICAgIC8qIEZpbmFsbHksIGNvbnRhY3QgdGhlIHNlcnZlckFwaSB0byBvYnRhaW4gdGhlIHVwZGF0ZWQgdGFza0RhdGEuICovXG4gICAgICAgIGNvbnN0IHRhc2tEYXRhID0geWllbGQgY2FsbChzZXJ2ZXJBcGksICd0YXNrcycsICd0YXNrRGF0YScsIHt0YXNrOiB1cGRhdGVkVGFza1Rva2VufSk7XG4gICAgICAgIGNvZGUgPSA2MDtcbiAgICAgICAgeWllbGQgcHV0KHt0eXBlOiBhY3Rpb25zLnRhc2tEYXRhTG9hZGVkLCBwYXlsb2FkOiB7dGFza0RhdGF9fSk7XG4gICAgICAgIHlpZWxkIHB1dCh7dHlwZTogYWN0aW9ucy50YXNrUmVmcmVzaH0pO1xuICAgICAgICB5aWVsZCBwdXQoe3R5cGU6IGFjdGlvbnMuaGludFJlcXVlc3RGdWxmaWxsZWQsIHBheWxvYWQ6IHt9fSk7XG4gICAgfSBjYXRjaCAoZXgpIHtcbiAgICAgICAgeWllbGQgcHV0KHt0eXBlOiBhY3Rpb25zLmhpbnRSZXF1ZXN0UmVqZWN0ZWQsIHBheWxvYWQ6IHtjb2RlOiBjb2RlLCBlcnJvcjogZXh9fSk7XG4gICAgfVxufVxuXG5mdW5jdGlvbiBIaW50UmVxdWVzdEZlZWRiYWNrU2VsZWN0b3IgKHN0YXRlKSB7XG4gICAgY29uc3Qge2FjdGlvbnMsIGhpbnRSZXF1ZXN0fSA9IHN0YXRlO1xuICAgIGlmICghaGludFJlcXVlc3QpIHJldHVybiB7fTtcbiAgICBjb25zdCB7aGludFJlcXVlc3RGZWVkYmFja0NsZWFyZWR9ID0gYWN0aW9ucztcbiAgICBjb25zdCB7c3VjY2VzcywgY29kZSwgZXJyb3J9ID0gaGludFJlcXVlc3Q7XG4gICAgcmV0dXJuIHt2aXNpYmxlOiB0cnVlLCBzdWNjZXNzLCBjb2RlLCBlcnJvciwgaGludFJlcXVlc3RGZWVkYmFja0NsZWFyZWR9O1xufVxuXG5jbGFzcyBIaW50UmVxdWVzdEZlZWRiYWNrIGV4dGVuZHMgUmVhY3QuUHVyZUNvbXBvbmVudCB7XG4gICAgcmVuZGVyICgpIHtcbiAgICAgICAgY29uc3Qge3Zpc2libGUsIHN1Y2Nlc3N9ID0gdGhpcy5wcm9wcztcbiAgICAgICAgaWYgKCF2aXNpYmxlKSByZXR1cm4gZmFsc2U7XG4gICAgICAgIGlmIChzdWNjZXNzKSB7XG4gICAgICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgICAgIDxBbGVydCBic1N0eWxlPSdzdWNjZXNzJyBvbkRpc21pc3M9e3RoaXMuaGFuZGxlRGlzbWlzc30+XG4gICAgICAgICAgICAgICAgICAgIDxwPntcIkwnaW5kaWNlIGRlbWFuZMOpIGEgw6l0w6kgZMOpbGl2csOpLlwifTwvcD5cbiAgICAgICAgICAgICAgICA8L0FsZXJ0PlxuICAgICAgICAgICAgKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGNvbnN0IHtjb2RlLCBlcnJvcn0gPSB0aGlzLnByb3BzO1xuICAgICAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgICAgICA8QWxlcnQgYnNTdHlsZT0nZGFuZ2VyJyBvbkRpc21pc3M9e3RoaXMuaGFuZGxlRGlzbWlzc30+XG4gICAgICAgICAgICAgICAgICAgIDxwPntcIkwnaW5kaWNlIGRlbWFuZMOpIG4nYSBwYXMgcHUgw6p0cmUgZMOpbGl2csOpLlwifTwvcD5cbiAgICAgICAgICAgICAgICAgICAgPHA+e1wiQ29kZSBcIn17Y29kZX08L3A+XG4gICAgICAgICAgICAgICAgICAgIHtlcnJvci5zdGF0dXMgJiYgPHA+e1wiRXJyZXVyIHNlcnZldXIgXCJ9e2Vycm9yLnN0YXR1c308L3A+fVxuICAgICAgICAgICAgICAgICAgICB7ZXJyb3IubWVzc2FnZSAmJiA8cD57ZXJyb3IudG9TdHJpbmcoKX08L3A+fVxuICAgICAgICAgICAgICAgIDwvQWxlcnQ+XG4gICAgICAgICAgICApO1xuICAgICAgICB9XG4gICAgfVxuICAgIGhhbmRsZURpc21pc3MgPSAoKSA9PiB7XG4gICAgICAgIHRoaXMucHJvcHMuZGlzcGF0Y2goe3R5cGU6IHRoaXMucHJvcHMuaGludFJlcXVlc3RGZWVkYmFja0NsZWFyZWQsIHBheWxvYWQ6IHt9fSk7XG4gICAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCB7XG4gICAgYWN0aW9uczoge1xuICAgICAgICByZXF1ZXN0SGludDogJ0hpbnQuUmVxdWVzdCcsXG4gICAgICAgIGhpbnRSZXF1ZXN0RnVsZmlsbGVkOiAnSGludC5SZXF1ZXN0LkZ1bGZpbGxlZCcsXG4gICAgICAgIGhpbnRSZXF1ZXN0UmVqZWN0ZWQ6ICdIaW50LlJlcXVlc3QuUmVqZWN0ZWQnLFxuICAgICAgICBoaW50UmVxdWVzdEZlZWRiYWNrQ2xlYXJlZDogJ0hpbnQuUmVxdWVzdC5GZWVkYmFja0NsZWFyZWQnLFxuICAgIH0sXG4gICAgYWN0aW9uUmVkdWNlcnM6IHtcbiAgICAgICAgaGludFJlcXVlc3RGdWxmaWxsZWQ6IGhpbnRSZXF1ZXN0RnVsZmlsbGVkUmVkdWNlcixcbiAgICAgICAgaGludFJlcXVlc3RSZWplY3RlZDogaGludFJlcXVlc3RSZWplY3RlZFJlZHVjZXIsXG4gICAgICAgIGhpbnRSZXF1ZXN0RmVlZGJhY2tDbGVhcmVkOiBoaW50UmVxdWVzdEZlZWRiYWNrQ2xlYXJlZFJlZHVjZXIsXG4gICAgfSxcbiAgICB2aWV3czoge1xuICAgICAgICBIaW50UmVxdWVzdEZlZWRiYWNrOiBjb25uZWN0KEhpbnRSZXF1ZXN0RmVlZGJhY2tTZWxlY3RvcikoSGludFJlcXVlc3RGZWVkYmFjaylcbiAgICB9LFxuICAgIHNhZ2E6IGZ1bmN0aW9uKiBoaW50c1NhZ2EgKCkge1xuICAgICAgICBjb25zdCBhY3Rpb25zID0geWllbGQgc2VsZWN0KCh7YWN0aW9uc30pID0+IGFjdGlvbnMpO1xuICAgICAgICB5aWVsZCB0YWtlRXZlcnkoYWN0aW9ucy5yZXF1ZXN0SGludCwgcmVxdWVzdEhpbnRTYWdhKTtcbiAgICB9XG59O1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL2FsZ29yZWFfcmVhY3RfdGFzay9oaW50c19idW5kbGUuanMiLCJcbmltcG9ydCB7Y2FsbCwgdGFrZX0gZnJvbSAncmVkdXgtc2FnYS9lZmZlY3RzJztcbmltcG9ydCB7YnVmZmVycywgZXZlbnRDaGFubmVsfSBmcm9tICdyZWR1eC1zYWdhJztcblxuZXhwb3J0IGZ1bmN0aW9uKiB3aW5kb3dIZWlnaHRNb25pdG9yU2FnYSAocGxhdGZvcm1BcGkpIHtcbiAgICBjb25zdCBjaGFubmVsID0gZXZlbnRDaGFubmVsKGVtaXQgPT4ge1xuICAgICAgICBmdW5jdGlvbiBvblJlc2l6ZSAoKSB7XG4gICAgICAgICAgICBjb25zdCBoZWlnaHQgPSB3aW5kb3cuZG9jdW1lbnQuYm9keS5jbGllbnRIZWlnaHQ7XG4gICAgICAgICAgICBlbWl0KHtoZWlnaHR9KTtcbiAgICAgICAgfVxuICAgICAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcigncmVzaXplJywgb25SZXNpemUpO1xuICAgICAgICByZXR1cm4gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgd2luZG93LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ3Jlc2l6ZScsIG9uUmVzaXplKTtcbiAgICAgICAgfTtcbiAgICB9LCBidWZmZXJzLnNsaWRpbmcoMSkpO1xuICAgIHRyeSB7XG4gICAgICAgIGxldCBsYXN0SGVpZ2h0O1xuICAgICAgICB3aGlsZSAodHJ1ZSkge1xuICAgICAgICAgICAgY29uc3Qge2hlaWdodH0gPSB5aWVsZCB0YWtlKGNoYW5uZWwpO1xuICAgICAgICAgICAgaWYgKGhlaWdodCAhPT0gbGFzdEhlaWdodCkge1xuICAgICAgICAgICAgICAgIHlpZWxkIGNhbGwocGxhdGZvcm1BcGkudXBkYXRlRGlzcGxheSwge2hlaWdodH0pO1xuICAgICAgICAgICAgICAgIGxhc3RIZWlnaHQgPSBoZWlnaHQ7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9IGZpbmFsbHkge1xuICAgICAgICBjaGFubmVsLmNsb3NlKCk7XG4gICAgfVxufVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL2FsZ29yZWFfcmVhY3RfdGFzay93aW5kb3dfaGVpZ2h0X21vbml0b3IuanMiLCIvLyBzdHlsZS1sb2FkZXI6IEFkZHMgc29tZSBjc3MgdG8gdGhlIERPTSBieSBhZGRpbmcgYSA8c3R5bGU+IHRhZ1xuXG4vLyBsb2FkIHRoZSBzdHlsZXNcbnZhciBjb250ZW50ID0gcmVxdWlyZShcIiEhLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvaW5kZXguanM/P3JlZi0tMS0xIS4vc3R5bGUuY3NzXCIpO1xuaWYodHlwZW9mIGNvbnRlbnQgPT09ICdzdHJpbmcnKSBjb250ZW50ID0gW1ttb2R1bGUuaWQsIGNvbnRlbnQsICcnXV07XG4vLyBQcmVwYXJlIGNzc1RyYW5zZm9ybWF0aW9uXG52YXIgdHJhbnNmb3JtO1xuXG52YXIgb3B0aW9ucyA9IHtcInNvdXJjZU1hcFwiOnRydWUsXCJobXJcIjp0cnVlfVxub3B0aW9ucy50cmFuc2Zvcm0gPSB0cmFuc2Zvcm1cbi8vIGFkZCB0aGUgc3R5bGVzIHRvIHRoZSBET01cbnZhciB1cGRhdGUgPSByZXF1aXJlKFwiIS4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvbGliL2FkZFN0eWxlcy5qc1wiKShjb250ZW50LCBvcHRpb25zKTtcbmlmKGNvbnRlbnQubG9jYWxzKSBtb2R1bGUuZXhwb3J0cyA9IGNvbnRlbnQubG9jYWxzO1xuLy8gSG90IE1vZHVsZSBSZXBsYWNlbWVudFxuaWYobW9kdWxlLmhvdCkge1xuXHQvLyBXaGVuIHRoZSBzdHlsZXMgY2hhbmdlLCB1cGRhdGUgdGhlIDxzdHlsZT4gdGFnc1xuXHRpZighY29udGVudC5sb2NhbHMpIHtcblx0XHRtb2R1bGUuaG90LmFjY2VwdChcIiEhLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvaW5kZXguanM/P3JlZi0tMS0xIS4vc3R5bGUuY3NzXCIsIGZ1bmN0aW9uKCkge1xuXHRcdFx0dmFyIG5ld0NvbnRlbnQgPSByZXF1aXJlKFwiISEuLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9pbmRleC5qcz8/cmVmLS0xLTEhLi9zdHlsZS5jc3NcIik7XG5cdFx0XHRpZih0eXBlb2YgbmV3Q29udGVudCA9PT0gJ3N0cmluZycpIG5ld0NvbnRlbnQgPSBbW21vZHVsZS5pZCwgbmV3Q29udGVudCwgJyddXTtcblx0XHRcdHVwZGF0ZShuZXdDb250ZW50KTtcblx0XHR9KTtcblx0fVxuXHQvLyBXaGVuIHRoZSBtb2R1bGUgaXMgZGlzcG9zZWQsIHJlbW92ZSB0aGUgPHN0eWxlPiB0YWdzXG5cdG1vZHVsZS5ob3QuZGlzcG9zZShmdW5jdGlvbigpIHsgdXBkYXRlKCk7IH0pO1xufVxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vc3JjL3N0eWxlLmNzc1xuLy8gbW9kdWxlIGlkID0gNTY2XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsImV4cG9ydHMgPSBtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCIuLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9saWIvY3NzLWJhc2UuanNcIikoZmFsc2UpO1xuLy8gaW1wb3J0c1xuXG5cbi8vIG1vZHVsZVxuZXhwb3J0cy5wdXNoKFttb2R1bGUuaWQsIFwiI2NvbnRhaW5lciB7XFxuICAgIHVzZXItc2VsZWN0OiBub25lO1xcbiAgICAtbW96LXVzZXItc2VsZWN0OiBub25lO1xcbiAgICAtd2Via2l0LXVzZXItc2VsZWN0OiBub25lO1xcbiAgICAtbXMtdXNlci1zZWxlY3Q6IG5vbmU7XFxuXFx0d2lkdGg6IDgwMHB4O1xcbn1cXG4udGFza0luc3RydWN0aW9ucyB7XFxuICAgIHRleHQtYWxpZ246IGp1c3RpZnk7XFxufVxcbi50YXNrSW5zdHJ1Y3Rpb25zIHRhYmxlLnByZSB7XFxuICAgIG1hcmdpbjogMTBweCBhdXRvO1xcbn1cXG4udGFza0luc3RydWN0aW9ucyB0YWJsZS5wcmUgdGQge1xcbiAgICBwYWRkaW5nOiA0cHggMTBweDtcXG59XFxuLnRhc2tJbnN0cnVjdGlvbnMgLmxpc3QtdW5zdHlsZWQge1xcbiAgICBwYWRkaW5nLWxlZnQ6IDMwcHg7XFxufVxcbi50ZXh0LWJvbGQge1xcbiAgICBmb250LXdlaWdodDogYm9sZDtcXG59XFxuLnRhc2tXcmFwcGVyIC50YXNrSW5zdHJ1Y3Rpb25zIHtcXG4gICAgcGFkZGluZy10b3A6IDMwcHg7XFxuICAgIHBvc2l0aW9uOiByZWxhdGl2ZTtcXG59XFxuLnRvcFBsYWluV29yZENvbnRhaW5lciB7XFxuICAgIG1hcmdpbjogMTBweCAyMHB4O1xcbiAgICBoZWlnaHQ6IDM0cHg7XFxufVxcbi50b3BQbGFpbldvcmQge1xcbiAgICBmb250LWZhbWlseTogTHVjaWRhIENvbnNvbGUsTW9uYWNvLG1vbm9zcGFjZTtcXG4gICAgZm9udC1zaXplOiAxOHB4O1xcbiAgICBkaXNwbGF5OiBpbmxpbmUtYmxvY2s7XFxuICAgIG1hcmdpbi1yaWdodDogMjBweDtcXG4gICAgYmFja2dyb3VuZC1jb2xvcjogI2ZmZjtcXG4gICAgYm9yZGVyOiAxcHggc29saWQgIzc3NztcXG4gICAgYm94LXNoYWRvdzogM3B4IDJweCAzcHggI2NjYztcXG4gICAgbGluZS1oZWlnaHQ6IDI3cHg7XFxuICAgIGxldHRlci1zcGFjaW5nOiAxMHB4O1xcbiAgICBwYWRkaW5nLWxlZnQ6IDVweDtcXG59XFxuLmhpbnRzRGlhbG9nIHtcXG4gIHdpZHRoOiA1MCU7XFxuICBtYXgtd2lkdGg6IDQwMHB4O1xcbiAgYmFja2dyb3VuZDogI2YwZjBmMDtcXG4gIGJvcmRlcjogMXB4IHNvbGlkIGJsYWNrO1xcbiAgYm9yZGVyLXJhZGl1czogM3B4O1xcbiAgcGFkZGluZzogNXB4O1xcbiAgcG9zaXRpb246IGFic29sdXRlO1xcbiAgYm90dG9tOiAxNXB4O1xcbiAgcmlnaHQ6IDE1cHg7XFxuICB6LWluZGV4OiAxO1xcbn1cXG4uaGludHNEaWFsb2cgcCB7XFxuICAgIG1hcmdpbi1ib3R0b206IDVweDtcXG59XFxuLmhpbnRzRGlhbG9nIGJ1dHRvbiArIGJ1dHRvbiB7XFxuICAgIG1hcmdpbi1sZWZ0OiAxMHB4O1xcbn1cXG4ua2V5VGFibGUge1xcbiAgICBtYXJnaW4tdG9wOiAxMHB4O1xcbn1cXG4ua2V5VGFibGUgc3BhbiB7XFxuICAgIHdpZHRoOiAyMHB4O1xcbiAgICBkaXNwbGF5OiBpbmxpbmUtYmxvY2s7XFxuICAgIG1hcmdpbi1yaWdodDogMnB4O1xcbiAgICB0ZXh0LWFsaWduOiBjZW50ZXI7XFxufVxcbi5rZXlUYWJsZSBzcGFuIGJ1dHRvbiB7XFxuICAgIHBhZGRpbmc6IDA7XFxuICAgIHdpZHRoOiAxMDAlO1xcbiAgICBib3JkZXI6IG5vbmU7XFxufVxcbi5rZXlUYWJsZSAua2V5VmFsdWUge1xcbiAgICBib3JkZXI6IDFweCBzb2xpZCAjY2NjO1xcbiAgICBib3JkZXItcmFkaXVzOiA0cHg7XFxuICAgIGN1cnNvcjogcG9pbnRlcjtcXG59XFxuLmtleVRhYmxlIC5rZXlWYWx1ZS5pcy1oaW50IHtcXG4gICAgYm9yZGVyOiBub25lO1xcbiAgICBjdXJzb3I6IGRlZmF1bHQ7XFxuICAgIGZvbnQtd2VpZ2h0OiBib2xkO1xcbn1cXG4ua2V5VGFibGUgLmtleVZhbHVlLmlzLWhpbnQtcmVxdWVzdCB7XFxuICAgIGJhY2tncm91bmQ6ICMwMDA7XFxuICAgIGNvbG9yOiAjZmZmO1xcbiAgICBmb250LXdlaWdodDogYm9sZDtcXG59XFxuLmlzLWhpbnQtbWlzbWF0Y2gge1xcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjZmY0NDQ0ICFpbXBvcnRhbnQ7XFxufVxcblxcbi5jaXBoZXJzQW5kUGxhaW5zIHtcXG4gICAgZm9udC1mYW1pbHk6IEx1Y2lkYSBDb25zb2xlLE1vbmFjbyxtb25vc3BhY2U7XFxuICAgIGZvbnQtc2l6ZTogMThweDtcXG59XFxuLmNpcGhlclRhYmxlIHtcXG4gICAgbWFyZ2luLXRvcDogMjBweDtcXG59XFxuLnBsYWluVGFibGUge1xcbiAgICBiYWNrZ3JvdW5kOiAjZWZlZmVmO1xcbn1cXG4uY2lwaGVyc0FuZFBsYWlucyBzcGFuIHtcXG4gICAgd2lkdGg6IDIwcHg7XFxuICAgIGRpc3BsYXk6IGlubGluZS1ibG9jaztcXG4gICAgbWFyZ2luLXJpZ2h0OiAycHg7XFxuICAgIHRleHQtYWxpZ246IGNlbnRlcjtcXG4gICAgYm9yZGVyOiAxcHggc29saWQgI2NjYztcXG4gICAgaGVpZ2h0OiAyN3B4O1xcbiAgICB2ZXJ0aWNhbC1hbGlnbjogYm90dG9tO1xcbn1cXG4uY2lwaGVyVGFibGUgc3BhbiB7Ym9yZGVyLWJvdHRvbTogbm9uZTt9XFxuLnBsYWluVGFibGUgc3BhbiB7Ym9yZGVyLXRvcDogbm9uZTt9XFxuLnBsYWluVGFibGUgLnBsYWluQ2hhciB7XFxuICAgIGJhY2tncm91bmQtY29sb3I6ICNmZmY7XFxuICAgIGJveC1zaGFkb3c6IDNweCAycHggM3B4ICNjY2M7XFxuICAgIGJvcmRlci10b3A6IDFweCBzb2xpZDtcXG4gICAgYm9yZGVyLWNvbG9yOiAjNzc3O1xcbiAgICBiYWNrZ3JvdW5kLWNsaXA6IGNvbnRlbnQtYm94O1xcbn1cXG4ucGxhaW5DaGFyICsgLnBsYWluQ2hhciB7XFxuICAgIG1hcmdpbi1sZWZ0OiAtNHB4O1xcbiAgICBib3JkZXItbGVmdC1jb2xvcjogdHJhbnNwYXJlbnQ7XFxuICAgIHdpZHRoOiAyNHB4O1xcbn1cXG4uaW5wdXRFcnJvciB7XFxuICAgIGJvcmRlci1jb2xvcjogcmVkO1xcbiAgICBib3gtc2hhZG93OiAwIDAgM3B4IHJlZCBpbnNldDtcXG59XFxuLnNlbGVjdFRleHQge1xcbiAgICBwb3NpdGlvbjogYWJzb2x1dGU7XFxuICAgIGN1cnNvcjogcG9pbnRlcjtcXG59XFxuLnNlbGVjdFRleHRJbm5lciB7XFxuICAgIGJhY2tncm91bmQtY29sb3I6ICNmZmY7XFxuICAgIGJvcmRlcjogMXB4IHNvbGlkICNhY2FjYWM7XFxufVxcbi5zZWxlY3RUZXh0LnNlbGVjdGVkIC5zZWxlY3RUZXh0SW5uZXIge1xcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjY2NjO1xcbn1cXG4uc2VsZWN0VGV4dElubmVyID4gc3BhbiB7XFxuICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcXG4gICAgdGV4dC1hbGlnbjogY2VudGVyO1xcbn1cXG4uc2VsZWN0VGV4dC1yb3dzIC5zZWxlY3RUZXh0SW5uZXIgPiBzcGFuIHtcXG4gICAgdG9wOiAtMXB4O1xcbn1cXG4uc2VsZWN0VGV4dC1jb2x1bW5zIC5zZWxlY3RUZXh0SW5uZXIgPiBzcGFuIHtcXG4gICAgbGVmdDogLTFweDtcXG59XFxuLnRhc2tIZWFkZXIge1xcblxcbn1cXG4uc3VibWl0QmxvY2ssIC5zY29yZUJsb2NrLCAuZmVlZGJhY2tCbG9jaywgLnNhdmVCbG9jayB7XFxuICAgIGRpc3BsYXk6IGlubGluZS1ibG9jaztcXG4gICAgbGluZS1oZWlnaHQ6IDM0cHg7XFxuICAgIG1hcmdpbjogMCAxMHB4IDAgMDtcXG59XFxuLnRhc2tIZWFkZXIgPiAqOmxhc3QtY2hpbGQge1xcbiAgICBtYXJnaW46IDA7XFxufVxcbi5zY29yZUJsb2NrLCAuZmVlZGJhY2tCbG9jayB7XFxuICAgIGJhY2tncm91bmQ6ICNmOGY4Zjg7XFxuICAgIHBhZGRpbmc6IDAgOHB4O1xcbn1cXG4uZmVlZGJhY2tCbG9jayB7XFxuICAgIGN1cnNvcjogcG9pbnRlcjtcXG59XFxuXCIsIFwiXCJdKTtcblxuLy8gZXhwb3J0c1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlcj8/cmVmLS0xLTEhLi9zcmMvc3R5bGUuY3NzXG4vLyBtb2R1bGUgaWQgPSA1Njdcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiXG5pbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IHtjb25uZWN0fSBmcm9tICdyZWFjdC1yZWR1eCc7XG5cbmltcG9ydCB7dXBkYXRlR3JpZEdlb21ldHJ5LCB1cGRhdGVHcmlkVmlzaWJsZVJvd3N9IGZyb20gJy4vdXRpbHMnO1xuXG5mdW5jdGlvbiBhcHBJbml0UmVkdWNlciAoc3RhdGUsIF9hY3Rpb24pIHtcbiAgcmV0dXJuIHsuLi5zdGF0ZSwgY2lwaGVyZWRUZXh0OiB7XG4gICAgY2VsbFdpZHRoOiAxNSxcbiAgICBjZWxsSGVpZ2h0OiAxOCxcbiAgICBzY3JvbGxUb3A6IDAsXG4gICAgbmJDZWxsczogMFxuICB9fTtcbn1cblxuZnVuY3Rpb24gdGFza0luaXRSZWR1Y2VyIChzdGF0ZSwgX2FjdGlvbikge1xuICBsZXQge2NpcGhlcmVkVGV4dCwgdGFza0RhdGE6IHtjaXBoZXJUZXh0fX0gPSBzdGF0ZTtcbiAgY2lwaGVyZWRUZXh0ID0gey4uLmNpcGhlcmVkVGV4dCwgY2VsbHM6IGNpcGhlclRleHQsIG5iQ2VsbHM6IGNpcGhlclRleHQubGVuZ3RofTtcbiAgY2lwaGVyZWRUZXh0ID0gdXBkYXRlR3JpZFZpc2libGVSb3dzKGNpcGhlcmVkVGV4dCk7XG4gIHJldHVybiB7Li4uc3RhdGUsIGNpcGhlcmVkVGV4dH07XG59XG5cbmZ1bmN0aW9uIGNpcGhlcmVkVGV4dFJlc2l6ZWRSZWR1Y2VyIChzdGF0ZSwge3BheWxvYWQ6IHt3aWR0aH19KSB7XG4gIGxldCB7Y2lwaGVyZWRUZXh0fSA9IHN0YXRlO1xuICBjaXBoZXJlZFRleHQgPSB7Li4uY2lwaGVyZWRUZXh0LCB3aWR0aCwgaGVpZ2h0OiA4ICogY2lwaGVyZWRUZXh0LmNlbGxIZWlnaHR9O1xuICBjaXBoZXJlZFRleHQgPSB1cGRhdGVHcmlkR2VvbWV0cnkoY2lwaGVyZWRUZXh0KTtcbiAgY2lwaGVyZWRUZXh0ID0gdXBkYXRlR3JpZFZpc2libGVSb3dzKGNpcGhlcmVkVGV4dCk7XG4gIHJldHVybiB7Li4uc3RhdGUsIGNpcGhlcmVkVGV4dH07XG59XG5cbmZ1bmN0aW9uIGNpcGhlcmVkVGV4dFNjcm9sbGVkUmVkdWNlciAoc3RhdGUsIHtwYXlsb2FkOiB7c2Nyb2xsVG9wfX0pIHtcbiAgbGV0IHtjaXBoZXJlZFRleHR9ID0gc3RhdGU7XG4gIGNpcGhlcmVkVGV4dCA9IHsuLi5jaXBoZXJlZFRleHQsIHNjcm9sbFRvcH07XG4gIGNpcGhlcmVkVGV4dCA9IHVwZGF0ZUdyaWRWaXNpYmxlUm93cyhjaXBoZXJlZFRleHQpO1xuICByZXR1cm4gey4uLnN0YXRlLCBjaXBoZXJlZFRleHR9O1xufVxuXG5mdW5jdGlvbiBDaXBoZXJUZXh0Vmlld1NlbGVjdG9yIChzdGF0ZSkge1xuICBjb25zdCB7YWN0aW9ucywgY2lwaGVyZWRUZXh0fSA9IHN0YXRlO1xuICBjb25zdCB7Y2lwaGVyZWRUZXh0UmVzaXplZCwgY2lwaGVyZWRUZXh0U2Nyb2xsZWR9ID0gYWN0aW9ucztcbiAgY29uc3Qge3dpZHRoLCBoZWlnaHQsIGNlbGxXaWR0aCwgY2VsbEhlaWdodCwgYm90dG9tLCBwYWdlUm93cywgcGFnZUNvbHVtbnMsIHZpc2libGV9ID0gY2lwaGVyZWRUZXh0O1xuICByZXR1cm4ge1xuICAgIGNpcGhlcmVkVGV4dFJlc2l6ZWQsIGNpcGhlcmVkVGV4dFNjcm9sbGVkLFxuICAgIHdpZHRoLCBoZWlnaHQsIHZpc2libGVSb3dzOiB2aXNpYmxlLnJvd3MsIGNlbGxXaWR0aCwgY2VsbEhlaWdodCwgYm90dG9tLCBwYWdlUm93cywgcGFnZUNvbHVtbnNcbiAgfTtcbn1cblxuY2xhc3MgQ2lwaGVyVGV4dFZpZXcgZXh0ZW5kcyBSZWFjdC5QdXJlQ29tcG9uZW50IHtcblxuICByZW5kZXIgKCkge1xuICAgIGNvbnN0IHt3aWR0aCwgaGVpZ2h0LCB2aXNpYmxlUm93cywgY2VsbFdpZHRoLCBjZWxsSGVpZ2h0LCBib3R0b219ID0gdGhpcy5wcm9wcztcbiAgICBjb25zb2xlLmxvZyh2aXNpYmxlUm93cyk7XG4gICAgcmV0dXJuIChcbiAgICAgIDxkaXY+XG4gICAgICAgIDxkaXYgcmVmPXt0aGlzLnJlZlRleHRCb3h9IG9uU2Nyb2xsPXt0aGlzLm9uU2Nyb2xsfSBzdHlsZT17e3Bvc2l0aW9uOiAncmVsYXRpdmUnLCB3aWR0aDogd2lkdGggJiYgYCR7d2lkdGh9cHhgLCBoZWlnaHQ6IGhlaWdodCAmJiBgJHtoZWlnaHR9cHhgLCBvdmVyZmxvd1k6ICdzY3JvbGwnfX0+XG4gICAgICAgICAgeyh2aXNpYmxlUm93c3x8W10pLm1hcCgoe2luZGV4LCBjb2x1bW5zfSkgPT5cbiAgICAgICAgICAgIDxkaXYga2V5PXtpbmRleH0gc3R5bGU9e3twb3NpdGlvbjogJ2Fic29sdXRlJywgdG9wOiBgJHtpbmRleCAqIGNlbGxIZWlnaHR9cHhgfX0+XG4gICAgICAgICAgICAgIHtjb2x1bW5zLm1hcCgoe2luZGV4LCBjZWxsfSkgPT5cbiAgICAgICAgICAgICAgICA8c3BhbiBrZXk9e2luZGV4fSBzdHlsZT17e3Bvc2l0aW9uOiAnYWJzb2x1dGUnLCBsZWZ0OiBgJHtpbmRleCAqIGNlbGxXaWR0aH1weGAsIHdpZHRoOiBgJHtjZWxsV2lkdGh9cHhgLCBoZWlnaHQ6IGAke2NlbGxIZWlnaHR9cHhgfX0+XG4gICAgICAgICAgICAgICAgICB7Y2VsbCB8fCAnICd9XG4gICAgICAgICAgICAgICAgPC9zcGFuPil9XG4gICAgICAgICAgICA8L2Rpdj4pfVxuICAgICAgICAgIDxkaXYgc3R5bGU9e3twb3NpdGlvbjogJ2Fic29sdXRlJywgdG9wOiBgJHtib3R0b219cHhgLCB3aWR0aDogJzFweCcsIGhlaWdodDogJzFweCd9fS8+XG4gICAgICAgIDwvZGl2PlxuICAgICAgPC9kaXY+XG4gICAgKTtcbiAgfVxuXG4gIHJlZlRleHRCb3ggPSAoZWxlbWVudCkgPT4ge1xuICAgIHRoaXMuX3RleHRCb3ggPSBlbGVtZW50O1xuICAgIGNvbnN0IHdpZHRoID0gZWxlbWVudC5jbGllbnRXaWR0aDtcbiAgICBjb25zdCBoZWlnaHQgPSBlbGVtZW50LmNsaWVudEhlaWdodDtcbiAgICB0aGlzLnByb3BzLmRpc3BhdGNoKHt0eXBlOiB0aGlzLnByb3BzLmNpcGhlcmVkVGV4dFJlc2l6ZWQsIHBheWxvYWQ6IHt3aWR0aCwgaGVpZ2h0fX0pO1xuICB9O1xuXG4gIG9uU2Nyb2xsID0gKCkgPT4ge1xuICAgIGNvbnN0IHNjcm9sbFRvcCA9IHRoaXMuX3RleHRCb3guc2Nyb2xsVG9wO1xuICAgIHRoaXMucHJvcHMuZGlzcGF0Y2goe3R5cGU6IHRoaXMucHJvcHMuY2lwaGVyZWRUZXh0U2Nyb2xsZWQsIHBheWxvYWQ6IHtzY3JvbGxUb3B9fSk7XG4gIH07XG5cbn1cblxuZXhwb3J0IGRlZmF1bHQge1xuICBhY3Rpb25zOiB7XG4gICAgY2lwaGVyZWRUZXh0UmVzaXplZDogJ0NpcGhlcmVkVGV4dC5SZXNpemVkJyAvKiB7d2lkdGg6IG51bWJlciwgaGVpZ2h0OiBudW1iZXJ9ICovLFxuICAgIGNpcGhlcmVkVGV4dFNjcm9sbGVkOiAnQ2lwaGVyZWRUZXh0LlNjcm9sbGVkJyAvKiB7c2Nyb2xsVG9wOiBudW1iZXJ9ICovLFxuICB9LFxuICBhY3Rpb25SZWR1Y2Vyczoge1xuICAgIGFwcEluaXQ6IGFwcEluaXRSZWR1Y2VyLFxuICAgIHRhc2tJbml0OiB0YXNrSW5pdFJlZHVjZXIsXG4gICAgY2lwaGVyZWRUZXh0UmVzaXplZDogY2lwaGVyZWRUZXh0UmVzaXplZFJlZHVjZXIsXG4gICAgY2lwaGVyZWRUZXh0U2Nyb2xsZWQ6IGNpcGhlcmVkVGV4dFNjcm9sbGVkUmVkdWNlcixcbiAgfSxcbiAgdmlld3M6IHtcbiAgICBDaXBoZXJlZFRleHQ6IGNvbm5lY3QoQ2lwaGVyVGV4dFZpZXdTZWxlY3RvcikoQ2lwaGVyVGV4dFZpZXcpLFxuICB9XG59O1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL2NpcGhlcmVkX3RleHRfYnVuZGxlLmpzIiwiXG5pbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IHtjb25uZWN0fSBmcm9tICdyZWFjdC1yZWR1eCc7XG5pbXBvcnQge3JhbmdlfSBmcm9tICdyYW5nZSc7XG5pbXBvcnQgc2VlZHJhbmRvbSBmcm9tICdzZWVkcmFuZG9tJztcblxuZnVuY3Rpb24gYXBwSW5pdFJlZHVjZXIgKHN0YXRlLCBfYWN0aW9uKSB7XG4gIHJldHVybiB7Li4uc3RhdGUsIGZyZXF1ZW5jeUFuYWx5c2lzOiB7fX07XG59XG5cbmZ1bmN0aW9uIGZyZXF1ZW5jeUFuYWx5c2lzTGF0ZVJlZHVjZXIgKHN0YXRlKSB7XG4gIGlmIChzdGF0ZS5mcmVxdWVuY3lBbmFseXNpcyAmJiBzdGF0ZS50YXNrRGF0YSkge1xuICAgIGxldCB7dGFza0RhdGE6IHthbHBoYWJldCwgcmVmZXJlbmNlRnJlcXVlbmNpZXMsIGZyZXF1ZW5jaWVzLCBjaXBoZXJUZXh0fSwgZnJlcXVlbmN5QW5hbHlzaXN9ID0gc3RhdGU7XG4gICAgbGV0IHRleHRGcmVxdWVuY2llcyA9IFtdO1xuICAgIGlmIChjaXBoZXJUZXh0ICYmIGFscGhhYmV0KSB7XG4gICAgICBjb25zdCBmcmVxTWFwID0gbmV3IE1hcChhbHBoYWJldC5zcGxpdCgnJykubWFwKGMgPT4gW2MsIDBdKSk7XG4gICAgICBjb3VudFN5bWJvbHMoZnJlcU1hcCwgY2lwaGVyVGV4dCwgMCwgY2lwaGVyVGV4dC5sZW5ndGgtMSk7XG4gICAgICB0ZXh0RnJlcXVlbmNpZXMgPSBub3JtYWxpemVBbmRTb3J0RnJlcXVlbmNpZXMoZnJlcU1hcC5lbnRyaWVzKCkpO1xuICAgIH0gXG4gICAgZnJlcXVlbmN5QW5hbHlzaXMgPSB7Li4uZnJlcXVlbmN5QW5hbHlzaXMsIHRleHRGcmVxdWVuY2llc307XG4gICAgc3RhdGUgPSB7Li4uc3RhdGUsIGZyZXF1ZW5jeUFuYWx5c2lzfTtcbiAgfVxuICByZXR1cm4gc3RhdGU7XG59XG5cbmZ1bmN0aW9uIGNvdW50U3ltYm9scyAobWFwLCB0ZXh0LCBzdGFydFBvcywgZW5kUG9zKSB7XG4gIGZvciAobGV0IHBvcyA9IHN0YXJ0UG9zOyBwb3MgPD0gZW5kUG9zOyBwb3MgKz0gMSkge1xuICAgIGNvdW50U3ltYm9sKG1hcCwgdGV4dFtwb3NdKTtcbiAgfVxufVxuXG5mdW5jdGlvbiBjb3VudFN5bWJvbCAobWFwLCBjaGFyKSB7XG4gIGNvbnN0IGNvdW50ID0gbWFwLmdldChjaGFyKTtcbiAgaWYgKGNvdW50ICE9PSB1bmRlZmluZWQpIHtcbiAgICBtYXAuc2V0KGNoYXIsIGNvdW50ICsgMSk7XG4gIH1cbn1cblxuZnVuY3Rpb24gc3VtRnJlcXVlbmNpZXMgKGRzdCwgYWRkKSB7XG4gIGZvciAobGV0IGkgPSAwOyBpIDwgZHN0Lmxlbmd0aDsgaSArPSAxKSB7XG4gICAgZHN0W2ldICs9IGFkZFtpXTtcbiAgfVxufVxuXG5mdW5jdGlvbiBub3JtYWxpemVBbmRTb3J0RnJlcXVlbmNpZXMgKGVudHJpZXMpIHtcbiAgY29uc3QgcmVzdWx0ID0gQXJyYXkuZnJvbShlbnRyaWVzKTtcbiAgY29uc3QgdG90YWxDb3VudCA9IHJlc3VsdC5yZWR1Y2UoKGEsIHgpID0+IGEgKyB4WzFdLCAwKTtcbiAgcmVzdWx0LnNvcnQoZnVuY3Rpb24gKHMxLCBzMikge1xuICAgICBjb25zdCBwMSA9IHMxWzFdLCBwMiA9IHMyWzFdO1xuICAgICByZXR1cm4gcDEgPiBwMiA/IC0xIDogKHAxIDwgcDIgPyAxIDogMCk7XG4gIH0pO1xuICByZXR1cm4gcmVzdWx0Lm1hcCgoW3N5bWJvbCwgY291bnRdKSA9PiAoe3N5bWJvbCwgcHJvYmE6IGNvdW50IC8gdG90YWxDb3VudH0pKTtcbn1cblxuZnVuY3Rpb24gRnJlcXVlbmN5QW5hbHlzaXNTZWxlY3RvciAoc3RhdGUpIHtcbiAgY29uc3Qge3Rhc2tEYXRhOiB7YWxwaGFiZXQsIHJlZmVyZW5jZUZyZXF1ZW5jaWVzfSwgZnJlcXVlbmN5QW5hbHlzaXM6IHt0ZXh0RnJlcXVlbmNpZXN9fSA9IHN0YXRlO1xuICBjb25zdCBzY2FsZSA9IDMwIC8gcmVmZXJlbmNlRnJlcXVlbmNpZXMucmVkdWNlKChhLCB4KSA9PiBNYXRoLm1heChhLCB4LnByb2JhKSwgMCk7XG4gIHJldHVybiB7XG4gICAgYWxwaGFiZXRTaXplOiBhbHBoYWJldC5sZW5ndGgsXG4gICAgcmVmZXJlbmNlRnJlcXVlbmNpZXMsXG4gICAgdGV4dEZyZXF1ZW5jaWVzLFxuICAgIHNjYWxlXG4gIH07XG59XG5cbmNsYXNzIEZyZXF1ZW5jeUFuYWx5c2lzVmlldyBleHRlbmRzIFJlYWN0LlB1cmVDb21wb25lbnQge1xuICByZW5kZXIgKCkge1xuICAgIGNvbnN0IHthbHBoYWJldFNpemUsIHJlZmVyZW5jZUZyZXF1ZW5jaWVzLCB0ZXh0RnJlcXVlbmNpZXMsIHNjYWxlfSA9IHRoaXMucHJvcHM7XG4gICAgaWYgKCFyZWZlcmVuY2VGcmVxdWVuY2llcykgcmV0dXJuIGZhbHNlO1xuICAgIHJldHVybiAoXG4gICAgICA8ZGl2IGNsYXNzTmFtZT0nY2xlYXJmaXgnPlxuICAgICAgICA8ZGl2IHN0eWxlPXt7ZmxvYXQ6ICdsZWZ0Jywgd2lkdGg6ICcxMDBweCcsIGhlaWdodDogJzEwOHB4JywgZm9udFNpemU6ICcxMHB4JywgbGluZUhlaWdodDogJzEwcHgnLCBwb3NpdGlvbjogJ3JlbGF0aXZlJ319PlxuICAgICAgICAgIDxkaXYgc3R5bGU9e3toZWlnaHQ6ICczMHB4JywgcG9zaXRpb246ICdhYnNvbHV0ZScsIHRvcDogJzBweCd9fT5cbiAgICAgICAgICAgIHtcIkZyw6lxdWVuY2VzIGRhbnMgbGUgdGV4dGUgOlwifVxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgIDxkaXYgc3R5bGU9e3toZWlnaHQ6ICcyMHB4JywgcG9zaXRpb246ICdhYnNvbHV0ZScsIHRvcDogJzMycHgnfX0+XG4gICAgICAgICAgICB7XCJTeW1ib2xlcyBkdSB0ZXh0ZSA6XCJ9XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgPGRpdiBzdHlsZT17e2hlaWdodDogJzIwcHgnLCBwb3NpdGlvbjogJ2Fic29sdXRlJywgdG9wOiAnNTZweCd9fT5cbiAgICAgICAgICAgIHtcIlN1YnN0aXR1dGlvbnMgOlwifVxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgIDxkaXYgc3R5bGU9e3toZWlnaHQ6ICczMHB4JywgcG9zaXRpb246ICdhYnNvbHV0ZScsIHRvcDogJzc4cHgnfX0+XG4gICAgICAgICAgICB7XCJGcsOpcXVlbmNlcyBlbiBmcmFuw6dhaXMgOlwifVxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICA8L2Rpdj5cbiAgICAgICAge3JhbmdlKDAsIGFscGhhYmV0U2l6ZSkubWFwKGluZGV4ID0+XG4gICAgICAgICAgPGRpdiBrZXk9e2luZGV4fSBzdHlsZT17e2Zsb2F0OiAnbGVmdCcsIHdpZHRoOiAnMjBweCcsIGhlaWdodDogJzEwOHB4JywgcG9zaXRpb246ICdyZWxhdGl2ZSd9fT5cbiAgICAgICAgICAgIDxUZXh0RnJlcXVlbmN5Qm94IGluZGV4PXtpbmRleH0gY2VsbD17dGV4dEZyZXF1ZW5jaWVzW2luZGV4XX0gc2NhbGU9e3NjYWxlfSAvPlxuICAgICAgICAgICAgPFJlZmVyZW5jZUZyZXF1ZW5jeUJveCBpbmRleD17aW5kZXh9IGNlbGw9e3JlZmVyZW5jZUZyZXF1ZW5jaWVzW2luZGV4XX0gc2NhbGU9e3NjYWxlfSAvPlxuICAgICAgICAgIDwvZGl2Pil9XG4gICAgICA8L2Rpdj5cbiAgICApO1xuICB9XG59XG5cbmNsYXNzIFRleHRGcmVxdWVuY3lCb3ggZXh0ZW5kcyBSZWFjdC5QdXJlQ29tcG9uZW50IHtcbiAgcmVuZGVyICgpIHtcbiAgICBjb25zdCB7Y2VsbCwgc2NhbGV9ID0gdGhpcy5wcm9wcztcbiAgICBpZiAoIWNlbGwpIHJldHVybiBmYWxzZTtcbiAgICByZXR1cm4gKFxuICAgICAgPGRpdiBzdHlsZT17e3Bvc2l0aW9uOiAnYWJzb2x1dGUnLCB0b3A6ICcwcHgnfX0+XG4gICAgICAgIDxkaXYgc3R5bGU9e3t3aWR0aDogJzIwcHgnLCBoZWlnaHQ6ICczMHB4JywgZGlzcGxheTogJ3RhYmxlLWNlbGwnLCB2ZXJ0aWNhbEFsaWduOiAnYm90dG9tJ319PlxuICAgICAgICAgIDxkaXYgc3R5bGU9e3toZWlnaHQ6IGAke01hdGgubWluKDMwLCBNYXRoLnJvdW5kKGNlbGwucHJvYmEgKiBzY2FsZSkpfXB4YCwgd2lkdGg6ICc4cHgnLCBtYXJnaW5MZWZ0OiAnNXB4JywgYmFja2dyb3VuZDogJ2JsYWNrJ319Lz5cbiAgICAgICAgPC9kaXY+XG4gICAgICAgIDxkaXYgc3R5bGU9e3t3aWR0aDogJzE3cHgnLCBoZWlnaHQ6ICcyMHB4JywgYm9yZGVyOiAnMXB4IHNvbGlkIHdoaXRlJywgbWFyZ2luQm90dG9tOiAnMnB4JywgdGV4dEFsaWduOiAnY2VudGVyJ319PlxuICAgICAgICAgIHtjZWxsLnN5bWJvbH1cbiAgICAgICAgPC9kaXY+XG4gICAgICA8L2Rpdj5cbiAgICApO1xuICB9XG59XG5cbmNsYXNzIFJlZmVyZW5jZUZyZXF1ZW5jeUJveCBleHRlbmRzIFJlYWN0LlB1cmVDb21wb25lbnQge1xuICByZW5kZXIgKCkge1xuICAgIGNvbnN0IHtjZWxsLCBzY2FsZX0gPSB0aGlzLnByb3BzO1xuICAgIHJldHVybiAoXG4gICAgICA8ZGl2IHN0eWxlPXt7cG9zaXRpb246ICdhYnNvbHV0ZScsIHRvcDogJzU2cHgnfX0+XG4gICAgICAgIDxkaXYgc3R5bGU9e3t3aWR0aDogJzE3cHgnLCBoZWlnaHQ6ICcyMHB4JywgYm9yZGVyOiAnMXB4IHNvbGlkIGJsYWNrJywgbWFyZ2luQm90dG9tOiAnMnB4JywgdGV4dEFsaWduOiAnY2VudGVyJ319PlxuICAgICAgICAgIHtjZWxsLnN5bWJvbH1cbiAgICAgICAgPC9kaXY+XG4gICAgICAgIDxkaXYgc3R5bGU9e3t3aWR0aDogJzIwcHgnLCBoZWlnaHQ6ICczMHB4JywgdmVydGljYWxBbGlnbjogJ3RvcCd9fT5cbiAgICAgICAgICA8ZGl2IHN0eWxlPXt7aGVpZ2h0OiBgJHtNYXRoLnJvdW5kKGNlbGwucHJvYmEgKiBzY2FsZSl9cHhgLCB3aWR0aDogJzhweCcsIG1hcmdpbkxlZnQ6ICc1cHgnLCBiYWNrZ3JvdW5kOiAnYmxhY2snfX0vPlxuICAgICAgICA8L2Rpdj5cbiAgICAgIDwvZGl2PlxuICAgICk7XG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQge1xuICBhY3Rpb25SZWR1Y2Vyczoge1xuICAgIGFwcEluaXQ6IGFwcEluaXRSZWR1Y2VyXG4gIH0sXG4gIGxhdGVSZWR1Y2VyOiBmcmVxdWVuY3lBbmFseXNpc0xhdGVSZWR1Y2VyLFxuICB2aWV3czoge1xuICAgIEZyZXF1ZW5jeUFuYWx5c2lzOiBjb25uZWN0KEZyZXF1ZW5jeUFuYWx5c2lzU2VsZWN0b3IpKEZyZXF1ZW5jeUFuYWx5c2lzVmlldylcbiAgfSxcbn07XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvZnJlcXVlbmN5X2FuYWx5c2lzX2J1bmRsZS5qcyIsIi8qIChpZ25vcmVkKSAqL1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIGNyeXB0byAoaWdub3JlZClcbi8vIG1vZHVsZSBpZCA9IDU3OFxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJcbmltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQge2Nvbm5lY3R9IGZyb20gJ3JlYWN0LXJlZHV4JztcbmltcG9ydCB7QnV0dG9ufSBmcm9tICdyZWFjdC1ib290c3RyYXAnO1xuaW1wb3J0IHVwZGF0ZSBmcm9tICdpbW11dGFiaWxpdHktaGVscGVyJztcbmltcG9ydCB7ZGVsYXl9IGZyb20gJ3JlZHV4LXNhZ2EnO1xuaW1wb3J0IHtzZWxlY3QsIHRha2VMYXRlc3QsIHB1dH0gZnJvbSAncmVkdXgtc2FnYS9lZmZlY3RzJztcblxuaW1wb3J0IHthcHBseVJvdG9ycywgZ2V0Um90b3JTaGlmdH0gZnJvbSAnLi91dGlscyc7XG5cbmZ1bmN0aW9uIGFwcEluaXRSZWR1Y2VyIChzdGF0ZSwgX2FjdGlvbikge1xuICByZXR1cm4gey4uLnN0YXRlLCBzY2hlZHVsaW5nOiB7XG4gICAgc3RhdHVzOiAnc3RhcnQnLFxuICAgIHNwZWVkOiAxLjAsXG4gICAgcG9zaXRpb246IDAsXG4gICAgc2hpZnRzOiBbXSxcbiAgICBzdGFydFBvc2l0aW9uOiAwLFxuICAgIGVuZFBvc2l0aW9uOiAwLFxuICAgIGN1cnJlbnRUcmFjZTogW10sXG4gIH19O1xufVxuXG5mdW5jdGlvbiB0YXNrSW5pdFJlZHVjZXIgKHN0YXRlLCBfYWN0aW9uKSB7XG4gIGxldCB7c2NoZWR1bGluZywgdGFza0RhdGE6IHtjaXBoZXJUZXh0fX0gPSBzdGF0ZTtcbiAgc2NoZWR1bGluZyA9IHsuLi5zY2hlZHVsaW5nLCBlbmRQb3NpdGlvbjogY2lwaGVyVGV4dC5sZW5ndGggLSAxfTtcbiAgcmV0dXJuIHsuLi5zdGF0ZSwgc2NoZWR1bGluZ307XG59XG5cbmZ1bmN0aW9uIHNjaGVkdWxpbmdTdGF0dXNDaGFuZ2VkUmVkdWNlciAoc3RhdGUsIHtwYXlsb2FkOiB7c3RhdHVzfX0pIHtcbiAgY29uc3Qge3NjaGVkdWxpbmd9ID0gc3RhdGU7XG4gIGNvbnN0IGNoYW5nZXMgPSB7c3RhdHVzOiB7JHNldDogc3RhdHVzfX07XG4gIGlmIChzdGF0dXMgPT09ICdzdGFydCcpIHtcbiAgICBjaGFuZ2VzLnBvc2l0aW9uID0geyRzZXQ6IHNjaGVkdWxpbmcuc3RhcnRQb3NpdGlvbn07XG4gIH0gZWxzZSBpZiAoc3RhdHVzID09PSAnZW5kJykge1xuICAgIGNoYW5nZXMucG9zaXRpb24gPSB7JHNldDogc2NoZWR1bGluZy5lbmRQb3NpdGlvbn07XG4gIH0gZWxzZSBpZiAoc3RhdHVzID09PSAncGxheScpIHtcbiAgICBpZiAoc2NoZWR1bGluZy5wb3NpdGlvbiA9PT0gc2NoZWR1bGluZy5lbmRQb3NpdGlvbikge1xuICAgICAgY2hhbmdlcy5wb3NpdGlvbiA9IHskc2V0OiBzY2hlZHVsaW5nLnN0YXJ0UG9zaXRpb259O1xuICAgIH1cbiAgfVxuICByZXR1cm4gdXBkYXRlKHN0YXRlLCB7c2NoZWR1bGluZzogY2hhbmdlc30pO1xufVxuXG5mdW5jdGlvbiBzY2hlZHVsaW5nU3RlcEJhY2t3YXJkUmVkdWNlciAoc3RhdGUsIF9hY3Rpb24pIHtcbiAgY29uc3Qge3NjaGVkdWxpbmc6IHtwb3NpdGlvbn19ID0gc3RhdGU7XG4gIGlmIChwb3NpdGlvbiA9PT0gMCkgcmV0dXJuIHN0YXRlO1xuICByZXR1cm4gdXBkYXRlKHN0YXRlLCB7c2NoZWR1bGluZzoge1xuICAgIHN0YXR1czogeyRzZXQ6ICdwYXVzZSd9LFxuICAgIHBvc2l0aW9uOiB7JHNldDogcG9zaXRpb24gLSAxfVxuICB9fSk7XG59XG5cbmZ1bmN0aW9uIHNjaGVkdWxpbmdTdGVwRm9yd2FyZFJlZHVjZXIgKHN0YXRlLCBfYWN0aW9uKSB7XG4gIGNvbnN0IHtzY2hlZHVsaW5nOiB7cG9zaXRpb24sIGVuZFBvc2l0aW9ufX0gPSBzdGF0ZTtcbiAgaWYgKHBvc2l0aW9uID09PSBlbmRQb3NpdGlvbikgcmV0dXJuIHN0YXRlO1xuICByZXR1cm4gdXBkYXRlKHN0YXRlLCB7c2NoZWR1bGluZzoge1xuICAgIHN0YXR1czogeyRzZXQ6ICdwYXVzZSd9LFxuICAgIHBvc2l0aW9uOiB7JHNldDogcG9zaXRpb24gKyAxfVxuICB9fSk7XG59XG5cbmZ1bmN0aW9uIHNjaGVkdWxpbmdKdW1wUmVkdWNlciAoc3RhdGUsIHtwYXlsb2FkOiB7cG9zaXRpb259fSkge1xuICByZXR1cm4gdXBkYXRlKHN0YXRlLCB7c2NoZWR1bGluZzoge1xuICAgIHN0YXR1czogeyRzZXQ6ICdwYXVzZSd9LFxuICAgIHBvc2l0aW9uOiB7JHNldDogcG9zaXRpb259XG4gIH19KTtcbn1cblxuZnVuY3Rpb24gc2NoZWR1bGluZ1RpY2tSZWR1Y2VyIChzdGF0ZSwgX2FjdGlvbikge1xuICBjb25zdCB7c2NoZWR1bGluZzoge3Bvc2l0aW9uLCBlbmRQb3NpdGlvbn19ID0gc3RhdGU7XG4gIGlmIChwb3NpdGlvbiA9PT0gZW5kUG9zaXRpb24pIHtcbiAgICByZXR1cm4gdXBkYXRlKHN0YXRlLCB7c2NoZWR1bGluZzoge1xuICAgICAgc3RhdHVzOiB7JHNldDogJ2VuZCd9XG4gICAgfX0pO1xuICB9XG4gIHJldHVybiB1cGRhdGUoc3RhdGUsIHtzY2hlZHVsaW5nOiB7XG4gICAgcG9zaXRpb246IHskc2V0OiBwb3NpdGlvbiArIDF9XG4gIH19KTtcbn1cblxuZnVuY3Rpb24gc2NoZWR1bGluZ0xhdGVSZWR1Y2VyIChzdGF0ZSkge1xuICBjb25zdCB7dGFza0RhdGEsIHJvdG9ycywgc2NoZWR1bGluZ30gPSBzdGF0ZTtcbiAgaWYgKCF0YXNrRGF0YSkge1xuICAgIHJldHVybiBzdGF0ZTtcbiAgfVxuICBjb25zdCB7YWxwaGFiZXQsIGNpcGhlclRleHR9ID0gdGFza0RhdGE7XG4gIGNvbnN0IHtwb3NpdGlvbn0gPSBzY2hlZHVsaW5nO1xuICAvKiBDb21wdXRlIHRoZSByb3RvciBzaGlmdHMgYXQgdGhlIGN1cnJlbnQgcG9zaXRpb24gKi9cbiAgY29uc3Qgc2hpZnRzID0gcm90b3JzLm1hcChyb3RvciA9PiBnZXRSb3RvclNoaWZ0KHJvdG9yLCBwb3NpdGlvbikpO1xuICBjb25zdCByYW5rID0gYWxwaGFiZXQuaW5kZXhPZihjaXBoZXJUZXh0W3Bvc2l0aW9uXSk7XG4gIC8qIEFwcGx5IHRoZSByb3RvcnMgYXQgdGhlIGN1cnJlbnQgcG9zaXRpb24gdG8gb2J0YWluIGEgdHJhY2UgKGxpc3Qgb2Ygcm90b3JcbiAgICAgY2VsbHMgdXNlZCBkdXJpbmcgZGVjb2RpbmcpLCB0byBiZSBoaWdobGlnaHRlZCBieSB0aGUgcm90b3Igdmlld3MuICovXG4gIGNvbnN0IGN1cnJlbnRUcmFjZSA9IHJhbmsgPT09IC0xID8gbnVsbCA6IGFwcGx5Um90b3JzKHJvdG9ycywgcG9zaXRpb24sIHJhbmspLnRyYWNlO1xuICByZXR1cm4gdXBkYXRlKHN0YXRlLCB7c2NoZWR1bGluZzoge1xuICAgIHNoaWZ0czogeyRzZXQ6IHNoaWZ0c30sIGN1cnJlbnRUcmFjZTogeyRzZXQ6IGN1cnJlbnRUcmFjZX1cbiAgfX0pO1xufVxuXG5mdW5jdGlvbiogc2NoZWR1bGluZ1NhZ2EgKCkge1xuICBjb25zdCB7c2NoZWR1bGluZ1RpY2t9ID0geWllbGQgc2VsZWN0KCh7YWN0aW9uc30pID0+IGFjdGlvbnMpO1xuICBjb25zdCBzdGF0dXNDaGFuZ2luZ0FjdGlvbnMgPSB5aWVsZCBzZWxlY3QoKHthY3Rpb25zfSkgPT4gWydzY2hlZHVsaW5nU3RhdHVzQ2hhbmdlZCcsICdzY2hlZHVsaW5nU3RlcEJhY2t3YXJkJywgJ3NjaGVkdWxpbmdTdGVwRm9yd2FyZCcsICdzY2hlZHVsaW5nSnVtcCddLm1hcChuYW1lID0+IGFjdGlvbnNbbmFtZV0pKTtcbiAgeWllbGQgdGFrZUxhdGVzdChzdGF0dXNDaGFuZ2luZ0FjdGlvbnMsIGZ1bmN0aW9uKiAoKSB7XG4gICAgbGV0IHN0YXR1cyA9IHlpZWxkIHNlbGVjdCgoe3NjaGVkdWxpbmc6IHtzdGF0dXN9fSkgPT4gc3RhdHVzKTtcbiAgICBpZiAoc3RhdHVzID09PSAncGxheScpIHtcbiAgICAgIHdoaWxlICh0cnVlKSB7XG4gICAgICAgIHlpZWxkIHB1dCh7dHlwZTogc2NoZWR1bGluZ1RpY2t9KTtcbiAgICAgICAgc3RhdHVzID0geWllbGQgc2VsZWN0KCh7c2NoZWR1bGluZzoge3N0YXR1c319KSA9PiBzdGF0dXMpO1xuICAgICAgICBpZiAoJ3BsYXknICE9PSBzdGF0dXMpIHtcbiAgICAgICAgICByZXR1cm47IC8qIHJlYWNoZWQgZW5kIG9mIHRleHQgKi9cbiAgICAgICAgfVxuICAgICAgICB5aWVsZCBkZWxheSgxMDAwKTtcbiAgICAgIH1cbiAgICB9XG4gIH0pO1xufVxuXG5mdW5jdGlvbiBTY2hlZHVsaW5nQ29udHJvbHNTZWxlY3RvciAoc3RhdGUpIHtcbiAgY29uc3Qge2FjdGlvbnMsIHRhc2tEYXRhOiB7YWxwaGFiZXR9LCBzY2hlZHVsaW5nOiB7c3RhdHVzfX0gPSBzdGF0ZTtcbiAgY29uc3Qge3NjaGVkdWxpbmdTdGF0dXNDaGFuZ2VkLCBzY2hlZHVsaW5nU3RlcEJhY2t3YXJkLCBzY2hlZHVsaW5nU3RlcEZvcndhcmR9ID0gYWN0aW9ucztcbiAgY29uc3QgYWxwaGFiZXRTaXplID0gYWxwaGFiZXQubGVuZ3RoO1xuICByZXR1cm4ge3NjaGVkdWxpbmdTdGF0dXNDaGFuZ2VkLCBzY2hlZHVsaW5nU3RlcEJhY2t3YXJkLCBzY2hlZHVsaW5nU3RlcEZvcndhcmQsIHN0YXR1cywgYWxwaGFiZXRTaXplfTtcbn1cblxuY2xhc3MgU2NoZWR1bGluZ0NvbnRyb2xzVmlldyBleHRlbmRzIFJlYWN0LlB1cmVDb21wb25lbnQge1xuICByZW5kZXIgKCkge1xuICAgIGNvbnN0IHthbHBoYWJldFNpemUsIHN0YXR1c30gPSB0aGlzLnByb3BzO1xuICAgIHJldHVybiAoXG4gICAgICA8ZGl2IHN0eWxlPXt7d2lkdGg6IGAkezIwKmFscGhhYmV0U2l6ZX1weGAsIG1hcmdpbjogJzAgYXV0bycsIHRleHRBbGlnbjogJ2NlbnRlcid9fT5cbiAgICAgICAgPGRpdiBjbGFzc05hbWU9J2J0bi1ncm91cCc+XG4gICAgICAgICAgPEJ1dHRvbiBvbkNsaWNrPXt0aGlzLm9uRmFzdEJhY2t3YXJkQ2xpY2tlZH0gc3R5bGU9e3t3aWR0aDogJzQwcHgnfX0gYWN0aXZlPXtzdGF0dXMgPT09ICdzdGFydCd9PjxpIGNsYXNzTmFtZT0nZmEgZmEtZmFzdC1iYWNrd2FyZCcvPjwvQnV0dG9uPlxuICAgICAgICAgIDxCdXR0b24gb25DbGljaz17dGhpcy5vblN0ZXBCYWNrd2FyZENsaWNrZWR9IHN0eWxlPXt7d2lkdGg6ICc0MHB4J319PjxpIGNsYXNzTmFtZT0nZmEgZmEtc3RlcC1iYWNrd2FyZCcvPjwvQnV0dG9uPlxuICAgICAgICAgIDxCdXR0b24gb25DbGljaz17dGhpcy5vblBsYXlDbGlja2VkfSBzdHlsZT17e3dpZHRoOiAnNDBweCd9fSBhY3RpdmU9e3N0YXR1cyA9PT0gJ3BsYXknfT48aSBjbGFzc05hbWU9J2ZhIGZhLXBsYXknLz48L0J1dHRvbj5cbiAgICAgICAgICA8QnV0dG9uIG9uQ2xpY2s9e3RoaXMub25TdGVwRm9yd2FyZENsaWNrZWR9IHN0eWxlPXt7d2lkdGg6ICc0MHB4J319PjxpIGNsYXNzTmFtZT0nZmEgZmEtc3RlcC1mb3J3YXJkJy8+PC9CdXR0b24+XG4gICAgICAgICAgPEJ1dHRvbiBvbkNsaWNrPXt0aGlzLm9uRmFzdEZvcndhcmRDbGlja2VkfSBzdHlsZT17e3dpZHRoOiAnNDBweCd9fSBhY3RpdmU9e3N0YXR1cyA9PT0gJ2VuZCd9PjxpIGNsYXNzTmFtZT0nZmEgZmEtZmFzdC1mb3J3YXJkJy8+PC9CdXR0b24+XG4gICAgICAgIDwvZGl2PlxuICAgICAgPC9kaXY+XG4gICAgKTtcbiAgfVxuICBvbkZhc3RCYWNrd2FyZENsaWNrZWQgPSAoX2V2ZW50KSA9PiB7XG4gICAgdGhpcy5wcm9wcy5kaXNwYXRjaCh7dHlwZTogdGhpcy5wcm9wcy5zY2hlZHVsaW5nU3RhdHVzQ2hhbmdlZCwgcGF5bG9hZDoge3N0YXR1czogJ3N0YXJ0J319KTtcbiAgfTtcbiAgb25TdGVwQmFja3dhcmRDbGlja2VkID0gKF9ldmVudCkgPT4ge1xuICAgIHRoaXMucHJvcHMuZGlzcGF0Y2goe3R5cGU6IHRoaXMucHJvcHMuc2NoZWR1bGluZ1N0ZXBCYWNrd2FyZH0pO1xuICB9O1xuICBvblBsYXlDbGlja2VkID0gKF9ldmVudCkgPT4ge1xuICAgIHRoaXMucHJvcHMuZGlzcGF0Y2goe3R5cGU6IHRoaXMucHJvcHMuc2NoZWR1bGluZ1N0YXR1c0NoYW5nZWQsIHBheWxvYWQ6IHtzdGF0dXM6ICdwbGF5J319KTtcbiAgfTtcbiAgb25TdGVwRm9yd2FyZENsaWNrZWQgPSAoX2V2ZW50KSA9PiB7XG4gICAgdGhpcy5wcm9wcy5kaXNwYXRjaCh7dHlwZTogdGhpcy5wcm9wcy5zY2hlZHVsaW5nU3RlcEZvcndhcmR9KTtcbiAgfTtcbiAgb25GYXN0Rm9yd2FyZENsaWNrZWQgPSAoX2V2ZW50KSA9PiB7XG4gICAgdGhpcy5wcm9wcy5kaXNwYXRjaCh7dHlwZTogdGhpcy5wcm9wcy5zY2hlZHVsaW5nU3RhdHVzQ2hhbmdlZCwgcGF5bG9hZDoge3N0YXR1czogJ2VuZCd9fSk7XG4gIH07XG59XG5cbmV4cG9ydCBkZWZhdWx0IHtcbiAgYWN0aW9uczoge1xuICAgIHNjaGVkdWxpbmdTdGF0dXNDaGFuZ2VkOiAnU2NoZWR1bGluZy5TdGF0dXMuQ2hhbmdlZCcsXG4gICAgc2NoZWR1bGluZ1N0ZXBCYWNrd2FyZDogJ1NjaGVkdWxpbmcuU3RlcEJhY2t3YXJkJyxcbiAgICBzY2hlZHVsaW5nU3RlcEZvcndhcmQ6ICdTY2hlZHVsaW5nLlN0ZXBGb3J3YXJkJyxcbiAgICBzY2hlZHVsaW5nSnVtcDogJ1NjaGVkdWxpbmcuSnVtcCcsXG4gICAgc2NoZWR1bGluZ1RpY2s6ICdTY2hlZHVsaW5nLlRpY2snLFxuICB9LFxuICBhY3Rpb25SZWR1Y2Vyczoge1xuICAgIGFwcEluaXQ6IGFwcEluaXRSZWR1Y2VyLFxuICAgIHRhc2tJbml0OiB0YXNrSW5pdFJlZHVjZXIsXG4gICAgc2NoZWR1bGluZ1N0YXR1c0NoYW5nZWQ6IHNjaGVkdWxpbmdTdGF0dXNDaGFuZ2VkUmVkdWNlcixcbiAgICBzY2hlZHVsaW5nU3RlcEJhY2t3YXJkOiBzY2hlZHVsaW5nU3RlcEJhY2t3YXJkUmVkdWNlcixcbiAgICBzY2hlZHVsaW5nU3RlcEZvcndhcmQ6IHNjaGVkdWxpbmdTdGVwRm9yd2FyZFJlZHVjZXIsXG4gICAgc2NoZWR1bGluZ0p1bXA6IHNjaGVkdWxpbmdKdW1wUmVkdWNlcixcbiAgICBzY2hlZHVsaW5nVGljazogc2NoZWR1bGluZ1RpY2tSZWR1Y2VyLFxuICB9LFxuICBsYXRlUmVkdWNlcjogc2NoZWR1bGluZ0xhdGVSZWR1Y2VyLFxuICBzYWdhOiBzY2hlZHVsaW5nU2FnYSxcbiAgdmlld3M6IHtcbiAgICBTY2hlZHVsaW5nQ29udHJvbHM6IGNvbm5lY3QoU2NoZWR1bGluZ0NvbnRyb2xzU2VsZWN0b3IpKFNjaGVkdWxpbmdDb250cm9sc1ZpZXcpLFxuICB9XG59O1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL3NjaGVkdWxpbmdfYnVuZGxlLmpzIiwiXG5pbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IHtjb25uZWN0fSBmcm9tICdyZWFjdC1yZWR1eCc7XG5pbXBvcnQgY2xhc3NuYW1lcyBmcm9tICdjbGFzc25hbWVzJztcbmltcG9ydCB7cmFuZ2V9IGZyb20gJ3JhbmdlJztcbmltcG9ydCB1cGRhdGUgZnJvbSAnaW1tdXRhYmlsaXR5LWhlbHBlcic7XG5cbmltcG9ydCB7d3JhcEFyb3VuZCwgbWFrZVJvdG9yLCBlZGl0Um90b3JDZWxsLCBsb2NrUm90b3JDZWxsLCB1cGRhdGVSb3RvcldpdGhLZXl9IGZyb20gJy4vdXRpbHMnO1xuXG5mdW5jdGlvbiBhcHBJbml0UmVkdWNlciAoc3RhdGUsIF9hY3Rpb24pIHtcbiAgcmV0dXJuIHsuLi5zdGF0ZSwgcm90b3JzOiBbXSwgZWRpdGluZzoge319O1xufVxuXG5mdW5jdGlvbiByb3RvckNlbGxFZGl0U3RhcnRlZFJlZHVjZXIgKHN0YXRlLCB7cGF5bG9hZDoge3JvdG9ySW5kZXgsIGNlbGxSYW5rfX0pIHtcbiAgbGV0IHt0YXNrRGF0YToge2FscGhhYmV0fSwgcm90b3JzfSA9IHN0YXRlO1xuICByb3RvckluZGV4ID0gd3JhcEFyb3VuZChyb3RvckluZGV4LCByb3RvcnMubGVuZ3RoKTtcbiAgY2VsbFJhbmsgPSB3cmFwQXJvdW5kKGNlbGxSYW5rLCBhbHBoYWJldC5sZW5ndGgpO1xuICByZXR1cm4gdXBkYXRlKHN0YXRlLCB7ZWRpdGluZzogeyRzZXQ6IHtyb3RvckluZGV4LCBjZWxsUmFua319fSk7XG59XG5cbmZ1bmN0aW9uIHJvdG9yQ2VsbEVkaXRNb3ZlZFJlZHVjZXIgKHN0YXRlLCB7cGF5bG9hZDoge3JvdG9yTW92ZSwgY2VsbE1vdmV9fSkge1xuICBsZXQge3Rhc2tEYXRhOiB7YWxwaGFiZXR9LCByb3RvcnMsIGVkaXRpbmc6IHtyb3RvckluZGV4LCBjZWxsUmFua319ID0gc3RhdGU7XG4gIGxldCByb3RvclN0b3AgPSByb3RvckluZGV4LCBjZWxsU3RvcCA9IGNlbGxSYW5rO1xuICBpZiAocm90b3JJbmRleCA9PT0gdW5kZWZpbmVkIHx8IGNlbGxSYW5rID09PSB1bmRlZmluZWQpIHJldHVybiBzdGF0ZTtcbiAgbGV0IGNlbGw7XG4gIGRvIHtcbiAgICByb3RvckluZGV4ID0gd3JhcEFyb3VuZChyb3RvckluZGV4ICsgcm90b3JNb3ZlLCByb3RvcnMubGVuZ3RoKTtcbiAgICBjZWxsUmFuayA9IHdyYXBBcm91bmQoY2VsbFJhbmsgKyBjZWxsTW92ZSwgYWxwaGFiZXQubGVuZ3RoKTtcbiAgICBjZWxsID0gcm90b3JzW3JvdG9ySW5kZXhdLmNlbGxzW2NlbGxSYW5rXTtcbiAgICAvKiBJZiB3ZSBsb29wZWQgYmFjayB0byB0aGUgc3RhcnRpbmcgcG9pbnQsIHRoZSBtb3ZlIGlzIGltcG9zc2libGUuICovXG4gICAgaWYgKHJvdG9yU3RvcCA9PSByb3RvckluZGV4IHx8IGNlbGxTdG9wID09IGNlbGxSYW5rKSByZXR1cm4gc3RhdGU7XG4gIH0gd2hpbGUgKGNlbGwuaGludCB8fCBjZWxsLmxvY2tlZCk7XG4gIHJldHVybiB1cGRhdGUoc3RhdGUsIHtlZGl0aW5nOiB7JHNldDoge3JvdG9ySW5kZXgsIGNlbGxSYW5rfX19KTtcbn1cblxuZnVuY3Rpb24gcm90b3JDZWxsRWRpdENhbmNlbGxlZFJlZHVjZXIgKHN0YXRlLCBfYWN0aW9uKSB7XG4gIHJldHVybiB1cGRhdGUoc3RhdGUsIHtlZGl0aW5nOiB7JHNldDoge319fSk7XG59XG5cbmZ1bmN0aW9uIHJvdG9yQ2VsbENoYXJDaGFuZ2VkUmVkdWNlciAoc3RhdGUsIHtwYXlsb2FkOiB7cm90b3JJbmRleCwgcmFuaywgc3ltYm9sfX0pIHtcbiAgbGV0IHt0YXNrRGF0YToge2FscGhhYmV0fSwgcm90b3JzfSA9IHN0YXRlO1xuICBpZiAoc3ltYm9sLmxlbmd0aCAhPT0gMSB8fCAtMSA9PT0gYWxwaGFiZXQuaW5kZXhPZihzeW1ib2wpKSB7XG4gICAgc3ltYm9sID0gbnVsbDtcbiAgfVxuICBjb25zdCByb3RvciA9IGVkaXRSb3RvckNlbGwocm90b3JzW3JvdG9ySW5kZXhdLCByYW5rLCBzeW1ib2wpO1xuICByZXR1cm4gdXBkYXRlKHN0YXRlLCB7cm90b3JzOiB7W3JvdG9ySW5kZXhdOiB7JHNldDogcm90b3J9fX0pO1xufVxuXG5mdW5jdGlvbiByb3RvckNlbGxMb2NrQ2hhbmdlZFJlZHVjZXIgKHN0YXRlLCB7cGF5bG9hZDoge3JvdG9ySW5kZXgsIHJhbmssIGlzTG9ja2VkfX0pIHtcbiAgY29uc3Qgcm90b3IgPSBsb2NrUm90b3JDZWxsKHN0YXRlLnJvdG9yc1tyb3RvckluZGV4XSwgcmFuaywgaXNMb2NrZWQpO1xuICByZXR1cm4gdXBkYXRlKHN0YXRlLCB7cm90b3JzOiB7W3JvdG9ySW5kZXhdOiB7JHNldDogcm90b3J9fX0pO1xufVxuXG5mdW5jdGlvbiByb3RvcktleUxvYWRlZFJlZHVjZXIgKHN0YXRlLCB7cGF5bG9hZDoge3JvdG9ySW5kZXgsIGtleX19KSB7XG4gIGNvbnN0IHt0YXNrRGF0YToge2FscGhhYmV0fSwgcm90b3JzfSA9IHN0YXRlO1xuICBjb25zdCByb3RvciA9IHVwZGF0ZVJvdG9yV2l0aEtleShhbHBoYWJldCwgcm90b3JzW3JvdG9ySW5kZXhdLCBrZXkpO1xuICByZXR1cm4gdXBkYXRlKHN0YXRlLCB7cm90b3JzOiB7W3JvdG9ySW5kZXhdOiB7JHNldDogcm90b3J9fX0pO1xufVxuXG5mdW5jdGlvbiBSb3RvclNlbGVjdG9yIChzdGF0ZSwge2luZGV4fSkge1xuICBjb25zdCB7XG4gICAgYWN0aW9uczoge1xuICAgICAgcm90b3JDZWxsTG9ja0NoYW5nZWQsIHJvdG9yQ2VsbENoYXJDaGFuZ2VkLFxuICAgICAgcm90b3JDZWxsRWRpdENhbmNlbGxlZCwgcm90b3JDZWxsRWRpdFN0YXJ0ZWQsIHJvdG9yQ2VsbEVkaXRNb3ZlZFxuICAgIH0sXG4gICAgcm90b3JzLCBzY2hlZHVsaW5nOiB7c2hpZnRzLCBjdXJyZW50VHJhY2V9LCBlZGl0aW5nXG4gIH0gPSBzdGF0ZTtcbiAgY29uc3Qge2VkaXRhYmxlUm93LCBjZWxsc30gPSByb3RvcnNbaW5kZXhdO1xuICBjb25zdCBzaGlmdCA9IHNoaWZ0c1tpbmRleF07XG4gIGNvbnN0IGFjdGl2ZVJhbmsgPSBjdXJyZW50VHJhY2VbaW5kZXhdICYmIGN1cnJlbnRUcmFjZVtpbmRleF0ucmFuaztcbiAgY29uc3QgZWRpdGluZ1JhbmsgPSBlZGl0aW5nLnJvdG9ySW5kZXggPT09IGluZGV4ID8gZWRpdGluZy5jZWxsUmFuayA6IG51bGw7XG4gIHJldHVybiB7XG4gICAgcm90b3JDZWxsRWRpdFN0YXJ0ZWQsIHJvdG9yQ2VsbEVkaXRDYW5jZWxsZWQsIHJvdG9yQ2VsbEVkaXRNb3ZlZCxcbiAgICByb3RvckNlbGxMb2NrQ2hhbmdlZCwgcm90b3JDZWxsQ2hhckNoYW5nZWQsXG4gICAgZWRpdGFibGVSb3csIGNlbGxzLCBzaGlmdCwgZWRpdGluZ1JhbmssIGFjdGl2ZVJhbmtcbiAgfTtcbn1cblxuY2xhc3MgUm90b3JWaWV3IGV4dGVuZHMgUmVhY3QuUHVyZUNvbXBvbmVudCB7XG4gIHJlbmRlciAoKSB7XG4gICAgY29uc3Qge2luZGV4LCBlZGl0YWJsZVJvdywgY2VsbHMsIHNoaWZ0LCBlZGl0aW5nUmFuaywgYWN0aXZlUmFua30gPSB0aGlzLnByb3BzO1xuICAgIGNvbnN0IG5iQ2VsbHMgPSBjZWxscy5sZW5ndGg7XG4gICAgcmV0dXJuIChcbiAgICAgIDxkaXYgc3R5bGU9e3t3aWR0aDogYCR7MjAqbmJDZWxsc31weGB9fT5cbiAgICAgICAgPGRpdiBjbGFzc05hbWU9J2NsZWFyZml4Jz5cbiAgICAgICAgICB7cmFuZ2UoMCwgbmJDZWxscykubWFwKHJhbmsgPT4ge1xuICAgICAgICAgICAgY29uc3Qge2VkaXRhYmxlLCBsb2NrZWQsIGNvbmZsaWN0LCBoaW50fSA9IGNlbGxzW3JhbmtdO1xuICAgICAgICAgICAgY29uc3QgaXNBY3RpdmUgPSBhY3RpdmVSYW5rID09PSByYW5rO1xuICAgICAgICAgICAgY29uc3QgaXNFZGl0aW5nID0gZWRpdGluZ1JhbmsgPT09IHJhbmsgJiYgIWxvY2tlZCAmJiAhaGludDtcbiAgICAgICAgICAgIGNvbnN0IGlzTGFzdCA9IG5iQ2VsbHMgPT09IHJhbmsgKyAxO1xuICAgICAgICAgICAgY29uc3Qgc2hpZnRlZEluZGV4ID0gKHJhbmsgKyBzaGlmdCkgJSBuYkNlbGxzO1xuICAgICAgICAgICAgY29uc3Qge3JvdGF0aW5nfSA9IGNlbGxzW3NoaWZ0ZWRJbmRleF07XG4gICAgICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgICA8Um90b3JDZWxsIGtleT17cmFua30gcmFuaz17cmFua30gaXNMYXN0PXtpc0xhc3R9IGVkaXRhYmxlUm93PXtlZGl0YWJsZVJvd31cbiAgICAgICAgICAgICAgICBzdGF0aWNDaGFyPXtyb3RhdGluZ30gZWRpdGFibGVDaGFyPXtlZGl0YWJsZX0gaXNMb2NrZWQ9e2xvY2tlZH0gaXNIaW50PXtoaW50fSBpc0VkaXRpbmc9e2lzRWRpdGluZ30gaXNBY3RpdmU9e2lzQWN0aXZlfVxuICAgICAgICAgICAgICAgIG9uQ2hhbmdlQ2hhcj17dGhpcy5vbkNoYW5nZUNoYXJ9IG9uQ2hhbmdlTG9ja2VkPXt0aGlzLm9uQ2hhbmdlTG9ja2VkfVxuICAgICAgICAgICAgICAgIG9uRWRpdGluZ1N0YXJ0ZWQ9e3RoaXMub25FZGl0aW5nU3RhcnRlZH0gb25FZGl0aW5nQ2FuY2VsbGVkPXt0aGlzLm9uRWRpdGluZ0NhbmNlbGxlZH1cbiAgICAgICAgICAgICAgICBvbkVkaXRpbmdNb3ZlZD17dGhpcy5lZGl0aW5nTW92ZWR9IGlzQ29uZmxpY3Q9e2NvbmZsaWN0fSAvPik7XG4gICAgICAgICAgfSl9XG4gICAgICAgIDwvZGl2PlxuICAgICAgPC9kaXY+XG4gICAgKTtcbiAgfVxuICBvbkVkaXRpbmdTdGFydGVkID0gKHJhbmspID0+IHtcbiAgICB0aGlzLnByb3BzLmRpc3BhdGNoKHt0eXBlOiB0aGlzLnByb3BzLnJvdG9yQ2VsbEVkaXRTdGFydGVkLCBwYXlsb2FkOiB7cm90b3JJbmRleDogdGhpcy5wcm9wcy5pbmRleCwgY2VsbFJhbms6IHJhbmt9fSk7XG4gIH07XG4gIG9uRWRpdGluZ0NhbmNlbGxlZCA9ICgpID0+IHtcbiAgICB0aGlzLnByb3BzLmRpc3BhdGNoKHt0eXBlOiB0aGlzLnByb3BzLnJvdG9yQ2VsbEVkaXRDYW5jZWxsZWR9KTtcbiAgfTtcbiAgb25DaGFuZ2VDaGFyID0gKHJhbmssIHN5bWJvbCkgPT4ge1xuICAgIHN5bWJvbCA9IHN5bWJvbC50b1VwcGVyQ2FzZSgpO1xuICAgIHRoaXMucHJvcHMuZGlzcGF0Y2goe3R5cGU6IHRoaXMucHJvcHMucm90b3JDZWxsQ2hhckNoYW5nZWQsIHBheWxvYWQ6IHtyb3RvckluZGV4OiB0aGlzLnByb3BzLmluZGV4LCByYW5rLCBzeW1ib2x9fSk7XG4gIH07XG4gIG9uQ2hhbmdlTG9ja2VkID0gKHJhbmssIGlzTG9ja2VkKSA9PiB7XG4gICAgdGhpcy5wcm9wcy5kaXNwYXRjaCh7dHlwZTogdGhpcy5wcm9wcy5yb3RvckNlbGxMb2NrQ2hhbmdlZCwgcGF5bG9hZDoge3JvdG9ySW5kZXg6IHRoaXMucHJvcHMuaW5kZXgsIHJhbmssIGlzTG9ja2VkfX0pO1xuICB9O1xuICBlZGl0aW5nTW92ZWQgPSAocm90b3JNb3ZlLCBjZWxsTW92ZSkgPT4ge1xuICAgIHRoaXMucHJvcHMuZGlzcGF0Y2goe3R5cGU6IHRoaXMucHJvcHMucm90b3JDZWxsRWRpdE1vdmVkLCBwYXlsb2FkOiB7cm90b3JNb3ZlLCBjZWxsTW92ZX19KTtcbiAgfTtcbn1cblxuY2xhc3MgUm90b3JDZWxsIGV4dGVuZHMgUmVhY3QuUHVyZUNvbXBvbmVudCB7XG4gIC8qIFhYWCBDbGlja2luZyBpbiB0aGUgZWRpdGFibGUgZGl2IGFuZCBlbnRlcmluZyB0aGUgc2FtZSBsZXR0ZXIgZG9lcyBub3RcbiAgICAgICAgIHRyaWdnZXIgYSBjaGFuZ2UgZXZlbnQuICBUaGlzIGJlaGF2aW9yIGlzIHVuZm9ydHVuYXRlLiAqL1xuICByZW5kZXIgKCkge1xuICAgIGNvbnN0IHtzdGF0aWNDaGFyLCBlZGl0YWJsZUNoYXIsIGlzTG9ja2VkLCBpc0hpbnQsIGlzQWN0aXZlLCBpc0VkaXRpbmcsIGVkaXRhYmxlUm93LCBpc0xhc3QsIGlzQ29uZmxpY3R9ID0gdGhpcy5wcm9wcztcbiAgICBjb25zdCBjb2x1bW5TdHlsZSA9IHtcbiAgICAgIGZsb2F0OiAnbGVmdCcsXG4gICAgICB3aWR0aDogJzIwcHgnLFxuICAgIH07XG4gICAgY29uc3Qgc3RhdGljQ2VsbFN0eWxlID0ge1xuICAgICAgYm9yZGVyOiAnMXB4IHNvbGlkIGJsYWNrJyxcbiAgICAgIGJvcmRlclJpZ2h0V2lkdGg6IGlzTGFzdCA/ICcxcHgnIDogJzAnLFxuICAgICAgdGV4dEFsaWduOiAnY2VudGVyJyxcbiAgICB9O1xuICAgIGNvbnN0IGVkaXRhYmxlQ2VsbFN0eWxlID0ge1xuICAgICAgYm9yZGVyOiAnMXB4IHNvbGlkIGJsYWNrJyxcbiAgICAgIGJvcmRlclJpZ2h0V2lkdGg6IGlzTGFzdCA/ICcxcHgnIDogJzAnLFxuICAgICAgdGV4dEFsaWduOiAnY2VudGVyJyxcbiAgICAgIGN1cnNvcjogJ3RleHQnLFxuICAgICAgYmFja2dyb3VuZENvbG9yOiBpc0hpbnQgPyAnI2FmYScgOiAoaXNDb25mbGljdCA/ICcjZmNjJyA6ICcjZmZmJylcbiAgICB9O1xuICAgIC8qIEFwcGx5IGFjdGl2ZS1zdGF0dXMgc2VwYXJhdGlvbiBib3JkZXIgc3R5bGUuICovXG4gICAgY29uc3QgYm90dG9tQ2VsbFN0eWxlID0gZWRpdGFibGVSb3cgPT09ICd0b3AnID8gc3RhdGljQ2VsbFN0eWxlIDogZWRpdGFibGVDZWxsU3R5bGU7XG4gICAgaWYgKGlzQWN0aXZlKSB7XG4gICAgICBib3R0b21DZWxsU3R5bGUubWFyZ2luVG9wID0gJzAnO1xuICAgICAgYm90dG9tQ2VsbFN0eWxlLmJvcmRlclRvcFdpZHRoID0gJzNweCc7XG4gICAgfSBlbHNlIHtcbiAgICAgIGJvdHRvbUNlbGxTdHlsZS5tYXJnaW5Ub3AgPSAnMnB4JztcbiAgICAgIGJvdHRvbUNlbGxTdHlsZS5ib3JkZXJUb3BXaWR0aCA9ICcxcHgnOyAvKiBuZWVkZWQgYmVjYXVzZSByZWFjdCAqL1xuICAgIH1cbiAgICBjb25zdCBzdGF0aWNDZWxsID0gKFxuICAgICAgPGRpdiBzdHlsZT17c3RhdGljQ2VsbFN0eWxlfT5cbiAgICAgICAge3N0YXRpY0NoYXIgfHwgJ1xcdTAwQTAnfVxuICAgICAgPC9kaXY+XG4gICAgKTtcbiAgICBjb25zdCBlZGl0YWJsZUNlbGwgPSAoXG4gICAgICA8ZGl2IHN0eWxlPXtlZGl0YWJsZUNlbGxTdHlsZX0gb25DbGljaz17dGhpcy5zdGFydEVkaXRpbmd9PlxuICAgICAgICB7aXNFZGl0aW5nXG4gICAgICAgICAgPyA8aW5wdXQgcmVmPXt0aGlzLnJlZklucHV0fSBvbkNoYW5nZT17dGhpcy5jZWxsQ2hhbmdlZH0gb25LZXlEb3duPXt0aGlzLmtleURvd259XG4gICAgICAgICAgICAgIHR5cGU9J3RleHQnIHZhbHVlPXtlZGl0YWJsZUNoYXJ8fCcnfSBzdHlsZT17e3dpZHRoOiAnMTlweCcsIGhlaWdodDogJzIwcHgnLCBib3JkZXI6ICdub25lJywgdGV4dEFsaWduOiAnY2VudGVyJ319IC8+XG4gICAgICAgICAgOiAoZWRpdGFibGVDaGFyIHx8ICdcXHUwMEEwJyl9XG4gICAgICA8L2Rpdj5cbiAgICApO1xuICAgIGNvbnN0IGxvY2sgPSAoXG4gICAgICA8ZGl2IHN0eWxlPXt7bWFyZ2luVG9wOiAnMnB4JywgdGV4dEFsaWduOiAnY2VudGVyJywgY3Vyc29yOiAncG9pbnRlcid9fSBvbkNsaWNrPXt0aGlzLmxvY2tDbGlja2VkfT5cbiAgICAgICAge2lzSGludCB8fCA8aSBjbGFzc05hbWU9e2NsYXNzbmFtZXMoWydmYScsIGlzTG9ja2VkID8gJ2ZhLWxvY2snIDogJ2ZhLXVubG9jay1hbHQnXSl9IC8+fVxuICAgICAgPC9kaXY+XG4gICAgKTtcbiAgICBpZiAoZWRpdGFibGVSb3cgPT09ICd0b3AnKSB7XG4gICAgICByZXR1cm4gKFxuICAgICAgICA8ZGl2IHN0eWxlPXtjb2x1bW5TdHlsZX0+XG4gICAgICAgICAge2VkaXRhYmxlQ2VsbH17c3RhdGljQ2VsbH17bG9ja31cbiAgICAgICAgPC9kaXY+XG4gICAgICApO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gKFxuICAgICAgICA8ZGl2IHN0eWxlPXtjb2x1bW5TdHlsZX0+XG4gICAgICAgICAge3N0YXRpY0NlbGx9e2VkaXRhYmxlQ2VsbH17bG9ja31cbiAgICAgICAgPC9kaXY+XG4gICAgICApO1xuICAgIH1cbiAgfVxuICBjb21wb25lbnREaWRVcGRhdGUgKCkge1xuICAgIGlmICh0aGlzLl9pbnB1dCkge1xuICAgICAgdGhpcy5faW5wdXQuc2VsZWN0KCk7XG4gICAgICB0aGlzLl9pbnB1dC5mb2N1cygpO1xuICAgIH1cbiAgfVxuICBzdGFydEVkaXRpbmcgPSAoKSA9PiB7XG4gICAgaWYgKCF0aGlzLnByb3BzLmlzTG9ja2VkICYmICF0aGlzLnByb3BzLmlzRWRpdGluZykge1xuICAgICAgdGhpcy5wcm9wcy5vbkVkaXRpbmdTdGFydGVkKHRoaXMucHJvcHMucmFuayk7XG4gICAgfVxuICB9O1xuICBrZXlEb3duID0gKGV2ZW50KSA9PiB7XG4gICAgbGV0IGhhbmRsZWQgPSB0cnVlO1xuICAgIGlmIChldmVudC5rZXkgPT09ICdBcnJvd1JpZ2h0Jykge1xuICAgICAgdGhpcy5wcm9wcy5vbkVkaXRpbmdNb3ZlZCgwLCAxKTtcbiAgICB9IGVsc2UgaWYgKGV2ZW50LmtleSA9PT0gJ0Fycm93TGVmdCcpIHtcbiAgICAgIHRoaXMucHJvcHMub25FZGl0aW5nTW92ZWQoMCwgLTEpO1xuICAgIH0gZWxzZSBpZiAoZXZlbnQua2V5ID09PSAnQXJyb3dVcCcpIHtcbiAgICAgIHRoaXMucHJvcHMub25FZGl0aW5nTW92ZWQoLTEsIDApO1xuICAgIH0gZWxzZSBpZiAoZXZlbnQua2V5ID09PSAnQXJyb3dEb3duJykge1xuICAgICAgdGhpcy5wcm9wcy5vbkVkaXRpbmdNb3ZlZCgxLCAwKTtcbiAgICB9IGVsc2UgaWYgKGV2ZW50LmtleSA9PT0gJ0VzY2FwZScgfHwgZXZlbnQua2V5ID09PSAnRW50ZXInKSB7XG4gICAgICB0aGlzLnByb3BzLm9uRWRpdGluZ0NhbmNlbGxlZCgpO1xuICAgIH0gZWxzZSB7XG4gICAgICBoYW5kbGVkID0gZmFsc2U7XG4gICAgfVxuICAgIGlmIChoYW5kbGVkKSB7XG4gICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgfVxuICB9O1xuICBjZWxsQ2hhbmdlZCA9ICgpID0+IHtcbiAgICBjb25zdCB2YWx1ZSA9IHRoaXMuX2lucHV0LnZhbHVlLnN1YnN0cigtMSk7IC8qIC8hXFwgSUUgY29tcGF0aWJpbGl0eSAqL1xuICAgIHRoaXMucHJvcHMub25DaGFuZ2VDaGFyKHRoaXMucHJvcHMucmFuaywgdmFsdWUpO1xuICB9O1xuICBsb2NrQ2xpY2tlZCA9ICgpID0+IHtcbiAgICB0aGlzLnByb3BzLm9uQ2hhbmdlTG9ja2VkKHRoaXMucHJvcHMucmFuaywgIXRoaXMucHJvcHMuaXNMb2NrZWQpO1xuICB9O1xuICByZWZJbnB1dCA9IChlbGVtZW50KSA9PiB7XG4gICAgdGhpcy5faW5wdXQgPSBlbGVtZW50O1xuICB9O1xufVxuXG5leHBvcnQgZGVmYXVsdCB7XG4gIGFjdGlvbnM6IHtcbiAgICByb3RvckNlbGxFZGl0U3RhcnRlZDogJ1JvdG9yLkNlbGwuRWRpdC5TdGFydGVkJyxcbiAgICByb3RvckNlbGxFZGl0TW92ZWQ6ICdSb3Rvci5DZWxsLkVkaXQuTW92ZWQnLFxuICAgIHJvdG9yQ2VsbEVkaXRDYW5jZWxsZWQ6ICdSb3Rvci5DZWxsLkVkaXQuQ2FuY2VsbGVkJyxcbiAgICByb3RvckNlbGxMb2NrQ2hhbmdlZDogJ1JvdG9yLkNlbGwuTG9jay5DaGFuZ2VkJyxcbiAgICByb3RvckNlbGxDaGFyQ2hhbmdlZDogJ1JvdG9yLkNlbGwuQ2hhci5DaGFuZ2VkJyxcbiAgICByb3RvcktleUxvYWRlZDogJ1JvdG9yLktleS5Mb2FkZWQnLFxuICB9LFxuICBhY3Rpb25SZWR1Y2Vyczoge1xuICAgIGFwcEluaXQ6IGFwcEluaXRSZWR1Y2VyLFxuICAgIHJvdG9yQ2VsbEVkaXRTdGFydGVkOiByb3RvckNlbGxFZGl0U3RhcnRlZFJlZHVjZXIsXG4gICAgcm90b3JDZWxsRWRpdE1vdmVkOiByb3RvckNlbGxFZGl0TW92ZWRSZWR1Y2VyLFxuICAgIHJvdG9yQ2VsbEVkaXRDYW5jZWxsZWQ6IHJvdG9yQ2VsbEVkaXRDYW5jZWxsZWRSZWR1Y2VyLFxuICAgIHJvdG9yQ2VsbExvY2tDaGFuZ2VkOiByb3RvckNlbGxMb2NrQ2hhbmdlZFJlZHVjZXIsXG4gICAgcm90b3JDZWxsQ2hhckNoYW5nZWQ6IHJvdG9yQ2VsbENoYXJDaGFuZ2VkUmVkdWNlcixcbiAgICByb3RvcktleUxvYWRlZDogcm90b3JLZXlMb2FkZWRSZWR1Y2VyLFxuICB9LFxuICB2aWV3czoge1xuICAgIFJvdG9yOiBjb25uZWN0KFJvdG9yU2VsZWN0b3IpKFJvdG9yVmlldylcbiAgfVxufTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9yb3RvcnNfYnVuZGxlLmpzIiwiLypcbi0gc2hvd3MgYSBzbGljZSBvZiB0aGUgY2xlYXJUZXh0XG4tIGFkZHMgZGVjaXBoZXJlZCBjaGFyYWN0ZXJzIGZyb20gc3RhcnQgdXAgdG8gdGhlIFwiY3VycmVudFwiIGFuaW1hdGlvbiBwb3NpdGlvblxuICAobGF6aWx5IGNvbXB1dGVkKVxuLSBzY3JvbGxpbmcgZG9lcyBub3QgYWZmZWN0IHRoZSBjdXJyZW50IGFuaW1hdGlvbiBwb3NpdGlvblxuKi9cblxuXG5pbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IHtjb25uZWN0fSBmcm9tICdyZWFjdC1yZWR1eCc7XG5cbmltcG9ydCB7dXBkYXRlR3JpZEdlb21ldHJ5LCB1cGRhdGVHcmlkVmlzaWJsZVJvd3MsIGFwcGx5Um90b3JzfSBmcm9tICcuL3V0aWxzJztcblxuZnVuY3Rpb24gYXBwSW5pdFJlZHVjZXIgKHN0YXRlLCBfYWN0aW9uKSB7XG4gIHJldHVybiB7Li4uc3RhdGUsIGRlY2lwaGVyZWRUZXh0OiB7XG4gICAgY2VsbFdpZHRoOiAxNSxcbiAgICBjZWxsSGVpZ2h0OiA0NixcbiAgICBzY3JvbGxUb3A6IDAsXG4gICAgbmJDZWxsczogMFxuICB9fTtcbn1cblxuZnVuY3Rpb24gdGFza0luaXRSZWR1Y2VyIChzdGF0ZSwgX2FjdGlvbikge1xuICBsZXQge2RlY2lwaGVyZWRUZXh0LCB0YXNrRGF0YToge2NpcGhlclRleHR9fSA9IHN0YXRlO1xuICBkZWNpcGhlcmVkVGV4dCA9IHsuLi5kZWNpcGhlcmVkVGV4dCwgbmJDZWxsczogY2lwaGVyVGV4dC5sZW5ndGh9O1xuICByZXR1cm4gey4uLnN0YXRlLCBkZWNpcGhlcmVkVGV4dH07XG59XG5cbmZ1bmN0aW9uIGRlY2lwaGVyZWRUZXh0UmVzaXplZFJlZHVjZXIgKHN0YXRlLCB7cGF5bG9hZDoge3dpZHRofX0pIHtcbiAgbGV0IHtkZWNpcGhlcmVkVGV4dH0gPSBzdGF0ZTtcbiAgZGVjaXBoZXJlZFRleHQgPSB7Li4uZGVjaXBoZXJlZFRleHQsIHdpZHRoLCBoZWlnaHQ6IDQgKiBkZWNpcGhlcmVkVGV4dC5jZWxsSGVpZ2h0fTtcbiAgZGVjaXBoZXJlZFRleHQgPSB1cGRhdGVHcmlkR2VvbWV0cnkoZGVjaXBoZXJlZFRleHQpO1xuICByZXR1cm4gey4uLnN0YXRlLCBkZWNpcGhlcmVkVGV4dH07XG59XG5cbmZ1bmN0aW9uIGRlY2lwaGVyZWRUZXh0U2Nyb2xsZWRSZWR1Y2VyIChzdGF0ZSwge3BheWxvYWQ6IHtzY3JvbGxUb3B9fSkge1xuICBsZXQge2RlY2lwaGVyZWRUZXh0fSA9IHN0YXRlO1xuICBkZWNpcGhlcmVkVGV4dCA9IHsuLi5kZWNpcGhlcmVkVGV4dCwgc2Nyb2xsVG9wfTtcbiAgcmV0dXJuIHsuLi5zdGF0ZSwgZGVjaXBoZXJlZFRleHR9O1xufVxuXG5mdW5jdGlvbiBkZWNpcGhlcmVkVGV4dExhdGVSZWR1Y2VyIChzdGF0ZSwgX2FjdGlvbikge1xuICBpZiAoIXN0YXRlLnRhc2tEYXRhKSByZXR1cm4gc3RhdGU7XG4gIGxldCB7dGFza0RhdGE6IHthbHBoYWJldCwgY2lwaGVyVGV4dH0sIHNjaGVkdWxpbmc6IHtwb3NpdGlvbn0sIHJvdG9ycywgZGVjaXBoZXJlZFRleHR9ID0gc3RhdGU7XG4gIGZ1bmN0aW9uIGdldENlbGwgKGluZGV4KSB7XG4gICAgY29uc3QgY2lwaGVyZWQgPSBjaXBoZXJUZXh0W2luZGV4XTtcbiAgICBjb25zdCBjZWxsID0ge3Bvc2l0aW9uOiBpbmRleCwgY3VycmVudDogaW5kZXggPT09IHBvc2l0aW9uLCBjaXBoZXJlZH07XG4gICAgbGV0IHJhbmsgPSBhbHBoYWJldC5pbmRleE9mKGNpcGhlcmVkKTtcbiAgICBpZiAocmFuayA9PT0gLTEpIHtcbiAgICAgIGNlbGwuY2xlYXIgPSBjaXBoZXJlZDtcbiAgICB9IGVsc2UgaWYgKGluZGV4IDw9IHBvc2l0aW9uKSB7XG4gICAgICBPYmplY3QuYXNzaWduKGNlbGwsIGFwcGx5Um90b3JzKHJvdG9ycywgaW5kZXgsIHJhbmspKTtcbiAgICAgIGlmIChjZWxsLnJhbmsgIT09IC0xKSB7XG4gICAgICAgIGNlbGwuY2xlYXIgPSBhbHBoYWJldFtjZWxsLnJhbmtdO1xuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gY2VsbDtcbiAgfVxuICBkZWNpcGhlcmVkVGV4dCA9IHVwZGF0ZUdyaWRWaXNpYmxlUm93cyhkZWNpcGhlcmVkVGV4dCwge2dldENlbGx9KTtcbiAgcmV0dXJuIHsuLi5zdGF0ZSwgZGVjaXBoZXJlZFRleHR9O1xufVxuXG5mdW5jdGlvbiBEZWNpcGhlcmVkVGV4dFZpZXdTZWxlY3RvciAoc3RhdGUpIHtcbiAgY29uc3Qge2FjdGlvbnMsIGRlY2lwaGVyZWRUZXh0fSA9IHN0YXRlO1xuICBjb25zdCB7ZGVjaXBoZXJlZFRleHRSZXNpemVkLCBkZWNpcGhlcmVkVGV4dFNjcm9sbGVkLCBzY2hlZHVsaW5nSnVtcH0gPSBhY3Rpb25zO1xuICBjb25zdCB7d2lkdGgsIGhlaWdodCwgY2VsbFdpZHRoLCBjZWxsSGVpZ2h0LCBib3R0b20sIHBhZ2VSb3dzLCBwYWdlQ29sdW1ucywgdmlzaWJsZX0gPSBkZWNpcGhlcmVkVGV4dDtcbiAgcmV0dXJuIHtcbiAgICBkZWNpcGhlcmVkVGV4dFJlc2l6ZWQsIGRlY2lwaGVyZWRUZXh0U2Nyb2xsZWQsIHNjaGVkdWxpbmdKdW1wLFxuICAgIHdpZHRoLCBoZWlnaHQsIHZpc2libGVSb3dzOiB2aXNpYmxlLnJvd3MsIGNlbGxXaWR0aCwgY2VsbEhlaWdodCwgYm90dG9tLCBwYWdlUm93cywgcGFnZUNvbHVtbnNcbiAgfTtcbn1cblxuY2xhc3MgRGVjaXBoZXJlZFRleHRWaWV3IGV4dGVuZHMgUmVhY3QuUHVyZUNvbXBvbmVudCB7XG5cbiAgcmVuZGVyICgpIHtcbiAgICBjb25zdCB7d2lkdGgsIGhlaWdodCwgdmlzaWJsZVJvd3MsIGNlbGxXaWR0aCwgY2VsbEhlaWdodCwgYm90dG9tfSA9IHRoaXMucHJvcHM7XG4gICAgcmV0dXJuIChcbiAgICAgIDxkaXYgcmVmPXt0aGlzLnJlZlRleHRCb3h9IG9uU2Nyb2xsPXt0aGlzLm9uU2Nyb2xsfSBzdHlsZT17e3Bvc2l0aW9uOiAncmVsYXRpdmUnLCB3aWR0aDogd2lkdGggJiYgYCR7d2lkdGh9cHhgLCBoZWlnaHQ6IGhlaWdodCAmJiBgJHtoZWlnaHR9cHhgLCBvdmVyZmxvd1k6ICdzY3JvbGwnfX0+XG4gICAgICAgIHsodmlzaWJsZVJvd3N8fFtdKS5tYXAoKHtpbmRleCwgY29sdW1uc30pID0+XG4gICAgICAgICAgPGRpdiBrZXk9e2luZGV4fSBzdHlsZT17e3Bvc2l0aW9uOiAnYWJzb2x1dGUnLCB0b3A6IGAke2luZGV4ICogY2VsbEhlaWdodH1weGB9fT5cbiAgICAgICAgICAgIHtjb2x1bW5zLm1hcCgoe2luZGV4LCBwb3NpdGlvbiwgY2lwaGVyZWQsIGNsZWFyLCBsb2NrZWQsIGN1cnJlbnR9KSA9PlxuICAgICAgICAgICAgICA8VGV4dENlbGwga2V5PXtpbmRleH0gY29sdW1uPXtpbmRleH0gcG9zaXRpb249e3Bvc2l0aW9ufSBjaXBoZXJlZD17Y2lwaGVyZWR9IGNsZWFyPXtjbGVhcn0gbG9ja2VkPXtsb2NrZWR9IGN1cnJlbnQ9e2N1cnJlbnR9IGNlbGxXaWR0aD17Y2VsbFdpZHRofSBvbkp1bXA9e3RoaXMub25KdW1wfSAvPil9XG4gICAgICAgICAgPC9kaXY+KX1cbiAgICAgICAgPGRpdiBzdHlsZT17e3Bvc2l0aW9uOiAnYWJzb2x1dGUnLCB0b3A6IGAke2JvdHRvbX1weGAsIHdpZHRoOiAnMXB4JywgaGVpZ2h0OiAnMXB4J319Lz5cbiAgICAgIDwvZGl2PlxuICAgICk7XG4gIH1cblxuICByZWZUZXh0Qm94ID0gKGVsZW1lbnQpID0+IHtcbiAgICB0aGlzLl90ZXh0Qm94ID0gZWxlbWVudDtcbiAgICBjb25zdCB3aWR0aCA9IGVsZW1lbnQuY2xpZW50V2lkdGg7XG4gICAgY29uc3QgaGVpZ2h0ID0gZWxlbWVudC5jbGllbnRIZWlnaHQ7XG4gICAgdGhpcy5wcm9wcy5kaXNwYXRjaCh7dHlwZTogdGhpcy5wcm9wcy5kZWNpcGhlcmVkVGV4dFJlc2l6ZWQsIHBheWxvYWQ6IHt3aWR0aCwgaGVpZ2h0fX0pO1xuICB9O1xuXG4gIG9uU2Nyb2xsID0gKCkgPT4ge1xuICAgIGNvbnN0IHNjcm9sbFRvcCA9IHRoaXMuX3RleHRCb3guc2Nyb2xsVG9wO1xuICAgIHRoaXMucHJvcHMuZGlzcGF0Y2goe3R5cGU6IHRoaXMucHJvcHMuZGVjaXBoZXJlZFRleHRTY3JvbGxlZCwgcGF5bG9hZDoge3Njcm9sbFRvcH19KTtcbiAgfTtcblxuICBvbkp1bXAgPSAocG9zaXRpb24pID0+IHtcbiAgICB0aGlzLnByb3BzLmRpc3BhdGNoKHt0eXBlOiB0aGlzLnByb3BzLnNjaGVkdWxpbmdKdW1wLCBwYXlsb2FkOiB7cG9zaXRpb259fSk7XG4gIH07XG5cbn1cblxuY2xhc3MgVGV4dENlbGwgZXh0ZW5kcyBSZWFjdC5QdXJlQ29tcG9uZW50IHtcbiAgcmVuZGVyICgpIHtcbiAgICBjb25zdCB7Y29sdW1uLCBjaXBoZXJlZCwgY2xlYXIsIGxvY2tlZCwgY3VycmVudCwgY2VsbFdpZHRofSA9IHRoaXMucHJvcHM7XG4gICAgY29uc3QgY2VsbFN0eWxlID0ge1xuICAgICAgcG9zaXRpb246ICdhYnNvbHV0ZScsXG4gICAgICBsZWZ0OiBgJHtjb2x1bW4gKiBjZWxsV2lkdGh9cHhgLFxuICAgICAgd2lkdGg6IGAke2NlbGxXaWR0aH1weGAsXG4gICAgICBoZWlnaHQ6IGA0MnB4YCxcbiAgICAgIGJvcmRlcjogJ3NvbGlkICM3NzcnLFxuICAgICAgYm9yZGVyV2lkdGg6ICcxcHggMCcsXG4gICAgICBiYWNrZ3JvdW5kQ29sb3I6IGN1cnJlbnQgPyAnI2FhYScgOiAobG9ja2VkID8gJyNjY2MnIDogJyNmZmYnKSxcbiAgICAgIGN1cnNvcjogJ3BvaW50ZXInXG4gICAgfTtcbiAgICByZXR1cm4gKFxuICAgICAgPGRpdiBzdHlsZT17Y2VsbFN0eWxlfSBvbkNsaWNrPXt0aGlzLl9qdW1wfT5cbiAgICAgICAgPGRpdiBzdHlsZT17e3dpZHRoOiAnMTAwJScsIGhlaWdodDogJzIwcHgnLCBib3JkZXJCb3R0b206ICcxcHggc29saWQgI2NjYycsIHRleHRBbGlnbjogJ2NlbnRlcid9fT57Y2lwaGVyZWQgfHwgJyAnfTwvZGl2PlxuICAgICAgICA8ZGl2IHN0eWxlPXt7d2lkdGg6ICcxMDAlJywgaGVpZ2h0OiAnMjBweCcsIHRleHRBbGlnbjogJ2NlbnRlcid9fT57Y2xlYXIgfHwgJyAnfTwvZGl2PlxuICAgICAgPC9kaXY+XG4gICAgKTtcbiAgfVxuICBfanVtcCA9IChfZXZlbnQpID0+IHtcbiAgICB0aGlzLnByb3BzLm9uSnVtcCh0aGlzLnByb3BzLnBvc2l0aW9uKTtcbiAgfTtcbn1cblxuZXhwb3J0IGRlZmF1bHQge1xuICBhY3Rpb25zOiB7XG4gICAgZGVjaXBoZXJlZFRleHRSZXNpemVkOiAnRGVjaXBoZXJlZFRleHQuUmVzaXplZCcgLyoge3dpZHRoOiBudW1iZXIsIGhlaWdodDogbnVtYmVyfSAqLyxcbiAgICBkZWNpcGhlcmVkVGV4dFNjcm9sbGVkOiAnRGVjaXBoZXJlZFRleHQuU2Nyb2xsZWQnIC8qIHtzY3JvbGxUb3A6IG51bWJlcn0gKi8sXG4gIH0sXG4gIGFjdGlvblJlZHVjZXJzOiB7XG4gICAgYXBwSW5pdDogYXBwSW5pdFJlZHVjZXIsXG4gICAgdGFza0luaXQ6IHRhc2tJbml0UmVkdWNlcixcbiAgICBkZWNpcGhlcmVkVGV4dFJlc2l6ZWQ6IGRlY2lwaGVyZWRUZXh0UmVzaXplZFJlZHVjZXIsXG4gICAgZGVjaXBoZXJlZFRleHRTY3JvbGxlZDogZGVjaXBoZXJlZFRleHRTY3JvbGxlZFJlZHVjZXIsXG4gIH0sXG4gIGxhdGVSZWR1Y2VyOiBkZWNpcGhlcmVkVGV4dExhdGVSZWR1Y2VyLFxuICB2aWV3czoge1xuICAgIERlY2lwaGVyZWRUZXh0OiBjb25uZWN0KERlY2lwaGVyZWRUZXh0Vmlld1NlbGVjdG9yKShEZWNpcGhlcmVkVGV4dFZpZXcpLFxuICB9XG59O1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL2RlY2lwaGVyZWRfdGV4dF9idW5kbGUuanMiLCJcbmltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQge0J1dHRvbn0gZnJvbSAncmVhY3QtYm9vdHN0cmFwJztcbmltcG9ydCB7Y29ubmVjdH0gZnJvbSAncmVhY3QtcmVkdXgnO1xuaW1wb3J0IHtyYW5nZX0gZnJvbSAncmFuZ2UnO1xuaW1wb3J0IGNsYXNzbmFtZXMgZnJvbSAnY2xhc3NuYW1lcyc7XG5cbmZ1bmN0aW9uIFdvcmtzcGFjZVNlbGVjdG9yIChzdGF0ZSkge1xuICBjb25zdCB7XG4gICAgdmlld3M6IHtDaXBoZXJlZFRleHQsIFNlbGVjdGVkVGV4dCwgRnJlcXVlbmN5QW5hbHlzaXMsIFJvdG9yLCBTY2hlZHVsaW5nQ29udHJvbHMsIERlY2lwaGVyZWRUZXh0LCBIaW50UmVxdWVzdEZlZWRiYWNrfSxcbiAgICBhY3Rpb25zOiB7cmVxdWVzdEhpbnR9LFxuICAgIHJvdG9ycywgZWRpdGluZ1xuICB9ID0gc3RhdGU7XG4gIGxldCBoaW50UmVxdWVzdCA9IG51bGw7XG4gIGlmICh0eXBlb2YgZWRpdGluZy5yb3RvckluZGV4ID09PSAnbnVtYmVyJykge1xuICAgIGNvbnN0IGVkaXRpbmdDZWxsID0gcm90b3JzW2VkaXRpbmcucm90b3JJbmRleF0uY2VsbHNbZWRpdGluZy5jZWxsUmFua107XG4gICAgaWYgKCFlZGl0aW5nQ2VsbC5oaW50ICYmICFlZGl0aW5nQ2VsbC5sb2NrZWQpIHtcbiAgICAgIGhpbnRSZXF1ZXN0ID0gZWRpdGluZztcbiAgICB9XG4gIH1cbiAgcmV0dXJuIHtcbiAgICBDaXBoZXJlZFRleHQsIFNlbGVjdGVkVGV4dCwgRnJlcXVlbmN5QW5hbHlzaXMsIFJvdG9yLCBTY2hlZHVsaW5nQ29udHJvbHMsIERlY2lwaGVyZWRUZXh0LFxuICAgIEhpbnRSZXF1ZXN0RmVlZGJhY2ssIHJlcXVlc3RIaW50LCBoaW50UmVxdWVzdCwgbmJSb3RvcnM6IHJvdG9ycy5sZW5ndGhcbiAgfTtcbn1cblxuY2xhc3MgV29ya3NwYWNlIGV4dGVuZHMgUmVhY3QuUHVyZUNvbXBvbmVudCB7XG4gIHJlbmRlciAoKSB7XG4gICAgY29uc3Qge0NpcGhlcmVkVGV4dCwgU2VsZWN0ZWRUZXh0LCBGcmVxdWVuY3lBbmFseXNpcywgUm90b3IsIFNjaGVkdWxpbmdDb250cm9scywgRGVjaXBoZXJlZFRleHQsIG5iUm90b3JzLCBoaW50UmVxdWVzdCwgSGludFJlcXVlc3RGZWVkYmFja30gPSB0aGlzLnByb3BzO1xuICAgIHJldHVybiAoXG4gICAgICA8ZGl2PlxuICAgICAgICA8aDI+e1wiTWVzc2FnZSBjaGlmZnLDqVwifTwvaDI+XG4gICAgICAgIDxDaXBoZXJlZFRleHQvPlxuICAgICAgXG4gICAgICAgIDxoMj57XCJBbmFseXNlIGRlIGZyw6lxdWVuY2UgZGUgbGEgc8OpbGVjdGlvblwifTwvaDI+XG4gICAgICAgIDxGcmVxdWVuY3lBbmFseXNpcy8+XG4gICAgICAgIDxoMj57YFJvdG9yJHtuYlJvdG9ycyA+IDEgPyAncycgOiAnJ30gZGUgZMOpY2hpZmZyZW1lbnRgfTwvaDI+XG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPSdjbGVhcmZpeCc+XG4gICAgICAgICAgPGRpdiBzdHlsZT17e2JvcmRlcjogJzFweCBzb2xpZCAjY2NjJywgZmxvYXQ6ICdyaWdodCcsIHdpZHRoOiAnMjAwcHgnLCBwYWRkaW5nOiAnMTBweCcsIGJvcmRlclJhZGl1czogJzVweCcsIGJhY2tncm91bmRDb2xvcjogJyNmOWY5ZjknLCBmb250U2l6ZTogJzEycHgnLCBtYXJnaW5SaWdodDogJzE1cHgnfX0+XG4gICAgICAgICAgICA8cCBzdHlsZT17e2ZvbnRXZWlnaHQ6ICdib2xkJywgdGV4dEFsaWduOiAnY2VudGVyJ319PntcIkluZGljZXNcIn08L3A+XG4gICAgICAgICAgICA8cD57XCJQb3VyIHVuIGNvw7t0IGRlIFwifTxzcGFuIHN0eWxlPXt7Zm9udFdlaWdodDogJ2JvbGQnfX0+e1wiNSBwb2ludHNcIn08L3NwYW4+e1wiLCBjbGlxdWV6IHN1ciB1bmUgY2FzZSBkZSByb3RvciBldCB2YWxpZGV6IHBvdXIgb2J0ZW5pciBzYSB2YWxldXIuXCJ9PC9wPlxuICAgICAgICAgICAgPGRpdiBzdHlsZT17e3RleHRBbGlnbjogJ2NlbnRlcicsIG1hcmdpbjogJzEwcHggMCd9fT5cbiAgICAgICAgICAgICAgPEJ1dHRvbiBvbkNsaWNrPXt0aGlzLnJlcXVlc3RIaW50fSBkaXNhYmxlZD17IWhpbnRSZXF1ZXN0fT57YFZhbGlkZXJgfTwvQnV0dG9uPlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgPGRpdiBzdHlsZT17e2Zsb2F0OiAnbGVmdCd9fT5cbiAgICAgICAgICAgIHtyYW5nZSgwLCBuYlJvdG9ycykubWFwKGluZGV4ID0+IDxSb3RvciBrZXk9e2luZGV4fSBpbmRleD17aW5kZXh9Lz4pfVxuICAgICAgICAgICAgPFNjaGVkdWxpbmdDb250cm9scy8+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvZGl2PlxuICAgICAgICA8SGludFJlcXVlc3RGZWVkYmFjay8+XG4gICAgICAgIDxoMj57XCJUZXh0ZSBkw6ljaGlmZnLDqVwifTwvaDI+XG4gICAgICAgIDxEZWNpcGhlcmVkVGV4dC8+XG4gICAgICA8L2Rpdj5cbiAgICApO1xuICB9XG4gIHJlcXVlc3RIaW50ID0gKCkgPT4ge1xuICAgIGNvbnN0IHtkaXNwYXRjaCwgcmVxdWVzdEhpbnQsIGhpbnRSZXF1ZXN0fSA9IHRoaXMucHJvcHM7XG4gICAgZGlzcGF0Y2goe3R5cGU6IHJlcXVlc3RIaW50LCBwYXlsb2FkOiB7cmVxdWVzdDogaGludFJlcXVlc3R9fSk7XG4gIH07XG59XG5cbmV4cG9ydCBkZWZhdWx0IHtcbiAgdmlld3M6IHtcbiAgICBXb3Jrc3BhY2U6IGNvbm5lY3QoV29ya3NwYWNlU2VsZWN0b3IpKFdvcmtzcGFjZSksXG4gIH1cbn07XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvd29ya3NwYWNlX2J1bmRsZS5qcyIsIlxuaW1wb3J0IHVwZGF0ZSBmcm9tICdpbW11dGFiaWxpdHktaGVscGVyJztcblxuZnVuY3Rpb24gYmlzZWN0IChhLCB4KSB7XG4gICAgbGV0IGxvID0gMCwgaGkgPSBhLmxlbmd0aCwgbWlkO1xuICAgIHdoaWxlIChsbyA8IGhpKSB7XG4gICAgICAgIG1pZCA9IChsbyArIGhpKSAvIDIgfCAwO1xuICAgICAgICBpZiAoeCA8IGFbbWlkXSkge1xuICAgICAgICAgICAgaGkgPSBtaWQ7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBsbyA9IG1pZCArIDE7XG4gICAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIGxvO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gY2hhbmdlU2VsZWN0aW9uICh2YWx1ZXMsIHZhbHVlLCBzZWxlY3RlZCkge1xuICAgIGNvbnN0IGluZGV4ID0gYmlzZWN0KHZhbHVlcywgdmFsdWUpO1xuICAgIGlmIChzZWxlY3RlZCkge1xuICAgICAgICByZXR1cm4gdmFsdWVzW2luZGV4IC0gMV0gPT09IHZhbHVlID8ge30gOiB7JHNwbGljZTogW1tpbmRleCwgMCwgdmFsdWVdXX07XG4gICAgfSBlbHNlIHtcbiAgICAgICAgcmV0dXJuIHZhbHVlc1tpbmRleCAtIDFdICE9PSB2YWx1ZSA/IHt9IDogeyRzcGxpY2U6IFtbaW5kZXggLSAxLCAxXV19O1xuICAgIH1cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHNvcnRlZEFycmF5SGFzRWxlbWVudCAoYSwgeCkge1xuICBjb25zdCBpID0gYmlzZWN0KGEsIHgpIC0gMTtcbiAgcmV0dXJuIGFbaV0gPT09IHg7XG59XG5cblxuZXhwb3J0IGZ1bmN0aW9uIHVwZGF0ZUdyaWRHZW9tZXRyeSAoZ3JpZCkge1xuICBjb25zdCB7d2lkdGgsIGhlaWdodCwgY2VsbFdpZHRoLCBjZWxsSGVpZ2h0LCBzY3JvbGxUb3AsIG5iQ2VsbHN9ID0gZ3JpZDtcbiAgY29uc3Qgc2Nyb2xsQmFyV2lkdGggPSAyMDtcbiAgY29uc3QgcGFnZUNvbHVtbnMgPSBNYXRoLm1heCg0MCwgTWF0aC5mbG9vcigod2lkdGggLSBzY3JvbGxCYXJXaWR0aCkgLyBjZWxsV2lkdGgpKTtcbiAgY29uc3QgcGFnZVJvd3MgPSBNYXRoLm1heCg4LCBNYXRoLmNlaWwoaGVpZ2h0IC8gY2VsbEhlaWdodCkpO1xuICBjb25zdCBib3R0b20gPSBNYXRoLmNlaWwobmJDZWxscyAvIHBhZ2VDb2x1bW5zKSAqIGNlbGxIZWlnaHQgLSAxO1xuICBjb25zdCBtYXhUb3AgPSBNYXRoLm1heCgwLCBib3R0b20gKyAxIC0gcGFnZVJvd3MgKiBjZWxsSGVpZ2h0KTtcbiAgcmV0dXJuIHsuLi5ncmlkLCBwYWdlQ29sdW1ucywgcGFnZVJvd3MsIHNjcm9sbFRvcDogTWF0aC5taW4obWF4VG9wLCBzY3JvbGxUb3ApLCBib3R0b20sIG1heFRvcH07XG59XG5cbmV4cG9ydCBmdW5jdGlvbiB1cGRhdGVHcmlkVmlzaWJsZVJvd3MgKGdyaWQsIG9wdGlvbnMpIHtcbiAgb3B0aW9ucyA9IG9wdGlvbnMgfHwge307XG4gIGNvbnN0IHtuYkNlbGxzLCBjZWxsSGVpZ2h0LCBwYWdlQ29sdW1ucywgcGFnZVJvd3MsIGNlbGxzLCBzY3JvbGxUb3AsIHNlbGVjdGVkUm93c30gPSBncmlkO1xuICBpZiAodHlwZW9mIHNjcm9sbFRvcCAhPT0gJ251bWJlcicpIHtcbiAgICByZXR1cm4gZ3JpZDtcbiAgfVxuICBjb25zdCBmaXJzdFJvdyA9IE1hdGguZmxvb3Ioc2Nyb2xsVG9wIC8gY2VsbEhlaWdodCk7XG4gIGNvbnN0IGxhc3RSb3cgPSBNYXRoLm1pbihmaXJzdFJvdyArIHBhZ2VSb3dzIC0gMSwgTWF0aC5jZWlsKG5iQ2VsbHMgLyBwYWdlQ29sdW1ucykgLSAxKTtcbiAgY29uc3Qgcm93cyA9IFtdO1xuICBjb25zdCBnZXRDZWxsID0gb3B0aW9ucy5nZXRDZWxsIHx8IChjZWxscyA/IChpbmRleCA9PiAoe2NlbGw6IGNlbGxzW2luZGV4XX0pKSA6IChfaW5kZXggPT4gbnVsbCkpO1xuICBmb3IgKGxldCByb3dJbmRleCA9IGZpcnN0Um93OyByb3dJbmRleCA8PSBsYXN0Um93OyByb3dJbmRleCArPSAxKSB7XG4gICAgY29uc3Qgcm93U3RhcnRQb3MgPSByb3dJbmRleCAqIHBhZ2VDb2x1bW5zO1xuICAgIGNvbnN0IHJvd0NlbGxzID0gW107XG4gICAgZm9yIChsZXQgY29sSW5kZXggPSAwOyBjb2xJbmRleCA8IHBhZ2VDb2x1bW5zOyBjb2xJbmRleCArPSAxKSB7XG4gICAgICByb3dDZWxscy5wdXNoKHtpbmRleDogY29sSW5kZXgsIC4uLmdldENlbGwocm93U3RhcnRQb3MgKyBjb2xJbmRleCl9KTtcbiAgICB9XG4gICAgY29uc3Qgc2VsZWN0ZWQgPSBzZWxlY3RlZFJvd3MgJiYgc29ydGVkQXJyYXlIYXNFbGVtZW50KHNlbGVjdGVkUm93cywgcm93SW5kZXgpO1xuICAgIHJvd3MucHVzaCh7aW5kZXg6IHJvd0luZGV4LCBzZWxlY3RlZCwgY29sdW1uczogcm93Q2VsbHN9KTtcbiAgfVxuICByZXR1cm4gey4uLmdyaWQsIHZpc2libGU6IHtyb3dzfX07XG59XG5cbmV4cG9ydCBmdW5jdGlvbiB1cGRhdGVHcmlkVmlzaWJsZUNvbHVtbnMgKGdyaWQsIG9wdGlvbnMpIHtcbiAgb3B0aW9ucyA9IG9wdGlvbnMgfHwge307XG4gIGNvbnN0IHtjZWxsSGVpZ2h0LCBwYWdlQ29sdW1ucywgcGFnZVJvd3MsIGNlbGxzLCBzY3JvbGxUb3AsIHNlbGVjdGVkQ29sdW1uc30gPSBncmlkO1xuICBpZiAodHlwZW9mIHNjcm9sbFRvcCAhPT0gJ251bWJlcicpIHtcbiAgICByZXR1cm4gZ3JpZDtcbiAgfVxuICBjb25zdCBmaXJzdFJvdyA9IE1hdGguZmxvb3Ioc2Nyb2xsVG9wIC8gY2VsbEhlaWdodCk7XG4gIGNvbnN0IGxhc3RSb3cgPSBmaXJzdFJvdyArIHBhZ2VSb3dzIC0gMTtcbiAgY29uc3QgY29sdW1ucyA9IFtdO1xuICBjb25zdCBnZXRDZWxsID0gb3B0aW9ucy5nZXRDZWxsIHx8IChjZWxscyA/IChpbmRleCA9PiAoe2NlbGw6IGNlbGxzW2luZGV4XX0pKSA6IChfaW5kZXggPT4gbnVsbCkpO1xuICBmb3IgKGxldCBjb2xJbmRleCA9IDA7IGNvbEluZGV4IDwgcGFnZUNvbHVtbnM7IGNvbEluZGV4ICs9IDEpIHtcbiAgICBjb25zdCBjb2xDZWxscyA9IFtdO1xuICAgIGZvciAobGV0IHJvd0luZGV4ID0gZmlyc3RSb3c7IHJvd0luZGV4IDw9IGxhc3RSb3c7IHJvd0luZGV4ICs9IDEpIHtcbiAgICAgIGNvbENlbGxzLnB1c2goe2luZGV4OiByb3dJbmRleCwgLi4uZ2V0Q2VsbChyb3dJbmRleCAqIHBhZ2VDb2x1bW5zICsgY29sSW5kZXgpfSk7XG4gICAgfVxuICAgIGNvbnN0IHNlbGVjdGVkID0gc2VsZWN0ZWRDb2x1bW5zICYmIHNvcnRlZEFycmF5SGFzRWxlbWVudChzZWxlY3RlZENvbHVtbnMsIGNvbEluZGV4KTtcbiAgICBjb2x1bW5zLnB1c2goe2luZGV4OiBjb2xJbmRleCwgc2VsZWN0ZWQsIHJvd3M6IGNvbENlbGxzfSk7XG4gIH1cbiAgcmV0dXJuIHsuLi5ncmlkLCB2aXNpYmxlOiB7Y29sdW1uc319O1xufVxuXG5leHBvcnQgZnVuY3Rpb24gdXBkYXRlR3JpZFZpc2libGVBcmVhIChncmlkLCBvcHRpb25zKSB7XG4gIC8qIFRPRE86IGJ1aWxkIGEgY2FjaGUga2V5LCBzdG9yZSBpdCBpbiB0aGUgZ3JpZCwgdXNlIGl0IHRvIHNraXAgY29tcHV0YXRpb24gd2hlbiB1bmNoYW5nZWQgKi9cbiAgaWYgKGdyaWQubW9kZSA9PT0gJ3Jvd3MnKSB7XG4gICAgcmV0dXJuIHVwZGF0ZUdyaWRWaXNpYmxlUm93cyhncmlkLCBvcHRpb25zKTtcbiAgfVxuICBpZiAoZ3JpZC5tb2RlID09PSAnY29sdW1ucycpIHtcbiAgICByZXR1cm4gdXBkYXRlR3JpZFZpc2libGVDb2x1bW5zKGdyaWQsIG9wdGlvbnMpO1xuICB9XG4gIHJldHVybiBncmlkO1xufVxuXG4vKiBST1RPUiBmdW5jdGlvbnMgKi9cblxuXG5leHBvcnQgZnVuY3Rpb24gbWFrZVJvdG9yIChhbHBoYWJldCwge3NjaGVkdWxlLCBlZGl0YWJsZVJvd30pIHtcbiAgY29uc3Qgc2l6ZSA9IGFscGhhYmV0Lmxlbmd0aDtcbiAgY29uc3QgY2VsbHMgPSBhbHBoYWJldC5zcGxpdCgnJykgLm1hcChmdW5jdGlvbiAoYywgcmFuaykge1xuICAgIHJldHVybiB7cmFuaywgcm90YXRpbmc6IGMsIGVkaXRhYmxlOiBudWxsLCBsb2NrZWQ6IGZhbHNlLCBjb25mbGljdDogZmFsc2V9O1xuICB9KTtcbiAgY29uc3QgbnVsbFBlcm0gPSBuZXcgQXJyYXkoc2l6ZSkuZmlsbCgtMSk7XG4gIHJldHVybiB7YWxwaGFiZXQsIHNpemUsIHNjaGVkdWxlLCBlZGl0YWJsZVJvdywgY2VsbHMsIGZvcndhcmQ6IG51bGxQZXJtLCBiYWNrd2FyZDogbnVsbFBlcm19O1xufVxuXG5leHBvcnQgZnVuY3Rpb24gZHVtcFJvdG9ycyAoYWxwaGFiZXQsIHJvdG9ycykge1xuICByZXR1cm4gcm90b3JzLm1hcChyb3RvciA9PlxuICAgIHJvdG9yLmNlbGxzLm1hcCgoe2VkaXRhYmxlLCBsb2NrZWR9KSA9PlxuICAgICAgW2FscGhhYmV0LmluZGV4T2YoZWRpdGFibGUpLCBsb2NrZWQgPyAxIDogMF0pKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGxvYWRSb3RvcnMgKGFscGhhYmV0LCByb3RvclNwZWNzLCBoaW50cywgcm90b3JEdW1wcykge1xuICByZXR1cm4gcm90b3JEdW1wcy5tYXAoKGNlbGxzLCByb3RvckluZGV4KSA9PiB7XG4gICAgY29uc3QgJGNlbGxzID0gW107XG4gICAgY2VsbHMuZm9yRWFjaCgoY2VsbCwgY2VsbEluZGV4KSA9PiB7XG4gICAgICAvKiBMb2NraW5nIGluZm9ybWF0aW9uIGlzIG5vdCBpbmNsdWRlZCBpbiB0aGUgYW5zd2VyLiAqL1xuICAgICAgaWYgKHR5cGVvZiBjZWxsID09PSAnbnVtYmVyJykgY2VsbCA9IFtjZWxsLCAwXTtcbiAgICAgIGNvbnN0IFtyYW5rLCBsb2NrZWRdID0gY2VsbDtcbiAgICAgICRjZWxsc1tjZWxsSW5kZXhdID0ge1xuICAgICAgICBlZGl0YWJsZTogeyRzZXQ6IHJhbmsgPT09IC0xID8gbnVsbCA6IGFscGhhYmV0W3JhbmtdfSxcbiAgICAgICAgbG9ja2VkOiB7JHNldDogbG9ja2VkICE9PSAwfSxcbiAgICAgIH07XG4gICAgfSk7XG4gICAgaGludHMuZm9yRWFjaCgoe3JvdG9ySW5kZXg6IGksIGNlbGxSYW5rOiBqLCBzeW1ib2x9KSA9PiB7XG4gICAgICBpZiAocm90b3JJbmRleCA9PT0gaSkge1xuICAgICAgICAkY2VsbHNbal0gPSB7XG4gICAgICAgICAgZWRpdGFibGU6IHskc2V0OiBzeW1ib2x9LFxuICAgICAgICAgIGhpbnQ6IHskc2V0OiB0cnVlfSxcbiAgICAgICAgfTtcbiAgICAgIH1cbiAgICB9KTtcbiAgICBsZXQgcm90b3IgPSBtYWtlUm90b3IoYWxwaGFiZXQsIHJvdG9yU3BlY3Nbcm90b3JJbmRleF0pO1xuICAgIHJvdG9yID0gdXBkYXRlKHJvdG9yLCB7Y2VsbHM6ICRjZWxsc30pO1xuICAgIHJvdG9yID0gbWFya1JvdG9yQ29uZmxpY3RzKHVwZGF0ZVBlcm1zKHJvdG9yKSk7XG4gICAgcmV0dXJuIHJvdG9yO1xuICB9KTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGVkaXRSb3RvckNlbGwgKHJvdG9yLCByYW5rLCBzeW1ib2wpIHtcbiAgcm90b3IgPSB1cGRhdGUocm90b3IsIHtjZWxsczoge1tyYW5rXToge2VkaXRhYmxlOiB7JHNldDogc3ltYm9sfX19fSk7XG4gIHJldHVybiB1cGRhdGVQZXJtcyhtYXJrUm90b3JDb25mbGljdHMocm90b3IpKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGxvY2tSb3RvckNlbGwgKHJvdG9yLCByYW5rLCBsb2NrZWQpIHtcbiAgcmV0dXJuIHVwZGF0ZShyb3Rvciwge2NlbGxzOiB7W3JhbmtdOiB7bG9ja2VkOiB7JHNldDogbG9ja2VkfX19fSk7XG59XG5cbmZ1bmN0aW9uIG1hcmtSb3RvckNvbmZsaWN0cyAocm90b3IpIHtcbiAgY29uc3QgY291bnRzID0gbmV3IE1hcCgpO1xuICBjb25zdCBjaGFuZ2VzID0ge307XG4gIGZvciAobGV0IHtyYW5rLCBlZGl0YWJsZSwgY29uZmxpY3R9IG9mIHJvdG9yLmNlbGxzKSB7XG4gICAgaWYgKGNvbmZsaWN0KSB7XG4gICAgICBjaGFuZ2VzW3JhbmtdID0ge2NvbmZsaWN0OiB7JHNldDogZmFsc2V9fTtcbiAgICB9XG4gICAgaWYgKGVkaXRhYmxlICE9PSBudWxsKSB7XG4gICAgICBpZiAoIWNvdW50cy5oYXMoZWRpdGFibGUpKSB7XG4gICAgICAgIGNvdW50cy5zZXQoZWRpdGFibGUsIFtyYW5rXSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBjb3VudHMuZ2V0KGVkaXRhYmxlKS5wdXNoKHJhbmspO1xuICAgICAgfVxuICAgIH1cbiAgfVxuICBmb3IgKGxldCByYW5rcyBvZiBjb3VudHMudmFsdWVzKCkpIHtcbiAgICBpZiAocmFua3MubGVuZ3RoID4gMSkge1xuICAgICAgZm9yIChsZXQgcmFuayBvZiByYW5rcykge1xuICAgICAgICBjaGFuZ2VzW3JhbmtdID0ge2NvbmZsaWN0OiB7JHNldDogdHJ1ZX19O1xuICAgICAgfVxuICAgIH1cbiAgfVxuICByZXR1cm4gdXBkYXRlKHJvdG9yLCB7Y2VsbHM6IGNoYW5nZXN9KTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHVwZGF0ZVJvdG9yV2l0aEtleSAoYWxwaGFiZXQsIHJvdG9yLCBrZXkpIHtcbiAgY29uc3QgJGNlbGxzID0ge307XG4gIGtleS5zcGxpdCgnJykuZm9yRWFjaCgoc3ltYm9sLCBjZWxsSW5kZXgpID0+IHtcbiAgICAkY2VsbHNbY2VsbEluZGV4XSA9IHtcbiAgICAgIGVkaXRhYmxlOiB7JHNldDogYWxwaGFiZXQuaW5kZXhPZihzeW1ib2wpID09PSAtMSA/IG51bGwgOiBzeW1ib2x9XG4gICAgfTtcbiAgfSk7XG4gIHJldHVybiB1cGRhdGVQZXJtcyh1cGRhdGUocm90b3IsIHtjZWxsczogJGNlbGxzfSkpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gdXBkYXRlUGVybXMgKHJvdG9yKSB7XG4gIGNvbnN0IHtzaXplLCBhbHBoYWJldCwgY2VsbHN9ID0gcm90b3I7XG4gIGNvbnN0IGZvcndhcmQgPSBuZXcgQXJyYXkoc2l6ZSkuZmlsbCgtMSk7XG4gIGNvbnN0IGJhY2t3YXJkID0gbmV3IEFycmF5KHNpemUpLmZpbGwoLTEpO1xuICBmb3IgKGxldCBjZWxsIG9mIGNlbGxzKSB7XG4gICAgaWYgKGNlbGwuZWRpdGFibGUgIT09IG51bGwgJiYgIWNlbGwuY29uZmxpY3QpIHtcbiAgICAgIGNvbnN0IHNvdXJjZSA9IGFscGhhYmV0LmluZGV4T2YoY2VsbC5lZGl0YWJsZSk7XG4gICAgICBmb3J3YXJkW3NvdXJjZV0gPSBjZWxsLnJhbms7XG4gICAgICBiYWNrd2FyZFtjZWxsLnJhbmtdID0gc291cmNlO1xuICAgIH1cbiAgfVxuICByZXR1cm4gey4uLnJvdG9yLCBmb3J3YXJkLCBiYWNrd2FyZH07XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBnZXRSb3RvclNoaWZ0IChyb3RvciwgcG9zaXRpb24pIHtcbiAgY29uc3Qge3NpemUsIHNjaGVkdWxlfSA9IHJvdG9yO1xuICByZXR1cm4gc2NoZWR1bGUgPT09IDAgPyAwIDogTWF0aC5mbG9vcihwb3NpdGlvbiAvIHNjaGVkdWxlKSAlIHNpemU7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBhcHBseVJvdG9ycyAocm90b3JzLCBwb3NpdGlvbiwgcmFuaykge1xuICBjb25zdCByZXN1bHQgPSB7cmFuaywgbG9ja3M6IDAsIHRyYWNlOiBbXX07XG4gIGZvciAobGV0IHJvdG9ySW5kZXggPSAwOyByb3RvckluZGV4IDwgcm90b3JzLmxlbmd0aDsgcm90b3JJbmRleCArPSAxKSB7XG4gICAgY29uc3Qgcm90b3IgPSByb3RvcnNbcm90b3JJbmRleF07XG4gICAgY29uc3Qgc2hpZnQgPSBnZXRSb3RvclNoaWZ0KHJvdG9yLCBwb3NpdGlvbik7XG4gICAgYXBwbHlSb3Rvcihyb3Rvciwgc2hpZnQsIHJlc3VsdCk7XG4gICAgaWYgKHJlc3VsdC5yYW5rID09PSAtMSkge1xuICAgICAgYnJlYWs7XG4gICAgfVxuICB9XG4gIGlmIChyZXN1bHQubG9ja3MgPT09IHJvdG9ycy5sZW5ndGgpIHtcbiAgICByZXN1bHQubG9ja2VkID0gdHJ1ZTtcbiAgfVxuICByZXR1cm4gcmVzdWx0O1xufVxuXG5leHBvcnQgZnVuY3Rpb24gYXBwbHlSb3RvciAocm90b3IsIHNoaWZ0LCByZXN1bHQpIHtcbiAgbGV0IHJhbmsgPSByZXN1bHQucmFuaywgY2VsbDtcbiAgLyogTmVnYXRpdmUgc2hpZnQgdG8gdGhlIHN0YXRpYyB0b3Agcm93IGJlZm9yZSBwZXJtdXRhdGlvbi4gKi9cbiAgaWYgKHJvdG9yLmVkaXRhYmxlUm93ID09PSAnYm90dG9tJykge1xuICAgIHJhbmsgPSBhcHBseVNoaWZ0KHJvdG9yLnNpemUsIC1zaGlmdCwgcmFuayk7XG4gICAgY2VsbCA9IHJvdG9yLmNlbGxzW3JhbmtdO1xuICB9XG4gIC8qIEFwcGx5IHRoZSBwZXJtdXRhdGlvbi4gKi9cbiAgcmFuayA9IHJvdG9yLmZvcndhcmRbcmFua107XG4gIC8qIFBvc2l0aXZlIHNoaWZ0IHRvIHRoZSBzdGF0aWMgYm90dG9tIHJvdyBhZnRlciBwZXJtdXRhdGlvbi4gKi9cbiAgaWYgKHJvdG9yLmVkaXRhYmxlUm93ID09PSAndG9wJykge1xuICAgIGNlbGwgPSByb3Rvci5jZWxsc1tyYW5rXTtcbiAgICByYW5rID0gYXBwbHlTaGlmdChyb3Rvci5zaXplLCBzaGlmdCwgcmFuayk7XG4gIH1cbiAgLyogU2F2ZSBuZXcgcmFuayAoY2FuIGJlIC0xKSBhbmQgYXR0cmlidXRlcy4gKi9cbiAgcmVzdWx0LnJhbmsgPSByYW5rO1xuICBpZiAoY2VsbCkge1xuICAgIC8qIFNhdmUgdGhlIHJvdG9yIGNlbGwgdXNlZCBpbiB0aGUgdHJhY2UuICovXG4gICAgcmVzdWx0LnRyYWNlLnB1c2goY2VsbCk7XG4gICAgaWYgKGNlbGwubG9ja2VkIHx8IGNlbGwuaGludCkge1xuICAgICAgcmVzdWx0LmxvY2tzICs9IDE7XG4gICAgfVxuICAgIGlmIChjZWxsLmNvbGxpc2lvbikge1xuICAgICAgcmVzdWx0LmNvbGxpc2lvbiA9IHRydWU7XG4gICAgfVxuICB9XG59XG5cbmZ1bmN0aW9uIGFwcGx5U2hpZnQgKG1vZCwgYW1vdW50LCByYW5rKSB7XG4gIGlmIChyYW5rICE9PSAtMSkge1xuICAgIGlmIChhbW91bnQgPCAwKSB7XG4gICAgICBhbW91bnQgKz0gbW9kO1xuICAgIH1cbiAgICByYW5rID0gKHJhbmsgKyBhbW91bnQpICUgbW9kO1xuICB9XG4gIHJldHVybiByYW5rO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gd3JhcEFyb3VuZCAodmFsdWUsIG1vZCkge1xuICByZXR1cm4gKCh2YWx1ZSAlIG1vZCkgKyBtb2QpICUgbW9kO1xufVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL3V0aWxzLmpzIl0sInNvdXJjZVJvb3QiOiIifQ==