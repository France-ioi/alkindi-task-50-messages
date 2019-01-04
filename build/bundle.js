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
    key: "render",
    value: function render() {
      var _this2 = this;

      var _this$props = this.props,
          width = _this$props.width,
          height = _this$props.height,
          visible = _this$props.visible,
          cellWidth = _this$props.cellWidth,
          cellHeight = _this$props.cellHeight,
          pageColumns = _this$props.pageColumns,
          bottom = _this$props.bottom,
          mode = _this$props.mode;
      return _react.default.createElement("div", null, _react.default.createElement("div", {
        className: "form-inline",
        style: {
          marginBottom: '7px'
        }
      }, _react.default.createElement("div", {
        className: "btn-group",
        style: {
          marginRight: '7px'
        }
      }, _react.default.createElement(_reactBootstrap.Button, {
        onClick: this.setRowMode,
        active: mode === 'rows',
        bsSize: "sm"
      }, "lignes"), _react.default.createElement(_reactBootstrap.Button, {
        onClick: this.setColMode,
        active: mode === 'columns',
        bsSize: "sm"
      }, "colonnes")), _react.default.createElement("div", {
        className: "btn-group",
        style: {
          marginRight: '7px'
        }
      }, _react.default.createElement(_reactBootstrap.Button, {
        onClick: this.scrollPageUp,
        bsSize: "sm"
      }, _react.default.createElement("i", {
        className: "fa fa-angle-double-up"
      })), _react.default.createElement(_reactBootstrap.Button, {
        onClick: this.scrollRowUp,
        bsSize: "sm"
      }, _react.default.createElement("i", {
        className: "fa fa-angle-up"
      })), _react.default.createElement(_reactBootstrap.Button, {
        onClick: this.scrollRowDown,
        bsSize: "sm"
      }, _react.default.createElement("i", {
        className: "fa fa-angle-down"
      })), _react.default.createElement(_reactBootstrap.Button, {
        onClick: this.scrollPageDown,
        bsSize: "sm"
      }, _react.default.createElement("i", {
        className: "fa fa-angle-double-down"
      }))), _react.default.createElement("div", {
        className: "form-group"
      }, _react.default.createElement("label", {
        style: {
          fontWeight: 'normal',
          marginRight: '3px'
        }
      }, 'Colonnes :'), _react.default.createElement("input", {
        type: "number",
        value: this.state.pageColumns === null ? pageColumns : this.state.pageColumns,
        onChange: this.pageColumnsChange,
        style: {
          marginRight: '7px',
          width: '70px',
          color: this.state.pageColumns === null ? 'black' : 'red'
        },
        className: (0, _classnames.default)('form-control', 'input-sm', this.state.pageColumns === null ? '' : 'inputError')
      })), _react.default.createElement("div", {
        className: "btn-group"
      }, _react.default.createElement(_reactBootstrap.Button, {
        onClick: this.selectAll,
        bsSize: "sm"
      }, " Tout sélectionner "), _react.default.createElement(_reactBootstrap.Button, {
        onClick: this.selectNone,
        bsSize: "sm"
      }, " Vider la sélection "))), _react.default.createElement("div", null, _react.default.createElement("div", {
        ref: this.refTextBox,
        onScroll: this.onScroll,
        style: {
          position: 'relative',
          width: width && "".concat(width, "px"),
          height: height && "".concat(height, "px"),
          overflowY: 'scroll'
        }
      }, visible && (visible.rows || []).map(function (_ref6) {
        var index = _ref6.index,
            columns = _ref6.columns,
            selected = _ref6.selected;
        return _react.default.createElement("div", {
          key: index,
          className: (0, _classnames.default)('selectText', 'selectText-rows', selected ? 'selected' : ''),
          style: {
            top: "".concat(index * cellHeight, "px"),
            width: "".concat(cellWidth * pageColumns, "px"),
            height: "".concat(cellHeight, "px")
          },
          onClick: _this2.rowClicked,
          "data-index": index
        }, _react.default.createElement("div", {
          className: "selectTextInner",
          style: {
            width: "".concat(cellWidth * pageColumns, "px"),
            height: "".concat(cellHeight - 2, "px")
          }
        }, columns.map(function (_ref7) {
          var index = _ref7.index,
              cell = _ref7.cell;
          return _react.default.createElement("span", {
            key: index,
            style: {
              left: "".concat(index * cellWidth, "px"),
              width: "".concat(cellWidth, "px"),
              height: "".concat(cellHeight, "px")
            }
          }, cell || ' ');
        })));
      }), visible && (visible.columns || []).map(function (_ref8) {
        var index = _ref8.index,
            rows = _ref8.rows,
            selected = _ref8.selected;
        return _react.default.createElement("div", {
          key: index,
          className: (0, _classnames.default)('selectText', 'selectText-columns', selected ? 'selected' : ''),
          style: {
            left: "".concat(index * cellWidth, "px"),
            width: "".concat(cellWidth, "px"),
            height: "".concat(bottom, "px")
          },
          onClick: _this2.columnClicked,
          "data-index": index
        }, _react.default.createElement("div", {
          className: "selectTextInner",
          style: {
            width: "".concat(cellWidth - 2, "px"),
            height: "".concat(bottom, "px")
          }
        }, rows.map(function (_ref9) {
          var index = _ref9.index,
              cell = _ref9.cell;
          return _react.default.createElement("span", {
            key: index,
            style: {
              top: "".concat(index * cellHeight, "px"),
              width: "".concat(cellWidth, "px"),
              height: "".concat(cellHeight, "px")
            }
          }, cell || ' ');
        })));
      }), _react.default.createElement("div", {
        style: {
          position: 'absolute',
          top: "".concat(bottom, "px"),
          width: '1px',
          height: '1px'
        }
      }))));
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
      return _react.default.createElement("div", null, _react.default.createElement("h2", null, "Message chiffré"), _react.default.createElement(CipheredText, null), _react.default.createElement("h2", null, "Sélection de lignes ou colonnes"), _react.default.createElement(SelectedText, null), _react.default.createElement("h2", null, "Analyse de fréquence de la sélection"), _react.default.createElement(FrequencyAnalysis, null), _react.default.createElement("h2", null, "Rotor".concat(nbRotors > 1 ? 's' : '', " de d\xE9chiffrement")), _react.default.createElement("div", {
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zcmMvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2FsZ29yZWFfcmVhY3RfdGFzay9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvYWxnb3JlYV9yZWFjdF90YXNrL2xpbmtlci5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvYWxnb3JlYV9yZWFjdF90YXNrL3VpL3N0eWxlcy5jc3M/ZThiOSIsIndlYnBhY2s6Ly8vLi9zcmMvYWxnb3JlYV9yZWFjdF90YXNrL3VpL3N0eWxlcy5jc3MiLCJ3ZWJwYWNrOi8vLy4vc3JjL2FsZ29yZWFfcmVhY3RfdGFzay9hcHBfYnVuZGxlLmpzIiwid2VicGFjazovLy8uL3NyYy9hbGdvcmVhX3JlYWN0X3Rhc2svdWkvdGFza19iYXIuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2FsZ29yZWFfcmVhY3RfdGFzay91aS9zcGlubmVyLmpzIiwid2VicGFjazovLy8uL3NyYy9hbGdvcmVhX3JlYWN0X3Rhc2svbGVnYWN5L3Rhc2suanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2FsZ29yZWFfcmVhY3RfdGFzay9zZXJ2ZXJfYXBpLmpzIiwid2VicGFjazovLy8uL3NyYy9hbGdvcmVhX3JlYWN0X3Rhc2svbGVnYWN5L3BsYXRmb3JtX2FkYXB0ZXIuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2FsZ29yZWFfcmVhY3RfdGFzay9wbGF0Zm9ybV9idW5kbGUuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2FsZ29yZWFfcmVhY3RfdGFzay9oaW50c19idW5kbGUuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2FsZ29yZWFfcmVhY3RfdGFzay93aW5kb3dfaGVpZ2h0X21vbml0b3IuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3N0eWxlLmNzcz8xNWY0Iiwid2VicGFjazovLy8uL3NyYy9zdHlsZS5jc3MiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NpcGhlcmVkX3RleHRfYnVuZGxlLmpzIiwid2VicGFjazovLy8uL3NyYy9zZWxlY3RlZF90ZXh0X2J1bmRsZS5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvZnJlcXVlbmN5X2FuYWx5c2lzX2J1bmRsZS5qcyIsIndlYnBhY2s6Ly8vY3J5cHRvIChpZ25vcmVkKSIsIndlYnBhY2s6Ly8vLi9zcmMvc2NoZWR1bGluZ19idW5kbGUuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3JvdG9yc19idW5kbGUuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2RlY2lwaGVyZWRfdGV4dF9idW5kbGUuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3dvcmtzcGFjZV9idW5kbGUuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3V0aWxzLmpzIl0sIm5hbWVzIjpbIlRhc2tCdW5kbGUiLCJhY3Rpb25SZWR1Y2VycyIsImFwcEluaXQiLCJhcHBJbml0UmVkdWNlciIsInRhc2tJbml0IiwidGFza0luaXRSZWR1Y2VyIiwidGFza1JlZnJlc2giLCJ0YXNrUmVmcmVzaFJlZHVjZXIiLCJ0YXNrQW5zd2VyTG9hZGVkIiwidGFza1N0YXRlTG9hZGVkIiwiaW5jbHVkZXMiLCJDaXBoZXJlZFRleHRCdW5kbGUiLCJTZWxlY3RlZFRleHRCdW5kbGUiLCJGcmVxdWVuY3lBbmFseXNpc0J1bmRsZSIsIlNjaGVkdWxpbmdCdW5kbGUiLCJSb3RvcnNCdW5kbGUiLCJEZWNpcGhlcmVkVGV4dEJ1bmRsZSIsIldvcmtzcGFjZUJ1bmRsZSIsInNlbGVjdG9ycyIsImdldFRhc2tTdGF0ZSIsImdldFRhc2tBbnN3ZXIiLCJwcm9jZXNzIiwiZWFybHlSZWR1Y2VyIiwic3RhdGUiLCJhY3Rpb24iLCJjb25zb2xlIiwibG9nIiwidHlwZSIsIl9hY3Rpb24iLCJ0YXNrTWV0YURhdGEiLCJ0YXNrRGF0YSIsImFscGhhYmV0Iiwicm90b3JTcGVjcyIsInJvdG9ycyIsImhpbnRzIiwibWFwIiwiXyIsInRhc2tSZWFkeSIsImR1bXAiLCJyb3RvciIsImNlbGxzIiwiZWRpdGFibGUiLCJpbmRleE9mIiwiYW5zd2VyIiwicGF5bG9hZCIsIiRzZXQiLCJydW4iLCJjb250YWluZXIiLCJvcHRpb25zIiwicGxhdGZvcm0iLCJ3aW5kb3ciLCJkZWJ1ZyIsIkFwcEJ1bmRsZSIsImFjdGlvbnMiLCJ2aWV3cyIsInJlZHVjZXIiLCJyb290U2FnYSIsInNhZmVSZWR1Y2VyIiwiZXgiLCJlcnJvciIsImVycm9ycyIsInNhZ2FNaWRkbGV3YXJlIiwiZW5oYW5jZXIiLCJzdG9yZSIsInN0YXJ0IiwicXVlcnkiLCJxdWVyeVN0cmluZyIsInBhcnNlIiwibG9jYXRpb24iLCJzZWFyY2giLCJ0YXNrVG9rZW4iLCJzVG9rZW4iLCJkaXNwYXRjaCIsIlJlYWN0RE9NIiwicmVuZGVyIiwibGluayIsInJvb3RCdW5kbGUiLCJmZWF0dXJlcyIsIkFjdGlvbnMiLCJWaWV3cyIsIlNlbGVjdG9ycyIsIkVhcmx5UmVkdWNlcnMiLCJSZWR1Y2VycyIsIkFjdGlvblJlZHVjZXJzIiwiTGF0ZVJlZHVjZXJzIiwiU2FnYXMiLCJhcHAiLCJmZWF0dXJlIiwicHJlcGFyZSIsImxpbmtCdW5kbGUiLCJmaW5hbGl6ZSIsImJ1bmRsZSIsImFkZCIsInN1YkJ1bmRsZSIsIk9iamVjdCIsImFzc2lnbiIsIl9hcHAiLCJ1bmRlZmluZWQiLCJyZWR1Y2VycyIsInNlcXVlbmNlUmVkdWNlcnMiLCJsYXRlUmVkdWNlciIsIk1hcCIsImtleXMiLCJrZXkiLCJnZXQiLCJzZXQiLCJhY3Rpb25SZWR1Y2VyIiwibWFrZUFjdGlvblJlZHVjZXIiLCJzYWdhcyIsInNhZ2EiLCJwdXNoIiwiQXJyYXkiLCJwcm90b3R5cGUiLCJhcHBseSIsImVmZmVjdHMiLCJlbnRyaWVzIiwicmVzdWx0IiwiaSIsImxlbmd0aCIsIkVycm9yIiwiY29tcG9zZVJlZHVjZXJzIiwiZnN0Iiwic25kIiwiYXBwU2FnYSIsImFwcEluaXRTYWdhIiwicGxhdGZvcm1WYWxpZGF0ZVNhZ2EiLCJhcHBJbml0RG9uZVJlZHVjZXIiLCJwbGF0Zm9ybUFwaSIsInRhc2tBcGkiLCJzZXJ2ZXJBcGkiLCJhcHBJbml0RmFpbGVkUmVkdWNlciIsIm1lc3NhZ2UiLCJmYXRhbEVycm9yIiwicGxhdGZvcm1WYWxpZGF0ZSIsInRhc2tBY3Rpb25zIiwibG9hZCIsInVubG9hZCIsInVwZGF0ZVRva2VuIiwiZ2V0SGVpZ2h0IiwiZ2V0TWV0YURhdGEiLCJnZXRWaWV3cyIsInNob3dWaWV3cyIsImdldFN0YXRlIiwicmVsb2FkU3RhdGUiLCJnZXRBbnN3ZXIiLCJyZWxvYWRBbnN3ZXIiLCJncmFkZUFuc3dlciIsInNlcnZlcl9tb2R1bGUiLCJtYWtlVGFza0NoYW5uZWwiLCJ0YXNrQ2hhbm5lbCIsInRhc2siLCJhcHBJbml0RmFpbGVkIiwidG9TdHJpbmciLCJhcHBJbml0RG9uZSIsImluaXRXaXRoVGFzayIsIndpbmRvd0hlaWdodE1vbml0b3JTYWdhIiwibW9kZSIsInZhbGlkYXRlIiwiQXBwU2VsZWN0b3IiLCJXb3Jrc3BhY2UiLCJncmFkaW5nIiwiQXBwIiwicHJvcHMiLCJfdmFsaWRhdGUiLCJmb250V2VpZ2h0Iiwic2NvcmUiLCJSZWFjdCIsIlB1cmVDb21wb25lbnQiLCJQbGF0Zm9ybUJ1bmRsZSIsIkhpbnRzQnVuZGxlIiwiVGFza0JhciIsIm9uVmFsaWRhdGUiLCJTcGlubmVyIiwiX3Byb3BzIiwiZm9udFNpemUiLCJlbWl0IiwibWFrZVRhc2siLCJwcm9wIiwiYnVmZmVycyIsImV4cGFuZGluZyIsInN1Y2Nlc3MiLCJ0b2tlbiIsImFuc3dlclRva2VuIiwiZmV0Y2giLCJtYWtlU2VydmVyQXBpIiwiY29uZmlnIiwic2VydmljZSIsImJvZHkiLCJQcm9taXNlIiwicmVzb2x2ZSIsInJlamVjdCIsInVybCIsIlVSTCIsImJhc2VVcmwiLCJkZXZlbCIsIm1ldGhvZCIsImhlYWRlcnMiLCJKU09OIiwic3RyaW5naWZ5IiwidGhlbiIsInJlc3BvbnNlIiwic3RhdHVzIiwianNvbiIsImNhdGNoIiwiZGF0YSIsImdldFRhc2tQYXJhbXMiLCJkZWZhdWx0VmFsdWUiLCJhc2tIaW50IiwiaGludFRva2VuIiwidXBkYXRlRGlzcGxheSIsInRhc2tTaG93Vmlld3NFdmVudFNhZ2EiLCJ0YXNrR2V0Vmlld3NFdmVudFNhZ2EiLCJ0YXNrVXBkYXRlVG9rZW5FdmVudFNhZ2EiLCJ0YXNrR2V0SGVpZ2h0RXZlbnRTYWdhIiwidGFza1VubG9hZEV2ZW50U2FnYSIsInRhc2tHZXRNZXRhRGF0YUV2ZW50U2FnYSIsInRhc2tHZXRBbnN3ZXJFdmVudFNhZ2EiLCJ0YXNrUmVsb2FkQW5zd2VyRXZlbnRTYWdhIiwidGFza0dldFN0YXRlRXZlbnRTYWdhIiwidGFza1JlbG9hZFN0YXRlRXZlbnRTYWdhIiwidGFza0xvYWRFdmVudFNhZ2EiLCJ0YXNrR3JhZGVBbnN3ZXJFdmVudFNhZ2EiLCJ0YXNrRGF0YUxvYWRlZFJlZHVjZXIiLCJ0YXNrU3RhdGVMb2FkZWRSZWR1Y2VyIiwidGFza0Fuc3dlckxvYWRlZFJlZHVjZXIiLCJ0YXNrU2hvd1ZpZXdzRXZlbnRSZWR1Y2VyIiwidGFza1ZpZXdzIiwidGFza1VwZGF0ZVRva2VuRXZlbnRSZWR1Y2VyIiwid2FybiIsImQiLCJkb2N1bWVudCIsImgiLCJNYXRoIiwibWF4Iiwib2Zmc2V0SGVpZ2h0IiwiZG9jdW1lbnRFbGVtZW50IiwiX2Vycm9yIiwibWV0YURhdGEiLCJzdHJBbnN3ZXIiLCJzdHJEdW1wIiwiX3ZpZXdzIiwidGFza0RhdGFMb2FkZWQiLCJ0YXNrQW5zd2VyR3JhZGVkIiwibWluU2NvcmUiLCJtYXhTY29yZSIsIm5vU2NvcmUiLCJtaW5fc2NvcmUiLCJtYXhfc2NvcmUiLCJub19zY29yZSIsInNjb3JlVG9rZW4iLCJ0YXNrQW5zd2VyR3JhZGVkUmVkdWNlciIsInRhc2tMb2FkRXZlbnQiLCJ0YXNrVW5sb2FkRXZlbnQiLCJ0YXNrVXBkYXRlVG9rZW5FdmVudCIsInRhc2tHZXRIZWlnaHRFdmVudCIsInRhc2tHZXRNZXRhRGF0YUV2ZW50IiwidGFza0dldFZpZXdzRXZlbnQiLCJ0YXNrU2hvd1ZpZXdzRXZlbnQiLCJ0YXNrR2V0U3RhdGVFdmVudCIsInRhc2tSZWxvYWRTdGF0ZUV2ZW50IiwidGFza0dldEFuc3dlckV2ZW50IiwidGFza1JlbG9hZEFuc3dlckV2ZW50IiwidGFza0dyYWRlQW5zd2VyRXZlbnQiLCJyZXF1ZXN0SGludFNhZ2EiLCJoaW50UmVxdWVzdEZ1bGZpbGxlZFJlZHVjZXIiLCJoaW50UmVxdWVzdCIsImhpbnRSZXF1ZXN0UmVqZWN0ZWRSZWR1Y2VyIiwiY29kZSIsImhpbnRSZXF1ZXN0RmVlZGJhY2tDbGVhcmVkUmVkdWNlciIsInJlcXVlc3QiLCJpbml0aWFsVGFza1Rva2VuIiwidXBkYXRlZFRhc2tUb2tlbiIsImhpbnRSZXF1ZXN0RnVsZmlsbGVkIiwiaGludFJlcXVlc3RSZWplY3RlZCIsIkhpbnRSZXF1ZXN0RmVlZGJhY2tTZWxlY3RvciIsImhpbnRSZXF1ZXN0RmVlZGJhY2tDbGVhcmVkIiwidmlzaWJsZSIsIkhpbnRSZXF1ZXN0RmVlZGJhY2siLCJoYW5kbGVEaXNtaXNzIiwicmVxdWVzdEhpbnQiLCJoaW50c1NhZ2EiLCJjaGFubmVsIiwib25SZXNpemUiLCJoZWlnaHQiLCJjbGllbnRIZWlnaHQiLCJhZGRFdmVudExpc3RlbmVyIiwicmVtb3ZlRXZlbnRMaXN0ZW5lciIsInNsaWRpbmciLCJsYXN0SGVpZ2h0IiwiY2xvc2UiLCJjaXBoZXJlZFRleHQiLCJjZWxsV2lkdGgiLCJjZWxsSGVpZ2h0Iiwic2Nyb2xsVG9wIiwibmJDZWxscyIsImNpcGhlclRleHQiLCJjaXBoZXJlZFRleHRSZXNpemVkUmVkdWNlciIsIndpZHRoIiwiY2lwaGVyZWRUZXh0U2Nyb2xsZWRSZWR1Y2VyIiwiQ2lwaGVyVGV4dFZpZXdTZWxlY3RvciIsImNpcGhlcmVkVGV4dFJlc2l6ZWQiLCJjaXBoZXJlZFRleHRTY3JvbGxlZCIsImJvdHRvbSIsInBhZ2VSb3dzIiwicGFnZUNvbHVtbnMiLCJ2aXNpYmxlUm93cyIsInJvd3MiLCJDaXBoZXJUZXh0VmlldyIsImVsZW1lbnQiLCJfdGV4dEJveCIsImNsaWVudFdpZHRoIiwicmVmVGV4dEJveCIsIm9uU2Nyb2xsIiwicG9zaXRpb24iLCJvdmVyZmxvd1kiLCJpbmRleCIsImNvbHVtbnMiLCJ0b3AiLCJjZWxsIiwibGVmdCIsIkNpcGhlcmVkVGV4dCIsInNlbGVjdGVkVGV4dCIsInNlbGVjdGVkUm93cyIsInNlbGVjdGVkQ29sdW1ucyIsInNlbGVjdGVkVGV4dFJlc2l6ZWRSZWR1Y2VyIiwic2VsZWN0ZWRUZXh0U2Nyb2xsZWRSZWR1Y2VyIiwibWF4VG9wIiwibWluIiwic2VsZWN0ZWRUZXh0TW9kZUNoYW5nZWRSZWR1Y2VyIiwic2VsZWN0ZWRUZXh0UGFnZUNvbHVtbnNDaGFuZ2VkUmVkdWNlciIsInNlbGVjdGVkVGV4dFNlbGVjdGlvbkNoYW5nZWRSZWR1Y2VyIiwic2VsZWN0ZWQiLCJjZWlsIiwic2VsZWN0ZWRUZXh0TGF0ZVJlZHVjZXIiLCJ1cGRhdGVHZW9tZXRyeSIsImdyaWQiLCJTZWxlY3RlZFRleHRWaWV3U2VsZWN0b3IiLCJzZWxlY3RlZFRleHRSZXNpemVkIiwic2VsZWN0ZWRUZXh0U2Nyb2xsZWQiLCJzZWxlY3RlZFRleHRNb2RlQ2hhbmdlZCIsInNlbGVjdGVkVGV4dFBhZ2VDb2x1bW5zQ2hhbmdlZCIsInNlbGVjdGVkVGV4dFNlbGVjdGlvbkNoYW5nZWQiLCJTZWxlY3RlZFRleHRWaWV3IiwiZXZlbnQiLCJ0ZXh0IiwidGFyZ2V0IiwidmFsdWUiLCJwYXJzZUludCIsImlzTmFOIiwic2V0U3RhdGUiLCJjdXJyZW50VGFyZ2V0IiwiZGF0YXNldCIsInNoaWZ0S2V5IiwibWFyZ2luQm90dG9tIiwibWFyZ2luUmlnaHQiLCJzZXRSb3dNb2RlIiwic2V0Q29sTW9kZSIsInNjcm9sbFBhZ2VVcCIsInNjcm9sbFJvd1VwIiwic2Nyb2xsUm93RG93biIsInNjcm9sbFBhZ2VEb3duIiwicGFnZUNvbHVtbnNDaGFuZ2UiLCJjb2xvciIsInNlbGVjdEFsbCIsInNlbGVjdE5vbmUiLCJyb3dDbGlja2VkIiwiY29sdW1uQ2xpY2tlZCIsIlNlbGVjdGVkVGV4dCIsImZyZXF1ZW5jeUFuYWx5c2lzIiwiZnJlcXVlbmN5QW5hbHlzaXNMYXRlUmVkdWNlciIsInJlZmVyZW5jZUZyZXF1ZW5jaWVzIiwiZnJlcXVlbmNpZXMiLCJ0ZXh0RnJlcXVlbmNpZXMiLCJmcmVxTWFwIiwic3BsaXQiLCJjIiwic3RhcnRQb3MiLCJlbmRQb3MiLCJjb3VudFN5bWJvbHMiLCJub3JtYWxpemVBbmRTb3J0RnJlcXVlbmNpZXMiLCJybmciLCJqb2luIiwiYmFzZVByb2JhIiwibWF4UmVmUHJvYmEiLCJyZWR1Y2UiLCJhIiwieCIsInByb2JhIiwiZXBzaWxvbiIsInNlbGVjdGVkRnJlcXVlbmNpZXMiLCJmaWxsIiwiY29sIiwic3VtRnJlcXVlbmNpZXMiLCJwb3MiLCJjb3VudFN5bWJvbCIsImNoYXIiLCJjb3VudCIsImRzdCIsImZyb20iLCJ0b3RhbENvdW50Iiwic29ydCIsInMxIiwiczIiLCJwMSIsInAyIiwic3ltYm9sIiwiRnJlcXVlbmN5QW5hbHlzaXNTZWxlY3RvciIsInNjYWxlIiwiYWxwaGFiZXRTaXplIiwiRnJlcXVlbmN5QW5hbHlzaXNWaWV3IiwiZmxvYXQiLCJsaW5lSGVpZ2h0IiwiVGV4dEZyZXF1ZW5jeUJveCIsImRpc3BsYXkiLCJ2ZXJ0aWNhbEFsaWduIiwicm91bmQiLCJtYXJnaW5MZWZ0IiwiYmFja2dyb3VuZCIsImJvcmRlciIsInRleHRBbGlnbiIsIlJlZmVyZW5jZUZyZXF1ZW5jeUJveCIsIkZyZXF1ZW5jeUFuYWx5c2lzIiwic2NoZWR1bGluZ1NhZ2EiLCJzY2hlZHVsaW5nIiwic3BlZWQiLCJzaGlmdHMiLCJzdGFydFBvc2l0aW9uIiwiZW5kUG9zaXRpb24iLCJjdXJyZW50VHJhY2UiLCJzY2hlZHVsaW5nU3RhdHVzQ2hhbmdlZFJlZHVjZXIiLCJjaGFuZ2VzIiwic2NoZWR1bGluZ1N0ZXBCYWNrd2FyZFJlZHVjZXIiLCJzY2hlZHVsaW5nU3RlcEZvcndhcmRSZWR1Y2VyIiwic2NoZWR1bGluZ0p1bXBSZWR1Y2VyIiwic2NoZWR1bGluZ1RpY2tSZWR1Y2VyIiwic2NoZWR1bGluZ0xhdGVSZWR1Y2VyIiwicmFuayIsInRyYWNlIiwic2NoZWR1bGluZ1RpY2siLCJuYW1lIiwic3RhdHVzQ2hhbmdpbmdBY3Rpb25zIiwiU2NoZWR1bGluZ0NvbnRyb2xzU2VsZWN0b3IiLCJzY2hlZHVsaW5nU3RhdHVzQ2hhbmdlZCIsInNjaGVkdWxpbmdTdGVwQmFja3dhcmQiLCJzY2hlZHVsaW5nU3RlcEZvcndhcmQiLCJTY2hlZHVsaW5nQ29udHJvbHNWaWV3IiwiX2V2ZW50IiwibWFyZ2luIiwib25GYXN0QmFja3dhcmRDbGlja2VkIiwib25TdGVwQmFja3dhcmRDbGlja2VkIiwib25QbGF5Q2xpY2tlZCIsIm9uU3RlcEZvcndhcmRDbGlja2VkIiwib25GYXN0Rm9yd2FyZENsaWNrZWQiLCJzY2hlZHVsaW5nSnVtcCIsIlNjaGVkdWxpbmdDb250cm9scyIsImVkaXRpbmciLCJyb3RvckNlbGxFZGl0U3RhcnRlZFJlZHVjZXIiLCJyb3RvckluZGV4IiwiY2VsbFJhbmsiLCJyb3RvckNlbGxFZGl0TW92ZWRSZWR1Y2VyIiwicm90b3JNb3ZlIiwiY2VsbE1vdmUiLCJyb3RvclN0b3AiLCJjZWxsU3RvcCIsImhpbnQiLCJsb2NrZWQiLCJyb3RvckNlbGxFZGl0Q2FuY2VsbGVkUmVkdWNlciIsInJvdG9yQ2VsbENoYXJDaGFuZ2VkUmVkdWNlciIsInJvdG9yQ2VsbExvY2tDaGFuZ2VkUmVkdWNlciIsImlzTG9ja2VkIiwicm90b3JLZXlMb2FkZWRSZWR1Y2VyIiwiUm90b3JTZWxlY3RvciIsInJvdG9yQ2VsbExvY2tDaGFuZ2VkIiwicm90b3JDZWxsQ2hhckNoYW5nZWQiLCJyb3RvckNlbGxFZGl0Q2FuY2VsbGVkIiwicm90b3JDZWxsRWRpdFN0YXJ0ZWQiLCJyb3RvckNlbGxFZGl0TW92ZWQiLCJlZGl0YWJsZVJvdyIsInNoaWZ0IiwiYWN0aXZlUmFuayIsImVkaXRpbmdSYW5rIiwiUm90b3JWaWV3IiwidG9VcHBlckNhc2UiLCJjb25mbGljdCIsImlzQWN0aXZlIiwiaXNFZGl0aW5nIiwiaXNMYXN0Iiwic2hpZnRlZEluZGV4Iiwicm90YXRpbmciLCJvbkNoYW5nZUNoYXIiLCJvbkNoYW5nZUxvY2tlZCIsIm9uRWRpdGluZ1N0YXJ0ZWQiLCJvbkVkaXRpbmdDYW5jZWxsZWQiLCJlZGl0aW5nTW92ZWQiLCJSb3RvckNlbGwiLCJoYW5kbGVkIiwib25FZGl0aW5nTW92ZWQiLCJwcmV2ZW50RGVmYXVsdCIsInN0b3BQcm9wYWdhdGlvbiIsIl9pbnB1dCIsInN1YnN0ciIsInN0YXRpY0NoYXIiLCJlZGl0YWJsZUNoYXIiLCJpc0hpbnQiLCJpc0NvbmZsaWN0IiwiY29sdW1uU3R5bGUiLCJzdGF0aWNDZWxsU3R5bGUiLCJib3JkZXJSaWdodFdpZHRoIiwiZWRpdGFibGVDZWxsU3R5bGUiLCJjdXJzb3IiLCJiYWNrZ3JvdW5kQ29sb3IiLCJib3R0b21DZWxsU3R5bGUiLCJtYXJnaW5Ub3AiLCJib3JkZXJUb3BXaWR0aCIsInN0YXRpY0NlbGwiLCJlZGl0YWJsZUNlbGwiLCJzdGFydEVkaXRpbmciLCJyZWZJbnB1dCIsImNlbGxDaGFuZ2VkIiwia2V5RG93biIsImxvY2siLCJsb2NrQ2xpY2tlZCIsInNlbGVjdCIsImZvY3VzIiwicm90b3JLZXlMb2FkZWQiLCJSb3RvciIsImRlY2lwaGVyZWRUZXh0IiwiZGVjaXBoZXJlZFRleHRSZXNpemVkUmVkdWNlciIsImRlY2lwaGVyZWRUZXh0U2Nyb2xsZWRSZWR1Y2VyIiwiZGVjaXBoZXJlZFRleHRMYXRlUmVkdWNlciIsImdldENlbGwiLCJjaXBoZXJlZCIsImN1cnJlbnQiLCJjbGVhciIsIkRlY2lwaGVyZWRUZXh0Vmlld1NlbGVjdG9yIiwiZGVjaXBoZXJlZFRleHRSZXNpemVkIiwiZGVjaXBoZXJlZFRleHRTY3JvbGxlZCIsIkRlY2lwaGVyZWRUZXh0VmlldyIsIm9uSnVtcCIsIlRleHRDZWxsIiwiY29sdW1uIiwiY2VsbFN0eWxlIiwiYm9yZGVyV2lkdGgiLCJfanVtcCIsImJvcmRlckJvdHRvbSIsIkRlY2lwaGVyZWRUZXh0IiwiV29ya3NwYWNlU2VsZWN0b3IiLCJlZGl0aW5nQ2VsbCIsIm5iUm90b3JzIiwicGFkZGluZyIsImJvcmRlclJhZGl1cyIsImJpc2VjdCIsImxvIiwiaGkiLCJtaWQiLCJjaGFuZ2VTZWxlY3Rpb24iLCJ2YWx1ZXMiLCIkc3BsaWNlIiwic29ydGVkQXJyYXlIYXNFbGVtZW50IiwidXBkYXRlR3JpZEdlb21ldHJ5Iiwic2Nyb2xsQmFyV2lkdGgiLCJmbG9vciIsInVwZGF0ZUdyaWRWaXNpYmxlUm93cyIsImZpcnN0Um93IiwibGFzdFJvdyIsIl9pbmRleCIsInJvd0luZGV4Iiwicm93U3RhcnRQb3MiLCJyb3dDZWxscyIsImNvbEluZGV4IiwidXBkYXRlR3JpZFZpc2libGVDb2x1bW5zIiwiY29sQ2VsbHMiLCJ1cGRhdGVHcmlkVmlzaWJsZUFyZWEiLCJtYWtlUm90b3IiLCJzY2hlZHVsZSIsInNpemUiLCJudWxsUGVybSIsImZvcndhcmQiLCJiYWNrd2FyZCIsImR1bXBSb3RvcnMiLCJsb2FkUm90b3JzIiwicm90b3JEdW1wcyIsIiRjZWxscyIsImZvckVhY2giLCJjZWxsSW5kZXgiLCJqIiwibWFya1JvdG9yQ29uZmxpY3RzIiwidXBkYXRlUGVybXMiLCJlZGl0Um90b3JDZWxsIiwibG9ja1JvdG9yQ2VsbCIsImNvdW50cyIsImhhcyIsInJhbmtzIiwidXBkYXRlUm90b3JXaXRoS2V5Iiwic291cmNlIiwiZ2V0Um90b3JTaGlmdCIsImFwcGx5Um90b3JzIiwibG9ja3MiLCJhcHBseVJvdG9yIiwiYXBwbHlTaGlmdCIsImNvbGxpc2lvbiIsIm1vZCIsImFtb3VudCIsIndyYXBBcm91bmQiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUNBOztBQUNBOztBQUVBOztBQUNBOztBQUNBOztBQUVBOztBQUNBOztBQUNBOztBQUNBOztBQUNBOztBQUNBOztBQUNBOztBQUNBOztBQUVBLElBQU1BLFVBQVUsR0FBRztBQUNmQyxnQkFBYyxFQUFFO0FBQ1pDLFdBQU8sRUFBRUMsY0FERztBQUVaQyxZQUFRLEVBQUVDO0FBQWdCO0FBRmQ7QUFHWkMsZUFBVyxFQUFFQztBQUFtQjtBQUhwQjtBQUlaQyxvQkFBZ0IsRUFBRUEsZ0JBSk47QUFLWkMsbUJBQWUsRUFBRUE7QUFMTCxHQUREO0FBUWZDLFVBQVEsRUFBRSxDQUNOQyw2QkFETSxFQUVOQyw2QkFGTSxFQUdOQyxrQ0FITSxFQUlOQywwQkFKTSxFQUtOQyxzQkFMTSxFQU1OQywrQkFOTSxFQU9OQyx5QkFQTSxDQVJLO0FBaUJmQyxXQUFTLEVBQUU7QUFDVEMsZ0JBQVksRUFBWkEsWUFEUztBQUVUQyxpQkFBYSxFQUFiQTtBQUZTO0FBakJJLENBQW5COztBQXVCQSxJQUFJQyxTQUFBLEtBQXlCLGFBQTdCLEVBQTRDO0FBQ3hDO0FBQ0FyQixZQUFVLENBQUNzQixZQUFYLEdBQTBCLFVBQVVDLEtBQVYsRUFBaUJDLE1BQWpCLEVBQXlCO0FBQy9DQyxXQUFPLENBQUNDLEdBQVIsQ0FBWSxRQUFaLEVBQXNCRixNQUFNLENBQUNHLElBQTdCLEVBQW1DSCxNQUFuQztBQUNBLFdBQU9ELEtBQVA7QUFDSCxHQUhEO0FBSUg7O0FBRUQsU0FBU3BCLGNBQVQsQ0FBeUJvQixLQUF6QixFQUFnQ0ssT0FBaEMsRUFBeUM7QUFDckMsTUFBTUMsWUFBWSxHQUFHO0FBQ2xCLFVBQU0sOENBRFk7QUFFbEIsZ0JBQVksSUFGTTtBQUdsQixlQUFXLE9BSE87QUFJbEIsZUFBVyxtQkFKTztBQUtsQixtQkFBZSxFQUxHO0FBTWxCLGVBQVcsRUFOTztBQU9sQixzQkFBa0IsRUFQQTtBQVFsQix5QkFBcUIsRUFSSDtBQVNsQixzQkFBa0IsRUFUQTtBQVVsQixvQkFBZ0IsSUFWRTtBQVdsQix1QkFBbUIsRUFYRDtBQVlsQixzQkFBa0I7QUFaQSxHQUFyQjtBQWNBLHlDQUFXTixLQUFYO0FBQWtCTSxnQkFBWSxFQUFaQTtBQUFsQjtBQUNIOztBQUVELFNBQVN4QixlQUFULENBQTBCa0IsS0FBMUIsRUFBaUNLLE9BQWpDLEVBQTBDO0FBQUEsd0JBQ2tCTCxLQURsQixDQUNqQ08sUUFEaUM7QUFBQSxNQUN0QkMsUUFEc0IsbUJBQ3RCQSxRQURzQjtBQUFBLE1BQ0pDLFVBREksbUJBQ1pDLE1BRFk7QUFBQSxNQUNRQyxLQURSLG1CQUNRQSxLQURSO0FBRXhDLE1BQU1ELE1BQU0sR0FBRyx1QkFBV0YsUUFBWCxFQUFxQkMsVUFBckIsRUFBaUNFLEtBQWpDLEVBQXdDRixVQUFVLENBQUNHLEdBQVgsQ0FBZSxVQUFBQyxDQUFDO0FBQUEsV0FBSSxFQUFKO0FBQUEsR0FBaEIsQ0FBeEMsQ0FBZjtBQUNBLHlDQUFXYixLQUFYO0FBQWtCVSxVQUFNLEVBQU5BLE1BQWxCO0FBQTBCSSxhQUFTLEVBQUU7QUFBckM7QUFDRDs7QUFFRCxTQUFTOUIsa0JBQVQsQ0FBNkJnQixLQUE3QixFQUFvQ0ssT0FBcEMsRUFBNkM7QUFBQSx5QkFDZUwsS0FEZixDQUNwQ08sUUFEb0M7QUFBQSxNQUN6QkMsUUFEeUIsb0JBQ3pCQSxRQUR5QjtBQUFBLE1BQ1BDLFVBRE8sb0JBQ2ZDLE1BRGU7QUFBQSxNQUNLQyxLQURMLG9CQUNLQSxLQURMO0FBRTNDLE1BQU1JLElBQUksR0FBRyx1QkFBV1AsUUFBWCxFQUFxQlIsS0FBSyxDQUFDVSxNQUEzQixDQUFiO0FBQ0EsTUFBTUEsTUFBTSxHQUFHLHVCQUFXRixRQUFYLEVBQXFCQyxVQUFyQixFQUFpQ0UsS0FBakMsRUFBd0NJLElBQXhDLENBQWY7QUFDQSx5Q0FBV2YsS0FBWDtBQUFrQlUsVUFBTSxFQUFOQTtBQUFsQjtBQUNEOztBQUVELFNBQVNiLGFBQVQsQ0FBd0JHLEtBQXhCLEVBQStCO0FBQUEsTUFDWFEsUUFEVyxHQUNFUixLQURGLENBQ3RCTyxRQURzQixDQUNYQyxRQURXO0FBRTdCLFNBQU87QUFDTEUsVUFBTSxFQUFFVixLQUFLLENBQUNVLE1BQU4sQ0FBYUUsR0FBYixDQUFpQixVQUFBSSxLQUFLO0FBQUEsYUFBSUEsS0FBSyxDQUFDQyxLQUFOLENBQVlMLEdBQVosQ0FBZ0I7QUFBQSxZQUFFTSxRQUFGLFFBQUVBLFFBQUY7QUFBQSxlQUFnQlYsUUFBUSxDQUFDVyxPQUFULENBQWlCRCxRQUFqQixDQUFoQjtBQUFBLE9BQWhCLENBQUo7QUFBQSxLQUF0QjtBQURILEdBQVA7QUFHRDs7QUFFRCxTQUFTakMsZ0JBQVQsQ0FBMkJlLEtBQTNCLFNBQXVEO0FBQUEsTUFBVm9CLE1BQVUsU0FBcEJDLE9BQW9CLENBQVZELE1BQVU7QUFBQSx5QkFDS3BCLEtBREwsQ0FDOUNPLFFBRDhDO0FBQUEsTUFDbkNDLFFBRG1DLG9CQUNuQ0EsUUFEbUM7QUFBQSxNQUNqQkMsVUFEaUIsb0JBQ3pCQyxNQUR5QjtBQUFBLE1BQ0xDLEtBREssb0JBQ0xBLEtBREs7QUFFckQsTUFBTUQsTUFBTSxHQUFHLHVCQUFXRixRQUFYLEVBQXFCQyxVQUFyQixFQUFpQ0UsS0FBakMsRUFBd0NTLE1BQU0sQ0FBQ1YsTUFBL0MsQ0FBZjtBQUNBLFNBQU8saUNBQU9WLEtBQVAsRUFBYztBQUFDVSxVQUFNLEVBQUU7QUFBQ1ksVUFBSSxFQUFFWjtBQUFQO0FBQVQsR0FBZCxDQUFQO0FBQ0Q7O0FBRUQsU0FBU2QsWUFBVCxDQUF1QkksS0FBdkIsRUFBOEI7QUFBQSxNQUNWUSxRQURVLEdBQ0dSLEtBREgsQ0FDckJPLFFBRHFCLENBQ1ZDLFFBRFU7QUFFNUIsU0FBTztBQUFDRSxVQUFNLEVBQUUsdUJBQVdGLFFBQVgsRUFBcUJSLEtBQUssQ0FBQ1UsTUFBM0I7QUFBVCxHQUFQO0FBQ0Q7O0FBRUQsU0FBU3hCLGVBQVQsQ0FBMEJjLEtBQTFCLFNBQW9EO0FBQUEsTUFBUmUsSUFBUSxTQUFsQk0sT0FBa0IsQ0FBUk4sSUFBUTtBQUFBLHlCQUNRZixLQURSLENBQzNDTyxRQUQyQztBQUFBLE1BQ2hDQyxRQURnQyxvQkFDaENBLFFBRGdDO0FBQUEsTUFDZEMsVUFEYyxvQkFDdEJDLE1BRHNCO0FBQUEsTUFDRkMsS0FERSxvQkFDRkEsS0FERTtBQUVsRCxNQUFNRCxNQUFNLEdBQUcsdUJBQVdGLFFBQVgsRUFBcUJDLFVBQXJCLEVBQWlDRSxLQUFqQyxFQUF3Q0ksSUFBSSxDQUFDTCxNQUE3QyxDQUFmO0FBQ0EsU0FBTyxpQ0FBT1YsS0FBUCxFQUFjO0FBQUNVLFVBQU0sRUFBRTtBQUFDWSxVQUFJLEVBQUVaO0FBQVA7QUFBVCxHQUFkLENBQVA7QUFDRDs7QUFFTSxTQUFTYSxHQUFULENBQWNDLFNBQWQsRUFBeUJDLE9BQXpCLEVBQWtDO0FBQ3JDLFNBQU8saUNBQWlCRCxTQUFqQixFQUE0QkMsT0FBNUIsRUFBcUNoRCxVQUFyQyxDQUFQO0FBQ0gsQzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDaEdEOztBQUNBOztBQUNBOztBQUNBOztBQUNBOztBQUNBOztBQUNBOztBQUVBOztBQUNBOztBQUVBOztBQXBCQTs7Ozs7OztBQVFBO0FBY2Usa0JBQVUrQyxTQUFWLEVBQXFCQyxPQUFyQixFQUE4QmhELFVBQTlCLEVBQTBDO0FBQ3JELE1BQU1pRCxRQUFRLEdBQUdDLE1BQU0sQ0FBQ0QsUUFBeEI7QUFDQSxNQUFJNUIsU0FBQSxLQUF5QixhQUE3QixFQUE0QzRCLFFBQVEsQ0FBQ0UsS0FBVCxHQUFpQixJQUFqQjs7QUFGUyxjQUlFLHFCQUFLO0FBQUN6QyxZQUFRLEVBQUUsQ0FBQzBDLG1CQUFELEVBQVlwRCxVQUFaO0FBQVgsR0FBTCxDQUpGO0FBQUEsTUFJOUNxRCxPQUo4QyxTQUk5Q0EsT0FKOEM7QUFBQSxNQUlyQ0MsS0FKcUMsU0FJckNBLEtBSnFDO0FBQUEsTUFJOUJwQyxTQUo4QixTQUk5QkEsU0FKOEI7QUFBQSxNQUluQnFDLE9BSm1CLFNBSW5CQSxPQUptQjtBQUFBLE1BSVZDLFFBSlUsU0FJVkEsUUFKVTtBQU1yRDs7O0FBQ0EsTUFBTUMsV0FBVyxHQUFHLFNBQWRBLFdBQWMsQ0FBVWxDLEtBQVYsRUFBaUJDLE1BQWpCLEVBQXlCO0FBQ3pDLFFBQUk7QUFDQSxhQUFPK0IsT0FBTyxDQUFDaEMsS0FBRCxFQUFRQyxNQUFSLENBQWQ7QUFDSCxLQUZELENBRUUsT0FBT2tDLEVBQVAsRUFBVztBQUNUakMsYUFBTyxDQUFDa0MsS0FBUixDQUFjLHlCQUFkLEVBQXlDbkMsTUFBekMsRUFBaURrQyxFQUFqRDtBQUNBLDZDQUFXbkMsS0FBWDtBQUFrQnFDLGNBQU0sRUFBRSxDQUFDRixFQUFEO0FBQTFCO0FBQ0g7QUFDSixHQVBEOztBQVFBLE1BQU1HLGNBQWMsR0FBRyx5QkFBdkI7QUFDQSxNQUFNQyxRQUFRLEdBQUcsNEJBQWdCRCxjQUFoQixDQUFqQjtBQUNBLE1BQU1FLEtBQUssR0FBRyx3QkFBWU4sV0FBWixFQUF5QjtBQUFDSixXQUFPLEVBQVBBLE9BQUQ7QUFBVUMsU0FBSyxFQUFMQSxLQUFWO0FBQWlCcEMsYUFBUyxFQUFUQTtBQUFqQixHQUF6QixFQUFzRDRDLFFBQXRELENBQWQ7QUFFQTs7QUFDQSxXQUFTRSxLQUFULEdBQWtCO0FBQ2RILGtCQUFjLENBQUNmLEdBQWY7QUFBQTtBQUFBLDhCQUFtQjtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUVYLHFCQUFNLG1CQUFLVSxRQUFMLENBQU47O0FBRlc7QUFBQTtBQUFBOztBQUFBO0FBQUE7QUFBQTtBQUlYL0IscUJBQU8sQ0FBQ2tDLEtBQVIsQ0FBYyxlQUFkOztBQUpXO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLEtBQW5CO0FBT0g7O0FBQ0RLLE9BQUs7QUFFTDs7QUFDQSxNQUFNQyxLQUFLLEdBQUdDLHFCQUFZQyxLQUFaLENBQWtCQyxRQUFRLENBQUNDLE1BQTNCLENBQWQ7O0FBQ0EsTUFBTUMsU0FBUyxHQUFHTCxLQUFLLENBQUNNLE1BQXhCO0FBQ0FSLE9BQUssQ0FBQ1MsUUFBTixDQUFlO0FBQUM3QyxRQUFJLEVBQUUwQixPQUFPLENBQUNuRCxPQUFmO0FBQXdCMEMsV0FBTyxFQUFFO0FBQUNJLGFBQU8sRUFBUEEsT0FBRDtBQUFVc0IsZUFBUyxFQUFUQSxTQUFWO0FBQXFCckIsY0FBUSxFQUFSQTtBQUFyQjtBQUFqQyxHQUFmO0FBRUE7O0FBQ0F3QixvQkFBU0MsTUFBVCxDQUFnQiw2QkFBQyxvQkFBRDtBQUFVLFNBQUssRUFBRVg7QUFBakIsS0FBd0IsNkJBQUMsS0FBRCxDQUFPLEdBQVAsT0FBeEIsQ0FBaEIsRUFBaUVoQixTQUFqRTs7QUFFQSxTQUFPO0FBQUNNLFdBQU8sRUFBUEEsT0FBRDtBQUFVQyxTQUFLLEVBQUxBLEtBQVY7QUFBaUJTLFNBQUssRUFBTEEsS0FBakI7QUFBd0JDLFNBQUssRUFBTEE7QUFBeEIsR0FBUDtBQUNILEM7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDekREOztBQUxBOzs7O0FBT2UsU0FBU1csSUFBVCxDQUFlQyxVQUFmLEVBQTJCQyxRQUEzQixFQUFxQztBQUNsREEsVUFBUSxHQUFHQSxRQUFRLElBQUksQ0FBQ0MsT0FBRCxFQUFVQyxLQUFWLEVBQWlCQyxTQUFqQixFQUE0QkMsYUFBNUIsRUFBMkNDLFFBQTNDLEVBQXFEQyxjQUFyRCxFQUFxRUMsWUFBckUsRUFBbUZDLEtBQW5GLENBQXZCO0FBQ0EsTUFBTUMsR0FBRyxHQUFHLEVBQVo7QUFGa0Q7QUFBQTtBQUFBOztBQUFBO0FBR2xELHlCQUFvQlQsUUFBcEIsOEhBQThCO0FBQUEsVUFBckJVLE9BQXFCO0FBQzVCQSxhQUFPLENBQUNDLE9BQVIsQ0FBZ0JGLEdBQWhCO0FBQ0Q7QUFMaUQ7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTs7QUFNbERHLFlBQVUsQ0FBQ2IsVUFBRCxFQUFhQyxRQUFiLEVBQXVCUyxHQUF2QixDQUFWO0FBTmtEO0FBQUE7QUFBQTs7QUFBQTtBQU9sRCwwQkFBb0JULFFBQXBCLG1JQUE4QjtBQUFBLFVBQXJCVSxRQUFxQjs7QUFDNUJBLGNBQU8sQ0FBQ0csUUFBUixDQUFpQkosR0FBakI7QUFDRDtBQVRpRDtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBOztBQVVsRCxTQUFPQSxHQUFQO0FBQ0Q7O0FBRUQsU0FBU0csVUFBVCxDQUFxQkUsTUFBckIsRUFBNkJkLFFBQTdCLEVBQXVDUyxHQUF2QyxFQUE0QztBQUFBO0FBQUE7QUFBQTs7QUFBQTtBQUMxQywwQkFBb0JULFFBQXBCLG1JQUE4QjtBQUFBLFVBQXJCVSxPQUFxQjtBQUM1QkEsYUFBTyxDQUFDSyxHQUFSLENBQVlOLEdBQVosRUFBaUJLLE1BQWpCO0FBQ0Q7QUFIeUM7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTs7QUFJMUMsTUFBSUEsTUFBTSxDQUFDakYsUUFBWCxFQUFxQjtBQUFBO0FBQUE7QUFBQTs7QUFBQTtBQUNuQiw0QkFBc0JpRixNQUFNLENBQUNqRixRQUE3QixtSUFBdUM7QUFBQSxZQUE5Qm1GLFNBQThCO0FBQ3JDSixrQkFBVSxDQUFDSSxTQUFELEVBQVloQixRQUFaLEVBQXNCUyxHQUF0QixDQUFWO0FBQ0Q7QUFIa0I7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUlwQjtBQUNGOztBQUVELElBQU1SLE9BQU8sR0FBRztBQUNkVSxTQUFPLEVBQUUsaUJBQVVGLEdBQVYsRUFBZTtBQUN0QkEsT0FBRyxDQUFDakMsT0FBSixHQUFjLEVBQWQ7QUFDRCxHQUhhO0FBSWR1QyxLQUFHLEVBQUUsYUFBVU4sR0FBVixRQUEwQjtBQUFBLFFBQVZqQyxPQUFVLFFBQVZBLE9BQVU7O0FBQzdCLFFBQUlBLE9BQUosRUFBYTtBQUNYeUMsWUFBTSxDQUFDQyxNQUFQLENBQWNULEdBQUcsQ0FBQ2pDLE9BQWxCLEVBQTJCQSxPQUEzQjtBQUNEO0FBQ0YsR0FSYTtBQVNkcUMsVUFBUSxFQUFFLGtCQUFVTSxJQUFWLEVBQWdCLENBQ3pCO0FBVmEsQ0FBaEI7QUFhQSxJQUFNakIsS0FBSyxHQUFHO0FBQ1pTLFNBQU8sRUFBRSxpQkFBVUYsR0FBVixFQUFlO0FBQ3RCQSxPQUFHLENBQUNoQyxLQUFKLEdBQVksRUFBWjtBQUNELEdBSFc7QUFJWnNDLEtBQUcsRUFBRSxhQUFVTixHQUFWLFNBQXdCO0FBQUEsUUFBUmhDLEtBQVEsU0FBUkEsS0FBUTs7QUFDM0IsUUFBSUEsS0FBSixFQUFXO0FBQ1R3QyxZQUFNLENBQUNDLE1BQVAsQ0FBY1QsR0FBRyxDQUFDaEMsS0FBbEIsRUFBeUJBLEtBQXpCO0FBQ0Q7QUFDRixHQVJXO0FBU1pvQyxVQUFRLEVBQUUsa0JBQVVNLElBQVYsRUFBZ0IsQ0FDekI7QUFWVyxDQUFkO0FBYUEsSUFBTWQsUUFBUSxHQUFHO0FBQ2ZNLFNBQU8sRUFBRSxpQkFBVUYsR0FBVixFQUFlO0FBQ3RCQSxPQUFHLENBQUMvQixPQUFKLEdBQWMwQyxTQUFkO0FBQ0QsR0FIYztBQUlmTCxLQUFHLEVBQUUsYUFBVU4sR0FBVixTQUFvQztBQUFBLFFBQXBCL0IsT0FBb0IsU0FBcEJBLE9BQW9CO0FBQUEsUUFBWDJDLFFBQVcsU0FBWEEsUUFBVzs7QUFDdkMsUUFBSTNDLE9BQUosRUFBYTtBQUNYK0IsU0FBRyxDQUFDL0IsT0FBSixHQUFjNEMsZ0JBQWdCLENBQUNiLEdBQUcsQ0FBQy9CLE9BQUwsRUFBY0EsT0FBZCxDQUE5QjtBQUNEOztBQUNELFFBQUkyQyxRQUFKLEVBQWM7QUFDWlosU0FBRyxDQUFDL0IsT0FBSixHQUFjNEMsZ0JBQWdCLE1BQWhCLFVBQWlCYixHQUFHLENBQUMvQixPQUFyQiwwQ0FBaUMyQyxRQUFqQyxHQUFkO0FBQ0Q7QUFDRixHQVhjO0FBWWZSLFVBQVEsRUFBRSxrQkFBVU0sSUFBVixFQUFnQixDQUN6QjtBQWJjLENBQWpCO0FBZ0JBLElBQU1mLGFBQWEsR0FBRztBQUNwQk8sU0FBTyxFQUFFLGlCQUFVRixHQUFWLEVBQWU7QUFDdEJBLE9BQUcsQ0FBQ2hFLFlBQUosR0FBbUIyRSxTQUFuQjtBQUNELEdBSG1CO0FBSXBCTCxLQUFHLEVBQUUsYUFBVU4sR0FBVixTQUErQjtBQUFBLFFBQWZoRSxZQUFlLFNBQWZBLFlBQWU7QUFDbENnRSxPQUFHLENBQUNoRSxZQUFKLEdBQW1CNkUsZ0JBQWdCLENBQUNiLEdBQUcsQ0FBQ2hFLFlBQUwsRUFBbUJBLFlBQW5CLENBQW5DO0FBQ0QsR0FObUI7QUFPcEJvRSxVQUFRLEVBQUUsa0JBQVVKLEdBQVYsRUFBZTtBQUN2QkEsT0FBRyxDQUFDL0IsT0FBSixHQUFjNEMsZ0JBQWdCLENBQUNiLEdBQUcsQ0FBQ2hFLFlBQUwsRUFBbUJnRSxHQUFHLENBQUMvQixPQUF2QixDQUE5QjtBQUNBLFdBQU8rQixHQUFHLENBQUNoRSxZQUFYO0FBQ0Q7QUFWbUIsQ0FBdEI7QUFhQSxJQUFNOEQsWUFBWSxHQUFHO0FBQ25CSSxTQUFPLEVBQUUsaUJBQVVGLEdBQVYsRUFBZTtBQUN0QkEsT0FBRyxDQUFDYyxXQUFKLEdBQWtCSCxTQUFsQjtBQUNELEdBSGtCO0FBSW5CTCxLQUFHLEVBQUUsYUFBVU4sR0FBVixTQUE4QjtBQUFBLFFBQWRjLFdBQWMsU0FBZEEsV0FBYztBQUNqQ2QsT0FBRyxDQUFDYyxXQUFKLEdBQWtCRCxnQkFBZ0IsQ0FBQ2IsR0FBRyxDQUFDYyxXQUFMLEVBQWtCQSxXQUFsQixDQUFsQztBQUNELEdBTmtCO0FBT25CVixVQUFRLEVBQUUsa0JBQVVKLEdBQVYsRUFBZTtBQUN2QkEsT0FBRyxDQUFDL0IsT0FBSixHQUFjNEMsZ0JBQWdCLENBQUNiLEdBQUcsQ0FBQy9CLE9BQUwsRUFBYytCLEdBQUcsQ0FBQ2MsV0FBbEIsQ0FBOUI7QUFDQSxXQUFPZCxHQUFHLENBQUNjLFdBQVg7QUFDRDtBQVZrQixDQUFyQjtBQWFBLElBQU1qQixjQUFjLEdBQUc7QUFDckJLLFNBQU8sRUFBRSxpQkFBVUYsR0FBVixFQUFlO0FBQ3RCQSxPQUFHLENBQUNyRixjQUFKLEdBQXFCLElBQUlvRyxHQUFKLEVBQXJCO0FBQ0QsR0FIb0I7QUFJckJULEtBQUcsRUFBRSxhQUFVTixHQUFWLFNBQWlDO0FBQUEsUUFBakJyRixjQUFpQixTQUFqQkEsY0FBaUI7O0FBQ3BDLFFBQUlBLGNBQUosRUFBb0I7QUFBQSxpQkFDRjZGLE1BQU0sQ0FBQ1EsSUFBUCxDQUFZckcsY0FBWixDQURFOztBQUNsQiwrQ0FBNkM7QUFBeEMsWUFBSXNHLEdBQUcsV0FBUDtBQUNILFlBQUloRCxPQUFPLEdBQUcrQixHQUFHLENBQUNyRixjQUFKLENBQW1CdUcsR0FBbkIsQ0FBdUJELEdBQXZCLENBQWQ7QUFDQWhELGVBQU8sR0FBRzRDLGdCQUFnQixDQUFDNUMsT0FBRCxFQUFVdEQsY0FBYyxDQUFDc0csR0FBRCxDQUF4QixDQUExQjtBQUNBakIsV0FBRyxDQUFDckYsY0FBSixDQUFtQndHLEdBQW5CLENBQXVCRixHQUF2QixFQUE0QmhELE9BQTVCO0FBQ0Q7QUFDRjtBQUNGLEdBWm9CO0FBYXJCbUMsVUFBUSxFQUFFLGtCQUFVSixHQUFWLEVBQWU7QUFDdkIsUUFBTW9CLGFBQWEsR0FBR0MsaUJBQWlCLENBQUNyQixHQUFELENBQXZDO0FBQ0FBLE9BQUcsQ0FBQy9CLE9BQUosR0FBYzRDLGdCQUFnQixDQUFDYixHQUFHLENBQUMvQixPQUFMLEVBQWNtRCxhQUFkLENBQTlCO0FBQ0EsV0FBT3BCLEdBQUcsQ0FBQ3JGLGNBQVg7QUFDRDtBQWpCb0IsQ0FBdkI7QUFvQkEsSUFBTW9GLEtBQUssR0FBRztBQUNaRyxTQUFPLEVBQUUsaUJBQVVGLEdBQVYsRUFBZTtBQUN0QkEsT0FBRyxDQUFDc0IsS0FBSixHQUFZLEVBQVo7QUFDRCxHQUhXO0FBSVpoQixLQUFHLEVBQUUsYUFBVU4sR0FBVixTQUE4QjtBQUFBLFFBQWR1QixJQUFjLFNBQWRBLElBQWM7QUFBQSxRQUFSRCxLQUFRLFNBQVJBLEtBQVE7O0FBQ2pDLFFBQUlDLElBQUosRUFBVTtBQUNSdkIsU0FBRyxDQUFDc0IsS0FBSixDQUFVRSxJQUFWLENBQWVELElBQWY7QUFDRDs7QUFDRCxRQUFJRCxLQUFKLEVBQVc7QUFDVEcsV0FBSyxDQUFDQyxTQUFOLENBQWdCRixJQUFoQixDQUFxQkcsS0FBckIsQ0FBMkIzQixHQUFHLENBQUNzQixLQUEvQixFQUFzQ0EsS0FBdEM7QUFDRDtBQUNGLEdBWFc7QUFZWmxCLFVBQVEsRUFBRSxrQkFBVUosR0FBVixFQUFlO0FBQ3ZCLFFBQU00QixPQUFPLEdBQUc1QixHQUFHLENBQUNzQixLQUFKLENBQVV6RSxHQUFWLENBQWMsVUFBVTBFLElBQVYsRUFBZ0I7QUFBRSxhQUFPLG1CQUFLQSxJQUFMLENBQVA7QUFBb0IsS0FBcEQsQ0FBaEI7QUFDQXZCLE9BQUcsQ0FBQzlCLFFBQUo7QUFBQTtBQUFBLDhCQUFlO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFlLHFCQUFNLGtCQUFJMEQsT0FBSixDQUFOOztBQUFmO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLEtBQWY7QUFDQSxXQUFPNUIsR0FBRyxDQUFDc0IsS0FBWDtBQUNEO0FBaEJXLENBQWQ7QUFtQkEsSUFBTTVCLFNBQVMsR0FBRztBQUNoQlEsU0FBTyxFQUFFLGlCQUFVRixHQUFWLEVBQWU7QUFDdEJBLE9BQUcsQ0FBQ3BFLFNBQUosR0FBZ0IsRUFBaEI7QUFDRCxHQUhlO0FBSWhCMEUsS0FBRyxFQUFFLGFBQVVOLEdBQVYsU0FBNEI7QUFBQSxRQUFacEUsU0FBWSxTQUFaQSxTQUFZOztBQUMvQixRQUFJQSxTQUFKLEVBQWU7QUFDYjRFLFlBQU0sQ0FBQ0MsTUFBUCxDQUFjVCxHQUFHLENBQUNwRSxTQUFsQixFQUE2QkEsU0FBN0I7QUFDRDtBQUNGLEdBUmU7QUFTaEJ3RSxVQUFRLEVBQUUsa0JBQVVNLElBQVYsRUFBZ0IsQ0FDekI7QUFWZSxDQUFsQjs7QUFhQSxTQUFTVyxpQkFBVCxRQUF1RDtBQUFBLE1BQTFCdEQsT0FBMEIsU0FBMUJBLE9BQTBCO0FBQUEsTUFBakJwRCxjQUFpQixTQUFqQkEsY0FBaUI7QUFDckQsTUFBTWtDLEdBQUcsR0FBRyxJQUFJa0UsR0FBSixFQUFaO0FBRHFEO0FBQUE7QUFBQTs7QUFBQTtBQUVyRCwwQkFBMkJwRyxjQUFjLENBQUNrSCxPQUFmLEVBQTNCLG1JQUFxRDtBQUFBO0FBQUEsVUFBM0NaLEdBQTJDO0FBQUEsVUFBdENoRCxPQUFzQzs7QUFDbkRwQixTQUFHLENBQUNzRSxHQUFKLENBQVFwRCxPQUFPLENBQUNrRCxHQUFELENBQWYsRUFBc0JoRCxPQUF0QjtBQUNEO0FBSm9EO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7O0FBS3JELFNBQU8sVUFBVWhDLEtBQVYsRUFBaUJDLE1BQWpCLEVBQXlCO0FBQzlCLFFBQU0rQixPQUFPLEdBQUdwQixHQUFHLENBQUNxRSxHQUFKLENBQVFoRixNQUFNLENBQUNHLElBQWYsQ0FBaEI7QUFDQSxXQUFPLE9BQU80QixPQUFQLEtBQW1CLFVBQW5CLEdBQWdDQSxPQUFPLENBQUNoQyxLQUFELEVBQVFDLE1BQVIsQ0FBdkMsR0FBeURELEtBQWhFO0FBQ0QsR0FIRDtBQUlEOztBQUVELFNBQVM0RSxnQkFBVCxHQUF3QztBQUN0QyxNQUFJaUIsTUFBTSxHQUFHbkIsU0FBYjs7QUFDQSxPQUFLLElBQUlvQixDQUFDLEdBQUcsQ0FBYixFQUFnQkEsQ0FBQyxHQUFHLFVBQVNDLE1BQTdCLEVBQXFDRCxDQUFDLElBQUksQ0FBMUMsRUFBNkM7QUFDM0MsUUFBSTlELE9BQU8sR0FBWThELENBQVosNEJBQVlBLENBQVoseUJBQVlBLENBQVosQ0FBWDs7QUFDQSxRQUFJLENBQUM5RCxPQUFMLEVBQWM7QUFDWjtBQUNEOztBQUNELFFBQUksT0FBT0EsT0FBUCxLQUFtQixVQUF2QixFQUFtQztBQUNqQyxZQUFNLElBQUlnRSxLQUFKLENBQVUsNEJBQVYsRUFBd0NoRSxPQUF4QyxDQUFOO0FBQ0Q7O0FBQ0QsUUFBSSxDQUFDNkQsTUFBTCxFQUFhO0FBQ1hBLFlBQU0sR0FBRzdELE9BQVQ7QUFDRCxLQUZELE1BRU87QUFDTDZELFlBQU0sR0FBR0ksZUFBZSxDQUFDSixNQUFELEVBQVM3RCxPQUFULENBQXhCO0FBQ0Q7QUFDRjs7QUFDRCxTQUFPNkQsTUFBUDtBQUNEOztBQUVELFNBQVNJLGVBQVQsQ0FBMEJDLEdBQTFCLEVBQStCQyxHQUEvQixFQUFvQztBQUNsQyxTQUFPLFVBQVVuRyxLQUFWLEVBQWlCQyxNQUFqQixFQUF5QjtBQUFFLFdBQU9rRyxHQUFHLENBQUNELEdBQUcsQ0FBQ2xHLEtBQUQsRUFBUUMsTUFBUixDQUFKLEVBQXFCQSxNQUFyQixDQUFWO0FBQXlDLEdBQTNFO0FBQ0QsQzs7Ozs7OztBQ3ZMRDs7QUFFQTtBQUNBLGNBQWMsbUJBQU8sQ0FBQyxHQUFvRTtBQUMxRiw0Q0FBNEMsUUFBUztBQUNyRDtBQUNBOztBQUVBLGVBQWU7QUFDZjtBQUNBO0FBQ0EsYUFBYSxtQkFBTyxDQUFDLEVBQXNEO0FBQzNFO0FBQ0E7QUFDQSxHQUFHLEtBQVU7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBLGdDQUFnQyxVQUFVLEVBQUU7QUFDNUMsQzs7Ozs7OztBQ3pCQSwyQkFBMkIsbUJBQU8sQ0FBQyxFQUFrRDtBQUNyRjs7O0FBR0E7QUFDQSxjQUFjLFFBQVMsY0FBYyx5QkFBeUIsdUJBQXVCLEdBQUc7O0FBRXhGOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNQQTs7QUFDQTs7QUFDQTs7QUFDQTs7QUFFQTs7QUFDQTs7QUFDQTs7QUFDQTs7QUFDQTs7QUFDQTs7QUFDQTs7QUFDQTs7OzswQkFjVW1HLE87OzswQkFxQkFDLFc7OzswQkF5QkFDLG9COztBQTFEVixTQUFTMUgsY0FBVCxDQUF5Qm9CLEtBQXpCLFFBQWlFO0FBQUEsMEJBQWhDcUIsT0FBZ0M7QUFBQSxNQUF0QjBCLFNBQXNCLGdCQUF0QkEsU0FBc0I7QUFBQSxNQUFYdEIsT0FBVyxnQkFBWEEsT0FBVztBQUM3RCx5Q0FBV3pCLEtBQVg7QUFBa0IrQyxhQUFTLEVBQVRBLFNBQWxCO0FBQTZCdEIsV0FBTyxFQUFQQTtBQUE3QjtBQUNIOztBQUVELFNBQVM4RSxrQkFBVCxDQUE2QnZHLEtBQTdCLFNBQWtGO0FBQUEsNEJBQTdDcUIsT0FBNkM7QUFBQSxNQUFuQ21GLFdBQW1DLGlCQUFuQ0EsV0FBbUM7QUFBQSxNQUF0QkMsT0FBc0IsaUJBQXRCQSxPQUFzQjtBQUFBLE1BQWJDLFNBQWEsaUJBQWJBLFNBQWE7QUFDOUUseUNBQVcxRyxLQUFYO0FBQWtCd0csZUFBVyxFQUFYQSxXQUFsQjtBQUErQkMsV0FBTyxFQUFQQSxPQUEvQjtBQUF3Q0MsYUFBUyxFQUFUQTtBQUF4QztBQUNIOztBQUVELFNBQVNDLG9CQUFULENBQStCM0csS0FBL0IsU0FBNEQ7QUFBQSxNQUFYNEcsT0FBVyxTQUFyQnZGLE9BQXFCLENBQVh1RixPQUFXO0FBQ3hELHlDQUFXNUcsS0FBWDtBQUFrQjZHLGNBQVUsRUFBRUQ7QUFBOUI7QUFDSDs7QUFFRCxTQUFVUixPQUFWO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQ29CLGlCQUFNLHFCQUFPO0FBQUEsZ0JBQUV0RSxPQUFGLFNBQUVBLE9BQUY7QUFBQSxtQkFBZUEsT0FBZjtBQUFBLFdBQVAsQ0FBTjs7QUFEcEI7QUFDVUEsaUJBRFY7QUFBQTtBQUVJLGlCQUFNLHdCQUFVQSxPQUFPLENBQUNuRCxPQUFsQixFQUEyQjBILFdBQTNCLENBQU47O0FBRko7QUFBQTtBQUdJLGlCQUFNLHdCQUFVdkUsT0FBTyxDQUFDZ0YsZ0JBQWxCLEVBQW9DUixvQkFBcEMsQ0FBTjs7QUFISjtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTs7QUFNQSxJQUFNUyxXQUFXLEdBQUc7QUFBRTtBQUNsQkMsTUFBSSxFQUFFLGVBRFU7QUFFaEJDLFFBQU0sRUFBRSxpQkFGUTtBQUdoQkMsYUFBVyxFQUFFLHNCQUhHO0FBSWhCQyxXQUFTLEVBQUUsb0JBSks7QUFLaEJDLGFBQVcsRUFBRSxzQkFMRztBQU1oQkMsVUFBUSxFQUFFLG1CQU5NO0FBT2hCQyxXQUFTLEVBQUUsb0JBUEs7QUFRaEJDLFVBQVEsRUFBRSxtQkFSTTtBQVNoQkMsYUFBVyxFQUFFLHNCQVRHO0FBVWhCQyxXQUFTLEVBQUUsb0JBVks7QUFXaEJDLGNBQVksRUFBRSx1QkFYRTtBQVloQkMsYUFBVyxFQUFFO0FBWkcsQ0FBcEI7O0FBZUEsU0FBVXRCLFdBQVY7QUFBQTs7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLGdDQUF3QmhGLE9BQXhCLEVBQWtDMEIsU0FBbEMsaUJBQWtDQSxTQUFsQyxFQUE2Q3RCLE9BQTdDLGlCQUE2Q0EsT0FBN0MsRUFBc0RDLFFBQXRELGlCQUFzREEsUUFBdEQ7QUFBQTtBQUNvQixpQkFBTSxxQkFBTztBQUFBLGdCQUFFSSxPQUFGLFNBQUVBLE9BQUY7QUFBQSxtQkFBZUEsT0FBZjtBQUFBLFdBQVAsQ0FBTjs7QUFEcEI7QUFDVUEsaUJBRFY7QUFBQTtBQUlRNEUsbUJBQVMsR0FBRyx5QkFBY2pGLE9BQU8sQ0FBQ21HLGFBQXRCLEVBQXFDN0UsU0FBckMsQ0FBWjtBQUpSO0FBS3NCLGlCQUFNLG1CQUFLOEUsYUFBTCxDQUFOOztBQUx0QjtBQUtRQyxxQkFMUjtBQUFBO0FBTW1CLGlCQUFNLG1CQUFLQSxXQUFMLENBQU47O0FBTm5CO0FBTVFyQixpQkFOUixrQkFNNENzQixJQU41QztBQUFBO0FBT1EsaUJBQU0sd0JBQVVELFdBQVY7QUFBQTtBQUFBLG9DQUF1QjtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBWTFILHdCQUFaLFNBQVlBLElBQVosRUFBa0JpQixPQUFsQixTQUFrQkEsT0FBbEI7QUFDbkJwQiwwQkFEbUIsR0FDVjtBQUFDRywwQkFBSSxFQUFFMEIsT0FBTyxDQUFDaUYsV0FBVyxDQUFDM0csSUFBRCxDQUFaLENBQWQ7QUFBbUNpQiw2QkFBTyxFQUFQQTtBQUFuQyxxQkFEVTtBQUFBO0FBRXpCLDJCQUFNLGtCQUFJcEIsTUFBSixDQUFOOztBQUZ5QjtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxXQUF2QixFQUFOOztBQVBSO0FBV1F1RyxxQkFBVyxHQUFHLCtCQUFvQjlFLFFBQXBCLENBQWQ7QUFYUjtBQUFBOztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBYVEsaUJBQU0sa0JBQUk7QUFBQ3RCLGdCQUFJLEVBQUUwQixPQUFPLENBQUNrRyxhQUFmO0FBQThCM0csbUJBQU8sRUFBRTtBQUFDdUYscUJBQU8sRUFBRSxhQUFHcUIsUUFBSDtBQUFWO0FBQXZDLFdBQUosQ0FBTjs7QUFiUjtBQUFBOztBQUFBO0FBQUE7QUFnQkksaUJBQU0sa0JBQUk7QUFBQzdILGdCQUFJLEVBQUUwQixPQUFPLENBQUNvRyxXQUFmO0FBQTRCN0csbUJBQU8sRUFBRTtBQUFDb0YscUJBQU8sRUFBUEEsT0FBRDtBQUFVRCx5QkFBVyxFQUFYQSxXQUFWO0FBQXVCRSx1QkFBUyxFQUFUQTtBQUF2QjtBQUFyQyxXQUFKLENBQU47O0FBaEJKO0FBaUJJO0FBQ0EvRSxnQkFBTSxDQUFDb0csSUFBUCxHQUFjdEIsT0FBZDtBQWxCSjtBQW1CSSxpQkFBTSxtQkFBS0QsV0FBVyxDQUFDMkIsWUFBakIsRUFBK0IxQixPQUEvQixDQUFOOztBQW5CSjtBQUFBO0FBc0JJLGlCQUFNLG1CQUFLMkIsOENBQUwsRUFBOEI1QixXQUE5QixDQUFOOztBQXRCSjtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTs7QUF5QkEsU0FBVUYsb0JBQVY7QUFBQTs7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUEyQytCLGNBQTNDLFNBQWlDaEgsT0FBakMsQ0FBMkNnSCxJQUEzQztBQUFBO0FBQ3VCLGlCQUFNLHFCQUFPLFVBQUFySSxLQUFLO0FBQUEsbUJBQUlBLEtBQUssQ0FBQ3dHLFdBQVY7QUFBQSxXQUFaLENBQU47O0FBRHZCO0FBQUE7QUFDVzhCLGtCQURYLFNBQ1dBLFFBRFg7QUFBQTtBQUdJLGlCQUFNLG1CQUFLQSxRQUFMLEVBQWVELElBQWYsQ0FBTjs7QUFISjtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTs7QUFNQSxTQUFTRSxXQUFULENBQXNCdkksS0FBdEIsRUFBNkI7QUFBQSxNQUNsQmMsU0FEa0IsR0FDaUVkLEtBRGpFLENBQ2xCYyxTQURrQjtBQUFBLE1BQ1ArRixVQURPLEdBQ2lFN0csS0FEakUsQ0FDUDZHLFVBRE87QUFBQSxNQUNhMkIsU0FEYixHQUNpRXhJLEtBRGpFLENBQ0srQixLQURMLENBQ2F5RyxTQURiO0FBQUEsTUFDbUMxQixnQkFEbkMsR0FDaUU5RyxLQURqRSxDQUN5QjhCLE9BRHpCLENBQ21DZ0YsZ0JBRG5DO0FBQUEsTUFDc0QyQixPQUR0RCxHQUNpRXpJLEtBRGpFLENBQ3NEeUksT0FEdEQ7QUFFekIsU0FBTztBQUFDM0gsYUFBUyxFQUFUQSxTQUFEO0FBQVkrRixjQUFVLEVBQVZBLFVBQVo7QUFBd0IyQixhQUFTLEVBQVRBLFNBQXhCO0FBQW1DMUIsb0JBQWdCLEVBQWhCQSxnQkFBbkM7QUFBcUQyQixXQUFPLEVBQVBBO0FBQXJELEdBQVA7QUFDSDs7SUFFS0MsRzs7Ozs7Ozs7Ozs7Ozs7Ozs7a0lBMkJVLFlBQU07QUFDZCxZQUFLQyxLQUFMLENBQVcxRixRQUFYLENBQW9CO0FBQUM3QyxZQUFJLEVBQUUsTUFBS3VJLEtBQUwsQ0FBVzdCLGdCQUFsQjtBQUFvQ3pGLGVBQU8sRUFBRTtBQUFDZ0gsY0FBSSxFQUFFO0FBQVA7QUFBN0MsT0FBcEI7QUFDSCxLOzs7Ozs7NkJBNUJTO0FBQUEsd0JBQzhDLEtBQUtNLEtBRG5EO0FBQUEsVUFDQzdILFNBREQsZUFDQ0EsU0FERDtBQUFBLFVBQ1kwSCxTQURaLGVBQ1lBLFNBRFo7QUFBQSxVQUN1QjNCLFVBRHZCLGVBQ3VCQSxVQUR2QjtBQUFBLFVBQ21DNEIsT0FEbkMsZUFDbUNBLE9BRG5DOztBQUVOLFVBQUk1QixVQUFKLEVBQWdCO0FBQ1osZUFDSSwwQ0FDSSx5Q0FBSyw0QkFBTCxDQURKLEVBRUksd0NBQUlBLFVBQUosQ0FGSixDQURKO0FBTUg7O0FBQ0QsVUFBSSxDQUFDL0YsU0FBTCxFQUFnQjtBQUNaLGVBQU8sNkJBQUMsZ0JBQUQsT0FBUDtBQUNIOztBQUNELGFBQ0ksMENBQ0ksNkJBQUMsU0FBRCxPQURKLEVBRUksNkJBQUMsaUJBQUQ7QUFBUyxrQkFBVSxFQUFFLEtBQUs4SDtBQUExQixRQUZKLEVBR0tILE9BQU8sQ0FBQzdCLE9BQVIsSUFDRztBQUFHLGFBQUssRUFBRTtBQUFDaUMsb0JBQVUsRUFBRTtBQUFiO0FBQVYsU0FBaUNKLE9BQU8sQ0FBQzdCLE9BQXpDLENBSlIsRUFLSyxPQUFPNkIsT0FBTyxDQUFDSyxLQUFmLEtBQXlCLFFBQXpCLElBQ0csd0NBQUksZ0JBQUosRUFBcUI7QUFBTSxhQUFLLEVBQUU7QUFBQ0Qsb0JBQVUsRUFBRTtBQUFiO0FBQWIsU0FBb0NKLE9BQU8sQ0FBQ0ssS0FBNUMsQ0FBckIsQ0FOUixFQU9LTCxPQUFPLENBQUNyRyxLQUFSLElBQ0csNkJBQUMscUJBQUQ7QUFBTyxlQUFPLEVBQUM7QUFBZixTQUF5QnFHLE9BQU8sQ0FBQ3JHLEtBQWpDLENBUlIsQ0FESjtBQVlIOzs7RUExQmEyRyxlQUFNQyxhOztlQWdDVDtBQUNYbEgsU0FBTyxFQUFFO0FBQ0xuRCxXQUFPLEVBQUUsVUFESjtBQUVMdUosZUFBVyxFQUFFLGVBRlI7QUFHTEYsaUJBQWEsRUFBRSxpQkFIVjtBQUlMbEIsb0JBQWdCLEVBQUU7QUFKYixHQURFO0FBT1hwSSxnQkFBYyxFQUFFO0FBQ1pDLFdBQU8sRUFBRUMsY0FERztBQUVac0osZUFBVyxFQUFFM0Isa0JBRkQ7QUFHWnlCLGlCQUFhLEVBQUVyQjtBQUhILEdBUEw7QUFZWHJCLE1BQUksRUFBRWMsT0FaSztBQWFYckUsT0FBSyxFQUFFO0FBQ0gyRyxPQUFHLEVBQUUseUJBQVFILFdBQVIsRUFBcUJHLEdBQXJCO0FBREYsR0FiSTtBQWdCWHZKLFVBQVEsRUFBRSxDQUNOOEosd0JBRE0sRUFFTkMscUJBRk07QUFoQkMsQzs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDbEhmOztBQUNBOztBQUVBLFNBQVNDLE9BQVQsQ0FBa0JSLEtBQWxCLEVBQXlCO0FBQ3ZCLFNBQ0c7QUFBSyxhQUFTLEVBQUM7QUFBZixLQUNHLDZCQUFDLHNCQUFEO0FBQVEsV0FBTyxFQUFFQSxLQUFLLENBQUNTO0FBQXZCLEtBQ0csU0FESCxDQURILENBREg7QUFPRDs7ZUFFY0QsTzs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDYmY7O0FBRUEsU0FBU0UsT0FBVCxDQUFrQkMsTUFBbEIsRUFBMEI7QUFDeEIsU0FDRTtBQUFLLGFBQVMsRUFBQyxhQUFmO0FBQTZCLFNBQUssRUFBRTtBQUFDQyxjQUFRLEVBQUU7QUFBWDtBQUFwQyxLQUNFO0FBQUcsYUFBUyxFQUFDO0FBQWIsSUFERixDQURGO0FBS0Q7O2VBRWNGLE87Ozs7Ozs7Ozs7Ozs7Ozs7QUNWZjs7QUFFZSxvQkFBWTtBQUN2QixTQUFPLDZCQUFhLFVBQVVHLElBQVYsRUFBZ0I7QUFDaEMsUUFBTXpCLElBQUksR0FBRzBCLFFBQVEsQ0FBQ0QsSUFBRCxDQUFyQjtBQUNBQSxRQUFJLENBQUM7QUFBQ3pCLFVBQUksRUFBSkE7QUFBRCxLQUFELENBQUo7QUFDQSxXQUFPLFlBQVk7QUFBQSxpQkFDRXhELE1BQU0sQ0FBQ1EsSUFBUCxDQUFZZ0QsSUFBWixDQURGOztBQUNmLCtDQUFvQztBQUEvQixZQUFJMkIsSUFBSSxXQUFSOztBQUNEM0IsWUFBSSxDQUFDMkIsSUFBRCxDQUFKLEdBQWEsWUFBWTtBQUNyQixnQkFBTSxJQUFJMUQsS0FBSixDQUFVLHdCQUFWLENBQU47QUFDSCxTQUZEO0FBR0g7QUFDSixLQU5EO0FBT0gsR0FWTSxFQVVKMkQsbUJBQVFDLFNBQVIsQ0FBa0IsQ0FBbEIsQ0FWSSxDQUFQO0FBV0g7O0FBRUQsU0FBU0gsUUFBVCxDQUFtQkQsSUFBbkIsRUFBeUI7QUFDckIsU0FBTztBQUNIbEMsYUFBUyxFQUFFLG1CQUFVdkYsS0FBVixFQUFpQjhILE9BQWpCLEVBQTBCekgsS0FBMUIsRUFBaUM7QUFDeENvSCxVQUFJLENBQUM7QUFBQ3BKLFlBQUksRUFBRSxXQUFQO0FBQW9CaUIsZUFBTyxFQUFFO0FBQUNVLGVBQUssRUFBTEEsS0FBRDtBQUFROEgsaUJBQU8sRUFBUEEsT0FBUjtBQUFpQnpILGVBQUssRUFBTEE7QUFBakI7QUFBN0IsT0FBRCxDQUFKO0FBQ0gsS0FIRTtBQUlIaUYsWUFBUSxFQUFFLGtCQUFVd0MsT0FBVixFQUFtQnpILEtBQW5CLEVBQTBCO0FBQ2hDb0gsVUFBSSxDQUFDO0FBQUNwSixZQUFJLEVBQUUsVUFBUDtBQUFtQmlCLGVBQU8sRUFBRTtBQUFDd0ksaUJBQU8sRUFBUEEsT0FBRDtBQUFVekgsZUFBSyxFQUFMQTtBQUFWO0FBQTVCLE9BQUQsQ0FBSjtBQUNILEtBTkU7QUFPSDhFLGVBQVcsRUFBRSxxQkFBVTRDLEtBQVYsRUFBaUJELE9BQWpCLEVBQTBCekgsS0FBMUIsRUFBaUM7QUFDMUNvSCxVQUFJLENBQUM7QUFBQ3BKLFlBQUksRUFBRSxhQUFQO0FBQXNCaUIsZUFBTyxFQUFFO0FBQUN5SSxlQUFLLEVBQUxBLEtBQUQ7QUFBUUQsaUJBQU8sRUFBUEEsT0FBUjtBQUFpQnpILGVBQUssRUFBTEE7QUFBakI7QUFBL0IsT0FBRCxDQUFKO0FBQ0gsS0FURTtBQVVIK0UsYUFBUyxFQUFFLG1CQUFVMEMsT0FBVixFQUFtQnpILEtBQW5CLEVBQTBCO0FBQ2pDb0gsVUFBSSxDQUFDO0FBQUNwSixZQUFJLEVBQUUsV0FBUDtBQUFvQmlCLGVBQU8sRUFBRTtBQUFDd0ksaUJBQU8sRUFBUEEsT0FBRDtBQUFVekgsZUFBSyxFQUFMQTtBQUFWO0FBQTdCLE9BQUQsQ0FBSjtBQUNILEtBWkU7QUFhSDZFLFVBQU0sRUFBRSxnQkFBVTRDLE9BQVYsRUFBbUJ6SCxLQUFuQixFQUEwQjtBQUM5Qm9ILFVBQUksQ0FBQztBQUFDcEosWUFBSSxFQUFFLFFBQVA7QUFBaUJpQixlQUFPLEVBQUU7QUFBQ3dJLGlCQUFPLEVBQVBBLE9BQUQ7QUFBVXpILGVBQUssRUFBTEE7QUFBVjtBQUExQixPQUFELENBQUo7QUFDSCxLQWZFO0FBZ0JIbUYsWUFBUSxFQUFFLGtCQUFVc0MsT0FBVixFQUFtQnpILEtBQW5CLEVBQTBCO0FBQ2hDb0gsVUFBSSxDQUFDO0FBQUNwSixZQUFJLEVBQUUsVUFBUDtBQUFtQmlCLGVBQU8sRUFBRTtBQUFDd0ksaUJBQU8sRUFBUEEsT0FBRDtBQUFVekgsZUFBSyxFQUFMQTtBQUFWO0FBQTVCLE9BQUQsQ0FBSjtBQUNILEtBbEJFO0FBbUJIZ0YsZUFBVyxFQUFFLHFCQUFVeUMsT0FBVixFQUFtQnpILEtBQW5CLEVBQTBCO0FBQ25Db0gsVUFBSSxDQUFDO0FBQUNwSixZQUFJLEVBQUUsYUFBUDtBQUFzQmlCLGVBQU8sRUFBRTtBQUFDd0ksaUJBQU8sRUFBUEEsT0FBRDtBQUFVekgsZUFBSyxFQUFMQTtBQUFWO0FBQS9CLE9BQUQsQ0FBSjtBQUNILEtBckJFO0FBc0JIc0YsZ0JBQVksRUFBRSxzQkFBVXRHLE1BQVYsRUFBa0J5SSxPQUFsQixFQUEyQnpILEtBQTNCLEVBQWtDO0FBQzVDb0gsVUFBSSxDQUFDO0FBQUNwSixZQUFJLEVBQUUsY0FBUDtBQUF1QmlCLGVBQU8sRUFBRTtBQUFDRCxnQkFBTSxFQUFOQSxNQUFEO0FBQVN5SSxpQkFBTyxFQUFQQSxPQUFUO0FBQWtCekgsZUFBSyxFQUFMQTtBQUFsQjtBQUFoQyxPQUFELENBQUo7QUFDSCxLQXhCRTtBQXlCSG9GLGVBQVcsRUFBRSxxQkFBVXhILEtBQVYsRUFBaUI2SixPQUFqQixFQUEwQnpILEtBQTFCLEVBQWlDO0FBQzFDb0gsVUFBSSxDQUFDO0FBQUNwSixZQUFJLEVBQUUsYUFBUDtBQUFzQmlCLGVBQU8sRUFBRTtBQUFDckIsZUFBSyxFQUFMQSxLQUFEO0FBQVE2SixpQkFBTyxFQUFQQSxPQUFSO0FBQWlCekgsZUFBSyxFQUFMQTtBQUFqQjtBQUEvQixPQUFELENBQUo7QUFDSCxLQTNCRTtBQTRCSHFGLGFBQVMsRUFBRSxtQkFBVW9DLE9BQVYsRUFBbUJ6SCxLQUFuQixFQUEwQjtBQUNqQ29ILFVBQUksQ0FBQztBQUFDcEosWUFBSSxFQUFFLFdBQVA7QUFBb0JpQixlQUFPLEVBQUU7QUFBQ3dJLGlCQUFPLEVBQVBBLE9BQUQ7QUFBVXpILGVBQUssRUFBTEE7QUFBVjtBQUE3QixPQUFELENBQUo7QUFDSCxLQTlCRTtBQStCSDRFLFFBQUksRUFBRSxjQUFVakYsS0FBVixFQUFpQjhILE9BQWpCLEVBQTBCekgsS0FBMUIsRUFBaUM7QUFDbkNvSCxVQUFJLENBQUM7QUFBQ3BKLFlBQUksRUFBRSxNQUFQO0FBQWVpQixlQUFPLEVBQUU7QUFBQ1UsZUFBSyxFQUFMQSxLQUFEO0FBQVE4SCxpQkFBTyxFQUFQQSxPQUFSO0FBQWlCekgsZUFBSyxFQUFMQTtBQUFqQjtBQUF4QixPQUFELENBQUo7QUFDSCxLQWpDRTtBQWtDSHVGLGVBQVcsRUFBRSxxQkFBVXZHLE1BQVYsRUFBa0IySSxXQUFsQixFQUErQkYsT0FBL0IsRUFBd0N6SCxLQUF4QyxFQUErQztBQUN4RG9ILFVBQUksQ0FBQztBQUFDcEosWUFBSSxFQUFFLGFBQVA7QUFBc0JpQixlQUFPLEVBQUU7QUFBQ0QsZ0JBQU0sRUFBTkEsTUFBRDtBQUFTMkkscUJBQVcsRUFBWEEsV0FBVDtBQUFzQkYsaUJBQU8sRUFBUEEsT0FBdEI7QUFBK0J6SCxlQUFLLEVBQUxBO0FBQS9CO0FBQS9CLE9BQUQsQ0FBSjtBQUNIO0FBcENFLEdBQVA7QUFzQ0gsQzs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ3ZERDs7cUJBRWdCLDhCO0lBQVQ0SCxLLGtCQUFBQSxLOztBQUVRLFNBQVNDLGFBQVQsQ0FBd0JDLE1BQXhCLEVBQWdDO0FBQzNDLFNBQU8sVUFBVUMsT0FBVixFQUFtQmxLLE1BQW5CLEVBQTJCbUssSUFBM0IsRUFBaUM7QUFDcEMsV0FBTyxJQUFJQyxPQUFKLENBQVksVUFBVUMsT0FBVixFQUFtQkMsTUFBbkIsRUFBMkI7QUFDMUMsVUFBTUMsR0FBRyxHQUFHLElBQUlDLEdBQUosQ0FBUU4sT0FBUixFQUFpQkQsTUFBTSxDQUFDUSxPQUF4QixDQUFaO0FBQ0EsVUFBTUMsS0FBSyxHQUFHVCxNQUFNLENBQUNTLEtBQVAsR0FBZTtBQUFDNUMsWUFBSSxFQUFFbUMsTUFBTSxDQUFDUztBQUFkLE9BQWYsR0FBc0MsRUFBcEQ7QUFDQSxhQUFPWCxLQUFLLENBQUNRLEdBQUQsRUFBTTtBQUNkSSxjQUFNLEVBQUUsTUFETTtBQUVkQyxlQUFPLEVBQUU7QUFDTCwwQkFBZ0Isa0JBRFg7QUFFTCxvQkFBVTtBQUZMLFNBRks7QUFNZFQsWUFBSSxFQUFFVSxJQUFJLENBQUNDLFNBQUwsaUNBQW1CWCxJQUFuQixFQUE0Qk8sS0FBNUI7QUFBbUMxSyxnQkFBTSxFQUFOQTtBQUFuQztBQU5RLE9BQU4sQ0FBTCxDQU9KK0ssSUFQSSxDQU9DLFVBQVVDLFFBQVYsRUFBb0I7QUFDeEIsWUFBSUEsUUFBUSxDQUFDQyxNQUFULEtBQW9CLEdBQXhCLEVBQTZCLE9BQU9YLE1BQU0sQ0FBQ1UsUUFBRCxDQUFiO0FBQzdCQSxnQkFBUSxDQUFDRSxJQUFULEdBQWdCQyxLQUFoQixDQUFzQmIsTUFBdEIsRUFBOEJTLElBQTlCLENBQW1DLFVBQVVuRixNQUFWLEVBQWtCO0FBQ2pELGNBQUksQ0FBQ0EsTUFBTSxDQUFDZ0UsT0FBWixFQUFxQixPQUFPVSxNQUFNLENBQUMxRSxNQUFNLENBQUN6RCxLQUFSLENBQWI7QUFDckJrSSxpQkFBTyxDQUFDekUsTUFBTSxDQUFDd0YsSUFBUixDQUFQO0FBQ0gsU0FIRDtBQUlILE9BYk0sRUFhSkQsS0FiSSxDQWFFYixNQWJGLENBQVA7QUFjSCxLQWpCTSxDQUFQO0FBa0JILEdBbkJEO0FBb0JILEM7Ozs7Ozs7Ozs7Ozs7OztBQ3pCYyxrQkFBVTdJLFFBQVYsRUFBb0I7QUFFL0IsV0FBU3lHLFlBQVQsQ0FBdUJKLElBQXZCLEVBQTZCO0FBQ3pCLFdBQU8sSUFBSXNDLE9BQUosQ0FBWSxVQUFVQyxPQUFWLEVBQW1CQyxNQUFuQixFQUEyQjtBQUMxQzdJLGNBQVEsQ0FBQ3lHLFlBQVQsQ0FBc0JKLElBQXRCLEVBQTRCdUMsT0FBNUIsRUFBcUNDLE1BQXJDO0FBQ0gsS0FGTSxDQUFQO0FBR0g7O0FBRUQsV0FBU2UsYUFBVCxDQUF3QnRHLEdBQXhCLEVBQTZCdUcsWUFBN0IsRUFBMkM7QUFDdkMsV0FBTyxJQUFJbEIsT0FBSixDQUFZLFVBQVVDLE9BQVYsRUFBbUJDLE1BQW5CLEVBQTJCO0FBQzFDN0ksY0FBUSxDQUFDNEosYUFBVCxDQUF1QnRHLEdBQXZCLEVBQTRCdUcsWUFBNUIsRUFBMENqQixPQUExQyxFQUFtREMsTUFBbkQ7QUFDSCxLQUZNLENBQVA7QUFHSDs7QUFFRCxXQUFTaUIsT0FBVCxDQUFrQkMsU0FBbEIsRUFBNkI7QUFDekIsV0FBTyxJQUFJcEIsT0FBSixDQUFZLFVBQVVDLE9BQVYsRUFBbUJDLE1BQW5CLEVBQTJCO0FBQzFDN0ksY0FBUSxDQUFDOEosT0FBVCxDQUFpQkMsU0FBakIsRUFBNEJuQixPQUE1QixFQUFxQ0MsTUFBckM7QUFDSCxLQUZNLENBQVA7QUFHSDs7QUFFRCxXQUFTakMsUUFBVCxDQUFtQkQsSUFBbkIsRUFBeUI7QUFDckIsV0FBTyxJQUFJZ0MsT0FBSixDQUFZLFVBQVVDLE9BQVYsRUFBbUJDLE1BQW5CLEVBQTJCO0FBQzFDN0ksY0FBUSxDQUFDNEcsUUFBVCxDQUFrQkQsSUFBbEIsRUFBd0JpQyxPQUF4QixFQUFpQ0MsTUFBakM7QUFDSCxLQUZNLENBQVA7QUFHSDs7QUFFRCxXQUFTbUIsYUFBVCxDQUF3QmpLLE9BQXhCLEVBQWlDO0FBQzdCLFdBQU8sSUFBSTRJLE9BQUosQ0FBWSxVQUFVQyxPQUFWLEVBQW1CQyxNQUFuQixFQUEyQjtBQUMxQzdJLGNBQVEsQ0FBQ2dLLGFBQVQsQ0FBdUJqSyxPQUF2QixFQUFnQzZJLE9BQWhDLEVBQXlDQyxNQUF6QztBQUNILEtBRk0sQ0FBUDtBQUdIOztBQUVELFNBQU87QUFBQ3BDLGdCQUFZLEVBQVpBLFlBQUQ7QUFBZW1ELGlCQUFhLEVBQWJBLGFBQWY7QUFBOEJFLFdBQU8sRUFBUEEsT0FBOUI7QUFBdUNsRCxZQUFRLEVBQVJBLFFBQXZDO0FBQWlEb0QsaUJBQWEsRUFBYkE7QUFBakQsR0FBUDtBQUVILEM7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQzdCRDs7QUFDQTs7OzswQkFzQlVDLHNCOzs7MEJBS0FDLHFCOzs7MEJBWUFDLHdCOzs7MEJBSUFDLHNCOzs7MEJBTUFDLG1COzs7MEJBS0FDLHdCOzs7MEJBS0FDLHNCOzs7MEJBTUFDLHlCOzs7MEJBYUFDLHFCOzs7MEJBTUFDLHdCOzs7MEJBYUFDLGlCOzs7MEJBY0FDLHdCOztBQTdHVixTQUFTMU4sY0FBVCxDQUF5Qm9CLEtBQXpCLFFBQWlFO0FBQUEsMEJBQWhDcUIsT0FBZ0M7QUFBQSxNQUF0QjBCLFNBQXNCLGdCQUF0QkEsU0FBc0I7QUFBQSxNQUFYdEIsT0FBVyxnQkFBWEEsT0FBVztBQUM3RCx5Q0FBV3pCLEtBQVg7QUFBa0J5SSxXQUFPLEVBQUU7QUFBM0I7QUFDSDs7QUFFRCxTQUFTOEQscUJBQVQsQ0FBZ0N2TSxLQUFoQyxTQUE4RDtBQUFBLE1BQVpPLFFBQVksU0FBdEJjLE9BQXNCLENBQVpkLFFBQVk7QUFDMUQseUNBQVdQLEtBQVg7QUFBa0JPLFlBQVEsRUFBUkE7QUFBbEI7QUFDSDs7QUFFRCxTQUFTaU0sc0JBQVQsQ0FBaUN4TSxLQUFqQyxTQUE0RDtBQUFBLE1BQVRXLEtBQVMsU0FBbkJVLE9BQW1CLENBQVRWLEtBQVM7QUFDeEQseUNBQVdYLEtBQVg7QUFBa0JXLFNBQUssRUFBTEE7QUFBbEI7QUFDSDs7QUFFRCxTQUFTOEwsdUJBQVQsQ0FBa0N6TSxLQUFsQyxTQUE4RDtBQUFBLE1BQVZvQixNQUFVLFNBQXBCQyxPQUFvQixDQUFWRCxNQUFVO0FBQzFELHlDQUFXcEIsS0FBWDtBQUFrQm9CLFVBQU0sRUFBTkE7QUFBbEI7QUFDSDs7QUFFRCxTQUFTc0wseUJBQVQsQ0FBb0MxTSxLQUFwQyxTQUErRDtBQUFBLE1BQVQrQixLQUFTLFNBQW5CVixPQUFtQixDQUFUVSxLQUFTO0FBQzNELHlDQUFXL0IsS0FBWDtBQUFrQjJNLGFBQVMsRUFBRTVLO0FBQTdCO0FBQ0g7O0FBRUQsU0FBVTRKLHNCQUFWO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUE2QzlCLGlCQUE3QyxTQUFtQ3hJLE9BQW5DLENBQTZDd0ksT0FBN0M7QUFBQTtBQUVJLGlCQUFNLG1CQUFLQSxPQUFMLENBQU47O0FBRko7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7O0FBS0EsU0FBVStCLHFCQUFWO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUE0Qy9CLGlCQUE1QyxTQUFrQ3hJLE9BQWxDLENBQTRDd0ksT0FBNUM7QUFBQTtBQUVJLGlCQUFNLG1CQUFLQSxPQUFMLEVBQWM7QUFBQyxvQkFBUTtBQUFULFdBQWQsQ0FBTjs7QUFGSjtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTs7QUFLQSxTQUFTK0MsMkJBQVQsQ0FBc0M1TSxLQUF0QyxTQUFpRTtBQUFBLE1BQVQ4SixLQUFTLFNBQW5CekksT0FBbUIsQ0FBVHlJLEtBQVM7O0FBQzdELE1BQUlBLEtBQUssS0FBSyxJQUFkLEVBQW9CO0FBQ2hCNUosV0FBTyxDQUFDMk0sSUFBUixDQUFhLDBDQUFiO0FBQ0EsV0FBTzdNLEtBQVA7QUFDSDs7QUFDRCx5Q0FBV0EsS0FBWDtBQUFrQitDLGFBQVMsRUFBRStHO0FBQTdCO0FBQ0g7O0FBQ0QsU0FBVStCLHdCQUFWO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUErQ2hDLGlCQUEvQyxTQUFxQ3hJLE9BQXJDLENBQStDd0ksT0FBL0M7QUFBQTtBQUNJLGlCQUFNLG1CQUFLQSxPQUFMLENBQU47O0FBREo7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7O0FBSUEsU0FBVWlDLHNCQUFWO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUE2Q2pDLGlCQUE3QyxVQUFtQ3hJLE9BQW5DLENBQTZDd0ksT0FBN0M7QUFDVWlELFdBRFYsR0FDY0MsUUFEZDtBQUVVQyxXQUZWLEdBRWNDLElBQUksQ0FBQ0MsR0FBTCxDQUFTSixDQUFDLENBQUMxQyxJQUFGLENBQU8rQyxZQUFoQixFQUE4QkwsQ0FBQyxDQUFDTSxlQUFGLENBQWtCRCxZQUFoRCxDQUZkO0FBQUE7QUFHSSxpQkFBTSxtQkFBS3RELE9BQUwsRUFBY21ELENBQWQsQ0FBTjs7QUFISjtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTs7QUFNQSxTQUFVakIsbUJBQVY7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQTBDbEMsaUJBQTFDLFVBQWdDeEksT0FBaEMsQ0FBMEN3SSxPQUExQztBQUFBO0FBRUksaUJBQU0sbUJBQUtBLE9BQUwsQ0FBTjs7QUFGSjtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTs7QUFLQSxTQUFVbUMsd0JBQVY7QUFBQTs7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLGtDQUFxQzNLLE9BQXJDLEVBQStDd0ksT0FBL0Msa0JBQStDQSxPQUEvQyxFQUErRHdELE1BQS9ELGtCQUF3RGpMLEtBQXhEO0FBQUE7QUFDcUIsaUJBQU0scUJBQU87QUFBQSxnQkFBRTlCLFlBQUYsVUFBRUEsWUFBRjtBQUFBLG1CQUFvQkEsWUFBcEI7QUFBQSxXQUFQLENBQU47O0FBRHJCO0FBQ1VnTixrQkFEVjtBQUFBO0FBRUksaUJBQU0sbUJBQUt6RCxPQUFMLEVBQWN5RCxRQUFkLENBQU47O0FBRko7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7O0FBS0EsU0FBVXJCLHNCQUFWO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUE2Q3BDLGlCQUE3QyxVQUFtQ3hJLE9BQW5DLENBQTZDd0ksT0FBN0M7QUFBQTtBQUNtQixpQkFBTSxxQkFBTyxVQUFBN0osS0FBSztBQUFBLG1CQUFJQSxLQUFLLENBQUNMLFNBQU4sQ0FBZ0JFLGFBQWhCLENBQThCRyxLQUE5QixDQUFKO0FBQUEsV0FBWixDQUFOOztBQURuQjtBQUNVb0IsZ0JBRFY7QUFFVW1NLG1CQUZWLEdBRXNCLGdEQUFVbk0sTUFBVixDQUZ0QjtBQUFBO0FBR0ksaUJBQU0sbUJBQUt5SSxPQUFMLEVBQWMwRCxTQUFkLENBQU47O0FBSEo7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7O0FBTUEsU0FBVXJCLHlCQUFWO0FBQUE7O0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxrQ0FBc0M3SyxPQUF0QyxFQUFnREQsTUFBaEQsa0JBQWdEQSxNQUFoRCxFQUF3RHlJLE9BQXhELGtCQUF3REEsT0FBeEQsRUFBaUV6SCxLQUFqRSxrQkFBaUVBLEtBQWpFO0FBQUE7QUFDNEMsaUJBQU0scUJBQU87QUFBQSxnQkFBRU4sT0FBRixVQUFFQSxPQUFGO0FBQUEsbUJBQWVBLE9BQWY7QUFBQSxXQUFQLENBQU47O0FBRDVDO0FBQUE7QUFDVzdDLDBCQURYLFVBQ1dBLGdCQURYO0FBQzZCRixxQkFEN0IsVUFDNkJBLFdBRDdCO0FBQUE7O0FBQUEsZUFHWXFDLE1BSFo7QUFBQTtBQUFBO0FBQUE7O0FBQUE7QUFJWSxpQkFBTSxrQkFBSTtBQUFDaEIsZ0JBQUksRUFBRW5CLGdCQUFQO0FBQXlCb0MsbUJBQU8sRUFBRTtBQUFDRCxvQkFBTSxFQUFFMEosSUFBSSxDQUFDbEksS0FBTCxDQUFXeEIsTUFBWDtBQUFUO0FBQWxDLFdBQUosQ0FBTjs7QUFKWjtBQUFBO0FBS1ksaUJBQU0sa0JBQUk7QUFBQ2hCLGdCQUFJLEVBQUVyQjtBQUFQLFdBQUosQ0FBTjs7QUFMWjtBQUFBO0FBT1EsaUJBQU0sbUJBQUs4SyxPQUFMLENBQU47O0FBUFI7QUFBQTtBQUFBOztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBU1EsaUJBQU0sbUJBQUt6SCxLQUFMLHdCQUEyQixhQUFHd0UsT0FBOUIsRUFBTjs7QUFUUjtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTs7QUFhQSxTQUFVdUYscUJBQVY7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQTRDdEMsaUJBQTVDLFVBQWtDeEksT0FBbEMsQ0FBNEN3SSxPQUE1QztBQUFBO0FBQ2lCLGlCQUFNLHFCQUFPLFVBQUE3SixLQUFLO0FBQUEsbUJBQUlBLEtBQUssQ0FBQ0wsU0FBTixDQUFnQkMsWUFBaEIsQ0FBNkJJLEtBQTdCLENBQUo7QUFBQSxXQUFaLENBQU47O0FBRGpCO0FBQ1VlLGNBRFY7QUFFVXlNLGlCQUZWLEdBRW9CLGdEQUFVek0sSUFBVixDQUZwQjtBQUFBO0FBR0ksaUJBQU0sbUJBQUs4SSxPQUFMLEVBQWMyRCxPQUFkLENBQU47O0FBSEo7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7O0FBTUEsU0FBVXBCLHdCQUFWO0FBQUE7O0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxrQ0FBcUMvSyxPQUFyQyxFQUErQ3JCLEtBQS9DLGtCQUErQ0EsS0FBL0MsRUFBc0Q2SixPQUF0RCxrQkFBc0RBLE9BQXRELEVBQStEekgsS0FBL0Qsa0JBQStEQSxLQUEvRDtBQUFBO0FBQzJDLGlCQUFNLHFCQUFPO0FBQUEsZ0JBQUVOLE9BQUYsVUFBRUEsT0FBRjtBQUFBLG1CQUFlQSxPQUFmO0FBQUEsV0FBUCxDQUFOOztBQUQzQztBQUFBO0FBQ1c1Qyx5QkFEWCxVQUNXQSxlQURYO0FBQzRCSCxxQkFENUIsVUFDNEJBLFdBRDVCO0FBQUE7O0FBQUEsZUFHWWlCLEtBSFo7QUFBQTtBQUFBO0FBQUE7O0FBQUE7QUFJWSxpQkFBTSxrQkFBSTtBQUFDSSxnQkFBSSxFQUFFbEIsZUFBUDtBQUF3Qm1DLG1CQUFPLEVBQUU7QUFBQ04sa0JBQUksRUFBRStKLElBQUksQ0FBQ2xJLEtBQUwsQ0FBVzVDLEtBQVg7QUFBUDtBQUFqQyxXQUFKLENBQU47O0FBSlo7QUFBQTtBQUtZLGlCQUFNLGtCQUFJO0FBQUNJLGdCQUFJLEVBQUVyQjtBQUFQLFdBQUosQ0FBTjs7QUFMWjtBQUFBO0FBT1EsaUJBQU0sbUJBQUs4SyxPQUFMLENBQU47O0FBUFI7QUFBQTtBQUFBOztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBU1EsaUJBQU0sbUJBQUt6SCxLQUFMLHVCQUEwQixjQUFHd0UsT0FBN0IsRUFBTjs7QUFUUjtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTs7QUFhQSxTQUFVeUYsaUJBQVY7QUFBQTs7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLGtDQUE4QmhMLE9BQTlCLEVBQStDb00sTUFBL0Msa0JBQXdDMUwsS0FBeEMsRUFBdUQ4SCxPQUF2RCxrQkFBdURBLE9BQXZELEVBQWdFekgsS0FBaEUsa0JBQWdFQSxLQUFoRTtBQUFBO0FBQ3VDLGlCQUFNLHFCQUFPO0FBQUEsZ0JBQUVOLE9BQUYsVUFBRUEsT0FBRjtBQUFBLG1CQUFlQSxPQUFmO0FBQUEsV0FBUCxDQUFOOztBQUR2QztBQUFBO0FBQ1c0TCx3QkFEWCxVQUNXQSxjQURYO0FBQzJCN08sa0JBRDNCLFVBQzJCQSxRQUQzQjtBQUFBO0FBQUE7QUFJdUMsaUJBQU0scUJBQU8sVUFBQW1CLEtBQUs7QUFBQSxtQkFBSUEsS0FBSjtBQUFBLFdBQVosQ0FBTjs7QUFKdkM7QUFBQTtBQUllK0MsbUJBSmYsVUFJZUEsU0FKZjtBQUkwQjJELG1CQUoxQixVQUkwQkEsU0FKMUI7QUFBQTtBQUt5QixpQkFBTSxtQkFBS0EsU0FBTCxFQUFnQixPQUFoQixFQUF5QixVQUF6QixFQUFxQztBQUFDcUIsZ0JBQUksRUFBRWhGO0FBQVAsV0FBckMsQ0FBTjs7QUFMekI7QUFLY3hDLGtCQUxkO0FBQUE7QUFNUSxpQkFBTSxrQkFBSTtBQUFDSCxnQkFBSSxFQUFFc04sY0FBUDtBQUF1QnJNLG1CQUFPLEVBQUU7QUFBQ2Qsc0JBQVEsRUFBUkE7QUFBRDtBQUFoQyxXQUFKLENBQU47O0FBTlI7QUFBQTtBQU9RLGlCQUFNLGtCQUFJO0FBQUNILGdCQUFJLEVBQUV2QjtBQUFQLFdBQUosQ0FBTjs7QUFQUjtBQUFBO0FBUVEsaUJBQU0sbUJBQUtnTCxPQUFMLENBQU47O0FBUlI7QUFBQTtBQUFBOztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBVVEsaUJBQU0sbUJBQUt6SCxLQUFMLEVBQVksY0FBRzZGLFFBQUgsRUFBWixDQUFOOztBQVZSO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBOztBQWNBLFNBQVVxRSx3QkFBVjtBQUFBOztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsa0NBQXFDakwsT0FBckMsRUFBK0NELE1BQS9DLGtCQUErQ0EsTUFBL0MsRUFBdUQySSxXQUF2RCxrQkFBdURBLFdBQXZELEVBQW9FRixPQUFwRSxrQkFBb0VBLE9BQXBFLEVBQTZFekgsS0FBN0Usa0JBQTZFQSxLQUE3RTtBQUFBO0FBQytCLGlCQUFNLHFCQUFPO0FBQUEsZ0JBQUVOLE9BQUYsVUFBRUEsT0FBRjtBQUFBLG1CQUFlQSxPQUFmO0FBQUEsV0FBUCxDQUFOOztBQUQvQjtBQUFBO0FBQ1c2TCwwQkFEWCxVQUNXQSxnQkFEWDtBQUFBO0FBQUE7QUFJcUUsaUJBQU0scUJBQU8sVUFBQTNOLEtBQUs7QUFBQSxtQkFBSUEsS0FBSjtBQUFBLFdBQVosQ0FBTjs7QUFKckU7QUFBQTtBQUllK0MsbUJBSmYsVUFJZUEsU0FKZjtBQUl3Q3VJLHVCQUp4QyxVQUkwQjlFLFdBSjFCLENBSXdDOEUsYUFKeEM7QUFJd0Q1RSxtQkFKeEQsVUFJd0RBLFNBSnhEO0FBQUE7QUFLOEMsaUJBQU0sbUJBQUs0RSxhQUFMLEVBQW9CLElBQXBCLEVBQTBCLElBQTFCLENBQU47O0FBTDlDO0FBQUE7QUFLZXNDLGtCQUxmLFVBS2VBLFFBTGY7QUFLeUJDLGtCQUx6QixVQUt5QkEsUUFMekI7QUFLbUNDLGlCQUxuQyxVQUttQ0EsT0FMbkM7QUFBQTtBQU1vRCxpQkFBTSxtQkFBS3BILFNBQUwsRUFBZ0IsT0FBaEIsRUFBeUIsYUFBekIsRUFBd0M7QUFDdEZxQixnQkFBSSxFQUFFaEYsU0FEZ0Y7O0FBQ3JFO0FBQ2pCM0Isa0JBQU0sRUFBRTJJLFdBRjhFOztBQUVoRTtBQUN0QmdFLHFCQUFTLEVBQUVILFFBSDJFOztBQUdqRTtBQUNyQkkscUJBQVMsRUFBRUgsUUFKMkU7QUFLdEZJLG9CQUFRLEVBQUVIO0FBTDRFLFdBQXhDLENBQU47O0FBTnBEO0FBQUE7QUFNZWhGLGVBTmYsVUFNZUEsS0FOZjtBQU1zQmxDLGlCQU50QixVQU1zQkEsT0FOdEI7QUFNc0NzSCxvQkFOdEMsVUFNK0JwRSxLQU4vQjtBQUFBO0FBYVEsaUJBQU0sa0JBQUk7QUFBQzFKLGdCQUFJLEVBQUV1TixnQkFBUDtBQUF5QnRNLG1CQUFPLEVBQUU7QUFBQ29ILHFCQUFPLEVBQUU7QUFBQ0sscUJBQUssRUFBTEEsS0FBRDtBQUFRbEMsdUJBQU8sRUFBUEE7QUFBUjtBQUFWO0FBQWxDLFdBQUosQ0FBTjs7QUFiUjtBQUFBO0FBY1EsaUJBQU0sbUJBQUtpRCxPQUFMLEVBQWNmLEtBQWQsRUFBcUJsQyxPQUFyQixFQUE4QnNILFVBQTlCLENBQU47O0FBZFI7QUFBQTtBQUFBOztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBZ0JRLGlCQUFNLGtCQUFJO0FBQUM5TixnQkFBSSxFQUFFdU4sZ0JBQVA7QUFBeUJ0TSxtQkFBTyxFQUFFO0FBQUNvSCxxQkFBTyxFQUFFO0FBQUNyRyxxQkFBSyxFQUFFLGNBQUc2RixRQUFIO0FBQVI7QUFBVjtBQUFsQyxXQUFKLENBQU47O0FBaEJSO0FBQUE7QUFpQlEsaUJBQU0sbUJBQUs3RixLQUFMLEVBQVksY0FBRzZGLFFBQUgsRUFBWixDQUFOOztBQWpCUjtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTs7QUFxQkEsU0FBU2tHLHVCQUFULENBQWtDbk8sS0FBbEMsVUFBK0Q7QUFBQSxNQUFYeUksT0FBVyxVQUFyQnBILE9BQXFCLENBQVhvSCxPQUFXO0FBQzNELHlDQUFXekksS0FBWDtBQUFrQnlJLFdBQU8sRUFBUEE7QUFBbEI7QUFDSDs7ZUFFYztBQUNYM0csU0FBTyxFQUFFO0FBQ0xqRCxZQUFRLEVBQUUsV0FETDtBQUVMRSxlQUFXLEVBQUUsY0FGUjtBQUdMcVAsaUJBQWEsRUFBRTtBQUFrQjtBQUg1QjtBQUlMQyxtQkFBZSxFQUFFO0FBQW9CO0FBSmhDO0FBS0xDLHdCQUFvQixFQUFFO0FBQXlCO0FBTDFDO0FBTUxDLHNCQUFrQixFQUFFO0FBQXVCO0FBTnRDO0FBT0xDLHdCQUFvQixFQUFFO0FBQXlCO0FBUDFDO0FBUUxDLHFCQUFpQixFQUFFO0FBQXNCO0FBUnBDO0FBU0xDLHNCQUFrQixFQUFFO0FBQXVCO0FBVHRDO0FBVUxDLHFCQUFpQixFQUFFO0FBQXNCO0FBVnBDO0FBV0xDLHdCQUFvQixFQUFFO0FBQXlCO0FBWDFDO0FBWUxDLHNCQUFrQixFQUFFO0FBQXVCO0FBWnRDO0FBYUxDLHlCQUFxQixFQUFFO0FBQTBCO0FBYjVDO0FBY0xDLHdCQUFvQixFQUFFO0FBQXlCO0FBZDFDO0FBZUxyQixrQkFBYyxFQUFFLGtCQWZYO0FBZ0JMeE8sbUJBQWUsRUFBRSxtQkFoQlo7QUFpQkxELG9CQUFnQixFQUFFLG9CQWpCYjtBQWtCTDBPLG9CQUFnQixFQUFFO0FBbEJiLEdBREU7QUFxQlhqUCxnQkFBYyxFQUFFO0FBQ1pDLFdBQU8sRUFBRUMsY0FERztBQUVaOFAsc0JBQWtCLEVBQUVoQyx5QkFGUjtBQUdaNEIsd0JBQW9CLEVBQUUxQiwyQkFIVjtBQUlaYyxrQkFBYyxFQUFFbkIscUJBSko7QUFLWnJOLG1CQUFlLEVBQUVzTixzQkFMTDtBQU1adk4sb0JBQWdCLEVBQUV3Tix1QkFOTjtBQU9aa0Isb0JBQWdCLEVBQUVRO0FBUE4sR0FyQkw7QUE4Qlg3SSxNQUFJO0FBQUE7QUFBQSw0QkFBRTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUNjLG1CQUFNLHFCQUFPO0FBQUEsa0JBQUV4RCxPQUFGLFVBQUVBLE9BQUY7QUFBQSxxQkFBZUEsT0FBZjtBQUFBLGFBQVAsQ0FBTjs7QUFEZDtBQUNJQSxtQkFESjtBQUFBO0FBRUYsbUJBQU0sd0JBQVVBLE9BQU8sQ0FBQzRNLGtCQUFsQixFQUFzQy9DLHNCQUF0QyxDQUFOOztBQUZFO0FBQUE7QUFHRixtQkFBTSx3QkFBVTdKLE9BQU8sQ0FBQzJNLGlCQUFsQixFQUFxQzdDLHFCQUFyQyxDQUFOOztBQUhFO0FBQUE7QUFJRixtQkFBTSx3QkFBVTlKLE9BQU8sQ0FBQ3dNLG9CQUFsQixFQUF3Q3pDLHdCQUF4QyxDQUFOOztBQUpFO0FBQUE7QUFLRixtQkFBTSx3QkFBVS9KLE9BQU8sQ0FBQ3lNLGtCQUFsQixFQUFzQ3pDLHNCQUF0QyxDQUFOOztBQUxFO0FBQUE7QUFNRixtQkFBTSx3QkFBVWhLLE9BQU8sQ0FBQ3VNLGVBQWxCLEVBQW1DdEMsbUJBQW5DLENBQU47O0FBTkU7QUFBQTtBQU9GLG1CQUFNLHdCQUFVakssT0FBTyxDQUFDNk0saUJBQWxCLEVBQXFDeEMscUJBQXJDLENBQU47O0FBUEU7QUFBQTtBQVFGLG1CQUFNLHdCQUFVckssT0FBTyxDQUFDME0sb0JBQWxCLEVBQXdDeEMsd0JBQXhDLENBQU47O0FBUkU7QUFBQTtBQVNGLG1CQUFNLHdCQUFVbEssT0FBTyxDQUFDZ04scUJBQWxCLEVBQXlDNUMseUJBQXpDLENBQU47O0FBVEU7QUFBQTtBQVVGLG1CQUFNLHdCQUFVcEssT0FBTyxDQUFDOE0sb0JBQWxCLEVBQXdDeEMsd0JBQXhDLENBQU47O0FBVkU7QUFBQTtBQVdGLG1CQUFNLHdCQUFVdEssT0FBTyxDQUFDK00sa0JBQWxCLEVBQXNDNUMsc0JBQXRDLENBQU47O0FBWEU7QUFBQTtBQVlGLG1CQUFNLHdCQUFVbkssT0FBTyxDQUFDc00sYUFBbEIsRUFBaUMvQixpQkFBakMsQ0FBTjs7QUFaRTtBQUFBO0FBYUYsbUJBQU0sd0JBQVV2SyxPQUFPLENBQUNpTixvQkFBbEIsRUFBd0N6Qyx3QkFBeEMsQ0FBTjs7QUFiRTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxHQUFGO0FBOUJPLEM7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQzlJZjs7QUFDQTs7QUFDQTs7QUFDQTs7QUFDQTs7OzswQkFjVTBDLGU7O0FBWlYsU0FBU0MsMkJBQVQsQ0FBc0NqUCxLQUF0QyxFQUE2Q0ssT0FBN0MsRUFBc0Q7QUFDbEQseUNBQVdMLEtBQVg7QUFBa0JrUCxlQUFXLEVBQUU7QUFBQ3JGLGFBQU8sRUFBRTtBQUFWO0FBQS9CO0FBQ0g7O0FBRUQsU0FBU3NGLDBCQUFULENBQXFDblAsS0FBckMsUUFBc0U7QUFBQSwwQkFBekJxQixPQUF5QjtBQUFBLE1BQWYrTixJQUFlLGdCQUFmQSxJQUFlO0FBQUEsTUFBVGhOLEtBQVMsZ0JBQVRBLEtBQVM7QUFDbEUseUNBQVdwQyxLQUFYO0FBQWtCa1AsZUFBVyxFQUFFO0FBQUNyRixhQUFPLEVBQUUsS0FBVjtBQUFpQnVGLFVBQUksRUFBSkEsSUFBakI7QUFBdUJoTixXQUFLLEVBQUxBO0FBQXZCO0FBQS9CO0FBQ0g7O0FBRUQsU0FBU2lOLGlDQUFULENBQTRDclAsS0FBNUMsRUFBbURLLE9BQW5ELEVBQTREO0FBQ3hELHlDQUFXTCxLQUFYO0FBQWtCa1AsZUFBVyxFQUFFO0FBQS9CO0FBQ0g7O0FBRUQsU0FBVUYsZUFBVjtBQUFBOztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQXNDTSxpQkFBdEMsU0FBNEJqTyxPQUE1QixDQUFzQ2lPLE9BQXRDO0FBQUE7QUFDb0IsaUJBQU0scUJBQU87QUFBQSxnQkFBRXhOLE9BQUYsU0FBRUEsT0FBRjtBQUFBLG1CQUFlQSxPQUFmO0FBQUEsV0FBUCxDQUFOOztBQURwQjtBQUNVQSxpQkFEVjtBQUVRc04sY0FGUixHQUVlLENBRmY7QUFBQTtBQUFBO0FBSWtFLGlCQUFNLHFCQUFPLFVBQUFwUCxLQUFLO0FBQUEsbUJBQUlBLEtBQUo7QUFBQSxXQUFaLENBQU47O0FBSmxFO0FBQUE7QUFJZThCLGtCQUpmLFNBSWVBLE9BSmY7QUFJbUN5TiwwQkFKbkMsU0FJd0J4TSxTQUp4QjtBQUlxRDJELG1CQUpyRCxTQUlxREEsU0FKckQ7QUFLUTBJLGNBQUksR0FBRyxFQUFQO0FBTFI7QUFNMEIsaUJBQU0scUJBQU8sVUFBQXBQLEtBQUs7QUFBQSxtQkFBSUEsS0FBSyxDQUFDd0csV0FBVjtBQUFBLFdBQVosQ0FBTjs7QUFOMUI7QUFBQTtBQU1lZ0YsaUJBTmYsU0FNZUEsT0FOZjtBQU9RNEQsY0FBSSxHQUFHLEVBQVA7QUFDQTs7QUFSUjtBQVM0QixpQkFBTSxtQkFBSzFJLFNBQUwsRUFBZ0IsT0FBaEIsRUFBeUIsYUFBekIsRUFBd0M7QUFBQ3FCLGdCQUFJLEVBQUV3SCxnQkFBUDtBQUF5QkQsbUJBQU8sRUFBUEE7QUFBekIsV0FBeEMsQ0FBTjs7QUFUNUI7QUFBQTtBQVNlN0QsbUJBVGYsU0FTZUEsU0FUZjtBQVVRMkQsY0FBSSxHQUFHLEVBQVA7QUFDQTs7QUFYUjtBQVlRLGlCQUFNLG1CQUFLNUQsT0FBTCxFQUFjQyxTQUFkLENBQU47O0FBWlI7QUFhUTJELGNBQUksR0FBRyxFQUFQO0FBQ0E7O0FBZFI7QUFlaUMsaUJBQU0scUJBQU8sVUFBQXBQLEtBQUs7QUFBQSxtQkFBSUEsS0FBSyxDQUFDK0MsU0FBVjtBQUFBLFdBQVosQ0FBTjs7QUFmakM7QUFlY3lNLDBCQWZkO0FBZ0JRSixjQUFJLEdBQUcsRUFBUDtBQUNBOztBQWpCUjtBQWtCeUIsaUJBQU0sbUJBQUsxSSxTQUFMLEVBQWdCLE9BQWhCLEVBQXlCLFVBQXpCLEVBQXFDO0FBQUNxQixnQkFBSSxFQUFFeUg7QUFBUCxXQUFyQyxDQUFOOztBQWxCekI7QUFrQmNqUCxrQkFsQmQ7QUFtQlE2TyxjQUFJLEdBQUcsRUFBUDtBQW5CUjtBQW9CUSxpQkFBTSxrQkFBSTtBQUFDaFAsZ0JBQUksRUFBRTBCLFFBQU8sQ0FBQzRMLGNBQWY7QUFBK0JyTSxtQkFBTyxFQUFFO0FBQUNkLHNCQUFRLEVBQVJBO0FBQUQ7QUFBeEMsV0FBSixDQUFOOztBQXBCUjtBQUFBO0FBcUJRLGlCQUFNLGtCQUFJO0FBQUNILGdCQUFJLEVBQUUwQixRQUFPLENBQUMvQztBQUFmLFdBQUosQ0FBTjs7QUFyQlI7QUFBQTtBQXNCUSxpQkFBTSxrQkFBSTtBQUFDcUIsZ0JBQUksRUFBRTBCLFFBQU8sQ0FBQzJOLG9CQUFmO0FBQXFDcE8sbUJBQU8sRUFBRTtBQUE5QyxXQUFKLENBQU47O0FBdEJSO0FBQUE7QUFBQTs7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQXdCUSxpQkFBTSxrQkFBSTtBQUFDakIsZ0JBQUksRUFBRTBCLE9BQU8sQ0FBQzROLG1CQUFmO0FBQW9Dck8sbUJBQU8sRUFBRTtBQUFDK04sa0JBQUksRUFBRUEsSUFBUDtBQUFhaE4sbUJBQUs7QUFBbEI7QUFBN0MsV0FBSixDQUFOOztBQXhCUjtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTs7QUE0QkEsU0FBU3VOLDJCQUFULENBQXNDM1AsS0FBdEMsRUFBNkM7QUFBQSxNQUNsQzhCLE9BRGtDLEdBQ1Y5QixLQURVLENBQ2xDOEIsT0FEa0M7QUFBQSxNQUN6Qm9OLFdBRHlCLEdBQ1ZsUCxLQURVLENBQ3pCa1AsV0FEeUI7QUFFekMsTUFBSSxDQUFDQSxXQUFMLEVBQWtCLE9BQU8sRUFBUDtBQUZ1QixNQUdsQ1UsMEJBSGtDLEdBR0o5TixPQUhJLENBR2xDOE4sMEJBSGtDO0FBQUEsTUFJbEMvRixPQUprQyxHQUlWcUYsV0FKVSxDQUlsQ3JGLE9BSmtDO0FBQUEsTUFJekJ1RixJQUp5QixHQUlWRixXQUpVLENBSXpCRSxJQUp5QjtBQUFBLE1BSW5CaE4sS0FKbUIsR0FJVjhNLFdBSlUsQ0FJbkI5TSxLQUptQjtBQUt6QyxTQUFPO0FBQUN5TixXQUFPLEVBQUUsSUFBVjtBQUFnQmhHLFdBQU8sRUFBUEEsT0FBaEI7QUFBeUJ1RixRQUFJLEVBQUpBLElBQXpCO0FBQStCaE4sU0FBSyxFQUFMQSxLQUEvQjtBQUFzQ3dOLDhCQUEwQixFQUExQkE7QUFBdEMsR0FBUDtBQUNIOztJQUVLRSxtQjs7Ozs7Ozs7Ozs7Ozs7Ozs7c0lBc0JjLFlBQU07QUFDbEIsWUFBS25ILEtBQUwsQ0FBVzFGLFFBQVgsQ0FBb0I7QUFBQzdDLFlBQUksRUFBRSxNQUFLdUksS0FBTCxDQUFXaUgsMEJBQWxCO0FBQThDdk8sZUFBTyxFQUFFO0FBQXZELE9BQXBCO0FBQ0gsSzs7Ozs7OzZCQXZCUztBQUFBLHdCQUNxQixLQUFLc0gsS0FEMUI7QUFBQSxVQUNDa0gsT0FERCxlQUNDQSxPQUREO0FBQUEsVUFDVWhHLE9BRFYsZUFDVUEsT0FEVjtBQUVOLFVBQUksQ0FBQ2dHLE9BQUwsRUFBYyxPQUFPLEtBQVA7O0FBQ2QsVUFBSWhHLE9BQUosRUFBYTtBQUNULGVBQ0ksNkJBQUMscUJBQUQ7QUFBTyxpQkFBTyxFQUFDLFNBQWY7QUFBeUIsbUJBQVMsRUFBRSxLQUFLa0c7QUFBekMsV0FDSSx3Q0FBSSxpQ0FBSixDQURKLENBREo7QUFLSCxPQU5ELE1BTU87QUFBQSwyQkFDbUIsS0FBS3BILEtBRHhCO0FBQUEsWUFDSXlHLElBREosZ0JBQ0lBLElBREo7QUFBQSxZQUNVaE4sS0FEVixnQkFDVUEsS0FEVjtBQUVILGVBQ0ksNkJBQUMscUJBQUQ7QUFBTyxpQkFBTyxFQUFDLFFBQWY7QUFBd0IsbUJBQVMsRUFBRSxLQUFLMk47QUFBeEMsV0FDSSx3Q0FBSSwyQ0FBSixDQURKLEVBRUksd0NBQUksT0FBSixFQUFhWCxJQUFiLENBRkosRUFHS2hOLEtBQUssQ0FBQzhJLE1BQU4sSUFBZ0Isd0NBQUksaUJBQUosRUFBdUI5SSxLQUFLLENBQUM4SSxNQUE3QixDQUhyQixFQUlLOUksS0FBSyxDQUFDd0UsT0FBTixJQUFpQix3Q0FBSXhFLEtBQUssQ0FBQzZGLFFBQU4sRUFBSixDQUp0QixDQURKO0FBUUg7QUFDSjs7O0VBckI2QmMsZUFBTUMsYTs7ZUEyQnpCO0FBQ1hsSCxTQUFPLEVBQUU7QUFDTGtPLGVBQVcsRUFBRSxjQURSO0FBRUxQLHdCQUFvQixFQUFFLHdCQUZqQjtBQUdMQyx1QkFBbUIsRUFBRSx1QkFIaEI7QUFJTEUsOEJBQTBCLEVBQUU7QUFKdkIsR0FERTtBQU9YbFIsZ0JBQWMsRUFBRTtBQUNaK1Esd0JBQW9CLEVBQUVSLDJCQURWO0FBRVpTLHVCQUFtQixFQUFFUCwwQkFGVDtBQUdaUyw4QkFBMEIsRUFBRVA7QUFIaEIsR0FQTDtBQVlYdE4sT0FBSyxFQUFFO0FBQ0grTix1QkFBbUIsRUFBRSx5QkFBUUgsMkJBQVIsRUFBcUNHLG1CQUFyQztBQURsQixHQVpJO0FBZVh4SyxNQUFJO0FBQUE7QUFBQSw0QkFBRSxTQUFVMkssU0FBVjtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUNjLG1CQUFNLHFCQUFPO0FBQUEsa0JBQUVuTyxPQUFGLFNBQUVBLE9BQUY7QUFBQSxxQkFBZUEsT0FBZjtBQUFBLGFBQVAsQ0FBTjs7QUFEZDtBQUNJQSxtQkFESjtBQUFBO0FBRUYsbUJBQU0sd0JBQVVBLE9BQU8sQ0FBQ2tPLFdBQWxCLEVBQStCaEIsZUFBL0IsQ0FBTjs7QUFGRTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsT0FBVWlCLFNBQVY7QUFBQSxHQUFGO0FBZk8sQzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNqRmY7O0FBQ0E7Ozs7MEJBRWlCN0gsdUI7O0FBQVYsU0FBVUEsdUJBQVYsQ0FBbUM1QixXQUFuQztBQUFBOztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQ0cwSixpQkFESCxHQUNhLDZCQUFhLFVBQUExRyxJQUFJLEVBQUk7QUFDakMscUJBQVMyRyxRQUFULEdBQXFCO0FBQ2pCLGtCQUFNQyxNQUFNLEdBQUd6TyxNQUFNLENBQUNvTCxRQUFQLENBQWdCM0MsSUFBaEIsQ0FBcUJpRyxZQUFwQztBQUNBN0csa0JBQUksQ0FBQztBQUFDNEcsc0JBQU0sRUFBTkE7QUFBRCxlQUFELENBQUo7QUFDSDs7QUFDRHpPLGtCQUFNLENBQUMyTyxnQkFBUCxDQUF3QixRQUF4QixFQUFrQ0gsUUFBbEM7QUFDQSxtQkFBTyxZQUFZO0FBQ2Z4TyxvQkFBTSxDQUFDNE8sbUJBQVAsQ0FBMkIsUUFBM0IsRUFBcUNKLFFBQXJDO0FBQ0gsYUFGRDtBQUdILFdBVGUsRUFTYnhHLG1CQUFRNkcsT0FBUixDQUFnQixDQUFoQixDQVRhLENBRGI7QUFBQTs7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBOztBQUFBO0FBY3NCLGlCQUFNLG1CQUFLTixPQUFMLENBQU47O0FBZHRCO0FBQUE7QUFjWUUsZ0JBZFosUUFjWUEsTUFkWjs7QUFBQSxnQkFlU0EsTUFBTSxLQUFLSyxVQWZwQjtBQUFBO0FBQUE7QUFBQTs7QUFBQTtBQWdCUyxpQkFBTSxtQkFBS2pLLFdBQVcsQ0FBQ2tGLGFBQWpCLEVBQWdDO0FBQUMwRSxrQkFBTSxFQUFOQTtBQUFELFdBQWhDLENBQU47O0FBaEJUO0FBaUJTSyxvQkFBVSxHQUFHTCxNQUFiOztBQWpCVDtBQUFBO0FBQUE7O0FBQUE7QUFBQTtBQXFCQ0YsaUJBQU8sQ0FBQ1EsS0FBUjtBQXJCRDs7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxDOzs7Ozs7O0FDSlA7O0FBRUE7QUFDQSxjQUFjLG1CQUFPLENBQUMsR0FBNkQ7QUFDbkYsNENBQTRDLFFBQVM7QUFDckQ7QUFDQTs7QUFFQSxlQUFlO0FBQ2Y7QUFDQTtBQUNBLGFBQWEsbUJBQU8sQ0FBQyxFQUFnRDtBQUNyRTtBQUNBO0FBQ0EsR0FBRyxLQUFVO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQSxnQ0FBZ0MsVUFBVSxFQUFFO0FBQzVDLEM7Ozs7Ozs7QUN6QkEsMkJBQTJCLG1CQUFPLENBQUMsRUFBNEM7QUFDL0U7OztBQUdBO0FBQ0EsY0FBYyxRQUFTLGVBQWUsd0JBQXdCLDZCQUE2QixnQ0FBZ0MsNEJBQTRCLGlCQUFpQixHQUFHLHFCQUFxQiwwQkFBMEIsR0FBRywrQkFBK0Isd0JBQXdCLEdBQUcsa0NBQWtDLHdCQUF3QixHQUFHLG9DQUFvQyx5QkFBeUIsR0FBRyxjQUFjLHdCQUF3QixHQUFHLGtDQUFrQyx3QkFBd0IseUJBQXlCLEdBQUcsMEJBQTBCLHdCQUF3QixtQkFBbUIsR0FBRyxpQkFBaUIsbURBQW1ELHNCQUFzQiw0QkFBNEIseUJBQXlCLDZCQUE2Qiw2QkFBNkIsbUNBQW1DLHdCQUF3QiwyQkFBMkIsd0JBQXdCLEdBQUcsZ0JBQWdCLGVBQWUscUJBQXFCLHdCQUF3Qiw0QkFBNEIsdUJBQXVCLGlCQUFpQix1QkFBdUIsaUJBQWlCLGdCQUFnQixlQUFlLEdBQUcsa0JBQWtCLHlCQUF5QixHQUFHLGdDQUFnQyx3QkFBd0IsR0FBRyxhQUFhLHVCQUF1QixHQUFHLGtCQUFrQixrQkFBa0IsNEJBQTRCLHdCQUF3Qix5QkFBeUIsR0FBRyx5QkFBeUIsaUJBQWlCLGtCQUFrQixtQkFBbUIsR0FBRyx1QkFBdUIsNkJBQTZCLHlCQUF5QixzQkFBc0IsR0FBRywrQkFBK0IsbUJBQW1CLHNCQUFzQix3QkFBd0IsR0FBRyx1Q0FBdUMsdUJBQXVCLGtCQUFrQix3QkFBd0IsR0FBRyxxQkFBcUIsMkNBQTJDLEdBQUcsdUJBQXVCLG1EQUFtRCxzQkFBc0IsR0FBRyxnQkFBZ0IsdUJBQXVCLEdBQUcsZUFBZSwwQkFBMEIsR0FBRywwQkFBMEIsa0JBQWtCLDRCQUE0Qix3QkFBd0IseUJBQXlCLDZCQUE2QixtQkFBbUIsNkJBQTZCLEdBQUcscUJBQXFCLHFCQUFxQixvQkFBb0Isa0JBQWtCLDBCQUEwQiw2QkFBNkIsbUNBQW1DLDRCQUE0Qix5QkFBeUIsbUNBQW1DLEdBQUcsMkJBQTJCLHdCQUF3QixxQ0FBcUMsa0JBQWtCLEdBQUcsZUFBZSx3QkFBd0Isb0NBQW9DLEdBQUcsZUFBZSx5QkFBeUIsc0JBQXNCLEdBQUcsb0JBQW9CLDZCQUE2QixnQ0FBZ0MsR0FBRyx5Q0FBeUMsNkJBQTZCLEdBQUcsMkJBQTJCLHlCQUF5Qix5QkFBeUIsR0FBRyw0Q0FBNEMsZ0JBQWdCLEdBQUcsK0NBQStDLGlCQUFpQixHQUFHLGVBQWUsS0FBSyx5REFBeUQsNEJBQTRCLHdCQUF3Qix5QkFBeUIsR0FBRyw4QkFBOEIsZ0JBQWdCLEdBQUcsK0JBQStCLDBCQUEwQixxQkFBcUIsR0FBRyxrQkFBa0Isc0JBQXNCLEdBQUc7O0FBRXgzRzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ05BOztBQUNBOztBQUVBOztBQUVBLFNBQVM5UixjQUFULENBQXlCb0IsS0FBekIsRUFBZ0NLLE9BQWhDLEVBQXlDO0FBQ3ZDLHlDQUFXTCxLQUFYO0FBQWtCMlEsZ0JBQVksRUFBRTtBQUM5QkMsZUFBUyxFQUFFLEVBRG1CO0FBRTlCQyxnQkFBVSxFQUFFLEVBRmtCO0FBRzlCQyxlQUFTLEVBQUUsQ0FIbUI7QUFJOUJDLGFBQU8sRUFBRTtBQUpxQjtBQUFoQztBQU1EOztBQUVELFNBQVNqUyxlQUFULENBQTBCa0IsS0FBMUIsRUFBaUNLLE9BQWpDLEVBQTBDO0FBQUEsTUFDbkNzUSxZQURtQyxHQUNLM1EsS0FETCxDQUNuQzJRLFlBRG1DO0FBQUEsTUFDVkssVUFEVSxHQUNLaFIsS0FETCxDQUNyQk8sUUFEcUIsQ0FDVnlRLFVBRFU7QUFFeENMLGNBQVksbUNBQU9BLFlBQVA7QUFBcUIxUCxTQUFLLEVBQUUrUCxVQUE1QjtBQUF3Q0QsV0FBTyxFQUFFQyxVQUFVLENBQUNqTDtBQUE1RCxJQUFaO0FBQ0E0SyxjQUFZLEdBQUcsa0NBQXNCQSxZQUF0QixDQUFmO0FBQ0EseUNBQVczUSxLQUFYO0FBQWtCMlEsZ0JBQVksRUFBWkE7QUFBbEI7QUFDRDs7QUFFRCxTQUFTTSwwQkFBVCxDQUFxQ2pSLEtBQXJDLFFBQWdFO0FBQUEsTUFBVGtSLEtBQVMsUUFBbkI3UCxPQUFtQixDQUFUNlAsS0FBUztBQUFBLE1BQ3pEUCxZQUR5RCxHQUN6QzNRLEtBRHlDLENBQ3pEMlEsWUFEeUQ7QUFFOURBLGNBQVksbUNBQU9BLFlBQVA7QUFBcUJPLFNBQUssRUFBTEEsS0FBckI7QUFBNEJkLFVBQU0sRUFBRSxJQUFJTyxZQUFZLENBQUNFO0FBQXJELElBQVo7QUFDQUYsY0FBWSxHQUFHLCtCQUFtQkEsWUFBbkIsQ0FBZjtBQUNBQSxjQUFZLEdBQUcsa0NBQXNCQSxZQUF0QixDQUFmO0FBQ0EseUNBQVczUSxLQUFYO0FBQWtCMlEsZ0JBQVksRUFBWkE7QUFBbEI7QUFDRDs7QUFFRCxTQUFTUSwyQkFBVCxDQUFzQ25SLEtBQXRDLFNBQXFFO0FBQUEsTUFBYjhRLFNBQWEsU0FBdkJ6UCxPQUF1QixDQUFieVAsU0FBYTtBQUFBLE1BQzlESCxZQUQ4RCxHQUM5QzNRLEtBRDhDLENBQzlEMlEsWUFEOEQ7QUFFbkVBLGNBQVksbUNBQU9BLFlBQVA7QUFBcUJHLGFBQVMsRUFBVEE7QUFBckIsSUFBWjtBQUNBSCxjQUFZLEdBQUcsa0NBQXNCQSxZQUF0QixDQUFmO0FBQ0EseUNBQVczUSxLQUFYO0FBQWtCMlEsZ0JBQVksRUFBWkE7QUFBbEI7QUFDRDs7QUFFRCxTQUFTUyxzQkFBVCxDQUFpQ3BSLEtBQWpDLEVBQXdDO0FBQUEsTUFDL0I4QixPQUQrQixHQUNOOUIsS0FETSxDQUMvQjhCLE9BRCtCO0FBQUEsTUFDdEI2TyxZQURzQixHQUNOM1EsS0FETSxDQUN0QjJRLFlBRHNCO0FBQUEsTUFFL0JVLG1CQUYrQixHQUVjdlAsT0FGZCxDQUUvQnVQLG1CQUYrQjtBQUFBLE1BRVZDLG9CQUZVLEdBRWN4UCxPQUZkLENBRVZ3UCxvQkFGVTtBQUFBLE1BRy9CSixLQUgrQixHQUdpRFAsWUFIakQsQ0FHL0JPLEtBSCtCO0FBQUEsTUFHeEJkLE1BSHdCLEdBR2lETyxZQUhqRCxDQUd4QlAsTUFId0I7QUFBQSxNQUdoQlEsU0FIZ0IsR0FHaURELFlBSGpELENBR2hCQyxTQUhnQjtBQUFBLE1BR0xDLFVBSEssR0FHaURGLFlBSGpELENBR0xFLFVBSEs7QUFBQSxNQUdPVSxNQUhQLEdBR2lEWixZQUhqRCxDQUdPWSxNQUhQO0FBQUEsTUFHZUMsUUFIZixHQUdpRGIsWUFIakQsQ0FHZWEsUUFIZjtBQUFBLE1BR3lCQyxXQUh6QixHQUdpRGQsWUFIakQsQ0FHeUJjLFdBSHpCO0FBQUEsTUFHc0M1QixPQUh0QyxHQUdpRGMsWUFIakQsQ0FHc0NkLE9BSHRDO0FBSXRDLFNBQU87QUFDTHdCLHVCQUFtQixFQUFuQkEsbUJBREs7QUFDZ0JDLHdCQUFvQixFQUFwQkEsb0JBRGhCO0FBRUxKLFNBQUssRUFBTEEsS0FGSztBQUVFZCxVQUFNLEVBQU5BLE1BRkY7QUFFVXNCLGVBQVcsRUFBRTdCLE9BQU8sQ0FBQzhCLElBRi9CO0FBRXFDZixhQUFTLEVBQVRBLFNBRnJDO0FBRWdEQyxjQUFVLEVBQVZBLFVBRmhEO0FBRTREVSxVQUFNLEVBQU5BLE1BRjVEO0FBRW9FQyxZQUFRLEVBQVJBLFFBRnBFO0FBRThFQyxlQUFXLEVBQVhBO0FBRjlFLEdBQVA7QUFJRDs7SUFFS0csYzs7Ozs7Ozs7Ozs7Ozs7Ozs7bUlBb0JTLFVBQUNDLE9BQUQsRUFBYTtBQUN4QixZQUFLQyxRQUFMLEdBQWdCRCxPQUFoQjtBQUNBLFVBQU1YLEtBQUssR0FBR1csT0FBTyxDQUFDRSxXQUF0QjtBQUNBLFVBQU0zQixNQUFNLEdBQUd5QixPQUFPLENBQUN4QixZQUF2Qjs7QUFDQSxZQUFLMUgsS0FBTCxDQUFXMUYsUUFBWCxDQUFvQjtBQUFDN0MsWUFBSSxFQUFFLE1BQUt1SSxLQUFMLENBQVcwSSxtQkFBbEI7QUFBdUNoUSxlQUFPLEVBQUU7QUFBQzZQLGVBQUssRUFBTEEsS0FBRDtBQUFRZCxnQkFBTSxFQUFOQTtBQUFSO0FBQWhELE9BQXBCO0FBQ0QsSztpSUFFVSxZQUFNO0FBQ2YsVUFBTVUsU0FBUyxHQUFHLE1BQUtnQixRQUFMLENBQWNoQixTQUFoQzs7QUFDQSxZQUFLbkksS0FBTCxDQUFXMUYsUUFBWCxDQUFvQjtBQUFDN0MsWUFBSSxFQUFFLE1BQUt1SSxLQUFMLENBQVcySSxvQkFBbEI7QUFBd0NqUSxlQUFPLEVBQUU7QUFBQ3lQLG1CQUFTLEVBQVRBO0FBQUQ7QUFBakQsT0FBcEI7QUFDRCxLOzs7Ozs7NkJBNUJTO0FBQUEsd0JBQzRELEtBQUtuSSxLQURqRTtBQUFBLFVBQ0R1SSxLQURDLGVBQ0RBLEtBREM7QUFBQSxVQUNNZCxNQUROLGVBQ01BLE1BRE47QUFBQSxVQUNjc0IsV0FEZCxlQUNjQSxXQURkO0FBQUEsVUFDMkJkLFNBRDNCLGVBQzJCQSxTQUQzQjtBQUFBLFVBQ3NDQyxVQUR0QyxlQUNzQ0EsVUFEdEM7QUFBQSxVQUNrRFUsTUFEbEQsZUFDa0RBLE1BRGxEO0FBRVIsYUFDRSwwQ0FDRTtBQUFLLFdBQUcsRUFBRSxLQUFLUyxVQUFmO0FBQTJCLGdCQUFRLEVBQUUsS0FBS0MsUUFBMUM7QUFBb0QsYUFBSyxFQUFFO0FBQUNDLGtCQUFRLEVBQUUsVUFBWDtBQUF1QmhCLGVBQUssRUFBRUEsS0FBSyxjQUFPQSxLQUFQLE9BQW5DO0FBQXFEZCxnQkFBTSxFQUFFQSxNQUFNLGNBQU9BLE1BQVAsT0FBbkU7QUFBc0YrQixtQkFBUyxFQUFFO0FBQWpHO0FBQTNELFNBQ0csQ0FBQ1QsV0FBVyxJQUFFLEVBQWQsRUFBa0I5USxHQUFsQixDQUFzQjtBQUFBLFlBQUV3UixLQUFGLFNBQUVBLEtBQUY7QUFBQSxZQUFTQyxPQUFULFNBQVNBLE9BQVQ7QUFBQSxlQUNyQjtBQUFLLGFBQUcsRUFBRUQsS0FBVjtBQUFpQixlQUFLLEVBQUU7QUFBQ0Ysb0JBQVEsRUFBRSxVQUFYO0FBQXVCSSxlQUFHLFlBQUtGLEtBQUssR0FBR3ZCLFVBQWI7QUFBMUI7QUFBeEIsV0FDR3dCLE9BQU8sQ0FBQ3pSLEdBQVIsQ0FBWTtBQUFBLGNBQUV3UixLQUFGLFNBQUVBLEtBQUY7QUFBQSxjQUFTRyxJQUFULFNBQVNBLElBQVQ7QUFBQSxpQkFDWDtBQUFNLGVBQUcsRUFBRUgsS0FBWDtBQUFrQixpQkFBSyxFQUFFO0FBQUNGLHNCQUFRLEVBQUUsVUFBWDtBQUF1Qk0sa0JBQUksWUFBS0osS0FBSyxHQUFHeEIsU0FBYixPQUEzQjtBQUF1RE0sbUJBQUssWUFBS04sU0FBTCxPQUE1RDtBQUFnRlIsb0JBQU0sWUFBS1MsVUFBTDtBQUF0RjtBQUF6QixhQUNHMEIsSUFBSSxJQUFJLEdBRFgsQ0FEVztBQUFBLFNBQVosQ0FESCxDQURxQjtBQUFBLE9BQXRCLENBREgsRUFRRTtBQUFLLGFBQUssRUFBRTtBQUFDTCxrQkFBUSxFQUFFLFVBQVg7QUFBdUJJLGFBQUcsWUFBS2YsTUFBTCxPQUExQjtBQUEyQ0wsZUFBSyxFQUFFLEtBQWxEO0FBQXlEZCxnQkFBTSxFQUFFO0FBQWpFO0FBQVosUUFSRixDQURGLENBREY7QUFjRDs7O0VBbEIwQnJILGVBQU1DLGE7O2VBa0NwQjtBQUNibEgsU0FBTyxFQUFFO0FBQ1B1UCx1QkFBbUIsRUFBRTtBQUF1QjtBQURyQztBQUVQQyx3QkFBb0IsRUFBRTtBQUF3Qjs7QUFGdkMsR0FESTtBQUtiNVMsZ0JBQWMsRUFBRTtBQUNkQyxXQUFPLEVBQUVDLGNBREs7QUFFZEMsWUFBUSxFQUFFQyxlQUZJO0FBR2R1Uyx1QkFBbUIsRUFBRUosMEJBSFA7QUFJZEssd0JBQW9CLEVBQUVIO0FBSlIsR0FMSDtBQVdicFAsT0FBSyxFQUFFO0FBQ0wwUSxnQkFBWSxFQUFFLHlCQUFRckIsc0JBQVIsRUFBZ0NRLGNBQWhDO0FBRFQ7QUFYTSxDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDaEZmOztBQUNBOztBQUNBOztBQUNBOztBQUNBOztBQUNBOztBQUVBOztBQUVBLFNBQVNoVCxjQUFULENBQXlCb0IsS0FBekIsRUFBZ0NLLE9BQWhDLEVBQXlDO0FBQ3ZDLHlDQUFXTCxLQUFYO0FBQWtCMFMsZ0JBQVksRUFBRTtBQUM5QjlCLGVBQVMsRUFBRSxFQURtQjtBQUU5QkMsZ0JBQVUsRUFBRSxFQUZrQjtBQUc5QlksaUJBQVcsRUFBRSxFQUhpQjtBQUk5QlgsZUFBUyxFQUFFLENBSm1CO0FBSzlCekksVUFBSSxFQUFFLE1BTHdCO0FBTTlCc0ssa0JBQVksRUFBRSxFQU5nQjtBQU85QkMscUJBQWUsRUFBRSxFQVBhO0FBUTlCN0IsYUFBTyxFQUFFO0FBUnFCO0FBQWhDO0FBVUQ7O0FBRUQsU0FBU2pTLGVBQVQsQ0FBMEJrQixLQUExQixFQUFpQ0ssT0FBakMsRUFBMEM7QUFBQSxNQUNqQzJRLFVBRGlDLEdBQ25CaFIsS0FBSyxDQUFDTyxRQURhLENBQ2pDeVEsVUFEaUM7QUFFeEMsU0FBTyxpQ0FBT2hSLEtBQVAsRUFBYztBQUFDMFMsZ0JBQVksRUFBRTtBQUFDelIsV0FBSyxFQUFFO0FBQUNLLFlBQUksRUFBRTBQO0FBQVAsT0FBUjtBQUE0QkQsYUFBTyxFQUFFO0FBQUN6UCxZQUFJLEVBQUUwUCxVQUFVLENBQUNqTDtBQUFsQjtBQUFyQztBQUFmLEdBQWQsQ0FBUDtBQUNEOztBQUVELFNBQVM4TSwwQkFBVCxDQUFxQzdTLEtBQXJDLFFBQXdFO0FBQUEsMEJBQTNCcUIsT0FBMkI7QUFBQSxNQUFqQjZQLEtBQWlCLGdCQUFqQkEsS0FBaUI7QUFBQSxNQUFWZCxNQUFVLGdCQUFWQSxNQUFVO0FBQUEsTUFDakVzQyxZQURpRSxHQUNqRDFTLEtBRGlELENBQ2pFMFMsWUFEaUU7QUFFdEVBLGNBQVksbUNBQU9BLFlBQVA7QUFBcUJ4QixTQUFLLEVBQUxBLEtBQXJCO0FBQTRCZCxVQUFNLEVBQUVuRCxJQUFJLENBQUNDLEdBQUwsQ0FBUyxJQUFJd0YsWUFBWSxDQUFDN0IsVUFBMUIsRUFBc0NULE1BQXRDO0FBQXBDLElBQVo7QUFDQSx5Q0FBV3BRLEtBQVg7QUFBa0IwUyxnQkFBWSxFQUFaQTtBQUFsQjtBQUNEOztBQUVELFNBQVNJLDJCQUFULENBQXNDOVMsS0FBdEMsU0FBMkU7QUFBQSw0QkFBN0JxQixPQUE2QjtBQUFBLE1BQW5CeVAsU0FBbUIsaUJBQW5CQSxTQUFtQjtBQUFBLE1BQVJhLElBQVEsaUJBQVJBLElBQVE7QUFBQSxNQUNwRWUsWUFEb0UsR0FDcEQxUyxLQURvRCxDQUNwRTBTLFlBRG9FOztBQUV6RSxNQUFJLE9BQU9mLElBQVAsS0FBZ0IsUUFBcEIsRUFBOEI7QUFBQSx3QkFDQ2UsWUFERDtBQUFBLFFBQ3JCN0IsVUFEcUIsaUJBQ3JCQSxVQURxQjtBQUFBLFFBQ1RrQyxNQURTLGlCQUNUQSxNQURTO0FBRTVCakMsYUFBUyxHQUFHN0QsSUFBSSxDQUFDQyxHQUFMLENBQVMsQ0FBVCxFQUFZRCxJQUFJLENBQUMrRixHQUFMLENBQVNELE1BQVQsRUFBaUJMLFlBQVksQ0FBQzVCLFNBQWIsR0FBeUJhLElBQUksR0FBR2QsVUFBakQsQ0FBWixDQUFaO0FBQ0Q7O0FBQ0Q2QixjQUFZLG1DQUFPQSxZQUFQO0FBQXFCNUIsYUFBUyxFQUFUQTtBQUFyQixJQUFaO0FBQ0EseUNBQVc5USxLQUFYO0FBQWtCMFMsZ0JBQVksRUFBWkE7QUFBbEI7QUFDRDs7QUFFRCxTQUFTTyw4QkFBVCxDQUF5Q2pULEtBQXpDLFNBQW1FO0FBQUEsTUFBUnFJLElBQVEsU0FBbEJoSCxPQUFrQixDQUFSZ0gsSUFBUTtBQUFBLE1BQzVEcUssWUFENEQsR0FDNUMxUyxLQUQ0QyxDQUM1RDBTLFlBRDREO0FBRWpFQSxjQUFZLG1DQUFPQSxZQUFQO0FBQXFCckssUUFBSSxFQUFFQTtBQUEzQixJQUFaO0FBQ0EseUNBQVdySSxLQUFYO0FBQWtCMFMsZ0JBQVksRUFBWkE7QUFBbEI7QUFDRDs7QUFFRCxTQUFTUSxxQ0FBVCxDQUFnRGxULEtBQWhELFNBQTZFO0FBQUEsTUFBWHFTLE9BQVcsU0FBckJoUixPQUFxQixDQUFYZ1IsT0FBVztBQUFBLE1BQ3RFSyxZQURzRSxHQUN0RDFTLEtBRHNELENBQ3RFMFMsWUFEc0U7QUFFM0VBLGNBQVksbUNBQU9BLFlBQVA7QUFBcUJqQixlQUFXLEVBQUVZLE9BQWxDO0FBQTJDTSxnQkFBWSxFQUFFLEVBQXpEO0FBQTZEQyxtQkFBZSxFQUFFO0FBQTlFLElBQVo7QUFDQSx5Q0FBVzVTLEtBQVg7QUFBa0IwUyxnQkFBWSxFQUFaQTtBQUFsQjtBQUNEOztBQUVELFNBQVNTLG1DQUFULENBQThDblQsS0FBOUMsU0FBbUY7QUFBQSw0QkFBN0JxQixPQUE2QjtBQUFBLE1BQW5CK1IsUUFBbUIsaUJBQW5CQSxRQUFtQjtBQUFBLE1BQVRoQixLQUFTLGlCQUFUQSxLQUFTO0FBQ2pGO0FBRGlGLE1BRTVFTSxZQUY0RSxHQUVsRDFTLEtBRmtELENBRTVFMFMsWUFGNEU7QUFBQSxNQUU5RG5TLFFBRjhELEdBRWxEUCxLQUZrRCxDQUU5RE8sUUFGOEQ7QUFBQSx1QkFHbEVtUyxZQUhrRTtBQUFBLE1BRzFFckssSUFIMEUsa0JBRzFFQSxJQUgwRTs7QUFJakYsTUFBSUEsSUFBSSxLQUFLLE1BQWIsRUFBcUI7QUFBQSx5QkFDRXFLLFlBREY7QUFBQSxRQUNkQyxZQURjLGtCQUNkQSxZQURjOztBQUVuQixRQUFJLE9BQU9QLEtBQVAsS0FBaUIsUUFBckIsRUFBK0I7QUFDN0IsVUFBSWdCLFFBQVEsS0FBSyxNQUFqQixFQUF5QjtBQUN2QlQsb0JBQVksR0FBRyxDQUFDUCxLQUFELENBQWY7QUFDRCxPQUZELE1BRU87QUFDTGdCLGdCQUFRLEdBQUcsQ0FBQyxrQ0FBc0JULFlBQXRCLEVBQW9DUCxLQUFwQyxDQUFaO0FBQ0FPLG9CQUFZLEdBQUcsaUNBQU9BLFlBQVAsRUFBcUIsNEJBQWdCQSxZQUFoQixFQUE4QlAsS0FBOUIsRUFBcUNnQixRQUFyQyxDQUFyQixDQUFmO0FBQ0Q7QUFDRixLQVBELE1BT08sSUFBSUEsUUFBSixFQUFjO0FBQ25CLFVBQU16QixJQUFJLEdBQUcxRSxJQUFJLENBQUNvRyxJQUFMLENBQVU5UyxRQUFRLENBQUN5USxVQUFULENBQW9CakwsTUFBcEIsR0FBNkIyTSxZQUFZLENBQUNqQixXQUFwRCxDQUFiO0FBQ0FrQixrQkFBWSxHQUFHLGtCQUFNLENBQU4sRUFBU2hCLElBQVQsQ0FBZjtBQUNELEtBSE0sTUFHQTtBQUNMZ0Isa0JBQVksR0FBRyxFQUFmO0FBQ0Q7O0FBQ0RELGdCQUFZLG1DQUFPQSxZQUFQO0FBQXFCQyxrQkFBWSxFQUFaQTtBQUFyQixNQUFaO0FBQ0QsR0FoQkQsTUFnQk8sSUFBSXRLLElBQUksS0FBSyxTQUFiLEVBQXdCO0FBQUEseUJBQ0xxSyxZQURLO0FBQUEsUUFDeEJFLGVBRHdCLGtCQUN4QkEsZUFEd0I7O0FBRTdCLFFBQUksT0FBT1IsS0FBUCxLQUFpQixRQUFyQixFQUErQjtBQUM3QixVQUFJZ0IsUUFBUSxLQUFLLE1BQWpCLEVBQXlCO0FBQ3ZCUix1QkFBZSxHQUFHLENBQUNSLEtBQUQsQ0FBbEI7QUFDRCxPQUZELE1BRU87QUFDTGdCLGdCQUFRLEdBQUcsQ0FBQyxrQ0FBc0JSLGVBQXRCLEVBQXVDUixLQUF2QyxDQUFaO0FBQ0FRLHVCQUFlLEdBQUcsaUNBQU9BLGVBQVAsRUFBd0IsNEJBQWdCQSxlQUFoQixFQUFpQ1IsS0FBakMsRUFBd0NnQixRQUF4QyxDQUF4QixDQUFsQjtBQUNEO0FBQ0YsS0FQRCxNQU9PLElBQUlBLFFBQUosRUFBYztBQUNuQlIscUJBQWUsR0FBRyxrQkFBTSxDQUFOLEVBQVNGLFlBQVksQ0FBQ2pCLFdBQXRCLENBQWxCO0FBQ0QsS0FGTSxNQUVBO0FBQ0xtQixxQkFBZSxHQUFHLEVBQWxCO0FBQ0Q7O0FBQ0RGLGdCQUFZLG1DQUFPQSxZQUFQO0FBQXFCRSxxQkFBZSxFQUFmQTtBQUFyQixNQUFaO0FBQ0Q7O0FBQ0QseUNBQVc1UyxLQUFYO0FBQWtCMFMsZ0JBQVksRUFBWkE7QUFBbEI7QUFDRDs7QUFFRCxTQUFTWSx1QkFBVCxDQUFrQ3RULEtBQWxDLEVBQXlDO0FBQUEsZUFDbEJBLEtBRGtCO0FBQUEsTUFDbEMwUyxZQURrQyxVQUNsQ0EsWUFEa0M7O0FBRXZDLE1BQUlBLFlBQUosRUFBa0I7QUFDaEJBLGdCQUFZLEdBQUdhLGNBQWMsQ0FBQ2IsWUFBRCxDQUE3QjtBQUNBOztBQUNBQSxnQkFBWSxHQUFHLGtDQUFzQkEsWUFBdEIsQ0FBZjs7QUFDQSxRQUFJQSxZQUFZLEtBQUsxUyxLQUFLLENBQUMwUyxZQUEzQixFQUF5QztBQUN2QzFTLFdBQUssbUNBQU9BLEtBQVA7QUFBYzBTLG9CQUFZLEVBQVpBO0FBQWQsUUFBTDtBQUNEO0FBQ0Y7O0FBQ0QsU0FBTzFTLEtBQVA7QUFDRDs7QUFFRCxTQUFTdVQsY0FBVCxDQUF5QkMsSUFBekIsRUFBK0I7QUFDN0I7QUFENkIsTUFFdEJwRCxNQUZzQixHQUUrQm9ELElBRi9CLENBRXRCcEQsTUFGc0I7QUFBQSxNQUVkUyxVQUZjLEdBRStCMkMsSUFGL0IsQ0FFZDNDLFVBRmM7QUFBQSxNQUVGQyxTQUZFLEdBRStCMEMsSUFGL0IsQ0FFRjFDLFNBRkU7QUFBQSxNQUVTN1AsS0FGVCxHQUUrQnVTLElBRi9CLENBRVN2UyxLQUZUO0FBQUEsTUFFZ0J3USxXQUZoQixHQUUrQitCLElBRi9CLENBRWdCL0IsV0FGaEI7QUFHN0IsTUFBTUQsUUFBUSxHQUFHdkUsSUFBSSxDQUFDQyxHQUFMLENBQVMsQ0FBVCxFQUFZRCxJQUFJLENBQUNvRyxJQUFMLENBQVVqRCxNQUFNLEdBQUdTLFVBQW5CLENBQVosQ0FBakI7QUFDQSxNQUFJVSxNQUFNLEdBQUcsR0FBYjtBQUFBLE1BQWtCd0IsTUFBTSxHQUFHLENBQTNCOztBQUNBLE1BQUkzQyxNQUFNLElBQUluUCxLQUFkLEVBQXFCO0FBQ25Cc1EsVUFBTSxHQUFHdEUsSUFBSSxDQUFDb0csSUFBTCxDQUFVcFMsS0FBSyxDQUFDOEUsTUFBTixHQUFlMEwsV0FBekIsSUFBd0NaLFVBQXhDLEdBQXFELENBQTlEO0FBQ0FrQyxVQUFNLEdBQUc5RixJQUFJLENBQUNDLEdBQUwsQ0FBUyxDQUFULEVBQVlxRSxNQUFNLEdBQUcsQ0FBVCxHQUFhQyxRQUFRLEdBQUdYLFVBQXBDLENBQVQ7QUFDRDs7QUFDRCx5Q0FBVzJDLElBQVg7QUFBaUJoQyxZQUFRLEVBQVJBLFFBQWpCO0FBQTJCVixhQUFTLEVBQUU3RCxJQUFJLENBQUMrRixHQUFMLENBQVNELE1BQVQsRUFBaUJqQyxTQUFqQixDQUF0QztBQUFtRVMsVUFBTSxFQUFOQSxNQUFuRTtBQUEyRXdCLFVBQU0sRUFBTkE7QUFBM0U7QUFDRDs7QUFFRCxTQUFTVSx3QkFBVCxDQUFtQ3pULEtBQW5DLEVBQTBDO0FBQUEsTUFDakM4QixPQURpQyxHQUNSOUIsS0FEUSxDQUNqQzhCLE9BRGlDO0FBQUEsTUFDeEI0USxZQUR3QixHQUNSMVMsS0FEUSxDQUN4QjBTLFlBRHdCO0FBQUEsTUFFakNnQixtQkFGaUMsR0FFbUc1UixPQUZuRyxDQUVqQzRSLG1CQUZpQztBQUFBLE1BRVpDLG9CQUZZLEdBRW1HN1IsT0FGbkcsQ0FFWjZSLG9CQUZZO0FBQUEsTUFFVUMsdUJBRlYsR0FFbUc5UixPQUZuRyxDQUVVOFIsdUJBRlY7QUFBQSxNQUVtQ0MsOEJBRm5DLEdBRW1HL1IsT0FGbkcsQ0FFbUMrUiw4QkFGbkM7QUFBQSxNQUVtRUMsNEJBRm5FLEdBRW1HaFMsT0FGbkcsQ0FFbUVnUyw0QkFGbkU7QUFBQSxNQUdqQzVDLEtBSGlDLEdBR2dFd0IsWUFIaEUsQ0FHakN4QixLQUhpQztBQUFBLE1BRzFCZCxNQUgwQixHQUdnRXNDLFlBSGhFLENBRzFCdEMsTUFIMEI7QUFBQSxNQUdsQlEsU0FIa0IsR0FHZ0U4QixZQUhoRSxDQUdsQjlCLFNBSGtCO0FBQUEsTUFHUEMsVUFITyxHQUdnRTZCLFlBSGhFLENBR1A3QixVQUhPO0FBQUEsTUFHS1UsTUFITCxHQUdnRW1CLFlBSGhFLENBR0tuQixNQUhMO0FBQUEsTUFHYUMsUUFIYixHQUdnRWtCLFlBSGhFLENBR2FsQixRQUhiO0FBQUEsTUFHdUJDLFdBSHZCLEdBR2dFaUIsWUFIaEUsQ0FHdUJqQixXQUh2QjtBQUFBLE1BR29DNUIsT0FIcEMsR0FHZ0U2QyxZQUhoRSxDQUdvQzdDLE9BSHBDO0FBQUEsTUFHNkN4SCxJQUg3QyxHQUdnRXFLLFlBSGhFLENBRzZDckssSUFIN0M7QUFBQSxNQUdtRHlJLFNBSG5ELEdBR2dFNEIsWUFIaEUsQ0FHbUQ1QixTQUhuRDtBQUl4QyxTQUFPO0FBQ0w0Qyx1QkFBbUIsRUFBbkJBLG1CQURLO0FBQ2dCQyx3QkFBb0IsRUFBcEJBLG9CQURoQjtBQUNzQ0MsMkJBQXVCLEVBQXZCQSx1QkFEdEM7QUFDK0RDLGtDQUE4QixFQUE5QkEsOEJBRC9EO0FBQytGQyxnQ0FBNEIsRUFBNUJBLDRCQUQvRjtBQUVMNUMsU0FBSyxFQUFMQSxLQUZLO0FBRUVkLFVBQU0sRUFBTkEsTUFGRjtBQUVVUCxXQUFPLEVBQVBBLE9BRlY7QUFFbUJlLGFBQVMsRUFBVEEsU0FGbkI7QUFFOEJDLGNBQVUsRUFBVkEsVUFGOUI7QUFFMENVLFVBQU0sRUFBTkEsTUFGMUM7QUFFa0RDLFlBQVEsRUFBUkEsUUFGbEQ7QUFFNERDLGVBQVcsRUFBWEEsV0FGNUQ7QUFFeUVwSixRQUFJLEVBQUpBLElBRnpFO0FBRStFeUksYUFBUyxFQUFUQTtBQUYvRSxHQUFQO0FBSUQ7O0lBRUtpRCxnQjs7Ozs7Ozs7Ozs7Ozs7Ozs7OEhBK0RJO0FBQUN0QyxpQkFBVyxFQUFFO0FBQWQsSzttSUFFSyxVQUFDSSxPQUFELEVBQWE7QUFDeEIsWUFBS0MsUUFBTCxHQUFnQkQsT0FBaEI7QUFDQSxVQUFNWCxLQUFLLEdBQUdXLE9BQU8sQ0FBQ0UsV0FBdEI7QUFDQSxVQUFNM0IsTUFBTSxHQUFHeUIsT0FBTyxDQUFDeEIsWUFBdkI7O0FBQ0EsWUFBSzFILEtBQUwsQ0FBVzFGLFFBQVgsQ0FBb0I7QUFBQzdDLFlBQUksRUFBRSxNQUFLdUksS0FBTCxDQUFXK0ssbUJBQWxCO0FBQXVDclMsZUFBTyxFQUFFO0FBQUM2UCxlQUFLLEVBQUxBLEtBQUQ7QUFBUWQsZ0JBQU0sRUFBTkE7QUFBUjtBQUFoRCxPQUFwQjtBQUNELEs7aUlBRVUsWUFBTTtBQUNmLFVBQU1VLFNBQVMsR0FBRyxNQUFLZ0IsUUFBTCxDQUFjaEIsU0FBaEM7O0FBQ0EsWUFBS25JLEtBQUwsQ0FBVzFGLFFBQVgsQ0FBb0I7QUFBQzdDLFlBQUksRUFBRSxNQUFLdUksS0FBTCxDQUFXZ0wsb0JBQWxCO0FBQXdDdFMsZUFBTyxFQUFFO0FBQUN5UCxtQkFBUyxFQUFUQTtBQUFEO0FBQWpELE9BQXBCO0FBQ0QsSzttSUFFWSxZQUFNO0FBQ2pCLFlBQUtuSSxLQUFMLENBQVcxRixRQUFYLENBQW9CO0FBQUM3QyxZQUFJLEVBQUUsTUFBS3VJLEtBQUwsQ0FBV2lMLHVCQUFsQjtBQUEyQ3ZTLGVBQU8sRUFBRTtBQUFDZ0gsY0FBSSxFQUFFO0FBQVA7QUFBcEQsT0FBcEI7QUFDRCxLO21JQUNZLFlBQU07QUFDakIsWUFBS00sS0FBTCxDQUFXMUYsUUFBWCxDQUFvQjtBQUFDN0MsWUFBSSxFQUFFLE1BQUt1SSxLQUFMLENBQVdpTCx1QkFBbEI7QUFBMkN2UyxlQUFPLEVBQUU7QUFBQ2dILGNBQUksRUFBRTtBQUFQO0FBQXBELE9BQXBCO0FBQ0QsSztxSUFFYyxZQUFNO0FBQ25CLFlBQUtNLEtBQUwsQ0FBVzFGLFFBQVgsQ0FBb0I7QUFBQzdDLFlBQUksRUFBRSxNQUFLdUksS0FBTCxDQUFXZ0wsb0JBQWxCO0FBQXdDdFMsZUFBTyxFQUFFO0FBQUNzUSxjQUFJLEVBQUUsQ0FBQyxNQUFLaEosS0FBTCxDQUFXNkk7QUFBbkI7QUFBakQsT0FBcEI7QUFDRCxLO29JQUNhLFlBQU07QUFDbEIsWUFBSzdJLEtBQUwsQ0FBVzFGLFFBQVgsQ0FBb0I7QUFBQzdDLFlBQUksRUFBRSxNQUFLdUksS0FBTCxDQUFXZ0wsb0JBQWxCO0FBQXdDdFMsZUFBTyxFQUFFO0FBQUNzUSxjQUFJLEVBQUUsQ0FBQztBQUFSO0FBQWpELE9BQXBCO0FBQ0QsSztzSUFDZSxZQUFNO0FBQ3BCLFlBQUtoSixLQUFMLENBQVcxRixRQUFYLENBQW9CO0FBQUM3QyxZQUFJLEVBQUUsTUFBS3VJLEtBQUwsQ0FBV2dMLG9CQUFsQjtBQUF3Q3RTLGVBQU8sRUFBRTtBQUFDc1EsY0FBSSxFQUFFO0FBQVA7QUFBakQsT0FBcEI7QUFDRCxLO3VJQUNnQixZQUFNO0FBQ3JCLFlBQUtoSixLQUFMLENBQVcxRixRQUFYLENBQW9CO0FBQUM3QyxZQUFJLEVBQUUsTUFBS3VJLEtBQUwsQ0FBV2dMLG9CQUFsQjtBQUF3Q3RTLGVBQU8sRUFBRTtBQUFDc1EsY0FBSSxFQUFFLE1BQUtoSixLQUFMLENBQVc2STtBQUFsQjtBQUFqRCxPQUFwQjtBQUNELEs7MElBRW1CLFVBQUN3QyxLQUFELEVBQVc7QUFDN0IsVUFBTUMsSUFBSSxHQUFHRCxLQUFLLENBQUNFLE1BQU4sQ0FBYUMsS0FBMUI7QUFDQSxVQUFNQSxLQUFLLEdBQUdDLFFBQVEsQ0FBQ0gsSUFBRCxDQUF0Qjs7QUFDQSxVQUFJLENBQUNJLEtBQUssQ0FBQ0YsS0FBRCxDQUFOLElBQWlCQSxLQUFLLEdBQUcsQ0FBekIsSUFBOEJBLEtBQUssR0FBRyxFQUExQyxFQUE4QztBQUM1QyxjQUFLRyxRQUFMLENBQWM7QUFBQzdDLHFCQUFXLEVBQUU7QUFBZCxTQUFkOztBQUNBLGNBQUs5SSxLQUFMLENBQVcxRixRQUFYLENBQW9CO0FBQUM3QyxjQUFJLEVBQUUsTUFBS3VJLEtBQUwsQ0FBV2tMLDhCQUFsQjtBQUFrRHhTLGlCQUFPLEVBQUU7QUFBQ2dSLG1CQUFPLEVBQUU4QjtBQUFWO0FBQTNELFNBQXBCO0FBQ0QsT0FIRCxNQUdPO0FBQ0wsY0FBS0csUUFBTCxDQUFjO0FBQUM3QyxxQkFBVyxFQUFFd0M7QUFBZCxTQUFkO0FBQ0Q7QUFDRixLO2tJQUVXLFlBQU07QUFDaEIsWUFBS3RMLEtBQUwsQ0FBVzFGLFFBQVgsQ0FBb0I7QUFBQzdDLFlBQUksRUFBRSxNQUFLdUksS0FBTCxDQUFXbUwsNEJBQWxCO0FBQWdEelMsZUFBTyxFQUFFO0FBQUMrUixrQkFBUSxFQUFFO0FBQVg7QUFBekQsT0FBcEI7QUFDRCxLO21JQUNZLFlBQU07QUFDakIsWUFBS3pLLEtBQUwsQ0FBVzFGLFFBQVgsQ0FBb0I7QUFBQzdDLFlBQUksRUFBRSxNQUFLdUksS0FBTCxDQUFXbUwsNEJBQWxCO0FBQWdEelMsZUFBTyxFQUFFO0FBQUMrUixrQkFBUSxFQUFFO0FBQVg7QUFBekQsT0FBcEI7QUFDRCxLO21JQUNZLFVBQUNZLEtBQUQsRUFBVztBQUN0QixVQUFNNUIsS0FBSyxHQUFHZ0MsUUFBUSxDQUFDSixLQUFLLENBQUNPLGFBQU4sQ0FBb0JDLE9BQXBCLENBQTRCcEMsS0FBN0IsQ0FBdEI7O0FBQ0EsWUFBS3pKLEtBQUwsQ0FBVzFGLFFBQVgsQ0FBb0I7QUFBQzdDLFlBQUksRUFBRSxNQUFLdUksS0FBTCxDQUFXbUwsNEJBQWxCO0FBQWdEelMsZUFBTyxFQUFFO0FBQUMrUSxlQUFLLEVBQUxBLEtBQUQ7QUFBUWdCLGtCQUFRLEVBQUVZLEtBQUssQ0FBQ1MsUUFBTixHQUFpQixRQUFqQixHQUE0QjtBQUE5QztBQUF6RCxPQUFwQjtBQUNELEs7c0lBQ2UsVUFBQ1QsS0FBRCxFQUFXO0FBQ3pCLFVBQU01QixLQUFLLEdBQUdnQyxRQUFRLENBQUNKLEtBQUssQ0FBQ08sYUFBTixDQUFvQkMsT0FBcEIsQ0FBNEJwQyxLQUE3QixDQUF0Qjs7QUFDQSxZQUFLekosS0FBTCxDQUFXMUYsUUFBWCxDQUFvQjtBQUFDN0MsWUFBSSxFQUFFLE1BQUt1SSxLQUFMLENBQVdtTCw0QkFBbEI7QUFBZ0R6UyxlQUFPLEVBQUU7QUFBQytRLGVBQUssRUFBTEEsS0FBRDtBQUFRZ0Isa0JBQVEsRUFBRVksS0FBSyxDQUFDUyxRQUFOLEdBQWlCLFFBQWpCLEdBQTRCO0FBQTlDO0FBQXpELE9BQXBCO0FBQ0QsSzs7Ozs7OzZCQXZIUztBQUFBOztBQUFBLHdCQUMyRSxLQUFLOUwsS0FEaEY7QUFBQSxVQUNEdUksS0FEQyxlQUNEQSxLQURDO0FBQUEsVUFDTWQsTUFETixlQUNNQSxNQUROO0FBQUEsVUFDY1AsT0FEZCxlQUNjQSxPQURkO0FBQUEsVUFDdUJlLFNBRHZCLGVBQ3VCQSxTQUR2QjtBQUFBLFVBQ2tDQyxVQURsQyxlQUNrQ0EsVUFEbEM7QUFBQSxVQUM4Q1ksV0FEOUMsZUFDOENBLFdBRDlDO0FBQUEsVUFDMkRGLE1BRDNELGVBQzJEQSxNQUQzRDtBQUFBLFVBQ21FbEosSUFEbkUsZUFDbUVBLElBRG5FO0FBR1IsYUFDRSwwQ0FDRTtBQUFLLGlCQUFTLEVBQUMsYUFBZjtBQUE2QixhQUFLLEVBQUU7QUFBQ3FNLHNCQUFZLEVBQUU7QUFBZjtBQUFwQyxTQUNFO0FBQUssaUJBQVMsRUFBQyxXQUFmO0FBQTJCLGFBQUssRUFBRTtBQUFDQyxxQkFBVyxFQUFFO0FBQWQ7QUFBbEMsU0FDRSw2QkFBQyxzQkFBRDtBQUFRLGVBQU8sRUFBRSxLQUFLQyxVQUF0QjtBQUFrQyxjQUFNLEVBQUV2TSxJQUFJLEtBQUssTUFBbkQ7QUFBMkQsY0FBTSxFQUFDO0FBQWxFLFNBQXdFLFFBQXhFLENBREYsRUFFRSw2QkFBQyxzQkFBRDtBQUFRLGVBQU8sRUFBRSxLQUFLd00sVUFBdEI7QUFBa0MsY0FBTSxFQUFFeE0sSUFBSSxLQUFLLFNBQW5EO0FBQThELGNBQU0sRUFBQztBQUFyRSxTQUEyRSxVQUEzRSxDQUZGLENBREYsRUFLRTtBQUFLLGlCQUFTLEVBQUMsV0FBZjtBQUEyQixhQUFLLEVBQUU7QUFBQ3NNLHFCQUFXLEVBQUU7QUFBZDtBQUFsQyxTQUNFLDZCQUFDLHNCQUFEO0FBQVEsZUFBTyxFQUFFLEtBQUtHLFlBQXRCO0FBQW9DLGNBQU0sRUFBQztBQUEzQyxTQUFnRDtBQUFHLGlCQUFTLEVBQUM7QUFBYixRQUFoRCxDQURGLEVBRUUsNkJBQUMsc0JBQUQ7QUFBUSxlQUFPLEVBQUUsS0FBS0MsV0FBdEI7QUFBbUMsY0FBTSxFQUFDO0FBQTFDLFNBQStDO0FBQUcsaUJBQVMsRUFBQztBQUFiLFFBQS9DLENBRkYsRUFHRSw2QkFBQyxzQkFBRDtBQUFRLGVBQU8sRUFBRSxLQUFLQyxhQUF0QjtBQUFxQyxjQUFNLEVBQUM7QUFBNUMsU0FBaUQ7QUFBRyxpQkFBUyxFQUFDO0FBQWIsUUFBakQsQ0FIRixFQUlFLDZCQUFDLHNCQUFEO0FBQVEsZUFBTyxFQUFFLEtBQUtDLGNBQXRCO0FBQXNDLGNBQU0sRUFBQztBQUE3QyxTQUFrRDtBQUFHLGlCQUFTLEVBQUM7QUFBYixRQUFsRCxDQUpGLENBTEYsRUFXRTtBQUFLLGlCQUFTLEVBQUM7QUFBZixTQUNFO0FBQU8sYUFBSyxFQUFFO0FBQUNwTSxvQkFBVSxFQUFFLFFBQWI7QUFBdUI4TCxxQkFBVyxFQUFFO0FBQXBDO0FBQWQsU0FBMkQsWUFBM0QsQ0FERixFQUVFO0FBQU8sWUFBSSxFQUFDLFFBQVo7QUFBcUIsYUFBSyxFQUFFLEtBQUszVSxLQUFMLENBQVd5UixXQUFYLEtBQTJCLElBQTNCLEdBQWtDQSxXQUFsQyxHQUFnRCxLQUFLelIsS0FBTCxDQUFXeVIsV0FBdkY7QUFBb0csZ0JBQVEsRUFBRSxLQUFLeUQsaUJBQW5IO0FBQ0EsYUFBSyxFQUFFO0FBQUNQLHFCQUFXLEVBQUUsS0FBZDtBQUFxQnpELGVBQUssRUFBQyxNQUEzQjtBQUFtQ2lFLGVBQUssRUFBRSxLQUFLblYsS0FBTCxDQUFXeVIsV0FBWCxLQUEyQixJQUEzQixHQUFrQyxPQUFsQyxHQUE0QztBQUF0RixTQURQO0FBQ3FHLGlCQUFTLEVBQUUseUJBQVcsY0FBWCxFQUEyQixVQUEzQixFQUF1QyxLQUFLelIsS0FBTCxDQUFXeVIsV0FBWCxLQUEyQixJQUEzQixHQUFrQyxFQUFsQyxHQUF1QyxZQUE5RTtBQURoSCxRQUZGLENBWEYsRUFnQkU7QUFBSyxpQkFBUyxFQUFDO0FBQWYsU0FDRSw2QkFBQyxzQkFBRDtBQUFRLGVBQU8sRUFBRSxLQUFLMkQsU0FBdEI7QUFBaUMsY0FBTSxFQUFDO0FBQXhDLFNBQThDLHFCQUE5QyxDQURGLEVBRUUsNkJBQUMsc0JBQUQ7QUFBUSxlQUFPLEVBQUUsS0FBS0MsVUFBdEI7QUFBa0MsY0FBTSxFQUFDO0FBQXpDLFNBQStDLHNCQUEvQyxDQUZGLENBaEJGLENBREYsRUFzQkUsMENBQ0U7QUFBSyxXQUFHLEVBQUUsS0FBS3JELFVBQWY7QUFBMkIsZ0JBQVEsRUFBRSxLQUFLQyxRQUExQztBQUFvRCxhQUFLLEVBQUU7QUFBQ0Msa0JBQVEsRUFBRSxVQUFYO0FBQXVCaEIsZUFBSyxFQUFFQSxLQUFLLGNBQU9BLEtBQVAsT0FBbkM7QUFBcURkLGdCQUFNLEVBQUVBLE1BQU0sY0FBT0EsTUFBUCxPQUFuRTtBQUFzRitCLG1CQUFTLEVBQUU7QUFBakc7QUFBM0QsU0FDR3RDLE9BQU8sSUFBSSxDQUFDQSxPQUFPLENBQUM4QixJQUFSLElBQWMsRUFBZixFQUFtQi9RLEdBQW5CLENBQXVCO0FBQUEsWUFBRXdSLEtBQUYsU0FBRUEsS0FBRjtBQUFBLFlBQVNDLE9BQVQsU0FBU0EsT0FBVDtBQUFBLFlBQWtCZSxRQUFsQixTQUFrQkEsUUFBbEI7QUFBQSxlQUNqQztBQUFLLGFBQUcsRUFBRWhCLEtBQVY7QUFBaUIsbUJBQVMsRUFBRSx5QkFBVyxZQUFYLEVBQXlCLGlCQUF6QixFQUE0Q2dCLFFBQVEsR0FBRyxVQUFILEdBQWdCLEVBQXBFLENBQTVCO0FBQXFHLGVBQUssRUFBRTtBQUFDZCxlQUFHLFlBQUtGLEtBQUssR0FBR3ZCLFVBQWIsT0FBSjtBQUFpQ0ssaUJBQUssWUFBS04sU0FBUyxHQUFHYSxXQUFqQixPQUF0QztBQUF3RXJCLGtCQUFNLFlBQUtTLFVBQUw7QUFBOUUsV0FBNUc7QUFDRSxpQkFBTyxFQUFFLE1BQUksQ0FBQ3lFLFVBRGhCO0FBQzRCLHdCQUFZbEQ7QUFEeEMsV0FFRTtBQUFLLG1CQUFTLEVBQUMsaUJBQWY7QUFBaUMsZUFBSyxFQUFFO0FBQUNsQixpQkFBSyxZQUFLTixTQUFTLEdBQUdhLFdBQWpCLE9BQU47QUFBd0NyQixrQkFBTSxZQUFLUyxVQUFVLEdBQUcsQ0FBbEI7QUFBOUM7QUFBeEMsV0FDR3dCLE9BQU8sQ0FBQ3pSLEdBQVIsQ0FBWTtBQUFBLGNBQUV3UixLQUFGLFNBQUVBLEtBQUY7QUFBQSxjQUFTRyxJQUFULFNBQVNBLElBQVQ7QUFBQSxpQkFDWDtBQUFNLGVBQUcsRUFBRUgsS0FBWDtBQUFrQixpQkFBSyxFQUFFO0FBQUNJLGtCQUFJLFlBQUtKLEtBQUssR0FBR3hCLFNBQWIsT0FBTDtBQUFpQ00sbUJBQUssWUFBS04sU0FBTCxPQUF0QztBQUEwRFIsb0JBQU0sWUFBS1MsVUFBTDtBQUFoRTtBQUF6QixhQUNHMEIsSUFBSSxJQUFJLEdBRFgsQ0FEVztBQUFBLFNBQVosQ0FESCxDQUZGLENBRGlDO0FBQUEsT0FBdkIsQ0FEZCxFQVdHMUMsT0FBTyxJQUFJLENBQUNBLE9BQU8sQ0FBQ3dDLE9BQVIsSUFBaUIsRUFBbEIsRUFBc0J6UixHQUF0QixDQUEwQjtBQUFBLFlBQUV3UixLQUFGLFNBQUVBLEtBQUY7QUFBQSxZQUFTVCxJQUFULFNBQVNBLElBQVQ7QUFBQSxZQUFleUIsUUFBZixTQUFlQSxRQUFmO0FBQUEsZUFDcEM7QUFBSyxhQUFHLEVBQUVoQixLQUFWO0FBQWlCLG1CQUFTLEVBQUUseUJBQVcsWUFBWCxFQUF5QixvQkFBekIsRUFBK0NnQixRQUFRLEdBQUcsVUFBSCxHQUFnQixFQUF2RSxDQUE1QjtBQUF3RyxlQUFLLEVBQUU7QUFBQ1osZ0JBQUksWUFBS0osS0FBSyxHQUFHeEIsU0FBYixPQUFMO0FBQWlDTSxpQkFBSyxZQUFLTixTQUFMLE9BQXRDO0FBQTBEUixrQkFBTSxZQUFLbUIsTUFBTDtBQUFoRSxXQUEvRztBQUNFLGlCQUFPLEVBQUUsTUFBSSxDQUFDZ0UsYUFEaEI7QUFDK0Isd0JBQVluRDtBQUQzQyxXQUVFO0FBQUssbUJBQVMsRUFBQyxpQkFBZjtBQUFpQyxlQUFLLEVBQUU7QUFBQ2xCLGlCQUFLLFlBQUtOLFNBQVMsR0FBRyxDQUFqQixPQUFOO0FBQThCUixrQkFBTSxZQUFLbUIsTUFBTDtBQUFwQztBQUF4QyxXQUNHSSxJQUFJLENBQUMvUSxHQUFMLENBQVM7QUFBQSxjQUFFd1IsS0FBRixTQUFFQSxLQUFGO0FBQUEsY0FBU0csSUFBVCxTQUFTQSxJQUFUO0FBQUEsaUJBQ1I7QUFBTSxlQUFHLEVBQUVILEtBQVg7QUFBa0IsaUJBQUssRUFBRTtBQUFDRSxpQkFBRyxZQUFLRixLQUFLLEdBQUd2QixVQUFiLE9BQUo7QUFBaUNLLG1CQUFLLFlBQUtOLFNBQUwsT0FBdEM7QUFBMERSLG9CQUFNLFlBQUtTLFVBQUw7QUFBaEU7QUFBekIsYUFDRzBCLElBQUksSUFBSSxHQURYLENBRFE7QUFBQSxTQUFULENBREgsQ0FGRixDQURvQztBQUFBLE9BQTFCLENBWGQsRUFxQkU7QUFBSyxhQUFLLEVBQUU7QUFBQ0wsa0JBQVEsRUFBRSxVQUFYO0FBQXVCSSxhQUFHLFlBQUtmLE1BQUwsT0FBMUI7QUFBMkNMLGVBQUssRUFBRSxLQUFsRDtBQUF5RGQsZ0JBQU0sRUFBRTtBQUFqRTtBQUFaLFFBckJGLENBREYsQ0F0QkYsQ0FERjtBQWtERDs7O3lDQUVxQjtBQUNwQixVQUFJLEtBQUswQixRQUFULEVBQW1CO0FBQ2pCLGFBQUtBLFFBQUwsQ0FBY2hCLFNBQWQsR0FBMEIsS0FBS25JLEtBQUwsQ0FBV21JLFNBQXJDO0FBQ0Q7QUFDRjs7O0VBN0Q0Qi9ILGVBQU1DLGE7O2VBNkh0QjtBQUNibEgsU0FBTyxFQUFFO0FBQ1A0Uix1QkFBbUIsRUFBRTtBQUF1QjtBQURyQztBQUVQQyx3QkFBb0IsRUFBRTtBQUF3QjtBQUZ2QztBQUdQQywyQkFBdUIsRUFBRTtBQUE0QjtBQUg5QztBQUlQQyxrQ0FBOEIsRUFBRTtBQUFtQztBQUo1RDtBQUtQQyxnQ0FBNEIsRUFBRTtBQUFpQzs7QUFMeEQsR0FESTtBQVFicFYsZ0JBQWMsRUFBRTtBQUNkQyxXQUFPLEVBQUVDLGNBREs7QUFFZEMsWUFBUSxFQUFFQyxlQUZJO0FBR2Q0VSx1QkFBbUIsRUFBRWIsMEJBSFA7QUFJZGMsd0JBQW9CLEVBQUViLDJCQUpSO0FBS2RjLDJCQUF1QixFQUFFWCw4QkFMWDtBQU1kWSxrQ0FBOEIsRUFBRVgscUNBTmxCO0FBT2RZLGdDQUE0QixFQUFFWDtBQVBoQixHQVJIO0FBaUJidE8sYUFBVyxFQUFFeU8sdUJBakJBO0FBa0JidlIsT0FBSyxFQUFFO0FBQ0x5VCxnQkFBWSxFQUFFLHlCQUFRL0Isd0JBQVIsRUFBa0NNLGdCQUFsQztBQURUO0FBbEJNLEM7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDOVBmOztBQUNBOztBQUNBOztBQUNBOztBQUVBLFNBQVNuVixjQUFULENBQXlCb0IsS0FBekIsRUFBZ0NLLE9BQWhDLEVBQXlDO0FBQ3ZDLHlDQUFXTCxLQUFYO0FBQWtCeVYscUJBQWlCLEVBQUU7QUFBckM7QUFDRDs7QUFFRCxTQUFTQyw0QkFBVCxDQUF1QzFWLEtBQXZDLEVBQThDO0FBQzVDLE1BQUlBLEtBQUssQ0FBQ3lWLGlCQUFOLElBQTJCelYsS0FBSyxDQUFDTyxRQUFyQyxFQUErQztBQUFBLGlCQUNvSFAsS0FEcEg7QUFBQSxpQ0FDeENPLFFBRHdDO0FBQUEsUUFDN0JDLFFBRDZCLG1CQUM3QkEsUUFENkI7QUFBQSxRQUNuQm1WLG9CQURtQixtQkFDbkJBLG9CQURtQjtBQUFBLFFBQ0dDLFdBREgsbUJBQ0dBLFdBREg7QUFBQSxRQUNnQjVFLFVBRGhCLG1CQUNnQkEsVUFEaEI7QUFBQSxxQ0FDNkIwQixZQUQ3QjtBQUFBLFFBQzRDckssSUFENUMsdUJBQzRDQSxJQUQ1QztBQUFBLFFBQ2tEb0osV0FEbEQsdUJBQ2tEQSxXQURsRDtBQUFBLFFBQytEa0IsWUFEL0QsdUJBQytEQSxZQUQvRDtBQUFBLFFBQzZFQyxlQUQ3RSx1QkFDNkVBLGVBRDdFO0FBQUEsUUFDK0Y2QyxpQkFEL0YsVUFDK0ZBLGlCQUQvRjtBQUU3QyxRQUFJSSxlQUFlLEdBQUcsRUFBdEI7O0FBQ0EsUUFBSXhOLElBQUksS0FBSyxNQUFULElBQW1Cc0ssWUFBWSxDQUFDNU0sTUFBYixLQUF3QixDQUEvQyxFQUFrRDtBQUNoRCxVQUFNK1AsT0FBTyxHQUFHLElBQUloUixHQUFKLENBQVF0RSxRQUFRLENBQUN1VixLQUFULENBQWUsRUFBZixFQUFtQm5WLEdBQW5CLENBQXVCLFVBQUFvVixDQUFDO0FBQUEsZUFBSSxDQUFDQSxDQUFELEVBQUksQ0FBSixDQUFKO0FBQUEsT0FBeEIsQ0FBUixDQUFoQjtBQURnRDtBQUFBO0FBQUE7O0FBQUE7QUFFaEQsNkJBQWtCckQsWUFBbEIsOEhBQWdDO0FBQUEsY0FBdkJQLEtBQXVCO0FBQzlCLGNBQU02RCxRQUFRLEdBQUc3RCxLQUFLLEdBQUdYLFdBQXpCO0FBQ0EsY0FBTXlFLE1BQU0sR0FBR0QsUUFBUSxHQUFHeEUsV0FBWCxHQUF5QixDQUF4QztBQUNBMEUsc0JBQVksQ0FBQ0wsT0FBRCxFQUFVOUUsVUFBVixFQUFzQmlGLFFBQXRCLEVBQWdDQyxNQUFoQyxDQUFaO0FBQ0Q7QUFOK0M7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTs7QUFPaERMLHFCQUFlLEdBQUdPLDJCQUEyQixDQUFDTixPQUFPLENBQUNsUSxPQUFSLEVBQUQsQ0FBN0M7QUFDRCxLQVJELE1BUU8sSUFBSXlDLElBQUksS0FBSyxTQUFULElBQXNCdUssZUFBZSxDQUFDN00sTUFBaEIsS0FBMkIsQ0FBckQsRUFBd0Q7QUFDN0QsVUFBSTBMLFdBQVcsS0FBSyxFQUFwQixFQUF3QjtBQUN0QixZQUFNNEUsR0FBRyxHQUFHLHlCQUFXekQsZUFBZSxDQUFDMEQsSUFBaEIsQ0FBcUIsR0FBckIsQ0FBWCxDQUFaO0FBQ0EsWUFBTUMsU0FBUyxHQUFHLElBQUkvVixRQUFRLENBQUN1RixNQUEvQjtBQUNBLFlBQU15USxXQUFXLEdBQUdiLG9CQUFvQixDQUFDYyxNQUFyQixDQUE0QixVQUFDQyxDQUFELEVBQUlDLENBQUo7QUFBQSxpQkFBVTFKLElBQUksQ0FBQ0MsR0FBTCxDQUFTd0osQ0FBVCxFQUFZQyxDQUFDLENBQUNDLEtBQWQsQ0FBVjtBQUFBLFNBQTVCLEVBQTRELENBQTVELENBQXBCO0FBQ0EsWUFBTUMsT0FBTyxHQUFHTCxXQUFXLEdBQUcsQ0FBZCxHQUFrQixFQUFsQztBQUFzQzs7QUFDdEMsWUFBTTVRLE9BQU8sR0FBR3BGLFFBQVEsQ0FBQ3VWLEtBQVQsQ0FBZSxFQUFmLEVBQW1CblYsR0FBbkIsQ0FBdUIsVUFBQW9WLENBQUM7QUFBQSxpQkFBSSxDQUFDQSxDQUFELEVBQUlPLFNBQVMsR0FBR00sT0FBTyxJQUFJUixHQUFHLEtBQUssQ0FBUixHQUFZLENBQWhCLENBQXZCLENBQUo7QUFBQSxTQUF4QixDQUFoQjtBQUNBUix1QkFBZSxHQUFHTywyQkFBMkIsQ0FBQ3hRLE9BQUQsQ0FBN0M7QUFDRCxPQVBELE1BT087QUFDTCxZQUFNa1IsbUJBQW1CLEdBQUcsSUFBSXRSLEtBQUosQ0FBVWhGLFFBQVEsQ0FBQ3VGLE1BQW5CLEVBQTJCZ1IsSUFBM0IsQ0FBZ0MsQ0FBaEMsQ0FBNUI7QUFESztBQUFBO0FBQUE7O0FBQUE7QUFFTCxnQ0FBZ0JuRSxlQUFoQixtSUFBaUM7QUFBQSxnQkFBeEJvRSxHQUF3QjtBQUMvQkMsMEJBQWMsQ0FBQ0gsbUJBQUQsRUFBc0JsQixXQUFXLENBQUNvQixHQUFELENBQWpDLENBQWQ7QUFDRDtBQUpJO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7O0FBS0xuQix1QkFBZSxHQUFHTywyQkFBMkIsQ0FDM0NVLG1CQUFtQixDQUFDbFcsR0FBcEIsQ0FBd0IsVUFBQ2dXLEtBQUQsRUFBUTlRLENBQVI7QUFBQSxpQkFBYyxDQUFDdEYsUUFBUSxDQUFDc0YsQ0FBRCxDQUFULEVBQWM4USxLQUFkLENBQWQ7QUFBQSxTQUF4QixDQUQyQyxDQUE3QztBQUVEO0FBQ0Y7O0FBQ0RuQixxQkFBaUIsbUNBQU9BLGlCQUFQO0FBQTBCSSxxQkFBZSxFQUFmQTtBQUExQixNQUFqQjtBQUNBN1YsU0FBSyxtQ0FBT0EsS0FBUDtBQUFjeVYsdUJBQWlCLEVBQWpCQTtBQUFkLE1BQUw7QUFDRDs7QUFDRCxTQUFPelYsS0FBUDtBQUNEOztBQUVELFNBQVNtVyxZQUFULENBQXVCdlYsR0FBdkIsRUFBNEJxVCxJQUE1QixFQUFrQ2dDLFFBQWxDLEVBQTRDQyxNQUE1QyxFQUFvRDtBQUNsRCxPQUFLLElBQUlnQixHQUFHLEdBQUdqQixRQUFmLEVBQXlCaUIsR0FBRyxJQUFJaEIsTUFBaEMsRUFBd0NnQixHQUFHLElBQUksQ0FBL0MsRUFBa0Q7QUFDaERDLGVBQVcsQ0FBQ3ZXLEdBQUQsRUFBTXFULElBQUksQ0FBQ2lELEdBQUQsQ0FBVixDQUFYO0FBQ0Q7QUFDRjs7QUFFRCxTQUFTQyxXQUFULENBQXNCdlcsR0FBdEIsRUFBMkJ3VyxJQUEzQixFQUFpQztBQUMvQixNQUFNQyxLQUFLLEdBQUd6VyxHQUFHLENBQUNxRSxHQUFKLENBQVFtUyxJQUFSLENBQWQ7O0FBQ0EsTUFBSUMsS0FBSyxLQUFLM1MsU0FBZCxFQUF5QjtBQUN2QjlELE9BQUcsQ0FBQ3NFLEdBQUosQ0FBUWtTLElBQVIsRUFBY0MsS0FBSyxHQUFHLENBQXRCO0FBQ0Q7QUFDRjs7QUFFRCxTQUFTSixjQUFULENBQXlCSyxHQUF6QixFQUE4QmpULEdBQTlCLEVBQW1DO0FBQ2pDLE9BQUssSUFBSXlCLENBQUMsR0FBRyxDQUFiLEVBQWdCQSxDQUFDLEdBQUd3UixHQUFHLENBQUN2UixNQUF4QixFQUFnQ0QsQ0FBQyxJQUFJLENBQXJDLEVBQXdDO0FBQ3RDd1IsT0FBRyxDQUFDeFIsQ0FBRCxDQUFILElBQVV6QixHQUFHLENBQUN5QixDQUFELENBQWI7QUFDRDtBQUNGOztBQUVELFNBQVNzUSwyQkFBVCxDQUFzQ3hRLE9BQXRDLEVBQStDO0FBQzdDLE1BQU1DLE1BQU0sR0FBR0wsS0FBSyxDQUFDK1IsSUFBTixDQUFXM1IsT0FBWCxDQUFmO0FBQ0EsTUFBTTRSLFVBQVUsR0FBRzNSLE1BQU0sQ0FBQzRRLE1BQVAsQ0FBYyxVQUFDQyxDQUFELEVBQUlDLENBQUo7QUFBQSxXQUFVRCxDQUFDLEdBQUdDLENBQUMsQ0FBQyxDQUFELENBQWY7QUFBQSxHQUFkLEVBQWtDLENBQWxDLENBQW5CO0FBQ0E5USxRQUFNLENBQUM0UixJQUFQLENBQVksVUFBVUMsRUFBVixFQUFjQyxFQUFkLEVBQWtCO0FBQzNCLFFBQU1DLEVBQUUsR0FBR0YsRUFBRSxDQUFDLENBQUQsQ0FBYjtBQUFBLFFBQWtCRyxFQUFFLEdBQUdGLEVBQUUsQ0FBQyxDQUFELENBQXpCO0FBQ0EsV0FBT0MsRUFBRSxHQUFHQyxFQUFMLEdBQVUsQ0FBQyxDQUFYLEdBQWdCRCxFQUFFLEdBQUdDLEVBQUwsR0FBVSxDQUFWLEdBQWMsQ0FBckM7QUFDRixHQUhEO0FBSUEsU0FBT2hTLE1BQU0sQ0FBQ2pGLEdBQVAsQ0FBVztBQUFBO0FBQUEsUUFBRWtYLE1BQUY7QUFBQSxRQUFVVCxLQUFWOztBQUFBLFdBQXNCO0FBQUNTLFlBQU0sRUFBTkEsTUFBRDtBQUFTbEIsV0FBSyxFQUFFUyxLQUFLLEdBQUdHO0FBQXhCLEtBQXRCO0FBQUEsR0FBWCxDQUFQO0FBQ0Q7O0FBRUQsU0FBU08seUJBQVQsQ0FBb0MvWCxLQUFwQyxFQUEyQztBQUFBLHlCQUNrREEsS0FEbEQsQ0FDbENPLFFBRGtDO0FBQUEsTUFDdkJDLFFBRHVCLG9CQUN2QkEsUUFEdUI7QUFBQSxNQUNibVYsb0JBRGEsb0JBQ2JBLG9CQURhO0FBQUEsTUFDOEJFLGVBRDlCLEdBQ2tEN1YsS0FEbEQsQ0FDVXlWLGlCQURWLENBQzhCSSxlQUQ5QjtBQUV6QyxNQUFNbUMsS0FBSyxHQUFHLEtBQUtyQyxvQkFBb0IsQ0FBQ2MsTUFBckIsQ0FBNEIsVUFBQ0MsQ0FBRCxFQUFJQyxDQUFKO0FBQUEsV0FBVTFKLElBQUksQ0FBQ0MsR0FBTCxDQUFTd0osQ0FBVCxFQUFZQyxDQUFDLENBQUNDLEtBQWQsQ0FBVjtBQUFBLEdBQTVCLEVBQTRELENBQTVELENBQW5CO0FBQ0EsU0FBTztBQUNMcUIsZ0JBQVksRUFBRXpYLFFBQVEsQ0FBQ3VGLE1BRGxCO0FBRUw0UCx3QkFBb0IsRUFBcEJBLG9CQUZLO0FBR0xFLG1CQUFlLEVBQWZBLGVBSEs7QUFJTG1DLFNBQUssRUFBTEE7QUFKSyxHQUFQO0FBTUQ7O0lBRUtFLHFCOzs7Ozs7Ozs7Ozs7NkJBQ007QUFBQSx3QkFDNkQsS0FBS3ZQLEtBRGxFO0FBQUEsVUFDRHNQLFlBREMsZUFDREEsWUFEQztBQUFBLFVBQ2F0QyxvQkFEYixlQUNhQSxvQkFEYjtBQUFBLFVBQ21DRSxlQURuQyxlQUNtQ0EsZUFEbkM7QUFBQSxVQUNvRG1DLEtBRHBELGVBQ29EQSxLQURwRDtBQUVSLFVBQUksQ0FBQ3JDLG9CQUFMLEVBQTJCLE9BQU8sS0FBUDtBQUMzQixhQUNFO0FBQUssaUJBQVMsRUFBQztBQUFmLFNBQ0U7QUFBSyxhQUFLLEVBQUU7QUFBQ3dDLGVBQUssRUFBRSxNQUFSO0FBQWdCakgsZUFBSyxFQUFFLE9BQXZCO0FBQWdDZCxnQkFBTSxFQUFFLE9BQXhDO0FBQWlEN0csa0JBQVEsRUFBRSxNQUEzRDtBQUFtRTZPLG9CQUFVLEVBQUUsTUFBL0U7QUFBdUZsRyxrQkFBUSxFQUFFO0FBQWpHO0FBQVosU0FDRTtBQUFLLGFBQUssRUFBRTtBQUFDOUIsZ0JBQU0sRUFBRSxNQUFUO0FBQWlCOEIsa0JBQVEsRUFBRSxVQUEzQjtBQUF1Q0ksYUFBRyxFQUFFO0FBQTVDO0FBQVosU0FDRyw0QkFESCxDQURGLEVBSUU7QUFBSyxhQUFLLEVBQUU7QUFBQ2xDLGdCQUFNLEVBQUUsTUFBVDtBQUFpQjhCLGtCQUFRLEVBQUUsVUFBM0I7QUFBdUNJLGFBQUcsRUFBRTtBQUE1QztBQUFaLFNBQ0cscUJBREgsQ0FKRixFQU9FO0FBQUssYUFBSyxFQUFFO0FBQUNsQyxnQkFBTSxFQUFFLE1BQVQ7QUFBaUI4QixrQkFBUSxFQUFFLFVBQTNCO0FBQXVDSSxhQUFHLEVBQUU7QUFBNUM7QUFBWixTQUNHLGlCQURILENBUEYsRUFVRTtBQUFLLGFBQUssRUFBRTtBQUFDbEMsZ0JBQU0sRUFBRSxNQUFUO0FBQWlCOEIsa0JBQVEsRUFBRSxVQUEzQjtBQUF1Q0ksYUFBRyxFQUFFO0FBQTVDO0FBQVosU0FDRywwQkFESCxDQVZGLENBREYsRUFlRyxrQkFBTSxDQUFOLEVBQVMyRixZQUFULEVBQXVCclgsR0FBdkIsQ0FBMkIsVUFBQXdSLEtBQUs7QUFBQSxlQUMvQjtBQUFLLGFBQUcsRUFBRUEsS0FBVjtBQUFpQixlQUFLLEVBQUU7QUFBQytGLGlCQUFLLEVBQUUsTUFBUjtBQUFnQmpILGlCQUFLLEVBQUUsTUFBdkI7QUFBK0JkLGtCQUFNLEVBQUUsT0FBdkM7QUFBZ0Q4QixvQkFBUSxFQUFFO0FBQTFEO0FBQXhCLFdBQ0UsNkJBQUMsZ0JBQUQ7QUFBa0IsZUFBSyxFQUFFRSxLQUF6QjtBQUFnQyxjQUFJLEVBQUV5RCxlQUFlLENBQUN6RCxLQUFELENBQXJEO0FBQThELGVBQUssRUFBRTRGO0FBQXJFLFVBREYsRUFFRSw2QkFBQyxxQkFBRDtBQUF1QixlQUFLLEVBQUU1RixLQUE5QjtBQUFxQyxjQUFJLEVBQUV1RCxvQkFBb0IsQ0FBQ3ZELEtBQUQsQ0FBL0Q7QUFBd0UsZUFBSyxFQUFFNEY7QUFBL0UsVUFGRixDQUQrQjtBQUFBLE9BQWhDLENBZkgsQ0FERjtBQXVCRDs7O0VBM0JpQ2pQLGVBQU1DLGE7O0lBOEJwQ3FQLGdCOzs7Ozs7Ozs7Ozs7NkJBQ007QUFBQSx5QkFDYyxLQUFLMVAsS0FEbkI7QUFBQSxVQUNENEosSUFEQyxnQkFDREEsSUFEQztBQUFBLFVBQ0t5RixLQURMLGdCQUNLQSxLQURMO0FBRVIsVUFBSSxDQUFDekYsSUFBTCxFQUFXLE9BQU8sS0FBUDtBQUNYLGFBQ0U7QUFBSyxhQUFLLEVBQUU7QUFBQ0wsa0JBQVEsRUFBRSxVQUFYO0FBQXVCSSxhQUFHLEVBQUU7QUFBNUI7QUFBWixTQUNFO0FBQUssYUFBSyxFQUFFO0FBQUNwQixlQUFLLEVBQUUsTUFBUjtBQUFnQmQsZ0JBQU0sRUFBRSxNQUF4QjtBQUFnQ2tJLGlCQUFPLEVBQUUsWUFBekM7QUFBdURDLHVCQUFhLEVBQUU7QUFBdEU7QUFBWixTQUNFO0FBQUssYUFBSyxFQUFFO0FBQUNuSSxnQkFBTSxZQUFLbkQsSUFBSSxDQUFDK0YsR0FBTCxDQUFTLEVBQVQsRUFBYS9GLElBQUksQ0FBQ3VMLEtBQUwsQ0FBV2pHLElBQUksQ0FBQ3FFLEtBQUwsR0FBYW9CLEtBQXhCLENBQWIsQ0FBTCxPQUFQO0FBQThEOUcsZUFBSyxFQUFFLEtBQXJFO0FBQTRFdUgsb0JBQVUsRUFBRSxLQUF4RjtBQUErRkMsb0JBQVUsRUFBRTtBQUEzRztBQUFaLFFBREYsQ0FERixFQUlFO0FBQUssYUFBSyxFQUFFO0FBQUN4SCxlQUFLLEVBQUUsTUFBUjtBQUFnQmQsZ0JBQU0sRUFBRSxNQUF4QjtBQUFnQ3VJLGdCQUFNLEVBQUUsaUJBQXhDO0FBQTJEakUsc0JBQVksRUFBRSxLQUF6RTtBQUFnRmtFLG1CQUFTLEVBQUU7QUFBM0Y7QUFBWixTQUNHckcsSUFBSSxDQUFDdUYsTUFEUixDQUpGLENBREY7QUFVRDs7O0VBZDRCL08sZUFBTUMsYTs7SUFpQi9CNlAscUI7Ozs7Ozs7Ozs7Ozs2QkFDTTtBQUFBLHlCQUNjLEtBQUtsUSxLQURuQjtBQUFBLFVBQ0Q0SixJQURDLGdCQUNEQSxJQURDO0FBQUEsVUFDS3lGLEtBREwsZ0JBQ0tBLEtBREw7QUFFUixhQUNFO0FBQUssYUFBSyxFQUFFO0FBQUM5RixrQkFBUSxFQUFFLFVBQVg7QUFBdUJJLGFBQUcsRUFBRTtBQUE1QjtBQUFaLFNBQ0U7QUFBSyxhQUFLLEVBQUU7QUFBQ3BCLGVBQUssRUFBRSxNQUFSO0FBQWdCZCxnQkFBTSxFQUFFLE1BQXhCO0FBQWdDdUksZ0JBQU0sRUFBRSxpQkFBeEM7QUFBMkRqRSxzQkFBWSxFQUFFLEtBQXpFO0FBQWdGa0UsbUJBQVMsRUFBRTtBQUEzRjtBQUFaLFNBQ0dyRyxJQUFJLENBQUN1RixNQURSLENBREYsRUFJRTtBQUFLLGFBQUssRUFBRTtBQUFDNUcsZUFBSyxFQUFFLE1BQVI7QUFBZ0JkLGdCQUFNLEVBQUUsTUFBeEI7QUFBZ0NtSSx1QkFBYSxFQUFFO0FBQS9DO0FBQVosU0FDRTtBQUFLLGFBQUssRUFBRTtBQUFDbkksZ0JBQU0sWUFBS25ELElBQUksQ0FBQ3VMLEtBQUwsQ0FBV2pHLElBQUksQ0FBQ3FFLEtBQUwsR0FBYW9CLEtBQXhCLENBQUwsT0FBUDtBQUFnRDlHLGVBQUssRUFBRSxLQUF2RDtBQUE4RHVILG9CQUFVLEVBQUUsS0FBMUU7QUFBaUZDLG9CQUFVLEVBQUU7QUFBN0Y7QUFBWixRQURGLENBSkYsQ0FERjtBQVVEOzs7RUFiaUMzUCxlQUFNQyxhOztlQWdCM0I7QUFDYnRLLGdCQUFjLEVBQUU7QUFDZEMsV0FBTyxFQUFFQztBQURLLEdBREg7QUFJYmlHLGFBQVcsRUFBRTZRLDRCQUpBO0FBS2IzVCxPQUFLLEVBQUU7QUFDTCtXLHFCQUFpQixFQUFFLHlCQUFRZix5QkFBUixFQUFtQ0cscUJBQW5DO0FBRGQ7QUFMTSxDOzs7Ozs7OztBQ3BKZixlOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ0NBOztBQUNBOztBQUNBOztBQUNBOztBQUNBOztBQUNBOztBQUVBOzs7OzBCQTBGVWEsYzs7QUF4RlYsU0FBU25hLGNBQVQsQ0FBeUJvQixLQUF6QixFQUFnQ0ssT0FBaEMsRUFBeUM7QUFDdkMseUNBQVdMLEtBQVg7QUFBa0JnWixjQUFVLEVBQUU7QUFDNUI5TixZQUFNLEVBQUUsT0FEb0I7QUFFNUIrTixXQUFLLEVBQUUsR0FGcUI7QUFHNUIvRyxjQUFRLEVBQUUsQ0FIa0I7QUFJNUJnSCxZQUFNLEVBQUUsRUFKb0I7QUFLNUJDLG1CQUFhLEVBQUUsQ0FMYTtBQU01QkMsaUJBQVcsRUFBRSxDQU5lO0FBTzVCQyxrQkFBWSxFQUFFO0FBUGM7QUFBOUI7QUFTRDs7QUFFRCxTQUFTdmEsZUFBVCxDQUEwQmtCLEtBQTFCLEVBQWlDSyxPQUFqQyxFQUEwQztBQUFBLE1BQ25DMlksVUFEbUMsR0FDR2haLEtBREgsQ0FDbkNnWixVQURtQztBQUFBLE1BQ1poSSxVQURZLEdBQ0doUixLQURILENBQ3ZCTyxRQUR1QixDQUNaeVEsVUFEWTtBQUV4Q2dJLFlBQVUsbUNBQU9BLFVBQVA7QUFBbUJJLGVBQVcsRUFBRXBJLFVBQVUsQ0FBQ2pMLE1BQVgsR0FBb0I7QUFBcEQsSUFBVjtBQUNBLHlDQUFXL0YsS0FBWDtBQUFrQmdaLGNBQVUsRUFBVkE7QUFBbEI7QUFDRDs7QUFFRCxTQUFTTSw4QkFBVCxDQUF5Q3RaLEtBQXpDLFFBQXFFO0FBQUEsTUFBVmtMLE1BQVUsUUFBcEI3SixPQUFvQixDQUFWNkosTUFBVTtBQUFBLE1BQzVEOE4sVUFENEQsR0FDOUNoWixLQUQ4QyxDQUM1RGdaLFVBRDREO0FBRW5FLE1BQU1PLE9BQU8sR0FBRztBQUFDck8sVUFBTSxFQUFFO0FBQUM1SixVQUFJLEVBQUU0SjtBQUFQO0FBQVQsR0FBaEI7O0FBQ0EsTUFBSUEsTUFBTSxLQUFLLE9BQWYsRUFBd0I7QUFDdEJxTyxXQUFPLENBQUNySCxRQUFSLEdBQW1CO0FBQUM1USxVQUFJLEVBQUUwWCxVQUFVLENBQUNHO0FBQWxCLEtBQW5CO0FBQ0QsR0FGRCxNQUVPLElBQUlqTyxNQUFNLEtBQUssS0FBZixFQUFzQjtBQUMzQnFPLFdBQU8sQ0FBQ3JILFFBQVIsR0FBbUI7QUFBQzVRLFVBQUksRUFBRTBYLFVBQVUsQ0FBQ0k7QUFBbEIsS0FBbkI7QUFDRCxHQUZNLE1BRUEsSUFBSWxPLE1BQU0sS0FBSyxNQUFmLEVBQXVCO0FBQzVCLFFBQUk4TixVQUFVLENBQUM5RyxRQUFYLEtBQXdCOEcsVUFBVSxDQUFDSSxXQUF2QyxFQUFvRDtBQUNsREcsYUFBTyxDQUFDckgsUUFBUixHQUFtQjtBQUFDNVEsWUFBSSxFQUFFMFgsVUFBVSxDQUFDRztBQUFsQixPQUFuQjtBQUNEO0FBQ0Y7O0FBQ0QsU0FBTyxpQ0FBT25aLEtBQVAsRUFBYztBQUFDZ1osY0FBVSxFQUFFTztBQUFiLEdBQWQsQ0FBUDtBQUNEOztBQUVELFNBQVNDLDZCQUFULENBQXdDeFosS0FBeEMsRUFBK0NLLE9BQS9DLEVBQXdEO0FBQUEsTUFDbEM2UixRQURrQyxHQUNyQmxTLEtBRHFCLENBQy9DZ1osVUFEK0MsQ0FDbEM5RyxRQURrQztBQUV0RCxNQUFJQSxRQUFRLEtBQUssQ0FBakIsRUFBb0IsT0FBT2xTLEtBQVA7QUFDcEIsU0FBTyxpQ0FBT0EsS0FBUCxFQUFjO0FBQUNnWixjQUFVLEVBQUU7QUFDaEM5TixZQUFNLEVBQUU7QUFBQzVKLFlBQUksRUFBRTtBQUFQLE9BRHdCO0FBRWhDNFEsY0FBUSxFQUFFO0FBQUM1USxZQUFJLEVBQUU0USxRQUFRLEdBQUc7QUFBbEI7QUFGc0I7QUFBYixHQUFkLENBQVA7QUFJRDs7QUFFRCxTQUFTdUgsNEJBQVQsQ0FBdUN6WixLQUF2QyxFQUE4Q0ssT0FBOUMsRUFBdUQ7QUFBQSwwQkFDUEwsS0FETyxDQUM5Q2daLFVBRDhDO0FBQUEsTUFDakM5RyxRQURpQyxxQkFDakNBLFFBRGlDO0FBQUEsTUFDdkJrSCxXQUR1QixxQkFDdkJBLFdBRHVCO0FBRXJELE1BQUlsSCxRQUFRLEtBQUtrSCxXQUFqQixFQUE4QixPQUFPcFosS0FBUDtBQUM5QixTQUFPLGlDQUFPQSxLQUFQLEVBQWM7QUFBQ2daLGNBQVUsRUFBRTtBQUNoQzlOLFlBQU0sRUFBRTtBQUFDNUosWUFBSSxFQUFFO0FBQVAsT0FEd0I7QUFFaEM0USxjQUFRLEVBQUU7QUFBQzVRLFlBQUksRUFBRTRRLFFBQVEsR0FBRztBQUFsQjtBQUZzQjtBQUFiLEdBQWQsQ0FBUDtBQUlEOztBQUVELFNBQVN3SCxxQkFBVCxDQUFnQzFaLEtBQWhDLFNBQThEO0FBQUEsTUFBWmtTLFFBQVksU0FBdEI3USxPQUFzQixDQUFaNlEsUUFBWTtBQUM1RCxTQUFPLGlDQUFPbFMsS0FBUCxFQUFjO0FBQUNnWixjQUFVLEVBQUU7QUFDaEM5TixZQUFNLEVBQUU7QUFBQzVKLFlBQUksRUFBRTtBQUFQLE9BRHdCO0FBRWhDNFEsY0FBUSxFQUFFO0FBQUM1USxZQUFJLEVBQUU0UTtBQUFQO0FBRnNCO0FBQWIsR0FBZCxDQUFQO0FBSUQ7O0FBRUQsU0FBU3lILHFCQUFULENBQWdDM1osS0FBaEMsRUFBdUNLLE9BQXZDLEVBQWdEO0FBQUEsMkJBQ0FMLEtBREEsQ0FDdkNnWixVQUR1QztBQUFBLE1BQzFCOUcsUUFEMEIsc0JBQzFCQSxRQUQwQjtBQUFBLE1BQ2hCa0gsV0FEZ0Isc0JBQ2hCQSxXQURnQjs7QUFFOUMsTUFBSWxILFFBQVEsS0FBS2tILFdBQWpCLEVBQThCO0FBQzVCLFdBQU8saUNBQU9wWixLQUFQLEVBQWM7QUFBQ2daLGdCQUFVLEVBQUU7QUFDaEM5TixjQUFNLEVBQUU7QUFBQzVKLGNBQUksRUFBRTtBQUFQO0FBRHdCO0FBQWIsS0FBZCxDQUFQO0FBR0Q7O0FBQ0QsU0FBTyxpQ0FBT3RCLEtBQVAsRUFBYztBQUFDZ1osY0FBVSxFQUFFO0FBQ2hDOUcsY0FBUSxFQUFFO0FBQUM1USxZQUFJLEVBQUU0USxRQUFRLEdBQUc7QUFBbEI7QUFEc0I7QUFBYixHQUFkLENBQVA7QUFHRDs7QUFFRCxTQUFTMEgscUJBQVQsQ0FBZ0M1WixLQUFoQyxFQUF1QztBQUFBLE1BQzlCTyxRQUQ4QixHQUNFUCxLQURGLENBQzlCTyxRQUQ4QjtBQUFBLE1BQ3BCRyxNQURvQixHQUNFVixLQURGLENBQ3BCVSxNQURvQjtBQUFBLE1BQ1pzWSxVQURZLEdBQ0VoWixLQURGLENBQ1pnWixVQURZOztBQUVyQyxNQUFJLENBQUN6WSxRQUFMLEVBQWU7QUFDYixXQUFPUCxLQUFQO0FBQ0Q7O0FBSm9DLE1BSzlCUSxRQUw4QixHQUtORCxRQUxNLENBSzlCQyxRQUw4QjtBQUFBLE1BS3BCd1EsVUFMb0IsR0FLTnpRLFFBTE0sQ0FLcEJ5USxVQUxvQjtBQUFBLE1BTTlCa0IsUUFOOEIsR0FNbEI4RyxVQU5rQixDQU05QjlHLFFBTjhCO0FBT3JDOztBQUNBLE1BQU1nSCxNQUFNLEdBQUd4WSxNQUFNLENBQUNFLEdBQVAsQ0FBVyxVQUFBSSxLQUFLO0FBQUEsV0FBSSwwQkFBY0EsS0FBZCxFQUFxQmtSLFFBQXJCLENBQUo7QUFBQSxHQUFoQixDQUFmO0FBQ0EsTUFBTTJILElBQUksR0FBR3JaLFFBQVEsQ0FBQ1csT0FBVCxDQUFpQjZQLFVBQVUsQ0FBQ2tCLFFBQUQsQ0FBM0IsQ0FBYjtBQUNBOzs7QUFFQSxNQUFNbUgsWUFBWSxHQUFHUSxJQUFJLEtBQUssQ0FBQyxDQUFWLEdBQWMsSUFBZCxHQUFxQix3QkFBWW5aLE1BQVosRUFBb0J3UixRQUFwQixFQUE4QjJILElBQTlCLEVBQW9DQyxLQUE5RTtBQUNBLFNBQU8saUNBQU85WixLQUFQLEVBQWM7QUFBQ2daLGNBQVUsRUFBRTtBQUNoQ0UsWUFBTSxFQUFFO0FBQUM1WCxZQUFJLEVBQUU0WDtBQUFQLE9BRHdCO0FBQ1JHLGtCQUFZLEVBQUU7QUFBQy9YLFlBQUksRUFBRStYO0FBQVA7QUFETjtBQUFiLEdBQWQsQ0FBUDtBQUdEOztBQUVELFNBQVVOLGNBQVY7QUFBQTs7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQzJCLGlCQUFNLHFCQUFPO0FBQUEsZ0JBQUVqWCxPQUFGLFNBQUVBLE9BQUY7QUFBQSxtQkFBZUEsT0FBZjtBQUFBLFdBQVAsQ0FBTjs7QUFEM0I7QUFBQTtBQUNTaVksd0JBRFQsU0FDU0EsY0FEVDtBQUFBO0FBRWdDLGlCQUFNLHFCQUFPO0FBQUEsZ0JBQUVqWSxPQUFGLFNBQUVBLE9BQUY7QUFBQSxtQkFBZSxDQUFDLHlCQUFELEVBQTRCLHdCQUE1QixFQUFzRCx1QkFBdEQsRUFBK0UsZ0JBQS9FLEVBQWlHbEIsR0FBakcsQ0FBcUcsVUFBQW9aLElBQUk7QUFBQSxxQkFBSWxZLE9BQU8sQ0FBQ2tZLElBQUQsQ0FBWDtBQUFBLGFBQXpHLENBQWY7QUFBQSxXQUFQLENBQU47O0FBRmhDO0FBRVFDLCtCQUZSO0FBQUE7QUFHRSxpQkFBTSx5QkFBV0EscUJBQVg7QUFBQTtBQUFBLG9DQUFrQztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUN6QiwyQkFBTSxxQkFBTztBQUFBLDBCQUFlL08sTUFBZixTQUFFOE4sVUFBRixDQUFlOU4sTUFBZjtBQUFBLDZCQUE0QkEsTUFBNUI7QUFBQSxxQkFBUCxDQUFOOztBQUR5QjtBQUNsQ0EsMEJBRGtDOztBQUFBLDBCQUVsQ0EsTUFBTSxLQUFLLE1BRnVCO0FBQUE7QUFBQTtBQUFBOztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7O0FBQUE7QUFJbEMsMkJBQU0sa0JBQUk7QUFBQzlLLDBCQUFJLEVBQUUyWjtBQUFQLHFCQUFKLENBQU47O0FBSmtDO0FBQUE7QUFLekIsMkJBQU0scUJBQU87QUFBQSwwQkFBZTdPLE1BQWYsU0FBRThOLFVBQUYsQ0FBZTlOLE1BQWY7QUFBQSw2QkFBNEJBLE1BQTVCO0FBQUEscUJBQVAsQ0FBTjs7QUFMeUI7QUFLbENBLDBCQUxrQzs7QUFBQSwwQkFNOUIsV0FBV0EsTUFObUI7QUFBQTtBQUFBO0FBQUE7O0FBQUE7O0FBQUE7QUFBQTtBQVNsQywyQkFBTSxzQkFBTSxJQUFOLENBQU47O0FBVGtDO0FBQUE7QUFBQTs7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxXQUFsQyxFQUFOOztBQUhGO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBOztBQWtCQSxTQUFTZ1AsMEJBQVQsQ0FBcUNsYSxLQUFyQyxFQUE0QztBQUFBLE1BQ25DOEIsT0FEbUMsR0FDb0I5QixLQURwQixDQUNuQzhCLE9BRG1DO0FBQUEsTUFDZnRCLFFBRGUsR0FDb0JSLEtBRHBCLENBQzFCTyxRQUQwQixDQUNmQyxRQURlO0FBQUEsTUFDUzBLLE1BRFQsR0FDb0JsTCxLQURwQixDQUNKZ1osVUFESSxDQUNTOU4sTUFEVDtBQUFBLE1BRW5DaVAsdUJBRm1DLEdBRXVDclksT0FGdkMsQ0FFbkNxWSx1QkFGbUM7QUFBQSxNQUVWQyxzQkFGVSxHQUV1Q3RZLE9BRnZDLENBRVZzWSxzQkFGVTtBQUFBLE1BRWNDLHFCQUZkLEdBRXVDdlksT0FGdkMsQ0FFY3VZLHFCQUZkO0FBRzFDLE1BQU1wQyxZQUFZLEdBQUd6WCxRQUFRLENBQUN1RixNQUE5QjtBQUNBLFNBQU87QUFBQ29VLDJCQUF1QixFQUF2QkEsdUJBQUQ7QUFBMEJDLDBCQUFzQixFQUF0QkEsc0JBQTFCO0FBQWtEQyx5QkFBcUIsRUFBckJBLHFCQUFsRDtBQUF5RW5QLFVBQU0sRUFBTkEsTUFBekU7QUFBaUYrTSxnQkFBWSxFQUFaQTtBQUFqRixHQUFQO0FBQ0Q7O0lBRUtxQyxzQjs7Ozs7Ozs7Ozs7Ozs7Ozs7OElBZW9CLFVBQUNDLE1BQUQsRUFBWTtBQUNsQyxZQUFLNVIsS0FBTCxDQUFXMUYsUUFBWCxDQUFvQjtBQUFDN0MsWUFBSSxFQUFFLE1BQUt1SSxLQUFMLENBQVd3Uix1QkFBbEI7QUFBMkM5WSxlQUFPLEVBQUU7QUFBQzZKLGdCQUFNLEVBQUU7QUFBVDtBQUFwRCxPQUFwQjtBQUNELEs7OElBQ3VCLFVBQUNxUCxNQUFELEVBQVk7QUFDbEMsWUFBSzVSLEtBQUwsQ0FBVzFGLFFBQVgsQ0FBb0I7QUFBQzdDLFlBQUksRUFBRSxNQUFLdUksS0FBTCxDQUFXeVI7QUFBbEIsT0FBcEI7QUFDRCxLO3NJQUNlLFVBQUNHLE1BQUQsRUFBWTtBQUMxQixZQUFLNVIsS0FBTCxDQUFXMUYsUUFBWCxDQUFvQjtBQUFDN0MsWUFBSSxFQUFFLE1BQUt1SSxLQUFMLENBQVd3Uix1QkFBbEI7QUFBMkM5WSxlQUFPLEVBQUU7QUFBQzZKLGdCQUFNLEVBQUU7QUFBVDtBQUFwRCxPQUFwQjtBQUNELEs7NklBQ3NCLFVBQUNxUCxNQUFELEVBQVk7QUFDakMsWUFBSzVSLEtBQUwsQ0FBVzFGLFFBQVgsQ0FBb0I7QUFBQzdDLFlBQUksRUFBRSxNQUFLdUksS0FBTCxDQUFXMFI7QUFBbEIsT0FBcEI7QUFDRCxLOzZJQUNzQixVQUFDRSxNQUFELEVBQVk7QUFDakMsWUFBSzVSLEtBQUwsQ0FBVzFGLFFBQVgsQ0FBb0I7QUFBQzdDLFlBQUksRUFBRSxNQUFLdUksS0FBTCxDQUFXd1IsdUJBQWxCO0FBQTJDOVksZUFBTyxFQUFFO0FBQUM2SixnQkFBTSxFQUFFO0FBQVQ7QUFBcEQsT0FBcEI7QUFDRCxLOzs7Ozs7NkJBNUJTO0FBQUEsd0JBQ3VCLEtBQUt2QyxLQUQ1QjtBQUFBLFVBQ0RzUCxZQURDLGVBQ0RBLFlBREM7QUFBQSxVQUNhL00sTUFEYixlQUNhQSxNQURiO0FBRVIsYUFDRTtBQUFLLGFBQUssRUFBRTtBQUFDZ0csZUFBSyxZQUFLLEtBQUcrRyxZQUFSLE9BQU47QUFBZ0N1QyxnQkFBTSxFQUFFLFFBQXhDO0FBQWtENUIsbUJBQVMsRUFBRTtBQUE3RDtBQUFaLFNBQ0U7QUFBSyxpQkFBUyxFQUFDO0FBQWYsU0FDRSw2QkFBQyxzQkFBRDtBQUFRLGVBQU8sRUFBRSxLQUFLNkIscUJBQXRCO0FBQTZDLGFBQUssRUFBRTtBQUFDdkosZUFBSyxFQUFFO0FBQVIsU0FBcEQ7QUFBcUUsY0FBTSxFQUFFaEcsTUFBTSxLQUFLO0FBQXhGLFNBQWlHO0FBQUcsaUJBQVMsRUFBQztBQUFiLFFBQWpHLENBREYsRUFFRSw2QkFBQyxzQkFBRDtBQUFRLGVBQU8sRUFBRSxLQUFLd1AscUJBQXRCO0FBQTZDLGFBQUssRUFBRTtBQUFDeEosZUFBSyxFQUFFO0FBQVI7QUFBcEQsU0FBcUU7QUFBRyxpQkFBUyxFQUFDO0FBQWIsUUFBckUsQ0FGRixFQUdFLDZCQUFDLHNCQUFEO0FBQVEsZUFBTyxFQUFFLEtBQUt5SixhQUF0QjtBQUFxQyxhQUFLLEVBQUU7QUFBQ3pKLGVBQUssRUFBRTtBQUFSLFNBQTVDO0FBQTZELGNBQU0sRUFBRWhHLE1BQU0sS0FBSztBQUFoRixTQUF3RjtBQUFHLGlCQUFTLEVBQUM7QUFBYixRQUF4RixDQUhGLEVBSUUsNkJBQUMsc0JBQUQ7QUFBUSxlQUFPLEVBQUUsS0FBSzBQLG9CQUF0QjtBQUE0QyxhQUFLLEVBQUU7QUFBQzFKLGVBQUssRUFBRTtBQUFSO0FBQW5ELFNBQW9FO0FBQUcsaUJBQVMsRUFBQztBQUFiLFFBQXBFLENBSkYsRUFLRSw2QkFBQyxzQkFBRDtBQUFRLGVBQU8sRUFBRSxLQUFLMkosb0JBQXRCO0FBQTRDLGFBQUssRUFBRTtBQUFDM0osZUFBSyxFQUFFO0FBQVIsU0FBbkQ7QUFBb0UsY0FBTSxFQUFFaEcsTUFBTSxLQUFLO0FBQXZGLFNBQThGO0FBQUcsaUJBQVMsRUFBQztBQUFiLFFBQTlGLENBTEYsQ0FERixDQURGO0FBV0Q7OztFQWRrQ25DLGVBQU1DLGE7O2VBZ0M1QjtBQUNibEgsU0FBTyxFQUFFO0FBQ1BxWSwyQkFBdUIsRUFBRSwyQkFEbEI7QUFFUEMsMEJBQXNCLEVBQUUseUJBRmpCO0FBR1BDLHlCQUFxQixFQUFFLHdCQUhoQjtBQUlQUyxrQkFBYyxFQUFFLGlCQUpUO0FBS1BmLGtCQUFjLEVBQUU7QUFMVCxHQURJO0FBUWJyYixnQkFBYyxFQUFFO0FBQ2RDLFdBQU8sRUFBRUMsY0FESztBQUVkQyxZQUFRLEVBQUVDLGVBRkk7QUFHZHFiLDJCQUF1QixFQUFFYiw4QkFIWDtBQUlkYywwQkFBc0IsRUFBRVosNkJBSlY7QUFLZGEseUJBQXFCLEVBQUVaLDRCQUxUO0FBTWRxQixrQkFBYyxFQUFFcEIscUJBTkY7QUFPZEssa0JBQWMsRUFBRUo7QUFQRixHQVJIO0FBaUJiOVUsYUFBVyxFQUFFK1UscUJBakJBO0FBa0JidFUsTUFBSSxFQUFFeVQsY0FsQk87QUFtQmJoWCxPQUFLLEVBQUU7QUFDTGdaLHNCQUFrQixFQUFFLHlCQUFRYiwwQkFBUixFQUFvQ0ksc0JBQXBDO0FBRGY7QUFuQk0sQzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQzFKZjs7QUFDQTs7QUFDQTs7QUFDQTs7QUFDQTs7QUFFQTs7QUFFQSxTQUFTMWIsY0FBVCxDQUF5Qm9CLEtBQXpCLEVBQWdDSyxPQUFoQyxFQUF5QztBQUN2Qyx5Q0FBV0wsS0FBWDtBQUFrQlUsVUFBTSxFQUFFLEVBQTFCO0FBQThCc2EsV0FBTyxFQUFFO0FBQXZDO0FBQ0Q7O0FBRUQsU0FBU0MsMkJBQVQsQ0FBc0NqYixLQUF0QyxRQUFnRjtBQUFBLDBCQUFsQ3FCLE9BQWtDO0FBQUEsTUFBeEI2WixVQUF3QixnQkFBeEJBLFVBQXdCO0FBQUEsTUFBWkMsUUFBWSxnQkFBWkEsUUFBWTtBQUFBLE1BQzlEM2EsUUFEOEQsR0FDekNSLEtBRHlDLENBQ3pFTyxRQUR5RSxDQUM5REMsUUFEOEQ7QUFBQSxNQUNuREUsTUFEbUQsR0FDekNWLEtBRHlDLENBQ25EVSxNQURtRDtBQUU5RXdhLFlBQVUsR0FBRyx1QkFBV0EsVUFBWCxFQUF1QnhhLE1BQU0sQ0FBQ3FGLE1BQTlCLENBQWI7QUFDQW9WLFVBQVEsR0FBRyx1QkFBV0EsUUFBWCxFQUFxQjNhLFFBQVEsQ0FBQ3VGLE1BQTlCLENBQVg7QUFDQSxTQUFPLGlDQUFPL0YsS0FBUCxFQUFjO0FBQUNnYixXQUFPLEVBQUU7QUFBQzFaLFVBQUksRUFBRTtBQUFDNFosa0JBQVUsRUFBVkEsVUFBRDtBQUFhQyxnQkFBUSxFQUFSQTtBQUFiO0FBQVA7QUFBVixHQUFkLENBQVA7QUFDRDs7QUFFRCxTQUFTQyx5QkFBVCxDQUFvQ3BiLEtBQXBDLFNBQTZFO0FBQUEsNEJBQWpDcUIsT0FBaUM7QUFBQSxNQUF2QmdhLFNBQXVCLGlCQUF2QkEsU0FBdUI7QUFBQSxNQUFaQyxRQUFZLGlCQUFaQSxRQUFZO0FBQUEsTUFDM0Q5YSxRQUQyRCxHQUNMUixLQURLLENBQ3RFTyxRQURzRSxDQUMzREMsUUFEMkQ7QUFBQSxNQUNoREUsTUFEZ0QsR0FDTFYsS0FESyxDQUNoRFUsTUFEZ0Q7QUFBQSx1QkFDTFYsS0FESyxDQUN4Q2diLE9BRHdDO0FBQUEsTUFDOUJFLFVBRDhCLGtCQUM5QkEsVUFEOEI7QUFBQSxNQUNsQkMsUUFEa0Isa0JBQ2xCQSxRQURrQjtBQUUzRSxNQUFJSSxTQUFTLEdBQUdMLFVBQWhCO0FBQUEsTUFBNEJNLFFBQVEsR0FBR0wsUUFBdkM7QUFDQSxNQUFJRCxVQUFVLEtBQUt4VyxTQUFmLElBQTRCeVcsUUFBUSxLQUFLelcsU0FBN0MsRUFBd0QsT0FBTzFFLEtBQVA7QUFDeEQsTUFBSXVTLElBQUo7O0FBQ0EsS0FBRztBQUNEMkksY0FBVSxHQUFHLHVCQUFXQSxVQUFVLEdBQUdHLFNBQXhCLEVBQW1DM2EsTUFBTSxDQUFDcUYsTUFBMUMsQ0FBYjtBQUNBb1YsWUFBUSxHQUFHLHVCQUFXQSxRQUFRLEdBQUdHLFFBQXRCLEVBQWdDOWEsUUFBUSxDQUFDdUYsTUFBekMsQ0FBWDtBQUNBd00sUUFBSSxHQUFHN1IsTUFBTSxDQUFDd2EsVUFBRCxDQUFOLENBQW1CamEsS0FBbkIsQ0FBeUJrYSxRQUF6QixDQUFQO0FBQ0E7O0FBQ0EsUUFBSUksU0FBUyxJQUFJTCxVQUFiLElBQTJCTSxRQUFRLElBQUlMLFFBQTNDLEVBQXFELE9BQU9uYixLQUFQO0FBQ3RELEdBTkQsUUFNU3VTLElBQUksQ0FBQ2tKLElBQUwsSUFBYWxKLElBQUksQ0FBQ21KLE1BTjNCOztBQU9BLFNBQU8saUNBQU8xYixLQUFQLEVBQWM7QUFBQ2diLFdBQU8sRUFBRTtBQUFDMVosVUFBSSxFQUFFO0FBQUM0WixrQkFBVSxFQUFWQSxVQUFEO0FBQWFDLGdCQUFRLEVBQVJBO0FBQWI7QUFBUDtBQUFWLEdBQWQsQ0FBUDtBQUNEOztBQUVELFNBQVNRLDZCQUFULENBQXdDM2IsS0FBeEMsRUFBK0NLLE9BQS9DLEVBQXdEO0FBQ3RELFNBQU8saUNBQU9MLEtBQVAsRUFBYztBQUFDZ2IsV0FBTyxFQUFFO0FBQUMxWixVQUFJLEVBQUU7QUFBUDtBQUFWLEdBQWQsQ0FBUDtBQUNEOztBQUVELFNBQVNzYSwyQkFBVCxDQUFzQzViLEtBQXRDLFNBQW9GO0FBQUEsNEJBQXRDcUIsT0FBc0M7QUFBQSxNQUE1QjZaLFVBQTRCLGlCQUE1QkEsVUFBNEI7QUFBQSxNQUFoQnJCLElBQWdCLGlCQUFoQkEsSUFBZ0I7QUFBQSxNQUFWL0IsTUFBVSxpQkFBVkEsTUFBVTtBQUFBLE1BQ2xFdFgsUUFEa0UsR0FDN0NSLEtBRDZDLENBQzdFTyxRQUQ2RSxDQUNsRUMsUUFEa0U7QUFBQSxNQUN2REUsTUFEdUQsR0FDN0NWLEtBRDZDLENBQ3ZEVSxNQUR1RDs7QUFFbEYsTUFBSW9YLE1BQU0sQ0FBQy9SLE1BQVAsS0FBa0IsQ0FBbEIsSUFBdUIsQ0FBQyxDQUFELEtBQU92RixRQUFRLENBQUNXLE9BQVQsQ0FBaUIyVyxNQUFqQixDQUFsQyxFQUE0RDtBQUMxREEsVUFBTSxHQUFHLElBQVQ7QUFDRDs7QUFDRCxNQUFNOVcsS0FBSyxHQUFHLDBCQUFjTixNQUFNLENBQUN3YSxVQUFELENBQXBCLEVBQWtDckIsSUFBbEMsRUFBd0MvQixNQUF4QyxDQUFkO0FBQ0EsU0FBTyxpQ0FBTzlYLEtBQVAsRUFBYztBQUFDVSxVQUFNLG9DQUFJd2EsVUFBSixFQUFpQjtBQUFDNVosVUFBSSxFQUFFTjtBQUFQLEtBQWpCO0FBQVAsR0FBZCxDQUFQO0FBQ0Q7O0FBRUQsU0FBUzZhLDJCQUFULENBQXNDN2IsS0FBdEMsU0FBc0Y7QUFBQSw0QkFBeENxQixPQUF3QztBQUFBLE1BQTlCNlosVUFBOEIsaUJBQTlCQSxVQUE4QjtBQUFBLE1BQWxCckIsSUFBa0IsaUJBQWxCQSxJQUFrQjtBQUFBLE1BQVppQyxRQUFZLGlCQUFaQSxRQUFZO0FBQ3BGLE1BQU05YSxLQUFLLEdBQUcsMEJBQWNoQixLQUFLLENBQUNVLE1BQU4sQ0FBYXdhLFVBQWIsQ0FBZCxFQUF3Q3JCLElBQXhDLEVBQThDaUMsUUFBOUMsQ0FBZDtBQUNBLFNBQU8saUNBQU85YixLQUFQLEVBQWM7QUFBQ1UsVUFBTSxvQ0FBSXdhLFVBQUosRUFBaUI7QUFBQzVaLFVBQUksRUFBRU47QUFBUCxLQUFqQjtBQUFQLEdBQWQsQ0FBUDtBQUNEOztBQUVELFNBQVMrYSxxQkFBVCxDQUFnQy9iLEtBQWhDLFNBQXFFO0FBQUEsNEJBQTdCcUIsT0FBNkI7QUFBQSxNQUFuQjZaLFVBQW1CLGlCQUFuQkEsVUFBbUI7QUFBQSxNQUFQbFcsR0FBTyxpQkFBUEEsR0FBTztBQUFBLE1BQ2pEeEUsUUFEaUQsR0FDNUJSLEtBRDRCLENBQzVETyxRQUQ0RCxDQUNqREMsUUFEaUQ7QUFBQSxNQUN0Q0UsTUFEc0MsR0FDNUJWLEtBRDRCLENBQ3RDVSxNQURzQztBQUVuRSxNQUFNTSxLQUFLLEdBQUcsK0JBQW1CUixRQUFuQixFQUE2QkUsTUFBTSxDQUFDd2EsVUFBRCxDQUFuQyxFQUFpRGxXLEdBQWpELENBQWQ7QUFDQSxTQUFPLGlDQUFPaEYsS0FBUCxFQUFjO0FBQUNVLFVBQU0sb0NBQUl3YSxVQUFKLEVBQWlCO0FBQUM1WixVQUFJLEVBQUVOO0FBQVAsS0FBakI7QUFBUCxHQUFkLENBQVA7QUFDRDs7QUFFRCxTQUFTZ2IsYUFBVCxDQUF3QmhjLEtBQXhCLFNBQXdDO0FBQUEsTUFBUm9TLEtBQVEsU0FBUkEsS0FBUTtBQUFBLHVCQU9sQ3BTLEtBUGtDLENBRXBDOEIsT0FGb0M7QUFBQSxNQUdsQ21hLG9CQUhrQyxrQkFHbENBLG9CQUhrQztBQUFBLE1BR1pDLG9CQUhZLGtCQUdaQSxvQkFIWTtBQUFBLE1BSWxDQyxzQkFKa0Msa0JBSWxDQSxzQkFKa0M7QUFBQSxNQUlWQyxvQkFKVSxrQkFJVkEsb0JBSlU7QUFBQSxNQUlZQyxrQkFKWixrQkFJWUEsa0JBSlo7QUFBQSxNQU1wQzNiLE1BTm9DLEdBT2xDVixLQVBrQyxDQU1wQ1UsTUFOb0M7QUFBQSwwQkFPbENWLEtBUGtDLENBTTVCZ1osVUFONEI7QUFBQSxNQU1mRSxNQU5lLHFCQU1mQSxNQU5lO0FBQUEsTUFNUEcsWUFOTyxxQkFNUEEsWUFOTztBQUFBLE1BTVEyQixPQU5SLEdBT2xDaGIsS0FQa0MsQ0FNUWdiLE9BTlI7QUFBQSxzQkFRVHRhLE1BQU0sQ0FBQzBSLEtBQUQsQ0FSRztBQUFBLE1BUS9Ca0ssV0FSK0IsaUJBUS9CQSxXQVIrQjtBQUFBLE1BUWxCcmIsS0FSa0IsaUJBUWxCQSxLQVJrQjtBQVN0QyxNQUFNc2IsS0FBSyxHQUFHckQsTUFBTSxDQUFDOUcsS0FBRCxDQUFwQjtBQUNBLE1BQU1vSyxVQUFVLEdBQUduRCxZQUFZLENBQUNqSCxLQUFELENBQVosSUFBdUJpSCxZQUFZLENBQUNqSCxLQUFELENBQVosQ0FBb0J5SCxJQUE5RDtBQUNBLE1BQU00QyxXQUFXLEdBQUd6QixPQUFPLENBQUNFLFVBQVIsS0FBdUI5SSxLQUF2QixHQUErQjRJLE9BQU8sQ0FBQ0csUUFBdkMsR0FBa0QsSUFBdEU7QUFDQSxTQUFPO0FBQ0xpQix3QkFBb0IsRUFBcEJBLG9CQURLO0FBQ2lCRCwwQkFBc0IsRUFBdEJBLHNCQURqQjtBQUN5Q0Usc0JBQWtCLEVBQWxCQSxrQkFEekM7QUFFTEosd0JBQW9CLEVBQXBCQSxvQkFGSztBQUVpQkMsd0JBQW9CLEVBQXBCQSxvQkFGakI7QUFHTEksZUFBVyxFQUFYQSxXQUhLO0FBR1FyYixTQUFLLEVBQUxBLEtBSFI7QUFHZXNiLFNBQUssRUFBTEEsS0FIZjtBQUdzQkUsZUFBVyxFQUFYQSxXQUh0QjtBQUdtQ0QsY0FBVSxFQUFWQTtBQUhuQyxHQUFQO0FBS0Q7O0lBRUtFLFM7Ozs7Ozs7Ozs7Ozs7Ozs7O3lJQXlCZSxVQUFDN0MsSUFBRCxFQUFVO0FBQzNCLFlBQUtsUixLQUFMLENBQVcxRixRQUFYLENBQW9CO0FBQUM3QyxZQUFJLEVBQUUsTUFBS3VJLEtBQUwsQ0FBV3lULG9CQUFsQjtBQUF3Qy9hLGVBQU8sRUFBRTtBQUFDNlosb0JBQVUsRUFBRSxNQUFLdlMsS0FBTCxDQUFXeUosS0FBeEI7QUFBK0IrSSxrQkFBUSxFQUFFdEI7QUFBekM7QUFBakQsT0FBcEI7QUFDRCxLOzJJQUNvQixZQUFNO0FBQ3pCLFlBQUtsUixLQUFMLENBQVcxRixRQUFYLENBQW9CO0FBQUM3QyxZQUFJLEVBQUUsTUFBS3VJLEtBQUwsQ0FBV3dUO0FBQWxCLE9BQXBCO0FBQ0QsSztxSUFDYyxVQUFDdEMsSUFBRCxFQUFPL0IsTUFBUCxFQUFrQjtBQUMvQkEsWUFBTSxHQUFHQSxNQUFNLENBQUM2RSxXQUFQLEVBQVQ7O0FBQ0EsWUFBS2hVLEtBQUwsQ0FBVzFGLFFBQVgsQ0FBb0I7QUFBQzdDLFlBQUksRUFBRSxNQUFLdUksS0FBTCxDQUFXdVQsb0JBQWxCO0FBQXdDN2EsZUFBTyxFQUFFO0FBQUM2WixvQkFBVSxFQUFFLE1BQUt2UyxLQUFMLENBQVd5SixLQUF4QjtBQUErQnlILGNBQUksRUFBSkEsSUFBL0I7QUFBcUMvQixnQkFBTSxFQUFOQTtBQUFyQztBQUFqRCxPQUFwQjtBQUNELEs7dUlBQ2dCLFVBQUMrQixJQUFELEVBQU9pQyxRQUFQLEVBQW9CO0FBQ25DLFlBQUtuVCxLQUFMLENBQVcxRixRQUFYLENBQW9CO0FBQUM3QyxZQUFJLEVBQUUsTUFBS3VJLEtBQUwsQ0FBV3NULG9CQUFsQjtBQUF3QzVhLGVBQU8sRUFBRTtBQUFDNlosb0JBQVUsRUFBRSxNQUFLdlMsS0FBTCxDQUFXeUosS0FBeEI7QUFBK0J5SCxjQUFJLEVBQUpBLElBQS9CO0FBQXFDaUMsa0JBQVEsRUFBUkE7QUFBckM7QUFBakQsT0FBcEI7QUFDRCxLO3FJQUNjLFVBQUNULFNBQUQsRUFBWUMsUUFBWixFQUF5QjtBQUN0QyxZQUFLM1MsS0FBTCxDQUFXMUYsUUFBWCxDQUFvQjtBQUFDN0MsWUFBSSxFQUFFLE1BQUt1SSxLQUFMLENBQVcwVCxrQkFBbEI7QUFBc0NoYixlQUFPLEVBQUU7QUFBQ2dhLG1CQUFTLEVBQVRBLFNBQUQ7QUFBWUMsa0JBQVEsRUFBUkE7QUFBWjtBQUEvQyxPQUFwQjtBQUNELEs7Ozs7Ozs2QkF2Q1M7QUFBQTs7QUFBQSx3QkFDNEQsS0FBSzNTLEtBRGpFO0FBQUEsVUFDRHlKLEtBREMsZUFDREEsS0FEQztBQUFBLFVBQ01rSyxXQUROLGVBQ01BLFdBRE47QUFBQSxVQUNtQnJiLEtBRG5CLGVBQ21CQSxLQURuQjtBQUFBLFVBQzBCc2IsS0FEMUIsZUFDMEJBLEtBRDFCO0FBQUEsVUFDaUNFLFdBRGpDLGVBQ2lDQSxXQURqQztBQUFBLFVBQzhDRCxVQUQ5QyxlQUM4Q0EsVUFEOUM7QUFFUixVQUFNekwsT0FBTyxHQUFHOVAsS0FBSyxDQUFDOEUsTUFBdEI7QUFDQSxhQUNFO0FBQUssYUFBSyxFQUFFO0FBQUNtTCxlQUFLLFlBQUssS0FBR0gsT0FBUjtBQUFOO0FBQVosU0FDRTtBQUFLLGlCQUFTLEVBQUM7QUFBZixTQUNHLGtCQUFNLENBQU4sRUFBU0EsT0FBVCxFQUFrQm5RLEdBQWxCLENBQXNCLFVBQUFpWixJQUFJLEVBQUk7QUFBQSwwQkFDYzVZLEtBQUssQ0FBQzRZLElBQUQsQ0FEbkI7QUFBQSxZQUN0QjNZLFFBRHNCLGVBQ3RCQSxRQURzQjtBQUFBLFlBQ1p3YSxNQURZLGVBQ1pBLE1BRFk7QUFBQSxZQUNKa0IsUUFESSxlQUNKQSxRQURJO0FBQUEsWUFDTW5CLElBRE4sZUFDTUEsSUFETjtBQUU3QixZQUFNb0IsUUFBUSxHQUFHTCxVQUFVLEtBQUszQyxJQUFoQztBQUNBLFlBQU1pRCxTQUFTLEdBQUdMLFdBQVcsS0FBSzVDLElBQWhCLElBQXdCLENBQUM2QixNQUF6QixJQUFtQyxDQUFDRCxJQUF0RDtBQUNBLFlBQU1zQixNQUFNLEdBQUdoTSxPQUFPLEtBQUs4SSxJQUFJLEdBQUcsQ0FBbEM7QUFDQSxZQUFNbUQsWUFBWSxHQUFHLENBQUNuRCxJQUFJLEdBQUcwQyxLQUFSLElBQWlCeEwsT0FBdEM7QUFMNkIsWUFNdEJrTSxRQU5zQixHQU1WaGMsS0FBSyxDQUFDK2IsWUFBRCxDQU5LLENBTXRCQyxRQU5zQjtBQU83QixlQUNFLDZCQUFDLFNBQUQ7QUFBVyxhQUFHLEVBQUVwRCxJQUFoQjtBQUFzQixjQUFJLEVBQUVBLElBQTVCO0FBQWtDLGdCQUFNLEVBQUVrRCxNQUExQztBQUFrRCxxQkFBVyxFQUFFVCxXQUEvRDtBQUNFLG9CQUFVLEVBQUVXLFFBRGQ7QUFDd0Isc0JBQVksRUFBRS9iLFFBRHRDO0FBQ2dELGtCQUFRLEVBQUV3YSxNQUQxRDtBQUNrRSxnQkFBTSxFQUFFRCxJQUQxRTtBQUNnRixtQkFBUyxFQUFFcUIsU0FEM0Y7QUFDc0csa0JBQVEsRUFBRUQsUUFEaEg7QUFFRSxzQkFBWSxFQUFFLE1BQUksQ0FBQ0ssWUFGckI7QUFFbUMsd0JBQWMsRUFBRSxNQUFJLENBQUNDLGNBRnhEO0FBR0UsMEJBQWdCLEVBQUUsTUFBSSxDQUFDQyxnQkFIekI7QUFHMkMsNEJBQWtCLEVBQUUsTUFBSSxDQUFDQyxrQkFIcEU7QUFJRSx3QkFBYyxFQUFFLE1BQUksQ0FBQ0MsWUFKdkI7QUFJcUMsb0JBQVUsRUFBRVY7QUFKakQsVUFERjtBQU1ELE9BYkEsQ0FESCxDQURGLENBREY7QUFvQkQ7OztFQXhCcUI3VCxlQUFNQyxhOztJQTJDeEJ1VSxTOzs7Ozs7Ozs7Ozs7Ozs7OztzSUFvRVcsWUFBTTtBQUNuQixVQUFJLENBQUMsT0FBSzVVLEtBQUwsQ0FBV21ULFFBQVosSUFBd0IsQ0FBQyxPQUFLblQsS0FBTCxDQUFXbVUsU0FBeEMsRUFBbUQ7QUFDakQsZUFBS25VLEtBQUwsQ0FBV3lVLGdCQUFYLENBQTRCLE9BQUt6VSxLQUFMLENBQVdrUixJQUF2QztBQUNEO0FBQ0YsSztpSUFDUyxVQUFDN0YsS0FBRCxFQUFXO0FBQ25CLFVBQUl3SixPQUFPLEdBQUcsSUFBZDs7QUFDQSxVQUFJeEosS0FBSyxDQUFDaFAsR0FBTixLQUFjLFlBQWxCLEVBQWdDO0FBQzlCLGVBQUsyRCxLQUFMLENBQVc4VSxjQUFYLENBQTBCLENBQTFCLEVBQTZCLENBQTdCO0FBQ0QsT0FGRCxNQUVPLElBQUl6SixLQUFLLENBQUNoUCxHQUFOLEtBQWMsV0FBbEIsRUFBK0I7QUFDcEMsZUFBSzJELEtBQUwsQ0FBVzhVLGNBQVgsQ0FBMEIsQ0FBMUIsRUFBNkIsQ0FBQyxDQUE5QjtBQUNELE9BRk0sTUFFQSxJQUFJekosS0FBSyxDQUFDaFAsR0FBTixLQUFjLFNBQWxCLEVBQTZCO0FBQ2xDLGVBQUsyRCxLQUFMLENBQVc4VSxjQUFYLENBQTBCLENBQUMsQ0FBM0IsRUFBOEIsQ0FBOUI7QUFDRCxPQUZNLE1BRUEsSUFBSXpKLEtBQUssQ0FBQ2hQLEdBQU4sS0FBYyxXQUFsQixFQUErQjtBQUNwQyxlQUFLMkQsS0FBTCxDQUFXOFUsY0FBWCxDQUEwQixDQUExQixFQUE2QixDQUE3QjtBQUNELE9BRk0sTUFFQSxJQUFJekosS0FBSyxDQUFDaFAsR0FBTixLQUFjLFFBQWQsSUFBMEJnUCxLQUFLLENBQUNoUCxHQUFOLEtBQWMsT0FBNUMsRUFBcUQ7QUFDMUQsZUFBSzJELEtBQUwsQ0FBVzBVLGtCQUFYO0FBQ0QsT0FGTSxNQUVBO0FBQ0xHLGVBQU8sR0FBRyxLQUFWO0FBQ0Q7O0FBQ0QsVUFBSUEsT0FBSixFQUFhO0FBQ1h4SixhQUFLLENBQUMwSixjQUFOO0FBQ0ExSixhQUFLLENBQUMySixlQUFOO0FBQ0Q7QUFDRixLO3FJQUNhLFlBQU07QUFDbEIsVUFBTXhKLEtBQUssR0FBRyxPQUFLeUosTUFBTCxDQUFZekosS0FBWixDQUFrQjBKLE1BQWxCLENBQXlCLENBQUMsQ0FBMUIsQ0FBZDtBQUE0Qzs7O0FBQzVDLGFBQUtsVixLQUFMLENBQVd1VSxZQUFYLENBQXdCLE9BQUt2VSxLQUFMLENBQVdrUixJQUFuQyxFQUF5QzFGLEtBQXpDO0FBQ0QsSztxSUFDYSxZQUFNO0FBQ2xCLGFBQUt4TCxLQUFMLENBQVd3VSxjQUFYLENBQTBCLE9BQUt4VSxLQUFMLENBQVdrUixJQUFyQyxFQUEyQyxDQUFDLE9BQUtsUixLQUFMLENBQVdtVCxRQUF2RDtBQUNELEs7a0lBQ1UsVUFBQ2pLLE9BQUQsRUFBYTtBQUN0QixhQUFLK0wsTUFBTCxHQUFjL0wsT0FBZDtBQUNELEs7Ozs7Ozs7QUFyR0Q7OzZCQUVVO0FBQUEseUJBQ21HLEtBQUtsSixLQUR4RztBQUFBLFVBQ0RtVixVQURDLGdCQUNEQSxVQURDO0FBQUEsVUFDV0MsWUFEWCxnQkFDV0EsWUFEWDtBQUFBLFVBQ3lCakMsUUFEekIsZ0JBQ3lCQSxRQUR6QjtBQUFBLFVBQ21Da0MsTUFEbkMsZ0JBQ21DQSxNQURuQztBQUFBLFVBQzJDbkIsUUFEM0MsZ0JBQzJDQSxRQUQzQztBQUFBLFVBQ3FEQyxTQURyRCxnQkFDcURBLFNBRHJEO0FBQUEsVUFDZ0VSLFdBRGhFLGdCQUNnRUEsV0FEaEU7QUFBQSxVQUM2RVMsTUFEN0UsZ0JBQzZFQSxNQUQ3RTtBQUFBLFVBQ3FGa0IsVUFEckYsZ0JBQ3FGQSxVQURyRjtBQUVSLFVBQU1DLFdBQVcsR0FBRztBQUNsQi9GLGFBQUssRUFBRSxNQURXO0FBRWxCakgsYUFBSyxFQUFFO0FBRlcsT0FBcEI7QUFJQSxVQUFNaU4sZUFBZSxHQUFHO0FBQ3RCeEYsY0FBTSxFQUFFLGlCQURjO0FBRXRCeUYsd0JBQWdCLEVBQUVyQixNQUFNLEdBQUcsS0FBSCxHQUFXLEdBRmI7QUFHdEJuRSxpQkFBUyxFQUFFO0FBSFcsT0FBeEI7QUFLQSxVQUFNeUYsaUJBQWlCLEdBQUc7QUFDeEIxRixjQUFNLEVBQUUsaUJBRGdCO0FBRXhCeUYsd0JBQWdCLEVBQUVyQixNQUFNLEdBQUcsS0FBSCxHQUFXLEdBRlg7QUFHeEJuRSxpQkFBUyxFQUFFLFFBSGE7QUFJeEIwRixjQUFNLEVBQUUsTUFKZ0I7QUFLeEJDLHVCQUFlLEVBQUVQLE1BQU0sR0FBRyxNQUFILEdBQWFDLFVBQVUsR0FBRyxNQUFILEdBQVk7QUFMbEMsT0FBMUI7QUFPQTs7QUFDQSxVQUFNTyxlQUFlLEdBQUdsQyxXQUFXLEtBQUssS0FBaEIsR0FBd0I2QixlQUF4QixHQUEwQ0UsaUJBQWxFOztBQUNBLFVBQUl4QixRQUFKLEVBQWM7QUFDWjJCLHVCQUFlLENBQUNDLFNBQWhCLEdBQTRCLEdBQTVCO0FBQ0FELHVCQUFlLENBQUNFLGNBQWhCLEdBQWlDLEtBQWpDO0FBQ0QsT0FIRCxNQUdPO0FBQ0xGLHVCQUFlLENBQUNDLFNBQWhCLEdBQTRCLEtBQTVCO0FBQ0FELHVCQUFlLENBQUNFLGNBQWhCLEdBQWlDLEtBQWpDO0FBQXdDO0FBQ3pDOztBQUNELFVBQU1DLFVBQVUsR0FDZDtBQUFLLGFBQUssRUFBRVI7QUFBWixTQUNHTCxVQUFVLElBQUksTUFEakIsQ0FERjs7QUFLQSxVQUFNYyxZQUFZLEdBQ2hCO0FBQUssYUFBSyxFQUFFUCxpQkFBWjtBQUErQixlQUFPLEVBQUUsS0FBS1E7QUFBN0MsU0FDRy9CLFNBQVMsR0FDTjtBQUFPLFdBQUcsRUFBRSxLQUFLZ0MsUUFBakI7QUFBMkIsZ0JBQVEsRUFBRSxLQUFLQyxXQUExQztBQUF1RCxpQkFBUyxFQUFFLEtBQUtDLE9BQXZFO0FBQ0UsWUFBSSxFQUFDLE1BRFA7QUFDYyxhQUFLLEVBQUVqQixZQUFZLElBQUUsRUFEbkM7QUFDdUMsYUFBSyxFQUFFO0FBQUM3TSxlQUFLLEVBQUUsTUFBUjtBQUFnQmQsZ0JBQU0sRUFBRSxNQUF4QjtBQUFnQ3VJLGdCQUFNLEVBQUUsTUFBeEM7QUFBZ0RDLG1CQUFTLEVBQUU7QUFBM0Q7QUFEOUMsUUFETSxHQUdMbUYsWUFBWSxJQUFJLE1BSnZCLENBREY7O0FBUUEsVUFBTWtCLElBQUksR0FDUjtBQUFLLGFBQUssRUFBRTtBQUFDUixtQkFBUyxFQUFFLEtBQVo7QUFBbUI3RixtQkFBUyxFQUFFLFFBQTlCO0FBQXdDMEYsZ0JBQU0sRUFBRTtBQUFoRCxTQUFaO0FBQXdFLGVBQU8sRUFBRSxLQUFLWTtBQUF0RixTQUNHbEIsTUFBTSxJQUFJO0FBQUcsaUJBQVMsRUFBRSx5QkFBVyxDQUFDLElBQUQsRUFBT2xDLFFBQVEsR0FBRyxTQUFILEdBQWUsZUFBOUIsQ0FBWDtBQUFkLFFBRGIsQ0FERjs7QUFLQSxVQUFJUSxXQUFXLEtBQUssS0FBcEIsRUFBMkI7QUFDekIsZUFDRTtBQUFLLGVBQUssRUFBRTRCO0FBQVosV0FDR1UsWUFESCxFQUNpQkQsVUFEakIsRUFDNkJNLElBRDdCLENBREY7QUFLRCxPQU5ELE1BTU87QUFDTCxlQUNFO0FBQUssZUFBSyxFQUFFZjtBQUFaLFdBQ0dTLFVBREgsRUFDZUMsWUFEZixFQUM2QkssSUFEN0IsQ0FERjtBQUtEO0FBQ0Y7Ozt5Q0FDcUI7QUFDcEIsVUFBSSxLQUFLckIsTUFBVCxFQUFpQjtBQUNmLGFBQUtBLE1BQUwsQ0FBWXVCLE1BQVo7O0FBQ0EsYUFBS3ZCLE1BQUwsQ0FBWXdCLEtBQVo7QUFDRDtBQUNGOzs7RUFuRXFCclcsZUFBTUMsYTs7ZUF5R2Y7QUFDYmxILFNBQU8sRUFBRTtBQUNQc2Esd0JBQW9CLEVBQUUseUJBRGY7QUFFUEMsc0JBQWtCLEVBQUUsdUJBRmI7QUFHUEYsMEJBQXNCLEVBQUUsMkJBSGpCO0FBSVBGLHdCQUFvQixFQUFFLHlCQUpmO0FBS1BDLHdCQUFvQixFQUFFLHlCQUxmO0FBTVBtRCxrQkFBYyxFQUFFO0FBTlQsR0FESTtBQVNiM2dCLGdCQUFjLEVBQUU7QUFDZEMsV0FBTyxFQUFFQyxjQURLO0FBRWR3ZCx3QkFBb0IsRUFBRW5CLDJCQUZSO0FBR2RvQixzQkFBa0IsRUFBRWpCLHlCQUhOO0FBSWRlLDBCQUFzQixFQUFFUiw2QkFKVjtBQUtkTSx3QkFBb0IsRUFBRUosMkJBTFI7QUFNZEssd0JBQW9CLEVBQUVOLDJCQU5SO0FBT2R5RCxrQkFBYyxFQUFFdEQ7QUFQRixHQVRIO0FBa0JiaGEsT0FBSyxFQUFFO0FBQ0x1ZCxTQUFLLEVBQUUseUJBQVF0RCxhQUFSLEVBQXVCVSxTQUF2QjtBQURGO0FBbEJNLEM7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUMxTmY7O0FBQ0E7O0FBRUE7O0FBWEE7Ozs7OztBQWFBLFNBQVM5ZCxjQUFULENBQXlCb0IsS0FBekIsRUFBZ0NLLE9BQWhDLEVBQXlDO0FBQ3ZDLHlDQUFXTCxLQUFYO0FBQWtCdWYsa0JBQWMsRUFBRTtBQUNoQzNPLGVBQVMsRUFBRSxFQURxQjtBQUVoQ0MsZ0JBQVUsRUFBRSxFQUZvQjtBQUdoQ0MsZUFBUyxFQUFFLENBSHFCO0FBSWhDQyxhQUFPLEVBQUU7QUFKdUI7QUFBbEM7QUFNRDs7QUFFRCxTQUFTalMsZUFBVCxDQUEwQmtCLEtBQTFCLEVBQWlDSyxPQUFqQyxFQUEwQztBQUFBLE1BQ25Da2YsY0FEbUMsR0FDT3ZmLEtBRFAsQ0FDbkN1ZixjQURtQztBQUFBLE1BQ1J2TyxVQURRLEdBQ09oUixLQURQLENBQ25CTyxRQURtQixDQUNSeVEsVUFEUTtBQUV4Q3VPLGdCQUFjLG1DQUFPQSxjQUFQO0FBQXVCeE8sV0FBTyxFQUFFQyxVQUFVLENBQUNqTDtBQUEzQyxJQUFkO0FBQ0EseUNBQVcvRixLQUFYO0FBQWtCdWYsa0JBQWMsRUFBZEE7QUFBbEI7QUFDRDs7QUFFRCxTQUFTQyw0QkFBVCxDQUF1Q3hmLEtBQXZDLFFBQWtFO0FBQUEsTUFBVGtSLEtBQVMsUUFBbkI3UCxPQUFtQixDQUFUNlAsS0FBUztBQUFBLE1BQzNEcU8sY0FEMkQsR0FDekN2ZixLQUR5QyxDQUMzRHVmLGNBRDJEO0FBRWhFQSxnQkFBYyxtQ0FBT0EsY0FBUDtBQUF1QnJPLFNBQUssRUFBTEEsS0FBdkI7QUFBOEJkLFVBQU0sRUFBRSxJQUFJbVAsY0FBYyxDQUFDMU87QUFBekQsSUFBZDtBQUNBME8sZ0JBQWMsR0FBRywrQkFBbUJBLGNBQW5CLENBQWpCO0FBQ0EseUNBQVd2ZixLQUFYO0FBQWtCdWYsa0JBQWMsRUFBZEE7QUFBbEI7QUFDRDs7QUFFRCxTQUFTRSw2QkFBVCxDQUF3Q3pmLEtBQXhDLFNBQXVFO0FBQUEsTUFBYjhRLFNBQWEsU0FBdkJ6UCxPQUF1QixDQUFieVAsU0FBYTtBQUFBLE1BQ2hFeU8sY0FEZ0UsR0FDOUN2ZixLQUQ4QyxDQUNoRXVmLGNBRGdFO0FBRXJFQSxnQkFBYyxtQ0FBT0EsY0FBUDtBQUF1QnpPLGFBQVMsRUFBVEE7QUFBdkIsSUFBZDtBQUNBLHlDQUFXOVEsS0FBWDtBQUFrQnVmLGtCQUFjLEVBQWRBO0FBQWxCO0FBQ0Q7O0FBRUQsU0FBU0cseUJBQVQsQ0FBb0MxZixLQUFwQyxFQUEyQ0ssT0FBM0MsRUFBb0Q7QUFDbEQsTUFBSSxDQUFDTCxLQUFLLENBQUNPLFFBQVgsRUFBcUIsT0FBT1AsS0FBUDtBQUQ2Qix3QkFFdUNBLEtBRnZDLENBRTdDTyxRQUY2QztBQUFBLE1BRWxDQyxRQUZrQyxtQkFFbENBLFFBRmtDO0FBQUEsTUFFeEJ3USxVQUZ3QixtQkFFeEJBLFVBRndCO0FBQUEsTUFFRWtCLFFBRkYsR0FFdUNsUyxLQUZ2QyxDQUVYZ1osVUFGVyxDQUVFOUcsUUFGRjtBQUFBLE1BRWF4UixNQUZiLEdBRXVDVixLQUZ2QyxDQUVhVSxNQUZiO0FBQUEsTUFFcUI2ZSxjQUZyQixHQUV1Q3ZmLEtBRnZDLENBRXFCdWYsY0FGckI7O0FBR2xELFdBQVNJLE9BQVQsQ0FBa0J2TixLQUFsQixFQUF5QjtBQUN2QixRQUFNd04sUUFBUSxHQUFHNU8sVUFBVSxDQUFDb0IsS0FBRCxDQUEzQjtBQUNBLFFBQU1HLElBQUksR0FBRztBQUFDTCxjQUFRLEVBQUVFLEtBQVg7QUFBa0J5TixhQUFPLEVBQUV6TixLQUFLLEtBQUtGLFFBQXJDO0FBQStDME4sY0FBUSxFQUFSQTtBQUEvQyxLQUFiO0FBQ0EsUUFBSS9GLElBQUksR0FBR3JaLFFBQVEsQ0FBQ1csT0FBVCxDQUFpQnllLFFBQWpCLENBQVg7O0FBQ0EsUUFBSS9GLElBQUksS0FBSyxDQUFDLENBQWQsRUFBaUI7QUFDZnRILFVBQUksQ0FBQ3VOLEtBQUwsR0FBYUYsUUFBYjtBQUNELEtBRkQsTUFFTyxJQUFJeE4sS0FBSyxJQUFJRixRQUFiLEVBQXVCO0FBQzVCM04sWUFBTSxDQUFDQyxNQUFQLENBQWMrTixJQUFkLEVBQW9CLHdCQUFZN1IsTUFBWixFQUFvQjBSLEtBQXBCLEVBQTJCeUgsSUFBM0IsQ0FBcEI7O0FBQ0EsVUFBSXRILElBQUksQ0FBQ3NILElBQUwsS0FBYyxDQUFDLENBQW5CLEVBQXNCO0FBQ3BCdEgsWUFBSSxDQUFDdU4sS0FBTCxHQUFhdGYsUUFBUSxDQUFDK1IsSUFBSSxDQUFDc0gsSUFBTixDQUFyQjtBQUNEO0FBQ0Y7O0FBQ0QsV0FBT3RILElBQVA7QUFDRDs7QUFDRGdOLGdCQUFjLEdBQUcsa0NBQXNCQSxjQUF0QixFQUFzQztBQUFDSSxXQUFPLEVBQVBBO0FBQUQsR0FBdEMsQ0FBakI7QUFDQSx5Q0FBVzNmLEtBQVg7QUFBa0J1ZixrQkFBYyxFQUFkQTtBQUFsQjtBQUNEOztBQUVELFNBQVNRLDBCQUFULENBQXFDL2YsS0FBckMsRUFBNEM7QUFBQSxNQUNuQzhCLE9BRG1DLEdBQ1I5QixLQURRLENBQ25DOEIsT0FEbUM7QUFBQSxNQUMxQnlkLGNBRDBCLEdBQ1J2ZixLQURRLENBQzFCdWYsY0FEMEI7QUFBQSxNQUVuQ1MscUJBRm1DLEdBRThCbGUsT0FGOUIsQ0FFbkNrZSxxQkFGbUM7QUFBQSxNQUVaQyxzQkFGWSxHQUU4Qm5lLE9BRjlCLENBRVptZSxzQkFGWTtBQUFBLE1BRVluRixjQUZaLEdBRThCaFosT0FGOUIsQ0FFWWdaLGNBRlo7QUFBQSxNQUduQzVKLEtBSG1DLEdBRzZDcU8sY0FIN0MsQ0FHbkNyTyxLQUhtQztBQUFBLE1BRzVCZCxNQUg0QixHQUc2Q21QLGNBSDdDLENBRzVCblAsTUFINEI7QUFBQSxNQUdwQlEsU0FIb0IsR0FHNkMyTyxjQUg3QyxDQUdwQjNPLFNBSG9CO0FBQUEsTUFHVEMsVUFIUyxHQUc2QzBPLGNBSDdDLENBR1QxTyxVQUhTO0FBQUEsTUFHR1UsTUFISCxHQUc2Q2dPLGNBSDdDLENBR0doTyxNQUhIO0FBQUEsTUFHV0MsUUFIWCxHQUc2QytOLGNBSDdDLENBR1cvTixRQUhYO0FBQUEsTUFHcUJDLFdBSHJCLEdBRzZDOE4sY0FIN0MsQ0FHcUI5TixXQUhyQjtBQUFBLE1BR2tDNUIsT0FIbEMsR0FHNkMwUCxjQUg3QyxDQUdrQzFQLE9BSGxDO0FBSTFDLFNBQU87QUFDTG1RLHlCQUFxQixFQUFyQkEscUJBREs7QUFDa0JDLDBCQUFzQixFQUF0QkEsc0JBRGxCO0FBQzBDbkYsa0JBQWMsRUFBZEEsY0FEMUM7QUFFTDVKLFNBQUssRUFBTEEsS0FGSztBQUVFZCxVQUFNLEVBQU5BLE1BRkY7QUFFVXNCLGVBQVcsRUFBRTdCLE9BQU8sQ0FBQzhCLElBRi9CO0FBRXFDZixhQUFTLEVBQVRBLFNBRnJDO0FBRWdEQyxjQUFVLEVBQVZBLFVBRmhEO0FBRTREVSxVQUFNLEVBQU5BLE1BRjVEO0FBRW9FQyxZQUFRLEVBQVJBLFFBRnBFO0FBRThFQyxlQUFXLEVBQVhBO0FBRjlFLEdBQVA7QUFJRDs7SUFFS3lPLGtCOzs7Ozs7Ozs7Ozs7Ozs7OzttSUFnQlMsVUFBQ3JPLE9BQUQsRUFBYTtBQUN4QixZQUFLQyxRQUFMLEdBQWdCRCxPQUFoQjtBQUNBLFVBQU1YLEtBQUssR0FBR1csT0FBTyxDQUFDRSxXQUF0QjtBQUNBLFVBQU0zQixNQUFNLEdBQUd5QixPQUFPLENBQUN4QixZQUF2Qjs7QUFDQSxZQUFLMUgsS0FBTCxDQUFXMUYsUUFBWCxDQUFvQjtBQUFDN0MsWUFBSSxFQUFFLE1BQUt1SSxLQUFMLENBQVdxWCxxQkFBbEI7QUFBeUMzZSxlQUFPLEVBQUU7QUFBQzZQLGVBQUssRUFBTEEsS0FBRDtBQUFRZCxnQkFBTSxFQUFOQTtBQUFSO0FBQWxELE9BQXBCO0FBQ0QsSztpSUFFVSxZQUFNO0FBQ2YsVUFBTVUsU0FBUyxHQUFHLE1BQUtnQixRQUFMLENBQWNoQixTQUFoQzs7QUFDQSxZQUFLbkksS0FBTCxDQUFXMUYsUUFBWCxDQUFvQjtBQUFDN0MsWUFBSSxFQUFFLE1BQUt1SSxLQUFMLENBQVdzWCxzQkFBbEI7QUFBMEM1ZSxlQUFPLEVBQUU7QUFBQ3lQLG1CQUFTLEVBQVRBO0FBQUQ7QUFBbkQsT0FBcEI7QUFDRCxLOytIQUVRLFVBQUNvQixRQUFELEVBQWM7QUFDckIsWUFBS3ZKLEtBQUwsQ0FBVzFGLFFBQVgsQ0FBb0I7QUFBQzdDLFlBQUksRUFBRSxNQUFLdUksS0FBTCxDQUFXbVMsY0FBbEI7QUFBa0N6WixlQUFPLEVBQUU7QUFBQzZRLGtCQUFRLEVBQVJBO0FBQUQ7QUFBM0MsT0FBcEI7QUFDRCxLOzs7Ozs7NkJBNUJTO0FBQUE7O0FBQUEsd0JBQzRELEtBQUt2SixLQURqRTtBQUFBLFVBQ0R1SSxLQURDLGVBQ0RBLEtBREM7QUFBQSxVQUNNZCxNQUROLGVBQ01BLE1BRE47QUFBQSxVQUNjc0IsV0FEZCxlQUNjQSxXQURkO0FBQUEsVUFDMkJkLFNBRDNCLGVBQzJCQSxTQUQzQjtBQUFBLFVBQ3NDQyxVQUR0QyxlQUNzQ0EsVUFEdEM7QUFBQSxVQUNrRFUsTUFEbEQsZUFDa0RBLE1BRGxEO0FBRVIsYUFDRTtBQUFLLFdBQUcsRUFBRSxLQUFLUyxVQUFmO0FBQTJCLGdCQUFRLEVBQUUsS0FBS0MsUUFBMUM7QUFBb0QsYUFBSyxFQUFFO0FBQUNDLGtCQUFRLEVBQUUsVUFBWDtBQUF1QmhCLGVBQUssRUFBRUEsS0FBSyxjQUFPQSxLQUFQLE9BQW5DO0FBQXFEZCxnQkFBTSxFQUFFQSxNQUFNLGNBQU9BLE1BQVAsT0FBbkU7QUFBc0YrQixtQkFBUyxFQUFFO0FBQWpHO0FBQTNELFNBQ0csQ0FBQ1QsV0FBVyxJQUFFLEVBQWQsRUFBa0I5USxHQUFsQixDQUFzQjtBQUFBLFlBQUV3UixLQUFGLFNBQUVBLEtBQUY7QUFBQSxZQUFTQyxPQUFULFNBQVNBLE9BQVQ7QUFBQSxlQUNyQjtBQUFLLGFBQUcsRUFBRUQsS0FBVjtBQUFpQixlQUFLLEVBQUU7QUFBQ0Ysb0JBQVEsRUFBRSxVQUFYO0FBQXVCSSxlQUFHLFlBQUtGLEtBQUssR0FBR3ZCLFVBQWI7QUFBMUI7QUFBeEIsV0FDR3dCLE9BQU8sQ0FBQ3pSLEdBQVIsQ0FBWTtBQUFBLGNBQUV3UixLQUFGLFNBQUVBLEtBQUY7QUFBQSxjQUFTRixRQUFULFNBQVNBLFFBQVQ7QUFBQSxjQUFtQjBOLFFBQW5CLFNBQW1CQSxRQUFuQjtBQUFBLGNBQTZCRSxLQUE3QixTQUE2QkEsS0FBN0I7QUFBQSxjQUFvQ3BFLE1BQXBDLFNBQW9DQSxNQUFwQztBQUFBLGNBQTRDbUUsT0FBNUMsU0FBNENBLE9BQTVDO0FBQUEsaUJBQ1gsNkJBQUMsUUFBRDtBQUFVLGVBQUcsRUFBRXpOLEtBQWY7QUFBc0Isa0JBQU0sRUFBRUEsS0FBOUI7QUFBcUMsb0JBQVEsRUFBRUYsUUFBL0M7QUFBeUQsb0JBQVEsRUFBRTBOLFFBQW5FO0FBQTZFLGlCQUFLLEVBQUVFLEtBQXBGO0FBQTJGLGtCQUFNLEVBQUVwRSxNQUFuRztBQUEyRyxtQkFBTyxFQUFFbUUsT0FBcEg7QUFBNkgscUJBQVMsRUFBRWpQLFNBQXhJO0FBQW1KLGtCQUFNLEVBQUUsTUFBSSxDQUFDdVA7QUFBaEssWUFEVztBQUFBLFNBQVosQ0FESCxDQURxQjtBQUFBLE9BQXRCLENBREgsRUFNRTtBQUFLLGFBQUssRUFBRTtBQUFDak8sa0JBQVEsRUFBRSxVQUFYO0FBQXVCSSxhQUFHLFlBQUtmLE1BQUwsT0FBMUI7QUFBMkNMLGVBQUssRUFBRSxLQUFsRDtBQUF5RGQsZ0JBQU0sRUFBRTtBQUFqRTtBQUFaLFFBTkYsQ0FERjtBQVVEOzs7RUFkOEJySCxlQUFNQyxhOztJQWtDakNvWCxROzs7Ozs7Ozs7Ozs7Ozs7OzsrSEFvQkksVUFBQzdGLE1BQUQsRUFBWTtBQUNsQixhQUFLNVIsS0FBTCxDQUFXd1gsTUFBWCxDQUFrQixPQUFLeFgsS0FBTCxDQUFXdUosUUFBN0I7QUFDRCxLOzs7Ozs7NkJBckJTO0FBQUEseUJBQ3NELEtBQUt2SixLQUQzRDtBQUFBLFVBQ0QwWCxNQURDLGdCQUNEQSxNQURDO0FBQUEsVUFDT1QsUUFEUCxnQkFDT0EsUUFEUDtBQUFBLFVBQ2lCRSxLQURqQixnQkFDaUJBLEtBRGpCO0FBQUEsVUFDd0JwRSxNQUR4QixnQkFDd0JBLE1BRHhCO0FBQUEsVUFDZ0NtRSxPQURoQyxnQkFDZ0NBLE9BRGhDO0FBQUEsVUFDeUNqUCxTQUR6QyxnQkFDeUNBLFNBRHpDO0FBRVIsVUFBTTBQLFNBQVMsR0FBRztBQUNoQnBPLGdCQUFRLEVBQUUsVUFETTtBQUVoQk0sWUFBSSxZQUFLNk4sTUFBTSxHQUFHelAsU0FBZCxPQUZZO0FBR2hCTSxhQUFLLFlBQUtOLFNBQUwsT0FIVztBQUloQlIsY0FBTSxRQUpVO0FBS2hCdUksY0FBTSxFQUFFLFlBTFE7QUFNaEI0SCxtQkFBVyxFQUFFLE9BTkc7QUFPaEJoQyx1QkFBZSxFQUFFc0IsT0FBTyxHQUFHLE1BQUgsR0FBYW5FLE1BQU0sR0FBRyxNQUFILEdBQVksTUFQdkM7QUFRaEI0QyxjQUFNLEVBQUU7QUFSUSxPQUFsQjtBQVVBLGFBQ0U7QUFBSyxhQUFLLEVBQUVnQyxTQUFaO0FBQXVCLGVBQU8sRUFBRSxLQUFLRTtBQUFyQyxTQUNFO0FBQUssYUFBSyxFQUFFO0FBQUN0UCxlQUFLLEVBQUUsTUFBUjtBQUFnQmQsZ0JBQU0sRUFBRSxNQUF4QjtBQUFnQ3FRLHNCQUFZLEVBQUUsZ0JBQTlDO0FBQWdFN0gsbUJBQVMsRUFBRTtBQUEzRTtBQUFaLFNBQW1HZ0gsUUFBUSxJQUFJLEdBQS9HLENBREYsRUFFRTtBQUFLLGFBQUssRUFBRTtBQUFDMU8sZUFBSyxFQUFFLE1BQVI7QUFBZ0JkLGdCQUFNLEVBQUUsTUFBeEI7QUFBZ0N3SSxtQkFBUyxFQUFFO0FBQTNDO0FBQVosU0FBbUVrSCxLQUFLLElBQUksR0FBNUUsQ0FGRixDQURGO0FBTUQ7OztFQW5Cb0IvVyxlQUFNQyxhOztlQXlCZDtBQUNibEgsU0FBTyxFQUFFO0FBQ1BrZSx5QkFBcUIsRUFBRTtBQUF5QjtBQUR6QztBQUVQQywwQkFBc0IsRUFBRTtBQUEwQjs7QUFGM0MsR0FESTtBQUtidmhCLGdCQUFjLEVBQUU7QUFDZEMsV0FBTyxFQUFFQyxjQURLO0FBRWRDLFlBQVEsRUFBRUMsZUFGSTtBQUdka2hCLHlCQUFxQixFQUFFUiw0QkFIVDtBQUlkUywwQkFBc0IsRUFBRVI7QUFKVixHQUxIO0FBV2I1YSxhQUFXLEVBQUU2YSx5QkFYQTtBQVliM2QsT0FBSyxFQUFFO0FBQ0wyZSxrQkFBYyxFQUFFLHlCQUFRWCwwQkFBUixFQUFvQ0csa0JBQXBDO0FBRFg7QUFaTSxDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ2xJZjs7QUFDQTs7QUFDQTs7QUFDQTs7QUFDQTs7QUFFQSxTQUFTUyxpQkFBVCxDQUE0QjNnQixLQUE1QixFQUFtQztBQUFBLHFCQUs3QkEsS0FMNkIsQ0FFL0IrQixLQUYrQjtBQUFBLE1BRXZCMFEsWUFGdUIsZ0JBRXZCQSxZQUZ1QjtBQUFBLE1BRVQrQyxZQUZTLGdCQUVUQSxZQUZTO0FBQUEsTUFFS3NELGlCQUZMLGdCQUVLQSxpQkFGTDtBQUFBLE1BRXdCd0csS0FGeEIsZ0JBRXdCQSxLQUZ4QjtBQUFBLE1BRStCdkUsa0JBRi9CLGdCQUUrQkEsa0JBRi9CO0FBQUEsTUFFbUQyRixjQUZuRCxnQkFFbURBLGNBRm5EO0FBQUEsTUFFbUU1USxtQkFGbkUsZ0JBRW1FQSxtQkFGbkU7QUFBQSxNQUdyQkUsV0FIcUIsR0FLN0JoUSxLQUw2QixDQUcvQjhCLE9BSCtCLENBR3JCa08sV0FIcUI7QUFBQSxNQUkvQnRQLE1BSitCLEdBSzdCVixLQUw2QixDQUkvQlUsTUFKK0I7QUFBQSxNQUl2QnNhLE9BSnVCLEdBSzdCaGIsS0FMNkIsQ0FJdkJnYixPQUp1QjtBQU1qQyxNQUFJOUwsV0FBVyxHQUFHLElBQWxCOztBQUNBLE1BQUksT0FBTzhMLE9BQU8sQ0FBQ0UsVUFBZixLQUE4QixRQUFsQyxFQUE0QztBQUMxQyxRQUFNMEYsV0FBVyxHQUFHbGdCLE1BQU0sQ0FBQ3NhLE9BQU8sQ0FBQ0UsVUFBVCxDQUFOLENBQTJCamEsS0FBM0IsQ0FBaUMrWixPQUFPLENBQUNHLFFBQXpDLENBQXBCOztBQUNBLFFBQUksQ0FBQ3lGLFdBQVcsQ0FBQ25GLElBQWIsSUFBcUIsQ0FBQ21GLFdBQVcsQ0FBQ2xGLE1BQXRDLEVBQThDO0FBQzVDeE0saUJBQVcsR0FBRzhMLE9BQWQ7QUFDRDtBQUNGOztBQUNELFNBQU87QUFDTHZJLGdCQUFZLEVBQVpBLFlBREs7QUFDUytDLGdCQUFZLEVBQVpBLFlBRFQ7QUFDdUJzRCxxQkFBaUIsRUFBakJBLGlCQUR2QjtBQUMwQ3dHLFNBQUssRUFBTEEsS0FEMUM7QUFDaUR2RSxzQkFBa0IsRUFBbEJBLGtCQURqRDtBQUNxRTJGLGtCQUFjLEVBQWRBLGNBRHJFO0FBRUw1USx1QkFBbUIsRUFBbkJBLG1CQUZLO0FBRWdCRSxlQUFXLEVBQVhBLFdBRmhCO0FBRTZCZCxlQUFXLEVBQVhBLFdBRjdCO0FBRTBDMlIsWUFBUSxFQUFFbmdCLE1BQU0sQ0FBQ3FGO0FBRjNELEdBQVA7QUFJRDs7SUFFS3lDLFM7Ozs7Ozs7Ozs7Ozs7Ozs7O29JQStCVSxZQUFNO0FBQUEsd0JBQzJCLE1BQUtHLEtBRGhDO0FBQUEsVUFDWDFGLFFBRFcsZUFDWEEsUUFEVztBQUFBLFVBQ0QrTSxXQURDLGVBQ0RBLFdBREM7QUFBQSxVQUNZZCxXQURaLGVBQ1lBLFdBRFo7QUFFbEJqTSxjQUFRLENBQUM7QUFBQzdDLFlBQUksRUFBRTRQLFdBQVA7QUFBb0IzTyxlQUFPLEVBQUU7QUFBQ2lPLGlCQUFPLEVBQUVKO0FBQVY7QUFBN0IsT0FBRCxDQUFSO0FBQ0QsSzs7Ozs7OzZCQWpDUztBQUFBLHlCQUN1SSxLQUFLdkcsS0FENUk7QUFBQSxVQUNEOEosWUFEQyxnQkFDREEsWUFEQztBQUFBLFVBQ2ErQyxZQURiLGdCQUNhQSxZQURiO0FBQUEsVUFDMkJzRCxpQkFEM0IsZ0JBQzJCQSxpQkFEM0I7QUFBQSxVQUM4Q3dHLEtBRDlDLGdCQUM4Q0EsS0FEOUM7QUFBQSxVQUNxRHZFLGtCQURyRCxnQkFDcURBLGtCQURyRDtBQUFBLFVBQ3lFMkYsY0FEekUsZ0JBQ3lFQSxjQUR6RTtBQUFBLFVBQ3lGRyxRQUR6RixnQkFDeUZBLFFBRHpGO0FBQUEsVUFDbUczUixXQURuRyxnQkFDbUdBLFdBRG5HO0FBQUEsVUFDZ0hZLG1CQURoSCxnQkFDZ0hBLG1CQURoSDtBQUVSLGFBQ0UsMENBQ0UseUNBQUssaUJBQUwsQ0FERixFQUVFLDZCQUFDLFlBQUQsT0FGRixFQUdFLHlDQUFLLGlDQUFMLENBSEYsRUFJRSw2QkFBQyxZQUFELE9BSkYsRUFLRSx5Q0FBSyxzQ0FBTCxDQUxGLEVBTUUsNkJBQUMsaUJBQUQsT0FORixFQU9FLHdEQUFhK1EsUUFBUSxHQUFHLENBQVgsR0FBZSxHQUFmLEdBQXFCLEVBQWxDLDBCQVBGLEVBUUU7QUFBSyxpQkFBUyxFQUFDO0FBQWYsU0FDRTtBQUFLLGFBQUssRUFBRTtBQUFDbEksZ0JBQU0sRUFBRSxnQkFBVDtBQUEyQlIsZUFBSyxFQUFFLE9BQWxDO0FBQTJDakgsZUFBSyxFQUFFLE9BQWxEO0FBQTJENFAsaUJBQU8sRUFBRSxNQUFwRTtBQUE0RUMsc0JBQVksRUFBRSxLQUExRjtBQUFpR3hDLHlCQUFlLEVBQUUsU0FBbEg7QUFBNkhoVixrQkFBUSxFQUFFLE1BQXZJO0FBQStJb0wscUJBQVcsRUFBRTtBQUE1SjtBQUFaLFNBQ0U7QUFBRyxhQUFLLEVBQUU7QUFBQzlMLG9CQUFVLEVBQUUsTUFBYjtBQUFxQitQLG1CQUFTLEVBQUU7QUFBaEM7QUFBVixTQUFzRCxTQUF0RCxDQURGLEVBRUUsd0NBQUksa0JBQUosRUFBdUI7QUFBTSxhQUFLLEVBQUU7QUFBQy9QLG9CQUFVLEVBQUU7QUFBYjtBQUFiLFNBQW9DLFVBQXBDLENBQXZCLEVBQThFLG9FQUE5RSxDQUZGLEVBR0U7QUFBSyxhQUFLLEVBQUU7QUFBQytQLG1CQUFTLEVBQUUsUUFBWjtBQUFzQjRCLGdCQUFNLEVBQUU7QUFBOUI7QUFBWixTQUNFLDZCQUFDLHNCQUFEO0FBQVEsZUFBTyxFQUFFLEtBQUt4SyxXQUF0QjtBQUFtQyxnQkFBUSxFQUFFLENBQUNkO0FBQTlDLG1CQURGLENBSEYsQ0FERixFQVFFO0FBQUssYUFBSyxFQUFFO0FBQUNpSixlQUFLLEVBQUU7QUFBUjtBQUFaLFNBQ0csa0JBQU0sQ0FBTixFQUFTMEksUUFBVCxFQUFtQmpnQixHQUFuQixDQUF1QixVQUFBd1IsS0FBSztBQUFBLGVBQUksNkJBQUMsS0FBRDtBQUFPLGFBQUcsRUFBRUEsS0FBWjtBQUFtQixlQUFLLEVBQUVBO0FBQTFCLFVBQUo7QUFBQSxPQUE1QixDQURILEVBRUUsNkJBQUMsa0JBQUQsT0FGRixDQVJGLENBUkYsRUFxQkUsNkJBQUMsbUJBQUQsT0FyQkYsRUFzQkUseUNBQUssaUJBQUwsQ0F0QkYsRUF1QkUsNkJBQUMsY0FBRCxPQXZCRixDQURGO0FBMkJEOzs7RUE5QnFCckosZUFBTUMsYTs7ZUFxQ2Y7QUFDYmpILE9BQUssRUFBRTtBQUNMeUcsYUFBUyxFQUFFLHlCQUFRbVksaUJBQVIsRUFBMkJuWSxTQUEzQjtBQUROO0FBRE0sQzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQzlEZjs7QUFFQSxTQUFTd1ksTUFBVCxDQUFpQnRLLENBQWpCLEVBQW9CQyxDQUFwQixFQUF1QjtBQUNuQixNQUFJc0ssRUFBRSxHQUFHLENBQVQ7QUFBQSxNQUFZQyxFQUFFLEdBQUd4SyxDQUFDLENBQUMzUSxNQUFuQjtBQUFBLE1BQTJCb2IsR0FBM0I7O0FBQ0EsU0FBT0YsRUFBRSxHQUFHQyxFQUFaLEVBQWdCO0FBQ1pDLE9BQUcsR0FBRyxDQUFDRixFQUFFLEdBQUdDLEVBQU4sSUFBWSxDQUFaLEdBQWdCLENBQXRCOztBQUNBLFFBQUl2SyxDQUFDLEdBQUdELENBQUMsQ0FBQ3lLLEdBQUQsQ0FBVCxFQUFnQjtBQUNaRCxRQUFFLEdBQUdDLEdBQUw7QUFDSCxLQUZELE1BRU87QUFDSEYsUUFBRSxHQUFHRSxHQUFHLEdBQUcsQ0FBWDtBQUNIO0FBQ0o7O0FBQ0QsU0FBT0YsRUFBUDtBQUNIOztBQUVNLFNBQVNHLGVBQVQsQ0FBMEJDLE1BQTFCLEVBQWtDbE4sS0FBbEMsRUFBeUNmLFFBQXpDLEVBQW1EO0FBQ3RELE1BQU1oQixLQUFLLEdBQUc0TyxNQUFNLENBQUNLLE1BQUQsRUFBU2xOLEtBQVQsQ0FBcEI7O0FBQ0EsTUFBSWYsUUFBSixFQUFjO0FBQ1YsV0FBT2lPLE1BQU0sQ0FBQ2pQLEtBQUssR0FBRyxDQUFULENBQU4sS0FBc0IrQixLQUF0QixHQUE4QixFQUE5QixHQUFtQztBQUFDbU4sYUFBTyxFQUFFLENBQUMsQ0FBQ2xQLEtBQUQsRUFBUSxDQUFSLEVBQVcrQixLQUFYLENBQUQ7QUFBVixLQUExQztBQUNILEdBRkQsTUFFTztBQUNILFdBQU9rTixNQUFNLENBQUNqUCxLQUFLLEdBQUcsQ0FBVCxDQUFOLEtBQXNCK0IsS0FBdEIsR0FBOEIsRUFBOUIsR0FBbUM7QUFBQ21OLGFBQU8sRUFBRSxDQUFDLENBQUNsUCxLQUFLLEdBQUcsQ0FBVCxFQUFZLENBQVosQ0FBRDtBQUFWLEtBQTFDO0FBQ0g7QUFDSjs7QUFFTSxTQUFTbVAscUJBQVQsQ0FBZ0M3SyxDQUFoQyxFQUFtQ0MsQ0FBbkMsRUFBc0M7QUFDM0MsTUFBTTdRLENBQUMsR0FBR2tiLE1BQU0sQ0FBQ3RLLENBQUQsRUFBSUMsQ0FBSixDQUFOLEdBQWUsQ0FBekI7QUFDQSxTQUFPRCxDQUFDLENBQUM1USxDQUFELENBQUQsS0FBUzZRLENBQWhCO0FBQ0Q7O0FBR00sU0FBUzZLLGtCQUFULENBQTZCaE8sSUFBN0IsRUFBbUM7QUFBQSxNQUNqQ3RDLEtBRGlDLEdBQzJCc0MsSUFEM0IsQ0FDakN0QyxLQURpQztBQUFBLE1BQzFCZCxNQUQwQixHQUMyQm9ELElBRDNCLENBQzFCcEQsTUFEMEI7QUFBQSxNQUNsQlEsU0FEa0IsR0FDMkI0QyxJQUQzQixDQUNsQjVDLFNBRGtCO0FBQUEsTUFDUEMsVUFETyxHQUMyQjJDLElBRDNCLENBQ1AzQyxVQURPO0FBQUEsTUFDS0MsU0FETCxHQUMyQjBDLElBRDNCLENBQ0sxQyxTQURMO0FBQUEsTUFDZ0JDLE9BRGhCLEdBQzJCeUMsSUFEM0IsQ0FDZ0J6QyxPQURoQjtBQUV4QyxNQUFNMFEsY0FBYyxHQUFHLEVBQXZCO0FBQ0EsTUFBTWhRLFdBQVcsR0FBR3hFLElBQUksQ0FBQ0MsR0FBTCxDQUFTLEVBQVQsRUFBYUQsSUFBSSxDQUFDeVUsS0FBTCxDQUFXLENBQUN4USxLQUFLLEdBQUd1USxjQUFULElBQTJCN1EsU0FBdEMsQ0FBYixDQUFwQjtBQUNBLE1BQU1ZLFFBQVEsR0FBR3ZFLElBQUksQ0FBQ0MsR0FBTCxDQUFTLENBQVQsRUFBWUQsSUFBSSxDQUFDb0csSUFBTCxDQUFVakQsTUFBTSxHQUFHUyxVQUFuQixDQUFaLENBQWpCO0FBQ0EsTUFBTVUsTUFBTSxHQUFHdEUsSUFBSSxDQUFDb0csSUFBTCxDQUFVdEMsT0FBTyxHQUFHVSxXQUFwQixJQUFtQ1osVUFBbkMsR0FBZ0QsQ0FBL0Q7QUFDQSxNQUFNa0MsTUFBTSxHQUFHOUYsSUFBSSxDQUFDQyxHQUFMLENBQVMsQ0FBVCxFQUFZcUUsTUFBTSxHQUFHLENBQVQsR0FBYUMsUUFBUSxHQUFHWCxVQUFwQyxDQUFmO0FBQ0EseUNBQVcyQyxJQUFYO0FBQWlCL0IsZUFBVyxFQUFYQSxXQUFqQjtBQUE4QkQsWUFBUSxFQUFSQSxRQUE5QjtBQUF3Q1YsYUFBUyxFQUFFN0QsSUFBSSxDQUFDK0YsR0FBTCxDQUFTRCxNQUFULEVBQWlCakMsU0FBakIsQ0FBbkQ7QUFBZ0ZTLFVBQU0sRUFBTkEsTUFBaEY7QUFBd0Z3QixVQUFNLEVBQU5BO0FBQXhGO0FBQ0Q7O0FBRU0sU0FBUzRPLHFCQUFULENBQWdDbk8sSUFBaEMsRUFBc0MvUixPQUF0QyxFQUErQztBQUNwREEsU0FBTyxHQUFHQSxPQUFPLElBQUksRUFBckI7QUFEb0QsTUFFN0NzUCxPQUY2QyxHQUVpQ3lDLElBRmpDLENBRTdDekMsT0FGNkM7QUFBQSxNQUVwQ0YsVUFGb0MsR0FFaUMyQyxJQUZqQyxDQUVwQzNDLFVBRm9DO0FBQUEsTUFFeEJZLFdBRndCLEdBRWlDK0IsSUFGakMsQ0FFeEIvQixXQUZ3QjtBQUFBLE1BRVhELFFBRlcsR0FFaUNnQyxJQUZqQyxDQUVYaEMsUUFGVztBQUFBLE1BRUR2USxLQUZDLEdBRWlDdVMsSUFGakMsQ0FFRHZTLEtBRkM7QUFBQSxNQUVNNlAsU0FGTixHQUVpQzBDLElBRmpDLENBRU0xQyxTQUZOO0FBQUEsTUFFaUI2QixZQUZqQixHQUVpQ2EsSUFGakMsQ0FFaUJiLFlBRmpCOztBQUdwRCxNQUFJLE9BQU83QixTQUFQLEtBQXFCLFFBQXpCLEVBQW1DO0FBQ2pDLFdBQU8wQyxJQUFQO0FBQ0Q7O0FBQ0QsTUFBTW9PLFFBQVEsR0FBRzNVLElBQUksQ0FBQ3lVLEtBQUwsQ0FBVzVRLFNBQVMsR0FBR0QsVUFBdkIsQ0FBakI7QUFDQSxNQUFNZ1IsT0FBTyxHQUFHNVUsSUFBSSxDQUFDK0YsR0FBTCxDQUFTNE8sUUFBUSxHQUFHcFEsUUFBWCxHQUFzQixDQUEvQixFQUFrQ3ZFLElBQUksQ0FBQ29HLElBQUwsQ0FBVXRDLE9BQU8sR0FBR1UsV0FBcEIsSUFBbUMsQ0FBckUsQ0FBaEI7QUFDQSxNQUFNRSxJQUFJLEdBQUcsRUFBYjtBQUNBLE1BQU1nTyxPQUFPLEdBQUdsZSxPQUFPLENBQUNrZSxPQUFSLEtBQW9CMWUsS0FBSyxHQUFJLFVBQUFtUixLQUFLO0FBQUEsV0FBSztBQUFDRyxVQUFJLEVBQUV0UixLQUFLLENBQUNtUixLQUFEO0FBQVosS0FBTDtBQUFBLEdBQVQsR0FBd0MsVUFBQTBQLE1BQU07QUFBQSxXQUFJLElBQUo7QUFBQSxHQUF2RSxDQUFoQjs7QUFDQSxPQUFLLElBQUlDLFFBQVEsR0FBR0gsUUFBcEIsRUFBOEJHLFFBQVEsSUFBSUYsT0FBMUMsRUFBbURFLFFBQVEsSUFBSSxDQUEvRCxFQUFrRTtBQUNoRSxRQUFNQyxXQUFXLEdBQUdELFFBQVEsR0FBR3RRLFdBQS9CO0FBQ0EsUUFBTXdRLFFBQVEsR0FBRyxFQUFqQjs7QUFDQSxTQUFLLElBQUlDLFFBQVEsR0FBRyxDQUFwQixFQUF1QkEsUUFBUSxHQUFHelEsV0FBbEMsRUFBK0N5USxRQUFRLElBQUksQ0FBM0QsRUFBOEQ7QUFDNURELGNBQVEsQ0FBQzFjLElBQVQ7QUFBZTZNLGFBQUssRUFBRThQO0FBQXRCLFNBQW1DdkMsT0FBTyxDQUFDcUMsV0FBVyxHQUFHRSxRQUFmLENBQTFDO0FBQ0Q7O0FBQ0QsUUFBTTlPLFFBQVEsR0FBR1QsWUFBWSxJQUFJNE8scUJBQXFCLENBQUM1TyxZQUFELEVBQWVvUCxRQUFmLENBQXREO0FBQ0FwUSxRQUFJLENBQUNwTSxJQUFMLENBQVU7QUFBQzZNLFdBQUssRUFBRTJQLFFBQVI7QUFBa0IzTyxjQUFRLEVBQVJBLFFBQWxCO0FBQTRCZixhQUFPLEVBQUU0UDtBQUFyQyxLQUFWO0FBQ0Q7O0FBQ0QseUNBQVd6TyxJQUFYO0FBQWlCM0QsV0FBTyxFQUFFO0FBQUM4QixVQUFJLEVBQUpBO0FBQUQ7QUFBMUI7QUFDRDs7QUFFTSxTQUFTd1Esd0JBQVQsQ0FBbUMzTyxJQUFuQyxFQUF5Qy9SLE9BQXpDLEVBQWtEO0FBQ3ZEQSxTQUFPLEdBQUdBLE9BQU8sSUFBSSxFQUFyQjtBQUR1RCxNQUVoRG9QLFVBRmdELEdBRXdCMkMsSUFGeEIsQ0FFaEQzQyxVQUZnRDtBQUFBLE1BRXBDWSxXQUZvQyxHQUV3QitCLElBRnhCLENBRXBDL0IsV0FGb0M7QUFBQSxNQUV2QkQsUUFGdUIsR0FFd0JnQyxJQUZ4QixDQUV2QmhDLFFBRnVCO0FBQUEsTUFFYnZRLEtBRmEsR0FFd0J1UyxJQUZ4QixDQUVidlMsS0FGYTtBQUFBLE1BRU42UCxTQUZNLEdBRXdCMEMsSUFGeEIsQ0FFTjFDLFNBRk07QUFBQSxNQUVLOEIsZUFGTCxHQUV3QlksSUFGeEIsQ0FFS1osZUFGTDs7QUFHdkQsTUFBSSxPQUFPOUIsU0FBUCxLQUFxQixRQUF6QixFQUFtQztBQUNqQyxXQUFPMEMsSUFBUDtBQUNEOztBQUNELE1BQU1vTyxRQUFRLEdBQUczVSxJQUFJLENBQUN5VSxLQUFMLENBQVc1USxTQUFTLEdBQUdELFVBQXZCLENBQWpCO0FBQ0EsTUFBTWdSLE9BQU8sR0FBR0QsUUFBUSxHQUFHcFEsUUFBWCxHQUFzQixDQUF0QztBQUNBLE1BQU1hLE9BQU8sR0FBRyxFQUFoQjtBQUNBLE1BQU1zTixPQUFPLEdBQUdsZSxPQUFPLENBQUNrZSxPQUFSLEtBQW9CMWUsS0FBSyxHQUFJLFVBQUFtUixLQUFLO0FBQUEsV0FBSztBQUFDRyxVQUFJLEVBQUV0UixLQUFLLENBQUNtUixLQUFEO0FBQVosS0FBTDtBQUFBLEdBQVQsR0FBd0MsVUFBQTBQLE1BQU07QUFBQSxXQUFJLElBQUo7QUFBQSxHQUF2RSxDQUFoQjs7QUFDQSxPQUFLLElBQUlJLFFBQVEsR0FBRyxDQUFwQixFQUF1QkEsUUFBUSxHQUFHelEsV0FBbEMsRUFBK0N5USxRQUFRLElBQUksQ0FBM0QsRUFBOEQ7QUFDNUQsUUFBTUUsUUFBUSxHQUFHLEVBQWpCOztBQUNBLFNBQUssSUFBSUwsUUFBUSxHQUFHSCxRQUFwQixFQUE4QkcsUUFBUSxJQUFJRixPQUExQyxFQUFtREUsUUFBUSxJQUFJLENBQS9ELEVBQWtFO0FBQ2hFSyxjQUFRLENBQUM3YyxJQUFUO0FBQWU2TSxhQUFLLEVBQUUyUDtBQUF0QixTQUFtQ3BDLE9BQU8sQ0FBQ29DLFFBQVEsR0FBR3RRLFdBQVgsR0FBeUJ5USxRQUExQixDQUExQztBQUNEOztBQUNELFFBQU05TyxRQUFRLEdBQUdSLGVBQWUsSUFBSTJPLHFCQUFxQixDQUFDM08sZUFBRCxFQUFrQnNQLFFBQWxCLENBQXpEO0FBQ0E3UCxXQUFPLENBQUM5TSxJQUFSLENBQWE7QUFBQzZNLFdBQUssRUFBRThQLFFBQVI7QUFBa0I5TyxjQUFRLEVBQVJBLFFBQWxCO0FBQTRCekIsVUFBSSxFQUFFeVE7QUFBbEMsS0FBYjtBQUNEOztBQUNELHlDQUFXNU8sSUFBWDtBQUFpQjNELFdBQU8sRUFBRTtBQUFDd0MsYUFBTyxFQUFQQTtBQUFEO0FBQTFCO0FBQ0Q7O0FBRU0sU0FBU2dRLHFCQUFULENBQWdDN08sSUFBaEMsRUFBc0MvUixPQUF0QyxFQUErQztBQUNwRDtBQUNBLE1BQUkrUixJQUFJLENBQUNuTCxJQUFMLEtBQWMsTUFBbEIsRUFBMEI7QUFDeEIsV0FBT3NaLHFCQUFxQixDQUFDbk8sSUFBRCxFQUFPL1IsT0FBUCxDQUE1QjtBQUNEOztBQUNELE1BQUkrUixJQUFJLENBQUNuTCxJQUFMLEtBQWMsU0FBbEIsRUFBNkI7QUFDM0IsV0FBTzhaLHdCQUF3QixDQUFDM08sSUFBRCxFQUFPL1IsT0FBUCxDQUEvQjtBQUNEOztBQUNELFNBQU8rUixJQUFQO0FBQ0Q7QUFFRDs7O0FBR08sU0FBUzhPLFNBQVQsQ0FBb0I5aEIsUUFBcEIsUUFBdUQ7QUFBQSxNQUF4QitoQixRQUF3QixRQUF4QkEsUUFBd0I7QUFBQSxNQUFkakcsV0FBYyxRQUFkQSxXQUFjO0FBQzVELE1BQU1rRyxJQUFJLEdBQUdoaUIsUUFBUSxDQUFDdUYsTUFBdEI7QUFDQSxNQUFNOUUsS0FBSyxHQUFHVCxRQUFRLENBQUN1VixLQUFULENBQWUsRUFBZixFQUFvQm5WLEdBQXBCLENBQXdCLFVBQVVvVixDQUFWLEVBQWE2RCxJQUFiLEVBQW1CO0FBQ3ZELFdBQU87QUFBQ0EsVUFBSSxFQUFKQSxJQUFEO0FBQU9vRCxjQUFRLEVBQUVqSCxDQUFqQjtBQUFvQjlVLGNBQVEsRUFBRSxJQUE5QjtBQUFvQ3dhLFlBQU0sRUFBRSxLQUE1QztBQUFtRGtCLGNBQVEsRUFBRTtBQUE3RCxLQUFQO0FBQ0QsR0FGYSxDQUFkO0FBR0EsTUFBTTZGLFFBQVEsR0FBRyxJQUFJamQsS0FBSixDQUFVZ2QsSUFBVixFQUFnQnpMLElBQWhCLENBQXFCLENBQUMsQ0FBdEIsQ0FBakI7QUFDQSxTQUFPO0FBQUN2VyxZQUFRLEVBQVJBLFFBQUQ7QUFBV2dpQixRQUFJLEVBQUpBLElBQVg7QUFBaUJELFlBQVEsRUFBUkEsUUFBakI7QUFBMkJqRyxlQUFXLEVBQVhBLFdBQTNCO0FBQXdDcmIsU0FBSyxFQUFMQSxLQUF4QztBQUErQ3loQixXQUFPLEVBQUVELFFBQXhEO0FBQWtFRSxZQUFRLEVBQUVGO0FBQTVFLEdBQVA7QUFDRDs7QUFFTSxTQUFTRyxVQUFULENBQXFCcGlCLFFBQXJCLEVBQStCRSxNQUEvQixFQUF1QztBQUM1QyxTQUFPQSxNQUFNLENBQUNFLEdBQVAsQ0FBVyxVQUFBSSxLQUFLO0FBQUEsV0FDckJBLEtBQUssQ0FBQ0MsS0FBTixDQUFZTCxHQUFaLENBQWdCO0FBQUEsVUFBRU0sUUFBRixTQUFFQSxRQUFGO0FBQUEsVUFBWXdhLE1BQVosU0FBWUEsTUFBWjtBQUFBLGFBQ2QsQ0FBQ2xiLFFBQVEsQ0FBQ1csT0FBVCxDQUFpQkQsUUFBakIsQ0FBRCxFQUE2QndhLE1BQU0sR0FBRyxDQUFILEdBQU8sQ0FBMUMsQ0FEYztBQUFBLEtBQWhCLENBRHFCO0FBQUEsR0FBaEIsQ0FBUDtBQUdEOztBQUVNLFNBQVNtSCxVQUFULENBQXFCcmlCLFFBQXJCLEVBQStCQyxVQUEvQixFQUEyQ0UsS0FBM0MsRUFBa0RtaUIsVUFBbEQsRUFBOEQ7QUFDbkUsU0FBT0EsVUFBVSxDQUFDbGlCLEdBQVgsQ0FBZSxVQUFDSyxLQUFELEVBQVFpYSxVQUFSLEVBQXVCO0FBQzNDLFFBQU02SCxNQUFNLEdBQUcsRUFBZjtBQUNBOWhCLFNBQUssQ0FBQytoQixPQUFOLENBQWMsVUFBQ3pRLElBQUQsRUFBTzBRLFNBQVAsRUFBcUI7QUFDakM7QUFDQSxVQUFJLE9BQU8xUSxJQUFQLEtBQWdCLFFBQXBCLEVBQThCQSxJQUFJLEdBQUcsQ0FBQ0EsSUFBRCxFQUFPLENBQVAsQ0FBUDs7QUFGRyxrQkFHVkEsSUFIVTtBQUFBO0FBQUEsVUFHMUJzSCxJQUgwQjtBQUFBLFVBR3BCNkIsTUFIb0I7O0FBSWpDcUgsWUFBTSxDQUFDRSxTQUFELENBQU4sR0FBb0I7QUFDbEIvaEIsZ0JBQVEsRUFBRTtBQUFDSSxjQUFJLEVBQUV1WSxJQUFJLEtBQUssQ0FBQyxDQUFWLEdBQWMsSUFBZCxHQUFxQnJaLFFBQVEsQ0FBQ3FaLElBQUQ7QUFBcEMsU0FEUTtBQUVsQjZCLGNBQU0sRUFBRTtBQUFDcGEsY0FBSSxFQUFFb2EsTUFBTSxLQUFLO0FBQWxCO0FBRlUsT0FBcEI7QUFJRCxLQVJEO0FBU0EvYSxTQUFLLENBQUNxaUIsT0FBTixDQUFjLGlCQUEwQztBQUFBLFVBQTVCbGQsQ0FBNEIsU0FBeENvVixVQUF3QztBQUFBLFVBQWZnSSxDQUFlLFNBQXpCL0gsUUFBeUI7QUFBQSxVQUFackQsTUFBWSxTQUFaQSxNQUFZOztBQUN0RCxVQUFJb0QsVUFBVSxLQUFLcFYsQ0FBbkIsRUFBc0I7QUFDcEJpZCxjQUFNLENBQUNHLENBQUQsQ0FBTixHQUFZO0FBQ1ZoaUIsa0JBQVEsRUFBRTtBQUFDSSxnQkFBSSxFQUFFd1c7QUFBUCxXQURBO0FBRVYyRCxjQUFJLEVBQUU7QUFBQ25hLGdCQUFJLEVBQUU7QUFBUDtBQUZJLFNBQVo7QUFJRDtBQUNGLEtBUEQ7QUFRQSxRQUFJTixLQUFLLEdBQUdzaEIsU0FBUyxDQUFDOWhCLFFBQUQsRUFBV0MsVUFBVSxDQUFDeWEsVUFBRCxDQUFyQixDQUFyQjtBQUNBbGEsU0FBSyxHQUFHLGlDQUFPQSxLQUFQLEVBQWM7QUFBQ0MsV0FBSyxFQUFFOGhCO0FBQVIsS0FBZCxDQUFSO0FBQ0EvaEIsU0FBSyxHQUFHbWlCLGtCQUFrQixDQUFDQyxXQUFXLENBQUNwaUIsS0FBRCxDQUFaLENBQTFCO0FBQ0EsV0FBT0EsS0FBUDtBQUNELEdBdkJNLENBQVA7QUF3QkQ7O0FBRU0sU0FBU3FpQixhQUFULENBQXdCcmlCLEtBQXhCLEVBQStCNlksSUFBL0IsRUFBcUMvQixNQUFyQyxFQUE2QztBQUNsRDlXLE9BQUssR0FBRyxpQ0FBT0EsS0FBUCxFQUFjO0FBQUNDLFNBQUssb0NBQUk0WSxJQUFKLEVBQVc7QUFBQzNZLGNBQVEsRUFBRTtBQUFDSSxZQUFJLEVBQUV3VztBQUFQO0FBQVgsS0FBWDtBQUFOLEdBQWQsQ0FBUjtBQUNBLFNBQU9zTCxXQUFXLENBQUNELGtCQUFrQixDQUFDbmlCLEtBQUQsQ0FBbkIsQ0FBbEI7QUFDRDs7QUFFTSxTQUFTc2lCLGFBQVQsQ0FBd0J0aUIsS0FBeEIsRUFBK0I2WSxJQUEvQixFQUFxQzZCLE1BQXJDLEVBQTZDO0FBQ2xELFNBQU8saUNBQU8xYSxLQUFQLEVBQWM7QUFBQ0MsU0FBSyxvQ0FBSTRZLElBQUosRUFBVztBQUFDNkIsWUFBTSxFQUFFO0FBQUNwYSxZQUFJLEVBQUVvYTtBQUFQO0FBQVQsS0FBWDtBQUFOLEdBQWQsQ0FBUDtBQUNEOztBQUVELFNBQVN5SCxrQkFBVCxDQUE2Qm5pQixLQUE3QixFQUFvQztBQUNsQyxNQUFNdWlCLE1BQU0sR0FBRyxJQUFJemUsR0FBSixFQUFmO0FBQ0EsTUFBTXlVLE9BQU8sR0FBRyxFQUFoQjtBQUZrQztBQUFBO0FBQUE7O0FBQUE7QUFHbEMseUJBQXVDdlksS0FBSyxDQUFDQyxLQUE3Qyw4SEFBb0Q7QUFBQTtBQUFBLFVBQTFDNFksSUFBMEMsU0FBMUNBLElBQTBDO0FBQUEsVUFBcEMzWSxRQUFvQyxTQUFwQ0EsUUFBb0M7QUFBQSxVQUExQjBiLFFBQTBCLFNBQTFCQSxRQUEwQjs7QUFDbEQsVUFBSUEsUUFBSixFQUFjO0FBQ1pyRCxlQUFPLENBQUNNLElBQUQsQ0FBUCxHQUFnQjtBQUFDK0Msa0JBQVEsRUFBRTtBQUFDdGIsZ0JBQUksRUFBRTtBQUFQO0FBQVgsU0FBaEI7QUFDRDs7QUFDRCxVQUFJSixRQUFRLEtBQUssSUFBakIsRUFBdUI7QUFDckIsWUFBSSxDQUFDcWlCLE1BQU0sQ0FBQ0MsR0FBUCxDQUFXdGlCLFFBQVgsQ0FBTCxFQUEyQjtBQUN6QnFpQixnQkFBTSxDQUFDcmUsR0FBUCxDQUFXaEUsUUFBWCxFQUFxQixDQUFDMlksSUFBRCxDQUFyQjtBQUNELFNBRkQsTUFFTztBQUNMMEosZ0JBQU0sQ0FBQ3RlLEdBQVAsQ0FBVy9ELFFBQVgsRUFBcUJxRSxJQUFyQixDQUEwQnNVLElBQTFCO0FBQ0Q7QUFDRjtBQUNGO0FBZGlDO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7O0FBQUE7QUFBQTtBQUFBOztBQUFBO0FBZWxDLDBCQUFrQjBKLE1BQU0sQ0FBQ2xDLE1BQVAsRUFBbEIsbUlBQW1DO0FBQUEsVUFBMUJvQyxLQUEwQjs7QUFDakMsVUFBSUEsS0FBSyxDQUFDMWQsTUFBTixHQUFlLENBQW5CLEVBQXNCO0FBQUE7QUFBQTtBQUFBOztBQUFBO0FBQ3BCLGdDQUFpQjBkLEtBQWpCLG1JQUF3QjtBQUFBLGdCQUFmNUosSUFBZTtBQUN0Qk4sbUJBQU8sQ0FBQ00sSUFBRCxDQUFQLEdBQWdCO0FBQUMrQyxzQkFBUSxFQUFFO0FBQUN0YixvQkFBSSxFQUFFO0FBQVA7QUFBWCxhQUFoQjtBQUNEO0FBSG1CO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFJckI7QUFDRjtBQXJCaUM7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTs7QUFzQmxDLFNBQU8saUNBQU9OLEtBQVAsRUFBYztBQUFDQyxTQUFLLEVBQUVzWTtBQUFSLEdBQWQsQ0FBUDtBQUNEOztBQUVNLFNBQVNtSyxrQkFBVCxDQUE2QmxqQixRQUE3QixFQUF1Q1EsS0FBdkMsRUFBOENnRSxHQUE5QyxFQUFtRDtBQUN4RCxNQUFNK2QsTUFBTSxHQUFHLEVBQWY7QUFDQS9kLEtBQUcsQ0FBQytRLEtBQUosQ0FBVSxFQUFWLEVBQWNpTixPQUFkLENBQXNCLFVBQUNsTCxNQUFELEVBQVNtTCxTQUFULEVBQXVCO0FBQzNDRixVQUFNLENBQUNFLFNBQUQsQ0FBTixHQUFvQjtBQUNsQi9oQixjQUFRLEVBQUU7QUFBQ0ksWUFBSSxFQUFFZCxRQUFRLENBQUNXLE9BQVQsQ0FBaUIyVyxNQUFqQixNQUE2QixDQUFDLENBQTlCLEdBQWtDLElBQWxDLEdBQXlDQTtBQUFoRDtBQURRLEtBQXBCO0FBR0QsR0FKRDtBQUtBLFNBQU9zTCxXQUFXLENBQUMsaUNBQU9waUIsS0FBUCxFQUFjO0FBQUNDLFNBQUssRUFBRThoQjtBQUFSLEdBQWQsQ0FBRCxDQUFsQjtBQUNEOztBQUVNLFNBQVNLLFdBQVQsQ0FBc0JwaUIsS0FBdEIsRUFBNkI7QUFBQSxNQUMzQndoQixJQUQyQixHQUNGeGhCLEtBREUsQ0FDM0J3aEIsSUFEMkI7QUFBQSxNQUNyQmhpQixRQURxQixHQUNGUSxLQURFLENBQ3JCUixRQURxQjtBQUFBLE1BQ1hTLEtBRFcsR0FDRkQsS0FERSxDQUNYQyxLQURXO0FBRWxDLE1BQU15aEIsT0FBTyxHQUFHLElBQUlsZCxLQUFKLENBQVVnZCxJQUFWLEVBQWdCekwsSUFBaEIsQ0FBcUIsQ0FBQyxDQUF0QixDQUFoQjtBQUNBLE1BQU00TCxRQUFRLEdBQUcsSUFBSW5kLEtBQUosQ0FBVWdkLElBQVYsRUFBZ0J6TCxJQUFoQixDQUFxQixDQUFDLENBQXRCLENBQWpCO0FBSGtDO0FBQUE7QUFBQTs7QUFBQTtBQUlsQywwQkFBaUI5VixLQUFqQixtSUFBd0I7QUFBQSxVQUFmc1IsSUFBZTs7QUFDdEIsVUFBSUEsSUFBSSxDQUFDclIsUUFBTCxLQUFrQixJQUFsQixJQUEwQixDQUFDcVIsSUFBSSxDQUFDcUssUUFBcEMsRUFBOEM7QUFDNUMsWUFBTStHLE1BQU0sR0FBR25qQixRQUFRLENBQUNXLE9BQVQsQ0FBaUJvUixJQUFJLENBQUNyUixRQUF0QixDQUFmO0FBQ0F3aEIsZUFBTyxDQUFDaUIsTUFBRCxDQUFQLEdBQWtCcFIsSUFBSSxDQUFDc0gsSUFBdkI7QUFDQThJLGdCQUFRLENBQUNwUSxJQUFJLENBQUNzSCxJQUFOLENBQVIsR0FBc0I4SixNQUF0QjtBQUNEO0FBQ0Y7QUFWaUM7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTs7QUFXbEMseUNBQVczaUIsS0FBWDtBQUFrQjBoQixXQUFPLEVBQVBBLE9BQWxCO0FBQTJCQyxZQUFRLEVBQVJBO0FBQTNCO0FBQ0Q7O0FBRU0sU0FBU2lCLGFBQVQsQ0FBd0I1aUIsS0FBeEIsRUFBK0JrUixRQUEvQixFQUF5QztBQUFBLE1BQ3ZDc1EsSUFEdUMsR0FDckJ4aEIsS0FEcUIsQ0FDdkN3aEIsSUFEdUM7QUFBQSxNQUNqQ0QsUUFEaUMsR0FDckJ2aEIsS0FEcUIsQ0FDakN1aEIsUUFEaUM7QUFFOUMsU0FBT0EsUUFBUSxLQUFLLENBQWIsR0FBaUIsQ0FBakIsR0FBcUJ0VixJQUFJLENBQUN5VSxLQUFMLENBQVd4UCxRQUFRLEdBQUdxUSxRQUF0QixJQUFrQ0MsSUFBOUQ7QUFDRDs7QUFFTSxTQUFTcUIsV0FBVCxDQUFzQm5qQixNQUF0QixFQUE4QndSLFFBQTlCLEVBQXdDMkgsSUFBeEMsRUFBOEM7QUFDbkQsTUFBTWhVLE1BQU0sR0FBRztBQUFDZ1UsUUFBSSxFQUFKQSxJQUFEO0FBQU9pSyxTQUFLLEVBQUUsQ0FBZDtBQUFpQmhLLFNBQUssRUFBRTtBQUF4QixHQUFmOztBQUNBLE9BQUssSUFBSW9CLFVBQVUsR0FBRyxDQUF0QixFQUF5QkEsVUFBVSxHQUFHeGEsTUFBTSxDQUFDcUYsTUFBN0MsRUFBcURtVixVQUFVLElBQUksQ0FBbkUsRUFBc0U7QUFDcEUsUUFBTWxhLEtBQUssR0FBR04sTUFBTSxDQUFDd2EsVUFBRCxDQUFwQjtBQUNBLFFBQU1xQixLQUFLLEdBQUdxSCxhQUFhLENBQUM1aUIsS0FBRCxFQUFRa1IsUUFBUixDQUEzQjtBQUNBNlIsY0FBVSxDQUFDL2lCLEtBQUQsRUFBUXViLEtBQVIsRUFBZTFXLE1BQWYsQ0FBVjs7QUFDQSxRQUFJQSxNQUFNLENBQUNnVSxJQUFQLEtBQWdCLENBQUMsQ0FBckIsRUFBd0I7QUFDdEI7QUFDRDtBQUNGOztBQUNELE1BQUloVSxNQUFNLENBQUNpZSxLQUFQLEtBQWlCcGpCLE1BQU0sQ0FBQ3FGLE1BQTVCLEVBQW9DO0FBQ2xDRixVQUFNLENBQUM2VixNQUFQLEdBQWdCLElBQWhCO0FBQ0Q7O0FBQ0QsU0FBTzdWLE1BQVA7QUFDRDs7QUFFTSxTQUFTa2UsVUFBVCxDQUFxQi9pQixLQUFyQixFQUE0QnViLEtBQTVCLEVBQW1DMVcsTUFBbkMsRUFBMkM7QUFDaEQsTUFBSWdVLElBQUksR0FBR2hVLE1BQU0sQ0FBQ2dVLElBQWxCO0FBQUEsTUFBd0J0SCxJQUF4QjtBQUNBOztBQUNBLE1BQUl2UixLQUFLLENBQUNzYixXQUFOLEtBQXNCLFFBQTFCLEVBQW9DO0FBQ2xDekMsUUFBSSxHQUFHbUssVUFBVSxDQUFDaGpCLEtBQUssQ0FBQ3doQixJQUFQLEVBQWEsQ0FBQ2pHLEtBQWQsRUFBcUIxQyxJQUFyQixDQUFqQjtBQUNBdEgsUUFBSSxHQUFHdlIsS0FBSyxDQUFDQyxLQUFOLENBQVk0WSxJQUFaLENBQVA7QUFDRDtBQUNEOzs7QUFDQUEsTUFBSSxHQUFHN1ksS0FBSyxDQUFDMGhCLE9BQU4sQ0FBYzdJLElBQWQsQ0FBUDtBQUNBOztBQUNBLE1BQUk3WSxLQUFLLENBQUNzYixXQUFOLEtBQXNCLEtBQTFCLEVBQWlDO0FBQy9CL0osUUFBSSxHQUFHdlIsS0FBSyxDQUFDQyxLQUFOLENBQVk0WSxJQUFaLENBQVA7QUFDQUEsUUFBSSxHQUFHbUssVUFBVSxDQUFDaGpCLEtBQUssQ0FBQ3doQixJQUFQLEVBQWFqRyxLQUFiLEVBQW9CMUMsSUFBcEIsQ0FBakI7QUFDRDtBQUNEOzs7QUFDQWhVLFFBQU0sQ0FBQ2dVLElBQVAsR0FBY0EsSUFBZDs7QUFDQSxNQUFJdEgsSUFBSixFQUFVO0FBQ1I7QUFDQTFNLFVBQU0sQ0FBQ2lVLEtBQVAsQ0FBYXZVLElBQWIsQ0FBa0JnTixJQUFsQjs7QUFDQSxRQUFJQSxJQUFJLENBQUNtSixNQUFMLElBQWVuSixJQUFJLENBQUNrSixJQUF4QixFQUE4QjtBQUM1QjVWLFlBQU0sQ0FBQ2llLEtBQVAsSUFBZ0IsQ0FBaEI7QUFDRDs7QUFDRCxRQUFJdlIsSUFBSSxDQUFDMFIsU0FBVCxFQUFvQjtBQUNsQnBlLFlBQU0sQ0FBQ29lLFNBQVAsR0FBbUIsSUFBbkI7QUFDRDtBQUNGO0FBQ0Y7O0FBRUQsU0FBU0QsVUFBVCxDQUFxQkUsR0FBckIsRUFBMEJDLE1BQTFCLEVBQWtDdEssSUFBbEMsRUFBd0M7QUFDdEMsTUFBSUEsSUFBSSxLQUFLLENBQUMsQ0FBZCxFQUFpQjtBQUNmLFFBQUlzSyxNQUFNLEdBQUcsQ0FBYixFQUFnQjtBQUNkQSxZQUFNLElBQUlELEdBQVY7QUFDRDs7QUFDRHJLLFFBQUksR0FBRyxDQUFDQSxJQUFJLEdBQUdzSyxNQUFSLElBQWtCRCxHQUF6QjtBQUNEOztBQUNELFNBQU9ySyxJQUFQO0FBQ0Q7O0FBRU0sU0FBU3VLLFVBQVQsQ0FBcUJqUSxLQUFyQixFQUE0QitQLEdBQTVCLEVBQWlDO0FBQ3RDLFNBQU8sQ0FBRS9QLEtBQUssR0FBRytQLEdBQVQsR0FBZ0JBLEdBQWpCLElBQXdCQSxHQUEvQjtBQUNELEMiLCJmaWxlIjoiYnVuZGxlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiXG5pbXBvcnQgdXBkYXRlIGZyb20gJ2ltbXV0YWJpbGl0eS1oZWxwZXInO1xuaW1wb3J0IGFsZ29yZWFSZWFjdFRhc2sgZnJvbSAnLi9hbGdvcmVhX3JlYWN0X3Rhc2snO1xuXG5pbXBvcnQgJ2ZvbnQtYXdlc29tZS9jc3MvZm9udC1hd2Vzb21lLmNzcyc7XG5pbXBvcnQgJ2Jvb3RzdHJhcC9kaXN0L2Nzcy9ib290c3RyYXAuY3NzJztcbmltcG9ydCAnLi9zdHlsZS5jc3MnO1xuXG5pbXBvcnQgQ2lwaGVyZWRUZXh0QnVuZGxlIGZyb20gJy4vY2lwaGVyZWRfdGV4dF9idW5kbGUnO1xuaW1wb3J0IFNlbGVjdGVkVGV4dEJ1bmRsZSBmcm9tICcuL3NlbGVjdGVkX3RleHRfYnVuZGxlJztcbmltcG9ydCBGcmVxdWVuY3lBbmFseXNpc0J1bmRsZSBmcm9tICcuL2ZyZXF1ZW5jeV9hbmFseXNpc19idW5kbGUnO1xuaW1wb3J0IFNjaGVkdWxpbmdCdW5kbGUgZnJvbSAnLi9zY2hlZHVsaW5nX2J1bmRsZSc7XG5pbXBvcnQgUm90b3JzQnVuZGxlIGZyb20gJy4vcm90b3JzX2J1bmRsZSc7XG5pbXBvcnQgRGVjaXBoZXJlZFRleHRCdW5kbGUgZnJvbSAnLi9kZWNpcGhlcmVkX3RleHRfYnVuZGxlJztcbmltcG9ydCBXb3Jrc3BhY2VCdW5kbGUgZnJvbSAnLi93b3Jrc3BhY2VfYnVuZGxlJztcbmltcG9ydCB7ZHVtcFJvdG9ycywgbG9hZFJvdG9yc30gZnJvbSAnLi91dGlscyc7XG5cbmNvbnN0IFRhc2tCdW5kbGUgPSB7XG4gICAgYWN0aW9uUmVkdWNlcnM6IHtcbiAgICAgICAgYXBwSW5pdDogYXBwSW5pdFJlZHVjZXIsXG4gICAgICAgIHRhc2tJbml0OiB0YXNrSW5pdFJlZHVjZXIgLyogcG9zc2libHkgbW92ZSB0byBhbGdvcmVhLXJlYWN0LXRhc2sgKi8sXG4gICAgICAgIHRhc2tSZWZyZXNoOiB0YXNrUmVmcmVzaFJlZHVjZXIgLyogcG9zc2libHkgbW92ZSB0byBhbGdvcmVhLXJlYWN0LXRhc2sgKi8sXG4gICAgICAgIHRhc2tBbnN3ZXJMb2FkZWQ6IHRhc2tBbnN3ZXJMb2FkZWQsXG4gICAgICAgIHRhc2tTdGF0ZUxvYWRlZDogdGFza1N0YXRlTG9hZGVkLFxuICAgIH0sXG4gICAgaW5jbHVkZXM6IFtcbiAgICAgICAgQ2lwaGVyZWRUZXh0QnVuZGxlLFxuICAgICAgICBTZWxlY3RlZFRleHRCdW5kbGUsXG4gICAgICAgIEZyZXF1ZW5jeUFuYWx5c2lzQnVuZGxlLFxuICAgICAgICBTY2hlZHVsaW5nQnVuZGxlLFxuICAgICAgICBSb3RvcnNCdW5kbGUsXG4gICAgICAgIERlY2lwaGVyZWRUZXh0QnVuZGxlLFxuICAgICAgICBXb3Jrc3BhY2VCdW5kbGUsXG4gICAgXSxcbiAgICBzZWxlY3RvcnM6IHtcbiAgICAgIGdldFRhc2tTdGF0ZSxcbiAgICAgIGdldFRhc2tBbnN3ZXIsXG4gICAgfVxufTtcblxuaWYgKHByb2Nlc3MuZW52Lk5PREVfRU5WID09PSAnZGV2ZWxvcG1lbnQnKSB7XG4gICAgLyogZXNsaW50LWRpc2FibGUgbm8tY29uc29sZSAqL1xuICAgIFRhc2tCdW5kbGUuZWFybHlSZWR1Y2VyID0gZnVuY3Rpb24gKHN0YXRlLCBhY3Rpb24pIHtcbiAgICAgICAgY29uc29sZS5sb2coJ0FDVElPTicsIGFjdGlvbi50eXBlLCBhY3Rpb24pO1xuICAgICAgICByZXR1cm4gc3RhdGU7XG4gICAgfTtcbn1cblxuZnVuY3Rpb24gYXBwSW5pdFJlZHVjZXIgKHN0YXRlLCBfYWN0aW9uKSB7XG4gICAgY29uc3QgdGFza01ldGFEYXRhID0ge1xuICAgICAgIFwiaWRcIjogXCJodHRwOi8vY29uY291cnMtYWxraW5kaS5mci90YXNrcy8yMDE4L2VuaWdtYVwiLFxuICAgICAgIFwibGFuZ3VhZ2VcIjogXCJmclwiLFxuICAgICAgIFwidmVyc2lvblwiOiBcImZyLjAxXCIsXG4gICAgICAgXCJhdXRob3JzXCI6IFwiU8OpYmFzdGllbiBDYXJsaWVyXCIsXG4gICAgICAgXCJ0cmFuc2xhdG9yc1wiOiBbXSxcbiAgICAgICBcImxpY2Vuc2VcIjogXCJcIixcbiAgICAgICBcInRhc2tQYXRoUHJlZml4XCI6IFwiXCIsXG4gICAgICAgXCJtb2R1bGVzUGF0aFByZWZpeFwiOiBcIlwiLFxuICAgICAgIFwiYnJvd3NlclN1cHBvcnRcIjogW10sXG4gICAgICAgXCJmdWxsRmVlZGJhY2tcIjogdHJ1ZSxcbiAgICAgICBcImFjY2VwdGVkQW5zd2Vyc1wiOiBbXSxcbiAgICAgICBcInVzZXNSYW5kb21TZWVkXCI6IHRydWVcbiAgICB9O1xuICAgIHJldHVybiB7Li4uc3RhdGUsIHRhc2tNZXRhRGF0YX07XG59XG5cbmZ1bmN0aW9uIHRhc2tJbml0UmVkdWNlciAoc3RhdGUsIF9hY3Rpb24pIHtcbiAgY29uc3Qge3Rhc2tEYXRhOiB7YWxwaGFiZXQsIHJvdG9yczogcm90b3JTcGVjcywgaGludHN9fSA9IHN0YXRlO1xuICBjb25zdCByb3RvcnMgPSBsb2FkUm90b3JzKGFscGhhYmV0LCByb3RvclNwZWNzLCBoaW50cywgcm90b3JTcGVjcy5tYXAoXyA9PiBbXSkpO1xuICByZXR1cm4gey4uLnN0YXRlLCByb3RvcnMsIHRhc2tSZWFkeTogdHJ1ZX07XG59XG5cbmZ1bmN0aW9uIHRhc2tSZWZyZXNoUmVkdWNlciAoc3RhdGUsIF9hY3Rpb24pIHtcbiAgY29uc3Qge3Rhc2tEYXRhOiB7YWxwaGFiZXQsIHJvdG9yczogcm90b3JTcGVjcywgaGludHN9fSA9IHN0YXRlO1xuICBjb25zdCBkdW1wID0gZHVtcFJvdG9ycyhhbHBoYWJldCwgc3RhdGUucm90b3JzKTtcbiAgY29uc3Qgcm90b3JzID0gbG9hZFJvdG9ycyhhbHBoYWJldCwgcm90b3JTcGVjcywgaGludHMsIGR1bXApO1xuICByZXR1cm4gey4uLnN0YXRlLCByb3RvcnN9O1xufVxuXG5mdW5jdGlvbiBnZXRUYXNrQW5zd2VyIChzdGF0ZSkge1xuICBjb25zdCB7dGFza0RhdGE6IHthbHBoYWJldH19ID0gc3RhdGU7XG4gIHJldHVybiB7XG4gICAgcm90b3JzOiBzdGF0ZS5yb3RvcnMubWFwKHJvdG9yID0+IHJvdG9yLmNlbGxzLm1hcCgoe2VkaXRhYmxlfSkgPT4gYWxwaGFiZXQuaW5kZXhPZihlZGl0YWJsZSkpKVxuICB9O1xufVxuXG5mdW5jdGlvbiB0YXNrQW5zd2VyTG9hZGVkIChzdGF0ZSwge3BheWxvYWQ6IHthbnN3ZXJ9fSkge1xuICBjb25zdCB7dGFza0RhdGE6IHthbHBoYWJldCwgcm90b3JzOiByb3RvclNwZWNzLCBoaW50c319ID0gc3RhdGU7XG4gIGNvbnN0IHJvdG9ycyA9IGxvYWRSb3RvcnMoYWxwaGFiZXQsIHJvdG9yU3BlY3MsIGhpbnRzLCBhbnN3ZXIucm90b3JzKTtcbiAgcmV0dXJuIHVwZGF0ZShzdGF0ZSwge3JvdG9yczogeyRzZXQ6IHJvdG9yc319KTtcbn1cblxuZnVuY3Rpb24gZ2V0VGFza1N0YXRlIChzdGF0ZSkge1xuICBjb25zdCB7dGFza0RhdGE6IHthbHBoYWJldH19ID0gc3RhdGU7XG4gIHJldHVybiB7cm90b3JzOiBkdW1wUm90b3JzKGFscGhhYmV0LCBzdGF0ZS5yb3RvcnMpfTtcbn1cblxuZnVuY3Rpb24gdGFza1N0YXRlTG9hZGVkIChzdGF0ZSwge3BheWxvYWQ6IHtkdW1wfX0pIHtcbiAgY29uc3Qge3Rhc2tEYXRhOiB7YWxwaGFiZXQsIHJvdG9yczogcm90b3JTcGVjcywgaGludHN9fSA9IHN0YXRlO1xuICBjb25zdCByb3RvcnMgPSBsb2FkUm90b3JzKGFscGhhYmV0LCByb3RvclNwZWNzLCBoaW50cywgZHVtcC5yb3RvcnMpO1xuICByZXR1cm4gdXBkYXRlKHN0YXRlLCB7cm90b3JzOiB7JHNldDogcm90b3JzfX0pO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gcnVuIChjb250YWluZXIsIG9wdGlvbnMpIHtcbiAgICByZXR1cm4gYWxnb3JlYVJlYWN0VGFzayhjb250YWluZXIsIG9wdGlvbnMsIFRhc2tCdW5kbGUpO1xufVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL2luZGV4LmpzIiwiLypcbkNoYW5nZSBtZXRob2Qgb2YgdXNlOlxuLSBleHBvcnQgYSBidW5kbGUgdGhhdCB0aGUgdGFzayBjYW4gaW5jbHVkZTtcbi0gZXhwb3J0IGEgZnVuY3Rpb24oc2FnYT8pIHRoYXQgKGNyZWF0ZXMgdGhlIEFQSSBvYmplY3RzIGFuZCApIGRpc3BhdGNoZXMgdGhlXG4gIGFwcEluaXQgYWN0aW9uO1xuXG4qL1xuXG4vL2ltcG9ydCAnLi9zaGltJ1xuaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCBSZWFjdERPTSBmcm9tICdyZWFjdC1kb20nO1xuaW1wb3J0IHtQcm92aWRlcn0gZnJvbSAncmVhY3QtcmVkdXgnO1xuaW1wb3J0IHF1ZXJ5U3RyaW5nIGZyb20gJ3F1ZXJ5LXN0cmluZyc7XG5pbXBvcnQge2NyZWF0ZVN0b3JlLCBhcHBseU1pZGRsZXdhcmV9IGZyb20gJ3JlZHV4JztcbmltcG9ydCB7ZGVmYXVsdCBhcyBjcmVhdGVTYWdhTWlkZGxld2FyZX0gZnJvbSAncmVkdXgtc2FnYSc7XG5pbXBvcnQge2NhbGx9IGZyb20gJ3JlZHV4LXNhZ2EvZWZmZWN0cyc7XG5cbmltcG9ydCBsaW5rIGZyb20gJy4vbGlua2VyJztcbmltcG9ydCAnLi91aS9zdHlsZXMuY3NzJztcblxuaW1wb3J0IEFwcEJ1bmRsZSBmcm9tICcuL2FwcF9idW5kbGUnO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiAoY29udGFpbmVyLCBvcHRpb25zLCBUYXNrQnVuZGxlKSB7XG4gICAgY29uc3QgcGxhdGZvcm0gPSB3aW5kb3cucGxhdGZvcm07XG4gICAgaWYgKHByb2Nlc3MuZW52Lk5PREVfRU5WID09PSAnZGV2ZWxvcG1lbnQnKSBwbGF0Zm9ybS5kZWJ1ZyA9IHRydWU7XG5cbiAgICBjb25zdCB7YWN0aW9ucywgdmlld3MsIHNlbGVjdG9ycywgcmVkdWNlciwgcm9vdFNhZ2F9ID0gbGluayh7aW5jbHVkZXM6IFtBcHBCdW5kbGUsIFRhc2tCdW5kbGVdfSk7XG5cbiAgICAvKiBCdWlsZCB0aGUgc3RvcmUuICovXG4gICAgY29uc3Qgc2FmZVJlZHVjZXIgPSBmdW5jdGlvbiAoc3RhdGUsIGFjdGlvbikge1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgcmV0dXJuIHJlZHVjZXIoc3RhdGUsIGFjdGlvbik7XG4gICAgICAgIH0gY2F0Y2ggKGV4KSB7XG4gICAgICAgICAgICBjb25zb2xlLmVycm9yKCdhY3Rpb24gZmFpbGVkIHRvIHJlZHVjZScsIGFjdGlvbiwgZXgpO1xuICAgICAgICAgICAgcmV0dXJuIHsuLi5zdGF0ZSwgZXJyb3JzOiBbZXhdfTtcbiAgICAgICAgfVxuICAgIH07XG4gICAgY29uc3Qgc2FnYU1pZGRsZXdhcmUgPSBjcmVhdGVTYWdhTWlkZGxld2FyZSgpO1xuICAgIGNvbnN0IGVuaGFuY2VyID0gYXBwbHlNaWRkbGV3YXJlKHNhZ2FNaWRkbGV3YXJlKTtcbiAgICBjb25zdCBzdG9yZSA9IGNyZWF0ZVN0b3JlKHNhZmVSZWR1Y2VyLCB7YWN0aW9ucywgdmlld3MsIHNlbGVjdG9yc30sIGVuaGFuY2VyKTtcblxuICAgIC8qIFN0YXJ0IHRoZSBzYWdhcy4gKi9cbiAgICBmdW5jdGlvbiBzdGFydCAoKSB7XG4gICAgICAgIHNhZ2FNaWRkbGV3YXJlLnJ1bihmdW5jdGlvbiogKCkge1xuICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICB5aWVsZCBjYWxsKHJvb3RTYWdhKTtcbiAgICAgICAgICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICAgICAgICAgICAgY29uc29sZS5lcnJvcignc2FnYXMgY3Jhc2hlZCcsIGVycm9yKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfVxuICAgIHN0YXJ0KCk7XG5cbiAgICAvKiBEaXNwYXRjaCB0aGUgYXBwSW5pdCBhY3Rpb24uICovXG4gICAgY29uc3QgcXVlcnkgPSBxdWVyeVN0cmluZy5wYXJzZShsb2NhdGlvbi5zZWFyY2gpO1xuICAgIGNvbnN0IHRhc2tUb2tlbiA9IHF1ZXJ5LnNUb2tlbjtcbiAgICBzdG9yZS5kaXNwYXRjaCh7dHlwZTogYWN0aW9ucy5hcHBJbml0LCBwYXlsb2FkOiB7b3B0aW9ucywgdGFza1Rva2VuLCBwbGF0Zm9ybX19KTtcblxuICAgIC8qIFN0YXJ0IHJlbmRlcmluZy4gKi9cbiAgICBSZWFjdERPTS5yZW5kZXIoPFByb3ZpZGVyIHN0b3JlPXtzdG9yZX0+PHZpZXdzLkFwcC8+PC9Qcm92aWRlcj4sIGNvbnRhaW5lcik7XG5cbiAgICByZXR1cm4ge2FjdGlvbnMsIHZpZXdzLCBzdG9yZSwgc3RhcnR9O1xufVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL2FsZ29yZWFfcmVhY3RfdGFzay9pbmRleC5qcyIsIi8qIENvcHlyaWdodCAoQykgMjAxNyBlcGl4b2RlIC0gQWxsIFJpZ2h0cyBSZXNlcnZlZFxuICogWW91IG1heSB1c2UsIGRpc3RyaWJ1dGUgYW5kIG1vZGlmeSB0aGlzIGNvZGUgdW5kZXIgdGhlXG4gKiB0ZXJtcyBvZiB0aGUgTUlUIGxpY2Vuc2UuXG4gKi9cblxuaW1wb3J0IHthbGwsIGNhbGx9IGZyb20gJ3JlZHV4LXNhZ2EvZWZmZWN0cyc7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGxpbmsgKHJvb3RCdW5kbGUsIGZlYXR1cmVzKSB7XG4gIGZlYXR1cmVzID0gZmVhdHVyZXMgfHwgW0FjdGlvbnMsIFZpZXdzLCBTZWxlY3RvcnMsIEVhcmx5UmVkdWNlcnMsIFJlZHVjZXJzLCBBY3Rpb25SZWR1Y2VycywgTGF0ZVJlZHVjZXJzLCBTYWdhc107XG4gIGNvbnN0IGFwcCA9IHt9O1xuICBmb3IgKGxldCBmZWF0dXJlIG9mIGZlYXR1cmVzKSB7XG4gICAgZmVhdHVyZS5wcmVwYXJlKGFwcCk7XG4gIH1cbiAgbGlua0J1bmRsZShyb290QnVuZGxlLCBmZWF0dXJlcywgYXBwKTtcbiAgZm9yIChsZXQgZmVhdHVyZSBvZiBmZWF0dXJlcykge1xuICAgIGZlYXR1cmUuZmluYWxpemUoYXBwKTtcbiAgfVxuICByZXR1cm4gYXBwO1xufVxuXG5mdW5jdGlvbiBsaW5rQnVuZGxlIChidW5kbGUsIGZlYXR1cmVzLCBhcHApIHtcbiAgZm9yIChsZXQgZmVhdHVyZSBvZiBmZWF0dXJlcykge1xuICAgIGZlYXR1cmUuYWRkKGFwcCwgYnVuZGxlKTtcbiAgfVxuICBpZiAoYnVuZGxlLmluY2x1ZGVzKSB7XG4gICAgZm9yIChsZXQgc3ViQnVuZGxlIG9mIGJ1bmRsZS5pbmNsdWRlcykge1xuICAgICAgbGlua0J1bmRsZShzdWJCdW5kbGUsIGZlYXR1cmVzLCBhcHApO1xuICAgIH1cbiAgfVxufVxuXG5jb25zdCBBY3Rpb25zID0ge1xuICBwcmVwYXJlOiBmdW5jdGlvbiAoYXBwKSB7XG4gICAgYXBwLmFjdGlvbnMgPSB7fTtcbiAgfSxcbiAgYWRkOiBmdW5jdGlvbiAoYXBwLCB7YWN0aW9uc30pIHtcbiAgICBpZiAoYWN0aW9ucykge1xuICAgICAgT2JqZWN0LmFzc2lnbihhcHAuYWN0aW9ucywgYWN0aW9ucyk7XG4gICAgfVxuICB9LFxuICBmaW5hbGl6ZTogZnVuY3Rpb24gKF9hcHApIHtcbiAgfVxufTtcblxuY29uc3QgVmlld3MgPSB7XG4gIHByZXBhcmU6IGZ1bmN0aW9uIChhcHApIHtcbiAgICBhcHAudmlld3MgPSB7fTtcbiAgfSxcbiAgYWRkOiBmdW5jdGlvbiAoYXBwLCB7dmlld3N9KSB7XG4gICAgaWYgKHZpZXdzKSB7XG4gICAgICBPYmplY3QuYXNzaWduKGFwcC52aWV3cywgdmlld3MpO1xuICAgIH1cbiAgfSxcbiAgZmluYWxpemU6IGZ1bmN0aW9uIChfYXBwKSB7XG4gIH1cbn07XG5cbmNvbnN0IFJlZHVjZXJzID0ge1xuICBwcmVwYXJlOiBmdW5jdGlvbiAoYXBwKSB7XG4gICAgYXBwLnJlZHVjZXIgPSB1bmRlZmluZWQ7XG4gIH0sXG4gIGFkZDogZnVuY3Rpb24gKGFwcCwge3JlZHVjZXIsIHJlZHVjZXJzfSkge1xuICAgIGlmIChyZWR1Y2VyKSB7XG4gICAgICBhcHAucmVkdWNlciA9IHNlcXVlbmNlUmVkdWNlcnMoYXBwLnJlZHVjZXIsIHJlZHVjZXIpO1xuICAgIH1cbiAgICBpZiAocmVkdWNlcnMpIHtcbiAgICAgIGFwcC5yZWR1Y2VyID0gc2VxdWVuY2VSZWR1Y2VycyhhcHAucmVkdWNlciwgLi4ucmVkdWNlcnMpO1xuICAgIH1cbiAgfSxcbiAgZmluYWxpemU6IGZ1bmN0aW9uIChfYXBwKSB7XG4gIH1cbn07XG5cbmNvbnN0IEVhcmx5UmVkdWNlcnMgPSB7XG4gIHByZXBhcmU6IGZ1bmN0aW9uIChhcHApIHtcbiAgICBhcHAuZWFybHlSZWR1Y2VyID0gdW5kZWZpbmVkO1xuICB9LFxuICBhZGQ6IGZ1bmN0aW9uIChhcHAsIHtlYXJseVJlZHVjZXJ9KSB7XG4gICAgYXBwLmVhcmx5UmVkdWNlciA9IHNlcXVlbmNlUmVkdWNlcnMoYXBwLmVhcmx5UmVkdWNlciwgZWFybHlSZWR1Y2VyKTtcbiAgfSxcbiAgZmluYWxpemU6IGZ1bmN0aW9uIChhcHApIHtcbiAgICBhcHAucmVkdWNlciA9IHNlcXVlbmNlUmVkdWNlcnMoYXBwLmVhcmx5UmVkdWNlciwgYXBwLnJlZHVjZXIpO1xuICAgIGRlbGV0ZSBhcHAuZWFybHlSZWR1Y2VyO1xuICB9XG59O1xuXG5jb25zdCBMYXRlUmVkdWNlcnMgPSB7XG4gIHByZXBhcmU6IGZ1bmN0aW9uIChhcHApIHtcbiAgICBhcHAubGF0ZVJlZHVjZXIgPSB1bmRlZmluZWQ7XG4gIH0sXG4gIGFkZDogZnVuY3Rpb24gKGFwcCwge2xhdGVSZWR1Y2VyfSkge1xuICAgIGFwcC5sYXRlUmVkdWNlciA9IHNlcXVlbmNlUmVkdWNlcnMoYXBwLmxhdGVSZWR1Y2VyLCBsYXRlUmVkdWNlcik7XG4gIH0sXG4gIGZpbmFsaXplOiBmdW5jdGlvbiAoYXBwKSB7XG4gICAgYXBwLnJlZHVjZXIgPSBzZXF1ZW5jZVJlZHVjZXJzKGFwcC5yZWR1Y2VyLCBhcHAubGF0ZVJlZHVjZXIpO1xuICAgIGRlbGV0ZSBhcHAubGF0ZVJlZHVjZXI7XG4gIH1cbn07XG5cbmNvbnN0IEFjdGlvblJlZHVjZXJzID0ge1xuICBwcmVwYXJlOiBmdW5jdGlvbiAoYXBwKSB7XG4gICAgYXBwLmFjdGlvblJlZHVjZXJzID0gbmV3IE1hcCgpO1xuICB9LFxuICBhZGQ6IGZ1bmN0aW9uIChhcHAsIHthY3Rpb25SZWR1Y2Vyc30pIHtcbiAgICBpZiAoYWN0aW9uUmVkdWNlcnMpIHtcbiAgICAgIGZvciAobGV0IGtleSBvZiBPYmplY3Qua2V5cyhhY3Rpb25SZWR1Y2VycykpIHtcbiAgICAgICAgbGV0IHJlZHVjZXIgPSBhcHAuYWN0aW9uUmVkdWNlcnMuZ2V0KGtleSk7XG4gICAgICAgIHJlZHVjZXIgPSBzZXF1ZW5jZVJlZHVjZXJzKHJlZHVjZXIsIGFjdGlvblJlZHVjZXJzW2tleV0pO1xuICAgICAgICBhcHAuYWN0aW9uUmVkdWNlcnMuc2V0KGtleSwgcmVkdWNlcik7XG4gICAgICB9XG4gICAgfVxuICB9LFxuICBmaW5hbGl6ZTogZnVuY3Rpb24gKGFwcCkge1xuICAgIGNvbnN0IGFjdGlvblJlZHVjZXIgPSBtYWtlQWN0aW9uUmVkdWNlcihhcHApO1xuICAgIGFwcC5yZWR1Y2VyID0gc2VxdWVuY2VSZWR1Y2VycyhhcHAucmVkdWNlciwgYWN0aW9uUmVkdWNlcik7XG4gICAgZGVsZXRlIGFwcC5hY3Rpb25SZWR1Y2VycztcbiAgfVxufTtcblxuY29uc3QgU2FnYXMgPSB7XG4gIHByZXBhcmU6IGZ1bmN0aW9uIChhcHApIHtcbiAgICBhcHAuc2FnYXMgPSBbXTtcbiAgfSxcbiAgYWRkOiBmdW5jdGlvbiAoYXBwLCB7c2FnYSwgc2FnYXN9KSB7XG4gICAgaWYgKHNhZ2EpIHtcbiAgICAgIGFwcC5zYWdhcy5wdXNoKHNhZ2EpO1xuICAgIH1cbiAgICBpZiAoc2FnYXMpIHtcbiAgICAgIEFycmF5LnByb3RvdHlwZS5wdXNoLmFwcGx5KGFwcC5zYWdhcywgc2FnYXMpO1xuICAgIH1cbiAgfSxcbiAgZmluYWxpemU6IGZ1bmN0aW9uIChhcHApIHtcbiAgICBjb25zdCBlZmZlY3RzID0gYXBwLnNhZ2FzLm1hcChmdW5jdGlvbiAoc2FnYSkgeyByZXR1cm4gY2FsbChzYWdhKTsgfSk7XG4gICAgYXBwLnJvb3RTYWdhID0gZnVuY3Rpb24qICgpIHsgeWllbGQgYWxsKGVmZmVjdHMpOyB9O1xuICAgIGRlbGV0ZSBhcHAuc2FnYXM7XG4gIH1cbn07XG5cbmNvbnN0IFNlbGVjdG9ycyA9IHtcbiAgcHJlcGFyZTogZnVuY3Rpb24gKGFwcCkge1xuICAgIGFwcC5zZWxlY3RvcnMgPSB7fTtcbiAgfSxcbiAgYWRkOiBmdW5jdGlvbiAoYXBwLCB7c2VsZWN0b3JzfSkge1xuICAgIGlmIChzZWxlY3RvcnMpIHtcbiAgICAgIE9iamVjdC5hc3NpZ24oYXBwLnNlbGVjdG9ycywgc2VsZWN0b3JzKTtcbiAgICB9XG4gIH0sXG4gIGZpbmFsaXplOiBmdW5jdGlvbiAoX2FwcCkge1xuICB9XG59O1xuXG5mdW5jdGlvbiBtYWtlQWN0aW9uUmVkdWNlciAoe2FjdGlvbnMsIGFjdGlvblJlZHVjZXJzfSkge1xuICBjb25zdCBtYXAgPSBuZXcgTWFwKCk7XG4gIGZvciAobGV0IFtrZXksIHJlZHVjZXJdIG9mIGFjdGlvblJlZHVjZXJzLmVudHJpZXMoKSkge1xuICAgIG1hcC5zZXQoYWN0aW9uc1trZXldLCByZWR1Y2VyKTtcbiAgfVxuICByZXR1cm4gZnVuY3Rpb24gKHN0YXRlLCBhY3Rpb24pIHtcbiAgICBjb25zdCByZWR1Y2VyID0gbWFwLmdldChhY3Rpb24udHlwZSk7XG4gICAgcmV0dXJuIHR5cGVvZiByZWR1Y2VyID09PSAnZnVuY3Rpb24nID8gcmVkdWNlcihzdGF0ZSwgYWN0aW9uKSA6IHN0YXRlO1xuICB9O1xufVxuXG5mdW5jdGlvbiBzZXF1ZW5jZVJlZHVjZXJzICguLi5yZWR1Y2Vycykge1xuICBsZXQgcmVzdWx0ID0gdW5kZWZpbmVkO1xuICBmb3IgKHZhciBpID0gMDsgaSA8IHJlZHVjZXJzLmxlbmd0aDsgaSArPSAxKSB7XG4gICAgdmFyIHJlZHVjZXIgPSByZWR1Y2Vyc1tpXTtcbiAgICBpZiAoIXJlZHVjZXIpIHtcbiAgICAgIGNvbnRpbnVlO1xuICAgIH1cbiAgICBpZiAodHlwZW9mIHJlZHVjZXIgIT09ICdmdW5jdGlvbicpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcigncmVkdWNlciBtdXN0IGJlIGEgZnVuY3Rpb24nLCByZWR1Y2VyKTtcbiAgICB9XG4gICAgaWYgKCFyZXN1bHQpIHtcbiAgICAgIHJlc3VsdCA9IHJlZHVjZXI7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJlc3VsdCA9IGNvbXBvc2VSZWR1Y2VycyhyZXN1bHQsIHJlZHVjZXIpO1xuICAgIH1cbiAgfVxuICByZXR1cm4gcmVzdWx0O1xufVxuXG5mdW5jdGlvbiBjb21wb3NlUmVkdWNlcnMgKGZzdCwgc25kKSB7XG4gIHJldHVybiBmdW5jdGlvbiAoc3RhdGUsIGFjdGlvbikgeyByZXR1cm4gc25kKGZzdChzdGF0ZSwgYWN0aW9uKSwgYWN0aW9uKTsgfTtcbn1cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9hbGdvcmVhX3JlYWN0X3Rhc2svbGlua2VyLmpzIiwiLy8gc3R5bGUtbG9hZGVyOiBBZGRzIHNvbWUgY3NzIHRvIHRoZSBET00gYnkgYWRkaW5nIGEgPHN0eWxlPiB0YWdcblxuLy8gbG9hZCB0aGUgc3R5bGVzXG52YXIgY29udGVudCA9IHJlcXVpcmUoXCIhIS4uLy4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2luZGV4LmpzPz9yZWYtLTEtMSEuL3N0eWxlcy5jc3NcIik7XG5pZih0eXBlb2YgY29udGVudCA9PT0gJ3N0cmluZycpIGNvbnRlbnQgPSBbW21vZHVsZS5pZCwgY29udGVudCwgJyddXTtcbi8vIFByZXBhcmUgY3NzVHJhbnNmb3JtYXRpb25cbnZhciB0cmFuc2Zvcm07XG5cbnZhciBvcHRpb25zID0ge1wic291cmNlTWFwXCI6dHJ1ZSxcImhtclwiOnRydWV9XG5vcHRpb25zLnRyYW5zZm9ybSA9IHRyYW5zZm9ybVxuLy8gYWRkIHRoZSBzdHlsZXMgdG8gdGhlIERPTVxudmFyIHVwZGF0ZSA9IHJlcXVpcmUoXCIhLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9saWIvYWRkU3R5bGVzLmpzXCIpKGNvbnRlbnQsIG9wdGlvbnMpO1xuaWYoY29udGVudC5sb2NhbHMpIG1vZHVsZS5leHBvcnRzID0gY29udGVudC5sb2NhbHM7XG4vLyBIb3QgTW9kdWxlIFJlcGxhY2VtZW50XG5pZihtb2R1bGUuaG90KSB7XG5cdC8vIFdoZW4gdGhlIHN0eWxlcyBjaGFuZ2UsIHVwZGF0ZSB0aGUgPHN0eWxlPiB0YWdzXG5cdGlmKCFjb250ZW50LmxvY2Fscykge1xuXHRcdG1vZHVsZS5ob3QuYWNjZXB0KFwiISEuLi8uLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9pbmRleC5qcz8/cmVmLS0xLTEhLi9zdHlsZXMuY3NzXCIsIGZ1bmN0aW9uKCkge1xuXHRcdFx0dmFyIG5ld0NvbnRlbnQgPSByZXF1aXJlKFwiISEuLi8uLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9pbmRleC5qcz8/cmVmLS0xLTEhLi9zdHlsZXMuY3NzXCIpO1xuXHRcdFx0aWYodHlwZW9mIG5ld0NvbnRlbnQgPT09ICdzdHJpbmcnKSBuZXdDb250ZW50ID0gW1ttb2R1bGUuaWQsIG5ld0NvbnRlbnQsICcnXV07XG5cdFx0XHR1cGRhdGUobmV3Q29udGVudCk7XG5cdFx0fSk7XG5cdH1cblx0Ly8gV2hlbiB0aGUgbW9kdWxlIGlzIGRpc3Bvc2VkLCByZW1vdmUgdGhlIDxzdHlsZT4gdGFnc1xuXHRtb2R1bGUuaG90LmRpc3Bvc2UoZnVuY3Rpb24oKSB7IHVwZGF0ZSgpOyB9KTtcbn1cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL3NyYy9hbGdvcmVhX3JlYWN0X3Rhc2svdWkvc3R5bGVzLmNzc1xuLy8gbW9kdWxlIGlkID0gNDAwXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsImV4cG9ydHMgPSBtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9saWIvY3NzLWJhc2UuanNcIikoZmFsc2UpO1xuLy8gaW1wb3J0c1xuXG5cbi8vIG1vZHVsZVxuZXhwb3J0cy5wdXNoKFttb2R1bGUuaWQsIFwiLnRhc2stYmFyIHtcXG4gICAgdGV4dC1hbGlnbjogY2VudGVyO1xcbiAgICBtYXJnaW4tdG9wOiAyMHB4O1xcbn1cIiwgXCJcIl0pO1xuXG4vLyBleHBvcnRzXG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyPz9yZWYtLTEtMSEuL3NyYy9hbGdvcmVhX3JlYWN0X3Rhc2svdWkvc3R5bGVzLmNzc1xuLy8gbW9kdWxlIGlkID0gNDAxXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQge0FsZXJ0fSBmcm9tICdyZWFjdC1ib290c3RyYXAnO1xuaW1wb3J0IHtjb25uZWN0fSBmcm9tICdyZWFjdC1yZWR1eCc7XG5pbXBvcnQge2NhbGwsIGZvcmssIHRha2VFdmVyeSwgc2VsZWN0LCB0YWtlLCBwdXR9IGZyb20gJ3JlZHV4LXNhZ2EvZWZmZWN0cyc7XG5cbmltcG9ydCBUYXNrQmFyIGZyb20gJy4vdWkvdGFza19iYXInO1xuaW1wb3J0IFNwaW5uZXIgZnJvbSAnLi91aS9zcGlubmVyJztcbmltcG9ydCBtYWtlVGFza0NoYW5uZWwgZnJvbSAnLi9sZWdhY3kvdGFzayc7XG5pbXBvcnQgbWFrZVNlcnZlckFwaSBmcm9tICcuL3NlcnZlcl9hcGknO1xuaW1wb3J0IG1ha2VQbGF0Zm9ybUFkYXB0ZXIgZnJvbSAnLi9sZWdhY3kvcGxhdGZvcm1fYWRhcHRlcic7XG5pbXBvcnQgUGxhdGZvcm1CdW5kbGUgZnJvbSAnLi9wbGF0Zm9ybV9idW5kbGUnO1xuaW1wb3J0IEhpbnRzQnVuZGxlIGZyb20gJy4vaGludHNfYnVuZGxlJztcbmltcG9ydCB7d2luZG93SGVpZ2h0TW9uaXRvclNhZ2F9IGZyb20gJy4vd2luZG93X2hlaWdodF9tb25pdG9yJztcblxuZnVuY3Rpb24gYXBwSW5pdFJlZHVjZXIgKHN0YXRlLCB7cGF5bG9hZDoge3Rhc2tUb2tlbiwgb3B0aW9uc319KSB7XG4gICAgcmV0dXJuIHsuLi5zdGF0ZSwgdGFza1Rva2VuLCBvcHRpb25zfTtcbn1cblxuZnVuY3Rpb24gYXBwSW5pdERvbmVSZWR1Y2VyIChzdGF0ZSwge3BheWxvYWQ6IHtwbGF0Zm9ybUFwaSwgdGFza0FwaSwgc2VydmVyQXBpfX0pIHtcbiAgICByZXR1cm4gey4uLnN0YXRlLCBwbGF0Zm9ybUFwaSwgdGFza0FwaSwgc2VydmVyQXBpfTtcbn1cblxuZnVuY3Rpb24gYXBwSW5pdEZhaWxlZFJlZHVjZXIgKHN0YXRlLCB7cGF5bG9hZDoge21lc3NhZ2V9fSkge1xuICAgIHJldHVybiB7Li4uc3RhdGUsIGZhdGFsRXJyb3I6IG1lc3NhZ2V9O1xufVxuXG5mdW5jdGlvbiogYXBwU2FnYSAoKSB7XG4gICAgY29uc3QgYWN0aW9ucyA9IHlpZWxkIHNlbGVjdCgoe2FjdGlvbnN9KSA9PiBhY3Rpb25zKTtcbiAgICB5aWVsZCB0YWtlRXZlcnkoYWN0aW9ucy5hcHBJbml0LCBhcHBJbml0U2FnYSk7XG4gICAgeWllbGQgdGFrZUV2ZXJ5KGFjdGlvbnMucGxhdGZvcm1WYWxpZGF0ZSwgcGxhdGZvcm1WYWxpZGF0ZVNhZ2EpO1xufVxuXG5jb25zdCB0YXNrQWN0aW9ucyA9IHsgLyogbWFwIHRhc2sgbWV0aG9kIG5hbWVzIHRvIGFjdGlvbiB0eXBlcyAqL1xuICAgIGxvYWQ6ICd0YXNrTG9hZEV2ZW50JyxcbiAgICB1bmxvYWQ6ICd0YXNrVW5sb2FkRXZlbnQnLFxuICAgIHVwZGF0ZVRva2VuOiAndGFza1VwZGF0ZVRva2VuRXZlbnQnLFxuICAgIGdldEhlaWdodDogJ3Rhc2tHZXRIZWlnaHRFdmVudCcsXG4gICAgZ2V0TWV0YURhdGE6ICd0YXNrR2V0TWV0YURhdGFFdmVudCcsXG4gICAgZ2V0Vmlld3M6ICd0YXNrR2V0Vmlld3NFdmVudCcsXG4gICAgc2hvd1ZpZXdzOiAndGFza1Nob3dWaWV3c0V2ZW50JyxcbiAgICBnZXRTdGF0ZTogJ3Rhc2tHZXRTdGF0ZUV2ZW50JyxcbiAgICByZWxvYWRTdGF0ZTogJ3Rhc2tSZWxvYWRTdGF0ZUV2ZW50JyxcbiAgICBnZXRBbnN3ZXI6ICd0YXNrR2V0QW5zd2VyRXZlbnQnLFxuICAgIHJlbG9hZEFuc3dlcjogJ3Rhc2tSZWxvYWRBbnN3ZXJFdmVudCcsXG4gICAgZ3JhZGVBbnN3ZXI6ICd0YXNrR3JhZGVBbnN3ZXJFdmVudCcsXG59O1xuXG5mdW5jdGlvbiogYXBwSW5pdFNhZ2EgKHtwYXlsb2FkOiB7dGFza1Rva2VuLCBvcHRpb25zLCBwbGF0Zm9ybX19KSB7XG4gICAgY29uc3QgYWN0aW9ucyA9IHlpZWxkIHNlbGVjdCgoe2FjdGlvbnN9KSA9PiBhY3Rpb25zKTtcbiAgICBsZXQgdGFza0NoYW5uZWwsIHRhc2tBcGksIHBsYXRmb3JtQXBpLCBzZXJ2ZXJBcGk7XG4gICAgdHJ5IHtcbiAgICAgICAgc2VydmVyQXBpID0gbWFrZVNlcnZlckFwaShvcHRpb25zLnNlcnZlcl9tb2R1bGUsIHRhc2tUb2tlbik7XG4gICAgICAgIHRhc2tDaGFubmVsID0geWllbGQgY2FsbChtYWtlVGFza0NoYW5uZWwpO1xuICAgICAgICB0YXNrQXBpID0gKHlpZWxkIHRha2UodGFza0NoYW5uZWwpKS50YXNrO1xuICAgICAgICB5aWVsZCB0YWtlRXZlcnkodGFza0NoYW5uZWwsIGZ1bmN0aW9uKiAoe3R5cGUsIHBheWxvYWR9KSB7XG4gICAgICAgICAgICBjb25zdCBhY3Rpb24gPSB7dHlwZTogYWN0aW9uc1t0YXNrQWN0aW9uc1t0eXBlXV0sIHBheWxvYWR9O1xuICAgICAgICAgICAgeWllbGQgcHV0KGFjdGlvbik7XG4gICAgICAgIH0pO1xuICAgICAgICBwbGF0Zm9ybUFwaSA9IG1ha2VQbGF0Zm9ybUFkYXB0ZXIocGxhdGZvcm0pO1xuICAgIH0gY2F0Y2ggKGV4KSB7XG4gICAgICAgIHlpZWxkIHB1dCh7dHlwZTogYWN0aW9ucy5hcHBJbml0RmFpbGVkLCBwYXlsb2FkOiB7bWVzc2FnZTogZXgudG9TdHJpbmcoKX19KTtcbiAgICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICB5aWVsZCBwdXQoe3R5cGU6IGFjdGlvbnMuYXBwSW5pdERvbmUsIHBheWxvYWQ6IHt0YXNrQXBpLCBwbGF0Zm9ybUFwaSwgc2VydmVyQXBpfX0pO1xuICAgIC8qIFhYWCBJZGVhbGx5IHBsYXRmb3JtLmluaXRXaXRoVGFzayB3b3VsZCB0YWtlIGNhcmUgb2Ygc2V0dGluZyBpdHMgZ2xvYmFsLiAqL1xuICAgIHdpbmRvdy50YXNrID0gdGFza0FwaTtcbiAgICB5aWVsZCBjYWxsKHBsYXRmb3JtQXBpLmluaXRXaXRoVGFzaywgdGFza0FwaSk7XG4gICAgLyogWFhYIHBsYXRmb3JtLmluaXRXaXRoVGFzayBmYWlscyB0byBjb25mb3JtIHRvIE9wZXJhdGlvbnMgQVBJIGFuZCBuZXZlclxuICAgICAgICAgICByZXR1cm4sIGNhdXNpbmcgdGhlIHNhZ2EgdG8gcmVtYWluIHN0dWNrIGF0IHRoaXMgcG9pbnQuICovXG4gICAgeWllbGQgZm9yayh3aW5kb3dIZWlnaHRNb25pdG9yU2FnYSwgcGxhdGZvcm1BcGkpO1xufVxuXG5mdW5jdGlvbiogcGxhdGZvcm1WYWxpZGF0ZVNhZ2EgKHtwYXlsb2FkOiB7bW9kZX19KSB7XG4gICAgY29uc3Qge3ZhbGlkYXRlfSA9IHlpZWxkIHNlbGVjdChzdGF0ZSA9PiBzdGF0ZS5wbGF0Zm9ybUFwaSk7XG4gICAgLyogVE9ETzogZXJyb3IgaGFuZGxpbmcsIHdyYXAgaW4gdHJ5L2NhdGNoIGJsb2NrICovXG4gICAgeWllbGQgY2FsbCh2YWxpZGF0ZSwgbW9kZSk7XG59XG5cbmZ1bmN0aW9uIEFwcFNlbGVjdG9yIChzdGF0ZSkge1xuICAgIGNvbnN0IHt0YXNrUmVhZHksIGZhdGFsRXJyb3IsIHZpZXdzOiB7V29ya3NwYWNlfSwgYWN0aW9uczoge3BsYXRmb3JtVmFsaWRhdGV9LCBncmFkaW5nfSA9IHN0YXRlO1xuICAgIHJldHVybiB7dGFza1JlYWR5LCBmYXRhbEVycm9yLCBXb3Jrc3BhY2UsIHBsYXRmb3JtVmFsaWRhdGUsIGdyYWRpbmd9O1xufVxuXG5jbGFzcyBBcHAgZXh0ZW5kcyBSZWFjdC5QdXJlQ29tcG9uZW50IHtcbiAgICByZW5kZXIgKCkge1xuICAgICAgICBjb25zdCB7dGFza1JlYWR5LCBXb3Jrc3BhY2UsIGZhdGFsRXJyb3IsIGdyYWRpbmd9ID0gdGhpcy5wcm9wcztcbiAgICAgICAgaWYgKGZhdGFsRXJyb3IpIHtcbiAgICAgICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICAgICAgPGRpdj5cbiAgICAgICAgICAgICAgICAgICAgPGgxPntcIkEgZmF0YWwgZXJyb3IgaGFzIG9jY3VycmVkXCJ9PC9oMT5cbiAgICAgICAgICAgICAgICAgICAgPHA+e2ZhdGFsRXJyb3J9PC9wPlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoIXRhc2tSZWFkeSkge1xuICAgICAgICAgICAgcmV0dXJuIDxTcGlubmVyLz47XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIDxkaXY+XG4gICAgICAgICAgICAgICAgPFdvcmtzcGFjZS8+XG4gICAgICAgICAgICAgICAgPFRhc2tCYXIgb25WYWxpZGF0ZT17dGhpcy5fdmFsaWRhdGV9Lz5cbiAgICAgICAgICAgICAgICB7Z3JhZGluZy5tZXNzYWdlICYmXG4gICAgICAgICAgICAgICAgICAgIDxwIHN0eWxlPXt7Zm9udFdlaWdodDogJ2JvbGQnfX0+e2dyYWRpbmcubWVzc2FnZX08L3A+fVxuICAgICAgICAgICAgICAgIHt0eXBlb2YgZ3JhZGluZy5zY29yZSA9PT0gJ251bWJlcicgJiZcbiAgICAgICAgICAgICAgICAgICAgPHA+e1wiVm90cmUgc2NvcmUgOiBcIn08c3BhbiBzdHlsZT17e2ZvbnRXZWlnaHQ6ICdib2xkJ319PntncmFkaW5nLnNjb3JlfTwvc3Bhbj48L3A+fVxuICAgICAgICAgICAgICAgIHtncmFkaW5nLmVycm9yICYmXG4gICAgICAgICAgICAgICAgICAgIDxBbGVydCBic1N0eWxlPSdkYW5nZXInPntncmFkaW5nLmVycm9yfTwvQWxlcnQ+fVxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICk7XG4gICAgfVxuICAgIF92YWxpZGF0ZSA9ICgpID0+IHtcbiAgICAgICAgdGhpcy5wcm9wcy5kaXNwYXRjaCh7dHlwZTogdGhpcy5wcm9wcy5wbGF0Zm9ybVZhbGlkYXRlLCBwYXlsb2FkOiB7bW9kZTogJ2RvbmUnfX0pO1xuICAgIH07XG59XG5cbmV4cG9ydCBkZWZhdWx0IHtcbiAgICBhY3Rpb25zOiB7XG4gICAgICAgIGFwcEluaXQ6ICdBcHAuSW5pdCcsXG4gICAgICAgIGFwcEluaXREb25lOiAnQXBwLkluaXQuRG9uZScsXG4gICAgICAgIGFwcEluaXRGYWlsZWQ6ICdBcHAuSW5pdC5GYWlsZWQnLFxuICAgICAgICBwbGF0Zm9ybVZhbGlkYXRlOiAnUGxhdGZvcm0uVmFsaWRhdGUnLFxuICAgIH0sXG4gICAgYWN0aW9uUmVkdWNlcnM6IHtcbiAgICAgICAgYXBwSW5pdDogYXBwSW5pdFJlZHVjZXIsXG4gICAgICAgIGFwcEluaXREb25lOiBhcHBJbml0RG9uZVJlZHVjZXIsXG4gICAgICAgIGFwcEluaXRGYWlsZWQ6IGFwcEluaXRGYWlsZWRSZWR1Y2VyLFxuICAgIH0sXG4gICAgc2FnYTogYXBwU2FnYSxcbiAgICB2aWV3czoge1xuICAgICAgICBBcHA6IGNvbm5lY3QoQXBwU2VsZWN0b3IpKEFwcClcbiAgICB9LFxuICAgIGluY2x1ZGVzOiBbXG4gICAgICAgIFBsYXRmb3JtQnVuZGxlLFxuICAgICAgICBIaW50c0J1bmRsZSxcbiAgICBdXG59O1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL2FsZ29yZWFfcmVhY3RfdGFzay9hcHBfYnVuZGxlLmpzIiwiXG5pbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IHtCdXR0b259IGZyb20gJ3JlYWN0LWJvb3RzdHJhcCc7XG5cbmZ1bmN0aW9uIFRhc2tCYXIgKHByb3BzKSB7XG4gIHJldHVybiAoXG4gICAgIDxkaXYgY2xhc3NOYW1lPSd0YXNrLWJhcic+XG4gICAgICAgIDxCdXR0b24gb25DbGljaz17cHJvcHMub25WYWxpZGF0ZX0+XG4gICAgICAgICAge1wiVmFsaWRlclwifVxuICAgICAgICA8L0J1dHRvbj5cbiAgICAgPC9kaXY+XG4gICk7XG59XG5cbmV4cG9ydCBkZWZhdWx0IFRhc2tCYXI7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvYWxnb3JlYV9yZWFjdF90YXNrL3VpL3Rhc2tfYmFyLmpzIiwiXG5pbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuXG5mdW5jdGlvbiBTcGlubmVyIChfcHJvcHMpIHtcbiAgcmV0dXJuIChcbiAgICA8ZGl2IGNsYXNzTmFtZT0ndGV4dC1jZW50ZXInIHN0eWxlPXt7Zm9udFNpemU6ICczMDAlJ319PlxuICAgICAgPGkgY2xhc3NOYW1lPVwiZmEgZmEtc3Bpbm5lciBmYS1zcGluXCIvPlxuICAgIDwvZGl2PlxuICApO1xufVxuXG5leHBvcnQgZGVmYXVsdCBTcGlubmVyO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL2FsZ29yZWFfcmVhY3RfdGFzay91aS9zcGlubmVyLmpzIiwiXG5pbXBvcnQge2J1ZmZlcnMsIGV2ZW50Q2hhbm5lbH0gZnJvbSAncmVkdXgtc2FnYSc7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uICgpIHtcbiAgICByZXR1cm4gZXZlbnRDaGFubmVsKGZ1bmN0aW9uIChlbWl0KSB7XG4gICAgICAgIGNvbnN0IHRhc2sgPSBtYWtlVGFzayhlbWl0KTtcbiAgICAgICAgZW1pdCh7dGFza30pO1xuICAgICAgICByZXR1cm4gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgZm9yIChsZXQgcHJvcCBvZiBPYmplY3Qua2V5cyh0YXNrKSkge1xuICAgICAgICAgICAgICAgIHRhc2tbcHJvcF0gPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcigndGFzayBjaGFubmVsIGlzIGNsb3NlZCcpO1xuICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICB9XG4gICAgICAgIH07XG4gICAgfSwgYnVmZmVycy5leHBhbmRpbmcoNCkpO1xufVxuXG5mdW5jdGlvbiBtYWtlVGFzayAoZW1pdCkge1xuICAgIHJldHVybiB7XG4gICAgICAgIHNob3dWaWV3czogZnVuY3Rpb24gKHZpZXdzLCBzdWNjZXNzLCBlcnJvcikge1xuICAgICAgICAgICAgZW1pdCh7dHlwZTogJ3Nob3dWaWV3cycsIHBheWxvYWQ6IHt2aWV3cywgc3VjY2VzcywgZXJyb3J9fSk7XG4gICAgICAgIH0sXG4gICAgICAgIGdldFZpZXdzOiBmdW5jdGlvbiAoc3VjY2VzcywgZXJyb3IpIHtcbiAgICAgICAgICAgIGVtaXQoe3R5cGU6ICdnZXRWaWV3cycsIHBheWxvYWQ6IHtzdWNjZXNzLCBlcnJvcn19KTtcbiAgICAgICAgfSxcbiAgICAgICAgdXBkYXRlVG9rZW46IGZ1bmN0aW9uICh0b2tlbiwgc3VjY2VzcywgZXJyb3IpIHtcbiAgICAgICAgICAgIGVtaXQoe3R5cGU6ICd1cGRhdGVUb2tlbicsIHBheWxvYWQ6IHt0b2tlbiwgc3VjY2VzcywgZXJyb3J9fSk7XG4gICAgICAgIH0sXG4gICAgICAgIGdldEhlaWdodDogZnVuY3Rpb24gKHN1Y2Nlc3MsIGVycm9yKSB7XG4gICAgICAgICAgICBlbWl0KHt0eXBlOiAnZ2V0SGVpZ2h0JywgcGF5bG9hZDoge3N1Y2Nlc3MsIGVycm9yfX0pO1xuICAgICAgICB9LFxuICAgICAgICB1bmxvYWQ6IGZ1bmN0aW9uIChzdWNjZXNzLCBlcnJvcikge1xuICAgICAgICAgICAgZW1pdCh7dHlwZTogJ3VubG9hZCcsIHBheWxvYWQ6IHtzdWNjZXNzLCBlcnJvcn19KTtcbiAgICAgICAgfSxcbiAgICAgICAgZ2V0U3RhdGU6IGZ1bmN0aW9uIChzdWNjZXNzLCBlcnJvcikge1xuICAgICAgICAgICAgZW1pdCh7dHlwZTogJ2dldFN0YXRlJywgcGF5bG9hZDoge3N1Y2Nlc3MsIGVycm9yfX0pO1xuICAgICAgICB9LFxuICAgICAgICBnZXRNZXRhRGF0YTogZnVuY3Rpb24gKHN1Y2Nlc3MsIGVycm9yKSB7XG4gICAgICAgICAgICBlbWl0KHt0eXBlOiAnZ2V0TWV0YURhdGEnLCBwYXlsb2FkOiB7c3VjY2VzcywgZXJyb3J9fSk7XG4gICAgICAgIH0sXG4gICAgICAgIHJlbG9hZEFuc3dlcjogZnVuY3Rpb24gKGFuc3dlciwgc3VjY2VzcywgZXJyb3IpIHtcbiAgICAgICAgICAgIGVtaXQoe3R5cGU6ICdyZWxvYWRBbnN3ZXInLCBwYXlsb2FkOiB7YW5zd2VyLCBzdWNjZXNzLCBlcnJvcn19KTtcbiAgICAgICAgfSxcbiAgICAgICAgcmVsb2FkU3RhdGU6IGZ1bmN0aW9uIChzdGF0ZSwgc3VjY2VzcywgZXJyb3IpIHtcbiAgICAgICAgICAgIGVtaXQoe3R5cGU6ICdyZWxvYWRTdGF0ZScsIHBheWxvYWQ6IHtzdGF0ZSwgc3VjY2VzcywgZXJyb3J9fSk7XG4gICAgICAgIH0sXG4gICAgICAgIGdldEFuc3dlcjogZnVuY3Rpb24gKHN1Y2Nlc3MsIGVycm9yKSB7XG4gICAgICAgICAgICBlbWl0KHt0eXBlOiAnZ2V0QW5zd2VyJywgcGF5bG9hZDoge3N1Y2Nlc3MsIGVycm9yfX0pO1xuICAgICAgICB9LFxuICAgICAgICBsb2FkOiBmdW5jdGlvbiAodmlld3MsIHN1Y2Nlc3MsIGVycm9yKSB7XG4gICAgICAgICAgICBlbWl0KHt0eXBlOiAnbG9hZCcsIHBheWxvYWQ6IHt2aWV3cywgc3VjY2VzcywgZXJyb3J9fSk7XG4gICAgICAgIH0sXG4gICAgICAgIGdyYWRlQW5zd2VyOiBmdW5jdGlvbiAoYW5zd2VyLCBhbnN3ZXJUb2tlbiwgc3VjY2VzcywgZXJyb3IpIHtcbiAgICAgICAgICAgIGVtaXQoe3R5cGU6ICdncmFkZUFuc3dlcicsIHBheWxvYWQ6IHthbnN3ZXIsIGFuc3dlclRva2VuLCBzdWNjZXNzLCBlcnJvcn19KTtcbiAgICAgICAgfSxcbiAgICB9O1xufVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL2FsZ29yZWFfcmVhY3RfdGFzay9sZWdhY3kvdGFzay5qcyIsIlxuaW1wb3J0IGZldGNoUG9ueWZpbGwgZnJvbSAnZmV0Y2gtcG9ueWZpbGwnO1xuXG5jb25zdCB7ZmV0Y2h9ID0gZmV0Y2hQb255ZmlsbCgpO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBtYWtlU2VydmVyQXBpIChjb25maWcpIHtcbiAgICByZXR1cm4gZnVuY3Rpb24gKHNlcnZpY2UsIGFjdGlvbiwgYm9keSkge1xuICAgICAgICByZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkge1xuICAgICAgICAgICAgY29uc3QgdXJsID0gbmV3IFVSTChzZXJ2aWNlLCBjb25maWcuYmFzZVVybCk7XG4gICAgICAgICAgICBjb25zdCBkZXZlbCA9IGNvbmZpZy5kZXZlbCA/IHt0YXNrOiBjb25maWcuZGV2ZWx9IDoge307XG4gICAgICAgICAgICByZXR1cm4gZmV0Y2godXJsLCB7XG4gICAgICAgICAgICAgICAgbWV0aG9kOiAnUE9TVCcsXG4gICAgICAgICAgICAgICAgaGVhZGVyczoge1xuICAgICAgICAgICAgICAgICAgICAnQ29udGVudC1UeXBlJzogJ2FwcGxpY2F0aW9uL2pzb24nLFxuICAgICAgICAgICAgICAgICAgICAnQWNjZXB0JzogJ2FwcGxpY2F0aW9uL2pzb24nLFxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgYm9keTogSlNPTi5zdHJpbmdpZnkoey4uLmJvZHksIC4uLmRldmVsLCBhY3Rpb259KVxuICAgICAgICAgICAgfSkudGhlbihmdW5jdGlvbiAocmVzcG9uc2UpIHtcbiAgICAgICAgICAgICAgICBpZiAocmVzcG9uc2Uuc3RhdHVzICE9PSAyMDApIHJldHVybiByZWplY3QocmVzcG9uc2UpO1xuICAgICAgICAgICAgICAgIHJlc3BvbnNlLmpzb24oKS5jYXRjaChyZWplY3QpLnRoZW4oZnVuY3Rpb24gKHJlc3VsdCkge1xuICAgICAgICAgICAgICAgICAgICBpZiAoIXJlc3VsdC5zdWNjZXNzKSByZXR1cm4gcmVqZWN0KHJlc3VsdC5lcnJvcik7XG4gICAgICAgICAgICAgICAgICAgIHJlc29sdmUocmVzdWx0LmRhdGEpO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfSkuY2F0Y2gocmVqZWN0KTtcbiAgICAgICAgfSk7XG4gICAgfTtcbn1cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9hbGdvcmVhX3JlYWN0X3Rhc2svc2VydmVyX2FwaS5qcyIsIlxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gKHBsYXRmb3JtKSB7XG5cbiAgICBmdW5jdGlvbiBpbml0V2l0aFRhc2sgKHRhc2spIHtcbiAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHtcbiAgICAgICAgICAgIHBsYXRmb3JtLmluaXRXaXRoVGFzayh0YXNrLCByZXNvbHZlLCByZWplY3QpO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBnZXRUYXNrUGFyYW1zIChrZXksIGRlZmF1bHRWYWx1ZSkge1xuICAgICAgICByZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkge1xuICAgICAgICAgICAgcGxhdGZvcm0uZ2V0VGFza1BhcmFtcyhrZXksIGRlZmF1bHRWYWx1ZSwgcmVzb2x2ZSwgcmVqZWN0KTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gYXNrSGludCAoaGludFRva2VuKSB7XG4gICAgICAgIHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KSB7XG4gICAgICAgICAgICBwbGF0Zm9ybS5hc2tIaW50KGhpbnRUb2tlbiwgcmVzb2x2ZSwgcmVqZWN0KTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gdmFsaWRhdGUgKG1vZGUpIHtcbiAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHtcbiAgICAgICAgICAgIHBsYXRmb3JtLnZhbGlkYXRlKG1vZGUsIHJlc29sdmUsIHJlamVjdCk7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIHVwZGF0ZURpc3BsYXkgKG9wdGlvbnMpIHtcbiAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHtcbiAgICAgICAgICAgIHBsYXRmb3JtLnVwZGF0ZURpc3BsYXkob3B0aW9ucywgcmVzb2x2ZSwgcmVqZWN0KTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgcmV0dXJuIHtpbml0V2l0aFRhc2ssIGdldFRhc2tQYXJhbXMsIGFza0hpbnQsIHZhbGlkYXRlLCB1cGRhdGVEaXNwbGF5fTtcblxufVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL2FsZ29yZWFfcmVhY3RfdGFzay9sZWdhY3kvcGxhdGZvcm1fYWRhcHRlci5qcyIsIi8qXG4jIFBlcmZvcm1hbmNlXG4tIHRhc2suZ2V0SGVpZ2h0IGFuZCB0YXNrLmdldEFuc3dlciBhcmUgY2FsbGVkIGV2ZXJ5IHNlY29uZFxuLSB0YXNrLmdldFZpZXdzIGlzIGNhbGxlZCB3aGVuZXZlciB0aGUgd2luZG93J3MgaGVpZ2h0IGNoYW5nZXNcbiovXG5cbmltcG9ydCB7Y2FsbCwgcHV0LCBzZWxlY3QsIHRha2VFdmVyeX0gZnJvbSAncmVkdXgtc2FnYS9lZmZlY3RzJztcbmltcG9ydCBzdHJpbmdpZnkgZnJvbSAnanNvbi1zdGFibGUtc3RyaW5naWZ5LXdpdGhvdXQtanNvbmlmeSc7XG5cbmZ1bmN0aW9uIGFwcEluaXRSZWR1Y2VyIChzdGF0ZSwge3BheWxvYWQ6IHt0YXNrVG9rZW4sIG9wdGlvbnN9fSkge1xuICAgIHJldHVybiB7Li4uc3RhdGUsIGdyYWRpbmc6IHt9fTtcbn1cblxuZnVuY3Rpb24gdGFza0RhdGFMb2FkZWRSZWR1Y2VyIChzdGF0ZSwge3BheWxvYWQ6IHt0YXNrRGF0YX19KSB7XG4gICAgcmV0dXJuIHsuLi5zdGF0ZSwgdGFza0RhdGF9O1xufVxuXG5mdW5jdGlvbiB0YXNrU3RhdGVMb2FkZWRSZWR1Y2VyIChzdGF0ZSwge3BheWxvYWQ6IHtoaW50c319KSB7XG4gICAgcmV0dXJuIHsuLi5zdGF0ZSwgaGludHN9O1xufVxuXG5mdW5jdGlvbiB0YXNrQW5zd2VyTG9hZGVkUmVkdWNlciAoc3RhdGUsIHtwYXlsb2FkOiB7YW5zd2VyfX0pIHtcbiAgICByZXR1cm4gey4uLnN0YXRlLCBhbnN3ZXJ9O1xufVxuXG5mdW5jdGlvbiB0YXNrU2hvd1ZpZXdzRXZlbnRSZWR1Y2VyIChzdGF0ZSwge3BheWxvYWQ6IHt2aWV3c319KSB7XG4gICAgcmV0dXJuIHsuLi5zdGF0ZSwgdGFza1ZpZXdzOiB2aWV3c307XG59XG5cbmZ1bmN0aW9uKiB0YXNrU2hvd1ZpZXdzRXZlbnRTYWdhICh7cGF5bG9hZDoge3N1Y2Nlc3N9fSkge1xuICAgIC8qIFRoZSByZWR1Y2VyIGhhcyBzdG9yZWQgdGhlIHZpZXdzIHRvIHNob3csIGp1c3QgY2FsbCBzdWNjZXNzLiAqL1xuICAgIHlpZWxkIGNhbGwoc3VjY2Vzcyk7XG59XG5cbmZ1bmN0aW9uKiB0YXNrR2V0Vmlld3NFdmVudFNhZ2EgKHtwYXlsb2FkOiB7c3VjY2Vzc319KSB7XG4gICAgLyogWFhYIG9ubHkgdGhlICd0YXNrJyB2aWV3IGlzIGRlY2xhcmVkICovXG4gICAgeWllbGQgY2FsbChzdWNjZXNzLCB7J3Rhc2snOiB7fX0pO1xufVxuXG5mdW5jdGlvbiB0YXNrVXBkYXRlVG9rZW5FdmVudFJlZHVjZXIgKHN0YXRlLCB7cGF5bG9hZDoge3Rva2VufX0pIHtcbiAgICBpZiAodG9rZW4gPT09IG51bGwpIHtcbiAgICAgICAgY29uc29sZS53YXJuKCdpZ25vcmVkIHRhc2sudXBkYXRlVG9rZW4gd2l0aCBudWxsIHRva2VuJyk7XG4gICAgICAgIHJldHVybiBzdGF0ZTtcbiAgICB9XG4gICAgcmV0dXJuIHsuLi5zdGF0ZSwgdGFza1Rva2VuOiB0b2tlbn07XG59XG5mdW5jdGlvbiogdGFza1VwZGF0ZVRva2VuRXZlbnRTYWdhICh7cGF5bG9hZDoge3N1Y2Nlc3N9fSkge1xuICAgIHlpZWxkIGNhbGwoc3VjY2Vzcyk7XG59XG5cbmZ1bmN0aW9uKiB0YXNrR2V0SGVpZ2h0RXZlbnRTYWdhICh7cGF5bG9hZDoge3N1Y2Nlc3N9fSkge1xuICAgIGNvbnN0IGQgPSBkb2N1bWVudDtcbiAgICBjb25zdCBoID0gTWF0aC5tYXgoZC5ib2R5Lm9mZnNldEhlaWdodCwgZC5kb2N1bWVudEVsZW1lbnQub2Zmc2V0SGVpZ2h0KTtcbiAgICB5aWVsZCBjYWxsKHN1Y2Nlc3MsIGgpO1xufVxuXG5mdW5jdGlvbiogdGFza1VubG9hZEV2ZW50U2FnYSAoe3BheWxvYWQ6IHtzdWNjZXNzfX0pIHtcbiAgICAvKiBYWFggTm8gYWN0aW9uIG5lZWRlZD8gKi9cbiAgICB5aWVsZCBjYWxsKHN1Y2Nlc3MpO1xufVxuXG5mdW5jdGlvbiogdGFza0dldE1ldGFEYXRhRXZlbnRTYWdhICh7cGF5bG9hZDoge3N1Y2Nlc3MsIGVycm9yOiBfZXJyb3J9fSkge1xuICAgIGNvbnN0IG1ldGFEYXRhID0geWllbGQgc2VsZWN0KCh7dGFza01ldGFEYXRhfSkgPT4gdGFza01ldGFEYXRhKTtcbiAgICB5aWVsZCBjYWxsKHN1Y2Nlc3MsIG1ldGFEYXRhKTtcbn1cblxuZnVuY3Rpb24qIHRhc2tHZXRBbnN3ZXJFdmVudFNhZ2EgKHtwYXlsb2FkOiB7c3VjY2Vzc319KSB7XG4gICAgY29uc3QgYW5zd2VyID0geWllbGQgc2VsZWN0KHN0YXRlID0+IHN0YXRlLnNlbGVjdG9ycy5nZXRUYXNrQW5zd2VyKHN0YXRlKSk7XG4gICAgY29uc3Qgc3RyQW5zd2VyID0gc3RyaW5naWZ5KGFuc3dlcik7XG4gICAgeWllbGQgY2FsbChzdWNjZXNzLCBzdHJBbnN3ZXIpO1xufVxuXG5mdW5jdGlvbiogdGFza1JlbG9hZEFuc3dlckV2ZW50U2FnYSAoe3BheWxvYWQ6IHthbnN3ZXIsIHN1Y2Nlc3MsIGVycm9yfX0pIHtcbiAgICBjb25zdCB7dGFza0Fuc3dlckxvYWRlZCwgdGFza1JlZnJlc2h9ID0geWllbGQgc2VsZWN0KCh7YWN0aW9uc30pID0+IGFjdGlvbnMpO1xuICAgIHRyeSB7XG4gICAgICAgIGlmIChhbnN3ZXIpIHtcbiAgICAgICAgICAgIHlpZWxkIHB1dCh7dHlwZTogdGFza0Fuc3dlckxvYWRlZCwgcGF5bG9hZDoge2Fuc3dlcjogSlNPTi5wYXJzZShhbnN3ZXIpfX0pO1xuICAgICAgICAgICAgeWllbGQgcHV0KHt0eXBlOiB0YXNrUmVmcmVzaH0pO1xuICAgICAgICB9XG4gICAgICAgIHlpZWxkIGNhbGwoc3VjY2Vzcyk7XG4gICAgfSBjYXRjaCAoZXgpIHtcbiAgICAgICAgeWllbGQgY2FsbChlcnJvciwgYGJhZCBhbnN3ZXI6ICR7ZXgubWVzc2FnZX1gKTtcbiAgICB9XG59XG5cbmZ1bmN0aW9uKiB0YXNrR2V0U3RhdGVFdmVudFNhZ2EgKHtwYXlsb2FkOiB7c3VjY2Vzc319KSB7XG4gICAgY29uc3QgZHVtcCA9IHlpZWxkIHNlbGVjdChzdGF0ZSA9PiBzdGF0ZS5zZWxlY3RvcnMuZ2V0VGFza1N0YXRlKHN0YXRlKSk7XG4gICAgY29uc3Qgc3RyRHVtcCA9IHN0cmluZ2lmeShkdW1wKTtcbiAgICB5aWVsZCBjYWxsKHN1Y2Nlc3MsIHN0ckR1bXApO1xufVxuXG5mdW5jdGlvbiogdGFza1JlbG9hZFN0YXRlRXZlbnRTYWdhICh7cGF5bG9hZDoge3N0YXRlLCBzdWNjZXNzLCBlcnJvcn19KSB7XG4gICAgY29uc3Qge3Rhc2tTdGF0ZUxvYWRlZCwgdGFza1JlZnJlc2h9ID0geWllbGQgc2VsZWN0KCh7YWN0aW9uc30pID0+IGFjdGlvbnMpO1xuICAgIHRyeSB7XG4gICAgICAgIGlmIChzdGF0ZSkge1xuICAgICAgICAgICAgeWllbGQgcHV0KHt0eXBlOiB0YXNrU3RhdGVMb2FkZWQsIHBheWxvYWQ6IHtkdW1wOiBKU09OLnBhcnNlKHN0YXRlKX19KTtcbiAgICAgICAgICAgIHlpZWxkIHB1dCh7dHlwZTogdGFza1JlZnJlc2h9KTtcbiAgICAgICAgfVxuICAgICAgICB5aWVsZCBjYWxsKHN1Y2Nlc3MpO1xuICAgIH0gY2F0Y2ggKGV4KSB7XG4gICAgICAgIHlpZWxkIGNhbGwoZXJyb3IsIGBiYWQgc3RhdGU6ICR7ZXgubWVzc2FnZX1gKTtcbiAgICB9XG59XG5cbmZ1bmN0aW9uKiB0YXNrTG9hZEV2ZW50U2FnYSAoe3BheWxvYWQ6IHt2aWV3czogX3ZpZXdzLCBzdWNjZXNzLCBlcnJvcn19KSB7XG4gICAgY29uc3Qge3Rhc2tEYXRhTG9hZGVkLCB0YXNrSW5pdH0gPSB5aWVsZCBzZWxlY3QoKHthY3Rpb25zfSkgPT4gYWN0aW9ucyk7XG4gICAgLyogVE9ETzogZG8gc29tZXRoaW5nIHdpdGggdmlld3MgKi9cbiAgICB0cnkge1xuICAgICAgICBjb25zdCB7dGFza1Rva2VuLCBzZXJ2ZXJBcGl9ID0geWllbGQgc2VsZWN0KHN0YXRlID0+IHN0YXRlKTtcbiAgICAgICAgY29uc3QgdGFza0RhdGEgPSB5aWVsZCBjYWxsKHNlcnZlckFwaSwgJ3Rhc2tzJywgJ3Rhc2tEYXRhJywge3Rhc2s6IHRhc2tUb2tlbn0pO1xuICAgICAgICB5aWVsZCBwdXQoe3R5cGU6IHRhc2tEYXRhTG9hZGVkLCBwYXlsb2FkOiB7dGFza0RhdGF9fSk7XG4gICAgICAgIHlpZWxkIHB1dCh7dHlwZTogdGFza0luaXR9KTtcbiAgICAgICAgeWllbGQgY2FsbChzdWNjZXNzKTtcbiAgICB9IGNhdGNoIChleCkge1xuICAgICAgICB5aWVsZCBjYWxsKGVycm9yLCBleC50b1N0cmluZygpKTtcbiAgICB9XG59XG5cbmZ1bmN0aW9uKiB0YXNrR3JhZGVBbnN3ZXJFdmVudFNhZ2EgKHtwYXlsb2FkOiB7YW5zd2VyLCBhbnN3ZXJUb2tlbiwgc3VjY2VzcywgZXJyb3J9fSkge1xuICAgIGNvbnN0IHt0YXNrQW5zd2VyR3JhZGVkfSA9IHlpZWxkIHNlbGVjdCgoe2FjdGlvbnN9KSA9PiBhY3Rpb25zKTtcbiAgICBsZXQgcmVzdWx0O1xuICAgIHRyeSB7XG4gICAgICAgIGNvbnN0IHt0YXNrVG9rZW4sIHBsYXRmb3JtQXBpOiB7Z2V0VGFza1BhcmFtc30sIHNlcnZlckFwaX0gPSB5aWVsZCBzZWxlY3Qoc3RhdGUgPT4gc3RhdGUpO1xuICAgICAgICBjb25zdCB7bWluU2NvcmUsIG1heFNjb3JlLCBub1Njb3JlfSA9IHlpZWxkIGNhbGwoZ2V0VGFza1BhcmFtcywgbnVsbCwgbnVsbCk7XG4gICAgICAgIGNvbnN0IHtzY29yZSwgbWVzc2FnZSwgdG9rZW46IHNjb3JlVG9rZW59ID0geWllbGQgY2FsbChzZXJ2ZXJBcGksICd0YXNrcycsICdncmFkZUFuc3dlcicsIHtcbiAgICAgICAgICAgIHRhc2s6IHRhc2tUb2tlbiwgLyogWFhYIHRhc2sgc2hvdWxkIGJlIG5hbWVkIHRhc2tUb2tlbiAqL1xuICAgICAgICAgICAgYW5zd2VyOiBhbnN3ZXJUb2tlbiwgIC8qIFhYWCBhbnN3ZXIgc2hvdWxkIGJlIG5hbWVkIGFuc3dlclRva2VuICovXG4gICAgICAgICAgICBtaW5fc2NvcmU6IG1pblNjb3JlLCAvKiBYWFggbm8gcmVhbCBwb2ludCBwYXNzaW5nIG1pbl9zY29yZSwgbWF4X3Njb3JlLCBub19zY29yZSB0byBzZXJ2ZXItc2lkZSBncmFkZXIgKi9cbiAgICAgICAgICAgIG1heF9zY29yZTogbWF4U2NvcmUsXG4gICAgICAgICAgICBub19zY29yZTogbm9TY29yZVxuICAgICAgICB9KTtcbiAgICAgICAgeWllbGQgcHV0KHt0eXBlOiB0YXNrQW5zd2VyR3JhZGVkLCBwYXlsb2FkOiB7Z3JhZGluZzoge3Njb3JlLCBtZXNzYWdlfX19KTtcbiAgICAgICAgeWllbGQgY2FsbChzdWNjZXNzLCBzY29yZSwgbWVzc2FnZSwgc2NvcmVUb2tlbik7XG4gICAgfSBjYXRjaCAoZXgpIHtcbiAgICAgICAgeWllbGQgcHV0KHt0eXBlOiB0YXNrQW5zd2VyR3JhZGVkLCBwYXlsb2FkOiB7Z3JhZGluZzoge2Vycm9yOiBleC50b1N0cmluZygpfX19KTtcbiAgICAgICAgeWllbGQgY2FsbChlcnJvciwgZXgudG9TdHJpbmcoKSk7XG4gICAgfVxufVxuXG5mdW5jdGlvbiB0YXNrQW5zd2VyR3JhZGVkUmVkdWNlciAoc3RhdGUsIHtwYXlsb2FkOiB7Z3JhZGluZ319KSB7XG4gICAgcmV0dXJuIHsuLi5zdGF0ZSwgZ3JhZGluZ307XG59XG5cbmV4cG9ydCBkZWZhdWx0IHtcbiAgICBhY3Rpb25zOiB7XG4gICAgICAgIHRhc2tJbml0OiAnVGFzay5Jbml0JyxcbiAgICAgICAgdGFza1JlZnJlc2g6ICdUYXNrLlJlZnJlc2gnLFxuICAgICAgICB0YXNrTG9hZEV2ZW50OiAnVGFzay5FdmVudC5Mb2FkJyAvKiB7dmlld3MsIHN1Y2Nlc3MsIGVycm9yfSAqLyxcbiAgICAgICAgdGFza1VubG9hZEV2ZW50OiAnVGFzay5FdmVudC5VbmxvYWQnIC8qIHtzdWNjZXNzLCBlcnJvcn0gKi8sXG4gICAgICAgIHRhc2tVcGRhdGVUb2tlbkV2ZW50OiAnVGFzay5FdmVudC5VcGRhdGVUb2tlbicgLyoge3Rva2VuLCBzdWNjZXNzLCBlcnJvcn0gKi8sXG4gICAgICAgIHRhc2tHZXRIZWlnaHRFdmVudDogJ1Rhc2suRXZlbnQuR2V0SGVpZ2h0JyAvKiB7c3VjY2VzcywgZXJyb3J9ICovLFxuICAgICAgICB0YXNrR2V0TWV0YURhdGFFdmVudDogJ1Rhc2suRXZlbnQuR2V0TWV0YURhdGEnIC8qIHtzdWNjZXNzLCBlcnJvcn0gKi8sXG4gICAgICAgIHRhc2tHZXRWaWV3c0V2ZW50OiAnVGFzay5FdmVudC5HZXRWaWV3cycgLyoge3N1Y2Nlc3MsIGVycm9yfSAqLyxcbiAgICAgICAgdGFza1Nob3dWaWV3c0V2ZW50OiAnVGFzay5FdmVudC5TaG93Vmlld3MnIC8qIHt2aWV3cywgc3VjY2VzcywgZXJyb3J9ICovLFxuICAgICAgICB0YXNrR2V0U3RhdGVFdmVudDogJ1Rhc2suRXZlbnQuR2V0U3RhdGUnIC8qIHtzdWNjZXNzLCBlcnJvcn0gKi8sXG4gICAgICAgIHRhc2tSZWxvYWRTdGF0ZUV2ZW50OiAnVGFzay5FdmVudC5SZWxvYWRTdGF0ZScgLyoge3N0YXRlLCBzdWNjZXNzLCBlcnJvcn0gKi8sXG4gICAgICAgIHRhc2tHZXRBbnN3ZXJFdmVudDogJ1Rhc2suRXZlbnQuR2V0QW5zd2VyJyAvKiB7c3VjY2VzcywgZXJyb3J9ICovLFxuICAgICAgICB0YXNrUmVsb2FkQW5zd2VyRXZlbnQ6ICdUYXNrLkV2ZW50LlJlbG9hZEFuc3dlcicgLyoge2Fuc3dlciwgc3VjY2VzcywgZXJyb3J9ICovLFxuICAgICAgICB0YXNrR3JhZGVBbnN3ZXJFdmVudDogJ1Rhc2suRXZlbnQuR3JhZGVBbnN3ZXInIC8qIHthbnN3ZXIsIGFuc3dlclRva2VuLCBzdWNjZXNzLCBlcnJvcn0gKi8sXG4gICAgICAgIHRhc2tEYXRhTG9hZGVkOiAnVGFzay5EYXRhLkxvYWRlZCcsXG4gICAgICAgIHRhc2tTdGF0ZUxvYWRlZDogJ1Rhc2suU3RhdGUuTG9hZGVkJyxcbiAgICAgICAgdGFza0Fuc3dlckxvYWRlZDogJ1Rhc2suQW5zd2VyLkxvYWRlZCcsXG4gICAgICAgIHRhc2tBbnN3ZXJHcmFkZWQ6ICdUYXNrLkFuc3dlci5HcmFkZWQnLFxuICAgIH0sXG4gICAgYWN0aW9uUmVkdWNlcnM6IHtcbiAgICAgICAgYXBwSW5pdDogYXBwSW5pdFJlZHVjZXIsXG4gICAgICAgIHRhc2tTaG93Vmlld3NFdmVudDogdGFza1Nob3dWaWV3c0V2ZW50UmVkdWNlcixcbiAgICAgICAgdGFza1VwZGF0ZVRva2VuRXZlbnQ6IHRhc2tVcGRhdGVUb2tlbkV2ZW50UmVkdWNlcixcbiAgICAgICAgdGFza0RhdGFMb2FkZWQ6IHRhc2tEYXRhTG9hZGVkUmVkdWNlcixcbiAgICAgICAgdGFza1N0YXRlTG9hZGVkOiB0YXNrU3RhdGVMb2FkZWRSZWR1Y2VyLFxuICAgICAgICB0YXNrQW5zd2VyTG9hZGVkOiB0YXNrQW5zd2VyTG9hZGVkUmVkdWNlcixcbiAgICAgICAgdGFza0Fuc3dlckdyYWRlZDogdGFza0Fuc3dlckdyYWRlZFJlZHVjZXIsXG4gICAgfSxcbiAgICBzYWdhOiBmdW5jdGlvbiogKCkge1xuICAgICAgICBjb25zdCBhY3Rpb25zID0geWllbGQgc2VsZWN0KCh7YWN0aW9uc30pID0+IGFjdGlvbnMpO1xuICAgICAgICB5aWVsZCB0YWtlRXZlcnkoYWN0aW9ucy50YXNrU2hvd1ZpZXdzRXZlbnQsIHRhc2tTaG93Vmlld3NFdmVudFNhZ2EpO1xuICAgICAgICB5aWVsZCB0YWtlRXZlcnkoYWN0aW9ucy50YXNrR2V0Vmlld3NFdmVudCwgdGFza0dldFZpZXdzRXZlbnRTYWdhKTtcbiAgICAgICAgeWllbGQgdGFrZUV2ZXJ5KGFjdGlvbnMudGFza1VwZGF0ZVRva2VuRXZlbnQsIHRhc2tVcGRhdGVUb2tlbkV2ZW50U2FnYSk7XG4gICAgICAgIHlpZWxkIHRha2VFdmVyeShhY3Rpb25zLnRhc2tHZXRIZWlnaHRFdmVudCwgdGFza0dldEhlaWdodEV2ZW50U2FnYSk7XG4gICAgICAgIHlpZWxkIHRha2VFdmVyeShhY3Rpb25zLnRhc2tVbmxvYWRFdmVudCwgdGFza1VubG9hZEV2ZW50U2FnYSk7XG4gICAgICAgIHlpZWxkIHRha2VFdmVyeShhY3Rpb25zLnRhc2tHZXRTdGF0ZUV2ZW50LCB0YXNrR2V0U3RhdGVFdmVudFNhZ2EpO1xuICAgICAgICB5aWVsZCB0YWtlRXZlcnkoYWN0aW9ucy50YXNrR2V0TWV0YURhdGFFdmVudCwgdGFza0dldE1ldGFEYXRhRXZlbnRTYWdhKTtcbiAgICAgICAgeWllbGQgdGFrZUV2ZXJ5KGFjdGlvbnMudGFza1JlbG9hZEFuc3dlckV2ZW50LCB0YXNrUmVsb2FkQW5zd2VyRXZlbnRTYWdhKTtcbiAgICAgICAgeWllbGQgdGFrZUV2ZXJ5KGFjdGlvbnMudGFza1JlbG9hZFN0YXRlRXZlbnQsIHRhc2tSZWxvYWRTdGF0ZUV2ZW50U2FnYSk7XG4gICAgICAgIHlpZWxkIHRha2VFdmVyeShhY3Rpb25zLnRhc2tHZXRBbnN3ZXJFdmVudCwgdGFza0dldEFuc3dlckV2ZW50U2FnYSk7XG4gICAgICAgIHlpZWxkIHRha2VFdmVyeShhY3Rpb25zLnRhc2tMb2FkRXZlbnQsIHRhc2tMb2FkRXZlbnRTYWdhKTtcbiAgICAgICAgeWllbGQgdGFrZUV2ZXJ5KGFjdGlvbnMudGFza0dyYWRlQW5zd2VyRXZlbnQsIHRhc2tHcmFkZUFuc3dlckV2ZW50U2FnYSk7XG4gICAgfVxufTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9hbGdvcmVhX3JlYWN0X3Rhc2svcGxhdGZvcm1fYnVuZGxlLmpzIiwiXG5pbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IHtBbGVydH0gZnJvbSAncmVhY3QtYm9vdHN0cmFwJztcbmltcG9ydCB7Y29ubmVjdH0gZnJvbSAncmVhY3QtcmVkdXgnO1xuaW1wb3J0IHtjYWxsLCBwdXQsIHNlbGVjdCwgdGFrZUV2ZXJ5fSBmcm9tICdyZWR1eC1zYWdhL2VmZmVjdHMnO1xuaW1wb3J0IHVwZGF0ZSBmcm9tICdpbW11dGFiaWxpdHktaGVscGVyJztcblxuZnVuY3Rpb24gaGludFJlcXVlc3RGdWxmaWxsZWRSZWR1Y2VyIChzdGF0ZSwgX2FjdGlvbikge1xuICAgIHJldHVybiB7Li4uc3RhdGUsIGhpbnRSZXF1ZXN0OiB7c3VjY2VzczogdHJ1ZX19O1xufVxuXG5mdW5jdGlvbiBoaW50UmVxdWVzdFJlamVjdGVkUmVkdWNlciAoc3RhdGUsIHtwYXlsb2FkOiB7Y29kZSwgZXJyb3J9fSkge1xuICAgIHJldHVybiB7Li4uc3RhdGUsIGhpbnRSZXF1ZXN0OiB7c3VjY2VzczogZmFsc2UsIGNvZGUsIGVycm9yfX07XG59XG5cbmZ1bmN0aW9uIGhpbnRSZXF1ZXN0RmVlZGJhY2tDbGVhcmVkUmVkdWNlciAoc3RhdGUsIF9hY3Rpb24pIHtcbiAgICByZXR1cm4gey4uLnN0YXRlLCBoaW50UmVxdWVzdDogZmFsc2V9O1xufVxuXG5mdW5jdGlvbiogcmVxdWVzdEhpbnRTYWdhICh7cGF5bG9hZDoge3JlcXVlc3R9fSkge1xuICAgIGNvbnN0IGFjdGlvbnMgPSB5aWVsZCBzZWxlY3QoKHthY3Rpb25zfSkgPT4gYWN0aW9ucyk7XG4gICAgbGV0IGNvZGUgPSAwO1xuICAgIHRyeSB7XG4gICAgICAgIGNvbnN0IHthY3Rpb25zLCB0YXNrVG9rZW46IGluaXRpYWxUYXNrVG9rZW4sIHNlcnZlckFwaX0gPSB5aWVsZCBzZWxlY3Qoc3RhdGUgPT4gc3RhdGUpO1xuICAgICAgICBjb2RlID0gMTA7XG4gICAgICAgIGNvbnN0IHthc2tIaW50fSA9IHlpZWxkIHNlbGVjdChzdGF0ZSA9PiBzdGF0ZS5wbGF0Zm9ybUFwaSk7XG4gICAgICAgIGNvZGUgPSAyMDtcbiAgICAgICAgLyogQ29udGFjdCBzZXJ2ZXJBcGkgdG8gb2J0YWluIGEgaGludFRva2VuIGZvciB0aGUgcmVxdWVzdGVkIGhpbnQuICovXG4gICAgICAgIGNvbnN0IHtoaW50VG9rZW59ID0geWllbGQgY2FsbChzZXJ2ZXJBcGksICd0YXNrcycsICdyZXF1ZXN0SGludCcsIHt0YXNrOiBpbml0aWFsVGFza1Rva2VuLCByZXF1ZXN0fSk7XG4gICAgICAgIGNvZGUgPSAzMDtcbiAgICAgICAgLyogQ29udGFjdCB0aGUgcGxhdGZvcm0gdG8gYXV0aG9yaXplIHRoZSBoaW50IHJlcXVlc3QuICovXG4gICAgICAgIHlpZWxkIGNhbGwoYXNrSGludCwgaGludFRva2VuKTtcbiAgICAgICAgY29kZSA9IDQwO1xuICAgICAgICAvKiBXaGVuIGFza0hpbnQgcmV0dXJucyBhbiB1cGRhdGVkIHRhc2tUb2tlbiBpcyBvYnRhaW5lZCBmcm9tIHRoZSBzdG9yZS4gKi9cbiAgICAgICAgY29uc3QgdXBkYXRlZFRhc2tUb2tlbiA9IHlpZWxkIHNlbGVjdChzdGF0ZSA9PiBzdGF0ZS50YXNrVG9rZW4pO1xuICAgICAgICBjb2RlID0gNTA7XG4gICAgICAgIC8qIEZpbmFsbHksIGNvbnRhY3QgdGhlIHNlcnZlckFwaSB0byBvYnRhaW4gdGhlIHVwZGF0ZWQgdGFza0RhdGEuICovXG4gICAgICAgIGNvbnN0IHRhc2tEYXRhID0geWllbGQgY2FsbChzZXJ2ZXJBcGksICd0YXNrcycsICd0YXNrRGF0YScsIHt0YXNrOiB1cGRhdGVkVGFza1Rva2VufSk7XG4gICAgICAgIGNvZGUgPSA2MDtcbiAgICAgICAgeWllbGQgcHV0KHt0eXBlOiBhY3Rpb25zLnRhc2tEYXRhTG9hZGVkLCBwYXlsb2FkOiB7dGFza0RhdGF9fSk7XG4gICAgICAgIHlpZWxkIHB1dCh7dHlwZTogYWN0aW9ucy50YXNrUmVmcmVzaH0pO1xuICAgICAgICB5aWVsZCBwdXQoe3R5cGU6IGFjdGlvbnMuaGludFJlcXVlc3RGdWxmaWxsZWQsIHBheWxvYWQ6IHt9fSk7XG4gICAgfSBjYXRjaCAoZXgpIHtcbiAgICAgICAgeWllbGQgcHV0KHt0eXBlOiBhY3Rpb25zLmhpbnRSZXF1ZXN0UmVqZWN0ZWQsIHBheWxvYWQ6IHtjb2RlOiBjb2RlLCBlcnJvcjogZXh9fSk7XG4gICAgfVxufVxuXG5mdW5jdGlvbiBIaW50UmVxdWVzdEZlZWRiYWNrU2VsZWN0b3IgKHN0YXRlKSB7XG4gICAgY29uc3Qge2FjdGlvbnMsIGhpbnRSZXF1ZXN0fSA9IHN0YXRlO1xuICAgIGlmICghaGludFJlcXVlc3QpIHJldHVybiB7fTtcbiAgICBjb25zdCB7aGludFJlcXVlc3RGZWVkYmFja0NsZWFyZWR9ID0gYWN0aW9ucztcbiAgICBjb25zdCB7c3VjY2VzcywgY29kZSwgZXJyb3J9ID0gaGludFJlcXVlc3Q7XG4gICAgcmV0dXJuIHt2aXNpYmxlOiB0cnVlLCBzdWNjZXNzLCBjb2RlLCBlcnJvciwgaGludFJlcXVlc3RGZWVkYmFja0NsZWFyZWR9O1xufVxuXG5jbGFzcyBIaW50UmVxdWVzdEZlZWRiYWNrIGV4dGVuZHMgUmVhY3QuUHVyZUNvbXBvbmVudCB7XG4gICAgcmVuZGVyICgpIHtcbiAgICAgICAgY29uc3Qge3Zpc2libGUsIHN1Y2Nlc3N9ID0gdGhpcy5wcm9wcztcbiAgICAgICAgaWYgKCF2aXNpYmxlKSByZXR1cm4gZmFsc2U7XG4gICAgICAgIGlmIChzdWNjZXNzKSB7XG4gICAgICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgICAgIDxBbGVydCBic1N0eWxlPSdzdWNjZXNzJyBvbkRpc21pc3M9e3RoaXMuaGFuZGxlRGlzbWlzc30+XG4gICAgICAgICAgICAgICAgICAgIDxwPntcIkwnaW5kaWNlIGRlbWFuZMOpIGEgw6l0w6kgZMOpbGl2csOpLlwifTwvcD5cbiAgICAgICAgICAgICAgICA8L0FsZXJ0PlxuICAgICAgICAgICAgKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGNvbnN0IHtjb2RlLCBlcnJvcn0gPSB0aGlzLnByb3BzO1xuICAgICAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgICAgICA8QWxlcnQgYnNTdHlsZT0nZGFuZ2VyJyBvbkRpc21pc3M9e3RoaXMuaGFuZGxlRGlzbWlzc30+XG4gICAgICAgICAgICAgICAgICAgIDxwPntcIkwnaW5kaWNlIGRlbWFuZMOpIG4nYSBwYXMgcHUgw6p0cmUgZMOpbGl2csOpLlwifTwvcD5cbiAgICAgICAgICAgICAgICAgICAgPHA+e1wiQ29kZSBcIn17Y29kZX08L3A+XG4gICAgICAgICAgICAgICAgICAgIHtlcnJvci5zdGF0dXMgJiYgPHA+e1wiRXJyZXVyIHNlcnZldXIgXCJ9e2Vycm9yLnN0YXR1c308L3A+fVxuICAgICAgICAgICAgICAgICAgICB7ZXJyb3IubWVzc2FnZSAmJiA8cD57ZXJyb3IudG9TdHJpbmcoKX08L3A+fVxuICAgICAgICAgICAgICAgIDwvQWxlcnQ+XG4gICAgICAgICAgICApO1xuICAgICAgICB9XG4gICAgfVxuICAgIGhhbmRsZURpc21pc3MgPSAoKSA9PiB7XG4gICAgICAgIHRoaXMucHJvcHMuZGlzcGF0Y2goe3R5cGU6IHRoaXMucHJvcHMuaGludFJlcXVlc3RGZWVkYmFja0NsZWFyZWQsIHBheWxvYWQ6IHt9fSk7XG4gICAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCB7XG4gICAgYWN0aW9uczoge1xuICAgICAgICByZXF1ZXN0SGludDogJ0hpbnQuUmVxdWVzdCcsXG4gICAgICAgIGhpbnRSZXF1ZXN0RnVsZmlsbGVkOiAnSGludC5SZXF1ZXN0LkZ1bGZpbGxlZCcsXG4gICAgICAgIGhpbnRSZXF1ZXN0UmVqZWN0ZWQ6ICdIaW50LlJlcXVlc3QuUmVqZWN0ZWQnLFxuICAgICAgICBoaW50UmVxdWVzdEZlZWRiYWNrQ2xlYXJlZDogJ0hpbnQuUmVxdWVzdC5GZWVkYmFja0NsZWFyZWQnLFxuICAgIH0sXG4gICAgYWN0aW9uUmVkdWNlcnM6IHtcbiAgICAgICAgaGludFJlcXVlc3RGdWxmaWxsZWQ6IGhpbnRSZXF1ZXN0RnVsZmlsbGVkUmVkdWNlcixcbiAgICAgICAgaGludFJlcXVlc3RSZWplY3RlZDogaGludFJlcXVlc3RSZWplY3RlZFJlZHVjZXIsXG4gICAgICAgIGhpbnRSZXF1ZXN0RmVlZGJhY2tDbGVhcmVkOiBoaW50UmVxdWVzdEZlZWRiYWNrQ2xlYXJlZFJlZHVjZXIsXG4gICAgfSxcbiAgICB2aWV3czoge1xuICAgICAgICBIaW50UmVxdWVzdEZlZWRiYWNrOiBjb25uZWN0KEhpbnRSZXF1ZXN0RmVlZGJhY2tTZWxlY3RvcikoSGludFJlcXVlc3RGZWVkYmFjaylcbiAgICB9LFxuICAgIHNhZ2E6IGZ1bmN0aW9uKiBoaW50c1NhZ2EgKCkge1xuICAgICAgICBjb25zdCBhY3Rpb25zID0geWllbGQgc2VsZWN0KCh7YWN0aW9uc30pID0+IGFjdGlvbnMpO1xuICAgICAgICB5aWVsZCB0YWtlRXZlcnkoYWN0aW9ucy5yZXF1ZXN0SGludCwgcmVxdWVzdEhpbnRTYWdhKTtcbiAgICB9XG59O1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL2FsZ29yZWFfcmVhY3RfdGFzay9oaW50c19idW5kbGUuanMiLCJcbmltcG9ydCB7Y2FsbCwgdGFrZX0gZnJvbSAncmVkdXgtc2FnYS9lZmZlY3RzJztcbmltcG9ydCB7YnVmZmVycywgZXZlbnRDaGFubmVsfSBmcm9tICdyZWR1eC1zYWdhJztcblxuZXhwb3J0IGZ1bmN0aW9uKiB3aW5kb3dIZWlnaHRNb25pdG9yU2FnYSAocGxhdGZvcm1BcGkpIHtcbiAgICBjb25zdCBjaGFubmVsID0gZXZlbnRDaGFubmVsKGVtaXQgPT4ge1xuICAgICAgICBmdW5jdGlvbiBvblJlc2l6ZSAoKSB7XG4gICAgICAgICAgICBjb25zdCBoZWlnaHQgPSB3aW5kb3cuZG9jdW1lbnQuYm9keS5jbGllbnRIZWlnaHQ7XG4gICAgICAgICAgICBlbWl0KHtoZWlnaHR9KTtcbiAgICAgICAgfVxuICAgICAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcigncmVzaXplJywgb25SZXNpemUpO1xuICAgICAgICByZXR1cm4gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgd2luZG93LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ3Jlc2l6ZScsIG9uUmVzaXplKTtcbiAgICAgICAgfTtcbiAgICB9LCBidWZmZXJzLnNsaWRpbmcoMSkpO1xuICAgIHRyeSB7XG4gICAgICAgIGxldCBsYXN0SGVpZ2h0O1xuICAgICAgICB3aGlsZSAodHJ1ZSkge1xuICAgICAgICAgICAgY29uc3Qge2hlaWdodH0gPSB5aWVsZCB0YWtlKGNoYW5uZWwpO1xuICAgICAgICAgICAgaWYgKGhlaWdodCAhPT0gbGFzdEhlaWdodCkge1xuICAgICAgICAgICAgICAgIHlpZWxkIGNhbGwocGxhdGZvcm1BcGkudXBkYXRlRGlzcGxheSwge2hlaWdodH0pO1xuICAgICAgICAgICAgICAgIGxhc3RIZWlnaHQgPSBoZWlnaHQ7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9IGZpbmFsbHkge1xuICAgICAgICBjaGFubmVsLmNsb3NlKCk7XG4gICAgfVxufVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL2FsZ29yZWFfcmVhY3RfdGFzay93aW5kb3dfaGVpZ2h0X21vbml0b3IuanMiLCIvLyBzdHlsZS1sb2FkZXI6IEFkZHMgc29tZSBjc3MgdG8gdGhlIERPTSBieSBhZGRpbmcgYSA8c3R5bGU+IHRhZ1xuXG4vLyBsb2FkIHRoZSBzdHlsZXNcbnZhciBjb250ZW50ID0gcmVxdWlyZShcIiEhLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvaW5kZXguanM/P3JlZi0tMS0xIS4vc3R5bGUuY3NzXCIpO1xuaWYodHlwZW9mIGNvbnRlbnQgPT09ICdzdHJpbmcnKSBjb250ZW50ID0gW1ttb2R1bGUuaWQsIGNvbnRlbnQsICcnXV07XG4vLyBQcmVwYXJlIGNzc1RyYW5zZm9ybWF0aW9uXG52YXIgdHJhbnNmb3JtO1xuXG52YXIgb3B0aW9ucyA9IHtcInNvdXJjZU1hcFwiOnRydWUsXCJobXJcIjp0cnVlfVxub3B0aW9ucy50cmFuc2Zvcm0gPSB0cmFuc2Zvcm1cbi8vIGFkZCB0aGUgc3R5bGVzIHRvIHRoZSBET01cbnZhciB1cGRhdGUgPSByZXF1aXJlKFwiIS4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvbGliL2FkZFN0eWxlcy5qc1wiKShjb250ZW50LCBvcHRpb25zKTtcbmlmKGNvbnRlbnQubG9jYWxzKSBtb2R1bGUuZXhwb3J0cyA9IGNvbnRlbnQubG9jYWxzO1xuLy8gSG90IE1vZHVsZSBSZXBsYWNlbWVudFxuaWYobW9kdWxlLmhvdCkge1xuXHQvLyBXaGVuIHRoZSBzdHlsZXMgY2hhbmdlLCB1cGRhdGUgdGhlIDxzdHlsZT4gdGFnc1xuXHRpZighY29udGVudC5sb2NhbHMpIHtcblx0XHRtb2R1bGUuaG90LmFjY2VwdChcIiEhLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvaW5kZXguanM/P3JlZi0tMS0xIS4vc3R5bGUuY3NzXCIsIGZ1bmN0aW9uKCkge1xuXHRcdFx0dmFyIG5ld0NvbnRlbnQgPSByZXF1aXJlKFwiISEuLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9pbmRleC5qcz8/cmVmLS0xLTEhLi9zdHlsZS5jc3NcIik7XG5cdFx0XHRpZih0eXBlb2YgbmV3Q29udGVudCA9PT0gJ3N0cmluZycpIG5ld0NvbnRlbnQgPSBbW21vZHVsZS5pZCwgbmV3Q29udGVudCwgJyddXTtcblx0XHRcdHVwZGF0ZShuZXdDb250ZW50KTtcblx0XHR9KTtcblx0fVxuXHQvLyBXaGVuIHRoZSBtb2R1bGUgaXMgZGlzcG9zZWQsIHJlbW92ZSB0aGUgPHN0eWxlPiB0YWdzXG5cdG1vZHVsZS5ob3QuZGlzcG9zZShmdW5jdGlvbigpIHsgdXBkYXRlKCk7IH0pO1xufVxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vc3JjL3N0eWxlLmNzc1xuLy8gbW9kdWxlIGlkID0gNTY2XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsImV4cG9ydHMgPSBtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCIuLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9saWIvY3NzLWJhc2UuanNcIikoZmFsc2UpO1xuLy8gaW1wb3J0c1xuXG5cbi8vIG1vZHVsZVxuZXhwb3J0cy5wdXNoKFttb2R1bGUuaWQsIFwiI2NvbnRhaW5lciB7XFxuICAgIHVzZXItc2VsZWN0OiBub25lO1xcbiAgICAtbW96LXVzZXItc2VsZWN0OiBub25lO1xcbiAgICAtd2Via2l0LXVzZXItc2VsZWN0OiBub25lO1xcbiAgICAtbXMtdXNlci1zZWxlY3Q6IG5vbmU7XFxuXFx0d2lkdGg6IDgwMHB4O1xcbn1cXG4udGFza0luc3RydWN0aW9ucyB7XFxuICAgIHRleHQtYWxpZ246IGp1c3RpZnk7XFxufVxcbi50YXNrSW5zdHJ1Y3Rpb25zIHRhYmxlLnByZSB7XFxuICAgIG1hcmdpbjogMTBweCBhdXRvO1xcbn1cXG4udGFza0luc3RydWN0aW9ucyB0YWJsZS5wcmUgdGQge1xcbiAgICBwYWRkaW5nOiA0cHggMTBweDtcXG59XFxuLnRhc2tJbnN0cnVjdGlvbnMgLmxpc3QtdW5zdHlsZWQge1xcbiAgICBwYWRkaW5nLWxlZnQ6IDMwcHg7XFxufVxcbi50ZXh0LWJvbGQge1xcbiAgICBmb250LXdlaWdodDogYm9sZDtcXG59XFxuLnRhc2tXcmFwcGVyIC50YXNrSW5zdHJ1Y3Rpb25zIHtcXG4gICAgcGFkZGluZy10b3A6IDMwcHg7XFxuICAgIHBvc2l0aW9uOiByZWxhdGl2ZTtcXG59XFxuLnRvcFBsYWluV29yZENvbnRhaW5lciB7XFxuICAgIG1hcmdpbjogMTBweCAyMHB4O1xcbiAgICBoZWlnaHQ6IDM0cHg7XFxufVxcbi50b3BQbGFpbldvcmQge1xcbiAgICBmb250LWZhbWlseTogTHVjaWRhIENvbnNvbGUsTW9uYWNvLG1vbm9zcGFjZTtcXG4gICAgZm9udC1zaXplOiAxOHB4O1xcbiAgICBkaXNwbGF5OiBpbmxpbmUtYmxvY2s7XFxuICAgIG1hcmdpbi1yaWdodDogMjBweDtcXG4gICAgYmFja2dyb3VuZC1jb2xvcjogI2ZmZjtcXG4gICAgYm9yZGVyOiAxcHggc29saWQgIzc3NztcXG4gICAgYm94LXNoYWRvdzogM3B4IDJweCAzcHggI2NjYztcXG4gICAgbGluZS1oZWlnaHQ6IDI3cHg7XFxuICAgIGxldHRlci1zcGFjaW5nOiAxMHB4O1xcbiAgICBwYWRkaW5nLWxlZnQ6IDVweDtcXG59XFxuLmhpbnRzRGlhbG9nIHtcXG4gIHdpZHRoOiA1MCU7XFxuICBtYXgtd2lkdGg6IDQwMHB4O1xcbiAgYmFja2dyb3VuZDogI2YwZjBmMDtcXG4gIGJvcmRlcjogMXB4IHNvbGlkIGJsYWNrO1xcbiAgYm9yZGVyLXJhZGl1czogM3B4O1xcbiAgcGFkZGluZzogNXB4O1xcbiAgcG9zaXRpb246IGFic29sdXRlO1xcbiAgYm90dG9tOiAxNXB4O1xcbiAgcmlnaHQ6IDE1cHg7XFxuICB6LWluZGV4OiAxO1xcbn1cXG4uaGludHNEaWFsb2cgcCB7XFxuICAgIG1hcmdpbi1ib3R0b206IDVweDtcXG59XFxuLmhpbnRzRGlhbG9nIGJ1dHRvbiArIGJ1dHRvbiB7XFxuICAgIG1hcmdpbi1sZWZ0OiAxMHB4O1xcbn1cXG4ua2V5VGFibGUge1xcbiAgICBtYXJnaW4tdG9wOiAxMHB4O1xcbn1cXG4ua2V5VGFibGUgc3BhbiB7XFxuICAgIHdpZHRoOiAyMHB4O1xcbiAgICBkaXNwbGF5OiBpbmxpbmUtYmxvY2s7XFxuICAgIG1hcmdpbi1yaWdodDogMnB4O1xcbiAgICB0ZXh0LWFsaWduOiBjZW50ZXI7XFxufVxcbi5rZXlUYWJsZSBzcGFuIGJ1dHRvbiB7XFxuICAgIHBhZGRpbmc6IDA7XFxuICAgIHdpZHRoOiAxMDAlO1xcbiAgICBib3JkZXI6IG5vbmU7XFxufVxcbi5rZXlUYWJsZSAua2V5VmFsdWUge1xcbiAgICBib3JkZXI6IDFweCBzb2xpZCAjY2NjO1xcbiAgICBib3JkZXItcmFkaXVzOiA0cHg7XFxuICAgIGN1cnNvcjogcG9pbnRlcjtcXG59XFxuLmtleVRhYmxlIC5rZXlWYWx1ZS5pcy1oaW50IHtcXG4gICAgYm9yZGVyOiBub25lO1xcbiAgICBjdXJzb3I6IGRlZmF1bHQ7XFxuICAgIGZvbnQtd2VpZ2h0OiBib2xkO1xcbn1cXG4ua2V5VGFibGUgLmtleVZhbHVlLmlzLWhpbnQtcmVxdWVzdCB7XFxuICAgIGJhY2tncm91bmQ6ICMwMDA7XFxuICAgIGNvbG9yOiAjZmZmO1xcbiAgICBmb250LXdlaWdodDogYm9sZDtcXG59XFxuLmlzLWhpbnQtbWlzbWF0Y2gge1xcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjZmY0NDQ0ICFpbXBvcnRhbnQ7XFxufVxcblxcbi5jaXBoZXJzQW5kUGxhaW5zIHtcXG4gICAgZm9udC1mYW1pbHk6IEx1Y2lkYSBDb25zb2xlLE1vbmFjbyxtb25vc3BhY2U7XFxuICAgIGZvbnQtc2l6ZTogMThweDtcXG59XFxuLmNpcGhlclRhYmxlIHtcXG4gICAgbWFyZ2luLXRvcDogMjBweDtcXG59XFxuLnBsYWluVGFibGUge1xcbiAgICBiYWNrZ3JvdW5kOiAjZWZlZmVmO1xcbn1cXG4uY2lwaGVyc0FuZFBsYWlucyBzcGFuIHtcXG4gICAgd2lkdGg6IDIwcHg7XFxuICAgIGRpc3BsYXk6IGlubGluZS1ibG9jaztcXG4gICAgbWFyZ2luLXJpZ2h0OiAycHg7XFxuICAgIHRleHQtYWxpZ246IGNlbnRlcjtcXG4gICAgYm9yZGVyOiAxcHggc29saWQgI2NjYztcXG4gICAgaGVpZ2h0OiAyN3B4O1xcbiAgICB2ZXJ0aWNhbC1hbGlnbjogYm90dG9tO1xcbn1cXG4uY2lwaGVyVGFibGUgc3BhbiB7Ym9yZGVyLWJvdHRvbTogbm9uZTt9XFxuLnBsYWluVGFibGUgc3BhbiB7Ym9yZGVyLXRvcDogbm9uZTt9XFxuLnBsYWluVGFibGUgLnBsYWluQ2hhciB7XFxuICAgIGJhY2tncm91bmQtY29sb3I6ICNmZmY7XFxuICAgIGJveC1zaGFkb3c6IDNweCAycHggM3B4ICNjY2M7XFxuICAgIGJvcmRlci10b3A6IDFweCBzb2xpZDtcXG4gICAgYm9yZGVyLWNvbG9yOiAjNzc3O1xcbiAgICBiYWNrZ3JvdW5kLWNsaXA6IGNvbnRlbnQtYm94O1xcbn1cXG4ucGxhaW5DaGFyICsgLnBsYWluQ2hhciB7XFxuICAgIG1hcmdpbi1sZWZ0OiAtNHB4O1xcbiAgICBib3JkZXItbGVmdC1jb2xvcjogdHJhbnNwYXJlbnQ7XFxuICAgIHdpZHRoOiAyNHB4O1xcbn1cXG4uaW5wdXRFcnJvciB7XFxuICAgIGJvcmRlci1jb2xvcjogcmVkO1xcbiAgICBib3gtc2hhZG93OiAwIDAgM3B4IHJlZCBpbnNldDtcXG59XFxuLnNlbGVjdFRleHQge1xcbiAgICBwb3NpdGlvbjogYWJzb2x1dGU7XFxuICAgIGN1cnNvcjogcG9pbnRlcjtcXG59XFxuLnNlbGVjdFRleHRJbm5lciB7XFxuICAgIGJhY2tncm91bmQtY29sb3I6ICNmZmY7XFxuICAgIGJvcmRlcjogMXB4IHNvbGlkICNhY2FjYWM7XFxufVxcbi5zZWxlY3RUZXh0LnNlbGVjdGVkIC5zZWxlY3RUZXh0SW5uZXIge1xcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjY2NjO1xcbn1cXG4uc2VsZWN0VGV4dElubmVyID4gc3BhbiB7XFxuICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcXG4gICAgdGV4dC1hbGlnbjogY2VudGVyO1xcbn1cXG4uc2VsZWN0VGV4dC1yb3dzIC5zZWxlY3RUZXh0SW5uZXIgPiBzcGFuIHtcXG4gICAgdG9wOiAtMXB4O1xcbn1cXG4uc2VsZWN0VGV4dC1jb2x1bW5zIC5zZWxlY3RUZXh0SW5uZXIgPiBzcGFuIHtcXG4gICAgbGVmdDogLTFweDtcXG59XFxuLnRhc2tIZWFkZXIge1xcblxcbn1cXG4uc3VibWl0QmxvY2ssIC5zY29yZUJsb2NrLCAuZmVlZGJhY2tCbG9jaywgLnNhdmVCbG9jayB7XFxuICAgIGRpc3BsYXk6IGlubGluZS1ibG9jaztcXG4gICAgbGluZS1oZWlnaHQ6IDM0cHg7XFxuICAgIG1hcmdpbjogMCAxMHB4IDAgMDtcXG59XFxuLnRhc2tIZWFkZXIgPiAqOmxhc3QtY2hpbGQge1xcbiAgICBtYXJnaW46IDA7XFxufVxcbi5zY29yZUJsb2NrLCAuZmVlZGJhY2tCbG9jayB7XFxuICAgIGJhY2tncm91bmQ6ICNmOGY4Zjg7XFxuICAgIHBhZGRpbmc6IDAgOHB4O1xcbn1cXG4uZmVlZGJhY2tCbG9jayB7XFxuICAgIGN1cnNvcjogcG9pbnRlcjtcXG59XFxuXCIsIFwiXCJdKTtcblxuLy8gZXhwb3J0c1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlcj8/cmVmLS0xLTEhLi9zcmMvc3R5bGUuY3NzXG4vLyBtb2R1bGUgaWQgPSA1Njdcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiXG5pbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IHtjb25uZWN0fSBmcm9tICdyZWFjdC1yZWR1eCc7XG5cbmltcG9ydCB7dXBkYXRlR3JpZEdlb21ldHJ5LCB1cGRhdGVHcmlkVmlzaWJsZVJvd3N9IGZyb20gJy4vdXRpbHMnO1xuXG5mdW5jdGlvbiBhcHBJbml0UmVkdWNlciAoc3RhdGUsIF9hY3Rpb24pIHtcbiAgcmV0dXJuIHsuLi5zdGF0ZSwgY2lwaGVyZWRUZXh0OiB7XG4gICAgY2VsbFdpZHRoOiAxNSxcbiAgICBjZWxsSGVpZ2h0OiAxOCxcbiAgICBzY3JvbGxUb3A6IDAsXG4gICAgbmJDZWxsczogMFxuICB9fTtcbn1cblxuZnVuY3Rpb24gdGFza0luaXRSZWR1Y2VyIChzdGF0ZSwgX2FjdGlvbikge1xuICBsZXQge2NpcGhlcmVkVGV4dCwgdGFza0RhdGE6IHtjaXBoZXJUZXh0fX0gPSBzdGF0ZTtcbiAgY2lwaGVyZWRUZXh0ID0gey4uLmNpcGhlcmVkVGV4dCwgY2VsbHM6IGNpcGhlclRleHQsIG5iQ2VsbHM6IGNpcGhlclRleHQubGVuZ3RofTtcbiAgY2lwaGVyZWRUZXh0ID0gdXBkYXRlR3JpZFZpc2libGVSb3dzKGNpcGhlcmVkVGV4dCk7XG4gIHJldHVybiB7Li4uc3RhdGUsIGNpcGhlcmVkVGV4dH07XG59XG5cbmZ1bmN0aW9uIGNpcGhlcmVkVGV4dFJlc2l6ZWRSZWR1Y2VyIChzdGF0ZSwge3BheWxvYWQ6IHt3aWR0aH19KSB7XG4gIGxldCB7Y2lwaGVyZWRUZXh0fSA9IHN0YXRlO1xuICBjaXBoZXJlZFRleHQgPSB7Li4uY2lwaGVyZWRUZXh0LCB3aWR0aCwgaGVpZ2h0OiA4ICogY2lwaGVyZWRUZXh0LmNlbGxIZWlnaHR9O1xuICBjaXBoZXJlZFRleHQgPSB1cGRhdGVHcmlkR2VvbWV0cnkoY2lwaGVyZWRUZXh0KTtcbiAgY2lwaGVyZWRUZXh0ID0gdXBkYXRlR3JpZFZpc2libGVSb3dzKGNpcGhlcmVkVGV4dCk7XG4gIHJldHVybiB7Li4uc3RhdGUsIGNpcGhlcmVkVGV4dH07XG59XG5cbmZ1bmN0aW9uIGNpcGhlcmVkVGV4dFNjcm9sbGVkUmVkdWNlciAoc3RhdGUsIHtwYXlsb2FkOiB7c2Nyb2xsVG9wfX0pIHtcbiAgbGV0IHtjaXBoZXJlZFRleHR9ID0gc3RhdGU7XG4gIGNpcGhlcmVkVGV4dCA9IHsuLi5jaXBoZXJlZFRleHQsIHNjcm9sbFRvcH07XG4gIGNpcGhlcmVkVGV4dCA9IHVwZGF0ZUdyaWRWaXNpYmxlUm93cyhjaXBoZXJlZFRleHQpO1xuICByZXR1cm4gey4uLnN0YXRlLCBjaXBoZXJlZFRleHR9O1xufVxuXG5mdW5jdGlvbiBDaXBoZXJUZXh0Vmlld1NlbGVjdG9yIChzdGF0ZSkge1xuICBjb25zdCB7YWN0aW9ucywgY2lwaGVyZWRUZXh0fSA9IHN0YXRlO1xuICBjb25zdCB7Y2lwaGVyZWRUZXh0UmVzaXplZCwgY2lwaGVyZWRUZXh0U2Nyb2xsZWR9ID0gYWN0aW9ucztcbiAgY29uc3Qge3dpZHRoLCBoZWlnaHQsIGNlbGxXaWR0aCwgY2VsbEhlaWdodCwgYm90dG9tLCBwYWdlUm93cywgcGFnZUNvbHVtbnMsIHZpc2libGV9ID0gY2lwaGVyZWRUZXh0O1xuICByZXR1cm4ge1xuICAgIGNpcGhlcmVkVGV4dFJlc2l6ZWQsIGNpcGhlcmVkVGV4dFNjcm9sbGVkLFxuICAgIHdpZHRoLCBoZWlnaHQsIHZpc2libGVSb3dzOiB2aXNpYmxlLnJvd3MsIGNlbGxXaWR0aCwgY2VsbEhlaWdodCwgYm90dG9tLCBwYWdlUm93cywgcGFnZUNvbHVtbnNcbiAgfTtcbn1cblxuY2xhc3MgQ2lwaGVyVGV4dFZpZXcgZXh0ZW5kcyBSZWFjdC5QdXJlQ29tcG9uZW50IHtcblxuICByZW5kZXIgKCkge1xuICAgIGNvbnN0IHt3aWR0aCwgaGVpZ2h0LCB2aXNpYmxlUm93cywgY2VsbFdpZHRoLCBjZWxsSGVpZ2h0LCBib3R0b219ID0gdGhpcy5wcm9wcztcbiAgICByZXR1cm4gKFxuICAgICAgPGRpdj5cbiAgICAgICAgPGRpdiByZWY9e3RoaXMucmVmVGV4dEJveH0gb25TY3JvbGw9e3RoaXMub25TY3JvbGx9IHN0eWxlPXt7cG9zaXRpb246ICdyZWxhdGl2ZScsIHdpZHRoOiB3aWR0aCAmJiBgJHt3aWR0aH1weGAsIGhlaWdodDogaGVpZ2h0ICYmIGAke2hlaWdodH1weGAsIG92ZXJmbG93WTogJ3Njcm9sbCd9fT5cbiAgICAgICAgICB7KHZpc2libGVSb3dzfHxbXSkubWFwKCh7aW5kZXgsIGNvbHVtbnN9KSA9PlxuICAgICAgICAgICAgPGRpdiBrZXk9e2luZGV4fSBzdHlsZT17e3Bvc2l0aW9uOiAnYWJzb2x1dGUnLCB0b3A6IGAke2luZGV4ICogY2VsbEhlaWdodH1weGB9fT5cbiAgICAgICAgICAgICAge2NvbHVtbnMubWFwKCh7aW5kZXgsIGNlbGx9KSA9PlxuICAgICAgICAgICAgICAgIDxzcGFuIGtleT17aW5kZXh9IHN0eWxlPXt7cG9zaXRpb246ICdhYnNvbHV0ZScsIGxlZnQ6IGAke2luZGV4ICogY2VsbFdpZHRofXB4YCwgd2lkdGg6IGAke2NlbGxXaWR0aH1weGAsIGhlaWdodDogYCR7Y2VsbEhlaWdodH1weGB9fT5cbiAgICAgICAgICAgICAgICAgIHtjZWxsIHx8ICcgJ31cbiAgICAgICAgICAgICAgICA8L3NwYW4+KX1cbiAgICAgICAgICAgIDwvZGl2Pil9XG4gICAgICAgICAgPGRpdiBzdHlsZT17e3Bvc2l0aW9uOiAnYWJzb2x1dGUnLCB0b3A6IGAke2JvdHRvbX1weGAsIHdpZHRoOiAnMXB4JywgaGVpZ2h0OiAnMXB4J319Lz5cbiAgICAgICAgPC9kaXY+XG4gICAgICA8L2Rpdj5cbiAgICApO1xuICB9XG5cbiAgcmVmVGV4dEJveCA9IChlbGVtZW50KSA9PiB7XG4gICAgdGhpcy5fdGV4dEJveCA9IGVsZW1lbnQ7XG4gICAgY29uc3Qgd2lkdGggPSBlbGVtZW50LmNsaWVudFdpZHRoO1xuICAgIGNvbnN0IGhlaWdodCA9IGVsZW1lbnQuY2xpZW50SGVpZ2h0O1xuICAgIHRoaXMucHJvcHMuZGlzcGF0Y2goe3R5cGU6IHRoaXMucHJvcHMuY2lwaGVyZWRUZXh0UmVzaXplZCwgcGF5bG9hZDoge3dpZHRoLCBoZWlnaHR9fSk7XG4gIH07XG5cbiAgb25TY3JvbGwgPSAoKSA9PiB7XG4gICAgY29uc3Qgc2Nyb2xsVG9wID0gdGhpcy5fdGV4dEJveC5zY3JvbGxUb3A7XG4gICAgdGhpcy5wcm9wcy5kaXNwYXRjaCh7dHlwZTogdGhpcy5wcm9wcy5jaXBoZXJlZFRleHRTY3JvbGxlZCwgcGF5bG9hZDoge3Njcm9sbFRvcH19KTtcbiAgfTtcblxufVxuXG5leHBvcnQgZGVmYXVsdCB7XG4gIGFjdGlvbnM6IHtcbiAgICBjaXBoZXJlZFRleHRSZXNpemVkOiAnQ2lwaGVyZWRUZXh0LlJlc2l6ZWQnIC8qIHt3aWR0aDogbnVtYmVyLCBoZWlnaHQ6IG51bWJlcn0gKi8sXG4gICAgY2lwaGVyZWRUZXh0U2Nyb2xsZWQ6ICdDaXBoZXJlZFRleHQuU2Nyb2xsZWQnIC8qIHtzY3JvbGxUb3A6IG51bWJlcn0gKi8sXG4gIH0sXG4gIGFjdGlvblJlZHVjZXJzOiB7XG4gICAgYXBwSW5pdDogYXBwSW5pdFJlZHVjZXIsXG4gICAgdGFza0luaXQ6IHRhc2tJbml0UmVkdWNlcixcbiAgICBjaXBoZXJlZFRleHRSZXNpemVkOiBjaXBoZXJlZFRleHRSZXNpemVkUmVkdWNlcixcbiAgICBjaXBoZXJlZFRleHRTY3JvbGxlZDogY2lwaGVyZWRUZXh0U2Nyb2xsZWRSZWR1Y2VyLFxuICB9LFxuICB2aWV3czoge1xuICAgIENpcGhlcmVkVGV4dDogY29ubmVjdChDaXBoZXJUZXh0Vmlld1NlbGVjdG9yKShDaXBoZXJUZXh0VmlldyksXG4gIH1cbn07XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvY2lwaGVyZWRfdGV4dF9idW5kbGUuanMiLCJcbmltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQge2Nvbm5lY3R9IGZyb20gJ3JlYWN0LXJlZHV4JztcbmltcG9ydCB7QnV0dG9ufSBmcm9tICdyZWFjdC1ib290c3RyYXAnO1xuaW1wb3J0IHVwZGF0ZSBmcm9tICdpbW11dGFiaWxpdHktaGVscGVyJztcbmltcG9ydCB7cmFuZ2V9IGZyb20gJ3JhbmdlJztcbmltcG9ydCBjbGFzc25hbWVzIGZyb20gJ2NsYXNzbmFtZXMnO1xuXG5pbXBvcnQge2NoYW5nZVNlbGVjdGlvbiwgc29ydGVkQXJyYXlIYXNFbGVtZW50LCB1cGRhdGVHcmlkVmlzaWJsZUFyZWF9IGZyb20gJy4vdXRpbHMnO1xuXG5mdW5jdGlvbiBhcHBJbml0UmVkdWNlciAoc3RhdGUsIF9hY3Rpb24pIHtcbiAgcmV0dXJuIHsuLi5zdGF0ZSwgc2VsZWN0ZWRUZXh0OiB7XG4gICAgY2VsbFdpZHRoOiAxNyxcbiAgICBjZWxsSGVpZ2h0OiAyMCxcbiAgICBwYWdlQ29sdW1uczogMzAsXG4gICAgc2Nyb2xsVG9wOiAwLFxuICAgIG1vZGU6ICdyb3dzJyxcbiAgICBzZWxlY3RlZFJvd3M6IFtdLFxuICAgIHNlbGVjdGVkQ29sdW1uczogW10sXG4gICAgbmJDZWxsczogMFxuICB9fTtcbn1cblxuZnVuY3Rpb24gdGFza0luaXRSZWR1Y2VyIChzdGF0ZSwgX2FjdGlvbikge1xuICBjb25zdCB7Y2lwaGVyVGV4dH0gPSBzdGF0ZS50YXNrRGF0YTtcbiAgcmV0dXJuIHVwZGF0ZShzdGF0ZSwge3NlbGVjdGVkVGV4dDoge2NlbGxzOiB7JHNldDogY2lwaGVyVGV4dH0sIG5iQ2VsbHM6IHskc2V0OiBjaXBoZXJUZXh0Lmxlbmd0aH19fSk7XG59XG5cbmZ1bmN0aW9uIHNlbGVjdGVkVGV4dFJlc2l6ZWRSZWR1Y2VyIChzdGF0ZSwge3BheWxvYWQ6IHt3aWR0aCwgaGVpZ2h0fX0pIHtcbiAgbGV0IHtzZWxlY3RlZFRleHR9ID0gc3RhdGU7XG4gIHNlbGVjdGVkVGV4dCA9IHsuLi5zZWxlY3RlZFRleHQsIHdpZHRoLCBoZWlnaHQ6IE1hdGgubWF4KDggKiBzZWxlY3RlZFRleHQuY2VsbEhlaWdodCwgaGVpZ2h0KX07XG4gIHJldHVybiB7Li4uc3RhdGUsIHNlbGVjdGVkVGV4dH07XG59XG5cbmZ1bmN0aW9uIHNlbGVjdGVkVGV4dFNjcm9sbGVkUmVkdWNlciAoc3RhdGUsIHtwYXlsb2FkOiB7c2Nyb2xsVG9wLCByb3dzfX0pIHtcbiAgbGV0IHtzZWxlY3RlZFRleHR9ID0gc3RhdGU7XG4gIGlmICh0eXBlb2Ygcm93cyA9PT0gJ251bWJlcicpIHtcbiAgICBjb25zdCB7Y2VsbEhlaWdodCwgbWF4VG9wfSA9IHNlbGVjdGVkVGV4dDtcbiAgICBzY3JvbGxUb3AgPSBNYXRoLm1heCgwLCBNYXRoLm1pbihtYXhUb3AsIHNlbGVjdGVkVGV4dC5zY3JvbGxUb3AgKyByb3dzICogY2VsbEhlaWdodCkpO1xuICB9XG4gIHNlbGVjdGVkVGV4dCA9IHsuLi5zZWxlY3RlZFRleHQsIHNjcm9sbFRvcH07XG4gIHJldHVybiB7Li4uc3RhdGUsIHNlbGVjdGVkVGV4dH07XG59XG5cbmZ1bmN0aW9uIHNlbGVjdGVkVGV4dE1vZGVDaGFuZ2VkUmVkdWNlciAoc3RhdGUsIHtwYXlsb2FkOiB7bW9kZX19KSB7XG4gIGxldCB7c2VsZWN0ZWRUZXh0fSA9IHN0YXRlO1xuICBzZWxlY3RlZFRleHQgPSB7Li4uc2VsZWN0ZWRUZXh0LCBtb2RlOiBtb2RlfTtcbiAgcmV0dXJuIHsuLi5zdGF0ZSwgc2VsZWN0ZWRUZXh0fTtcbn1cblxuZnVuY3Rpb24gc2VsZWN0ZWRUZXh0UGFnZUNvbHVtbnNDaGFuZ2VkUmVkdWNlciAoc3RhdGUsIHtwYXlsb2FkOiB7Y29sdW1uc319KSB7XG4gIGxldCB7c2VsZWN0ZWRUZXh0fSA9IHN0YXRlO1xuICBzZWxlY3RlZFRleHQgPSB7Li4uc2VsZWN0ZWRUZXh0LCBwYWdlQ29sdW1uczogY29sdW1ucywgc2VsZWN0ZWRSb3dzOiBbXSwgc2VsZWN0ZWRDb2x1bW5zOiBbXX07XG4gIHJldHVybiB7Li4uc3RhdGUsIHNlbGVjdGVkVGV4dH07XG59XG5cbmZ1bmN0aW9uIHNlbGVjdGVkVGV4dFNlbGVjdGlvbkNoYW5nZWRSZWR1Y2VyIChzdGF0ZSwge3BheWxvYWQ6IHtzZWxlY3RlZCwgaW5kZXh9fSkge1xuICAvLyAvKiB7c2VsZWN0ZWQ6IGJvb2x9IHVuaW9uICh7fSBvciB7aW5kZXg6IG51bWJlcn0pICovKTtcbiAgbGV0IHtzZWxlY3RlZFRleHQsIHRhc2tEYXRhfSA9IHN0YXRlO1xuICBjb25zdCB7bW9kZX0gPSBzZWxlY3RlZFRleHQ7XG4gIGlmIChtb2RlID09PSAncm93cycpIHtcbiAgICBsZXQge3NlbGVjdGVkUm93c30gPSBzZWxlY3RlZFRleHQ7XG4gICAgaWYgKHR5cGVvZiBpbmRleCA9PT0gJ251bWJlcicpIHtcbiAgICAgIGlmIChzZWxlY3RlZCA9PT0gJ29ubHknKSB7XG4gICAgICAgIHNlbGVjdGVkUm93cyA9IFtpbmRleF07XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBzZWxlY3RlZCA9ICFzb3J0ZWRBcnJheUhhc0VsZW1lbnQoc2VsZWN0ZWRSb3dzLCBpbmRleCk7XG4gICAgICAgIHNlbGVjdGVkUm93cyA9IHVwZGF0ZShzZWxlY3RlZFJvd3MsIGNoYW5nZVNlbGVjdGlvbihzZWxlY3RlZFJvd3MsIGluZGV4LCBzZWxlY3RlZCkpO1xuICAgICAgfVxuICAgIH0gZWxzZSBpZiAoc2VsZWN0ZWQpIHtcbiAgICAgIGNvbnN0IHJvd3MgPSBNYXRoLmNlaWwodGFza0RhdGEuY2lwaGVyVGV4dC5sZW5ndGggLyBzZWxlY3RlZFRleHQucGFnZUNvbHVtbnMpO1xuICAgICAgc2VsZWN0ZWRSb3dzID0gcmFuZ2UoMCwgcm93cyk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHNlbGVjdGVkUm93cyA9IFtdO1xuICAgIH1cbiAgICBzZWxlY3RlZFRleHQgPSB7Li4uc2VsZWN0ZWRUZXh0LCBzZWxlY3RlZFJvd3N9O1xuICB9IGVsc2UgaWYgKG1vZGUgPT09ICdjb2x1bW5zJykge1xuICAgIGxldCB7c2VsZWN0ZWRDb2x1bW5zfSA9IHNlbGVjdGVkVGV4dDtcbiAgICBpZiAodHlwZW9mIGluZGV4ID09PSAnbnVtYmVyJykge1xuICAgICAgaWYgKHNlbGVjdGVkID09PSAnb25seScpIHtcbiAgICAgICAgc2VsZWN0ZWRDb2x1bW5zID0gW2luZGV4XTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHNlbGVjdGVkID0gIXNvcnRlZEFycmF5SGFzRWxlbWVudChzZWxlY3RlZENvbHVtbnMsIGluZGV4KTtcbiAgICAgICAgc2VsZWN0ZWRDb2x1bW5zID0gdXBkYXRlKHNlbGVjdGVkQ29sdW1ucywgY2hhbmdlU2VsZWN0aW9uKHNlbGVjdGVkQ29sdW1ucywgaW5kZXgsIHNlbGVjdGVkKSk7XG4gICAgICB9XG4gICAgfSBlbHNlIGlmIChzZWxlY3RlZCkge1xuICAgICAgc2VsZWN0ZWRDb2x1bW5zID0gcmFuZ2UoMCwgc2VsZWN0ZWRUZXh0LnBhZ2VDb2x1bW5zKTtcbiAgICB9IGVsc2Uge1xuICAgICAgc2VsZWN0ZWRDb2x1bW5zID0gW107XG4gICAgfVxuICAgIHNlbGVjdGVkVGV4dCA9IHsuLi5zZWxlY3RlZFRleHQsIHNlbGVjdGVkQ29sdW1uc307XG4gIH1cbiAgcmV0dXJuIHsuLi5zdGF0ZSwgc2VsZWN0ZWRUZXh0fTtcbn1cblxuZnVuY3Rpb24gc2VsZWN0ZWRUZXh0TGF0ZVJlZHVjZXIgKHN0YXRlKSB7XG4gIGxldCB7c2VsZWN0ZWRUZXh0fSA9IHN0YXRlO1xuICBpZiAoc2VsZWN0ZWRUZXh0KSB7XG4gICAgc2VsZWN0ZWRUZXh0ID0gdXBkYXRlR2VvbWV0cnkoc2VsZWN0ZWRUZXh0KTtcbiAgICAvKiBUT0RPOiB1cGRhdGUgZ3JpZC50b3Agc28gdGhhdCB0aGUgc2FtZSBmaXJzdCByb3cgcmVtYWlucyB2aXNpYmxlPyAqL1xuICAgIHNlbGVjdGVkVGV4dCA9IHVwZGF0ZUdyaWRWaXNpYmxlQXJlYShzZWxlY3RlZFRleHQpO1xuICAgIGlmIChzZWxlY3RlZFRleHQgIT09IHN0YXRlLnNlbGVjdGVkVGV4dCkge1xuICAgICAgc3RhdGUgPSB7Li4uc3RhdGUsIHNlbGVjdGVkVGV4dH07XG4gICAgfVxuICB9XG4gIHJldHVybiBzdGF0ZTtcbn1cblxuZnVuY3Rpb24gdXBkYXRlR2VvbWV0cnkgKGdyaWQpIHtcbiAgLyogVE9ETzogYnVpbGQgYSBjYWNoZSBrZXksIHN0b3JlIGl0IGluIHRoZSBncmlkLCB1c2UgaXQgdG8gc2tpcCBjb21wdXRhdGlvbiB3aGVuIHVuY2hhbmdlZCAqL1xuICBjb25zdCB7aGVpZ2h0LCBjZWxsSGVpZ2h0LCBzY3JvbGxUb3AsIGNlbGxzLCBwYWdlQ29sdW1uc30gPSBncmlkO1xuICBjb25zdCBwYWdlUm93cyA9IE1hdGgubWF4KDgsIE1hdGguY2VpbChoZWlnaHQgLyBjZWxsSGVpZ2h0KSk7XG4gIGxldCBib3R0b20gPSAxMDAsIG1heFRvcCA9IDA7XG4gIGlmIChoZWlnaHQgJiYgY2VsbHMpIHtcbiAgICBib3R0b20gPSBNYXRoLmNlaWwoY2VsbHMubGVuZ3RoIC8gcGFnZUNvbHVtbnMpICogY2VsbEhlaWdodCAtIDE7XG4gICAgbWF4VG9wID0gTWF0aC5tYXgoMCwgYm90dG9tICsgMSAtIHBhZ2VSb3dzICogY2VsbEhlaWdodCk7XG4gIH1cbiAgcmV0dXJuIHsuLi5ncmlkLCBwYWdlUm93cywgc2Nyb2xsVG9wOiBNYXRoLm1pbihtYXhUb3AsIHNjcm9sbFRvcCksIGJvdHRvbSwgbWF4VG9wfTtcbn1cblxuZnVuY3Rpb24gU2VsZWN0ZWRUZXh0Vmlld1NlbGVjdG9yIChzdGF0ZSkge1xuICBjb25zdCB7YWN0aW9ucywgc2VsZWN0ZWRUZXh0fSA9IHN0YXRlO1xuICBjb25zdCB7c2VsZWN0ZWRUZXh0UmVzaXplZCwgc2VsZWN0ZWRUZXh0U2Nyb2xsZWQsIHNlbGVjdGVkVGV4dE1vZGVDaGFuZ2VkLCBzZWxlY3RlZFRleHRQYWdlQ29sdW1uc0NoYW5nZWQsIHNlbGVjdGVkVGV4dFNlbGVjdGlvbkNoYW5nZWR9ID0gYWN0aW9ucztcbiAgY29uc3Qge3dpZHRoLCBoZWlnaHQsIGNlbGxXaWR0aCwgY2VsbEhlaWdodCwgYm90dG9tLCBwYWdlUm93cywgcGFnZUNvbHVtbnMsIHZpc2libGUsIG1vZGUsIHNjcm9sbFRvcH0gPSBzZWxlY3RlZFRleHQ7XG4gIHJldHVybiB7XG4gICAgc2VsZWN0ZWRUZXh0UmVzaXplZCwgc2VsZWN0ZWRUZXh0U2Nyb2xsZWQsIHNlbGVjdGVkVGV4dE1vZGVDaGFuZ2VkLCBzZWxlY3RlZFRleHRQYWdlQ29sdW1uc0NoYW5nZWQsIHNlbGVjdGVkVGV4dFNlbGVjdGlvbkNoYW5nZWQsXG4gICAgd2lkdGgsIGhlaWdodCwgdmlzaWJsZSwgY2VsbFdpZHRoLCBjZWxsSGVpZ2h0LCBib3R0b20sIHBhZ2VSb3dzLCBwYWdlQ29sdW1ucywgbW9kZSwgc2Nyb2xsVG9wXG4gIH07XG59XG5cbmNsYXNzIFNlbGVjdGVkVGV4dFZpZXcgZXh0ZW5kcyBSZWFjdC5QdXJlQ29tcG9uZW50IHtcblxuICByZW5kZXIgKCkge1xuICAgIGNvbnN0IHt3aWR0aCwgaGVpZ2h0LCB2aXNpYmxlLCBjZWxsV2lkdGgsIGNlbGxIZWlnaHQsIHBhZ2VDb2x1bW5zLCBib3R0b20sIG1vZGV9ID0gdGhpcy5wcm9wcztcblxuICAgIHJldHVybiAoXG4gICAgICA8ZGl2PlxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT0nZm9ybS1pbmxpbmUnIHN0eWxlPXt7bWFyZ2luQm90dG9tOiAnN3B4J319PlxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPSdidG4tZ3JvdXAnIHN0eWxlPXt7bWFyZ2luUmlnaHQ6ICc3cHgnfX0+XG4gICAgICAgICAgICA8QnV0dG9uIG9uQ2xpY2s9e3RoaXMuc2V0Um93TW9kZX0gYWN0aXZlPXttb2RlID09PSAncm93cyd9IGJzU2l6ZT0nc20nPntcImxpZ25lc1wifTwvQnV0dG9uPlxuICAgICAgICAgICAgPEJ1dHRvbiBvbkNsaWNrPXt0aGlzLnNldENvbE1vZGV9IGFjdGl2ZT17bW9kZSA9PT0gJ2NvbHVtbnMnfSBic1NpemU9J3NtJz57XCJjb2xvbm5lc1wifTwvQnV0dG9uPlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPSdidG4tZ3JvdXAnIHN0eWxlPXt7bWFyZ2luUmlnaHQ6ICc3cHgnfX0+XG4gICAgICAgICAgICA8QnV0dG9uIG9uQ2xpY2s9e3RoaXMuc2Nyb2xsUGFnZVVwfSBic1NpemU9J3NtJz48aSBjbGFzc05hbWU9J2ZhIGZhLWFuZ2xlLWRvdWJsZS11cCc+PC9pPjwvQnV0dG9uPlxuICAgICAgICAgICAgPEJ1dHRvbiBvbkNsaWNrPXt0aGlzLnNjcm9sbFJvd1VwfSBic1NpemU9J3NtJz48aSBjbGFzc05hbWU9J2ZhIGZhLWFuZ2xlLXVwJz48L2k+PC9CdXR0b24+XG4gICAgICAgICAgICA8QnV0dG9uIG9uQ2xpY2s9e3RoaXMuc2Nyb2xsUm93RG93bn0gYnNTaXplPSdzbSc+PGkgY2xhc3NOYW1lPSdmYSBmYS1hbmdsZS1kb3duJz48L2k+PC9CdXR0b24+XG4gICAgICAgICAgICA8QnV0dG9uIG9uQ2xpY2s9e3RoaXMuc2Nyb2xsUGFnZURvd259IGJzU2l6ZT0nc20nPjxpIGNsYXNzTmFtZT0nZmEgZmEtYW5nbGUtZG91YmxlLWRvd24nPjwvaT48L0J1dHRvbj5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT0nZm9ybS1ncm91cCc+XG4gICAgICAgICAgICA8bGFiZWwgc3R5bGU9e3tmb250V2VpZ2h0OiAnbm9ybWFsJywgbWFyZ2luUmlnaHQ6ICczcHgnfX0+eydDb2xvbm5lcyA6J308L2xhYmVsPlxuICAgICAgICAgICAgPGlucHV0IHR5cGU9J251bWJlcicgdmFsdWU9e3RoaXMuc3RhdGUucGFnZUNvbHVtbnMgPT09IG51bGwgPyBwYWdlQ29sdW1ucyA6IHRoaXMuc3RhdGUucGFnZUNvbHVtbnN9IG9uQ2hhbmdlPXt0aGlzLnBhZ2VDb2x1bW5zQ2hhbmdlfVxuICAgICAgICAgICAgc3R5bGU9e3ttYXJnaW5SaWdodDogJzdweCcsIHdpZHRoOic3MHB4JywgY29sb3I6IHRoaXMuc3RhdGUucGFnZUNvbHVtbnMgPT09IG51bGwgPyAnYmxhY2snIDogJ3JlZCd9fSBjbGFzc05hbWU9e2NsYXNzbmFtZXMoJ2Zvcm0tY29udHJvbCcsICdpbnB1dC1zbScsIHRoaXMuc3RhdGUucGFnZUNvbHVtbnMgPT09IG51bGwgPyAnJyA6ICdpbnB1dEVycm9yJyl9Lz5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT0nYnRuLWdyb3VwJz5cbiAgICAgICAgICAgIDxCdXR0b24gb25DbGljaz17dGhpcy5zZWxlY3RBbGx9IGJzU2l6ZT0nc20nPntcIiBUb3V0IHPDqWxlY3Rpb25uZXIgXCJ9PC9CdXR0b24+XG4gICAgICAgICAgICA8QnV0dG9uIG9uQ2xpY2s9e3RoaXMuc2VsZWN0Tm9uZX0gYnNTaXplPSdzbSc+e1wiIFZpZGVyIGxhIHPDqWxlY3Rpb24gXCJ9PC9CdXR0b24+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvZGl2PlxuICAgICAgICA8ZGl2PlxuICAgICAgICAgIDxkaXYgcmVmPXt0aGlzLnJlZlRleHRCb3h9IG9uU2Nyb2xsPXt0aGlzLm9uU2Nyb2xsfSBzdHlsZT17e3Bvc2l0aW9uOiAncmVsYXRpdmUnLCB3aWR0aDogd2lkdGggJiYgYCR7d2lkdGh9cHhgLCBoZWlnaHQ6IGhlaWdodCAmJiBgJHtoZWlnaHR9cHhgLCBvdmVyZmxvd1k6ICdzY3JvbGwnfX0+XG4gICAgICAgICAgICB7dmlzaWJsZSAmJiAodmlzaWJsZS5yb3dzfHxbXSkubWFwKCh7aW5kZXgsIGNvbHVtbnMsIHNlbGVjdGVkfSkgPT5cbiAgICAgICAgICAgICAgPGRpdiBrZXk9e2luZGV4fSBjbGFzc05hbWU9e2NsYXNzbmFtZXMoJ3NlbGVjdFRleHQnLCAnc2VsZWN0VGV4dC1yb3dzJywgc2VsZWN0ZWQgPyAnc2VsZWN0ZWQnIDogJycpfSBzdHlsZT17e3RvcDogYCR7aW5kZXggKiBjZWxsSGVpZ2h0fXB4YCwgd2lkdGg6IGAke2NlbGxXaWR0aCAqIHBhZ2VDb2x1bW5zfXB4YCwgaGVpZ2h0OiBgJHtjZWxsSGVpZ2h0fXB4YH19XG4gICAgICAgICAgICAgICAgb25DbGljaz17dGhpcy5yb3dDbGlja2VkfSBkYXRhLWluZGV4PXtpbmRleH0+XG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9J3NlbGVjdFRleHRJbm5lcicgc3R5bGU9e3t3aWR0aDogYCR7Y2VsbFdpZHRoICogcGFnZUNvbHVtbnN9cHhgLCBoZWlnaHQ6IGAke2NlbGxIZWlnaHQgLSAyfXB4YH19PlxuICAgICAgICAgICAgICAgICAge2NvbHVtbnMubWFwKCh7aW5kZXgsIGNlbGx9KSA9PlxuICAgICAgICAgICAgICAgICAgICA8c3BhbiBrZXk9e2luZGV4fSBzdHlsZT17e2xlZnQ6IGAke2luZGV4ICogY2VsbFdpZHRofXB4YCwgd2lkdGg6IGAke2NlbGxXaWR0aH1weGAsIGhlaWdodDogYCR7Y2VsbEhlaWdodH1weGB9fT5cbiAgICAgICAgICAgICAgICAgICAgICB7Y2VsbCB8fCAnICd9XG4gICAgICAgICAgICAgICAgICAgIDwvc3Bhbj4pfVxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICA8L2Rpdj4pfVxuICAgICAgICAgICAge3Zpc2libGUgJiYgKHZpc2libGUuY29sdW1uc3x8W10pLm1hcCgoe2luZGV4LCByb3dzLCBzZWxlY3RlZH0pID0+XG4gICAgICAgICAgICAgIDxkaXYga2V5PXtpbmRleH0gY2xhc3NOYW1lPXtjbGFzc25hbWVzKCdzZWxlY3RUZXh0JywgJ3NlbGVjdFRleHQtY29sdW1ucycsIHNlbGVjdGVkID8gJ3NlbGVjdGVkJyA6ICcnKX0gc3R5bGU9e3tsZWZ0OiBgJHtpbmRleCAqIGNlbGxXaWR0aH1weGAsIHdpZHRoOiBgJHtjZWxsV2lkdGh9cHhgLCBoZWlnaHQ6IGAke2JvdHRvbX1weGB9fVxuICAgICAgICAgICAgICAgIG9uQ2xpY2s9e3RoaXMuY29sdW1uQ2xpY2tlZH0gZGF0YS1pbmRleD17aW5kZXh9PlxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPSdzZWxlY3RUZXh0SW5uZXInIHN0eWxlPXt7d2lkdGg6IGAke2NlbGxXaWR0aCAtIDJ9cHhgLCBoZWlnaHQ6IGAke2JvdHRvbX1weGB9fT5cbiAgICAgICAgICAgICAgICAgIHtyb3dzLm1hcCgoe2luZGV4LCBjZWxsfSkgPT5cbiAgICAgICAgICAgICAgICAgICAgPHNwYW4ga2V5PXtpbmRleH0gc3R5bGU9e3t0b3A6IGAke2luZGV4ICogY2VsbEhlaWdodH1weGAsIHdpZHRoOiBgJHtjZWxsV2lkdGh9cHhgLCBoZWlnaHQ6IGAke2NlbGxIZWlnaHR9cHhgfX0+XG4gICAgICAgICAgICAgICAgICAgICAge2NlbGwgfHwgJyAnfVxuICAgICAgICAgICAgICAgICAgICA8L3NwYW4+KX1cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgPC9kaXY+KX1cbiAgICAgICAgICAgIDxkaXYgc3R5bGU9e3twb3NpdGlvbjogJ2Fic29sdXRlJywgdG9wOiBgJHtib3R0b219cHhgLCB3aWR0aDogJzFweCcsIGhlaWdodDogJzFweCd9fS8+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvZGl2PlxuICAgICAgPC9kaXY+XG4gICAgKTtcbiAgfVxuXG4gIGNvbXBvbmVudERpZFVwZGF0ZSAoKSB7XG4gICAgaWYgKHRoaXMuX3RleHRCb3gpIHtcbiAgICAgIHRoaXMuX3RleHRCb3guc2Nyb2xsVG9wID0gdGhpcy5wcm9wcy5zY3JvbGxUb3A7XG4gICAgfVxuICB9XG5cbiAgc3RhdGUgPSB7cGFnZUNvbHVtbnM6IG51bGx9O1xuXG4gIHJlZlRleHRCb3ggPSAoZWxlbWVudCkgPT4ge1xuICAgIHRoaXMuX3RleHRCb3ggPSBlbGVtZW50O1xuICAgIGNvbnN0IHdpZHRoID0gZWxlbWVudC5jbGllbnRXaWR0aDtcbiAgICBjb25zdCBoZWlnaHQgPSBlbGVtZW50LmNsaWVudEhlaWdodDtcbiAgICB0aGlzLnByb3BzLmRpc3BhdGNoKHt0eXBlOiB0aGlzLnByb3BzLnNlbGVjdGVkVGV4dFJlc2l6ZWQsIHBheWxvYWQ6IHt3aWR0aCwgaGVpZ2h0fX0pO1xuICB9O1xuXG4gIG9uU2Nyb2xsID0gKCkgPT4ge1xuICAgIGNvbnN0IHNjcm9sbFRvcCA9IHRoaXMuX3RleHRCb3guc2Nyb2xsVG9wO1xuICAgIHRoaXMucHJvcHMuZGlzcGF0Y2goe3R5cGU6IHRoaXMucHJvcHMuc2VsZWN0ZWRUZXh0U2Nyb2xsZWQsIHBheWxvYWQ6IHtzY3JvbGxUb3B9fSk7XG4gIH07XG5cbiAgc2V0Um93TW9kZSA9ICgpID0+IHtcbiAgICB0aGlzLnByb3BzLmRpc3BhdGNoKHt0eXBlOiB0aGlzLnByb3BzLnNlbGVjdGVkVGV4dE1vZGVDaGFuZ2VkLCBwYXlsb2FkOiB7bW9kZTogJ3Jvd3MnfX0pO1xuICB9O1xuICBzZXRDb2xNb2RlID0gKCkgPT4ge1xuICAgIHRoaXMucHJvcHMuZGlzcGF0Y2goe3R5cGU6IHRoaXMucHJvcHMuc2VsZWN0ZWRUZXh0TW9kZUNoYW5nZWQsIHBheWxvYWQ6IHttb2RlOiAnY29sdW1ucyd9fSk7XG4gIH07XG5cbiAgc2Nyb2xsUGFnZVVwID0gKCkgPT4ge1xuICAgIHRoaXMucHJvcHMuZGlzcGF0Y2goe3R5cGU6IHRoaXMucHJvcHMuc2VsZWN0ZWRUZXh0U2Nyb2xsZWQsIHBheWxvYWQ6IHtyb3dzOiAtdGhpcy5wcm9wcy5wYWdlUm93c319KTtcbiAgfTtcbiAgc2Nyb2xsUm93VXAgPSAoKSA9PiB7XG4gICAgdGhpcy5wcm9wcy5kaXNwYXRjaCh7dHlwZTogdGhpcy5wcm9wcy5zZWxlY3RlZFRleHRTY3JvbGxlZCwgcGF5bG9hZDoge3Jvd3M6IC0xfX0pO1xuICB9O1xuICBzY3JvbGxSb3dEb3duID0gKCkgPT4ge1xuICAgIHRoaXMucHJvcHMuZGlzcGF0Y2goe3R5cGU6IHRoaXMucHJvcHMuc2VsZWN0ZWRUZXh0U2Nyb2xsZWQsIHBheWxvYWQ6IHtyb3dzOiAxfX0pO1xuICB9O1xuICBzY3JvbGxQYWdlRG93biA9ICgpID0+IHtcbiAgICB0aGlzLnByb3BzLmRpc3BhdGNoKHt0eXBlOiB0aGlzLnByb3BzLnNlbGVjdGVkVGV4dFNjcm9sbGVkLCBwYXlsb2FkOiB7cm93czogdGhpcy5wcm9wcy5wYWdlUm93c319KTtcbiAgfTtcblxuICBwYWdlQ29sdW1uc0NoYW5nZSA9IChldmVudCkgPT4ge1xuICAgIGNvbnN0IHRleHQgPSBldmVudC50YXJnZXQudmFsdWU7XG4gICAgY29uc3QgdmFsdWUgPSBwYXJzZUludCh0ZXh0KTtcbiAgICBpZiAoIWlzTmFOKHZhbHVlKSAmJiB2YWx1ZSA+IDAgJiYgdmFsdWUgPCA4MCkge1xuICAgICAgdGhpcy5zZXRTdGF0ZSh7cGFnZUNvbHVtbnM6IG51bGx9KTtcbiAgICAgIHRoaXMucHJvcHMuZGlzcGF0Y2goe3R5cGU6IHRoaXMucHJvcHMuc2VsZWN0ZWRUZXh0UGFnZUNvbHVtbnNDaGFuZ2VkLCBwYXlsb2FkOiB7Y29sdW1uczogdmFsdWV9fSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuc2V0U3RhdGUoe3BhZ2VDb2x1bW5zOiB0ZXh0fSk7XG4gICAgfVxuICB9O1xuXG4gIHNlbGVjdEFsbCA9ICgpID0+IHtcbiAgICB0aGlzLnByb3BzLmRpc3BhdGNoKHt0eXBlOiB0aGlzLnByb3BzLnNlbGVjdGVkVGV4dFNlbGVjdGlvbkNoYW5nZWQsIHBheWxvYWQ6IHtzZWxlY3RlZDogdHJ1ZX19KTtcbiAgfTtcbiAgc2VsZWN0Tm9uZSA9ICgpID0+IHtcbiAgICB0aGlzLnByb3BzLmRpc3BhdGNoKHt0eXBlOiB0aGlzLnByb3BzLnNlbGVjdGVkVGV4dFNlbGVjdGlvbkNoYW5nZWQsIHBheWxvYWQ6IHtzZWxlY3RlZDogZmFsc2V9fSk7XG4gIH07XG4gIHJvd0NsaWNrZWQgPSAoZXZlbnQpID0+IHtcbiAgICBjb25zdCBpbmRleCA9IHBhcnNlSW50KGV2ZW50LmN1cnJlbnRUYXJnZXQuZGF0YXNldC5pbmRleCk7XG4gICAgdGhpcy5wcm9wcy5kaXNwYXRjaCh7dHlwZTogdGhpcy5wcm9wcy5zZWxlY3RlZFRleHRTZWxlY3Rpb25DaGFuZ2VkLCBwYXlsb2FkOiB7aW5kZXgsIHNlbGVjdGVkOiBldmVudC5zaGlmdEtleSA/ICd0b2dnbGUnIDogJ29ubHknfX0pO1xuICB9O1xuICBjb2x1bW5DbGlja2VkID0gKGV2ZW50KSA9PiB7XG4gICAgY29uc3QgaW5kZXggPSBwYXJzZUludChldmVudC5jdXJyZW50VGFyZ2V0LmRhdGFzZXQuaW5kZXgpO1xuICAgIHRoaXMucHJvcHMuZGlzcGF0Y2goe3R5cGU6IHRoaXMucHJvcHMuc2VsZWN0ZWRUZXh0U2VsZWN0aW9uQ2hhbmdlZCwgcGF5bG9hZDoge2luZGV4LCBzZWxlY3RlZDogZXZlbnQuc2hpZnRLZXkgPyAndG9nZ2xlJyA6ICdvbmx5J319KTtcbiAgfTtcblxufVxuXG5leHBvcnQgZGVmYXVsdCB7XG4gIGFjdGlvbnM6IHtcbiAgICBzZWxlY3RlZFRleHRSZXNpemVkOiAnU2VsZWN0ZWRUZXh0LlJlc2l6ZWQnIC8qIHt3aWR0aDogbnVtYmVyLCBoZWlnaHQ6IG51bWJlcn0gKi8sXG4gICAgc2VsZWN0ZWRUZXh0U2Nyb2xsZWQ6ICdTZWxlY3RlZFRleHQuU2Nyb2xsZWQnIC8qIHt0b3A6IG51bWJlcn0gKi8sXG4gICAgc2VsZWN0ZWRUZXh0TW9kZUNoYW5nZWQ6ICdTZWxlY3RlZFRleHQuTW9kZS5DaGFuZ2VkJyAvKiB7bW9kZTogJ3Jvd3MnIG9yICdjb2x1bW5zJ30gKi8sXG4gICAgc2VsZWN0ZWRUZXh0UGFnZUNvbHVtbnNDaGFuZ2VkOiAnU2VsZWN0ZWRUZXh0LlBhZ2VDb2x1bW5zLkNoYW5nZWQnIC8qIHtjb2x1bW5zOiBudW1iZXJ9ICovLFxuICAgIHNlbGVjdGVkVGV4dFNlbGVjdGlvbkNoYW5nZWQ6ICdTZWxlY3RlZFRleHQuU2VsZWN0aW9uLkNoYW5nZWQnIC8qIHtzZWxlY3RlZDogYm9vbH0gdW5pb24gKHt9IG9yIHtpbmRleDogbnVtYmVyfSkgKi8sXG4gIH0sXG4gIGFjdGlvblJlZHVjZXJzOiB7XG4gICAgYXBwSW5pdDogYXBwSW5pdFJlZHVjZXIsXG4gICAgdGFza0luaXQ6IHRhc2tJbml0UmVkdWNlcixcbiAgICBzZWxlY3RlZFRleHRSZXNpemVkOiBzZWxlY3RlZFRleHRSZXNpemVkUmVkdWNlcixcbiAgICBzZWxlY3RlZFRleHRTY3JvbGxlZDogc2VsZWN0ZWRUZXh0U2Nyb2xsZWRSZWR1Y2VyLFxuICAgIHNlbGVjdGVkVGV4dE1vZGVDaGFuZ2VkOiBzZWxlY3RlZFRleHRNb2RlQ2hhbmdlZFJlZHVjZXIsXG4gICAgc2VsZWN0ZWRUZXh0UGFnZUNvbHVtbnNDaGFuZ2VkOiBzZWxlY3RlZFRleHRQYWdlQ29sdW1uc0NoYW5nZWRSZWR1Y2VyLFxuICAgIHNlbGVjdGVkVGV4dFNlbGVjdGlvbkNoYW5nZWQ6IHNlbGVjdGVkVGV4dFNlbGVjdGlvbkNoYW5nZWRSZWR1Y2VyLFxuICB9LFxuICBsYXRlUmVkdWNlcjogc2VsZWN0ZWRUZXh0TGF0ZVJlZHVjZXIsXG4gIHZpZXdzOiB7XG4gICAgU2VsZWN0ZWRUZXh0OiBjb25uZWN0KFNlbGVjdGVkVGV4dFZpZXdTZWxlY3RvcikoU2VsZWN0ZWRUZXh0VmlldylcbiAgfSxcbn07XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvc2VsZWN0ZWRfdGV4dF9idW5kbGUuanMiLCJcbmltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQge2Nvbm5lY3R9IGZyb20gJ3JlYWN0LXJlZHV4JztcbmltcG9ydCB7cmFuZ2V9IGZyb20gJ3JhbmdlJztcbmltcG9ydCBzZWVkcmFuZG9tIGZyb20gJ3NlZWRyYW5kb20nO1xuXG5mdW5jdGlvbiBhcHBJbml0UmVkdWNlciAoc3RhdGUsIF9hY3Rpb24pIHtcbiAgcmV0dXJuIHsuLi5zdGF0ZSwgZnJlcXVlbmN5QW5hbHlzaXM6IHt9fTtcbn1cblxuZnVuY3Rpb24gZnJlcXVlbmN5QW5hbHlzaXNMYXRlUmVkdWNlciAoc3RhdGUpIHtcbiAgaWYgKHN0YXRlLmZyZXF1ZW5jeUFuYWx5c2lzICYmIHN0YXRlLnRhc2tEYXRhKSB7XG4gICAgbGV0IHt0YXNrRGF0YToge2FscGhhYmV0LCByZWZlcmVuY2VGcmVxdWVuY2llcywgZnJlcXVlbmNpZXMsIGNpcGhlclRleHR9LCBzZWxlY3RlZFRleHQ6IHttb2RlLCBwYWdlQ29sdW1ucywgc2VsZWN0ZWRSb3dzLCBzZWxlY3RlZENvbHVtbnN9LCBmcmVxdWVuY3lBbmFseXNpc30gPSBzdGF0ZTtcbiAgICBsZXQgdGV4dEZyZXF1ZW5jaWVzID0gW107XG4gICAgaWYgKG1vZGUgPT09ICdyb3dzJyAmJiBzZWxlY3RlZFJvd3MubGVuZ3RoICE9PSAwKSB7XG4gICAgICBjb25zdCBmcmVxTWFwID0gbmV3IE1hcChhbHBoYWJldC5zcGxpdCgnJykubWFwKGMgPT4gW2MsIDBdKSk7XG4gICAgICBmb3IgKGxldCBpbmRleCBvZiBzZWxlY3RlZFJvd3MpIHtcbiAgICAgICAgY29uc3Qgc3RhcnRQb3MgPSBpbmRleCAqIHBhZ2VDb2x1bW5zO1xuICAgICAgICBjb25zdCBlbmRQb3MgPSBzdGFydFBvcyArIHBhZ2VDb2x1bW5zIC0gMTtcbiAgICAgICAgY291bnRTeW1ib2xzKGZyZXFNYXAsIGNpcGhlclRleHQsIHN0YXJ0UG9zLCBlbmRQb3MpO1xuICAgICAgfVxuICAgICAgdGV4dEZyZXF1ZW5jaWVzID0gbm9ybWFsaXplQW5kU29ydEZyZXF1ZW5jaWVzKGZyZXFNYXAuZW50cmllcygpKTtcbiAgICB9IGVsc2UgaWYgKG1vZGUgPT09ICdjb2x1bW5zJyAmJiBzZWxlY3RlZENvbHVtbnMubGVuZ3RoICE9PSAwKSB7XG4gICAgICBpZiAocGFnZUNvbHVtbnMgIT09IDI2KSB7XG4gICAgICAgIGNvbnN0IHJuZyA9IHNlZWRyYW5kb20oc2VsZWN0ZWRDb2x1bW5zLmpvaW4oJywnKSk7XG4gICAgICAgIGNvbnN0IGJhc2VQcm9iYSA9IDEgLyBhbHBoYWJldC5sZW5ndGg7XG4gICAgICAgIGNvbnN0IG1heFJlZlByb2JhID0gcmVmZXJlbmNlRnJlcXVlbmNpZXMucmVkdWNlKChhLCB4KSA9PiBNYXRoLm1heChhLCB4LnByb2JhKSwgMCk7XG4gICAgICAgIGNvbnN0IGVwc2lsb24gPSBtYXhSZWZQcm9iYSAqIDIgLyAzMDsgLyogMiBwaXhlbHMgYWZ0ZXIgc2NhbGluZyAqL1xuICAgICAgICBjb25zdCBlbnRyaWVzID0gYWxwaGFiZXQuc3BsaXQoJycpLm1hcChjID0+IFtjLCBiYXNlUHJvYmEgKyBlcHNpbG9uICogKHJuZygpICogMiAtIDEpXSk7XG4gICAgICAgIHRleHRGcmVxdWVuY2llcyA9IG5vcm1hbGl6ZUFuZFNvcnRGcmVxdWVuY2llcyhlbnRyaWVzKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGNvbnN0IHNlbGVjdGVkRnJlcXVlbmNpZXMgPSBuZXcgQXJyYXkoYWxwaGFiZXQubGVuZ3RoKS5maWxsKDApO1xuICAgICAgICBmb3IgKGxldCBjb2wgb2Ygc2VsZWN0ZWRDb2x1bW5zKSB7XG4gICAgICAgICAgc3VtRnJlcXVlbmNpZXMoc2VsZWN0ZWRGcmVxdWVuY2llcywgZnJlcXVlbmNpZXNbY29sXSk7XG4gICAgICAgIH1cbiAgICAgICAgdGV4dEZyZXF1ZW5jaWVzID0gbm9ybWFsaXplQW5kU29ydEZyZXF1ZW5jaWVzKFxuICAgICAgICAgIHNlbGVjdGVkRnJlcXVlbmNpZXMubWFwKChwcm9iYSwgaSkgPT4gW2FscGhhYmV0W2ldLCBwcm9iYV0pKTtcbiAgICAgIH1cbiAgICB9XG4gICAgZnJlcXVlbmN5QW5hbHlzaXMgPSB7Li4uZnJlcXVlbmN5QW5hbHlzaXMsIHRleHRGcmVxdWVuY2llc307XG4gICAgc3RhdGUgPSB7Li4uc3RhdGUsIGZyZXF1ZW5jeUFuYWx5c2lzfTtcbiAgfVxuICByZXR1cm4gc3RhdGU7XG59XG5cbmZ1bmN0aW9uIGNvdW50U3ltYm9scyAobWFwLCB0ZXh0LCBzdGFydFBvcywgZW5kUG9zKSB7XG4gIGZvciAobGV0IHBvcyA9IHN0YXJ0UG9zOyBwb3MgPD0gZW5kUG9zOyBwb3MgKz0gMSkge1xuICAgIGNvdW50U3ltYm9sKG1hcCwgdGV4dFtwb3NdKTtcbiAgfVxufVxuXG5mdW5jdGlvbiBjb3VudFN5bWJvbCAobWFwLCBjaGFyKSB7XG4gIGNvbnN0IGNvdW50ID0gbWFwLmdldChjaGFyKTtcbiAgaWYgKGNvdW50ICE9PSB1bmRlZmluZWQpIHtcbiAgICBtYXAuc2V0KGNoYXIsIGNvdW50ICsgMSk7XG4gIH1cbn1cblxuZnVuY3Rpb24gc3VtRnJlcXVlbmNpZXMgKGRzdCwgYWRkKSB7XG4gIGZvciAobGV0IGkgPSAwOyBpIDwgZHN0Lmxlbmd0aDsgaSArPSAxKSB7XG4gICAgZHN0W2ldICs9IGFkZFtpXTtcbiAgfVxufVxuXG5mdW5jdGlvbiBub3JtYWxpemVBbmRTb3J0RnJlcXVlbmNpZXMgKGVudHJpZXMpIHtcbiAgY29uc3QgcmVzdWx0ID0gQXJyYXkuZnJvbShlbnRyaWVzKTtcbiAgY29uc3QgdG90YWxDb3VudCA9IHJlc3VsdC5yZWR1Y2UoKGEsIHgpID0+IGEgKyB4WzFdLCAwKTtcbiAgcmVzdWx0LnNvcnQoZnVuY3Rpb24gKHMxLCBzMikge1xuICAgICBjb25zdCBwMSA9IHMxWzFdLCBwMiA9IHMyWzFdO1xuICAgICByZXR1cm4gcDEgPiBwMiA/IC0xIDogKHAxIDwgcDIgPyAxIDogMCk7XG4gIH0pO1xuICByZXR1cm4gcmVzdWx0Lm1hcCgoW3N5bWJvbCwgY291bnRdKSA9PiAoe3N5bWJvbCwgcHJvYmE6IGNvdW50IC8gdG90YWxDb3VudH0pKTtcbn1cblxuZnVuY3Rpb24gRnJlcXVlbmN5QW5hbHlzaXNTZWxlY3RvciAoc3RhdGUpIHtcbiAgY29uc3Qge3Rhc2tEYXRhOiB7YWxwaGFiZXQsIHJlZmVyZW5jZUZyZXF1ZW5jaWVzfSwgZnJlcXVlbmN5QW5hbHlzaXM6IHt0ZXh0RnJlcXVlbmNpZXN9fSA9IHN0YXRlO1xuICBjb25zdCBzY2FsZSA9IDMwIC8gcmVmZXJlbmNlRnJlcXVlbmNpZXMucmVkdWNlKChhLCB4KSA9PiBNYXRoLm1heChhLCB4LnByb2JhKSwgMCk7XG4gIHJldHVybiB7XG4gICAgYWxwaGFiZXRTaXplOiBhbHBoYWJldC5sZW5ndGgsXG4gICAgcmVmZXJlbmNlRnJlcXVlbmNpZXMsXG4gICAgdGV4dEZyZXF1ZW5jaWVzLFxuICAgIHNjYWxlXG4gIH07XG59XG5cbmNsYXNzIEZyZXF1ZW5jeUFuYWx5c2lzVmlldyBleHRlbmRzIFJlYWN0LlB1cmVDb21wb25lbnQge1xuICByZW5kZXIgKCkge1xuICAgIGNvbnN0IHthbHBoYWJldFNpemUsIHJlZmVyZW5jZUZyZXF1ZW5jaWVzLCB0ZXh0RnJlcXVlbmNpZXMsIHNjYWxlfSA9IHRoaXMucHJvcHM7XG4gICAgaWYgKCFyZWZlcmVuY2VGcmVxdWVuY2llcykgcmV0dXJuIGZhbHNlO1xuICAgIHJldHVybiAoXG4gICAgICA8ZGl2IGNsYXNzTmFtZT0nY2xlYXJmaXgnPlxuICAgICAgICA8ZGl2IHN0eWxlPXt7ZmxvYXQ6ICdsZWZ0Jywgd2lkdGg6ICcxMDBweCcsIGhlaWdodDogJzEwOHB4JywgZm9udFNpemU6ICcxMHB4JywgbGluZUhlaWdodDogJzEwcHgnLCBwb3NpdGlvbjogJ3JlbGF0aXZlJ319PlxuICAgICAgICAgIDxkaXYgc3R5bGU9e3toZWlnaHQ6ICczMHB4JywgcG9zaXRpb246ICdhYnNvbHV0ZScsIHRvcDogJzBweCd9fT5cbiAgICAgICAgICAgIHtcIkZyw6lxdWVuY2VzIGRhbnMgbGUgdGV4dGUgOlwifVxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgIDxkaXYgc3R5bGU9e3toZWlnaHQ6ICcyMHB4JywgcG9zaXRpb246ICdhYnNvbHV0ZScsIHRvcDogJzMycHgnfX0+XG4gICAgICAgICAgICB7XCJTeW1ib2xlcyBkdSB0ZXh0ZSA6XCJ9XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgPGRpdiBzdHlsZT17e2hlaWdodDogJzIwcHgnLCBwb3NpdGlvbjogJ2Fic29sdXRlJywgdG9wOiAnNTZweCd9fT5cbiAgICAgICAgICAgIHtcIlN1YnN0aXR1dGlvbnMgOlwifVxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgIDxkaXYgc3R5bGU9e3toZWlnaHQ6ICczMHB4JywgcG9zaXRpb246ICdhYnNvbHV0ZScsIHRvcDogJzc4cHgnfX0+XG4gICAgICAgICAgICB7XCJGcsOpcXVlbmNlcyBlbiBmcmFuw6dhaXMgOlwifVxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICA8L2Rpdj5cbiAgICAgICAge3JhbmdlKDAsIGFscGhhYmV0U2l6ZSkubWFwKGluZGV4ID0+XG4gICAgICAgICAgPGRpdiBrZXk9e2luZGV4fSBzdHlsZT17e2Zsb2F0OiAnbGVmdCcsIHdpZHRoOiAnMjBweCcsIGhlaWdodDogJzEwOHB4JywgcG9zaXRpb246ICdyZWxhdGl2ZSd9fT5cbiAgICAgICAgICAgIDxUZXh0RnJlcXVlbmN5Qm94IGluZGV4PXtpbmRleH0gY2VsbD17dGV4dEZyZXF1ZW5jaWVzW2luZGV4XX0gc2NhbGU9e3NjYWxlfSAvPlxuICAgICAgICAgICAgPFJlZmVyZW5jZUZyZXF1ZW5jeUJveCBpbmRleD17aW5kZXh9IGNlbGw9e3JlZmVyZW5jZUZyZXF1ZW5jaWVzW2luZGV4XX0gc2NhbGU9e3NjYWxlfSAvPlxuICAgICAgICAgIDwvZGl2Pil9XG4gICAgICA8L2Rpdj5cbiAgICApO1xuICB9XG59XG5cbmNsYXNzIFRleHRGcmVxdWVuY3lCb3ggZXh0ZW5kcyBSZWFjdC5QdXJlQ29tcG9uZW50IHtcbiAgcmVuZGVyICgpIHtcbiAgICBjb25zdCB7Y2VsbCwgc2NhbGV9ID0gdGhpcy5wcm9wcztcbiAgICBpZiAoIWNlbGwpIHJldHVybiBmYWxzZTtcbiAgICByZXR1cm4gKFxuICAgICAgPGRpdiBzdHlsZT17e3Bvc2l0aW9uOiAnYWJzb2x1dGUnLCB0b3A6ICcwcHgnfX0+XG4gICAgICAgIDxkaXYgc3R5bGU9e3t3aWR0aDogJzIwcHgnLCBoZWlnaHQ6ICczMHB4JywgZGlzcGxheTogJ3RhYmxlLWNlbGwnLCB2ZXJ0aWNhbEFsaWduOiAnYm90dG9tJ319PlxuICAgICAgICAgIDxkaXYgc3R5bGU9e3toZWlnaHQ6IGAke01hdGgubWluKDMwLCBNYXRoLnJvdW5kKGNlbGwucHJvYmEgKiBzY2FsZSkpfXB4YCwgd2lkdGg6ICc4cHgnLCBtYXJnaW5MZWZ0OiAnNXB4JywgYmFja2dyb3VuZDogJ2JsYWNrJ319Lz5cbiAgICAgICAgPC9kaXY+XG4gICAgICAgIDxkaXYgc3R5bGU9e3t3aWR0aDogJzE3cHgnLCBoZWlnaHQ6ICcyMHB4JywgYm9yZGVyOiAnMXB4IHNvbGlkIHdoaXRlJywgbWFyZ2luQm90dG9tOiAnMnB4JywgdGV4dEFsaWduOiAnY2VudGVyJ319PlxuICAgICAgICAgIHtjZWxsLnN5bWJvbH1cbiAgICAgICAgPC9kaXY+XG4gICAgICA8L2Rpdj5cbiAgICApO1xuICB9XG59XG5cbmNsYXNzIFJlZmVyZW5jZUZyZXF1ZW5jeUJveCBleHRlbmRzIFJlYWN0LlB1cmVDb21wb25lbnQge1xuICByZW5kZXIgKCkge1xuICAgIGNvbnN0IHtjZWxsLCBzY2FsZX0gPSB0aGlzLnByb3BzO1xuICAgIHJldHVybiAoXG4gICAgICA8ZGl2IHN0eWxlPXt7cG9zaXRpb246ICdhYnNvbHV0ZScsIHRvcDogJzU2cHgnfX0+XG4gICAgICAgIDxkaXYgc3R5bGU9e3t3aWR0aDogJzE3cHgnLCBoZWlnaHQ6ICcyMHB4JywgYm9yZGVyOiAnMXB4IHNvbGlkIGJsYWNrJywgbWFyZ2luQm90dG9tOiAnMnB4JywgdGV4dEFsaWduOiAnY2VudGVyJ319PlxuICAgICAgICAgIHtjZWxsLnN5bWJvbH1cbiAgICAgICAgPC9kaXY+XG4gICAgICAgIDxkaXYgc3R5bGU9e3t3aWR0aDogJzIwcHgnLCBoZWlnaHQ6ICczMHB4JywgdmVydGljYWxBbGlnbjogJ3RvcCd9fT5cbiAgICAgICAgICA8ZGl2IHN0eWxlPXt7aGVpZ2h0OiBgJHtNYXRoLnJvdW5kKGNlbGwucHJvYmEgKiBzY2FsZSl9cHhgLCB3aWR0aDogJzhweCcsIG1hcmdpbkxlZnQ6ICc1cHgnLCBiYWNrZ3JvdW5kOiAnYmxhY2snfX0vPlxuICAgICAgICA8L2Rpdj5cbiAgICAgIDwvZGl2PlxuICAgICk7XG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQge1xuICBhY3Rpb25SZWR1Y2Vyczoge1xuICAgIGFwcEluaXQ6IGFwcEluaXRSZWR1Y2VyXG4gIH0sXG4gIGxhdGVSZWR1Y2VyOiBmcmVxdWVuY3lBbmFseXNpc0xhdGVSZWR1Y2VyLFxuICB2aWV3czoge1xuICAgIEZyZXF1ZW5jeUFuYWx5c2lzOiBjb25uZWN0KEZyZXF1ZW5jeUFuYWx5c2lzU2VsZWN0b3IpKEZyZXF1ZW5jeUFuYWx5c2lzVmlldylcbiAgfSxcbn07XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvZnJlcXVlbmN5X2FuYWx5c2lzX2J1bmRsZS5qcyIsIi8qIChpZ25vcmVkKSAqL1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIGNyeXB0byAoaWdub3JlZClcbi8vIG1vZHVsZSBpZCA9IDU3OVxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJcbmltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQge2Nvbm5lY3R9IGZyb20gJ3JlYWN0LXJlZHV4JztcbmltcG9ydCB7QnV0dG9ufSBmcm9tICdyZWFjdC1ib290c3RyYXAnO1xuaW1wb3J0IHVwZGF0ZSBmcm9tICdpbW11dGFiaWxpdHktaGVscGVyJztcbmltcG9ydCB7ZGVsYXl9IGZyb20gJ3JlZHV4LXNhZ2EnO1xuaW1wb3J0IHtzZWxlY3QsIHRha2VMYXRlc3QsIHB1dH0gZnJvbSAncmVkdXgtc2FnYS9lZmZlY3RzJztcblxuaW1wb3J0IHthcHBseVJvdG9ycywgZ2V0Um90b3JTaGlmdH0gZnJvbSAnLi91dGlscyc7XG5cbmZ1bmN0aW9uIGFwcEluaXRSZWR1Y2VyIChzdGF0ZSwgX2FjdGlvbikge1xuICByZXR1cm4gey4uLnN0YXRlLCBzY2hlZHVsaW5nOiB7XG4gICAgc3RhdHVzOiAnc3RhcnQnLFxuICAgIHNwZWVkOiAxLjAsXG4gICAgcG9zaXRpb246IDAsXG4gICAgc2hpZnRzOiBbXSxcbiAgICBzdGFydFBvc2l0aW9uOiAwLFxuICAgIGVuZFBvc2l0aW9uOiAwLFxuICAgIGN1cnJlbnRUcmFjZTogW10sXG4gIH19O1xufVxuXG5mdW5jdGlvbiB0YXNrSW5pdFJlZHVjZXIgKHN0YXRlLCBfYWN0aW9uKSB7XG4gIGxldCB7c2NoZWR1bGluZywgdGFza0RhdGE6IHtjaXBoZXJUZXh0fX0gPSBzdGF0ZTtcbiAgc2NoZWR1bGluZyA9IHsuLi5zY2hlZHVsaW5nLCBlbmRQb3NpdGlvbjogY2lwaGVyVGV4dC5sZW5ndGggLSAxfTtcbiAgcmV0dXJuIHsuLi5zdGF0ZSwgc2NoZWR1bGluZ307XG59XG5cbmZ1bmN0aW9uIHNjaGVkdWxpbmdTdGF0dXNDaGFuZ2VkUmVkdWNlciAoc3RhdGUsIHtwYXlsb2FkOiB7c3RhdHVzfX0pIHtcbiAgY29uc3Qge3NjaGVkdWxpbmd9ID0gc3RhdGU7XG4gIGNvbnN0IGNoYW5nZXMgPSB7c3RhdHVzOiB7JHNldDogc3RhdHVzfX07XG4gIGlmIChzdGF0dXMgPT09ICdzdGFydCcpIHtcbiAgICBjaGFuZ2VzLnBvc2l0aW9uID0geyRzZXQ6IHNjaGVkdWxpbmcuc3RhcnRQb3NpdGlvbn07XG4gIH0gZWxzZSBpZiAoc3RhdHVzID09PSAnZW5kJykge1xuICAgIGNoYW5nZXMucG9zaXRpb24gPSB7JHNldDogc2NoZWR1bGluZy5lbmRQb3NpdGlvbn07XG4gIH0gZWxzZSBpZiAoc3RhdHVzID09PSAncGxheScpIHtcbiAgICBpZiAoc2NoZWR1bGluZy5wb3NpdGlvbiA9PT0gc2NoZWR1bGluZy5lbmRQb3NpdGlvbikge1xuICAgICAgY2hhbmdlcy5wb3NpdGlvbiA9IHskc2V0OiBzY2hlZHVsaW5nLnN0YXJ0UG9zaXRpb259O1xuICAgIH1cbiAgfVxuICByZXR1cm4gdXBkYXRlKHN0YXRlLCB7c2NoZWR1bGluZzogY2hhbmdlc30pO1xufVxuXG5mdW5jdGlvbiBzY2hlZHVsaW5nU3RlcEJhY2t3YXJkUmVkdWNlciAoc3RhdGUsIF9hY3Rpb24pIHtcbiAgY29uc3Qge3NjaGVkdWxpbmc6IHtwb3NpdGlvbn19ID0gc3RhdGU7XG4gIGlmIChwb3NpdGlvbiA9PT0gMCkgcmV0dXJuIHN0YXRlO1xuICByZXR1cm4gdXBkYXRlKHN0YXRlLCB7c2NoZWR1bGluZzoge1xuICAgIHN0YXR1czogeyRzZXQ6ICdwYXVzZSd9LFxuICAgIHBvc2l0aW9uOiB7JHNldDogcG9zaXRpb24gLSAxfVxuICB9fSk7XG59XG5cbmZ1bmN0aW9uIHNjaGVkdWxpbmdTdGVwRm9yd2FyZFJlZHVjZXIgKHN0YXRlLCBfYWN0aW9uKSB7XG4gIGNvbnN0IHtzY2hlZHVsaW5nOiB7cG9zaXRpb24sIGVuZFBvc2l0aW9ufX0gPSBzdGF0ZTtcbiAgaWYgKHBvc2l0aW9uID09PSBlbmRQb3NpdGlvbikgcmV0dXJuIHN0YXRlO1xuICByZXR1cm4gdXBkYXRlKHN0YXRlLCB7c2NoZWR1bGluZzoge1xuICAgIHN0YXR1czogeyRzZXQ6ICdwYXVzZSd9LFxuICAgIHBvc2l0aW9uOiB7JHNldDogcG9zaXRpb24gKyAxfVxuICB9fSk7XG59XG5cbmZ1bmN0aW9uIHNjaGVkdWxpbmdKdW1wUmVkdWNlciAoc3RhdGUsIHtwYXlsb2FkOiB7cG9zaXRpb259fSkge1xuICByZXR1cm4gdXBkYXRlKHN0YXRlLCB7c2NoZWR1bGluZzoge1xuICAgIHN0YXR1czogeyRzZXQ6ICdwYXVzZSd9LFxuICAgIHBvc2l0aW9uOiB7JHNldDogcG9zaXRpb259XG4gIH19KTtcbn1cblxuZnVuY3Rpb24gc2NoZWR1bGluZ1RpY2tSZWR1Y2VyIChzdGF0ZSwgX2FjdGlvbikge1xuICBjb25zdCB7c2NoZWR1bGluZzoge3Bvc2l0aW9uLCBlbmRQb3NpdGlvbn19ID0gc3RhdGU7XG4gIGlmIChwb3NpdGlvbiA9PT0gZW5kUG9zaXRpb24pIHtcbiAgICByZXR1cm4gdXBkYXRlKHN0YXRlLCB7c2NoZWR1bGluZzoge1xuICAgICAgc3RhdHVzOiB7JHNldDogJ2VuZCd9XG4gICAgfX0pO1xuICB9XG4gIHJldHVybiB1cGRhdGUoc3RhdGUsIHtzY2hlZHVsaW5nOiB7XG4gICAgcG9zaXRpb246IHskc2V0OiBwb3NpdGlvbiArIDF9XG4gIH19KTtcbn1cblxuZnVuY3Rpb24gc2NoZWR1bGluZ0xhdGVSZWR1Y2VyIChzdGF0ZSkge1xuICBjb25zdCB7dGFza0RhdGEsIHJvdG9ycywgc2NoZWR1bGluZ30gPSBzdGF0ZTtcbiAgaWYgKCF0YXNrRGF0YSkge1xuICAgIHJldHVybiBzdGF0ZTtcbiAgfVxuICBjb25zdCB7YWxwaGFiZXQsIGNpcGhlclRleHR9ID0gdGFza0RhdGE7XG4gIGNvbnN0IHtwb3NpdGlvbn0gPSBzY2hlZHVsaW5nO1xuICAvKiBDb21wdXRlIHRoZSByb3RvciBzaGlmdHMgYXQgdGhlIGN1cnJlbnQgcG9zaXRpb24gKi9cbiAgY29uc3Qgc2hpZnRzID0gcm90b3JzLm1hcChyb3RvciA9PiBnZXRSb3RvclNoaWZ0KHJvdG9yLCBwb3NpdGlvbikpO1xuICBjb25zdCByYW5rID0gYWxwaGFiZXQuaW5kZXhPZihjaXBoZXJUZXh0W3Bvc2l0aW9uXSk7XG4gIC8qIEFwcGx5IHRoZSByb3RvcnMgYXQgdGhlIGN1cnJlbnQgcG9zaXRpb24gdG8gb2J0YWluIGEgdHJhY2UgKGxpc3Qgb2Ygcm90b3JcbiAgICAgY2VsbHMgdXNlZCBkdXJpbmcgZGVjb2RpbmcpLCB0byBiZSBoaWdobGlnaHRlZCBieSB0aGUgcm90b3Igdmlld3MuICovXG4gIGNvbnN0IGN1cnJlbnRUcmFjZSA9IHJhbmsgPT09IC0xID8gbnVsbCA6IGFwcGx5Um90b3JzKHJvdG9ycywgcG9zaXRpb24sIHJhbmspLnRyYWNlO1xuICByZXR1cm4gdXBkYXRlKHN0YXRlLCB7c2NoZWR1bGluZzoge1xuICAgIHNoaWZ0czogeyRzZXQ6IHNoaWZ0c30sIGN1cnJlbnRUcmFjZTogeyRzZXQ6IGN1cnJlbnRUcmFjZX1cbiAgfX0pO1xufVxuXG5mdW5jdGlvbiogc2NoZWR1bGluZ1NhZ2EgKCkge1xuICBjb25zdCB7c2NoZWR1bGluZ1RpY2t9ID0geWllbGQgc2VsZWN0KCh7YWN0aW9uc30pID0+IGFjdGlvbnMpO1xuICBjb25zdCBzdGF0dXNDaGFuZ2luZ0FjdGlvbnMgPSB5aWVsZCBzZWxlY3QoKHthY3Rpb25zfSkgPT4gWydzY2hlZHVsaW5nU3RhdHVzQ2hhbmdlZCcsICdzY2hlZHVsaW5nU3RlcEJhY2t3YXJkJywgJ3NjaGVkdWxpbmdTdGVwRm9yd2FyZCcsICdzY2hlZHVsaW5nSnVtcCddLm1hcChuYW1lID0+IGFjdGlvbnNbbmFtZV0pKTtcbiAgeWllbGQgdGFrZUxhdGVzdChzdGF0dXNDaGFuZ2luZ0FjdGlvbnMsIGZ1bmN0aW9uKiAoKSB7XG4gICAgbGV0IHN0YXR1cyA9IHlpZWxkIHNlbGVjdCgoe3NjaGVkdWxpbmc6IHtzdGF0dXN9fSkgPT4gc3RhdHVzKTtcbiAgICBpZiAoc3RhdHVzID09PSAncGxheScpIHtcbiAgICAgIHdoaWxlICh0cnVlKSB7XG4gICAgICAgIHlpZWxkIHB1dCh7dHlwZTogc2NoZWR1bGluZ1RpY2t9KTtcbiAgICAgICAgc3RhdHVzID0geWllbGQgc2VsZWN0KCh7c2NoZWR1bGluZzoge3N0YXR1c319KSA9PiBzdGF0dXMpO1xuICAgICAgICBpZiAoJ3BsYXknICE9PSBzdGF0dXMpIHtcbiAgICAgICAgICByZXR1cm47IC8qIHJlYWNoZWQgZW5kIG9mIHRleHQgKi9cbiAgICAgICAgfVxuICAgICAgICB5aWVsZCBkZWxheSgxMDAwKTtcbiAgICAgIH1cbiAgICB9XG4gIH0pO1xufVxuXG5mdW5jdGlvbiBTY2hlZHVsaW5nQ29udHJvbHNTZWxlY3RvciAoc3RhdGUpIHtcbiAgY29uc3Qge2FjdGlvbnMsIHRhc2tEYXRhOiB7YWxwaGFiZXR9LCBzY2hlZHVsaW5nOiB7c3RhdHVzfX0gPSBzdGF0ZTtcbiAgY29uc3Qge3NjaGVkdWxpbmdTdGF0dXNDaGFuZ2VkLCBzY2hlZHVsaW5nU3RlcEJhY2t3YXJkLCBzY2hlZHVsaW5nU3RlcEZvcndhcmR9ID0gYWN0aW9ucztcbiAgY29uc3QgYWxwaGFiZXRTaXplID0gYWxwaGFiZXQubGVuZ3RoO1xuICByZXR1cm4ge3NjaGVkdWxpbmdTdGF0dXNDaGFuZ2VkLCBzY2hlZHVsaW5nU3RlcEJhY2t3YXJkLCBzY2hlZHVsaW5nU3RlcEZvcndhcmQsIHN0YXR1cywgYWxwaGFiZXRTaXplfTtcbn1cblxuY2xhc3MgU2NoZWR1bGluZ0NvbnRyb2xzVmlldyBleHRlbmRzIFJlYWN0LlB1cmVDb21wb25lbnQge1xuICByZW5kZXIgKCkge1xuICAgIGNvbnN0IHthbHBoYWJldFNpemUsIHN0YXR1c30gPSB0aGlzLnByb3BzO1xuICAgIHJldHVybiAoXG4gICAgICA8ZGl2IHN0eWxlPXt7d2lkdGg6IGAkezIwKmFscGhhYmV0U2l6ZX1weGAsIG1hcmdpbjogJzAgYXV0bycsIHRleHRBbGlnbjogJ2NlbnRlcid9fT5cbiAgICAgICAgPGRpdiBjbGFzc05hbWU9J2J0bi1ncm91cCc+XG4gICAgICAgICAgPEJ1dHRvbiBvbkNsaWNrPXt0aGlzLm9uRmFzdEJhY2t3YXJkQ2xpY2tlZH0gc3R5bGU9e3t3aWR0aDogJzQwcHgnfX0gYWN0aXZlPXtzdGF0dXMgPT09ICdzdGFydCd9PjxpIGNsYXNzTmFtZT0nZmEgZmEtZmFzdC1iYWNrd2FyZCcvPjwvQnV0dG9uPlxuICAgICAgICAgIDxCdXR0b24gb25DbGljaz17dGhpcy5vblN0ZXBCYWNrd2FyZENsaWNrZWR9IHN0eWxlPXt7d2lkdGg6ICc0MHB4J319PjxpIGNsYXNzTmFtZT0nZmEgZmEtc3RlcC1iYWNrd2FyZCcvPjwvQnV0dG9uPlxuICAgICAgICAgIDxCdXR0b24gb25DbGljaz17dGhpcy5vblBsYXlDbGlja2VkfSBzdHlsZT17e3dpZHRoOiAnNDBweCd9fSBhY3RpdmU9e3N0YXR1cyA9PT0gJ3BsYXknfT48aSBjbGFzc05hbWU9J2ZhIGZhLXBsYXknLz48L0J1dHRvbj5cbiAgICAgICAgICA8QnV0dG9uIG9uQ2xpY2s9e3RoaXMub25TdGVwRm9yd2FyZENsaWNrZWR9IHN0eWxlPXt7d2lkdGg6ICc0MHB4J319PjxpIGNsYXNzTmFtZT0nZmEgZmEtc3RlcC1mb3J3YXJkJy8+PC9CdXR0b24+XG4gICAgICAgICAgPEJ1dHRvbiBvbkNsaWNrPXt0aGlzLm9uRmFzdEZvcndhcmRDbGlja2VkfSBzdHlsZT17e3dpZHRoOiAnNDBweCd9fSBhY3RpdmU9e3N0YXR1cyA9PT0gJ2VuZCd9PjxpIGNsYXNzTmFtZT0nZmEgZmEtZmFzdC1mb3J3YXJkJy8+PC9CdXR0b24+XG4gICAgICAgIDwvZGl2PlxuICAgICAgPC9kaXY+XG4gICAgKTtcbiAgfVxuICBvbkZhc3RCYWNrd2FyZENsaWNrZWQgPSAoX2V2ZW50KSA9PiB7XG4gICAgdGhpcy5wcm9wcy5kaXNwYXRjaCh7dHlwZTogdGhpcy5wcm9wcy5zY2hlZHVsaW5nU3RhdHVzQ2hhbmdlZCwgcGF5bG9hZDoge3N0YXR1czogJ3N0YXJ0J319KTtcbiAgfTtcbiAgb25TdGVwQmFja3dhcmRDbGlja2VkID0gKF9ldmVudCkgPT4ge1xuICAgIHRoaXMucHJvcHMuZGlzcGF0Y2goe3R5cGU6IHRoaXMucHJvcHMuc2NoZWR1bGluZ1N0ZXBCYWNrd2FyZH0pO1xuICB9O1xuICBvblBsYXlDbGlja2VkID0gKF9ldmVudCkgPT4ge1xuICAgIHRoaXMucHJvcHMuZGlzcGF0Y2goe3R5cGU6IHRoaXMucHJvcHMuc2NoZWR1bGluZ1N0YXR1c0NoYW5nZWQsIHBheWxvYWQ6IHtzdGF0dXM6ICdwbGF5J319KTtcbiAgfTtcbiAgb25TdGVwRm9yd2FyZENsaWNrZWQgPSAoX2V2ZW50KSA9PiB7XG4gICAgdGhpcy5wcm9wcy5kaXNwYXRjaCh7dHlwZTogdGhpcy5wcm9wcy5zY2hlZHVsaW5nU3RlcEZvcndhcmR9KTtcbiAgfTtcbiAgb25GYXN0Rm9yd2FyZENsaWNrZWQgPSAoX2V2ZW50KSA9PiB7XG4gICAgdGhpcy5wcm9wcy5kaXNwYXRjaCh7dHlwZTogdGhpcy5wcm9wcy5zY2hlZHVsaW5nU3RhdHVzQ2hhbmdlZCwgcGF5bG9hZDoge3N0YXR1czogJ2VuZCd9fSk7XG4gIH07XG59XG5cbmV4cG9ydCBkZWZhdWx0IHtcbiAgYWN0aW9uczoge1xuICAgIHNjaGVkdWxpbmdTdGF0dXNDaGFuZ2VkOiAnU2NoZWR1bGluZy5TdGF0dXMuQ2hhbmdlZCcsXG4gICAgc2NoZWR1bGluZ1N0ZXBCYWNrd2FyZDogJ1NjaGVkdWxpbmcuU3RlcEJhY2t3YXJkJyxcbiAgICBzY2hlZHVsaW5nU3RlcEZvcndhcmQ6ICdTY2hlZHVsaW5nLlN0ZXBGb3J3YXJkJyxcbiAgICBzY2hlZHVsaW5nSnVtcDogJ1NjaGVkdWxpbmcuSnVtcCcsXG4gICAgc2NoZWR1bGluZ1RpY2s6ICdTY2hlZHVsaW5nLlRpY2snLFxuICB9LFxuICBhY3Rpb25SZWR1Y2Vyczoge1xuICAgIGFwcEluaXQ6IGFwcEluaXRSZWR1Y2VyLFxuICAgIHRhc2tJbml0OiB0YXNrSW5pdFJlZHVjZXIsXG4gICAgc2NoZWR1bGluZ1N0YXR1c0NoYW5nZWQ6IHNjaGVkdWxpbmdTdGF0dXNDaGFuZ2VkUmVkdWNlcixcbiAgICBzY2hlZHVsaW5nU3RlcEJhY2t3YXJkOiBzY2hlZHVsaW5nU3RlcEJhY2t3YXJkUmVkdWNlcixcbiAgICBzY2hlZHVsaW5nU3RlcEZvcndhcmQ6IHNjaGVkdWxpbmdTdGVwRm9yd2FyZFJlZHVjZXIsXG4gICAgc2NoZWR1bGluZ0p1bXA6IHNjaGVkdWxpbmdKdW1wUmVkdWNlcixcbiAgICBzY2hlZHVsaW5nVGljazogc2NoZWR1bGluZ1RpY2tSZWR1Y2VyLFxuICB9LFxuICBsYXRlUmVkdWNlcjogc2NoZWR1bGluZ0xhdGVSZWR1Y2VyLFxuICBzYWdhOiBzY2hlZHVsaW5nU2FnYSxcbiAgdmlld3M6IHtcbiAgICBTY2hlZHVsaW5nQ29udHJvbHM6IGNvbm5lY3QoU2NoZWR1bGluZ0NvbnRyb2xzU2VsZWN0b3IpKFNjaGVkdWxpbmdDb250cm9sc1ZpZXcpLFxuICB9XG59O1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL3NjaGVkdWxpbmdfYnVuZGxlLmpzIiwiXG5pbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IHtjb25uZWN0fSBmcm9tICdyZWFjdC1yZWR1eCc7XG5pbXBvcnQgY2xhc3NuYW1lcyBmcm9tICdjbGFzc25hbWVzJztcbmltcG9ydCB7cmFuZ2V9IGZyb20gJ3JhbmdlJztcbmltcG9ydCB1cGRhdGUgZnJvbSAnaW1tdXRhYmlsaXR5LWhlbHBlcic7XG5cbmltcG9ydCB7d3JhcEFyb3VuZCwgbWFrZVJvdG9yLCBlZGl0Um90b3JDZWxsLCBsb2NrUm90b3JDZWxsLCB1cGRhdGVSb3RvcldpdGhLZXl9IGZyb20gJy4vdXRpbHMnO1xuXG5mdW5jdGlvbiBhcHBJbml0UmVkdWNlciAoc3RhdGUsIF9hY3Rpb24pIHtcbiAgcmV0dXJuIHsuLi5zdGF0ZSwgcm90b3JzOiBbXSwgZWRpdGluZzoge319O1xufVxuXG5mdW5jdGlvbiByb3RvckNlbGxFZGl0U3RhcnRlZFJlZHVjZXIgKHN0YXRlLCB7cGF5bG9hZDoge3JvdG9ySW5kZXgsIGNlbGxSYW5rfX0pIHtcbiAgbGV0IHt0YXNrRGF0YToge2FscGhhYmV0fSwgcm90b3JzfSA9IHN0YXRlO1xuICByb3RvckluZGV4ID0gd3JhcEFyb3VuZChyb3RvckluZGV4LCByb3RvcnMubGVuZ3RoKTtcbiAgY2VsbFJhbmsgPSB3cmFwQXJvdW5kKGNlbGxSYW5rLCBhbHBoYWJldC5sZW5ndGgpO1xuICByZXR1cm4gdXBkYXRlKHN0YXRlLCB7ZWRpdGluZzogeyRzZXQ6IHtyb3RvckluZGV4LCBjZWxsUmFua319fSk7XG59XG5cbmZ1bmN0aW9uIHJvdG9yQ2VsbEVkaXRNb3ZlZFJlZHVjZXIgKHN0YXRlLCB7cGF5bG9hZDoge3JvdG9yTW92ZSwgY2VsbE1vdmV9fSkge1xuICBsZXQge3Rhc2tEYXRhOiB7YWxwaGFiZXR9LCByb3RvcnMsIGVkaXRpbmc6IHtyb3RvckluZGV4LCBjZWxsUmFua319ID0gc3RhdGU7XG4gIGxldCByb3RvclN0b3AgPSByb3RvckluZGV4LCBjZWxsU3RvcCA9IGNlbGxSYW5rO1xuICBpZiAocm90b3JJbmRleCA9PT0gdW5kZWZpbmVkIHx8IGNlbGxSYW5rID09PSB1bmRlZmluZWQpIHJldHVybiBzdGF0ZTtcbiAgbGV0IGNlbGw7XG4gIGRvIHtcbiAgICByb3RvckluZGV4ID0gd3JhcEFyb3VuZChyb3RvckluZGV4ICsgcm90b3JNb3ZlLCByb3RvcnMubGVuZ3RoKTtcbiAgICBjZWxsUmFuayA9IHdyYXBBcm91bmQoY2VsbFJhbmsgKyBjZWxsTW92ZSwgYWxwaGFiZXQubGVuZ3RoKTtcbiAgICBjZWxsID0gcm90b3JzW3JvdG9ySW5kZXhdLmNlbGxzW2NlbGxSYW5rXTtcbiAgICAvKiBJZiB3ZSBsb29wZWQgYmFjayB0byB0aGUgc3RhcnRpbmcgcG9pbnQsIHRoZSBtb3ZlIGlzIGltcG9zc2libGUuICovXG4gICAgaWYgKHJvdG9yU3RvcCA9PSByb3RvckluZGV4IHx8IGNlbGxTdG9wID09IGNlbGxSYW5rKSByZXR1cm4gc3RhdGU7XG4gIH0gd2hpbGUgKGNlbGwuaGludCB8fCBjZWxsLmxvY2tlZCk7XG4gIHJldHVybiB1cGRhdGUoc3RhdGUsIHtlZGl0aW5nOiB7JHNldDoge3JvdG9ySW5kZXgsIGNlbGxSYW5rfX19KTtcbn1cblxuZnVuY3Rpb24gcm90b3JDZWxsRWRpdENhbmNlbGxlZFJlZHVjZXIgKHN0YXRlLCBfYWN0aW9uKSB7XG4gIHJldHVybiB1cGRhdGUoc3RhdGUsIHtlZGl0aW5nOiB7JHNldDoge319fSk7XG59XG5cbmZ1bmN0aW9uIHJvdG9yQ2VsbENoYXJDaGFuZ2VkUmVkdWNlciAoc3RhdGUsIHtwYXlsb2FkOiB7cm90b3JJbmRleCwgcmFuaywgc3ltYm9sfX0pIHtcbiAgbGV0IHt0YXNrRGF0YToge2FscGhhYmV0fSwgcm90b3JzfSA9IHN0YXRlO1xuICBpZiAoc3ltYm9sLmxlbmd0aCAhPT0gMSB8fCAtMSA9PT0gYWxwaGFiZXQuaW5kZXhPZihzeW1ib2wpKSB7XG4gICAgc3ltYm9sID0gbnVsbDtcbiAgfVxuICBjb25zdCByb3RvciA9IGVkaXRSb3RvckNlbGwocm90b3JzW3JvdG9ySW5kZXhdLCByYW5rLCBzeW1ib2wpO1xuICByZXR1cm4gdXBkYXRlKHN0YXRlLCB7cm90b3JzOiB7W3JvdG9ySW5kZXhdOiB7JHNldDogcm90b3J9fX0pO1xufVxuXG5mdW5jdGlvbiByb3RvckNlbGxMb2NrQ2hhbmdlZFJlZHVjZXIgKHN0YXRlLCB7cGF5bG9hZDoge3JvdG9ySW5kZXgsIHJhbmssIGlzTG9ja2VkfX0pIHtcbiAgY29uc3Qgcm90b3IgPSBsb2NrUm90b3JDZWxsKHN0YXRlLnJvdG9yc1tyb3RvckluZGV4XSwgcmFuaywgaXNMb2NrZWQpO1xuICByZXR1cm4gdXBkYXRlKHN0YXRlLCB7cm90b3JzOiB7W3JvdG9ySW5kZXhdOiB7JHNldDogcm90b3J9fX0pO1xufVxuXG5mdW5jdGlvbiByb3RvcktleUxvYWRlZFJlZHVjZXIgKHN0YXRlLCB7cGF5bG9hZDoge3JvdG9ySW5kZXgsIGtleX19KSB7XG4gIGNvbnN0IHt0YXNrRGF0YToge2FscGhhYmV0fSwgcm90b3JzfSA9IHN0YXRlO1xuICBjb25zdCByb3RvciA9IHVwZGF0ZVJvdG9yV2l0aEtleShhbHBoYWJldCwgcm90b3JzW3JvdG9ySW5kZXhdLCBrZXkpO1xuICByZXR1cm4gdXBkYXRlKHN0YXRlLCB7cm90b3JzOiB7W3JvdG9ySW5kZXhdOiB7JHNldDogcm90b3J9fX0pO1xufVxuXG5mdW5jdGlvbiBSb3RvclNlbGVjdG9yIChzdGF0ZSwge2luZGV4fSkge1xuICBjb25zdCB7XG4gICAgYWN0aW9uczoge1xuICAgICAgcm90b3JDZWxsTG9ja0NoYW5nZWQsIHJvdG9yQ2VsbENoYXJDaGFuZ2VkLFxuICAgICAgcm90b3JDZWxsRWRpdENhbmNlbGxlZCwgcm90b3JDZWxsRWRpdFN0YXJ0ZWQsIHJvdG9yQ2VsbEVkaXRNb3ZlZFxuICAgIH0sXG4gICAgcm90b3JzLCBzY2hlZHVsaW5nOiB7c2hpZnRzLCBjdXJyZW50VHJhY2V9LCBlZGl0aW5nXG4gIH0gPSBzdGF0ZTtcbiAgY29uc3Qge2VkaXRhYmxlUm93LCBjZWxsc30gPSByb3RvcnNbaW5kZXhdO1xuICBjb25zdCBzaGlmdCA9IHNoaWZ0c1tpbmRleF07XG4gIGNvbnN0IGFjdGl2ZVJhbmsgPSBjdXJyZW50VHJhY2VbaW5kZXhdICYmIGN1cnJlbnRUcmFjZVtpbmRleF0ucmFuaztcbiAgY29uc3QgZWRpdGluZ1JhbmsgPSBlZGl0aW5nLnJvdG9ySW5kZXggPT09IGluZGV4ID8gZWRpdGluZy5jZWxsUmFuayA6IG51bGw7XG4gIHJldHVybiB7XG4gICAgcm90b3JDZWxsRWRpdFN0YXJ0ZWQsIHJvdG9yQ2VsbEVkaXRDYW5jZWxsZWQsIHJvdG9yQ2VsbEVkaXRNb3ZlZCxcbiAgICByb3RvckNlbGxMb2NrQ2hhbmdlZCwgcm90b3JDZWxsQ2hhckNoYW5nZWQsXG4gICAgZWRpdGFibGVSb3csIGNlbGxzLCBzaGlmdCwgZWRpdGluZ1JhbmssIGFjdGl2ZVJhbmtcbiAgfTtcbn1cblxuY2xhc3MgUm90b3JWaWV3IGV4dGVuZHMgUmVhY3QuUHVyZUNvbXBvbmVudCB7XG4gIHJlbmRlciAoKSB7XG4gICAgY29uc3Qge2luZGV4LCBlZGl0YWJsZVJvdywgY2VsbHMsIHNoaWZ0LCBlZGl0aW5nUmFuaywgYWN0aXZlUmFua30gPSB0aGlzLnByb3BzO1xuICAgIGNvbnN0IG5iQ2VsbHMgPSBjZWxscy5sZW5ndGg7XG4gICAgcmV0dXJuIChcbiAgICAgIDxkaXYgc3R5bGU9e3t3aWR0aDogYCR7MjAqbmJDZWxsc31weGB9fT5cbiAgICAgICAgPGRpdiBjbGFzc05hbWU9J2NsZWFyZml4Jz5cbiAgICAgICAgICB7cmFuZ2UoMCwgbmJDZWxscykubWFwKHJhbmsgPT4ge1xuICAgICAgICAgICAgY29uc3Qge2VkaXRhYmxlLCBsb2NrZWQsIGNvbmZsaWN0LCBoaW50fSA9IGNlbGxzW3JhbmtdO1xuICAgICAgICAgICAgY29uc3QgaXNBY3RpdmUgPSBhY3RpdmVSYW5rID09PSByYW5rO1xuICAgICAgICAgICAgY29uc3QgaXNFZGl0aW5nID0gZWRpdGluZ1JhbmsgPT09IHJhbmsgJiYgIWxvY2tlZCAmJiAhaGludDtcbiAgICAgICAgICAgIGNvbnN0IGlzTGFzdCA9IG5iQ2VsbHMgPT09IHJhbmsgKyAxO1xuICAgICAgICAgICAgY29uc3Qgc2hpZnRlZEluZGV4ID0gKHJhbmsgKyBzaGlmdCkgJSBuYkNlbGxzO1xuICAgICAgICAgICAgY29uc3Qge3JvdGF0aW5nfSA9IGNlbGxzW3NoaWZ0ZWRJbmRleF07XG4gICAgICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgICA8Um90b3JDZWxsIGtleT17cmFua30gcmFuaz17cmFua30gaXNMYXN0PXtpc0xhc3R9IGVkaXRhYmxlUm93PXtlZGl0YWJsZVJvd31cbiAgICAgICAgICAgICAgICBzdGF0aWNDaGFyPXtyb3RhdGluZ30gZWRpdGFibGVDaGFyPXtlZGl0YWJsZX0gaXNMb2NrZWQ9e2xvY2tlZH0gaXNIaW50PXtoaW50fSBpc0VkaXRpbmc9e2lzRWRpdGluZ30gaXNBY3RpdmU9e2lzQWN0aXZlfVxuICAgICAgICAgICAgICAgIG9uQ2hhbmdlQ2hhcj17dGhpcy5vbkNoYW5nZUNoYXJ9IG9uQ2hhbmdlTG9ja2VkPXt0aGlzLm9uQ2hhbmdlTG9ja2VkfVxuICAgICAgICAgICAgICAgIG9uRWRpdGluZ1N0YXJ0ZWQ9e3RoaXMub25FZGl0aW5nU3RhcnRlZH0gb25FZGl0aW5nQ2FuY2VsbGVkPXt0aGlzLm9uRWRpdGluZ0NhbmNlbGxlZH1cbiAgICAgICAgICAgICAgICBvbkVkaXRpbmdNb3ZlZD17dGhpcy5lZGl0aW5nTW92ZWR9IGlzQ29uZmxpY3Q9e2NvbmZsaWN0fSAvPik7XG4gICAgICAgICAgfSl9XG4gICAgICAgIDwvZGl2PlxuICAgICAgPC9kaXY+XG4gICAgKTtcbiAgfVxuICBvbkVkaXRpbmdTdGFydGVkID0gKHJhbmspID0+IHtcbiAgICB0aGlzLnByb3BzLmRpc3BhdGNoKHt0eXBlOiB0aGlzLnByb3BzLnJvdG9yQ2VsbEVkaXRTdGFydGVkLCBwYXlsb2FkOiB7cm90b3JJbmRleDogdGhpcy5wcm9wcy5pbmRleCwgY2VsbFJhbms6IHJhbmt9fSk7XG4gIH07XG4gIG9uRWRpdGluZ0NhbmNlbGxlZCA9ICgpID0+IHtcbiAgICB0aGlzLnByb3BzLmRpc3BhdGNoKHt0eXBlOiB0aGlzLnByb3BzLnJvdG9yQ2VsbEVkaXRDYW5jZWxsZWR9KTtcbiAgfTtcbiAgb25DaGFuZ2VDaGFyID0gKHJhbmssIHN5bWJvbCkgPT4ge1xuICAgIHN5bWJvbCA9IHN5bWJvbC50b1VwcGVyQ2FzZSgpO1xuICAgIHRoaXMucHJvcHMuZGlzcGF0Y2goe3R5cGU6IHRoaXMucHJvcHMucm90b3JDZWxsQ2hhckNoYW5nZWQsIHBheWxvYWQ6IHtyb3RvckluZGV4OiB0aGlzLnByb3BzLmluZGV4LCByYW5rLCBzeW1ib2x9fSk7XG4gIH07XG4gIG9uQ2hhbmdlTG9ja2VkID0gKHJhbmssIGlzTG9ja2VkKSA9PiB7XG4gICAgdGhpcy5wcm9wcy5kaXNwYXRjaCh7dHlwZTogdGhpcy5wcm9wcy5yb3RvckNlbGxMb2NrQ2hhbmdlZCwgcGF5bG9hZDoge3JvdG9ySW5kZXg6IHRoaXMucHJvcHMuaW5kZXgsIHJhbmssIGlzTG9ja2VkfX0pO1xuICB9O1xuICBlZGl0aW5nTW92ZWQgPSAocm90b3JNb3ZlLCBjZWxsTW92ZSkgPT4ge1xuICAgIHRoaXMucHJvcHMuZGlzcGF0Y2goe3R5cGU6IHRoaXMucHJvcHMucm90b3JDZWxsRWRpdE1vdmVkLCBwYXlsb2FkOiB7cm90b3JNb3ZlLCBjZWxsTW92ZX19KTtcbiAgfTtcbn1cblxuY2xhc3MgUm90b3JDZWxsIGV4dGVuZHMgUmVhY3QuUHVyZUNvbXBvbmVudCB7XG4gIC8qIFhYWCBDbGlja2luZyBpbiB0aGUgZWRpdGFibGUgZGl2IGFuZCBlbnRlcmluZyB0aGUgc2FtZSBsZXR0ZXIgZG9lcyBub3RcbiAgICAgICAgIHRyaWdnZXIgYSBjaGFuZ2UgZXZlbnQuICBUaGlzIGJlaGF2aW9yIGlzIHVuZm9ydHVuYXRlLiAqL1xuICByZW5kZXIgKCkge1xuICAgIGNvbnN0IHtzdGF0aWNDaGFyLCBlZGl0YWJsZUNoYXIsIGlzTG9ja2VkLCBpc0hpbnQsIGlzQWN0aXZlLCBpc0VkaXRpbmcsIGVkaXRhYmxlUm93LCBpc0xhc3QsIGlzQ29uZmxpY3R9ID0gdGhpcy5wcm9wcztcbiAgICBjb25zdCBjb2x1bW5TdHlsZSA9IHtcbiAgICAgIGZsb2F0OiAnbGVmdCcsXG4gICAgICB3aWR0aDogJzIwcHgnLFxuICAgIH07XG4gICAgY29uc3Qgc3RhdGljQ2VsbFN0eWxlID0ge1xuICAgICAgYm9yZGVyOiAnMXB4IHNvbGlkIGJsYWNrJyxcbiAgICAgIGJvcmRlclJpZ2h0V2lkdGg6IGlzTGFzdCA/ICcxcHgnIDogJzAnLFxuICAgICAgdGV4dEFsaWduOiAnY2VudGVyJyxcbiAgICB9O1xuICAgIGNvbnN0IGVkaXRhYmxlQ2VsbFN0eWxlID0ge1xuICAgICAgYm9yZGVyOiAnMXB4IHNvbGlkIGJsYWNrJyxcbiAgICAgIGJvcmRlclJpZ2h0V2lkdGg6IGlzTGFzdCA/ICcxcHgnIDogJzAnLFxuICAgICAgdGV4dEFsaWduOiAnY2VudGVyJyxcbiAgICAgIGN1cnNvcjogJ3RleHQnLFxuICAgICAgYmFja2dyb3VuZENvbG9yOiBpc0hpbnQgPyAnI2FmYScgOiAoaXNDb25mbGljdCA/ICcjZmNjJyA6ICcjZmZmJylcbiAgICB9O1xuICAgIC8qIEFwcGx5IGFjdGl2ZS1zdGF0dXMgc2VwYXJhdGlvbiBib3JkZXIgc3R5bGUuICovXG4gICAgY29uc3QgYm90dG9tQ2VsbFN0eWxlID0gZWRpdGFibGVSb3cgPT09ICd0b3AnID8gc3RhdGljQ2VsbFN0eWxlIDogZWRpdGFibGVDZWxsU3R5bGU7XG4gICAgaWYgKGlzQWN0aXZlKSB7XG4gICAgICBib3R0b21DZWxsU3R5bGUubWFyZ2luVG9wID0gJzAnO1xuICAgICAgYm90dG9tQ2VsbFN0eWxlLmJvcmRlclRvcFdpZHRoID0gJzNweCc7XG4gICAgfSBlbHNlIHtcbiAgICAgIGJvdHRvbUNlbGxTdHlsZS5tYXJnaW5Ub3AgPSAnMnB4JztcbiAgICAgIGJvdHRvbUNlbGxTdHlsZS5ib3JkZXJUb3BXaWR0aCA9ICcxcHgnOyAvKiBuZWVkZWQgYmVjYXVzZSByZWFjdCAqL1xuICAgIH1cbiAgICBjb25zdCBzdGF0aWNDZWxsID0gKFxuICAgICAgPGRpdiBzdHlsZT17c3RhdGljQ2VsbFN0eWxlfT5cbiAgICAgICAge3N0YXRpY0NoYXIgfHwgJ1xcdTAwQTAnfVxuICAgICAgPC9kaXY+XG4gICAgKTtcbiAgICBjb25zdCBlZGl0YWJsZUNlbGwgPSAoXG4gICAgICA8ZGl2IHN0eWxlPXtlZGl0YWJsZUNlbGxTdHlsZX0gb25DbGljaz17dGhpcy5zdGFydEVkaXRpbmd9PlxuICAgICAgICB7aXNFZGl0aW5nXG4gICAgICAgICAgPyA8aW5wdXQgcmVmPXt0aGlzLnJlZklucHV0fSBvbkNoYW5nZT17dGhpcy5jZWxsQ2hhbmdlZH0gb25LZXlEb3duPXt0aGlzLmtleURvd259XG4gICAgICAgICAgICAgIHR5cGU9J3RleHQnIHZhbHVlPXtlZGl0YWJsZUNoYXJ8fCcnfSBzdHlsZT17e3dpZHRoOiAnMTlweCcsIGhlaWdodDogJzIwcHgnLCBib3JkZXI6ICdub25lJywgdGV4dEFsaWduOiAnY2VudGVyJ319IC8+XG4gICAgICAgICAgOiAoZWRpdGFibGVDaGFyIHx8ICdcXHUwMEEwJyl9XG4gICAgICA8L2Rpdj5cbiAgICApO1xuICAgIGNvbnN0IGxvY2sgPSAoXG4gICAgICA8ZGl2IHN0eWxlPXt7bWFyZ2luVG9wOiAnMnB4JywgdGV4dEFsaWduOiAnY2VudGVyJywgY3Vyc29yOiAncG9pbnRlcid9fSBvbkNsaWNrPXt0aGlzLmxvY2tDbGlja2VkfT5cbiAgICAgICAge2lzSGludCB8fCA8aSBjbGFzc05hbWU9e2NsYXNzbmFtZXMoWydmYScsIGlzTG9ja2VkID8gJ2ZhLWxvY2snIDogJ2ZhLXVubG9jay1hbHQnXSl9IC8+fVxuICAgICAgPC9kaXY+XG4gICAgKTtcbiAgICBpZiAoZWRpdGFibGVSb3cgPT09ICd0b3AnKSB7XG4gICAgICByZXR1cm4gKFxuICAgICAgICA8ZGl2IHN0eWxlPXtjb2x1bW5TdHlsZX0+XG4gICAgICAgICAge2VkaXRhYmxlQ2VsbH17c3RhdGljQ2VsbH17bG9ja31cbiAgICAgICAgPC9kaXY+XG4gICAgICApO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gKFxuICAgICAgICA8ZGl2IHN0eWxlPXtjb2x1bW5TdHlsZX0+XG4gICAgICAgICAge3N0YXRpY0NlbGx9e2VkaXRhYmxlQ2VsbH17bG9ja31cbiAgICAgICAgPC9kaXY+XG4gICAgICApO1xuICAgIH1cbiAgfVxuICBjb21wb25lbnREaWRVcGRhdGUgKCkge1xuICAgIGlmICh0aGlzLl9pbnB1dCkge1xuICAgICAgdGhpcy5faW5wdXQuc2VsZWN0KCk7XG4gICAgICB0aGlzLl9pbnB1dC5mb2N1cygpO1xuICAgIH1cbiAgfVxuICBzdGFydEVkaXRpbmcgPSAoKSA9PiB7XG4gICAgaWYgKCF0aGlzLnByb3BzLmlzTG9ja2VkICYmICF0aGlzLnByb3BzLmlzRWRpdGluZykge1xuICAgICAgdGhpcy5wcm9wcy5vbkVkaXRpbmdTdGFydGVkKHRoaXMucHJvcHMucmFuayk7XG4gICAgfVxuICB9O1xuICBrZXlEb3duID0gKGV2ZW50KSA9PiB7XG4gICAgbGV0IGhhbmRsZWQgPSB0cnVlO1xuICAgIGlmIChldmVudC5rZXkgPT09ICdBcnJvd1JpZ2h0Jykge1xuICAgICAgdGhpcy5wcm9wcy5vbkVkaXRpbmdNb3ZlZCgwLCAxKTtcbiAgICB9IGVsc2UgaWYgKGV2ZW50LmtleSA9PT0gJ0Fycm93TGVmdCcpIHtcbiAgICAgIHRoaXMucHJvcHMub25FZGl0aW5nTW92ZWQoMCwgLTEpO1xuICAgIH0gZWxzZSBpZiAoZXZlbnQua2V5ID09PSAnQXJyb3dVcCcpIHtcbiAgICAgIHRoaXMucHJvcHMub25FZGl0aW5nTW92ZWQoLTEsIDApO1xuICAgIH0gZWxzZSBpZiAoZXZlbnQua2V5ID09PSAnQXJyb3dEb3duJykge1xuICAgICAgdGhpcy5wcm9wcy5vbkVkaXRpbmdNb3ZlZCgxLCAwKTtcbiAgICB9IGVsc2UgaWYgKGV2ZW50LmtleSA9PT0gJ0VzY2FwZScgfHwgZXZlbnQua2V5ID09PSAnRW50ZXInKSB7XG4gICAgICB0aGlzLnByb3BzLm9uRWRpdGluZ0NhbmNlbGxlZCgpO1xuICAgIH0gZWxzZSB7XG4gICAgICBoYW5kbGVkID0gZmFsc2U7XG4gICAgfVxuICAgIGlmIChoYW5kbGVkKSB7XG4gICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgfVxuICB9O1xuICBjZWxsQ2hhbmdlZCA9ICgpID0+IHtcbiAgICBjb25zdCB2YWx1ZSA9IHRoaXMuX2lucHV0LnZhbHVlLnN1YnN0cigtMSk7IC8qIC8hXFwgSUUgY29tcGF0aWJpbGl0eSAqL1xuICAgIHRoaXMucHJvcHMub25DaGFuZ2VDaGFyKHRoaXMucHJvcHMucmFuaywgdmFsdWUpO1xuICB9O1xuICBsb2NrQ2xpY2tlZCA9ICgpID0+IHtcbiAgICB0aGlzLnByb3BzLm9uQ2hhbmdlTG9ja2VkKHRoaXMucHJvcHMucmFuaywgIXRoaXMucHJvcHMuaXNMb2NrZWQpO1xuICB9O1xuICByZWZJbnB1dCA9IChlbGVtZW50KSA9PiB7XG4gICAgdGhpcy5faW5wdXQgPSBlbGVtZW50O1xuICB9O1xufVxuXG5leHBvcnQgZGVmYXVsdCB7XG4gIGFjdGlvbnM6IHtcbiAgICByb3RvckNlbGxFZGl0U3RhcnRlZDogJ1JvdG9yLkNlbGwuRWRpdC5TdGFydGVkJyxcbiAgICByb3RvckNlbGxFZGl0TW92ZWQ6ICdSb3Rvci5DZWxsLkVkaXQuTW92ZWQnLFxuICAgIHJvdG9yQ2VsbEVkaXRDYW5jZWxsZWQ6ICdSb3Rvci5DZWxsLkVkaXQuQ2FuY2VsbGVkJyxcbiAgICByb3RvckNlbGxMb2NrQ2hhbmdlZDogJ1JvdG9yLkNlbGwuTG9jay5DaGFuZ2VkJyxcbiAgICByb3RvckNlbGxDaGFyQ2hhbmdlZDogJ1JvdG9yLkNlbGwuQ2hhci5DaGFuZ2VkJyxcbiAgICByb3RvcktleUxvYWRlZDogJ1JvdG9yLktleS5Mb2FkZWQnLFxuICB9LFxuICBhY3Rpb25SZWR1Y2Vyczoge1xuICAgIGFwcEluaXQ6IGFwcEluaXRSZWR1Y2VyLFxuICAgIHJvdG9yQ2VsbEVkaXRTdGFydGVkOiByb3RvckNlbGxFZGl0U3RhcnRlZFJlZHVjZXIsXG4gICAgcm90b3JDZWxsRWRpdE1vdmVkOiByb3RvckNlbGxFZGl0TW92ZWRSZWR1Y2VyLFxuICAgIHJvdG9yQ2VsbEVkaXRDYW5jZWxsZWQ6IHJvdG9yQ2VsbEVkaXRDYW5jZWxsZWRSZWR1Y2VyLFxuICAgIHJvdG9yQ2VsbExvY2tDaGFuZ2VkOiByb3RvckNlbGxMb2NrQ2hhbmdlZFJlZHVjZXIsXG4gICAgcm90b3JDZWxsQ2hhckNoYW5nZWQ6IHJvdG9yQ2VsbENoYXJDaGFuZ2VkUmVkdWNlcixcbiAgICByb3RvcktleUxvYWRlZDogcm90b3JLZXlMb2FkZWRSZWR1Y2VyLFxuICB9LFxuICB2aWV3czoge1xuICAgIFJvdG9yOiBjb25uZWN0KFJvdG9yU2VsZWN0b3IpKFJvdG9yVmlldylcbiAgfVxufTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9yb3RvcnNfYnVuZGxlLmpzIiwiLypcbi0gc2hvd3MgYSBzbGljZSBvZiB0aGUgY2xlYXJUZXh0XG4tIGFkZHMgZGVjaXBoZXJlZCBjaGFyYWN0ZXJzIGZyb20gc3RhcnQgdXAgdG8gdGhlIFwiY3VycmVudFwiIGFuaW1hdGlvbiBwb3NpdGlvblxuICAobGF6aWx5IGNvbXB1dGVkKVxuLSBzY3JvbGxpbmcgZG9lcyBub3QgYWZmZWN0IHRoZSBjdXJyZW50IGFuaW1hdGlvbiBwb3NpdGlvblxuKi9cblxuXG5pbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IHtjb25uZWN0fSBmcm9tICdyZWFjdC1yZWR1eCc7XG5cbmltcG9ydCB7dXBkYXRlR3JpZEdlb21ldHJ5LCB1cGRhdGVHcmlkVmlzaWJsZVJvd3MsIGFwcGx5Um90b3JzfSBmcm9tICcuL3V0aWxzJztcblxuZnVuY3Rpb24gYXBwSW5pdFJlZHVjZXIgKHN0YXRlLCBfYWN0aW9uKSB7XG4gIHJldHVybiB7Li4uc3RhdGUsIGRlY2lwaGVyZWRUZXh0OiB7XG4gICAgY2VsbFdpZHRoOiAxNSxcbiAgICBjZWxsSGVpZ2h0OiA0NixcbiAgICBzY3JvbGxUb3A6IDAsXG4gICAgbmJDZWxsczogMFxuICB9fTtcbn1cblxuZnVuY3Rpb24gdGFza0luaXRSZWR1Y2VyIChzdGF0ZSwgX2FjdGlvbikge1xuICBsZXQge2RlY2lwaGVyZWRUZXh0LCB0YXNrRGF0YToge2NpcGhlclRleHR9fSA9IHN0YXRlO1xuICBkZWNpcGhlcmVkVGV4dCA9IHsuLi5kZWNpcGhlcmVkVGV4dCwgbmJDZWxsczogY2lwaGVyVGV4dC5sZW5ndGh9O1xuICByZXR1cm4gey4uLnN0YXRlLCBkZWNpcGhlcmVkVGV4dH07XG59XG5cbmZ1bmN0aW9uIGRlY2lwaGVyZWRUZXh0UmVzaXplZFJlZHVjZXIgKHN0YXRlLCB7cGF5bG9hZDoge3dpZHRofX0pIHtcbiAgbGV0IHtkZWNpcGhlcmVkVGV4dH0gPSBzdGF0ZTtcbiAgZGVjaXBoZXJlZFRleHQgPSB7Li4uZGVjaXBoZXJlZFRleHQsIHdpZHRoLCBoZWlnaHQ6IDQgKiBkZWNpcGhlcmVkVGV4dC5jZWxsSGVpZ2h0fTtcbiAgZGVjaXBoZXJlZFRleHQgPSB1cGRhdGVHcmlkR2VvbWV0cnkoZGVjaXBoZXJlZFRleHQpO1xuICByZXR1cm4gey4uLnN0YXRlLCBkZWNpcGhlcmVkVGV4dH07XG59XG5cbmZ1bmN0aW9uIGRlY2lwaGVyZWRUZXh0U2Nyb2xsZWRSZWR1Y2VyIChzdGF0ZSwge3BheWxvYWQ6IHtzY3JvbGxUb3B9fSkge1xuICBsZXQge2RlY2lwaGVyZWRUZXh0fSA9IHN0YXRlO1xuICBkZWNpcGhlcmVkVGV4dCA9IHsuLi5kZWNpcGhlcmVkVGV4dCwgc2Nyb2xsVG9wfTtcbiAgcmV0dXJuIHsuLi5zdGF0ZSwgZGVjaXBoZXJlZFRleHR9O1xufVxuXG5mdW5jdGlvbiBkZWNpcGhlcmVkVGV4dExhdGVSZWR1Y2VyIChzdGF0ZSwgX2FjdGlvbikge1xuICBpZiAoIXN0YXRlLnRhc2tEYXRhKSByZXR1cm4gc3RhdGU7XG4gIGxldCB7dGFza0RhdGE6IHthbHBoYWJldCwgY2lwaGVyVGV4dH0sIHNjaGVkdWxpbmc6IHtwb3NpdGlvbn0sIHJvdG9ycywgZGVjaXBoZXJlZFRleHR9ID0gc3RhdGU7XG4gIGZ1bmN0aW9uIGdldENlbGwgKGluZGV4KSB7XG4gICAgY29uc3QgY2lwaGVyZWQgPSBjaXBoZXJUZXh0W2luZGV4XTtcbiAgICBjb25zdCBjZWxsID0ge3Bvc2l0aW9uOiBpbmRleCwgY3VycmVudDogaW5kZXggPT09IHBvc2l0aW9uLCBjaXBoZXJlZH07XG4gICAgbGV0IHJhbmsgPSBhbHBoYWJldC5pbmRleE9mKGNpcGhlcmVkKTtcbiAgICBpZiAocmFuayA9PT0gLTEpIHtcbiAgICAgIGNlbGwuY2xlYXIgPSBjaXBoZXJlZDtcbiAgICB9IGVsc2UgaWYgKGluZGV4IDw9IHBvc2l0aW9uKSB7XG4gICAgICBPYmplY3QuYXNzaWduKGNlbGwsIGFwcGx5Um90b3JzKHJvdG9ycywgaW5kZXgsIHJhbmspKTtcbiAgICAgIGlmIChjZWxsLnJhbmsgIT09IC0xKSB7XG4gICAgICAgIGNlbGwuY2xlYXIgPSBhbHBoYWJldFtjZWxsLnJhbmtdO1xuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gY2VsbDtcbiAgfVxuICBkZWNpcGhlcmVkVGV4dCA9IHVwZGF0ZUdyaWRWaXNpYmxlUm93cyhkZWNpcGhlcmVkVGV4dCwge2dldENlbGx9KTtcbiAgcmV0dXJuIHsuLi5zdGF0ZSwgZGVjaXBoZXJlZFRleHR9O1xufVxuXG5mdW5jdGlvbiBEZWNpcGhlcmVkVGV4dFZpZXdTZWxlY3RvciAoc3RhdGUpIHtcbiAgY29uc3Qge2FjdGlvbnMsIGRlY2lwaGVyZWRUZXh0fSA9IHN0YXRlO1xuICBjb25zdCB7ZGVjaXBoZXJlZFRleHRSZXNpemVkLCBkZWNpcGhlcmVkVGV4dFNjcm9sbGVkLCBzY2hlZHVsaW5nSnVtcH0gPSBhY3Rpb25zO1xuICBjb25zdCB7d2lkdGgsIGhlaWdodCwgY2VsbFdpZHRoLCBjZWxsSGVpZ2h0LCBib3R0b20sIHBhZ2VSb3dzLCBwYWdlQ29sdW1ucywgdmlzaWJsZX0gPSBkZWNpcGhlcmVkVGV4dDtcbiAgcmV0dXJuIHtcbiAgICBkZWNpcGhlcmVkVGV4dFJlc2l6ZWQsIGRlY2lwaGVyZWRUZXh0U2Nyb2xsZWQsIHNjaGVkdWxpbmdKdW1wLFxuICAgIHdpZHRoLCBoZWlnaHQsIHZpc2libGVSb3dzOiB2aXNpYmxlLnJvd3MsIGNlbGxXaWR0aCwgY2VsbEhlaWdodCwgYm90dG9tLCBwYWdlUm93cywgcGFnZUNvbHVtbnNcbiAgfTtcbn1cblxuY2xhc3MgRGVjaXBoZXJlZFRleHRWaWV3IGV4dGVuZHMgUmVhY3QuUHVyZUNvbXBvbmVudCB7XG5cbiAgcmVuZGVyICgpIHtcbiAgICBjb25zdCB7d2lkdGgsIGhlaWdodCwgdmlzaWJsZVJvd3MsIGNlbGxXaWR0aCwgY2VsbEhlaWdodCwgYm90dG9tfSA9IHRoaXMucHJvcHM7XG4gICAgcmV0dXJuIChcbiAgICAgIDxkaXYgcmVmPXt0aGlzLnJlZlRleHRCb3h9IG9uU2Nyb2xsPXt0aGlzLm9uU2Nyb2xsfSBzdHlsZT17e3Bvc2l0aW9uOiAncmVsYXRpdmUnLCB3aWR0aDogd2lkdGggJiYgYCR7d2lkdGh9cHhgLCBoZWlnaHQ6IGhlaWdodCAmJiBgJHtoZWlnaHR9cHhgLCBvdmVyZmxvd1k6ICdzY3JvbGwnfX0+XG4gICAgICAgIHsodmlzaWJsZVJvd3N8fFtdKS5tYXAoKHtpbmRleCwgY29sdW1uc30pID0+XG4gICAgICAgICAgPGRpdiBrZXk9e2luZGV4fSBzdHlsZT17e3Bvc2l0aW9uOiAnYWJzb2x1dGUnLCB0b3A6IGAke2luZGV4ICogY2VsbEhlaWdodH1weGB9fT5cbiAgICAgICAgICAgIHtjb2x1bW5zLm1hcCgoe2luZGV4LCBwb3NpdGlvbiwgY2lwaGVyZWQsIGNsZWFyLCBsb2NrZWQsIGN1cnJlbnR9KSA9PlxuICAgICAgICAgICAgICA8VGV4dENlbGwga2V5PXtpbmRleH0gY29sdW1uPXtpbmRleH0gcG9zaXRpb249e3Bvc2l0aW9ufSBjaXBoZXJlZD17Y2lwaGVyZWR9IGNsZWFyPXtjbGVhcn0gbG9ja2VkPXtsb2NrZWR9IGN1cnJlbnQ9e2N1cnJlbnR9IGNlbGxXaWR0aD17Y2VsbFdpZHRofSBvbkp1bXA9e3RoaXMub25KdW1wfSAvPil9XG4gICAgICAgICAgPC9kaXY+KX1cbiAgICAgICAgPGRpdiBzdHlsZT17e3Bvc2l0aW9uOiAnYWJzb2x1dGUnLCB0b3A6IGAke2JvdHRvbX1weGAsIHdpZHRoOiAnMXB4JywgaGVpZ2h0OiAnMXB4J319Lz5cbiAgICAgIDwvZGl2PlxuICAgICk7XG4gIH1cblxuICByZWZUZXh0Qm94ID0gKGVsZW1lbnQpID0+IHtcbiAgICB0aGlzLl90ZXh0Qm94ID0gZWxlbWVudDtcbiAgICBjb25zdCB3aWR0aCA9IGVsZW1lbnQuY2xpZW50V2lkdGg7XG4gICAgY29uc3QgaGVpZ2h0ID0gZWxlbWVudC5jbGllbnRIZWlnaHQ7XG4gICAgdGhpcy5wcm9wcy5kaXNwYXRjaCh7dHlwZTogdGhpcy5wcm9wcy5kZWNpcGhlcmVkVGV4dFJlc2l6ZWQsIHBheWxvYWQ6IHt3aWR0aCwgaGVpZ2h0fX0pO1xuICB9O1xuXG4gIG9uU2Nyb2xsID0gKCkgPT4ge1xuICAgIGNvbnN0IHNjcm9sbFRvcCA9IHRoaXMuX3RleHRCb3guc2Nyb2xsVG9wO1xuICAgIHRoaXMucHJvcHMuZGlzcGF0Y2goe3R5cGU6IHRoaXMucHJvcHMuZGVjaXBoZXJlZFRleHRTY3JvbGxlZCwgcGF5bG9hZDoge3Njcm9sbFRvcH19KTtcbiAgfTtcblxuICBvbkp1bXAgPSAocG9zaXRpb24pID0+IHtcbiAgICB0aGlzLnByb3BzLmRpc3BhdGNoKHt0eXBlOiB0aGlzLnByb3BzLnNjaGVkdWxpbmdKdW1wLCBwYXlsb2FkOiB7cG9zaXRpb259fSk7XG4gIH07XG5cbn1cblxuY2xhc3MgVGV4dENlbGwgZXh0ZW5kcyBSZWFjdC5QdXJlQ29tcG9uZW50IHtcbiAgcmVuZGVyICgpIHtcbiAgICBjb25zdCB7Y29sdW1uLCBjaXBoZXJlZCwgY2xlYXIsIGxvY2tlZCwgY3VycmVudCwgY2VsbFdpZHRofSA9IHRoaXMucHJvcHM7XG4gICAgY29uc3QgY2VsbFN0eWxlID0ge1xuICAgICAgcG9zaXRpb246ICdhYnNvbHV0ZScsXG4gICAgICBsZWZ0OiBgJHtjb2x1bW4gKiBjZWxsV2lkdGh9cHhgLFxuICAgICAgd2lkdGg6IGAke2NlbGxXaWR0aH1weGAsXG4gICAgICBoZWlnaHQ6IGA0MnB4YCxcbiAgICAgIGJvcmRlcjogJ3NvbGlkICM3NzcnLFxuICAgICAgYm9yZGVyV2lkdGg6ICcxcHggMCcsXG4gICAgICBiYWNrZ3JvdW5kQ29sb3I6IGN1cnJlbnQgPyAnI2FhYScgOiAobG9ja2VkID8gJyNjY2MnIDogJyNmZmYnKSxcbiAgICAgIGN1cnNvcjogJ3BvaW50ZXInXG4gICAgfTtcbiAgICByZXR1cm4gKFxuICAgICAgPGRpdiBzdHlsZT17Y2VsbFN0eWxlfSBvbkNsaWNrPXt0aGlzLl9qdW1wfT5cbiAgICAgICAgPGRpdiBzdHlsZT17e3dpZHRoOiAnMTAwJScsIGhlaWdodDogJzIwcHgnLCBib3JkZXJCb3R0b206ICcxcHggc29saWQgI2NjYycsIHRleHRBbGlnbjogJ2NlbnRlcid9fT57Y2lwaGVyZWQgfHwgJyAnfTwvZGl2PlxuICAgICAgICA8ZGl2IHN0eWxlPXt7d2lkdGg6ICcxMDAlJywgaGVpZ2h0OiAnMjBweCcsIHRleHRBbGlnbjogJ2NlbnRlcid9fT57Y2xlYXIgfHwgJyAnfTwvZGl2PlxuICAgICAgPC9kaXY+XG4gICAgKTtcbiAgfVxuICBfanVtcCA9IChfZXZlbnQpID0+IHtcbiAgICB0aGlzLnByb3BzLm9uSnVtcCh0aGlzLnByb3BzLnBvc2l0aW9uKTtcbiAgfTtcbn1cblxuZXhwb3J0IGRlZmF1bHQge1xuICBhY3Rpb25zOiB7XG4gICAgZGVjaXBoZXJlZFRleHRSZXNpemVkOiAnRGVjaXBoZXJlZFRleHQuUmVzaXplZCcgLyoge3dpZHRoOiBudW1iZXIsIGhlaWdodDogbnVtYmVyfSAqLyxcbiAgICBkZWNpcGhlcmVkVGV4dFNjcm9sbGVkOiAnRGVjaXBoZXJlZFRleHQuU2Nyb2xsZWQnIC8qIHtzY3JvbGxUb3A6IG51bWJlcn0gKi8sXG4gIH0sXG4gIGFjdGlvblJlZHVjZXJzOiB7XG4gICAgYXBwSW5pdDogYXBwSW5pdFJlZHVjZXIsXG4gICAgdGFza0luaXQ6IHRhc2tJbml0UmVkdWNlcixcbiAgICBkZWNpcGhlcmVkVGV4dFJlc2l6ZWQ6IGRlY2lwaGVyZWRUZXh0UmVzaXplZFJlZHVjZXIsXG4gICAgZGVjaXBoZXJlZFRleHRTY3JvbGxlZDogZGVjaXBoZXJlZFRleHRTY3JvbGxlZFJlZHVjZXIsXG4gIH0sXG4gIGxhdGVSZWR1Y2VyOiBkZWNpcGhlcmVkVGV4dExhdGVSZWR1Y2VyLFxuICB2aWV3czoge1xuICAgIERlY2lwaGVyZWRUZXh0OiBjb25uZWN0KERlY2lwaGVyZWRUZXh0Vmlld1NlbGVjdG9yKShEZWNpcGhlcmVkVGV4dFZpZXcpLFxuICB9XG59O1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL2RlY2lwaGVyZWRfdGV4dF9idW5kbGUuanMiLCJcbmltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQge0J1dHRvbn0gZnJvbSAncmVhY3QtYm9vdHN0cmFwJztcbmltcG9ydCB7Y29ubmVjdH0gZnJvbSAncmVhY3QtcmVkdXgnO1xuaW1wb3J0IHtyYW5nZX0gZnJvbSAncmFuZ2UnO1xuaW1wb3J0IGNsYXNzbmFtZXMgZnJvbSAnY2xhc3NuYW1lcyc7XG5cbmZ1bmN0aW9uIFdvcmtzcGFjZVNlbGVjdG9yIChzdGF0ZSkge1xuICBjb25zdCB7XG4gICAgdmlld3M6IHtDaXBoZXJlZFRleHQsIFNlbGVjdGVkVGV4dCwgRnJlcXVlbmN5QW5hbHlzaXMsIFJvdG9yLCBTY2hlZHVsaW5nQ29udHJvbHMsIERlY2lwaGVyZWRUZXh0LCBIaW50UmVxdWVzdEZlZWRiYWNrfSxcbiAgICBhY3Rpb25zOiB7cmVxdWVzdEhpbnR9LFxuICAgIHJvdG9ycywgZWRpdGluZ1xuICB9ID0gc3RhdGU7XG4gIGxldCBoaW50UmVxdWVzdCA9IG51bGw7XG4gIGlmICh0eXBlb2YgZWRpdGluZy5yb3RvckluZGV4ID09PSAnbnVtYmVyJykge1xuICAgIGNvbnN0IGVkaXRpbmdDZWxsID0gcm90b3JzW2VkaXRpbmcucm90b3JJbmRleF0uY2VsbHNbZWRpdGluZy5jZWxsUmFua107XG4gICAgaWYgKCFlZGl0aW5nQ2VsbC5oaW50ICYmICFlZGl0aW5nQ2VsbC5sb2NrZWQpIHtcbiAgICAgIGhpbnRSZXF1ZXN0ID0gZWRpdGluZztcbiAgICB9XG4gIH1cbiAgcmV0dXJuIHtcbiAgICBDaXBoZXJlZFRleHQsIFNlbGVjdGVkVGV4dCwgRnJlcXVlbmN5QW5hbHlzaXMsIFJvdG9yLCBTY2hlZHVsaW5nQ29udHJvbHMsIERlY2lwaGVyZWRUZXh0LFxuICAgIEhpbnRSZXF1ZXN0RmVlZGJhY2ssIHJlcXVlc3RIaW50LCBoaW50UmVxdWVzdCwgbmJSb3RvcnM6IHJvdG9ycy5sZW5ndGhcbiAgfTtcbn1cblxuY2xhc3MgV29ya3NwYWNlIGV4dGVuZHMgUmVhY3QuUHVyZUNvbXBvbmVudCB7XG4gIHJlbmRlciAoKSB7XG4gICAgY29uc3Qge0NpcGhlcmVkVGV4dCwgU2VsZWN0ZWRUZXh0LCBGcmVxdWVuY3lBbmFseXNpcywgUm90b3IsIFNjaGVkdWxpbmdDb250cm9scywgRGVjaXBoZXJlZFRleHQsIG5iUm90b3JzLCBoaW50UmVxdWVzdCwgSGludFJlcXVlc3RGZWVkYmFja30gPSB0aGlzLnByb3BzO1xuICAgIHJldHVybiAoXG4gICAgICA8ZGl2PlxuICAgICAgICA8aDI+e1wiTWVzc2FnZSBjaGlmZnLDqVwifTwvaDI+XG4gICAgICAgIDxDaXBoZXJlZFRleHQvPlxuICAgICAgICA8aDI+e1wiU8OpbGVjdGlvbiBkZSBsaWduZXMgb3UgY29sb25uZXNcIn08L2gyPlxuICAgICAgICA8U2VsZWN0ZWRUZXh0Lz5cbiAgICAgICAgPGgyPntcIkFuYWx5c2UgZGUgZnLDqXF1ZW5jZSBkZSBsYSBzw6lsZWN0aW9uXCJ9PC9oMj5cbiAgICAgICAgPEZyZXF1ZW5jeUFuYWx5c2lzLz5cbiAgICAgICAgPGgyPntgUm90b3Ike25iUm90b3JzID4gMSA/ICdzJyA6ICcnfSBkZSBkw6ljaGlmZnJlbWVudGB9PC9oMj5cbiAgICAgICAgPGRpdiBjbGFzc05hbWU9J2NsZWFyZml4Jz5cbiAgICAgICAgICA8ZGl2IHN0eWxlPXt7Ym9yZGVyOiAnMXB4IHNvbGlkICNjY2MnLCBmbG9hdDogJ3JpZ2h0Jywgd2lkdGg6ICcyMDBweCcsIHBhZGRpbmc6ICcxMHB4JywgYm9yZGVyUmFkaXVzOiAnNXB4JywgYmFja2dyb3VuZENvbG9yOiAnI2Y5ZjlmOScsIGZvbnRTaXplOiAnMTJweCcsIG1hcmdpblJpZ2h0OiAnMTVweCd9fT5cbiAgICAgICAgICAgIDxwIHN0eWxlPXt7Zm9udFdlaWdodDogJ2JvbGQnLCB0ZXh0QWxpZ246ICdjZW50ZXInfX0+e1wiSW5kaWNlc1wifTwvcD5cbiAgICAgICAgICAgIDxwPntcIlBvdXIgdW4gY2/Du3QgZGUgXCJ9PHNwYW4gc3R5bGU9e3tmb250V2VpZ2h0OiAnYm9sZCd9fT57XCI1IHBvaW50c1wifTwvc3Bhbj57XCIsIGNsaXF1ZXogc3VyIHVuZSBjYXNlIGRlIHJvdG9yIGV0IHZhbGlkZXogcG91ciBvYnRlbmlyIHNhIHZhbGV1ci5cIn08L3A+XG4gICAgICAgICAgICA8ZGl2IHN0eWxlPXt7dGV4dEFsaWduOiAnY2VudGVyJywgbWFyZ2luOiAnMTBweCAwJ319PlxuICAgICAgICAgICAgICA8QnV0dG9uIG9uQ2xpY2s9e3RoaXMucmVxdWVzdEhpbnR9IGRpc2FibGVkPXshaGludFJlcXVlc3R9PntgVmFsaWRlcmB9PC9CdXR0b24+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICA8ZGl2IHN0eWxlPXt7ZmxvYXQ6ICdsZWZ0J319PlxuICAgICAgICAgICAge3JhbmdlKDAsIG5iUm90b3JzKS5tYXAoaW5kZXggPT4gPFJvdG9yIGtleT17aW5kZXh9IGluZGV4PXtpbmRleH0vPil9XG4gICAgICAgICAgICA8U2NoZWR1bGluZ0NvbnRyb2xzLz5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgPC9kaXY+XG4gICAgICAgIDxIaW50UmVxdWVzdEZlZWRiYWNrLz5cbiAgICAgICAgPGgyPntcIlRleHRlIGTDqWNoaWZmcsOpXCJ9PC9oMj5cbiAgICAgICAgPERlY2lwaGVyZWRUZXh0Lz5cbiAgICAgIDwvZGl2PlxuICAgICk7XG4gIH1cbiAgcmVxdWVzdEhpbnQgPSAoKSA9PiB7XG4gICAgY29uc3Qge2Rpc3BhdGNoLCByZXF1ZXN0SGludCwgaGludFJlcXVlc3R9ID0gdGhpcy5wcm9wcztcbiAgICBkaXNwYXRjaCh7dHlwZTogcmVxdWVzdEhpbnQsIHBheWxvYWQ6IHtyZXF1ZXN0OiBoaW50UmVxdWVzdH19KTtcbiAgfTtcbn1cblxuZXhwb3J0IGRlZmF1bHQge1xuICB2aWV3czoge1xuICAgIFdvcmtzcGFjZTogY29ubmVjdChXb3Jrc3BhY2VTZWxlY3RvcikoV29ya3NwYWNlKSxcbiAgfVxufTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy93b3Jrc3BhY2VfYnVuZGxlLmpzIiwiXG5pbXBvcnQgdXBkYXRlIGZyb20gJ2ltbXV0YWJpbGl0eS1oZWxwZXInO1xuXG5mdW5jdGlvbiBiaXNlY3QgKGEsIHgpIHtcbiAgICBsZXQgbG8gPSAwLCBoaSA9IGEubGVuZ3RoLCBtaWQ7XG4gICAgd2hpbGUgKGxvIDwgaGkpIHtcbiAgICAgICAgbWlkID0gKGxvICsgaGkpIC8gMiB8IDA7XG4gICAgICAgIGlmICh4IDwgYVttaWRdKSB7XG4gICAgICAgICAgICBoaSA9IG1pZDtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGxvID0gbWlkICsgMTtcbiAgICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gbG87XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBjaGFuZ2VTZWxlY3Rpb24gKHZhbHVlcywgdmFsdWUsIHNlbGVjdGVkKSB7XG4gICAgY29uc3QgaW5kZXggPSBiaXNlY3QodmFsdWVzLCB2YWx1ZSk7XG4gICAgaWYgKHNlbGVjdGVkKSB7XG4gICAgICAgIHJldHVybiB2YWx1ZXNbaW5kZXggLSAxXSA9PT0gdmFsdWUgPyB7fSA6IHskc3BsaWNlOiBbW2luZGV4LCAwLCB2YWx1ZV1dfTtcbiAgICB9IGVsc2Uge1xuICAgICAgICByZXR1cm4gdmFsdWVzW2luZGV4IC0gMV0gIT09IHZhbHVlID8ge30gOiB7JHNwbGljZTogW1tpbmRleCAtIDEsIDFdXX07XG4gICAgfVxufVxuXG5leHBvcnQgZnVuY3Rpb24gc29ydGVkQXJyYXlIYXNFbGVtZW50IChhLCB4KSB7XG4gIGNvbnN0IGkgPSBiaXNlY3QoYSwgeCkgLSAxO1xuICByZXR1cm4gYVtpXSA9PT0geDtcbn1cblxuXG5leHBvcnQgZnVuY3Rpb24gdXBkYXRlR3JpZEdlb21ldHJ5IChncmlkKSB7XG4gIGNvbnN0IHt3aWR0aCwgaGVpZ2h0LCBjZWxsV2lkdGgsIGNlbGxIZWlnaHQsIHNjcm9sbFRvcCwgbmJDZWxsc30gPSBncmlkO1xuICBjb25zdCBzY3JvbGxCYXJXaWR0aCA9IDIwO1xuICBjb25zdCBwYWdlQ29sdW1ucyA9IE1hdGgubWF4KDQwLCBNYXRoLmZsb29yKCh3aWR0aCAtIHNjcm9sbEJhcldpZHRoKSAvIGNlbGxXaWR0aCkpO1xuICBjb25zdCBwYWdlUm93cyA9IE1hdGgubWF4KDgsIE1hdGguY2VpbChoZWlnaHQgLyBjZWxsSGVpZ2h0KSk7XG4gIGNvbnN0IGJvdHRvbSA9IE1hdGguY2VpbChuYkNlbGxzIC8gcGFnZUNvbHVtbnMpICogY2VsbEhlaWdodCAtIDE7XG4gIGNvbnN0IG1heFRvcCA9IE1hdGgubWF4KDAsIGJvdHRvbSArIDEgLSBwYWdlUm93cyAqIGNlbGxIZWlnaHQpO1xuICByZXR1cm4gey4uLmdyaWQsIHBhZ2VDb2x1bW5zLCBwYWdlUm93cywgc2Nyb2xsVG9wOiBNYXRoLm1pbihtYXhUb3AsIHNjcm9sbFRvcCksIGJvdHRvbSwgbWF4VG9wfTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHVwZGF0ZUdyaWRWaXNpYmxlUm93cyAoZ3JpZCwgb3B0aW9ucykge1xuICBvcHRpb25zID0gb3B0aW9ucyB8fCB7fTtcbiAgY29uc3Qge25iQ2VsbHMsIGNlbGxIZWlnaHQsIHBhZ2VDb2x1bW5zLCBwYWdlUm93cywgY2VsbHMsIHNjcm9sbFRvcCwgc2VsZWN0ZWRSb3dzfSA9IGdyaWQ7XG4gIGlmICh0eXBlb2Ygc2Nyb2xsVG9wICE9PSAnbnVtYmVyJykge1xuICAgIHJldHVybiBncmlkO1xuICB9XG4gIGNvbnN0IGZpcnN0Um93ID0gTWF0aC5mbG9vcihzY3JvbGxUb3AgLyBjZWxsSGVpZ2h0KTtcbiAgY29uc3QgbGFzdFJvdyA9IE1hdGgubWluKGZpcnN0Um93ICsgcGFnZVJvd3MgLSAxLCBNYXRoLmNlaWwobmJDZWxscyAvIHBhZ2VDb2x1bW5zKSAtIDEpO1xuICBjb25zdCByb3dzID0gW107XG4gIGNvbnN0IGdldENlbGwgPSBvcHRpb25zLmdldENlbGwgfHwgKGNlbGxzID8gKGluZGV4ID0+ICh7Y2VsbDogY2VsbHNbaW5kZXhdfSkpIDogKF9pbmRleCA9PiBudWxsKSk7XG4gIGZvciAobGV0IHJvd0luZGV4ID0gZmlyc3RSb3c7IHJvd0luZGV4IDw9IGxhc3RSb3c7IHJvd0luZGV4ICs9IDEpIHtcbiAgICBjb25zdCByb3dTdGFydFBvcyA9IHJvd0luZGV4ICogcGFnZUNvbHVtbnM7XG4gICAgY29uc3Qgcm93Q2VsbHMgPSBbXTtcbiAgICBmb3IgKGxldCBjb2xJbmRleCA9IDA7IGNvbEluZGV4IDwgcGFnZUNvbHVtbnM7IGNvbEluZGV4ICs9IDEpIHtcbiAgICAgIHJvd0NlbGxzLnB1c2goe2luZGV4OiBjb2xJbmRleCwgLi4uZ2V0Q2VsbChyb3dTdGFydFBvcyArIGNvbEluZGV4KX0pO1xuICAgIH1cbiAgICBjb25zdCBzZWxlY3RlZCA9IHNlbGVjdGVkUm93cyAmJiBzb3J0ZWRBcnJheUhhc0VsZW1lbnQoc2VsZWN0ZWRSb3dzLCByb3dJbmRleCk7XG4gICAgcm93cy5wdXNoKHtpbmRleDogcm93SW5kZXgsIHNlbGVjdGVkLCBjb2x1bW5zOiByb3dDZWxsc30pO1xuICB9XG4gIHJldHVybiB7Li4uZ3JpZCwgdmlzaWJsZToge3Jvd3N9fTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHVwZGF0ZUdyaWRWaXNpYmxlQ29sdW1ucyAoZ3JpZCwgb3B0aW9ucykge1xuICBvcHRpb25zID0gb3B0aW9ucyB8fCB7fTtcbiAgY29uc3Qge2NlbGxIZWlnaHQsIHBhZ2VDb2x1bW5zLCBwYWdlUm93cywgY2VsbHMsIHNjcm9sbFRvcCwgc2VsZWN0ZWRDb2x1bW5zfSA9IGdyaWQ7XG4gIGlmICh0eXBlb2Ygc2Nyb2xsVG9wICE9PSAnbnVtYmVyJykge1xuICAgIHJldHVybiBncmlkO1xuICB9XG4gIGNvbnN0IGZpcnN0Um93ID0gTWF0aC5mbG9vcihzY3JvbGxUb3AgLyBjZWxsSGVpZ2h0KTtcbiAgY29uc3QgbGFzdFJvdyA9IGZpcnN0Um93ICsgcGFnZVJvd3MgLSAxO1xuICBjb25zdCBjb2x1bW5zID0gW107XG4gIGNvbnN0IGdldENlbGwgPSBvcHRpb25zLmdldENlbGwgfHwgKGNlbGxzID8gKGluZGV4ID0+ICh7Y2VsbDogY2VsbHNbaW5kZXhdfSkpIDogKF9pbmRleCA9PiBudWxsKSk7XG4gIGZvciAobGV0IGNvbEluZGV4ID0gMDsgY29sSW5kZXggPCBwYWdlQ29sdW1uczsgY29sSW5kZXggKz0gMSkge1xuICAgIGNvbnN0IGNvbENlbGxzID0gW107XG4gICAgZm9yIChsZXQgcm93SW5kZXggPSBmaXJzdFJvdzsgcm93SW5kZXggPD0gbGFzdFJvdzsgcm93SW5kZXggKz0gMSkge1xuICAgICAgY29sQ2VsbHMucHVzaCh7aW5kZXg6IHJvd0luZGV4LCAuLi5nZXRDZWxsKHJvd0luZGV4ICogcGFnZUNvbHVtbnMgKyBjb2xJbmRleCl9KTtcbiAgICB9XG4gICAgY29uc3Qgc2VsZWN0ZWQgPSBzZWxlY3RlZENvbHVtbnMgJiYgc29ydGVkQXJyYXlIYXNFbGVtZW50KHNlbGVjdGVkQ29sdW1ucywgY29sSW5kZXgpO1xuICAgIGNvbHVtbnMucHVzaCh7aW5kZXg6IGNvbEluZGV4LCBzZWxlY3RlZCwgcm93czogY29sQ2VsbHN9KTtcbiAgfVxuICByZXR1cm4gey4uLmdyaWQsIHZpc2libGU6IHtjb2x1bW5zfX07XG59XG5cbmV4cG9ydCBmdW5jdGlvbiB1cGRhdGVHcmlkVmlzaWJsZUFyZWEgKGdyaWQsIG9wdGlvbnMpIHtcbiAgLyogVE9ETzogYnVpbGQgYSBjYWNoZSBrZXksIHN0b3JlIGl0IGluIHRoZSBncmlkLCB1c2UgaXQgdG8gc2tpcCBjb21wdXRhdGlvbiB3aGVuIHVuY2hhbmdlZCAqL1xuICBpZiAoZ3JpZC5tb2RlID09PSAncm93cycpIHtcbiAgICByZXR1cm4gdXBkYXRlR3JpZFZpc2libGVSb3dzKGdyaWQsIG9wdGlvbnMpO1xuICB9XG4gIGlmIChncmlkLm1vZGUgPT09ICdjb2x1bW5zJykge1xuICAgIHJldHVybiB1cGRhdGVHcmlkVmlzaWJsZUNvbHVtbnMoZ3JpZCwgb3B0aW9ucyk7XG4gIH1cbiAgcmV0dXJuIGdyaWQ7XG59XG5cbi8qIFJPVE9SIGZ1bmN0aW9ucyAqL1xuXG5cbmV4cG9ydCBmdW5jdGlvbiBtYWtlUm90b3IgKGFscGhhYmV0LCB7c2NoZWR1bGUsIGVkaXRhYmxlUm93fSkge1xuICBjb25zdCBzaXplID0gYWxwaGFiZXQubGVuZ3RoO1xuICBjb25zdCBjZWxscyA9IGFscGhhYmV0LnNwbGl0KCcnKSAubWFwKGZ1bmN0aW9uIChjLCByYW5rKSB7XG4gICAgcmV0dXJuIHtyYW5rLCByb3RhdGluZzogYywgZWRpdGFibGU6IG51bGwsIGxvY2tlZDogZmFsc2UsIGNvbmZsaWN0OiBmYWxzZX07XG4gIH0pO1xuICBjb25zdCBudWxsUGVybSA9IG5ldyBBcnJheShzaXplKS5maWxsKC0xKTtcbiAgcmV0dXJuIHthbHBoYWJldCwgc2l6ZSwgc2NoZWR1bGUsIGVkaXRhYmxlUm93LCBjZWxscywgZm9yd2FyZDogbnVsbFBlcm0sIGJhY2t3YXJkOiBudWxsUGVybX07XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBkdW1wUm90b3JzIChhbHBoYWJldCwgcm90b3JzKSB7XG4gIHJldHVybiByb3RvcnMubWFwKHJvdG9yID0+XG4gICAgcm90b3IuY2VsbHMubWFwKCh7ZWRpdGFibGUsIGxvY2tlZH0pID0+XG4gICAgICBbYWxwaGFiZXQuaW5kZXhPZihlZGl0YWJsZSksIGxvY2tlZCA/IDEgOiAwXSkpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gbG9hZFJvdG9ycyAoYWxwaGFiZXQsIHJvdG9yU3BlY3MsIGhpbnRzLCByb3RvckR1bXBzKSB7XG4gIHJldHVybiByb3RvckR1bXBzLm1hcCgoY2VsbHMsIHJvdG9ySW5kZXgpID0+IHtcbiAgICBjb25zdCAkY2VsbHMgPSBbXTtcbiAgICBjZWxscy5mb3JFYWNoKChjZWxsLCBjZWxsSW5kZXgpID0+IHtcbiAgICAgIC8qIExvY2tpbmcgaW5mb3JtYXRpb24gaXMgbm90IGluY2x1ZGVkIGluIHRoZSBhbnN3ZXIuICovXG4gICAgICBpZiAodHlwZW9mIGNlbGwgPT09ICdudW1iZXInKSBjZWxsID0gW2NlbGwsIDBdO1xuICAgICAgY29uc3QgW3JhbmssIGxvY2tlZF0gPSBjZWxsO1xuICAgICAgJGNlbGxzW2NlbGxJbmRleF0gPSB7XG4gICAgICAgIGVkaXRhYmxlOiB7JHNldDogcmFuayA9PT0gLTEgPyBudWxsIDogYWxwaGFiZXRbcmFua119LFxuICAgICAgICBsb2NrZWQ6IHskc2V0OiBsb2NrZWQgIT09IDB9LFxuICAgICAgfTtcbiAgICB9KTtcbiAgICBoaW50cy5mb3JFYWNoKCh7cm90b3JJbmRleDogaSwgY2VsbFJhbms6IGosIHN5bWJvbH0pID0+IHtcbiAgICAgIGlmIChyb3RvckluZGV4ID09PSBpKSB7XG4gICAgICAgICRjZWxsc1tqXSA9IHtcbiAgICAgICAgICBlZGl0YWJsZTogeyRzZXQ6IHN5bWJvbH0sXG4gICAgICAgICAgaGludDogeyRzZXQ6IHRydWV9LFxuICAgICAgICB9O1xuICAgICAgfVxuICAgIH0pO1xuICAgIGxldCByb3RvciA9IG1ha2VSb3RvcihhbHBoYWJldCwgcm90b3JTcGVjc1tyb3RvckluZGV4XSk7XG4gICAgcm90b3IgPSB1cGRhdGUocm90b3IsIHtjZWxsczogJGNlbGxzfSk7XG4gICAgcm90b3IgPSBtYXJrUm90b3JDb25mbGljdHModXBkYXRlUGVybXMocm90b3IpKTtcbiAgICByZXR1cm4gcm90b3I7XG4gIH0pO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gZWRpdFJvdG9yQ2VsbCAocm90b3IsIHJhbmssIHN5bWJvbCkge1xuICByb3RvciA9IHVwZGF0ZShyb3Rvciwge2NlbGxzOiB7W3JhbmtdOiB7ZWRpdGFibGU6IHskc2V0OiBzeW1ib2x9fX19KTtcbiAgcmV0dXJuIHVwZGF0ZVBlcm1zKG1hcmtSb3RvckNvbmZsaWN0cyhyb3RvcikpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gbG9ja1JvdG9yQ2VsbCAocm90b3IsIHJhbmssIGxvY2tlZCkge1xuICByZXR1cm4gdXBkYXRlKHJvdG9yLCB7Y2VsbHM6IHtbcmFua106IHtsb2NrZWQ6IHskc2V0OiBsb2NrZWR9fX19KTtcbn1cblxuZnVuY3Rpb24gbWFya1JvdG9yQ29uZmxpY3RzIChyb3Rvcikge1xuICBjb25zdCBjb3VudHMgPSBuZXcgTWFwKCk7XG4gIGNvbnN0IGNoYW5nZXMgPSB7fTtcbiAgZm9yIChsZXQge3JhbmssIGVkaXRhYmxlLCBjb25mbGljdH0gb2Ygcm90b3IuY2VsbHMpIHtcbiAgICBpZiAoY29uZmxpY3QpIHtcbiAgICAgIGNoYW5nZXNbcmFua10gPSB7Y29uZmxpY3Q6IHskc2V0OiBmYWxzZX19O1xuICAgIH1cbiAgICBpZiAoZWRpdGFibGUgIT09IG51bGwpIHtcbiAgICAgIGlmICghY291bnRzLmhhcyhlZGl0YWJsZSkpIHtcbiAgICAgICAgY291bnRzLnNldChlZGl0YWJsZSwgW3JhbmtdKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGNvdW50cy5nZXQoZWRpdGFibGUpLnB1c2gocmFuayk7XG4gICAgICB9XG4gICAgfVxuICB9XG4gIGZvciAobGV0IHJhbmtzIG9mIGNvdW50cy52YWx1ZXMoKSkge1xuICAgIGlmIChyYW5rcy5sZW5ndGggPiAxKSB7XG4gICAgICBmb3IgKGxldCByYW5rIG9mIHJhbmtzKSB7XG4gICAgICAgIGNoYW5nZXNbcmFua10gPSB7Y29uZmxpY3Q6IHskc2V0OiB0cnVlfX07XG4gICAgICB9XG4gICAgfVxuICB9XG4gIHJldHVybiB1cGRhdGUocm90b3IsIHtjZWxsczogY2hhbmdlc30pO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gdXBkYXRlUm90b3JXaXRoS2V5IChhbHBoYWJldCwgcm90b3IsIGtleSkge1xuICBjb25zdCAkY2VsbHMgPSB7fTtcbiAga2V5LnNwbGl0KCcnKS5mb3JFYWNoKChzeW1ib2wsIGNlbGxJbmRleCkgPT4ge1xuICAgICRjZWxsc1tjZWxsSW5kZXhdID0ge1xuICAgICAgZWRpdGFibGU6IHskc2V0OiBhbHBoYWJldC5pbmRleE9mKHN5bWJvbCkgPT09IC0xID8gbnVsbCA6IHN5bWJvbH1cbiAgICB9O1xuICB9KTtcbiAgcmV0dXJuIHVwZGF0ZVBlcm1zKHVwZGF0ZShyb3Rvciwge2NlbGxzOiAkY2VsbHN9KSk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiB1cGRhdGVQZXJtcyAocm90b3IpIHtcbiAgY29uc3Qge3NpemUsIGFscGhhYmV0LCBjZWxsc30gPSByb3RvcjtcbiAgY29uc3QgZm9yd2FyZCA9IG5ldyBBcnJheShzaXplKS5maWxsKC0xKTtcbiAgY29uc3QgYmFja3dhcmQgPSBuZXcgQXJyYXkoc2l6ZSkuZmlsbCgtMSk7XG4gIGZvciAobGV0IGNlbGwgb2YgY2VsbHMpIHtcbiAgICBpZiAoY2VsbC5lZGl0YWJsZSAhPT0gbnVsbCAmJiAhY2VsbC5jb25mbGljdCkge1xuICAgICAgY29uc3Qgc291cmNlID0gYWxwaGFiZXQuaW5kZXhPZihjZWxsLmVkaXRhYmxlKTtcbiAgICAgIGZvcndhcmRbc291cmNlXSA9IGNlbGwucmFuaztcbiAgICAgIGJhY2t3YXJkW2NlbGwucmFua10gPSBzb3VyY2U7XG4gICAgfVxuICB9XG4gIHJldHVybiB7Li4ucm90b3IsIGZvcndhcmQsIGJhY2t3YXJkfTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGdldFJvdG9yU2hpZnQgKHJvdG9yLCBwb3NpdGlvbikge1xuICBjb25zdCB7c2l6ZSwgc2NoZWR1bGV9ID0gcm90b3I7XG4gIHJldHVybiBzY2hlZHVsZSA9PT0gMCA/IDAgOiBNYXRoLmZsb29yKHBvc2l0aW9uIC8gc2NoZWR1bGUpICUgc2l6ZTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGFwcGx5Um90b3JzIChyb3RvcnMsIHBvc2l0aW9uLCByYW5rKSB7XG4gIGNvbnN0IHJlc3VsdCA9IHtyYW5rLCBsb2NrczogMCwgdHJhY2U6IFtdfTtcbiAgZm9yIChsZXQgcm90b3JJbmRleCA9IDA7IHJvdG9ySW5kZXggPCByb3RvcnMubGVuZ3RoOyByb3RvckluZGV4ICs9IDEpIHtcbiAgICBjb25zdCByb3RvciA9IHJvdG9yc1tyb3RvckluZGV4XTtcbiAgICBjb25zdCBzaGlmdCA9IGdldFJvdG9yU2hpZnQocm90b3IsIHBvc2l0aW9uKTtcbiAgICBhcHBseVJvdG9yKHJvdG9yLCBzaGlmdCwgcmVzdWx0KTtcbiAgICBpZiAocmVzdWx0LnJhbmsgPT09IC0xKSB7XG4gICAgICBicmVhaztcbiAgICB9XG4gIH1cbiAgaWYgKHJlc3VsdC5sb2NrcyA9PT0gcm90b3JzLmxlbmd0aCkge1xuICAgIHJlc3VsdC5sb2NrZWQgPSB0cnVlO1xuICB9XG4gIHJldHVybiByZXN1bHQ7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBhcHBseVJvdG9yIChyb3Rvciwgc2hpZnQsIHJlc3VsdCkge1xuICBsZXQgcmFuayA9IHJlc3VsdC5yYW5rLCBjZWxsO1xuICAvKiBOZWdhdGl2ZSBzaGlmdCB0byB0aGUgc3RhdGljIHRvcCByb3cgYmVmb3JlIHBlcm11dGF0aW9uLiAqL1xuICBpZiAocm90b3IuZWRpdGFibGVSb3cgPT09ICdib3R0b20nKSB7XG4gICAgcmFuayA9IGFwcGx5U2hpZnQocm90b3Iuc2l6ZSwgLXNoaWZ0LCByYW5rKTtcbiAgICBjZWxsID0gcm90b3IuY2VsbHNbcmFua107XG4gIH1cbiAgLyogQXBwbHkgdGhlIHBlcm11dGF0aW9uLiAqL1xuICByYW5rID0gcm90b3IuZm9yd2FyZFtyYW5rXTtcbiAgLyogUG9zaXRpdmUgc2hpZnQgdG8gdGhlIHN0YXRpYyBib3R0b20gcm93IGFmdGVyIHBlcm11dGF0aW9uLiAqL1xuICBpZiAocm90b3IuZWRpdGFibGVSb3cgPT09ICd0b3AnKSB7XG4gICAgY2VsbCA9IHJvdG9yLmNlbGxzW3JhbmtdO1xuICAgIHJhbmsgPSBhcHBseVNoaWZ0KHJvdG9yLnNpemUsIHNoaWZ0LCByYW5rKTtcbiAgfVxuICAvKiBTYXZlIG5ldyByYW5rIChjYW4gYmUgLTEpIGFuZCBhdHRyaWJ1dGVzLiAqL1xuICByZXN1bHQucmFuayA9IHJhbms7XG4gIGlmIChjZWxsKSB7XG4gICAgLyogU2F2ZSB0aGUgcm90b3IgY2VsbCB1c2VkIGluIHRoZSB0cmFjZS4gKi9cbiAgICByZXN1bHQudHJhY2UucHVzaChjZWxsKTtcbiAgICBpZiAoY2VsbC5sb2NrZWQgfHwgY2VsbC5oaW50KSB7XG4gICAgICByZXN1bHQubG9ja3MgKz0gMTtcbiAgICB9XG4gICAgaWYgKGNlbGwuY29sbGlzaW9uKSB7XG4gICAgICByZXN1bHQuY29sbGlzaW9uID0gdHJ1ZTtcbiAgICB9XG4gIH1cbn1cblxuZnVuY3Rpb24gYXBwbHlTaGlmdCAobW9kLCBhbW91bnQsIHJhbmspIHtcbiAgaWYgKHJhbmsgIT09IC0xKSB7XG4gICAgaWYgKGFtb3VudCA8IDApIHtcbiAgICAgIGFtb3VudCArPSBtb2Q7XG4gICAgfVxuICAgIHJhbmsgPSAocmFuayArIGFtb3VudCkgJSBtb2Q7XG4gIH1cbiAgcmV0dXJuIHJhbms7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiB3cmFwQXJvdW5kICh2YWx1ZSwgbW9kKSB7XG4gIHJldHVybiAoKHZhbHVlICUgbW9kKSArIG1vZCkgJSBtb2Q7XG59XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvdXRpbHMuanMiXSwic291cmNlUm9vdCI6IiJ9