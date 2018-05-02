import React, {Component} from 'react';

let PieChart = require('react-d3/piechart').PieChart

class Chart extends React.Component {
  

  render () {

    let chart;

    if(this.props.totalVotes === 0){
      chart = <div>You need to vote to see the chart</div>;
    } else {
      chart = <PieChart
              data={this.props.data}
              width={500}
              height={400}
              radius={120}
              innerRadius={30}
              title={"Number of votes: " + this.props.totalVotes}
            />
    }

    return (
      <div className="chart">
        {chart}
      </div>
    );
  }
}

export default Chart;
