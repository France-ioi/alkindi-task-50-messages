
import React from 'react';
import {Button, FormGroup, FormControl, Form} from 'react-bootstrap';
import {connect} from 'react-redux';
import {selectTaskData} from './utils';


class Hint1View extends React.PureComponent {
    render () {
        const {hintRequest: {isActive}, hintRequestData} = this.props;
        return (
            <div style={{textAlign: "center", margin: "10px 0"}}>
                <Button onClick={this.requestHint} disabled={!hintRequestData || isActive}>{`Valider`}</Button>
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
        const {hintRequest: {isActive}} = this.props;
        return (
            <div style={{textAlign: "center", margin: "10px 0", paddingTop: '10px'}}>
                <Button onClick={this.requestHint} disabled={isActive}>{`Valider`}</Button>
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
        const {alphabet, hints, lockedLetters, hintRequest: {isActive}} = this.props;

        const knownLetters = hints
            .map(({symbol}) => symbol)
            .concat(lockedLetters);

        const hintsOptions =
            alphabet.split("")
                .map((letter, value) => (
                    <option disabled={knownLetters.includes(letter)} key={value} value={value}>
                        {letter}
                    </option>
                ));

        return (
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

function HintsPresentor ({pointsTxt, isLeft, children}) {
    const customBorder = {display: "inline-grid", padding: "10px", border: "1px solid #000", width: "33%", background: "rgb(202, 202, 202)"};
    if (isLeft) {
        customBorder.borderRight = "0";
    } else {
        customBorder.borderLeft = "0";
    }
    return (
        <div style={customBorder}>
            <p style={{fontWeight: "bold", textAlign: "center"}}>
                {"Indices"}
            </p>
            <p>
                {"Pour un coût de "}
                <span style={{fontWeight: "bold"}}>{pointsTxt}</span>
                {
                    ", cliquez sur une case de substitution et validez pour obtenir sa valeur."
                }
            </p>
            {children}
        </div>
    );
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
            <p style={{fontWeight: "bold", textAlign: "center"}}>
                {"Indices"}
            </p>
            <p>&nbsp;</p>
            <p>
                {
                    "Get answer key as hints..."
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

    return {
        requestHint, hintRequestFeedbackCleared,
        alphabet, hints, messageIndex, numMessages, hintRequest, lockedLetters, hintRequestData
    };
}

class Hints extends React.PureComponent {
    render () {
        const {numMessages} = this.props;
        return (
            <div>
                <div style={{width: "100%", margin: "20px 0"}}>
                    <div style={{textAlign: "center"}}>
                        <h5>Hints</h5>
                        <HintsPresentor pointsTxt={`${numMessages === 50 ? "1" : "5"} points`} isLeft={true}>
                            <Hint1View {...this.props} />
                        </HintsPresentor>
                        <HintsPresentor pointsTxt={`${numMessages === 50 ? "1" : "10"} points`} isLeft={true}>
                            <Hint2View {...this.props} />
                        </HintsPresentor>
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
