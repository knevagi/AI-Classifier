import React,{useEffect, useState} from 'react'

interface ClassTableProps {
    classifiertype: string; // replace 'string' with the actual type of 'classifiertype'
}

const ClassTable : React.FC<ClassTableProps> =  ({classifiertype}) => {
    const [classes, setclasses] = useState([])
    useEffect(() => {
        // Code to run when the component is loaded
        // Add your Flask endpoint logic here
        // For example, you can make an API call or perform any other action

        // Example API call using fetch
        console.log(classifiertype);
        fetch('http://127.0.0.1:5000/api/getClasses/'+classifiertype)
            .then((response) => response.json())
            .then((data) => {
                // Handle the response data
                setclasses(data)
                console.log(data);
            })
            .catch((error) => {
                // Handle any errors
                console.error(error);
            });
    }, []);
  return (
    <div className="max-h-80 overflow-auto">
        <h3 className="text-3xl font-bold">Trained classes</h3>
        {
            classes.length == 0 ? <p>No classes found</p>
            :
            <table className="table">
                <thead>
                <tr>
                    <th>Sr. No.</th>
                    <th>Name</th>
                </tr>
                </thead>
                <tbody>
                    {classes.map((item) => (
                        <tr key={item["index"]}>
                            <td>{item["index"]+1}</td>
                            <td>{item["value"]}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        }
    </div>
  )
}

export default ClassTable