import React from "react"; // Importar React
import { CDBFooter } from "cdbreact";

// Pie de la pagina
export const Footer = () => {
  return (
    <CDBFooter className='shadow'>
      <small className='text-center mt-5'>
        &copy; Farmacia Vitality, 2022. Todos los derechos reservados.
      </small>
    </CDBFooter>
  );
};
