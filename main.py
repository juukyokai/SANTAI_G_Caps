from flask import Flask, render_template, request
import shutil
import werkzeug
from keras.preprocessing import image
from keras.preprocessing.image import ImageDataGenerator
import tensorflow as tf
import numpy as np
import os


model = tf.keras.models.load_model('model/model.h5')
app = Flask(__name__)

app.config['UPLOAD_FOLDER'] = 'uploaded/images'


@app.route('/')
def index():
	reset()
	return render_template('index.html')

def predict(path, fn):
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
def reset():
	#clean directory
	try:
		shutil.rmtree('uploaded/images')
	except OSError:
		pass
	
	#ensure if the folder exists
	try:
		os.mkdir(app.config['UPLOAD_FOLDER'])
	except OSError:
		pass


#making route for uploading new Image
@app.route('/uploader', methods = ['GET', 'POST'])
def upload_file():
	if request.method == 'POST':
		f = request.files['file']
		path = os.path.join(app.config['UPLOAD_FOLDER'], f.filename)
		f.save(path)
		val = predict(path, f.filename)
		return render_template('predict.html', ss = val, fp = 'images'+ f.filename)

#making route for resetting data storage
@app.route('/reset', methods = ['GET', 'POST'])
def reset_image():
	reset()
	return render_template('index.html')

if __name__ == '__main__':
	app.run(debug=True)
