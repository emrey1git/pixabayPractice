import '../css/style.css'; // Eğer style.css dosyanız src/css içinde ise


const formWrapper = document.querySelector("form-wrapper");
const form = document.querySelector("#form");
const searchInput = document.querySelector("#searchInput");
const buttonWrapper = document.querySelector(".button-wrapper");
const searchButton = document.querySelector("#searchButton");
const clearButton = document.querySelector("#clearButton");
const imageListWrapper = document.querySelector(".imageList-wrapper");

runEventListener();

function runEventListener() {
    form.addEventListener("submit", search);
    clearButton.addEventListener("click", clear)
};
function clear() {
    searchInput.value = "";
    imageListWrapper.innerHTML = "";
};

function search(e) {

    const value = searchInput.value.trim();
    fetch(`https://api.unsplash.com/search/photos?query=${value}`, {
        method: "GET",
        headers: {
            Authorization: "Client-ID GR3Ga2cz1-VR0AlUZx1G6hjOsOWEuBoIqBosesjLzaw"
        }
    })
        .then((res) => res.json())
        .then((data) => {
            console.log(data); // Veriyi görmek için
                if (Array.isArray(data.results)) {
                    data.results.forEach((image) => {
            addImageToUI(image.urls.small);
        });
    }
})
    .catch((error) => console.error("API isteği başarısız:", error));
     e.preventDefault();
}

function addImageToUI(url) {
    console.log(imageListWrapper);
    const div = document.createElement("div");
    div.className = "card";

    const img = document.createElement("img");
    img.setAttribute("src", url);
    img.height = '400';
    img.width = '400';

    div.appendChild(img);
    imageListWrapper.appendChild(div);
    }