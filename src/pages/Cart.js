import React, {useEffect, useState} from 'react';
import {Card, Col, Row, Button, Spinner} from "react-bootstrap";
import {useSelector, useDispatch} from "react-redux";
import BasicBreadcrumbs from "../components/Breadcrumbs";
import {Link} from "react-router-dom";
import {
    updateSum,
    countSum,
    fetchCart,
    getSum,
    fetchOrder,
    putOrder,
    fetchOldOrder, fetchCurrChoice
} from "../store/buySlice";
import ItemCard from "../components/ItemCard";
import {fetchService} from "../store/serviceSlice";

export const Cart=()=>{
    const { cart } = useSelector((state) => state.cart);
    const { curr_choices } = useSelector((state) => state.curr_choices);
    const { order } = useSelector((state) => state.order);
    const { oldOrder } = useSelector((state) => state.order);
    const { buyStatus } = useSelector(state => state.buyStatus);
    const { buyError } = useSelector(state => state.buyError);
    const { isUser } = useSelector((state) => state.isUser);
    const dispatch = useDispatch();

    useEffect(() => {

        const fetchData = async () => {
            dispatch(fetchCart())
            dispatch(fetchOrder())
            dispatch((fetchCurrChoice()))
            dispatch(fetchOldOrder())
        }
        fetchData()
        console.log(cart)
        console.log(order)
        console.log(curr_choices)
        console.log(oldOrder)
    }, [])

    return(

        <div className={`container`}>
            < BasicBreadcrumbs props={[
                {
                    ref: '/',
                    text: 'Начало'
                },
                {
                    ref: '/cart',
                    text: 'Корзина'
                }
            ]}/>
            {!isUser &&
                <h1>Пожалуйста, авторизируйтесь.</h1>
            }
            {isUser &&
                <div>
                    <div className={"container"}>
                        {buyStatus==='succeeded'&&
                            <div>
                                {curr_choices.length===0&&
                                    <div>
                                        Сейчас Ваша корзина пуста.
                                        Пожалуйста, перейдите к <Link to={'/services'}>каталогу услуг</Link>
                                    </div>
                                }
                                <Row xs={1} md={2} className="g-1">
                                    {curr_choices.map((item, index) => {
                                        return (
                                            <Col key={index}>
                                                <ItemCard {...item}/>
                                            </Col>
                                        )
                                    })}
                                </Row>


                                {order &&
                                    <>

                                        <div className='sum'>
                                            <>Сумма: {order.sum} руб.</>

                                            <div>
                                                <Button variant="primary"
                                                        onClick={async () => {
                                                            await dispatch(putOrder({
                                                                id_client: order.id_client,
                                                                id_manager: order.id_manager,
                                                                // status: Math.floor(Math.random() * 5) + 2,
                                                                status: 2,
                                                                sum: order.sum,
                                                                id_order: Number(order.id_order),
                                                                method: 'BUY',
                                                            }))
                                                                .then(async () => {
                                                                    await dispatch(fetchCart())
                                                                })
                                                                .then(async () => {
                                                                    await dispatch(fetchOrder())
                                                                })
                                                                .then(async () => {
                                                                    await dispatch(fetchOldOrder())
                                                                })
                                                                .finally(async () => {
                                                                    await dispatch(fetchCurrChoice())
                                                                })

                                                        }}>Оплатить</Button>{' '}
                                            </div>
                                        </div>

                                    </>
                                }


                            </div>
                        }

                        {buyStatus==='loading'&&
                            <div className={"empty-result-message"}><h1>Загрузка...</h1></div>
                        }
                        {buyStatus==='failed'&&
                            <div className={"empty-result-message"}><h1>Ошибка: {buyError}</h1></div>
                        }
                        {oldOrder.length!==0 &&
                            <div>
                                <h1>-------------------------</h1>
                                <h1>Ваши прошлые заказы</h1>
                            </div>
                        }
                        {oldOrder.map((item, index) => {
                            return (
                                <div key={index}>
                                    Заказ №{item.id_order} от {item.order_date} на сумму {item.sum} руб.: {item.status.status}
                                </div>
                            )
                        })}

                    </div>
                </div>
            }
        </div>

    )

}