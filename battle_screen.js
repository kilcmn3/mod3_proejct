document.addEventListener("click",(event)=>{
    if(event.target.className === "team-button"){
        choosePlayer(event.target)
    }
})