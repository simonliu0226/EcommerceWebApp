const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const dotenv = require('dotenv');

const userRouter = require('./routes/userRoutes');
const productRouter = require('./routes/productRoutes');
const cartRouter = require('./routes/cartRoutes');

dotenv.config(); // This will load the environment variables from the .env file
const app = express();

app.use(cors());
app.use(bodyParser.json());

app.use('/users', userRouter);
app.use('/products', productRouter);
app.use('/cart', cartRouter);

app.get('/', (req, res) => {
  res.json({ message: 'Hello from the backend!'});
});

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log('Error connecting to MongoDB:', err));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
