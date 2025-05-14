const express = require('express');
const path = require('path');
const chatRoute = require('./routes/chat');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.static(path.join(__dirname, '../public')));

app.use('/chat', chatRoute);

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
