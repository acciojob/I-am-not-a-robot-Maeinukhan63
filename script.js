//your code here
document.addEventListener("DOMContentLoaded", function () {
    const imagesContainer = document.getElementById("images-container");
    const resetButton = document.getElementById("reset");
    const verifyButton = document.getElementById("verify");
    const para = document.getElementById("para");
    
    const classNames = ["img1", "img2", "img3", "img4", "img5"];
    let images = [];
    let selectedImages = [];

    function initialize() {
        imagesContainer.innerHTML = "";
        resetButton.style.display = "none";
        verifyButton.style.display = "none";
        para.textContent = "";

        selectedImages = [];

        // Randomly pick an image class to repeat
        const repeatClass = classNames[Math.floor(Math.random() * classNames.length)];
        images = [...classNames, repeatClass];

        // Shuffle the images array
        images = images.sort(() => 0.5 - Math.random());

        // Render images
        images.forEach((className, index) => {
            const img = document.createElement("img");
            img.classList.add(className);
            img.setAttribute("data-index", index);
            img.addEventListener("click", handleImageClick);
            imagesContainer.appendChild(img);
        });
    }

    function handleImageClick(e) {
        const clickedImage = e.target;
        const index = clickedImage.getAttribute("data-index");

        if (selectedImages.length === 0 || selectedImages[0] !== index) {
            clickedImage.classList.add("selected");
            selectedImages.push(index);

            if (selectedImages.length === 1) {
                resetButton.style.display = "block";
            } else if (selectedImages.length === 2) {
                verifyButton.style.display = "block";
            }
        }
    }

    resetButton.addEventListener("click", initialize);

    verifyButton.addEventListener("click", function () {
        const firstImage = images[selectedImages[0]];
        const secondImage = images[selectedImages[1]];

        if (firstImage === secondImage) {
            para.textContent = "You are a human. Congratulations!";
        } else {
            para.textContent = "We can't verify you as a human. You selected the non-identical tiles.";
        }

        verifyButton.style.display = "none";
    });

    initialize();
});
