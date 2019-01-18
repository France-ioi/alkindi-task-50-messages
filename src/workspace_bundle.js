
import React from 'react';
import {Button, FormGroup, FormControl, Form} from 'react-bootstrap';
import {connect} from 'react-redux';
import {range} from 'range';
import classnames from 'classnames';

function WorkspaceSelector(state) {
  const {
    views: {CipheredText, SelectedText, FrequencyAnalysis, Rotor, SchedulingControls, DecipheredText, HintRequestFeedback},
    actions: {requestHint},
    taskData: {alphabet, hints},
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
    alphabet, hints, CipheredText, SelectedText, FrequencyAnalysis, Rotor, SchedulingControls, DecipheredText,
    HintRequestFeedback, requestHint, hintRequest, nbRotors: rotors.length
  };
}


class SelectComponent extends React.Component {
  constructor (props) {
    super(props);
    this.state = {index: ''};
    this.onPickIndex = this.onPickIndex.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  onPickIndex (e) {
    const value = this.inputEl.value;
    this.setState({index: value});
  }

  handleClick (e) {
    e.preventDefault();
    this.props.requestHint(this.state.index);
    this.setState({index: ''});
  }

  render () {

    const {alphabet, hints} = this.props;
    const alreadyRequested = hints.filter(({type}) => type === 'type_2').map(({symbol}) => symbol);
    const options = alphabet.split('').map((text, value) => <option disabled={alreadyRequested.includes(text)} key={value} value={value}>{text}</option>);

    return (
      <div style={{backgroundColor: this.state.color}}>
        <Form inline>
          <FormGroup controlId="formControlsSelect">
            <FormControl
              onChange={this.onPickIndex}
              inputRef={el => this.inputEl = el}
              value={this.state.index}
              componentClass="select" placeholder="select">
              <option key={-1} value="">lettre</option>
              {options}
            </FormControl>
            <Button disabled={this.state.index === ""} onClick={this.handleClick} >{`Valider`}</Button>
          </FormGroup>
        </Form>
      </div>
    );
  }
}


class Workspace extends React.PureComponent {
  render () {
    const {alphabet, hints, CipheredText, SelectedText, FrequencyAnalysis, Rotor, SchedulingControls, DecipheredText, nbRotors, hintRequest, HintRequestFeedback} = this.props;

    return (
      <div>
        <h2>{"Message chiffré"}</h2>
        <CipheredText/>

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
                <SelectComponent requestHint={this.requestHint2} hints={hints} alphabet={alphabet}/>
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
    hintRequest.type = 'type_1';
    dispatch({type: requestHint, payload: {request: hintRequest}});
  };

  requestHint2 = (cellRank) => {
    const {dispatch, requestHint} = this.props;
    const hintRequest = {rotorIndex: 0, cellRank, type: "type_2"};
    dispatch({type: requestHint, payload: {request: hintRequest}});
  };
}

export default {
  views: {
    Workspace: connect(WorkspaceSelector)(Workspace),
  }
};
