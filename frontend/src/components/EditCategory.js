import React from "react"
import axios from "axios"
import { useState, useEffect } from "react"
import Button from 'react-bootstrap/Button'
import Navbar from "../components/UserNavbar"
import Form from 'react-bootstrap/Form'
import Dropdown from 'react-bootstrap/Dropdown'

const client = axios.create({
    baseURL: "http://127.0.0.1:8000"
})

const EditCategory = () => {

    const [name, setName] = useState('')
    const [choosenCategory, setChoosenCategory] = useState(null)
    const [categories, setCategories] = useState('')
    const [errorMessage, setErrorMessage] = useState('')

    function getCategoires() {
        client.get('/api/exercise-category-list/', {
            headers: {
                'Authorization': `Token ${localStorage.getItem("token")}`,
            }
        }).then(res => {setCategories(res.data)}).catch(error => {console.log(error)})
    }

    function handleUpdateCategoires() {
        choosenCategory ?
        client.put(`/api/exercise-category-update/${choosenCategory.id}`,  {
            author: localStorage.getItem('userId'),
            name: name,
        },
        {
            headers: {
                'Authorization': `Token ${localStorage.getItem("token")}`,
            }
        }).then(res => {setCategories(res.data)}).catch(error => {console.log(error)}) : setErrorMessage("You have not chosen any category")
    }


    function selectedCategory(category){
        setChoosenCategory(category)
        setName(category.name)
    }

    useEffect(() => {
        getCategoires()
    },[])


    function deleteCategory() {
        choosenCategory ?
        client.delete(`/api/exercise-category-delete/${choosenCategory.id}`, {
            headers: {
                'Authorization': `Token ${localStorage.getItem("token")}`,
            }
        }).then((res) => {
            setChoosenCategory(null)
            setName('')
            getCategoires()
        }).catch(error => console.log(error)) : setErrorMessage("You have not chosen any category")

    }
    return (
        <>
        <Navbar/>
        <div className="main-container-img-form">
        <div className="logo-container">
        <img src="/GBlogo.png" alt="GB Logo" className="logo" /> 
        </div>
        <div className="container-form">
            <h1>Choose category which you want to edit.</h1>
            <Form onSubmit={handleUpdateCategoires}>
                <Form.Group className="mb-3" controlId="formBasicTpInfo">
                <Form.Label>Exercises</Form.Label>
                    <Dropdown data-bs-theme="dark">
                    <Dropdown.Toggle variant="secondary" id="dropdown-basic">
                        {choosenCategory ? choosenCategory.name : <>Choose category</>}
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                        {categories ? (categories.map((category) => (
                        <><Dropdown.Item key={category.id} onClick={() => {selectedCategory(category)}}>
                            {category.name}
                        </Dropdown.Item><Dropdown.Divider /></>
                        ))) : (<Dropdown.Item>Categoires have not found</Dropdown.Item>)}
                    </Dropdown.Menu>
                    </Dropdown>
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicTpName">
                <Form.Label>Name</Form.Label>
                <Form.Control
                    type="text"
                    placeholder="Type in name"
                    value={name}
                    onChange={e => setName(e.target.value)}
                />
                </Form.Group>
        
                <Form.Text className="text-muted">
                    {errorMessage}
                </Form.Text>
                <Button variant="secondary" type="submit" style={{marginRight: "12px"}} >
                    Edit
                </Button>
                <Button variant="secondary" onClick={deleteCategory}>
                    Delete Category
                </Button>
            </Form>
        </div>
        <div className="logo-container">
        <img src="/GBlogo.png" alt="GB Logo" className="logo" /> 
        </div>
        </div>
        </>
    )


}

export default EditCategory