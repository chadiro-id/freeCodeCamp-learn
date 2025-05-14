const galleryItems = document.querySelectorAll(".gallery-item");
const lightbox = document.querySelector(".lightbox");
const btnClose = document.getElementById("close-btn");
const lightboxImage = document.getElementById("lightbox-image");

galleryItems.forEach(ele => {
  ele.addEventListener("click", () => {
    const src = ele.src.replace("-thumbnail", "");
    showLightbox(src);
  });
});

btnClose.addEventListener("click", () => {
  hideLightbox();
});

function showLightbox(src) {
  console.log(src);
  lightbox.style.display = "flex";
  lightboxImage.src = src;
  console.log(lightboxImage.src);
}

function hideLightbox() {
  lightbox.style.display = "none";
  lightboxImage.src = "";
}