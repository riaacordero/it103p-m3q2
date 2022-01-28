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
    http.open('GET', url, true);
    http.send();
    return http.status !== 404;
}

function moveCrewItems(isLeft) {
    let crewItems = document.getElementById("crew-list").children;

    console.log(crewItems);

    for (let i = 0; i < crewItems.length; i++) {
        let currentOrder = parseInt(crewItems[i].style.order);
        console.log(`current index is ${i}, order is ${currentOrder}`);
        if (isLeft) {
            crewItems[i].style.order = (currentOrder + 1) % crewItems.length;
        } else {
            crewItems[i].style.order = (currentOrder + crewItems.length - 1) % crewItems.length;
        }
        console.log(`order changed to ${crewItems[i].style.order}`);
    }
}

async function loadDragons() {
    let response = await fetch("https://api.spacexdata.com/v4/dragons");
    let dragons = await response.json();

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

async function loadRockets() {
    let response = await fetch("https://api.spacexdata.com/v4/rockets");
    let rockets = await response.json();

    let rocketsListDiv = document.getElementById("rockets-list");
    rockets.forEach(rocket => {
        let rocketImage = document.createElement("img");
        let existingImageUrls = rocket["flickr_images"].filter(imageUrl => imageExists(imageUrl));
        if (existingImageUrls.length !== 0) {
            rocketImage.src = existingImageUrls[0];
        }

        let rocketName = document.createElement("h3");
        rocketName.innerHTML = rocket.name;

        let rocketMeasurement = document.createElement("p");
        rocketMeasurement.innerHTML = `${rocket.height.meters} meters tall, ` 
            + `${rocket.diameter.meters} meters wide, ` 
            + `${rocket.mass.kg} kg heavy`;
        
        let rocketDesc = document.createElement("p");
        rocketDesc.innerHTML = rocket.description;

        let rocketTextDiv = document.createElement("div");
        rocketTextDiv.classList.add("column");
        rocketTextDiv.appendChild(rocketName);
        rocketTextDiv.appendChild(rocketMeasurement);
        rocketTextDiv.appendChild(rocketDesc);

        let rocketDiv = document.createElement("div");
        rocketDiv.classList.add("column");
        rocketDiv.addEventListener("click", function() {
            this.classList.toggle("rockets-item-active");
        });

        rocketDiv.appendChild(rocketImage);
        rocketDiv.appendChild(rocketTextDiv);

        rocketsListDiv.appendChild(rocketDiv);
    });
}

async function loadCrew() {
    let response = await fetch("https://api.spacexdata.com/v4/crew");
    let crew = await response.json();

    let crewListDiv = document.getElementById("crew-list");
    let crewItemName = document.getElementById("crew-item-name");
    crew.forEach((member, index) => {
        let crewImage = document.createElement("img");
        crewImage.src = imageExists(member.image) ? member.image : "assets/unknown.jpg";
        crewImage.style.order = index;
        crewImage.addEventListener("mouseover", function () {
            crewItemName.innerHTML = member.name;
        });
        crewImage.addEventListener("mouseout", function() {
            crewItemName.innerHTML = "";
        })

        crewListDiv.appendChild(crewImage);
    });
}

function loadPage() {
    let pathDirectories = window.location.pathname.split("/");
    let currentPage = pathDirectories[pathDirectories.length - 1];
    switch(currentPage) {
        case "dragons.html":
            loadDragons();
            break;
        case "rockets.html":
            loadRockets();
            break;
        case "crew.html":
            loadCrew();
            break;
        default:
            break;
    }
}

loadPage();