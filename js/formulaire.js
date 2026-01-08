document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('formReservation');
    const confirmationMessage = document.getElementById('confirmationMessage');

    const aujourdhui = new Date().toISOString().split('T')[0];
    document.getElementById('datePlongee').setAttribute('min', aujourdhui);

    function validerChamp(champ) {
        const valeur = champ.value.trim();
        let valide = true;
        
        if (champ.hasAttribute('required') && !valeur) {
            valide = false;
        }
        
        if (valeur) {
            if (champ.type === 'email') {
                valide = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(valeur);
            }
            if (champ.type === 'tel') {
                valide = /^[0-9]{3}-?[0-9]{3}-?[0-9]{4}$/.test(valeur);
            }
            if (champ.id === 'nom') {
                valide = valeur.length >= 2;
            }
        }
        
        champ.classList.toggle('is-invalid', !valide);
        champ.classList.toggle('is-valid', valide);
        
        return valide;
    }
    
    form.querySelectorAll('input, select').forEach(input => {
        input.addEventListener('blur', () => validerChamp(input));
    });
    

    form.addEventListener('submit', function(e) {
        e.preventDefault();

        let valide = true;
        form.querySelectorAll('[required]').forEach(champ => {
            if (!validerChamp(champ)) valide = false;
        });
        
        if (!valide) {
            form.querySelector('.is-invalid')?.scrollIntoView({ behavior: 'smooth', block: 'center' });
            return;
        }

        const nom = document.getElementById('nom').value.trim();
        const email = document.getElementById('email').value.trim();
        const telephone = document.getElementById('telephone').value.trim();
        const datePlongee = document.getElementById('datePlongee').value;
        const typePlongee = document.getElementById('typePlongee');
        const typePlongeeTexte = typePlongee.options[typePlongee.selectedIndex].text;
        const experience = document.querySelector('input[name="experience"]:checked').value;
        

        const dateFormatee = new Date(datePlongee).toLocaleDateString('fr-CA', { 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric' 
        });

        const telFormate = telephone.replace(/(\d{3})(\d{3})(\d{4})/, '($1) $2-$3');
        
  
        confirmationMessage.innerHTML = `
            <h3>✅ Réservation Confirmée!</h3>
            <p><strong>Merci ${nom}!</strong></p>
            <p>Nous avons bien reçu votre demande de réservation pour une plongée <strong>${typePlongeeTexte}</strong>.</p>
            <hr style="margin: 1.5rem 0;">
            <h4>📋 Récapitulatif:</h4>
            <ul style="list-style: none; padding-left: 0;">
                <li>📅 Date: ${dateFormatee}</li>
                <li>📧 Courriel: ${email}</li>
                <li>📞 Téléphone: ${telFormate}</li>
                <li>🤿 Expérience: ${experience.charAt(0).toUpperCase() + experience.slice(1)}</li>
            </ul>
            <p style="margin-top: 1.5rem; padding: 1rem; background: rgba(0, 168, 232, 0.1); border-radius: 8px;">
                Notre équipe vous contactera sous peu! 🐠
            </p>
        `;
        
        confirmationMessage.classList.add('active');
        form.style.display = 'none';
        confirmationMessage.scrollIntoView({ behavior: 'smooth' });

        setTimeout(() => {
            if (!confirmationMessage.querySelector('.btn-primary')) {
                const btnNouveau = document.createElement('button');
                btnNouveau.textContent = '🔄 Nouvelle Réservation';
                btnNouveau.className = 'btn btn-primary mt-3';
                btnNouveau.onclick = function() {
                    form.reset();
                    form.style.display = 'block';
                    confirmationMessage.classList.remove('active');
                    confirmationMessage.innerHTML = '';
                    form.querySelectorAll('input, select').forEach(input => {
                        input.classList.remove('is-valid', 'is-invalid');
                    });
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                };
                confirmationMessage.appendChild(btnNouveau);
            }
        }, 500);
    });
});