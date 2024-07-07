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


///==================================
///Funciones de renderizado de cards
///==================================

//Creator template
const templatecreator = (product) => {
    const { id, marca, producto, precio, cardimg } = product;
    return `
    <div class="card-container" id="${id}">
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
