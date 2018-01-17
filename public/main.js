let dataGraph1 = [], dataBarr = [], chartData = []
let emplacement1 = document.querySelector('#emplacement1')
let capteur1 = document.querySelector('#capteur1')
let dateDebut = document.querySelector('#dateDebut')
let dateFin = document.querySelector('#dateFin')

emplacement1.addEventListener('click', getCapteurs1);
capteur1.addEventListener('change', getData1);

function getCapteurs1(){
    axios.get('/api/emplacement/'+emplacement1.value)
        .then(function(res){
            capteur1.innerHTML = ''
            res.data.forEach(function(capteurs){
                capteur1.innerHTML += "<option>"+capteurs.tagcapteur+"</option>"  
            })
        })
        .catch(function(error){
            console.log(error)
        })
}

function getData1(){
    axios.get('/api/capteur/'+capteur1.value)
        .then(function(res){
            dataGraph1 = []
            res.data.forEach(function(val){
                dataGraph1.push({"date":val.date,"value1":val.value})
            })
        })
        .catch(function(error){
            console.log(error)
        })
}

let dataGraph2 = []
let emplacement2 = document.querySelector('#emplacement2')
let capteur2 = document.querySelector('#capteur2')

if(emplacement2 && capteur2 !== null){
    emplacement2.addEventListener('click', getCapteurs2);
    capteur2.addEventListener('click', getData2);
}


function getCapteurs2(){
    axios.get('/api/emplacement/'+emplacement2.value)
        .then(function(res){
            capteur2.innerHTML = ''
            res.data.forEach(function(capteurs){
                capteur2.innerHTML += "<option>"+capteurs.tagcapteur+"</option>"  
            })
        })
        .catch(function(error){
            console.log(error)
        })
}

function getData2(){
    axios.get('/api/capteur/'+capteur2.value)
        .then(function(res){
            dataGraph2 = []
            res.data.forEach(function(val){
                dataGraph2.push({"value2":val.value,"date":val.date})
            })
        })
        .catch(function(error){
            console.log(error)
        })
}

function filterDate(){
    dataBarr = dataGraph1.filter(data => (data.date >=dateDebut.value && data.date <= dateFin.value))
    dataGraph1 = []
    dataBarr.forEach(data=>{
        dataGraph1.push({"valeur":data.value1})
    })
    foot()
}

function ranger(donnee){
    let prev, mesure = [], cumule = []
    donnee.sort().forEach(data=>{
        if ( data.valeur !== prev ) {
            mesure.push(data.valeur)
            cumule.push(1);
        } else {
            cumule[cumule.length-1]++
        }
        prev = data.valeur
    })
    return [mesure, cumule]
}

function foot(){
    let  mesure2 = [], cumule2 = []
    result = ranger(dataGraph1)
    mesure2 = result[0]
    cumule2 = result[1]
    for (var i = 0; i < mesure2.length; i++) {            
        chartData.push({ "mesure": mesure2[i], "cumule": cumule2[i]})  
    }
    var chart = AmCharts.makeChart("chartdiv", {
        "theme": "light",
        "type": "serial",
        "startDuration": 2,
        "dataProvider": chartData,
        "valueAxes": [{
            "position": "left",
            "title": "Nombre de fois"
        }],
        "graphs": [{
            "id": "g1",
            "balloonText": "[[cumule]] fois [[mesure]] °C",
            "fillColorsField": colors[0],
            "fillAlphas": 1,
            "lineAlpha": 0.1,
            "type": "column",
            "valueField": "cumule"
        }],
        "depth3D": 20,
        "angle": 30,
        "chartCursor": {
            "categoryBalloonEnabled": false,
            "cursorAlpha": 0,
            "zoomable": true
        },
        "chartScrollbar": {
            "autoGridCount": true,
            "graph": "g1",
            "scrollbarHeight": 40
        },
        "categoryField": "mesure",
        "categoryAxis": {
            "gridPosition": "start",
            "labelRotation": 90
        },
    
        "export": {
            "enabled": true
         }
    
    })
}