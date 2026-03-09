const express = require('express');
const morgan = require('morgan');
const app = express();
const PORT = 3000;

app.use(express.json());

const recipesRoutes = require('./routes/recipes');
app.use('/api/recipes', recipesRoutes);

app.use((err, req, res, next) => {
    const statusCode = err.statusCode || 500;

    res.status(statusCode).json({
        error: true,
        message: err.message || "Internal Server Error",
        statusCode: statusCode
    });
});

app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
})