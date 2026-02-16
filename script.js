// Floating Hearts Animation
function createFloatingHearts() {
    const heartsContainer = document.getElementById('heartsBackground');
    const heartsCount = 20;
    
    for (let i = 0; i < heartsCount; i++) {
        const heart = document.createElement('div');
        heart.className = 'heart-float';
        heart.innerHTML = '❤️';
        heart.style.left = Math.random() * 100 + '%';
        heart.style.animationDelay = Math.random() * 15 + 's';
        heart.style.fontSize = (Math.random() * 20 + 15) + 'px';
        heartsContainer.appendChild(heart);
    }
}

// Quiz Functionality
const quizQuestions = [
    {
        question: "Onde foi nosso primeiro beijo?",
        options: ["Na casa da Dani", "No cinema", "Na praia", "No parque"],
        correct: 0
    },
    {
        question: "Quais serão os nossos carros?",
        options: ["Lancer & Audi", "Lance & Lancer", "Ferrari & Lambo", "Supra & Skyline"],
        correct: 0
    },
    {
        question: "Qual música me lembra você?",
        options: ["Perfect - Ed Sheeran", "All of Me - John Legend", "Thinking Out Loud - Ed Sheeran", "A Thousand Years - Christina Perri"],
        correct: 1
    },
    {
        question: "Qual vai ser nossa primeira viagem juntos?",
        options: ["Araruama", "Arraial", "Buzios", "Paraiba"],
        correct: 0
    },
    {
        question: "Qual é meu apelido carinhoso favorito para você?",
        options: ["Amor", "Bebê", "Meu coração", "Minha Princesa"],
        correct: 3
    },
    {
        question: "Qual dia foi o nosso primeiro beijo?",
        options: ["01/01/2026", "08/01/2026", "03/01/2026", "Nao sei"],
        correct: 2
    },
    {
        question: "Por qual motivo eu sinto tanto orgulho de você?",
        options: ["Pela sua força de vontade", "Por que você é esforçada", "Por que você é inteligente", "Todas as opções"],
        correct: 3
    },
    {
        question: "O que mais amo em você?",
        options: ["Seu sorriso", "Seu jeito de ser", "Seus olhos", "Tudo"],
        correct: 3
    }
];

let currentQuestion = 0;
let score = 0;
let answered = false;

function loadQuestion() {
    if (currentQuestion >= quizQuestions.length) {
        showFinalScore();
        return;
    }
    
    answered = false;
    const question = quizQuestions[currentQuestion];
    document.getElementById('quizQuestion').textContent = question.question;
    
    const optionsContainer = document.getElementById('quizOptions');
    optionsContainer.innerHTML = '';
    
    question.options.forEach((option, index) => {
        const optionDiv = document.createElement('div');
        optionDiv.className = 'quiz-option';
        optionDiv.textContent = option;
        optionDiv.onclick = () => checkAnswer(index);
        optionsContainer.appendChild(optionDiv);
    });
    
    document.getElementById('quizResult').style.display = 'none';
}

function checkAnswer(selectedIndex) {
    if (answered) return;
    
    answered = true;
    const question = quizQuestions[currentQuestion];
    const options = document.querySelectorAll('.quiz-option');
    
    if (selectedIndex === question.correct) {
        options[selectedIndex].classList.add('correct');
        score++;
        showResult('❤️ Acertou! Você é incrível meu amor!', '#d1fae5');
    } else {
        options[selectedIndex].classList.add('wrong');
        options[question.correct].classList.add('correct');
        showResult('💕 Quase lá! Mas tudo bem, nosso amor é maior que qualquer quiz!', '#fef3c7');
    }
    
    setTimeout(() => {
        currentQuestion++;
        loadQuestion();
    }, 2500);
}

function showResult(message, color) {
    const resultDiv = document.getElementById('quizResult');
    resultDiv.textContent = message;
    resultDiv.style.backgroundColor = color;
    resultDiv.style.display = 'block';
}

function showFinalScore() {
    document.getElementById('quizContent').style.display = 'none';
    document.getElementById('quizScore').style.display = 'block';
    
    let message = '';
    const percentage = (score / quizQuestions.length) * 100;
    
    if (percentage === 100) {
        message = `🎉 Perfeito! ${score}/${quizQuestions.length} corretas! Você me conhece perfeitamente, meu amor!`;
    } else if (percentage >= 60) {
        message = `💖 Muito bem! ${score}/${quizQuestions.length} corretas! Você me conhece muito bem!`;
    } else {
        message = `💕 ${score}/${quizQuestions.length} corretas! Mas não se preocupe, temos a vida toda para nos conhecer melhor!`;
    }
    
    document.getElementById('scoreText').textContent = message;
}

