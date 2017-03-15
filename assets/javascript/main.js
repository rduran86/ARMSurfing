
 
// Initialize Firebase
var config = {
  apiKey: "AIzaSyC9wP1vydAT-A-xzYxjEKjAPnnjyq0znsI",
  authDomain: "armsurfing-9502f.firebaseapp.com",
  databaseURL: "https://armsurfing-9502f.firebaseio.com",
  storageBucket: "armsurfing-9502f.appspot.com",
  messagingSenderId: "231633652696"
};
firebase.initializeApp(config);

var surfStorage = firebase.database();
//click event that will store our user's input into firebase
$("#searchButton").on("click", function(){

  alert("this works");
	//grabbing user input 
	var userInput = $("#user-search").val().trim();
	//object to store user input into firebase
	var surfObj = {

		location: userInput
	};
	
	//pushing our user input object into firebase
	surfStorage.ref().push(surfObj);
	//preventing the on submit default setting
	return false;
});

function showPreviousConditions() {
  //getting the data attribute from our storedSearchBtn
  var locationName = $(this).attr("data-location");
  //passing our initMap function the name of the location that is stored in firebase
  initMap(locationName);
}

surfStorage.ref().on("child_added", function(newChild){
  //checking our data we're receiving from firebase
  console.log(newChild);
  //creating a new button for user to check recently searched spot conditions
  var storedSearchBtn = $("<button type='submit' value='View Report' class='btn btn-warning' id='firebaseBtn'>");
	//getting our user input from firebase
	var newLocation = newChild.val().location;
  //checking our new location
	console.log(newLocation);
  //adding a data attribute to the button of newLocation
  storedSearchBtn.attr("data-location", newLocation);
  //appending user search and button to our firebaseTable
  $("#firebaseTable").append("<tr><td>" + newLocation + "</td><td>" + recentlySearchedBtn + "</td></tr>");
  //creating an on click event which uses our showPreviousConditions function to display previous conditions
  storedSearchBtn.on("click", showPreviousConditions);

});

