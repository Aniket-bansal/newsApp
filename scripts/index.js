// Ude Import export (MANDATORY)
// Onclicking store the news in local storage with key "news" so that you can access that on news.html page

import navbar  from "../components/navbar.js";
// import { sidebar } from "../components/sidebar.js";

document.getElementById("navbar").innerHTML = navbar();

// document.getElementById("sidebar").innerHTML = sidebar();

// country click url= https://masai-mock-api.herokuapp.com/news/top-headlines?country={country code} 
//  https://masai-mock-api.herokuapp.com/news?q={query}https://masai-mock-api.herokuapp.com/news?q={query}
let search = (e) =>{
    if(e.key==="Enter"){
        searchNews();
    }
}
document.getElementById("search_input").addEventListener("keydown",search)

let searchNews = async()=>{
    let query = document.getElementById("search_input").value
    try{
        let res = await fetch(`https://masai-mock-api.herokuapp.com/news?q=${query}`)

        let data = await res.json()
        let x = data.articles
        console.log(x)
        localStorage.setItem("news",JSON.stringify(x))
        window.location = "../search.html"
    }catch(err){
        console.log(err)
    }
}

// country news 

 async function cSearch(){
//    console.log(this.id)
let countrycode = this.id;
   try{
       let res = await fetch(`https://masai-mock-api.herokuapp.com/news/top-headlines?country=${countrycode} `)
       let dataa = await res.json()
       console.log(dataa.articles)
       append(dataa.articles)
   }
   catch(err){
       console.log(err)
   }
}

function append (dataa) {
    let container = document.getElementById("results");
    container.innerHTML = null;
    dataa.forEach(({title,urlToImage,description})=>{
        let box = document.createElement("div")
        box.setAttribute("class","news")
        let heading = document.createElement("h3")
        heading.innerHTML = title;
        let desc= document.createElement("p")
        desc.innerHTML = description;
        let image = document.createElement("img")
        image.src = urlToImage
        box.append(image,heading,desc)
        container.append(box)
    })
}

let country_news = document.getElementById("sidebar").children;

for(let el of country_news){
    el.addEventListener("click",cSearch)
}