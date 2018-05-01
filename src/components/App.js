import React, {Component} from 'react';
import Header from './Header.js';

let PieChart = require('react-d3/piechart').PieChart

class App extends React.Component {
  
  constructor(props) {
    super(props);

    this.addVote= this.addVote.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.setValue = this.setValue.bind(this);
    this.setVotes = this.setVotes.bind(this);
    this.addEntry = this.addEntry.bind(this);

    this.state = {
      pieData: [],
      totalVotes: 0,
      newEntryName: ''
    };
  }

  addVote(a){
    this.setState({
      totalVotes: this.state.totalVotes += 1,
    })
    this.setVotes(a.target.id)
    this.setValue()
  }


  //Gets the value from the input and saves it in the state.
  handleInputChange(e){
    this.setState({
      newEntryName: e.target.value
    })
  }
  
  //Re-calculates the values for each entry and pass it to the state, so the page re-render.
  setValue() {
    let temp = this.state.pieData
    for (let i = 0; i < temp.length; i++){
      temp[i].value = Math.round(10000*temp[i].votes/this.state.totalVotes)/100
    };
    this.setState({
      pieData: temp
    })
  };

  // Adds a vote to the entry of a specific id
  setVotes(id){
    let temp = this.state.pieData
    for (let i = 0; i < temp.length; i++){
      if(id == temp[i].id){
          temp[i].votes += 1
      }
    } 
    this.setState({
      pieData: temp
    })
  }

  addEntry() {
    let candidateName = this.state.newEntryName
    let temp = this.state.pieData

    if(candidateName === ''){
      alert("Please insert an entry name")
    } else {
      temp.push({label: candidateName, value: '0', votes: 0, id: temp.length + 1});
        this.setState({
          pieData: temp,
          newEntryName: ''
        })
        //Reset the data from the input
        document.getElementById('newEntry').value = '';
    }
  }

  render () {
    console.log("rerendering")

    let chart;

    if(this.state.totalVotes === 0){
      chart = <div>You need to add some entries and some votes to see the chart</div>;
    } else {
      chart = <PieChart
              data={this.state.pieData}
              width={500}
              height={400}
              radius={100}
              innerRadius={30}
              title="This is my Pie Chart"
            />

    }

    let candidates = this.state.pieData.map(a => 
      <div key={a.id}>
        <button className="voteButton" id={a.id} onClick={this.addVote}>Vote</button>
        {a.label}
      </div>
    );  

    return (
      <div className="content">
        <Header />
        <div className="column left">
        {chart}
        </div>
        <div className="column right">
          {candidates}
          <button className="addButton" onClick={this.addEntry}>Add</button> 
          <input id="newEntry" placeholder="Insert entry name" onChange={this.handleInputChange}/>
        </div>
      </div>
    );
  }
}

export default App;
