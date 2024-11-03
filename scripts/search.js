const ingredientInput = document.getElementById("ingredient");
const addButton = document.getElementById("addButton");
const ingredientTags = document.getElementById("ingredientTags");
const searchRecipesButton = document.getElementById("searchRecipesButton");

let ingredients = localStorage.getItem("searchValue"); // Array to store ingredient values

// Search for the recipies
async function searchRecipes(searchInput, lim = -1) {
	const app_id = "5f7321b4";
	const app_key = "d65f955218f0c4028280f8702ed5df57";
	const search = `https://api.edamam.com/api/recipes/v2?type=public&q=${searchInput}&app_id=${app_id}&app_key=${app_key}`;

	try {
		const response = await fetch(search);
		if (!response.ok) {
			throw new Error(`Status: ${response.status}`);
		}

		const data = await response.json();
		return data; // This line returns the promise result
	} catch (error) {
		console.log("Error:", error);
	}
}

// Get the recipe and return as data
async function getRecipes() {
	try {
		const data = await searchRecipes(ingredients);
		if (data) {
			console.log(data);
			addListing(data);
		} else {
			console.log("No data returned.");
		}
	} catch (error) {
		console.error("Error fetching recipes:", error);
	}
}

function addListing(data) {
	data.hits.forEach((element) => {
		console.log(element);
		document.querySelector("#resultBox").innerHTML += `
    <div class="col">
        <div class="card shadow-sm">
            <img class="bd-placeholder-img card-img-top" src="${element.recipe.image}" width="300px" height="300px" />
            <div class="card-body">
            <p class="card-text">${element.recipe.label}</p>
            <div class="d-flex justify-content-between align-items-center">
                <small class="text-body-secondary">9 mins</small>
                <button class="btn btn-outline-success see-more-btn" onclick="getInfo('${element._links.self.href}')">See More.</button>
            </div>
            </div>
        </div>
    </div>
    `;
	});
}

// Event listener for the search button
if (ingredients) {
	data = getRecipes();
}

// Function to get info about certain recipe
function getInfo(element) {
	localStorage.setItem("itemInfo", element);
	window.location.href = "../pages/recipe.html";
}





function addTag() {
	const inputField = document.querySelector('input[type="search"]');
	const ingredient = inputField.value.trim();

	if (ingredient) {
		createTag(ingredient);
		inputField.value = ""; // Clear the input field
	}
}

// Gets ingridients form tags
function getIngridients(){
	const tagsContainer = document.getElementById("tagsContainer");
	const ingredients = [];
	const spans = tagsContainer.querySelectorAll("span");
	spans.forEach((span) => {
		const ingredient = span.textContent.replace("×", "").trim();
		ingredients.push(ingredient);
	});
	saved_ingredients = ingredients;
	localStorage.setItem("savedIngridients", ingredients);
}

// Function to create tags
function createTag(ingredient) {
	const tagsContainer = document.getElementById("tagsContainer");

	// Create the tag element
	const tagElement = document.createElement("span");
	tagElement.className = "badge text-bg-secondary tag me-2 d-flex align-items-center rounded-pill"; // Add your existing styles
	tagElement.textContent = ingredient; // Set the tag text

	// Create the delete button
	const deleteButton = document.createElement("button");
	deleteButton.textContent = "×"; // Use '×' as the delete button
	deleteButton.className = "btn-close btn-close-light btn-sm ms-1"; // Bootstrap close button
	deleteButton.ariaLabel = "Close";

	deleteButton.addEventListener("click", function () {
		tagElement.remove(); // Remove the tag on button click
	});

	tagElement.appendChild(deleteButton); // Append the delete button to the tag
	tagsContainer.appendChild(tagElement); // Append the tag to the tags container
}


async function Retrieve(){

	
	let savedIngredients = localStorage.getItem("savedIngridients");
	if(savedIngredients){
		const ingredientTags = JSON.parse(savedIngredients);
		console.log(ingredientTags);	
		ingredientTags.forEach(element => {
			createTag(element);
		});
	}

};

// On click function to add tags via click or enter key pressed
document.getElementById("addButton").onclick = addTag;
document.querySelector('input[type="search"]').addEventListener("keydown", (event) => event.key === "Enter" && addTag(event));

// Function to get all tags
function getRequest() {
	const tagsContainer = document.getElementById("tagsContainer");
	const ingredients = [];
	const spans = tagsContainer.querySelectorAll("span");
	spans.forEach((span) => {
		const ingredient = span.textContent.replace("×", "").trim();
		ingredients.push(ingredient);
	});

	const final_string = ingredients.join(", ");
	return final_string;
}

document.getElementById("searchButton").onclick = () => {
	let values = getRequest();
	localStorage.setItem("searchValue", values);
	getIngridients();


	window.location.href = "search.html";
};