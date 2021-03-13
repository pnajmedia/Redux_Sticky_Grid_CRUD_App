import { Button, Header, Icon, Modal, Form } from 'semantic-ui-react'
import React, { Component } from "react";
import { createHCP, editHCP, deleteHCP } from "./Action/Action";
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class ModalPopUp extends React.Component {

    constructor(props) {
        super(props);
       // console.log('props fetched', this.props);
        this.state = { showModal: false, btnType: '', id: 0, sample: '', sapleSource: '', Qty: '', SignDate: '', status: '', HCPName: '', Owner: '' }
    }

    handleChangeForms = (e) => {
        let name = e.target.name;
        let fieldVal = e.target.value;
        this.setState({ [name]: fieldVal })
    }

    static propTypes = {
        HCPs: PropTypes.array.isRequired,
        createHCP: PropTypes.func.isRequired,
        editHCP: PropTypes.func.isRequired,
        deleteHCP: PropTypes.func.isRequired
    }

    userActionOnClick(e) {
        e.preventDefault()
        //console.log('User Clicked', e.target);
        switch (this.state.btnType) {
            case 'Edit':
                if (this.state.id) {
                    return (
                        this.props.editHCP({
                            id: this.state.id,
                            sample: this.state.sample,
                            sapleSource: this.state.sapleSource,
                            Qty: this.state.Qty,
                            SignDate: this.state.SignDate,
                            status: this.state.status,
                            HCPName: this.state.HCPName,
                            Owner: this.state.Owner
                        })
                    )
                } else {
                    alert('Updation of HCP failed!')
                }

            case 'Delete':
                return (this.props.deleteHCP(this.state.id))

            case 'Add':
                if (!this.state.id) {
                    return (
                        this.props.createHCP({
                            id: Math.floor(Math.random() * (999 - 100 + 1) + 100),
                            sample: this.state.sample,
                            sapleSource: this.state.sapleSource,
                            Qty: this.state.Qty,
                            SignDate: this.state.SignDate,
                            status: this.state.status,
                            HCPName: this.state.HCPName,
                            Owner: this.state.Owner,
                        })
                    )
                } else {
                    alert('Creation of new HCP failed!')
                }

            default:
                return (
                    alert('Enter details for new HCP!')
                )
        }
    }

    dataCleaner = (e) => {
        this.setState({ showModal: false, btnType: '', id: 0 });
        this.props.show(false);
        window.location.reload();
    }

    componentDidMount() {
        //Setting states based on props from parent comp.
        if (this.props.btnType === 'Delete' || this.props.btnType === 'Edit') {
            this.setState({
                showModal: true, btnType: this.props.btnType,
                id: this.props.rowId,
                sample: this.props.payload.sample,
                sapleSource: this.props.payload.sapleSource,
                Qty: this.props.payload.Qty,
                SignDate: this.props.payload.SignDate,
                status: this.props.payload.status,
                HCPName: this.props.payload.HCPName,
                Owner: this.props.payload.Owner,
            })
        } else if (this.props.btnType === 'Add') {
            this.setState({ showModal: true, btnType: this.props.btnType });
        }
        console.log('compDidMount state', this.state);
    }

    finalDisplayButton = () => {
        switch (this.state.btnType) {
            case 'Edit':
                return (<Button type="submit" color='green'>
                    <Icon name='edit' /> UPDATE
                </Button>)

            case 'Delete':
                return (<Button type="submit" color='red'>
                    <Icon name='trash' /> DELETE
                </Button>)
            default:
                return (<Button type="submit" color='green'>
                    <Icon name='checkmark' /> ADD
                </Button>)

        }
    }

    render() {
        const { showModal, btnType } = this.state;
        //console.log('render state', this.state);

        return (
            <Modal closeIcon open={showModal} onClose={(e) => this.dataCleaner(e)}>
                <Header><Icon name='warehouse' />HCP Action Centre - {btnType}</Header>
                <Modal.Content>
                    {btnType !== 'Delete' ?
                        <Form onSubmit={(e) => this.userActionOnClick(e)}>
                            <Form.Input
                                required
                                label='Sample'
                                name="sample"
                                value={this.state.sample}
                                placeholder='Enter the Sample name here'
                                onChange={(e) => this.handleChangeForms(e)}
                            />
                            <Form.Input
                                required
                                label='SampleSource'
                                name="sapleSource"
                                value={this.state.sapleSource}
                                type="text"
                                placeholder='Enter the SampleSource name here'
                                onChange={(e) => this.handleChangeForms(e)}
                            />
                            <Form.Input
                                required
                                label='Quantity'
                                name="Qty"
                                type="number"
                                min='1'
                                max='20'
                                placeholder='Min Qty must be 1'
                                value={this.state.Qty}
                                onChange={(e) => this.handleChangeForms(e)}
                            />
                            <Form.Input
                                required
                                label='Sign Date'
                                name="SignDate"
                                value={this.state.SignDate}
                                type="text"
                                min="01-01-2018" max="31-12-2030"
                                placeholder="dd/mmm/yyyy"
                                onChange={(e) => this.handleChangeForms(e)}
                            />
                            <Form.Input
                                required
                                label='Status'
                                name="status"
                                type="text"
                                value={this.state.status}
                                placeholder='AOD, Accepted, Rejected'
                                onChange={(e) => this.handleChangeForms(e)}
                            />
                            <Form.Input
                                required
                                label='HCPName'
                                name="HCPName"
                                type="text"
                                placeholder='Enter HCP name here'
                                value={this.state.HCPName}
                                onChange={(e) => this.handleChangeForms(e)}
                            />
                            <Form.Input
                                required
                                label='Owner'
                                name="Owner"
                                type="text"
                                placeholder='Enter Owner name here'
                                value={this.state.Owner}
                                onChange={(e) => this.handleChangeForms(e)}
                            />
                            <Button type="submit" color='orange' onClick={(e) => this.dataCleaner(e)}>
                                <Icon name='remove' /> Clear</Button>
                            {this.finalDisplayButton()}
                        </Form>
                        :
                        <Form onSubmit={(e) => this.userActionOnClick(e)}>
                            <p>Are you sure you want to delete?</p>
                            <Button type="submit" color='orange' onClick={(e) => this.dataCleaner(e)}>
                                <Icon name='remove' /> Clear</Button>
                            {this.finalDisplayButton()}
                        </Form>
                    }
                </Modal.Content>
            </Modal>)
    }
}

const mapStateToProps = state => {
    return { HCPs: state.HCPs }
}

export default connect(mapStateToProps, { createHCP, editHCP, deleteHCP })(ModalPopUp);