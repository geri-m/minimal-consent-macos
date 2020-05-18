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
        // we are sending seperat components in 'sendMessage()' as in the BackendCall, we don't know the URL.
        // this class is part of the content-Script and has no access to the URL.
        if (safari.extension) {
            _Utils__WEBPACK_IMPORTED_MODULE_0__["default"].log("+++ Running on Safari +++");
            eval("safari.extension.dispatchMessage('someMessage', {cmp: this._cmp," +
                "cmpScripUrl: this._cmpScriptUrl," +
                "pingResult: this._pingResult," +
                "implemented: this._implemented," +
                "from: BackendCall.pageName})");
        }
        else if (chrome.runtime) {
            chrome.runtime.sendMessage({
                cmp: this._cmp,
                cmpScripUrl: this._cmpScriptUrl,
                pingResult: this._pingResult,
                implemented: this._implemented,
                from: BackendCall.pageName
            });
        }
        else {
            _Utils__WEBPACK_IMPORTED_MODULE_0__["default"].log("+++ Running on Chromium Platform +++");
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
const config = { attributes: true, childList: true, subtree: true };
class Detector {
    constructor(document, inIframe) {
        this._document = document;
        this._backendCall = new _BackendCall__WEBPACK_IMPORTED_MODULE_12__["default"]();
        this._inIFrame = inIframe;
    }
    set pingResult(pingResult) {
        this._backendCall.pingResult = pingResult;
    }
    /**
     * Connection to the Observer is outsourced out of the Constructor in order to have the Object initialized first.
     * Only after that the observer can be registered in a save way.
     */
    connectObserver() {
        // Options for the observer (which mutations to observe)
        let self = this;
        this._observerForScriptSource = new MutationObserver(function (mutations) {
            self.handleCMP(mutations);
        });
        // Select the node that will be observed for mutations
        this._observerForScriptSource.observe(this._document.getRootNode(), config);
    }
    disconnectObserver() {
        this._observerForScriptSource.disconnect();
    }
    handleCMP(mutations) {
        let allScriptTags = document.querySelectorAll("script");
        let scriptCounter;
        if (this._cmp) {
            _Utils__WEBPACK_IMPORTED_MODULE_0__["default"].log("CMP Defined (we should never end up here, as the observer will disconnect, if this._cmp is set");
            return;
        }
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
            this.disconnectObserver();
            // now connect to the Observer.
            this._cmp.connect();
        }
        else {
            _Utils__WEBPACK_IMPORTED_MODULE_0__["default"].log("-- Run Thru completed. No Indicator for JavaScript of a CMP so far.");
        }
    }
    inIframe() {
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



if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', afterDOMLoaded);
}
else {
    afterDOMLoaded();
}
function afterDOMLoaded() {
    if (typeof safari !== 'undefined') {
        _Utils__WEBPACK_IMPORTED_MODULE_1__["default"].log("+++ Running on Safari +++");
        _Utils__WEBPACK_IMPORTED_MODULE_1__["default"].log("Document: " + document);
        _Utils__WEBPACK_IMPORTED_MODULE_1__["default"].log("Body: " + document.body);
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
        inFrame = false;
    }
    if (document.doctype && document.body.innerHTML.length > 100) {
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay91bml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uIiwid2VicGFjazovLy93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvZGF0ZWZvcm1hdC9saWIvZGF0ZWZvcm1hdC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvanMvQmFja2VuZENhbGwudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2pzL0RldGVjdG9yLnRzIiwid2VicGFjazovLy8uL3NyYy9qcy9VdGlscy50cyIsIndlYnBhY2s6Ly8vLi9zcmMvanMvY21wL0JvcmxhYnMudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2pzL2NtcC9DTVAudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2pzL2NtcC9DaGFuZGFnby50cyIsIndlYnBhY2s6Ly8vLi9zcmMvanMvY21wL0NtcFR5cGUudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2pzL2NtcC9Db25zZW50TWFuYWdlci50cyIsIndlYnBhY2s6Ly8vLi9zcmMvanMvY21wL0Nvb2tpZUJvdC50cyIsIndlYnBhY2s6Ly8vLi9zcmMvanMvY21wL0N1c3RvbUltcGwudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2pzL2NtcC9EaURvTWkudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2pzL2NtcC9Fdmlkb24udHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2pzL2NtcC9Ob1lldEltcGxlbWVudGVkQ21wLnRzIiwid2VicGFjazovLy8uL3NyYy9qcy9jbXAvT2F0aENtcC50cyIsIndlYnBhY2s6Ly8vLi9zcmMvanMvY21wL09uZVRydXN0LnRzIiwid2VicGFjazovLy8uL3NyYy9qcy9jbXAvUXVhbnRDYXN0LnRzIiwid2VicGFjazovLy8uL3NyYy9qcy9jbXAvU291cmNlUG9pbnQudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2pzL2NtcC9UcmFmZmVjdGl2ZS50cyIsIndlYnBhY2s6Ly8vLi9zcmMvanMvY21wL1RydXN0QXJjQmFubmVyLnRzIiwid2VicGFjazovLy8uL3NyYy9qcy9jbXAvVHJ1c3RBcmNJRnJhbWUudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2pzL2NtcC9Vc2VyQ2VudHJpY3MudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2pzL2NvbnRlbnRzY3JpcHQudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2pzL2VudGl0aWVzL1BpbmdSZXN1bHQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQztBQUNELE87UUNWQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTs7O1FBR0E7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBLDBDQUEwQyxnQ0FBZ0M7UUFDMUU7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQSx3REFBd0Qsa0JBQWtCO1FBQzFFO1FBQ0EsaURBQWlELGNBQWM7UUFDL0Q7O1FBRUE7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBLHlDQUF5QyxpQ0FBaUM7UUFDMUUsZ0hBQWdILG1CQUFtQixFQUFFO1FBQ3JJO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0EsMkJBQTJCLDBCQUEwQixFQUFFO1FBQ3ZELGlDQUFpQyxlQUFlO1FBQ2hEO1FBQ0E7UUFDQTs7UUFFQTtRQUNBLHNEQUFzRCwrREFBK0Q7O1FBRXJIO1FBQ0E7OztRQUdBO1FBQ0E7Ozs7Ozs7Ozs7OztBQ2xGQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0EscUJBQXFCLElBQUksR0FBRyxJQUFJO0FBQ2hDLGtKQUFrSixFQUFFO0FBQ3BKOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0EsS0FBSzs7QUFFTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxZQUFZLE9BQU87QUFDbkIsWUFBWTtBQUNaO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFlBQVksT0FBTztBQUNuQixZQUFZO0FBQ1o7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsWUFBWSxFQUFFO0FBQ2QsWUFBWTtBQUNaO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUEsV0FBVztB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QUM1RDtBQUNBO0FBQ0E7QUFDQSx3Q0FBd0MsaUVBQW9CO0FBQzVEO0FBQ0E7QUFDQTtBQUNBLHdDQUF3QyxpRUFBb0I7QUFDNUQ7QUFDQTtBQUNBO0FBQ0Esd0NBQXdDLGlFQUFvQjtBQUM1RDtBQUNBO0FBQ0E7QUFDQSx3Q0FBd0MsaUVBQW9CO0FBQzVEO0FBQ0E7QUFDQTtBQUNBLHdDQUF3QyxpRUFBb0I7QUFDNUQ7QUFDQTtBQUNBO0FBQ0Esd0NBQXdDLGlFQUFvQjtBQUM1RDtBQUNBO0FBQ0E7QUFDQSx3Q0FBd0MsaUVBQW9CO0FBQzVEO0FBQ0E7QUFDQTtBQUNBLHdDQUF3QyxpRUFBb0I7QUFDNUQ7QUFDQTtBQUNBO0FBQ0Esd0NBQXdDLGlFQUFvQjtBQUM1RDtBQUNBO0FBQ0E7QUFDQSx3Q0FBd0MsaUVBQW9CO0FBQzVEO0FBQ0E7QUFDQTtBQUNBLHdDQUF3QyxpRUFBb0I7QUFDNUQ7QUFDQTtBQUNBO0FBQ0Esd0NBQXdDLGlFQUFvQjtBQUM1RDtBQUNBO0FBQ0E7QUFDQSx3Q0FBd0MsaUVBQW9CO0FBQzVEO0FBQ0E7QUFDQTtBQUNBLHdDQUF3QyxpRUFBb0I7QUFDNUQ7QUFDQTtBQUNBO0FBQ0Esd0NBQXdDLGlFQUFvQjtBQUM1RDtBQUNBO0FBQ0E7QUFDQSx3Q0FBd0MsaUVBQW9CO0FBQzVEO0FBQ0E7QUFDQTtBQUNBLHdDQUF3QyxpRUFBb0I7QUFDNUQ7QUFDQTtBQUNBO0FBQ0Esd0NBQXdDLGlFQUFvQjtBQUM1RDtBQUNBO0FBQ0E7QUFDQSx3Q0FBd0MsaUVBQW9CO0FBQzVEO0FBQ0E7QUFDQTtBQUNBLHdDQUF3QyxpRUFBb0I7QUFDNUQ7QUFDQTtBQUNBO0FBQ0Esd0NBQXdDLGlFQUFvQjtBQUM1RDtBQUNBO0FBQ0E7QUFDQSx3Q0FBd0MsaUVBQW9CO0FBQzVEO0FBQ0E7QUFDQTtBQUNBLHdDQUF3QyxpRUFBb0I7QUFDNUQ7QUFDQTtBQUNBO0FBQ0Esd0NBQXdDLGlFQUFvQjtBQUM1RDtBQUNBO0FBQ0E7QUFDQSx3Q0FBd0MsaUVBQW9CO0FBQzVEO0FBQ0E7QUFDQTtBQUNBLHdDQUF3QyxpRUFBb0I7QUFDNUQ7QUFDQTtBQUNBO0FBQ0Esd0NBQXdDLGlFQUFvQjtBQUM1RDtBQUNBO0FBQ0E7QUFDQSx3Q0FBd0MsaUVBQW9CO0FBQzVEO0FBQ0E7QUFDQTtBQUNBLHdDQUF3QyxpRUFBb0I7QUFDNUQ7QUFDQTtBQUNBO0FBQ0Esd0NBQXdDLGlFQUFvQjtBQUM1RDtBQUNBO0FBQ0E7QUFDQSx3Q0FBd0MsaUVBQW9CO0FBQzVEO0FBQ0E7QUFDQTtBQUNBLHdDQUF3QyxpRUFBb0I7QUFDNUQ7QUFDQTtBQUNBO0FBQ0Esd0NBQXdDLGlFQUFvQjtBQUM1RDtBQUNBO0FBQ0E7QUFDQSx3Q0FBd0MsaUVBQW9CO0FBQzVEO0FBQ0E7QUFDQTtBQUNBLHdDQUF3QyxpRUFBb0I7QUFDNUQ7QUFDQTtBQUNBO0FBQ0Esd0NBQXdDLGlFQUFvQjtBQUM1RDtBQUNBO0FBQ0E7QUFDQSx3Q0FBd0MsaUVBQW9CO0FBQzVEO0FBQ0E7QUFDQTtBQUNBLHdDQUF3QyxpRUFBb0I7QUFDNUQ7QUFDQTtBQUNBO0FBQ0Esd0NBQXdDLGlFQUFvQjtBQUM1RDtBQUNBLHFCQUFxQjtBQUNyQjtBQUNBO0FBQ0EscUJBQXFCO0FBQ3JCO0FBQ0Esd0NBQXdDLGlFQUFvQjtBQUM1RDtBQUNBO0FBQ0E7QUFDQSx3Q0FBd0MsaUVBQW9CO0FBQzVEO0FBQ0E7QUFDQTtBQUNBLHdDQUF3QyxpRUFBb0I7QUFDNUQ7QUFDQTtBQUNBO0FBQ0Esd0NBQXdDLGlFQUFvQjtBQUM1RDtBQUNBO0FBQ0E7QUFDQSx3Q0FBd0MsaUVBQW9CO0FBQzVEO0FBQ0E7QUFDQTtBQUNBLHdDQUF3QyxpRUFBb0I7QUFDNUQ7QUFDQTtBQUNBO0FBQ0Esd0NBQXdDLGlFQUFvQjtBQUM1RDtBQUNBO0FBQ0E7QUFDQSx3Q0FBd0MsaUVBQW9CO0FBQzVEO0FBQ0E7QUFDQTtBQUNBLHdDQUF3QyxpRUFBb0I7QUFDNUQ7QUFDQTtBQUNBO0FBQ0Esd0NBQXdDLGlFQUFvQjtBQUM1RDtBQUNBO0FBQ0E7QUFDQSx3Q0FBd0MsaUVBQW9CO0FBQzVEO0FBQ0E7QUFDQTtBQUNBLHdDQUF3QyxpRUFBb0I7QUFDNUQ7QUFDQTtBQUNBO0FBQ0Esd0NBQXdDLGlFQUFvQjtBQUM1RDtBQUNBO0FBQ0E7QUFDQSx3Q0FBd0MsaUVBQW9CO0FBQzVEO0FBQ0E7QUFDQTtBQUNBLHdDQUF3QyxpRUFBb0I7QUFDNUQ7QUFDQTtBQUNBO0FBQ0Esd0NBQXdDLGlFQUFvQjtBQUM1RDtBQUNBO0FBQ0E7QUFDQSx3Q0FBd0MsaUVBQW9CO0FBQzVEO0FBQ0E7QUFDQTtBQUNBLHdDQUF3QyxpRUFBb0I7QUFDNUQ7QUFDQTtBQUNBO0FBQ0Esd0NBQXdDLGlFQUFvQjtBQUM1RDtBQUNBO0FBQ0E7QUFDQSx3Q0FBd0MsaUVBQW9CO0FBQzVEO0FBQ0E7QUFDQTtBQUNBLHdDQUF3QyxpRUFBb0I7QUFDNUQ7QUFDQTtBQUNBO0FBQ0Esd0NBQXdDLGlFQUFvQjtBQUM1RDtBQUNBO0FBQ0E7QUFDQSx3Q0FBd0MsaUVBQW9CO0FBQzVEO0FBQ0E7QUFDQTtBQUNBLHdDQUF3QyxpRUFBb0I7QUFDNUQ7QUFDQTtBQUNBO0FBQ0Esd0NBQXdDLGlFQUFvQjtBQUM1RDtBQUNBO0FBQ0E7QUFDQSx3Q0FBd0MsaUVBQW9CO0FBQzVEO0FBQ0E7QUFDQTtBQUNBLHdDQUF3QyxpRUFBb0I7QUFDNUQ7QUFDQTtBQUNBO0FBQ0Esd0NBQXdDLGlFQUFvQjtBQUM1RDtBQUNBO0FBQ0E7QUFDQSx3Q0FBd0MsaUVBQW9CO0FBQzVEO0FBQ0E7QUFDQTtBQUNBLHdDQUF3QyxpRUFBb0I7QUFDNUQ7QUFDQTtBQUNBO0FBQ0Esd0NBQXdDLGlFQUFvQjtBQUM1RDtBQUNBO0FBQ0E7QUFDQSx3Q0FBd0MsaUVBQW9CO0FBQzVEO0FBQ0E7QUFDQTtBQUNBLHdDQUF3QyxpRUFBb0I7QUFDNUQ7QUFDQTtBQUNBO0FBQ0Esd0NBQXdDLGlFQUFvQjtBQUM1RDtBQUNBO0FBQ0E7QUFDQSx3Q0FBd0MsaUVBQW9CO0FBQzVEO0FBQ0E7QUFDQTtBQUNBLHdDQUF3QyxpRUFBb0I7QUFDNUQ7QUFDQTtBQUNBO0FBQ0Esd0NBQXdDLGlFQUFvQjtBQUM1RDtBQUNBO0FBQ0E7QUFDQSx3Q0FBd0MsaUVBQW9CO0FBQzVEO0FBQ0E7QUFDQTtBQUNBLHdDQUF3QyxpRUFBb0I7QUFDNUQ7QUFDQTtBQUNBO0FBQ0Esd0NBQXdDLGlFQUFvQjtBQUM1RDtBQUNBO0FBQ0E7QUFDQSx3Q0FBd0MsaUVBQW9CO0FBQzVEO0FBQ0E7QUFDQTtBQUNBLHdDQUF3QyxpRUFBb0I7QUFDNUQ7QUFDQTtBQUNBO0FBQ0Esd0NBQXdDLGlFQUFvQjtBQUM1RDtBQUNBO0FBQ0E7QUFDQSx3Q0FBd0MsaUVBQW9CO0FBQzVEO0FBQ0E7QUFDQTtBQUNBLHdDQUF3QyxpRUFBb0I7QUFDNUQ7QUFDQTtBQUNBO0FBQ0Esd0NBQXdDLGlFQUFvQjtBQUM1RDtBQUNBO0FBQ0E7QUFDQSx3Q0FBd0MsaUVBQW9CO0FBQzVEO0FBQ0E7QUFDQTtBQUNBLHdDQUF3QyxpRUFBb0I7QUFDNUQ7QUFDQTtBQUNBO0FBQ0Esd0NBQXdDLGlFQUFvQjtBQUM1RDtBQUNBO0FBQ0E7QUFDQSx3Q0FBd0MsaUVBQW9CO0FBQzVEO0FBQ0E7QUFDQTtBQUNBLHdDQUF3QyxpRUFBb0I7QUFDNUQ7QUFDQTtBQUNBO0FBQ0Esd0NBQXdDLGlFQUFvQjtBQUM1RDtBQUNBO0FBQ0E7QUFDQSx3Q0FBd0MsaUVBQW9CO0FBQzVEO0FBQ0E7QUFDQTtBQUNBLHdDQUF3QyxpRUFBb0I7QUFDNUQ7QUFDQTtBQUNBO0FBQ0Esd0NBQXdDLGlFQUFvQjtBQUM1RDtBQUNBO0FBQ0E7QUFDQSx3Q0FBd0MsaUVBQW9CO0FBQzVEO0FBQ0E7QUFDQTtBQUNBLHdDQUF3QyxpRUFBb0I7QUFDNUQ7QUFDQTtBQUNBO0FBQ0Esd0NBQXdDLGlFQUFvQjtBQUM1RDtBQUNBO0FBQ0E7QUFDQSx3Q0FBd0MsaUVBQW9CO0FBQzVEO0FBQ0E7QUFDQTtBQUNBLHdDQUF3QyxpRUFBb0I7QUFDNUQ7QUFDQTtBQUNBO0FBQ0Esd0NBQXdDLGlFQUFvQjtBQUM1RDtBQUNBO0FBQ0E7QUFDQSx3Q0FBd0MsaUVBQW9CO0FBQzVEO0FBQ0E7QUFDQTtBQUNBLHdDQUF3QyxpRUFBb0I7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Q0FBSztBQUNqQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwiZmlsZSI6Ii4vY29udGVudHNjcmlwdC5qcyIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiB3ZWJwYWNrVW5pdmVyc2FsTW9kdWxlRGVmaW5pdGlvbihyb290LCBmYWN0b3J5KSB7XG5cdGlmKHR5cGVvZiBleHBvcnRzID09PSAnb2JqZWN0JyAmJiB0eXBlb2YgbW9kdWxlID09PSAnb2JqZWN0Jylcblx0XHRtb2R1bGUuZXhwb3J0cyA9IGZhY3RvcnkoKTtcblx0ZWxzZSBpZih0eXBlb2YgZGVmaW5lID09PSAnZnVuY3Rpb24nICYmIGRlZmluZS5hbWQpXG5cdFx0ZGVmaW5lKFtdLCBmYWN0b3J5KTtcblx0ZWxzZSB7XG5cdFx0dmFyIGEgPSBmYWN0b3J5KCk7XG5cdFx0Zm9yKHZhciBpIGluIGEpICh0eXBlb2YgZXhwb3J0cyA9PT0gJ29iamVjdCcgPyBleHBvcnRzIDogcm9vdClbaV0gPSBhW2ldO1xuXHR9XG59KSh3aW5kb3csIGZ1bmN0aW9uKCkge1xucmV0dXJuICIsIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKSB7XG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG4gXHRcdH1cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGk6IG1vZHVsZUlkLFxuIFx0XHRcdGw6IGZhbHNlLFxuIFx0XHRcdGV4cG9ydHM6IHt9XG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmwgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGdldHRlciB9KTtcbiBcdFx0fVxuIFx0fTtcblxuIFx0Ly8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yID0gZnVuY3Rpb24oZXhwb3J0cykge1xuIFx0XHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcbiBcdFx0fVxuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xuIFx0fTtcblxuIFx0Ly8gY3JlYXRlIGEgZmFrZSBuYW1lc3BhY2Ugb2JqZWN0XG4gXHQvLyBtb2RlICYgMTogdmFsdWUgaXMgYSBtb2R1bGUgaWQsIHJlcXVpcmUgaXRcbiBcdC8vIG1vZGUgJiAyOiBtZXJnZSBhbGwgcHJvcGVydGllcyBvZiB2YWx1ZSBpbnRvIHRoZSBuc1xuIFx0Ly8gbW9kZSAmIDQ6IHJldHVybiB2YWx1ZSB3aGVuIGFscmVhZHkgbnMgb2JqZWN0XG4gXHQvLyBtb2RlICYgOHwxOiBiZWhhdmUgbGlrZSByZXF1aXJlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnQgPSBmdW5jdGlvbih2YWx1ZSwgbW9kZSkge1xuIFx0XHRpZihtb2RlICYgMSkgdmFsdWUgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKHZhbHVlKTtcbiBcdFx0aWYobW9kZSAmIDgpIHJldHVybiB2YWx1ZTtcbiBcdFx0aWYoKG1vZGUgJiA0KSAmJiB0eXBlb2YgdmFsdWUgPT09ICdvYmplY3QnICYmIHZhbHVlICYmIHZhbHVlLl9fZXNNb2R1bGUpIHJldHVybiB2YWx1ZTtcbiBcdFx0dmFyIG5zID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yKG5zKTtcbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KG5zLCAnZGVmYXVsdCcsIHsgZW51bWVyYWJsZTogdHJ1ZSwgdmFsdWU6IHZhbHVlIH0pO1xuIFx0XHRpZihtb2RlICYgMiAmJiB0eXBlb2YgdmFsdWUgIT0gJ3N0cmluZycpIGZvcih2YXIga2V5IGluIHZhbHVlKSBfX3dlYnBhY2tfcmVxdWlyZV9fLmQobnMsIGtleSwgZnVuY3Rpb24oa2V5KSB7IHJldHVybiB2YWx1ZVtrZXldOyB9LmJpbmQobnVsbCwga2V5KSk7XG4gXHRcdHJldHVybiBucztcbiBcdH07XG5cbiBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbiBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbiBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4gXHRcdHJldHVybiBnZXR0ZXI7XG4gXHR9O1xuXG4gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSBcIi4vc3JjL2pzL2NvbnRlbnRzY3JpcHQudHNcIik7XG4iLCIvKlxuICogRGF0ZSBGb3JtYXQgMS4yLjNcbiAqIChjKSAyMDA3LTIwMDkgU3RldmVuIExldml0aGFuIDxzdGV2ZW5sZXZpdGhhbi5jb20+XG4gKiBNSVQgbGljZW5zZVxuICpcbiAqIEluY2x1ZGVzIGVuaGFuY2VtZW50cyBieSBTY290dCBUcmVuZGEgPHNjb3R0LnRyZW5kYS5uZXQ+XG4gKiBhbmQgS3JpcyBLb3dhbCA8Y2l4YXIuY29tL35rcmlzLmtvd2FsLz5cbiAqXG4gKiBBY2NlcHRzIGEgZGF0ZSwgYSBtYXNrLCBvciBhIGRhdGUgYW5kIGEgbWFzay5cbiAqIFJldHVybnMgYSBmb3JtYXR0ZWQgdmVyc2lvbiBvZiB0aGUgZ2l2ZW4gZGF0ZS5cbiAqIFRoZSBkYXRlIGRlZmF1bHRzIHRvIHRoZSBjdXJyZW50IGRhdGUvdGltZS5cbiAqIFRoZSBtYXNrIGRlZmF1bHRzIHRvIGRhdGVGb3JtYXQubWFza3MuZGVmYXVsdC5cbiAqL1xuXG4oZnVuY3Rpb24oZ2xvYmFsKSB7XG4gICd1c2Ugc3RyaWN0JztcblxuICB2YXIgZGF0ZUZvcm1hdCA9IChmdW5jdGlvbigpIHtcbiAgICAgIHZhciB0b2tlbiA9IC9kezEsNH18bXsxLDR9fHl5KD86eXkpP3woW0hoTXNUdF0pXFwxP3xbTGxvU1pXTl18XCJbXlwiXSpcInwnW14nXSonL2c7XG4gICAgICB2YXIgdGltZXpvbmUgPSAvXFxiKD86W1BNQ0VBXVtTRFBdVHwoPzpQYWNpZmljfE1vdW50YWlufENlbnRyYWx8RWFzdGVybnxBdGxhbnRpYykgKD86U3RhbmRhcmR8RGF5bGlnaHR8UHJldmFpbGluZykgVGltZXwoPzpHTVR8VVRDKSg/OlstK11cXGR7NH0pPylcXGIvZztcbiAgICAgIHZhciB0aW1lem9uZUNsaXAgPSAvW14tK1xcZEEtWl0vZztcbiAgXG4gICAgICAvLyBSZWdleGVzIGFuZCBzdXBwb3J0aW5nIGZ1bmN0aW9ucyBhcmUgY2FjaGVkIHRocm91Z2ggY2xvc3VyZVxuICAgICAgcmV0dXJuIGZ1bmN0aW9uIChkYXRlLCBtYXNrLCB1dGMsIGdtdCkge1xuICBcbiAgICAgICAgLy8gWW91IGNhbid0IHByb3ZpZGUgdXRjIGlmIHlvdSBza2lwIG90aGVyIGFyZ3MgKHVzZSB0aGUgJ1VUQzonIG1hc2sgcHJlZml4KVxuICAgICAgICBpZiAoYXJndW1lbnRzLmxlbmd0aCA9PT0gMSAmJiBraW5kT2YoZGF0ZSkgPT09ICdzdHJpbmcnICYmICEvXFxkLy50ZXN0KGRhdGUpKSB7XG4gICAgICAgICAgbWFzayA9IGRhdGU7XG4gICAgICAgICAgZGF0ZSA9IHVuZGVmaW5lZDtcbiAgICAgICAgfVxuICBcbiAgICAgICAgZGF0ZSA9IGRhdGUgfHwgbmV3IERhdGU7XG4gIFxuICAgICAgICBpZighKGRhdGUgaW5zdGFuY2VvZiBEYXRlKSkge1xuICAgICAgICAgIGRhdGUgPSBuZXcgRGF0ZShkYXRlKTtcbiAgICAgICAgfVxuICBcbiAgICAgICAgaWYgKGlzTmFOKGRhdGUpKSB7XG4gICAgICAgICAgdGhyb3cgVHlwZUVycm9yKCdJbnZhbGlkIGRhdGUnKTtcbiAgICAgICAgfVxuICBcbiAgICAgICAgbWFzayA9IFN0cmluZyhkYXRlRm9ybWF0Lm1hc2tzW21hc2tdIHx8IG1hc2sgfHwgZGF0ZUZvcm1hdC5tYXNrc1snZGVmYXVsdCddKTtcbiAgXG4gICAgICAgIC8vIEFsbG93IHNldHRpbmcgdGhlIHV0Yy9nbXQgYXJndW1lbnQgdmlhIHRoZSBtYXNrXG4gICAgICAgIHZhciBtYXNrU2xpY2UgPSBtYXNrLnNsaWNlKDAsIDQpO1xuICAgICAgICBpZiAobWFza1NsaWNlID09PSAnVVRDOicgfHwgbWFza1NsaWNlID09PSAnR01UOicpIHtcbiAgICAgICAgICBtYXNrID0gbWFzay5zbGljZSg0KTtcbiAgICAgICAgICB1dGMgPSB0cnVlO1xuICAgICAgICAgIGlmIChtYXNrU2xpY2UgPT09ICdHTVQ6Jykge1xuICAgICAgICAgICAgZ210ID0gdHJ1ZTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgXG4gICAgICAgIHZhciBfID0gdXRjID8gJ2dldFVUQycgOiAnZ2V0JztcbiAgICAgICAgdmFyIGQgPSBkYXRlW18gKyAnRGF0ZSddKCk7XG4gICAgICAgIHZhciBEID0gZGF0ZVtfICsgJ0RheSddKCk7XG4gICAgICAgIHZhciBtID0gZGF0ZVtfICsgJ01vbnRoJ10oKTtcbiAgICAgICAgdmFyIHkgPSBkYXRlW18gKyAnRnVsbFllYXInXSgpO1xuICAgICAgICB2YXIgSCA9IGRhdGVbXyArICdIb3VycyddKCk7XG4gICAgICAgIHZhciBNID0gZGF0ZVtfICsgJ01pbnV0ZXMnXSgpO1xuICAgICAgICB2YXIgcyA9IGRhdGVbXyArICdTZWNvbmRzJ10oKTtcbiAgICAgICAgdmFyIEwgPSBkYXRlW18gKyAnTWlsbGlzZWNvbmRzJ10oKTtcbiAgICAgICAgdmFyIG8gPSB1dGMgPyAwIDogZGF0ZS5nZXRUaW1lem9uZU9mZnNldCgpO1xuICAgICAgICB2YXIgVyA9IGdldFdlZWsoZGF0ZSk7XG4gICAgICAgIHZhciBOID0gZ2V0RGF5T2ZXZWVrKGRhdGUpO1xuICAgICAgICB2YXIgZmxhZ3MgPSB7XG4gICAgICAgICAgZDogICAgZCxcbiAgICAgICAgICBkZDogICBwYWQoZCksXG4gICAgICAgICAgZGRkOiAgZGF0ZUZvcm1hdC5pMThuLmRheU5hbWVzW0RdLFxuICAgICAgICAgIGRkZGQ6IGRhdGVGb3JtYXQuaTE4bi5kYXlOYW1lc1tEICsgN10sXG4gICAgICAgICAgbTogICAgbSArIDEsXG4gICAgICAgICAgbW06ICAgcGFkKG0gKyAxKSxcbiAgICAgICAgICBtbW06ICBkYXRlRm9ybWF0LmkxOG4ubW9udGhOYW1lc1ttXSxcbiAgICAgICAgICBtbW1tOiBkYXRlRm9ybWF0LmkxOG4ubW9udGhOYW1lc1ttICsgMTJdLFxuICAgICAgICAgIHl5OiAgIFN0cmluZyh5KS5zbGljZSgyKSxcbiAgICAgICAgICB5eXl5OiB5LFxuICAgICAgICAgIGg6ICAgIEggJSAxMiB8fCAxMixcbiAgICAgICAgICBoaDogICBwYWQoSCAlIDEyIHx8IDEyKSxcbiAgICAgICAgICBIOiAgICBILFxuICAgICAgICAgIEhIOiAgIHBhZChIKSxcbiAgICAgICAgICBNOiAgICBNLFxuICAgICAgICAgIE1NOiAgIHBhZChNKSxcbiAgICAgICAgICBzOiAgICBzLFxuICAgICAgICAgIHNzOiAgIHBhZChzKSxcbiAgICAgICAgICBsOiAgICBwYWQoTCwgMyksXG4gICAgICAgICAgTDogICAgcGFkKE1hdGgucm91bmQoTCAvIDEwKSksXG4gICAgICAgICAgdDogICAgSCA8IDEyID8gZGF0ZUZvcm1hdC5pMThuLnRpbWVOYW1lc1swXSA6IGRhdGVGb3JtYXQuaTE4bi50aW1lTmFtZXNbMV0sXG4gICAgICAgICAgdHQ6ICAgSCA8IDEyID8gZGF0ZUZvcm1hdC5pMThuLnRpbWVOYW1lc1syXSA6IGRhdGVGb3JtYXQuaTE4bi50aW1lTmFtZXNbM10sXG4gICAgICAgICAgVDogICAgSCA8IDEyID8gZGF0ZUZvcm1hdC5pMThuLnRpbWVOYW1lc1s0XSA6IGRhdGVGb3JtYXQuaTE4bi50aW1lTmFtZXNbNV0sXG4gICAgICAgICAgVFQ6ICAgSCA8IDEyID8gZGF0ZUZvcm1hdC5pMThuLnRpbWVOYW1lc1s2XSA6IGRhdGVGb3JtYXQuaTE4bi50aW1lTmFtZXNbN10sXG4gICAgICAgICAgWjogICAgZ210ID8gJ0dNVCcgOiB1dGMgPyAnVVRDJyA6IChTdHJpbmcoZGF0ZSkubWF0Y2godGltZXpvbmUpIHx8IFsnJ10pLnBvcCgpLnJlcGxhY2UodGltZXpvbmVDbGlwLCAnJyksXG4gICAgICAgICAgbzogICAgKG8gPiAwID8gJy0nIDogJysnKSArIHBhZChNYXRoLmZsb29yKE1hdGguYWJzKG8pIC8gNjApICogMTAwICsgTWF0aC5hYnMobykgJSA2MCwgNCksXG4gICAgICAgICAgUzogICAgWyd0aCcsICdzdCcsICduZCcsICdyZCddW2QgJSAxMCA+IDMgPyAwIDogKGQgJSAxMDAgLSBkICUgMTAgIT0gMTApICogZCAlIDEwXSxcbiAgICAgICAgICBXOiAgICBXLFxuICAgICAgICAgIE46ICAgIE5cbiAgICAgICAgfTtcbiAgXG4gICAgICAgIHJldHVybiBtYXNrLnJlcGxhY2UodG9rZW4sIGZ1bmN0aW9uIChtYXRjaCkge1xuICAgICAgICAgIGlmIChtYXRjaCBpbiBmbGFncykge1xuICAgICAgICAgICAgcmV0dXJuIGZsYWdzW21hdGNoXTtcbiAgICAgICAgICB9XG4gICAgICAgICAgcmV0dXJuIG1hdGNoLnNsaWNlKDEsIG1hdGNoLmxlbmd0aCAtIDEpO1xuICAgICAgICB9KTtcbiAgICAgIH07XG4gICAgfSkoKTtcblxuICBkYXRlRm9ybWF0Lm1hc2tzID0ge1xuICAgICdkZWZhdWx0JzogICAgICAgICAgICAgICAnZGRkIG1tbSBkZCB5eXl5IEhIOk1NOnNzJyxcbiAgICAnc2hvcnREYXRlJzogICAgICAgICAgICAgJ20vZC95eScsXG4gICAgJ21lZGl1bURhdGUnOiAgICAgICAgICAgICdtbW0gZCwgeXl5eScsXG4gICAgJ2xvbmdEYXRlJzogICAgICAgICAgICAgICdtbW1tIGQsIHl5eXknLFxuICAgICdmdWxsRGF0ZSc6ICAgICAgICAgICAgICAnZGRkZCwgbW1tbSBkLCB5eXl5JyxcbiAgICAnc2hvcnRUaW1lJzogICAgICAgICAgICAgJ2g6TU0gVFQnLFxuICAgICdtZWRpdW1UaW1lJzogICAgICAgICAgICAnaDpNTTpzcyBUVCcsXG4gICAgJ2xvbmdUaW1lJzogICAgICAgICAgICAgICdoOk1NOnNzIFRUIFonLFxuICAgICdpc29EYXRlJzogICAgICAgICAgICAgICAneXl5eS1tbS1kZCcsXG4gICAgJ2lzb1RpbWUnOiAgICAgICAgICAgICAgICdISDpNTTpzcycsXG4gICAgJ2lzb0RhdGVUaW1lJzogICAgICAgICAgICd5eXl5LW1tLWRkXFwnVFxcJ0hIOk1NOnNzbycsXG4gICAgJ2lzb1V0Y0RhdGVUaW1lJzogICAgICAgICdVVEM6eXl5eS1tbS1kZFxcJ1RcXCdISDpNTTpzc1xcJ1pcXCcnLFxuICAgICdleHBpcmVzSGVhZGVyRm9ybWF0JzogICAnZGRkLCBkZCBtbW0geXl5eSBISDpNTTpzcyBaJ1xuICB9O1xuXG4gIC8vIEludGVybmF0aW9uYWxpemF0aW9uIHN0cmluZ3NcbiAgZGF0ZUZvcm1hdC5pMThuID0ge1xuICAgIGRheU5hbWVzOiBbXG4gICAgICAnU3VuJywgJ01vbicsICdUdWUnLCAnV2VkJywgJ1RodScsICdGcmknLCAnU2F0JyxcbiAgICAgICdTdW5kYXknLCAnTW9uZGF5JywgJ1R1ZXNkYXknLCAnV2VkbmVzZGF5JywgJ1RodXJzZGF5JywgJ0ZyaWRheScsICdTYXR1cmRheSdcbiAgICBdLFxuICAgIG1vbnRoTmFtZXM6IFtcbiAgICAgICdKYW4nLCAnRmViJywgJ01hcicsICdBcHInLCAnTWF5JywgJ0p1bicsICdKdWwnLCAnQXVnJywgJ1NlcCcsICdPY3QnLCAnTm92JywgJ0RlYycsXG4gICAgICAnSmFudWFyeScsICdGZWJydWFyeScsICdNYXJjaCcsICdBcHJpbCcsICdNYXknLCAnSnVuZScsICdKdWx5JywgJ0F1Z3VzdCcsICdTZXB0ZW1iZXInLCAnT2N0b2JlcicsICdOb3ZlbWJlcicsICdEZWNlbWJlcidcbiAgICBdLFxuICAgIHRpbWVOYW1lczogW1xuICAgICAgJ2EnLCAncCcsICdhbScsICdwbScsICdBJywgJ1AnLCAnQU0nLCAnUE0nXG4gICAgXVxuICB9O1xuXG5mdW5jdGlvbiBwYWQodmFsLCBsZW4pIHtcbiAgdmFsID0gU3RyaW5nKHZhbCk7XG4gIGxlbiA9IGxlbiB8fCAyO1xuICB3aGlsZSAodmFsLmxlbmd0aCA8IGxlbikge1xuICAgIHZhbCA9ICcwJyArIHZhbDtcbiAgfVxuICByZXR1cm4gdmFsO1xufVxuXG4vKipcbiAqIEdldCB0aGUgSVNPIDg2MDEgd2VlayBudW1iZXJcbiAqIEJhc2VkIG9uIGNvbW1lbnRzIGZyb21cbiAqIGh0dHA6Ly90ZWNoYmxvZy5wcm9jdXJpb3Mubmwvay9uNjE4L25ld3Mvdmlldy8zMzc5Ni8xNDg2My9DYWxjdWxhdGUtSVNPLTg2MDEtd2Vlay1hbmQteWVhci1pbi1qYXZhc2NyaXB0Lmh0bWxcbiAqXG4gKiBAcGFyYW0gIHtPYmplY3R9IGBkYXRlYFxuICogQHJldHVybiB7TnVtYmVyfVxuICovXG5mdW5jdGlvbiBnZXRXZWVrKGRhdGUpIHtcbiAgLy8gUmVtb3ZlIHRpbWUgY29tcG9uZW50cyBvZiBkYXRlXG4gIHZhciB0YXJnZXRUaHVyc2RheSA9IG5ldyBEYXRlKGRhdGUuZ2V0RnVsbFllYXIoKSwgZGF0ZS5nZXRNb250aCgpLCBkYXRlLmdldERhdGUoKSk7XG5cbiAgLy8gQ2hhbmdlIGRhdGUgdG8gVGh1cnNkYXkgc2FtZSB3ZWVrXG4gIHRhcmdldFRodXJzZGF5LnNldERhdGUodGFyZ2V0VGh1cnNkYXkuZ2V0RGF0ZSgpIC0gKCh0YXJnZXRUaHVyc2RheS5nZXREYXkoKSArIDYpICUgNykgKyAzKTtcblxuICAvLyBUYWtlIEphbnVhcnkgNHRoIGFzIGl0IGlzIGFsd2F5cyBpbiB3ZWVrIDEgKHNlZSBJU08gODYwMSlcbiAgdmFyIGZpcnN0VGh1cnNkYXkgPSBuZXcgRGF0ZSh0YXJnZXRUaHVyc2RheS5nZXRGdWxsWWVhcigpLCAwLCA0KTtcblxuICAvLyBDaGFuZ2UgZGF0ZSB0byBUaHVyc2RheSBzYW1lIHdlZWtcbiAgZmlyc3RUaHVyc2RheS5zZXREYXRlKGZpcnN0VGh1cnNkYXkuZ2V0RGF0ZSgpIC0gKChmaXJzdFRodXJzZGF5LmdldERheSgpICsgNikgJSA3KSArIDMpO1xuXG4gIC8vIENoZWNrIGlmIGRheWxpZ2h0LXNhdmluZy10aW1lLXN3aXRjaCBvY2N1cnJlZCBhbmQgY29ycmVjdCBmb3IgaXRcbiAgdmFyIGRzID0gdGFyZ2V0VGh1cnNkYXkuZ2V0VGltZXpvbmVPZmZzZXQoKSAtIGZpcnN0VGh1cnNkYXkuZ2V0VGltZXpvbmVPZmZzZXQoKTtcbiAgdGFyZ2V0VGh1cnNkYXkuc2V0SG91cnModGFyZ2V0VGh1cnNkYXkuZ2V0SG91cnMoKSAtIGRzKTtcblxuICAvLyBOdW1iZXIgb2Ygd2Vla3MgYmV0d2VlbiB0YXJnZXQgVGh1cnNkYXkgYW5kIGZpcnN0IFRodXJzZGF5XG4gIHZhciB3ZWVrRGlmZiA9ICh0YXJnZXRUaHVyc2RheSAtIGZpcnN0VGh1cnNkYXkpIC8gKDg2NDAwMDAwKjcpO1xuICByZXR1cm4gMSArIE1hdGguZmxvb3Iod2Vla0RpZmYpO1xufVxuXG4vKipcbiAqIEdldCBJU08tODYwMSBudW1lcmljIHJlcHJlc2VudGF0aW9uIG9mIHRoZSBkYXkgb2YgdGhlIHdlZWtcbiAqIDEgKGZvciBNb25kYXkpIHRocm91Z2ggNyAoZm9yIFN1bmRheSlcbiAqIFxuICogQHBhcmFtICB7T2JqZWN0fSBgZGF0ZWBcbiAqIEByZXR1cm4ge051bWJlcn1cbiAqL1xuZnVuY3Rpb24gZ2V0RGF5T2ZXZWVrKGRhdGUpIHtcbiAgdmFyIGRvdyA9IGRhdGUuZ2V0RGF5KCk7XG4gIGlmKGRvdyA9PT0gMCkge1xuICAgIGRvdyA9IDc7XG4gIH1cbiAgcmV0dXJuIGRvdztcbn1cblxuLyoqXG4gKiBraW5kLW9mIHNob3J0Y3V0XG4gKiBAcGFyYW0gIHsqfSB2YWxcbiAqIEByZXR1cm4ge1N0cmluZ31cbiAqL1xuZnVuY3Rpb24ga2luZE9mKHZhbCkge1xuICBpZiAodmFsID09PSBudWxsKSB7XG4gICAgcmV0dXJuICdudWxsJztcbiAgfVxuXG4gIGlmICh2YWwgPT09IHVuZGVmaW5lZCkge1xuICAgIHJldHVybiAndW5kZWZpbmVkJztcbiAgfVxuXG4gIGlmICh0eXBlb2YgdmFsICE9PSAnb2JqZWN0Jykge1xuICAgIHJldHVybiB0eXBlb2YgdmFsO1xuICB9XG5cbiAgaWYgKEFycmF5LmlzQXJyYXkodmFsKSkge1xuICAgIHJldHVybiAnYXJyYXknO1xuICB9XG5cbiAgcmV0dXJuIHt9LnRvU3RyaW5nLmNhbGwodmFsKVxuICAgIC5zbGljZSg4LCAtMSkudG9Mb3dlckNhc2UoKTtcbn07XG5cblxuXG4gIGlmICh0eXBlb2YgZGVmaW5lID09PSAnZnVuY3Rpb24nICYmIGRlZmluZS5hbWQpIHtcbiAgICBkZWZpbmUoZnVuY3Rpb24gKCkge1xuICAgICAgcmV0dXJuIGRhdGVGb3JtYXQ7XG4gICAgfSk7XG4gIH0gZWxzZSBpZiAodHlwZW9mIGV4cG9ydHMgPT09ICdvYmplY3QnKSB7XG4gICAgbW9kdWxlLmV4cG9ydHMgPSBkYXRlRm9ybWF0O1xuICB9IGVsc2Uge1xuICAgIGdsb2JhbC5kYXRlRm9ybWF0ID0gZGF0ZUZvcm1hdDtcbiAgfVxufSkodGhpcyk7XG4iLCJcInVzZSBzdHJpY3RcIjtcbmltcG9ydCBVdGlscyBmcm9tIFwiLi9VdGlsc1wiO1xuaW1wb3J0IFBpbmdSZXN1bHQgZnJvbSBcIi4vZW50aXRpZXMvUGluZ1Jlc3VsdFwiO1xuaW1wb3J0IENtcFR5cGUgZnJvbSBcIi4vY21wL0NtcFR5cGVcIjtcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEJhY2tlbmRDYWxsIHtcbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgICAgdGhpcy5fY21wID0gXCJuYVwiO1xuICAgICAgICB0aGlzLl9jbXBTY3JpcHRVcmwgPSBcIm5hXCI7XG4gICAgICAgIHRoaXMuX3BpbmdSZXN1bHQgPSB7fTtcbiAgICAgICAgdGhpcy5faW1wbGVtZW50ZWQgPSBmYWxzZTtcbiAgICAgICAgLy8gdGhpcyBpcyBmb3IgdGhlIHN0YXRlcy5cbiAgICAgICAgdGhpcy5faXNTdWNjZXNzZnVsQmxvY2sgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5faXNQaW5nUmVzdWx0UmVjZWl2ZWQgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5fZGF0YVJlY2VpdmVkID0gZmFsc2U7XG4gICAgfVxuICAgIHN0YXRpYyBnZXQgcGFnZU5hbWUoKSB7XG4gICAgICAgIHJldHVybiBCYWNrZW5kQ2FsbC5fZnJvbVBhZ2U7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIFNldHRlciBmb3IgdGhlIFBpbmcgUmVzdWx0LCBpZiB3ZSBmaW5kIGEgQ01QIG9uIHRoZSBQYWdlXG4gICAgICpcbiAgICAgKiBAcGFyYW0gcGluZ1Jlc3VsdFxuICAgICAqL1xuICAgIHNldCBwaW5nUmVzdWx0KHBpbmdSZXN1bHQpIHtcbiAgICAgICAgVXRpbHMubG9nKFwiUGluZ2JhY2sgaW4gQmFja2VuZENhbGwgc2V0OiBcIiArIHBpbmdSZXN1bHQpO1xuICAgICAgICB0aGlzLl9waW5nUmVzdWx0ID0gUGluZ1Jlc3VsdC5jbGFzcyhwaW5nUmVzdWx0KTtcbiAgICAgICAgdGhpcy5faXNQaW5nUmVzdWx0UmVjZWl2ZWQgPSB0cnVlO1xuICAgICAgICAvLyBpZiB0aGUgQ01QIHdhcyBhbHJlYWR5IGNsaWNrZWQsIGRvIHRoZSBiYWNrZW5kIGNhbGxcbiAgICAgICAgLy8gd2Ugb25seSBkbyB0aGlzIGNhbGwsIGlmIHRoZSBDTVAgaXMgX05PVF8gaW1wbGVtZW50ZWQuIElmIHdlIHRoZSBDTVAgaXMgaW1wbGVtZW50ZWQsIHdlIHdhaXQgZm9yIGFyZXNwb25zZVxuICAgICAgICAvLyBmcm9tIHRoZSBKYXZhU2NyaXB0IERldGVjdG9yLlxuICAgICAgICBpZiAodGhpcy5fZGF0YVJlY2VpdmVkKSB7XG4gICAgICAgICAgICBpZiAodGhpcy5faW1wbGVtZW50ZWQgJiYgdGhpcy5faXNTdWNjZXNzZnVsQmxvY2spIHtcbiAgICAgICAgICAgICAgICBVdGlscy5sb2coXCJXZSBoYXZlIGFuIGltcGxlbWVudGVkIGZvciBDTVAgYW5kIHN1Y2Nlc2Z1bCBCbG9jayBoYXBwZW5kLiBTZW50IEJhY2tlbmQgY2FsbFwiKTtcbiAgICAgICAgICAgICAgICAvLyBjaGVjayBpZiB0aGVyZSBpcyBhIHRpbWVvdXQgYW5kIGNhbmNlbCBpZiBuZWNlc3NhcnkuXG4gICAgICAgICAgICAgICAgY2xlYXJUaW1lb3V0KHRoaXMuX3RpbWVvdXRGb3JCYWNrZW5kQ2FsbCk7XG4gICAgICAgICAgICAgICAgLy8gdHJpZ2dlciB0aGUgY2FsbCByaWdodCBub3cuXG4gICAgICAgICAgICAgICAgdGhpcy50cmlnZ2VyQ2FsbCgpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSBpZiAodGhpcy5faW1wbGVtZW50ZWQgJiYgIXRoaXMuX2lzU3VjY2Vzc2Z1bEJsb2NrKSB7XG4gICAgICAgICAgICAgICAgVXRpbHMubG9nKFwiV2UgaGF2ZSBhbiBpbXBsZW1lbnRhdGlvbiwgYnV0IG5vdCB5ZXQgYSBzdWNjZXNzZnVsIGJsb2NrLiBXZSBkb24ndCBkbyBhbnl0aGluZy4gc3VjY2Vzc2Z1bEJsb2MoKSB3aWxsIGhhbmRsZVwiKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2UgaWYgKCF0aGlzLl9pbXBsZW1lbnRlZCAmJiB0aGlzLl9pc1N1Y2Nlc3NmdWxCbG9jaykge1xuICAgICAgICAgICAgICAgIFV0aWxzLmxvZyhcIlRoaXMgQ01QIGlzIG5vdCB5ZXQgaW1wbGVtZW50ZWQgKG9yIG5vdCB5ZXQgc2V0KVwiKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIFV0aWxzLmxvZyhcIlRoZXJlIGlzIG5vIGltcGxlbWVudGF0aW9uIGFuZCBubyBzdWNjZXNzZnVsIEJvY2tcIik7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICBVdGlscy5sb2coXCJXZSBkb24ndCBoYXZlIGEgQ01QIEltcGxlbWVudGF0aW9uIHlldCwgYnV0IGFscmVhZHkgUGluZ0JhY2sgRGF0YS4gRm9yIFNhZnRleSBSZWFzb25zLCB3ZSBzY2hlZHVsZSBiYWNrZW5kY2FsbFwiKTtcbiAgICAgICAgICAgIHRoaXMuX3RpbWVvdXRGb3JCYWNrZW5kQ2FsbCA9IHNldFRpbWVvdXQodGhpcy50cmlnZ2VyQ2FsbC5iaW5kKHRoaXMpLCA1MDAwKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBjbXBEYXRhKGNtcElkLCBjbXAsIGNtcFNjcmlwdFVybCwgdHlwZSwgaW1wbGVtZW50ZWQpIHtcbiAgICAgICAgVXRpbHMubG9nKFwiRGF0YSBzZXQgYnkgQ01QXCIpO1xuICAgICAgICB0aGlzLl9jbXBJZCA9IGNtcElkO1xuICAgICAgICB0aGlzLl9jbXAgPSBjbXA7XG4gICAgICAgIHRoaXMuX2NtcFNjcmlwdFVybCA9IGNtcFNjcmlwdFVybDtcbiAgICAgICAgdGhpcy5fdHlwZSA9IHR5cGU7XG4gICAgICAgIHRoaXMuX2ltcGxlbWVudGVkID0gaW1wbGVtZW50ZWQ7XG4gICAgICAgIHRoaXMuX2RhdGFSZWNlaXZlZCA9IHRydWU7XG4gICAgfVxuICAgIHN1Y2Nlc3NmdWxCbG9jaygpIHtcbiAgICAgICAgVXRpbHMubG9nKFwic3VjY2VmdWxibG9jayBpbiBCYWNrZW5kQ2FsbFwiKTtcbiAgICAgICAgdGhpcy5faXNTdWNjZXNzZnVsQmxvY2sgPSB0cnVlO1xuICAgICAgICBpZiAodGhpcy5faXNQaW5nUmVzdWx0UmVjZWl2ZWQpIHtcbiAgICAgICAgICAgIFV0aWxzLmxvZyhcIlBpbmcgaXMgaGVyZSwgc3VjY2Vzc2Z1bCBib2NrIHRvby4gVHJpZ2dlciBCYWNrZW5kQ2FsbFwiKTtcbiAgICAgICAgICAgIC8vIGNoZWNrIGlmIHRoZXJlIGlzIGEgdGltZW91dCBhbmQgY2FuY2VsIGlmIG5lY2Vzc2FyeS5cbiAgICAgICAgICAgIGNsZWFyVGltZW91dCh0aGlzLl90aW1lb3V0Rm9yQmFja2VuZENhbGwpO1xuICAgICAgICAgICAgLy8gd2UgaGF2ZSBldmVyeXRoaW5nLCB0cmlnZ2VyIGJhY2tlbmQgY2FsbFxuICAgICAgICAgICAgdGhpcy50cmlnZ2VyQ2FsbCgpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgLy8gU2VuZGluZyB0byBCYWNrZ3JvdW5kIFNjcmlwdFxuICAgICAgICAgICAgc3dpdGNoICh0aGlzLl90eXBlKSB7XG4gICAgICAgICAgICAgICAgY2FzZSBDbXBUeXBlLldBSVRfRk9SX0FTWU5DX0NBTExCQUNLOlxuICAgICAgICAgICAgICAgICAgICAvLyBpZiB3ZSB3YWl0IGZvciB0aGUgY2FsbGJhY2ssIHRoZSBiYWNrZW5kIGNhbGwgaXMgZG9uZSBpbiB0aGUgJ3NldFBpbmdSZXN1bHQnO1xuICAgICAgICAgICAgICAgICAgICAvLyB3ZSBhbHJlYWR5IGhhdmUgY2xpY2sgYXdheSB0aGUgQ01QIHNvLCB3YWl0IGZvciB0aGUgcGluZ3Jlc3VsdCBhbmQgZ28uXG4gICAgICAgICAgICAgICAgICAgIFV0aWxzLmxvZyhcIldlIGFyZSB3YWl0aW5nIGZvciB0aGUgV2Vic2l0ZSB0byBzZW5kIHRoZSBQaW5nUmVzdWx0XCIpO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlIENtcFR5cGUuV0FJVF9GT1JfVElNRV9GUkFNRTpcbiAgICAgICAgICAgICAgICAgICAgVXRpbHMubG9nKFwiV2UgYXJlIHdhaXRpbmcgZml2ZSBzZWNvbmRzIHRvIHRyaWdnZXIgdGhlIGJhY2tlbmQgY2FsbFwiKTtcbiAgICAgICAgICAgICAgICAgICAgY2xlYXJUaW1lb3V0KHRoaXMuX3RpbWVvdXRGb3JCYWNrZW5kQ2FsbCk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX3RpbWVvdXRGb3JCYWNrZW5kQ2FsbCA9IHNldFRpbWVvdXQodGhpcy50cmlnZ2VyQ2FsbC5iaW5kKHRoaXMpLCA1MDAwKTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSBDbXBUeXBlLkRPX05PVF9XQUlUOlxuICAgICAgICAgICAgICAgICAgICBVdGlscy5sb2coXCJXZSBUcmlnZ2VyIHRoZSBCYWNrZW5kIENhbGwgcmlnaHQgbm93XCIpO1xuICAgICAgICAgICAgICAgICAgICBjbGVhclRpbWVvdXQodGhpcy5fdGltZW91dEZvckJhY2tlbmRDYWxsKTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy50cmlnZ2VyQ2FsbCgpO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJVbmtub3duIENNUCBUeXBlXCIpO1xuICAgICAgICAgICAgfSAvLyBzd2l0Y2hcbiAgICAgICAgfVxuICAgIH1cbiAgICAvKipcbiAgICAgKiBBY3R1YWwgTWV0aG9kIHRvIHRyaWdnZXIgdGhlIGJhY2tlbmQgY2FsbC4gQ2FuIGJlIHRyaWdnZXJlZCBmcm9tIHZhcmlvdXMgZnVuY3Rpb25zXG4gICAgICovXG4gICAgdHJpZ2dlckNhbGwoKSB7XG4gICAgICAgIFV0aWxzLmxvZyhcIkNhbGwgbm93IFRyaWdnZXJlZFwiKTtcbiAgICAgICAgLy8gSWYgdGhlIENNUC1JRCBpcyBub3Qgc2V0IGluIHRoZSBQaW5nIFJlc3VsdCwgcHV0IGl0IHRoZXJlLlxuICAgICAgICBpZiAodHlwZW9mIHRoaXMuX3BpbmdSZXN1bHQuY21wSWQgPT09IFwidW5kZWZpbmVkXCIpIHtcbiAgICAgICAgICAgIHRoaXMuX3BpbmdSZXN1bHQuY21wSWQgPSB0aGlzLl9jbXBJZDtcbiAgICAgICAgfVxuICAgICAgICAvLyB3ZSBhcmUgc2VuZGluZyBzZXBlcmF0IGNvbXBvbmVudHMgaW4gJ3NlbmRNZXNzYWdlKCknIGFzIGluIHRoZSBCYWNrZW5kQ2FsbCwgd2UgZG9uJ3Qga25vdyB0aGUgVVJMLlxuICAgICAgICAvLyB0aGlzIGNsYXNzIGlzIHBhcnQgb2YgdGhlIGNvbnRlbnQtU2NyaXB0IGFuZCBoYXMgbm8gYWNjZXNzIHRvIHRoZSBVUkwuXG4gICAgICAgIGlmIChzYWZhcmkuZXh0ZW5zaW9uKSB7XG4gICAgICAgICAgICBVdGlscy5sb2coXCIrKysgUnVubmluZyBvbiBTYWZhcmkgKysrXCIpO1xuICAgICAgICAgICAgZXZhbChcInNhZmFyaS5leHRlbnNpb24uZGlzcGF0Y2hNZXNzYWdlKCdzb21lTWVzc2FnZScsIHtjbXA6IHRoaXMuX2NtcCxcIiArXG4gICAgICAgICAgICAgICAgXCJjbXBTY3JpcFVybDogdGhpcy5fY21wU2NyaXB0VXJsLFwiICtcbiAgICAgICAgICAgICAgICBcInBpbmdSZXN1bHQ6IHRoaXMuX3BpbmdSZXN1bHQsXCIgK1xuICAgICAgICAgICAgICAgIFwiaW1wbGVtZW50ZWQ6IHRoaXMuX2ltcGxlbWVudGVkLFwiICtcbiAgICAgICAgICAgICAgICBcImZyb206IEJhY2tlbmRDYWxsLnBhZ2VOYW1lfSlcIik7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAoY2hyb21lLnJ1bnRpbWUpIHtcbiAgICAgICAgICAgIGNocm9tZS5ydW50aW1lLnNlbmRNZXNzYWdlKHtcbiAgICAgICAgICAgICAgICBjbXA6IHRoaXMuX2NtcCxcbiAgICAgICAgICAgICAgICBjbXBTY3JpcFVybDogdGhpcy5fY21wU2NyaXB0VXJsLFxuICAgICAgICAgICAgICAgIHBpbmdSZXN1bHQ6IHRoaXMuX3BpbmdSZXN1bHQsXG4gICAgICAgICAgICAgICAgaW1wbGVtZW50ZWQ6IHRoaXMuX2ltcGxlbWVudGVkLFxuICAgICAgICAgICAgICAgIGZyb206IEJhY2tlbmRDYWxsLnBhZ2VOYW1lXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIFV0aWxzLmxvZyhcIisrKyBSdW5uaW5nIG9uIENocm9taXVtIFBsYXRmb3JtICsrK1wiKTtcbiAgICAgICAgfVxuICAgIH1cbn1cbkJhY2tlbmRDYWxsLl9mcm9tUGFnZSA9IFwiYmFja2VuZENhbGxcIjtcbiIsIlwidXNlIHN0cmljdFwiO1xuaW1wb3J0IFV0aWxzIGZyb20gXCIuL1V0aWxzXCI7XG5pbXBvcnQgVHJ1c3RBcmNJRnJhbWUgZnJvbSBcIi4vY21wL1RydXN0QXJjSUZyYW1lXCI7XG5pbXBvcnQgVHJ1c3RBcmNCYW5uZXIgZnJvbSBcIi4vY21wL1RydXN0QXJjQmFubmVyXCI7XG5pbXBvcnQgRXZpZG9uIGZyb20gXCIuL2NtcC9Fdmlkb25cIjtcbmltcG9ydCBDdXN0b21JbXBsIGZyb20gXCIuL2NtcC9DdXN0b21JbXBsXCI7XG5pbXBvcnQgT25lVHJ1c3QgZnJvbSBcIi4vY21wL09uZVRydXN0XCI7XG5pbXBvcnQgQ29va2llQm90IGZyb20gXCIuL2NtcC9Db29raWVCb3RcIjtcbmltcG9ydCBVc2VyQ2VudHJpY3MgZnJvbSBcIi4vY21wL1VzZXJDZW50cmljc1wiO1xuaW1wb3J0IFF1YW50Q2FzdCBmcm9tIFwiLi9jbXAvUXVhbnRDYXN0XCI7XG5pbXBvcnQgVHJhZmZlY3RpdmUgZnJvbSBcIi4vY21wL1RyYWZmZWN0aXZlXCI7XG5pbXBvcnQgQ29uc2VudE1hbmFnZXIgZnJvbSBcIi4vY21wL0NvbnNlbnRNYW5hZ2VyXCI7XG5pbXBvcnQgTm90WWV0SW1wbGVtZW50ZWRDbXAgZnJvbSBcIi4vY21wL05vWWV0SW1wbGVtZW50ZWRDbXBcIjtcbmltcG9ydCBCYWNrZW5kQ2FsbCBmcm9tIFwiLi9CYWNrZW5kQ2FsbFwiO1xuaW1wb3J0IENoYW5kYWdvIGZyb20gXCIuL2NtcC9DaGFuZGFnb1wiO1xuaW1wb3J0IE9hdGhDbXAgZnJvbSBcIi4vY21wL09hdGhDbXBcIjtcbmltcG9ydCBTb3VyY2VQb2ludCBmcm9tIFwiLi9jbXAvU291cmNlUG9pbnRcIjtcbmltcG9ydCBEaURvTWkgZnJvbSBcIi4vY21wL0RpRG9NaVwiO1xuaW1wb3J0IEJvcmxhYnMgZnJvbSBcIi4vY21wL0JvcmxhYnNcIjtcbi8vIHRoaXMgaXMgc29tZSBzdGF0aWMgc3R1ZmYgZm9yIHRoZSBsb25nIHRhaWwuXG5jb25zdCBidXR0b25zID0ge1xuICAgICdhI2hzLWV1LWRlY2xpbmUtYnV0dG9uJzogXCJucG1qcy5jb21cIixcbiAgICBcImEjY29va2llX2FjdGlvbl9jbG9zZV9oZWFkZXJcIjogXCJ0ZWFsaXVtLmNvbVwiLFxuICAgIFwiYnV0dG9uI2dkcHItYmFubmVyLWFjY2VwdFwiOiBcImViYXkuY29tICYgZWJheS1rbGVpbmFuemVpZ2VuLmNvbVwiLFxuICAgIFwiYnV0dG9uI2FjY2VwdEFsbEJ1dHRvblwiOiBcIlBheVBhbFwiLFxuICAgIFwic3BhbiNjbXB3ZWxjb21lYnRubm9cIjogXCJXb3JkcHJlc3MgUGx1Z2luIGh0dHBzOi8vd3d3LnRla3R1dG9yaWFsc2h1Yi5jb20vXCIsXG4gICAgXCJhLmNtcGJveGJ0bm5vXCI6IFwiV29yZHByZXNzIFBsdWdpbiB3d3cubXlrb25nLmNvbVwiLFxuICAgIFwicC5fYnJsYnMtcmVmdXNlLWJ0blwiOiBcIldvcmRwcmVzcyBQbHVnaW4gaHR0cHM6Ly93d3cuc3RhdWJzYXVnZXItYmVyYXRlci5kZS8gKEJvcmxhYnMpXCJcbn07XG5jb25zdCBjb25maWcgPSB7IGF0dHJpYnV0ZXM6IHRydWUsIGNoaWxkTGlzdDogdHJ1ZSwgc3VidHJlZTogdHJ1ZSB9O1xuZXhwb3J0IGRlZmF1bHQgY2xhc3MgRGV0ZWN0b3Ige1xuICAgIGNvbnN0cnVjdG9yKGRvY3VtZW50LCBpbklmcmFtZSkge1xuICAgICAgICB0aGlzLl9kb2N1bWVudCA9IGRvY3VtZW50O1xuICAgICAgICB0aGlzLl9iYWNrZW5kQ2FsbCA9IG5ldyBCYWNrZW5kQ2FsbCgpO1xuICAgICAgICB0aGlzLl9pbklGcmFtZSA9IGluSWZyYW1lO1xuICAgIH1cbiAgICBzZXQgcGluZ1Jlc3VsdChwaW5nUmVzdWx0KSB7XG4gICAgICAgIHRoaXMuX2JhY2tlbmRDYWxsLnBpbmdSZXN1bHQgPSBwaW5nUmVzdWx0O1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBDb25uZWN0aW9uIHRvIHRoZSBPYnNlcnZlciBpcyBvdXRzb3VyY2VkIG91dCBvZiB0aGUgQ29uc3RydWN0b3IgaW4gb3JkZXIgdG8gaGF2ZSB0aGUgT2JqZWN0IGluaXRpYWxpemVkIGZpcnN0LlxuICAgICAqIE9ubHkgYWZ0ZXIgdGhhdCB0aGUgb2JzZXJ2ZXIgY2FuIGJlIHJlZ2lzdGVyZWQgaW4gYSBzYXZlIHdheS5cbiAgICAgKi9cbiAgICBjb25uZWN0T2JzZXJ2ZXIoKSB7XG4gICAgICAgIC8vIE9wdGlvbnMgZm9yIHRoZSBvYnNlcnZlciAod2hpY2ggbXV0YXRpb25zIHRvIG9ic2VydmUpXG4gICAgICAgIGxldCBzZWxmID0gdGhpcztcbiAgICAgICAgdGhpcy5fb2JzZXJ2ZXJGb3JTY3JpcHRTb3VyY2UgPSBuZXcgTXV0YXRpb25PYnNlcnZlcihmdW5jdGlvbiAobXV0YXRpb25zKSB7XG4gICAgICAgICAgICBzZWxmLmhhbmRsZUNNUChtdXRhdGlvbnMpO1xuICAgICAgICB9KTtcbiAgICAgICAgLy8gU2VsZWN0IHRoZSBub2RlIHRoYXQgd2lsbCBiZSBvYnNlcnZlZCBmb3IgbXV0YXRpb25zXG4gICAgICAgIHRoaXMuX29ic2VydmVyRm9yU2NyaXB0U291cmNlLm9ic2VydmUodGhpcy5fZG9jdW1lbnQuZ2V0Um9vdE5vZGUoKSwgY29uZmlnKTtcbiAgICB9XG4gICAgZGlzY29ubmVjdE9ic2VydmVyKCkge1xuICAgICAgICB0aGlzLl9vYnNlcnZlckZvclNjcmlwdFNvdXJjZS5kaXNjb25uZWN0KCk7XG4gICAgfVxuICAgIGhhbmRsZUNNUChtdXRhdGlvbnMpIHtcbiAgICAgICAgbGV0IGFsbFNjcmlwdFRhZ3MgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFwic2NyaXB0XCIpO1xuICAgICAgICBsZXQgc2NyaXB0Q291bnRlcjtcbiAgICAgICAgaWYgKHRoaXMuX2NtcCkge1xuICAgICAgICAgICAgVXRpbHMubG9nKFwiQ01QIERlZmluZWQgKHdlIHNob3VsZCBuZXZlciBlbmQgdXAgaGVyZSwgYXMgdGhlIG9ic2VydmVyIHdpbGwgZGlzY29ubmVjdCwgaWYgdGhpcy5fY21wIGlzIHNldFwiKTtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICAvLyBzb21lIENNUHMgcnVuIGluIGlGcmFtZXMgYW5kIHRoZXJlZm9yZSByZXF1aXJlIGRpZmZlcmVudCBoYW5kbGluZy5cbiAgICAgICAgaWYgKHRoaXMuX2luSUZyYW1lKSB7XG4gICAgICAgICAgICBVdGlscy5sb2coXCJpRnJhbWUgU2NyOiBcIiArIGRvY3VtZW50LmxvY2F0aW9uLnRvU3RyaW5nKCkpO1xuICAgICAgICAgICAgaWYgKGRvY3VtZW50LmxvY2F0aW9uLnRvU3RyaW5nKCkuaW5jbHVkZXMoXCJzcC1wcm9kLm5ldFwiKSB8fCBkb2N1bWVudC5sb2NhdGlvbi50b1N0cmluZygpLmluY2x1ZGVzKFwic291cmNlcG9pbnQubWdyLmNvbnNlbnN1Lm9yZ1wiKSkge1xuICAgICAgICAgICAgICAgIFV0aWxzLmxvZyhcIlNQOiBcIiArIGRvY3VtZW50LmxvY2F0aW9uLnRvU3RyaW5nKCkpO1xuICAgICAgICAgICAgICAgIHRoaXMuX2NtcCA9IG5ldyBTb3VyY2VQb2ludCh0aGlzLl9kb2N1bWVudCwgZG9jdW1lbnQubG9jYXRpb24udG9TdHJpbmcoKSwgdGhpcy5fYmFja2VuZENhbGwpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSBpZiAoZG9jdW1lbnQubG9jYXRpb24udG9TdHJpbmcoKS5pbmNsdWRlcyhcInRydXN0YXJjLmNvbVwiKSkge1xuICAgICAgICAgICAgICAgIHRoaXMuX2NtcCA9IG5ldyBUcnVzdEFyY0lGcmFtZSh0aGlzLl9kb2N1bWVudCwgZG9jdW1lbnQubG9jYXRpb24udG9TdHJpbmcoKSwgdGhpcy5fYmFja2VuZENhbGwpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSBpZiAoZG9jdW1lbnQubG9jYXRpb24udG9TdHJpbmcoKS5pbmNsdWRlcyhcIi9jbXB1aS5odG1sXCIpICYmIGRvY3VtZW50LmxvY2F0aW9uLnRvU3RyaW5nKCkuaW5jbHVkZXMoXCJjb25zZW50XCIpKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5fY21wID0gbmV3IE9hdGhDbXAodGhpcy5fZG9jdW1lbnQsIGRvY3VtZW50LmxvY2F0aW9uLnRvU3RyaW5nKCksIHRoaXMuX2JhY2tlbmRDYWxsKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIC8vIG5vdCBmb3VuZC5cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICAvLyBOb3QgaW4gSUZyYW1lLlxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIC8vIHRoaXMgaXMgdGhlIGp1bXAgcG9pbnQgd2UgcmVxdWlyZWQgZm9yIHRoZSBuZXN0ZWQgbG9vcFxuICAgICAgICAgICAgYWxsU2NyaXB0czogZm9yIChzY3JpcHRDb3VudGVyID0gMDsgc2NyaXB0Q291bnRlciA8IGFsbFNjcmlwdFRhZ3MubGVuZ3RoOyBzY3JpcHRDb3VudGVyKyspIHtcbiAgICAgICAgICAgICAgICBsZXQgdXJsT2ZTY3JpcHQgPSBhbGxTY3JpcHRUYWdzW3NjcmlwdENvdW50ZXJdLmdldEF0dHJpYnV0ZShcInNyY1wiKTtcbiAgICAgICAgICAgICAgICBpZiAodXJsT2ZTY3JpcHQgJiYgdHlwZW9mIHVybE9mU2NyaXB0ICE9PSAndW5kZWZpbmVkJykge1xuICAgICAgICAgICAgICAgICAgICAvLyBpZiB0aGUgc2NyaXB0IGRlZmluZWQsIG1ha2UgaXQgbG93ZXJjYXNlLlxuICAgICAgICAgICAgICAgICAgICB1cmxPZlNjcmlwdCA9IHVybE9mU2NyaXB0LnRvTG93ZXJDYXNlKCk7XG4gICAgICAgICAgICAgICAgICAgIC8vIFV0aWxzLmxvZyh1cmxPZlNjcmlwdCk7XG4gICAgICAgICAgICAgICAgICAgIGlmICh1cmxPZlNjcmlwdC5pbmNsdWRlcygndHJ1c3RlLmNvbScpIHx8IHVybE9mU2NyaXB0LmluY2x1ZGVzKCd0cnVzdGFyYy5jb20nKSB8fCB1cmxPZlNjcmlwdC5pbmNsdWRlcygndHJ1c3RhcmMubWdyLmNvbnNlbnN1Lm9yZycpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLl9jbXAgPSBuZXcgVHJ1c3RBcmNCYW5uZXIodGhpcy5fZG9jdW1lbnQsIHVybE9mU2NyaXB0LCB0aGlzLl9iYWNrZW5kQ2FsbCk7XG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBlbHNlIGlmICh1cmxPZlNjcmlwdC5pbmNsdWRlcygnZXZpZG9uLmNvbScpIHx8IHVybE9mU2NyaXB0LmluY2x1ZGVzKFwiZXZpZG9uLm1nci5jb25zZW5zdS5vcmdcIikpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuX2NtcCA9IG5ldyBFdmlkb24odGhpcy5fZG9jdW1lbnQsIHVybE9mU2NyaXB0LCB0aGlzLl9iYWNrZW5kQ2FsbCk7XG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBlbHNlIGlmICh1cmxPZlNjcmlwdC5pbmNsdWRlcygnY29va2llbGF3Lm9yZycpIHx8IHVybE9mU2NyaXB0LmluY2x1ZGVzKCdjb29raWVwcm8uY29tJykgfHwgdXJsT2ZTY3JpcHQuaW5jbHVkZXMoJ29uZXRydXN0Lm1nci5jb25zZW5zdS5vcmcnKSB8fCB1cmxPZlNjcmlwdC5pbmNsdWRlcygnb3B0YW5vbicpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLl9jbXAgPSBuZXcgT25lVHJ1c3QodGhpcy5fZG9jdW1lbnQsIHVybE9mU2NyaXB0LCB0aGlzLl9iYWNrZW5kQ2FsbCk7XG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBlbHNlIGlmICh1cmxPZlNjcmlwdC5pbmNsdWRlcygnY29va2llYm90LmNvbScpIHx8IHVybE9mU2NyaXB0LmluY2x1ZGVzKFwiY29va2llYm90Lm1nci5jb25zZW5zdS5vcmdcIikpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuX2NtcCA9IG5ldyBDb29raWVCb3QodGhpcy5fZG9jdW1lbnQsIHVybE9mU2NyaXB0LCB0aGlzLl9iYWNrZW5kQ2FsbCk7XG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBlbHNlIGlmICh1cmxPZlNjcmlwdC5pbmNsdWRlcygndXNlcmNlbnRyaWNzLmV1JykgfHwgdXJsT2ZTY3JpcHQuaW5jbHVkZXMoJ3VzZXJjZW50cmljcy5tZ3IuY29uc2Vuc3Uub3JnJykpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuX2NtcCA9IG5ldyBVc2VyQ2VudHJpY3ModGhpcy5fZG9jdW1lbnQsIHVybE9mU2NyaXB0LCB0aGlzLl9iYWNrZW5kQ2FsbCk7XG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBlbHNlIGlmICh1cmxPZlNjcmlwdC5pbmNsdWRlcygncXVhbnRjYXN0LmNvbScpIHx8IHVybE9mU2NyaXB0LmluY2x1ZGVzKFwicXVhbnRjYXN0Lm1nci5jb25zZW5zdS5vcmdcIikpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuX2NtcCA9IG5ldyBRdWFudENhc3QodGhpcy5fZG9jdW1lbnQsIHVybE9mU2NyaXB0LCB0aGlzLl9iYWNrZW5kQ2FsbCk7XG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBlbHNlIGlmICh1cmxPZlNjcmlwdC5pbmNsdWRlcygndHJhZmZlY3RpdmUuY29tJykgfHwgdXJsT2ZTY3JpcHQuaW5jbHVkZXMoJ3RyYWZmZWN0aXZlLm1nci5jb25zZW5zdS5vcmcnKSB8fCB1cmxPZlNjcmlwdC5pbmNsdWRlcygnY2RudHJmLmNvbScpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLl9jbXAgPSBuZXcgVHJhZmZlY3RpdmUodGhpcy5fZG9jdW1lbnQsIHVybE9mU2NyaXB0LCB0aGlzLl9iYWNrZW5kQ2FsbCk7XG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBlbHNlIGlmICh1cmxPZlNjcmlwdC5pbmNsdWRlcygnY29uc2VudG1hbmFnZXIubWdyLmNvbnNlbnN1Lm9yZycpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLl9jbXAgPSBuZXcgQ29uc2VudE1hbmFnZXIodGhpcy5fZG9jdW1lbnQsIHVybE9mU2NyaXB0LCB0aGlzLl9iYWNrZW5kQ2FsbCk7XG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBlbHNlIGlmICh1cmxPZlNjcmlwdC5pbmNsdWRlcygnY2hhbmRhZ28uY29tJykgfHwgdXJsT2ZTY3JpcHQuaW5jbHVkZXMoJ2FwcGNvbnNlbnQubWdyLmNvbnNlbnN1Lm9yZycpIHx8IHVybE9mU2NyaXB0LmluY2x1ZGVzKCdhcHBjb25zZW50LmlvJykpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuX2NtcCA9IG5ldyBDaGFuZGFnbyh0aGlzLl9kb2N1bWVudCwgdXJsT2ZTY3JpcHQsIHRoaXMuX2JhY2tlbmRDYWxsKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGVsc2UgaWYgKHVybE9mU2NyaXB0LmluY2x1ZGVzKCdkaWRvbWkuaW8nKSB8fCB1cmxPZlNjcmlwdC5pbmNsdWRlcygnZGlkb21pLm1nci5jb25zZW5zdS5vcmcnKSB8fCB1cmxPZlNjcmlwdC5pbmNsdWRlcygncHJpdmFjeS1jZW50ZXIub3JnJykpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuX2NtcCA9IG5ldyBEaURvTWkodGhpcy5fZG9jdW1lbnQsIHVybE9mU2NyaXB0LCB0aGlzLl9iYWNrZW5kQ2FsbCk7XG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBlbHNlIGlmIChkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuaW5uZXJIVE1MLmluY2x1ZGVzKFwiYm9ybGFicy1jb29raWVcIikpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuX2NtcCA9IG5ldyBCb3JsYWJzKHRoaXMuX2RvY3VtZW50LCB1cmxPZlNjcmlwdCwgdGhpcy5fYmFja2VuZENhbGwpO1xuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgLyogQVRURU5USU9OIC0gVEhJUyBJUyBHRU5FUkFURUQgQ09ERSBGUk9NIFRIRSBFWEVDTCBTSEVFVCAqL1xuICAgICAgICAgICAgICAgICAgICBlbHNlIGlmICh1cmxPZlNjcmlwdC5pbmNsdWRlcygnZmFrdG9yLmlvJykgfHwgdXJsT2ZTY3JpcHQuaW5jbHVkZXMoJ2Zha3Rvci5tZ3IuY29uc2Vuc3Uub3JnJykgfHwgdXJsT2ZTY3JpcHQuaW5jbHVkZXMoJ2xpdmVyYW1wLmNvbScpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLl9jbXAgPSBuZXcgTm90WWV0SW1wbGVtZW50ZWRDbXAoMywgdGhpcy5fZG9jdW1lbnQsICdGYWt0b3IgQlYnLCB1cmxPZlNjcmlwdCwgdGhpcy5fYmFja2VuZENhbGwpO1xuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgZWxzZSBpZiAodXJsT2ZTY3JpcHQuaW5jbHVkZXMoJ2JheWNsb3VkLmNvbScpIHx8IHVybE9mU2NyaXB0LmluY2x1ZGVzKCdjb25zZW50aHViLm1nci5jb25zZW5zdS5vcmcnKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5fY21wID0gbmV3IE5vdFlldEltcGxlbWVudGVkQ21wKDgsIHRoaXMuX2RvY3VtZW50LCAnQmF5Y2xvdWQgU3lzdGVtcyBMaW1pdGVkJywgdXJsT2ZTY3JpcHQsIHRoaXMuX2JhY2tlbmRDYWxsKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGVsc2UgaWYgKHVybE9mU2NyaXB0LmluY2x1ZGVzKCdnZXRhZG1pcmFsLmNvbScpIHx8IHVybE9mU2NyaXB0LmluY2x1ZGVzKCdhZG1pcmFsLm1nci5jb25zZW5zdS5vcmcnKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5fY21wID0gbmV3IE5vdFlldEltcGxlbWVudGVkQ21wKDksIHRoaXMuX2RvY3VtZW50LCAnQWRtaXJhbCcsIHVybE9mU2NyaXB0LCB0aGlzLl9iYWNrZW5kQ2FsbCk7XG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBlbHNlIGlmICh1cmxPZlNjcmlwdC5pbmNsdWRlcygnc292cm4uY29tJykgfHwgdXJsT2ZTY3JpcHQuaW5jbHVkZXMoJ3NvdnJuLm1nci5jb25zZW5zdS5vcmcnKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5fY21wID0gbmV3IE5vdFlldEltcGxlbWVudGVkQ21wKDExLCB0aGlzLl9kb2N1bWVudCwgJ1NvdnJuIEhvbGRpbmdzIEluY2UnLCB1cmxPZlNjcmlwdCwgdGhpcy5fYmFja2VuZENhbGwpO1xuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgZWxzZSBpZiAodXJsT2ZTY3JpcHQuaW5jbHVkZXMoJ2RpZ2l0cnUuc3QnKSB8fCB1cmxPZlNjcmlwdC5pbmNsdWRlcygnZGlnaXRydXN0Lm1nci5jb25zZW5zdS5vcmcnKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5fY21wID0gbmV3IE5vdFlldEltcGxlbWVudGVkQ21wKDE1LCB0aGlzLl9kb2N1bWVudCwgJ0Nvb2tpZSBUcnVzdCBXb3JraW5nIEdyb3VwLCBJbmMuJywgdXJsT2ZTY3JpcHQsIHRoaXMuX2JhY2tlbmRDYWxsKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGVsc2UgaWYgKHVybE9mU2NyaXB0LmluY2x1ZGVzKCdza2ltbGlua3MuY29tJykgfHwgdXJsT2ZTY3JpcHQuaW5jbHVkZXMoJ3NraW1saW5rcy5tZ3IuY29uc2Vuc3Uub3JnJykpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuX2NtcCA9IG5ldyBOb3RZZXRJbXBsZW1lbnRlZENtcCgyMCwgdGhpcy5fZG9jdW1lbnQsICdTa2ltYml0IEx0ZCcsIHVybE9mU2NyaXB0LCB0aGlzLl9iYWNrZW5kQ2FsbCk7XG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBlbHNlIGlmICh1cmxPZlNjcmlwdC5pbmNsdWRlcygnY29udmVyc2FudG1lZGlhLmV1JykgfHwgdXJsT2ZTY3JpcHQuaW5jbHVkZXMoJ2NvbnZlcnNhbnQubWdyLmNvbnNlbnN1Lm9yZycpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLl9jbXAgPSBuZXcgTm90WWV0SW1wbGVtZW50ZWRDbXAoMjMsIHRoaXMuX2RvY3VtZW50LCAnQ29udmVyc2FudCBFdXJvcGUgTHRkLicsIHVybE9mU2NyaXB0LCB0aGlzLl9iYWNrZW5kQ2FsbCk7XG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBlbHNlIGlmICh1cmxPZlNjcmlwdC5pbmNsdWRlcygnc2hhcmV0aGlzLmNvbScpIHx8IHVybE9mU2NyaXB0LmluY2x1ZGVzKCdzaGFyZXRoaXMubWdyLmNvbnNlbnN1Lm9yZycpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLl9jbXAgPSBuZXcgTm90WWV0SW1wbGVtZW50ZWRDbXAoMjUsIHRoaXMuX2RvY3VtZW50LCAnU2hhcmVUaGlzLCBJbmMuJywgdXJsT2ZTY3JpcHQsIHRoaXMuX2JhY2tlbmRDYWxsKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGVsc2UgaWYgKHVybE9mU2NyaXB0LmluY2x1ZGVzKCdkbWdtZWRpYS5jby51aycpIHx8IHVybE9mU2NyaXB0LmluY2x1ZGVzKCdkbWdtZWRpYS5tZ3IuY29uc2Vuc3Uub3JnJykpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuX2NtcCA9IG5ldyBOb3RZZXRJbXBsZW1lbnRlZENtcCgyNywgdGhpcy5fZG9jdW1lbnQsICdBc3NvY2lhdGVkIE5ld3NwYXBlcnMgTHRkJywgdXJsT2ZTY3JpcHQsIHRoaXMuX2JhY2tlbmRDYWxsKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGVsc2UgaWYgKHVybE9mU2NyaXB0LmluY2x1ZGVzKCdjYXB0aWZ5LmNvLnVrJykgfHwgdXJsT2ZTY3JpcHQuaW5jbHVkZXMoJ2NhcHRpZnkubWdyLmNvbnNlbnN1Lm9yZycpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLl9jbXAgPSBuZXcgTm90WWV0SW1wbGVtZW50ZWRDbXAoMjksIHRoaXMuX2RvY3VtZW50LCAnQ2FwdGlmeSBUZWNobm9sb2dpZXMgTGltaXRlZCcsIHVybE9mU2NyaXB0LCB0aGlzLl9iYWNrZW5kQ2FsbCk7XG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBlbHNlIGlmICh1cmxPZlNjcmlwdC5pbmNsdWRlcygncmljaGF1ZGllbmNlLmNvbScpIHx8IHVybE9mU2NyaXB0LmluY2x1ZGVzKCdyaWNoYXVkaWVuY2UubWdyLmNvbnNlbnN1Lm9yZycpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLl9jbXAgPSBuZXcgTm90WWV0SW1wbGVtZW50ZWRDbXAoMzAsIHRoaXMuX2RvY3VtZW50LCAnUmljaCBBdWRpZW5jZSBJbnRlcm5hdGlvbmFsIFNMJywgdXJsT2ZTY3JpcHQsIHRoaXMuX2JhY2tlbmRDYWxsKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGVsc2UgaWYgKHVybE9mU2NyaXB0LmluY2x1ZGVzKCdzeXN0ZW0xLmNvbScpIHx8IHVybE9mU2NyaXB0LmluY2x1ZGVzKCdzeXN0ZW0xLm1nci5jb25zZW5zdS5vcmcnKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5fY21wID0gbmV3IE5vdFlldEltcGxlbWVudGVkQ21wKDM4LCB0aGlzLl9kb2N1bWVudCwgJ1N5c3RlbTEgTExDJywgdXJsT2ZTY3JpcHQsIHRoaXMuX2JhY2tlbmRDYWxsKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGVsc2UgaWYgKHVybE9mU2NyaXB0LmluY2x1ZGVzKCdzb3J0YWJsZS5jb20nKSB8fCB1cmxPZlNjcmlwdC5pbmNsdWRlcygnc29ydGFibGUubWdyLmNvbnNlbnN1Lm9yZycpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLl9jbXAgPSBuZXcgTm90WWV0SW1wbGVtZW50ZWRDbXAoMzksIHRoaXMuX2RvY3VtZW50LCAnU25hcHNvcnQgSW5jLiwgb3BlcmF0aW5nIGFzIFNvcnRhYmxlJywgdXJsT2ZTY3JpcHQsIHRoaXMuX2JhY2tlbmRDYWxsKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGVsc2UgaWYgKHVybE9mU2NyaXB0LmluY2x1ZGVzKCduZXRzcHJpbnQuZ3JvdXAnKSB8fCB1cmxPZlNjcmlwdC5pbmNsdWRlcygnbmV0c3ByaW50Z3JvdXAubWdyLmNvbnNlbnN1Lm9yZycpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLl9jbXAgPSBuZXcgTm90WWV0SW1wbGVtZW50ZWRDbXAoNDEsIHRoaXMuX2RvY3VtZW50LCAnR3J1cGEgTmV0c3ByaW50IFNwIHogby5vLicsIHVybE9mU2NyaXB0LCB0aGlzLl9iYWNrZW5kQ2FsbCk7XG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBlbHNlIGlmICh1cmxPZlNjcmlwdC5pbmNsdWRlcygnbWFkdmVydGlzZS5jb20nKSB8fCB1cmxPZlNjcmlwdC5pbmNsdWRlcygnbWFkdmVydGlzZS5tZ3IuY29uc2Vuc3Uub3JnJykpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuX2NtcCA9IG5ldyBOb3RZZXRJbXBsZW1lbnRlZENtcCg0NCwgdGhpcy5fZG9jdW1lbnQsICdNYWR2ZXJ0aXNlIE1lZGlhJywgdXJsT2ZTY3JpcHQsIHRoaXMuX2JhY2tlbmRDYWxsKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGVsc2UgaWYgKHVybE9mU2NyaXB0LmluY2x1ZGVzKCdvZ3VyeS5jb20nKSB8fCB1cmxPZlNjcmlwdC5pbmNsdWRlcygnb2d1cnkubWdyLmNvbnNlbnN1Lm9yZycpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLl9jbXAgPSBuZXcgTm90WWV0SW1wbGVtZW50ZWRDbXAoNDUsIHRoaXMuX2RvY3VtZW50LCAnT2d1cnkgTHRkJywgdXJsT2ZTY3JpcHQsIHRoaXMuX2JhY2tlbmRDYWxsKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGVsc2UgaWYgKHVybE9mU2NyaXB0LmluY2x1ZGVzKCdtZWRpYXZpbmUuY29tJykgfHwgdXJsT2ZTY3JpcHQuaW5jbHVkZXMoJ21lZGlhdmluZS5tZ3IuY29uc2Vuc3Uub3JnJykpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuX2NtcCA9IG5ldyBOb3RZZXRJbXBsZW1lbnRlZENtcCg0NiwgdGhpcy5fZG9jdW1lbnQsICdNZWRpYXZpbmUsIEluYy4nLCB1cmxPZlNjcmlwdCwgdGhpcy5fYmFja2VuZENhbGwpO1xuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgZWxzZSBpZiAodXJsT2ZTY3JpcHQuaW5jbHVkZXMoJ3RydXN0YXJjLmNvbScpIHx8IHVybE9mU2NyaXB0LmluY2x1ZGVzKCd0cnVzdGFyYy5tZ3IuY29uc2Vuc3Uub3JnJykpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuX2NtcCA9IG5ldyBOb3RZZXRJbXBsZW1lbnRlZENtcCg0NywgdGhpcy5fZG9jdW1lbnQsICdUcnVzdEFyYyBJbmMnLCB1cmxPZlNjcmlwdCwgdGhpcy5fYmFja2VuZENhbGwpO1xuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgZWxzZSBpZiAodXJsT2ZTY3JpcHQuaW5jbHVkZXMoJ3Nhbm9tYS5jb20nKSB8fCB1cmxPZlNjcmlwdC5pbmNsdWRlcygnc21mLm1nci5jb25zZW5zdS5vcmcnKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5fY21wID0gbmV3IE5vdFlldEltcGxlbWVudGVkQ21wKDQ5LCB0aGlzLl9kb2N1bWVudCwgJ1Nhbm9tYSBNZWRpYSBGaW5sYW5kIE95JywgdXJsT2ZTY3JpcHQsIHRoaXMuX2JhY2tlbmRDYWxsKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGVsc2UgaWYgKHVybE9mU2NyaXB0LmluY2x1ZGVzKCdldGFyZ2V0LmV1JykgfHwgdXJsT2ZTY3JpcHQuaW5jbHVkZXMoJ2V0YXJnZXQubWdyLmNvbnNlbnN1Lm9yZycpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLl9jbXAgPSBuZXcgTm90WWV0SW1wbGVtZW50ZWRDbXAoNTAsIHRoaXMuX2RvY3VtZW50LCAnRVRBUkdFVCBTRScsIHVybE9mU2NyaXB0LCB0aGlzLl9iYWNrZW5kQ2FsbCk7XG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBlbHNlIGlmICh1cmxPZlNjcmlwdC5pbmNsdWRlcygnYWRyb2xsLmNvbScpIHx8IHVybE9mU2NyaXB0LmluY2x1ZGVzKCdhZHJvbGwubWdyLmNvbnNlbnN1Lm9yZycpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLl9jbXAgPSBuZXcgTm90WWV0SW1wbGVtZW50ZWRDbXAoNTQsIHRoaXMuX2RvY3VtZW50LCAnQWRSb2xsLCBJbmMnLCB1cmxPZlNjcmlwdCwgdGhpcy5fYmFja2VuZENhbGwpO1xuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgZWxzZSBpZiAodXJsT2ZTY3JpcHQuaW5jbHVkZXMoJ3RyaWJvby5jb20nKSB8fCB1cmxPZlNjcmlwdC5pbmNsdWRlcygndHJpYm9vLm1nci5jb25zZW5zdS5vcmcnKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5fY21wID0gbmV3IE5vdFlldEltcGxlbWVudGVkQ21wKDU1LCB0aGlzLl9kb2N1bWVudCwgJ1RyaWJvbyBNZWRpYSBTUkwnLCB1cmxPZlNjcmlwdCwgdGhpcy5fYmFja2VuZENhbGwpO1xuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgZWxzZSBpZiAodXJsT2ZTY3JpcHQuaW5jbHVkZXMoJ3dlYmVkaWEtZ3JvdXAuY29tJykgfHwgdXJsT2ZTY3JpcHQuaW5jbHVkZXMoJ3dlYmVkaWEubWdyLmNvbnNlbnN1Lm9yZycpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLl9jbXAgPSBuZXcgTm90WWV0SW1wbGVtZW50ZWRDbXAoNTcsIHRoaXMuX2RvY3VtZW50LCAnV0VCRURJQScsIHVybE9mU2NyaXB0LCB0aGlzLl9iYWNrZW5kQ2FsbCk7XG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBlbHNlIGlmICh1cmxPZlNjcmlwdC5pbmNsdWRlcygnY2lhb3Blb3BsZS5pdCcpIHx8IHVybE9mU2NyaXB0LmluY2x1ZGVzKCdjaWFvcGVvcGxlLm1nci5jb25zZW5zdS5vcmcnKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5fY21wID0gbmV3IE5vdFlldEltcGxlbWVudGVkQ21wKDU4LCB0aGlzLl9kb2N1bWVudCwgJ0NpYW8gcGVvcGxlIHMuci5sLicsIHVybE9mU2NyaXB0LCB0aGlzLl9iYWNrZW5kQ2FsbCk7XG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBlbHNlIGlmICh1cmxPZlNjcmlwdC5pbmNsdWRlcygnZGVlemVyLmNvbScpIHx8IHVybE9mU2NyaXB0LmluY2x1ZGVzKCdkZWV6ZXIubWdyLmNvbnNlbnN1Lm9yZycpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLl9jbXAgPSBuZXcgTm90WWV0SW1wbGVtZW50ZWRDbXAoNTksIHRoaXMuX2RvY3VtZW50LCAnRGVlemVyJywgdXJsT2ZTY3JpcHQsIHRoaXMuX2JhY2tlbmRDYWxsKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGVsc2UgaWYgKHVybE9mU2NyaXB0LmluY2x1ZGVzKCdzcG9sZWN6bm9zY2kucGwnKSB8fCB1cmxPZlNjcmlwdC5pbmNsdWRlcygnc3BvbGVjem5vc2NpLm1nci5jb25zZW5zdS5vcmcnKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5fY21wID0gbmV3IE5vdFlldEltcGxlbWVudGVkQ21wKDYxLCB0aGlzLl9kb2N1bWVudCwgJ1Nwb2xlY3pub3NjaSBTcC4geiBvLm8uIFNwLmsuJywgdXJsT2ZTY3JpcHQsIHRoaXMuX2JhY2tlbmRDYWxsKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGVsc2UgaWYgKHVybE9mU2NyaXB0LmluY2x1ZGVzKCdndW10cmVlLmNvbScpIHx8IHVybE9mU2NyaXB0LmluY2x1ZGVzKCdndW10cmVlY29tLm1nci5jb25zZW5zdS5vcmcnKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5fY21wID0gbmV3IE5vdFlldEltcGxlbWVudGVkQ21wKDYyLCB0aGlzLl9kb2N1bWVudCwgJ0d1bXRyZWUuY29tIEx0ZCcsIHVybE9mU2NyaXB0LCB0aGlzLl9iYWNrZW5kQ2FsbCk7XG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBlbHNlIGlmICh1cmxPZlNjcmlwdC5pbmNsdWRlcygnZ2Rwci5jbGlja2lvLmNvbScpIHx8IHVybE9mU2NyaXB0LmluY2x1ZGVzKCdjbGlja2lvLm1nci5jb25zZW5zdS5vcmcnKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5fY21wID0gbmV3IE5vdFlldEltcGxlbWVudGVkQ21wKDYzLCB0aGlzLl9kb2N1bWVudCwgJ0FMWiBTb2Z0d2FyZSBMdGQgKHRyYWRpbmcgYXMgQ2xpY2tpbyknLCB1cmxPZlNjcmlwdCwgdGhpcy5fYmFja2VuZENhbGwpO1xuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgZWxzZSBpZiAodXJsT2ZTY3JpcHQuaW5jbHVkZXMoJ29uZXRhZy5uZXQnKSB8fCB1cmxPZlNjcmlwdC5pbmNsdWRlcygnb25ldGFnLm1nci5jb25zZW5zdS5vcmcnKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5fY21wID0gbmV3IE5vdFlldEltcGxlbWVudGVkQ21wKDY1LCB0aGlzLl9kb2N1bWVudCwgJ09uZVRhZyBMdGQnLCB1cmxPZlNjcmlwdCwgdGhpcy5fYmFja2VuZENhbGwpO1xuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgZWxzZSBpZiAodXJsT2ZTY3JpcHQuaW5jbHVkZXMoJ3VuaWNvbnNlbnQuY29tJykgfHwgdXJsT2ZTY3JpcHQuaW5jbHVkZXMoJ3VuaWNvbnNlbnQubWdyLmNvbnNlbnN1Lm9yZycpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLl9jbXAgPSBuZXcgTm90WWV0SW1wbGVtZW50ZWRDbXAoNjgsIHRoaXMuX2RvY3VtZW50LCAnVHJhbnNmb24gTHRkJywgdXJsT2ZTY3JpcHQsIHRoaXMuX2JhY2tlbmRDYWxsKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGVsc2UgaWYgKHVybE9mU2NyaXB0LmluY2x1ZGVzKCdncmVtaW1lZGlhLnBsJykgfHwgdXJsT2ZTY3JpcHQuaW5jbHVkZXMoJ2dtY21wLm1nci5jb25zZW5zdS5vcmcnKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5fY21wID0gbmV3IE5vdFlldEltcGxlbWVudGVkQ21wKDY5LCB0aGlzLl9kb2N1bWVudCwgJ0dyZW1pIE1lZGlhIFNBJywgdXJsT2ZTY3JpcHQsIHRoaXMuX2JhY2tlbmRDYWxsKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGVsc2UgaWYgKHVybE9mU2NyaXB0LmluY2x1ZGVzKCd3cC5wbCcpIHx8IHVybE9mU2NyaXB0LmluY2x1ZGVzKCd3cG0ubWdyLmNvbnNlbnN1Lm9yZycpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLl9jbXAgPSBuZXcgTm90WWV0SW1wbGVtZW50ZWRDbXAoNzIsIHRoaXMuX2RvY3VtZW50LCAnV2lydHVhbG5hIFBvbHNrYSBNZWRpYSBTLkEuJywgdXJsT2ZTY3JpcHQsIHRoaXMuX2JhY2tlbmRDYWxsKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGVsc2UgaWYgKHVybE9mU2NyaXB0LmluY2x1ZGVzKCdyZWxldmFudC5maScpIHx8IHVybE9mU2NyaXB0LmluY2x1ZGVzKCdyZWxldmFudC5tZ3IuY29uc2Vuc3Uub3JnJykpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuX2NtcCA9IG5ldyBOb3RZZXRJbXBsZW1lbnRlZENtcCg3NCwgdGhpcy5fZG9jdW1lbnQsICdSZWxldmFudCBEaWdpdGFsIE95JywgdXJsT2ZTY3JpcHQsIHRoaXMuX2JhY2tlbmRDYWxsKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGVsc2UgaWYgKHVybE9mU2NyaXB0LmluY2x1ZGVzKCd2ZWN0YXVyeS5pbycpIHx8IHVybE9mU2NyaXB0LmluY2x1ZGVzKCd2ZWN0YXVyeS5tZ3IuY29uc2Vuc3Uub3JnJykpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuX2NtcCA9IG5ldyBOb3RZZXRJbXBsZW1lbnRlZENtcCg3NSwgdGhpcy5fZG9jdW1lbnQsICdWRUNUQVVSWScsIHVybE9mU2NyaXB0LCB0aGlzLl9iYWNrZW5kQ2FsbCk7XG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBlbHNlIGlmICh1cmxPZlNjcmlwdC5pbmNsdWRlcygnc2liYm92ZW50dXJlcy5jb20nKSB8fCB1cmxPZlNjcmlwdC5pbmNsdWRlcygnc2liYm92ZW50dXJlcy5tZ3IuY29uc2Vuc3Uub3JnJykpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuX2NtcCA9IG5ldyBOb3RZZXRJbXBsZW1lbnRlZENtcCg3NiwgdGhpcy5fZG9jdW1lbnQsICdTSUJCTyBWRU5UVVJFUyBTTFUnLCB1cmxPZlNjcmlwdCwgdGhpcy5fYmFja2VuZENhbGwpO1xuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgZWxzZSBpZiAodXJsT2ZTY3JpcHQuaW5jbHVkZXMoJ2FkbWV0cmljc3Byby5jb20nKSB8fCB1cmxPZlNjcmlwdC5pbmNsdWRlcygnY21wLm1nci5jb25zZW5zdS5vcmcnKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5fY21wID0gbmV3IE5vdFlldEltcGxlbWVudGVkQ21wKDc3LCB0aGlzLl9kb2N1bWVudCwgJ1RlYWNoaW5nIEFpZHMsIExMQycsIHVybE9mU2NyaXB0LCB0aGlzLl9iYWNrZW5kQ2FsbCk7XG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBlbHNlIGlmICh1cmxPZlNjcmlwdC5pbmNsdWRlcygnc2ZyLmZyJykgfHwgdXJsT2ZTY3JpcHQuaW5jbHVkZXMoJ3Nmci5tZ3IuY29uc2Vuc3Uub3JnJykpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuX2NtcCA9IG5ldyBOb3RZZXRJbXBsZW1lbnRlZENtcCg3OSwgdGhpcy5fZG9jdW1lbnQsICdTRlInLCB1cmxPZlNjcmlwdCwgdGhpcy5fYmFja2VuZENhbGwpO1xuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgZWxzZSBpZiAodXJsT2ZTY3JpcHQuaW5jbHVkZXMoJ29pbC5heGVsc3ByaW5nZXIuY29tJykgfHwgdXJsT2ZTY3JpcHQuaW5jbHVkZXMoJ29pbC5tZ3IuY29uc2Vuc3Uub3JnJykpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuX2NtcCA9IG5ldyBOb3RZZXRJbXBsZW1lbnRlZENtcCg4MCwgdGhpcy5fZG9jdW1lbnQsICdBeGVsIFNwcmluZ2VyIFNFJywgdXJsT2ZTY3JpcHQsIHRoaXMuX2JhY2tlbmRDYWxsKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGVsc2UgaWYgKHVybE9mU2NyaXB0LmluY2x1ZGVzKCdhZHRlY2hmYWN0b3J5LmNvbScpIHx8IHVybE9mU2NyaXB0LmluY2x1ZGVzKCdhdGYubWdyLmNvbnNlbnN1Lm9yZycpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLl9jbXAgPSBuZXcgTm90WWV0SW1wbGVtZW50ZWRDbXAoODIsIHRoaXMuX2RvY3VtZW50LCAnQWRUZWNoIEZhY3RvcnkgR21iSCAmIENvLiBLRycsIHVybE9mU2NyaXB0LCB0aGlzLl9iYWNrZW5kQ2FsbCk7XG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBlbHNlIGlmICh1cmxPZlNjcmlwdC5pbmNsdWRlcygnYWxtYW1lZGlhLmZpJykgfHwgdXJsT2ZTY3JpcHQuaW5jbHVkZXMoJ2FsbWFtZWRpYS5tZ3IuY29uc2Vuc3Uub3JnJykpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuX2NtcCA9IG5ldyBOb3RZZXRJbXBsZW1lbnRlZENtcCg4NCwgdGhpcy5fZG9jdW1lbnQsICdBbG1hIE1lZGlhJywgdXJsT2ZTY3JpcHQsIHRoaXMuX2JhY2tlbmRDYWxsKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGVsc2UgaWYgKHVybE9mU2NyaXB0LmluY2x1ZGVzKCdvdWVzdC1mcmFuY2UuZnInKSB8fCB1cmxPZlNjcmlwdC5pbmNsdWRlcygnc2lwYW9mLm1nci5jb25zZW5zdS5vcmcnKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5fY21wID0gbmV3IE5vdFlldEltcGxlbWVudGVkQ21wKDg1LCB0aGlzLl9kb2N1bWVudCwgJ1NJUEEnLCB1cmxPZlNjcmlwdCwgdGhpcy5fYmFja2VuZENhbGwpO1xuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgZWxzZSBpZiAodXJsT2ZTY3JpcHQuaW5jbHVkZXMoJ25vdXcuY29tJykgfHwgdXJsT2ZTY3JpcHQuaW5jbHVkZXMoJ25vdXcubWdyLmNvbnNlbnN1Lm9yZycpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLl9jbXAgPSBuZXcgTm90WWV0SW1wbGVtZW50ZWRDbXAoODYsIHRoaXMuX2RvY3VtZW50LCAnTm91dyBNZWRpYSBBQicsIHVybE9mU2NyaXB0LCB0aGlzLl9iYWNrZW5kQ2FsbCk7XG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBlbHNlIGlmICh1cmxPZlNjcmlwdC5pbmNsdWRlcygnY29tbWFuZGVyc2FjdC5jb20nKSB8fCB1cmxPZlNjcmlwdC5pbmNsdWRlcygnY29tbWFuZGVyc2FjdC5tZ3IuY29uc2Vuc3Uub3JnJykpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuX2NtcCA9IG5ldyBOb3RZZXRJbXBsZW1lbnRlZENtcCg5MCwgdGhpcy5fZG9jdW1lbnQsICdDb21tYW5kZXJzIEFjdCcsIHVybE9mU2NyaXB0LCB0aGlzLl9iYWNrZW5kQ2FsbCk7XG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBlbHNlIGlmICh1cmxPZlNjcmlwdC5pbmNsdWRlcygnc2lyZGF0YS5jb20nKSB8fCB1cmxPZlNjcmlwdC5pbmNsdWRlcygnc2RkYW4ubWdyLmNvbnNlbnN1Lm9yZycpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLl9jbXAgPSBuZXcgTm90WWV0SW1wbGVtZW50ZWRDbXAoOTIsIHRoaXMuX2RvY3VtZW50LCAnU0lSREFUQScsIHVybE9mU2NyaXB0LCB0aGlzLl9iYWNrZW5kQ2FsbCk7XG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBlbHNlIGlmICh1cmxPZlNjcmlwdC5pbmNsdWRlcygnc2hpbnlzdGF0LmNvbScpIHx8IHVybE9mU2NyaXB0LmluY2x1ZGVzKCdzaGlueXN0YXQubWdyLmNvbnNlbnN1Lm9yZycpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLl9jbXAgPSBuZXcgTm90WWV0SW1wbGVtZW50ZWRDbXAoOTYsIHRoaXMuX2RvY3VtZW50LCAnVHJpYm9vIERhdGEgQW5hbHl0aWNzJywgdXJsT2ZTY3JpcHQsIHRoaXMuX2JhY2tlbmRDYWxsKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGVsc2UgaWYgKHVybE9mU2NyaXB0LmluY2x1ZGVzKCdvZmZyZW1lZGlhLmNvbScpIHx8IHVybE9mU2NyaXB0LmluY2x1ZGVzKCdjYW1iaXVtbWVkaWEubWdyLmNvbnNlbnN1Lm9yZycpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLl9jbXAgPSBuZXcgTm90WWV0SW1wbGVtZW50ZWRDbXAoMTAwLCB0aGlzLl9kb2N1bWVudCwgJ0NhbWJpdW0gTWVkaWEnLCB1cmxPZlNjcmlwdCwgdGhpcy5fYmFja2VuZENhbGwpO1xuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgZWxzZSBpZiAodXJsT2ZTY3JpcHQuaW5jbHVkZXMoJ2dlbWl1cy5jb20nKSB8fCB1cmxPZlNjcmlwdC5pbmNsdWRlcygnZ2VtaXVzLm1nci5jb25zZW5zdS5vcmcnKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5fY21wID0gbmV3IE5vdFlldEltcGxlbWVudGVkQ21wKDEwNCwgdGhpcy5fZG9jdW1lbnQsICdHZW1pdXMgU0EnLCB1cmxPZlNjcmlwdCwgdGhpcy5fYmFja2VuZENhbGwpO1xuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgZWxzZSBpZiAodXJsT2ZTY3JpcHQuaW5jbHVkZXMoJ2RhaWx5bW90aW9uLmNvbScpIHx8IHVybE9mU2NyaXB0LmluY2x1ZGVzKCdkYWlseW1vdGlvbi5tZ3IuY29uc2Vuc3Uub3JnJykpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuX2NtcCA9IG5ldyBOb3RZZXRJbXBsZW1lbnRlZENtcCgxMDUsIHRoaXMuX2RvY3VtZW50LCAnREFJTFlNT1RJT04gU0EnLCB1cmxPZlNjcmlwdCwgdGhpcy5fYmFja2VuZENhbGwpO1xuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgZWxzZSBpZiAodXJsT2ZTY3JpcHQuaW5jbHVkZXMoJ3RoZWd1YXJkaWFuLmNvbScpIHx8IHVybE9mU2NyaXB0LmluY2x1ZGVzKCdnbm0ubWdyLmNvbnNlbnN1Lm9yZycpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLl9jbXAgPSBuZXcgTm90WWV0SW1wbGVtZW50ZWRDbXAoMTEyLCB0aGlzLl9kb2N1bWVudCwgJ0d1YXJkaWFuIE5ld3MgYW5kIE1lZGlhJywgdXJsT2ZTY3JpcHQsIHRoaXMuX2JhY2tlbmRDYWxsKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGVsc2UgaWYgKHVybE9mU2NyaXB0LmluY2x1ZGVzKCd1bHRpbWF0ZS1ndWl0YXIuY29tJykgfHwgdXJsT2ZTY3JpcHQuaW5jbHVkZXMoJ211c2ljaWFuc2F1ZGllbmNlLm1nci5jb25zZW5zdS5vcmcnKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5fY21wID0gbmV3IE5vdFlldEltcGxlbWVudGVkQ21wKDExMywgdGhpcy5fZG9jdW1lbnQsICdHcmFuZCBQbGF5IE1lZGlhLCBMTEMnLCB1cmxPZlNjcmlwdCwgdGhpcy5fYmFja2VuZENhbGwpO1xuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgZWxzZSBpZiAodXJsT2ZTY3JpcHQuaW5jbHVkZXMoJ2FkdmVyc2FsLmNvbScpIHx8IHVybE9mU2NyaXB0LmluY2x1ZGVzKCdhZHZlcnNhbC5tZ3IuY29uc2Vuc3Uub3JnJykpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuX2NtcCA9IG5ldyBOb3RZZXRJbXBsZW1lbnRlZENtcCgxMTQsIHRoaXMuX2RvY3VtZW50LCAnQWR2ZXJzYWwgTWVkaWEsIEluYy4nLCB1cmxPZlNjcmlwdCwgdGhpcy5fYmFja2VuZENhbGwpO1xuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgZWxzZSBpZiAodXJsT2ZTY3JpcHQuaW5jbHVkZXMoJ2EtbGVoZGV0LmZpJykgfHwgdXJsT2ZTY3JpcHQuaW5jbHVkZXMoJ2EtbGVoZGV0Lm1nci5jb25zZW5zdS5vcmcnKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5fY21wID0gbmV3IE5vdFlldEltcGxlbWVudGVkQ21wKDExNSwgdGhpcy5fZG9jdW1lbnQsICdBLWxlaGRldCBPeScsIHVybE9mU2NyaXB0LCB0aGlzLl9iYWNrZW5kQ2FsbCk7XG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBlbHNlIGlmICh1cmxPZlNjcmlwdC5pbmNsdWRlcygnY3VyaW9zaXR5bWVkaWEuY29tJykgfHwgdXJsT2ZTY3JpcHQuaW5jbHVkZXMoJ2N1cmlvc2l0eW1lZGlhLm1nci5jb25zZW5zdS5vcmcnKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5fY21wID0gbmV3IE5vdFlldEltcGxlbWVudGVkQ21wKDExOSwgdGhpcy5fZG9jdW1lbnQsICdDdXJpb3NpdHkgTWVkaWEsIEluYy4nLCB1cmxPZlNjcmlwdCwgdGhpcy5fYmFja2VuZENhbGwpO1xuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgZWxzZSBpZiAodXJsT2ZTY3JpcHQuaW5jbHVkZXMoJ3dlYmZpbmFuY2lhbGdyb3VwLmNvbScpIHx8IHVybE9mU2NyaXB0LmluY2x1ZGVzKCd2b3J0ZXgubWdyLmNvbnNlbnN1Lm9yZycpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLl9jbXAgPSBuZXcgTm90WWV0SW1wbGVtZW50ZWRDbXAoMTIyLCB0aGlzLl9kb2N1bWVudCwgJ1dlYiBGaW5hbmNpYWwgR3JvdXAgUy5BLi9Wb3J0ZXgnLCB1cmxPZlNjcmlwdCwgdGhpcy5fYmFja2VuZENhbGwpO1xuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgZWxzZSBpZiAodXJsT2ZTY3JpcHQuaW5jbHVkZXMoJ2l1YmVuZGEuY29tJykgfHwgdXJsT2ZTY3JpcHQuaW5jbHVkZXMoJ2l1YmVuZGEubWdyLmNvbnNlbnN1Lm9yZycpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLl9jbXAgPSBuZXcgTm90WWV0SW1wbGVtZW50ZWRDbXAoMTIzLCB0aGlzLl9kb2N1bWVudCwgJ2l1YmVuZGEnLCB1cmxPZlNjcmlwdCwgdGhpcy5fYmFja2VuZENhbGwpO1xuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgZWxzZSBpZiAodXJsT2ZTY3JpcHQuaW5jbHVkZXMoJ2xpcXdpZC5jb20nKSB8fCB1cmxPZlNjcmlwdC5pbmNsdWRlcygnbGlxd2lkLm1nci5jb25zZW5zdS5vcmcnKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5fY21wID0gbmV3IE5vdFlldEltcGxlbWVudGVkQ21wKDEyNCwgdGhpcy5fZG9jdW1lbnQsICdMSVFXSUQnLCB1cmxPZlNjcmlwdCwgdGhpcy5fYmFja2VuZENhbGwpO1xuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgIH0gLyplbHNlIGlmICh1cmxPZlNjcmlwdC5pbmNsdWRlcygnZWJheS5jb20nKSB8fCB1cmxPZlNjcmlwdC5pbmNsdWRlcygnZWJheS5tZ3IuY29uc2Vuc3Uub3JnJykpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuX2NtcCA9IG5ldyBOb3RZZXRJbXBsZW1lbnRlZENtcCgxMjUsIHRoaXMuX2RvY3VtZW50LCAnZUJheSBJbmMnLCB1cmxPZlNjcmlwdCwgdGhpcy5fYmFja2VuZENhbGwpO1xuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgIH0gKi9cbiAgICAgICAgICAgICAgICAgICAgZWxzZSBpZiAodXJsT2ZTY3JpcHQuaW5jbHVkZXMoJ2FkZXZpbnRhLmNvbScpIHx8IHVybE9mU2NyaXB0LmluY2x1ZGVzKCdzY2hpYnN0ZWRzcGFpbi5tZ3IuY29uc2Vuc3Uub3JnJykpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuX2NtcCA9IG5ldyBOb3RZZXRJbXBsZW1lbnRlZENtcCgxMjksIHRoaXMuX2RvY3VtZW50LCAnQWRldmludGEgU3BhaW4gUy5MLlUuJywgdXJsT2ZTY3JpcHQsIHRoaXMuX2JhY2tlbmRDYWxsKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGVsc2UgaWYgKHVybE9mU2NyaXB0LmluY2x1ZGVzKCdvcmllbC5pbycpIHx8IHVybE9mU2NyaXB0LmluY2x1ZGVzKCdvcmllbC5tZ3IuY29uc2Vuc3Uub3JnJykpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuX2NtcCA9IG5ldyBOb3RZZXRJbXBsZW1lbnRlZENtcCgxMzEsIHRoaXMuX2RvY3VtZW50LCAnT3JpZWwgVmVudHVyZXMnLCB1cmxPZlNjcmlwdCwgdGhpcy5fYmFja2VuZENhbGwpO1xuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgZWxzZSBpZiAodXJsT2ZTY3JpcHQuaW5jbHVkZXMoJ2ltcHJvdmVkaWdpdGFsLmNvbScpIHx8IHVybE9mU2NyaXB0LmluY2x1ZGVzKCdpbXByb3ZlZGlnaXRhbC5tZ3IuY29uc2Vuc3Uub3JnJykpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuX2NtcCA9IG5ldyBOb3RZZXRJbXBsZW1lbnRlZENtcCgxMzksIHRoaXMuX2RvY3VtZW50LCAnSW1wcm92ZSBEaWdpdGFsIEludGVybmF0aW9uYWwgQlYnLCB1cmxPZlNjcmlwdCwgdGhpcy5fYmFja2VuZENhbGwpO1xuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgZWxzZSBpZiAodXJsT2ZTY3JpcHQuaW5jbHVkZXMoJ3dpa2lhLmNvbWZhbmRvbScpIHx8IHVybE9mU2NyaXB0LmluY2x1ZGVzKCdmYW5kb20ubWdyLmNvbnNlbnN1Lm9yZycpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLl9jbXAgPSBuZXcgTm90WWV0SW1wbGVtZW50ZWRDbXAoMTQxLCB0aGlzLl9kb2N1bWVudCwgJ1dpa2lhLCBJbmMuIChGQU5ET00pJywgdXJsT2ZTY3JpcHQsIHRoaXMuX2JhY2tlbmRDYWxsKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGVsc2UgaWYgKHVybE9mU2NyaXB0LmluY2x1ZGVzKCdjYXJhZGlzaWFjLmNvbScpIHx8IHVybE9mU2NyaXB0LmluY2x1ZGVzKCdjYXJhZGlzaWFjLm1nci5jb25zZW5zdS5vcmcnKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5fY21wID0gbmV3IE5vdFlldEltcGxlbWVudGVkQ21wKDE0NywgdGhpcy5fZG9jdW1lbnQsICdDYXImQm9hdCBNZWRpYScsIHVybE9mU2NyaXB0LCB0aGlzLl9iYWNrZW5kQ2FsbCk7XG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBlbHNlIGlmICh1cmxPZlNjcmlwdC5pbmNsdWRlcygnYXZvY2V0LmlvJykgfHwgdXJsT2ZTY3JpcHQuaW5jbHVkZXMoJ2F2b2NldC5tZ3IuY29uc2Vuc3Uub3JnJykpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuX2NtcCA9IG5ldyBOb3RZZXRJbXBsZW1lbnRlZENtcCgxNTMsIHRoaXMuX2RvY3VtZW50LCAnQXZvY2V0IFN5c3RlbXMgTGltdGVkJywgdXJsT2ZTY3JpcHQsIHRoaXMuX2JhY2tlbmRDYWxsKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGVsc2UgaWYgKHVybE9mU2NyaXB0LmluY2x1ZGVzKCd5b2MuY29tJykgfHwgdXJsT2ZTY3JpcHQuaW5jbHVkZXMoJ3lvYy5tZ3IuY29uc2Vuc3Uub3JnJykpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuX2NtcCA9IG5ldyBOb3RZZXRJbXBsZW1lbnRlZENtcCgxNTcsIHRoaXMuX2RvY3VtZW50LCAnWU9DIEFHJywgdXJsT2ZTY3JpcHQsIHRoaXMuX2JhY2tlbmRDYWxsKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGVsc2UgaWYgKHVybE9mU2NyaXB0LmluY2x1ZGVzKCdpbm5pdHkuY29tJykgfHwgdXJsT2ZTY3JpcHQuaW5jbHVkZXMoJ2lubml0eS5tZ3IuY29uc2Vuc3Uub3JnJykpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuX2NtcCA9IG5ldyBOb3RZZXRJbXBsZW1lbnRlZENtcCgxNjEsIHRoaXMuX2RvY3VtZW50LCAnSW5uaXR5JywgdXJsT2ZTY3JpcHQsIHRoaXMuX2JhY2tlbmRDYWxsKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGVsc2UgaWYgKHVybE9mU2NyaXB0LmluY2x1ZGVzKCdjb29raWVpbmZvcm1hdGlvbi5jb20nKSB8fCB1cmxPZlNjcmlwdC5pbmNsdWRlcygnY29va2llaW5mb3JtYXRpb24ubWdyLmNvbnNlbnN1Lm9yZycpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLl9jbXAgPSBuZXcgTm90WWV0SW1wbGVtZW50ZWRDbXAoMTYyLCB0aGlzLl9kb2N1bWVudCwgJ0Nvb2tpZSBJbmZvcm1hdGlvbiBBUFMnLCB1cmxPZlNjcmlwdCwgdGhpcy5fYmFja2VuZENhbGwpO1xuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgZWxzZSBpZiAodXJsT2ZTY3JpcHQuaW5jbHVkZXMoJ3NvY2lldGUuY29tJykgfHwgdXJsT2ZTY3JpcHQuaW5jbHVkZXMoJ3NvY2lldGUubWdyLmNvbnNlbnN1Lm9yZycpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLl9jbXAgPSBuZXcgTm90WWV0SW1wbGVtZW50ZWRDbXAoMTY0LCB0aGlzLl9kb2N1bWVudCwgJ1NPQ0lFVEUgU0FTJywgdXJsT2ZTY3JpcHQsIHRoaXMuX2JhY2tlbmRDYWxsKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGVsc2UgaWYgKHVybE9mU2NyaXB0LmluY2x1ZGVzKCd1bml0ZWQtaW50ZXJuZXQtbWVkaWEuZGUnKSB8fCB1cmxPZlNjcmlwdC5pbmNsdWRlcygnMXVuZDEubWdyLmNvbnNlbnN1Lm9yZycpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLl9jbXAgPSBuZXcgTm90WWV0SW1wbGVtZW50ZWRDbXAoMTY3LCB0aGlzLl9kb2N1bWVudCwgJzEmMSBNYWlsICYgTWVkaWEgR21iSCcsIHVybE9mU2NyaXB0LCB0aGlzLl9iYWNrZW5kQ2FsbCk7XG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBlbHNlIGlmICh1cmxPZlNjcmlwdC5pbmNsdWRlcygnb3V0bG9vay5saXZlLmNvbScpIHx8IHVybE9mU2NyaXB0LmluY2x1ZGVzKCdvdXRsb29rLm1nci5jb25zZW5zdS5vcmcnKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5fY21wID0gbmV3IE5vdFlldEltcGxlbWVudGVkQ21wKDE2OCwgdGhpcy5fZG9jdW1lbnQsICdPdXRsb29rLmNvbSAtIE1pY3Jvc29mdCBDb3Jwb3JhdGlvbicsIHVybE9mU2NyaXB0LCB0aGlzLl9iYWNrZW5kQ2FsbCk7XG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBlbHNlIGlmICh1cmxPZlNjcmlwdC5pbmNsdWRlcygnbWFwcHkuY29tJykgfHwgdXJsT2ZTY3JpcHQuaW5jbHVkZXMoJ21hcHB5Lm1nci5jb25zZW5zdS5vcmcnKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5fY21wID0gbmV3IE5vdFlldEltcGxlbWVudGVkQ21wKDE2OSwgdGhpcy5fZG9jdW1lbnQsICdNYXBweScsIHVybE9mU2NyaXB0LCB0aGlzLl9iYWNrZW5kQ2FsbCk7XG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBlbHNlIGlmICh1cmxPZlNjcmlwdC5pbmNsdWRlcygnYWdvcmEucGwnKSB8fCB1cmxPZlNjcmlwdC5pbmNsdWRlcygnYWdvcmEubWdyLmNvbnNlbnN1Lm9yZycpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLl9jbXAgPSBuZXcgTm90WWV0SW1wbGVtZW50ZWRDbXAoMTcwLCB0aGlzLl9kb2N1bWVudCwgJ0FHT1JBIFNBJywgdXJsT2ZTY3JpcHQsIHRoaXMuX2JhY2tlbmRDYWxsKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGVsc2UgaWYgKHVybE9mU2NyaXB0LmluY2x1ZGVzKCduYXRlbWF0LnBsJykgfHwgdXJsT2ZTY3JpcHQuaW5jbHVkZXMoJ25hdGVtYXQubWdyLmNvbnNlbnN1Lm9yZycpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLl9jbXAgPSBuZXcgTm90WWV0SW1wbGVtZW50ZWRDbXAoMTc1LCB0aGlzLl9kb2N1bWVudCwgJ0dsb2IgMzYwIFNwLiB6IG8uby4nLCB1cmxPZlNjcmlwdCwgdGhpcy5fYmFja2VuZENhbGwpO1xuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgZWxzZSBpZiAodXJsT2ZTY3JpcHQuaW5jbHVkZXMoJ21hcmZlZWwuY29tJykgfHwgdXJsT2ZTY3JpcHQuaW5jbHVkZXMoJ21hcmZlZWwubWdyLmNvbnNlbnN1Lm9yZycpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLl9jbXAgPSBuZXcgTm90WWV0SW1wbGVtZW50ZWRDbXAoMTgxLCB0aGlzLl9kb2N1bWVudCwgJ01hcmZlZWwgU29sdXRpb25zIFMuTCcsIHVybE9mU2NyaXB0LCB0aGlzLl9iYWNrZW5kQ2FsbCk7XG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBlbHNlIGlmICh1cmxPZlNjcmlwdC5pbmNsdWRlcygnc3ViMnRlY2guY29tJykgfHwgdXJsT2ZTY3JpcHQuaW5jbHVkZXMoJzJjb25zZW50Lm1nci5jb25zZW5zdS5vcmcnKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5fY21wID0gbmV3IE5vdFlldEltcGxlbWVudGVkQ21wKDE4MywgdGhpcy5fZG9jdW1lbnQsICdTdWIyIFRlY2hub2xvZ2llcyBMdGQnLCB1cmxPZlNjcmlwdCwgdGhpcy5fYmFja2VuZENhbGwpO1xuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgZWxzZSBpZiAodXJsT2ZTY3JpcHQuaW5jbHVkZXMoJ3BsYXl3aXJlLmNvbScpIHx8IHVybE9mU2NyaXB0LmluY2x1ZGVzKCdwbGF5d2lyZS5tZ3IuY29uc2Vuc3Uub3JnJykpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuX2NtcCA9IG5ldyBOb3RZZXRJbXBsZW1lbnRlZENtcCgxODUsIHRoaXMuX2RvY3VtZW50LCAnUGxheXdpcmUgTExDJywgdXJsT2ZTY3JpcHQsIHRoaXMuX2JhY2tlbmRDYWxsKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGVsc2UgaWYgKHVybE9mU2NyaXB0LmluY2x1ZGVzKCd2ZW5hdHVzbWVkaWEuY29tJykgfHwgdXJsT2ZTY3JpcHQuaW5jbHVkZXMoJ3ZlbmF0dXMubWdyLmNvbnNlbnN1Lm9yZycpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLl9jbXAgPSBuZXcgTm90WWV0SW1wbGVtZW50ZWRDbXAoMTg2LCB0aGlzLl9kb2N1bWVudCwgJ1ZlbmF0dXMgTWVkaWEgTGltaXRlZCcsIHVybE9mU2NyaXB0LCB0aGlzLl9iYWNrZW5kQ2FsbCk7XG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBlbHNlIGlmICh1cmxPZlNjcmlwdC5pbmNsdWRlcygncnRwLnB0JykgfHwgdXJsT2ZTY3JpcHQuaW5jbHVkZXMoJ3J0cC5tZ3IuY29uc2Vuc3Uub3JnJykpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuX2NtcCA9IG5ldyBOb3RZZXRJbXBsZW1lbnRlZENtcCgxOTMsIHRoaXMuX2RvY3VtZW50LCAnUlRQIFNBJywgdXJsT2ZTY3JpcHQsIHRoaXMuX2JhY2tlbmRDYWxsKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGVsc2UgaWYgKHVybE9mU2NyaXB0LmluY2x1ZGVzKCdzcGlsZ2FtZXMuY29tJykgfHwgdXJsT2ZTY3JpcHQuaW5jbHVkZXMoJ3NwaWxnYW1lcy5tZ3IuY29uc2Vuc3Uub3JnJykpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuX2NtcCA9IG5ldyBOb3RZZXRJbXBsZW1lbnRlZENtcCgxOTQsIHRoaXMuX2RvY3VtZW50LCAnU3BpbCBHYW1lcyBCLlYuJywgdXJsT2ZTY3JpcHQsIHRoaXMuX2JhY2tlbmRDYWxsKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGVsc2UgaWYgKHVybE9mU2NyaXB0LmluY2x1ZGVzKCdud3MuYWknKSB8fCB1cmxPZlNjcmlwdC5pbmNsdWRlcygnbndzLm1nci5jb25zZW5zdS5vcmcnKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5fY21wID0gbmV3IE5vdFlldEltcGxlbWVudGVkQ21wKDE5NiwgdGhpcy5fZG9jdW1lbnQsICdOZXdzcm9vbSBBSSBMdGQuJywgdXJsT2ZTY3JpcHQsIHRoaXMuX2JhY2tlbmRDYWxsKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGVsc2UgaWYgKHVybE9mU2NyaXB0LmluY2x1ZGVzKCdwdWJseS5jb21lbicpIHx8IHVybE9mU2NyaXB0LmluY2x1ZGVzKCdwdWJseS5tZ3IuY29uc2Vuc3Uub3JnJykpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuX2NtcCA9IG5ldyBOb3RZZXRJbXBsZW1lbnRlZENtcCgxOTcsIHRoaXMuX2RvY3VtZW50LCAnUHVibHkgbHRkJywgdXJsT2ZTY3JpcHQsIHRoaXMuX2JhY2tlbmRDYWxsKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGVsc2UgaWYgKHVybE9mU2NyaXB0LmluY2x1ZGVzKCdiaXRxdWVlbi5jb20nKSB8fCB1cmxPZlNjcmlwdC5pbmNsdWRlcygnYml0cXVlZW4ubWdyLmNvbnNlbnN1Lm9yZycpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLl9jbXAgPSBuZXcgTm90WWV0SW1wbGVtZW50ZWRDbXAoMjA1LCB0aGlzLl9kb2N1bWVudCwgJ0JpdCBRIEhvbGRpbmdzIExpbWl0ZWQnLCB1cmxPZlNjcmlwdCwgdGhpcy5fYmFja2VuZENhbGwpO1xuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgZWxzZSBpZiAodXJsT2ZTY3JpcHQuaW5jbHVkZXMoJ3BhZ2VzamF1bmVzLmZyJykgfHwgdXJsT2ZTY3JpcHQuaW5jbHVkZXMoJ3BhZ2VzamF1bmVzLm1nci5jb25zZW5zdS5vcmcnKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5fY21wID0gbmV3IE5vdFlldEltcGxlbWVudGVkQ21wKDIwNiwgdGhpcy5fZG9jdW1lbnQsICdQQUdFU0pBVU5FUycsIHVybE9mU2NyaXB0LCB0aGlzLl9iYWNrZW5kQ2FsbCk7XG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBlbHNlIGlmICh1cmxPZlNjcmlwdC5pbmNsdWRlcygnZ29sZGVuYmVlcy5mcicpIHx8IHVybE9mU2NyaXB0LmluY2x1ZGVzKCdnb2xkZW5iZWVzLm1nci5jb25zZW5zdS5vcmcnKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5fY21wID0gbmV3IE5vdFlldEltcGxlbWVudGVkQ21wKDIwOCwgdGhpcy5fZG9jdW1lbnQsICdHb2xkZW4gQmVlcycsIHVybE9mU2NyaXB0LCB0aGlzLl9iYWNrZW5kQ2FsbCk7XG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBlbHNlIGlmICh1cmxPZlNjcmlwdC5pbmNsdWRlcygnbGlmZXN0cmVldC5jb20nKSB8fCB1cmxPZlNjcmlwdC5pbmNsdWRlcygnbGlmZXN0cmVldC5tZ3IuY29uc2Vuc3Uub3JnJykpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuX2NtcCA9IG5ldyBOb3RZZXRJbXBsZW1lbnRlZENtcCgyMDksIHRoaXMuX2RvY3VtZW50LCAnTGlmZVN0cmVldCBDb3Jwb3JhdGlvbicsIHVybE9mU2NyaXB0LCB0aGlzLl9iYWNrZW5kQ2FsbCk7XG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBlbHNlIGlmICh1cmxPZlNjcmlwdC5pbmNsdWRlcygnc2luZ2xlc3BvdC5jb21lbicpIHx8IHVybE9mU2NyaXB0LmluY2x1ZGVzKCdzaW5nbGVzcG90Lm1nci5jb25zZW5zdS5vcmcnKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5fY21wID0gbmV3IE5vdFlldEltcGxlbWVudGVkQ21wKDIxMiwgdGhpcy5fZG9jdW1lbnQsICdTaW5nbGVzcG90JywgdXJsT2ZTY3JpcHQsIHRoaXMuX2JhY2tlbmRDYWxsKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGVsc2UgaWYgKHVybE9mU2NyaXB0LmluY2x1ZGVzKCdsZWJvbmNvaW4uZnInKSB8fCB1cmxPZlNjcmlwdC5pbmNsdWRlcygnbGJjLm1nci5jb25zZW5zdS5vcmcnKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5fY21wID0gbmV3IE5vdFlldEltcGxlbWVudGVkQ21wKDIxNCwgdGhpcy5fZG9jdW1lbnQsICdMQkMgRnJhbmNlJywgdXJsT2ZTY3JpcHQsIHRoaXMuX2JhY2tlbmRDYWxsKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGVsc2UgaWYgKHVybE9mU2NyaXB0LmluY2x1ZGVzKCdyZ3BkLXNtYXJ0Y2xpcC5jb20nKSB8fCB1cmxPZlNjcmlwdC5pbmNsdWRlcygnc21hcnRjbGlwbGF0YW0ubWdyLmNvbnNlbnN1Lm9yZycpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLl9jbXAgPSBuZXcgTm90WWV0SW1wbGVtZW50ZWRDbXAoMjE1LCB0aGlzLl9kb2N1bWVudCwgJ1NtYXJ0Y2xpcCBIaXNwYW5pYSBTLkwuJywgdXJsT2ZTY3JpcHQsIHRoaXMuX2JhY2tlbmRDYWxsKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGVsc2UgaWYgKHVybE9mU2NyaXB0LmluY2x1ZGVzKCdsaXN0b25pYy5jb20nKSB8fCB1cmxPZlNjcmlwdC5pbmNsdWRlcygnbGlzdG9uaWMubWdyLmNvbnNlbnN1Lm9yZycpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLl9jbXAgPSBuZXcgTm90WWV0SW1wbGVtZW50ZWRDbXAoMjE2LCB0aGlzLl9kb2N1bWVudCwgJ0xpc3RvbmljIHNwLiB6IG8uIG8uJywgdXJsT2ZTY3JpcHQsIHRoaXMuX2JhY2tlbmRDYWxsKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGVsc2UgaWYgKHVybE9mU2NyaXB0LmluY2x1ZGVzKCdibWluZC5lcycpIHx8IHVybE9mU2NyaXB0LmluY2x1ZGVzKCdibWluZC5tZ3IuY29uc2Vuc3Uub3JnJykpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuX2NtcCA9IG5ldyBOb3RZZXRJbXBsZW1lbnRlZENtcCgyMTcsIHRoaXMuX2RvY3VtZW50LCAnQk1JTkQgU0FMRVMgTUFLRVIgQ09NUEFOWSBTLkwuJywgdXJsT2ZTY3JpcHQsIHRoaXMuX2JhY2tlbmRDYWxsKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGVsc2UgaWYgKHVybE9mU2NyaXB0LmluY2x1ZGVzKCdyY3NwdWJibGljaXRhLml0JykgfHwgdXJsT2ZTY3JpcHQuaW5jbHVkZXMoJ3Jjc21lZGlhZ3JvdXAubWdyLmNvbnNlbnN1Lm9yZycpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLl9jbXAgPSBuZXcgTm90WWV0SW1wbGVtZW50ZWRDbXAoMjE4LCB0aGlzLl9kb2N1bWVudCwgJ1JDUyBNZWRpYUdyb3VwIFMucC5BLicsIHVybE9mU2NyaXB0LCB0aGlzLl9iYWNrZW5kQ2FsbCk7XG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBlbHNlIGlmICh1cmxPZlNjcmlwdC5pbmNsdWRlcygnYWxsZWdyby5wbCcpIHx8IHVybE9mU2NyaXB0LmluY2x1ZGVzKCdhbGxlZ3JvLm1nci5jb25zZW5zdS5vcmcnKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5fY21wID0gbmV3IE5vdFlldEltcGxlbWVudGVkQ21wKDIyMCwgdGhpcy5fZG9jdW1lbnQsICdBbGxlZ3JvLnBsIFNwIHogby5vLicsIHVybE9mU2NyaXB0LCB0aGlzLl9iYWNrZW5kQ2FsbCk7XG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBlbHNlIGlmICh1cmxPZlNjcmlwdC5pbmNsdWRlcygnZGVudHN1YWVnaXNuZXR3b3JrLmRlJykgfHwgdXJsT2ZTY3JpcHQuaW5jbHVkZXMoJ2Rhbi5tZ3IuY29uc2Vuc3Uub3JnJykpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuX2NtcCA9IG5ldyBOb3RZZXRJbXBsZW1lbnRlZENtcCgyMjEsIHRoaXMuX2RvY3VtZW50LCAnRGVudHN1IEFlZ2lzIE5ldHdvcmsgR2VybWFueSBHbWJIJywgdXJsT2ZTY3JpcHQsIHRoaXMuX2JhY2tlbmRDYWxsKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGVsc2UgaWYgKHVybE9mU2NyaXB0LmluY2x1ZGVzKCdwYXJ1dmVuZHUuZnInKSB8fCB1cmxPZlNjcmlwdC5pbmNsdWRlcygncGFydXZlbmR1Lm1nci5jb25zZW5zdS5vcmcnKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5fY21wID0gbmV3IE5vdFlldEltcGxlbWVudGVkQ21wKDIyMiwgdGhpcy5fZG9jdW1lbnQsICdQYXJ1VmVuZHUuZnInLCB1cmxPZlNjcmlwdCwgdGhpcy5fYmFja2VuZENhbGwpO1xuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgZWxzZSBpZiAodXJsT2ZTY3JpcHQuaW5jbHVkZXMoJ2dlZGlzcGEuaXQnKSB8fCB1cmxPZlNjcmlwdC5pbmNsdWRlcygnZ2VkaS5tZ3IuY29uc2Vuc3Uub3JnJykpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuX2NtcCA9IG5ldyBOb3RZZXRJbXBsZW1lbnRlZENtcCgyMjMsIHRoaXMuX2RvY3VtZW50LCAnR2VkaSBEaWdpdGFsIHMuci5sLicsIHVybE9mU2NyaXB0LCB0aGlzLl9iYWNrZW5kQ2FsbCk7XG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBlbHNlIGlmICgodXJsT2ZTY3JpcHQuaW5jbHVkZXMoJ2Vuc2lnaHRlbi5jb20nKSB8fCB1cmxPZlNjcmlwdC5pbmNsdWRlcygnZW5zaWdodGVuLm1nci5jb25zZW5zdS5vcmcnKSkgJiYgIXVybE9mU2NyaXB0LmluY2x1ZGVzKCduZXh1cy5lbnNpZ2h0ZW4uY29tJykpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuX2NtcCA9IG5ldyBOb3RZZXRJbXBsZW1lbnRlZENtcCgyMjQsIHRoaXMuX2RvY3VtZW50LCAnRW5zaWdodGVuLCBJbmMnLCB1cmxPZlNjcmlwdCwgdGhpcy5fYmFja2VuZENhbGwpO1xuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgZWxzZSBpZiAodXJsT2ZTY3JpcHQuaW5jbHVkZXMoJ2lkbW5ldC5ncnVwYXpwci5wbCcpIHx8IHVybE9mU2NyaXB0LmluY2x1ZGVzKCdpZG1uZXQubWdyLmNvbnNlbnN1Lm9yZycpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLl9jbXAgPSBuZXcgTm90WWV0SW1wbGVtZW50ZWRDbXAoMjI1LCB0aGlzLl9kb2N1bWVudCwgJ0ludGVybmV0b3d5IERvbSBNZWRpb3d5IG5ldCBTLkEuJywgdXJsT2ZTY3JpcHQsIHRoaXMuX2JhY2tlbmRDYWxsKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGVsc2UgaWYgKHVybE9mU2NyaXB0LmluY2x1ZGVzKCdncnVwcG9hdGhlc2lzLml0JykgfHwgdXJsT2ZTY3JpcHQuaW5jbHVkZXMoJ2dydXBwb2F0aGVzaXMubWdyLmNvbnNlbnN1Lm9yZycpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLl9jbXAgPSBuZXcgTm90WWV0SW1wbGVtZW50ZWRDbXAoMjI2LCB0aGlzLl9kb2N1bWVudCwgJ1NvY2lldMOgIEF0aGVzaXMgUy5wLkEuJywgdXJsT2ZTY3JpcHQsIHRoaXMuX2JhY2tlbmRDYWxsKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGVsc2UgaWYgKHVybE9mU2NyaXB0LmluY2x1ZGVzKCdoZWFsdGhsaW5lLmNvbScpIHx8IHVybE9mU2NyaXB0LmluY2x1ZGVzKCdoZWFsdGhsaW5lbWVkaWEubWdyLmNvbnNlbnN1Lm9yZycpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLl9jbXAgPSBuZXcgTm90WWV0SW1wbGVtZW50ZWRDbXAoMjI3LCB0aGlzLl9kb2N1bWVudCwgJ0hlYWx0aGxpbmUgTWVkaWEsIEluYy4nLCB1cmxPZlNjcmlwdCwgdGhpcy5fYmFja2VuZENhbGwpO1xuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgZWxzZSBpZiAodXJsT2ZTY3JpcHQuaW5jbHVkZXMoJ3RoaXJkZmxvb3IuaXQnKSB8fCB1cmxPZlNjcmlwdC5pbmNsdWRlcygndGhpcmRmbG9vci5tZ3IuY29uc2Vuc3Uub3JnJykpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuX2NtcCA9IG5ldyBOb3RZZXRJbXBsZW1lbnRlZENtcCgyMjgsIHRoaXMuX2RvY3VtZW50LCAnVGhpcmRmbG9vciBTUkwnLCB1cmxPZlNjcmlwdCwgdGhpcy5fYmFja2VuZENhbGwpO1xuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgZWxzZSBpZiAodXJsT2ZTY3JpcHQuaW5jbHVkZXMoJ3NuaWdlbHdlYi5jb20nKSB8fCB1cmxPZlNjcmlwdC5pbmNsdWRlcygnc25pZ2Vsd2ViLm1nci5jb25zZW5zdS5vcmcnKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5fY21wID0gbmV3IE5vdFlldEltcGxlbWVudGVkQ21wKDIyOSwgdGhpcy5fZG9jdW1lbnQsICdTbmlnZWwgV2ViIFNlcnZpY2VzIExpbWl0ZWQnLCB1cmxPZlNjcmlwdCwgdGhpcy5fYmFja2VuZENhbGwpO1xuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgZWxzZSBpZiAodXJsT2ZTY3JpcHQuaW5jbHVkZXMoJ3ByeXdhdG5vc2MuaW50ZXJpYS5wbCcpIHx8IHVybE9mU2NyaXB0LmluY2x1ZGVzKCdpbnRlcmlhLm1nci5jb25zZW5zdS5vcmcnKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5fY21wID0gbmV3IE5vdFlldEltcGxlbWVudGVkQ21wKDIzMSwgdGhpcy5fZG9jdW1lbnQsICdHcnVwYSBJbnRlcmlhLnBsIFNwLiB6IG8uby4gc3AuIGsuJywgdXJsT2ZTY3JpcHQsIHRoaXMuX2JhY2tlbmRDYWxsKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGVsc2UgaWYgKHVybE9mU2NyaXB0LmluY2x1ZGVzKCdhZG51bnRpdXMuY29tJykgfHwgdXJsT2ZTY3JpcHQuaW5jbHVkZXMoJ2FkbnVudGl1c2NvbnNlbnQubWdyLmNvbnNlbnN1Lm9yZycpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLl9jbXAgPSBuZXcgTm90WWV0SW1wbGVtZW50ZWRDbXAoMjM1LCB0aGlzLl9kb2N1bWVudCwgJ0FkbnVudGl1cyBBUycsIHVybE9mU2NyaXB0LCB0aGlzLl9iYWNrZW5kQ2FsbCk7XG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBlbHNlIGlmICh1cmxPZlNjcmlwdC5pbmNsdWRlcygnd2ViYWRzLm5sJykgfHwgdXJsT2ZTY3JpcHQuaW5jbHVkZXMoJ3dlYmFkcy5tZ3IuY29uc2Vuc3Uub3JnJykpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuX2NtcCA9IG5ldyBOb3RZZXRJbXBsZW1lbnRlZENtcCgyMzYsIHRoaXMuX2RvY3VtZW50LCAnV2ViQWRzIEIuVicsIHVybE9mU2NyaXB0LCB0aGlzLl9iYWNrZW5kQ2FsbCk7XG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBlbHNlIGlmICh1cmxPZlNjcmlwdC5pbmNsdWRlcygndGllbXBvLmNvbScpIHx8IHVybE9mU2NyaXB0LmluY2x1ZGVzKCdtZXRlb3JlZC5tZ3IuY29uc2Vuc3Uub3JnJykpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuX2NtcCA9IG5ldyBOb3RZZXRJbXBsZW1lbnRlZENtcCgyMzcsIHRoaXMuX2RvY3VtZW50LCAnQUxQUkVEIFNMJywgdXJsT2ZTY3JpcHQsIHRoaXMuX2JhY2tlbmRDYWxsKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGVsc2UgaWYgKHVybE9mU2NyaXB0LmluY2x1ZGVzKCduZXR3b3JrLW4uY29tJykgfHwgdXJsT2ZTY3JpcHQuaW5jbHVkZXMoJ25ldHdvcmtuLm1nci5jb25zZW5zdS5vcmcnKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5fY21wID0gbmV3IE5vdFlldEltcGxlbWVudGVkQ21wKDI0MCwgdGhpcy5fZG9jdW1lbnQsICdOZXR3b3JrIE4gTHRkJywgdXJsT2ZTY3JpcHQsIHRoaXMuX2JhY2tlbmRDYWxsKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGVsc2UgaWYgKHVybE9mU2NyaXB0LmluY2x1ZGVzKCdjYWZlbWVkaWEuY29tJykgfHwgdXJsT2ZTY3JpcHQuaW5jbHVkZXMoJ2NhZmVtZWRpYS5tZ3IuY29uc2Vuc3Uub3JnJykpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuX2NtcCA9IG5ldyBOb3RZZXRJbXBsZW1lbnRlZENtcCgyNDEsIHRoaXMuX2RvY3VtZW50LCAnQ2FmZU1lZGlhL0FkVGhyaXZlJywgdXJsT2ZTY3JpcHQsIHRoaXMuX2JhY2tlbmRDYWxsKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGVsc2UgaWYgKHVybE9mU2NyaXB0LmluY2x1ZGVzKCduaXRyb3BheS5jb20nKSB8fCB1cmxPZlNjcmlwdC5pbmNsdWRlcygnbml0cm9wYXkubWdyLmNvbnNlbnN1Lm9yZycpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLl9jbXAgPSBuZXcgTm90WWV0SW1wbGVtZW50ZWRDbXAoMjQyLCB0aGlzLl9kb2N1bWVudCwgJ0dHIFNvZnR3YXJlLCBMTEMnLCB1cmxPZlNjcmlwdCwgdGhpcy5fYmFja2VuZENhbGwpO1xuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgZWxzZSBpZiAodXJsT2ZTY3JpcHQuaW5jbHVkZXMoJ2xpdmluZ2x5bWVkaWEuY29tJykgfHwgdXJsT2ZTY3JpcHQuaW5jbHVkZXMoJ2xpdmluZ2x5bWVkaWEubWdyLmNvbnNlbnN1Lm9yZycpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLl9jbXAgPSBuZXcgTm90WWV0SW1wbGVtZW50ZWRDbXAoMjQ0LCB0aGlzLl9kb2N1bWVudCwgJ0xpdmluZ2x5IE1lZGlhJywgdXJsT2ZTY3JpcHQsIHRoaXMuX2JhY2tlbmRDYWxsKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGVsc2UgaWYgKHVybE9mU2NyaXB0LmluY2x1ZGVzKCdvdmVyd29sZi5jb20nKSB8fCB1cmxPZlNjcmlwdC5pbmNsdWRlcygnb3ZlcndvbGYubWdyLmNvbnNlbnN1Lm9yZycpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLl9jbXAgPSBuZXcgTm90WWV0SW1wbGVtZW50ZWRDbXAoMjQ2LCB0aGlzLl9kb2N1bWVudCwgJ092ZXJ3b2xmIEx0ZC4nLCB1cmxPZlNjcmlwdCwgdGhpcy5fYmFja2VuZENhbGwpO1xuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgZWxzZSBpZiAodXJsT2ZTY3JpcHQuaW5jbHVkZXMoJ3Nlem5hbS5jeicpIHx8IHVybE9mU2NyaXB0LmluY2x1ZGVzKCdzZXpuYW0ubWdyLmNvbnNlbnN1Lm9yZycpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLl9jbXAgPSBuZXcgTm90WWV0SW1wbGVtZW50ZWRDbXAoMjQ3LCB0aGlzLl9kb2N1bWVudCwgJ1Nlem5hbS5jeiwgYS5zLicsIHVybE9mU2NyaXB0LCB0aGlzLl9iYWNrZW5kQ2FsbCk7XG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBlbHNlIGlmICh1cmxPZlNjcmlwdC5pbmNsdWRlcygnbWFpcmR1bW9udC1uZXRsZXRpeC5jb20nKSB8fCB1cmxPZlNjcmlwdC5pbmNsdWRlcygnbWRueGNtcC5tZ3IuY29uc2Vuc3Uub3JnJykpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuX2NtcCA9IG5ldyBOb3RZZXRJbXBsZW1lbnRlZENtcCgyNTIsIHRoaXMuX2RvY3VtZW50LCAnTUFJUkRVTU9OVCBORVRMRVRJWCBHbWJIJkNvLiBLRycsIHVybE9mU2NyaXB0LCB0aGlzLl9iYWNrZW5kQ2FsbCk7XG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBlbHNlIGlmICh1cmxPZlNjcmlwdC5pbmNsdWRlcygnYWRtYXRpYy5jb20udHInKSB8fCB1cmxPZlNjcmlwdC5pbmNsdWRlcygnYWRtYXRpYy5tZ3IuY29uc2Vuc3Uub3JnJykpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuX2NtcCA9IG5ldyBOb3RZZXRJbXBsZW1lbnRlZENtcCgyNTYsIHRoaXMuX2RvY3VtZW50LCAnQWRNYXRpYyBNZWR5YSBBUycsIHVybE9mU2NyaXB0LCB0aGlzLl9iYWNrZW5kQ2FsbCk7XG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBlbHNlIGlmICh1cmxPZlNjcmlwdC5pbmNsdWRlcygnYXV0b21hdHRpYy5jb20nKSB8fCB1cmxPZlNjcmlwdC5pbmNsdWRlcygnYXV0b21hdHRpYy5tZ3IuY29uc2Vuc3Uub3JnJykpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuX2NtcCA9IG5ldyBOb3RZZXRJbXBsZW1lbnRlZENtcCgyNTgsIHRoaXMuX2RvY3VtZW50LCAnQXV0b21hdHRpYywgSW5jLicsIHVybE9mU2NyaXB0LCB0aGlzLl9iYWNrZW5kQ2FsbCk7XG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBlbHNlIGlmICh1cmxPZlNjcmlwdC5pbmNsdWRlcygndHJ1ZWRhdGEuY28nKSB8fCB1cmxPZlNjcmlwdC5pbmNsdWRlcygndHJ1ZWRhdGEubWdyLmNvbnNlbnN1Lm9yZycpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLl9jbXAgPSBuZXcgTm90WWV0SW1wbGVtZW50ZWRDbXAoMjYyLCB0aGlzLl9kb2N1bWVudCwgJ1RydWVEYXRhIFNvbHV0aW9ucywgSW5jLicsIHVybE9mU2NyaXB0LCB0aGlzLl9iYWNrZW5kQ2FsbCk7XG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBlbHNlIGlmICh1cmxPZlNjcmlwdC5pbmNsdWRlcygnc2VjdXJlcHJpdmFjeS5haScpIHx8IHVybE9mU2NyaXB0LmluY2x1ZGVzKCdzZWN1cmVwcml2YWN5Lm1nci5jb25zZW5zdS5vcmcnKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5fY21wID0gbmV3IE5vdFlldEltcGxlbWVudGVkQ21wKDI2NCwgdGhpcy5fZG9jdW1lbnQsICdTZWN1cmUgUHJpdmFjeScsIHVybE9mU2NyaXB0LCB0aGlzLl9iYWNrZW5kQ2FsbCk7XG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBlbHNlIGlmICh1cmxPZlNjcmlwdC5pbmNsdWRlcygnYWR2Zm4uY29tJykgfHwgdXJsT2ZTY3JpcHQuaW5jbHVkZXMoJ2FkdmZuLm1nci5jb25zZW5zdS5vcmcnKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5fY21wID0gbmV3IE5vdFlldEltcGxlbWVudGVkQ21wKDI2NSwgdGhpcy5fZG9jdW1lbnQsICdBRFZGTiBQTEMnLCB1cmxPZlNjcmlwdCwgdGhpcy5fYmFja2VuZENhbGwpO1xuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgZWxzZSBpZiAodXJsT2ZTY3JpcHQuaW5jbHVkZXMoJ21lZG1lLnBsJykgfHwgdXJsT2ZTY3JpcHQuaW5jbHVkZXMoJ3BoYXJtYXBhcnRuZXIubWdyLmNvbnNlbnN1Lm9yZycpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLl9jbXAgPSBuZXcgTm90WWV0SW1wbGVtZW50ZWRDbXAoMjY4LCB0aGlzLl9kb2N1bWVudCwgJ1BoYXJtYSBQYXJ0bmVyIHNwLiB6IG8uby4nLCB1cmxPZlNjcmlwdCwgdGhpcy5fYmFja2VuZENhbGwpO1xuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgZWxzZSBpZiAodXJsT2ZTY3JpcHQuaW5jbHVkZXMoJ25leHQxNC5jb20nKSB8fCB1cmxPZlNjcmlwdC5pbmNsdWRlcygnbmV4dDE0Lm1nci5jb25zZW5zdS5vcmcnKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5fY21wID0gbmV3IE5vdFlldEltcGxlbWVudGVkQ21wKDI3MywgdGhpcy5fZG9jdW1lbnQsICdOZXh0MTQgU3BBJywgdXJsT2ZTY3JpcHQsIHRoaXMuX2JhY2tlbmRDYWxsKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGVsc2UgaWYgKHVybE9mU2NyaXB0LmluY2x1ZGVzKCdhbGxlcmhvbGRpbmcuZGsnKSB8fCB1cmxPZlNjcmlwdC5pbmNsdWRlcygnYWxsZXIubWdyLmNvbnNlbnN1Lm9yZycpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLl9jbXAgPSBuZXcgTm90WWV0SW1wbGVtZW50ZWRDbXAoMjc0LCB0aGlzLl9kb2N1bWVudCwgJ0FsbGVyIE1lZGlhJywgdXJsT2ZTY3JpcHQsIHRoaXMuX2JhY2tlbmRDYWxsKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGVsc2UgaWYgKHVybE9mU2NyaXB0LmluY2x1ZGVzKCdyaW5naWVyYXhlbHNwcmluZ2VyLnBsJykgfHwgdXJsT2ZTY3JpcHQuaW5jbHVkZXMoJ3Jhc3AubWdyLmNvbnNlbnN1Lm9yZycpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLl9jbXAgPSBuZXcgTm90WWV0SW1wbGVtZW50ZWRDbXAoMjgwLCB0aGlzLl9kb2N1bWVudCwgJ1JpbmdpZXIgQXhlbCBTcHJpbmdlciBQb2xza2EnLCB1cmxPZlNjcmlwdCwgdGhpcy5fYmFja2VuZENhbGwpO1xuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgZWxzZSBpZiAodXJsT2ZTY3JpcHQuaW5jbHVkZXMoJ3B1Ym5hdGl2ZS5uZXQnKSB8fCB1cmxPZlNjcmlwdC5pbmNsdWRlcygncHVibmF0aXZlLm1nci5jb25zZW5zdS5vcmcnKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5fY21wID0gbmV3IE5vdFlldEltcGxlbWVudGVkQ21wKDI4MSwgdGhpcy5fZG9jdW1lbnQsICdQdWJOYXRpdmUgR21iSCcsIHVybE9mU2NyaXB0LCB0aGlzLl9iYWNrZW5kQ2FsbCk7XG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBlbHNlIGlmICh1cmxPZlNjcmlwdC5pbmNsdWRlcygndGhlZnJlZWRpY3Rpb25hcnkuY29tJykgfHwgdXJsT2ZTY3JpcHQuaW5jbHVkZXMoJ3RoZWZyZWVkaWN0aW9uYXJ5Lm1nci5jb25zZW5zdS5vcmcnKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5fY21wID0gbmV3IE5vdFlldEltcGxlbWVudGVkQ21wKDI4MiwgdGhpcy5fZG9jdW1lbnQsICdGYXJsZXggSW5jJywgdXJsT2ZTY3JpcHQsIHRoaXMuX2JhY2tlbmRDYWxsKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGVsc2UgaWYgKHVybE9mU2NyaXB0LmluY2x1ZGVzKCdvc2Fuby5jb20nKSB8fCB1cmxPZlNjcmlwdC5pbmNsdWRlcygnb3Nhbm8uanMnKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5fY21wID0gbmV3IE5vdFlldEltcGxlbWVudGVkQ21wKDI4MiwgdGhpcy5fZG9jdW1lbnQsICdPc2FubyBJbmMuLENvb2tpZSBDb25zZW50JywgdXJsT2ZTY3JpcHQsIHRoaXMuX2JhY2tlbmRDYWxsKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgZm9yIChsZXQga2V5IGluIGJ1dHRvbnMpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgYnV0dG9uID0gdGhpcy5fZG9jdW1lbnQucXVlcnlTZWxlY3RvcihrZXkpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChVdGlscy5vYmplY3RDbGlja2FibGUoYnV0dG9uKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBVdGlscy5sb2coXCJCYWNrZW5kOiBcIiArIHRoaXMuX2JhY2tlbmRDYWxsKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5fY21wID0gbmV3IEN1c3RvbUltcGwodGhpcy5fZG9jdW1lbnQsIGtleSwgdGhpcy5fYmFja2VuZENhbGwpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhayBhbGxTY3JpcHRzO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfSAvLyBFbHNlXG4gICAgICAgICAgICAgICAgfSAvLyBJRiAtIEphdmFTY3JpcHQgaXMgRGVmaW5lZFxuICAgICAgICAgICAgfSAvLyBGb3IgTG9vcFxuICAgICAgICB9XG4gICAgICAgIGlmICh0aGlzLl9jbXApIHtcbiAgICAgICAgICAgIFV0aWxzLmxvZyhcIkNNUCBpcyBzZXQgbm93LiBDb25uZWN0IHRvIE9ic2VydmVyIGluIG5ldyBjb250ZXh0XCIpO1xuICAgICAgICAgICAgLy8gcmVtb3ZlIENvbm5lY3Rpb24gdG8gdGhlIGxvY2FsIE9ic2VydmVyXG4gICAgICAgICAgICB0aGlzLmRpc2Nvbm5lY3RPYnNlcnZlcigpO1xuICAgICAgICAgICAgLy8gbm93IGNvbm5lY3QgdG8gdGhlIE9ic2VydmVyLlxuICAgICAgICAgICAgdGhpcy5fY21wLmNvbm5lY3QoKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIFV0aWxzLmxvZyhcIi0tIFJ1biBUaHJ1IGNvbXBsZXRlZC4gTm8gSW5kaWNhdG9yIGZvciBKYXZhU2NyaXB0IG9mIGEgQ01QIHNvIGZhci5cIik7XG4gICAgICAgIH1cbiAgICB9XG4gICAgaW5JZnJhbWUoKSB7XG4gICAgfVxufVxuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5jb25zdCBkYXRlRm9ybWF0ID0gcmVxdWlyZShcImRhdGVmb3JtYXRcIik7XG5leHBvcnQgZGVmYXVsdCBjbGFzcyBVdGlscyB7XG4gICAgc3RhdGljIGxvZyhtZXNzYWdlKSB7XG4gICAgICAgIGNvbnNvbGUubG9nKGRhdGVGb3JtYXQobmV3IERhdGUoKSwgJ3l5eXktbW0tZGQgSEg6TU06c3MubCcpICsgXCIgXCIgKyBtZXNzYWdlKTtcbiAgICB9XG4gICAgc3RhdGljIGNyZWF0ZU1pbmltYWxDb25zZW50QnV0dG9uKGRvY3VtZW50LCBqYXZhU2NyaXB0KSB7XG4gICAgICAgIGxldCBsaW5rID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnYScpO1xuICAgICAgICBsaW5rLnRleHQgPSAnTWluaW1hbCBDb25zZW50JztcbiAgICAgICAgbGluay5zZXRBdHRyaWJ1dGUoXCJjbGFzc1wiLCBcIm1pbmltYWwtY29uc2VudFwiKTtcbiAgICAgICAgbGluay5ocmVmID0gamF2YVNjcmlwdDtcbiAgICAgICAgZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZChsaW5rKTtcbiAgICB9XG4gICAgc3RhdGljIG9iamVjdENsaWNrYWJsZShteU9iamVjdCkge1xuICAgICAgICByZXR1cm4gdHlwZW9mIG15T2JqZWN0ICE9PSAndW5kZWZpbmVkJyAmJiBteU9iamVjdCAmJiB0eXBlb2YgbXlPYmplY3QucGFyZW50RWxlbWVudCAhPT0gJ3VuZGVmaW5lZCcgJiYgbXlPYmplY3Qub2Zmc2V0UGFyZW50O1xuICAgIH1cbiAgICBzdGF0aWMgb2JqZWN0VmlzaWJsZShteU9iamVjdCkge1xuICAgICAgICByZXR1cm4gdHlwZW9mIG15T2JqZWN0ICE9PSAndW5kZWZpbmVkJyAmJiBteU9iamVjdCAmJiB0eXBlb2YgbXlPYmplY3QucGFyZW50RWxlbWVudCAhPT0gJ3VuZGVmaW5lZCc7XG4gICAgfVxuICAgIHN0YXRpYyBjaGVja0lmRGVmaW5lZEFuZE5vdE51bGwoZmllbGQpIHtcbiAgICAgICAgcmV0dXJuIHR5cGVvZiBmaWVsZCAhPT0gJ3VuZGVmaW5lZCcgJiYgZmllbGQgIT09IG51bGw7XG4gICAgfVxufVxuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5pbXBvcnQgVXRpbHMgZnJvbSBcIi4uL1V0aWxzXCI7XG5pbXBvcnQgQ01QIGZyb20gXCIuL0NNUFwiO1xuaW1wb3J0IENtcFR5cGUgZnJvbSBcIi4vQ21wVHlwZVwiO1xuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQm9ybGFicyB7XG4gICAgLy8gdGhpcyBpcyBub3QgYW4gSUFCIFNvbHV0aW9uXG4gICAgY29uc3RydWN0b3Iobm9kZSwgc2NyaXB0VXJsLCBiYWNrZW5kQ2FsbCkge1xuICAgICAgICB0aGlzLl9uYW1lID0gXCJCb3JsYWJzLm5ldFwiO1xuICAgICAgICBiYWNrZW5kQ2FsbC5jbXBEYXRhKDEwMDAxLCB0aGlzLl9uYW1lLCBzY3JpcHRVcmwsIENtcFR5cGUuRE9fTk9UX1dBSVQsIHRydWUpO1xuICAgICAgICB0aGlzLl9jbXAgPSBuZXcgQ01QKG5vZGUsIGJhY2tlbmRDYWxsLCB0aGlzKTtcbiAgICB9XG4gICAgZ2V0IG5hbWUoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9uYW1lO1xuICAgIH1cbiAgICBjb25uZWN0KCkge1xuICAgICAgICB0aGlzLl9jbXAuY29ubmVjdCgpO1xuICAgIH1cbiAgICAvKlxuICAgIGh0dHBzOi8vd3d3LjEyM2VmZml6aWVudGRhYmVpLmRlLywgaHR0cHM6Ly93d3cuYWJpYnVjaC1kZXNpZ25lci5kZS8sIGh0dHBzOi8vd3d3LnN0YXVic2F1Z2VyLWJlcmF0ZXIuZGUvIGh0dHBzOi8vd3d3LmFyZ2UuZGUvXG4gICAgICovXG4gICAgaGFuZGxlQ21wKCkge1xuICAgICAgICAvLyBTdGVwIDFcbiAgICAgICAgY29uc3QgcG9wdXAgPSBcImRpdi5fYnJsYnMtYm94LXdyYXBcIjtcbiAgICAgICAgbGV0IHBvcHVwRGl2ID0gdGhpcy5fY21wLnF1ZXJ5Tm9kZVNlbGVjdG9yKHBvcHVwKTtcbiAgICAgICAgY29uc3QgY2hlY2tib3hJbmRpY3RvciA9IFwiZGl2Ll9icmxicy1jaGVja2JveC1pbmRpY2F0b3JcIjtcbiAgICAgICAgbGV0IGNoZWNrYm94SW5kaWN0b3JEaXYgPSB0aGlzLl9jbXAucXVlcnlOb2RlU2VsZWN0b3JBbGwoY2hlY2tib3hJbmRpY3Rvcik7XG4gICAgICAgIFV0aWxzLmxvZyhcImNoZWNrYm94SW5kaWN0b3JEaXY6IFwiICsgY2hlY2tib3hJbmRpY3RvckRpdi5sZW5ndGgpO1xuICAgICAgICBjb25zdCBtZWRpYSA9IFwiaW5wdXQjY2hlY2tib3gtZXh0ZXJuYWwtbWVkaWFcIjtcbiAgICAgICAgbGV0IGlucHV0TWVkaWEgPSB0aGlzLl9jbXAucXVlcnlOb2RlU2VsZWN0b3IobWVkaWEpO1xuICAgICAgICBjb25zdCBzdGF0cyA9IFwiaW5wdXQjY2hlY2tib3gtc3RhdGlzdGljc1wiO1xuICAgICAgICBsZXQgaW5wdXRTdGF0cyA9IHRoaXMuX2NtcC5xdWVyeU5vZGVTZWxlY3RvcihzdGF0cyk7XG4gICAgICAgIGNvbnN0IG1hcmtldGluZyA9IFwiaW5wdXQjY2hlY2tib3gtbWFya2V0aW5nXCI7XG4gICAgICAgIGxldCBpbnB1dE1hcmtldGluZyA9IHRoaXMuX2NtcC5xdWVyeU5vZGVTZWxlY3RvcihtYXJrZXRpbmcpO1xuICAgICAgICBjb25zdCBzYXZlID0gXCJhLl9icmxicy1idG5cIjtcbiAgICAgICAgbGV0IHNhdmVCdXR0b25zID0gdGhpcy5fY21wLnF1ZXJ5Tm9kZVNlbGVjdG9yQWxsKHNhdmUpO1xuICAgICAgICBVdGlscy5sb2coXCJzYXZlQnV0dG9uczogXCIgKyBzYXZlQnV0dG9ucy5sZW5ndGgpO1xuICAgICAgICBVdGlscy5sb2coXCJTdGF0ZTogXCIgKyB0aGlzLl9jbXAuc3RhdGUpO1xuICAgICAgICBpZiAoVXRpbHMub2JqZWN0Q2xpY2thYmxlKHBvcHVwRGl2KSAmJiB0aGlzLl9jbXAuc3RhdGUgPT09IDApIHtcbiAgICAgICAgICAgIFV0aWxzLmxvZyhcIkRpdiBGb3VuZFwiKTtcbiAgICAgICAgICAgIGlmIChVdGlscy5vYmplY3RDbGlja2FibGUoaW5wdXRNZWRpYSkpIHtcbiAgICAgICAgICAgICAgICBVdGlscy5sb2coXCJDbGlja2VkIGlucHV0TWVkaWFcIik7XG4gICAgICAgICAgICAgICAgaW5wdXRNZWRpYS5zZXRBdHRyaWJ1dGUoXCJjaGVja2VkXCIsIFwiZmFsc2VcIik7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoVXRpbHMub2JqZWN0Q2xpY2thYmxlKGlucHV0U3RhdHMpKSB7XG4gICAgICAgICAgICAgICAgVXRpbHMubG9nKFwiQ2xpY2tlZCBpbnB1dFN0YXRzdFwiKTtcbiAgICAgICAgICAgICAgICBpbnB1dFN0YXRzLnNldEF0dHJpYnV0ZShcImNoZWNrZWRcIiwgXCJmYWxzZVwiKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChVdGlscy5vYmplY3RDbGlja2FibGUoaW5wdXRNYXJrZXRpbmcpKSB7XG4gICAgICAgICAgICAgICAgVXRpbHMubG9nKFwiQ2xpY2tlZCBpbnB1dE1hcmtldGluZ1wiKTtcbiAgICAgICAgICAgICAgICBpbnB1dE1hcmtldGluZy5zZXRBdHRyaWJ1dGUoXCJjaGVja2VkXCIsIFwiZmFsc2VcIik7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBsZXQgY2xpY2tlZCA9IGZhbHNlO1xuICAgICAgICAgICAgaWYgKHNhdmVCdXR0b25zICYmIHNhdmVCdXR0b25zLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgICAgICBzYXZlQnV0dG9ucy5mb3JFYWNoKGZ1bmN0aW9uIChzcGFuKSB7XG4gICAgICAgICAgICAgICAgICAgIFV0aWxzLmxvZyhzcGFuLmlubmVySFRNTCk7XG4gICAgICAgICAgICAgICAgICAgIGlmIChzcGFuLmlubmVySFRNTC5pbmNsdWRlcyhcImVzc2VuemllbGxlXCIpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBzcGFuLmNsaWNrKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICBVdGlscy5sb2coXCJDbGlja2VkIG9uIGVzc2VuemllbGxlXCIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgY2xpY2tlZCA9IHRydWU7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgZWxzZSBpZiAoc3Bhbi5pbm5lckhUTUwuaW5jbHVkZXMoXCJTcGVpY2hlcm5cIikpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHNwYW4uY2xpY2soKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIFV0aWxzLmxvZyhcIkNsaWNrZWQgb24gU3BlaWNoZXJuXCIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgY2xpY2tlZCA9IHRydWU7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChjbGlja2VkKSB7XG4gICAgICAgICAgICAgICAgVXRpbHMubG9nKFwiQ2xpY2tlZCwgcmVzZXQgbm93XCIpO1xuICAgICAgICAgICAgICAgIHRoaXMuX2NtcC5yZXNldCgpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxufVxuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5pbXBvcnQgVXRpbHMgZnJvbSBcIi4uL1V0aWxzXCI7XG5leHBvcnQgZGVmYXVsdCBjbGFzcyBDTVAge1xuICAgIGNvbnN0cnVjdG9yKG5vZGUsIGJhY2tlbmRDYWxsLCBjbXBJbXBsZW1lbnRhdGlvbikge1xuICAgICAgICAvKipcbiAgICAgICAgICogQ29uc3RydWN0b3IgZm9yIGFuIEFic3RyYWN0IENNUFxuICAgICAgICAgKlxuICAgICAgICAgKiBAcGFyYW0gbm9kZSBEb2N1bWVudCBSb290IE5vZGVcbiAgICAgICAgICogQHBhcmFtIG5hbWUgTmFtZSBmb3IgdGhlIENNUCBpbiBUZXh0XG4gICAgICAgICAqIEBwYXJhbSBzY3JpcHRVcmwgVVJMIGZyb20gd2l0aCB0aGUgQ01QIHdhcyBsb2FkZWRcbiAgICAgICAgICogQHBhcmFtIHR5cGUgRW51bWVyYXRpb24gb24gVHlwZSBvZiBDTVAgdG8gZGV0ZXJtaW5lIHdoZW4gd2UgbmVlZCB0byB0cmlnZ2VyIHRoZSBiYWNrZW5kIGNhbGwuXG4gICAgICAgICAqL1xuICAgICAgICB0aGlzLl9jb25maWcgPSB7IGF0dHJpYnV0ZXM6IHRydWUsIGNoaWxkTGlzdDogdHJ1ZSwgc3VidHJlZTogdHJ1ZSB9O1xuICAgICAgICB0aGlzLl9taW5pbWFsQ29uc2VudExpbmsgPSBcImEubWluaW1hbC1jb25zZW50XCI7XG4gICAgICAgIHRoaXMuX21heGltYWxMaW1pdE9mRG9tQ2hhbmdlVGlsbFN0b3AgPSAxNTA7XG4gICAgICAgIHRoaXMuX25vZGUgPSBub2RlO1xuICAgICAgICB0aGlzLl9zdGF0ZSA9IDA7XG4gICAgICAgIHRoaXMuX2NhbGxDb3VudGVyID0gMDtcbiAgICAgICAgdGhpcy5fY21wSW1wbGVtZW50YXRpb24gPSBjbXBJbXBsZW1lbnRhdGlvbjtcbiAgICAgICAgdGhpcy5fYmFja2VuZENhbGwgPSBiYWNrZW5kQ2FsbDtcbiAgICB9XG4gICAgZ2V0IHN0YXRlKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fc3RhdGU7XG4gICAgfVxuICAgIHNldCBzdGF0ZShzdGF0ZSkge1xuICAgICAgICB0aGlzLl9zdGF0ZSA9IHN0YXRlO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBHZXR0aW5nIHRoZSBSb290IE5vZGUgb2YgdGhlIERvY3VtZW50IHdoZXJlIGEgQ01QIGlzIHJ1bm5uaW5nXG4gICAgICpcbiAgICAgKiBAcmV0dXJucyB7Kn1cbiAgICAgKi9cbiAgICBnZXQgbm9kZSgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX25vZGU7XG4gICAgfVxuICAgIGdldCBtaW5pbWFsQ29uc2VudExpbmsoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9taW5pbWFsQ29uc2VudExpbms7XG4gICAgfVxuICAgIGNvbm5lY3QoKSB7XG4gICAgICAgIGxldCBfc2VsZiA9IHRoaXM7XG4gICAgICAgIHRoaXMuX29ic2VydmVyID0gbmV3IE11dGF0aW9uT2JzZXJ2ZXIoZnVuY3Rpb24gKG11dGF0aW9ucykge1xuICAgICAgICAgICAgX3NlbGYubWFpbkNtcEhhbmRsZXIobXV0YXRpb25zKTtcbiAgICAgICAgfSk7XG4gICAgICAgIHRoaXMuX29ic2VydmVyLm9ic2VydmUodGhpcy5fbm9kZSwgdGhpcy5fY29uZmlnKTtcbiAgICAgICAgLy8gaW4gY2FzZSB0aGVyZSBpcyBubyBET00gY2hhbmdlIG9uIHRoZSBzaXRlIGF0IHRoaXMgcGxhY2UsIHRoZSBIYW5kbGVyIHNob3VsZCBydW4gYXQgbGVhc3Qgb25jZS5cbiAgICAgICAgdGhpcy5tYWluQ21wSGFuZGxlcihudWxsKTtcbiAgICB9XG4gICAgZGlzY29ubmVjdCgpIHtcbiAgICAgICAgdGhpcy5fb2JzZXJ2ZXIuZGlzY29ubmVjdCgpO1xuICAgICAgICB0aGlzLl9zdGF0ZSA9IC0xO1xuICAgICAgICB0aGlzLl9jYWxsQ291bnRlciA9IDA7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIEhhbmRsZSB3aGljaCBpcyBjYWxsZWQsIHdoZW4gYSBtb2RpZmljYXRpb24gaXMgZGV0ZWN0ZWQuXG4gICAgICpcbiAgICAgKiBAcGFyYW0gbXV0YXRpb25zXG4gICAgICovXG4gICAgbWFpbkNtcEhhbmRsZXIobXV0YXRpb25zKSB7XG4gICAgICAgIFV0aWxzLmxvZyhcIkhhbmRsaW5nIFwiICsgdGhpcy5fY21wSW1wbGVtZW50YXRpb24ubmFtZSk7XG4gICAgICAgIHRoaXMuX2NhbGxDb3VudGVyKys7XG4gICAgICAgIC8vIGlmIGFmdGVyIHggY2hhbmdlcyB0byB0aGUgRE9NIHRoZXJlIGFzIG5vdCBwb3B1cCwgd2Ugc3RvcCBsaXN0ZW5pbmcgdG8gdGhlIGNoYW5nZXMuXG4gICAgICAgIGlmICh0aGlzLl9jYWxsQ291bnRlciA8IHRoaXMuX21heGltYWxMaW1pdE9mRG9tQ2hhbmdlVGlsbFN0b3ApIHtcbiAgICAgICAgICAgIHRoaXMuX2NtcEltcGxlbWVudGF0aW9uLmhhbmRsZUNtcCgpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5kaXNjb25uZWN0KCk7XG4gICAgICAgICAgICBVdGlscy5sb2coXCJMb29rcyBsaWtlLCBDTVAgd2FzIGFscmVhZHkgZ2l2ZW4gY29uc2VudC5cIik7XG4gICAgICAgIH1cbiAgICB9XG4gICAgLyoqXG4gICAgICogUmVzZXQgdGhlIHN0YXRlIG9mIHRoZSBDTVAgaWYgdGhlIENvbnNlbnQgd2FzIHN1Y2Nlc3NmdWxseSBnaXZlbi4gTWlnaHQgdHJpZ2dlciBhIGJhY2tlbmQgY2FsbC5cbiAgICAgKi9cbiAgICByZXNldCgpIHtcbiAgICAgICAgLy8gSWYgZXZlcnl0aGluZyBpcyBmaW5lLCByZW1vdmUgdGhlIGxpc3RlbmVyLlxuICAgICAgICB0aGlzLl9vYnNlcnZlci5kaXNjb25uZWN0KCk7XG4gICAgICAgIHRoaXMuX3N0YXRlID0gLTE7XG4gICAgICAgIHRoaXMuX2JhY2tlbmRDYWxsLnN1Y2Nlc3NmdWxCbG9jaygpO1xuICAgICAgICBVdGlscy5sb2coJ0NvbnNlbnQgZm9yICcgKyB0aGlzLl9jbXBJbXBsZW1lbnRhdGlvbi5uYW1lICsgJyBkZW5pZWQuJyk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIEZpbmQgYSBzaW5nbGUgTm9kZSB2aWEgYSBDU1MgU2VsZWN0b3JcbiAgICAgKiBAcGFyYW0gc2VsZWN0b3IgQ1NTIFNlbGVjdG9yIHRvIHNlYXJjaCBmb3JcbiAgICAgKiBAcmV0dXJucyB7RWxlbWVudCB8IGFueX1cbiAgICAgKi9cbiAgICBxdWVyeU5vZGVTZWxlY3RvcihzZWxlY3Rvcikge1xuICAgICAgICByZXR1cm4gdGhpcy5fbm9kZS5xdWVyeVNlbGVjdG9yKHNlbGVjdG9yKTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogRmluZHMgbXVsdGlwbGUgTm9kZXMgdmlhIGEgQ1NTIFNlbGVjdG9yLlxuICAgICAqIEBwYXJhbSBzZWxlY3RvciBDU1MgU2VsZWN0b3IgdG8gc2VhcmNoIGZvclxuICAgICAqIEByZXR1cm5zIHtOb2RlTGlzdE9mPEhUTUxFbGVtZW50VGFnTmFtZU1hcFsqXT4gfCBOb2RlTGlzdE9mPEVsZW1lbnQ+IHwgTm9kZUxpc3RPZjxTVkdFbGVtZW50VGFnTmFtZU1hcFsqXT59XG4gICAgICovXG4gICAgcXVlcnlOb2RlU2VsZWN0b3JBbGwoc2VsZWN0b3IpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX25vZGUucXVlcnlTZWxlY3RvckFsbChzZWxlY3Rvcik7XG4gICAgfVxufVxuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5pbXBvcnQgVXRpbHMgZnJvbSBcIi4uL1V0aWxzXCI7XG5pbXBvcnQgQ01QIGZyb20gXCIuL0NNUFwiO1xuaW1wb3J0IENtcFR5cGUgZnJvbSBcIi4vQ21wVHlwZVwiO1xuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQ2hhbmRhZ28ge1xuICAgIGNvbnN0cnVjdG9yKG5vZGUsIHNjcmlwdFVybCwgYmFja2VuZENhbGwpIHtcbiAgICAgICAgdGhpcy5fbmFtZSA9IFwiQ2hhbmRhZ29cIjtcbiAgICAgICAgYmFja2VuZENhbGwuY21wRGF0YSgyLCB0aGlzLl9uYW1lLCBzY3JpcHRVcmwsIENtcFR5cGUuV0FJVF9GT1JfQVNZTkNfQ0FMTEJBQ0ssIHRydWUpO1xuICAgICAgICB0aGlzLl9jbXAgPSBuZXcgQ01QKG5vZGUsIGJhY2tlbmRDYWxsLCB0aGlzKTtcbiAgICB9XG4gICAgZ2V0IG5hbWUoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9uYW1lO1xuICAgIH1cbiAgICBjb25uZWN0KCkge1xuICAgICAgICB0aGlzLl9jbXAuY29ubmVjdCgpO1xuICAgIH1cbiAgICBoYW5kbGVDbXAoKSB7XG4gICAgICAgIGNvbnN0IGNoYW5kYWdvQnV0dG9uRGVueUNzcyA9IFwiYnV0dG9uLmRlbnlcIjtcbiAgICAgICAgbGV0IGNoYW5kYWdvQnV0dG9uRGVueSA9IHRoaXMuX2NtcC5xdWVyeU5vZGVTZWxlY3RvcihjaGFuZGFnb0J1dHRvbkRlbnlDc3MpO1xuICAgICAgICBpZiAoVXRpbHMub2JqZWN0Q2xpY2thYmxlKGNoYW5kYWdvQnV0dG9uRGVueSkgJiYgdGhpcy5fY21wLnN0YXRlID09PSAwKSB7XG4gICAgICAgICAgICBVdGlscy5sb2coXCJDbGljayBEZW55IG5vd1wiKTtcbiAgICAgICAgICAgIC8vIGxvb2tzIGxpa2UgdGhpcyBkb2VzIG5vdCB3b3JrLlxuICAgICAgICAgICAgY2hhbmRhZ29CdXR0b25EZW55LmNsaWNrKCk7XG4gICAgICAgICAgICBVdGlscy5sb2coJ0NvbnNlbnQgb24gZGVuaWVkLicpO1xuICAgICAgICAgICAgdGhpcy5fY21wLnJlc2V0KCk7XG4gICAgICAgIH1cbiAgICB9XG59XG4iLCJcInVzZSBzdHJpY3RcIjtcbnZhciBDbXBUeXBlO1xuKGZ1bmN0aW9uIChDbXBUeXBlKSB7XG4gICAgQ21wVHlwZVtcIldBSVRfRk9SX0FTWU5DX0NBTExCQUNLXCJdID0gXCJXZSB3YWl0IHVudGlsIHRoZSBKYXZhU2NyaXB0IE9iamVjdCBvbiB0aGUgUGFnZSBmb3IgdGhlIENNUCB3YXMgZm91bmRcIjtcbiAgICBDbXBUeXBlW1wiV0FJVF9GT1JfVElNRV9GUkFNRVwiXSA9IFwiV2Ugd2FpdCB0aWxsIHRoZSBDYWxsYmFjayBzaG91bGQgZmlyZSAobWF4aW1hbCA1IHNlY29uZHM7IDI1IHggMjAwIG1zXCI7XG4gICAgQ21wVHlwZVtcIkRPX05PVF9XQUlUXCJdID0gXCJXZSBkb24ndCB3YWl0IGZvciBhIGNhbGxiYWNrLCBhcyB3ZSBrbm93IHRoZSBDTVAgaXMgbm90IFRDRiBjb21wbGlhbnRcIjtcbn0pKENtcFR5cGUgfHwgKENtcFR5cGUgPSB7fSkpO1xuZXhwb3J0IGRlZmF1bHQgQ21wVHlwZTtcbiIsIlwidXNlIHN0cmljdFwiO1xuaW1wb3J0IFV0aWxzIGZyb20gXCIuLi9VdGlsc1wiO1xuaW1wb3J0IENNUCBmcm9tIFwiLi9DTVBcIjtcbmltcG9ydCBDbXBUeXBlIGZyb20gXCIuL0NtcFR5cGVcIjtcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIENvbnNlbnRNYW5hZ2VyIHtcbiAgICBjb25zdHJ1Y3Rvcihub2RlLCBzY3JpcHRVcmwsIGJhY2tlbmRDYWxsKSB7XG4gICAgICAgIHRoaXMuX25hbWUgPSBcIkNvbnNlbnRNYW5hZ2VyLm5ldFwiO1xuICAgICAgICBiYWNrZW5kQ2FsbC5jbXBEYXRhKDMxLCB0aGlzLl9uYW1lLCBzY3JpcHRVcmwsIENtcFR5cGUuV0FJVF9GT1JfQVNZTkNfQ0FMTEJBQ0ssIHRydWUpO1xuICAgICAgICB0aGlzLl9jbXAgPSBuZXcgQ01QKG5vZGUsIGJhY2tlbmRDYWxsLCB0aGlzKTtcbiAgICB9XG4gICAgZ2V0IG5hbWUoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9uYW1lO1xuICAgIH1cbiAgICBjb25uZWN0KCkge1xuICAgICAgICB0aGlzLl9jbXAuY29ubmVjdCgpO1xuICAgIH1cbiAgICBoYW5kbGVDbXAoKSB7XG4gICAgICAgIGNvbnN0IGRlbnkgPSAnI2NtcGJudG5vdHh0JztcbiAgICAgICAgbGV0IGJ1dHRvbkRlbnkgPSB0aGlzLl9jbXAucXVlcnlOb2RlU2VsZWN0b3IoZGVueSk7XG4gICAgICAgIGlmIChVdGlscy5vYmplY3RDbGlja2FibGUoYnV0dG9uRGVueSkgJiYgdGhpcy5fY21wLnN0YXRlID09PSAwKSB7XG4gICAgICAgICAgICBidXR0b25EZW55LmNsaWNrKCk7XG4gICAgICAgICAgICB0aGlzLl9jbXAucmVzZXQoKTtcbiAgICAgICAgfVxuICAgICAgICAvLyBUT0RPOiBSZXF1aXJlcyBhIHNlY29uZCBTdGVwIGZvciB0aGUgdWdseSBndWlzLlxuICAgICAgICAvLyBDdXJyZW50bHkgdGhlcmUgaXMgYSA8YSBocmVmPScjJyB3aXRoIGFuIG9uIENsaWNrIEFjdGlvbiB3aGljaCBpcyBhIGJpdCBwYWluZnVsIHRvIGhhbmRsZVxuICAgIH1cbn1cbiIsIlwidXNlIHN0cmljdFwiO1xuaW1wb3J0IFV0aWxzIGZyb20gXCIuLi9VdGlsc1wiO1xuaW1wb3J0IENNUCBmcm9tIFwiLi9DTVBcIjtcbmltcG9ydCBDbXBUeXBlIGZyb20gXCIuL0NtcFR5cGVcIjtcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIENvb2tpZUJvdCB7XG4gICAgY29uc3RydWN0b3Iobm9kZSwgc2NyaXB0VXJsLCBiYWNrZW5kQ2FsbCkge1xuICAgICAgICB0aGlzLl9uYW1lID0gXCJDb29raWVCb3RcIjtcbiAgICAgICAgYmFja2VuZENhbGwuY21wRGF0YSgxMzQsIHRoaXMuX25hbWUsIHNjcmlwdFVybCwgQ21wVHlwZS5ET19OT1RfV0FJVCwgdHJ1ZSk7XG4gICAgICAgIHRoaXMuX2NtcCA9IG5ldyBDTVAobm9kZSwgYmFja2VuZENhbGwsIHRoaXMpO1xuICAgIH1cbiAgICBnZXQgbmFtZSgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX25hbWU7XG4gICAgfVxuICAgIGNvbm5lY3QoKSB7XG4gICAgICAgIHRoaXMuX2NtcC5jb25uZWN0KCk7XG4gICAgfVxuICAgIC8qICBodHRwczovL3d3dy5jb29raWVib3QuY29tL2RlL1xuICAgICAgICBodHRwczovL3d3dy5naXRsYWIuY29tL1xuICAgICAgICBodHRwczovL3d3dy5hcHBsYXVzZS5jb20vXG4gICAgICAgIGh0dHBzOi8vd3d3LmdhbGVyaWEuZGUvXG4gICAgICAgIGh0dHBzOi8vc2lnbnJlcXVlc3QuY29tLyMvID0+IENvb2tpZUJvdFxuICAgICAgICBodHRwczovL3ZvbGtzYmxhdHQuYXQvID0+IENvb2tpZSBCb3RcbiAgICAgICAgaHR0cHM6Ly93d3cuenVzYW1tZW5nZWdlbmNvcm9uYS5kZS9cbiAgICAgICAgaHR0cHM6Ly9kZS5zY2FsYWJsZS5jYXBpdGFsLyA9PiBub3Qgd29ya2luZyFcbiAgICAgICAgaHR0cHM6Ly93d3cubHYxODcxLmRlL2x2L1xuICAgICAgICBodHRwczovL3d3dy5hZHZvY2Fkby5kZS9cblxuICAgICAqL1xuICAgIGhhbmRsZUNtcCgpIHtcbiAgICAgICAgY29uc3QgY29va2llYm90Q2hlY2tib3hlc1NlbGVjdG9yID0gXCJpbnB1dFt0eXBlKj0nY2hlY2tib3gnXVwiO1xuICAgICAgICBsZXQgY29va2llYm90Q2hlY2tCb3hlcyA9IHRoaXMuX2NtcC5xdWVyeU5vZGVTZWxlY3RvckFsbChjb29raWVib3RDaGVja2JveGVzU2VsZWN0b3IpO1xuICAgICAgICBVdGlscy5sb2coXCJjb29raWVib3RDaGVja0JveGVzOiBcIiArIGNvb2tpZWJvdENoZWNrQm94ZXMubGVuZ3RoKTtcbiAgICAgICAgY29uc3QgYWxsb3dTZWxlY3RlZFNlbGVjdG9yMSA9IFwiYSNDeWJvdENvb2tpZWJvdERpYWxvZ0JvZHlMZXZlbEJ1dHRvbkxldmVsT3B0aW5BbGxvd2FsbFNlbGVjdGlvblwiO1xuICAgICAgICBsZXQgYWxsb3dBbGxCdXR0b24xID0gdGhpcy5fY21wLnF1ZXJ5Tm9kZVNlbGVjdG9yKGFsbG93U2VsZWN0ZWRTZWxlY3RvcjEpO1xuICAgICAgICBjb25zdCBhbGxvd1NlbGVjdGVkU2VsZWN0b3IyID0gXCJhI0N5Ym90Q29va2llYm90RGlhbG9nQm9keUxldmVsQnV0dG9uQWNjZXB0XCI7XG4gICAgICAgIGxldCBhbGxvd0FsbEJ1dHRvbjIgPSB0aGlzLl9jbXAucXVlcnlOb2RlU2VsZWN0b3IoYWxsb3dTZWxlY3RlZFNlbGVjdG9yMik7XG4gICAgICAgIGNvbnN0IGFsbG93U2VsZWN0ZWRTZWxlY3RvcjMgPSBcImEjQ3lib3RDb29raWVib3REaWFsb2dCb2R5QnV0dG9uQWNjZXB0XCI7XG4gICAgICAgIGNvbnN0IGFsbG93QWxsQnV0dG9uMyA9IHRoaXMuX2NtcC5xdWVyeU5vZGVTZWxlY3RvcihhbGxvd1NlbGVjdGVkU2VsZWN0b3IzKTtcbiAgICAgICAgY29uc3QgZGV0YWlsc1NlbGVjdG9yMSA9IFwiYSNDeWJvdENvb2tpZWJvdERpYWxvZ0JvZHlCdXR0b25EZXRhaWxzXCI7XG4gICAgICAgIGNvbnN0IGRldGFpbHNCdXR0b24xID0gdGhpcy5fY21wLnF1ZXJ5Tm9kZVNlbGVjdG9yKGRldGFpbHNTZWxlY3RvcjEpO1xuICAgICAgICBjb25zdCBkZXRhaWxzU2VsZWN0b3IyID0gXCJhI0N5Ym90Q29va2llYm90RGlhbG9nQm9keUxldmVsRGV0YWlsc0J1dHRvblwiO1xuICAgICAgICBjb25zdCBkZXRhaWxzQnV0dG9uMiA9IHRoaXMuX2NtcC5xdWVyeU5vZGVTZWxlY3RvcihkZXRhaWxzU2VsZWN0b3IyKTtcbiAgICAgICAgLy8gQ2FzZSAxOlxuICAgICAgICAvLyBpZiB0aGVyZSBpcyB0aGUgb3B0aW9uIHRvIGRlbnkgYWxyZWFkeSBvbiB0aGUgZmlyc3QgcGFnZSAtIGRvIHNvLlxuICAgICAgICAvLyBUZXN0IFBhZ2U6IGh0dHBzOi8vd3d3LnBvc3NpYmxlbm93LmNvbS8sIGh0dHBzOi8vZW1vaml0ZXJyYS5jb20vIChjbGljayBvbiBcIm9ubHkgcmVsZXZhbnQgY29va2llcylcbiAgICAgICAgaWYgKChVdGlscy5vYmplY3RDbGlja2FibGUoZGV0YWlsc0J1dHRvbjEpIHx8IFV0aWxzLm9iamVjdENsaWNrYWJsZShkZXRhaWxzQnV0dG9uMikpICYmIHRoaXMuX2NtcC5zdGF0ZSA9PT0gMCkge1xuICAgICAgICAgICAgVXRpbHMubG9nKFwiU3RlcCAxOiBTaG93IERldGFpbHNcIik7XG4gICAgICAgICAgICBpZiAoVXRpbHMub2JqZWN0Q2xpY2thYmxlKGRldGFpbHNCdXR0b24xKSkge1xuICAgICAgICAgICAgICAgIFV0aWxzLmxvZyhcIkRldGFpbHMgVHlwZSAxXCIpO1xuICAgICAgICAgICAgICAgIGRldGFpbHNCdXR0b24xLmNsaWNrKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoVXRpbHMub2JqZWN0Q2xpY2thYmxlKGRldGFpbHNCdXR0b24yKSkge1xuICAgICAgICAgICAgICAgIFV0aWxzLmxvZyhcIkRldGFpbHMgVHlwZSAyXCIpO1xuICAgICAgICAgICAgICAgIGRldGFpbHNCdXR0b24yLmNsaWNrKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0aGlzLl9jbXAuc3RhdGUgPSAxO1xuICAgICAgICB9IC8vIFRlc3QgUGFnZTogaHR0cHM6Ly93d3cuY29va2llYm90LmNvbS9kZS8sIGh0dHBzOi8vd3d3LmdpdGxhYi5jb20vLCBodHRwczovL3d3dy5hcHBsYXVzZS5jb20vIChjaGVjayBib3hlcyBvbiBCYW5uZXIpXG4gICAgICAgIGVsc2UgaWYgKGNvb2tpZWJvdENoZWNrQm94ZXMubGVuZ3RoID4gMCAmJiAoVXRpbHMub2JqZWN0Q2xpY2thYmxlKGFsbG93QWxsQnV0dG9uMSkgfHwgVXRpbHMub2JqZWN0Q2xpY2thYmxlKGFsbG93QWxsQnV0dG9uMikgfHwgVXRpbHMub2JqZWN0Q2xpY2thYmxlKGFsbG93QWxsQnV0dG9uMykpICYmIHRoaXMuX2NtcC5zdGF0ZSA9PT0gMSkge1xuICAgICAgICAgICAgVXRpbHMubG9nKFwiQ2FzZSAyOiBDb29raWVCb3QgQmFubmVyICsgQ2hlY2tib3hlcyBmb3VuZFwiKTtcbiAgICAgICAgICAgIGNvb2tpZWJvdENoZWNrQm94ZXMuZm9yRWFjaChmdW5jdGlvbiAoY2hlY2tib3gpIHtcbiAgICAgICAgICAgICAgICBjaGVja2JveC5zZXRBdHRyaWJ1dGUoXCJjaGVja2VkXCIsIFwiZmFsc2VcIik7XG4gICAgICAgICAgICAgICAgVXRpbHMubG9nKFwiQ2hlY2tib3ggdW5zZXRcIik7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIGlmIChVdGlscy5vYmplY3RDbGlja2FibGUoYWxsb3dBbGxCdXR0b24xKSkge1xuICAgICAgICAgICAgICAgIFV0aWxzLmxvZyhcIkFjY2VwdCBUeXBlIDFcIik7XG4gICAgICAgICAgICAgICAgYWxsb3dBbGxCdXR0b24xLmNsaWNrKCk7XG4gICAgICAgICAgICAgICAgc2V0VGltZW91dChhbGxvd0FsbEJ1dHRvbjEuY2xpY2soKSwgNTAwKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChVdGlscy5vYmplY3RDbGlja2FibGUoYWxsb3dBbGxCdXR0b24yKSkge1xuICAgICAgICAgICAgICAgIFV0aWxzLmxvZyhcIkFjY2VwdCBUeXBlIDJcIik7XG4gICAgICAgICAgICAgICAgYWxsb3dBbGxCdXR0b24yLmNsaWNrKCk7XG4gICAgICAgICAgICAgICAgc2V0VGltZW91dChhbGxvd0FsbEJ1dHRvbjIuY2xpY2soKSwgNTAwKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChVdGlscy5vYmplY3RDbGlja2FibGUoYWxsb3dBbGxCdXR0b24zKSkge1xuICAgICAgICAgICAgICAgIFV0aWxzLmxvZyhcIkFjY2VwdCBUeXBlIDNcIik7XG4gICAgICAgICAgICAgICAgYWxsb3dBbGxCdXR0b24zLmNsaWNrKCk7XG4gICAgICAgICAgICAgICAgc2V0VGltZW91dChhbGxvd0FsbEJ1dHRvbjMuY2xpY2soKSwgNTAwKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRoaXMuX2NtcC5yZXNldCgpO1xuICAgICAgICB9XG4gICAgICAgIC8vIHRoaXMgaXMgYSBzcGVjaWFsIENhc2UgZm9yIFYyLiBUaGUgQmFubmVyIHdhcyBmb3VuZCBhbmQgd2Ugb25seSBjbGljayBvbiB0aGUgRGVueSBCdXR0b24uXG4gICAgfVxufVxuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5pbXBvcnQgVXRpbHMgZnJvbSBcIi4uL1V0aWxzXCI7XG5pbXBvcnQgQ01QIGZyb20gXCIuL0NNUFwiO1xuaW1wb3J0IENtcFR5cGUgZnJvbSBcIi4vQ21wVHlwZVwiO1xuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQ3VzdG9tSW1wbCB7XG4gICAgY29uc3RydWN0b3Iobm9kZSwga2V5LCBiYWNrZW5kQ2FsbCkge1xuICAgICAgICB0aGlzLl9uYW1lID0gXCJDdXN0b20gSW1wbGVtZW50YXRpb25cIjtcbiAgICAgICAgYmFja2VuZENhbGwuY21wRGF0YSgwLCB0aGlzLl9uYW1lLCBcIm5hXCIsIENtcFR5cGUuRE9fTk9UX1dBSVQsIHRydWUpO1xuICAgICAgICB0aGlzLl9jbXAgPSBuZXcgQ01QKG5vZGUsIGJhY2tlbmRDYWxsLCB0aGlzKTtcbiAgICAgICAgdGhpcy5fYnV0dG9uID0ga2V5O1xuICAgIH1cbiAgICBnZXQgbmFtZSgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX25hbWU7XG4gICAgfVxuICAgIGNvbm5lY3QoKSB7XG4gICAgICAgIHRoaXMuX2NtcC5jb25uZWN0KCk7XG4gICAgfVxuICAgIGhhbmRsZUNtcCgpIHtcbiAgICAgICAgbGV0IGJ1dHRvbiA9IHRoaXMuX2NtcC5xdWVyeU5vZGVTZWxlY3Rvcih0aGlzLl9idXR0b24pO1xuICAgICAgICBpZiAoVXRpbHMub2JqZWN0Q2xpY2thYmxlKGJ1dHRvbikgJiYgdGhpcy5fY21wLnN0YXRlID09PSAwKSB7XG4gICAgICAgICAgICBVdGlscy5sb2coXCJCdXR0b24gRm91bmQsIGNsaWNraW5nXCIpO1xuICAgICAgICAgICAgYnV0dG9uLmNsaWNrKCk7XG4gICAgICAgICAgICB0aGlzLl9jbXAucmVzZXQoKTtcbiAgICAgICAgfVxuICAgIH1cbn1cbiIsIlwidXNlIHN0cmljdFwiO1xuaW1wb3J0IFV0aWxzIGZyb20gXCIuLi9VdGlsc1wiO1xuaW1wb3J0IENNUCBmcm9tIFwiLi9DTVBcIjtcbmltcG9ydCBDbXBUeXBlIGZyb20gXCIuL0NtcFR5cGVcIjtcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIERpRG9NaSB7XG4gICAgY29uc3RydWN0b3Iobm9kZSwgc2NyaXB0VXJsLCBiYWNrZW5kQ2FsbCkge1xuICAgICAgICB0aGlzLl9uYW1lID0gXCJEaWRvbWkubmV0XCI7XG4gICAgICAgIGJhY2tlbmRDYWxsLmNtcERhdGEoNywgdGhpcy5fbmFtZSwgc2NyaXB0VXJsLCBDbXBUeXBlLldBSVRfRk9SX0FTWU5DX0NBTExCQUNLLCB0cnVlKTtcbiAgICAgICAgdGhpcy5fY21wID0gbmV3IENNUChub2RlLCBiYWNrZW5kQ2FsbCwgdGhpcyk7XG4gICAgfVxuICAgIGdldCBuYW1lKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fbmFtZTtcbiAgICB9XG4gICAgY29ubmVjdCgpIHtcbiAgICAgICAgdGhpcy5fY21wLmNvbm5lY3QoKTtcbiAgICB9XG4gICAgLypcbiAgICBodHRwczovL3d3dy5tYXJpYW5uZS5uZXQvLCBodHRwczovL3d3dy5sYXZvaXhkdW5vcmQuZnIvLCBodHRwczovL3d3dy50b21zZ3VpZGUuZnIvLCBodHRwczovL3d3dy5nZW5lcmF0aW9uLW50LmNvbS9cbiAgICAgKi9cbiAgICBoYW5kbGVDbXAoKSB7XG4gICAgICAgIC8vIFN0ZXAgMVxuICAgICAgICBjb25zdCBwb3B1cCA9IFwiZGl2LmRpZG9taS1wb3B1cC1jb250YWluZXJcIjtcbiAgICAgICAgbGV0IHBvcHVwRGl2ID0gdGhpcy5fY21wLnF1ZXJ5Tm9kZVNlbGVjdG9yKHBvcHVwKTtcbiAgICAgICAgY29uc3QgZGV0YWlscyA9IFwiYnV0dG9uI2RpZG9taS1ub3RpY2UtbGVhcm4tbW9yZS1idXR0b25cIjtcbiAgICAgICAgbGV0IGRldGFpbHNCdXR0b24gPSB0aGlzLl9jbXAucXVlcnlOb2RlU2VsZWN0b3IoZGV0YWlscyk7XG4gICAgICAgIFV0aWxzLmxvZyhcImRldGFpbHNCdXR0b246IFwiICsgSlNPTi5zdHJpbmdpZnkoZGV0YWlsc0J1dHRvbikpO1xuICAgICAgICAvLyBTdGVwMSAyXG4gICAgICAgIGNvbnN0IHJlZnVzZXIgPSBcImJ1dHRvbi5kaWRvbWktY29tcG9uZW50cy1yYWRpb19fb3B0aW9uXCI7XG4gICAgICAgIGxldCByZWZ1c2VyQnV0dG9uID0gdGhpcy5fY21wLnF1ZXJ5Tm9kZVNlbGVjdG9yQWxsKHJlZnVzZXIpO1xuICAgICAgICBVdGlscy5sb2coXCJyZWZ1c2VyQnV0dG9uIGxlbmd0aDogXCIgKyByZWZ1c2VyQnV0dG9uLmxlbmd0aCk7XG4gICAgICAgIGNvbnN0IGVucmVnaXN0cmVyID0gXCJidXR0b24uZGlkb21pLWNvbXBvbmVudHMtYnV0dG9uXCI7XG4gICAgICAgIGxldCBlbnJlZ2lzdHJlckJ1dHRvbiA9IHRoaXMuX2NtcC5xdWVyeU5vZGVTZWxlY3RvckFsbChlbnJlZ2lzdHJlcik7XG4gICAgICAgIFV0aWxzLmxvZyhcImVucmVnaXN0cmVyIGxlbmd0aDogXCIgKyBlbnJlZ2lzdHJlci5sZW5ndGgpO1xuICAgICAgICBVdGlscy5sb2coXCJTdGF0ZTogXCIgKyB0aGlzLl9jbXAuc3RhdGUpO1xuICAgICAgICBpZiAoVXRpbHMub2JqZWN0Q2xpY2thYmxlKGRldGFpbHNCdXR0b24pICYmIFV0aWxzLm9iamVjdENsaWNrYWJsZShwb3B1cERpdikgJiYgdGhpcy5fY21wLnN0YXRlID09PSAwKSB7XG4gICAgICAgICAgICBVdGlscy5sb2coXCJDbGlja2luZyBvbiBEZXRhaWxzXCIpO1xuICAgICAgICAgICAgZGV0YWlsc0J1dHRvbi5jbGljaygpO1xuICAgICAgICAgICAgdGhpcy5fY21wLnN0YXRlID0gMTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmIChyZWZ1c2VyQnV0dG9uLmxlbmd0aCA+IDAgJiYgVXRpbHMub2JqZWN0Q2xpY2thYmxlKHBvcHVwRGl2KSAmJiB0aGlzLl9jbXAuc3RhdGUgPT09IDEpIHtcbiAgICAgICAgICAgIFV0aWxzLmxvZyhcIkxvb2tpbmcgZm9yIFNwYW4xXCIpO1xuICAgICAgICAgICAgbGV0IGNsaWNrZWQgPSBmYWxzZTtcbiAgICAgICAgICAgIHJlZnVzZXJCdXR0b24uZm9yRWFjaChmdW5jdGlvbiAoc3Bhbikge1xuICAgICAgICAgICAgICAgIFV0aWxzLmxvZyhzcGFuLmlubmVySFRNTCk7XG4gICAgICAgICAgICAgICAgaWYgKHNwYW4uaW5uZXJIVE1MLnRvTG93ZXJDYXNlKCkuaW5jbHVkZXMoXCJyZWZ1c2VyXCIpIHx8IHNwYW4uaW5uZXJIVE1MLnRvTG93ZXJDYXNlKCkuaW5jbHVkZXMoXCJkaXNhZ3JlZVwiKSkge1xuICAgICAgICAgICAgICAgICAgICBzcGFuLmNsaWNrKCk7XG4gICAgICAgICAgICAgICAgICAgIFV0aWxzLmxvZyhcIkNsaWNrZWQgb24gUmVmdXNlci9EaXNhZ3JlZVwiKTtcbiAgICAgICAgICAgICAgICAgICAgY2xpY2tlZCA9IHRydWU7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICBpZiAoY2xpY2tlZCkge1xuICAgICAgICAgICAgICAgIFV0aWxzLmxvZyhcIkNsaWNrZWQsIHVwZGF0ZSBzZXRcIik7XG4gICAgICAgICAgICAgICAgdGhpcy5fY21wLnN0YXRlID0gMjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmIChlbnJlZ2lzdHJlckJ1dHRvbi5sZW5ndGggPiAwICYmIFV0aWxzLm9iamVjdENsaWNrYWJsZShwb3B1cERpdikgJiYgdGhpcy5fY21wLnN0YXRlID09PSAyKSB7XG4gICAgICAgICAgICBVdGlscy5sb2coXCJMb29raW5nIGZvciBTYXZlL0VucmVnaXN0cmVcIik7XG4gICAgICAgICAgICBsZXQgY2xpY2tlZCA9IGZhbHNlO1xuICAgICAgICAgICAgZW5yZWdpc3RyZXJCdXR0b24uZm9yRWFjaChmdW5jdGlvbiAoc3Bhbikge1xuICAgICAgICAgICAgICAgIFV0aWxzLmxvZyhzcGFuLmlubmVySFRNTCk7XG4gICAgICAgICAgICAgICAgaWYgKHNwYW4uaW5uZXJIVE1MLnRvTG93ZXJDYXNlKCkuaW5jbHVkZXMoXCJlbnJlZ2lzdHJlclwiKSB8fCBzcGFuLmlubmVySFRNTC50b0xvd2VyQ2FzZSgpLmluY2x1ZGVzKFwic2F2ZVwiKSkge1xuICAgICAgICAgICAgICAgICAgICBzcGFuLmNsaWNrKCk7XG4gICAgICAgICAgICAgICAgICAgIFV0aWxzLmxvZyhcIkNsaWNrZWQgb24gRW5yZWdpc3RyZXIvU2F2ZVwiKTtcbiAgICAgICAgICAgICAgICAgICAgY2xpY2tlZCA9IHRydWU7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICBpZiAoY2xpY2tlZCkge1xuICAgICAgICAgICAgICAgIFV0aWxzLmxvZyhcIkNsaWNrZWQsIHJlc2V0IG5vd1wiKTtcbiAgICAgICAgICAgICAgICB0aGlzLl9jbXAucmVzZXQoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbn1cbiIsIlwidXNlIHN0cmljdFwiO1xudmFyIF9fYXdhaXRlciA9ICh0aGlzICYmIHRoaXMuX19hd2FpdGVyKSB8fCBmdW5jdGlvbiAodGhpc0FyZywgX2FyZ3VtZW50cywgUCwgZ2VuZXJhdG9yKSB7XG4gICAgZnVuY3Rpb24gYWRvcHQodmFsdWUpIHsgcmV0dXJuIHZhbHVlIGluc3RhbmNlb2YgUCA/IHZhbHVlIDogbmV3IFAoZnVuY3Rpb24gKHJlc29sdmUpIHsgcmVzb2x2ZSh2YWx1ZSk7IH0pOyB9XG4gICAgcmV0dXJuIG5ldyAoUCB8fCAoUCA9IFByb21pc2UpKShmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KSB7XG4gICAgICAgIGZ1bmN0aW9uIGZ1bGZpbGxlZCh2YWx1ZSkgeyB0cnkgeyBzdGVwKGdlbmVyYXRvci5uZXh0KHZhbHVlKSk7IH0gY2F0Y2ggKGUpIHsgcmVqZWN0KGUpOyB9IH1cbiAgICAgICAgZnVuY3Rpb24gcmVqZWN0ZWQodmFsdWUpIHsgdHJ5IHsgc3RlcChnZW5lcmF0b3JbXCJ0aHJvd1wiXSh2YWx1ZSkpOyB9IGNhdGNoIChlKSB7IHJlamVjdChlKTsgfSB9XG4gICAgICAgIGZ1bmN0aW9uIHN0ZXAocmVzdWx0KSB7IHJlc3VsdC5kb25lID8gcmVzb2x2ZShyZXN1bHQudmFsdWUpIDogYWRvcHQocmVzdWx0LnZhbHVlKS50aGVuKGZ1bGZpbGxlZCwgcmVqZWN0ZWQpOyB9XG4gICAgICAgIHN0ZXAoKGdlbmVyYXRvciA9IGdlbmVyYXRvci5hcHBseSh0aGlzQXJnLCBfYXJndW1lbnRzIHx8IFtdKSkubmV4dCgpKTtcbiAgICB9KTtcbn07XG5pbXBvcnQgVXRpbHMgZnJvbSBcIi4uL1V0aWxzXCI7XG5pbXBvcnQgQ01QIGZyb20gXCIuL0NNUFwiO1xuaW1wb3J0IENtcFR5cGUgZnJvbSBcIi4vQ21wVHlwZVwiO1xuZXhwb3J0IGRlZmF1bHQgY2xhc3MgRXZpZG9uIHtcbiAgICBjb25zdHJ1Y3Rvcihub2RlLCBzY3JpcHRVcmwsIGJhY2tlbmRDYWxsKSB7XG4gICAgICAgIHRoaXMuX25hbWUgPSBcIkV2aWRvbiwgSW5jLlwiO1xuICAgICAgICB0aGlzLl90cmlnZ2VyMSA9IGZhbHNlO1xuICAgICAgICBiYWNrZW5kQ2FsbC5jbXBEYXRhKDE4LCB0aGlzLl9uYW1lLCBzY3JpcHRVcmwsIENtcFR5cGUuRE9fTk9UX1dBSVQsIHRydWUpO1xuICAgICAgICB0aGlzLl9jbXAgPSBuZXcgQ01QKG5vZGUsIGJhY2tlbmRDYWxsLCB0aGlzKTtcbiAgICB9XG4gICAgZ2V0IG5hbWUoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9uYW1lO1xuICAgIH1cbiAgICBjb25uZWN0KCkge1xuICAgICAgICB0aGlzLl9jbXAuY29ubmVjdCgpO1xuICAgIH1cbiAgICBoYW5kbGVDbXAoKSB7XG4gICAgICAgIHJldHVybiBfX2F3YWl0ZXIodGhpcywgdm9pZCAwLCB2b2lkIDAsIGZ1bmN0aW9uKiAoKSB7XG4gICAgICAgICAgICBjb25zdCBldmlkb25PcHRpb25zID0gXCJidXR0b24jX2V2aWRvbi1vcHRpb24tYnV0dG9uXCI7XG4gICAgICAgICAgICBsZXQgZXZpZG9uT3B0aW9uc0J1dHRvbiA9IHRoaXMuX2NtcC5xdWVyeU5vZGVTZWxlY3Rvcihldmlkb25PcHRpb25zKTtcbiAgICAgICAgICAgIGNvbnN0IGV2aWRvbkRlY2xpbmUgPSBcImJ1dHRvbiNldmlkb24tcHJlZmRpYWctZGVjbGluZVwiO1xuICAgICAgICAgICAgbGV0IGV2aWRvbkRlbnlBbGxCdXR0b24gPSB0aGlzLl9jbXAucXVlcnlOb2RlU2VsZWN0b3IoZXZpZG9uRGVjbGluZSk7XG4gICAgICAgICAgICBjb25zdCBldmlkb25MMkRlY2xpbmUgPSBcImJ1dHRvbiNldmlkb24tbDItZGVjbGluZS1idXR0b25cIjtcbiAgICAgICAgICAgIGxldCBldmlkb25MMkRlY2xpbmVCdXR0b24gPSB0aGlzLl9jbXAucXVlcnlOb2RlU2VsZWN0b3IoZXZpZG9uTDJEZWNsaW5lKTtcbiAgICAgICAgICAgIGNvbnN0IGV2aWRvbkNvb2tpZUJhbm5lck5leHQgPSBcInNwYW4jX2V2aWRvbi1iYW5uZXItY29va2llYnV0dG9udGV4dFwiO1xuICAgICAgICAgICAgbGV0IGV2aWRvbkNvb2tpZUJhbm5lck5leHRTcGFuID0gdGhpcy5fY21wLnF1ZXJ5Tm9kZVNlbGVjdG9yKGV2aWRvbkNvb2tpZUJhbm5lck5leHQpO1xuICAgICAgICAgICAgLy8gd2UgZG8gcmVxdWlyZSAzIGF0dGVtcHRzIHRvIGRlY2xpbmUgdGhlIHRyYWNraW5nXG4gICAgICAgICAgICBpZiAoVXRpbHMub2JqZWN0Q2xpY2thYmxlKGV2aWRvbk9wdGlvbnNCdXR0b24pICYmICF0aGlzLl90cmlnZ2VyMSkge1xuICAgICAgICAgICAgICAgIHRoaXMuX3RyaWdnZXIxID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICB5aWVsZCB0aGlzLnNsZWVwKDEwMDApO1xuICAgICAgICAgICAgICAgIFV0aWxzLmxvZyhcIkJ1dHRvbiAxLCAzMDAgbXMgd2FpdGVkLiBUcmlnZ2VyIHJlbGVhc2VkXCIpO1xuICAgICAgICAgICAgICAgIHRoaXMuX3RyaWdnZXIxID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgZXZpZG9uT3B0aW9uc0J1dHRvbi5jbGljaygpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgLy8gd2UgZG8gcmVxdWlyZSAzIGF0dGVtcHRzIHRvIGRlY2xpbmUgdGhlIHRyYWNraW5nXG4gICAgICAgICAgICBpZiAoVXRpbHMub2JqZWN0Q2xpY2thYmxlKGV2aWRvbkNvb2tpZUJhbm5lck5leHRTcGFuKSAmJiAhdGhpcy5fdHJpZ2dlcjEpIHtcbiAgICAgICAgICAgICAgICB0aGlzLl90cmlnZ2VyMSA9IHRydWU7XG4gICAgICAgICAgICAgICAgeWllbGQgdGhpcy5zbGVlcCgxMDAwKTtcbiAgICAgICAgICAgICAgICBVdGlscy5sb2coXCJCdXR0b24gMiwgMzAwIG1zIHdhaXRlZC4gVHJpZ2dlciByZWxlYXNlZFwiKTtcbiAgICAgICAgICAgICAgICB0aGlzLl90cmlnZ2VyMSA9IGZhbHNlO1xuICAgICAgICAgICAgICAgIGV2aWRvbkNvb2tpZUJhbm5lck5leHRTcGFuLmNsaWNrKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoVXRpbHMub2JqZWN0Q2xpY2thYmxlKGV2aWRvbkwyRGVjbGluZUJ1dHRvbikgJiYgIXRoaXMuX3RyaWdnZXIxKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5fdHJpZ2dlcjEgPSB0cnVlO1xuICAgICAgICAgICAgICAgIHlpZWxkIHRoaXMuc2xlZXAoMTAwMCk7XG4gICAgICAgICAgICAgICAgVXRpbHMubG9nKFwiQnV0dG9uIDMsIDMwMCBtcyB3YWl0ZWQuIFRyaWdnZXIgcmVsZWFzZWRcIik7XG4gICAgICAgICAgICAgICAgdGhpcy5fdHJpZ2dlcjEgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICBldmlkb25MMkRlY2xpbmVCdXR0b24uY2xpY2soKTtcbiAgICAgICAgICAgICAgICAvLyBleGFtcGxlIGV2aWRvbiBwYWdlIGhlcmUgd2UgZG8gaGF2ZSBhIGRlZmluZWQgZW5kLlxuICAgICAgICAgICAgICAgIHRoaXMuX2NtcC5yZXNldCgpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgLy8gQ3Jvd25wZWFrID0+IFwib3B0aW9uc1wiIGJ5IGFjY2lkZW50IGlzIHRoZSBcImRlY2xpbmVcIiBidXR0b24sIHNvIG9wdGlvbnMgb3BlbiAuLi5cbiAgICAgICAgICAgIGlmIChVdGlscy5vYmplY3RDbGlja2FibGUoZXZpZG9uRGVueUFsbEJ1dHRvbikgJiYgIXRoaXMuX3RyaWdnZXIxKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5fdHJpZ2dlcjEgPSB0cnVlO1xuICAgICAgICAgICAgICAgIHlpZWxkIHRoaXMuc2xlZXAoMTAwMCk7XG4gICAgICAgICAgICAgICAgVXRpbHMubG9nKFwiQnV0dG9uIDQsIDMwMCBtcyB3YWl0ZWQuIFRyaWdnZXIgcmVsZWFzZWRcIik7XG4gICAgICAgICAgICAgICAgdGhpcy5fdHJpZ2dlcjEgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICBldmlkb25EZW55QWxsQnV0dG9uLmNsaWNrKCk7XG4gICAgICAgICAgICAgICAgLy8gZXhhbXBsZSBDcm93bnBlYWsgaGVyZSB3ZSBkbyBoYXZlIGEgZGVmaW5lZCBlbmQuXG4gICAgICAgICAgICAgICAgdGhpcy5fY21wLnJlc2V0KCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH1cbiAgICBzbGVlcChtaWxsaXNlY29uZHMpIHtcbiAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKHJlc29sdmUgPT4gc2V0VGltZW91dChyZXNvbHZlLCBtaWxsaXNlY29uZHMpKTtcbiAgICB9XG59XG4iLCJcInVzZSBzdHJpY3RcIjtcbmltcG9ydCBDTVAgZnJvbSBcIi4vQ01QXCI7XG5pbXBvcnQgQ21wVHlwZSBmcm9tIFwiLi9DbXBUeXBlXCI7XG5leHBvcnQgZGVmYXVsdCBjbGFzcyBOb3RZZXRJbXBsZW1lbnRlZENtcCB7XG4gICAgY29uc3RydWN0b3IoY21wSWQsIG5vZGUsIG5hbWUsIHNjcmlwdFVybCwgYmFja2VuZENhbGwpIHtcbiAgICAgICAgdGhpcy5fbmFtZSA9IG5hbWU7XG4gICAgICAgIGJhY2tlbmRDYWxsLmNtcERhdGEoY21wSWQsIHRoaXMuX25hbWUsIHNjcmlwdFVybCwgQ21wVHlwZS5XQUlUX0ZPUl9USU1FX0ZSQU1FLCBmYWxzZSk7XG4gICAgICAgIHRoaXMuX2NtcCA9IG5ldyBDTVAobm9kZSwgYmFja2VuZENhbGwsIHRoaXMpO1xuICAgIH1cbiAgICBnZXQgbmFtZSgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX25hbWU7XG4gICAgfVxuICAgIGNvbm5lY3QoKSB7XG4gICAgICAgIHRoaXMuX2NtcC5jb25uZWN0KCk7XG4gICAgfVxuICAgIGhhbmRsZUNtcCgpIHtcbiAgICAgICAgdGhpcy5fY21wLnJlc2V0KCk7XG4gICAgfVxufVxuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5pbXBvcnQgVXRpbHMgZnJvbSBcIi4uL1V0aWxzXCI7XG5pbXBvcnQgQ01QIGZyb20gXCIuL0NNUFwiO1xuaW1wb3J0IENtcFR5cGUgZnJvbSBcIi4vQ21wVHlwZVwiO1xuZXhwb3J0IGRlZmF1bHQgY2xhc3MgT2F0aENtcCB7XG4gICAgY29uc3RydWN0b3Iobm9kZSwgc2NyaXB0VXJsLCBiYWNrZW5kQ2FsbCkge1xuICAgICAgICB0aGlzLl9uYW1lID0gXCJPYXRoIExpbWl0ZWRcIjtcbiAgICAgICAgYmFja2VuZENhbGwuY21wRGF0YSgxNCwgdGhpcy5fbmFtZSwgc2NyaXB0VXJsLCBDbXBUeXBlLkRPX05PVF9XQUlULCB0cnVlKTtcbiAgICAgICAgdGhpcy5fY21wID0gbmV3IENNUChub2RlLCBiYWNrZW5kQ2FsbCwgdGhpcyk7XG4gICAgfVxuICAgIGdldCBuYW1lKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fbmFtZTtcbiAgICB9XG4gICAgY29ubmVjdCgpIHtcbiAgICAgICAgdGhpcy5fY21wLmNvbm5lY3QoKTtcbiAgICB9XG4gICAgaGFuZGxlQ21wKCkge1xuICAgICAgICBjb25zdCBtb3JlSW5mb3JtYXRpb24gPSAnI21haW5Nb3JlSW5mbyc7XG4gICAgICAgIGxldCBtb3JlSW5mb3JtYXRpb25CdXR0b24gPSB0aGlzLl9jbXAucXVlcnlOb2RlU2VsZWN0b3IobW9yZUluZm9ybWF0aW9uKTtcbiAgICAgICAgY29uc3QgcmVqZWN0QWxsID0gXCJidXR0b24uY21wLWJ0bi1yZWplY3RhbGxcIjtcbiAgICAgICAgbGV0IHJlamVjdEFsbEJ1dHRvbiA9IHRoaXMuX2NtcC5xdWVyeU5vZGVTZWxlY3RvcihyZWplY3RBbGwpO1xuICAgICAgICBjb25zdCBsZWF2ZSA9IFwiI2NvbmZpcm1MZWF2ZVwiO1xuICAgICAgICBsZXQgbGVhdmVCdXR0b24gPSB0aGlzLl9jbXAucXVlcnlOb2RlU2VsZWN0b3IobGVhdmUpO1xuICAgICAgICBpZiAoVXRpbHMub2JqZWN0Q2xpY2thYmxlKG1vcmVJbmZvcm1hdGlvbkJ1dHRvbikgJiYgdGhpcy5fY21wLnN0YXRlID09PSAwKSB7XG4gICAgICAgICAgICBVdGlscy5sb2coXCJCdXR0b24gMSBmb3VuZFwiKTtcbiAgICAgICAgICAgIG1vcmVJbmZvcm1hdGlvbkJ1dHRvbi5jbGljaygpO1xuICAgICAgICAgICAgdGhpcy5fY21wLnN0YXRlID0gMTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmIChVdGlscy5vYmplY3RDbGlja2FibGUocmVqZWN0QWxsQnV0dG9uKSAmJiB0aGlzLl9jbXAuc3RhdGUgPT09IDEpIHtcbiAgICAgICAgICAgIFV0aWxzLmxvZyhcIkJ1dHRvbiAyIGZvdW5kXCIpO1xuICAgICAgICAgICAgcmVqZWN0QWxsQnV0dG9uLmNsaWNrKCk7XG4gICAgICAgICAgICB0aGlzLl9jbXAuc3RhdGUgPSAyO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKFV0aWxzLm9iamVjdENsaWNrYWJsZShsZWF2ZUJ1dHRvbikgJiYgdGhpcy5fY21wLnN0YXRlID09PSAyKSB7XG4gICAgICAgICAgICBVdGlscy5sb2coXCJCdXR0b24gMyBmb3VuZFwiKTtcbiAgICAgICAgICAgIGxlYXZlQnV0dG9uLmNsaWNrKCk7XG4gICAgICAgICAgICB0aGlzLl9jbXAucmVzZXQoKTtcbiAgICAgICAgfVxuICAgIH1cbn1cbiIsIlwidXNlIHN0cmljdFwiO1xuaW1wb3J0IFV0aWxzIGZyb20gXCIuLi9VdGlsc1wiO1xuaW1wb3J0IENNUCBmcm9tIFwiLi9DTVBcIjtcbmltcG9ydCBDbXBUeXBlIGZyb20gXCIuL0NtcFR5cGVcIjtcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIE9uZVRydXN0IHtcbiAgICBjb25zdHJ1Y3Rvcihub2RlLCBzY3JpcHRVcmwsIGJhY2tlbmRDYWxsKSB7XG4gICAgICAgIHRoaXMuX25hbWUgPSBcIk9uZVRydXN0IExMQ1wiO1xuICAgICAgICBiYWNrZW5kQ2FsbC5jbXBEYXRhKDI4LCB0aGlzLl9uYW1lLCBzY3JpcHRVcmwsIENtcFR5cGUuV0FJVF9GT1JfVElNRV9GUkFNRSwgdHJ1ZSk7XG4gICAgICAgIHRoaXMuX2NtcCA9IG5ldyBDTVAobm9kZSwgYmFja2VuZENhbGwsIHRoaXMpO1xuICAgIH1cbiAgICBnZXQgbmFtZSgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX25hbWU7XG4gICAgfVxuICAgIGNvbm5lY3QoKSB7XG4gICAgICAgIHRoaXMuX2NtcC5jb25uZWN0KCk7XG4gICAgfVxuICAgIGhhbmRsZUNtcCgpIHtcbiAgICAgICAgY29uc3Qgb3B0YW5vbkRldGFpbHNTZWxlY3RvclYxID0gXCJidXR0b24jb25ldHJ1c3QtcGMtYnRuLWhhbmRsZXJcIjtcbiAgICAgICAgbGV0IG9wdGFuYW5EZXRhaWxzVjEgPSB0aGlzLl9jbXAucXVlcnlOb2RlU2VsZWN0b3Iob3B0YW5vbkRldGFpbHNTZWxlY3RvclYxKTtcbiAgICAgICAgY29uc3Qgb3B0YW5vblNhdmVTZXR0aW5nc1NlbGVjdG9yVjEgPSBcImJ1dHRvbi5zYXZlLXByZWZlcmVuY2UtYnRuLWhhbmRsZXJcIjtcbiAgICAgICAgbGV0IG9wdGFub25TYXZlU2V0dGluZ3NWMSA9IHRoaXMuX2NtcC5xdWVyeU5vZGVTZWxlY3RvcihvcHRhbm9uU2F2ZVNldHRpbmdzU2VsZWN0b3JWMSk7XG4gICAgICAgIGNvbnN0IG9wdGFub25DaGVja0JveGVzU2VsZWN0b3JWMSA9IFwiaW5wdXRbdHlwZSo9J2NoZWNrYm94J10uc3dpdGNoLWNoZWNrYm94XCI7XG4gICAgICAgIGxldCBvcHRhbm9uQ2hlY2tib3hlc1YxID0gdGhpcy5fY21wLnF1ZXJ5Tm9kZVNlbGVjdG9yQWxsKG9wdGFub25DaGVja0JveGVzU2VsZWN0b3JWMSk7XG4gICAgICAgIGNvbnN0IG9wdGFub25EZXRhaWxzVjIgPSBcImJ1dHRvbi5vcHRhbm9uLXRvZ2dsZS1kaXNwbGF5XCI7XG4gICAgICAgIGxldCBvcHRhbm9uRGV0YWlsc0J1dHRvblYyID0gdGhpcy5fY21wLnF1ZXJ5Tm9kZVNlbGVjdG9yKG9wdGFub25EZXRhaWxzVjIpO1xuICAgICAgICAvLyB0aGlzIGJ1dHRvbiBpcyBjcmFwcHkgdG8gZmluZCwgYXMgdGhlcmUgaXMgbm8gSUQgb3IgY2xhc3MuXG4gICAgICAgIGNvbnN0IG9wdGFub25TYXZlU2V0dGluZ3NTZWxlY3RvclYyID0gXCJidXR0b25bb25jbGljayo9J1NhdmUnXVwiOyAvL2J1dHRvbi5vcHRhbm9uLXNhdmUtc2V0dGluZ3MtYnV0dG9uXG4gICAgICAgIGxldCBvcHRhbm9uU2F2ZVNldHRpbmdzVjIgPSB0aGlzLl9jbXAucXVlcnlOb2RlU2VsZWN0b3Iob3B0YW5vblNhdmVTZXR0aW5nc1NlbGVjdG9yVjIpO1xuICAgICAgICBjb25zdCBvcHRhbm9uTGlzdEl0ZW1zU2VsZWN0b3JWMiA9IFwibGkubWVudS1pdGVtLW9uXCI7XG4gICAgICAgIGxldCBvcHRhbm9uTGlzdEl0ZW1zVjIgPSB0aGlzLl9jbXAucXVlcnlOb2RlU2VsZWN0b3JBbGwob3B0YW5vbkxpc3RJdGVtc1NlbGVjdG9yVjIpO1xuICAgICAgICBjb25zdCBvcHRhbm9uQ2hlY2tib3hlc1NlbGVjdG9yVjIgPSBcImlucHV0W3R5cGUqPSdjaGVja2JveCddXCI7XG4gICAgICAgIGxldCBvcHRhbm9uQ2hlY2tCb3hlc1YyID0gdGhpcy5fY21wLnF1ZXJ5Tm9kZVNlbGVjdG9yQWxsKG9wdGFub25DaGVja2JveGVzU2VsZWN0b3JWMik7XG4gICAgICAgIC8vIHRoaXMgYnV0dG9uIGlzIGNyYXBweSB0byBmaW5kLCBhcyB0aGVyZSBpcyBubyBJRCBvciBjbGFzcy5cbiAgICAgICAgY29uc3Qgb3B0YW5vblNhdmVTZXR0aW5nc1NlbGVjdG9yVjMgPSBcImJ1dHRvbi5zYXZlLXByZWZlcmVuY2UtYnRuLWhhbmRsZXJcIjsgLy9idXR0b24ub3B0YW5vbi1zYXZlLXNldHRpbmdzLWJ1dHRvblxuICAgICAgICBsZXQgb3B0YW5vblNhdmVTZXR0aW5nc1YzID0gdGhpcy5fY21wLnF1ZXJ5Tm9kZVNlbGVjdG9yKG9wdGFub25TYXZlU2V0dGluZ3NTZWxlY3RvclYzKTtcbiAgICAgICAgY29uc3Qgb3B0YW5vbkxpc3RJdGVtc1NlbGVjdG9yVjMgPSBcImRpdi5jYXRlZ29yeS1tZW51LXN3aXRjaC1oYW5kbGVyXCI7XG4gICAgICAgIGxldCBvcHRhbm9uTGlzdEl0ZW1zVjMgPSB0aGlzLl9jbXAucXVlcnlOb2RlU2VsZWN0b3JBbGwob3B0YW5vbkxpc3RJdGVtc1NlbGVjdG9yVjMpO1xuICAgICAgICBjb25zdCBvcHRhbm9uT25ldHJ1c3RSZWplY3RBbGxhbmRsZXIgPSBcImJ1dHRvbiNvbmV0cnVzdC1yZWplY3QtYWxsLWhhbmRsZXJcIjtcbiAgICAgICAgbGV0IG9wdGFub25PbmV0cnVzdFJlamVjdEFsbGFuZGxlckJ1dHRvbiA9IHRoaXMuX2NtcC5xdWVyeU5vZGVTZWxlY3RvcihvcHRhbm9uT25ldHJ1c3RSZWplY3RBbGxhbmRsZXIpO1xuICAgICAgICBjb25zdCBvcHRhbm9uQmFubmVyUG9saWN5ID0gXCJhLmJhbm5lci1wb2xpY3ktbGlua1wiO1xuICAgICAgICBsZXQgb3B0YW5vbkJhbm5lclBvbGljeUxpbmsgPSB0aGlzLl9jbXAucXVlcnlOb2RlU2VsZWN0b3JBbGwob3B0YW5vbkJhbm5lclBvbGljeSk7XG4gICAgICAgIC8vIFZhcmlhbnRlIDMgKFNpbmdsZS1QcmVzcyBpcyBwcmVmZXJlZCBvdmVyIG90aGVyc1xuICAgICAgICBpZiAoVXRpbHMub2JqZWN0Q2xpY2thYmxlKG9wdGFub25PbmV0cnVzdFJlamVjdEFsbGFuZGxlckJ1dHRvbikgJiYgdGhpcy5fY21wLnN0YXRlID09PSAwKSB7XG4gICAgICAgICAgICBVdGlscy5sb2coXCJWMyAoZmlyc3QgY2xpY2spXCIpO1xuICAgICAgICAgICAgb3B0YW5vbk9uZXRydXN0UmVqZWN0QWxsYW5kbGVyQnV0dG9uLmNsaWNrKCk7XG4gICAgICAgICAgICBVdGlscy5sb2coXCJSZWplY3QgYWxsIGNsaWNrZWRcIik7XG4gICAgICAgICAgICB0aGlzLl9jbXAuc3RhdGUgPSAxO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKFV0aWxzLm9iamVjdENsaWNrYWJsZShvcHRhbm9uT25ldHJ1c3RSZWplY3RBbGxhbmRsZXJCdXR0b24pICYmIHRoaXMuX2NtcC5zdGF0ZSA9PT0gMSkge1xuICAgICAgICAgICAgVXRpbHMubG9nKFwiVjMgKHNlY29uZCBjbGljaylcIik7XG4gICAgICAgICAgICBvcHRhbm9uT25ldHJ1c3RSZWplY3RBbGxhbmRsZXJCdXR0b24uY2xpY2soKTtcbiAgICAgICAgICAgIFV0aWxzLmxvZyhcIlJlamVjdCBhbGwgY2xpY2tlZFwiKTtcbiAgICAgICAgICAgIHRoaXMuX2NtcC5yZXNldCgpO1xuICAgICAgICB9XG4gICAgICAgIC8vIFZhcmlhbnQgMVxuICAgICAgICAvLyBodHRwczovL3d3dy53aWVuZXJ6ZWl0dW5nLmF0L1xuICAgICAgICBlbHNlIGlmIChVdGlscy5vYmplY3RDbGlja2FibGUob3B0YW5hbkRldGFpbHNWMSkgJiYgdGhpcy5fY21wLnN0YXRlID09PSAwKSB7XG4gICAgICAgICAgICBVdGlscy5sb2coXCJWMVwiKTtcbiAgICAgICAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIG9wdGFuYW5EZXRhaWxzVjEuY2xpY2soKTtcbiAgICAgICAgICAgIH0sIDEwMDApO1xuICAgICAgICAgICAgVXRpbHMubG9nKFwiRGV0YWlscyBjbGlja2VkIFYxXCIpO1xuICAgICAgICAgICAgdGhpcy5fY21wLnN0YXRlID0gMTtcbiAgICAgICAgfVxuICAgICAgICAvLyBodHRwczovL3d3dy5vcmFsYi5kZS9kZS1kZVxuICAgICAgICBlbHNlIGlmIChvcHRhbm9uQmFubmVyUG9saWN5Lmxlbmd0aCA+IDEgJiYgVXRpbHMub2JqZWN0Q2xpY2thYmxlKG9wdGFub25CYW5uZXJQb2xpY3lMaW5rWzFdKSAmJiB0aGlzLl9jbXAuc3RhdGUgPT09IDApIHtcbiAgICAgICAgICAgIFV0aWxzLmxvZyhcIlYxLjFcIik7XG4gICAgICAgICAgICBvcHRhbm9uQmFubmVyUG9saWN5TGlua1sxXS5jbGljaygpO1xuICAgICAgICAgICAgVXRpbHMubG9nKFwiRGV0YWlscyBjbGlja2VkIFYxLjFcIik7XG4gICAgICAgICAgICB0aGlzLl9jbXAuc3RhdGUgPSAxO1xuICAgICAgICB9XG4gICAgICAgIC8vIGh0dHBzOi8vYXJzdGVjaG5pY2EuY29tLywgICBodHRwczovL3d3dy5nbGFzc2Rvb3IuZGUvLCBodHRwczovL2FzbXAuYTEubmV0LywgaHR0cHM6Ly93d3cuemRuZXQuY29tL1xuICAgICAgICBlbHNlIGlmIChVdGlscy5vYmplY3RDbGlja2FibGUob3B0YW5vblNhdmVTZXR0aW5nc1YxKSAmJiBvcHRhbm9uQ2hlY2tib3hlc1YxLmxlbmd0aCAmJiB0aGlzLl9jbXAuc3RhdGUgPT09IDEpIHtcbiAgICAgICAgICAgIFV0aWxzLmxvZyhcIkFtb3VudCBvZiBDaGVja2JveGVzIFYxOiBcIiArIG9wdGFub25DaGVja2JveGVzVjEubGVuZ3RoKTtcbiAgICAgICAgICAgIG9wdGFub25DaGVja2JveGVzVjEuZm9yRWFjaChmdW5jdGlvbiAoY2hlY2tib3gpIHtcbiAgICAgICAgICAgICAgICBjaGVja2JveC5zZXRBdHRyaWJ1dGUoXCJjaGVja2VkXCIsIFwiZmFsc2VcIik7XG4gICAgICAgICAgICAgICAgVXRpbHMubG9nKFwiQ2hlY2tib3ggdW5zZXQgVjFcIik7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIG9wdGFub25TYXZlU2V0dGluZ3NWMS5jbGljaygpO1xuICAgICAgICAgICAgfSwgMTAwMCk7XG4gICAgICAgICAgICBVdGlscy5sb2coXCJTYXZlIFNldHRpbmdzIENsaWNrZWQgY2xpY2sgVjFcIik7XG4gICAgICAgICAgICAvLyB0aGlzLl9jbXAuc3RhdGUgPSAyO1xuICAgICAgICAgICAgdGhpcy5fY21wLnJlc2V0KCk7XG4gICAgICAgIH1cbiAgICAgICAgLy8gaHR0cHM6Ly9kZS5jb3Vyc2VyYS5vcmcvLCAgaHR0cHM6Ly93d3cuaG9tZTI0LmRlLywgaHR0cHM6Ly93d3cudGhvdWdodHdvcmtzLmNvbS8sIGh0dHBzOi8vam9icy5uZXRmbGl4LmNvbS9cbiAgICAgICAgZWxzZSBpZiAoVXRpbHMub2JqZWN0Q2xpY2thYmxlKG9wdGFub25TYXZlU2V0dGluZ3NWMykgJiYgdGhpcy5fY21wLnN0YXRlID09PSAxKSB7XG4gICAgICAgICAgICBVdGlscy5sb2coXCJTYXZlIEJ1dHRvbiBWMyBmb3VuZFwiKTtcbiAgICAgICAgICAgIG9wdGFub25MaXN0SXRlbXNWMy5mb3JFYWNoKGZ1bmN0aW9uIChsaXN0SXRlbSkge1xuICAgICAgICAgICAgICAgIGxpc3RJdGVtLmNsaWNrKCk7XG4gICAgICAgICAgICAgICAgVXRpbHMubG9nKFwiQ2hlY2tib3ggdW5zZXQgVjNcIik7XG4gICAgICAgICAgICAgICAgb3B0YW5vbkNoZWNrQm94ZXNWMi5mb3JFYWNoKGZ1bmN0aW9uIChjaGVja2JveCkge1xuICAgICAgICAgICAgICAgICAgICBjaGVja2JveC5zZXRBdHRyaWJ1dGUoXCJjaGVja2VkXCIsIFwiZmFsc2VcIik7XG4gICAgICAgICAgICAgICAgICAgIFV0aWxzLmxvZyhcIkNoZWNrYm94IHVuc2V0IFYzXCIpO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICBvcHRhbm9uU2F2ZVNldHRpbmdzVjMuY2xpY2soKTtcbiAgICAgICAgICAgIHRoaXMuX2NtcC5yZXNldCgpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKFV0aWxzLm9iamVjdENsaWNrYWJsZShvcHRhbm9uT25ldHJ1c3RSZWplY3RBbGxhbmRsZXJCdXR0b24pICYmIHRoaXMuX2NtcC5zdGF0ZSA9PT0gMikge1xuICAgICAgICAgICAgVXRpbHMubG9nKFwiVjEgKHNlY29uZCBjbGljaylcIik7XG4gICAgICAgICAgICBvcHRhbm9uT25ldHJ1c3RSZWplY3RBbGxhbmRsZXJCdXR0b24uY2xpY2soKTtcbiAgICAgICAgICAgIFV0aWxzLmxvZyhcIlJlamVjdCBhbGwgY2xpY2tlZFwiKTtcbiAgICAgICAgICAgIHRoaXMuX2NtcC5yZXNldCgpO1xuICAgICAgICB9XG4gICAgICAgIC8vIFZhcmlhbnQgMlxuICAgICAgICAvLyBodHRwczovL3d3dy5tb25hLm5sLywgaHR0cHM6Ly93d3cuYWxsaWFuei5kZS8sIGh0dHBzOi8vd3d3LnNwcmluZ2VyLmNvbS9ncCwgaHR0cHM6Ly93d3cuaGFnbG9mcy5jb20vZGUvZGUtZGUvLCBodHRwczovL3d3dy50aGVzYXVydXMuY29tLywgaHR0cHM6Ly93d3cuYXRsYXNzaWFuLmNvbS9kZS9hZ2lsZS9hZ2lsZS1hdC1zY2FsZS9va3JcbiAgICAgICAgZWxzZSBpZiAoVXRpbHMub2JqZWN0Q2xpY2thYmxlKG9wdGFub25EZXRhaWxzQnV0dG9uVjIpICYmIHRoaXMuX2NtcC5zdGF0ZSA9PT0gMCkge1xuICAgICAgICAgICAgVXRpbHMubG9nKFwiVjJcIik7XG4gICAgICAgICAgICBvcHRhbm9uRGV0YWlsc0J1dHRvblYyLmNsaWNrKCk7XG4gICAgICAgICAgICBVdGlscy5sb2coXCJEZXRhaWxzIGNsaWNrZWRcIik7XG4gICAgICAgICAgICB0aGlzLl9jbXAuc3RhdGUgPSAzO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKFV0aWxzLm9iamVjdENsaWNrYWJsZShvcHRhbm9uU2F2ZVNldHRpbmdzVjIpICYmIHRoaXMuX2NtcC5zdGF0ZSA9PT0gMykge1xuICAgICAgICAgICAgVXRpbHMubG9nKFwiU2F2ZSBCdXR0b24gVjIgZm91bmRcIik7XG4gICAgICAgICAgICBvcHRhbm9uTGlzdEl0ZW1zVjIuZm9yRWFjaChmdW5jdGlvbiAobGlzdEl0ZW0pIHtcbiAgICAgICAgICAgICAgICBsaXN0SXRlbS5jbGljaygpO1xuICAgICAgICAgICAgICAgIFV0aWxzLmxvZyhcIkNoZWNrYm94IHVuc2V0IFYyXCIpO1xuICAgICAgICAgICAgICAgIG9wdGFub25DaGVja0JveGVzVjIuZm9yRWFjaChmdW5jdGlvbiAoY2hlY2tib3gpIHtcbiAgICAgICAgICAgICAgICAgICAgY2hlY2tib3guc2V0QXR0cmlidXRlKFwiY2hlY2tlZFwiLCBcImZhbHNlXCIpO1xuICAgICAgICAgICAgICAgICAgICBVdGlscy5sb2coXCJDaGVja2JveCB1bnNldCBWMlwiKTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgb3B0YW5vblNhdmVTZXR0aW5nc1YyLmNsaWNrKCk7XG4gICAgICAgICAgICB0aGlzLl9jbXAucmVzZXQoKTtcbiAgICAgICAgfVxuICAgIH1cbn1cbiIsIlwidXNlIHN0cmljdFwiO1xuaW1wb3J0IFV0aWxzIGZyb20gXCIuLi9VdGlsc1wiO1xuaW1wb3J0IENNUCBmcm9tIFwiLi9DTVBcIjtcbmltcG9ydCBDbXBUeXBlIGZyb20gXCIuL0NtcFR5cGVcIjtcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFF1YW50Q2FzdCB7XG4gICAgY29uc3RydWN0b3Iobm9kZSwgc2NyaXB0VXJsLCBiYWNrZW5kQ2FsbCkge1xuICAgICAgICB0aGlzLl9uYW1lID0gXCJRdWFudGNhc3QgSW50ZXJuYXRpb25hbCBMaW1pdGVkXCI7XG4gICAgICAgIGJhY2tlbmRDYWxsLmNtcERhdGEoMTAsIHRoaXMuX25hbWUsIHNjcmlwdFVybCwgQ21wVHlwZS5XQUlUX0ZPUl9BU1lOQ19DQUxMQkFDSywgdHJ1ZSk7XG4gICAgICAgIHRoaXMuX2NtcCA9IG5ldyBDTVAobm9kZSwgYmFja2VuZENhbGwsIHRoaXMpO1xuICAgIH1cbiAgICBnZXQgbmFtZSgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX25hbWU7XG4gICAgfVxuICAgIGNvbm5lY3QoKSB7XG4gICAgICAgIHRoaXMuX2NtcC5jb25uZWN0KCk7XG4gICAgfVxuICAgIC8qXG4gICAgICAgIGh0dHBzOi8vd3dkLmNvbS9cbiAgICAgKi9cbiAgICBoYW5kbGVDbXAoKSB7XG4gICAgICAgIGNvbnN0IHB1cnBvc2UgPSBcImEjcWMtY21wLXB1cnBvc2UtYnV0dG9uXCI7XG4gICAgICAgIGxldCBwdXJwb3NlQnV0dG9uID0gdGhpcy5fY21wLnF1ZXJ5Tm9kZVNlbGVjdG9yKHB1cnBvc2UpO1xuICAgICAgICBjb25zdCBkZW55QWxsID0gXCJidXR0b24ucWMtY21wLWVuYWJsZS1idXR0b25cIjtcbiAgICAgICAgbGV0IGRlbnlBbGxCdXR0b24gPSB0aGlzLl9jbXAucXVlcnlOb2RlU2VsZWN0b3IoZGVueUFsbCk7XG4gICAgICAgIGNvbnN0IHNhdmUgPSBcImJ1dHRvbi5xYy1jbXAtc2F2ZS1hbmQtZXhpdFwiO1xuICAgICAgICBsZXQgc2F2ZUJ1dHRvbiA9IHRoaXMuX2NtcC5xdWVyeU5vZGVTZWxlY3RvcihzYXZlKTtcbiAgICAgICAgY29uc3QgcmVqZWN0QWxsID0gXCJidXR0b24ucWMtY21wLXNlY29uZGFyeS1idXR0b25cIjtcbiAgICAgICAgbGV0IHJlamVjdEFsbEJ1dHRvbiA9IHRoaXMuX2NtcC5xdWVyeU5vZGVTZWxlY3RvcihyZWplY3RBbGwpO1xuICAgICAgICAvLyBwcmVzcyBvbiBcIk9wdGlvbnNcIlxuICAgICAgICBpZiAoVXRpbHMub2JqZWN0Q2xpY2thYmxlKHB1cnBvc2VCdXR0b24pICYmIHRoaXMuX2NtcC5zdGF0ZSA9PT0gMCkge1xuICAgICAgICAgICAgdGhpcy5fY21wLnN0YXRlID0gMTtcbiAgICAgICAgICAgIHB1cnBvc2VCdXR0b24uY2xpY2soKTtcbiAgICAgICAgfVxuICAgICAgICAvLyBkaXNhYmxlIGFsbFxuICAgICAgICBlbHNlIGlmIChVdGlscy5vYmplY3RDbGlja2FibGUoZGVueUFsbEJ1dHRvbikgJiYgdGhpcy5fY21wLnN0YXRlID09PSAxKSB7XG4gICAgICAgICAgICB0aGlzLl9jbXAuc3RhdGUgPSAyO1xuICAgICAgICAgICAgZGVueUFsbEJ1dHRvbi5jbGljaygpO1xuICAgICAgICB9XG4gICAgICAgIC8vIHNhdmUgc2V0dGluZ3NcbiAgICAgICAgZWxzZSBpZiAoVXRpbHMub2JqZWN0Q2xpY2thYmxlKHNhdmVCdXR0b24pICYmIHRoaXMuX2NtcC5zdGF0ZSA9PT0gMikge1xuICAgICAgICAgICAgc2F2ZUJ1dHRvbi5jbGljaygpO1xuICAgICAgICAgICAgdGhpcy5fY21wLnJlc2V0KCk7XG4gICAgICAgIH1cbiAgICAgICAgLy8gc2VwYXJhdGVkIEJyYW5jaCwgaWYgdGhlcmUgaXMgXCJSZWplY3QtQWxsIEJ1dHRvblwiXG4gICAgICAgIGVsc2UgaWYgKFV0aWxzLm9iamVjdENsaWNrYWJsZShyZWplY3RBbGxCdXR0b24pICYmIHRoaXMuX2NtcC5zdGF0ZSA9PT0gMCkge1xuICAgICAgICAgICAgcmVqZWN0QWxsQnV0dG9uLmNsaWNrKCk7XG4gICAgICAgICAgICB0aGlzLl9jbXAucmVzZXQoKTtcbiAgICAgICAgfVxuICAgIH1cbn1cbiIsIlwidXNlIHN0cmljdFwiO1xuaW1wb3J0IFV0aWxzIGZyb20gXCIuLi9VdGlsc1wiO1xuaW1wb3J0IENNUCBmcm9tIFwiLi9DTVBcIjtcbmltcG9ydCBDbXBUeXBlIGZyb20gXCIuL0NtcFR5cGVcIjtcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFNvdXJjZVBvaW50IHtcbiAgICBjb25zdHJ1Y3Rvcihub2RlLCBzY3JpcHRVcmwsIGJhY2tlbmRDYWxsKSB7XG4gICAgICAgIHRoaXMuX25hbWUgPSBcIlNvdXJjZXBvaW50IFRlY2hub2xvZ2llcywgSW5jLlwiO1xuICAgICAgICB0aGlzLl9maXJzdFN0ZXBDb21wbGV0ZWQgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5fc2Vjb25kU3RlcENvbXBsZXRlZCA9IGZhbHNlO1xuICAgICAgICBiYWNrZW5kQ2FsbC5jbXBEYXRhKDYsIHRoaXMuX25hbWUsIHNjcmlwdFVybCwgQ21wVHlwZS5ET19OT1RfV0FJVCwgdHJ1ZSk7XG4gICAgICAgIHRoaXMuX2NtcCA9IG5ldyBDTVAobm9kZSwgYmFja2VuZENhbGwsIHRoaXMpO1xuICAgIH1cbiAgICBnZXQgbmFtZSgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX25hbWU7XG4gICAgfVxuICAgIGNvbm5lY3QoKSB7XG4gICAgICAgIHRoaXMuX2NtcC5jb25uZWN0KCk7XG4gICAgfVxuICAgIC8vIFNhbXBsZTogaHR0cHM6Ly93d3cuc3Rvcm5vd2F5Z2F6ZXR0ZS5jby51ay8sIGh0dHBzOi8vd3d3LnRoZXRpbWVzLmNvLnVrLywgaHR0cHM6Ly93d3cuZHVkZW4uZGUvXG4gICAgLy8gaHR0cHM6Ly9ub3RpY2Uuc3AtcHJvZC5uZXQvP21lc3NhZ2VfaWQ9MTE2NDY1JmFtcDttbXNfb3JpZ2luPWh0dHBzOi8vY21wLnN0b3Jub3dheWdhemV0dGUuY28udWsvbW1zL3YyJTIyJTIwaWQ9JTIyc3BfbWVzc2FnZV9pZnJhbWVfMTE2NDY1XG4gICAgLy8gaHR0cHM6Ly9ub3RpY2Uuc3AtcHJvZC5uZXQvP21lc3NhZ2VfaWQ9MTAxMTc1JmFtcDttbXNfb3JpZ2luPWh0dHBzOi8vY21wLnRoZXRpbWVzLmNvLnVrL21tcy92MiUyMiUyMGlkPSUyMnNwX21lc3NhZ2VfaWZyYW1lXzEwMTE3NVxuICAgIC8vIGh0dHBzOi8vd3d3Lm9wZW50aGVzYXVydXMuZGUvID0+IG5vdCB3b3JraW5nLlxuICAgIGhhbmRsZUNtcCgpIHtcbiAgICAgICAgLy8gVGhpcyBpcyB0aGUgZmlyc3QgSWZyYW1lLCB3ZSBuZWVkIHRvIGhhbmRsZS4gSGVyZSB3ZSBjbGljayBvbiBkZXRhaWxzLlxuICAgICAgICAvLyBmb3Igc29tZSByZWFzb24gdGhlIE9ic2VydmVyIGRvZXMgbm90IGRldGVjdCB0aGUgY2hhbmdlcy5cbiAgICAgICAgaWYgKGRvY3VtZW50LmxvY2F0aW9uLnRvU3RyaW5nKCkuaW5jbHVkZXMoXCJzcC1wcm9kLm5ldFwiKSAmJiAhdGhpcy5fZmlyc3RTdGVwQ29tcGxldGVkKSB7XG4gICAgICAgICAgICBVdGlscy5sb2coXCJpbiAxc3QgSUZyYW1lXCIpO1xuICAgICAgICAgICAgbGV0IF9zZWxmID0gdGhpcztcbiAgICAgICAgICAgIGxldCBfY291bnRlciA9IDA7XG4gICAgICAgICAgICB0aGlzLl9maXJzdFRpbWVvdXQgPSBzZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICBfc2VsZi5maXJzdEJ1dHRvbihfc2VsZiwgX2NvdW50ZXIpO1xuICAgICAgICAgICAgfSwgMTAwMCk7XG4gICAgICAgIH1cbiAgICAgICAgLy8gVGhpcyBpcyB0aGUgU2Vjb25kIElmcmFtZSwgd2UgbmVlZCB0byBoYW5kbGUuIEhlcmUgd2UgdW5jaGVjayBhbGwgdGhlIGNoZWNrYm94ZXMgYW5kIHNhdmUuXG4gICAgICAgIC8vIGZvciBzb21lIHJlYXNvbiB0aGUgT2JzZXJ2ZXIgZG9lcyBub3QgZGV0ZWN0IHRoZSBjaGFuZ2VzLlxuICAgICAgICBpZiAoZG9jdW1lbnQubG9jYXRpb24udG9TdHJpbmcoKS5pbmNsdWRlcyhcInNvdXJjZXBvaW50Lm1nci5jb25zZW5zdS5vcmdcIikgJiYgIXRoaXMuX3NlY29uZFN0ZXBDb21wbGV0ZWQpIHtcbiAgICAgICAgICAgIFV0aWxzLmxvZyhcImluIDJuZCBJRnJhbWVcIik7XG4gICAgICAgICAgICBsZXQgX3NlbGYgPSB0aGlzO1xuICAgICAgICAgICAgbGV0IF9jb3VudGVyID0gMDtcbiAgICAgICAgICAgIHRoaXMuX3NlY29uZFRpbWVvdXQgPSBzZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICBfc2VsZi5zZWNvbmRCdXR0b24oX3NlbGYsIF9jb3VudGVyKTtcbiAgICAgICAgICAgIH0sIDEwMDApO1xuICAgICAgICB9XG4gICAgfVxuICAgIGZpcnN0QnV0dG9uKF9zZWxmLCBfY291bnRlcikge1xuICAgICAgICBjb25zdCBhbGxwb3B1cCA9IFwiYnV0dG9uLm1lc3NhZ2UtYnV0dG9uXCI7XG4gICAgICAgIGxldCBhbGxwb3B1cEJ1dHRvbnMgPSBfc2VsZi5fY21wLnF1ZXJ5Tm9kZVNlbGVjdG9yQWxsKGFsbHBvcHVwKTtcbiAgICAgICAgLy8gcHJlc3Mgb24gXCJPcHRpb25zXCJcbiAgICAgICAgaWYgKFV0aWxzLm9iamVjdENsaWNrYWJsZShhbGxwb3B1cEJ1dHRvbnNbMF0pICYmIGFsbHBvcHVwQnV0dG9ucy5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICBVdGlscy5sb2coXCJEZXRhaWxzIGNsaWNrZWQuXCIpO1xuICAgICAgICAgICAgX2NvdW50ZXIgPSA1MTtcbiAgICAgICAgICAgIF9zZWxmLl9maXJzdFN0ZXBDb21wbGV0ZWQgPSB0cnVlO1xuICAgICAgICAgICAgY2xlYXJUaW1lb3V0KF9zZWxmLl9maXJzdFRpbWVvdXQpO1xuICAgICAgICAgICAgYWxscG9wdXBCdXR0b25zWzBdLmNsaWNrKCk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAoX2NvdW50ZXIgPCA1MCkge1xuICAgICAgICAgICAgX3NlbGYuX2ZpcnN0VGltZW91dCA9IHNldFRpbWVvdXQoZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIF9zZWxmLnNlY29uZEJ1dHRvbihfc2VsZiwgX2NvdW50ZXIpO1xuICAgICAgICAgICAgfSwgMTAwMCk7XG4gICAgICAgICAgICBfY291bnRlcisrO1xuICAgICAgICAgICAgVXRpbHMubG9nKFwiQ291bnRlcjogKDFzdCBCdXR0b24pXCIgKyBfY291bnRlcik7XG4gICAgICAgIH1cbiAgICB9XG4gICAgc2Vjb25kQnV0dG9uKF9zZWxmLCBfY291bnRlcikge1xuICAgICAgICBjb25zdCBzd2l0Y2hlc0FsbCA9IFwiZGl2LnNwLXN3aXRjaC1hcnJvdy1ibG9ja1wiO1xuICAgICAgICBsZXQgc3dpdGNoZXNBbGxEaXYgPSBfc2VsZi5fY21wLnF1ZXJ5Tm9kZVNlbGVjdG9yQWxsKHN3aXRjaGVzQWxsKTtcbiAgICAgICAgVXRpbHMubG9nKFwiQWxsIHN3aXRjaGVzQWxsOiBcIiArIHN3aXRjaGVzQWxsRGl2Lmxlbmd0aCk7XG4gICAgICAgIGNvbnN0IHN3aXRjaGVzT24gPSBcImRpdi5zcC1zd2l0Y2gtYXJyb3ctYmxvY2sgYS5vblwiO1xuICAgICAgICBsZXQgc3dpdGNoZXNPbkRpdiA9IF9zZWxmLl9jbXAucXVlcnlOb2RlU2VsZWN0b3JBbGwoc3dpdGNoZXNPbik7XG4gICAgICAgIFV0aWxzLmxvZyhcIk9uIHN3aXRjaGVzQWxsOiBcIiArIHN3aXRjaGVzT25EaXYubGVuZ3RoKTtcbiAgICAgICAgY29uc3Qgc2F2ZSA9IFwiYnV0dG9uLnByaXYtc2F2ZS1idG5cIjtcbiAgICAgICAgbGV0IHNhdmVCdXR0b24gPSBfc2VsZi5fY21wLnF1ZXJ5Tm9kZVNlbGVjdG9yKHNhdmUpO1xuICAgICAgICBVdGlscy5sb2coXCJTYXZlIEJ1dHRvbjogXCIgKyBzYXZlQnV0dG9uKTtcbiAgICAgICAgY29uc3Qgc2F2ZTIgPSBcImJ1dHRvbiN0YWItc2F2ZWFuZGV4aXRcIjtcbiAgICAgICAgbGV0IHNhdmVCdXR0b24yID0gX3NlbGYuX2NtcC5xdWVyeU5vZGVTZWxlY3RvcihzYXZlMik7XG4gICAgICAgIFV0aWxzLmxvZyhcIlNhdmUyIEJ1dHRvbjogXCIgKyBzYXZlQnV0dG9uMik7XG4gICAgICAgIC8vIGlmIHRoZXJlIGlzIGF0IGxlYXN0IG9uZSBzd2l0Y2ggYW5kIGlmIHRoZXJlIGlzIGF0IGxlYXN0IG9uIHN3aXRjaCBcIk9OXCJcbiAgICAgICAgaWYgKHN3aXRjaGVzQWxsRGl2Lmxlbmd0aCA+IDAgJiYgKFV0aWxzLm9iamVjdENsaWNrYWJsZShzYXZlQnV0dG9uKSB8fCBVdGlscy5vYmplY3RDbGlja2FibGUoc2F2ZUJ1dHRvbjIpKSkge1xuICAgICAgICAgICAgLy8gaWYgdGhlcmUgYXMgc3dpdGNoZXMgdG8gc3dpdGNoIG9mZiwgZG8gc28uXG4gICAgICAgICAgICBpZiAoc3dpdGNoZXNPbkRpdi5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICAgICAgc3dpdGNoZXNPbkRpdi5mb3JFYWNoKChocmVmKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIFV0aWxzLmxvZyhcIkNoYW5naW5nIEJ1dHRvbiBmcm9tIE9OIHRvIE9mZlwiKTtcbiAgICAgICAgICAgICAgICAgICAgaHJlZi5jbGljaygpO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgLy8gbm93IGNvbmZpcm0uXG4gICAgICAgICAgICBpZiAoVXRpbHMub2JqZWN0Q2xpY2thYmxlKHNhdmVCdXR0b24pKSB7XG4gICAgICAgICAgICAgICAgc2F2ZUJ1dHRvbi5jbGljaygpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgc2F2ZUJ1dHRvbjIuY2xpY2soKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIF9jb3VudGVyID0gNTE7XG4gICAgICAgICAgICBfc2VsZi5fc2Vjb25kU3RlcENvbXBsZXRlZCA9IHRydWU7XG4gICAgICAgICAgICBjbGVhclRpbWVvdXQoX3NlbGYuX3NlY29uZFRpbWVvdXQpO1xuICAgICAgICAgICAgX3NlbGYuX2NtcC5yZXNldCgpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKF9jb3VudGVyIDwgNTApIHtcbiAgICAgICAgICAgIF9zZWxmLl9zZWNvbmRUaW1lb3V0ID0gc2V0VGltZW91dChmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgX3NlbGYuc2Vjb25kQnV0dG9uKF9zZWxmLCBfY291bnRlcik7XG4gICAgICAgICAgICB9LCAxMDAwKTtcbiAgICAgICAgICAgIF9jb3VudGVyKys7XG4gICAgICAgICAgICBVdGlscy5sb2coXCJDb3VudGVyICgybmQgQnV0dG9uKTogXCIgKyBfY291bnRlcik7XG4gICAgICAgIH1cbiAgICB9XG59XG4iLCJcInVzZSBzdHJpY3RcIjtcbmltcG9ydCBVdGlscyBmcm9tIFwiLi4vVXRpbHNcIjtcbmltcG9ydCBDTVAgZnJvbSBcIi4vQ01QXCI7XG5pbXBvcnQgQ21wVHlwZSBmcm9tIFwiLi9DbXBUeXBlXCI7XG5leHBvcnQgZGVmYXVsdCBjbGFzcyBUcmFmZmVjdGl2ZSB7XG4gICAgY29uc3RydWN0b3Iobm9kZSwgc2NyaXB0VXJsLCBiYWNrZW5kQ2FsbCkge1xuICAgICAgICB0aGlzLl9uYW1lID0gXCJUcmFmZmVjdGl2ZSBHbWJIXCI7XG4gICAgICAgIGJhY2tlbmRDYWxsLmNtcERhdGEoMjEsIHRoaXMuX25hbWUsIHNjcmlwdFVybCwgQ21wVHlwZS5XQUlUX0ZPUl9BU1lOQ19DQUxMQkFDSywgdHJ1ZSk7XG4gICAgICAgIHRoaXMuX2NtcCA9IG5ldyBDTVAobm9kZSwgYmFja2VuZENhbGwsIHRoaXMpO1xuICAgIH1cbiAgICBnZXQgbmFtZSgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX25hbWU7XG4gICAgfVxuICAgIGNvbm5lY3QoKSB7XG4gICAgICAgIHRoaXMuX2NtcC5jb25uZWN0KCk7XG4gICAgfVxuICAgIGhhbmRsZUNtcCgpIHtcbiAgICAgICAgY29uc3QgZ2RwckRpdiA9ICdkaXYuZ2Rwcl9wb3B1cF9wb3B1cCc7XG4gICAgICAgIGxldCBwb3B1cCA9IHRoaXMuX2NtcC5xdWVyeU5vZGVTZWxlY3RvcihnZHByRGl2KTtcbiAgICAgICAgY29uc3QgZ2RwckNoZWNrQm94ZXMgPSAnaW5wdXRbdHlwZT1jaGVja2JveF0uZ2Rwcl9zd2l0Y2hfbmF0aXZlJztcbiAgICAgICAgbGV0IGNoZWNrYm94ZXMgPSB0aGlzLl9jbXAucXVlcnlOb2RlU2VsZWN0b3JBbGwoZ2RwckNoZWNrQm94ZXMpO1xuICAgICAgICBjb25zdCBnZHByU2F2ZUJ1dHRvbiA9ICdkaXYuaXMtcHJpbWFyeS1idXR0b24nO1xuICAgICAgICBsZXQgc2F2ZUJ1dHRvbiA9IHRoaXMuX2NtcC5xdWVyeU5vZGVTZWxlY3RvcihnZHByU2F2ZUJ1dHRvbik7XG4gICAgICAgIGlmIChVdGlscy5vYmplY3RWaXNpYmxlKHBvcHVwKSAmJiB0aGlzLl9jbXAuc3RhdGUgPT09IDApIHtcbiAgICAgICAgICAgIFV0aWxzLmxvZygnQ2hlY2tib3hlcyBmb3VuZDogJyArIGNoZWNrYm94ZXMubGVuZ3RoKTtcbiAgICAgICAgICAgIGNoZWNrYm94ZXMuZm9yRWFjaCgoY2hlY2tib3gpID0+IGNoZWNrYm94LnNldEF0dHJpYnV0ZShcImNoZWNrZWRcIiwgXCJmYWxzZVwiKSwgVXRpbHMubG9nKFwiQ2hlY2tib3ggdW5zZXRcIikpO1xuICAgICAgICAgICAgdGhpcy5fY21wLnN0YXRlID0gMTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmIChVdGlscy5vYmplY3RDbGlja2FibGUoc2F2ZUJ1dHRvbikgJiYgdGhpcy5fY21wLnN0YXRlID09PSAxKSB7XG4gICAgICAgICAgICBVdGlscy5sb2coJ0J1dHRvbiBmb3VuZCAuLi4nKTtcbiAgICAgICAgICAgIHNhdmVCdXR0b24uY2xpY2soKTtcbiAgICAgICAgICAgIHRoaXMuX2NtcC5yZXNldCgpO1xuICAgICAgICB9XG4gICAgfVxufVxuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5pbXBvcnQgVXRpbHMgZnJvbSBcIi4uL1V0aWxzXCI7XG5pbXBvcnQgQ01QIGZyb20gXCIuL0NNUFwiO1xuaW1wb3J0IENtcFR5cGUgZnJvbSBcIi4vQ21wVHlwZVwiO1xuZXhwb3J0IGRlZmF1bHQgY2xhc3MgVHJ1c3RBcmNCYW5uZXIge1xuICAgIGNvbnN0cnVjdG9yKG5vZGUsIHNjcmlwdFVybCwgYmFja2VuZENhbGwpIHtcbiAgICAgICAgdGhpcy5fbmFtZSA9IFwiVHJ1c3RBcmMgSW5jIChCYW5uZXIpXCI7XG4gICAgICAgIGJhY2tlbmRDYWxsLmNtcERhdGEoNDEsIHRoaXMuX25hbWUsIHNjcmlwdFVybCwgQ21wVHlwZS5ET19OT1RfV0FJVCwgdHJ1ZSk7XG4gICAgICAgIHRoaXMuX2NtcCA9IG5ldyBDTVAobm9kZSwgYmFja2VuZENhbGwsIHRoaXMpO1xuICAgIH1cbiAgICBnZXQgbmFtZSgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX25hbWU7XG4gICAgfVxuICAgIGNvbm5lY3QoKSB7XG4gICAgICAgIHRoaXMuX2NtcC5jb25uZWN0KCk7XG4gICAgfVxuICAgIGhhbmRsZUNtcCgpIHtcbiAgICAgICAgY29uc3QgY29udGVudCA9IFwiI3RydXN0ZS1jb25zZW50LWNvbnRlbnQsIC50cnVzdGUtY29uc2VudC1jb250ZW50XCI7XG4gICAgICAgIGxldCBjb250ZW50RGl2ID0gdGhpcy5fY21wLnF1ZXJ5Tm9kZVNlbGVjdG9yKGNvbnRlbnQpO1xuICAgICAgICBjb25zdCByZXF1aXJlZCA9IFwiI3RydXN0ZS1zaG93LWNvbnNlbnRcIjtcbiAgICAgICAgbGV0IHJlcXVpcmVkQnV0dG9uID0gdGhpcy5fY21wLnF1ZXJ5Tm9kZVNlbGVjdG9yKHJlcXVpcmVkKTtcbiAgICAgICAgVXRpbHMubG9nKFwiZGV0YWlsczogXCIgKyByZXF1aXJlZEJ1dHRvbik7XG4gICAgICAgIFV0aWxzLmxvZyhcIlN0YXRlOiBcIiArIHRoaXMuX2NtcC5zdGF0ZSk7XG4gICAgICAgIGlmIChVdGlscy5vYmplY3RDbGlja2FibGUocmVxdWlyZWRCdXR0b24pICYmIFV0aWxzLm9iamVjdENsaWNrYWJsZShjb250ZW50RGl2KSAmJiB0aGlzLl9jbXAuc3RhdGUgPT09IDApIHtcbiAgICAgICAgICAgIFV0aWxzLmxvZyhcImRldGFpbHNCdXR0b24gY2xpY2tlZFwiKTtcbiAgICAgICAgICAgIHRoaXMuZGVsYXllZENsaWNrKDApO1xuICAgICAgICAgICAgdGhpcy5fY21wLnN0YXRlID0gMTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBkZWxheWVkQ2xpY2soY291bnQpIHtcbiAgICAgICAgY29uc3QgcmVxdWlyZWQgPSBcIiN0cnVzdGUtc2hvdy1jb25zZW50XCI7XG4gICAgICAgIGxldCByZXF1aXJlZEJ1dHRvbiA9IHRoaXMuX2NtcC5xdWVyeU5vZGVTZWxlY3RvcihyZXF1aXJlZCk7XG4gICAgICAgIHJlcXVpcmVkQnV0dG9uLmNsaWNrKCk7XG4gICAgICAgIFV0aWxzLmxvZyhcIkN1cnJlbnQgQ291bnQ6XCIgKyBjb3VudCk7XG4gICAgICAgIGlmIChjb3VudCA8IDEpIHtcbiAgICAgICAgICAgIGxldCBfc2VsZiA9IHRoaXM7XG4gICAgICAgICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICBfc2VsZi5kZWxheWVkQ2xpY2soY291bnQgKyAxKTtcbiAgICAgICAgICAgICAgICBVdGlscy5sb2coXCJDbGlja2VkXCIpO1xuICAgICAgICAgICAgfSwgMTAwMCk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICBVdGlscy5sb2coXCJtYXhpbXVtIHJlYWNoZWRcIik7XG4gICAgICAgICAgICB0aGlzLl9jbXAucmVzZXQoKTtcbiAgICAgICAgfVxuICAgIH1cbn1cbiIsIlwidXNlIHN0cmljdFwiO1xuaW1wb3J0IFV0aWxzIGZyb20gXCIuLi9VdGlsc1wiO1xuaW1wb3J0IENNUCBmcm9tIFwiLi9DTVBcIjtcbmltcG9ydCBDbXBUeXBlIGZyb20gXCIuL0NtcFR5cGVcIjtcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFRydXN0QXJjSUZyYW1lIHtcbiAgICBjb25zdHJ1Y3Rvcihub2RlLCBzY3JpcHRVcmwsIGJhY2tlbmRDYWxsKSB7XG4gICAgICAgIHRoaXMuX25hbWUgPSBcIlRydXN0QXJjIEluYyAoSUZyYW1lKVwiO1xuICAgICAgICBiYWNrZW5kQ2FsbC5jbXBEYXRhKDQxLCB0aGlzLl9uYW1lLCBzY3JpcHRVcmwsIENtcFR5cGUuRE9fTk9UX1dBSVQsIHRydWUpO1xuICAgICAgICB0aGlzLl9jbXAgPSBuZXcgQ01QKG5vZGUsIGJhY2tlbmRDYWxsLCB0aGlzKTtcbiAgICB9XG4gICAgZ2V0IG5hbWUoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9uYW1lO1xuICAgIH1cbiAgICBjb25uZWN0KCkge1xuICAgICAgICB0aGlzLl9jbXAuY29ubmVjdCgpO1xuICAgIH1cbiAgICAvKlxuXG4gICAgICAgIGh0dHBzOi8vZG9jcy5vcmFjbGUuY29tL1xuICAgICAgICBodHRwczovL25ld3Nyb29tLmlibS5jb20vXG5cbiAgICAgKi9cbiAgICBoYW5kbGVDbXAoKSB7XG4gICAgICAgIC8vIGZyb20gd2l0aGluIElGcmFtZVxuICAgICAgICBjb25zdCBtb3JlSW5mb3JtYXRpb24gPSBcIi5zaHBcIjtcbiAgICAgICAgbGV0IG1vcmVJbmZvcm1hdGlvbkJ1dHRvbiA9IHRoaXMuX2NtcC5xdWVyeU5vZGVTZWxlY3Rvcihtb3JlSW5mb3JtYXRpb24pO1xuICAgICAgICBjb25zdCBhZHZhbmNlZCA9IFwiLmFkdmFuY2VcIjtcbiAgICAgICAgbGV0IGFkdmFuY2VkQnV0dG9uID0gdGhpcy5fY21wLnF1ZXJ5Tm9kZVNlbGVjdG9yKGFkdmFuY2VkKTtcbiAgICAgICAgVXRpbHMubG9nKFwiYWR2YW5jZWQ6IFwiICsgYWR2YW5jZWRCdXR0b24pO1xuICAgICAgICBjb25zdCBzcGFuT24gPSAnLm9uJztcbiAgICAgICAgbGV0IHNwYW5Pbkdyb3VwID0gdGhpcy5fY21wLnF1ZXJ5Tm9kZVNlbGVjdG9yQWxsKHNwYW5Pbik7XG4gICAgICAgIFV0aWxzLmxvZyhzcGFuT25Hcm91cCk7XG4gICAgICAgIFV0aWxzLmxvZyhcIlNwYW4gb24gR3JvdXAgTGVuZ3RoOiBcIiArIHNwYW5Pbkdyb3VwLmxlbmd0aCk7XG4gICAgICAgIGNvbnN0IHN1Ym1pdCA9IFwiLnN1Ym1pdFwiO1xuICAgICAgICBsZXQgc3VibWl0QnV0dG9uID0gdGhpcy5fY21wLnF1ZXJ5Tm9kZVNlbGVjdG9yKHN1Ym1pdCk7XG4gICAgICAgIFV0aWxzLmxvZyhcInN1Ym1pdDogJ1wiICsgc3VibWl0QnV0dG9uICsgXCInIFwiICsgSlNPTi5zdHJpbmdpZnkoc3VibWl0QnV0dG9uKSk7XG4gICAgICAgIGNvbnN0IGNsb3NlID0gXCIuY2xvc2VcIjtcbiAgICAgICAgbGV0IGNsb3NlQnV0dG9uID0gdGhpcy5fY21wLnF1ZXJ5Tm9kZVNlbGVjdG9yKGNsb3NlKTtcbiAgICAgICAgVXRpbHMubG9nKFwiQ2xvc2U6IFwiICsgY2xvc2VCdXR0b24pO1xuICAgICAgICBVdGlscy5sb2coXCJTdGF0ZTogXCIgKyB0aGlzLl9jbXAuc3RhdGUpO1xuICAgICAgICBpZiAoVXRpbHMub2JqZWN0Q2xpY2thYmxlKG1vcmVJbmZvcm1hdGlvbkJ1dHRvbikgJiYgdGhpcy5fY21wLnN0YXRlIDwgMSkge1xuICAgICAgICAgICAgVXRpbHMubG9nKFwibW9yZUluZm9ybWF0aW9uQnV0dG9uIGNsaWNrZWRcIik7XG4gICAgICAgICAgICBtb3JlSW5mb3JtYXRpb25CdXR0b24uY2xpY2soKTtcbiAgICAgICAgICAgIHRoaXMuX2NtcC5zdGF0ZSA9IDE7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAoVXRpbHMub2JqZWN0Q2xpY2thYmxlKGFkdmFuY2VkQnV0dG9uKSAmJiB0aGlzLl9jbXAuc3RhdGUgPCAyKSB7XG4gICAgICAgICAgICBVdGlscy5sb2coXCJhZHZhbmNlZCBjbGlja2VkXCIpO1xuICAgICAgICAgICAgYWR2YW5jZWRCdXR0b24uY2xpY2soKTtcbiAgICAgICAgICAgIHRoaXMuX2NtcC5zdGF0ZSA9IDI7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAoc3Bhbk9uR3JvdXAgJiYgc3Bhbk9uR3JvdXAubGVuZ3RoID4gMSAmJiB0aGlzLl9jbXAuc3RhdGUgPCAzKSB7XG4gICAgICAgICAgICBzcGFuT25Hcm91cC5mb3JFYWNoKChzcGFuKSA9PiB7XG4gICAgICAgICAgICAgICAgVXRpbHMubG9nKFwiQ2hhbmdpbmcgQnV0dG9uXCIpO1xuICAgICAgICAgICAgICAgIHNwYW4uY2xpY2soKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgdGhpcy5fY21wLnN0YXRlID0gMztcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmIChVdGlscy5vYmplY3RDbGlja2FibGUoc3VibWl0QnV0dG9uKSAmJiB0aGlzLl9jbXAuc3RhdGUgPT09IDMpIHtcbiAgICAgICAgICAgIFV0aWxzLmxvZyhcIkNsaWNrIFN1Ym1pdFwiKTtcbiAgICAgICAgICAgIHN1Ym1pdEJ1dHRvbi5jbGljaygpO1xuICAgICAgICAgICAgdGhpcy5fY21wLnN0YXRlID0gNDtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmIChVdGlscy5vYmplY3RDbGlja2FibGUoY2xvc2VCdXR0b24pICYmIHRoaXMuX2NtcC5zdGF0ZSA9PT0gNCkge1xuICAgICAgICAgICAgVXRpbHMubG9nKFwiY2xvc2VCdXR0b24gY2xpY2tlZFwiKTtcbiAgICAgICAgICAgIGNsb3NlQnV0dG9uLmNsaWNrKCk7XG4gICAgICAgICAgICB0aGlzLl9jbXAucmVzZXQoKTtcbiAgICAgICAgfVxuICAgIH1cbn1cbiIsIlwidXNlIHN0cmljdFwiO1xuaW1wb3J0IFV0aWxzIGZyb20gXCIuLi9VdGlsc1wiO1xuaW1wb3J0IENNUCBmcm9tIFwiLi9DTVBcIjtcbmltcG9ydCBDbXBUeXBlIGZyb20gXCIuL0NtcFR5cGVcIjtcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFVzZXJDZW50cmljcyB7XG4gICAgY29uc3RydWN0b3Iobm9kZSwgc2NyaXB0VXJsLCBiYWNrZW5kQ2FsbCkge1xuICAgICAgICB0aGlzLl9uYW1lID0gXCJVc2VyY2VudHJpY3MgR21iSFwiO1xuICAgICAgICBiYWNrZW5kQ2FsbC5jbXBEYXRhKDUsIHRoaXMuX25hbWUsIHNjcmlwdFVybCwgQ21wVHlwZS5XQUlUX0ZPUl9BU1lOQ19DQUxMQkFDSywgdHJ1ZSk7XG4gICAgICAgIHRoaXMuX2NtcCA9IG5ldyBDTVAobm9kZSwgYmFja2VuZENhbGwsIHRoaXMpO1xuICAgIH1cbiAgICBnZXQgbmFtZSgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX25hbWU7XG4gICAgfVxuICAgIGNvbm5lY3QoKSB7XG4gICAgICAgIHRoaXMuX2NtcC5jb25uZWN0KCk7XG4gICAgfVxuICAgIGhhbmRsZUNtcCgpIHtcbiAgICAgICAgLy8gd2UgYXJlIGxvb2tpbmcgZm9yIGEgYmFubmVyIGFuZCBpZiB0aGlzIGJhbm5lciBpcyB2aXNpYmxlLCB3ZSB0aGVuIGluamVjdCB0aGUgamF2YXNjcmlwdC5cbiAgICAgICAgY29uc3QgdWNCYW5uZXJDb250ZW50ID0gJ2Rpdi51Yy1iYW5uZXItY29udGVudCc7XG4gICAgICAgIGxldCBiYW5uZXIgPSB0aGlzLl9jbXAucXVlcnlOb2RlU2VsZWN0b3IodWNCYW5uZXJDb250ZW50KTtcbiAgICAgICAgLy8gdHlwZW9mIGJ1dHRvbiAhPT0gJ3VuZGVmaW5lZCcgJiYgYnV0dG9uICYmIHR5cGVvZiBidXR0b24ucGFyZW50RWxlbWVudCAhPT0gJ3VuZGVmaW5lZCdcbiAgICAgICAgLy8gY2FzZSBsaWtlIG9uIGhzZTI0LmRlXG4gICAgICAgIGlmIChVdGlscy5vYmplY3RWaXNpYmxlKGJhbm5lcikgJiYgdGhpcy5fY21wLnN0YXRlID09PSAwKSB7XG4gICAgICAgICAgICBVdGlscy5sb2coJ0RlbnkgQWxsIGJ1dHRvbiBmb3VuZCcpO1xuICAgICAgICAgICAgbGV0IHNjcmlwdCA9IHRoaXMuX2NtcC5ub2RlLmNyZWF0ZUVsZW1lbnQoJ3NjcmlwdCcpO1xuICAgICAgICAgICAgc2NyaXB0LnR5cGUgPSAndGV4dC9qYXZhc2NyaXB0JztcbiAgICAgICAgICAgIHNjcmlwdC5hc3luYyA9IHRydWU7XG4gICAgICAgICAgICBzY3JpcHQudGV4dCA9ICdmdW5jdGlvbiBzKGNvdW50ZXIpe2lmKGNvdW50ZXIgPj0gMTAwKXtyZXR1cm47IH0gaWYodHlwZW9mIHRoaXMudXNlcmNlbnRyaWNzICE9PSBcInVuZGVmaW5lZFwiICYmIHR5cGVvZiB0aGlzLnVzZXJjZW50cmljcy5kZW55QWxsQ29uc2VudHNBbmRDbG9zZUluaXRpYWxWaWV3ICE9PSBcInVuZGVmaW5lZFwiKXsgdGhpcy51c2VyY2VudHJpY3MuZGVueUFsbENvbnNlbnRzQW5kQ2xvc2VJbml0aWFsVmlldygpOyB9IGVsc2UgeyBzZXRUaW1lb3V0KGZ1bmN0aW9uKCkge3MoY291bnRlciArIDEpfSwgMjUpOyAgfX07IHMoMSk7JztcbiAgICAgICAgICAgIHRoaXMuX2NtcC5ub2RlLmhlYWQuYXBwZW5kQ2hpbGQoc2NyaXB0KTtcbiAgICAgICAgICAgIHRoaXMuX2NtcC5yZXNldCgpO1xuICAgICAgICB9XG4gICAgfVxufVxuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5pbXBvcnQgRGV0ZWN0b3IgZnJvbSBcIi4vRGV0ZWN0b3JcIjtcbmltcG9ydCBVdGlscyBmcm9tIFwiLi9VdGlsc1wiO1xuaWYgKGRvY3VtZW50LnJlYWR5U3RhdGUgPT09ICdsb2FkaW5nJykge1xuICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ0RPTUNvbnRlbnRMb2FkZWQnLCBhZnRlckRPTUxvYWRlZCk7XG59XG5lbHNlIHtcbiAgICBhZnRlckRPTUxvYWRlZCgpO1xufVxuZnVuY3Rpb24gYWZ0ZXJET01Mb2FkZWQoKSB7XG4gICAgaWYgKHR5cGVvZiBzYWZhcmkgIT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgIFV0aWxzLmxvZyhcIisrKyBSdW5uaW5nIG9uIFNhZmFyaSArKytcIik7XG4gICAgICAgIFV0aWxzLmxvZyhcIkRvY3VtZW50OiBcIiArIGRvY3VtZW50KTtcbiAgICAgICAgVXRpbHMubG9nKFwiQm9keTogXCIgKyBkb2N1bWVudC5ib2R5KTtcbiAgICB9XG4gICAgZWxzZSBpZiAodHlwZW9mIGNocm9tZSAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgVXRpbHMubG9nKFwiKysrIFJ1bm5pbmcgb24gQ2hyb21pdW0gUGxhdGZvcm0gKysrXCIpO1xuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgICAgVXRpbHMubG9nKFwiKysrIFJ1bm5pbmcgb24gc29tZSBvdGhlciBQbGF0Zm9ybSArKytcIik7XG4gICAgfVxuICAgIC8vIG9ubHkgZXhlY3V0ZSB0aGUgY29udGVudCBzY3JpcHRcbiAgICAvLyAtIGlmIHRoZXJlIGlzIGRvYyB0eXBlXG4gICAgLy8gLSBpZiB0aGVyZSBpcyBib2R5IHdpdGggYSBkZWZpbmVkIGxlbmd0aFxuICAgIC8vIC0gaWYgdGhlcmUgYXJlIHNvbWUgY2hpbGQgbm9kZXMgaW4gdGhlIGJvZHlcbiAgICBVdGlscy5sb2coXCJDb25zZW50IFNjcmlwdCBQYXJhbWV0ZXI6IFwiICsgSlNPTi5zdHJpbmdpZnkoZG9jdW1lbnQuZG9jdHlwZSkgKyBcIiwgTGVuOiBcIiArIGRvY3VtZW50LmJvZHkuaW5uZXJIVE1MLmxlbmd0aCArIFwiLCBOb2RlczogXCIgKyBkb2N1bWVudC5ib2R5LmNoaWxkTm9kZXMubGVuZ3RoKTtcbiAgICBsZXQgaW5GcmFtZSA9IGZhbHNlO1xuICAgIHRyeSB7XG4gICAgICAgIGluRnJhbWUgPSB3aW5kb3cuc2VsZiAhPT0gd2luZG93LnRvcDtcbiAgICAgICAgVXRpbHMubG9nKFwiUnVubmluZyBpbiBJRnJhbWU6IFwiICsgaW5GcmFtZSk7XG4gICAgfVxuICAgIGNhdGNoIChlKSB7XG4gICAgICAgIFV0aWxzLmxvZyhcIkVycm9yIEZpZ3VyaW5nIG91dCBpZiB3ZSBhcmUgcnVubmluZyBpbiBhbiBpRnJhbWVcIik7XG4gICAgICAgIGluRnJhbWUgPSBmYWxzZTtcbiAgICB9XG4gICAgaWYgKGRvY3VtZW50LmRvY3R5cGUgJiYgZG9jdW1lbnQuYm9keS5pbm5lckhUTUwubGVuZ3RoID4gMTAwKSB7XG4gICAgICAgIFV0aWxzLmxvZyhcIlRyaWdnZXJpbmcgQ29udGVudCBTY3JpcHRcIik7XG4gICAgICAgIGNvbnN0IG1lc3NhZ2VGcm9tID0gXCJGUk9NX01JTklNQUxfQ09OU0VOVFwiO1xuICAgICAgICAvLyBUaGlzIGlzIHRoZSBzY3JpcHQgZm9yIGNoZWNraW5nIHdoZXRoZXIgdGhlcmUgaXMgYSBUQ0YgMS4xIG9yIFRDRiAyLjAgY29tcGxpYW50IENNUC5cbiAgICAgICAgbGV0IHNjcmlwdCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NjcmlwdCcpO1xuICAgICAgICBzY3JpcHQudHlwZSA9ICd0ZXh0L2phdmFzY3JpcHQnO1xuICAgICAgICBzY3JpcHQuYXN5bmMgPSB0cnVlO1xuICAgICAgICBzY3JpcHQudGV4dCA9ICd3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcihcImxvYWRcIixjaGVja0ZvckNtcCwhMSk7bGV0IGRhdGFmcmFtZUZvclBpbmdSZXR1cm49e3R5cGU6XCJGUk9NX01JTklNQUxfQ09OU0VOVFwifSxjaGVja0ZvckNtcENvdW50ZXI9MCxtYXhUaW1lb3V0Rm9yUmVzZWFyY2g9MjAwLG1heFJldHJ5Rm9yU2VhcmNoPTI1O2Z1bmN0aW9uIGNoZWNrRm9yQ21wKCl7dGhpcy5fX2NtcD90aGlzLl9fY21wKFwicGluZ1wiLDIsc2VuZE1lc3NhZ2UpOnRoaXMuX190Y2ZhcGk/dGhpcy5fX3RjZmFwaShcInBpbmdcIiwyLHNlbmRNZXNzYWdlKTp0aGlzLmZyYW1lcyYmdGhpcy5mcmFtZXMubGVuZ3RoJiZ0aGlzLmZyYW1lcy5fX3RjZmFwaUxvY2F0b3I/dGhpcy5fX3RjZmFwaShcInBpbmdcIiwyLHNlbmRNZXNzYWdlKTpjaGVja0ZvckNtcENvdW50ZXI8bWF4UmV0cnlGb3JTZWFyY2g/KHNldFRpbWVvdXQoY2hlY2tGb3JDbXAsbWF4VGltZW91dEZvclJlc2VhcmNoKSxjaGVja0ZvckNtcENvdW50ZXIrKyk6d2luZG93LnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJsb2FkXCIsY2hlY2tGb3JDbXAsITEpfWZ1bmN0aW9uIHNlbmRNZXNzYWdlKGUsdCl7dCYmKGRhdGFmcmFtZUZvclBpbmdSZXR1cm4uY21wPUpTT04uc3RyaW5naWZ5KGUpLHdpbmRvdy5wb3N0TWVzc2FnZShkYXRhZnJhbWVGb3JQaW5nUmV0dXJuLFwiKlwiKSx3aW5kb3cucmVtb3ZlRXZlbnRMaXN0ZW5lcihcImxvYWRcIixjaGVja0ZvckNtcCwhMSkpfSc7XG4gICAgICAgIGRvY3VtZW50LmhlYWQuYXBwZW5kQ2hpbGQoc2NyaXB0KTtcbiAgICAgICAgY29uc3QgZGV0ZWN0b3IgPSBuZXcgRGV0ZWN0b3IoZG9jdW1lbnQsIGluRnJhbWUpO1xuICAgICAgICBkZXRlY3Rvci5jb25uZWN0T2JzZXJ2ZXIoKTtcbiAgICAgICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoXCJtZXNzYWdlXCIsIGZ1bmN0aW9uIChldmVudCkge1xuICAgICAgICAgICAgLy8gV2Ugb25seSBhY2NlcHQgbWVzc2FnZXMgZnJvbSBvdXJzZWx2ZXNcbiAgICAgICAgICAgIGlmIChldmVudC5zb3VyY2UgIT09IHdpbmRvdylcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAvLyBvbmx5IGlmIHRoZXJlIFRDRiAxLjEgb3IgVEZDIDIuMCBjb21wbGlhbnQgQ01QIGZvdW5kLCBsYXVuY2ggdGhlIGFwcHJvcHJpYXRlIGRldGVjdG9yLlxuICAgICAgICAgICAgLy8gaWYgdGhlIHByb3ByaWV0YXJ5IGluaXRpYWxpemF0aW9uIGFscmVhZHkgd29ya2VkIG91dCwgZG9uJ3QgaW5pdGlhbGl6ZSB0aGUgQ01QIGFnYWluLlxuICAgICAgICAgICAgaWYgKGV2ZW50LmRhdGEudHlwZSAmJiBldmVudC5kYXRhLnR5cGUgPT09IG1lc3NhZ2VGcm9tKSB7XG4gICAgICAgICAgICAgICAgLy8gZ2l2ZW4gdGhlIFBpbmcgUmVzdWx0IHRvIHRoZSBEZXRlY3RvciBPYmplY3QuXG4gICAgICAgICAgICAgICAgZGV0ZWN0b3IucGluZ1Jlc3VsdCA9IGV2ZW50LmRhdGEuY21wO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9XG59XG4iLCJcInVzZSBzdHJpY3RcIjtcbmltcG9ydCBVdGlscyBmcm9tIFwiLi4vVXRpbHNcIjtcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFBpbmdSZXN1bHQge1xuICAgIGNvbnN0cnVjdG9yKGdkcHJBcHBsaWVzR2xvYmFsbHksIGdkcHJBcHBsaWVzLCBjbXBMb2FkZWQsIGNtcFN0YXR1cywgZGlzcGxheVN0YXR1cywgYXBpVmVyc2lvbiwgY21wVmVyc2lvbiwgY21wSWQsIGd2bFZlcnNpb24sIHRjZlBvbGljeVZlcnNpb24pIHtcbiAgICAgICAgaWYgKFV0aWxzLmNoZWNrSWZEZWZpbmVkQW5kTm90TnVsbChnZHByQXBwbGllc0dsb2JhbGx5KSkge1xuICAgICAgICAgICAgdGhpcy5fZ2RwckFwcGxpZXNHbG9iYWxseSA9IGdkcHJBcHBsaWVzR2xvYmFsbHk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKFV0aWxzLmNoZWNrSWZEZWZpbmVkQW5kTm90TnVsbChnZHByQXBwbGllcykpIHtcbiAgICAgICAgICAgIHRoaXMuX2dkcHJBcHBsaWVzID0gZ2RwckFwcGxpZXM7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKFV0aWxzLmNoZWNrSWZEZWZpbmVkQW5kTm90TnVsbChjbXBMb2FkZWQpKSB7XG4gICAgICAgICAgICB0aGlzLl9jbXBMb2FkZWQgPSBjbXBMb2FkZWQ7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKFV0aWxzLmNoZWNrSWZEZWZpbmVkQW5kTm90TnVsbChjbXBTdGF0dXMpKSB7XG4gICAgICAgICAgICB0aGlzLl9jbXBTdGF0dXMgPSBjbXBTdGF0dXM7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKFV0aWxzLmNoZWNrSWZEZWZpbmVkQW5kTm90TnVsbChkaXNwbGF5U3RhdHVzKSkge1xuICAgICAgICAgICAgdGhpcy5fZGlzcGxheVN0YXR1cyA9IGRpc3BsYXlTdGF0dXM7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKFV0aWxzLmNoZWNrSWZEZWZpbmVkQW5kTm90TnVsbChhcGlWZXJzaW9uKSkge1xuICAgICAgICAgICAgdGhpcy5fYXBpVmVyc2lvbiA9IGFwaVZlcnNpb247XG4gICAgICAgIH1cbiAgICAgICAgaWYgKFV0aWxzLmNoZWNrSWZEZWZpbmVkQW5kTm90TnVsbChjbXBWZXJzaW9uKSkge1xuICAgICAgICAgICAgdGhpcy5fY21wVmVyc2lvbiA9IGNtcFZlcnNpb247XG4gICAgICAgIH1cbiAgICAgICAgaWYgKFV0aWxzLmNoZWNrSWZEZWZpbmVkQW5kTm90TnVsbChjbXBJZCkpIHtcbiAgICAgICAgICAgIHRoaXMuX2NtcElkID0gY21wSWQ7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKFV0aWxzLmNoZWNrSWZEZWZpbmVkQW5kTm90TnVsbChndmxWZXJzaW9uKSkge1xuICAgICAgICAgICAgdGhpcy5fZ3ZsVmVyc2lvbiA9IGd2bFZlcnNpb247XG4gICAgICAgIH1cbiAgICAgICAgaWYgKFV0aWxzLmNoZWNrSWZEZWZpbmVkQW5kTm90TnVsbCh0Y2ZQb2xpY3lWZXJzaW9uKSkge1xuICAgICAgICAgICAgdGhpcy5fdGNmUG9saWN5VmVyc2lvbiA9IHRjZlBvbGljeVZlcnNpb247XG4gICAgICAgIH1cbiAgICB9XG4gICAgZ2V0IGNtcElkKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fY21wSWQ7XG4gICAgfVxuICAgIHNldCBjbXBJZChpZCkge1xuICAgICAgICB0aGlzLl9jbXBJZCA9IGlkO1xuICAgIH1cbiAgICBnZXQgZ2RwckFwcGxpZXNHbG9iYWxseSgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2dkcHJBcHBsaWVzR2xvYmFsbHk7XG4gICAgfVxuICAgIGdldCBnZHByQXBwbGllcygpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2dkcHJBcHBsaWVzO1xuICAgIH1cbiAgICBnZXQgY21wTG9hZGVkKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fY21wTG9hZGVkO1xuICAgIH1cbiAgICBnZXQgY21wU3RhdHVzKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fY21wU3RhdHVzO1xuICAgIH1cbiAgICBnZXQgZGlzcGxheVN0YXR1cygpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2Rpc3BsYXlTdGF0dXM7XG4gICAgfVxuICAgIGdldCBhcGlWZXJzaW9uKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fYXBpVmVyc2lvbjtcbiAgICB9XG4gICAgZ2V0IGNtcFZlcnNpb24oKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9jbXBWZXJzaW9uO1xuICAgIH1cbiAgICBnZXQgZ3ZsVmVyc2lvbigpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2d2bFZlcnNpb247XG4gICAgfVxuICAgIGdldCB0Y2ZQb2xpY3lWZXJzaW9uKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fdGNmUG9saWN5VmVyc2lvbjtcbiAgICB9XG4gICAgZ2V0IHRjZlZlcnNpb24oKSB7XG4gICAgICAgIGxldCB0Y2ZWZXJzaW9uO1xuICAgICAgICBpZiAodHlwZW9mIHRoaXMuZ2RwckFwcGxpZXNHbG9iYWxseSAhPT0gJ3VuZGVmaW5lZCcgJiYgdHlwZW9mIHRoaXMuY21wTG9hZGVkICE9PSAndW5kZWZpbmVkJyAmJiB0eXBlb2YgdGhpcy5nZHByQXBwbGllcyA9PT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgICAgIHRjZlZlcnNpb24gPSBcIlRDRiAxLjFcIjtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmICh0eXBlb2YgdGhpcy5nZHByQXBwbGllcyAhPT0gJ3VuZGVmaW5lZCcgJiYgdHlwZW9mIHRoaXMuY21wTG9hZGVkICE9PSAndW5kZWZpbmVkJyAmJiB0eXBlb2YgdGhpcy5nZHByQXBwbGllc0dsb2JhbGx5ID09PSAndW5kZWZpbmVkJykge1xuICAgICAgICAgICAgdGNmVmVyc2lvbiA9IFwiVENGIDIuMFwiO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgdGNmVmVyc2lvbiA9IFwibm90IGRlZmluZWRcIjtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdGNmVmVyc2lvbjtcbiAgICB9XG4gICAgc3RhdGljIGNsYXNzKHBpbmdSZXN1bHQpIHtcbiAgICAgICAgaWYgKHBpbmdSZXN1bHQuX2dkcHJBcHBsaWVzR2xvYmFsbHkgfHwgcGluZ1Jlc3VsdC5fZ2RwckFwcGxpZXMgfHxcbiAgICAgICAgICAgIHBpbmdSZXN1bHQuX2NtcExvYWRlZCB8fFxuICAgICAgICAgICAgcGluZ1Jlc3VsdC5fY21wU3RhdHVzIHx8XG4gICAgICAgICAgICBwaW5nUmVzdWx0Ll9kaXNwbGF5U3RhdHVzIHx8XG4gICAgICAgICAgICBwaW5nUmVzdWx0Ll9hcGlWZXJzaW9uIHx8XG4gICAgICAgICAgICBwaW5nUmVzdWx0Ll9jbXBWZXJzaW9uIHx8XG4gICAgICAgICAgICBwaW5nUmVzdWx0Ll9jbXBJZCB8fFxuICAgICAgICAgICAgcGluZ1Jlc3VsdC5fZ3ZsVmVyc2lvbiB8fFxuICAgICAgICAgICAgcGluZ1Jlc3VsdC5fdGNmUG9saWN5VmVyc2lvbikge1xuICAgICAgICAgICAgcmV0dXJuIG5ldyBQaW5nUmVzdWx0KHBpbmdSZXN1bHQuX2dkcHJBcHBsaWVzR2xvYmFsbHksIHBpbmdSZXN1bHQuX2dkcHJBcHBsaWVzLCBwaW5nUmVzdWx0Ll9jbXBMb2FkZWQsIHBpbmdSZXN1bHQuX2NtcFN0YXR1cywgcGluZ1Jlc3VsdC5fZGlzcGxheVN0YXR1cywgcGluZ1Jlc3VsdC5fYXBpVmVyc2lvbiwgcGluZ1Jlc3VsdC5fY21wVmVyc2lvbiwgcGluZ1Jlc3VsdC5fY21wSWQsIHBpbmdSZXN1bHQuX2d2bFZlcnNpb24sIHBpbmdSZXN1bHQuX3RjZlBvbGljeVZlcnNpb24pO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgcmV0dXJuIG5ldyBQaW5nUmVzdWx0KHBpbmdSZXN1bHQuZ2RwckFwcGxpZXNHbG9iYWxseSwgcGluZ1Jlc3VsdC5nZHByQXBwbGllcywgcGluZ1Jlc3VsdC5jbXBMb2FkZWQsIHBpbmdSZXN1bHQuY21wU3RhdHVzLCBwaW5nUmVzdWx0LmRpc3BsYXlTdGF0dXMsIHBpbmdSZXN1bHQuYXBpVmVyc2lvbiwgcGluZ1Jlc3VsdC5jbXBWZXJzaW9uLCBwaW5nUmVzdWx0LmNtcElkLCBwaW5nUmVzdWx0Lmd2bFZlcnNpb24sIHBpbmdSZXN1bHQudGNmUG9saWN5VmVyc2lvbik7XG4gICAgICAgIH1cbiAgICB9XG4gICAgdG9KU09OKCkge1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgZ2RwckFwcGxpZXNHbG9iYWxseTogdGhpcy5fZ2RwckFwcGxpZXNHbG9iYWxseSxcbiAgICAgICAgICAgIGdkcHJBcHBsaWVzOiB0aGlzLl9nZHByQXBwbGllcyxcbiAgICAgICAgICAgIGNtcExvYWRlZDogdGhpcy5fY21wTG9hZGVkLFxuICAgICAgICAgICAgY21wU3RhdHVzOiB0aGlzLl9jbXBTdGF0dXMsXG4gICAgICAgICAgICBkaXNwbGF5U3RhdHVzOiB0aGlzLl9kaXNwbGF5U3RhdHVzLFxuICAgICAgICAgICAgYXBpVmVyc2lvbjogdGhpcy5fYXBpVmVyc2lvbixcbiAgICAgICAgICAgIGNtcFZlcnNpb246IHRoaXMuX2NtcFZlcnNpb24sXG4gICAgICAgICAgICBjbXBJZDogdGhpcy5fY21wSWQsXG4gICAgICAgICAgICBndmxWZXJzaW9uOiB0aGlzLl9ndmxWZXJzaW9uLFxuICAgICAgICAgICAgdGNmUG9saWN5VmVyc2lvbjogdGhpcy5fdGNmUG9saWN5VmVyc2lvblxuICAgICAgICB9O1xuICAgIH1cbn1cbiJdLCJzb3VyY2VSb290IjoiIn0=