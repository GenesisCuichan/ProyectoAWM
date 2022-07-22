import React, { useContext } from "react"; // Importar React
import { Navigate } from "react-router-dom"; // Importar para navegar entre paginas
import { Store } from "../Store"; // Importa store

//Retorna la informacion del usuario y verifica si es admin 
export default function AdminRutas({ children }) {
  const { state } = useContext(Store);
  const { userInfo } = state;
  return userInfo && userInfo.isAdmin ? children : <Navigate to='/signin' />;
}
