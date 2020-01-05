import React, { Component } from 'react';
import Logo from '../logo.png';
import '../App.css';
import { Navbar, Nav, Button, Modal, FormControl, InputGroup } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

class NavbarApp extends Component {
    constructor(props){
        super(props)
        this.state = {
            title: "",
            detail: "",
            show: false,
            setShow: false,
            showAlert: false
        };
    }

    taskAdd = () => {
        this.handleClose()
        let task = {
            title: this.state.title,
            detail: this.state.detail
        }
        this.props.newTask(task);
        this.setState({ title: "", detail: "" });
    }

    bindTitle = e => {
        this.setState({ title: e.target.value })
    }

    bindDetail = e => {
        this.setState({ detail: e.target.value })
    }

    handleClose = () => this.setState({ show: false, setShow: false });

    handleShow = () => this.setState({ show: true, setShow: true })

    render(){
        return (
            <div>
                <Navbar collapseOnSelect expand="lg" bg="light" className="py-0" variant="light">
                    <div className="container">
                    <Navbar.Brand className="d-flex pt-3 ml-5">
                        <div className="d-flex flex-center">
                            <img
                            src={ Logo }
                            height="30"
                            width="30"
                            className="d-inline-block align-top"
                            alt="React Bootstrap"
                        />
                        <span id="app"> Kanban </span>
                        </div>
                    </Navbar.Brand>
                    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                    <Navbar.Collapse id="responsive-navbar-nav">
                        <Nav className="ml-auto mr-5">
                            <Button variant="primary" size="sm" onClick={ this.handleShow }>Add Task</Button>
                        </Nav>
                    </Navbar.Collapse>
                    </div>
                </Navbar>
                <>
                    <Modal show={this.state.show} onHide={this.handleClose} centered>
                        <Modal.Header closeButton>
                            <Modal.Title style={{ fontWeight: "bold" }}>New Task</Modal.Title>
                        </Modal.Header>
                            <Modal.Body>
                                <InputGroup className="mb-2">
                                <InputGroup.Prepend>
                                    <InputGroup.Text id="basic-addon1">
                                        <i className="fas fa-plus-square"></i>
                                    </InputGroup.Text>
                                </InputGroup.Prepend>
                                    <FormControl
                                        placeholder="Title"
                                        aria-describedby="basic-addon1"
                                        value={ this.state.title }
                                        onChange={ this.bindTitle }
                                    />
                                </InputGroup>
                                <FormControl as="textarea" aria-label="With textarea" placeholder="task detail.." value={ this.state.detail } onChange={ this.bindDetail }/>
                            </Modal.Body>
                        <Modal.Footer>
                            <Button variant="success" size="sm" className="mx-auto" onClick={this.taskAdd} block>
                                Submit
                            </Button>
                        </Modal.Footer>
                    </Modal>
                </>
            </div>
        )
    }
}

export default NavbarApp