const express = require('express');
const app = express();
const got = require('got');
var key = "aca959ae6d5053b35c1f3e2f551b0b49";

app.get("/luogo/:nome",async(req,resp) =>{
   const nome = req.params.nome;
   console.log(nome);
    try {
	const response = await got('http://api.openweathermap.org/data/2.5/weather?q='+ nome +'&appid='+ key +'&mode=json&units=metric&lang=it');
        const corpo = JSON.parse(response.body);
        resp.send(corpo);
	} catch (error) {
	console.log(error.response.body);
    	resp.sendStatus(404);
		//=> 'Internal server error ...'
	}
})

const listener = app.listen(process.env.PORT, () => {
    console.log("Your app is listening on port " + listener.address().port);
  });
