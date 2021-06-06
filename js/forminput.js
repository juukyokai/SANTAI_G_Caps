/*  ==========================================
    mulai Ngambil file
* ========================================== */
function readURL(input) {
    if (input.files && input.files[0]) {
        var reader = new FileReader();
        //loading MLModel
        console.log('Loading model..');
        const model = tf.loadLayersModel('model/modeljs/model.json');
        console.log('Successfully loaded model');

        const img = input.files[0];
        const prediction = model.predict(img);
 
        reader.onload = function (e) {
            $('#imageResult')
                .attr('src', e.target.result);
        };
        reader.readAsDataURL(input.files[0]);
        document.getElementById("predictions-safe").innerText=prediction['0']['label']+": "+Math.round(prediction['0']['prob']*100)+"%";
        document.getElementById("predictions-danger").innerText=prediction['1']['label']+": "+Math.round(prediction['1']['prob']*100)+"%";
    }
}

$(function () {
    $('#upload').on('change', function () {
        readURL(input);
    });
});
/*  ==========================================
   selesai  Ngambil file
* ========================================== */


/*  ==========================================
    Nunjukin gambarnya
* ========================================== */
var input = document.getElementById( 'upload' );
var infoArea = document.getElementById( 'upload-label' );

input.addEventListener( 'change', showFileName );
function showFileName( event ) {
  var input = event.srcElement;
  var fileName = input.files[0].name;
  infoArea.textContent = 'File name: ' + fileName;
}
