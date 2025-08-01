// index.js
const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const { Configuration, OpenAIApi } = require('openai');

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY
});
const openai = new OpenAIApi(configuration);

// POST endpoint to get AI explanation
app.post('/generate-reason', async (req, res) => {
  const { productName, surplus, shortage, fuelCost, co2Impact, cpiFactor } = req.body;

  const prompt = `
You are an AI inventory optimization assistant. Based on the following inputs, explain in 2–3 lines why this transfer is suggested:

- Product: ${productName}
- Surplus at source store: ${surplus}
- Shortage at destination store: ${shortage}
- Fuel cost: $${fuelCost}
- CO₂ impact: ${co2Impact} kg
- CPI factor: ${cpiFactor}

Give a clear and professional reason for this transfer.
`;

  try {
    const completion = await openai.createChatCompletion({
      model: 'gpt-3.5-turbo', // or 'gpt-4' if you have access
      messages: [
        { role: 'system', content: 'You are a helpful AI assistant.' },
        { role: 'user', content: prompt }
      ]
    });

    const aiReason = completion.data.choices[0].message.content;
    res.json({ reason: aiReason });
  } catch (error) {
    console.error('OpenAI error:', error.response?.data || error.message);
    res.status(500).json({ error: 'Failed to generate reason' });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
