import {Link} from "react-router-dom";
import '../App.css';
import logo from '../images/main.png';
import {Component, useEffect, useState} from "react";
import React from "react";
import BasicBreadcrumbs from "../components/Breadcrumbs";
import {Button} from "react-bootstrap";
import {updateUserState} from "../store/buySlice";
import App from "../App";
import {useDispatch, useSelector} from "react-redux";


function ManagerMenu() {
    const [access, setAccess] = useState(localStorage.getItem('accessToken'))
    const dispatch = useDispatch();


    return (
        <div>

            <div className="App">
                <header className="App-header">

                    <Link to="/manager/add">
                        <button type="button">
                            Добавление данных
                        </button>
                    </Link>
                    <Link to="/manager/edit">
                        <button type="button">
                            Изменение данных
                        </button>
                    </Link>
                    <Link to="/manager/orders">
                        <button type="button">
                            Просмотр заказов
                        </button>
                    </Link>

                </header>
            </div>
        </div>
    );
}
export default ManagerMenu;