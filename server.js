const express = require('express');
const app = express();
const got = require('got');

app.get("/Tempo/:nome",async(req,resp) => {
  try{
    const nome =req.params.nome;
    const response = await got('http://api.openweathermap.org/data/2.5/weather?q='+ nome +'&appid='+ process.env.key +'&mode=json&units=metric&lang=it');
    const corpo = JSON.parse(response.body);
    const tempo = JSON.stringify(corpo.weather).split(",")[2].split(":")[1];
    resp.send("Tempo: "+ tempo);
  }catch(error){
    resp.sendStatus(404);
  }
});
app.get("/Temperatura/:nome",async(req,resp) => {
  try{
    const nome =req.params.nome;
    const response = await got('http://api.openweathermap.org/data/2.5/weather?q='+ nome +'&appid='+ process.env.key  +'&mode=json&units=metric&lang=it');
    const corpo = JSON.parse(response.body);
    resp.send("Temperatura: " + corpo.main.temp + "°C");
  }catch(error){
    resp.sendStatus(404);
  }
});
app.get("/Percepita/:nome",async(req,resp)=>{
  try{
    const nome =req.params.nome;
    const response = await got('http://api.openweathermap.org/data/2.5/weather?q='+ nome +'&appid='+ process.env.key +'&mode=json&units=metric&lang=it');
    const corpo = JSON.parse(response.body);
    resp.send("Percepita: " + corpo.main.feels_like + "°C");
  }catch(error){
    resp.sendStatus(404);
  }
});
app.get("/Massime/:nome",async(req,resp) => {
  try{
    const nome =req.params.nome;
    const response = await got('http://api.openweathermap.org/data/2.5/weather?q='+ nome +'&appid='+ process.env.key  +'&mode=json&units=metric&lang=it');
    const corpo = JSON.parse(response.body);
    resp.send("Massime: " + corpo.main.temp_max + "°C");
  }catch(error){
    resp.sendStatus(404);
  }
});
app.get("/Minime/:nome",async(req,resp) => {
  try{
    const nome =req.params.nome;
    const response = await got('http://api.openweathermap.org/data/2.5/weather?q='+ nome +'&appid='+ process.env.key  +'&mode=json&units=metric&lang=it');
    const corpo = JSON.parse(response.body);
    resp.send("Minime: " + corpo.main.temp_min + "°C");
  }catch(error){
    resp.sendStatus(404);
  }
});
app.get("/Alba/:nome",async(req,resp) => {
  try{
    const nome =req.params.nome;
    const response = await got('http://api.openweathermap.org/data/2.5/weather?q='+ nome +'&appid='+ process.env.key  +'&mode=json&units=metric&lang=it');
    const corpo = JSON.parse(response.body);
    const millisecAlb = corpo.sys.sunrise * 1000;
    const dataAlb = new Date(millisecAlb);
    const alba =dataAlb.toLocaleString();
    resp.send("Alba: " +alba);
  }catch(error){
    resp.sendStatus(404);
  }
});
app.get("/Tramonto/:nome",async(req,resp) => {
  try{
    const nome =req.params.nome;
    const response = await got('http://api.openweathermap.org/data/2.5/weather?q='+ nome +'&appid='+ process.env.key  +'&mode=json&units=metric&lang=it');
    const corpo = JSON.parse(response.body);
    const millisecTram = corpo.sys.sunset * 1000;
    const dataTram = new Date(millisecTram);
    const tramonto =dataTram.toLocaleString();
    resp.send("Tramonto: " + tramonto);
  }catch(error){
    resp.sendStatus(404);
  }
});
app.get("/Attuale/:nome",async(req,resp) => {
const nome =req.params.nome;
try {
	const response = await got('http://api.openweathermap.org/data/2.5/weather?q='+ nome +'&appid='+ process.env.key  +'&mode=json&units=metric&lang=it');
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

app.get("/Giornaliero/:numero",async(req,resp) => {
const numero =req.params.numero;
  const lat = req.query.lat;
  const long = req.query.long;
  try {
		const response = await got('https://api.openweathermap.org/data/2.5/onecall?lat='+ lat + '&lon=' + long +'&exclude=current,minutely,hourly,alerts&appid=' + process.env.key  + '&mode=json&units=metric&lang=it');
    const corpo = JSON.parse(response.body);
		const tempo = JSON.stringify(corpo.daily[numero].weather).split(",")[2].split(":")[1];  
    const millisecAlb = corpo.daily[numero].sunrise * 1000;
    const dataAlb = new Date(millisecAlb);
    const alba =dataAlb.toLocaleString();
    const millisecTram = corpo.daily[numero].sunset * 1000;
    const dataTram = new Date(millisecTram);
    const tramonto =dataTram.toLocaleString();
    const millisecDay= corpo.daily[numero].dt * 1000;
    const dataDay = new Date(millisecDay);
    const giorno =dataDay.toLocaleString();
    
    //console.log(JSON.stringify());
    resp.send("Meteo giorno :" + giorno +
              "\nTempo: " + tempo +
	      "\nTemperatura: " + corpo.daily[numero].temp.day + "°C"+
              "\nPercepita: " + corpo.daily[numero].feels_like.day +"°C" +
	      "\n Minime: " + corpo.daily[numero].temp.min + "°C"+
	      "\n Massime: " + corpo.daily[numero].temp.max + "°C"+
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

