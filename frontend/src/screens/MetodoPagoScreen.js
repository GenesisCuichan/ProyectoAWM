import React, { useContext, useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { useNavigate } from "react-router-dom";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import PasosCheckout from "../components/PasosCheckout";
import { Store } from "../Store";

// Pantalla de metodos de pago
export default function MetodoPagoScreen() {
  const navigate = useNavigate();
  const { state, dispatch: ctxDispatch } = useContext(Store);
  const {
    cart: { shippingAddress, paymentMethod },
  } = state;

  const [paymentMethodName, setPaymentMethod] = useState(
    paymentMethod || "Efectivo"
  );

  useEffect(() => {
    if (!shippingAddress.address) {
      navigate("/shipping");
    }
  }, [shippingAddress, navigate]);
  const submitHandler = (e) => {
    e.preventDefault();
    ctxDispatch({ type: "SAVE_PAYMENT_METHOD", payload: paymentMethodName });
    localStorage.setItem("paymentMethod", paymentMethodName);
    navigate("/placeorder");
  };
  return (
    <div>
      <PasosCheckout step1 step2 step3></PasosCheckout>
      <div className='container small-container'>
        <Helmet>
          <title>Método de pago</title>
        </Helmet>
        <h1 className='my-3'>Método de pago</h1>
        <Form onSubmit={submitHandler}>
          <div className='mb-3'>
            <Form.Check
              type='radio'
              id='Efectivo'
              label='Efectivo al momento de la entrega'
              value='Efectivo contraentrega'
              checked={paymentMethodName === "Efectivo"}
              onChange={(e) => setPaymentMethod(e.target.value)}
            />
          </div>
          <div className='mb-3'>
            <Form.Check
              type='radio'
              id='transferencia'
              label='Transferencia Bancaria'
              value='transferencia'
              checked={paymentMethodName === "transferencia"}
              onChange={(e) => setPaymentMethod(e.target.value)}
            />
          </div>
          <div className='mb-3'>
            <Button type='submit'>Continuar</Button>
          </div>
        </Form>
      </div>
    </div>
  );
}
