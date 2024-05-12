"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
exports.id = "vendor-chunks/encode-utf8";
exports.ids = ["vendor-chunks/encode-utf8"];
exports.modules = {

/***/ "(ssr)/./node_modules/encode-utf8/index.js":
/*!*******************************************!*\
  !*** ./node_modules/encode-utf8/index.js ***!
  \*******************************************/
/***/ ((module) => {

eval("\n\nmodule.exports = function encodeUtf8 (input) {\n  var result = []\n  var size = input.length\n\n  for (var index = 0; index < size; index++) {\n    var point = input.charCodeAt(index)\n\n    if (point >= 0xD800 && point <= 0xDBFF && size > index + 1) {\n      var second = input.charCodeAt(index + 1)\n\n      if (second >= 0xDC00 && second <= 0xDFFF) {\n        // https://mathiasbynens.be/notes/javascript-encoding#surrogate-formulae\n        point = (point - 0xD800) * 0x400 + second - 0xDC00 + 0x10000\n        index += 1\n      }\n    }\n\n    // US-ASCII\n    if (point < 0x80) {\n      result.push(point)\n      continue\n    }\n\n    // 2-byte UTF-8\n    if (point < 0x800) {\n      result.push((point >> 6) | 192)\n      result.push((point & 63) | 128)\n      continue\n    }\n\n    // 3-byte UTF-8\n    if (point < 0xD800 || (point >= 0xE000 && point < 0x10000)) {\n      result.push((point >> 12) | 224)\n      result.push(((point >> 6) & 63) | 128)\n      result.push((point & 63) | 128)\n      continue\n    }\n\n    // 4-byte UTF-8\n    if (point >= 0x10000 && point <= 0x10FFFF) {\n      result.push((point >> 18) | 240)\n      result.push(((point >> 12) & 63) | 128)\n      result.push(((point >> 6) & 63) | 128)\n      result.push((point & 63) | 128)\n      continue\n    }\n\n    // Invalid character\n    result.push(0xEF, 0xBF, 0xBD)\n  }\n\n  return new Uint8Array(result).buffer\n}\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHNzcikvLi9ub2RlX21vZHVsZXMvZW5jb2RlLXV0ZjgvaW5kZXguanMiLCJtYXBwaW5ncyI6IkFBQVk7O0FBRVo7QUFDQTtBQUNBOztBQUVBLHNCQUFzQixjQUFjO0FBQ3BDOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0EiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly90aWNrZXRpbmdfc3lzdGVtLy4vbm9kZV9tb2R1bGVzL2VuY29kZS11dGY4L2luZGV4LmpzPzA5NDMiXSwic291cmNlc0NvbnRlbnQiOlsiJ3VzZSBzdHJpY3QnXG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gZW5jb2RlVXRmOCAoaW5wdXQpIHtcbiAgdmFyIHJlc3VsdCA9IFtdXG4gIHZhciBzaXplID0gaW5wdXQubGVuZ3RoXG5cbiAgZm9yICh2YXIgaW5kZXggPSAwOyBpbmRleCA8IHNpemU7IGluZGV4KyspIHtcbiAgICB2YXIgcG9pbnQgPSBpbnB1dC5jaGFyQ29kZUF0KGluZGV4KVxuXG4gICAgaWYgKHBvaW50ID49IDB4RDgwMCAmJiBwb2ludCA8PSAweERCRkYgJiYgc2l6ZSA+IGluZGV4ICsgMSkge1xuICAgICAgdmFyIHNlY29uZCA9IGlucHV0LmNoYXJDb2RlQXQoaW5kZXggKyAxKVxuXG4gICAgICBpZiAoc2Vjb25kID49IDB4REMwMCAmJiBzZWNvbmQgPD0gMHhERkZGKSB7XG4gICAgICAgIC8vIGh0dHBzOi8vbWF0aGlhc2J5bmVucy5iZS9ub3Rlcy9qYXZhc2NyaXB0LWVuY29kaW5nI3N1cnJvZ2F0ZS1mb3JtdWxhZVxuICAgICAgICBwb2ludCA9IChwb2ludCAtIDB4RDgwMCkgKiAweDQwMCArIHNlY29uZCAtIDB4REMwMCArIDB4MTAwMDBcbiAgICAgICAgaW5kZXggKz0gMVxuICAgICAgfVxuICAgIH1cblxuICAgIC8vIFVTLUFTQ0lJXG4gICAgaWYgKHBvaW50IDwgMHg4MCkge1xuICAgICAgcmVzdWx0LnB1c2gocG9pbnQpXG4gICAgICBjb250aW51ZVxuICAgIH1cblxuICAgIC8vIDItYnl0ZSBVVEYtOFxuICAgIGlmIChwb2ludCA8IDB4ODAwKSB7XG4gICAgICByZXN1bHQucHVzaCgocG9pbnQgPj4gNikgfCAxOTIpXG4gICAgICByZXN1bHQucHVzaCgocG9pbnQgJiA2MykgfCAxMjgpXG4gICAgICBjb250aW51ZVxuICAgIH1cblxuICAgIC8vIDMtYnl0ZSBVVEYtOFxuICAgIGlmIChwb2ludCA8IDB4RDgwMCB8fCAocG9pbnQgPj0gMHhFMDAwICYmIHBvaW50IDwgMHgxMDAwMCkpIHtcbiAgICAgIHJlc3VsdC5wdXNoKChwb2ludCA+PiAxMikgfCAyMjQpXG4gICAgICByZXN1bHQucHVzaCgoKHBvaW50ID4+IDYpICYgNjMpIHwgMTI4KVxuICAgICAgcmVzdWx0LnB1c2goKHBvaW50ICYgNjMpIHwgMTI4KVxuICAgICAgY29udGludWVcbiAgICB9XG5cbiAgICAvLyA0LWJ5dGUgVVRGLThcbiAgICBpZiAocG9pbnQgPj0gMHgxMDAwMCAmJiBwb2ludCA8PSAweDEwRkZGRikge1xuICAgICAgcmVzdWx0LnB1c2goKHBvaW50ID4+IDE4KSB8IDI0MClcbiAgICAgIHJlc3VsdC5wdXNoKCgocG9pbnQgPj4gMTIpICYgNjMpIHwgMTI4KVxuICAgICAgcmVzdWx0LnB1c2goKChwb2ludCA+PiA2KSAmIDYzKSB8IDEyOClcbiAgICAgIHJlc3VsdC5wdXNoKChwb2ludCAmIDYzKSB8IDEyOClcbiAgICAgIGNvbnRpbnVlXG4gICAgfVxuXG4gICAgLy8gSW52YWxpZCBjaGFyYWN0ZXJcbiAgICByZXN1bHQucHVzaCgweEVGLCAweEJGLCAweEJEKVxuICB9XG5cbiAgcmV0dXJuIG5ldyBVaW50OEFycmF5KHJlc3VsdCkuYnVmZmVyXG59XG4iXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///(ssr)/./node_modules/encode-utf8/index.js\n");

/***/ })

};
;