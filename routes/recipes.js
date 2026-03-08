const express = require('express');
const router = express.Router();
const recipesController = require('../controllers/recipesController');

router.get('/', recipesController.getAllRecipes);
router.get('/:id', recipesController.getRecipesById);
router.post('/', recipesController.createRecipe);
router.post('/', recipesController.updateRecipe);

module.exports = router;