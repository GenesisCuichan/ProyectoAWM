import React, { useState } from "react"; // Importar REACT
import Button from "react-bootstrap/Button"; // Importar diseño de botones
import Form from "react-bootstrap/Form"; // Importar diseño de formularios
import InputGroup from "react-bootstrap/InputGroup";
import FormControl from "react-bootstrap/FormControl";
import { useNavigate } from "react-router-dom";

// Busqueda por el textbox del inicio
export default function BusquedaBox() {
  const navigate = useNavigate();
  const [query, setQuery] = useState("");
  const submitHandler = (e) => {
    e.preventDefault(); //Para evitar q la pagina se recargue
    navigate(query ? `/search/?query=${query}` : "/search");
  };
// DEVUELVE EL PRODCUTO
  return (
    <Form className='d-flex me-auto' onSubmit={submitHandler}>
      <InputGroup>
        <FormControl
          type='text'
          name='q'
          id='q'
          onChange={(e) => setQuery(e.target.value)}
          placeholder='Buscar productos...'
          aria-label='Search Products'
          aria-describedby='button-search'
        ></FormControl>
        <Button variant='outline-primary' type='submit' id='button-search'>
          <i className='fas fa-search'></i>
        </Button>
      </InputGroup>
    </Form>
  );
}
