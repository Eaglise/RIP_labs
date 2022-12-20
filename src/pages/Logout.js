import React, { useState, useEffect } from 'react';
import {Link} from "react-router-dom";
import {useSelector, useDispatch} from "react-redux";
import {updateUserState} from "../store/buySlice";

function getCookie(name) {
    const value = `; ${document.cookie};`
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
}
function Logout(props){
    const [access, setAccess] = useState(localStorage.getItem('accessToken'))
    const [refresh, setRefresh] = useState(localStorage.getItem('refreshToken'))
    const [refreshRequired, setRefreshRequired] = useState(false)
    const { isUser } = useSelector((state) => state.isUser);
    const { auth } = useSelector((state) => state.auth);
    const dispatch = useDispatch();

    useEffect(() => {

        if (access)
            localStorage.setItem('accessToken', '')
            localStorage.setItem('userId', null)


    }, [refreshRequired])



    return(
        <div className="sum">
            Вы вышли из аккаунта.
            <br/>
            Можете авторизоваться повторно
            <br/>
            или вернуться на <Link to={'/'}>гланую страницу</Link>.
        </div>
    );

}

export default Logout;