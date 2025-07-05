function e(e,t){void 0===t&&(t={});for(var i=function(e){for(var t=[],i=0;i<e.length;){var n=e[i];if("*"!==n&&"+"!==n&&"?"!==n)if("\\"!==n)if("{"!==n)if("}"!==n)if(":"!==n)if("("!==n)t.push({type:"CHAR",index:i,value:e[i++]});else{var o=1,r="";if("?"===e[a=i+1])throw new TypeError('Pattern cannot start with "?" at '.concat(a));for(;a<e.length;)if("\\"!==e[a]){if(")"===e[a]){if(0===--o){a++;break}}else if("("===e[a]&&(o++,"?"!==e[a+1]))throw new TypeError("Capturing groups are not allowed at ".concat(a));r+=e[a++]}else r+=e[a++]+e[a++];if(o)throw new TypeError("Unbalanced pattern at ".concat(i));if(!r)throw new TypeError("Missing pattern at ".concat(i));t.push({type:"PATTERN",index:i,value:r}),i=a}else{for(var s="",a=i+1;a<e.length;){var l=e.charCodeAt(a);if(!(l>=48&&l<=57||l>=65&&l<=90||l>=97&&l<=122||95===l))break;s+=e[a++]}if(!s)throw new TypeError("Missing parameter name at ".concat(i));t.push({type:"NAME",index:i,value:s}),i=a}else t.push({type:"CLOSE",index:i,value:e[i++]});else t.push({type:"OPEN",index:i,value:e[i++]});else t.push({type:"ESCAPED_CHAR",index:i++,value:e[i++]});else t.push({type:"MODIFIER",index:i,value:e[i++]})}return t.push({type:"END",index:i,value:""}),t}(e),o=t.prefixes,r=void 0===o?"./":o,s=t.delimiter,a=void 0===s?"/#?":s,l=[],c=0,d=0,h="",p=function(e){if(d<i.length&&i[d].type===e)return i[d++].value},u=function(e){var t=p(e);if(void 0!==t)return t;var n=i[d],o=n.type,r=n.index;throw new TypeError("Unexpected ".concat(o," at ").concat(r,", expected ").concat(e))},m=function(){for(var e,t="";e=p("CHAR")||p("ESCAPED_CHAR");)t+=e;return t},f=function(e){var t=l[l.length-1],i=e||(t&&"string"==typeof t?t:"");if(t&&!i)throw new TypeError('Must have text between two parameters, missing text after "'.concat(t.name,'"'));return!i||function(e){for(var t=0,i=a;t<i.length;t++){var n=i[t];if(e.indexOf(n)>-1)return!0}return!1}(i)?"[^".concat(n(a),"]+?"):"(?:(?!".concat(n(i),")[^").concat(n(a),"])+?")};d<i.length;){var g=p("CHAR"),y=p("NAME"),v=p("PATTERN");if(y||v){var w=g||"";-1===r.indexOf(w)&&(h+=w,w=""),h&&(l.push(h),h=""),l.push({name:y||c++,prefix:w,suffix:"",pattern:v||f(w),modifier:p("MODIFIER")||""})}else{var b=g||p("ESCAPED_CHAR");if(b)h+=b;else if(h&&(l.push(h),h=""),p("OPEN")){w=m();var x=p("NAME")||"",$=p("PATTERN")||"",C=m();u("CLOSE"),l.push({name:x||($?c++:""),pattern:x&&!$?f(w):$,prefix:w,suffix:C,modifier:p("MODIFIER")||""})}else u("END")}}return l}function t(t,n){return i(e(t,n),n)}function i(e,t){void 0===t&&(t={});var i=o(t),n=t.encode,r=void 0===n?function(e){return e}:n,s=t.validate,a=void 0===s||s,l=e.map(function(e){if("object"==typeof e)return new RegExp("^(?:".concat(e.pattern,")$"),i)});return function(t){for(var i="",n=0;n<e.length;n++){var o=e[n];if("string"!=typeof o){var s=t?t[o.name]:void 0,c="?"===o.modifier||"*"===o.modifier,d="*"===o.modifier||"+"===o.modifier;if(Array.isArray(s)){if(!d)throw new TypeError('Expected "'.concat(o.name,'" to not repeat, but got an array'));if(0===s.length){if(c)continue;throw new TypeError('Expected "'.concat(o.name,'" to not be empty'))}for(var h=0;h<s.length;h++){var p=r(s[h],o);if(a&&!l[n].test(p))throw new TypeError('Expected all "'.concat(o.name,'" to match "').concat(o.pattern,'", but got "').concat(p,'"'));i+=o.prefix+p+o.suffix}}else if("string"!=typeof s&&"number"!=typeof s){if(!c){var u=d?"an array":"a string";throw new TypeError('Expected "'.concat(o.name,'" to be ').concat(u))}}else{p=r(String(s),o);if(a&&!l[n].test(p))throw new TypeError('Expected "'.concat(o.name,'" to match "').concat(o.pattern,'", but got "').concat(p,'"'));i+=o.prefix+p+o.suffix}}else i+=o}return i}}function n(e){return e.replace(/([.+*?=^!:${}()[\]|/\\])/g,"\\$1")}function o(e){return e&&e.sensitive?"":"i"}function r(t,i,r){return function(e,t,i){void 0===i&&(i={});for(var r=i.strict,s=void 0!==r&&r,a=i.start,l=void 0===a||a,c=i.end,d=void 0===c||c,h=i.encode,p=void 0===h?function(e){return e}:h,u=i.delimiter,m=void 0===u?"/#?":u,f=i.endsWith,g="[".concat(n(void 0===f?"":f),"]|$"),y="[".concat(n(m),"]"),v=l?"^":"",w=0,b=e;w<b.length;w++){var x=b[w];if("string"==typeof x)v+=n(p(x));else{var $=n(p(x.prefix)),C=n(p(x.suffix));if(x.pattern)if(t&&t.push(x),$||C)if("+"===x.modifier||"*"===x.modifier){var E="*"===x.modifier?"?":"";v+="(?:".concat($,"((?:").concat(x.pattern,")(?:").concat(C).concat($,"(?:").concat(x.pattern,"))*)").concat(C,")").concat(E)}else v+="(?:".concat($,"(").concat(x.pattern,")").concat(C,")").concat(x.modifier);else{if("+"===x.modifier||"*"===x.modifier)throw new TypeError('Can not repeat "'.concat(x.name,'" without a prefix and suffix'));v+="(".concat(x.pattern,")").concat(x.modifier)}else v+="(?:".concat($).concat(C,")").concat(x.modifier)}}if(d)s||(v+="".concat(y,"?")),v+=i.endsWith?"(?=".concat(g,")"):"$";else{var _=e[e.length-1],k="string"==typeof _?y.indexOf(_[_.length-1])>-1:void 0===_;s||(v+="(?:".concat(y,"(?=").concat(g,"))?")),k||(v+="(?=".concat(y,"|").concat(g,")"))}return new RegExp(v,o(i))}(e(t,r),i,r)}function s(e,t,i){return e instanceof RegExp?function(e,t){if(!t)return e;for(var i=/\((?:\?<(.*?)>)?(?!\?)/g,n=0,o=i.exec(e.source);o;)t.push({name:o[1]||n++,prefix:"",suffix:"",modifier:"",pattern:""}),o=i.exec(e.source);return e}(e,t):Array.isArray(e)?function(e,t,i){var n=e.map(function(e){return s(e,t,i).source});return new RegExp("(?:".concat(n.join("|"),")"),o(i))}(e,t,i):r(e,t,i)}function a(e){return"object"==typeof e&&!!e}function l(e){return"function"==typeof e}function c(e){return"string"==typeof e}function d(e=[]){return Array.isArray(e)?e:[e]}function h(e){return`[Vaadin.Router] ${e}`}class p extends Error{code;context;constructor(e){super(h(`Page not found (${e.pathname})`)),this.context=e,this.code=404}}const u=Symbol("NotFoundResult");function m(e){return new p(e)}function f(e){return(Array.isArray(e)?e[0]:e)??""}function g(e){return f(e?.path)}const y=new Map;function v(e){try{return decodeURIComponent(e)}catch{return e}}y.set("|false",{keys:[],pattern:/(?:)/u});var w=function(e,t,i=!1,n=[],o){const r=`${e}|${String(i)}`,a=f(t);let l=y.get(r);if(!l){const t=[];l={keys:t,pattern:s(e,t,{end:i,strict:""===e})},y.set(r,l)}const c=l.pattern.exec(a);if(!c)return null;const d={...o};for(let e=1;e<c.length;e++){const t=l.keys[e-1],i=t.name,n=c[e];void 0===n&&Object.hasOwn(d,i)||("+"===t.modifier||"*"===t.modifier?d[i]=n?n.split(/[/?#]/u).map(v):[]:d[i]=n?v(n):n)}return{keys:[...n,...l.keys],params:d,path:c[0]}};var b=function e(t,i,n,o,r){let s,a,l=0,c=g(t);return c.startsWith("/")&&(n&&(c=c.substring(1)),n=!0),{next(d){if(t===d)return{done:!0,value:void 0};t.__children??=function(e){return Array.isArray(e)&&e.length>0?e:void 0}(t.children);const h=t.__children??[],p=!t.__children&&!t.children;if(!s&&(s=w(c,i,p,o,r),s))return{value:{keys:s.keys,params:s.params,path:s.path,route:t}};if(s&&h.length>0)for(;l<h.length;){if(!a){const o=h[l];o.parent=t;let r=s.path.length;r>0&&"/"===i.charAt(r)&&(r+=1),a=e(o,i.substring(r),n,s.keys,s.params)}const o=a.next(d);if(!o.done)return{done:!1,value:o.value};a=null,l+=1}return{done:!0,value:void 0}}}};function x(e){if(l(e.route.action))return e.route.action(e)}class $ extends Error{code;context;constructor(e,t){let i=`Path '${e.pathname}' is not properly resolved due to an error.`;const n=g(e.route);n&&(i+=` Resolution had failed on route: '${n}'`),super(i,t),this.code=t?.code,this.context=e}warn(){console.warn(this.message)}}class C{baseUrl;#e;errorHandler;resolveRoute;#t;constructor(e,{baseUrl:t="",context:i,errorHandler:n,resolveRoute:o=x}={}){if(Object(e)!==e)throw new TypeError("Invalid routes");this.baseUrl=t,this.errorHandler=n,this.resolveRoute=o,Array.isArray(e)?this.#t={__children:e,__synthetic:!0,action:()=>{},path:""}:this.#t={...e,parent:void 0},this.#e={...i,hash:"",next:async()=>u,params:{},pathname:"",resolver:this,route:this.#t,search:"",chain:[]}}get root(){return this.#t}get context(){return this.#e}get __effectiveBaseUrl(){return this.baseUrl?new URL(this.baseUrl,document.baseURI||document.URL).href.replace(/[^/]*$/u,""):""}getRoutes(){return[...this.#t.__children??[]]}removeRoutes(){this.#t.__children=[]}async resolve(e){const t=this,i={...this.#e,...c(e)?{pathname:e}:e,next:l},n=b(this.#t,this.__normalizePathname(i.pathname)??i.pathname,!!this.baseUrl),o=this.resolveRoute;let r=null,s=null,a=i;async function l(e=!1,c=r?.value?.route,d){const h=null===d?r?.value?.route:void 0;if(r=s??n.next(h),s=null,!e&&(r.done||!function(e,t){let i=e;for(;i;)if(i=i.parent,i===t)return!0;return!1}(r.value.route,c)))return s=r,u;if(r.done)throw m(i);a={...i,params:r.value.params,route:r.value.route,chain:a.chain?.slice()},function(e,t){const{path:i,route:n}=t;if(n&&!n.__synthetic){const t={path:i,route:n};if(n.parent&&e.chain)for(let t=e.chain.length-1;t>=0&&e.chain[t].route!==n.parent;t--)e.chain.pop();e.chain?.push(t)}}(a,r.value);const p=await o(a);return null!=p&&p!==u?(a.result=(f=p)&&"object"==typeof f&&"next"in f&&"params"in f&&"result"in f&&"route"in f?p.result:p,t.#e=a,a):await l(e,c,p);var f}try{return await l(!0,this.#t)}catch(e){const t=e instanceof p?e:new $(a,{code:500,cause:e});if(this.errorHandler)return a.result=this.errorHandler(t),a;throw e}}setRoutes(e){this.#t.__children=[...d(e)]}__normalizePathname(e){if(!this.baseUrl)return e;const t=this.__effectiveBaseUrl,i=e.startsWith("/")?new URL(t).origin+e:`./${e}`,n=new URL(i,t).href;return n.startsWith(t)?n.slice(t.length):void 0}addRoutes(e){return this.#t.__children=[...this.#t.__children??[],...d(e)],this.getRoutes()}}function E(e,t,i,n){const o=t.name??n?.(t);if(o&&(e.has(o)?e.get(o)?.push(t):e.set(o,[t])),Array.isArray(i))for(const o of i)o.parent=t,E(e,o,o.__children??o.children,n)}function _(e,t){const i=e.get(t);if(i){if(i.length>1)throw new Error(`Duplicate route with name "${t}". Try seting unique 'name' route properties.`);return i[0]}}var k=function(t,n={}){if(!(t instanceof C))throw new TypeError("An instance of Resolver is expected");const o=new Map,r=new Map;return(s,a)=>{let l=_(r,s);if(!l&&(r.clear(),E(r,t.root,t.root.__children,n.cacheKeyProvider),l=_(r,s),!l))throw new Error(`Route "${s}" not found`);let d=l.fullPath?o.get(l.fullPath):void 0;if(!d){let t=g(l),i=l.parent;for(;i;){const e=g(i);e&&(t=`${e.replace(/\/$/u,"")}/${t.replace(/^\//u,"")}`),i=i.parent}const n=e(t),r=Object.create(null);for(const e of n)c(e)||(r[e.name]=!0);d={keys:r,tokens:n},o.set(t,d),l.fullPath=t}let h=i(d.tokens,{encode:encodeURIComponent,...n})(a)||"/";if(n.stringifyQueryParams&&a){const e={};for(const[t,i]of Object.entries(a))!(t in d.keys)&&i&&(e[t]=i);const t=n.stringifyQueryParams(e);t&&(h+=t.startsWith("?")?t:`?${t}`)}return h}};const A=/\/\*[\*!]\s+vaadin-dev-mode:start([\s\S]*)vaadin-dev-mode:end\s+\*\*\//i,S=window.Vaadin&&window.Vaadin.Flow&&window.Vaadin.Flow.clients;function O(e,t){if("function"!=typeof e)return;const i=A.exec(e.toString());if(i)try{e=new Function(i[1])}catch(e){console.log("vaadin-development-mode-detector: uncommentAndRun() failed",e)}return e(t)}window.Vaadin=window.Vaadin||{};const L=function(e,t){if(window.Vaadin.developmentMode)return O(e,t)};function R(){
/*! vaadin-dev-mode:start
  (function () {
'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) {
  return typeof obj;
} : function (obj) {
  return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
};

var classCallCheck = function (instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
};

var createClass = function () {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);
    if (staticProps) defineProperties(Constructor, staticProps);
    return Constructor;
  };
}();

var getPolymerVersion = function getPolymerVersion() {
  return window.Polymer && window.Polymer.version;
};

var StatisticsGatherer = function () {
  function StatisticsGatherer(logger) {
    classCallCheck(this, StatisticsGatherer);

    this.now = new Date().getTime();
    this.logger = logger;
  }

  createClass(StatisticsGatherer, [{
    key: 'frameworkVersionDetectors',
    value: function frameworkVersionDetectors() {
      return {
        'Flow': function Flow() {
          if (window.Vaadin && window.Vaadin.Flow && window.Vaadin.Flow.clients) {
            var flowVersions = Object.keys(window.Vaadin.Flow.clients).map(function (key) {
              return window.Vaadin.Flow.clients[key];
            }).filter(function (client) {
              return client.getVersionInfo;
            }).map(function (client) {
              return client.getVersionInfo().flow;
            });
            if (flowVersions.length > 0) {
              return flowVersions[0];
            }
          }
        },
        'Vaadin Framework': function VaadinFramework() {
          if (window.vaadin && window.vaadin.clients) {
            var frameworkVersions = Object.values(window.vaadin.clients).filter(function (client) {
              return client.getVersionInfo;
            }).map(function (client) {
              return client.getVersionInfo().vaadinVersion;
            });
            if (frameworkVersions.length > 0) {
              return frameworkVersions[0];
            }
          }
        },
        'AngularJs': function AngularJs() {
          if (window.angular && window.angular.version && window.angular.version) {
            return window.angular.version.full;
          }
        },
        'Angular': function Angular() {
          if (window.ng) {
            var tags = document.querySelectorAll("[ng-version]");
            if (tags.length > 0) {
              return tags[0].getAttribute("ng-version");
            }
            return "Unknown";
          }
        },
        'Backbone.js': function BackboneJs() {
          if (window.Backbone) {
            return window.Backbone.VERSION;
          }
        },
        'React': function React() {
          var reactSelector = '[data-reactroot], [data-reactid]';
          if (!!document.querySelector(reactSelector)) {
            // React does not publish the version by default
            return "unknown";
          }
        },
        'Ember': function Ember() {
          if (window.Em && window.Em.VERSION) {
            return window.Em.VERSION;
          } else if (window.Ember && window.Ember.VERSION) {
            return window.Ember.VERSION;
          }
        },
        'jQuery': function (_jQuery) {
          function jQuery() {
            return _jQuery.apply(this, arguments);
          }

          jQuery.toString = function () {
            return _jQuery.toString();
          };

          return jQuery;
        }(function () {
          if (typeof jQuery === 'function' && jQuery.prototype.jquery !== undefined) {
            return jQuery.prototype.jquery;
          }
        }),
        'Polymer': function Polymer() {
          var version = getPolymerVersion();
          if (version) {
            return version;
          }
        },
        'LitElement': function LitElement() {
          var version = window.litElementVersions && window.litElementVersions[0];
          if (version) {
            return version;
          }
        },
        'LitHtml': function LitHtml() {
          var version = window.litHtmlVersions && window.litHtmlVersions[0];
          if (version) {
            return version;
          }
        },
        'Vue.js': function VueJs() {
          if (window.Vue) {
            return window.Vue.version;
          }
        }
      };
    }
  }, {
    key: 'getUsedVaadinElements',
    value: function getUsedVaadinElements(elements) {
      var version = getPolymerVersion();
      var elementClasses = void 0;
      // NOTE: In case you edit the code here, YOU MUST UPDATE any statistics reporting code in Flow.
      // Check all locations calling the method getEntries() in
      // https://github.com/vaadin/flow/blob/master/flow-server/src/main/java/com/vaadin/flow/internal/UsageStatistics.java#L106
      // Currently it is only used by BootstrapHandler.
      if (version && version.indexOf('2') === 0) {
        // Polymer 2: components classes are stored in window.Vaadin
        elementClasses = Object.keys(window.Vaadin).map(function (c) {
          return window.Vaadin[c];
        }).filter(function (c) {
          return c.is;
        });
      } else {
        // Polymer 3: components classes are stored in window.Vaadin.registrations
        elementClasses = window.Vaadin.registrations || [];
      }
      elementClasses.forEach(function (klass) {
        var version = klass.version ? klass.version : "0.0.0";
        elements[klass.is] = { version: version };
      });
    }
  }, {
    key: 'getUsedVaadinThemes',
    value: function getUsedVaadinThemes(themes) {
      ['Lumo', 'Material'].forEach(function (themeName) {
        var theme;
        var version = getPolymerVersion();
        if (version && version.indexOf('2') === 0) {
          // Polymer 2: themes are stored in window.Vaadin
          theme = window.Vaadin[themeName];
        } else {
          // Polymer 3: themes are stored in custom element registry
          theme = customElements.get('vaadin-' + themeName.toLowerCase() + '-styles');
        }
        if (theme && theme.version) {
          themes[themeName] = { version: theme.version };
        }
      });
    }
  }, {
    key: 'getFrameworks',
    value: function getFrameworks(frameworks) {
      var detectors = this.frameworkVersionDetectors();
      Object.keys(detectors).forEach(function (framework) {
        var detector = detectors[framework];
        try {
          var version = detector();
          if (version) {
            frameworks[framework] = { version: version };
          }
        } catch (e) {}
      });
    }
  }, {
    key: 'gather',
    value: function gather(storage) {
      var storedStats = storage.read();
      var gatheredStats = {};
      var types = ["elements", "frameworks", "themes"];

      types.forEach(function (type) {
        gatheredStats[type] = {};
        if (!storedStats[type]) {
          storedStats[type] = {};
        }
      });

      var previousStats = JSON.stringify(storedStats);

      this.getUsedVaadinElements(gatheredStats.elements);
      this.getFrameworks(gatheredStats.frameworks);
      this.getUsedVaadinThemes(gatheredStats.themes);

      var now = this.now;
      types.forEach(function (type) {
        var keys = Object.keys(gatheredStats[type]);
        keys.forEach(function (key) {
          if (!storedStats[type][key] || _typeof(storedStats[type][key]) != _typeof({})) {
            storedStats[type][key] = { firstUsed: now };
          }
          // Discards any previously logged version number
          storedStats[type][key].version = gatheredStats[type][key].version;
          storedStats[type][key].lastUsed = now;
        });
      });

      var newStats = JSON.stringify(storedStats);
      storage.write(newStats);
      if (newStats != previousStats && Object.keys(storedStats).length > 0) {
        this.logger.debug("New stats: " + newStats);
      }
    }
  }]);
  return StatisticsGatherer;
}();

var StatisticsStorage = function () {
  function StatisticsStorage(key) {
    classCallCheck(this, StatisticsStorage);

    this.key = key;
  }

  createClass(StatisticsStorage, [{
    key: 'read',
    value: function read() {
      var localStorageStatsString = localStorage.getItem(this.key);
      try {
        return JSON.parse(localStorageStatsString ? localStorageStatsString : '{}');
      } catch (e) {
        return {};
      }
    }
  }, {
    key: 'write',
    value: function write(data) {
      localStorage.setItem(this.key, data);
    }
  }, {
    key: 'clear',
    value: function clear() {
      localStorage.removeItem(this.key);
    }
  }, {
    key: 'isEmpty',
    value: function isEmpty() {
      var storedStats = this.read();
      var empty = true;
      Object.keys(storedStats).forEach(function (key) {
        if (Object.keys(storedStats[key]).length > 0) {
          empty = false;
        }
      });

      return empty;
    }
  }]);
  return StatisticsStorage;
}();

var StatisticsSender = function () {
  function StatisticsSender(url, logger) {
    classCallCheck(this, StatisticsSender);

    this.url = url;
    this.logger = logger;
  }

  createClass(StatisticsSender, [{
    key: 'send',
    value: function send(data, errorHandler) {
      var logger = this.logger;

      if (navigator.onLine === false) {
        logger.debug("Offline, can't send");
        errorHandler();
        return;
      }
      logger.debug("Sending data to " + this.url);

      var req = new XMLHttpRequest();
      req.withCredentials = true;
      req.addEventListener("load", function () {
        // Stats sent, nothing more to do
        logger.debug("Response: " + req.responseText);
      });
      req.addEventListener("error", function () {
        logger.debug("Send failed");
        errorHandler();
      });
      req.addEventListener("abort", function () {
        logger.debug("Send aborted");
        errorHandler();
      });
      req.open("POST", this.url);
      req.setRequestHeader("Content-Type", "application/json");
      req.send(data);
    }
  }]);
  return StatisticsSender;
}();

var StatisticsLogger = function () {
  function StatisticsLogger(id) {
    classCallCheck(this, StatisticsLogger);

    this.id = id;
  }

  createClass(StatisticsLogger, [{
    key: '_isDebug',
    value: function _isDebug() {
      return localStorage.getItem("vaadin." + this.id + ".debug");
    }
  }, {
    key: 'debug',
    value: function debug(msg) {
      if (this._isDebug()) {
        console.info(this.id + ": " + msg);
      }
    }
  }]);
  return StatisticsLogger;
}();

var UsageStatistics = function () {
  function UsageStatistics() {
    classCallCheck(this, UsageStatistics);

    this.now = new Date();
    this.timeNow = this.now.getTime();
    this.gatherDelay = 10; // Delay between loading this file and gathering stats
    this.initialDelay = 24 * 60 * 60;

    this.logger = new StatisticsLogger("statistics");
    this.storage = new StatisticsStorage("vaadin.statistics.basket");
    this.gatherer = new StatisticsGatherer(this.logger);
    this.sender = new StatisticsSender("https://tools.vaadin.com/usage-stats/submit", this.logger);
  }

  createClass(UsageStatistics, [{
    key: 'maybeGatherAndSend',
    value: function maybeGatherAndSend() {
      var _this = this;

      if (localStorage.getItem(UsageStatistics.optOutKey)) {
        return;
      }
      this.gatherer.gather(this.storage);
      setTimeout(function () {
        _this.maybeSend();
      }, this.gatherDelay * 1000);
    }
  }, {
    key: 'lottery',
    value: function lottery() {
      return true;
    }
  }, {
    key: 'currentMonth',
    value: function currentMonth() {
      return this.now.getYear() * 12 + this.now.getMonth();
    }
  }, {
    key: 'maybeSend',
    value: function maybeSend() {
      var firstUse = Number(localStorage.getItem(UsageStatistics.firstUseKey));
      var monthProcessed = Number(localStorage.getItem(UsageStatistics.monthProcessedKey));

      if (!firstUse) {
        // Use a grace period to avoid interfering with tests, incognito mode etc
        firstUse = this.timeNow;
        localStorage.setItem(UsageStatistics.firstUseKey, firstUse);
      }

      if (this.timeNow < firstUse + this.initialDelay * 1000) {
        this.logger.debug("No statistics will be sent until the initial delay of " + this.initialDelay + "s has passed");
        return;
      }
      if (this.currentMonth() <= monthProcessed) {
        this.logger.debug("This month has already been processed");
        return;
      }
      localStorage.setItem(UsageStatistics.monthProcessedKey, this.currentMonth());
      // Use random sampling
      if (this.lottery()) {
        this.logger.debug("Congratulations, we have a winner!");
      } else {
        this.logger.debug("Sorry, no stats from you this time");
        return;
      }

      this.send();
    }
  }, {
    key: 'send',
    value: function send() {
      // Ensure we have the latest data
      this.gatherer.gather(this.storage);

      // Read, send and clean up
      var data = this.storage.read();
      data["firstUse"] = Number(localStorage.getItem(UsageStatistics.firstUseKey));
      data["usageStatisticsVersion"] = UsageStatistics.version;
      var info = 'This request contains usage statistics gathered from the application running in development mode. \n\nStatistics gathering is automatically disabled and excluded from production builds.\n\nFor details and to opt-out, see https://github.com/vaadin/vaadin-usage-statistics.\n\n\n\n';
      var self = this;
      this.sender.send(info + JSON.stringify(data), function () {
        // Revert the 'month processed' flag
        localStorage.setItem(UsageStatistics.monthProcessedKey, self.currentMonth() - 1);
      });
    }
  }], [{
    key: 'version',
    get: function get$1() {
      return '2.1.2';
    }
  }, {
    key: 'firstUseKey',
    get: function get$1() {
      return 'vaadin.statistics.firstuse';
    }
  }, {
    key: 'monthProcessedKey',
    get: function get$1() {
      return 'vaadin.statistics.monthProcessed';
    }
  }, {
    key: 'optOutKey',
    get: function get$1() {
      return 'vaadin.statistics.optout';
    }
  }]);
  return UsageStatistics;
}();

try {
  window.Vaadin = window.Vaadin || {};
  window.Vaadin.usageStatsChecker = window.Vaadin.usageStatsChecker || new UsageStatistics();
  window.Vaadin.usageStatsChecker.maybeGatherAndSend();
} catch (e) {
  // Intentionally ignored as this is not a problem in the app being developed
}

}());

  vaadin-dev-mode:end **/}void 0===window.Vaadin.developmentMode&&(window.Vaadin.developmentMode=function(){try{return!!localStorage.getItem("vaadin.developmentmode.force")||["localhost","127.0.0.1"].indexOf(window.location.hostname)>=0&&(S?!(S&&Object.keys(S).map(e=>S[e]).filter(e=>e.productionMode).length>0):!O(function(){return!0}))}catch(e){return!1}}());!function(e,t=(window.Vaadin??={})){t.registrations??=[],t.registrations.push({is:"@vaadin/router",version:"2.0.0"})}(),L(R);var N=async function(e,t){return e.classList.add(t),await new Promise(i=>{if((e=>{const t=getComputedStyle(e).getPropertyValue("animation-name");return t&&"none"!==t})(e)){const n=e.getBoundingClientRect(),o=`height: ${n.bottom-n.top}px; width: ${n.right-n.left}px`;e.setAttribute("style",`position: absolute; ${o}`),((e,t)=>{const i=()=>{e.removeEventListener("animationend",i),t()};e.addEventListener("animationend",i)})(e,()=>{e.classList.remove(t),e.removeAttribute("style"),i()})}else e.classList.remove(t),i()})};function P(e){if(!e||!c(e.path))throw new Error(h('Expected route config to be an object with a "path" string property, or an array of such objects'));if(!(l(e.action)||Array.isArray(e.children)||l(e.children)||c(e.component)||c(e.redirect)))throw new Error(h(`Expected route config "${e.path}" to include either "component, redirect" or "action" function but none found.`));e.redirect&&["bundle","component"].forEach(t=>{t in e&&console.warn(h(`Route config "${String(e.path)}" has both "redirect" and "${t}" properties, and "redirect" will always override the latter. Did you mean to only use "${t}"?`))})}function M(e){d(e).forEach(e=>P(e))}function z(e,t){const i=t.__effectiveBaseUrl;return i?new URL(e.replace(/^\//u,""),i).pathname:e}function T(e){return e.map(e=>e.path).reduce((e,t)=>t.length?`${e.replace(/\/$/u,"")}/${t.replace(/^\//u,"")}`:e,"")}function B({chain:e=[],hash:i="",params:n={},pathname:o="",redirectFrom:r,resolver:s,search:a=""},l){const c=e.map(e=>e.route);return{baseUrl:s?.baseUrl??"",getUrl:(i={})=>s?z(t(function(e){return T(e.map(e=>e.route))}(e))({...n,...i}),s):"",hash:i,params:n,pathname:o,redirectFrom:r,route:l??(Array.isArray(c)?c.at(-1):void 0)??null,routes:c,search:a,searchParams:new URLSearchParams(a)}}function D(e,t){const i={...e.params};return{redirect:{from:e.pathname,params:i,pathname:t}}}function I(e,t,...i){if("function"==typeof e)return e.apply(t,i)}function H(e,t,...i){return n=>n&&a(n)&&("cancel"in n||"redirect"in n)?n:I(t?.[e],t,...i)}function U(e,t){return!window.dispatchEvent(new CustomEvent(`vaadin-router-${e}`,{cancelable:"go"===e,detail:t}))}function j(e){if(e instanceof Element)return e.nodeName.toLowerCase()}function V(e){if(e.defaultPrevented)return;if(0!==e.button)return;if(e.shiftKey||e.ctrlKey||e.altKey||e.metaKey)return;let t=e.target;const i=e instanceof MouseEvent?e.composedPath():e.path??[];for(let e=0;e<i.length;e++){const n=i[e];if("nodeName"in n&&"a"===n.nodeName.toLowerCase()){t=n;break}}for(;t&&t instanceof Node&&"a"!==j(t);)t=t.parentNode;if(!t||"a"!==j(t))return;const n=t;if(n.target&&"_self"!==n.target.toLowerCase())return;if(n.hasAttribute("download"))return;if(n.hasAttribute("router-ignore"))return;if(n.pathname===window.location.pathname&&""!==n.hash)return;const o=n.origin||function(e){const{port:t,protocol:i}=e;return`${i}//${"http:"===i&&"80"===t||"https:"===i&&"443"===t?e.hostname:e.host}`}(n);if(o!==window.location.origin)return;const{hash:r,pathname:s,search:a}=n;U("go",{hash:r,pathname:s,search:a})&&e instanceof MouseEvent&&(e.preventDefault(),"click"===e.type&&window.scrollTo(0,0))}function W(e){if("vaadin-router-ignore"===e.state)return;const{hash:t,pathname:i,search:n}=window.location;U("go",{hash:t,pathname:i,search:n})}let Z=[];const q={CLICK:{activate(){window.document.addEventListener("click",V)},inactivate(){window.document.removeEventListener("click",V)}},POPSTATE:{activate(){window.addEventListener("popstate",W)},inactivate(){window.removeEventListener("popstate",W)}}};function F(e=[]){Z.forEach(e=>e.inactivate()),e.forEach(e=>e.activate()),Z=e}function Y(){return{cancel:!0}}const K={__renderId:-1,params:{},route:{__synthetic:!0,children:[],path:"",action(){}},pathname:"",next:async()=>u};class G extends C{location=B({resolver:this});ready=Promise.resolve(this.location);#i=new WeakSet;#n=new WeakSet;#o=this.#r.bind(this);#s=0;#a;__previousContext;#l;#c=null;#d=null;constructor(e,t){const i=document.head.querySelector("base"),n=i?.getAttribute("href");super([],{baseUrl:n?new URL(n,document.URL).href.replace(/[^/]*$/u,""):void 0,...t,resolveRoute:async e=>await this.#h(e)}),F(Object.values(q)),this.setOutlet(e),this.subscribe()}async#h(e){const{route:t}=e;if(l(t.children)){let i=await t.children(function({next:e,...t}){return t}(e));l(t.children)||({children:i}=t),function(e,t){if(!Array.isArray(e)&&!a(e))throw new Error(h(`Incorrect "children" value for the route ${String(t.path)}: expected array or object, but got ${String(e)}`));const i=d(e);i.forEach(e=>P(e)),t.__children=i}(i,t)}const i={component:e=>{const t=document.createElement(e);return this.#n.add(t),t},prevent:Y,redirect:t=>D(e,t)};return await Promise.resolve().then(async()=>{if(this.#p(e))return await I(t.action,t,e,i)}).then(e=>null==e||"object"!=typeof e&&"symbol"!=typeof e||!(e instanceof HTMLElement||e===u||a(e)&&"redirect"in e)?c(t.redirect)?i.redirect(t.redirect):void 0:e).then(e=>null!=e?e:c(t.component)?i.component(t.component):void 0)}setOutlet(e){e&&this.#u(e),this.#a=e}getOutlet(){return this.#a}async setRoutes(e,t=!1){return this.__previousContext=void 0,this.#l=void 0,M(e),super.setRoutes(e),t||this.#r(),await this.ready}addRoutes(e){return M(e),super.addRoutes(e)}async render(e,t=!1){this.#s+=1;const i=this.#s,n={...K,...c(e)?{hash:"",search:"",pathname:e}:e,__renderId:i};return this.ready=this.#m(n,t),await this.ready}async#m(e,t){const{__renderId:i}=e;try{const n=await this.resolve(e),o=await this.#f(n);if(!this.#p(o))return this.location;const r=this.__previousContext;if(o===r)return this.#g(r,!0),this.location;if(this.location=B(o),t&&this.#g(o,1===i),U("location-changed",{router:this,location:this.location}),o.__skipAttach)return this.#y(o,r),this.__previousContext=o,this.location;this.#v(o,r);const s=this.#w(o);if(this.#b(o),this.#x(o,r),await s,this.#p(o))return this.#$(),this.__previousContext=o,this.location}catch(n){if(i===this.#s){t&&this.#g(this.context);for(const e of this.#a?.children??[])e.remove();throw this.location=B(Object.assign(e,{resolver:this})),U("error",{router:this,error:n,...e}),n}}return this.location}async#f(e,t=e){const i=await this.#C(t),n=i!==t?i:e,o=z(T(i.chain??[]),this)===i.pathname,r=async(e,t=e.route,i)=>{const n=await e.next(!1,t,i);return null===n||n===u?o?e:null!=t.parent?await r(e,t.parent,n):n:n},s=await r(i);if(null==s||s===u)throw m(n);return s!==i?await this.#f(n,s):await this.#E(i)}async#C(e){const{result:t}=e;if(t instanceof HTMLElement)return function(e,t){if(t.location=B(e),e.chain){const i=e.chain.map(e=>e.route).indexOf(e.route);e.chain[i].element=t}}(e,t),e;if(t&&"redirect"in t){const i=await this.#_(t.redirect,e.__redirectCount,e.__renderId);return await this.#C(i)}throw t instanceof Error?t:new Error(h(`Invalid route resolution result for path "${e.pathname}". Expected redirect object or HTML element, but got: "${function(e){if("object"!=typeof e)return String(e);const[t="Unknown"]=/ (.*)\]$/u.exec(String(e))??[];return"Object"===t||"Array"===t?`${t} ${JSON.stringify(e)}`:t}(t)}". Double check the action return value for the route.`))}async#E(e){return await this.#k(e).then(async t=>t===this.__previousContext||t===e?t:await this.#f(t))}async#k(e){const t=this.__previousContext??{},i=t.chain??[],n=e.chain??[];let o=Promise.resolve(void 0);const r=t=>D(e,t);if(e.__divergedChainIndex=0,e.__skipAttach=!1,i.length){for(let t=0;t<Math.min(i.length,n.length)&&(i[t].route===n[t].route&&(i[t].path===n[t].path||i[t].element===n[t].element)&&this.#A(i[t].element,n[t].element));e.__divergedChainIndex++,t++);if(e.__skipAttach=n.length===i.length&&e.__divergedChainIndex===n.length&&this.#A(e.result,t.result),e.__skipAttach){for(let t=n.length-1;t>=0;t--)o=this.#S(o,e,{prevent:Y},i[t]);for(let t=0;t<n.length;t++)o=this.#O(o,e,{prevent:Y,redirect:r},n[t]),i[t].element.location=B(e,i[t].route)}else for(let t=i.length-1;t>=e.__divergedChainIndex;t--)o=this.#S(o,e,{prevent:Y},i[t])}if(!e.__skipAttach)for(let t=0;t<n.length;t++)t<e.__divergedChainIndex?t<i.length&&i[t].element&&(i[t].element.location=B(e,i[t].route)):(o=this.#O(o,e,{prevent:Y,redirect:r},n[t]),n[t].element&&(n[t].element.location=B(e,n[t].route)));return await o.then(async t=>{if(t&&a(t)){if("cancel"in t&&this.__previousContext)return this.__previousContext.__renderId=e.__renderId,this.__previousContext;if("redirect"in t)return await this.#_(t.redirect,e.__redirectCount,e.__renderId)}return e})}async#S(e,t,i,n){const o=B(t);let r=await e;if(this.#p(t)){r=H("onBeforeLeave",n.element,o,i,this)(r)}if(!a(r)||!("redirect"in r))return r}async#O(e,t,i,n){const o=B(t,n.route),r=await e;if(this.#p(t)){return H("onBeforeEnter",n.element,o,i,this)(r)}}#A(e,t){return e instanceof Element&&t instanceof Element&&(this.#n.has(e)&&this.#n.has(t)?e.localName===t.localName:e===t)}#p(e){return e.__renderId===this.#s}async#_(e,t=0,i=0){if(t>256)throw new Error(h(`Too many redirects when rendering ${e.from}`));return await this.resolve({...K,pathname:this.urlForPath(e.pathname,e.params),redirectFrom:e.from,__redirectCount:t+1,__renderId:i})}#u(e=this.#a){if(!(e instanceof Element||e instanceof DocumentFragment))throw new TypeError(h(`Expected router outlet to be a valid DOM Element | DocumentFragment (but got ${e})`))}#g({pathname:e,search:t="",hash:i=""},n){if(window.location.pathname!==e||window.location.search!==t||window.location.hash!==i){const o=n?"replaceState":"pushState";window.history[o](null,document.title,e+t+i),window.dispatchEvent(new PopStateEvent("popstate",{state:"vaadin-router-ignore"}))}}#y(e,t){let i=this.#a;for(let n=0;n<(e.__divergedChainIndex??0);n++){const o=t?.chain?.[n].element;if(o){if(o.parentNode!==i)break;e.chain[n].element=o,i=o}}return i}#v(e,t){this.#u(),this.#L();const i=this.#y(e,t);this.#c=[],this.#d=Array.from(i?.children??[]).filter(t=>this.#i.has(t)&&t!==e.result);let n=i;for(let t=e.__divergedChainIndex??0;t<(e.chain?.length??0);t++){const o=e.chain[t].element;o&&(n?.appendChild(o),this.#i.add(o),n===i&&this.#c.push(o),n=o)}}#$(){if(this.#d)for(const e of this.#d)e.remove();this.#d=null,this.#c=null}#L(){if(this.#d&&this.#c){for(const e of this.#c)e.remove();this.#d=null,this.#c=null}}#x(e,t){if(t?.chain&&null!=e.__divergedChainIndex)for(let i=t.chain.length-1;i>=e.__divergedChainIndex&&this.#p(e);i--){const n=t.chain[i].element;if(n)try{const t=B(e);I(n.onAfterLeave,n,t,{},this)}finally{if(this.#d?.includes(n))for(const e of n.children)e.remove()}}}#b(e){if(e.chain&&null!=e.__divergedChainIndex)for(let t=e.__divergedChainIndex;t<e.chain.length&&this.#p(e);t++){const i=e.chain[t].element;if(i){const n=B(e,e.chain[t].route);I(i.onAfterEnter,i,n,{},this)}}}async#w(e){const t=this.#d?.[0],i=this.#c?.[0],n=[],{chain:o=[]}=e;let r;for(let e=o.length-1;e>=0;e--)if(o[e].route.animate){r=o[e].route.animate;break}if(t&&i&&r){const e=a(r)&&r.leave?r.leave:"leaving",o=a(r)&&r.enter?r.enter:"entering";n.push(N(t,e)),n.push(N(i,o))}return await Promise.all(n),e}subscribe(){window.addEventListener("vaadin-router-go",this.#o)}unsubscribe(){window.removeEventListener("vaadin-router-go",this.#o)}#r(e){const{pathname:t,search:i,hash:n}=e instanceof CustomEvent?e.detail:window.location;c(this.__normalizePathname(t))&&(e?.preventDefault&&e.preventDefault(),this.render({pathname:t,search:i,hash:n},!0))}static setTriggers(...e){F(e)}urlForName(e,t){return this.#l||(this.#l=k(this,{cacheKeyProvider:e=>"component"in e&&"string"==typeof e.component?e.component:void 0})),z(this.#l(e,t??void 0),this)}urlForPath(e,i){return z(t(e)(i??void 0),this)}static go(e){const{pathname:t,search:i,hash:n}=c(e)?new URL(e,"http://a"):e;return U("go",{pathname:t,search:i,hash:n})}}
/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const J=globalThis,X=J.ShadowRoot&&(void 0===J.ShadyCSS||J.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,Q=Symbol(),ee=new WeakMap;let te=class{constructor(e,t,i){if(this._$cssResult$=!0,i!==Q)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=e,this.t=t}get styleSheet(){let e=this.o;const t=this.t;if(X&&void 0===e){const i=void 0!==t&&1===t.length;i&&(e=ee.get(t)),void 0===e&&((this.o=e=new CSSStyleSheet).replaceSync(this.cssText),i&&ee.set(t,e))}return e}toString(){return this.cssText}};const ie=e=>new te("string"==typeof e?e:e+"",void 0,Q),ne=(e,...t)=>{const i=1===e.length?e[0]:t.reduce((t,i,n)=>t+(e=>{if(!0===e._$cssResult$)return e.cssText;if("number"==typeof e)return e;throw Error("Value passed to 'css' function must be a 'css' function result: "+e+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(i)+e[n+1],e[0]);return new te(i,e,Q)},oe=X?e=>e:e=>e instanceof CSSStyleSheet?(e=>{let t="";for(const i of e.cssRules)t+=i.cssText;return ie(t)})(e):e,{is:re,defineProperty:se,getOwnPropertyDescriptor:ae,getOwnPropertyNames:le,getOwnPropertySymbols:ce,getPrototypeOf:de}=Object,he=globalThis,pe=he.trustedTypes,ue=pe?pe.emptyScript:"",me=he.reactiveElementPolyfillSupport,fe=(e,t)=>e,ge={toAttribute(e,t){switch(t){case Boolean:e=e?ue:null;break;case Object:case Array:e=null==e?e:JSON.stringify(e)}return e},fromAttribute(e,t){let i=e;switch(t){case Boolean:i=null!==e;break;case Number:i=null===e?null:Number(e);break;case Object:case Array:try{i=JSON.parse(e)}catch(e){i=null}}return i}},ye=(e,t)=>!re(e,t),ve={attribute:!0,type:String,converter:ge,reflect:!1,useDefault:!1,hasChanged:ye};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */Symbol.metadata??=Symbol("metadata"),he.litPropertyMetadata??=new WeakMap;let we=class extends HTMLElement{static addInitializer(e){this._$Ei(),(this.l??=[]).push(e)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(e,t=ve){if(t.state&&(t.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(e)&&((t=Object.create(t)).wrapped=!0),this.elementProperties.set(e,t),!t.noAccessor){const i=Symbol(),n=this.getPropertyDescriptor(e,i,t);void 0!==n&&se(this.prototype,e,n)}}static getPropertyDescriptor(e,t,i){const{get:n,set:o}=ae(this.prototype,e)??{get(){return this[t]},set(e){this[t]=e}};return{get:n,set(t){const r=n?.call(this);o?.call(this,t),this.requestUpdate(e,r,i)},configurable:!0,enumerable:!0}}static getPropertyOptions(e){return this.elementProperties.get(e)??ve}static _$Ei(){if(this.hasOwnProperty(fe("elementProperties")))return;const e=de(this);e.finalize(),void 0!==e.l&&(this.l=[...e.l]),this.elementProperties=new Map(e.elementProperties)}static finalize(){if(this.hasOwnProperty(fe("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(fe("properties"))){const e=this.properties,t=[...le(e),...ce(e)];for(const i of t)this.createProperty(i,e[i])}const e=this[Symbol.metadata];if(null!==e){const t=litPropertyMetadata.get(e);if(void 0!==t)for(const[e,i]of t)this.elementProperties.set(e,i)}this._$Eh=new Map;for(const[e,t]of this.elementProperties){const i=this._$Eu(e,t);void 0!==i&&this._$Eh.set(i,e)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(e){const t=[];if(Array.isArray(e)){const i=new Set(e.flat(1/0).reverse());for(const e of i)t.unshift(oe(e))}else void 0!==e&&t.push(oe(e));return t}static _$Eu(e,t){const i=t.attribute;return!1===i?void 0:"string"==typeof i?i:"string"==typeof e?e.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){this._$ES=new Promise(e=>this.enableUpdating=e),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach(e=>e(this))}addController(e){(this._$EO??=new Set).add(e),void 0!==this.renderRoot&&this.isConnected&&e.hostConnected?.()}removeController(e){this._$EO?.delete(e)}_$E_(){const e=new Map,t=this.constructor.elementProperties;for(const i of t.keys())this.hasOwnProperty(i)&&(e.set(i,this[i]),delete this[i]);e.size>0&&(this._$Ep=e)}createRenderRoot(){const e=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return((e,t)=>{if(X)e.adoptedStyleSheets=t.map(e=>e instanceof CSSStyleSheet?e:e.styleSheet);else for(const i of t){const t=document.createElement("style"),n=J.litNonce;void 0!==n&&t.setAttribute("nonce",n),t.textContent=i.cssText,e.appendChild(t)}})(e,this.constructor.elementStyles),e}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(!0),this._$EO?.forEach(e=>e.hostConnected?.())}enableUpdating(e){}disconnectedCallback(){this._$EO?.forEach(e=>e.hostDisconnected?.())}attributeChangedCallback(e,t,i){this._$AK(e,i)}_$ET(e,t){const i=this.constructor.elementProperties.get(e),n=this.constructor._$Eu(e,i);if(void 0!==n&&!0===i.reflect){const o=(void 0!==i.converter?.toAttribute?i.converter:ge).toAttribute(t,i.type);this._$Em=e,null==o?this.removeAttribute(n):this.setAttribute(n,o),this._$Em=null}}_$AK(e,t){const i=this.constructor,n=i._$Eh.get(e);if(void 0!==n&&this._$Em!==n){const e=i.getPropertyOptions(n),o="function"==typeof e.converter?{fromAttribute:e.converter}:void 0!==e.converter?.fromAttribute?e.converter:ge;this._$Em=n,this[n]=o.fromAttribute(t,e.type)??this._$Ej?.get(n)??null,this._$Em=null}}requestUpdate(e,t,i){if(void 0!==e){const n=this.constructor,o=this[e];if(i??=n.getPropertyOptions(e),!((i.hasChanged??ye)(o,t)||i.useDefault&&i.reflect&&o===this._$Ej?.get(e)&&!this.hasAttribute(n._$Eu(e,i))))return;this.C(e,t,i)}!1===this.isUpdatePending&&(this._$ES=this._$EP())}C(e,t,{useDefault:i,reflect:n,wrapped:o},r){i&&!(this._$Ej??=new Map).has(e)&&(this._$Ej.set(e,r??t??this[e]),!0!==o||void 0!==r)||(this._$AL.has(e)||(this.hasUpdated||i||(t=void 0),this._$AL.set(e,t)),!0===n&&this._$Em!==e&&(this._$Eq??=new Set).add(e))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(e){Promise.reject(e)}const e=this.scheduleUpdate();return null!=e&&await e,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this._$Ep){for(const[e,t]of this._$Ep)this[e]=t;this._$Ep=void 0}const e=this.constructor.elementProperties;if(e.size>0)for(const[t,i]of e){const{wrapped:e}=i,n=this[t];!0!==e||this._$AL.has(t)||void 0===n||this.C(t,void 0,i,n)}}let e=!1;const t=this._$AL;try{e=this.shouldUpdate(t),e?(this.willUpdate(t),this._$EO?.forEach(e=>e.hostUpdate?.()),this.update(t)):this._$EM()}catch(t){throw e=!1,this._$EM(),t}e&&this._$AE(t)}willUpdate(e){}_$AE(e){this._$EO?.forEach(e=>e.hostUpdated?.()),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(e)),this.updated(e)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(e){return!0}update(e){this._$Eq&&=this._$Eq.forEach(e=>this._$ET(e,this[e])),this._$EM()}updated(e){}firstUpdated(e){}};we.elementStyles=[],we.shadowRootOptions={mode:"open"},we[fe("elementProperties")]=new Map,we[fe("finalized")]=new Map,me?.({ReactiveElement:we}),(he.reactiveElementVersions??=[]).push("2.1.0");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const be=globalThis,xe=be.trustedTypes,$e=xe?xe.createPolicy("lit-html",{createHTML:e=>e}):void 0,Ce="$lit$",Ee=`lit$${Math.random().toFixed(9).slice(2)}$`,_e="?"+Ee,ke=`<${_e}>`,Ae=document,Se=()=>Ae.createComment(""),Oe=e=>null===e||"object"!=typeof e&&"function"!=typeof e,Le=Array.isArray,Re="[ \t\n\f\r]",Ne=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,Pe=/-->/g,Me=/>/g,ze=RegExp(`>|${Re}(?:([^\\s"'>=/]+)(${Re}*=${Re}*(?:[^ \t\n\f\r"'\`<>=]|("|')|))|$)`,"g"),Te=/'/g,Be=/"/g,De=/^(?:script|style|textarea|title)$/i,Ie=(e=>(t,...i)=>({_$litType$:e,strings:t,values:i}))(1),He=Symbol.for("lit-noChange"),Ue=Symbol.for("lit-nothing"),je=new WeakMap,Ve=Ae.createTreeWalker(Ae,129);function We(e,t){if(!Le(e)||!e.hasOwnProperty("raw"))throw Error("invalid template strings array");return void 0!==$e?$e.createHTML(t):t}const Ze=(e,t)=>{const i=e.length-1,n=[];let o,r=2===t?"<svg>":3===t?"<math>":"",s=Ne;for(let t=0;t<i;t++){const i=e[t];let a,l,c=-1,d=0;for(;d<i.length&&(s.lastIndex=d,l=s.exec(i),null!==l);)d=s.lastIndex,s===Ne?"!--"===l[1]?s=Pe:void 0!==l[1]?s=Me:void 0!==l[2]?(De.test(l[2])&&(o=RegExp("</"+l[2],"g")),s=ze):void 0!==l[3]&&(s=ze):s===ze?">"===l[0]?(s=o??Ne,c=-1):void 0===l[1]?c=-2:(c=s.lastIndex-l[2].length,a=l[1],s=void 0===l[3]?ze:'"'===l[3]?Be:Te):s===Be||s===Te?s=ze:s===Pe||s===Me?s=Ne:(s=ze,o=void 0);const h=s===ze&&e[t+1].startsWith("/>")?" ":"";r+=s===Ne?i+ke:c>=0?(n.push(a),i.slice(0,c)+Ce+i.slice(c)+Ee+h):i+Ee+(-2===c?t:h)}return[We(e,r+(e[i]||"<?>")+(2===t?"</svg>":3===t?"</math>":"")),n]};class qe{constructor({strings:e,_$litType$:t},i){let n;this.parts=[];let o=0,r=0;const s=e.length-1,a=this.parts,[l,c]=Ze(e,t);if(this.el=qe.createElement(l,i),Ve.currentNode=this.el.content,2===t||3===t){const e=this.el.content.firstChild;e.replaceWith(...e.childNodes)}for(;null!==(n=Ve.nextNode())&&a.length<s;){if(1===n.nodeType){if(n.hasAttributes())for(const e of n.getAttributeNames())if(e.endsWith(Ce)){const t=c[r++],i=n.getAttribute(e).split(Ee),s=/([.?@])?(.*)/.exec(t);a.push({type:1,index:o,name:s[2],strings:i,ctor:"."===s[1]?Je:"?"===s[1]?Xe:"@"===s[1]?Qe:Ge}),n.removeAttribute(e)}else e.startsWith(Ee)&&(a.push({type:6,index:o}),n.removeAttribute(e));if(De.test(n.tagName)){const e=n.textContent.split(Ee),t=e.length-1;if(t>0){n.textContent=xe?xe.emptyScript:"";for(let i=0;i<t;i++)n.append(e[i],Se()),Ve.nextNode(),a.push({type:2,index:++o});n.append(e[t],Se())}}}else if(8===n.nodeType)if(n.data===_e)a.push({type:2,index:o});else{let e=-1;for(;-1!==(e=n.data.indexOf(Ee,e+1));)a.push({type:7,index:o}),e+=Ee.length-1}o++}}static createElement(e,t){const i=Ae.createElement("template");return i.innerHTML=e,i}}function Fe(e,t,i=e,n){if(t===He)return t;let o=void 0!==n?i._$Co?.[n]:i._$Cl;const r=Oe(t)?void 0:t._$litDirective$;return o?.constructor!==r&&(o?._$AO?.(!1),void 0===r?o=void 0:(o=new r(e),o._$AT(e,i,n)),void 0!==n?(i._$Co??=[])[n]=o:i._$Cl=o),void 0!==o&&(t=Fe(e,o._$AS(e,t.values),o,n)),t}class Ye{constructor(e,t){this._$AV=[],this._$AN=void 0,this._$AD=e,this._$AM=t}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(e){const{el:{content:t},parts:i}=this._$AD,n=(e?.creationScope??Ae).importNode(t,!0);Ve.currentNode=n;let o=Ve.nextNode(),r=0,s=0,a=i[0];for(;void 0!==a;){if(r===a.index){let t;2===a.type?t=new Ke(o,o.nextSibling,this,e):1===a.type?t=new a.ctor(o,a.name,a.strings,this,e):6===a.type&&(t=new et(o,this,e)),this._$AV.push(t),a=i[++s]}r!==a?.index&&(o=Ve.nextNode(),r++)}return Ve.currentNode=Ae,n}p(e){let t=0;for(const i of this._$AV)void 0!==i&&(void 0!==i.strings?(i._$AI(e,i,t),t+=i.strings.length-2):i._$AI(e[t])),t++}}class Ke{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(e,t,i,n){this.type=2,this._$AH=Ue,this._$AN=void 0,this._$AA=e,this._$AB=t,this._$AM=i,this.options=n,this._$Cv=n?.isConnected??!0}get parentNode(){let e=this._$AA.parentNode;const t=this._$AM;return void 0!==t&&11===e?.nodeType&&(e=t.parentNode),e}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(e,t=this){e=Fe(this,e,t),Oe(e)?e===Ue||null==e||""===e?(this._$AH!==Ue&&this._$AR(),this._$AH=Ue):e!==this._$AH&&e!==He&&this._(e):void 0!==e._$litType$?this.$(e):void 0!==e.nodeType?this.T(e):(e=>Le(e)||"function"==typeof e?.[Symbol.iterator])(e)?this.k(e):this._(e)}O(e){return this._$AA.parentNode.insertBefore(e,this._$AB)}T(e){this._$AH!==e&&(this._$AR(),this._$AH=this.O(e))}_(e){this._$AH!==Ue&&Oe(this._$AH)?this._$AA.nextSibling.data=e:this.T(Ae.createTextNode(e)),this._$AH=e}$(e){const{values:t,_$litType$:i}=e,n="number"==typeof i?this._$AC(e):(void 0===i.el&&(i.el=qe.createElement(We(i.h,i.h[0]),this.options)),i);if(this._$AH?._$AD===n)this._$AH.p(t);else{const e=new Ye(n,this),i=e.u(this.options);e.p(t),this.T(i),this._$AH=e}}_$AC(e){let t=je.get(e.strings);return void 0===t&&je.set(e.strings,t=new qe(e)),t}k(e){Le(this._$AH)||(this._$AH=[],this._$AR());const t=this._$AH;let i,n=0;for(const o of e)n===t.length?t.push(i=new Ke(this.O(Se()),this.O(Se()),this,this.options)):i=t[n],i._$AI(o),n++;n<t.length&&(this._$AR(i&&i._$AB.nextSibling,n),t.length=n)}_$AR(e=this._$AA.nextSibling,t){for(this._$AP?.(!1,!0,t);e&&e!==this._$AB;){const t=e.nextSibling;e.remove(),e=t}}setConnected(e){void 0===this._$AM&&(this._$Cv=e,this._$AP?.(e))}}class Ge{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(e,t,i,n,o){this.type=1,this._$AH=Ue,this._$AN=void 0,this.element=e,this.name=t,this._$AM=n,this.options=o,i.length>2||""!==i[0]||""!==i[1]?(this._$AH=Array(i.length-1).fill(new String),this.strings=i):this._$AH=Ue}_$AI(e,t=this,i,n){const o=this.strings;let r=!1;if(void 0===o)e=Fe(this,e,t,0),r=!Oe(e)||e!==this._$AH&&e!==He,r&&(this._$AH=e);else{const n=e;let s,a;for(e=o[0],s=0;s<o.length-1;s++)a=Fe(this,n[i+s],t,s),a===He&&(a=this._$AH[s]),r||=!Oe(a)||a!==this._$AH[s],a===Ue?e=Ue:e!==Ue&&(e+=(a??"")+o[s+1]),this._$AH[s]=a}r&&!n&&this.j(e)}j(e){e===Ue?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,e??"")}}class Je extends Ge{constructor(){super(...arguments),this.type=3}j(e){this.element[this.name]=e===Ue?void 0:e}}class Xe extends Ge{constructor(){super(...arguments),this.type=4}j(e){this.element.toggleAttribute(this.name,!!e&&e!==Ue)}}class Qe extends Ge{constructor(e,t,i,n,o){super(e,t,i,n,o),this.type=5}_$AI(e,t=this){if((e=Fe(this,e,t,0)??Ue)===He)return;const i=this._$AH,n=e===Ue&&i!==Ue||e.capture!==i.capture||e.once!==i.once||e.passive!==i.passive,o=e!==Ue&&(i===Ue||n);n&&this.element.removeEventListener(this.name,this,i),o&&this.element.addEventListener(this.name,this,e),this._$AH=e}handleEvent(e){"function"==typeof this._$AH?this._$AH.call(this.options?.host??this.element,e):this._$AH.handleEvent(e)}}class et{constructor(e,t,i){this.element=e,this.type=6,this._$AN=void 0,this._$AM=t,this.options=i}get _$AU(){return this._$AM._$AU}_$AI(e){Fe(this,e)}}const tt=be.litHtmlPolyfillSupport;tt?.(qe,Ke),(be.litHtmlVersions??=[]).push("3.3.0");const it=globalThis;
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */let nt=class extends we{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){const e=super.createRenderRoot();return this.renderOptions.renderBefore??=e.firstChild,e}update(e){const t=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(e),this._$Do=((e,t,i)=>{const n=i?.renderBefore??t;let o=n._$litPart$;if(void 0===o){const e=i?.renderBefore??null;n._$litPart$=o=new Ke(t.insertBefore(Se(),e),e,void 0,i??{})}return o._$AI(e),o})(t,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(!1)}render(){return He}};nt._$litElement$=!0,nt.finalized=!0,it.litElementHydrateSupport?.({LitElement:nt});const ot=it.litElementPolyfillSupport;ot?.({LitElement:nt}),(it.litElementVersions??=[]).push("4.2.0");const rt=300,st=400,at=500,lt=600,ct=({size:e,lineHeight:t,letterSpacing:i,align:n,weight:o})=>ie(`\n  \n    ${e?`font-size: ${e}px;`:""}\n    ${t?`line-height: ${t}px;`:""}\n    ${i?`letter-spacing: ${i}px;`:""}\n    ${n?`text-align: ${n};`:""}\n    ${o?`font-weight: ${o};`:""}\n    ${o?`font-variation-settings: "wght" ${o};`:""}\n  `),dt=ne`
  :host {
    display: flex;
    flex-direction: column;
    min-height: 100vh;
    background-color: var(--color-bg);
  }

  main {
    margin: 0 40px;

    border-radius: 4px;
    min-height: calc(100vh - 240px);
  }
`,ht=ne`
  header {
    display: flex;
    flex-direction: column;

    height: 150px;
  }
  .navbar {
    display: flex;
    justify-content: space-between;

    padding-left: 4px;

    width: 100%;
    height: 40px;

    background-color: var(--color-white);
  }
  .logoWrapper {
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
    flex-wrap: wrap;
    gap: 6px;

    height: 100%;

    img {
      width: 40px;
      height: 40px;
    }

    h3 {
      margin: 0;

      ${ct({size:14,lineHeight:16,weight:at})};
    }
  }
`,pt=[{title:"employees",icon:"employee-icon",href:"/",hasDataGrid:!0},{title:"addEmployee",icon:"plus-icon",href:"/add-employee",hasDataGrid:!1},{title:"editEmployee",icon:"plus-icon",href:"/edit-employee",hasDataGrid:!1,visible:!1}],ut={common:{listType:"list"},employees:[{id:1,firstName:"Ahmet",lastName:"Yılmaz",dateOfEmployment:"2020-01-15",dateOfBirth:"1990-05-20",phone:"5551234567",email:"ahmet@example.com",department:"softwareDeveloper",position:"junior"},{id:2,firstName:"Ayşe",lastName:"Demir",dateOfEmployment:"2021-03-10",dateOfBirth:"1992-11-01",phone:"5559876543",email:"ayse@example.com",department:"dataAnalyst",position:"medior"},{id:3,firstName:"Mehmet",lastName:"Kaya",dateOfEmployment:"2019-06-22",dateOfBirth:"1988-09-13",phone:"5551112233",email:"mehmet@example.com",department:"projectManager",position:"senior"},{id:4,firstName:"Elif",lastName:"Çelik",dateOfEmployment:"2022-04-01",dateOfBirth:"1995-12-05",phone:"5559988776",email:"elif@example.com",department:"hrSpecialist",position:"junior"},{id:5,firstName:"Burak",lastName:"Aydın",dateOfEmployment:"2023-01-12",dateOfBirth:"1993-03-15",phone:"5554443322",email:"burak@example.com",department:"marketingSpecialist",position:"medior"},{id:6,firstName:"Zeynep",lastName:"Öztürk",dateOfEmployment:"2020-10-18",dateOfBirth:"1991-07-07",phone:"5556667788",email:"zeynep@example.com",department:"softwareDeveloper",position:"senior"},{id:7,firstName:"Emre",lastName:"Şahin",dateOfEmployment:"2018-08-05",dateOfBirth:"1987-02-24",phone:"5559990001",email:"emre@example.com",department:"dataAnalyst",position:"junior"},{id:8,firstName:"Melis",lastName:"Doğan",dateOfEmployment:"2019-11-29",dateOfBirth:"1990-06-18",phone:"5553332211",email:"melis@example.com",department:"projectManager",position:"medior"},{id:9,firstName:"Can",lastName:"Kurt",dateOfEmployment:"2021-02-14",dateOfBirth:"1994-08-20",phone:"5557778899",email:"can@example.com",department:"hrSpecialist",position:"senior"},{id:10,firstName:"Derya",lastName:"Aslan",dateOfEmployment:"2022-06-08",dateOfBirth:"1996-10-30",phone:"5551122334",email:"derya@example.com",department:"marketingSpecialist",position:"junior"},{id:11,firstName:"Ali",lastName:"Ergin",dateOfEmployment:"2020-05-11",dateOfBirth:"1989-01-10",phone:"5554433221",email:"ali@example.com",department:"softwareDeveloper",position:"medior"},{id:12,firstName:"Nazlı",lastName:"Kara",dateOfEmployment:"2017-09-30",dateOfBirth:"1985-11-17",phone:"5552233445",email:"nazli@example.com",department:"dataAnalyst",position:"senior"},{id:13,firstName:"Barış",lastName:"Yüce",dateOfEmployment:"2016-12-21",dateOfBirth:"1986-04-04",phone:"5553344556",email:"baris@example.com",department:"projectManager",position:"junior"}]},mt="ADD_EMPLOYEE",ft="EDIT_EMPLOYEE",gt="REMOVE_EMPLOYEE",yt="CHANGE_LIST_TYPE";function vt(e){return`Minified Redux error #${e}; visit https://redux.js.org/Errors?code=${e} for the full message or use the non-minified dev environment for full errors. `}var wt=(()=>"function"==typeof Symbol&&Symbol.observable||"@@observable")(),bt=()=>Math.random().toString(36).substring(7).split("").join("."),xt={INIT:`@@redux/INIT${bt()}`,REPLACE:`@@redux/REPLACE${bt()}`};const $t=(()=>{try{const e=localStorage.getItem("reduxState");if(null===e)return;return JSON.parse(e)}catch(e){return void console.warn("Could not load state from localStorage",e)}})(),Ct=function e(t,i,n){if("function"!=typeof t)throw new Error(vt(2));if("function"==typeof i&&"function"==typeof n||"function"==typeof n&&"function"==typeof arguments[3])throw new Error(vt(0));if("function"==typeof i&&void 0===n&&(n=i,i=void 0),void 0!==n){if("function"!=typeof n)throw new Error(vt(1));return n(e)(t,i)}let o=t,r=i,s=new Map,a=s,l=0,c=!1;function d(){a===s&&(a=new Map,s.forEach((e,t)=>{a.set(t,e)}))}function h(){if(c)throw new Error(vt(3));return r}function p(e){if("function"!=typeof e)throw new Error(vt(4));if(c)throw new Error(vt(5));let t=!0;d();const i=l++;return a.set(i,e),function(){if(t){if(c)throw new Error(vt(6));t=!1,d(),a.delete(i),s=null}}}function u(e){if(!function(e){if("object"!=typeof e||null===e)return!1;let t=e;for(;null!==Object.getPrototypeOf(t);)t=Object.getPrototypeOf(t);return Object.getPrototypeOf(e)===t||null===Object.getPrototypeOf(e)}(e))throw new Error(vt(7));if(void 0===e.type)throw new Error(vt(8));if("string"!=typeof e.type)throw new Error(vt(17));if(c)throw new Error(vt(9));try{c=!0,r=o(r,e)}finally{c=!1}return(s=a).forEach(e=>{e()}),e}return u({type:xt.INIT}),{dispatch:u,subscribe:p,getState:h,replaceReducer:function(e){if("function"!=typeof e)throw new Error(vt(10));o=e,u({type:xt.REPLACE})},[wt]:function(){const e=p;return{subscribe(t){if("object"!=typeof t||null===t)throw new Error(vt(11));function i(){const e=t;e.next&&e.next(h())}i();return{unsubscribe:e(i)}},[wt](){return this}}}}}(function(e=ut,t){switch(t.type){case mt:return{...e,employees:[...e.employees,t.payload]};case ft:return console.log(t.payload),{...e,employees:e.employees.map(e=>e.id===t.payload.id?t.payload:e)};case gt:return{...e,employees:e.employees.filter(e=>e.id!==t.payload)};case yt:return{...e,common:{listType:t.payload}};default:return e}},$t,window.__REDUX_DEVTOOLS_EXTENSION__&&window.__REDUX_DEVTOOLS_EXTENSION__());Ct.subscribe(()=>{(e=>{try{const t=JSON.stringify(e);localStorage.setItem("reduxState",t)}catch(e){console.warn("Could not save state to localStorage",e)}})(Ct.getState())});const Et=ne`
  .navMenu {
    display: flex;
    flex-direction: column;
    align-items: center;

    height: 100%;

    padding-right: 12px;
  }

  .navMenuList {
    display: flex;
    align-items: center;
    list-style: none;
    gap: 18px;

    margin: 0;
    padding: 0;

    height: 100%;
  }
  .navMenu li {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    flex-wrap: wrap;
    gap: 6px;

    opacity: 0.6;

    transition: opacity 0.3s ease;
  }

  .navMenu li:hover {
    opacity: 0.9;
  }

  .navMenu li.active {
    opacity: 1 !important;
  }

  .navMenu a {
    ${ct({size:14,lineHeight:18,weight:at})};
    color: var(--color-primary);
    text-decoration: none;
  }

  .langButton {
    display: flex;
    align-items: center;
    flex-wrap: wrap;

    margin-top: 3px;

    height: 100%;

    border: none;
    background-color: transparent;

    cursor: pointer;
  }
`,_t=ne`
  .pageNameWrapper {
    display: flex;
    justify-content: space-between;
    align-items: center;

    padding: 0 40px;

    background-color: var(--color-bg);
  }
  .pageName {
    ${ct({size:30,lineHeight:34,weight:at})};
    color: var(--color-primary);
  }

  .listTypeSwitchWrapper {
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: flex-start;
    flex-wrap: wrap;
  }

  .listTypeSwitchButton {
    display: flex;
    align-items: center;
    flex-wrap: wrap;

    height: 100%;

    border: none;
    background-color: transparent;

    cursor: pointer;

    transition: opacity 0.3s ease;

    opacity: 0.5;

    &:hover {
      opacity: 0.8;
    }
  }

  .activeButton {
    opacity: 1 !important;
  }
`;const kt={en:{employees:"Employees",addNew:"Add New",addEmployee:"Add Employee",firstName:"First Name",lastName:"Last Name",dateOfEmployment:"Date Of Employment",dateOfBirth:"Date Of Birth",phone:"Phone",email:"Email",department:"Department",position:"Position",action:"Action",logoTitle:"ING Bank",save:"Save",cancel:"Cancel",editEmployee:"Edit Employee",softwareDeveloper:"Software Developer",dataAnalyst:"Data Analyst",projectManager:"Project Manager",hrSpecialist:"HR Specialist",marketingSpecialist:"Marketing Specialist",pleaseSelect:"Please Select",areYouSure:"Are you sure?",deleteDesc:"Selected Employee recor of # will be deleted",edit:"Edit",delete:"Delete",fillBlank:"Fill Blanks",validationDesc:"fix this problems.",ok:"Ok",junior:"Junior",medior:"Medior",senior:"Senior",invalidEmail:"Invalid Email",invalidPhone:"Invalid Phone",editDesc:"# named person will be update."},tr:{employees:"Çalışanlar",addNew:"Yeni Ekle",firstName:"Ad",lastName:"Soyad",addEmployee:"Çalışan Ekle",dateOfEmployment:"İşe Giriş Tarihi",dateOfBirth:"Doğum Tarihi",phone:"Telefon",email:"Email",department:"Birim",position:"Pozisyon",action:"Aksiyonlar",logoTitle:"ING Bankası",save:"Kaydet",cancel:"İptal",editEmployee:"Çalışnaı Düzenle",softwareDeveloper:"Yazılım Geliştirici",dataAnalyst:"Veri Analisti",projectManager:"Proje Yöneticisi",hrSpecialist:"IK Uzmanı",marketingSpecialist:"Satış Uzmanı",pleaseSelect:"Lütfen Seçiniz",areYouSure:"Emin misiniz?",deleteDesc:"Selected Employee recor of # will be deleted",edit:"Düzenle",delete:"Sil",fillBlank:"Boşlukları Doldurunuz",validationDesc:"alanlarını düzeltiniz.",ok:"Tamam",junior:"Acemi",medior:"Orta Seviye",senior:"Uzman",invalidEmail:"Geçersiz Email",invalidPhone:"Geçersiz Telefon",editDesc:"# adlı kişinin bilgileri güncellenecektir."}},At="locale_lang";let St=(()=>{const e=localStorage.getItem(At);if(e&&("tr"===e||"en"===e))return e;const t=document.documentElement.lang.toLowerCase();return"tr"===t||"en"===t?t:"en"})();const Ot=(e,t)=>{let i=kt[St][e]??e;return"string"!=typeof t&&"number"!=typeof t||(i=i.replace("#",t)),i};customElements.define("svg-icon",class extends nt{static properties={pathData:{type:String|Array},viewBox:{type:String},fillColor:{type:String},strokeColor:{type:String},size:{type:Number}};constructor(){super(),this.strokeColor="currentColor",this.fillColor="#fff",this.viewBox="0 0 24 24",this.size=16}get computedStrokeColor(){return this.strokeColor&&"currentColor"!==this.strokeColor?this.strokeColor.startsWith("#")?this.strokeColor:`var(--color-${this.strokeColor})`:"currentColor"}get computedFillColor(){return this.fillColor&&"currentColor"!==this.fillColor?this.fillColor.startsWith("#")?this.fillColor:`var(--color-${this.fillColor})`:"currentColor"}render(){return Ie`
      <svg
        width="${this.size}"
        height="${this.size}"
        viewBox=${this.viewBox}
        fill="${this.computedFillColor}"
        stroke="${this.computedStrokeColor}"
        stroke-width="1"
        stroke-linecap="round"
        stroke-linejoin="round"
      >
        <path d="${this.pathData}" fill=${this.computedFillColor}></path>
      </svg>
    `}});customElements.define("list-icon",class extends nt{static properties={strokeColor:{type:String},size:{type:Number}};constructor(){super(),this.strokeColor="currentColor",this.size=16}render(){return Ie`
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="33"
        height="33"
        viewBox="2 1 100 100"
        fill="none"
      >
        <path
          d="M100.25 55H19.75C17.1266 55 15 57.1266 15 59.75V60.25C15 62.8734 17.1266 65 19.75 65H100.25C102.873 65 105 62.8734 105 60.25V59.75C105 57.1266 102.873 55 100.25 55Z"
          fill="#F24E1E"
        />
        <path
          d="M100.25 80H19.75C17.1266 80 15 82.1267 15 84.75V85.25C15 87.8733 17.1266 90 19.75 90H100.25C102.873 90 105 87.8733 105 85.25V84.75C105 82.1267 102.873 80 100.25 80Z"
          fill="#F24E1E"
        />
        <path
          d="M100.25 30H19.75C17.1266 30 15 32.1266 15 34.75V35.25C15 37.8734 17.1266 40 19.75 40H100.25C102.873 40 105 37.8734 105 35.25V34.75C105 32.1266 102.873 30 100.25 30Z"
          fill="#F24E1E"
        />
      </svg>
    `}});customElements.define("widget-icon",class extends nt{render(){return Ie`
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="33"
        height="33"
        viewBox="0 -4.2 28 28"
        fill="none"
      >
        <rect
          x="3"
          y="3"
          width="7"
          height="7"
          rx="1"
          stroke="#ff6200"
          stroke-linecap="round"
        />
        <rect
          x="3"
          y="14"
          width="7"
          height="7"
          rx="1"
          stroke="#ff6200"
          stroke-linecap="round"
        />
        <rect
          x="14"
          y="3"
          width="7"
          height="7"
          rx="1"
          stroke="#ff6200"
          stroke-linecap="round"
        />
        <rect
          x="14"
          y="14"
          width="7"
          height="7"
          rx="1"
          stroke="#ff6200"
          stroke-linecap="round"
        />
      </svg>
    `}});customElements.define("header-page-name",class extends nt{static properties={activeRoute:{type:String},listType:{type:String}};constructor(){super(),this.activeRoute="/",this.listType="list"}static styles=_t;connectedCallback=()=>{super.connectedCallback(),this._unsubscribe=Ct.subscribe(()=>this._onStateChange()),this._onStateChange()};_onStateChange=()=>{const e=Ct.getState().common.listType;this.listType=e};disconnectedCallback=()=>{super.disconnectedCallback(),this._unsubscribe&&(this._unsubscribe(),this._unsubscribe=null)};changeListType=e=>{Ct.dispatch((e=>({type:yt,payload:e}))(e))};render(){const e="/"+this.activeRoute.split("/")[1],t=pt.find(t=>t.href===e);return Ie` <div class="pageNameWrapper">
      <h3 class="pageName">${Ot(t?.title||"")}</h3>
      ${t.hasDataGrid?Ie` <div class="listTypeSwitchWrapper">
            <button
              @click=${()=>this.changeListType("list")}
              class=${"listTypeSwitchButton "+("list"===this.listType?"activeButton":"")}
            >
              <list-icon></list-icon>
            </button>
            <button
              @click=${()=>this.changeListType("widget")}
              class=${"listTypeSwitchButton "+("widget"===this.listType?"activeButton":"")}
            >
              <widget-icon></widget-icon>
            </button>
          </div>`:void 0}
    </div>`}});customElements.define("employee-icon",class extends nt{static properties={strokeColor:{type:String},size:{type:Number}};constructor(){super(),this.strokeColor="currentColor",this.size=16}render(){return Ie`
      <svg-icon
        pathData="M10,11 C12.353,11 14.318,12.711 14.848,15 L14.848,15 L18,15 C19.103,15 20,15.897 20,17 L20,17 L20,19 L18,19 L18,17 L2,17 L2,19 L0,19 L0,17 C0,15.897 0.897,15 2,15 L2,15 L5.152,15 C5.682,12.711 7.647,11 10,11 Z M10,4 C11.657,4 13,5.343 13,7 C13,8.657 11.657,10 10,10 C8.343,10 7,8.657 7,7 C7,5.343 8.343,4 10,4 Z M10,0 C13.859,0 17,3.14 17,7 L17,7 L15,7 C15,4.243 12.757,2 10,2 C7.243,2 5,4.243 5,7 L5,7 L5,8 L6,8 L6,10 L4,10 C3.447,10 3,9.552 3,9 L3,9 L3,7 C3,3.14 6.141,0 10,0 Z"
        viewBox="-1 -2 22 22"
        .strokeColor=${this.strokeColor}
        .size=${this.size}
      >
      </svg-icon>
    `}});customElements.define("plus-icon",class extends nt{static properties={strokeColor:{type:String},size:{type:Number}};constructor(){super(),this.strokeColor="currentColor",this.size=16}render(){return Ie`
      <svg-icon
        pathData="M3.54199 8.93783H8.50033M13.4587 8.93783H8.50033M8.50033 8.93783V3.97949M8.50033 8.93783V13.8962"
        viewBox="0 0 15 15"
        .strokeColor=${this.strokeColor}
        .size=${this.size}
      >
      </svg-icon>
    `}});customElements.define("tr-icon",class extends nt{render(){return Ie`
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="20"
        height="14"
        viewBox="0 -30000 90000 60000"
        preserveAspectRatio="none"
      >
        <path fill="#e30a17" d="m0-30000h90000v60000H0z" />
        <path
          fill="#fff"
          d="m41750 0 13568-4408-8386 11541V-7133l8386 11541zm925 8021a15000 15000 0 1 1 0-16042 12000 12000 0 1 0 0 16042z"
        />
      </svg>
    `}});customElements.define("uk-icon",class extends nt{render(){return Ie`
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 60 30"
        width="20"
        height="14"
        preserveAspectRatio="none"
      >
        <clipPath id="s">
          <path d="M0,0 v30 h60 v-30 z" />
        </clipPath>
        <clipPath id="t">
          <path d="M30,15 h30 v15 z v15 h-30 z h-30 v-15 z v-15 h30 z" />
        </clipPath>
        <g clip-path="url(#s)">
          <path d="M0,0 v30 h60 v-30 z" fill="#012169" />
          <path d="M0,0 L60,30 M60,0 L0,30" stroke="#fff" stroke-width="6" />
          <path
            d="M0,0 L60,30 M60,0 L0,30"
            clip-path="url(#t)"
            stroke="#C8102E"
            stroke-width="4"
          />
          <path d="M30,0 v30 M0,15 h60" stroke="#fff" stroke-width="10" />
          <path d="M30,0 v30 M0,15 h60" stroke="#C8102E" stroke-width="6" />
        </g>
      </svg>
    `}});customElements.define("header-navbar",class extends nt{static properties={activeRoute:{type:String},activeLang:{type:String}};constructor(){super(),this.activeLang=localStorage.getItem(At),this.activeRoute=window.location.pathname,window.addEventListener("popstate",()=>{this.activeRoute=window.location.pathname})}static styles=Et;changeLang=()=>{const e="tr"===this.activeLang?"en":"tr";var t;St=t=e,localStorage.setItem(At,t),window.dispatchEvent(new CustomEvent("locale-changed")),this.activeLang=e};render(){return Ie`
      <nav class="navMenu">
        <ul class="navMenuList">
          ${pt.filter(e=>!1!==e.visible).map(e=>{return Ie`
              <li class="${this.activeRoute===e.href?"active":""}">
                ${t=e.icon,"employee-icon"===t?Ie`<employee-icon
          strokeColor="primary"
          size="18"
        ></employee-icon>`:"plus-icon"===t?Ie`<plus-icon strokeColor="primary" size="18"></plus-icon>`:Ie``}
                <a href="${e.href}">${Ot(e.title)}</a>
              </li>
            `;var t})}
          <button @click=${this.changeLang} class="langButton">
            ${"tr"===this.activeLang?Ie`<uk-icon></uk-icon> `:Ie`<tr-icon></tr-icon>`}
          </button>
        </ul>
      </nav>
    `}});customElements.define("dashboard-header",class extends nt{static properties={activeRoute:{type:String},activeLang:{type:String}};constructor(){super(),this.activeLang=document.documentElement.lang||"en",this.activeRoute=window.location.pathname,window.addEventListener("popstate",()=>{this.activeRoute=window.location.pathname})}static styles=ht;render(){const e=new URL("../../assets/images/ing-logo.png",import.meta.url).href;return Ie` <header>
      <div class="navbar">
        <div class="logoWrapper">
          <img src="${e}" alt="Ing" />
          <h3>ING</h3>
        </div>
        <header-navbar></header-navbar>
      </div>
      <header-page-name activeRoute="${this.activeRoute}"></header-page-name>
    </header>`}});customElements.define("dashboard-layout",class extends nt{static styles=dt;render(){return Ie`
      <dashboard-header></dashboard-header>
      <main>
        <slot></slot>
      </main>
    `}});const Lt=ne`
  .wrapper {
    background-color: var(--color-white);
    overflow-x: auto; /* Tüm tablo için yatay scroll */
  }

  table {
    width: 100%;
    min-width: 600px; /* Tablo içeriğinin dar ekranlarda taşmaması için */
    border-collapse: collapse;
  }

  th,
  td {
    border-bottom: 1px solid var(--color-stroke-default);
    padding: 18px 6px;
    text-align: center;
  }

  th {
    ${ct({size:14,lineHeight:16,weight:st})};
    color: var(--color-primary);
  }

  tr {
    ${ct({size:14,lineHeight:16,weight:st})};
  }

  .selectBoxCell {
    width: 60px;
    text-align: center;
  }

  .actionButtonsWrapper {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    gap: 8px;
  }

  .actionButton {
    display: flex;
    align-items: center;
    height: 100%;
    border: none;
    background-color: transparent;
    cursor: pointer;
    transition: opacity 0.3s ease;
    opacity: 0.7;
  }

  .actionButton:hover {
    opacity: 1;
  }

  /* Responsive davranışlar */
  @media (max-width: 768px) {
    table {
      min-width: unset;
    }

    th,
    td {
      padding: 12px 4px;
      font-size: 12px;
    }

    .selectBoxCell {
      width: 40px;
    }

    .actionButtonsWrapper {
      flex-direction: column;
      gap: 4px;
    }

    .wrapper {
      overflow-x: auto;
    }
  }

  @media (max-width: 480px) {
    th,
    td {
      font-size: 11px;
      padding: 10px 2px;
    }

    .actionButton {
      font-size: 11px;
    }
  }
`,Rt=ne`
  .custom-checkbox {
    display: inline-flex;
    align-items: center;
    cursor: pointer;
  }

  .custom-checkbox input[type='checkbox'] {
    display: none;
  }

  .custom-checkbox .checkmark {
    width: 16px;
    height: 16px;
    border-radius: 6px;
    background-color: white;
    border: 2px solid var(--color-stroke-default);
    position: relative;
  }

  .custom-checkbox input[type='checkbox']:checked + .checkmark {
    background-color: var(--color-primary);
  }

  .custom-checkbox input[type='checkbox']:checked + .checkmark::after {
    content: '';
    position: absolute;
    top: 2px;
    left: 5px;
    width: 4px;
    height: 8px;
    border: solid white;
    border-width: 0 2px 2px 0;
    transform: rotate(45deg);
  }
`;class Nt extends nt{static properties={checked:{type:Boolean,reflect:!0}};constructor(){super(),this.checked=!1}static styles=Rt;handleClick=e=>{e.preventDefault(),this.checked=!this.checked,this.dispatchEvent(new CustomEvent("change",{detail:{checked:this.checked},bubbles:!0,composed:!0}))};render(){return Ie`
      <label class="custom-checkbox" @click=${this.handleClick}>
        <input type="checkbox" .checked=${this.checked} />
        <span class="checkmark"></span>
      </label>
    `}}customElements.define("check-box",Nt);const Pt=ne`
  :host {
    display: flex;
    flex: 1;
    justify-content: center;
    align-items: center;
    gap: 4px;
    padding: 10px 0;
    background-color: var(--color-bg);
    flex-wrap: wrap; /* Mobilde alt alta geçebilmesi için */
  }

  button {
    background-color: transparent;
    border: none;
    padding: 6px 10px;
    cursor: pointer;
    transition: background-color 0.2s, border-color 0.2s;
  }

  button:hover:not([disabled]) {
    border-color: #0056b3;
  }

  button[disabled] {
    svg {
      fill: var(--color-stroke-default);
    }
    cursor: not-allowed;
  }

  .page-numbers {
    display: flex;
    gap: 4px;
    flex-wrap: wrap; /* Küçük ekranlarda taşmasın diye */
    justify-content: center;
  }

  .page-number {
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    margin-top: 3px;
    height: 100%;
    border: none;
    background-color: transparent;
    cursor: pointer;
  }

  .page-numbers button {
    background-color: transparent;
    ${ct({size:16,lineHeight:18,weight:at})};
    color: var(--color-text);
    border-radius: 50%;
    min-width: 32px;
    min-height: 32px;
  }

  .page-numbers button:hover:not([disabled]) {
    background-color: var(--color-primary);
    color: var(--color-white);
  }

  .page-numbers button.active {
    background-color: var(--color-primary);
    color: white;
  }

  span {
    font-size: 0.9em;
    color: #555;
  }

  /* Responsive ayarlar */
  @media (max-width: 768px) {
    :host {
      gap: 8px;
      padding: 8px 0;
      flex-direction: column;
    }

    .page-numbers {
      gap: 6px;
    }

    .page-numbers button {
      ${ct({size:14,lineHeight:16,weight:at})};
      min-width: 28px;
      min-height: 28px;
    }

    button {
      padding: 5px 8px;
    }
  }

  @media (max-width: 480px) {
    .page-numbers button {
      ${ct({size:12,lineHeight:14,weight:at})};
      min-width: 24px;
      min-height: 24px;
    }

    button {
      padding: 4px 6px;
    }

    span {
      font-size: 0.8em;
    }
  }
`;customElements.define("greater-icon",class extends nt{static properties={strokeColor:{type:String},size:{type:Number}};constructor(){super(),this.strokeColor="currentColor",this.size=16}render(){return Ie`
      <svg-icon
        pathData="M 42.1680 43.5625 C 43.3164 43.5625 44.1602 42.7422 44.1602 41.4531 C 44.1602 40.3750 43.5976 39.7656 42.6133 39.2969 L 17.3711 28.0703 L 17.3711 27.8125 L 42.6133 16.6797 C 43.5976 16.2110 44.1602 15.6016 44.1602 14.5235 C 44.1602 13.2813 43.2929 12.4375 42.0742 12.4375 C 41.4648 12.4375 41.0429 12.6016 40.5742 12.8359 L 14.2304 24.9532 C 12.8711 25.5625 11.8398 26.6406 11.8398 28.1172 C 11.8398 29.6172 12.8945 30.6484 14.2304 31.2813 L 40.5742 43.1172 C 41.0664 43.3516 41.5117 43.5625 42.1680 43.5625 Z"
        viewBox="0 -6 50 50"
        .strokeColor=${this.strokeColor}
        .size=${this.size}
        .fillColor=${this.strokeColor}
      >
      </svg-icon>
    `}});customElements.define("less-icon",class extends nt{static properties={strokeColor:{type:String},size:{type:Number}};constructor(){super(),this.strokeColor="currentColor",this.size=16}render(){return Ie`
      <svg-icon
        pathData="M 13.8320 43.5625 C 14.4883 43.5625 14.9336 43.3516 15.4258 43.1172 L 41.7695 31.2813 C 43.1055 30.6484 44.1602 29.6172 44.1602 28.1172 C 44.1602 26.6406 43.1289 25.5625 41.7461 24.9532 L 15.4258 12.8359 C 14.9570 12.6016 14.5351 12.4375 13.9258 12.4375 C 12.7070 12.4375 11.8398 13.2813 11.8398 14.5235 C 11.8398 15.6016 12.4023 16.2110 13.3867 16.6797 L 38.6055 27.8125 L 38.6055 28.0703 L 13.3867 39.2969 C 12.4023 39.7656 11.8398 40.3750 11.8398 41.4531 C 11.8398 42.7422 12.6836 43.5625 13.8320 43.5625 Z"
        viewBox="0 -4 50 50"
        .strokeColor=${this.strokeColor}
        .fillColor=${this.strokeColor}
        .size=${this.size}
      >
      </svg-icon>
    `}});customElements.define("pagination-element",class extends nt{static properties={totalItems:{type:Number},pageSize:{type:Number},currentPage:{type:Number}};constructor(){super(),this.totalItems=0,this.pageSize=10,this.currentPage=1}static styles=Pt;get totalPages(){return 0===this.totalItems||0===this.pageSize?0:Math.ceil(this.totalItems/this.pageSize)}_goToPage=e=>{e>=1&&e<=this.totalPages&&this.dispatchEvent(new CustomEvent("page-change",{detail:{page:e},bubbles:!0,composed:!0}))};render(){return this.totalPages>1?Ie`
      <button
        @click=${()=>this._goToPage(this.currentPage-1)}
        ?disabled=${1===this.currentPage}
      >
        <greater-icon size="20" strokeColor="primary"></greater-icon>
      </button>

      <div class="page-numbers">
        ${Array.from({length:this.totalPages},(e,t)=>t+1).map(e=>Ie`
            <button
              class="${this.currentPage===e?"page-number active":"page-number"}"
              @click=${()=>this._goToPage(e)}
            >
              ${e}
            </button>
          `)}
      </div>

      <button
        @click=${()=>this._goToPage(this.currentPage+1)}
        ?disabled=${this.currentPage===this.totalPages}
      >
        <less-icon size="20" strokeColor="primary"></less-icon>
      </button>
    `:Ie``}});customElements.define("edit-icon",class extends nt{static properties={strokeColor:{type:String},size:{type:Number}};constructor(){super(),this.strokeColor="currentColor",this.size=16}render(){return Ie`
      <svg-icon
        pathData="M18.111,2.293,9.384,11.021a.977.977,0,0,0-.241.39L8.052,14.684A1,1,0,0,0,9,16a.987.987,0,0,0,.316-.052l3.273-1.091a.977.977,0,0,0,.39-.241l8.728-8.727a1,1,0,0,0,0-1.414L19.525,2.293A1,1,0,0,0,18.111,2.293ZM11.732,13.035l-1.151.384.384-1.151L16.637,6.6l.767.767Zm7.854-7.853-.768.767-.767-.767.767-.768ZM3,5h8a1,1,0,0,1,0,2H4V20H17V13a1,1,0,0,1,2,0v8a1,1,0,0,1-1,1H3a1,1,0,0,1-1-1V6A1,1,0,0,1,3,5Z"
        viewBox="0 0 22 22"
        .strokeColor=${this.strokeColor}
        .size=${this.size}
      >
      </svg-icon>
    `}});customElements.define("delete-icon",class extends nt{static properties={strokeColor:{type:String},size:{type:Number}};constructor(){super(),this.strokeColor="currentColor",this.size=16}render(){return Ie`
      <svg-icon
        pathData="M36.335,5.668h-8.167V1.5c0-0.828-0.672-1.5-1.5-1.5h-12c-0.828,0-1.5,0.672-1.5,1.5v4.168H5.001c-1.104,0-2,0.896-2,2   s0.896,2,2,2h2.001v29.168c0,1.381,1.119,2.5,2.5,2.5h22.332c1.381,0,2.5-1.119,2.5-2.5V9.668h2.001c1.104,0,2-0.896,2-2   S37.438,5.668,36.335,5.668z M16.168,3h9v2.668h-9V3z"
        viewBox="0 0 44 44"
        .strokeColor=${this.strokeColor}
        .size=${this.size}
        .fillColor=${this.strokeColor}
      >
      </svg-icon>
    `}});window.customElements.define("data-grid",class extends nt{static properties={data:{type:Array},columns:{type:Array},rowActions:{type:Array},selectedIds:{type:Array},pageSize:{type:Number},currentPage:{type:Number}};constructor(){super(),this.data=null,this.columns=null,this.rowActions=null,this.selectedIds=new Set,this.pageSize=10,this.currentPage=1}static styles=Lt;handleRowClick=e=>{const t=new Set(this.selectedIds);t.has(e)?t.delete(e):t.add(e),this.selectedIds=t};isChecked=e=>this.selectedIds.has(e);handleSelectAll=e=>{e.target.checked?this.selectedIds=new Set(this.data.map(e=>e.id)):this.selectedIds=new Set};getPaginatedData(){const e=(this.currentPage-1)*this.pageSize,t=e+this.pageSize;return this.data.slice(e,t)}_handlePageChange=e=>{this.currentPage=e.detail.page,this.selectedIds=new Set,this.requestUpdate("selectedIds")};willUpdate(e){if(e.has("data")||e.has("pageSize")){const e=0===this.data.length||0===this.pageSize?0:Math.ceil(this.data.length/this.pageSize);this.currentPage>e&&e>0?this.currentPage=e:0===e&&1!==this.currentPage&&(this.currentPage=1)}}connectedCallback(){super.connectedCallback(),window.addEventListener("locale-changed",this._onLocaleChange)}disconnectedCallback(){window.removeEventListener("locale-changed",this._onLocaleChange),super.disconnectedCallback()}_onLocaleChange=()=>{this.requestUpdate()};render(){const e=this.getPaginatedData(),t=this.data&&this.data.length>0;return Ie`
      <div class="wrapper">
        <table>
          <thead>
            <tr>
              <th class="selectBoxCell">
                <check-box
                  @change=${e=>this.handleSelectAll(e)}
                  .checked=${this.selectedIds.size===this.data?.length}
                ></check-box>
              </th>
              ${this.columns.map(e=>Ie`<th>${Ot(e.key)}</th>`)}
              ${this.rowActions.length>0&&Ie` <th class="selectBoxCell">${Ot("action")}</th> `}
            </tr>
          </thead>
          <tbody>
            ${e?.map(e=>Ie`
                <tr>
                  <td class="selectBoxCell">
                    <check-box
                      @change=${()=>this.handleRowClick(e?.id)}
                      .checked=${this.selectedIds.size===this.data.length}
                    ></check-box>
                  </td>
                  ${this.columns.map(t=>Ie`<td>${Ot(e[t.key])}</td>`)}
                  <td class="actionButtonsWrapper">
                    ${this.rowActions.map(t=>Ie`
                        <button
                          class="actionButton"
                          @click=${()=>t.method(e)}
                        >
                          ${"edit"===t.icon?Ie`<edit-icon
                                strokeColor="primary"
                                size="20"
                              ></edit-icon>`:"delete"===t.icon?Ie`<delete-icon
                                strokeColor="primary"
                                size="20"
                              ></delete-icon>`:""}
                        </button>
                      `)}
                  </td>
                </tr>
              `)}
          </tbody>
        </table>
      </div>
      ${t?Ie`
            <pagination-element
              .totalItems=${this.data.length}
              .pageSize=${this.pageSize}
              .currentPage=${this.currentPage}
              @page-change=${this._handlePageChange}
            ></pagination-element>
          `:""}
    `}});const Mt=ne`
  :host {
    display: block;
    margin-bottom: 1rem;
  }

  label {
    display: flex;
    flex-direction: column;
    gap: 10px;

    ${ct({size:16,lineHeight:20,weight:rt})};
  }

  input[type='text'],
  input[type='tel'],
  input[type='email'],
  input[type='date'] {
    padding: 10px;

    border: 1px solid var(--color-border);
    border-radius: 4px;
    box-sizing: border-box;
    background-color: var(--color-white);

    ${ct({size:14,lineHeight:18,weight:100})};

    transition: all 0.3s ease;
  }

  input[type='text']:focus,
  input[type='tel']:focus,
  input[type='email']:focus,
  input[type='date']:focus {
    border-color: var(--color-primary);
    outline: none;
  }

  input[type='date']::-webkit-calendar-picker-indicator {
    opacity: 0;
    cursor: pointer;
    position: absolute;
    right: 10px;
    top: 18%;
    width: 20px;
    height: 100%;
  }
  .date-wrapper {
    position: relative;
    display: flex;
    align-items: center;
  }

  .date-wrapper input {
    width: 100%;
    padding-right: 32px;
  }

  .calendar-icon {
    position: absolute;
    right: 12px;
    top: 50%;
    transform: translateY(-50%);
    pointer-events: none;
    color: var(--primary-color);
    user-select: none;
  }
`;customElements.define("calendar-icon",class extends nt{static properties={strokeColor:{type:String},size:{type:Number}};constructor(){super(),this.strokeColor="currentColor",this.size=16}render(){return Ie`
      <svg-icon
        pathData="M7 1.75C7.41421 1.75 7.75 2.08579 7.75 2.5V3.26272C8.41203 3.24999 9.1414 3.24999 9.94358 3.25H14.0564C14.8586 3.24999 15.588 3.24999 16.25 3.26272V2.5C16.25 2.08579 16.5858 1.75 17 1.75C17.4142 1.75 17.75 2.08579 17.75 2.5V3.32709C18.0099 3.34691 18.2561 3.37182 18.489 3.40313C19.6614 3.56076 20.6104 3.89288 21.3588 4.64124C22.1071 5.38961 22.4392 6.33855 22.5969 7.51098C22.6472 7.88567 22.681 8.29459 22.7037 8.74007C22.7337 8.82106 22.75 8.90861 22.75 9C22.75 9.06932 22.7406 9.13644 22.723 9.20016C22.75 10.0021 22.75 10.9128 22.75 11.9436V14.0564C22.75 15.8942 22.75 17.3498 22.5969 18.489C22.4392 19.6614 22.1071 20.6104 21.3588 21.3588C20.6104 22.1071 19.6614 22.4392 18.489 22.5969C17.3498 22.75 15.8942 22.75 14.0564 22.75H9.94359C8.10583 22.75 6.65019 22.75 5.51098 22.5969C4.33856 22.4392 3.38961 22.1071 2.64124 21.3588C1.89288 20.6104 1.56076 19.6614 1.40314 18.489C1.24997 17.3498 1.24998 15.8942 1.25 14.0564V11.9436C1.24999 10.9127 1.24998 10.0021 1.27701 9.20017C1.25941 9.13645 1.25 9.06932 1.25 9C1.25 8.90862 1.26634 8.82105 1.29627 8.74006C1.31895 8.29458 1.35276 7.88566 1.40314 7.51098C1.56076 6.33856 1.89288 5.38961 2.64124 4.64124C3.38961 3.89288 4.33856 3.56076 5.51098 3.40313C5.7439 3.37182 5.99006 3.34691 6.25 3.32709V2.5C6.25 2.08579 6.58579 1.75 7 1.75ZM2.76309 9.75C2.75032 10.4027 2.75 11.146 2.75 12V14C2.75 15.9068 2.75159 17.2615 2.88976 18.2892C3.02502 19.2952 3.27869 19.8749 3.7019 20.2981C4.12511 20.7213 4.70476 20.975 5.71085 21.1102C6.73851 21.2484 8.09318 21.25 10 21.25H14C15.9068 21.25 17.2615 21.2484 18.2892 21.1102C19.2952 20.975 19.8749 20.7213 20.2981 20.2981C20.7213 19.8749 20.975 19.2952 21.1102 18.2892C21.2484 17.2615 21.25 15.9068 21.25 14V12C21.25 11.146 21.2497 10.4027 21.2369 9.75H2.76309ZM21.1683 8.25H2.83168C2.8477 8.06061 2.86685 7.88123 2.88976 7.71085C3.02502 6.70476 3.27869 6.12511 3.7019 5.7019C4.12511 5.27869 4.70476 5.02502 5.71085 4.88976C6.73851 4.75159 8.09318 4.75 10 4.75H14C15.9068 4.75 17.2615 4.75159 18.2892 4.88976C19.2952 5.02502 19.8749 5.27869 20.2981 5.7019C20.7213 6.12511 20.975 6.70476 21.1102 7.71085C21.1331 7.88123 21.1523 8.06061 21.1683 8.25ZM10.787 12.3071C11.0673 12.4232 11.25 12.6967 11.25 13V17C11.25 17.4142 10.9142 17.75 10.5 17.75C10.0858 17.75 9.75 17.4142 9.75 17V14.8107L9.53033 15.0303C9.23744 15.3232 8.76256 15.3232 8.46967 15.0303C8.17678 14.7374 8.17678 14.2626 8.46967 13.9697L9.96967 12.4697C10.1842 12.2552 10.5068 12.191 10.787 12.3071ZM14 13.75C13.8619 13.75 13.75 13.8619 13.75 14V16C13.75 16.1381 13.8619 16.25 14 16.25C14.1381 16.25 14.25 16.1381 14.25 16V14C14.25 13.8619 14.1381 13.75 14 13.75ZM12.25 14C12.25 13.0335 13.0335 12.25 14 12.25C14.9665 12.25 15.75 13.0335 15.75 14V16C15.75 16.9665 14.9665 17.75 14 17.75C13.0335 17.75 12.25 16.9665 12.25 16V14Zz"
        viewBox="0 0 24 24"
        .strokeColor=${this.strokeColor}
        .size=${this.size}
      >
      </svg-icon>
    `}});customElements.define("input-element",class extends nt{static properties={name:{type:String},label:{type:String},type:{type:String},value:{type:String},placeholder:{type:String}};constructor(){super(),this.label="",this.type="text",this.value="",this.placeholder=""}static styles=Mt;handleInput(e){this.value=e.target.value,this.dispatchEvent(new CustomEvent("input-changed",{detail:{name:this.name,value:this.value},bubbles:!0,composed:!0}))}render(){return Ie`
      <label>
        ${this.label}
        ${"date"===this.type?Ie`
              <div class="date-wrapper">
                <input
                  name=${this.name}
                  type="date"
                  .value=${this.value}
                  placeholder=${this.placeholder}
                  @input=${this.handleInput}
                />
                <span class="calendar-icon">
                  <calendar-icon
                    strokeColor="primary"
                    size="20"
                  ></calendar-icon>
                </span>
              </div>
            `:Ie`
              <input
                name=${this.name}
                .type=${this.type}
                .value=${this.value}
                placeholder=${this.placeholder}
                @input=${this.handleInput}
              />
            `}
      </label>
    `}});const zt=ne`
  :host {
    display: block;
    padding: 20px;

    background-color: var(--color-white);
  }

  .form-container {
    display: grid;
    grid-template-columns: 1fr;
    gap: 20px;
    width: 100%;
  }

  .form-item {
  }

  .form-buttons-wrapper {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    flex-wrap: wrap;
    gap: 70px;

    margin-top: 100px;
  }

  @media only screen and (min-width: 600px) {
    :host {
      padding: 30px;
    }
    .form-container {
      grid-template-columns: repeat(2, 1fr);
      gap: 30px;
    }
  }
  @media only screen and (min-width: 900px) {
    :host {
      padding: 40px 100px;
    }
    .form-container {
      grid-template-columns: repeat(3, 1fr);
      row-gap: 70px;
      column-gap: 130px;
    }
  }
`,Tt=ne`
  :host {
    display: block;
    margin-bottom: 1rem;
  }

  label {
    display: flex;
    flex-direction: column;
    gap: 10px;

    ${ct({size:16,lineHeight:20,weight:rt})};
  }
  .select-wrapper {
    position: relative;
    width: 100%;
  }
  .selected {
    padding: 10px;
    border: 1px solid var(--color-border);
    border-radius: 4px;
    background: var(--color-white);
    cursor: pointer;

    transition: all 0.3s ease;
  }
  .focus {
    border: 1px solid var(--color-primary);
  }

  .dropdown {
    position: absolute;
    top: 100%;
    left: 0px;
    width: 99%;
    background: var(--color-white);
    border: 1px solid var(--color-border);
    border-radius: 4px;
    max-height: 150px;
    overflow-y: auto;
    z-index: 1000;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  }

  .option {
    padding: 10px;
    cursor: pointer;

    transition: all 0.3s ease;
  }
  .active {
    color: var(--color-white);
    background: var(--color-primary-40);
  }

  .option:hover {
    color: var(--color-white);
    background: var(--color-primary-30);
  }

  .select-wrapper::after {
    content: '▾';
    position: absolute;
    right: 12px;
    top: 50%;
    transform: translateY(-50%);
    color: var(--color-border);
    font-size: 20px;
    pointer-events: none;
  }
`;class Bt extends nt{static properties={name:{type:String},label:{type:String},options:{type:Array},_selectedValue:{type:String},open:{type:Boolean}};constructor(){super(),this.name="",this.label="",this.options=null,this._selectedValue="",this.open=!1,this._boundHandleOutsideClick=this._handleOutsideClick.bind(this)}static styles=Tt;set value(e){const t=this._selectedValue;e!==t&&(this._selectedValue=e,this.requestUpdate("value",t))}get value(){return this._selectedValue}connectedCallback=()=>{super.connectedCallback(),document.addEventListener("click",this._boundHandleOutsideClick)};disconnectedCallback=()=>{document.removeEventListener("click",this._boundHandleOutsideClick),super.disconnectedCallback()};_handleOutsideClick=e=>{this.open&&!e.composedPath().includes(this)&&(this.open=!1)};toggleDropdown=()=>{this.open=!this.open};selectOption=e=>{this.value=e,this.open=!1,this.dispatchEvent(new CustomEvent("select-changed",{detail:{name:this.name,value:e},bubbles:!0,composed:!0}))};render(){const e=this.options.find(e=>e.value===this.value)?.label||Ot("pleaseSelect");return Ie`
      <label>
        ${this.label}
        <div class="select-wrapper">
          <div
            class=${this.open?"selected focus":"selected"}
            @click=${this.toggleDropdown}
          >
            ${e}
          </div>
          ${this.open?Ie`
                <div class="dropdown" @click=${e=>e.stopPropagation()}>
                  ${this.options.map(e=>Ie`<div
                        class="option ${e.value===this.value?"active":""}"
                        @click=${()=>this.selectOption(e.value)}
                      >
                        ${e.label}
                      </div>`)}
                </div>
              `:""}
        </div>
      </label>
    `}}customElements.define("select-box",Bt);const Dt=ne`
  button {
    padding: 10px 16px;

    width: 300px;
    height: 45px;

    border: none;
    border-radius: 6px;
    cursor: pointer;

    ${ct({size:16,lineHeight:20,weight:rt})};

    opacity: 1;
    transition: all 0.2s ease;
  }

  button:hover:not(:disabled) {
    opacity: 0.8;
  }

  button:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }

  button.primary {
    background-color: var(--color-primary, #007bff);
    color: white;
  }

  button.secondary {
    background-color: transparent;
    color: var(--color-secondary);

    border: 1px solid var(--color-secondary);
  }

  button.modalButton {
    background-color: var(--color-primary, #007bff);
    color: white;
    height: 40px;
    width: 100%;
  }
  button.modalButtonSecondary {
    background-color: transparent;
    color: var(--color-secondary);

    border: 1px solid var(--color-secondary);
    height: 40px;
    width: 100%;
  }
`;class It extends nt{static properties={type:{type:String},variant:{type:String},disabled:{type:Boolean},label:{type:String}};constructor(){super(),this.type="button",this.variant="primary",this.disabled=!1,this.label=""}static styles=Dt;_handleClick=e=>{if(this.disabled)return e.preventDefault(),void e.stopPropagation();if("submit"===this.type){const e=this.closest("form");e&&e.requestSubmit()}else e.preventDefault();this.dispatchEvent(new CustomEvent("button-click",{detail:{originalEvent:e},bubbles:!0,composed:!0}))};render(){return Ie`
      <button
        class=${this.variant}
        ?disabled=${this.disabled}
        type=${this.type}
        @click=${this._handleClick}
      >
        <slot>${this.label}</slot>
      </button>
    `}}customElements.define("button-element",It);class Ht extends nt{static properties={employee:{type:Object},validationError:{type:Array},confirmModal:{type:Boolean},newEmployeeData:{type:Object}};constructor(){super(),this.validationError=[],this.confirmModal=!1,this.newEmployeeData=null}static styles=zt;updated(e){super.updated(e),e.has("employee")&&this.employee&&this._fillFormWithEmployeeData(this.employee)}_fillFormWithEmployeeData=e=>{if(!e)return;const t=this.shadowRoot.querySelector('input-element[name="firstName"]');t&&(t.value=e.firstName||"");const i=this.shadowRoot.querySelector('input-element[name="lastName"]');i&&(i.value=e.lastName||"");const n=this.shadowRoot.querySelector('input-element[name="dateOfEmployment"]');n&&(n.value=e.dateOfEmployment||"");const o=this.shadowRoot.querySelector('input-element[name="dateOfBirth"]');o&&(o.value=e.dateOfBirth||"");const r=this.shadowRoot.querySelector('input-element[name="phone"]');r&&(r.value=e.phone||"");const s=this.shadowRoot.querySelector('input-element[name="email"]');s&&(s.value=e.email||"");const a=this.shadowRoot.querySelector('select-box[name="department"]');a&&(a.value=e.department||"");const l=this.shadowRoot.querySelector('select-box[name="position"]');l&&(l.value=e.position||"")};handleSubmit=e=>{e.preventDefault();const t=this.shadowRoot.querySelector('input-element[name="firstName"]').value,i=this.shadowRoot.querySelector('input-element[name="lastName"]').value,n=this.shadowRoot.querySelector('input-element[name="dateOfEmployment"]').value,o=this.shadowRoot.querySelector('input-element[name="dateOfBirth"]').value,r=this.shadowRoot.querySelector('input-element[name="phone"]').value,s=this.shadowRoot.querySelector('input-element[name="email"]').value,a=this.shadowRoot.querySelector('select-box[name="department"]').value,l=this.shadowRoot.querySelector('select-box[name="position"]').value;let c=[];t||c.push(Ot("firstName")),i||c.push(Ot("lastName")),n||c.push(Ot("dateOfEmployment")),o||c.push(Ot("dateOfBirth")),r||c.push(Ot("phone")),s||c.push(Ot("email")),a||c.push(Ot("department")),l||c.push(Ot("position"));s&&!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(s)&&c.push(Ot("invalidEmail"));var d;(r&&!/^\d{10,11}$/.test(r)&&c.push(Ot("invalidPhone")),c.length)?this.validationError=c:c.length>0?this.validationError=c:(this.newEmployeeData={id:this.employee?.id||Date.now(),firstName:t,lastName:i,dateOfEmployment:n,dateOfBirth:o,phone:r,email:s,department:a,position:l},this.employee?(console.log("object"),this.confirmModal=!0):(Ct.dispatch((d=this.newEmployeeData,{type:mt,payload:d})),G.go("/")))};handleCancel=e=>{e.preventDefault(),G.go("/")};handleConfirmResult=()=>{this.validationError=[]};handleConfirmEdit=e=>{const{confirmed:t}=e.detail;var i;this.confirmModal=!1,this.newEmployeeData&&t&&(Ct.dispatch((i=this.newEmployeeData,{type:ft,payload:i})),G.go("/"))};connectedCallback(){super.connectedCallback(),window.addEventListener("locale-changed",this._onLocaleChange)}disconnectedCallback(){window.removeEventListener("locale-changed",this._onLocaleChange),super.disconnectedCallback()}_onLocaleChange=()=>{this.requestUpdate()};render(){return Ie`
      <form @submit=${this.handleSubmit}>
        <div class="form-container">
          <div class="form-item">
            <input-element
              name="firstName"
              label=${Ot("firstName")}
              .value=${""}
            ></input-element>
          </div>
          <div class="form-item">
            <input-element
              name="lastName"
              label=${Ot("lastName")}
              .value=${""}
            ></input-element>
          </div>
          <div class="form-item">
            <input-element
              name="dateOfEmployment"
              type="date"
              label=${Ot("dateOfEmployment")}
              .value=${""}
            ></input-element>
          </div>

          <div class="form-item">
            <input-element
              name="dateOfBirth"
              type="date"
              label=${Ot("dateOfBirth")}
              .value=${""}
            ></input-element>
          </div>
          <div class="form-item">
            <input-element
              name="phone"
              type="tel"
              label=${Ot("phone")}
              .value=${""}
            ></input-element>
          </div>
          <div class="form-item">
            <input-element
              name="email"
              label=${Ot("email")}
              .value=${""}
            ></input-element>
          </div>
          <div class="form-item">
            <select-box
              name="department"
              label=${Ot("department")}
              .options=${[{value:"softwareDeveloper",label:Ot("softwareDeveloper")},{value:"dataAnalyst",label:Ot("dataAnalyst")},{value:"projectManager",label:Ot("projectManager")},{value:"hrSpecialist",label:Ot("hrSpecialist")},{value:"marketing-specialist",label:Ot("marketingSpecialist")}]}
              .value=${""}
            ></select-box>
          </div>
          <div class="form-item">
            <select-box
              name="position"
              label=${Ot("position")}
              .options=${[{value:"junior",label:Ot("junior")},{value:"medior",label:Ot("medior")},{value:"senior",label:Ot("senior")}]}
              .value=${""}
            ></select-box>
          </div>
        </div>
        <div class="form-buttons-wrapper">
          <button-element
            type="submit"
            variant="primary"
            label=${Ot("save")}
          ></button-element>
          <button-element
            @button-click=${e=>this.handleCancel(e)}
            variant="secondary"
            label=${Ot("cancel")}
          ></button-element>
        </div>
      </form>
      ${this.validationError?Ie`
            <modal-element
              .open=${this.validationError.length>0}
              title=${Ot("fillBlank")}
              message="${this.validationError.map(e=>e+" ")+""+Ot("validationDesc")}"
              confirmText=${Ot("ok")}
              @confirm-result=${this.handleConfirmResult}
            ></modal-element>
          `:""}
      ${this.confirmModal?Ie`
            <modal-element
              .open=${this.confirmModal}
              title=${Ot("areYouSure")}
              message="${Ot("editDesc",this.employee.firstName+" "+this.employee.lastName)}"
              confirmText=${Ot("ok")}
              cancelText=${Ot("cancel")}
              @confirm-result=${this.handleConfirmEdit}
            ></modal-element>
          `:""}
    `}}window.customElements.define("employee-add-edit-form",Ht);window.customElements.define("add-employee",class extends nt{render(){return Ie`<employee-add-edit-form></employee-add-edit-form>`}});customElements.define("edit-employee",class extends nt{static properties={employee:{type:Object}};constructor(){super(),this.employee=null}onAfterEnter(e){const t=new URLSearchParams(e.search).get("id");if(t){const e=Ct.getState(),i=e.employees?.find(e=>e.id==t);i?this.employee=i:(console.warn(`Çalışan bulunamadı: ID ${t}`),G.go("/"))}else this.employee=null}disconnectedCallback(){super.disconnectedCallback()}render(){return Ie`
      <employee-add-edit-form
        .employee=${this.employee}
      ></employee-add-edit-form>
    `}});const Ut=ne`
  :host {
    display: block;
  }

  .modal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.4);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1000;
    opacity: 0;
    visibility: hidden;
    transition: opacity 0.2s ease, visibility 0.2s ease;
  }

  .modal-overlay.open {
    opacity: 1;
    visibility: visible;
  }

  .modal-content {
    background-color: white;
    padding: 20px;
    border-radius: 4px;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
    width: 90%;

    transform: translateY(10px);
    opacity: 0;
    transition: transform 0.2s ease, opacity 0.2s ease;
  }

  .modal-overlay.open .modal-content {
    transform: translateY(0);
    opacity: 1;
  }

  .modal-title {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    gap: 5px;

    ${ct({size:20,lineHeight:22,align:"left",weight:lt})};
    color: var(--color-primary);
  }

  .modal-message {
    margin-bottom: 30px;

    ${ct({size:14,lineHeight:16,align:"left",weight:rt})};
  }

  .modal-actions {
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 10px;
  }

  .crossButton {
    display: flex;
    align-items: center;
    flex-wrap: wrap;

    height: 100%;

    border: none;
    background-color: transparent;

    cursor: pointer;

    transition: opacity 0.3s ease;

    opacity: 1;

    &:hover {
      opacity: 0.8;
    }
  }

  @media only screen and (min-width: 600px) {
    .modal-content {
      width: 70%;
    }
  }
  @media only screen and (min-width: 1200px) {
    .modal-content {
      width: 27%;
    }
  }
`
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */,jt=1;class Vt{constructor(e){}get _$AU(){return this._$AM._$AU}_$AT(e,t,i){this._$Ct=e,this._$AM=t,this._$Ci=i}_$AS(e,t){return this.update(e,t)}update(e,t){return this.render(...t)}}
/**
 * @license
 * Copyright 2018 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const Wt=(e=>(...t)=>({_$litDirective$:e,values:t}))(class extends Vt{constructor(e){if(super(e),e.type!==jt||"class"!==e.name||e.strings?.length>2)throw Error("`classMap()` can only be used in the `class` attribute and must be the only part in the attribute.")}render(e){return" "+Object.keys(e).filter(t=>e[t]).join(" ")+" "}update(e,[t]){if(void 0===this.st){this.st=new Set,void 0!==e.strings&&(this.nt=new Set(e.strings.join(" ").split(/\s/).filter(e=>""!==e)));for(const e in t)t[e]&&!this.nt?.has(e)&&this.st.add(e);return this.render(t)}const i=e.element.classList;for(const e of this.st)e in t||(i.remove(e),this.st.delete(e));for(const e in t){const n=!!t[e];n===this.st.has(e)||this.nt?.has(e)||(n?(i.add(e),this.st.add(e)):(i.remove(e),this.st.delete(e)))}return He}});customElements.define("cross-icon",class extends nt{static properties={strokeColor:{type:String},size:{type:Number}};constructor(){super(),this.strokeColor="currentColor",this.size=16}render(){return Ie`
      <svg-icon
        pathData="M6.96967 16.4697C6.67678 16.7626 6.67678 17.2374 6.96967 17.5303C7.26256 17.8232 7.73744 17.8232 8.03033 17.5303L6.96967 16.4697ZM13.0303 12.5303C13.3232 12.2374 13.3232 11.7626 13.0303 11.4697C12.7374 11.1768 12.2626 11.1768 11.9697 11.4697L13.0303 12.5303ZM11.9697 11.4697C11.6768 11.7626 11.6768 12.2374 11.9697 12.5303C12.2626 12.8232 12.7374 12.8232 13.0303 12.5303L11.9697 11.4697ZM18.0303 7.53033C18.3232 7.23744 18.3232 6.76256 18.0303 6.46967C17.7374 6.17678 17.2626 6.17678 16.9697 6.46967L18.0303 7.53033ZM13.0303 11.4697C12.7374 11.1768 12.2626 11.1768 11.9697 11.4697C11.6768 11.7626 11.6768 12.2374 11.9697 12.5303L13.0303 11.4697ZM16.9697 17.5303C17.2626 17.8232 17.7374 17.8232 18.0303 17.5303C18.3232 17.2374 18.3232 16.7626 18.0303 16.4697L16.9697 17.5303ZM11.9697 12.5303C12.2626 12.8232 12.7374 12.8232 13.0303 12.5303C13.3232 12.2374 13.3232 11.7626 13.0303 11.4697L11.9697 12.5303ZM8.03033 6.46967C7.73744 6.17678 7.26256 6.17678 6.96967 6.46967C6.67678 6.76256 6.67678 7.23744 6.96967 7.53033L8.03033 6.46967ZM8.03033 17.5303L13.0303 12.5303L11.9697 11.4697L6.96967 16.4697L8.03033 17.5303ZM13.0303 12.5303L18.0303 7.53033L16.9697 6.46967L11.9697 11.4697L13.0303 12.5303ZM11.9697 12.5303L16.9697 17.5303L18.0303 16.4697L13.0303 11.4697L11.9697 12.5303ZM13.0303 11.4697L8.03033 6.46967L6.96967 7.53033L11.9697 12.5303L13.0303 11.4697Z"
        viewBox="0 0 20 20"
        .strokeColor=${this.strokeColor}
        .size=${this.size}
        .fillColor=${this.strokeColor}
      >
      </svg-icon>
    `}});class Zt extends nt{static properties={open:{type:Boolean,reflect:!0},title:{type:String},message:{type:String},confirmText:{type:String},cancelText:{type:String}};constructor(){super(),this.open=!1,this.title="",this.message="",this.confirmText="",this.cancelText=""}static styles=Ut;handleAction=e=>{this.open=!1,this.dispatchEvent(new CustomEvent("confirm-result",{detail:{confirmed:e},bubbles:!0,composed:!0}))};render(){const e={"modal-overlay":!0,open:this.open};return Ie`
      <div
        class=${Wt(e)}
        aria-modal="true"
        role="dialog"
        tabindex="-1"
      >
        <div class="modal-content" @click=${e=>e.stopPropagation()}>
          <div class="modal-title">
            ${this.title}
            <button
              @click=${()=>this.handleAction(!1)}
              class="crossButton"
            >
              <cross-icon strokeColor="primary" size="28"></cross-icon>
            </button>
          </div>
          <p class="modal-message">${this.message}</p>
          <div class="modal-actions">
            <button-element
              variant="modalButton"
              @click=${()=>this.handleAction(!0)}
            >
              ${this.confirmText}
            </button-element>
            ${this.cancelText&&Ie`
              <button-element
                variant="modalButtonSecondary"
                @click=${()=>this.handleAction(!1)}
              >
                ${this.cancelText}
              </button-element>
            `}
          </div>
        </div>
      </div>
    `}}customElements.define("modal-element",Zt);const qt=ne`
  .widgetWrapper {
    display: block;

    display: grid;
    grid-template-columns: 1fr;
    column-gap: 150px;
    row-gap: 30px;
    width: 100%;
    margin-bottom: 0;

    background-color: var(--color-bg);

    padding: 0 5%;

    width: 90%;
  }

  @media only screen and (min-width: 1100px) {
    .widgetWrapper {
      grid-template-columns: repeat(2, 1fr);
    }
  }
`,Ft=ne`
  :host {
    display: block;
    margin-bottom: 1rem;
    padding: 20px;
    border: 1px solid var(--color-stroke-default);
    background-color: var(--color-white);
    box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
  }

  .employee-widget {
    display: grid;
    grid-template-columns: 1fr;
    gap: 20px;
    width: 100%;
  }

  @media only screen and (min-width: 600px) {
    .employee-widget {
      grid-template-columns: repeat(2, 1fr);
    }
  }

  .item {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
    flex-wrap: wrap;
    gap: 4px;
  }

  .title {
    ${ct({size:16,lineHeight:20,weight:rt})};
    color: var(--color-stroke-default);
  }
  .value {
    ${ct({size:16,lineHeight:20,weight:rt})};
  }

  .actionButtonsWrapper {
    display: flex;
    flex-direction: row;
    justify-content: left;
    align-items: center;
    gap: 14px;
  }

  .actionButton {
    display: flex;
    align-items: center;
    gap: 8px;

    padding: 8px;

    border: none;
    background-color: var(--color-secondary);

    border-radius: 8px;

    cursor: pointer;

    transition: opacity 0.3s ease;

    opacity: 1;

    &:hover {
      opacity: 0.9;
    }
  }

  .deleteColor {
    background-color: var(--color-primary);
  }

  .buttonText {
    ${ct({size:14,lineHeight:16,weight:st})};

    color: var(--color-white);
  }
`;customElements.define("employee-widget",class extends nt{static properties={columns:{type:Array},employee:{type:Object},rowActions:{type:Array}};constructor(){super(),this.employee=null,this.columns=[],this.rowActions=[]}static styles=Ft;connectedCallback(){super.connectedCallback(),window.addEventListener("locale-changed",this._onLocaleChange)}disconnectedCallback(){window.removeEventListener("locale-changed",this._onLocaleChange),super.disconnectedCallback()}_onLocaleChange=()=>{this.requestUpdate()};render(){return Ie`
      <div class="employee-widget">
        ${this.columns.map(e=>Ie`<div class="item">
              <span class="title">${Ot(e.key)}</span>
              <div class="value">${Ot(this.employee[e.key])||"-"}</div>
            </div> `)}
        <div class="actionButtonsWrapper">
          ${this.rowActions.map(e=>Ie`
              <button
                class=${"delete"===e.icon?"actionButton deleteColor":"actionButton"}
                @click=${()=>e.method(this.employee)}
              >
                ${"edit"===e.icon?Ie` <edit-icon strokeColor="white" size="20"></edit-icon>
                      <div class="buttonText">${Ot("edit")}</div>`:"delete"===e.icon?Ie`<delete-icon
                        strokeColor="white"
                        size="20"
                      ></delete-icon>
                      <div class="buttonText">${Ot("delete")}</div>`:""}
              </button>
            `)}
        </div>
      </div>
    `}});customElements.define("employee-widgets",class extends nt{static properties={columns:{type:Array},employees:{type:Array},rowActions:{type:Array},pageSize:{type:Number},currentPage:{type:Number}};constructor(){super(),this.employees=null,this.columns=null,this.rowActions=null,this.pageSize=4,this.currentPage=1}static styles=qt;willUpdate(e){if(e.has("employees")||e.has("pageSize")){const e=0===this.employees.length||0===this.pageSize?0:Math.ceil(this.employees.length/this.pageSize);this.currentPage>e&&e>0?this.currentPage=e:0===e&&1!==this.currentPage&&(this.currentPage=1)}}getPaginatedData=()=>{const e=(this.currentPage-1)*this.pageSize,t=e+this.pageSize;return this.employees.slice(e,t)};_handlePageChange=e=>{this.currentPage=e.detail.page,this.selectedIds=new Set,this.requestUpdate("selectedIds")};render(){const e=this.getPaginatedData(),t=this.employees&&this.employees?.length>0;return Ie`
      <div class="widgetWrapper">
        ${e.map(e=>Ie`<employee-widget
              .columns=${this.columns}
              .employee=${e}
              .rowActions=${this.rowActions}
            ></employee-widget>`)}
      </div>
      ${t?Ie`
            <pagination-element
              .totalItems=${this.employees.length}
              .pageSize=${this.pageSize}
              .currentPage=${this.currentPage}
              @page-change=${this._handlePageChange}
            ></pagination-element>
          `:""}
    `}});class Yt extends nt{static properties={employees:{type:Array},isConfirmModalOpen:{type:Boolean},employeeToDelete:{type:Object},listType:{type:String}};constructor(){super(),this.employees=[],this._unsubscribe=null,this.isConfirmModalOpen=!1,this.employeeToDelete=null,this.listType="list",this.columns=[{key:"firstName",label:Ot("firstName")},{key:"lastName",label:Ot("lastName")},{key:"dateOfEmployment",label:Ot("dateOfEmployment")},{key:"dateOfBirth",label:Ot("dateOfBirth")},{key:"email",label:Ot("email")},{key:"phone",label:Ot("phone")},{key:"department",label:Ot("department"),translate:!0},{key:"position",label:Ot("position"),translate:!0}]}connectedCallback(){super.connectedCallback(),this._unsubscribe=Ct.subscribe(()=>this._onStateChange()),this._onStateChange()}_onStateChange(){const e=Ct.getState().employees;const t=Ct.getState().common.listType;this.listType=t,JSON.stringify(e)!==JSON.stringify(this.employees)&&(this.employees=e)}disconnectedCallback(){super.disconnectedCallback(),this._unsubscribe&&(this._unsubscribe(),this._unsubscribe=null)}openConfirmDeleteModal(e){this.employeeToDelete=e,this.isConfirmModalOpen=!0}handleConfirmResult(e){const{confirmed:t}=e.detail;var i;t&&this.employeeToDelete?(Ct.dispatch((i=this.employeeToDelete.id,{type:gt,payload:i})),console.log(`${this.employeeToDelete.firstName} silindi.`)):console.log("Silme işlemi iptal edildi."),this.isConfirmModalOpen=!1,this.employeeToDelete=null}get rowActions(){return[{icon:"edit",method:e=>{G.go(`/edit-employee?id=${e.id}`)}},{icon:"delete",method:e=>{this.openConfirmDeleteModal(e)}}]}render(){return"list"===this.listType?Ie`
          <data-grid
            .columns=${this.columns}
            .data=${this.employees}
            .rowActions=${this.rowActions}
          >
          </data-grid>
          ${this.employeeToDelete?Ie`
                <modal-element
                  .open=${this.isConfirmModalOpen}
                  title=${Ot("areYouSure")}
                  message="${Ot("deleteDesc",this.employeeToDelete.firstName+" "+this.employeeToDelete.lastName)}  "
                  confirmText=${Ot("proceed")}
                  cancelText=${Ot("cancel")}
                  @confirm-result=${this.handleConfirmResult}
                ></modal-element>
              `:""}
        `:Ie`<employee-widgets
            .columns=${this.columns}
            .rowActions=${this.rowActions}
            .employees=${this.employees}
          ></employee-widgets>
          ${this.employeeToDelete?Ie`
                <modal-element
                  .open=${this.isConfirmModalOpen}
                  title=${Ot("areYouSure")}
                  message="${Ot("deleteDesc",this.employeeToDelete.firstName+" "+this.employeeToDelete.lastName)}  "
                  confirmText=${Ot("proceed")}
                  cancelText=${Ot("cancel")}
                  @confirm-result=${this.handleConfirmResult}
                ></modal-element>
              `:""}`}}window.customElements.define("list-employees",Yt);const Kt=[{path:"",component:"dashboard-layout",children:[{path:"/",component:"list-employees",title:"Employees"},{path:"/add-employee",component:"add-employee",title:"Add Employee"},{path:"/edit-employee",component:"edit-employee",title:"Edit Employee"}]}];new G(document.getElementById("outlet")).setRoutes(Kt);
//# sourceMappingURL=index.js.map
