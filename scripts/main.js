const nav = document.getElementById('side-nav');
const navToggle = document.getElementById('nav-toggle');
const mainContent = document.querySelector('main');

navToggle.addEventListener('click', () => {
    nav.classList.toggle('closed');

    if (nav.classList.contains('closed')) {
        mainContent.classList.add('shifted');
    } else {
        mainContent.classList.remove('shifted');
    }
});

const recipeForm = document.getElementById('recipe-form');
const addedRecipes = JSON.parse(localStorage.getItem('myRecipes')) || [];

if (recipeForm) {
    recipeForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const newRecipe = {
            name: document.getElementById('name').value,
            description: document.getElementById('description').value,
            ingredients: document.getElementById('ingredients').value.split('\n').filter(line => line.trim() !== ""),
            directions: document.getElementById('directions').value.split('\n').filter(line => line.trim() !== ""),
            id: Date.now()
        };
        addedRecipes.push(newRecipe);

        localStorage.setItem('myRecipes', JSON.stringify(addedRecipes));
        window.location.href = 'list.html';
    });
}

const recipeListContainer = document.querySelector('.red-bg ul');

if (recipeListContainer) {
    addedRecipes.forEach(recipe => {
        const li = document.createElement('li');
        const link = document.createElement('a');

        link.href = `view-new-recipe.html?id=${recipe.id}`;
        link.textContent = recipe.name;
        
        li.appendChild(link);
        recipeListContainer.appendChild(li);
    });
}

const urlParams = new URLSearchParams(window.location.search);
const recipeId = urlParams.get('id');

const recipeName = document.getElementById('recipe-name');
if (recipeName) {
    const recipe = addedRecipes.find(r => r.id == recipeId);
 
    if (recipe) {
        document.getElementById('recipe-name').textContent = recipe.name;
        document.title = recipe.name;

        const desc = document.getElementById('recipe-desc');
        if (desc) {
            desc.textContent = recipe.description;
        }

        const ingredientsContainer = document.getElementById('new-ingredients');
        recipe.ingredients.forEach(item => {
            const li = document.createElement('li');
            li.textContent = item;
            ingredientsContainer.appendChild(li);
        });

        const directionsContainer = document.getElementById('new-directions');
        recipe.directions.forEach(step => {
            const li = document.createElement('li');
            li.textContent = step;
            directionsContainer.appendChild(li);
        });
    } else {
        document.getElementById('recipe-template').innerHTML = `
            <div id="error-container">
                <h1>Not Found!</h1>
                <a href="new-recipe.html" id="error-link">Add the recipe to your collection</a>
            </div>
        `;

        document.body.style.height = '100vh';
    }
}
