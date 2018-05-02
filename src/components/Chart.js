import React, {Component} from 'react';

let PieChart = require('react-d3/piechart').PieChart

class Chart extends React.Component {

  render () {

    let chart;

    if(this.props.totalVotes === 0){
      chart = <h4>You need to vote to see the chart</h4>;
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
