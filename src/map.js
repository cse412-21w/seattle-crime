import mcpp from '../static/Micro_Community_Policing_Plans.geojson'  
"use strict";     // the code should be executed in "strict mode".
                  // With strict mode, you can not, for example, use undeclared variables

d3.json(mcpp).then(function(data) {
	console.log(data.features);
});



