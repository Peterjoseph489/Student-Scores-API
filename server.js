require('./config/config')
const express = require('express');
PORT = process.env.PORT || 9090;
const router = require('./routes/route');




const app = express();
app.use(express.json());
app.use('/api', router);

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(PORT, ()=>{
    console.log(`Server running on port ${PORT}`)
})