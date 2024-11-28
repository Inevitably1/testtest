"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return e; }; var t, e = {}, r = Object.prototype, n = r.hasOwnProperty, o = Object.defineProperty || function (t, e, r) { t[e] = r.value; }, i = "function" == typeof Symbol ? Symbol : {}, a = i.iterator || "@@iterator", c = i.asyncIterator || "@@asyncIterator", u = i.toStringTag || "@@toStringTag"; function define(t, e, r) { return Object.defineProperty(t, e, { value: r, enumerable: !0, configurable: !0, writable: !0 }), t[e]; } try { define({}, ""); } catch (t) { define = function define(t, e, r) { return t[e] = r; }; } function wrap(t, e, r, n) { var i = e && e.prototype instanceof Generator ? e : Generator, a = Object.create(i.prototype), c = new Context(n || []); return o(a, "_invoke", { value: makeInvokeMethod(t, r, c) }), a; } function tryCatch(t, e, r) { try { return { type: "normal", arg: t.call(e, r) }; } catch (t) { return { type: "throw", arg: t }; } } e.wrap = wrap; var h = "suspendedStart", l = "suspendedYield", f = "executing", s = "completed", y = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var p = {}; define(p, a, function () { return this; }); var d = Object.getPrototypeOf, v = d && d(d(values([]))); v && v !== r && n.call(v, a) && (p = v); var g = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(p); function defineIteratorMethods(t) { ["next", "throw", "return"].forEach(function (e) { define(t, e, function (t) { return this._invoke(e, t); }); }); } function AsyncIterator(t, e) { function invoke(r, o, i, a) { var c = tryCatch(t[r], t, o); if ("throw" !== c.type) { var u = c.arg, h = u.value; return h && "object" == _typeof(h) && n.call(h, "__await") ? e.resolve(h.__await).then(function (t) { invoke("next", t, i, a); }, function (t) { invoke("throw", t, i, a); }) : e.resolve(h).then(function (t) { u.value = t, i(u); }, function (t) { return invoke("throw", t, i, a); }); } a(c.arg); } var r; o(this, "_invoke", { value: function value(t, n) { function callInvokeWithMethodAndArg() { return new e(function (e, r) { invoke(t, n, e, r); }); } return r = r ? r.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); } }); } function makeInvokeMethod(e, r, n) { var o = h; return function (i, a) { if (o === f) throw Error("Generator is already running"); if (o === s) { if ("throw" === i) throw a; return { value: t, done: !0 }; } for (n.method = i, n.arg = a;;) { var c = n.delegate; if (c) { var u = maybeInvokeDelegate(c, n); if (u) { if (u === y) continue; return u; } } if ("next" === n.method) n.sent = n._sent = n.arg;else if ("throw" === n.method) { if (o === h) throw o = s, n.arg; n.dispatchException(n.arg); } else "return" === n.method && n.abrupt("return", n.arg); o = f; var p = tryCatch(e, r, n); if ("normal" === p.type) { if (o = n.done ? s : l, p.arg === y) continue; return { value: p.arg, done: n.done }; } "throw" === p.type && (o = s, n.method = "throw", n.arg = p.arg); } }; } function maybeInvokeDelegate(e, r) { var n = r.method, o = e.iterator[n]; if (o === t) return r.delegate = null, "throw" === n && e.iterator["return"] && (r.method = "return", r.arg = t, maybeInvokeDelegate(e, r), "throw" === r.method) || "return" !== n && (r.method = "throw", r.arg = new TypeError("The iterator does not provide a '" + n + "' method")), y; var i = tryCatch(o, e.iterator, r.arg); if ("throw" === i.type) return r.method = "throw", r.arg = i.arg, r.delegate = null, y; var a = i.arg; return a ? a.done ? (r[e.resultName] = a.value, r.next = e.nextLoc, "return" !== r.method && (r.method = "next", r.arg = t), r.delegate = null, y) : a : (r.method = "throw", r.arg = new TypeError("iterator result is not an object"), r.delegate = null, y); } function pushTryEntry(t) { var e = { tryLoc: t[0] }; 1 in t && (e.catchLoc = t[1]), 2 in t && (e.finallyLoc = t[2], e.afterLoc = t[3]), this.tryEntries.push(e); } function resetTryEntry(t) { var e = t.completion || {}; e.type = "normal", delete e.arg, t.completion = e; } function Context(t) { this.tryEntries = [{ tryLoc: "root" }], t.forEach(pushTryEntry, this), this.reset(!0); } function values(e) { if (e || "" === e) { var r = e[a]; if (r) return r.call(e); if ("function" == typeof e.next) return e; if (!isNaN(e.length)) { var o = -1, i = function next() { for (; ++o < e.length;) if (n.call(e, o)) return next.value = e[o], next.done = !1, next; return next.value = t, next.done = !0, next; }; return i.next = i; } } throw new TypeError(_typeof(e) + " is not iterable"); } return GeneratorFunction.prototype = GeneratorFunctionPrototype, o(g, "constructor", { value: GeneratorFunctionPrototype, configurable: !0 }), o(GeneratorFunctionPrototype, "constructor", { value: GeneratorFunction, configurable: !0 }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, u, "GeneratorFunction"), e.isGeneratorFunction = function (t) { var e = "function" == typeof t && t.constructor; return !!e && (e === GeneratorFunction || "GeneratorFunction" === (e.displayName || e.name)); }, e.mark = function (t) { return Object.setPrototypeOf ? Object.setPrototypeOf(t, GeneratorFunctionPrototype) : (t.__proto__ = GeneratorFunctionPrototype, define(t, u, "GeneratorFunction")), t.prototype = Object.create(g), t; }, e.awrap = function (t) { return { __await: t }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, c, function () { return this; }), e.AsyncIterator = AsyncIterator, e.async = function (t, r, n, o, i) { void 0 === i && (i = Promise); var a = new AsyncIterator(wrap(t, r, n, o), i); return e.isGeneratorFunction(r) ? a : a.next().then(function (t) { return t.done ? t.value : a.next(); }); }, defineIteratorMethods(g), define(g, u, "Generator"), define(g, a, function () { return this; }), define(g, "toString", function () { return "[object Generator]"; }), e.keys = function (t) { var e = Object(t), r = []; for (var n in e) r.push(n); return r.reverse(), function next() { for (; r.length;) { var t = r.pop(); if (t in e) return next.value = t, next.done = !1, next; } return next.done = !0, next; }; }, e.values = values, Context.prototype = { constructor: Context, reset: function reset(e) { if (this.prev = 0, this.next = 0, this.sent = this._sent = t, this.done = !1, this.delegate = null, this.method = "next", this.arg = t, this.tryEntries.forEach(resetTryEntry), !e) for (var r in this) "t" === r.charAt(0) && n.call(this, r) && !isNaN(+r.slice(1)) && (this[r] = t); }, stop: function stop() { this.done = !0; var t = this.tryEntries[0].completion; if ("throw" === t.type) throw t.arg; return this.rval; }, dispatchException: function dispatchException(e) { if (this.done) throw e; var r = this; function handle(n, o) { return a.type = "throw", a.arg = e, r.next = n, o && (r.method = "next", r.arg = t), !!o; } for (var o = this.tryEntries.length - 1; o >= 0; --o) { var i = this.tryEntries[o], a = i.completion; if ("root" === i.tryLoc) return handle("end"); if (i.tryLoc <= this.prev) { var c = n.call(i, "catchLoc"), u = n.call(i, "finallyLoc"); if (c && u) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } else if (c) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); } else { if (!u) throw Error("try statement without catch or finally"); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } } } }, abrupt: function abrupt(t, e) { for (var r = this.tryEntries.length - 1; r >= 0; --r) { var o = this.tryEntries[r]; if (o.tryLoc <= this.prev && n.call(o, "finallyLoc") && this.prev < o.finallyLoc) { var i = o; break; } } i && ("break" === t || "continue" === t) && i.tryLoc <= e && e <= i.finallyLoc && (i = null); var a = i ? i.completion : {}; return a.type = t, a.arg = e, i ? (this.method = "next", this.next = i.finallyLoc, y) : this.complete(a); }, complete: function complete(t, e) { if ("throw" === t.type) throw t.arg; return "break" === t.type || "continue" === t.type ? this.next = t.arg : "return" === t.type ? (this.rval = this.arg = t.arg, this.method = "return", this.next = "end") : "normal" === t.type && e && (this.next = e), y; }, finish: function finish(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.finallyLoc === t) return this.complete(r.completion, r.afterLoc), resetTryEntry(r), y; } }, "catch": function _catch(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.tryLoc === t) { var n = r.completion; if ("throw" === n.type) { var o = n.arg; resetTryEntry(r); } return o; } } throw Error("illegal catch attempt"); }, delegateYield: function delegateYield(e, r, n) { return this.delegate = { iterator: values(e), resultName: r, nextLoc: n }, "next" === this.method && (this.arg = t), y; } }, e; }
function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function _callSuper(t, o, e) { return o = _getPrototypeOf(o), _possibleConstructorReturn(t, _isNativeReflectConstruct() ? Reflect.construct(o, e || [], _getPrototypeOf(t).constructor) : o.apply(t, e)); }
function _possibleConstructorReturn(t, e) { if (e && ("object" == _typeof(e) || "function" == typeof e)) return e; if (void 0 !== e) throw new TypeError("Derived constructors may only return object or undefined"); return _assertThisInitialized(t); }
function _assertThisInitialized(e) { if (void 0 === e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); return e; }
function _isNativeReflectConstruct() { try { var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); } catch (t) {} return (_isNativeReflectConstruct = function _isNativeReflectConstruct() { return !!t; })(); }
function _getPrototypeOf(t) { return _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function (t) { return t.__proto__ || Object.getPrototypeOf(t); }, _getPrototypeOf(t); }
function _inherits(t, e) { if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function"); t.prototype = Object.create(e && e.prototype, { constructor: { value: t, writable: !0, configurable: !0 } }), Object.defineProperty(t, "prototype", { writable: !1 }), e && _setPrototypeOf(t, e); }
function _setPrototypeOf(t, e) { return _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function (t, e) { return t.__proto__ = e, t; }, _setPrototypeOf(t, e); }
function asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; }
function graphQLFetch(_x) {
  return _graphQLFetch.apply(this, arguments);
}
function _graphQLFetch() {
  _graphQLFetch = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee5(query) {
    var variables,
      response,
      result,
      _args5 = arguments;
    return _regeneratorRuntime().wrap(function _callee5$(_context5) {
      while (1) switch (_context5.prev = _context5.next) {
        case 0:
          variables = _args5.length > 1 && _args5[1] !== undefined ? _args5[1] : {};
          _context5.prev = 1;
          _context5.next = 4;
          return fetch('/graphql', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              query: query,
              variables: variables
            })
          });
        case 4:
          response = _context5.sent;
          _context5.next = 7;
          return response.json();
        case 7:
          result = _context5.sent;
          return _context5.abrupt("return", result.data);
        case 11:
          _context5.prev = 11;
          _context5.t0 = _context5["catch"](1);
          console.error('Error fetching data:', _context5.t0);
        case 14:
        case "end":
          return _context5.stop();
      }
    }, _callee5, null, [[1, 11]]);
  }));
  return _graphQLFetch.apply(this, arguments);
}
var ActivityList = /*#__PURE__*/function (_React$Component) {
  function ActivityList(props) {
    var _this;
    _classCallCheck(this, ActivityList);
    _this = _callSuper(this, ActivityList, [props]);
    _this.state = {
      activities: []
    };
    return _this;
  }
  _inherits(ActivityList, _React$Component);
  return _createClass(ActivityList, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      this.loadData();
    }
  }, {
    key: "loadData",
    value: function () {
      var _loadData = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee() {
        var query, data;
        return _regeneratorRuntime().wrap(function _callee$(_context) {
          while (1) switch (_context.prev = _context.next) {
            case 0:
              query = "\n      query {\n        activitiesList {\n          id title venue date startTime endTime\n          fee maxPlayers currentPlayers status\n        }\n      }\n    ";
              _context.next = 3;
              return graphQLFetch(query);
            case 3:
              data = _context.sent;
              if (data) {
                this.setState({
                  activities: data.activitiesList
                });
              }
            case 5:
            case "end":
              return _context.stop();
          }
        }, _callee, this);
      }));
      function loadData() {
        return _loadData.apply(this, arguments);
      }
      return loadData;
    }()
  }, {
    key: "render",
    value: function render() {
      var activities = this.state.activities;
      return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h1", null, "Badminton Activity List"), /*#__PURE__*/React.createElement("table", {
        className: "bordered-table"
      }, /*#__PURE__*/React.createElement("thead", null, /*#__PURE__*/React.createElement("tr", null, /*#__PURE__*/React.createElement("th", null, "ID"), /*#__PURE__*/React.createElement("th", null, "Title"), /*#__PURE__*/React.createElement("th", null, "Venue"), /*#__PURE__*/React.createElement("th", null, "Date"), /*#__PURE__*/React.createElement("th", null, "Time"), /*#__PURE__*/React.createElement("th", null, "Fee"), /*#__PURE__*/React.createElement("th", null, "Players"), /*#__PURE__*/React.createElement("th", null, "Status"))), /*#__PURE__*/React.createElement("tbody", null, activities.map(function (activity) {
        return /*#__PURE__*/React.createElement("tr", {
          key: activity.id
        }, /*#__PURE__*/React.createElement("td", null, activity.id), /*#__PURE__*/React.createElement("td", null, activity.title), /*#__PURE__*/React.createElement("td", null, activity.venue), /*#__PURE__*/React.createElement("td", null, activity.date), /*#__PURE__*/React.createElement("td", null, activity.startTime, "-", activity.endTime), /*#__PURE__*/React.createElement("td", null, "$", activity.fee), /*#__PURE__*/React.createElement("td", null, activity.currentPlayers, "/", activity.maxPlayers), /*#__PURE__*/React.createElement("td", null, activity.status));
      }))));
    }
  }]);
}(React.Component);
var SkillLevelSelector = /*#__PURE__*/function (_React$Component2) {
  function SkillLevelSelector(props) {
    var _this2;
    _classCallCheck(this, SkillLevelSelector);
    _this2 = _callSuper(this, SkillLevelSelector, [props]);
    _this2.state = {
      selectedLevel: props.currentLevel || ''
    };
    return _this2;
  }
  _inherits(SkillLevelSelector, _React$Component2);
  return _createClass(SkillLevelSelector, [{
    key: "handleSkillLevelChange",
    value: function () {
      var _handleSkillLevelChange = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee2(level) {
        var mutation, response, result;
        return _regeneratorRuntime().wrap(function _callee2$(_context2) {
          while (1) switch (_context2.prev = _context2.next) {
            case 0:
              _context2.prev = 0;
              mutation = "\n        mutation UpdateSkillLevel($skillLevel: String!) {\n          updateUserSkillLevel(skillLevel: $skillLevel) {\n            googleId\n            skillLevel\n          }\n        }\n      ";
              _context2.next = 4;
              return fetch('/graphql', {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                  'credentials': 'include'
                },
                body: JSON.stringify({
                  query: mutation,
                  variables: {
                    skillLevel: level
                  }
                })
              });
            case 4:
              response = _context2.sent;
              _context2.next = 7;
              return response.json();
            case 7:
              result = _context2.sent;
              if (!result.errors) {
                this.setState({
                  selectedLevel: level
                });
                if (this.props.onSkillLevelChange) {
                  this.props.onSkillLevelChange(level);
                }
              } else {
                console.error('GraphQL errors:', result.errors);
              }
              _context2.next = 14;
              break;
            case 11:
              _context2.prev = 11;
              _context2.t0 = _context2["catch"](0);
              console.error('Error updating skill level:', _context2.t0);
            case 14:
            case "end":
              return _context2.stop();
          }
        }, _callee2, this, [[0, 11]]);
      }));
      function handleSkillLevelChange(_x2) {
        return _handleSkillLevelChange.apply(this, arguments);
      }
      return handleSkillLevelChange;
    }()
  }, {
    key: "render",
    value: function render() {
      var _this3 = this;
      var skillLevels = [{
        id: 'low_beginner',
        label: 'Low Beginners',
        description: 'Just started playing, learning to serve and hit shuttles accurately.'
      }, {
        id: 'mid_beginner',
        label: 'Mid Beginners',
        description: 'Able to accurately hit shuttles consistently but not able to clear and smash.'
      }, {
        id: 'high_beginner',
        label: 'High Beginners',
        description: 'Able to clear, smash and play net but unable to cover all corners of court and inconsistent in shots.'
      }, {
        id: 'low_intermediate',
        label: 'Low Intermediate',
        description: 'Achieved certain level of consistency in play with regards to smash, clear and net. Able to do basic strategies in game and cover all corners of court.'
      }, {
        id: 'mid_intermediate',
        label: 'Mid Intermediate',
        description: 'Able to place shots strategically with smash and cross-net accuracy, consistency in drop shots and clears.'
      }, {
        id: 'high_intermediate',
        label: 'High Intermediate - Advance',
        description: 'Used to play competitively either at zone or international level with high level of stamina.'
      }];
      return /*#__PURE__*/React.createElement("div", {
        className: "skill-level-selector"
      }, /*#__PURE__*/React.createElement("h3", null, "Select Your Skill Level"), /*#__PURE__*/React.createElement("div", {
        className: "skill-levels"
      }, skillLevels.map(function (level) {
        return /*#__PURE__*/React.createElement("div", {
          key: level.id,
          className: "skill-level-card ".concat(_this3.state.selectedLevel === level.id ? 'selected' : ''),
          onClick: function onClick() {
            return _this3.handleSkillLevelChange(level.id);
          }
        }, /*#__PURE__*/React.createElement("h4", null, level.label), /*#__PURE__*/React.createElement("p", null, level.description));
      })));
    }
  }]);
}(React.Component);
var App = /*#__PURE__*/function (_React$Component3) {
  function App(props) {
    var _this4;
    _classCallCheck(this, App);
    _this4 = _callSuper(this, App, [props]);
    _this4.state = {
      authenticated: false,
      user: null,
      isEditingSkill: false
    };
    return _this4;
  }
  _inherits(App, _React$Component3);
  return _createClass(App, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      this.checkAuthStatus();
    }
  }, {
    key: "checkAuthStatus",
    value: function () {
      var _checkAuthStatus = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee3() {
        var response, data;
        return _regeneratorRuntime().wrap(function _callee3$(_context3) {
          while (1) switch (_context3.prev = _context3.next) {
            case 0:
              _context3.prev = 0;
              _context3.next = 3;
              return fetch('/api/auth/status');
            case 3:
              response = _context3.sent;
              _context3.next = 6;
              return response.json();
            case 6:
              data = _context3.sent;
              this.setState({
                authenticated: data.authenticated,
                user: data.user
              });
              _context3.next = 13;
              break;
            case 10:
              _context3.prev = 10;
              _context3.t0 = _context3["catch"](0);
              console.error('Error checking auth status:', _context3.t0);
            case 13:
            case "end":
              return _context3.stop();
          }
        }, _callee3, this, [[0, 10]]);
      }));
      function checkAuthStatus() {
        return _checkAuthStatus.apply(this, arguments);
      }
      return checkAuthStatus;
    }()
  }, {
    key: "handleLogout",
    value: function () {
      var _handleLogout = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee4(e) {
        var response;
        return _regeneratorRuntime().wrap(function _callee4$(_context4) {
          while (1) switch (_context4.prev = _context4.next) {
            case 0:
              e.preventDefault();
              _context4.prev = 1;
              _context4.next = 4;
              return fetch('/api/auth/logout');
            case 4:
              response = _context4.sent;
              if (response.ok) {
                this.setState({
                  authenticated: false,
                  user: null
                });
              }
              _context4.next = 11;
              break;
            case 8:
              _context4.prev = 8;
              _context4.t0 = _context4["catch"](1);
              console.error('Logout error:', _context4.t0);
            case 11:
            case "end":
              return _context4.stop();
          }
        }, _callee4, this, [[1, 8]]);
      }));
      function handleLogout(_x3) {
        return _handleLogout.apply(this, arguments);
      }
      return handleLogout;
    }()
  }, {
    key: "render",
    value: function render() {
      var _this5 = this,
        _skillLevels$find;
      var _this$state = this.state,
        authenticated = _this$state.authenticated,
        user = _this$state.user;
      var skillLevels = [{
        id: 'low_beginner',
        label: 'Low Beginners',
        description: 'Just started playing, learning to serve and hit shuttles accurately.'
      }, {
        id: 'mid_beginner',
        label: 'Mid Beginners',
        description: 'Able to accurately hit shuttles consistently but not able to clear and smash.'
      }, {
        id: 'high_beginner',
        label: 'High Beginners',
        description: 'Able to clear, smash and play net but unable to cover all corners of court and inconsistent in shots.'
      }, {
        id: 'low_intermediate',
        label: 'Low Intermediate',
        description: 'Achieved certain level of consistency in play with regards to smash, clear and net. Able to do basic strategies in game and cover all corners of court.'
      }, {
        id: 'mid_intermediate',
        label: 'Mid Intermediate',
        description: 'Able to place shots strategically with smash and cross-net accuracy, consistency in drop shots and clears.'
      }, {
        id: 'high_intermediate',
        label: 'High Intermediate - Advance',
        description: 'Used to play competitively either at zone or international level with high level of stamina.'
      }];
      return /*#__PURE__*/React.createElement("div", null, !authenticated ? /*#__PURE__*/React.createElement("div", {
        className: "login-section"
      }, /*#__PURE__*/React.createElement("h2", null, "Please log in to continue"), /*#__PURE__*/React.createElement("a", {
        href: "/auth/google",
        className: "google-login-btn"
      }, "Login with Google")) : !(user !== null && user !== void 0 && user.skillLevel) ? /*#__PURE__*/React.createElement("div", {
        className: "skill-selection-section"
      }, /*#__PURE__*/React.createElement("h2", null, "Please Select Your Badminton Skill Level"), /*#__PURE__*/React.createElement("p", null, "Please select your skill level before continuing"), /*#__PURE__*/React.createElement(SkillLevelSelector, {
        currentLevel: user === null || user === void 0 ? void 0 : user.skillLevel,
        onSkillLevelChange: function onSkillLevelChange(level) {
          var updatedUser = _objectSpread(_objectSpread({}, _this5.state.user), {}, {
            skillLevel: level
          });
          _this5.setState({
            user: updatedUser
          });
        }
      })) : /*#__PURE__*/React.createElement("div", {
        className: "user-section"
      }, /*#__PURE__*/React.createElement("div", {
        className: "user-header"
      }, /*#__PURE__*/React.createElement("div", {
        className: "user-info"
      }, /*#__PURE__*/React.createElement("p", null, "Welcome, ", user === null || user === void 0 ? void 0 : user.displayName), /*#__PURE__*/React.createElement("div", {
        className: "skill-level-info"
      }, /*#__PURE__*/React.createElement("p", null, "Current Level: ", (_skillLevels$find = skillLevels.find(function (level) {
        return level.id === (user === null || user === void 0 ? void 0 : user.skillLevel);
      })) === null || _skillLevels$find === void 0 ? void 0 : _skillLevels$find.label), /*#__PURE__*/React.createElement("button", {
        className: "edit-skill-btn",
        onClick: function onClick() {
          return _this5.setState({
            isEditingSkill: true
          });
        }
      }, "Edit Level"))), /*#__PURE__*/React.createElement("a", {
        href: "#",
        onClick: this.handleLogout.bind(this),
        className: "logout-btn"
      }, "Logout")), this.state.isEditingSkill ? /*#__PURE__*/React.createElement("div", {
        className: "edit-skill-section"
      }, /*#__PURE__*/React.createElement("h3", null, "Update Your Badminton Skill Level"), /*#__PURE__*/React.createElement(SkillLevelSelector, {
        currentLevel: user === null || user === void 0 ? void 0 : user.skillLevel,
        onSkillLevelChange: function onSkillLevelChange(level) {
          var updatedUser = _objectSpread(_objectSpread({}, _this5.state.user), {}, {
            skillLevel: level
          });
          _this5.setState({
            user: updatedUser,
            isEditingSkill: false
          });
        }
      }), /*#__PURE__*/React.createElement("button", {
        className: "cancel-edit-btn",
        onClick: function onClick() {
          return _this5.setState({
            isEditingSkill: false
          });
        }
      }, "Cancel")) : /*#__PURE__*/React.createElement(ActivityList, null)));
    }
  }]);
}(React.Component); // 使用全局变量的方式渲染
var element = /*#__PURE__*/React.createElement(App, null);
ReactDOM.render(element, document.getElementById('contents'));