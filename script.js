// Configuración
const ITSON_ID = 'TU_ITSON_ID'; // Reemplaza con tu ID de ITSON
const API_URL = `https://tu-api-url.com/publicProjects/${ITSON_ID}`; // Reemplaza con la URL real de tu API

// Imágenes de los proyectos (las que compartiste)
const projectImages = {
    'proyecto-hotdogs': 'hotdogs.jpg', // Imagen del proyecto HotDog Hub
    'backoffice': 'backoffice.jpg'       // Imagen del proyecto BackOffice
};

// Mapeo de tecnologías comunes
const techColors = {
    'html': '#E34F26',
    'css': '#1572B6',
    'javascript': '#F7DF1E',
    'react': '#61DAFB',
    'node': '#339933',
    'mongodb': '#47A248'
};

// Función para cargar proyectos desde la API
async function loadProjects() {
    const loading = document.getElementById('loading');
    const projectsGrid = document.getElementById('projectsGrid');
    const errorMessage = document.getElementById('errorMessage');

    try {
        // Hacer petición a la API
        const response = await fetch(API_URL);
        
        if (!response.ok) {
            throw new Error('Error al cargar los proyectos');
        }

        const projects = await response.json();

        // Ocultar loading
        loading.style.display = 'none';

        if (projects && projects.length > 0) {
            // Mostrar grid de proyectos
            projectsGrid.style.display = 'grid';
            renderProjects(projects);
        } else {
            // Si no hay proyectos, mostrar proyectos de ejemplo
            projectsGrid.style.display = 'grid';
            renderDefaultProjects();
        }

    } catch (error) {
        console.error('Error:', error);
        loading.style.display = 'none';
        
        // En caso de error, mostrar proyectos de ejemplo
        projectsGrid.style.display = 'grid';
        renderDefaultProjects();
    }
}

// Función para renderizar proyectos desde la API
function renderProjects(projects) {
    const projectsGrid = document.getElementById('projectsGrid');
    projectsGrid.innerHTML = '';

    projects.forEach((project, index) => {
        const card = createProjectCard({
            title: project.name || project.title,
            description: project.description,
            image: project.image || projectImages[project.name] || 'default-project.jpg',
            technologies: project.technologies || project.tech || [],
            link: project.url || project.link || '#',
            delay: index * 0.1
        });
        
        projectsGrid.appendChild(card);
    });
}

// Función para renderizar proyectos por defecto (basados en tus repos de GitHub)
function renderDefaultProjects() {
    const defaultProjects = [
        {
            title: 'HotDogs',
            description: 'Aplicación web para localizacion de puestos de hot dogs. Permite a los usuarios encontrar, calificar y comentar sobre diferentes puestos en su área.',
            image: 'hotdogs.jpg',
            technologies: ['HTML5', 'CSS3', 'JavaScript'],
            link: 'https://github.com/ignaciochavezvaldez12341-sketch/proyecto.git'
        },
        {
            title: 'BackOffice',
            description: 'Panel de administración para crear proyectos.',
            image: 'backoffice.jpg',
            technologies: ['JavaScript', 'CSS3', 'HTML5',],
            link: 'https://github.com/ignaciochavezvaldez12341-sketch/proyecto-final.git'
        }
    ];

    const projectsGrid = document.getElementById('projectsGrid');
    projectsGrid.innerHTML = '';

    defaultProjects.forEach((project, index) => {
        const card = createProjectCard({
            ...project,
            delay: index * 0.1
        });
        
        projectsGrid.appendChild(card);
    });
}

// Función para crear una tarjeta de proyecto
function createProjectCard({ title, description, image, technologies, link, delay }) {
    const card = document.createElement('div');
    card.className = 'project-card';
    card.style.animationDelay = `${delay}s`;
    
    card.innerHTML = `
        <img src="${image}" alt="${title}" class="project-image" onerror="this.src='https://via.placeholder.com/400x220/667eea/ffffff?text=${encodeURIComponent(title)}'">
        <div class="project-content">
            <h3 class="project-title">${title}</h3>
            <p class="project-description">${description}</p>
            <div class="project-tech">
                ${technologies.map(tech => `<span class="tech-tag">${tech}</span>`).join('')}
            </div>
            <a href="${link}" class="project-link" target="_blank" rel="noopener noreferrer">
                <i class="fab fa-github"></i>
                Ver en GitHub
            </a>
        </div>
    `;

    // Añadir evento de click para abrir el enlace
    card.addEventListener('click', (e) => {
        if (!e.target.classList.contains('project-link')) {
            window.open(link, '_blank');
        }
    });

    return card;
}

// Función para cargar la imagen de perfil
function loadProfileImage() {
    const profileImg = document.getElementById('profileImg');
    // Aquí deberías poner la ruta de tu imagen de perfil
    // Si no existe, se mostrará una imagen de placeholder
    profileImg.onerror = function() {
        this.src = 'https://via.placeholder.com/150/667eea/ffffff?text=JI';
    };
}

// Animación de aparición al hacer scroll
function observeElements() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, {
        threshold: 0.1
    });

    document.querySelectorAll('.project-card, .about-section').forEach(el => {
        observer.observe(el);
    });
}

// Efecto de partículas en el fondo (opcional)
function createParticles() {
    const particlesContainer = document.createElement('div');
    particlesContainer.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        pointer-events: none;
        z-index: -1;
    `;
    document.body.appendChild(particlesContainer);

    for (let i = 0; i < 50; i++) {
        const particle = document.createElement('div');
        particle.style.cssText = `
            position: absolute;
            width: ${Math.random() * 5 + 2}px;
            height: ${Math.random() * 5 + 2}px;
            background: rgba(255, 255, 255, 0.5);
            border-radius: 50%;
            top: ${Math.random() * 100}%;
            left: ${Math.random() * 100}%;
            animation: float ${Math.random() * 10 + 5}s infinite ease-in-out;
        `;
        particlesContainer.appendChild(particle);
    }

    // Añadir CSS para la animación de partículas
    const style = document.createElement('style');
    style.textContent = `
        @keyframes float {
            0%, 100% {
                transform: translateY(0) translateX(0);
            }
            50% {
                transform: translateY(-20px) translateX(10px);
            }
        }
    `;
    document.head.appendChild(style);
}

// Smooth scroll para enlaces internos
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

// Inicializar cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', () => {
    loadProfileImage();
    loadProjects();
    createParticles();
    
    // Observar elementos para animaciones al scroll
    setTimeout(observeElements, 500);
});

// Contador de visitantes (opcional, usando localStorage)
function updateVisitorCount() {
    let count = localStorage.getItem('visitorCount') || 0;
    count++;
    localStorage.setItem('visitorCount', count);
    console.log(`Visitas al portafolio: ${count}`);
}

updateVisitorCount();