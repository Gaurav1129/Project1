import React, { useEffect, useRef } from 'react';
import { Chart, LinearScale, CategoryScale, BarController, BarElement, Title, Tooltip, Legend, ArcElement } from 'chart.js';

const DataChart = ({ data }) => {
  const chartRef = useRef(null); // Create a ref to store the chart instance

  // Function to prepare datasets for different variables
  const prepareData = (data, variable) => {
    const labels = data.map(d => d.topic || 'Unknown');
    const values = data.map(d => d[variable]);

    return { labels, values };
  };

  useEffect(() => {
    // Register Chart.js components
    Chart.register(LinearScale, CategoryScale, BarController, BarElement, Title, Tooltip, Legend, ArcElement);

    const ctx = document.getElementById('myChart').getContext('2d');

    // Destroy the previous chart instance if it exists
    if (chartRef.current) {
      chartRef.current.destroy();
    }

    // Prepare datasets for Intensity and Likelihood
    const intensityData = prepareData(data, 'intensity');
    const likelihoodData = prepareData(data, 'likelihood');
    const relevanceData = prepareData(data, 'relevance');
    const yearData = prepareData(data, 'start_year');
    const topicsData = prepareData(data, 'topics');
    const countryData = prepareData(data, 'country');
    const cityData = prepareData(data, 'city');
    const regionData = prepareData(data, 'region');


    // Create a new chart
    const chartInstance = new Chart(ctx, {
      type: 'bar', // Change to 'doughnut' or 'pie' for categorical data
      data: {
        labels: intensityData.labels,
        datasets: [
          {
            label: 'Intensity',
            data: intensityData.values,
            backgroundColor: 'rgba(75, 192, 192, 0.6)',
            borderColor: 'rgba(75, 192, 192, 1)',
            borderWidth: 1,
          },
          {
            label: 'Likelihood',
            data: likelihoodData.values,
            backgroundColor: 'pink',
            borderColor: 'pink',
            borderWidth: 1,
          },
          {
            label: '    Relevance',
            data: relevanceData.values,
            backgroundColor: 'blue',
            borderColor: 'blue',
            borderWidth: 1,
          },
          {
            label: 'Topics',
            data: topicsData.values,
            backgroundColor: 'green',
            borderColor: 'green',
            borderWidth: 1,
          },
          {
            label: 'Region',
            data: regionData.values,
            backgroundColor: 'yellow',
            borderColor: 'yellow',
            borderWidth: 1,
          },
          {
            label: 'City',
            data: cityData.values,
            backgroundColor: 'purple',
            borderColor: 'purple',
            borderWidth: 1,
          },
          {
            label: 'Country',
            data: countryData.values,
            backgroundColor: 'magenta',
            borderColor: 'magenta',
            borderWidth: 1,
          },
          {
            label: 'Year',
            data: yearData.values,
            backgroundColor: 'orange',
            borderColor: 'orange',
            borderWidth: 1,
          }
        ],
      },
      options: {
        scales: {
          y: {
            beginAtZero: true,
          },
        },
      },
    });

    // Save the chart instance to the ref
    chartRef.current = chartInstance;

    // Cleanup function to destroy the chart on component unmount or before creating a new one
    return () => {
      if (chartRef.current) {
        chartRef.current.destroy();
      }
    };
  }, [data]); // Re-render the chart when `data` changes

  return <canvas id="myChart"></canvas>;
};

export default DataChart;


