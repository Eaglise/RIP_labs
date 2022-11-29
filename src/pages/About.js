import {Link} from "react-router-dom";
import "../styles/About.css";
import {Component} from "react";
import React from "react";
import BasicBreadcrumbs from "../components/Breadcrumbs";


export default class About extends Component {
    render() {
        return (
            <div>
                <div className={`container`}>
                    <BasicBreadcrumbs props={[
                        {
                            ref: '/',
                            text: 'Главная'
                        },
                        {
                            ref: '/about',
                            text: 'О нас'
                        },
                    ]}/>
                </div>
                <div className="App2">
                    <header className="App-header2">
                        <p> Информация о проекте: </p>
                    </header>
                <div className="App-body2">
                    <p> Прототип благотворительного пенсионного фонда </p>
                </div>
                <header className="App-header2">
                    <p> Контакты: </p>
                </header>
                <div className="App-body2">
                    <a href="https://github.com/Eaglise/RIP_labs" target="_blank" rel="noopener noreferrer">GitHub</a>
                </div>
                </div>
            </div>

        );
    }
}
