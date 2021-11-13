import "./style.css"

const searchBtn = document.getElementById("cityBtn")
const cityTable = document.getElementById("cityTable")
const cityInput = document.getElementById("cityInput")
const searchAgentBtn = document.getElementById("searchAgentBtn")
const updateCityBtn = document.getElementById("updateCityBtn")
const isUpdate = document.getElementById("isUpdate")
const mainTable = document.getElementById("mainTable")
const AgentTable = document.getElementById("AgentTable")
const secondaryTable = document.getElementById("secondaryTable")

const NewCityinput = document.getElementById("NewCityinput")
const licenceinput = document.getElementById("licenceinput")

const myApi = "http://localhost:8080"

searchBtn.addEventListener("click", async function(){
    const response = await axios.get(`${myApi}/cities`);
    const citiesList = response.data;
    for(let city of citiesList){
        const td = document.createElement("td");
        td.innerText = city;
        const tr = document.createElement("tr");
        tr.append(td);
        cityTable.append(tr);
    }
    mainTable.style.visibility = "visible";
})

searchAgentBtn.addEventListener("click", async ()=>{
    const response = await axios.get(`${myApi}/agents`, {params: {city : cityInput.value}});
    const agentList = response.data;
    AgentTable.textContent = '';
    for(let agent of agentList){
        const td = document.createElement("td");
        td.innerText = agent.fullName;
        const td2 = document.createElement("td");
        td2.innerText = agent.licenseNumber;
        const tr = document.createElement("tr");
        tr.append(td);
        tr.append(td2);
        AgentTable.append(tr);
    }
    secondaryTable.style.visibility = "visible";
})

updateCityBtn.addEventListener("click", async ()=>{
    const licence = licenceinput.value;
    const city = NewCityinput.value;
    if(!city || !licence){
        isUpdate.innerText = "Licence Or City Is Missing";
        setTimeout(()=>{isUpdate.innerText = ""}, 2000);
        return;
    }
    const response = await axios.put(`${myApi}/agent/${licence}/edit`, {city: city})
    console.log(response); 
    isUpdate.innerText = "City Successfully Updated!";
    setTimeout(()=>{isUpdate.innerText = ""}, 2000);
    return;
})