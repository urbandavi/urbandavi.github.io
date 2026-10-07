const diakok = [
    { nev: "Kovács Anna", osztaly: "10.A", atlag: 4.6 },
    { nev: "Nagy Bence", osztaly: "10.B", atlag: 3.8 },
    { nev: "Tóth Eszter", osztaly: "10.C", atlag: 4.2 },
    { nev: "Szabó Márk", osztaly: "10.A", atlag: 3.5 },
    { nev: "Horváth Lilla", osztaly: "10.B", atlag: 4.9 }
];

const searchBar = document.getElementById("searchBar")
let kitunoKapcsolo = false
function ktKapcsolo() {
    searchBar.value = ""
    if (kitunoKapcsolo == false) {
        kitunoKapcsolo = true
        document.getElementById("kitunoKapcsoloGomb").style.backgroundColor = "#ff0000";
        
        loadTableSecondary()
    }
    else {
        kitunoKapcsolo = false
        document.getElementById("kitunoKapcsoloGomb").style.backgroundColor = "#eeeeee";
        loadTable()
    }
}

function visszaKapcs(){
    kitunoKapcsolo = false
        document.getElementById("kitunoKapcsoloGomb").style.backgroundColor = "#eeeeee";
        loadTable()
}



const errorP = document.getElementById('errorP')


document.addEventListener("DOMContentLoaded", loadTable())
const inputButton = document.getElementById("inputBtn")
inputButton.dataset.currentIndex = -1
inputButton.dataset.orderBy = ""
inputButton.addEventListener("click", () => {
    
    getDataFromForm()
    clickStatisticsChange()
})
searchBar.addEventListener("input", ()=> {
    loadTableSearch()

})

function sortByName() {
   
    diakok.sort((a, b) => a.nev.localeCompare(b.nev));
    searchBar.value = ""
    loadTable()
}
function sortByAvr() {
    
    diakok.sort((a, b) => b.atlag -a.atlag);
    searchBar.value = ""
    loadTable()
}



function loadTableSearch() {

    const template = document.getElementById("diakok-template")
    const tbody = document.getElementById("table-body")
    let rows = tbody.getElementsByClassName("template-rows")

    removeElements(rows.length, rows)

    for (let index = 0; index < diakok.length; index++) {


        if(diakok[index].nev.includes (document.getElementById("searchBar").value)){

        const row = template.content.cloneNode(true)
        const actionBtn = row.getElementById("action-buttons")
        const del = actionBtn.querySelector(".delet")
        const mod = actionBtn.querySelector(".modify")

        row.getElementById("nev").textContent = diakok[index].nev
        row.getElementById("osztaly").textContent = diakok[index].osztaly
        row.getElementById("atlag").textContent = diakok[index].atlag

        del.addEventListener("click", () => {
            diakok.splice(index, 1)
            loadTable()
        })
        mod.addEventListener("click", () => {
            studentName.value = diakok[index].nev
            schoolClass.value = diakok[index].osztaly
            avr.value = diakok[index].atlag
            inputButton.dataset.currentIndex = index
            inputButton.addEventListener("click", () => {
                getDataFromForm()
                loadTable()
            })

        })

        tbody.appendChild(row)
        }










    }


}


const studentName = document.getElementById("form-name")
const schoolClass = document.getElementById("form-class")
const avr = document.getElementById("form-avr")







function getDataFromForm() {

    try {

        let nameV = studentName.value
        let schoolClassV = String(schoolClass.value).toUpperCase()
        schoolClassV = schoolClassV.toUpperCase()
        let avrV = avr.value
        let catchRegExp = /^(?:[1-9]|1[0-3])\.[A-Za-z]$/
        console.log(nameV)
        console.log(schoolClassV)
        console.log(avrV)
        if (String(nameV) == "" || String(schoolClassV) == "" || String(avrV) == "") {
            throw new Error("Hiányzó adatok.")
        }
        if (!catchRegExp.test(String(schoolClassV))) {
            //if(String(schoolClassV) != "10.A" || String(schoolClassV) != "10.B" || String(schoolClassV) != "10.C"){
            throw new Error("Hibás osztály lett megadva.")
        }
        if (avrV < 1 || avrV > 5) {
            throw new Error("Hibás osztályzat lett megadva.")
        }

        let cIndex = inputButton.dataset.currentIndex
        if (cIndex == -1) {
            console.log("Supra")
            diakok.push(
                {
                    nev: studentName.value,
                    osztaly: schoolClass.value.toUpperCase(),
                    atlag: Number(avr.value)
                }
            )
        }
        else {
            console.log("Devon")
            diakok[cIndex] = {
                nev: studentName.value,
                osztaly: schoolClass.value.toUpperCase(),
                atlag: Number(avr.value)
            }
            inputButton.dataset.currentIndex = -1
        }
        clearInputFields()
        if (kitunoKapcsolo == false){

            loadTable()
        }
        else{
            loadTableSecondary()
        }
        console.log(inputButton.dataset.orderBy)
        clickStatisticsChange()
    }
    catch (error) {
        errorP.innerHTML = error
    }



}


