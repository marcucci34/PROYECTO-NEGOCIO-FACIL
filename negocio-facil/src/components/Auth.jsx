import { useState } from "react";
import { auth } from "../firebase-config";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import "../styles/style.css";

function Auth({ setUser }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const register = async () => {
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      setMessage("✅ Registro exitoso");
    } catch (e) {
      setMessage("❌ " + e.message);
    }
  };

  const login = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      setMessage("✅ Sesión iniciada");
    } catch (e) {
      setMessage("❌ " + e.message);
    }
  };

  return (
    <div id="auth-container">
      <div className="auth-box">
        <h2>Inicia sesión o regístrate</h2>
        <input
          type="email"
          placeholder="Correo electrónico"
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Contraseña"
          onChange={(e) => setPassword(e.target.value)}
        />
        <button onClick={login}>Iniciar Sesión</button>
        <button onClick={register}>Registrarse</button>
        <p>{message}</p>
      </div>
    </div>
  );
}

export default Auth;
