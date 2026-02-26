const express = require('express');
const app = express();
const PORT = 3000;

const recipesRoutes = require('./routes/recipes')

app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
})