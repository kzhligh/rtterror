"use strict";
(() => {
var exports = {};
exports.id = "pages/customer";
exports.ids = ["pages/customer"];
exports.modules = {

/***/ "./components/navbar/index.js":
/*!************************************!*\
  !*** ./components/navbar/index.js ***!
  \************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _mui_material__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @mui/material */ "@mui/material");
/* harmony import */ var _mui_material__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_mui_material__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react/jsx-dev-runtime */ "react/jsx-dev-runtime");
/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_1__);
var _jsxFileName = "C:\\Users\\Owner\\IdeaProjects\\rtterror\\frontend\\components\\navbar\\index.js";
 // function NavItem(props) {
//     const {text}=props
//     return (
//         <h1>{text}</h1>
//     );
// }



function NavSection() {
  const navList = ["dashboard", "service", "appointment"];
  return /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxDEV)(_mui_material__WEBPACK_IMPORTED_MODULE_0__.Box, {
    children: /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxDEV)(_mui_material__WEBPACK_IMPORTED_MODULE_0__.List, {
      disablePadding: true,
      children: navList.map(item => /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxDEV)("h1", {
        children: item
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 17,
        columnNumber: 21
      }, this))
    }, void 0, false, {
      fileName: _jsxFileName,
      lineNumber: 15,
      columnNumber: 13
    }, this)
  }, void 0, false, {
    fileName: _jsxFileName,
    lineNumber: 14,
    columnNumber: 9
  }, this);
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (NavSection);

/***/ }),

