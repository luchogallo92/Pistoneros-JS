
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
                <span>Precio: ${precio}</span>
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

// Renderizado en la cart
const renderProductsInsideCart = (cartProduct) => {
    const { id, marca, precio, producto, img, quantity } = cartProduct;
    return `
    <div class="cart-item">
        <img src="${img}" alt="${producto}">
        <div class="product-info">
            <h3>${marca}</h3>
            <span id="text-undrg">${producto}</span>
            <h4>${precio}</h4>
        </div>
        <div class="item-handler">
            <button class="buttons-handlers" data-id="${id}" id="item-handler-plus">+</button>
            <span id="quantity-number">${quantity}</span>
            <button class="buttons-handlers" data-id="${id}" id="item-handler-minus">-</button>
        </div>
    </div>`;
}

const renderInCart = () => {
    if (!cart.lenght) {
        noHayProductos.classList.toggle ('hidden')
        cartmenu.style.display = 'flex'
    }
    const renderCartElement = document.querySelector('.render-cart');
    renderCartElement.innerHTML = cart.map(renderProductsInsideCart).join('');
}

// Funciones del Cart
let cart = [];

const cartFunctions = ({ target }) => {
    if (!target.classList || !target.classList.contains('add-to-cart-from-card')) return;
    const product = createProductData(target.dataset);
    alert('Producto agregado al carrito');
    console.log(product);
    if (isExistingProduct(product)) {
        alert('Unidad agregada al carrito');
        addUnitProduct(product);
    } else {
        createProductInCart(product);
    }
    renderInCart();
}

// Función para agregar unidad en el carro
const addUnitProduct = (product) => { 
    let alertShown = false; // Variable para controlar si el alerta ya se mostró

    cart = cart.map(cartProduct => {
        if (cartProduct.id === product.id) {
            const updatedProduct = {...cartProduct, quantity: cartProduct.quantity + 1};
            // Mostrar alerta solo si no se ha mostrado antes
            if (!alertShown) {
                alert("Unidad agregada al carrito!");
                alertShown = true; // Marcar que el alerta ha sido mostrado
            }
            return updatedProduct;
        } else {
            return cartProduct;
        }
    });

    renderInCart(); // Volver a renderizar el carrito después de actualizar la cantidad
}

// Función para crear el objeto en el carro
const createProductInCart = (product) => {
    cart = [...cart, {...product, quantity: 1}];
}

// Función para agregar unidad si existe 
const isExistingProduct = (product) => {
    return cart.find(item => item.id === product.id);
}

// Convertir a objeto
const createProductData = (dataset) => {
    return {
        id: dataset.id,
        marca: dataset.marca,
        precio: dataset.precio,
        producto: dataset.producto,
        img: dataset.img, // Cambié cardImg a img para mantener consistencia
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
        renderInCart();
    }
});

// Función para decrementar unidad en el carro
const subtractUnitProduct = (product) => {
    cart = cart.map(cartProduct =>
        cartProduct.id === product.id ?
        {...cartProduct, quantity: cartProduct.quantity - 1} :
        cartProduct
    ).filter(cartProduct => cartProduct.quantity > 0);
}


////----Init Function----////
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
}

init ();