import { ApexOptions } from 'apexcharts';
import axios from 'axios';
import React, { useState, useEffect } from 'react';
import ReactApexChart from 'react-apexcharts';

const Chart = () => {
  const currentMonth = new Date().getMonth() + 1;
  const currentYear = new Date().getFullYear();

  const monthOptions = [
    { value: '1', label: 'Janeiro' },
    { value: '2', label: 'Fevereiro' },
    { value: '3', label: 'Março' },
    { value: '4', label: 'Abril' },
    { value: '5', label: 'Maio' },
    { value: '6', label: 'Junho' },
    { value: '7', label: 'Julho' },
    { value: '8', label: 'Agosto' },
    { value: '9', label: 'Setembro' },
    { value: '10', label: 'Outubro' },
    { value: '11', label: 'Novembro' },
    { value: '12', label: 'Dezembro' },
  ];

  const yarsOptions = [
    { value: '2023', label: '2023' },
    { value: '2024', label: '2024' },
  ];

  const [selectedMonth, setSelectedMonth] = useState(currentMonth);
  const [selectedYear, setSelectedYear] = useState(currentYear);
  const [chartData, setChartData] = useState([]);
  const [options, setOptions] = useState({
    chart: {
      type: 'bar',
    },
    xaxis: {
      categories: [],
    },
  } as ApexOptions);

  const handleMonthChange = (e) => {
    setSelectedMonth(e.target.value);
  };

  const handleYearChange = (e) => {
    setSelectedYear(e.target.value);
  };

  const handleFilterSubmit = (e) => {
    e.preventDefault();
    updateChartData();
  };

  const updateChartData = async () => {
    try {
      const dados = await GetDiasAgendados(selectedMonth, selectedYear);
      
      const daysOfWeek = {};
      
      dados.forEach((item) => {
        const { nomeDiaDaSemana, totalReservas } = item;
        
        if (!daysOfWeek[nomeDiaDaSemana]) {
          daysOfWeek[nomeDiaDaSemana] = 0;
        }
        
        daysOfWeek[nomeDiaDaSemana] += totalReservas;
      });

      const categories = Object.keys(daysOfWeek);
      const data = Object.values(daysOfWeek);

      const newOptions = {
        ...options,
        xaxis: {
          categories: categories,
        },
      };

      setChartData(data);
      setOptions(newOptions);
    } catch (error) {
      console.error("Erro ao buscar dados da API:", error);
    }
  };

  async function GetDiasAgendados(mes, ano) {
    try {
      const response = await axios.get(
        `https://api-arboretto-production.up.railway.app/api-arboretto-dev/v1/dia-demandado/listar-dias-demandados?mes=${mes}&ano=${ano}`
      );
      return response.data;
    } catch (error) {
      console.error("Erro ao buscar dados da API:", error);
      throw error;
    }
  }

  useEffect(() => {
    updateChartData();
  }, [selectedMonth, selectedYear]);

  return (
    <div>
      <form onSubmit={handleFilterSubmit}>
        <div>
          <label htmlFor="month">Mês:</label>
          <select id="month" value={selectedMonth} onChange={handleMonthChange}>
            {monthOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
                </option>
            ))}
          </select>
          
        </div>
        <div>
          <label htmlFor="year">Ano:</label>
          <select id="year" value={selectedYear} onChange={handleYearChange}>
          {yarsOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
                </option>
            ))}
          </select>
        </div>
        {/* <button type="submit">Filtrar</button> */}
      </form>
      <div id="chart">
        <ReactApexChart options={options} series={[{ data: chartData }]} type="bar" height={450} />
      </div>
    </div>
  );
};

export default Chart;
