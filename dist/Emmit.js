"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Emmit = function () {
  function Emmit() {
    _classCallCheck(this, Emmit);

    this.events = new Map();
  }

  _createClass(Emmit, [{
    key: "emit",
    value: function emit(event) {
      var _this = this;

      for (var _len = arguments.length, props = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
        props[_key - 1] = arguments[_key];
      }

      var trigger = new RegExp(event);
      this.events.forEach(function (events, key) {
        if (trigger.test(key)) {
          events.forEach(function (e) {
            return e.fn.apply(_this, props);
          });
          _this.events.set(key, events.filter(function (e) {
            return !e.once;
          }));
        }
      });
      var nonEmpty = [].concat(_toConsumableArray(this.events)).filter(function (e) {
        return e[1].length > 0;
      });
      this.events = new Map(nonEmpty);
    }
  }, {
    key: "on",
    value: function on(event, fn, options) {
      options = _extends({
        once: false,
        fn: fn
      }, options);
      if (!this.events.has(event)) {
        this.events.set(event, []);
      }
      this.events.get(event).push(options);
    }
  }, {
    key: "off",
    value: function off(event) {
      var filter = new RegExp(event);
      var filtered = [].concat(_toConsumableArray(this.events)).filter(function (eventDes) {
        return !filter.test(eventDes[0]);
      });
      this.events = new Map(filtered);
    }
  }, {
    key: "once",
    value: function once(event, f) {
      this.on(event, f, { once: true });
    }
  }]);

  return Emmit;
}();

exports.default = Emmit;
