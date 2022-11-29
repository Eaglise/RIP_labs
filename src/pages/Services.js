import React, {useEffect, useState} from 'react';
import {Card, Col, Row, Button, Spinner, CardGroup} from "react-bootstrap";
import {useSelector, useDispatch} from "react-redux";
import {Link} from "react-router-dom";
import ServicesCard from "../components/ServicesCard";
import {fetchServices} from "../store/servicesSlice";
import BasicBreadcrumbs from "../components/Breadcrumbs";
import "../styles/ServicesCardStyle.css";

export const Services=()=>{
    const { services } = useSelector((state) => state.services);
    const { servicesStatus } = useSelector(state => state.servicesStatus)
    const { servicesError } = useSelector(state => state.servicesError)
    const dispatch = useDispatch();
    useEffect(() => {
        const fetchData = async () => {
            dispatch(fetchServices())
                .then((originalPromiseResult) => {
                    console.log(services)

                })
                .catch((rejectedValueOrSerializedError) => {
                    console.log(rejectedValueOrSerializedError)
                })
        }
        fetchData()
    }, [])

    console.log(servicesStatus)
    return(

        <div className={`container`}>
            <BasicBreadcrumbs props={[
                {
                    ref: '/',
                    text: 'Главная'
                },
                {
                    ref: '/services',
                    text: 'Услуги'
                }
            ]}/>

            <div className={"container"}>
                {servicesStatus==='succeeded'&&
                    <Row xs={1} md={3} className="g-1">
                        {services.map((item, index) => {
                            return (
                                <Col className="col" key={index}>
                                    <ServicesCard {...item}/>
                                    <Link to={`/services/${item.id_service}`}>
                                        {item.name}
                                    </Link>

                                </Col>
                            )
                        })}
                    </Row>
                }
                {servicesStatus==='loading'&&
                    <div className={"empty-result-message"}><h1>Пожалуйста, подождите...</h1></div> // spinner
                }
                {servicesStatus==='failed'&&
                    <div className={"empty-result-message"}><h1>Ошибка: {servicesError}</h1></div>
                }

            </div>
        </div>

    )

}