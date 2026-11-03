const classData = {
  "Arquitectura de Computadoras": {
    color: "blue",
    folders: [
      ["evaluaciones-anteriores", "Evaluaciones anteriores", "6 archivos"],
      ["material-de-practica", "Material de práctica", "8 archivos"],
      ["material-de-estudio", "Material de estudio", "5 archivos"],
      ["anotaciones-de-otros-estudiantes", "Anotaciones de estudiantes", "3 archivos"],
      ["libros-del-curso", "Libros del curso", "2 archivos"],
    ],
  },
  "Estructuras Discretas": {
    color: "lilac",
    folders: [
      ["evaluaciones-anteriores", "Evaluaciones anteriores", "5 archivos"],
      ["material-de-practica", "Material de práctica", "5 archivos"],
      ["material-de-estudio", "Material de estudio", "4 archivos"],
      ["anotaciones-de-otros-estudiantes", "Anotaciones de estudiantes", "2 archivos"],
      ["libros-del-curso", "Libros del curso", "2 archivos"],
    ],
  },
  Programación: {
    color: "yellow",
    folders: [
      ["evaluaciones-anteriores", "Evaluaciones anteriores", "8 archivos"],
      ["material-de-practica", "Material de práctica", "10 archivos"],
      ["material-de-estudio", "Material de estudio", "7 archivos"],
      ["anotaciones-de-otros-estudiantes", "Anotaciones de estudiantes", "4 archivos"],
      ["libros-del-curso", "Libros del curso", "2 archivos"],
    ],
  },
};

const recentFiles = [
  ["Parcial 1 · Sistemas numéricos", "Arquitectura de Computadoras", "PDF", "2.4 MB"],
  ["Guía de ejercicios · Relaciones", "Estructuras Discretas", "PDF", "1.1 MB"],
  ["Resumen · Algoritmos de ordenamiento", "Programación", "PDF", "3.2 MB"],
];
const uploadedMaterials = {
  "Arquitectura de Computadoras/evaluaciones-anteriores": {
    name: "Solución examen parcial 1 · 2025 II ciclo",
    type: "PDF",
    size: "3.4 MB",
    url: encodeURI("materiales/Arquitectura-de-Computadoras/evaluaciones-anteriores/solucion examen parcial 1_2025 II ciclo arquitectura pz.pdf"),
    downloadName: "solucion examen parcial 1_2025 II ciclo arquitectura pz.pdf",
  },
};
const youtubeVideos = {
  "Arquitectura de Computadoras": [
    ["Como usar el simulador Logic Circuit, video de estudiante", "Recurso compartido por un estudiante para apoyar a la clase", "https://www.youtube.com/watch?v=zxcaHuwjmq8&t=13s"],
    ["Conceptos básicos de arquitectura de computadoras", "Fundamentos · CPU, memoria y buses", "https://www.youtube.com/results?search_query=arquitectura+de+computadoras+conceptos+basicos"],
    ["Cómo funciona un procesador", "Procesadores · Explicación visual", "https://www.youtube.com/results?search_query=como+funciona+un+procesador+arquitectura"],
    ["Memoria caché explicada", "Memoria · Niveles y rendimiento", "https://www.youtube.com/results?search_query=memoria+cache+arquitectura+de+computadoras"],
  ],
  "Estructuras Discretas": [
    ["Introducción a la lógica matemática", "Lógica · Proposiciones y tablas de verdad", "https://www.youtube.com/results?search_query=logica+matematica+estructuras+discretas"],
    ["Relaciones y funciones", "Relaciones · Conceptos y ejercicios", "https://www.youtube.com/results?search_query=relaciones+y+funciones+estructuras+discretas"],
    ["Grafos: conceptos fundamentales", "Grafos · Vértices, aristas y recorridos", "https://www.youtube.com/results?search_query=grafos+estructuras+discretas"],
  ],
  Programación: [
    ["Fundamentos de programación", "Conceptos · Variables, ciclos y funciones", "https://www.youtube.com/results?search_query=fundamentos+de+programacion+en+espanol"],
    ["Algoritmos de ordenamiento", "Algoritmos · Comparación y complejidad", "https://www.youtube.com/results?search_query=algoritmos+de+ordenamiento+explicados"],
    ["Estructuras de datos", "Datos · Listas, pilas y colas", "https://www.youtube.com/results?search_query=estructuras+de+datos+en+espanol"],
  ],
};
const $ = (selector) => document.querySelector(selector);
const modal = (id, open) => {
  const element = $(id);
  element.classList.toggle("is-open", open);
  element.setAttribute("aria-hidden", String(!open));
};
let activeClass = "";

function renderRecent(files = recentFiles) {
  $("#recent-list").innerHTML = files.length
    ? files.map(([name, subject, type, size], index) => `
      <div class="recent-item">
        <span class="file-type">${type}</span>
        <div class="recent-info"><span class="recent-name">${name}</span><span class="recent-meta">${subject} · ${size}</span></div>
        <button class="file-action" data-open-file="${index}" type="button" aria-label="Abrir ${name}">↗</button>
      </div>`).join("")
    : '<p class="empty-state">No encontramos archivos con esa búsqueda.</p>';
}

