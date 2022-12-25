import {Link} from "react-router-dom";
import {Component, useEffect, useState} from "react";
import React from "react";
import BasicBreadcrumbs from "../../components/Breadcrumbs";
import {Button} from "react-bootstrap";
import {useDispatch, useSelector} from "react-redux";
import {addCategory, addService, fetchCategories, accessUser} from "../../store/managerSlice";


function ManagerAdd() {
    const [access, setAccess] = useState(localStorage.getItem('accessToken'))
    const [newCategory, setNewCategory] = useState('')
    const [newService, setNewService] = useState()
    const [formCategory, setFormCategory] = useState()
    const [formPrice, setFormPrice] = useState(0)
    const [formImage, setFormImage] = useState('')
    const [formDescription, setFormDescription] = useState('')
    const { categories } = useSelector(state => state.categories)
    const { isManager } = useSelector(state => state.isManager)
    const dispatch = useDispatch();

    useEffect(() => {
        const fetchData = async () => {
            await dispatch(fetchCategories())
            await dispatch(accessUser())
        }
        fetchData()
    }, [])

    const add_category= async e=> {
        e.preventDefault();
        await dispatch(addCategory(
            {
                category_name: newCategory
            }
        ))
            .then((res)=>{
                console.log(res)
                if(res.error){
                    alert("Не добавлено.")
                }
                else{
                    alert("Добавлено!")
                    setNewCategory('')
                    dispatch(fetchCategories())

                }
            })
    }
    const add_service= async e=> {
        e.preventDefault();
        await dispatch(addService(
            {
                service_name:newService,
                price: formPrice,
                image:formImage,
                description:formDescription,
                id_category: formCategory.id_category,
            }
        ))
            .then((res)=>{
                console.log(res)
                if(res.error){
                    alert("Не добавлено.")
                }
                else{
                    alert("Добавлено!")
                    setNewService('')
                    setFormDescription('')
                    setFormImage('')
                    setFormPrice('')

                }
            })
    }

    return (
        <div>
            {isManager ?
                <div>
                    <div className={`container`}>
                        <BasicBreadcrumbs props={[
                            {
                                ref: '/',
                                text: 'Главная'
                            },
                            {
                                ref: '/manager/add',
                                text: 'Добавление данных'
                            }
                        ]}/>
                    </div>

                    <div className="App">
                        <header className="App-header">
                            <h1>Добавление данных</h1>
                            <div className={'formWrapper'}>
                                <form className="EditForm" onSubmit={add_category}>
                                    <div>Новая категория</div>
                                    <input type="text" name="category_name" value={newCategory}
                                           onChange={e => setNewCategory(e.target.value)}
                                           placeholder="Название категории"/>
                                    <input type="submit" name="submit" value="Добавить"/>
                                </form>
                                <form className="EditForm" onSubmit={add_service}>
                                    <div>Новая услуга</div>

                                    <div>
                                        <select name="categories_list" id="categories_list"
                                                onChange={e => {
                                                    e.preventDefault();
                                                    let newCategoryName = e.target.value
                                                    console.log(e.target.value)
                                                    if (newCategoryName !== 0) {
                                                        setFormCategory(JSON.parse(newCategoryName))
                                                    }
                                                }}>
                                            <option value={0}>{'Категория'}</option>
                                            {categories.map((item, index) => {
                                                return <option key={index}
                                                               value={JSON.stringify(item)}>{item.category_name} </option>
                                            })}
                                        </select>
                                    </div>
                                    <div>
                                        <input type="text" name="service_name" value={newService}
                                               onChange={e => setNewService(e.target.value)}
                                               placeholder="Название услуги"/>
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
                                               onChange={e => setFormDescription(e.target.value)}
                                               placeholder="Описание"/>
                                    </div>

                                    <input type="submit" name="submit" value="Добавить"/>
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
export default ManagerAdd;