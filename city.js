


function fetchCityName(lat, lon) {
  const url = `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${lat}&lon=${lon}`;
  fetch(url)
    .then(response => response.json())
    .then(data => {
      let city = 'Unknown';
      if (data.address) {
        city = data.address.city || data.address.town || data.address.village || 'Unknown';
        getweatherdata(city);
      } 
      document.getElementById('city').textContent = city;
    })
    .catch(() => {
      document.getElementById('city').textContent = 'Error fetching city';
    });
}

function success(position) {
  const latitude = position.coords.latitude.toFixed(6);
  const longitude = position.coords.longitude.toFixed(6);


  fetchCityName(latitude, longitude);
}

function error(err) {
  updateStatus(`Error: ${err.message}`);
  document.getElementById('latitude').textContent = 'N/A';
  document.getElementById('longitude').textContent = 'N/A';
  document.getElementById('city').textContent = 'N/A';
}

if ('geolocation' in navigator) {
  navigator.geolocation.watchPosition(success, error, {
    enableHighAccuracy: true,
    maximumAge: 0,
    timeout: 1000
  });
} else {
  updateStatus('Geolocation is not supported by your browser.');
}
let address;
function getweatherdata(cityname) {
 address=cityname;
  console.log(address);
}
export { address };
