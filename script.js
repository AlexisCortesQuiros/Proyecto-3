const main = document.getElementById('main');
const addUserBtn = document.getElementById('add-user');
const doubleBtn = document.getElementById('double');
const showMillionairesBtn = document.getElementById('show-millionaires');
const sortBtn = document.getElementById('sort');
const calculateWealthBtn = document.getElementById('calculate-wealth');

// Vector para almacenar los usuarios
let userList = [];

// Función que obtiene de la API un nombre aleatorio,
// genera una cantidad de dinero aleatoria cuyo máximo es 1.000.000
// y añade al usuario con ambos datos
async function getRandomUser() {
  let res = await fetch('https://randomuser.me/api');
  let data = await res.json();
  let user = data.results[0];

  const randomName = `${user.name.first} ${user.name.last}`;
  const randomMoney = Math.floor(Math.random() * 1000000) + 1;

  const newUser = {
    name: randomName,
    money: randomMoney
  };

  addData(newUser);
}

// TODO: Función que añade un nuevo usuario (objeto) al listado de usuarios (array)
function addData(obj) {
  userList.push(obj);
  updateDOM();
}

// TODO: Función que dobla el dinero de todos los usuarios existentes
function doubleMoney() {
  userList = userList.map(user => ({
    ...user,
    money: user.money * 2
  }));
  updateDOM();
}

// TODO: Función que ordena a los usuarios por la cantidad de dinero que tienen
function sortByRichest() {
  userList.sort((a, b) => b.money - a.money);
  updateDOM();
}

// TODO: Función que muestra únicamente a los usuarios millonarios (tienen más de 1.000.000)
function showMillionaires() {
  const millionaires = userList.filter(user => user.money > 1000000);
  userList = millionaires;
  updateDOM();
}

// TODO: Función que calcula y muestra el dinero total de todos los usuarios
function calculateWealth() {
  const totalWealth = userList.reduce((acc, user) => acc + user.money, 0);
  const wealthElement = document.createElement('div');
  wealthElement.innerHTML = `<h3>Total de Dinero: <strong>${formatMoney(totalWealth)}</strong></h3>`;
  main.appendChild(wealthElement);
}

// TODO: Función que actualiza el DOM
function updateDOM() {
  main.innerHTML = `
    <h2><strong>Persona</strong> Dinero</h2>
    ${userList.map(user => createUserElement(user)).join('')}
  `;
}

function createUserElement(user) {
  const userElement = document.createElement('div');
  userElement.classList.add('person');
  userElement.innerHTML = `<strong>${user.name}</strong> ${formatMoney(user.money)}`;
  return userElement.outerHTML;
}

// Función que formatea un número a dinero
function formatMoney(number) {
  return number.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,') + '€';
}

// Obtener un usuario al iniciar la app
getRandomUser();

// Event listeners
addUserBtn.addEventListener('click', getRandomUser);
doubleBtn.addEventListener('click', doubleMoney);
sortBtn.addEventListener('click', sortByRichest);
showMillionairesBtn.addEventListener('click', showMillionaires);
calculateWealthBtn.addEventListener('click', calculateWealth);