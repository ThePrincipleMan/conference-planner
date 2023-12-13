const express = require('express');
const cors = require('cors');
const data = require('./data');
const plan = require('./planning');

const app = express();

app.use(cors());
app.use(express.json());

// console.log(data.visa.length);

app.get('/message', (req, res) => {
    res.json({message : "Hello fron server!"});
});

app.post('/planner', (req,res) => {
    var people = req.body
    let answer = plan.plan(people)
    res.json(answer)
    return res
})

app.listen(8000, ()=>{
    console.log("Server is running on port 8000");
})
