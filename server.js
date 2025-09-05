import express from "express";
import passport from "./config/passport.js";
import methodOverride from "method-override";
import session from "express-session";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";
const app = express();
dotenv.config();

//++++++++++++++++++++++++++++++++++++middleware setup+++++++++++++++++++++++++
app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use(express.static(path.join(__dirname, "public")));
app.use(methodOverride("_method"));
//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
//``````````````````````````````` import file``````````````````````````````````
import connectDB from "./config/db.js";
import authController from "./controllers/authcontroller.js";
import authRoutes from './routes/authRoutes.js';
import taskController from './controllers/taskcontroller.js'
import taskRoutes from './routes/taskRoutes.js';
//`````````````````````````````````````````````````````````````````````````````
//.....................................session setup.............................

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
      path: "/",
      httpOnly: true,
      maxAge: 1000 * 60 * 60,
    },
  })
);
// passport initialize

app.use(passport.initialize());
app.use(passport.session());

//.................................................................................
// using import file
connectDB();
app.use("/", authController);
app.use('/', authRoutes);
app.use('/', taskController);
app.use('/', taskRoutes)
//////////////////////////////////////////////////////
app.listen(process.env.PORT_NUMBER || 3000, () => {
  console.log("server is staring on port no. 3000");
});
