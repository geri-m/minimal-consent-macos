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
                "cmpScripUrl: this._cmpScriptUrl," +
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay91bml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uIiwid2VicGFjazovLy93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvZGF0ZWZvcm1hdC9saWIvZGF0ZWZvcm1hdC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvanMvQmFja2VuZENhbGwudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2pzL0RldGVjdG9yLnRzIiwid2VicGFjazovLy8uL3NyYy9qcy9VdGlscy50cyIsIndlYnBhY2s6Ly8vLi9zcmMvanMvY21wL0JvcmxhYnMudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2pzL2NtcC9DTVAudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2pzL2NtcC9DaGFuZGFnby50cyIsIndlYnBhY2s6Ly8vLi9zcmMvanMvY21wL0NtcFR5cGUudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2pzL2NtcC9Db25zZW50TWFuYWdlci50cyIsIndlYnBhY2s6Ly8vLi9zcmMvanMvY21wL0Nvb2tpZUJvdC50cyIsIndlYnBhY2s6Ly8vLi9zcmMvanMvY21wL0N1c3RvbUltcGwudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2pzL2NtcC9EaURvTWkudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2pzL2NtcC9Fdmlkb24udHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2pzL2NtcC9Ob1lldEltcGxlbWVudGVkQ21wLnRzIiwid2VicGFjazovLy8uL3NyYy9qcy9jbXAvT2F0aENtcC50cyIsIndlYnBhY2s6Ly8vLi9zcmMvanMvY21wL09uZVRydXN0LnRzIiwid2VicGFjazovLy8uL3NyYy9qcy9jbXAvUXVhbnRDYXN0LnRzIiwid2VicGFjazovLy8uL3NyYy9qcy9jbXAvU291cmNlUG9pbnQudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2pzL2NtcC9UcmFmZmVjdGl2ZS50cyIsIndlYnBhY2s6Ly8vLi9zcmMvanMvY21wL1RydXN0QXJjQmFubmVyLnRzIiwid2VicGFjazovLy8uL3NyYy9qcy9jbXAvVHJ1c3RBcmNJRnJhbWUudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2pzL2NtcC9Vc2VyQ2VudHJpY3MudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2pzL2NvbnRlbnRzY3JpcHQudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2pzL2VudGl0aWVzL1BpbmdSZXN1bHQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQztBQUNELE87UUNWQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTs7O1FBR0E7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBLDBDQUEwQyxnQ0FBZ0M7UUFDMUU7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQSx3REFBd0Qsa0JBQWtCO1FBQzFFO1FBQ0EsaURBQWlELGNBQWM7UUFDL0Q7O1FBRUE7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBLHlDQUF5QyxpQ0FBaUM7UUFDMUUsZ0hBQWdILG1CQUFtQixFQUFFO1FBQ3JJO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0EsMkJBQTJCLDBCQUEwQixFQUFFO1FBQ3ZELGlDQUFpQyxlQUFlO1FBQ2hEO1FBQ0E7UUFDQTs7UUFFQTtRQUNBLHNEQUFzRCwrREFBK0Q7O1FBRXJIO1FBQ0E7OztRQUdBO1FBQ0E7Ozs7Ozs7Ozs7OztBQ2xGQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0EscUJBQXFCLElBQUksR0FBRyxJQUFJO0FBQ2hDLGtKQUFrSixFQUFFO0FBQ3BKOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0EsS0FBSzs7QUFFTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxZQUFZLE9BQU87QUFDbkIsWUFBWTtBQUNaO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFlBQVksT0FBTztBQUNuQixZQUFZO0FBQ1o7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsWUFBWSxFQUFFO0FBQ2QsWUFBWTtBQUNaO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUEsV0FBVztB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QSx3Q0FBd0MsaUVBQW9CO0FBQzVEO0FBQ0E7QUFDQTtBQUNBLHdDQUF3QyxpRUFBb0I7QUFDNUQ7QUFDQTtBQUNBO0FBQ0Esd0NBQXdDLGlFQUFvQjtBQUM1RDtBQUNBO0FBQ0E7QUFDQSx3Q0FBd0MsaUVBQW9CO0FBQzVEO0FBQ0E7QUFDQTtBQUNBLHdDQUF3QyxpRUFBb0I7QUFDNUQ7QUFDQTtBQUNBO0FBQ0Esd0NBQXdDLGlFQUFvQjtBQUM1RDtBQUNBO0FBQ0E7QUFDQSx3Q0FBd0MsaUVBQW9CO0FBQzVEO0FBQ0E7QUFDQTtBQUNBLHdDQUF3QyxpRUFBb0I7QUFDNUQ7QUFDQTtBQUNBO0FBQ0Esd0NBQXdDLGlFQUFvQjtBQUM1RDtBQUNBO0FBQ0E7QUFDQSx3Q0FBd0MsaUVBQW9CO0FBQzVEO0FBQ0E7QUFDQTtBQUNBLHdDQUF3QyxpRUFBb0I7QUFDNUQ7QUFDQTtBQUNBO0FBQ0Esd0NBQXdDLGlFQUFvQjtBQUM1RDtBQUNBO0FBQ0E7QUFDQSx3Q0FBd0MsaUVBQW9CO0FBQzVEO0FBQ0E7QUFDQTtBQUNBLHdDQUF3QyxpRUFBb0I7QUFDNUQ7QUFDQTtBQUNBO0FBQ0Esd0NBQXdDLGlFQUFvQjtBQUM1RDtBQUNBO0FBQ0E7QUFDQSx3Q0FBd0MsaUVBQW9CO0FBQzVEO0FBQ0E7QUFDQTtBQUNBLHdDQUF3QyxpRUFBb0I7QUFDNUQ7QUFDQTtBQUNBO0FBQ0Esd0NBQXdDLGlFQUFvQjtBQUM1RDtBQUNBO0FBQ0E7QUFDQSx3Q0FBd0MsaUVBQW9CO0FBQzVEO0FBQ0E7QUFDQTtBQUNBLHdDQUF3QyxpRUFBb0I7QUFDNUQ7QUFDQTtBQUNBO0FBQ0Esd0NBQXdDLGlFQUFvQjtBQUM1RDtBQUNBO0FBQ0E7QUFDQSx3Q0FBd0MsaUVBQW9CO0FBQzVEO0FBQ0E7QUFDQTtBQUNBLHdDQUF3QyxpRUFBb0I7QUFDNUQ7QUFDQTtBQUNBO0FBQ0Esd0NBQXdDLGlFQUFvQjtBQUM1RDtBQUNBO0FBQ0E7QUFDQSx3Q0FBd0MsaUVBQW9CO0FBQzVEO0FBQ0E7QUFDQTtBQUNBLHdDQUF3QyxpRUFBb0I7QUFDNUQ7QUFDQTtBQUNBO0FBQ0Esd0NBQXdDLGlFQUFvQjtBQUM1RDtBQUNBO0FBQ0E7QUFDQSx3Q0FBd0MsaUVBQW9CO0FBQzVEO0FBQ0E7QUFDQTtBQUNBLHdDQUF3QyxpRUFBb0I7QUFDNUQ7QUFDQTtBQUNBO0FBQ0Esd0NBQXdDLGlFQUFvQjtBQUM1RDtBQUNBO0FBQ0E7QUFDQSx3Q0FBd0MsaUVBQW9CO0FBQzVEO0FBQ0E7QUFDQTtBQUNBLHdDQUF3QyxpRUFBb0I7QUFDNUQ7QUFDQTtBQUNBO0FBQ0Esd0NBQXdDLGlFQUFvQjtBQUM1RDtBQUNBO0FBQ0E7QUFDQSx3Q0FBd0MsaUVBQW9CO0FBQzVEO0FBQ0E7QUFDQTtBQUNBLHdDQUF3QyxpRUFBb0I7QUFDNUQ7QUFDQTtBQUNBO0FBQ0Esd0NBQXdDLGlFQUFvQjtBQUM1RDtBQUNBO0FBQ0E7QUFDQSx3Q0FBd0MsaUVBQW9CO0FBQzVEO0FBQ0E7QUFDQTtBQUNBLHdDQUF3QyxpRUFBb0I7QUFDNUQ7QUFDQTtBQUNBO0FBQ0Esd0NBQXdDLGlFQUFvQjtBQUM1RDtBQUNBO0FBQ0E7QUFDQSx3Q0FBd0MsaUVBQW9CO0FBQzVEO0FBQ0EscUJBQXFCO0FBQ3JCO0FBQ0E7QUFDQSxxQkFBcUI7QUFDckI7QUFDQSx3Q0FBd0MsaUVBQW9CO0FBQzVEO0FBQ0E7QUFDQTtBQUNBLHdDQUF3QyxpRUFBb0I7QUFDNUQ7QUFDQTtBQUNBO0FBQ0Esd0NBQXdDLGlFQUFvQjtBQUM1RDtBQUNBO0FBQ0E7QUFDQSx3Q0FBd0MsaUVBQW9CO0FBQzVEO0FBQ0E7QUFDQTtBQUNBLHdDQUF3QyxpRUFBb0I7QUFDNUQ7QUFDQTtBQUNBO0FBQ0Esd0NBQXdDLGlFQUFvQjtBQUM1RDtBQUNBO0FBQ0E7QUFDQSx3Q0FBd0MsaUVBQW9CO0FBQzVEO0FBQ0E7QUFDQTtBQUNBLHdDQUF3QyxpRUFBb0I7QUFDNUQ7QUFDQTtBQUNBO0FBQ0Esd0NBQXdDLGlFQUFvQjtBQUM1RDtBQUNBO0FBQ0E7QUFDQSx3Q0FBd0MsaUVBQW9CO0FBQzVEO0FBQ0E7QUFDQTtBQUNBLHdDQUF3QyxpRUFBb0I7QUFDNUQ7QUFDQTtBQUNBO0FBQ0Esd0NBQXdDLGlFQUFvQjtBQUM1RDtBQUNBO0FBQ0E7QUFDQSx3Q0FBd0MsaUVBQW9CO0FBQzVEO0FBQ0E7QUFDQTtBQUNBLHdDQUF3QyxpRUFBb0I7QUFDNUQ7QUFDQTtBQUNBO0FBQ0Esd0NBQXdDLGlFQUFvQjtBQUM1RDtBQUNBO0FBQ0E7QUFDQSx3Q0FBd0MsaUVBQW9CO0FBQzVEO0FBQ0E7QUFDQTtBQUNBLHdDQUF3QyxpRUFBb0I7QUFDNUQ7QUFDQTtBQUNBO0FBQ0Esd0NBQXdDLGlFQUFvQjtBQUM1RDtBQUNBO0FBQ0E7QUFDQSx3Q0FBd0MsaUVBQW9CO0FBQzVEO0FBQ0E7QUFDQTtBQUNBLHdDQUF3QyxpRUFBb0I7QUFDNUQ7QUFDQTtBQUNBO0FBQ0Esd0NBQXdDLGlFQUFvQjtBQUM1RDtBQUNBO0FBQ0E7QUFDQSx3Q0FBd0MsaUVBQW9CO0FBQzVEO0FBQ0E7QUFDQTtBQUNBLHdDQUF3QyxpRUFBb0I7QUFDNUQ7QUFDQTtBQUNBO0FBQ0Esd0NBQXdDLGlFQUFvQjtBQUM1RDtBQUNBO0FBQ0E7QUFDQSx3Q0FBd0MsaUVBQW9CO0FBQzVEO0FBQ0E7QUFDQTtBQUNBLHdDQUF3QyxpRUFBb0I7QUFDNUQ7QUFDQTtBQUNBO0FBQ0Esd0NBQXdDLGlFQUFvQjtBQUM1RDtBQUNBO0FBQ0E7QUFDQSx3Q0FBd0MsaUVBQW9CO0FBQzVEO0FBQ0E7QUFDQTtBQUNBLHdDQUF3QyxpRUFBb0I7QUFDNUQ7QUFDQTtBQUNBO0FBQ0Esd0NBQXdDLGlFQUFvQjtBQUM1RDtBQUNBO0FBQ0E7QUFDQSx3Q0FBd0MsaUVBQW9CO0FBQzVEO0FBQ0E7QUFDQTtBQUNBLHdDQUF3QyxpRUFBb0I7QUFDNUQ7QUFDQTtBQUNBO0FBQ0Esd0NBQXdDLGlFQUFvQjtBQUM1RDtBQUNBO0FBQ0E7QUFDQSx3Q0FBd0MsaUVBQW9CO0FBQzVEO0FBQ0E7QUFDQTtBQUNBLHdDQUF3QyxpRUFBb0I7QUFDNUQ7QUFDQTtBQUNBO0FBQ0Esd0NBQXdDLGlFQUFvQjtBQUM1RDtBQUNBO0FBQ0E7QUFDQSx3Q0FBd0MsaUVBQW9CO0FBQzVEO0FBQ0E7QUFDQTtBQUNBLHdDQUF3QyxpRUFBb0I7QUFDNUQ7QUFDQTtBQUNBO0FBQ0Esd0NBQXdDLGlFQUFvQjtBQUM1RDtBQUNBO0FBQ0E7QUFDQSx3Q0FBd0MsaUVBQW9CO0FBQzVEO0FBQ0E7QUFDQTtBQUNBLHdDQUF3QyxpRUFBb0I7QUFDNUQ7QUFDQTtBQUNBO0FBQ0Esd0NBQXdDLGlFQUFvQjtBQUM1RDtBQUNBO0FBQ0E7QUFDQSx3Q0FBd0MsaUVBQW9CO0FBQzVEO0FBQ0E7QUFDQTtBQUNBLHdDQUF3QyxpRUFBb0I7QUFDNUQ7QUFDQTtBQUNBO0FBQ0Esd0NBQXdDLGlFQUFvQjtBQUM1RDtBQUNBO0FBQ0E7QUFDQSx3Q0FBd0MsaUVBQW9CO0FBQzVEO0FBQ0E7QUFDQTtBQUNBLHdDQUF3QyxpRUFBb0I7QUFDNUQ7QUFDQTtBQUNBO0FBQ0Esd0NBQXdDLGlFQUFvQjtBQUM1RDtBQUNBO0FBQ0E7QUFDQSx3Q0FBd0MsaUVBQW9CO0FBQzVEO0FBQ0E7QUFDQTtBQUNBLHdDQUF3QyxpRUFBb0I7QUFDNUQ7QUFDQTtBQUNBO0FBQ0Esd0NBQXdDLGlFQUFvQjtBQUM1RDtBQUNBO0FBQ0E7QUFDQSx3Q0FBd0MsaUVBQW9CO0FBQzVEO0FBQ0E7QUFDQTtBQUNBLHdDQUF3QyxpRUFBb0I7QUFDNUQ7QUFDQTtBQUNBO0FBQ0Esd0NBQXdDLGlFQUFvQjtBQUM1RDtBQUNBO0FBQ0E7QUFDQSx3Q0FBd0MsaUVBQW9CO0FBQzVEO0FBQ0E7QUFDQTtBQUNBLHdDQUF3QyxpRUFBb0I7QUFDNUQ7QUFDQTtBQUNBO0FBQ0Esd0NBQXdDLGlFQUFvQjtBQUM1RDtBQUNBO0FBQ0E7QUFDQSx3Q0FBd0MsaUVBQW9CO0FBQzVEO0FBQ0E7QUFDQTtBQUNBLHdDQUF3QyxpRUFBb0I7QUFDNUQ7QUFDQTtBQUNBO0FBQ0Esd0NBQXdDLGlFQUFvQjtBQUM1RDtBQUNBO0FBQ0E7QUFDQSx3Q0FBd0MsaUVBQW9CO0FBQzVEO0FBQ0E7QUFDQTtBQUNBLHdDQUF3QyxpRUFBb0I7QUFDNUQ7QUFDQTtBQUNBO0FB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O0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwiZmlsZSI6Ii4vY29udGVudHNjcmlwdC5qcyIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiB3ZWJwYWNrVW5pdmVyc2FsTW9kdWxlRGVmaW5pdGlvbihyb290LCBmYWN0b3J5KSB7XG5cdGlmKHR5cGVvZiBleHBvcnRzID09PSAnb2JqZWN0JyAmJiB0eXBlb2YgbW9kdWxlID09PSAnb2JqZWN0Jylcblx0XHRtb2R1bGUuZXhwb3J0cyA9IGZhY3RvcnkoKTtcblx0ZWxzZSBpZih0eXBlb2YgZGVmaW5lID09PSAnZnVuY3Rpb24nICYmIGRlZmluZS5hbWQpXG5cdFx0ZGVmaW5lKFtdLCBmYWN0b3J5KTtcblx0ZWxzZSB7XG5cdFx0dmFyIGEgPSBmYWN0b3J5KCk7XG5cdFx0Zm9yKHZhciBpIGluIGEpICh0eXBlb2YgZXhwb3J0cyA9PT0gJ29iamVjdCcgPyBleHBvcnRzIDogcm9vdClbaV0gPSBhW2ldO1xuXHR9XG59KSh3aW5kb3csIGZ1bmN0aW9uKCkge1xucmV0dXJuICIsIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKSB7XG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG4gXHRcdH1cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGk6IG1vZHVsZUlkLFxuIFx0XHRcdGw6IGZhbHNlLFxuIFx0XHRcdGV4cG9ydHM6IHt9XG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmwgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGdldHRlciB9KTtcbiBcdFx0fVxuIFx0fTtcblxuIFx0Ly8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yID0gZnVuY3Rpb24oZXhwb3J0cykge1xuIFx0XHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcbiBcdFx0fVxuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xuIFx0fTtcblxuIFx0Ly8gY3JlYXRlIGEgZmFrZSBuYW1lc3BhY2Ugb2JqZWN0XG4gXHQvLyBtb2RlICYgMTogdmFsdWUgaXMgYSBtb2R1bGUgaWQsIHJlcXVpcmUgaXRcbiBcdC8vIG1vZGUgJiAyOiBtZXJnZSBhbGwgcHJvcGVydGllcyBvZiB2YWx1ZSBpbnRvIHRoZSBuc1xuIFx0Ly8gbW9kZSAmIDQ6IHJldHVybiB2YWx1ZSB3aGVuIGFscmVhZHkgbnMgb2JqZWN0XG4gXHQvLyBtb2RlICYgOHwxOiBiZWhhdmUgbGlrZSByZXF1aXJlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnQgPSBmdW5jdGlvbih2YWx1ZSwgbW9kZSkge1xuIFx0XHRpZihtb2RlICYgMSkgdmFsdWUgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKHZhbHVlKTtcbiBcdFx0aWYobW9kZSAmIDgpIHJldHVybiB2YWx1ZTtcbiBcdFx0aWYoKG1vZGUgJiA0KSAmJiB0eXBlb2YgdmFsdWUgPT09ICdvYmplY3QnICYmIHZhbHVlICYmIHZhbHVlLl9fZXNNb2R1bGUpIHJldHVybiB2YWx1ZTtcbiBcdFx0dmFyIG5zID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yKG5zKTtcbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KG5zLCAnZGVmYXVsdCcsIHsgZW51bWVyYWJsZTogdHJ1ZSwgdmFsdWU6IHZhbHVlIH0pO1xuIFx0XHRpZihtb2RlICYgMiAmJiB0eXBlb2YgdmFsdWUgIT0gJ3N0cmluZycpIGZvcih2YXIga2V5IGluIHZhbHVlKSBfX3dlYnBhY2tfcmVxdWlyZV9fLmQobnMsIGtleSwgZnVuY3Rpb24oa2V5KSB7IHJldHVybiB2YWx1ZVtrZXldOyB9LmJpbmQobnVsbCwga2V5KSk7XG4gXHRcdHJldHVybiBucztcbiBcdH07XG5cbiBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbiBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbiBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4gXHRcdHJldHVybiBnZXR0ZXI7XG4gXHR9O1xuXG4gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSBcIi4vc3JjL2pzL2NvbnRlbnRzY3JpcHQudHNcIik7XG4iLCIvKlxuICogRGF0ZSBGb3JtYXQgMS4yLjNcbiAqIChjKSAyMDA3LTIwMDkgU3RldmVuIExldml0aGFuIDxzdGV2ZW5sZXZpdGhhbi5jb20+XG4gKiBNSVQgbGljZW5zZVxuICpcbiAqIEluY2x1ZGVzIGVuaGFuY2VtZW50cyBieSBTY290dCBUcmVuZGEgPHNjb3R0LnRyZW5kYS5uZXQ+XG4gKiBhbmQgS3JpcyBLb3dhbCA8Y2l4YXIuY29tL35rcmlzLmtvd2FsLz5cbiAqXG4gKiBBY2NlcHRzIGEgZGF0ZSwgYSBtYXNrLCBvciBhIGRhdGUgYW5kIGEgbWFzay5cbiAqIFJldHVybnMgYSBmb3JtYXR0ZWQgdmVyc2lvbiBvZiB0aGUgZ2l2ZW4gZGF0ZS5cbiAqIFRoZSBkYXRlIGRlZmF1bHRzIHRvIHRoZSBjdXJyZW50IGRhdGUvdGltZS5cbiAqIFRoZSBtYXNrIGRlZmF1bHRzIHRvIGRhdGVGb3JtYXQubWFza3MuZGVmYXVsdC5cbiAqL1xuXG4oZnVuY3Rpb24oZ2xvYmFsKSB7XG4gICd1c2Ugc3RyaWN0JztcblxuICB2YXIgZGF0ZUZvcm1hdCA9IChmdW5jdGlvbigpIHtcbiAgICAgIHZhciB0b2tlbiA9IC9kezEsNH18bXsxLDR9fHl5KD86eXkpP3woW0hoTXNUdF0pXFwxP3xbTGxvU1pXTl18XCJbXlwiXSpcInwnW14nXSonL2c7XG4gICAgICB2YXIgdGltZXpvbmUgPSAvXFxiKD86W1BNQ0VBXVtTRFBdVHwoPzpQYWNpZmljfE1vdW50YWlufENlbnRyYWx8RWFzdGVybnxBdGxhbnRpYykgKD86U3RhbmRhcmR8RGF5bGlnaHR8UHJldmFpbGluZykgVGltZXwoPzpHTVR8VVRDKSg/OlstK11cXGR7NH0pPylcXGIvZztcbiAgICAgIHZhciB0aW1lem9uZUNsaXAgPSAvW14tK1xcZEEtWl0vZztcbiAgXG4gICAgICAvLyBSZWdleGVzIGFuZCBzdXBwb3J0aW5nIGZ1bmN0aW9ucyBhcmUgY2FjaGVkIHRocm91Z2ggY2xvc3VyZVxuICAgICAgcmV0dXJuIGZ1bmN0aW9uIChkYXRlLCBtYXNrLCB1dGMsIGdtdCkge1xuICBcbiAgICAgICAgLy8gWW91IGNhbid0IHByb3ZpZGUgdXRjIGlmIHlvdSBza2lwIG90aGVyIGFyZ3MgKHVzZSB0aGUgJ1VUQzonIG1hc2sgcHJlZml4KVxuICAgICAgICBpZiAoYXJndW1lbnRzLmxlbmd0aCA9PT0gMSAmJiBraW5kT2YoZGF0ZSkgPT09ICdzdHJpbmcnICYmICEvXFxkLy50ZXN0KGRhdGUpKSB7XG4gICAgICAgICAgbWFzayA9IGRhdGU7XG4gICAgICAgICAgZGF0ZSA9IHVuZGVmaW5lZDtcbiAgICAgICAgfVxuICBcbiAgICAgICAgZGF0ZSA9IGRhdGUgfHwgbmV3IERhdGU7XG4gIFxuICAgICAgICBpZighKGRhdGUgaW5zdGFuY2VvZiBEYXRlKSkge1xuICAgICAgICAgIGRhdGUgPSBuZXcgRGF0ZShkYXRlKTtcbiAgICAgICAgfVxuICBcbiAgICAgICAgaWYgKGlzTmFOKGRhdGUpKSB7XG4gICAgICAgICAgdGhyb3cgVHlwZUVycm9yKCdJbnZhbGlkIGRhdGUnKTtcbiAgICAgICAgfVxuICBcbiAgICAgICAgbWFzayA9IFN0cmluZyhkYXRlRm9ybWF0Lm1hc2tzW21hc2tdIHx8IG1hc2sgfHwgZGF0ZUZvcm1hdC5tYXNrc1snZGVmYXVsdCddKTtcbiAgXG4gICAgICAgIC8vIEFsbG93IHNldHRpbmcgdGhlIHV0Yy9nbXQgYXJndW1lbnQgdmlhIHRoZSBtYXNrXG4gICAgICAgIHZhciBtYXNrU2xpY2UgPSBtYXNrLnNsaWNlKDAsIDQpO1xuICAgICAgICBpZiAobWFza1NsaWNlID09PSAnVVRDOicgfHwgbWFza1NsaWNlID09PSAnR01UOicpIHtcbiAgICAgICAgICBtYXNrID0gbWFzay5zbGljZSg0KTtcbiAgICAgICAgICB1dGMgPSB0cnVlO1xuICAgICAgICAgIGlmIChtYXNrU2xpY2UgPT09ICdHTVQ6Jykge1xuICAgICAgICAgICAgZ210ID0gdHJ1ZTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgXG4gICAgICAgIHZhciBfID0gdXRjID8gJ2dldFVUQycgOiAnZ2V0JztcbiAgICAgICAgdmFyIGQgPSBkYXRlW18gKyAnRGF0ZSddKCk7XG4gICAgICAgIHZhciBEID0gZGF0ZVtfICsgJ0RheSddKCk7XG4gICAgICAgIHZhciBtID0gZGF0ZVtfICsgJ01vbnRoJ10oKTtcbiAgICAgICAgdmFyIHkgPSBkYXRlW18gKyAnRnVsbFllYXInXSgpO1xuICAgICAgICB2YXIgSCA9IGRhdGVbXyArICdIb3VycyddKCk7XG4gICAgICAgIHZhciBNID0gZGF0ZVtfICsgJ01pbnV0ZXMnXSgpO1xuICAgICAgICB2YXIgcyA9IGRhdGVbXyArICdTZWNvbmRzJ10oKTtcbiAgICAgICAgdmFyIEwgPSBkYXRlW18gKyAnTWlsbGlzZWNvbmRzJ10oKTtcbiAgICAgICAgdmFyIG8gPSB1dGMgPyAwIDogZGF0ZS5nZXRUaW1lem9uZU9mZnNldCgpO1xuICAgICAgICB2YXIgVyA9IGdldFdlZWsoZGF0ZSk7XG4gICAgICAgIHZhciBOID0gZ2V0RGF5T2ZXZWVrKGRhdGUpO1xuICAgICAgICB2YXIgZmxhZ3MgPSB7XG4gICAgICAgICAgZDogICAgZCxcbiAgICAgICAgICBkZDogICBwYWQoZCksXG4gICAgICAgICAgZGRkOiAgZGF0ZUZvcm1hdC5pMThuLmRheU5hbWVzW0RdLFxuICAgICAgICAgIGRkZGQ6IGRhdGVGb3JtYXQuaTE4bi5kYXlOYW1lc1tEICsgN10sXG4gICAgICAgICAgbTogICAgbSArIDEsXG4gICAgICAgICAgbW06ICAgcGFkKG0gKyAxKSxcbiAgICAgICAgICBtbW06ICBkYXRlRm9ybWF0LmkxOG4ubW9udGhOYW1lc1ttXSxcbiAgICAgICAgICBtbW1tOiBkYXRlRm9ybWF0LmkxOG4ubW9udGhOYW1lc1ttICsgMTJdLFxuICAgICAgICAgIHl5OiAgIFN0cmluZyh5KS5zbGljZSgyKSxcbiAgICAgICAgICB5eXl5OiB5LFxuICAgICAgICAgIGg6ICAgIEggJSAxMiB8fCAxMixcbiAgICAgICAgICBoaDogICBwYWQoSCAlIDEyIHx8IDEyKSxcbiAgICAgICAgICBIOiAgICBILFxuICAgICAgICAgIEhIOiAgIHBhZChIKSxcbiAgICAgICAgICBNOiAgICBNLFxuICAgICAgICAgIE1NOiAgIHBhZChNKSxcbiAgICAgICAgICBzOiAgICBzLFxuICAgICAgICAgIHNzOiAgIHBhZChzKSxcbiAgICAgICAgICBsOiAgICBwYWQoTCwgMyksXG4gICAgICAgICAgTDogICAgcGFkKE1hdGgucm91bmQoTCAvIDEwKSksXG4gICAgICAgICAgdDogICAgSCA8IDEyID8gZGF0ZUZvcm1hdC5pMThuLnRpbWVOYW1lc1swXSA6IGRhdGVGb3JtYXQuaTE4bi50aW1lTmFtZXNbMV0sXG4gICAgICAgICAgdHQ6ICAgSCA8IDEyID8gZGF0ZUZvcm1hdC5pMThuLnRpbWVOYW1lc1syXSA6IGRhdGVGb3JtYXQuaTE4bi50aW1lTmFtZXNbM10sXG4gICAgICAgICAgVDogICAgSCA8IDEyID8gZGF0ZUZvcm1hdC5pMThuLnRpbWVOYW1lc1s0XSA6IGRhdGVGb3JtYXQuaTE4bi50aW1lTmFtZXNbNV0sXG4gICAgICAgICAgVFQ6ICAgSCA8IDEyID8gZGF0ZUZvcm1hdC5pMThuLnRpbWVOYW1lc1s2XSA6IGRhdGVGb3JtYXQuaTE4bi50aW1lTmFtZXNbN10sXG4gICAgICAgICAgWjogICAgZ210ID8gJ0dNVCcgOiB1dGMgPyAnVVRDJyA6IChTdHJpbmcoZGF0ZSkubWF0Y2godGltZXpvbmUpIHx8IFsnJ10pLnBvcCgpLnJlcGxhY2UodGltZXpvbmVDbGlwLCAnJyksXG4gICAgICAgICAgbzogICAgKG8gPiAwID8gJy0nIDogJysnKSArIHBhZChNYXRoLmZsb29yKE1hdGguYWJzKG8pIC8gNjApICogMTAwICsgTWF0aC5hYnMobykgJSA2MCwgNCksXG4gICAgICAgICAgUzogICAgWyd0aCcsICdzdCcsICduZCcsICdyZCddW2QgJSAxMCA+IDMgPyAwIDogKGQgJSAxMDAgLSBkICUgMTAgIT0gMTApICogZCAlIDEwXSxcbiAgICAgICAgICBXOiAgICBXLFxuICAgICAgICAgIE46ICAgIE5cbiAgICAgICAgfTtcbiAgXG4gICAgICAgIHJldHVybiBtYXNrLnJlcGxhY2UodG9rZW4sIGZ1bmN0aW9uIChtYXRjaCkge1xuICAgICAgICAgIGlmIChtYXRjaCBpbiBmbGFncykge1xuICAgICAgICAgICAgcmV0dXJuIGZsYWdzW21hdGNoXTtcbiAgICAgICAgICB9XG4gICAgICAgICAgcmV0dXJuIG1hdGNoLnNsaWNlKDEsIG1hdGNoLmxlbmd0aCAtIDEpO1xuICAgICAgICB9KTtcbiAgICAgIH07XG4gICAgfSkoKTtcblxuICBkYXRlRm9ybWF0Lm1hc2tzID0ge1xuICAgICdkZWZhdWx0JzogICAgICAgICAgICAgICAnZGRkIG1tbSBkZCB5eXl5IEhIOk1NOnNzJyxcbiAgICAnc2hvcnREYXRlJzogICAgICAgICAgICAgJ20vZC95eScsXG4gICAgJ21lZGl1bURhdGUnOiAgICAgICAgICAgICdtbW0gZCwgeXl5eScsXG4gICAgJ2xvbmdEYXRlJzogICAgICAgICAgICAgICdtbW1tIGQsIHl5eXknLFxuICAgICdmdWxsRGF0ZSc6ICAgICAgICAgICAgICAnZGRkZCwgbW1tbSBkLCB5eXl5JyxcbiAgICAnc2hvcnRUaW1lJzogICAgICAgICAgICAgJ2g6TU0gVFQnLFxuICAgICdtZWRpdW1UaW1lJzogICAgICAgICAgICAnaDpNTTpzcyBUVCcsXG4gICAgJ2xvbmdUaW1lJzogICAgICAgICAgICAgICdoOk1NOnNzIFRUIFonLFxuICAgICdpc29EYXRlJzogICAgICAgICAgICAgICAneXl5eS1tbS1kZCcsXG4gICAgJ2lzb1RpbWUnOiAgICAgICAgICAgICAgICdISDpNTTpzcycsXG4gICAgJ2lzb0RhdGVUaW1lJzogICAgICAgICAgICd5eXl5LW1tLWRkXFwnVFxcJ0hIOk1NOnNzbycsXG4gICAgJ2lzb1V0Y0RhdGVUaW1lJzogICAgICAgICdVVEM6eXl5eS1tbS1kZFxcJ1RcXCdISDpNTTpzc1xcJ1pcXCcnLFxuICAgICdleHBpcmVzSGVhZGVyRm9ybWF0JzogICAnZGRkLCBkZCBtbW0geXl5eSBISDpNTTpzcyBaJ1xuICB9O1xuXG4gIC8vIEludGVybmF0aW9uYWxpemF0aW9uIHN0cmluZ3NcbiAgZGF0ZUZvcm1hdC5pMThuID0ge1xuICAgIGRheU5hbWVzOiBbXG4gICAgICAnU3VuJywgJ01vbicsICdUdWUnLCAnV2VkJywgJ1RodScsICdGcmknLCAnU2F0JyxcbiAgICAgICdTdW5kYXknLCAnTW9uZGF5JywgJ1R1ZXNkYXknLCAnV2VkbmVzZGF5JywgJ1RodXJzZGF5JywgJ0ZyaWRheScsICdTYXR1cmRheSdcbiAgICBdLFxuICAgIG1vbnRoTmFtZXM6IFtcbiAgICAgICdKYW4nLCAnRmViJywgJ01hcicsICdBcHInLCAnTWF5JywgJ0p1bicsICdKdWwnLCAnQXVnJywgJ1NlcCcsICdPY3QnLCAnTm92JywgJ0RlYycsXG4gICAgICAnSmFudWFyeScsICdGZWJydWFyeScsICdNYXJjaCcsICdBcHJpbCcsICdNYXknLCAnSnVuZScsICdKdWx5JywgJ0F1Z3VzdCcsICdTZXB0ZW1iZXInLCAnT2N0b2JlcicsICdOb3ZlbWJlcicsICdEZWNlbWJlcidcbiAgICBdLFxuICAgIHRpbWVOYW1lczogW1xuICAgICAgJ2EnLCAncCcsICdhbScsICdwbScsICdBJywgJ1AnLCAnQU0nLCAnUE0nXG4gICAgXVxuICB9O1xuXG5mdW5jdGlvbiBwYWQodmFsLCBsZW4pIHtcbiAgdmFsID0gU3RyaW5nKHZhbCk7XG4gIGxlbiA9IGxlbiB8fCAyO1xuICB3aGlsZSAodmFsLmxlbmd0aCA8IGxlbikge1xuICAgIHZhbCA9ICcwJyArIHZhbDtcbiAgfVxuICByZXR1cm4gdmFsO1xufVxuXG4vKipcbiAqIEdldCB0aGUgSVNPIDg2MDEgd2VlayBudW1iZXJcbiAqIEJhc2VkIG9uIGNvbW1lbnRzIGZyb21cbiAqIGh0dHA6Ly90ZWNoYmxvZy5wcm9jdXJpb3Mubmwvay9uNjE4L25ld3Mvdmlldy8zMzc5Ni8xNDg2My9DYWxjdWxhdGUtSVNPLTg2MDEtd2Vlay1hbmQteWVhci1pbi1qYXZhc2NyaXB0Lmh0bWxcbiAqXG4gKiBAcGFyYW0gIHtPYmplY3R9IGBkYXRlYFxuICogQHJldHVybiB7TnVtYmVyfVxuICovXG5mdW5jdGlvbiBnZXRXZWVrKGRhdGUpIHtcbiAgLy8gUmVtb3ZlIHRpbWUgY29tcG9uZW50cyBvZiBkYXRlXG4gIHZhciB0YXJnZXRUaHVyc2RheSA9IG5ldyBEYXRlKGRhdGUuZ2V0RnVsbFllYXIoKSwgZGF0ZS5nZXRNb250aCgpLCBkYXRlLmdldERhdGUoKSk7XG5cbiAgLy8gQ2hhbmdlIGRhdGUgdG8gVGh1cnNkYXkgc2FtZSB3ZWVrXG4gIHRhcmdldFRodXJzZGF5LnNldERhdGUodGFyZ2V0VGh1cnNkYXkuZ2V0RGF0ZSgpIC0gKCh0YXJnZXRUaHVyc2RheS5nZXREYXkoKSArIDYpICUgNykgKyAzKTtcblxuICAvLyBUYWtlIEphbnVhcnkgNHRoIGFzIGl0IGlzIGFsd2F5cyBpbiB3ZWVrIDEgKHNlZSBJU08gODYwMSlcbiAgdmFyIGZpcnN0VGh1cnNkYXkgPSBuZXcgRGF0ZSh0YXJnZXRUaHVyc2RheS5nZXRGdWxsWWVhcigpLCAwLCA0KTtcblxuICAvLyBDaGFuZ2UgZGF0ZSB0byBUaHVyc2RheSBzYW1lIHdlZWtcbiAgZmlyc3RUaHVyc2RheS5zZXREYXRlKGZpcnN0VGh1cnNkYXkuZ2V0RGF0ZSgpIC0gKChmaXJzdFRodXJzZGF5LmdldERheSgpICsgNikgJSA3KSArIDMpO1xuXG4gIC8vIENoZWNrIGlmIGRheWxpZ2h0LXNhdmluZy10aW1lLXN3aXRjaCBvY2N1cnJlZCBhbmQgY29ycmVjdCBmb3IgaXRcbiAgdmFyIGRzID0gdGFyZ2V0VGh1cnNkYXkuZ2V0VGltZXpvbmVPZmZzZXQoKSAtIGZpcnN0VGh1cnNkYXkuZ2V0VGltZXpvbmVPZmZzZXQoKTtcbiAgdGFyZ2V0VGh1cnNkYXkuc2V0SG91cnModGFyZ2V0VGh1cnNkYXkuZ2V0SG91cnMoKSAtIGRzKTtcblxuICAvLyBOdW1iZXIgb2Ygd2Vla3MgYmV0d2VlbiB0YXJnZXQgVGh1cnNkYXkgYW5kIGZpcnN0IFRodXJzZGF5XG4gIHZhciB3ZWVrRGlmZiA9ICh0YXJnZXRUaHVyc2RheSAtIGZpcnN0VGh1cnNkYXkpIC8gKDg2NDAwMDAwKjcpO1xuICByZXR1cm4gMSArIE1hdGguZmxvb3Iod2Vla0RpZmYpO1xufVxuXG4vKipcbiAqIEdldCBJU08tODYwMSBudW1lcmljIHJlcHJlc2VudGF0aW9uIG9mIHRoZSBkYXkgb2YgdGhlIHdlZWtcbiAqIDEgKGZvciBNb25kYXkpIHRocm91Z2ggNyAoZm9yIFN1bmRheSlcbiAqIFxuICogQHBhcmFtICB7T2JqZWN0fSBgZGF0ZWBcbiAqIEByZXR1cm4ge051bWJlcn1cbiAqL1xuZnVuY3Rpb24gZ2V0RGF5T2ZXZWVrKGRhdGUpIHtcbiAgdmFyIGRvdyA9IGRhdGUuZ2V0RGF5KCk7XG4gIGlmKGRvdyA9PT0gMCkge1xuICAgIGRvdyA9IDc7XG4gIH1cbiAgcmV0dXJuIGRvdztcbn1cblxuLyoqXG4gKiBraW5kLW9mIHNob3J0Y3V0XG4gKiBAcGFyYW0gIHsqfSB2YWxcbiAqIEByZXR1cm4ge1N0cmluZ31cbiAqL1xuZnVuY3Rpb24ga2luZE9mKHZhbCkge1xuICBpZiAodmFsID09PSBudWxsKSB7XG4gICAgcmV0dXJuICdudWxsJztcbiAgfVxuXG4gIGlmICh2YWwgPT09IHVuZGVmaW5lZCkge1xuICAgIHJldHVybiAndW5kZWZpbmVkJztcbiAgfVxuXG4gIGlmICh0eXBlb2YgdmFsICE9PSAnb2JqZWN0Jykge1xuICAgIHJldHVybiB0eXBlb2YgdmFsO1xuICB9XG5cbiAgaWYgKEFycmF5LmlzQXJyYXkodmFsKSkge1xuICAgIHJldHVybiAnYXJyYXknO1xuICB9XG5cbiAgcmV0dXJuIHt9LnRvU3RyaW5nLmNhbGwodmFsKVxuICAgIC5zbGljZSg4LCAtMSkudG9Mb3dlckNhc2UoKTtcbn07XG5cblxuXG4gIGlmICh0eXBlb2YgZGVmaW5lID09PSAnZnVuY3Rpb24nICYmIGRlZmluZS5hbWQpIHtcbiAgICBkZWZpbmUoZnVuY3Rpb24gKCkge1xuICAgICAgcmV0dXJuIGRhdGVGb3JtYXQ7XG4gICAgfSk7XG4gIH0gZWxzZSBpZiAodHlwZW9mIGV4cG9ydHMgPT09ICdvYmplY3QnKSB7XG4gICAgbW9kdWxlLmV4cG9ydHMgPSBkYXRlRm9ybWF0O1xuICB9IGVsc2Uge1xuICAgIGdsb2JhbC5kYXRlRm9ybWF0ID0gZGF0ZUZvcm1hdDtcbiAgfVxufSkodGhpcyk7XG4iLCJcInVzZSBzdHJpY3RcIjtcbmltcG9ydCBVdGlscyBmcm9tIFwiLi9VdGlsc1wiO1xuaW1wb3J0IFBpbmdSZXN1bHQgZnJvbSBcIi4vZW50aXRpZXMvUGluZ1Jlc3VsdFwiO1xuaW1wb3J0IENtcFR5cGUgZnJvbSBcIi4vY21wL0NtcFR5cGVcIjtcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEJhY2tlbmRDYWxsIHtcbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgICAgdGhpcy5fY21wID0gXCJuYVwiO1xuICAgICAgICB0aGlzLl9jbXBTY3JpcHRVcmwgPSBcIm5hXCI7XG4gICAgICAgIHRoaXMuX3BpbmdSZXN1bHQgPSB7fTtcbiAgICAgICAgdGhpcy5faW1wbGVtZW50ZWQgPSBmYWxzZTtcbiAgICAgICAgLy8gdGhpcyBpcyBmb3IgdGhlIHN0YXRlcy5cbiAgICAgICAgdGhpcy5faXNTdWNjZXNzZnVsQmxvY2sgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5faXNQaW5nUmVzdWx0UmVjZWl2ZWQgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5fZGF0YVJlY2VpdmVkID0gZmFsc2U7XG4gICAgfVxuICAgIHN0YXRpYyBnZXQgcGFnZU5hbWUoKSB7XG4gICAgICAgIHJldHVybiBCYWNrZW5kQ2FsbC5fZnJvbVBhZ2U7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIFNldHRlciBmb3IgdGhlIFBpbmcgUmVzdWx0LCBpZiB3ZSBmaW5kIGEgQ01QIG9uIHRoZSBQYWdlXG4gICAgICpcbiAgICAgKiBAcGFyYW0gcGluZ1Jlc3VsdFxuICAgICAqL1xuICAgIHNldCBwaW5nUmVzdWx0KHBpbmdSZXN1bHQpIHtcbiAgICAgICAgVXRpbHMubG9nKFwiUGluZ2JhY2sgaW4gQmFja2VuZENhbGwgc2V0OiBcIiArIHBpbmdSZXN1bHQpO1xuICAgICAgICB0aGlzLl9waW5nUmVzdWx0ID0gUGluZ1Jlc3VsdC5jbGFzcyhwaW5nUmVzdWx0KTtcbiAgICAgICAgdGhpcy5faXNQaW5nUmVzdWx0UmVjZWl2ZWQgPSB0cnVlO1xuICAgICAgICAvLyBpZiB0aGUgQ01QIHdhcyBhbHJlYWR5IGNsaWNrZWQsIGRvIHRoZSBiYWNrZW5kIGNhbGxcbiAgICAgICAgLy8gd2Ugb25seSBkbyB0aGlzIGNhbGwsIGlmIHRoZSBDTVAgaXMgX05PVF8gaW1wbGVtZW50ZWQuIElmIHdlIHRoZSBDTVAgaXMgaW1wbGVtZW50ZWQsIHdlIHdhaXQgZm9yIGFyZXNwb25zZVxuICAgICAgICAvLyBmcm9tIHRoZSBKYXZhU2NyaXB0IERldGVjdG9yLlxuICAgICAgICBpZiAodGhpcy5fZGF0YVJlY2VpdmVkKSB7XG4gICAgICAgICAgICBpZiAodGhpcy5faW1wbGVtZW50ZWQgJiYgdGhpcy5faXNTdWNjZXNzZnVsQmxvY2spIHtcbiAgICAgICAgICAgICAgICBVdGlscy5sb2coXCJXZSBoYXZlIGFuIGltcGxlbWVudGVkIGZvciBDTVAgYW5kIHN1Y2Nlc2Z1bCBCbG9jayBoYXBwZW5kLiBTZW50IEJhY2tlbmQgY2FsbFwiKTtcbiAgICAgICAgICAgICAgICAvLyBjaGVjayBpZiB0aGVyZSBpcyBhIHRpbWVvdXQgYW5kIGNhbmNlbCBpZiBuZWNlc3NhcnkuXG4gICAgICAgICAgICAgICAgY2xlYXJUaW1lb3V0KHRoaXMuX3RpbWVvdXRGb3JCYWNrZW5kQ2FsbCk7XG4gICAgICAgICAgICAgICAgLy8gdHJpZ2dlciB0aGUgY2FsbCByaWdodCBub3cuXG4gICAgICAgICAgICAgICAgdGhpcy50cmlnZ2VyQ2FsbCgpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSBpZiAodGhpcy5faW1wbGVtZW50ZWQgJiYgIXRoaXMuX2lzU3VjY2Vzc2Z1bEJsb2NrKSB7XG4gICAgICAgICAgICAgICAgVXRpbHMubG9nKFwiV2UgaGF2ZSBhbiBpbXBsZW1lbnRhdGlvbiwgYnV0IG5vdCB5ZXQgYSBzdWNjZXNzZnVsIGJsb2NrLiBXZSBkb24ndCBkbyBhbnl0aGluZy4gc3VjY2Vzc2Z1bEJsb2MoKSB3aWxsIGhhbmRsZVwiKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2UgaWYgKCF0aGlzLl9pbXBsZW1lbnRlZCAmJiB0aGlzLl9pc1N1Y2Nlc3NmdWxCbG9jaykge1xuICAgICAgICAgICAgICAgIFV0aWxzLmxvZyhcIlRoaXMgQ01QIGlzIG5vdCB5ZXQgaW1wbGVtZW50ZWQgKG9yIG5vdCB5ZXQgc2V0KVwiKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIFV0aWxzLmxvZyhcIlRoZXJlIGlzIG5vIGltcGxlbWVudGF0aW9uIGFuZCBubyBzdWNjZXNzZnVsIEJvY2tcIik7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICBVdGlscy5sb2coXCJXZSBkb24ndCBoYXZlIGEgQ01QIEltcGxlbWVudGF0aW9uIHlldCwgYnV0IGFscmVhZHkgUGluZ0JhY2sgRGF0YS4gRm9yIFNhZnRleSBSZWFzb25zLCB3ZSBzY2hlZHVsZSBiYWNrZW5kY2FsbFwiKTtcbiAgICAgICAgICAgIHRoaXMuX3RpbWVvdXRGb3JCYWNrZW5kQ2FsbCA9IHNldFRpbWVvdXQodGhpcy50cmlnZ2VyQ2FsbC5iaW5kKHRoaXMpLCA1MDAwKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBjbXBEYXRhKGNtcElkLCBjbXAsIGNtcFNjcmlwdFVybCwgdHlwZSwgaW1wbGVtZW50ZWQpIHtcbiAgICAgICAgVXRpbHMubG9nKFwiRGF0YSBzZXQgYnkgQ01QXCIpO1xuICAgICAgICB0aGlzLl9jbXBJZCA9IGNtcElkO1xuICAgICAgICB0aGlzLl9jbXAgPSBjbXA7XG4gICAgICAgIHRoaXMuX2NtcFNjcmlwdFVybCA9IGNtcFNjcmlwdFVybDtcbiAgICAgICAgdGhpcy5fdHlwZSA9IHR5cGU7XG4gICAgICAgIHRoaXMuX2ltcGxlbWVudGVkID0gaW1wbGVtZW50ZWQ7XG4gICAgICAgIHRoaXMuX2RhdGFSZWNlaXZlZCA9IHRydWU7XG4gICAgfVxuICAgIHN1Y2Nlc3NmdWxCbG9jaygpIHtcbiAgICAgICAgVXRpbHMubG9nKFwic3VjY2VmdWxibG9jayBpbiBCYWNrZW5kQ2FsbFwiKTtcbiAgICAgICAgdGhpcy5faXNTdWNjZXNzZnVsQmxvY2sgPSB0cnVlO1xuICAgICAgICBpZiAodGhpcy5faXNQaW5nUmVzdWx0UmVjZWl2ZWQpIHtcbiAgICAgICAgICAgIFV0aWxzLmxvZyhcIlBpbmcgaXMgaGVyZSwgc3VjY2Vzc2Z1bCBib2NrIHRvby4gVHJpZ2dlciBCYWNrZW5kQ2FsbFwiKTtcbiAgICAgICAgICAgIC8vIGNoZWNrIGlmIHRoZXJlIGlzIGEgdGltZW91dCBhbmQgY2FuY2VsIGlmIG5lY2Vzc2FyeS5cbiAgICAgICAgICAgIGNsZWFyVGltZW91dCh0aGlzLl90aW1lb3V0Rm9yQmFja2VuZENhbGwpO1xuICAgICAgICAgICAgLy8gd2UgaGF2ZSBldmVyeXRoaW5nLCB0cmlnZ2VyIGJhY2tlbmQgY2FsbFxuICAgICAgICAgICAgdGhpcy50cmlnZ2VyQ2FsbCgpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgLy8gU2VuZGluZyB0byBCYWNrZ3JvdW5kIFNjcmlwdFxuICAgICAgICAgICAgc3dpdGNoICh0aGlzLl90eXBlKSB7XG4gICAgICAgICAgICAgICAgY2FzZSBDbXBUeXBlLldBSVRfRk9SX0FTWU5DX0NBTExCQUNLOlxuICAgICAgICAgICAgICAgICAgICAvLyBpZiB3ZSB3YWl0IGZvciB0aGUgY2FsbGJhY2ssIHRoZSBiYWNrZW5kIGNhbGwgaXMgZG9uZSBpbiB0aGUgJ3NldFBpbmdSZXN1bHQnO1xuICAgICAgICAgICAgICAgICAgICAvLyB3ZSBhbHJlYWR5IGhhdmUgY2xpY2sgYXdheSB0aGUgQ01QIHNvLCB3YWl0IGZvciB0aGUgcGluZ3Jlc3VsdCBhbmQgZ28uXG4gICAgICAgICAgICAgICAgICAgIFV0aWxzLmxvZyhcIldlIGFyZSB3YWl0aW5nIGZvciB0aGUgV2Vic2l0ZSB0byBzZW5kIHRoZSBQaW5nUmVzdWx0XCIpO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlIENtcFR5cGUuV0FJVF9GT1JfVElNRV9GUkFNRTpcbiAgICAgICAgICAgICAgICAgICAgVXRpbHMubG9nKFwiV2UgYXJlIHdhaXRpbmcgZml2ZSBzZWNvbmRzIHRvIHRyaWdnZXIgdGhlIGJhY2tlbmQgY2FsbFwiKTtcbiAgICAgICAgICAgICAgICAgICAgY2xlYXJUaW1lb3V0KHRoaXMuX3RpbWVvdXRGb3JCYWNrZW5kQ2FsbCk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX3RpbWVvdXRGb3JCYWNrZW5kQ2FsbCA9IHNldFRpbWVvdXQodGhpcy50cmlnZ2VyQ2FsbC5iaW5kKHRoaXMpLCA1MDAwKTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSBDbXBUeXBlLkRPX05PVF9XQUlUOlxuICAgICAgICAgICAgICAgICAgICBVdGlscy5sb2coXCJXZSBUcmlnZ2VyIHRoZSBCYWNrZW5kIENhbGwgcmlnaHQgbm93XCIpO1xuICAgICAgICAgICAgICAgICAgICBjbGVhclRpbWVvdXQodGhpcy5fdGltZW91dEZvckJhY2tlbmRDYWxsKTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy50cmlnZ2VyQ2FsbCgpO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJVbmtub3duIENNUCBUeXBlXCIpO1xuICAgICAgICAgICAgfSAvLyBzd2l0Y2hcbiAgICAgICAgfVxuICAgIH1cbiAgICAvKipcbiAgICAgKiBBY3R1YWwgTWV0aG9kIHRvIHRyaWdnZXIgdGhlIGJhY2tlbmQgY2FsbC4gQ2FuIGJlIHRyaWdnZXJlZCBmcm9tIHZhcmlvdXMgZnVuY3Rpb25zXG4gICAgICovXG4gICAgdHJpZ2dlckNhbGwoKSB7XG4gICAgICAgIFV0aWxzLmxvZyhcIkNhbGwgbm93IFRyaWdnZXJlZFwiKTtcbiAgICAgICAgLy8gSWYgdGhlIENNUC1JRCBpcyBub3Qgc2V0IGluIHRoZSBQaW5nIFJlc3VsdCwgcHV0IGl0IHRoZXJlLlxuICAgICAgICBpZiAodHlwZW9mIHRoaXMuX3BpbmdSZXN1bHQuY21wSWQgPT09IFwidW5kZWZpbmVkXCIpIHtcbiAgICAgICAgICAgIHRoaXMuX3BpbmdSZXN1bHQuY21wSWQgPSB0aGlzLl9jbXBJZDtcbiAgICAgICAgfVxuICAgICAgICAvLyB3ZSBhcmUgc2VuZGluZyBzZXBhcmF0ZSBjb21wb25lbnRzIGluICdzZW5kTWVzc2FnZSgpJyBhcyBpbiB0aGUgQmFja2VuZENhbGwsIHdlIGRvbid0IGtub3cgdGhlIFVSTC5cbiAgICAgICAgLy8gdGhpcyBjbGFzcyBpcyBwYXJ0IG9mIHRoZSBjb250ZW50LVNjcmlwdCBhbmQgaGFzIG5vIGFjY2VzcyB0byB0aGUgVVJMLlxuICAgICAgICBpZiAodHlwZW9mIHNhZmFyaSAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgICAgIFV0aWxzLmxvZyhcIisrKyB0cmlnZ2VyQ2FsbCBvbiBTYWZhcmkgKysrXCIpO1xuICAgICAgICAgICAgZXZhbChcInNhZmFyaS5leHRlbnNpb24uZGlzcGF0Y2hNZXNzYWdlKCdzb21lTWVzc2FnZScsIHtjbXA6IHRoaXMuX2NtcCxcIiArXG4gICAgICAgICAgICAgICAgXCJjbXBTY3JpcFVybDogdGhpcy5fY21wU2NyaXB0VXJsLFwiICtcbiAgICAgICAgICAgICAgICBcInBpbmdSZXN1bHQ6IHRoaXMuX3BpbmdSZXN1bHQsXCIgK1xuICAgICAgICAgICAgICAgIFwiaW1wbGVtZW50ZWQ6IHRoaXMuX2ltcGxlbWVudGVkLFwiICtcbiAgICAgICAgICAgICAgICBcImZyb206IEJhY2tlbmRDYWxsLnBhZ2VOYW1lfSlcIik7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAodHlwZW9mIGNocm9tZSAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgICAgIFV0aWxzLmxvZyhcIisrKyB0cmlnZ2VyQ2FsbCBvbiBDaHJvbWUgKysrXCIpO1xuICAgICAgICAgICAgY2hyb21lLnJ1bnRpbWUuc2VuZE1lc3NhZ2Uoe1xuICAgICAgICAgICAgICAgIGNtcDogdGhpcy5fY21wLFxuICAgICAgICAgICAgICAgIGNtcFNjcmlwVXJsOiB0aGlzLl9jbXBTY3JpcHRVcmwsXG4gICAgICAgICAgICAgICAgcGluZ1Jlc3VsdDogdGhpcy5fcGluZ1Jlc3VsdCxcbiAgICAgICAgICAgICAgICBpbXBsZW1lbnRlZDogdGhpcy5faW1wbGVtZW50ZWQsXG4gICAgICAgICAgICAgICAgZnJvbTogQmFja2VuZENhbGwucGFnZU5hbWVcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgVXRpbHMubG9nKFwiKysrIHRyaWdnZXJDYWxsIG9uIHNvbWUgb3RoZXIgUGxhdGZvcm0gKysrXCIpO1xuICAgICAgICB9XG4gICAgfVxufVxuQmFja2VuZENhbGwuX2Zyb21QYWdlID0gXCJiYWNrZW5kQ2FsbFwiO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5pbXBvcnQgVXRpbHMgZnJvbSBcIi4vVXRpbHNcIjtcbmltcG9ydCBUcnVzdEFyY0lGcmFtZSBmcm9tIFwiLi9jbXAvVHJ1c3RBcmNJRnJhbWVcIjtcbmltcG9ydCBUcnVzdEFyY0Jhbm5lciBmcm9tIFwiLi9jbXAvVHJ1c3RBcmNCYW5uZXJcIjtcbmltcG9ydCBFdmlkb24gZnJvbSBcIi4vY21wL0V2aWRvblwiO1xuaW1wb3J0IEN1c3RvbUltcGwgZnJvbSBcIi4vY21wL0N1c3RvbUltcGxcIjtcbmltcG9ydCBPbmVUcnVzdCBmcm9tIFwiLi9jbXAvT25lVHJ1c3RcIjtcbmltcG9ydCBDb29raWVCb3QgZnJvbSBcIi4vY21wL0Nvb2tpZUJvdFwiO1xuaW1wb3J0IFVzZXJDZW50cmljcyBmcm9tIFwiLi9jbXAvVXNlckNlbnRyaWNzXCI7XG5pbXBvcnQgUXVhbnRDYXN0IGZyb20gXCIuL2NtcC9RdWFudENhc3RcIjtcbmltcG9ydCBUcmFmZmVjdGl2ZSBmcm9tIFwiLi9jbXAvVHJhZmZlY3RpdmVcIjtcbmltcG9ydCBDb25zZW50TWFuYWdlciBmcm9tIFwiLi9jbXAvQ29uc2VudE1hbmFnZXJcIjtcbmltcG9ydCBOb3RZZXRJbXBsZW1lbnRlZENtcCBmcm9tIFwiLi9jbXAvTm9ZZXRJbXBsZW1lbnRlZENtcFwiO1xuaW1wb3J0IEJhY2tlbmRDYWxsIGZyb20gXCIuL0JhY2tlbmRDYWxsXCI7XG5pbXBvcnQgQ2hhbmRhZ28gZnJvbSBcIi4vY21wL0NoYW5kYWdvXCI7XG5pbXBvcnQgT2F0aENtcCBmcm9tIFwiLi9jbXAvT2F0aENtcFwiO1xuaW1wb3J0IFNvdXJjZVBvaW50IGZyb20gXCIuL2NtcC9Tb3VyY2VQb2ludFwiO1xuaW1wb3J0IERpRG9NaSBmcm9tIFwiLi9jbXAvRGlEb01pXCI7XG5pbXBvcnQgQm9ybGFicyBmcm9tIFwiLi9jbXAvQm9ybGFic1wiO1xuLy8gdGhpcyBpcyBzb21lIHN0YXRpYyBzdHVmZiBmb3IgdGhlIGxvbmcgdGFpbC5cbmNvbnN0IGJ1dHRvbnMgPSB7XG4gICAgJ2EjaHMtZXUtZGVjbGluZS1idXR0b24nOiBcIm5wbWpzLmNvbVwiLFxuICAgIFwiYSNjb29raWVfYWN0aW9uX2Nsb3NlX2hlYWRlclwiOiBcInRlYWxpdW0uY29tXCIsXG4gICAgXCJidXR0b24jZ2Rwci1iYW5uZXItYWNjZXB0XCI6IFwiZWJheS5jb20gJiBlYmF5LWtsZWluYW56ZWlnZW4uY29tXCIsXG4gICAgXCJidXR0b24jYWNjZXB0QWxsQnV0dG9uXCI6IFwiUGF5UGFsXCIsXG4gICAgXCJzcGFuI2NtcHdlbGNvbWVidG5ub1wiOiBcIldvcmRwcmVzcyBQbHVnaW4gaHR0cHM6Ly93d3cudGVrdHV0b3JpYWxzaHViLmNvbS9cIixcbiAgICBcImEuY21wYm94YnRubm9cIjogXCJXb3JkcHJlc3MgUGx1Z2luIHd3dy5teWtvbmcuY29tXCIsXG4gICAgXCJwLl9icmxicy1yZWZ1c2UtYnRuXCI6IFwiV29yZHByZXNzIFBsdWdpbiBodHRwczovL3d3dy5zdGF1YnNhdWdlci1iZXJhdGVyLmRlLyAoQm9ybGFicylcIlxufTtcbmNvbnN0IGNvbmZpZyA9IHsgYXR0cmlidXRlczogdHJ1ZSwgY2hpbGRMaXN0OiB0cnVlLCBzdWJ0cmVlOiB0cnVlIH07XG5leHBvcnQgZGVmYXVsdCBjbGFzcyBEZXRlY3RvciB7XG4gICAgY29uc3RydWN0b3IoZG9jdW1lbnQsIGluSWZyYW1lKSB7XG4gICAgICAgIHRoaXMuX2RvY3VtZW50ID0gZG9jdW1lbnQ7XG4gICAgICAgIHRoaXMuX2JhY2tlbmRDYWxsID0gbmV3IEJhY2tlbmRDYWxsKCk7XG4gICAgICAgIHRoaXMuX2luSUZyYW1lID0gaW5JZnJhbWU7XG4gICAgfVxuICAgIHNldCBwaW5nUmVzdWx0KHBpbmdSZXN1bHQpIHtcbiAgICAgICAgdGhpcy5fYmFja2VuZENhbGwucGluZ1Jlc3VsdCA9IHBpbmdSZXN1bHQ7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIENvbm5lY3Rpb24gdG8gdGhlIE9ic2VydmVyIGlzIG91dHNvdXJjZWQgb3V0IG9mIHRoZSBDb25zdHJ1Y3RvciBpbiBvcmRlciB0byBoYXZlIHRoZSBPYmplY3QgaW5pdGlhbGl6ZWQgZmlyc3QuXG4gICAgICogT25seSBhZnRlciB0aGF0IHRoZSBvYnNlcnZlciBjYW4gYmUgcmVnaXN0ZXJlZCBpbiBhIHNhdmUgd2F5LlxuICAgICAqL1xuICAgIGNvbm5lY3RPYnNlcnZlcigpIHtcbiAgICAgICAgLy8gT3B0aW9ucyBmb3IgdGhlIG9ic2VydmVyICh3aGljaCBtdXRhdGlvbnMgdG8gb2JzZXJ2ZSlcbiAgICAgICAgbGV0IHNlbGYgPSB0aGlzO1xuICAgICAgICB0aGlzLl9vYnNlcnZlckZvclNjcmlwdFNvdXJjZSA9IG5ldyBNdXRhdGlvbk9ic2VydmVyKGZ1bmN0aW9uIChtdXRhdGlvbnMpIHtcbiAgICAgICAgICAgIHNlbGYuaGFuZGxlQ01QKG11dGF0aW9ucyk7XG4gICAgICAgIH0pO1xuICAgICAgICAvLyBTZWxlY3QgdGhlIG5vZGUgdGhhdCB3aWxsIGJlIG9ic2VydmVkIGZvciBtdXRhdGlvbnNcbiAgICAgICAgdGhpcy5fb2JzZXJ2ZXJGb3JTY3JpcHRTb3VyY2Uub2JzZXJ2ZSh0aGlzLl9kb2N1bWVudC5nZXRSb290Tm9kZSgpLCBjb25maWcpO1xuICAgIH1cbiAgICBkaXNjb25uZWN0T2JzZXJ2ZXIoKSB7XG4gICAgICAgIHRoaXMuX29ic2VydmVyRm9yU2NyaXB0U291cmNlLmRpc2Nvbm5lY3QoKTtcbiAgICB9XG4gICAgaGFuZGxlQ01QKG11dGF0aW9ucykge1xuICAgICAgICBsZXQgYWxsU2NyaXB0VGFncyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXCJzY3JpcHRcIik7XG4gICAgICAgIGxldCBzY3JpcHRDb3VudGVyO1xuICAgICAgICBpZiAodGhpcy5fY21wKSB7XG4gICAgICAgICAgICBVdGlscy5sb2coXCJDTVAgRGVmaW5lZCAod2Ugc2hvdWxkIG5ldmVyIGVuZCB1cCBoZXJlLCBhcyB0aGUgb2JzZXJ2ZXIgd2lsbCBkaXNjb25uZWN0LCBpZiB0aGlzLl9jbXAgaXMgc2V0XCIpO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIC8vIHNvbWUgQ01QcyBydW4gaW4gaUZyYW1lcyBhbmQgdGhlcmVmb3JlIHJlcXVpcmUgZGlmZmVyZW50IGhhbmRsaW5nLlxuICAgICAgICBpZiAodGhpcy5faW5JRnJhbWUpIHtcbiAgICAgICAgICAgIFV0aWxzLmxvZyhcImlGcmFtZSBTY3I6IFwiICsgZG9jdW1lbnQubG9jYXRpb24udG9TdHJpbmcoKSk7XG4gICAgICAgICAgICBpZiAoZG9jdW1lbnQubG9jYXRpb24udG9TdHJpbmcoKS5pbmNsdWRlcyhcInNwLXByb2QubmV0XCIpIHx8IGRvY3VtZW50LmxvY2F0aW9uLnRvU3RyaW5nKCkuaW5jbHVkZXMoXCJzb3VyY2Vwb2ludC5tZ3IuY29uc2Vuc3Uub3JnXCIpKSB7XG4gICAgICAgICAgICAgICAgVXRpbHMubG9nKFwiU1A6IFwiICsgZG9jdW1lbnQubG9jYXRpb24udG9TdHJpbmcoKSk7XG4gICAgICAgICAgICAgICAgdGhpcy5fY21wID0gbmV3IFNvdXJjZVBvaW50KHRoaXMuX2RvY3VtZW50LCBkb2N1bWVudC5sb2NhdGlvbi50b1N0cmluZygpLCB0aGlzLl9iYWNrZW5kQ2FsbCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIGlmIChkb2N1bWVudC5sb2NhdGlvbi50b1N0cmluZygpLmluY2x1ZGVzKFwidHJ1c3RhcmMuY29tXCIpKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5fY21wID0gbmV3IFRydXN0QXJjSUZyYW1lKHRoaXMuX2RvY3VtZW50LCBkb2N1bWVudC5sb2NhdGlvbi50b1N0cmluZygpLCB0aGlzLl9iYWNrZW5kQ2FsbCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIGlmIChkb2N1bWVudC5sb2NhdGlvbi50b1N0cmluZygpLmluY2x1ZGVzKFwiL2NtcHVpLmh0bWxcIikgJiYgZG9jdW1lbnQubG9jYXRpb24udG9TdHJpbmcoKS5pbmNsdWRlcyhcImNvbnNlbnRcIikpIHtcbiAgICAgICAgICAgICAgICB0aGlzLl9jbXAgPSBuZXcgT2F0aENtcCh0aGlzLl9kb2N1bWVudCwgZG9jdW1lbnQubG9jYXRpb24udG9TdHJpbmcoKSwgdGhpcy5fYmFja2VuZENhbGwpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgLy8gbm90IGZvdW5kLlxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIC8vIE5vdCBpbiBJRnJhbWUuXG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgLy8gdGhpcyBpcyB0aGUganVtcCBwb2ludCB3ZSByZXF1aXJlZCBmb3IgdGhlIG5lc3RlZCBsb29wXG4gICAgICAgICAgICBhbGxTY3JpcHRzOiBmb3IgKHNjcmlwdENvdW50ZXIgPSAwOyBzY3JpcHRDb3VudGVyIDwgYWxsU2NyaXB0VGFncy5sZW5ndGg7IHNjcmlwdENvdW50ZXIrKykge1xuICAgICAgICAgICAgICAgIGxldCB1cmxPZlNjcmlwdCA9IGFsbFNjcmlwdFRhZ3Nbc2NyaXB0Q291bnRlcl0uZ2V0QXR0cmlidXRlKFwic3JjXCIpO1xuICAgICAgICAgICAgICAgIGlmICh1cmxPZlNjcmlwdCAmJiB0eXBlb2YgdXJsT2ZTY3JpcHQgIT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgICAgICAgICAgICAgIC8vIGlmIHRoZSBzY3JpcHQgZGVmaW5lZCwgbWFrZSBpdCBsb3dlcmNhc2UuXG4gICAgICAgICAgICAgICAgICAgIHVybE9mU2NyaXB0ID0gdXJsT2ZTY3JpcHQudG9Mb3dlckNhc2UoKTtcbiAgICAgICAgICAgICAgICAgICAgLy8gVXRpbHMubG9nKHVybE9mU2NyaXB0KTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHVybE9mU2NyaXB0LmluY2x1ZGVzKCd0cnVzdGUuY29tJykgfHwgdXJsT2ZTY3JpcHQuaW5jbHVkZXMoJ3RydXN0YXJjLmNvbScpIHx8IHVybE9mU2NyaXB0LmluY2x1ZGVzKCd0cnVzdGFyYy5tZ3IuY29uc2Vuc3Uub3JnJykpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuX2NtcCA9IG5ldyBUcnVzdEFyY0Jhbm5lcih0aGlzLl9kb2N1bWVudCwgdXJsT2ZTY3JpcHQsIHRoaXMuX2JhY2tlbmRDYWxsKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGVsc2UgaWYgKHVybE9mU2NyaXB0LmluY2x1ZGVzKCdldmlkb24uY29tJykgfHwgdXJsT2ZTY3JpcHQuaW5jbHVkZXMoXCJldmlkb24ubWdyLmNvbnNlbnN1Lm9yZ1wiKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5fY21wID0gbmV3IEV2aWRvbih0aGlzLl9kb2N1bWVudCwgdXJsT2ZTY3JpcHQsIHRoaXMuX2JhY2tlbmRDYWxsKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGVsc2UgaWYgKHVybE9mU2NyaXB0LmluY2x1ZGVzKCdjb29raWVsYXcub3JnJykgfHwgdXJsT2ZTY3JpcHQuaW5jbHVkZXMoJ2Nvb2tpZXByby5jb20nKSB8fCB1cmxPZlNjcmlwdC5pbmNsdWRlcygnb25ldHJ1c3QubWdyLmNvbnNlbnN1Lm9yZycpIHx8IHVybE9mU2NyaXB0LmluY2x1ZGVzKCdvcHRhbm9uJykpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuX2NtcCA9IG5ldyBPbmVUcnVzdCh0aGlzLl9kb2N1bWVudCwgdXJsT2ZTY3JpcHQsIHRoaXMuX2JhY2tlbmRDYWxsKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGVsc2UgaWYgKHVybE9mU2NyaXB0LmluY2x1ZGVzKCdjb29raWVib3QuY29tJykgfHwgdXJsT2ZTY3JpcHQuaW5jbHVkZXMoXCJjb29raWVib3QubWdyLmNvbnNlbnN1Lm9yZ1wiKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5fY21wID0gbmV3IENvb2tpZUJvdCh0aGlzLl9kb2N1bWVudCwgdXJsT2ZTY3JpcHQsIHRoaXMuX2JhY2tlbmRDYWxsKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGVsc2UgaWYgKHVybE9mU2NyaXB0LmluY2x1ZGVzKCd1c2VyY2VudHJpY3MuZXUnKSB8fCB1cmxPZlNjcmlwdC5pbmNsdWRlcygndXNlcmNlbnRyaWNzLm1nci5jb25zZW5zdS5vcmcnKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5fY21wID0gbmV3IFVzZXJDZW50cmljcyh0aGlzLl9kb2N1bWVudCwgdXJsT2ZTY3JpcHQsIHRoaXMuX2JhY2tlbmRDYWxsKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGVsc2UgaWYgKHVybE9mU2NyaXB0LmluY2x1ZGVzKCdxdWFudGNhc3QuY29tJykgfHwgdXJsT2ZTY3JpcHQuaW5jbHVkZXMoXCJxdWFudGNhc3QubWdyLmNvbnNlbnN1Lm9yZ1wiKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5fY21wID0gbmV3IFF1YW50Q2FzdCh0aGlzLl9kb2N1bWVudCwgdXJsT2ZTY3JpcHQsIHRoaXMuX2JhY2tlbmRDYWxsKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGVsc2UgaWYgKHVybE9mU2NyaXB0LmluY2x1ZGVzKCd0cmFmZmVjdGl2ZS5jb20nKSB8fCB1cmxPZlNjcmlwdC5pbmNsdWRlcygndHJhZmZlY3RpdmUubWdyLmNvbnNlbnN1Lm9yZycpIHx8IHVybE9mU2NyaXB0LmluY2x1ZGVzKCdjZG50cmYuY29tJykpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuX2NtcCA9IG5ldyBUcmFmZmVjdGl2ZSh0aGlzLl9kb2N1bWVudCwgdXJsT2ZTY3JpcHQsIHRoaXMuX2JhY2tlbmRDYWxsKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGVsc2UgaWYgKHVybE9mU2NyaXB0LmluY2x1ZGVzKCdjb25zZW50bWFuYWdlci5tZ3IuY29uc2Vuc3Uub3JnJykpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuX2NtcCA9IG5ldyBDb25zZW50TWFuYWdlcih0aGlzLl9kb2N1bWVudCwgdXJsT2ZTY3JpcHQsIHRoaXMuX2JhY2tlbmRDYWxsKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGVsc2UgaWYgKHVybE9mU2NyaXB0LmluY2x1ZGVzKCdjaGFuZGFnby5jb20nKSB8fCB1cmxPZlNjcmlwdC5pbmNsdWRlcygnYXBwY29uc2VudC5tZ3IuY29uc2Vuc3Uub3JnJykgfHwgdXJsT2ZTY3JpcHQuaW5jbHVkZXMoJ2FwcGNvbnNlbnQuaW8nKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5fY21wID0gbmV3IENoYW5kYWdvKHRoaXMuX2RvY3VtZW50LCB1cmxPZlNjcmlwdCwgdGhpcy5fYmFja2VuZENhbGwpO1xuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgZWxzZSBpZiAodXJsT2ZTY3JpcHQuaW5jbHVkZXMoJ2RpZG9taS5pbycpIHx8IHVybE9mU2NyaXB0LmluY2x1ZGVzKCdkaWRvbWkubWdyLmNvbnNlbnN1Lm9yZycpIHx8IHVybE9mU2NyaXB0LmluY2x1ZGVzKCdwcml2YWN5LWNlbnRlci5vcmcnKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5fY21wID0gbmV3IERpRG9NaSh0aGlzLl9kb2N1bWVudCwgdXJsT2ZTY3JpcHQsIHRoaXMuX2JhY2tlbmRDYWxsKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGVsc2UgaWYgKGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5pbm5lckhUTUwuaW5jbHVkZXMoXCJib3JsYWJzLWNvb2tpZVwiKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5fY21wID0gbmV3IEJvcmxhYnModGhpcy5fZG9jdW1lbnQsIHVybE9mU2NyaXB0LCB0aGlzLl9iYWNrZW5kQ2FsbCk7XG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAvKiBBVFRFTlRJT04gLSBUSElTIElTIEdFTkVSQVRFRCBDT0RFIEZST00gVEhFIEVYRUNMIFNIRUVUICovXG4gICAgICAgICAgICAgICAgICAgIGVsc2UgaWYgKHVybE9mU2NyaXB0LmluY2x1ZGVzKCdmYWt0b3IuaW8nKSB8fCB1cmxPZlNjcmlwdC5pbmNsdWRlcygnZmFrdG9yLm1nci5jb25zZW5zdS5vcmcnKSB8fCB1cmxPZlNjcmlwdC5pbmNsdWRlcygnbGl2ZXJhbXAuY29tJykpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuX2NtcCA9IG5ldyBOb3RZZXRJbXBsZW1lbnRlZENtcCgzLCB0aGlzLl9kb2N1bWVudCwgJ0Zha3RvciBCVicsIHVybE9mU2NyaXB0LCB0aGlzLl9iYWNrZW5kQ2FsbCk7XG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBlbHNlIGlmICh1cmxPZlNjcmlwdC5pbmNsdWRlcygnYmF5Y2xvdWQuY29tJykgfHwgdXJsT2ZTY3JpcHQuaW5jbHVkZXMoJ2NvbnNlbnRodWIubWdyLmNvbnNlbnN1Lm9yZycpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLl9jbXAgPSBuZXcgTm90WWV0SW1wbGVtZW50ZWRDbXAoOCwgdGhpcy5fZG9jdW1lbnQsICdCYXljbG91ZCBTeXN0ZW1zIExpbWl0ZWQnLCB1cmxPZlNjcmlwdCwgdGhpcy5fYmFja2VuZENhbGwpO1xuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgZWxzZSBpZiAodXJsT2ZTY3JpcHQuaW5jbHVkZXMoJ2dldGFkbWlyYWwuY29tJykgfHwgdXJsT2ZTY3JpcHQuaW5jbHVkZXMoJ2FkbWlyYWwubWdyLmNvbnNlbnN1Lm9yZycpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLl9jbXAgPSBuZXcgTm90WWV0SW1wbGVtZW50ZWRDbXAoOSwgdGhpcy5fZG9jdW1lbnQsICdBZG1pcmFsJywgdXJsT2ZTY3JpcHQsIHRoaXMuX2JhY2tlbmRDYWxsKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGVsc2UgaWYgKHVybE9mU2NyaXB0LmluY2x1ZGVzKCdzb3Zybi5jb20nKSB8fCB1cmxPZlNjcmlwdC5pbmNsdWRlcygnc292cm4ubWdyLmNvbnNlbnN1Lm9yZycpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLl9jbXAgPSBuZXcgTm90WWV0SW1wbGVtZW50ZWRDbXAoMTEsIHRoaXMuX2RvY3VtZW50LCAnU292cm4gSG9sZGluZ3MgSW5jZScsIHVybE9mU2NyaXB0LCB0aGlzLl9iYWNrZW5kQ2FsbCk7XG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBlbHNlIGlmICh1cmxPZlNjcmlwdC5pbmNsdWRlcygnZGlnaXRydS5zdCcpIHx8IHVybE9mU2NyaXB0LmluY2x1ZGVzKCdkaWdpdHJ1c3QubWdyLmNvbnNlbnN1Lm9yZycpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLl9jbXAgPSBuZXcgTm90WWV0SW1wbGVtZW50ZWRDbXAoMTUsIHRoaXMuX2RvY3VtZW50LCAnQ29va2llIFRydXN0IFdvcmtpbmcgR3JvdXAsIEluYy4nLCB1cmxPZlNjcmlwdCwgdGhpcy5fYmFja2VuZENhbGwpO1xuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgZWxzZSBpZiAodXJsT2ZTY3JpcHQuaW5jbHVkZXMoJ3NraW1saW5rcy5jb20nKSB8fCB1cmxPZlNjcmlwdC5pbmNsdWRlcygnc2tpbWxpbmtzLm1nci5jb25zZW5zdS5vcmcnKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5fY21wID0gbmV3IE5vdFlldEltcGxlbWVudGVkQ21wKDIwLCB0aGlzLl9kb2N1bWVudCwgJ1NraW1iaXQgTHRkJywgdXJsT2ZTY3JpcHQsIHRoaXMuX2JhY2tlbmRDYWxsKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGVsc2UgaWYgKHVybE9mU2NyaXB0LmluY2x1ZGVzKCdjb252ZXJzYW50bWVkaWEuZXUnKSB8fCB1cmxPZlNjcmlwdC5pbmNsdWRlcygnY29udmVyc2FudC5tZ3IuY29uc2Vuc3Uub3JnJykpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuX2NtcCA9IG5ldyBOb3RZZXRJbXBsZW1lbnRlZENtcCgyMywgdGhpcy5fZG9jdW1lbnQsICdDb252ZXJzYW50IEV1cm9wZSBMdGQuJywgdXJsT2ZTY3JpcHQsIHRoaXMuX2JhY2tlbmRDYWxsKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGVsc2UgaWYgKHVybE9mU2NyaXB0LmluY2x1ZGVzKCdzaGFyZXRoaXMuY29tJykgfHwgdXJsT2ZTY3JpcHQuaW5jbHVkZXMoJ3NoYXJldGhpcy5tZ3IuY29uc2Vuc3Uub3JnJykpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuX2NtcCA9IG5ldyBOb3RZZXRJbXBsZW1lbnRlZENtcCgyNSwgdGhpcy5fZG9jdW1lbnQsICdTaGFyZVRoaXMsIEluYy4nLCB1cmxPZlNjcmlwdCwgdGhpcy5fYmFja2VuZENhbGwpO1xuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgZWxzZSBpZiAodXJsT2ZTY3JpcHQuaW5jbHVkZXMoJ2RtZ21lZGlhLmNvLnVrJykgfHwgdXJsT2ZTY3JpcHQuaW5jbHVkZXMoJ2RtZ21lZGlhLm1nci5jb25zZW5zdS5vcmcnKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5fY21wID0gbmV3IE5vdFlldEltcGxlbWVudGVkQ21wKDI3LCB0aGlzLl9kb2N1bWVudCwgJ0Fzc29jaWF0ZWQgTmV3c3BhcGVycyBMdGQnLCB1cmxPZlNjcmlwdCwgdGhpcy5fYmFja2VuZENhbGwpO1xuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgZWxzZSBpZiAodXJsT2ZTY3JpcHQuaW5jbHVkZXMoJ2NhcHRpZnkuY28udWsnKSB8fCB1cmxPZlNjcmlwdC5pbmNsdWRlcygnY2FwdGlmeS5tZ3IuY29uc2Vuc3Uub3JnJykpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuX2NtcCA9IG5ldyBOb3RZZXRJbXBsZW1lbnRlZENtcCgyOSwgdGhpcy5fZG9jdW1lbnQsICdDYXB0aWZ5IFRlY2hub2xvZ2llcyBMaW1pdGVkJywgdXJsT2ZTY3JpcHQsIHRoaXMuX2JhY2tlbmRDYWxsKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGVsc2UgaWYgKHVybE9mU2NyaXB0LmluY2x1ZGVzKCdyaWNoYXVkaWVuY2UuY29tJykgfHwgdXJsT2ZTY3JpcHQuaW5jbHVkZXMoJ3JpY2hhdWRpZW5jZS5tZ3IuY29uc2Vuc3Uub3JnJykpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuX2NtcCA9IG5ldyBOb3RZZXRJbXBsZW1lbnRlZENtcCgzMCwgdGhpcy5fZG9jdW1lbnQsICdSaWNoIEF1ZGllbmNlIEludGVybmF0aW9uYWwgU0wnLCB1cmxPZlNjcmlwdCwgdGhpcy5fYmFja2VuZENhbGwpO1xuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgZWxzZSBpZiAodXJsT2ZTY3JpcHQuaW5jbHVkZXMoJ3N5c3RlbTEuY29tJykgfHwgdXJsT2ZTY3JpcHQuaW5jbHVkZXMoJ3N5c3RlbTEubWdyLmNvbnNlbnN1Lm9yZycpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLl9jbXAgPSBuZXcgTm90WWV0SW1wbGVtZW50ZWRDbXAoMzgsIHRoaXMuX2RvY3VtZW50LCAnU3lzdGVtMSBMTEMnLCB1cmxPZlNjcmlwdCwgdGhpcy5fYmFja2VuZENhbGwpO1xuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgZWxzZSBpZiAodXJsT2ZTY3JpcHQuaW5jbHVkZXMoJ3NvcnRhYmxlLmNvbScpIHx8IHVybE9mU2NyaXB0LmluY2x1ZGVzKCdzb3J0YWJsZS5tZ3IuY29uc2Vuc3Uub3JnJykpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuX2NtcCA9IG5ldyBOb3RZZXRJbXBsZW1lbnRlZENtcCgzOSwgdGhpcy5fZG9jdW1lbnQsICdTbmFwc29ydCBJbmMuLCBvcGVyYXRpbmcgYXMgU29ydGFibGUnLCB1cmxPZlNjcmlwdCwgdGhpcy5fYmFja2VuZENhbGwpO1xuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgZWxzZSBpZiAodXJsT2ZTY3JpcHQuaW5jbHVkZXMoJ25ldHNwcmludC5ncm91cCcpIHx8IHVybE9mU2NyaXB0LmluY2x1ZGVzKCduZXRzcHJpbnRncm91cC5tZ3IuY29uc2Vuc3Uub3JnJykpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuX2NtcCA9IG5ldyBOb3RZZXRJbXBsZW1lbnRlZENtcCg0MSwgdGhpcy5fZG9jdW1lbnQsICdHcnVwYSBOZXRzcHJpbnQgU3AgeiBvLm8uJywgdXJsT2ZTY3JpcHQsIHRoaXMuX2JhY2tlbmRDYWxsKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGVsc2UgaWYgKHVybE9mU2NyaXB0LmluY2x1ZGVzKCdtYWR2ZXJ0aXNlLmNvbScpIHx8IHVybE9mU2NyaXB0LmluY2x1ZGVzKCdtYWR2ZXJ0aXNlLm1nci5jb25zZW5zdS5vcmcnKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5fY21wID0gbmV3IE5vdFlldEltcGxlbWVudGVkQ21wKDQ0LCB0aGlzLl9kb2N1bWVudCwgJ01hZHZlcnRpc2UgTWVkaWEnLCB1cmxPZlNjcmlwdCwgdGhpcy5fYmFja2VuZENhbGwpO1xuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgZWxzZSBpZiAodXJsT2ZTY3JpcHQuaW5jbHVkZXMoJ29ndXJ5LmNvbScpIHx8IHVybE9mU2NyaXB0LmluY2x1ZGVzKCdvZ3VyeS5tZ3IuY29uc2Vuc3Uub3JnJykpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuX2NtcCA9IG5ldyBOb3RZZXRJbXBsZW1lbnRlZENtcCg0NSwgdGhpcy5fZG9jdW1lbnQsICdPZ3VyeSBMdGQnLCB1cmxPZlNjcmlwdCwgdGhpcy5fYmFja2VuZENhbGwpO1xuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgZWxzZSBpZiAodXJsT2ZTY3JpcHQuaW5jbHVkZXMoJ21lZGlhdmluZS5jb20nKSB8fCB1cmxPZlNjcmlwdC5pbmNsdWRlcygnbWVkaWF2aW5lLm1nci5jb25zZW5zdS5vcmcnKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5fY21wID0gbmV3IE5vdFlldEltcGxlbWVudGVkQ21wKDQ2LCB0aGlzLl9kb2N1bWVudCwgJ01lZGlhdmluZSwgSW5jLicsIHVybE9mU2NyaXB0LCB0aGlzLl9iYWNrZW5kQ2FsbCk7XG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBlbHNlIGlmICh1cmxPZlNjcmlwdC5pbmNsdWRlcygndHJ1c3RhcmMuY29tJykgfHwgdXJsT2ZTY3JpcHQuaW5jbHVkZXMoJ3RydXN0YXJjLm1nci5jb25zZW5zdS5vcmcnKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5fY21wID0gbmV3IE5vdFlldEltcGxlbWVudGVkQ21wKDQ3LCB0aGlzLl9kb2N1bWVudCwgJ1RydXN0QXJjIEluYycsIHVybE9mU2NyaXB0LCB0aGlzLl9iYWNrZW5kQ2FsbCk7XG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBlbHNlIGlmICh1cmxPZlNjcmlwdC5pbmNsdWRlcygnc2Fub21hLmNvbScpIHx8IHVybE9mU2NyaXB0LmluY2x1ZGVzKCdzbWYubWdyLmNvbnNlbnN1Lm9yZycpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLl9jbXAgPSBuZXcgTm90WWV0SW1wbGVtZW50ZWRDbXAoNDksIHRoaXMuX2RvY3VtZW50LCAnU2Fub21hIE1lZGlhIEZpbmxhbmQgT3knLCB1cmxPZlNjcmlwdCwgdGhpcy5fYmFja2VuZENhbGwpO1xuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgZWxzZSBpZiAodXJsT2ZTY3JpcHQuaW5jbHVkZXMoJ2V0YXJnZXQuZXUnKSB8fCB1cmxPZlNjcmlwdC5pbmNsdWRlcygnZXRhcmdldC5tZ3IuY29uc2Vuc3Uub3JnJykpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuX2NtcCA9IG5ldyBOb3RZZXRJbXBsZW1lbnRlZENtcCg1MCwgdGhpcy5fZG9jdW1lbnQsICdFVEFSR0VUIFNFJywgdXJsT2ZTY3JpcHQsIHRoaXMuX2JhY2tlbmRDYWxsKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGVsc2UgaWYgKHVybE9mU2NyaXB0LmluY2x1ZGVzKCdhZHJvbGwuY29tJykgfHwgdXJsT2ZTY3JpcHQuaW5jbHVkZXMoJ2Fkcm9sbC5tZ3IuY29uc2Vuc3Uub3JnJykpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuX2NtcCA9IG5ldyBOb3RZZXRJbXBsZW1lbnRlZENtcCg1NCwgdGhpcy5fZG9jdW1lbnQsICdBZFJvbGwsIEluYycsIHVybE9mU2NyaXB0LCB0aGlzLl9iYWNrZW5kQ2FsbCk7XG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBlbHNlIGlmICh1cmxPZlNjcmlwdC5pbmNsdWRlcygndHJpYm9vLmNvbScpIHx8IHVybE9mU2NyaXB0LmluY2x1ZGVzKCd0cmlib28ubWdyLmNvbnNlbnN1Lm9yZycpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLl9jbXAgPSBuZXcgTm90WWV0SW1wbGVtZW50ZWRDbXAoNTUsIHRoaXMuX2RvY3VtZW50LCAnVHJpYm9vIE1lZGlhIFNSTCcsIHVybE9mU2NyaXB0LCB0aGlzLl9iYWNrZW5kQ2FsbCk7XG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBlbHNlIGlmICh1cmxPZlNjcmlwdC5pbmNsdWRlcygnd2ViZWRpYS1ncm91cC5jb20nKSB8fCB1cmxPZlNjcmlwdC5pbmNsdWRlcygnd2ViZWRpYS5tZ3IuY29uc2Vuc3Uub3JnJykpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuX2NtcCA9IG5ldyBOb3RZZXRJbXBsZW1lbnRlZENtcCg1NywgdGhpcy5fZG9jdW1lbnQsICdXRUJFRElBJywgdXJsT2ZTY3JpcHQsIHRoaXMuX2JhY2tlbmRDYWxsKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGVsc2UgaWYgKHVybE9mU2NyaXB0LmluY2x1ZGVzKCdjaWFvcGVvcGxlLml0JykgfHwgdXJsT2ZTY3JpcHQuaW5jbHVkZXMoJ2NpYW9wZW9wbGUubWdyLmNvbnNlbnN1Lm9yZycpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLl9jbXAgPSBuZXcgTm90WWV0SW1wbGVtZW50ZWRDbXAoNTgsIHRoaXMuX2RvY3VtZW50LCAnQ2lhbyBwZW9wbGUgcy5yLmwuJywgdXJsT2ZTY3JpcHQsIHRoaXMuX2JhY2tlbmRDYWxsKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGVsc2UgaWYgKHVybE9mU2NyaXB0LmluY2x1ZGVzKCdkZWV6ZXIuY29tJykgfHwgdXJsT2ZTY3JpcHQuaW5jbHVkZXMoJ2RlZXplci5tZ3IuY29uc2Vuc3Uub3JnJykpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuX2NtcCA9IG5ldyBOb3RZZXRJbXBsZW1lbnRlZENtcCg1OSwgdGhpcy5fZG9jdW1lbnQsICdEZWV6ZXInLCB1cmxPZlNjcmlwdCwgdGhpcy5fYmFja2VuZENhbGwpO1xuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgZWxzZSBpZiAodXJsT2ZTY3JpcHQuaW5jbHVkZXMoJ3Nwb2xlY3pub3NjaS5wbCcpIHx8IHVybE9mU2NyaXB0LmluY2x1ZGVzKCdzcG9sZWN6bm9zY2kubWdyLmNvbnNlbnN1Lm9yZycpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLl9jbXAgPSBuZXcgTm90WWV0SW1wbGVtZW50ZWRDbXAoNjEsIHRoaXMuX2RvY3VtZW50LCAnU3BvbGVjem5vc2NpIFNwLiB6IG8uby4gU3Auay4nLCB1cmxPZlNjcmlwdCwgdGhpcy5fYmFja2VuZENhbGwpO1xuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgZWxzZSBpZiAodXJsT2ZTY3JpcHQuaW5jbHVkZXMoJ2d1bXRyZWUuY29tJykgfHwgdXJsT2ZTY3JpcHQuaW5jbHVkZXMoJ2d1bXRyZWVjb20ubWdyLmNvbnNlbnN1Lm9yZycpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLl9jbXAgPSBuZXcgTm90WWV0SW1wbGVtZW50ZWRDbXAoNjIsIHRoaXMuX2RvY3VtZW50LCAnR3VtdHJlZS5jb20gTHRkJywgdXJsT2ZTY3JpcHQsIHRoaXMuX2JhY2tlbmRDYWxsKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGVsc2UgaWYgKHVybE9mU2NyaXB0LmluY2x1ZGVzKCdnZHByLmNsaWNraW8uY29tJykgfHwgdXJsT2ZTY3JpcHQuaW5jbHVkZXMoJ2NsaWNraW8ubWdyLmNvbnNlbnN1Lm9yZycpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLl9jbXAgPSBuZXcgTm90WWV0SW1wbGVtZW50ZWRDbXAoNjMsIHRoaXMuX2RvY3VtZW50LCAnQUxaIFNvZnR3YXJlIEx0ZCAodHJhZGluZyBhcyBDbGlja2lvKScsIHVybE9mU2NyaXB0LCB0aGlzLl9iYWNrZW5kQ2FsbCk7XG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBlbHNlIGlmICh1cmxPZlNjcmlwdC5pbmNsdWRlcygnb25ldGFnLm5ldCcpIHx8IHVybE9mU2NyaXB0LmluY2x1ZGVzKCdvbmV0YWcubWdyLmNvbnNlbnN1Lm9yZycpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLl9jbXAgPSBuZXcgTm90WWV0SW1wbGVtZW50ZWRDbXAoNjUsIHRoaXMuX2RvY3VtZW50LCAnT25lVGFnIEx0ZCcsIHVybE9mU2NyaXB0LCB0aGlzLl9iYWNrZW5kQ2FsbCk7XG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBlbHNlIGlmICh1cmxPZlNjcmlwdC5pbmNsdWRlcygndW5pY29uc2VudC5jb20nKSB8fCB1cmxPZlNjcmlwdC5pbmNsdWRlcygndW5pY29uc2VudC5tZ3IuY29uc2Vuc3Uub3JnJykpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuX2NtcCA9IG5ldyBOb3RZZXRJbXBsZW1lbnRlZENtcCg2OCwgdGhpcy5fZG9jdW1lbnQsICdUcmFuc2ZvbiBMdGQnLCB1cmxPZlNjcmlwdCwgdGhpcy5fYmFja2VuZENhbGwpO1xuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgZWxzZSBpZiAodXJsT2ZTY3JpcHQuaW5jbHVkZXMoJ2dyZW1pbWVkaWEucGwnKSB8fCB1cmxPZlNjcmlwdC5pbmNsdWRlcygnZ21jbXAubWdyLmNvbnNlbnN1Lm9yZycpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLl9jbXAgPSBuZXcgTm90WWV0SW1wbGVtZW50ZWRDbXAoNjksIHRoaXMuX2RvY3VtZW50LCAnR3JlbWkgTWVkaWEgU0EnLCB1cmxPZlNjcmlwdCwgdGhpcy5fYmFja2VuZENhbGwpO1xuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgZWxzZSBpZiAodXJsT2ZTY3JpcHQuaW5jbHVkZXMoJ3dwLnBsJykgfHwgdXJsT2ZTY3JpcHQuaW5jbHVkZXMoJ3dwbS5tZ3IuY29uc2Vuc3Uub3JnJykpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuX2NtcCA9IG5ldyBOb3RZZXRJbXBsZW1lbnRlZENtcCg3MiwgdGhpcy5fZG9jdW1lbnQsICdXaXJ0dWFsbmEgUG9sc2thIE1lZGlhIFMuQS4nLCB1cmxPZlNjcmlwdCwgdGhpcy5fYmFja2VuZENhbGwpO1xuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgZWxzZSBpZiAodXJsT2ZTY3JpcHQuaW5jbHVkZXMoJ3JlbGV2YW50LmZpJykgfHwgdXJsT2ZTY3JpcHQuaW5jbHVkZXMoJ3JlbGV2YW50Lm1nci5jb25zZW5zdS5vcmcnKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5fY21wID0gbmV3IE5vdFlldEltcGxlbWVudGVkQ21wKDc0LCB0aGlzLl9kb2N1bWVudCwgJ1JlbGV2YW50IERpZ2l0YWwgT3knLCB1cmxPZlNjcmlwdCwgdGhpcy5fYmFja2VuZENhbGwpO1xuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgZWxzZSBpZiAodXJsT2ZTY3JpcHQuaW5jbHVkZXMoJ3ZlY3RhdXJ5LmlvJykgfHwgdXJsT2ZTY3JpcHQuaW5jbHVkZXMoJ3ZlY3RhdXJ5Lm1nci5jb25zZW5zdS5vcmcnKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5fY21wID0gbmV3IE5vdFlldEltcGxlbWVudGVkQ21wKDc1LCB0aGlzLl9kb2N1bWVudCwgJ1ZFQ1RBVVJZJywgdXJsT2ZTY3JpcHQsIHRoaXMuX2JhY2tlbmRDYWxsKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGVsc2UgaWYgKHVybE9mU2NyaXB0LmluY2x1ZGVzKCdzaWJib3ZlbnR1cmVzLmNvbScpIHx8IHVybE9mU2NyaXB0LmluY2x1ZGVzKCdzaWJib3ZlbnR1cmVzLm1nci5jb25zZW5zdS5vcmcnKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5fY21wID0gbmV3IE5vdFlldEltcGxlbWVudGVkQ21wKDc2LCB0aGlzLl9kb2N1bWVudCwgJ1NJQkJPIFZFTlRVUkVTIFNMVScsIHVybE9mU2NyaXB0LCB0aGlzLl9iYWNrZW5kQ2FsbCk7XG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBlbHNlIGlmICh1cmxPZlNjcmlwdC5pbmNsdWRlcygnYWRtZXRyaWNzcHJvLmNvbScpIHx8IHVybE9mU2NyaXB0LmluY2x1ZGVzKCdjbXAubWdyLmNvbnNlbnN1Lm9yZycpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLl9jbXAgPSBuZXcgTm90WWV0SW1wbGVtZW50ZWRDbXAoNzcsIHRoaXMuX2RvY3VtZW50LCAnVGVhY2hpbmcgQWlkcywgTExDJywgdXJsT2ZTY3JpcHQsIHRoaXMuX2JhY2tlbmRDYWxsKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGVsc2UgaWYgKHVybE9mU2NyaXB0LmluY2x1ZGVzKCdzZnIuZnInKSB8fCB1cmxPZlNjcmlwdC5pbmNsdWRlcygnc2ZyLm1nci5jb25zZW5zdS5vcmcnKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5fY21wID0gbmV3IE5vdFlldEltcGxlbWVudGVkQ21wKDc5LCB0aGlzLl9kb2N1bWVudCwgJ1NGUicsIHVybE9mU2NyaXB0LCB0aGlzLl9iYWNrZW5kQ2FsbCk7XG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBlbHNlIGlmICh1cmxPZlNjcmlwdC5pbmNsdWRlcygnb2lsLmF4ZWxzcHJpbmdlci5jb20nKSB8fCB1cmxPZlNjcmlwdC5pbmNsdWRlcygnb2lsLm1nci5jb25zZW5zdS5vcmcnKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5fY21wID0gbmV3IE5vdFlldEltcGxlbWVudGVkQ21wKDgwLCB0aGlzLl9kb2N1bWVudCwgJ0F4ZWwgU3ByaW5nZXIgU0UnLCB1cmxPZlNjcmlwdCwgdGhpcy5fYmFja2VuZENhbGwpO1xuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgZWxzZSBpZiAodXJsT2ZTY3JpcHQuaW5jbHVkZXMoJ2FkdGVjaGZhY3RvcnkuY29tJykgfHwgdXJsT2ZTY3JpcHQuaW5jbHVkZXMoJ2F0Zi5tZ3IuY29uc2Vuc3Uub3JnJykpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuX2NtcCA9IG5ldyBOb3RZZXRJbXBsZW1lbnRlZENtcCg4MiwgdGhpcy5fZG9jdW1lbnQsICdBZFRlY2ggRmFjdG9yeSBHbWJIICYgQ28uIEtHJywgdXJsT2ZTY3JpcHQsIHRoaXMuX2JhY2tlbmRDYWxsKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGVsc2UgaWYgKHVybE9mU2NyaXB0LmluY2x1ZGVzKCdhbG1hbWVkaWEuZmknKSB8fCB1cmxPZlNjcmlwdC5pbmNsdWRlcygnYWxtYW1lZGlhLm1nci5jb25zZW5zdS5vcmcnKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5fY21wID0gbmV3IE5vdFlldEltcGxlbWVudGVkQ21wKDg0LCB0aGlzLl9kb2N1bWVudCwgJ0FsbWEgTWVkaWEnLCB1cmxPZlNjcmlwdCwgdGhpcy5fYmFja2VuZENhbGwpO1xuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgZWxzZSBpZiAodXJsT2ZTY3JpcHQuaW5jbHVkZXMoJ291ZXN0LWZyYW5jZS5mcicpIHx8IHVybE9mU2NyaXB0LmluY2x1ZGVzKCdzaXBhb2YubWdyLmNvbnNlbnN1Lm9yZycpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLl9jbXAgPSBuZXcgTm90WWV0SW1wbGVtZW50ZWRDbXAoODUsIHRoaXMuX2RvY3VtZW50LCAnU0lQQScsIHVybE9mU2NyaXB0LCB0aGlzLl9iYWNrZW5kQ2FsbCk7XG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBlbHNlIGlmICh1cmxPZlNjcmlwdC5pbmNsdWRlcygnbm91dy5jb20nKSB8fCB1cmxPZlNjcmlwdC5pbmNsdWRlcygnbm91dy5tZ3IuY29uc2Vuc3Uub3JnJykpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuX2NtcCA9IG5ldyBOb3RZZXRJbXBsZW1lbnRlZENtcCg4NiwgdGhpcy5fZG9jdW1lbnQsICdOb3V3IE1lZGlhIEFCJywgdXJsT2ZTY3JpcHQsIHRoaXMuX2JhY2tlbmRDYWxsKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGVsc2UgaWYgKHVybE9mU2NyaXB0LmluY2x1ZGVzKCdjb21tYW5kZXJzYWN0LmNvbScpIHx8IHVybE9mU2NyaXB0LmluY2x1ZGVzKCdjb21tYW5kZXJzYWN0Lm1nci5jb25zZW5zdS5vcmcnKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5fY21wID0gbmV3IE5vdFlldEltcGxlbWVudGVkQ21wKDkwLCB0aGlzLl9kb2N1bWVudCwgJ0NvbW1hbmRlcnMgQWN0JywgdXJsT2ZTY3JpcHQsIHRoaXMuX2JhY2tlbmRDYWxsKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGVsc2UgaWYgKHVybE9mU2NyaXB0LmluY2x1ZGVzKCdzaXJkYXRhLmNvbScpIHx8IHVybE9mU2NyaXB0LmluY2x1ZGVzKCdzZGRhbi5tZ3IuY29uc2Vuc3Uub3JnJykpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuX2NtcCA9IG5ldyBOb3RZZXRJbXBsZW1lbnRlZENtcCg5MiwgdGhpcy5fZG9jdW1lbnQsICdTSVJEQVRBJywgdXJsT2ZTY3JpcHQsIHRoaXMuX2JhY2tlbmRDYWxsKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGVsc2UgaWYgKHVybE9mU2NyaXB0LmluY2x1ZGVzKCdzaGlueXN0YXQuY29tJykgfHwgdXJsT2ZTY3JpcHQuaW5jbHVkZXMoJ3NoaW55c3RhdC5tZ3IuY29uc2Vuc3Uub3JnJykpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuX2NtcCA9IG5ldyBOb3RZZXRJbXBsZW1lbnRlZENtcCg5NiwgdGhpcy5fZG9jdW1lbnQsICdUcmlib28gRGF0YSBBbmFseXRpY3MnLCB1cmxPZlNjcmlwdCwgdGhpcy5fYmFja2VuZENhbGwpO1xuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgZWxzZSBpZiAodXJsT2ZTY3JpcHQuaW5jbHVkZXMoJ29mZnJlbWVkaWEuY29tJykgfHwgdXJsT2ZTY3JpcHQuaW5jbHVkZXMoJ2NhbWJpdW1tZWRpYS5tZ3IuY29uc2Vuc3Uub3JnJykpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuX2NtcCA9IG5ldyBOb3RZZXRJbXBsZW1lbnRlZENtcCgxMDAsIHRoaXMuX2RvY3VtZW50LCAnQ2FtYml1bSBNZWRpYScsIHVybE9mU2NyaXB0LCB0aGlzLl9iYWNrZW5kQ2FsbCk7XG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBlbHNlIGlmICh1cmxPZlNjcmlwdC5pbmNsdWRlcygnZ2VtaXVzLmNvbScpIHx8IHVybE9mU2NyaXB0LmluY2x1ZGVzKCdnZW1pdXMubWdyLmNvbnNlbnN1Lm9yZycpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLl9jbXAgPSBuZXcgTm90WWV0SW1wbGVtZW50ZWRDbXAoMTA0LCB0aGlzLl9kb2N1bWVudCwgJ0dlbWl1cyBTQScsIHVybE9mU2NyaXB0LCB0aGlzLl9iYWNrZW5kQ2FsbCk7XG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBlbHNlIGlmICh1cmxPZlNjcmlwdC5pbmNsdWRlcygnZGFpbHltb3Rpb24uY29tJykgfHwgdXJsT2ZTY3JpcHQuaW5jbHVkZXMoJ2RhaWx5bW90aW9uLm1nci5jb25zZW5zdS5vcmcnKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5fY21wID0gbmV3IE5vdFlldEltcGxlbWVudGVkQ21wKDEwNSwgdGhpcy5fZG9jdW1lbnQsICdEQUlMWU1PVElPTiBTQScsIHVybE9mU2NyaXB0LCB0aGlzLl9iYWNrZW5kQ2FsbCk7XG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBlbHNlIGlmICh1cmxPZlNjcmlwdC5pbmNsdWRlcygndGhlZ3VhcmRpYW4uY29tJykgfHwgdXJsT2ZTY3JpcHQuaW5jbHVkZXMoJ2dubS5tZ3IuY29uc2Vuc3Uub3JnJykpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuX2NtcCA9IG5ldyBOb3RZZXRJbXBsZW1lbnRlZENtcCgxMTIsIHRoaXMuX2RvY3VtZW50LCAnR3VhcmRpYW4gTmV3cyBhbmQgTWVkaWEnLCB1cmxPZlNjcmlwdCwgdGhpcy5fYmFja2VuZENhbGwpO1xuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgZWxzZSBpZiAodXJsT2ZTY3JpcHQuaW5jbHVkZXMoJ3VsdGltYXRlLWd1aXRhci5jb20nKSB8fCB1cmxPZlNjcmlwdC5pbmNsdWRlcygnbXVzaWNpYW5zYXVkaWVuY2UubWdyLmNvbnNlbnN1Lm9yZycpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLl9jbXAgPSBuZXcgTm90WWV0SW1wbGVtZW50ZWRDbXAoMTEzLCB0aGlzLl9kb2N1bWVudCwgJ0dyYW5kIFBsYXkgTWVkaWEsIExMQycsIHVybE9mU2NyaXB0LCB0aGlzLl9iYWNrZW5kQ2FsbCk7XG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBlbHNlIGlmICh1cmxPZlNjcmlwdC5pbmNsdWRlcygnYWR2ZXJzYWwuY29tJykgfHwgdXJsT2ZTY3JpcHQuaW5jbHVkZXMoJ2FkdmVyc2FsLm1nci5jb25zZW5zdS5vcmcnKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5fY21wID0gbmV3IE5vdFlldEltcGxlbWVudGVkQ21wKDExNCwgdGhpcy5fZG9jdW1lbnQsICdBZHZlcnNhbCBNZWRpYSwgSW5jLicsIHVybE9mU2NyaXB0LCB0aGlzLl9iYWNrZW5kQ2FsbCk7XG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBlbHNlIGlmICh1cmxPZlNjcmlwdC5pbmNsdWRlcygnYS1sZWhkZXQuZmknKSB8fCB1cmxPZlNjcmlwdC5pbmNsdWRlcygnYS1sZWhkZXQubWdyLmNvbnNlbnN1Lm9yZycpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLl9jbXAgPSBuZXcgTm90WWV0SW1wbGVtZW50ZWRDbXAoMTE1LCB0aGlzLl9kb2N1bWVudCwgJ0EtbGVoZGV0IE95JywgdXJsT2ZTY3JpcHQsIHRoaXMuX2JhY2tlbmRDYWxsKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGVsc2UgaWYgKHVybE9mU2NyaXB0LmluY2x1ZGVzKCdjdXJpb3NpdHltZWRpYS5jb20nKSB8fCB1cmxPZlNjcmlwdC5pbmNsdWRlcygnY3VyaW9zaXR5bWVkaWEubWdyLmNvbnNlbnN1Lm9yZycpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLl9jbXAgPSBuZXcgTm90WWV0SW1wbGVtZW50ZWRDbXAoMTE5LCB0aGlzLl9kb2N1bWVudCwgJ0N1cmlvc2l0eSBNZWRpYSwgSW5jLicsIHVybE9mU2NyaXB0LCB0aGlzLl9iYWNrZW5kQ2FsbCk7XG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBlbHNlIGlmICh1cmxPZlNjcmlwdC5pbmNsdWRlcygnd2ViZmluYW5jaWFsZ3JvdXAuY29tJykgfHwgdXJsT2ZTY3JpcHQuaW5jbHVkZXMoJ3ZvcnRleC5tZ3IuY29uc2Vuc3Uub3JnJykpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuX2NtcCA9IG5ldyBOb3RZZXRJbXBsZW1lbnRlZENtcCgxMjIsIHRoaXMuX2RvY3VtZW50LCAnV2ViIEZpbmFuY2lhbCBHcm91cCBTLkEuL1ZvcnRleCcsIHVybE9mU2NyaXB0LCB0aGlzLl9iYWNrZW5kQ2FsbCk7XG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBlbHNlIGlmICh1cmxPZlNjcmlwdC5pbmNsdWRlcygnaXViZW5kYS5jb20nKSB8fCB1cmxPZlNjcmlwdC5pbmNsdWRlcygnaXViZW5kYS5tZ3IuY29uc2Vuc3Uub3JnJykpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuX2NtcCA9IG5ldyBOb3RZZXRJbXBsZW1lbnRlZENtcCgxMjMsIHRoaXMuX2RvY3VtZW50LCAnaXViZW5kYScsIHVybE9mU2NyaXB0LCB0aGlzLl9iYWNrZW5kQ2FsbCk7XG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBlbHNlIGlmICh1cmxPZlNjcmlwdC5pbmNsdWRlcygnbGlxd2lkLmNvbScpIHx8IHVybE9mU2NyaXB0LmluY2x1ZGVzKCdsaXF3aWQubWdyLmNvbnNlbnN1Lm9yZycpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLl9jbXAgPSBuZXcgTm90WWV0SW1wbGVtZW50ZWRDbXAoMTI0LCB0aGlzLl9kb2N1bWVudCwgJ0xJUVdJRCcsIHVybE9mU2NyaXB0LCB0aGlzLl9iYWNrZW5kQ2FsbCk7XG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgfSAvKmVsc2UgaWYgKHVybE9mU2NyaXB0LmluY2x1ZGVzKCdlYmF5LmNvbScpIHx8IHVybE9mU2NyaXB0LmluY2x1ZGVzKCdlYmF5Lm1nci5jb25zZW5zdS5vcmcnKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5fY21wID0gbmV3IE5vdFlldEltcGxlbWVudGVkQ21wKDEyNSwgdGhpcy5fZG9jdW1lbnQsICdlQmF5IEluYycsIHVybE9mU2NyaXB0LCB0aGlzLl9iYWNrZW5kQ2FsbCk7XG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgfSAqL1xuICAgICAgICAgICAgICAgICAgICBlbHNlIGlmICh1cmxPZlNjcmlwdC5pbmNsdWRlcygnYWRldmludGEuY29tJykgfHwgdXJsT2ZTY3JpcHQuaW5jbHVkZXMoJ3NjaGlic3RlZHNwYWluLm1nci5jb25zZW5zdS5vcmcnKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5fY21wID0gbmV3IE5vdFlldEltcGxlbWVudGVkQ21wKDEyOSwgdGhpcy5fZG9jdW1lbnQsICdBZGV2aW50YSBTcGFpbiBTLkwuVS4nLCB1cmxPZlNjcmlwdCwgdGhpcy5fYmFja2VuZENhbGwpO1xuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgZWxzZSBpZiAodXJsT2ZTY3JpcHQuaW5jbHVkZXMoJ29yaWVsLmlvJykgfHwgdXJsT2ZTY3JpcHQuaW5jbHVkZXMoJ29yaWVsLm1nci5jb25zZW5zdS5vcmcnKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5fY21wID0gbmV3IE5vdFlldEltcGxlbWVudGVkQ21wKDEzMSwgdGhpcy5fZG9jdW1lbnQsICdPcmllbCBWZW50dXJlcycsIHVybE9mU2NyaXB0LCB0aGlzLl9iYWNrZW5kQ2FsbCk7XG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBlbHNlIGlmICh1cmxPZlNjcmlwdC5pbmNsdWRlcygnaW1wcm92ZWRpZ2l0YWwuY29tJykgfHwgdXJsT2ZTY3JpcHQuaW5jbHVkZXMoJ2ltcHJvdmVkaWdpdGFsLm1nci5jb25zZW5zdS5vcmcnKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5fY21wID0gbmV3IE5vdFlldEltcGxlbWVudGVkQ21wKDEzOSwgdGhpcy5fZG9jdW1lbnQsICdJbXByb3ZlIERpZ2l0YWwgSW50ZXJuYXRpb25hbCBCVicsIHVybE9mU2NyaXB0LCB0aGlzLl9iYWNrZW5kQ2FsbCk7XG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBlbHNlIGlmICh1cmxPZlNjcmlwdC5pbmNsdWRlcygnd2lraWEuY29tZmFuZG9tJykgfHwgdXJsT2ZTY3JpcHQuaW5jbHVkZXMoJ2ZhbmRvbS5tZ3IuY29uc2Vuc3Uub3JnJykpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuX2NtcCA9IG5ldyBOb3RZZXRJbXBsZW1lbnRlZENtcCgxNDEsIHRoaXMuX2RvY3VtZW50LCAnV2lraWEsIEluYy4gKEZBTkRPTSknLCB1cmxPZlNjcmlwdCwgdGhpcy5fYmFja2VuZENhbGwpO1xuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgZWxzZSBpZiAodXJsT2ZTY3JpcHQuaW5jbHVkZXMoJ2NhcmFkaXNpYWMuY29tJykgfHwgdXJsT2ZTY3JpcHQuaW5jbHVkZXMoJ2NhcmFkaXNpYWMubWdyLmNvbnNlbnN1Lm9yZycpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLl9jbXAgPSBuZXcgTm90WWV0SW1wbGVtZW50ZWRDbXAoMTQ3LCB0aGlzLl9kb2N1bWVudCwgJ0NhciZCb2F0IE1lZGlhJywgdXJsT2ZTY3JpcHQsIHRoaXMuX2JhY2tlbmRDYWxsKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGVsc2UgaWYgKHVybE9mU2NyaXB0LmluY2x1ZGVzKCdhdm9jZXQuaW8nKSB8fCB1cmxPZlNjcmlwdC5pbmNsdWRlcygnYXZvY2V0Lm1nci5jb25zZW5zdS5vcmcnKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5fY21wID0gbmV3IE5vdFlldEltcGxlbWVudGVkQ21wKDE1MywgdGhpcy5fZG9jdW1lbnQsICdBdm9jZXQgU3lzdGVtcyBMaW10ZWQnLCB1cmxPZlNjcmlwdCwgdGhpcy5fYmFja2VuZENhbGwpO1xuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgZWxzZSBpZiAodXJsT2ZTY3JpcHQuaW5jbHVkZXMoJ3lvYy5jb20nKSB8fCB1cmxPZlNjcmlwdC5pbmNsdWRlcygneW9jLm1nci5jb25zZW5zdS5vcmcnKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5fY21wID0gbmV3IE5vdFlldEltcGxlbWVudGVkQ21wKDE1NywgdGhpcy5fZG9jdW1lbnQsICdZT0MgQUcnLCB1cmxPZlNjcmlwdCwgdGhpcy5fYmFja2VuZENhbGwpO1xuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgZWxzZSBpZiAodXJsT2ZTY3JpcHQuaW5jbHVkZXMoJ2lubml0eS5jb20nKSB8fCB1cmxPZlNjcmlwdC5pbmNsdWRlcygnaW5uaXR5Lm1nci5jb25zZW5zdS5vcmcnKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5fY21wID0gbmV3IE5vdFlldEltcGxlbWVudGVkQ21wKDE2MSwgdGhpcy5fZG9jdW1lbnQsICdJbm5pdHknLCB1cmxPZlNjcmlwdCwgdGhpcy5fYmFja2VuZENhbGwpO1xuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgZWxzZSBpZiAodXJsT2ZTY3JpcHQuaW5jbHVkZXMoJ2Nvb2tpZWluZm9ybWF0aW9uLmNvbScpIHx8IHVybE9mU2NyaXB0LmluY2x1ZGVzKCdjb29raWVpbmZvcm1hdGlvbi5tZ3IuY29uc2Vuc3Uub3JnJykpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuX2NtcCA9IG5ldyBOb3RZZXRJbXBsZW1lbnRlZENtcCgxNjIsIHRoaXMuX2RvY3VtZW50LCAnQ29va2llIEluZm9ybWF0aW9uIEFQUycsIHVybE9mU2NyaXB0LCB0aGlzLl9iYWNrZW5kQ2FsbCk7XG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBlbHNlIGlmICh1cmxPZlNjcmlwdC5pbmNsdWRlcygnc29jaWV0ZS5jb20nKSB8fCB1cmxPZlNjcmlwdC5pbmNsdWRlcygnc29jaWV0ZS5tZ3IuY29uc2Vuc3Uub3JnJykpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuX2NtcCA9IG5ldyBOb3RZZXRJbXBsZW1lbnRlZENtcCgxNjQsIHRoaXMuX2RvY3VtZW50LCAnU09DSUVURSBTQVMnLCB1cmxPZlNjcmlwdCwgdGhpcy5fYmFja2VuZENhbGwpO1xuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgZWxzZSBpZiAodXJsT2ZTY3JpcHQuaW5jbHVkZXMoJ3VuaXRlZC1pbnRlcm5ldC1tZWRpYS5kZScpIHx8IHVybE9mU2NyaXB0LmluY2x1ZGVzKCcxdW5kMS5tZ3IuY29uc2Vuc3Uub3JnJykpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuX2NtcCA9IG5ldyBOb3RZZXRJbXBsZW1lbnRlZENtcCgxNjcsIHRoaXMuX2RvY3VtZW50LCAnMSYxIE1haWwgJiBNZWRpYSBHbWJIJywgdXJsT2ZTY3JpcHQsIHRoaXMuX2JhY2tlbmRDYWxsKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGVsc2UgaWYgKHVybE9mU2NyaXB0LmluY2x1ZGVzKCdvdXRsb29rLmxpdmUuY29tJykgfHwgdXJsT2ZTY3JpcHQuaW5jbHVkZXMoJ291dGxvb2subWdyLmNvbnNlbnN1Lm9yZycpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLl9jbXAgPSBuZXcgTm90WWV0SW1wbGVtZW50ZWRDbXAoMTY4LCB0aGlzLl9kb2N1bWVudCwgJ091dGxvb2suY29tIC0gTWljcm9zb2Z0IENvcnBvcmF0aW9uJywgdXJsT2ZTY3JpcHQsIHRoaXMuX2JhY2tlbmRDYWxsKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGVsc2UgaWYgKHVybE9mU2NyaXB0LmluY2x1ZGVzKCdtYXBweS5jb20nKSB8fCB1cmxPZlNjcmlwdC5pbmNsdWRlcygnbWFwcHkubWdyLmNvbnNlbnN1Lm9yZycpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLl9jbXAgPSBuZXcgTm90WWV0SW1wbGVtZW50ZWRDbXAoMTY5LCB0aGlzLl9kb2N1bWVudCwgJ01hcHB5JywgdXJsT2ZTY3JpcHQsIHRoaXMuX2JhY2tlbmRDYWxsKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGVsc2UgaWYgKHVybE9mU2NyaXB0LmluY2x1ZGVzKCdhZ29yYS5wbCcpIHx8IHVybE9mU2NyaXB0LmluY2x1ZGVzKCdhZ29yYS5tZ3IuY29uc2Vuc3Uub3JnJykpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuX2NtcCA9IG5ldyBOb3RZZXRJbXBsZW1lbnRlZENtcCgxNzAsIHRoaXMuX2RvY3VtZW50LCAnQUdPUkEgU0EnLCB1cmxPZlNjcmlwdCwgdGhpcy5fYmFja2VuZENhbGwpO1xuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgZWxzZSBpZiAodXJsT2ZTY3JpcHQuaW5jbHVkZXMoJ25hdGVtYXQucGwnKSB8fCB1cmxPZlNjcmlwdC5pbmNsdWRlcygnbmF0ZW1hdC5tZ3IuY29uc2Vuc3Uub3JnJykpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuX2NtcCA9IG5ldyBOb3RZZXRJbXBsZW1lbnRlZENtcCgxNzUsIHRoaXMuX2RvY3VtZW50LCAnR2xvYiAzNjAgU3AuIHogby5vLicsIHVybE9mU2NyaXB0LCB0aGlzLl9iYWNrZW5kQ2FsbCk7XG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBlbHNlIGlmICh1cmxPZlNjcmlwdC5pbmNsdWRlcygnbWFyZmVlbC5jb20nKSB8fCB1cmxPZlNjcmlwdC5pbmNsdWRlcygnbWFyZmVlbC5tZ3IuY29uc2Vuc3Uub3JnJykpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuX2NtcCA9IG5ldyBOb3RZZXRJbXBsZW1lbnRlZENtcCgxODEsIHRoaXMuX2RvY3VtZW50LCAnTWFyZmVlbCBTb2x1dGlvbnMgUy5MJywgdXJsT2ZTY3JpcHQsIHRoaXMuX2JhY2tlbmRDYWxsKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGVsc2UgaWYgKHVybE9mU2NyaXB0LmluY2x1ZGVzKCdzdWIydGVjaC5jb20nKSB8fCB1cmxPZlNjcmlwdC5pbmNsdWRlcygnMmNvbnNlbnQubWdyLmNvbnNlbnN1Lm9yZycpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLl9jbXAgPSBuZXcgTm90WWV0SW1wbGVtZW50ZWRDbXAoMTgzLCB0aGlzLl9kb2N1bWVudCwgJ1N1YjIgVGVjaG5vbG9naWVzIEx0ZCcsIHVybE9mU2NyaXB0LCB0aGlzLl9iYWNrZW5kQ2FsbCk7XG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBlbHNlIGlmICh1cmxPZlNjcmlwdC5pbmNsdWRlcygncGxheXdpcmUuY29tJykgfHwgdXJsT2ZTY3JpcHQuaW5jbHVkZXMoJ3BsYXl3aXJlLm1nci5jb25zZW5zdS5vcmcnKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5fY21wID0gbmV3IE5vdFlldEltcGxlbWVudGVkQ21wKDE4NSwgdGhpcy5fZG9jdW1lbnQsICdQbGF5d2lyZSBMTEMnLCB1cmxPZlNjcmlwdCwgdGhpcy5fYmFja2VuZENhbGwpO1xuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgZWxzZSBpZiAodXJsT2ZTY3JpcHQuaW5jbHVkZXMoJ3ZlbmF0dXNtZWRpYS5jb20nKSB8fCB1cmxPZlNjcmlwdC5pbmNsdWRlcygndmVuYXR1cy5tZ3IuY29uc2Vuc3Uub3JnJykpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuX2NtcCA9IG5ldyBOb3RZZXRJbXBsZW1lbnRlZENtcCgxODYsIHRoaXMuX2RvY3VtZW50LCAnVmVuYXR1cyBNZWRpYSBMaW1pdGVkJywgdXJsT2ZTY3JpcHQsIHRoaXMuX2JhY2tlbmRDYWxsKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGVsc2UgaWYgKHVybE9mU2NyaXB0LmluY2x1ZGVzKCdydHAucHQnKSB8fCB1cmxPZlNjcmlwdC5pbmNsdWRlcygncnRwLm1nci5jb25zZW5zdS5vcmcnKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5fY21wID0gbmV3IE5vdFlldEltcGxlbWVudGVkQ21wKDE5MywgdGhpcy5fZG9jdW1lbnQsICdSVFAgU0EnLCB1cmxPZlNjcmlwdCwgdGhpcy5fYmFja2VuZENhbGwpO1xuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgZWxzZSBpZiAodXJsT2ZTY3JpcHQuaW5jbHVkZXMoJ3NwaWxnYW1lcy5jb20nKSB8fCB1cmxPZlNjcmlwdC5pbmNsdWRlcygnc3BpbGdhbWVzLm1nci5jb25zZW5zdS5vcmcnKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5fY21wID0gbmV3IE5vdFlldEltcGxlbWVudGVkQ21wKDE5NCwgdGhpcy5fZG9jdW1lbnQsICdTcGlsIEdhbWVzIEIuVi4nLCB1cmxPZlNjcmlwdCwgdGhpcy5fYmFja2VuZENhbGwpO1xuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgZWxzZSBpZiAodXJsT2ZTY3JpcHQuaW5jbHVkZXMoJ253cy5haScpIHx8IHVybE9mU2NyaXB0LmluY2x1ZGVzKCdud3MubWdyLmNvbnNlbnN1Lm9yZycpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLl9jbXAgPSBuZXcgTm90WWV0SW1wbGVtZW50ZWRDbXAoMTk2LCB0aGlzLl9kb2N1bWVudCwgJ05ld3Nyb29tIEFJIEx0ZC4nLCB1cmxPZlNjcmlwdCwgdGhpcy5fYmFja2VuZENhbGwpO1xuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgZWxzZSBpZiAodXJsT2ZTY3JpcHQuaW5jbHVkZXMoJ3B1Ymx5LmNvbWVuJykgfHwgdXJsT2ZTY3JpcHQuaW5jbHVkZXMoJ3B1Ymx5Lm1nci5jb25zZW5zdS5vcmcnKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5fY21wID0gbmV3IE5vdFlldEltcGxlbWVudGVkQ21wKDE5NywgdGhpcy5fZG9jdW1lbnQsICdQdWJseSBsdGQnLCB1cmxPZlNjcmlwdCwgdGhpcy5fYmFja2VuZENhbGwpO1xuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgZWxzZSBpZiAodXJsT2ZTY3JpcHQuaW5jbHVkZXMoJ2JpdHF1ZWVuLmNvbScpIHx8IHVybE9mU2NyaXB0LmluY2x1ZGVzKCdiaXRxdWVlbi5tZ3IuY29uc2Vuc3Uub3JnJykpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuX2NtcCA9IG5ldyBOb3RZZXRJbXBsZW1lbnRlZENtcCgyMDUsIHRoaXMuX2RvY3VtZW50LCAnQml0IFEgSG9sZGluZ3MgTGltaXRlZCcsIHVybE9mU2NyaXB0LCB0aGlzLl9iYWNrZW5kQ2FsbCk7XG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBlbHNlIGlmICh1cmxPZlNjcmlwdC5pbmNsdWRlcygncGFnZXNqYXVuZXMuZnInKSB8fCB1cmxPZlNjcmlwdC5pbmNsdWRlcygncGFnZXNqYXVuZXMubWdyLmNvbnNlbnN1Lm9yZycpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLl9jbXAgPSBuZXcgTm90WWV0SW1wbGVtZW50ZWRDbXAoMjA2LCB0aGlzLl9kb2N1bWVudCwgJ1BBR0VTSkFVTkVTJywgdXJsT2ZTY3JpcHQsIHRoaXMuX2JhY2tlbmRDYWxsKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGVsc2UgaWYgKHVybE9mU2NyaXB0LmluY2x1ZGVzKCdnb2xkZW5iZWVzLmZyJykgfHwgdXJsT2ZTY3JpcHQuaW5jbHVkZXMoJ2dvbGRlbmJlZXMubWdyLmNvbnNlbnN1Lm9yZycpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLl9jbXAgPSBuZXcgTm90WWV0SW1wbGVtZW50ZWRDbXAoMjA4LCB0aGlzLl9kb2N1bWVudCwgJ0dvbGRlbiBCZWVzJywgdXJsT2ZTY3JpcHQsIHRoaXMuX2JhY2tlbmRDYWxsKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGVsc2UgaWYgKHVybE9mU2NyaXB0LmluY2x1ZGVzKCdsaWZlc3RyZWV0LmNvbScpIHx8IHVybE9mU2NyaXB0LmluY2x1ZGVzKCdsaWZlc3RyZWV0Lm1nci5jb25zZW5zdS5vcmcnKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5fY21wID0gbmV3IE5vdFlldEltcGxlbWVudGVkQ21wKDIwOSwgdGhpcy5fZG9jdW1lbnQsICdMaWZlU3RyZWV0IENvcnBvcmF0aW9uJywgdXJsT2ZTY3JpcHQsIHRoaXMuX2JhY2tlbmRDYWxsKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGVsc2UgaWYgKHVybE9mU2NyaXB0LmluY2x1ZGVzKCdzaW5nbGVzcG90LmNvbWVuJykgfHwgdXJsT2ZTY3JpcHQuaW5jbHVkZXMoJ3NpbmdsZXNwb3QubWdyLmNvbnNlbnN1Lm9yZycpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLl9jbXAgPSBuZXcgTm90WWV0SW1wbGVtZW50ZWRDbXAoMjEyLCB0aGlzLl9kb2N1bWVudCwgJ1NpbmdsZXNwb3QnLCB1cmxPZlNjcmlwdCwgdGhpcy5fYmFja2VuZENhbGwpO1xuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgZWxzZSBpZiAodXJsT2ZTY3JpcHQuaW5jbHVkZXMoJ2xlYm9uY29pbi5mcicpIHx8IHVybE9mU2NyaXB0LmluY2x1ZGVzKCdsYmMubWdyLmNvbnNlbnN1Lm9yZycpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLl9jbXAgPSBuZXcgTm90WWV0SW1wbGVtZW50ZWRDbXAoMjE0LCB0aGlzLl9kb2N1bWVudCwgJ0xCQyBGcmFuY2UnLCB1cmxPZlNjcmlwdCwgdGhpcy5fYmFja2VuZENhbGwpO1xuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgZWxzZSBpZiAodXJsT2ZTY3JpcHQuaW5jbHVkZXMoJ3JncGQtc21hcnRjbGlwLmNvbScpIHx8IHVybE9mU2NyaXB0LmluY2x1ZGVzKCdzbWFydGNsaXBsYXRhbS5tZ3IuY29uc2Vuc3Uub3JnJykpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuX2NtcCA9IG5ldyBOb3RZZXRJbXBsZW1lbnRlZENtcCgyMTUsIHRoaXMuX2RvY3VtZW50LCAnU21hcnRjbGlwIEhpc3BhbmlhIFMuTC4nLCB1cmxPZlNjcmlwdCwgdGhpcy5fYmFja2VuZENhbGwpO1xuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgZWxzZSBpZiAodXJsT2ZTY3JpcHQuaW5jbHVkZXMoJ2xpc3RvbmljLmNvbScpIHx8IHVybE9mU2NyaXB0LmluY2x1ZGVzKCdsaXN0b25pYy5tZ3IuY29uc2Vuc3Uub3JnJykpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuX2NtcCA9IG5ldyBOb3RZZXRJbXBsZW1lbnRlZENtcCgyMTYsIHRoaXMuX2RvY3VtZW50LCAnTGlzdG9uaWMgc3AuIHogby4gby4nLCB1cmxPZlNjcmlwdCwgdGhpcy5fYmFja2VuZENhbGwpO1xuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgZWxzZSBpZiAodXJsT2ZTY3JpcHQuaW5jbHVkZXMoJ2JtaW5kLmVzJykgfHwgdXJsT2ZTY3JpcHQuaW5jbHVkZXMoJ2JtaW5kLm1nci5jb25zZW5zdS5vcmcnKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5fY21wID0gbmV3IE5vdFlldEltcGxlbWVudGVkQ21wKDIxNywgdGhpcy5fZG9jdW1lbnQsICdCTUlORCBTQUxFUyBNQUtFUiBDT01QQU5ZIFMuTC4nLCB1cmxPZlNjcmlwdCwgdGhpcy5fYmFja2VuZENhbGwpO1xuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgZWxzZSBpZiAodXJsT2ZTY3JpcHQuaW5jbHVkZXMoJ3Jjc3B1YmJsaWNpdGEuaXQnKSB8fCB1cmxPZlNjcmlwdC5pbmNsdWRlcygncmNzbWVkaWFncm91cC5tZ3IuY29uc2Vuc3Uub3JnJykpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuX2NtcCA9IG5ldyBOb3RZZXRJbXBsZW1lbnRlZENtcCgyMTgsIHRoaXMuX2RvY3VtZW50LCAnUkNTIE1lZGlhR3JvdXAgUy5wLkEuJywgdXJsT2ZTY3JpcHQsIHRoaXMuX2JhY2tlbmRDYWxsKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGVsc2UgaWYgKHVybE9mU2NyaXB0LmluY2x1ZGVzKCdhbGxlZ3JvLnBsJykgfHwgdXJsT2ZTY3JpcHQuaW5jbHVkZXMoJ2FsbGVncm8ubWdyLmNvbnNlbnN1Lm9yZycpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLl9jbXAgPSBuZXcgTm90WWV0SW1wbGVtZW50ZWRDbXAoMjIwLCB0aGlzLl9kb2N1bWVudCwgJ0FsbGVncm8ucGwgU3AgeiBvLm8uJywgdXJsT2ZTY3JpcHQsIHRoaXMuX2JhY2tlbmRDYWxsKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGVsc2UgaWYgKHVybE9mU2NyaXB0LmluY2x1ZGVzKCdkZW50c3VhZWdpc25ldHdvcmsuZGUnKSB8fCB1cmxPZlNjcmlwdC5pbmNsdWRlcygnZGFuLm1nci5jb25zZW5zdS5vcmcnKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5fY21wID0gbmV3IE5vdFlldEltcGxlbWVudGVkQ21wKDIyMSwgdGhpcy5fZG9jdW1lbnQsICdEZW50c3UgQWVnaXMgTmV0d29yayBHZXJtYW55IEdtYkgnLCB1cmxPZlNjcmlwdCwgdGhpcy5fYmFja2VuZENhbGwpO1xuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgZWxzZSBpZiAodXJsT2ZTY3JpcHQuaW5jbHVkZXMoJ3BhcnV2ZW5kdS5mcicpIHx8IHVybE9mU2NyaXB0LmluY2x1ZGVzKCdwYXJ1dmVuZHUubWdyLmNvbnNlbnN1Lm9yZycpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLl9jbXAgPSBuZXcgTm90WWV0SW1wbGVtZW50ZWRDbXAoMjIyLCB0aGlzLl9kb2N1bWVudCwgJ1BhcnVWZW5kdS5mcicsIHVybE9mU2NyaXB0LCB0aGlzLl9iYWNrZW5kQ2FsbCk7XG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBlbHNlIGlmICh1cmxPZlNjcmlwdC5pbmNsdWRlcygnZ2VkaXNwYS5pdCcpIHx8IHVybE9mU2NyaXB0LmluY2x1ZGVzKCdnZWRpLm1nci5jb25zZW5zdS5vcmcnKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5fY21wID0gbmV3IE5vdFlldEltcGxlbWVudGVkQ21wKDIyMywgdGhpcy5fZG9jdW1lbnQsICdHZWRpIERpZ2l0YWwgcy5yLmwuJywgdXJsT2ZTY3JpcHQsIHRoaXMuX2JhY2tlbmRDYWxsKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGVsc2UgaWYgKCh1cmxPZlNjcmlwdC5pbmNsdWRlcygnZW5zaWdodGVuLmNvbScpIHx8IHVybE9mU2NyaXB0LmluY2x1ZGVzKCdlbnNpZ2h0ZW4ubWdyLmNvbnNlbnN1Lm9yZycpKSAmJiAhdXJsT2ZTY3JpcHQuaW5jbHVkZXMoJ25leHVzLmVuc2lnaHRlbi5jb20nKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5fY21wID0gbmV3IE5vdFlldEltcGxlbWVudGVkQ21wKDIyNCwgdGhpcy5fZG9jdW1lbnQsICdFbnNpZ2h0ZW4sIEluYycsIHVybE9mU2NyaXB0LCB0aGlzLl9iYWNrZW5kQ2FsbCk7XG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBlbHNlIGlmICh1cmxPZlNjcmlwdC5pbmNsdWRlcygnaWRtbmV0LmdydXBhenByLnBsJykgfHwgdXJsT2ZTY3JpcHQuaW5jbHVkZXMoJ2lkbW5ldC5tZ3IuY29uc2Vuc3Uub3JnJykpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuX2NtcCA9IG5ldyBOb3RZZXRJbXBsZW1lbnRlZENtcCgyMjUsIHRoaXMuX2RvY3VtZW50LCAnSW50ZXJuZXRvd3kgRG9tIE1lZGlvd3kgbmV0IFMuQS4nLCB1cmxPZlNjcmlwdCwgdGhpcy5fYmFja2VuZENhbGwpO1xuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgZWxzZSBpZiAodXJsT2ZTY3JpcHQuaW5jbHVkZXMoJ2dydXBwb2F0aGVzaXMuaXQnKSB8fCB1cmxPZlNjcmlwdC5pbmNsdWRlcygnZ3J1cHBvYXRoZXNpcy5tZ3IuY29uc2Vuc3Uub3JnJykpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuX2NtcCA9IG5ldyBOb3RZZXRJbXBsZW1lbnRlZENtcCgyMjYsIHRoaXMuX2RvY3VtZW50LCAnU29jaWV0w6AgQXRoZXNpcyBTLnAuQS4nLCB1cmxPZlNjcmlwdCwgdGhpcy5fYmFja2VuZENhbGwpO1xuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgZWxzZSBpZiAodXJsT2ZTY3JpcHQuaW5jbHVkZXMoJ2hlYWx0aGxpbmUuY29tJykgfHwgdXJsT2ZTY3JpcHQuaW5jbHVkZXMoJ2hlYWx0aGxpbmVtZWRpYS5tZ3IuY29uc2Vuc3Uub3JnJykpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuX2NtcCA9IG5ldyBOb3RZZXRJbXBsZW1lbnRlZENtcCgyMjcsIHRoaXMuX2RvY3VtZW50LCAnSGVhbHRobGluZSBNZWRpYSwgSW5jLicsIHVybE9mU2NyaXB0LCB0aGlzLl9iYWNrZW5kQ2FsbCk7XG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBlbHNlIGlmICh1cmxPZlNjcmlwdC5pbmNsdWRlcygndGhpcmRmbG9vci5pdCcpIHx8IHVybE9mU2NyaXB0LmluY2x1ZGVzKCd0aGlyZGZsb29yLm1nci5jb25zZW5zdS5vcmcnKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5fY21wID0gbmV3IE5vdFlldEltcGxlbWVudGVkQ21wKDIyOCwgdGhpcy5fZG9jdW1lbnQsICdUaGlyZGZsb29yIFNSTCcsIHVybE9mU2NyaXB0LCB0aGlzLl9iYWNrZW5kQ2FsbCk7XG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBlbHNlIGlmICh1cmxPZlNjcmlwdC5pbmNsdWRlcygnc25pZ2Vsd2ViLmNvbScpIHx8IHVybE9mU2NyaXB0LmluY2x1ZGVzKCdzbmlnZWx3ZWIubWdyLmNvbnNlbnN1Lm9yZycpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLl9jbXAgPSBuZXcgTm90WWV0SW1wbGVtZW50ZWRDbXAoMjI5LCB0aGlzLl9kb2N1bWVudCwgJ1NuaWdlbCBXZWIgU2VydmljZXMgTGltaXRlZCcsIHVybE9mU2NyaXB0LCB0aGlzLl9iYWNrZW5kQ2FsbCk7XG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBlbHNlIGlmICh1cmxPZlNjcmlwdC5pbmNsdWRlcygncHJ5d2F0bm9zYy5pbnRlcmlhLnBsJykgfHwgdXJsT2ZTY3JpcHQuaW5jbHVkZXMoJ2ludGVyaWEubWdyLmNvbnNlbnN1Lm9yZycpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLl9jbXAgPSBuZXcgTm90WWV0SW1wbGVtZW50ZWRDbXAoMjMxLCB0aGlzLl9kb2N1bWVudCwgJ0dydXBhIEludGVyaWEucGwgU3AuIHogby5vLiBzcC4gay4nLCB1cmxPZlNjcmlwdCwgdGhpcy5fYmFja2VuZENhbGwpO1xuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgZWxzZSBpZiAodXJsT2ZTY3JpcHQuaW5jbHVkZXMoJ2FkbnVudGl1cy5jb20nKSB8fCB1cmxPZlNjcmlwdC5pbmNsdWRlcygnYWRudW50aXVzY29uc2VudC5tZ3IuY29uc2Vuc3Uub3JnJykpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuX2NtcCA9IG5ldyBOb3RZZXRJbXBsZW1lbnRlZENtcCgyMzUsIHRoaXMuX2RvY3VtZW50LCAnQWRudW50aXVzIEFTJywgdXJsT2ZTY3JpcHQsIHRoaXMuX2JhY2tlbmRDYWxsKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGVsc2UgaWYgKHVybE9mU2NyaXB0LmluY2x1ZGVzKCd3ZWJhZHMubmwnKSB8fCB1cmxPZlNjcmlwdC5pbmNsdWRlcygnd2ViYWRzLm1nci5jb25zZW5zdS5vcmcnKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5fY21wID0gbmV3IE5vdFlldEltcGxlbWVudGVkQ21wKDIzNiwgdGhpcy5fZG9jdW1lbnQsICdXZWJBZHMgQi5WJywgdXJsT2ZTY3JpcHQsIHRoaXMuX2JhY2tlbmRDYWxsKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGVsc2UgaWYgKHVybE9mU2NyaXB0LmluY2x1ZGVzKCd0aWVtcG8uY29tJykgfHwgdXJsT2ZTY3JpcHQuaW5jbHVkZXMoJ21ldGVvcmVkLm1nci5jb25zZW5zdS5vcmcnKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5fY21wID0gbmV3IE5vdFlldEltcGxlbWVudGVkQ21wKDIzNywgdGhpcy5fZG9jdW1lbnQsICdBTFBSRUQgU0wnLCB1cmxPZlNjcmlwdCwgdGhpcy5fYmFja2VuZENhbGwpO1xuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgZWxzZSBpZiAodXJsT2ZTY3JpcHQuaW5jbHVkZXMoJ25ldHdvcmstbi5jb20nKSB8fCB1cmxPZlNjcmlwdC5pbmNsdWRlcygnbmV0d29ya24ubWdyLmNvbnNlbnN1Lm9yZycpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLl9jbXAgPSBuZXcgTm90WWV0SW1wbGVtZW50ZWRDbXAoMjQwLCB0aGlzLl9kb2N1bWVudCwgJ05ldHdvcmsgTiBMdGQnLCB1cmxPZlNjcmlwdCwgdGhpcy5fYmFja2VuZENhbGwpO1xuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgZWxzZSBpZiAodXJsT2ZTY3JpcHQuaW5jbHVkZXMoJ2NhZmVtZWRpYS5jb20nKSB8fCB1cmxPZlNjcmlwdC5pbmNsdWRlcygnY2FmZW1lZGlhLm1nci5jb25zZW5zdS5vcmcnKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5fY21wID0gbmV3IE5vdFlldEltcGxlbWVudGVkQ21wKDI0MSwgdGhpcy5fZG9jdW1lbnQsICdDYWZlTWVkaWEvQWRUaHJpdmUnLCB1cmxPZlNjcmlwdCwgdGhpcy5fYmFja2VuZENhbGwpO1xuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgZWxzZSBpZiAodXJsT2ZTY3JpcHQuaW5jbHVkZXMoJ25pdHJvcGF5LmNvbScpIHx8IHVybE9mU2NyaXB0LmluY2x1ZGVzKCduaXRyb3BheS5tZ3IuY29uc2Vuc3Uub3JnJykpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuX2NtcCA9IG5ldyBOb3RZZXRJbXBsZW1lbnRlZENtcCgyNDIsIHRoaXMuX2RvY3VtZW50LCAnR0cgU29mdHdhcmUsIExMQycsIHVybE9mU2NyaXB0LCB0aGlzLl9iYWNrZW5kQ2FsbCk7XG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBlbHNlIGlmICh1cmxPZlNjcmlwdC5pbmNsdWRlcygnbGl2aW5nbHltZWRpYS5jb20nKSB8fCB1cmxPZlNjcmlwdC5pbmNsdWRlcygnbGl2aW5nbHltZWRpYS5tZ3IuY29uc2Vuc3Uub3JnJykpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuX2NtcCA9IG5ldyBOb3RZZXRJbXBsZW1lbnRlZENtcCgyNDQsIHRoaXMuX2RvY3VtZW50LCAnTGl2aW5nbHkgTWVkaWEnLCB1cmxPZlNjcmlwdCwgdGhpcy5fYmFja2VuZENhbGwpO1xuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgZWxzZSBpZiAodXJsT2ZTY3JpcHQuaW5jbHVkZXMoJ292ZXJ3b2xmLmNvbScpIHx8IHVybE9mU2NyaXB0LmluY2x1ZGVzKCdvdmVyd29sZi5tZ3IuY29uc2Vuc3Uub3JnJykpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuX2NtcCA9IG5ldyBOb3RZZXRJbXBsZW1lbnRlZENtcCgyNDYsIHRoaXMuX2RvY3VtZW50LCAnT3ZlcndvbGYgTHRkLicsIHVybE9mU2NyaXB0LCB0aGlzLl9iYWNrZW5kQ2FsbCk7XG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBlbHNlIGlmICh1cmxPZlNjcmlwdC5pbmNsdWRlcygnc2V6bmFtLmN6JykgfHwgdXJsT2ZTY3JpcHQuaW5jbHVkZXMoJ3Nlem5hbS5tZ3IuY29uc2Vuc3Uub3JnJykpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuX2NtcCA9IG5ldyBOb3RZZXRJbXBsZW1lbnRlZENtcCgyNDcsIHRoaXMuX2RvY3VtZW50LCAnU2V6bmFtLmN6LCBhLnMuJywgdXJsT2ZTY3JpcHQsIHRoaXMuX2JhY2tlbmRDYWxsKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGVsc2UgaWYgKHVybE9mU2NyaXB0LmluY2x1ZGVzKCdtYWlyZHVtb250LW5ldGxldGl4LmNvbScpIHx8IHVybE9mU2NyaXB0LmluY2x1ZGVzKCdtZG54Y21wLm1nci5jb25zZW5zdS5vcmcnKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5fY21wID0gbmV3IE5vdFlldEltcGxlbWVudGVkQ21wKDI1MiwgdGhpcy5fZG9jdW1lbnQsICdNQUlSRFVNT05UIE5FVExFVElYIEdtYkgmQ28uIEtHJywgdXJsT2ZTY3JpcHQsIHRoaXMuX2JhY2tlbmRDYWxsKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGVsc2UgaWYgKHVybE9mU2NyaXB0LmluY2x1ZGVzKCdhZG1hdGljLmNvbS50cicpIHx8IHVybE9mU2NyaXB0LmluY2x1ZGVzKCdhZG1hdGljLm1nci5jb25zZW5zdS5vcmcnKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5fY21wID0gbmV3IE5vdFlldEltcGxlbWVudGVkQ21wKDI1NiwgdGhpcy5fZG9jdW1lbnQsICdBZE1hdGljIE1lZHlhIEFTJywgdXJsT2ZTY3JpcHQsIHRoaXMuX2JhY2tlbmRDYWxsKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGVsc2UgaWYgKHVybE9mU2NyaXB0LmluY2x1ZGVzKCdhdXRvbWF0dGljLmNvbScpIHx8IHVybE9mU2NyaXB0LmluY2x1ZGVzKCdhdXRvbWF0dGljLm1nci5jb25zZW5zdS5vcmcnKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5fY21wID0gbmV3IE5vdFlldEltcGxlbWVudGVkQ21wKDI1OCwgdGhpcy5fZG9jdW1lbnQsICdBdXRvbWF0dGljLCBJbmMuJywgdXJsT2ZTY3JpcHQsIHRoaXMuX2JhY2tlbmRDYWxsKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGVsc2UgaWYgKHVybE9mU2NyaXB0LmluY2x1ZGVzKCd0cnVlZGF0YS5jbycpIHx8IHVybE9mU2NyaXB0LmluY2x1ZGVzKCd0cnVlZGF0YS5tZ3IuY29uc2Vuc3Uub3JnJykpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuX2NtcCA9IG5ldyBOb3RZZXRJbXBsZW1lbnRlZENtcCgyNjIsIHRoaXMuX2RvY3VtZW50LCAnVHJ1ZURhdGEgU29sdXRpb25zLCBJbmMuJywgdXJsT2ZTY3JpcHQsIHRoaXMuX2JhY2tlbmRDYWxsKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGVsc2UgaWYgKHVybE9mU2NyaXB0LmluY2x1ZGVzKCdzZWN1cmVwcml2YWN5LmFpJykgfHwgdXJsT2ZTY3JpcHQuaW5jbHVkZXMoJ3NlY3VyZXByaXZhY3kubWdyLmNvbnNlbnN1Lm9yZycpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLl9jbXAgPSBuZXcgTm90WWV0SW1wbGVtZW50ZWRDbXAoMjY0LCB0aGlzLl9kb2N1bWVudCwgJ1NlY3VyZSBQcml2YWN5JywgdXJsT2ZTY3JpcHQsIHRoaXMuX2JhY2tlbmRDYWxsKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGVsc2UgaWYgKHVybE9mU2NyaXB0LmluY2x1ZGVzKCdhZHZmbi5jb20nKSB8fCB1cmxPZlNjcmlwdC5pbmNsdWRlcygnYWR2Zm4ubWdyLmNvbnNlbnN1Lm9yZycpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLl9jbXAgPSBuZXcgTm90WWV0SW1wbGVtZW50ZWRDbXAoMjY1LCB0aGlzLl9kb2N1bWVudCwgJ0FEVkZOIFBMQycsIHVybE9mU2NyaXB0LCB0aGlzLl9iYWNrZW5kQ2FsbCk7XG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBlbHNlIGlmICh1cmxPZlNjcmlwdC5pbmNsdWRlcygnbWVkbWUucGwnKSB8fCB1cmxPZlNjcmlwdC5pbmNsdWRlcygncGhhcm1hcGFydG5lci5tZ3IuY29uc2Vuc3Uub3JnJykpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuX2NtcCA9IG5ldyBOb3RZZXRJbXBsZW1lbnRlZENtcCgyNjgsIHRoaXMuX2RvY3VtZW50LCAnUGhhcm1hIFBhcnRuZXIgc3AuIHogby5vLicsIHVybE9mU2NyaXB0LCB0aGlzLl9iYWNrZW5kQ2FsbCk7XG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBlbHNlIGlmICh1cmxPZlNjcmlwdC5pbmNsdWRlcygnbmV4dDE0LmNvbScpIHx8IHVybE9mU2NyaXB0LmluY2x1ZGVzKCduZXh0MTQubWdyLmNvbnNlbnN1Lm9yZycpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLl9jbXAgPSBuZXcgTm90WWV0SW1wbGVtZW50ZWRDbXAoMjczLCB0aGlzLl9kb2N1bWVudCwgJ05leHQxNCBTcEEnLCB1cmxPZlNjcmlwdCwgdGhpcy5fYmFja2VuZENhbGwpO1xuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgZWxzZSBpZiAodXJsT2ZTY3JpcHQuaW5jbHVkZXMoJ2FsbGVyaG9sZGluZy5kaycpIHx8IHVybE9mU2NyaXB0LmluY2x1ZGVzKCdhbGxlci5tZ3IuY29uc2Vuc3Uub3JnJykpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuX2NtcCA9IG5ldyBOb3RZZXRJbXBsZW1lbnRlZENtcCgyNzQsIHRoaXMuX2RvY3VtZW50LCAnQWxsZXIgTWVkaWEnLCB1cmxPZlNjcmlwdCwgdGhpcy5fYmFja2VuZENhbGwpO1xuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgZWxzZSBpZiAodXJsT2ZTY3JpcHQuaW5jbHVkZXMoJ3JpbmdpZXJheGVsc3ByaW5nZXIucGwnKSB8fCB1cmxPZlNjcmlwdC5pbmNsdWRlcygncmFzcC5tZ3IuY29uc2Vuc3Uub3JnJykpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuX2NtcCA9IG5ldyBOb3RZZXRJbXBsZW1lbnRlZENtcCgyODAsIHRoaXMuX2RvY3VtZW50LCAnUmluZ2llciBBeGVsIFNwcmluZ2VyIFBvbHNrYScsIHVybE9mU2NyaXB0LCB0aGlzLl9iYWNrZW5kQ2FsbCk7XG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBlbHNlIGlmICh1cmxPZlNjcmlwdC5pbmNsdWRlcygncHVibmF0aXZlLm5ldCcpIHx8IHVybE9mU2NyaXB0LmluY2x1ZGVzKCdwdWJuYXRpdmUubWdyLmNvbnNlbnN1Lm9yZycpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLl9jbXAgPSBuZXcgTm90WWV0SW1wbGVtZW50ZWRDbXAoMjgxLCB0aGlzLl9kb2N1bWVudCwgJ1B1Yk5hdGl2ZSBHbWJIJywgdXJsT2ZTY3JpcHQsIHRoaXMuX2JhY2tlbmRDYWxsKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGVsc2UgaWYgKHVybE9mU2NyaXB0LmluY2x1ZGVzKCd0aGVmcmVlZGljdGlvbmFyeS5jb20nKSB8fCB1cmxPZlNjcmlwdC5pbmNsdWRlcygndGhlZnJlZWRpY3Rpb25hcnkubWdyLmNvbnNlbnN1Lm9yZycpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLl9jbXAgPSBuZXcgTm90WWV0SW1wbGVtZW50ZWRDbXAoMjgyLCB0aGlzLl9kb2N1bWVudCwgJ0ZhcmxleCBJbmMnLCB1cmxPZlNjcmlwdCwgdGhpcy5fYmFja2VuZENhbGwpO1xuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgZWxzZSBpZiAodXJsT2ZTY3JpcHQuaW5jbHVkZXMoJ29zYW5vLmNvbScpIHx8IHVybE9mU2NyaXB0LmluY2x1ZGVzKCdvc2Fuby5qcycpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLl9jbXAgPSBuZXcgTm90WWV0SW1wbGVtZW50ZWRDbXAoMjgyLCB0aGlzLl9kb2N1bWVudCwgJ09zYW5vIEluYy4sQ29va2llIENvbnNlbnQnLCB1cmxPZlNjcmlwdCwgdGhpcy5fYmFja2VuZENhbGwpO1xuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBmb3IgKGxldCBrZXkgaW4gYnV0dG9ucykge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCBidXR0b24gPSB0aGlzLl9kb2N1bWVudC5xdWVyeVNlbGVjdG9yKGtleSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKFV0aWxzLm9iamVjdENsaWNrYWJsZShidXR0b24pKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFV0aWxzLmxvZyhcIkJhY2tlbmQ6IFwiICsgdGhpcy5fYmFja2VuZENhbGwpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLl9jbXAgPSBuZXcgQ3VzdG9tSW1wbCh0aGlzLl9kb2N1bWVudCwga2V5LCB0aGlzLl9iYWNrZW5kQ2FsbCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrIGFsbFNjcmlwdHM7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9IC8vIEVsc2VcbiAgICAgICAgICAgICAgICB9IC8vIElGIC0gSmF2YVNjcmlwdCBpcyBEZWZpbmVkXG4gICAgICAgICAgICB9IC8vIEZvciBMb29wXG4gICAgICAgIH1cbiAgICAgICAgaWYgKHRoaXMuX2NtcCkge1xuICAgICAgICAgICAgVXRpbHMubG9nKFwiQ01QIGlzIHNldCBub3cuIENvbm5lY3QgdG8gT2JzZXJ2ZXIgaW4gbmV3IGNvbnRleHRcIik7XG4gICAgICAgICAgICAvLyByZW1vdmUgQ29ubmVjdGlvbiB0byB0aGUgbG9jYWwgT2JzZXJ2ZXJcbiAgICAgICAgICAgIHRoaXMuZGlzY29ubmVjdE9ic2VydmVyKCk7XG4gICAgICAgICAgICAvLyBub3cgY29ubmVjdCB0byB0aGUgT2JzZXJ2ZXIuXG4gICAgICAgICAgICB0aGlzLl9jbXAuY29ubmVjdCgpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgVXRpbHMubG9nKFwiLS0gUnVuIFRocnUgY29tcGxldGVkLiBObyBJbmRpY2F0b3IgZm9yIEphdmFTY3JpcHQgb2YgYSBDTVAgc28gZmFyLlwiKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBpbklmcmFtZSgpIHtcbiAgICB9XG59XG4iLCJcInVzZSBzdHJpY3RcIjtcbmNvbnN0IGRhdGVGb3JtYXQgPSByZXF1aXJlKFwiZGF0ZWZvcm1hdFwiKTtcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFV0aWxzIHtcbiAgICBzdGF0aWMgbG9nKG1lc3NhZ2UpIHtcbiAgICAgICAgY29uc29sZS5sb2coZGF0ZUZvcm1hdChuZXcgRGF0ZSgpLCAneXl5eS1tbS1kZCBISDpNTTpzcy5sJykgKyBcIiBcIiArIG1lc3NhZ2UpO1xuICAgIH1cbiAgICBzdGF0aWMgY3JlYXRlTWluaW1hbENvbnNlbnRCdXR0b24oZG9jdW1lbnQsIGphdmFTY3JpcHQpIHtcbiAgICAgICAgbGV0IGxpbmsgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdhJyk7XG4gICAgICAgIGxpbmsudGV4dCA9ICdNaW5pbWFsIENvbnNlbnQnO1xuICAgICAgICBsaW5rLnNldEF0dHJpYnV0ZShcImNsYXNzXCIsIFwibWluaW1hbC1jb25zZW50XCIpO1xuICAgICAgICBsaW5rLmhyZWYgPSBqYXZhU2NyaXB0O1xuICAgICAgICBkb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKGxpbmspO1xuICAgIH1cbiAgICBzdGF0aWMgb2JqZWN0Q2xpY2thYmxlKG15T2JqZWN0KSB7XG4gICAgICAgIHJldHVybiB0eXBlb2YgbXlPYmplY3QgIT09ICd1bmRlZmluZWQnICYmIG15T2JqZWN0ICYmIHR5cGVvZiBteU9iamVjdC5wYXJlbnRFbGVtZW50ICE9PSAndW5kZWZpbmVkJyAmJiBteU9iamVjdC5vZmZzZXRQYXJlbnQ7XG4gICAgfVxuICAgIHN0YXRpYyBvYmplY3RWaXNpYmxlKG15T2JqZWN0KSB7XG4gICAgICAgIHJldHVybiB0eXBlb2YgbXlPYmplY3QgIT09ICd1bmRlZmluZWQnICYmIG15T2JqZWN0ICYmIHR5cGVvZiBteU9iamVjdC5wYXJlbnRFbGVtZW50ICE9PSAndW5kZWZpbmVkJztcbiAgICB9XG4gICAgc3RhdGljIGNoZWNrSWZEZWZpbmVkQW5kTm90TnVsbChmaWVsZCkge1xuICAgICAgICByZXR1cm4gdHlwZW9mIGZpZWxkICE9PSAndW5kZWZpbmVkJyAmJiBmaWVsZCAhPT0gbnVsbDtcbiAgICB9XG59XG4iLCJcInVzZSBzdHJpY3RcIjtcbmltcG9ydCBVdGlscyBmcm9tIFwiLi4vVXRpbHNcIjtcbmltcG9ydCBDTVAgZnJvbSBcIi4vQ01QXCI7XG5pbXBvcnQgQ21wVHlwZSBmcm9tIFwiLi9DbXBUeXBlXCI7XG5leHBvcnQgZGVmYXVsdCBjbGFzcyBCb3JsYWJzIHtcbiAgICAvLyB0aGlzIGlzIG5vdCBhbiBJQUIgU29sdXRpb25cbiAgICBjb25zdHJ1Y3Rvcihub2RlLCBzY3JpcHRVcmwsIGJhY2tlbmRDYWxsKSB7XG4gICAgICAgIHRoaXMuX25hbWUgPSBcIkJvcmxhYnMubmV0XCI7XG4gICAgICAgIGJhY2tlbmRDYWxsLmNtcERhdGEoMTAwMDEsIHRoaXMuX25hbWUsIHNjcmlwdFVybCwgQ21wVHlwZS5ET19OT1RfV0FJVCwgdHJ1ZSk7XG4gICAgICAgIHRoaXMuX2NtcCA9IG5ldyBDTVAobm9kZSwgYmFja2VuZENhbGwsIHRoaXMpO1xuICAgIH1cbiAgICBnZXQgbmFtZSgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX25hbWU7XG4gICAgfVxuICAgIGNvbm5lY3QoKSB7XG4gICAgICAgIHRoaXMuX2NtcC5jb25uZWN0KCk7XG4gICAgfVxuICAgIC8qXG4gICAgaHR0cHM6Ly93d3cuMTIzZWZmaXppZW50ZGFiZWkuZGUvLCBodHRwczovL3d3dy5hYmlidWNoLWRlc2lnbmVyLmRlLywgaHR0cHM6Ly93d3cuc3RhdWJzYXVnZXItYmVyYXRlci5kZS8gaHR0cHM6Ly93d3cuYXJnZS5kZS9cbiAgICAgKi9cbiAgICBoYW5kbGVDbXAoKSB7XG4gICAgICAgIC8vIFN0ZXAgMVxuICAgICAgICBjb25zdCBwb3B1cCA9IFwiZGl2Ll9icmxicy1ib3gtd3JhcFwiO1xuICAgICAgICBsZXQgcG9wdXBEaXYgPSB0aGlzLl9jbXAucXVlcnlOb2RlU2VsZWN0b3IocG9wdXApO1xuICAgICAgICBjb25zdCBjaGVja2JveEluZGljdG9yID0gXCJkaXYuX2JybGJzLWNoZWNrYm94LWluZGljYXRvclwiO1xuICAgICAgICBsZXQgY2hlY2tib3hJbmRpY3RvckRpdiA9IHRoaXMuX2NtcC5xdWVyeU5vZGVTZWxlY3RvckFsbChjaGVja2JveEluZGljdG9yKTtcbiAgICAgICAgVXRpbHMubG9nKFwiY2hlY2tib3hJbmRpY3RvckRpdjogXCIgKyBjaGVja2JveEluZGljdG9yRGl2Lmxlbmd0aCk7XG4gICAgICAgIGNvbnN0IG1lZGlhID0gXCJpbnB1dCNjaGVja2JveC1leHRlcm5hbC1tZWRpYVwiO1xuICAgICAgICBsZXQgaW5wdXRNZWRpYSA9IHRoaXMuX2NtcC5xdWVyeU5vZGVTZWxlY3RvcihtZWRpYSk7XG4gICAgICAgIGNvbnN0IHN0YXRzID0gXCJpbnB1dCNjaGVja2JveC1zdGF0aXN0aWNzXCI7XG4gICAgICAgIGxldCBpbnB1dFN0YXRzID0gdGhpcy5fY21wLnF1ZXJ5Tm9kZVNlbGVjdG9yKHN0YXRzKTtcbiAgICAgICAgY29uc3QgbWFya2V0aW5nID0gXCJpbnB1dCNjaGVja2JveC1tYXJrZXRpbmdcIjtcbiAgICAgICAgbGV0IGlucHV0TWFya2V0aW5nID0gdGhpcy5fY21wLnF1ZXJ5Tm9kZVNlbGVjdG9yKG1hcmtldGluZyk7XG4gICAgICAgIGNvbnN0IHNhdmUgPSBcImEuX2JybGJzLWJ0blwiO1xuICAgICAgICBsZXQgc2F2ZUJ1dHRvbnMgPSB0aGlzLl9jbXAucXVlcnlOb2RlU2VsZWN0b3JBbGwoc2F2ZSk7XG4gICAgICAgIFV0aWxzLmxvZyhcInNhdmVCdXR0b25zOiBcIiArIHNhdmVCdXR0b25zLmxlbmd0aCk7XG4gICAgICAgIFV0aWxzLmxvZyhcIlN0YXRlOiBcIiArIHRoaXMuX2NtcC5zdGF0ZSk7XG4gICAgICAgIGlmIChVdGlscy5vYmplY3RDbGlja2FibGUocG9wdXBEaXYpICYmIHRoaXMuX2NtcC5zdGF0ZSA9PT0gMCkge1xuICAgICAgICAgICAgVXRpbHMubG9nKFwiRGl2IEZvdW5kXCIpO1xuICAgICAgICAgICAgaWYgKFV0aWxzLm9iamVjdENsaWNrYWJsZShpbnB1dE1lZGlhKSkge1xuICAgICAgICAgICAgICAgIFV0aWxzLmxvZyhcIkNsaWNrZWQgaW5wdXRNZWRpYVwiKTtcbiAgICAgICAgICAgICAgICBpbnB1dE1lZGlhLnNldEF0dHJpYnV0ZShcImNoZWNrZWRcIiwgXCJmYWxzZVwiKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChVdGlscy5vYmplY3RDbGlja2FibGUoaW5wdXRTdGF0cykpIHtcbiAgICAgICAgICAgICAgICBVdGlscy5sb2coXCJDbGlja2VkIGlucHV0U3RhdHN0XCIpO1xuICAgICAgICAgICAgICAgIGlucHV0U3RhdHMuc2V0QXR0cmlidXRlKFwiY2hlY2tlZFwiLCBcImZhbHNlXCIpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKFV0aWxzLm9iamVjdENsaWNrYWJsZShpbnB1dE1hcmtldGluZykpIHtcbiAgICAgICAgICAgICAgICBVdGlscy5sb2coXCJDbGlja2VkIGlucHV0TWFya2V0aW5nXCIpO1xuICAgICAgICAgICAgICAgIGlucHV0TWFya2V0aW5nLnNldEF0dHJpYnV0ZShcImNoZWNrZWRcIiwgXCJmYWxzZVwiKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGxldCBjbGlja2VkID0gZmFsc2U7XG4gICAgICAgICAgICBpZiAoc2F2ZUJ1dHRvbnMgJiYgc2F2ZUJ1dHRvbnMubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgICAgIHNhdmVCdXR0b25zLmZvckVhY2goZnVuY3Rpb24gKHNwYW4pIHtcbiAgICAgICAgICAgICAgICAgICAgVXRpbHMubG9nKHNwYW4uaW5uZXJIVE1MKTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHNwYW4uaW5uZXJIVE1MLmluY2x1ZGVzKFwiZXNzZW56aWVsbGVcIikpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHNwYW4uY2xpY2soKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIFV0aWxzLmxvZyhcIkNsaWNrZWQgb24gZXNzZW56aWVsbGVcIik7XG4gICAgICAgICAgICAgICAgICAgICAgICBjbGlja2VkID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBlbHNlIGlmIChzcGFuLmlubmVySFRNTC5pbmNsdWRlcyhcIlNwZWljaGVyblwiKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgc3Bhbi5jbGljaygpO1xuICAgICAgICAgICAgICAgICAgICAgICAgVXRpbHMubG9nKFwiQ2xpY2tlZCBvbiBTcGVpY2hlcm5cIik7XG4gICAgICAgICAgICAgICAgICAgICAgICBjbGlja2VkID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKGNsaWNrZWQpIHtcbiAgICAgICAgICAgICAgICBVdGlscy5sb2coXCJDbGlja2VkLCByZXNldCBub3dcIik7XG4gICAgICAgICAgICAgICAgdGhpcy5fY21wLnJlc2V0KCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG59XG4iLCJcInVzZSBzdHJpY3RcIjtcbmltcG9ydCBVdGlscyBmcm9tIFwiLi4vVXRpbHNcIjtcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIENNUCB7XG4gICAgY29uc3RydWN0b3Iobm9kZSwgYmFja2VuZENhbGwsIGNtcEltcGxlbWVudGF0aW9uKSB7XG4gICAgICAgIC8qKlxuICAgICAgICAgKiBDb25zdHJ1Y3RvciBmb3IgYW4gQWJzdHJhY3QgQ01QXG4gICAgICAgICAqXG4gICAgICAgICAqIEBwYXJhbSBub2RlIERvY3VtZW50IFJvb3QgTm9kZVxuICAgICAgICAgKiBAcGFyYW0gbmFtZSBOYW1lIGZvciB0aGUgQ01QIGluIFRleHRcbiAgICAgICAgICogQHBhcmFtIHNjcmlwdFVybCBVUkwgZnJvbSB3aXRoIHRoZSBDTVAgd2FzIGxvYWRlZFxuICAgICAgICAgKiBAcGFyYW0gdHlwZSBFbnVtZXJhdGlvbiBvbiBUeXBlIG9mIENNUCB0byBkZXRlcm1pbmUgd2hlbiB3ZSBuZWVkIHRvIHRyaWdnZXIgdGhlIGJhY2tlbmQgY2FsbC5cbiAgICAgICAgICovXG4gICAgICAgIHRoaXMuX2NvbmZpZyA9IHsgYXR0cmlidXRlczogdHJ1ZSwgY2hpbGRMaXN0OiB0cnVlLCBzdWJ0cmVlOiB0cnVlIH07XG4gICAgICAgIHRoaXMuX21pbmltYWxDb25zZW50TGluayA9IFwiYS5taW5pbWFsLWNvbnNlbnRcIjtcbiAgICAgICAgdGhpcy5fbWF4aW1hbExpbWl0T2ZEb21DaGFuZ2VUaWxsU3RvcCA9IDE1MDtcbiAgICAgICAgdGhpcy5fbm9kZSA9IG5vZGU7XG4gICAgICAgIHRoaXMuX3N0YXRlID0gMDtcbiAgICAgICAgdGhpcy5fY2FsbENvdW50ZXIgPSAwO1xuICAgICAgICB0aGlzLl9jbXBJbXBsZW1lbnRhdGlvbiA9IGNtcEltcGxlbWVudGF0aW9uO1xuICAgICAgICB0aGlzLl9iYWNrZW5kQ2FsbCA9IGJhY2tlbmRDYWxsO1xuICAgIH1cbiAgICBnZXQgc3RhdGUoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9zdGF0ZTtcbiAgICB9XG4gICAgc2V0IHN0YXRlKHN0YXRlKSB7XG4gICAgICAgIHRoaXMuX3N0YXRlID0gc3RhdGU7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIEdldHRpbmcgdGhlIFJvb3QgTm9kZSBvZiB0aGUgRG9jdW1lbnQgd2hlcmUgYSBDTVAgaXMgcnVubm5pbmdcbiAgICAgKlxuICAgICAqIEByZXR1cm5zIHsqfVxuICAgICAqL1xuICAgIGdldCBub2RlKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fbm9kZTtcbiAgICB9XG4gICAgZ2V0IG1pbmltYWxDb25zZW50TGluaygpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX21pbmltYWxDb25zZW50TGluaztcbiAgICB9XG4gICAgY29ubmVjdCgpIHtcbiAgICAgICAgbGV0IF9zZWxmID0gdGhpcztcbiAgICAgICAgdGhpcy5fb2JzZXJ2ZXIgPSBuZXcgTXV0YXRpb25PYnNlcnZlcihmdW5jdGlvbiAobXV0YXRpb25zKSB7XG4gICAgICAgICAgICBfc2VsZi5tYWluQ21wSGFuZGxlcihtdXRhdGlvbnMpO1xuICAgICAgICB9KTtcbiAgICAgICAgdGhpcy5fb2JzZXJ2ZXIub2JzZXJ2ZSh0aGlzLl9ub2RlLCB0aGlzLl9jb25maWcpO1xuICAgICAgICAvLyBpbiBjYXNlIHRoZXJlIGlzIG5vIERPTSBjaGFuZ2Ugb24gdGhlIHNpdGUgYXQgdGhpcyBwbGFjZSwgdGhlIEhhbmRsZXIgc2hvdWxkIHJ1biBhdCBsZWFzdCBvbmNlLlxuICAgICAgICB0aGlzLm1haW5DbXBIYW5kbGVyKG51bGwpO1xuICAgIH1cbiAgICBkaXNjb25uZWN0KCkge1xuICAgICAgICB0aGlzLl9vYnNlcnZlci5kaXNjb25uZWN0KCk7XG4gICAgICAgIHRoaXMuX3N0YXRlID0gLTE7XG4gICAgICAgIHRoaXMuX2NhbGxDb3VudGVyID0gMDtcbiAgICB9XG4gICAgLyoqXG4gICAgICogSGFuZGxlIHdoaWNoIGlzIGNhbGxlZCwgd2hlbiBhIG1vZGlmaWNhdGlvbiBpcyBkZXRlY3RlZC5cbiAgICAgKlxuICAgICAqIEBwYXJhbSBtdXRhdGlvbnNcbiAgICAgKi9cbiAgICBtYWluQ21wSGFuZGxlcihtdXRhdGlvbnMpIHtcbiAgICAgICAgVXRpbHMubG9nKFwiSGFuZGxpbmcgXCIgKyB0aGlzLl9jbXBJbXBsZW1lbnRhdGlvbi5uYW1lKTtcbiAgICAgICAgdGhpcy5fY2FsbENvdW50ZXIrKztcbiAgICAgICAgLy8gaWYgYWZ0ZXIgeCBjaGFuZ2VzIHRvIHRoZSBET00gdGhlcmUgYXMgbm90IHBvcHVwLCB3ZSBzdG9wIGxpc3RlbmluZyB0byB0aGUgY2hhbmdlcy5cbiAgICAgICAgaWYgKHRoaXMuX2NhbGxDb3VudGVyIDwgdGhpcy5fbWF4aW1hbExpbWl0T2ZEb21DaGFuZ2VUaWxsU3RvcCkge1xuICAgICAgICAgICAgdGhpcy5fY21wSW1wbGVtZW50YXRpb24uaGFuZGxlQ21wKCk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICB0aGlzLmRpc2Nvbm5lY3QoKTtcbiAgICAgICAgICAgIFV0aWxzLmxvZyhcIkxvb2tzIGxpa2UsIENNUCB3YXMgYWxyZWFkeSBnaXZlbiBjb25zZW50LlwiKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICAvKipcbiAgICAgKiBSZXNldCB0aGUgc3RhdGUgb2YgdGhlIENNUCBpZiB0aGUgQ29uc2VudCB3YXMgc3VjY2Vzc2Z1bGx5IGdpdmVuLiBNaWdodCB0cmlnZ2VyIGEgYmFja2VuZCBjYWxsLlxuICAgICAqL1xuICAgIHJlc2V0KCkge1xuICAgICAgICAvLyBJZiBldmVyeXRoaW5nIGlzIGZpbmUsIHJlbW92ZSB0aGUgbGlzdGVuZXIuXG4gICAgICAgIHRoaXMuX29ic2VydmVyLmRpc2Nvbm5lY3QoKTtcbiAgICAgICAgdGhpcy5fc3RhdGUgPSAtMTtcbiAgICAgICAgdGhpcy5fYmFja2VuZENhbGwuc3VjY2Vzc2Z1bEJsb2NrKCk7XG4gICAgICAgIFV0aWxzLmxvZygnQ29uc2VudCBmb3IgJyArIHRoaXMuX2NtcEltcGxlbWVudGF0aW9uLm5hbWUgKyAnIGRlbmllZC4nKTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogRmluZCBhIHNpbmdsZSBOb2RlIHZpYSBhIENTUyBTZWxlY3RvclxuICAgICAqIEBwYXJhbSBzZWxlY3RvciBDU1MgU2VsZWN0b3IgdG8gc2VhcmNoIGZvclxuICAgICAqIEByZXR1cm5zIHtFbGVtZW50IHwgYW55fVxuICAgICAqL1xuICAgIHF1ZXJ5Tm9kZVNlbGVjdG9yKHNlbGVjdG9yKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9ub2RlLnF1ZXJ5U2VsZWN0b3Ioc2VsZWN0b3IpO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBGaW5kcyBtdWx0aXBsZSBOb2RlcyB2aWEgYSBDU1MgU2VsZWN0b3IuXG4gICAgICogQHBhcmFtIHNlbGVjdG9yIENTUyBTZWxlY3RvciB0byBzZWFyY2ggZm9yXG4gICAgICogQHJldHVybnMge05vZGVMaXN0T2Y8SFRNTEVsZW1lbnRUYWdOYW1lTWFwWypdPiB8IE5vZGVMaXN0T2Y8RWxlbWVudD4gfCBOb2RlTGlzdE9mPFNWR0VsZW1lbnRUYWdOYW1lTWFwWypdPn1cbiAgICAgKi9cbiAgICBxdWVyeU5vZGVTZWxlY3RvckFsbChzZWxlY3Rvcikge1xuICAgICAgICByZXR1cm4gdGhpcy5fbm9kZS5xdWVyeVNlbGVjdG9yQWxsKHNlbGVjdG9yKTtcbiAgICB9XG59XG4iLCJcInVzZSBzdHJpY3RcIjtcbmltcG9ydCBVdGlscyBmcm9tIFwiLi4vVXRpbHNcIjtcbmltcG9ydCBDTVAgZnJvbSBcIi4vQ01QXCI7XG5pbXBvcnQgQ21wVHlwZSBmcm9tIFwiLi9DbXBUeXBlXCI7XG5leHBvcnQgZGVmYXVsdCBjbGFzcyBDaGFuZGFnbyB7XG4gICAgY29uc3RydWN0b3Iobm9kZSwgc2NyaXB0VXJsLCBiYWNrZW5kQ2FsbCkge1xuICAgICAgICB0aGlzLl9uYW1lID0gXCJDaGFuZGFnb1wiO1xuICAgICAgICBiYWNrZW5kQ2FsbC5jbXBEYXRhKDIsIHRoaXMuX25hbWUsIHNjcmlwdFVybCwgQ21wVHlwZS5XQUlUX0ZPUl9BU1lOQ19DQUxMQkFDSywgdHJ1ZSk7XG4gICAgICAgIHRoaXMuX2NtcCA9IG5ldyBDTVAobm9kZSwgYmFja2VuZENhbGwsIHRoaXMpO1xuICAgIH1cbiAgICBnZXQgbmFtZSgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX25hbWU7XG4gICAgfVxuICAgIGNvbm5lY3QoKSB7XG4gICAgICAgIHRoaXMuX2NtcC5jb25uZWN0KCk7XG4gICAgfVxuICAgIGhhbmRsZUNtcCgpIHtcbiAgICAgICAgY29uc3QgY2hhbmRhZ29CdXR0b25EZW55Q3NzID0gXCJidXR0b24uZGVueVwiO1xuICAgICAgICBsZXQgY2hhbmRhZ29CdXR0b25EZW55ID0gdGhpcy5fY21wLnF1ZXJ5Tm9kZVNlbGVjdG9yKGNoYW5kYWdvQnV0dG9uRGVueUNzcyk7XG4gICAgICAgIGlmIChVdGlscy5vYmplY3RDbGlja2FibGUoY2hhbmRhZ29CdXR0b25EZW55KSAmJiB0aGlzLl9jbXAuc3RhdGUgPT09IDApIHtcbiAgICAgICAgICAgIFV0aWxzLmxvZyhcIkNsaWNrIERlbnkgbm93XCIpO1xuICAgICAgICAgICAgLy8gbG9va3MgbGlrZSB0aGlzIGRvZXMgbm90IHdvcmsuXG4gICAgICAgICAgICBjaGFuZGFnb0J1dHRvbkRlbnkuY2xpY2soKTtcbiAgICAgICAgICAgIFV0aWxzLmxvZygnQ29uc2VudCBvbiBkZW5pZWQuJyk7XG4gICAgICAgICAgICB0aGlzLl9jbXAucmVzZXQoKTtcbiAgICAgICAgfVxuICAgIH1cbn1cbiIsIlwidXNlIHN0cmljdFwiO1xudmFyIENtcFR5cGU7XG4oZnVuY3Rpb24gKENtcFR5cGUpIHtcbiAgICBDbXBUeXBlW1wiV0FJVF9GT1JfQVNZTkNfQ0FMTEJBQ0tcIl0gPSBcIldlIHdhaXQgdW50aWwgdGhlIEphdmFTY3JpcHQgT2JqZWN0IG9uIHRoZSBQYWdlIGZvciB0aGUgQ01QIHdhcyBmb3VuZFwiO1xuICAgIENtcFR5cGVbXCJXQUlUX0ZPUl9USU1FX0ZSQU1FXCJdID0gXCJXZSB3YWl0IHRpbGwgdGhlIENhbGxiYWNrIHNob3VsZCBmaXJlIChtYXhpbWFsIDUgc2Vjb25kczsgMjUgeCAyMDAgbXNcIjtcbiAgICBDbXBUeXBlW1wiRE9fTk9UX1dBSVRcIl0gPSBcIldlIGRvbid0IHdhaXQgZm9yIGEgY2FsbGJhY2ssIGFzIHdlIGtub3cgdGhlIENNUCBpcyBub3QgVENGIGNvbXBsaWFudFwiO1xufSkoQ21wVHlwZSB8fCAoQ21wVHlwZSA9IHt9KSk7XG5leHBvcnQgZGVmYXVsdCBDbXBUeXBlO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5pbXBvcnQgVXRpbHMgZnJvbSBcIi4uL1V0aWxzXCI7XG5pbXBvcnQgQ01QIGZyb20gXCIuL0NNUFwiO1xuaW1wb3J0IENtcFR5cGUgZnJvbSBcIi4vQ21wVHlwZVwiO1xuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQ29uc2VudE1hbmFnZXIge1xuICAgIGNvbnN0cnVjdG9yKG5vZGUsIHNjcmlwdFVybCwgYmFja2VuZENhbGwpIHtcbiAgICAgICAgdGhpcy5fbmFtZSA9IFwiQ29uc2VudE1hbmFnZXIubmV0XCI7XG4gICAgICAgIGJhY2tlbmRDYWxsLmNtcERhdGEoMzEsIHRoaXMuX25hbWUsIHNjcmlwdFVybCwgQ21wVHlwZS5XQUlUX0ZPUl9BU1lOQ19DQUxMQkFDSywgdHJ1ZSk7XG4gICAgICAgIHRoaXMuX2NtcCA9IG5ldyBDTVAobm9kZSwgYmFja2VuZENhbGwsIHRoaXMpO1xuICAgIH1cbiAgICBnZXQgbmFtZSgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX25hbWU7XG4gICAgfVxuICAgIGNvbm5lY3QoKSB7XG4gICAgICAgIHRoaXMuX2NtcC5jb25uZWN0KCk7XG4gICAgfVxuICAgIGhhbmRsZUNtcCgpIHtcbiAgICAgICAgY29uc3QgZGVueSA9ICcjY21wYm50bm90eHQnO1xuICAgICAgICBsZXQgYnV0dG9uRGVueSA9IHRoaXMuX2NtcC5xdWVyeU5vZGVTZWxlY3RvcihkZW55KTtcbiAgICAgICAgaWYgKFV0aWxzLm9iamVjdENsaWNrYWJsZShidXR0b25EZW55KSAmJiB0aGlzLl9jbXAuc3RhdGUgPT09IDApIHtcbiAgICAgICAgICAgIGJ1dHRvbkRlbnkuY2xpY2soKTtcbiAgICAgICAgICAgIHRoaXMuX2NtcC5yZXNldCgpO1xuICAgICAgICB9XG4gICAgICAgIC8vIFRPRE86IFJlcXVpcmVzIGEgc2Vjb25kIFN0ZXAgZm9yIHRoZSB1Z2x5IGd1aXMuXG4gICAgICAgIC8vIEN1cnJlbnRseSB0aGVyZSBpcyBhIDxhIGhyZWY9JyMnIHdpdGggYW4gb24gQ2xpY2sgQWN0aW9uIHdoaWNoIGlzIGEgYml0IHBhaW5mdWwgdG8gaGFuZGxlXG4gICAgfVxufVxuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5pbXBvcnQgVXRpbHMgZnJvbSBcIi4uL1V0aWxzXCI7XG5pbXBvcnQgQ01QIGZyb20gXCIuL0NNUFwiO1xuaW1wb3J0IENtcFR5cGUgZnJvbSBcIi4vQ21wVHlwZVwiO1xuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQ29va2llQm90IHtcbiAgICBjb25zdHJ1Y3Rvcihub2RlLCBzY3JpcHRVcmwsIGJhY2tlbmRDYWxsKSB7XG4gICAgICAgIHRoaXMuX25hbWUgPSBcIkNvb2tpZUJvdFwiO1xuICAgICAgICBiYWNrZW5kQ2FsbC5jbXBEYXRhKDEzNCwgdGhpcy5fbmFtZSwgc2NyaXB0VXJsLCBDbXBUeXBlLkRPX05PVF9XQUlULCB0cnVlKTtcbiAgICAgICAgdGhpcy5fY21wID0gbmV3IENNUChub2RlLCBiYWNrZW5kQ2FsbCwgdGhpcyk7XG4gICAgfVxuICAgIGdldCBuYW1lKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fbmFtZTtcbiAgICB9XG4gICAgY29ubmVjdCgpIHtcbiAgICAgICAgdGhpcy5fY21wLmNvbm5lY3QoKTtcbiAgICB9XG4gICAgLyogIGh0dHBzOi8vd3d3LmNvb2tpZWJvdC5jb20vZGUvXG4gICAgICAgIGh0dHBzOi8vd3d3LmdpdGxhYi5jb20vXG4gICAgICAgIGh0dHBzOi8vd3d3LmFwcGxhdXNlLmNvbS9cbiAgICAgICAgaHR0cHM6Ly93d3cuZ2FsZXJpYS5kZS9cbiAgICAgICAgaHR0cHM6Ly9zaWducmVxdWVzdC5jb20vIy8gPT4gQ29va2llQm90XG4gICAgICAgIGh0dHBzOi8vdm9sa3NibGF0dC5hdC8gPT4gQ29va2llIEJvdFxuICAgICAgICBodHRwczovL3d3dy56dXNhbW1lbmdlZ2VuY29yb25hLmRlL1xuICAgICAgICBodHRwczovL2RlLnNjYWxhYmxlLmNhcGl0YWwvID0+IG5vdCB3b3JraW5nIVxuICAgICAgICBodHRwczovL3d3dy5sdjE4NzEuZGUvbHYvXG4gICAgICAgIGh0dHBzOi8vd3d3LmFkdm9jYWRvLmRlL1xuXG4gICAgICovXG4gICAgaGFuZGxlQ21wKCkge1xuICAgICAgICBjb25zdCBjb29raWVib3RDaGVja2JveGVzU2VsZWN0b3IgPSBcImlucHV0W3R5cGUqPSdjaGVja2JveCddXCI7XG4gICAgICAgIGxldCBjb29raWVib3RDaGVja0JveGVzID0gdGhpcy5fY21wLnF1ZXJ5Tm9kZVNlbGVjdG9yQWxsKGNvb2tpZWJvdENoZWNrYm94ZXNTZWxlY3Rvcik7XG4gICAgICAgIFV0aWxzLmxvZyhcImNvb2tpZWJvdENoZWNrQm94ZXM6IFwiICsgY29va2llYm90Q2hlY2tCb3hlcy5sZW5ndGgpO1xuICAgICAgICBjb25zdCBhbGxvd1NlbGVjdGVkU2VsZWN0b3IxID0gXCJhI0N5Ym90Q29va2llYm90RGlhbG9nQm9keUxldmVsQnV0dG9uTGV2ZWxPcHRpbkFsbG93YWxsU2VsZWN0aW9uXCI7XG4gICAgICAgIGxldCBhbGxvd0FsbEJ1dHRvbjEgPSB0aGlzLl9jbXAucXVlcnlOb2RlU2VsZWN0b3IoYWxsb3dTZWxlY3RlZFNlbGVjdG9yMSk7XG4gICAgICAgIGNvbnN0IGFsbG93U2VsZWN0ZWRTZWxlY3RvcjIgPSBcImEjQ3lib3RDb29raWVib3REaWFsb2dCb2R5TGV2ZWxCdXR0b25BY2NlcHRcIjtcbiAgICAgICAgbGV0IGFsbG93QWxsQnV0dG9uMiA9IHRoaXMuX2NtcC5xdWVyeU5vZGVTZWxlY3RvcihhbGxvd1NlbGVjdGVkU2VsZWN0b3IyKTtcbiAgICAgICAgY29uc3QgYWxsb3dTZWxlY3RlZFNlbGVjdG9yMyA9IFwiYSNDeWJvdENvb2tpZWJvdERpYWxvZ0JvZHlCdXR0b25BY2NlcHRcIjtcbiAgICAgICAgY29uc3QgYWxsb3dBbGxCdXR0b24zID0gdGhpcy5fY21wLnF1ZXJ5Tm9kZVNlbGVjdG9yKGFsbG93U2VsZWN0ZWRTZWxlY3RvcjMpO1xuICAgICAgICBjb25zdCBkZXRhaWxzU2VsZWN0b3IxID0gXCJhI0N5Ym90Q29va2llYm90RGlhbG9nQm9keUJ1dHRvbkRldGFpbHNcIjtcbiAgICAgICAgY29uc3QgZGV0YWlsc0J1dHRvbjEgPSB0aGlzLl9jbXAucXVlcnlOb2RlU2VsZWN0b3IoZGV0YWlsc1NlbGVjdG9yMSk7XG4gICAgICAgIGNvbnN0IGRldGFpbHNTZWxlY3RvcjIgPSBcImEjQ3lib3RDb29raWVib3REaWFsb2dCb2R5TGV2ZWxEZXRhaWxzQnV0dG9uXCI7XG4gICAgICAgIGNvbnN0IGRldGFpbHNCdXR0b24yID0gdGhpcy5fY21wLnF1ZXJ5Tm9kZVNlbGVjdG9yKGRldGFpbHNTZWxlY3RvcjIpO1xuICAgICAgICAvLyBDYXNlIDE6XG4gICAgICAgIC8vIGlmIHRoZXJlIGlzIHRoZSBvcHRpb24gdG8gZGVueSBhbHJlYWR5IG9uIHRoZSBmaXJzdCBwYWdlIC0gZG8gc28uXG4gICAgICAgIC8vIFRlc3QgUGFnZTogaHR0cHM6Ly93d3cucG9zc2libGVub3cuY29tLywgaHR0cHM6Ly9lbW9qaXRlcnJhLmNvbS8gKGNsaWNrIG9uIFwib25seSByZWxldmFudCBjb29raWVzKVxuICAgICAgICBpZiAoKFV0aWxzLm9iamVjdENsaWNrYWJsZShkZXRhaWxzQnV0dG9uMSkgfHwgVXRpbHMub2JqZWN0Q2xpY2thYmxlKGRldGFpbHNCdXR0b24yKSkgJiYgdGhpcy5fY21wLnN0YXRlID09PSAwKSB7XG4gICAgICAgICAgICBVdGlscy5sb2coXCJTdGVwIDE6IFNob3cgRGV0YWlsc1wiKTtcbiAgICAgICAgICAgIGlmIChVdGlscy5vYmplY3RDbGlja2FibGUoZGV0YWlsc0J1dHRvbjEpKSB7XG4gICAgICAgICAgICAgICAgVXRpbHMubG9nKFwiRGV0YWlscyBUeXBlIDFcIik7XG4gICAgICAgICAgICAgICAgZGV0YWlsc0J1dHRvbjEuY2xpY2soKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChVdGlscy5vYmplY3RDbGlja2FibGUoZGV0YWlsc0J1dHRvbjIpKSB7XG4gICAgICAgICAgICAgICAgVXRpbHMubG9nKFwiRGV0YWlscyBUeXBlIDJcIik7XG4gICAgICAgICAgICAgICAgZGV0YWlsc0J1dHRvbjIuY2xpY2soKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRoaXMuX2NtcC5zdGF0ZSA9IDE7XG4gICAgICAgIH0gLy8gVGVzdCBQYWdlOiBodHRwczovL3d3dy5jb29raWVib3QuY29tL2RlLywgaHR0cHM6Ly93d3cuZ2l0bGFiLmNvbS8sIGh0dHBzOi8vd3d3LmFwcGxhdXNlLmNvbS8gKGNoZWNrIGJveGVzIG9uIEJhbm5lcilcbiAgICAgICAgZWxzZSBpZiAoY29va2llYm90Q2hlY2tCb3hlcy5sZW5ndGggPiAwICYmIChVdGlscy5vYmplY3RDbGlja2FibGUoYWxsb3dBbGxCdXR0b24xKSB8fCBVdGlscy5vYmplY3RDbGlja2FibGUoYWxsb3dBbGxCdXR0b24yKSB8fCBVdGlscy5vYmplY3RDbGlja2FibGUoYWxsb3dBbGxCdXR0b24zKSkgJiYgdGhpcy5fY21wLnN0YXRlID09PSAxKSB7XG4gICAgICAgICAgICBVdGlscy5sb2coXCJDYXNlIDI6IENvb2tpZUJvdCBCYW5uZXIgKyBDaGVja2JveGVzIGZvdW5kXCIpO1xuICAgICAgICAgICAgY29va2llYm90Q2hlY2tCb3hlcy5mb3JFYWNoKGZ1bmN0aW9uIChjaGVja2JveCkge1xuICAgICAgICAgICAgICAgIGNoZWNrYm94LnNldEF0dHJpYnV0ZShcImNoZWNrZWRcIiwgXCJmYWxzZVwiKTtcbiAgICAgICAgICAgICAgICBVdGlscy5sb2coXCJDaGVja2JveCB1bnNldFwiKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgaWYgKFV0aWxzLm9iamVjdENsaWNrYWJsZShhbGxvd0FsbEJ1dHRvbjEpKSB7XG4gICAgICAgICAgICAgICAgVXRpbHMubG9nKFwiQWNjZXB0IFR5cGUgMVwiKTtcbiAgICAgICAgICAgICAgICBhbGxvd0FsbEJ1dHRvbjEuY2xpY2soKTtcbiAgICAgICAgICAgICAgICBzZXRUaW1lb3V0KGFsbG93QWxsQnV0dG9uMS5jbGljaygpLCA1MDApO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKFV0aWxzLm9iamVjdENsaWNrYWJsZShhbGxvd0FsbEJ1dHRvbjIpKSB7XG4gICAgICAgICAgICAgICAgVXRpbHMubG9nKFwiQWNjZXB0IFR5cGUgMlwiKTtcbiAgICAgICAgICAgICAgICBhbGxvd0FsbEJ1dHRvbjIuY2xpY2soKTtcbiAgICAgICAgICAgICAgICBzZXRUaW1lb3V0KGFsbG93QWxsQnV0dG9uMi5jbGljaygpLCA1MDApO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKFV0aWxzLm9iamVjdENsaWNrYWJsZShhbGxvd0FsbEJ1dHRvbjMpKSB7XG4gICAgICAgICAgICAgICAgVXRpbHMubG9nKFwiQWNjZXB0IFR5cGUgM1wiKTtcbiAgICAgICAgICAgICAgICBhbGxvd0FsbEJ1dHRvbjMuY2xpY2soKTtcbiAgICAgICAgICAgICAgICBzZXRUaW1lb3V0KGFsbG93QWxsQnV0dG9uMy5jbGljaygpLCA1MDApO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGhpcy5fY21wLnJlc2V0KCk7XG4gICAgICAgIH1cbiAgICAgICAgLy8gdGhpcyBpcyBhIHNwZWNpYWwgQ2FzZSBmb3IgVjIuIFRoZSBCYW5uZXIgd2FzIGZvdW5kIGFuZCB3ZSBvbmx5IGNsaWNrIG9uIHRoZSBEZW55IEJ1dHRvbi5cbiAgICB9XG59XG4iLCJcInVzZSBzdHJpY3RcIjtcbmltcG9ydCBVdGlscyBmcm9tIFwiLi4vVXRpbHNcIjtcbmltcG9ydCBDTVAgZnJvbSBcIi4vQ01QXCI7XG5pbXBvcnQgQ21wVHlwZSBmcm9tIFwiLi9DbXBUeXBlXCI7XG5leHBvcnQgZGVmYXVsdCBjbGFzcyBDdXN0b21JbXBsIHtcbiAgICBjb25zdHJ1Y3Rvcihub2RlLCBrZXksIGJhY2tlbmRDYWxsKSB7XG4gICAgICAgIHRoaXMuX25hbWUgPSBcIkN1c3RvbSBJbXBsZW1lbnRhdGlvblwiO1xuICAgICAgICBiYWNrZW5kQ2FsbC5jbXBEYXRhKDAsIHRoaXMuX25hbWUsIFwibmFcIiwgQ21wVHlwZS5ET19OT1RfV0FJVCwgdHJ1ZSk7XG4gICAgICAgIHRoaXMuX2NtcCA9IG5ldyBDTVAobm9kZSwgYmFja2VuZENhbGwsIHRoaXMpO1xuICAgICAgICB0aGlzLl9idXR0b24gPSBrZXk7XG4gICAgfVxuICAgIGdldCBuYW1lKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fbmFtZTtcbiAgICB9XG4gICAgY29ubmVjdCgpIHtcbiAgICAgICAgdGhpcy5fY21wLmNvbm5lY3QoKTtcbiAgICB9XG4gICAgaGFuZGxlQ21wKCkge1xuICAgICAgICBsZXQgYnV0dG9uID0gdGhpcy5fY21wLnF1ZXJ5Tm9kZVNlbGVjdG9yKHRoaXMuX2J1dHRvbik7XG4gICAgICAgIGlmIChVdGlscy5vYmplY3RDbGlja2FibGUoYnV0dG9uKSAmJiB0aGlzLl9jbXAuc3RhdGUgPT09IDApIHtcbiAgICAgICAgICAgIFV0aWxzLmxvZyhcIkJ1dHRvbiBGb3VuZCwgY2xpY2tpbmdcIik7XG4gICAgICAgICAgICBidXR0b24uY2xpY2soKTtcbiAgICAgICAgICAgIHRoaXMuX2NtcC5yZXNldCgpO1xuICAgICAgICB9XG4gICAgfVxufVxuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5pbXBvcnQgVXRpbHMgZnJvbSBcIi4uL1V0aWxzXCI7XG5pbXBvcnQgQ01QIGZyb20gXCIuL0NNUFwiO1xuaW1wb3J0IENtcFR5cGUgZnJvbSBcIi4vQ21wVHlwZVwiO1xuZXhwb3J0IGRlZmF1bHQgY2xhc3MgRGlEb01pIHtcbiAgICBjb25zdHJ1Y3Rvcihub2RlLCBzY3JpcHRVcmwsIGJhY2tlbmRDYWxsKSB7XG4gICAgICAgIHRoaXMuX25hbWUgPSBcIkRpZG9taS5uZXRcIjtcbiAgICAgICAgYmFja2VuZENhbGwuY21wRGF0YSg3LCB0aGlzLl9uYW1lLCBzY3JpcHRVcmwsIENtcFR5cGUuV0FJVF9GT1JfQVNZTkNfQ0FMTEJBQ0ssIHRydWUpO1xuICAgICAgICB0aGlzLl9jbXAgPSBuZXcgQ01QKG5vZGUsIGJhY2tlbmRDYWxsLCB0aGlzKTtcbiAgICB9XG4gICAgZ2V0IG5hbWUoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9uYW1lO1xuICAgIH1cbiAgICBjb25uZWN0KCkge1xuICAgICAgICB0aGlzLl9jbXAuY29ubmVjdCgpO1xuICAgIH1cbiAgICAvKlxuICAgIGh0dHBzOi8vd3d3Lm1hcmlhbm5lLm5ldC8sIGh0dHBzOi8vd3d3Lmxhdm9peGR1bm9yZC5mci8sIGh0dHBzOi8vd3d3LnRvbXNndWlkZS5mci8sIGh0dHBzOi8vd3d3LmdlbmVyYXRpb24tbnQuY29tL1xuICAgICAqL1xuICAgIGhhbmRsZUNtcCgpIHtcbiAgICAgICAgLy8gU3RlcCAxXG4gICAgICAgIGNvbnN0IHBvcHVwID0gXCJkaXYuZGlkb21pLXBvcHVwLWNvbnRhaW5lclwiO1xuICAgICAgICBsZXQgcG9wdXBEaXYgPSB0aGlzLl9jbXAucXVlcnlOb2RlU2VsZWN0b3IocG9wdXApO1xuICAgICAgICBjb25zdCBkZXRhaWxzID0gXCJidXR0b24jZGlkb21pLW5vdGljZS1sZWFybi1tb3JlLWJ1dHRvblwiO1xuICAgICAgICBsZXQgZGV0YWlsc0J1dHRvbiA9IHRoaXMuX2NtcC5xdWVyeU5vZGVTZWxlY3RvcihkZXRhaWxzKTtcbiAgICAgICAgVXRpbHMubG9nKFwiZGV0YWlsc0J1dHRvbjogXCIgKyBKU09OLnN0cmluZ2lmeShkZXRhaWxzQnV0dG9uKSk7XG4gICAgICAgIC8vIFN0ZXAxIDJcbiAgICAgICAgY29uc3QgcmVmdXNlciA9IFwiYnV0dG9uLmRpZG9taS1jb21wb25lbnRzLXJhZGlvX19vcHRpb25cIjtcbiAgICAgICAgbGV0IHJlZnVzZXJCdXR0b24gPSB0aGlzLl9jbXAucXVlcnlOb2RlU2VsZWN0b3JBbGwocmVmdXNlcik7XG4gICAgICAgIFV0aWxzLmxvZyhcInJlZnVzZXJCdXR0b24gbGVuZ3RoOiBcIiArIHJlZnVzZXJCdXR0b24ubGVuZ3RoKTtcbiAgICAgICAgY29uc3QgZW5yZWdpc3RyZXIgPSBcImJ1dHRvbi5kaWRvbWktY29tcG9uZW50cy1idXR0b25cIjtcbiAgICAgICAgbGV0IGVucmVnaXN0cmVyQnV0dG9uID0gdGhpcy5fY21wLnF1ZXJ5Tm9kZVNlbGVjdG9yQWxsKGVucmVnaXN0cmVyKTtcbiAgICAgICAgVXRpbHMubG9nKFwiZW5yZWdpc3RyZXIgbGVuZ3RoOiBcIiArIGVucmVnaXN0cmVyLmxlbmd0aCk7XG4gICAgICAgIFV0aWxzLmxvZyhcIlN0YXRlOiBcIiArIHRoaXMuX2NtcC5zdGF0ZSk7XG4gICAgICAgIGlmIChVdGlscy5vYmplY3RDbGlja2FibGUoZGV0YWlsc0J1dHRvbikgJiYgVXRpbHMub2JqZWN0Q2xpY2thYmxlKHBvcHVwRGl2KSAmJiB0aGlzLl9jbXAuc3RhdGUgPT09IDApIHtcbiAgICAgICAgICAgIFV0aWxzLmxvZyhcIkNsaWNraW5nIG9uIERldGFpbHNcIik7XG4gICAgICAgICAgICBkZXRhaWxzQnV0dG9uLmNsaWNrKCk7XG4gICAgICAgICAgICB0aGlzLl9jbXAuc3RhdGUgPSAxO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKHJlZnVzZXJCdXR0b24ubGVuZ3RoID4gMCAmJiBVdGlscy5vYmplY3RDbGlja2FibGUocG9wdXBEaXYpICYmIHRoaXMuX2NtcC5zdGF0ZSA9PT0gMSkge1xuICAgICAgICAgICAgVXRpbHMubG9nKFwiTG9va2luZyBmb3IgU3BhbjFcIik7XG4gICAgICAgICAgICBsZXQgY2xpY2tlZCA9IGZhbHNlO1xuICAgICAgICAgICAgcmVmdXNlckJ1dHRvbi5mb3JFYWNoKGZ1bmN0aW9uIChzcGFuKSB7XG4gICAgICAgICAgICAgICAgVXRpbHMubG9nKHNwYW4uaW5uZXJIVE1MKTtcbiAgICAgICAgICAgICAgICBpZiAoc3Bhbi5pbm5lckhUTUwudG9Mb3dlckNhc2UoKS5pbmNsdWRlcyhcInJlZnVzZXJcIikgfHwgc3Bhbi5pbm5lckhUTUwudG9Mb3dlckNhc2UoKS5pbmNsdWRlcyhcImRpc2FncmVlXCIpKSB7XG4gICAgICAgICAgICAgICAgICAgIHNwYW4uY2xpY2soKTtcbiAgICAgICAgICAgICAgICAgICAgVXRpbHMubG9nKFwiQ2xpY2tlZCBvbiBSZWZ1c2VyL0Rpc2FncmVlXCIpO1xuICAgICAgICAgICAgICAgICAgICBjbGlja2VkID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIGlmIChjbGlja2VkKSB7XG4gICAgICAgICAgICAgICAgVXRpbHMubG9nKFwiQ2xpY2tlZCwgdXBkYXRlIHNldFwiKTtcbiAgICAgICAgICAgICAgICB0aGlzLl9jbXAuc3RhdGUgPSAyO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKGVucmVnaXN0cmVyQnV0dG9uLmxlbmd0aCA+IDAgJiYgVXRpbHMub2JqZWN0Q2xpY2thYmxlKHBvcHVwRGl2KSAmJiB0aGlzLl9jbXAuc3RhdGUgPT09IDIpIHtcbiAgICAgICAgICAgIFV0aWxzLmxvZyhcIkxvb2tpbmcgZm9yIFNhdmUvRW5yZWdpc3RyZVwiKTtcbiAgICAgICAgICAgIGxldCBjbGlja2VkID0gZmFsc2U7XG4gICAgICAgICAgICBlbnJlZ2lzdHJlckJ1dHRvbi5mb3JFYWNoKGZ1bmN0aW9uIChzcGFuKSB7XG4gICAgICAgICAgICAgICAgVXRpbHMubG9nKHNwYW4uaW5uZXJIVE1MKTtcbiAgICAgICAgICAgICAgICBpZiAoc3Bhbi5pbm5lckhUTUwudG9Mb3dlckNhc2UoKS5pbmNsdWRlcyhcImVucmVnaXN0cmVyXCIpIHx8IHNwYW4uaW5uZXJIVE1MLnRvTG93ZXJDYXNlKCkuaW5jbHVkZXMoXCJzYXZlXCIpKSB7XG4gICAgICAgICAgICAgICAgICAgIHNwYW4uY2xpY2soKTtcbiAgICAgICAgICAgICAgICAgICAgVXRpbHMubG9nKFwiQ2xpY2tlZCBvbiBFbnJlZ2lzdHJlci9TYXZlXCIpO1xuICAgICAgICAgICAgICAgICAgICBjbGlja2VkID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIGlmIChjbGlja2VkKSB7XG4gICAgICAgICAgICAgICAgVXRpbHMubG9nKFwiQ2xpY2tlZCwgcmVzZXQgbm93XCIpO1xuICAgICAgICAgICAgICAgIHRoaXMuX2NtcC5yZXNldCgpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxufVxuIiwiXCJ1c2Ugc3RyaWN0XCI7XG52YXIgX19hd2FpdGVyID0gKHRoaXMgJiYgdGhpcy5fX2F3YWl0ZXIpIHx8IGZ1bmN0aW9uICh0aGlzQXJnLCBfYXJndW1lbnRzLCBQLCBnZW5lcmF0b3IpIHtcbiAgICBmdW5jdGlvbiBhZG9wdCh2YWx1ZSkgeyByZXR1cm4gdmFsdWUgaW5zdGFuY2VvZiBQID8gdmFsdWUgOiBuZXcgUChmdW5jdGlvbiAocmVzb2x2ZSkgeyByZXNvbHZlKHZhbHVlKTsgfSk7IH1cbiAgICByZXR1cm4gbmV3IChQIHx8IChQID0gUHJvbWlzZSkpKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHtcbiAgICAgICAgZnVuY3Rpb24gZnVsZmlsbGVkKHZhbHVlKSB7IHRyeSB7IHN0ZXAoZ2VuZXJhdG9yLm5leHQodmFsdWUpKTsgfSBjYXRjaCAoZSkgeyByZWplY3QoZSk7IH0gfVxuICAgICAgICBmdW5jdGlvbiByZWplY3RlZCh2YWx1ZSkgeyB0cnkgeyBzdGVwKGdlbmVyYXRvcltcInRocm93XCJdKHZhbHVlKSk7IH0gY2F0Y2ggKGUpIHsgcmVqZWN0KGUpOyB9IH1cbiAgICAgICAgZnVuY3Rpb24gc3RlcChyZXN1bHQpIHsgcmVzdWx0LmRvbmUgPyByZXNvbHZlKHJlc3VsdC52YWx1ZSkgOiBhZG9wdChyZXN1bHQudmFsdWUpLnRoZW4oZnVsZmlsbGVkLCByZWplY3RlZCk7IH1cbiAgICAgICAgc3RlcCgoZ2VuZXJhdG9yID0gZ2VuZXJhdG9yLmFwcGx5KHRoaXNBcmcsIF9hcmd1bWVudHMgfHwgW10pKS5uZXh0KCkpO1xuICAgIH0pO1xufTtcbmltcG9ydCBVdGlscyBmcm9tIFwiLi4vVXRpbHNcIjtcbmltcG9ydCBDTVAgZnJvbSBcIi4vQ01QXCI7XG5pbXBvcnQgQ21wVHlwZSBmcm9tIFwiLi9DbXBUeXBlXCI7XG5leHBvcnQgZGVmYXVsdCBjbGFzcyBFdmlkb24ge1xuICAgIGNvbnN0cnVjdG9yKG5vZGUsIHNjcmlwdFVybCwgYmFja2VuZENhbGwpIHtcbiAgICAgICAgdGhpcy5fbmFtZSA9IFwiRXZpZG9uLCBJbmMuXCI7XG4gICAgICAgIHRoaXMuX3RyaWdnZXIxID0gZmFsc2U7XG4gICAgICAgIGJhY2tlbmRDYWxsLmNtcERhdGEoMTgsIHRoaXMuX25hbWUsIHNjcmlwdFVybCwgQ21wVHlwZS5ET19OT1RfV0FJVCwgdHJ1ZSk7XG4gICAgICAgIHRoaXMuX2NtcCA9IG5ldyBDTVAobm9kZSwgYmFja2VuZENhbGwsIHRoaXMpO1xuICAgIH1cbiAgICBnZXQgbmFtZSgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX25hbWU7XG4gICAgfVxuICAgIGNvbm5lY3QoKSB7XG4gICAgICAgIHRoaXMuX2NtcC5jb25uZWN0KCk7XG4gICAgfVxuICAgIGhhbmRsZUNtcCgpIHtcbiAgICAgICAgcmV0dXJuIF9fYXdhaXRlcih0aGlzLCB2b2lkIDAsIHZvaWQgMCwgZnVuY3Rpb24qICgpIHtcbiAgICAgICAgICAgIGNvbnN0IGV2aWRvbk9wdGlvbnMgPSBcImJ1dHRvbiNfZXZpZG9uLW9wdGlvbi1idXR0b25cIjtcbiAgICAgICAgICAgIGxldCBldmlkb25PcHRpb25zQnV0dG9uID0gdGhpcy5fY21wLnF1ZXJ5Tm9kZVNlbGVjdG9yKGV2aWRvbk9wdGlvbnMpO1xuICAgICAgICAgICAgY29uc3QgZXZpZG9uRGVjbGluZSA9IFwiYnV0dG9uI2V2aWRvbi1wcmVmZGlhZy1kZWNsaW5lXCI7XG4gICAgICAgICAgICBsZXQgZXZpZG9uRGVueUFsbEJ1dHRvbiA9IHRoaXMuX2NtcC5xdWVyeU5vZGVTZWxlY3Rvcihldmlkb25EZWNsaW5lKTtcbiAgICAgICAgICAgIGNvbnN0IGV2aWRvbkwyRGVjbGluZSA9IFwiYnV0dG9uI2V2aWRvbi1sMi1kZWNsaW5lLWJ1dHRvblwiO1xuICAgICAgICAgICAgbGV0IGV2aWRvbkwyRGVjbGluZUJ1dHRvbiA9IHRoaXMuX2NtcC5xdWVyeU5vZGVTZWxlY3Rvcihldmlkb25MMkRlY2xpbmUpO1xuICAgICAgICAgICAgY29uc3QgZXZpZG9uQ29va2llQmFubmVyTmV4dCA9IFwic3BhbiNfZXZpZG9uLWJhbm5lci1jb29raWVidXR0b250ZXh0XCI7XG4gICAgICAgICAgICBsZXQgZXZpZG9uQ29va2llQmFubmVyTmV4dFNwYW4gPSB0aGlzLl9jbXAucXVlcnlOb2RlU2VsZWN0b3IoZXZpZG9uQ29va2llQmFubmVyTmV4dCk7XG4gICAgICAgICAgICAvLyB3ZSBkbyByZXF1aXJlIDMgYXR0ZW1wdHMgdG8gZGVjbGluZSB0aGUgdHJhY2tpbmdcbiAgICAgICAgICAgIGlmIChVdGlscy5vYmplY3RDbGlja2FibGUoZXZpZG9uT3B0aW9uc0J1dHRvbikgJiYgIXRoaXMuX3RyaWdnZXIxKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5fdHJpZ2dlcjEgPSB0cnVlO1xuICAgICAgICAgICAgICAgIHlpZWxkIHRoaXMuc2xlZXAoMTAwMCk7XG4gICAgICAgICAgICAgICAgVXRpbHMubG9nKFwiQnV0dG9uIDEsIDMwMCBtcyB3YWl0ZWQuIFRyaWdnZXIgcmVsZWFzZWRcIik7XG4gICAgICAgICAgICAgICAgdGhpcy5fdHJpZ2dlcjEgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICBldmlkb25PcHRpb25zQnV0dG9uLmNsaWNrKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICAvLyB3ZSBkbyByZXF1aXJlIDMgYXR0ZW1wdHMgdG8gZGVjbGluZSB0aGUgdHJhY2tpbmdcbiAgICAgICAgICAgIGlmIChVdGlscy5vYmplY3RDbGlja2FibGUoZXZpZG9uQ29va2llQmFubmVyTmV4dFNwYW4pICYmICF0aGlzLl90cmlnZ2VyMSkge1xuICAgICAgICAgICAgICAgIHRoaXMuX3RyaWdnZXIxID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICB5aWVsZCB0aGlzLnNsZWVwKDEwMDApO1xuICAgICAgICAgICAgICAgIFV0aWxzLmxvZyhcIkJ1dHRvbiAyLCAzMDAgbXMgd2FpdGVkLiBUcmlnZ2VyIHJlbGVhc2VkXCIpO1xuICAgICAgICAgICAgICAgIHRoaXMuX3RyaWdnZXIxID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgZXZpZG9uQ29va2llQmFubmVyTmV4dFNwYW4uY2xpY2soKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChVdGlscy5vYmplY3RDbGlja2FibGUoZXZpZG9uTDJEZWNsaW5lQnV0dG9uKSAmJiAhdGhpcy5fdHJpZ2dlcjEpIHtcbiAgICAgICAgICAgICAgICB0aGlzLl90cmlnZ2VyMSA9IHRydWU7XG4gICAgICAgICAgICAgICAgeWllbGQgdGhpcy5zbGVlcCgxMDAwKTtcbiAgICAgICAgICAgICAgICBVdGlscy5sb2coXCJCdXR0b24gMywgMzAwIG1zIHdhaXRlZC4gVHJpZ2dlciByZWxlYXNlZFwiKTtcbiAgICAgICAgICAgICAgICB0aGlzLl90cmlnZ2VyMSA9IGZhbHNlO1xuICAgICAgICAgICAgICAgIGV2aWRvbkwyRGVjbGluZUJ1dHRvbi5jbGljaygpO1xuICAgICAgICAgICAgICAgIC8vIGV4YW1wbGUgZXZpZG9uIHBhZ2UgaGVyZSB3ZSBkbyBoYXZlIGEgZGVmaW5lZCBlbmQuXG4gICAgICAgICAgICAgICAgdGhpcy5fY21wLnJlc2V0KCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICAvLyBDcm93bnBlYWsgPT4gXCJvcHRpb25zXCIgYnkgYWNjaWRlbnQgaXMgdGhlIFwiZGVjbGluZVwiIGJ1dHRvbiwgc28gb3B0aW9ucyBvcGVuIC4uLlxuICAgICAgICAgICAgaWYgKFV0aWxzLm9iamVjdENsaWNrYWJsZShldmlkb25EZW55QWxsQnV0dG9uKSAmJiAhdGhpcy5fdHJpZ2dlcjEpIHtcbiAgICAgICAgICAgICAgICB0aGlzLl90cmlnZ2VyMSA9IHRydWU7XG4gICAgICAgICAgICAgICAgeWllbGQgdGhpcy5zbGVlcCgxMDAwKTtcbiAgICAgICAgICAgICAgICBVdGlscy5sb2coXCJCdXR0b24gNCwgMzAwIG1zIHdhaXRlZC4gVHJpZ2dlciByZWxlYXNlZFwiKTtcbiAgICAgICAgICAgICAgICB0aGlzLl90cmlnZ2VyMSA9IGZhbHNlO1xuICAgICAgICAgICAgICAgIGV2aWRvbkRlbnlBbGxCdXR0b24uY2xpY2soKTtcbiAgICAgICAgICAgICAgICAvLyBleGFtcGxlIENyb3ducGVhayBoZXJlIHdlIGRvIGhhdmUgYSBkZWZpbmVkIGVuZC5cbiAgICAgICAgICAgICAgICB0aGlzLl9jbXAucmVzZXQoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfVxuICAgIHNsZWVwKG1pbGxpc2Vjb25kcykge1xuICAgICAgICByZXR1cm4gbmV3IFByb21pc2UocmVzb2x2ZSA9PiBzZXRUaW1lb3V0KHJlc29sdmUsIG1pbGxpc2Vjb25kcykpO1xuICAgIH1cbn1cbiIsIlwidXNlIHN0cmljdFwiO1xuaW1wb3J0IENNUCBmcm9tIFwiLi9DTVBcIjtcbmltcG9ydCBDbXBUeXBlIGZyb20gXCIuL0NtcFR5cGVcIjtcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIE5vdFlldEltcGxlbWVudGVkQ21wIHtcbiAgICBjb25zdHJ1Y3RvcihjbXBJZCwgbm9kZSwgbmFtZSwgc2NyaXB0VXJsLCBiYWNrZW5kQ2FsbCkge1xuICAgICAgICB0aGlzLl9uYW1lID0gbmFtZTtcbiAgICAgICAgYmFja2VuZENhbGwuY21wRGF0YShjbXBJZCwgdGhpcy5fbmFtZSwgc2NyaXB0VXJsLCBDbXBUeXBlLldBSVRfRk9SX1RJTUVfRlJBTUUsIGZhbHNlKTtcbiAgICAgICAgdGhpcy5fY21wID0gbmV3IENNUChub2RlLCBiYWNrZW5kQ2FsbCwgdGhpcyk7XG4gICAgfVxuICAgIGdldCBuYW1lKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fbmFtZTtcbiAgICB9XG4gICAgY29ubmVjdCgpIHtcbiAgICAgICAgdGhpcy5fY21wLmNvbm5lY3QoKTtcbiAgICB9XG4gICAgaGFuZGxlQ21wKCkge1xuICAgICAgICB0aGlzLl9jbXAucmVzZXQoKTtcbiAgICB9XG59XG4iLCJcInVzZSBzdHJpY3RcIjtcbmltcG9ydCBVdGlscyBmcm9tIFwiLi4vVXRpbHNcIjtcbmltcG9ydCBDTVAgZnJvbSBcIi4vQ01QXCI7XG5pbXBvcnQgQ21wVHlwZSBmcm9tIFwiLi9DbXBUeXBlXCI7XG5leHBvcnQgZGVmYXVsdCBjbGFzcyBPYXRoQ21wIHtcbiAgICBjb25zdHJ1Y3Rvcihub2RlLCBzY3JpcHRVcmwsIGJhY2tlbmRDYWxsKSB7XG4gICAgICAgIHRoaXMuX25hbWUgPSBcIk9hdGggTGltaXRlZFwiO1xuICAgICAgICBiYWNrZW5kQ2FsbC5jbXBEYXRhKDE0LCB0aGlzLl9uYW1lLCBzY3JpcHRVcmwsIENtcFR5cGUuRE9fTk9UX1dBSVQsIHRydWUpO1xuICAgICAgICB0aGlzLl9jbXAgPSBuZXcgQ01QKG5vZGUsIGJhY2tlbmRDYWxsLCB0aGlzKTtcbiAgICB9XG4gICAgZ2V0IG5hbWUoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9uYW1lO1xuICAgIH1cbiAgICBjb25uZWN0KCkge1xuICAgICAgICB0aGlzLl9jbXAuY29ubmVjdCgpO1xuICAgIH1cbiAgICBoYW5kbGVDbXAoKSB7XG4gICAgICAgIGNvbnN0IG1vcmVJbmZvcm1hdGlvbiA9ICcjbWFpbk1vcmVJbmZvJztcbiAgICAgICAgbGV0IG1vcmVJbmZvcm1hdGlvbkJ1dHRvbiA9IHRoaXMuX2NtcC5xdWVyeU5vZGVTZWxlY3Rvcihtb3JlSW5mb3JtYXRpb24pO1xuICAgICAgICBjb25zdCByZWplY3RBbGwgPSBcImJ1dHRvbi5jbXAtYnRuLXJlamVjdGFsbFwiO1xuICAgICAgICBsZXQgcmVqZWN0QWxsQnV0dG9uID0gdGhpcy5fY21wLnF1ZXJ5Tm9kZVNlbGVjdG9yKHJlamVjdEFsbCk7XG4gICAgICAgIGNvbnN0IGxlYXZlID0gXCIjY29uZmlybUxlYXZlXCI7XG4gICAgICAgIGxldCBsZWF2ZUJ1dHRvbiA9IHRoaXMuX2NtcC5xdWVyeU5vZGVTZWxlY3RvcihsZWF2ZSk7XG4gICAgICAgIGlmIChVdGlscy5vYmplY3RDbGlja2FibGUobW9yZUluZm9ybWF0aW9uQnV0dG9uKSAmJiB0aGlzLl9jbXAuc3RhdGUgPT09IDApIHtcbiAgICAgICAgICAgIFV0aWxzLmxvZyhcIkJ1dHRvbiAxIGZvdW5kXCIpO1xuICAgICAgICAgICAgbW9yZUluZm9ybWF0aW9uQnV0dG9uLmNsaWNrKCk7XG4gICAgICAgICAgICB0aGlzLl9jbXAuc3RhdGUgPSAxO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKFV0aWxzLm9iamVjdENsaWNrYWJsZShyZWplY3RBbGxCdXR0b24pICYmIHRoaXMuX2NtcC5zdGF0ZSA9PT0gMSkge1xuICAgICAgICAgICAgVXRpbHMubG9nKFwiQnV0dG9uIDIgZm91bmRcIik7XG4gICAgICAgICAgICByZWplY3RBbGxCdXR0b24uY2xpY2soKTtcbiAgICAgICAgICAgIHRoaXMuX2NtcC5zdGF0ZSA9IDI7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAoVXRpbHMub2JqZWN0Q2xpY2thYmxlKGxlYXZlQnV0dG9uKSAmJiB0aGlzLl9jbXAuc3RhdGUgPT09IDIpIHtcbiAgICAgICAgICAgIFV0aWxzLmxvZyhcIkJ1dHRvbiAzIGZvdW5kXCIpO1xuICAgICAgICAgICAgbGVhdmVCdXR0b24uY2xpY2soKTtcbiAgICAgICAgICAgIHRoaXMuX2NtcC5yZXNldCgpO1xuICAgICAgICB9XG4gICAgfVxufVxuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5pbXBvcnQgVXRpbHMgZnJvbSBcIi4uL1V0aWxzXCI7XG5pbXBvcnQgQ01QIGZyb20gXCIuL0NNUFwiO1xuaW1wb3J0IENtcFR5cGUgZnJvbSBcIi4vQ21wVHlwZVwiO1xuZXhwb3J0IGRlZmF1bHQgY2xhc3MgT25lVHJ1c3Qge1xuICAgIGNvbnN0cnVjdG9yKG5vZGUsIHNjcmlwdFVybCwgYmFja2VuZENhbGwpIHtcbiAgICAgICAgdGhpcy5fbmFtZSA9IFwiT25lVHJ1c3QgTExDXCI7XG4gICAgICAgIGJhY2tlbmRDYWxsLmNtcERhdGEoMjgsIHRoaXMuX25hbWUsIHNjcmlwdFVybCwgQ21wVHlwZS5XQUlUX0ZPUl9USU1FX0ZSQU1FLCB0cnVlKTtcbiAgICAgICAgdGhpcy5fY21wID0gbmV3IENNUChub2RlLCBiYWNrZW5kQ2FsbCwgdGhpcyk7XG4gICAgfVxuICAgIGdldCBuYW1lKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fbmFtZTtcbiAgICB9XG4gICAgY29ubmVjdCgpIHtcbiAgICAgICAgdGhpcy5fY21wLmNvbm5lY3QoKTtcbiAgICB9XG4gICAgaGFuZGxlQ21wKCkge1xuICAgICAgICBjb25zdCBvcHRhbm9uRGV0YWlsc1NlbGVjdG9yVjEgPSBcImJ1dHRvbiNvbmV0cnVzdC1wYy1idG4taGFuZGxlclwiO1xuICAgICAgICBsZXQgb3B0YW5hbkRldGFpbHNWMSA9IHRoaXMuX2NtcC5xdWVyeU5vZGVTZWxlY3RvcihvcHRhbm9uRGV0YWlsc1NlbGVjdG9yVjEpO1xuICAgICAgICBjb25zdCBvcHRhbm9uU2F2ZVNldHRpbmdzU2VsZWN0b3JWMSA9IFwiYnV0dG9uLnNhdmUtcHJlZmVyZW5jZS1idG4taGFuZGxlclwiO1xuICAgICAgICBsZXQgb3B0YW5vblNhdmVTZXR0aW5nc1YxID0gdGhpcy5fY21wLnF1ZXJ5Tm9kZVNlbGVjdG9yKG9wdGFub25TYXZlU2V0dGluZ3NTZWxlY3RvclYxKTtcbiAgICAgICAgY29uc3Qgb3B0YW5vbkNoZWNrQm94ZXNTZWxlY3RvclYxID0gXCJpbnB1dFt0eXBlKj0nY2hlY2tib3gnXS5zd2l0Y2gtY2hlY2tib3hcIjtcbiAgICAgICAgbGV0IG9wdGFub25DaGVja2JveGVzVjEgPSB0aGlzLl9jbXAucXVlcnlOb2RlU2VsZWN0b3JBbGwob3B0YW5vbkNoZWNrQm94ZXNTZWxlY3RvclYxKTtcbiAgICAgICAgY29uc3Qgb3B0YW5vbkRldGFpbHNWMiA9IFwiYnV0dG9uLm9wdGFub24tdG9nZ2xlLWRpc3BsYXlcIjtcbiAgICAgICAgbGV0IG9wdGFub25EZXRhaWxzQnV0dG9uVjIgPSB0aGlzLl9jbXAucXVlcnlOb2RlU2VsZWN0b3Iob3B0YW5vbkRldGFpbHNWMik7XG4gICAgICAgIC8vIHRoaXMgYnV0dG9uIGlzIGNyYXBweSB0byBmaW5kLCBhcyB0aGVyZSBpcyBubyBJRCBvciBjbGFzcy5cbiAgICAgICAgY29uc3Qgb3B0YW5vblNhdmVTZXR0aW5nc1NlbGVjdG9yVjIgPSBcImJ1dHRvbltvbmNsaWNrKj0nU2F2ZSddXCI7IC8vYnV0dG9uLm9wdGFub24tc2F2ZS1zZXR0aW5ncy1idXR0b25cbiAgICAgICAgbGV0IG9wdGFub25TYXZlU2V0dGluZ3NWMiA9IHRoaXMuX2NtcC5xdWVyeU5vZGVTZWxlY3RvcihvcHRhbm9uU2F2ZVNldHRpbmdzU2VsZWN0b3JWMik7XG4gICAgICAgIGNvbnN0IG9wdGFub25MaXN0SXRlbXNTZWxlY3RvclYyID0gXCJsaS5tZW51LWl0ZW0tb25cIjtcbiAgICAgICAgbGV0IG9wdGFub25MaXN0SXRlbXNWMiA9IHRoaXMuX2NtcC5xdWVyeU5vZGVTZWxlY3RvckFsbChvcHRhbm9uTGlzdEl0ZW1zU2VsZWN0b3JWMik7XG4gICAgICAgIGNvbnN0IG9wdGFub25DaGVja2JveGVzU2VsZWN0b3JWMiA9IFwiaW5wdXRbdHlwZSo9J2NoZWNrYm94J11cIjtcbiAgICAgICAgbGV0IG9wdGFub25DaGVja0JveGVzVjIgPSB0aGlzLl9jbXAucXVlcnlOb2RlU2VsZWN0b3JBbGwob3B0YW5vbkNoZWNrYm94ZXNTZWxlY3RvclYyKTtcbiAgICAgICAgLy8gdGhpcyBidXR0b24gaXMgY3JhcHB5IHRvIGZpbmQsIGFzIHRoZXJlIGlzIG5vIElEIG9yIGNsYXNzLlxuICAgICAgICBjb25zdCBvcHRhbm9uU2F2ZVNldHRpbmdzU2VsZWN0b3JWMyA9IFwiYnV0dG9uLnNhdmUtcHJlZmVyZW5jZS1idG4taGFuZGxlclwiOyAvL2J1dHRvbi5vcHRhbm9uLXNhdmUtc2V0dGluZ3MtYnV0dG9uXG4gICAgICAgIGxldCBvcHRhbm9uU2F2ZVNldHRpbmdzVjMgPSB0aGlzLl9jbXAucXVlcnlOb2RlU2VsZWN0b3Iob3B0YW5vblNhdmVTZXR0aW5nc1NlbGVjdG9yVjMpO1xuICAgICAgICBjb25zdCBvcHRhbm9uTGlzdEl0ZW1zU2VsZWN0b3JWMyA9IFwiZGl2LmNhdGVnb3J5LW1lbnUtc3dpdGNoLWhhbmRsZXJcIjtcbiAgICAgICAgbGV0IG9wdGFub25MaXN0SXRlbXNWMyA9IHRoaXMuX2NtcC5xdWVyeU5vZGVTZWxlY3RvckFsbChvcHRhbm9uTGlzdEl0ZW1zU2VsZWN0b3JWMyk7XG4gICAgICAgIGNvbnN0IG9wdGFub25PbmV0cnVzdFJlamVjdEFsbGFuZGxlciA9IFwiYnV0dG9uI29uZXRydXN0LXJlamVjdC1hbGwtaGFuZGxlclwiO1xuICAgICAgICBsZXQgb3B0YW5vbk9uZXRydXN0UmVqZWN0QWxsYW5kbGVyQnV0dG9uID0gdGhpcy5fY21wLnF1ZXJ5Tm9kZVNlbGVjdG9yKG9wdGFub25PbmV0cnVzdFJlamVjdEFsbGFuZGxlcik7XG4gICAgICAgIGNvbnN0IG9wdGFub25CYW5uZXJQb2xpY3kgPSBcImEuYmFubmVyLXBvbGljeS1saW5rXCI7XG4gICAgICAgIGxldCBvcHRhbm9uQmFubmVyUG9saWN5TGluayA9IHRoaXMuX2NtcC5xdWVyeU5vZGVTZWxlY3RvckFsbChvcHRhbm9uQmFubmVyUG9saWN5KTtcbiAgICAgICAgLy8gVmFyaWFudGUgMyAoU2luZ2xlLVByZXNzIGlzIHByZWZlcmVkIG92ZXIgb3RoZXJzXG4gICAgICAgIGlmIChVdGlscy5vYmplY3RDbGlja2FibGUob3B0YW5vbk9uZXRydXN0UmVqZWN0QWxsYW5kbGVyQnV0dG9uKSAmJiB0aGlzLl9jbXAuc3RhdGUgPT09IDApIHtcbiAgICAgICAgICAgIFV0aWxzLmxvZyhcIlYzIChmaXJzdCBjbGljaylcIik7XG4gICAgICAgICAgICBvcHRhbm9uT25ldHJ1c3RSZWplY3RBbGxhbmRsZXJCdXR0b24uY2xpY2soKTtcbiAgICAgICAgICAgIFV0aWxzLmxvZyhcIlJlamVjdCBhbGwgY2xpY2tlZFwiKTtcbiAgICAgICAgICAgIHRoaXMuX2NtcC5zdGF0ZSA9IDE7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAoVXRpbHMub2JqZWN0Q2xpY2thYmxlKG9wdGFub25PbmV0cnVzdFJlamVjdEFsbGFuZGxlckJ1dHRvbikgJiYgdGhpcy5fY21wLnN0YXRlID09PSAxKSB7XG4gICAgICAgICAgICBVdGlscy5sb2coXCJWMyAoc2Vjb25kIGNsaWNrKVwiKTtcbiAgICAgICAgICAgIG9wdGFub25PbmV0cnVzdFJlamVjdEFsbGFuZGxlckJ1dHRvbi5jbGljaygpO1xuICAgICAgICAgICAgVXRpbHMubG9nKFwiUmVqZWN0IGFsbCBjbGlja2VkXCIpO1xuICAgICAgICAgICAgdGhpcy5fY21wLnJlc2V0KCk7XG4gICAgICAgIH1cbiAgICAgICAgLy8gVmFyaWFudCAxXG4gICAgICAgIC8vIGh0dHBzOi8vd3d3LndpZW5lcnplaXR1bmcuYXQvXG4gICAgICAgIGVsc2UgaWYgKFV0aWxzLm9iamVjdENsaWNrYWJsZShvcHRhbmFuRGV0YWlsc1YxKSAmJiB0aGlzLl9jbXAuc3RhdGUgPT09IDApIHtcbiAgICAgICAgICAgIFV0aWxzLmxvZyhcIlYxXCIpO1xuICAgICAgICAgICAgc2V0VGltZW91dChmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgb3B0YW5hbkRldGFpbHNWMS5jbGljaygpO1xuICAgICAgICAgICAgfSwgMTAwMCk7XG4gICAgICAgICAgICBVdGlscy5sb2coXCJEZXRhaWxzIGNsaWNrZWQgVjFcIik7XG4gICAgICAgICAgICB0aGlzLl9jbXAuc3RhdGUgPSAxO1xuICAgICAgICB9XG4gICAgICAgIC8vIGh0dHBzOi8vd3d3Lm9yYWxiLmRlL2RlLWRlXG4gICAgICAgIGVsc2UgaWYgKG9wdGFub25CYW5uZXJQb2xpY3kubGVuZ3RoID4gMSAmJiBVdGlscy5vYmplY3RDbGlja2FibGUob3B0YW5vbkJhbm5lclBvbGljeUxpbmtbMV0pICYmIHRoaXMuX2NtcC5zdGF0ZSA9PT0gMCkge1xuICAgICAgICAgICAgVXRpbHMubG9nKFwiVjEuMVwiKTtcbiAgICAgICAgICAgIG9wdGFub25CYW5uZXJQb2xpY3lMaW5rWzFdLmNsaWNrKCk7XG4gICAgICAgICAgICBVdGlscy5sb2coXCJEZXRhaWxzIGNsaWNrZWQgVjEuMVwiKTtcbiAgICAgICAgICAgIHRoaXMuX2NtcC5zdGF0ZSA9IDE7XG4gICAgICAgIH1cbiAgICAgICAgLy8gaHR0cHM6Ly9hcnN0ZWNobmljYS5jb20vLCAgIGh0dHBzOi8vd3d3LmdsYXNzZG9vci5kZS8sIGh0dHBzOi8vYXNtcC5hMS5uZXQvLCBodHRwczovL3d3dy56ZG5ldC5jb20vXG4gICAgICAgIGVsc2UgaWYgKFV0aWxzLm9iamVjdENsaWNrYWJsZShvcHRhbm9uU2F2ZVNldHRpbmdzVjEpICYmIG9wdGFub25DaGVja2JveGVzVjEubGVuZ3RoICYmIHRoaXMuX2NtcC5zdGF0ZSA9PT0gMSkge1xuICAgICAgICAgICAgVXRpbHMubG9nKFwiQW1vdW50IG9mIENoZWNrYm94ZXMgVjE6IFwiICsgb3B0YW5vbkNoZWNrYm94ZXNWMS5sZW5ndGgpO1xuICAgICAgICAgICAgb3B0YW5vbkNoZWNrYm94ZXNWMS5mb3JFYWNoKGZ1bmN0aW9uIChjaGVja2JveCkge1xuICAgICAgICAgICAgICAgIGNoZWNrYm94LnNldEF0dHJpYnV0ZShcImNoZWNrZWRcIiwgXCJmYWxzZVwiKTtcbiAgICAgICAgICAgICAgICBVdGlscy5sb2coXCJDaGVja2JveCB1bnNldCBWMVwiKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgc2V0VGltZW91dChmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgb3B0YW5vblNhdmVTZXR0aW5nc1YxLmNsaWNrKCk7XG4gICAgICAgICAgICB9LCAxMDAwKTtcbiAgICAgICAgICAgIFV0aWxzLmxvZyhcIlNhdmUgU2V0dGluZ3MgQ2xpY2tlZCBjbGljayBWMVwiKTtcbiAgICAgICAgICAgIC8vIHRoaXMuX2NtcC5zdGF0ZSA9IDI7XG4gICAgICAgICAgICB0aGlzLl9jbXAucmVzZXQoKTtcbiAgICAgICAgfVxuICAgICAgICAvLyBodHRwczovL2RlLmNvdXJzZXJhLm9yZy8sICBodHRwczovL3d3dy5ob21lMjQuZGUvLCBodHRwczovL3d3dy50aG91Z2h0d29ya3MuY29tLywgaHR0cHM6Ly9qb2JzLm5ldGZsaXguY29tL1xuICAgICAgICBlbHNlIGlmIChVdGlscy5vYmplY3RDbGlja2FibGUob3B0YW5vblNhdmVTZXR0aW5nc1YzKSAmJiB0aGlzLl9jbXAuc3RhdGUgPT09IDEpIHtcbiAgICAgICAgICAgIFV0aWxzLmxvZyhcIlNhdmUgQnV0dG9uIFYzIGZvdW5kXCIpO1xuICAgICAgICAgICAgb3B0YW5vbkxpc3RJdGVtc1YzLmZvckVhY2goZnVuY3Rpb24gKGxpc3RJdGVtKSB7XG4gICAgICAgICAgICAgICAgbGlzdEl0ZW0uY2xpY2soKTtcbiAgICAgICAgICAgICAgICBVdGlscy5sb2coXCJDaGVja2JveCB1bnNldCBWM1wiKTtcbiAgICAgICAgICAgICAgICBvcHRhbm9uQ2hlY2tCb3hlc1YyLmZvckVhY2goZnVuY3Rpb24gKGNoZWNrYm94KSB7XG4gICAgICAgICAgICAgICAgICAgIGNoZWNrYm94LnNldEF0dHJpYnV0ZShcImNoZWNrZWRcIiwgXCJmYWxzZVwiKTtcbiAgICAgICAgICAgICAgICAgICAgVXRpbHMubG9nKFwiQ2hlY2tib3ggdW5zZXQgVjNcIik7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIG9wdGFub25TYXZlU2V0dGluZ3NWMy5jbGljaygpO1xuICAgICAgICAgICAgdGhpcy5fY21wLnJlc2V0KCk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAoVXRpbHMub2JqZWN0Q2xpY2thYmxlKG9wdGFub25PbmV0cnVzdFJlamVjdEFsbGFuZGxlckJ1dHRvbikgJiYgdGhpcy5fY21wLnN0YXRlID09PSAyKSB7XG4gICAgICAgICAgICBVdGlscy5sb2coXCJWMSAoc2Vjb25kIGNsaWNrKVwiKTtcbiAgICAgICAgICAgIG9wdGFub25PbmV0cnVzdFJlamVjdEFsbGFuZGxlckJ1dHRvbi5jbGljaygpO1xuICAgICAgICAgICAgVXRpbHMubG9nKFwiUmVqZWN0IGFsbCBjbGlja2VkXCIpO1xuICAgICAgICAgICAgdGhpcy5fY21wLnJlc2V0KCk7XG4gICAgICAgIH1cbiAgICAgICAgLy8gVmFyaWFudCAyXG4gICAgICAgIC8vIGh0dHBzOi8vd3d3Lm1vbmEubmwvLCBodHRwczovL3d3dy5hbGxpYW56LmRlLywgaHR0cHM6Ly93d3cuc3ByaW5nZXIuY29tL2dwLCBodHRwczovL3d3dy5oYWdsb2ZzLmNvbS9kZS9kZS1kZS8sIGh0dHBzOi8vd3d3LnRoZXNhdXJ1cy5jb20vLCBodHRwczovL3d3dy5hdGxhc3NpYW4uY29tL2RlL2FnaWxlL2FnaWxlLWF0LXNjYWxlL29rclxuICAgICAgICBlbHNlIGlmIChVdGlscy5vYmplY3RDbGlja2FibGUob3B0YW5vbkRldGFpbHNCdXR0b25WMikgJiYgdGhpcy5fY21wLnN0YXRlID09PSAwKSB7XG4gICAgICAgICAgICBVdGlscy5sb2coXCJWMlwiKTtcbiAgICAgICAgICAgIG9wdGFub25EZXRhaWxzQnV0dG9uVjIuY2xpY2soKTtcbiAgICAgICAgICAgIFV0aWxzLmxvZyhcIkRldGFpbHMgY2xpY2tlZFwiKTtcbiAgICAgICAgICAgIHRoaXMuX2NtcC5zdGF0ZSA9IDM7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAoVXRpbHMub2JqZWN0Q2xpY2thYmxlKG9wdGFub25TYXZlU2V0dGluZ3NWMikgJiYgdGhpcy5fY21wLnN0YXRlID09PSAzKSB7XG4gICAgICAgICAgICBVdGlscy5sb2coXCJTYXZlIEJ1dHRvbiBWMiBmb3VuZFwiKTtcbiAgICAgICAgICAgIG9wdGFub25MaXN0SXRlbXNWMi5mb3JFYWNoKGZ1bmN0aW9uIChsaXN0SXRlbSkge1xuICAgICAgICAgICAgICAgIGxpc3RJdGVtLmNsaWNrKCk7XG4gICAgICAgICAgICAgICAgVXRpbHMubG9nKFwiQ2hlY2tib3ggdW5zZXQgVjJcIik7XG4gICAgICAgICAgICAgICAgb3B0YW5vbkNoZWNrQm94ZXNWMi5mb3JFYWNoKGZ1bmN0aW9uIChjaGVja2JveCkge1xuICAgICAgICAgICAgICAgICAgICBjaGVja2JveC5zZXRBdHRyaWJ1dGUoXCJjaGVja2VkXCIsIFwiZmFsc2VcIik7XG4gICAgICAgICAgICAgICAgICAgIFV0aWxzLmxvZyhcIkNoZWNrYm94IHVuc2V0IFYyXCIpO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICBvcHRhbm9uU2F2ZVNldHRpbmdzVjIuY2xpY2soKTtcbiAgICAgICAgICAgIHRoaXMuX2NtcC5yZXNldCgpO1xuICAgICAgICB9XG4gICAgfVxufVxuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5pbXBvcnQgVXRpbHMgZnJvbSBcIi4uL1V0aWxzXCI7XG5pbXBvcnQgQ01QIGZyb20gXCIuL0NNUFwiO1xuaW1wb3J0IENtcFR5cGUgZnJvbSBcIi4vQ21wVHlwZVwiO1xuZXhwb3J0IGRlZmF1bHQgY2xhc3MgUXVhbnRDYXN0IHtcbiAgICBjb25zdHJ1Y3Rvcihub2RlLCBzY3JpcHRVcmwsIGJhY2tlbmRDYWxsKSB7XG4gICAgICAgIHRoaXMuX25hbWUgPSBcIlF1YW50Y2FzdCBJbnRlcm5hdGlvbmFsIExpbWl0ZWRcIjtcbiAgICAgICAgYmFja2VuZENhbGwuY21wRGF0YSgxMCwgdGhpcy5fbmFtZSwgc2NyaXB0VXJsLCBDbXBUeXBlLldBSVRfRk9SX0FTWU5DX0NBTExCQUNLLCB0cnVlKTtcbiAgICAgICAgdGhpcy5fY21wID0gbmV3IENNUChub2RlLCBiYWNrZW5kQ2FsbCwgdGhpcyk7XG4gICAgfVxuICAgIGdldCBuYW1lKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fbmFtZTtcbiAgICB9XG4gICAgY29ubmVjdCgpIHtcbiAgICAgICAgdGhpcy5fY21wLmNvbm5lY3QoKTtcbiAgICB9XG4gICAgLypcbiAgICAgICAgaHR0cHM6Ly93d2QuY29tL1xuICAgICAqL1xuICAgIGhhbmRsZUNtcCgpIHtcbiAgICAgICAgY29uc3QgcHVycG9zZSA9IFwiYSNxYy1jbXAtcHVycG9zZS1idXR0b25cIjtcbiAgICAgICAgbGV0IHB1cnBvc2VCdXR0b24gPSB0aGlzLl9jbXAucXVlcnlOb2RlU2VsZWN0b3IocHVycG9zZSk7XG4gICAgICAgIGNvbnN0IGRlbnlBbGwgPSBcImJ1dHRvbi5xYy1jbXAtZW5hYmxlLWJ1dHRvblwiO1xuICAgICAgICBsZXQgZGVueUFsbEJ1dHRvbiA9IHRoaXMuX2NtcC5xdWVyeU5vZGVTZWxlY3RvcihkZW55QWxsKTtcbiAgICAgICAgY29uc3Qgc2F2ZSA9IFwiYnV0dG9uLnFjLWNtcC1zYXZlLWFuZC1leGl0XCI7XG4gICAgICAgIGxldCBzYXZlQnV0dG9uID0gdGhpcy5fY21wLnF1ZXJ5Tm9kZVNlbGVjdG9yKHNhdmUpO1xuICAgICAgICBjb25zdCByZWplY3RBbGwgPSBcImJ1dHRvbi5xYy1jbXAtc2Vjb25kYXJ5LWJ1dHRvblwiO1xuICAgICAgICBsZXQgcmVqZWN0QWxsQnV0dG9uID0gdGhpcy5fY21wLnF1ZXJ5Tm9kZVNlbGVjdG9yKHJlamVjdEFsbCk7XG4gICAgICAgIC8vIHByZXNzIG9uIFwiT3B0aW9uc1wiXG4gICAgICAgIGlmIChVdGlscy5vYmplY3RDbGlja2FibGUocHVycG9zZUJ1dHRvbikgJiYgdGhpcy5fY21wLnN0YXRlID09PSAwKSB7XG4gICAgICAgICAgICB0aGlzLl9jbXAuc3RhdGUgPSAxO1xuICAgICAgICAgICAgcHVycG9zZUJ1dHRvbi5jbGljaygpO1xuICAgICAgICB9XG4gICAgICAgIC8vIGRpc2FibGUgYWxsXG4gICAgICAgIGVsc2UgaWYgKFV0aWxzLm9iamVjdENsaWNrYWJsZShkZW55QWxsQnV0dG9uKSAmJiB0aGlzLl9jbXAuc3RhdGUgPT09IDEpIHtcbiAgICAgICAgICAgIHRoaXMuX2NtcC5zdGF0ZSA9IDI7XG4gICAgICAgICAgICBkZW55QWxsQnV0dG9uLmNsaWNrKCk7XG4gICAgICAgIH1cbiAgICAgICAgLy8gc2F2ZSBzZXR0aW5nc1xuICAgICAgICBlbHNlIGlmIChVdGlscy5vYmplY3RDbGlja2FibGUoc2F2ZUJ1dHRvbikgJiYgdGhpcy5fY21wLnN0YXRlID09PSAyKSB7XG4gICAgICAgICAgICBzYXZlQnV0dG9uLmNsaWNrKCk7XG4gICAgICAgICAgICB0aGlzLl9jbXAucmVzZXQoKTtcbiAgICAgICAgfVxuICAgICAgICAvLyBzZXBhcmF0ZWQgQnJhbmNoLCBpZiB0aGVyZSBpcyBcIlJlamVjdC1BbGwgQnV0dG9uXCJcbiAgICAgICAgZWxzZSBpZiAoVXRpbHMub2JqZWN0Q2xpY2thYmxlKHJlamVjdEFsbEJ1dHRvbikgJiYgdGhpcy5fY21wLnN0YXRlID09PSAwKSB7XG4gICAgICAgICAgICByZWplY3RBbGxCdXR0b24uY2xpY2soKTtcbiAgICAgICAgICAgIHRoaXMuX2NtcC5yZXNldCgpO1xuICAgICAgICB9XG4gICAgfVxufVxuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5pbXBvcnQgVXRpbHMgZnJvbSBcIi4uL1V0aWxzXCI7XG5pbXBvcnQgQ01QIGZyb20gXCIuL0NNUFwiO1xuaW1wb3J0IENtcFR5cGUgZnJvbSBcIi4vQ21wVHlwZVwiO1xuZXhwb3J0IGRlZmF1bHQgY2xhc3MgU291cmNlUG9pbnQge1xuICAgIGNvbnN0cnVjdG9yKG5vZGUsIHNjcmlwdFVybCwgYmFja2VuZENhbGwpIHtcbiAgICAgICAgdGhpcy5fbmFtZSA9IFwiU291cmNlcG9pbnQgVGVjaG5vbG9naWVzLCBJbmMuXCI7XG4gICAgICAgIHRoaXMuX2ZpcnN0U3RlcENvbXBsZXRlZCA9IGZhbHNlO1xuICAgICAgICB0aGlzLl9zZWNvbmRTdGVwQ29tcGxldGVkID0gZmFsc2U7XG4gICAgICAgIGJhY2tlbmRDYWxsLmNtcERhdGEoNiwgdGhpcy5fbmFtZSwgc2NyaXB0VXJsLCBDbXBUeXBlLkRPX05PVF9XQUlULCB0cnVlKTtcbiAgICAgICAgdGhpcy5fY21wID0gbmV3IENNUChub2RlLCBiYWNrZW5kQ2FsbCwgdGhpcyk7XG4gICAgfVxuICAgIGdldCBuYW1lKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fbmFtZTtcbiAgICB9XG4gICAgY29ubmVjdCgpIHtcbiAgICAgICAgdGhpcy5fY21wLmNvbm5lY3QoKTtcbiAgICB9XG4gICAgLy8gU2FtcGxlOiBodHRwczovL3d3dy5zdG9ybm93YXlnYXpldHRlLmNvLnVrLywgaHR0cHM6Ly93d3cudGhldGltZXMuY28udWsvLCBodHRwczovL3d3dy5kdWRlbi5kZS9cbiAgICAvLyBodHRwczovL25vdGljZS5zcC1wcm9kLm5ldC8/bWVzc2FnZV9pZD0xMTY0NjUmYW1wO21tc19vcmlnaW49aHR0cHM6Ly9jbXAuc3Rvcm5vd2F5Z2F6ZXR0ZS5jby51ay9tbXMvdjIlMjIlMjBpZD0lMjJzcF9tZXNzYWdlX2lmcmFtZV8xMTY0NjVcbiAgICAvLyBodHRwczovL25vdGljZS5zcC1wcm9kLm5ldC8/bWVzc2FnZV9pZD0xMDExNzUmYW1wO21tc19vcmlnaW49aHR0cHM6Ly9jbXAudGhldGltZXMuY28udWsvbW1zL3YyJTIyJTIwaWQ9JTIyc3BfbWVzc2FnZV9pZnJhbWVfMTAxMTc1XG4gICAgLy8gaHR0cHM6Ly93d3cub3BlbnRoZXNhdXJ1cy5kZS8gPT4gbm90IHdvcmtpbmcuXG4gICAgaGFuZGxlQ21wKCkge1xuICAgICAgICAvLyBUaGlzIGlzIHRoZSBmaXJzdCBJZnJhbWUsIHdlIG5lZWQgdG8gaGFuZGxlLiBIZXJlIHdlIGNsaWNrIG9uIGRldGFpbHMuXG4gICAgICAgIC8vIGZvciBzb21lIHJlYXNvbiB0aGUgT2JzZXJ2ZXIgZG9lcyBub3QgZGV0ZWN0IHRoZSBjaGFuZ2VzLlxuICAgICAgICBpZiAoZG9jdW1lbnQubG9jYXRpb24udG9TdHJpbmcoKS5pbmNsdWRlcyhcInNwLXByb2QubmV0XCIpICYmICF0aGlzLl9maXJzdFN0ZXBDb21wbGV0ZWQpIHtcbiAgICAgICAgICAgIFV0aWxzLmxvZyhcImluIDFzdCBJRnJhbWVcIik7XG4gICAgICAgICAgICBsZXQgX3NlbGYgPSB0aGlzO1xuICAgICAgICAgICAgbGV0IF9jb3VudGVyID0gMDtcbiAgICAgICAgICAgIHRoaXMuX2ZpcnN0VGltZW91dCA9IHNldFRpbWVvdXQoZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIF9zZWxmLmZpcnN0QnV0dG9uKF9zZWxmLCBfY291bnRlcik7XG4gICAgICAgICAgICB9LCAxMDAwKTtcbiAgICAgICAgfVxuICAgICAgICAvLyBUaGlzIGlzIHRoZSBTZWNvbmQgSWZyYW1lLCB3ZSBuZWVkIHRvIGhhbmRsZS4gSGVyZSB3ZSB1bmNoZWNrIGFsbCB0aGUgY2hlY2tib3hlcyBhbmQgc2F2ZS5cbiAgICAgICAgLy8gZm9yIHNvbWUgcmVhc29uIHRoZSBPYnNlcnZlciBkb2VzIG5vdCBkZXRlY3QgdGhlIGNoYW5nZXMuXG4gICAgICAgIGlmIChkb2N1bWVudC5sb2NhdGlvbi50b1N0cmluZygpLmluY2x1ZGVzKFwic291cmNlcG9pbnQubWdyLmNvbnNlbnN1Lm9yZ1wiKSAmJiAhdGhpcy5fc2Vjb25kU3RlcENvbXBsZXRlZCkge1xuICAgICAgICAgICAgVXRpbHMubG9nKFwiaW4gMm5kIElGcmFtZVwiKTtcbiAgICAgICAgICAgIGxldCBfc2VsZiA9IHRoaXM7XG4gICAgICAgICAgICBsZXQgX2NvdW50ZXIgPSAwO1xuICAgICAgICAgICAgdGhpcy5fc2Vjb25kVGltZW91dCA9IHNldFRpbWVvdXQoZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIF9zZWxmLnNlY29uZEJ1dHRvbihfc2VsZiwgX2NvdW50ZXIpO1xuICAgICAgICAgICAgfSwgMTAwMCk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgZmlyc3RCdXR0b24oX3NlbGYsIF9jb3VudGVyKSB7XG4gICAgICAgIGNvbnN0IGFsbHBvcHVwID0gXCJidXR0b24ubWVzc2FnZS1idXR0b25cIjtcbiAgICAgICAgbGV0IGFsbHBvcHVwQnV0dG9ucyA9IF9zZWxmLl9jbXAucXVlcnlOb2RlU2VsZWN0b3JBbGwoYWxscG9wdXApO1xuICAgICAgICAvLyBwcmVzcyBvbiBcIk9wdGlvbnNcIlxuICAgICAgICBpZiAoVXRpbHMub2JqZWN0Q2xpY2thYmxlKGFsbHBvcHVwQnV0dG9uc1swXSkgJiYgYWxscG9wdXBCdXR0b25zLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgIFV0aWxzLmxvZyhcIkRldGFpbHMgY2xpY2tlZC5cIik7XG4gICAgICAgICAgICBfY291bnRlciA9IDUxO1xuICAgICAgICAgICAgX3NlbGYuX2ZpcnN0U3RlcENvbXBsZXRlZCA9IHRydWU7XG4gICAgICAgICAgICBjbGVhclRpbWVvdXQoX3NlbGYuX2ZpcnN0VGltZW91dCk7XG4gICAgICAgICAgICBhbGxwb3B1cEJ1dHRvbnNbMF0uY2xpY2soKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmIChfY291bnRlciA8IDUwKSB7XG4gICAgICAgICAgICBfc2VsZi5fZmlyc3RUaW1lb3V0ID0gc2V0VGltZW91dChmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgX3NlbGYuc2Vjb25kQnV0dG9uKF9zZWxmLCBfY291bnRlcik7XG4gICAgICAgICAgICB9LCAxMDAwKTtcbiAgICAgICAgICAgIF9jb3VudGVyKys7XG4gICAgICAgICAgICBVdGlscy5sb2coXCJDb3VudGVyOiAoMXN0IEJ1dHRvbilcIiArIF9jb3VudGVyKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBzZWNvbmRCdXR0b24oX3NlbGYsIF9jb3VudGVyKSB7XG4gICAgICAgIGNvbnN0IHN3aXRjaGVzQWxsID0gXCJkaXYuc3Atc3dpdGNoLWFycm93LWJsb2NrXCI7XG4gICAgICAgIGxldCBzd2l0Y2hlc0FsbERpdiA9IF9zZWxmLl9jbXAucXVlcnlOb2RlU2VsZWN0b3JBbGwoc3dpdGNoZXNBbGwpO1xuICAgICAgICBVdGlscy5sb2coXCJBbGwgc3dpdGNoZXNBbGw6IFwiICsgc3dpdGNoZXNBbGxEaXYubGVuZ3RoKTtcbiAgICAgICAgY29uc3Qgc3dpdGNoZXNPbiA9IFwiZGl2LnNwLXN3aXRjaC1hcnJvdy1ibG9jayBhLm9uXCI7XG4gICAgICAgIGxldCBzd2l0Y2hlc09uRGl2ID0gX3NlbGYuX2NtcC5xdWVyeU5vZGVTZWxlY3RvckFsbChzd2l0Y2hlc09uKTtcbiAgICAgICAgVXRpbHMubG9nKFwiT24gc3dpdGNoZXNBbGw6IFwiICsgc3dpdGNoZXNPbkRpdi5sZW5ndGgpO1xuICAgICAgICBjb25zdCBzYXZlID0gXCJidXR0b24ucHJpdi1zYXZlLWJ0blwiO1xuICAgICAgICBsZXQgc2F2ZUJ1dHRvbiA9IF9zZWxmLl9jbXAucXVlcnlOb2RlU2VsZWN0b3Ioc2F2ZSk7XG4gICAgICAgIFV0aWxzLmxvZyhcIlNhdmUgQnV0dG9uOiBcIiArIHNhdmVCdXR0b24pO1xuICAgICAgICBjb25zdCBzYXZlMiA9IFwiYnV0dG9uI3RhYi1zYXZlYW5kZXhpdFwiO1xuICAgICAgICBsZXQgc2F2ZUJ1dHRvbjIgPSBfc2VsZi5fY21wLnF1ZXJ5Tm9kZVNlbGVjdG9yKHNhdmUyKTtcbiAgICAgICAgVXRpbHMubG9nKFwiU2F2ZTIgQnV0dG9uOiBcIiArIHNhdmVCdXR0b24yKTtcbiAgICAgICAgLy8gaWYgdGhlcmUgaXMgYXQgbGVhc3Qgb25lIHN3aXRjaCBhbmQgaWYgdGhlcmUgaXMgYXQgbGVhc3Qgb24gc3dpdGNoIFwiT05cIlxuICAgICAgICBpZiAoc3dpdGNoZXNBbGxEaXYubGVuZ3RoID4gMCAmJiAoVXRpbHMub2JqZWN0Q2xpY2thYmxlKHNhdmVCdXR0b24pIHx8IFV0aWxzLm9iamVjdENsaWNrYWJsZShzYXZlQnV0dG9uMikpKSB7XG4gICAgICAgICAgICAvLyBpZiB0aGVyZSBhcyBzd2l0Y2hlcyB0byBzd2l0Y2ggb2ZmLCBkbyBzby5cbiAgICAgICAgICAgIGlmIChzd2l0Y2hlc09uRGl2Lmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgICAgICBzd2l0Y2hlc09uRGl2LmZvckVhY2goKGhyZWYpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgVXRpbHMubG9nKFwiQ2hhbmdpbmcgQnV0dG9uIGZyb20gT04gdG8gT2ZmXCIpO1xuICAgICAgICAgICAgICAgICAgICBocmVmLmNsaWNrKCk7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICAvLyBub3cgY29uZmlybS5cbiAgICAgICAgICAgIGlmIChVdGlscy5vYmplY3RDbGlja2FibGUoc2F2ZUJ1dHRvbikpIHtcbiAgICAgICAgICAgICAgICBzYXZlQnV0dG9uLmNsaWNrKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICBzYXZlQnV0dG9uMi5jbGljaygpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgX2NvdW50ZXIgPSA1MTtcbiAgICAgICAgICAgIF9zZWxmLl9zZWNvbmRTdGVwQ29tcGxldGVkID0gdHJ1ZTtcbiAgICAgICAgICAgIGNsZWFyVGltZW91dChfc2VsZi5fc2Vjb25kVGltZW91dCk7XG4gICAgICAgICAgICBfc2VsZi5fY21wLnJlc2V0KCk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAoX2NvdW50ZXIgPCA1MCkge1xuICAgICAgICAgICAgX3NlbGYuX3NlY29uZFRpbWVvdXQgPSBzZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICBfc2VsZi5zZWNvbmRCdXR0b24oX3NlbGYsIF9jb3VudGVyKTtcbiAgICAgICAgICAgIH0sIDEwMDApO1xuICAgICAgICAgICAgX2NvdW50ZXIrKztcbiAgICAgICAgICAgIFV0aWxzLmxvZyhcIkNvdW50ZXIgKDJuZCBCdXR0b24pOiBcIiArIF9jb3VudGVyKTtcbiAgICAgICAgfVxuICAgIH1cbn1cbiIsIlwidXNlIHN0cmljdFwiO1xuaW1wb3J0IFV0aWxzIGZyb20gXCIuLi9VdGlsc1wiO1xuaW1wb3J0IENNUCBmcm9tIFwiLi9DTVBcIjtcbmltcG9ydCBDbXBUeXBlIGZyb20gXCIuL0NtcFR5cGVcIjtcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFRyYWZmZWN0aXZlIHtcbiAgICBjb25zdHJ1Y3Rvcihub2RlLCBzY3JpcHRVcmwsIGJhY2tlbmRDYWxsKSB7XG4gICAgICAgIHRoaXMuX25hbWUgPSBcIlRyYWZmZWN0aXZlIEdtYkhcIjtcbiAgICAgICAgYmFja2VuZENhbGwuY21wRGF0YSgyMSwgdGhpcy5fbmFtZSwgc2NyaXB0VXJsLCBDbXBUeXBlLldBSVRfRk9SX0FTWU5DX0NBTExCQUNLLCB0cnVlKTtcbiAgICAgICAgdGhpcy5fY21wID0gbmV3IENNUChub2RlLCBiYWNrZW5kQ2FsbCwgdGhpcyk7XG4gICAgfVxuICAgIGdldCBuYW1lKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fbmFtZTtcbiAgICB9XG4gICAgY29ubmVjdCgpIHtcbiAgICAgICAgdGhpcy5fY21wLmNvbm5lY3QoKTtcbiAgICB9XG4gICAgaGFuZGxlQ21wKCkge1xuICAgICAgICBjb25zdCBnZHByRGl2ID0gJ2Rpdi5nZHByX3BvcHVwX3BvcHVwJztcbiAgICAgICAgbGV0IHBvcHVwID0gdGhpcy5fY21wLnF1ZXJ5Tm9kZVNlbGVjdG9yKGdkcHJEaXYpO1xuICAgICAgICBjb25zdCBnZHByQ2hlY2tCb3hlcyA9ICdpbnB1dFt0eXBlPWNoZWNrYm94XS5nZHByX3N3aXRjaF9uYXRpdmUnO1xuICAgICAgICBsZXQgY2hlY2tib3hlcyA9IHRoaXMuX2NtcC5xdWVyeU5vZGVTZWxlY3RvckFsbChnZHByQ2hlY2tCb3hlcyk7XG4gICAgICAgIGNvbnN0IGdkcHJTYXZlQnV0dG9uID0gJ2Rpdi5pcy1wcmltYXJ5LWJ1dHRvbic7XG4gICAgICAgIGxldCBzYXZlQnV0dG9uID0gdGhpcy5fY21wLnF1ZXJ5Tm9kZVNlbGVjdG9yKGdkcHJTYXZlQnV0dG9uKTtcbiAgICAgICAgaWYgKFV0aWxzLm9iamVjdFZpc2libGUocG9wdXApICYmIHRoaXMuX2NtcC5zdGF0ZSA9PT0gMCkge1xuICAgICAgICAgICAgVXRpbHMubG9nKCdDaGVja2JveGVzIGZvdW5kOiAnICsgY2hlY2tib3hlcy5sZW5ndGgpO1xuICAgICAgICAgICAgY2hlY2tib3hlcy5mb3JFYWNoKChjaGVja2JveCkgPT4gY2hlY2tib3guc2V0QXR0cmlidXRlKFwiY2hlY2tlZFwiLCBcImZhbHNlXCIpLCBVdGlscy5sb2coXCJDaGVja2JveCB1bnNldFwiKSk7XG4gICAgICAgICAgICB0aGlzLl9jbXAuc3RhdGUgPSAxO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKFV0aWxzLm9iamVjdENsaWNrYWJsZShzYXZlQnV0dG9uKSAmJiB0aGlzLl9jbXAuc3RhdGUgPT09IDEpIHtcbiAgICAgICAgICAgIFV0aWxzLmxvZygnQnV0dG9uIGZvdW5kIC4uLicpO1xuICAgICAgICAgICAgc2F2ZUJ1dHRvbi5jbGljaygpO1xuICAgICAgICAgICAgdGhpcy5fY21wLnJlc2V0KCk7XG4gICAgICAgIH1cbiAgICB9XG59XG4iLCJcInVzZSBzdHJpY3RcIjtcbmltcG9ydCBVdGlscyBmcm9tIFwiLi4vVXRpbHNcIjtcbmltcG9ydCBDTVAgZnJvbSBcIi4vQ01QXCI7XG5pbXBvcnQgQ21wVHlwZSBmcm9tIFwiLi9DbXBUeXBlXCI7XG5leHBvcnQgZGVmYXVsdCBjbGFzcyBUcnVzdEFyY0Jhbm5lciB7XG4gICAgY29uc3RydWN0b3Iobm9kZSwgc2NyaXB0VXJsLCBiYWNrZW5kQ2FsbCkge1xuICAgICAgICB0aGlzLl9uYW1lID0gXCJUcnVzdEFyYyBJbmMgKEJhbm5lcilcIjtcbiAgICAgICAgYmFja2VuZENhbGwuY21wRGF0YSg0MSwgdGhpcy5fbmFtZSwgc2NyaXB0VXJsLCBDbXBUeXBlLkRPX05PVF9XQUlULCB0cnVlKTtcbiAgICAgICAgdGhpcy5fY21wID0gbmV3IENNUChub2RlLCBiYWNrZW5kQ2FsbCwgdGhpcyk7XG4gICAgfVxuICAgIGdldCBuYW1lKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fbmFtZTtcbiAgICB9XG4gICAgY29ubmVjdCgpIHtcbiAgICAgICAgdGhpcy5fY21wLmNvbm5lY3QoKTtcbiAgICB9XG4gICAgaGFuZGxlQ21wKCkge1xuICAgICAgICBjb25zdCBjb250ZW50ID0gXCIjdHJ1c3RlLWNvbnNlbnQtY29udGVudCwgLnRydXN0ZS1jb25zZW50LWNvbnRlbnRcIjtcbiAgICAgICAgbGV0IGNvbnRlbnREaXYgPSB0aGlzLl9jbXAucXVlcnlOb2RlU2VsZWN0b3IoY29udGVudCk7XG4gICAgICAgIGNvbnN0IHJlcXVpcmVkID0gXCIjdHJ1c3RlLXNob3ctY29uc2VudFwiO1xuICAgICAgICBsZXQgcmVxdWlyZWRCdXR0b24gPSB0aGlzLl9jbXAucXVlcnlOb2RlU2VsZWN0b3IocmVxdWlyZWQpO1xuICAgICAgICBVdGlscy5sb2coXCJkZXRhaWxzOiBcIiArIHJlcXVpcmVkQnV0dG9uKTtcbiAgICAgICAgVXRpbHMubG9nKFwiU3RhdGU6IFwiICsgdGhpcy5fY21wLnN0YXRlKTtcbiAgICAgICAgaWYgKFV0aWxzLm9iamVjdENsaWNrYWJsZShyZXF1aXJlZEJ1dHRvbikgJiYgVXRpbHMub2JqZWN0Q2xpY2thYmxlKGNvbnRlbnREaXYpICYmIHRoaXMuX2NtcC5zdGF0ZSA9PT0gMCkge1xuICAgICAgICAgICAgVXRpbHMubG9nKFwiZGV0YWlsc0J1dHRvbiBjbGlja2VkXCIpO1xuICAgICAgICAgICAgdGhpcy5kZWxheWVkQ2xpY2soMCk7XG4gICAgICAgICAgICB0aGlzLl9jbXAuc3RhdGUgPSAxO1xuICAgICAgICB9XG4gICAgfVxuICAgIGRlbGF5ZWRDbGljayhjb3VudCkge1xuICAgICAgICBjb25zdCByZXF1aXJlZCA9IFwiI3RydXN0ZS1zaG93LWNvbnNlbnRcIjtcbiAgICAgICAgbGV0IHJlcXVpcmVkQnV0dG9uID0gdGhpcy5fY21wLnF1ZXJ5Tm9kZVNlbGVjdG9yKHJlcXVpcmVkKTtcbiAgICAgICAgcmVxdWlyZWRCdXR0b24uY2xpY2soKTtcbiAgICAgICAgVXRpbHMubG9nKFwiQ3VycmVudCBDb3VudDpcIiArIGNvdW50KTtcbiAgICAgICAgaWYgKGNvdW50IDwgMSkge1xuICAgICAgICAgICAgbGV0IF9zZWxmID0gdGhpcztcbiAgICAgICAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIF9zZWxmLmRlbGF5ZWRDbGljayhjb3VudCArIDEpO1xuICAgICAgICAgICAgICAgIFV0aWxzLmxvZyhcIkNsaWNrZWRcIik7XG4gICAgICAgICAgICB9LCAxMDAwKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIFV0aWxzLmxvZyhcIm1heGltdW0gcmVhY2hlZFwiKTtcbiAgICAgICAgICAgIHRoaXMuX2NtcC5yZXNldCgpO1xuICAgICAgICB9XG4gICAgfVxufVxuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5pbXBvcnQgVXRpbHMgZnJvbSBcIi4uL1V0aWxzXCI7XG5pbXBvcnQgQ01QIGZyb20gXCIuL0NNUFwiO1xuaW1wb3J0IENtcFR5cGUgZnJvbSBcIi4vQ21wVHlwZVwiO1xuZXhwb3J0IGRlZmF1bHQgY2xhc3MgVHJ1c3RBcmNJRnJhbWUge1xuICAgIGNvbnN0cnVjdG9yKG5vZGUsIHNjcmlwdFVybCwgYmFja2VuZENhbGwpIHtcbiAgICAgICAgdGhpcy5fbmFtZSA9IFwiVHJ1c3RBcmMgSW5jIChJRnJhbWUpXCI7XG4gICAgICAgIGJhY2tlbmRDYWxsLmNtcERhdGEoNDEsIHRoaXMuX25hbWUsIHNjcmlwdFVybCwgQ21wVHlwZS5ET19OT1RfV0FJVCwgdHJ1ZSk7XG4gICAgICAgIHRoaXMuX2NtcCA9IG5ldyBDTVAobm9kZSwgYmFja2VuZENhbGwsIHRoaXMpO1xuICAgIH1cbiAgICBnZXQgbmFtZSgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX25hbWU7XG4gICAgfVxuICAgIGNvbm5lY3QoKSB7XG4gICAgICAgIHRoaXMuX2NtcC5jb25uZWN0KCk7XG4gICAgfVxuICAgIC8qXG5cbiAgICAgICAgaHR0cHM6Ly9kb2NzLm9yYWNsZS5jb20vXG4gICAgICAgIGh0dHBzOi8vbmV3c3Jvb20uaWJtLmNvbS9cblxuICAgICAqL1xuICAgIGhhbmRsZUNtcCgpIHtcbiAgICAgICAgLy8gZnJvbSB3aXRoaW4gSUZyYW1lXG4gICAgICAgIGNvbnN0IG1vcmVJbmZvcm1hdGlvbiA9IFwiLnNocFwiO1xuICAgICAgICBsZXQgbW9yZUluZm9ybWF0aW9uQnV0dG9uID0gdGhpcy5fY21wLnF1ZXJ5Tm9kZVNlbGVjdG9yKG1vcmVJbmZvcm1hdGlvbik7XG4gICAgICAgIGNvbnN0IGFkdmFuY2VkID0gXCIuYWR2YW5jZVwiO1xuICAgICAgICBsZXQgYWR2YW5jZWRCdXR0b24gPSB0aGlzLl9jbXAucXVlcnlOb2RlU2VsZWN0b3IoYWR2YW5jZWQpO1xuICAgICAgICBVdGlscy5sb2coXCJhZHZhbmNlZDogXCIgKyBhZHZhbmNlZEJ1dHRvbik7XG4gICAgICAgIGNvbnN0IHNwYW5PbiA9ICcub24nO1xuICAgICAgICBsZXQgc3Bhbk9uR3JvdXAgPSB0aGlzLl9jbXAucXVlcnlOb2RlU2VsZWN0b3JBbGwoc3Bhbk9uKTtcbiAgICAgICAgVXRpbHMubG9nKHNwYW5Pbkdyb3VwKTtcbiAgICAgICAgVXRpbHMubG9nKFwiU3BhbiBvbiBHcm91cCBMZW5ndGg6IFwiICsgc3Bhbk9uR3JvdXAubGVuZ3RoKTtcbiAgICAgICAgY29uc3Qgc3VibWl0ID0gXCIuc3VibWl0XCI7XG4gICAgICAgIGxldCBzdWJtaXRCdXR0b24gPSB0aGlzLl9jbXAucXVlcnlOb2RlU2VsZWN0b3Ioc3VibWl0KTtcbiAgICAgICAgVXRpbHMubG9nKFwic3VibWl0OiAnXCIgKyBzdWJtaXRCdXR0b24gKyBcIicgXCIgKyBKU09OLnN0cmluZ2lmeShzdWJtaXRCdXR0b24pKTtcbiAgICAgICAgY29uc3QgY2xvc2UgPSBcIi5jbG9zZVwiO1xuICAgICAgICBsZXQgY2xvc2VCdXR0b24gPSB0aGlzLl9jbXAucXVlcnlOb2RlU2VsZWN0b3IoY2xvc2UpO1xuICAgICAgICBVdGlscy5sb2coXCJDbG9zZTogXCIgKyBjbG9zZUJ1dHRvbik7XG4gICAgICAgIFV0aWxzLmxvZyhcIlN0YXRlOiBcIiArIHRoaXMuX2NtcC5zdGF0ZSk7XG4gICAgICAgIGlmIChVdGlscy5vYmplY3RDbGlja2FibGUobW9yZUluZm9ybWF0aW9uQnV0dG9uKSAmJiB0aGlzLl9jbXAuc3RhdGUgPCAxKSB7XG4gICAgICAgICAgICBVdGlscy5sb2coXCJtb3JlSW5mb3JtYXRpb25CdXR0b24gY2xpY2tlZFwiKTtcbiAgICAgICAgICAgIG1vcmVJbmZvcm1hdGlvbkJ1dHRvbi5jbGljaygpO1xuICAgICAgICAgICAgdGhpcy5fY21wLnN0YXRlID0gMTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmIChVdGlscy5vYmplY3RDbGlja2FibGUoYWR2YW5jZWRCdXR0b24pICYmIHRoaXMuX2NtcC5zdGF0ZSA8IDIpIHtcbiAgICAgICAgICAgIFV0aWxzLmxvZyhcImFkdmFuY2VkIGNsaWNrZWRcIik7XG4gICAgICAgICAgICBhZHZhbmNlZEJ1dHRvbi5jbGljaygpO1xuICAgICAgICAgICAgdGhpcy5fY21wLnN0YXRlID0gMjtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmIChzcGFuT25Hcm91cCAmJiBzcGFuT25Hcm91cC5sZW5ndGggPiAxICYmIHRoaXMuX2NtcC5zdGF0ZSA8IDMpIHtcbiAgICAgICAgICAgIHNwYW5Pbkdyb3VwLmZvckVhY2goKHNwYW4pID0+IHtcbiAgICAgICAgICAgICAgICBVdGlscy5sb2coXCJDaGFuZ2luZyBCdXR0b25cIik7XG4gICAgICAgICAgICAgICAgc3Bhbi5jbGljaygpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB0aGlzLl9jbXAuc3RhdGUgPSAzO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKFV0aWxzLm9iamVjdENsaWNrYWJsZShzdWJtaXRCdXR0b24pICYmIHRoaXMuX2NtcC5zdGF0ZSA9PT0gMykge1xuICAgICAgICAgICAgVXRpbHMubG9nKFwiQ2xpY2sgU3VibWl0XCIpO1xuICAgICAgICAgICAgc3VibWl0QnV0dG9uLmNsaWNrKCk7XG4gICAgICAgICAgICB0aGlzLl9jbXAuc3RhdGUgPSA0O1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKFV0aWxzLm9iamVjdENsaWNrYWJsZShjbG9zZUJ1dHRvbikgJiYgdGhpcy5fY21wLnN0YXRlID09PSA0KSB7XG4gICAgICAgICAgICBVdGlscy5sb2coXCJjbG9zZUJ1dHRvbiBjbGlja2VkXCIpO1xuICAgICAgICAgICAgY2xvc2VCdXR0b24uY2xpY2soKTtcbiAgICAgICAgICAgIHRoaXMuX2NtcC5yZXNldCgpO1xuICAgICAgICB9XG4gICAgfVxufVxuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5pbXBvcnQgVXRpbHMgZnJvbSBcIi4uL1V0aWxzXCI7XG5pbXBvcnQgQ01QIGZyb20gXCIuL0NNUFwiO1xuaW1wb3J0IENtcFR5cGUgZnJvbSBcIi4vQ21wVHlwZVwiO1xuZXhwb3J0IGRlZmF1bHQgY2xhc3MgVXNlckNlbnRyaWNzIHtcbiAgICBjb25zdHJ1Y3Rvcihub2RlLCBzY3JpcHRVcmwsIGJhY2tlbmRDYWxsKSB7XG4gICAgICAgIHRoaXMuX25hbWUgPSBcIlVzZXJjZW50cmljcyBHbWJIXCI7XG4gICAgICAgIGJhY2tlbmRDYWxsLmNtcERhdGEoNSwgdGhpcy5fbmFtZSwgc2NyaXB0VXJsLCBDbXBUeXBlLldBSVRfRk9SX0FTWU5DX0NBTExCQUNLLCB0cnVlKTtcbiAgICAgICAgdGhpcy5fY21wID0gbmV3IENNUChub2RlLCBiYWNrZW5kQ2FsbCwgdGhpcyk7XG4gICAgfVxuICAgIGdldCBuYW1lKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fbmFtZTtcbiAgICB9XG4gICAgY29ubmVjdCgpIHtcbiAgICAgICAgdGhpcy5fY21wLmNvbm5lY3QoKTtcbiAgICB9XG4gICAgaGFuZGxlQ21wKCkge1xuICAgICAgICAvLyB3ZSBhcmUgbG9va2luZyBmb3IgYSBiYW5uZXIgYW5kIGlmIHRoaXMgYmFubmVyIGlzIHZpc2libGUsIHdlIHRoZW4gaW5qZWN0IHRoZSBqYXZhc2NyaXB0LlxuICAgICAgICBjb25zdCB1Y0Jhbm5lckNvbnRlbnQgPSAnZGl2LnVjLWJhbm5lci1jb250ZW50JztcbiAgICAgICAgbGV0IGJhbm5lciA9IHRoaXMuX2NtcC5xdWVyeU5vZGVTZWxlY3Rvcih1Y0Jhbm5lckNvbnRlbnQpO1xuICAgICAgICAvLyB0eXBlb2YgYnV0dG9uICE9PSAndW5kZWZpbmVkJyAmJiBidXR0b24gJiYgdHlwZW9mIGJ1dHRvbi5wYXJlbnRFbGVtZW50ICE9PSAndW5kZWZpbmVkJ1xuICAgICAgICAvLyBjYXNlIGxpa2Ugb24gaHNlMjQuZGVcbiAgICAgICAgaWYgKFV0aWxzLm9iamVjdFZpc2libGUoYmFubmVyKSAmJiB0aGlzLl9jbXAuc3RhdGUgPT09IDApIHtcbiAgICAgICAgICAgIFV0aWxzLmxvZygnRGVueSBBbGwgYnV0dG9uIGZvdW5kJyk7XG4gICAgICAgICAgICBsZXQgc2NyaXB0ID0gdGhpcy5fY21wLm5vZGUuY3JlYXRlRWxlbWVudCgnc2NyaXB0Jyk7XG4gICAgICAgICAgICBzY3JpcHQudHlwZSA9ICd0ZXh0L2phdmFzY3JpcHQnO1xuICAgICAgICAgICAgc2NyaXB0LmFzeW5jID0gdHJ1ZTtcbiAgICAgICAgICAgIHNjcmlwdC50ZXh0ID0gJ2Z1bmN0aW9uIHMoY291bnRlcil7aWYoY291bnRlciA+PSAxMDApe3JldHVybjsgfSBpZih0eXBlb2YgdGhpcy51c2VyY2VudHJpY3MgIT09IFwidW5kZWZpbmVkXCIgJiYgdHlwZW9mIHRoaXMudXNlcmNlbnRyaWNzLmRlbnlBbGxDb25zZW50c0FuZENsb3NlSW5pdGlhbFZpZXcgIT09IFwidW5kZWZpbmVkXCIpeyB0aGlzLnVzZXJjZW50cmljcy5kZW55QWxsQ29uc2VudHNBbmRDbG9zZUluaXRpYWxWaWV3KCk7IH0gZWxzZSB7IHNldFRpbWVvdXQoZnVuY3Rpb24oKSB7cyhjb3VudGVyICsgMSl9LCAyNSk7ICB9fTsgcygxKTsnO1xuICAgICAgICAgICAgdGhpcy5fY21wLm5vZGUuaGVhZC5hcHBlbmRDaGlsZChzY3JpcHQpO1xuICAgICAgICAgICAgdGhpcy5fY21wLnJlc2V0KCk7XG4gICAgICAgIH1cbiAgICB9XG59XG4iLCJcInVzZSBzdHJpY3RcIjtcbmltcG9ydCBEZXRlY3RvciBmcm9tIFwiLi9EZXRlY3RvclwiO1xuaW1wb3J0IFV0aWxzIGZyb20gXCIuL1V0aWxzXCI7XG5pZiAoZG9jdW1lbnQucmVhZHlTdGF0ZSA9PT0gJ2xvYWRpbmcnKSB7XG4gICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignRE9NQ29udGVudExvYWRlZCcsIGFmdGVyRE9NTG9hZGVkKTtcbn1cbmVsc2Uge1xuICAgIGFmdGVyRE9NTG9hZGVkKCk7XG59XG5mdW5jdGlvbiBhZnRlckRPTUxvYWRlZCgpIHtcbiAgICBpZiAodHlwZW9mIHNhZmFyaSAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgVXRpbHMubG9nKFwiKysrIFJ1bm5pbmcgb24gU2FmYXJpICsrK1wiKTtcbiAgICB9XG4gICAgZWxzZSBpZiAodHlwZW9mIGNocm9tZSAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgVXRpbHMubG9nKFwiKysrIFJ1bm5pbmcgb24gQ2hyb21pdW0gUGxhdGZvcm0gKysrXCIpO1xuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgICAgVXRpbHMubG9nKFwiKysrIFJ1bm5pbmcgb24gc29tZSBvdGhlciBQbGF0Zm9ybSArKytcIik7XG4gICAgfVxuICAgIC8vIG9ubHkgZXhlY3V0ZSB0aGUgY29udGVudCBzY3JpcHRcbiAgICAvLyAtIGlmIHRoZXJlIGlzIGRvYyB0eXBlXG4gICAgLy8gLSBpZiB0aGVyZSBpcyBib2R5IHdpdGggYSBkZWZpbmVkIGxlbmd0aFxuICAgIC8vIC0gaWYgdGhlcmUgYXJlIHNvbWUgY2hpbGQgbm9kZXMgaW4gdGhlIGJvZHlcbiAgICBVdGlscy5sb2coXCJDb25zZW50IFNjcmlwdCBQYXJhbWV0ZXI6IFwiICsgSlNPTi5zdHJpbmdpZnkoZG9jdW1lbnQuZG9jdHlwZSkgKyBcIiwgTGVuOiBcIiArIGRvY3VtZW50LmJvZHkuaW5uZXJIVE1MLmxlbmd0aCArIFwiLCBOb2RlczogXCIgKyBkb2N1bWVudC5ib2R5LmNoaWxkTm9kZXMubGVuZ3RoKTtcbiAgICBsZXQgaW5GcmFtZSA9IGZhbHNlO1xuICAgIHRyeSB7XG4gICAgICAgIGluRnJhbWUgPSB3aW5kb3cuc2VsZiAhPT0gd2luZG93LnRvcDtcbiAgICAgICAgVXRpbHMubG9nKFwiUnVubmluZyBpbiBJRnJhbWU6IFwiICsgaW5GcmFtZSk7XG4gICAgfVxuICAgIGNhdGNoIChlKSB7XG4gICAgICAgIFV0aWxzLmxvZyhcIkVycm9yIEZpZ3VyaW5nIG91dCBpZiB3ZSBhcmUgcnVubmluZyBpbiBhbiBpRnJhbWVcIik7XG4gICAgICAgIGluRnJhbWUgPSBmYWxzZTtcbiAgICB9XG4gICAgaWYgKGRvY3VtZW50LmRvY3R5cGUgJiYgZG9jdW1lbnQuYm9keS5pbm5lckhUTUwubGVuZ3RoID4gMTAwKSB7XG4gICAgICAgIFV0aWxzLmxvZyhcIlRyaWdnZXJpbmcgQ29udGVudCBTY3JpcHRcIik7XG4gICAgICAgIGNvbnN0IG1lc3NhZ2VGcm9tID0gXCJGUk9NX01JTklNQUxfQ09OU0VOVFwiO1xuICAgICAgICAvLyBUaGlzIGlzIHRoZSBzY3JpcHQgZm9yIGNoZWNraW5nIHdoZXRoZXIgdGhlcmUgaXMgYSBUQ0YgMS4xIG9yIFRDRiAyLjAgY29tcGxpYW50IENNUC5cbiAgICAgICAgbGV0IHNjcmlwdCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NjcmlwdCcpO1xuICAgICAgICBzY3JpcHQudHlwZSA9ICd0ZXh0L2phdmFzY3JpcHQnO1xuICAgICAgICBzY3JpcHQuYXN5bmMgPSB0cnVlO1xuICAgICAgICBzY3JpcHQudGV4dCA9ICd3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcihcImxvYWRcIixjaGVja0ZvckNtcCwhMSk7bGV0IGRhdGFmcmFtZUZvclBpbmdSZXR1cm49e3R5cGU6XCJGUk9NX01JTklNQUxfQ09OU0VOVFwifSxjaGVja0ZvckNtcENvdW50ZXI9MCxtYXhUaW1lb3V0Rm9yUmVzZWFyY2g9MjAwLG1heFJldHJ5Rm9yU2VhcmNoPTI1O2Z1bmN0aW9uIGNoZWNrRm9yQ21wKCl7dGhpcy5fX2NtcD90aGlzLl9fY21wKFwicGluZ1wiLDIsc2VuZE1lc3NhZ2UpOnRoaXMuX190Y2ZhcGk/dGhpcy5fX3RjZmFwaShcInBpbmdcIiwyLHNlbmRNZXNzYWdlKTp0aGlzLmZyYW1lcyYmdGhpcy5mcmFtZXMubGVuZ3RoJiZ0aGlzLmZyYW1lcy5fX3RjZmFwaUxvY2F0b3I/dGhpcy5fX3RjZmFwaShcInBpbmdcIiwyLHNlbmRNZXNzYWdlKTpjaGVja0ZvckNtcENvdW50ZXI8bWF4UmV0cnlGb3JTZWFyY2g/KHNldFRpbWVvdXQoY2hlY2tGb3JDbXAsbWF4VGltZW91dEZvclJlc2VhcmNoKSxjaGVja0ZvckNtcENvdW50ZXIrKyk6d2luZG93LnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJsb2FkXCIsY2hlY2tGb3JDbXAsITEpfWZ1bmN0aW9uIHNlbmRNZXNzYWdlKGUsdCl7dCYmKGRhdGFmcmFtZUZvclBpbmdSZXR1cm4uY21wPUpTT04uc3RyaW5naWZ5KGUpLHdpbmRvdy5wb3N0TWVzc2FnZShkYXRhZnJhbWVGb3JQaW5nUmV0dXJuLFwiKlwiKSx3aW5kb3cucmVtb3ZlRXZlbnRMaXN0ZW5lcihcImxvYWRcIixjaGVja0ZvckNtcCwhMSkpfSc7XG4gICAgICAgIGRvY3VtZW50LmhlYWQuYXBwZW5kQ2hpbGQoc2NyaXB0KTtcbiAgICAgICAgY29uc3QgZGV0ZWN0b3IgPSBuZXcgRGV0ZWN0b3IoZG9jdW1lbnQsIGluRnJhbWUpO1xuICAgICAgICBkZXRlY3Rvci5jb25uZWN0T2JzZXJ2ZXIoKTtcbiAgICAgICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoXCJtZXNzYWdlXCIsIGZ1bmN0aW9uIChldmVudCkge1xuICAgICAgICAgICAgLy8gV2Ugb25seSBhY2NlcHQgbWVzc2FnZXMgZnJvbSBvdXJzZWx2ZXNcbiAgICAgICAgICAgIGlmIChldmVudC5zb3VyY2UgIT09IHdpbmRvdylcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAvLyBvbmx5IGlmIHRoZXJlIFRDRiAxLjEgb3IgVEZDIDIuMCBjb21wbGlhbnQgQ01QIGZvdW5kLCBsYXVuY2ggdGhlIGFwcHJvcHJpYXRlIGRldGVjdG9yLlxuICAgICAgICAgICAgLy8gaWYgdGhlIHByb3ByaWV0YXJ5IGluaXRpYWxpemF0aW9uIGFscmVhZHkgd29ya2VkIG91dCwgZG9uJ3QgaW5pdGlhbGl6ZSB0aGUgQ01QIGFnYWluLlxuICAgICAgICAgICAgaWYgKGV2ZW50LmRhdGEudHlwZSAmJiBldmVudC5kYXRhLnR5cGUgPT09IG1lc3NhZ2VGcm9tKSB7XG4gICAgICAgICAgICAgICAgLy8gZ2l2ZW4gdGhlIFBpbmcgUmVzdWx0IHRvIHRoZSBEZXRlY3RvciBPYmplY3QuXG4gICAgICAgICAgICAgICAgZGV0ZWN0b3IucGluZ1Jlc3VsdCA9IGV2ZW50LmRhdGEuY21wO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9XG59XG4iLCJcInVzZSBzdHJpY3RcIjtcbmltcG9ydCBVdGlscyBmcm9tIFwiLi4vVXRpbHNcIjtcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFBpbmdSZXN1bHQge1xuICAgIGNvbnN0cnVjdG9yKGdkcHJBcHBsaWVzR2xvYmFsbHksIGdkcHJBcHBsaWVzLCBjbXBMb2FkZWQsIGNtcFN0YXR1cywgZGlzcGxheVN0YXR1cywgYXBpVmVyc2lvbiwgY21wVmVyc2lvbiwgY21wSWQsIGd2bFZlcnNpb24sIHRjZlBvbGljeVZlcnNpb24pIHtcbiAgICAgICAgaWYgKFV0aWxzLmNoZWNrSWZEZWZpbmVkQW5kTm90TnVsbChnZHByQXBwbGllc0dsb2JhbGx5KSkge1xuICAgICAgICAgICAgdGhpcy5fZ2RwckFwcGxpZXNHbG9iYWxseSA9IGdkcHJBcHBsaWVzR2xvYmFsbHk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKFV0aWxzLmNoZWNrSWZEZWZpbmVkQW5kTm90TnVsbChnZHByQXBwbGllcykpIHtcbiAgICAgICAgICAgIHRoaXMuX2dkcHJBcHBsaWVzID0gZ2RwckFwcGxpZXM7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKFV0aWxzLmNoZWNrSWZEZWZpbmVkQW5kTm90TnVsbChjbXBMb2FkZWQpKSB7XG4gICAgICAgICAgICB0aGlzLl9jbXBMb2FkZWQgPSBjbXBMb2FkZWQ7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKFV0aWxzLmNoZWNrSWZEZWZpbmVkQW5kTm90TnVsbChjbXBTdGF0dXMpKSB7XG4gICAgICAgICAgICB0aGlzLl9jbXBTdGF0dXMgPSBjbXBTdGF0dXM7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKFV0aWxzLmNoZWNrSWZEZWZpbmVkQW5kTm90TnVsbChkaXNwbGF5U3RhdHVzKSkge1xuICAgICAgICAgICAgdGhpcy5fZGlzcGxheVN0YXR1cyA9IGRpc3BsYXlTdGF0dXM7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKFV0aWxzLmNoZWNrSWZEZWZpbmVkQW5kTm90TnVsbChhcGlWZXJzaW9uKSkge1xuICAgICAgICAgICAgdGhpcy5fYXBpVmVyc2lvbiA9IGFwaVZlcnNpb247XG4gICAgICAgIH1cbiAgICAgICAgaWYgKFV0aWxzLmNoZWNrSWZEZWZpbmVkQW5kTm90TnVsbChjbXBWZXJzaW9uKSkge1xuICAgICAgICAgICAgdGhpcy5fY21wVmVyc2lvbiA9IGNtcFZlcnNpb247XG4gICAgICAgIH1cbiAgICAgICAgaWYgKFV0aWxzLmNoZWNrSWZEZWZpbmVkQW5kTm90TnVsbChjbXBJZCkpIHtcbiAgICAgICAgICAgIHRoaXMuX2NtcElkID0gY21wSWQ7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKFV0aWxzLmNoZWNrSWZEZWZpbmVkQW5kTm90TnVsbChndmxWZXJzaW9uKSkge1xuICAgICAgICAgICAgdGhpcy5fZ3ZsVmVyc2lvbiA9IGd2bFZlcnNpb247XG4gICAgICAgIH1cbiAgICAgICAgaWYgKFV0aWxzLmNoZWNrSWZEZWZpbmVkQW5kTm90TnVsbCh0Y2ZQb2xpY3lWZXJzaW9uKSkge1xuICAgICAgICAgICAgdGhpcy5fdGNmUG9saWN5VmVyc2lvbiA9IHRjZlBvbGljeVZlcnNpb247XG4gICAgICAgIH1cbiAgICB9XG4gICAgZ2V0IGNtcElkKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fY21wSWQ7XG4gICAgfVxuICAgIHNldCBjbXBJZChpZCkge1xuICAgICAgICB0aGlzLl9jbXBJZCA9IGlkO1xuICAgIH1cbiAgICBnZXQgZ2RwckFwcGxpZXNHbG9iYWxseSgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2dkcHJBcHBsaWVzR2xvYmFsbHk7XG4gICAgfVxuICAgIGdldCBnZHByQXBwbGllcygpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2dkcHJBcHBsaWVzO1xuICAgIH1cbiAgICBnZXQgY21wTG9hZGVkKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fY21wTG9hZGVkO1xuICAgIH1cbiAgICBnZXQgY21wU3RhdHVzKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fY21wU3RhdHVzO1xuICAgIH1cbiAgICBnZXQgZGlzcGxheVN0YXR1cygpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2Rpc3BsYXlTdGF0dXM7XG4gICAgfVxuICAgIGdldCBhcGlWZXJzaW9uKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fYXBpVmVyc2lvbjtcbiAgICB9XG4gICAgZ2V0IGNtcFZlcnNpb24oKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9jbXBWZXJzaW9uO1xuICAgIH1cbiAgICBnZXQgZ3ZsVmVyc2lvbigpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2d2bFZlcnNpb247XG4gICAgfVxuICAgIGdldCB0Y2ZQb2xpY3lWZXJzaW9uKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fdGNmUG9saWN5VmVyc2lvbjtcbiAgICB9XG4gICAgZ2V0IHRjZlZlcnNpb24oKSB7XG4gICAgICAgIGxldCB0Y2ZWZXJzaW9uO1xuICAgICAgICBpZiAodHlwZW9mIHRoaXMuZ2RwckFwcGxpZXNHbG9iYWxseSAhPT0gJ3VuZGVmaW5lZCcgJiYgdHlwZW9mIHRoaXMuY21wTG9hZGVkICE9PSAndW5kZWZpbmVkJyAmJiB0eXBlb2YgdGhpcy5nZHByQXBwbGllcyA9PT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgICAgIHRjZlZlcnNpb24gPSBcIlRDRiAxLjFcIjtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmICh0eXBlb2YgdGhpcy5nZHByQXBwbGllcyAhPT0gJ3VuZGVmaW5lZCcgJiYgdHlwZW9mIHRoaXMuY21wTG9hZGVkICE9PSAndW5kZWZpbmVkJyAmJiB0eXBlb2YgdGhpcy5nZHByQXBwbGllc0dsb2JhbGx5ID09PSAndW5kZWZpbmVkJykge1xuICAgICAgICAgICAgdGNmVmVyc2lvbiA9IFwiVENGIDIuMFwiO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgdGNmVmVyc2lvbiA9IFwibm90IGRlZmluZWRcIjtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdGNmVmVyc2lvbjtcbiAgICB9XG4gICAgc3RhdGljIGNsYXNzKHBpbmdSZXN1bHQpIHtcbiAgICAgICAgaWYgKHBpbmdSZXN1bHQuX2dkcHJBcHBsaWVzR2xvYmFsbHkgfHwgcGluZ1Jlc3VsdC5fZ2RwckFwcGxpZXMgfHxcbiAgICAgICAgICAgIHBpbmdSZXN1bHQuX2NtcExvYWRlZCB8fFxuICAgICAgICAgICAgcGluZ1Jlc3VsdC5fY21wU3RhdHVzIHx8XG4gICAgICAgICAgICBwaW5nUmVzdWx0Ll9kaXNwbGF5U3RhdHVzIHx8XG4gICAgICAgICAgICBwaW5nUmVzdWx0Ll9hcGlWZXJzaW9uIHx8XG4gICAgICAgICAgICBwaW5nUmVzdWx0Ll9jbXBWZXJzaW9uIHx8XG4gICAgICAgICAgICBwaW5nUmVzdWx0Ll9jbXBJZCB8fFxuICAgICAgICAgICAgcGluZ1Jlc3VsdC5fZ3ZsVmVyc2lvbiB8fFxuICAgICAgICAgICAgcGluZ1Jlc3VsdC5fdGNmUG9saWN5VmVyc2lvbikge1xuICAgICAgICAgICAgcmV0dXJuIG5ldyBQaW5nUmVzdWx0KHBpbmdSZXN1bHQuX2dkcHJBcHBsaWVzR2xvYmFsbHksIHBpbmdSZXN1bHQuX2dkcHJBcHBsaWVzLCBwaW5nUmVzdWx0Ll9jbXBMb2FkZWQsIHBpbmdSZXN1bHQuX2NtcFN0YXR1cywgcGluZ1Jlc3VsdC5fZGlzcGxheVN0YXR1cywgcGluZ1Jlc3VsdC5fYXBpVmVyc2lvbiwgcGluZ1Jlc3VsdC5fY21wVmVyc2lvbiwgcGluZ1Jlc3VsdC5fY21wSWQsIHBpbmdSZXN1bHQuX2d2bFZlcnNpb24sIHBpbmdSZXN1bHQuX3RjZlBvbGljeVZlcnNpb24pO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgcmV0dXJuIG5ldyBQaW5nUmVzdWx0KHBpbmdSZXN1bHQuZ2RwckFwcGxpZXNHbG9iYWxseSwgcGluZ1Jlc3VsdC5nZHByQXBwbGllcywgcGluZ1Jlc3VsdC5jbXBMb2FkZWQsIHBpbmdSZXN1bHQuY21wU3RhdHVzLCBwaW5nUmVzdWx0LmRpc3BsYXlTdGF0dXMsIHBpbmdSZXN1bHQuYXBpVmVyc2lvbiwgcGluZ1Jlc3VsdC5jbXBWZXJzaW9uLCBwaW5nUmVzdWx0LmNtcElkLCBwaW5nUmVzdWx0Lmd2bFZlcnNpb24sIHBpbmdSZXN1bHQudGNmUG9saWN5VmVyc2lvbik7XG4gICAgICAgIH1cbiAgICB9XG4gICAgdG9KU09OKCkge1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgZ2RwckFwcGxpZXNHbG9iYWxseTogdGhpcy5fZ2RwckFwcGxpZXNHbG9iYWxseSxcbiAgICAgICAgICAgIGdkcHJBcHBsaWVzOiB0aGlzLl9nZHByQXBwbGllcyxcbiAgICAgICAgICAgIGNtcExvYWRlZDogdGhpcy5fY21wTG9hZGVkLFxuICAgICAgICAgICAgY21wU3RhdHVzOiB0aGlzLl9jbXBTdGF0dXMsXG4gICAgICAgICAgICBkaXNwbGF5U3RhdHVzOiB0aGlzLl9kaXNwbGF5U3RhdHVzLFxuICAgICAgICAgICAgYXBpVmVyc2lvbjogdGhpcy5fYXBpVmVyc2lvbixcbiAgICAgICAgICAgIGNtcFZlcnNpb246IHRoaXMuX2NtcFZlcnNpb24sXG4gICAgICAgICAgICBjbXBJZDogdGhpcy5fY21wSWQsXG4gICAgICAgICAgICBndmxWZXJzaW9uOiB0aGlzLl9ndmxWZXJzaW9uLFxuICAgICAgICAgICAgdGNmUG9saWN5VmVyc2lvbjogdGhpcy5fdGNmUG9saWN5VmVyc2lvblxuICAgICAgICB9O1xuICAgIH1cbn1cbiJdLCJzb3VyY2VSb290IjoiIn0=