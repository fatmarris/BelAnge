// le conteneur qui accuillera toutes les cartes des realisations
const worksContainer = document.getElementById("works-container");

// les elements de recherche et de filtrage
const searchInput = document.getElementById("search");
const categoryFilter = document.getElementById("serviceFilter");

// contiendra la liste des realisations (chargée depuis works.json)
let works = [];

// Charger les realisations depuis works.json 
fetch("work.json")
    // transforme la réponse en JSON exploitable en JS.
    .then(response => response.json())
    // une fois les données reçues, on les stocke dans la variable 'works' et on affiche les realisations 
    .then(data => {
        works = data;
        displayWorks(works);
    })
    .catch(error => {
        console.error("Erreur de chargement des realisations :", error);
        worksContainer.innerHTML = `<p style="color:red;">Impossible de charger les realisations.</p>`;
    });

// Affichage des realisations 
function displayWorks(list){
    worksContainer.innerHTML = "";
    // Ajoute un petit paragraphe d'introduction
    const intro = document.createElement("p");
    intro.classList.add("intro-text");
    intro.textContent = "Voici un aperçu de nos réalisations pour vous inspirer et révéler votre beauté";
    worksContainer.appendChild(intro);

    // on parcourt la liste des realisations : work représente chaque realisation de la liste list (qui est le tableau de realisations venant de works.json);
    list.forEach(book => {
        const card = document.createElement("div");
        card.classList.add("work-card");
        card.innerHTML = `
            <img src="${book.image}" alt="${book.title}" class="work-image">
            <p class="work-name">${book.name}</p>
        `;
        // on ajoute la carte au conteneur principal
        worksContainer.appendChild(card);
    });
}

// Recherche et filtrage par categories
function filterAndDisplayworks() {
    const searchWork = searchInput.value.toLowerCase();
    const selectedCategory = categoryFilter.value;

    const filtered = works.filter(work => {
        const matchName = work.name.toLowerCase().includes(searchWork);
        const macthCategory = selectedCategory === "" || work.type === selectedCategory;
        return matchName && macthCategory;
    }); 
    worksContainer.innerHTML = "";
    if(filtered.length === 0){
        worksContainer.innerHTML = `
          <p style="color:red; text-align:center;">Aucune réalisation ne correspond à votre recherche</p>
        `;
    } else {
        displayWorks(filtered);
    }
}
document.getElementById("search").addEventListener("input", filterAndDisplayworks);
document.getElementById("serviceFilter").addEventListener("change", filterAndDisplayworks); 

// Dark mode toggle 
    let darkmode = localStorage.getItem('darkmode')
    const themeSwitch = document.getElementById('theme-switch')
    const enableDarkmode = () => {
        document.body.classList.add('darkmode')
        localStorage.setItem('darkmode', 'active')
        }
    const disableDarkmode = () =>  {
        document.body.classList.remove('darkmode')
        localStorage.setItem('darkmode', null)
        }
        if(darkmode === "active") enableDarkmode()
            themeSwitch.addEventListener('click', () => {
                darkmode = localStorage.getItem('darkmode')
                darkmode !== "active" ? enableDarkmode() : disableDarkmode()
        })