import {Link} from "react-router-dom";
import {Component, useEffect, useState} from "react";
import React from "react";
import BasicBreadcrumbs from "../../components/Breadcrumbs";
import {Button} from "react-bootstrap";
import {useDispatch, useSelector} from "react-redux";
import {addCategory, addService,  putCategory, deleteCategory, fetchCategories, putService, deleteService, accessUser} from "../../store/managerSlice";
import {fetchServices} from "../../store/servicesSlice";



function ManagerEdit() {
    const [access, setAccess] = useState(localStorage.getItem('accessToken'))
    const [newCategory, setNewCategory] = useState('')
    const [currCategory, setCurrCategory] = useState()

    const [currService, setCurrService] = useState()
    const [newService, setNewService] = useState()
    const [formCategory, setFormCategory] = useState({id_category:0, category_name:'Категория услуги'})
    const [formPrice, setFormPrice] = useState(0)
    const [formImage, setFormImage] = useState('')
    const [formDescription, setFormDescription] = useState('')

    const { categories } = useSelector(state => state.categories)
    const { services } = useSelector(state => state.services)
    const { isManager } = useSelector(state => state.isManager)
    const dispatch = useDispatch();

    useEffect(() => {
        const fetchData = async () => {
            dispatch(fetchCategories())
            dispatch(fetchServices(true))
            dispatch(accessUser())

        }
        fetchData()
    }, [])

    const edit_category= async e=> {
        e.preventDefault();
        await dispatch(putCategory(
            {
                id_category:currCategory.id_category,
                category_name: newCategory,
            }
        ))
            .then((res)=>{
                console.log(res)
                if(res.error){
                    alert("Не изменено.")
                }
                else{
                    alert("Изменено!")
                    dispatch(fetchCategories())

                }
            })
    }
    const delete_category= async ()=> {
        await dispatch(deleteCategory(currCategory.id_category))
            .then((res)=>{
                console.log(res)
                if(res.error){
                    alert("Не удалено.")
                }
                else{
                    alert("Удалено!")
                    dispatch(fetchCategories())
                    setNewCategory('')
                }
            })
    }

    const edit_service= async e=> {
        e.preventDefault();
        await dispatch(putService(
            {
                id_service:currService.id_service,
                service_name:newService,
                price: formPrice,
                image: formImage,
                description: formDescription,
                id_category: formCategory.id_category,
            }
        ))
            .then((res)=>{
                console.log(res)
                if(res.error){
                    alert("Не изменено.")
                }
                else{
                    alert("Изменено!")
                    dispatch(fetchServices())

                }
            })
    }

    const delete_service= async ()=> {
        await dispatch(deleteService(currService.id_service))
            .then((res)=>{
                console.log(res)
                if(res.error){
                    alert("Не удалено.")
                }
                else{
                    alert("Удалено!")
                    dispatch(fetchServices())


                }
            })
    }


    return (
        <div>
            {isManager?
                <div>
                    <div className={`container`}>
                        <BasicBreadcrumbs props={[
                            {
                                ref: '/',
                                text: 'Главная'
                            },
                            {
                                ref: '/manager/add',
                                text: 'Изменение данных'
                            }
                        ]}/>
                    </div>

                    <div className="App">
                        <header className="App-header">
                            <h1>Изменение данных</h1>
                            <div className={'formWrapper'}>
                                <form className="EditForm" onSubmit={edit_category}>
                                    <div>Изменение категории</div>
                                    <div>
                                        <select name="category_list" id="category_list"
                                                onChange={e=>{
                                                    e.preventDefault();
                                                    let pickedCategory=JSON.parse(e.target.value)
                                                    console.log('PICKED CAT', typeof pickedCategory, pickedCategory, pickedCategory.id_category)
                                                    if(pickedCategory!==0){
                                                        setNewCategory(pickedCategory.category_name)
                                                        setCurrCategory(pickedCategory)
                                                    }
                                                }}>
                                            <option value={0}>{'Название'}</option>
                                            {categories.map((item, index) => {
                                                return <option key={index}
                                                               value={JSON.stringify(item)}>{item.category_name} </option>
                                            })}
                                        </select>
                                    </div>
                                    <div>
                                        <input type="text" name="picked_category_name" value={newCategory}
                                               onChange={e => setNewCategory(e.target.value)} placeholder="Название категории"/>
                                    </div>
                                    <input type="submit" name="submit" value="Изменить"/>
                                    <input type="button" name="delete_button" value="Удалить" onClick={delete_category}/>
                                </form>


                                <form className="EditForm" onSubmit={edit_service}>
                                    <div>Изменение услуги</div>

                                    <div>
                                        <select name="categories_list" id="categories_list"
                                                onChange={e=>{
                                                    e.preventDefault();
                                                    let pickedService=JSON.parse(e.target.value)
                                                    console.log(e.target.value)
                                                    if(pickedService!==0){
                                                        setCurrService(pickedService)
                                                        setNewService(pickedService.service_name)
                                                        setFormPrice(pickedService.price)
                                                        setFormImage(pickedService.image)
                                                        setFormDescription(pickedService.description)
                                                        setFormCategory(pickedService.id_category)
                                                    }
                                                }}>
                                            <option value={0}>{'Услуга'}</option>
                                            {services.map((item, index) => {
                                                return <option key={index}
                                                               value={JSON.stringify(item)}>{item.service_name} </option>
                                            })}
                                        </select>
                                    </div>


                                    <div>
                                        <input type="text" name="service_name" value={newService}
                                               onChange={e => setNewService(e.target.value)} placeholder="Название услуги"/>
                                    </div>
                                    <div>
                                        <input type="number" name="price" value={formPrice} min={0}
                                               onChange={e => setFormPrice(e.target.value)} placeholder="Цена"/>
                                    </div>
                                    <div>
                                        <input type="text" name="image" value={formImage}
                                               onChange={e => setFormImage(e.target.value)} placeholder="Изображение"/>
                                    </div>
                                    <div>
                                        <input type="text" name="description" value={formDescription}
                                               onChange={e => setFormDescription(e.target.value)} placeholder="Описание"/>
                                    </div>
                                    <div>
                                        <select name="form_cats_list" id="form_cats_list"
                                                value={formCategory}
                                                onChange={e=>{
                                                    e.preventDefault();
                                                    let newFormCat=JSON.parse(e.target.value)

                                                    if(newFormCat.id_category!==0){
                                                        setFormCategory(newFormCat)
                                                    }
                                                }}>
                                            <option value={formCategory.id_category}>{formCategory.category_name}</option>
                                            {categories.map((item, index) => {
                                                return <option key={index}
                                                               value={JSON.stringify(item)}>{item.category_name} </option>
                                            })}
                                        </select>
                                    </div>

                                    <input type="submit" name="submit" value="Изменить"/>
                                    <input type="button" name="delete_button" value="Удалить" onClick={delete_service}/>


                                </form>



                            </div>

                        </header>
                    </div>
                </div>
                :
                <h1>Функционал недоступен.</h1>
            }
        </div>
    );
}
export default ManagerEdit;