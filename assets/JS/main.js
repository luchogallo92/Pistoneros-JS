
///==================================
/// Seccion del HEADER
///==================================
//menu
const menunav = document.getElementById ('menu-checkbox')
const listnav = document.querySelector ('.list-container')

//login
const loguser = document.querySelector ('.login-box-open')
const user = document.getElementById ('username')


//Favourites
// const favbutton = document.getElementById ('fav-checkbox')
// const favbox = document.querySelector ('.favourite-box')



/////////Funciones/////////

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

///==================================================
///====== Muchas Gracias equipo de NUCBA!! ==========
///==================================================