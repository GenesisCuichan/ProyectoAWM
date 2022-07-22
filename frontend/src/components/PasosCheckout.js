import React from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

export default function PasosCheckout(props) {
  return (
    <Row className='checkout-steps'>
      <Col className={props.step1 ? "active" : ""}>Iniciar sesión</Col>
      <Col className={props.step2 ? "active" : ""}>Envío</Col>
      <Col className={props.step3 ? "active" : ""}>Pago</Col>
      <Col className={props.step4 ? "active" : ""}>Realizar pedido</Col>
    </Row>
  );
}
