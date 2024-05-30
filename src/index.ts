import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import { router } from './routes/Routes';

const app = express();
const port = process.env.PORT || 5000;

app.use(
  cors({
    origin: "*",
  })
);

app.get("/", (req, res) => {
  res.send("Express on Vercel");
});

app.use(express.json());
app.use(router)
app.listen(port, () => {
  console.log(`🚀 Server is running on http://localhost:${port}`);
});


module.exports = app;