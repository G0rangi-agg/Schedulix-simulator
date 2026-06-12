const express = require("express");
const cors = require("cors");
const { exec } = require("child_process");

const app = express();

app.use(cors());
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

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
