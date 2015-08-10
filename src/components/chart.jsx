import React from 'react';
import { BarChart, PieChart, LineChart } from 'react-d3';

class MyChart extends React.Component {

  componentDidMount() {
    window.addEventListener("resize", this.handleResize);
    this.handleResize();
  }

  /*
   * TODO We need a better way to handle this. Currently react-bootstrap cannot
   * accept height/style as a prop to a pane to mark the overflow etc.
   * This works for now but would be nicer to fix react-bootstrap
   * */
  handleResize = () => {
    $(React.findDOMNode(this)).height($(React.findDOMNode(this)).closest( ".Flex" ).height() - 100 );
  }

  render(){
    var pieData = [
      {label: "Control Flow", value: 20.0}, 
      {label: "Data Dependence", value: 55.0}
    ];
    
    var barData = [
      {
        name: "Edges",
        values: [
          {x: "Control Flow", y: 20.0},
          {x: "Data Dependence", y: 55.0}
        ]
      }
    ];

    var bbData = [
      {
        "name": "Series A",
        "values": [
          { x: "main_B0", y: 0 },
          { x: "main_B1", y: 1 },
          { x: "main_B2", y: 1 },
          { x: "main_B3", y: 1 },
          { x: "main_B4", y: 2 },
          { x: "main_B5", y: 5 },
          { x: "main_B6", y: 0 }
        ]
      }
    ];

    return (
    <div style={{'overflow': 'auto'}}>
      <div style={{'display': 'flex'}}>
        <div style={{'flex': 1}} ><PieChart data={pieData} width={450} height={400} radius={110}
          innerRadius={20} sectorBorderColor="white" title="Edges" /></div>
        <div style={{'flex': 1}}><BarChart data={barData} width={500} height={300} title="Edges"
          yAxisLabel="Percentage" xAxisLabel="Edges"/></div>
      </div>
      <div style={{'display': 'flex'}}>
        <div style={{'margin': 'auto'}}><BarChart data={bbData} width={1000} 
          height={300} title="Number of Basic Blocks" yAxisLabel="Number" 
          xAxisLabel="Basic Blocks"/></div>
      </div>
    </div>
    )
  }
}

export { MyChart }
