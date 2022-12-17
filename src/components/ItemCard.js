//TODO

// import {Button, Card} from "react-bootstrap";
// import React from "react";
// import {Link} from "react-router-dom";
// import {useDispatch, useSelector} from "react-redux";
// import {deleteSale, fetchBasket, fetchDelivery, putDelivery} from "../store/buySlice";
//
// const ItemCard = (item) => {
//     const { delivery } = useSelector((state) => state.delivery);
//
//     const dispatch = useDispatch();
//
//     return <Card>
//         <Card.Body>
//             <Link to={`/products/${item.product_fk.product_pk}`}>
//                 <Card.Title>{item.product_fk.product_name}</Card.Title>
//             </Link>
//             <div className={"item-info"}>
//                 Кол-во: {item.amount} т, цена: {item.product_fk.product_price} руб./т
//             </div>
//             <Button variant="outline-danger"
//                     onClick={async ()=>{
//                         await dispatch(deleteSale(item.sale_pk))
//                             .then(async()=>{
//                                 await dispatch(putDelivery({
//                                     manufacturer_fk:1,
//                                     status_fk: delivery.status_fk,
//                                     sum:delivery.sum-(item.product_fk.product_price*item.amount),
//                                     delievery_pk:delivery.delievery_pk
//                                 }))
//                             })
//                             .then(async ()=>{
//                                 await dispatch(fetchDelivery())
//                             })
//                             .finally(async()=>{
//                                 await dispatch(fetchBasket())
//                             })
//
//                     }}>Убрать из корзины</Button>{' '}
//         </Card.Body>
//     </Card>
// }
//
// export default ItemCard;