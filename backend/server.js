const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();
app.use(cors());

const PORT = process.env.PORT || 5000;

// Business Logic: Real-time Data Fetching
app.get('/api/prices', async (req, res) => {
    try {
        const response = await axios.get('https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,ethereum,solana&vs_currencies=usd');
        res.json(response.data);
    } catch (error) {
        res.status(500).json({ error: "Upstream API Error" });
    }
});

// DevOps/SRE: Health Check endpoint
app.get('/health', (req, res) => {
    res.status(200).send('Healthy');
});

// Logic to prevent the server from starting automatically during tests
if (require.main === module) {
    app.listen(PORT, () => {
        console.log(`🚀 SentinelScale Backend running on port ${PORT}`);
    });
}

module.exports = app;