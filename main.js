// Geolocation
const geolocationNode = document.querySelector("#geolocation");

function handleGeoLocation(pos) {
  geolocationNode.textContent = `${pos.coords.latitude} ${pos.coords.longitude}`;
}

document.querySelector("button#locate-me").addEventListener("click", () => {
  if ("geolocation" in navigator) {
    navigator.geolocation.getCurrentPosition(handleGeoLocation);
  } else {
    console.error("Geolocation API not supported");
  }
});