function restartQuiz() {
    currentQuestion = 0;
    score = 0;
    answered = false;
    document.getElementById('quizContent').style.display = 'block';
    document.getElementById('quizScore').style.display = 'none';
    loadQuestion();
}

// Canvas Drawing Functionality
const canvas = document.getElementById('drawingCanvas');
const ctx = canvas.getContext('2d');
let isDrawing = false;
let currentColor = '#f43f5e';

function resizeCanvas() {
    const container = canvas.parentElement;
    const maxWidth = Math.min(600, container.offsetWidth - 40);
    canvas.width = maxWidth;
    canvas.height = maxWidth;
    drawHeart();
}

function drawHeart() {
    ctx.fillStyle = '#fff';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    ctx.strokeStyle = '#ffe4e6';
    ctx.lineWidth = 2;
    ctx.beginPath();
    
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    const size = canvas.width / 4;
    
    ctx.moveTo(centerX, centerY + size / 4);
    ctx.bezierCurveTo(
        centerX, centerY - size / 4,
        centerX - size, centerY - size / 4,
        centerX - size, centerY + size / 4
    );
    ctx.bezierCurveTo(
        centerX - size, centerY + size,
        centerX, centerY + size * 1.5,
        centerX, centerY + size * 1.5
    );
    ctx.bezierCurveTo(
        centerX, centerY + size * 1.5,
        centerX + size, centerY + size,
        centerX + size, centerY + size / 4
    );
    ctx.bezierCurveTo(
        centerX + size, centerY - size / 4,
        centerX, centerY - size / 4,
        centerX, centerY + size / 4
    );
    
    ctx.stroke();
}

function startDrawing(e) {
    isDrawing = true;
    draw(e);
}

function stopDrawing() {
    isDrawing = false;
    ctx.beginPath();
}

function draw(e) {
    if (!isDrawing) return;
    
    e.preventDefault();
    
    const rect = canvas.getBoundingClientRect();
    const x = (e.clientX || e.touches[0].clientX) - rect.left;
    const y = (e.clientY || e.touches[0].clientY) - rect.top;
    
    ctx.lineWidth = 5;
    ctx.lineCap = 'round';
    ctx.strokeStyle = currentColor;
    
    ctx.lineTo(x, y);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(x, y);
}

function clearCanvas() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawHeart();
}

document.querySelectorAll('.color-btn').forEach(btn => {
    btn.addEventListener('click', function() {
        document.querySelectorAll('.color-btn').forEach(b => b.classList.remove('active'));
        this.classList.add('active');
        currentColor = this.dataset.color;
    });
});

canvas.addEventListener('mousedown', startDrawing);
canvas.addEventListener('mouseup', stopDrawing);
canvas.addEventListener('mousemove', draw);
canvas.addEventListener('touchstart', startDrawing);
canvas.addEventListener('touchend', stopDrawing);
canvas.addEventListener('touchmove', draw);

// Book Navigation
let currentBookPage = 1;
const totalBookPages = 5;

function updateBookNavigation() {
    document.getElementById('currentPage').textContent = currentBookPage;
    document.getElementById('prevBtn').disabled = currentBookPage === 1;
    document.getElementById('nextBtn').disabled = currentBookPage === totalBookPages;
    
    document.querySelectorAll('.book-page').forEach((page, index) => {
        page.classList.remove('active');
        if (index + 1 === currentBookPage) {
            page.classList.add('active');
        }
    });
}

function nextPage() {
    if (currentBookPage < totalBookPages) {
        currentBookPage++;
        updateBookNavigation();
    }
}

function previousPage() {
    if (currentBookPage > 1) {
        currentBookPage--;
        updateBookNavigation();
    }
}

// Gallery - Carregando as fotos
const galleryImages = [
    'img/ela mesmo.jpeg',
    'img/elaaaa.jpeg',
    'img/eu e ela.jpeg',
    'img/Inicio.jpeg',
    'img/nosss.jpeg',
    'img/seu jeito.jpeg'
];

function loadGallery() {
    const gallery = document.getElementById('galleryGrid');
    gallery.innerHTML = '';
    
    galleryImages.forEach(imgUrl => {
        const item = document.createElement('div');
        item.className = 'gallery-item';
        item.innerHTML = `<img src="${imgUrl}" alt="Nosso momento" loading="lazy">`;
        gallery.appendChild(item);
    });
}

// Smooth scroll
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Initialize everything
window.addEventListener('load', () => {
    createFloatingHearts();
    loadQuestion();
    resizeCanvas();
    updateBookNavigation();
    loadGallery();
});

window.addEventListener('resize', resizeCanvas);
