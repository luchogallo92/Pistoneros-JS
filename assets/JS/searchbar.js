///==================================
///seccion de Search bar
///==================================

const searchBarInput = document.getElementById ('search-filter')
const searchBarContainer = document.querySelector ('.search-bar-container')
const infoSearchBar = document.querySelector ('.info-search-bar')

///========================================
///Funciones de renderizado del Search bar
///========================================

let flagSearch = false;

const filterSearchBar = () => {
    const searchBar = searchBarInput.value.toLowerCase().trim();

    if (!searchBar.length) {
        console.log('entro')
        searchBarContainer.style.display = 'none';
        infoSearchBar.innerHTML = '';
        flagSearch && (cardsproducts.innerHTML = products_data.map(templatecreator).join(''))
    } else {
        searchBarContainer.style.display = 'flex';

        const resultsSearch = products_data.filter(producto =>
            producto.producto.toLowerCase().includes(searchBar)
        );

        if (!resultsSearch.length === 0) {
            infoSearchBar.innerHTML = 'No se encuentra el producto';
        } else {
            infoSearchBar.innerHTML = '';
            mostrarResultados(resultsSearch);
            flagSearch = true;
        }
    }
};

const renderingResults = (result) => {
    const { id, marca, producto } = result;
    return `
        <div class="search-text">
            <a onclick="activeSelection('${id}')" class="searchSelection"><p>${marca}</p><span>${producto}</span></a>
        </div>
    `;
};

const mostrarResultados = (resultsSearch) => {
    infoSearchBar.innerHTML = resultsSearch.map(renderingResults).join('');
};

const activeSelection = (id) => {
    cardsproducts.innerHTML ='';
    const selectedProduct = products_data.filter(product => product.id === Number(id));
    productrendering (selectedProduct)
};