const API_KEY = "Bps9dbscWkWadBFRQvdjg1zs_-mymsrb4S-uXFRDhS4";

async function getBackgroundImage() {
  let hour = new Date().getHours();
  let query = "";
  if (hour >= 6 && hour < 12) {
    query = "morning";
  } else if (hour >= 12 && hour < 18) {
    query = "afternoon";
  } else if (hour >= 18 && hour < 24) {
    query = "evening";
  } else {
    query = "night";
  }

  const API_URL = `https://api.unsplash.com/photos/random/?client_id=Bps9dbscWkWadBFRQvdjg1zs_-mymsrb4S-uXFRDhS4&orientation=landscape&crop=entropy&auto=format&width=3840&height=2160&fm=jpg&q=80&nature&peace&query=${query}`;

  try {
    const response = await fetch(API_URL);
    const data = await response.json();
    return data.urls.regular;
  } catch (error) {
    console.error(error);
    return null;
  }
}

async function setRandomBackgroundImage() {
  const imageUrl = await getBackgroundImage();
  if (imageUrl) {
    document.body.style.backgroundImage = `url(${imageUrl})`;
    document.body.style.backgroundSize = "cover";
    document.body.style.backgroundRepeat = "no-repeat";
  }
}

setRandomBackgroundImage();

// setInterval(setRandomBackgroundImage, 10000);
