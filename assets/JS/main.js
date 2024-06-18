
//menu
const menunav = document.getElementById ('menu-checkbox')
const listnav = document.querySelector ('.list-container')

//login
const loguser = document.querySelector ('.login-box-open')
const user = document.getElementById ('username')

//Cart
const cartcheckbox = document.getElementById ('cart-checkbox')
const cartmenu = document.querySelector ('.cart-products')

//Favourites
const favbutton = document.getElementById ('fav-checkbox')
const favbox = document.querySelector ('.favourite-box')

//Llamado a los filtros
const filtercalling = document.querySelectorAll ('.filter-product-category')

//renderizado de las cards
const cardsproducts = document.querySelector ('.products_container')

//ShowmoreBtn
const ShowmoreBtn = document.getElementById ('show-more-bttn')
const finalmessage = document.querySelector ('.final-message')

//categorias
const categoryContainer = document.querySelector ('.filter-products')

//Adding to cart
const addtocart = document.querySelector ('.add-to-cart-from-card')

//No hay productos en el carrito
const noHayProductos = document.getElementById ('text-undrg')

//Total Shop
const totalshop = document.querySelector ('.total-shop')

/////////Funciones/////////

// Funcion para reiniciar los checkboxes
const CheckboxesReset = (currentCheckbox) => {
    const checkboxes = [menunav, user, cartcheckbox, favbutton];
    checkboxes.forEach(checkbox => {
        if (checkbox !== currentCheckbox) {
            checkbox.checked = false;
            updateDisplay(checkbox);
        }
    });
};

const updateDisplay = (checkbox) => {
    switch (checkbox) {
        case menunav:
            listnav.style.display = checkbox.checked ? 'flex' : 'none';
            break;
        case user:
            loguser.style.display = checkbox.checked ? 'flex' : 'none';
            break;
        case cartcheckbox:
            cartmenu.style.display = checkbox.checked ? 'flex' : 'none';
            break;
        case favbutton:
            favbox.style.display = checkbox.checked ? 'flex' : 'none';
            break;
    }
};

///==================================
///Funciones de renderizado de cards
///==================================
//Creator template
const templatecreator = (product) => {
    const { id, marca, producto, precio, cardimg } = product;
    return `
    <div class="card-container" ${id}>
            <div class="image-card">
                <img src= ${cardimg} alt=${producto}>
            </div>
            <div class="info-card">
                <h4>${marca}</h4>
                <span>${producto}</span>
                <span>Precio: $${precio}</span>
            <button class="add-to-cart-from-card"
            data-id="${id}"
            data-marca="${marca}"
            data-producto="${producto}"
            data-precio="${precio}"
            data-img="${cardimg}">Agregar al carrito
            <!--<box-icon name='bookmark'color='#ffffff' class="save-user"></box-icon> 
            <box-icon name='bookmark' type='solid' color='#ffffff' class="save-user-solid"></box-icon> --> 
            </button>
        </div>
    </div>
    `
};

//Renderizado de las cards
const productrendering = (products) => {
    cardsproducts.innerHTML += products.map(templatecreator).join('')
}

//Funcion de ver mas
const moreCardsRendering = () => {
    appState.currentProductsIndex += 1
   let { products, currentProductsIndex, productsLimit } = appState
   productrendering (products[currentProductsIndex],productsLimit)
   
   if (currentProductsIndex === productsLimit -1) {
    ShowmoreBtn.style.display = 'none'
   }
   if (currentProductsIndex === productsLimit -1) {
    finalmessage.style.display = 'flex'
   }
}

//Filtrado
const changeFilter = (btn) => {
    appState.activeFilter = btn.dataset.category
}

//Funcion de categorias
const applyFilterCategories = (e) => {
    changeFilter(e.target)
    cardsproducts.innerHTML ='';
    if (appState.activeFilter) {
        const filterSelected = products_data.filter (product => product.categoria === appState.activeFilter)
        productrendering (filterSelected)
        appState.currentProductsIndex = 0;
        return
    }
    productrendering.appState.products = [0]
}

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
    const renderCartElement = document.querySelector('.render-cart');
    if (!cart.length) {
        noHayProductos.classList.remove('hidden');
        cartmenu.style.display = 'none'; 
    } else {
        noHayProductos.classList.add('hidden');
        cartmenu.style.display = 'flex';
    }
    renderCartElement.innerHTML = cart.map(renderProductsInsideCart).join('');
    showTotalCart();
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

// Event listener para manejar incremento y decremento de cantidades
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

const getCartTotal = () => {
    if (!cart) return 0;
    return cart.reduce((acc, cur) => acc + Number.parseInt(cur.precio) * cur.quantity, 0);
}

// Llamar actualización del carrito al inicio
const updateCartState = () => {
    saveCartInLocalStorage();
    showTotalCart();
    renderInCart();
}

///==================================
///Funciones del INIT
///==================================

const init = () => {
    ///checkboxes
    window.addEventListener('scroll', CheckboxesReset);

    menunav.addEventListener('change', () => {
        CheckboxesReset(menunav);
        updateDisplay(menunav);
    });
    user.addEventListener('change', () => {
        CheckboxesReset(user);
        updateDisplay(user);
    });
    cartcheckbox.addEventListener('change', () => {
        CheckboxesReset(cartcheckbox);
        updateDisplay(cartcheckbox);
    });
    favbutton.addEventListener('change', () => {
        CheckboxesReset(favbutton);
        updateDisplay(favbutton);
    });
    
    ///Categorias
    productrendering (appState.products[0])
    ShowmoreBtn.addEventListener ('click', moreCardsRendering)
    categoryContainer.addEventListener ('click', applyFilterCategories)

    ///Cart
    cardsproducts.addEventListener ('click', cartFunctions)
    document.addEventListener('DOMContentLoaded', renderInCart())
    document.addEventListener ('DOMContentLoaded', showTotalCart())
   
}

init ();