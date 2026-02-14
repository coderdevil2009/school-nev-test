const topLat = 21.160944;
const bottomLat = 21.159028;
const leftLon = 79.038194;
const rightLon = 79.042806;

const map = document.getElementById("map");
const dot = document.getElementById("dot");

function updatePosition(position) {
    const lat = position.coords.latitude;
    const lon = position.coords.longitude;

    const rect = map.getBoundingClientRect();
    const mapWidth = rect.width;
    const mapHeight = rect.height;

    const x = ((lon - leftLon) / (rightLon - leftLon)) * mapWidth;
    const y = ((topLat - lat) / (topLat - bottomLat)) * mapHeight;

    dot.style.left = x + "px";
    dot.style.top = y + "px";

    // Check if outside campus
    if (
        lat < bottomLat ||
        lat > topLat ||
        lon < leftLon ||
        lon > rightLon
    ) {
        console.log("User outside campus bounds");
    } else {
        console.log("User inside campus");
    }
}

function error(err) {
    console.log("GPS error:", err);
}

navigator.geolocation.watchPosition(updatePosition, error, {
    enableHighAccuracy: true,
    maximumAge: 0,
    timeout: 5000
});
