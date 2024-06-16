
//menu
const menunav = document.getElementById ('menu-checkbox')
const listnav = document.querySelector ('.list-container')

//login
const loguser = document.querySelector ('.login-box-open')
const user = document.getElementById ('username')

//Cart
const cart = document.getElementById ('cart-menu')
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

//RenderCart
const rendercart = document.querySelector ('.render-cart')

//Adding to cart
const addtocart = document.querySelectorAll ('.add-to-cart-from-card')


/////////Funciones/////////

// Funcion para reiniciar los checkboxes
const CheckboxesReset = (currentCheckbox) => {
    const checkboxes = [menunav, user, cart, favbutton];
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
        case cart:
            cartmenu.style.display = checkbox.checked ? 'flex' : 'none';
            break;
        case favbutton:
            favbox.style.display = checkbox.checked ? 'flex' : 'none';
            break;
    }
};


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
            <button class="add-to-cart-from-card" onclick='cartfunctions()'
            
            data-id = '${id}'
            data-marca = '${marca}'
            data-producto = '${producto}'
            data-precio = '${precio}'
            data-img = '${cardimg}'
            
            >Agregar al carrito
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

//Funciones del Cart
let cartWithProducts = []

const cartfunctions = () => {
    alert ('wololo')
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
    cart.addEventListener('change', () => {
        CheckboxesReset(cart);
        updateDisplay(cart);
    });
    favbutton.addEventListener('change', () => {
        CheckboxesReset(favbutton);
        updateDisplay(favbutton);
    });
    
    ///Categorias
    productrendering (appState.products[0])
    ShowmoreBtn.addEventListener ('click', moreCardsRendering)
    categoryContainer.addEventListener ('click', applyFilterCategories)
}

init ();