from flask import Flask,jsonify,request
from flask_cors import CORS
import pandas as pd
import os
from werkzeug.utils import secure_filename
from torchvision import datasets
from torchvision import transforms
from torchvision.transforms import ToTensor
import torchvision
import torch
from torch import nn
#app instance
app = Flask(__name__)
CORS(app, origins=["http://localhost:3000"])
@app.route('/api/getClasses/<className>', methods=['GET'])
def getClasses(className):
    if(className == 'Food'):
        df = pd.read_csv('C:\\Prev Laptop Files\\PythonProject\\my-app\\public\\assets\\data\\train_classes.csv')

        # Convert the 'classes' column to a dictionary
        classes_dict = df['Classes'].to_dict()

        # Convert the dictionary to a JSON object
        json_data = [{'index': key, 'value': value} for key, value in classes_dict.items()]

        # Return the JSON response
        return jsonify(json_data)
    return jsonify([])
def predictonCustomImage(model:nn.Module,image,class_names,transform,device):
  """Makes predictions on custom image"""
  target_image=torchvision.io.read_image(str(image)).type(torch.float32)/255
  if transform:
    target_image_transformed=transform(target_image)
  model.eval()
  with torch.inference_mode():
    target_image_pred=model(target_image_transformed.unsqueeze(0).to(device))
  actual_preds_target=torch.argmax(torch.softmax(target_image_pred,dim=1),dim=1)
  return f"Pred:{class_names[actual_preds_target.cpu()]} | Prob:{torch.max(torch.softmax(target_image_pred,dim=1)).item():.2f}"
@app.route('/upload', methods=['POST'])
def upload_file():
    className = request.args.get('class', default='*', type=str)
    device="cuda" if torch.cuda.is_available() else "cpu"
    print(device)
    directory = os.path.join('uploads', className)
    if not os.path.exists(directory):
        os.makedirs(directory)
    file = request.files['file']
    filename = secure_filename(file.filename)
    file.save(os.path.join(directory, filename))
    df = pd.read_csv('C:\\Prev Laptop Files\\PythonProject\\my-app\\public\\assets\\data\\train_classes.csv')

    # Convert the 'classes' column to a list
    classes_list = df['Classes'].tolist()

    model_path = 'C:\\Prev Laptop Files\\PythonProject\\my-app\\server\\models\\food101_efficientnet_b0_adam_0.001lr_10epochs_withaaugmentation_100%_data_64batchsize_anotherone_.pth'

    loaded_model = torchvision.models.efficientnet_b0() # we do not specify ``weights``, i.e. create untrained model
    loaded_model.to(device)
    loaded_model.classifier=nn.Sequential(
        nn.Dropout(p=0.2,inplace=True),
        nn.Linear(in_features=1280,out_features=len(classes_list))
    ).to(device)
    loaded_model.load_state_dict(torch.load(model_path, map_location=device))
    normalize = transforms.Normalize(mean=[0.485, 0.456, 0.406],
                                    std=[0.229, 0.224, 0.225])
    train_transforms_custom = transforms.Compose([
        transforms.Resize((320,320)),
        normalize
    ])
    result=predictonCustomImage(model=loaded_model,image=os.path.join(directory, filename),class_names=classes_list,transform=train_transforms_custom,device=device)
    return {'prediction': result}

if __name__ == '__main__':
    app.run(debug=True)