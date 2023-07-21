'use strict'
import express, { json } from '/node_modules/express/';
import { writeFile } from '/node_modules/fs.realpath';

const app = express();
const port = 3000;

app.use(json());

app.post('/public/', (req, res) => {
  const data = req.body;

  // Write data to the JSON file
  writeFile('data.json', JSON.stringify(data), (err) => {
    if (err) {
      console.error('Error writing data:', err);
      res.status(500).send('Failed to write data to file.');
    } else {
      console.log('Data written to file successfully.');
      res.sendStatus(200);
    }
  });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
