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

var _objectSpread2 = _interopRequireDefault(__webpack_require__(19));

var _immutabilityHelper = _interopRequireDefault(__webpack_require__(54));

var _algorea_react_task = _interopRequireDefault(__webpack_require__(252));

__webpack_require__(552);

__webpack_require__(560);

__webpack_require__(566);

var _ciphered_text_bundle = _interopRequireDefault(__webpack_require__(568));

var _selected_text_bundle = _interopRequireDefault(__webpack_require__(569));

var _frequency_analysis_bundle = _interopRequireDefault(__webpack_require__(570));

var _scheduling_bundle = _interopRequireDefault(__webpack_require__(580));

var _rotors_bundle = _interopRequireDefault(__webpack_require__(581));

var _deciphered_text_bundle = _interopRequireDefault(__webpack_require__(582));

var _workspace_bundle = _interopRequireDefault(__webpack_require__(583));

var _utils = __webpack_require__(68);

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
  includes: [_ciphered_text_bundle.default, _selected_text_bundle.default, _frequency_analysis_bundle.default, _scheduling_bundle.default, _rotors_bundle.default, _deciphered_text_bundle.default, _workspace_bundle.default],
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

var _objectSpread2 = _interopRequireDefault(__webpack_require__(19));

var _react = _interopRequireDefault(__webpack_require__(0));

var _reactDom = _interopRequireDefault(__webpack_require__(21));

var _reactRedux = __webpack_require__(32);

var _queryString = _interopRequireDefault(__webpack_require__(383));

var _redux = __webpack_require__(192);

var _reduxSaga = _interopRequireDefault(__webpack_require__(92));

var _effects = __webpack_require__(44);

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

var _slicedToArray2 = _interopRequireDefault(__webpack_require__(131));

var _regenerator = _interopRequireDefault(__webpack_require__(48));

var _toConsumableArray2 = _interopRequireDefault(__webpack_require__(396));

var _effects = __webpack_require__(44);

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

var _classCallCheck2 = _interopRequireDefault(__webpack_require__(36));

var _createClass2 = _interopRequireDefault(__webpack_require__(37));

var _possibleConstructorReturn2 = _interopRequireDefault(__webpack_require__(38));

var _getPrototypeOf3 = _interopRequireDefault(__webpack_require__(40));

var _inherits2 = _interopRequireDefault(__webpack_require__(41));

var _assertThisInitialized2 = _interopRequireDefault(__webpack_require__(39));

var _defineProperty2 = _interopRequireDefault(__webpack_require__(28));

var _regenerator = _interopRequireDefault(__webpack_require__(48));

var _objectSpread2 = _interopRequireDefault(__webpack_require__(19));

var _react = _interopRequireDefault(__webpack_require__(0));

var _reactBootstrap = __webpack_require__(60);

var _reactRedux = __webpack_require__(32);

var _effects = __webpack_require__(44);

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

var _reactBootstrap = __webpack_require__(60);

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

var _objectSpread2 = _interopRequireDefault(__webpack_require__(19));

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

var _objectSpread2 = _interopRequireDefault(__webpack_require__(19));

var _effects = __webpack_require__(44);

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

var _classCallCheck2 = _interopRequireDefault(__webpack_require__(36));

var _createClass2 = _interopRequireDefault(__webpack_require__(37));

var _possibleConstructorReturn2 = _interopRequireDefault(__webpack_require__(38));

var _getPrototypeOf3 = _interopRequireDefault(__webpack_require__(40));

var _inherits2 = _interopRequireDefault(__webpack_require__(41));

var _assertThisInitialized2 = _interopRequireDefault(__webpack_require__(39));

var _defineProperty2 = _interopRequireDefault(__webpack_require__(28));

var _regenerator = _interopRequireDefault(__webpack_require__(48));

var _objectSpread2 = _interopRequireDefault(__webpack_require__(19));

var _react = _interopRequireDefault(__webpack_require__(0));

var _reactBootstrap = __webpack_require__(60);

var _reactRedux = __webpack_require__(32);

var _effects = __webpack_require__(44);

var _immutabilityHelper = _interopRequireDefault(__webpack_require__(54));

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

var _effects = __webpack_require__(44);

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

var _classCallCheck2 = _interopRequireDefault(__webpack_require__(36));

var _createClass2 = _interopRequireDefault(__webpack_require__(37));

var _possibleConstructorReturn2 = _interopRequireDefault(__webpack_require__(38));

var _getPrototypeOf3 = _interopRequireDefault(__webpack_require__(40));

var _inherits2 = _interopRequireDefault(__webpack_require__(41));

var _assertThisInitialized2 = _interopRequireDefault(__webpack_require__(39));

var _defineProperty2 = _interopRequireDefault(__webpack_require__(28));

var _objectSpread2 = _interopRequireDefault(__webpack_require__(19));

var _react = _interopRequireDefault(__webpack_require__(0));

var _reactRedux = __webpack_require__(32);

var _utils = __webpack_require__(68);

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

var _classCallCheck2 = _interopRequireDefault(__webpack_require__(36));

var _createClass2 = _interopRequireDefault(__webpack_require__(37));

var _possibleConstructorReturn2 = _interopRequireDefault(__webpack_require__(38));

var _getPrototypeOf3 = _interopRequireDefault(__webpack_require__(40));

var _inherits2 = _interopRequireDefault(__webpack_require__(41));

var _assertThisInitialized2 = _interopRequireDefault(__webpack_require__(39));

var _defineProperty2 = _interopRequireDefault(__webpack_require__(28));

var _objectSpread2 = _interopRequireDefault(__webpack_require__(19));

var _react = _interopRequireDefault(__webpack_require__(0));

var _reactRedux = __webpack_require__(32);

var _reactBootstrap = __webpack_require__(60);

var _immutabilityHelper = _interopRequireDefault(__webpack_require__(54));

var _range = __webpack_require__(108);

var _classnames = _interopRequireDefault(__webpack_require__(6));

var _utils = __webpack_require__(68);

function appInitReducer(state, _action) {
  return (0, _objectSpread2.default)({}, state, {
    selectedText: {
      cellWidth: 17,
      cellHeight: 20,
      pageColumns: 30,
      scrollTop: 0,
      mode: 'rows',
      selectedRows: [],
      selectedColumns: [],
      nbCells: 0
    }
  });
}

function taskInitReducer(state, _action) {
  var cipherText = state.taskData.cipherText;
  return (0, _immutabilityHelper.default)(state, {
    selectedText: {
      cells: {
        $set: cipherText
      },
      nbCells: {
        $set: cipherText.length
      }
    }
  });
}

function selectedTextResizedReducer(state, _ref) {
  var _ref$payload = _ref.payload,
      width = _ref$payload.width,
      height = _ref$payload.height;
  var selectedText = state.selectedText;
  selectedText = (0, _objectSpread2.default)({}, selectedText, {
    width: width,
    height: Math.max(8 * selectedText.cellHeight, height)
  });
  return (0, _objectSpread2.default)({}, state, {
    selectedText: selectedText
  });
}

function selectedTextScrolledReducer(state, _ref2) {
  var _ref2$payload = _ref2.payload,
      scrollTop = _ref2$payload.scrollTop,
      rows = _ref2$payload.rows;
  var selectedText = state.selectedText;

  if (typeof rows === 'number') {
    var _selectedText = selectedText,
        cellHeight = _selectedText.cellHeight,
        maxTop = _selectedText.maxTop;
    scrollTop = Math.max(0, Math.min(maxTop, selectedText.scrollTop + rows * cellHeight));
  }

  selectedText = (0, _objectSpread2.default)({}, selectedText, {
    scrollTop: scrollTop
  });
  return (0, _objectSpread2.default)({}, state, {
    selectedText: selectedText
  });
}

function selectedTextModeChangedReducer(state, _ref3) {
  var mode = _ref3.payload.mode;
  var selectedText = state.selectedText;
  selectedText = (0, _objectSpread2.default)({}, selectedText, {
    mode: mode
  });
  return (0, _objectSpread2.default)({}, state, {
    selectedText: selectedText
  });
}

function selectedTextPageColumnsChangedReducer(state, _ref4) {
  var columns = _ref4.payload.columns;
  var selectedText = state.selectedText;
  selectedText = (0, _objectSpread2.default)({}, selectedText, {
    pageColumns: columns,
    selectedRows: [],
    selectedColumns: []
  });
  return (0, _objectSpread2.default)({}, state, {
    selectedText: selectedText
  });
}

function selectedTextSelectionChangedReducer(state, _ref5) {
  var _ref5$payload = _ref5.payload,
      selected = _ref5$payload.selected,
      index = _ref5$payload.index;
  // /* {selected: bool} union ({} or {index: number}) */);
  var selectedText = state.selectedText,
      taskData = state.taskData;
  var _selectedText2 = selectedText,
      mode = _selectedText2.mode;

  if (mode === 'rows') {
    var _selectedText3 = selectedText,
        selectedRows = _selectedText3.selectedRows;

    if (typeof index === 'number') {
      if (selected === 'only') {
        selectedRows = [index];
      } else {
        selected = !(0, _utils.sortedArrayHasElement)(selectedRows, index);
        selectedRows = (0, _immutabilityHelper.default)(selectedRows, (0, _utils.changeSelection)(selectedRows, index, selected));
      }
    } else if (selected) {
      var rows = Math.ceil(taskData.cipherText.length / selectedText.pageColumns);
      selectedRows = (0, _range.range)(0, rows);
    } else {
      selectedRows = [];
    }

    selectedText = (0, _objectSpread2.default)({}, selectedText, {
      selectedRows: selectedRows
    });
  } else if (mode === 'columns') {
    var _selectedText4 = selectedText,
        selectedColumns = _selectedText4.selectedColumns;

    if (typeof index === 'number') {
      if (selected === 'only') {
        selectedColumns = [index];
      } else {
        selected = !(0, _utils.sortedArrayHasElement)(selectedColumns, index);
        selectedColumns = (0, _immutabilityHelper.default)(selectedColumns, (0, _utils.changeSelection)(selectedColumns, index, selected));
      }
    } else if (selected) {
      selectedColumns = (0, _range.range)(0, selectedText.pageColumns);
    } else {
      selectedColumns = [];
    }

    selectedText = (0, _objectSpread2.default)({}, selectedText, {
      selectedColumns: selectedColumns
    });
  }

  return (0, _objectSpread2.default)({}, state, {
    selectedText: selectedText
  });
}

function selectedTextLateReducer(state) {
  var _state = state,
      selectedText = _state.selectedText;

  if (selectedText) {
    selectedText = updateGeometry(selectedText);
    /* TODO: update grid.top so that the same first row remains visible? */

    selectedText = (0, _utils.updateGridVisibleArea)(selectedText);

    if (selectedText !== state.selectedText) {
      state = (0, _objectSpread2.default)({}, state, {
        selectedText: selectedText
      });
    }
  }

  return state;
}

function updateGeometry(grid) {
  /* TODO: build a cache key, store it in the grid, use it to skip computation when unchanged */
  var height = grid.height,
      cellHeight = grid.cellHeight,
      scrollTop = grid.scrollTop,
      cells = grid.cells,
      pageColumns = grid.pageColumns;
  var pageRows = Math.max(8, Math.ceil(height / cellHeight));
  var bottom = 100,
      maxTop = 0;

  if (height && cells) {
    bottom = Math.ceil(cells.length / pageColumns) * cellHeight - 1;
    maxTop = Math.max(0, bottom + 1 - pageRows * cellHeight);
  }

  return (0, _objectSpread2.default)({}, grid, {
    pageRows: pageRows,
    scrollTop: Math.min(maxTop, scrollTop),
    bottom: bottom,
    maxTop: maxTop
  });
}

function SelectedTextViewSelector(state) {
  var actions = state.actions,
      selectedText = state.selectedText;
  var selectedTextResized = actions.selectedTextResized,
      selectedTextScrolled = actions.selectedTextScrolled,
      selectedTextModeChanged = actions.selectedTextModeChanged,
      selectedTextPageColumnsChanged = actions.selectedTextPageColumnsChanged,
      selectedTextSelectionChanged = actions.selectedTextSelectionChanged;
  var width = selectedText.width,
      height = selectedText.height,
      cellWidth = selectedText.cellWidth,
      cellHeight = selectedText.cellHeight,
      bottom = selectedText.bottom,
      pageRows = selectedText.pageRows,
      pageColumns = selectedText.pageColumns,
      visible = selectedText.visible,
      mode = selectedText.mode,
      scrollTop = selectedText.scrollTop;
  return {
    selectedTextResized: selectedTextResized,
    selectedTextScrolled: selectedTextScrolled,
    selectedTextModeChanged: selectedTextModeChanged,
    selectedTextPageColumnsChanged: selectedTextPageColumnsChanged,
    selectedTextSelectionChanged: selectedTextSelectionChanged,
    width: width,
    height: height,
    visible: visible,
    cellWidth: cellWidth,
    cellHeight: cellHeight,
    bottom: bottom,
    pageRows: pageRows,
    pageColumns: pageColumns,
    mode: mode,
    scrollTop: scrollTop
  };
}

var SelectedTextView =
/*#__PURE__*/
function (_React$PureComponent) {
  (0, _inherits2.default)(SelectedTextView, _React$PureComponent);

  function SelectedTextView() {
    var _getPrototypeOf2;

    var _this;

    (0, _classCallCheck2.default)(this, SelectedTextView);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = (0, _possibleConstructorReturn2.default)(this, (_getPrototypeOf2 = (0, _getPrototypeOf3.default)(SelectedTextView)).call.apply(_getPrototypeOf2, [this].concat(args)));
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)), "state", {
      pageColumns: null
    });
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)), "refTextBox", function (element) {
      _this._textBox = element;
      var width = element.clientWidth;
      var height = element.clientHeight;

      _this.props.dispatch({
        type: _this.props.selectedTextResized,
        payload: {
          width: width,
          height: height
        }
      });
    });
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)), "onScroll", function () {
      var scrollTop = _this._textBox.scrollTop;

      _this.props.dispatch({
        type: _this.props.selectedTextScrolled,
        payload: {
          scrollTop: scrollTop
        }
      });
    });
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)), "setRowMode", function () {
      _this.props.dispatch({
        type: _this.props.selectedTextModeChanged,
        payload: {
          mode: 'rows'
        }
      });
    });
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)), "setColMode", function () {
      _this.props.dispatch({
        type: _this.props.selectedTextModeChanged,
        payload: {
          mode: 'columns'
        }
      });
    });
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)), "scrollPageUp", function () {
      _this.props.dispatch({
        type: _this.props.selectedTextScrolled,
        payload: {
          rows: -_this.props.pageRows
        }
      });
    });
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)), "scrollRowUp", function () {
      _this.props.dispatch({
        type: _this.props.selectedTextScrolled,
        payload: {
          rows: -1
        }
      });
    });
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)), "scrollRowDown", function () {
      _this.props.dispatch({
        type: _this.props.selectedTextScrolled,
        payload: {
          rows: 1
        }
      });
    });
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)), "scrollPageDown", function () {
      _this.props.dispatch({
        type: _this.props.selectedTextScrolled,
        payload: {
          rows: _this.props.pageRows
        }
      });
    });
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)), "pageColumnsChange", function (event) {
      var text = event.target.value;
      var value = parseInt(text);

      if (!isNaN(value) && value > 0 && value < 80) {
        _this.setState({
          pageColumns: null
        });

        _this.props.dispatch({
          type: _this.props.selectedTextPageColumnsChanged,
          payload: {
            columns: value
          }
        });
      } else {
        _this.setState({
          pageColumns: text
        });
      }
    });
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)), "selectAll", function () {
      _this.props.dispatch({
        type: _this.props.selectedTextSelectionChanged,
        payload: {
          selected: true
        }
      });
    });
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)), "selectNone", function () {
      _this.props.dispatch({
        type: _this.props.selectedTextSelectionChanged,
        payload: {
          selected: false
        }
      });
    });
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)), "rowClicked", function (event) {
      var index = parseInt(event.currentTarget.dataset.index);

      _this.props.dispatch({
        type: _this.props.selectedTextSelectionChanged,
        payload: {
          index: index,
          selected: event.shiftKey ? 'toggle' : 'only'
        }
      });
    });
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)), "columnClicked", function (event) {
      var index = parseInt(event.currentTarget.dataset.index);

      _this.props.dispatch({
        type: _this.props.selectedTextSelectionChanged,
        payload: {
          index: index,
          selected: event.shiftKey ? 'toggle' : 'only'
        }
      });
    });
    return _this;
  }

  (0, _createClass2.default)(SelectedTextView, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      this.selectAll();
    }
  }, {
    key: "render",
    value: function render() {
      var _this$props = this.props,
          width = _this$props.width,
          height = _this$props.height,
          visible = _this$props.visible,
          cellWidth = _this$props.cellWidth,
          cellHeight = _this$props.cellHeight,
          pageColumns = _this$props.pageColumns,
          bottom = _this$props.bottom,
          mode = _this$props.mode;
      return _react.default.createElement("div", null);
    }
  }, {
    key: "componentDidUpdate",
    value: function componentDidUpdate() {
      if (this._textBox) {
        this._textBox.scrollTop = this.props.scrollTop;
      }
    }
  }]);
  return SelectedTextView;
}(_react.default.PureComponent);

var _default = {
  actions: {
    selectedTextResized: 'SelectedText.Resized'
    /* {width: number, height: number} */
    ,
    selectedTextScrolled: 'SelectedText.Scrolled'
    /* {top: number} */
    ,
    selectedTextModeChanged: 'SelectedText.Mode.Changed'
    /* {mode: 'rows' or 'columns'} */
    ,
    selectedTextPageColumnsChanged: 'SelectedText.PageColumns.Changed'
    /* {columns: number} */
    ,
    selectedTextSelectionChanged: 'SelectedText.Selection.Changed'
    /* {selected: bool} union ({} or {index: number}) */

  },
  actionReducers: {
    appInit: appInitReducer,
    taskInit: taskInitReducer,
    selectedTextResized: selectedTextResizedReducer,
    selectedTextScrolled: selectedTextScrolledReducer,
    selectedTextModeChanged: selectedTextModeChangedReducer,
    selectedTextPageColumnsChanged: selectedTextPageColumnsChangedReducer,
    selectedTextSelectionChanged: selectedTextSelectionChangedReducer
  },
  lateReducer: selectedTextLateReducer,
  views: {
    SelectedText: (0, _reactRedux.connect)(SelectedTextViewSelector)(SelectedTextView)
  }
};
exports.default = _default;

/***/ }),

/***/ 570:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireDefault = __webpack_require__(10);

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _classCallCheck2 = _interopRequireDefault(__webpack_require__(36));

var _createClass2 = _interopRequireDefault(__webpack_require__(37));

var _possibleConstructorReturn2 = _interopRequireDefault(__webpack_require__(38));

var _getPrototypeOf2 = _interopRequireDefault(__webpack_require__(40));

var _inherits2 = _interopRequireDefault(__webpack_require__(41));

var _slicedToArray2 = _interopRequireDefault(__webpack_require__(131));

var _objectSpread2 = _interopRequireDefault(__webpack_require__(19));

var _react = _interopRequireDefault(__webpack_require__(0));

var _reactRedux = __webpack_require__(32);

var _range = __webpack_require__(108);

var _seedrandom = _interopRequireDefault(__webpack_require__(571));

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
        _state$selectedText = _state.selectedText,
        mode = _state$selectedText.mode,
        pageColumns = _state$selectedText.pageColumns,
        selectedRows = _state$selectedText.selectedRows,
        selectedColumns = _state$selectedText.selectedColumns,
        frequencyAnalysis = _state.frequencyAnalysis;
    var textFrequencies = [];

    if (mode === 'rows' && selectedRows.length !== 0) {
      var freqMap = new Map(alphabet.split('').map(function (c) {
        return [c, 0];
      }));
      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        for (var _iterator = selectedRows[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          var index = _step.value;
          var startPos = index * pageColumns;
          var endPos = startPos + pageColumns - 1;
          countSymbols(freqMap, cipherText, startPos, endPos);
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

      textFrequencies = normalizeAndSortFrequencies(freqMap.entries());
    } else if (mode === 'columns' && selectedColumns.length !== 0) {
      if (pageColumns !== 26) {
        var rng = (0, _seedrandom.default)(selectedColumns.join(','));
        var baseProba = 1 / alphabet.length;
        var maxRefProba = referenceFrequencies.reduce(function (a, x) {
          return Math.max(a, x.proba);
        }, 0);
        var epsilon = maxRefProba * 2 / 30;
        /* 2 pixels after scaling */

        var entries = alphabet.split('').map(function (c) {
          return [c, baseProba + epsilon * (rng() * 2 - 1)];
        });
        textFrequencies = normalizeAndSortFrequencies(entries);
      } else {
        var selectedFrequencies = new Array(alphabet.length).fill(0);
        var _iteratorNormalCompletion2 = true;
        var _didIteratorError2 = false;
        var _iteratorError2 = undefined;

        try {
          for (var _iterator2 = selectedColumns[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
            var col = _step2.value;
            sumFrequencies(selectedFrequencies, frequencies[col]);
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

        textFrequencies = normalizeAndSortFrequencies(selectedFrequencies.map(function (proba, i) {
          return [alphabet[i], proba];
        }));
      }
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

/***/ 579:
/***/ (function(module, exports) {

/* (ignored) */

/***/ }),

/***/ 580:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireDefault = __webpack_require__(10);

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _classCallCheck2 = _interopRequireDefault(__webpack_require__(36));

var _createClass2 = _interopRequireDefault(__webpack_require__(37));

var _possibleConstructorReturn2 = _interopRequireDefault(__webpack_require__(38));

var _getPrototypeOf3 = _interopRequireDefault(__webpack_require__(40));

var _inherits2 = _interopRequireDefault(__webpack_require__(41));

var _assertThisInitialized2 = _interopRequireDefault(__webpack_require__(39));

var _defineProperty2 = _interopRequireDefault(__webpack_require__(28));

var _regenerator = _interopRequireDefault(__webpack_require__(48));

var _objectSpread2 = _interopRequireDefault(__webpack_require__(19));

var _react = _interopRequireDefault(__webpack_require__(0));

var _reactRedux = __webpack_require__(32);

var _reactBootstrap = __webpack_require__(60);

var _immutabilityHelper = _interopRequireDefault(__webpack_require__(54));

var _reduxSaga = __webpack_require__(92);

var _effects = __webpack_require__(44);

var _utils = __webpack_require__(68);

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

/***/ 581:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireDefault = __webpack_require__(10);

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _classCallCheck2 = _interopRequireDefault(__webpack_require__(36));

var _createClass2 = _interopRequireDefault(__webpack_require__(37));

var _possibleConstructorReturn2 = _interopRequireDefault(__webpack_require__(38));

var _getPrototypeOf4 = _interopRequireDefault(__webpack_require__(40));

var _inherits2 = _interopRequireDefault(__webpack_require__(41));

var _assertThisInitialized2 = _interopRequireDefault(__webpack_require__(39));

var _defineProperty2 = _interopRequireDefault(__webpack_require__(28));

var _objectSpread2 = _interopRequireDefault(__webpack_require__(19));

var _react = _interopRequireDefault(__webpack_require__(0));

var _reactRedux = __webpack_require__(32);

var _classnames = _interopRequireDefault(__webpack_require__(6));

var _range = __webpack_require__(108);

var _immutabilityHelper = _interopRequireDefault(__webpack_require__(54));

var _utils = __webpack_require__(68);

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

/***/ 582:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireDefault = __webpack_require__(10);

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _classCallCheck2 = _interopRequireDefault(__webpack_require__(36));

var _createClass2 = _interopRequireDefault(__webpack_require__(37));

var _possibleConstructorReturn2 = _interopRequireDefault(__webpack_require__(38));

var _getPrototypeOf4 = _interopRequireDefault(__webpack_require__(40));

var _inherits2 = _interopRequireDefault(__webpack_require__(41));

var _assertThisInitialized2 = _interopRequireDefault(__webpack_require__(39));

var _defineProperty2 = _interopRequireDefault(__webpack_require__(28));

var _objectSpread2 = _interopRequireDefault(__webpack_require__(19));

var _react = _interopRequireDefault(__webpack_require__(0));

var _reactRedux = __webpack_require__(32);

var _utils = __webpack_require__(68);

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

/***/ 583:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireDefault = __webpack_require__(10);

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _classCallCheck2 = _interopRequireDefault(__webpack_require__(36));

var _createClass2 = _interopRequireDefault(__webpack_require__(37));

var _possibleConstructorReturn2 = _interopRequireDefault(__webpack_require__(38));

var _getPrototypeOf3 = _interopRequireDefault(__webpack_require__(40));

var _inherits2 = _interopRequireDefault(__webpack_require__(41));

var _assertThisInitialized2 = _interopRequireDefault(__webpack_require__(39));

var _defineProperty2 = _interopRequireDefault(__webpack_require__(28));

var _react = _interopRequireDefault(__webpack_require__(0));

var _reactBootstrap = __webpack_require__(60);

var _reactRedux = __webpack_require__(32);

var _range = __webpack_require__(108);

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
      return _react.default.createElement("div", null, _react.default.createElement("h2", null, "Message chiffré"), _react.default.createElement(CipheredText, null), _react.default.createElement(SelectedText, null), _react.default.createElement("h2", null, "Analyse de fréquence de la sélection"), _react.default.createElement(FrequencyAnalysis, null), _react.default.createElement("h2", null, "Rotor".concat(nbRotors > 1 ? 's' : '', " de d\xE9chiffrement")), _react.default.createElement("div", {
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

/***/ 68:
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

var _defineProperty2 = _interopRequireDefault(__webpack_require__(28));

var _slicedToArray2 = _interopRequireDefault(__webpack_require__(131));

var _objectSpread2 = _interopRequireDefault(__webpack_require__(19));

var _immutabilityHelper = _interopRequireDefault(__webpack_require__(54));

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zcmMvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2FsZ29yZWFfcmVhY3RfdGFzay9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvYWxnb3JlYV9yZWFjdF90YXNrL2xpbmtlci5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvYWxnb3JlYV9yZWFjdF90YXNrL3VpL3N0eWxlcy5jc3M/ZThiOSIsIndlYnBhY2s6Ly8vLi9zcmMvYWxnb3JlYV9yZWFjdF90YXNrL3VpL3N0eWxlcy5jc3MiLCJ3ZWJwYWNrOi8vLy4vc3JjL2FsZ29yZWFfcmVhY3RfdGFzay9hcHBfYnVuZGxlLmpzIiwid2VicGFjazovLy8uL3NyYy9hbGdvcmVhX3JlYWN0X3Rhc2svdWkvdGFza19iYXIuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2FsZ29yZWFfcmVhY3RfdGFzay91aS9zcGlubmVyLmpzIiwid2VicGFjazovLy8uL3NyYy9hbGdvcmVhX3JlYWN0X3Rhc2svbGVnYWN5L3Rhc2suanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2FsZ29yZWFfcmVhY3RfdGFzay9zZXJ2ZXJfYXBpLmpzIiwid2VicGFjazovLy8uL3NyYy9hbGdvcmVhX3JlYWN0X3Rhc2svbGVnYWN5L3BsYXRmb3JtX2FkYXB0ZXIuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2FsZ29yZWFfcmVhY3RfdGFzay9wbGF0Zm9ybV9idW5kbGUuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2FsZ29yZWFfcmVhY3RfdGFzay9oaW50c19idW5kbGUuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2FsZ29yZWFfcmVhY3RfdGFzay93aW5kb3dfaGVpZ2h0X21vbml0b3IuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3N0eWxlLmNzcz8xNWY0Iiwid2VicGFjazovLy8uL3NyYy9zdHlsZS5jc3MiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NpcGhlcmVkX3RleHRfYnVuZGxlLmpzIiwid2VicGFjazovLy8uL3NyYy9zZWxlY3RlZF90ZXh0X2J1bmRsZS5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvZnJlcXVlbmN5X2FuYWx5c2lzX2J1bmRsZS5qcyIsIndlYnBhY2s6Ly8vY3J5cHRvIChpZ25vcmVkKSIsIndlYnBhY2s6Ly8vLi9zcmMvc2NoZWR1bGluZ19idW5kbGUuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3JvdG9yc19idW5kbGUuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2RlY2lwaGVyZWRfdGV4dF9idW5kbGUuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3dvcmtzcGFjZV9idW5kbGUuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3V0aWxzLmpzIl0sIm5hbWVzIjpbIlRhc2tCdW5kbGUiLCJhY3Rpb25SZWR1Y2VycyIsImFwcEluaXQiLCJhcHBJbml0UmVkdWNlciIsInRhc2tJbml0IiwidGFza0luaXRSZWR1Y2VyIiwidGFza1JlZnJlc2giLCJ0YXNrUmVmcmVzaFJlZHVjZXIiLCJ0YXNrQW5zd2VyTG9hZGVkIiwidGFza1N0YXRlTG9hZGVkIiwiaW5jbHVkZXMiLCJDaXBoZXJlZFRleHRCdW5kbGUiLCJTZWxlY3RlZFRleHRCdW5kbGUiLCJGcmVxdWVuY3lBbmFseXNpc0J1bmRsZSIsIlNjaGVkdWxpbmdCdW5kbGUiLCJSb3RvcnNCdW5kbGUiLCJEZWNpcGhlcmVkVGV4dEJ1bmRsZSIsIldvcmtzcGFjZUJ1bmRsZSIsInNlbGVjdG9ycyIsImdldFRhc2tTdGF0ZSIsImdldFRhc2tBbnN3ZXIiLCJwcm9jZXNzIiwiZWFybHlSZWR1Y2VyIiwic3RhdGUiLCJhY3Rpb24iLCJjb25zb2xlIiwibG9nIiwidHlwZSIsIl9hY3Rpb24iLCJ0YXNrTWV0YURhdGEiLCJ0YXNrRGF0YSIsImFscGhhYmV0Iiwicm90b3JTcGVjcyIsInJvdG9ycyIsImhpbnRzIiwibWFwIiwiXyIsInRhc2tSZWFkeSIsImR1bXAiLCJyb3RvciIsImNlbGxzIiwiZWRpdGFibGUiLCJpbmRleE9mIiwiYW5zd2VyIiwicGF5bG9hZCIsIiRzZXQiLCJydW4iLCJjb250YWluZXIiLCJvcHRpb25zIiwicGxhdGZvcm0iLCJ3aW5kb3ciLCJkZWJ1ZyIsIkFwcEJ1bmRsZSIsImFjdGlvbnMiLCJ2aWV3cyIsInJlZHVjZXIiLCJyb290U2FnYSIsInNhZmVSZWR1Y2VyIiwiZXgiLCJlcnJvciIsImVycm9ycyIsInNhZ2FNaWRkbGV3YXJlIiwiZW5oYW5jZXIiLCJzdG9yZSIsInN0YXJ0IiwicXVlcnkiLCJxdWVyeVN0cmluZyIsInBhcnNlIiwibG9jYXRpb24iLCJzZWFyY2giLCJ0YXNrVG9rZW4iLCJzVG9rZW4iLCJkaXNwYXRjaCIsIlJlYWN0RE9NIiwicmVuZGVyIiwibGluayIsInJvb3RCdW5kbGUiLCJmZWF0dXJlcyIsIkFjdGlvbnMiLCJWaWV3cyIsIlNlbGVjdG9ycyIsIkVhcmx5UmVkdWNlcnMiLCJSZWR1Y2VycyIsIkFjdGlvblJlZHVjZXJzIiwiTGF0ZVJlZHVjZXJzIiwiU2FnYXMiLCJhcHAiLCJmZWF0dXJlIiwicHJlcGFyZSIsImxpbmtCdW5kbGUiLCJmaW5hbGl6ZSIsImJ1bmRsZSIsImFkZCIsInN1YkJ1bmRsZSIsIk9iamVjdCIsImFzc2lnbiIsIl9hcHAiLCJ1bmRlZmluZWQiLCJyZWR1Y2VycyIsInNlcXVlbmNlUmVkdWNlcnMiLCJsYXRlUmVkdWNlciIsIk1hcCIsImtleXMiLCJrZXkiLCJnZXQiLCJzZXQiLCJhY3Rpb25SZWR1Y2VyIiwibWFrZUFjdGlvblJlZHVjZXIiLCJzYWdhcyIsInNhZ2EiLCJwdXNoIiwiQXJyYXkiLCJwcm90b3R5cGUiLCJhcHBseSIsImVmZmVjdHMiLCJlbnRyaWVzIiwicmVzdWx0IiwiaSIsImxlbmd0aCIsIkVycm9yIiwiY29tcG9zZVJlZHVjZXJzIiwiZnN0Iiwic25kIiwiYXBwU2FnYSIsImFwcEluaXRTYWdhIiwicGxhdGZvcm1WYWxpZGF0ZVNhZ2EiLCJhcHBJbml0RG9uZVJlZHVjZXIiLCJwbGF0Zm9ybUFwaSIsInRhc2tBcGkiLCJzZXJ2ZXJBcGkiLCJhcHBJbml0RmFpbGVkUmVkdWNlciIsIm1lc3NhZ2UiLCJmYXRhbEVycm9yIiwicGxhdGZvcm1WYWxpZGF0ZSIsInRhc2tBY3Rpb25zIiwibG9hZCIsInVubG9hZCIsInVwZGF0ZVRva2VuIiwiZ2V0SGVpZ2h0IiwiZ2V0TWV0YURhdGEiLCJnZXRWaWV3cyIsInNob3dWaWV3cyIsImdldFN0YXRlIiwicmVsb2FkU3RhdGUiLCJnZXRBbnN3ZXIiLCJyZWxvYWRBbnN3ZXIiLCJncmFkZUFuc3dlciIsInNlcnZlcl9tb2R1bGUiLCJtYWtlVGFza0NoYW5uZWwiLCJ0YXNrQ2hhbm5lbCIsInRhc2siLCJhcHBJbml0RmFpbGVkIiwidG9TdHJpbmciLCJhcHBJbml0RG9uZSIsImluaXRXaXRoVGFzayIsIndpbmRvd0hlaWdodE1vbml0b3JTYWdhIiwibW9kZSIsInZhbGlkYXRlIiwiQXBwU2VsZWN0b3IiLCJXb3Jrc3BhY2UiLCJncmFkaW5nIiwiQXBwIiwicHJvcHMiLCJfdmFsaWRhdGUiLCJmb250V2VpZ2h0Iiwic2NvcmUiLCJSZWFjdCIsIlB1cmVDb21wb25lbnQiLCJQbGF0Zm9ybUJ1bmRsZSIsIkhpbnRzQnVuZGxlIiwiVGFza0JhciIsIm9uVmFsaWRhdGUiLCJTcGlubmVyIiwiX3Byb3BzIiwiZm9udFNpemUiLCJlbWl0IiwibWFrZVRhc2siLCJwcm9wIiwiYnVmZmVycyIsImV4cGFuZGluZyIsInN1Y2Nlc3MiLCJ0b2tlbiIsImFuc3dlclRva2VuIiwiZmV0Y2giLCJtYWtlU2VydmVyQXBpIiwiY29uZmlnIiwic2VydmljZSIsImJvZHkiLCJQcm9taXNlIiwicmVzb2x2ZSIsInJlamVjdCIsInVybCIsIlVSTCIsImJhc2VVcmwiLCJkZXZlbCIsIm1ldGhvZCIsImhlYWRlcnMiLCJKU09OIiwic3RyaW5naWZ5IiwidGhlbiIsInJlc3BvbnNlIiwic3RhdHVzIiwianNvbiIsImNhdGNoIiwiZGF0YSIsImdldFRhc2tQYXJhbXMiLCJkZWZhdWx0VmFsdWUiLCJhc2tIaW50IiwiaGludFRva2VuIiwidXBkYXRlRGlzcGxheSIsInRhc2tTaG93Vmlld3NFdmVudFNhZ2EiLCJ0YXNrR2V0Vmlld3NFdmVudFNhZ2EiLCJ0YXNrVXBkYXRlVG9rZW5FdmVudFNhZ2EiLCJ0YXNrR2V0SGVpZ2h0RXZlbnRTYWdhIiwidGFza1VubG9hZEV2ZW50U2FnYSIsInRhc2tHZXRNZXRhRGF0YUV2ZW50U2FnYSIsInRhc2tHZXRBbnN3ZXJFdmVudFNhZ2EiLCJ0YXNrUmVsb2FkQW5zd2VyRXZlbnRTYWdhIiwidGFza0dldFN0YXRlRXZlbnRTYWdhIiwidGFza1JlbG9hZFN0YXRlRXZlbnRTYWdhIiwidGFza0xvYWRFdmVudFNhZ2EiLCJ0YXNrR3JhZGVBbnN3ZXJFdmVudFNhZ2EiLCJ0YXNrRGF0YUxvYWRlZFJlZHVjZXIiLCJ0YXNrU3RhdGVMb2FkZWRSZWR1Y2VyIiwidGFza0Fuc3dlckxvYWRlZFJlZHVjZXIiLCJ0YXNrU2hvd1ZpZXdzRXZlbnRSZWR1Y2VyIiwidGFza1ZpZXdzIiwidGFza1VwZGF0ZVRva2VuRXZlbnRSZWR1Y2VyIiwid2FybiIsImQiLCJkb2N1bWVudCIsImgiLCJNYXRoIiwibWF4Iiwib2Zmc2V0SGVpZ2h0IiwiZG9jdW1lbnRFbGVtZW50IiwiX2Vycm9yIiwibWV0YURhdGEiLCJzdHJBbnN3ZXIiLCJzdHJEdW1wIiwiX3ZpZXdzIiwidGFza0RhdGFMb2FkZWQiLCJ0YXNrQW5zd2VyR3JhZGVkIiwibWluU2NvcmUiLCJtYXhTY29yZSIsIm5vU2NvcmUiLCJtaW5fc2NvcmUiLCJtYXhfc2NvcmUiLCJub19zY29yZSIsInNjb3JlVG9rZW4iLCJ0YXNrQW5zd2VyR3JhZGVkUmVkdWNlciIsInRhc2tMb2FkRXZlbnQiLCJ0YXNrVW5sb2FkRXZlbnQiLCJ0YXNrVXBkYXRlVG9rZW5FdmVudCIsInRhc2tHZXRIZWlnaHRFdmVudCIsInRhc2tHZXRNZXRhRGF0YUV2ZW50IiwidGFza0dldFZpZXdzRXZlbnQiLCJ0YXNrU2hvd1ZpZXdzRXZlbnQiLCJ0YXNrR2V0U3RhdGVFdmVudCIsInRhc2tSZWxvYWRTdGF0ZUV2ZW50IiwidGFza0dldEFuc3dlckV2ZW50IiwidGFza1JlbG9hZEFuc3dlckV2ZW50IiwidGFza0dyYWRlQW5zd2VyRXZlbnQiLCJyZXF1ZXN0SGludFNhZ2EiLCJoaW50UmVxdWVzdEZ1bGZpbGxlZFJlZHVjZXIiLCJoaW50UmVxdWVzdCIsImhpbnRSZXF1ZXN0UmVqZWN0ZWRSZWR1Y2VyIiwiY29kZSIsImhpbnRSZXF1ZXN0RmVlZGJhY2tDbGVhcmVkUmVkdWNlciIsInJlcXVlc3QiLCJpbml0aWFsVGFza1Rva2VuIiwidXBkYXRlZFRhc2tUb2tlbiIsImhpbnRSZXF1ZXN0RnVsZmlsbGVkIiwiaGludFJlcXVlc3RSZWplY3RlZCIsIkhpbnRSZXF1ZXN0RmVlZGJhY2tTZWxlY3RvciIsImhpbnRSZXF1ZXN0RmVlZGJhY2tDbGVhcmVkIiwidmlzaWJsZSIsIkhpbnRSZXF1ZXN0RmVlZGJhY2siLCJoYW5kbGVEaXNtaXNzIiwicmVxdWVzdEhpbnQiLCJoaW50c1NhZ2EiLCJjaGFubmVsIiwib25SZXNpemUiLCJoZWlnaHQiLCJjbGllbnRIZWlnaHQiLCJhZGRFdmVudExpc3RlbmVyIiwicmVtb3ZlRXZlbnRMaXN0ZW5lciIsInNsaWRpbmciLCJsYXN0SGVpZ2h0IiwiY2xvc2UiLCJjaXBoZXJlZFRleHQiLCJjZWxsV2lkdGgiLCJjZWxsSGVpZ2h0Iiwic2Nyb2xsVG9wIiwibmJDZWxscyIsImNpcGhlclRleHQiLCJjaXBoZXJlZFRleHRSZXNpemVkUmVkdWNlciIsIndpZHRoIiwiY2lwaGVyZWRUZXh0U2Nyb2xsZWRSZWR1Y2VyIiwiQ2lwaGVyVGV4dFZpZXdTZWxlY3RvciIsImNpcGhlcmVkVGV4dFJlc2l6ZWQiLCJjaXBoZXJlZFRleHRTY3JvbGxlZCIsImJvdHRvbSIsInBhZ2VSb3dzIiwicGFnZUNvbHVtbnMiLCJ2aXNpYmxlUm93cyIsInJvd3MiLCJDaXBoZXJUZXh0VmlldyIsImVsZW1lbnQiLCJfdGV4dEJveCIsImNsaWVudFdpZHRoIiwicmVmVGV4dEJveCIsIm9uU2Nyb2xsIiwicG9zaXRpb24iLCJvdmVyZmxvd1kiLCJpbmRleCIsImNvbHVtbnMiLCJ0b3AiLCJjZWxsIiwibGVmdCIsIkNpcGhlcmVkVGV4dCIsInNlbGVjdGVkVGV4dCIsInNlbGVjdGVkUm93cyIsInNlbGVjdGVkQ29sdW1ucyIsInNlbGVjdGVkVGV4dFJlc2l6ZWRSZWR1Y2VyIiwic2VsZWN0ZWRUZXh0U2Nyb2xsZWRSZWR1Y2VyIiwibWF4VG9wIiwibWluIiwic2VsZWN0ZWRUZXh0TW9kZUNoYW5nZWRSZWR1Y2VyIiwic2VsZWN0ZWRUZXh0UGFnZUNvbHVtbnNDaGFuZ2VkUmVkdWNlciIsInNlbGVjdGVkVGV4dFNlbGVjdGlvbkNoYW5nZWRSZWR1Y2VyIiwic2VsZWN0ZWQiLCJjZWlsIiwic2VsZWN0ZWRUZXh0TGF0ZVJlZHVjZXIiLCJ1cGRhdGVHZW9tZXRyeSIsImdyaWQiLCJTZWxlY3RlZFRleHRWaWV3U2VsZWN0b3IiLCJzZWxlY3RlZFRleHRSZXNpemVkIiwic2VsZWN0ZWRUZXh0U2Nyb2xsZWQiLCJzZWxlY3RlZFRleHRNb2RlQ2hhbmdlZCIsInNlbGVjdGVkVGV4dFBhZ2VDb2x1bW5zQ2hhbmdlZCIsInNlbGVjdGVkVGV4dFNlbGVjdGlvbkNoYW5nZWQiLCJTZWxlY3RlZFRleHRWaWV3IiwiZXZlbnQiLCJ0ZXh0IiwidGFyZ2V0IiwidmFsdWUiLCJwYXJzZUludCIsImlzTmFOIiwic2V0U3RhdGUiLCJjdXJyZW50VGFyZ2V0IiwiZGF0YXNldCIsInNoaWZ0S2V5Iiwic2VsZWN0QWxsIiwiU2VsZWN0ZWRUZXh0IiwiZnJlcXVlbmN5QW5hbHlzaXMiLCJmcmVxdWVuY3lBbmFseXNpc0xhdGVSZWR1Y2VyIiwicmVmZXJlbmNlRnJlcXVlbmNpZXMiLCJmcmVxdWVuY2llcyIsInRleHRGcmVxdWVuY2llcyIsImZyZXFNYXAiLCJzcGxpdCIsImMiLCJzdGFydFBvcyIsImVuZFBvcyIsImNvdW50U3ltYm9scyIsIm5vcm1hbGl6ZUFuZFNvcnRGcmVxdWVuY2llcyIsInJuZyIsImpvaW4iLCJiYXNlUHJvYmEiLCJtYXhSZWZQcm9iYSIsInJlZHVjZSIsImEiLCJ4IiwicHJvYmEiLCJlcHNpbG9uIiwic2VsZWN0ZWRGcmVxdWVuY2llcyIsImZpbGwiLCJjb2wiLCJzdW1GcmVxdWVuY2llcyIsInBvcyIsImNvdW50U3ltYm9sIiwiY2hhciIsImNvdW50IiwiZHN0IiwiZnJvbSIsInRvdGFsQ291bnQiLCJzb3J0IiwiczEiLCJzMiIsInAxIiwicDIiLCJzeW1ib2wiLCJGcmVxdWVuY3lBbmFseXNpc1NlbGVjdG9yIiwic2NhbGUiLCJhbHBoYWJldFNpemUiLCJGcmVxdWVuY3lBbmFseXNpc1ZpZXciLCJmbG9hdCIsImxpbmVIZWlnaHQiLCJUZXh0RnJlcXVlbmN5Qm94IiwiZGlzcGxheSIsInZlcnRpY2FsQWxpZ24iLCJyb3VuZCIsIm1hcmdpbkxlZnQiLCJiYWNrZ3JvdW5kIiwiYm9yZGVyIiwibWFyZ2luQm90dG9tIiwidGV4dEFsaWduIiwiUmVmZXJlbmNlRnJlcXVlbmN5Qm94IiwiRnJlcXVlbmN5QW5hbHlzaXMiLCJzY2hlZHVsaW5nU2FnYSIsInNjaGVkdWxpbmciLCJzcGVlZCIsInNoaWZ0cyIsInN0YXJ0UG9zaXRpb24iLCJlbmRQb3NpdGlvbiIsImN1cnJlbnRUcmFjZSIsInNjaGVkdWxpbmdTdGF0dXNDaGFuZ2VkUmVkdWNlciIsImNoYW5nZXMiLCJzY2hlZHVsaW5nU3RlcEJhY2t3YXJkUmVkdWNlciIsInNjaGVkdWxpbmdTdGVwRm9yd2FyZFJlZHVjZXIiLCJzY2hlZHVsaW5nSnVtcFJlZHVjZXIiLCJzY2hlZHVsaW5nVGlja1JlZHVjZXIiLCJzY2hlZHVsaW5nTGF0ZVJlZHVjZXIiLCJyYW5rIiwidHJhY2UiLCJzY2hlZHVsaW5nVGljayIsIm5hbWUiLCJzdGF0dXNDaGFuZ2luZ0FjdGlvbnMiLCJTY2hlZHVsaW5nQ29udHJvbHNTZWxlY3RvciIsInNjaGVkdWxpbmdTdGF0dXNDaGFuZ2VkIiwic2NoZWR1bGluZ1N0ZXBCYWNrd2FyZCIsInNjaGVkdWxpbmdTdGVwRm9yd2FyZCIsIlNjaGVkdWxpbmdDb250cm9sc1ZpZXciLCJfZXZlbnQiLCJtYXJnaW4iLCJvbkZhc3RCYWNrd2FyZENsaWNrZWQiLCJvblN0ZXBCYWNrd2FyZENsaWNrZWQiLCJvblBsYXlDbGlja2VkIiwib25TdGVwRm9yd2FyZENsaWNrZWQiLCJvbkZhc3RGb3J3YXJkQ2xpY2tlZCIsInNjaGVkdWxpbmdKdW1wIiwiU2NoZWR1bGluZ0NvbnRyb2xzIiwiZWRpdGluZyIsInJvdG9yQ2VsbEVkaXRTdGFydGVkUmVkdWNlciIsInJvdG9ySW5kZXgiLCJjZWxsUmFuayIsInJvdG9yQ2VsbEVkaXRNb3ZlZFJlZHVjZXIiLCJyb3Rvck1vdmUiLCJjZWxsTW92ZSIsInJvdG9yU3RvcCIsImNlbGxTdG9wIiwiaGludCIsImxvY2tlZCIsInJvdG9yQ2VsbEVkaXRDYW5jZWxsZWRSZWR1Y2VyIiwicm90b3JDZWxsQ2hhckNoYW5nZWRSZWR1Y2VyIiwicm90b3JDZWxsTG9ja0NoYW5nZWRSZWR1Y2VyIiwiaXNMb2NrZWQiLCJyb3RvcktleUxvYWRlZFJlZHVjZXIiLCJSb3RvclNlbGVjdG9yIiwicm90b3JDZWxsTG9ja0NoYW5nZWQiLCJyb3RvckNlbGxDaGFyQ2hhbmdlZCIsInJvdG9yQ2VsbEVkaXRDYW5jZWxsZWQiLCJyb3RvckNlbGxFZGl0U3RhcnRlZCIsInJvdG9yQ2VsbEVkaXRNb3ZlZCIsImVkaXRhYmxlUm93Iiwic2hpZnQiLCJhY3RpdmVSYW5rIiwiZWRpdGluZ1JhbmsiLCJSb3RvclZpZXciLCJ0b1VwcGVyQ2FzZSIsImNvbmZsaWN0IiwiaXNBY3RpdmUiLCJpc0VkaXRpbmciLCJpc0xhc3QiLCJzaGlmdGVkSW5kZXgiLCJyb3RhdGluZyIsIm9uQ2hhbmdlQ2hhciIsIm9uQ2hhbmdlTG9ja2VkIiwib25FZGl0aW5nU3RhcnRlZCIsIm9uRWRpdGluZ0NhbmNlbGxlZCIsImVkaXRpbmdNb3ZlZCIsIlJvdG9yQ2VsbCIsImhhbmRsZWQiLCJvbkVkaXRpbmdNb3ZlZCIsInByZXZlbnREZWZhdWx0Iiwic3RvcFByb3BhZ2F0aW9uIiwiX2lucHV0Iiwic3Vic3RyIiwic3RhdGljQ2hhciIsImVkaXRhYmxlQ2hhciIsImlzSGludCIsImlzQ29uZmxpY3QiLCJjb2x1bW5TdHlsZSIsInN0YXRpY0NlbGxTdHlsZSIsImJvcmRlclJpZ2h0V2lkdGgiLCJlZGl0YWJsZUNlbGxTdHlsZSIsImN1cnNvciIsImJhY2tncm91bmRDb2xvciIsImJvdHRvbUNlbGxTdHlsZSIsIm1hcmdpblRvcCIsImJvcmRlclRvcFdpZHRoIiwic3RhdGljQ2VsbCIsImVkaXRhYmxlQ2VsbCIsInN0YXJ0RWRpdGluZyIsInJlZklucHV0IiwiY2VsbENoYW5nZWQiLCJrZXlEb3duIiwibG9jayIsImxvY2tDbGlja2VkIiwic2VsZWN0IiwiZm9jdXMiLCJyb3RvcktleUxvYWRlZCIsIlJvdG9yIiwiZGVjaXBoZXJlZFRleHQiLCJkZWNpcGhlcmVkVGV4dFJlc2l6ZWRSZWR1Y2VyIiwiZGVjaXBoZXJlZFRleHRTY3JvbGxlZFJlZHVjZXIiLCJkZWNpcGhlcmVkVGV4dExhdGVSZWR1Y2VyIiwiZ2V0Q2VsbCIsImNpcGhlcmVkIiwiY3VycmVudCIsImNsZWFyIiwiRGVjaXBoZXJlZFRleHRWaWV3U2VsZWN0b3IiLCJkZWNpcGhlcmVkVGV4dFJlc2l6ZWQiLCJkZWNpcGhlcmVkVGV4dFNjcm9sbGVkIiwiRGVjaXBoZXJlZFRleHRWaWV3Iiwib25KdW1wIiwiVGV4dENlbGwiLCJjb2x1bW4iLCJjZWxsU3R5bGUiLCJib3JkZXJXaWR0aCIsIl9qdW1wIiwiYm9yZGVyQm90dG9tIiwiRGVjaXBoZXJlZFRleHQiLCJXb3Jrc3BhY2VTZWxlY3RvciIsImVkaXRpbmdDZWxsIiwibmJSb3RvcnMiLCJwYWRkaW5nIiwiYm9yZGVyUmFkaXVzIiwibWFyZ2luUmlnaHQiLCJiaXNlY3QiLCJsbyIsImhpIiwibWlkIiwiY2hhbmdlU2VsZWN0aW9uIiwidmFsdWVzIiwiJHNwbGljZSIsInNvcnRlZEFycmF5SGFzRWxlbWVudCIsInVwZGF0ZUdyaWRHZW9tZXRyeSIsInNjcm9sbEJhcldpZHRoIiwiZmxvb3IiLCJ1cGRhdGVHcmlkVmlzaWJsZVJvd3MiLCJmaXJzdFJvdyIsImxhc3RSb3ciLCJfaW5kZXgiLCJyb3dJbmRleCIsInJvd1N0YXJ0UG9zIiwicm93Q2VsbHMiLCJjb2xJbmRleCIsInVwZGF0ZUdyaWRWaXNpYmxlQ29sdW1ucyIsImNvbENlbGxzIiwidXBkYXRlR3JpZFZpc2libGVBcmVhIiwibWFrZVJvdG9yIiwic2NoZWR1bGUiLCJzaXplIiwibnVsbFBlcm0iLCJmb3J3YXJkIiwiYmFja3dhcmQiLCJkdW1wUm90b3JzIiwibG9hZFJvdG9ycyIsInJvdG9yRHVtcHMiLCIkY2VsbHMiLCJmb3JFYWNoIiwiY2VsbEluZGV4IiwiaiIsIm1hcmtSb3RvckNvbmZsaWN0cyIsInVwZGF0ZVBlcm1zIiwiZWRpdFJvdG9yQ2VsbCIsImxvY2tSb3RvckNlbGwiLCJjb3VudHMiLCJoYXMiLCJyYW5rcyIsInVwZGF0ZVJvdG9yV2l0aEtleSIsInNvdXJjZSIsImdldFJvdG9yU2hpZnQiLCJhcHBseVJvdG9ycyIsImxvY2tzIiwiYXBwbHlSb3RvciIsImFwcGx5U2hpZnQiLCJjb2xsaXNpb24iLCJtb2QiLCJhbW91bnQiLCJ3cmFwQXJvdW5kIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFDQTs7QUFDQTs7QUFFQTs7QUFDQTs7QUFDQTs7QUFFQTs7QUFDQTs7QUFDQTs7QUFDQTs7QUFDQTs7QUFDQTs7QUFDQTs7QUFDQTs7QUFFQSxJQUFNQSxVQUFVLEdBQUc7QUFDZkMsZ0JBQWMsRUFBRTtBQUNaQyxXQUFPLEVBQUVDLGNBREc7QUFFWkMsWUFBUSxFQUFFQztBQUFnQjtBQUZkO0FBR1pDLGVBQVcsRUFBRUM7QUFBbUI7QUFIcEI7QUFJWkMsb0JBQWdCLEVBQUVBLGdCQUpOO0FBS1pDLG1CQUFlLEVBQUVBO0FBTEwsR0FERDtBQVFmQyxVQUFRLEVBQUUsQ0FDTkMsNkJBRE0sRUFFTkMsNkJBRk0sRUFHTkMsa0NBSE0sRUFJTkMsMEJBSk0sRUFLTkMsc0JBTE0sRUFNTkMsK0JBTk0sRUFPTkMseUJBUE0sQ0FSSztBQWlCZkMsV0FBUyxFQUFFO0FBQ1RDLGdCQUFZLEVBQVpBLFlB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RDs7O0FBQ0FwVCxRQUFNLENBQUNvVCxJQUFQLEdBQWNBLElBQWQ7O0FBQ0EsTUFBSTFHLElBQUosRUFBVTtBQUNSO0FBQ0ExTSxVQUFNLENBQUNxVCxLQUFQLENBQWEzVCxJQUFiLENBQWtCZ04sSUFBbEI7O0FBQ0EsUUFBSUEsSUFBSSxDQUFDdUksTUFBTCxJQUFldkksSUFBSSxDQUFDc0ksSUFBeEIsRUFBOEI7QUFDNUJoVixZQUFNLENBQUNzZCxLQUFQLElBQWdCLENBQWhCO0FBQ0Q7O0FBQ0QsUUFBSTVRLElBQUksQ0FBQytRLFNBQVQsRUFBb0I7QUFDbEJ6ZCxZQUFNLENBQUN5ZCxTQUFQLEdBQW1CLElBQW5CO0FBQ0Q7QUFDRjtBQUNGOztBQUVELFNBQVNELFVBQVQsQ0FBcUJFLEdBQXJCLEVBQTBCQyxNQUExQixFQUFrQ3ZLLElBQWxDLEVBQXdDO0FBQ3RDLE1BQUlBLElBQUksS0FBSyxDQUFDLENBQWQsRUFBaUI7QUFDZixRQUFJdUssTUFBTSxHQUFHLENBQWIsRUFBZ0I7QUFDZEEsWUFBTSxJQUFJRCxHQUFWO0FBQ0Q7O0FBQ0R0SyxRQUFJLEdBQUcsQ0FBQ0EsSUFBSSxHQUFHdUssTUFBUixJQUFrQkQsR0FBekI7QUFDRDs7QUFDRCxTQUFPdEssSUFBUDtBQUNEOztBQUVNLFNBQVN3SyxVQUFULENBQXFCdFAsS0FBckIsRUFBNEJvUCxHQUE1QixFQUFpQztBQUN0QyxTQUFPLENBQUVwUCxLQUFLLEdBQUdvUCxHQUFULEdBQWdCQSxHQUFqQixJQUF3QkEsR0FBL0I7QUFDRCxDIiwiZmlsZSI6ImJ1bmRsZS5qcyIsInNvdXJjZXNDb250ZW50IjpbIlxuaW1wb3J0IHVwZGF0ZSBmcm9tICdpbW11dGFiaWxpdHktaGVscGVyJztcbmltcG9ydCBhbGdvcmVhUmVhY3RUYXNrIGZyb20gJy4vYWxnb3JlYV9yZWFjdF90YXNrJztcblxuaW1wb3J0ICdmb250LWF3ZXNvbWUvY3NzL2ZvbnQtYXdlc29tZS5jc3MnO1xuaW1wb3J0ICdib290c3RyYXAvZGlzdC9jc3MvYm9vdHN0cmFwLmNzcyc7XG5pbXBvcnQgJy4vc3R5bGUuY3NzJztcblxuaW1wb3J0IENpcGhlcmVkVGV4dEJ1bmRsZSBmcm9tICcuL2NpcGhlcmVkX3RleHRfYnVuZGxlJztcbmltcG9ydCBTZWxlY3RlZFRleHRCdW5kbGUgZnJvbSAnLi9zZWxlY3RlZF90ZXh0X2J1bmRsZSc7XG5pbXBvcnQgRnJlcXVlbmN5QW5hbHlzaXNCdW5kbGUgZnJvbSAnLi9mcmVxdWVuY3lfYW5hbHlzaXNfYnVuZGxlJztcbmltcG9ydCBTY2hlZHVsaW5nQnVuZGxlIGZyb20gJy4vc2NoZWR1bGluZ19idW5kbGUnO1xuaW1wb3J0IFJvdG9yc0J1bmRsZSBmcm9tICcuL3JvdG9yc19idW5kbGUnO1xuaW1wb3J0IERlY2lwaGVyZWRUZXh0QnVuZGxlIGZyb20gJy4vZGVjaXBoZXJlZF90ZXh0X2J1bmRsZSc7XG5pbXBvcnQgV29ya3NwYWNlQnVuZGxlIGZyb20gJy4vd29ya3NwYWNlX2J1bmRsZSc7XG5pbXBvcnQge2R1bXBSb3RvcnMsIGxvYWRSb3RvcnN9IGZyb20gJy4vdXRpbHMnO1xuXG5jb25zdCBUYXNrQnVuZGxlID0ge1xuICAgIGFjdGlvblJlZHVjZXJzOiB7XG4gICAgICAgIGFwcEluaXQ6IGFwcEluaXRSZWR1Y2VyLFxuICAgICAgICB0YXNrSW5pdDogdGFza0luaXRSZWR1Y2VyIC8qIHBvc3NpYmx5IG1vdmUgdG8gYWxnb3JlYS1yZWFjdC10YXNrICovLFxuICAgICAgICB0YXNrUmVmcmVzaDogdGFza1JlZnJlc2hSZWR1Y2VyIC8qIHBvc3NpYmx5IG1vdmUgdG8gYWxnb3JlYS1yZWFjdC10YXNrICovLFxuICAgICAgICB0YXNrQW5zd2VyTG9hZGVkOiB0YXNrQW5zd2VyTG9hZGVkLFxuICAgICAgICB0YXNrU3RhdGVMb2FkZWQ6IHRhc2tTdGF0ZUxvYWRlZCxcbiAgICB9LFxuICAgIGluY2x1ZGVzOiBbXG4gICAgICAgIENpcGhlcmVkVGV4dEJ1bmRsZSxcbiAgICAgICAgU2VsZWN0ZWRUZXh0QnVuZGxlLFxuICAgICAgICBGcmVxdWVuY3lBbmFseXNpc0J1bmRsZSxcbiAgICAgICAgU2NoZWR1bGluZ0J1bmRsZSxcbiAgICAgICAgUm90b3JzQnVuZGxlLFxuICAgICAgICBEZWNpcGhlcmVkVGV4dEJ1bmRsZSxcbiAgICAgICAgV29ya3NwYWNlQnVuZGxlLFxuICAgIF0sXG4gICAgc2VsZWN0b3JzOiB7XG4gICAgICBnZXRUYXNrU3RhdGUsXG4gICAgICBnZXRUYXNrQW5zd2VyLFxuICAgIH1cbn07XG5cbmlmIChwcm9jZXNzLmVudi5OT0RFX0VOViA9PT0gJ2RldmVsb3BtZW50Jykge1xuICAgIC8qIGVzbGludC1kaXNhYmxlIG5vLWNvbnNvbGUgKi9cbiAgICBUYXNrQnVuZGxlLmVhcmx5UmVkdWNlciA9IGZ1bmN0aW9uIChzdGF0ZSwgYWN0aW9uKSB7XG4gICAgICAgIGNvbnNvbGUubG9nKCdBQ1RJT04nLCBhY3Rpb24udHlwZSwgYWN0aW9uKTtcbiAgICAgICAgcmV0dXJuIHN0YXRlO1xuICAgIH07XG59XG5cbmZ1bmN0aW9uIGFwcEluaXRSZWR1Y2VyIChzdGF0ZSwgX2FjdGlvbikge1xuICAgIGNvbnN0IHRhc2tNZXRhRGF0YSA9IHtcbiAgICAgICBcImlkXCI6IFwiaHR0cDovL2NvbmNvdXJzLWFsa2luZGkuZnIvdGFza3MvMjAxOC9lbmlnbWFcIixcbiAgICAgICBcImxhbmd1YWdlXCI6IFwiZnJcIixcbiAgICAgICBcInZlcnNpb25cIjogXCJmci4wMVwiLFxuICAgICAgIFwiYXV0aG9yc1wiOiBcIlPDqWJhc3RpZW4gQ2FybGllclwiLFxuICAgICAgIFwidHJhbnNsYXRvcnNcIjogW10sXG4gICAgICAgXCJsaWNlbnNlXCI6IFwiXCIsXG4gICAgICAgXCJ0YXNrUGF0aFByZWZpeFwiOiBcIlwiLFxuICAgICAgIFwibW9kdWxlc1BhdGhQcmVmaXhcIjogXCJcIixcbiAgICAgICBcImJyb3dzZXJTdXBwb3J0XCI6IFtdLFxuICAgICAgIFwiZnVsbEZlZWRiYWNrXCI6IHRydWUsXG4gICAgICAgXCJhY2NlcHRlZEFuc3dlcnNcIjogW10sXG4gICAgICAgXCJ1c2VzUmFuZG9tU2VlZFwiOiB0cnVlXG4gICAgfTtcbiAgICByZXR1cm4gey4uLnN0YXRlLCB0YXNrTWV0YURhdGF9O1xufVxuXG5mdW5jdGlvbiB0YXNrSW5pdFJlZHVjZXIgKHN0YXRlLCBfYWN0aW9uKSB7XG4gIGNvbnN0IHt0YXNrRGF0YToge2FscGhhYmV0LCByb3RvcnM6IHJvdG9yU3BlY3MsIGhpbnRzfX0gPSBzdGF0ZTtcbiAgY29uc3Qgcm90b3JzID0gbG9hZFJvdG9ycyhhbHBoYWJldCwgcm90b3JTcGVjcywgaGludHMsIHJvdG9yU3BlY3MubWFwKF8gPT4gW10pKTtcbiAgcmV0dXJuIHsuLi5zdGF0ZSwgcm90b3JzLCB0YXNrUmVhZHk6IHRydWV9O1xufVxuXG5mdW5jdGlvbiB0YXNrUmVmcmVzaFJlZHVjZXIgKHN0YXRlLCBfYWN0aW9uKSB7XG4gIGNvbnN0IHt0YXNrRGF0YToge2FscGhhYmV0LCByb3RvcnM6IHJvdG9yU3BlY3MsIGhpbnRzfX0gPSBzdGF0ZTtcbiAgY29uc3QgZHVtcCA9IGR1bXBSb3RvcnMoYWxwaGFiZXQsIHN0YXRlLnJvdG9ycyk7XG4gIGNvbnN0IHJvdG9ycyA9IGxvYWRSb3RvcnMoYWxwaGFiZXQsIHJvdG9yU3BlY3MsIGhpbnRzLCBkdW1wKTtcbiAgcmV0dXJuIHsuLi5zdGF0ZSwgcm90b3JzfTtcbn1cblxuZnVuY3Rpb24gZ2V0VGFza0Fuc3dlciAoc3RhdGUpIHtcbiAgY29uc3Qge3Rhc2tEYXRhOiB7YWxwaGFiZXR9fSA9IHN0YXRlO1xuICByZXR1cm4ge1xuICAgIHJvdG9yczogc3RhdGUucm90b3JzLm1hcChyb3RvciA9PiByb3Rvci5jZWxscy5tYXAoKHtlZGl0YWJsZX0pID0+IGFscGhhYmV0LmluZGV4T2YoZWRpdGFibGUpKSlcbiAgfTtcbn1cblxuZnVuY3Rpb24gdGFza0Fuc3dlckxvYWRlZCAoc3RhdGUsIHtwYXlsb2FkOiB7YW5zd2VyfX0pIHtcbiAgY29uc3Qge3Rhc2tEYXRhOiB7YWxwaGFiZXQsIHJvdG9yczogcm90b3JTcGVjcywgaGludHN9fSA9IHN0YXRlO1xuICBjb25zdCByb3RvcnMgPSBsb2FkUm90b3JzKGFscGhhYmV0LCByb3RvclNwZWNzLCBoaW50cywgYW5zd2VyLnJvdG9ycyk7XG4gIHJldHVybiB1cGRhdGUoc3RhdGUsIHtyb3RvcnM6IHskc2V0OiByb3RvcnN9fSk7XG59XG5cbmZ1bmN0aW9uIGdldFRhc2tTdGF0ZSAoc3RhdGUpIHtjb25zb2xlLmxvZyhzdGF0ZSk7XG4gIGNvbnN0IHt0YXNrRGF0YToge2FscGhhYmV0fX0gPSBzdGF0ZTtcbiAgcmV0dXJuIHtyb3RvcnM6IGR1bXBSb3RvcnMoYWxwaGFiZXQsIHN0YXRlLnJvdG9ycyl9O1xufVxuXG5mdW5jdGlvbiB0YXNrU3RhdGVMb2FkZWQgKHN0YXRlLCB7cGF5bG9hZDoge2R1bXB9fSkge1xuICBjb25zdCB7dGFza0RhdGE6IHthbHBoYWJldCwgcm90b3JzOiByb3RvclNwZWNzLCBoaW50c319ID0gc3RhdGU7XG4gIGNvbnN0IHJvdG9ycyA9IGxvYWRSb3RvcnMoYWxwaGFiZXQsIHJvdG9yU3BlY3MsIGhpbnRzLCBkdW1wLnJvdG9ycyk7XG4gIHJldHVybiB1cGRhdGUoc3RhdGUsIHtyb3RvcnM6IHskc2V0OiByb3RvcnN9fSk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBydW4gKGNvbnRhaW5lciwgb3B0aW9ucykge1xuICAgIHJldHVybiBhbGdvcmVhUmVhY3RUYXNrKGNvbnRhaW5lciwgb3B0aW9ucywgVGFza0J1bmRsZSk7XG59XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvaW5kZXguanMiLCIvKlxuQ2hhbmdlIG1ldGhvZCBvZiB1c2U6XG4tIGV4cG9ydCBhIGJ1bmRsZSB0aGF0IHRoZSB0YXNrIGNhbiBpbmNsdWRlO1xuLSBleHBvcnQgYSBmdW5jdGlvbihzYWdhPykgdGhhdCAoY3JlYXRlcyB0aGUgQVBJIG9iamVjdHMgYW5kICkgZGlzcGF0Y2hlcyB0aGVcbiAgYXBwSW5pdCBhY3Rpb247XG5cbiovXG5cbi8vaW1wb3J0ICcuL3NoaW0nXG5pbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IFJlYWN0RE9NIGZyb20gJ3JlYWN0LWRvbSc7XG5pbXBvcnQge1Byb3ZpZGVyfSBmcm9tICdyZWFjdC1yZWR1eCc7XG5pbXBvcnQgcXVlcnlTdHJpbmcgZnJvbSAncXVlcnktc3RyaW5nJztcbmltcG9ydCB7Y3JlYXRlU3RvcmUsIGFwcGx5TWlkZGxld2FyZX0gZnJvbSAncmVkdXgnO1xuaW1wb3J0IHtkZWZhdWx0IGFzIGNyZWF0ZVNhZ2FNaWRkbGV3YXJlfSBmcm9tICdyZWR1eC1zYWdhJztcbmltcG9ydCB7Y2FsbH0gZnJvbSAncmVkdXgtc2FnYS9lZmZlY3RzJztcblxuaW1wb3J0IGxpbmsgZnJvbSAnLi9saW5rZXInO1xuaW1wb3J0ICcuL3VpL3N0eWxlcy5jc3MnO1xuXG5pbXBvcnQgQXBwQnVuZGxlIGZyb20gJy4vYXBwX2J1bmRsZSc7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIChjb250YWluZXIsIG9wdGlvbnMsIFRhc2tCdW5kbGUpIHtcbiAgICBjb25zdCBwbGF0Zm9ybSA9IHdpbmRvdy5wbGF0Zm9ybTtcbiAgICBpZiAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgPT09ICdkZXZlbG9wbWVudCcpIHBsYXRmb3JtLmRlYnVnID0gdHJ1ZTtcblxuICAgIGNvbnN0IHthY3Rpb25zLCB2aWV3cywgc2VsZWN0b3JzLCByZWR1Y2VyLCByb290U2FnYX0gPSBsaW5rKHtpbmNsdWRlczogW0FwcEJ1bmRsZSwgVGFza0J1bmRsZV19KTtcblxuICAgIC8qIEJ1aWxkIHRoZSBzdG9yZS4gKi9cbiAgICBjb25zdCBzYWZlUmVkdWNlciA9IGZ1bmN0aW9uIChzdGF0ZSwgYWN0aW9uKSB7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICByZXR1cm4gcmVkdWNlcihzdGF0ZSwgYWN0aW9uKTtcbiAgICAgICAgfSBjYXRjaCAoZXgpIHtcbiAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoJ2FjdGlvbiBmYWlsZWQgdG8gcmVkdWNlJywgYWN0aW9uLCBleCk7XG4gICAgICAgICAgICByZXR1cm4gey4uLnN0YXRlLCBlcnJvcnM6IFtleF19O1xuICAgICAgICB9XG4gICAgfTtcbiAgICBjb25zdCBzYWdhTWlkZGxld2FyZSA9IGNyZWF0ZVNhZ2FNaWRkbGV3YXJlKCk7XG4gICAgY29uc3QgZW5oYW5jZXIgPSBhcHBseU1pZGRsZXdhcmUoc2FnYU1pZGRsZXdhcmUpO1xuICAgIGNvbnN0IHN0b3JlID0gY3JlYXRlU3RvcmUoc2FmZVJlZHVjZXIsIHthY3Rpb25zLCB2aWV3cywgc2VsZWN0b3JzfSwgZW5oYW5jZXIpO1xuXG4gICAgLyogU3RhcnQgdGhlIHNhZ2FzLiAqL1xuICAgIGZ1bmN0aW9uIHN0YXJ0ICgpIHtcbiAgICAgICAgc2FnYU1pZGRsZXdhcmUucnVuKGZ1bmN0aW9uKiAoKSB7XG4gICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgIHlpZWxkIGNhbGwocm9vdFNhZ2EpO1xuICAgICAgICAgICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmVycm9yKCdzYWdhcyBjcmFzaGVkJywgZXJyb3IpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9XG4gICAgc3RhcnQoKTtcblxuICAgIC8qIERpc3BhdGNoIHRoZSBhcHBJbml0IGFjdGlvbi4gKi9cbiAgICBjb25zdCBxdWVyeSA9IHF1ZXJ5U3RyaW5nLnBhcnNlKGxvY2F0aW9uLnNlYXJjaCk7XG4gICAgY29uc3QgdGFza1Rva2VuID0gcXVlcnkuc1Rva2VuO1xuICAgIHN0b3JlLmRpc3BhdGNoKHt0eXBlOiBhY3Rpb25zLmFwcEluaXQsIHBheWxvYWQ6IHtvcHRpb25zLCB0YXNrVG9rZW4sIHBsYXRmb3JtfX0pO1xuXG4gICAgLyogU3RhcnQgcmVuZGVyaW5nLiAqL1xuICAgIFJlYWN0RE9NLnJlbmRlcig8UHJvdmlkZXIgc3RvcmU9e3N0b3JlfT48dmlld3MuQXBwLz48L1Byb3ZpZGVyPiwgY29udGFpbmVyKTtcblxuICAgIHJldHVybiB7YWN0aW9ucywgdmlld3MsIHN0b3JlLCBzdGFydH07XG59XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvYWxnb3JlYV9yZWFjdF90YXNrL2luZGV4LmpzIiwiLyogQ29weXJpZ2h0IChDKSAyMDE3IGVwaXhvZGUgLSBBbGwgUmlnaHRzIFJlc2VydmVkXG4gKiBZb3UgbWF5IHVzZSwgZGlzdHJpYnV0ZSBhbmQgbW9kaWZ5IHRoaXMgY29kZSB1bmRlciB0aGVcbiAqIHRlcm1zIG9mIHRoZSBNSVQgbGljZW5zZS5cbiAqL1xuXG5pbXBvcnQge2FsbCwgY2FsbH0gZnJvbSAncmVkdXgtc2FnYS9lZmZlY3RzJztcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gbGluayAocm9vdEJ1bmRsZSwgZmVhdHVyZXMpIHtcbiAgZmVhdHVyZXMgPSBmZWF0dXJlcyB8fCBbQWN0aW9ucywgVmlld3MsIFNlbGVjdG9ycywgRWFybHlSZWR1Y2VycywgUmVkdWNlcnMsIEFjdGlvblJlZHVjZXJzLCBMYXRlUmVkdWNlcnMsIFNhZ2FzXTtcbiAgY29uc3QgYXBwID0ge307XG4gIGZvciAobGV0IGZlYXR1cmUgb2YgZmVhdHVyZXMpIHtcbiAgICBmZWF0dXJlLnByZXBhcmUoYXBwKTtcbiAgfVxuICBsaW5rQnVuZGxlKHJvb3RCdW5kbGUsIGZlYXR1cmVzLCBhcHApO1xuICBmb3IgKGxldCBmZWF0dXJlIG9mIGZlYXR1cmVzKSB7XG4gICAgZmVhdHVyZS5maW5hbGl6ZShhcHApO1xuICB9XG4gIHJldHVybiBhcHA7XG59XG5cbmZ1bmN0aW9uIGxpbmtCdW5kbGUgKGJ1bmRsZSwgZmVhdHVyZXMsIGFwcCkge1xuICBmb3IgKGxldCBmZWF0dXJlIG9mIGZlYXR1cmVzKSB7XG4gICAgZmVhdHVyZS5hZGQoYXBwLCBidW5kbGUpO1xuICB9XG4gIGlmIChidW5kbGUuaW5jbHVkZXMpIHtcbiAgICBmb3IgKGxldCBzdWJCdW5kbGUgb2YgYnVuZGxlLmluY2x1ZGVzKSB7XG4gICAgICBsaW5rQnVuZGxlKHN1YkJ1bmRsZSwgZmVhdHVyZXMsIGFwcCk7XG4gICAgfVxuICB9XG59XG5cbmNvbnN0IEFjdGlvbnMgPSB7XG4gIHByZXBhcmU6IGZ1bmN0aW9uIChhcHApIHtcbiAgICBhcHAuYWN0aW9ucyA9IHt9O1xuICB9LFxuICBhZGQ6IGZ1bmN0aW9uIChhcHAsIHthY3Rpb25zfSkge1xuICAgIGlmIChhY3Rpb25zKSB7XG4gICAgICBPYmplY3QuYXNzaWduKGFwcC5hY3Rpb25zLCBhY3Rpb25zKTtcbiAgICB9XG4gIH0sXG4gIGZpbmFsaXplOiBmdW5jdGlvbiAoX2FwcCkge1xuICB9XG59O1xuXG5jb25zdCBWaWV3cyA9IHtcbiAgcHJlcGFyZTogZnVuY3Rpb24gKGFwcCkge1xuICAgIGFwcC52aWV3cyA9IHt9O1xuICB9LFxuICBhZGQ6IGZ1bmN0aW9uIChhcHAsIHt2aWV3c30pIHtcbiAgICBpZiAodmlld3MpIHtcbiAgICAgIE9iamVjdC5hc3NpZ24oYXBwLnZpZXdzLCB2aWV3cyk7XG4gICAgfVxuICB9LFxuICBmaW5hbGl6ZTogZnVuY3Rpb24gKF9hcHApIHtcbiAgfVxufTtcblxuY29uc3QgUmVkdWNlcnMgPSB7XG4gIHByZXBhcmU6IGZ1bmN0aW9uIChhcHApIHtcbiAgICBhcHAucmVkdWNlciA9IHVuZGVmaW5lZDtcbiAgfSxcbiAgYWRkOiBmdW5jdGlvbiAoYXBwLCB7cmVkdWNlciwgcmVkdWNlcnN9KSB7XG4gICAgaWYgKHJlZHVjZXIpIHtcbiAgICAgIGFwcC5yZWR1Y2VyID0gc2VxdWVuY2VSZWR1Y2VycyhhcHAucmVkdWNlciwgcmVkdWNlcik7XG4gICAgfVxuICAgIGlmIChyZWR1Y2Vycykge1xuICAgICAgYXBwLnJlZHVjZXIgPSBzZXF1ZW5jZVJlZHVjZXJzKGFwcC5yZWR1Y2VyLCAuLi5yZWR1Y2Vycyk7XG4gICAgfVxuICB9LFxuICBmaW5hbGl6ZTogZnVuY3Rpb24gKF9hcHApIHtcbiAgfVxufTtcblxuY29uc3QgRWFybHlSZWR1Y2VycyA9IHtcbiAgcHJlcGFyZTogZnVuY3Rpb24gKGFwcCkge1xuICAgIGFwcC5lYXJseVJlZHVjZXIgPSB1bmRlZmluZWQ7XG4gIH0sXG4gIGFkZDogZnVuY3Rpb24gKGFwcCwge2Vhcmx5UmVkdWNlcn0pIHtcbiAgICBhcHAuZWFybHlSZWR1Y2VyID0gc2VxdWVuY2VSZWR1Y2VycyhhcHAuZWFybHlSZWR1Y2VyLCBlYXJseVJlZHVjZXIpO1xuICB9LFxuICBmaW5hbGl6ZTogZnVuY3Rpb24gKGFwcCkge1xuICAgIGFwcC5yZWR1Y2VyID0gc2VxdWVuY2VSZWR1Y2VycyhhcHAuZWFybHlSZWR1Y2VyLCBhcHAucmVkdWNlcik7XG4gICAgZGVsZXRlIGFwcC5lYXJseVJlZHVjZXI7XG4gIH1cbn07XG5cbmNvbnN0IExhdGVSZWR1Y2VycyA9IHtcbiAgcHJlcGFyZTogZnVuY3Rpb24gKGFwcCkge1xuICAgIGFwcC5sYXRlUmVkdWNlciA9IHVuZGVmaW5lZDtcbiAgfSxcbiAgYWRkOiBmdW5jdGlvbiAoYXBwLCB7bGF0ZVJlZHVjZXJ9KSB7XG4gICAgYXBwLmxhdGVSZWR1Y2VyID0gc2VxdWVuY2VSZWR1Y2VycyhhcHAubGF0ZVJlZHVjZXIsIGxhdGVSZWR1Y2VyKTtcbiAgfSxcbiAgZmluYWxpemU6IGZ1bmN0aW9uIChhcHApIHtcbiAgICBhcHAucmVkdWNlciA9IHNlcXVlbmNlUmVkdWNlcnMoYXBwLnJlZHVjZXIsIGFwcC5sYXRlUmVkdWNlcik7XG4gICAgZGVsZXRlIGFwcC5sYXRlUmVkdWNlcjtcbiAgfVxufTtcblxuY29uc3QgQWN0aW9uUmVkdWNlcnMgPSB7XG4gIHByZXBhcmU6IGZ1bmN0aW9uIChhcHApIHtcbiAgICBhcHAuYWN0aW9uUmVkdWNlcnMgPSBuZXcgTWFwKCk7XG4gIH0sXG4gIGFkZDogZnVuY3Rpb24gKGFwcCwge2FjdGlvblJlZHVjZXJzfSkge1xuICAgIGlmIChhY3Rpb25SZWR1Y2Vycykge1xuICAgICAgZm9yIChsZXQga2V5IG9mIE9iamVjdC5rZXlzKGFjdGlvblJlZHVjZXJzKSkge1xuICAgICAgICBsZXQgcmVkdWNlciA9IGFwcC5hY3Rpb25SZWR1Y2Vycy5nZXQoa2V5KTtcbiAgICAgICAgcmVkdWNlciA9IHNlcXVlbmNlUmVkdWNlcnMocmVkdWNlciwgYWN0aW9uUmVkdWNlcnNba2V5XSk7XG4gICAgICAgIGFwcC5hY3Rpb25SZWR1Y2Vycy5zZXQoa2V5LCByZWR1Y2VyKTtcbiAgICAgIH1cbiAgICB9XG4gIH0sXG4gIGZpbmFsaXplOiBmdW5jdGlvbiAoYXBwKSB7XG4gICAgY29uc3QgYWN0aW9uUmVkdWNlciA9IG1ha2VBY3Rpb25SZWR1Y2VyKGFwcCk7XG4gICAgYXBwLnJlZHVjZXIgPSBzZXF1ZW5jZVJlZHVjZXJzKGFwcC5yZWR1Y2VyLCBhY3Rpb25SZWR1Y2VyKTtcbiAgICBkZWxldGUgYXBwLmFjdGlvblJlZHVjZXJzO1xuICB9XG59O1xuXG5jb25zdCBTYWdhcyA9IHtcbiAgcHJlcGFyZTogZnVuY3Rpb24gKGFwcCkge1xuICAgIGFwcC5zYWdhcyA9IFtdO1xuICB9LFxuICBhZGQ6IGZ1bmN0aW9uIChhcHAsIHtzYWdhLCBzYWdhc30pIHtcbiAgICBpZiAoc2FnYSkge1xuICAgICAgYXBwLnNhZ2FzLnB1c2goc2FnYSk7XG4gICAgfVxuICAgIGlmIChzYWdhcykge1xuICAgICAgQXJyYXkucHJvdG90eXBlLnB1c2guYXBwbHkoYXBwLnNhZ2FzLCBzYWdhcyk7XG4gICAgfVxuICB9LFxuICBmaW5hbGl6ZTogZnVuY3Rpb24gKGFwcCkge1xuICAgIGNvbnN0IGVmZmVjdHMgPSBhcHAuc2FnYXMubWFwKGZ1bmN0aW9uIChzYWdhKSB7IHJldHVybiBjYWxsKHNhZ2EpOyB9KTtcbiAgICBhcHAucm9vdFNhZ2EgPSBmdW5jdGlvbiogKCkgeyB5aWVsZCBhbGwoZWZmZWN0cyk7IH07XG4gICAgZGVsZXRlIGFwcC5zYWdhcztcbiAgfVxufTtcblxuY29uc3QgU2VsZWN0b3JzID0ge1xuICBwcmVwYXJlOiBmdW5jdGlvbiAoYXBwKSB7XG4gICAgYXBwLnNlbGVjdG9ycyA9IHt9O1xuICB9LFxuICBhZGQ6IGZ1bmN0aW9uIChhcHAsIHtzZWxlY3RvcnN9KSB7XG4gICAgaWYgKHNlbGVjdG9ycykge1xuICAgICAgT2JqZWN0LmFzc2lnbihhcHAuc2VsZWN0b3JzLCBzZWxlY3RvcnMpO1xuICAgIH1cbiAgfSxcbiAgZmluYWxpemU6IGZ1bmN0aW9uIChfYXBwKSB7XG4gIH1cbn07XG5cbmZ1bmN0aW9uIG1ha2VBY3Rpb25SZWR1Y2VyICh7YWN0aW9ucywgYWN0aW9uUmVkdWNlcnN9KSB7XG4gIGNvbnN0IG1hcCA9IG5ldyBNYXAoKTtcbiAgZm9yIChsZXQgW2tleSwgcmVkdWNlcl0gb2YgYWN0aW9uUmVkdWNlcnMuZW50cmllcygpKSB7XG4gICAgbWFwLnNldChhY3Rpb25zW2tleV0sIHJlZHVjZXIpO1xuICB9XG4gIHJldHVybiBmdW5jdGlvbiAoc3RhdGUsIGFjdGlvbikge1xuICAgIGNvbnN0IHJlZHVjZXIgPSBtYXAuZ2V0KGFjdGlvbi50eXBlKTtcbiAgICByZXR1cm4gdHlwZW9mIHJlZHVjZXIgPT09ICdmdW5jdGlvbicgPyByZWR1Y2VyKHN0YXRlLCBhY3Rpb24pIDogc3RhdGU7XG4gIH07XG59XG5cbmZ1bmN0aW9uIHNlcXVlbmNlUmVkdWNlcnMgKC4uLnJlZHVjZXJzKSB7XG4gIGxldCByZXN1bHQgPSB1bmRlZmluZWQ7XG4gIGZvciAodmFyIGkgPSAwOyBpIDwgcmVkdWNlcnMubGVuZ3RoOyBpICs9IDEpIHtcbiAgICB2YXIgcmVkdWNlciA9IHJlZHVjZXJzW2ldO1xuICAgIGlmICghcmVkdWNlcikge1xuICAgICAgY29udGludWU7XG4gICAgfVxuICAgIGlmICh0eXBlb2YgcmVkdWNlciAhPT0gJ2Z1bmN0aW9uJykge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCdyZWR1Y2VyIG11c3QgYmUgYSBmdW5jdGlvbicsIHJlZHVjZXIpO1xuICAgIH1cbiAgICBpZiAoIXJlc3VsdCkge1xuICAgICAgcmVzdWx0ID0gcmVkdWNlcjtcbiAgICB9IGVsc2Uge1xuICAgICAgcmVzdWx0ID0gY29tcG9zZVJlZHVjZXJzKHJlc3VsdCwgcmVkdWNlcik7XG4gICAgfVxuICB9XG4gIHJldHVybiByZXN1bHQ7XG59XG5cbmZ1bmN0aW9uIGNvbXBvc2VSZWR1Y2VycyAoZnN0LCBzbmQpIHtcbiAgcmV0dXJuIGZ1bmN0aW9uIChzdGF0ZSwgYWN0aW9uKSB7IHJldHVybiBzbmQoZnN0KHN0YXRlLCBhY3Rpb24pLCBhY3Rpb24pOyB9O1xufVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL2FsZ29yZWFfcmVhY3RfdGFzay9saW5rZXIuanMiLCIvLyBzdHlsZS1sb2FkZXI6IEFkZHMgc29tZSBjc3MgdG8gdGhlIERPTSBieSBhZGRpbmcgYSA8c3R5bGU+IHRhZ1xuXG4vLyBsb2FkIHRoZSBzdHlsZXNcbnZhciBjb250ZW50ID0gcmVxdWlyZShcIiEhLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvaW5kZXguanM/P3JlZi0tMS0xIS4vc3R5bGVzLmNzc1wiKTtcbmlmKHR5cGVvZiBjb250ZW50ID09PSAnc3RyaW5nJykgY29udGVudCA9IFtbbW9kdWxlLmlkLCBjb250ZW50LCAnJ11dO1xuLy8gUHJlcGFyZSBjc3NUcmFuc2Zvcm1hdGlvblxudmFyIHRyYW5zZm9ybTtcblxudmFyIG9wdGlvbnMgPSB7XCJzb3VyY2VNYXBcIjp0cnVlLFwiaG1yXCI6dHJ1ZX1cbm9wdGlvbnMudHJhbnNmb3JtID0gdHJhbnNmb3JtXG4vLyBhZGQgdGhlIHN0eWxlcyB0byB0aGUgRE9NXG52YXIgdXBkYXRlID0gcmVxdWlyZShcIiEuLi8uLi8uLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2xpYi9hZGRTdHlsZXMuanNcIikoY29udGVudCwgb3B0aW9ucyk7XG5pZihjb250ZW50LmxvY2FscykgbW9kdWxlLmV4cG9ydHMgPSBjb250ZW50LmxvY2Fscztcbi8vIEhvdCBNb2R1bGUgUmVwbGFjZW1lbnRcbmlmKG1vZHVsZS5ob3QpIHtcblx0Ly8gV2hlbiB0aGUgc3R5bGVzIGNoYW5nZSwgdXBkYXRlIHRoZSA8c3R5bGU+IHRhZ3Ncblx0aWYoIWNvbnRlbnQubG9jYWxzKSB7XG5cdFx0bW9kdWxlLmhvdC5hY2NlcHQoXCIhIS4uLy4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2luZGV4LmpzPz9yZWYtLTEtMSEuL3N0eWxlcy5jc3NcIiwgZnVuY3Rpb24oKSB7XG5cdFx0XHR2YXIgbmV3Q29udGVudCA9IHJlcXVpcmUoXCIhIS4uLy4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2luZGV4LmpzPz9yZWYtLTEtMSEuL3N0eWxlcy5jc3NcIik7XG5cdFx0XHRpZih0eXBlb2YgbmV3Q29udGVudCA9PT0gJ3N0cmluZycpIG5ld0NvbnRlbnQgPSBbW21vZHVsZS5pZCwgbmV3Q29udGVudCwgJyddXTtcblx0XHRcdHVwZGF0ZShuZXdDb250ZW50KTtcblx0XHR9KTtcblx0fVxuXHQvLyBXaGVuIHRoZSBtb2R1bGUgaXMgZGlzcG9zZWQsIHJlbW92ZSB0aGUgPHN0eWxlPiB0YWdzXG5cdG1vZHVsZS5ob3QuZGlzcG9zZShmdW5jdGlvbigpIHsgdXBkYXRlKCk7IH0pO1xufVxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vc3JjL2FsZ29yZWFfcmVhY3RfdGFzay91aS9zdHlsZXMuY3NzXG4vLyBtb2R1bGUgaWQgPSA0MDBcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiZXhwb3J0cyA9IG1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2xpYi9jc3MtYmFzZS5qc1wiKShmYWxzZSk7XG4vLyBpbXBvcnRzXG5cblxuLy8gbW9kdWxlXG5leHBvcnRzLnB1c2goW21vZHVsZS5pZCwgXCIudGFzay1iYXIge1xcbiAgICB0ZXh0LWFsaWduOiBjZW50ZXI7XFxuICAgIG1hcmdpbi10b3A6IDIwcHg7XFxufVwiLCBcIlwiXSk7XG5cbi8vIGV4cG9ydHNcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXI/P3JlZi0tMS0xIS4vc3JjL2FsZ29yZWFfcmVhY3RfdGFzay91aS9zdHlsZXMuY3NzXG4vLyBtb2R1bGUgaWQgPSA0MDFcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCB7QWxlcnR9IGZyb20gJ3JlYWN0LWJvb3RzdHJhcCc7XG5pbXBvcnQge2Nvbm5lY3R9IGZyb20gJ3JlYWN0LXJlZHV4JztcbmltcG9ydCB7Y2FsbCwgZm9yaywgdGFrZUV2ZXJ5LCBzZWxlY3QsIHRha2UsIHB1dH0gZnJvbSAncmVkdXgtc2FnYS9lZmZlY3RzJztcblxuaW1wb3J0IFRhc2tCYXIgZnJvbSAnLi91aS90YXNrX2Jhcic7XG5pbXBvcnQgU3Bpbm5lciBmcm9tICcuL3VpL3NwaW5uZXInO1xuaW1wb3J0IG1ha2VUYXNrQ2hhbm5lbCBmcm9tICcuL2xlZ2FjeS90YXNrJztcbmltcG9ydCBtYWtlU2VydmVyQXBpIGZyb20gJy4vc2VydmVyX2FwaSc7XG5pbXBvcnQgbWFrZVBsYXRmb3JtQWRhcHRlciBmcm9tICcuL2xlZ2FjeS9wbGF0Zm9ybV9hZGFwdGVyJztcbmltcG9ydCBQbGF0Zm9ybUJ1bmRsZSBmcm9tICcuL3BsYXRmb3JtX2J1bmRsZSc7XG5pbXBvcnQgSGludHNCdW5kbGUgZnJvbSAnLi9oaW50c19idW5kbGUnO1xuaW1wb3J0IHt3aW5kb3dIZWlnaHRNb25pdG9yU2FnYX0gZnJvbSAnLi93aW5kb3dfaGVpZ2h0X21vbml0b3InO1xuXG5mdW5jdGlvbiBhcHBJbml0UmVkdWNlciAoc3RhdGUsIHtwYXlsb2FkOiB7dGFza1Rva2VuLCBvcHRpb25zfX0pIHtcbiAgICByZXR1cm4gey4uLnN0YXRlLCB0YXNrVG9rZW4sIG9wdGlvbnN9O1xufVxuXG5mdW5jdGlvbiBhcHBJbml0RG9uZVJlZHVjZXIgKHN0YXRlLCB7cGF5bG9hZDoge3BsYXRmb3JtQXBpLCB0YXNrQXBpLCBzZXJ2ZXJBcGl9fSkge1xuICAgIHJldHVybiB7Li4uc3RhdGUsIHBsYXRmb3JtQXBpLCB0YXNrQXBpLCBzZXJ2ZXJBcGl9O1xufVxuXG5mdW5jdGlvbiBhcHBJbml0RmFpbGVkUmVkdWNlciAoc3RhdGUsIHtwYXlsb2FkOiB7bWVzc2FnZX19KSB7XG4gICAgcmV0dXJuIHsuLi5zdGF0ZSwgZmF0YWxFcnJvcjogbWVzc2FnZX07XG59XG5cbmZ1bmN0aW9uKiBhcHBTYWdhICgpIHtcbiAgICBjb25zdCBhY3Rpb25zID0geWllbGQgc2VsZWN0KCh7YWN0aW9uc30pID0+IGFjdGlvbnMpO1xuICAgIHlpZWxkIHRha2VFdmVyeShhY3Rpb25zLmFwcEluaXQsIGFwcEluaXRTYWdhKTtcbiAgICB5aWVsZCB0YWtlRXZlcnkoYWN0aW9ucy5wbGF0Zm9ybVZhbGlkYXRlLCBwbGF0Zm9ybVZhbGlkYXRlU2FnYSk7XG59XG5cbmNvbnN0IHRhc2tBY3Rpb25zID0geyAvKiBtYXAgdGFzayBtZXRob2QgbmFtZXMgdG8gYWN0aW9uIHR5cGVzICovXG4gICAgbG9hZDogJ3Rhc2tMb2FkRXZlbnQnLFxuICAgIHVubG9hZDogJ3Rhc2tVbmxvYWRFdmVudCcsXG4gICAgdXBkYXRlVG9rZW46ICd0YXNrVXBkYXRlVG9rZW5FdmVudCcsXG4gICAgZ2V0SGVpZ2h0OiAndGFza0dldEhlaWdodEV2ZW50JyxcbiAgICBnZXRNZXRhRGF0YTogJ3Rhc2tHZXRNZXRhRGF0YUV2ZW50JyxcbiAgICBnZXRWaWV3czogJ3Rhc2tHZXRWaWV3c0V2ZW50JyxcbiAgICBzaG93Vmlld3M6ICd0YXNrU2hvd1ZpZXdzRXZlbnQnLFxuICAgIGdldFN0YXRlOiAndGFza0dldFN0YXRlRXZlbnQnLFxuICAgIHJlbG9hZFN0YXRlOiAndGFza1JlbG9hZFN0YXRlRXZlbnQnLFxuICAgIGdldEFuc3dlcjogJ3Rhc2tHZXRBbnN3ZXJFdmVudCcsXG4gICAgcmVsb2FkQW5zd2VyOiAndGFza1JlbG9hZEFuc3dlckV2ZW50JyxcbiAgICBncmFkZUFuc3dlcjogJ3Rhc2tHcmFkZUFuc3dlckV2ZW50Jyxcbn07XG5cbmZ1bmN0aW9uKiBhcHBJbml0U2FnYSAoe3BheWxvYWQ6IHt0YXNrVG9rZW4sIG9wdGlvbnMsIHBsYXRmb3JtfX0pIHtcbiAgICBjb25zdCBhY3Rpb25zID0geWllbGQgc2VsZWN0KCh7YWN0aW9uc30pID0+IGFjdGlvbnMpO1xuICAgIGxldCB0YXNrQ2hhbm5lbCwgdGFza0FwaSwgcGxhdGZvcm1BcGksIHNlcnZlckFwaTtcbiAgICB0cnkge1xuICAgICAgICBzZXJ2ZXJBcGkgPSBtYWtlU2VydmVyQXBpKG9wdGlvbnMuc2VydmVyX21vZHVsZSwgdGFza1Rva2VuKTtcbiAgICAgICAgdGFza0NoYW5uZWwgPSB5aWVsZCBjYWxsKG1ha2VUYXNrQ2hhbm5lbCk7XG4gICAgICAgIHRhc2tBcGkgPSAoeWllbGQgdGFrZSh0YXNrQ2hhbm5lbCkpLnRhc2s7XG4gICAgICAgIHlpZWxkIHRha2VFdmVyeSh0YXNrQ2hhbm5lbCwgZnVuY3Rpb24qICh7dHlwZSwgcGF5bG9hZH0pIHtcbiAgICAgICAgICAgIGNvbnN0IGFjdGlvbiA9IHt0eXBlOiBhY3Rpb25zW3Rhc2tBY3Rpb25zW3R5cGVdXSwgcGF5bG9hZH07XG4gICAgICAgICAgICB5aWVsZCBwdXQoYWN0aW9uKTtcbiAgICAgICAgfSk7XG4gICAgICAgIHBsYXRmb3JtQXBpID0gbWFrZVBsYXRmb3JtQWRhcHRlcihwbGF0Zm9ybSk7XG4gICAgfSBjYXRjaCAoZXgpIHtcbiAgICAgICAgeWllbGQgcHV0KHt0eXBlOiBhY3Rpb25zLmFwcEluaXRGYWlsZWQsIHBheWxvYWQ6IHttZXNzYWdlOiBleC50b1N0cmluZygpfX0pO1xuICAgICAgICByZXR1cm47XG4gICAgfVxuICAgIHlpZWxkIHB1dCh7dHlwZTogYWN0aW9ucy5hcHBJbml0RG9uZSwgcGF5bG9hZDoge3Rhc2tBcGksIHBsYXRmb3JtQXBpLCBzZXJ2ZXJBcGl9fSk7XG4gICAgLyogWFhYIElkZWFsbHkgcGxhdGZvcm0uaW5pdFdpdGhUYXNrIHdvdWxkIHRha2UgY2FyZSBvZiBzZXR0aW5nIGl0cyBnbG9iYWwuICovXG4gICAgd2luZG93LnRhc2sgPSB0YXNrQXBpO1xuICAgIHlpZWxkIGNhbGwocGxhdGZvcm1BcGkuaW5pdFdpdGhUYXNrLCB0YXNrQXBpKTtcbiAgICAvKiBYWFggcGxhdGZvcm0uaW5pdFdpdGhUYXNrIGZhaWxzIHRvIGNvbmZvcm0gdG8gT3BlcmF0aW9ucyBBUEkgYW5kIG5ldmVyXG4gICAgICAgICAgIHJldHVybiwgY2F1c2luZyB0aGUgc2FnYSB0byByZW1haW4gc3R1Y2sgYXQgdGhpcyBwb2ludC4gKi9cbiAgICB5aWVsZCBmb3JrKHdpbmRvd0hlaWdodE1vbml0b3JTYWdhLCBwbGF0Zm9ybUFwaSk7XG59XG5cbmZ1bmN0aW9uKiBwbGF0Zm9ybVZhbGlkYXRlU2FnYSAoe3BheWxvYWQ6IHttb2RlfX0pIHtcbiAgICBjb25zdCB7dmFsaWRhdGV9ID0geWllbGQgc2VsZWN0KHN0YXRlID0+IHN0YXRlLnBsYXRmb3JtQXBpKTtcbiAgICAvKiBUT0RPOiBlcnJvciBoYW5kbGluZywgd3JhcCBpbiB0cnkvY2F0Y2ggYmxvY2sgKi9cbiAgICB5aWVsZCBjYWxsKHZhbGlkYXRlLCBtb2RlKTtcbn1cblxuZnVuY3Rpb24gQXBwU2VsZWN0b3IgKHN0YXRlKSB7XG4gICAgY29uc3Qge3Rhc2tSZWFkeSwgZmF0YWxFcnJvciwgdmlld3M6IHtXb3Jrc3BhY2V9LCBhY3Rpb25zOiB7cGxhdGZvcm1WYWxpZGF0ZX0sIGdyYWRpbmd9ID0gc3RhdGU7XG4gICAgcmV0dXJuIHt0YXNrUmVhZHksIGZhdGFsRXJyb3IsIFdvcmtzcGFjZSwgcGxhdGZvcm1WYWxpZGF0ZSwgZ3JhZGluZ307XG59XG5cbmNsYXNzIEFwcCBleHRlbmRzIFJlYWN0LlB1cmVDb21wb25lbnQge1xuICAgIHJlbmRlciAoKSB7XG4gICAgICAgIGNvbnN0IHt0YXNrUmVhZHksIFdvcmtzcGFjZSwgZmF0YWxFcnJvciwgZ3JhZGluZ30gPSB0aGlzLnByb3BzO1xuICAgICAgICBpZiAoZmF0YWxFcnJvcikge1xuICAgICAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgICAgICA8ZGl2PlxuICAgICAgICAgICAgICAgICAgICA8aDE+e1wiQSBmYXRhbCBlcnJvciBoYXMgb2NjdXJyZWRcIn08L2gxPlxuICAgICAgICAgICAgICAgICAgICA8cD57ZmF0YWxFcnJvcn08L3A+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICApO1xuICAgICAgICB9XG4gICAgICAgIGlmICghdGFza1JlYWR5KSB7XG4gICAgICAgICAgICByZXR1cm4gPFNwaW5uZXIvPjtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgPGRpdj5cbiAgICAgICAgICAgICAgICA8V29ya3NwYWNlLz5cbiAgICAgICAgICAgICAgICA8VGFza0JhciBvblZhbGlkYXRlPXt0aGlzLl92YWxpZGF0ZX0vPlxuICAgICAgICAgICAgICAgIHtncmFkaW5nLm1lc3NhZ2UgJiZcbiAgICAgICAgICAgICAgICAgICAgPHAgc3R5bGU9e3tmb250V2VpZ2h0OiAnYm9sZCd9fT57Z3JhZGluZy5tZXNzYWdlfTwvcD59XG4gICAgICAgICAgICAgICAge3R5cGVvZiBncmFkaW5nLnNjb3JlID09PSAnbnVtYmVyJyAmJlxuICAgICAgICAgICAgICAgICAgICA8cD57XCJWb3RyZSBzY29yZSA6IFwifTxzcGFuIHN0eWxlPXt7Zm9udFdlaWdodDogJ2JvbGQnfX0+e2dyYWRpbmcuc2NvcmV9PC9zcGFuPjwvcD59XG4gICAgICAgICAgICAgICAge2dyYWRpbmcuZXJyb3IgJiZcbiAgICAgICAgICAgICAgICAgICAgPEFsZXJ0IGJzU3R5bGU9J2Rhbmdlcic+e2dyYWRpbmcuZXJyb3J9PC9BbGVydD59XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgKTtcbiAgICB9XG4gICAgX3ZhbGlkYXRlID0gKCkgPT4ge1xuICAgICAgICB0aGlzLnByb3BzLmRpc3BhdGNoKHt0eXBlOiB0aGlzLnByb3BzLnBsYXRmb3JtVmFsaWRhdGUsIHBheWxvYWQ6IHttb2RlOiAnZG9uZSd9fSk7XG4gICAgfTtcbn1cblxuZXhwb3J0IGRlZmF1bHQge1xuICAgIGFjdGlvbnM6IHtcbiAgICAgICAgYXBwSW5pdDogJ0FwcC5Jbml0JyxcbiAgICAgICAgYXBwSW5pdERvbmU6ICdBcHAuSW5pdC5Eb25lJyxcbiAgICAgICAgYXBwSW5pdEZhaWxlZDogJ0FwcC5Jbml0LkZhaWxlZCcsXG4gICAgICAgIHBsYXRmb3JtVmFsaWRhdGU6ICdQbGF0Zm9ybS5WYWxpZGF0ZScsXG4gICAgfSxcbiAgICBhY3Rpb25SZWR1Y2Vyczoge1xuICAgICAgICBhcHBJbml0OiBhcHBJbml0UmVkdWNlcixcbiAgICAgICAgYXBwSW5pdERvbmU6IGFwcEluaXREb25lUmVkdWNlcixcbiAgICAgICAgYXBwSW5pdEZhaWxlZDogYXBwSW5pdEZhaWxlZFJlZHVjZXIsXG4gICAgfSxcbiAgICBzYWdhOiBhcHBTYWdhLFxuICAgIHZpZXdzOiB7XG4gICAgICAgIEFwcDogY29ubmVjdChBcHBTZWxlY3RvcikoQXBwKVxuICAgIH0sXG4gICAgaW5jbHVkZXM6IFtcbiAgICAgICAgUGxhdGZvcm1CdW5kbGUsXG4gICAgICAgIEhpbnRzQnVuZGxlLFxuICAgIF1cbn07XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvYWxnb3JlYV9yZWFjdF90YXNrL2FwcF9idW5kbGUuanMiLCJcbmltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQge0J1dHRvbn0gZnJvbSAncmVhY3QtYm9vdHN0cmFwJztcblxuZnVuY3Rpb24gVGFza0JhciAocHJvcHMpIHtcbiAgcmV0dXJuIChcbiAgICAgPGRpdiBjbGFzc05hbWU9J3Rhc2stYmFyJz5cbiAgICAgICAgPEJ1dHRvbiBvbkNsaWNrPXtwcm9wcy5vblZhbGlkYXRlfT5cbiAgICAgICAgICB7XCJWYWxpZGVyXCJ9XG4gICAgICAgIDwvQnV0dG9uPlxuICAgICA8L2Rpdj5cbiAgKTtcbn1cblxuZXhwb3J0IGRlZmF1bHQgVGFza0JhcjtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9hbGdvcmVhX3JlYWN0X3Rhc2svdWkvdGFza19iYXIuanMiLCJcbmltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5cbmZ1bmN0aW9uIFNwaW5uZXIgKF9wcm9wcykge1xuICByZXR1cm4gKFxuICAgIDxkaXYgY2xhc3NOYW1lPSd0ZXh0LWNlbnRlcicgc3R5bGU9e3tmb250U2l6ZTogJzMwMCUnfX0+XG4gICAgICA8aSBjbGFzc05hbWU9XCJmYSBmYS1zcGlubmVyIGZhLXNwaW5cIi8+XG4gICAgPC9kaXY+XG4gICk7XG59XG5cbmV4cG9ydCBkZWZhdWx0IFNwaW5uZXI7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvYWxnb3JlYV9yZWFjdF90YXNrL3VpL3NwaW5uZXIuanMiLCJcbmltcG9ydCB7YnVmZmVycywgZXZlbnRDaGFubmVsfSBmcm9tICdyZWR1eC1zYWdhJztcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gKCkge1xuICAgIHJldHVybiBldmVudENoYW5uZWwoZnVuY3Rpb24gKGVtaXQpIHtcbiAgICAgICAgY29uc3QgdGFzayA9IG1ha2VUYXNrKGVtaXQpO1xuICAgICAgICBlbWl0KHt0YXNrfSk7XG4gICAgICAgIHJldHVybiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICBmb3IgKGxldCBwcm9wIG9mIE9iamVjdC5rZXlzKHRhc2spKSB7XG4gICAgICAgICAgICAgICAgdGFza1twcm9wXSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCd0YXNrIGNoYW5uZWwgaXMgY2xvc2VkJyk7XG4gICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfTtcbiAgICB9LCBidWZmZXJzLmV4cGFuZGluZyg0KSk7XG59XG5cbmZ1bmN0aW9uIG1ha2VUYXNrIChlbWl0KSB7XG4gICAgcmV0dXJuIHtcbiAgICAgICAgc2hvd1ZpZXdzOiBmdW5jdGlvbiAodmlld3MsIHN1Y2Nlc3MsIGVycm9yKSB7XG4gICAgICAgICAgICBlbWl0KHt0eXBlOiAnc2hvd1ZpZXdzJywgcGF5bG9hZDoge3ZpZXdzLCBzdWNjZXNzLCBlcnJvcn19KTtcbiAgICAgICAgfSxcbiAgICAgICAgZ2V0Vmlld3M6IGZ1bmN0aW9uIChzdWNjZXNzLCBlcnJvcikge1xuICAgICAgICAgICAgZW1pdCh7dHlwZTogJ2dldFZpZXdzJywgcGF5bG9hZDoge3N1Y2Nlc3MsIGVycm9yfX0pO1xuICAgICAgICB9LFxuICAgICAgICB1cGRhdGVUb2tlbjogZnVuY3Rpb24gKHRva2VuLCBzdWNjZXNzLCBlcnJvcikge1xuICAgICAgICAgICAgZW1pdCh7dHlwZTogJ3VwZGF0ZVRva2VuJywgcGF5bG9hZDoge3Rva2VuLCBzdWNjZXNzLCBlcnJvcn19KTtcbiAgICAgICAgfSxcbiAgICAgICAgZ2V0SGVpZ2h0OiBmdW5jdGlvbiAoc3VjY2VzcywgZXJyb3IpIHtcbiAgICAgICAgICAgIGVtaXQoe3R5cGU6ICdnZXRIZWlnaHQnLCBwYXlsb2FkOiB7c3VjY2VzcywgZXJyb3J9fSk7XG4gICAgICAgIH0sXG4gICAgICAgIHVubG9hZDogZnVuY3Rpb24gKHN1Y2Nlc3MsIGVycm9yKSB7XG4gICAgICAgICAgICBlbWl0KHt0eXBlOiAndW5sb2FkJywgcGF5bG9hZDoge3N1Y2Nlc3MsIGVycm9yfX0pO1xuICAgICAgICB9LFxuICAgICAgICBnZXRTdGF0ZTogZnVuY3Rpb24gKHN1Y2Nlc3MsIGVycm9yKSB7XG4gICAgICAgICAgICBlbWl0KHt0eXBlOiAnZ2V0U3RhdGUnLCBwYXlsb2FkOiB7c3VjY2VzcywgZXJyb3J9fSk7XG4gICAgICAgIH0sXG4gICAgICAgIGdldE1ldGFEYXRhOiBmdW5jdGlvbiAoc3VjY2VzcywgZXJyb3IpIHtcbiAgICAgICAgICAgIGVtaXQoe3R5cGU6ICdnZXRNZXRhRGF0YScsIHBheWxvYWQ6IHtzdWNjZXNzLCBlcnJvcn19KTtcbiAgICAgICAgfSxcbiAgICAgICAgcmVsb2FkQW5zd2VyOiBmdW5jdGlvbiAoYW5zd2VyLCBzdWNjZXNzLCBlcnJvcikge1xuICAgICAgICAgICAgZW1pdCh7dHlwZTogJ3JlbG9hZEFuc3dlcicsIHBheWxvYWQ6IHthbnN3ZXIsIHN1Y2Nlc3MsIGVycm9yfX0pO1xuICAgICAgICB9LFxuICAgICAgICByZWxvYWRTdGF0ZTogZnVuY3Rpb24gKHN0YXRlLCBzdWNjZXNzLCBlcnJvcikge1xuICAgICAgICAgICAgZW1pdCh7dHlwZTogJ3JlbG9hZFN0YXRlJywgcGF5bG9hZDoge3N0YXRlLCBzdWNjZXNzLCBlcnJvcn19KTtcbiAgICAgICAgfSxcbiAgICAgICAgZ2V0QW5zd2VyOiBmdW5jdGlvbiAoc3VjY2VzcywgZXJyb3IpIHtcbiAgICAgICAgICAgIGVtaXQoe3R5cGU6ICdnZXRBbnN3ZXInLCBwYXlsb2FkOiB7c3VjY2VzcywgZXJyb3J9fSk7XG4gICAgICAgIH0sXG4gICAgICAgIGxvYWQ6IGZ1bmN0aW9uICh2aWV3cywgc3VjY2VzcywgZXJyb3IpIHtcbiAgICAgICAgICAgIGVtaXQoe3R5cGU6ICdsb2FkJywgcGF5bG9hZDoge3ZpZXdzLCBzdWNjZXNzLCBlcnJvcn19KTtcbiAgICAgICAgfSxcbiAgICAgICAgZ3JhZGVBbnN3ZXI6IGZ1bmN0aW9uIChhbnN3ZXIsIGFuc3dlclRva2VuLCBzdWNjZXNzLCBlcnJvcikge1xuICAgICAgICAgICAgZW1pdCh7dHlwZTogJ2dyYWRlQW5zd2VyJywgcGF5bG9hZDoge2Fuc3dlciwgYW5zd2VyVG9rZW4sIHN1Y2Nlc3MsIGVycm9yfX0pO1xuICAgICAgICB9LFxuICAgIH07XG59XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvYWxnb3JlYV9yZWFjdF90YXNrL2xlZ2FjeS90YXNrLmpzIiwiXG5pbXBvcnQgZmV0Y2hQb255ZmlsbCBmcm9tICdmZXRjaC1wb255ZmlsbCc7XG5cbmNvbnN0IHtmZXRjaH0gPSBmZXRjaFBvbnlmaWxsKCk7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIG1ha2VTZXJ2ZXJBcGkgKGNvbmZpZykge1xuICAgIHJldHVybiBmdW5jdGlvbiAoc2VydmljZSwgYWN0aW9uLCBib2R5KSB7XG4gICAgICAgIHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KSB7XG4gICAgICAgICAgICBjb25zdCB1cmwgPSBuZXcgVVJMKHNlcnZpY2UsIGNvbmZpZy5iYXNlVXJsKTtcbiAgICAgICAgICAgIGNvbnN0IGRldmVsID0gY29uZmlnLmRldmVsID8ge3Rhc2s6IGNvbmZpZy5kZXZlbH0gOiB7fTtcbiAgICAgICAgICAgIHJldHVybiBmZXRjaCh1cmwsIHtcbiAgICAgICAgICAgICAgICBtZXRob2Q6ICdQT1NUJyxcbiAgICAgICAgICAgICAgICBoZWFkZXJzOiB7XG4gICAgICAgICAgICAgICAgICAgICdDb250ZW50LVR5cGUnOiAnYXBwbGljYXRpb24vanNvbicsXG4gICAgICAgICAgICAgICAgICAgICdBY2NlcHQnOiAnYXBwbGljYXRpb24vanNvbicsXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBib2R5OiBKU09OLnN0cmluZ2lmeSh7Li4uYm9keSwgLi4uZGV2ZWwsIGFjdGlvbn0pXG4gICAgICAgICAgICB9KS50aGVuKGZ1bmN0aW9uIChyZXNwb25zZSkge1xuICAgICAgICAgICAgICAgIGlmIChyZXNwb25zZS5zdGF0dXMgIT09IDIwMCkgcmV0dXJuIHJlamVjdChyZXNwb25zZSk7XG4gICAgICAgICAgICAgICAgcmVzcG9uc2UuanNvbigpLmNhdGNoKHJlamVjdCkudGhlbihmdW5jdGlvbiAocmVzdWx0KSB7XG4gICAgICAgICAgICAgICAgICAgIGlmICghcmVzdWx0LnN1Y2Nlc3MpIHJldHVybiByZWplY3QocmVzdWx0LmVycm9yKTtcbiAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZShyZXN1bHQuZGF0YSk7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9KS5jYXRjaChyZWplY3QpO1xuICAgICAgICB9KTtcbiAgICB9O1xufVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL2FsZ29yZWFfcmVhY3RfdGFzay9zZXJ2ZXJfYXBpLmpzIiwiXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiAocGxhdGZvcm0pIHtcblxuICAgIGZ1bmN0aW9uIGluaXRXaXRoVGFzayAodGFzaykge1xuICAgICAgICByZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkge1xuICAgICAgICAgICAgcGxhdGZvcm0uaW5pdFdpdGhUYXNrKHRhc2ssIHJlc29sdmUsIHJlamVjdCk7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGdldFRhc2tQYXJhbXMgKGtleSwgZGVmYXVsdFZhbHVlKSB7XG4gICAgICAgIHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KSB7XG4gICAgICAgICAgICBwbGF0Zm9ybS5nZXRUYXNrUGFyYW1zKGtleSwgZGVmYXVsdFZhbHVlLCByZXNvbHZlLCByZWplY3QpO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBhc2tIaW50IChoaW50VG9rZW4pIHtcbiAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHtcbiAgICAgICAgICAgIHBsYXRmb3JtLmFza0hpbnQoaGludFRva2VuLCByZXNvbHZlLCByZWplY3QpO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiB2YWxpZGF0ZSAobW9kZSkge1xuICAgICAgICByZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkge1xuICAgICAgICAgICAgcGxhdGZvcm0udmFsaWRhdGUobW9kZSwgcmVzb2x2ZSwgcmVqZWN0KTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gdXBkYXRlRGlzcGxheSAob3B0aW9ucykge1xuICAgICAgICByZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkge1xuICAgICAgICAgICAgcGxhdGZvcm0udXBkYXRlRGlzcGxheShvcHRpb25zLCByZXNvbHZlLCByZWplY3QpO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICByZXR1cm4ge2luaXRXaXRoVGFzaywgZ2V0VGFza1BhcmFtcywgYXNrSGludCwgdmFsaWRhdGUsIHVwZGF0ZURpc3BsYXl9O1xuXG59XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvYWxnb3JlYV9yZWFjdF90YXNrL2xlZ2FjeS9wbGF0Zm9ybV9hZGFwdGVyLmpzIiwiLypcbiMgUGVyZm9ybWFuY2Vcbi0gdGFzay5nZXRIZWlnaHQgYW5kIHRhc2suZ2V0QW5zd2VyIGFyZSBjYWxsZWQgZXZlcnkgc2Vjb25kXG4tIHRhc2suZ2V0Vmlld3MgaXMgY2FsbGVkIHdoZW5ldmVyIHRoZSB3aW5kb3cncyBoZWlnaHQgY2hhbmdlc1xuKi9cblxuaW1wb3J0IHtjYWxsLCBwdXQsIHNlbGVjdCwgdGFrZUV2ZXJ5fSBmcm9tICdyZWR1eC1zYWdhL2VmZmVjdHMnO1xuaW1wb3J0IHN0cmluZ2lmeSBmcm9tICdqc29uLXN0YWJsZS1zdHJpbmdpZnktd2l0aG91dC1qc29uaWZ5JztcblxuZnVuY3Rpb24gYXBwSW5pdFJlZHVjZXIgKHN0YXRlLCB7cGF5bG9hZDoge3Rhc2tUb2tlbiwgb3B0aW9uc319KSB7XG4gICAgcmV0dXJuIHsuLi5zdGF0ZSwgZ3JhZGluZzoge319O1xufVxuXG5mdW5jdGlvbiB0YXNrRGF0YUxvYWRlZFJlZHVjZXIgKHN0YXRlLCB7cGF5bG9hZDoge3Rhc2tEYXRhfX0pIHtcbiAgICByZXR1cm4gey4uLnN0YXRlLCB0YXNrRGF0YX07XG59XG5cbmZ1bmN0aW9uIHRhc2tTdGF0ZUxvYWRlZFJlZHVjZXIgKHN0YXRlLCB7cGF5bG9hZDoge2hpbnRzfX0pIHtcbiAgICByZXR1cm4gey4uLnN0YXRlLCBoaW50c307XG59XG5cbmZ1bmN0aW9uIHRhc2tBbnN3ZXJMb2FkZWRSZWR1Y2VyIChzdGF0ZSwge3BheWxvYWQ6IHthbnN3ZXJ9fSkge1xuICAgIHJldHVybiB7Li4uc3RhdGUsIGFuc3dlcn07XG59XG5cbmZ1bmN0aW9uIHRhc2tTaG93Vmlld3NFdmVudFJlZHVjZXIgKHN0YXRlLCB7cGF5bG9hZDoge3ZpZXdzfX0pIHtcbiAgICByZXR1cm4gey4uLnN0YXRlLCB0YXNrVmlld3M6IHZpZXdzfTtcbn1cblxuZnVuY3Rpb24qIHRhc2tTaG93Vmlld3NFdmVudFNhZ2EgKHtwYXlsb2FkOiB7c3VjY2Vzc319KSB7XG4gICAgLyogVGhlIHJlZHVjZXIgaGFzIHN0b3JlZCB0aGUgdmlld3MgdG8gc2hvdywganVzdCBjYWxsIHN1Y2Nlc3MuICovXG4gICAgeWllbGQgY2FsbChzdWNjZXNzKTtcbn1cblxuZnVuY3Rpb24qIHRhc2tHZXRWaWV3c0V2ZW50U2FnYSAoe3BheWxvYWQ6IHtzdWNjZXNzfX0pIHtcbiAgICAvKiBYWFggb25seSB0aGUgJ3Rhc2snIHZpZXcgaXMgZGVjbGFyZWQgKi9cbiAgICB5aWVsZCBjYWxsKHN1Y2Nlc3MsIHsndGFzayc6IHt9fSk7XG59XG5cbmZ1bmN0aW9uIHRhc2tVcGRhdGVUb2tlbkV2ZW50UmVkdWNlciAoc3RhdGUsIHtwYXlsb2FkOiB7dG9rZW59fSkge1xuICAgIGlmICh0b2tlbiA9PT0gbnVsbCkge1xuICAgICAgICBjb25zb2xlLndhcm4oJ2lnbm9yZWQgdGFzay51cGRhdGVUb2tlbiB3aXRoIG51bGwgdG9rZW4nKTtcbiAgICAgICAgcmV0dXJuIHN0YXRlO1xuICAgIH1cbiAgICByZXR1cm4gey4uLnN0YXRlLCB0YXNrVG9rZW46IHRva2VufTtcbn1cbmZ1bmN0aW9uKiB0YXNrVXBkYXRlVG9rZW5FdmVudFNhZ2EgKHtwYXlsb2FkOiB7c3VjY2Vzc319KSB7XG4gICAgeWllbGQgY2FsbChzdWNjZXNzKTtcbn1cblxuZnVuY3Rpb24qIHRhc2tHZXRIZWlnaHRFdmVudFNhZ2EgKHtwYXlsb2FkOiB7c3VjY2Vzc319KSB7XG4gICAgY29uc3QgZCA9IGRvY3VtZW50O1xuICAgIGNvbnN0IGggPSBNYXRoLm1heChkLmJvZHkub2Zmc2V0SGVpZ2h0LCBkLmRvY3VtZW50RWxlbWVudC5vZmZzZXRIZWlnaHQpO1xuICAgIHlpZWxkIGNhbGwoc3VjY2VzcywgaCk7XG59XG5cbmZ1bmN0aW9uKiB0YXNrVW5sb2FkRXZlbnRTYWdhICh7cGF5bG9hZDoge3N1Y2Nlc3N9fSkge1xuICAgIC8qIFhYWCBObyBhY3Rpb24gbmVlZGVkPyAqL1xuICAgIHlpZWxkIGNhbGwoc3VjY2Vzcyk7XG59XG5cbmZ1bmN0aW9uKiB0YXNrR2V0TWV0YURhdGFFdmVudFNhZ2EgKHtwYXlsb2FkOiB7c3VjY2VzcywgZXJyb3I6IF9lcnJvcn19KSB7XG4gICAgY29uc3QgbWV0YURhdGEgPSB5aWVsZCBzZWxlY3QoKHt0YXNrTWV0YURhdGF9KSA9PiB0YXNrTWV0YURhdGEpO1xuICAgIHlpZWxkIGNhbGwoc3VjY2VzcywgbWV0YURhdGEpO1xufVxuXG5mdW5jdGlvbiogdGFza0dldEFuc3dlckV2ZW50U2FnYSAoe3BheWxvYWQ6IHtzdWNjZXNzfX0pIHtcbiAgICBjb25zdCBhbnN3ZXIgPSB5aWVsZCBzZWxlY3Qoc3RhdGUgPT4gc3RhdGUuc2VsZWN0b3JzLmdldFRhc2tBbnN3ZXIoc3RhdGUpKTtcbiAgICBjb25zdCBzdHJBbnN3ZXIgPSBzdHJpbmdpZnkoYW5zd2VyKTtcbiAgICB5aWVsZCBjYWxsKHN1Y2Nlc3MsIHN0ckFuc3dlcik7XG59XG5cbmZ1bmN0aW9uKiB0YXNrUmVsb2FkQW5zd2VyRXZlbnRTYWdhICh7cGF5bG9hZDoge2Fuc3dlciwgc3VjY2VzcywgZXJyb3J9fSkge1xuICAgIGNvbnN0IHt0YXNrQW5zd2VyTG9hZGVkLCB0YXNrUmVmcmVzaH0gPSB5aWVsZCBzZWxlY3QoKHthY3Rpb25zfSkgPT4gYWN0aW9ucyk7XG4gICAgdHJ5IHtcbiAgICAgICAgaWYgKGFuc3dlcikge1xuICAgICAgICAgICAgeWllbGQgcHV0KHt0eXBlOiB0YXNrQW5zd2VyTG9hZGVkLCBwYXlsb2FkOiB7YW5zd2VyOiBKU09OLnBhcnNlKGFuc3dlcil9fSk7XG4gICAgICAgICAgICB5aWVsZCBwdXQoe3R5cGU6IHRhc2tSZWZyZXNofSk7XG4gICAgICAgIH1cbiAgICAgICAgeWllbGQgY2FsbChzdWNjZXNzKTtcbiAgICB9IGNhdGNoIChleCkge1xuICAgICAgICB5aWVsZCBjYWxsKGVycm9yLCBgYmFkIGFuc3dlcjogJHtleC5tZXNzYWdlfWApO1xuICAgIH1cbn1cblxuZnVuY3Rpb24qIHRhc2tHZXRTdGF0ZUV2ZW50U2FnYSAoe3BheWxvYWQ6IHtzdWNjZXNzfX0pIHtcbiAgICBjb25zdCBkdW1wID0geWllbGQgc2VsZWN0KHN0YXRlID0+IHN0YXRlLnNlbGVjdG9ycy5nZXRUYXNrU3RhdGUoc3RhdGUpKTtcbiAgICBjb25zdCBzdHJEdW1wID0gc3RyaW5naWZ5KGR1bXApO1xuICAgIHlpZWxkIGNhbGwoc3VjY2Vzcywgc3RyRHVtcCk7XG59XG5cbmZ1bmN0aW9uKiB0YXNrUmVsb2FkU3RhdGVFdmVudFNhZ2EgKHtwYXlsb2FkOiB7c3RhdGUsIHN1Y2Nlc3MsIGVycm9yfX0pIHtcbiAgICBjb25zdCB7dGFza1N0YXRlTG9hZGVkLCB0YXNrUmVmcmVzaH0gPSB5aWVsZCBzZWxlY3QoKHthY3Rpb25zfSkgPT4gYWN0aW9ucyk7XG4gICAgdHJ5IHtcbiAgICAgICAgaWYgKHN0YXRlKSB7XG4gICAgICAgICAgICB5aWVsZCBwdXQoe3R5cGU6IHRhc2tTdGF0ZUxvYWRlZCwgcGF5bG9hZDoge2R1bXA6IEpTT04ucGFyc2Uoc3RhdGUpfX0pO1xuICAgICAgICAgICAgeWllbGQgcHV0KHt0eXBlOiB0YXNrUmVmcmVzaH0pO1xuICAgICAgICB9XG4gICAgICAgIHlpZWxkIGNhbGwoc3VjY2Vzcyk7XG4gICAgfSBjYXRjaCAoZXgpIHtcbiAgICAgICAgeWllbGQgY2FsbChlcnJvciwgYGJhZCBzdGF0ZTogJHtleC5tZXNzYWdlfWApO1xuICAgIH1cbn1cblxuZnVuY3Rpb24qIHRhc2tMb2FkRXZlbnRTYWdhICh7cGF5bG9hZDoge3ZpZXdzOiBfdmlld3MsIHN1Y2Nlc3MsIGVycm9yfX0pIHtcbiAgICBjb25zdCB7dGFza0RhdGFMb2FkZWQsIHRhc2tJbml0fSA9IHlpZWxkIHNlbGVjdCgoe2FjdGlvbnN9KSA9PiBhY3Rpb25zKTtcbiAgICAvKiBUT0RPOiBkbyBzb21ldGhpbmcgd2l0aCB2aWV3cyAqL1xuICAgIHRyeSB7XG4gICAgICAgIGNvbnN0IHt0YXNrVG9rZW4sIHNlcnZlckFwaX0gPSB5aWVsZCBzZWxlY3Qoc3RhdGUgPT4gc3RhdGUpO1xuICAgICAgICBjb25zdCB0YXNrRGF0YSA9IHlpZWxkIGNhbGwoc2VydmVyQXBpLCAndGFza3MnLCAndGFza0RhdGEnLCB7dGFzazogdGFza1Rva2VufSk7XG4gICAgICAgIHlpZWxkIHB1dCh7dHlwZTogdGFza0RhdGFMb2FkZWQsIHBheWxvYWQ6IHt0YXNrRGF0YX19KTtcbiAgICAgICAgeWllbGQgcHV0KHt0eXBlOiB0YXNrSW5pdH0pO1xuICAgICAgICB5aWVsZCBjYWxsKHN1Y2Nlc3MpO1xuICAgIH0gY2F0Y2ggKGV4KSB7XG4gICAgICAgIHlpZWxkIGNhbGwoZXJyb3IsIGV4LnRvU3RyaW5nKCkpO1xuICAgIH1cbn1cblxuZnVuY3Rpb24qIHRhc2tHcmFkZUFuc3dlckV2ZW50U2FnYSAoe3BheWxvYWQ6IHthbnN3ZXIsIGFuc3dlclRva2VuLCBzdWNjZXNzLCBlcnJvcn19KSB7XG4gICAgY29uc3Qge3Rhc2tBbnN3ZXJHcmFkZWR9ID0geWllbGQgc2VsZWN0KCh7YWN0aW9uc30pID0+IGFjdGlvbnMpO1xuICAgIGxldCByZXN1bHQ7XG4gICAgdHJ5IHtcbiAgICAgICAgY29uc3Qge3Rhc2tUb2tlbiwgcGxhdGZvcm1BcGk6IHtnZXRUYXNrUGFyYW1zfSwgc2VydmVyQXBpfSA9IHlpZWxkIHNlbGVjdChzdGF0ZSA9PiBzdGF0ZSk7XG4gICAgICAgIGNvbnN0IHttaW5TY29yZSwgbWF4U2NvcmUsIG5vU2NvcmV9ID0geWllbGQgY2FsbChnZXRUYXNrUGFyYW1zLCBudWxsLCBudWxsKTtcbiAgICAgICAgY29uc3Qge3Njb3JlLCBtZXNzYWdlLCB0b2tlbjogc2NvcmVUb2tlbn0gPSB5aWVsZCBjYWxsKHNlcnZlckFwaSwgJ3Rhc2tzJywgJ2dyYWRlQW5zd2VyJywge1xuICAgICAgICAgICAgdGFzazogdGFza1Rva2VuLCAvKiBYWFggdGFzayBzaG91bGQgYmUgbmFtZWQgdGFza1Rva2VuICovXG4gICAgICAgICAgICBhbnN3ZXI6IGFuc3dlclRva2VuLCAgLyogWFhYIGFuc3dlciBzaG91bGQgYmUgbmFtZWQgYW5zd2VyVG9rZW4gKi9cbiAgICAgICAgICAgIG1pbl9zY29yZTogbWluU2NvcmUsIC8qIFhYWCBubyByZWFsIHBvaW50IHBhc3NpbmcgbWluX3Njb3JlLCBtYXhfc2NvcmUsIG5vX3Njb3JlIHRvIHNlcnZlci1zaWRlIGdyYWRlciAqL1xuICAgICAgICAgICAgbWF4X3Njb3JlOiBtYXhTY29yZSxcbiAgICAgICAgICAgIG5vX3Njb3JlOiBub1Njb3JlXG4gICAgICAgIH0pO1xuICAgICAgICB5aWVsZCBwdXQoe3R5cGU6IHRhc2tBbnN3ZXJHcmFkZWQsIHBheWxvYWQ6IHtncmFkaW5nOiB7c2NvcmUsIG1lc3NhZ2V9fX0pO1xuICAgICAgICB5aWVsZCBjYWxsKHN1Y2Nlc3MsIHNjb3JlLCBtZXNzYWdlLCBzY29yZVRva2VuKTtcbiAgICB9IGNhdGNoIChleCkge1xuICAgICAgICB5aWVsZCBwdXQoe3R5cGU6IHRhc2tBbnN3ZXJHcmFkZWQsIHBheWxvYWQ6IHtncmFkaW5nOiB7ZXJyb3I6IGV4LnRvU3RyaW5nKCl9fX0pO1xuICAgICAgICB5aWVsZCBjYWxsKGVycm9yLCBleC50b1N0cmluZygpKTtcbiAgICB9XG59XG5cbmZ1bmN0aW9uIHRhc2tBbnN3ZXJHcmFkZWRSZWR1Y2VyIChzdGF0ZSwge3BheWxvYWQ6IHtncmFkaW5nfX0pIHtcbiAgICByZXR1cm4gey4uLnN0YXRlLCBncmFkaW5nfTtcbn1cblxuZXhwb3J0IGRlZmF1bHQge1xuICAgIGFjdGlvbnM6IHtcbiAgICAgICAgdGFza0luaXQ6ICdUYXNrLkluaXQnLFxuICAgICAgICB0YXNrUmVmcmVzaDogJ1Rhc2suUmVmcmVzaCcsXG4gICAgICAgIHRhc2tMb2FkRXZlbnQ6ICdUYXNrLkV2ZW50LkxvYWQnIC8qIHt2aWV3cywgc3VjY2VzcywgZXJyb3J9ICovLFxuICAgICAgICB0YXNrVW5sb2FkRXZlbnQ6ICdUYXNrLkV2ZW50LlVubG9hZCcgLyoge3N1Y2Nlc3MsIGVycm9yfSAqLyxcbiAgICAgICAgdGFza1VwZGF0ZVRva2VuRXZlbnQ6ICdUYXNrLkV2ZW50LlVwZGF0ZVRva2VuJyAvKiB7dG9rZW4sIHN1Y2Nlc3MsIGVycm9yfSAqLyxcbiAgICAgICAgdGFza0dldEhlaWdodEV2ZW50OiAnVGFzay5FdmVudC5HZXRIZWlnaHQnIC8qIHtzdWNjZXNzLCBlcnJvcn0gKi8sXG4gICAgICAgIHRhc2tHZXRNZXRhRGF0YUV2ZW50OiAnVGFzay5FdmVudC5HZXRNZXRhRGF0YScgLyoge3N1Y2Nlc3MsIGVycm9yfSAqLyxcbiAgICAgICAgdGFza0dldFZpZXdzRXZlbnQ6ICdUYXNrLkV2ZW50LkdldFZpZXdzJyAvKiB7c3VjY2VzcywgZXJyb3J9ICovLFxuICAgICAgICB0YXNrU2hvd1ZpZXdzRXZlbnQ6ICdUYXNrLkV2ZW50LlNob3dWaWV3cycgLyoge3ZpZXdzLCBzdWNjZXNzLCBlcnJvcn0gKi8sXG4gICAgICAgIHRhc2tHZXRTdGF0ZUV2ZW50OiAnVGFzay5FdmVudC5HZXRTdGF0ZScgLyoge3N1Y2Nlc3MsIGVycm9yfSAqLyxcbiAgICAgICAgdGFza1JlbG9hZFN0YXRlRXZlbnQ6ICdUYXNrLkV2ZW50LlJlbG9hZFN0YXRlJyAvKiB7c3RhdGUsIHN1Y2Nlc3MsIGVycm9yfSAqLyxcbiAgICAgICAgdGFza0dldEFuc3dlckV2ZW50OiAnVGFzay5FdmVudC5HZXRBbnN3ZXInIC8qIHtzdWNjZXNzLCBlcnJvcn0gKi8sXG4gICAgICAgIHRhc2tSZWxvYWRBbnN3ZXJFdmVudDogJ1Rhc2suRXZlbnQuUmVsb2FkQW5zd2VyJyAvKiB7YW5zd2VyLCBzdWNjZXNzLCBlcnJvcn0gKi8sXG4gICAgICAgIHRhc2tHcmFkZUFuc3dlckV2ZW50OiAnVGFzay5FdmVudC5HcmFkZUFuc3dlcicgLyoge2Fuc3dlciwgYW5zd2VyVG9rZW4sIHN1Y2Nlc3MsIGVycm9yfSAqLyxcbiAgICAgICAgdGFza0RhdGFMb2FkZWQ6ICdUYXNrLkRhdGEuTG9hZGVkJyxcbiAgICAgICAgdGFza1N0YXRlTG9hZGVkOiAnVGFzay5TdGF0ZS5Mb2FkZWQnLFxuICAgICAgICB0YXNrQW5zd2VyTG9hZGVkOiAnVGFzay5BbnN3ZXIuTG9hZGVkJyxcbiAgICAgICAgdGFza0Fuc3dlckdyYWRlZDogJ1Rhc2suQW5zd2VyLkdyYWRlZCcsXG4gICAgfSxcbiAgICBhY3Rpb25SZWR1Y2Vyczoge1xuICAgICAgICBhcHBJbml0OiBhcHBJbml0UmVkdWNlcixcbiAgICAgICAgdGFza1Nob3dWaWV3c0V2ZW50OiB0YXNrU2hvd1ZpZXdzRXZlbnRSZWR1Y2VyLFxuICAgICAgICB0YXNrVXBkYXRlVG9rZW5FdmVudDogdGFza1VwZGF0ZVRva2VuRXZlbnRSZWR1Y2VyLFxuICAgICAgICB0YXNrRGF0YUxvYWRlZDogdGFza0RhdGFMb2FkZWRSZWR1Y2VyLFxuICAgICAgICB0YXNrU3RhdGVMb2FkZWQ6IHRhc2tTdGF0ZUxvYWRlZFJlZHVjZXIsXG4gICAgICAgIHRhc2tBbnN3ZXJMb2FkZWQ6IHRhc2tBbnN3ZXJMb2FkZWRSZWR1Y2VyLFxuICAgICAgICB0YXNrQW5zd2VyR3JhZGVkOiB0YXNrQW5zd2VyR3JhZGVkUmVkdWNlcixcbiAgICB9LFxuICAgIHNhZ2E6IGZ1bmN0aW9uKiAoKSB7XG4gICAgICAgIGNvbnN0IGFjdGlvbnMgPSB5aWVsZCBzZWxlY3QoKHthY3Rpb25zfSkgPT4gYWN0aW9ucyk7XG4gICAgICAgIHlpZWxkIHRha2VFdmVyeShhY3Rpb25zLnRhc2tTaG93Vmlld3NFdmVudCwgdGFza1Nob3dWaWV3c0V2ZW50U2FnYSk7XG4gICAgICAgIHlpZWxkIHRha2VFdmVyeShhY3Rpb25zLnRhc2tHZXRWaWV3c0V2ZW50LCB0YXNrR2V0Vmlld3NFdmVudFNhZ2EpO1xuICAgICAgICB5aWVsZCB0YWtlRXZlcnkoYWN0aW9ucy50YXNrVXBkYXRlVG9rZW5FdmVudCwgdGFza1VwZGF0ZVRva2VuRXZlbnRTYWdhKTtcbiAgICAgICAgeWllbGQgdGFrZUV2ZXJ5KGFjdGlvbnMudGFza0dldEhlaWdodEV2ZW50LCB0YXNrR2V0SGVpZ2h0RXZlbnRTYWdhKTtcbiAgICAgICAgeWllbGQgdGFrZUV2ZXJ5KGFjdGlvbnMudGFza1VubG9hZEV2ZW50LCB0YXNrVW5sb2FkRXZlbnRTYWdhKTtcbiAgICAgICAgeWllbGQgdGFrZUV2ZXJ5KGFjdGlvbnMudGFza0dldFN0YXRlRXZlbnQsIHRhc2tHZXRTdGF0ZUV2ZW50U2FnYSk7XG4gICAgICAgIHlpZWxkIHRha2VFdmVyeShhY3Rpb25zLnRhc2tHZXRNZXRhRGF0YUV2ZW50LCB0YXNrR2V0TWV0YURhdGFFdmVudFNhZ2EpO1xuICAgICAgICB5aWVsZCB0YWtlRXZlcnkoYWN0aW9ucy50YXNrUmVsb2FkQW5zd2VyRXZlbnQsIHRhc2tSZWxvYWRBbnN3ZXJFdmVudFNhZ2EpO1xuICAgICAgICB5aWVsZCB0YWtlRXZlcnkoYWN0aW9ucy50YXNrUmVsb2FkU3RhdGVFdmVudCwgdGFza1JlbG9hZFN0YXRlRXZlbnRTYWdhKTtcbiAgICAgICAgeWllbGQgdGFrZUV2ZXJ5KGFjdGlvbnMudGFza0dldEFuc3dlckV2ZW50LCB0YXNrR2V0QW5zd2VyRXZlbnRTYWdhKTtcbiAgICAgICAgeWllbGQgdGFrZUV2ZXJ5KGFjdGlvbnMudGFza0xvYWRFdmVudCwgdGFza0xvYWRFdmVudFNhZ2EpO1xuICAgICAgICB5aWVsZCB0YWtlRXZlcnkoYWN0aW9ucy50YXNrR3JhZGVBbnN3ZXJFdmVudCwgdGFza0dyYWRlQW5zd2VyRXZlbnRTYWdhKTtcbiAgICB9XG59O1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL2FsZ29yZWFfcmVhY3RfdGFzay9wbGF0Zm9ybV9idW5kbGUuanMiLCJcbmltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQge0FsZXJ0fSBmcm9tICdyZWFjdC1ib290c3RyYXAnO1xuaW1wb3J0IHtjb25uZWN0fSBmcm9tICdyZWFjdC1yZWR1eCc7XG5pbXBvcnQge2NhbGwsIHB1dCwgc2VsZWN0LCB0YWtlRXZlcnl9IGZyb20gJ3JlZHV4LXNhZ2EvZWZmZWN0cyc7XG5pbXBvcnQgdXBkYXRlIGZyb20gJ2ltbXV0YWJpbGl0eS1oZWxwZXInO1xuXG5mdW5jdGlvbiBoaW50UmVxdWVzdEZ1bGZpbGxlZFJlZHVjZXIgKHN0YXRlLCBfYWN0aW9uKSB7XG4gICAgcmV0dXJuIHsuLi5zdGF0ZSwgaGludFJlcXVlc3Q6IHtzdWNjZXNzOiB0cnVlfX07XG59XG5cbmZ1bmN0aW9uIGhpbnRSZXF1ZXN0UmVqZWN0ZWRSZWR1Y2VyIChzdGF0ZSwge3BheWxvYWQ6IHtjb2RlLCBlcnJvcn19KSB7XG4gICAgcmV0dXJuIHsuLi5zdGF0ZSwgaGludFJlcXVlc3Q6IHtzdWNjZXNzOiBmYWxzZSwgY29kZSwgZXJyb3J9fTtcbn1cblxuZnVuY3Rpb24gaGludFJlcXVlc3RGZWVkYmFja0NsZWFyZWRSZWR1Y2VyIChzdGF0ZSwgX2FjdGlvbikge1xuICAgIHJldHVybiB7Li4uc3RhdGUsIGhpbnRSZXF1ZXN0OiBmYWxzZX07XG59XG5cbmZ1bmN0aW9uKiByZXF1ZXN0SGludFNhZ2EgKHtwYXlsb2FkOiB7cmVxdWVzdH19KSB7XG4gICAgY29uc3QgYWN0aW9ucyA9IHlpZWxkIHNlbGVjdCgoe2FjdGlvbnN9KSA9PiBhY3Rpb25zKTtcbiAgICBsZXQgY29kZSA9IDA7XG4gICAgdHJ5IHtcbiAgICAgICAgY29uc3Qge2FjdGlvbnMsIHRhc2tUb2tlbjogaW5pdGlhbFRhc2tUb2tlbiwgc2VydmVyQXBpfSA9IHlpZWxkIHNlbGVjdChzdGF0ZSA9PiBzdGF0ZSk7XG4gICAgICAgIGNvZGUgPSAxMDtcbiAgICAgICAgY29uc3Qge2Fza0hpbnR9ID0geWllbGQgc2VsZWN0KHN0YXRlID0+IHN0YXRlLnBsYXRmb3JtQXBpKTtcbiAgICAgICAgY29kZSA9IDIwO1xuICAgICAgICAvKiBDb250YWN0IHNlcnZlckFwaSB0byBvYnRhaW4gYSBoaW50VG9rZW4gZm9yIHRoZSByZXF1ZXN0ZWQgaGludC4gKi9cbiAgICAgICAgY29uc3Qge2hpbnRUb2tlbn0gPSB5aWVsZCBjYWxsKHNlcnZlckFwaSwgJ3Rhc2tzJywgJ3JlcXVlc3RIaW50Jywge3Rhc2s6IGluaXRpYWxUYXNrVG9rZW4sIHJlcXVlc3R9KTtcbiAgICAgICAgY29kZSA9IDMwO1xuICAgICAgICAvKiBDb250YWN0IHRoZSBwbGF0Zm9ybSB0byBhdXRob3JpemUgdGhlIGhpbnQgcmVxdWVzdC4gKi9cbiAgICAgICAgeWllbGQgY2FsbChhc2tIaW50LCBoaW50VG9rZW4pO1xuICAgICAgICBjb2RlID0gNDA7XG4gICAgICAgIC8qIFdoZW4gYXNrSGludCByZXR1cm5zIGFuIHVwZGF0ZWQgdGFza1Rva2VuIGlzIG9idGFpbmVkIGZyb20gdGhlIHN0b3JlLiAqL1xuICAgICAgICBjb25zdCB1cGRhdGVkVGFza1Rva2VuID0geWllbGQgc2VsZWN0KHN0YXRlID0+IHN0YXRlLnRhc2tUb2tlbik7XG4gICAgICAgIGNvZGUgPSA1MDtcbiAgICAgICAgLyogRmluYWxseSwgY29udGFjdCB0aGUgc2VydmVyQXBpIHRvIG9idGFpbiB0aGUgdXBkYXRlZCB0YXNrRGF0YS4gKi9cbiAgICAgICAgY29uc3QgdGFza0RhdGEgPSB5aWVsZCBjYWxsKHNlcnZlckFwaSwgJ3Rhc2tzJywgJ3Rhc2tEYXRhJywge3Rhc2s6IHVwZGF0ZWRUYXNrVG9rZW59KTtcbiAgICAgICAgY29kZSA9IDYwO1xuICAgICAgICB5aWVsZCBwdXQoe3R5cGU6IGFjdGlvbnMudGFza0RhdGFMb2FkZWQsIHBheWxvYWQ6IHt0YXNrRGF0YX19KTtcbiAgICAgICAgeWllbGQgcHV0KHt0eXBlOiBhY3Rpb25zLnRhc2tSZWZyZXNofSk7XG4gICAgICAgIHlpZWxkIHB1dCh7dHlwZTogYWN0aW9ucy5oaW50UmVxdWVzdEZ1bGZpbGxlZCwgcGF5bG9hZDoge319KTtcbiAgICB9IGNhdGNoIChleCkge1xuICAgICAgICB5aWVsZCBwdXQoe3R5cGU6IGFjdGlvbnMuaGludFJlcXVlc3RSZWplY3RlZCwgcGF5bG9hZDoge2NvZGU6IGNvZGUsIGVycm9yOiBleH19KTtcbiAgICB9XG59XG5cbmZ1bmN0aW9uIEhpbnRSZXF1ZXN0RmVlZGJhY2tTZWxlY3RvciAoc3RhdGUpIHtcbiAgICBjb25zdCB7YWN0aW9ucywgaGludFJlcXVlc3R9ID0gc3RhdGU7XG4gICAgaWYgKCFoaW50UmVxdWVzdCkgcmV0dXJuIHt9O1xuICAgIGNvbnN0IHtoaW50UmVxdWVzdEZlZWRiYWNrQ2xlYXJlZH0gPSBhY3Rpb25zO1xuICAgIGNvbnN0IHtzdWNjZXNzLCBjb2RlLCBlcnJvcn0gPSBoaW50UmVxdWVzdDtcbiAgICByZXR1cm4ge3Zpc2libGU6IHRydWUsIHN1Y2Nlc3MsIGNvZGUsIGVycm9yLCBoaW50UmVxdWVzdEZlZWRiYWNrQ2xlYXJlZH07XG59XG5cbmNsYXNzIEhpbnRSZXF1ZXN0RmVlZGJhY2sgZXh0ZW5kcyBSZWFjdC5QdXJlQ29tcG9uZW50IHtcbiAgICByZW5kZXIgKCkge1xuICAgICAgICBjb25zdCB7dmlzaWJsZSwgc3VjY2Vzc30gPSB0aGlzLnByb3BzO1xuICAgICAgICBpZiAoIXZpc2libGUpIHJldHVybiBmYWxzZTtcbiAgICAgICAgaWYgKHN1Y2Nlc3MpIHtcbiAgICAgICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICAgICAgPEFsZXJ0IGJzU3R5bGU9J3N1Y2Nlc3MnIG9uRGlzbWlzcz17dGhpcy5oYW5kbGVEaXNtaXNzfT5cbiAgICAgICAgICAgICAgICAgICAgPHA+e1wiTCdpbmRpY2UgZGVtYW5kw6kgYSDDqXTDqSBkw6lsaXZyw6kuXCJ9PC9wPlxuICAgICAgICAgICAgICAgIDwvQWxlcnQ+XG4gICAgICAgICAgICApO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgY29uc3Qge2NvZGUsIGVycm9yfSA9IHRoaXMucHJvcHM7XG4gICAgICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgICAgIDxBbGVydCBic1N0eWxlPSdkYW5nZXInIG9uRGlzbWlzcz17dGhpcy5oYW5kbGVEaXNtaXNzfT5cbiAgICAgICAgICAgICAgICAgICAgPHA+e1wiTCdpbmRpY2UgZGVtYW5kw6kgbidhIHBhcyBwdSDDqnRyZSBkw6lsaXZyw6kuXCJ9PC9wPlxuICAgICAgICAgICAgICAgICAgICA8cD57XCJDb2RlIFwifXtjb2RlfTwvcD5cbiAgICAgICAgICAgICAgICAgICAge2Vycm9yLnN0YXR1cyAmJiA8cD57XCJFcnJldXIgc2VydmV1ciBcIn17ZXJyb3Iuc3RhdHVzfTwvcD59XG4gICAgICAgICAgICAgICAgICAgIHtlcnJvci5tZXNzYWdlICYmIDxwPntlcnJvci50b1N0cmluZygpfTwvcD59XG4gICAgICAgICAgICAgICAgPC9BbGVydD5cbiAgICAgICAgICAgICk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgaGFuZGxlRGlzbWlzcyA9ICgpID0+IHtcbiAgICAgICAgdGhpcy5wcm9wcy5kaXNwYXRjaCh7dHlwZTogdGhpcy5wcm9wcy5oaW50UmVxdWVzdEZlZWRiYWNrQ2xlYXJlZCwgcGF5bG9hZDoge319KTtcbiAgICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IHtcbiAgICBhY3Rpb25zOiB7XG4gICAgICAgIHJlcXVlc3RIaW50OiAnSGludC5SZXF1ZXN0JyxcbiAgICAgICAgaGludFJlcXVlc3RGdWxmaWxsZWQ6ICdIaW50LlJlcXVlc3QuRnVsZmlsbGVkJyxcbiAgICAgICAgaGludFJlcXVlc3RSZWplY3RlZDogJ0hpbnQuUmVxdWVzdC5SZWplY3RlZCcsXG4gICAgICAgIGhpbnRSZXF1ZXN0RmVlZGJhY2tDbGVhcmVkOiAnSGludC5SZXF1ZXN0LkZlZWRiYWNrQ2xlYXJlZCcsXG4gICAgfSxcbiAgICBhY3Rpb25SZWR1Y2Vyczoge1xuICAgICAgICBoaW50UmVxdWVzdEZ1bGZpbGxlZDogaGludFJlcXVlc3RGdWxmaWxsZWRSZWR1Y2VyLFxuICAgICAgICBoaW50UmVxdWVzdFJlamVjdGVkOiBoaW50UmVxdWVzdFJlamVjdGVkUmVkdWNlcixcbiAgICAgICAgaGludFJlcXVlc3RGZWVkYmFja0NsZWFyZWQ6IGhpbnRSZXF1ZXN0RmVlZGJhY2tDbGVhcmVkUmVkdWNlcixcbiAgICB9LFxuICAgIHZpZXdzOiB7XG4gICAgICAgIEhpbnRSZXF1ZXN0RmVlZGJhY2s6IGNvbm5lY3QoSGludFJlcXVlc3RGZWVkYmFja1NlbGVjdG9yKShIaW50UmVxdWVzdEZlZWRiYWNrKVxuICAgIH0sXG4gICAgc2FnYTogZnVuY3Rpb24qIGhpbnRzU2FnYSAoKSB7XG4gICAgICAgIGNvbnN0IGFjdGlvbnMgPSB5aWVsZCBzZWxlY3QoKHthY3Rpb25zfSkgPT4gYWN0aW9ucyk7XG4gICAgICAgIHlpZWxkIHRha2VFdmVyeShhY3Rpb25zLnJlcXVlc3RIaW50LCByZXF1ZXN0SGludFNhZ2EpO1xuICAgIH1cbn07XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvYWxnb3JlYV9yZWFjdF90YXNrL2hpbnRzX2J1bmRsZS5qcyIsIlxuaW1wb3J0IHtjYWxsLCB0YWtlfSBmcm9tICdyZWR1eC1zYWdhL2VmZmVjdHMnO1xuaW1wb3J0IHtidWZmZXJzLCBldmVudENoYW5uZWx9IGZyb20gJ3JlZHV4LXNhZ2EnO1xuXG5leHBvcnQgZnVuY3Rpb24qIHdpbmRvd0hlaWdodE1vbml0b3JTYWdhIChwbGF0Zm9ybUFwaSkge1xuICAgIGNvbnN0IGNoYW5uZWwgPSBldmVudENoYW5uZWwoZW1pdCA9PiB7XG4gICAgICAgIGZ1bmN0aW9uIG9uUmVzaXplICgpIHtcbiAgICAgICAgICAgIGNvbnN0IGhlaWdodCA9IHdpbmRvdy5kb2N1bWVudC5ib2R5LmNsaWVudEhlaWdodDtcbiAgICAgICAgICAgIGVtaXQoe2hlaWdodH0pO1xuICAgICAgICB9XG4gICAgICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdyZXNpemUnLCBvblJlc2l6ZSk7XG4gICAgICAgIHJldHVybiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICB3aW5kb3cucmVtb3ZlRXZlbnRMaXN0ZW5lcigncmVzaXplJywgb25SZXNpemUpO1xuICAgICAgICB9O1xuICAgIH0sIGJ1ZmZlcnMuc2xpZGluZygxKSk7XG4gICAgdHJ5IHtcbiAgICAgICAgbGV0IGxhc3RIZWlnaHQ7XG4gICAgICAgIHdoaWxlICh0cnVlKSB7XG4gICAgICAgICAgICBjb25zdCB7aGVpZ2h0fSA9IHlpZWxkIHRha2UoY2hhbm5lbCk7XG4gICAgICAgICAgICBpZiAoaGVpZ2h0ICE9PSBsYXN0SGVpZ2h0KSB7XG4gICAgICAgICAgICAgICAgeWllbGQgY2FsbChwbGF0Zm9ybUFwaS51cGRhdGVEaXNwbGF5LCB7aGVpZ2h0fSk7XG4gICAgICAgICAgICAgICAgbGFzdEhlaWdodCA9IGhlaWdodDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH0gZmluYWxseSB7XG4gICAgICAgIGNoYW5uZWwuY2xvc2UoKTtcbiAgICB9XG59XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvYWxnb3JlYV9yZWFjdF90YXNrL3dpbmRvd19oZWlnaHRfbW9uaXRvci5qcyIsIi8vIHN0eWxlLWxvYWRlcjogQWRkcyBzb21lIGNzcyB0byB0aGUgRE9NIGJ5IGFkZGluZyBhIDxzdHlsZT4gdGFnXG5cbi8vIGxvYWQgdGhlIHN0eWxlc1xudmFyIGNvbnRlbnQgPSByZXF1aXJlKFwiISEuLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9pbmRleC5qcz8/cmVmLS0xLTEhLi9zdHlsZS5jc3NcIik7XG5pZih0eXBlb2YgY29udGVudCA9PT0gJ3N0cmluZycpIGNvbnRlbnQgPSBbW21vZHVsZS5pZCwgY29udGVudCwgJyddXTtcbi8vIFByZXBhcmUgY3NzVHJhbnNmb3JtYXRpb25cbnZhciB0cmFuc2Zvcm07XG5cbnZhciBvcHRpb25zID0ge1wic291cmNlTWFwXCI6dHJ1ZSxcImhtclwiOnRydWV9XG5vcHRpb25zLnRyYW5zZm9ybSA9IHRyYW5zZm9ybVxuLy8gYWRkIHRoZSBzdHlsZXMgdG8gdGhlIERPTVxudmFyIHVwZGF0ZSA9IHJlcXVpcmUoXCIhLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9saWIvYWRkU3R5bGVzLmpzXCIpKGNvbnRlbnQsIG9wdGlvbnMpO1xuaWYoY29udGVudC5sb2NhbHMpIG1vZHVsZS5leHBvcnRzID0gY29udGVudC5sb2NhbHM7XG4vLyBIb3QgTW9kdWxlIFJlcGxhY2VtZW50XG5pZihtb2R1bGUuaG90KSB7XG5cdC8vIFdoZW4gdGhlIHN0eWxlcyBjaGFuZ2UsIHVwZGF0ZSB0aGUgPHN0eWxlPiB0YWdzXG5cdGlmKCFjb250ZW50LmxvY2Fscykge1xuXHRcdG1vZHVsZS5ob3QuYWNjZXB0KFwiISEuLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9pbmRleC5qcz8/cmVmLS0xLTEhLi9zdHlsZS5jc3NcIiwgZnVuY3Rpb24oKSB7XG5cdFx0XHR2YXIgbmV3Q29udGVudCA9IHJlcXVpcmUoXCIhIS4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2luZGV4LmpzPz9yZWYtLTEtMSEuL3N0eWxlLmNzc1wiKTtcblx0XHRcdGlmKHR5cGVvZiBuZXdDb250ZW50ID09PSAnc3RyaW5nJykgbmV3Q29udGVudCA9IFtbbW9kdWxlLmlkLCBuZXdDb250ZW50LCAnJ11dO1xuXHRcdFx0dXBkYXRlKG5ld0NvbnRlbnQpO1xuXHRcdH0pO1xuXHR9XG5cdC8vIFdoZW4gdGhlIG1vZHVsZSBpcyBkaXNwb3NlZCwgcmVtb3ZlIHRoZSA8c3R5bGU+IHRhZ3Ncblx0bW9kdWxlLmhvdC5kaXNwb3NlKGZ1bmN0aW9uKCkgeyB1cGRhdGUoKTsgfSk7XG59XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9zcmMvc3R5bGUuY3NzXG4vLyBtb2R1bGUgaWQgPSA1NjZcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiZXhwb3J0cyA9IG1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcIi4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2xpYi9jc3MtYmFzZS5qc1wiKShmYWxzZSk7XG4vLyBpbXBvcnRzXG5cblxuLy8gbW9kdWxlXG5leHBvcnRzLnB1c2goW21vZHVsZS5pZCwgXCIjY29udGFpbmVyIHtcXG4gICAgdXNlci1zZWxlY3Q6IG5vbmU7XFxuICAgIC1tb3otdXNlci1zZWxlY3Q6IG5vbmU7XFxuICAgIC13ZWJraXQtdXNlci1zZWxlY3Q6IG5vbmU7XFxuICAgIC1tcy11c2VyLXNlbGVjdDogbm9uZTtcXG5cXHR3aWR0aDogODAwcHg7XFxufVxcbi50YXNrSW5zdHJ1Y3Rpb25zIHtcXG4gICAgdGV4dC1hbGlnbjoganVzdGlmeTtcXG59XFxuLnRhc2tJbnN0cnVjdGlvbnMgdGFibGUucHJlIHtcXG4gICAgbWFyZ2luOiAxMHB4IGF1dG87XFxufVxcbi50YXNrSW5zdHJ1Y3Rpb25zIHRhYmxlLnByZSB0ZCB7XFxuICAgIHBhZGRpbmc6IDRweCAxMHB4O1xcbn1cXG4udGFza0luc3RydWN0aW9ucyAubGlzdC11bnN0eWxlZCB7XFxuICAgIHBhZGRpbmctbGVmdDogMzBweDtcXG59XFxuLnRleHQtYm9sZCB7XFxuICAgIGZvbnQtd2VpZ2h0OiBib2xkO1xcbn1cXG4udGFza1dyYXBwZXIgLnRhc2tJbnN0cnVjdGlvbnMge1xcbiAgICBwYWRkaW5nLXRvcDogMzBweDtcXG4gICAgcG9zaXRpb246IHJlbGF0aXZlO1xcbn1cXG4udG9wUGxhaW5Xb3JkQ29udGFpbmVyIHtcXG4gICAgbWFyZ2luOiAxMHB4IDIwcHg7XFxuICAgIGhlaWdodDogMzRweDtcXG59XFxuLnRvcFBsYWluV29yZCB7XFxuICAgIGZvbnQtZmFtaWx5OiBMdWNpZGEgQ29uc29sZSxNb25hY28sbW9ub3NwYWNlO1xcbiAgICBmb250LXNpemU6IDE4cHg7XFxuICAgIGRpc3BsYXk6IGlubGluZS1ibG9jaztcXG4gICAgbWFyZ2luLXJpZ2h0OiAyMHB4O1xcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjZmZmO1xcbiAgICBib3JkZXI6IDFweCBzb2xpZCAjNzc3O1xcbiAgICBib3gtc2hhZG93OiAzcHggMnB4IDNweCAjY2NjO1xcbiAgICBsaW5lLWhlaWdodDogMjdweDtcXG4gICAgbGV0dGVyLXNwYWNpbmc6IDEwcHg7XFxuICAgIHBhZGRpbmctbGVmdDogNXB4O1xcbn1cXG4uaGludHNEaWFsb2cge1xcbiAgd2lkdGg6IDUwJTtcXG4gIG1heC13aWR0aDogNDAwcHg7XFxuICBiYWNrZ3JvdW5kOiAjZjBmMGYwO1xcbiAgYm9yZGVyOiAxcHggc29saWQgYmxhY2s7XFxuICBib3JkZXItcmFkaXVzOiAzcHg7XFxuICBwYWRkaW5nOiA1cHg7XFxuICBwb3NpdGlvbjogYWJzb2x1dGU7XFxuICBib3R0b206IDE1cHg7XFxuICByaWdodDogMTVweDtcXG4gIHotaW5kZXg6IDE7XFxufVxcbi5oaW50c0RpYWxvZyBwIHtcXG4gICAgbWFyZ2luLWJvdHRvbTogNXB4O1xcbn1cXG4uaGludHNEaWFsb2cgYnV0dG9uICsgYnV0dG9uIHtcXG4gICAgbWFyZ2luLWxlZnQ6IDEwcHg7XFxufVxcbi5rZXlUYWJsZSB7XFxuICAgIG1hcmdpbi10b3A6IDEwcHg7XFxufVxcbi5rZXlUYWJsZSBzcGFuIHtcXG4gICAgd2lkdGg6IDIwcHg7XFxuICAgIGRpc3BsYXk6IGlubGluZS1ibG9jaztcXG4gICAgbWFyZ2luLXJpZ2h0OiAycHg7XFxuICAgIHRleHQtYWxpZ246IGNlbnRlcjtcXG59XFxuLmtleVRhYmxlIHNwYW4gYnV0dG9uIHtcXG4gICAgcGFkZGluZzogMDtcXG4gICAgd2lkdGg6IDEwMCU7XFxuICAgIGJvcmRlcjogbm9uZTtcXG59XFxuLmtleVRhYmxlIC5rZXlWYWx1ZSB7XFxuICAgIGJvcmRlcjogMXB4IHNvbGlkICNjY2M7XFxuICAgIGJvcmRlci1yYWRpdXM6IDRweDtcXG4gICAgY3Vyc29yOiBwb2ludGVyO1xcbn1cXG4ua2V5VGFibGUgLmtleVZhbHVlLmlzLWhpbnQge1xcbiAgICBib3JkZXI6IG5vbmU7XFxuICAgIGN1cnNvcjogZGVmYXVsdDtcXG4gICAgZm9udC13ZWlnaHQ6IGJvbGQ7XFxufVxcbi5rZXlUYWJsZSAua2V5VmFsdWUuaXMtaGludC1yZXF1ZXN0IHtcXG4gICAgYmFja2dyb3VuZDogIzAwMDtcXG4gICAgY29sb3I6ICNmZmY7XFxuICAgIGZvbnQtd2VpZ2h0OiBib2xkO1xcbn1cXG4uaXMtaGludC1taXNtYXRjaCB7XFxuICAgIGJhY2tncm91bmQtY29sb3I6ICNmZjQ0NDQgIWltcG9ydGFudDtcXG59XFxuXFxuLmNpcGhlcnNBbmRQbGFpbnMge1xcbiAgICBmb250LWZhbWlseTogTHVjaWRhIENvbnNvbGUsTW9uYWNvLG1vbm9zcGFjZTtcXG4gICAgZm9udC1zaXplOiAxOHB4O1xcbn1cXG4uY2lwaGVyVGFibGUge1xcbiAgICBtYXJnaW4tdG9wOiAyMHB4O1xcbn1cXG4ucGxhaW5UYWJsZSB7XFxuICAgIGJhY2tncm91bmQ6ICNlZmVmZWY7XFxufVxcbi5jaXBoZXJzQW5kUGxhaW5zIHNwYW4ge1xcbiAgICB3aWR0aDogMjBweDtcXG4gICAgZGlzcGxheTogaW5saW5lLWJsb2NrO1xcbiAgICBtYXJnaW4tcmlnaHQ6IDJweDtcXG4gICAgdGV4dC1hbGlnbjogY2VudGVyO1xcbiAgICBib3JkZXI6IDFweCBzb2xpZCAjY2NjO1xcbiAgICBoZWlnaHQ6IDI3cHg7XFxuICAgIHZlcnRpY2FsLWFsaWduOiBib3R0b207XFxufVxcbi5jaXBoZXJUYWJsZSBzcGFuIHtib3JkZXItYm90dG9tOiBub25lO31cXG4ucGxhaW5UYWJsZSBzcGFuIHtib3JkZXItdG9wOiBub25lO31cXG4ucGxhaW5UYWJsZSAucGxhaW5DaGFyIHtcXG4gICAgYmFja2dyb3VuZC1jb2xvcjogI2ZmZjtcXG4gICAgYm94LXNoYWRvdzogM3B4IDJweCAzcHggI2NjYztcXG4gICAgYm9yZGVyLXRvcDogMXB4IHNvbGlkO1xcbiAgICBib3JkZXItY29sb3I6ICM3Nzc7XFxuICAgIGJhY2tncm91bmQtY2xpcDogY29udGVudC1ib3g7XFxufVxcbi5wbGFpbkNoYXIgKyAucGxhaW5DaGFyIHtcXG4gICAgbWFyZ2luLWxlZnQ6IC00cHg7XFxuICAgIGJvcmRlci1sZWZ0LWNvbG9yOiB0cmFuc3BhcmVudDtcXG4gICAgd2lkdGg6IDI0cHg7XFxufVxcbi5pbnB1dEVycm9yIHtcXG4gICAgYm9yZGVyLWNvbG9yOiByZWQ7XFxuICAgIGJveC1zaGFkb3c6IDAgMCAzcHggcmVkIGluc2V0O1xcbn1cXG4uc2VsZWN0VGV4dCB7XFxuICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcXG4gICAgY3Vyc29yOiBwb2ludGVyO1xcbn1cXG4uc2VsZWN0VGV4dElubmVyIHtcXG4gICAgYmFja2dyb3VuZC1jb2xvcjogI2ZmZjtcXG4gICAgYm9yZGVyOiAxcHggc29saWQgI2FjYWNhYztcXG59XFxuLnNlbGVjdFRleHQuc2VsZWN0ZWQgLnNlbGVjdFRleHRJbm5lciB7XFxuICAgIGJhY2tncm91bmQtY29sb3I6ICNjY2M7XFxufVxcbi5zZWxlY3RUZXh0SW5uZXIgPiBzcGFuIHtcXG4gICAgcG9zaXRpb246IGFic29sdXRlO1xcbiAgICB0ZXh0LWFsaWduOiBjZW50ZXI7XFxufVxcbi5zZWxlY3RUZXh0LXJvd3MgLnNlbGVjdFRleHRJbm5lciA+IHNwYW4ge1xcbiAgICB0b3A6IC0xcHg7XFxufVxcbi5zZWxlY3RUZXh0LWNvbHVtbnMgLnNlbGVjdFRleHRJbm5lciA+IHNwYW4ge1xcbiAgICBsZWZ0OiAtMXB4O1xcbn1cXG4udGFza0hlYWRlciB7XFxuXFxufVxcbi5zdWJtaXRCbG9jaywgLnNjb3JlQmxvY2ssIC5mZWVkYmFja0Jsb2NrLCAuc2F2ZUJsb2NrIHtcXG4gICAgZGlzcGxheTogaW5saW5lLWJsb2NrO1xcbiAgICBsaW5lLWhlaWdodDogMzRweDtcXG4gICAgbWFyZ2luOiAwIDEwcHggMCAwO1xcbn1cXG4udGFza0hlYWRlciA+ICo6bGFzdC1jaGlsZCB7XFxuICAgIG1hcmdpbjogMDtcXG59XFxuLnNjb3JlQmxvY2ssIC5mZWVkYmFja0Jsb2NrIHtcXG4gICAgYmFja2dyb3VuZDogI2Y4ZjhmODtcXG4gICAgcGFkZGluZzogMCA4cHg7XFxufVxcbi5mZWVkYmFja0Jsb2NrIHtcXG4gICAgY3Vyc29yOiBwb2ludGVyO1xcbn1cXG5cIiwgXCJcIl0pO1xuXG4vLyBleHBvcnRzXG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyPz9yZWYtLTEtMSEuL3NyYy9zdHlsZS5jc3Ncbi8vIG1vZHVsZSBpZCA9IDU2N1xuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJcbmltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQge2Nvbm5lY3R9IGZyb20gJ3JlYWN0LXJlZHV4JztcblxuaW1wb3J0IHt1cGRhdGVHcmlkR2VvbWV0cnksIHVwZGF0ZUdyaWRWaXNpYmxlUm93c30gZnJvbSAnLi91dGlscyc7XG5cbmZ1bmN0aW9uIGFwcEluaXRSZWR1Y2VyIChzdGF0ZSwgX2FjdGlvbikge1xuICByZXR1cm4gey4uLnN0YXRlLCBjaXBoZXJlZFRleHQ6IHtcbiAgICBjZWxsV2lkdGg6IDE1LFxuICAgIGNlbGxIZWlnaHQ6IDE4LFxuICAgIHNjcm9sbFRvcDogMCxcbiAgICBuYkNlbGxzOiAwXG4gIH19O1xufVxuXG5mdW5jdGlvbiB0YXNrSW5pdFJlZHVjZXIgKHN0YXRlLCBfYWN0aW9uKSB7XG4gIGxldCB7Y2lwaGVyZWRUZXh0LCB0YXNrRGF0YToge2NpcGhlclRleHR9fSA9IHN0YXRlO1xuICBjaXBoZXJlZFRleHQgPSB7Li4uY2lwaGVyZWRUZXh0LCBjZWxsczogY2lwaGVyVGV4dCwgbmJDZWxsczogY2lwaGVyVGV4dC5sZW5ndGh9O1xuICBjaXBoZXJlZFRleHQgPSB1cGRhdGVHcmlkVmlzaWJsZVJvd3MoY2lwaGVyZWRUZXh0KTtcbiAgcmV0dXJuIHsuLi5zdGF0ZSwgY2lwaGVyZWRUZXh0fTtcbn1cblxuZnVuY3Rpb24gY2lwaGVyZWRUZXh0UmVzaXplZFJlZHVjZXIgKHN0YXRlLCB7cGF5bG9hZDoge3dpZHRofX0pIHtcbiAgbGV0IHtjaXBoZXJlZFRleHR9ID0gc3RhdGU7XG4gIGNpcGhlcmVkVGV4dCA9IHsuLi5jaXBoZXJlZFRleHQsIHdpZHRoLCBoZWlnaHQ6IDggKiBjaXBoZXJlZFRleHQuY2VsbEhlaWdodH07XG4gIGNpcGhlcmVkVGV4dCA9IHVwZGF0ZUdyaWRHZW9tZXRyeShjaXBoZXJlZFRleHQpO1xuICBjaXBoZXJlZFRleHQgPSB1cGRhdGVHcmlkVmlzaWJsZVJvd3MoY2lwaGVyZWRUZXh0KTtcbiAgcmV0dXJuIHsuLi5zdGF0ZSwgY2lwaGVyZWRUZXh0fTtcbn1cblxuZnVuY3Rpb24gY2lwaGVyZWRUZXh0U2Nyb2xsZWRSZWR1Y2VyIChzdGF0ZSwge3BheWxvYWQ6IHtzY3JvbGxUb3B9fSkge1xuICBsZXQge2NpcGhlcmVkVGV4dH0gPSBzdGF0ZTtcbiAgY2lwaGVyZWRUZXh0ID0gey4uLmNpcGhlcmVkVGV4dCwgc2Nyb2xsVG9wfTtcbiAgY2lwaGVyZWRUZXh0ID0gdXBkYXRlR3JpZFZpc2libGVSb3dzKGNpcGhlcmVkVGV4dCk7XG4gIHJldHVybiB7Li4uc3RhdGUsIGNpcGhlcmVkVGV4dH07XG59XG5cbmZ1bmN0aW9uIENpcGhlclRleHRWaWV3U2VsZWN0b3IgKHN0YXRlKSB7XG4gIGNvbnN0IHthY3Rpb25zLCBjaXBoZXJlZFRleHR9ID0gc3RhdGU7XG4gIGNvbnN0IHtjaXBoZXJlZFRleHRSZXNpemVkLCBjaXBoZXJlZFRleHRTY3JvbGxlZH0gPSBhY3Rpb25zO1xuICBjb25zdCB7d2lkdGgsIGhlaWdodCwgY2VsbFdpZHRoLCBjZWxsSGVpZ2h0LCBib3R0b20sIHBhZ2VSb3dzLCBwYWdlQ29sdW1ucywgdmlzaWJsZX0gPSBjaXBoZXJlZFRleHQ7XG4gIHJldHVybiB7XG4gICAgY2lwaGVyZWRUZXh0UmVzaXplZCwgY2lwaGVyZWRUZXh0U2Nyb2xsZWQsXG4gICAgd2lkdGgsIGhlaWdodCwgdmlzaWJsZVJvd3M6IHZpc2libGUucm93cywgY2VsbFdpZHRoLCBjZWxsSGVpZ2h0LCBib3R0b20sIHBhZ2VSb3dzLCBwYWdlQ29sdW1uc1xuICB9O1xufVxuXG5jbGFzcyBDaXBoZXJUZXh0VmlldyBleHRlbmRzIFJlYWN0LlB1cmVDb21wb25lbnQge1xuXG4gIHJlbmRlciAoKSB7XG4gICAgY29uc3Qge3dpZHRoLCBoZWlnaHQsIHZpc2libGVSb3dzLCBjZWxsV2lkdGgsIGNlbGxIZWlnaHQsIGJvdHRvbX0gPSB0aGlzLnByb3BzO1xuICAgIGNvbnNvbGUubG9nKHZpc2libGVSb3dzKTtcbiAgICByZXR1cm4gKFxuICAgICAgPGRpdj5cbiAgICAgICAgPGRpdiByZWY9e3RoaXMucmVmVGV4dEJveH0gb25TY3JvbGw9e3RoaXMub25TY3JvbGx9IHN0eWxlPXt7cG9zaXRpb246ICdyZWxhdGl2ZScsIHdpZHRoOiB3aWR0aCAmJiBgJHt3aWR0aH1weGAsIGhlaWdodDogaGVpZ2h0ICYmIGAke2hlaWdodH1weGAsIG92ZXJmbG93WTogJ3Njcm9sbCd9fT5cbiAgICAgICAgICB7KHZpc2libGVSb3dzfHxbXSkubWFwKCh7aW5kZXgsIGNvbHVtbnN9KSA9PlxuICAgICAgICAgICAgPGRpdiBrZXk9e2luZGV4fSBzdHlsZT17e3Bvc2l0aW9uOiAnYWJzb2x1dGUnLCB0b3A6IGAke2luZGV4ICogY2VsbEhlaWdodH1weGB9fT5cbiAgICAgICAgICAgICAge2NvbHVtbnMubWFwKCh7aW5kZXgsIGNlbGx9KSA9PlxuICAgICAgICAgICAgICAgIDxzcGFuIGtleT17aW5kZXh9IHN0eWxlPXt7cG9zaXRpb246ICdhYnNvbHV0ZScsIGxlZnQ6IGAke2luZGV4ICogY2VsbFdpZHRofXB4YCwgd2lkdGg6IGAke2NlbGxXaWR0aH1weGAsIGhlaWdodDogYCR7Y2VsbEhlaWdodH1weGB9fT5cbiAgICAgICAgICAgICAgICAgIHtjZWxsIHx8ICcgJ31cbiAgICAgICAgICAgICAgICA8L3NwYW4+KX1cbiAgICAgICAgICAgIDwvZGl2Pil9XG4gICAgICAgICAgPGRpdiBzdHlsZT17e3Bvc2l0aW9uOiAnYWJzb2x1dGUnLCB0b3A6IGAke2JvdHRvbX1weGAsIHdpZHRoOiAnMXB4JywgaGVpZ2h0OiAnMXB4J319Lz5cbiAgICAgICAgPC9kaXY+XG4gICAgICA8L2Rpdj5cbiAgICApO1xuICB9XG5cbiAgcmVmVGV4dEJveCA9IChlbGVtZW50KSA9PiB7XG4gICAgdGhpcy5fdGV4dEJveCA9IGVsZW1lbnQ7XG4gICAgY29uc3Qgd2lkdGggPSBlbGVtZW50LmNsaWVudFdpZHRoO1xuICAgIGNvbnN0IGhlaWdodCA9IGVsZW1lbnQuY2xpZW50SGVpZ2h0O1xuICAgIHRoaXMucHJvcHMuZGlzcGF0Y2goe3R5cGU6IHRoaXMucHJvcHMuY2lwaGVyZWRUZXh0UmVzaXplZCwgcGF5bG9hZDoge3dpZHRoLCBoZWlnaHR9fSk7XG4gIH07XG5cbiAgb25TY3JvbGwgPSAoKSA9PiB7XG4gICAgY29uc3Qgc2Nyb2xsVG9wID0gdGhpcy5fdGV4dEJveC5zY3JvbGxUb3A7XG4gICAgdGhpcy5wcm9wcy5kaXNwYXRjaCh7dHlwZTogdGhpcy5wcm9wcy5jaXBoZXJlZFRleHRTY3JvbGxlZCwgcGF5bG9hZDoge3Njcm9sbFRvcH19KTtcbiAgfTtcblxufVxuXG5leHBvcnQgZGVmYXVsdCB7XG4gIGFjdGlvbnM6IHtcbiAgICBjaXBoZXJlZFRleHRSZXNpemVkOiAnQ2lwaGVyZWRUZXh0LlJlc2l6ZWQnIC8qIHt3aWR0aDogbnVtYmVyLCBoZWlnaHQ6IG51bWJlcn0gKi8sXG4gICAgY2lwaGVyZWRUZXh0U2Nyb2xsZWQ6ICdDaXBoZXJlZFRleHQuU2Nyb2xsZWQnIC8qIHtzY3JvbGxUb3A6IG51bWJlcn0gKi8sXG4gIH0sXG4gIGFjdGlvblJlZHVjZXJzOiB7XG4gICAgYXBwSW5pdDogYXBwSW5pdFJlZHVjZXIsXG4gICAgdGFza0luaXQ6IHRhc2tJbml0UmVkdWNlcixcbiAgICBjaXBoZXJlZFRleHRSZXNpemVkOiBjaXBoZXJlZFRleHRSZXNpemVkUmVkdWNlcixcbiAgICBjaXBoZXJlZFRleHRTY3JvbGxlZDogY2lwaGVyZWRUZXh0U2Nyb2xsZWRSZWR1Y2VyLFxuICB9LFxuICB2aWV3czoge1xuICAgIENpcGhlcmVkVGV4dDogY29ubmVjdChDaXBoZXJUZXh0Vmlld1NlbGVjdG9yKShDaXBoZXJUZXh0VmlldyksXG4gIH1cbn07XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvY2lwaGVyZWRfdGV4dF9idW5kbGUuanMiLCJcbmltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQge2Nvbm5lY3R9IGZyb20gJ3JlYWN0LXJlZHV4JztcbmltcG9ydCB7QnV0dG9ufSBmcm9tICdyZWFjdC1ib290c3RyYXAnO1xuaW1wb3J0IHVwZGF0ZSBmcm9tICdpbW11dGFiaWxpdHktaGVscGVyJztcbmltcG9ydCB7cmFuZ2V9IGZyb20gJ3JhbmdlJztcbmltcG9ydCBjbGFzc25hbWVzIGZyb20gJ2NsYXNzbmFtZXMnO1xuXG5pbXBvcnQge2NoYW5nZVNlbGVjdGlvbiwgc29ydGVkQXJyYXlIYXNFbGVtZW50LCB1cGRhdGVHcmlkVmlzaWJsZUFyZWF9IGZyb20gJy4vdXRpbHMnO1xuXG5mdW5jdGlvbiBhcHBJbml0UmVkdWNlciAoc3RhdGUsIF9hY3Rpb24pIHtcbiAgcmV0dXJuIHsuLi5zdGF0ZSwgc2VsZWN0ZWRUZXh0OiB7XG4gICAgY2VsbFdpZHRoOiAxNyxcbiAgICBjZWxsSGVpZ2h0OiAyMCxcbiAgICBwYWdlQ29sdW1uczogMzAsXG4gICAgc2Nyb2xsVG9wOiAwLFxuICAgIG1vZGU6ICdyb3dzJyxcbiAgICBzZWxlY3RlZFJvd3M6IFtdLFxuICAgIHNlbGVjdGVkQ29sdW1uczogW10sXG4gICAgbmJDZWxsczogMFxuICB9fTtcbn1cblxuZnVuY3Rpb24gdGFza0luaXRSZWR1Y2VyIChzdGF0ZSwgX2FjdGlvbikge1xuICBjb25zdCB7Y2lwaGVyVGV4dH0gPSBzdGF0ZS50YXNrRGF0YTtcbiAgcmV0dXJuIHVwZGF0ZShzdGF0ZSwge3NlbGVjdGVkVGV4dDoge2NlbGxzOiB7JHNldDogY2lwaGVyVGV4dH0sIG5iQ2VsbHM6IHskc2V0OiBjaXBoZXJUZXh0Lmxlbmd0aH19fSk7XG59XG5cbmZ1bmN0aW9uIHNlbGVjdGVkVGV4dFJlc2l6ZWRSZWR1Y2VyIChzdGF0ZSwge3BheWxvYWQ6IHt3aWR0aCwgaGVpZ2h0fX0pIHtcbiAgbGV0IHtzZWxlY3RlZFRleHR9ID0gc3RhdGU7XG4gIHNlbGVjdGVkVGV4dCA9IHsuLi5zZWxlY3RlZFRleHQsIHdpZHRoLCBoZWlnaHQ6IE1hdGgubWF4KDggKiBzZWxlY3RlZFRleHQuY2VsbEhlaWdodCwgaGVpZ2h0KX07XG4gIHJldHVybiB7Li4uc3RhdGUsIHNlbGVjdGVkVGV4dH07XG59XG5cbmZ1bmN0aW9uIHNlbGVjdGVkVGV4dFNjcm9sbGVkUmVkdWNlciAoc3RhdGUsIHtwYXlsb2FkOiB7c2Nyb2xsVG9wLCByb3dzfX0pIHtcbiAgbGV0IHtzZWxlY3RlZFRleHR9ID0gc3RhdGU7XG4gIGlmICh0eXBlb2Ygcm93cyA9PT0gJ251bWJlcicpIHtcbiAgICBjb25zdCB7Y2VsbEhlaWdodCwgbWF4VG9wfSA9IHNlbGVjdGVkVGV4dDtcbiAgICBzY3JvbGxUb3AgPSBNYXRoLm1heCgwLCBNYXRoLm1pbihtYXhUb3AsIHNlbGVjdGVkVGV4dC5zY3JvbGxUb3AgKyByb3dzICogY2VsbEhlaWdodCkpO1xuICB9XG4gIHNlbGVjdGVkVGV4dCA9IHsuLi5zZWxlY3RlZFRleHQsIHNjcm9sbFRvcH07XG4gIHJldHVybiB7Li4uc3RhdGUsIHNlbGVjdGVkVGV4dH07XG59XG5cbmZ1bmN0aW9uIHNlbGVjdGVkVGV4dE1vZGVDaGFuZ2VkUmVkdWNlciAoc3RhdGUsIHtwYXlsb2FkOiB7bW9kZX19KSB7XG4gIGxldCB7c2VsZWN0ZWRUZXh0fSA9IHN0YXRlO1xuICBzZWxlY3RlZFRleHQgPSB7Li4uc2VsZWN0ZWRUZXh0LCBtb2RlOiBtb2RlfTtcbiAgcmV0dXJuIHsuLi5zdGF0ZSwgc2VsZWN0ZWRUZXh0fTtcbn1cblxuZnVuY3Rpb24gc2VsZWN0ZWRUZXh0UGFnZUNvbHVtbnNDaGFuZ2VkUmVkdWNlciAoc3RhdGUsIHtwYXlsb2FkOiB7Y29sdW1uc319KSB7XG4gIGxldCB7c2VsZWN0ZWRUZXh0fSA9IHN0YXRlO1xuICBzZWxlY3RlZFRleHQgPSB7Li4uc2VsZWN0ZWRUZXh0LCBwYWdlQ29sdW1uczogY29sdW1ucywgc2VsZWN0ZWRSb3dzOiBbXSwgc2VsZWN0ZWRDb2x1bW5zOiBbXX07XG4gIHJldHVybiB7Li4uc3RhdGUsIHNlbGVjdGVkVGV4dH07XG59XG5cbmZ1bmN0aW9uIHNlbGVjdGVkVGV4dFNlbGVjdGlvbkNoYW5nZWRSZWR1Y2VyIChzdGF0ZSwge3BheWxvYWQ6IHtzZWxlY3RlZCwgaW5kZXh9fSkge1xuICAvLyAvKiB7c2VsZWN0ZWQ6IGJvb2x9IHVuaW9uICh7fSBvciB7aW5kZXg6IG51bWJlcn0pICovKTtcbiAgbGV0IHtzZWxlY3RlZFRleHQsIHRhc2tEYXRhfSA9IHN0YXRlO1xuICBjb25zdCB7bW9kZX0gPSBzZWxlY3RlZFRleHQ7XG4gIGlmIChtb2RlID09PSAncm93cycpIHtcbiAgICBsZXQge3NlbGVjdGVkUm93c30gPSBzZWxlY3RlZFRleHQ7XG4gICAgaWYgKHR5cGVvZiBpbmRleCA9PT0gJ251bWJlcicpIHtcbiAgICAgIGlmIChzZWxlY3RlZCA9PT0gJ29ubHknKSB7XG4gICAgICAgIHNlbGVjdGVkUm93cyA9IFtpbmRleF07XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBzZWxlY3RlZCA9ICFzb3J0ZWRBcnJheUhhc0VsZW1lbnQoc2VsZWN0ZWRSb3dzLCBpbmRleCk7XG4gICAgICAgIHNlbGVjdGVkUm93cyA9IHVwZGF0ZShzZWxlY3RlZFJvd3MsIGNoYW5nZVNlbGVjdGlvbihzZWxlY3RlZFJvd3MsIGluZGV4LCBzZWxlY3RlZCkpO1xuICAgICAgfVxuICAgIH0gZWxzZSBpZiAoc2VsZWN0ZWQpIHtcbiAgICAgIGNvbnN0IHJvd3MgPSBNYXRoLmNlaWwodGFza0RhdGEuY2lwaGVyVGV4dC5sZW5ndGggLyBzZWxlY3RlZFRleHQucGFnZUNvbHVtbnMpO1xuICAgICAgc2VsZWN0ZWRSb3dzID0gcmFuZ2UoMCwgcm93cyk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHNlbGVjdGVkUm93cyA9IFtdO1xuICAgIH1cbiAgICBzZWxlY3RlZFRleHQgPSB7Li4uc2VsZWN0ZWRUZXh0LCBzZWxlY3RlZFJvd3N9O1xuICB9IGVsc2UgaWYgKG1vZGUgPT09ICdjb2x1bW5zJykge1xuICAgIGxldCB7c2VsZWN0ZWRDb2x1bW5zfSA9IHNlbGVjdGVkVGV4dDtcbiAgICBpZiAodHlwZW9mIGluZGV4ID09PSAnbnVtYmVyJykge1xuICAgICAgaWYgKHNlbGVjdGVkID09PSAnb25seScpIHtcbiAgICAgICAgc2VsZWN0ZWRDb2x1bW5zID0gW2luZGV4XTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHNlbGVjdGVkID0gIXNvcnRlZEFycmF5SGFzRWxlbWVudChzZWxlY3RlZENvbHVtbnMsIGluZGV4KTtcbiAgICAgICAgc2VsZWN0ZWRDb2x1bW5zID0gdXBkYXRlKHNlbGVjdGVkQ29sdW1ucywgY2hhbmdlU2VsZWN0aW9uKHNlbGVjdGVkQ29sdW1ucywgaW5kZXgsIHNlbGVjdGVkKSk7XG4gICAgICB9XG4gICAgfSBlbHNlIGlmIChzZWxlY3RlZCkge1xuICAgICAgc2VsZWN0ZWRDb2x1bW5zID0gcmFuZ2UoMCwgc2VsZWN0ZWRUZXh0LnBhZ2VDb2x1bW5zKTtcbiAgICB9IGVsc2Uge1xuICAgICAgc2VsZWN0ZWRDb2x1bW5zID0gW107XG4gICAgfVxuICAgIHNlbGVjdGVkVGV4dCA9IHsuLi5zZWxlY3RlZFRleHQsIHNlbGVjdGVkQ29sdW1uc307XG4gIH1cbiAgcmV0dXJuIHsuLi5zdGF0ZSwgc2VsZWN0ZWRUZXh0fTtcbn1cblxuZnVuY3Rpb24gc2VsZWN0ZWRUZXh0TGF0ZVJlZHVjZXIgKHN0YXRlKSB7XG4gIGxldCB7c2VsZWN0ZWRUZXh0fSA9IHN0YXRlO1xuICBpZiAoc2VsZWN0ZWRUZXh0KSB7XG4gICAgc2VsZWN0ZWRUZXh0ID0gdXBkYXRlR2VvbWV0cnkoc2VsZWN0ZWRUZXh0KTtcbiAgICAvKiBUT0RPOiB1cGRhdGUgZ3JpZC50b3Agc28gdGhhdCB0aGUgc2FtZSBmaXJzdCByb3cgcmVtYWlucyB2aXNpYmxlPyAqL1xuICAgIHNlbGVjdGVkVGV4dCA9IHVwZGF0ZUdyaWRWaXNpYmxlQXJlYShzZWxlY3RlZFRleHQpO1xuICAgIGlmIChzZWxlY3RlZFRleHQgIT09IHN0YXRlLnNlbGVjdGVkVGV4dCkge1xuICAgICAgc3RhdGUgPSB7Li4uc3RhdGUsIHNlbGVjdGVkVGV4dH07XG4gICAgfVxuICB9XG4gIHJldHVybiBzdGF0ZTtcbn1cblxuZnVuY3Rpb24gdXBkYXRlR2VvbWV0cnkgKGdyaWQpIHtcbiAgLyogVE9ETzogYnVpbGQgYSBjYWNoZSBrZXksIHN0b3JlIGl0IGluIHRoZSBncmlkLCB1c2UgaXQgdG8gc2tpcCBjb21wdXRhdGlvbiB3aGVuIHVuY2hhbmdlZCAqL1xuICBjb25zdCB7aGVpZ2h0LCBjZWxsSGVpZ2h0LCBzY3JvbGxUb3AsIGNlbGxzLCBwYWdlQ29sdW1uc30gPSBncmlkO1xuICBjb25zdCBwYWdlUm93cyA9IE1hdGgubWF4KDgsIE1hdGguY2VpbChoZWlnaHQgLyBjZWxsSGVpZ2h0KSk7XG4gIGxldCBib3R0b20gPSAxMDAsIG1heFRvcCA9IDA7XG4gIGlmIChoZWlnaHQgJiYgY2VsbHMpIHtcbiAgICBib3R0b20gPSBNYXRoLmNlaWwoY2VsbHMubGVuZ3RoIC8gcGFnZUNvbHVtbnMpICogY2VsbEhlaWdodCAtIDE7XG4gICAgbWF4VG9wID0gTWF0aC5tYXgoMCwgYm90dG9tICsgMSAtIHBhZ2VSb3dzICogY2VsbEhlaWdodCk7XG4gIH1cbiAgcmV0dXJuIHsuLi5ncmlkLCBwYWdlUm93cywgc2Nyb2xsVG9wOiBNYXRoLm1pbihtYXhUb3AsIHNjcm9sbFRvcCksIGJvdHRvbSwgbWF4VG9wfTtcbn1cblxuZnVuY3Rpb24gU2VsZWN0ZWRUZXh0Vmlld1NlbGVjdG9yIChzdGF0ZSkge1xuICBjb25zdCB7YWN0aW9ucywgc2VsZWN0ZWRUZXh0fSA9IHN0YXRlO1xuICBjb25zdCB7c2VsZWN0ZWRUZXh0UmVzaXplZCwgc2VsZWN0ZWRUZXh0U2Nyb2xsZWQsIHNlbGVjdGVkVGV4dE1vZGVDaGFuZ2VkLCBzZWxlY3RlZFRleHRQYWdlQ29sdW1uc0NoYW5nZWQsIHNlbGVjdGVkVGV4dFNlbGVjdGlvbkNoYW5nZWR9ID0gYWN0aW9ucztcbiAgY29uc3Qge3dpZHRoLCBoZWlnaHQsIGNlbGxXaWR0aCwgY2VsbEhlaWdodCwgYm90dG9tLCBwYWdlUm93cywgcGFnZUNvbHVtbnMsIHZpc2libGUsIG1vZGUsIHNjcm9sbFRvcH0gPSBzZWxlY3RlZFRleHQ7XG4gIHJldHVybiB7XG4gICAgc2VsZWN0ZWRUZXh0UmVzaXplZCwgc2VsZWN0ZWRUZXh0U2Nyb2xsZWQsIHNlbGVjdGVkVGV4dE1vZGVDaGFuZ2VkLCBzZWxlY3RlZFRleHRQYWdlQ29sdW1uc0NoYW5nZWQsIHNlbGVjdGVkVGV4dFNlbGVjdGlvbkNoYW5nZWQsXG4gICAgd2lkdGgsIGhlaWdodCwgdmlzaWJsZSwgY2VsbFdpZHRoLCBjZWxsSGVpZ2h0LCBib3R0b20sIHBhZ2VSb3dzLCBwYWdlQ29sdW1ucywgbW9kZSwgc2Nyb2xsVG9wXG4gIH07XG59XG5cbmNsYXNzIFNlbGVjdGVkVGV4dFZpZXcgZXh0ZW5kcyBSZWFjdC5QdXJlQ29tcG9uZW50IHtcblxuICBjb21wb25lbnREaWRNb3VudCgpIHtcbiAgICB0aGlzLnNlbGVjdEFsbCgpO1xuICB9XG5cbiAgcmVuZGVyICgpIHtcbiAgICBjb25zdCB7d2lkdGgsIGhlaWdodCwgdmlzaWJsZSwgY2VsbFdpZHRoLCBjZWxsSGVpZ2h0LCBwYWdlQ29sdW1ucywgYm90dG9tLCBtb2RlfSA9IHRoaXMucHJvcHM7XG5cbiAgICByZXR1cm4gKFxuICAgICAgPGRpdj5cbiAgICAgICAgey8qIDxkaXYgY2xhc3NOYW1lPSdmb3JtLWlubGluZScgc3R5bGU9e3ttYXJnaW5Cb3R0b206ICc3cHgnfX0+XG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9J2J0bi1ncm91cCc+XG4gICAgICAgICAgICA8QnV0dG9uIG9uQ2xpY2s9e3RoaXMuc2VsZWN0QWxsfSBic1NpemU9J3NtJz57XCIgVG91dCBzw6lsZWN0aW9ubmVyIFwifTwvQnV0dG9uPlxuICAgICAgICAgICAgPEJ1dHRvbiBvbkNsaWNrPXt0aGlzLnNlbGVjdE5vbmV9IGJzU2l6ZT0nc20nPntcIiBWaWRlciBsYSBzw6lsZWN0aW9uIFwifTwvQnV0dG9uPlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICA8L2Rpdj4gKi99XG4gICAgICAgIHsvKiA8ZGl2PlxuICAgICAgICAgIDxkaXYgcmVmPXt0aGlzLnJlZlRleHRCb3h9IG9uU2Nyb2xsPXt0aGlzLm9uU2Nyb2xsfSBzdHlsZT17e3Bvc2l0aW9uOiAncmVsYXRpdmUnLCB3aWR0aDogd2lkdGggJiYgYCR7d2lkdGh9cHhgLCBoZWlnaHQ6IGhlaWdodCAmJiBgJHtoZWlnaHR9cHhgLCBvdmVyZmxvd1k6ICdzY3JvbGwnfX0+XG4gICAgICAgICAgICB7dmlzaWJsZSAmJiAodmlzaWJsZS5yb3dzfHxbXSkubWFwKCh7aW5kZXgsIGNvbHVtbnMsIHNlbGVjdGVkfSkgPT5cbiAgICAgICAgICAgICAgPGRpdiBrZXk9e2luZGV4fSBjbGFzc05hbWU9e2NsYXNzbmFtZXMoJ3NlbGVjdFRleHQnLCAnc2VsZWN0VGV4dC1yb3dzJywgc2VsZWN0ZWQgPyAnc2VsZWN0ZWQnIDogJycpfSBzdHlsZT17e3RvcDogYCR7aW5kZXggKiBjZWxsSGVpZ2h0fXB4YCwgd2lkdGg6IGAke2NlbGxXaWR0aCAqIHBhZ2VDb2x1bW5zfXB4YCwgaGVpZ2h0OiBgJHtjZWxsSGVpZ2h0fXB4YH19XG4gICAgICAgICAgICAgICAgb25DbGljaz17dGhpcy5yb3dDbGlja2VkfSBkYXRhLWluZGV4PXtpbmRleH0+XG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9J3NlbGVjdFRleHRJbm5lcicgc3R5bGU9e3t3aWR0aDogYCR7Y2VsbFdpZHRoICogcGFnZUNvbHVtbnN9cHhgLCBoZWlnaHQ6IGAke2NlbGxIZWlnaHQgLSAyfXB4YH19PlxuICAgICAgICAgICAgICAgICAge2NvbHVtbnMubWFwKCh7aW5kZXgsIGNlbGx9KSA9PlxuICAgICAgICAgICAgICAgICAgICA8c3BhbiBrZXk9e2luZGV4fSBzdHlsZT17e2xlZnQ6IGAke2luZGV4ICogY2VsbFdpZHRofXB4YCwgd2lkdGg6IGAke2NlbGxXaWR0aH1weGAsIGhlaWdodDogYCR7Y2VsbEhlaWdodH1weGB9fT5cbiAgICAgICAgICAgICAgICAgICAgICB7Y2VsbCB8fCAnICd9XG4gICAgICAgICAgICAgICAgICAgIDwvc3Bhbj4pfVxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICA8L2Rpdj4pfVxuICAgICAgICAgICAge3Zpc2libGUgJiYgKHZpc2libGUuY29sdW1uc3x8W10pLm1hcCgoe2luZGV4LCByb3dzLCBzZWxlY3RlZH0pID0+XG4gICAgICAgICAgICAgIDxkaXYga2V5PXtpbmRleH0gY2xhc3NOYW1lPXtjbGFzc25hbWVzKCdzZWxlY3RUZXh0JywgJ3NlbGVjdFRleHQtY29sdW1ucycsIHNlbGVjdGVkID8gJ3NlbGVjdGVkJyA6ICcnKX0gc3R5bGU9e3tsZWZ0OiBgJHtpbmRleCAqIGNlbGxXaWR0aH1weGAsIHdpZHRoOiBgJHtjZWxsV2lkdGh9cHhgLCBoZWlnaHQ6IGAke2JvdHRvbX1weGB9fVxuICAgICAgICAgICAgICAgIG9uQ2xpY2s9e3RoaXMuY29sdW1uQ2xpY2tlZH0gZGF0YS1pbmRleD17aW5kZXh9PlxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPSdzZWxlY3RUZXh0SW5uZXInIHN0eWxlPXt7d2lkdGg6IGAke2NlbGxXaWR0aCAtIDJ9cHhgLCBoZWlnaHQ6IGAke2JvdHRvbX1weGB9fT5cbiAgICAgICAgICAgICAgICAgIHtyb3dzLm1hcCgoe2luZGV4LCBjZWxsfSkgPT5cbiAgICAgICAgICAgICAgICAgICAgPHNwYW4ga2V5PXtpbmRleH0gc3R5bGU9e3t0b3A6IGAke2luZGV4ICogY2VsbEhlaWdodH1weGAsIHdpZHRoOiBgJHtjZWxsV2lkdGh9cHhgLCBoZWlnaHQ6IGAke2NlbGxIZWlnaHR9cHhgfX0+XG4gICAgICAgICAgICAgICAgICAgICAge2NlbGwgfHwgJyAnfVxuICAgICAgICAgICAgICAgICAgICA8L3NwYW4+KX1cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgPC9kaXY+KX1cbiAgICAgICAgICAgIDxkaXYgc3R5bGU9e3twb3NpdGlvbjogJ2Fic29sdXRlJywgdG9wOiBgJHtib3R0b219cHhgLCB3aWR0aDogJzFweCcsIGhlaWdodDogJzFweCd9fS8+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvZGl2PiAqL31cbiAgICAgIDwvZGl2PlxuICAgICk7XG4gIH1cblxuICBjb21wb25lbnREaWRVcGRhdGUgKCkge1xuICAgIGlmICh0aGlzLl90ZXh0Qm94KSB7XG4gICAgICB0aGlzLl90ZXh0Qm94LnNjcm9sbFRvcCA9IHRoaXMucHJvcHMuc2Nyb2xsVG9wO1xuICAgIH1cbiAgfVxuXG4gIHN0YXRlID0ge3BhZ2VDb2x1bW5zOiBudWxsfTtcblxuICByZWZUZXh0Qm94ID0gKGVsZW1lbnQpID0+IHtcbiAgICB0aGlzLl90ZXh0Qm94ID0gZWxlbWVudDtcbiAgICBjb25zdCB3aWR0aCA9IGVsZW1lbnQuY2xpZW50V2lkdGg7XG4gICAgY29uc3QgaGVpZ2h0ID0gZWxlbWVudC5jbGllbnRIZWlnaHQ7XG4gICAgdGhpcy5wcm9wcy5kaXNwYXRjaCh7dHlwZTogdGhpcy5wcm9wcy5zZWxlY3RlZFRleHRSZXNpemVkLCBwYXlsb2FkOiB7d2lkdGgsIGhlaWdodH19KTtcbiAgfTtcblxuICBvblNjcm9sbCA9ICgpID0+IHtcbiAgICBjb25zdCBzY3JvbGxUb3AgPSB0aGlzLl90ZXh0Qm94LnNjcm9sbFRvcDtcbiAgICB0aGlzLnByb3BzLmRpc3BhdGNoKHt0eXBlOiB0aGlzLnByb3BzLnNlbGVjdGVkVGV4dFNjcm9sbGVkLCBwYXlsb2FkOiB7c2Nyb2xsVG9wfX0pO1xuICB9O1xuXG4gIHNldFJvd01vZGUgPSAoKSA9PiB7XG4gICAgdGhpcy5wcm9wcy5kaXNwYXRjaCh7dHlwZTogdGhpcy5wcm9wcy5zZWxlY3RlZFRleHRNb2RlQ2hhbmdlZCwgcGF5bG9hZDoge21vZGU6ICdyb3dzJ319KTtcbiAgfTtcbiAgc2V0Q29sTW9kZSA9ICgpID0+IHtcbiAgICB0aGlzLnByb3BzLmRpc3BhdGNoKHt0eXBlOiB0aGlzLnByb3BzLnNlbGVjdGVkVGV4dE1vZGVDaGFuZ2VkLCBwYXlsb2FkOiB7bW9kZTogJ2NvbHVtbnMnfX0pO1xuICB9O1xuXG4gIHNjcm9sbFBhZ2VVcCA9ICgpID0+IHtcbiAgICB0aGlzLnByb3BzLmRpc3BhdGNoKHt0eXBlOiB0aGlzLnByb3BzLnNlbGVjdGVkVGV4dFNjcm9sbGVkLCBwYXlsb2FkOiB7cm93czogLXRoaXMucHJvcHMucGFnZVJvd3N9fSk7XG4gIH07XG4gIHNjcm9sbFJvd1VwID0gKCkgPT4ge1xuICAgIHRoaXMucHJvcHMuZGlzcGF0Y2goe3R5cGU6IHRoaXMucHJvcHMuc2VsZWN0ZWRUZXh0U2Nyb2xsZWQsIHBheWxvYWQ6IHtyb3dzOiAtMX19KTtcbiAgfTtcbiAgc2Nyb2xsUm93RG93biA9ICgpID0+IHtcbiAgICB0aGlzLnByb3BzLmRpc3BhdGNoKHt0eXBlOiB0aGlzLnByb3BzLnNlbGVjdGVkVGV4dFNjcm9sbGVkLCBwYXlsb2FkOiB7cm93czogMX19KTtcbiAgfTtcbiAgc2Nyb2xsUGFnZURvd24gPSAoKSA9PiB7XG4gICAgdGhpcy5wcm9wcy5kaXNwYXRjaCh7dHlwZTogdGhpcy5wcm9wcy5zZWxlY3RlZFRleHRTY3JvbGxlZCwgcGF5bG9hZDoge3Jvd3M6IHRoaXMucHJvcHMucGFnZVJvd3N9fSk7XG4gIH07XG5cbiAgcGFnZUNvbHVtbnNDaGFuZ2UgPSAoZXZlbnQpID0+IHtcbiAgICBjb25zdCB0ZXh0ID0gZXZlbnQudGFyZ2V0LnZhbHVlO1xuICAgIGNvbnN0IHZhbHVlID0gcGFyc2VJbnQodGV4dCk7XG4gICAgaWYgKCFpc05hTih2YWx1ZSkgJiYgdmFsdWUgPiAwICYmIHZhbHVlIDwgODApIHtcbiAgICAgIHRoaXMuc2V0U3RhdGUoe3BhZ2VDb2x1bW5zOiBudWxsfSk7XG4gICAgICB0aGlzLnByb3BzLmRpc3BhdGNoKHt0eXBlOiB0aGlzLnByb3BzLnNlbGVjdGVkVGV4dFBhZ2VDb2x1bW5zQ2hhbmdlZCwgcGF5bG9hZDoge2NvbHVtbnM6IHZhbHVlfX0pO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLnNldFN0YXRlKHtwYWdlQ29sdW1uczogdGV4dH0pO1xuICAgIH1cbiAgfTtcblxuICBzZWxlY3RBbGwgPSAoKSA9PiB7XG4gICAgdGhpcy5wcm9wcy5kaXNwYXRjaCh7dHlwZTogdGhpcy5wcm9wcy5zZWxlY3RlZFRleHRTZWxlY3Rpb25DaGFuZ2VkLCBwYXlsb2FkOiB7c2VsZWN0ZWQ6IHRydWV9fSk7XG4gIH07XG4gIHNlbGVjdE5vbmUgPSAoKSA9PiB7XG4gICAgdGhpcy5wcm9wcy5kaXNwYXRjaCh7dHlwZTogdGhpcy5wcm9wcy5zZWxlY3RlZFRleHRTZWxlY3Rpb25DaGFuZ2VkLCBwYXlsb2FkOiB7c2VsZWN0ZWQ6IGZhbHNlfX0pO1xuICB9O1xuICByb3dDbGlja2VkID0gKGV2ZW50KSA9PiB7XG4gICAgY29uc3QgaW5kZXggPSBwYXJzZUludChldmVudC5jdXJyZW50VGFyZ2V0LmRhdGFzZXQuaW5kZXgpO1xuICAgIHRoaXMucHJvcHMuZGlzcGF0Y2goe3R5cGU6IHRoaXMucHJvcHMuc2VsZWN0ZWRUZXh0U2VsZWN0aW9uQ2hhbmdlZCwgcGF5bG9hZDoge2luZGV4LCBzZWxlY3RlZDogZXZlbnQuc2hpZnRLZXkgPyAndG9nZ2xlJyA6ICdvbmx5J319KTtcbiAgfTtcbiAgY29sdW1uQ2xpY2tlZCA9IChldmVudCkgPT4ge1xuICAgIGNvbnN0IGluZGV4ID0gcGFyc2VJbnQoZXZlbnQuY3VycmVudFRhcmdldC5kYXRhc2V0LmluZGV4KTtcbiAgICB0aGlzLnByb3BzLmRpc3BhdGNoKHt0eXBlOiB0aGlzLnByb3BzLnNlbGVjdGVkVGV4dFNlbGVjdGlvbkNoYW5nZWQsIHBheWxvYWQ6IHtpbmRleCwgc2VsZWN0ZWQ6IGV2ZW50LnNoaWZ0S2V5ID8gJ3RvZ2dsZScgOiAnb25seSd9fSk7XG4gIH07XG5cbn1cblxuZXhwb3J0IGRlZmF1bHQge1xuICBhY3Rpb25zOiB7XG4gICAgc2VsZWN0ZWRUZXh0UmVzaXplZDogJ1NlbGVjdGVkVGV4dC5SZXNpemVkJyAvKiB7d2lkdGg6IG51bWJlciwgaGVpZ2h0OiBudW1iZXJ9ICovLFxuICAgIHNlbGVjdGVkVGV4dFNjcm9sbGVkOiAnU2VsZWN0ZWRUZXh0LlNjcm9sbGVkJyAvKiB7dG9wOiBudW1iZXJ9ICovLFxuICAgIHNlbGVjdGVkVGV4dE1vZGVDaGFuZ2VkOiAnU2VsZWN0ZWRUZXh0Lk1vZGUuQ2hhbmdlZCcgLyoge21vZGU6ICdyb3dzJyBvciAnY29sdW1ucyd9ICovLFxuICAgIHNlbGVjdGVkVGV4dFBhZ2VDb2x1bW5zQ2hhbmdlZDogJ1NlbGVjdGVkVGV4dC5QYWdlQ29sdW1ucy5DaGFuZ2VkJyAvKiB7Y29sdW1uczogbnVtYmVyfSAqLyxcbiAgICBzZWxlY3RlZFRleHRTZWxlY3Rpb25DaGFuZ2VkOiAnU2VsZWN0ZWRUZXh0LlNlbGVjdGlvbi5DaGFuZ2VkJyAvKiB7c2VsZWN0ZWQ6IGJvb2x9IHVuaW9uICh7fSBvciB7aW5kZXg6IG51bWJlcn0pICovLFxuICB9LFxuICBhY3Rpb25SZWR1Y2Vyczoge1xuICAgIGFwcEluaXQ6IGFwcEluaXRSZWR1Y2VyLFxuICAgIHRhc2tJbml0OiB0YXNrSW5pdFJlZHVjZXIsXG4gICAgc2VsZWN0ZWRUZXh0UmVzaXplZDogc2VsZWN0ZWRUZXh0UmVzaXplZFJlZHVjZXIsXG4gICAgc2VsZWN0ZWRUZXh0U2Nyb2xsZWQ6IHNlbGVjdGVkVGV4dFNjcm9sbGVkUmVkdWNlcixcbiAgICBzZWxlY3RlZFRleHRNb2RlQ2hhbmdlZDogc2VsZWN0ZWRUZXh0TW9kZUNoYW5nZWRSZWR1Y2VyLFxuICAgIHNlbGVjdGVkVGV4dFBhZ2VDb2x1bW5zQ2hhbmdlZDogc2VsZWN0ZWRUZXh0UGFnZUNvbHVtbnNDaGFuZ2VkUmVkdWNlcixcbiAgICBzZWxlY3RlZFRleHRTZWxlY3Rpb25DaGFuZ2VkOiBzZWxlY3RlZFRleHRTZWxlY3Rpb25DaGFuZ2VkUmVkdWNlcixcbiAgfSxcbiAgbGF0ZVJlZHVjZXI6IHNlbGVjdGVkVGV4dExhdGVSZWR1Y2VyLFxuICB2aWV3czoge1xuICAgIFNlbGVjdGVkVGV4dDogY29ubmVjdChTZWxlY3RlZFRleHRWaWV3U2VsZWN0b3IpKFNlbGVjdGVkVGV4dFZpZXcpXG4gIH0sXG59O1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL3NlbGVjdGVkX3RleHRfYnVuZGxlLmpzIiwiXG5pbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IHtjb25uZWN0fSBmcm9tICdyZWFjdC1yZWR1eCc7XG5pbXBvcnQge3JhbmdlfSBmcm9tICdyYW5nZSc7XG5pbXBvcnQgc2VlZHJhbmRvbSBmcm9tICdzZWVkcmFuZG9tJztcblxuZnVuY3Rpb24gYXBwSW5pdFJlZHVjZXIgKHN0YXRlLCBfYWN0aW9uKSB7XG4gIHJldHVybiB7Li4uc3RhdGUsIGZyZXF1ZW5jeUFuYWx5c2lzOiB7fX07XG59XG5cbmZ1bmN0aW9uIGZyZXF1ZW5jeUFuYWx5c2lzTGF0ZVJlZHVjZXIgKHN0YXRlKSB7XG4gIGlmIChzdGF0ZS5mcmVxdWVuY3lBbmFseXNpcyAmJiBzdGF0ZS50YXNrRGF0YSkge1xuICAgIGxldCB7dGFza0RhdGE6IHthbHBoYWJldCwgcmVmZXJlbmNlRnJlcXVlbmNpZXMsIGZyZXF1ZW5jaWVzLCBjaXBoZXJUZXh0fSwgc2VsZWN0ZWRUZXh0OiB7bW9kZSwgcGFnZUNvbHVtbnMsIHNlbGVjdGVkUm93cywgc2VsZWN0ZWRDb2x1bW5zfSwgZnJlcXVlbmN5QW5hbHlzaXN9ID0gc3RhdGU7XG4gICAgbGV0IHRleHRGcmVxdWVuY2llcyA9IFtdO1xuICAgIGlmIChtb2RlID09PSAncm93cycgJiYgc2VsZWN0ZWRSb3dzLmxlbmd0aCAhPT0gMCkge1xuICAgICAgY29uc3QgZnJlcU1hcCA9IG5ldyBNYXAoYWxwaGFiZXQuc3BsaXQoJycpLm1hcChjID0+IFtjLCAwXSkpO1xuICAgICAgZm9yIChsZXQgaW5kZXggb2Ygc2VsZWN0ZWRSb3dzKSB7XG4gICAgICAgIGNvbnN0IHN0YXJ0UG9zID0gaW5kZXggKiBwYWdlQ29sdW1ucztcbiAgICAgICAgY29uc3QgZW5kUG9zID0gc3RhcnRQb3MgKyBwYWdlQ29sdW1ucyAtIDE7XG4gICAgICAgIGNvdW50U3ltYm9scyhmcmVxTWFwLCBjaXBoZXJUZXh0LCBzdGFydFBvcywgZW5kUG9zKTtcbiAgICAgIH1cbiAgICAgIHRleHRGcmVxdWVuY2llcyA9IG5vcm1hbGl6ZUFuZFNvcnRGcmVxdWVuY2llcyhmcmVxTWFwLmVudHJpZXMoKSk7XG4gICAgfSBlbHNlIGlmIChtb2RlID09PSAnY29sdW1ucycgJiYgc2VsZWN0ZWRDb2x1bW5zLmxlbmd0aCAhPT0gMCkge1xuICAgICAgaWYgKHBhZ2VDb2x1bW5zICE9PSAyNikge1xuICAgICAgICBjb25zdCBybmcgPSBzZWVkcmFuZG9tKHNlbGVjdGVkQ29sdW1ucy5qb2luKCcsJykpO1xuICAgICAgICBjb25zdCBiYXNlUHJvYmEgPSAxIC8gYWxwaGFiZXQubGVuZ3RoO1xuICAgICAgICBjb25zdCBtYXhSZWZQcm9iYSA9IHJlZmVyZW5jZUZyZXF1ZW5jaWVzLnJlZHVjZSgoYSwgeCkgPT4gTWF0aC5tYXgoYSwgeC5wcm9iYSksIDApO1xuICAgICAgICBjb25zdCBlcHNpbG9uID0gbWF4UmVmUHJvYmEgKiAyIC8gMzA7IC8qIDIgcGl4ZWxzIGFmdGVyIHNjYWxpbmcgKi9cbiAgICAgICAgY29uc3QgZW50cmllcyA9IGFscGhhYmV0LnNwbGl0KCcnKS5tYXAoYyA9PiBbYywgYmFzZVByb2JhICsgZXBzaWxvbiAqIChybmcoKSAqIDIgLSAxKV0pO1xuICAgICAgICB0ZXh0RnJlcXVlbmNpZXMgPSBub3JtYWxpemVBbmRTb3J0RnJlcXVlbmNpZXMoZW50cmllcyk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBjb25zdCBzZWxlY3RlZEZyZXF1ZW5jaWVzID0gbmV3IEFycmF5KGFscGhhYmV0Lmxlbmd0aCkuZmlsbCgwKTtcbiAgICAgICAgZm9yIChsZXQgY29sIG9mIHNlbGVjdGVkQ29sdW1ucykge1xuICAgICAgICAgIHN1bUZyZXF1ZW5jaWVzKHNlbGVjdGVkRnJlcXVlbmNpZXMsIGZyZXF1ZW5jaWVzW2NvbF0pO1xuICAgICAgICB9XG4gICAgICAgIHRleHRGcmVxdWVuY2llcyA9IG5vcm1hbGl6ZUFuZFNvcnRGcmVxdWVuY2llcyhcbiAgICAgICAgICBzZWxlY3RlZEZyZXF1ZW5jaWVzLm1hcCgocHJvYmEsIGkpID0+IFthbHBoYWJldFtpXSwgcHJvYmFdKSk7XG4gICAgICB9XG4gICAgfVxuICAgIGZyZXF1ZW5jeUFuYWx5c2lzID0gey4uLmZyZXF1ZW5jeUFuYWx5c2lzLCB0ZXh0RnJlcXVlbmNpZXN9O1xuICAgIHN0YXRlID0gey4uLnN0YXRlLCBmcmVxdWVuY3lBbmFseXNpc307XG4gIH1cbiAgcmV0dXJuIHN0YXRlO1xufVxuXG5mdW5jdGlvbiBjb3VudFN5bWJvbHMgKG1hcCwgdGV4dCwgc3RhcnRQb3MsIGVuZFBvcykge1xuICBmb3IgKGxldCBwb3MgPSBzdGFydFBvczsgcG9zIDw9IGVuZFBvczsgcG9zICs9IDEpIHtcbiAgICBjb3VudFN5bWJvbChtYXAsIHRleHRbcG9zXSk7XG4gIH1cbn1cblxuZnVuY3Rpb24gY291bnRTeW1ib2wgKG1hcCwgY2hhcikge1xuICBjb25zdCBjb3VudCA9IG1hcC5nZXQoY2hhcik7XG4gIGlmIChjb3VudCAhPT0gdW5kZWZpbmVkKSB7XG4gICAgbWFwLnNldChjaGFyLCBjb3VudCArIDEpO1xuICB9XG59XG5cbmZ1bmN0aW9uIHN1bUZyZXF1ZW5jaWVzIChkc3QsIGFkZCkge1xuICBmb3IgKGxldCBpID0gMDsgaSA8IGRzdC5sZW5ndGg7IGkgKz0gMSkge1xuICAgIGRzdFtpXSArPSBhZGRbaV07XG4gIH1cbn1cblxuZnVuY3Rpb24gbm9ybWFsaXplQW5kU29ydEZyZXF1ZW5jaWVzIChlbnRyaWVzKSB7XG4gIGNvbnN0IHJlc3VsdCA9IEFycmF5LmZyb20oZW50cmllcyk7XG4gIGNvbnN0IHRvdGFsQ291bnQgPSByZXN1bHQucmVkdWNlKChhLCB4KSA9PiBhICsgeFsxXSwgMCk7XG4gIHJlc3VsdC5zb3J0KGZ1bmN0aW9uIChzMSwgczIpIHtcbiAgICAgY29uc3QgcDEgPSBzMVsxXSwgcDIgPSBzMlsxXTtcbiAgICAgcmV0dXJuIHAxID4gcDIgPyAtMSA6IChwMSA8IHAyID8gMSA6IDApO1xuICB9KTtcbiAgcmV0dXJuIHJlc3VsdC5tYXAoKFtzeW1ib2wsIGNvdW50XSkgPT4gKHtzeW1ib2wsIHByb2JhOiBjb3VudCAvIHRvdGFsQ291bnR9KSk7XG59XG5cbmZ1bmN0aW9uIEZyZXF1ZW5jeUFuYWx5c2lzU2VsZWN0b3IgKHN0YXRlKSB7XG4gIGNvbnN0IHt0YXNrRGF0YToge2FscGhhYmV0LCByZWZlcmVuY2VGcmVxdWVuY2llc30sIGZyZXF1ZW5jeUFuYWx5c2lzOiB7dGV4dEZyZXF1ZW5jaWVzfX0gPSBzdGF0ZTtcbiAgY29uc3Qgc2NhbGUgPSAzMCAvIHJlZmVyZW5jZUZyZXF1ZW5jaWVzLnJlZHVjZSgoYSwgeCkgPT4gTWF0aC5tYXgoYSwgeC5wcm9iYSksIDApO1xuICByZXR1cm4ge1xuICAgIGFscGhhYmV0U2l6ZTogYWxwaGFiZXQubGVuZ3RoLFxuICAgIHJlZmVyZW5jZUZyZXF1ZW5jaWVzLFxuICAgIHRleHRGcmVxdWVuY2llcyxcbiAgICBzY2FsZVxuICB9O1xufVxuXG5jbGFzcyBGcmVxdWVuY3lBbmFseXNpc1ZpZXcgZXh0ZW5kcyBSZWFjdC5QdXJlQ29tcG9uZW50IHtcbiAgcmVuZGVyICgpIHtcbiAgICBjb25zdCB7YWxwaGFiZXRTaXplLCByZWZlcmVuY2VGcmVxdWVuY2llcywgdGV4dEZyZXF1ZW5jaWVzLCBzY2FsZX0gPSB0aGlzLnByb3BzO1xuICAgIGlmICghcmVmZXJlbmNlRnJlcXVlbmNpZXMpIHJldHVybiBmYWxzZTtcbiAgICByZXR1cm4gKFxuICAgICAgPGRpdiBjbGFzc05hbWU9J2NsZWFyZml4Jz5cbiAgICAgICAgPGRpdiBzdHlsZT17e2Zsb2F0OiAnbGVmdCcsIHdpZHRoOiAnMTAwcHgnLCBoZWlnaHQ6ICcxMDhweCcsIGZvbnRTaXplOiAnMTBweCcsIGxpbmVIZWlnaHQ6ICcxMHB4JywgcG9zaXRpb246ICdyZWxhdGl2ZSd9fT5cbiAgICAgICAgICA8ZGl2IHN0eWxlPXt7aGVpZ2h0OiAnMzBweCcsIHBvc2l0aW9uOiAnYWJzb2x1dGUnLCB0b3A6ICcwcHgnfX0+XG4gICAgICAgICAgICB7XCJGcsOpcXVlbmNlcyBkYW5zIGxlIHRleHRlIDpcIn1cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICA8ZGl2IHN0eWxlPXt7aGVpZ2h0OiAnMjBweCcsIHBvc2l0aW9uOiAnYWJzb2x1dGUnLCB0b3A6ICczMnB4J319PlxuICAgICAgICAgICAge1wiU3ltYm9sZXMgZHUgdGV4dGUgOlwifVxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgIDxkaXYgc3R5bGU9e3toZWlnaHQ6ICcyMHB4JywgcG9zaXRpb246ICdhYnNvbHV0ZScsIHRvcDogJzU2cHgnfX0+XG4gICAgICAgICAgICB7XCJTdWJzdGl0dXRpb25zIDpcIn1cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICA8ZGl2IHN0eWxlPXt7aGVpZ2h0OiAnMzBweCcsIHBvc2l0aW9uOiAnYWJzb2x1dGUnLCB0b3A6ICc3OHB4J319PlxuICAgICAgICAgICAge1wiRnLDqXF1ZW5jZXMgZW4gZnJhbsOnYWlzIDpcIn1cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgPC9kaXY+XG4gICAgICAgIHtyYW5nZSgwLCBhbHBoYWJldFNpemUpLm1hcChpbmRleCA9PlxuICAgICAgICAgIDxkaXYga2V5PXtpbmRleH0gc3R5bGU9e3tmbG9hdDogJ2xlZnQnLCB3aWR0aDogJzIwcHgnLCBoZWlnaHQ6ICcxMDhweCcsIHBvc2l0aW9uOiAncmVsYXRpdmUnfX0+XG4gICAgICAgICAgICA8VGV4dEZyZXF1ZW5jeUJveCBpbmRleD17aW5kZXh9IGNlbGw9e3RleHRGcmVxdWVuY2llc1tpbmRleF19IHNjYWxlPXtzY2FsZX0gLz5cbiAgICAgICAgICAgIDxSZWZlcmVuY2VGcmVxdWVuY3lCb3ggaW5kZXg9e2luZGV4fSBjZWxsPXtyZWZlcmVuY2VGcmVxdWVuY2llc1tpbmRleF19IHNjYWxlPXtzY2FsZX0gLz5cbiAgICAgICAgICA8L2Rpdj4pfVxuICAgICAgPC9kaXY+XG4gICAgKTtcbiAgfVxufVxuXG5jbGFzcyBUZXh0RnJlcXVlbmN5Qm94IGV4dGVuZHMgUmVhY3QuUHVyZUNvbXBvbmVudCB7XG4gIHJlbmRlciAoKSB7XG4gICAgY29uc3Qge2NlbGwsIHNjYWxlfSA9IHRoaXMucHJvcHM7XG4gICAgaWYgKCFjZWxsKSByZXR1cm4gZmFsc2U7XG4gICAgcmV0dXJuIChcbiAgICAgIDxkaXYgc3R5bGU9e3twb3NpdGlvbjogJ2Fic29sdXRlJywgdG9wOiAnMHB4J319PlxuICAgICAgICA8ZGl2IHN0eWxlPXt7d2lkdGg6ICcyMHB4JywgaGVpZ2h0OiAnMzBweCcsIGRpc3BsYXk6ICd0YWJsZS1jZWxsJywgdmVydGljYWxBbGlnbjogJ2JvdHRvbSd9fT5cbiAgICAgICAgICA8ZGl2IHN0eWxlPXt7aGVpZ2h0OiBgJHtNYXRoLm1pbigzMCwgTWF0aC5yb3VuZChjZWxsLnByb2JhICogc2NhbGUpKX1weGAsIHdpZHRoOiAnOHB4JywgbWFyZ2luTGVmdDogJzVweCcsIGJhY2tncm91bmQ6ICdibGFjayd9fS8+XG4gICAgICAgIDwvZGl2PlxuICAgICAgICA8ZGl2IHN0eWxlPXt7d2lkdGg6ICcxN3B4JywgaGVpZ2h0OiAnMjBweCcsIGJvcmRlcjogJzFweCBzb2xpZCB3aGl0ZScsIG1hcmdpbkJvdHRvbTogJzJweCcsIHRleHRBbGlnbjogJ2NlbnRlcid9fT5cbiAgICAgICAgICB7Y2VsbC5zeW1ib2x9XG4gICAgICAgIDwvZGl2PlxuICAgICAgPC9kaXY+XG4gICAgKTtcbiAgfVxufVxuXG5jbGFzcyBSZWZlcmVuY2VGcmVxdWVuY3lCb3ggZXh0ZW5kcyBSZWFjdC5QdXJlQ29tcG9uZW50IHtcbiAgcmVuZGVyICgpIHtcbiAgICBjb25zdCB7Y2VsbCwgc2NhbGV9ID0gdGhpcy5wcm9wcztcbiAgICByZXR1cm4gKFxuICAgICAgPGRpdiBzdHlsZT17e3Bvc2l0aW9uOiAnYWJzb2x1dGUnLCB0b3A6ICc1NnB4J319PlxuICAgICAgICA8ZGl2IHN0eWxlPXt7d2lkdGg6ICcxN3B4JywgaGVpZ2h0OiAnMjBweCcsIGJvcmRlcjogJzFweCBzb2xpZCBibGFjaycsIG1hcmdpbkJvdHRvbTogJzJweCcsIHRleHRBbGlnbjogJ2NlbnRlcid9fT5cbiAgICAgICAgICB7Y2VsbC5zeW1ib2x9XG4gICAgICAgIDwvZGl2PlxuICAgICAgICA8ZGl2IHN0eWxlPXt7d2lkdGg6ICcyMHB4JywgaGVpZ2h0OiAnMzBweCcsIHZlcnRpY2FsQWxpZ246ICd0b3AnfX0+XG4gICAgICAgICAgPGRpdiBzdHlsZT17e2hlaWdodDogYCR7TWF0aC5yb3VuZChjZWxsLnByb2JhICogc2NhbGUpfXB4YCwgd2lkdGg6ICc4cHgnLCBtYXJnaW5MZWZ0OiAnNXB4JywgYmFja2dyb3VuZDogJ2JsYWNrJ319Lz5cbiAgICAgICAgPC9kaXY+XG4gICAgICA8L2Rpdj5cbiAgICApO1xuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IHtcbiAgYWN0aW9uUmVkdWNlcnM6IHtcbiAgICBhcHBJbml0OiBhcHBJbml0UmVkdWNlclxuICB9LFxuICBsYXRlUmVkdWNlcjogZnJlcXVlbmN5QW5hbHlzaXNMYXRlUmVkdWNlcixcbiAgdmlld3M6IHtcbiAgICBGcmVxdWVuY3lBbmFseXNpczogY29ubmVjdChGcmVxdWVuY3lBbmFseXNpc1NlbGVjdG9yKShGcmVxdWVuY3lBbmFseXNpc1ZpZXcpXG4gIH0sXG59O1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL2ZyZXF1ZW5jeV9hbmFseXNpc19idW5kbGUuanMiLCIvKiAoaWdub3JlZCkgKi9cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyBjcnlwdG8gKGlnbm9yZWQpXG4vLyBtb2R1bGUgaWQgPSA1Nzlcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiXG5pbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IHtjb25uZWN0fSBmcm9tICdyZWFjdC1yZWR1eCc7XG5pbXBvcnQge0J1dHRvbn0gZnJvbSAncmVhY3QtYm9vdHN0cmFwJztcbmltcG9ydCB1cGRhdGUgZnJvbSAnaW1tdXRhYmlsaXR5LWhlbHBlcic7XG5pbXBvcnQge2RlbGF5fSBmcm9tICdyZWR1eC1zYWdhJztcbmltcG9ydCB7c2VsZWN0LCB0YWtlTGF0ZXN0LCBwdXR9IGZyb20gJ3JlZHV4LXNhZ2EvZWZmZWN0cyc7XG5cbmltcG9ydCB7YXBwbHlSb3RvcnMsIGdldFJvdG9yU2hpZnR9IGZyb20gJy4vdXRpbHMnO1xuXG5mdW5jdGlvbiBhcHBJbml0UmVkdWNlciAoc3RhdGUsIF9hY3Rpb24pIHtcbiAgcmV0dXJuIHsuLi5zdGF0ZSwgc2NoZWR1bGluZzoge1xuICAgIHN0YXR1czogJ3N0YXJ0JyxcbiAgICBzcGVlZDogMS4wLFxuICAgIHBvc2l0aW9uOiAwLFxuICAgIHNoaWZ0czogW10sXG4gICAgc3RhcnRQb3NpdGlvbjogMCxcbiAgICBlbmRQb3NpdGlvbjogMCxcbiAgICBjdXJyZW50VHJhY2U6IFtdLFxuICB9fTtcbn1cblxuZnVuY3Rpb24gdGFza0luaXRSZWR1Y2VyIChzdGF0ZSwgX2FjdGlvbikge1xuICBsZXQge3NjaGVkdWxpbmcsIHRhc2tEYXRhOiB7Y2lwaGVyVGV4dH19ID0gc3RhdGU7XG4gIHNjaGVkdWxpbmcgPSB7Li4uc2NoZWR1bGluZywgZW5kUG9zaXRpb246IGNpcGhlclRleHQubGVuZ3RoIC0gMX07XG4gIHJldHVybiB7Li4uc3RhdGUsIHNjaGVkdWxpbmd9O1xufVxuXG5mdW5jdGlvbiBzY2hlZHVsaW5nU3RhdHVzQ2hhbmdlZFJlZHVjZXIgKHN0YXRlLCB7cGF5bG9hZDoge3N0YXR1c319KSB7XG4gIGNvbnN0IHtzY2hlZHVsaW5nfSA9IHN0YXRlO1xuICBjb25zdCBjaGFuZ2VzID0ge3N0YXR1czogeyRzZXQ6IHN0YXR1c319O1xuICBpZiAoc3RhdHVzID09PSAnc3RhcnQnKSB7XG4gICAgY2hhbmdlcy5wb3NpdGlvbiA9IHskc2V0OiBzY2hlZHVsaW5nLnN0YXJ0UG9zaXRpb259O1xuICB9IGVsc2UgaWYgKHN0YXR1cyA9PT0gJ2VuZCcpIHtcbiAgICBjaGFuZ2VzLnBvc2l0aW9uID0geyRzZXQ6IHNjaGVkdWxpbmcuZW5kUG9zaXRpb259O1xuICB9IGVsc2UgaWYgKHN0YXR1cyA9PT0gJ3BsYXknKSB7XG4gICAgaWYgKHNjaGVkdWxpbmcucG9zaXRpb24gPT09IHNjaGVkdWxpbmcuZW5kUG9zaXRpb24pIHtcbiAgICAgIGNoYW5nZXMucG9zaXRpb24gPSB7JHNldDogc2NoZWR1bGluZy5zdGFydFBvc2l0aW9ufTtcbiAgICB9XG4gIH1cbiAgcmV0dXJuIHVwZGF0ZShzdGF0ZSwge3NjaGVkdWxpbmc6IGNoYW5nZXN9KTtcbn1cblxuZnVuY3Rpb24gc2NoZWR1bGluZ1N0ZXBCYWNrd2FyZFJlZHVjZXIgKHN0YXRlLCBfYWN0aW9uKSB7XG4gIGNvbnN0IHtzY2hlZHVsaW5nOiB7cG9zaXRpb259fSA9IHN0YXRlO1xuICBpZiAocG9zaXRpb24gPT09IDApIHJldHVybiBzdGF0ZTtcbiAgcmV0dXJuIHVwZGF0ZShzdGF0ZSwge3NjaGVkdWxpbmc6IHtcbiAgICBzdGF0dXM6IHskc2V0OiAncGF1c2UnfSxcbiAgICBwb3NpdGlvbjogeyRzZXQ6IHBvc2l0aW9uIC0gMX1cbiAgfX0pO1xufVxuXG5mdW5jdGlvbiBzY2hlZHVsaW5nU3RlcEZvcndhcmRSZWR1Y2VyIChzdGF0ZSwgX2FjdGlvbikge1xuICBjb25zdCB7c2NoZWR1bGluZzoge3Bvc2l0aW9uLCBlbmRQb3NpdGlvbn19ID0gc3RhdGU7XG4gIGlmIChwb3NpdGlvbiA9PT0gZW5kUG9zaXRpb24pIHJldHVybiBzdGF0ZTtcbiAgcmV0dXJuIHVwZGF0ZShzdGF0ZSwge3NjaGVkdWxpbmc6IHtcbiAgICBzdGF0dXM6IHskc2V0OiAncGF1c2UnfSxcbiAgICBwb3NpdGlvbjogeyRzZXQ6IHBvc2l0aW9uICsgMX1cbiAgfX0pO1xufVxuXG5mdW5jdGlvbiBzY2hlZHVsaW5nSnVtcFJlZHVjZXIgKHN0YXRlLCB7cGF5bG9hZDoge3Bvc2l0aW9ufX0pIHtcbiAgcmV0dXJuIHVwZGF0ZShzdGF0ZSwge3NjaGVkdWxpbmc6IHtcbiAgICBzdGF0dXM6IHskc2V0OiAncGF1c2UnfSxcbiAgICBwb3NpdGlvbjogeyRzZXQ6IHBvc2l0aW9ufVxuICB9fSk7XG59XG5cbmZ1bmN0aW9uIHNjaGVkdWxpbmdUaWNrUmVkdWNlciAoc3RhdGUsIF9hY3Rpb24pIHtcbiAgY29uc3Qge3NjaGVkdWxpbmc6IHtwb3NpdGlvbiwgZW5kUG9zaXRpb259fSA9IHN0YXRlO1xuICBpZiAocG9zaXRpb24gPT09IGVuZFBvc2l0aW9uKSB7XG4gICAgcmV0dXJuIHVwZGF0ZShzdGF0ZSwge3NjaGVkdWxpbmc6IHtcbiAgICAgIHN0YXR1czogeyRzZXQ6ICdlbmQnfVxuICAgIH19KTtcbiAgfVxuICByZXR1cm4gdXBkYXRlKHN0YXRlLCB7c2NoZWR1bGluZzoge1xuICAgIHBvc2l0aW9uOiB7JHNldDogcG9zaXRpb24gKyAxfVxuICB9fSk7XG59XG5cbmZ1bmN0aW9uIHNjaGVkdWxpbmdMYXRlUmVkdWNlciAoc3RhdGUpIHtcbiAgY29uc3Qge3Rhc2tEYXRhLCByb3RvcnMsIHNjaGVkdWxpbmd9ID0gc3RhdGU7XG4gIGlmICghdGFza0RhdGEpIHtcbiAgICByZXR1cm4gc3RhdGU7XG4gIH1cbiAgY29uc3Qge2FscGhhYmV0LCBjaXBoZXJUZXh0fSA9IHRhc2tEYXRhO1xuICBjb25zdCB7cG9zaXRpb259ID0gc2NoZWR1bGluZztcbiAgLyogQ29tcHV0ZSB0aGUgcm90b3Igc2hpZnRzIGF0IHRoZSBjdXJyZW50IHBvc2l0aW9uICovXG4gIGNvbnN0IHNoaWZ0cyA9IHJvdG9ycy5tYXAocm90b3IgPT4gZ2V0Um90b3JTaGlmdChyb3RvciwgcG9zaXRpb24pKTtcbiAgY29uc3QgcmFuayA9IGFscGhhYmV0LmluZGV4T2YoY2lwaGVyVGV4dFtwb3NpdGlvbl0pO1xuICAvKiBBcHBseSB0aGUgcm90b3JzIGF0IHRoZSBjdXJyZW50IHBvc2l0aW9uIHRvIG9idGFpbiBhIHRyYWNlIChsaXN0IG9mIHJvdG9yXG4gICAgIGNlbGxzIHVzZWQgZHVyaW5nIGRlY29kaW5nKSwgdG8gYmUgaGlnaGxpZ2h0ZWQgYnkgdGhlIHJvdG9yIHZpZXdzLiAqL1xuICBjb25zdCBjdXJyZW50VHJhY2UgPSByYW5rID09PSAtMSA/IG51bGwgOiBhcHBseVJvdG9ycyhyb3RvcnMsIHBvc2l0aW9uLCByYW5rKS50cmFjZTtcbiAgcmV0dXJuIHVwZGF0ZShzdGF0ZSwge3NjaGVkdWxpbmc6IHtcbiAgICBzaGlmdHM6IHskc2V0OiBzaGlmdHN9LCBjdXJyZW50VHJhY2U6IHskc2V0OiBjdXJyZW50VHJhY2V9XG4gIH19KTtcbn1cblxuZnVuY3Rpb24qIHNjaGVkdWxpbmdTYWdhICgpIHtcbiAgY29uc3Qge3NjaGVkdWxpbmdUaWNrfSA9IHlpZWxkIHNlbGVjdCgoe2FjdGlvbnN9KSA9PiBhY3Rpb25zKTtcbiAgY29uc3Qgc3RhdHVzQ2hhbmdpbmdBY3Rpb25zID0geWllbGQgc2VsZWN0KCh7YWN0aW9uc30pID0+IFsnc2NoZWR1bGluZ1N0YXR1c0NoYW5nZWQnLCAnc2NoZWR1bGluZ1N0ZXBCYWNrd2FyZCcsICdzY2hlZHVsaW5nU3RlcEZvcndhcmQnLCAnc2NoZWR1bGluZ0p1bXAnXS5tYXAobmFtZSA9PiBhY3Rpb25zW25hbWVdKSk7XG4gIHlpZWxkIHRha2VMYXRlc3Qoc3RhdHVzQ2hhbmdpbmdBY3Rpb25zLCBmdW5jdGlvbiogKCkge1xuICAgIGxldCBzdGF0dXMgPSB5aWVsZCBzZWxlY3QoKHtzY2hlZHVsaW5nOiB7c3RhdHVzfX0pID0+IHN0YXR1cyk7XG4gICAgaWYgKHN0YXR1cyA9PT0gJ3BsYXknKSB7XG4gICAgICB3aGlsZSAodHJ1ZSkge1xuICAgICAgICB5aWVsZCBwdXQoe3R5cGU6IHNjaGVkdWxpbmdUaWNrfSk7XG4gICAgICAgIHN0YXR1cyA9IHlpZWxkIHNlbGVjdCgoe3NjaGVkdWxpbmc6IHtzdGF0dXN9fSkgPT4gc3RhdHVzKTtcbiAgICAgICAgaWYgKCdwbGF5JyAhPT0gc3RhdHVzKSB7XG4gICAgICAgICAgcmV0dXJuOyAvKiByZWFjaGVkIGVuZCBvZiB0ZXh0ICovXG4gICAgICAgIH1cbiAgICAgICAgeWllbGQgZGVsYXkoMTAwMCk7XG4gICAgICB9XG4gICAgfVxuICB9KTtcbn1cblxuZnVuY3Rpb24gU2NoZWR1bGluZ0NvbnRyb2xzU2VsZWN0b3IgKHN0YXRlKSB7XG4gIGNvbnN0IHthY3Rpb25zLCB0YXNrRGF0YToge2FscGhhYmV0fSwgc2NoZWR1bGluZzoge3N0YXR1c319ID0gc3RhdGU7XG4gIGNvbnN0IHtzY2hlZHVsaW5nU3RhdHVzQ2hhbmdlZCwgc2NoZWR1bGluZ1N0ZXBCYWNrd2FyZCwgc2NoZWR1bGluZ1N0ZXBGb3J3YXJkfSA9IGFjdGlvbnM7XG4gIGNvbnN0IGFscGhhYmV0U2l6ZSA9IGFscGhhYmV0Lmxlbmd0aDtcbiAgcmV0dXJuIHtzY2hlZHVsaW5nU3RhdHVzQ2hhbmdlZCwgc2NoZWR1bGluZ1N0ZXBCYWNrd2FyZCwgc2NoZWR1bGluZ1N0ZXBGb3J3YXJkLCBzdGF0dXMsIGFscGhhYmV0U2l6ZX07XG59XG5cbmNsYXNzIFNjaGVkdWxpbmdDb250cm9sc1ZpZXcgZXh0ZW5kcyBSZWFjdC5QdXJlQ29tcG9uZW50IHtcbiAgcmVuZGVyICgpIHtcbiAgICBjb25zdCB7YWxwaGFiZXRTaXplLCBzdGF0dXN9ID0gdGhpcy5wcm9wcztcbiAgICByZXR1cm4gKFxuICAgICAgPGRpdiBzdHlsZT17e3dpZHRoOiBgJHsyMCphbHBoYWJldFNpemV9cHhgLCBtYXJnaW46ICcwIGF1dG8nLCB0ZXh0QWxpZ246ICdjZW50ZXInfX0+XG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPSdidG4tZ3JvdXAnPlxuICAgICAgICAgIDxCdXR0b24gb25DbGljaz17dGhpcy5vbkZhc3RCYWNrd2FyZENsaWNrZWR9IHN0eWxlPXt7d2lkdGg6ICc0MHB4J319IGFjdGl2ZT17c3RhdHVzID09PSAnc3RhcnQnfT48aSBjbGFzc05hbWU9J2ZhIGZhLWZhc3QtYmFja3dhcmQnLz48L0J1dHRvbj5cbiAgICAgICAgICA8QnV0dG9uIG9uQ2xpY2s9e3RoaXMub25TdGVwQmFja3dhcmRDbGlja2VkfSBzdHlsZT17e3dpZHRoOiAnNDBweCd9fT48aSBjbGFzc05hbWU9J2ZhIGZhLXN0ZXAtYmFja3dhcmQnLz48L0J1dHRvbj5cbiAgICAgICAgICA8QnV0dG9uIG9uQ2xpY2s9e3RoaXMub25QbGF5Q2xpY2tlZH0gc3R5bGU9e3t3aWR0aDogJzQwcHgnfX0gYWN0aXZlPXtzdGF0dXMgPT09ICdwbGF5J30+PGkgY2xhc3NOYW1lPSdmYSBmYS1wbGF5Jy8+PC9CdXR0b24+XG4gICAgICAgICAgPEJ1dHRvbiBvbkNsaWNrPXt0aGlzLm9uU3RlcEZvcndhcmRDbGlja2VkfSBzdHlsZT17e3dpZHRoOiAnNDBweCd9fT48aSBjbGFzc05hbWU9J2ZhIGZhLXN0ZXAtZm9yd2FyZCcvPjwvQnV0dG9uPlxuICAgICAgICAgIDxCdXR0b24gb25DbGljaz17dGhpcy5vbkZhc3RGb3J3YXJkQ2xpY2tlZH0gc3R5bGU9e3t3aWR0aDogJzQwcHgnfX0gYWN0aXZlPXtzdGF0dXMgPT09ICdlbmQnfT48aSBjbGFzc05hbWU9J2ZhIGZhLWZhc3QtZm9yd2FyZCcvPjwvQnV0dG9uPlxuICAgICAgICA8L2Rpdj5cbiAgICAgIDwvZGl2PlxuICAgICk7XG4gIH1cbiAgb25GYXN0QmFja3dhcmRDbGlja2VkID0gKF9ldmVudCkgPT4ge1xuICAgIHRoaXMucHJvcHMuZGlzcGF0Y2goe3R5cGU6IHRoaXMucHJvcHMuc2NoZWR1bGluZ1N0YXR1c0NoYW5nZWQsIHBheWxvYWQ6IHtzdGF0dXM6ICdzdGFydCd9fSk7XG4gIH07XG4gIG9uU3RlcEJhY2t3YXJkQ2xpY2tlZCA9IChfZXZlbnQpID0+IHtcbiAgICB0aGlzLnByb3BzLmRpc3BhdGNoKHt0eXBlOiB0aGlzLnByb3BzLnNjaGVkdWxpbmdTdGVwQmFja3dhcmR9KTtcbiAgfTtcbiAgb25QbGF5Q2xpY2tlZCA9IChfZXZlbnQpID0+IHtcbiAgICB0aGlzLnByb3BzLmRpc3BhdGNoKHt0eXBlOiB0aGlzLnByb3BzLnNjaGVkdWxpbmdTdGF0dXNDaGFuZ2VkLCBwYXlsb2FkOiB7c3RhdHVzOiAncGxheSd9fSk7XG4gIH07XG4gIG9uU3RlcEZvcndhcmRDbGlja2VkID0gKF9ldmVudCkgPT4ge1xuICAgIHRoaXMucHJvcHMuZGlzcGF0Y2goe3R5cGU6IHRoaXMucHJvcHMuc2NoZWR1bGluZ1N0ZXBGb3J3YXJkfSk7XG4gIH07XG4gIG9uRmFzdEZvcndhcmRDbGlja2VkID0gKF9ldmVudCkgPT4ge1xuICAgIHRoaXMucHJvcHMuZGlzcGF0Y2goe3R5cGU6IHRoaXMucHJvcHMuc2NoZWR1bGluZ1N0YXR1c0NoYW5nZWQsIHBheWxvYWQ6IHtzdGF0dXM6ICdlbmQnfX0pO1xuICB9O1xufVxuXG5leHBvcnQgZGVmYXVsdCB7XG4gIGFjdGlvbnM6IHtcbiAgICBzY2hlZHVsaW5nU3RhdHVzQ2hhbmdlZDogJ1NjaGVkdWxpbmcuU3RhdHVzLkNoYW5nZWQnLFxuICAgIHNjaGVkdWxpbmdTdGVwQmFja3dhcmQ6ICdTY2hlZHVsaW5nLlN0ZXBCYWNrd2FyZCcsXG4gICAgc2NoZWR1bGluZ1N0ZXBGb3J3YXJkOiAnU2NoZWR1bGluZy5TdGVwRm9yd2FyZCcsXG4gICAgc2NoZWR1bGluZ0p1bXA6ICdTY2hlZHVsaW5nLkp1bXAnLFxuICAgIHNjaGVkdWxpbmdUaWNrOiAnU2NoZWR1bGluZy5UaWNrJyxcbiAgfSxcbiAgYWN0aW9uUmVkdWNlcnM6IHtcbiAgICBhcHBJbml0OiBhcHBJbml0UmVkdWNlcixcbiAgICB0YXNrSW5pdDogdGFza0luaXRSZWR1Y2VyLFxuICAgIHNjaGVkdWxpbmdTdGF0dXNDaGFuZ2VkOiBzY2hlZHVsaW5nU3RhdHVzQ2hhbmdlZFJlZHVjZXIsXG4gICAgc2NoZWR1bGluZ1N0ZXBCYWNrd2FyZDogc2NoZWR1bGluZ1N0ZXBCYWNrd2FyZFJlZHVjZXIsXG4gICAgc2NoZWR1bGluZ1N0ZXBGb3J3YXJkOiBzY2hlZHVsaW5nU3RlcEZvcndhcmRSZWR1Y2VyLFxuICAgIHNjaGVkdWxpbmdKdW1wOiBzY2hlZHVsaW5nSnVtcFJlZHVjZXIsXG4gICAgc2NoZWR1bGluZ1RpY2s6IHNjaGVkdWxpbmdUaWNrUmVkdWNlcixcbiAgfSxcbiAgbGF0ZVJlZHVjZXI6IHNjaGVkdWxpbmdMYXRlUmVkdWNlcixcbiAgc2FnYTogc2NoZWR1bGluZ1NhZ2EsXG4gIHZpZXdzOiB7XG4gICAgU2NoZWR1bGluZ0NvbnRyb2xzOiBjb25uZWN0KFNjaGVkdWxpbmdDb250cm9sc1NlbGVjdG9yKShTY2hlZHVsaW5nQ29udHJvbHNWaWV3KSxcbiAgfVxufTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9zY2hlZHVsaW5nX2J1bmRsZS5qcyIsIlxuaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCB7Y29ubmVjdH0gZnJvbSAncmVhY3QtcmVkdXgnO1xuaW1wb3J0IGNsYXNzbmFtZXMgZnJvbSAnY2xhc3NuYW1lcyc7XG5pbXBvcnQge3JhbmdlfSBmcm9tICdyYW5nZSc7XG5pbXBvcnQgdXBkYXRlIGZyb20gJ2ltbXV0YWJpbGl0eS1oZWxwZXInO1xuXG5pbXBvcnQge3dyYXBBcm91bmQsIG1ha2VSb3RvciwgZWRpdFJvdG9yQ2VsbCwgbG9ja1JvdG9yQ2VsbCwgdXBkYXRlUm90b3JXaXRoS2V5fSBmcm9tICcuL3V0aWxzJztcblxuZnVuY3Rpb24gYXBwSW5pdFJlZHVjZXIgKHN0YXRlLCBfYWN0aW9uKSB7XG4gIHJldHVybiB7Li4uc3RhdGUsIHJvdG9yczogW10sIGVkaXRpbmc6IHt9fTtcbn1cblxuZnVuY3Rpb24gcm90b3JDZWxsRWRpdFN0YXJ0ZWRSZWR1Y2VyIChzdGF0ZSwge3BheWxvYWQ6IHtyb3RvckluZGV4LCBjZWxsUmFua319KSB7XG4gIGxldCB7dGFza0RhdGE6IHthbHBoYWJldH0sIHJvdG9yc30gPSBzdGF0ZTtcbiAgcm90b3JJbmRleCA9IHdyYXBBcm91bmQocm90b3JJbmRleCwgcm90b3JzLmxlbmd0aCk7XG4gIGNlbGxSYW5rID0gd3JhcEFyb3VuZChjZWxsUmFuaywgYWxwaGFiZXQubGVuZ3RoKTtcbiAgcmV0dXJuIHVwZGF0ZShzdGF0ZSwge2VkaXRpbmc6IHskc2V0OiB7cm90b3JJbmRleCwgY2VsbFJhbmt9fX0pO1xufVxuXG5mdW5jdGlvbiByb3RvckNlbGxFZGl0TW92ZWRSZWR1Y2VyIChzdGF0ZSwge3BheWxvYWQ6IHtyb3Rvck1vdmUsIGNlbGxNb3ZlfX0pIHtcbiAgbGV0IHt0YXNrRGF0YToge2FscGhhYmV0fSwgcm90b3JzLCBlZGl0aW5nOiB7cm90b3JJbmRleCwgY2VsbFJhbmt9fSA9IHN0YXRlO1xuICBsZXQgcm90b3JTdG9wID0gcm90b3JJbmRleCwgY2VsbFN0b3AgPSBjZWxsUmFuaztcbiAgaWYgKHJvdG9ySW5kZXggPT09IHVuZGVmaW5lZCB8fCBjZWxsUmFuayA9PT0gdW5kZWZpbmVkKSByZXR1cm4gc3RhdGU7XG4gIGxldCBjZWxsO1xuICBkbyB7XG4gICAgcm90b3JJbmRleCA9IHdyYXBBcm91bmQocm90b3JJbmRleCArIHJvdG9yTW92ZSwgcm90b3JzLmxlbmd0aCk7XG4gICAgY2VsbFJhbmsgPSB3cmFwQXJvdW5kKGNlbGxSYW5rICsgY2VsbE1vdmUsIGFscGhhYmV0Lmxlbmd0aCk7XG4gICAgY2VsbCA9IHJvdG9yc1tyb3RvckluZGV4XS5jZWxsc1tjZWxsUmFua107XG4gICAgLyogSWYgd2UgbG9vcGVkIGJhY2sgdG8gdGhlIHN0YXJ0aW5nIHBvaW50LCB0aGUgbW92ZSBpcyBpbXBvc3NpYmxlLiAqL1xuICAgIGlmIChyb3RvclN0b3AgPT0gcm90b3JJbmRleCB8fCBjZWxsU3RvcCA9PSBjZWxsUmFuaykgcmV0dXJuIHN0YXRlO1xuICB9IHdoaWxlIChjZWxsLmhpbnQgfHwgY2VsbC5sb2NrZWQpO1xuICByZXR1cm4gdXBkYXRlKHN0YXRlLCB7ZWRpdGluZzogeyRzZXQ6IHtyb3RvckluZGV4LCBjZWxsUmFua319fSk7XG59XG5cbmZ1bmN0aW9uIHJvdG9yQ2VsbEVkaXRDYW5jZWxsZWRSZWR1Y2VyIChzdGF0ZSwgX2FjdGlvbikge1xuICByZXR1cm4gdXBkYXRlKHN0YXRlLCB7ZWRpdGluZzogeyRzZXQ6IHt9fX0pO1xufVxuXG5mdW5jdGlvbiByb3RvckNlbGxDaGFyQ2hhbmdlZFJlZHVjZXIgKHN0YXRlLCB7cGF5bG9hZDoge3JvdG9ySW5kZXgsIHJhbmssIHN5bWJvbH19KSB7XG4gIGxldCB7dGFza0RhdGE6IHthbHBoYWJldH0sIHJvdG9yc30gPSBzdGF0ZTtcbiAgaWYgKHN5bWJvbC5sZW5ndGggIT09IDEgfHwgLTEgPT09IGFscGhhYmV0LmluZGV4T2Yoc3ltYm9sKSkge1xuICAgIHN5bWJvbCA9IG51bGw7XG4gIH1cbiAgY29uc3Qgcm90b3IgPSBlZGl0Um90b3JDZWxsKHJvdG9yc1tyb3RvckluZGV4XSwgcmFuaywgc3ltYm9sKTtcbiAgcmV0dXJuIHVwZGF0ZShzdGF0ZSwge3JvdG9yczoge1tyb3RvckluZGV4XTogeyRzZXQ6IHJvdG9yfX19KTtcbn1cblxuZnVuY3Rpb24gcm90b3JDZWxsTG9ja0NoYW5nZWRSZWR1Y2VyIChzdGF0ZSwge3BheWxvYWQ6IHtyb3RvckluZGV4LCByYW5rLCBpc0xvY2tlZH19KSB7XG4gIGNvbnN0IHJvdG9yID0gbG9ja1JvdG9yQ2VsbChzdGF0ZS5yb3RvcnNbcm90b3JJbmRleF0sIHJhbmssIGlzTG9ja2VkKTtcbiAgcmV0dXJuIHVwZGF0ZShzdGF0ZSwge3JvdG9yczoge1tyb3RvckluZGV4XTogeyRzZXQ6IHJvdG9yfX19KTtcbn1cblxuZnVuY3Rpb24gcm90b3JLZXlMb2FkZWRSZWR1Y2VyIChzdGF0ZSwge3BheWxvYWQ6IHtyb3RvckluZGV4LCBrZXl9fSkge1xuICBjb25zdCB7dGFza0RhdGE6IHthbHBoYWJldH0sIHJvdG9yc30gPSBzdGF0ZTtcbiAgY29uc3Qgcm90b3IgPSB1cGRhdGVSb3RvcldpdGhLZXkoYWxwaGFiZXQsIHJvdG9yc1tyb3RvckluZGV4XSwga2V5KTtcbiAgcmV0dXJuIHVwZGF0ZShzdGF0ZSwge3JvdG9yczoge1tyb3RvckluZGV4XTogeyRzZXQ6IHJvdG9yfX19KTtcbn1cblxuZnVuY3Rpb24gUm90b3JTZWxlY3RvciAoc3RhdGUsIHtpbmRleH0pIHtcbiAgY29uc3Qge1xuICAgIGFjdGlvbnM6IHtcbiAgICAgIHJvdG9yQ2VsbExvY2tDaGFuZ2VkLCByb3RvckNlbGxDaGFyQ2hhbmdlZCxcbiAgICAgIHJvdG9yQ2VsbEVkaXRDYW5jZWxsZWQsIHJvdG9yQ2VsbEVkaXRTdGFydGVkLCByb3RvckNlbGxFZGl0TW92ZWRcbiAgICB9LFxuICAgIHJvdG9ycywgc2NoZWR1bGluZzoge3NoaWZ0cywgY3VycmVudFRyYWNlfSwgZWRpdGluZ1xuICB9ID0gc3RhdGU7XG4gIGNvbnN0IHtlZGl0YWJsZVJvdywgY2VsbHN9ID0gcm90b3JzW2luZGV4XTtcbiAgY29uc3Qgc2hpZnQgPSBzaGlmdHNbaW5kZXhdO1xuICBjb25zdCBhY3RpdmVSYW5rID0gY3VycmVudFRyYWNlW2luZGV4XSAmJiBjdXJyZW50VHJhY2VbaW5kZXhdLnJhbms7XG4gIGNvbnN0IGVkaXRpbmdSYW5rID0gZWRpdGluZy5yb3RvckluZGV4ID09PSBpbmRleCA/IGVkaXRpbmcuY2VsbFJhbmsgOiBudWxsO1xuICByZXR1cm4ge1xuICAgIHJvdG9yQ2VsbEVkaXRTdGFydGVkLCByb3RvckNlbGxFZGl0Q2FuY2VsbGVkLCByb3RvckNlbGxFZGl0TW92ZWQsXG4gICAgcm90b3JDZWxsTG9ja0NoYW5nZWQsIHJvdG9yQ2VsbENoYXJDaGFuZ2VkLFxuICAgIGVkaXRhYmxlUm93LCBjZWxscywgc2hpZnQsIGVkaXRpbmdSYW5rLCBhY3RpdmVSYW5rXG4gIH07XG59XG5cbmNsYXNzIFJvdG9yVmlldyBleHRlbmRzIFJlYWN0LlB1cmVDb21wb25lbnQge1xuICByZW5kZXIgKCkge1xuICAgIGNvbnN0IHtpbmRleCwgZWRpdGFibGVSb3csIGNlbGxzLCBzaGlmdCwgZWRpdGluZ1JhbmssIGFjdGl2ZVJhbmt9ID0gdGhpcy5wcm9wcztcbiAgICBjb25zdCBuYkNlbGxzID0gY2VsbHMubGVuZ3RoO1xuICAgIHJldHVybiAoXG4gICAgICA8ZGl2IHN0eWxlPXt7d2lkdGg6IGAkezIwKm5iQ2VsbHN9cHhgfX0+XG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPSdjbGVhcmZpeCc+XG4gICAgICAgICAge3JhbmdlKDAsIG5iQ2VsbHMpLm1hcChyYW5rID0+IHtcbiAgICAgICAgICAgIGNvbnN0IHtlZGl0YWJsZSwgbG9ja2VkLCBjb25mbGljdCwgaGludH0gPSBjZWxsc1tyYW5rXTtcbiAgICAgICAgICAgIGNvbnN0IGlzQWN0aXZlID0gYWN0aXZlUmFuayA9PT0gcmFuaztcbiAgICAgICAgICAgIGNvbnN0IGlzRWRpdGluZyA9IGVkaXRpbmdSYW5rID09PSByYW5rICYmICFsb2NrZWQgJiYgIWhpbnQ7XG4gICAgICAgICAgICBjb25zdCBpc0xhc3QgPSBuYkNlbGxzID09PSByYW5rICsgMTtcbiAgICAgICAgICAgIGNvbnN0IHNoaWZ0ZWRJbmRleCA9IChyYW5rICsgc2hpZnQpICUgbmJDZWxscztcbiAgICAgICAgICAgIGNvbnN0IHtyb3RhdGluZ30gPSBjZWxsc1tzaGlmdGVkSW5kZXhdO1xuICAgICAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgICAgPFJvdG9yQ2VsbCBrZXk9e3Jhbmt9IHJhbms9e3Jhbmt9IGlzTGFzdD17aXNMYXN0fSBlZGl0YWJsZVJvdz17ZWRpdGFibGVSb3d9XG4gICAgICAgICAgICAgICAgc3RhdGljQ2hhcj17cm90YXRpbmd9IGVkaXRhYmxlQ2hhcj17ZWRpdGFibGV9IGlzTG9ja2VkPXtsb2NrZWR9IGlzSGludD17aGludH0gaXNFZGl0aW5nPXtpc0VkaXRpbmd9IGlzQWN0aXZlPXtpc0FjdGl2ZX1cbiAgICAgICAgICAgICAgICBvbkNoYW5nZUNoYXI9e3RoaXMub25DaGFuZ2VDaGFyfSBvbkNoYW5nZUxvY2tlZD17dGhpcy5vbkNoYW5nZUxvY2tlZH1cbiAgICAgICAgICAgICAgICBvbkVkaXRpbmdTdGFydGVkPXt0aGlzLm9uRWRpdGluZ1N0YXJ0ZWR9IG9uRWRpdGluZ0NhbmNlbGxlZD17dGhpcy5vbkVkaXRpbmdDYW5jZWxsZWR9XG4gICAgICAgICAgICAgICAgb25FZGl0aW5nTW92ZWQ9e3RoaXMuZWRpdGluZ01vdmVkfSBpc0NvbmZsaWN0PXtjb25mbGljdH0gLz4pO1xuICAgICAgICAgIH0pfVxuICAgICAgICA8L2Rpdj5cbiAgICAgIDwvZGl2PlxuICAgICk7XG4gIH1cbiAgb25FZGl0aW5nU3RhcnRlZCA9IChyYW5rKSA9PiB7XG4gICAgdGhpcy5wcm9wcy5kaXNwYXRjaCh7dHlwZTogdGhpcy5wcm9wcy5yb3RvckNlbGxFZGl0U3RhcnRlZCwgcGF5bG9hZDoge3JvdG9ySW5kZXg6IHRoaXMucHJvcHMuaW5kZXgsIGNlbGxSYW5rOiByYW5rfX0pO1xuICB9O1xuICBvbkVkaXRpbmdDYW5jZWxsZWQgPSAoKSA9PiB7XG4gICAgdGhpcy5wcm9wcy5kaXNwYXRjaCh7dHlwZTogdGhpcy5wcm9wcy5yb3RvckNlbGxFZGl0Q2FuY2VsbGVkfSk7XG4gIH07XG4gIG9uQ2hhbmdlQ2hhciA9IChyYW5rLCBzeW1ib2wpID0+IHtcbiAgICBzeW1ib2wgPSBzeW1ib2wudG9VcHBlckNhc2UoKTtcbiAgICB0aGlzLnByb3BzLmRpc3BhdGNoKHt0eXBlOiB0aGlzLnByb3BzLnJvdG9yQ2VsbENoYXJDaGFuZ2VkLCBwYXlsb2FkOiB7cm90b3JJbmRleDogdGhpcy5wcm9wcy5pbmRleCwgcmFuaywgc3ltYm9sfX0pO1xuICB9O1xuICBvbkNoYW5nZUxvY2tlZCA9IChyYW5rLCBpc0xvY2tlZCkgPT4ge1xuICAgIHRoaXMucHJvcHMuZGlzcGF0Y2goe3R5cGU6IHRoaXMucHJvcHMucm90b3JDZWxsTG9ja0NoYW5nZWQsIHBheWxvYWQ6IHtyb3RvckluZGV4OiB0aGlzLnByb3BzLmluZGV4LCByYW5rLCBpc0xvY2tlZH19KTtcbiAgfTtcbiAgZWRpdGluZ01vdmVkID0gKHJvdG9yTW92ZSwgY2VsbE1vdmUpID0+IHtcbiAgICB0aGlzLnByb3BzLmRpc3BhdGNoKHt0eXBlOiB0aGlzLnByb3BzLnJvdG9yQ2VsbEVkaXRNb3ZlZCwgcGF5bG9hZDoge3JvdG9yTW92ZSwgY2VsbE1vdmV9fSk7XG4gIH07XG59XG5cbmNsYXNzIFJvdG9yQ2VsbCBleHRlbmRzIFJlYWN0LlB1cmVDb21wb25lbnQge1xuICAvKiBYWFggQ2xpY2tpbmcgaW4gdGhlIGVkaXRhYmxlIGRpdiBhbmQgZW50ZXJpbmcgdGhlIHNhbWUgbGV0dGVyIGRvZXMgbm90XG4gICAgICAgICB0cmlnZ2VyIGEgY2hhbmdlIGV2ZW50LiAgVGhpcyBiZWhhdmlvciBpcyB1bmZvcnR1bmF0ZS4gKi9cbiAgcmVuZGVyICgpIHtcbiAgICBjb25zdCB7c3RhdGljQ2hhciwgZWRpdGFibGVDaGFyLCBpc0xvY2tlZCwgaXNIaW50LCBpc0FjdGl2ZSwgaXNFZGl0aW5nLCBlZGl0YWJsZVJvdywgaXNMYXN0LCBpc0NvbmZsaWN0fSA9IHRoaXMucHJvcHM7XG4gICAgY29uc3QgY29sdW1uU3R5bGUgPSB7XG4gICAgICBmbG9hdDogJ2xlZnQnLFxuICAgICAgd2lkdGg6ICcyMHB4JyxcbiAgICB9O1xuICAgIGNvbnN0IHN0YXRpY0NlbGxTdHlsZSA9IHtcbiAgICAgIGJvcmRlcjogJzFweCBzb2xpZCBibGFjaycsXG4gICAgICBib3JkZXJSaWdodFdpZHRoOiBpc0xhc3QgPyAnMXB4JyA6ICcwJyxcbiAgICAgIHRleHRBbGlnbjogJ2NlbnRlcicsXG4gICAgfTtcbiAgICBjb25zdCBlZGl0YWJsZUNlbGxTdHlsZSA9IHtcbiAgICAgIGJvcmRlcjogJzFweCBzb2xpZCBibGFjaycsXG4gICAgICBib3JkZXJSaWdodFdpZHRoOiBpc0xhc3QgPyAnMXB4JyA6ICcwJyxcbiAgICAgIHRleHRBbGlnbjogJ2NlbnRlcicsXG4gICAgICBjdXJzb3I6ICd0ZXh0JyxcbiAgICAgIGJhY2tncm91bmRDb2xvcjogaXNIaW50ID8gJyNhZmEnIDogKGlzQ29uZmxpY3QgPyAnI2ZjYycgOiAnI2ZmZicpXG4gICAgfTtcbiAgICAvKiBBcHBseSBhY3RpdmUtc3RhdHVzIHNlcGFyYXRpb24gYm9yZGVyIHN0eWxlLiAqL1xuICAgIGNvbnN0IGJvdHRvbUNlbGxTdHlsZSA9IGVkaXRhYmxlUm93ID09PSAndG9wJyA/IHN0YXRpY0NlbGxTdHlsZSA6IGVkaXRhYmxlQ2VsbFN0eWxlO1xuICAgIGlmIChpc0FjdGl2ZSkge1xuICAgICAgYm90dG9tQ2VsbFN0eWxlLm1hcmdpblRvcCA9ICcwJztcbiAgICAgIGJvdHRvbUNlbGxTdHlsZS5ib3JkZXJUb3BXaWR0aCA9ICczcHgnO1xuICAgIH0gZWxzZSB7XG4gICAgICBib3R0b21DZWxsU3R5bGUubWFyZ2luVG9wID0gJzJweCc7XG4gICAgICBib3R0b21DZWxsU3R5bGUuYm9yZGVyVG9wV2lkdGggPSAnMXB4JzsgLyogbmVlZGVkIGJlY2F1c2UgcmVhY3QgKi9cbiAgICB9XG4gICAgY29uc3Qgc3RhdGljQ2VsbCA9IChcbiAgICAgIDxkaXYgc3R5bGU9e3N0YXRpY0NlbGxTdHlsZX0+XG4gICAgICAgIHtzdGF0aWNDaGFyIHx8ICdcXHUwMEEwJ31cbiAgICAgIDwvZGl2PlxuICAgICk7XG4gICAgY29uc3QgZWRpdGFibGVDZWxsID0gKFxuICAgICAgPGRpdiBzdHlsZT17ZWRpdGFibGVDZWxsU3R5bGV9IG9uQ2xpY2s9e3RoaXMuc3RhcnRFZGl0aW5nfT5cbiAgICAgICAge2lzRWRpdGluZ1xuICAgICAgICAgID8gPGlucHV0IHJlZj17dGhpcy5yZWZJbnB1dH0gb25DaGFuZ2U9e3RoaXMuY2VsbENoYW5nZWR9IG9uS2V5RG93bj17dGhpcy5rZXlEb3dufVxuICAgICAgICAgICAgICB0eXBlPSd0ZXh0JyB2YWx1ZT17ZWRpdGFibGVDaGFyfHwnJ30gc3R5bGU9e3t3aWR0aDogJzE5cHgnLCBoZWlnaHQ6ICcyMHB4JywgYm9yZGVyOiAnbm9uZScsIHRleHRBbGlnbjogJ2NlbnRlcid9fSAvPlxuICAgICAgICAgIDogKGVkaXRhYmxlQ2hhciB8fCAnXFx1MDBBMCcpfVxuICAgICAgPC9kaXY+XG4gICAgKTtcbiAgICBjb25zdCBsb2NrID0gKFxuICAgICAgPGRpdiBzdHlsZT17e21hcmdpblRvcDogJzJweCcsIHRleHRBbGlnbjogJ2NlbnRlcicsIGN1cnNvcjogJ3BvaW50ZXInfX0gb25DbGljaz17dGhpcy5sb2NrQ2xpY2tlZH0+XG4gICAgICAgIHtpc0hpbnQgfHwgPGkgY2xhc3NOYW1lPXtjbGFzc25hbWVzKFsnZmEnLCBpc0xvY2tlZCA/ICdmYS1sb2NrJyA6ICdmYS11bmxvY2stYWx0J10pfSAvPn1cbiAgICAgIDwvZGl2PlxuICAgICk7XG4gICAgaWYgKGVkaXRhYmxlUm93ID09PSAndG9wJykge1xuICAgICAgcmV0dXJuIChcbiAgICAgICAgPGRpdiBzdHlsZT17Y29sdW1uU3R5bGV9PlxuICAgICAgICAgIHtlZGl0YWJsZUNlbGx9e3N0YXRpY0NlbGx9e2xvY2t9XG4gICAgICAgIDwvZGl2PlxuICAgICAgKTtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIChcbiAgICAgICAgPGRpdiBzdHlsZT17Y29sdW1uU3R5bGV9PlxuICAgICAgICAgIHtzdGF0aWNDZWxsfXtlZGl0YWJsZUNlbGx9e2xvY2t9XG4gICAgICAgIDwvZGl2PlxuICAgICAgKTtcbiAgICB9XG4gIH1cbiAgY29tcG9uZW50RGlkVXBkYXRlICgpIHtcbiAgICBpZiAodGhpcy5faW5wdXQpIHtcbiAgICAgIHRoaXMuX2lucHV0LnNlbGVjdCgpO1xuICAgICAgdGhpcy5faW5wdXQuZm9jdXMoKTtcbiAgICB9XG4gIH1cbiAgc3RhcnRFZGl0aW5nID0gKCkgPT4ge1xuICAgIGlmICghdGhpcy5wcm9wcy5pc0xvY2tlZCAmJiAhdGhpcy5wcm9wcy5pc0VkaXRpbmcpIHtcbiAgICAgIHRoaXMucHJvcHMub25FZGl0aW5nU3RhcnRlZCh0aGlzLnByb3BzLnJhbmspO1xuICAgIH1cbiAgfTtcbiAga2V5RG93biA9IChldmVudCkgPT4ge1xuICAgIGxldCBoYW5kbGVkID0gdHJ1ZTtcbiAgICBpZiAoZXZlbnQua2V5ID09PSAnQXJyb3dSaWdodCcpIHtcbiAgICAgIHRoaXMucHJvcHMub25FZGl0aW5nTW92ZWQoMCwgMSk7XG4gICAgfSBlbHNlIGlmIChldmVudC5rZXkgPT09ICdBcnJvd0xlZnQnKSB7XG4gICAgICB0aGlzLnByb3BzLm9uRWRpdGluZ01vdmVkKDAsIC0xKTtcbiAgICB9IGVsc2UgaWYgKGV2ZW50LmtleSA9PT0gJ0Fycm93VXAnKSB7XG4gICAgICB0aGlzLnByb3BzLm9uRWRpdGluZ01vdmVkKC0xLCAwKTtcbiAgICB9IGVsc2UgaWYgKGV2ZW50LmtleSA9PT0gJ0Fycm93RG93bicpIHtcbiAgICAgIHRoaXMucHJvcHMub25FZGl0aW5nTW92ZWQoMSwgMCk7XG4gICAgfSBlbHNlIGlmIChldmVudC5rZXkgPT09ICdFc2NhcGUnIHx8IGV2ZW50LmtleSA9PT0gJ0VudGVyJykge1xuICAgICAgdGhpcy5wcm9wcy5vbkVkaXRpbmdDYW5jZWxsZWQoKTtcbiAgICB9IGVsc2Uge1xuICAgICAgaGFuZGxlZCA9IGZhbHNlO1xuICAgIH1cbiAgICBpZiAoaGFuZGxlZCkge1xuICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgIGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xuICAgIH1cbiAgfTtcbiAgY2VsbENoYW5nZWQgPSAoKSA9PiB7XG4gICAgY29uc3QgdmFsdWUgPSB0aGlzLl9pbnB1dC52YWx1ZS5zdWJzdHIoLTEpOyAvKiAvIVxcIElFIGNvbXBhdGliaWxpdHkgKi9cbiAgICB0aGlzLnByb3BzLm9uQ2hhbmdlQ2hhcih0aGlzLnByb3BzLnJhbmssIHZhbHVlKTtcbiAgfTtcbiAgbG9ja0NsaWNrZWQgPSAoKSA9PiB7XG4gICAgdGhpcy5wcm9wcy5vbkNoYW5nZUxvY2tlZCh0aGlzLnByb3BzLnJhbmssICF0aGlzLnByb3BzLmlzTG9ja2VkKTtcbiAgfTtcbiAgcmVmSW5wdXQgPSAoZWxlbWVudCkgPT4ge1xuICAgIHRoaXMuX2lucHV0ID0gZWxlbWVudDtcbiAgfTtcbn1cblxuZXhwb3J0IGRlZmF1bHQge1xuICBhY3Rpb25zOiB7XG4gICAgcm90b3JDZWxsRWRpdFN0YXJ0ZWQ6ICdSb3Rvci5DZWxsLkVkaXQuU3RhcnRlZCcsXG4gICAgcm90b3JDZWxsRWRpdE1vdmVkOiAnUm90b3IuQ2VsbC5FZGl0Lk1vdmVkJyxcbiAgICByb3RvckNlbGxFZGl0Q2FuY2VsbGVkOiAnUm90b3IuQ2VsbC5FZGl0LkNhbmNlbGxlZCcsXG4gICAgcm90b3JDZWxsTG9ja0NoYW5nZWQ6ICdSb3Rvci5DZWxsLkxvY2suQ2hhbmdlZCcsXG4gICAgcm90b3JDZWxsQ2hhckNoYW5nZWQ6ICdSb3Rvci5DZWxsLkNoYXIuQ2hhbmdlZCcsXG4gICAgcm90b3JLZXlMb2FkZWQ6ICdSb3Rvci5LZXkuTG9hZGVkJyxcbiAgfSxcbiAgYWN0aW9uUmVkdWNlcnM6IHtcbiAgICBhcHBJbml0OiBhcHBJbml0UmVkdWNlcixcbiAgICByb3RvckNlbGxFZGl0U3RhcnRlZDogcm90b3JDZWxsRWRpdFN0YXJ0ZWRSZWR1Y2VyLFxuICAgIHJvdG9yQ2VsbEVkaXRNb3ZlZDogcm90b3JDZWxsRWRpdE1vdmVkUmVkdWNlcixcbiAgICByb3RvckNlbGxFZGl0Q2FuY2VsbGVkOiByb3RvckNlbGxFZGl0Q2FuY2VsbGVkUmVkdWNlcixcbiAgICByb3RvckNlbGxMb2NrQ2hhbmdlZDogcm90b3JDZWxsTG9ja0NoYW5nZWRSZWR1Y2VyLFxuICAgIHJvdG9yQ2VsbENoYXJDaGFuZ2VkOiByb3RvckNlbGxDaGFyQ2hhbmdlZFJlZHVjZXIsXG4gICAgcm90b3JLZXlMb2FkZWQ6IHJvdG9yS2V5TG9hZGVkUmVkdWNlcixcbiAgfSxcbiAgdmlld3M6IHtcbiAgICBSb3RvcjogY29ubmVjdChSb3RvclNlbGVjdG9yKShSb3RvclZpZXcpXG4gIH1cbn07XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvcm90b3JzX2J1bmRsZS5qcyIsIi8qXG4tIHNob3dzIGEgc2xpY2Ugb2YgdGhlIGNsZWFyVGV4dFxuLSBhZGRzIGRlY2lwaGVyZWQgY2hhcmFjdGVycyBmcm9tIHN0YXJ0IHVwIHRvIHRoZSBcImN1cnJlbnRcIiBhbmltYXRpb24gcG9zaXRpb25cbiAgKGxhemlseSBjb21wdXRlZClcbi0gc2Nyb2xsaW5nIGRvZXMgbm90IGFmZmVjdCB0aGUgY3VycmVudCBhbmltYXRpb24gcG9zaXRpb25cbiovXG5cblxuaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCB7Y29ubmVjdH0gZnJvbSAncmVhY3QtcmVkdXgnO1xuXG5pbXBvcnQge3VwZGF0ZUdyaWRHZW9tZXRyeSwgdXBkYXRlR3JpZFZpc2libGVSb3dzLCBhcHBseVJvdG9yc30gZnJvbSAnLi91dGlscyc7XG5cbmZ1bmN0aW9uIGFwcEluaXRSZWR1Y2VyIChzdGF0ZSwgX2FjdGlvbikge1xuICByZXR1cm4gey4uLnN0YXRlLCBkZWNpcGhlcmVkVGV4dDoge1xuICAgIGNlbGxXaWR0aDogMTUsXG4gICAgY2VsbEhlaWdodDogNDYsXG4gICAgc2Nyb2xsVG9wOiAwLFxuICAgIG5iQ2VsbHM6IDBcbiAgfX07XG59XG5cbmZ1bmN0aW9uIHRhc2tJbml0UmVkdWNlciAoc3RhdGUsIF9hY3Rpb24pIHtcbiAgbGV0IHtkZWNpcGhlcmVkVGV4dCwgdGFza0RhdGE6IHtjaXBoZXJUZXh0fX0gPSBzdGF0ZTtcbiAgZGVjaXBoZXJlZFRleHQgPSB7Li4uZGVjaXBoZXJlZFRleHQsIG5iQ2VsbHM6IGNpcGhlclRleHQubGVuZ3RofTtcbiAgcmV0dXJuIHsuLi5zdGF0ZSwgZGVjaXBoZXJlZFRleHR9O1xufVxuXG5mdW5jdGlvbiBkZWNpcGhlcmVkVGV4dFJlc2l6ZWRSZWR1Y2VyIChzdGF0ZSwge3BheWxvYWQ6IHt3aWR0aH19KSB7XG4gIGxldCB7ZGVjaXBoZXJlZFRleHR9ID0gc3RhdGU7XG4gIGRlY2lwaGVyZWRUZXh0ID0gey4uLmRlY2lwaGVyZWRUZXh0LCB3aWR0aCwgaGVpZ2h0OiA0ICogZGVjaXBoZXJlZFRleHQuY2VsbEhlaWdodH07XG4gIGRlY2lwaGVyZWRUZXh0ID0gdXBkYXRlR3JpZEdlb21ldHJ5KGRlY2lwaGVyZWRUZXh0KTtcbiAgcmV0dXJuIHsuLi5zdGF0ZSwgZGVjaXBoZXJlZFRleHR9O1xufVxuXG5mdW5jdGlvbiBkZWNpcGhlcmVkVGV4dFNjcm9sbGVkUmVkdWNlciAoc3RhdGUsIHtwYXlsb2FkOiB7c2Nyb2xsVG9wfX0pIHtcbiAgbGV0IHtkZWNpcGhlcmVkVGV4dH0gPSBzdGF0ZTtcbiAgZGVjaXBoZXJlZFRleHQgPSB7Li4uZGVjaXBoZXJlZFRleHQsIHNjcm9sbFRvcH07XG4gIHJldHVybiB7Li4uc3RhdGUsIGRlY2lwaGVyZWRUZXh0fTtcbn1cblxuZnVuY3Rpb24gZGVjaXBoZXJlZFRleHRMYXRlUmVkdWNlciAoc3RhdGUsIF9hY3Rpb24pIHtcbiAgaWYgKCFzdGF0ZS50YXNrRGF0YSkgcmV0dXJuIHN0YXRlO1xuICBsZXQge3Rhc2tEYXRhOiB7YWxwaGFiZXQsIGNpcGhlclRleHR9LCBzY2hlZHVsaW5nOiB7cG9zaXRpb259LCByb3RvcnMsIGRlY2lwaGVyZWRUZXh0fSA9IHN0YXRlO1xuICBmdW5jdGlvbiBnZXRDZWxsIChpbmRleCkge1xuICAgIGNvbnN0IGNpcGhlcmVkID0gY2lwaGVyVGV4dFtpbmRleF07XG4gICAgY29uc3QgY2VsbCA9IHtwb3NpdGlvbjogaW5kZXgsIGN1cnJlbnQ6IGluZGV4ID09PSBwb3NpdGlvbiwgY2lwaGVyZWR9O1xuICAgIGxldCByYW5rID0gYWxwaGFiZXQuaW5kZXhPZihjaXBoZXJlZCk7XG4gICAgaWYgKHJhbmsgPT09IC0xKSB7XG4gICAgICBjZWxsLmNsZWFyID0gY2lwaGVyZWQ7XG4gICAgfSBlbHNlIGlmIChpbmRleCA8PSBwb3NpdGlvbikge1xuICAgICAgT2JqZWN0LmFzc2lnbihjZWxsLCBhcHBseVJvdG9ycyhyb3RvcnMsIGluZGV4LCByYW5rKSk7XG4gICAgICBpZiAoY2VsbC5yYW5rICE9PSAtMSkge1xuICAgICAgICBjZWxsLmNsZWFyID0gYWxwaGFiZXRbY2VsbC5yYW5rXTtcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIGNlbGw7XG4gIH1cbiAgZGVjaXBoZXJlZFRleHQgPSB1cGRhdGVHcmlkVmlzaWJsZVJvd3MoZGVjaXBoZXJlZFRleHQsIHtnZXRDZWxsfSk7XG4gIHJldHVybiB7Li4uc3RhdGUsIGRlY2lwaGVyZWRUZXh0fTtcbn1cblxuZnVuY3Rpb24gRGVjaXBoZXJlZFRleHRWaWV3U2VsZWN0b3IgKHN0YXRlKSB7XG4gIGNvbnN0IHthY3Rpb25zLCBkZWNpcGhlcmVkVGV4dH0gPSBzdGF0ZTtcbiAgY29uc3Qge2RlY2lwaGVyZWRUZXh0UmVzaXplZCwgZGVjaXBoZXJlZFRleHRTY3JvbGxlZCwgc2NoZWR1bGluZ0p1bXB9ID0gYWN0aW9ucztcbiAgY29uc3Qge3dpZHRoLCBoZWlnaHQsIGNlbGxXaWR0aCwgY2VsbEhlaWdodCwgYm90dG9tLCBwYWdlUm93cywgcGFnZUNvbHVtbnMsIHZpc2libGV9ID0gZGVjaXBoZXJlZFRleHQ7XG4gIHJldHVybiB7XG4gICAgZGVjaXBoZXJlZFRleHRSZXNpemVkLCBkZWNpcGhlcmVkVGV4dFNjcm9sbGVkLCBzY2hlZHVsaW5nSnVtcCxcbiAgICB3aWR0aCwgaGVpZ2h0LCB2aXNpYmxlUm93czogdmlzaWJsZS5yb3dzLCBjZWxsV2lkdGgsIGNlbGxIZWlnaHQsIGJvdHRvbSwgcGFnZVJvd3MsIHBhZ2VDb2x1bW5zXG4gIH07XG59XG5cbmNsYXNzIERlY2lwaGVyZWRUZXh0VmlldyBleHRlbmRzIFJlYWN0LlB1cmVDb21wb25lbnQge1xuXG4gIHJlbmRlciAoKSB7XG4gICAgY29uc3Qge3dpZHRoLCBoZWlnaHQsIHZpc2libGVSb3dzLCBjZWxsV2lkdGgsIGNlbGxIZWlnaHQsIGJvdHRvbX0gPSB0aGlzLnByb3BzO1xuICAgIHJldHVybiAoXG4gICAgICA8ZGl2IHJlZj17dGhpcy5yZWZUZXh0Qm94fSBvblNjcm9sbD17dGhpcy5vblNjcm9sbH0gc3R5bGU9e3twb3NpdGlvbjogJ3JlbGF0aXZlJywgd2lkdGg6IHdpZHRoICYmIGAke3dpZHRofXB4YCwgaGVpZ2h0OiBoZWlnaHQgJiYgYCR7aGVpZ2h0fXB4YCwgb3ZlcmZsb3dZOiAnc2Nyb2xsJ319PlxuICAgICAgICB7KHZpc2libGVSb3dzfHxbXSkubWFwKCh7aW5kZXgsIGNvbHVtbnN9KSA9PlxuICAgICAgICAgIDxkaXYga2V5PXtpbmRleH0gc3R5bGU9e3twb3NpdGlvbjogJ2Fic29sdXRlJywgdG9wOiBgJHtpbmRleCAqIGNlbGxIZWlnaHR9cHhgfX0+XG4gICAgICAgICAgICB7Y29sdW1ucy5tYXAoKHtpbmRleCwgcG9zaXRpb24sIGNpcGhlcmVkLCBjbGVhciwgbG9ja2VkLCBjdXJyZW50fSkgPT5cbiAgICAgICAgICAgICAgPFRleHRDZWxsIGtleT17aW5kZXh9IGNvbHVtbj17aW5kZXh9IHBvc2l0aW9uPXtwb3NpdGlvbn0gY2lwaGVyZWQ9e2NpcGhlcmVkfSBjbGVhcj17Y2xlYXJ9IGxvY2tlZD17bG9ja2VkfSBjdXJyZW50PXtjdXJyZW50fSBjZWxsV2lkdGg9e2NlbGxXaWR0aH0gb25KdW1wPXt0aGlzLm9uSnVtcH0gLz4pfVxuICAgICAgICAgIDwvZGl2Pil9XG4gICAgICAgIDxkaXYgc3R5bGU9e3twb3NpdGlvbjogJ2Fic29sdXRlJywgdG9wOiBgJHtib3R0b219cHhgLCB3aWR0aDogJzFweCcsIGhlaWdodDogJzFweCd9fS8+XG4gICAgICA8L2Rpdj5cbiAgICApO1xuICB9XG5cbiAgcmVmVGV4dEJveCA9IChlbGVtZW50KSA9PiB7XG4gICAgdGhpcy5fdGV4dEJveCA9IGVsZW1lbnQ7XG4gICAgY29uc3Qgd2lkdGggPSBlbGVtZW50LmNsaWVudFdpZHRoO1xuICAgIGNvbnN0IGhlaWdodCA9IGVsZW1lbnQuY2xpZW50SGVpZ2h0O1xuICAgIHRoaXMucHJvcHMuZGlzcGF0Y2goe3R5cGU6IHRoaXMucHJvcHMuZGVjaXBoZXJlZFRleHRSZXNpemVkLCBwYXlsb2FkOiB7d2lkdGgsIGhlaWdodH19KTtcbiAgfTtcblxuICBvblNjcm9sbCA9ICgpID0+IHtcbiAgICBjb25zdCBzY3JvbGxUb3AgPSB0aGlzLl90ZXh0Qm94LnNjcm9sbFRvcDtcbiAgICB0aGlzLnByb3BzLmRpc3BhdGNoKHt0eXBlOiB0aGlzLnByb3BzLmRlY2lwaGVyZWRUZXh0U2Nyb2xsZWQsIHBheWxvYWQ6IHtzY3JvbGxUb3B9fSk7XG4gIH07XG5cbiAgb25KdW1wID0gKHBvc2l0aW9uKSA9PiB7XG4gICAgdGhpcy5wcm9wcy5kaXNwYXRjaCh7dHlwZTogdGhpcy5wcm9wcy5zY2hlZHVsaW5nSnVtcCwgcGF5bG9hZDoge3Bvc2l0aW9ufX0pO1xuICB9O1xuXG59XG5cbmNsYXNzIFRleHRDZWxsIGV4dGVuZHMgUmVhY3QuUHVyZUNvbXBvbmVudCB7XG4gIHJlbmRlciAoKSB7XG4gICAgY29uc3Qge2NvbHVtbiwgY2lwaGVyZWQsIGNsZWFyLCBsb2NrZWQsIGN1cnJlbnQsIGNlbGxXaWR0aH0gPSB0aGlzLnByb3BzO1xuICAgIGNvbnN0IGNlbGxTdHlsZSA9IHtcbiAgICAgIHBvc2l0aW9uOiAnYWJzb2x1dGUnLFxuICAgICAgbGVmdDogYCR7Y29sdW1uICogY2VsbFdpZHRofXB4YCxcbiAgICAgIHdpZHRoOiBgJHtjZWxsV2lkdGh9cHhgLFxuICAgICAgaGVpZ2h0OiBgNDJweGAsXG4gICAgICBib3JkZXI6ICdzb2xpZCAjNzc3JyxcbiAgICAgIGJvcmRlcldpZHRoOiAnMXB4IDAnLFxuICAgICAgYmFja2dyb3VuZENvbG9yOiBjdXJyZW50ID8gJyNhYWEnIDogKGxvY2tlZCA/ICcjY2NjJyA6ICcjZmZmJyksXG4gICAgICBjdXJzb3I6ICdwb2ludGVyJ1xuICAgIH07XG4gICAgcmV0dXJuIChcbiAgICAgIDxkaXYgc3R5bGU9e2NlbGxTdHlsZX0gb25DbGljaz17dGhpcy5fanVtcH0+XG4gICAgICAgIDxkaXYgc3R5bGU9e3t3aWR0aDogJzEwMCUnLCBoZWlnaHQ6ICcyMHB4JywgYm9yZGVyQm90dG9tOiAnMXB4IHNvbGlkICNjY2MnLCB0ZXh0QWxpZ246ICdjZW50ZXInfX0+e2NpcGhlcmVkIHx8ICcgJ308L2Rpdj5cbiAgICAgICAgPGRpdiBzdHlsZT17e3dpZHRoOiAnMTAwJScsIGhlaWdodDogJzIwcHgnLCB0ZXh0QWxpZ246ICdjZW50ZXInfX0+e2NsZWFyIHx8ICcgJ308L2Rpdj5cbiAgICAgIDwvZGl2PlxuICAgICk7XG4gIH1cbiAgX2p1bXAgPSAoX2V2ZW50KSA9PiB7XG4gICAgdGhpcy5wcm9wcy5vbkp1bXAodGhpcy5wcm9wcy5wb3NpdGlvbik7XG4gIH07XG59XG5cbmV4cG9ydCBkZWZhdWx0IHtcbiAgYWN0aW9uczoge1xuICAgIGRlY2lwaGVyZWRUZXh0UmVzaXplZDogJ0RlY2lwaGVyZWRUZXh0LlJlc2l6ZWQnIC8qIHt3aWR0aDogbnVtYmVyLCBoZWlnaHQ6IG51bWJlcn0gKi8sXG4gICAgZGVjaXBoZXJlZFRleHRTY3JvbGxlZDogJ0RlY2lwaGVyZWRUZXh0LlNjcm9sbGVkJyAvKiB7c2Nyb2xsVG9wOiBudW1iZXJ9ICovLFxuICB9LFxuICBhY3Rpb25SZWR1Y2Vyczoge1xuICAgIGFwcEluaXQ6IGFwcEluaXRSZWR1Y2VyLFxuICAgIHRhc2tJbml0OiB0YXNrSW5pdFJlZHVjZXIsXG4gICAgZGVjaXBoZXJlZFRleHRSZXNpemVkOiBkZWNpcGhlcmVkVGV4dFJlc2l6ZWRSZWR1Y2VyLFxuICAgIGRlY2lwaGVyZWRUZXh0U2Nyb2xsZWQ6IGRlY2lwaGVyZWRUZXh0U2Nyb2xsZWRSZWR1Y2VyLFxuICB9LFxuICBsYXRlUmVkdWNlcjogZGVjaXBoZXJlZFRleHRMYXRlUmVkdWNlcixcbiAgdmlld3M6IHtcbiAgICBEZWNpcGhlcmVkVGV4dDogY29ubmVjdChEZWNpcGhlcmVkVGV4dFZpZXdTZWxlY3RvcikoRGVjaXBoZXJlZFRleHRWaWV3KSxcbiAgfVxufTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9kZWNpcGhlcmVkX3RleHRfYnVuZGxlLmpzIiwiXG5pbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IHtCdXR0b259IGZyb20gJ3JlYWN0LWJvb3RzdHJhcCc7XG5pbXBvcnQge2Nvbm5lY3R9IGZyb20gJ3JlYWN0LXJlZHV4JztcbmltcG9ydCB7cmFuZ2V9IGZyb20gJ3JhbmdlJztcbmltcG9ydCBjbGFzc25hbWVzIGZyb20gJ2NsYXNzbmFtZXMnO1xuXG5mdW5jdGlvbiBXb3Jrc3BhY2VTZWxlY3RvciAoc3RhdGUpIHtcbiAgY29uc3Qge1xuICAgIHZpZXdzOiB7Q2lwaGVyZWRUZXh0LCBTZWxlY3RlZFRleHQsIEZyZXF1ZW5jeUFuYWx5c2lzLCBSb3RvciwgU2NoZWR1bGluZ0NvbnRyb2xzLCBEZWNpcGhlcmVkVGV4dCwgSGludFJlcXVlc3RGZWVkYmFja30sXG4gICAgYWN0aW9uczoge3JlcXVlc3RIaW50fSxcbiAgICByb3RvcnMsIGVkaXRpbmdcbiAgfSA9IHN0YXRlO1xuICBsZXQgaGludFJlcXVlc3QgPSBudWxsO1xuICBpZiAodHlwZW9mIGVkaXRpbmcucm90b3JJbmRleCA9PT0gJ251bWJlcicpIHtcbiAgICBjb25zdCBlZGl0aW5nQ2VsbCA9IHJvdG9yc1tlZGl0aW5nLnJvdG9ySW5kZXhdLmNlbGxzW2VkaXRpbmcuY2VsbFJhbmtdO1xuICAgIGlmICghZWRpdGluZ0NlbGwuaGludCAmJiAhZWRpdGluZ0NlbGwubG9ja2VkKSB7XG4gICAgICBoaW50UmVxdWVzdCA9IGVkaXRpbmc7XG4gICAgfVxuICB9XG4gIHJldHVybiB7XG4gICAgQ2lwaGVyZWRUZXh0LCBTZWxlY3RlZFRleHQsIEZyZXF1ZW5jeUFuYWx5c2lzLCBSb3RvciwgU2NoZWR1bGluZ0NvbnRyb2xzLCBEZWNpcGhlcmVkVGV4dCxcbiAgICBIaW50UmVxdWVzdEZlZWRiYWNrLCByZXF1ZXN0SGludCwgaGludFJlcXVlc3QsIG5iUm90b3JzOiByb3RvcnMubGVuZ3RoXG4gIH07XG59XG5cbmNsYXNzIFdvcmtzcGFjZSBleHRlbmRzIFJlYWN0LlB1cmVDb21wb25lbnQge1xuICByZW5kZXIgKCkge1xuICAgIGNvbnN0IHtDaXBoZXJlZFRleHQsIFNlbGVjdGVkVGV4dCwgRnJlcXVlbmN5QW5hbHlzaXMsIFJvdG9yLCBTY2hlZHVsaW5nQ29udHJvbHMsIERlY2lwaGVyZWRUZXh0LCBuYlJvdG9ycywgaGludFJlcXVlc3QsIEhpbnRSZXF1ZXN0RmVlZGJhY2t9ID0gdGhpcy5wcm9wcztcbiAgICByZXR1cm4gKFxuICAgICAgPGRpdj5cbiAgICAgICAgPGgyPntcIk1lc3NhZ2UgY2hpZmZyw6lcIn08L2gyPlxuICAgICAgICA8Q2lwaGVyZWRUZXh0Lz5cbiAgICAgICAgPFNlbGVjdGVkVGV4dC8+XG4gICAgICAgIDxoMj57XCJBbmFseXNlIGRlIGZyw6lxdWVuY2UgZGUgbGEgc8OpbGVjdGlvblwifTwvaDI+XG4gICAgICAgIDxGcmVxdWVuY3lBbmFseXNpcy8+XG4gICAgICAgIDxoMj57YFJvdG9yJHtuYlJvdG9ycyA+IDEgPyAncycgOiAnJ30gZGUgZMOpY2hpZmZyZW1lbnRgfTwvaDI+XG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPSdjbGVhcmZpeCc+XG4gICAgICAgICAgPGRpdiBzdHlsZT17e2JvcmRlcjogJzFweCBzb2xpZCAjY2NjJywgZmxvYXQ6ICdyaWdodCcsIHdpZHRoOiAnMjAwcHgnLCBwYWRkaW5nOiAnMTBweCcsIGJvcmRlclJhZGl1czogJzVweCcsIGJhY2tncm91bmRDb2xvcjogJyNmOWY5ZjknLCBmb250U2l6ZTogJzEycHgnLCBtYXJnaW5SaWdodDogJzE1cHgnfX0+XG4gICAgICAgICAgICA8cCBzdHlsZT17e2ZvbnRXZWlnaHQ6ICdib2xkJywgdGV4dEFsaWduOiAnY2VudGVyJ319PntcIkluZGljZXNcIn08L3A+XG4gICAgICAgICAgICA8cD57XCJQb3VyIHVuIGNvw7t0IGRlIFwifTxzcGFuIHN0eWxlPXt7Zm9udFdlaWdodDogJ2JvbGQnfX0+e1wiNSBwb2ludHNcIn08L3NwYW4+e1wiLCBjbGlxdWV6IHN1ciB1bmUgY2FzZSBkZSByb3RvciBldCB2YWxpZGV6IHBvdXIgb2J0ZW5pciBzYSB2YWxldXIuXCJ9PC9wPlxuICAgICAgICAgICAgPGRpdiBzdHlsZT17e3RleHRBbGlnbjogJ2NlbnRlcicsIG1hcmdpbjogJzEwcHggMCd9fT5cbiAgICAgICAgICAgICAgPEJ1dHRvbiBvbkNsaWNrPXt0aGlzLnJlcXVlc3RIaW50fSBkaXNhYmxlZD17IWhpbnRSZXF1ZXN0fT57YFZhbGlkZXJgfTwvQnV0dG9uPlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgPGRpdiBzdHlsZT17e2Zsb2F0OiAnbGVmdCd9fT5cbiAgICAgICAgICAgIHtyYW5nZSgwLCBuYlJvdG9ycykubWFwKGluZGV4ID0+IDxSb3RvciBrZXk9e2luZGV4fSBpbmRleD17aW5kZXh9Lz4pfVxuICAgICAgICAgICAgPFNjaGVkdWxpbmdDb250cm9scy8+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvZGl2PlxuICAgICAgICA8SGludFJlcXVlc3RGZWVkYmFjay8+XG4gICAgICAgIDxoMj57XCJUZXh0ZSBkw6ljaGlmZnLDqVwifTwvaDI+XG4gICAgICAgIDxEZWNpcGhlcmVkVGV4dC8+XG4gICAgICA8L2Rpdj5cbiAgICApO1xuICB9XG4gIHJlcXVlc3RIaW50ID0gKCkgPT4ge1xuICAgIGNvbnN0IHtkaXNwYXRjaCwgcmVxdWVzdEhpbnQsIGhpbnRSZXF1ZXN0fSA9IHRoaXMucHJvcHM7XG4gICAgZGlzcGF0Y2goe3R5cGU6IHJlcXVlc3RIaW50LCBwYXlsb2FkOiB7cmVxdWVzdDogaGludFJlcXVlc3R9fSk7XG4gIH07XG59XG5cbmV4cG9ydCBkZWZhdWx0IHtcbiAgdmlld3M6IHtcbiAgICBXb3Jrc3BhY2U6IGNvbm5lY3QoV29ya3NwYWNlU2VsZWN0b3IpKFdvcmtzcGFjZSksXG4gIH1cbn07XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvd29ya3NwYWNlX2J1bmRsZS5qcyIsIlxuaW1wb3J0IHVwZGF0ZSBmcm9tICdpbW11dGFiaWxpdHktaGVscGVyJztcblxuZnVuY3Rpb24gYmlzZWN0IChhLCB4KSB7XG4gICAgbGV0IGxvID0gMCwgaGkgPSBhLmxlbmd0aCwgbWlkO1xuICAgIHdoaWxlIChsbyA8IGhpKSB7XG4gICAgICAgIG1pZCA9IChsbyArIGhpKSAvIDIgfCAwO1xuICAgICAgICBpZiAoeCA8IGFbbWlkXSkge1xuICAgICAgICAgICAgaGkgPSBtaWQ7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBsbyA9IG1pZCArIDE7XG4gICAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIGxvO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gY2hhbmdlU2VsZWN0aW9uICh2YWx1ZXMsIHZhbHVlLCBzZWxlY3RlZCkge1xuICAgIGNvbnN0IGluZGV4ID0gYmlzZWN0KHZhbHVlcywgdmFsdWUpO1xuICAgIGlmIChzZWxlY3RlZCkge1xuICAgICAgICByZXR1cm4gdmFsdWVzW2luZGV4IC0gMV0gPT09IHZhbHVlID8ge30gOiB7JHNwbGljZTogW1tpbmRleCwgMCwgdmFsdWVdXX07XG4gICAgfSBlbHNlIHtcbiAgICAgICAgcmV0dXJuIHZhbHVlc1tpbmRleCAtIDFdICE9PSB2YWx1ZSA/IHt9IDogeyRzcGxpY2U6IFtbaW5kZXggLSAxLCAxXV19O1xuICAgIH1cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHNvcnRlZEFycmF5SGFzRWxlbWVudCAoYSwgeCkge1xuICBjb25zdCBpID0gYmlzZWN0KGEsIHgpIC0gMTtcbiAgcmV0dXJuIGFbaV0gPT09IHg7XG59XG5cblxuZXhwb3J0IGZ1bmN0aW9uIHVwZGF0ZUdyaWRHZW9tZXRyeSAoZ3JpZCkge1xuICBjb25zdCB7d2lkdGgsIGhlaWdodCwgY2VsbFdpZHRoLCBjZWxsSGVpZ2h0LCBzY3JvbGxUb3AsIG5iQ2VsbHN9ID0gZ3JpZDtcbiAgY29uc3Qgc2Nyb2xsQmFyV2lkdGggPSAyMDtcbiAgY29uc3QgcGFnZUNvbHVtbnMgPSBNYXRoLm1heCg0MCwgTWF0aC5mbG9vcigod2lkdGggLSBzY3JvbGxCYXJXaWR0aCkgLyBjZWxsV2lkdGgpKTtcbiAgY29uc3QgcGFnZVJvd3MgPSBNYXRoLm1heCg4LCBNYXRoLmNlaWwoaGVpZ2h0IC8gY2VsbEhlaWdodCkpO1xuICBjb25zdCBib3R0b20gPSBNYXRoLmNlaWwobmJDZWxscyAvIHBhZ2VDb2x1bW5zKSAqIGNlbGxIZWlnaHQgLSAxO1xuICBjb25zdCBtYXhUb3AgPSBNYXRoLm1heCgwLCBib3R0b20gKyAxIC0gcGFnZVJvd3MgKiBjZWxsSGVpZ2h0KTtcbiAgcmV0dXJuIHsuLi5ncmlkLCBwYWdlQ29sdW1ucywgcGFnZVJvd3MsIHNjcm9sbFRvcDogTWF0aC5taW4obWF4VG9wLCBzY3JvbGxUb3ApLCBib3R0b20sIG1heFRvcH07XG59XG5cbmV4cG9ydCBmdW5jdGlvbiB1cGRhdGVHcmlkVmlzaWJsZVJvd3MgKGdyaWQsIG9wdGlvbnMpIHtcbiAgb3B0aW9ucyA9IG9wdGlvbnMgfHwge307XG4gIGNvbnN0IHtuYkNlbGxzLCBjZWxsSGVpZ2h0LCBwYWdlQ29sdW1ucywgcGFnZVJvd3MsIGNlbGxzLCBzY3JvbGxUb3AsIHNlbGVjdGVkUm93c30gPSBncmlkO1xuICBpZiAodHlwZW9mIHNjcm9sbFRvcCAhPT0gJ251bWJlcicpIHtcbiAgICByZXR1cm4gZ3JpZDtcbiAgfVxuICBjb25zdCBmaXJzdFJvdyA9IE1hdGguZmxvb3Ioc2Nyb2xsVG9wIC8gY2VsbEhlaWdodCk7XG4gIGNvbnN0IGxhc3RSb3cgPSBNYXRoLm1pbihmaXJzdFJvdyArIHBhZ2VSb3dzIC0gMSwgTWF0aC5jZWlsKG5iQ2VsbHMgLyBwYWdlQ29sdW1ucykgLSAxKTtcbiAgY29uc3Qgcm93cyA9IFtdO1xuICBjb25zdCBnZXRDZWxsID0gb3B0aW9ucy5nZXRDZWxsIHx8IChjZWxscyA/IChpbmRleCA9PiAoe2NlbGw6IGNlbGxzW2luZGV4XX0pKSA6IChfaW5kZXggPT4gbnVsbCkpO1xuICBmb3IgKGxldCByb3dJbmRleCA9IGZpcnN0Um93OyByb3dJbmRleCA8PSBsYXN0Um93OyByb3dJbmRleCArPSAxKSB7XG4gICAgY29uc3Qgcm93U3RhcnRQb3MgPSByb3dJbmRleCAqIHBhZ2VDb2x1bW5zO1xuICAgIGNvbnN0IHJvd0NlbGxzID0gW107XG4gICAgZm9yIChsZXQgY29sSW5kZXggPSAwOyBjb2xJbmRleCA8IHBhZ2VDb2x1bW5zOyBjb2xJbmRleCArPSAxKSB7XG4gICAgICByb3dDZWxscy5wdXNoKHtpbmRleDogY29sSW5kZXgsIC4uLmdldENlbGwocm93U3RhcnRQb3MgKyBjb2xJbmRleCl9KTtcbiAgICB9XG4gICAgY29uc3Qgc2VsZWN0ZWQgPSBzZWxlY3RlZFJvd3MgJiYgc29ydGVkQXJyYXlIYXNFbGVtZW50KHNlbGVjdGVkUm93cywgcm93SW5kZXgpO1xuICAgIHJvd3MucHVzaCh7aW5kZXg6IHJvd0luZGV4LCBzZWxlY3RlZCwgY29sdW1uczogcm93Q2VsbHN9KTtcbiAgfVxuICByZXR1cm4gey4uLmdyaWQsIHZpc2libGU6IHtyb3dzfX07XG59XG5cbmV4cG9ydCBmdW5jdGlvbiB1cGRhdGVHcmlkVmlzaWJsZUNvbHVtbnMgKGdyaWQsIG9wdGlvbnMpIHtcbiAgb3B0aW9ucyA9IG9wdGlvbnMgfHwge307XG4gIGNvbnN0IHtjZWxsSGVpZ2h0LCBwYWdlQ29sdW1ucywgcGFnZVJvd3MsIGNlbGxzLCBzY3JvbGxUb3AsIHNlbGVjdGVkQ29sdW1uc30gPSBncmlkO1xuICBpZiAodHlwZW9mIHNjcm9sbFRvcCAhPT0gJ251bWJlcicpIHtcbiAgICByZXR1cm4gZ3JpZDtcbiAgfVxuICBjb25zdCBmaXJzdFJvdyA9IE1hdGguZmxvb3Ioc2Nyb2xsVG9wIC8gY2VsbEhlaWdodCk7XG4gIGNvbnN0IGxhc3RSb3cgPSBmaXJzdFJvdyArIHBhZ2VSb3dzIC0gMTtcbiAgY29uc3QgY29sdW1ucyA9IFtdO1xuICBjb25zdCBnZXRDZWxsID0gb3B0aW9ucy5nZXRDZWxsIHx8IChjZWxscyA/IChpbmRleCA9PiAoe2NlbGw6IGNlbGxzW2luZGV4XX0pKSA6IChfaW5kZXggPT4gbnVsbCkpO1xuICBmb3IgKGxldCBjb2xJbmRleCA9IDA7IGNvbEluZGV4IDwgcGFnZUNvbHVtbnM7IGNvbEluZGV4ICs9IDEpIHtcbiAgICBjb25zdCBjb2xDZWxscyA9IFtdO1xuICAgIGZvciAobGV0IHJvd0luZGV4ID0gZmlyc3RSb3c7IHJvd0luZGV4IDw9IGxhc3RSb3c7IHJvd0luZGV4ICs9IDEpIHtcbiAgICAgIGNvbENlbGxzLnB1c2goe2luZGV4OiByb3dJbmRleCwgLi4uZ2V0Q2VsbChyb3dJbmRleCAqIHBhZ2VDb2x1bW5zICsgY29sSW5kZXgpfSk7XG4gICAgfVxuICAgIGNvbnN0IHNlbGVjdGVkID0gc2VsZWN0ZWRDb2x1bW5zICYmIHNvcnRlZEFycmF5SGFzRWxlbWVudChzZWxlY3RlZENvbHVtbnMsIGNvbEluZGV4KTtcbiAgICBjb2x1bW5zLnB1c2goe2luZGV4OiBjb2xJbmRleCwgc2VsZWN0ZWQsIHJvd3M6IGNvbENlbGxzfSk7XG4gIH1cbiAgcmV0dXJuIHsuLi5ncmlkLCB2aXNpYmxlOiB7Y29sdW1uc319O1xufVxuXG5leHBvcnQgZnVuY3Rpb24gdXBkYXRlR3JpZFZpc2libGVBcmVhIChncmlkLCBvcHRpb25zKSB7XG4gIC8qIFRPRE86IGJ1aWxkIGEgY2FjaGUga2V5LCBzdG9yZSBpdCBpbiB0aGUgZ3JpZCwgdXNlIGl0IHRvIHNraXAgY29tcHV0YXRpb24gd2hlbiB1bmNoYW5nZWQgKi9cbiAgaWYgKGdyaWQubW9kZSA9PT0gJ3Jvd3MnKSB7XG4gICAgcmV0dXJuIHVwZGF0ZUdyaWRWaXNpYmxlUm93cyhncmlkLCBvcHRpb25zKTtcbiAgfVxuICBpZiAoZ3JpZC5tb2RlID09PSAnY29sdW1ucycpIHtcbiAgICByZXR1cm4gdXBkYXRlR3JpZFZpc2libGVDb2x1bW5zKGdyaWQsIG9wdGlvbnMpO1xuICB9XG4gIHJldHVybiBncmlkO1xufVxuXG4vKiBST1RPUiBmdW5jdGlvbnMgKi9cblxuXG5leHBvcnQgZnVuY3Rpb24gbWFrZVJvdG9yIChhbHBoYWJldCwge3NjaGVkdWxlLCBlZGl0YWJsZVJvd30pIHtcbiAgY29uc3Qgc2l6ZSA9IGFscGhhYmV0Lmxlbmd0aDtcbiAgY29uc3QgY2VsbHMgPSBhbHBoYWJldC5zcGxpdCgnJykgLm1hcChmdW5jdGlvbiAoYywgcmFuaykge1xuICAgIHJldHVybiB7cmFuaywgcm90YXRpbmc6IGMsIGVkaXRhYmxlOiBudWxsLCBsb2NrZWQ6IGZhbHNlLCBjb25mbGljdDogZmFsc2V9O1xuICB9KTtcbiAgY29uc3QgbnVsbFBlcm0gPSBuZXcgQXJyYXkoc2l6ZSkuZmlsbCgtMSk7XG4gIHJldHVybiB7YWxwaGFiZXQsIHNpemUsIHNjaGVkdWxlLCBlZGl0YWJsZVJvdywgY2VsbHMsIGZvcndhcmQ6IG51bGxQZXJtLCBiYWNrd2FyZDogbnVsbFBlcm19O1xufVxuXG5leHBvcnQgZnVuY3Rpb24gZHVtcFJvdG9ycyAoYWxwaGFiZXQsIHJvdG9ycykge1xuICByZXR1cm4gcm90b3JzLm1hcChyb3RvciA9PlxuICAgIHJvdG9yLmNlbGxzLm1hcCgoe2VkaXRhYmxlLCBsb2NrZWR9KSA9PlxuICAgICAgW2FscGhhYmV0LmluZGV4T2YoZWRpdGFibGUpLCBsb2NrZWQgPyAxIDogMF0pKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGxvYWRSb3RvcnMgKGFscGhhYmV0LCByb3RvclNwZWNzLCBoaW50cywgcm90b3JEdW1wcykge1xuICByZXR1cm4gcm90b3JEdW1wcy5tYXAoKGNlbGxzLCByb3RvckluZGV4KSA9PiB7XG4gICAgY29uc3QgJGNlbGxzID0gW107XG4gICAgY2VsbHMuZm9yRWFjaCgoY2VsbCwgY2VsbEluZGV4KSA9PiB7XG4gICAgICAvKiBMb2NraW5nIGluZm9ybWF0aW9uIGlzIG5vdCBpbmNsdWRlZCBpbiB0aGUgYW5zd2VyLiAqL1xuICAgICAgaWYgKHR5cGVvZiBjZWxsID09PSAnbnVtYmVyJykgY2VsbCA9IFtjZWxsLCAwXTtcbiAgICAgIGNvbnN0IFtyYW5rLCBsb2NrZWRdID0gY2VsbDtcbiAgICAgICRjZWxsc1tjZWxsSW5kZXhdID0ge1xuICAgICAgICBlZGl0YWJsZTogeyRzZXQ6IHJhbmsgPT09IC0xID8gbnVsbCA6IGFscGhhYmV0W3JhbmtdfSxcbiAgICAgICAgbG9ja2VkOiB7JHNldDogbG9ja2VkICE9PSAwfSxcbiAgICAgIH07XG4gICAgfSk7XG4gICAgaGludHMuZm9yRWFjaCgoe3JvdG9ySW5kZXg6IGksIGNlbGxSYW5rOiBqLCBzeW1ib2x9KSA9PiB7XG4gICAgICBpZiAocm90b3JJbmRleCA9PT0gaSkge1xuICAgICAgICAkY2VsbHNbal0gPSB7XG4gICAgICAgICAgZWRpdGFibGU6IHskc2V0OiBzeW1ib2x9LFxuICAgICAgICAgIGhpbnQ6IHskc2V0OiB0cnVlfSxcbiAgICAgICAgfTtcbiAgICAgIH1cbiAgICB9KTtcbiAgICBsZXQgcm90b3IgPSBtYWtlUm90b3IoYWxwaGFiZXQsIHJvdG9yU3BlY3Nbcm90b3JJbmRleF0pO1xuICAgIHJvdG9yID0gdXBkYXRlKHJvdG9yLCB7Y2VsbHM6ICRjZWxsc30pO1xuICAgIHJvdG9yID0gbWFya1JvdG9yQ29uZmxpY3RzKHVwZGF0ZVBlcm1zKHJvdG9yKSk7XG4gICAgcmV0dXJuIHJvdG9yO1xuICB9KTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGVkaXRSb3RvckNlbGwgKHJvdG9yLCByYW5rLCBzeW1ib2wpIHtcbiAgcm90b3IgPSB1cGRhdGUocm90b3IsIHtjZWxsczoge1tyYW5rXToge2VkaXRhYmxlOiB7JHNldDogc3ltYm9sfX19fSk7XG4gIHJldHVybiB1cGRhdGVQZXJtcyhtYXJrUm90b3JDb25mbGljdHMocm90b3IpKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGxvY2tSb3RvckNlbGwgKHJvdG9yLCByYW5rLCBsb2NrZWQpIHtcbiAgcmV0dXJuIHVwZGF0ZShyb3Rvciwge2NlbGxzOiB7W3JhbmtdOiB7bG9ja2VkOiB7JHNldDogbG9ja2VkfX19fSk7XG59XG5cbmZ1bmN0aW9uIG1hcmtSb3RvckNvbmZsaWN0cyAocm90b3IpIHtcbiAgY29uc3QgY291bnRzID0gbmV3IE1hcCgpO1xuICBjb25zdCBjaGFuZ2VzID0ge307XG4gIGZvciAobGV0IHtyYW5rLCBlZGl0YWJsZSwgY29uZmxpY3R9IG9mIHJvdG9yLmNlbGxzKSB7XG4gICAgaWYgKGNvbmZsaWN0KSB7XG4gICAgICBjaGFuZ2VzW3JhbmtdID0ge2NvbmZsaWN0OiB7JHNldDogZmFsc2V9fTtcbiAgICB9XG4gICAgaWYgKGVkaXRhYmxlICE9PSBudWxsKSB7XG4gICAgICBpZiAoIWNvdW50cy5oYXMoZWRpdGFibGUpKSB7XG4gICAgICAgIGNvdW50cy5zZXQoZWRpdGFibGUsIFtyYW5rXSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBjb3VudHMuZ2V0KGVkaXRhYmxlKS5wdXNoKHJhbmspO1xuICAgICAgfVxuICAgIH1cbiAgfVxuICBmb3IgKGxldCByYW5rcyBvZiBjb3VudHMudmFsdWVzKCkpIHtcbiAgICBpZiAocmFua3MubGVuZ3RoID4gMSkge1xuICAgICAgZm9yIChsZXQgcmFuayBvZiByYW5rcykge1xuICAgICAgICBjaGFuZ2VzW3JhbmtdID0ge2NvbmZsaWN0OiB7JHNldDogdHJ1ZX19O1xuICAgICAgfVxuICAgIH1cbiAgfVxuICByZXR1cm4gdXBkYXRlKHJvdG9yLCB7Y2VsbHM6IGNoYW5nZXN9KTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHVwZGF0ZVJvdG9yV2l0aEtleSAoYWxwaGFiZXQsIHJvdG9yLCBrZXkpIHtcbiAgY29uc3QgJGNlbGxzID0ge307XG4gIGtleS5zcGxpdCgnJykuZm9yRWFjaCgoc3ltYm9sLCBjZWxsSW5kZXgpID0+IHtcbiAgICAkY2VsbHNbY2VsbEluZGV4XSA9IHtcbiAgICAgIGVkaXRhYmxlOiB7JHNldDogYWxwaGFiZXQuaW5kZXhPZihzeW1ib2wpID09PSAtMSA/IG51bGwgOiBzeW1ib2x9XG4gICAgfTtcbiAgfSk7XG4gIHJldHVybiB1cGRhdGVQZXJtcyh1cGRhdGUocm90b3IsIHtjZWxsczogJGNlbGxzfSkpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gdXBkYXRlUGVybXMgKHJvdG9yKSB7XG4gIGNvbnN0IHtzaXplLCBhbHBoYWJldCwgY2VsbHN9ID0gcm90b3I7XG4gIGNvbnN0IGZvcndhcmQgPSBuZXcgQXJyYXkoc2l6ZSkuZmlsbCgtMSk7XG4gIGNvbnN0IGJhY2t3YXJkID0gbmV3IEFycmF5KHNpemUpLmZpbGwoLTEpO1xuICBmb3IgKGxldCBjZWxsIG9mIGNlbGxzKSB7XG4gICAgaWYgKGNlbGwuZWRpdGFibGUgIT09IG51bGwgJiYgIWNlbGwuY29uZmxpY3QpIHtcbiAgICAgIGNvbnN0IHNvdXJjZSA9IGFscGhhYmV0LmluZGV4T2YoY2VsbC5lZGl0YWJsZSk7XG4gICAgICBmb3J3YXJkW3NvdXJjZV0gPSBjZWxsLnJhbms7XG4gICAgICBiYWNrd2FyZFtjZWxsLnJhbmtdID0gc291cmNlO1xuICAgIH1cbiAgfVxuICByZXR1cm4gey4uLnJvdG9yLCBmb3J3YXJkLCBiYWNrd2FyZH07XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBnZXRSb3RvclNoaWZ0IChyb3RvciwgcG9zaXRpb24pIHtcbiAgY29uc3Qge3NpemUsIHNjaGVkdWxlfSA9IHJvdG9yO1xuICByZXR1cm4gc2NoZWR1bGUgPT09IDAgPyAwIDogTWF0aC5mbG9vcihwb3NpdGlvbiAvIHNjaGVkdWxlKSAlIHNpemU7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBhcHBseVJvdG9ycyAocm90b3JzLCBwb3NpdGlvbiwgcmFuaykge1xuICBjb25zdCByZXN1bHQgPSB7cmFuaywgbG9ja3M6IDAsIHRyYWNlOiBbXX07XG4gIGZvciAobGV0IHJvdG9ySW5kZXggPSAwOyByb3RvckluZGV4IDwgcm90b3JzLmxlbmd0aDsgcm90b3JJbmRleCArPSAxKSB7XG4gICAgY29uc3Qgcm90b3IgPSByb3RvcnNbcm90b3JJbmRleF07XG4gICAgY29uc3Qgc2hpZnQgPSBnZXRSb3RvclNoaWZ0KHJvdG9yLCBwb3NpdGlvbik7XG4gICAgYXBwbHlSb3Rvcihyb3Rvciwgc2hpZnQsIHJlc3VsdCk7XG4gICAgaWYgKHJlc3VsdC5yYW5rID09PSAtMSkge1xuICAgICAgYnJlYWs7XG4gICAgfVxuICB9XG4gIGlmIChyZXN1bHQubG9ja3MgPT09IHJvdG9ycy5sZW5ndGgpIHtcbiAgICByZXN1bHQubG9ja2VkID0gdHJ1ZTtcbiAgfVxuICByZXR1cm4gcmVzdWx0O1xufVxuXG5leHBvcnQgZnVuY3Rpb24gYXBwbHlSb3RvciAocm90b3IsIHNoaWZ0LCByZXN1bHQpIHtcbiAgbGV0IHJhbmsgPSByZXN1bHQucmFuaywgY2VsbDtcbiAgLyogTmVnYXRpdmUgc2hpZnQgdG8gdGhlIHN0YXRpYyB0b3Agcm93IGJlZm9yZSBwZXJtdXRhdGlvbi4gKi9cbiAgaWYgKHJvdG9yLmVkaXRhYmxlUm93ID09PSAnYm90dG9tJykge1xuICAgIHJhbmsgPSBhcHBseVNoaWZ0KHJvdG9yLnNpemUsIC1zaGlmdCwgcmFuayk7XG4gICAgY2VsbCA9IHJvdG9yLmNlbGxzW3JhbmtdO1xuICB9XG4gIC8qIEFwcGx5IHRoZSBwZXJtdXRhdGlvbi4gKi9cbiAgcmFuayA9IHJvdG9yLmZvcndhcmRbcmFua107XG4gIC8qIFBvc2l0aXZlIHNoaWZ0IHRvIHRoZSBzdGF0aWMgYm90dG9tIHJvdyBhZnRlciBwZXJtdXRhdGlvbi4gKi9cbiAgaWYgKHJvdG9yLmVkaXRhYmxlUm93ID09PSAndG9wJykge1xuICAgIGNlbGwgPSByb3Rvci5jZWxsc1tyYW5rXTtcbiAgICByYW5rID0gYXBwbHlTaGlmdChyb3Rvci5zaXplLCBzaGlmdCwgcmFuayk7XG4gIH1cbiAgLyogU2F2ZSBuZXcgcmFuayAoY2FuIGJlIC0xKSBhbmQgYXR0cmlidXRlcy4gKi9cbiAgcmVzdWx0LnJhbmsgPSByYW5rO1xuICBpZiAoY2VsbCkge1xuICAgIC8qIFNhdmUgdGhlIHJvdG9yIGNlbGwgdXNlZCBpbiB0aGUgdHJhY2UuICovXG4gICAgcmVzdWx0LnRyYWNlLnB1c2goY2VsbCk7XG4gICAgaWYgKGNlbGwubG9ja2VkIHx8IGNlbGwuaGludCkge1xuICAgICAgcmVzdWx0LmxvY2tzICs9IDE7XG4gICAgfVxuICAgIGlmIChjZWxsLmNvbGxpc2lvbikge1xuICAgICAgcmVzdWx0LmNvbGxpc2lvbiA9IHRydWU7XG4gICAgfVxuICB9XG59XG5cbmZ1bmN0aW9uIGFwcGx5U2hpZnQgKG1vZCwgYW1vdW50LCByYW5rKSB7XG4gIGlmIChyYW5rICE9PSAtMSkge1xuICAgIGlmIChhbW91bnQgPCAwKSB7XG4gICAgICBhbW91bnQgKz0gbW9kO1xuICAgIH1cbiAgICByYW5rID0gKHJhbmsgKyBhbW91bnQpICUgbW9kO1xuICB9XG4gIHJldHVybiByYW5rO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gd3JhcEFyb3VuZCAodmFsdWUsIG1vZCkge1xuICByZXR1cm4gKCh2YWx1ZSAlIG1vZCkgKyBtb2QpICUgbW9kO1xufVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL3V0aWxzLmpzIl0sInNvdXJjZVJvb3QiOiIifQ==