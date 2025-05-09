import express from "express";
import fetch from "node-fetch";
import cors from "cors";

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

const API_KEY = "AIzaSyDAJLntaMGCpzqFbTLHHiPE5LwTyQ49l2I"; // کلید شما

app.post("/gemini", async (req, res) => {
  const model = req.query.model || "gemini-pro";
  const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${API_KEY}`;

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(req.body)
    });
    const data = await response.json();
    res.json(data);
  } catch (err) {
    console.error("Gemini Proxy Error:", err);
    res.status(500).send("Error contacting Gemini API");
  }
});

app.listen(port, () => {
  console.log(`Gemini proxy listening on port ${port}`);
});