function openClass(name) {
  activeClass = name;
  $("#repository-title").textContent = name;
  $("#folder-grid").hidden = false;
  $("#file-view").hidden = true;
  $("#breadcrumb-current").textContent = "Carpetas";
  $("#folder-grid").innerHTML = classData[name].folders.map(([id, label, count]) => `
    <button class="folder-card" data-folder="${id}" type="button">
      <span class="folder-card-icon">▰</span><span><strong>${label}</strong><small>${count}</small></span>
    </button>`).join("");
  modal("#repository-modal", true);
}

function openFolder(id) {
  const folder = classData[activeClass].folders.find((item) => item[0] === id);
  const demoNames = {
    "evaluaciones-anteriores": ["Parcial 1 · Sistemas numéricos", "Examen final · Memoria caché"],
    "material-de-practica": ["Guía de ejercicios · Unidad 2", "Práctica de laboratorio · CPU"],
    "material-de-estudio": ["Resumen de conceptos clave", "Diapositivas · Unidad 3"],
    "anotaciones-de-otros-estudiantes": ["Apuntes · Repaso general", "Mapa conceptual del curso"],
    "libros-del-curso": ["Computer Organization · Capítulo 4", "Bibliografía recomendada"],
  };
  const folderKey = `${activeClass}/${id}`;
  const uploadedFile = uploadedMaterials[folderKey];
  const files = [
    ...(uploadedFile ? [uploadedFile] : []),
    ...demoNames[id].map((name) => ({ name, type: "PDF", size: "Archivo de demostración" })),
  ];
  $("#folder-grid").hidden = true;
  $("#file-view").hidden = false;
  $("#file-category-title").textContent = folder[1];
  $("#breadcrumb-current").textContent = folder[1];
  $("#file-list").innerHTML = files.map((file, index) => `
    <div class="file-row"><span class="file-type">${file.type}</span><div class="file-row-info"><strong>${file.name}</strong><small>${file.type} · ${file.size}</small></div>
    <div class="file-actions"><button data-preview-index="${index}" type="button">Abrir</button><button data-download-index="${index}" type="button">Descargar</button></div></div>`).join("");
  $("#file-list").dataset.files = JSON.stringify(files);
}

function createDemoPdf(name) {
  const content = `%PDF-1.4\n% AulaBase - archivo de demostración\n1 0 obj\n<< /Type /Catalog >>\nendobj\n% ${name}\n%%EOF`;
  return URL.createObjectURL(new Blob([content], { type: "application/pdf" }));
}

function downloadDemoFile(name) {
  const url = createDemoPdf(name);
  const link = document.createElement("a");
  link.href = url;
  link.download = `${name.replaceAll(" ", "-").toLowerCase()}.pdf`;
  link.click();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
  showToast("Descarga iniciada");
}

function openDemoFile(name) {
  const link = document.createElement("a");
  link.href = createDemoPdf(name);
  link.target = "_blank";
  link.rel = "noopener noreferrer";
  link.click();
  showToast("Vista previa abierta en una nueva pestaña");
}

function openUploadedFile(file) {
  const link = document.createElement("a");
  link.href = file.url;
  link.target = "_blank";
  link.rel = "noopener noreferrer";
  link.click();
  showToast("Vista previa abierta en una nueva pestaña");
}

function downloadUploadedFile(file) {
  const link = document.createElement("a");
  link.href = file.url;
  link.download = file.downloadName;
  link.click();
  showToast("Descarga iniciada");
}

function showToast(message) {
  const toast = $("#toast");
  toast.textContent = message;
  toast.classList.add("show");
  setTimeout(() => toast.classList.remove("show"), 2600);
}

let assistantTimer;
function speakAssistant(message) {
  if ("speechSynthesis" in window) {
    window.speechSynthesis.cancel();
    const speech = new SpeechSynthesisUtterance(message);
    speech.lang = "es-MX";
    speech.rate = 1;
    window.speechSynthesis.speak(speech);
  }
}

function runAssistantDemo() {
  clearTimeout(assistantTimer);
  $("#assistant-message").textContent = "Estoy escuchando... buscaré algo útil para ti.";
  $("#assistant-status-text").textContent = "Escuchando";
  $("#assistant-status").classList.add("is-listening");
  speakAssistant("Hola, ¿cómo puedo ayudarte? Estoy escuchando.");
  assistantTimer = setTimeout(() => {
    const recommendation = "Te recomiendo el video de un estudiante sobre cómo usar el simulador Logic Circuit.";
    $("#assistant-message").textContent = recommendation;
    $("#assistant-status-text").textContent = "Recomendación lista";
    $("#assistant-status").classList.remove("is-listening");
    speakAssistant(recommendation);
    openVideos("Arquitectura de Computadoras");
  }, 3000);
}

