import express from 'express'; //Librería para Express
import expressAsyncHandler from 'express-async-handler'; //Librería para uso de Express de manera asincrónica
import Order from '../models/orderModel.js'; //Librería del componente Models - OrderModel
import User from '../models/userModel.js'; //Librería del componente Models - UserModel
import Product from '../models/productModel.js'; //Librería del componente Models - ProductModel
import { isAuth, isAdmin, mailgun, payOrderEmailTemplate } from '../utils.js'; //Librería de Utils

//Llamada de Express
const orderRouter = express.Router();

//Petición de la orden 
orderRouter.get(
  '/',
  isAuth,
  isAdmin,
  expressAsyncHandler(async (req, res) => {
    const orders = await Order.find().populate('user', 'name');
    res.send(orders);
  })
);

//Respuesta de la orden
orderRouter.post(
  '/',
  isAuth,
  expressAsyncHandler(async (req, res) => {
    const newOrder = new Order({
      orderItems: req.body.orderItems.map((x) => ({ ...x, product: x._id })),
      shippingAddress: req.body.shippingAddress,
      paymentMethod: req.body.paymentMethod,
      itemsPrice: req.body.itemsPrice,
      shippingPrice: req.body.shippingPrice,
      taxPrice: req.body.taxPrice,
      totalPrice: req.body.totalPrice,
      user: req.user._id,
    });

    const order = await newOrder.save();
    res.status(201).send({ message: 'Nueva Orden Creada', order });
  })
);

//Petición de la Orden Acumulada
orderRouter.get(
  '/summary',
  isAuth,
  isAdmin,
  expressAsyncHandler(async (req, res) => {
    //Agregar Orden
    const orders = await Order.aggregate([
      {
        $group: {
          _id: null,
          numOrders: { $sum: 1 },
          totalSales: { $sum: '$totalPrice' },
        },
      },
    ]);
    //Agregar Usuario
    const users = await User.aggregate([
      {
        $group: {
          _id: null,
          numUsers: { $sum: 1 },
        },
      },
    ]);
    //Agregar pedidos diarios
    const dailyOrders = await Order.aggregate([
      {
        $group: {
          _id: { $dateToString: { format: '%Y-%m-%d', date: '$createdAt' } },
          orders: { $sum: 1 },
          sales: { $sum: '$totalPrice' },
        },
      },
      { $sort: { _id: 1 } },
    ]);
    //Agregar categorías de Productos
    const productCategories = await Product.aggregate([
      {
        $group: {
          _id: '$category',
          count: { $sum: 1 },
        },
      },
    ]);
    res.send({ users, orders, dailyOrders, productCategories });
  })
);

//Petición de la Orden propia
orderRouter.get(
  '/mine',
  isAuth,
  expressAsyncHandler(async (req, res) => {
    const orders = await Order.find({ user: req.user._id });
    res.send(orders);
  })
);

//Petición de la orden del usuario
orderRouter.get(
  '/:id',
  isAuth,
  expressAsyncHandler(async (req, res) => {
    const order = await Order.findById(req.params.id);
    if (order) {
      res.send(order);
    } else {
      res.status(404).send({ message: 'Orden No Encontrada' });
    }
  })
);

//Obtención de la orden del usuario
orderRouter.put(
  '/:id/deliver',
  isAuth,
  expressAsyncHandler(async (req, res) => {
    const order = await Order.findById(req.params.id);
    if (order) {
      order.isDelivered = true;
      order.deliveredAt = Date.now();
      await order.save();
      res.send({ message: 'Orden Entregada' });
    } else {
      res.status(404).send({ message: 'Orden No Encontrada' });
    }
  })
);

//Obtención de la orden de pago del usuario
orderRouter.put(
  '/:id/pay',
  isAuth,
  expressAsyncHandler(async (req, res) => {
    const order = await Order.findById(req.params.id).populate(
      'user',
      'email name'
    );
    if (order) {
      order.isPaid = true;
      order.paidAt = Date.now();
      order.paymentResult = {
        id: req.body.id,
        status: req.body.status,
        update_time: req.body.update_time,
        email_address: req.body.email_address,
      };

      const updatedOrder = await order.save();
      mailgun()
        .messages()
        .send(
          {
            from: 'Farmacia Vitality <far_vitality@mg.yourdomain.com>',
            to: `${order.user.name} <${order.user.email}>`,
            subject: `Nueva orden ${order._id}`,
            html: payOrderEmailTemplate(order),
          },
          (error, body) => {
            if (error) {
              console.log(error);
            } else {
              console.log(body);
            }
          }
        );

      res.send({ message: 'Orden Pagada', order: updatedOrder });
    } else {
      res.status(404).send({ message: 'Orden No Encontrada' });
    }
  })
);

//Borrar Orden del Usuario
orderRouter.delete(
  '/:id',
  isAuth,
  isAdmin,
  expressAsyncHandler(async (req, res) => {
    const order = await Order.findById(req.params.id);
    if (order) {
      await order.remove();
      res.send({ message: 'Orden Borrada' });
    } else {
      res.status(404).send({ message: 'Orden No Encontrada' });
    }
  })
);

export default orderRouter;
