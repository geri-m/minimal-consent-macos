(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else {
		var a = factory();
		for(var i in a) (typeof exports === 'object' ? exports : root)[i] = a[i];
	}
})(window, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/js/contentscript.ts");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./node_modules/dateformat/lib/dateformat.js":
/*!***************************************************!*\
  !*** ./node_modules/dateformat/lib/dateformat.js ***!
  \***************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_RESULT__;/*
 * Date Format 1.2.3
 * (c) 2007-2009 Steven Levithan <stevenlevithan.com>
 * MIT license
 *
 * Includes enhancements by Scott Trenda <scott.trenda.net>
 * and Kris Kowal <cixar.com/~kris.kowal/>
 *
 * Accepts a date, a mask, or a date and a mask.
 * Returns a formatted version of the given date.
 * The date defaults to the current date/time.
 * The mask defaults to dateFormat.masks.default.
 */

(function(global) {
  'use strict';

  var dateFormat = (function() {
      var token = /d{1,4}|m{1,4}|yy(?:yy)?|([HhMsTt])\1?|[LloSZWN]|"[^"]*"|'[^']*'/g;
      var timezone = /\b(?:[PMCEA][SDP]T|(?:Pacific|Mountain|Central|Eastern|Atlantic) (?:Standard|Daylight|Prevailing) Time|(?:GMT|UTC)(?:[-+]\d{4})?)\b/g;
      var timezoneClip = /[^-+\dA-Z]/g;
  
      // Regexes and supporting functions are cached through closure
      return function (date, mask, utc, gmt) {
  
        // You can't provide utc if you skip other args (use the 'UTC:' mask prefix)
        if (arguments.length === 1 && kindOf(date) === 'string' && !/\d/.test(date)) {
          mask = date;
          date = undefined;
        }
  
        date = date || new Date;
  
        if(!(date instanceof Date)) {
          date = new Date(date);
        }
  
        if (isNaN(date)) {
          throw TypeError('Invalid date');
        }
  
        mask = String(dateFormat.masks[mask] || mask || dateFormat.masks['default']);
  
        // Allow setting the utc/gmt argument via the mask
        var maskSlice = mask.slice(0, 4);
        if (maskSlice === 'UTC:' || maskSlice === 'GMT:') {
          mask = mask.slice(4);
          utc = true;
          if (maskSlice === 'GMT:') {
            gmt = true;
          }
        }
  
        var _ = utc ? 'getUTC' : 'get';
        var d = date[_ + 'Date']();
        var D = date[_ + 'Day']();
        var m = date[_ + 'Month']();
        var y = date[_ + 'FullYear']();
        var H = date[_ + 'Hours']();
        var M = date[_ + 'Minutes']();
        var s = date[_ + 'Seconds']();
        var L = date[_ + 'Milliseconds']();
        var o = utc ? 0 : date.getTimezoneOffset();
        var W = getWeek(date);
        var N = getDayOfWeek(date);
        var flags = {
          d:    d,
          dd:   pad(d),
          ddd:  dateFormat.i18n.dayNames[D],
          dddd: dateFormat.i18n.dayNames[D + 7],
          m:    m + 1,
          mm:   pad(m + 1),
          mmm:  dateFormat.i18n.monthNames[m],
          mmmm: dateFormat.i18n.monthNames[m + 12],
          yy:   String(y).slice(2),
          yyyy: y,
          h:    H % 12 || 12,
          hh:   pad(H % 12 || 12),
          H:    H,
          HH:   pad(H),
          M:    M,
          MM:   pad(M),
          s:    s,
          ss:   pad(s),
          l:    pad(L, 3),
          L:    pad(Math.round(L / 10)),
          t:    H < 12 ? dateFormat.i18n.timeNames[0] : dateFormat.i18n.timeNames[1],
          tt:   H < 12 ? dateFormat.i18n.timeNames[2] : dateFormat.i18n.timeNames[3],
          T:    H < 12 ? dateFormat.i18n.timeNames[4] : dateFormat.i18n.timeNames[5],
          TT:   H < 12 ? dateFormat.i18n.timeNames[6] : dateFormat.i18n.timeNames[7],
          Z:    gmt ? 'GMT' : utc ? 'UTC' : (String(date).match(timezone) || ['']).pop().replace(timezoneClip, ''),
          o:    (o > 0 ? '-' : '+') + pad(Math.floor(Math.abs(o) / 60) * 100 + Math.abs(o) % 60, 4),
          S:    ['th', 'st', 'nd', 'rd'][d % 10 > 3 ? 0 : (d % 100 - d % 10 != 10) * d % 10],
          W:    W,
          N:    N
        };
  
        return mask.replace(token, function (match) {
          if (match in flags) {
            return flags[match];
          }
          return match.slice(1, match.length - 1);
        });
      };
    })();

  dateFormat.masks = {
    'default':               'ddd mmm dd yyyy HH:MM:ss',
    'shortDate':             'm/d/yy',
    'mediumDate':            'mmm d, yyyy',
    'longDate':              'mmmm d, yyyy',
    'fullDate':              'dddd, mmmm d, yyyy',
    'shortTime':             'h:MM TT',
    'mediumTime':            'h:MM:ss TT',
    'longTime':              'h:MM:ss TT Z',
    'isoDate':               'yyyy-mm-dd',
    'isoTime':               'HH:MM:ss',
    'isoDateTime':           'yyyy-mm-dd\'T\'HH:MM:sso',
    'isoUtcDateTime':        'UTC:yyyy-mm-dd\'T\'HH:MM:ss\'Z\'',
    'expiresHeaderFormat':   'ddd, dd mmm yyyy HH:MM:ss Z'
  };

  // Internationalization strings
  dateFormat.i18n = {
    dayNames: [
      'Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat',
      'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'
    ],
    monthNames: [
      'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec',
      'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'
    ],
    timeNames: [
      'a', 'p', 'am', 'pm', 'A', 'P', 'AM', 'PM'
    ]
  };

function pad(val, len) {
  val = String(val);
  len = len || 2;
  while (val.length < len) {
    val = '0' + val;
  }
  return val;
}

/**
 * Get the ISO 8601 week number
 * Based on comments from
 * http://techblog.procurios.nl/k/n618/news/view/33796/14863/Calculate-ISO-8601-week-and-year-in-javascript.html
 *
 * @param  {Object} `date`
 * @return {Number}
 */
function getWeek(date) {
  // Remove time components of date
  var targetThursday = new Date(date.getFullYear(), date.getMonth(), date.getDate());

  // Change date to Thursday same week
  targetThursday.setDate(targetThursday.getDate() - ((targetThursday.getDay() + 6) % 7) + 3);

  // Take January 4th as it is always in week 1 (see ISO 8601)
  var firstThursday = new Date(targetThursday.getFullYear(), 0, 4);

  // Change date to Thursday same week
  firstThursday.setDate(firstThursday.getDate() - ((firstThursday.getDay() + 6) % 7) + 3);

  // Check if daylight-saving-time-switch occurred and correct for it
  var ds = targetThursday.getTimezoneOffset() - firstThursday.getTimezoneOffset();
  targetThursday.setHours(targetThursday.getHours() - ds);

  // Number of weeks between target Thursday and first Thursday
  var weekDiff = (targetThursday - firstThursday) / (86400000*7);
  return 1 + Math.floor(weekDiff);
}

/**
 * Get ISO-8601 numeric representation of the day of the week
 * 1 (for Monday) through 7 (for Sunday)
 * 
 * @param  {Object} `date`
 * @return {Number}
 */
function getDayOfWeek(date) {
  var dow = date.getDay();
  if(dow === 0) {
    dow = 7;
  }
  return dow;
}

/**
 * kind-of shortcut
 * @param  {*} val
 * @return {String}
 */
function kindOf(val) {
  if (val === null) {
    return 'null';
  }

  if (val === undefined) {
    return 'undefined';
  }

  if (typeof val !== 'object') {
    return typeof val;
  }

  if (Array.isArray(val)) {
    return 'array';
  }

  return {}.toString.call(val)
    .slice(8, -1).toLowerCase();
};



  if (true) {
    !(__WEBPACK_AMD_DEFINE_RESULT__ = (function () {
      return dateFormat;
    }).call(exports, __webpack_require__, exports, module),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
  } else {}
})(this);


/***/ }),

/***/ "./src/js/BackendCall.ts":
/*!*******************************!*\
  !*** ./src/js/BackendCall.ts ***!
  \*******************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return BackendCall; });
/* harmony import */ var _Utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Utils */ "./src/js/Utils.ts");
/* harmony import */ var _entities_PingResult__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./entities/PingResult */ "./src/js/entities/PingResult.ts");
/* harmony import */ var _cmp_CmpType__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./cmp/CmpType */ "./src/js/cmp/CmpType.ts");




class BackendCall {
    constructor() {
        this._cmp = "na";
        this._cmpScriptUrl = "na";
        this._pingResult = {};
        this._implemented = false;
        // this is for the states.
        this._isSuccessfulBlock = false;
        this._isPingResultReceived = false;
        this._dataReceived = false;
    }
    static get pageName() {
        return BackendCall._fromPage;
    }
    /**
     * Setter for the Ping Result, if we find a CMP on the Page
     *
     * @param pingResult
     */
    set pingResult(pingResult) {
        _Utils__WEBPACK_IMPORTED_MODULE_0__["default"].log("Pingback in BackendCall set: " + pingResult);
        this._pingResult = _entities_PingResult__WEBPACK_IMPORTED_MODULE_1__["default"].class(pingResult);
        this._isPingResultReceived = true;
        // if the CMP was already clicked, do the backend call
        // we only do this call, if the CMP is _NOT_ implemented. If we the CMP is implemented, we wait for aresponse
        // from the JavaScript Detector.
        if (this._dataReceived) {
            if (this._implemented && this._isSuccessfulBlock) {
                _Utils__WEBPACK_IMPORTED_MODULE_0__["default"].log("We have an implemented for CMP and succesful Block happend. Sent Backend call");
                // check if there is a timeout and cancel if necessary.
                clearTimeout(this._timeoutForBackendCall);
                // trigger the call right now.
                this.triggerCall();
            }
            else if (this._implemented && !this._isSuccessfulBlock) {
                _Utils__WEBPACK_IMPORTED_MODULE_0__["default"].log("We have an implementation, but not yet a successful block. We don't do anything. successfulBloc() will handle");
            }
            else if (!this._implemented && this._isSuccessfulBlock) {
                _Utils__WEBPACK_IMPORTED_MODULE_0__["default"].log("This CMP is not yet implemented (or not yet set)");
            }
            else {
                _Utils__WEBPACK_IMPORTED_MODULE_0__["default"].log("There is no implementation and no successful Bock");
            }
        }
        else {
            _Utils__WEBPACK_IMPORTED_MODULE_0__["default"].log("We don't have a CMP Implementation yet, but already PingBack Data. For Saftey Reasons, we schedule backendcall");
            this._timeoutForBackendCall = setTimeout(this.triggerCall.bind(this), 5000);
        }
    }
    cmpData(cmpId, cmp, cmpScriptUrl, type, implemented) {
        _Utils__WEBPACK_IMPORTED_MODULE_0__["default"].log("Data set by CMP");
        this._cmpId = cmpId;
        this._cmp = cmp;
        this._cmpScriptUrl = cmpScriptUrl;
        this._type = type;
        this._implemented = implemented;
        this._dataReceived = true;
    }
    successfulBlock() {
        _Utils__WEBPACK_IMPORTED_MODULE_0__["default"].log("succefulblock in BackendCall");
        this._isSuccessfulBlock = true;
        if (this._isPingResultReceived) {
            _Utils__WEBPACK_IMPORTED_MODULE_0__["default"].log("Ping is here, successful bock too. Trigger BackendCall");
            // check if there is a timeout and cancel if necessary.
            clearTimeout(this._timeoutForBackendCall);
            // we have everything, trigger backend call
            this.triggerCall();
        }
        else {
            // Sending to Background Script
            switch (this._type) {
                case _cmp_CmpType__WEBPACK_IMPORTED_MODULE_2__["default"].WAIT_FOR_ASYNC_CALLBACK:
                    // if we wait for the callback, the backend call is done in the 'setPingResult';
                    // we already have click away the CMP so, wait for the pingresult and go.
                    _Utils__WEBPACK_IMPORTED_MODULE_0__["default"].log("We are waiting for the Website to send the PingResult");
                    break;
                case _cmp_CmpType__WEBPACK_IMPORTED_MODULE_2__["default"].WAIT_FOR_TIME_FRAME:
                    _Utils__WEBPACK_IMPORTED_MODULE_0__["default"].log("We are waiting five seconds to trigger the backend call");
                    clearTimeout(this._timeoutForBackendCall);
                    this._timeoutForBackendCall = setTimeout(this.triggerCall.bind(this), 5000);
                    break;
                case _cmp_CmpType__WEBPACK_IMPORTED_MODULE_2__["default"].DO_NOT_WAIT:
                    _Utils__WEBPACK_IMPORTED_MODULE_0__["default"].log("We Trigger the Backend Call right now");
                    clearTimeout(this._timeoutForBackendCall);
                    this.triggerCall();
                    break;
                default:
                    throw new Error("Unknown CMP Type");
            } // switch
        }
    }
    /**
     * Actual Method to trigger the backend call. Can be triggered from various functions
     */
    triggerCall() {
        _Utils__WEBPACK_IMPORTED_MODULE_0__["default"].log("Call now Triggered");
        // If the CMP-ID is not set in the Ping Result, put it there.
        if (typeof this._pingResult.cmpId === "undefined") {
            this._pingResult.cmpId = this._cmpId;
        }
        // we are sending separate components in 'sendMessage()' as in the BackendCall, we don't know the URL.
        // this class is part of the content-Script and has no access to the URL.
        if (typeof safari !== 'undefined') {
            _Utils__WEBPACK_IMPORTED_MODULE_0__["default"].log("+++ triggerCall on Safari +++");
            eval("safari.extension.dispatchMessage('someMessage', {cmp: this._cmp," +
                "cmpScriptUrl: this._cmpScriptUrl," +
                "pingResult: this._pingResult," +
                "implemented: this._implemented," +
                "from: BackendCall.pageName})");
        }
        else if (typeof chrome !== 'undefined') {
            _Utils__WEBPACK_IMPORTED_MODULE_0__["default"].log("+++ triggerCall on Chrome +++");
            chrome.runtime.sendMessage({
                cmp: this._cmp,
                cmpScripUrl: this._cmpScriptUrl,
                pingResult: this._pingResult,
                implemented: this._implemented,
                from: BackendCall.pageName
            });
        }
        else {
            _Utils__WEBPACK_IMPORTED_MODULE_0__["default"].log("+++ triggerCall on some other Platform +++");
        }
    }
}
BackendCall._fromPage = "backendCall";


/***/ }),

/***/ "./src/js/Detector.ts":
/*!****************************!*\
  !*** ./src/js/Detector.ts ***!
  \****************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Detector; });
/* harmony import */ var _Utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Utils */ "./src/js/Utils.ts");
/* harmony import */ var _cmp_TrustArcIFrame__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./cmp/TrustArcIFrame */ "./src/js/cmp/TrustArcIFrame.ts");
/* harmony import */ var _cmp_TrustArcBanner__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./cmp/TrustArcBanner */ "./src/js/cmp/TrustArcBanner.ts");
/* harmony import */ var _cmp_Evidon__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./cmp/Evidon */ "./src/js/cmp/Evidon.ts");
/* harmony import */ var _cmp_CustomImpl__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./cmp/CustomImpl */ "./src/js/cmp/CustomImpl.ts");
/* harmony import */ var _cmp_OneTrust__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./cmp/OneTrust */ "./src/js/cmp/OneTrust.ts");
/* harmony import */ var _cmp_CookieBot__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./cmp/CookieBot */ "./src/js/cmp/CookieBot.ts");
/* harmony import */ var _cmp_UserCentrics__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./cmp/UserCentrics */ "./src/js/cmp/UserCentrics.ts");
/* harmony import */ var _cmp_QuantCast__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./cmp/QuantCast */ "./src/js/cmp/QuantCast.ts");
/* harmony import */ var _cmp_Traffective__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./cmp/Traffective */ "./src/js/cmp/Traffective.ts");
/* harmony import */ var _cmp_ConsentManager__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./cmp/ConsentManager */ "./src/js/cmp/ConsentManager.ts");
/* harmony import */ var _cmp_NoYetImplementedCmp__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./cmp/NoYetImplementedCmp */ "./src/js/cmp/NoYetImplementedCmp.ts");
/* harmony import */ var _BackendCall__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./BackendCall */ "./src/js/BackendCall.ts");
/* harmony import */ var _cmp_Chandago__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ./cmp/Chandago */ "./src/js/cmp/Chandago.ts");
/* harmony import */ var _cmp_OathCmp__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ./cmp/OathCmp */ "./src/js/cmp/OathCmp.ts");
/* harmony import */ var _cmp_SourcePoint__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ./cmp/SourcePoint */ "./src/js/cmp/SourcePoint.ts");
/* harmony import */ var _cmp_DiDoMi__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! ./cmp/DiDoMi */ "./src/js/cmp/DiDoMi.ts");
/* harmony import */ var _cmp_Borlabs__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! ./cmp/Borlabs */ "./src/js/cmp/Borlabs.ts");



















// this is some static stuff for the long tail.
const buttons = {
    'a#hs-eu-decline-button': "npmjs.com",
    "a#cookie_action_close_header": "tealium.com",
    "button#gdpr-banner-accept": "ebay.com & ebay-kleinanzeigen.com",
    "button#acceptAllButton": "PayPal",
    "span#cmpwelcomebtnno": "Wordpress Plugin https://www.tektutorialshub.com/",
    "a.cmpboxbtnno": "Wordpress Plugin www.mykong.com",
    "p._brlbs-refuse-btn": "Wordpress Plugin https://www.staubsauger-berater.de/ (Borlabs)"
};
// we need to keep load a little a possible.
const config = { attributes: false, childList: true, subtree: false };
class Detector {
    constructor(document, inIframe) {
        this._document = document;
        this._backendCall = new _BackendCall__WEBPACK_IMPORTED_MODULE_12__["default"]();
        this._inIFrame = inIframe;
        this._callBackCounter = 0;
    }
    set pingResult(pingResult) {
        this._backendCall.pingResult = pingResult;
    }
    /**
     * Connection to the Observer is outsourced out of the Constructor in order to have the Object initialized first.
     * Only after that the observer can be registered in a save way.
     */
    connectObserver() {
        this.handleCMP(true);
        // Options for the observer (which mutations to observe)
        let self = this;
        this._observerForScriptSource = new MutationObserver(function (mutations) {
            self.handleCmpImmediately(mutations, self);
        });
        // Select the node that will be observed for mutations
        this._observerForScriptSource.observe(this._document.body, config);
    }
    disconnectObserver() {
        _Utils__WEBPACK_IMPORTED_MODULE_0__["default"].log("Disconnect from Observer");
        this._observerForScriptSource.disconnect();
    }
    handleCmpImmediately(mutations, _self) {
        mutations.forEach(function (mutation) {
            // console.log(mutation.addedNodes);
            mutation.addedNodes.forEach(function (value, key, parent) {
                if (value.nodeName.toLowerCase().includes("script")) {
                    setTimeout(function () {
                        _self.handleCMP(false);
                    }, 25);
                }
            });
        });
    }
    handleCMP(firstTime) {
        _Utils__WEBPACK_IMPORTED_MODULE_0__["default"].log("enter");
        this._callBackCounter++;
        let allScriptTags = document.querySelectorAll("script");
        let scriptCounter;
        if (this._cmp) {
            _Utils__WEBPACK_IMPORTED_MODULE_0__["default"].log("CMP Defined (we should never end up here, as the observer will disconnect, if this._cmp is set");
            return;
        }
        let start = new Date().getMilliseconds();
        _Utils__WEBPACK_IMPORTED_MODULE_0__["default"].log("scripts: " + allScriptTags.length);
        // some CMPs run in iFrames and therefore require different handling.
        if (this._inIFrame) {
            _Utils__WEBPACK_IMPORTED_MODULE_0__["default"].log("iFrame Scr: " + document.location.toString());
            if (document.location.toString().includes("sp-prod.net") || document.location.toString().includes("sourcepoint.mgr.consensu.org")) {
                _Utils__WEBPACK_IMPORTED_MODULE_0__["default"].log("SP: " + document.location.toString());
                this._cmp = new _cmp_SourcePoint__WEBPACK_IMPORTED_MODULE_15__["default"](this._document, document.location.toString(), this._backendCall);
            }
            else if (document.location.toString().includes("trustarc.com")) {
                this._cmp = new _cmp_TrustArcIFrame__WEBPACK_IMPORTED_MODULE_1__["default"](this._document, document.location.toString(), this._backendCall);
            }
            else if (document.location.toString().includes("/cmpui.html") && document.location.toString().includes("consent")) {
                this._cmp = new _cmp_OathCmp__WEBPACK_IMPORTED_MODULE_14__["default"](this._document, document.location.toString(), this._backendCall);
            }
            else {
                // not found.
            }
        }
        // Not in IFrame.
        else {
            // this is the jump point we required for the nested loop
            allScripts: for (scriptCounter = 0; scriptCounter < allScriptTags.length; scriptCounter++) {
                let urlOfScript = allScriptTags[scriptCounter].getAttribute("src");
                if (urlOfScript && typeof urlOfScript !== 'undefined') {
                    // if the script defined, make it lowercase.
                    urlOfScript = urlOfScript.toLowerCase();
                    // Utils.log(urlOfScript);
                    if (urlOfScript.includes('truste.com') || urlOfScript.includes('trustarc.com') || urlOfScript.includes('trustarc.mgr.consensu.org')) {
                        this._cmp = new _cmp_TrustArcBanner__WEBPACK_IMPORTED_MODULE_2__["default"](this._document, urlOfScript, this._backendCall);
                        break;
                    }
                    else if (urlOfScript.includes('evidon.com') || urlOfScript.includes("evidon.mgr.consensu.org")) {
                        this._cmp = new _cmp_Evidon__WEBPACK_IMPORTED_MODULE_3__["default"](this._document, urlOfScript, this._backendCall);
                        break;
                    }
                    else if (urlOfScript.includes('cookielaw.org') || urlOfScript.includes('cookiepro.com') || urlOfScript.includes('onetrust.mgr.consensu.org') || urlOfScript.includes('optanon')) {
                        this._cmp = new _cmp_OneTrust__WEBPACK_IMPORTED_MODULE_5__["default"](this._document, urlOfScript, this._backendCall);
                        break;
                    }
                    else if (urlOfScript.includes('cookiebot.com') || urlOfScript.includes("cookiebot.mgr.consensu.org")) {
                        this._cmp = new _cmp_CookieBot__WEBPACK_IMPORTED_MODULE_6__["default"](this._document, urlOfScript, this._backendCall);
                        break;
                    }
                    else if (urlOfScript.includes('usercentrics.eu') || urlOfScript.includes('usercentrics.mgr.consensu.org')) {
                        this._cmp = new _cmp_UserCentrics__WEBPACK_IMPORTED_MODULE_7__["default"](this._document, urlOfScript, this._backendCall);
                        break;
                    }
                    else if (urlOfScript.includes('quantcast.com') || urlOfScript.includes("quantcast.mgr.consensu.org")) {
                        this._cmp = new _cmp_QuantCast__WEBPACK_IMPORTED_MODULE_8__["default"](this._document, urlOfScript, this._backendCall);
                        break;
                    }
                    else if (urlOfScript.includes('traffective.com') || urlOfScript.includes('traffective.mgr.consensu.org') || urlOfScript.includes('cdntrf.com')) {
                        this._cmp = new _cmp_Traffective__WEBPACK_IMPORTED_MODULE_9__["default"](this._document, urlOfScript, this._backendCall);
                        break;
                    }
                    else if (urlOfScript.includes('consentmanager.mgr.consensu.org')) {
                        this._cmp = new _cmp_ConsentManager__WEBPACK_IMPORTED_MODULE_10__["default"](this._document, urlOfScript, this._backendCall);
                        break;
                    }
                    else if (urlOfScript.includes('chandago.com') || urlOfScript.includes('appconsent.mgr.consensu.org') || urlOfScript.includes('appconsent.io')) {
                        this._cmp = new _cmp_Chandago__WEBPACK_IMPORTED_MODULE_13__["default"](this._document, urlOfScript, this._backendCall);
                        break;
                    }
                    else if (urlOfScript.includes('didomi.io') || urlOfScript.includes('didomi.mgr.consensu.org') || urlOfScript.includes('privacy-center.org')) {
                        this._cmp = new _cmp_DiDoMi__WEBPACK_IMPORTED_MODULE_16__["default"](this._document, urlOfScript, this._backendCall);
                        break;
                    }
                    else if (document.documentElement.innerHTML.includes("borlabs-cookie")) {
                        this._cmp = new _cmp_Borlabs__WEBPACK_IMPORTED_MODULE_17__["default"](this._document, urlOfScript, this._backendCall);
                        break;
                    }
                    /* ATTENTION - THIS IS GENERATED CODE FROM THE EXECL SHEET */
                    else if (urlOfScript.includes('faktor.io') || urlOfScript.includes('faktor.mgr.consensu.org') || urlOfScript.includes('liveramp.com')) {
                        this._cmp = new _cmp_NoYetImplementedCmp__WEBPACK_IMPORTED_MODULE_11__["default"](3, this._document, 'Faktor BV', urlOfScript, this._backendCall);
                        break;
                    }
                    else if (urlOfScript.includes('baycloud.com') || urlOfScript.includes('consenthub.mgr.consensu.org')) {
                        this._cmp = new _cmp_NoYetImplementedCmp__WEBPACK_IMPORTED_MODULE_11__["default"](8, this._document, 'Baycloud Systems Limited', urlOfScript, this._backendCall);
                        break;
                    }
                    else if (urlOfScript.includes('getadmiral.com') || urlOfScript.includes('admiral.mgr.consensu.org')) {
                        this._cmp = new _cmp_NoYetImplementedCmp__WEBPACK_IMPORTED_MODULE_11__["default"](9, this._document, 'Admiral', urlOfScript, this._backendCall);
                        break;
                    }
                    else if (urlOfScript.includes('sovrn.com') || urlOfScript.includes('sovrn.mgr.consensu.org')) {
                        this._cmp = new _cmp_NoYetImplementedCmp__WEBPACK_IMPORTED_MODULE_11__["default"](11, this._document, 'Sovrn Holdings Ince', urlOfScript, this._backendCall);
                        break;
                    }
                    else if (urlOfScript.includes('digitru.st') || urlOfScript.includes('digitrust.mgr.consensu.org')) {
                        this._cmp = new _cmp_NoYetImplementedCmp__WEBPACK_IMPORTED_MODULE_11__["default"](15, this._document, 'Cookie Trust Working Group, Inc.', urlOfScript, this._backendCall);
                        break;
                    }
                    else if (urlOfScript.includes('skimlinks.com') || urlOfScript.includes('skimlinks.mgr.consensu.org')) {
                        this._cmp = new _cmp_NoYetImplementedCmp__WEBPACK_IMPORTED_MODULE_11__["default"](20, this._document, 'Skimbit Ltd', urlOfScript, this._backendCall);
                        break;
                    }
                    else if (urlOfScript.includes('conversantmedia.eu') || urlOfScript.includes('conversant.mgr.consensu.org')) {
                        this._cmp = new _cmp_NoYetImplementedCmp__WEBPACK_IMPORTED_MODULE_11__["default"](23, this._document, 'Conversant Europe Ltd.', urlOfScript, this._backendCall);
                        break;
                    }
                    else if (urlOfScript.includes('sharethis.com') || urlOfScript.includes('sharethis.mgr.consensu.org')) {
                        this._cmp = new _cmp_NoYetImplementedCmp__WEBPACK_IMPORTED_MODULE_11__["default"](25, this._document, 'ShareThis, Inc.', urlOfScript, this._backendCall);
                        break;
                    }
                    else if (urlOfScript.includes('dmgmedia.co.uk') || urlOfScript.includes('dmgmedia.mgr.consensu.org')) {
                        this._cmp = new _cmp_NoYetImplementedCmp__WEBPACK_IMPORTED_MODULE_11__["default"](27, this._document, 'Associated Newspapers Ltd', urlOfScript, this._backendCall);
                        break;
                    }
                    else if (urlOfScript.includes('captify.co.uk') || urlOfScript.includes('captify.mgr.consensu.org')) {
                        this._cmp = new _cmp_NoYetImplementedCmp__WEBPACK_IMPORTED_MODULE_11__["default"](29, this._document, 'Captify Technologies Limited', urlOfScript, this._backendCall);
                        break;
                    }
                    else if (urlOfScript.includes('richaudience.com') || urlOfScript.includes('richaudience.mgr.consensu.org')) {
                        this._cmp = new _cmp_NoYetImplementedCmp__WEBPACK_IMPORTED_MODULE_11__["default"](30, this._document, 'Rich Audience International SL', urlOfScript, this._backendCall);
                        break;
                    }
                    else if (urlOfScript.includes('system1.com') || urlOfScript.includes('system1.mgr.consensu.org')) {
                        this._cmp = new _cmp_NoYetImplementedCmp__WEBPACK_IMPORTED_MODULE_11__["default"](38, this._document, 'System1 LLC', urlOfScript, this._backendCall);
                        break;
                    }
                    else if (urlOfScript.includes('sortable.com') || urlOfScript.includes('sortable.mgr.consensu.org')) {
                        this._cmp = new _cmp_NoYetImplementedCmp__WEBPACK_IMPORTED_MODULE_11__["default"](39, this._document, 'Snapsort Inc., operating as Sortable', urlOfScript, this._backendCall);
                        break;
                    }
                    else if (urlOfScript.includes('netsprint.group') || urlOfScript.includes('netsprintgroup.mgr.consensu.org')) {
                        this._cmp = new _cmp_NoYetImplementedCmp__WEBPACK_IMPORTED_MODULE_11__["default"](41, this._document, 'Grupa Netsprint Sp z o.o.', urlOfScript, this._backendCall);
                        break;
                    }
                    else if (urlOfScript.includes('madvertise.com') || urlOfScript.includes('madvertise.mgr.consensu.org')) {
                        this._cmp = new _cmp_NoYetImplementedCmp__WEBPACK_IMPORTED_MODULE_11__["default"](44, this._document, 'Madvertise Media', urlOfScript, this._backendCall);
                        break;
                    }
                    else if (urlOfScript.includes('ogury.com') || urlOfScript.includes('ogury.mgr.consensu.org')) {
                        this._cmp = new _cmp_NoYetImplementedCmp__WEBPACK_IMPORTED_MODULE_11__["default"](45, this._document, 'Ogury Ltd', urlOfScript, this._backendCall);
                        break;
                    }
                    else if (urlOfScript.includes('mediavine.com') || urlOfScript.includes('mediavine.mgr.consensu.org')) {
                        this._cmp = new _cmp_NoYetImplementedCmp__WEBPACK_IMPORTED_MODULE_11__["default"](46, this._document, 'Mediavine, Inc.', urlOfScript, this._backendCall);
                        break;
                    }
                    else if (urlOfScript.includes('trustarc.com') || urlOfScript.includes('trustarc.mgr.consensu.org')) {
                        this._cmp = new _cmp_NoYetImplementedCmp__WEBPACK_IMPORTED_MODULE_11__["default"](47, this._document, 'TrustArc Inc', urlOfScript, this._backendCall);
                        break;
                    }
                    else if (urlOfScript.includes('sanoma.com') || urlOfScript.includes('smf.mgr.consensu.org')) {
                        this._cmp = new _cmp_NoYetImplementedCmp__WEBPACK_IMPORTED_MODULE_11__["default"](49, this._document, 'Sanoma Media Finland Oy', urlOfScript, this._backendCall);
                        break;
                    }
                    else if (urlOfScript.includes('etarget.eu') || urlOfScript.includes('etarget.mgr.consensu.org')) {
                        this._cmp = new _cmp_NoYetImplementedCmp__WEBPACK_IMPORTED_MODULE_11__["default"](50, this._document, 'ETARGET SE', urlOfScript, this._backendCall);
                        break;
                    }
                    else if (urlOfScript.includes('adroll.com') || urlOfScript.includes('adroll.mgr.consensu.org')) {
                        this._cmp = new _cmp_NoYetImplementedCmp__WEBPACK_IMPORTED_MODULE_11__["default"](54, this._document, 'AdRoll, Inc', urlOfScript, this._backendCall);
                        break;
                    }
                    else if (urlOfScript.includes('triboo.com') || urlOfScript.includes('triboo.mgr.consensu.org')) {
                        this._cmp = new _cmp_NoYetImplementedCmp__WEBPACK_IMPORTED_MODULE_11__["default"](55, this._document, 'Triboo Media SRL', urlOfScript, this._backendCall);
                        break;
                    }
                    else if (urlOfScript.includes('webedia-group.com') || urlOfScript.includes('webedia.mgr.consensu.org')) {
                        this._cmp = new _cmp_NoYetImplementedCmp__WEBPACK_IMPORTED_MODULE_11__["default"](57, this._document, 'WEBEDIA', urlOfScript, this._backendCall);
                        break;
                    }
                    else if (urlOfScript.includes('ciaopeople.it') || urlOfScript.includes('ciaopeople.mgr.consensu.org')) {
                        this._cmp = new _cmp_NoYetImplementedCmp__WEBPACK_IMPORTED_MODULE_11__["default"](58, this._document, 'Ciao people s.r.l.', urlOfScript, this._backendCall);
                        break;
                    }
                    else if (urlOfScript.includes('deezer.com') || urlOfScript.includes('deezer.mgr.consensu.org')) {
                        this._cmp = new _cmp_NoYetImplementedCmp__WEBPACK_IMPORTED_MODULE_11__["default"](59, this._document, 'Deezer', urlOfScript, this._backendCall);
                        break;
                    }
                    else if (urlOfScript.includes('spolecznosci.pl') || urlOfScript.includes('spolecznosci.mgr.consensu.org')) {
                        this._cmp = new _cmp_NoYetImplementedCmp__WEBPACK_IMPORTED_MODULE_11__["default"](61, this._document, 'Spolecznosci Sp. z o.o. Sp.k.', urlOfScript, this._backendCall);
                        break;
                    }
                    else if (urlOfScript.includes('gumtree.com') || urlOfScript.includes('gumtreecom.mgr.consensu.org')) {
                        this._cmp = new _cmp_NoYetImplementedCmp__WEBPACK_IMPORTED_MODULE_11__["default"](62, this._document, 'Gumtree.com Ltd', urlOfScript, this._backendCall);
                        break;
                    }
                    else if (urlOfScript.includes('gdpr.clickio.com') || urlOfScript.includes('clickio.mgr.consensu.org')) {
                        this._cmp = new _cmp_NoYetImplementedCmp__WEBPACK_IMPORTED_MODULE_11__["default"](63, this._document, 'ALZ Software Ltd (trading as Clickio)', urlOfScript, this._backendCall);
                        break;
                    }
                    else if (urlOfScript.includes('onetag.net') || urlOfScript.includes('onetag.mgr.consensu.org')) {
                        this._cmp = new _cmp_NoYetImplementedCmp__WEBPACK_IMPORTED_MODULE_11__["default"](65, this._document, 'OneTag Ltd', urlOfScript, this._backendCall);
                        break;
                    }
                    else if (urlOfScript.includes('uniconsent.com') || urlOfScript.includes('uniconsent.mgr.consensu.org')) {
                        this._cmp = new _cmp_NoYetImplementedCmp__WEBPACK_IMPORTED_MODULE_11__["default"](68, this._document, 'Transfon Ltd', urlOfScript, this._backendCall);
                        break;
                    }
                    else if (urlOfScript.includes('gremimedia.pl') || urlOfScript.includes('gmcmp.mgr.consensu.org')) {
                        this._cmp = new _cmp_NoYetImplementedCmp__WEBPACK_IMPORTED_MODULE_11__["default"](69, this._document, 'Gremi Media SA', urlOfScript, this._backendCall);
                        break;
                    }
                    else if (urlOfScript.includes('wp.pl') || urlOfScript.includes('wpm.mgr.consensu.org')) {
                        this._cmp = new _cmp_NoYetImplementedCmp__WEBPACK_IMPORTED_MODULE_11__["default"](72, this._document, 'Wirtualna Polska Media S.A.', urlOfScript, this._backendCall);
                        break;
                    }
                    else if (urlOfScript.includes('relevant.fi') || urlOfScript.includes('relevant.mgr.consensu.org')) {
                        this._cmp = new _cmp_NoYetImplementedCmp__WEBPACK_IMPORTED_MODULE_11__["default"](74, this._document, 'Relevant Digital Oy', urlOfScript, this._backendCall);
                        break;
                    }
                    else if (urlOfScript.includes('vectaury.io') || urlOfScript.includes('vectaury.mgr.consensu.org')) {
                        this._cmp = new _cmp_NoYetImplementedCmp__WEBPACK_IMPORTED_MODULE_11__["default"](75, this._document, 'VECTAURY', urlOfScript, this._backendCall);
                        break;
                    }
                    else if (urlOfScript.includes('sibboventures.com') || urlOfScript.includes('sibboventures.mgr.consensu.org')) {
                        this._cmp = new _cmp_NoYetImplementedCmp__WEBPACK_IMPORTED_MODULE_11__["default"](76, this._document, 'SIBBO VENTURES SLU', urlOfScript, this._backendCall);
                        break;
                    }
                    else if (urlOfScript.includes('admetricspro.com') || urlOfScript.includes('cmp.mgr.consensu.org')) {
                        this._cmp = new _cmp_NoYetImplementedCmp__WEBPACK_IMPORTED_MODULE_11__["default"](77, this._document, 'Teaching Aids, LLC', urlOfScript, this._backendCall);
                        break;
                    }
                    else if (urlOfScript.includes('sfr.fr') || urlOfScript.includes('sfr.mgr.consensu.org')) {
                        this._cmp = new _cmp_NoYetImplementedCmp__WEBPACK_IMPORTED_MODULE_11__["default"](79, this._document, 'SFR', urlOfScript, this._backendCall);
                        break;
                    }
                    else if (urlOfScript.includes('oil.axelspringer.com') || urlOfScript.includes('oil.mgr.consensu.org')) {
                        this._cmp = new _cmp_NoYetImplementedCmp__WEBPACK_IMPORTED_MODULE_11__["default"](80, this._document, 'Axel Springer SE', urlOfScript, this._backendCall);
                        break;
                    }
                    else if (urlOfScript.includes('adtechfactory.com') || urlOfScript.includes('atf.mgr.consensu.org')) {
                        this._cmp = new _cmp_NoYetImplementedCmp__WEBPACK_IMPORTED_MODULE_11__["default"](82, this._document, 'AdTech Factory GmbH & Co. KG', urlOfScript, this._backendCall);
                        break;
                    }
                    else if (urlOfScript.includes('almamedia.fi') || urlOfScript.includes('almamedia.mgr.consensu.org')) {
                        this._cmp = new _cmp_NoYetImplementedCmp__WEBPACK_IMPORTED_MODULE_11__["default"](84, this._document, 'Alma Media', urlOfScript, this._backendCall);
                        break;
                    }
                    else if (urlOfScript.includes('ouest-france.fr') || urlOfScript.includes('sipaof.mgr.consensu.org')) {
                        this._cmp = new _cmp_NoYetImplementedCmp__WEBPACK_IMPORTED_MODULE_11__["default"](85, this._document, 'SIPA', urlOfScript, this._backendCall);
                        break;
                    }
                    else if (urlOfScript.includes('nouw.com') || urlOfScript.includes('nouw.mgr.consensu.org')) {
                        this._cmp = new _cmp_NoYetImplementedCmp__WEBPACK_IMPORTED_MODULE_11__["default"](86, this._document, 'Nouw Media AB', urlOfScript, this._backendCall);
                        break;
                    }
                    else if (urlOfScript.includes('commandersact.com') || urlOfScript.includes('commandersact.mgr.consensu.org')) {
                        this._cmp = new _cmp_NoYetImplementedCmp__WEBPACK_IMPORTED_MODULE_11__["default"](90, this._document, 'Commanders Act', urlOfScript, this._backendCall);
                        break;
                    }
                    else if (urlOfScript.includes('sirdata.com') || urlOfScript.includes('sddan.mgr.consensu.org')) {
                        this._cmp = new _cmp_NoYetImplementedCmp__WEBPACK_IMPORTED_MODULE_11__["default"](92, this._document, 'SIRDATA', urlOfScript, this._backendCall);
                        break;
                    }
                    else if (urlOfScript.includes('shinystat.com') || urlOfScript.includes('shinystat.mgr.consensu.org')) {
                        this._cmp = new _cmp_NoYetImplementedCmp__WEBPACK_IMPORTED_MODULE_11__["default"](96, this._document, 'Triboo Data Analytics', urlOfScript, this._backendCall);
                        break;
                    }
                    else if (urlOfScript.includes('offremedia.com') || urlOfScript.includes('cambiummedia.mgr.consensu.org')) {
                        this._cmp = new _cmp_NoYetImplementedCmp__WEBPACK_IMPORTED_MODULE_11__["default"](100, this._document, 'Cambium Media', urlOfScript, this._backendCall);
                        break;
                    }
                    else if (urlOfScript.includes('gemius.com') || urlOfScript.includes('gemius.mgr.consensu.org')) {
                        this._cmp = new _cmp_NoYetImplementedCmp__WEBPACK_IMPORTED_MODULE_11__["default"](104, this._document, 'Gemius SA', urlOfScript, this._backendCall);
                        break;
                    }
                    else if (urlOfScript.includes('dailymotion.com') || urlOfScript.includes('dailymotion.mgr.consensu.org')) {
                        this._cmp = new _cmp_NoYetImplementedCmp__WEBPACK_IMPORTED_MODULE_11__["default"](105, this._document, 'DAILYMOTION SA', urlOfScript, this._backendCall);
                        break;
                    }
                    else if (urlOfScript.includes('theguardian.com') || urlOfScript.includes('gnm.mgr.consensu.org')) {
                        this._cmp = new _cmp_NoYetImplementedCmp__WEBPACK_IMPORTED_MODULE_11__["default"](112, this._document, 'Guardian News and Media', urlOfScript, this._backendCall);
                        break;
                    }
                    else if (urlOfScript.includes('ultimate-guitar.com') || urlOfScript.includes('musiciansaudience.mgr.consensu.org')) {
                        this._cmp = new _cmp_NoYetImplementedCmp__WEBPACK_IMPORTED_MODULE_11__["default"](113, this._document, 'Grand Play Media, LLC', urlOfScript, this._backendCall);
                        break;
                    }
                    else if (urlOfScript.includes('adversal.com') || urlOfScript.includes('adversal.mgr.consensu.org')) {
                        this._cmp = new _cmp_NoYetImplementedCmp__WEBPACK_IMPORTED_MODULE_11__["default"](114, this._document, 'Adversal Media, Inc.', urlOfScript, this._backendCall);
                        break;
                    }
                    else if (urlOfScript.includes('a-lehdet.fi') || urlOfScript.includes('a-lehdet.mgr.consensu.org')) {
                        this._cmp = new _cmp_NoYetImplementedCmp__WEBPACK_IMPORTED_MODULE_11__["default"](115, this._document, 'A-lehdet Oy', urlOfScript, this._backendCall);
                        break;
                    }
                    else if (urlOfScript.includes('curiositymedia.com') || urlOfScript.includes('curiositymedia.mgr.consensu.org')) {
                        this._cmp = new _cmp_NoYetImplementedCmp__WEBPACK_IMPORTED_MODULE_11__["default"](119, this._document, 'Curiosity Media, Inc.', urlOfScript, this._backendCall);
                        break;
                    }
                    else if (urlOfScript.includes('webfinancialgroup.com') || urlOfScript.includes('vortex.mgr.consensu.org')) {
                        this._cmp = new _cmp_NoYetImplementedCmp__WEBPACK_IMPORTED_MODULE_11__["default"](122, this._document, 'Web Financial Group S.A./Vortex', urlOfScript, this._backendCall);
                        break;
                    }
                    else if (urlOfScript.includes('iubenda.com') || urlOfScript.includes('iubenda.mgr.consensu.org')) {
                        this._cmp = new _cmp_NoYetImplementedCmp__WEBPACK_IMPORTED_MODULE_11__["default"](123, this._document, 'iubenda', urlOfScript, this._backendCall);
                        break;
                    }
                    else if (urlOfScript.includes('liqwid.com') || urlOfScript.includes('liqwid.mgr.consensu.org')) {
                        this._cmp = new _cmp_NoYetImplementedCmp__WEBPACK_IMPORTED_MODULE_11__["default"](124, this._document, 'LIQWID', urlOfScript, this._backendCall);
                        break;
                    } /*else if (urlOfScript.includes('ebay.com') || urlOfScript.includes('ebay.mgr.consensu.org')) {
                        this._cmp = new NotYetImplementedCmp(125, this._document, 'eBay Inc', urlOfScript, this._backendCall);
                        break;
                    } */
                    else if (urlOfScript.includes('adevinta.com') || urlOfScript.includes('schibstedspain.mgr.consensu.org')) {
                        this._cmp = new _cmp_NoYetImplementedCmp__WEBPACK_IMPORTED_MODULE_11__["default"](129, this._document, 'Adevinta Spain S.L.U.', urlOfScript, this._backendCall);
                        break;
                    }
                    else if (urlOfScript.includes('oriel.io') || urlOfScript.includes('oriel.mgr.consensu.org')) {
                        this._cmp = new _cmp_NoYetImplementedCmp__WEBPACK_IMPORTED_MODULE_11__["default"](131, this._document, 'Oriel Ventures', urlOfScript, this._backendCall);
                        break;
                    }
                    else if (urlOfScript.includes('improvedigital.com') || urlOfScript.includes('improvedigital.mgr.consensu.org')) {
                        this._cmp = new _cmp_NoYetImplementedCmp__WEBPACK_IMPORTED_MODULE_11__["default"](139, this._document, 'Improve Digital International BV', urlOfScript, this._backendCall);
                        break;
                    }
                    else if (urlOfScript.includes('wikia.comfandom') || urlOfScript.includes('fandom.mgr.consensu.org')) {
                        this._cmp = new _cmp_NoYetImplementedCmp__WEBPACK_IMPORTED_MODULE_11__["default"](141, this._document, 'Wikia, Inc. (FANDOM)', urlOfScript, this._backendCall);
                        break;
                    }
                    else if (urlOfScript.includes('caradisiac.com') || urlOfScript.includes('caradisiac.mgr.consensu.org')) {
                        this._cmp = new _cmp_NoYetImplementedCmp__WEBPACK_IMPORTED_MODULE_11__["default"](147, this._document, 'Car&Boat Media', urlOfScript, this._backendCall);
                        break;
                    }
                    else if (urlOfScript.includes('avocet.io') || urlOfScript.includes('avocet.mgr.consensu.org')) {
                        this._cmp = new _cmp_NoYetImplementedCmp__WEBPACK_IMPORTED_MODULE_11__["default"](153, this._document, 'Avocet Systems Limted', urlOfScript, this._backendCall);
                        break;
                    }
                    else if (urlOfScript.includes('yoc.com') || urlOfScript.includes('yoc.mgr.consensu.org')) {
                        this._cmp = new _cmp_NoYetImplementedCmp__WEBPACK_IMPORTED_MODULE_11__["default"](157, this._document, 'YOC AG', urlOfScript, this._backendCall);
                        break;
                    }
                    else if (urlOfScript.includes('innity.com') || urlOfScript.includes('innity.mgr.consensu.org')) {
                        this._cmp = new _cmp_NoYetImplementedCmp__WEBPACK_IMPORTED_MODULE_11__["default"](161, this._document, 'Innity', urlOfScript, this._backendCall);
                        break;
                    }
                    else if (urlOfScript.includes('cookieinformation.com') || urlOfScript.includes('cookieinformation.mgr.consensu.org')) {
                        this._cmp = new _cmp_NoYetImplementedCmp__WEBPACK_IMPORTED_MODULE_11__["default"](162, this._document, 'Cookie Information APS', urlOfScript, this._backendCall);
                        break;
                    }
                    else if (urlOfScript.includes('societe.com') || urlOfScript.includes('societe.mgr.consensu.org')) {
                        this._cmp = new _cmp_NoYetImplementedCmp__WEBPACK_IMPORTED_MODULE_11__["default"](164, this._document, 'SOCIETE SAS', urlOfScript, this._backendCall);
                        break;
                    }
                    else if (urlOfScript.includes('united-internet-media.de') || urlOfScript.includes('1und1.mgr.consensu.org')) {
                        this._cmp = new _cmp_NoYetImplementedCmp__WEBPACK_IMPORTED_MODULE_11__["default"](167, this._document, '1&1 Mail & Media GmbH', urlOfScript, this._backendCall);
                        break;
                    }
                    else if (urlOfScript.includes('outlook.live.com') || urlOfScript.includes('outlook.mgr.consensu.org')) {
                        this._cmp = new _cmp_NoYetImplementedCmp__WEBPACK_IMPORTED_MODULE_11__["default"](168, this._document, 'Outlook.com - Microsoft Corporation', urlOfScript, this._backendCall);
                        break;
                    }
                    else if (urlOfScript.includes('mappy.com') || urlOfScript.includes('mappy.mgr.consensu.org')) {
                        this._cmp = new _cmp_NoYetImplementedCmp__WEBPACK_IMPORTED_MODULE_11__["default"](169, this._document, 'Mappy', urlOfScript, this._backendCall);
                        break;
                    }
                    else if (urlOfScript.includes('agora.pl') || urlOfScript.includes('agora.mgr.consensu.org')) {
                        this._cmp = new _cmp_NoYetImplementedCmp__WEBPACK_IMPORTED_MODULE_11__["default"](170, this._document, 'AGORA SA', urlOfScript, this._backendCall);
                        break;
                    }
                    else if (urlOfScript.includes('natemat.pl') || urlOfScript.includes('natemat.mgr.consensu.org')) {
                        this._cmp = new _cmp_NoYetImplementedCmp__WEBPACK_IMPORTED_MODULE_11__["default"](175, this._document, 'Glob 360 Sp. z o.o.', urlOfScript, this._backendCall);
                        break;
                    }
                    else if (urlOfScript.includes('marfeel.com') || urlOfScript.includes('marfeel.mgr.consensu.org')) {
                        this._cmp = new _cmp_NoYetImplementedCmp__WEBPACK_IMPORTED_MODULE_11__["default"](181, this._document, 'Marfeel Solutions S.L', urlOfScript, this._backendCall);
                        break;
                    }
                    else if (urlOfScript.includes('sub2tech.com') || urlOfScript.includes('2consent.mgr.consensu.org')) {
                        this._cmp = new _cmp_NoYetImplementedCmp__WEBPACK_IMPORTED_MODULE_11__["default"](183, this._document, 'Sub2 Technologies Ltd', urlOfScript, this._backendCall);
                        break;
                    }
                    else if (urlOfScript.includes('playwire.com') || urlOfScript.includes('playwire.mgr.consensu.org')) {
                        this._cmp = new _cmp_NoYetImplementedCmp__WEBPACK_IMPORTED_MODULE_11__["default"](185, this._document, 'Playwire LLC', urlOfScript, this._backendCall);
                        break;
                    }
                    else if (urlOfScript.includes('venatusmedia.com') || urlOfScript.includes('venatus.mgr.consensu.org')) {
                        this._cmp = new _cmp_NoYetImplementedCmp__WEBPACK_IMPORTED_MODULE_11__["default"](186, this._document, 'Venatus Media Limited', urlOfScript, this._backendCall);
                        break;
                    }
                    else if (urlOfScript.includes('rtp.pt') || urlOfScript.includes('rtp.mgr.consensu.org')) {
                        this._cmp = new _cmp_NoYetImplementedCmp__WEBPACK_IMPORTED_MODULE_11__["default"](193, this._document, 'RTP SA', urlOfScript, this._backendCall);
                        break;
                    }
                    else if (urlOfScript.includes('spilgames.com') || urlOfScript.includes('spilgames.mgr.consensu.org')) {
                        this._cmp = new _cmp_NoYetImplementedCmp__WEBPACK_IMPORTED_MODULE_11__["default"](194, this._document, 'Spil Games B.V.', urlOfScript, this._backendCall);
                        break;
                    }
                    else if (urlOfScript.includes('nws.ai') || urlOfScript.includes('nws.mgr.consensu.org')) {
                        this._cmp = new _cmp_NoYetImplementedCmp__WEBPACK_IMPORTED_MODULE_11__["default"](196, this._document, 'Newsroom AI Ltd.', urlOfScript, this._backendCall);
                        break;
                    }
                    else if (urlOfScript.includes('publy.comen') || urlOfScript.includes('publy.mgr.consensu.org')) {
                        this._cmp = new _cmp_NoYetImplementedCmp__WEBPACK_IMPORTED_MODULE_11__["default"](197, this._document, 'Publy ltd', urlOfScript, this._backendCall);
                        break;
                    }
                    else if (urlOfScript.includes('bitqueen.com') || urlOfScript.includes('bitqueen.mgr.consensu.org')) {
                        this._cmp = new _cmp_NoYetImplementedCmp__WEBPACK_IMPORTED_MODULE_11__["default"](205, this._document, 'Bit Q Holdings Limited', urlOfScript, this._backendCall);
                        break;
                    }
                    else if (urlOfScript.includes('pagesjaunes.fr') || urlOfScript.includes('pagesjaunes.mgr.consensu.org')) {
                        this._cmp = new _cmp_NoYetImplementedCmp__WEBPACK_IMPORTED_MODULE_11__["default"](206, this._document, 'PAGESJAUNES', urlOfScript, this._backendCall);
                        break;
                    }
                    else if (urlOfScript.includes('goldenbees.fr') || urlOfScript.includes('goldenbees.mgr.consensu.org')) {
                        this._cmp = new _cmp_NoYetImplementedCmp__WEBPACK_IMPORTED_MODULE_11__["default"](208, this._document, 'Golden Bees', urlOfScript, this._backendCall);
                        break;
                    }
                    else if (urlOfScript.includes('lifestreet.com') || urlOfScript.includes('lifestreet.mgr.consensu.org')) {
                        this._cmp = new _cmp_NoYetImplementedCmp__WEBPACK_IMPORTED_MODULE_11__["default"](209, this._document, 'LifeStreet Corporation', urlOfScript, this._backendCall);
                        break;
                    }
                    else if (urlOfScript.includes('singlespot.comen') || urlOfScript.includes('singlespot.mgr.consensu.org')) {
                        this._cmp = new _cmp_NoYetImplementedCmp__WEBPACK_IMPORTED_MODULE_11__["default"](212, this._document, 'Singlespot', urlOfScript, this._backendCall);
                        break;
                    }
                    else if (urlOfScript.includes('leboncoin.fr') || urlOfScript.includes('lbc.mgr.consensu.org')) {
                        this._cmp = new _cmp_NoYetImplementedCmp__WEBPACK_IMPORTED_MODULE_11__["default"](214, this._document, 'LBC France', urlOfScript, this._backendCall);
                        break;
                    }
                    else if (urlOfScript.includes('rgpd-smartclip.com') || urlOfScript.includes('smartcliplatam.mgr.consensu.org')) {
                        this._cmp = new _cmp_NoYetImplementedCmp__WEBPACK_IMPORTED_MODULE_11__["default"](215, this._document, 'Smartclip Hispania S.L.', urlOfScript, this._backendCall);
                        break;
                    }
                    else if (urlOfScript.includes('listonic.com') || urlOfScript.includes('listonic.mgr.consensu.org')) {
                        this._cmp = new _cmp_NoYetImplementedCmp__WEBPACK_IMPORTED_MODULE_11__["default"](216, this._document, 'Listonic sp. z o. o.', urlOfScript, this._backendCall);
                        break;
                    }
                    else if (urlOfScript.includes('bmind.es') || urlOfScript.includes('bmind.mgr.consensu.org')) {
                        this._cmp = new _cmp_NoYetImplementedCmp__WEBPACK_IMPORTED_MODULE_11__["default"](217, this._document, 'BMIND SALES MAKER COMPANY S.L.', urlOfScript, this._backendCall);
                        break;
                    }
                    else if (urlOfScript.includes('rcspubblicita.it') || urlOfScript.includes('rcsmediagroup.mgr.consensu.org')) {
                        this._cmp = new _cmp_NoYetImplementedCmp__WEBPACK_IMPORTED_MODULE_11__["default"](218, this._document, 'RCS MediaGroup S.p.A.', urlOfScript, this._backendCall);
                        break;
                    }
                    else if (urlOfScript.includes('allegro.pl') || urlOfScript.includes('allegro.mgr.consensu.org')) {
                        this._cmp = new _cmp_NoYetImplementedCmp__WEBPACK_IMPORTED_MODULE_11__["default"](220, this._document, 'Allegro.pl Sp z o.o.', urlOfScript, this._backendCall);
                        break;
                    }
                    else if (urlOfScript.includes('dentsuaegisnetwork.de') || urlOfScript.includes('dan.mgr.consensu.org')) {
                        this._cmp = new _cmp_NoYetImplementedCmp__WEBPACK_IMPORTED_MODULE_11__["default"](221, this._document, 'Dentsu Aegis Network Germany GmbH', urlOfScript, this._backendCall);
                        break;
                    }
                    else if (urlOfScript.includes('paruvendu.fr') || urlOfScript.includes('paruvendu.mgr.consensu.org')) {
                        this._cmp = new _cmp_NoYetImplementedCmp__WEBPACK_IMPORTED_MODULE_11__["default"](222, this._document, 'ParuVendu.fr', urlOfScript, this._backendCall);
                        break;
                    }
                    else if (urlOfScript.includes('gedispa.it') || urlOfScript.includes('gedi.mgr.consensu.org')) {
                        this._cmp = new _cmp_NoYetImplementedCmp__WEBPACK_IMPORTED_MODULE_11__["default"](223, this._document, 'Gedi Digital s.r.l.', urlOfScript, this._backendCall);
                        break;
                    }
                    else if ((urlOfScript.includes('ensighten.com') || urlOfScript.includes('ensighten.mgr.consensu.org')) && !urlOfScript.includes('nexus.ensighten.com')) {
                        this._cmp = new _cmp_NoYetImplementedCmp__WEBPACK_IMPORTED_MODULE_11__["default"](224, this._document, 'Ensighten, Inc', urlOfScript, this._backendCall);
                        break;
                    }
                    else if (urlOfScript.includes('idmnet.grupazpr.pl') || urlOfScript.includes('idmnet.mgr.consensu.org')) {
                        this._cmp = new _cmp_NoYetImplementedCmp__WEBPACK_IMPORTED_MODULE_11__["default"](225, this._document, 'Internetowy Dom Mediowy net S.A.', urlOfScript, this._backendCall);
                        break;
                    }
                    else if (urlOfScript.includes('gruppoathesis.it') || urlOfScript.includes('gruppoathesis.mgr.consensu.org')) {
                        this._cmp = new _cmp_NoYetImplementedCmp__WEBPACK_IMPORTED_MODULE_11__["default"](226, this._document, 'Società Athesis S.p.A.', urlOfScript, this._backendCall);
                        break;
                    }
                    else if (urlOfScript.includes('healthline.com') || urlOfScript.includes('healthlinemedia.mgr.consensu.org')) {
                        this._cmp = new _cmp_NoYetImplementedCmp__WEBPACK_IMPORTED_MODULE_11__["default"](227, this._document, 'Healthline Media, Inc.', urlOfScript, this._backendCall);
                        break;
                    }
                    else if (urlOfScript.includes('thirdfloor.it') || urlOfScript.includes('thirdfloor.mgr.consensu.org')) {
                        this._cmp = new _cmp_NoYetImplementedCmp__WEBPACK_IMPORTED_MODULE_11__["default"](228, this._document, 'Thirdfloor SRL', urlOfScript, this._backendCall);
                        break;
                    }
                    else if (urlOfScript.includes('snigelweb.com') || urlOfScript.includes('snigelweb.mgr.consensu.org')) {
                        this._cmp = new _cmp_NoYetImplementedCmp__WEBPACK_IMPORTED_MODULE_11__["default"](229, this._document, 'Snigel Web Services Limited', urlOfScript, this._backendCall);
                        break;
                    }
                    else if (urlOfScript.includes('prywatnosc.interia.pl') || urlOfScript.includes('interia.mgr.consensu.org')) {
                        this._cmp = new _cmp_NoYetImplementedCmp__WEBPACK_IMPORTED_MODULE_11__["default"](231, this._document, 'Grupa Interia.pl Sp. z o.o. sp. k.', urlOfScript, this._backendCall);
                        break;
                    }
                    else if (urlOfScript.includes('adnuntius.com') || urlOfScript.includes('adnuntiusconsent.mgr.consensu.org')) {
                        this._cmp = new _cmp_NoYetImplementedCmp__WEBPACK_IMPORTED_MODULE_11__["default"](235, this._document, 'Adnuntius AS', urlOfScript, this._backendCall);
                        break;
                    }
                    else if (urlOfScript.includes('webads.nl') || urlOfScript.includes('webads.mgr.consensu.org')) {
                        this._cmp = new _cmp_NoYetImplementedCmp__WEBPACK_IMPORTED_MODULE_11__["default"](236, this._document, 'WebAds B.V', urlOfScript, this._backendCall);
                        break;
                    }
                    else if (urlOfScript.includes('tiempo.com') || urlOfScript.includes('meteored.mgr.consensu.org')) {
                        this._cmp = new _cmp_NoYetImplementedCmp__WEBPACK_IMPORTED_MODULE_11__["default"](237, this._document, 'ALPRED SL', urlOfScript, this._backendCall);
                        break;
                    }
                    else if (urlOfScript.includes('network-n.com') || urlOfScript.includes('networkn.mgr.consensu.org')) {
                        this._cmp = new _cmp_NoYetImplementedCmp__WEBPACK_IMPORTED_MODULE_11__["default"](240, this._document, 'Network N Ltd', urlOfScript, this._backendCall);
                        break;
                    }
                    else if (urlOfScript.includes('cafemedia.com') || urlOfScript.includes('cafemedia.mgr.consensu.org')) {
                        this._cmp = new _cmp_NoYetImplementedCmp__WEBPACK_IMPORTED_MODULE_11__["default"](241, this._document, 'CafeMedia/AdThrive', urlOfScript, this._backendCall);
                        break;
                    }
                    else if (urlOfScript.includes('nitropay.com') || urlOfScript.includes('nitropay.mgr.consensu.org')) {
                        this._cmp = new _cmp_NoYetImplementedCmp__WEBPACK_IMPORTED_MODULE_11__["default"](242, this._document, 'GG Software, LLC', urlOfScript, this._backendCall);
                        break;
                    }
                    else if (urlOfScript.includes('livinglymedia.com') || urlOfScript.includes('livinglymedia.mgr.consensu.org')) {
                        this._cmp = new _cmp_NoYetImplementedCmp__WEBPACK_IMPORTED_MODULE_11__["default"](244, this._document, 'Livingly Media', urlOfScript, this._backendCall);
                        break;
                    }
                    else if (urlOfScript.includes('overwolf.com') || urlOfScript.includes('overwolf.mgr.consensu.org')) {
                        this._cmp = new _cmp_NoYetImplementedCmp__WEBPACK_IMPORTED_MODULE_11__["default"](246, this._document, 'Overwolf Ltd.', urlOfScript, this._backendCall);
                        break;
                    }
                    else if (urlOfScript.includes('seznam.cz') || urlOfScript.includes('seznam.mgr.consensu.org')) {
                        this._cmp = new _cmp_NoYetImplementedCmp__WEBPACK_IMPORTED_MODULE_11__["default"](247, this._document, 'Seznam.cz, a.s.', urlOfScript, this._backendCall);
                        break;
                    }
                    else if (urlOfScript.includes('mairdumont-netletix.com') || urlOfScript.includes('mdnxcmp.mgr.consensu.org')) {
                        this._cmp = new _cmp_NoYetImplementedCmp__WEBPACK_IMPORTED_MODULE_11__["default"](252, this._document, 'MAIRDUMONT NETLETIX GmbH&Co. KG', urlOfScript, this._backendCall);
                        break;
                    }
                    else if (urlOfScript.includes('admatic.com.tr') || urlOfScript.includes('admatic.mgr.consensu.org')) {
                        this._cmp = new _cmp_NoYetImplementedCmp__WEBPACK_IMPORTED_MODULE_11__["default"](256, this._document, 'AdMatic Medya AS', urlOfScript, this._backendCall);
                        break;
                    }
                    else if (urlOfScript.includes('automattic.com') || urlOfScript.includes('automattic.mgr.consensu.org')) {
                        this._cmp = new _cmp_NoYetImplementedCmp__WEBPACK_IMPORTED_MODULE_11__["default"](258, this._document, 'Automattic, Inc.', urlOfScript, this._backendCall);
                        break;
                    }
                    else if (urlOfScript.includes('truedata.co') || urlOfScript.includes('truedata.mgr.consensu.org')) {
                        this._cmp = new _cmp_NoYetImplementedCmp__WEBPACK_IMPORTED_MODULE_11__["default"](262, this._document, 'TrueData Solutions, Inc.', urlOfScript, this._backendCall);
                        break;
                    }
                    else if (urlOfScript.includes('secureprivacy.ai') || urlOfScript.includes('secureprivacy.mgr.consensu.org')) {
                        this._cmp = new _cmp_NoYetImplementedCmp__WEBPACK_IMPORTED_MODULE_11__["default"](264, this._document, 'Secure Privacy', urlOfScript, this._backendCall);
                        break;
                    }
                    else if (urlOfScript.includes('advfn.com') || urlOfScript.includes('advfn.mgr.consensu.org')) {
                        this._cmp = new _cmp_NoYetImplementedCmp__WEBPACK_IMPORTED_MODULE_11__["default"](265, this._document, 'ADVFN PLC', urlOfScript, this._backendCall);
                        break;
                    }
                    else if (urlOfScript.includes('medme.pl') || urlOfScript.includes('pharmapartner.mgr.consensu.org')) {
                        this._cmp = new _cmp_NoYetImplementedCmp__WEBPACK_IMPORTED_MODULE_11__["default"](268, this._document, 'Pharma Partner sp. z o.o.', urlOfScript, this._backendCall);
                        break;
                    }
                    else if (urlOfScript.includes('next14.com') || urlOfScript.includes('next14.mgr.consensu.org')) {
                        this._cmp = new _cmp_NoYetImplementedCmp__WEBPACK_IMPORTED_MODULE_11__["default"](273, this._document, 'Next14 SpA', urlOfScript, this._backendCall);
                        break;
                    }
                    else if (urlOfScript.includes('allerholding.dk') || urlOfScript.includes('aller.mgr.consensu.org')) {
                        this._cmp = new _cmp_NoYetImplementedCmp__WEBPACK_IMPORTED_MODULE_11__["default"](274, this._document, 'Aller Media', urlOfScript, this._backendCall);
                        break;
                    }
                    else if (urlOfScript.includes('ringieraxelspringer.pl') || urlOfScript.includes('rasp.mgr.consensu.org')) {
                        this._cmp = new _cmp_NoYetImplementedCmp__WEBPACK_IMPORTED_MODULE_11__["default"](280, this._document, 'Ringier Axel Springer Polska', urlOfScript, this._backendCall);
                        break;
                    }
                    else if (urlOfScript.includes('pubnative.net') || urlOfScript.includes('pubnative.mgr.consensu.org')) {
                        this._cmp = new _cmp_NoYetImplementedCmp__WEBPACK_IMPORTED_MODULE_11__["default"](281, this._document, 'PubNative GmbH', urlOfScript, this._backendCall);
                        break;
                    }
                    else if (urlOfScript.includes('thefreedictionary.com') || urlOfScript.includes('thefreedictionary.mgr.consensu.org')) {
                        this._cmp = new _cmp_NoYetImplementedCmp__WEBPACK_IMPORTED_MODULE_11__["default"](282, this._document, 'Farlex Inc', urlOfScript, this._backendCall);
                        break;
                    }
                    else if (urlOfScript.includes('osano.com') || urlOfScript.includes('osano.js')) {
                        this._cmp = new _cmp_NoYetImplementedCmp__WEBPACK_IMPORTED_MODULE_11__["default"](282, this._document, 'Osano Inc.,Cookie Consent', urlOfScript, this._backendCall);
                        break;
                    }
                    else {
                        for (let key in buttons) {
                            let button = this._document.querySelector(key);
                            if (_Utils__WEBPACK_IMPORTED_MODULE_0__["default"].objectClickable(button)) {
                                _Utils__WEBPACK_IMPORTED_MODULE_0__["default"].log("Backend: " + this._backendCall);
                                this._cmp = new _cmp_CustomImpl__WEBPACK_IMPORTED_MODULE_4__["default"](this._document, key, this._backendCall);
                                break allScripts;
                            }
                        }
                    } // Else
                } // IF - JavaScript is Defined
            } // For Loop
        }
        if (this._cmp) {
            _Utils__WEBPACK_IMPORTED_MODULE_0__["default"].log("CMP is set now. Connect to Observer in new context");
            // remove Connection to the local Observer
            if (!firstTime)
                this.disconnectObserver();
            this._cmp.connect();
        }
        else {
            _Utils__WEBPACK_IMPORTED_MODULE_0__["default"].log("-- Run Thru completed. No Indicator for JavaScript of a CMP so far. Count: " + this._callBackCounter);
            if (this._callBackCounter > 100) {
                _Utils__WEBPACK_IMPORTED_MODULE_0__["default"].log("Disconnecting from Observer now");
                this.disconnectObserver();
            }
        }
    }
}


/***/ }),

/***/ "./src/js/Utils.ts":
/*!*************************!*\
  !*** ./src/js/Utils.ts ***!
  \*************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Utils; });

const dateFormat = __webpack_require__(/*! dateformat */ "./node_modules/dateformat/lib/dateformat.js");
class Utils {
    static log(message) {
        console.log(dateFormat(new Date(), 'yyyy-mm-dd HH:MM:ss.l') + " " + message);
    }
    static createMinimalConsentButton(document, javaScript) {
        let link = document.createElement('a');
        link.text = 'Minimal Consent';
        link.setAttribute("class", "minimal-consent");
        link.href = javaScript;
        document.body.appendChild(link);
    }
    static objectClickable(myObject) {
        return typeof myObject !== 'undefined' && myObject && typeof myObject.parentElement !== 'undefined' && myObject.offsetParent;
    }
    static objectVisible(myObject) {
        return typeof myObject !== 'undefined' && myObject && typeof myObject.parentElement !== 'undefined';
    }
    static checkIfDefinedAndNotNull(field) {
        return typeof field !== 'undefined' && field !== null;
    }
}


/***/ }),

/***/ "./src/js/cmp/Borlabs.ts":
/*!*******************************!*\
  !*** ./src/js/cmp/Borlabs.ts ***!
  \*******************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Borlabs; });
/* harmony import */ var _Utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../Utils */ "./src/js/Utils.ts");
/* harmony import */ var _CMP__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./CMP */ "./src/js/cmp/CMP.ts");
/* harmony import */ var _CmpType__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./CmpType */ "./src/js/cmp/CmpType.ts");




class Borlabs {
    // this is not an IAB Solution
    constructor(node, scriptUrl, backendCall) {
        this._name = "Borlabs.net";
        backendCall.cmpData(10001, this._name, scriptUrl, _CmpType__WEBPACK_IMPORTED_MODULE_2__["default"].DO_NOT_WAIT, true);
        this._cmp = new _CMP__WEBPACK_IMPORTED_MODULE_1__["default"](node, backendCall, this);
    }
    get name() {
        return this._name;
    }
    connect() {
        this._cmp.connect();
    }
    /*
    https://www.123effizientdabei.de/, https://www.abibuch-designer.de/, https://www.staubsauger-berater.de/ https://www.arge.de/
     */
    handleCmp() {
        // Step 1
        const popup = "div._brlbs-box-wrap";
        let popupDiv = this._cmp.queryNodeSelector(popup);
        const checkboxIndictor = "div._brlbs-checkbox-indicator";
        let checkboxIndictorDiv = this._cmp.queryNodeSelectorAll(checkboxIndictor);
        _Utils__WEBPACK_IMPORTED_MODULE_0__["default"].log("checkboxIndictorDiv: " + checkboxIndictorDiv.length);
        const media = "input#checkbox-external-media";
        let inputMedia = this._cmp.queryNodeSelector(media);
        const stats = "input#checkbox-statistics";
        let inputStats = this._cmp.queryNodeSelector(stats);
        const marketing = "input#checkbox-marketing";
        let inputMarketing = this._cmp.queryNodeSelector(marketing);
        const save = "a._brlbs-btn";
        let saveButtons = this._cmp.queryNodeSelectorAll(save);
        _Utils__WEBPACK_IMPORTED_MODULE_0__["default"].log("saveButtons: " + saveButtons.length);
        _Utils__WEBPACK_IMPORTED_MODULE_0__["default"].log("State: " + this._cmp.state);
        if (_Utils__WEBPACK_IMPORTED_MODULE_0__["default"].objectClickable(popupDiv) && this._cmp.state === 0) {
            _Utils__WEBPACK_IMPORTED_MODULE_0__["default"].log("Div Found");
            if (_Utils__WEBPACK_IMPORTED_MODULE_0__["default"].objectClickable(inputMedia)) {
                _Utils__WEBPACK_IMPORTED_MODULE_0__["default"].log("Clicked inputMedia");
                inputMedia.setAttribute("checked", "false");
            }
            if (_Utils__WEBPACK_IMPORTED_MODULE_0__["default"].objectClickable(inputStats)) {
                _Utils__WEBPACK_IMPORTED_MODULE_0__["default"].log("Clicked inputStatst");
                inputStats.setAttribute("checked", "false");
            }
            if (_Utils__WEBPACK_IMPORTED_MODULE_0__["default"].objectClickable(inputMarketing)) {
                _Utils__WEBPACK_IMPORTED_MODULE_0__["default"].log("Clicked inputMarketing");
                inputMarketing.setAttribute("checked", "false");
            }
            let clicked = false;
            if (saveButtons && saveButtons.length > 0) {
                saveButtons.forEach(function (span) {
                    _Utils__WEBPACK_IMPORTED_MODULE_0__["default"].log(span.innerHTML);
                    if (span.innerHTML.includes("essenzielle")) {
                        span.click();
                        _Utils__WEBPACK_IMPORTED_MODULE_0__["default"].log("Clicked on essenzielle");
                        clicked = true;
                    }
                    else if (span.innerHTML.includes("Speichern")) {
                        span.click();
                        _Utils__WEBPACK_IMPORTED_MODULE_0__["default"].log("Clicked on Speichern");
                        clicked = true;
                    }
                });
            }
            if (clicked) {
                _Utils__WEBPACK_IMPORTED_MODULE_0__["default"].log("Clicked, reset now");
                this._cmp.reset();
            }
        }
    }
}


/***/ }),

/***/ "./src/js/cmp/CMP.ts":
/*!***************************!*\
  !*** ./src/js/cmp/CMP.ts ***!
  \***************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return CMP; });
/* harmony import */ var _Utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../Utils */ "./src/js/Utils.ts");


class CMP {
    constructor(node, backendCall, cmpImplementation) {
        /**
         * Constructor for an Abstract CMP
         *
         * @param node Document Root Node
         * @param name Name for the CMP in Text
         * @param scriptUrl URL from with the CMP was loaded
         * @param type Enumeration on Type of CMP to determine when we need to trigger the backend call.
         */
        this._config = { attributes: true, childList: true, subtree: true };
        this._minimalConsentLink = "a.minimal-consent";
        this._maximalLimitOfDomChangeTillStop = 150;
        this._node = node;
        this._state = 0;
        this._callCounter = 0;
        this._cmpImplementation = cmpImplementation;
        this._backendCall = backendCall;
    }
    get state() {
        return this._state;
    }
    set state(state) {
        this._state = state;
    }
    /**
     * Getting the Root Node of the Document where a CMP is runnning
     *
     * @returns {*}
     */
    get node() {
        return this._node;
    }
    get minimalConsentLink() {
        return this._minimalConsentLink;
    }
    connect() {
        let _self = this;
        this._observer = new MutationObserver(function (mutations) {
            _self.mainCmpHandler(mutations);
        });
        this._observer.observe(this._node, this._config);
        // in case there is no DOM change on the site at this place, the Handler should run at least once.
        this.mainCmpHandler(null);
    }
    disconnect() {
        this._observer.disconnect();
        this._state = -1;
        this._callCounter = 0;
    }
    /**
     * Handle which is called, when a modification is detected.
     *
     * @param mutations
     */
    mainCmpHandler(mutations) {
        _Utils__WEBPACK_IMPORTED_MODULE_0__["default"].log("Handling " + this._cmpImplementation.name);
        this._callCounter++;
        // if after x changes to the DOM there as not popup, we stop listening to the changes.
        if (this._callCounter < this._maximalLimitOfDomChangeTillStop) {
            this._cmpImplementation.handleCmp();
        }
        else {
            this.disconnect();
            _Utils__WEBPACK_IMPORTED_MODULE_0__["default"].log("Looks like, CMP was already given consent.");
        }
    }
    /**
     * Reset the state of the CMP if the Consent was successfully given. Might trigger a backend call.
     */
    reset() {
        // If everything is fine, remove the listener.
        this._observer.disconnect();
        this._state = -1;
        this._backendCall.successfulBlock();
        _Utils__WEBPACK_IMPORTED_MODULE_0__["default"].log('Consent for ' + this._cmpImplementation.name + ' denied.');
    }
    /**
     * Find a single Node via a CSS Selector
     * @param selector CSS Selector to search for
     * @returns {Element | any}
     */
    queryNodeSelector(selector) {
        return this._node.querySelector(selector);
    }
    /**
     * Finds multiple Nodes via a CSS Selector.
     * @param selector CSS Selector to search for
     * @returns {NodeListOf<HTMLElementTagNameMap[*]> | NodeListOf<Element> | NodeListOf<SVGElementTagNameMap[*]>}
     */
    queryNodeSelectorAll(selector) {
        return this._node.querySelectorAll(selector);
    }
}


/***/ }),

/***/ "./src/js/cmp/Chandago.ts":
/*!********************************!*\
  !*** ./src/js/cmp/Chandago.ts ***!
  \********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Chandago; });
/* harmony import */ var _Utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../Utils */ "./src/js/Utils.ts");
/* harmony import */ var _CMP__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./CMP */ "./src/js/cmp/CMP.ts");
/* harmony import */ var _CmpType__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./CmpType */ "./src/js/cmp/CmpType.ts");




class Chandago {
    constructor(node, scriptUrl, backendCall) {
        this._name = "Chandago";
        backendCall.cmpData(2, this._name, scriptUrl, _CmpType__WEBPACK_IMPORTED_MODULE_2__["default"].WAIT_FOR_ASYNC_CALLBACK, true);
        this._cmp = new _CMP__WEBPACK_IMPORTED_MODULE_1__["default"](node, backendCall, this);
    }
    get name() {
        return this._name;
    }
    connect() {
        this._cmp.connect();
    }
    handleCmp() {
        const chandagoButtonDenyCss = "button.deny";
        let chandagoButtonDeny = this._cmp.queryNodeSelector(chandagoButtonDenyCss);
        if (_Utils__WEBPACK_IMPORTED_MODULE_0__["default"].objectClickable(chandagoButtonDeny) && this._cmp.state === 0) {
            _Utils__WEBPACK_IMPORTED_MODULE_0__["default"].log("Click Deny now");
            // looks like this does not work.
            chandagoButtonDeny.click();
            _Utils__WEBPACK_IMPORTED_MODULE_0__["default"].log('Consent on denied.');
            this._cmp.reset();
        }
    }
}


/***/ }),

/***/ "./src/js/cmp/CmpType.ts":
/*!*******************************!*\
  !*** ./src/js/cmp/CmpType.ts ***!
  \*******************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);

var CmpType;
(function (CmpType) {
    CmpType["WAIT_FOR_ASYNC_CALLBACK"] = "We wait until the JavaScript Object on the Page for the CMP was found";
    CmpType["WAIT_FOR_TIME_FRAME"] = "We wait till the Callback should fire (maximal 5 seconds; 25 x 200 ms";
    CmpType["DO_NOT_WAIT"] = "We don't wait for a callback, as we know the CMP is not TCF compliant";
})(CmpType || (CmpType = {}));
/* harmony default export */ __webpack_exports__["default"] = (CmpType);


/***/ }),

/***/ "./src/js/cmp/ConsentManager.ts":
/*!**************************************!*\
  !*** ./src/js/cmp/ConsentManager.ts ***!
  \**************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return ConsentManager; });
/* harmony import */ var _Utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../Utils */ "./src/js/Utils.ts");
/* harmony import */ var _CMP__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./CMP */ "./src/js/cmp/CMP.ts");
/* harmony import */ var _CmpType__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./CmpType */ "./src/js/cmp/CmpType.ts");




class ConsentManager {
    constructor(node, scriptUrl, backendCall) {
        this._name = "ConsentManager.net";
        backendCall.cmpData(31, this._name, scriptUrl, _CmpType__WEBPACK_IMPORTED_MODULE_2__["default"].WAIT_FOR_ASYNC_CALLBACK, true);
        this._cmp = new _CMP__WEBPACK_IMPORTED_MODULE_1__["default"](node, backendCall, this);
    }
    get name() {
        return this._name;
    }
    connect() {
        this._cmp.connect();
    }
    handleCmp() {
        const deny = '#cmpbntnotxt';
        let buttonDeny = this._cmp.queryNodeSelector(deny);
        if (_Utils__WEBPACK_IMPORTED_MODULE_0__["default"].objectClickable(buttonDeny) && this._cmp.state === 0) {
            buttonDeny.click();
            this._cmp.reset();
        }
        // TODO: Requires a second Step for the ugly guis.
        // Currently there is a <a href='#' with an on Click Action which is a bit painful to handle
    }
}


/***/ }),

/***/ "./src/js/cmp/CookieBot.ts":
/*!*********************************!*\
  !*** ./src/js/cmp/CookieBot.ts ***!
  \*********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return CookieBot; });
/* harmony import */ var _Utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../Utils */ "./src/js/Utils.ts");
/* harmony import */ var _CMP__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./CMP */ "./src/js/cmp/CMP.ts");
/* harmony import */ var _CmpType__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./CmpType */ "./src/js/cmp/CmpType.ts");




class CookieBot {
    constructor(node, scriptUrl, backendCall) {
        this._name = "CookieBot";
        backendCall.cmpData(134, this._name, scriptUrl, _CmpType__WEBPACK_IMPORTED_MODULE_2__["default"].DO_NOT_WAIT, true);
        this._cmp = new _CMP__WEBPACK_IMPORTED_MODULE_1__["default"](node, backendCall, this);
    }
    get name() {
        return this._name;
    }
    connect() {
        this._cmp.connect();
    }
    /*  https://www.cookiebot.com/de/
        https://www.gitlab.com/
        https://www.applause.com/
        https://www.galeria.de/
        https://signrequest.com/#/ => CookieBot
        https://volksblatt.at/ => Cookie Bot
        https://www.zusammengegencorona.de/
        https://de.scalable.capital/ => not working!
        https://www.lv1871.de/lv/
        https://www.advocado.de/

     */
    handleCmp() {
        const cookiebotCheckboxesSelector = "input[type*='checkbox']";
        let cookiebotCheckBoxes = this._cmp.queryNodeSelectorAll(cookiebotCheckboxesSelector);
        _Utils__WEBPACK_IMPORTED_MODULE_0__["default"].log("cookiebotCheckBoxes: " + cookiebotCheckBoxes.length);
        const allowSelectedSelector1 = "a#CybotCookiebotDialogBodyLevelButtonLevelOptinAllowallSelection";
        let allowAllButton1 = this._cmp.queryNodeSelector(allowSelectedSelector1);
        const allowSelectedSelector2 = "a#CybotCookiebotDialogBodyLevelButtonAccept";
        let allowAllButton2 = this._cmp.queryNodeSelector(allowSelectedSelector2);
        const allowSelectedSelector3 = "a#CybotCookiebotDialogBodyButtonAccept";
        const allowAllButton3 = this._cmp.queryNodeSelector(allowSelectedSelector3);
        const detailsSelector1 = "a#CybotCookiebotDialogBodyButtonDetails";
        const detailsButton1 = this._cmp.queryNodeSelector(detailsSelector1);
        const detailsSelector2 = "a#CybotCookiebotDialogBodyLevelDetailsButton";
        const detailsButton2 = this._cmp.queryNodeSelector(detailsSelector2);
        // Case 1:
        // if there is the option to deny already on the first page - do so.
        // Test Page: https://www.possiblenow.com/, https://emojiterra.com/ (click on "only relevant cookies)
        if ((_Utils__WEBPACK_IMPORTED_MODULE_0__["default"].objectClickable(detailsButton1) || _Utils__WEBPACK_IMPORTED_MODULE_0__["default"].objectClickable(detailsButton2)) && this._cmp.state === 0) {
            _Utils__WEBPACK_IMPORTED_MODULE_0__["default"].log("Step 1: Show Details");
            if (_Utils__WEBPACK_IMPORTED_MODULE_0__["default"].objectClickable(detailsButton1)) {
                _Utils__WEBPACK_IMPORTED_MODULE_0__["default"].log("Details Type 1");
                detailsButton1.click();
            }
            if (_Utils__WEBPACK_IMPORTED_MODULE_0__["default"].objectClickable(detailsButton2)) {
                _Utils__WEBPACK_IMPORTED_MODULE_0__["default"].log("Details Type 2");
                detailsButton2.click();
            }
            this._cmp.state = 1;
        } // Test Page: https://www.cookiebot.com/de/, https://www.gitlab.com/, https://www.applause.com/ (check boxes on Banner)
        else if (cookiebotCheckBoxes.length > 0 && (_Utils__WEBPACK_IMPORTED_MODULE_0__["default"].objectClickable(allowAllButton1) || _Utils__WEBPACK_IMPORTED_MODULE_0__["default"].objectClickable(allowAllButton2) || _Utils__WEBPACK_IMPORTED_MODULE_0__["default"].objectClickable(allowAllButton3)) && this._cmp.state === 1) {
            _Utils__WEBPACK_IMPORTED_MODULE_0__["default"].log("Case 2: CookieBot Banner + Checkboxes found");
            cookiebotCheckBoxes.forEach(function (checkbox) {
                checkbox.setAttribute("checked", "false");
                _Utils__WEBPACK_IMPORTED_MODULE_0__["default"].log("Checkbox unset");
            });
            if (_Utils__WEBPACK_IMPORTED_MODULE_0__["default"].objectClickable(allowAllButton1)) {
                _Utils__WEBPACK_IMPORTED_MODULE_0__["default"].log("Accept Type 1");
                allowAllButton1.click();
                setTimeout(allowAllButton1.click(), 500);
            }
            if (_Utils__WEBPACK_IMPORTED_MODULE_0__["default"].objectClickable(allowAllButton2)) {
                _Utils__WEBPACK_IMPORTED_MODULE_0__["default"].log("Accept Type 2");
                allowAllButton2.click();
                setTimeout(allowAllButton2.click(), 500);
            }
            if (_Utils__WEBPACK_IMPORTED_MODULE_0__["default"].objectClickable(allowAllButton3)) {
                _Utils__WEBPACK_IMPORTED_MODULE_0__["default"].log("Accept Type 3");
                allowAllButton3.click();
                setTimeout(allowAllButton3.click(), 500);
            }
            this._cmp.reset();
        }
        // this is a special Case for V2. The Banner was found and we only click on the Deny Button.
    }
}


/***/ }),

/***/ "./src/js/cmp/CustomImpl.ts":
/*!**********************************!*\
  !*** ./src/js/cmp/CustomImpl.ts ***!
  \**********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return CustomImpl; });
/* harmony import */ var _Utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../Utils */ "./src/js/Utils.ts");
/* harmony import */ var _CMP__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./CMP */ "./src/js/cmp/CMP.ts");
/* harmony import */ var _CmpType__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./CmpType */ "./src/js/cmp/CmpType.ts");




class CustomImpl {
    constructor(node, key, backendCall) {
        this._name = "Custom Implementation";
        backendCall.cmpData(0, this._name, "na", _CmpType__WEBPACK_IMPORTED_MODULE_2__["default"].DO_NOT_WAIT, true);
        this._cmp = new _CMP__WEBPACK_IMPORTED_MODULE_1__["default"](node, backendCall, this);
        this._button = key;
    }
    get name() {
        return this._name;
    }
    connect() {
        this._cmp.connect();
    }
    handleCmp() {
        let button = this._cmp.queryNodeSelector(this._button);
        if (_Utils__WEBPACK_IMPORTED_MODULE_0__["default"].objectClickable(button) && this._cmp.state === 0) {
            _Utils__WEBPACK_IMPORTED_MODULE_0__["default"].log("Button Found, clicking");
            button.click();
            this._cmp.reset();
        }
    }
}


/***/ }),

/***/ "./src/js/cmp/DiDoMi.ts":
/*!******************************!*\
  !*** ./src/js/cmp/DiDoMi.ts ***!
  \******************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return DiDoMi; });
/* harmony import */ var _Utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../Utils */ "./src/js/Utils.ts");
/* harmony import */ var _CMP__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./CMP */ "./src/js/cmp/CMP.ts");
/* harmony import */ var _CmpType__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./CmpType */ "./src/js/cmp/CmpType.ts");




class DiDoMi {
    constructor(node, scriptUrl, backendCall) {
        this._name = "Didomi.net";
        backendCall.cmpData(7, this._name, scriptUrl, _CmpType__WEBPACK_IMPORTED_MODULE_2__["default"].WAIT_FOR_ASYNC_CALLBACK, true);
        this._cmp = new _CMP__WEBPACK_IMPORTED_MODULE_1__["default"](node, backendCall, this);
    }
    get name() {
        return this._name;
    }
    connect() {
        this._cmp.connect();
    }
    /*
    https://www.marianne.net/, https://www.lavoixdunord.fr/, https://www.tomsguide.fr/, https://www.generation-nt.com/
     */
    handleCmp() {
        // Step 1
        const popup = "div.didomi-popup-container";
        let popupDiv = this._cmp.queryNodeSelector(popup);
        const details = "button#didomi-notice-learn-more-button";
        let detailsButton = this._cmp.queryNodeSelector(details);
        _Utils__WEBPACK_IMPORTED_MODULE_0__["default"].log("detailsButton: " + JSON.stringify(detailsButton));
        // Step1 2
        const refuser = "button.didomi-components-radio__option";
        let refuserButton = this._cmp.queryNodeSelectorAll(refuser);
        _Utils__WEBPACK_IMPORTED_MODULE_0__["default"].log("refuserButton length: " + refuserButton.length);
        const enregistrer = "button.didomi-components-button";
        let enregistrerButton = this._cmp.queryNodeSelectorAll(enregistrer);
        _Utils__WEBPACK_IMPORTED_MODULE_0__["default"].log("enregistrer length: " + enregistrer.length);
        _Utils__WEBPACK_IMPORTED_MODULE_0__["default"].log("State: " + this._cmp.state);
        if (_Utils__WEBPACK_IMPORTED_MODULE_0__["default"].objectClickable(detailsButton) && _Utils__WEBPACK_IMPORTED_MODULE_0__["default"].objectClickable(popupDiv) && this._cmp.state === 0) {
            _Utils__WEBPACK_IMPORTED_MODULE_0__["default"].log("Clicking on Details");
            detailsButton.click();
            this._cmp.state = 1;
        }
        else if (refuserButton.length > 0 && _Utils__WEBPACK_IMPORTED_MODULE_0__["default"].objectClickable(popupDiv) && this._cmp.state === 1) {
            _Utils__WEBPACK_IMPORTED_MODULE_0__["default"].log("Looking for Span1");
            let clicked = false;
            refuserButton.forEach(function (span) {
                _Utils__WEBPACK_IMPORTED_MODULE_0__["default"].log(span.innerHTML);
                if (span.innerHTML.toLowerCase().includes("refuser") || span.innerHTML.toLowerCase().includes("disagree")) {
                    span.click();
                    _Utils__WEBPACK_IMPORTED_MODULE_0__["default"].log("Clicked on Refuser/Disagree");
                    clicked = true;
                }
            });
            if (clicked) {
                _Utils__WEBPACK_IMPORTED_MODULE_0__["default"].log("Clicked, update set");
                this._cmp.state = 2;
            }
        }
        else if (enregistrerButton.length > 0 && _Utils__WEBPACK_IMPORTED_MODULE_0__["default"].objectClickable(popupDiv) && this._cmp.state === 2) {
            _Utils__WEBPACK_IMPORTED_MODULE_0__["default"].log("Looking for Save/Enregistre");
            let clicked = false;
            enregistrerButton.forEach(function (span) {
                _Utils__WEBPACK_IMPORTED_MODULE_0__["default"].log(span.innerHTML);
                if (span.innerHTML.toLowerCase().includes("enregistrer") || span.innerHTML.toLowerCase().includes("save")) {
                    span.click();
                    _Utils__WEBPACK_IMPORTED_MODULE_0__["default"].log("Clicked on Enregistrer/Save");
                    clicked = true;
                }
            });
            if (clicked) {
                _Utils__WEBPACK_IMPORTED_MODULE_0__["default"].log("Clicked, reset now");
                this._cmp.reset();
            }
        }
    }
}


/***/ }),

/***/ "./src/js/cmp/Evidon.ts":
/*!******************************!*\
  !*** ./src/js/cmp/Evidon.ts ***!
  \******************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Evidon; });
/* harmony import */ var _Utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../Utils */ "./src/js/Utils.ts");
/* harmony import */ var _CMP__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./CMP */ "./src/js/cmp/CMP.ts");
/* harmony import */ var _CmpType__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./CmpType */ "./src/js/cmp/CmpType.ts");

var __awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};



class Evidon {
    constructor(node, scriptUrl, backendCall) {
        this._name = "Evidon, Inc.";
        this._trigger1 = false;
        backendCall.cmpData(18, this._name, scriptUrl, _CmpType__WEBPACK_IMPORTED_MODULE_2__["default"].DO_NOT_WAIT, true);
        this._cmp = new _CMP__WEBPACK_IMPORTED_MODULE_1__["default"](node, backendCall, this);
    }
    get name() {
        return this._name;
    }
    connect() {
        this._cmp.connect();
    }
    handleCmp() {
        return __awaiter(this, void 0, void 0, function* () {
            const evidonOptions = "button#_evidon-option-button";
            let evidonOptionsButton = this._cmp.queryNodeSelector(evidonOptions);
            const evidonDecline = "button#evidon-prefdiag-decline";
            let evidonDenyAllButton = this._cmp.queryNodeSelector(evidonDecline);
            const evidonL2Decline = "button#evidon-l2-decline-button";
            let evidonL2DeclineButton = this._cmp.queryNodeSelector(evidonL2Decline);
            const evidonCookieBannerNext = "span#_evidon-banner-cookiebuttontext";
            let evidonCookieBannerNextSpan = this._cmp.queryNodeSelector(evidonCookieBannerNext);
            // we do require 3 attempts to decline the tracking
            if (_Utils__WEBPACK_IMPORTED_MODULE_0__["default"].objectClickable(evidonOptionsButton) && !this._trigger1) {
                this._trigger1 = true;
                yield this.sleep(1000);
                _Utils__WEBPACK_IMPORTED_MODULE_0__["default"].log("Button 1, 300 ms waited. Trigger released");
                this._trigger1 = false;
                evidonOptionsButton.click();
            }
            // we do require 3 attempts to decline the tracking
            if (_Utils__WEBPACK_IMPORTED_MODULE_0__["default"].objectClickable(evidonCookieBannerNextSpan) && !this._trigger1) {
                this._trigger1 = true;
                yield this.sleep(1000);
                _Utils__WEBPACK_IMPORTED_MODULE_0__["default"].log("Button 2, 300 ms waited. Trigger released");
                this._trigger1 = false;
                evidonCookieBannerNextSpan.click();
            }
            if (_Utils__WEBPACK_IMPORTED_MODULE_0__["default"].objectClickable(evidonL2DeclineButton) && !this._trigger1) {
                this._trigger1 = true;
                yield this.sleep(1000);
                _Utils__WEBPACK_IMPORTED_MODULE_0__["default"].log("Button 3, 300 ms waited. Trigger released");
                this._trigger1 = false;
                evidonL2DeclineButton.click();
                // example evidon page here we do have a defined end.
                this._cmp.reset();
            }
            // Crownpeak => "options" by accident is the "decline" button, so options open ...
            if (_Utils__WEBPACK_IMPORTED_MODULE_0__["default"].objectClickable(evidonDenyAllButton) && !this._trigger1) {
                this._trigger1 = true;
                yield this.sleep(1000);
                _Utils__WEBPACK_IMPORTED_MODULE_0__["default"].log("Button 4, 300 ms waited. Trigger released");
                this._trigger1 = false;
                evidonDenyAllButton.click();
                // example Crownpeak here we do have a defined end.
                this._cmp.reset();
            }
        });
    }
    sleep(milliseconds) {
        return new Promise(resolve => setTimeout(resolve, milliseconds));
    }
}


/***/ }),

/***/ "./src/js/cmp/NoYetImplementedCmp.ts":
/*!*******************************************!*\
  !*** ./src/js/cmp/NoYetImplementedCmp.ts ***!
  \*******************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return NotYetImplementedCmp; });
/* harmony import */ var _CMP__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./CMP */ "./src/js/cmp/CMP.ts");
/* harmony import */ var _CmpType__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./CmpType */ "./src/js/cmp/CmpType.ts");



class NotYetImplementedCmp {
    constructor(cmpId, node, name, scriptUrl, backendCall) {
        this._name = name;
        backendCall.cmpData(cmpId, this._name, scriptUrl, _CmpType__WEBPACK_IMPORTED_MODULE_1__["default"].WAIT_FOR_TIME_FRAME, false);
        this._cmp = new _CMP__WEBPACK_IMPORTED_MODULE_0__["default"](node, backendCall, this);
    }
    get name() {
        return this._name;
    }
    connect() {
        this._cmp.connect();
    }
    handleCmp() {
        this._cmp.reset();
    }
}


/***/ }),

/***/ "./src/js/cmp/OathCmp.ts":
/*!*******************************!*\
  !*** ./src/js/cmp/OathCmp.ts ***!
  \*******************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return OathCmp; });
/* harmony import */ var _Utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../Utils */ "./src/js/Utils.ts");
/* harmony import */ var _CMP__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./CMP */ "./src/js/cmp/CMP.ts");
/* harmony import */ var _CmpType__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./CmpType */ "./src/js/cmp/CmpType.ts");




class OathCmp {
    constructor(node, scriptUrl, backendCall) {
        this._name = "Oath Limited";
        backendCall.cmpData(14, this._name, scriptUrl, _CmpType__WEBPACK_IMPORTED_MODULE_2__["default"].DO_NOT_WAIT, true);
        this._cmp = new _CMP__WEBPACK_IMPORTED_MODULE_1__["default"](node, backendCall, this);
    }
    get name() {
        return this._name;
    }
    connect() {
        this._cmp.connect();
    }
    /*
    - [tomshardware](https://www.tomshardware.com)
    - [techradar](https://global.techradar.com/de-de)
    */
    handleCmp() {
        const moreInformation = '#mainMoreInfo';
        let moreInformationButton = this._cmp.queryNodeSelector(moreInformation);
        const rejectAll = "button.cmp-btn-rejectall";
        let rejectAllButton = this._cmp.queryNodeSelector(rejectAll);
        const leave = "#confirmLeave";
        let leaveButton = this._cmp.queryNodeSelector(leave);
        if (_Utils__WEBPACK_IMPORTED_MODULE_0__["default"].objectClickable(moreInformationButton) && this._cmp.state === 0) {
            _Utils__WEBPACK_IMPORTED_MODULE_0__["default"].log("Button 1 found");
            moreInformationButton.click();
            this._cmp.state = 1;
        }
        else if (_Utils__WEBPACK_IMPORTED_MODULE_0__["default"].objectClickable(rejectAllButton) && this._cmp.state === 1) {
            _Utils__WEBPACK_IMPORTED_MODULE_0__["default"].log("Button 2 found");
            rejectAllButton.click();
            this._cmp.state = 2;
        }
        else if (_Utils__WEBPACK_IMPORTED_MODULE_0__["default"].objectClickable(leaveButton) && this._cmp.state === 2) {
            _Utils__WEBPACK_IMPORTED_MODULE_0__["default"].log("Button 3 found");
            leaveButton.click();
            this._cmp.reset();
        }
    }
}


/***/ }),

/***/ "./src/js/cmp/OneTrust.ts":
/*!********************************!*\
  !*** ./src/js/cmp/OneTrust.ts ***!
  \********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return OneTrust; });
/* harmony import */ var _Utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../Utils */ "./src/js/Utils.ts");
/* harmony import */ var _CMP__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./CMP */ "./src/js/cmp/CMP.ts");
/* harmony import */ var _CmpType__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./CmpType */ "./src/js/cmp/CmpType.ts");




class OneTrust {
    constructor(node, scriptUrl, backendCall) {
        this._name = "OneTrust LLC";
        backendCall.cmpData(28, this._name, scriptUrl, _CmpType__WEBPACK_IMPORTED_MODULE_2__["default"].WAIT_FOR_TIME_FRAME, true);
        this._cmp = new _CMP__WEBPACK_IMPORTED_MODULE_1__["default"](node, backendCall, this);
    }
    get name() {
        return this._name;
    }
    connect() {
        this._cmp.connect();
    }
    handleCmp() {
        const optanonDetailsSelectorV1 = "button#onetrust-pc-btn-handler";
        let optananDetailsV1 = this._cmp.queryNodeSelector(optanonDetailsSelectorV1);
        const optanonSaveSettingsSelectorV1 = "button.save-preference-btn-handler";
        let optanonSaveSettingsV1 = this._cmp.queryNodeSelector(optanonSaveSettingsSelectorV1);
        const optanonCheckBoxesSelectorV1 = "input[type*='checkbox'].switch-checkbox";
        let optanonCheckboxesV1 = this._cmp.queryNodeSelectorAll(optanonCheckBoxesSelectorV1);
        const optanonDetailsV2 = "button.optanon-toggle-display";
        let optanonDetailsButtonV2 = this._cmp.queryNodeSelector(optanonDetailsV2);
        // this button is crappy to find, as there is no ID or class.
        const optanonSaveSettingsSelectorV2 = "button[onclick*='Save']"; //button.optanon-save-settings-button
        let optanonSaveSettingsV2 = this._cmp.queryNodeSelector(optanonSaveSettingsSelectorV2);
        const optanonListItemsSelectorV2 = "li.menu-item-on";
        let optanonListItemsV2 = this._cmp.queryNodeSelectorAll(optanonListItemsSelectorV2);
        const optanonCheckboxesSelectorV2 = "input[type*='checkbox']";
        let optanonCheckBoxesV2 = this._cmp.queryNodeSelectorAll(optanonCheckboxesSelectorV2);
        // this button is crappy to find, as there is no ID or class.
        const optanonSaveSettingsSelectorV3 = "button.save-preference-btn-handler"; //button.optanon-save-settings-button
        let optanonSaveSettingsV3 = this._cmp.queryNodeSelector(optanonSaveSettingsSelectorV3);
        const optanonListItemsSelectorV3 = "div.category-menu-switch-handler";
        let optanonListItemsV3 = this._cmp.queryNodeSelectorAll(optanonListItemsSelectorV3);
        const optanonOnetrustRejectAllandler = "button#onetrust-reject-all-handler";
        let optanonOnetrustRejectAllandlerButton = this._cmp.queryNodeSelector(optanonOnetrustRejectAllandler);
        const optanonBannerPolicy = "a.banner-policy-link";
        let optanonBannerPolicyLink = this._cmp.queryNodeSelectorAll(optanonBannerPolicy);
        // Variante 3 (Single-Press is prefered over others
        if (_Utils__WEBPACK_IMPORTED_MODULE_0__["default"].objectClickable(optanonOnetrustRejectAllandlerButton) && this._cmp.state === 0) {
            _Utils__WEBPACK_IMPORTED_MODULE_0__["default"].log("V3 (first click)");
            optanonOnetrustRejectAllandlerButton.click();
            _Utils__WEBPACK_IMPORTED_MODULE_0__["default"].log("Reject all clicked");
            this._cmp.state = 1;
        }
        else if (_Utils__WEBPACK_IMPORTED_MODULE_0__["default"].objectClickable(optanonOnetrustRejectAllandlerButton) && this._cmp.state === 1) {
            _Utils__WEBPACK_IMPORTED_MODULE_0__["default"].log("V3 (second click)");
            optanonOnetrustRejectAllandlerButton.click();
            _Utils__WEBPACK_IMPORTED_MODULE_0__["default"].log("Reject all clicked");
            this._cmp.reset();
        }
        // Variant 1
        // https://www.wienerzeitung.at/
        else if (_Utils__WEBPACK_IMPORTED_MODULE_0__["default"].objectClickable(optananDetailsV1) && this._cmp.state === 0) {
            _Utils__WEBPACK_IMPORTED_MODULE_0__["default"].log("V1");
            setTimeout(function () {
                optananDetailsV1.click();
            }, 1000);
            _Utils__WEBPACK_IMPORTED_MODULE_0__["default"].log("Details clicked V1");
            this._cmp.state = 1;
        }
        // https://www.oralb.de/de-de
        else if (optanonBannerPolicy.length > 1 && _Utils__WEBPACK_IMPORTED_MODULE_0__["default"].objectClickable(optanonBannerPolicyLink[1]) && this._cmp.state === 0) {
            _Utils__WEBPACK_IMPORTED_MODULE_0__["default"].log("V1.1");
            optanonBannerPolicyLink[1].click();
            _Utils__WEBPACK_IMPORTED_MODULE_0__["default"].log("Details clicked V1.1");
            this._cmp.state = 1;
        }
        // https://arstechnica.com/,   https://www.glassdoor.de/, https://asmp.a1.net/, https://www.zdnet.com/
        else if (_Utils__WEBPACK_IMPORTED_MODULE_0__["default"].objectClickable(optanonSaveSettingsV1) && optanonCheckboxesV1.length && this._cmp.state === 1) {
            _Utils__WEBPACK_IMPORTED_MODULE_0__["default"].log("Amount of Checkboxes V1: " + optanonCheckboxesV1.length);
            optanonCheckboxesV1.forEach(function (checkbox) {
                checkbox.setAttribute("checked", "false");
                _Utils__WEBPACK_IMPORTED_MODULE_0__["default"].log("Checkbox unset V1");
            });
            setTimeout(function () {
                optanonSaveSettingsV1.click();
            }, 1000);
            _Utils__WEBPACK_IMPORTED_MODULE_0__["default"].log("Save Settings Clicked click V1");
            // this._cmp.state = 2;
            this._cmp.reset();
        }
        // https://de.coursera.org/,  https://www.home24.de/, https://www.thoughtworks.com/, https://jobs.netflix.com/
        else if (_Utils__WEBPACK_IMPORTED_MODULE_0__["default"].objectClickable(optanonSaveSettingsV3) && this._cmp.state === 1) {
            _Utils__WEBPACK_IMPORTED_MODULE_0__["default"].log("Save Button V3 found");
            optanonListItemsV3.forEach(function (listItem) {
                listItem.click();
                _Utils__WEBPACK_IMPORTED_MODULE_0__["default"].log("Checkbox unset V3");
                optanonCheckBoxesV2.forEach(function (checkbox) {
                    checkbox.setAttribute("checked", "false");
                    _Utils__WEBPACK_IMPORTED_MODULE_0__["default"].log("Checkbox unset V3");
                });
            });
            optanonSaveSettingsV3.click();
            this._cmp.reset();
        }
        else if (_Utils__WEBPACK_IMPORTED_MODULE_0__["default"].objectClickable(optanonOnetrustRejectAllandlerButton) && this._cmp.state === 2) {
            _Utils__WEBPACK_IMPORTED_MODULE_0__["default"].log("V1 (second click)");
            optanonOnetrustRejectAllandlerButton.click();
            _Utils__WEBPACK_IMPORTED_MODULE_0__["default"].log("Reject all clicked");
            this._cmp.reset();
        }
        // Variant 2
        // https://www.mona.nl/, https://www.allianz.de/, https://www.springer.com/gp, https://www.haglofs.com/de/de-de/, https://www.thesaurus.com/, https://www.atlassian.com/de/agile/agile-at-scale/okr
        else if (_Utils__WEBPACK_IMPORTED_MODULE_0__["default"].objectClickable(optanonDetailsButtonV2) && this._cmp.state === 0) {
            _Utils__WEBPACK_IMPORTED_MODULE_0__["default"].log("V2");
            optanonDetailsButtonV2.click();
            _Utils__WEBPACK_IMPORTED_MODULE_0__["default"].log("Details clicked");
            this._cmp.state = 3;
        }
        else if (_Utils__WEBPACK_IMPORTED_MODULE_0__["default"].objectClickable(optanonSaveSettingsV2) && this._cmp.state === 3) {
            _Utils__WEBPACK_IMPORTED_MODULE_0__["default"].log("Save Button V2 found");
            optanonListItemsV2.forEach(function (listItem) {
                listItem.click();
                _Utils__WEBPACK_IMPORTED_MODULE_0__["default"].log("Checkbox unset V2");
                optanonCheckBoxesV2.forEach(function (checkbox) {
                    checkbox.setAttribute("checked", "false");
                    _Utils__WEBPACK_IMPORTED_MODULE_0__["default"].log("Checkbox unset V2");
                });
            });
            optanonSaveSettingsV2.click();
            this._cmp.reset();
        }
    }
}


/***/ }),

/***/ "./src/js/cmp/QuantCast.ts":
/*!*********************************!*\
  !*** ./src/js/cmp/QuantCast.ts ***!
  \*********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return QuantCast; });
/* harmony import */ var _Utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../Utils */ "./src/js/Utils.ts");
/* harmony import */ var _CMP__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./CMP */ "./src/js/cmp/CMP.ts");
/* harmony import */ var _CmpType__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./CmpType */ "./src/js/cmp/CmpType.ts");




class QuantCast {
    constructor(node, scriptUrl, backendCall) {
        this._name = "Quantcast International Limited";
        backendCall.cmpData(10, this._name, scriptUrl, _CmpType__WEBPACK_IMPORTED_MODULE_2__["default"].WAIT_FOR_ASYNC_CALLBACK, true);
        this._cmp = new _CMP__WEBPACK_IMPORTED_MODULE_1__["default"](node, backendCall, this);
    }
    get name() {
        return this._name;
    }
    connect() {
        this._cmp.connect();
    }
    /*
        https://wwd.com/
        https://www.quantcast.com/ => TODO
     */
    handleCmp() {
        const purpose = "a#qc-cmp-purpose-button";
        let purposeButton = this._cmp.queryNodeSelector(purpose);
        const denyAll = "button.qc-cmp-enable-button";
        let denyAllButton = this._cmp.queryNodeSelector(denyAll);
        const save = "button.qc-cmp-save-and-exit";
        let saveButton = this._cmp.queryNodeSelector(save);
        const rejectAll = "button.qc-cmp-secondary-button";
        let rejectAllButton = this._cmp.queryNodeSelector(rejectAll);
        // press on "Options"
        if (_Utils__WEBPACK_IMPORTED_MODULE_0__["default"].objectClickable(purposeButton) && this._cmp.state === 0) {
            this._cmp.state = 1;
            purposeButton.click();
        }
        // disable all
        else if (_Utils__WEBPACK_IMPORTED_MODULE_0__["default"].objectClickable(denyAllButton) && this._cmp.state === 1) {
            this._cmp.state = 2;
            denyAllButton.click();
        }
        // save settings
        else if (_Utils__WEBPACK_IMPORTED_MODULE_0__["default"].objectClickable(saveButton) && this._cmp.state === 2) {
            saveButton.click();
            this._cmp.reset();
        }
        // separated Branch, if there is "Reject-All Button"
        else if (_Utils__WEBPACK_IMPORTED_MODULE_0__["default"].objectClickable(rejectAllButton) && this._cmp.state === 0) {
            rejectAllButton.click();
            this._cmp.reset();
        }
    }
}


/***/ }),

/***/ "./src/js/cmp/SourcePoint.ts":
/*!***********************************!*\
  !*** ./src/js/cmp/SourcePoint.ts ***!
  \***********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return SourcePoint; });
/* harmony import */ var _Utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../Utils */ "./src/js/Utils.ts");
/* harmony import */ var _CMP__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./CMP */ "./src/js/cmp/CMP.ts");
/* harmony import */ var _CmpType__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./CmpType */ "./src/js/cmp/CmpType.ts");




class SourcePoint {
    constructor(node, scriptUrl, backendCall) {
        this._name = "Sourcepoint Technologies, Inc.";
        this._firstStepCompleted = false;
        this._secondStepCompleted = false;
        backendCall.cmpData(6, this._name, scriptUrl, _CmpType__WEBPACK_IMPORTED_MODULE_2__["default"].DO_NOT_WAIT, true);
        this._cmp = new _CMP__WEBPACK_IMPORTED_MODULE_1__["default"](node, backendCall, this);
    }
    get name() {
        return this._name;
    }
    connect() {
        this._cmp.connect();
    }
    // Sample: https://www.stornowaygazette.co.uk/, https://www.thetimes.co.uk/, https://www.duden.de/
    // https://notice.sp-prod.net/?message_id=116465&amp;mms_origin=https://cmp.stornowaygazette.co.uk/mms/v2%22%20id=%22sp_message_iframe_116465
    // https://notice.sp-prod.net/?message_id=101175&amp;mms_origin=https://cmp.thetimes.co.uk/mms/v2%22%20id=%22sp_message_iframe_101175
    // https://www.openthesaurus.de/ => not working.
    handleCmp() {
        // This is the first Iframe, we need to handle. Here we click on details.
        // for some reason the Observer does not detect the changes.
        if (document.location.toString().includes("sp-prod.net") && !this._firstStepCompleted) {
            _Utils__WEBPACK_IMPORTED_MODULE_0__["default"].log("in 1st IFrame");
            let _self = this;
            let _counter = 0;
            this._firstTimeout = setTimeout(function () {
                _self.firstButton(_self, _counter);
            }, 1000);
        }
        // This is the Second Iframe, we need to handle. Here we uncheck all the checkboxes and save.
        // for some reason the Observer does not detect the changes.
        if (document.location.toString().includes("sourcepoint.mgr.consensu.org") && !this._secondStepCompleted) {
            _Utils__WEBPACK_IMPORTED_MODULE_0__["default"].log("in 2nd IFrame");
            let _self = this;
            let _counter = 0;
            this._secondTimeout = setTimeout(function () {
                _self.secondButton(_self, _counter);
            }, 1000);
        }
    }
    firstButton(_self, _counter) {
        const allpopup = "button.message-button";
        let allpopupButtons = _self._cmp.queryNodeSelectorAll(allpopup);
        // press on "Options"
        if (_Utils__WEBPACK_IMPORTED_MODULE_0__["default"].objectClickable(allpopupButtons[0]) && allpopupButtons.length > 0) {
            _Utils__WEBPACK_IMPORTED_MODULE_0__["default"].log("Details clicked.");
            _counter = 51;
            _self._firstStepCompleted = true;
            clearTimeout(_self._firstTimeout);
            allpopupButtons[0].click();
        }
        else if (_counter < 50) {
            _self._firstTimeout = setTimeout(function () {
                _self.secondButton(_self, _counter);
            }, 1000);
            _counter++;
            _Utils__WEBPACK_IMPORTED_MODULE_0__["default"].log("Counter: (1st Button)" + _counter);
        }
    }
    secondButton(_self, _counter) {
        const switchesAll = "div.sp-switch-arrow-block";
        let switchesAllDiv = _self._cmp.queryNodeSelectorAll(switchesAll);
        _Utils__WEBPACK_IMPORTED_MODULE_0__["default"].log("All switchesAll: " + switchesAllDiv.length);
        const switchesOn = "div.sp-switch-arrow-block a.on";
        let switchesOnDiv = _self._cmp.queryNodeSelectorAll(switchesOn);
        _Utils__WEBPACK_IMPORTED_MODULE_0__["default"].log("On switchesAll: " + switchesOnDiv.length);
        const save = "button.priv-save-btn";
        let saveButton = _self._cmp.queryNodeSelector(save);
        _Utils__WEBPACK_IMPORTED_MODULE_0__["default"].log("Save Button: " + saveButton);
        const save2 = "button#tab-saveandexit";
        let saveButton2 = _self._cmp.queryNodeSelector(save2);
        _Utils__WEBPACK_IMPORTED_MODULE_0__["default"].log("Save2 Button: " + saveButton2);
        // if there is at least one switch and if there is at least on switch "ON"
        if (switchesAllDiv.length > 0 && (_Utils__WEBPACK_IMPORTED_MODULE_0__["default"].objectClickable(saveButton) || _Utils__WEBPACK_IMPORTED_MODULE_0__["default"].objectClickable(saveButton2))) {
            // if there as switches to switch off, do so.
            if (switchesOnDiv.length > 0) {
                switchesOnDiv.forEach((href) => {
                    _Utils__WEBPACK_IMPORTED_MODULE_0__["default"].log("Changing Button from ON to Off");
                    href.click();
                });
            }
            // now confirm.
            if (_Utils__WEBPACK_IMPORTED_MODULE_0__["default"].objectClickable(saveButton)) {
                saveButton.click();
            }
            else {
                saveButton2.click();
            }
            _counter = 51;
            _self._secondStepCompleted = true;
            clearTimeout(_self._secondTimeout);
            _self._cmp.reset();
        }
        else if (_counter < 50) {
            _self._secondTimeout = setTimeout(function () {
                _self.secondButton(_self, _counter);
            }, 1000);
            _counter++;
            _Utils__WEBPACK_IMPORTED_MODULE_0__["default"].log("Counter (2nd Button): " + _counter);
        }
    }
}


/***/ }),

/***/ "./src/js/cmp/Traffective.ts":
/*!***********************************!*\
  !*** ./src/js/cmp/Traffective.ts ***!
  \***********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Traffective; });
/* harmony import */ var _Utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../Utils */ "./src/js/Utils.ts");
/* harmony import */ var _CMP__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./CMP */ "./src/js/cmp/CMP.ts");
/* harmony import */ var _CmpType__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./CmpType */ "./src/js/cmp/CmpType.ts");




class Traffective {
    constructor(node, scriptUrl, backendCall) {
        this._name = "Traffective GmbH";
        backendCall.cmpData(21, this._name, scriptUrl, _CmpType__WEBPACK_IMPORTED_MODULE_2__["default"].WAIT_FOR_ASYNC_CALLBACK, true);
        this._cmp = new _CMP__WEBPACK_IMPORTED_MODULE_1__["default"](node, backendCall, this);
    }
    get name() {
        return this._name;
    }
    connect() {
        this._cmp.connect();
    }
    // https://www.mactechnews.de/
    handleCmp() {
        const gdprDiv = 'div.gdpr_popup_popup';
        let popup = this._cmp.queryNodeSelector(gdprDiv);
        const gdprCheckBoxes = 'input[type=checkbox].gdpr_switch_native';
        let checkboxes = this._cmp.queryNodeSelectorAll(gdprCheckBoxes);
        const gdprSaveButton = 'div.is-primary-button';
        let saveButton = this._cmp.queryNodeSelector(gdprSaveButton);
        if (_Utils__WEBPACK_IMPORTED_MODULE_0__["default"].objectVisible(popup) && this._cmp.state === 0) {
            _Utils__WEBPACK_IMPORTED_MODULE_0__["default"].log('Checkboxes found: ' + checkboxes.length);
            checkboxes.forEach((checkbox) => checkbox.setAttribute("checked", "false"), _Utils__WEBPACK_IMPORTED_MODULE_0__["default"].log("Checkbox unset"));
            this._cmp.state = 1;
        }
        else if (_Utils__WEBPACK_IMPORTED_MODULE_0__["default"].objectClickable(saveButton) && this._cmp.state === 1) {
            _Utils__WEBPACK_IMPORTED_MODULE_0__["default"].log('Button found ...');
            saveButton.click();
            this._cmp.reset();
        }
    }
}


/***/ }),

/***/ "./src/js/cmp/TrustArcBanner.ts":
/*!**************************************!*\
  !*** ./src/js/cmp/TrustArcBanner.ts ***!
  \**************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return TrustArcBanner; });
/* harmony import */ var _Utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../Utils */ "./src/js/Utils.ts");
/* harmony import */ var _CMP__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./CMP */ "./src/js/cmp/CMP.ts");
/* harmony import */ var _CmpType__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./CmpType */ "./src/js/cmp/CmpType.ts");




class TrustArcBanner {
    constructor(node, scriptUrl, backendCall) {
        this._name = "TrustArc Inc (Banner)";
        backendCall.cmpData(41, this._name, scriptUrl, _CmpType__WEBPACK_IMPORTED_MODULE_2__["default"].DO_NOT_WAIT, true);
        this._cmp = new _CMP__WEBPACK_IMPORTED_MODULE_1__["default"](node, backendCall, this);
    }
    get name() {
        return this._name;
    }
    connect() {
        this._cmp.connect();
    }
    handleCmp() {
        const content = "#truste-consent-content, .truste-consent-content";
        let contentDiv = this._cmp.queryNodeSelector(content);
        const required = "#truste-show-consent";
        let requiredButton = this._cmp.queryNodeSelector(required);
        _Utils__WEBPACK_IMPORTED_MODULE_0__["default"].log("details: " + requiredButton);
        _Utils__WEBPACK_IMPORTED_MODULE_0__["default"].log("State: " + this._cmp.state);
        if (_Utils__WEBPACK_IMPORTED_MODULE_0__["default"].objectClickable(requiredButton) && _Utils__WEBPACK_IMPORTED_MODULE_0__["default"].objectClickable(contentDiv) && this._cmp.state === 0) {
            _Utils__WEBPACK_IMPORTED_MODULE_0__["default"].log("detailsButton clicked");
            this.delayedClick(0);
            this._cmp.state = 1;
        }
    }
    delayedClick(count) {
        const required = "#truste-show-consent";
        let requiredButton = this._cmp.queryNodeSelector(required);
        requiredButton.click();
        _Utils__WEBPACK_IMPORTED_MODULE_0__["default"].log("Current Count:" + count);
        if (count < 1) {
            let _self = this;
            setTimeout(function () {
                _self.delayedClick(count + 1);
                _Utils__WEBPACK_IMPORTED_MODULE_0__["default"].log("Clicked");
            }, 1000);
        }
        else {
            _Utils__WEBPACK_IMPORTED_MODULE_0__["default"].log("maximum reached");
            this._cmp.reset();
        }
    }
}


/***/ }),

/***/ "./src/js/cmp/TrustArcIFrame.ts":
/*!**************************************!*\
  !*** ./src/js/cmp/TrustArcIFrame.ts ***!
  \**************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return TrustArcIFrame; });
/* harmony import */ var _Utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../Utils */ "./src/js/Utils.ts");
/* harmony import */ var _CMP__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./CMP */ "./src/js/cmp/CMP.ts");
/* harmony import */ var _CmpType__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./CmpType */ "./src/js/cmp/CmpType.ts");




class TrustArcIFrame {
    constructor(node, scriptUrl, backendCall) {
        this._name = "TrustArc Inc (IFrame)";
        backendCall.cmpData(41, this._name, scriptUrl, _CmpType__WEBPACK_IMPORTED_MODULE_2__["default"].DO_NOT_WAIT, true);
        this._cmp = new _CMP__WEBPACK_IMPORTED_MODULE_1__["default"](node, backendCall, this);
    }
    get name() {
        return this._name;
    }
    connect() {
        this._cmp.connect();
    }
    /*

        https://docs.oracle.com/
        https://newsroom.ibm.com/

     */
    handleCmp() {
        // from within IFrame
        const moreInformation = ".shp";
        let moreInformationButton = this._cmp.queryNodeSelector(moreInformation);
        const advanced = ".advance";
        let advancedButton = this._cmp.queryNodeSelector(advanced);
        _Utils__WEBPACK_IMPORTED_MODULE_0__["default"].log("advanced: " + advancedButton);
        const spanOn = '.on';
        let spanOnGroup = this._cmp.queryNodeSelectorAll(spanOn);
        _Utils__WEBPACK_IMPORTED_MODULE_0__["default"].log(spanOnGroup);
        _Utils__WEBPACK_IMPORTED_MODULE_0__["default"].log("Span on Group Length: " + spanOnGroup.length);
        const submit = ".submit";
        let submitButton = this._cmp.queryNodeSelector(submit);
        _Utils__WEBPACK_IMPORTED_MODULE_0__["default"].log("submit: '" + submitButton + "' " + JSON.stringify(submitButton));
        const close = ".close";
        let closeButton = this._cmp.queryNodeSelector(close);
        _Utils__WEBPACK_IMPORTED_MODULE_0__["default"].log("Close: " + closeButton);
        _Utils__WEBPACK_IMPORTED_MODULE_0__["default"].log("State: " + this._cmp.state);
        if (_Utils__WEBPACK_IMPORTED_MODULE_0__["default"].objectClickable(moreInformationButton) && this._cmp.state < 1) {
            _Utils__WEBPACK_IMPORTED_MODULE_0__["default"].log("moreInformationButton clicked");
            moreInformationButton.click();
            this._cmp.state = 1;
        }
        else if (_Utils__WEBPACK_IMPORTED_MODULE_0__["default"].objectClickable(advancedButton) && this._cmp.state < 2) {
            _Utils__WEBPACK_IMPORTED_MODULE_0__["default"].log("advanced clicked");
            advancedButton.click();
            this._cmp.state = 2;
        }
        else if (spanOnGroup && spanOnGroup.length > 1 && this._cmp.state < 3) {
            spanOnGroup.forEach((span) => {
                _Utils__WEBPACK_IMPORTED_MODULE_0__["default"].log("Changing Button");
                span.click();
            });
            this._cmp.state = 3;
        }
        else if (_Utils__WEBPACK_IMPORTED_MODULE_0__["default"].objectClickable(submitButton) && this._cmp.state === 3) {
            _Utils__WEBPACK_IMPORTED_MODULE_0__["default"].log("Click Submit");
            submitButton.click();
            this._cmp.state = 4;
        }
        else if (_Utils__WEBPACK_IMPORTED_MODULE_0__["default"].objectClickable(closeButton) && this._cmp.state === 4) {
            _Utils__WEBPACK_IMPORTED_MODULE_0__["default"].log("closeButton clicked");
            closeButton.click();
            this._cmp.reset();
        }
    }
}


/***/ }),

/***/ "./src/js/cmp/UserCentrics.ts":
/*!************************************!*\
  !*** ./src/js/cmp/UserCentrics.ts ***!
  \************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return UserCentrics; });
/* harmony import */ var _Utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../Utils */ "./src/js/Utils.ts");
/* harmony import */ var _CMP__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./CMP */ "./src/js/cmp/CMP.ts");
/* harmony import */ var _CmpType__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./CmpType */ "./src/js/cmp/CmpType.ts");




class UserCentrics {
    constructor(node, scriptUrl, backendCall) {
        this._name = "Usercentrics GmbH";
        backendCall.cmpData(5, this._name, scriptUrl, _CmpType__WEBPACK_IMPORTED_MODULE_2__["default"].WAIT_FOR_ASYNC_CALLBACK, true);
        this._cmp = new _CMP__WEBPACK_IMPORTED_MODULE_1__["default"](node, backendCall, this);
    }
    get name() {
        return this._name;
    }
    connect() {
        this._cmp.connect();
    }
    handleCmp() {
        // we are looking for a banner and if this banner is visible, we then inject the javascript.
        const ucBannerContent = 'div.uc-banner-content';
        let banner = this._cmp.queryNodeSelector(ucBannerContent);
        // typeof button !== 'undefined' && button && typeof button.parentElement !== 'undefined'
        // case like on hse24.de
        if (_Utils__WEBPACK_IMPORTED_MODULE_0__["default"].objectVisible(banner) && this._cmp.state === 0) {
            _Utils__WEBPACK_IMPORTED_MODULE_0__["default"].log('Deny All button found');
            let script = this._cmp.node.createElement('script');
            script.type = 'text/javascript';
            script.async = true;
            script.text = 'function s(counter){if(counter >= 100){return; } if(typeof this.usercentrics !== "undefined" && typeof this.usercentrics.denyAllConsentsAndCloseInitialView !== "undefined"){ this.usercentrics.denyAllConsentsAndCloseInitialView(); } else { setTimeout(function() {s(counter + 1)}, 25);  }}; s(1);';
            this._cmp.node.head.appendChild(script);
            this._cmp.reset();
        }
    }
}


/***/ }),

/***/ "./src/js/contentscript.ts":
/*!*********************************!*\
  !*** ./src/js/contentscript.ts ***!
  \*********************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _Detector__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Detector */ "./src/js/Detector.ts");
/* harmony import */ var _Utils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Utils */ "./src/js/Utils.ts");



// This is required as for Safari the script is injected at the beginning. For Chrome is at the end.
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', afterDOMLoaded);
}
else {
    afterDOMLoaded();
}
function afterDOMLoaded() {
    if (typeof safari !== 'undefined') {
        _Utils__WEBPACK_IMPORTED_MODULE_1__["default"].log("+++ Running on Safari +++");
    }
    else if (typeof chrome !== 'undefined') {
        _Utils__WEBPACK_IMPORTED_MODULE_1__["default"].log("+++ Running on Chromium Platform +++");
    }
    else {
        _Utils__WEBPACK_IMPORTED_MODULE_1__["default"].log("+++ Running on some other Platform +++");
    }
    // only execute the content script
    // - if there is doc type
    // - if there is body with a defined length
    // - if there are some child nodes in the body
    _Utils__WEBPACK_IMPORTED_MODULE_1__["default"].log("Consent Script Parameter: " + JSON.stringify(document.doctype) + ", Len: " + document.body.innerHTML.length + ", Nodes: " + document.body.childNodes.length);
    let inFrame = false;
    try {
        inFrame = window.self !== window.top;
        _Utils__WEBPACK_IMPORTED_MODULE_1__["default"].log("Running in IFrame: " + inFrame);
    }
    catch (e) {
        _Utils__WEBPACK_IMPORTED_MODULE_1__["default"].log("Error Figuring out if we are running in an iFrame");
    }
    /* only process files
       - with a Doc Type
       - which are longer than 100 chars
       - which are HTTPS or HTTP file
     */
    if (document.doctype && document.body.innerHTML.length > 100 && (document.location.href.toLowerCase().startsWith("https://") || document.location.href.toLowerCase().startsWith("http://"))) {
        _Utils__WEBPACK_IMPORTED_MODULE_1__["default"].log("Triggering Content Script");
        const messageFrom = "FROM_MINIMAL_CONSENT";
        // This is the script for checking whether there is a TCF 1.1 or TCF 2.0 compliant CMP.
        let script = document.createElement('script');
        script.type = 'text/javascript';
        script.async = true;
        script.text = 'window.addEventListener("load",checkForCmp,!1);let dataframeForPingReturn={type:"FROM_MINIMAL_CONSENT"},checkForCmpCounter=0,maxTimeoutForResearch=200,maxRetryForSearch=25;function checkForCmp(){this.__cmp?this.__cmp("ping",2,sendMessage):this.__tcfapi?this.__tcfapi("ping",2,sendMessage):this.frames&&this.frames.length&&this.frames.__tcfapiLocator?this.__tcfapi("ping",2,sendMessage):checkForCmpCounter<maxRetryForSearch?(setTimeout(checkForCmp,maxTimeoutForResearch),checkForCmpCounter++):window.removeEventListener("load",checkForCmp,!1)}function sendMessage(e,t){t&&(dataframeForPingReturn.cmp=JSON.stringify(e),window.postMessage(dataframeForPingReturn,"*"),window.removeEventListener("load",checkForCmp,!1))}';
        document.head.appendChild(script);
        const detector = new _Detector__WEBPACK_IMPORTED_MODULE_0__["default"](document, inFrame);
        detector.connectObserver();
        window.addEventListener("message", function (event) {
            // We only accept messages from ourselves
            if (event.source !== window)
                return;
            // only if there TCF 1.1 or TFC 2.0 compliant CMP found, launch the appropriate detector.
            // if the proprietary initialization already worked out, don't initialize the CMP again.
            if (event.data.type && event.data.type === messageFrom) {
                // given the Ping Result to the Detector Object.
                detector.pingResult = event.data.cmp;
            }
        });
    }
}


/***/ }),

/***/ "./src/js/entities/PingResult.ts":
/*!***************************************!*\
  !*** ./src/js/entities/PingResult.ts ***!
  \***************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return PingResult; });
/* harmony import */ var _Utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../Utils */ "./src/js/Utils.ts");


class PingResult {
    constructor(gdprAppliesGlobally, gdprApplies, cmpLoaded, cmpStatus, displayStatus, apiVersion, cmpVersion, cmpId, gvlVersion, tcfPolicyVersion) {
        if (_Utils__WEBPACK_IMPORTED_MODULE_0__["default"].checkIfDefinedAndNotNull(gdprAppliesGlobally)) {
            this._gdprAppliesGlobally = gdprAppliesGlobally;
        }
        if (_Utils__WEBPACK_IMPORTED_MODULE_0__["default"].checkIfDefinedAndNotNull(gdprApplies)) {
            this._gdprApplies = gdprApplies;
        }
        if (_Utils__WEBPACK_IMPORTED_MODULE_0__["default"].checkIfDefinedAndNotNull(cmpLoaded)) {
            this._cmpLoaded = cmpLoaded;
        }
        if (_Utils__WEBPACK_IMPORTED_MODULE_0__["default"].checkIfDefinedAndNotNull(cmpStatus)) {
            this._cmpStatus = cmpStatus;
        }
        if (_Utils__WEBPACK_IMPORTED_MODULE_0__["default"].checkIfDefinedAndNotNull(displayStatus)) {
            this._displayStatus = displayStatus;
        }
        if (_Utils__WEBPACK_IMPORTED_MODULE_0__["default"].checkIfDefinedAndNotNull(apiVersion)) {
            this._apiVersion = apiVersion;
        }
        if (_Utils__WEBPACK_IMPORTED_MODULE_0__["default"].checkIfDefinedAndNotNull(cmpVersion)) {
            this._cmpVersion = cmpVersion;
        }
        if (_Utils__WEBPACK_IMPORTED_MODULE_0__["default"].checkIfDefinedAndNotNull(cmpId)) {
            this._cmpId = cmpId;
        }
        if (_Utils__WEBPACK_IMPORTED_MODULE_0__["default"].checkIfDefinedAndNotNull(gvlVersion)) {
            this._gvlVersion = gvlVersion;
        }
        if (_Utils__WEBPACK_IMPORTED_MODULE_0__["default"].checkIfDefinedAndNotNull(tcfPolicyVersion)) {
            this._tcfPolicyVersion = tcfPolicyVersion;
        }
    }
    get cmpId() {
        return this._cmpId;
    }
    set cmpId(id) {
        this._cmpId = id;
    }
    get gdprAppliesGlobally() {
        return this._gdprAppliesGlobally;
    }
    get gdprApplies() {
        return this._gdprApplies;
    }
    get cmpLoaded() {
        return this._cmpLoaded;
    }
    get cmpStatus() {
        return this._cmpStatus;
    }
    get displayStatus() {
        return this._displayStatus;
    }
    get apiVersion() {
        return this._apiVersion;
    }
    get cmpVersion() {
        return this._cmpVersion;
    }
    get gvlVersion() {
        return this._gvlVersion;
    }
    get tcfPolicyVersion() {
        return this._tcfPolicyVersion;
    }
    get tcfVersion() {
        let tcfVersion;
        if (typeof this.gdprAppliesGlobally !== 'undefined' && typeof this.cmpLoaded !== 'undefined' && typeof this.gdprApplies === 'undefined') {
            tcfVersion = "TCF 1.1";
        }
        else if (typeof this.gdprApplies !== 'undefined' && typeof this.cmpLoaded !== 'undefined' && typeof this.gdprAppliesGlobally === 'undefined') {
            tcfVersion = "TCF 2.0";
        }
        else {
            tcfVersion = "not defined";
        }
        return tcfVersion;
    }
    static class(pingResult) {
        if (pingResult._gdprAppliesGlobally || pingResult._gdprApplies ||
            pingResult._cmpLoaded ||
            pingResult._cmpStatus ||
            pingResult._displayStatus ||
            pingResult._apiVersion ||
            pingResult._cmpVersion ||
            pingResult._cmpId ||
            pingResult._gvlVersion ||
            pingResult._tcfPolicyVersion) {
            return new PingResult(pingResult._gdprAppliesGlobally, pingResult._gdprApplies, pingResult._cmpLoaded, pingResult._cmpStatus, pingResult._displayStatus, pingResult._apiVersion, pingResult._cmpVersion, pingResult._cmpId, pingResult._gvlVersion, pingResult._tcfPolicyVersion);
        }
        else {
            return new PingResult(pingResult.gdprAppliesGlobally, pingResult.gdprApplies, pingResult.cmpLoaded, pingResult.cmpStatus, pingResult.displayStatus, pingResult.apiVersion, pingResult.cmpVersion, pingResult.cmpId, pingResult.gvlVersion, pingResult.tcfPolicyVersion);
        }
    }
    toJSON() {
        return {
            gdprAppliesGlobally: this._gdprAppliesGlobally,
            gdprApplies: this._gdprApplies,
            cmpLoaded: this._cmpLoaded,
            cmpStatus: this._cmpStatus,
            displayStatus: this._displayStatus,
            apiVersion: this._apiVersion,
            cmpVersion: this._cmpVersion,
            cmpId: this._cmpId,
            gvlVersion: this._gvlVersion,
            tcfPolicyVersion: this._tcfPolicyVersion
        };
    }
}


/***/ })

/******/ });
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay91bml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uIiwid2VicGFjazovLy93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvZGF0ZWZvcm1hdC9saWIvZGF0ZWZvcm1hdC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvanMvQmFja2VuZENhbGwudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2pzL0RldGVjdG9yLnRzIiwid2VicGFjazovLy8uL3NyYy9qcy9VdGlscy50cyIsIndlYnBhY2s6Ly8vLi9zcmMvanMvY21wL0JvcmxhYnMudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2pzL2NtcC9DTVAudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2pzL2NtcC9DaGFuZGFnby50cyIsIndlYnBhY2s6Ly8vLi9zcmMvanMvY21wL0NtcFR5cGUudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2pzL2NtcC9Db25zZW50TWFuYWdlci50cyIsIndlYnBhY2s6Ly8vLi9zcmMvanMvY21wL0Nvb2tpZUJvdC50cyIsIndlYnBhY2s6Ly8vLi9zcmMvanMvY21wL0N1c3RvbUltcGwudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2pzL2NtcC9EaURvTWkudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2pzL2NtcC9Fdmlkb24udHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2pzL2NtcC9Ob1lldEltcGxlbWVudGVkQ21wLnRzIiwid2VicGFjazovLy8uL3NyYy9qcy9jbXAvT2F0aENtcC50cyIsIndlYnBhY2s6Ly8vLi9zcmMvanMvY21wL09uZVRydXN0LnRzIiwid2VicGFjazovLy8uL3NyYy9qcy9jbXAvUXVhbnRDYXN0LnRzIiwid2VicGFjazovLy8uL3NyYy9qcy9jbXAvU291cmNlUG9pbnQudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2pzL2NtcC9UcmFmZmVjdGl2ZS50cyIsIndlYnBhY2s6Ly8vLi9zcmMvanMvY21wL1RydXN0QXJjQmFubmVyLnRzIiwid2VicGFjazovLy8uL3NyYy9qcy9jbXAvVHJ1c3RBcmNJRnJhbWUudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2pzL2NtcC9Vc2VyQ2VudHJpY3MudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2pzL2NvbnRlbnRzY3JpcHQudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2pzL2VudGl0aWVzL1BpbmdSZXN1bHQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQztBQUNELE87UUNWQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTs7O1FBR0E7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBLDBDQUEwQyxnQ0FBZ0M7UUFDMUU7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQSx3REFBd0Qsa0JBQWtCO1FBQzFFO1FBQ0EsaURBQWlELGNBQWM7UUFDL0Q7O1FBRUE7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBLHlDQUF5QyxpQ0FBaUM7UUFDMUUsZ0hBQWdILG1CQUFtQixFQUFFO1FBQ3JJO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0EsMkJBQTJCLDBCQUEwQixFQUFFO1FBQ3ZELGlDQUFpQyxlQUFlO1FBQ2hEO1FBQ0E7UUFDQTs7UUFFQTtRQUNBLHNEQUFzRCwrREFBK0Q7O1FBRXJIO1FBQ0E7OztRQUdBO1FBQ0E7Ozs7Ozs7Ozs7OztBQ2xGQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0EscUJBQXFCLElBQUksR0FBRyxJQUFJO0FBQ2hDLGtKQUFrSixFQUFFO0FBQ3BKOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0EsS0FBSzs7QUFFTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxZQUFZLE9BQU87QUFDbkIsWUFBWTtBQUNaO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFlBQVksT0FBTztBQUNuQixZQUFZO0FBQ1o7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsWUFBWSxFQUFFO0FBQ2QsWUFBWTtBQUNaO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUEsV0FBVztB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Q0E7QUFDQTtBQUNBLHdDQUF3QyxpRUFBb0I7QUFDNUQ7QUFDQTtBQUNBO0FBQ0Esd0NBQXdDLGlFQUFvQjtBQUM1RDtBQUNBO0FBQ0E7QUFDQSx3Q0FBd0MsaUVBQW9CO0FBQzVEO0FBQ0E7QUFDQTtBQUNBLHdDQUF3QyxpRUFBb0I7QUFDNUQ7QUFDQTtBQUNBO0FBQ0Esd0NBQXdDLGlFQUFvQjtBQUM1RDtBQUNBO0FBQ0E7QUFDQSx3Q0FBd0MsaUVBQW9CO0FBQzVEO0FBQ0E7QUFDQTtBQUNBLHdDQUF3QyxpRUFBb0I7QUFDNUQ7QUFDQTtBQUNBO0FBQ0Esd0NBQXdDLGlFQUFvQjtBQUM1RDtBQUNBO0FBQ0E7QUFDQSx3Q0FBd0MsaUVBQW9CO0FBQzVEO0FBQ0E7QUFDQTtBQUNBLHdDQUF3QyxpRUFBb0I7QUFDNUQ7QUFDQTtBQUNBO0FBQ0Esd0NBQXdDLGlFQUFvQjtBQUM1RDtBQUNBO0FBQ0E7QUFDQSx3Q0FBd0MsaUVBQW9CO0FBQzVEO0FBQ0E7QUFDQTtBQUNBLHdDQUF3QyxpRUFBb0I7QUFDNUQ7QUFDQTtBQUNBO0FBQ0Esd0NBQXdDLGlFQUFvQjtBQUM1RDtBQUNBO0FBQ0E7QUFDQSx3Q0FBd0MsaUVBQW9CO0FBQzVEO0FBQ0E7QUFDQTtBQUNBLHdDQUF3QyxpRUFBb0I7QUFDNUQ7QUFDQTtBQUNBO0FBQ0Esd0NBQXdDLGlFQUFvQjtBQUM1RDtBQUNBO0FBQ0E7QUFDQSx3Q0FBd0MsaUVBQW9CO0FBQzVEO0FBQ0E7QUFDQTtBQUNBLHdDQUF3QyxpRUFBb0I7QUFDNUQ7QUFDQTtBQUNBO0FBQ0Esd0NBQXdDLGlFQUFvQjtBQUM1RDtBQUNBO0FBQ0E7QUFDQSx3Q0FBd0MsaUVBQW9CO0FBQzVEO0FBQ0E7QUFDQTtBQUNBLHdDQUF3QyxpRUFBb0I7QUFDNUQ7QUFDQTtBQUNBO0FBQ0Esd0NBQXdDLGlFQUFvQjtBQUM1RDtBQUNBO0FBQ0E7QUFDQSx3Q0FBd0MsaUVBQW9CO0FBQzVEO0FBQ0E7QUFDQTtBQUNBLHdDQUF3QyxpRUFBb0I7QUFDNUQ7QUFDQTtBQUNBO0FBQ0Esd0NBQXdDLGlFQUFvQjtBQUM1RDtBQUNBO0FBQ0E7QUFDQSx3Q0FBd0MsaUVBQW9CO0FBQzVEO0FBQ0E7QUFDQTtBQUNBLHdDQUF3QyxpRUFBb0I7QUFDNUQ7QUFDQTtBQUNBO0FBQ0Esd0NBQXdDLGlFQUFvQjtBQUM1RDtBQUNBO0FBQ0E7QUFDQSx3Q0FBd0MsaUVBQW9CO0FBQzVEO0FBQ0E7QUFDQTtBQUNBLHdDQUF3QyxpRUFBb0I7QUFDNUQ7QUFDQTtBQUNBO0FBQ0Esd0NBQXdDLGlFQUFvQjtBQUM1RDtBQUNBO0FBQ0E7QUFDQSx3Q0FBd0MsaUVBQW9CO0FBQzVEO0FBQ0E7QUFDQTtBQUNBLHdDQUF3QyxpRUFBb0I7QUFDNUQ7QUFDQTtBQUNBO0FBQ0Esd0NBQXdDLGlFQUFvQjtBQUM1RDtBQUNBO0FBQ0E7QUFDQSx3Q0FBd0MsaUVBQW9CO0FBQzVEO0FBQ0E7QUFDQTtBQUNBLHdDQUF3QyxpRUFBb0I7QUFDNUQ7QUFDQTtBQUNBO0FBQ0Esd0NBQXdDLGlFQUFvQjtBQUM1RDtBQUNBO0FBQ0E7QUFDQSx3Q0FBd0MsaUVBQW9CO0FBQzVEO0FBQ0E7QUFDQTtBQUNBLHdDQUF3QyxpRUFBb0I7QUFDNUQ7QUFDQTtBQUNBO0FBQ0Esd0NBQXdDLGlFQUFvQjtBQUM1RDtBQUNBO0FBQ0E7QUFDQSx3Q0FBd0MsaUVBQW9CO0FBQzVEO0FBQ0E7QUFDQTtBQUNBLHdDQUF3QyxpRUFBb0I7QUFDNUQ7QUFDQTtBQUNBO0FBQ0Esd0NBQXdDLGlFQUFvQjtBQUM1RDtBQUNBLHFCQUFxQjtBQUNyQjtBQUNBO0FBQ0EscUJBQXFCO0FBQ3JCO0FBQ0Esd0NBQXdDLGlFQUFvQjtBQUM1RDtBQUNBO0FBQ0E7QUFDQSx3Q0FBd0MsaUVBQW9CO0FBQzVEO0FBQ0E7QUFDQTtBQUNBLHdDQUF3QyxpRUFBb0I7QUFDNUQ7QUFDQTtBQUNBO0FBQ0Esd0NBQXdDLGlFQUFvQjtBQUM1RDtBQUNBO0FBQ0E7QUFDQSx3Q0FBd0MsaUVBQW9CO0FBQzVEO0FBQ0E7QUFDQTtBQUNBLHdDQUF3QyxpRUFBb0I7QUFDNUQ7QUFDQTtBQUNBO0FBQ0Esd0NBQXdDLGlFQUFvQjtBQUM1RDtBQUNBO0FBQ0E7QUFDQSx3Q0FBd0MsaUVBQW9CO0FBQzVEO0FBQ0E7QUFDQTtBQUNBLHdDQUF3QyxpRUFBb0I7QUFDNUQ7QUFDQTtBQUNBO0FBQ0Esd0NBQXdDLGlFQUFvQjtBQUM1RDtBQUNBO0FBQ0E7QUFDQSx3Q0FBd0MsaUVBQW9CO0FBQzVEO0FBQ0E7QUFDQTtBQUNBLHdDQUF3QyxpRUFBb0I7QUFDNUQ7QUFDQTtBQUNBO0FBQ0Esd0NBQXdDLGlFQUFvQjtBQUM1RDtBQUNBO0FBQ0E7QUFDQSx3Q0FBd0MsaUVBQW9CO0FBQzVEO0FBQ0E7QUFDQTtBQUNBLHdDQUF3QyxpRUFBb0I7QUFDNUQ7QUFDQTtBQUNBO0FBQ0Esd0NBQXdDLGlFQUFvQjtBQUM1RDtBQUNBO0FBQ0E7QUFDQSx3Q0FBd0MsaUVBQW9CO0FBQzVEO0FBQ0E7QUFDQTtBQUNBLHdDQUF3QyxpRUFBb0I7QUFDNUQ7QUFDQTtBQUNBO0FBQ0Esd0NBQXdDLGlFQUFvQjtBQUM1RDtBQUNBO0FBQ0E7QUFDQSx3Q0FBd0MsaUVBQW9CO0FBQzVEO0FBQ0E7QUFDQTtBQUNBLHdDQUF3QyxpRUFBb0I7QUFDNUQ7QUFDQTtBQUNBO0FBQ0Esd0NBQXdDLGlFQUFvQjtBQUM1RDtBQUNBO0FBQ0E7QUFDQSx3Q0FBd0MsaUVBQW9CO0FBQzVEO0FBQ0E7QUFDQTtBQUNBLHdDQUF3QyxpRUFBb0I7QUFDNUQ7QUFDQTtBQUNBO0FBQ0Esd0NBQXdDLGlFQUFvQjtBQUM1RDtBQUNBO0FBQ0E7QUFDQSx3Q0FBd0MsaUVBQW9CO0FBQzVEO0FBQ0E7QUFDQTtBQUNBLHdDQUF3QyxpRUFBb0I7QUFDNUQ7QUFDQTtBQUNBO0FBQ0Esd0NBQXdDLGlFQUFvQjtBQUM1RDtBQUNBO0FBQ0E7QUFDQSx3Q0FBd0MsaUVBQW9CO0FBQzVEO0FBQ0E7QUFDQTtBQUNBLHdDQUF3QyxpRUFBb0I7QUFDNUQ7QUFDQTtBQUNBO0FBQ0Esd0NBQXdDLGlFQUFvQjtBQUM1RDtBQUNBO0FBQ0E7QUFDQSx3Q0FBd0MsaUVBQW9CO0FBQzVEO0FBQ0E7QUFDQTtBQUNBLHdDQUF3QyxpRUFBb0I7QUFDNUQ7QUFDQTtBQUNBO0FBQ0Esd0NBQXdDLGlFQUFvQjtBQUM1RDtBQUNBO0FBQ0E7QUFDQSx3Q0FBd0MsaUVBQW9CO0FBQzVEO0FBQ0E7QUFDQTtBQUNBLHdDQUF3QyxpRUFBb0I7QUFDNUQ7QUFDQTtBQUNBO0FBQ0Esd0NBQXdDLGlFQUFvQjtBQUM1RDtBQUNBO0FBQ0E7QUFDQSx3Q0FBd0MsaUVBQW9CO0FBQzVEO0FBQ0E7QUFDQTtBQUNBLHdDQUF3QyxpRUFBb0I7QUFDNUQ7QUFDQTtBQUNBO0FBQ0Esd0NBQXdDLGlFQUFvQjtBQUM1RDtBQUNBO0FBQ0E7QUFDQSx3Q0FBd0MsaUVBQW9CO0FBQzVEO0FBQ0E7QUFDQTtBQUNBLHdDQUF3QyxpRUFBb0I7QUFDNUQ7QUFDQTtBQUNBO0FBQ0Esd0NBQXdDLGlFQUFvQjtBQUM1RDtBQUNBO0FBQ0E7QUFDQSx3Q0FBd0MsaUVBQW9CO0FBQzVEO0FBQ0E7QUFDQTtBQUNBLHdDQUF3QyxpRUFBb0I7QUFDNUQ7QUFDQTtBQUNBO0FBQ0Esd0NBQXdDLGlFQUFvQjtBQUM1RDtBQUNBO0FBQ0E7QUFDQSx3Q0FBd0MsaUVBQW9CO0FBQzVEO0FBQ0E7QUFDQTtBQUNBLHdDQUF3QyxpRUFBb0I7QUFDNUQ7QUFDQTtBQUNBO0FBQ0Esd0NBQXdDLGlFQUFvQjtBQUM1RDtBQUNBO0FBQ0E7QUFDQSx3Q0FBd0MsaUVBQW9CO0FBQzVEO0FBQ0E7QUFDQTtBQUNBLHdDQUF3QyxpRUFBb0I7QUFDNUQ7QUFDQTtBQUNBO0FBQ0Esd0NBQXdDLGlFQUFvQjtBQUM1RDtBQUNBO0FBQ0E7QUFDQSx3Q0FBd0MsaUVBQW9CO0FBQzVEO0FBQ0E7QUFDQTtBQUNBLHdDQUF3QyxpRUFBb0I7QUFDNUQ7QUFDQTtBQUNBO0FBQ0Esd0NBQXdDLGlFQUFvQjtBQUM1RDtBQUNBO0FBQ0E7QUFDQSx3Q0FBd0MsaUVBQW9CO0FBQzVEO0FBQ0E7QUFDQTtBQUNBLHdDQUF3QyxpRUFBb0I7QUFDNUQ7QUFDQTtBQUNBO0FBQ0Esd0NBQXdDLGlFQUFvQjtBQUM1RDtB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QUFLO0FBQ2pCO0FBQ0E7QUFDQSxZQUFZLDhDQUFLO0FBQ2pCO0FBQ0E7QUFDQSxZQUFZLDhDQUFLO0FBQ2pCO0FBQ0E7QUFDQSxZQUFZLDhDQUFLO0FBQ2pCO0FBQ0E7QUFDQSxZQUFZLDhDQUFLO0FBQ2pCO0FBQ0E7QUFDQSxZQUFZLDhDQUFLO0FBQ2pCO0FBQ0E7QUFDQSxZQUFZLDhDQUFLO0FBQ2pCO0FBQ0E7QUFDQSxZQUFZLDhDQUFLO0FBQ2pCO0FBQ0E7QUFDQSxZQUFZLDhDQUFLO0FBQ2pCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJmaWxlIjoiLi9jb250ZW50c2NyaXB0LmpzIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIHdlYnBhY2tVbml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uKHJvb3QsIGZhY3RvcnkpIHtcblx0aWYodHlwZW9mIGV4cG9ydHMgPT09ICdvYmplY3QnICYmIHR5cGVvZiBtb2R1bGUgPT09ICdvYmplY3QnKVxuXHRcdG1vZHVsZS5leHBvcnRzID0gZmFjdG9yeSgpO1xuXHRlbHNlIGlmKHR5cGVvZiBkZWZpbmUgPT09ICdmdW5jdGlvbicgJiYgZGVmaW5lLmFtZClcblx0XHRkZWZpbmUoW10sIGZhY3RvcnkpO1xuXHRlbHNlIHtcblx0XHR2YXIgYSA9IGZhY3RvcnkoKTtcblx0XHRmb3IodmFyIGkgaW4gYSkgKHR5cGVvZiBleHBvcnRzID09PSAnb2JqZWN0JyA/IGV4cG9ydHMgOiByb290KVtpXSA9IGFbaV07XG5cdH1cbn0pKHdpbmRvdywgZnVuY3Rpb24oKSB7XG5yZXR1cm4gIiwiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pIHtcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcbiBcdFx0fVxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0aTogbW9kdWxlSWQsXG4gXHRcdFx0bDogZmFsc2UsXG4gXHRcdFx0ZXhwb3J0czoge31cbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gZGVmaW5lIGdldHRlciBmdW5jdGlvbiBmb3IgaGFybW9ueSBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBuYW1lLCBnZXR0ZXIpIHtcbiBcdFx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBuYW1lKSkge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBuYW1lLCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZ2V0dGVyIH0pO1xuIFx0XHR9XG4gXHR9O1xuXG4gXHQvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSBmdW5jdGlvbihleHBvcnRzKSB7XG4gXHRcdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuIFx0XHR9XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG4gXHR9O1xuXG4gXHQvLyBjcmVhdGUgYSBmYWtlIG5hbWVzcGFjZSBvYmplY3RcbiBcdC8vIG1vZGUgJiAxOiB2YWx1ZSBpcyBhIG1vZHVsZSBpZCwgcmVxdWlyZSBpdFxuIFx0Ly8gbW9kZSAmIDI6IG1lcmdlIGFsbCBwcm9wZXJ0aWVzIG9mIHZhbHVlIGludG8gdGhlIG5zXG4gXHQvLyBtb2RlICYgNDogcmV0dXJuIHZhbHVlIHdoZW4gYWxyZWFkeSBucyBvYmplY3RcbiBcdC8vIG1vZGUgJiA4fDE6IGJlaGF2ZSBsaWtlIHJlcXVpcmVcbiBcdF9fd2VicGFja19yZXF1aXJlX18udCA9IGZ1bmN0aW9uKHZhbHVlLCBtb2RlKSB7XG4gXHRcdGlmKG1vZGUgJiAxKSB2YWx1ZSA9IF9fd2VicGFja19yZXF1aXJlX18odmFsdWUpO1xuIFx0XHRpZihtb2RlICYgOCkgcmV0dXJuIHZhbHVlO1xuIFx0XHRpZigobW9kZSAmIDQpICYmIHR5cGVvZiB2YWx1ZSA9PT0gJ29iamVjdCcgJiYgdmFsdWUgJiYgdmFsdWUuX19lc01vZHVsZSkgcmV0dXJuIHZhbHVlO1xuIFx0XHR2YXIgbnMgPSBPYmplY3QuY3JlYXRlKG51bGwpO1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIobnMpO1xuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkobnMsICdkZWZhdWx0JywgeyBlbnVtZXJhYmxlOiB0cnVlLCB2YWx1ZTogdmFsdWUgfSk7XG4gXHRcdGlmKG1vZGUgJiAyICYmIHR5cGVvZiB2YWx1ZSAhPSAnc3RyaW5nJykgZm9yKHZhciBrZXkgaW4gdmFsdWUpIF9fd2VicGFja19yZXF1aXJlX18uZChucywga2V5LCBmdW5jdGlvbihrZXkpIHsgcmV0dXJuIHZhbHVlW2tleV07IH0uYmluZChudWxsLCBrZXkpKTtcbiBcdFx0cmV0dXJuIG5zO1xuIFx0fTtcblxuIFx0Ly8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuIFx0XHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cbiBcdFx0XHRmdW5jdGlvbiBnZXREZWZhdWx0KCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuIFx0XHRcdGZ1bmN0aW9uIGdldE1vZHVsZUV4cG9ydHMoKSB7IHJldHVybiBtb2R1bGU7IH07XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsICdhJywgZ2V0dGVyKTtcbiBcdFx0cmV0dXJuIGdldHRlcjtcbiBcdH07XG5cbiBcdC8vIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgcHJvcGVydHkpOyB9O1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKF9fd2VicGFja19yZXF1aXJlX18ucyA9IFwiLi9zcmMvanMvY29udGVudHNjcmlwdC50c1wiKTtcbiIsIi8qXG4gKiBEYXRlIEZvcm1hdCAxLjIuM1xuICogKGMpIDIwMDctMjAwOSBTdGV2ZW4gTGV2aXRoYW4gPHN0ZXZlbmxldml0aGFuLmNvbT5cbiAqIE1JVCBsaWNlbnNlXG4gKlxuICogSW5jbHVkZXMgZW5oYW5jZW1lbnRzIGJ5IFNjb3R0IFRyZW5kYSA8c2NvdHQudHJlbmRhLm5ldD5cbiAqIGFuZCBLcmlzIEtvd2FsIDxjaXhhci5jb20vfmtyaXMua293YWwvPlxuICpcbiAqIEFjY2VwdHMgYSBkYXRlLCBhIG1hc2ssIG9yIGEgZGF0ZSBhbmQgYSBtYXNrLlxuICogUmV0dXJucyBhIGZvcm1hdHRlZCB2ZXJzaW9uIG9mIHRoZSBnaXZlbiBkYXRlLlxuICogVGhlIGRhdGUgZGVmYXVsdHMgdG8gdGhlIGN1cnJlbnQgZGF0ZS90aW1lLlxuICogVGhlIG1hc2sgZGVmYXVsdHMgdG8gZGF0ZUZvcm1hdC5tYXNrcy5kZWZhdWx0LlxuICovXG5cbihmdW5jdGlvbihnbG9iYWwpIHtcbiAgJ3VzZSBzdHJpY3QnO1xuXG4gIHZhciBkYXRlRm9ybWF0ID0gKGZ1bmN0aW9uKCkge1xuICAgICAgdmFyIHRva2VuID0gL2R7MSw0fXxtezEsNH18eXkoPzp5eSk/fChbSGhNc1R0XSlcXDE/fFtMbG9TWldOXXxcIlteXCJdKlwifCdbXiddKicvZztcbiAgICAgIHZhciB0aW1lem9uZSA9IC9cXGIoPzpbUE1DRUFdW1NEUF1UfCg/OlBhY2lmaWN8TW91bnRhaW58Q2VudHJhbHxFYXN0ZXJufEF0bGFudGljKSAoPzpTdGFuZGFyZHxEYXlsaWdodHxQcmV2YWlsaW5nKSBUaW1lfCg/OkdNVHxVVEMpKD86Wy0rXVxcZHs0fSk/KVxcYi9nO1xuICAgICAgdmFyIHRpbWV6b25lQ2xpcCA9IC9bXi0rXFxkQS1aXS9nO1xuICBcbiAgICAgIC8vIFJlZ2V4ZXMgYW5kIHN1cHBvcnRpbmcgZnVuY3Rpb25zIGFyZSBjYWNoZWQgdGhyb3VnaCBjbG9zdXJlXG4gICAgICByZXR1cm4gZnVuY3Rpb24gKGRhdGUsIG1hc2ssIHV0YywgZ210KSB7XG4gIFxuICAgICAgICAvLyBZb3UgY2FuJ3QgcHJvdmlkZSB1dGMgaWYgeW91IHNraXAgb3RoZXIgYXJncyAodXNlIHRoZSAnVVRDOicgbWFzayBwcmVmaXgpXG4gICAgICAgIGlmIChhcmd1bWVudHMubGVuZ3RoID09PSAxICYmIGtpbmRPZihkYXRlKSA9PT0gJ3N0cmluZycgJiYgIS9cXGQvLnRlc3QoZGF0ZSkpIHtcbiAgICAgICAgICBtYXNrID0gZGF0ZTtcbiAgICAgICAgICBkYXRlID0gdW5kZWZpbmVkO1xuICAgICAgICB9XG4gIFxuICAgICAgICBkYXRlID0gZGF0ZSB8fCBuZXcgRGF0ZTtcbiAgXG4gICAgICAgIGlmKCEoZGF0ZSBpbnN0YW5jZW9mIERhdGUpKSB7XG4gICAgICAgICAgZGF0ZSA9IG5ldyBEYXRlKGRhdGUpO1xuICAgICAgICB9XG4gIFxuICAgICAgICBpZiAoaXNOYU4oZGF0ZSkpIHtcbiAgICAgICAgICB0aHJvdyBUeXBlRXJyb3IoJ0ludmFsaWQgZGF0ZScpO1xuICAgICAgICB9XG4gIFxuICAgICAgICBtYXNrID0gU3RyaW5nKGRhdGVGb3JtYXQubWFza3NbbWFza10gfHwgbWFzayB8fCBkYXRlRm9ybWF0Lm1hc2tzWydkZWZhdWx0J10pO1xuICBcbiAgICAgICAgLy8gQWxsb3cgc2V0dGluZyB0aGUgdXRjL2dtdCBhcmd1bWVudCB2aWEgdGhlIG1hc2tcbiAgICAgICAgdmFyIG1hc2tTbGljZSA9IG1hc2suc2xpY2UoMCwgNCk7XG4gICAgICAgIGlmIChtYXNrU2xpY2UgPT09ICdVVEM6JyB8fCBtYXNrU2xpY2UgPT09ICdHTVQ6Jykge1xuICAgICAgICAgIG1hc2sgPSBtYXNrLnNsaWNlKDQpO1xuICAgICAgICAgIHV0YyA9IHRydWU7XG4gICAgICAgICAgaWYgKG1hc2tTbGljZSA9PT0gJ0dNVDonKSB7XG4gICAgICAgICAgICBnbXQgPSB0cnVlO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICBcbiAgICAgICAgdmFyIF8gPSB1dGMgPyAnZ2V0VVRDJyA6ICdnZXQnO1xuICAgICAgICB2YXIgZCA9IGRhdGVbXyArICdEYXRlJ10oKTtcbiAgICAgICAgdmFyIEQgPSBkYXRlW18gKyAnRGF5J10oKTtcbiAgICAgICAgdmFyIG0gPSBkYXRlW18gKyAnTW9udGgnXSgpO1xuICAgICAgICB2YXIgeSA9IGRhdGVbXyArICdGdWxsWWVhciddKCk7XG4gICAgICAgIHZhciBIID0gZGF0ZVtfICsgJ0hvdXJzJ10oKTtcbiAgICAgICAgdmFyIE0gPSBkYXRlW18gKyAnTWludXRlcyddKCk7XG4gICAgICAgIHZhciBzID0gZGF0ZVtfICsgJ1NlY29uZHMnXSgpO1xuICAgICAgICB2YXIgTCA9IGRhdGVbXyArICdNaWxsaXNlY29uZHMnXSgpO1xuICAgICAgICB2YXIgbyA9IHV0YyA/IDAgOiBkYXRlLmdldFRpbWV6b25lT2Zmc2V0KCk7XG4gICAgICAgIHZhciBXID0gZ2V0V2VlayhkYXRlKTtcbiAgICAgICAgdmFyIE4gPSBnZXREYXlPZldlZWsoZGF0ZSk7XG4gICAgICAgIHZhciBmbGFncyA9IHtcbiAgICAgICAgICBkOiAgICBkLFxuICAgICAgICAgIGRkOiAgIHBhZChkKSxcbiAgICAgICAgICBkZGQ6ICBkYXRlRm9ybWF0LmkxOG4uZGF5TmFtZXNbRF0sXG4gICAgICAgICAgZGRkZDogZGF0ZUZvcm1hdC5pMThuLmRheU5hbWVzW0QgKyA3XSxcbiAgICAgICAgICBtOiAgICBtICsgMSxcbiAgICAgICAgICBtbTogICBwYWQobSArIDEpLFxuICAgICAgICAgIG1tbTogIGRhdGVGb3JtYXQuaTE4bi5tb250aE5hbWVzW21dLFxuICAgICAgICAgIG1tbW06IGRhdGVGb3JtYXQuaTE4bi5tb250aE5hbWVzW20gKyAxMl0sXG4gICAgICAgICAgeXk6ICAgU3RyaW5nKHkpLnNsaWNlKDIpLFxuICAgICAgICAgIHl5eXk6IHksXG4gICAgICAgICAgaDogICAgSCAlIDEyIHx8IDEyLFxuICAgICAgICAgIGhoOiAgIHBhZChIICUgMTIgfHwgMTIpLFxuICAgICAgICAgIEg6ICAgIEgsXG4gICAgICAgICAgSEg6ICAgcGFkKEgpLFxuICAgICAgICAgIE06ICAgIE0sXG4gICAgICAgICAgTU06ICAgcGFkKE0pLFxuICAgICAgICAgIHM6ICAgIHMsXG4gICAgICAgICAgc3M6ICAgcGFkKHMpLFxuICAgICAgICAgIGw6ICAgIHBhZChMLCAzKSxcbiAgICAgICAgICBMOiAgICBwYWQoTWF0aC5yb3VuZChMIC8gMTApKSxcbiAgICAgICAgICB0OiAgICBIIDwgMTIgPyBkYXRlRm9ybWF0LmkxOG4udGltZU5hbWVzWzBdIDogZGF0ZUZvcm1hdC5pMThuLnRpbWVOYW1lc1sxXSxcbiAgICAgICAgICB0dDogICBIIDwgMTIgPyBkYXRlRm9ybWF0LmkxOG4udGltZU5hbWVzWzJdIDogZGF0ZUZvcm1hdC5pMThuLnRpbWVOYW1lc1szXSxcbiAgICAgICAgICBUOiAgICBIIDwgMTIgPyBkYXRlRm9ybWF0LmkxOG4udGltZU5hbWVzWzRdIDogZGF0ZUZvcm1hdC5pMThuLnRpbWVOYW1lc1s1XSxcbiAgICAgICAgICBUVDogICBIIDwgMTIgPyBkYXRlRm9ybWF0LmkxOG4udGltZU5hbWVzWzZdIDogZGF0ZUZvcm1hdC5pMThuLnRpbWVOYW1lc1s3XSxcbiAgICAgICAgICBaOiAgICBnbXQgPyAnR01UJyA6IHV0YyA/ICdVVEMnIDogKFN0cmluZyhkYXRlKS5tYXRjaCh0aW1lem9uZSkgfHwgWycnXSkucG9wKCkucmVwbGFjZSh0aW1lem9uZUNsaXAsICcnKSxcbiAgICAgICAgICBvOiAgICAobyA+IDAgPyAnLScgOiAnKycpICsgcGFkKE1hdGguZmxvb3IoTWF0aC5hYnMobykgLyA2MCkgKiAxMDAgKyBNYXRoLmFicyhvKSAlIDYwLCA0KSxcbiAgICAgICAgICBTOiAgICBbJ3RoJywgJ3N0JywgJ25kJywgJ3JkJ11bZCAlIDEwID4gMyA/IDAgOiAoZCAlIDEwMCAtIGQgJSAxMCAhPSAxMCkgKiBkICUgMTBdLFxuICAgICAgICAgIFc6ICAgIFcsXG4gICAgICAgICAgTjogICAgTlxuICAgICAgICB9O1xuICBcbiAgICAgICAgcmV0dXJuIG1hc2sucmVwbGFjZSh0b2tlbiwgZnVuY3Rpb24gKG1hdGNoKSB7XG4gICAgICAgICAgaWYgKG1hdGNoIGluIGZsYWdzKSB7XG4gICAgICAgICAgICByZXR1cm4gZmxhZ3NbbWF0Y2hdO1xuICAgICAgICAgIH1cbiAgICAgICAgICByZXR1cm4gbWF0Y2guc2xpY2UoMSwgbWF0Y2gubGVuZ3RoIC0gMSk7XG4gICAgICAgIH0pO1xuICAgICAgfTtcbiAgICB9KSgpO1xuXG4gIGRhdGVGb3JtYXQubWFza3MgPSB7XG4gICAgJ2RlZmF1bHQnOiAgICAgICAgICAgICAgICdkZGQgbW1tIGRkIHl5eXkgSEg6TU06c3MnLFxuICAgICdzaG9ydERhdGUnOiAgICAgICAgICAgICAnbS9kL3l5JyxcbiAgICAnbWVkaXVtRGF0ZSc6ICAgICAgICAgICAgJ21tbSBkLCB5eXl5JyxcbiAgICAnbG9uZ0RhdGUnOiAgICAgICAgICAgICAgJ21tbW0gZCwgeXl5eScsXG4gICAgJ2Z1bGxEYXRlJzogICAgICAgICAgICAgICdkZGRkLCBtbW1tIGQsIHl5eXknLFxuICAgICdzaG9ydFRpbWUnOiAgICAgICAgICAgICAnaDpNTSBUVCcsXG4gICAgJ21lZGl1bVRpbWUnOiAgICAgICAgICAgICdoOk1NOnNzIFRUJyxcbiAgICAnbG9uZ1RpbWUnOiAgICAgICAgICAgICAgJ2g6TU06c3MgVFQgWicsXG4gICAgJ2lzb0RhdGUnOiAgICAgICAgICAgICAgICd5eXl5LW1tLWRkJyxcbiAgICAnaXNvVGltZSc6ICAgICAgICAgICAgICAgJ0hIOk1NOnNzJyxcbiAgICAnaXNvRGF0ZVRpbWUnOiAgICAgICAgICAgJ3l5eXktbW0tZGRcXCdUXFwnSEg6TU06c3NvJyxcbiAgICAnaXNvVXRjRGF0ZVRpbWUnOiAgICAgICAgJ1VUQzp5eXl5LW1tLWRkXFwnVFxcJ0hIOk1NOnNzXFwnWlxcJycsXG4gICAgJ2V4cGlyZXNIZWFkZXJGb3JtYXQnOiAgICdkZGQsIGRkIG1tbSB5eXl5IEhIOk1NOnNzIFonXG4gIH07XG5cbiAgLy8gSW50ZXJuYXRpb25hbGl6YXRpb24gc3RyaW5nc1xuICBkYXRlRm9ybWF0LmkxOG4gPSB7XG4gICAgZGF5TmFtZXM6IFtcbiAgICAgICdTdW4nLCAnTW9uJywgJ1R1ZScsICdXZWQnLCAnVGh1JywgJ0ZyaScsICdTYXQnLFxuICAgICAgJ1N1bmRheScsICdNb25kYXknLCAnVHVlc2RheScsICdXZWRuZXNkYXknLCAnVGh1cnNkYXknLCAnRnJpZGF5JywgJ1NhdHVyZGF5J1xuICAgIF0sXG4gICAgbW9udGhOYW1lczogW1xuICAgICAgJ0phbicsICdGZWInLCAnTWFyJywgJ0FwcicsICdNYXknLCAnSnVuJywgJ0p1bCcsICdBdWcnLCAnU2VwJywgJ09jdCcsICdOb3YnLCAnRGVjJyxcbiAgICAgICdKYW51YXJ5JywgJ0ZlYnJ1YXJ5JywgJ01hcmNoJywgJ0FwcmlsJywgJ01heScsICdKdW5lJywgJ0p1bHknLCAnQXVndXN0JywgJ1NlcHRlbWJlcicsICdPY3RvYmVyJywgJ05vdmVtYmVyJywgJ0RlY2VtYmVyJ1xuICAgIF0sXG4gICAgdGltZU5hbWVzOiBbXG4gICAgICAnYScsICdwJywgJ2FtJywgJ3BtJywgJ0EnLCAnUCcsICdBTScsICdQTSdcbiAgICBdXG4gIH07XG5cbmZ1bmN0aW9uIHBhZCh2YWwsIGxlbikge1xuICB2YWwgPSBTdHJpbmcodmFsKTtcbiAgbGVuID0gbGVuIHx8IDI7XG4gIHdoaWxlICh2YWwubGVuZ3RoIDwgbGVuKSB7XG4gICAgdmFsID0gJzAnICsgdmFsO1xuICB9XG4gIHJldHVybiB2YWw7XG59XG5cbi8qKlxuICogR2V0IHRoZSBJU08gODYwMSB3ZWVrIG51bWJlclxuICogQmFzZWQgb24gY29tbWVudHMgZnJvbVxuICogaHR0cDovL3RlY2hibG9nLnByb2N1cmlvcy5ubC9rL242MTgvbmV3cy92aWV3LzMzNzk2LzE0ODYzL0NhbGN1bGF0ZS1JU08tODYwMS13ZWVrLWFuZC15ZWFyLWluLWphdmFzY3JpcHQuaHRtbFxuICpcbiAqIEBwYXJhbSAge09iamVjdH0gYGRhdGVgXG4gKiBAcmV0dXJuIHtOdW1iZXJ9XG4gKi9cbmZ1bmN0aW9uIGdldFdlZWsoZGF0ZSkge1xuICAvLyBSZW1vdmUgdGltZSBjb21wb25lbnRzIG9mIGRhdGVcbiAgdmFyIHRhcmdldFRodXJzZGF5ID0gbmV3IERhdGUoZGF0ZS5nZXRGdWxsWWVhcigpLCBkYXRlLmdldE1vbnRoKCksIGRhdGUuZ2V0RGF0ZSgpKTtcblxuICAvLyBDaGFuZ2UgZGF0ZSB0byBUaHVyc2RheSBzYW1lIHdlZWtcbiAgdGFyZ2V0VGh1cnNkYXkuc2V0RGF0ZSh0YXJnZXRUaHVyc2RheS5nZXREYXRlKCkgLSAoKHRhcmdldFRodXJzZGF5LmdldERheSgpICsgNikgJSA3KSArIDMpO1xuXG4gIC8vIFRha2UgSmFudWFyeSA0dGggYXMgaXQgaXMgYWx3YXlzIGluIHdlZWsgMSAoc2VlIElTTyA4NjAxKVxuICB2YXIgZmlyc3RUaHVyc2RheSA9IG5ldyBEYXRlKHRhcmdldFRodXJzZGF5LmdldEZ1bGxZZWFyKCksIDAsIDQpO1xuXG4gIC8vIENoYW5nZSBkYXRlIHRvIFRodXJzZGF5IHNhbWUgd2Vla1xuICBmaXJzdFRodXJzZGF5LnNldERhdGUoZmlyc3RUaHVyc2RheS5nZXREYXRlKCkgLSAoKGZpcnN0VGh1cnNkYXkuZ2V0RGF5KCkgKyA2KSAlIDcpICsgMyk7XG5cbiAgLy8gQ2hlY2sgaWYgZGF5bGlnaHQtc2F2aW5nLXRpbWUtc3dpdGNoIG9jY3VycmVkIGFuZCBjb3JyZWN0IGZvciBpdFxuICB2YXIgZHMgPSB0YXJnZXRUaHVyc2RheS5nZXRUaW1lem9uZU9mZnNldCgpIC0gZmlyc3RUaHVyc2RheS5nZXRUaW1lem9uZU9mZnNldCgpO1xuICB0YXJnZXRUaHVyc2RheS5zZXRIb3Vycyh0YXJnZXRUaHVyc2RheS5nZXRIb3VycygpIC0gZHMpO1xuXG4gIC8vIE51bWJlciBvZiB3ZWVrcyBiZXR3ZWVuIHRhcmdldCBUaHVyc2RheSBhbmQgZmlyc3QgVGh1cnNkYXlcbiAgdmFyIHdlZWtEaWZmID0gKHRhcmdldFRodXJzZGF5IC0gZmlyc3RUaHVyc2RheSkgLyAoODY0MDAwMDAqNyk7XG4gIHJldHVybiAxICsgTWF0aC5mbG9vcih3ZWVrRGlmZik7XG59XG5cbi8qKlxuICogR2V0IElTTy04NjAxIG51bWVyaWMgcmVwcmVzZW50YXRpb24gb2YgdGhlIGRheSBvZiB0aGUgd2Vla1xuICogMSAoZm9yIE1vbmRheSkgdGhyb3VnaCA3IChmb3IgU3VuZGF5KVxuICogXG4gKiBAcGFyYW0gIHtPYmplY3R9IGBkYXRlYFxuICogQHJldHVybiB7TnVtYmVyfVxuICovXG5mdW5jdGlvbiBnZXREYXlPZldlZWsoZGF0ZSkge1xuICB2YXIgZG93ID0gZGF0ZS5nZXREYXkoKTtcbiAgaWYoZG93ID09PSAwKSB7XG4gICAgZG93ID0gNztcbiAgfVxuICByZXR1cm4gZG93O1xufVxuXG4vKipcbiAqIGtpbmQtb2Ygc2hvcnRjdXRcbiAqIEBwYXJhbSAgeyp9IHZhbFxuICogQHJldHVybiB7U3RyaW5nfVxuICovXG5mdW5jdGlvbiBraW5kT2YodmFsKSB7XG4gIGlmICh2YWwgPT09IG51bGwpIHtcbiAgICByZXR1cm4gJ251bGwnO1xuICB9XG5cbiAgaWYgKHZhbCA9PT0gdW5kZWZpbmVkKSB7XG4gICAgcmV0dXJuICd1bmRlZmluZWQnO1xuICB9XG5cbiAgaWYgKHR5cGVvZiB2YWwgIT09ICdvYmplY3QnKSB7XG4gICAgcmV0dXJuIHR5cGVvZiB2YWw7XG4gIH1cblxuICBpZiAoQXJyYXkuaXNBcnJheSh2YWwpKSB7XG4gICAgcmV0dXJuICdhcnJheSc7XG4gIH1cblxuICByZXR1cm4ge30udG9TdHJpbmcuY2FsbCh2YWwpXG4gICAgLnNsaWNlKDgsIC0xKS50b0xvd2VyQ2FzZSgpO1xufTtcblxuXG5cbiAgaWYgKHR5cGVvZiBkZWZpbmUgPT09ICdmdW5jdGlvbicgJiYgZGVmaW5lLmFtZCkge1xuICAgIGRlZmluZShmdW5jdGlvbiAoKSB7XG4gICAgICByZXR1cm4gZGF0ZUZvcm1hdDtcbiAgICB9KTtcbiAgfSBlbHNlIGlmICh0eXBlb2YgZXhwb3J0cyA9PT0gJ29iamVjdCcpIHtcbiAgICBtb2R1bGUuZXhwb3J0cyA9IGRhdGVGb3JtYXQ7XG4gIH0gZWxzZSB7XG4gICAgZ2xvYmFsLmRhdGVGb3JtYXQgPSBkYXRlRm9ybWF0O1xuICB9XG59KSh0aGlzKTtcbiIsIlwidXNlIHN0cmljdFwiO1xuaW1wb3J0IFV0aWxzIGZyb20gXCIuL1V0aWxzXCI7XG5pbXBvcnQgUGluZ1Jlc3VsdCBmcm9tIFwiLi9lbnRpdGllcy9QaW5nUmVzdWx0XCI7XG5pbXBvcnQgQ21wVHlwZSBmcm9tIFwiLi9jbXAvQ21wVHlwZVwiO1xuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQmFja2VuZENhbGwge1xuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgICB0aGlzLl9jbXAgPSBcIm5hXCI7XG4gICAgICAgIHRoaXMuX2NtcFNjcmlwdFVybCA9IFwibmFcIjtcbiAgICAgICAgdGhpcy5fcGluZ1Jlc3VsdCA9IHt9O1xuICAgICAgICB0aGlzLl9pbXBsZW1lbnRlZCA9IGZhbHNlO1xuICAgICAgICAvLyB0aGlzIGlzIGZvciB0aGUgc3RhdGVzLlxuICAgICAgICB0aGlzLl9pc1N1Y2Nlc3NmdWxCbG9jayA9IGZhbHNlO1xuICAgICAgICB0aGlzLl9pc1BpbmdSZXN1bHRSZWNlaXZlZCA9IGZhbHNlO1xuICAgICAgICB0aGlzLl9kYXRhUmVjZWl2ZWQgPSBmYWxzZTtcbiAgICB9XG4gICAgc3RhdGljIGdldCBwYWdlTmFtZSgpIHtcbiAgICAgICAgcmV0dXJuIEJhY2tlbmRDYWxsLl9mcm9tUGFnZTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogU2V0dGVyIGZvciB0aGUgUGluZyBSZXN1bHQsIGlmIHdlIGZpbmQgYSBDTVAgb24gdGhlIFBhZ2VcbiAgICAgKlxuICAgICAqIEBwYXJhbSBwaW5nUmVzdWx0XG4gICAgICovXG4gICAgc2V0IHBpbmdSZXN1bHQocGluZ1Jlc3VsdCkge1xuICAgICAgICBVdGlscy5sb2coXCJQaW5nYmFjayBpbiBCYWNrZW5kQ2FsbCBzZXQ6IFwiICsgcGluZ1Jlc3VsdCk7XG4gICAgICAgIHRoaXMuX3BpbmdSZXN1bHQgPSBQaW5nUmVzdWx0LmNsYXNzKHBpbmdSZXN1bHQpO1xuICAgICAgICB0aGlzLl9pc1BpbmdSZXN1bHRSZWNlaXZlZCA9IHRydWU7XG4gICAgICAgIC8vIGlmIHRoZSBDTVAgd2FzIGFscmVhZHkgY2xpY2tlZCwgZG8gdGhlIGJhY2tlbmQgY2FsbFxuICAgICAgICAvLyB3ZSBvbmx5IGRvIHRoaXMgY2FsbCwgaWYgdGhlIENNUCBpcyBfTk9UXyBpbXBsZW1lbnRlZC4gSWYgd2UgdGhlIENNUCBpcyBpbXBsZW1lbnRlZCwgd2Ugd2FpdCBmb3IgYXJlc3BvbnNlXG4gICAgICAgIC8vIGZyb20gdGhlIEphdmFTY3JpcHQgRGV0ZWN0b3IuXG4gICAgICAgIGlmICh0aGlzLl9kYXRhUmVjZWl2ZWQpIHtcbiAgICAgICAgICAgIGlmICh0aGlzLl9pbXBsZW1lbnRlZCAmJiB0aGlzLl9pc1N1Y2Nlc3NmdWxCbG9jaykge1xuICAgICAgICAgICAgICAgIFV0aWxzLmxvZyhcIldlIGhhdmUgYW4gaW1wbGVtZW50ZWQgZm9yIENNUCBhbmQgc3VjY2VzZnVsIEJsb2NrIGhhcHBlbmQuIFNlbnQgQmFja2VuZCBjYWxsXCIpO1xuICAgICAgICAgICAgICAgIC8vIGNoZWNrIGlmIHRoZXJlIGlzIGEgdGltZW91dCBhbmQgY2FuY2VsIGlmIG5lY2Vzc2FyeS5cbiAgICAgICAgICAgICAgICBjbGVhclRpbWVvdXQodGhpcy5fdGltZW91dEZvckJhY2tlbmRDYWxsKTtcbiAgICAgICAgICAgICAgICAvLyB0cmlnZ2VyIHRoZSBjYWxsIHJpZ2h0IG5vdy5cbiAgICAgICAgICAgICAgICB0aGlzLnRyaWdnZXJDYWxsKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIGlmICh0aGlzLl9pbXBsZW1lbnRlZCAmJiAhdGhpcy5faXNTdWNjZXNzZnVsQmxvY2spIHtcbiAgICAgICAgICAgICAgICBVdGlscy5sb2coXCJXZSBoYXZlIGFuIGltcGxlbWVudGF0aW9uLCBidXQgbm90IHlldCBhIHN1Y2Nlc3NmdWwgYmxvY2suIFdlIGRvbid0IGRvIGFueXRoaW5nLiBzdWNjZXNzZnVsQmxvYygpIHdpbGwgaGFuZGxlXCIpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSBpZiAoIXRoaXMuX2ltcGxlbWVudGVkICYmIHRoaXMuX2lzU3VjY2Vzc2Z1bEJsb2NrKSB7XG4gICAgICAgICAgICAgICAgVXRpbHMubG9nKFwiVGhpcyBDTVAgaXMgbm90IHlldCBpbXBsZW1lbnRlZCAob3Igbm90IHlldCBzZXQpXCIpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgVXRpbHMubG9nKFwiVGhlcmUgaXMgbm8gaW1wbGVtZW50YXRpb24gYW5kIG5vIHN1Y2Nlc3NmdWwgQm9ja1wiKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIFV0aWxzLmxvZyhcIldlIGRvbid0IGhhdmUgYSBDTVAgSW1wbGVtZW50YXRpb24geWV0LCBidXQgYWxyZWFkeSBQaW5nQmFjayBEYXRhLiBGb3IgU2FmdGV5IFJlYXNvbnMsIHdlIHNjaGVkdWxlIGJhY2tlbmRjYWxsXCIpO1xuICAgICAgICAgICAgdGhpcy5fdGltZW91dEZvckJhY2tlbmRDYWxsID0gc2V0VGltZW91dCh0aGlzLnRyaWdnZXJDYWxsLmJpbmQodGhpcyksIDUwMDApO1xuICAgICAgICB9XG4gICAgfVxuICAgIGNtcERhdGEoY21wSWQsIGNtcCwgY21wU2NyaXB0VXJsLCB0eXBlLCBpbXBsZW1lbnRlZCkge1xuICAgICAgICBVdGlscy5sb2coXCJEYXRhIHNldCBieSBDTVBcIik7XG4gICAgICAgIHRoaXMuX2NtcElkID0gY21wSWQ7XG4gICAgICAgIHRoaXMuX2NtcCA9IGNtcDtcbiAgICAgICAgdGhpcy5fY21wU2NyaXB0VXJsID0gY21wU2NyaXB0VXJsO1xuICAgICAgICB0aGlzLl90eXBlID0gdHlwZTtcbiAgICAgICAgdGhpcy5faW1wbGVtZW50ZWQgPSBpbXBsZW1lbnRlZDtcbiAgICAgICAgdGhpcy5fZGF0YVJlY2VpdmVkID0gdHJ1ZTtcbiAgICB9XG4gICAgc3VjY2Vzc2Z1bEJsb2NrKCkge1xuICAgICAgICBVdGlscy5sb2coXCJzdWNjZWZ1bGJsb2NrIGluIEJhY2tlbmRDYWxsXCIpO1xuICAgICAgICB0aGlzLl9pc1N1Y2Nlc3NmdWxCbG9jayA9IHRydWU7XG4gICAgICAgIGlmICh0aGlzLl9pc1BpbmdSZXN1bHRSZWNlaXZlZCkge1xuICAgICAgICAgICAgVXRpbHMubG9nKFwiUGluZyBpcyBoZXJlLCBzdWNjZXNzZnVsIGJvY2sgdG9vLiBUcmlnZ2VyIEJhY2tlbmRDYWxsXCIpO1xuICAgICAgICAgICAgLy8gY2hlY2sgaWYgdGhlcmUgaXMgYSB0aW1lb3V0IGFuZCBjYW5jZWwgaWYgbmVjZXNzYXJ5LlxuICAgICAgICAgICAgY2xlYXJUaW1lb3V0KHRoaXMuX3RpbWVvdXRGb3JCYWNrZW5kQ2FsbCk7XG4gICAgICAgICAgICAvLyB3ZSBoYXZlIGV2ZXJ5dGhpbmcsIHRyaWdnZXIgYmFja2VuZCBjYWxsXG4gICAgICAgICAgICB0aGlzLnRyaWdnZXJDYWxsKCk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAvLyBTZW5kaW5nIHRvIEJhY2tncm91bmQgU2NyaXB0XG4gICAgICAgICAgICBzd2l0Y2ggKHRoaXMuX3R5cGUpIHtcbiAgICAgICAgICAgICAgICBjYXNlIENtcFR5cGUuV0FJVF9GT1JfQVNZTkNfQ0FMTEJBQ0s6XG4gICAgICAgICAgICAgICAgICAgIC8vIGlmIHdlIHdhaXQgZm9yIHRoZSBjYWxsYmFjaywgdGhlIGJhY2tlbmQgY2FsbCBpcyBkb25lIGluIHRoZSAnc2V0UGluZ1Jlc3VsdCc7XG4gICAgICAgICAgICAgICAgICAgIC8vIHdlIGFscmVhZHkgaGF2ZSBjbGljayBhd2F5IHRoZSBDTVAgc28sIHdhaXQgZm9yIHRoZSBwaW5ncmVzdWx0IGFuZCBnby5cbiAgICAgICAgICAgICAgICAgICAgVXRpbHMubG9nKFwiV2UgYXJlIHdhaXRpbmcgZm9yIHRoZSBXZWJzaXRlIHRvIHNlbmQgdGhlIFBpbmdSZXN1bHRcIik7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgQ21wVHlwZS5XQUlUX0ZPUl9USU1FX0ZSQU1FOlxuICAgICAgICAgICAgICAgICAgICBVdGlscy5sb2coXCJXZSBhcmUgd2FpdGluZyBmaXZlIHNlY29uZHMgdG8gdHJpZ2dlciB0aGUgYmFja2VuZCBjYWxsXCIpO1xuICAgICAgICAgICAgICAgICAgICBjbGVhclRpbWVvdXQodGhpcy5fdGltZW91dEZvckJhY2tlbmRDYWxsKTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fdGltZW91dEZvckJhY2tlbmRDYWxsID0gc2V0VGltZW91dCh0aGlzLnRyaWdnZXJDYWxsLmJpbmQodGhpcyksIDUwMDApO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlIENtcFR5cGUuRE9fTk9UX1dBSVQ6XG4gICAgICAgICAgICAgICAgICAgIFV0aWxzLmxvZyhcIldlIFRyaWdnZXIgdGhlIEJhY2tlbmQgQ2FsbCByaWdodCBub3dcIik7XG4gICAgICAgICAgICAgICAgICAgIGNsZWFyVGltZW91dCh0aGlzLl90aW1lb3V0Rm9yQmFja2VuZENhbGwpO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnRyaWdnZXJDYWxsKCk7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcIlVua25vd24gQ01QIFR5cGVcIik7XG4gICAgICAgICAgICB9IC8vIHN3aXRjaFxuICAgICAgICB9XG4gICAgfVxuICAgIC8qKlxuICAgICAqIEFjdHVhbCBNZXRob2QgdG8gdHJpZ2dlciB0aGUgYmFja2VuZCBjYWxsLiBDYW4gYmUgdHJpZ2dlcmVkIGZyb20gdmFyaW91cyBmdW5jdGlvbnNcbiAgICAgKi9cbiAgICB0cmlnZ2VyQ2FsbCgpIHtcbiAgICAgICAgVXRpbHMubG9nKFwiQ2FsbCBub3cgVHJpZ2dlcmVkXCIpO1xuICAgICAgICAvLyBJZiB0aGUgQ01QLUlEIGlzIG5vdCBzZXQgaW4gdGhlIFBpbmcgUmVzdWx0LCBwdXQgaXQgdGhlcmUuXG4gICAgICAgIGlmICh0eXBlb2YgdGhpcy5fcGluZ1Jlc3VsdC5jbXBJZCA9PT0gXCJ1bmRlZmluZWRcIikge1xuICAgICAgICAgICAgdGhpcy5fcGluZ1Jlc3VsdC5jbXBJZCA9IHRoaXMuX2NtcElkO1xuICAgICAgICB9XG4gICAgICAgIC8vIHdlIGFyZSBzZW5kaW5nIHNlcGFyYXRlIGNvbXBvbmVudHMgaW4gJ3NlbmRNZXNzYWdlKCknIGFzIGluIHRoZSBCYWNrZW5kQ2FsbCwgd2UgZG9uJ3Qga25vdyB0aGUgVVJMLlxuICAgICAgICAvLyB0aGlzIGNsYXNzIGlzIHBhcnQgb2YgdGhlIGNvbnRlbnQtU2NyaXB0IGFuZCBoYXMgbm8gYWNjZXNzIHRvIHRoZSBVUkwuXG4gICAgICAgIGlmICh0eXBlb2Ygc2FmYXJpICE9PSAndW5kZWZpbmVkJykge1xuICAgICAgICAgICAgVXRpbHMubG9nKFwiKysrIHRyaWdnZXJDYWxsIG9uIFNhZmFyaSArKytcIik7XG4gICAgICAgICAgICBldmFsKFwic2FmYXJpLmV4dGVuc2lvbi5kaXNwYXRjaE1lc3NhZ2UoJ3NvbWVNZXNzYWdlJywge2NtcDogdGhpcy5fY21wLFwiICtcbiAgICAgICAgICAgICAgICBcImNtcFNjcmlwdFVybDogdGhpcy5fY21wU2NyaXB0VXJsLFwiICtcbiAgICAgICAgICAgICAgICBcInBpbmdSZXN1bHQ6IHRoaXMuX3BpbmdSZXN1bHQsXCIgK1xuICAgICAgICAgICAgICAgIFwiaW1wbGVtZW50ZWQ6IHRoaXMuX2ltcGxlbWVudGVkLFwiICtcbiAgICAgICAgICAgICAgICBcImZyb206IEJhY2tlbmRDYWxsLnBhZ2VOYW1lfSlcIik7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAodHlwZW9mIGNocm9tZSAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgICAgIFV0aWxzLmxvZyhcIisrKyB0cmlnZ2VyQ2FsbCBvbiBDaHJvbWUgKysrXCIpO1xuICAgICAgICAgICAgY2hyb21lLnJ1bnRpbWUuc2VuZE1lc3NhZ2Uoe1xuICAgICAgICAgICAgICAgIGNtcDogdGhpcy5fY21wLFxuICAgICAgICAgICAgICAgIGNtcFNjcmlwVXJsOiB0aGlzLl9jbXBTY3JpcHRVcmwsXG4gICAgICAgICAgICAgICAgcGluZ1Jlc3VsdDogdGhpcy5fcGluZ1Jlc3VsdCxcbiAgICAgICAgICAgICAgICBpbXBsZW1lbnRlZDogdGhpcy5faW1wbGVtZW50ZWQsXG4gICAgICAgICAgICAgICAgZnJvbTogQmFja2VuZENhbGwucGFnZU5hbWVcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgVXRpbHMubG9nKFwiKysrIHRyaWdnZXJDYWxsIG9uIHNvbWUgb3RoZXIgUGxhdGZvcm0gKysrXCIpO1xuICAgICAgICB9XG4gICAgfVxufVxuQmFja2VuZENhbGwuX2Zyb21QYWdlID0gXCJiYWNrZW5kQ2FsbFwiO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5pbXBvcnQgVXRpbHMgZnJvbSBcIi4vVXRpbHNcIjtcbmltcG9ydCBUcnVzdEFyY0lGcmFtZSBmcm9tIFwiLi9jbXAvVHJ1c3RBcmNJRnJhbWVcIjtcbmltcG9ydCBUcnVzdEFyY0Jhbm5lciBmcm9tIFwiLi9jbXAvVHJ1c3RBcmNCYW5uZXJcIjtcbmltcG9ydCBFdmlkb24gZnJvbSBcIi4vY21wL0V2aWRvblwiO1xuaW1wb3J0IEN1c3RvbUltcGwgZnJvbSBcIi4vY21wL0N1c3RvbUltcGxcIjtcbmltcG9ydCBPbmVUcnVzdCBmcm9tIFwiLi9jbXAvT25lVHJ1c3RcIjtcbmltcG9ydCBDb29raWVCb3QgZnJvbSBcIi4vY21wL0Nvb2tpZUJvdFwiO1xuaW1wb3J0IFVzZXJDZW50cmljcyBmcm9tIFwiLi9jbXAvVXNlckNlbnRyaWNzXCI7XG5pbXBvcnQgUXVhbnRDYXN0IGZyb20gXCIuL2NtcC9RdWFudENhc3RcIjtcbmltcG9ydCBUcmFmZmVjdGl2ZSBmcm9tIFwiLi9jbXAvVHJhZmZlY3RpdmVcIjtcbmltcG9ydCBDb25zZW50TWFuYWdlciBmcm9tIFwiLi9jbXAvQ29uc2VudE1hbmFnZXJcIjtcbmltcG9ydCBOb3RZZXRJbXBsZW1lbnRlZENtcCBmcm9tIFwiLi9jbXAvTm9ZZXRJbXBsZW1lbnRlZENtcFwiO1xuaW1wb3J0IEJhY2tlbmRDYWxsIGZyb20gXCIuL0JhY2tlbmRDYWxsXCI7XG5pbXBvcnQgQ2hhbmRhZ28gZnJvbSBcIi4vY21wL0NoYW5kYWdvXCI7XG5pbXBvcnQgT2F0aENtcCBmcm9tIFwiLi9jbXAvT2F0aENtcFwiO1xuaW1wb3J0IFNvdXJjZVBvaW50IGZyb20gXCIuL2NtcC9Tb3VyY2VQb2ludFwiO1xuaW1wb3J0IERpRG9NaSBmcm9tIFwiLi9jbXAvRGlEb01pXCI7XG5pbXBvcnQgQm9ybGFicyBmcm9tIFwiLi9jbXAvQm9ybGFic1wiO1xuLy8gdGhpcyBpcyBzb21lIHN0YXRpYyBzdHVmZiBmb3IgdGhlIGxvbmcgdGFpbC5cbmNvbnN0IGJ1dHRvbnMgPSB7XG4gICAgJ2EjaHMtZXUtZGVjbGluZS1idXR0b24nOiBcIm5wbWpzLmNvbVwiLFxuICAgIFwiYSNjb29raWVfYWN0aW9uX2Nsb3NlX2hlYWRlclwiOiBcInRlYWxpdW0uY29tXCIsXG4gICAgXCJidXR0b24jZ2Rwci1iYW5uZXItYWNjZXB0XCI6IFwiZWJheS5jb20gJiBlYmF5LWtsZWluYW56ZWlnZW4uY29tXCIsXG4gICAgXCJidXR0b24jYWNjZXB0QWxsQnV0dG9uXCI6IFwiUGF5UGFsXCIsXG4gICAgXCJzcGFuI2NtcHdlbGNvbWVidG5ub1wiOiBcIldvcmRwcmVzcyBQbHVnaW4gaHR0cHM6Ly93d3cudGVrdHV0b3JpYWxzaHViLmNvbS9cIixcbiAgICBcImEuY21wYm94YnRubm9cIjogXCJXb3JkcHJlc3MgUGx1Z2luIHd3dy5teWtvbmcuY29tXCIsXG4gICAgXCJwLl9icmxicy1yZWZ1c2UtYnRuXCI6IFwiV29yZHByZXNzIFBsdWdpbiBodHRwczovL3d3dy5zdGF1YnNhdWdlci1iZXJhdGVyLmRlLyAoQm9ybGFicylcIlxufTtcbi8vIHdlIG5lZWQgdG8ga2VlcCBsb2FkIGEgbGl0dGxlIGEgcG9zc2libGUuXG5jb25zdCBjb25maWcgPSB7IGF0dHJpYnV0ZXM6IGZhbHNlLCBjaGlsZExpc3Q6IHRydWUsIHN1YnRyZWU6IGZhbHNlIH07XG5leHBvcnQgZGVmYXVsdCBjbGFzcyBEZXRlY3RvciB7XG4gICAgY29uc3RydWN0b3IoZG9jdW1lbnQsIGluSWZyYW1lKSB7XG4gICAgICAgIHRoaXMuX2RvY3VtZW50ID0gZG9jdW1lbnQ7XG4gICAgICAgIHRoaXMuX2JhY2tlbmRDYWxsID0gbmV3IEJhY2tlbmRDYWxsKCk7XG4gICAgICAgIHRoaXMuX2luSUZyYW1lID0gaW5JZnJhbWU7XG4gICAgICAgIHRoaXMuX2NhbGxCYWNrQ291bnRlciA9IDA7XG4gICAgfVxuICAgIHNldCBwaW5nUmVzdWx0KHBpbmdSZXN1bHQpIHtcbiAgICAgICAgdGhpcy5fYmFja2VuZENhbGwucGluZ1Jlc3VsdCA9IHBpbmdSZXN1bHQ7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIENvbm5lY3Rpb24gdG8gdGhlIE9ic2VydmVyIGlzIG91dHNvdXJjZWQgb3V0IG9mIHRoZSBDb25zdHJ1Y3RvciBpbiBvcmRlciB0byBoYXZlIHRoZSBPYmplY3QgaW5pdGlhbGl6ZWQgZmlyc3QuXG4gICAgICogT25seSBhZnRlciB0aGF0IHRoZSBvYnNlcnZlciBjYW4gYmUgcmVnaXN0ZXJlZCBpbiBhIHNhdmUgd2F5LlxuICAgICAqL1xuICAgIGNvbm5lY3RPYnNlcnZlcigpIHtcbiAgICAgICAgdGhpcy5oYW5kbGVDTVAodHJ1ZSk7XG4gICAgICAgIC8vIE9wdGlvbnMgZm9yIHRoZSBvYnNlcnZlciAod2hpY2ggbXV0YXRpb25zIHRvIG9ic2VydmUpXG4gICAgICAgIGxldCBzZWxmID0gdGhpcztcbiAgICAgICAgdGhpcy5fb2JzZXJ2ZXJGb3JTY3JpcHRTb3VyY2UgPSBuZXcgTXV0YXRpb25PYnNlcnZlcihmdW5jdGlvbiAobXV0YXRpb25zKSB7XG4gICAgICAgICAgICBzZWxmLmhhbmRsZUNtcEltbWVkaWF0ZWx5KG11dGF0aW9ucywgc2VsZik7XG4gICAgICAgIH0pO1xuICAgICAgICAvLyBTZWxlY3QgdGhlIG5vZGUgdGhhdCB3aWxsIGJlIG9ic2VydmVkIGZvciBtdXRhdGlvbnNcbiAgICAgICAgdGhpcy5fb2JzZXJ2ZXJGb3JTY3JpcHRTb3VyY2Uub2JzZXJ2ZSh0aGlzLl9kb2N1bWVudC5ib2R5LCBjb25maWcpO1xuICAgIH1cbiAgICBkaXNjb25uZWN0T2JzZXJ2ZXIoKSB7XG4gICAgICAgIFV0aWxzLmxvZyhcIkRpc2Nvbm5lY3QgZnJvbSBPYnNlcnZlclwiKTtcbiAgICAgICAgdGhpcy5fb2JzZXJ2ZXJGb3JTY3JpcHRTb3VyY2UuZGlzY29ubmVjdCgpO1xuICAgIH1cbiAgICBoYW5kbGVDbXBJbW1lZGlhdGVseShtdXRhdGlvbnMsIF9zZWxmKSB7XG4gICAgICAgIG11dGF0aW9ucy5mb3JFYWNoKGZ1bmN0aW9uIChtdXRhdGlvbikge1xuICAgICAgICAgICAgLy8gY29uc29sZS5sb2cobXV0YXRpb24uYWRkZWROb2Rlcyk7XG4gICAgICAgICAgICBtdXRhdGlvbi5hZGRlZE5vZGVzLmZvckVhY2goZnVuY3Rpb24gKHZhbHVlLCBrZXksIHBhcmVudCkge1xuICAgICAgICAgICAgICAgIGlmICh2YWx1ZS5ub2RlTmFtZS50b0xvd2VyQ2FzZSgpLmluY2x1ZGVzKFwic2NyaXB0XCIpKSB7XG4gICAgICAgICAgICAgICAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgX3NlbGYuaGFuZGxlQ01QKGZhbHNlKTtcbiAgICAgICAgICAgICAgICAgICAgfSwgMjUpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICB9XG4gICAgaGFuZGxlQ01QKGZpcnN0VGltZSkge1xuICAgICAgICBVdGlscy5sb2coXCJlbnRlclwiKTtcbiAgICAgICAgdGhpcy5fY2FsbEJhY2tDb3VudGVyKys7XG4gICAgICAgIGxldCBhbGxTY3JpcHRUYWdzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcInNjcmlwdFwiKTtcbiAgICAgICAgbGV0IHNjcmlwdENvdW50ZXI7XG4gICAgICAgIGlmICh0aGlzLl9jbXApIHtcbiAgICAgICAgICAgIFV0aWxzLmxvZyhcIkNNUCBEZWZpbmVkICh3ZSBzaG91bGQgbmV2ZXIgZW5kIHVwIGhlcmUsIGFzIHRoZSBvYnNlcnZlciB3aWxsIGRpc2Nvbm5lY3QsIGlmIHRoaXMuX2NtcCBpcyBzZXRcIik7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgbGV0IHN0YXJ0ID0gbmV3IERhdGUoKS5nZXRNaWxsaXNlY29uZHMoKTtcbiAgICAgICAgVXRpbHMubG9nKFwic2NyaXB0czogXCIgKyBhbGxTY3JpcHRUYWdzLmxlbmd0aCk7XG4gICAgICAgIC8vIHNvbWUgQ01QcyBydW4gaW4gaUZyYW1lcyBhbmQgdGhlcmVmb3JlIHJlcXVpcmUgZGlmZmVyZW50IGhhbmRsaW5nLlxuICAgICAgICBpZiAodGhpcy5faW5JRnJhbWUpIHtcbiAgICAgICAgICAgIFV0aWxzLmxvZyhcImlGcmFtZSBTY3I6IFwiICsgZG9jdW1lbnQubG9jYXRpb24udG9TdHJpbmcoKSk7XG4gICAgICAgICAgICBpZiAoZG9jdW1lbnQubG9jYXRpb24udG9TdHJpbmcoKS5pbmNsdWRlcyhcInNwLXByb2QubmV0XCIpIHx8IGRvY3VtZW50LmxvY2F0aW9uLnRvU3RyaW5nKCkuaW5jbHVkZXMoXCJzb3VyY2Vwb2ludC5tZ3IuY29uc2Vuc3Uub3JnXCIpKSB7XG4gICAgICAgICAgICAgICAgVXRpbHMubG9nKFwiU1A6IFwiICsgZG9jdW1lbnQubG9jYXRpb24udG9TdHJpbmcoKSk7XG4gICAgICAgICAgICAgICAgdGhpcy5fY21wID0gbmV3IFNvdXJjZVBvaW50KHRoaXMuX2RvY3VtZW50LCBkb2N1bWVudC5sb2NhdGlvbi50b1N0cmluZygpLCB0aGlzLl9iYWNrZW5kQ2FsbCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIGlmIChkb2N1bWVudC5sb2NhdGlvbi50b1N0cmluZygpLmluY2x1ZGVzKFwidHJ1c3RhcmMuY29tXCIpKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5fY21wID0gbmV3IFRydXN0QXJjSUZyYW1lKHRoaXMuX2RvY3VtZW50LCBkb2N1bWVudC5sb2NhdGlvbi50b1N0cmluZygpLCB0aGlzLl9iYWNrZW5kQ2FsbCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIGlmIChkb2N1bWVudC5sb2NhdGlvbi50b1N0cmluZygpLmluY2x1ZGVzKFwiL2NtcHVpLmh0bWxcIikgJiYgZG9jdW1lbnQubG9jYXRpb24udG9TdHJpbmcoKS5pbmNsdWRlcyhcImNvbnNlbnRcIikpIHtcbiAgICAgICAgICAgICAgICB0aGlzLl9jbXAgPSBuZXcgT2F0aENtcCh0aGlzLl9kb2N1bWVudCwgZG9jdW1lbnQubG9jYXRpb24udG9TdHJpbmcoKSwgdGhpcy5fYmFja2VuZENhbGwpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgLy8gbm90IGZvdW5kLlxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIC8vIE5vdCBpbiBJRnJhbWUuXG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgLy8gdGhpcyBpcyB0aGUganVtcCBwb2ludCB3ZSByZXF1aXJlZCBmb3IgdGhlIG5lc3RlZCBsb29wXG4gICAgICAgICAgICBhbGxTY3JpcHRzOiBmb3IgKHNjcmlwdENvdW50ZXIgPSAwOyBzY3JpcHRDb3VudGVyIDwgYWxsU2NyaXB0VGFncy5sZW5ndGg7IHNjcmlwdENvdW50ZXIrKykge1xuICAgICAgICAgICAgICAgIGxldCB1cmxPZlNjcmlwdCA9IGFsbFNjcmlwdFRhZ3Nbc2NyaXB0Q291bnRlcl0uZ2V0QXR0cmlidXRlKFwic3JjXCIpO1xuICAgICAgICAgICAgICAgIGlmICh1cmxPZlNjcmlwdCAmJiB0eXBlb2YgdXJsT2ZTY3JpcHQgIT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgICAgICAgICAgICAgIC8vIGlmIHRoZSBzY3JpcHQgZGVmaW5lZCwgbWFrZSBpdCBsb3dlcmNhc2UuXG4gICAgICAgICAgICAgICAgICAgIHVybE9mU2NyaXB0ID0gdXJsT2ZTY3JpcHQudG9Mb3dlckNhc2UoKTtcbiAgICAgICAgICAgICAgICAgICAgLy8gVXRpbHMubG9nKHVybE9mU2NyaXB0KTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHVybE9mU2NyaXB0LmluY2x1ZGVzKCd0cnVzdGUuY29tJykgfHwgdXJsT2ZTY3JpcHQuaW5jbHVkZXMoJ3RydXN0YXJjLmNvbScpIHx8IHVybE9mU2NyaXB0LmluY2x1ZGVzKCd0cnVzdGFyYy5tZ3IuY29uc2Vuc3Uub3JnJykpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuX2NtcCA9IG5ldyBUcnVzdEFyY0Jhbm5lcih0aGlzLl9kb2N1bWVudCwgdXJsT2ZTY3JpcHQsIHRoaXMuX2JhY2tlbmRDYWxsKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGVsc2UgaWYgKHVybE9mU2NyaXB0LmluY2x1ZGVzKCdldmlkb24uY29tJykgfHwgdXJsT2ZTY3JpcHQuaW5jbHVkZXMoXCJldmlkb24ubWdyLmNvbnNlbnN1Lm9yZ1wiKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5fY21wID0gbmV3IEV2aWRvbih0aGlzLl9kb2N1bWVudCwgdXJsT2ZTY3JpcHQsIHRoaXMuX2JhY2tlbmRDYWxsKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGVsc2UgaWYgKHVybE9mU2NyaXB0LmluY2x1ZGVzKCdjb29raWVsYXcub3JnJykgfHwgdXJsT2ZTY3JpcHQuaW5jbHVkZXMoJ2Nvb2tpZXByby5jb20nKSB8fCB1cmxPZlNjcmlwdC5pbmNsdWRlcygnb25ldHJ1c3QubWdyLmNvbnNlbnN1Lm9yZycpIHx8IHVybE9mU2NyaXB0LmluY2x1ZGVzKCdvcHRhbm9uJykpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuX2NtcCA9IG5ldyBPbmVUcnVzdCh0aGlzLl9kb2N1bWVudCwgdXJsT2ZTY3JpcHQsIHRoaXMuX2JhY2tlbmRDYWxsKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGVsc2UgaWYgKHVybE9mU2NyaXB0LmluY2x1ZGVzKCdjb29raWVib3QuY29tJykgfHwgdXJsT2ZTY3JpcHQuaW5jbHVkZXMoXCJjb29raWVib3QubWdyLmNvbnNlbnN1Lm9yZ1wiKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5fY21wID0gbmV3IENvb2tpZUJvdCh0aGlzLl9kb2N1bWVudCwgdXJsT2ZTY3JpcHQsIHRoaXMuX2JhY2tlbmRDYWxsKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGVsc2UgaWYgKHVybE9mU2NyaXB0LmluY2x1ZGVzKCd1c2VyY2VudHJpY3MuZXUnKSB8fCB1cmxPZlNjcmlwdC5pbmNsdWRlcygndXNlcmNlbnRyaWNzLm1nci5jb25zZW5zdS5vcmcnKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5fY21wID0gbmV3IFVzZXJDZW50cmljcyh0aGlzLl9kb2N1bWVudCwgdXJsT2ZTY3JpcHQsIHRoaXMuX2JhY2tlbmRDYWxsKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGVsc2UgaWYgKHVybE9mU2NyaXB0LmluY2x1ZGVzKCdxdWFudGNhc3QuY29tJykgfHwgdXJsT2ZTY3JpcHQuaW5jbHVkZXMoXCJxdWFudGNhc3QubWdyLmNvbnNlbnN1Lm9yZ1wiKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5fY21wID0gbmV3IFF1YW50Q2FzdCh0aGlzLl9kb2N1bWVudCwgdXJsT2ZTY3JpcHQsIHRoaXMuX2JhY2tlbmRDYWxsKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGVsc2UgaWYgKHVybE9mU2NyaXB0LmluY2x1ZGVzKCd0cmFmZmVjdGl2ZS5jb20nKSB8fCB1cmxPZlNjcmlwdC5pbmNsdWRlcygndHJhZmZlY3RpdmUubWdyLmNvbnNlbnN1Lm9yZycpIHx8IHVybE9mU2NyaXB0LmluY2x1ZGVzKCdjZG50cmYuY29tJykpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuX2NtcCA9IG5ldyBUcmFmZmVjdGl2ZSh0aGlzLl9kb2N1bWVudCwgdXJsT2ZTY3JpcHQsIHRoaXMuX2JhY2tlbmRDYWxsKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGVsc2UgaWYgKHVybE9mU2NyaXB0LmluY2x1ZGVzKCdjb25zZW50bWFuYWdlci5tZ3IuY29uc2Vuc3Uub3JnJykpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuX2NtcCA9IG5ldyBDb25zZW50TWFuYWdlcih0aGlzLl9kb2N1bWVudCwgdXJsT2ZTY3JpcHQsIHRoaXMuX2JhY2tlbmRDYWxsKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGVsc2UgaWYgKHVybE9mU2NyaXB0LmluY2x1ZGVzKCdjaGFuZGFnby5jb20nKSB8fCB1cmxPZlNjcmlwdC5pbmNsdWRlcygnYXBwY29uc2VudC5tZ3IuY29uc2Vuc3Uub3JnJykgfHwgdXJsT2ZTY3JpcHQuaW5jbHVkZXMoJ2FwcGNvbnNlbnQuaW8nKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5fY21wID0gbmV3IENoYW5kYWdvKHRoaXMuX2RvY3VtZW50LCB1cmxPZlNjcmlwdCwgdGhpcy5fYmFja2VuZENhbGwpO1xuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgZWxzZSBpZiAodXJsT2ZTY3JpcHQuaW5jbHVkZXMoJ2RpZG9taS5pbycpIHx8IHVybE9mU2NyaXB0LmluY2x1ZGVzKCdkaWRvbWkubWdyLmNvbnNlbnN1Lm9yZycpIHx8IHVybE9mU2NyaXB0LmluY2x1ZGVzKCdwcml2YWN5LWNlbnRlci5vcmcnKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5fY21wID0gbmV3IERpRG9NaSh0aGlzLl9kb2N1bWVudCwgdXJsT2ZTY3JpcHQsIHRoaXMuX2JhY2tlbmRDYWxsKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGVsc2UgaWYgKGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5pbm5lckhUTUwuaW5jbHVkZXMoXCJib3JsYWJzLWNvb2tpZVwiKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5fY21wID0gbmV3IEJvcmxhYnModGhpcy5fZG9jdW1lbnQsIHVybE9mU2NyaXB0LCB0aGlzLl9iYWNrZW5kQ2FsbCk7XG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAvKiBBVFRFTlRJT04gLSBUSElTIElTIEdFTkVSQVRFRCBDT0RFIEZST00gVEhFIEVYRUNMIFNIRUVUICovXG4gICAgICAgICAgICAgICAgICAgIGVsc2UgaWYgKHVybE9mU2NyaXB0LmluY2x1ZGVzKCdmYWt0b3IuaW8nKSB8fCB1cmxPZlNjcmlwdC5pbmNsdWRlcygnZmFrdG9yLm1nci5jb25zZW5zdS5vcmcnKSB8fCB1cmxPZlNjcmlwdC5pbmNsdWRlcygnbGl2ZXJhbXAuY29tJykpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuX2NtcCA9IG5ldyBOb3RZZXRJbXBsZW1lbnRlZENtcCgzLCB0aGlzLl9kb2N1bWVudCwgJ0Zha3RvciBCVicsIHVybE9mU2NyaXB0LCB0aGlzLl9iYWNrZW5kQ2FsbCk7XG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBlbHNlIGlmICh1cmxPZlNjcmlwdC5pbmNsdWRlcygnYmF5Y2xvdWQuY29tJykgfHwgdXJsT2ZTY3JpcHQuaW5jbHVkZXMoJ2NvbnNlbnRodWIubWdyLmNvbnNlbnN1Lm9yZycpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLl9jbXAgPSBuZXcgTm90WWV0SW1wbGVtZW50ZWRDbXAoOCwgdGhpcy5fZG9jdW1lbnQsICdCYXljbG91ZCBTeXN0ZW1zIExpbWl0ZWQnLCB1cmxPZlNjcmlwdCwgdGhpcy5fYmFja2VuZENhbGwpO1xuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgZWxzZSBpZiAodXJsT2ZTY3JpcHQuaW5jbHVkZXMoJ2dldGFkbWlyYWwuY29tJykgfHwgdXJsT2ZTY3JpcHQuaW5jbHVkZXMoJ2FkbWlyYWwubWdyLmNvbnNlbnN1Lm9yZycpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLl9jbXAgPSBuZXcgTm90WWV0SW1wbGVtZW50ZWRDbXAoOSwgdGhpcy5fZG9jdW1lbnQsICdBZG1pcmFsJywgdXJsT2ZTY3JpcHQsIHRoaXMuX2JhY2tlbmRDYWxsKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGVsc2UgaWYgKHVybE9mU2NyaXB0LmluY2x1ZGVzKCdzb3Zybi5jb20nKSB8fCB1cmxPZlNjcmlwdC5pbmNsdWRlcygnc292cm4ubWdyLmNvbnNlbnN1Lm9yZycpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLl9jbXAgPSBuZXcgTm90WWV0SW1wbGVtZW50ZWRDbXAoMTEsIHRoaXMuX2RvY3VtZW50LCAnU292cm4gSG9sZGluZ3MgSW5jZScsIHVybE9mU2NyaXB0LCB0aGlzLl9iYWNrZW5kQ2FsbCk7XG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBlbHNlIGlmICh1cmxPZlNjcmlwdC5pbmNsdWRlcygnZGlnaXRydS5zdCcpIHx8IHVybE9mU2NyaXB0LmluY2x1ZGVzKCdkaWdpdHJ1c3QubWdyLmNvbnNlbnN1Lm9yZycpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLl9jbXAgPSBuZXcgTm90WWV0SW1wbGVtZW50ZWRDbXAoMTUsIHRoaXMuX2RvY3VtZW50LCAnQ29va2llIFRydXN0IFdvcmtpbmcgR3JvdXAsIEluYy4nLCB1cmxPZlNjcmlwdCwgdGhpcy5fYmFja2VuZENhbGwpO1xuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgZWxzZSBpZiAodXJsT2ZTY3JpcHQuaW5jbHVkZXMoJ3NraW1saW5rcy5jb20nKSB8fCB1cmxPZlNjcmlwdC5pbmNsdWRlcygnc2tpbWxpbmtzLm1nci5jb25zZW5zdS5vcmcnKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5fY21wID0gbmV3IE5vdFlldEltcGxlbWVudGVkQ21wKDIwLCB0aGlzLl9kb2N1bWVudCwgJ1NraW1iaXQgTHRkJywgdXJsT2ZTY3JpcHQsIHRoaXMuX2JhY2tlbmRDYWxsKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGVsc2UgaWYgKHVybE9mU2NyaXB0LmluY2x1ZGVzKCdjb252ZXJzYW50bWVkaWEuZXUnKSB8fCB1cmxPZlNjcmlwdC5pbmNsdWRlcygnY29udmVyc2FudC5tZ3IuY29uc2Vuc3Uub3JnJykpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuX2NtcCA9IG5ldyBOb3RZZXRJbXBsZW1lbnRlZENtcCgyMywgdGhpcy5fZG9jdW1lbnQsICdDb252ZXJzYW50IEV1cm9wZSBMdGQuJywgdXJsT2ZTY3JpcHQsIHRoaXMuX2JhY2tlbmRDYWxsKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGVsc2UgaWYgKHVybE9mU2NyaXB0LmluY2x1ZGVzKCdzaGFyZXRoaXMuY29tJykgfHwgdXJsT2ZTY3JpcHQuaW5jbHVkZXMoJ3NoYXJldGhpcy5tZ3IuY29uc2Vuc3Uub3JnJykpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuX2NtcCA9IG5ldyBOb3RZZXRJbXBsZW1lbnRlZENtcCgyNSwgdGhpcy5fZG9jdW1lbnQsICdTaGFyZVRoaXMsIEluYy4nLCB1cmxPZlNjcmlwdCwgdGhpcy5fYmFja2VuZENhbGwpO1xuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgZWxzZSBpZiAodXJsT2ZTY3JpcHQuaW5jbHVkZXMoJ2RtZ21lZGlhLmNvLnVrJykgfHwgdXJsT2ZTY3JpcHQuaW5jbHVkZXMoJ2RtZ21lZGlhLm1nci5jb25zZW5zdS5vcmcnKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5fY21wID0gbmV3IE5vdFlldEltcGxlbWVudGVkQ21wKDI3LCB0aGlzLl9kb2N1bWVudCwgJ0Fzc29jaWF0ZWQgTmV3c3BhcGVycyBMdGQnLCB1cmxPZlNjcmlwdCwgdGhpcy5fYmFja2VuZENhbGwpO1xuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgZWxzZSBpZiAodXJsT2ZTY3JpcHQuaW5jbHVkZXMoJ2NhcHRpZnkuY28udWsnKSB8fCB1cmxPZlNjcmlwdC5pbmNsdWRlcygnY2FwdGlmeS5tZ3IuY29uc2Vuc3Uub3JnJykpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuX2NtcCA9IG5ldyBOb3RZZXRJbXBsZW1lbnRlZENtcCgyOSwgdGhpcy5fZG9jdW1lbnQsICdDYXB0aWZ5IFRlY2hub2xvZ2llcyBMaW1pdGVkJywgdXJsT2ZTY3JpcHQsIHRoaXMuX2JhY2tlbmRDYWxsKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGVsc2UgaWYgKHVybE9mU2NyaXB0LmluY2x1ZGVzKCdyaWNoYXVkaWVuY2UuY29tJykgfHwgdXJsT2ZTY3JpcHQuaW5jbHVkZXMoJ3JpY2hhdWRpZW5jZS5tZ3IuY29uc2Vuc3Uub3JnJykpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuX2NtcCA9IG5ldyBOb3RZZXRJbXBsZW1lbnRlZENtcCgzMCwgdGhpcy5fZG9jdW1lbnQsICdSaWNoIEF1ZGllbmNlIEludGVybmF0aW9uYWwgU0wnLCB1cmxPZlNjcmlwdCwgdGhpcy5fYmFja2VuZENhbGwpO1xuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgZWxzZSBpZiAodXJsT2ZTY3JpcHQuaW5jbHVkZXMoJ3N5c3RlbTEuY29tJykgfHwgdXJsT2ZTY3JpcHQuaW5jbHVkZXMoJ3N5c3RlbTEubWdyLmNvbnNlbnN1Lm9yZycpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLl9jbXAgPSBuZXcgTm90WWV0SW1wbGVtZW50ZWRDbXAoMzgsIHRoaXMuX2RvY3VtZW50LCAnU3lzdGVtMSBMTEMnLCB1cmxPZlNjcmlwdCwgdGhpcy5fYmFja2VuZENhbGwpO1xuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgZWxzZSBpZiAodXJsT2ZTY3JpcHQuaW5jbHVkZXMoJ3NvcnRhYmxlLmNvbScpIHx8IHVybE9mU2NyaXB0LmluY2x1ZGVzKCdzb3J0YWJsZS5tZ3IuY29uc2Vuc3Uub3JnJykpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuX2NtcCA9IG5ldyBOb3RZZXRJbXBsZW1lbnRlZENtcCgzOSwgdGhpcy5fZG9jdW1lbnQsICdTbmFwc29ydCBJbmMuLCBvcGVyYXRpbmcgYXMgU29ydGFibGUnLCB1cmxPZlNjcmlwdCwgdGhpcy5fYmFja2VuZENhbGwpO1xuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgZWxzZSBpZiAodXJsT2ZTY3JpcHQuaW5jbHVkZXMoJ25ldHNwcmludC5ncm91cCcpIHx8IHVybE9mU2NyaXB0LmluY2x1ZGVzKCduZXRzcHJpbnRncm91cC5tZ3IuY29uc2Vuc3Uub3JnJykpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuX2NtcCA9IG5ldyBOb3RZZXRJbXBsZW1lbnRlZENtcCg0MSwgdGhpcy5fZG9jdW1lbnQsICdHcnVwYSBOZXRzcHJpbnQgU3AgeiBvLm8uJywgdXJsT2ZTY3JpcHQsIHRoaXMuX2JhY2tlbmRDYWxsKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGVsc2UgaWYgKHVybE9mU2NyaXB0LmluY2x1ZGVzKCdtYWR2ZXJ0aXNlLmNvbScpIHx8IHVybE9mU2NyaXB0LmluY2x1ZGVzKCdtYWR2ZXJ0aXNlLm1nci5jb25zZW5zdS5vcmcnKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5fY21wID0gbmV3IE5vdFlldEltcGxlbWVudGVkQ21wKDQ0LCB0aGlzLl9kb2N1bWVudCwgJ01hZHZlcnRpc2UgTWVkaWEnLCB1cmxPZlNjcmlwdCwgdGhpcy5fYmFja2VuZENhbGwpO1xuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgZWxzZSBpZiAodXJsT2ZTY3JpcHQuaW5jbHVkZXMoJ29ndXJ5LmNvbScpIHx8IHVybE9mU2NyaXB0LmluY2x1ZGVzKCdvZ3VyeS5tZ3IuY29uc2Vuc3Uub3JnJykpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuX2NtcCA9IG5ldyBOb3RZZXRJbXBsZW1lbnRlZENtcCg0NSwgdGhpcy5fZG9jdW1lbnQsICdPZ3VyeSBMdGQnLCB1cmxPZlNjcmlwdCwgdGhpcy5fYmFja2VuZENhbGwpO1xuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgZWxzZSBpZiAodXJsT2ZTY3JpcHQuaW5jbHVkZXMoJ21lZGlhdmluZS5jb20nKSB8fCB1cmxPZlNjcmlwdC5pbmNsdWRlcygnbWVkaWF2aW5lLm1nci5jb25zZW5zdS5vcmcnKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5fY21wID0gbmV3IE5vdFlldEltcGxlbWVudGVkQ21wKDQ2LCB0aGlzLl9kb2N1bWVudCwgJ01lZGlhdmluZSwgSW5jLicsIHVybE9mU2NyaXB0LCB0aGlzLl9iYWNrZW5kQ2FsbCk7XG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBlbHNlIGlmICh1cmxPZlNjcmlwdC5pbmNsdWRlcygndHJ1c3RhcmMuY29tJykgfHwgdXJsT2ZTY3JpcHQuaW5jbHVkZXMoJ3RydXN0YXJjLm1nci5jb25zZW5zdS5vcmcnKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5fY21wID0gbmV3IE5vdFlldEltcGxlbWVudGVkQ21wKDQ3LCB0aGlzLl9kb2N1bWVudCwgJ1RydXN0QXJjIEluYycsIHVybE9mU2NyaXB0LCB0aGlzLl9iYWNrZW5kQ2FsbCk7XG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBlbHNlIGlmICh1cmxPZlNjcmlwdC5pbmNsdWRlcygnc2Fub21hLmNvbScpIHx8IHVybE9mU2NyaXB0LmluY2x1ZGVzKCdzbWYubWdyLmNvbnNlbnN1Lm9yZycpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLl9jbXAgPSBuZXcgTm90WWV0SW1wbGVtZW50ZWRDbXAoNDksIHRoaXMuX2RvY3VtZW50LCAnU2Fub21hIE1lZGlhIEZpbmxhbmQgT3knLCB1cmxPZlNjcmlwdCwgdGhpcy5fYmFja2VuZENhbGwpO1xuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgZWxzZSBpZiAodXJsT2ZTY3JpcHQuaW5jbHVkZXMoJ2V0YXJnZXQuZXUnKSB8fCB1cmxPZlNjcmlwdC5pbmNsdWRlcygnZXRhcmdldC5tZ3IuY29uc2Vuc3Uub3JnJykpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuX2NtcCA9IG5ldyBOb3RZZXRJbXBsZW1lbnRlZENtcCg1MCwgdGhpcy5fZG9jdW1lbnQsICdFVEFSR0VUIFNFJywgdXJsT2ZTY3JpcHQsIHRoaXMuX2JhY2tlbmRDYWxsKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGVsc2UgaWYgKHVybE9mU2NyaXB0LmluY2x1ZGVzKCdhZHJvbGwuY29tJykgfHwgdXJsT2ZTY3JpcHQuaW5jbHVkZXMoJ2Fkcm9sbC5tZ3IuY29uc2Vuc3Uub3JnJykpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuX2NtcCA9IG5ldyBOb3RZZXRJbXBsZW1lbnRlZENtcCg1NCwgdGhpcy5fZG9jdW1lbnQsICdBZFJvbGwsIEluYycsIHVybE9mU2NyaXB0LCB0aGlzLl9iYWNrZW5kQ2FsbCk7XG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBlbHNlIGlmICh1cmxPZlNjcmlwdC5pbmNsdWRlcygndHJpYm9vLmNvbScpIHx8IHVybE9mU2NyaXB0LmluY2x1ZGVzKCd0cmlib28ubWdyLmNvbnNlbnN1Lm9yZycpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLl9jbXAgPSBuZXcgTm90WWV0SW1wbGVtZW50ZWRDbXAoNTUsIHRoaXMuX2RvY3VtZW50LCAnVHJpYm9vIE1lZGlhIFNSTCcsIHVybE9mU2NyaXB0LCB0aGlzLl9iYWNrZW5kQ2FsbCk7XG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBlbHNlIGlmICh1cmxPZlNjcmlwdC5pbmNsdWRlcygnd2ViZWRpYS1ncm91cC5jb20nKSB8fCB1cmxPZlNjcmlwdC5pbmNsdWRlcygnd2ViZWRpYS5tZ3IuY29uc2Vuc3Uub3JnJykpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuX2NtcCA9IG5ldyBOb3RZZXRJbXBsZW1lbnRlZENtcCg1NywgdGhpcy5fZG9jdW1lbnQsICdXRUJFRElBJywgdXJsT2ZTY3JpcHQsIHRoaXMuX2JhY2tlbmRDYWxsKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGVsc2UgaWYgKHVybE9mU2NyaXB0LmluY2x1ZGVzKCdjaWFvcGVvcGxlLml0JykgfHwgdXJsT2ZTY3JpcHQuaW5jbHVkZXMoJ2NpYW9wZW9wbGUubWdyLmNvbnNlbnN1Lm9yZycpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLl9jbXAgPSBuZXcgTm90WWV0SW1wbGVtZW50ZWRDbXAoNTgsIHRoaXMuX2RvY3VtZW50LCAnQ2lhbyBwZW9wbGUgcy5yLmwuJywgdXJsT2ZTY3JpcHQsIHRoaXMuX2JhY2tlbmRDYWxsKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGVsc2UgaWYgKHVybE9mU2NyaXB0LmluY2x1ZGVzKCdkZWV6ZXIuY29tJykgfHwgdXJsT2ZTY3JpcHQuaW5jbHVkZXMoJ2RlZXplci5tZ3IuY29uc2Vuc3Uub3JnJykpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuX2NtcCA9IG5ldyBOb3RZZXRJbXBsZW1lbnRlZENtcCg1OSwgdGhpcy5fZG9jdW1lbnQsICdEZWV6ZXInLCB1cmxPZlNjcmlwdCwgdGhpcy5fYmFja2VuZENhbGwpO1xuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgZWxzZSBpZiAodXJsT2ZTY3JpcHQuaW5jbHVkZXMoJ3Nwb2xlY3pub3NjaS5wbCcpIHx8IHVybE9mU2NyaXB0LmluY2x1ZGVzKCdzcG9sZWN6bm9zY2kubWdyLmNvbnNlbnN1Lm9yZycpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLl9jbXAgPSBuZXcgTm90WWV0SW1wbGVtZW50ZWRDbXAoNjEsIHRoaXMuX2RvY3VtZW50LCAnU3BvbGVjem5vc2NpIFNwLiB6IG8uby4gU3Auay4nLCB1cmxPZlNjcmlwdCwgdGhpcy5fYmFja2VuZENhbGwpO1xuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgZWxzZSBpZiAodXJsT2ZTY3JpcHQuaW5jbHVkZXMoJ2d1bXRyZWUuY29tJykgfHwgdXJsT2ZTY3JpcHQuaW5jbHVkZXMoJ2d1bXRyZWVjb20ubWdyLmNvbnNlbnN1Lm9yZycpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLl9jbXAgPSBuZXcgTm90WWV0SW1wbGVtZW50ZWRDbXAoNjIsIHRoaXMuX2RvY3VtZW50LCAnR3VtdHJlZS5jb20gTHRkJywgdXJsT2ZTY3JpcHQsIHRoaXMuX2JhY2tlbmRDYWxsKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGVsc2UgaWYgKHVybE9mU2NyaXB0LmluY2x1ZGVzKCdnZHByLmNsaWNraW8uY29tJykgfHwgdXJsT2ZTY3JpcHQuaW5jbHVkZXMoJ2NsaWNraW8ubWdyLmNvbnNlbnN1Lm9yZycpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLl9jbXAgPSBuZXcgTm90WWV0SW1wbGVtZW50ZWRDbXAoNjMsIHRoaXMuX2RvY3VtZW50LCAnQUxaIFNvZnR3YXJlIEx0ZCAodHJhZGluZyBhcyBDbGlja2lvKScsIHVybE9mU2NyaXB0LCB0aGlzLl9iYWNrZW5kQ2FsbCk7XG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBlbHNlIGlmICh1cmxPZlNjcmlwdC5pbmNsdWRlcygnb25ldGFnLm5ldCcpIHx8IHVybE9mU2NyaXB0LmluY2x1ZGVzKCdvbmV0YWcubWdyLmNvbnNlbnN1Lm9yZycpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLl9jbXAgPSBuZXcgTm90WWV0SW1wbGVtZW50ZWRDbXAoNjUsIHRoaXMuX2RvY3VtZW50LCAnT25lVGFnIEx0ZCcsIHVybE9mU2NyaXB0LCB0aGlzLl9iYWNrZW5kQ2FsbCk7XG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBlbHNlIGlmICh1cmxPZlNjcmlwdC5pbmNsdWRlcygndW5pY29uc2VudC5jb20nKSB8fCB1cmxPZlNjcmlwdC5pbmNsdWRlcygndW5pY29uc2VudC5tZ3IuY29uc2Vuc3Uub3JnJykpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuX2NtcCA9IG5ldyBOb3RZZXRJbXBsZW1lbnRlZENtcCg2OCwgdGhpcy5fZG9jdW1lbnQsICdUcmFuc2ZvbiBMdGQnLCB1cmxPZlNjcmlwdCwgdGhpcy5fYmFja2VuZENhbGwpO1xuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgZWxzZSBpZiAodXJsT2ZTY3JpcHQuaW5jbHVkZXMoJ2dyZW1pbWVkaWEucGwnKSB8fCB1cmxPZlNjcmlwdC5pbmNsdWRlcygnZ21jbXAubWdyLmNvbnNlbnN1Lm9yZycpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLl9jbXAgPSBuZXcgTm90WWV0SW1wbGVtZW50ZWRDbXAoNjksIHRoaXMuX2RvY3VtZW50LCAnR3JlbWkgTWVkaWEgU0EnLCB1cmxPZlNjcmlwdCwgdGhpcy5fYmFja2VuZENhbGwpO1xuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgZWxzZSBpZiAodXJsT2ZTY3JpcHQuaW5jbHVkZXMoJ3dwLnBsJykgfHwgdXJsT2ZTY3JpcHQuaW5jbHVkZXMoJ3dwbS5tZ3IuY29uc2Vuc3Uub3JnJykpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuX2NtcCA9IG5ldyBOb3RZZXRJbXBsZW1lbnRlZENtcCg3MiwgdGhpcy5fZG9jdW1lbnQsICdXaXJ0dWFsbmEgUG9sc2thIE1lZGlhIFMuQS4nLCB1cmxPZlNjcmlwdCwgdGhpcy5fYmFja2VuZENhbGwpO1xuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgZWxzZSBpZiAodXJsT2ZTY3JpcHQuaW5jbHVkZXMoJ3JlbGV2YW50LmZpJykgfHwgdXJsT2ZTY3JpcHQuaW5jbHVkZXMoJ3JlbGV2YW50Lm1nci5jb25zZW5zdS5vcmcnKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5fY21wID0gbmV3IE5vdFlldEltcGxlbWVudGVkQ21wKDc0LCB0aGlzLl9kb2N1bWVudCwgJ1JlbGV2YW50IERpZ2l0YWwgT3knLCB1cmxPZlNjcmlwdCwgdGhpcy5fYmFja2VuZENhbGwpO1xuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgZWxzZSBpZiAodXJsT2ZTY3JpcHQuaW5jbHVkZXMoJ3ZlY3RhdXJ5LmlvJykgfHwgdXJsT2ZTY3JpcHQuaW5jbHVkZXMoJ3ZlY3RhdXJ5Lm1nci5jb25zZW5zdS5vcmcnKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5fY21wID0gbmV3IE5vdFlldEltcGxlbWVudGVkQ21wKDc1LCB0aGlzLl9kb2N1bWVudCwgJ1ZFQ1RBVVJZJywgdXJsT2ZTY3JpcHQsIHRoaXMuX2JhY2tlbmRDYWxsKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGVsc2UgaWYgKHVybE9mU2NyaXB0LmluY2x1ZGVzKCdzaWJib3ZlbnR1cmVzLmNvbScpIHx8IHVybE9mU2NyaXB0LmluY2x1ZGVzKCdzaWJib3ZlbnR1cmVzLm1nci5jb25zZW5zdS5vcmcnKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5fY21wID0gbmV3IE5vdFlldEltcGxlbWVudGVkQ21wKDc2LCB0aGlzLl9kb2N1bWVudCwgJ1NJQkJPIFZFTlRVUkVTIFNMVScsIHVybE9mU2NyaXB0LCB0aGlzLl9iYWNrZW5kQ2FsbCk7XG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBlbHNlIGlmICh1cmxPZlNjcmlwdC5pbmNsdWRlcygnYWRtZXRyaWNzcHJvLmNvbScpIHx8IHVybE9mU2NyaXB0LmluY2x1ZGVzKCdjbXAubWdyLmNvbnNlbnN1Lm9yZycpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLl9jbXAgPSBuZXcgTm90WWV0SW1wbGVtZW50ZWRDbXAoNzcsIHRoaXMuX2RvY3VtZW50LCAnVGVhY2hpbmcgQWlkcywgTExDJywgdXJsT2ZTY3JpcHQsIHRoaXMuX2JhY2tlbmRDYWxsKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGVsc2UgaWYgKHVybE9mU2NyaXB0LmluY2x1ZGVzKCdzZnIuZnInKSB8fCB1cmxPZlNjcmlwdC5pbmNsdWRlcygnc2ZyLm1nci5jb25zZW5zdS5vcmcnKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5fY21wID0gbmV3IE5vdFlldEltcGxlbWVudGVkQ21wKDc5LCB0aGlzLl9kb2N1bWVudCwgJ1NGUicsIHVybE9mU2NyaXB0LCB0aGlzLl9iYWNrZW5kQ2FsbCk7XG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBlbHNlIGlmICh1cmxPZlNjcmlwdC5pbmNsdWRlcygnb2lsLmF4ZWxzcHJpbmdlci5jb20nKSB8fCB1cmxPZlNjcmlwdC5pbmNsdWRlcygnb2lsLm1nci5jb25zZW5zdS5vcmcnKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5fY21wID0gbmV3IE5vdFlldEltcGxlbWVudGVkQ21wKDgwLCB0aGlzLl9kb2N1bWVudCwgJ0F4ZWwgU3ByaW5nZXIgU0UnLCB1cmxPZlNjcmlwdCwgdGhpcy5fYmFja2VuZENhbGwpO1xuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgZWxzZSBpZiAodXJsT2ZTY3JpcHQuaW5jbHVkZXMoJ2FkdGVjaGZhY3RvcnkuY29tJykgfHwgdXJsT2ZTY3JpcHQuaW5jbHVkZXMoJ2F0Zi5tZ3IuY29uc2Vuc3Uub3JnJykpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuX2NtcCA9IG5ldyBOb3RZZXRJbXBsZW1lbnRlZENtcCg4MiwgdGhpcy5fZG9jdW1lbnQsICdBZFRlY2ggRmFjdG9yeSBHbWJIICYgQ28uIEtHJywgdXJsT2ZTY3JpcHQsIHRoaXMuX2JhY2tlbmRDYWxsKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGVsc2UgaWYgKHVybE9mU2NyaXB0LmluY2x1ZGVzKCdhbG1hbWVkaWEuZmknKSB8fCB1cmxPZlNjcmlwdC5pbmNsdWRlcygnYWxtYW1lZGlhLm1nci5jb25zZW5zdS5vcmcnKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5fY21wID0gbmV3IE5vdFlldEltcGxlbWVudGVkQ21wKDg0LCB0aGlzLl9kb2N1bWVudCwgJ0FsbWEgTWVkaWEnLCB1cmxPZlNjcmlwdCwgdGhpcy5fYmFja2VuZENhbGwpO1xuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgZWxzZSBpZiAodXJsT2ZTY3JpcHQuaW5jbHVkZXMoJ291ZXN0LWZyYW5jZS5mcicpIHx8IHVybE9mU2NyaXB0LmluY2x1ZGVzKCdzaXBhb2YubWdyLmNvbnNlbnN1Lm9yZycpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLl9jbXAgPSBuZXcgTm90WWV0SW1wbGVtZW50ZWRDbXAoODUsIHRoaXMuX2RvY3VtZW50LCAnU0lQQScsIHVybE9mU2NyaXB0LCB0aGlzLl9iYWNrZW5kQ2FsbCk7XG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBlbHNlIGlmICh1cmxPZlNjcmlwdC5pbmNsdWRlcygnbm91dy5jb20nKSB8fCB1cmxPZlNjcmlwdC5pbmNsdWRlcygnbm91dy5tZ3IuY29uc2Vuc3Uub3JnJykpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuX2NtcCA9IG5ldyBOb3RZZXRJbXBsZW1lbnRlZENtcCg4NiwgdGhpcy5fZG9jdW1lbnQsICdOb3V3IE1lZGlhIEFCJywgdXJsT2ZTY3JpcHQsIHRoaXMuX2JhY2tlbmRDYWxsKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGVsc2UgaWYgKHVybE9mU2NyaXB0LmluY2x1ZGVzKCdjb21tYW5kZXJzYWN0LmNvbScpIHx8IHVybE9mU2NyaXB0LmluY2x1ZGVzKCdjb21tYW5kZXJzYWN0Lm1nci5jb25zZW5zdS5vcmcnKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5fY21wID0gbmV3IE5vdFlldEltcGxlbWVudGVkQ21wKDkwLCB0aGlzLl9kb2N1bWVudCwgJ0NvbW1hbmRlcnMgQWN0JywgdXJsT2ZTY3JpcHQsIHRoaXMuX2JhY2tlbmRDYWxsKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGVsc2UgaWYgKHVybE9mU2NyaXB0LmluY2x1ZGVzKCdzaXJkYXRhLmNvbScpIHx8IHVybE9mU2NyaXB0LmluY2x1ZGVzKCdzZGRhbi5tZ3IuY29uc2Vuc3Uub3JnJykpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuX2NtcCA9IG5ldyBOb3RZZXRJbXBsZW1lbnRlZENtcCg5MiwgdGhpcy5fZG9jdW1lbnQsICdTSVJEQVRBJywgdXJsT2ZTY3JpcHQsIHRoaXMuX2JhY2tlbmRDYWxsKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGVsc2UgaWYgKHVybE9mU2NyaXB0LmluY2x1ZGVzKCdzaGlueXN0YXQuY29tJykgfHwgdXJsT2ZTY3JpcHQuaW5jbHVkZXMoJ3NoaW55c3RhdC5tZ3IuY29uc2Vuc3Uub3JnJykpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuX2NtcCA9IG5ldyBOb3RZZXRJbXBsZW1lbnRlZENtcCg5NiwgdGhpcy5fZG9jdW1lbnQsICdUcmlib28gRGF0YSBBbmFseXRpY3MnLCB1cmxPZlNjcmlwdCwgdGhpcy5fYmFja2VuZENhbGwpO1xuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgZWxzZSBpZiAodXJsT2ZTY3JpcHQuaW5jbHVkZXMoJ29mZnJlbWVkaWEuY29tJykgfHwgdXJsT2ZTY3JpcHQuaW5jbHVkZXMoJ2NhbWJpdW1tZWRpYS5tZ3IuY29uc2Vuc3Uub3JnJykpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuX2NtcCA9IG5ldyBOb3RZZXRJbXBsZW1lbnRlZENtcCgxMDAsIHRoaXMuX2RvY3VtZW50LCAnQ2FtYml1bSBNZWRpYScsIHVybE9mU2NyaXB0LCB0aGlzLl9iYWNrZW5kQ2FsbCk7XG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBlbHNlIGlmICh1cmxPZlNjcmlwdC5pbmNsdWRlcygnZ2VtaXVzLmNvbScpIHx8IHVybE9mU2NyaXB0LmluY2x1ZGVzKCdnZW1pdXMubWdyLmNvbnNlbnN1Lm9yZycpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLl9jbXAgPSBuZXcgTm90WWV0SW1wbGVtZW50ZWRDbXAoMTA0LCB0aGlzLl9kb2N1bWVudCwgJ0dlbWl1cyBTQScsIHVybE9mU2NyaXB0LCB0aGlzLl9iYWNrZW5kQ2FsbCk7XG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBlbHNlIGlmICh1cmxPZlNjcmlwdC5pbmNsdWRlcygnZGFpbHltb3Rpb24uY29tJykgfHwgdXJsT2ZTY3JpcHQuaW5jbHVkZXMoJ2RhaWx5bW90aW9uLm1nci5jb25zZW5zdS5vcmcnKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5fY21wID0gbmV3IE5vdFlldEltcGxlbWVudGVkQ21wKDEwNSwgdGhpcy5fZG9jdW1lbnQsICdEQUlMWU1PVElPTiBTQScsIHVybE9mU2NyaXB0LCB0aGlzLl9iYWNrZW5kQ2FsbCk7XG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBlbHNlIGlmICh1cmxPZlNjcmlwdC5pbmNsdWRlcygndGhlZ3VhcmRpYW4uY29tJykgfHwgdXJsT2ZTY3JpcHQuaW5jbHVkZXMoJ2dubS5tZ3IuY29uc2Vuc3Uub3JnJykpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuX2NtcCA9IG5ldyBOb3RZZXRJbXBsZW1lbnRlZENtcCgxMTIsIHRoaXMuX2RvY3VtZW50LCAnR3VhcmRpYW4gTmV3cyBhbmQgTWVkaWEnLCB1cmxPZlNjcmlwdCwgdGhpcy5fYmFja2VuZENhbGwpO1xuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgZWxzZSBpZiAodXJsT2ZTY3JpcHQuaW5jbHVkZXMoJ3VsdGltYXRlLWd1aXRhci5jb20nKSB8fCB1cmxPZlNjcmlwdC5pbmNsdWRlcygnbXVzaWNpYW5zYXVkaWVuY2UubWdyLmNvbnNlbnN1Lm9yZycpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLl9jbXAgPSBuZXcgTm90WWV0SW1wbGVtZW50ZWRDbXAoMTEzLCB0aGlzLl9kb2N1bWVudCwgJ0dyYW5kIFBsYXkgTWVkaWEsIExMQycsIHVybE9mU2NyaXB0LCB0aGlzLl9iYWNrZW5kQ2FsbCk7XG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBlbHNlIGlmICh1cmxPZlNjcmlwdC5pbmNsdWRlcygnYWR2ZXJzYWwuY29tJykgfHwgdXJsT2ZTY3JpcHQuaW5jbHVkZXMoJ2FkdmVyc2FsLm1nci5jb25zZW5zdS5vcmcnKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5fY21wID0gbmV3IE5vdFlldEltcGxlbWVudGVkQ21wKDExNCwgdGhpcy5fZG9jdW1lbnQsICdBZHZlcnNhbCBNZWRpYSwgSW5jLicsIHVybE9mU2NyaXB0LCB0aGlzLl9iYWNrZW5kQ2FsbCk7XG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBlbHNlIGlmICh1cmxPZlNjcmlwdC5pbmNsdWRlcygnYS1sZWhkZXQuZmknKSB8fCB1cmxPZlNjcmlwdC5pbmNsdWRlcygnYS1sZWhkZXQubWdyLmNvbnNlbnN1Lm9yZycpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLl9jbXAgPSBuZXcgTm90WWV0SW1wbGVtZW50ZWRDbXAoMTE1LCB0aGlzLl9kb2N1bWVudCwgJ0EtbGVoZGV0IE95JywgdXJsT2ZTY3JpcHQsIHRoaXMuX2JhY2tlbmRDYWxsKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGVsc2UgaWYgKHVybE9mU2NyaXB0LmluY2x1ZGVzKCdjdXJpb3NpdHltZWRpYS5jb20nKSB8fCB1cmxPZlNjcmlwdC5pbmNsdWRlcygnY3VyaW9zaXR5bWVkaWEubWdyLmNvbnNlbnN1Lm9yZycpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLl9jbXAgPSBuZXcgTm90WWV0SW1wbGVtZW50ZWRDbXAoMTE5LCB0aGlzLl9kb2N1bWVudCwgJ0N1cmlvc2l0eSBNZWRpYSwgSW5jLicsIHVybE9mU2NyaXB0LCB0aGlzLl9iYWNrZW5kQ2FsbCk7XG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBlbHNlIGlmICh1cmxPZlNjcmlwdC5pbmNsdWRlcygnd2ViZmluYW5jaWFsZ3JvdXAuY29tJykgfHwgdXJsT2ZTY3JpcHQuaW5jbHVkZXMoJ3ZvcnRleC5tZ3IuY29uc2Vuc3Uub3JnJykpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuX2NtcCA9IG5ldyBOb3RZZXRJbXBsZW1lbnRlZENtcCgxMjIsIHRoaXMuX2RvY3VtZW50LCAnV2ViIEZpbmFuY2lhbCBHcm91cCBTLkEuL1ZvcnRleCcsIHVybE9mU2NyaXB0LCB0aGlzLl9iYWNrZW5kQ2FsbCk7XG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBlbHNlIGlmICh1cmxPZlNjcmlwdC5pbmNsdWRlcygnaXViZW5kYS5jb20nKSB8fCB1cmxPZlNjcmlwdC5pbmNsdWRlcygnaXViZW5kYS5tZ3IuY29uc2Vuc3Uub3JnJykpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuX2NtcCA9IG5ldyBOb3RZZXRJbXBsZW1lbnRlZENtcCgxMjMsIHRoaXMuX2RvY3VtZW50LCAnaXViZW5kYScsIHVybE9mU2NyaXB0LCB0aGlzLl9iYWNrZW5kQ2FsbCk7XG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBlbHNlIGlmICh1cmxPZlNjcmlwdC5pbmNsdWRlcygnbGlxd2lkLmNvbScpIHx8IHVybE9mU2NyaXB0LmluY2x1ZGVzKCdsaXF3aWQubWdyLmNvbnNlbnN1Lm9yZycpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLl9jbXAgPSBuZXcgTm90WWV0SW1wbGVtZW50ZWRDbXAoMTI0LCB0aGlzLl9kb2N1bWVudCwgJ0xJUVdJRCcsIHVybE9mU2NyaXB0LCB0aGlzLl9iYWNrZW5kQ2FsbCk7XG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgfSAvKmVsc2UgaWYgKHVybE9mU2NyaXB0LmluY2x1ZGVzKCdlYmF5LmNvbScpIHx8IHVybE9mU2NyaXB0LmluY2x1ZGVzKCdlYmF5Lm1nci5jb25zZW5zdS5vcmcnKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5fY21wID0gbmV3IE5vdFlldEltcGxlbWVudGVkQ21wKDEyNSwgdGhpcy5fZG9jdW1lbnQsICdlQmF5IEluYycsIHVybE9mU2NyaXB0LCB0aGlzLl9iYWNrZW5kQ2FsbCk7XG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgfSAqL1xuICAgICAgICAgICAgICAgICAgICBlbHNlIGlmICh1cmxPZlNjcmlwdC5pbmNsdWRlcygnYWRldmludGEuY29tJykgfHwgdXJsT2ZTY3JpcHQuaW5jbHVkZXMoJ3NjaGlic3RlZHNwYWluLm1nci5jb25zZW5zdS5vcmcnKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5fY21wID0gbmV3IE5vdFlldEltcGxlbWVudGVkQ21wKDEyOSwgdGhpcy5fZG9jdW1lbnQsICdBZGV2aW50YSBTcGFpbiBTLkwuVS4nLCB1cmxPZlNjcmlwdCwgdGhpcy5fYmFja2VuZENhbGwpO1xuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgZWxzZSBpZiAodXJsT2ZTY3JpcHQuaW5jbHVkZXMoJ29yaWVsLmlvJykgfHwgdXJsT2ZTY3JpcHQuaW5jbHVkZXMoJ29yaWVsLm1nci5jb25zZW5zdS5vcmcnKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5fY21wID0gbmV3IE5vdFlldEltcGxlbWVudGVkQ21wKDEzMSwgdGhpcy5fZG9jdW1lbnQsICdPcmllbCBWZW50dXJlcycsIHVybE9mU2NyaXB0LCB0aGlzLl9iYWNrZW5kQ2FsbCk7XG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBlbHNlIGlmICh1cmxPZlNjcmlwdC5pbmNsdWRlcygnaW1wcm92ZWRpZ2l0YWwuY29tJykgfHwgdXJsT2ZTY3JpcHQuaW5jbHVkZXMoJ2ltcHJvdmVkaWdpdGFsLm1nci5jb25zZW5zdS5vcmcnKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5fY21wID0gbmV3IE5vdFlldEltcGxlbWVudGVkQ21wKDEzOSwgdGhpcy5fZG9jdW1lbnQsICdJbXByb3ZlIERpZ2l0YWwgSW50ZXJuYXRpb25hbCBCVicsIHVybE9mU2NyaXB0LCB0aGlzLl9iYWNrZW5kQ2FsbCk7XG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBlbHNlIGlmICh1cmxPZlNjcmlwdC5pbmNsdWRlcygnd2lraWEuY29tZmFuZG9tJykgfHwgdXJsT2ZTY3JpcHQuaW5jbHVkZXMoJ2ZhbmRvbS5tZ3IuY29uc2Vuc3Uub3JnJykpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuX2NtcCA9IG5ldyBOb3RZZXRJbXBsZW1lbnRlZENtcCgxNDEsIHRoaXMuX2RvY3VtZW50LCAnV2lraWEsIEluYy4gKEZBTkRPTSknLCB1cmxPZlNjcmlwdCwgdGhpcy5fYmFja2VuZENhbGwpO1xuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgZWxzZSBpZiAodXJsT2ZTY3JpcHQuaW5jbHVkZXMoJ2NhcmFkaXNpYWMuY29tJykgfHwgdXJsT2ZTY3JpcHQuaW5jbHVkZXMoJ2NhcmFkaXNpYWMubWdyLmNvbnNlbnN1Lm9yZycpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLl9jbXAgPSBuZXcgTm90WWV0SW1wbGVtZW50ZWRDbXAoMTQ3LCB0aGlzLl9kb2N1bWVudCwgJ0NhciZCb2F0IE1lZGlhJywgdXJsT2ZTY3JpcHQsIHRoaXMuX2JhY2tlbmRDYWxsKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGVsc2UgaWYgKHVybE9mU2NyaXB0LmluY2x1ZGVzKCdhdm9jZXQuaW8nKSB8fCB1cmxPZlNjcmlwdC5pbmNsdWRlcygnYXZvY2V0Lm1nci5jb25zZW5zdS5vcmcnKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5fY21wID0gbmV3IE5vdFlldEltcGxlbWVudGVkQ21wKDE1MywgdGhpcy5fZG9jdW1lbnQsICdBdm9jZXQgU3lzdGVtcyBMaW10ZWQnLCB1cmxPZlNjcmlwdCwgdGhpcy5fYmFja2VuZENhbGwpO1xuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgZWxzZSBpZiAodXJsT2ZTY3JpcHQuaW5jbHVkZXMoJ3lvYy5jb20nKSB8fCB1cmxPZlNjcmlwdC5pbmNsdWRlcygneW9jLm1nci5jb25zZW5zdS5vcmcnKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5fY21wID0gbmV3IE5vdFlldEltcGxlbWVudGVkQ21wKDE1NywgdGhpcy5fZG9jdW1lbnQsICdZT0MgQUcnLCB1cmxPZlNjcmlwdCwgdGhpcy5fYmFja2VuZENhbGwpO1xuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgZWxzZSBpZiAodXJsT2ZTY3JpcHQuaW5jbHVkZXMoJ2lubml0eS5jb20nKSB8fCB1cmxPZlNjcmlwdC5pbmNsdWRlcygnaW5uaXR5Lm1nci5jb25zZW5zdS5vcmcnKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5fY21wID0gbmV3IE5vdFlldEltcGxlbWVudGVkQ21wKDE2MSwgdGhpcy5fZG9jdW1lbnQsICdJbm5pdHknLCB1cmxPZlNjcmlwdCwgdGhpcy5fYmFja2VuZENhbGwpO1xuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgZWxzZSBpZiAodXJsT2ZTY3JpcHQuaW5jbHVkZXMoJ2Nvb2tpZWluZm9ybWF0aW9uLmNvbScpIHx8IHVybE9mU2NyaXB0LmluY2x1ZGVzKCdjb29raWVpbmZvcm1hdGlvbi5tZ3IuY29uc2Vuc3Uub3JnJykpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuX2NtcCA9IG5ldyBOb3RZZXRJbXBsZW1lbnRlZENtcCgxNjIsIHRoaXMuX2RvY3VtZW50LCAnQ29va2llIEluZm9ybWF0aW9uIEFQUycsIHVybE9mU2NyaXB0LCB0aGlzLl9iYWNrZW5kQ2FsbCk7XG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBlbHNlIGlmICh1cmxPZlNjcmlwdC5pbmNsdWRlcygnc29jaWV0ZS5jb20nKSB8fCB1cmxPZlNjcmlwdC5pbmNsdWRlcygnc29jaWV0ZS5tZ3IuY29uc2Vuc3Uub3JnJykpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuX2NtcCA9IG5ldyBOb3RZZXRJbXBsZW1lbnRlZENtcCgxNjQsIHRoaXMuX2RvY3VtZW50LCAnU09DSUVURSBTQVMnLCB1cmxPZlNjcmlwdCwgdGhpcy5fYmFja2VuZENhbGwpO1xuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgZWxzZSBpZiAodXJsT2ZTY3JpcHQuaW5jbHVkZXMoJ3VuaXRlZC1pbnRlcm5ldC1tZWRpYS5kZScpIHx8IHVybE9mU2NyaXB0LmluY2x1ZGVzKCcxdW5kMS5tZ3IuY29uc2Vuc3Uub3JnJykpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuX2NtcCA9IG5ldyBOb3RZZXRJbXBsZW1lbnRlZENtcCgxNjcsIHRoaXMuX2RvY3VtZW50LCAnMSYxIE1haWwgJiBNZWRpYSBHbWJIJywgdXJsT2ZTY3JpcHQsIHRoaXMuX2JhY2tlbmRDYWxsKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGVsc2UgaWYgKHVybE9mU2NyaXB0LmluY2x1ZGVzKCdvdXRsb29rLmxpdmUuY29tJykgfHwgdXJsT2ZTY3JpcHQuaW5jbHVkZXMoJ291dGxvb2subWdyLmNvbnNlbnN1Lm9yZycpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLl9jbXAgPSBuZXcgTm90WWV0SW1wbGVtZW50ZWRDbXAoMTY4LCB0aGlzLl9kb2N1bWVudCwgJ091dGxvb2suY29tIC0gTWljcm9zb2Z0IENvcnBvcmF0aW9uJywgdXJsT2ZTY3JpcHQsIHRoaXMuX2JhY2tlbmRDYWxsKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGVsc2UgaWYgKHVybE9mU2NyaXB0LmluY2x1ZGVzKCdtYXBweS5jb20nKSB8fCB1cmxPZlNjcmlwdC5pbmNsdWRlcygnbWFwcHkubWdyLmNvbnNlbnN1Lm9yZycpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLl9jbXAgPSBuZXcgTm90WWV0SW1wbGVtZW50ZWRDbXAoMTY5LCB0aGlzLl9kb2N1bWVudCwgJ01hcHB5JywgdXJsT2ZTY3JpcHQsIHRoaXMuX2JhY2tlbmRDYWxsKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGVsc2UgaWYgKHVybE9mU2NyaXB0LmluY2x1ZGVzKCdhZ29yYS5wbCcpIHx8IHVybE9mU2NyaXB0LmluY2x1ZGVzKCdhZ29yYS5tZ3IuY29uc2Vuc3Uub3JnJykpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuX2NtcCA9IG5ldyBOb3RZZXRJbXBsZW1lbnRlZENtcCgxNzAsIHRoaXMuX2RvY3VtZW50LCAnQUdPUkEgU0EnLCB1cmxPZlNjcmlwdCwgdGhpcy5fYmFja2VuZENhbGwpO1xuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgZWxzZSBpZiAodXJsT2ZTY3JpcHQuaW5jbHVkZXMoJ25hdGVtYXQucGwnKSB8fCB1cmxPZlNjcmlwdC5pbmNsdWRlcygnbmF0ZW1hdC5tZ3IuY29uc2Vuc3Uub3JnJykpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuX2NtcCA9IG5ldyBOb3RZZXRJbXBsZW1lbnRlZENtcCgxNzUsIHRoaXMuX2RvY3VtZW50LCAnR2xvYiAzNjAgU3AuIHogby5vLicsIHVybE9mU2NyaXB0LCB0aGlzLl9iYWNrZW5kQ2FsbCk7XG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBlbHNlIGlmICh1cmxPZlNjcmlwdC5pbmNsdWRlcygnbWFyZmVlbC5jb20nKSB8fCB1cmxPZlNjcmlwdC5pbmNsdWRlcygnbWFyZmVlbC5tZ3IuY29uc2Vuc3Uub3JnJykpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuX2NtcCA9IG5ldyBOb3RZZXRJbXBsZW1lbnRlZENtcCgxODEsIHRoaXMuX2RvY3VtZW50LCAnTWFyZmVlbCBTb2x1dGlvbnMgUy5MJywgdXJsT2ZTY3JpcHQsIHRoaXMuX2JhY2tlbmRDYWxsKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGVsc2UgaWYgKHVybE9mU2NyaXB0LmluY2x1ZGVzKCdzdWIydGVjaC5jb20nKSB8fCB1cmxPZlNjcmlwdC5pbmNsdWRlcygnMmNvbnNlbnQubWdyLmNvbnNlbnN1Lm9yZycpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLl9jbXAgPSBuZXcgTm90WWV0SW1wbGVtZW50ZWRDbXAoMTgzLCB0aGlzLl9kb2N1bWVudCwgJ1N1YjIgVGVjaG5vbG9naWVzIEx0ZCcsIHVybE9mU2NyaXB0LCB0aGlzLl9iYWNrZW5kQ2FsbCk7XG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBlbHNlIGlmICh1cmxPZlNjcmlwdC5pbmNsdWRlcygncGxheXdpcmUuY29tJykgfHwgdXJsT2ZTY3JpcHQuaW5jbHVkZXMoJ3BsYXl3aXJlLm1nci5jb25zZW5zdS5vcmcnKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5fY21wID0gbmV3IE5vdFlldEltcGxlbWVudGVkQ21wKDE4NSwgdGhpcy5fZG9jdW1lbnQsICdQbGF5d2lyZSBMTEMnLCB1cmxPZlNjcmlwdCwgdGhpcy5fYmFja2VuZENhbGwpO1xuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgZWxzZSBpZiAodXJsT2ZTY3JpcHQuaW5jbHVkZXMoJ3ZlbmF0dXNtZWRpYS5jb20nKSB8fCB1cmxPZlNjcmlwdC5pbmNsdWRlcygndmVuYXR1cy5tZ3IuY29uc2Vuc3Uub3JnJykpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuX2NtcCA9IG5ldyBOb3RZZXRJbXBsZW1lbnRlZENtcCgxODYsIHRoaXMuX2RvY3VtZW50LCAnVmVuYXR1cyBNZWRpYSBMaW1pdGVkJywgdXJsT2ZTY3JpcHQsIHRoaXMuX2JhY2tlbmRDYWxsKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGVsc2UgaWYgKHVybE9mU2NyaXB0LmluY2x1ZGVzKCdydHAucHQnKSB8fCB1cmxPZlNjcmlwdC5pbmNsdWRlcygncnRwLm1nci5jb25zZW5zdS5vcmcnKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5fY21wID0gbmV3IE5vdFlldEltcGxlbWVudGVkQ21wKDE5MywgdGhpcy5fZG9jdW1lbnQsICdSVFAgU0EnLCB1cmxPZlNjcmlwdCwgdGhpcy5fYmFja2VuZENhbGwpO1xuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgZWxzZSBpZiAodXJsT2ZTY3JpcHQuaW5jbHVkZXMoJ3NwaWxnYW1lcy5jb20nKSB8fCB1cmxPZlNjcmlwdC5pbmNsdWRlcygnc3BpbGdhbWVzLm1nci5jb25zZW5zdS5vcmcnKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5fY21wID0gbmV3IE5vdFlldEltcGxlbWVudGVkQ21wKDE5NCwgdGhpcy5fZG9jdW1lbnQsICdTcGlsIEdhbWVzIEIuVi4nLCB1cmxPZlNjcmlwdCwgdGhpcy5fYmFja2VuZENhbGwpO1xuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgZWxzZSBpZiAodXJsT2ZTY3JpcHQuaW5jbHVkZXMoJ253cy5haScpIHx8IHVybE9mU2NyaXB0LmluY2x1ZGVzKCdud3MubWdyLmNvbnNlbnN1Lm9yZycpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLl9jbXAgPSBuZXcgTm90WWV0SW1wbGVtZW50ZWRDbXAoMTk2LCB0aGlzLl9kb2N1bWVudCwgJ05ld3Nyb29tIEFJIEx0ZC4nLCB1cmxPZlNjcmlwdCwgdGhpcy5fYmFja2VuZENhbGwpO1xuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgZWxzZSBpZiAodXJsT2ZTY3JpcHQuaW5jbHVkZXMoJ3B1Ymx5LmNvbWVuJykgfHwgdXJsT2ZTY3JpcHQuaW5jbHVkZXMoJ3B1Ymx5Lm1nci5jb25zZW5zdS5vcmcnKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5fY21wID0gbmV3IE5vdFlldEltcGxlbWVudGVkQ21wKDE5NywgdGhpcy5fZG9jdW1lbnQsICdQdWJseSBsdGQnLCB1cmxPZlNjcmlwdCwgdGhpcy5fYmFja2VuZENhbGwpO1xuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgZWxzZSBpZiAodXJsT2ZTY3JpcHQuaW5jbHVkZXMoJ2JpdHF1ZWVuLmNvbScpIHx8IHVybE9mU2NyaXB0LmluY2x1ZGVzKCdiaXRxdWVlbi5tZ3IuY29uc2Vuc3Uub3JnJykpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuX2NtcCA9IG5ldyBOb3RZZXRJbXBsZW1lbnRlZENtcCgyMDUsIHRoaXMuX2RvY3VtZW50LCAnQml0IFEgSG9sZGluZ3MgTGltaXRlZCcsIHVybE9mU2NyaXB0LCB0aGlzLl9iYWNrZW5kQ2FsbCk7XG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBlbHNlIGlmICh1cmxPZlNjcmlwdC5pbmNsdWRlcygncGFnZXNqYXVuZXMuZnInKSB8fCB1cmxPZlNjcmlwdC5pbmNsdWRlcygncGFnZXNqYXVuZXMubWdyLmNvbnNlbnN1Lm9yZycpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLl9jbXAgPSBuZXcgTm90WWV0SW1wbGVtZW50ZWRDbXAoMjA2LCB0aGlzLl9kb2N1bWVudCwgJ1BBR0VTSkFVTkVTJywgdXJsT2ZTY3JpcHQsIHRoaXMuX2JhY2tlbmRDYWxsKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGVsc2UgaWYgKHVybE9mU2NyaXB0LmluY2x1ZGVzKCdnb2xkZW5iZWVzLmZyJykgfHwgdXJsT2ZTY3JpcHQuaW5jbHVkZXMoJ2dvbGRlbmJlZXMubWdyLmNvbnNlbnN1Lm9yZycpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLl9jbXAgPSBuZXcgTm90WWV0SW1wbGVtZW50ZWRDbXAoMjA4LCB0aGlzLl9kb2N1bWVudCwgJ0dvbGRlbiBCZWVzJywgdXJsT2ZTY3JpcHQsIHRoaXMuX2JhY2tlbmRDYWxsKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGVsc2UgaWYgKHVybE9mU2NyaXB0LmluY2x1ZGVzKCdsaWZlc3RyZWV0LmNvbScpIHx8IHVybE9mU2NyaXB0LmluY2x1ZGVzKCdsaWZlc3RyZWV0Lm1nci5jb25zZW5zdS5vcmcnKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5fY21wID0gbmV3IE5vdFlldEltcGxlbWVudGVkQ21wKDIwOSwgdGhpcy5fZG9jdW1lbnQsICdMaWZlU3RyZWV0IENvcnBvcmF0aW9uJywgdXJsT2ZTY3JpcHQsIHRoaXMuX2JhY2tlbmRDYWxsKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGVsc2UgaWYgKHVybE9mU2NyaXB0LmluY2x1ZGVzKCdzaW5nbGVzcG90LmNvbWVuJykgfHwgdXJsT2ZTY3JpcHQuaW5jbHVkZXMoJ3NpbmdsZXNwb3QubWdyLmNvbnNlbnN1Lm9yZycpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLl9jbXAgPSBuZXcgTm90WWV0SW1wbGVtZW50ZWRDbXAoMjEyLCB0aGlzLl9kb2N1bWVudCwgJ1NpbmdsZXNwb3QnLCB1cmxPZlNjcmlwdCwgdGhpcy5fYmFja2VuZENhbGwpO1xuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgZWxzZSBpZiAodXJsT2ZTY3JpcHQuaW5jbHVkZXMoJ2xlYm9uY29pbi5mcicpIHx8IHVybE9mU2NyaXB0LmluY2x1ZGVzKCdsYmMubWdyLmNvbnNlbnN1Lm9yZycpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLl9jbXAgPSBuZXcgTm90WWV0SW1wbGVtZW50ZWRDbXAoMjE0LCB0aGlzLl9kb2N1bWVudCwgJ0xCQyBGcmFuY2UnLCB1cmxPZlNjcmlwdCwgdGhpcy5fYmFja2VuZENhbGwpO1xuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgZWxzZSBpZiAodXJsT2ZTY3JpcHQuaW5jbHVkZXMoJ3JncGQtc21hcnRjbGlwLmNvbScpIHx8IHVybE9mU2NyaXB0LmluY2x1ZGVzKCdzbWFydGNsaXBsYXRhbS5tZ3IuY29uc2Vuc3Uub3JnJykpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuX2NtcCA9IG5ldyBOb3RZZXRJbXBsZW1lbnRlZENtcCgyMTUsIHRoaXMuX2RvY3VtZW50LCAnU21hcnRjbGlwIEhpc3BhbmlhIFMuTC4nLCB1cmxPZlNjcmlwdCwgdGhpcy5fYmFja2VuZENhbGwpO1xuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgZWxzZSBpZiAodXJsT2ZTY3JpcHQuaW5jbHVkZXMoJ2xpc3RvbmljLmNvbScpIHx8IHVybE9mU2NyaXB0LmluY2x1ZGVzKCdsaXN0b25pYy5tZ3IuY29uc2Vuc3Uub3JnJykpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuX2NtcCA9IG5ldyBOb3RZZXRJbXBsZW1lbnRlZENtcCgyMTYsIHRoaXMuX2RvY3VtZW50LCAnTGlzdG9uaWMgc3AuIHogby4gby4nLCB1cmxPZlNjcmlwdCwgdGhpcy5fYmFja2VuZENhbGwpO1xuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgZWxzZSBpZiAodXJsT2ZTY3JpcHQuaW5jbHVkZXMoJ2JtaW5kLmVzJykgfHwgdXJsT2ZTY3JpcHQuaW5jbHVkZXMoJ2JtaW5kLm1nci5jb25zZW5zdS5vcmcnKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5fY21wID0gbmV3IE5vdFlldEltcGxlbWVudGVkQ21wKDIxNywgdGhpcy5fZG9jdW1lbnQsICdCTUlORCBTQUxFUyBNQUtFUiBDT01QQU5ZIFMuTC4nLCB1cmxPZlNjcmlwdCwgdGhpcy5fYmFja2VuZENhbGwpO1xuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgZWxzZSBpZiAodXJsT2ZTY3JpcHQuaW5jbHVkZXMoJ3Jjc3B1YmJsaWNpdGEuaXQnKSB8fCB1cmxPZlNjcmlwdC5pbmNsdWRlcygncmNzbWVkaWFncm91cC5tZ3IuY29uc2Vuc3Uub3JnJykpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuX2NtcCA9IG5ldyBOb3RZZXRJbXBsZW1lbnRlZENtcCgyMTgsIHRoaXMuX2RvY3VtZW50LCAnUkNTIE1lZGlhR3JvdXAgUy5wLkEuJywgdXJsT2ZTY3JpcHQsIHRoaXMuX2JhY2tlbmRDYWxsKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGVsc2UgaWYgKHVybE9mU2NyaXB0LmluY2x1ZGVzKCdhbGxlZ3JvLnBsJykgfHwgdXJsT2ZTY3JpcHQuaW5jbHVkZXMoJ2FsbGVncm8ubWdyLmNvbnNlbnN1Lm9yZycpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLl9jbXAgPSBuZXcgTm90WWV0SW1wbGVtZW50ZWRDbXAoMjIwLCB0aGlzLl9kb2N1bWVudCwgJ0FsbGVncm8ucGwgU3AgeiBvLm8uJywgdXJsT2ZTY3JpcHQsIHRoaXMuX2JhY2tlbmRDYWxsKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGVsc2UgaWYgKHVybE9mU2NyaXB0LmluY2x1ZGVzKCdkZW50c3VhZWdpc25ldHdvcmsuZGUnKSB8fCB1cmxPZlNjcmlwdC5pbmNsdWRlcygnZGFuLm1nci5jb25zZW5zdS5vcmcnKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5fY21wID0gbmV3IE5vdFlldEltcGxlbWVudGVkQ21wKDIyMSwgdGhpcy5fZG9jdW1lbnQsICdEZW50c3UgQWVnaXMgTmV0d29yayBHZXJtYW55IEdtYkgnLCB1cmxPZlNjcmlwdCwgdGhpcy5fYmFja2VuZENhbGwpO1xuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgZWxzZSBpZiAodXJsT2ZTY3JpcHQuaW5jbHVkZXMoJ3BhcnV2ZW5kdS5mcicpIHx8IHVybE9mU2NyaXB0LmluY2x1ZGVzKCdwYXJ1dmVuZHUubWdyLmNvbnNlbnN1Lm9yZycpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLl9jbXAgPSBuZXcgTm90WWV0SW1wbGVtZW50ZWRDbXAoMjIyLCB0aGlzLl9kb2N1bWVudCwgJ1BhcnVWZW5kdS5mcicsIHVybE9mU2NyaXB0LCB0aGlzLl9iYWNrZW5kQ2FsbCk7XG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBlbHNlIGlmICh1cmxPZlNjcmlwdC5pbmNsdWRlcygnZ2VkaXNwYS5pdCcpIHx8IHVybE9mU2NyaXB0LmluY2x1ZGVzKCdnZWRpLm1nci5jb25zZW5zdS5vcmcnKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5fY21wID0gbmV3IE5vdFlldEltcGxlbWVudGVkQ21wKDIyMywgdGhpcy5fZG9jdW1lbnQsICdHZWRpIERpZ2l0YWwgcy5yLmwuJywgdXJsT2ZTY3JpcHQsIHRoaXMuX2JhY2tlbmRDYWxsKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGVsc2UgaWYgKCh1cmxPZlNjcmlwdC5pbmNsdWRlcygnZW5zaWdodGVuLmNvbScpIHx8IHVybE9mU2NyaXB0LmluY2x1ZGVzKCdlbnNpZ2h0ZW4ubWdyLmNvbnNlbnN1Lm9yZycpKSAmJiAhdXJsT2ZTY3JpcHQuaW5jbHVkZXMoJ25leHVzLmVuc2lnaHRlbi5jb20nKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5fY21wID0gbmV3IE5vdFlldEltcGxlbWVudGVkQ21wKDIyNCwgdGhpcy5fZG9jdW1lbnQsICdFbnNpZ2h0ZW4sIEluYycsIHVybE9mU2NyaXB0LCB0aGlzLl9iYWNrZW5kQ2FsbCk7XG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBlbHNlIGlmICh1cmxPZlNjcmlwdC5pbmNsdWRlcygnaWRtbmV0LmdydXBhenByLnBsJykgfHwgdXJsT2ZTY3JpcHQuaW5jbHVkZXMoJ2lkbW5ldC5tZ3IuY29uc2Vuc3Uub3JnJykpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuX2NtcCA9IG5ldyBOb3RZZXRJbXBsZW1lbnRlZENtcCgyMjUsIHRoaXMuX2RvY3VtZW50LCAnSW50ZXJuZXRvd3kgRG9tIE1lZGlvd3kgbmV0IFMuQS4nLCB1cmxPZlNjcmlwdCwgdGhpcy5fYmFja2VuZENhbGwpO1xuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgZWxzZSBpZiAodXJsT2ZTY3JpcHQuaW5jbHVkZXMoJ2dydXBwb2F0aGVzaXMuaXQnKSB8fCB1cmxPZlNjcmlwdC5pbmNsdWRlcygnZ3J1cHBvYXRoZXNpcy5tZ3IuY29uc2Vuc3Uub3JnJykpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuX2NtcCA9IG5ldyBOb3RZZXRJbXBsZW1lbnRlZENtcCgyMjYsIHRoaXMuX2RvY3VtZW50LCAnU29jaWV0w6AgQXRoZXNpcyBTLnAuQS4nLCB1cmxPZlNjcmlwdCwgdGhpcy5fYmFja2VuZENhbGwpO1xuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgZWxzZSBpZiAodXJsT2ZTY3JpcHQuaW5jbHVkZXMoJ2hlYWx0aGxpbmUuY29tJykgfHwgdXJsT2ZTY3JpcHQuaW5jbHVkZXMoJ2hlYWx0aGxpbmVtZWRpYS5tZ3IuY29uc2Vuc3Uub3JnJykpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuX2NtcCA9IG5ldyBOb3RZZXRJbXBsZW1lbnRlZENtcCgyMjcsIHRoaXMuX2RvY3VtZW50LCAnSGVhbHRobGluZSBNZWRpYSwgSW5jLicsIHVybE9mU2NyaXB0LCB0aGlzLl9iYWNrZW5kQ2FsbCk7XG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBlbHNlIGlmICh1cmxPZlNjcmlwdC5pbmNsdWRlcygndGhpcmRmbG9vci5pdCcpIHx8IHVybE9mU2NyaXB0LmluY2x1ZGVzKCd0aGlyZGZsb29yLm1nci5jb25zZW5zdS5vcmcnKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5fY21wID0gbmV3IE5vdFlldEltcGxlbWVudGVkQ21wKDIyOCwgdGhpcy5fZG9jdW1lbnQsICdUaGlyZGZsb29yIFNSTCcsIHVybE9mU2NyaXB0LCB0aGlzLl9iYWNrZW5kQ2FsbCk7XG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBlbHNlIGlmICh1cmxPZlNjcmlwdC5pbmNsdWRlcygnc25pZ2Vsd2ViLmNvbScpIHx8IHVybE9mU2NyaXB0LmluY2x1ZGVzKCdzbmlnZWx3ZWIubWdyLmNvbnNlbnN1Lm9yZycpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLl9jbXAgPSBuZXcgTm90WWV0SW1wbGVtZW50ZWRDbXAoMjI5LCB0aGlzLl9kb2N1bWVudCwgJ1NuaWdlbCBXZWIgU2VydmljZXMgTGltaXRlZCcsIHVybE9mU2NyaXB0LCB0aGlzLl9iYWNrZW5kQ2FsbCk7XG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBlbHNlIGlmICh1cmxPZlNjcmlwdC5pbmNsdWRlcygncHJ5d2F0bm9zYy5pbnRlcmlhLnBsJykgfHwgdXJsT2ZTY3JpcHQuaW5jbHVkZXMoJ2ludGVyaWEubWdyLmNvbnNlbnN1Lm9yZycpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLl9jbXAgPSBuZXcgTm90WWV0SW1wbGVtZW50ZWRDbXAoMjMxLCB0aGlzLl9kb2N1bWVudCwgJ0dydXBhIEludGVyaWEucGwgU3AuIHogby5vLiBzcC4gay4nLCB1cmxPZlNjcmlwdCwgdGhpcy5fYmFja2VuZENhbGwpO1xuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgZWxzZSBpZiAodXJsT2ZTY3JpcHQuaW5jbHVkZXMoJ2FkbnVudGl1cy5jb20nKSB8fCB1cmxPZlNjcmlwdC5pbmNsdWRlcygnYWRudW50aXVzY29uc2VudC5tZ3IuY29uc2Vuc3Uub3JnJykpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuX2NtcCA9IG5ldyBOb3RZZXRJbXBsZW1lbnRlZENtcCgyMzUsIHRoaXMuX2RvY3VtZW50LCAnQWRudW50aXVzIEFTJywgdXJsT2ZTY3JpcHQsIHRoaXMuX2JhY2tlbmRDYWxsKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGVsc2UgaWYgKHVybE9mU2NyaXB0LmluY2x1ZGVzKCd3ZWJhZHMubmwnKSB8fCB1cmxPZlNjcmlwdC5pbmNsdWRlcygnd2ViYWRzLm1nci5jb25zZW5zdS5vcmcnKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5fY21wID0gbmV3IE5vdFlldEltcGxlbWVudGVkQ21wKDIzNiwgdGhpcy5fZG9jdW1lbnQsICdXZWJBZHMgQi5WJywgdXJsT2ZTY3JpcHQsIHRoaXMuX2JhY2tlbmRDYWxsKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGVsc2UgaWYgKHVybE9mU2NyaXB0LmluY2x1ZGVzKCd0aWVtcG8uY29tJykgfHwgdXJsT2ZTY3JpcHQuaW5jbHVkZXMoJ21ldGVvcmVkLm1nci5jb25zZW5zdS5vcmcnKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5fY21wID0gbmV3IE5vdFlldEltcGxlbWVudGVkQ21wKDIzNywgdGhpcy5fZG9jdW1lbnQsICdBTFBSRUQgU0wnLCB1cmxPZlNjcmlwdCwgdGhpcy5fYmFja2VuZENhbGwpO1xuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgZWxzZSBpZiAodXJsT2ZTY3JpcHQuaW5jbHVkZXMoJ25ldHdvcmstbi5jb20nKSB8fCB1cmxPZlNjcmlwdC5pbmNsdWRlcygnbmV0d29ya24ubWdyLmNvbnNlbnN1Lm9yZycpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLl9jbXAgPSBuZXcgTm90WWV0SW1wbGVtZW50ZWRDbXAoMjQwLCB0aGlzLl9kb2N1bWVudCwgJ05ldHdvcmsgTiBMdGQnLCB1cmxPZlNjcmlwdCwgdGhpcy5fYmFja2VuZENhbGwpO1xuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgZWxzZSBpZiAodXJsT2ZTY3JpcHQuaW5jbHVkZXMoJ2NhZmVtZWRpYS5jb20nKSB8fCB1cmxPZlNjcmlwdC5pbmNsdWRlcygnY2FmZW1lZGlhLm1nci5jb25zZW5zdS5vcmcnKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5fY21wID0gbmV3IE5vdFlldEltcGxlbWVudGVkQ21wKDI0MSwgdGhpcy5fZG9jdW1lbnQsICdDYWZlTWVkaWEvQWRUaHJpdmUnLCB1cmxPZlNjcmlwdCwgdGhpcy5fYmFja2VuZENhbGwpO1xuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgZWxzZSBpZiAodXJsT2ZTY3JpcHQuaW5jbHVkZXMoJ25pdHJvcGF5LmNvbScpIHx8IHVybE9mU2NyaXB0LmluY2x1ZGVzKCduaXRyb3BheS5tZ3IuY29uc2Vuc3Uub3JnJykpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuX2NtcCA9IG5ldyBOb3RZZXRJbXBsZW1lbnRlZENtcCgyNDIsIHRoaXMuX2RvY3VtZW50LCAnR0cgU29mdHdhcmUsIExMQycsIHVybE9mU2NyaXB0LCB0aGlzLl9iYWNrZW5kQ2FsbCk7XG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBlbHNlIGlmICh1cmxPZlNjcmlwdC5pbmNsdWRlcygnbGl2aW5nbHltZWRpYS5jb20nKSB8fCB1cmxPZlNjcmlwdC5pbmNsdWRlcygnbGl2aW5nbHltZWRpYS5tZ3IuY29uc2Vuc3Uub3JnJykpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuX2NtcCA9IG5ldyBOb3RZZXRJbXBsZW1lbnRlZENtcCgyNDQsIHRoaXMuX2RvY3VtZW50LCAnTGl2aW5nbHkgTWVkaWEnLCB1cmxPZlNjcmlwdCwgdGhpcy5fYmFja2VuZENhbGwpO1xuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgZWxzZSBpZiAodXJsT2ZTY3JpcHQuaW5jbHVkZXMoJ292ZXJ3b2xmLmNvbScpIHx8IHVybE9mU2NyaXB0LmluY2x1ZGVzKCdvdmVyd29sZi5tZ3IuY29uc2Vuc3Uub3JnJykpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuX2NtcCA9IG5ldyBOb3RZZXRJbXBsZW1lbnRlZENtcCgyNDYsIHRoaXMuX2RvY3VtZW50LCAnT3ZlcndvbGYgTHRkLicsIHVybE9mU2NyaXB0LCB0aGlzLl9iYWNrZW5kQ2FsbCk7XG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBlbHNlIGlmICh1cmxPZlNjcmlwdC5pbmNsdWRlcygnc2V6bmFtLmN6JykgfHwgdXJsT2ZTY3JpcHQuaW5jbHVkZXMoJ3Nlem5hbS5tZ3IuY29uc2Vuc3Uub3JnJykpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuX2NtcCA9IG5ldyBOb3RZZXRJbXBsZW1lbnRlZENtcCgyNDcsIHRoaXMuX2RvY3VtZW50LCAnU2V6bmFtLmN6LCBhLnMuJywgdXJsT2ZTY3JpcHQsIHRoaXMuX2JhY2tlbmRDYWxsKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGVsc2UgaWYgKHVybE9mU2NyaXB0LmluY2x1ZGVzKCdtYWlyZHVtb250LW5ldGxldGl4LmNvbScpIHx8IHVybE9mU2NyaXB0LmluY2x1ZGVzKCdtZG54Y21wLm1nci5jb25zZW5zdS5vcmcnKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5fY21wID0gbmV3IE5vdFlldEltcGxlbWVudGVkQ21wKDI1MiwgdGhpcy5fZG9jdW1lbnQsICdNQUlSRFVNT05UIE5FVExFVElYIEdtYkgmQ28uIEtHJywgdXJsT2ZTY3JpcHQsIHRoaXMuX2JhY2tlbmRDYWxsKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGVsc2UgaWYgKHVybE9mU2NyaXB0LmluY2x1ZGVzKCdhZG1hdGljLmNvbS50cicpIHx8IHVybE9mU2NyaXB0LmluY2x1ZGVzKCdhZG1hdGljLm1nci5jb25zZW5zdS5vcmcnKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5fY21wID0gbmV3IE5vdFlldEltcGxlbWVudGVkQ21wKDI1NiwgdGhpcy5fZG9jdW1lbnQsICdBZE1hdGljIE1lZHlhIEFTJywgdXJsT2ZTY3JpcHQsIHRoaXMuX2JhY2tlbmRDYWxsKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGVsc2UgaWYgKHVybE9mU2NyaXB0LmluY2x1ZGVzKCdhdXRvbWF0dGljLmNvbScpIHx8IHVybE9mU2NyaXB0LmluY2x1ZGVzKCdhdXRvbWF0dGljLm1nci5jb25zZW5zdS5vcmcnKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5fY21wID0gbmV3IE5vdFlldEltcGxlbWVudGVkQ21wKDI1OCwgdGhpcy5fZG9jdW1lbnQsICdBdXRvbWF0dGljLCBJbmMuJywgdXJsT2ZTY3JpcHQsIHRoaXMuX2JhY2tlbmRDYWxsKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGVsc2UgaWYgKHVybE9mU2NyaXB0LmluY2x1ZGVzKCd0cnVlZGF0YS5jbycpIHx8IHVybE9mU2NyaXB0LmluY2x1ZGVzKCd0cnVlZGF0YS5tZ3IuY29uc2Vuc3Uub3JnJykpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuX2NtcCA9IG5ldyBOb3RZZXRJbXBsZW1lbnRlZENtcCgyNjIsIHRoaXMuX2RvY3VtZW50LCAnVHJ1ZURhdGEgU29sdXRpb25zLCBJbmMuJywgdXJsT2ZTY3JpcHQsIHRoaXMuX2JhY2tlbmRDYWxsKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGVsc2UgaWYgKHVybE9mU2NyaXB0LmluY2x1ZGVzKCdzZWN1cmVwcml2YWN5LmFpJykgfHwgdXJsT2ZTY3JpcHQuaW5jbHVkZXMoJ3NlY3VyZXByaXZhY3kubWdyLmNvbnNlbnN1Lm9yZycpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLl9jbXAgPSBuZXcgTm90WWV0SW1wbGVtZW50ZWRDbXAoMjY0LCB0aGlzLl9kb2N1bWVudCwgJ1NlY3VyZSBQcml2YWN5JywgdXJsT2ZTY3JpcHQsIHRoaXMuX2JhY2tlbmRDYWxsKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGVsc2UgaWYgKHVybE9mU2NyaXB0LmluY2x1ZGVzKCdhZHZmbi5jb20nKSB8fCB1cmxPZlNjcmlwdC5pbmNsdWRlcygnYWR2Zm4ubWdyLmNvbnNlbnN1Lm9yZycpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLl9jbXAgPSBuZXcgTm90WWV0SW1wbGVtZW50ZWRDbXAoMjY1LCB0aGlzLl9kb2N1bWVudCwgJ0FEVkZOIFBMQycsIHVybE9mU2NyaXB0LCB0aGlzLl9iYWNrZW5kQ2FsbCk7XG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBlbHNlIGlmICh1cmxPZlNjcmlwdC5pbmNsdWRlcygnbWVkbWUucGwnKSB8fCB1cmxPZlNjcmlwdC5pbmNsdWRlcygncGhhcm1hcGFydG5lci5tZ3IuY29uc2Vuc3Uub3JnJykpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuX2NtcCA9IG5ldyBOb3RZZXRJbXBsZW1lbnRlZENtcCgyNjgsIHRoaXMuX2RvY3VtZW50LCAnUGhhcm1hIFBhcnRuZXIgc3AuIHogby5vLicsIHVybE9mU2NyaXB0LCB0aGlzLl9iYWNrZW5kQ2FsbCk7XG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBlbHNlIGlmICh1cmxPZlNjcmlwdC5pbmNsdWRlcygnbmV4dDE0LmNvbScpIHx8IHVybE9mU2NyaXB0LmluY2x1ZGVzKCduZXh0MTQubWdyLmNvbnNlbnN1Lm9yZycpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLl9jbXAgPSBuZXcgTm90WWV0SW1wbGVtZW50ZWRDbXAoMjczLCB0aGlzLl9kb2N1bWVudCwgJ05leHQxNCBTcEEnLCB1cmxPZlNjcmlwdCwgdGhpcy5fYmFja2VuZENhbGwpO1xuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgZWxzZSBpZiAodXJsT2ZTY3JpcHQuaW5jbHVkZXMoJ2FsbGVyaG9sZGluZy5kaycpIHx8IHVybE9mU2NyaXB0LmluY2x1ZGVzKCdhbGxlci5tZ3IuY29uc2Vuc3Uub3JnJykpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuX2NtcCA9IG5ldyBOb3RZZXRJbXBsZW1lbnRlZENtcCgyNzQsIHRoaXMuX2RvY3VtZW50LCAnQWxsZXIgTWVkaWEnLCB1cmxPZlNjcmlwdCwgdGhpcy5fYmFja2VuZENhbGwpO1xuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgZWxzZSBpZiAodXJsT2ZTY3JpcHQuaW5jbHVkZXMoJ3JpbmdpZXJheGVsc3ByaW5nZXIucGwnKSB8fCB1cmxPZlNjcmlwdC5pbmNsdWRlcygncmFzcC5tZ3IuY29uc2Vuc3Uub3JnJykpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuX2NtcCA9IG5ldyBOb3RZZXRJbXBsZW1lbnRlZENtcCgyODAsIHRoaXMuX2RvY3VtZW50LCAnUmluZ2llciBBeGVsIFNwcmluZ2VyIFBvbHNrYScsIHVybE9mU2NyaXB0LCB0aGlzLl9iYWNrZW5kQ2FsbCk7XG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBlbHNlIGlmICh1cmxPZlNjcmlwdC5pbmNsdWRlcygncHVibmF0aXZlLm5ldCcpIHx8IHVybE9mU2NyaXB0LmluY2x1ZGVzKCdwdWJuYXRpdmUubWdyLmNvbnNlbnN1Lm9yZycpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLl9jbXAgPSBuZXcgTm90WWV0SW1wbGVtZW50ZWRDbXAoMjgxLCB0aGlzLl9kb2N1bWVudCwgJ1B1Yk5hdGl2ZSBHbWJIJywgdXJsT2ZTY3JpcHQsIHRoaXMuX2JhY2tlbmRDYWxsKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGVsc2UgaWYgKHVybE9mU2NyaXB0LmluY2x1ZGVzKCd0aGVmcmVlZGljdGlvbmFyeS5jb20nKSB8fCB1cmxPZlNjcmlwdC5pbmNsdWRlcygndGhlZnJlZWRpY3Rpb25hcnkubWdyLmNvbnNlbnN1Lm9yZycpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLl9jbXAgPSBuZXcgTm90WWV0SW1wbGVtZW50ZWRDbXAoMjgyLCB0aGlzLl9kb2N1bWVudCwgJ0ZhcmxleCBJbmMnLCB1cmxPZlNjcmlwdCwgdGhpcy5fYmFja2VuZENhbGwpO1xuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgZWxzZSBpZiAodXJsT2ZTY3JpcHQuaW5jbHVkZXMoJ29zYW5vLmNvbScpIHx8IHVybE9mU2NyaXB0LmluY2x1ZGVzKCdvc2Fuby5qcycpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLl9jbXAgPSBuZXcgTm90WWV0SW1wbGVtZW50ZWRDbXAoMjgyLCB0aGlzLl9kb2N1bWVudCwgJ09zYW5vIEluYy4sQ29va2llIENvbnNlbnQnLCB1cmxPZlNjcmlwdCwgdGhpcy5fYmFja2VuZENhbGwpO1xuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBmb3IgKGxldCBrZXkgaW4gYnV0dG9ucykge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCBidXR0b24gPSB0aGlzLl9kb2N1bWVudC5xdWVyeVNlbGVjdG9yKGtleSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKFV0aWxzLm9iamVjdENsaWNrYWJsZShidXR0b24pKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFV0aWxzLmxvZyhcIkJhY2tlbmQ6IFwiICsgdGhpcy5fYmFja2VuZENhbGwpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLl9jbXAgPSBuZXcgQ3VzdG9tSW1wbCh0aGlzLl9kb2N1bWVudCwga2V5LCB0aGlzLl9iYWNrZW5kQ2FsbCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrIGFsbFNjcmlwdHM7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9IC8vIEVsc2VcbiAgICAgICAgICAgICAgICB9IC8vIElGIC0gSmF2YVNjcmlwdCBpcyBEZWZpbmVkXG4gICAgICAgICAgICB9IC8vIEZvciBMb29wXG4gICAgICAgIH1cbiAgICAgICAgaWYgKHRoaXMuX2NtcCkge1xuICAgICAgICAgICAgVXRpbHMubG9nKFwiQ01QIGlzIHNldCBub3cuIENvbm5lY3QgdG8gT2JzZXJ2ZXIgaW4gbmV3IGNvbnRleHRcIik7XG4gICAgICAgICAgICAvLyByZW1vdmUgQ29ubmVjdGlvbiB0byB0aGUgbG9jYWwgT2JzZXJ2ZXJcbiAgICAgICAgICAgIGlmICghZmlyc3RUaW1lKVxuICAgICAgICAgICAgICAgIHRoaXMuZGlzY29ubmVjdE9ic2VydmVyKCk7XG4gICAgICAgICAgICB0aGlzLl9jbXAuY29ubmVjdCgpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgVXRpbHMubG9nKFwiLS0gUnVuIFRocnUgY29tcGxldGVkLiBObyBJbmRpY2F0b3IgZm9yIEphdmFTY3JpcHQgb2YgYSBDTVAgc28gZmFyLiBDb3VudDogXCIgKyB0aGlzLl9jYWxsQmFja0NvdW50ZXIpO1xuICAgICAgICAgICAgaWYgKHRoaXMuX2NhbGxCYWNrQ291bnRlciA+IDEwMCkge1xuICAgICAgICAgICAgICAgIFV0aWxzLmxvZyhcIkRpc2Nvbm5lY3RpbmcgZnJvbSBPYnNlcnZlciBub3dcIik7XG4gICAgICAgICAgICAgICAgdGhpcy5kaXNjb25uZWN0T2JzZXJ2ZXIoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbn1cbiIsIlwidXNlIHN0cmljdFwiO1xuY29uc3QgZGF0ZUZvcm1hdCA9IHJlcXVpcmUoXCJkYXRlZm9ybWF0XCIpO1xuZXhwb3J0IGRlZmF1bHQgY2xhc3MgVXRpbHMge1xuICAgIHN0YXRpYyBsb2cobWVzc2FnZSkge1xuICAgICAgICBjb25zb2xlLmxvZyhkYXRlRm9ybWF0KG5ldyBEYXRlKCksICd5eXl5LW1tLWRkIEhIOk1NOnNzLmwnKSArIFwiIFwiICsgbWVzc2FnZSk7XG4gICAgfVxuICAgIHN0YXRpYyBjcmVhdGVNaW5pbWFsQ29uc2VudEJ1dHRvbihkb2N1bWVudCwgamF2YVNjcmlwdCkge1xuICAgICAgICBsZXQgbGluayA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2EnKTtcbiAgICAgICAgbGluay50ZXh0ID0gJ01pbmltYWwgQ29uc2VudCc7XG4gICAgICAgIGxpbmsuc2V0QXR0cmlidXRlKFwiY2xhc3NcIiwgXCJtaW5pbWFsLWNvbnNlbnRcIik7XG4gICAgICAgIGxpbmsuaHJlZiA9IGphdmFTY3JpcHQ7XG4gICAgICAgIGRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQobGluayk7XG4gICAgfVxuICAgIHN0YXRpYyBvYmplY3RDbGlja2FibGUobXlPYmplY3QpIHtcbiAgICAgICAgcmV0dXJuIHR5cGVvZiBteU9iamVjdCAhPT0gJ3VuZGVmaW5lZCcgJiYgbXlPYmplY3QgJiYgdHlwZW9mIG15T2JqZWN0LnBhcmVudEVsZW1lbnQgIT09ICd1bmRlZmluZWQnICYmIG15T2JqZWN0Lm9mZnNldFBhcmVudDtcbiAgICB9XG4gICAgc3RhdGljIG9iamVjdFZpc2libGUobXlPYmplY3QpIHtcbiAgICAgICAgcmV0dXJuIHR5cGVvZiBteU9iamVjdCAhPT0gJ3VuZGVmaW5lZCcgJiYgbXlPYmplY3QgJiYgdHlwZW9mIG15T2JqZWN0LnBhcmVudEVsZW1lbnQgIT09ICd1bmRlZmluZWQnO1xuICAgIH1cbiAgICBzdGF0aWMgY2hlY2tJZkRlZmluZWRBbmROb3ROdWxsKGZpZWxkKSB7XG4gICAgICAgIHJldHVybiB0eXBlb2YgZmllbGQgIT09ICd1bmRlZmluZWQnICYmIGZpZWxkICE9PSBudWxsO1xuICAgIH1cbn1cbiIsIlwidXNlIHN0cmljdFwiO1xuaW1wb3J0IFV0aWxzIGZyb20gXCIuLi9VdGlsc1wiO1xuaW1wb3J0IENNUCBmcm9tIFwiLi9DTVBcIjtcbmltcG9ydCBDbXBUeXBlIGZyb20gXCIuL0NtcFR5cGVcIjtcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEJvcmxhYnMge1xuICAgIC8vIHRoaXMgaXMgbm90IGFuIElBQiBTb2x1dGlvblxuICAgIGNvbnN0cnVjdG9yKG5vZGUsIHNjcmlwdFVybCwgYmFja2VuZENhbGwpIHtcbiAgICAgICAgdGhpcy5fbmFtZSA9IFwiQm9ybGFicy5uZXRcIjtcbiAgICAgICAgYmFja2VuZENhbGwuY21wRGF0YSgxMDAwMSwgdGhpcy5fbmFtZSwgc2NyaXB0VXJsLCBDbXBUeXBlLkRPX05PVF9XQUlULCB0cnVlKTtcbiAgICAgICAgdGhpcy5fY21wID0gbmV3IENNUChub2RlLCBiYWNrZW5kQ2FsbCwgdGhpcyk7XG4gICAgfVxuICAgIGdldCBuYW1lKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fbmFtZTtcbiAgICB9XG4gICAgY29ubmVjdCgpIHtcbiAgICAgICAgdGhpcy5fY21wLmNvbm5lY3QoKTtcbiAgICB9XG4gICAgLypcbiAgICBodHRwczovL3d3dy4xMjNlZmZpemllbnRkYWJlaS5kZS8sIGh0dHBzOi8vd3d3LmFiaWJ1Y2gtZGVzaWduZXIuZGUvLCBodHRwczovL3d3dy5zdGF1YnNhdWdlci1iZXJhdGVyLmRlLyBodHRwczovL3d3dy5hcmdlLmRlL1xuICAgICAqL1xuICAgIGhhbmRsZUNtcCgpIHtcbiAgICAgICAgLy8gU3RlcCAxXG4gICAgICAgIGNvbnN0IHBvcHVwID0gXCJkaXYuX2JybGJzLWJveC13cmFwXCI7XG4gICAgICAgIGxldCBwb3B1cERpdiA9IHRoaXMuX2NtcC5xdWVyeU5vZGVTZWxlY3Rvcihwb3B1cCk7XG4gICAgICAgIGNvbnN0IGNoZWNrYm94SW5kaWN0b3IgPSBcImRpdi5fYnJsYnMtY2hlY2tib3gtaW5kaWNhdG9yXCI7XG4gICAgICAgIGxldCBjaGVja2JveEluZGljdG9yRGl2ID0gdGhpcy5fY21wLnF1ZXJ5Tm9kZVNlbGVjdG9yQWxsKGNoZWNrYm94SW5kaWN0b3IpO1xuICAgICAgICBVdGlscy5sb2coXCJjaGVja2JveEluZGljdG9yRGl2OiBcIiArIGNoZWNrYm94SW5kaWN0b3JEaXYubGVuZ3RoKTtcbiAgICAgICAgY29uc3QgbWVkaWEgPSBcImlucHV0I2NoZWNrYm94LWV4dGVybmFsLW1lZGlhXCI7XG4gICAgICAgIGxldCBpbnB1dE1lZGlhID0gdGhpcy5fY21wLnF1ZXJ5Tm9kZVNlbGVjdG9yKG1lZGlhKTtcbiAgICAgICAgY29uc3Qgc3RhdHMgPSBcImlucHV0I2NoZWNrYm94LXN0YXRpc3RpY3NcIjtcbiAgICAgICAgbGV0IGlucHV0U3RhdHMgPSB0aGlzLl9jbXAucXVlcnlOb2RlU2VsZWN0b3Ioc3RhdHMpO1xuICAgICAgICBjb25zdCBtYXJrZXRpbmcgPSBcImlucHV0I2NoZWNrYm94LW1hcmtldGluZ1wiO1xuICAgICAgICBsZXQgaW5wdXRNYXJrZXRpbmcgPSB0aGlzLl9jbXAucXVlcnlOb2RlU2VsZWN0b3IobWFya2V0aW5nKTtcbiAgICAgICAgY29uc3Qgc2F2ZSA9IFwiYS5fYnJsYnMtYnRuXCI7XG4gICAgICAgIGxldCBzYXZlQnV0dG9ucyA9IHRoaXMuX2NtcC5xdWVyeU5vZGVTZWxlY3RvckFsbChzYXZlKTtcbiAgICAgICAgVXRpbHMubG9nKFwic2F2ZUJ1dHRvbnM6IFwiICsgc2F2ZUJ1dHRvbnMubGVuZ3RoKTtcbiAgICAgICAgVXRpbHMubG9nKFwiU3RhdGU6IFwiICsgdGhpcy5fY21wLnN0YXRlKTtcbiAgICAgICAgaWYgKFV0aWxzLm9iamVjdENsaWNrYWJsZShwb3B1cERpdikgJiYgdGhpcy5fY21wLnN0YXRlID09PSAwKSB7XG4gICAgICAgICAgICBVdGlscy5sb2coXCJEaXYgRm91bmRcIik7XG4gICAgICAgICAgICBpZiAoVXRpbHMub2JqZWN0Q2xpY2thYmxlKGlucHV0TWVkaWEpKSB7XG4gICAgICAgICAgICAgICAgVXRpbHMubG9nKFwiQ2xpY2tlZCBpbnB1dE1lZGlhXCIpO1xuICAgICAgICAgICAgICAgIGlucHV0TWVkaWEuc2V0QXR0cmlidXRlKFwiY2hlY2tlZFwiLCBcImZhbHNlXCIpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKFV0aWxzLm9iamVjdENsaWNrYWJsZShpbnB1dFN0YXRzKSkge1xuICAgICAgICAgICAgICAgIFV0aWxzLmxvZyhcIkNsaWNrZWQgaW5wdXRTdGF0c3RcIik7XG4gICAgICAgICAgICAgICAgaW5wdXRTdGF0cy5zZXRBdHRyaWJ1dGUoXCJjaGVja2VkXCIsIFwiZmFsc2VcIik7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoVXRpbHMub2JqZWN0Q2xpY2thYmxlKGlucHV0TWFya2V0aW5nKSkge1xuICAgICAgICAgICAgICAgIFV0aWxzLmxvZyhcIkNsaWNrZWQgaW5wdXRNYXJrZXRpbmdcIik7XG4gICAgICAgICAgICAgICAgaW5wdXRNYXJrZXRpbmcuc2V0QXR0cmlidXRlKFwiY2hlY2tlZFwiLCBcImZhbHNlXCIpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgbGV0IGNsaWNrZWQgPSBmYWxzZTtcbiAgICAgICAgICAgIGlmIChzYXZlQnV0dG9ucyAmJiBzYXZlQnV0dG9ucy5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICAgICAgc2F2ZUJ1dHRvbnMuZm9yRWFjaChmdW5jdGlvbiAoc3Bhbikge1xuICAgICAgICAgICAgICAgICAgICBVdGlscy5sb2coc3Bhbi5pbm5lckhUTUwpO1xuICAgICAgICAgICAgICAgICAgICBpZiAoc3Bhbi5pbm5lckhUTUwuaW5jbHVkZXMoXCJlc3NlbnppZWxsZVwiKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgc3Bhbi5jbGljaygpO1xuICAgICAgICAgICAgICAgICAgICAgICAgVXRpbHMubG9nKFwiQ2xpY2tlZCBvbiBlc3NlbnppZWxsZVwiKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNsaWNrZWQgPSB0cnVlO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGVsc2UgaWYgKHNwYW4uaW5uZXJIVE1MLmluY2x1ZGVzKFwiU3BlaWNoZXJuXCIpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBzcGFuLmNsaWNrKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICBVdGlscy5sb2coXCJDbGlja2VkIG9uIFNwZWljaGVyblwiKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNsaWNrZWQgPSB0cnVlO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoY2xpY2tlZCkge1xuICAgICAgICAgICAgICAgIFV0aWxzLmxvZyhcIkNsaWNrZWQsIHJlc2V0IG5vd1wiKTtcbiAgICAgICAgICAgICAgICB0aGlzLl9jbXAucmVzZXQoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbn1cbiIsIlwidXNlIHN0cmljdFwiO1xuaW1wb3J0IFV0aWxzIGZyb20gXCIuLi9VdGlsc1wiO1xuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQ01QIHtcbiAgICBjb25zdHJ1Y3Rvcihub2RlLCBiYWNrZW5kQ2FsbCwgY21wSW1wbGVtZW50YXRpb24pIHtcbiAgICAgICAgLyoqXG4gICAgICAgICAqIENvbnN0cnVjdG9yIGZvciBhbiBBYnN0cmFjdCBDTVBcbiAgICAgICAgICpcbiAgICAgICAgICogQHBhcmFtIG5vZGUgRG9jdW1lbnQgUm9vdCBOb2RlXG4gICAgICAgICAqIEBwYXJhbSBuYW1lIE5hbWUgZm9yIHRoZSBDTVAgaW4gVGV4dFxuICAgICAgICAgKiBAcGFyYW0gc2NyaXB0VXJsIFVSTCBmcm9tIHdpdGggdGhlIENNUCB3YXMgbG9hZGVkXG4gICAgICAgICAqIEBwYXJhbSB0eXBlIEVudW1lcmF0aW9uIG9uIFR5cGUgb2YgQ01QIHRvIGRldGVybWluZSB3aGVuIHdlIG5lZWQgdG8gdHJpZ2dlciB0aGUgYmFja2VuZCBjYWxsLlxuICAgICAgICAgKi9cbiAgICAgICAgdGhpcy5fY29uZmlnID0geyBhdHRyaWJ1dGVzOiB0cnVlLCBjaGlsZExpc3Q6IHRydWUsIHN1YnRyZWU6IHRydWUgfTtcbiAgICAgICAgdGhpcy5fbWluaW1hbENvbnNlbnRMaW5rID0gXCJhLm1pbmltYWwtY29uc2VudFwiO1xuICAgICAgICB0aGlzLl9tYXhpbWFsTGltaXRPZkRvbUNoYW5nZVRpbGxTdG9wID0gMTUwO1xuICAgICAgICB0aGlzLl9ub2RlID0gbm9kZTtcbiAgICAgICAgdGhpcy5fc3RhdGUgPSAwO1xuICAgICAgICB0aGlzLl9jYWxsQ291bnRlciA9IDA7XG4gICAgICAgIHRoaXMuX2NtcEltcGxlbWVudGF0aW9uID0gY21wSW1wbGVtZW50YXRpb247XG4gICAgICAgIHRoaXMuX2JhY2tlbmRDYWxsID0gYmFja2VuZENhbGw7XG4gICAgfVxuICAgIGdldCBzdGF0ZSgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX3N0YXRlO1xuICAgIH1cbiAgICBzZXQgc3RhdGUoc3RhdGUpIHtcbiAgICAgICAgdGhpcy5fc3RhdGUgPSBzdGF0ZTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogR2V0dGluZyB0aGUgUm9vdCBOb2RlIG9mIHRoZSBEb2N1bWVudCB3aGVyZSBhIENNUCBpcyBydW5ubmluZ1xuICAgICAqXG4gICAgICogQHJldHVybnMgeyp9XG4gICAgICovXG4gICAgZ2V0IG5vZGUoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9ub2RlO1xuICAgIH1cbiAgICBnZXQgbWluaW1hbENvbnNlbnRMaW5rKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fbWluaW1hbENvbnNlbnRMaW5rO1xuICAgIH1cbiAgICBjb25uZWN0KCkge1xuICAgICAgICBsZXQgX3NlbGYgPSB0aGlzO1xuICAgICAgICB0aGlzLl9vYnNlcnZlciA9IG5ldyBNdXRhdGlvbk9ic2VydmVyKGZ1bmN0aW9uIChtdXRhdGlvbnMpIHtcbiAgICAgICAgICAgIF9zZWxmLm1haW5DbXBIYW5kbGVyKG11dGF0aW9ucyk7XG4gICAgICAgIH0pO1xuICAgICAgICB0aGlzLl9vYnNlcnZlci5vYnNlcnZlKHRoaXMuX25vZGUsIHRoaXMuX2NvbmZpZyk7XG4gICAgICAgIC8vIGluIGNhc2UgdGhlcmUgaXMgbm8gRE9NIGNoYW5nZSBvbiB0aGUgc2l0ZSBhdCB0aGlzIHBsYWNlLCB0aGUgSGFuZGxlciBzaG91bGQgcnVuIGF0IGxlYXN0IG9uY2UuXG4gICAgICAgIHRoaXMubWFpbkNtcEhhbmRsZXIobnVsbCk7XG4gICAgfVxuICAgIGRpc2Nvbm5lY3QoKSB7XG4gICAgICAgIHRoaXMuX29ic2VydmVyLmRpc2Nvbm5lY3QoKTtcbiAgICAgICAgdGhpcy5fc3RhdGUgPSAtMTtcbiAgICAgICAgdGhpcy5fY2FsbENvdW50ZXIgPSAwO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBIYW5kbGUgd2hpY2ggaXMgY2FsbGVkLCB3aGVuIGEgbW9kaWZpY2F0aW9uIGlzIGRldGVjdGVkLlxuICAgICAqXG4gICAgICogQHBhcmFtIG11dGF0aW9uc1xuICAgICAqL1xuICAgIG1haW5DbXBIYW5kbGVyKG11dGF0aW9ucykge1xuICAgICAgICBVdGlscy5sb2coXCJIYW5kbGluZyBcIiArIHRoaXMuX2NtcEltcGxlbWVudGF0aW9uLm5hbWUpO1xuICAgICAgICB0aGlzLl9jYWxsQ291bnRlcisrO1xuICAgICAgICAvLyBpZiBhZnRlciB4IGNoYW5nZXMgdG8gdGhlIERPTSB0aGVyZSBhcyBub3QgcG9wdXAsIHdlIHN0b3AgbGlzdGVuaW5nIHRvIHRoZSBjaGFuZ2VzLlxuICAgICAgICBpZiAodGhpcy5fY2FsbENvdW50ZXIgPCB0aGlzLl9tYXhpbWFsTGltaXRPZkRvbUNoYW5nZVRpbGxTdG9wKSB7XG4gICAgICAgICAgICB0aGlzLl9jbXBJbXBsZW1lbnRhdGlvbi5oYW5kbGVDbXAoKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuZGlzY29ubmVjdCgpO1xuICAgICAgICAgICAgVXRpbHMubG9nKFwiTG9va3MgbGlrZSwgQ01QIHdhcyBhbHJlYWR5IGdpdmVuIGNvbnNlbnQuXCIpO1xuICAgICAgICB9XG4gICAgfVxuICAgIC8qKlxuICAgICAqIFJlc2V0IHRoZSBzdGF0ZSBvZiB0aGUgQ01QIGlmIHRoZSBDb25zZW50IHdhcyBzdWNjZXNzZnVsbHkgZ2l2ZW4uIE1pZ2h0IHRyaWdnZXIgYSBiYWNrZW5kIGNhbGwuXG4gICAgICovXG4gICAgcmVzZXQoKSB7XG4gICAgICAgIC8vIElmIGV2ZXJ5dGhpbmcgaXMgZmluZSwgcmVtb3ZlIHRoZSBsaXN0ZW5lci5cbiAgICAgICAgdGhpcy5fb2JzZXJ2ZXIuZGlzY29ubmVjdCgpO1xuICAgICAgICB0aGlzLl9zdGF0ZSA9IC0xO1xuICAgICAgICB0aGlzLl9iYWNrZW5kQ2FsbC5zdWNjZXNzZnVsQmxvY2soKTtcbiAgICAgICAgVXRpbHMubG9nKCdDb25zZW50IGZvciAnICsgdGhpcy5fY21wSW1wbGVtZW50YXRpb24ubmFtZSArICcgZGVuaWVkLicpO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBGaW5kIGEgc2luZ2xlIE5vZGUgdmlhIGEgQ1NTIFNlbGVjdG9yXG4gICAgICogQHBhcmFtIHNlbGVjdG9yIENTUyBTZWxlY3RvciB0byBzZWFyY2ggZm9yXG4gICAgICogQHJldHVybnMge0VsZW1lbnQgfCBhbnl9XG4gICAgICovXG4gICAgcXVlcnlOb2RlU2VsZWN0b3Ioc2VsZWN0b3IpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX25vZGUucXVlcnlTZWxlY3RvcihzZWxlY3Rvcik7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIEZpbmRzIG11bHRpcGxlIE5vZGVzIHZpYSBhIENTUyBTZWxlY3Rvci5cbiAgICAgKiBAcGFyYW0gc2VsZWN0b3IgQ1NTIFNlbGVjdG9yIHRvIHNlYXJjaCBmb3JcbiAgICAgKiBAcmV0dXJucyB7Tm9kZUxpc3RPZjxIVE1MRWxlbWVudFRhZ05hbWVNYXBbKl0+IHwgTm9kZUxpc3RPZjxFbGVtZW50PiB8IE5vZGVMaXN0T2Y8U1ZHRWxlbWVudFRhZ05hbWVNYXBbKl0+fVxuICAgICAqL1xuICAgIHF1ZXJ5Tm9kZVNlbGVjdG9yQWxsKHNlbGVjdG9yKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9ub2RlLnF1ZXJ5U2VsZWN0b3JBbGwoc2VsZWN0b3IpO1xuICAgIH1cbn1cbiIsIlwidXNlIHN0cmljdFwiO1xuaW1wb3J0IFV0aWxzIGZyb20gXCIuLi9VdGlsc1wiO1xuaW1wb3J0IENNUCBmcm9tIFwiLi9DTVBcIjtcbmltcG9ydCBDbXBUeXBlIGZyb20gXCIuL0NtcFR5cGVcIjtcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIENoYW5kYWdvIHtcbiAgICBjb25zdHJ1Y3Rvcihub2RlLCBzY3JpcHRVcmwsIGJhY2tlbmRDYWxsKSB7XG4gICAgICAgIHRoaXMuX25hbWUgPSBcIkNoYW5kYWdvXCI7XG4gICAgICAgIGJhY2tlbmRDYWxsLmNtcERhdGEoMiwgdGhpcy5fbmFtZSwgc2NyaXB0VXJsLCBDbXBUeXBlLldBSVRfRk9SX0FTWU5DX0NBTExCQUNLLCB0cnVlKTtcbiAgICAgICAgdGhpcy5fY21wID0gbmV3IENNUChub2RlLCBiYWNrZW5kQ2FsbCwgdGhpcyk7XG4gICAgfVxuICAgIGdldCBuYW1lKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fbmFtZTtcbiAgICB9XG4gICAgY29ubmVjdCgpIHtcbiAgICAgICAgdGhpcy5fY21wLmNvbm5lY3QoKTtcbiAgICB9XG4gICAgaGFuZGxlQ21wKCkge1xuICAgICAgICBjb25zdCBjaGFuZGFnb0J1dHRvbkRlbnlDc3MgPSBcImJ1dHRvbi5kZW55XCI7XG4gICAgICAgIGxldCBjaGFuZGFnb0J1dHRvbkRlbnkgPSB0aGlzLl9jbXAucXVlcnlOb2RlU2VsZWN0b3IoY2hhbmRhZ29CdXR0b25EZW55Q3NzKTtcbiAgICAgICAgaWYgKFV0aWxzLm9iamVjdENsaWNrYWJsZShjaGFuZGFnb0J1dHRvbkRlbnkpICYmIHRoaXMuX2NtcC5zdGF0ZSA9PT0gMCkge1xuICAgICAgICAgICAgVXRpbHMubG9nKFwiQ2xpY2sgRGVueSBub3dcIik7XG4gICAgICAgICAgICAvLyBsb29rcyBsaWtlIHRoaXMgZG9lcyBub3Qgd29yay5cbiAgICAgICAgICAgIGNoYW5kYWdvQnV0dG9uRGVueS5jbGljaygpO1xuICAgICAgICAgICAgVXRpbHMubG9nKCdDb25zZW50IG9uIGRlbmllZC4nKTtcbiAgICAgICAgICAgIHRoaXMuX2NtcC5yZXNldCgpO1xuICAgICAgICB9XG4gICAgfVxufVxuIiwiXCJ1c2Ugc3RyaWN0XCI7XG52YXIgQ21wVHlwZTtcbihmdW5jdGlvbiAoQ21wVHlwZSkge1xuICAgIENtcFR5cGVbXCJXQUlUX0ZPUl9BU1lOQ19DQUxMQkFDS1wiXSA9IFwiV2Ugd2FpdCB1bnRpbCB0aGUgSmF2YVNjcmlwdCBPYmplY3Qgb24gdGhlIFBhZ2UgZm9yIHRoZSBDTVAgd2FzIGZvdW5kXCI7XG4gICAgQ21wVHlwZVtcIldBSVRfRk9SX1RJTUVfRlJBTUVcIl0gPSBcIldlIHdhaXQgdGlsbCB0aGUgQ2FsbGJhY2sgc2hvdWxkIGZpcmUgKG1heGltYWwgNSBzZWNvbmRzOyAyNSB4IDIwMCBtc1wiO1xuICAgIENtcFR5cGVbXCJET19OT1RfV0FJVFwiXSA9IFwiV2UgZG9uJ3Qgd2FpdCBmb3IgYSBjYWxsYmFjaywgYXMgd2Uga25vdyB0aGUgQ01QIGlzIG5vdCBUQ0YgY29tcGxpYW50XCI7XG59KShDbXBUeXBlIHx8IChDbXBUeXBlID0ge30pKTtcbmV4cG9ydCBkZWZhdWx0IENtcFR5cGU7XG4iLCJcInVzZSBzdHJpY3RcIjtcbmltcG9ydCBVdGlscyBmcm9tIFwiLi4vVXRpbHNcIjtcbmltcG9ydCBDTVAgZnJvbSBcIi4vQ01QXCI7XG5pbXBvcnQgQ21wVHlwZSBmcm9tIFwiLi9DbXBUeXBlXCI7XG5leHBvcnQgZGVmYXVsdCBjbGFzcyBDb25zZW50TWFuYWdlciB7XG4gICAgY29uc3RydWN0b3Iobm9kZSwgc2NyaXB0VXJsLCBiYWNrZW5kQ2FsbCkge1xuICAgICAgICB0aGlzLl9uYW1lID0gXCJDb25zZW50TWFuYWdlci5uZXRcIjtcbiAgICAgICAgYmFja2VuZENhbGwuY21wRGF0YSgzMSwgdGhpcy5fbmFtZSwgc2NyaXB0VXJsLCBDbXBUeXBlLldBSVRfRk9SX0FTWU5DX0NBTExCQUNLLCB0cnVlKTtcbiAgICAgICAgdGhpcy5fY21wID0gbmV3IENNUChub2RlLCBiYWNrZW5kQ2FsbCwgdGhpcyk7XG4gICAgfVxuICAgIGdldCBuYW1lKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fbmFtZTtcbiAgICB9XG4gICAgY29ubmVjdCgpIHtcbiAgICAgICAgdGhpcy5fY21wLmNvbm5lY3QoKTtcbiAgICB9XG4gICAgaGFuZGxlQ21wKCkge1xuICAgICAgICBjb25zdCBkZW55ID0gJyNjbXBibnRub3R4dCc7XG4gICAgICAgIGxldCBidXR0b25EZW55ID0gdGhpcy5fY21wLnF1ZXJ5Tm9kZVNlbGVjdG9yKGRlbnkpO1xuICAgICAgICBpZiAoVXRpbHMub2JqZWN0Q2xpY2thYmxlKGJ1dHRvbkRlbnkpICYmIHRoaXMuX2NtcC5zdGF0ZSA9PT0gMCkge1xuICAgICAgICAgICAgYnV0dG9uRGVueS5jbGljaygpO1xuICAgICAgICAgICAgdGhpcy5fY21wLnJlc2V0KCk7XG4gICAgICAgIH1cbiAgICAgICAgLy8gVE9ETzogUmVxdWlyZXMgYSBzZWNvbmQgU3RlcCBmb3IgdGhlIHVnbHkgZ3Vpcy5cbiAgICAgICAgLy8gQ3VycmVudGx5IHRoZXJlIGlzIGEgPGEgaHJlZj0nIycgd2l0aCBhbiBvbiBDbGljayBBY3Rpb24gd2hpY2ggaXMgYSBiaXQgcGFpbmZ1bCB0byBoYW5kbGVcbiAgICB9XG59XG4iLCJcInVzZSBzdHJpY3RcIjtcbmltcG9ydCBVdGlscyBmcm9tIFwiLi4vVXRpbHNcIjtcbmltcG9ydCBDTVAgZnJvbSBcIi4vQ01QXCI7XG5pbXBvcnQgQ21wVHlwZSBmcm9tIFwiLi9DbXBUeXBlXCI7XG5leHBvcnQgZGVmYXVsdCBjbGFzcyBDb29raWVCb3Qge1xuICAgIGNvbnN0cnVjdG9yKG5vZGUsIHNjcmlwdFVybCwgYmFja2VuZENhbGwpIHtcbiAgICAgICAgdGhpcy5fbmFtZSA9IFwiQ29va2llQm90XCI7XG4gICAgICAgIGJhY2tlbmRDYWxsLmNtcERhdGEoMTM0LCB0aGlzLl9uYW1lLCBzY3JpcHRVcmwsIENtcFR5cGUuRE9fTk9UX1dBSVQsIHRydWUpO1xuICAgICAgICB0aGlzLl9jbXAgPSBuZXcgQ01QKG5vZGUsIGJhY2tlbmRDYWxsLCB0aGlzKTtcbiAgICB9XG4gICAgZ2V0IG5hbWUoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9uYW1lO1xuICAgIH1cbiAgICBjb25uZWN0KCkge1xuICAgICAgICB0aGlzLl9jbXAuY29ubmVjdCgpO1xuICAgIH1cbiAgICAvKiAgaHR0cHM6Ly93d3cuY29va2llYm90LmNvbS9kZS9cbiAgICAgICAgaHR0cHM6Ly93d3cuZ2l0bGFiLmNvbS9cbiAgICAgICAgaHR0cHM6Ly93d3cuYXBwbGF1c2UuY29tL1xuICAgICAgICBodHRwczovL3d3dy5nYWxlcmlhLmRlL1xuICAgICAgICBodHRwczovL3NpZ25yZXF1ZXN0LmNvbS8jLyA9PiBDb29raWVCb3RcbiAgICAgICAgaHR0cHM6Ly92b2xrc2JsYXR0LmF0LyA9PiBDb29raWUgQm90XG4gICAgICAgIGh0dHBzOi8vd3d3Lnp1c2FtbWVuZ2VnZW5jb3JvbmEuZGUvXG4gICAgICAgIGh0dHBzOi8vZGUuc2NhbGFibGUuY2FwaXRhbC8gPT4gbm90IHdvcmtpbmchXG4gICAgICAgIGh0dHBzOi8vd3d3Lmx2MTg3MS5kZS9sdi9cbiAgICAgICAgaHR0cHM6Ly93d3cuYWR2b2NhZG8uZGUvXG5cbiAgICAgKi9cbiAgICBoYW5kbGVDbXAoKSB7XG4gICAgICAgIGNvbnN0IGNvb2tpZWJvdENoZWNrYm94ZXNTZWxlY3RvciA9IFwiaW5wdXRbdHlwZSo9J2NoZWNrYm94J11cIjtcbiAgICAgICAgbGV0IGNvb2tpZWJvdENoZWNrQm94ZXMgPSB0aGlzLl9jbXAucXVlcnlOb2RlU2VsZWN0b3JBbGwoY29va2llYm90Q2hlY2tib3hlc1NlbGVjdG9yKTtcbiAgICAgICAgVXRpbHMubG9nKFwiY29va2llYm90Q2hlY2tCb3hlczogXCIgKyBjb29raWVib3RDaGVja0JveGVzLmxlbmd0aCk7XG4gICAgICAgIGNvbnN0IGFsbG93U2VsZWN0ZWRTZWxlY3RvcjEgPSBcImEjQ3lib3RDb29raWVib3REaWFsb2dCb2R5TGV2ZWxCdXR0b25MZXZlbE9wdGluQWxsb3dhbGxTZWxlY3Rpb25cIjtcbiAgICAgICAgbGV0IGFsbG93QWxsQnV0dG9uMSA9IHRoaXMuX2NtcC5xdWVyeU5vZGVTZWxlY3RvcihhbGxvd1NlbGVjdGVkU2VsZWN0b3IxKTtcbiAgICAgICAgY29uc3QgYWxsb3dTZWxlY3RlZFNlbGVjdG9yMiA9IFwiYSNDeWJvdENvb2tpZWJvdERpYWxvZ0JvZHlMZXZlbEJ1dHRvbkFjY2VwdFwiO1xuICAgICAgICBsZXQgYWxsb3dBbGxCdXR0b24yID0gdGhpcy5fY21wLnF1ZXJ5Tm9kZVNlbGVjdG9yKGFsbG93U2VsZWN0ZWRTZWxlY3RvcjIpO1xuICAgICAgICBjb25zdCBhbGxvd1NlbGVjdGVkU2VsZWN0b3IzID0gXCJhI0N5Ym90Q29va2llYm90RGlhbG9nQm9keUJ1dHRvbkFjY2VwdFwiO1xuICAgICAgICBjb25zdCBhbGxvd0FsbEJ1dHRvbjMgPSB0aGlzLl9jbXAucXVlcnlOb2RlU2VsZWN0b3IoYWxsb3dTZWxlY3RlZFNlbGVjdG9yMyk7XG4gICAgICAgIGNvbnN0IGRldGFpbHNTZWxlY3RvcjEgPSBcImEjQ3lib3RDb29raWVib3REaWFsb2dCb2R5QnV0dG9uRGV0YWlsc1wiO1xuICAgICAgICBjb25zdCBkZXRhaWxzQnV0dG9uMSA9IHRoaXMuX2NtcC5xdWVyeU5vZGVTZWxlY3RvcihkZXRhaWxzU2VsZWN0b3IxKTtcbiAgICAgICAgY29uc3QgZGV0YWlsc1NlbGVjdG9yMiA9IFwiYSNDeWJvdENvb2tpZWJvdERpYWxvZ0JvZHlMZXZlbERldGFpbHNCdXR0b25cIjtcbiAgICAgICAgY29uc3QgZGV0YWlsc0J1dHRvbjIgPSB0aGlzLl9jbXAucXVlcnlOb2RlU2VsZWN0b3IoZGV0YWlsc1NlbGVjdG9yMik7XG4gICAgICAgIC8vIENhc2UgMTpcbiAgICAgICAgLy8gaWYgdGhlcmUgaXMgdGhlIG9wdGlvbiB0byBkZW55IGFscmVhZHkgb24gdGhlIGZpcnN0IHBhZ2UgLSBkbyBzby5cbiAgICAgICAgLy8gVGVzdCBQYWdlOiBodHRwczovL3d3dy5wb3NzaWJsZW5vdy5jb20vLCBodHRwczovL2Vtb2ppdGVycmEuY29tLyAoY2xpY2sgb24gXCJvbmx5IHJlbGV2YW50IGNvb2tpZXMpXG4gICAgICAgIGlmICgoVXRpbHMub2JqZWN0Q2xpY2thYmxlKGRldGFpbHNCdXR0b24xKSB8fCBVdGlscy5vYmplY3RDbGlja2FibGUoZGV0YWlsc0J1dHRvbjIpKSAmJiB0aGlzLl9jbXAuc3RhdGUgPT09IDApIHtcbiAgICAgICAgICAgIFV0aWxzLmxvZyhcIlN0ZXAgMTogU2hvdyBEZXRhaWxzXCIpO1xuICAgICAgICAgICAgaWYgKFV0aWxzLm9iamVjdENsaWNrYWJsZShkZXRhaWxzQnV0dG9uMSkpIHtcbiAgICAgICAgICAgICAgICBVdGlscy5sb2coXCJEZXRhaWxzIFR5cGUgMVwiKTtcbiAgICAgICAgICAgICAgICBkZXRhaWxzQnV0dG9uMS5jbGljaygpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKFV0aWxzLm9iamVjdENsaWNrYWJsZShkZXRhaWxzQnV0dG9uMikpIHtcbiAgICAgICAgICAgICAgICBVdGlscy5sb2coXCJEZXRhaWxzIFR5cGUgMlwiKTtcbiAgICAgICAgICAgICAgICBkZXRhaWxzQnV0dG9uMi5jbGljaygpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGhpcy5fY21wLnN0YXRlID0gMTtcbiAgICAgICAgfSAvLyBUZXN0IFBhZ2U6IGh0dHBzOi8vd3d3LmNvb2tpZWJvdC5jb20vZGUvLCBodHRwczovL3d3dy5naXRsYWIuY29tLywgaHR0cHM6Ly93d3cuYXBwbGF1c2UuY29tLyAoY2hlY2sgYm94ZXMgb24gQmFubmVyKVxuICAgICAgICBlbHNlIGlmIChjb29raWVib3RDaGVja0JveGVzLmxlbmd0aCA+IDAgJiYgKFV0aWxzLm9iamVjdENsaWNrYWJsZShhbGxvd0FsbEJ1dHRvbjEpIHx8IFV0aWxzLm9iamVjdENsaWNrYWJsZShhbGxvd0FsbEJ1dHRvbjIpIHx8IFV0aWxzLm9iamVjdENsaWNrYWJsZShhbGxvd0FsbEJ1dHRvbjMpKSAmJiB0aGlzLl9jbXAuc3RhdGUgPT09IDEpIHtcbiAgICAgICAgICAgIFV0aWxzLmxvZyhcIkNhc2UgMjogQ29va2llQm90IEJhbm5lciArIENoZWNrYm94ZXMgZm91bmRcIik7XG4gICAgICAgICAgICBjb29raWVib3RDaGVja0JveGVzLmZvckVhY2goZnVuY3Rpb24gKGNoZWNrYm94KSB7XG4gICAgICAgICAgICAgICAgY2hlY2tib3guc2V0QXR0cmlidXRlKFwiY2hlY2tlZFwiLCBcImZhbHNlXCIpO1xuICAgICAgICAgICAgICAgIFV0aWxzLmxvZyhcIkNoZWNrYm94IHVuc2V0XCIpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICBpZiAoVXRpbHMub2JqZWN0Q2xpY2thYmxlKGFsbG93QWxsQnV0dG9uMSkpIHtcbiAgICAgICAgICAgICAgICBVdGlscy5sb2coXCJBY2NlcHQgVHlwZSAxXCIpO1xuICAgICAgICAgICAgICAgIGFsbG93QWxsQnV0dG9uMS5jbGljaygpO1xuICAgICAgICAgICAgICAgIHNldFRpbWVvdXQoYWxsb3dBbGxCdXR0b24xLmNsaWNrKCksIDUwMCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoVXRpbHMub2JqZWN0Q2xpY2thYmxlKGFsbG93QWxsQnV0dG9uMikpIHtcbiAgICAgICAgICAgICAgICBVdGlscy5sb2coXCJBY2NlcHQgVHlwZSAyXCIpO1xuICAgICAgICAgICAgICAgIGFsbG93QWxsQnV0dG9uMi5jbGljaygpO1xuICAgICAgICAgICAgICAgIHNldFRpbWVvdXQoYWxsb3dBbGxCdXR0b24yLmNsaWNrKCksIDUwMCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoVXRpbHMub2JqZWN0Q2xpY2thYmxlKGFsbG93QWxsQnV0dG9uMykpIHtcbiAgICAgICAgICAgICAgICBVdGlscy5sb2coXCJBY2NlcHQgVHlwZSAzXCIpO1xuICAgICAgICAgICAgICAgIGFsbG93QWxsQnV0dG9uMy5jbGljaygpO1xuICAgICAgICAgICAgICAgIHNldFRpbWVvdXQoYWxsb3dBbGxCdXR0b24zLmNsaWNrKCksIDUwMCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0aGlzLl9jbXAucmVzZXQoKTtcbiAgICAgICAgfVxuICAgICAgICAvLyB0aGlzIGlzIGEgc3BlY2lhbCBDYXNlIGZvciBWMi4gVGhlIEJhbm5lciB3YXMgZm91bmQgYW5kIHdlIG9ubHkgY2xpY2sgb24gdGhlIERlbnkgQnV0dG9uLlxuICAgIH1cbn1cbiIsIlwidXNlIHN0cmljdFwiO1xuaW1wb3J0IFV0aWxzIGZyb20gXCIuLi9VdGlsc1wiO1xuaW1wb3J0IENNUCBmcm9tIFwiLi9DTVBcIjtcbmltcG9ydCBDbXBUeXBlIGZyb20gXCIuL0NtcFR5cGVcIjtcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEN1c3RvbUltcGwge1xuICAgIGNvbnN0cnVjdG9yKG5vZGUsIGtleSwgYmFja2VuZENhbGwpIHtcbiAgICAgICAgdGhpcy5fbmFtZSA9IFwiQ3VzdG9tIEltcGxlbWVudGF0aW9uXCI7XG4gICAgICAgIGJhY2tlbmRDYWxsLmNtcERhdGEoMCwgdGhpcy5fbmFtZSwgXCJuYVwiLCBDbXBUeXBlLkRPX05PVF9XQUlULCB0cnVlKTtcbiAgICAgICAgdGhpcy5fY21wID0gbmV3IENNUChub2RlLCBiYWNrZW5kQ2FsbCwgdGhpcyk7XG4gICAgICAgIHRoaXMuX2J1dHRvbiA9IGtleTtcbiAgICB9XG4gICAgZ2V0IG5hbWUoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9uYW1lO1xuICAgIH1cbiAgICBjb25uZWN0KCkge1xuICAgICAgICB0aGlzLl9jbXAuY29ubmVjdCgpO1xuICAgIH1cbiAgICBoYW5kbGVDbXAoKSB7XG4gICAgICAgIGxldCBidXR0b24gPSB0aGlzLl9jbXAucXVlcnlOb2RlU2VsZWN0b3IodGhpcy5fYnV0dG9uKTtcbiAgICAgICAgaWYgKFV0aWxzLm9iamVjdENsaWNrYWJsZShidXR0b24pICYmIHRoaXMuX2NtcC5zdGF0ZSA9PT0gMCkge1xuICAgICAgICAgICAgVXRpbHMubG9nKFwiQnV0dG9uIEZvdW5kLCBjbGlja2luZ1wiKTtcbiAgICAgICAgICAgIGJ1dHRvbi5jbGljaygpO1xuICAgICAgICAgICAgdGhpcy5fY21wLnJlc2V0KCk7XG4gICAgICAgIH1cbiAgICB9XG59XG4iLCJcInVzZSBzdHJpY3RcIjtcbmltcG9ydCBVdGlscyBmcm9tIFwiLi4vVXRpbHNcIjtcbmltcG9ydCBDTVAgZnJvbSBcIi4vQ01QXCI7XG5pbXBvcnQgQ21wVHlwZSBmcm9tIFwiLi9DbXBUeXBlXCI7XG5leHBvcnQgZGVmYXVsdCBjbGFzcyBEaURvTWkge1xuICAgIGNvbnN0cnVjdG9yKG5vZGUsIHNjcmlwdFVybCwgYmFja2VuZENhbGwpIHtcbiAgICAgICAgdGhpcy5fbmFtZSA9IFwiRGlkb21pLm5ldFwiO1xuICAgICAgICBiYWNrZW5kQ2FsbC5jbXBEYXRhKDcsIHRoaXMuX25hbWUsIHNjcmlwdFVybCwgQ21wVHlwZS5XQUlUX0ZPUl9BU1lOQ19DQUxMQkFDSywgdHJ1ZSk7XG4gICAgICAgIHRoaXMuX2NtcCA9IG5ldyBDTVAobm9kZSwgYmFja2VuZENhbGwsIHRoaXMpO1xuICAgIH1cbiAgICBnZXQgbmFtZSgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX25hbWU7XG4gICAgfVxuICAgIGNvbm5lY3QoKSB7XG4gICAgICAgIHRoaXMuX2NtcC5jb25uZWN0KCk7XG4gICAgfVxuICAgIC8qXG4gICAgaHR0cHM6Ly93d3cubWFyaWFubmUubmV0LywgaHR0cHM6Ly93d3cubGF2b2l4ZHVub3JkLmZyLywgaHR0cHM6Ly93d3cudG9tc2d1aWRlLmZyLywgaHR0cHM6Ly93d3cuZ2VuZXJhdGlvbi1udC5jb20vXG4gICAgICovXG4gICAgaGFuZGxlQ21wKCkge1xuICAgICAgICAvLyBTdGVwIDFcbiAgICAgICAgY29uc3QgcG9wdXAgPSBcImRpdi5kaWRvbWktcG9wdXAtY29udGFpbmVyXCI7XG4gICAgICAgIGxldCBwb3B1cERpdiA9IHRoaXMuX2NtcC5xdWVyeU5vZGVTZWxlY3Rvcihwb3B1cCk7XG4gICAgICAgIGNvbnN0IGRldGFpbHMgPSBcImJ1dHRvbiNkaWRvbWktbm90aWNlLWxlYXJuLW1vcmUtYnV0dG9uXCI7XG4gICAgICAgIGxldCBkZXRhaWxzQnV0dG9uID0gdGhpcy5fY21wLnF1ZXJ5Tm9kZVNlbGVjdG9yKGRldGFpbHMpO1xuICAgICAgICBVdGlscy5sb2coXCJkZXRhaWxzQnV0dG9uOiBcIiArIEpTT04uc3RyaW5naWZ5KGRldGFpbHNCdXR0b24pKTtcbiAgICAgICAgLy8gU3RlcDEgMlxuICAgICAgICBjb25zdCByZWZ1c2VyID0gXCJidXR0b24uZGlkb21pLWNvbXBvbmVudHMtcmFkaW9fX29wdGlvblwiO1xuICAgICAgICBsZXQgcmVmdXNlckJ1dHRvbiA9IHRoaXMuX2NtcC5xdWVyeU5vZGVTZWxlY3RvckFsbChyZWZ1c2VyKTtcbiAgICAgICAgVXRpbHMubG9nKFwicmVmdXNlckJ1dHRvbiBsZW5ndGg6IFwiICsgcmVmdXNlckJ1dHRvbi5sZW5ndGgpO1xuICAgICAgICBjb25zdCBlbnJlZ2lzdHJlciA9IFwiYnV0dG9uLmRpZG9taS1jb21wb25lbnRzLWJ1dHRvblwiO1xuICAgICAgICBsZXQgZW5yZWdpc3RyZXJCdXR0b24gPSB0aGlzLl9jbXAucXVlcnlOb2RlU2VsZWN0b3JBbGwoZW5yZWdpc3RyZXIpO1xuICAgICAgICBVdGlscy5sb2coXCJlbnJlZ2lzdHJlciBsZW5ndGg6IFwiICsgZW5yZWdpc3RyZXIubGVuZ3RoKTtcbiAgICAgICAgVXRpbHMubG9nKFwiU3RhdGU6IFwiICsgdGhpcy5fY21wLnN0YXRlKTtcbiAgICAgICAgaWYgKFV0aWxzLm9iamVjdENsaWNrYWJsZShkZXRhaWxzQnV0dG9uKSAmJiBVdGlscy5vYmplY3RDbGlja2FibGUocG9wdXBEaXYpICYmIHRoaXMuX2NtcC5zdGF0ZSA9PT0gMCkge1xuICAgICAgICAgICAgVXRpbHMubG9nKFwiQ2xpY2tpbmcgb24gRGV0YWlsc1wiKTtcbiAgICAgICAgICAgIGRldGFpbHNCdXR0b24uY2xpY2soKTtcbiAgICAgICAgICAgIHRoaXMuX2NtcC5zdGF0ZSA9IDE7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAocmVmdXNlckJ1dHRvbi5sZW5ndGggPiAwICYmIFV0aWxzLm9iamVjdENsaWNrYWJsZShwb3B1cERpdikgJiYgdGhpcy5fY21wLnN0YXRlID09PSAxKSB7XG4gICAgICAgICAgICBVdGlscy5sb2coXCJMb29raW5nIGZvciBTcGFuMVwiKTtcbiAgICAgICAgICAgIGxldCBjbGlja2VkID0gZmFsc2U7XG4gICAgICAgICAgICByZWZ1c2VyQnV0dG9uLmZvckVhY2goZnVuY3Rpb24gKHNwYW4pIHtcbiAgICAgICAgICAgICAgICBVdGlscy5sb2coc3Bhbi5pbm5lckhUTUwpO1xuICAgICAgICAgICAgICAgIGlmIChzcGFuLmlubmVySFRNTC50b0xvd2VyQ2FzZSgpLmluY2x1ZGVzKFwicmVmdXNlclwiKSB8fCBzcGFuLmlubmVySFRNTC50b0xvd2VyQ2FzZSgpLmluY2x1ZGVzKFwiZGlzYWdyZWVcIikpIHtcbiAgICAgICAgICAgICAgICAgICAgc3Bhbi5jbGljaygpO1xuICAgICAgICAgICAgICAgICAgICBVdGlscy5sb2coXCJDbGlja2VkIG9uIFJlZnVzZXIvRGlzYWdyZWVcIik7XG4gICAgICAgICAgICAgICAgICAgIGNsaWNrZWQgPSB0cnVlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgaWYgKGNsaWNrZWQpIHtcbiAgICAgICAgICAgICAgICBVdGlscy5sb2coXCJDbGlja2VkLCB1cGRhdGUgc2V0XCIpO1xuICAgICAgICAgICAgICAgIHRoaXMuX2NtcC5zdGF0ZSA9IDI7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAoZW5yZWdpc3RyZXJCdXR0b24ubGVuZ3RoID4gMCAmJiBVdGlscy5vYmplY3RDbGlja2FibGUocG9wdXBEaXYpICYmIHRoaXMuX2NtcC5zdGF0ZSA9PT0gMikge1xuICAgICAgICAgICAgVXRpbHMubG9nKFwiTG9va2luZyBmb3IgU2F2ZS9FbnJlZ2lzdHJlXCIpO1xuICAgICAgICAgICAgbGV0IGNsaWNrZWQgPSBmYWxzZTtcbiAgICAgICAgICAgIGVucmVnaXN0cmVyQnV0dG9uLmZvckVhY2goZnVuY3Rpb24gKHNwYW4pIHtcbiAgICAgICAgICAgICAgICBVdGlscy5sb2coc3Bhbi5pbm5lckhUTUwpO1xuICAgICAgICAgICAgICAgIGlmIChzcGFuLmlubmVySFRNTC50b0xvd2VyQ2FzZSgpLmluY2x1ZGVzKFwiZW5yZWdpc3RyZXJcIikgfHwgc3Bhbi5pbm5lckhUTUwudG9Mb3dlckNhc2UoKS5pbmNsdWRlcyhcInNhdmVcIikpIHtcbiAgICAgICAgICAgICAgICAgICAgc3Bhbi5jbGljaygpO1xuICAgICAgICAgICAgICAgICAgICBVdGlscy5sb2coXCJDbGlja2VkIG9uIEVucmVnaXN0cmVyL1NhdmVcIik7XG4gICAgICAgICAgICAgICAgICAgIGNsaWNrZWQgPSB0cnVlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgaWYgKGNsaWNrZWQpIHtcbiAgICAgICAgICAgICAgICBVdGlscy5sb2coXCJDbGlja2VkLCByZXNldCBub3dcIik7XG4gICAgICAgICAgICAgICAgdGhpcy5fY21wLnJlc2V0KCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG59XG4iLCJcInVzZSBzdHJpY3RcIjtcbnZhciBfX2F3YWl0ZXIgPSAodGhpcyAmJiB0aGlzLl9fYXdhaXRlcikgfHwgZnVuY3Rpb24gKHRoaXNBcmcsIF9hcmd1bWVudHMsIFAsIGdlbmVyYXRvcikge1xuICAgIGZ1bmN0aW9uIGFkb3B0KHZhbHVlKSB7IHJldHVybiB2YWx1ZSBpbnN0YW5jZW9mIFAgPyB2YWx1ZSA6IG5ldyBQKGZ1bmN0aW9uIChyZXNvbHZlKSB7IHJlc29sdmUodmFsdWUpOyB9KTsgfVxuICAgIHJldHVybiBuZXcgKFAgfHwgKFAgPSBQcm9taXNlKSkoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkge1xuICAgICAgICBmdW5jdGlvbiBmdWxmaWxsZWQodmFsdWUpIHsgdHJ5IHsgc3RlcChnZW5lcmF0b3IubmV4dCh2YWx1ZSkpOyB9IGNhdGNoIChlKSB7IHJlamVjdChlKTsgfSB9XG4gICAgICAgIGZ1bmN0aW9uIHJlamVjdGVkKHZhbHVlKSB7IHRyeSB7IHN0ZXAoZ2VuZXJhdG9yW1widGhyb3dcIl0odmFsdWUpKTsgfSBjYXRjaCAoZSkgeyByZWplY3QoZSk7IH0gfVxuICAgICAgICBmdW5jdGlvbiBzdGVwKHJlc3VsdCkgeyByZXN1bHQuZG9uZSA/IHJlc29sdmUocmVzdWx0LnZhbHVlKSA6IGFkb3B0KHJlc3VsdC52YWx1ZSkudGhlbihmdWxmaWxsZWQsIHJlamVjdGVkKTsgfVxuICAgICAgICBzdGVwKChnZW5lcmF0b3IgPSBnZW5lcmF0b3IuYXBwbHkodGhpc0FyZywgX2FyZ3VtZW50cyB8fCBbXSkpLm5leHQoKSk7XG4gICAgfSk7XG59O1xuaW1wb3J0IFV0aWxzIGZyb20gXCIuLi9VdGlsc1wiO1xuaW1wb3J0IENNUCBmcm9tIFwiLi9DTVBcIjtcbmltcG9ydCBDbXBUeXBlIGZyb20gXCIuL0NtcFR5cGVcIjtcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEV2aWRvbiB7XG4gICAgY29uc3RydWN0b3Iobm9kZSwgc2NyaXB0VXJsLCBiYWNrZW5kQ2FsbCkge1xuICAgICAgICB0aGlzLl9uYW1lID0gXCJFdmlkb24sIEluYy5cIjtcbiAgICAgICAgdGhpcy5fdHJpZ2dlcjEgPSBmYWxzZTtcbiAgICAgICAgYmFja2VuZENhbGwuY21wRGF0YSgxOCwgdGhpcy5fbmFtZSwgc2NyaXB0VXJsLCBDbXBUeXBlLkRPX05PVF9XQUlULCB0cnVlKTtcbiAgICAgICAgdGhpcy5fY21wID0gbmV3IENNUChub2RlLCBiYWNrZW5kQ2FsbCwgdGhpcyk7XG4gICAgfVxuICAgIGdldCBuYW1lKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fbmFtZTtcbiAgICB9XG4gICAgY29ubmVjdCgpIHtcbiAgICAgICAgdGhpcy5fY21wLmNvbm5lY3QoKTtcbiAgICB9XG4gICAgaGFuZGxlQ21wKCkge1xuICAgICAgICByZXR1cm4gX19hd2FpdGVyKHRoaXMsIHZvaWQgMCwgdm9pZCAwLCBmdW5jdGlvbiogKCkge1xuICAgICAgICAgICAgY29uc3QgZXZpZG9uT3B0aW9ucyA9IFwiYnV0dG9uI19ldmlkb24tb3B0aW9uLWJ1dHRvblwiO1xuICAgICAgICAgICAgbGV0IGV2aWRvbk9wdGlvbnNCdXR0b24gPSB0aGlzLl9jbXAucXVlcnlOb2RlU2VsZWN0b3IoZXZpZG9uT3B0aW9ucyk7XG4gICAgICAgICAgICBjb25zdCBldmlkb25EZWNsaW5lID0gXCJidXR0b24jZXZpZG9uLXByZWZkaWFnLWRlY2xpbmVcIjtcbiAgICAgICAgICAgIGxldCBldmlkb25EZW55QWxsQnV0dG9uID0gdGhpcy5fY21wLnF1ZXJ5Tm9kZVNlbGVjdG9yKGV2aWRvbkRlY2xpbmUpO1xuICAgICAgICAgICAgY29uc3QgZXZpZG9uTDJEZWNsaW5lID0gXCJidXR0b24jZXZpZG9uLWwyLWRlY2xpbmUtYnV0dG9uXCI7XG4gICAgICAgICAgICBsZXQgZXZpZG9uTDJEZWNsaW5lQnV0dG9uID0gdGhpcy5fY21wLnF1ZXJ5Tm9kZVNlbGVjdG9yKGV2aWRvbkwyRGVjbGluZSk7XG4gICAgICAgICAgICBjb25zdCBldmlkb25Db29raWVCYW5uZXJOZXh0ID0gXCJzcGFuI19ldmlkb24tYmFubmVyLWNvb2tpZWJ1dHRvbnRleHRcIjtcbiAgICAgICAgICAgIGxldCBldmlkb25Db29raWVCYW5uZXJOZXh0U3BhbiA9IHRoaXMuX2NtcC5xdWVyeU5vZGVTZWxlY3Rvcihldmlkb25Db29raWVCYW5uZXJOZXh0KTtcbiAgICAgICAgICAgIC8vIHdlIGRvIHJlcXVpcmUgMyBhdHRlbXB0cyB0byBkZWNsaW5lIHRoZSB0cmFja2luZ1xuICAgICAgICAgICAgaWYgKFV0aWxzLm9iamVjdENsaWNrYWJsZShldmlkb25PcHRpb25zQnV0dG9uKSAmJiAhdGhpcy5fdHJpZ2dlcjEpIHtcbiAgICAgICAgICAgICAgICB0aGlzLl90cmlnZ2VyMSA9IHRydWU7XG4gICAgICAgICAgICAgICAgeWllbGQgdGhpcy5zbGVlcCgxMDAwKTtcbiAgICAgICAgICAgICAgICBVdGlscy5sb2coXCJCdXR0b24gMSwgMzAwIG1zIHdhaXRlZC4gVHJpZ2dlciByZWxlYXNlZFwiKTtcbiAgICAgICAgICAgICAgICB0aGlzLl90cmlnZ2VyMSA9IGZhbHNlO1xuICAgICAgICAgICAgICAgIGV2aWRvbk9wdGlvbnNCdXR0b24uY2xpY2soKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIC8vIHdlIGRvIHJlcXVpcmUgMyBhdHRlbXB0cyB0byBkZWNsaW5lIHRoZSB0cmFja2luZ1xuICAgICAgICAgICAgaWYgKFV0aWxzLm9iamVjdENsaWNrYWJsZShldmlkb25Db29raWVCYW5uZXJOZXh0U3BhbikgJiYgIXRoaXMuX3RyaWdnZXIxKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5fdHJpZ2dlcjEgPSB0cnVlO1xuICAgICAgICAgICAgICAgIHlpZWxkIHRoaXMuc2xlZXAoMTAwMCk7XG4gICAgICAgICAgICAgICAgVXRpbHMubG9nKFwiQnV0dG9uIDIsIDMwMCBtcyB3YWl0ZWQuIFRyaWdnZXIgcmVsZWFzZWRcIik7XG4gICAgICAgICAgICAgICAgdGhpcy5fdHJpZ2dlcjEgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICBldmlkb25Db29raWVCYW5uZXJOZXh0U3Bhbi5jbGljaygpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKFV0aWxzLm9iamVjdENsaWNrYWJsZShldmlkb25MMkRlY2xpbmVCdXR0b24pICYmICF0aGlzLl90cmlnZ2VyMSkge1xuICAgICAgICAgICAgICAgIHRoaXMuX3RyaWdnZXIxID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICB5aWVsZCB0aGlzLnNsZWVwKDEwMDApO1xuICAgICAgICAgICAgICAgIFV0aWxzLmxvZyhcIkJ1dHRvbiAzLCAzMDAgbXMgd2FpdGVkLiBUcmlnZ2VyIHJlbGVhc2VkXCIpO1xuICAgICAgICAgICAgICAgIHRoaXMuX3RyaWdnZXIxID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgZXZpZG9uTDJEZWNsaW5lQnV0dG9uLmNsaWNrKCk7XG4gICAgICAgICAgICAgICAgLy8gZXhhbXBsZSBldmlkb24gcGFnZSBoZXJlIHdlIGRvIGhhdmUgYSBkZWZpbmVkIGVuZC5cbiAgICAgICAgICAgICAgICB0aGlzLl9jbXAucmVzZXQoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIC8vIENyb3ducGVhayA9PiBcIm9wdGlvbnNcIiBieSBhY2NpZGVudCBpcyB0aGUgXCJkZWNsaW5lXCIgYnV0dG9uLCBzbyBvcHRpb25zIG9wZW4gLi4uXG4gICAgICAgICAgICBpZiAoVXRpbHMub2JqZWN0Q2xpY2thYmxlKGV2aWRvbkRlbnlBbGxCdXR0b24pICYmICF0aGlzLl90cmlnZ2VyMSkge1xuICAgICAgICAgICAgICAgIHRoaXMuX3RyaWdnZXIxID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICB5aWVsZCB0aGlzLnNsZWVwKDEwMDApO1xuICAgICAgICAgICAgICAgIFV0aWxzLmxvZyhcIkJ1dHRvbiA0LCAzMDAgbXMgd2FpdGVkLiBUcmlnZ2VyIHJlbGVhc2VkXCIpO1xuICAgICAgICAgICAgICAgIHRoaXMuX3RyaWdnZXIxID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgZXZpZG9uRGVueUFsbEJ1dHRvbi5jbGljaygpO1xuICAgICAgICAgICAgICAgIC8vIGV4YW1wbGUgQ3Jvd25wZWFrIGhlcmUgd2UgZG8gaGF2ZSBhIGRlZmluZWQgZW5kLlxuICAgICAgICAgICAgICAgIHRoaXMuX2NtcC5yZXNldCgpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9XG4gICAgc2xlZXAobWlsbGlzZWNvbmRzKSB7XG4gICAgICAgIHJldHVybiBuZXcgUHJvbWlzZShyZXNvbHZlID0+IHNldFRpbWVvdXQocmVzb2x2ZSwgbWlsbGlzZWNvbmRzKSk7XG4gICAgfVxufVxuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5pbXBvcnQgQ01QIGZyb20gXCIuL0NNUFwiO1xuaW1wb3J0IENtcFR5cGUgZnJvbSBcIi4vQ21wVHlwZVwiO1xuZXhwb3J0IGRlZmF1bHQgY2xhc3MgTm90WWV0SW1wbGVtZW50ZWRDbXAge1xuICAgIGNvbnN0cnVjdG9yKGNtcElkLCBub2RlLCBuYW1lLCBzY3JpcHRVcmwsIGJhY2tlbmRDYWxsKSB7XG4gICAgICAgIHRoaXMuX25hbWUgPSBuYW1lO1xuICAgICAgICBiYWNrZW5kQ2FsbC5jbXBEYXRhKGNtcElkLCB0aGlzLl9uYW1lLCBzY3JpcHRVcmwsIENtcFR5cGUuV0FJVF9GT1JfVElNRV9GUkFNRSwgZmFsc2UpO1xuICAgICAgICB0aGlzLl9jbXAgPSBuZXcgQ01QKG5vZGUsIGJhY2tlbmRDYWxsLCB0aGlzKTtcbiAgICB9XG4gICAgZ2V0IG5hbWUoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9uYW1lO1xuICAgIH1cbiAgICBjb25uZWN0KCkge1xuICAgICAgICB0aGlzLl9jbXAuY29ubmVjdCgpO1xuICAgIH1cbiAgICBoYW5kbGVDbXAoKSB7XG4gICAgICAgIHRoaXMuX2NtcC5yZXNldCgpO1xuICAgIH1cbn1cbiIsIlwidXNlIHN0cmljdFwiO1xuaW1wb3J0IFV0aWxzIGZyb20gXCIuLi9VdGlsc1wiO1xuaW1wb3J0IENNUCBmcm9tIFwiLi9DTVBcIjtcbmltcG9ydCBDbXBUeXBlIGZyb20gXCIuL0NtcFR5cGVcIjtcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIE9hdGhDbXAge1xuICAgIGNvbnN0cnVjdG9yKG5vZGUsIHNjcmlwdFVybCwgYmFja2VuZENhbGwpIHtcbiAgICAgICAgdGhpcy5fbmFtZSA9IFwiT2F0aCBMaW1pdGVkXCI7XG4gICAgICAgIGJhY2tlbmRDYWxsLmNtcERhdGEoMTQsIHRoaXMuX25hbWUsIHNjcmlwdFVybCwgQ21wVHlwZS5ET19OT1RfV0FJVCwgdHJ1ZSk7XG4gICAgICAgIHRoaXMuX2NtcCA9IG5ldyBDTVAobm9kZSwgYmFja2VuZENhbGwsIHRoaXMpO1xuICAgIH1cbiAgICBnZXQgbmFtZSgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX25hbWU7XG4gICAgfVxuICAgIGNvbm5lY3QoKSB7XG4gICAgICAgIHRoaXMuX2NtcC5jb25uZWN0KCk7XG4gICAgfVxuICAgIC8qXG4gICAgLSBbdG9tc2hhcmR3YXJlXShodHRwczovL3d3dy50b21zaGFyZHdhcmUuY29tKVxuICAgIC0gW3RlY2hyYWRhcl0oaHR0cHM6Ly9nbG9iYWwudGVjaHJhZGFyLmNvbS9kZS1kZSlcbiAgICAqL1xuICAgIGhhbmRsZUNtcCgpIHtcbiAgICAgICAgY29uc3QgbW9yZUluZm9ybWF0aW9uID0gJyNtYWluTW9yZUluZm8nO1xuICAgICAgICBsZXQgbW9yZUluZm9ybWF0aW9uQnV0dG9uID0gdGhpcy5fY21wLnF1ZXJ5Tm9kZVNlbGVjdG9yKG1vcmVJbmZvcm1hdGlvbik7XG4gICAgICAgIGNvbnN0IHJlamVjdEFsbCA9IFwiYnV0dG9uLmNtcC1idG4tcmVqZWN0YWxsXCI7XG4gICAgICAgIGxldCByZWplY3RBbGxCdXR0b24gPSB0aGlzLl9jbXAucXVlcnlOb2RlU2VsZWN0b3IocmVqZWN0QWxsKTtcbiAgICAgICAgY29uc3QgbGVhdmUgPSBcIiNjb25maXJtTGVhdmVcIjtcbiAgICAgICAgbGV0IGxlYXZlQnV0dG9uID0gdGhpcy5fY21wLnF1ZXJ5Tm9kZVNlbGVjdG9yKGxlYXZlKTtcbiAgICAgICAgaWYgKFV0aWxzLm9iamVjdENsaWNrYWJsZShtb3JlSW5mb3JtYXRpb25CdXR0b24pICYmIHRoaXMuX2NtcC5zdGF0ZSA9PT0gMCkge1xuICAgICAgICAgICAgVXRpbHMubG9nKFwiQnV0dG9uIDEgZm91bmRcIik7XG4gICAgICAgICAgICBtb3JlSW5mb3JtYXRpb25CdXR0b24uY2xpY2soKTtcbiAgICAgICAgICAgIHRoaXMuX2NtcC5zdGF0ZSA9IDE7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAoVXRpbHMub2JqZWN0Q2xpY2thYmxlKHJlamVjdEFsbEJ1dHRvbikgJiYgdGhpcy5fY21wLnN0YXRlID09PSAxKSB7XG4gICAgICAgICAgICBVdGlscy5sb2coXCJCdXR0b24gMiBmb3VuZFwiKTtcbiAgICAgICAgICAgIHJlamVjdEFsbEJ1dHRvbi5jbGljaygpO1xuICAgICAgICAgICAgdGhpcy5fY21wLnN0YXRlID0gMjtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmIChVdGlscy5vYmplY3RDbGlja2FibGUobGVhdmVCdXR0b24pICYmIHRoaXMuX2NtcC5zdGF0ZSA9PT0gMikge1xuICAgICAgICAgICAgVXRpbHMubG9nKFwiQnV0dG9uIDMgZm91bmRcIik7XG4gICAgICAgICAgICBsZWF2ZUJ1dHRvbi5jbGljaygpO1xuICAgICAgICAgICAgdGhpcy5fY21wLnJlc2V0KCk7XG4gICAgICAgIH1cbiAgICB9XG59XG4iLCJcInVzZSBzdHJpY3RcIjtcbmltcG9ydCBVdGlscyBmcm9tIFwiLi4vVXRpbHNcIjtcbmltcG9ydCBDTVAgZnJvbSBcIi4vQ01QXCI7XG5pbXBvcnQgQ21wVHlwZSBmcm9tIFwiLi9DbXBUeXBlXCI7XG5leHBvcnQgZGVmYXVsdCBjbGFzcyBPbmVUcnVzdCB7XG4gICAgY29uc3RydWN0b3Iobm9kZSwgc2NyaXB0VXJsLCBiYWNrZW5kQ2FsbCkge1xuICAgICAgICB0aGlzLl9uYW1lID0gXCJPbmVUcnVzdCBMTENcIjtcbiAgICAgICAgYmFja2VuZENhbGwuY21wRGF0YSgyOCwgdGhpcy5fbmFtZSwgc2NyaXB0VXJsLCBDbXBUeXBlLldBSVRfRk9SX1RJTUVfRlJBTUUsIHRydWUpO1xuICAgICAgICB0aGlzLl9jbXAgPSBuZXcgQ01QKG5vZGUsIGJhY2tlbmRDYWxsLCB0aGlzKTtcbiAgICB9XG4gICAgZ2V0IG5hbWUoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9uYW1lO1xuICAgIH1cbiAgICBjb25uZWN0KCkge1xuICAgICAgICB0aGlzLl9jbXAuY29ubmVjdCgpO1xuICAgIH1cbiAgICBoYW5kbGVDbXAoKSB7XG4gICAgICAgIGNvbnN0IG9wdGFub25EZXRhaWxzU2VsZWN0b3JWMSA9IFwiYnV0dG9uI29uZXRydXN0LXBjLWJ0bi1oYW5kbGVyXCI7XG4gICAgICAgIGxldCBvcHRhbmFuRGV0YWlsc1YxID0gdGhpcy5fY21wLnF1ZXJ5Tm9kZVNlbGVjdG9yKG9wdGFub25EZXRhaWxzU2VsZWN0b3JWMSk7XG4gICAgICAgIGNvbnN0IG9wdGFub25TYXZlU2V0dGluZ3NTZWxlY3RvclYxID0gXCJidXR0b24uc2F2ZS1wcmVmZXJlbmNlLWJ0bi1oYW5kbGVyXCI7XG4gICAgICAgIGxldCBvcHRhbm9uU2F2ZVNldHRpbmdzVjEgPSB0aGlzLl9jbXAucXVlcnlOb2RlU2VsZWN0b3Iob3B0YW5vblNhdmVTZXR0aW5nc1NlbGVjdG9yVjEpO1xuICAgICAgICBjb25zdCBvcHRhbm9uQ2hlY2tCb3hlc1NlbGVjdG9yVjEgPSBcImlucHV0W3R5cGUqPSdjaGVja2JveCddLnN3aXRjaC1jaGVja2JveFwiO1xuICAgICAgICBsZXQgb3B0YW5vbkNoZWNrYm94ZXNWMSA9IHRoaXMuX2NtcC5xdWVyeU5vZGVTZWxlY3RvckFsbChvcHRhbm9uQ2hlY2tCb3hlc1NlbGVjdG9yVjEpO1xuICAgICAgICBjb25zdCBvcHRhbm9uRGV0YWlsc1YyID0gXCJidXR0b24ub3B0YW5vbi10b2dnbGUtZGlzcGxheVwiO1xuICAgICAgICBsZXQgb3B0YW5vbkRldGFpbHNCdXR0b25WMiA9IHRoaXMuX2NtcC5xdWVyeU5vZGVTZWxlY3RvcihvcHRhbm9uRGV0YWlsc1YyKTtcbiAgICAgICAgLy8gdGhpcyBidXR0b24gaXMgY3JhcHB5IHRvIGZpbmQsIGFzIHRoZXJlIGlzIG5vIElEIG9yIGNsYXNzLlxuICAgICAgICBjb25zdCBvcHRhbm9uU2F2ZVNldHRpbmdzU2VsZWN0b3JWMiA9IFwiYnV0dG9uW29uY2xpY2sqPSdTYXZlJ11cIjsgLy9idXR0b24ub3B0YW5vbi1zYXZlLXNldHRpbmdzLWJ1dHRvblxuICAgICAgICBsZXQgb3B0YW5vblNhdmVTZXR0aW5nc1YyID0gdGhpcy5fY21wLnF1ZXJ5Tm9kZVNlbGVjdG9yKG9wdGFub25TYXZlU2V0dGluZ3NTZWxlY3RvclYyKTtcbiAgICAgICAgY29uc3Qgb3B0YW5vbkxpc3RJdGVtc1NlbGVjdG9yVjIgPSBcImxpLm1lbnUtaXRlbS1vblwiO1xuICAgICAgICBsZXQgb3B0YW5vbkxpc3RJdGVtc1YyID0gdGhpcy5fY21wLnF1ZXJ5Tm9kZVNlbGVjdG9yQWxsKG9wdGFub25MaXN0SXRlbXNTZWxlY3RvclYyKTtcbiAgICAgICAgY29uc3Qgb3B0YW5vbkNoZWNrYm94ZXNTZWxlY3RvclYyID0gXCJpbnB1dFt0eXBlKj0nY2hlY2tib3gnXVwiO1xuICAgICAgICBsZXQgb3B0YW5vbkNoZWNrQm94ZXNWMiA9IHRoaXMuX2NtcC5xdWVyeU5vZGVTZWxlY3RvckFsbChvcHRhbm9uQ2hlY2tib3hlc1NlbGVjdG9yVjIpO1xuICAgICAgICAvLyB0aGlzIGJ1dHRvbiBpcyBjcmFwcHkgdG8gZmluZCwgYXMgdGhlcmUgaXMgbm8gSUQgb3IgY2xhc3MuXG4gICAgICAgIGNvbnN0IG9wdGFub25TYXZlU2V0dGluZ3NTZWxlY3RvclYzID0gXCJidXR0b24uc2F2ZS1wcmVmZXJlbmNlLWJ0bi1oYW5kbGVyXCI7IC8vYnV0dG9uLm9wdGFub24tc2F2ZS1zZXR0aW5ncy1idXR0b25cbiAgICAgICAgbGV0IG9wdGFub25TYXZlU2V0dGluZ3NWMyA9IHRoaXMuX2NtcC5xdWVyeU5vZGVTZWxlY3RvcihvcHRhbm9uU2F2ZVNldHRpbmdzU2VsZWN0b3JWMyk7XG4gICAgICAgIGNvbnN0IG9wdGFub25MaXN0SXRlbXNTZWxlY3RvclYzID0gXCJkaXYuY2F0ZWdvcnktbWVudS1zd2l0Y2gtaGFuZGxlclwiO1xuICAgICAgICBsZXQgb3B0YW5vbkxpc3RJdGVtc1YzID0gdGhpcy5fY21wLnF1ZXJ5Tm9kZVNlbGVjdG9yQWxsKG9wdGFub25MaXN0SXRlbXNTZWxlY3RvclYzKTtcbiAgICAgICAgY29uc3Qgb3B0YW5vbk9uZXRydXN0UmVqZWN0QWxsYW5kbGVyID0gXCJidXR0b24jb25ldHJ1c3QtcmVqZWN0LWFsbC1oYW5kbGVyXCI7XG4gICAgICAgIGxldCBvcHRhbm9uT25ldHJ1c3RSZWplY3RBbGxhbmRsZXJCdXR0b24gPSB0aGlzLl9jbXAucXVlcnlOb2RlU2VsZWN0b3Iob3B0YW5vbk9uZXRydXN0UmVqZWN0QWxsYW5kbGVyKTtcbiAgICAgICAgY29uc3Qgb3B0YW5vbkJhbm5lclBvbGljeSA9IFwiYS5iYW5uZXItcG9saWN5LWxpbmtcIjtcbiAgICAgICAgbGV0IG9wdGFub25CYW5uZXJQb2xpY3lMaW5rID0gdGhpcy5fY21wLnF1ZXJ5Tm9kZVNlbGVjdG9yQWxsKG9wdGFub25CYW5uZXJQb2xpY3kpO1xuICAgICAgICAvLyBWYXJpYW50ZSAzIChTaW5nbGUtUHJlc3MgaXMgcHJlZmVyZWQgb3ZlciBvdGhlcnNcbiAgICAgICAgaWYgKFV0aWxzLm9iamVjdENsaWNrYWJsZShvcHRhbm9uT25ldHJ1c3RSZWplY3RBbGxhbmRsZXJCdXR0b24pICYmIHRoaXMuX2NtcC5zdGF0ZSA9PT0gMCkge1xuICAgICAgICAgICAgVXRpbHMubG9nKFwiVjMgKGZpcnN0IGNsaWNrKVwiKTtcbiAgICAgICAgICAgIG9wdGFub25PbmV0cnVzdFJlamVjdEFsbGFuZGxlckJ1dHRvbi5jbGljaygpO1xuICAgICAgICAgICAgVXRpbHMubG9nKFwiUmVqZWN0IGFsbCBjbGlja2VkXCIpO1xuICAgICAgICAgICAgdGhpcy5fY21wLnN0YXRlID0gMTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmIChVdGlscy5vYmplY3RDbGlja2FibGUob3B0YW5vbk9uZXRydXN0UmVqZWN0QWxsYW5kbGVyQnV0dG9uKSAmJiB0aGlzLl9jbXAuc3RhdGUgPT09IDEpIHtcbiAgICAgICAgICAgIFV0aWxzLmxvZyhcIlYzIChzZWNvbmQgY2xpY2spXCIpO1xuICAgICAgICAgICAgb3B0YW5vbk9uZXRydXN0UmVqZWN0QWxsYW5kbGVyQnV0dG9uLmNsaWNrKCk7XG4gICAgICAgICAgICBVdGlscy5sb2coXCJSZWplY3QgYWxsIGNsaWNrZWRcIik7XG4gICAgICAgICAgICB0aGlzLl9jbXAucmVzZXQoKTtcbiAgICAgICAgfVxuICAgICAgICAvLyBWYXJpYW50IDFcbiAgICAgICAgLy8gaHR0cHM6Ly93d3cud2llbmVyemVpdHVuZy5hdC9cbiAgICAgICAgZWxzZSBpZiAoVXRpbHMub2JqZWN0Q2xpY2thYmxlKG9wdGFuYW5EZXRhaWxzVjEpICYmIHRoaXMuX2NtcC5zdGF0ZSA9PT0gMCkge1xuICAgICAgICAgICAgVXRpbHMubG9nKFwiVjFcIik7XG4gICAgICAgICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICBvcHRhbmFuRGV0YWlsc1YxLmNsaWNrKCk7XG4gICAgICAgICAgICB9LCAxMDAwKTtcbiAgICAgICAgICAgIFV0aWxzLmxvZyhcIkRldGFpbHMgY2xpY2tlZCBWMVwiKTtcbiAgICAgICAgICAgIHRoaXMuX2NtcC5zdGF0ZSA9IDE7XG4gICAgICAgIH1cbiAgICAgICAgLy8gaHR0cHM6Ly93d3cub3JhbGIuZGUvZGUtZGVcbiAgICAgICAgZWxzZSBpZiAob3B0YW5vbkJhbm5lclBvbGljeS5sZW5ndGggPiAxICYmIFV0aWxzLm9iamVjdENsaWNrYWJsZShvcHRhbm9uQmFubmVyUG9saWN5TGlua1sxXSkgJiYgdGhpcy5fY21wLnN0YXRlID09PSAwKSB7XG4gICAgICAgICAgICBVdGlscy5sb2coXCJWMS4xXCIpO1xuICAgICAgICAgICAgb3B0YW5vbkJhbm5lclBvbGljeUxpbmtbMV0uY2xpY2soKTtcbiAgICAgICAgICAgIFV0aWxzLmxvZyhcIkRldGFpbHMgY2xpY2tlZCBWMS4xXCIpO1xuICAgICAgICAgICAgdGhpcy5fY21wLnN0YXRlID0gMTtcbiAgICAgICAgfVxuICAgICAgICAvLyBodHRwczovL2Fyc3RlY2huaWNhLmNvbS8sICAgaHR0cHM6Ly93d3cuZ2xhc3Nkb29yLmRlLywgaHR0cHM6Ly9hc21wLmExLm5ldC8sIGh0dHBzOi8vd3d3LnpkbmV0LmNvbS9cbiAgICAgICAgZWxzZSBpZiAoVXRpbHMub2JqZWN0Q2xpY2thYmxlKG9wdGFub25TYXZlU2V0dGluZ3NWMSkgJiYgb3B0YW5vbkNoZWNrYm94ZXNWMS5sZW5ndGggJiYgdGhpcy5fY21wLnN0YXRlID09PSAxKSB7XG4gICAgICAgICAgICBVdGlscy5sb2coXCJBbW91bnQgb2YgQ2hlY2tib3hlcyBWMTogXCIgKyBvcHRhbm9uQ2hlY2tib3hlc1YxLmxlbmd0aCk7XG4gICAgICAgICAgICBvcHRhbm9uQ2hlY2tib3hlc1YxLmZvckVhY2goZnVuY3Rpb24gKGNoZWNrYm94KSB7XG4gICAgICAgICAgICAgICAgY2hlY2tib3guc2V0QXR0cmlidXRlKFwiY2hlY2tlZFwiLCBcImZhbHNlXCIpO1xuICAgICAgICAgICAgICAgIFV0aWxzLmxvZyhcIkNoZWNrYm94IHVuc2V0IFYxXCIpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICBvcHRhbm9uU2F2ZVNldHRpbmdzVjEuY2xpY2soKTtcbiAgICAgICAgICAgIH0sIDEwMDApO1xuICAgICAgICAgICAgVXRpbHMubG9nKFwiU2F2ZSBTZXR0aW5ncyBDbGlja2VkIGNsaWNrIFYxXCIpO1xuICAgICAgICAgICAgLy8gdGhpcy5fY21wLnN0YXRlID0gMjtcbiAgICAgICAgICAgIHRoaXMuX2NtcC5yZXNldCgpO1xuICAgICAgICB9XG4gICAgICAgIC8vIGh0dHBzOi8vZGUuY291cnNlcmEub3JnLywgIGh0dHBzOi8vd3d3LmhvbWUyNC5kZS8sIGh0dHBzOi8vd3d3LnRob3VnaHR3b3Jrcy5jb20vLCBodHRwczovL2pvYnMubmV0ZmxpeC5jb20vXG4gICAgICAgIGVsc2UgaWYgKFV0aWxzLm9iamVjdENsaWNrYWJsZShvcHRhbm9uU2F2ZVNldHRpbmdzVjMpICYmIHRoaXMuX2NtcC5zdGF0ZSA9PT0gMSkge1xuICAgICAgICAgICAgVXRpbHMubG9nKFwiU2F2ZSBCdXR0b24gVjMgZm91bmRcIik7XG4gICAgICAgICAgICBvcHRhbm9uTGlzdEl0ZW1zVjMuZm9yRWFjaChmdW5jdGlvbiAobGlzdEl0ZW0pIHtcbiAgICAgICAgICAgICAgICBsaXN0SXRlbS5jbGljaygpO1xuICAgICAgICAgICAgICAgIFV0aWxzLmxvZyhcIkNoZWNrYm94IHVuc2V0IFYzXCIpO1xuICAgICAgICAgICAgICAgIG9wdGFub25DaGVja0JveGVzVjIuZm9yRWFjaChmdW5jdGlvbiAoY2hlY2tib3gpIHtcbiAgICAgICAgICAgICAgICAgICAgY2hlY2tib3guc2V0QXR0cmlidXRlKFwiY2hlY2tlZFwiLCBcImZhbHNlXCIpO1xuICAgICAgICAgICAgICAgICAgICBVdGlscy5sb2coXCJDaGVja2JveCB1bnNldCBWM1wiKTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgb3B0YW5vblNhdmVTZXR0aW5nc1YzLmNsaWNrKCk7XG4gICAgICAgICAgICB0aGlzLl9jbXAucmVzZXQoKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmIChVdGlscy5vYmplY3RDbGlja2FibGUob3B0YW5vbk9uZXRydXN0UmVqZWN0QWxsYW5kbGVyQnV0dG9uKSAmJiB0aGlzLl9jbXAuc3RhdGUgPT09IDIpIHtcbiAgICAgICAgICAgIFV0aWxzLmxvZyhcIlYxIChzZWNvbmQgY2xpY2spXCIpO1xuICAgICAgICAgICAgb3B0YW5vbk9uZXRydXN0UmVqZWN0QWxsYW5kbGVyQnV0dG9uLmNsaWNrKCk7XG4gICAgICAgICAgICBVdGlscy5sb2coXCJSZWplY3QgYWxsIGNsaWNrZWRcIik7XG4gICAgICAgICAgICB0aGlzLl9jbXAucmVzZXQoKTtcbiAgICAgICAgfVxuICAgICAgICAvLyBWYXJpYW50IDJcbiAgICAgICAgLy8gaHR0cHM6Ly93d3cubW9uYS5ubC8sIGh0dHBzOi8vd3d3LmFsbGlhbnouZGUvLCBodHRwczovL3d3dy5zcHJpbmdlci5jb20vZ3AsIGh0dHBzOi8vd3d3LmhhZ2xvZnMuY29tL2RlL2RlLWRlLywgaHR0cHM6Ly93d3cudGhlc2F1cnVzLmNvbS8sIGh0dHBzOi8vd3d3LmF0bGFzc2lhbi5jb20vZGUvYWdpbGUvYWdpbGUtYXQtc2NhbGUvb2tyXG4gICAgICAgIGVsc2UgaWYgKFV0aWxzLm9iamVjdENsaWNrYWJsZShvcHRhbm9uRGV0YWlsc0J1dHRvblYyKSAmJiB0aGlzLl9jbXAuc3RhdGUgPT09IDApIHtcbiAgICAgICAgICAgIFV0aWxzLmxvZyhcIlYyXCIpO1xuICAgICAgICAgICAgb3B0YW5vbkRldGFpbHNCdXR0b25WMi5jbGljaygpO1xuICAgICAgICAgICAgVXRpbHMubG9nKFwiRGV0YWlscyBjbGlja2VkXCIpO1xuICAgICAgICAgICAgdGhpcy5fY21wLnN0YXRlID0gMztcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmIChVdGlscy5vYmplY3RDbGlja2FibGUob3B0YW5vblNhdmVTZXR0aW5nc1YyKSAmJiB0aGlzLl9jbXAuc3RhdGUgPT09IDMpIHtcbiAgICAgICAgICAgIFV0aWxzLmxvZyhcIlNhdmUgQnV0dG9uIFYyIGZvdW5kXCIpO1xuICAgICAgICAgICAgb3B0YW5vbkxpc3RJdGVtc1YyLmZvckVhY2goZnVuY3Rpb24gKGxpc3RJdGVtKSB7XG4gICAgICAgICAgICAgICAgbGlzdEl0ZW0uY2xpY2soKTtcbiAgICAgICAgICAgICAgICBVdGlscy5sb2coXCJDaGVja2JveCB1bnNldCBWMlwiKTtcbiAgICAgICAgICAgICAgICBvcHRhbm9uQ2hlY2tCb3hlc1YyLmZvckVhY2goZnVuY3Rpb24gKGNoZWNrYm94KSB7XG4gICAgICAgICAgICAgICAgICAgIGNoZWNrYm94LnNldEF0dHJpYnV0ZShcImNoZWNrZWRcIiwgXCJmYWxzZVwiKTtcbiAgICAgICAgICAgICAgICAgICAgVXRpbHMubG9nKFwiQ2hlY2tib3ggdW5zZXQgVjJcIik7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIG9wdGFub25TYXZlU2V0dGluZ3NWMi5jbGljaygpO1xuICAgICAgICAgICAgdGhpcy5fY21wLnJlc2V0KCk7XG4gICAgICAgIH1cbiAgICB9XG59XG4iLCJcInVzZSBzdHJpY3RcIjtcbmltcG9ydCBVdGlscyBmcm9tIFwiLi4vVXRpbHNcIjtcbmltcG9ydCBDTVAgZnJvbSBcIi4vQ01QXCI7XG5pbXBvcnQgQ21wVHlwZSBmcm9tIFwiLi9DbXBUeXBlXCI7XG5leHBvcnQgZGVmYXVsdCBjbGFzcyBRdWFudENhc3Qge1xuICAgIGNvbnN0cnVjdG9yKG5vZGUsIHNjcmlwdFVybCwgYmFja2VuZENhbGwpIHtcbiAgICAgICAgdGhpcy5fbmFtZSA9IFwiUXVhbnRjYXN0IEludGVybmF0aW9uYWwgTGltaXRlZFwiO1xuICAgICAgICBiYWNrZW5kQ2FsbC5jbXBEYXRhKDEwLCB0aGlzLl9uYW1lLCBzY3JpcHRVcmwsIENtcFR5cGUuV0FJVF9GT1JfQVNZTkNfQ0FMTEJBQ0ssIHRydWUpO1xuICAgICAgICB0aGlzLl9jbXAgPSBuZXcgQ01QKG5vZGUsIGJhY2tlbmRDYWxsLCB0aGlzKTtcbiAgICB9XG4gICAgZ2V0IG5hbWUoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9uYW1lO1xuICAgIH1cbiAgICBjb25uZWN0KCkge1xuICAgICAgICB0aGlzLl9jbXAuY29ubmVjdCgpO1xuICAgIH1cbiAgICAvKlxuICAgICAgICBodHRwczovL3d3ZC5jb20vXG4gICAgICAgIGh0dHBzOi8vd3d3LnF1YW50Y2FzdC5jb20vID0+IFRPRE9cbiAgICAgKi9cbiAgICBoYW5kbGVDbXAoKSB7XG4gICAgICAgIGNvbnN0IHB1cnBvc2UgPSBcImEjcWMtY21wLXB1cnBvc2UtYnV0dG9uXCI7XG4gICAgICAgIGxldCBwdXJwb3NlQnV0dG9uID0gdGhpcy5fY21wLnF1ZXJ5Tm9kZVNlbGVjdG9yKHB1cnBvc2UpO1xuICAgICAgICBjb25zdCBkZW55QWxsID0gXCJidXR0b24ucWMtY21wLWVuYWJsZS1idXR0b25cIjtcbiAgICAgICAgbGV0IGRlbnlBbGxCdXR0b24gPSB0aGlzLl9jbXAucXVlcnlOb2RlU2VsZWN0b3IoZGVueUFsbCk7XG4gICAgICAgIGNvbnN0IHNhdmUgPSBcImJ1dHRvbi5xYy1jbXAtc2F2ZS1hbmQtZXhpdFwiO1xuICAgICAgICBsZXQgc2F2ZUJ1dHRvbiA9IHRoaXMuX2NtcC5xdWVyeU5vZGVTZWxlY3RvcihzYXZlKTtcbiAgICAgICAgY29uc3QgcmVqZWN0QWxsID0gXCJidXR0b24ucWMtY21wLXNlY29uZGFyeS1idXR0b25cIjtcbiAgICAgICAgbGV0IHJlamVjdEFsbEJ1dHRvbiA9IHRoaXMuX2NtcC5xdWVyeU5vZGVTZWxlY3RvcihyZWplY3RBbGwpO1xuICAgICAgICAvLyBwcmVzcyBvbiBcIk9wdGlvbnNcIlxuICAgICAgICBpZiAoVXRpbHMub2JqZWN0Q2xpY2thYmxlKHB1cnBvc2VCdXR0b24pICYmIHRoaXMuX2NtcC5zdGF0ZSA9PT0gMCkge1xuICAgICAgICAgICAgdGhpcy5fY21wLnN0YXRlID0gMTtcbiAgICAgICAgICAgIHB1cnBvc2VCdXR0b24uY2xpY2soKTtcbiAgICAgICAgfVxuICAgICAgICAvLyBkaXNhYmxlIGFsbFxuICAgICAgICBlbHNlIGlmIChVdGlscy5vYmplY3RDbGlja2FibGUoZGVueUFsbEJ1dHRvbikgJiYgdGhpcy5fY21wLnN0YXRlID09PSAxKSB7XG4gICAgICAgICAgICB0aGlzLl9jbXAuc3RhdGUgPSAyO1xuICAgICAgICAgICAgZGVueUFsbEJ1dHRvbi5jbGljaygpO1xuICAgICAgICB9XG4gICAgICAgIC8vIHNhdmUgc2V0dGluZ3NcbiAgICAgICAgZWxzZSBpZiAoVXRpbHMub2JqZWN0Q2xpY2thYmxlKHNhdmVCdXR0b24pICYmIHRoaXMuX2NtcC5zdGF0ZSA9PT0gMikge1xuICAgICAgICAgICAgc2F2ZUJ1dHRvbi5jbGljaygpO1xuICAgICAgICAgICAgdGhpcy5fY21wLnJlc2V0KCk7XG4gICAgICAgIH1cbiAgICAgICAgLy8gc2VwYXJhdGVkIEJyYW5jaCwgaWYgdGhlcmUgaXMgXCJSZWplY3QtQWxsIEJ1dHRvblwiXG4gICAgICAgIGVsc2UgaWYgKFV0aWxzLm9iamVjdENsaWNrYWJsZShyZWplY3RBbGxCdXR0b24pICYmIHRoaXMuX2NtcC5zdGF0ZSA9PT0gMCkge1xuICAgICAgICAgICAgcmVqZWN0QWxsQnV0dG9uLmNsaWNrKCk7XG4gICAgICAgICAgICB0aGlzLl9jbXAucmVzZXQoKTtcbiAgICAgICAgfVxuICAgIH1cbn1cbiIsIlwidXNlIHN0cmljdFwiO1xuaW1wb3J0IFV0aWxzIGZyb20gXCIuLi9VdGlsc1wiO1xuaW1wb3J0IENNUCBmcm9tIFwiLi9DTVBcIjtcbmltcG9ydCBDbXBUeXBlIGZyb20gXCIuL0NtcFR5cGVcIjtcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFNvdXJjZVBvaW50IHtcbiAgICBjb25zdHJ1Y3Rvcihub2RlLCBzY3JpcHRVcmwsIGJhY2tlbmRDYWxsKSB7XG4gICAgICAgIHRoaXMuX25hbWUgPSBcIlNvdXJjZXBvaW50IFRlY2hub2xvZ2llcywgSW5jLlwiO1xuICAgICAgICB0aGlzLl9maXJzdFN0ZXBDb21wbGV0ZWQgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5fc2Vjb25kU3RlcENvbXBsZXRlZCA9IGZhbHNlO1xuICAgICAgICBiYWNrZW5kQ2FsbC5jbXBEYXRhKDYsIHRoaXMuX25hbWUsIHNjcmlwdFVybCwgQ21wVHlwZS5ET19OT1RfV0FJVCwgdHJ1ZSk7XG4gICAgICAgIHRoaXMuX2NtcCA9IG5ldyBDTVAobm9kZSwgYmFja2VuZENhbGwsIHRoaXMpO1xuICAgIH1cbiAgICBnZXQgbmFtZSgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX25hbWU7XG4gICAgfVxuICAgIGNvbm5lY3QoKSB7XG4gICAgICAgIHRoaXMuX2NtcC5jb25uZWN0KCk7XG4gICAgfVxuICAgIC8vIFNhbXBsZTogaHR0cHM6Ly93d3cuc3Rvcm5vd2F5Z2F6ZXR0ZS5jby51ay8sIGh0dHBzOi8vd3d3LnRoZXRpbWVzLmNvLnVrLywgaHR0cHM6Ly93d3cuZHVkZW4uZGUvXG4gICAgLy8gaHR0cHM6Ly9ub3RpY2Uuc3AtcHJvZC5uZXQvP21lc3NhZ2VfaWQ9MTE2NDY1JmFtcDttbXNfb3JpZ2luPWh0dHBzOi8vY21wLnN0b3Jub3dheWdhemV0dGUuY28udWsvbW1zL3YyJTIyJTIwaWQ9JTIyc3BfbWVzc2FnZV9pZnJhbWVfMTE2NDY1XG4gICAgLy8gaHR0cHM6Ly9ub3RpY2Uuc3AtcHJvZC5uZXQvP21lc3NhZ2VfaWQ9MTAxMTc1JmFtcDttbXNfb3JpZ2luPWh0dHBzOi8vY21wLnRoZXRpbWVzLmNvLnVrL21tcy92MiUyMiUyMGlkPSUyMnNwX21lc3NhZ2VfaWZyYW1lXzEwMTE3NVxuICAgIC8vIGh0dHBzOi8vd3d3Lm9wZW50aGVzYXVydXMuZGUvID0+IG5vdCB3b3JraW5nLlxuICAgIGhhbmRsZUNtcCgpIHtcbiAgICAgICAgLy8gVGhpcyBpcyB0aGUgZmlyc3QgSWZyYW1lLCB3ZSBuZWVkIHRvIGhhbmRsZS4gSGVyZSB3ZSBjbGljayBvbiBkZXRhaWxzLlxuICAgICAgICAvLyBmb3Igc29tZSByZWFzb24gdGhlIE9ic2VydmVyIGRvZXMgbm90IGRldGVjdCB0aGUgY2hhbmdlcy5cbiAgICAgICAgaWYgKGRvY3VtZW50LmxvY2F0aW9uLnRvU3RyaW5nKCkuaW5jbHVkZXMoXCJzcC1wcm9kLm5ldFwiKSAmJiAhdGhpcy5fZmlyc3RTdGVwQ29tcGxldGVkKSB7XG4gICAgICAgICAgICBVdGlscy5sb2coXCJpbiAxc3QgSUZyYW1lXCIpO1xuICAgICAgICAgICAgbGV0IF9zZWxmID0gdGhpcztcbiAgICAgICAgICAgIGxldCBfY291bnRlciA9IDA7XG4gICAgICAgICAgICB0aGlzLl9maXJzdFRpbWVvdXQgPSBzZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICBfc2VsZi5maXJzdEJ1dHRvbihfc2VsZiwgX2NvdW50ZXIpO1xuICAgICAgICAgICAgfSwgMTAwMCk7XG4gICAgICAgIH1cbiAgICAgICAgLy8gVGhpcyBpcyB0aGUgU2Vjb25kIElmcmFtZSwgd2UgbmVlZCB0byBoYW5kbGUuIEhlcmUgd2UgdW5jaGVjayBhbGwgdGhlIGNoZWNrYm94ZXMgYW5kIHNhdmUuXG4gICAgICAgIC8vIGZvciBzb21lIHJlYXNvbiB0aGUgT2JzZXJ2ZXIgZG9lcyBub3QgZGV0ZWN0IHRoZSBjaGFuZ2VzLlxuICAgICAgICBpZiAoZG9jdW1lbnQubG9jYXRpb24udG9TdHJpbmcoKS5pbmNsdWRlcyhcInNvdXJjZXBvaW50Lm1nci5jb25zZW5zdS5vcmdcIikgJiYgIXRoaXMuX3NlY29uZFN0ZXBDb21wbGV0ZWQpIHtcbiAgICAgICAgICAgIFV0aWxzLmxvZyhcImluIDJuZCBJRnJhbWVcIik7XG4gICAgICAgICAgICBsZXQgX3NlbGYgPSB0aGlzO1xuICAgICAgICAgICAgbGV0IF9jb3VudGVyID0gMDtcbiAgICAgICAgICAgIHRoaXMuX3NlY29uZFRpbWVvdXQgPSBzZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICBfc2VsZi5zZWNvbmRCdXR0b24oX3NlbGYsIF9jb3VudGVyKTtcbiAgICAgICAgICAgIH0sIDEwMDApO1xuICAgICAgICB9XG4gICAgfVxuICAgIGZpcnN0QnV0dG9uKF9zZWxmLCBfY291bnRlcikge1xuICAgICAgICBjb25zdCBhbGxwb3B1cCA9IFwiYnV0dG9uLm1lc3NhZ2UtYnV0dG9uXCI7XG4gICAgICAgIGxldCBhbGxwb3B1cEJ1dHRvbnMgPSBfc2VsZi5fY21wLnF1ZXJ5Tm9kZVNlbGVjdG9yQWxsKGFsbHBvcHVwKTtcbiAgICAgICAgLy8gcHJlc3Mgb24gXCJPcHRpb25zXCJcbiAgICAgICAgaWYgKFV0aWxzLm9iamVjdENsaWNrYWJsZShhbGxwb3B1cEJ1dHRvbnNbMF0pICYmIGFsbHBvcHVwQnV0dG9ucy5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICBVdGlscy5sb2coXCJEZXRhaWxzIGNsaWNrZWQuXCIpO1xuICAgICAgICAgICAgX2NvdW50ZXIgPSA1MTtcbiAgICAgICAgICAgIF9zZWxmLl9maXJzdFN0ZXBDb21wbGV0ZWQgPSB0cnVlO1xuICAgICAgICAgICAgY2xlYXJUaW1lb3V0KF9zZWxmLl9maXJzdFRpbWVvdXQpO1xuICAgICAgICAgICAgYWxscG9wdXBCdXR0b25zWzBdLmNsaWNrKCk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAoX2NvdW50ZXIgPCA1MCkge1xuICAgICAgICAgICAgX3NlbGYuX2ZpcnN0VGltZW91dCA9IHNldFRpbWVvdXQoZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIF9zZWxmLnNlY29uZEJ1dHRvbihfc2VsZiwgX2NvdW50ZXIpO1xuICAgICAgICAgICAgfSwgMTAwMCk7XG4gICAgICAgICAgICBfY291bnRlcisrO1xuICAgICAgICAgICAgVXRpbHMubG9nKFwiQ291bnRlcjogKDFzdCBCdXR0b24pXCIgKyBfY291bnRlcik7XG4gICAgICAgIH1cbiAgICB9XG4gICAgc2Vjb25kQnV0dG9uKF9zZWxmLCBfY291bnRlcikge1xuICAgICAgICBjb25zdCBzd2l0Y2hlc0FsbCA9IFwiZGl2LnNwLXN3aXRjaC1hcnJvdy1ibG9ja1wiO1xuICAgICAgICBsZXQgc3dpdGNoZXNBbGxEaXYgPSBfc2VsZi5fY21wLnF1ZXJ5Tm9kZVNlbGVjdG9yQWxsKHN3aXRjaGVzQWxsKTtcbiAgICAgICAgVXRpbHMubG9nKFwiQWxsIHN3aXRjaGVzQWxsOiBcIiArIHN3aXRjaGVzQWxsRGl2Lmxlbmd0aCk7XG4gICAgICAgIGNvbnN0IHN3aXRjaGVzT24gPSBcImRpdi5zcC1zd2l0Y2gtYXJyb3ctYmxvY2sgYS5vblwiO1xuICAgICAgICBsZXQgc3dpdGNoZXNPbkRpdiA9IF9zZWxmLl9jbXAucXVlcnlOb2RlU2VsZWN0b3JBbGwoc3dpdGNoZXNPbik7XG4gICAgICAgIFV0aWxzLmxvZyhcIk9uIHN3aXRjaGVzQWxsOiBcIiArIHN3aXRjaGVzT25EaXYubGVuZ3RoKTtcbiAgICAgICAgY29uc3Qgc2F2ZSA9IFwiYnV0dG9uLnByaXYtc2F2ZS1idG5cIjtcbiAgICAgICAgbGV0IHNhdmVCdXR0b24gPSBfc2VsZi5fY21wLnF1ZXJ5Tm9kZVNlbGVjdG9yKHNhdmUpO1xuICAgICAgICBVdGlscy5sb2coXCJTYXZlIEJ1dHRvbjogXCIgKyBzYXZlQnV0dG9uKTtcbiAgICAgICAgY29uc3Qgc2F2ZTIgPSBcImJ1dHRvbiN0YWItc2F2ZWFuZGV4aXRcIjtcbiAgICAgICAgbGV0IHNhdmVCdXR0b24yID0gX3NlbGYuX2NtcC5xdWVyeU5vZGVTZWxlY3RvcihzYXZlMik7XG4gICAgICAgIFV0aWxzLmxvZyhcIlNhdmUyIEJ1dHRvbjogXCIgKyBzYXZlQnV0dG9uMik7XG4gICAgICAgIC8vIGlmIHRoZXJlIGlzIGF0IGxlYXN0IG9uZSBzd2l0Y2ggYW5kIGlmIHRoZXJlIGlzIGF0IGxlYXN0IG9uIHN3aXRjaCBcIk9OXCJcbiAgICAgICAgaWYgKHN3aXRjaGVzQWxsRGl2Lmxlbmd0aCA+IDAgJiYgKFV0aWxzLm9iamVjdENsaWNrYWJsZShzYXZlQnV0dG9uKSB8fCBVdGlscy5vYmplY3RDbGlja2FibGUoc2F2ZUJ1dHRvbjIpKSkge1xuICAgICAgICAgICAgLy8gaWYgdGhlcmUgYXMgc3dpdGNoZXMgdG8gc3dpdGNoIG9mZiwgZG8gc28uXG4gICAgICAgICAgICBpZiAoc3dpdGNoZXNPbkRpdi5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICAgICAgc3dpdGNoZXNPbkRpdi5mb3JFYWNoKChocmVmKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIFV0aWxzLmxvZyhcIkNoYW5naW5nIEJ1dHRvbiBmcm9tIE9OIHRvIE9mZlwiKTtcbiAgICAgICAgICAgICAgICAgICAgaHJlZi5jbGljaygpO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgLy8gbm93IGNvbmZpcm0uXG4gICAgICAgICAgICBpZiAoVXRpbHMub2JqZWN0Q2xpY2thYmxlKHNhdmVCdXR0b24pKSB7XG4gICAgICAgICAgICAgICAgc2F2ZUJ1dHRvbi5jbGljaygpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgc2F2ZUJ1dHRvbjIuY2xpY2soKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIF9jb3VudGVyID0gNTE7XG4gICAgICAgICAgICBfc2VsZi5fc2Vjb25kU3RlcENvbXBsZXRlZCA9IHRydWU7XG4gICAgICAgICAgICBjbGVhclRpbWVvdXQoX3NlbGYuX3NlY29uZFRpbWVvdXQpO1xuICAgICAgICAgICAgX3NlbGYuX2NtcC5yZXNldCgpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKF9jb3VudGVyIDwgNTApIHtcbiAgICAgICAgICAgIF9zZWxmLl9zZWNvbmRUaW1lb3V0ID0gc2V0VGltZW91dChmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgX3NlbGYuc2Vjb25kQnV0dG9uKF9zZWxmLCBfY291bnRlcik7XG4gICAgICAgICAgICB9LCAxMDAwKTtcbiAgICAgICAgICAgIF9jb3VudGVyKys7XG4gICAgICAgICAgICBVdGlscy5sb2coXCJDb3VudGVyICgybmQgQnV0dG9uKTogXCIgKyBfY291bnRlcik7XG4gICAgICAgIH1cbiAgICB9XG59XG4iLCJcInVzZSBzdHJpY3RcIjtcbmltcG9ydCBVdGlscyBmcm9tIFwiLi4vVXRpbHNcIjtcbmltcG9ydCBDTVAgZnJvbSBcIi4vQ01QXCI7XG5pbXBvcnQgQ21wVHlwZSBmcm9tIFwiLi9DbXBUeXBlXCI7XG5leHBvcnQgZGVmYXVsdCBjbGFzcyBUcmFmZmVjdGl2ZSB7XG4gICAgY29uc3RydWN0b3Iobm9kZSwgc2NyaXB0VXJsLCBiYWNrZW5kQ2FsbCkge1xuICAgICAgICB0aGlzLl9uYW1lID0gXCJUcmFmZmVjdGl2ZSBHbWJIXCI7XG4gICAgICAgIGJhY2tlbmRDYWxsLmNtcERhdGEoMjEsIHRoaXMuX25hbWUsIHNjcmlwdFVybCwgQ21wVHlwZS5XQUlUX0ZPUl9BU1lOQ19DQUxMQkFDSywgdHJ1ZSk7XG4gICAgICAgIHRoaXMuX2NtcCA9IG5ldyBDTVAobm9kZSwgYmFja2VuZENhbGwsIHRoaXMpO1xuICAgIH1cbiAgICBnZXQgbmFtZSgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX25hbWU7XG4gICAgfVxuICAgIGNvbm5lY3QoKSB7XG4gICAgICAgIHRoaXMuX2NtcC5jb25uZWN0KCk7XG4gICAgfVxuICAgIC8vIGh0dHBzOi8vd3d3Lm1hY3RlY2huZXdzLmRlL1xuICAgIGhhbmRsZUNtcCgpIHtcbiAgICAgICAgY29uc3QgZ2RwckRpdiA9ICdkaXYuZ2Rwcl9wb3B1cF9wb3B1cCc7XG4gICAgICAgIGxldCBwb3B1cCA9IHRoaXMuX2NtcC5xdWVyeU5vZGVTZWxlY3RvcihnZHByRGl2KTtcbiAgICAgICAgY29uc3QgZ2RwckNoZWNrQm94ZXMgPSAnaW5wdXRbdHlwZT1jaGVja2JveF0uZ2Rwcl9zd2l0Y2hfbmF0aXZlJztcbiAgICAgICAgbGV0IGNoZWNrYm94ZXMgPSB0aGlzLl9jbXAucXVlcnlOb2RlU2VsZWN0b3JBbGwoZ2RwckNoZWNrQm94ZXMpO1xuICAgICAgICBjb25zdCBnZHByU2F2ZUJ1dHRvbiA9ICdkaXYuaXMtcHJpbWFyeS1idXR0b24nO1xuICAgICAgICBsZXQgc2F2ZUJ1dHRvbiA9IHRoaXMuX2NtcC5xdWVyeU5vZGVTZWxlY3RvcihnZHByU2F2ZUJ1dHRvbik7XG4gICAgICAgIGlmIChVdGlscy5vYmplY3RWaXNpYmxlKHBvcHVwKSAmJiB0aGlzLl9jbXAuc3RhdGUgPT09IDApIHtcbiAgICAgICAgICAgIFV0aWxzLmxvZygnQ2hlY2tib3hlcyBmb3VuZDogJyArIGNoZWNrYm94ZXMubGVuZ3RoKTtcbiAgICAgICAgICAgIGNoZWNrYm94ZXMuZm9yRWFjaCgoY2hlY2tib3gpID0+IGNoZWNrYm94LnNldEF0dHJpYnV0ZShcImNoZWNrZWRcIiwgXCJmYWxzZVwiKSwgVXRpbHMubG9nKFwiQ2hlY2tib3ggdW5zZXRcIikpO1xuICAgICAgICAgICAgdGhpcy5fY21wLnN0YXRlID0gMTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmIChVdGlscy5vYmplY3RDbGlja2FibGUoc2F2ZUJ1dHRvbikgJiYgdGhpcy5fY21wLnN0YXRlID09PSAxKSB7XG4gICAgICAgICAgICBVdGlscy5sb2coJ0J1dHRvbiBmb3VuZCAuLi4nKTtcbiAgICAgICAgICAgIHNhdmVCdXR0b24uY2xpY2soKTtcbiAgICAgICAgICAgIHRoaXMuX2NtcC5yZXNldCgpO1xuICAgICAgICB9XG4gICAgfVxufVxuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5pbXBvcnQgVXRpbHMgZnJvbSBcIi4uL1V0aWxzXCI7XG5pbXBvcnQgQ01QIGZyb20gXCIuL0NNUFwiO1xuaW1wb3J0IENtcFR5cGUgZnJvbSBcIi4vQ21wVHlwZVwiO1xuZXhwb3J0IGRlZmF1bHQgY2xhc3MgVHJ1c3RBcmNCYW5uZXIge1xuICAgIGNvbnN0cnVjdG9yKG5vZGUsIHNjcmlwdFVybCwgYmFja2VuZENhbGwpIHtcbiAgICAgICAgdGhpcy5fbmFtZSA9IFwiVHJ1c3RBcmMgSW5jIChCYW5uZXIpXCI7XG4gICAgICAgIGJhY2tlbmRDYWxsLmNtcERhdGEoNDEsIHRoaXMuX25hbWUsIHNjcmlwdFVybCwgQ21wVHlwZS5ET19OT1RfV0FJVCwgdHJ1ZSk7XG4gICAgICAgIHRoaXMuX2NtcCA9IG5ldyBDTVAobm9kZSwgYmFja2VuZENhbGwsIHRoaXMpO1xuICAgIH1cbiAgICBnZXQgbmFtZSgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX25hbWU7XG4gICAgfVxuICAgIGNvbm5lY3QoKSB7XG4gICAgICAgIHRoaXMuX2NtcC5jb25uZWN0KCk7XG4gICAgfVxuICAgIGhhbmRsZUNtcCgpIHtcbiAgICAgICAgY29uc3QgY29udGVudCA9IFwiI3RydXN0ZS1jb25zZW50LWNvbnRlbnQsIC50cnVzdGUtY29uc2VudC1jb250ZW50XCI7XG4gICAgICAgIGxldCBjb250ZW50RGl2ID0gdGhpcy5fY21wLnF1ZXJ5Tm9kZVNlbGVjdG9yKGNvbnRlbnQpO1xuICAgICAgICBjb25zdCByZXF1aXJlZCA9IFwiI3RydXN0ZS1zaG93LWNvbnNlbnRcIjtcbiAgICAgICAgbGV0IHJlcXVpcmVkQnV0dG9uID0gdGhpcy5fY21wLnF1ZXJ5Tm9kZVNlbGVjdG9yKHJlcXVpcmVkKTtcbiAgICAgICAgVXRpbHMubG9nKFwiZGV0YWlsczogXCIgKyByZXF1aXJlZEJ1dHRvbik7XG4gICAgICAgIFV0aWxzLmxvZyhcIlN0YXRlOiBcIiArIHRoaXMuX2NtcC5zdGF0ZSk7XG4gICAgICAgIGlmIChVdGlscy5vYmplY3RDbGlja2FibGUocmVxdWlyZWRCdXR0b24pICYmIFV0aWxzLm9iamVjdENsaWNrYWJsZShjb250ZW50RGl2KSAmJiB0aGlzLl9jbXAuc3RhdGUgPT09IDApIHtcbiAgICAgICAgICAgIFV0aWxzLmxvZyhcImRldGFpbHNCdXR0b24gY2xpY2tlZFwiKTtcbiAgICAgICAgICAgIHRoaXMuZGVsYXllZENsaWNrKDApO1xuICAgICAgICAgICAgdGhpcy5fY21wLnN0YXRlID0gMTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBkZWxheWVkQ2xpY2soY291bnQpIHtcbiAgICAgICAgY29uc3QgcmVxdWlyZWQgPSBcIiN0cnVzdGUtc2hvdy1jb25zZW50XCI7XG4gICAgICAgIGxldCByZXF1aXJlZEJ1dHRvbiA9IHRoaXMuX2NtcC5xdWVyeU5vZGVTZWxlY3RvcihyZXF1aXJlZCk7XG4gICAgICAgIHJlcXVpcmVkQnV0dG9uLmNsaWNrKCk7XG4gICAgICAgIFV0aWxzLmxvZyhcIkN1cnJlbnQgQ291bnQ6XCIgKyBjb3VudCk7XG4gICAgICAgIGlmIChjb3VudCA8IDEpIHtcbiAgICAgICAgICAgIGxldCBfc2VsZiA9IHRoaXM7XG4gICAgICAgICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICBfc2VsZi5kZWxheWVkQ2xpY2soY291bnQgKyAxKTtcbiAgICAgICAgICAgICAgICBVdGlscy5sb2coXCJDbGlja2VkXCIpO1xuICAgICAgICAgICAgfSwgMTAwMCk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICBVdGlscy5sb2coXCJtYXhpbXVtIHJlYWNoZWRcIik7XG4gICAgICAgICAgICB0aGlzLl9jbXAucmVzZXQoKTtcbiAgICAgICAgfVxuICAgIH1cbn1cbiIsIlwidXNlIHN0cmljdFwiO1xuaW1wb3J0IFV0aWxzIGZyb20gXCIuLi9VdGlsc1wiO1xuaW1wb3J0IENNUCBmcm9tIFwiLi9DTVBcIjtcbmltcG9ydCBDbXBUeXBlIGZyb20gXCIuL0NtcFR5cGVcIjtcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFRydXN0QXJjSUZyYW1lIHtcbiAgICBjb25zdHJ1Y3Rvcihub2RlLCBzY3JpcHRVcmwsIGJhY2tlbmRDYWxsKSB7XG4gICAgICAgIHRoaXMuX25hbWUgPSBcIlRydXN0QXJjIEluYyAoSUZyYW1lKVwiO1xuICAgICAgICBiYWNrZW5kQ2FsbC5jbXBEYXRhKDQxLCB0aGlzLl9uYW1lLCBzY3JpcHRVcmwsIENtcFR5cGUuRE9fTk9UX1dBSVQsIHRydWUpO1xuICAgICAgICB0aGlzLl9jbXAgPSBuZXcgQ01QKG5vZGUsIGJhY2tlbmRDYWxsLCB0aGlzKTtcbiAgICB9XG4gICAgZ2V0IG5hbWUoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9uYW1lO1xuICAgIH1cbiAgICBjb25uZWN0KCkge1xuICAgICAgICB0aGlzLl9jbXAuY29ubmVjdCgpO1xuICAgIH1cbiAgICAvKlxuXG4gICAgICAgIGh0dHBzOi8vZG9jcy5vcmFjbGUuY29tL1xuICAgICAgICBodHRwczovL25ld3Nyb29tLmlibS5jb20vXG5cbiAgICAgKi9cbiAgICBoYW5kbGVDbXAoKSB7XG4gICAgICAgIC8vIGZyb20gd2l0aGluIElGcmFtZVxuICAgICAgICBjb25zdCBtb3JlSW5mb3JtYXRpb24gPSBcIi5zaHBcIjtcbiAgICAgICAgbGV0IG1vcmVJbmZvcm1hdGlvbkJ1dHRvbiA9IHRoaXMuX2NtcC5xdWVyeU5vZGVTZWxlY3Rvcihtb3JlSW5mb3JtYXRpb24pO1xuICAgICAgICBjb25zdCBhZHZhbmNlZCA9IFwiLmFkdmFuY2VcIjtcbiAgICAgICAgbGV0IGFkdmFuY2VkQnV0dG9uID0gdGhpcy5fY21wLnF1ZXJ5Tm9kZVNlbGVjdG9yKGFkdmFuY2VkKTtcbiAgICAgICAgVXRpbHMubG9nKFwiYWR2YW5jZWQ6IFwiICsgYWR2YW5jZWRCdXR0b24pO1xuICAgICAgICBjb25zdCBzcGFuT24gPSAnLm9uJztcbiAgICAgICAgbGV0IHNwYW5Pbkdyb3VwID0gdGhpcy5fY21wLnF1ZXJ5Tm9kZVNlbGVjdG9yQWxsKHNwYW5Pbik7XG4gICAgICAgIFV0aWxzLmxvZyhzcGFuT25Hcm91cCk7XG4gICAgICAgIFV0aWxzLmxvZyhcIlNwYW4gb24gR3JvdXAgTGVuZ3RoOiBcIiArIHNwYW5Pbkdyb3VwLmxlbmd0aCk7XG4gICAgICAgIGNvbnN0IHN1Ym1pdCA9IFwiLnN1Ym1pdFwiO1xuICAgICAgICBsZXQgc3VibWl0QnV0dG9uID0gdGhpcy5fY21wLnF1ZXJ5Tm9kZVNlbGVjdG9yKHN1Ym1pdCk7XG4gICAgICAgIFV0aWxzLmxvZyhcInN1Ym1pdDogJ1wiICsgc3VibWl0QnV0dG9uICsgXCInIFwiICsgSlNPTi5zdHJpbmdpZnkoc3VibWl0QnV0dG9uKSk7XG4gICAgICAgIGNvbnN0IGNsb3NlID0gXCIuY2xvc2VcIjtcbiAgICAgICAgbGV0IGNsb3NlQnV0dG9uID0gdGhpcy5fY21wLnF1ZXJ5Tm9kZVNlbGVjdG9yKGNsb3NlKTtcbiAgICAgICAgVXRpbHMubG9nKFwiQ2xvc2U6IFwiICsgY2xvc2VCdXR0b24pO1xuICAgICAgICBVdGlscy5sb2coXCJTdGF0ZTogXCIgKyB0aGlzLl9jbXAuc3RhdGUpO1xuICAgICAgICBpZiAoVXRpbHMub2JqZWN0Q2xpY2thYmxlKG1vcmVJbmZvcm1hdGlvbkJ1dHRvbikgJiYgdGhpcy5fY21wLnN0YXRlIDwgMSkge1xuICAgICAgICAgICAgVXRpbHMubG9nKFwibW9yZUluZm9ybWF0aW9uQnV0dG9uIGNsaWNrZWRcIik7XG4gICAgICAgICAgICBtb3JlSW5mb3JtYXRpb25CdXR0b24uY2xpY2soKTtcbiAgICAgICAgICAgIHRoaXMuX2NtcC5zdGF0ZSA9IDE7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAoVXRpbHMub2JqZWN0Q2xpY2thYmxlKGFkdmFuY2VkQnV0dG9uKSAmJiB0aGlzLl9jbXAuc3RhdGUgPCAyKSB7XG4gICAgICAgICAgICBVdGlscy5sb2coXCJhZHZhbmNlZCBjbGlja2VkXCIpO1xuICAgICAgICAgICAgYWR2YW5jZWRCdXR0b24uY2xpY2soKTtcbiAgICAgICAgICAgIHRoaXMuX2NtcC5zdGF0ZSA9IDI7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAoc3Bhbk9uR3JvdXAgJiYgc3Bhbk9uR3JvdXAubGVuZ3RoID4gMSAmJiB0aGlzLl9jbXAuc3RhdGUgPCAzKSB7XG4gICAgICAgICAgICBzcGFuT25Hcm91cC5mb3JFYWNoKChzcGFuKSA9PiB7XG4gICAgICAgICAgICAgICAgVXRpbHMubG9nKFwiQ2hhbmdpbmcgQnV0dG9uXCIpO1xuICAgICAgICAgICAgICAgIHNwYW4uY2xpY2soKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgdGhpcy5fY21wLnN0YXRlID0gMztcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmIChVdGlscy5vYmplY3RDbGlja2FibGUoc3VibWl0QnV0dG9uKSAmJiB0aGlzLl9jbXAuc3RhdGUgPT09IDMpIHtcbiAgICAgICAgICAgIFV0aWxzLmxvZyhcIkNsaWNrIFN1Ym1pdFwiKTtcbiAgICAgICAgICAgIHN1Ym1pdEJ1dHRvbi5jbGljaygpO1xuICAgICAgICAgICAgdGhpcy5fY21wLnN0YXRlID0gNDtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmIChVdGlscy5vYmplY3RDbGlja2FibGUoY2xvc2VCdXR0b24pICYmIHRoaXMuX2NtcC5zdGF0ZSA9PT0gNCkge1xuICAgICAgICAgICAgVXRpbHMubG9nKFwiY2xvc2VCdXR0b24gY2xpY2tlZFwiKTtcbiAgICAgICAgICAgIGNsb3NlQnV0dG9uLmNsaWNrKCk7XG4gICAgICAgICAgICB0aGlzLl9jbXAucmVzZXQoKTtcbiAgICAgICAgfVxuICAgIH1cbn1cbiIsIlwidXNlIHN0cmljdFwiO1xuaW1wb3J0IFV0aWxzIGZyb20gXCIuLi9VdGlsc1wiO1xuaW1wb3J0IENNUCBmcm9tIFwiLi9DTVBcIjtcbmltcG9ydCBDbXBUeXBlIGZyb20gXCIuL0NtcFR5cGVcIjtcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFVzZXJDZW50cmljcyB7XG4gICAgY29uc3RydWN0b3Iobm9kZSwgc2NyaXB0VXJsLCBiYWNrZW5kQ2FsbCkge1xuICAgICAgICB0aGlzLl9uYW1lID0gXCJVc2VyY2VudHJpY3MgR21iSFwiO1xuICAgICAgICBiYWNrZW5kQ2FsbC5jbXBEYXRhKDUsIHRoaXMuX25hbWUsIHNjcmlwdFVybCwgQ21wVHlwZS5XQUlUX0ZPUl9BU1lOQ19DQUxMQkFDSywgdHJ1ZSk7XG4gICAgICAgIHRoaXMuX2NtcCA9IG5ldyBDTVAobm9kZSwgYmFja2VuZENhbGwsIHRoaXMpO1xuICAgIH1cbiAgICBnZXQgbmFtZSgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX25hbWU7XG4gICAgfVxuICAgIGNvbm5lY3QoKSB7XG4gICAgICAgIHRoaXMuX2NtcC5jb25uZWN0KCk7XG4gICAgfVxuICAgIGhhbmRsZUNtcCgpIHtcbiAgICAgICAgLy8gd2UgYXJlIGxvb2tpbmcgZm9yIGEgYmFubmVyIGFuZCBpZiB0aGlzIGJhbm5lciBpcyB2aXNpYmxlLCB3ZSB0aGVuIGluamVjdCB0aGUgamF2YXNjcmlwdC5cbiAgICAgICAgY29uc3QgdWNCYW5uZXJDb250ZW50ID0gJ2Rpdi51Yy1iYW5uZXItY29udGVudCc7XG4gICAgICAgIGxldCBiYW5uZXIgPSB0aGlzLl9jbXAucXVlcnlOb2RlU2VsZWN0b3IodWNCYW5uZXJDb250ZW50KTtcbiAgICAgICAgLy8gdHlwZW9mIGJ1dHRvbiAhPT0gJ3VuZGVmaW5lZCcgJiYgYnV0dG9uICYmIHR5cGVvZiBidXR0b24ucGFyZW50RWxlbWVudCAhPT0gJ3VuZGVmaW5lZCdcbiAgICAgICAgLy8gY2FzZSBsaWtlIG9uIGhzZTI0LmRlXG4gICAgICAgIGlmIChVdGlscy5vYmplY3RWaXNpYmxlKGJhbm5lcikgJiYgdGhpcy5fY21wLnN0YXRlID09PSAwKSB7XG4gICAgICAgICAgICBVdGlscy5sb2coJ0RlbnkgQWxsIGJ1dHRvbiBmb3VuZCcpO1xuICAgICAgICAgICAgbGV0IHNjcmlwdCA9IHRoaXMuX2NtcC5ub2RlLmNyZWF0ZUVsZW1lbnQoJ3NjcmlwdCcpO1xuICAgICAgICAgICAgc2NyaXB0LnR5cGUgPSAndGV4dC9qYXZhc2NyaXB0JztcbiAgICAgICAgICAgIHNjcmlwdC5hc3luYyA9IHRydWU7XG4gICAgICAgICAgICBzY3JpcHQudGV4dCA9ICdmdW5jdGlvbiBzKGNvdW50ZXIpe2lmKGNvdW50ZXIgPj0gMTAwKXtyZXR1cm47IH0gaWYodHlwZW9mIHRoaXMudXNlcmNlbnRyaWNzICE9PSBcInVuZGVmaW5lZFwiICYmIHR5cGVvZiB0aGlzLnVzZXJjZW50cmljcy5kZW55QWxsQ29uc2VudHNBbmRDbG9zZUluaXRpYWxWaWV3ICE9PSBcInVuZGVmaW5lZFwiKXsgdGhpcy51c2VyY2VudHJpY3MuZGVueUFsbENvbnNlbnRzQW5kQ2xvc2VJbml0aWFsVmlldygpOyB9IGVsc2UgeyBzZXRUaW1lb3V0KGZ1bmN0aW9uKCkge3MoY291bnRlciArIDEpfSwgMjUpOyAgfX07IHMoMSk7JztcbiAgICAgICAgICAgIHRoaXMuX2NtcC5ub2RlLmhlYWQuYXBwZW5kQ2hpbGQoc2NyaXB0KTtcbiAgICAgICAgICAgIHRoaXMuX2NtcC5yZXNldCgpO1xuICAgICAgICB9XG4gICAgfVxufVxuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5pbXBvcnQgRGV0ZWN0b3IgZnJvbSBcIi4vRGV0ZWN0b3JcIjtcbmltcG9ydCBVdGlscyBmcm9tIFwiLi9VdGlsc1wiO1xuLy8gVGhpcyBpcyByZXF1aXJlZCBhcyBmb3IgU2FmYXJpIHRoZSBzY3JpcHQgaXMgaW5qZWN0ZWQgYXQgdGhlIGJlZ2lubmluZy4gRm9yIENocm9tZSBpcyBhdCB0aGUgZW5kLlxuaWYgKGRvY3VtZW50LnJlYWR5U3RhdGUgPT09ICdsb2FkaW5nJykge1xuICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ0RPTUNvbnRlbnRMb2FkZWQnLCBhZnRlckRPTUxvYWRlZCk7XG59XG5lbHNlIHtcbiAgICBhZnRlckRPTUxvYWRlZCgpO1xufVxuZnVuY3Rpb24gYWZ0ZXJET01Mb2FkZWQoKSB7XG4gICAgaWYgKHR5cGVvZiBzYWZhcmkgIT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgIFV0aWxzLmxvZyhcIisrKyBSdW5uaW5nIG9uIFNhZmFyaSArKytcIik7XG4gICAgfVxuICAgIGVsc2UgaWYgKHR5cGVvZiBjaHJvbWUgIT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgIFV0aWxzLmxvZyhcIisrKyBSdW5uaW5nIG9uIENocm9taXVtIFBsYXRmb3JtICsrK1wiKTtcbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICAgIFV0aWxzLmxvZyhcIisrKyBSdW5uaW5nIG9uIHNvbWUgb3RoZXIgUGxhdGZvcm0gKysrXCIpO1xuICAgIH1cbiAgICAvLyBvbmx5IGV4ZWN1dGUgdGhlIGNvbnRlbnQgc2NyaXB0XG4gICAgLy8gLSBpZiB0aGVyZSBpcyBkb2MgdHlwZVxuICAgIC8vIC0gaWYgdGhlcmUgaXMgYm9keSB3aXRoIGEgZGVmaW5lZCBsZW5ndGhcbiAgICAvLyAtIGlmIHRoZXJlIGFyZSBzb21lIGNoaWxkIG5vZGVzIGluIHRoZSBib2R5XG4gICAgVXRpbHMubG9nKFwiQ29uc2VudCBTY3JpcHQgUGFyYW1ldGVyOiBcIiArIEpTT04uc3RyaW5naWZ5KGRvY3VtZW50LmRvY3R5cGUpICsgXCIsIExlbjogXCIgKyBkb2N1bWVudC5ib2R5LmlubmVySFRNTC5sZW5ndGggKyBcIiwgTm9kZXM6IFwiICsgZG9jdW1lbnQuYm9keS5jaGlsZE5vZGVzLmxlbmd0aCk7XG4gICAgbGV0IGluRnJhbWUgPSBmYWxzZTtcbiAgICB0cnkge1xuICAgICAgICBpbkZyYW1lID0gd2luZG93LnNlbGYgIT09IHdpbmRvdy50b3A7XG4gICAgICAgIFV0aWxzLmxvZyhcIlJ1bm5pbmcgaW4gSUZyYW1lOiBcIiArIGluRnJhbWUpO1xuICAgIH1cbiAgICBjYXRjaCAoZSkge1xuICAgICAgICBVdGlscy5sb2coXCJFcnJvciBGaWd1cmluZyBvdXQgaWYgd2UgYXJlIHJ1bm5pbmcgaW4gYW4gaUZyYW1lXCIpO1xuICAgIH1cbiAgICAvKiBvbmx5IHByb2Nlc3MgZmlsZXNcbiAgICAgICAtIHdpdGggYSBEb2MgVHlwZVxuICAgICAgIC0gd2hpY2ggYXJlIGxvbmdlciB0aGFuIDEwMCBjaGFyc1xuICAgICAgIC0gd2hpY2ggYXJlIEhUVFBTIG9yIEhUVFAgZmlsZVxuICAgICAqL1xuICAgIGlmIChkb2N1bWVudC5kb2N0eXBlICYmIGRvY3VtZW50LmJvZHkuaW5uZXJIVE1MLmxlbmd0aCA+IDEwMCAmJiAoZG9jdW1lbnQubG9jYXRpb24uaHJlZi50b0xvd2VyQ2FzZSgpLnN0YXJ0c1dpdGgoXCJodHRwczovL1wiKSB8fCBkb2N1bWVudC5sb2NhdGlvbi5ocmVmLnRvTG93ZXJDYXNlKCkuc3RhcnRzV2l0aChcImh0dHA6Ly9cIikpKSB7XG4gICAgICAgIFV0aWxzLmxvZyhcIlRyaWdnZXJpbmcgQ29udGVudCBTY3JpcHRcIik7XG4gICAgICAgIGNvbnN0IG1lc3NhZ2VGcm9tID0gXCJGUk9NX01JTklNQUxfQ09OU0VOVFwiO1xuICAgICAgICAvLyBUaGlzIGlzIHRoZSBzY3JpcHQgZm9yIGNoZWNraW5nIHdoZXRoZXIgdGhlcmUgaXMgYSBUQ0YgMS4xIG9yIFRDRiAyLjAgY29tcGxpYW50IENNUC5cbiAgICAgICAgbGV0IHNjcmlwdCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NjcmlwdCcpO1xuICAgICAgICBzY3JpcHQudHlwZSA9ICd0ZXh0L2phdmFzY3JpcHQnO1xuICAgICAgICBzY3JpcHQuYXN5bmMgPSB0cnVlO1xuICAgICAgICBzY3JpcHQudGV4dCA9ICd3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcihcImxvYWRcIixjaGVja0ZvckNtcCwhMSk7bGV0IGRhdGFmcmFtZUZvclBpbmdSZXR1cm49e3R5cGU6XCJGUk9NX01JTklNQUxfQ09OU0VOVFwifSxjaGVja0ZvckNtcENvdW50ZXI9MCxtYXhUaW1lb3V0Rm9yUmVzZWFyY2g9MjAwLG1heFJldHJ5Rm9yU2VhcmNoPTI1O2Z1bmN0aW9uIGNoZWNrRm9yQ21wKCl7dGhpcy5fX2NtcD90aGlzLl9fY21wKFwicGluZ1wiLDIsc2VuZE1lc3NhZ2UpOnRoaXMuX190Y2ZhcGk/dGhpcy5fX3RjZmFwaShcInBpbmdcIiwyLHNlbmRNZXNzYWdlKTp0aGlzLmZyYW1lcyYmdGhpcy5mcmFtZXMubGVuZ3RoJiZ0aGlzLmZyYW1lcy5fX3RjZmFwaUxvY2F0b3I/dGhpcy5fX3RjZmFwaShcInBpbmdcIiwyLHNlbmRNZXNzYWdlKTpjaGVja0ZvckNtcENvdW50ZXI8bWF4UmV0cnlGb3JTZWFyY2g/KHNldFRpbWVvdXQoY2hlY2tGb3JDbXAsbWF4VGltZW91dEZvclJlc2VhcmNoKSxjaGVja0ZvckNtcENvdW50ZXIrKyk6d2luZG93LnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJsb2FkXCIsY2hlY2tGb3JDbXAsITEpfWZ1bmN0aW9uIHNlbmRNZXNzYWdlKGUsdCl7dCYmKGRhdGFmcmFtZUZvclBpbmdSZXR1cm4uY21wPUpTT04uc3RyaW5naWZ5KGUpLHdpbmRvdy5wb3N0TWVzc2FnZShkYXRhZnJhbWVGb3JQaW5nUmV0dXJuLFwiKlwiKSx3aW5kb3cucmVtb3ZlRXZlbnRMaXN0ZW5lcihcImxvYWRcIixjaGVja0ZvckNtcCwhMSkpfSc7XG4gICAgICAgIGRvY3VtZW50LmhlYWQuYXBwZW5kQ2hpbGQoc2NyaXB0KTtcbiAgICAgICAgY29uc3QgZGV0ZWN0b3IgPSBuZXcgRGV0ZWN0b3IoZG9jdW1lbnQsIGluRnJhbWUpO1xuICAgICAgICBkZXRlY3Rvci5jb25uZWN0T2JzZXJ2ZXIoKTtcbiAgICAgICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoXCJtZXNzYWdlXCIsIGZ1bmN0aW9uIChldmVudCkge1xuICAgICAgICAgICAgLy8gV2Ugb25seSBhY2NlcHQgbWVzc2FnZXMgZnJvbSBvdXJzZWx2ZXNcbiAgICAgICAgICAgIGlmIChldmVudC5zb3VyY2UgIT09IHdpbmRvdylcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAvLyBvbmx5IGlmIHRoZXJlIFRDRiAxLjEgb3IgVEZDIDIuMCBjb21wbGlhbnQgQ01QIGZvdW5kLCBsYXVuY2ggdGhlIGFwcHJvcHJpYXRlIGRldGVjdG9yLlxuICAgICAgICAgICAgLy8gaWYgdGhlIHByb3ByaWV0YXJ5IGluaXRpYWxpemF0aW9uIGFscmVhZHkgd29ya2VkIG91dCwgZG9uJ3QgaW5pdGlhbGl6ZSB0aGUgQ01QIGFnYWluLlxuICAgICAgICAgICAgaWYgKGV2ZW50LmRhdGEudHlwZSAmJiBldmVudC5kYXRhLnR5cGUgPT09IG1lc3NhZ2VGcm9tKSB7XG4gICAgICAgICAgICAgICAgLy8gZ2l2ZW4gdGhlIFBpbmcgUmVzdWx0IHRvIHRoZSBEZXRlY3RvciBPYmplY3QuXG4gICAgICAgICAgICAgICAgZGV0ZWN0b3IucGluZ1Jlc3VsdCA9IGV2ZW50LmRhdGEuY21wO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9XG59XG4iLCJcInVzZSBzdHJpY3RcIjtcbmltcG9ydCBVdGlscyBmcm9tIFwiLi4vVXRpbHNcIjtcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFBpbmdSZXN1bHQge1xuICAgIGNvbnN0cnVjdG9yKGdkcHJBcHBsaWVzR2xvYmFsbHksIGdkcHJBcHBsaWVzLCBjbXBMb2FkZWQsIGNtcFN0YXR1cywgZGlzcGxheVN0YXR1cywgYXBpVmVyc2lvbiwgY21wVmVyc2lvbiwgY21wSWQsIGd2bFZlcnNpb24sIHRjZlBvbGljeVZlcnNpb24pIHtcbiAgICAgICAgaWYgKFV0aWxzLmNoZWNrSWZEZWZpbmVkQW5kTm90TnVsbChnZHByQXBwbGllc0dsb2JhbGx5KSkge1xuICAgICAgICAgICAgdGhpcy5fZ2RwckFwcGxpZXNHbG9iYWxseSA9IGdkcHJBcHBsaWVzR2xvYmFsbHk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKFV0aWxzLmNoZWNrSWZEZWZpbmVkQW5kTm90TnVsbChnZHByQXBwbGllcykpIHtcbiAgICAgICAgICAgIHRoaXMuX2dkcHJBcHBsaWVzID0gZ2RwckFwcGxpZXM7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKFV0aWxzLmNoZWNrSWZEZWZpbmVkQW5kTm90TnVsbChjbXBMb2FkZWQpKSB7XG4gICAgICAgICAgICB0aGlzLl9jbXBMb2FkZWQgPSBjbXBMb2FkZWQ7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKFV0aWxzLmNoZWNrSWZEZWZpbmVkQW5kTm90TnVsbChjbXBTdGF0dXMpKSB7XG4gICAgICAgICAgICB0aGlzLl9jbXBTdGF0dXMgPSBjbXBTdGF0dXM7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKFV0aWxzLmNoZWNrSWZEZWZpbmVkQW5kTm90TnVsbChkaXNwbGF5U3RhdHVzKSkge1xuICAgICAgICAgICAgdGhpcy5fZGlzcGxheVN0YXR1cyA9IGRpc3BsYXlTdGF0dXM7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKFV0aWxzLmNoZWNrSWZEZWZpbmVkQW5kTm90TnVsbChhcGlWZXJzaW9uKSkge1xuICAgICAgICAgICAgdGhpcy5fYXBpVmVyc2lvbiA9IGFwaVZlcnNpb247XG4gICAgICAgIH1cbiAgICAgICAgaWYgKFV0aWxzLmNoZWNrSWZEZWZpbmVkQW5kTm90TnVsbChjbXBWZXJzaW9uKSkge1xuICAgICAgICAgICAgdGhpcy5fY21wVmVyc2lvbiA9IGNtcFZlcnNpb247XG4gICAgICAgIH1cbiAgICAgICAgaWYgKFV0aWxzLmNoZWNrSWZEZWZpbmVkQW5kTm90TnVsbChjbXBJZCkpIHtcbiAgICAgICAgICAgIHRoaXMuX2NtcElkID0gY21wSWQ7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKFV0aWxzLmNoZWNrSWZEZWZpbmVkQW5kTm90TnVsbChndmxWZXJzaW9uKSkge1xuICAgICAgICAgICAgdGhpcy5fZ3ZsVmVyc2lvbiA9IGd2bFZlcnNpb247XG4gICAgICAgIH1cbiAgICAgICAgaWYgKFV0aWxzLmNoZWNrSWZEZWZpbmVkQW5kTm90TnVsbCh0Y2ZQb2xpY3lWZXJzaW9uKSkge1xuICAgICAgICAgICAgdGhpcy5fdGNmUG9saWN5VmVyc2lvbiA9IHRjZlBvbGljeVZlcnNpb247XG4gICAgICAgIH1cbiAgICB9XG4gICAgZ2V0IGNtcElkKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fY21wSWQ7XG4gICAgfVxuICAgIHNldCBjbXBJZChpZCkge1xuICAgICAgICB0aGlzLl9jbXBJZCA9IGlkO1xuICAgIH1cbiAgICBnZXQgZ2RwckFwcGxpZXNHbG9iYWxseSgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2dkcHJBcHBsaWVzR2xvYmFsbHk7XG4gICAgfVxuICAgIGdldCBnZHByQXBwbGllcygpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2dkcHJBcHBsaWVzO1xuICAgIH1cbiAgICBnZXQgY21wTG9hZGVkKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fY21wTG9hZGVkO1xuICAgIH1cbiAgICBnZXQgY21wU3RhdHVzKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fY21wU3RhdHVzO1xuICAgIH1cbiAgICBnZXQgZGlzcGxheVN0YXR1cygpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2Rpc3BsYXlTdGF0dXM7XG4gICAgfVxuICAgIGdldCBhcGlWZXJzaW9uKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fYXBpVmVyc2lvbjtcbiAgICB9XG4gICAgZ2V0IGNtcFZlcnNpb24oKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9jbXBWZXJzaW9uO1xuICAgIH1cbiAgICBnZXQgZ3ZsVmVyc2lvbigpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2d2bFZlcnNpb247XG4gICAgfVxuICAgIGdldCB0Y2ZQb2xpY3lWZXJzaW9uKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fdGNmUG9saWN5VmVyc2lvbjtcbiAgICB9XG4gICAgZ2V0IHRjZlZlcnNpb24oKSB7XG4gICAgICAgIGxldCB0Y2ZWZXJzaW9uO1xuICAgICAgICBpZiAodHlwZW9mIHRoaXMuZ2RwckFwcGxpZXNHbG9iYWxseSAhPT0gJ3VuZGVmaW5lZCcgJiYgdHlwZW9mIHRoaXMuY21wTG9hZGVkICE9PSAndW5kZWZpbmVkJyAmJiB0eXBlb2YgdGhpcy5nZHByQXBwbGllcyA9PT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgICAgIHRjZlZlcnNpb24gPSBcIlRDRiAxLjFcIjtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmICh0eXBlb2YgdGhpcy5nZHByQXBwbGllcyAhPT0gJ3VuZGVmaW5lZCcgJiYgdHlwZW9mIHRoaXMuY21wTG9hZGVkICE9PSAndW5kZWZpbmVkJyAmJiB0eXBlb2YgdGhpcy5nZHByQXBwbGllc0dsb2JhbGx5ID09PSAndW5kZWZpbmVkJykge1xuICAgICAgICAgICAgdGNmVmVyc2lvbiA9IFwiVENGIDIuMFwiO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgdGNmVmVyc2lvbiA9IFwibm90IGRlZmluZWRcIjtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdGNmVmVyc2lvbjtcbiAgICB9XG4gICAgc3RhdGljIGNsYXNzKHBpbmdSZXN1bHQpIHtcbiAgICAgICAgaWYgKHBpbmdSZXN1bHQuX2dkcHJBcHBsaWVzR2xvYmFsbHkgfHwgcGluZ1Jlc3VsdC5fZ2RwckFwcGxpZXMgfHxcbiAgICAgICAgICAgIHBpbmdSZXN1bHQuX2NtcExvYWRlZCB8fFxuICAgICAgICAgICAgcGluZ1Jlc3VsdC5fY21wU3RhdHVzIHx8XG4gICAgICAgICAgICBwaW5nUmVzdWx0Ll9kaXNwbGF5U3RhdHVzIHx8XG4gICAgICAgICAgICBwaW5nUmVzdWx0Ll9hcGlWZXJzaW9uIHx8XG4gICAgICAgICAgICBwaW5nUmVzdWx0Ll9jbXBWZXJzaW9uIHx8XG4gICAgICAgICAgICBwaW5nUmVzdWx0Ll9jbXBJZCB8fFxuICAgICAgICAgICAgcGluZ1Jlc3VsdC5fZ3ZsVmVyc2lvbiB8fFxuICAgICAgICAgICAgcGluZ1Jlc3VsdC5fdGNmUG9saWN5VmVyc2lvbikge1xuICAgICAgICAgICAgcmV0dXJuIG5ldyBQaW5nUmVzdWx0KHBpbmdSZXN1bHQuX2dkcHJBcHBsaWVzR2xvYmFsbHksIHBpbmdSZXN1bHQuX2dkcHJBcHBsaWVzLCBwaW5nUmVzdWx0Ll9jbXBMb2FkZWQsIHBpbmdSZXN1bHQuX2NtcFN0YXR1cywgcGluZ1Jlc3VsdC5fZGlzcGxheVN0YXR1cywgcGluZ1Jlc3VsdC5fYXBpVmVyc2lvbiwgcGluZ1Jlc3VsdC5fY21wVmVyc2lvbiwgcGluZ1Jlc3VsdC5fY21wSWQsIHBpbmdSZXN1bHQuX2d2bFZlcnNpb24sIHBpbmdSZXN1bHQuX3RjZlBvbGljeVZlcnNpb24pO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgcmV0dXJuIG5ldyBQaW5nUmVzdWx0KHBpbmdSZXN1bHQuZ2RwckFwcGxpZXNHbG9iYWxseSwgcGluZ1Jlc3VsdC5nZHByQXBwbGllcywgcGluZ1Jlc3VsdC5jbXBMb2FkZWQsIHBpbmdSZXN1bHQuY21wU3RhdHVzLCBwaW5nUmVzdWx0LmRpc3BsYXlTdGF0dXMsIHBpbmdSZXN1bHQuYXBpVmVyc2lvbiwgcGluZ1Jlc3VsdC5jbXBWZXJzaW9uLCBwaW5nUmVzdWx0LmNtcElkLCBwaW5nUmVzdWx0Lmd2bFZlcnNpb24sIHBpbmdSZXN1bHQudGNmUG9saWN5VmVyc2lvbik7XG4gICAgICAgIH1cbiAgICB9XG4gICAgdG9KU09OKCkge1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgZ2RwckFwcGxpZXNHbG9iYWxseTogdGhpcy5fZ2RwckFwcGxpZXNHbG9iYWxseSxcbiAgICAgICAgICAgIGdkcHJBcHBsaWVzOiB0aGlzLl9nZHByQXBwbGllcyxcbiAgICAgICAgICAgIGNtcExvYWRlZDogdGhpcy5fY21wTG9hZGVkLFxuICAgICAgICAgICAgY21wU3RhdHVzOiB0aGlzLl9jbXBTdGF0dXMsXG4gICAgICAgICAgICBkaXNwbGF5U3RhdHVzOiB0aGlzLl9kaXNwbGF5U3RhdHVzLFxuICAgICAgICAgICAgYXBpVmVyc2lvbjogdGhpcy5fYXBpVmVyc2lvbixcbiAgICAgICAgICAgIGNtcFZlcnNpb246IHRoaXMuX2NtcFZlcnNpb24sXG4gICAgICAgICAgICBjbXBJZDogdGhpcy5fY21wSWQsXG4gICAgICAgICAgICBndmxWZXJzaW9uOiB0aGlzLl9ndmxWZXJzaW9uLFxuICAgICAgICAgICAgdGNmUG9saWN5VmVyc2lvbjogdGhpcy5fdGNmUG9saWN5VmVyc2lvblxuICAgICAgICB9O1xuICAgIH1cbn1cbiJdLCJzb3VyY2VSb290IjoiIn0=