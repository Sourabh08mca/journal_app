const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const UserModel = require('./models/Users'); // No need to access `.model`

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect("mongodb://localhost:27017/Journal_App", {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => console.log("MongoDB Connected"))
  .catch(err => console.log("MongoDB connection error:", err));

app.post('/form', (req, res) => {
  UserModel.create(req.body)
    .then(users => res.json(users))
    .catch(err => res.status(400).json({ error: err.message }));
});

app.get('/',(req, res) => {
    UserModel.find({})
    .then(users => res.json(users))
    .catch(err => res.json(err))
})


app.put('/update/:id',(req,res) => {
  const id = req.params.id;
  UserModel.findByIdAndUpdate({_id: id},{
   title:req.body.title,
   content : req.body.content
  })
  .then(users => res.json(users))
   .catch(err => res.json(err))
})

app.get('/getUser/:id', (req, res) => {
  const id =req.params.id;
  UserModel.findById({_id:id})
  .then(users => res.json(users))
  .catch(err => res.json(err))
})

app.delete('/:id', (req, res) => {
    UserModel.findByIdAndDelete(req.params.id)
      .then(() => res.json({ message: "Entry deleted" }))
      .catch(err => res.status(500).json({ error: err.message }));
  });
  

app.listen(3001, () => {
  console.log("Server is Running on port 3001");
});
