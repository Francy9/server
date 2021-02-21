const express = require('express');
const app = express();
const got = require('got');
var key = "aca959ae6d5053b35c1f3e2f551b0b49";

app.get("/t/:nome",async(req,resp) => {
const nome =req.params.nome;
  try {
		const response = await got('http://api.openweathermap.org/data/2.5/weather?q='+ nome +'&appid='+ key +'&mode=json&units=metric&lang=it');
    const corpo = JSON.parse(response.body);
		const tempo = JSON.stringify(corpo.weather).split(",")[2].split(":")[1];  
    const millisecAlb = corpo.sys.sunrise * 1000;
    const dataAlb = new Date(millisecAlb);
    const alba =dataAlb.toLocaleString();
    const millisecTram = corpo.sys.sunset * 1000;
    const dataTram = new Date(millisecTram);
    const tramonto =dataTram.toLocaleString();
    //console.log(JSON.stringify());
    resp.send("Tempo: " + tempo +
		 "\nTemperatura: " + corpo.main.temp + "°C"+
     "\nPercepita: " + corpo.main.feels_like +"°C" +
		 "\n Minime: " + corpo.main.temp_min + "°C"+
		 "\n Massime: " + corpo.main.temp_max + "°C"+
		 "\n Alba: " + alba +
     "\ntramonto: " + tramonto);
	} catch (error) {
		console.log(error.response.body);
    resp.sendStatus(404);
	
	} 
});

const listener = app.listen(process.env.PORT, () => {
    console.log("Your app is listening on port " + listener.address().port);
  });

