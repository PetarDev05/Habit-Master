import dotenv from 'dotenv';
import { connectDB } from './config/db.config.js';
import { app } from './app.js';

dotenv.config({
  path: './.env',
});

const PORT = process.env.PORT ?? 3000;

connectDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`SERVER IS LISTENING ON PORT: ${PORT}`);
    });
  })
  .catch((error) => {
    console.log('DATABASE CONNECTION ERROR: ', error);
    process.exit(1);
  });
