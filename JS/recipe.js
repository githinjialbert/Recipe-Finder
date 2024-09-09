const searchRecipe = document.getElementById("search-recipe");
const searchBtn = document.getElementById("search-button");
const recipeSection = document.getElementById("recipe-section");



const fetchRecipe = async (query = "chicken") => {  
    try {
        if (!query.trim()) {
            recipeSection.innerHTML = "<p>Please enter a recipe to search.</p>";
            return;
        }

        const apiUrl = `https://api.edamam.com/search?q=${encodeURIComponent(query)}&app_id=${apiId}&app_key=${apiKey}&from=0&to=9`;
        const response = await fetch(apiUrl);

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();

        if (data && data.hits && data.hits.length > 0) {
            let recipesHtml = '';

            data.hits.forEach(hit => {
                const recipe = hit.recipe;
                recipesHtml += `
                <div class="recipe-item">
                    <h2>${recipe.label}</h2>
                    <img src="${recipe.image}" alt="${recipe.label}" />
                    <p>${recipe.source}</p>
                    <h3>Ingredients</h3>
                    <ul>
                        ${recipe.ingredientLines.map(ingredient => `<li>${ingredient}</li>`).join('')}
                    </ul>
                </div>`;
            });

            recipeSection.innerHTML = recipesHtml;
        } else {
            recipeSection.innerHTML = "<p>No recipes were found.</p>";
        }

        searchRecipe.value = '';

    } catch (error) {
        console.error('Error fetching data:', error);
        recipeSection.innerHTML = "<p>Error fetching recipes.</p>";
    }
};


searchBtn.addEventListener('click', () => fetchRecipe(searchRecipe.value));

window.addEventListener('DOMContentLoaded', () => fetchRecipe());
