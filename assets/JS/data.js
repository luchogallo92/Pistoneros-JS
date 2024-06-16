const products_data = 
[
    {
        id: 1,
        marca: "Volkswagen",
        producto: "Block de Motor",
        precio: "$568722",
        categoria: "Mecanica",
        cardimg: "./assets/products/motorblock.jpg"
    },
    {
        id: 2,
        marca: "Volkswagen",
        producto: "Leva de motor",
        precio: "$432844",
        categoria: "Mecanica",
        cardimg: "./assets/products/levas.jpg"
    },
    {
        id: 3,
        marca: "Volkswagen",
        producto: "Valvulas",
        precio: "$35688",
        categoria: "Mecanica",
        cardimg: "./assets/products/valvulas.jpg"
    },
    {
        id: 4,
        marca: "Volkswagen",
        producto: "Piston de cilindro",
        precio: "$350905",
        categoria: "Mecanica",
        cardimg: "./assets/products/piston.jpg"
    },
    {
        id: 5,
        marca: "Volkswagen",
        producto: "Juego de juntas",
        precio: "$116012",
        categoria: "Mecanica",
        cardimg: "./assets/products/juntas.jpg"
    },
    {
        id: 6,
        marca: "Volkswagen",
        producto: "Correa de distribución",
        precio: "$25689",
        categoria: "Mecanica",
        cardimg: "./assets/products/correa.jpg"
    },
    {
        id: 7,
        marca: "Volkswagen",
        producto: "Alternador",
        precio: "$498566",
        categoria: "Electronica",
        cardimg: "./assets/products/alternador.jpg"
    },
    {
        id: 8,
        marca: "Volkswagen",
        producto: "Bateria",
        precio: "$154630",
        categoria: "Electronica",
        cardimg: "./assets/products/bateria.jpg"
    },
    {
        id: 9,
        marca: "Volkswagen",
        producto: "Fusilera",
        precio: "$236780",
        categoria: "Electronica",
        cardimg: "./assets/products/fusilera.jpg"
    },
    {
        id: 10,
        marca: "Blaupunkt",
        producto: "Combo Stereo con Parlantes",
        precio: "$146200",
        categoria: "Audio",
        cardimg: "./assets/products/Blaupunkt+stereo.jpg"
    },
    {
        id: 11,
        marca: "Blaupunkt",
        producto: "Stereo",
        precio: "$82350",
        categoria: "Audio",
        cardimg: "./assets/products/stereo1.jpg"
    },
    {
        id: 12,
        marca: "Blaupunkt",
        producto: "Par de Parlantes",
        precio: "$67320",
        categoria: "Audio",
        cardimg: "./assets/products/parlantes1.jpg"
    },
    {
        id: 13,
        marca: "Mercury",
        producto: "Par de Parlantes",
        precio: "$26980",
        categoria: "Audio",
        cardimg: "./assets/products/parlantes2.jpg"
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