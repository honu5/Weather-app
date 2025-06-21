import express from "express";
import axios from "axios";
import bodyParser from "body-parser";

const app= express();
const port = 3000;

app.use(bodyParser.urlencoded({extended:true}))
app.use(express.static("public"));

const API_KEY="161d3c3c568b7fc48e314f9908cf2c88";
const API_URL="https://api.openweathermap.org/data/2.5/weather";

app.get("/" ,(req,res)=>{
    res.render("index.ejs",{weather:"Well come to the Weather App. Enter a city to get the current weather."});
});

app.post("/submit", async (req,res)=>{
    const city=req.body.city;
    try {
        const response = await  axios.get(API_URL+"?q="+city+"&appid="+API_KEY+"&units=metric");
        const data = response.data;
        const weather = {
            city:data.name,
            temp:data.main.temp,
            description:data.weather[0].description,
        };
        res.render("index.ejs",{content:weather});
        
    }catch(error){
        res.status(500).send(error.message);    
    }

});


app.listen(port,()=>{
    console.log(`Server is running on http://localhost:${port}`);
})