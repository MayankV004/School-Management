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
app.use(cors());

// ------------------------------------Routes---------------------------------------
app.use('/api', schoolRoutes);

app.get("/",(req,res)=>{
  res.send("Server is working")
})

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
