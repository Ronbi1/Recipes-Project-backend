const express = require('express');
const app = express();
const PORT = 3000;

app.use(express.json());

const recipesRoutes = require('./routes/recipes');
app.use('/', recipesRoutes);

app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
})