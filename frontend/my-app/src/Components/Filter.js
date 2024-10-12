import React, { useState, useEffect } from 'react';

function Filter({ data, setFilteredData }) {
  const [filters, setFilters] = useState({
    end_year: '',
    topic: '',
    sector: '',
    region: '',
    pestle: '',
    source: '',
    country: '',
  
  });

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters({
      ...filters,
      [name]: value
    });
  };

  useEffect(() => {
    let filtered = data;
    if (filters.end_year) filtered = filtered.filter(d => d.end_year === filters.end_year);
    if (filters.topic) filtered = filtered.filter(d => d.topic === filters.topic);
    if (filters.sector) filtered = filtered.filter(d => d.sector === filters.sector);
    if (filters.region) filtered = filtered.filter(d => d.region === filters.region);
    if (filters.pestle) filtered = filtered.filter(d => d.pestle === filters.pestle);
    if (filters.source) filtered = filtered.filter(d => d.source === filters.source);
    if (filters.country) filtered = filtered.filter(d => d.country === filters.country);
   
    
    setFilteredData(filtered);
  }, [filters, data, setFilteredData]);

  return (
    <div>
      <label htmlFor="topic">Topic:</label>
      <select name="topic" value={filters.topic} onChange={handleFilterChange}>
        <option value="">All</option>
        <option value="gas">Gas</option>
        <option value="oil">Oil</option>
        <option value="market">Market</option>
      </select>

      {/* Add more filters in a similar way */}
      <label htmlFor="end_year">End Year:</label>
      <select name="end_year" value={filters.end_year} onChange={handleFilterChange}>
        <option value="">All</option>
        <option value="2108">2018</option>
        <option value="2025">2025</option>
        <option value="2027">2027</option>
      </select>

      <label htmlFor="sector">Sector:</label>
      <select name="sector" value={filters.sector} onChange={handleFilterChange}>
        <option value="">All</option>
        <option value="energy">Energy</option>
        <option value="environment">Environment</option>
        <option value="government">Goverment</option>
      </select>

      <label htmlFor="region">Region:</label>
      <select name="region" value={filters.region} onChange={handleFilterChange}>
        <option value="">All</option>
        <option value="north america">North America</option>
        <option value="central america">Central America</option>
        <option value="world">World</option>
      </select>

      <label htmlFor="pestle">Pest:</label>
      <select name="pestle" value={filters.pestle} onChange={handleFilterChange}>
        <option value="">All</option>
        <option value="industries">Industries</option>
        <option value="environmental">Environmental</option>
        <option value="economic">Economic</option>
      </select>

      <label htmlFor="source">Source:</label>
      <select name="source" value={filters.source} onChange={handleFilterChange}>
        <option value="">All</option>
        <option value="eia">EIA</option>
        <option value="sustainablebrands.com">Sustainablebrands.com</option>
        <option value="sbwire">SBWire</option>
      </select>

      <label htmlFor="country">Country:</label>
      <select name="country" value={filters.country} onChange={handleFilterChange}>
        <option value="">All</option>
        <option value="united states of america">United States of America</option>
        <option value="mexico">Mexico</option>
        <option value="nigeria">Nigeria</option>
      </select>

    </div>
  );
}

export default Filter;
