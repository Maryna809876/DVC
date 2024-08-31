import React, { useEffect, useState } from "react";
import Container from "../../components/Container/Container";
import users from '../../data/users';
import departments from '../../data/departments';
import countries from '../../data/countries';
import statuses from '../../data/statuses';



import './EditUserPage.scss'
import Button from "../../components/Button/Button";

const EditUserPage = () => {

    const [user, setUser] = useState({});

    const handleSetUser = (e) => {
        const selectedUserName = e.target.value;
        const selectedUser = users.find(user => user.name === selectedUserName)
        setUser(selectedUser)
    }

    useEffect(() => {
        console.log(user);
    }, [user])

    return (
        <>
            <section className="edit-user-page">
                <Container>
                    <form className="page-wrapper">
                        <h1 className="page-title">
                            EDIT USER
                        </h1>

                        <div className="user-select">
                            <label>User
                                <select name="user-select" id="user-select" onChange={handleSetUser}>
                                    {users.map(user => {
                                        return <option value={user.name}>{user.name}</option>
                                    })}
                                </select>
                            </label>

                        </div>
                        <div className="user-information">
                            <h2>User Information</h2>
                            <div className="user-information-wrap">
                                <label>Full Name
                                    <input type="text" placeholder={user.name} />
                                </label>
                                <label>Department
                                    <select name="department" id="department">
                                        {departments.map(dep => {
                                            return <option
                                                key={dep.id}
                                                value={dep.name}
                                                selected={user.department.name === dep.name}
                                            > {dep.name}</option>
                                        })}
                                    </select>
                                </label>
                                <label>Country
                                    <select name="country" id="country">
                                        {countries.map(country => {
                                            return <option
                                                key={country.id}
                                                value={country.name}
                                                selected={user.country.name === country.name}
                                            > {country.name}</option>
                                        })}
                                    </select>
                                </label>
                                <label>Status
                                    <select name="status" id="status">
                                        {statuses.map(status => {
                                            return <option
                                                key={status.id}
                                                value={status.name}
                                                selected={user.status.name === status.name}
                                            > {status.name}</option>
                                        })}
                                    </select>
                                </label>
                            </div>
                        </div>
                        <div className="btns-wrap">
                            <Button
                                className='btn-undo'
                                children='Undo' />
                            <Button
                                className='btn-save'

                                type=''
                                children='Save' />
                        </div>

                    </form>
                </Container>
            </section >
        </>
    )
}

export default EditUserPage