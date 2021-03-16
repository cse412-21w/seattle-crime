// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"gkjK":[function(require,module,exports) {
module.exports = "https://cse412-21w.github.io/project-demo/Micro_Community_Policing_Plans.0c806b0a.geojson";
},{}],"amLZ":[function(require,module,exports) {
module.exports = "https://cse412-21w.github.io/project-demo/SPD_offense_coord_w_year_0.02792005.csv";
},{}],"quTw":[function(require,module,exports) {
"use strict";

var _Micro_Community_Policing_Plans = _interopRequireDefault(require("../static/Micro_Community_Policing_Plans.geojson"));

var _SPD_offense_coord_w_year_ = _interopRequireDefault(require("../static/SPD_offense_coord_w_year_0.csv"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

"use strict"; // the code should be executed in "strict mode".
// With strict mode, you can not, for example, use undeclared variables


var width = 500;
var height = 800;
var selected_mcpp = 'Seattle';
var svg = d3.select('#content g.map').append('svg').attr('width', width).attr('height', height);
var tooltip = d3.select('#content g.map').append('div').attr('class', 'hidden tooltip');
d3.json(_Micro_Community_Policing_Plans.default).then(function (seattle) {
  var projection = d3.geoMercator().fitSize([500, 800], seattle);
  var path = d3.geoPath().projection(projection);
  var neighborhoods = svg.selectAll('.neighborhood').data(seattle.features).enter();
  neighborhoods.append('path').attr('class', function (d) {
    return 'neighborhood ' + d.properties.OBJECTID;
  }).attr('d', path).on('mousemove', function (d) {
    var mouse = d3.mouse(svg.node()).map(function (d) {
      return parseInt(d);
    });
    tooltip.classed('hidden', false).attr('style', 'left:' + (mouse[0] + 15) + 'px; top:' + (mouse[1] - 35) + 'px').html(d.properties.NEIGHBORHOOD);
  }).on('mouseout', function () {
    tooltip.classed('hidden', true);
  }).on('mouseover', function (d) {
    selected_mcpp = d.properties.NEIGHBORHOOD;
    document.getElementById("name").innerHTML = selected_mcpp;
  });
});
},{"../static/Micro_Community_Policing_Plans.geojson":"gkjK","../static/SPD_offense_coord_w_year_0.csv":"amLZ"}]},{},["quTw"], null)
//# sourceMappingURL=https://cse412-21w.github.io/project-demo/map.9edebbe1.js.map