var apiKey = "094f52c21f8d4c3dbff24712170903";

        var url = "https://api.worldweatheronline.com/premium/v1/weather.ashx?";
            url += "&q=" + weatherLatlng;
            url += "&format=json";
            url += "&key="+ apiKey;
            url += "&includelocation=yes";
            url += "&fx=" + "yes";
        // console.log(url)
        // url += "&callback=searchCallback";
        console.log(weatherLatlng);

        $.ajax({
          // dataType: "jsonp",
          url: url,
          method: 'GET',
          // success: searchCallback
        }).done(function(dataSnap) {

            var serverReq = dataSnap.data;
            console.log(serverReq)

            for (var i = 1; i < 7; i++) {

              var weather = serverReq.current_condition[i].temp_F;
              console.log(weather);
              var weatherImg = serverReq.current_condition[i].weatherIconUrl[i].value;
            }

            $("#mainWeatherInfoHere").html(weatherImg);
            $("#timeInfoHere").append("<tr><td>" + weather + "</td></tr>");
            // var weeklyForecast = weather.date // write something to show weekly forcast

            // var swell = weather.hourly[0].swellHeight_ft;
            // console.log(swell);

            // var iconURL = weather.hourly["0"].weatherIconUrl["0"].value;
            // // .hourly["0"].weatherIconUrl["0"].value
            // iconURL = iconURL.toString();
            // console.log(iconURL)

            // $("#weatherIcon").attr("src", iconURL);

            // // $("#mainWeatherInfoHere").html(weatherIconUrl + " ");

            // var maxTempF = weather.maxtempF;


// //              YOUTUBE API INITIALIZATION
//                 YOUTUBE  SEARCH FOR A KEYWORD
// //         KEY:   AIzaSyC6LO4qKI_80tPEvtewuNRj5KvYZyJyhIw
// //              #userSearch is user input variable

// After the API loads, call a function to enable the search box.
function handleAPILoaded() {
	$('#searchButton').attr('disabled', false);
}

// Search for a specified string.
function search() {
	var q = $('#user-search').val();
	console.log("q: "+q);
	var request = gapi.client.youtube.search.list({
		q: q,
		part: 'snippet'
	});

	request.execute(function(response) {
		var str = JSON.stringify(response.result);
		console.log("received from YouTube: "+str);
		$('#weatherContainer').html('<pre>' + str + '</pre>');
	});
};

// event listener to search YoutTube when user clicks search button
$("#searchButton").on("click", function(){

	// on click, the surfboard logo calls the SVG Animator library to animate it
	new Vivus('animatedLogo', {duration: 100});

	var query = $('#user-search').val();
	var key= "AIzaSyC6LO4qKI_80tPEvtewuNRj5KvYZyJyhIw";


	var queryURL="https://www.googleapis.com/youtube/v3/search?part=snippet&q="+query+" beach"+"&part=player&safeSearch=strict&videoEmbeddable=true&type=video&key="+key;
	
	
	
	$.ajax({
		url: queryURL,
		method: "GET",

	}).done(function(response) {

		console.log(response);
		var imageUrl= response.items[0].snippet.thumbnails.high.url;
		var videoID= response.items[0].id.videoId;
		console.log(imageUrl);
		$("#weatherContainer").css('background-image', "url("+imageUrl+")");
		$("#myVideo").attr("src","https://youtube.com/embed/"+videoID+"?autoplay=1&controls=0&showinfo=0&autohide=1");
	});
});


//                          end YOUTUBE API


   // ************************************** Google api **************************************************//

   var userSearch;
   var map, geocoder, infowindow, markers = [],
   marker;
   var request = {};
   var userLatLng;
   //function to initalize the map this is initially called from the html via parameter callback=initMap
   function initMap(locationName) {

       // Clear out the old markers.
       // markers.forEach(function(marker) {
       //     marker.setMap(null);
       // });
       // markers = [];


       if ($("#user-search").val() == "") {
       	userSearch = "San Diego";
       } else {
       	userSearch = $("#user-search").val();
       }

       map = new google.maps.Map(document.getElementById('mapBox'), { zoom: 12 });
       console.log(map);

       geocoder = new google.maps.Geocoder;
       geocoder.geocode({ 'address': userSearch }, function(results, status) {
       	console.log(status);
       	if (status === 'OK') {
       		map.setCenter(results[0].geometry.location);
               // new google.maps.Marker({
               //     map: map,
               //     position: results[0].geometry.location
               // });
           } else {
           	window.alert('Geocode was not successful for the following reason: ' +
           		status);
           }
       });

       //variable to store the latitude and longitude
       userLatLng;

       //create markers only when there is a user search
       if ($("#user-search").val() !== "") {
           //function to create the markers on the map 
           geocoder.geocode({
           	'address': userSearch
           }, function(results, status) { //this anonymus function is called back when the results and status are received from geocode function 
           	if (status == google.maps.GeocoderStatus.OK) {
                   userLatLng = results[0].geometry.location; // Assign the latitude and longtude object from the first result to userLatLng variable
               }

               //Request takes the userLatLng variable and hard coded radius, type
               request = {
               	location: userLatLng,
               	radius: '2000',
               	keyword: 'surf'
               };
               infowindow = new google.maps.InfoWindow(); // create a new info window for the marker
               service = new google.maps.places.PlacesService(map); // create a new service object which will be used to call the nearbySearch method
               service.nearbySearch(request, callback); // use the nearbySearch method to find the places based on the userSearch and to create the markers with the callback function

           });

       }




   };

   //function used to dinamically create the markers
   function callback(results, status) {
   	if (status === google.maps.places.PlacesServiceStatus.OK) {
   		for (var i = 0; i < results.length; i++) {
               createMarker(results[i]); // call the createMarker function 
               markers.push(createMarker(results[i])); //push the marker into the global variable markers array
               console.log(markers);
               console.log(marker);
           }
       }
   }
   //function to create marker 
   function createMarker(place) {
   	var placeLoc = place.geometry.location;
   	marker = new google.maps.Marker({
   		map: map,
   		position: place.geometry.location
   	});

       //Add an event lilstener to the markers so when they are clicked the info window is displayed
       google.maps.event.addListener(marker, 'click', function() {
       	infowindow.setContent('<div><strong>' + place.name + '</strong></div>');
       	infowindow.open(map, this);
       });

       return marker;
    }


   //Attach an event listener to search button and call the initMap function to update map location 
   //$("#searchButton").on('click', initMap);















