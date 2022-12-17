import React, {useEffect, useState} from 'react';
import {Card, Col, Row, Button, Spinner, CardGroup} from "react-bootstrap";
import {useSelector, useDispatch} from "react-redux";
import {Link} from "react-router-dom";
import ReactSlider from "react-slider";
import ServicesCard from "../components/ServicesCard";
import {fetchServices, fetchPrices, filterServices, updateSearchInput, updatePrices} from "../store/servicesSlice";
import {addChoice} from "../store/buySlice";
import BasicBreadcrumbs from "../components/Breadcrumbs";
import "../styles/ServicesCardStyle.css";

export const Services=()=>{
    const { services } = useSelector((state) => state.services);
    const { servicesStatus } = useSelector(state => state.servicesStatus)
    const { servicesError } = useSelector(state => state.servicesError)
    const {search_input}=useSelector((state)=>state.search_input)
    const {maxPrice}=useSelector((state)=>state.maxPrice);
    const {minPrice}=useSelector((state)=>state.minPrice);
    const {maxBorder}=useSelector((state)=>state.maxBorder);
    const {minBorder}=useSelector((state)=>state.minBorder);
    const dispatch = useDispatch();
    useEffect(() => {
        const fetchData = async () => {
            dispatch(fetchServices())
                .then((originalPromiseResult) => {
                    console.log(services)

                })
                .catch((rejectedValueOrSerializedError) => {
                    console.log(rejectedValueOrSerializedError)
                })
            dispatch(fetchPrices())
        }
        fetchData()
    }, [])

return(
    <div className={`container`}>
        <BasicBreadcrumbs props={[
            {
                ref: '/',
                text: 'Главная'
            },
            {
                ref: '/services',
                text: 'Услуги'
            }
        ]}/>

        <div className={'BigBlock'}>
            <div className={'filtration'}>
                <div>
                    <div>
                        <input type={"text"} placeholder={"Поиск"} className={"search_input"}
                               value={search_input}
                               onChange={(event)=>dispatch(updateSearchInput(event.target.value))}/>
                        &nbsp;
                        <Button variant="outline-secondary" value={search_input}
                                onClick={async()=>{
                                    await dispatch(filterServices({
                                        search:search_input,
                                        max:maxPrice,
                                        min:minPrice
                                    }))
                                } }
                        >Найти!</Button>{' '}
                        <div className={'container1'}>
                            <ReactSlider
                                value={[minPrice, maxPrice]}
                                className={'slider'} trackClassName={'tacker'}
                                min={minBorder} max={maxBorder}
                                step={100}
                                withTracks={true} pearling={true}
                                renderThumb={(props)=>{
                                    return <div {...props} className={'thumb'}></div>
                                }}
                                renderTrack={(props)=>{
                                    return <div {...props} className={'track'}></div>
                                }}
                                onChange={([min, max])=>{
                                    dispatch(updatePrices({minPrice: min, maxPrice: max}))
                                }}
                            />
                        </div>
                    </div>
                    <div className={'values-wrapper'}>
                        Диапазон: [{minPrice}; {maxPrice}] руб.
                    </div>
                </div>

            </div>
            <div className={'services'}>
                <h1> Список услуг:</h1>

        <div className={"container"}>
            {servicesStatus==='succeeded'&&
                <Row xs={1} md={3} className="g-1">
                    {services.map((item, index) => {
                        return (
                            <Col className="col" key={index}>
                                <ServicesCard {...item}/>
                                <Link to={`/services/${item.id_service}`}>
                                    {item.name}
                                </Link>

                            </Col>
                        )
                    })}
                </Row>
            }
            {servicesStatus==='loading'&&
                <div className={"empty-result-message"}><h1>Пожалуйста, подождите...</h1></div> // spinner
            }
            {servicesStatus==='failed'&&
                <div className={"empty-result-message"}><h1>Ошибка: {servicesError}</h1></div>
            }
            {services.length === 0 && servicesStatus !== 'loading' &&
                <h1>Ничего не найдено.</h1>
            }

        </div></div></div></div>
);
}