/***/ "./pages/customer/index.js":
/*!*********************************!*\
  !*** ./pages/customer/index.js ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "getStaticProps": () => (/* binding */ getStaticProps),
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _components_navbar__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../components/navbar */ "./components/navbar/index.js");
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
      lineNumber: 9,
      columnNumber: 13
    }, this), /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_2__.jsxDEV)("h2", {
      children: text
    }, void 0, false, {
      fileName: _jsxFileName,
      lineNumber: 10,
      columnNumber: 13
    }, this), /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_2__.jsxDEV)(_components_navbar__WEBPACK_IMPORTED_MODULE_0__.default, {}, void 0, false, {
      fileName: _jsxFileName,
      lineNumber: 11,
      columnNumber: 13
    }, this)]
  }, void 0, true, {
    fileName: _jsxFileName,
    lineNumber: 8,
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

/***/ "@mui/material":
/*!********************************!*\
  !*** external "@mui/material" ***!
  \********************************/
/***/ ((module) => {

module.exports = require("@mui/material");

/***/ }),

/***/ "react/jsx-dev-runtime":
/*!****************************************!*\
  !*** external "react/jsx-dev-runtime" ***!
  \****************************************/
/***/ ((module) => {

module.exports = require("react/jsx-dev-runtime");

/***/ }),

/***/ "superagent":
/*!*****************************!*\
  !*** external "superagent" ***!
  \*****************************/
/***/ ((module) => {

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGFnZXMvY3VzdG9tZXIuanMiLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztDQUdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7OztBQUVBLFNBQVNFLFVBQVQsR0FBc0I7QUFDbEIsUUFBTUMsT0FBTyxHQUFHLENBQUMsV0FBRCxFQUFhLFNBQWIsRUFBdUIsYUFBdkIsQ0FBaEI7QUFDQSxzQkFDSSw4REFBQyw4Q0FBRDtBQUFBLDJCQUNJLDhEQUFDLCtDQUFEO0FBQU0sb0JBQWMsTUFBcEI7QUFBQSxnQkFDS0EsT0FBTyxDQUFDQyxHQUFSLENBQWFDLElBQUQsaUJBQ1Q7QUFBQSxrQkFBS0E7QUFBTDtBQUFBO0FBQUE7QUFBQTtBQUFBLGNBREg7QUFETDtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBREo7QUFBQTtBQUFBO0FBQUE7QUFBQSxVQURKO0FBU0g7O0FBQ0QsaUVBQWVILFVBQWY7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ3RCQTtDQUdBOzs7O0FBQ0EsU0FBU0ssUUFBVCxDQUFrQkMsS0FBbEIsRUFBd0I7QUFDcEIsUUFBTTtBQUFDQyxJQUFBQTtBQUFELE1BQVNELEtBQWY7QUFDQSxzQkFDSTtBQUFBLDRCQUNJO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLFlBREosZUFFSTtBQUFBLGdCQUFLQztBQUFMO0FBQUE7QUFBQTtBQUFBO0FBQUEsWUFGSixlQUdJLDhEQUFDLHVEQUFEO0FBQUE7QUFBQTtBQUFBO0FBQUEsWUFISjtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsVUFESjtBQU9ILEVBRUQ7OztBQUNPLGVBQWVDLGNBQWYsR0FBZ0M7QUFDbkMsTUFBSUMsU0FBUyxHQUFDLEVBQWQ7QUFDQSxRQUFNQyxHQUFHLEdBQUcsTUFBTUMsS0FBSyxDQUFDLHFEQUFELENBQXZCO0FBQ0FGLEVBQUFBLFNBQVMsR0FBRyxRQUFaO0FBRUEsU0FBTztBQUNISCxJQUFBQSxLQUFLLEVBQUU7QUFBRUMsTUFBQUEsSUFBSSxFQUFFRTtBQUFSLEtBREosQ0FDeUI7O0FBRHpCLEdBQVA7QUFHSDtBQUNELGlFQUFlSixRQUFmOzs7Ozs7Ozs7O0FDekJBOzs7Ozs7Ozs7O0FDQUE7Ozs7Ozs7Ozs7QUNBQSIsInNvdXJjZXMiOlsid2VicGFjazovL2Zyb250ZW5kLy4vY29tcG9uZW50cy9uYXZiYXIvaW5kZXguanMiLCJ3ZWJwYWNrOi8vZnJvbnRlbmQvLi9wYWdlcy9jdXN0b21lci9pbmRleC5qcyIsIndlYnBhY2s6Ly9mcm9udGVuZC9leHRlcm5hbCBcIkBtdWkvbWF0ZXJpYWxcIiIsIndlYnBhY2s6Ly9mcm9udGVuZC9leHRlcm5hbCBcInJlYWN0L2pzeC1kZXYtcnVudGltZVwiIiwid2VicGFjazovL2Zyb250ZW5kL2V4dGVybmFsIFwic3VwZXJhZ2VudFwiIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEJveCwgTGlzdCB9IGZyb20gJ0BtdWkvbWF0ZXJpYWwnO1xyXG5cclxuXHJcbi8vIGZ1bmN0aW9uIE5hdkl0ZW0ocHJvcHMpIHtcclxuLy8gICAgIGNvbnN0IHt0ZXh0fT1wcm9wc1xyXG4vLyAgICAgcmV0dXJuIChcclxuLy8gICAgICAgICA8aDE+e3RleHR9PC9oMT5cclxuLy8gICAgICk7XHJcbi8vIH1cclxuXHJcbmZ1bmN0aW9uIE5hdlNlY3Rpb24oKSB7XHJcbiAgICBjb25zdCBuYXZMaXN0ID0gW1wiZGFzaGJvYXJkXCIsXCJzZXJ2aWNlXCIsXCJhcHBvaW50bWVudFwiXTtcclxuICAgIHJldHVybiAoXHJcbiAgICAgICAgPEJveCA+XHJcbiAgICAgICAgICAgIDxMaXN0IGRpc2FibGVQYWRkaW5nPlxyXG4gICAgICAgICAgICAgICAge25hdkxpc3QubWFwKChpdGVtKSA9PiAoXHJcbiAgICAgICAgICAgICAgICAgICAgPGgxPntpdGVtfTwvaDE+XHJcbiAgICAgICAgICAgICAgICApKX1cclxuICAgICAgICAgICAgPC9MaXN0PlxyXG4gICAgICAgIDwvQm94PlxyXG4gICAgKTtcclxufVxyXG5leHBvcnQgZGVmYXVsdCBOYXZTZWN0aW9uOyIsImltcG9ydCBOYXZTZWN0aW9uIGZyb20gXCIuLi8uLi9jb21wb25lbnRzL25hdmJhclwiXHJcbmltcG9ydCByZXF1ZXN0IGZyb20gXCJzdXBlcmFnZW50XCI7XHJcblxyXG4vLyB3ZSBjYW4gdXNlIHJlZ3VsYXIgcmVhY3Qgc3RhdGUgb3IgZmV0Y2ggdGhlIGRhdGEgd2l0aCBzdXBlciBhZ2VudCAgb3IgdXNlIGdldFN0YXRpY1Byb3BzXHJcbmZ1bmN0aW9uIGN1c3RvbWVyKHByb3BzKXtcclxuICAgIGNvbnN0IHt0ZXh0fSA9IHByb3BzXHJcbiAgICByZXR1cm4oXHJcbiAgICAgICAgPGJveD5cclxuICAgICAgICAgICAgPGgxPkN1c3RvbWVyPC9oMT5cclxuICAgICAgICAgICAgPGgyPnt0ZXh0fTwvaDI+XHJcbiAgICAgICAgICAgIDxOYXZTZWN0aW9uPjwvTmF2U2VjdGlvbj5cclxuICAgICAgICA8L2JveD5cclxuICAgIClcclxufVxyXG5cclxuLy8gZmV0Y2ggdGhlIGRhdGEgZnJvbSB0aGUgYmFjayBlbmQgd2l0aG91dCB1c2luZyB0aGUgc2V0IHByb3AsIGRyYXdiYWNrIG5vdCB1cGRhdGVcclxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIGdldFN0YXRpY1Byb3BzKCkge1xyXG4gICAgdmFyIHJlc3N0YXR1cz0nJztcclxuICAgIGNvbnN0IHJlcyA9IGF3YWl0IGZldGNoKCdodHRwczovL2FwaS5naXRodWIuY29tL3JlcG9zL3Zpc2lvbm1lZGlhL3N1cGVyYWdlbnQnKVxyXG4gICAgcmVzc3RhdHVzID0gJ3N1Y2VzcydcclxuXHJcbiAgICByZXR1cm4ge1xyXG4gICAgICAgIHByb3BzOiB7IHRleHQ6IHJlc3N0YXR1cyB9LCAvLyB3aWxsIGJlIHBhc3NlZCB0byB0aGUgcGFnZSBjb21wb25lbnQgYXMgcHJvcHNcclxuICAgIH1cclxufVxyXG5leHBvcnQgZGVmYXVsdCBjdXN0b21lcjsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJAbXVpL21hdGVyaWFsXCIpOyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcInJlYWN0L2pzeC1kZXYtcnVudGltZVwiKTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJzdXBlcmFnZW50XCIpOyJdLCJuYW1lcyI6WyJCb3giLCJMaXN0IiwiTmF2U2VjdGlvbiIsIm5hdkxpc3QiLCJtYXAiLCJpdGVtIiwicmVxdWVzdCIsImN1c3RvbWVyIiwicHJvcHMiLCJ0ZXh0IiwiZ2V0U3RhdGljUHJvcHMiLCJyZXNzdGF0dXMiLCJyZXMiLCJmZXRjaCJdLCJzb3VyY2VSb290IjoiIn0=