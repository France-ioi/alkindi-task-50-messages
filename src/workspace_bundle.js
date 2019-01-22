
import React from 'react';
import {connect} from 'react-redux';
import {selectTaskData} from './utils';

function WorkspaceSelector (state) {
  const {numMessages} = selectTaskData(state);
  const {
    views: {CipheredText, FrequencyAnalysis, Substitution, DecipheredText, MultiMessage, HintRequestFeedback, Hints},
    taskData: {config: {showSearchTool}},
    messageIndex
  } = state;

  return {
    CipheredText, FrequencyAnalysis, Substitution, DecipheredText, MultiMessage, HintRequestFeedback, Hints,
    messageIndex, numMessages, showSearchTool
  };
}

class Workspace extends React.PureComponent {
  render () {
    const {
      CipheredText, FrequencyAnalysis, Substitution, DecipheredText, MultiMessage, HintRequestFeedback, Hints,
      messageIndex, numMessages, showSearchTool,
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
        <Hints />
        <HintRequestFeedback />
        <h2>{"Texte déchiffré"}</h2>
        <DecipheredText />
      </div>
    );
  }

}

export default {
  views: {
    Workspace: connect(WorkspaceSelector)(Workspace)
  }
};
