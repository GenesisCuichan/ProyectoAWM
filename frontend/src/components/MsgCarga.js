import Spinner from "react-bootstrap/Spinner"; //Mostrar la rueda de carga

// Mensaje cuando se cargue pagina 
export default function MsgCarga() {
  return (
    <Spinner animation='border' role='status'>
      <span className='visually-hidden'>Cargando página...</span>
    </Spinner>
  );
}
