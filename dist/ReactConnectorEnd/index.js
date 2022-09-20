"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

const ReactConnectorEnd = props => {
  const {
    connectorContext,
    uniqueid
  } = props;
  const {
    connectId
  } = connectorContext;
  const newProps = {
    draggable: true
  };

  const angle = (cx, cy, ex, ey) => {
    var dy = ey - cy;
    var dx = ex - cx;
    var theta = Math.atan2(dy, dx); // range (-PI, PI]

    theta *= 180 / Math.PI; // rads to degs, range (-180, 180]
    //if (theta < 0) theta = 360 + theta; // range [0, 360)

    return theta;
  };

  const drawLine = (x1, y1, x2, y2) => {
    console.log("Drawing line between ", x1, y1, " to ", x2, y2);
    var div = document.createElement('div');
    div.style.height = "2px";
    const x = Math.abs(x1 - x2);
    const y = Math.abs(y1 - y2);
    const width = Math.sqrt(x * x + y * y);
    div.style.width = width + "px";
    const rotateAngle = angle(x2, y2, x1, y1);
    div.style.backgroundColor = "black";
    div.style.position = "fixed";
    div.style.left = x2 + "px";
    div.style.top = y2 + "px";
    div.style.transform = "rotate(".concat(rotateAngle, "deg)");
    div.style.transformOrigin = 'left';
    var connectorArrowTip = document.createElement('div');
    connectorArrowTip.style.width = "0px";
    connectorArrowTip.style.height = "0px";
    connectorArrowTip.style.borderTop = "10px solid transparent";
    connectorArrowTip.style.borderBottom = "10px solid transparent";
    connectorArrowTip.style.borderRight = "10px solid blue";
    connectorArrowTip.style.position = "absolute";
    connectorArrowTip.style.bottom = "-10px";
    connectorArrowTip.style.left = "-10px";
    div.appendChild(connectorArrowTip);
    document.body.appendChild(div);
  };

  const onDrop = event => {
    event.preventDefault();
    event.stopPropagation();
    const targetX = event.pageX;
    const targetY = event.pageY;
    const sourceCooridnatesStringTokens = event.dataTransfer.getData(connectId).split(",");
    const sourceX = sourceCooridnatesStringTokens[0];
    const sourceY = sourceCooridnatesStringTokens[1];
    let connectionObj = {
      endIdentifier: uniqueid,
      startIdentifier: sourceCooridnatesStringTokens[2],
      sourceX,
      sourceY,
      targetX,
      targetY
    };
    connectorContext.connectors.push(connectionObj);
    drawLine(sourceX, sourceY, targetX, targetY);
  };

  const onDragOver = event => {
    event.preventDefault();
  };

  const styles = {
    "height": "fit-content",
    "cursor": "pointer",
    "display": "inline-block"
  };
  return /*#__PURE__*/_react.default.createElement("div", {
    className: "connector-end",
    connector: "true",
    onDrop: onDrop,
    onDragOver: onDragOver,
    style: _objectSpread({}, styles)
  }, _react.default.Children.map(props.children, child => {
    return /*#__PURE__*/_react.default.cloneElement(child, {
      newProps
    }, null);
  }));
};

var _default = ReactConnectorEnd;
exports.default = _default;