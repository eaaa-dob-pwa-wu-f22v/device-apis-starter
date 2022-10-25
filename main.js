// 9.01 Geolocation
const geolocationNode = document.querySelector("#geolocation");

async function handleGeoLocation(pos) {
  try {
    const reverseGeocodingResult = await fetch(
      `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${pos.coords.latitude}&longitude=${pos.coords.longitude}&localityLanguage=en`
    ).then((res) => res.json());

    geolocationNode.textContent = [
      reverseGeocodingResult.city,
      reverseGeocodingResult.locality,
      reverseGeocodingResult.countryName,
    ]
      .filter(Boolean)
      .join(", ");
  } catch (error) {
    console.error(error);
  }
}

document.querySelector("button#locate-me").addEventListener("click", () => {
  if ("geolocation" in navigator) {
    navigator.geolocation.getCurrentPosition(handleGeoLocation);
  } else {
    console.error("Geolocation API not supported");
  }
});

// 9.02 Network status -----------------------------------------------
const networkStatusNode = document.querySelector("#network-status");

function setNetworkStatus() {
  networkStatusNode.textContent = navigator.onLine ? "online" : "offline";
}

setNetworkStatus();

window.addEventListener("online", setNetworkStatus);
window.addEventListener("offline", setNetworkStatus);

// 9.03 Copy to clipboard --------------------------------------------
document
  .querySelector("button#copy-to-clipboard")
  .addEventListener("click", async function () {
    try {
      if (!navigator.clipboard) {
        throw new Error("Clipboard API not supported");
      }
      await navigator.clipboard.writeText(
        document.querySelector("#text-content").value
      );
      // Gratuitous animation
      this.classList.toggle("animate-spin");
      setTimeout(() => {
        this.classList.toggle("animate-spin");
      }, 1000);
    } catch (error) {
      console.error(error);
    }
  });

// 9.04 Sharing ------------------------------------------------------
document.querySelector("button#share").addEventListener("click", async () => {
  try {
    await navigator.share({
      text: document.querySelector("#text-content").value,
    });
  } catch (error) {
    console.error(error);
  }
});
