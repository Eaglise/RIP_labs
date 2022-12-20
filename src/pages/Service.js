import React, {useEffect, useState} from 'react';
import {Card, Col, Row, Button, Spinner, CardGroup} from "react-bootstrap";
import {useSelector, useDispatch} from "react-redux";
import {Link} from "react-router-dom";
import {fetchService} from "../store/serviceSlice";
import BasicBreadcrumbs from "../components/Breadcrumbs";
import {useParams} from "react-router";
import {addChoice, fetchOrder, putOrder, fetchCart, updateUserComment} from "../store/buySlice";
import ServiceCard from "../components/ServiceCard";

export const Service=()=>{
    const { id_service } = useParams();
    const { service } = useSelector((state) => state.service);
    const { serviceStatus } = useSelector(state => state.serviceStatus)
    const { serviceError } = useSelector(state => state.serviceError)
    const { order } = useSelector((state) => state.order);
    const { cart } = useSelector((state) => state.cart);
    const { isUser } = useSelector((state) => state.isUser);
    const { user_comment } = useSelector((state) => state.user_comment);

    const dispatch = useDispatch();

    const handleChange = (e) => {
        dispatch(updateUserComment(e.target.value))
    }

    useEffect(() => {

        const fetchData = async () => {
            dispatch(fetchService(id_service))
            dispatch(fetchCart())
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
                        ref: `/services/${id_service}`,
                        text: `Услуга №${id_service}`
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
                            {/*поле для ввода коммента*/}
                            <br/>
                            <input type="text" className="field" name="comment" value={user_comment} onChange={handleChange}
                                   placeholder="Пожалуйста, оставьте здесь подробности о желаемой услуге и комментарии к заказу."/>
                            <br/>
                            <br/>
                            <input id="buy_button" className="card-link-to2" type="submit" variant="primary" value="Заказ"
                                   onClick={() => {
                                       console.log(cart)
                                       console.log(service)
                                       console.log(cart.status)
                                       console.log(cart.sum, service.price)
                                       console.log(user_comment)
                                       dispatch(addChoice({
                                           id_service: service.id_service,
                                           id_worker: 1,
                                           id_order: cart.id_order,
                                           comment: user_comment
                                       }))

                                       alert(`Услуга выбрана.`)
                                       dispatch(putOrder({
                                           id_order: cart.id_order,
                                           id_client: localStorage.getItem('userId'),
                                           id_manager: 1,
                                           status: cart.status['id_status'],
                                           sum: cart.sum + service.price,

                                       }))



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