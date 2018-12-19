import React, { Component } from 'react';
import {actions} from  './RunsActions'
import {connect} from 'react-redux';
import { Link } from 'react-router-dom';
import Dropdown from 'react-dropdown';
import './runs.css';

class Runs extends Component {
    constructor(props){
        super(props);
        this.state ={
            currentRun : 0,
            ballIndex : 0,
            extraType: '',
            bowlerOptions : [],
            nextBowler : null
        }
    }

    storeRun(run) {
        this.setState({
            currentRun: parseInt(run.target.value)
        })
    }

    storeExtra(extra){
        this.setState({
            extraType: extra.target.value
        })
    }

    updateBallCount(){
        debugger;
        if(this.state.extraType === 'B' && this.state.extraType === 'Lb' || this.state.extraType ===''){
            if (this.state.ballIndex < 6) {
                this.setState({
                    ballIndex: this.state.ballIndex + 1
                })
            } else {
                this.setState({
                    ballIndex: 0
                })
            }
        }
    }

    recordRuns(){
        let runs = 0
        switch(this.state.extraType) {
            case 'B':
                runs = 0
                break;
            case 'Lb':
                runs = 0
                break;
            case 'Wd':
                runs = 1
                break;
            case 'Nb':
                runs = 1
                break;
        }
        this.setState({
            currentRun : this.state.currentRun + runs
        }, () => {
            this.props.recordRuns(this.state.currentRun)
            this.setState({
                currentRun: 0,
                extraType: ''
            })
        }
        )   

    }

    getAvailableBowlers(){
        this.setState({
            bowlerOptions : ['Brett Lee', 'Glenn McGrath', 'Shane Warne']
        })
    }


    updateCurrentBowler(player){
        console.log(player.value)
        this.setState({
            nextBowler : player.value
        })
    }
    render() {
        let runs = [];
        for(let index = 0 ;index< 8; index++){
            runs.push(
                <button key={index} className="button-number" value ={index} onClick = {this.storeRun.bind(this)}>{index}</button>
            )
        }
        let extras = ["Wd", "Nb", "B", "Lb"]
            let showExtras = extras.map(extra =>
            <button key={extra} className = "button-number" value = { extra } onClick = { this.storeExtra.bind(this) } > { extra }</button >
        )
        
        const defaultOption = ""

       return (
           <div className="runs">
                <h1>Runs</h1>
               {runs}
               <br></br>
               
                   <h1>Extra</h1>
               {showExtras}
               <button className="button-next"  onClick = {() => {
                   this.updateBallCount()
                   this.recordRuns(this.state.currentRun)
                   this.props.recordBalls(this.state.nextBowler, this.state.ballIndex, this.state.currentRun, this.state.extraType)
               }}>
                   Next Ball
               </button>
               <div className="button-stats"><Link to="/stats">Stats</Link></div>

               <button className="button-next" onClick = { () => {
                   this.getAvailableBowlers()
               }}>Change Bowler</button>
                <div className="dropdown">
                <Dropdown className="button-number" options={this.state.bowlerOptions} onChange={this.updateCurrentBowler.bind(this)}
                value={this.state.nextBowler} placeholder="Select next bowler" />
                </div>
           </div>
       )
    }
}

export const mapStateToProps = (state) => {
    return {
        lastName: state.playerReducer.lastName
    }
}

export const  mapDispatchToProps = (dispatch) => {
    return {
        recordRuns : function(run) {
            dispatch(actions.recordRuns(run))
        },
        recordBalls : function(name, ballIndex, run ,extraType) {
            dispatch(actions.recordBalls(name, ballIndex, run, extraType))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Runs);