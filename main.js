$(function() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function(position) {
      let lat = position.coords.latitude;
      let lon = position.coords.longitude;
      let requestURL =
        "https://fcc-weather-api.glitch.me/api/current?lat=" +
        lat.toFixed(2) +
        "&lon=" +
        lon.toFixed(2);

      $.getJSON(requestURL, function(data) {
        $("#weather").html(data.weather[0].description);
        $("#city").html(data.name);
        $("#weatherIcon").html(
          '<img src="' +
            data.weather[0].icon +
            '" alt="' +
            data.weather[0].main +
            '" />'
        );
        $("#temp").html(data.main.temp.toFixed(0));
        // button functions to switch between °C and °F
        $(function() {
          $("#switchTemp").click(function() {
            $("#switchTemp").toggleClass("active");
            $("#switchPart").text(function(i, text) {
              return text === "°C and there's "
                ? "°F and there's "
                : "°C and there's ";
            });
            $("#switchTemp").val(function(i, text) {
              return text === "Change to Fahrenheit"
                ? "Change to Celsius"
                : "Change to Fahrenheit";
            });
            if ($("#switchTemp").hasClass("active")) {
              $("#temp").html(data.main.temp.toFixed(0) * 9 / 5 + 32);
            } else {
              $("#temp").html(data.main.temp.toFixed(0));
            }
          });
        });
      });
    });
  } else {
    console.log("Browser doesn't support geolocation!");
  }
});
