async function searchRecipes(searchInput, lim = -1) {
    const app_id = "5f7321b4";
    const app_key = "d65f955218f0c4028280f8702ed5df57";
    const search = `https://api.edamam.com/api/recipes/v2?type=public&q=${searchInput}&app_id=${app_id}&app_key=${app_key}`
    const recipeContainer = document.getElementById("recipeContainer")
    try {
        const response = await fetch(search);
        if (!response.ok) {
            throw new Error(`Status: ${response.status}`);
        }

        const data = await response.json();

        for (const x of data.hits) {
            const recipeHTML = createRecipeBox(element);
            recipeContainer.innerText += recipeHTML;
            lim--;
            if (lim == 0) {
                break;
            }
        }
    } catch (error) {
        console.log("Error:", error);
    }
}


function createRecipeBox(recipe) {
    const htmlRecipeBox = `
    <a href="${recipe.recipe.url}">
        <div style="width: 80%, margin-left:10%, margin-right:10%">
            <h2> ${recipe.recipe.label}</h2>
            <div>
            <img src="${recipe.recipe.image}" alt="Image of ${recipe.recipe.label}" style="float:right"> </img>
            <p> Servings: ${recipe.recipe.yield}</p>
            <p> Calories: ${recipe.recipe.calories}</p>
            </div>
        </div>
    </a>
    `;
    return htmlRecipeBox;
}



document.getElementById('addButton').addEventListener('click', function(event) {
    const inputField = document.querySelector('input[type="search"]');
    const ingredient = inputField.value.trim();

    if (ingredient) {
        createTag(ingredient);
        inputField.value = ''; // Clear the input field
    }
});

function createTag(ingredient) {
    const tagsContainer = document.getElementById('tagsContainer');

    // Create the tag element
    const tagElement = document.createElement('span');
    tagElement.className = 'badge text-bg-secondary tag me-2 d-flex align-items-center'; // Add your existing styles
    tagElement.textContent = ingredient; // Set the tag text

    // Create the delete button
    const deleteButton = document.createElement('button');
    deleteButton.textContent = '×'; // Use '×' as the delete button
    deleteButton.className = 'btn-close btn-close-white btn-sm ms-1'; // Bootstrap close button
    deleteButton.ariaLabel = 'Close';

    deleteButton.addEventListener('click', function() {
        tagElement.remove(); // Remove the tag on button click
    });

    tagElement.appendChild(deleteButton); // Append the delete button to the tag
    tagsContainer.appendChild(tagElement); // Append the tag to the tags container
    
}

function getRequest(){
    const tagsContainer = document.getElementById("tagsContainer");
    const ingredients = []
    const spans = tagsContainer.querySelectorAll("span");
    spans.forEach(span => {
        ingredients.push(span.textContent);
    });
    const final_string = ingredients.join(', ')
    console.log(final_string)
    searchRecipes(final_string)
    
}


document.getElementById('SearchButton').addEventListener('click', function(event) {
    const inputField = document.querySelector('input[type="search"]');
    const ingredient = inputField.value.trim();

    if (ingredient) {
        getRequest();
        inputField.value = ''; // Clear the input field
    }
});