// fetch("https://api.spacexdata.com/v4/capsules")
//     .then(response => {
//         if (response.status !== 200) {
//             console.log("Error. Status Code:" + response.status);
//             return;
//         }

//         response.json().then(data => {
//             console.log(data);
//         })
//     })
//     .catch(err => {
//         console.log("Error. Error Message:" + err);
//     });

function imageExists(url) {
    let http = new XMLHttpRequest();
    http.open('HEAD', url, false);
    http.send();
    return http.status !== 404;
}

async function loadDragons() {
    let response = await fetch("https://api.spacexdata.com/v4/dragons");
    let dragons = await response.json();
    console.log("DATA ISSSSSSSSSSS: " + dragons);
    console.log(dragons[0]);

    let dragonsListDiv = document.getElementById("dragons-list");
    dragons.forEach(dragon => {
        let dragonImage = document.createElement("img");
        let existingImageUrls = dragon["flickr_images"].filter(imageUrl => imageExists(imageUrl));
        dragonImage.src = existingImageUrls.length === 0
            ? "assets/unknown_img.jpg" 
            : existingImageUrls[0];
        
        let dragonName = document.createElement("h3");
        dragonName.innerHTML = dragon.name;

        let dragonDesc = document.createElement("p");
        dragonDesc.innerHTML = dragon.description.split(".")[0] + "." // Get first sentence only;

        let dragonTextDiv = document.createElement("div");
        dragonTextDiv.classList.add("column");
        dragonTextDiv.appendChild(dragonName);
        dragonTextDiv.appendChild(dragonDesc);

        let dragonDiv = document.createElement("div");
        dragonDiv.classList.add("row");
        dragonDiv.addEventListener("click", function() {
            this.classList.toggle("dragons-item-active");
        });

        dragonDiv.appendChild(dragonImage);
        dragonDiv.appendChild(dragonTextDiv);
        
        dragonsListDiv.appendChild(dragonDiv);
    });
}

function loadPage() {
    let pathDirectories = window.location.pathname.split("/");
    let currentPage = pathDirectories[pathDirectories.length - 1];
    switch(currentPage) {
        case "dragons.html":
            loadDragons();
            break;
        default:
            break;
    }
    console.log(currentPage);
}

loadPage();