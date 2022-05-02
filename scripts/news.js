// Ude Import export (MANDATORY)
import navbar from '../components/navbar.js'

document.getElementById("navbar").innerHTML = navbar();


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
    containers.innerHTML = null;
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
