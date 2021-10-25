(() => {
var exports = {};
exports.id = "pages/customer";
exports.ids = ["pages/customer"];
exports.modules = {

/***/ "./components/Layout/index.js":
/*!************************************!*\
  !*** ./components/Layout/index.js ***!
  \************************************/
/***/ (() => {



/***/ }),

/***/ "./pages/customer/index.js":
/*!*********************************!*\
  !*** ./pages/customer/index.js ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "getStaticProps": () => (/* binding */ getStaticProps),
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _components_Layout__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../components/Layout */ "./components/Layout/index.js");
/* harmony import */ var _components_Layout__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_components_Layout__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var superagent__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! superagent */ "superagent");
/* harmony import */ var superagent__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(superagent__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react/jsx-dev-runtime */ "react/jsx-dev-runtime");
/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_2__);
var _jsxFileName = "C:\\Users\\Owner\\IdeaProjects\\rtterror\\frontend\\pages\\customer\\index.js";


 // we can use regular react state or fetch the data with super agent  or use getStaticProps



function customer(props) {
  const {
    text
  } = props;
  return /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_2__.jsxDEV)("box", {
    children: [/*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_2__.jsxDEV)("h1", {
      children: "Customer"
    }, void 0, false, {
      fileName: _jsxFileName,
      lineNumber: 10,
      columnNumber: 13
    }, this), /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_2__.jsxDEV)("h2", {
      children: text
    }, void 0, false, {
      fileName: _jsxFileName,
      lineNumber: 11,
      columnNumber: 13
    }, this)]
  }, void 0, true, {
    fileName: _jsxFileName,
    lineNumber: 9,
    columnNumber: 9
  }, this);
} // fetch the data from the back end without using the set prop, drawback not update


async function getStaticProps() {
  var resstatus = '';
  const res = await fetch('https://api.github.com/repos/visionmedia/superagent');
  resstatus = 'sucess';
  return {
    props: {
      text: resstatus
    } // will be passed to the page component as props

  };
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (customer);

/***/ }),

/***/ "react/jsx-dev-runtime":
/*!****************************************!*\
  !*** external "react/jsx-dev-runtime" ***!
  \****************************************/
/***/ ((module) => {

"use strict";
module.exports = require("react/jsx-dev-runtime");

/***/ }),

/***/ "superagent":
/*!*****************************!*\
  !*** external "superagent" ***!
  \*****************************/
/***/ ((module) => {

"use strict";
module.exports = require("superagent");

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../webpack-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = (__webpack_exec__("./pages/customer/index.js"));
module.exports = __webpack_exports__;

})();
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGFnZXMvY3VzdG9tZXIuanMiLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTtBQUNBO0NBR0E7Ozs7QUFDQSxTQUFTRyxRQUFULENBQWtCQyxLQUFsQixFQUF3QjtBQUNwQixRQUFNO0FBQUNDLElBQUFBO0FBQUQsTUFBU0QsS0FBZjtBQUNBLHNCQUNJO0FBQUEsNEJBQ0k7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsWUFESixlQUVJO0FBQUEsZ0JBQUtDO0FBQUw7QUFBQTtBQUFBO0FBQUE7QUFBQSxZQUZKO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxVQURKO0FBTUgsRUFFRDs7O0FBQ08sZUFBZUMsY0FBZixHQUFnQztBQUNuQyxNQUFJQyxTQUFTLEdBQUMsRUFBZDtBQUNBLFFBQU1DLEdBQUcsR0FBRyxNQUFNQyxLQUFLLENBQUMscURBQUQsQ0FBdkI7QUFDQUYsRUFBQUEsU0FBUyxHQUFHLFFBQVo7QUFFQSxTQUFPO0FBQ0hILElBQUFBLEtBQUssRUFBRTtBQUFFQyxNQUFBQSxJQUFJLEVBQUVFO0FBQVIsS0FESixDQUN5Qjs7QUFEekIsR0FBUDtBQUdIO0FBQ0QsaUVBQWVKLFFBQWY7Ozs7Ozs7Ozs7O0FDekJBOzs7Ozs7Ozs7OztBQ0FBIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vZnJvbnRlbmQvLi9wYWdlcy9jdXN0b21lci9pbmRleC5qcyIsIndlYnBhY2s6Ly9mcm9udGVuZC9leHRlcm5hbCBcInJlYWN0L2pzeC1kZXYtcnVudGltZVwiIiwid2VicGFjazovL2Zyb250ZW5kL2V4dGVybmFsIFwic3VwZXJhZ2VudFwiIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBOYXZTZWN0aW9uIGZyb20gXCIuLi8uLi9jb21wb25lbnRzL0xheW91dFwiXHJcbmltcG9ydCByZXF1ZXN0IGZyb20gXCJzdXBlcmFnZW50XCI7XHJcbmltcG9ydCBQcmltYXJ5U2VhcmNoQXBwQmFyIGZyb20gXCIuLi8uLi9jb21wb25lbnRzL0xheW91dFwiO1xyXG5cclxuLy8gd2UgY2FuIHVzZSByZWd1bGFyIHJlYWN0IHN0YXRlIG9yIGZldGNoIHRoZSBkYXRhIHdpdGggc3VwZXIgYWdlbnQgIG9yIHVzZSBnZXRTdGF0aWNQcm9wc1xyXG5mdW5jdGlvbiBjdXN0b21lcihwcm9wcyl7XHJcbiAgICBjb25zdCB7dGV4dH0gPSBwcm9wc1xyXG4gICAgcmV0dXJuKFxyXG4gICAgICAgIDxib3g+XHJcbiAgICAgICAgICAgIDxoMT5DdXN0b21lcjwvaDE+XHJcbiAgICAgICAgICAgIDxoMj57dGV4dH08L2gyPlxyXG4gICAgICAgIDwvYm94PlxyXG4gICAgKVxyXG59XHJcblxyXG4vLyBmZXRjaCB0aGUgZGF0YSBmcm9tIHRoZSBiYWNrIGVuZCB3aXRob3V0IHVzaW5nIHRoZSBzZXQgcHJvcCwgZHJhd2JhY2sgbm90IHVwZGF0ZVxyXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gZ2V0U3RhdGljUHJvcHMoKSB7XHJcbiAgICB2YXIgcmVzc3RhdHVzPScnO1xyXG4gICAgY29uc3QgcmVzID0gYXdhaXQgZmV0Y2goJ2h0dHBzOi8vYXBpLmdpdGh1Yi5jb20vcmVwb3MvdmlzaW9ubWVkaWEvc3VwZXJhZ2VudCcpXHJcbiAgICByZXNzdGF0dXMgPSAnc3VjZXNzJ1xyXG5cclxuICAgIHJldHVybiB7XHJcbiAgICAgICAgcHJvcHM6IHsgdGV4dDogcmVzc3RhdHVzIH0sIC8vIHdpbGwgYmUgcGFzc2VkIHRvIHRoZSBwYWdlIGNvbXBvbmVudCBhcyBwcm9wc1xyXG4gICAgfVxyXG59XHJcbmV4cG9ydCBkZWZhdWx0IGN1c3RvbWVyOyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcInJlYWN0L2pzeC1kZXYtcnVudGltZVwiKTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJzdXBlcmFnZW50XCIpOyJdLCJuYW1lcyI6WyJOYXZTZWN0aW9uIiwicmVxdWVzdCIsIlByaW1hcnlTZWFyY2hBcHBCYXIiLCJjdXN0b21lciIsInByb3BzIiwidGV4dCIsImdldFN0YXRpY1Byb3BzIiwicmVzc3RhdHVzIiwicmVzIiwiZmV0Y2giXSwic291cmNlUm9vdCI6IiJ9