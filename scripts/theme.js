let themeToggleButton = document.getElementById('themeToggle');

let currentTheme = localStorage.getItem('currentTheme');

if (currentTheme != true && currentTheme != "dark") {
    currentTheme = localStorage.setItem('currentTheme', 'light');
    currentTheme = "light";
}

themeToggleButton.addEventListener('click', () => {
    changeTheme();
});

// ****************************************
// COLORS LEGEND
// ****************************************

// Light theme
let light_background = "#ffffff";

let light_h1 = "#2f4f4f";
let light_h3 = "#2f4f4f";
let light_h4 = "#2f4f4f";
let light_h5 = "#2f4f4f";
let light_h6 = "#2f4f4f";

let light_p = "#000000";

let light_li = "#000000";
let light_a = "#708090";
let light_icon = "#708090";

let light_hr = "-webkit-linear-gradient(left,#fff,#bcbcbc,#fff)";

let light_pre = '#F8F9FA';
let light_code = '#000000';

let light_card = "#ffffff";
let light_btn_background = "#f8f9fa";

// Dark Theme
let dark_background = "#181A1B";

let dark_h1 = "#B8D4D4";
let dark_h3 = "#B8D4D4";
let dark_h4 = "#B8D4D4";
let dark_h5 = "#B8D4D4";
let dark_h6 = "#B7B2A7";

let dark_p = "#DAD7D2";

let dark_li = "#DAD7D2";
let dark_a = "#B7B2A7";
let dark_icon = "#B8D4D4";

let dark_hr = "-webkit-linear-gradient(left, rgb(24, 26, 27), rgb(43, 46, 48), rgb(24, 26, 27))";

let dark_pre = '#1D1F20';
let dark_code = '#ffffff';

let dark_card = "#1D1F20";
let dark_btn_background = "#181A1B";

// ****************************************

loadTheme();

function changeTheme() {
    let newIcon;
    let newText;

    if (currentTheme == 'light') {
        currentTheme = 'dark';
        newText = 'Switch to light theme';
        newIcon = 'lightbulb';
    } else {
        currentTheme = 'light';
        newText = 'Switch to dark theme';
        newIcon = 'moon';
    }

    localStorage.setItem('currentTheme', currentTheme);
    let code = '<h6><b><em><i class=\"fas fa-' + newIcon + '\"></i> ' + newText + '</em></b></h6>';

    themeToggleButton.innerHTML = code;

    updateVisuals();
}

function loadTheme() {
    let newIcon;
    let newText;

    if (currentTheme == 'light') {
        newText = 'Switch to dark theme';
        newIcon = 'moon';
    } else {
        newText = 'Switch to light theme';
        newIcon = 'lightbulb';
    }

    localStorage.setItem('currentTheme', currentTheme);
    let code = '<h6><b><em><i class=\"fas fa-' + newIcon + '\"></i> ' + newText + '</em></b></h6>';

    themeToggleButton.innerHTML = code;

    updateVisuals();
}

function updateElementColorTo(element, color) {
    let elements = document.getElementsByTagName(element);
    for (let i = 0; i < elements.length; i++) {
        elements[i].style.color = color;
    }
}

function updateElementBackgroundTo(element, background) {
    let elements = document.getElementsByTagName(element);
    for (let i = 0; i < elements.length; i++) {
        elements[i].style.backgroundColor = background;
    }
}

function updateElementClassBackgroundTo(element, background) {
    let elements = document.getElementsByClassName(element);
    for (let i = 0; i < elements.length; i++) {
        elements[i].style.backgroundColor = background;
    }
}

function updateElementClassColorTo(element, color) {
    let elements = document.getElementsByClassName(element);
    for (let i = 0; i < elements.length; i++) {
        elements[i].style.color = color;
    }
}

function updateElementClassBackgroundImageTo(element, value) {
    let elements = document.getElementsByClassName(element);
    for (let i = 0; i < elements.length; i++) {
        elements[i].style.background = value;
    }
}

function updateVisuals() {
    if (currentTheme == "dark") {
        updateElementColorTo('h1', dark_h1);
        updateElementColorTo('h3', dark_h3);
        updateElementColorTo('h4', dark_h4);
        updateElementColorTo('h5', dark_h5);
        updateElementColorTo('h6', dark_h6);

        updateElementColorTo('p', dark_p);

        updateElementColorTo('li', dark_li);
        updateElementColorTo('a', dark_a);
        updateElementClassColorTo('archive-link', dark_a);
        updateElementColorTo('i', dark_icon);

        updateElementBackgroundTo('body', dark_background);
        updateElementClassBackgroundImageTo('style14', dark_hr);

        updateElementClassBackgroundTo('code-block', dark_pre);
        updateElementColorTo('code', dark_code);

        // Game pages
        updateElementClassBackgroundTo('card', dark_card);
        updateElementClassBackgroundTo('btn-light', dark_btn_background);
        updateElementClassColorTo('btn-light', dark_h1);

        updateElementClassBackgroundTo('pageNumber', dark_card);

        updateElementClassColorTo('platform-icon', dark_a);
        updateElementClassBackgroundTo('platform-icon', dark_background);

    } else if (currentTheme == "light") {
        updateElementColorTo('h1', light_h1);
        updateElementColorTo('h3', light_h3);
        updateElementColorTo('h4', light_h4);
        updateElementColorTo('h5', light_h5);
        updateElementColorTo('h6', light_h6);

        updateElementColorTo('p', light_p);

        updateElementColorTo('li', light_li);
        updateElementColorTo('a', light_a);
        updateElementClassColorTo('archive-link', light_a);
        updateElementColorTo('i', light_icon);

        updateElementBackgroundTo('body', light_background);
        updateElementClassBackgroundImageTo('style14', light_hr);

        updateElementClassBackgroundTo('code-block', light_pre);
        updateElementColorTo('code', light_code);

        // Game pages
        updateElementClassBackgroundTo('card', light_card);
        updateElementClassBackgroundTo('btn-light', light_btn_background);
        updateElementClassColorTo('btn-light', light_h1);

        updateElementClassBackgroundTo('pageNumber', light_card);

        updateElementClassColorTo('platform-icon', light_a);
        updateElementClassBackgroundTo('platform-icon', light_background);
    }

    updateElementClassColorTo('pageNumber', "#808080");
    updateElementClassColorTo('portrait-description', "#ffffff");
    setGrayscaleFooterIcons(currentTheme);
}

function setGrayscaleFooterIcons(theme) {
    let icons = document.getElementsByClassName("footer-icon");
    for (let i = 0; i < icons.length; i++) {
        if (theme == "light") {
            icons[i].style.filter = "grayscale(0%)";
        } else if (theme == "dark") {
            icons[i].style.filter = "grayscale(100%)";
        }
    }
}

updateVisuals();