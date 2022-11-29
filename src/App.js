import './App.css';
import {Navbar,Nav,Container} from 'react-bootstrap';
import {BrowserRouter, Routes, Route, Link} from "react-router-dom";

import {Categories} from "./pages/Categories";
import {Services} from './pages/Services';
import {Service} from './pages/Service';
import StartPage from "./pages/StartPage";
import About from "./pages/About";

function App() {
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


                            </Nav>
                        </Container>
                    </Navbar>

                </>
                <div>
                    <Routes>

                        <Route path="/about" element={<About/>}/>
                        <Route exact path={'/services/:service_pk'} element={<Service/>}/>
                        <Route path="/services" element={<Services/>}/>
                        <Route path="/" element={<StartPage/>}/>
                    </Routes>
                </div>
            </div>
        </BrowserRouter>
    );

}

export default App;