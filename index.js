const Joi = require('joi');
const express = require('express');
const app = express();
app.set('view engine', 'ejs');
const plants=require('./plants.json')
app.use(express.json());
app.use(express.static('public'))

app.get('/', function(req, res){ 
  res.send("Hello world");
});

app.get('/api/plants', (req, res) => {
  res.send(plants);
});



app.post('/api/plants', (req, res) => {
  const { error } = validatePlants(req.body); 
  if (error) return res.status(400).send(error.details[0].message);

  const plant = {
    id: plants.length + 1,
    name: req.body.name
  };
  plants.push(plant);
  res.send(plant);
});

app.put('/api/plants/:id', (req, res) => {
  const plant = plants.find(c => c.id === parseInt(req.params.id));
  if (!plant) return res.status(404).send('The plant with the given ID was not found.');

  const { error } = validateGenre(req.body); 
  if (error) return res.status(400).send(error.details[0].message);
  
  genre.name = req.body.name; 
  res.send(plant);
});

app.delete('/api/plants/:id', (req, res) => {
  const plant = plants.find(c => c.id === parseInt(req.params.id));
  if (!plant) return res.status(404).send('The plant with the given ID was not found.');

  const index = plants.indexOf(genre);
  genres.splice(index, 1);

  res.send(plant);
});

app.get('/api/plants/:id', (req, res) => {
  const plant = plants.find(c => c.id === parseInt(req.params.id));
  if (!plant) return res.status(404).send('The genre with the given ID was not found.');
  res.render('index',{plant:plant});
});

function validateGenre(plant) {
  const schema = {
    name: Joi.string().min(3).required()
  };

  return Joi.validate(plant, schema);
}

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Listening on port ${port}...`));