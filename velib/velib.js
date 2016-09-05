var slidervalue = 0;
var refreshintervalhandler = -1;
var step=3;

/** Fonctionnement du slider */
function startslider() {
	if (refreshintervalhandler != -1) return;
	refreshintervalhandler = window.setInterval(function() {
		slidervalue += step;
		console.log(slidervalue);
		if (slidervalue >= nb_snapshots - 1)
			clearInterval(refreshintervalhandler);
		$("#slider").slider("value", slidervalue);
	}, 150);
}

function stopslider() {
	clearInterval(refreshintervalhandler);
	refreshintervalhandler = -1;
}

function resetslider() {
	slidervalue = 0;
	$("#slider").slider("value", slidervalue);
	clearInterval(refreshintervalhandler);
	refreshintervalhandler = -1;
}

/** Renvoie les données pour alimenter le heatmap. */
function getPoints(snapshot) {
	var res = [];
	for (var i = 0; i < nb_stations; i++) { 
		res.push(
	          {
	              location:new google.maps.LatLng(lat[i], lng[i]), 
	              weight: bike_available[snapshot][i]
	          }
        );
    }
	return res;
}

function changespeed(val) {
	step = parseInt(val);
}