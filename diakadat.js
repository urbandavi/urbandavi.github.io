const diakok = [
  { nev: "Kovács Anna", osztaly: "10.A", atlag: 4.6 },
  { nev: "Nagy Bence", osztaly: "10.B", atlag: 3.8 },
  { nev: "Tóth Eszter", osztaly: "10.C", atlag: 4.2 },
  { nev: "Szabó Márk", osztaly: "10.A", atlag: 3.5 },
  { nev: "Horváth Lilla", osztaly: "10.B", atlag: 4.9 }
];





function getDataFromForm(){
    let avr = 0
    let name = document.getElementById("form-name")
    let schoolClass = document.getElementById("form-class")
    avr = document.getElementById("form-avr")


try{

    let nameV = name.value
    let schoolClassV = schoolClass.value
    let avrV = avr.value

    if(String(nameV) == "" || String(schoolClassV) == "" || String(avrV) == ""){
        throw new Error ("Hiányzó adatok.")
    }
    if(String(schoolClassV) != "10.A" && String(schoolClassV) != "10.B" && String(schoolClassV) != "10.C"){
        throw new Error("Hibás osztály, választható osztályok: 10.A, 10.B, 10.C")
    }
    if(avrV < 1 || avrV > 5){
        throw new Error ("Hibás osztályzat lett megadva.")
    }



    diakok.push(
        {
            nev : name.value,
            osztaly:schoolClass.value,
            atlag :avr.value
        }
    )
    loadTable()
    clickStatisticsChange()
}
catch(error){
    document.getElementById('errorP').innerHTML = error
}
    


}






function loadTable(){
    
    const template = document.getElementById("diakok-template")
    const tbody = document.getElementById("table-body")
    let rows = tbody.getElementsByClassName("template-rows")
    removeElements(rows.length, rows)
    
    for (let index = 0; index < diakok.length; index++) {
        const row = template.content.cloneNode(true)
        
        row.getElementById("nev").textContent  = diakok[index].nev
        row.getElementById("osztaly").textContent  = diakok[index].osztaly
        row.getElementById("atlag").textContent  = diakok[index].atlag
        
        
        //const actionBtn = row.getElementById("action-buttons")
        //console.log(actionBtn)
        //let del = actionBtn.querySelector(".delet")
        //console.log(del)
        //del.addEventListener("click" ,deleteStudent(index))
        tbody.appendChild(row)
        
    }    

   
}
function deleteStudent(index) {
    diakok.splice(index, 1)
    loadTable() 
}


function removeElements(rowsCount, rows) {
    for (let index = 0; index < rowsCount; index++) { 
        rows[0].remove()
    }
}












function clickStatisticsChange(){ //bekötni törlés gombra is a statisztikát
    let tanulokSzama = diakok.length
    console.log(tanulokSzama)
    document.getElementById("stTanulokSzama").textContent = tanulokSzama

    //-------------------------------
    let osztalyAtlag
    let atlagOsszegSzamitas =0

    for (let i = 0; i < diakok.length; i++) {
        atlagOsszegSzamitas += diakok[i].atlag
    }
    osztalyAtlag = atlagOsszegSzamitas/tanulokSzama
    osztalyAtlag = Math.round(osztalyAtlag * 100) / 100
    document.getElementById("stOsztalyAtlag").textContent = osztalyAtlag

    //-------------------------------

    let legjobbDiakList=[]
    let legjobbDiakJegy = 0;
    for (let i = 0; i < diakok.length; i++){
        if(diakok[i].atlag>legjobbDiakJegy){
            legjobbDiakJegy=diakok[i].atlag
        }
    }

    for (let i = 0; i < diakok.length; i++){
        if(diakok[i].atlag==legjobbDiakJegy){
            legjobbDiakList.push(diakok[i].nev)
        }
    }
    console.log("Listateszt")
    console.log(legjobbDiakList)
    document.getElementById("stLegjobbTanulo").textContent = legjobbDiakList

    //-------------------------------
    let jelesNum = 0
    let joNum = 0
    let kozepesNum = 0
    let elegsegesNum = 0
    let elegtelenNum = 0

    for (let i = 0; i < diakok.length; i++){
        if(diakok[i].atlag >=4.5){
            jelesNum+=1
        }
        if(diakok[i].atlag >= 3.5 && diakok[i].atlag <= 4.49){
            joNum+=1
        }
        if(diakok[i].atlag >= 2.5 && diakok[i].atlag <= 3.49){
            kozepesNum+=1
        }
        if(diakok[i].atlag >= 2 && diakok[i].atlag <= 2.49){
            elegsegesNum+=1
        }
        if(diakok[i].atlag < 2){
            elegtelenNum+=1
        }
    }

    document.getElementById("stJeles").textContent = jelesNum
    document.getElementById("stJo").textContent = joNum
    document.getElementById("stKozepes").textContent = kozepesNum
    document.getElementById("stElegseges").textContent = elegsegesNum
    document.getElementById("stElegtelen").textContent = elegtelenNum




}