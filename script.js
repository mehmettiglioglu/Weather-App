let searchBar=document.querySelector(".search-bar input")
    randomButton=document.querySelector(".random-btn")
    countryName=document.querySelector(".city-name")
    countryTemp=document.querySelector(".city-temp");

const url="https://api.openweathermap.org/data/2.5/weather?q=";
const urlKey="31e1cec39ebc5cec4f6ecd4dabf927e7";

searchBar.addEventListener("keypress",(e)=>{
    if(e.keyCode===13){
        return country(searchBar.value)
    }
})

let request=new XMLHttpRequest();

request.onreadystatechange=function(){
    if(request.readyState===4 && request.status===200)
    {
        let jsonData=JSON.parse(request.responseText);
        
        countryName.innerHTML=`${jsonData.name}`
        
    }
}


function country(country){
    request.open("GET",`${url}+${country}+&appid=${urlKey}&units=metric&lang=tr`)
    request.send()
}
