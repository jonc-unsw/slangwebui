import React from 'react';
import { BarChart, PieChart, LineChart } from 'react-d3';

class MyChart extends React.Component {
  render(){
    var pieData = [
      {label: "Control Flow", value: 20.0}, 
      {label: "Data Dependence", value: 55.0}
    ];
    
    var barData = [
      {label: "Control Flow", value: 20.0}, 
      {label: "Data Dependence", value: 55.0}
    ];

    return (
      <div style={{'display': 'flex'}}>
        <div style={{'flex': 1}} ><PieChart data={pieData} width={450} height={400} radius={110}
          innerRadius={20} sectorBorderColor="white" title="Edges" /></div>
        <div style={{'flex': 1}}><BarChart data={barData} width={500} height={300} title="Edges"
          yAxisLabel="Percentage" xAxisLabel="Edges"/></div>
      </div>
    )
  }
}

export { MyChart }
