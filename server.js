// server.js
import express from '/node_modules/express';
import { writeFile } from '/node_modules/fs';
import { splitImage, downloadImage } from '/imageProcessor.js'; // Replace with your image processing functions
import { config } from '/node_modules/dotenv';
import { Client } from '/node_modules/discord.js';

// Load environment variables from .env file
config();

const app = express();
const port = 3000;

// Create a route to handle POST requests for /public/data.json
app.post('/public/data.json', (req, res) => {
  const dataJSON = req.body; // Assuming you have already parsed the JSON data

  // Write the data to the data.json file
  writeFile('/public/data.json', JSON.stringify(dataJSON), (err) => {
    if (err) {
      console.error('Error writing data to data.json:', err);
      res.status(500).send('Error writing data to data.json');
    } else {
      console.log('Data written to data.json');
      res.status(200).send('Data written to data.json');
    }
  });
});
app.listen(port, () => {
  console.log(`Server is running on https://bmcgauley.github.io:${port}`);
});
// Define a route to handle image processing
app.post('/process-image', async (req, res) => {
  const { imageUrl, filename } = req.body;

  try {
    // Process the image using your image processing functions
    await downloadImage(imageUrl, filename);
    await splitImage(filename);

    res.status(200).send('Image processed successfully');
  } catch (error) {
    console.error('Error processing image:', error);
    res.status(500).send('Error processing image');
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on https://bmcgauley.github.io:${port}`);
});

// Your Discord bot setup can also go here
const discordToken = process.env.TOKEN;
const client = new Client();

client.on('ready', () => {
  console.log('Bot connected');
});

client.on('message', async (message) => {
  // Your message handling logic can go here
});

client.login(discordToken);
