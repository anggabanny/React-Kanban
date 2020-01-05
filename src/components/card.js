import React from 'react';
import '../App.css';
import { Card, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

function CardBoard(props) {
    let { cardColor, listTask } = props
    function updatedStatus(id, status) {
        props.updatedStatus(id, status)
    }

    function updatedTask(id) {
        props.updatedTask(id)
    }

    function deleteTask(id) {
        props.deletedTask(id)
    }

    return listTask.map((task) =>{
        return (
            <div
                key={ task.id }
                className="mb-2"
            >
            <Card bg={ cardColor.boardColor } text="white">
                <Card.Header>
                    <div className="row">
                        <span className="ml-3" style={{ fontWeight: "bolder", fontSize: "20px" }}>
                            { task.title }
                        </span>
                        <div className="ml-auto mr-3">
                            <Button variant="light" size="sm" className="py-0 pl-2 pr-1 mr-1" onClick={ e => updatedTask( task.id ) } >
                                <i className="fas fa-edit"></i>
                            </Button>
                            <Button variant="light" size="sm" className="py-0 px-1" onClick={ e => deleteTask( task.id ) } >
                                <i className="fas fa-trash" style={{ color: "#D85641" }}></i>
                            </Button>
                        </div>
                    </div>
                </Card.Header>
                <Card.Body>
                    <Card.Text style={{ fontSize: "17px" }} className="text-center">
                        { task.detail }
                    </Card.Text>
                </Card.Body>
                <Card.Footer>
                    <div className="row">
                        <div className="ml-2">
                            {
                                cardColor.status === 'Doing' ? 
                                <Button variant="light" size="sm" className="py-0 px-1" onClick={ e => updatedStatus( task.id, 'Todo' ) }>
                                    <i className="fas fa-arrow-left mr-1"></i>
                                    <span style={{ fontWeight: "bold" }}>Todo</span>
                                </Button>
                                : ''
                            }
                            {
                                cardColor.status === 'Done' ? 
                                <Button variant="light" size="sm" className="py-0 px-1" onClick={ e => updatedStatus( task.id, 'Doing' ) }>
                                    <i className="fas fa-arrow-left mr-1"></i>
                                    <span style={{ fontWeight: "bold" }}>Doing</span>
                                </Button>
                                : ''
                            }
                        </div>
                        <div className="ml-auto mr-2">
                            {
                                cardColor.status === 'Todo' ? 
                                <Button variant="light" size="sm" className="py-0 px-1" onClick={ e => updatedStatus( task.id, 'Doing' ) }>
                                    <span style={{ fontWeight: "bold" }}>Doing</span>
                                    <i className="fas fa-arrow-right ml-1"></i>
                                </Button>
                                : ''
                            }
                            {
                                cardColor.status === 'Doing' ? 
                                <Button variant="light" size="sm" className="py-0 px-1" onClick={ e => updatedStatus( task.id, 'Done' ) }>
                                    <span style={{ fontWeight: "bold" }}>Done</span>
                                    <i className="fas fa-arrow-right ml-1"></i>
                                </Button>
                                : ''
                            }
                        </div>
                    </div>
                </Card.Footer>
            </Card>
        </div>
        )
    })
}

export default CardBoard