const express = require("express");
const cors = require("cors");
const { exec } = require("child_process");

const app = express();

app.use(cors({
  origin: "https://schedulix-simulator.netlify.app/" // Put your actual Netlify URL here
}));
app.use(express.json());

app.post("/schedule", (req, res) => {
  const input = req.body.input;

  const process = exec("./scheduler", (error, stdout, stderr) => {
    if (error) {
      return res.json({ error: error.message });
    }
    res.json({ output: stdout });
  });

  process.stdin.write(input);
  process.stdin.end();
});

app.get("/", (req, res) => {
  res.send("C++ Scheduler API is running 🚀");
});

app.listen(3000, () => {
  console.log("Server running on port 3000");
});
