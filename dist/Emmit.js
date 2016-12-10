"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Emmit = function () {
  function Emmit() {
    _classCallCheck(this, Emmit);

    this.events = new Map();
    this.singleEvents = new Map();
  }

  _createClass(Emmit, [{
    key: "emit",
    value: function emit(event, props) {
      if (this.events.has(event)) {
        this.events.get(event).forEach(function (e) {
          return e(props);
        });
      }
      if (this.singleEvents.has(event)) {
        this.singleEvents.get(event).forEach(function (e) {
          return e(props);
        });
      }
      this.singleEvents.delete(event);
    }
  }, {
    key: "on",
    value: function on(event, f) {
      if (!this.events.has(event)) {
        this.events.set(event, []);
      }
      this.events.get(event).push(f);
    }
  }, {
    key: "once",
    value: function once(event, f) {
      if (!this.singleEvents.has(event)) {
        this.singleEvents.set(event, []);
      }
      this.singleEvents.get(event).push(f);
    }
  }]);

  return Emmit;
}();

exports.default = Emmit;
