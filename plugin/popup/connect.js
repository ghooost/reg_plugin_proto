/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
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
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
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
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

var gettingActiveTab = browser.tabs.query({ active: true, currentWindow: true });
gettingActiveTab.then(tabs => {
  var tabID = tabs[0].id;
  browser.tabs.sendMessage(tabID, { action: 'hello' }).then(response => {
    $('.page.sel').removeAttr('sel');
    if (response && response.isready && response.data && response.data.data) {
      //let's show the quest window
      if (!response.data.data.length) {
        $('.page#nodocs').attr('sel', 1);
      } else {
        $('.page#upload').attr('sel', 1);
        $('.page#upload .num').html(response.data.data.length);
        $('#dosubmit').click(function () {
          browser.tabs.query({ url: response.data.url, active: false }).then(tabs => {
            processSending(tabs[0].id, response.data.data);
          }).catch(err => {
            browser.tabs.create({ url: response.data.url, active: false }).then(tab => {
              processSending(tab.id, response.data.data);
            }).catch(err => {
              console.log('Can not ctreate a tab for ' + response.data.url);
            });
          });
        });
      }
    } else {
      $('.page#noinfo').attr('sel', 1);
    }
  }).catch(err => {
    //no connection to the content script
    $('.page#noconnection').attr('sel', 1);
  });
});

function processSending(tabId, data) {
  browser.tabs.executeScript(tabId, { file: '/runinsidedest.js' }).then(response => {
    browser.tabs.sendMessage(tabId, { action: 'send', data: data }).then(response => {
      $('.page.sel').removeAttr('sel');
      $('.page#done').attr('sel', 1);
    }).catch(err => {
      console.log('No connection to the script!');
    });
  }).catch(err => {
    console.log("Can't execute!");
    console.log(err);
  });
}

/***/ })
/******/ ]);