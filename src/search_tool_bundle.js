
import React from 'react';
import {connect} from 'react-redux';

function SearchToolViewSelector (state) {
  const {actions, searchTool} = state;
  return {
    searchTool
  };
}

class SearchToolView extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      searchString : '',
    }
  }

  searchStringChange = (e) => {
    this.setState({ searchString : e.target.value })
  }

  findString = () => {
    this.props.search(this.state.searchString)
  }

  render () {
    return (
      <div className="searchToolWrapper">
        <div className="pattern">
          <label className="caption">Pattern: </label>
          <input type="text" className="searchString" value={this.state.searchString} onChange={this.searchStringChange.bind(this)}/>
          <label className="foundedCounts">1 occurence found</label>
        </div>

        <div className="notification">
          <div style={{width: "80%"}}>
            a,b,c and d each represent a symbol, always the same.<br/>
            each ? may represent any symbol <br/>
            each * may represent any sequence of symbols
          </div>
          <div style={{width: "17%"}}>
            <button className="btn btn-default" onClick={this.findString.bind(this)}>Next</button>
            <button className="btn btn-default">Previous</button>
          </div>
        </div>
      </div>
    );
  }

}

export default {
  actions: {
  },
  actionReducers: {
  },
  views: {
    SearchTool: connect(SearchToolViewSelector)(SearchToolView),
  }
};