function clearInputFields() {
    studentName.value = ""
    schoolClass.value = ""
    avr.value = ""
}


function loadTable() {

    errorP.innerHTML = ""
    const template = document.getElementById("diakok-template")
    const tbody = document.getElementById("table-body")
    let rows = tbody.getElementsByClassName("template-rows")

    removeElements(rows.length, rows)

    for (let index = 0; index < diakok.length; index++) {
        const row = template.content.cloneNode(true)
        const actionBtn = row.getElementById("action-buttons")
        const del = actionBtn.querySelector(".delet")
        const mod = actionBtn.querySelector(".modify")

        row.getElementById("nev").textContent = diakok[index].nev
        row.getElementById("osztaly").textContent = diakok[index].osztaly
        row.getElementById("atlag").textContent = diakok[index].atlag

        del.addEventListener("click", () => {
            diakok.splice(index, 1)
            clickStatisticsChange()
            loadTable()
            //visszaKapcs() //visszakapcs
        })
        mod.addEventListener("click", () => {
            studentName.value = diakok[index].nev
            schoolClass.value = diakok[index].osztaly
            avr.value = diakok[index].atlag
            inputButton.dataset.currentIndex = index
            inputButton.addEventListener("click", () => {
                loadTable()
            })

        })

        tbody.appendChild(row)

    }


}


function loadTableSecondary() {

    const template = document.getElementById("diakok-template")
    const tbody = document.getElementById("table-body")
    let rows = tbody.getElementsByClassName("template-rows")

    removeElements(rows.length, rows)

    for (let index = 0; index < diakok.length; index++) {
        const row = template.content.cloneNode(true)
        const actionBtn = row.getElementById("action-buttons")
        const del = actionBtn.querySelector(".delet")
        const mod = actionBtn.querySelector(".modify")

        if (kitunoKapcsolo == true) {
            if (diakok[index].atlag >= 4.5) {

                row.getElementById("nev").textContent = diakok[index].nev
                row.getElementById("osztaly").textContent = diakok[index].osztaly
                row.getElementById("atlag").textContent = diakok[index].atlag
                        actionBtn.dataset.index = index
        del.addEventListener("click", () => {
            diakok.splice(index, 1)
            clickStatisticsChange()
            loadTableSecondary()
        })
        mod.addEventListener("click", () => {
            studentName.value = diakok[index].nev
            schoolClass.value = diakok[index].osztaly
            avr.value = diakok[index].atlag
            inputButton.dataset.currentIndex = index
            inputButton.addEventListener("click", () => {
                getDataFromForm()
                
            })

        })

        tbody.appendChild(row)
            }

        }
        else {
            row.getElementById("nev").textContent = diakok[index].nev
            row.getElementById("osztaly").textContent = diakok[index].osztaly
            row.getElementById("atlag").textContent = diakok[index].atlag
                    actionBtn.dataset.index = index
        del.addEventListener("click", () => {
            diakok.splice(index, 1)
            clickStatisticsChange()
            loadTable()
        })
        mod.addEventListener("click", () => {
            studentName.value = diakok[index].nev
            schoolClass.value = diakok[index].osztaly
            avr.value = diakok[index].atlag
            inputButton.dataset.currentIndex = index
            inputButton.addEventListener("click", () => {
                getDataFromForm()
            })

        })

        tbody.appendChild(row)
        }



    }


}




function removeElements(rowsCount, rows) {
    for (let index = 0; index < rowsCount; index++) {
        rows[0].remove()
    }
}












