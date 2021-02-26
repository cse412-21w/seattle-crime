import mcpp from '../static/Micro_Community_Policing_Plans.geojson'  
"use strict";     // the code should be executed in "strict mode".
                  // With strict mode, you can not, for example, use undeclared variables

d3.json(mcpp).then(function(geojson) {

var projection = d3.geoMercator().fitSize([800, 1600], geojson);
var path = d3.geoPath().projection(projection);
var g = d3.select('#content g.map')
g.selectAll('path')
  .data(geojson.features)
  .enter()
  .append('path')
  .attr('d', path)
  .style("fill", "white")
  .style("stroke-width", "1")
  .style("stroke", "black");

});




