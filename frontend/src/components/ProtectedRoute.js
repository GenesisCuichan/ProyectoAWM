import React, { useContext } from 'react'; // Importar React
import { Navigate } from 'react-router-dom'; // Para navegacion entre paginas
import { Store } from '../Store'; // Importar store

//Ruta protegida con informacion del usuario
export default function ProtectedRoute({ children }) {
  const { state } = useContext(Store);
  const { userInfo } = state;
  return userInfo ? children : <Navigate to="/signin" />;
}
//