let root = document.documentElement;
const buttonLight = document.querySelector('.light')
const buttonDark = document.querySelector('.dark')
const lightColor = '#F9F9F9';
const darkColor = '#14161F'
const lightBorder = 'rgba(255, 255, 255, 0.2)'
const darkBorder = 'rgba(0, 0, 0, .2)'


const changeColorDark = (el) => {
    el.addEventListener('click', () => {
        root.style.setProperty('--first-color', darkColor)
        root.style.setProperty('--second-color', lightColor)
        root.style.setProperty('--border-color', lightBorder)
    })
}

const changeColorLight = (el) => {
    el.addEventListener('click', () => {
        root.style.setProperty('--first-color', lightColor)
        root.style.setProperty('--second-color', darkColor)
        root.style.setProperty('--border-color', darkBorder)
    })
}


changeColorDark(buttonDark);
changeColorLight(buttonLight);