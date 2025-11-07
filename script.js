mapboxgl.accessToken = 'pk.eyJ1Ijoic2Fhbmt5YXN1cmVzaCIsImEiOiJjbWg5cjAxZmMwc2ttMmxvbzFwOTd1bGNkIn0.aBlTJt8GDmi9jYtwzjgAzw';
const map = new mapboxgl.Map({
  container: 'map', // container ID
  style: 'mapbox://styles/saankyasuresh/cmh9r41dj00bi01sq4360d1rz', // your Style URL goes here
  center: [-122.27, 37.87], // starting position [lng, lat]. Note that lat must be set between -90 and 90
  zoom: 9 // starting zoom
    });
map.on('load', function() {
  const geojsonURL = 'https://raw.githubusercontent.com/saankyasuresh/BAHA-Map/refs/heads/main/data/183data.geojson'
  
  map.addSource('points-data', {
        type: 'geojson',
        data: geojsonURL,
    });
  
 map.loadImage(
    'https://raw.githubusercontent.com/saankyasuresh/BAHA-Map/main/Web%20Map%20Icon.png',
    (err, image) => {
      if (err) { console.error('loadImage error:', err); return; }

      if (!map.hasImage('house-icon')) {
        map.addImage('house-icon', image);
      }
     
    map.addLayer({
        id: 'points-houses',
        type: 'symbol',
        source: 'points-data',
        layout: {
          'icon-image': 'house-icon',
          'icon-allow-overlap': true,
          'icon-anchor': 'bottom',
          'icon-size': [
            'interpolate', ['linear'], ['zoom'],
            11, 0.05,
            14, 0.09,
            16, 0.13
          ]
        }
      });

    // Add click event for popups
    map.on('click', 'points-houses', (e) => {
          const coordinates = e.features[0].geometry.coordinates.slice();
          const properties = e.features[0].properties;
          
          const popupContent = `
            <div>
                <h3>${properties.Landmark}</h3>
                <p><strong>Address:</strong> ${properties.Address}</p>
                <p><strong>Architect + Date:</strong> ${properties['Architect + Date'] ?? properties['Architect_+_Date'] ?? ''}</p>
                <p><strong>Designated:</strong> ${properties.Designated}</p>
                ${properties.Link ? `<p><a href="${properties.Link}" target="_blank">More Information</a></p>` : ''}
                ${properties.Note ? `<p><strong>Notes:</strong> ${properties.Note}</p>` : ''}
            </div>
        `;

          new mapboxgl.Popup()
            .setLngLat(coordinates)
            .setHTML(popupContent)
            .addTo(map);
    });

     // Change cursor to pointer when hovering over points
    map.on('mouseenter', 'points-houses', () => {
        map.getCanvas().style.cursor = 'pointer';
    });

    // Change cursor back when leaving points
    map.on('mouseleave', 'points-houses', () => {
        map.getCanvas().style.cursor = '';
    });

});
