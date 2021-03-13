import React, { Component } from "react";
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getHCP } from "./Action/Action";
import ModalPopUp from "./Modal";

class DisplayHCP extends React.Component {
  constructor(props) {
    super(props);
    this.state = { showModal: false , btnType:'', rowId:'', payload:{}}
  }

  static propTypes = {
    HCPs: PropTypes.array.isRequired,
    getHCP: PropTypes.func.isRequired
  }

  newModal = (e, entyId, payloadParent) => {
    let name= e.target.name;
    let entityId = entyId? entyId : 0;
    this.setState({ showModal: true ,btnType: name, rowId: entityId, payload: payloadParent?payloadParent: null})
  }

  setModalState = (state)=>{
    this.setState({showModal: state});
    console.log('State after props update', state)
  }

  componentDidMount() {
    this.props.getHCP();
  }

  render() {
    let highlighter = '';
    return (
      <div className="ui middle aligned center aligned grid table-wrapper">
        <div className="column">
          {/* Add new HCP */}
          <button className="ui active button" name="Add" onClick={(e) => this.newModal(e, null, null)}>
            <i className="plus square outline"></i>
              Add new HCP
            </button>

          <table className="ui sortable celled table">
            <thead>
              <tr>
                <th>Sample</th>
                <th>Sample Source</th>
                <th>Quantity</th>
                <th>Signature Date</th>
                <th>Status</th>
                <th>HCP Name</th>
                <th>Owner</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {
                this.props.HCPs && this.props.HCPs.map((hcp, i) => {
                  highlighter = hcp.status === 'Rejected' ? 'negative' : 'positive'
                  return (
                    <tr key={i + 1}>
                      <td className="fixedCols">{hcp.sample}</td>
                      <td className="fixedCols">{hcp.sapleSource}</td>
                      <td>{hcp.Qty}</td>
                      <td>{hcp.SignDate}</td>
                      <td className={highlighter}>{hcp.status}</td>
                      <td>{hcp.HCPName}</td>
                      <td>{hcp.Owner}</td>
                      <td>
                        <div className="ui large buttons">
                          <button className="ui blue button" name="Edit" onClick={(e) => this.newModal(e, hcp.id, hcp)}>Edit</button>
                          <div className="or"></div>
                          <button className="ui red button" name="Delete" onClick={(e) => this.newModal(e,hcp.id, hcp)}>Delete</button>
                        </div>
                      </td>
                    </tr>)
                }
                )}
            </tbody>
          </table>
        </div>
         { this.state.showModal? 
         <ModalPopUp show={this.setModalState} btnType={this.state.btnType} rowId={this.state.rowId} payload={this.state.payload}/>:<></> }
      </div>
    );
  }
}

const mapStateToProps = state => {
  return { HCPs: state.HCPs }
}

export default connect(mapStateToProps, { getHCP })(DisplayHCP);