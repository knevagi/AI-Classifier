import React,{useState} from 'react'

const FileUpload = ({className}: {className: string}) => {
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [predictionReceived, setPredictionReceived] = useState(false);
    const [prediction, setPrediction] = useState('');
    const submit = async (event: { preventDefault: () => void }) => {
      event.preventDefault();
      console.log(className)
      const formData = new FormData();
      if (selectedFile) {
        formData.append('file', selectedFile);
      }else{
        return;
      } 
  
      const response = await fetch('http://127.0.0.1:5000/upload?class='+className+'', {
        method: 'POST',
        body: formData,
      });
  
      const data = await response.json();
      setPredictionReceived(true);
      setPrediction(data.prediction);
      console.log(data);
    };
    const fileSelected = (event: React.ChangeEvent<HTMLInputElement>) => {
        if(event!=null && event.target.files!=null&&event.target.files.length>0)
        setSelectedFile(event.target.files[0]);
      };
    const removeSelectedImage = () => {
        setSelectedFile(null);
        setPredictionReceived(false);
        setPrediction('');
    };
  return (
    <form onSubmit={submit}>
      <div className="flex flex-col w-full lg:flex-col my-10 ">
        <div className="grid flex-grow h-32 card bg-base-300 rounded-box place-items-center">
          <h1>Upload Image</h1>
          <input onChange={fileSelected} type="file" accept="image/png, image/jpeg" className="file-input file-input-bordered w-full max-w-xs" />  
        </div> 
        {predictionReceived && selectedFile && (          
          <div style={styles.preview}>
            <h1>{prediction}</h1>
            <img
              src={URL.createObjectURL(selectedFile)}
              style={styles.image}
              alt="Thumb"
            />
            <button onClick={removeSelectedImage} className='btn bg-red-500 text-white my-10'>
              Remove This Image
            </button>
          </div>
        )}
        <div className='flex items-center justify-center my-10'>
          <button type='submit' className='btn btn-primary w-20 '>Upload</button>
        </div>
      </div>
    </form>
  )
}

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
  
  
  
  