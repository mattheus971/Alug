import { createContext, useState, useEffect } from "react";
import axios from "axios";

export const GlobalContext = createContext();

export const GlobalContextProvider = ({ children }) => {
  const [usuario, setUsuario] = useState(() => {
    try {
      const saved = localStorage.getItem("usuario");
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });
  const [loadingUsuario, setLoadingUsuario] = useState(!usuario);

  const formatDateForInput = (value) => {
    if (!value) return "";
    // caso venha DD/MM/YYYY
    if (/^\d{2}\/\d{2}\/\d{4}$/.test(value)) {
      const [d, m, y] = value.split("/");
      return `${y}-${m.padStart(2, "0")}-${d.padStart(2, "0")}`;
    }
    // tenta parse de ISO/other -> retorna YYYY-MM-DD
    const dt = new Date(value);
    if (!isNaN(dt)) return dt.toISOString().split("T")[0];
    return value;
  };

  const fetchUsuarioById = async (id) => {
    if (!id) return;
    setLoadingUsuario(true);
    try {
      const res = await axios.get(`http://localhost:3000/usuario/${id}`);
      const dados = res.data;

      if (dados.data_nascimento && !dados.dataNascimento) {
        dados.dataNascimento = formatDateForInput(dados.data_nascimento);
      } else if (dados.dataNascimento) {
        dados.dataNascimento = formatDateForInput(dados.dataNascimento);
      }

      setUsuario(dados);
      localStorage.setItem("usuario", JSON.stringify(dados));
    } catch (err) {
      console.log("Erro ao buscar usuário por id:", err);
    } finally {
      setLoadingUsuario(false);
    }
  };

  useEffect(() => {
    if (!usuario) return;
    const id = usuario.id ?? usuario.id_usuario;
    if (id) fetchUsuarioById(id);
  }, [usuario]);

  const logout = () => {
    localStorage.removeItem("usuario");
    setUsuario(null);
  };

  return (
    <GlobalContext.Provider value={{ usuario, setUsuario, loadingUsuario, refreshUsuario: fetchUsuarioById, logout }}>
      {children}
    </GlobalContext.Provider>
  );
};