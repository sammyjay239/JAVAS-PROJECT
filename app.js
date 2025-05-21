

window.onload = function () {
  const name = localStorage.getItem('userName');
  const pic = localStorage.getItem('userPic');

  const welcomeMsg = document.getElementById('welcomeMessage');
  const header = document.querySelector('header.second');

  if (name && pic && welcomeMsg && header) {
    welcomeMsg.innerText = `Welcome, ${name}!`;

    const userDiv = document.createElement('div');
    userDiv.classList.add('user-info');

    const userImg = document.createElement('img');
    userImg.src = pic;
    userImg.alt = 'User Picture';

    const userName = document.createElement('span');
    userName.textContent = name;

    userDiv.appendChild(userImg);
    userDiv.appendChild(userName);
    header.appendChild(userDiv);
  }
};







async function searchRecipe() {
  const query = document.getElementById('searchInput').value;
  const res = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`);
  const data = await res.json();

  const container = document.getElementById('recipeContainer');
  container.innerHTML = '';

  if (!data.meals) {
    container.innerHTML = "<p>No recipes found.</p>";
    return; 
  }

  data.meals.forEach(meal => {
    const card = document.createElement('div');
    card.innerHTML = `
        <h3>${meal.strMeal}</h3>
        <img src="${meal.strMealThumb}" width="200"/>
        <p><strong>Instructions:</strong> ${meal.strInstructions.slice(0, 200)}...</p>
        <button onclick='bookmarkRecipe(${JSON.stringify(meal)})'>Bookmark</button>
      `;
    container.appendChild(card);
  });
}

function bookmarkRecipe(meal) {
  let bookmarks = JSON.parse(localStorage.getItem('bookmarks')) || [];
  bookmarks.push(meal);
  localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
  displayBookmarks();
}

function displayBookmarks() {
  const container = document.getElementById('bookmarksContainer');
  const bookmarks = JSON.parse(localStorage.getItem('bookmarks')) || [];
  container.innerHTML = '';
  bookmarks.forEach(meal => {
    const div = document.createElement('div');
    div.innerHTML = `<h4>${meal.strMeal}</h4><img src="${meal.strMealThumb}" width="100"/>`;
    container.appendChild(div);
  });
}

window.onload = displayBookmarks;
async function searchRecipe() {
  const query = document.getElementById('searchInput').value;
  const res = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`);
  const data = await res.json();

  const container = document.getElementById('recipeContainer');
  container.innerHTML = '';

  if (!data.meals) {
    container.innerHTML = "<p>No recipes found.</p>";
    return;
  }

  data.meals.forEach(meal => {
    const card = document.createElement('div');
    card.className = 'recipe-card';

    const ingredients = [];
    for (let i = 1; i <= 20; i++) {
      const ingredient = meal[`strIngredient${i}`];
      const measure = meal[`strMeasure${i}`];
      if (ingredient) ingredients.push(`${ingredient} - ${measure}`);
    }

    card.innerHTML = `
        <h3>${meal.strMeal}</h3>
        <img src="${meal.strMealThumb}" />
        <p><strong>Ingredients:</strong><br>${ingredients.slice(0, 5).join('<br>')}</p>
        <p><strong>Instructions:</strong><br>${meal.strInstructions.slice(0, 150)}...</p>
        <button onclick='bookmarkRecipe(${JSON.stringify(meal)})'>Bookmark</button>
      `;
    container.appendChild(card);
  });
}

function bookmarkRecipe(meal) {
  let bookmarks = JSON.parse(localStorage.getItem('bookmarks')) || [];
  if (!bookmarks.find(b => b.idMeal === meal.idMeal)) {
    bookmarks.push(meal);
    localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
  }
  displayBookmarks();
}

function displayBookmarks() {
  const container = document.getElementById('bookmarksContainer');
  const bookmarks = JSON.parse(localStorage.getItem('bookmarks')) || [];
  container.innerHTML = '';
  bookmarks.forEach(meal => {
    const div = document.createElement('div');
    div.className = 'recipe-card';
    div.innerHTML = `
        <h3>${meal.strMeal}</h3>
        <img src="${meal.strMealThumb}" />
      `;
    container.appendChild(div);
  });
}

window.onload = displayBookmarks;


// 


























