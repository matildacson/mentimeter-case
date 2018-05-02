import React, {Component} from 'react';

let PieChart = require('react-d3/piechart').PieChart

class Voting extends React.Component {
  
  constructor(props) {
    super(props);

    this.addVote = this.addVote.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.addEntry = this.addEntry.bind(this);
    this.removeEntry = this.removeEntry.bind(this)

    this.state = {
      pieData: [{id: 1, label: "Margaritha", value: '0', votes: 0}, 
                {id: 2, label: "John", value: '0', votes: 0}, 
                {id: 3, label: "Tim", value: '0', votes: 0}],
      totalVotes: 0,
      newEntryName: ''
    };
  }

  addVote(a){
    let newTotalVotes = this.state.totalVotes + 1;
    let temp = this.state.pieData;

    for (let i = 0; i < temp.length; i++){

      if(a.target.id == temp[i].id){
        temp[i].votes += 1;
        temp[i].value = Math.round(1000*temp[i].votes/newTotalVotes)/10;
      }

      else{
        temp[i].value = Math.round(1000*temp[i].votes/newTotalVotes)/10;
      }
    }

    //Updating the state values
    this.setState({
      pieData: temp, 
      totalVotes: newTotalVotes
    })
  }


  //Gets the value from the input and saves it in the state.
  handleInputChange(e){
    this.setState({
      newEntryName: e.target.value
    })
  }

  //Adds a new entry to the pieData - array
  addEntry() {
    let candidateName = this.state.newEntryName
    let temp = this.state.pieData
    let newId = this.generateId()

    //Avoiding empty labels
    if(candidateName === ''){
      alert("Please insert an entry name")
    } 
    else{

      //Ensuring that the label is unique by going through all labels in pie data..
      for(var i = 0; i < temp.length; i++){

        //If not unique, the user is asked to enter a new entry, and the input box is reset. 
        if(temp[i].label === candidateName){
          alert("This entry already exists. Please enter a unique entry name.");
          document.getElementById('newEntry').value = '';
          return
        }
      }

      //If there are no errors, the entry object is pushed into pieData.
      temp.push({id: newId, label: candidateName, value: '0', votes: 0});
      this.setState({
        pieData: temp,
        newEntryName: ''
      })
      //Reset the data from the input
      document.getElementById('newEntry').value = '';
    }
  }

  //Called when clicking the remove button. 
  //Removes the selected entry, updates the values of the remaining entries
  //and removes the deleted entry's votes from the total votes. 
  removeEntry(a){

    let temp = this.state.pieData
    let newTotalVotes = this.state.totalVotes
    for(let i = 0; i < temp.length; i++){
      if(temp[i].id == a.target.id){
        newTotalVotes -= temp[i].votes
        temp.splice(i, 1)
        break
      }
    }

    for(let i = 0; i < temp.length; i++){
      temp[i].value = Math.round(1000*temp[i].votes/newTotalVotes)/10;
    }

    this.setState({
      pieData: temp,
      totalVotes: newTotalVotes
    })
  }

  // Creates a unique id to the new entry. 
  generateId() {
    let temp = this.state.pieData
    let id = 1;
    for(let i = 0; i < temp.length; i++ ){
      if(temp[i].id === id){
        id += 1
      } else {
        return id
      }
    }
    return id
  }
  

  render () {

    let chart;

    if(this.state.totalVotes === 0){
      chart = <div>You need to vote to see the chart</div>;
    } else {
      chart = <PieChart
              data={this.state.pieData}
              width={500}
              height={400}
              radius={120}
              innerRadius={30}
              title={"Number of votes: " + this.state.totalVotes}
            />

    }
    //Mapping all entries with corresponding vote and remove buttons
    let candidates = this.state.pieData.map(a => 
      <div key={a.id} className="entry">
        <div className="labelCol">
          <button className="voteButton" id={a.id} onClick={this.addVote}>
            <span id={a.id} className="glyphicon glyphicon-ok"></span>
          </button>
          Vote for {a.label}
        </div>
        <div className="trashCol">
          <button className="removeButton" id={a.id} onClick={this.removeEntry}>
            <span id={a.id} className="glyphicon glyphicon-trash"></span>
          </button>
        </div>
      </div>
    );  

    return (
      <div className="data">
        <div className="leftColumn">
          <div className="background">
            {chart}
          </div>
        </div>
        <div className="rightColumn">
          <div className="background">
            <div className="voteHeader">Vote or add a new entry</div>
              {candidates}
            <button className="addButton" onClick={this.addEntry}><span className="glyphicon glyphicon-plus"></span></button> 
            <input id="newEntry" placeholder="Create new entry" onChange={this.handleInputChange}/>
          </div>
        </div>
      </div>
    );
  }
}

export default Voting;
