document.addEventListener('DOMContentLoaded', function() {
    
    const btnCta = document.querySelector('.btnCta');
    if (btnCta) {
        btnCta.addEventListener('click', function() {
            const audio = new Audio('audio/bulle_2.mp3');
            audio.play();
            setTimeout(() => {
                window.location.href = 'formulaire.html';
            }, 300);
        });
    }
    
});