// Objectifs et leur progression
const goals = {
    1: { name: 'Lire le communiqué de presse', visited: false },
    2: { name: 'Regarder le film', visited: false },
    3: { name: 'Jouer au jeu', visited: false },
    4: { name: 'Visiter toutes les pages', visited: false }
};

// Met à jour la barre de progression
function updateProgress() {
    let completed = 0;
    Object.values(goals).forEach(goal => {
        if (goal.visited) {
            completed++;
        }
    });

    const progressPercentage = Math.round((completed / Object.keys(goals).length) * 100);
    const progressBar = document.querySelector('.progress');
    if (progressBar) progressBar.style.width = `${progressPercentage}%`;

    const progressionText = document.getElementById('progression-text');
    if (progressionText) progressionText.textContent = `progression : ${progressPercentage}%`;
}

// Affiche la popup uniquement lors d'une nouvelle validation
function showPopup() {
    const popup = document.getElementById('popup');
    if (popup) {
        popup.style.display = 'block';
        setTimeout(() => {
            popup.style.display = 'none';
        }, 2000);
    }
}

function markGoal(goalNumber) {
    if (!goals[goalNumber].visited) {
        goals[goalNumber].visited = true;
        const li = document.querySelector(`li[data-goal="${goalNumber}"]`);
        if (li) li.style.backgroundColor = '#4CAF50';
        updateProgress();
        saveGoals();
        showPopup();
    }
    if (goals[1].visited && goals[2].visited && goals[3].visited && !goals[4].visited) {
        markGoal(4);
    }
}

function saveGoals() {
    localStorage.setItem('eurocks_goals', JSON.stringify(goals));
}

function loadGoals() {
    const saved = localStorage.getItem('eurocks_goals');
    if (saved) {
        const parsed = JSON.parse(saved);
        Object.keys(goals).forEach(k => {
            goals[k].visited = parsed[k]?.visited || false;
            if (goals[k].visited) {
                const li = document.querySelector(`li[data-goal="${k}"]`);
                if (li) li.style.backgroundColor = '#4CAF50';
            }
        });
        updateProgress();
    }
}

document.addEventListener('DOMContentLoaded', () => {
    loadGoals();

    if (window.location.pathname.endsWith('actus.html')) {
        markGoal(1);
    }

    if (window.location.pathname.endsWith('promotion.html')) {
        let filmValidated = goals[2].visited;
        function checkScrollFilm() {
            if (filmValidated) return;
            const scrollPosition = window.scrollY + window.innerHeight;
            const pageHeight = document.documentElement.scrollHeight;
            if (scrollPosition >= pageHeight * 0.95) {
                markGoal(2);
                filmValidated = true;
                window.removeEventListener('scroll', checkScrollFilm);
            }
        }
        window.addEventListener('scroll', checkScrollFilm);
    }

    if (window.location.pathname.endsWith('jeu.html')) {
        const iframe = document.querySelector('iframe');
        if (iframe) {
            iframe.addEventListener('load', () => {
                markGoal(3);
            });
        }
    }
});
