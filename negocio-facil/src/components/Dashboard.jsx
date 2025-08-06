import { useEffect, useRef } from "react";
import Chart from "chart.js/auto";
import { signOut } from "firebase/auth";
import { auth } from "../firebase-config";
import logo from "../assets/image.svg"; // 👈 tu logo dentro de src/assets
import "../styles/style.css";

function Dashboard({ user }) {
  // Referencias a los canvas y charts
  const pedidosCanvasRef = useRef(null);
  const ingresosCanvasRef = useRef(null);
  const pedidosChartRef = useRef(null);
  const ingresosChartRef = useRef(null);

  // Datos simulados
  const pedidosMensuales = [30, 25, 28, 15, 20, 28];
  const citasMensuales = [20, 18, 30, 32, 12, 8];
  const ingresosMensuales = [120000, 140000, 160000, 180000, 120000, 90000];

  useEffect(() => {
    // Chart Pedidos vs Citas
    if (pedidosChartRef.current) pedidosChartRef.current.destroy();
    if (pedidosCanvasRef.current) {
      pedidosChartRef.current = new Chart(
        pedidosCanvasRef.current.getContext("2d"),
        {
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
            plugins: { legend: { position: "bottom" } },
          },
        }
      );
    }

    // Chart Ingresos
    if (ingresosChartRef.current) ingresosChartRef.current.destroy();
    if (ingresosCanvasRef.current) {
      ingresosChartRef.current = new Chart(
        ingresosCanvasRef.current.getContext("2d"),
        {
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
            plugins: { legend: { position: "bottom" } },
          },
        }
      );
    }

    // Cleanup al desmontar
    return () => {
      if (pedidosChartRef.current) pedidosChartRef.current.destroy();
      if (ingresosChartRef.current) ingresosChartRef.current.destroy();
    };
  }, []);

  // Logout
  const logout = async () => {
    await signOut(auth);
  };

  return (
    <div id="dashboard">
      <div className="container">
        {/* Sidebar */}
        <aside className="sidebar">
          <div className="logo">
            <img src={logo} alt="Logo" />
            <h2>Menu</h2>
          </div>
          <nav>
            <ul>
              <li className="active">Pedidos</li>
              <li>Citas</li>
              <li>Clientes</li>
              <li>Análisis</li>
            </ul>
          </nav>
        </aside>

        {/* Contenido principal */}
        <main className="dashboard">
          <h1>Análisis</h1>
          <div className="stats">
            <div className="stat">
              810
              <br />
              <small>Órdenes</small>
            </div>
            <div className="stat">
              230
              <br />
              <small>Citas</small>
            </div>
            <div className="stat">
              56
              <br />
              <small>Clientes</small>
            </div>
            <div className="stat">
              $254,800
              <br />
              <small>Ingresos</small>
            </div>
          </div>

          {/* Gráficos */}
          <div className="charts">
            <canvas ref={pedidosCanvasRef}></canvas>
            <canvas ref={ingresosCanvasRef}></canvas>
          </div>

          {/* Botón logout */}
          <button onClick={logout} style={{ marginTop: "1rem" }}>
            Cerrar Sesión
          </button>
        </main>
      </div>
    </div>
  );
}

export default Dashboard;
