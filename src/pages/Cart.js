//TODO

// import React, {useEffect, useState} from 'react';
// import {Card, Col, Row, Button, Spinner} from "react-bootstrap";
// import {useSelector, useDispatch} from "react-redux";
// import BasicBreadcrumbs from "../Components/Breadcrumbs";
// import {Link} from "react-router-dom";
// import {
//     updateSum,
//     countSum,
//     fetchCart,
//     getSum,
//     fetchOrder,
//     putOrder,
//     fetchOldOrder
// } from "../store/buySlice";
// import ItemCard from "../Components/ItemCard";
//
// export const Cart=()=>{
//     const { basket } = useSelector((state) => state.basket);
//     const { delivery } = useSelector((state) => state.delivery);
//     const { oldDelivery } = useSelector((state) => state.delivery);
//     const {buyStatus} = useSelector(state => state.buyStatus);
//     const {buyError} = useSelector(state => state.buyError);
//     const { isUser} = useSelector((state) => state.isUser);
//     const dispatch = useDispatch();
//
//     useEffect(() => {
//         console.log(`IS USER:${isUser}`)
//         const fetchData = async () => {
//             await dispatch(fetchDelivery())
//                 .then(()=>{
//
//                     dispatch(fetchBasket())
//                         .then(async(originalPromiseResult) => {
//                             console.log('BASKET FETCHED')
//                             // console.log(basket)
//                             // dispatch(getSum(basket))
//                             // dispatch(countSum())
//
//                         })
//                         .catch((rejectedValueOrSerializedError) => {
//                             console.log('ERROR APPEARED WHILE BASKET FETCHING')
//                             console.log(rejectedValueOrSerializedError)
//                         })
//                 })
//             dispatch(async ()=>{
//                 await dispatch(fetchOldDelivery())
//             })
//         }
//         fetchData()
//     }, [])
//
//     return(
//
//         <div className={`container`}>
//             < BasicBreadcrumbs props={[
//                 {
//                     ref: '/',
//                     text: 'Начало'
//                 },
//                 {
//                     ref: '/delivery',
//                     text: 'Корзина'
//                 }
//             ]}/>
//             {!isUser &&
//                 <h1>Пожалуйста, авторизируйтесь.</h1>
//             }
//             {isUser &&
//                 <div>
//                     <div className={"container"}>
//                         {buyStatus==='succeeded'&&
//                             <div>
//                                 {basket.length===0&&
//                                     <div>
//                                         Сейчас Ваша корзина пуста.
//                                         Попробуйте <Link to={'/products'}>приобрести</Link> нашу продукцию.
//                                     </div>
//                                 }
//                                 <Row xs={1} md={2} className="g-1">
//                                     {basket.map((item, index) => {
//                                         return (
//                                             <Col key={index}>
//                                                 <ItemCard {...item}/>
//                                             </Col>
//                                         )
//                                     })}
//                                 </Row>
//                                 {delivery.sum!==0 &&
//
//                                     <div>
//                                         Сумма: {delivery.sum} руб.
//                                         <div>
//                                             <Button variant="primary"
//                                                     onClick={async ()=>{
//                                                         await dispatch(putDelivery({
//                                                             manufacturer_fk:delivery.manufacturer_fk,
//                                                             status_fk: 2,
//                                                             sum:delivery.sum,
//                                                             delievery_pk: Number(delivery.delievery_pk)
//                                                         }))
//                                                             .then(async()=>{
//                                                                 await dispatch(fetchDelivery())
//                                                             })
//                                                             .then(async()=>{
//                                                                 await dispatch(fetchOldDelivery())
//                                                             })
//                                                             .finally(async ()=>{
//                                                                 await dispatch(fetchBasket())
//                                                             })
//
//                                                     }}>Оплатить</Button>{' '}
//                                         </div>
//                                     </div>
//                                 }
//
//                             </div>
//                         }
//
//
//
//                         {buyStatus==='loading'&&
//                             <div className={"empty-result-message"}><h1>Загрузка...</h1></div>
//                         }
//                         {buyStatus==='failed'&&
//                             <div className={"empty-result-message"}><h1>Ошибка: {buyError}</h1></div>
//                         }
//                         {oldDelivery.length!==0 &&
//                             <h1>Ваши прошлые заказы</h1>
//                         }
//                         {oldDelivery.map((item, index) => {
//                             return (
//                                 <div key={index}>
//                                     Заказ №{item.delievery_pk} от {item.date} на сумму {item.sum} руб.: {item.status_fk.status_name}
//                                 </div>
//                             )
//                         })}
//
//                     </div>
//                 </div>
//             }
//         </div>
//
//     )
//
// }