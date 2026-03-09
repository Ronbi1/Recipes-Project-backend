const { v4: uuidv4 } = require('uuid');

async function getAllRecipes(req, res, next) {
    try {
        const recipes = await readRecipes();
        const { difficulty, maxCookingTime, search } = req.query;
        let filteredRecipes = recipes;

        if (difficulty) {
            filteredRecipes = filteredRecipes.filter(r => r.difficulty === difficulty);
        }
        if (maxCookingTime) {
            const numCookingTime = Number(maxCookingTime);
            filteredRecipes = filteredRecipes.filter(r => r.cookingTime <= numCookingTime);
        }
        if (search) {
            const searchTerm = search.toLowerCase();
            filteredRecipes = filteredRecipes.filter(r => r.title.toLowerCase().includes(searchTerm) || r.description.toLowerCase().includes(searchTerm))
        }

        res.status(200).json(filteredRecipes);
    } catch (error) {
        next(error);
    }
}

async function getRecipesById(req, res, next) {
    try {
        const recipes = await readRecipes();
        const recipesID = req.params.id;
        const recipe = recipes.find(r => r.id === recipesID);

        if (!recipe) {
            const error = new Error("Recipe not found");
            error.statusCode = 404;
            return next(error);
        }

        res.status(200).json(recipe);
    } catch (error) {
        next(error);
    }
}

async function createRecipe(req, res, next) {
    try {
        const recipes = await readRecipes();
        const { title, description, ingredients, instructions, cookingTime, servings, difficulty } = req.body;
        const newRecipe = {
            id: uuidv4(),
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
        await writeRecipes(recipes);
        res.status(201).json(newRecipe);

    } catch (error) {
        next(error);
    }
}

async function updateRecipe(req, res, next) {
    try {
        const recipes = await readRecipes();
        const recipeToUpDate = req.params.id;
        const indexToUpDate = recipes.findIndex(r => r.id === recipeToUpDate);

        if (indexToUpDate === -1) {
            const error = new Error("Recipe not found")
            error.statusCode = 404;
            return next(error)
        }


        const updatedRecipe = {
            ...recipes[indexToUpDate],
            ...req.body
        };
        recipes[indexToUpDate] = updatedRecipe;
        await writeRecipes(recipes);
        res.status(200).json(updatedRecipe);
    } catch (error) {
        next(error);
    }
}

async function deleteRecipe(req, res, next) {
    try {
        const recipes = await readRecipes();
        const recipeIdToDelete = req.params.id;
        const indexOfRecip = recipes.findIndex(r => r.id === recipeIdToDelete);

        if (indexOfRecip === -1) {
            const error = new Error("Recipe not found")
            error.statusCode = 404;
            return next(error)
        }

        recipes.splice(indexOfRecip, 1);
        await writeRecipes(recipes);
        res.status(204).send();

    } catch (error) {
        next(error);
    }

}

async function getStatsRecipe(req, res, next) {
    try {
        const recipes = await readRecipes();
        let totalCookingTime = 0;
        recipes.forEach(r => totalCookingTime += r.cookingTime)
        const avg = recipes.length > 0 ? totalCookingTime / recipes.length : 0;

        const easyCount = recipes.filter(r => r.difficulty === 'easy').length;
        const mediumCount = recipes.filter(r => r.difficulty === 'medium').length;
        const hardCount = recipes.filter(r => r.difficulty === 'hard').length;

        const stats = {
            totalRecipes: recipes.length,
            averageCookingTime: avg,
            recipesByDifficulty: {
                easy: easyCount,
                medium: mediumCount,
                hard: hardCount
            }
        }
        res.status(200).json(stats)

    } catch (error) {
        next(error);
    }
}



module.exports = {
    getAllRecipes,
    getRecipesById,
    createRecipe,
    updateRecipe,
    deleteRecipe,
    getStatsRecipe
}

