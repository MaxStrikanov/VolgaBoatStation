'use strict'

const actualDate = document.getElementById('actual-date');
const options = {day: 'numeric', month: 'numeric',  year: 'numeric' };
actualDate.textContent = new Date().toLocaleDateString("ru-RU", options); 



