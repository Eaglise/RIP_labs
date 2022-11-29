import {Button, Card} from "react-bootstrap";
import React from "react";
import {Link} from 'react-router-dom'
import "../styles/ServiceCardStyle.css";

const ServiceCard = (service) => {
    console.log(service);
    return <Card className="card2" border="dark">
        <Card.Img className="card-img-top2" variant="top" src={`${service.image}`} height={300} width={100}/>
        <Card.Body>
            <div className="card-title2">
                <Card.Title>{service.service_name}</Card.Title>
            </div>
            <div className="card-body2">
                <Card.Text>
                    <br/>
                    <div>
                        Описание: {service.description}
                    </div>
                    <br/>
                    <div>
                        Цена: от {service.price} руб.
                    </div>

                </Card.Text>
            </div>
            <br/>
            <Button className="card-link-to2" href={`http://localhost:3000/services/`} variant="dark">Назад</Button>
        </Card.Body>
    </Card>
}

export default ServiceCard;