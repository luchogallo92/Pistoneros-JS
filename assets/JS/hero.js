const hero_images = [
    {
        id: 2,
        img: "./assets/hero_images/BAN2-02.png"
    },
    {
        id: 3,
        img: "./assets/hero_images/BAN3-03.png"
    },
    {
        id: 4,
        img: "./assets/hero_images/BAN4-04.png"
    },
    {
        id: 5,
        img: "./assets/hero_images/BAN5-05.png"
    },
    {
        id: 1,
        img: "./assets/hero_images/BAN1-01.png"
    },
]

///==================================
/// Seccion del Hero
///==================================

const hero = document.querySelector ('.hero')

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