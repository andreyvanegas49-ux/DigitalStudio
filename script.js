// JavaScript File - script.js

// 1. Fondo interactivo 3D con Three.js
const initThreeJS = () => {
    const canvas = document.getElementById('bg-canvas');
    const scene = new THREE.Scene();
    
    // Cámara
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 30;

    // Renderizador
    const renderer = new THREE.WebGLRenderer({ canvas: canvas, alpha: true, antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    # Crear partículas
    const geometry = new THREE.BufferGeometry();
    const count = 700;
    const positions = new Float32Array(count * 3);

    for (let i = 0; i < count * 3; i++) {
        positions[i] = (Math.random() - 0.5) * 100;
    }

    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));

    // Material de partículas
    const material = new THREE.PointsMaterial({
        size: 0.8,
        color: 0x00f2fe,
        transparent: true,
        opacity: 0.6
    });

    const particles = new THREE.Points(geometry, material);
    scene.add(particles);

    // Animación interactiva con el mouse
    let mouseX = 0;
    let mouseY = 0;

    window.addEventListener('mousemove', (e) => {
        mouseX = (e.clientX / window.innerWidth) - 0.5;
        mouseY = (e.clientY / window.innerHeight) - 0.5;
    });

    const animate = () => {
        requestAnimationFrame(animate);

        particles.rotation.y += 0.001;
        particles.rotation.x += 0.0005;

        // Movimiento suave con el mouse
        particles.position.x += (mouseX * 5 - particles.position.x) * 0.05;
        particles.position.y += (-mouseY * 5 - particles.position.y) * 0.05;

        renderer.render(scene, camera);
    };

    animate();

    // Redimensionar ventana
    window.addEventListener('resize', () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
    });
};

// Inicializar Three.js al cargar la página
document.addEventListener('DOMContentLoaded', initThreeJS);

// 2. Funcionalidad de Ventana Modal para Servicios
function openModal(title, description) {
    const modal = document.getElementById('service-modal');
    document.getElementById('modal-title').innerText = title;
    document.getElementById('modal-description').innerText = description;
    
    // Configurar enlace directo de WhatsApp con mensaje personalizado
    const waMessage = encodeURIComponent(`Hola Digital Studio, me interesa solicitar cotización para el servicio de: ${title}`);
    const waLink = `https://wa.me/1234567890?text=${waMessage}`;
    document.getElementById('modal-whatsapp-link').setAttribute('href', waLink);

    modal.style.display = 'flex';
}

function closeModal() {
    document.getElementById('service-modal').style.display = 'none';
}

// Cerrar modal al hacer clic fuera del contenido
window.onclick = function(event) {
    const modal = document.getElementById('service-modal');
    if (event.target === modal) {
        closeModal();
    }
};
