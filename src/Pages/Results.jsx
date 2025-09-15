import { useEffect, useState } from "react";
import axios from "axios";


export const Results = () => {

  const [Results, setResults] = useState([])
  const dummyData = [
    {
      _id: "6503f1a2c9b1f2a1d4e8a001",
      name: "Charlie Smith",
      createdAt: "2025-09-15T10:10:00.000Z",
    },
    {
      _id: "6503f19fc9b1f2a1d4e8a002",
      name: "Alice Johnson",
      createdAt: "2025-09-15T10:20:00.000Z",
    },
    {
      _id: "6503f19bc9b1f2a1d4e8a003",
      name: "Bob Lee",
      createdAt: "2025-09-15T10:26:00.000Z",
    },
  ];

  
useEffect(() => {
    axios.get('https://bingo-backend-5f720c131b18.herokuapp.com/')
      .then((response) => {
        console.log(response)
        console.log(response.data)
        setResults(response.data);
      })
      .catch((err) => {
        console.error(err);
        setError(true);
      });
  }, []);


  return (
    <>
      <div>
        <h1>Results</h1>
        <ol>
          {dummyData.map((data) => (
            <li key={data._id}>
              <p>{data.name}</p>
              <p>
                {new Date(data.createdAt).toLocaleTimeString("en-GB", {
                  hour: "2-digit",
                  minute: "2-digit",
                  second: "2-digit",
                })}
              </p>
            </li>
          ))}
        </ol>
      </div>
    </>
  );
};
