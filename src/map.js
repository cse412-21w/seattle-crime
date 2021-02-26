import mcpp from '../static/Micro_Community_Policing_Plans.geojson'  
"use strict";     // the code should be executed in "strict mode".
                  // With strict mode, you can not, for example, use undeclared variables

d3.json(mcpp).then(function(data) {
var projection = d3.geoEquirectangular()
  .scale(200)
  .translate([200, 150]);

var geoGenerator = d3.geoPath()
  .projection(projection);

function update(data) {
  var u = d3.select('#content g.map')
    .selectAll('path')
    .data(data.features);

  u.enter()
    .append('path')
    .attr('d', geoGenerator);
}

update(data);
console.log(data.features);
});



