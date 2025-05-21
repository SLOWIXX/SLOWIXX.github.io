// Objectifs et leur progression
const goals = {
    1: { name: 'Lire le communiqué de presse', visited: false },
    2: { name: 'Regarder le film', visited: false },
    3: { name: 'Jouer au jeu', visited: false },
    4: { name: 'Visiter toutes les pages', visited: false }
};

// Met à jour la barre de progression et la popup
function updateProgress() {
    let completed = 0;
    Object.values(goals).forEach(goal => {
        if (goal.visited) {
            completed++;
        }
    });
    
    const progressPercentage = (completed / Object.keys(goals).length) * 100;
    document.querySelector('.progress').style.width = `${progressPercentage}%`;

    // Popup
    if (completed > 0) {
        document.getElementById('popup').style.display = 'block';
        setTimeout(() => {
            document.getElementById('popup').style.display = 'none';
        }, 3000);
    }
}

// Vérifie si un objectif est accompli
function markGoal(goalNumber) {
    if (!goals[goalNumber].visited) {
        goals[goalNumber].visited = true;
        document.querySelector(`li[data-goal="${goalNumber}"]`).style.backgroundColor = '#4CAF50';
        updateProgress();
    }
}

if (window.location.href.includes('communique')) {
    markGoal(1);
}

if (window.location.href.includes('film')) {
    markGoal(2);
}

if (window.location.href.includes('jeu.')) {
    markGoal(3);
}

// Ajout de la fonction de suivi pour visiter toutes les pages
if (!localStorage.getItem('visited')) {
    localStorage.setItem('visited', 'false');
}

if (localStorage.getItem('visited') === 'false') {
    markGoal(4); // Cette logique peut être adaptée pour marquer dès qu'on a visité toutes les pages
    localStorage.setItem('visited', 'true');
}
