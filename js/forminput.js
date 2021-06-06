/*  ==========================================
    mulai Ngambil file
* ========================================== */
function readURL(input) {
    if (input.files && input.files[0]) {
        var reader = new FileReader();
        //loading MLModel
        console.log('Loading model..');
        const model = tf.loadLayersModel('https://capstone-santai-b21-cap0384.et.r.appspot.com/');
        console.log('Successfully loaded model');

        const img = input.files[0];
        const prediction = model.prediction(img);
 
        reader.onload = function (e) {
            $('#imageResult')
                .attr('src', e.target.result);
        };
        reader.readAsDataURL(input.files[0]);
        document.getElementById("predictions-safe").innerText=result['0']['label']+": "+Math.round(result['0']['prob']*100)+"%";
        document.getElementById("predictions-danger").innerText=result['1']['label']+": "+Math.round(result['1']['prob']*100)+"%";
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
