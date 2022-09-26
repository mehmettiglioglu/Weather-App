// Selectors
let searchBar=document.querySelector(".search-bar input")
    randomButton=document.querySelector(".random-btn")
    countryName=document.querySelector(".city-name h1")
    countryTemp=document.querySelector(".city-temp h1")
    feelsTemp=document.querySelector(".feels-temp h1")
    weatherImage=document.querySelector(".weather-situation")
    weatherSunny=document.querySelector(".weather-sunny");
    weatherCloudy=document.querySelector(".weather-cloudy");


// API URL
const url="https://api.openweathermap.org/data/2.5/weather?q=";
const urlKey="31e1cec39ebc5cec4f6ecd4dabf927e7";

// Search inputtaki yazılan değeri alan ve enter'a basıldığında değeri başka bir fonksiyonda gönderen event.
searchBar.addEventListener("keypress",(e)=>{
    if(e.keyCode===13){
        return getData(searchBar.value)
    }
})

// XMLHttpReqest nesnesi oluşturdum.
let request=new XMLHttpRequest();

// Veri gönderildiğinde çalışacak fonksiyon
request.onreadystatechange=function(){
    if(request.readyState===4 && request.status===200)
    {
        // Gelen veriler string olduğu için JSON formatına çevirdim.
        let jsonData=JSON.parse(request.responseText);

        countryName.innerHTML=`${jsonData.name}`
        countryTemp.innerHTML=`${Math.floor(jsonData.main.temp)} °`
        feelsTemp.innerHTML=`Hissedilen Sıcaklık : ${Math.floor(jsonData.main.feels_like)} °`

        // Hava koşuluna göre resimlerin ekrana çıkmasını sağladım.
        if(jsonData.weather[0].main==="Rain"){
                weatherImage.style="display:block"
                weatherSunny.style="display:none";
                weatherCloudy.style="display:none"
        }
        else if(jsonData.weather[0].main==="Clear"){
            weatherSunny.style="display:block"
            weatherImage.style="display:none";
            weatherCloudy.style="display:none"
        }
        else if(jsonData.weather[0].main==="Clouds"){
            weatherCloudy.style="display:block"
            weatherSunny.style="display:none";
            weatherImage.style="display:none"
        }
        else{
            weatherImage.style="display:none";
            weatherSunny.style="display:none";
            weatherCloudy.style="display:none"
        }
        
        
    }
}

// Get Random Country buttonuna basıldıktan sonra random şehirin verilerinin gelmesini sağladım.
randomButton.addEventListener("click",()=>{
   getData(randomCountry())
})

// Random şehir oluşturan fonksiyon
function randomCountry(){
    let randomCity=["Wien","Paris","London","Porto","New York","Berlin","Milan","Napoli","Amsterdam","İstanbul","Prag","Roma","Kopenhag","Dublin","Hamburg"];
    return randomCity[Math.floor(Math.random() * randomCity.length)];
}

// Uzak sunucuya bağlanmak ve veri almak için gerekli kodlar.
function getData(country){
    request.open("GET",`${url}+${country}+&appid=${urlKey}&units=metric&lang=tr`)
    request.send();
}
