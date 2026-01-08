document.addEventListener('DOMContentLoaded', function () {
    // ÉVÉNEMENT 1: Compteur de vagues
    creerEffetVagues();
    let compteurClics = 0;
    const btnCompteur = document.getElementById('btnCompteur');
    const resultatCompteur = document.getElementById('resultatCompteur');

    btnCompteur.addEventListener('click', function () {
        compteurClics++;

        miseAJourVitesse(compteurClics);

        resultatCompteur.textContent = `Vagues créées: ${compteurClics}`;

    });

    function miseAJourVitesse(compteurClics) {
        const vagues = document.querySelectorAll('.vague');
        const vitesseBase = 3;
        const vitesseMax = 0.5;

        let nouvelleVitesse = vitesseBase - (compteurClics * 0.2);
        if (nouvelleVitesse < vitesseMax) nouvelleVitesse = vitesseMax;

        vagues.forEach(uneVague => {
            uneVague.style.animationDuration = nouvelleVitesse + 's';
        });
    }

    function creerEffetVagues() {
        const surface = document.getElementById("surfaceVagues");
        if (!surface) return;

        const largeurVague = 10;
        const nombreVagues = Math.floor(window.innerWidth / largeurVague);
        const fragmentDocument = document.createDocumentFragment();

        for (let i = 0; i < nombreVagues; i++) {
            const uneVague = document.createElement("div");
            uneVague.className = "vague";
            uneVague.style.left = i * largeurVague + "px";
            uneVague.style.animationDelay = (i / 100) + "s";
            fragmentDocument.appendChild(uneVague);
        }

        surface.appendChild(fragmentDocument);
    }

    // ÉVÉNEMENT 2: Sélecteur d'animaux
    const selectAnimal = document.getElementById('selectAnimal');
    const animauxChoisis = [];

    selectAnimal.addEventListener('change', function () {
        const choix = this.value;
        let cheminAnimal = '';

        switch (choix) {
            case 'baleine':
                cheminAnimal = '../images/baleine.webp';
                break;
            case 'requin':
                cheminAnimal = '../images/requin.gif';
                break;
            case 'dauphin':
                cheminAnimal = '../images/dauphin.gif';
                break;
            case 'tortue':
                cheminAnimal = '../images/tortue.webp';
                break;
            case 'poisson-rouge':
                cheminAnimal = '../images/poisson-rouge.gif';
                break;
            default:
                information = 'Veuillez sélectionner un animal pour le voir dans l\'océan.';
        }
        if (cheminAnimal) {
            ajouterAnimalOcean(cheminAnimal);
        }
    });

    function ajouterAnimalOcean(cheminAnimal) {
        const ocean = document.getElementById('ocean');
        const nombreAnimaux = 5;

        for (let i = 0; i < nombreAnimaux; i++) {
            const animal = document.createElement('img');
            animal.className = 'oceanAnimal';
            animal.src = cheminAnimal;

            const positionAleatoire = Math.floor(Math.random() * 100);
            animal.style.bottom = positionAleatoire + 'px';

            animal.style.top = 'auto';

            // Délai d'animation aléatoire
            const delay = Math.random() * 2;
            animal.style.animationDelay = delay + 's';

            animal.style.width = '100px';
            animal.style.height = '100px';

            // Durée pour traverser l'écran (en secondes)
            const duration = 15 + Math.random() * 10; 
            animal.style.animationDuration = duration + 's';

            ocean.appendChild(animal);
            animauxChoisis.push(animal);
        }
    }

    // ÉVÉNEMENT 3: Changeur de couleur
    const bulles = document.querySelectorAll('.bulle');
    const couleurs = ['#ff6b6b', '#4ecdc4', '#45b7d1', '#f7dc6f', '#bb8fce'];
    bulles.forEach(bulle => {
        bulle.addEventListener('mouseenter', function (event) {
            
            let indexCouleur = Math.floor(Math.random() * couleurs.length);
            let tentatives = 0;
            while (tentatives < 5) {
                indexCouleur = Math.floor(Math.random() * couleurs.length);
                tentatives++;
            }
            
            const couleurSelectionnee = couleurs[indexCouleur];
            event.target.style.background = couleurSelectionnee;

            document.querySelectorAll('.vague').forEach(uneVague => {
                uneVague.style.background = couleurSelectionnee;
            });
             setTimeout(() => {
            document.querySelectorAll('.vague').forEach(uneVague => {
                uneVague.style.background = 'linear-gradient(to top, rgb(0, 50, 150), rgb(0, 150, 255))';
            });
        }, 3000);

        });
    });

    // ÉVÉNEMENT 4: Profondeur de plongée
    const inputProfondeur = document.getElementById('inputProfondeur');
    const btnProfondeur = document.getElementById('btnProfondeur');
    const resultatProfondeur = document.getElementById('resultatProfondeur');

    btnProfondeur.addEventListener('mousedown', function () {
        const profondeur = parseInt(inputProfondeur.value);
        let message = '';

        if (isNaN(profondeur) || profondeur < 0) {
            message = '⚠️ Veuillez entrer une profondeur valide (nombre positif).';
        } else if (profondeur === 0) {
            message = '🏖️ Vous êtes à la surface! Profitez du soleil et des mouettes.';
        } else if (profondeur <= 200) {
            message = `🐠 À ${profondeur}m, vous pourriez voir des poissons tropicaux colorés et des coraux magnifiques!`;
        } else if (profondeur <= 1000) {
            message = `🦈 À ${profondeur}m, attention aux requins et aux raies manta géantes!`;
        } else if (profondeur <= 4000) {
            message = `🦑 À ${profondeur}m dans la zone mésopélagique, vous êtes dans le royaume des calmars géants et des créatures bioluminescentes!`;
        } else if (profondeur <= 6000) {
            message = `🌊 À ${profondeur}m, la pression est extrême. Seules les créatures les plus résistantes survivent ici!`;
        } else {
            message = `🔱 À ${profondeur}m, vous êtes dans les abysses! Obscurité totale et créatures extraordinaires comme le poisson-dragon.`;
        }
        resultatProfondeur.textContent = message;
        resultatProfondeur.style.display = 'block';
    });



    // ÉVÉNEMENT 5: Double-clic pour retirer un animal au hasard
    const coffre = document.getElementById('coffre');
    const resultatCoffre = document.getElementById('resultatCoffre');
    coffre.addEventListener('dblclick', function () {
        if (animauxChoisis.length > 0) {
            const animalARetirer = animauxChoisis[Math.floor(Math.random() * animauxChoisis.length)];
            animalARetirer.remove();
            animauxChoisis.splice(animauxChoisis.indexOf(animalARetirer), 1);
            
            resultatCoffre.textContent = 'Un animal a été retiré de l\'océan!';
            resultatCoffre.style.display = 'block';

            setTimeout(() => {
                resultatCoffre.style.display = 'none';
            }, 2000);
        } else {
            resultatCoffre.textContent = 'L\'océan est vide! Il n\'y a plus de poissons à retirer.';
            resultatCoffre.style.display = 'block';
            
            setTimeout(() => {
                resultatCoffre.style.display = 'none';
            }, 2000);
        }});})
