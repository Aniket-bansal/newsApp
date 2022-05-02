// Ude Import export (MANDATORY)
// Onclicking store the news in local storage with key "news" so that you can access that on news.html page
import navbar from "../components/navbar.js"

document.getElementById("navbar").innerHTML = navbar();

let news = JSON.parse(localStorage.getItem("news"));
let container = document.getElementById("results");

news.map(function(el){
    
    let box = document.createElement("div");
    box.setAttribute("class", "news")
    let image = document.createElement("img");
    image.src = el.urlToImage;
    let heading = document.createElement("h3")
    heading.innerText = el.title
    let desc = document.createElement("p")
    desc.innerText = el.description;
    box.append(image,heading,desc)
    container.append(box)
})

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
        
        append(x)
        // localStorage.setItem("news",JSON.stringify(x))
        // window.location = "../search.html"
    }catch(err){
        console.log(err)
    }
}

let append = (data) =>{
    let containers = document.getElementById("results");
    container.innerHTML = null;
    data.forEach(({urlToImage,title,description})=>{
       var box = document.createElement('div');
       box.setAttribute('class', 'news');
       var img = document.createElement('img');
       img.src=urlToImage;
       var heading = document.createElement('h3')
        heading.innerText = title;
        var desc = document.createElement('p')
        desc.innerText = description;
        box.append(img,heading,desc)
        containers.append(box)
        
    })
}

function redirectTonews(){
    window.location = "news.html"
}

let results = document.getElementById("results").children;

for(let el of results){
    el.addEventListener("click",redirectTonews)
}