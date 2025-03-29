import express from 'express';
import dotenv from 'dotenv';
import schoolRoutes from './routes/schoolRoutes.js';
import cors from "cors"
import pool , {initDatabase} from './config/database.js';
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

//---------------------------------------- Middleware

if (process.env.INIT_DB === 'true') {
  await initDatabase();
}

app.use(express.json());
app.use(express.urlencoded({extended:true}))
app.use(cors({
  origin: 'http://localhost:5173', // Your React app's address
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));

// ------------------------------------Routes---------------------------------------
app.use('/api', schoolRoutes);

// error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    success: false,
    message: 'Something went wrong!'
  });
});


app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

export default app;