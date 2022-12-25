import {Link} from "react-router-dom";
import '../App.css';
import logo from '../images/main.png';
import {Component, useEffect, useState} from "react";
import React from "react";
import BasicBreadcrumbs from "../components/Breadcrumbs";
import {Button} from "react-bootstrap";
import {updateUserState} from "../store/buySlice";
import App from "../App";
import {useDispatch} from "react-redux";
import ManagerMenu from "../components/ManagerMenu";
import {setIsManager} from "../store/managerSlice";

function StartPage() {
    const [access, setAccess] = useState(localStorage.getItem('accessToken'))
    const [ifManager, setIfManager] = useState(false)
    const dispatch = useDispatch();
    useEffect(() => {
        if (access) {
            fetch(
                'http://localhost:8000/api/user',
                {
                    headers: {
                        'Content-Type': 'application/json;charset=utf-8',
                        'Authorization': `Bearer ${access}`,
                    },
                }
            )
                .then(response => {
                    console.log(response)
                    if (response.ok) {
                        return response.json()
                    }
                    else {
                        if (response.status === 401) {
                            throw Error('refresh')
                        }
                        throw Error(`Something went wrong: code ${response.status}`)
                    }
                })
                .then(({data, groups}) => {
                    console.log('USER', data)
                    localStorage.setItem('userId', data.id)
                    console.log('GROUPS', groups)
                    if(groups.includes('Manager')){
                        console.log('YES MANAGER')
                        setIfManager(true)
                        dispatch(setIsManager(true))

                    }
                    else{
                        setIfManager(false)
                        dispatch(setIsManager(false))

                    }

                })
                .catch(error => {
                    console.log(`ОШибка:${error.message}`)

                })
        }
    }, [access])


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

                    {ifManager&&
                        <ManagerMenu/>
                    }


                </header>
            </div>
        </div>
    );
}
export default StartPage;