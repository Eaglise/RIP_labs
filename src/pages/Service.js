import React, {useEffect, useState} from 'react';
import {Card, Col, Row, Button, Spinner, CardGroup} from "react-bootstrap";
import {useSelector, useDispatch} from "react-redux";
import {Link} from "react-router-dom";
import {fetchService} from "../store/serviceSlice";
import BasicBreadcrumbs from "../components/Breadcrumbs";
import {useParams} from "react-router";
import {set_service_pk} from "../store/serviceSlice";
import ServiceCard from "../components/ServiceCard";

export const Service=()=>{
    const { service_pk } = useParams();
    const { service } = useSelector((state) => state.service);
    const { serviceStatus } = useSelector(state => state.serviceStatus)
    const { serviceError } = useSelector(state => state.serviceError)

    const dispatch = useDispatch();
    useEffect(() => {
        const fetchData = async () => {
            dispatch(fetchService(service_pk))
        }
        fetchData()
    }, [])

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
                },
                {
                    ref: `/services/${service_pk}`,
                    text: `Услуга №${service_pk}`
                }
            ]}/>

            <div className={"container"}>
                {serviceStatus==='succeeded'&&
                    <Row xs={1} md={1} className="g-1">
                        <ServiceCard {...service}/>
                    </Row>
                }
                {serviceStatus==='loading'&&
                    <div className={"empty-result-message"}><h1>Пожалуйста, подождите...</h1></div> // spinner
                }
                {serviceStatus==='failed'&&
                    <div className={"empty-result-message"}><h1>Ошибка: {serviceError}</h1></div>
                }

            </div>
        </div>

    )

}