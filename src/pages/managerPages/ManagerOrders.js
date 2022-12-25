import {Link} from "react-router-dom";
import {Component, useEffect, useState} from "react";
import React from "react";
import BasicBreadcrumbs from "../../components/Breadcrumbs";
import {Button, Col, Form, Row} from "react-bootstrap";
import {useDispatch, useSelector} from "react-redux";
import {fetchOldOrders, filterOrders} from "../../store/buySlice";
import OrderCard from "../../components/OrderCard";
import {fetchUsers, fetchStatus, pickStatus, pickUser, pickEnd, pickStart, accessUser} from "../../store/managerSlice";
import DateRangePicker from 'react-bootstrap-daterangepicker';
import 'bootstrap-daterangepicker/daterangepicker.css';
function ManagerOrders() {
    const [access, setAccess] = useState(localStorage.getItem('accessToken'))
    const { oldOrders } = useSelector(state => state.oldOrders)
    const { users } = useSelector(state => state.users)
    const { statusList } = useSelector(state => state.statusList)
    const { pickedUser } = useSelector(state => state.pickedUser)
    const { pickedStart } = useSelector(state => state.pickedStart)
    const { pickedEnd } = useSelector(state => state.pickedEnd)
    const { pickedStatus } = useSelector(state => state.pickedStatus)
    const { isManager } = useSelector(state => state.isManager)


    // const [pickedStatus, pickStatus] = useState(0)
    // const [pickedStart, pickStart] = useState(null)
    // const [pickedEnd, pickEnd] = useState(null)
    // const [pickedUser, pickUser] = useState(0)



    const dispatch = useDispatch();

    useEffect(() => {
        const fetchData = async () => {
            await dispatch(accessUser())
            await dispatch(fetchUsers())
            await dispatch(fetchStatus(true))
            await dispatch(fetchOldOrders())
                .then((res)=>{
                    console.log(res.payload)
                })
        }

        fetchData()
    }, [])

    const filter_orders= async e=> {
        e.preventDefault();

        await dispatch(filterOrders(
            {
                deep:true,
                user:pickedUser,
                status:pickedStatus,
                start:pickedStart,
                end:pickedEnd,
            }
        ))
            .then((res)=>{
                console.log(res)

            })
    }

    const upDate = (start, end)=>{
        console.log(start, end)
        console.log( (start._d))
        console.log( (end._d))
        console.log(start.format("YYYY-MM-DD HH:mm"))
        console.log(end.format("YYYY-MM-DD HH:mm"))
        dispatch(pickStart(start.format("YYYY-MM-DD HH:MM")))
        dispatch(pickEnd(end.format("YYYY-MM-DD HH:MM")))
    }

    return (
        <div>
            {isManager?
                <div>
                    <div className={`container`}>
                        <BasicBreadcrumbs props={[
                            {
                                ref: '/',
                                text: 'Главная'
                            },
                            {
                                ref: '/manager/orders',
                                text: 'Просмотр заказов'
                            }
                        ]}/>
                    </div>
                    <div className="App">
                        <header className="App-header">
                            <h1>Просмотр заказов</h1>

                            <Form className={'filter_form'} onSubmit={filter_orders}>
                                <div>
                                    <select name="users_list" id="users_list"
                                            onChange={e=>{
                                                e.preventDefault();
                                                console.log(e.target.value)
                                                dispatch(pickUser(e.target.value))
                                            }}>
                                        <option value={0}>{'Клиент'}</option>
                                        {users.map((item, index) => {
                                            return <option key={index}
                                                           value={item.id}>{item.username} </option>
                                        })}
                                    </select>
                                </div>
                                <div>
                                    <select name="status_list" id="status_list"
                                            onChange={e=>{
                                                e.preventDefault();
                                                console.log(e.target.value)
                                                dispatch(pickStatus(e.target.value))
                                            }}>
                                        <option value={0}>{'Статус'}</option>
                                        {statusList.map((item, index) => {
                                            return <option key={index}
                                                           value={item.id_status}>{item.status} </option>
                                        })}
                                    </select>
                                </div>
                                <div>
                                    <DateRangePicker
                                        initialSettings={{ startDate: '11/01/2022', endDate: '12/31/2022' }}
                                        onApply={e=>{
                                            e.preventDefault();
                                        }}
                                        onCallback={upDate}
                                    >
                                        <button>Выбрать дату</button>
                                    </DateRangePicker>
                                </div>
                                <input type="submit" name="submit" value="Отфильтровать"/>
                            </Form>


                            <Row xs={2} md={3} className={""}>
                                {oldOrders.map((item, index) => {
                                    return (
                                        <Col key={index}>
                                            <OrderCard {...item}/>
                                        </Col>
                                    )
                                })}
                            </Row>



                        </header>
                    </div>
                </div>
                :
                <h1>Функционал недоступен</h1>
            }
        </div>
    );
}
export default ManagerOrders;