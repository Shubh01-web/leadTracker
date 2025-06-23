// function saveLead(){
//     console.log("Button Clicked from onclick atribute")
// }


// let myLeads = `["www.awesomelead.com"]`
// myLeads = JSON.parse(myLeads)
// myLeads.push("www.google.com")
// myLeads = JSON.stringify(myLeads)
// console.log(typeof myLeads)

let myLeads = []
let oldLeads = []
const inputEl = document.getElementById("input-el")
const inputBtn = document.getElementById("input-btn")
let clearButton = document.getElementById("clearBtn");
const ulEl = document.getElementById("ul-el")
const tabBtn = document.getElementById("tab-btn")

// localStorage.setItem("myName","Shubham Padle")
// let name = localStorage.getItem("myName")
// console.log(name)
// localStorage.clear()
const deletebtn = document.getElementById("delete-btn")
const leadsFromLocalStorage = JSON.parse( localStorage.getItem("myLeads") )


if(leadsFromLocalStorage){
    myLeads = leadsFromLocalStorage
    render(myLeads)
}


tabBtn.addEventListener("click",  function(){
    // console.log(tabs[0].url)
    //  chrome.tabs.query({currentWindow: true, active: true}, function(tabs){
    //  })
  
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs){        
        myLeads.push(tabs[0].url)
        localStorage.setItem("myLeads",JSON.stringify(myLeads))
        render (myLeads)
    })
})
  
function render(leads){
    let listItems = ""
    for (let i = 0; i < leads.length; i++){
        // listItems += "<li><a target='_blank' href='" + myLeads[i] + "'>" +  myLeads[i] + "</a></li>"
        // or
        listItems += `
                <li>
                    <a target='_blank' href='${leads[i]}'>
                    ${leads[i]}
                    </a>
                </li>
                `
        
        // ulEl.innerHTML += "<li>" +  myLeads[i] + "</li>"
        // or
        // const li = document.createElement("li")
        // li.textContent =  myLeads[i]
        // ulEl.append(li)
}

ulEl.innerHTML = listItems
}

deletebtn.addEventListener("dblclick", function(){
    //console.log("double clicked!")
    localStorage.clear()
    myLeads = []
    render(myLeads)
})

inputBtn.addEventListener("click", function() {
    myLeads.push(inputEl.value)
    inputEl.value = "";
    localStorage.setItem("myLeads",JSON.stringify(myLeads))
    render(myLeads)

    // console.log( localStorage.getItem("myLeads"))
})

 