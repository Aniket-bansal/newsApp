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
        
        // append(x)
        localStorage.setItem("news",JSON.stringify(x))
        window.location = "../search.html"
    }catch(err){
        console.log(err)
    }
}
