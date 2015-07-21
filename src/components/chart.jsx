import React from 'react';
import { BarChart, PieChart, LineChart } from 'react-d3';
/*import rd3 from 'react-d3';
var BarChart = rd3.BarChart;
var PieChart = rd3.PieChart;*/

class MyChart extends React.Component {
  render(){
    var pieData = [
      {label: "Control Flow Edges", value: 20.0}, 
      {label: "Data Dependence Edges", value: 55.0}
    ];
    
    var barData = [
      {label: "Control Flow Edges", value: 20.0}, 
      {label: "Data Dependence Edges", value: 55.0}
    ];

    return (
      <div>
        <PieChart className="fff" data={pieData} width={450} height={400} radius={110}
          innerRadius={20} sectorBorderColor="white" title="Pie Chart" />
        <BarChart data={barData} width={500} height={300} title="Bar Chart"
          yAxisLabel="Label" xAxisLabel="Value"/>
      </div>
    )
  }
}

export { MyChart }
