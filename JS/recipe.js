const searchRecipe = document.getElementById("search-recipe");
const searchBtn = document.getElementById("search-button");
const recipeSection = document.getElementById("recipe-section");
const recipeDetails = document.getElementById("recipe-details");

const apiKey = 'da98749161094a97d0caaa27639b516d';
const apiId = '518bdf4f';

const fetchRecipe = async () => {
    try {
        const query = searchRecipe.value.trim();
        if (!query) {
            recipeSection.innerHTML = "<p>Please enter a recipe to search.</p>";
            return;
        }

        const apiUrl = `https://api.edamam.com/search?q=${encodeURIComponent(query)}&app_id=${apiId}&app_key=${apiKey}`;

        const response = await fetch(apiUrl);
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();

        if (data && data.hits && data.hits.length > 0) {
            const recipe = data.hits[0].recipe;

            recipeSection.innerHTML = `
            <h2>${recipe.label}</h2>
            <img src="${recipe.image}" alt="${recipe.label}"/>
            <p>${recipe.source}</p>
            `;

            recipeDetails.innerHTML = `
            <h3>Ingredients</h3>
            <ul>
            ${recipe.ingredientLines.map(ingredient => `<li>${ingredient}</li>`).join('')}
            </ul>
            `;
        } else {
            recipeSection.innerHTML = "<p>No recipe was found</p>";
        }

        searchRecipe.value = '';

    } catch (error) {
        console.error('Error fetching data:', error);
        recipeSection.innerHTML = "<p>Error fetching Recipe</p>";
    }
}

searchBtn.addEventListener('click', fetchRecipe);