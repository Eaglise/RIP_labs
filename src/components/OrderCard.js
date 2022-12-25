import {Button, Card} from "react-bootstrap";
import React, {useEffect, useState} from "react";
import {Link} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {deleteChoice, fetchCart, fetchCurrChoice, fetchOldOrders, fetchOrder, putOrder, filterOrders} from "../store/buySlice";

const OrderCard = (item) => {
    const dispatch = useDispatch();
    const [color, setColor] = useState('white')
    const { pickedUser } = useSelector(state => state.pickedUser)
    const { pickedStart } = useSelector(state => state.pickedStart)
    const { pickedEnd } = useSelector(state => state.pickedEnd)
    const { pickedStatus } = useSelector(state => state.pickedStatus)
    useEffect(() => {
        const fetchData = () => {
            setColor('white')
            if(item.status.id_status===4){
                setColor('red')
            }
            if(item.status.id_status===5){
                setColor('green')
            }
        }

        fetchData()
    }, [])
    const decline=async()=>{
        await dispatch(putOrder({
            method:'CLOSING',
            sum:item.sum,
            id_client:item.id_client.id,
            id_manager:item.id_manager.id_worker,
            status:4,
            id_order:item.id_order
        }))
            .then(async (res)=>{
                setColor('red')
                // await dispatch(filterOrders())
                await dispatch(filterOrders({
                    deep:true,
                    user:pickedUser,
                    status:pickedStatus,
                    start:pickedStart,
                    end:pickedEnd,
                }))
            })
    }
    const accept=async()=>{
        await dispatch(putOrder({
            sum:item.sum,
            id_client:item.id_client.id,
            id_manager:item.id_manager.id_worker,
            status:item.status.id_status+1,
            id_order:item.id_order,
        }))
            .then(async (res)=>{
                // await dispatch(fetchOldOrders())
                await dispatch(filterOrders({
                    deep:true,
                    user:pickedUser,
                    status:pickedStatus,
                    start:pickedStart,
                    end:pickedEnd,
                }))
            })
    }
    const back=async()=>{
        await dispatch(putOrder({
            sum:item.sum,
            id_client:item.id_client.id,
            id_manager:item.id_manager.id_worker,
            status:item.status.id_status-1,
            id_order:item.id_order,
        }))
            .then(async (res)=>{
                // await dispatch(fetchOldOrders())
                await dispatch(filterOrders({
                    deep:true,
                    user:pickedUser,
                    status:pickedStatus,
                    start:pickedStart,
                    end:pickedEnd,
                }))
            })
    }
    const complete=async()=>{
        await dispatch(putOrder({
            method:'CLOSING',
            sum:item.sum,
            id_client:item.id_client.id,
            id_manager:item.id_manager.id_worker,
            status:5,
            id_order:item.id_order,
        }))
            .then(async (res)=>{
                setColor('green')
                // await dispatch(fetchOldOrders())
                await dispatch(filterOrders({
                    deep:true,
                    user:pickedUser,
                    status:pickedStatus,
                    start:pickedStart,
                    end:pickedEnd,
                }))
            })
    }
    return <Card
        style={{backgroundColor:color, }}
    >
        <Card.Body className={'manager_order'}
        >
            <Card.Title>Заказ №{item.id_order}</Card.Title>
            <div className={"item-info"}>
                Клиент: {item.id_client.username}
            </div>
            <div className={"item-info"}>
                Цена: {item.sum} руб.
            </div>
            <div className={"item-info"} >
                Статус: {item.status.status}
            </div>
            <div className={"item-info"}>
                Дата создания заказа: {item.order_date}
            </div>
            <div className={"item-info"}>
                Дата подачи заказа: {item.completion_date}
            </div>
            <div className={"item-info"}>
                {item.status.id_status===2 &&
                    <div>
                        <Button variant="danger"
                                onClick={async ()=>{await decline()}}
                        >Отклонить</Button>{' '}
                        <Button variant="primary"
                                onClick={async ()=>{await accept()}}
                        >Принять</Button>{' '}
                    </div>
                }
                {item.status.id_status===3 &&
                    <div>
                        <Button variant="danger"
                                onClick={async ()=>{await back()}}
                        >Назад</Button>{' '}
                        <Button variant="primary"
                                onClick={async ()=>{await complete()}}
                        >Выполнить</Button>{' '}
                    </div>
                }


                {item.status.id_status===5 &&
                    <div>
                        <div>Дата выполнения: {item.closing_date}</div>
                        <div style={{color: color}}>Заказ выполнен.</div>
                    </div>
                }
                {item.status.id_status===4 &&
                    <div>
                        <div>Дата отказа: {item.closing_date}</div>
                        <div style={{color: color}}>Заказ отклонён.</div>
                    </div>
                }
            </div>
        </Card.Body>
    </Card>
}

export default OrderCard;