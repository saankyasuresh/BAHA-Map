mapboxgl.accessToken = 'pk.eyJ1Ijoic2Fhbmt5YXN1cmVzaCIsImEiOiJjbWg5cjAxZmMwc2ttMmxvbzFwOTd1bGNkIn0.aBlTJt8GDmi9jYtwzjgAzw';
const map = new mapboxgl.Map({
  container: 'map', // container ID
  style: 'mapbox://styles/saankyasuresh/cmh9r41dj00bi01sq4360d1rz', // your Style URL goes here
  center: [-122.27, 37.87], // starting position [lng, lat]. Note that lat must be set between -90 and 90
  zoom: 9 // starting zoom
    });