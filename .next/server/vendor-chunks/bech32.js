"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
exports.id = "vendor-chunks/bech32";
exports.ids = ["vendor-chunks/bech32"];
exports.modules = {

/***/ "(ssr)/./node_modules/bech32/index.js":
/*!**************************************!*\
  !*** ./node_modules/bech32/index.js ***!
  \**************************************/
/***/ ((module) => {

eval("\nvar ALPHABET = 'qpzry9x8gf2tvdw0s3jn54khce6mua7l'\n\n// pre-compute lookup table\nvar ALPHABET_MAP = {}\nfor (var z = 0; z < ALPHABET.length; z++) {\n  var x = ALPHABET.charAt(z)\n\n  if (ALPHABET_MAP[x] !== undefined) throw new TypeError(x + ' is ambiguous')\n  ALPHABET_MAP[x] = z\n}\n\nfunction polymodStep (pre) {\n  var b = pre >> 25\n  return ((pre & 0x1FFFFFF) << 5) ^\n    (-((b >> 0) & 1) & 0x3b6a57b2) ^\n    (-((b >> 1) & 1) & 0x26508e6d) ^\n    (-((b >> 2) & 1) & 0x1ea119fa) ^\n    (-((b >> 3) & 1) & 0x3d4233dd) ^\n    (-((b >> 4) & 1) & 0x2a1462b3)\n}\n\nfunction prefixChk (prefix) {\n  var chk = 1\n  for (var i = 0; i < prefix.length; ++i) {\n    var c = prefix.charCodeAt(i)\n    if (c < 33 || c > 126) return 'Invalid prefix (' + prefix + ')'\n\n    chk = polymodStep(chk) ^ (c >> 5)\n  }\n  chk = polymodStep(chk)\n\n  for (i = 0; i < prefix.length; ++i) {\n    var v = prefix.charCodeAt(i)\n    chk = polymodStep(chk) ^ (v & 0x1f)\n  }\n  return chk\n}\n\nfunction encode (prefix, words, LIMIT) {\n  LIMIT = LIMIT || 90\n  if ((prefix.length + 7 + words.length) > LIMIT) throw new TypeError('Exceeds length limit')\n\n  prefix = prefix.toLowerCase()\n\n  // determine chk mod\n  var chk = prefixChk(prefix)\n  if (typeof chk === 'string') throw new Error(chk)\n\n  var result = prefix + '1'\n  for (var i = 0; i < words.length; ++i) {\n    var x = words[i]\n    if ((x >> 5) !== 0) throw new Error('Non 5-bit word')\n\n    chk = polymodStep(chk) ^ x\n    result += ALPHABET.charAt(x)\n  }\n\n  for (i = 0; i < 6; ++i) {\n    chk = polymodStep(chk)\n  }\n  chk ^= 1\n\n  for (i = 0; i < 6; ++i) {\n    var v = (chk >> ((5 - i) * 5)) & 0x1f\n    result += ALPHABET.charAt(v)\n  }\n\n  return result\n}\n\nfunction __decode (str, LIMIT) {\n  LIMIT = LIMIT || 90\n  if (str.length < 8) return str + ' too short'\n  if (str.length > LIMIT) return 'Exceeds length limit'\n\n  // don't allow mixed case\n  var lowered = str.toLowerCase()\n  var uppered = str.toUpperCase()\n  if (str !== lowered && str !== uppered) return 'Mixed-case string ' + str\n  str = lowered\n\n  var split = str.lastIndexOf('1')\n  if (split === -1) return 'No separator character for ' + str\n  if (split === 0) return 'Missing prefix for ' + str\n\n  var prefix = str.slice(0, split)\n  var wordChars = str.slice(split + 1)\n  if (wordChars.length < 6) return 'Data too short'\n\n  var chk = prefixChk(prefix)\n  if (typeof chk === 'string') return chk\n\n  var words = []\n  for (var i = 0; i < wordChars.length; ++i) {\n    var c = wordChars.charAt(i)\n    var v = ALPHABET_MAP[c]\n    if (v === undefined) return 'Unknown character ' + c\n    chk = polymodStep(chk) ^ v\n\n    // not in the checksum?\n    if (i + 6 >= wordChars.length) continue\n    words.push(v)\n  }\n\n  if (chk !== 1) return 'Invalid checksum for ' + str\n  return { prefix: prefix, words: words }\n}\n\nfunction decodeUnsafe () {\n  var res = __decode.apply(null, arguments)\n  if (typeof res === 'object') return res\n}\n\nfunction decode (str) {\n  var res = __decode.apply(null, arguments)\n  if (typeof res === 'object') return res\n\n  throw new Error(res)\n}\n\nfunction convert (data, inBits, outBits, pad) {\n  var value = 0\n  var bits = 0\n  var maxV = (1 << outBits) - 1\n\n  var result = []\n  for (var i = 0; i < data.length; ++i) {\n    value = (value << inBits) | data[i]\n    bits += inBits\n\n    while (bits >= outBits) {\n      bits -= outBits\n      result.push((value >> bits) & maxV)\n    }\n  }\n\n  if (pad) {\n    if (bits > 0) {\n      result.push((value << (outBits - bits)) & maxV)\n    }\n  } else {\n    if (bits >= inBits) return 'Excess padding'\n    if ((value << (outBits - bits)) & maxV) return 'Non-zero padding'\n  }\n\n  return result\n}\n\nfunction toWordsUnsafe (bytes) {\n  var res = convert(bytes, 8, 5, true)\n  if (Array.isArray(res)) return res\n}\n\nfunction toWords (bytes) {\n  var res = convert(bytes, 8, 5, true)\n  if (Array.isArray(res)) return res\n\n  throw new Error(res)\n}\n\nfunction fromWordsUnsafe (words) {\n  var res = convert(words, 5, 8, false)\n  if (Array.isArray(res)) return res\n}\n\nfunction fromWords (words) {\n  var res = convert(words, 5, 8, false)\n  if (Array.isArray(res)) return res\n\n  throw new Error(res)\n}\n\nmodule.exports = {\n  decodeUnsafe: decodeUnsafe,\n  decode: decode,\n  encode: encode,\n  toWordsUnsafe: toWordsUnsafe,\n  toWords: toWords,\n  fromWordsUnsafe: fromWordsUnsafe,\n  fromWords: fromWords\n}\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHNzcikvLi9ub2RlX21vZHVsZXMvYmVjaDMyL2luZGV4LmpzIiwibWFwcGluZ3MiOiJBQUFZO0FBQ1o7O0FBRUE7QUFDQTtBQUNBLGdCQUFnQixxQkFBcUI7QUFDckM7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0Esa0JBQWtCLG1CQUFtQjtBQUNyQztBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQSxjQUFjLG1CQUFtQjtBQUNqQztBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxrQkFBa0Isa0JBQWtCO0FBQ3BDO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBLGNBQWMsT0FBTztBQUNyQjtBQUNBO0FBQ0E7O0FBRUEsY0FBYyxPQUFPO0FBQ3JCO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0Esa0JBQWtCLHNCQUFzQjtBQUN4QztBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLFdBQVc7QUFDWDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLGtCQUFrQixpQkFBaUI7QUFDbkM7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsSUFBSTtBQUNKO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsInNvdXJjZXMiOlsid2VicGFjazovL3RpY2tldGluZ19zeXN0ZW0vLi9ub2RlX21vZHVsZXMvYmVjaDMyL2luZGV4LmpzPzFhNDAiXSwic291cmNlc0NvbnRlbnQiOlsiJ3VzZSBzdHJpY3QnXG52YXIgQUxQSEFCRVQgPSAncXB6cnk5eDhnZjJ0dmR3MHMzam41NGtoY2U2bXVhN2wnXG5cbi8vIHByZS1jb21wdXRlIGxvb2t1cCB0YWJsZVxudmFyIEFMUEhBQkVUX01BUCA9IHt9XG5mb3IgKHZhciB6ID0gMDsgeiA8IEFMUEhBQkVULmxlbmd0aDsgeisrKSB7XG4gIHZhciB4ID0gQUxQSEFCRVQuY2hhckF0KHopXG5cbiAgaWYgKEFMUEhBQkVUX01BUFt4XSAhPT0gdW5kZWZpbmVkKSB0aHJvdyBuZXcgVHlwZUVycm9yKHggKyAnIGlzIGFtYmlndW91cycpXG4gIEFMUEhBQkVUX01BUFt4XSA9IHpcbn1cblxuZnVuY3Rpb24gcG9seW1vZFN0ZXAgKHByZSkge1xuICB2YXIgYiA9IHByZSA+PiAyNVxuICByZXR1cm4gKChwcmUgJiAweDFGRkZGRkYpIDw8IDUpIF5cbiAgICAoLSgoYiA+PiAwKSAmIDEpICYgMHgzYjZhNTdiMikgXlxuICAgICgtKChiID4+IDEpICYgMSkgJiAweDI2NTA4ZTZkKSBeXG4gICAgKC0oKGIgPj4gMikgJiAxKSAmIDB4MWVhMTE5ZmEpIF5cbiAgICAoLSgoYiA+PiAzKSAmIDEpICYgMHgzZDQyMzNkZCkgXlxuICAgICgtKChiID4+IDQpICYgMSkgJiAweDJhMTQ2MmIzKVxufVxuXG5mdW5jdGlvbiBwcmVmaXhDaGsgKHByZWZpeCkge1xuICB2YXIgY2hrID0gMVxuICBmb3IgKHZhciBpID0gMDsgaSA8IHByZWZpeC5sZW5ndGg7ICsraSkge1xuICAgIHZhciBjID0gcHJlZml4LmNoYXJDb2RlQXQoaSlcbiAgICBpZiAoYyA8IDMzIHx8IGMgPiAxMjYpIHJldHVybiAnSW52YWxpZCBwcmVmaXggKCcgKyBwcmVmaXggKyAnKSdcblxuICAgIGNoayA9IHBvbHltb2RTdGVwKGNoaykgXiAoYyA+PiA1KVxuICB9XG4gIGNoayA9IHBvbHltb2RTdGVwKGNoaylcblxuICBmb3IgKGkgPSAwOyBpIDwgcHJlZml4Lmxlbmd0aDsgKytpKSB7XG4gICAgdmFyIHYgPSBwcmVmaXguY2hhckNvZGVBdChpKVxuICAgIGNoayA9IHBvbHltb2RTdGVwKGNoaykgXiAodiAmIDB4MWYpXG4gIH1cbiAgcmV0dXJuIGNoa1xufVxuXG5mdW5jdGlvbiBlbmNvZGUgKHByZWZpeCwgd29yZHMsIExJTUlUKSB7XG4gIExJTUlUID0gTElNSVQgfHwgOTBcbiAgaWYgKChwcmVmaXgubGVuZ3RoICsgNyArIHdvcmRzLmxlbmd0aCkgPiBMSU1JVCkgdGhyb3cgbmV3IFR5cGVFcnJvcignRXhjZWVkcyBsZW5ndGggbGltaXQnKVxuXG4gIHByZWZpeCA9IHByZWZpeC50b0xvd2VyQ2FzZSgpXG5cbiAgLy8gZGV0ZXJtaW5lIGNoayBtb2RcbiAgdmFyIGNoayA9IHByZWZpeENoayhwcmVmaXgpXG4gIGlmICh0eXBlb2YgY2hrID09PSAnc3RyaW5nJykgdGhyb3cgbmV3IEVycm9yKGNoaylcblxuICB2YXIgcmVzdWx0ID0gcHJlZml4ICsgJzEnXG4gIGZvciAodmFyIGkgPSAwOyBpIDwgd29yZHMubGVuZ3RoOyArK2kpIHtcbiAgICB2YXIgeCA9IHdvcmRzW2ldXG4gICAgaWYgKCh4ID4+IDUpICE9PSAwKSB0aHJvdyBuZXcgRXJyb3IoJ05vbiA1LWJpdCB3b3JkJylcblxuICAgIGNoayA9IHBvbHltb2RTdGVwKGNoaykgXiB4XG4gICAgcmVzdWx0ICs9IEFMUEhBQkVULmNoYXJBdCh4KVxuICB9XG5cbiAgZm9yIChpID0gMDsgaSA8IDY7ICsraSkge1xuICAgIGNoayA9IHBvbHltb2RTdGVwKGNoaylcbiAgfVxuICBjaGsgXj0gMVxuXG4gIGZvciAoaSA9IDA7IGkgPCA2OyArK2kpIHtcbiAgICB2YXIgdiA9IChjaGsgPj4gKCg1IC0gaSkgKiA1KSkgJiAweDFmXG4gICAgcmVzdWx0ICs9IEFMUEhBQkVULmNoYXJBdCh2KVxuICB9XG5cbiAgcmV0dXJuIHJlc3VsdFxufVxuXG5mdW5jdGlvbiBfX2RlY29kZSAoc3RyLCBMSU1JVCkge1xuICBMSU1JVCA9IExJTUlUIHx8IDkwXG4gIGlmIChzdHIubGVuZ3RoIDwgOCkgcmV0dXJuIHN0ciArICcgdG9vIHNob3J0J1xuICBpZiAoc3RyLmxlbmd0aCA+IExJTUlUKSByZXR1cm4gJ0V4Y2VlZHMgbGVuZ3RoIGxpbWl0J1xuXG4gIC8vIGRvbid0IGFsbG93IG1peGVkIGNhc2VcbiAgdmFyIGxvd2VyZWQgPSBzdHIudG9Mb3dlckNhc2UoKVxuICB2YXIgdXBwZXJlZCA9IHN0ci50b1VwcGVyQ2FzZSgpXG4gIGlmIChzdHIgIT09IGxvd2VyZWQgJiYgc3RyICE9PSB1cHBlcmVkKSByZXR1cm4gJ01peGVkLWNhc2Ugc3RyaW5nICcgKyBzdHJcbiAgc3RyID0gbG93ZXJlZFxuXG4gIHZhciBzcGxpdCA9IHN0ci5sYXN0SW5kZXhPZignMScpXG4gIGlmIChzcGxpdCA9PT0gLTEpIHJldHVybiAnTm8gc2VwYXJhdG9yIGNoYXJhY3RlciBmb3IgJyArIHN0clxuICBpZiAoc3BsaXQgPT09IDApIHJldHVybiAnTWlzc2luZyBwcmVmaXggZm9yICcgKyBzdHJcblxuICB2YXIgcHJlZml4ID0gc3RyLnNsaWNlKDAsIHNwbGl0KVxuICB2YXIgd29yZENoYXJzID0gc3RyLnNsaWNlKHNwbGl0ICsgMSlcbiAgaWYgKHdvcmRDaGFycy5sZW5ndGggPCA2KSByZXR1cm4gJ0RhdGEgdG9vIHNob3J0J1xuXG4gIHZhciBjaGsgPSBwcmVmaXhDaGsocHJlZml4KVxuICBpZiAodHlwZW9mIGNoayA9PT0gJ3N0cmluZycpIHJldHVybiBjaGtcblxuICB2YXIgd29yZHMgPSBbXVxuICBmb3IgKHZhciBpID0gMDsgaSA8IHdvcmRDaGFycy5sZW5ndGg7ICsraSkge1xuICAgIHZhciBjID0gd29yZENoYXJzLmNoYXJBdChpKVxuICAgIHZhciB2ID0gQUxQSEFCRVRfTUFQW2NdXG4gICAgaWYgKHYgPT09IHVuZGVmaW5lZCkgcmV0dXJuICdVbmtub3duIGNoYXJhY3RlciAnICsgY1xuICAgIGNoayA9IHBvbHltb2RTdGVwKGNoaykgXiB2XG5cbiAgICAvLyBub3QgaW4gdGhlIGNoZWNrc3VtP1xuICAgIGlmIChpICsgNiA+PSB3b3JkQ2hhcnMubGVuZ3RoKSBjb250aW51ZVxuICAgIHdvcmRzLnB1c2godilcbiAgfVxuXG4gIGlmIChjaGsgIT09IDEpIHJldHVybiAnSW52YWxpZCBjaGVja3N1bSBmb3IgJyArIHN0clxuICByZXR1cm4geyBwcmVmaXg6IHByZWZpeCwgd29yZHM6IHdvcmRzIH1cbn1cblxuZnVuY3Rpb24gZGVjb2RlVW5zYWZlICgpIHtcbiAgdmFyIHJlcyA9IF9fZGVjb2RlLmFwcGx5KG51bGwsIGFyZ3VtZW50cylcbiAgaWYgKHR5cGVvZiByZXMgPT09ICdvYmplY3QnKSByZXR1cm4gcmVzXG59XG5cbmZ1bmN0aW9uIGRlY29kZSAoc3RyKSB7XG4gIHZhciByZXMgPSBfX2RlY29kZS5hcHBseShudWxsLCBhcmd1bWVudHMpXG4gIGlmICh0eXBlb2YgcmVzID09PSAnb2JqZWN0JykgcmV0dXJuIHJlc1xuXG4gIHRocm93IG5ldyBFcnJvcihyZXMpXG59XG5cbmZ1bmN0aW9uIGNvbnZlcnQgKGRhdGEsIGluQml0cywgb3V0Qml0cywgcGFkKSB7XG4gIHZhciB2YWx1ZSA9IDBcbiAgdmFyIGJpdHMgPSAwXG4gIHZhciBtYXhWID0gKDEgPDwgb3V0Qml0cykgLSAxXG5cbiAgdmFyIHJlc3VsdCA9IFtdXG4gIGZvciAodmFyIGkgPSAwOyBpIDwgZGF0YS5sZW5ndGg7ICsraSkge1xuICAgIHZhbHVlID0gKHZhbHVlIDw8IGluQml0cykgfCBkYXRhW2ldXG4gICAgYml0cyArPSBpbkJpdHNcblxuICAgIHdoaWxlIChiaXRzID49IG91dEJpdHMpIHtcbiAgICAgIGJpdHMgLT0gb3V0Qml0c1xuICAgICAgcmVzdWx0LnB1c2goKHZhbHVlID4+IGJpdHMpICYgbWF4VilcbiAgICB9XG4gIH1cblxuICBpZiAocGFkKSB7XG4gICAgaWYgKGJpdHMgPiAwKSB7XG4gICAgICByZXN1bHQucHVzaCgodmFsdWUgPDwgKG91dEJpdHMgLSBiaXRzKSkgJiBtYXhWKVxuICAgIH1cbiAgfSBlbHNlIHtcbiAgICBpZiAoYml0cyA+PSBpbkJpdHMpIHJldHVybiAnRXhjZXNzIHBhZGRpbmcnXG4gICAgaWYgKCh2YWx1ZSA8PCAob3V0Qml0cyAtIGJpdHMpKSAmIG1heFYpIHJldHVybiAnTm9uLXplcm8gcGFkZGluZydcbiAgfVxuXG4gIHJldHVybiByZXN1bHRcbn1cblxuZnVuY3Rpb24gdG9Xb3Jkc1Vuc2FmZSAoYnl0ZXMpIHtcbiAgdmFyIHJlcyA9IGNvbnZlcnQoYnl0ZXMsIDgsIDUsIHRydWUpXG4gIGlmIChBcnJheS5pc0FycmF5KHJlcykpIHJldHVybiByZXNcbn1cblxuZnVuY3Rpb24gdG9Xb3JkcyAoYnl0ZXMpIHtcbiAgdmFyIHJlcyA9IGNvbnZlcnQoYnl0ZXMsIDgsIDUsIHRydWUpXG4gIGlmIChBcnJheS5pc0FycmF5KHJlcykpIHJldHVybiByZXNcblxuICB0aHJvdyBuZXcgRXJyb3IocmVzKVxufVxuXG5mdW5jdGlvbiBmcm9tV29yZHNVbnNhZmUgKHdvcmRzKSB7XG4gIHZhciByZXMgPSBjb252ZXJ0KHdvcmRzLCA1LCA4LCBmYWxzZSlcbiAgaWYgKEFycmF5LmlzQXJyYXkocmVzKSkgcmV0dXJuIHJlc1xufVxuXG5mdW5jdGlvbiBmcm9tV29yZHMgKHdvcmRzKSB7XG4gIHZhciByZXMgPSBjb252ZXJ0KHdvcmRzLCA1LCA4LCBmYWxzZSlcbiAgaWYgKEFycmF5LmlzQXJyYXkocmVzKSkgcmV0dXJuIHJlc1xuXG4gIHRocm93IG5ldyBFcnJvcihyZXMpXG59XG5cbm1vZHVsZS5leHBvcnRzID0ge1xuICBkZWNvZGVVbnNhZmU6IGRlY29kZVVuc2FmZSxcbiAgZGVjb2RlOiBkZWNvZGUsXG4gIGVuY29kZTogZW5jb2RlLFxuICB0b1dvcmRzVW5zYWZlOiB0b1dvcmRzVW5zYWZlLFxuICB0b1dvcmRzOiB0b1dvcmRzLFxuICBmcm9tV29yZHNVbnNhZmU6IGZyb21Xb3Jkc1Vuc2FmZSxcbiAgZnJvbVdvcmRzOiBmcm9tV29yZHNcbn1cbiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///(ssr)/./node_modules/bech32/index.js\n");

/***/ })

};
;