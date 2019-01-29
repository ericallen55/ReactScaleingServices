import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

class Top extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            maxPeople: 15,
            firstRestQueue: [[]],
            lastRestQueue: [],
            maxPeoplePerQueue: 5,
            personId: 0,
            queueLength: 0,

        };
        this.finishedInLastRestQueue();
        this.finishedFirstAPICallMovePersonToLastQueue(0);     //simulates registering a listener
    }

    addPerson = () => {
        if (this.state.personId < this.state.maxPeople) {
            setTimeout(function () {
                let i = 0;
                let a = [];
                let id = this.state.personId;
                let b = this.state.firstRestQueue;
                while(id === this.state.personId){
                    if(b[i] == null){
                        b[i] = [];
                    }
                    if (b[i].length < 5) {  //If number of api calls to the service exceeds 5 spin up another service
                        this.setState({personId: createPerson(this.state.personId)});
                        a.push(this.state.personId);
                        b[i].push(a);
                        this.setState({firstRestQueue: b});
                    } else {
                        i++;
                        if(b[i] == null){

                            this.finishedFirstAPICallMovePersonToLastQueue(i);
                            console.log("starting queue "+ i)
                        }
                    }
                }
            }.bind(this), getRandomTime(3500))  //Simulate people accessing api, random amount of traffic
        }
    };

    finishedFirstAPICallMovePersonToLastQueue = (i) => {
        setTimeout(function () {
            if (this.state.firstRestQueue[i] != null && this.state.firstRestQueue[i].length > 0) {
                let a = this.state.firstRestQueue;
                let temp = this.state.firstRestQueue[i].slice();
                let item = temp.shift();
                a[i] = temp;
                let b = this.state.lastRestQueue.slice();
                b.push(item);
                this.setState({lastRestQueue: b});
                this.setState({firstRestQueue: a});
                this.finishedFirstAPICallMovePersonToLastQueue(i);
            }else{
                if(i === 0){    //if an api queue isn't the first one and is empty spin it down.
                    this.finishedFirstAPICallMovePersonToLastQueue(i);
                }
            }

        }.bind(this), 2000)     //Amount of time it takes to process a request to first API
    };

    finishedInLastRestQueue = () => {
        setTimeout(function () {
            this.finishedInLastRestQueue();
            if(this.state.lastRestQueue.length > 0) {
                let b = this.state.lastRestQueue.slice();
                b.shift();
                this.setState({lastRestQueue: b});
            }
        }.bind(this), 2000)
    };

    render() {
        this.addPerson();
        return(
            <div className="center-queues">
                <div className="queues" >
                    <h1>1st REST hit</h1>
                    <MultiQueue
                        people = {this.state.firstRestQueue}
                    />
                </div>
                <div className="queues">
                    <h1>Last REST hit</h1>
                    <Queue
                        people = {this.state.lastRestQueue}
                    />
                </div>
            </div>
        )
    }
}

class MultiQueue extends React.Component {
    render() {
        if(this.props.people[0].length > 0){    //Don't supply html if no content
            return (
                this.props.people.map((item) =>
                    <div className="horizontal-queues">
                        {
                            item.map((i) =>
                                <div className="square">
                                    {i}
                                </div>)
                        }
                    </div>
                )
            )
        }
        return null
    }
}

class Queue extends React.Component {

    render() {
        return (
            this.props.people.map((item) =>
                <div className="square">
                    {item}
                </div>)
        )
    }
}

// ========================================

ReactDOM.render(
    <Top/>,
    document.getElementById('root')
);

function createPerson(personId) {
    return ++personId;
}

function getRandomTime(max) {
    return Math.floor(Math.random() * Math.floor(max) + 1000);
}

