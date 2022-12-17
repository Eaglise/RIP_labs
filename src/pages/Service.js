import React, {useEffect, useState} from 'react';
import {Card, Col, Row, Button, Spinner, CardGroup} from "react-bootstrap";
import {useSelector, useDispatch} from "react-redux";
import {Link} from "react-router-dom";
import {fetchService} from "../store/serviceSlice";
import BasicBreadcrumbs from "../components/Breadcrumbs";
import {useParams} from "react-router";
import {addChoice, fetchOrder, putOrder} from "../store/buySlice";
import ServiceCard from "../components/ServiceCard";

export const Service=()=>{
    const { service_pk } = useParams();
    const { service } = useSelector((state) => state.service);
    const { serviceStatus } = useSelector(state => state.serviceStatus)
    const { serviceError } = useSelector(state => state.serviceError)
    const { order } = useSelector((state) => state.order);
    const { isUser } = useSelector((state) => state.isUser);

    const dispatch = useDispatch();

    useEffect(() => {
        const fetchData = async () => {
            dispatch(fetchService(service_pk))
        }
        fetchData()

    }, [])

    return(

        <div className={`container`}>
            {serviceStatus === 'succeeded' &&
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
            }
            {!isUser &&
                <h1>Пожалуйста, авторизируйтесь.</h1>
            }

            {isUser &&

                <div className={"container"}>
                    {serviceStatus === 'succeeded' &&
                        <div>
                            <Row xs={1} md={1} className="g-1">
                                <ServiceCard {...service}/>
                            </Row>

                            <input id="buy_button" className="buy_button" type="submit" value="Заказ" //TODO
                                   onClick={() => {
                                           dispatch(addChoice({
                                               id_service: service_pk,
                                               id_worker: 1,
                                               comment: 'comment'
                                           }))
                                           dispatch(putOrder({
                                               id_client: 1,
                                               id_manager: 1,
                                               // id_choice: order.id_choice,
                                               // id_status: order.id_status,
                                               // sum: order.sum + service.price,
                                               sum: service.price
                                           }))
                                           alert(`Продукт добавлен в корзину.`)


                                   }}/>

                        </div>
                    }
                </div>
            }

                {serviceStatus==='loading'&&
                    <div className={"empty-result-message"}><h1>Пожалуйста, подождите...</h1></div> // spinner
                }
                {serviceStatus==='failed'&&
                    <div className={"empty-result-message"}><h1>Ошибка: {serviceError}</h1></div>
                }

        </div>

    )

}