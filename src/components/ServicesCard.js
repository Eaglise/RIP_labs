import {Button, Card} from "react-bootstrap";
import React from "react";
import {Link} from 'react-router-dom'
import "../styles/ServicesCardStyle.css";

const ServicesCard = (service) => {
    console.log(service);
    return <Card className="card" border="dark">
        <Link to={`/services/${service.id_service}`}>
            <Card.Img className="card-img-top" variant="top" src={`${service.image}`} height={300} width={100}/>
        </Link>
        <Card.Body>
            <div className="card-title">
                <Card.Title>{service.service_name}</Card.Title>
            </div>
            <div className="card-body">
                <Card.Text>


                    <div>
                        Цена: от {service.price} руб.
                    </div>

                </Card.Text>
            </div>
            <Button className="card-link-to" href={`http://localhost:3000/services/${service.id_service}`} variant="dark">Подробнее</Button>
        </Card.Body>
    </Card>
}

export default ServicesCard;