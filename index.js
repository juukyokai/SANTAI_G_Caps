const webcamElement= document.getElementById('videoElement');
let net;
let isPredicting = false;

var video = document.querySelector("#videoElement");

if (navigator.mediaDevices.getUserMedia) {
  navigator.mediaDevices.getUserMedia({ video: true })
    .then(function (stream) {
      video.srcObject = stream;
    })
    .catch(function (err0r) {
      console.log("Something went wrong!");
    });
}

function startPredicting(){
 isPredicting=true;
 app();
}
function stopPredicting(){
 isPredicting=false;
 app();
}
async function app(){
 console.log('Loading model..');
 net= await tf.automl.loadImageClassification('model.json');
 console.log('Successfully loaded model');
 
 const webcam = await tf.data.webcam(webcamElement);
 while(isPredicting){
 const img = await webcam.capture();
 const result = await net.classify(img);
 
 console.log(result);
 
 document.getElementById("predictions-mask").innerText=result['0']['label']+": "+Math.round(result['0']['prob']*100)+"%";
 document.getElementById("predictions-no-mask").innerText=result['1']['label']+": "+Math.round(result['1']['prob']*100)+"%";
 img.dispose();
 await tf.nextFrame();
 }
}