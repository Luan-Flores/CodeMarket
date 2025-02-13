import header from './headerComp.js';

document.addEventListener('DOMContentLoaded', () => {
    const headerElement = document.querySelector('header');
    headerElement.innerHTML = header();
});