///==================================
/// seccion de FILTROS
///==================================
//Llamado a los filtros
const filtercalling = document.querySelectorAll ('.filter-product-category')
const filterBtn = document.querySelectorAll ('.filter-btn')

///==================================
///Funciones de renderizado de categorias
///==================================

//Filtrado
const changeFilter = (btn) => {
    appState.activeFilter = btn.dataset.category
}

//Funcion de categorias
const applyFilterCategories = (e) => {
    changeFilter(e.target);
    cardsproducts.innerHTML ='';
    const products = (appState.activeFilter !== "Todos") 
    ? products_data.filter (product => product.categoria === appState.activeFilter)
    : products_data.map(p => p);
    productrendering (products);
    appState.currentProductsIndex = 0;
    return;
}
