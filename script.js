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

  map.loadImage('https://github.com/saankyasuresh/BAHA-Map/blob/e5954e87ad51ea0ea97fb5b5d59005006eeb59e4/Web%20Map%20Icon.png')
  
    map.addLayer({
        id: 'points-layer',
        type: 'symbol',
        source: 'points-data',
        paint: (
            'symbol-image': 'house',
            'symbol-size': 0.9,
            'symbol-overlap': true
            'symbol-anchor': 'bottom'
        }
    });

    // Add click event for popups
    map.on('click', 'points-layer', (e) => {
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
    map.on('mouseenter', 'points-layer', () => {
        map.getCanvas().style.cursor = 'pointer';
    });

    // Change cursor back when leaving points
    map.on('mouseleave', 'points-layer', () => {
        map.getCanvas().style.cursor = '';
    });

});
