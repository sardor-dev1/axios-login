import express from "express";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());

const useCredentials = {
  userName: "John",
  password: "123",
};

app.post("/login", (req, res) => {
  if (
    req.body.userName === useCredentials.userName &&
    req.body.password === useCredentials.password
  ) {
    res.status(200).send({ token: "john_123" });
  } else {
    res.status(401).send("Invalid credentials");
  }
});


app.listen(8080, ()=>console.log("Server is live on port:8080"))