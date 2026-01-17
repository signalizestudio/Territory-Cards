const map = L.map('map').setView([18.4655, -66.1057], 13);

// Free tiles
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  maxZoom: 19,
  attribution: '&copy; OpenStreetMap'
}).addTo(map);

// User location
let userMarker = null;
function locateUser() {
  map.locate({ setView: true, maxZoom: 16 });

  map.once('locationfound', e => {
    if (userMarker) map.removeLayer(userMarker);

    userMarker = L.circleMarker(e.latlng, {
      radius: 8,
      color: '#007AFF',
      fillColor: '#007AFF',
      fillOpacity: 1
    }).addTo(map);
  });
}

// Territory layer
let territoryLayer;

fetch('Territorio #01 (1)1.json')
  .then(res => res.json())
  .then(data => {
    territoryLayer = L.geoJSON(data, {
      style: feature => ({
        color: '#111',
        weight: 2,
        fillOpacity: 0.1
      }),
      onEachFeature: (feature, layer) => {
        layer.on('click', () => {
          highlightTerritory(layer);
        });
      }
    }).addTo(map);

    map.fitBounds(territoryLayer.getBounds());
  });

// Highlight logic
function highlightTerritory(selectedLayer) {
  territoryLayer.eachLayer(layer => {
    layer.setStyle({
      fillOpacity: layer === selectedLayer ? 0.35 : 0.05
    });
  });

}
