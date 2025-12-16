const app = require('./app');
const { connectDB } = require('./data/connection');

const PORT = 3003;

connectDB().then(() => {
    app.listen(PORT, () => {
        console.log(`Server running at http://localhost:${PORT}`);
    });
});
