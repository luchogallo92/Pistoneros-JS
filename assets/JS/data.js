const products_data = 
[
    {
        id: 1,
        marca: "Volkswagen",
        producto: "Block de Motor",
        precio: 4358,
        categoria: "Mecanica",
        cardimg: "./assets/products/motorblock.jpg"
    },
    {
        id: 2,
        marca: "Volkswagen",
        producto: "Leva de motor",
        precio: 2275,
        categoria: "Mecanica",
        cardimg: "./assets/products/levas.jpg"
    },
    {
        id: 3,
        marca: "Volkswagen",
        producto: "Valvulas",
        precio: 1793,
        categoria: "Mecanica",
        cardimg: "./assets/products/valvulas.jpg"
    },
    {
        id: 4,
        marca: "Volkswagen",
        producto: "Piston de cilindro",
        precio: 1694,
        categoria: "Mecanica",
        cardimg: "./assets/products/piston.jpg"
    },
    {
        id: 5,
        marca: "Volkswagen",
        producto: "Juego de juntas",
        precio: 673,
        categoria: "Mecanica",
        cardimg: "./assets/products/juntas.jpg"
    },
    {
        id: 6,
        marca: "Volkswagen",
        producto: "Correa de distribución",
        precio: 516,
        categoria: "Mecanica",
        cardimg: "./assets/products/correa.jpg"
    },
    {
        id: 7,
        marca: "Volkswagen",
        producto: "Alternador",
        precio: 1025,
        categoria: "Electronica",
        cardimg: "./assets/products/alternador.jpg"
    },
    {
        id: 8,
        marca: "Moura",
        producto: "Bateria",
        precio: 392,
        categoria: "Electronica",
        cardimg: "./assets/products/bateria.jpg"
    },
    {
        id: 8,
        marca: "Bosch",
        producto: "Bateria",
        precio: 547,
        categoria: "Electronica",
        cardimg: "./assets/products/bateria.jpg"
    },
    {
        id: 8,
        marca: "Willard",
        producto: "Bateria",
        precio: 261,
        categoria: "Electronica",
        cardimg: "./assets/products/bateria.jpg"
    },
    {
        id: 9,
        marca: "Volkswagen",
        producto: "Fusilera",
        precio: 404,
        categoria: "Electronica",
        cardimg: "./assets/products/fusilera.jpg"
    },
    {
        id: 10,
        marca: "Blaupunkt",
        producto: "Combo Stereo con Parlantes",
        precio: 3643,
        categoria: "Audio",
        cardimg: "./assets/products/Blaupunkt+stereo.jpg"
    },
    {
        id: 11,
        marca: "Blaupunkt",
        producto: "Stereo",
        precio: 1269,
        categoria: "Audio",
        cardimg: "./assets/products/stereo1.jpg"
    },
    {
        id: 12,
        marca: "Blaupunkt",
        producto: "Par de Parlantes",
        precio: 1865,
        categoria: "Audio",
        cardimg: "./assets/products/parlantes1.jpg"
    },
    {
        id: 13,
        marca: "Mercury",
        producto: "Par de Parlantes",
        precio: 1265,
        categoria: "Audio",
        cardimg: "./assets/products/parlantes2.jpg"
    },
    {
        id: 14,
        marca: "Renault",
        producto: "Block de Motor",
        precio: 4358,
        categoria: "Mecanica",
        cardimg: "./assets/products/motorblock.jpg"
    },
    {
        id: 15,
        marca: "Renault",
        producto: "Leva de motor",
        precio: 2275,
        categoria: "Mecanica",
        cardimg: "./assets/products/levas.jpg"
    },
    {
        id: 16,
        marca: "Renault",
        producto: "Valvulas",
        precio: 1793,
        categoria: "Mecanica",
        cardimg: "./assets/products/valvulas.jpg"
    },
    {
        id: 17,
        marca: "Renault",
        producto: "Piston de cilindro",
        precio: 1694,
        categoria: "Mecanica",
        cardimg: "./assets/products/piston.jpg"
    },
    {
        id: 18,
        marca: "Renault",
        producto: "Juego de juntas",
        precio: 673,
        categoria: "Mecanica",
        cardimg: "./assets/products/juntas.jpg"
    },
    {
        id: 19,
        marca: "Renault",
        producto: "Correa de distribución",
        precio: 516,
        categoria: "Mecanica",
        cardimg: "./assets/products/correa.jpg"
    },
    {
        id: 20,
        marca: "Renault",
        producto: "Alternador",
        precio: 1025,
        categoria: "Electronica",
        cardimg: "./assets/products/alternador.jpg"
    },
    {
        id: 21,
        marca: "Renault",
        producto: "Fusilera",
        precio: 404,
        categoria: "Electronica",
        cardimg: "./assets/products/fusilera.jpg"
    },
]


const divideproducts = (size) => {
    let productsList = []

    for (let i = 0; i < products_data.length; i += size) {
        productsList.push(products_data.slice(i, i + size))
    }

    return productsList
}

const PRODUCT_DIVIDER = 8;

const appState = {
    products: divideproducts(PRODUCT_DIVIDER),
    currentProductsIndex: 0,
    productsLimit: divideproducts(PRODUCT_DIVIDER).length,
    activeFilter: null,
}