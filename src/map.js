import mcpp from '../static/Micro_Community_Policing_Plans.geojson'  
import points from '../static/SPD_offense_coord_w_year_0.csv'
"use strict";     // the code should be executed in "strict mode".
                  // With strict mode, you can not, for example, use undeclared variables


d3.json(mcpp).then(function(geojson) {
var projection = d3.geoMercator().fitSize([500, 800], geojson);
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
 
 g.selectAll('circle')
	.data([[-122.312077769,47.69761617]]).enter()
	.append("circle")
	.attr("cx", function (d) { projection(d); return projection(d)[0]; })
	.attr("cy", function (d) { return projection(d)[1]; })
	.attr("r", "5px")
	.attr("fill", "red")

});




