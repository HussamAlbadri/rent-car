'use strict';

let cars = [];

// In This Step We Are Checking If there are a data into the local storage, If yes we will get this item
if (localStorage.getItem('cars')) {
    let localStorageData = JSON.parse(localStorage.getItem('cars'));
    for (let i = 0; i < localStorageData.length; i++) {
        new car(localStorageData[i].customer, localStorageData[i].model, localStorageData[i].price);
    }
}

// Constructor Section
function car(customer, model, price) {
    this.customer = customer;
    this.model = model;
    this.price = getRandomNumber(1000, 10000);
    cars.push(this);
}

// This function used to calculate the price randomly
function getRandomNumber(max, min) {
    let random = Math.random();
    random = (random * (max - min + 1)) + min;
    random = Math.floor(random);
    return random;
}

let form = document.getElementById('car-form');

form.addEventListener('submit', addNewCar);

function addNewCar(event) {
    event.preventDefault();

    let customet = document.getElementById('customer');

    let customer = event.target.customer.value;
    let model = event.target.model.value;

    let carOb = new car(customer, model, 0);
    carOb.render();
    allPrices();

    // Setting The Local Storage
    localStorage.setItem('cars', JSON.stringify(cars))
}

let table = document.getElementById('results');

function tableHeader() {
    let header = ['customer name', 'car model', 'price'];

    let headerRow = document.createElement('tr');
    table.appendChild(headerRow);

    for (let i = 0; i < header.length; i++) {
        let column = document.createElement('th');
        column.textContent = header[i];
        headerRow.appendChild(column);
    }
}
tableHeader();


// Content
car.prototype.render = function() {
    let row = document.createElement('tr');
    table.appendChild(row);

    let firstCell = document.createElement('td');
    firstCell.textContent = this.customer;
    row.appendChild(firstCell);

    let secondCell = document.createElement('td');
    secondCell.textContent = this.model;
    row.appendChild(secondCell);

    let thirdCell = document.createElement('td');
    thirdCell.textContent = this.price;
    row.appendChild(thirdCell);
}

function allPrices() {
    let total = 0;

    for (let i = 0; i < cars.length; i++) {
        total += cars[i].price;
    }

    let p = document.getElementById('price');
    p.textContent = 'The Total Price Is:  ' + total;
}

function display() {
    for (let i = 0; i < cars.length; i++) {
        cars[i].render();
        allPrices();
    }
}
allPrices();
display();