from flask import Flask, jsonify, request
from flask_cors import CORS
import pandas as pd
import os
from io import BytesIO
from PIL import Image
import torchvision
import torch
from torch import nn
from torchvision import transforms
import base64

app = Flask(__name__)
CORS(app, origins=["http://localhost:3000"])

@app.route('/api/getClasses/<className>', methods=['GET'])
def getClasses(className):
    if(className == 'Food'):
        df = pd.read_csv('data\\train_classes.csv')
        classes_dict = df['Classes'].to_dict()
        json_data = [{'index': key, 'value': value} for key, value in classes_dict.items()]
        return jsonify(json_data)
    return jsonify([])

def predictonCustomImage(model:nn.Module, image_bytes, class_names, transform, device):
    """Makes predictions on custom image from bytes"""
    # Convert bytes to PIL Image
    image = Image.open(BytesIO(image_bytes))
    # Convert PIL Image to Tensor
    target_image = transforms.ToTensor()(image)
    
    if transform:
        target_image = transform(target_image)
    
    model.eval()
    with torch.inference_mode():
        target_image_pred = model(target_image.unsqueeze(0).to(device))
    
    actual_preds_target = torch.argmax(torch.softmax(target_image_pred,dim=1),dim=1)
    return f"Pred:{class_names[actual_preds_target.cpu()]} | Prob:{torch.max(torch.softmax(target_image_pred,dim=1)).item():.2f}"

@app.route('/upload', methods=['POST'])
def upload_file():
    className = request.args.get('class', default='*', type=str)
    device = "cuda" if torch.cuda.is_available() else "cpu"
    
    # Get the file from request
    file = request.files['file']
    # Read the file bytes
    image_bytes = file.read()
    
    df = pd.read_csv('data\\train_classes.csv')
    classes_list = df['Classes'].tolist()

    model_path = 'models\\food101_efficientnet_b0_adam_0.001lr_10epochs_withaaugmentation_100%_data_64batchsize_anotherone_.pth'

    loaded_model = torchvision.models.efficientnet_b0()
    loaded_model.to(device)
    loaded_model.classifier = nn.Sequential(
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
    
    result = predictonCustomImage(
        model=loaded_model,
        image_bytes=image_bytes,
        class_names=classes_list,
        transform=train_transforms_custom,
        device=device
    )
    
    # Create a data URL for the image
    image = Image.open(BytesIO(image_bytes))
    buffered = BytesIO()
    image.save(buffered, format="JPEG")
    img_str = f"data:image/jpeg;base64,{base64.b64encode(buffered.getvalue()).decode()}"
    
    return {
        'prediction': result,
        'imageData': img_str
    }

if __name__ == '__main__':
    app.run(debug=True)