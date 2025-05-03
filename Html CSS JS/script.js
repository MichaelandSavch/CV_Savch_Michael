// Зберігаємо інформацію про систему
const systemInfo = {
    userAgent: navigator.userAgent,
    platform: navigator.platform,
    language: navigator.language
};
localStorage.setItem('systemInfo', JSON.stringify(systemInfo));

// Вивід у футер
const footer = document.getElementById('footer-info');
const storedInfo = JSON.parse(localStorage.getItem('systemInfo'));
if (storedInfo) {
    footer.innerText = `OS: ${storedInfo.platform}, Browser: ${storedInfo.userAgent}, Language: ${storedInfo.language}`;
}

// Завантаження коментарів
fetch('https://jsonplaceholder.typicode.com/posts/21/comments')
    .then(res => res.json())
    .then(comments => {
        const container = document.getElementById('comments');
        comments.forEach(comment => {
            const div = document.createElement('div');
            div.innerHTML = `<strong>${comment.name}</strong><p>${comment.body}</p><hr>`;
            container.appendChild(div);
        });
    });

// Відкриття модального вікна через 30 секунд
setTimeout(() => {
    document.getElementById('modal').style.display = 'block';
}, 30000);

// Перемикання теми
const body = document.body;
const toggle = document.getElementById('themeToggle');

function setTheme(mode) {
    body.className = mode;
    localStorage.setItem('theme', mode);
}

const hour = new Date().getHours();
const autoTheme = hour >= 7 && hour < 21 ? 'day' : 'night';
setTheme(autoTheme);

const savedTheme = localStorage.getItem('theme');
if (savedTheme) {
    setTheme(savedTheme);
    toggle.checked = savedTheme === 'night';
}

toggle.addEventListener('change', () => {
    setTheme(toggle.checked ? 'night' : 'day');
});
