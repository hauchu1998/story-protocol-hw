import mongoose from "mongoose";
import app from "./src/app";

import dotenv from "dotenv";
dotenv.config();

// MongoDB setup
mongoose.connect(
  (process.env.DB_URL as string) || "mongodb://localhost:27017/virtual-labs"
);

const port = process.env.PORT || 3001;

app.listen(port, () => {
  console.log(`server is running on port ${port}`);
});
