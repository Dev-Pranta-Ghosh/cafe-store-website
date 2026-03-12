// Using Leaflet with OpenStreetMap - no API key required
var map;
var marker;

function init() {
    // Default location (New York)
    var defaultLat = 40.69847032728747;
    var defaultLng = -73.9514422416687;
    
    // Initialize the map
    map = L.map('map').setView([defaultLat, defaultLng], 13);
    
    // Add OpenStreetMap tile layer
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
        maxZoom: 19
    }).addTo(map);
    
    // Default marker at New York
    var defaultIcon = L.icon({
        iconUrl: 'images/loc.png',
        iconSize: [32, 32],
        iconAnchor: [16, 32],
        popupAnchor: [0, -32]
    });
    
    marker = L.marker([defaultLat, defaultLng], {icon: defaultIcon}).addTo(map)
        .bindPopup('New York')
        .openPopup();
    
    // Try to get user's current location
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            function(position) {
                var userLat = position.coords.latitude;
                var userLng = position.coords.longitude;
                
                // Center map on user's location
                map.setView([userLat, userLng], 14);
                
                // Add marker at user's location
                marker.setLatLng([userLat, userLng])
                    .bindPopup('Your Location')
                    .openPopup();
            },
            function(error) {
                console.log('Geolocation error or denied: ' + error.message);
            }
        );
    }
}

// Load Leaflet CSS and JS from CDN
function loadLeaflet() {
    // Add Leaflet CSS
    var link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.css';
    document.head.appendChild(link);
    
    // Add Leaflet JS
    var script = document.createElement('script');
    script.src = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.js';
    script.onload = init;
    document.head.appendChild(script);
}

// Initialize when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', loadLeaflet);
} else {
    loadLeaflet();
}
