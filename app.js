fetch("https://api.spacexdata.com/v4/capsules")
    .then(response => {
        if (response.status !== 200) {
            console.log("Error. Status Code:" + response.status);
            return;
        }

        response.json().then(data => {
            console.log(data);
        })
    })
    .catch(err => {

    });