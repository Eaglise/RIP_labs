import './App.css';
import {Navbar,Nav,Container} from 'react-bootstrap';
import {BrowserRouter, Routes, Route, Link} from "react-router-dom";
import {lazy, Suspense, useEffect, useState} from 'react';

import {Services} from './pages/Services';
import {Service} from './pages/Service';
import StartPage from "./pages/StartPage";
import About from "./pages/About";
import {Cart} from "./pages/Cart";
import {useSelector, useDispatch} from "react-redux";
import {updateUserState} from "./store/buySlice";
import Registration from "./pages/Registration"
import Auth from "./pages/Auth"
import Logout from "./pages/Logout"
import ManagerAdd from "./pages/managerPages/Add";
import ManagerEdit from "./pages/managerPages/Edit";
import ManagerOrders from "./pages/managerPages/ManagerOrders";

const LoginPage = lazy(() => import('./pages/Auth'));
const Register = lazy(() => import('./pages/Registration'));

function App() {

    const { isUser } = useSelector((state) => state.isUser);
    const { auth } = useSelector((state) => state.auth);
    const dispatch = useDispatch();

    return (
        <BrowserRouter>
            <div className="App">
                <>
                    <Navbar bg="dark" variant="dark">
                        <Container>
                            <Navbar.Brand href="/">Бауманское Долголетие</Navbar.Brand>
                            <Nav className="me-auto">
                                {/*<Nav.Link as={Link} to="/">Главная страница</Nav.Link>*/}
                                <Nav.Link as={Link} to="/services">Услуги</Nav.Link>
                                <Nav.Link as={Link} to="/about">О нас</Nav.Link>
                                {!isUser&&
                                    <Nav.Link as={Link} to="/auth" onClick={()=>{
                                        dispatch(updateUserState())
                                    }}>Вход</Nav.Link>
                                }
                                {!isUser&&
                                    <Nav.Link as={Link} to="/reg">Регистрация</Nav.Link>
                                }
                                {isUser&&
                                    <Nav.Link as={Link} to="/cart">Корзина</Nav.Link>
                                }
                                {isUser&&
                                    <Nav.Link as={Link} to="/logout" onClick={()=>{
                                        dispatch(updateUserState())
                                    }}>Выход</Nav.Link>
                                }
                                {/*<Nav.Link as={Link} to="/" onClick={()=>{*/}
                                {/*    dispatch(updateUserState())*/}
                                {/*}}>{auth}</Nav.Link>*/}



                            </Nav>
                        </Container>
                    </Navbar>

                </>
                <div>
                    <Routes>

                        <Route path="/about" element={<About/>}/>
                        <Route exact path={'/services/:id_service'} element={<Service/>}/>
                        <Route path="/services" element={<Services/>}/>
                        <Route path="/" element={<StartPage/>}/>
                        <Route path="/cart" element={<Cart/>}/>
                        <Route path="/logout" element={<Logout/>}/>
                        <Route path="/reg" element={<Registration/>}/>
                        <Route path="/auth" element={<Auth/>}/>

                        <Route path="/manager/add" element={<ManagerAdd/>}/>
                        <Route path="/manager/edit" element={<ManagerEdit/>}/>
                        <Route path="/manager/orders" element={<ManagerOrders/>}/>



                    </Routes>
                </div>
            </div>
        </BrowserRouter>
    );

}

export default App;