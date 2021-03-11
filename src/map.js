import mcpp from '../static/Micro_Community_Policing_Plans.geojson'  
import points from '../static/SPD_offense_coord_w_year_0.csv'
"use strict";     // the code should be executed in "strict mode".
                  // With strict mode, you can not, for example, use undeclared variables


var width = 500;
var height = 800;
var selected_mcpp = 'Seattle';
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
		})	
		.on('click', function(d) {
			selected_mcpp = d.properties.NEIGHBORHOOD
			document.getElementById("name").innerHTML = selected_mcpp;
		});
});




