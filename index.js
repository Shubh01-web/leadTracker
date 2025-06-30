
// New Code
//
let myLeads = []

const inputEl = document.getElementById("input-el")
const inputBtn = document.getElementById("input-btn")

const ulEl = document.getElementById("ul-el")
const tabBtn = document.getElementById("tab-btn")
const deleteBtn = document.getElementById("delete-btn")
const searchEl = document.getElementById("search-el")

// Auto-fill input with current tab's URL
chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    if (tabs[0] && tabs[0].url) {
        inputEl.value = tabs[0].url
    }
})

// Load saved leads and render them
chrome.storage.local.get(["myLeads"], function (result) {
    if (result.myLeads) {
        myLeads = result.myLeads
        render(myLeads)
    }
})

// Save input field lead
inputBtn.addEventListener("click", function () {
    const newLead = inputEl.value.trim()
    if (newLead === "") return

    chrome.storage.local.get(["myLeads"], function (result) {
        let leads = result.myLeads || []
        leads.push(newLead)
        chrome.storage.local.set({ myLeads: leads }, function () {
            inputEl.value = ""
            myLeads = leads
            render(myLeads)
        })
    })
})

// Save current tab URL
tabBtn.addEventListener("click", function () {
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        chrome.storage.local.get(["myLeads"], function (result) {
            let leads = result.myLeads || []
            leads.push(tabs[0].url)
            chrome.storage.local.set({ myLeads: leads }, function () {
                myLeads = leads
                render(myLeads)
            })
        })
    })
})

// Delete all leads
deleteBtn.addEventListener("dblclick", function () {
    chrome.storage.local.clear(function () {
        myLeads = []
        render(myLeads)
    })
})

// Search filter
searchEl.addEventListener("input", function () {
    const searchTerm = searchEl.value.toLowerCase()
    const filteredLeads = myLeads.filter(lead => lead.toLowerCase().includes(searchTerm))
    render(filteredLeads)
})

// Render function
function render(leads) {
    let listItems = ""
    for (let i = 0; i < leads.length; i++) {
        listItems += `
            <li>
                <a target="_blank" href="${leads[i]}">
                    ${leads[i]}
                </a>
            </li>
        `
    }
    ulEl.innerHTML = listItems
}

//
//
// // function saveLead(){
// //     console.log("Button Clicked from onclick atribute")
// // }


// // let myLeads = `["www.awesomelead.com"]`
// // myLeads = JSON.parse(myLeads)
// // myLeads.push("www.google.com")
// // myLeads = JSON.stringify(myLeads)
// // console.log(typeof myLeads)

// let myLeads = []
// let oldLeads = []
// const inputEl = document.getElementById("input-el")
// const inputBtn = document.getElementById("input-btn")
// let clearButton = document.getElementById("clearBtn");
// const ulEl = document.getElementById("ul-el")
// const tabBtn = document.getElementById("tab-btn")
// const searchEl = document.getElementById("search-el");

// searchEl.addEventListener("input", function () {    //new
//     const searchTerm = searchEl.value.toLowerCase();    //new   
//     const filteredLeads = myLeads.filter(lead => lead.toLowerCase().includes(searchTerm));  //new
//     render(filteredLeads);  //new
// });

// // localStorage.setItem("myName","Shubham Padle")
// // let name = localStorage.getItem("myName")
// // console.log(name)
// // localStorage.clear()
// chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) { //new
//     if (tabs[0] && tabs[0].url) {   //new
//         inputEl.value = tabs[0].url;    //new
//     }
// });
// const deletebtn = document.getElementById("delete-btn")
// // const leadsFromLocalStorage = JSON.parse( localStorage.getItem("myLeads") )
// // chrome.storage.sync.get(["myLeads"], function(result) { //new
// //     if (result.myLeads) {   //new
// //         myLeads = result.myLeads;   //new
// //         render(myLeads);    //new
// //     }
// // });
// chrome.storage.local.get(["myLeads"], function (result) {
//     if (result.myLeads) {
//         myLeads = result.myLeads;
//         render(myLeads);

//         // ✅ Search bar logic here
//         const searchEl = document.getElementById("search-el");
//         searchEl.addEventListener("input", function () {
//             const searchTerm = searchEl.value.toLowerCase();
//             const filteredLeads = myLeads.filter(lead =>
//                 lead.toLowerCase().includes(searchTerm)
//             );
//             render(filteredLeads);
//         });
//     }
// });

// // if(leadsFromLocalStorage){
// //     myLeads = leadsFromLocalStorage
// //     render(myLeads)
// // }


// // tabBtn.addEventListener("click",  function(){
// //     // console.log(tabs[0].url)
// //     //  chrome.tabs.query({currentWindow: true, active: true}, function(tabs){
// //     //  })

// //     chrome.tabs.query({active: true, currentWindow: true}, function(tabs){        
// //         myLeads.push(tabs[0].url)
// //         // localStorage.setItem("myLeads",JSON.stringify(myLeads))
// //         chrome.storage.local.set({ myLeads: myLeads }) //new
// //         render (myLeads)
// //     })

// // // chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
// // //     const currentTabUrl = tabs[0].url;
// // //     inputEl.value = currentTabUrl;  // auto-fill the input box
// // // });

// //  })

// tabBtn.addEventListener("click", function () {
//     chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
//         chrome.storage.local.get(["myLeads"], function (result) {
//             let leads = result.myLeads || [];
//             leads.push(tabs[0].url);
//             chrome.storage.local.set({ myLeads: leads }, function () {
//                 myLeads = leads;
//                 render(myLeads);
//             });
//         });
//     });
// });


// function render(leads){
//     let listItems = ""
//     for (let i = 0; i < leads.length; i++){
//         // listItems += "<li><a target='_blank' href='" + myLeads[i] + "'>" +  myLeads[i] + "</a></li>"
//         // or
//         listItems += `
//                 <li>
//                     <a target='_blank' href='${leads[i]}'>
//                     ${leads[i]}
//                     </a>
//                 </li>
//                 `
        
//         // ulEl.innerHTML += "<li>" +  myLeads[i] + "</li>"
//         // or
//         // const li = document.createElement("li")
//         // li.textContent =  myLeads[i]
//         // ulEl.append(li)
// }

// ulEl.innerHTML = listItems
// }

// deletebtn.addEventListener("dblclick", function(){
//     //console.log("double clicked!")
//     // localStorage.clear()
//     chrome.storage.local.clear(function (){ // New 
//     myLeads = []
//     render(myLeads)
//     })
// })

// // inputBtn.addEventListener("click", function() {
// //     myLeads.push(inputEl.value)
// //     inputEl.value = "";
// //     localStorage.setItem("myLeads",JSON.stringify(myLeads))
// //     render(myLeads)

// //     // console.log( localStorage.getItem("myLeads"))
// // })

// inputBtn.addEventListener("click", function () {
//     const newLead = inputEl.value.trim();
//     if (newLead === "") return;

//     chrome.storage.local.get(["myLeads"], function (result) {
//         let leads = result.myLeads || [];
//         leads.push(newLead);
//         chrome.storage.local.set({ myLeads: leads }, function () {
//             inputEl.value = "";
//             myLeads = leads;
//             render(myLeads);
//         });
//     });
// });


