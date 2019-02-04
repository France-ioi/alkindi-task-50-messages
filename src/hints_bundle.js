
import React from 'react';
import {Button, FormGroup, FormControl, Form} from 'react-bootstrap';
import {connect} from 'react-redux';
import {selectTaskData} from './utils';


class Hint1View extends React.PureComponent {
    render () {
        const {hintRequest: {isActive}, hintRequestData, pointsTxt, isLeft} = this.props;
        const customBorder = {display: "inline-grid", padding: "10px", border: "1px solid #000", width: "33%", background: "rgb(202, 202, 202)"};
        if (isLeft) {
            customBorder.borderRight = "0";
        } else {
            customBorder.borderLeft = "0";
        }

        return (
            <div style={customBorder}>
                <p>
                    {"Pour un coût de "}
                    <span style={{fontWeight: "bold"}}>{pointsTxt}</span>
                    {
                        ", cliquez sur une case de substitution et validez pour obtenir sa valeur."
                    }
                </p>
                <div style={{textAlign: "center", margin: "10px 0"}}>
                    <Button onClick={this.requestHint} disabled={!hintRequestData || isActive}>{`Valider`}</Button>
                </div>
            </div>
        );
    }
    requestHint = () => {
        const {dispatch, requestHint, hintRequestData} = this.props;
        hintRequestData.type = "type_1";
        dispatch({type: requestHint, payload: {request: hintRequestData}});
    };
}

class Hint3View extends React.PureComponent {
    render () {
        const {hintRequest: {isActive}, isAllHint} = this.props;

        return (
            <div style={{textAlign: "center", margin: "10px 0", paddingTop: '10px'}}>
                <Button onClick={this.requestHint} disabled={isActive || isAllHint}>{`Valider`}</Button>
            </div>
        );
    }
    requestHint = () => {
        const {dispatch, requestHint, messageIndex} = this.props;
        dispatch({type: requestHint, payload: {request: {messageIndex, cellRank: 0, type: "type_3"}}});
    };
}

class Hint2View extends React.PureComponent {
    constructor (props) {
        super(props);
        this.state = {index: ""};
    }
    render () {
        const {alphabet, hints, isAllHint, lockedLetters, hintRequest: {isActive}, pointsTxt, isLeft} = this.props;

        const knownLetters = isAllHint ? alphabet.split("") :  hints
            .map(({symbol}) => symbol)
            .concat(lockedLetters);

        const hintsOptions =
            alphabet.split("")
                .map((letter, value) => (
                    <option disabled={knownLetters.includes(letter)} key={value} value={value}>
                        {letter}
                    </option>
                ));

        const customBorder = {display: "inline-grid", padding: "10px", border: "1px solid #000", width: "33%", background: "rgb(202, 202, 202)"};
        if (isLeft) {
            customBorder.borderRight = "0";
        } else {
            customBorder.borderLeft = "0";
        }

        return (
            <div style={customBorder}>
                <p>
                    {"Pour un coût de "}
                    <span style={{fontWeight: "bold"}}>{pointsTxt}</span>
                    {
                        ", sélectionnez une lettre dans la liste et validez pour obtenir sa valeur"
                    }
                </p>

                <div style={{textAlign: "center", margin: "10px 0"}}>
                    <Form inline style={{display: "inline-block", width: "auto", verticalAlign: "middle"}}>
                        <FormGroup controlId="formControlsSelect">
                            <FormControl
                                onChange={this.onDropdownChanged}
                                inputRef={el => (this.inputEl = el)}
                                value={this.state.index}
                                disabled={isActive}
                                componentClass="select"
                                placeholder="select">
                                <option key={-1} value="">lettre</option>
                                {hintsOptions}
                            </FormControl>
                            <Button disabled={this.state.index === ""} onClick={this.handleHintSubmit}>{`Valider`}</Button>
                        </FormGroup>
                    </Form>
                </div>
            </div>
        );
    }
    onDropdownChanged = (e) => {
        e.preventDefault();
        const value = this.inputEl.value;
        this.setState({index: value});
        this.clearHintMessage();
    };
    handleHintSubmit = (e) => {
        e.preventDefault();
        const cellRank = this.state.index;
        const {dispatch, requestHint, messageIndex} = this.props;
        const hintRequest = {messageIndex, cellRank, type: "type_2"};
        dispatch({type: requestHint, payload: {request: hintRequest}});
        this.setState({index: ""});
    };
    clearHintMessage = () => {
        this.props.dispatch({type: this.props.hintRequestFeedbackCleared, payload: {}});
    };
}

function HintsPresentor2 ({isLeft, isRight = false, children}) {
    const customBorder = {display: "inline-grid", padding: "10px", border: "1px solid #000", width: "33%", background: "rgb(202, 202, 202)"};
    if (isLeft) {
        if (!isRight) {
            customBorder.borderRight = "0";
        }
    } else {
        customBorder.borderLeft = "0";
    }
    return (
        <div style={customBorder}>
            <p>&nbsp;</p>
            <p>
                {
                    "Demander tous les indices"
                }
            </p>
            {children}
        </div>
    );
}

function HintSelector (state) {
    const {alphabet, numMessages, hints} = selectTaskData(state);
    const {
        actions: {requestHint, hintRequestFeedbackCleared},
        messageIndex, hintRequest, substitutions, editing
    } = state;
    let hintRequestData = null;
    const {cells} = substitutions[messageIndex];
    if (typeof editing.cellRank === 'number') {
        const editingCell = cells[editing.cellRank];
        if (!editingCell.hint && !editingCell.locked) {
            hintRequestData = {messageIndex, ...editing};
        }
    }
    const lockedLetters = cells.filter(cell => cell.locked).map(cell => cell.editable);
    const isAllHint = (hints.length > 0 && (hints.map(({messageIndex: i, type}) => (messageIndex === i && type == 'type_3')).filter(bool => bool)).length !== 0) || false;

    return {
        requestHint, hintRequestFeedbackCleared,
        alphabet, hints, isAllHint, messageIndex, numMessages, hintRequest, lockedLetters, hintRequestData
    };
}

class Hints extends React.PureComponent {
    render () {
        const {numMessages} = this.props;
        return (
            <div>
                <div style={{width: "100%", margin: "20px 0"}}>
                    <div style={{textAlign: "center"}}>
                        <h2>Indices</h2>
                        <Hint1View pointsTxt={`${numMessages === 50 ? "1" : "5"} points`} isLeft={true} {...this.props} />
                        <Hint2View pointsTxt={`${numMessages === 50 ? "1" : "10"} points`} isLeft={true} {...this.props} />
                        <HintsPresentor2 pointsTxt={`1 points`} isLeft={true} isRight={true}>
                            <Hint3View {...this.props} />
                        </HintsPresentor2>
                    </div>
                </div>
            </div>);
    }
}

export default {
    views: {
        Hints: connect(HintSelector)(Hints)
    },
};
