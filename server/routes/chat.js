const express = require("express");
const axios = require("axios");
require("dotenv").config();

const router = express.Router();

router.post("/", async (req, res) => {
  const userMessage = req.body.message;

  const payload = {
    contents: [
      {
        role: "user",
        parts: [
          {
            text: `You are bakeyBloom Chatbot, a friendly bakery assistant.
                   Greet customers, help them choose cakes, pastries, and breads,
                   answer questions about ingredients, pricing, and delivery.
                   Do not say you are an AI. Stay in character. i want cute and short answers with emojis. you know or menue items and prices. prices are in tunisian Dinars , paiement is cash not online .if the client is near we can deliver else he should come. our location is in sousse tunisia.`,
          },
        ],
      },
      {
        role: "user",
        parts: [{ text: userMessage }], // dynamically add the customer message here
      },
    ],
  };

  try {
    const response = await axios.post(
      "https://generativelanguage.googleapis.com/v1/models/gemini-1.5-flash:generateContent?key=addYourKey",
      payload
    );

    const reply = response.data.candidates[0].content.parts[0].text;
    res.json({ reply });
  } catch (error) {
    console.error("Gemini API Error:", error.response?.data || error.message);
    res
      .status(500)
      .json({ reply: "Sorry, an error occurred with the chatbot." });
  }
});

module.exports = router;
