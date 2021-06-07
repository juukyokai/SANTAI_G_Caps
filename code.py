from flask import Flask, render_template, request
from werkzeug import secure_filename
from keras.preprocessing.image import ImageDataGenerator
import tensorflow as tf
import numpy as np
import os

try:
	import shutil
	shutil.rmtree('uploaded / image')
	% cd uploaded % mkdir image % cd ..
	print()
except:
	pass

model = tf.keras.models.load_model('model / model')
app = Flask(__name__)

app.config['UPLOAD_FOLDER'] = 'uploaded / image'

@app.route('/')
def upload_f():
	return render_template('index.html')

def predict(path):
    img = image.load_img(path, target_size=(150, 150))
    x = image.img_to_array(img)
    x = np.expand_dims(x, axis=0)

    images = np.vstack([x])
    classes = model.predict(images, batch_size=10)
    print(classes[0])
    if classes[0]>0.5:
        return str(fn + " is Safe")
    else:
        return str(fn + " is Danger")

# def finds():
# 	test_datagen = ImageDataGenerator(
#         rescale = 1./255
#         fill_mode='nearest')
# 	vals = ['Safe', 'Danger'] # change this according to what you've trained your model to do
# 	test_dir = 'uploaded'
# 	test_generator = test_datagen.flow_from_directory(
# 			test_dir,
# 			target_size =(150, 150),
# 			shuffle = False,
# 			class_mode ='binary',
# 			batch_size = 10)
    
# 	pred = model.predict_generator(test_generator)
# 	print(pred)
# 	return str(vals[np.argmax(pred)])

@app.route('/uploader', methods = ['GET', 'POST'])
def upload_file():
	if request.method == 'POST':
		f = request.files['file']
        path = os.path.join(app.config['UPLOAD_FOLDER'], secure_filename(f.filename))
		f.save(path)
		val = predict(path)
		return render_template('index.html', ss = val)

if __name__ == '__main__':
	app.run(host='127.0.0.1', port=5000, debug=false)
