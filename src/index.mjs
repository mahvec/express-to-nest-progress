import express from "express";
import RootsRouter from "./routes/roots.mjs";
import cookieParser from "cookie-parser";
import session from "express-session";
import { MOCK_USERS_LOGIN } from "./utils/constant.mjs";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(cookieParser());
app.use(
  session({
    secret: "your-secret-key",
    saveUninitialized: false,
    resave: false,
    cookie: {
      maxAge: 60000 * 60 * 60, // valid for 1 hour
    },
  }),
);
app.use(RootsRouter);

const loggerMiddleware = (req, res, next) => {
  next();
};

app.use(loggerMiddleware);

app.get("/", (req, res) => {
  console.log(req.session);
  console.log(req.sessionID);
  req.session.visited = true;
  res.cookie("hello", "Mahvec", {
    maxAge: 10000,
  });
  res.status(200).send({ msg: "Hello World" });
});

app.post("/api/auth/login", (req, res) => {
  const {
    body: { username, password },
  } = req;
  const findUser = MOCK_USERS_LOGIN.find((user) => user.username === username);
  if (!findUser) return res.status(401).send({ msg: "Invalid username" });
  if (!findUser || findUser.password !== password)
    return res.status(401).send({ msg: "Invalid Credentials" });
  req.session.user = findUser;
  res
    .status(200)
    .send({ msg: "Login successful", user: findUser, session: req.session.id });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
