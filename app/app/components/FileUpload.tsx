import React,{useState} from 'react'

const FileUpload = ({className}: {className: string}) => {
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [predictionReceived, setPredictionReceived] = useState(false);
    const [prediction, setPrediction] = useState('');
    const [imageData, setImageData] = useState<string | null>(null);

    const submit = async (event: { preventDefault: () => void }) => {
        event.preventDefault();
        const formData = new FormData();
        if (!selectedFile) return;
        
        formData.append('file', selectedFile);

        try {
            const response = await fetch(`http://127.0.0.1:5000/upload?class=${className}`, {
                method: 'POST',
                body: formData,
            });

            const data = await response.json();
            setPredictionReceived(true);
            setPrediction(data.prediction);
            setImageData(data.imageData);
        } catch (error) {
            console.error('Upload failed:', error);
        }
    };

    const removeSelectedImage = () => {
        setSelectedFile(null);
        setImageData(null);
        setPredictionReceived(false);
        setPrediction('');
    };

    const fileSelected = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            setSelectedFile(file);
            setPredictionReceived(false);
            setPrediction('');
            setImageData(null);
        }
    };

    return (
        <form onSubmit={submit}>
            <div className="flex flex-col w-full lg:flex-col my-10 ">
                <div className="grid flex-grow h-32 card bg-base-300 rounded-box place-items-center">
                    <h1>Upload Image</h1>
                    <input onChange={fileSelected} type="file" accept="image/png, image/jpeg" className="file-input file-input-bordered w-full max-w-xs" />  
                </div> 
                {predictionReceived && imageData && (          
                    <div className="flex flex-col items-center justify-center gap-4 mt-8">
                        <h1 className="text-black text-xl">{prediction}</h1>
                        <div className="w-full max-w-md">
                            <img
                                src={imageData}
                                alt="Uploaded preview"
                                className="w-full h-auto object-contain rounded-lg shadow-lg"
                                style={{ maxHeight: '320px' }}
                            />
                        </div>
                        <button 
                            onClick={removeSelectedImage} 
                            className='btn bg-red-500 text-white hover:bg-red-600'
                        >
                            Remove This Image
                        </button>
                    </div>
                )}
                <div className='flex items-center justify-center my-10'>
                    <button type='submit' className='btn btn-primary w-20 '>Upload</button>
                </div>
            </div>
        </form>
    );
};

export default FileUpload

const styles = {
    container: {
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      paddingTop: 50,
    },
    preview: {
      marginTop: 50,
      display: 'flex',
      flexDirection: 'column' as 'column',
      alignItems: 'center',
      justifyContent: 'space-evenly',
    },
    image: { maxWidth: 200, maxHeight: 320 },
    delete: {
      cursor: "pointer",
      padding: 15,
      background: "red",
      color: "white",
      border: "none",
      margin:10
    },
  };
  
  
  
  