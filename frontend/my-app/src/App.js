import React, {useState, useEffect} from 'react';
import axios from 'axios';
import DataChart from './Components/Chart';
import  Filter from './Components/Filter'

function App() {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/data')
      .then(response => {
        console.log(data);
        setData(response.data)
        setFilteredData(response.data);
   })
      .catch(error => console.error(error));
  }, []);

  return (
    <div className="App">
      <h1>Data Visualization Dashboard</h1>
      <Filter data={data} setFilteredData={setFilteredData}/>
      <DataChart data={filteredData} />
    </div>
  );
}

export default App;


