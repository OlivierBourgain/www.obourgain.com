var slidervalue = 0;
var refreshintervalhandler = -1;
var step = 3;
var heatmapdata = null;

// Data from data-yyyyMMdd.js
var nb_stations;
var nb_snapshots;
var nb_stands;
var snapshot_time;
var snapshot_total_avail;
var bike_available;
var lat;
var lng;

function init() {
	initdata();
	$("#weekselect").change(function() {
		slidervalue = 0;
		resetslider();
		$(".sliderbtn").prop("disabled",true);
		$.ajax({
			url : "data/data-" + $("#weekselect").val() + ".js",
			dataType : "script",
			success : function() {
				initdata();
				heatmapdata = new google.maps.MVCArray(getPoints(0));
				$("#available").text(snapshot_total_avail[0]);
				$("#date").text(snapshot_time[0]);
				$(".sliderbtn").prop("disabled",false);
			},
			cache : true,
		});

	});

	$("#slider").slider({
		max : nb_snapshots - 1,
		slide : sliderchanged,
		change : sliderchanged
	});

	var mapDiv = document.getElementById('map');
	var map = new google.maps.Map(mapDiv, {
		center : {
			lat : 48.857593,
			lng : 2.34
		},
		zoom : 13,
		draggable : false,
		scrollwheel : false,
	});

	heatmapdata = new google.maps.MVCArray(getPoints(0));
	heatmap = new google.maps.visualization.HeatmapLayer({
		data : heatmapdata,
		map : map,
		radius : 35
	});

	$("#btnstart").click(function() {startslider()});
	$("#btnstop ").click(function() {stopslider()});
	$("#btnreset").click(function() {resetslider()});
	$("#available").text(snapshot_total_avail[0]);
	$("#date").text(snapshot_time[0]);

	$('input:radio[name=speed]').change(function() {
		var speedvalue = $('input:radio[name=speed]:checked').val();
		changespeed(speedvalue);
	});
}

/** Fonctionnement du slider */
function sliderchanged() {
	slidervalue = $("#slider").slider("value");
	updatetick(slidervalue);
}
function updatetick(i) {
	$("#date").html(snapshot_time[i]);
	$("#available").html(snapshot_total_avail[i]);
	heatmap.setData(new google.maps.MVCArray(getPoints(i)));
}
function startslider() {
	if (refreshintervalhandler != -1)
		return;
	refreshintervalhandler = window.setInterval(function() {
		slidervalue += step;
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
function getPoints(tick) {
	var res = [];
	for (var i = 0; i < nb_stations; i++) {
		res.push({
			location : new google.maps.LatLng(lat[i], lng[i]),
			weight : bike_available[tick][i]
		});
	}
	return res;
}
function changespeed(val) {
	step = parseInt(val);
}