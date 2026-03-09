const fs = require('fs').promises;
const FILE_PATH = './data/recipes.json'

async function readRecipes() {
    try {
        const fileData = await fs.readFile(FILE_PATH, 'utf-8');
        const recipes = JSON.parse(fileData);
        return recipes;
    } catch (error) {
        return [];
    }
}

async function writeRecipes(recipes) {
    try {
        const jsonString = JSON.stringify(recipes, null, 2);
        await fs.writeFile(FILE_PATH, jsonString)

    } catch (error) {
        console.error("Error writing to file:", error);
        throw error;
    }
}


module.exports = {
    readRecipes,
    writeRecipes
}