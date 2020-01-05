import React, { Component } from 'react';
import uuidv4 from 'uuid/v4';
import Navbar from './navbar';
import Board from './board';
import SweetAlert from 'react-bootstrap-sweetalert'
import Swal from 'sweetalert2'
import { Button, Modal, FormControl, InputGroup } from 'react-bootstrap';

class KanbanReact extends Component {
    constructor(props) {
        super(props);
        this.state = {
            listTask : [],
            todoList: [],
            doingList: [],
            doneList: [],
            idtask: 0,
            title: "",
            detail: "",
            show: false,
            setShow: false,
            showAlert: false
        }
    }

    bindTitle = e => {
        this.setState({ title: e.target.value })
    }

    bindDetail = e => {
        this.setState({ detail: e.target.value })
    }

    handleClose = () => this.setState({ show: false, setShow: false });

    handleShow = () => this.setState({ show: true, setShow: true })

    addTask = (task) => {
        this.setState({ showAlert: true })
        let { title, detail } = task
        let listTask = this.state.listTask;
        let newTask = {
            id : uuidv4(),
            title,
            detail,
            status : 'Todo'
        };
        listTask.push(newTask)
        this.setState({ listTask });
        setTimeout(() => {
            this.filterTask()
            this.setState({ showAlert: false })
        }, 1000);
    }

    filterTask = () => {
        let todo = []
        let doing = []
        let done = []
        this.state.listTask.forEach(task=>{
            if (task.status === 'Todo') {
                todo.unshift(task)
            } else if (task.status === 'Doing') {
                doing.unshift(task)
            } else {
                done.unshift(task)
            }
        })
        this.setState({
            todoList : todo,
            doingList : doing,
            doneList : done
        });
    }

    deletedTask = id => {
        Swal.showLoading()
        let listTask = this.state.listTask;
        let newList = []
        listTask.forEach(task=>{
            if(task.id !== id){
                newList.push(task)
            }
        })
        this.setState({ listTask: newList })
        setTimeout(() => {
            this.filterTask()
            Swal.close()
        }, 1000);
    }

    updatedStatus = (id, status) =>{
        Swal.showLoading()
        let listTask = this.state.listTask;
        listTask.forEach(task => {
            if (task.id === id) {
                task.status = status
            }
        })
        this.setState({ listTask })
        setTimeout(() => {
            this.filterTask()
            Swal.close()
        }, 1000);
    }

    updatedTask = id => {
        let listTask = this.state.listTask;
        listTask.forEach(task => {
            if (task.id === id) {
                console.log(task);
                this.setState({
                    idtask : id,
                    title : task.title,
                    detail : task.detail
                })
                setTimeout(() => {
                    this.handleShow()
                }, 1000);
            }
        })
    }

    updateTaskSubmit = () => {
        let listTask = this.state.listTask;
        listTask.forEach(task => {
            if (task.id === this.state.idtask) {
                task.title = this.state.title
                task.detail = this.state.detail
                this.filterTask()
                this.setState({
                    idtask : 0,
                    title : "",
                    detail : ""
                })
                setTimeout(() => {
                    this.handleClose()
                }, 1000);
            }
        })
    }

    render () {
        return (
            <div>
                <Navbar newTask={task => this.addTask(task)}/>
                <div className="d-flex justify-content-center">
                    <Board
                        status="Todo"
                        tasklist={ this.state.todoList }
                        boardColor="primary"
                        color="#0077F7"
                        updatedStatus={(id, status) => this.updatedStatus(id, status)}
                        deletedTask={ id => this.deletedTask(id)}
                        updatedTask={ id => this.updatedTask(id) }
                    />
                    <Board
                        status="Doing"
                        tasklist={ this.state.doingList }
                        boardColor="danger"
                        color="#D85641"
                        updatedStatus={(id, status) => this.updatedStatus(id, status)}
                        deletedTask={ id => this.deletedTask(id)}
                        updatedTask={ id => this.updatedTask(id) }
                    />
                    <Board
                        status="Done"
                        boardColor="success"
                        color="#67AA44"
                        tasklist={ this.state.doneList }
                        updatedStatus={(id, status) => this.updatedStatus(id, status)}
                        deletedTask={ id => this.deletedTask(id)}
                        updatedTask={ id => this.updatedTask(id) }
                    />
                </div>
                <>
                    <SweetAlert
                        success
                        show={this.state.showAlert}
                        title="Success"
                        showConfirm={ false }
                    />
                </>
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
                            <Button variant="success" size="sm" className="mx-auto" onClick={this.updateTaskSubmit} block>
                                Update
                            </Button>
                        </Modal.Footer>
                    </Modal>
                </>
            </div>
        )
    }
}

export default KanbanReact