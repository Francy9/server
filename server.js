const express = require('express');
const app = express();

app.get("/luogo",(req,resp) =>{
    console.log("richiesta in arrivo!!");
    resp.send("Ciao!");
    resp.sendStatus(200);
})

const listener = app.listen(process.env.PORT, () => {
    console.log("Your app is listening on port " + listener.address().port);
  });
