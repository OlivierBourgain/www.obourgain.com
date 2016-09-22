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

// Chart
var myLineChart;

function init() {
	initdata();
	
	// Changement de semaine
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
				$("#date").text(snapshot_timestr[0]);
				$(".sliderbtn").prop("disabled",false);
				myLineChart.destroy();
				createChart();
			},
			cache : true,
		});

	});

	// Initialisation du slider
	$("#slider").slider({
		max : nb_snapshots - 1,
		slide : sliderchanged,
		change : sliderchanged
	});
	$("#btnstart").click(function() {startslider()});
	$("#btnstop ").click(function() {stopslider()});
	$("#btnreset").click(function() {resetslider()});
	
	// Initialisation map
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


	$("#available").text(snapshot_total_avail[0]);
	$("#date").text(snapshot_timestr[0]);

	$('input:radio[name=speed]').change(function() {
		var speedvalue = $('input:radio[name=speed]:checked').val();
		changespeed(speedvalue);
	});
	
	// Chart
	createChart();
}


/** Creation du graphe */
function createChart() {
	var ctx = $("#chart");
	myLineChart = new Chart(ctx, {
	    type: 'line',
	    data: {
	        labels: snapshot_time,
	        datasets: [{
	            label: 'Utilisation',
	            data: snapshot_total_used,
	            borderColor: "rgba(75,192,192,1)",
	            pointRadius:0,
	            pointHoverBorderWidth:5,
	            pointHitRadius:8,
	            fill:false,
	        }]
	    },
	    options: {
	        tooltips: {
	        	titleFontSize:16,
	        	bodyFontSize:16,
	        	callbacks: {
	        		 title: function(tooltipItem, data) {
	        	        	return moment(tooltipItem[0].xLabel).locale('fr').format('dddd DD/MM/YYYY HH:mm');	        	        
	        	     },
	        	}
	        },
	        legend: {
	            display: false
	        },
	        scales: {
	            xAxes: [{
	                type: 'time',
	                time: {
	                	displayFormats: {
	                        hour: 'DD/MM HH:mm',
	                        day:  'DD/MM HH:mm'
	                    }
	                }
	            }],
	        }
	    }
	});
}

/** Fonctionnement du slider */
function sliderchanged() {
	slidervalue = $("#slider").slider("value");
	updatetick(slidervalue);
}
function updatetick(i) {
	$("#date").html(snapshot_timestr[i]);
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