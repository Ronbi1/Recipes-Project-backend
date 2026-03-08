const recipes = [
    {
        id: "1",
        title: "brownies",
        description: "Brief description",
        ingredients: ["ingredient 1", "ingredient 2"],
        instructions: ["step 1", "step 2"],
        cookingTime: 30, // in minutes
        servings: 4,
        difficulty: "easy", // easy, medium, hard
        rating: 4.5,
        createdAt: "2025-01-01T00:00:00.000Z"
    },
    {
        id: "2",
        title: "shawarma",
        description: "Brief description",
        ingredients: ["ingredient 1", "ingredient 2"],
        instructions: ["step 1", "step 2"],
        cookingTime: 30, // in minutes
        servings: 4,
        difficulty: "easy", // easy, medium, hard
        rating: 4.5,
        createdAt: "2025-01-01T00:00:00.000Z"
    }
]

async function getAllRecipes(req, res) {
    try {
        res.status(200).json(recipes);
    } catch (error) {
        res.status(500).json({ message: "Error fetching recipes" });
    }
}

async function getRecipesById(req, res) {
    try {
        const recipesID = req.params.id;
        const recipe = recipes.find(r => r.id === recipesID);

        if (!recipe) {
            return res.status(404).json({ message: "Recipe not found" });
        }

        res.status(200).json(recipe);
    } catch (error) {
        res.status(500).json({ message: "Internal Server Error" });
    }
}

async function createRecipe(req, res) {
    try {
        const { title, description, ingredients, instructions, cookingTime, servings, difficulty } = req.body;
        const newRecipe = {
            id: (recipes.length + 1).toString(),
            title,
            description,
            ingredients,
            instructions,
            cookingTime,
            servings,
            difficulty,
            rating: 0,
            createdAt: new Date().toISOString()
        }

        recipes.push(newRecipe);
        res.status(201).json(newRecipe);
    } catch (error) {
        return res.status(500).json({ message: "Internal Server Error" });
    }
}

async function updateRecipe(req, res) {
    try {
        const recipeToUpDate = req.params.id;
        const indexToUpDate = recipes.findIndex(r => r.id === recipeToUpDate);

        if (indexToUpDate === -1) {
            return res.status(404).json({ message: "Recipe not found" });
        }

        const updatedRecipe = {
            ...recipes[indexToUpDate],
            ...req.body
        };
        recipes[indexToUpDate] = updatedRecipe;
        res.status(200).json(updatedRecipe);
    } catch (error) {
        res.status(500).json({ message: "Error updating recipe" });
    }

}

module.exports = {
    getAllRecipes,
    getRecipesById,
    createRecipe,
    updateRecipe
}