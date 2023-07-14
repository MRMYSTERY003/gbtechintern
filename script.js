

import { initializeApp } from "https://www.gstatic.com/firebasejs/10.0.0/firebase-app.js";
import { getDatabase, ref, set, onValue }   from "https://www.gstatic.com/firebasejs/10.0.0/firebase-database.js";


var myGauge = Gauge(document.getElementById("methan"),{
    dialRadius: 35,
    dialStartAngle: 135,
    dialEndAngle: 45,
    value: 23,
    max: 100,
    min: 0,
    valueDialClass: "value",
    valueClass: "value-text",
    dialClass: "dial",
    gaugeClass: "gauge",
    showValue: true,
    gaugeColor: null,
    label: function(val) {return Math.round(val);} // returns a string label that will be rendered in the center
});


 
const firebaseConfig = {
    apiKey: "AIzaSyCXT0dAdGNgcqgVr3mX76dISlmYG_NLK9o",
    authDomain: "intern-e06f1.firebaseapp.com",
    projectId: "intern-e06f1",
    storageBucket: "intern-e06f1.appspot.com",
    messagingSenderId: "922833540197",
    appId: "1:922833540197:web:833194c15df3b41474228c"
  };
  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  // Initialize variables
  const db = getDatabase(app);


var room1light1 = document.getElementById('room1light1');
var pathl = ref(db,'/data/light');
var patht = ref(db,'/data/temp');

function setval(path, val){
    set(pathl, val);
}


function  set_status(){
    onValue(pathl, (snapshot) => {
        const data = snapshot.val();
        console.log(data)
        if (data == 1){
            room1light1.checked = true;
        }else{
            room1light1.checked = false;
        }
    });

    onValue(patht, (snapshot) => {
        const data = snapshot.val();
        console.log(data);
        myGauge.setValueAnimated(data, 1);
    });
}

 

set_status();


  // event listner for room 1

room1light1.addEventListener("click", function(){
if(room1light1.checked == true){
    console.log("turned on");
    setval('/esp8266/light1', 1);
}else{
    console.log("turned off");
    setval('/esp8266/light1', 0);
}
});