function clickStatisticsChange() { //bekötni törlés gombra is a statisztikát
    let tanulokSzama = diakok.length
    //console.log(tanulokSzama)
    document.getElementById("stTanulokSzama").textContent = tanulokSzama

    //-------------------------------
    /* let osztalyAtlag
     let atlagOsszegSzamitas =0
 
     for (let i = 0; i < diakok.length; i++) {
         if()
         atlagOsszegSzamitas += diakok[i].atlag
     }
     osztalyAtlag = atlagOsszegSzamitas/tanulokSzama
     osztalyAtlag = Math.round(osztalyAtlag * 100) / 100
     document.getElementById("stOsztalyAtlag").textContent = osztalyAtlag
 */
    let select = document.getElementById('osztalySelectId');
    let valasztottOsztaly = document.getElementById('stOsztalyInput').value

   /* console.log("VOSZTALY")
    console.log(valasztottOsztaly)
    console.log("VOSZTALY")*/

    let osztalyAtlag = 0
    let atlagOsszegSzamitas = 0
    let osztalyDiakokSzama = 0
    let talaltOsztalyBool = false



    /*console.log("Ciklus előtti teszt:")
    console.log(diakok)*/

    //console.log("Választott osztály:")
    //console.log(valasztottOsztaly)
    for (let i = 0; i < diakok.length; i++) {
       // console.log("egy cikluskör")
      //  console.log(diakok[i].osztaly)
        if (String(diakok[i].osztaly).toLocaleLowerCase() == String(valasztottOsztaly).toLocaleLowerCase()) {
            //console.log("TesztSiker")
            atlagOsszegSzamitas += diakok[i].atlag
            osztalyDiakokSzama += 1
            talaltOsztalyBool = true
        }
    }
    if (talaltOsztalyBool == false) {
        document.getElementById('stOsztalyAtlag').innerHTML = "Nincs ilyen osztály"
    }
    /* console.log("Átlagtesztelés")
     console.log("Átlagösszegszámítás")
     console.log(atlagOsszegSzamitas)
     console.log("osztálydiákokszáma")
     console.log(osztalyDiakokSzama) //Itt javítani az átlagszámításon
     console.log()*/
   // console.log("Nulla-e?")
   // console.log(osztalyDiakokSzama)
    if (osztalyDiakokSzama != 0) {
        osztalyAtlag = atlagOsszegSzamitas / osztalyDiakokSzama
        osztalyAtlag = Math.round(osztalyAtlag * 100) / 100
        osztalyAtlag = Number(osztalyAtlag)
        /*console.log("VOSZTALYATLAG")
        console.log(osztalyAtlag)
        console.log(typeof osztalyAtlag)
        console.log("VOSZTALYATLAG")*/
        document.getElementById("stOsztalyAtlag").textContent = osztalyAtlag
    }

    //-------------------------------

    let legjobbDiakList = []
    let legjobbDiakJegy = 0;
    for (let i = 0; i < diakok.length; i++) {
        if (diakok[i].atlag > legjobbDiakJegy) {
            legjobbDiakJegy = diakok[i].atlag
        }
    }

    for (let i = 0; i < diakok.length; i++) {
        if (diakok[i].atlag == legjobbDiakJegy) {
            legjobbDiakList.push(diakok[i].nev)
        }
    }
   // console.log("Listateszt")
   // console.log(legjobbDiakList)
    document.getElementById("stLegjobbTanulo").textContent = legjobbDiakList

    //-------------------------------
    let jelesNum = 0
    let joNum = 0
    let kozepesNum = 0
    let elegsegesNum = 0
    let elegtelenNum = 0

    for (let i = 0; i < diakok.length; i++) {
        if (diakok[i].atlag >= 4.5) {
            jelesNum += 1
        }
        if (diakok[i].atlag >= 3.5 && diakok[i].atlag <= 4.49) {
            joNum += 1
        }
        if (diakok[i].atlag >= 2.5 && diakok[i].atlag <= 3.49) {
            kozepesNum += 1
        }
        if (diakok[i].atlag >= 2 && diakok[i].atlag <= 2.49) {
            elegsegesNum += 1
        }
        if (diakok[i].atlag < 2) {
            elegtelenNum += 1
        }
    }

    document.getElementById("stJeles").textContent = jelesNum
    document.getElementById("stJo").textContent = joNum
    document.getElementById("stKozepes").textContent = kozepesNum
    document.getElementById("stElegseges").textContent = elegsegesNum
    document.getElementById("stElegtelen").textContent = elegtelenNum




}





document.addEventListener("DOMContentLoaded", function () {
    clickStatisticsChange()
});