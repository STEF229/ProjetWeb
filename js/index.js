function creerEntete() {
    const entete = document.getElementById('entete');
    
    const logoSVG = `
        <svg class="logoSvg" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
            <circle cx="50" cy="50" r="45" fill="#00a8e8"/>
            <path d="M30 50 Q40 35, 50 50 T70 50" stroke="white" stroke-width="3" fill="none"/>
            <circle cx="35" cy="45" r="3" fill="white"/>
            <circle cx="65" cy="45" r="3" fill="white"/>
            <path d="M30 60 Q50 70, 70 60" stroke="white" stroke-width="2" fill="none"/>
        </svg>
    `;
    
    entete.innerHTML = `
        <div class="enteteContenu">
            <a href="accueil.html" class="lienLogo">
                ${logoSVG}
            </a>
            <nav>
                <ul>
                    <li><a href="accueil.html">Accueil</a></li>
                    <li><a href="evenements.html">Événements</a></li>
                    <li><a href="formulaire.html">Réservation</a></li>
                </ul>
            </nav>
        </div>
    `;
}

function creerPiedPage() {
    const piedPage = document.getElementById('piedPage');
    const annee = new Date().getFullYear();
    piedPage.innerHTML = `<p>Site web réalisé par Stanislas Tokplo &copy; ${annee}</p>`;
}

document.addEventListener('DOMContentLoaded', function() {
    creerEntete();
    creerPiedPage();
    
    const cheminActuel = window.location.pathname;
    const liens = document.querySelectorAll('nav a');
    
    liens.forEach(lien => {
        if (cheminActuel.includes(lien.getAttribute('href'))) {
            lien.style.backgroundColor = 'rgba(255, 255, 255, 0.25)';
        }
    });
});