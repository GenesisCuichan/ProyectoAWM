import Card from "react-bootstrap/Card"; //Diseño de cartas
import Button from "react-bootstrap/Button";// Diseño de botones
import { Link } from "react-router-dom"; //Importar libreria para navegacion de paginas
import Rating from "./Rating";//Usuario envie la calificacion del producto
import axios from "axios";// importar axios
import { useContext } from "react"; // Importar React
import { Store } from "../Store"; // Importar store

// se observa las cartas de los productos
function Producto(props) {
  const { product } = props;

  const { state, dispatch: ctxDispatch } = useContext(Store);
  const {
    cart: { cartItems },
  } = state;
// Aagrega la carta y selecciona el producto correspondiente
  const addToCartHandler = async (item) => {
    const existItem = cartItems.find((x) => x._id === product._id);
    const quantity = existItem ? existItem.quantity + 1 : 1;
    const { data } = await axios.get(`/api/products/${item._id}`);
    if (data.countInStock < quantity) {
      window.alert(
        "Lo sentimos. Por el momento este producto se encuentra fuera de Stock"
      );
      return;
    }
    ctxDispatch({
      type: "CART_ADD_ITEM",
      payload: { ...item, quantity },
    });
  };
//Retorna el nombre e imagen del producto para agregar al carrito
  return (
    <Card>
      <Link to={`/product/${product.slug}`}>
        <img src={product.image} className='card-img-top' alt={product.name} />
      </Link>
      <Card.Body>
        <Link to={`/product/${product.slug}`}>
          <Card.Title>{product.name}</Card.Title>
        </Link>
        <Rating rating={product.rating} numReviews={product.numReviews} />
        <Card.Text>${product.price}</Card.Text>
        {product.countInStock === 0 ? (
          <Button variant='light' disabled>
            Sin stock
          </Button>
        ) : (
          <Button onClick={() => addToCartHandler(product)}>
            Añadir al carrito
          </Button>
        )}
      </Card.Body>
    </Card>
  );
}
export default Producto;
