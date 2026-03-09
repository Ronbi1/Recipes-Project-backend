const express = require('express');
const router = express.Router();
const recipesController = require('../controllers/recipesController');
const validateRecipe = require('../middleware/recipeValidation');

router.get('/', recipesController.getAllRecipes);
router.get('/stats', recipesController.getStatsRecipe);
router.get('/:id', recipesController.getRecipesById);
router.post('/', validateRecipe, recipesController.createRecipe);
router.put('/:id', validateRecipe, recipesController.updateRecipe);
router.delete('/:id', recipesController.deleteRecipe);

module.exports = router;