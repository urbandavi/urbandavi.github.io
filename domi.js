const diakok = [
  { nev: "Kovács Anna", osztaly: "10.A", atlag: 5 },
  { nev: "Nagy Bence", osztaly: "10.B", atlag: 1 },
  { nev: "Tóth Eszter", osztaly: "10.C", atlag: 4.2 },
  { nev: "Szabó Márk", osztaly: "10.A", atlag: 2 },
  { nev: "Horváth Lilla", osztaly: "10.B", atlag: 1 }
];


function clickStatisticsChange(){ //bekötni törlés gombra is a statisztikát
    let tanulokSzama = diakok.length
    console.log(tanulokSzama)
    document.getElementById("stTanulokSzama").textContent = tanulokSzama

    //-------------------------------
    //let valasztottOsztaly = document.getElementById("osztalySelectId").value //hiba, osztályselector
    //let valasztottOsztaly = document.querySelector('#osztalySelectId');
    let select = document.getElementById('osztalySelectId');
    let valasztottOsztaly = select.options[select.selectedIndex].value;

    console.log("VOSZTALY")
    console.log(valasztottOsztaly)
    console.log("VOSZTALY")

    let osztalyAtlag
    let atlagOsszegSzamitas =0
    let osztalyDiakokSzama = 0;

    for (let i = 0; i < diakok.length; i++) {
        if(String(diakok[i].osztaly) == String(valasztottOsztaly)){
            console.log("TesztSiker")
            atlagOsszegSzamitas += diakok[i].atlag
            osztalyDiakokSzama+=1
        }
    }
    osztalyAtlag = atlagOsszegSzamitas/osztalyDiakokSzama
    osztalyAtlag = Number(Math.round(osztalyAtlag * 100) / 100)
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