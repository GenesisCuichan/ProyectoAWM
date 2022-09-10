import bcrypt from "bcryptjs"; //Cifrado Blowfish para cifrar contraseñas

//Variable para cargar los datos
const data = {
  users: [
    {
      //Cuenta Administrador
      name: "Jean",
      email: "admin@example.com",
      password: bcrypt.hashSync("123456"),
      isAdmin: true,
    },
    {
      //Cuenta Cliente
      name: "Jorge",
      email: "user@example.com",
      password: bcrypt.hashSync("123456"),
      isAdmin: false,
    },
  ],
  products: [
    {
      // _id: '1',
      name: "Cabestrillo Adulto",
      slug: "cabestrillo-adulto",
      category: "Ortopedia",
      image:
        "https://res.cloudinary.com/dvjnqwzpc/image/upload/v1658376506/farmacia%20products/1_cabestrillo_adulto_e8act4.png", // 679px × 829px
      price: 7,
      countInStock: 10,
      brand: "HomeCare",
      rating: 4.5,
      numReviews: 10,
      description: "Producto de alta calidad",
    },
    {
      // _id: '2',
      name: "Cabestrillo Infantil",
      slug: "cabestrillo-infantil",
      category: "Ortopedia",
      image:
        "https://res.cloudinary.com/dvjnqwzpc/image/upload/v1658376506/farmacia%20products/2_cabestrillo_inf_g0ugey.png",
      price: 7,
      countInStock: 5,
      brand: "HomeCare",
      rating: 4.0,
      numReviews: 10,
      description: "Producto de alta calidad",
    },
    {
      // _id: '3',
      name: "Dafilon (sutura tipo Nylon)",
      slug: "dafilon",
      category: "Insumos Medicos",
      image:
        "https://res.cloudinary.com/dvjnqwzpc/image/upload/v1658376506/farmacia%20products/3_dafilon_sutura_nxvvdi.png",
      price: 6,
      countInStock: 25,
      brand: "HomeCare",
      rating: 4.5,
      numReviews: 14,
      description: "Producto de alta calidad",
    },
    {
      // _id: '4',
      name: "Estetoscopio",
      slug: "estetoscopio",
      category: "Insumos Medicos",
      image:
        "https://res.cloudinary.com/dvjnqwzpc/image/upload/v1658376506/farmacia%20products/4_estetoscopio_mcampa.png",
      price: 15,
      countInStock: 4,
      brand: "Spirit",
      rating: 4.5,
      numReviews: 10,
      description: "Producto de alta calidad",
    },
    {
      // _id: '5',
      name: "Muletas Adulto",
      slug: "muletas-adulto",
      category: "Ortopedia",
      image:
        "https://res.cloudinary.com/dvjnqwzpc/image/upload/v1658376506/farmacia%20products/5_muletas_xtj9gs.png",
      price: 17,
      countInStock: 4,
      brand: "Ergotech",
      rating: 4,
      numReviews: 20,
      description: "Producto de alta calidad",
    },
    {
      // _id: '6',
      name: "Mulgatol Jalea 100G",
      slug: "mulgatol-jalea",
      category: "Vitaminas",
      image:
        "https://res.cloudinary.com/dvjnqwzpc/image/upload/v1658376506/farmacia%20products/6_mulgatol_vitamina6_cw0wfl.png",
      price: 10,
      countInStock: 10,
      brand: "Mulgatol",
      rating: 4.5,
      numReviews: 15,
      description: "Producto de alta calidad",
    },
    {
      // _id: '7',
      name: "Sundown Kids Sundown Naturals Kids Pixar Toy Story 4",
      slug: "sundown-kids",
      category: "Vitaminas",
      image:
        "https://res.cloudinary.com/dvjnqwzpc/image/upload/v1658376507/farmacia%20products/7_multivitamina_infantil_kf1lci.png",
      price: 30,
      countInStock: 3,
      brand: "Sundown",
      rating: 3.5,
      numReviews: 5,
      description: "Producto de alta calidad",
    },
    {
      // _id: '8',
      name: "Oxímetro K&Y digital",
      slug: "oximetro-ky",
      category: "Insumos Medicos",
      image:
        "https://res.cloudinary.com/dvjnqwzpc/image/upload/v1658376507/farmacia%20products/8_oximetro_bpdyc3.png",
      price: 35,
      countInStock: 7,
      brand: "K&Y",
      rating: 4,
      numReviews: 15,
      description: "Producto de alta calidad",
    },
    {
      // _id: '9',
      name: "Scott emulsion multivitamínico infantil 400ml",
      slug: "scott-emulsion",
      category: "Vitaminas",
      image:
        "https://res.cloudinary.com/dvjnqwzpc/image/upload/v1658376507/farmacia%20products/9_scott_vitamina_nspz8k.png",
      price: 11,
      countInStock: 12,
      brand: "Scott",
      rating: 5,
      numReviews: 20,
      description: "Producto de alta calidad",
    },
    {
      // _id: '10',
      name: "Silla de ruedas plegable",
      slug: "silla-ruedas",
      category: "Ortopedia",
      image:
        "https://res.cloudinary.com/dvjnqwzpc/image/upload/v1658376507/farmacia%20products/10_silla_ruedas_ewp10c.png",
      price: 149,
      countInStock: 2,
      brand: "Reactiv",
      rating: 4.5,
      numReviews: 1,
      description: "Producto de alta calidad",
    },
    {
      // _id: '11',
      name: "Vicryl (sutura)",
      slug: "vicryl",
      category: "Insumos Medicos",
      image:
        "https://res.cloudinary.com/dvjnqwzpc/image/upload/v1658376507/farmacia%20products/11_vicryl_sutura_w1qtqt.png",
      price: 8,
      countInStock: 0,
      brand: "Vicryl",
      rating: 4,
      numReviews: 30,
      description: "Producto de alta calidad",
    },
  ],
};
export default data;
