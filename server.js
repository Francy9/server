const express = require('express');
const app = express();
const got = require('got');
var key = "aca959ae6d5053b35c1f3e2f551b0b49";

app.get("/luogo",async(req,resp) =>{
    const luogo = req.query.città;
    const meteo = await got('api.openweathermap.org/data/2.5/weather?q=milano&appid=aca959ae6d5053b35c1f3e2f551b0b49');
    const tempo = meteo.body;
    resp.send(tempo);
    resp.sendStatus(200);
})

const listener = app.listen(process.env.PORT, () => {
    console.log("Your app is listening on port " + listener.address().port);
  });
