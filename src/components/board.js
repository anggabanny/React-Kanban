import React from 'react';
import CardBoard from './card'
import '../App.css';
import { Card } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

function Board(props) {
    function updatedStatus(id, status) {
        props.updatedStatus(id, status)
    }

    function updatedTask(id){
        props.updatedTask(id)
    }

    function deletedTask(id){
        props.deletedTask(id);
    }
    
    return (
        <div className="mr-3">
            <Card border={ props.boardColor }  className="mt-2 ml-1" style={{ width: '18rem' }}>
                <Card.Header style={{ fontWeight:"bolder", fontSize: "30px" }} className="text-center">
                    <span style={{ color: props.color, textDecoration: "underline" }}>
                        {props.status}
                    </span>
                </Card.Header>
                <Card.Body className="p-2">
                    <CardBoard
                        cardColor={ props }
                        listTask={ props.tasklist }
                        deletedTask={ id => deletedTask(id) }
                        updatedStatus={ (id, status) => updatedStatus(id, status) }
                        updatedTask={ id => updatedTask(id) }
                    />
                </Card.Body>
            </Card>
        </div>
    )
}

export default Board