"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

let ReactConnectorContext = connectId => {
  return {
    connectId,
    connectors: []
  };
};

var _default = ReactConnectorContext;
exports.default = _default;