function openVideos(subject) {
  $("#videos-title").textContent = `Videos de ${subject}`;
  $("#video-list").innerHTML = youtubeVideos[subject].map(([title, detail, url]) => `
    <a class="video-card" href="${url}" target="_blank" rel="noopener noreferrer">
      <span class="video-thumbnail"><span>▶</span></span>
      <span class="video-info"><strong>${title}</strong><small>${detail}</small></span>
      <span class="video-arrow">↗</span>
    </a>`).join("");
  modal("#videos-modal", true);
}

renderRecent();
document.querySelectorAll(".class-open").forEach((button) => button.addEventListener("click", () => openClass(button.dataset.class)));
document.querySelectorAll(".video-link").forEach((button) => button.addEventListener("click", () => openVideos(button.dataset.videos)));
$("#open-upload").addEventListener("click", () => modal("#upload-modal", true));
document.querySelectorAll("[data-close-modal]").forEach((button) => button.addEventListener("click", () => {
  modal("#upload-modal", false);
  modal("#repository-modal", false);
  modal("#videos-modal", false);
}));
$("#back-home").addEventListener("click", () => modal("#repository-modal", false));
$("#back-folders").addEventListener("click", () => openClass(activeClass));
$("#folder-grid").addEventListener("click", (event) => {
  const button = event.target.closest("[data-folder]");
  if (button) openFolder(button.dataset.folder);
});
$("#file-list").addEventListener("click", (event) => {
  const preview = event.target.closest("[data-preview-index]");
  const download = event.target.closest("[data-download-index]");
  if (!preview && !download) return;
  const index = Number((preview || download).dataset[preview ? "previewIndex" : "downloadIndex"]);
  const file = JSON.parse($("#file-list").dataset.files)[index];
  if (file.url) {
    if (preview) openUploadedFile(file);
    if (download) downloadUploadedFile(file);
  } else {
    if (preview) openDemoFile(file.name);
    if (download) downloadDemoFile(file.name);
  }
});
$("#recent-list").addEventListener("click", (event) => {
  if (event.target.closest("[data-open-file]")) openDemoFile(recentFiles[Number(event.target.closest("[data-open-file]").dataset.openFile)][0]);
});
$("#show-all").addEventListener("click", () => showToast("Mostrando los archivos destacados"));
$("#assistant-toggle").addEventListener("click", () => {
  const isOpen = !$("#assistant-panel").hidden;
  $("#assistant-panel").hidden = isOpen;
  $("#assistant-toggle").setAttribute("aria-expanded", String(!isOpen));
  if (!isOpen) {
    $("#assistant-message").textContent = "Hola, ¿cómo puedo ayudarte?";
    $("#assistant-status-text").textContent = "Listo para escuchar";
    $("#assistant-status").classList.remove("is-listening");
    speakAssistant("Hola, ¿cómo puedo ayudarte?");
  } else {
    clearTimeout(assistantTimer);
  }
});
$("#assistant-close").addEventListener("click", () => {
  $("#assistant-panel").hidden = true;
  $("#assistant-toggle").setAttribute("aria-expanded", "false");
  clearTimeout(assistantTimer);
});
$("#assistant-demo").addEventListener("click", runAssistantDemo);
$("#search-input").addEventListener("input", (event) => {
  const term = event.target.value.toLowerCase();
  renderRecent(recentFiles.filter(([name, subject]) => `${name} ${subject}`.toLowerCase().includes(term)));
});
$("#file-input").addEventListener("change", (event) => {
  $("#file-name").textContent = event.target.files[0]?.name || "Haz clic para seleccionar un archivo";
});
document.querySelectorAll('input[name="material-type"]').forEach((input) => input.addEventListener("change", (event) => {
  const isYouTube = event.target.value === "youtube";
  $("#file-fields").hidden = isYouTube;
  $("#youtube-fields").hidden = !isYouTube;
  $("#file-input").required = !isYouTube;
  $("#youtube-url").required = isYouTube;
  $("#video-title").required = isYouTube;
  $("#video-subject").required = isYouTube;
  $("#video-need").required = isYouTube;
  document.querySelectorAll('input[name="video-author"]').forEach((author) => { author.required = isYouTube; });
  $("#digitize-options").hidden = isYouTube;
}));
document.querySelectorAll('input[name="uploader-role"]').forEach((input) => input.addEventListener("change", (event) => {
  const isProfessor = event.target.value === "professor";
  const isYouTube = document.querySelector('input[name="material-type"]:checked')?.value === "youtube";
  $("#material-origin").disabled = isProfessor;
  $("#material-origin").classList.toggle("is-disabled", isProfessor);
  document.querySelectorAll('input[name="origin"]').forEach((origin) => {
    origin.required = !isProfessor;
    if (isProfessor) origin.checked = false;
  });
  $("#digitize-options").hidden = isProfessor || isYouTube;
}));
$("#upload-form").addEventListener("submit", (event) => {
  event.preventDefault();
  $("#upload-form").hidden = true;
  $("#success-message").hidden = false;
});
document.querySelectorAll(".modal-backdrop").forEach((backdrop) => backdrop.addEventListener("click", (event) => {
  if (event.target === backdrop) modal(`#${backdrop.id}`, false);
}));
document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") document.querySelectorAll(".modal-backdrop.is-open").forEach((openModal) => modal(`#${openModal.id}`, false));
});
