function Name() {
    let apiurl = 'https://api.rawg.io/api/games?key=661914440ae347ba8fb5fc8ef77611b7';
    let allGamesData = [];

    fetch(apiurl)
        .then(response => response.json())
        .then(data => {
            console.log(data);
            allGamesData = data.results;
            displayGames(allGamesData);  // Display all games initially
        })
        .catch(err => {
            console.log("Error fetching data", err);
        });

    // Function to display games based on provided data
    function displayGames(games) {
        let allgames = document.querySelector(".allgames");
        allgames.innerHTML = '';  // Clear previous results

        for (const element of games) {
            let card = document.createElement("div");
            card.classList.add("card");

            let imgs = document.createElement("img");
            imgs.classList.add("imgs");
            imgs.src = element.background_image;

            let cardin = document.createElement("div");
            cardin.classList.add("cardin");

            let rating = document.createElement("div");
            rating.classList.add("rating");
            rating.innerHTML = `<span>&#11088; ${element.rating}</span>`;

            let alldit = document.createElement("div");
            alldit.classList.add("all-dit");
            alldit.innerHTML = `<ul>
                       <li>${element.name}</li>     
                       <li>#${element.genres[0]?.name || 'N/A'} #pc</li>        
                       <li>${element.released}</li>        
                       </ul>`;

            let btn1 = document.createElement("button");
            btn1.classList.add("download-btn");
            btn1.textContent = "Download";

            // Set download URL (mock URL for demonstration)
            let downloadUrl = `https://example.com/download/${element.id}`;
            btn1.setAttribute('data-download-url', downloadUrl);

            btn1.addEventListener('click', function () {
                let downloadLink = document.createElement('a');
                downloadLink.href = this.getAttribute('data-download-url');
                downloadLink.download = ''; // Add file name if needed
                document.body.appendChild(downloadLink);
                downloadLink.click();
                document.body.removeChild(downloadLink);
            });

            card.appendChild(imgs);
            card.appendChild(cardin);
            cardin.appendChild(btn1);
            cardin.appendChild(rating);
            cardin.appendChild(alldit);
            allgames.appendChild(card);
        }
    }

    // Search function
    window.searchGames = function () {
        let query = document.getElementById('searchInput').value.toLowerCase();
        let filteredGames = allGamesData.filter(game => game.name.toLowerCase().includes(query));
        displayGames(filteredGames);
    }
}
let nav = document.getElementById("nav");

function x() {

  nav.classList.remove("active");
}

function ad() {
  nav.classList.add("active");
   nav.style.display = "flex"
}

function cl() {
    nav.style.display = "none"
}

Name();
