const express = require('express');
const app = express();

app.get("/luogo",(req,resp) =>{
    resp.send("Ciao!");
    resp.send("richiesta in arrivo!!");
    resp.sendStatus(200);
})

const listener = app.listen(process.env.PORT, () => {
    console.log("Your app is listening on port " + listener.address().port);
  });
