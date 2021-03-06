
import React from 'react';
import {connect} from 'react-redux';
import {selectTaskData} from './utils';

function WorkspaceSelector (state) {
  const {numMessages, cipherText} = selectTaskData(state);
  const {
    views: {CipheredText, FrequencyAnalysis, Substitution, DecipheredText, MultiMessage, HintRequestFeedback, Hints, Search},
    taskData: {config: {showSearchTool}, passwords},
    messageIndex
  } = state;

  return {
    CipheredText, FrequencyAnalysis, Substitution, DecipheredText, MultiMessage, HintRequestFeedback, Hints, Search,
    messageIndex, numMessages, showSearchTool, passwords, cipherText
  };
}

class Workspace extends React.PureComponent {
  render () {
    const {
      CipheredText, FrequencyAnalysis, Substitution, DecipheredText, MultiMessage, HintRequestFeedback, Hints, Search,
      messageIndex, numMessages, showSearchTool, passwords, cipherText
    } = this.props;
    const getPasswordTxt = () => {
      return passwords.map(s => <strong>{s}</strong>).reduce((accu, elem) => {
        return accu === null ? [elem] : [...accu, ' et ', elem];
      }, null);
    };
    return (
      <div>
        {passwords && (<h4 style={{marginTop: '25px', marginBottom: '0'}}>
          Voici les deux mots de passe contenus dans le message (non chiffré) : {getPasswordTxt()}.</h4>)}
        {(numMessages > 1) && <MultiMessage />}
        <br />
        <h2>{"Message chiffré"}</h2>
        <h4>Ce message contient {cipherText.length} lettres</h4>
        <CipheredText />
        {showSearchTool && (
          <div style={{margin: "5px auto"}}>
            <h2>Recherche de motif</h2>
            <Search />
          </div>
        )}
        <h2>{"Analyse de fréquence"}</h2>
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
