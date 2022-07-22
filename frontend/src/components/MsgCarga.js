import Spinner from "react-bootstrap/Spinner";

export default function MsgCarga() {
  return (
    <Spinner animation='border' role='status'>
      <span className='visually-hidden'>Cargando página...</span>
    </Spinner>
  );
}
