const ACCESS_KEY = "Bps9dbscWkWadBFRQvdjg1zs_-mymsrb4S-uXFRDhS4";

async function getCollectionPhotos(collectionId) {
  const API_URL = `https://api.unsplash.com/collections/${collectionId}/photos?client_id=${ACCESS_KEY}`;
  try {
    const response = await fetch(API_URL);
    const data = await response.json();
    return data.map((photo) => photo.urls.regular);
  } catch (error) {
    console.error(error);
    return null;
  }
}

async function setCollectionBackgroundImage() {
  let hour = new Date().getHours();
  let collectionId = "";
  if (hour >= 6 && hour < 12) {
    collectionId = "qlrE7KfIqH0";
  } else if (hour >= 12 && hour < 18) {
    collectionId = "Tk52OHSX4uw";
  } else if (hour >= 18 && hour < 24) {
    collectionId = "bQ_TsEMgw2s";
  } else {
    collectionId = "UnkoGILoIHw";
  }

  const imageUrls = await getCollectionPhotos(collectionId);
  if (imageUrls) {
    const imageUrl = imageUrls[Math.floor(Math.random() * imageUrls.length)];
    document.body.style.backgroundImage = `url(${imageUrl})`;
    document.body.style.backgroundSize = "cover";
    document.body.style.backgroundRepeat = "no-repeat";
    document.body.style.overflow = "hidden";
  }
}

setCollectionBackgroundImage();
setInterval(setCollectionBackgroundImage, 60000);
