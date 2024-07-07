//Cart
const cartcheckbox = document.getElementById ('cart-checkbox')
const cartmenu = document.querySelector ('.cart-products')

///Carrito////
const renderCart = document.querySelector('.render-cart');
const buttonBuy = document.getElementById ('button-buy')
const buttonEmpty = document.getElementById ('button-empty')

//Adding to cart
const addtocart = document.querySelector ('.add-to-cart-from-card')

//No hay productos en el carrito
const tusProductos = document.getElementById ('your-products')
const noHayProductos = document.getElementById ('text-undrg')

//Total Shop
const totalshop = document.querySelector ('.total-shop')


///==================================
///Funciones del Cart
///==================================

// Carrito vacío
let cart = JSON.parse(localStorage.getItem('cart')) || [];

const saveCartInLocalStorage = () => {
    localStorage.setItem('cart', JSON.stringify(cart));
}

// Renderizado en el carrito
const renderProductsInsideCart = (cartProduct) => {
    const { id, marca, precio, producto, img, quantity } = cartProduct;
    return `
    <div class="cart-item">
        <img src="${img}" alt="${producto}">
        <div class="product-info">
            <h3>${marca}</h3>
            <span id="text-undrg">${producto}</span>
            <h4>$${precio}</h4>
        </div>
        <div class="item-handler">
            <button class="buttons-handlers" data-id="${id}" id="item-handler-plus">+</button>
            <span id="quantity-number">${quantity}</span>
            <button class="buttons-handlers" data-id="${id}" id="item-handler-minus">-</button>
        </div>
    </div>
    `;
}

const renderInCart = () => { 
    if (!cart.length) {
        hiddenObjectsCart();
    } else {
        showObjectsCart();
    }
    renderCart.innerHTML = cart.map(renderProductsInsideCart).join('');
    showTotalCart();
    updateCartButtons();
}

//Elementos del cart
const hiddenObjectsCart = () => {
    noHayProductos.classList.remove('hidden')
    cartmenu.style.display = 'none';
    buttonBuy.style.display = 'none'
    buttonEmpty.style.display = 'none'
    totalshop.style.display = 'none' 
    tusProductos.style.display = 'none'
}

const showObjectsCart = () => {
        noHayProductos.classList.add('hidden');
        cartmenu.style.display = 'flex';
        buttonBuy.style.display = 'block'
        buttonEmpty.style.display = 'block'
        totalshop.style.display = 'block' 
        tusProductos.style.display = 'block'
}

// Funciones del carrito
const cartFunctions = ({ target }) => {
    if (!target.classList || !target.classList.contains('add-to-cart-from-card')) return;
    const product = createProductData(target.dataset);
    alert('Producto agregado al carrito');
    if (isExistingProduct(product)) {
        alert('Unidad agregada al carrito');
        addUnitProduct(product);
    } else {
        createProductInCart(product);
    }
    saveCartInLocalStorage();
    renderInCart();
}

// Función para agregar unidad en el carrito
const addUnitProduct = (product) => {
    cart = cart.map(cartProduct => {
        if (cartProduct.id === product.id) {
            return { ...cartProduct, quantity: cartProduct.quantity + 1 };
        } else {
            return cartProduct;
        }
    });
    saveCartInLocalStorage();
    renderInCart();
}

// Función para crear el objeto en el carrito
const createProductInCart = (product) => {
    cart = [...cart, { ...product, quantity: 1 }];
    saveCartInLocalStorage();
}

// Función para verificar si el producto ya existe en el carrito
const isExistingProduct = (product) => {
    return cart.find(item => item.id === product.id);
}

// Convertir a objeto
const createProductData = (dataset) => {
    return {
        id: dataset.id,
        marca: dataset.marca,
        precio: parseFloat(dataset.precio),
        producto: dataset.producto,
        img: dataset.img,
    };
}

document.addEventListener('click', (event) => {
    const { target } = event;
    if (target.id === 'item-handler-plus' || target.id === 'item-handler-minus') {
        const id = target.dataset.id;
        const product = cart.find(item => item.id === id);
        if (target.id === 'item-handler-plus') {
            addUnitProduct(product);
        } else {
            subtractUnitProduct(product);
        }
        saveCartInLocalStorage();
        renderInCart();
    }
});

// Función para decrementar unidad en el carrito
const subtractUnitProduct = (product) => {
    cart = cart.map(cartProduct =>
        cartProduct.id === product.id ?
        { ...cartProduct, quantity: cartProduct.quantity - 1 } :
        cartProduct
    ).filter(cartProduct => cartProduct.quantity > 0);

    saveCartInLocalStorage();
    renderInCart();
}

// Funciones para mostrar el total del carrito
const showTotalCart = () => {
    totalshop.innerHTML = `Total: $${getCartTotal()} Ars`;
    if (cart.length) {
        totalshop.classList.remove('hidden');
        totalshop.style.display = 'block';
    } else if (!cart.length) {
        totalshop.classList.add('hidden');
    }
}

//Suma y resta del carrito
const getCartTotal = () => {
    if (!cart || cart.length === 0) return 0;
    return cart.reduce((acc, cur) => acc + Number.parseFloat(cur.precio) * cur.quantity, 0);
}

// Gracias por su compra
const fullCart = () => {
    const total = getCartTotal();
    cart = [];
    alert('¡Muchas gracias por su compra! 🎉');
    if (total > 10000) {
        alert('¡Te has ganado el envío gratis!');
    }
    updateCartState();
}

//Vaciado de carrito
const emptyListCart = () => {
    if (window.confirm ('Desea vaciar el carrito?')) {
        alert ('El carrito se ha vaciado!')
        cart = []
    }
    updateCartState();
}

// Llamar actualización del carrito al inicio
const updateCartState = () => {
    saveCartInLocalStorage();
    showTotalCart();
    renderInCart();
}

//Actualiza solo los botones
const updateCartButtons = () => {
    saveCartInLocalStorage();
    showTotalCart();
}