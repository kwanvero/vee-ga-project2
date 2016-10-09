/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _math = __webpack_require__(1);

	var _math2 = _interopRequireDefault(_math);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	// default thin mainly going to use

	console.log((0, _math.add)(1, 2)); /*
	                                     Please add all Javascript code to this file.
	                                   */

	// import add from './math'

	// import {add, subtract} from './math'

	console.log((0, _math.subtract)(1, 2));
	(0, _math2.default)();

	// PopUp template
	function renderFullArticle(article) {
	    return '<h1>' + article.display_title + '</h1>\n    <p>\n      ' + article.content.plain + '\n    </p>\n    <a href="' + article.link + '" class="popUpAction" target="_blank">Read more from source</a>\n  ';
	}

	// Article popUp info list
	var state = {
	    articles: [],
	    selectedSource: ''
	};

	function fetchArticles() {

	    var url = '';
	    var render = function render(x) {
	        return x;
	    }; // identity , basic function

	    switch (state.selectedSource) {
	        case 'Mashable':
	            url = 'http://mashable.com/stories.json';
	            parse = function parse(data) {
	                return data.hot;
	            };
	            break;
	        case 'Reddit':
	            url = 'https://www.reddit.com/top.json';
	            parse = function parse(data) {
	                return data.data.children;
	            };
	            break;
	        case 'Digg':
	        default:
	            url = 'http://digg.com/api/news/popular.json';
	            parse = function parse(data) {
	                return data.data.feed;
	            };
	    }

	    // Get info
	    return fetch('https://accesscontrolalloworiginall.herokuapp.com/' + url).then(function (res) {
	        return res.json();
	    }).then(parse).then(function (articles) {
	        state.articles = articles;
	        // console.log(articles);
	    });
	}

	function renderArticles() {

	    var render = function render(x) {
	        return '';
	    }; // identity , basic function

	    switch (state.selectedSource) {
	        case 'Mashable':
	            render = function render(article) {
	                return '<article class="article">\n              <section class="featuredImage">\n                <img src="' + article.image + '" alt="' + article.title + '" />\n              </section>\n              <section class="articleContent">\n                  <a href="#"><h3>' + article.display_title + '</h3></a>\n                  <h6>' + article.channel_label + '</h6>\n              </section>\n              <section class="impressions">\n                ' + article.shares.total + '\n              </section>\n              <div class="clearfix"></div>\n            </article>\n            ';
	            };
	            break;
	        case 'Reddit':
	            render = function render(article) {
	                return '<article class="article">\n            <section class="featuredImage">\n              <img src="' + article.data.thumbnail + '" alt="' + article.data.title + '" />\n            </section>\n            <section class="articleContent">\n                <a href="#"><h3>' + article.data.title + '</h3></a>\n                <h6>' + article.data.subreddit + '</h6>\n            </section>\n            <section class="impressions">\n              ' + article.data.ups + '\n            </section>\n            <div class="clearfix"></div>\n          </article>\n            ';
	            };
	            break;
	        case 'Digg':
	        default:
	            render = function render(article) {
	                return '<article class="article">\n            <section class="featuredImage">\n              <img src="' + article.content.media.images[1].url + '" alt="' + article.content.title + '" />\n            </section>\n            <section class="articleContent">\n                <a href="#"><h3>' + article.content.title_alt + '</h3></a>\n                <h6>' + article.content.kicker + '</h6>\n            </section>\n            <section class="impressions">\n              ' + article.digg_score + '\n            </section>\n            <div class="clearfix"></div>\n          </article>\n            ';
	            };
	    }

	    var renderedArticles = [];

	    state.articles.forEach(function (article) {
	        renderedArticles.push(render(article));
	    });

	    document.querySelector('#main').innerHTML = renderedArticles.join('\n');
	}

	// On click
	document.querySelector('body').addEventListener('click', function (event) {
	    var popUp = document.querySelector('#popUp');

	    if (event.target.matches('h3')) {
	        console.log(event.target);
	        popUp.classList.toggle('hidden');
	        // console.log(popUp.classList);
	        popUp.classList.remove('loader');
	        console.dir(event.target.innerHTML); // we get the objects and it's properties
	        console.log(state.articles);
	        var article = state.articles.find(function (article) {
	            //like for each
	            return article.display_title === event.target.innerHTML;
	        });

	        document.querySelector('#popUp .container').innerHTML = renderFullArticle(article);
	    }

	    if (event.target.matches('.closePopUp')) {
	        popUp.classList.toggle('hidden');
	    }

	    if (event.target.matches('.nav-item')) {
	        console.log(event.target);
	        state.selectedSource = event.target.innerHTML; // save our click to a state
	        fetchArticles().then(function () {
	            return renderArticles();
	        });
	    }
	});

/***/ },
/* 1 */
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.add = add;
	exports.subtract = subtract;
	exports.default = math;

	// if only one default options
	// export default function add(x, y) {
	//     return x + y
	// }

	function add(x, y) {
	    return x + y;
	}

	function subtract(x, y) {
	    return x - y;
	}

	function math() {
	    console.log("Math is fun");
	}

/***/ }
/******/ ]);