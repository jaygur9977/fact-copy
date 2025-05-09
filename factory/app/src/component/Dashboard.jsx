import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

function App() {
  const [sensorData, setSensorData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentValue, setCurrentValue] = useState(0);

  const fetchData = async () => {
    try {
      const response = await axios.get('http://localhost:3000/sensor-data');
      setSensorData(response.data);
      if (response.data.length > 0) {
        setCurrentValue(response.data[response.data.length - 1].mq135_value);
      }
      setLoading(false);
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
    const interval = setInterval(fetchData, 1000); // Update every second
    return () => clearInterval(interval);
  }, []);

  const getAirQualityStatus = (value) => {
    if (value < 200) return 'Good';
    if (value < 400) return 'Moderate';
    if (value < 600) return 'Poor';
    return 'Hazardous';
  };

  const getStatusColor = (value) => {
    if (value < 200) return 'bg-green-500';
    if (value < 400) return 'bg-yellow-500';
    if (value < 600) return 'bg-orange-500';
    return 'bg-red-500';
  };

  const chartData = {
    labels: sensorData.map(item => new Date(item.timestamp).toLocaleTimeString()),
    datasets: [
      {
        label: 'MQ135 Sensor Value',
        data: sensorData.map(item => item.mq135_value),
        borderColor: 'rgb(75, 192, 192)',
        backgroundColor: 'rgba(75, 192, 192, 0.5)',
        tension: 0.1
      }
    ]
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Air Quality Over Time',
      },
    },
    scales: {
      y: {
        beginAtZero: true
      }
    }
  };

  if (loading) return <div className="flex justify-center items-center h-screen">Loading...</div>;
  if (error) return <div className="flex justify-center items-center h-screen text-red-500">Error: {error}</div>;

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">Air Quality Monitoring Dashboard</h1>
        
        {/* Current Value Card */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h2 className="text-xl font-semibold mb-4">Current Air Quality</h2>
          <div className="flex items-center">
            <div className={`w-16 h-16 rounded-full ${getStatusColor(currentValue)} flex items-center justify-center mr-4`}>
              <span className="text-white font-bold text-xl">{currentValue}</span>
            </div>
            <div>
              <p className="text-lg font-medium">Status: {getAirQualityStatus(currentValue)}</p>
              <p className="text-sm text-gray-600">Last updated: {new Date().toLocaleTimeString()}</p>
            </div>
          </div>
        </div>

        {/* Chart */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h2 className="text-xl font-semibold mb-4">Historical Data</h2>
          <div className="h-96">
            <Line data={chartData} options={options} />
          </div>
        </div>

        {/* Data Table */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold mb-4">Recent Readings</h2>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Time</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Value</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {sensorData.slice(-10).reverse().map((item, index) => (
                  <tr key={index}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {new Date(item.timestamp).toLocaleTimeString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {item.mq135_value}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(item.mq135_value).replace('bg', 'text').replace('500', '800')} ${getStatusColor(item.mq135_value).replace('500', '100')}`}>
                        {getAirQualityStatus(item.mq135_value)}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;