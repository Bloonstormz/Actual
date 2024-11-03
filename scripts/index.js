	

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

	// Function to add to tags
	function addTag() {
		const inputField = document.querySelector('input[type="search"]');
		const ingredient = inputField.value.trim();

		if (ingredient) {
			createTag(ingredient);
			inputField.value = ""; // Clear the input field
		}
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


	// On click function to add tags via click or enter key pressed
	document.getElementById("addButton").onclick = addTag;
	document.querySelector('input[type="search"]').addEventListener("keydown", (event) => event.key === "Enter" && addTag(event));


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
		localStorage.setItem("savedIngridients", JSON.stringify(ingredients));
		
	}

	// Onclick Function to search for the recipes, and save input ingridients
	document.getElementById("searchButton").onclick = () => {
		let values = getRequest();
		localStorage.setItem("searchValue", values);
		getIngridients;


		window.location.href = "pages/search.html";
	};
