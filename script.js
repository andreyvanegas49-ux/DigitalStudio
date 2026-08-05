/* =========================================================
   1. LÓGICA DE DATOS Y MODALES INTERACTIVOS
   ========================================================= */

const servicesData = {
    video: {
        title: "Edición de Video Profesional",
        description: "Llevamos tu material audiovisual al siguiente nivel mediante técnicas avanzadas de montaje, ritmo narrativo y acabado cinematográfico.",
        includes: [
            "Corte, sincronización y estructura narrativa",
            "Corrección y gradación de color (Color Grading)",
            "Diseño sonoro y mezcla de audio básico",
            "Titulación y subtítulos dinámicos",
            "Formatos optimizados para Redes Sociales (9:16) o Horizontal (16:9)"
        ],
        deliverables: "Video final en MP4/ProRes 1080p o 4K + adaptaciones requeridas.",
        wspMsg: "¡Hola! Quisiera cotizar el servicio de Edición de Video."
    },
    foto: {
        title: "Retoque Digital & Fotomontaje",
        description: "Mejoramos y perfeccionamos tus imágenes fotográficas para campañas publicitarias, catálogos e-commerce o presencia de marca.",
        includes: [
            "Limpieza y retoque de piel/imperfecciones",
            "Ajustes de iluminación, contraste y balance de blancos",
            "Aislamiento de producto y sustitución de fondos",
            "Fotomontaje e integración de elementos visuales",
            "Estandarización de color corporativo"
        ],
        deliverables: "Archivos TIFF/PNG de alta resolución para impresión y versiones optimizadas para web.",
        wspMsg: "¡Hola! Quisiera cotizar el servicio de Retoque Digital."
    },
    motion: {
        title: "Motion Graphics & Animación",
        description: "Damos vida a tus elementos gráficos para comunicar ideas complejas de forma rápida, visual y llamativa.",
        includes: [
            "Animación de logotipos 2D/3D (Intros / Outros)",
            "Lower Thirds y títulos animados",
            "Infografías y explicadores animados",
            "Composición de efectos visuales (VFX)",
            "Animaciones en bucle para contenido social"
        ],
        deliverables: "Archivos de video en alta definición o animaciones con canal alfa (fondo transparente).",
        wspMsg: "¡Hola! Quisiera cotizar el servicio de Motion Graphics."
    },
    audio: {
        title: "Producción & Edición de Audio",
        description: "Optimizamos la calidad sonora de tu contenido para lograr una experiencia auditiva limpia, profesional y envolvente.",
        includes: [
            "Limpieza de ruido de fondo, ecos y pops",
            "Edición y corte de voz para Podcasts o entrevistas",
            "Ecualización, compresión y balance de frecuencias",
            "Diseño de sonido y musicalización estratégica",
            "Masterización final según estándares de plataformas digitales"
        ],
        deliverables: "Master final en formato WAV de alta fidelidad y MP3 optimizado.",
        wspMsg: "¡Hola! Quisiera cotizar el servicio de Producción de Audio."
    }
};

function openModal(serviceKey) {
    const data = servicesData[serviceKey];
    if (!data) return;

    document.getElementById('modalTitle').innerText = data.title;
    
    // Inserción correcta mediante backticks (Template Literals)
    let htmlContent = `<p>${data.description}</p>`;
    htmlContent += `<h4>¿Qué incluye este servicio?</h4><ul>`;
    data.includes.forEach(item => {
        htmlContent += `<li>${item}</li>`;
    });
    htmlContent += `</ul>`;
    htmlContent += `<h4>Entregables:</h4><p>${data.deliverables}</p>`;

    document.getElementById('modalBody').innerHTML = htmlContent;
    
    const wspBtn = document.getElementById('modalWspBtn');
    const encodedMsg = encodeURIComponent(data.wspMsg);
    wspBtn.href = `https://wa.me/573205558829?text=${encodedMsg}`;

    document.getElementById('serviceModal').classList.add('active');
}

function closeModal() {
    document.getElementById('serviceModal').classList.remove('active');
}

function closeModalOnOuterClick(e) {
    if (e.target.classList.contains('modal-overlay')) {
        closeModal();
    }
}


/* =========================================================
   2. RENDERING 3D CON THREE.JS (FONDO DINÁMICO)
   ========================================================= */

const canvas = document.getElementById('webgl-bg');
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(65, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ canvas: canvas, alpha: true, antialias: true });

renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

camera.position.z = 12;

// Generar cintas de celuloide/film
function createFilmStrip(colorVal, radiusOffset) {
    const curve = new THREE.CatmullRomCurve3([
        new THREE.Vector3(-14, -5 + radiusOffset, -2),
        new THREE.Vector3(-6, 4 - radiusOffset, 2),
        new THREE.Vector3(2, -3 + radiusOffset, -1),
        new THREE.Vector3(10, 5 - radiusOffset, 3),
        new THREE.Vector3(16, -2 + radiusOffset, -2)
    ]);

    const geometry = new THREE.TubeGeometry(curve, 100, 0.25, 8, false);
    const material = new THREE.MeshBasicMaterial({
        color: colorVal,
        wireframe: true,
        transparent: true,
        opacity: 0.35
    });

    const mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);
    return mesh;
}

const filmStrip1 = createFilmStrip(0x00f2fe, 0);
const filmStrip2 = createFilmStrip(0x38ef7d, 2.5);

// Nodos de partículas de renderizado
const nodeGroup = new THREE.Group();
const nodeCount = 30;
const dotGeo = new THREE.SphereGeometry(0.08, 16, 16);
const dotMat = new THREE.MeshBasicMaterial({ color: 0x00f2fe, transparent: true, opacity: 0.7 });

for (let i = 0; i < nodeCount; i++) {
    const dot = new THREE.Mesh(dotGeo, dotMat);
    dot.position.set(
        (Math.random() - 0.5) * 20,
        (Math.random() - 0.5) * 12,
        (Math.random() - 0.5) * 6
    );
    nodeGroup.add(dot);
}
scene.add(nodeGroup);

// Loop de animación
let clock = new THREE.Clock();

function animate() {
    requestAnimationFrame(animate);
    const elapsedTime = clock.getElapsedTime();

    filmStrip1.rotation.y = Math.sin(elapsedTime * 0.2) * 0.1;
    filmStrip1.rotation.z = Math.cos(elapsedTime * 0.15) * 0.05;

    filmStrip2.rotation.y = -Math.sin(elapsedTime * 0.18) * 0.1;
    filmStrip2.rotation.z = -Math.cos(elapsedTime * 0.12) * 0.05;

    nodeGroup.rotation.y = elapsedTime * 0.03;

    renderer.render(scene, camera);
}

animate();

// Responsividad del Canvas 3D
window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});
