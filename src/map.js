import mcpp from '../static/Micro_Community_Policing_Plans.geojson'  
import points from '../static/SPD_offense_coord_w_year_0.csv'
"use strict";     // the code should be executed in "strict mode".
                  // With strict mode, you can not, for example, use undeclared variables


/* d3.json(mcpp).then(function(geojson) {
var projection = d3.geoMercator().fitSize([500, 800], geojson);
var path = d3.geoPath().projection(projection);
var g = d3.select('#content g.map')
var neighborhoods = svg.selectAll('.')
                .data(can.features).enter();

g.selectAll('path')
  .data(geojson.features)
  .enter()
  .append('path')
  .attr('d', path)
  .style("fill", "teal")
  .style("stroke-width", "1")
  .style("stroke", "white");
 
 g.selectAll('circle')
	.data([[-122.312077769,47.69761617], [-122.32290903200001,47.54294056]]).enter()
	.append("circle")
	.attr("cx", function (d) { projection(d); return projection(d)[0]; })
	.attr("cy", function (d) { return projection(d)[1]; })
	.attr("r", "5px")
	.attr("fill", "red")

}); */

var width = 500;
var height = 800;
var svg = d3.select('#content g.map').append('svg')
.attr('width', width)
.attr('height', height);
var tooltip = d3.select('#content g.map').append('div')
.attr('class', 'hidden tooltip');
d3.json(mcpp).then(function(seattle) {
	var projection = d3.geoMercator().fitSize([500, 800], seattle);
	var path = d3.geoPath()
		.projection(projection);
	var neighborhoods = svg.selectAll('.neighborhood')
		.data(seattle.features).enter();
	neighborhoods.append('path')
		.attr('class', function(d) {
			return 'neighborhood ' + d.properties.OBJECTID;
		})
		.attr('d', path)
		.on('mousemove', function(d) {
			var mouse = d3.mouse(svg.node()).map(function(d) {
				return parseInt(d);
			});
			tooltip.classed('hidden', false)
				.attr('style', 'left:' + (mouse[0] + 15) +
						'px; top:' + (mouse[1] - 35) + 'px')
				.html(d.properties.NEIGHBORHOOD);
		})
		.on('mouseout', function() {
			tooltip.classed('hidden', true);
		});
});


