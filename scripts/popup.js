$(document).ready(function(){
	
	var geoURL = "https://ipv6.ip.nf/me.json";
	//get Geo information of the user
	if(navigator.onLine){
		$.getJSON(geoURL).done(function(geoData){
			var lat =geoData.ip.latitude;
			var lon =geoData.ip.longitude;

			//Get the user geo weather information
			var key = "ADD YOUR API KEY";
			var weatherReportURL = "http://api.openweathermap.org/data/2.5/weather?lat="+lat+"&lon="+lon+"&APPID="+key+"&units=metric";
			var weatherReport = {};
			$.getJSON(weatherReportURL).done(function(report){ 
				var reportData = getReportHTML(geoData,report);
				$("#weather-report").html(reportData);
			});

			function getReportHTML(geoData,reportData){
				var report="";
				report+="<table width='180'>";
				var placeData = [];
				if(geoData.ip.city.length>0){
					placeData.push(geoData.ip.city);
				}
				if(geoData.ip.post_code.length>0){
					placeData.push(geoData.ip.post_code);
				}
				if(geoData.ip.country.length>0){
					placeData.push(geoData.ip.country);
				}
				var placeName = placeData.join(",");
				report+="<tr><td colspan='2' class='place'>"+placeName+"</td></tr>";
				report+="<tr><th>Description</th><td>"+reportData.weather[0].description+"</td></tr>";
				
				report+= (typeof(reportData.main.temp) != 'undefined') ? "<tr><th>Temprature</th><td>"+reportData.main.temp+"&#8451;</td></tr>" : "";
				report+= (typeof(reportData.main.pressure) != 'undefined') ? "<tr><th>Pressure</th><td>"+reportData.main.pressure+" hpa</td></tr>" : "";
				report+= (typeof(reportData.main.humidity) != 'undefined') ? "<tr><th>Humidity</th><td>"+reportData.main.humidity+" %</td></tr>" : "";
				report+= (typeof(reportData.main.temp_min) != 'undefined') ? "<tr><th>Min Temprature</th><td>"+reportData.main.temp_min+"&#8451;</td></tr>" : "";
				report+= (typeof(reportData.main.temp_max) != 'undefined') ? "<tr><th>Max Temprature</th><td>"+reportData.main.temp_max+"&#8451;</td></tr>" : "";
				report+= (typeof(reportData.main.sea_level) != 'undefined') ? "<tr><th>Sea Level</th><td>"+reportData.main.sea_level+"</td></tr>" : "";
				report+= (typeof(reportData.main.grnd_level) != 'undefined') ? "<tr><th>Ground Level</th><td>"+reportData.main.grnd_level+"</td></tr>": "";
				report+= (typeof(reportData.wind.speed) != 'undefined') ? "<tr><th>Wind Speed</th><td>"+reportData.wind.speed+"</td></tr>" : "";
				report+= (typeof(reportData.wind.deg) != 'undefined') ? "<tr><th>Wind Deg</th><td>"+reportData.wind.deg+"</td></tr>" : "";
					report+="</table>";
				return report;
			}
		});
	}else{
		$("#weather-report").html("<div class='internet_error'><img src='images/no-internet.png' style='margin-left: 30px;'><br>Please Connect Internet</div>");
	}
	

})