import {Link} from "react-router-dom";
import '../App.css';
import logo from '../images/main.png';
import {Component} from "react";
import React from "react";
import BasicBreadcrumbs from "../components/Breadcrumbs";
import {Button} from "react-bootstrap";


export default class StartPage extends Component {
    render() {
        return (
            <div>
                <div className={`container`}>
                    <BasicBreadcrumbs props={[
                        {
                            ref: '/',
                            text: 'Главная'
                        }
                    ]}/>
                </div>
                <div className="App">
                    <header className="App-header">
                        <img src={logo} className="App-logo" alt="logo" />
                        <br/><p> Добро пожаловать в Благотворительный Пенсионный Фонд </p>
                        <p>"Бауманское долголетие"!</p>
                        <Link to="/services">
                            <button type="button">
                                Выбрать услуги
                            </button>
                        </Link>
                    </header>
                </div>
            </div>

        );
    }
}
