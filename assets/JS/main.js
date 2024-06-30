///==================================
/// Seccion del Hero
///==================================

const hero = document.querySelector ('.hero')

///==================================
/// Seccion del HEADER
///==================================
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
// const favbutton = document.getElementById ('fav-checkbox')
// const favbox = document.querySelector ('.favourite-box')

///==================================
///seccion de Search bar
///==================================

const searchBarInput = document.getElementById ('search-filter')
const searchBarContainer = document.querySelector ('.search-bar-container')
const infoSearchBar = document.querySelector ('.info-search-bar')


///==================================
/// seccion de FILTROS
///==================================
//Llamado a los filtros
const filtercalling = document.querySelectorAll ('.filter-product-category')
const filterBtn = document.querySelectorAll ('.filter-btn')

///==================================
/// Seccion de CARDS y CARRITO
///==================================

//renderizado de las cards
const cardsproducts = document.querySelector ('.products_container')

//ShowmoreBtn
const ShowmoreBtn = document.getElementById ('show-more-bttn')
const finalmessage = document.querySelector ('.final-message')

//categorias
const categoryContainer = document.querySelector ('.filter-products')

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

/////////Funciones/////////

///==================================
/// Funcion para cambiar el Hero
///==================================

let intervalHero = 5000
let imgIndex = 0

const backgroundChanger = (imagen) => {
    const { id, img } = imagen;
    return `
        <img src="${img}" alt="" id="${id}">
    `;
};

const heroChange = () => {

    for (let i = 0; i < hero_images.length; i++) {
        setTimeout(() => {
            const img = backgroundChanger(hero_images[i]);
            hero.innerHTML = img;

            setTimeout(() => {
                hero.querySelector('img').classList.add('active');
            }, 50);
        }, i * intervalHero);
    }

    setTimeout(heroChange, hero_images.length * intervalHero);
}

///==================================
/// Funcion para reiniciar los checkboxes
///==================================

const CheckboxesReset = (currentCheckbox) => {
    const checkboxes = [menunav, user, cartcheckbox];
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
        // case favbutton:
        //     favbox.style.display = checkbox.checked ? 'flex' : 'none';
        //     break;
    }
};

///========================================
///Funciones de renderizado del Search bar
///========================================

const filterSearchBar = () => {
    const searchBar = searchBarInput.value.toLowerCase().trim();
    let resultsSearch = [];
    
    if (!searchBar.length) {
        searchBarContainer.style.display = 'none';
    } else if (searchBar.length) {
        searchBarContainer.style.display = 'flex';
  
  
      resultsSearch = products_data.filter(producto =>
        producto.producto.toLowerCase().includes(searchBar)
      );

      if (resultsSearch.length === 0) {
        infoSearchBar.innerHTML = 'No se encuentra el producto';
      } else {
        infoSearchBar.innerHTML = '';
        mostrarResultados(resultsSearch);
      }
    }
  
    return resultsSearch;
  };

const renderingResults = (result) => {
    const {marca,producto} = result
        return `
            <div class="search-text">
               <a class="searchSelection"><p>${marca}</p><span>${producto}</span></a>
            </div>
            `
        }

 const mostrarResultados = (resultsSearch) => {
    infoSearchBar.innerHTML = resultsSearch.map(renderingResults).join('')
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

///==================================
///Funciones de renderizado de categorias
///==================================

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

///==================================
///Funciones del INIT
///==================================

const init = () => {
    ///hero
    document.addEventListener('DOMContentLoaded',heroChange())

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
    // favbutton.addEventListener('change', () => {
    //     CheckboxesReset(favbutton);
    //     updateDisplay(favbutton);
    // });

    ///Search bar
    searchBarInput.addEventListener ('input',filterSearchBar)
    
    ///Categorias
    productrendering (appState.products[0])
    ShowmoreBtn.addEventListener ('click', moreCardsRendering)
    categoryContainer.addEventListener ('click', applyFilterCategories)

    ///Cart
    cardsproducts.addEventListener ('click', cartFunctions)
    buttonBuy.addEventListener('click', fullCart)
    buttonEmpty.addEventListener ('click', emptyListCart)
    document.addEventListener('DOMContentLoaded', renderInCart())
    document.addEventListener ('DOMContentLoaded', showTotalCart())
   
}

init ();

///==================================
///====== Muchas Gracias!! ==========
///==================================