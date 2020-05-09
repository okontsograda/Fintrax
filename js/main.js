var milStatus = document.getElementById('milStatus');

document.getElementById('initiateMileage').addEventListener('click', function() {
    if ( this.innerText == 'START') {
        navigator.geolocation.getCurrentPosition(onSuccess, onError);
        milStatus.innerText = 'Tracking...';
        milStatus.classList.add('text-success');
        // Flip the button status since we're now tracking
        this.classList.add('btn-danger');
        this.innerText = 'STOP';

    } else {
        milStatus.innerText = 'Not Tracking';
        milStatus.classList.remove('text-success');
        // Flip the button status since we stopped tracking
        this.classList.remove('btn-danger');
        this.innerText = 'START';
        // Clear the map div for now when we stop tracking
        document.getElementById('map').innerText = '';
    }
});

function onSuccess(position) {
    var newLat = position.coords.latitude;
    var newLong = position.coords.longitude;

    if ( newLat != null && newLong != null) {
        // Submit the location data to our API
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

        var urlencoded = new URLSearchParams();
        urlencoded.append("userId", "oleg");
        urlencoded.append("lat", newLat);
        urlencoded.append("long", newLong);

        var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: urlencoded,
        redirect: 'follow'
        };

        fetch("glt-api.herokuapp.com/api/locations?lat="+ newLat +"&long="+ newLong + "&userId=oleg", requestOptions)
        .then(response => response.text())
        .then(result => console.log(result))
        .catch(error => console.log('error', error));

        mapboxgl.accessToken = 'pk.eyJ1Ijoib2tvbnRzb2dyYWRhIiwiYSI6ImNrOXo5NnZmdDA3ZnEzbnFpaWwwcml3NWcifQ.-dNjmszWB14KOPq3qlE0sQ';
        var map = new mapboxgl.Map({
            container: 'map',
            style: 'mapbox://styles/okontsograda/ck9zactoj367q1imd5f7l3ami',
            center: [newLong, newLat],
            zoom:13
        });
    }
}

function onError(error) {
    alert('code: ' + error.code);
}