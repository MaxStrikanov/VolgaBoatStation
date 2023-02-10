'use strict'

const actualDate = document.getElementById('actual-date');
const options = {day: 'numeric', month: 'numeric',  year: 'numeric' };
actualDate.textContent = new Date().toLocaleDateString("ru-RU", options); 


const toggleMenu = () => {
	const menu = document.querySelector('.mobile-menu');
	menu.classList.toggle('active');
}


