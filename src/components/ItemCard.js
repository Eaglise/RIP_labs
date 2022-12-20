import {Button, Card} from "react-bootstrap";
import React from "react";
import {Link} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {deleteChoice, fetchCart, fetchCurrChoice, fetchOrder, putOrder} from "../store/buySlice";

const ItemCard = (item) => {
    const { cart } = useSelector((state) => state.cart);
    const { order } = useSelector((state) => state.order);
    const { curr_choices } = useSelector((state) => state.curr_choices);

    const dispatch = useDispatch();

    return <Card>
        <Card.Body>
            <Link to={`/services/${item.id_service.id_service}`}>
                <Card.Title>{item.id_service.service_name}</Card.Title>
            </Link>
            <div className={"item-info"}>
                Цена: {item.id_service.price} руб.
            </div>
            <div className={"item-info"}>
                Ваш комментарий: {item.comment}
            </div>
            <Button variant="outline-danger"
                    onClick={async ()=>{
                        await dispatch(deleteChoice(item.id_choice))
                            .then(async()=>{
                                console.log(cart)
                                await dispatch(putOrder({
                                    id_client: cart.id_client['id_client'],
                                    id_manager: cart.id_manager['id_worker'],
                                    status: cart.status['id_status'],
                                    sum: cart.sum-item.id_service.price,
                                    id_order: cart.id_order
                                }))
                            })
                            .then(async ()=>{
                                await dispatch(fetchCart())
                                await dispatch((fetchCurrChoice()))
                            })
                            .finally(async()=>{
                                await dispatch(fetchOrder())
                            })

                    }}>Убрать из корзины</Button>{' '}
        </Card.Body>
    </Card>
}

export default ItemCard;