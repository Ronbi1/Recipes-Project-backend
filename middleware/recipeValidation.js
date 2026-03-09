function validateRecipe(req, res, next) {
    const { title, description, ingredients, instructions, cookingTime, servings, difficulty } = req.body;

    if (!title || typeof title !== 'string' || title.length > 100 || title.length < 3) {
        const error = new Error("Validation Error: Title are required and must be minimum 3 letter or max 100 letter.")
        error.statusCode = 400;
        return next(error);
    }

    if (!description || typeof description !== "string" || description.length < 10 || description.length > 500) {
        const error = new Error("Validation Error: description are required and must be minimum 10 letter and max 500 letter.")
        error.statusCode = 400;
        return next(error);
    }

    if (!ingredients || !Array.isArray(ingredients) || ingredients.length <= 0) {
        const error = new Error("Validation Error: ingredients are required and must contain at least 1 ingredient.")
        error.statusCode = 400;
        return next(error);
    }

    if (!instructions || !Array.isArray(instructions) || instructions.length <= 0) {
        const error = new Error("Validation Error: instructions are required and must contain at least 1 item.")
        error.statusCode = 400;
        return next(error);
    }

    if (typeof cookingTime !== 'number' || cookingTime <= 0) {
        const error = new Error("Validation Error: cookingTime are required and must be positive number.")
        error.statusCode = 400;
        return next(error);
    }

    if (!servings || servings < 0) {
        const error = new Error("Validation Error: servings are required and must be positive number.")
        error.statusCode = 400;
        return next(error);
    }

    if (!difficulty || !['easy', 'medium', 'hard'].includes(difficulty)) {
        const error = new Error("Validation Error: difficulty are required and must be one of: easy, medium, hard.")
        error.statusCode = 400;
        return next(error);
    }



    next();
}

module.exports = validateRecipe;