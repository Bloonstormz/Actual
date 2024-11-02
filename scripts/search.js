const ingredientInput = document.getElementById('ingredient');
const addButton = document.getElementById('addButton');
const ingredientTags = document.getElementById('ingredientTags');
const searchRecipesButton = document.getElementById('searchRecipesButton');

let ingredients = []; // Array to store ingredient values

// Function to add ingredient as a tag
function addTag() {
	const ingredient = ingredientInput.value.trim();
	if (ingredient !== '' && !ingredients.includes(ingredient)) { // Ensure unique ingredients
		const tag = document.createElement('span');
		tag.className = 'tag';
		tag.textContent = ingredient;

		// Remove button (X) for each tag
		const removeButton = document.createElement('span');
		removeButton.className = 'remove-tag';
		removeButton.innerHTML = '&times;';
		removeButton.onclick = () => removeTag(tag, ingredient);

		tag.appendChild(removeButton);
		ingredientTags.appendChild(tag);
		ingredients.push(ingredient); // Add ingredient to array
		ingredientInput.value = ''; // Clear input field
	}
}

// Function to remove an ingredient tag and update the ingredients array
function removeTag(tag, ingredient) {
	tag.remove();
	ingredients = ingredients.filter(item => item !== ingredient); // Remove from array
}

// Event listener for add button
addButton.addEventListener('click', addTag);

// Event listener for pressing "Enter" key
ingredientInput.addEventListener('keypress', function (event) {
	if (event.key === 'Enter') {
		event.preventDefault(); // Prevent form submission
		addTag();
	}
});

// Function to simulate an API request with the ingredients array
// function searchRecipes() {
// 	if (ingredients.length > 0) {
// 		console.log("Sending API request with ingredients:", ingredients);
// 		// Example API request logic here
// 		// fetch(`https://api.example.com/recipes?ingredients=${ingredients.join(',')}`)
// 		//     .then(response => response.json())
// 		//     .then(data => console.log(data));
//      // Go through all the hits and use createRecipeBox()
// 	} else {
// 		console.log("No ingredients added.");
// 	}
// }

function createRecipeBox(recipe) {
    const htmlRecipeBox = `
    <a href="${recipe.recipe.url}">
        <div style="width: 80%, margin-left:10%, margin-right:10%">
            <h2> ${recipe.recipe.label}</h2>
            <div>
            <img src="${element.recipe.image}" alt="Image of ${element.recipe.label}" style="float:right"> </img>
            <p> Servings: ${recipe.recipe.yield}</p>
            <p> Calories: ${recipe.recipe.calories}</p>
            </div>
        </div>
    </a>
    `
    return htmlRecipeBox
}

// Event listener for the search button
searchRecipesButton.addEventListener('click', searchRecipes);
