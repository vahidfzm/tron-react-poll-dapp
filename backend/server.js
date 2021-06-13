const fetch = require('node-fetch');
const express = require('express');
const bodyParser = require('body-parser');
const cors=require('cors');
const app = express();

const port=5056

app.use(cors());
app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.send('[Tron Poll DAPP] backend!');
})

app.post('/gettransactioninfo', (req, res) => {

  const url = `https://api.shasta.trongrid.io/walletsolidity/gettransactioninfobyid`;

  fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    },
    body: JSON.stringify(req.body),
  })
    .then(response => {
      return response.json()
    })
    .then(data => {
      console.log(data)
      res.json(data)
    })
    .catch(error=>{
      console.log(error)
    });


})


app.listen(port, () => {
  console.log(`[Tron Poll DAPP] backend is listening on http://127.0.0.1:${port}`)
})






