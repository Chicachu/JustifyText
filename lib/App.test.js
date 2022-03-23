"use strict";

var _App = _interopRequireDefault(require("./App"));

var _reactDom = require("react-dom");

var _testUtils = require("react-dom/test-utils");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var container = null;
beforeEach(function () {
  container = document.createElement("div");
  document.body.appendChild(container);
});
afterEach(function () {
  (0, _reactDom.unmountComponentAtNode)(container);
  container.remove();
  container = null;
});
it("input text is valid: non-empty and less than or equal to 100 characters.", function () {
  (0, _testUtils.act)(function () {
    (0, _reactDom.render)( /*#__PURE__*/React.createElement(_App.default, null), container);
  });
  var input = document.querySelector("[data-testid=input-text]");
  expect(input.nodeValue).toBe(undefined);
  var justifyTextButton = document.querySelector("[data-testid=justify-text-button]");
  var errorMessage = document.querySelector("[data-testid=error-message-label]");
  (0, _testUtils.act)(function () {
    justifyTextButton.dispatchEvent(new MouseEvent("click", {
      bubbles: true
    }));
  });
  expect(errorMessage).toBe("Please enter a text to be justified.");
});