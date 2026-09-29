const diakok = [
  { nev: "Kovács Anna", osztaly: "10.A", atlag: 4.6 },
  { nev: "Nagy Bence", osztaly: "11.B", atlag: 3.8 },
  { nev: "Tóth Eszter", osztaly: "9.C", atlag: 4.2 },
  { nev: "Szabó Márk", osztaly: "12.A", atlag: 3.5 },
  { nev: "Horváth Lilla", osztaly: "10.B", atlag: 4.9 }
];





function getDataFromForm(){
    let name = document.getElementById("form-name")
    let schoolClass = document.getElementById("form-class")
    let avr = document.getElementById("form-avr")

    diakok.push(
        {
            nev : name.value,
            osztaly:schoolClass.value,
            atlag :avr.value
        }
    )
    loadTable()
}






function loadTable(){
    
    const template = document.getElementById("diakok-template")
    const tbody = document.getElementById("table-body")
    
    diakok.forEach(diak => {
        const row = template.content.cloneNode(true)
        
        row.getElementById("nev").textContent  = diak.nev
        row.getElementById("osztaly").textContent  = diak.osztaly
        row.getElementById("atlag").textContent  = diak.atlag
        
        tbody.appendChild(row)
    });
   
}
