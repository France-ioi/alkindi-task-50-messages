
import React from 'react';
import {Button} from 'react-bootstrap';
import {connect} from 'react-redux';
import {range} from 'range';
import classnames from 'classnames';

function WorkspaceSelector (state) {
  const {
    views: {CipheredText, SearchTool, SelectedText, FrequencyAnalysis, Rotor, SchedulingControls, DecipheredText, HintRequestFeedback},
    actions: {requestHint},
    rotors, editing
  } = state;
  let hintRequest = null;
  if (typeof editing.rotorIndex === 'number') {
    const editingCell = rotors[editing.rotorIndex].cells[editing.cellRank];
    if (!editingCell.hint && !editingCell.locked) {
      hintRequest = editing;
    }
  }
  return {
    CipheredText, SearchTool, SelectedText, FrequencyAnalysis, Rotor, SchedulingControls, DecipheredText,
    HintRequestFeedback, requestHint, hintRequest, nbRotors: rotors.length
  };
}

class Workspace extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      searchString: ''
    }
  }

  search = (str) => {
    this.setState({searchString : str })
  }

  render () { 
    const {CipheredText, SearchTool, SelectedText, FrequencyAnalysis, Rotor, SchedulingControls, DecipheredText, nbRotors, hintRequest, HintRequestFeedback} = this.props;

    return (
      <div>
        <h2>{"Message chiffré"}</h2>
        <CipheredText searchString={this.state.searchString}/>
        
        <h2>Search Tool</h2>
        <SearchTool search={this.search}/>

        <h2>{"Analyse de fréquence de la sélection"}</h2>
        <FrequencyAnalysis/>

        <h2>Substitution:</h2>
        <div className='clearfix'>
          <div>
            {range(0, nbRotors).map(index => <Rotor key={index} index={index}/>)}
            {/* <SchedulingControls/> */}
          </div>
        </div>
        
        <div style={{width:"100%", margin:"20px 0"}}>
          <div style={{textAlign:'center'}}>
          <h5 >Hints</h5>
            <div style={{display: "inline-grid",padding:"10px",border: "1px solid #000", borderRight:"0",width: "30%", background:"rgb(202, 202, 202)"}}>
              <p style={{fontWeight: 'bold', textAlign: 'center'}}>{"Indices"}</p>
              <p>{"Pour un coût de "}<span style={{fontWeight: 'bold'}}>{"5 points"}</span>{", cliquez sur une case de rotor et validez pour obtenir sa valeur."}</p>
              <div style={{textAlign: 'center', margin: '10px 0'}}>
                <Button onClick={this.requestHint} disabled={!hintRequest}>{`Valider`}</Button>
              </div>
            </div>

            <div style={{display: "inline-grid",padding:"10px",border: "1px solid #000", borderLeft:"0",width: "30%", background:"rgb(202, 202, 202)"}}>
              <p style={{fontWeight: 'bold', textAlign: 'center'}}>{"Indices"}</p>
              <p>{"Pour un coût de "}<span style={{fontWeight: 'bold'}}>{"5 points"}</span>{", cliquez sur une case de rotor et validez pour obtenir sa valeur."}</p>
              <div style={{textAlign: 'center', margin: '10px 0'}}>
                <Button onClick={this.requestHint} disabled={!hintRequest}>{`Valider`}</Button>
              </div>
            </div>
          </div>
        </div>
        <HintRequestFeedback/>
          <h2>{"Texte déchiffré"}</h2>
          <DecipheredText/>
      </div>
    );
  }
  requestHint = () => {
    const {dispatch, requestHint, hintRequest} = this.props;
    dispatch({type: requestHint, payload: {request: hintRequest}});
  };
}

export default {
  views: {
    Workspace: connect(WorkspaceSelector)(Workspace),
  }
};
