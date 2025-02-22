var firebaseConfig = {
  apiKey: "XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
  authDomain: "XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
  projectId: "XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
  storageBucket: "XXXXXXXXXXXXXXXXXXXXXXXXX",
  messagingSenderId: "XXXXXXXXXXXXXX",
  appId: "XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
  measurementId: "XXXXXXXXXXXXXX"
  
};
  // Initialize Firebase

  firebase.initializeApp(firebaseConfig);
 
 
 //MenuToggler
 let toggle = document.querySelector('.toggle');
 let navigation = document.querySelector('.navigation');
 let main = document.querySelector('.main');
 
 toggle.onclick = function(){
     navigation.classList.toggle('active');
     main.classList.toggle('active');
 }
 
 
 
 
 // adding  hovered class in selected list item
 let list = document.querySelectorAll('.navigation li');
 function activeLink(){
     list.forEach((item) => 
     item.classList.remove('hovered'));
     this.classList.add('hovered');
 }
 list.forEach((item) => 
 item.addEventListener('click', activeLink));


 function logout(){
    firebase.auth().signOut().then(function (){
      //window.open("index.html", "_self")
    });
    
  }



  function loadvalues(){
    const mainBox = document.querySelector('.mainBox');
  }

  var data;

  firebase.database().ref("IOT").on("value", function(snapshot) {
    data = snapshot.val();
    dataloaded(data);
 }, function (error) {
    console.log("Error: " + error.code);
 });

// run after data loading
function dataloaded(data){
  document.getElementById("name1").innerHTML = "Name: " + data.Patient1.Name;
  document.getElementById("age1").innerHTML = "Age: " + data.Patient1.Age;
  document.getElementById("medRep1").innerHTML = "Medical Report: " + "<a id = 'demrep1' > Demo Report </a>";
  document.getElementById("demrep1").href = data.Patient1.MedicalReport;
  
  var BPMdata = [];
  var BPMtime = [];

  for (const key in data.Patient1.RHD.BPM) {
    //console.log(`${key}: ${data.Patient1.RHD.BPM[key].Ts}`);
    
    var dd = new Date(parseInt(`${data.Patient1.RHD.BPM[key].Ts}`)).toLocaleTimeString();

    const today = new Date(Date.now());
    const date = new Date(parseInt(`${data.Patient1.RHD.BPM[key].Ts}`));
    var diff = Math.abs(today.getTime() - date.getTime()) / 3600000;

    if (diff < 24) { 
      console.log(diff); 
      BPMdata.push(`${data.Patient1.RHD.BPM[key].BPM}`);
      var dd = new Date(parseInt(`${data.Patient1.RHD.BPM[key].Ts}`)).toLocaleTimeString();
      BPMtime.push(dd);
    }

  }

  console.log(BPMdata);
  console.log(BPMtime);

  new Chart("pat1BPMchart", {
    type: "line",
    data: {
      labels: BPMtime,
      datasets: [{
        
        fill: false,
        lineTension: 0,
        backgroundColor: "rgba(0,0,255,1.0)",
        borderColor: "rgba(0,0,255,0.5)",
        data: BPMdata,
      }]
    },
    options: {
      legend: {
        display: false
     },
      maintainAspectRatio: false,
      scales: {
          yAxes: [{
              display: true,
              stacked: true,
              ticks: {
                  min: 0, // minimum value
                  max: 150 // maximum value
              }
          }]
      }
  }
  });

  var TEMPData = [];
  var TEMPtiming = [];


  for (const key in data.Patient1.RHD.Bodytemp) {
    //console.log(`${key}: ${data.Patient1.RHD.BPM[key].Ts}`);
    var temp = `${data.Patient1.RHD.Bodytemp[key].TEMP}`;
    temp  = temp*1.8 + 32;
    
    //if(new Date(parseInt(`${data.Patient1.RHD.Bodytemp[key].Ts}`)) )
    const today = new Date(Date.now());
    const date = new Date(parseInt(`${data.Patient1.RHD.Bodytemp[key].Ts}`));
    var diff = Math.abs(today.getTime() - date.getTime()) / 3600000;

    if (diff < 24) { 
      console.log(diff); 
      TEMPData.push(temp);
      var dd = new Date(parseInt(`${data.Patient1.RHD.Bodytemp[key].Ts}`)).toLocaleTimeString();
      TEMPtiming.push(dd);
    }
    
  }

  console.log(TEMPData);

  new Chart("pat1TEMPchart", {
    type: "line",
    data: {
      labels: TEMPtiming,
      datasets: [{
        
        fill: false,
        lineTension: 0,
        backgroundColor: "rgba(255,0,0,1.0)",
        borderColor: "rgba(255,0,0,0.5)",
        data: TEMPData,
      }]
    },
    options: {
      legend: {
        display: false
     },
      maintainAspectRatio: false,
      scales: {
          yAxes: [{
              display: true,
              stacked: true,
              ticks: {
                  stepSize: 30,
                  min: 50, // minimum value
                  max: 110 // maximum value
              }
          }]
      }
  }
  }); 

        var ecgstring = data.Patient1.RHD.ECG1 + data.Patient1.RHD.ECG2;
        var yyaxis = ecgstring.split(' ');
        console.log(yyaxis.length);
        var xxaxis =[];
        for(var ii = 0; ii < yyaxis.length; ii++){
          xxaxis.push(ii);
        }
        
        
        new Chart("myChart", {
          type: "line",
          data: {
            labels: xxaxis,
            datasets: [{
              
              fill: true,
              lineTension: 0,
              backgroundColor: "rgba(86, 252, 3,0.2)",
              borderColor: "rgba(86, 252, 3)",
              data: yyaxis,
            }]
          },
          options: {
            legend: {
              display: false
           },
            bezierCurve: false,
            elements: {
              point:{
                  radius: 0
              }
          },
            maintainAspectRatio: false,
            scales: {
                yAxes: [{
                    display: true,
                    stacked: true,
                    ticks: {
                        min: 250, // minimum value
                        max: 800 // maximum value
                    }
                }]
            }
        }
        }); 

}

function fetchecg(){
  firebase.database().ref("IOT/Patient1/RHD/ECGfetch").set(1);
  window.alert("Query sent to the Patient Device, Wait few minutes while data is updates");
}







