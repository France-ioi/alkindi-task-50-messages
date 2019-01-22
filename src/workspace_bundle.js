
import React from 'react';
import {Button, FormGroup, FormControl, Form} from 'react-bootstrap';
import {connect} from 'react-redux';
import {selectTaskData} from './utils';

function WorkspaceSelector (state) {
  const {alphabet, numMessages, hints} = selectTaskData(state);
  const {
    views: {CipheredText, FrequencyAnalysis, Substitution, DecipheredText, MultiMessage, HintRequestFeedback},
    actions: {requestHint, hintRequestFeedbackCleared}, messageIndex, hintRequest: {isActive: isHintInProgress},
    taskData: {config: {showSearchTool}},
    substitutions, editing
  } = state;
  let hintRequest = null;
  // creating hints request data {messageIndex, position},
  const {cells} = substitutions[messageIndex];
  if (typeof editing.cellRank === 'number') {
    const editingCell = cells[editing.cellRank];
    if (!editingCell.hint && !editingCell.locked) {
      hintRequest = {messageIndex, ...editing};
    }
  }
  const lockedLetters = cells.filter(cell => cell.locked).map(cell => cell.editable);
  return {
    CipheredText, FrequencyAnalysis, Substitution, DecipheredText, MultiMessage, HintRequestFeedback,
    hintRequestFeedbackCleared, requestHint,
    alphabet, hints, messageIndex, numMessages, showSearchTool, hintRequest, isHintInProgress, lockedLetters
  };
}

class HintRequestView extends React.PureComponent {
  constructor (props) {
    super(props);
    this.state = {index: ""};
  }
  onDropdownChanged = (e) => {
    e.preventDefault();
    const value = this.inputEl.value;
    this.setState({index: value});
    this.props.clearHintMessage();
  };
  handleHintSubmit = (e) => {
    e.preventDefault();
    this.props.requestHint(this.state.index);
    this.setState({index: ""});
  };
  render () {
    const {alphabet, hints, lockedLetters} = this.props;
    const knownLetters = hints
      .map(({symbol}) => symbol)
      .concat(lockedLetters);
    const hintsOptions =
      alphabet.split("")
        .map(
          (letter, value) => (
            <option disabled={knownLetters.includes(letter)} key={value} value={value}>
              {letter}
            </option>
          ));
    return (
      <div>
        <Form inline style={{display: "inline-block", width: "auto", verticalAlign: "middle"}}>
          <FormGroup controlId="formControlsSelect">
            <FormControl
              onChange={this.onDropdownChanged}
              inputRef={el => (this.inputEl = el)}
              value={this.state.index}
              disabled={this.props.busy}
              componentClass="select"
              placeholder="select">
              <option key={-1} value="">lettre</option>
              {hintsOptions}
            </FormControl>
            <Button disabled={this.state.index === ""} onClick={this.handleHintSubmit}>{`Valider`}</Button>
          </FormGroup>
        </Form>
      </div>
    );
  }
}
class Workspace extends React.PureComponent {
  render () {
    const {
      CipheredText, FrequencyAnalysis, Substitution, DecipheredText, MultiMessage, HintRequestFeedback,
      alphabet, hints, messageIndex, numMessages, showSearchTool, hintRequest, isHintInProgress, lockedLetters
    } = this.props;
    return (
      <div>
        {(numMessages > 1) && <MultiMessage />}
        <br />
        <h2>{"Message chiffré"}</h2>
        <CipheredText />
        {showSearchTool && (
          <div>
            <h2>Search Tool</h2>
            <p>seach tool is visible</p>
          </div>
        )}
        <h2>{"Analyse de fréquence de la sélection"}</h2>
        <FrequencyAnalysis />
        <h2>Substitution:</h2>
        <div className="clearfix">
          <div>
            <Substitution index={messageIndex} />
          </div>
        </div>
        <div style={{width: "100%", margin: "20px 0"}}>
          <div style={{textAlign: "center"}}>
            <h5>Hints</h5>
            <div style={{display: "inline-grid", padding: "10px", border: "1px solid #000", borderRight: "0", width: "30%", background: "rgb(202, 202, 202)"}}>
              <p style={{fontWeight: "bold", textAlign: "center"}}>
                {"Indices"}
              </p>
              <p>
                {"Pour un coût de "}
                <span style={{fontWeight: "bold"}}>{"5 points"}</span>
                {
                  ", cliquez sur une case de substitution et validez pour obtenir sa valeur."
                }
              </p>
              <div style={{textAlign: "center", margin: "10px 0"}}>
                <Button onClick={this.requestHint} disabled={!hintRequest || isHintInProgress}>{`Valider`}</Button>
              </div>
            </div>

            <div style={{display: "inline-grid", padding: "10px", border: "1px solid #000", borderLeft: "0", width: "30%", background: "rgb(202, 202, 202)"}}>
              <p style={{fontWeight: "bold", textAlign: "center"}}>{"Indices"}</p>
              <p>{"Pour un coût de "}<span style={{fontWeight: "bold"}}>{"5 points"}</span>{", cliquez sur une case de substitution et validez pour obtenir sa valeur."}</p>
              <div style={{textAlign: "center", margin: "10px 0"}}>
                <HintRequestView
                  requestHint={this.requestHint2}
                  hints={hints}
                  lockedLetters={lockedLetters}
                  busy={isHintInProgress}
                  clearHintMessage={this.clearHintMessage}
                  alphabet={alphabet} />
              </div>
            </div>
          </div>
        </div>
        <HintRequestFeedback />
        <h2>{"Texte déchiffré"}</h2>
        <DecipheredText />
      </div>
    );
  }
  clearHintMessage = () => {
    this.props.dispatch({type: this.props.hintRequestFeedbackCleared, payload: {}});
  };
  requestHint = () => {
    const {dispatch, requestHint, hintRequest} = this.props;
    hintRequest.type = "type_1";
    dispatch({type: requestHint, payload: {request: hintRequest}});
  };
  requestHint2 = cellRank => {
    const {dispatch, requestHint, messageIndex} = this.props;
    const hintRequest = {messageIndex, cellRank, type: "type_2"};
    dispatch({type: requestHint, payload: {request: hintRequest}});
  };
}

export default {
  views: {
    Workspace: connect(WorkspaceSelector)(Workspace)
  }
};
