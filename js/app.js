// app.js
import { auth, db } from "../firebase-config.js";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
} from "https://www.gstatic.com/firebasejs/10.5.0/firebase-auth.js";

import {
  collection,
  addDoc,
} from "https://www.gstatic.com/firebasejs/10.5.0/firebase-firestore.js";

const emailEl = document.querySelector("#email");
const passwordEl = document.querySelector("#password");
const loginBtn = document.querySelector("#btn-login");
const registerBtn = document.querySelector("#btn-register");
const messageEl = document.querySelector("#message");
const authContainer = document.querySelector("#auth-container");
const dashboard = document.querySelector("#dashboard");

// Registro de usuarios
registerBtn?.addEventListener("click", async () => {
  const email = emailEl.value.trim();
  const pass = passwordEl.value.trim();
  if (!email || !pass) {
    messageEl.textContent = "❌ Ingresa correo y contraseña";
    return;
  }
  try {
    await createUserWithEmailAndPassword(auth, email, pass);
    messageEl.textContent = "✅ Registro exitoso";
  } catch (e) {
    messageEl.textContent = "❌ " + e.message;
  }
});

// Login de usuarios
loginBtn?.addEventListener("click", async () => {
  const email = emailEl.value.trim();
  const pass = passwordEl.value.trim();
  if (!email || !pass) {
    messageEl.textContent = "❌ Ingresa correo y contraseña";
    return;
  }
  try {
    await signInWithEmailAndPassword(auth, email, pass);
    messageEl.textContent = "✅ Sesión iniciada";
  } catch (e) {
    messageEl.textContent = "❌ " + e.message;
  }
});

// Estado de autenticación
onAuthStateChanged(auth, (user) => {
  if (user) {
    authContainer.style.display = "none";
    dashboard.style.display = "block";
    renderPedidosCitasChart();
    renderIngresosChart();
    testFirebase();
  } else {
    authContainer.style.display = "flex";
    dashboard.style.display = "none";
  }
});

// Prueba de conexión a Firebase
async function testFirebase() {
  try {
    const docRef = await addDoc(collection(db, "pruebas"), {
      mensaje: "Firebase conectado",
      usuario: auth.currentUser.email,
      fecha: new Date(),
    });
    console.log("✅ Documento guardado con ID:", docRef.id);
  } catch (e) {
    console.error("❌ Error guardando documento:", e);
  }
}

// Datos simulados
const pedidosMensuales = [30, 25, 28, 15, 20, 28];
const citasMensuales = [20, 18, 30, 32, 12, 8];
const ingresosMensuales = [120000, 140000, 160000, 180000, 120000, 90000];

function renderPedidosCitasChart() {
  const ctx = document.getElementById("pedidosCitasChart")?.getContext("2d");
  if (!ctx) return;
  new Chart(ctx, {
    type: "bar",
    data: {
      labels: ["Ene", "Feb", "Mar", "Abr", "May", "Jun"],
      datasets: [
        {
          label: "Pedidos",
          data: pedidosMensuales,
          backgroundColor: "#3B82F6",
        },
        {
          label: "Citas",
          data: citasMensuales,
          backgroundColor: "#EF4444",
        },
      ],
    },
    options: {
      responsive: true,
      plugins: {
        legend: { position: "bottom" },
      },
    },
  });
}

function renderIngresosChart() {
  const ctx = document.getElementById("ingresosChart")?.getContext("2d");
  if (!ctx) return;
  new Chart(ctx, {
    type: "line",
    data: {
      labels: ["Ene", "Feb", "Mar", "Abr", "May", "Jun"],
      datasets: [
        {
          label: "Ingresos",
          data: ingresosMensuales,
          borderColor: "#FBBF24",
          backgroundColor: "rgba(251, 191, 36, 0.2)",
          tension: 0.3,
          fill: true,
        },
      ],
    },
    options: {
      responsive: true,
      plugins: {
        legend: { position: "bottom" },
      },
    },
  });
}
