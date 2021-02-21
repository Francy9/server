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
        resp.send("tempo:" + corpo.weather[1].description +
		 "\ntemperatura :" + corpo.main.temp +
		 "\n Minime :" + corpo.main.temp_min + 
		 "\n Massime :" + corpo.main.temp_max + 
		 "\n sunrise " + toLocaleString(corpo.sys.sunrise));         
	console.log("temperatura"+Number.parseInt(corpo.main.temp));  
	} catch (error) {
	console.log(error.response.body);
    	resp.status(404).end();
		//=> 'Internal server error ...'
	}
})

const listener = app.listen(process.env.PORT, () => {
    console.log("Your app is listening on port " + listener.address().port);
  });
