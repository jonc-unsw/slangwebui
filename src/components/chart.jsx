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
      {label: "Control Flow", value: 20.0}, 
      {label: "Data Dependence", value: 55.0}
    ];

    var bbData = [
      { label: "main_B0", value: 0 },
      { label: "main_B1", value: 1 },
      { label: "main_B2", value: 1 },
      { label: "main_B3", value: 1 },
      { label: "main_B4", value: 2 },
      { label: "main_B5", value: 5 },
      { label: "main_B6", value: 0 }
    ]

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
