import Alert from "react-bootstrap/Alert"; // Diseño de alertas

// Mandar alertas con informacion
export default function MessageBox(props) {
  return <Alert variant={props.variant || "info"}>{props.children}</Alert>;
}
