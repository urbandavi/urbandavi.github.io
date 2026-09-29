const diakok = [
  { nev: "Kovács Anna", osztaly: "10.A", atlag: 4.6 },
  { nev: "Nagy Bence", osztaly: "11.B", atlag: 3.8 },
  { nev: "Tóth Eszter", osztaly: "9.C", atlag: 4.2 },
  { nev: "Szabó Márk", osztaly: "12.A", atlag: 3.5 },
  { nev: "Horváth Lilla", osztaly: "10.B", atlag: 4.9 }
];


function clickStatisticsChange (){
    let tanulokSzama = diakok.length
    console.log(tanulokSzama)
    document.getElementById("stTanulokSzama").value = tanulokSzama
}