import React, { useEffect, useState } from "react";
import Container from "../../components/Container/Container";
import defaultUsers from '../../data/users';
import departments from '../../data/departments';
import countries from '../../data/countries';
import statuses from '../../data/statuses';

import './EditUserPage.scss'
import Button from "../../components/Button/Button";

const EditUserPage = () => {

    const [users, setUsers] = useState([]);
    const [user, setUser] = useState({});
    const [initialUser, setInitialUser] = useState({});
    const [tempUser, setTempUser] = useState({});
    const [isChanged, setIsChanged] = useState(false)

    useEffect(() => {
        const storedUsers = JSON.parse(localStorage.getItem('users'));
        if (storedUsers && storedUsers.length > 0) {
            setUsers(storedUsers);
        } else {
            localStorage.setItem('users', JSON.stringify(defaultUsers));
            setUsers(defaultUsers);
        }
    }, []);

    const handleSetUser = (e) => {
        const selectedUserName = e.target.value;
        const selectedUser = users.find(user => user.name === selectedUserName)
        setUser(selectedUser);
        setInitialUser(selectedUser);
        setTempUser(selectedUser);
        setIsChanged(false)
    }

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        let updatedTempUser;

        switch (name) {
            case 'name':
                updatedTempUser = {
                    ...tempUser,
                    name: value
                };
                break;

            case 'department':
                const selectedDepartment = departments.find(dep => dep.name === value);
                updatedTempUser = {
                    ...tempUser,
                    department: selectedDepartment
                };
                break;

            case 'country':
                const selectedCountry = countries.find(country => country.name === value);
                updatedTempUser = {
                    ...tempUser,
                    country: selectedCountry
                };
                break;

            case 'status':
                const selectedStatus = statuses.find(status => status.name === value);
                updatedTempUser = {
                    ...tempUser,
                    status: selectedStatus
                };
                break;

            default:
                return;
        }

        setTempUser(updatedTempUser);

        if (JSON.stringify(updatedTempUser) === JSON.stringify(initialUser)) {
            setIsChanged(false);
        } else {
            setIsChanged(true);
        }
    };


    const handleSave = () => {
        const filteredUsers = users.filter(u => u.name !== user.name)

        const updatedUsers = [...filteredUsers, tempUser]
        console.log(updatedUsers);

        localStorage.setItem('users', JSON.stringify(updatedUsers))

        setUser(tempUser);
        setInitialUser(tempUser);
        setIsChanged(false);

    }

    const handleUndo = () => {
        setTempUser(initialUser);
        setIsChanged(false)
    }

    return (
        <section className="edit-user-page">
            <Container>
                <form className="page-wrapper" onSubmit={(e) => { e.preventDefault(); handleSave(); }}>
                    <h1 className="page-title">
                        EDIT USER
                    </h1>

                    <div className="user-select">
                        <label>User
                            <select name="user-select" id="user-select" onChange={handleSetUser}>
                                <option value="" disabled selected>Select a user</option>
                                {users.map(user => (
                                    <option key={user.id} value={user.name}>{user.name}</option>
                                ))}
                            </select>
                        </label>
                    </div>

                    <div className="user-information">
                        <h2>User Information</h2>
                        <div className="user-information-wrap">
                            <label>Full Name
                                <input
                                    type="text"
                                    name="name"
                                    value={tempUser.name}
                                    onChange={handleInputChange}
                                />
                            </label>
                            <label>Department
                                <select
                                    name="department"
                                    value={tempUser.department?.name || ''}
                                    onChange={handleInputChange}
                                >
                                    {departments.map(dep => (
                                        <option key={dep.id} value={dep.name}>{dep.name}</option>
                                    ))}
                                </select>
                            </label>
                            <label>Country
                                <select
                                    name="country"
                                    value={tempUser.country?.name || ''}
                                    onChange={handleInputChange}                                >
                                    {countries.map(country => (
                                        <option key={country.id} value={country.name}>{country.name}</option>
                                    ))}
                                </select>
                            </label>
                            <label>Status
                                <select
                                    name="status"
                                    value={tempUser.status?.name || ''}
                                    onChange={handleInputChange}                                >
                                    {statuses.map(status => (
                                        <option key={status.id} value={status.name}>{status.name}</option>
                                    ))}
                                </select>
                            </label>
                        </div>
                    </div>

                    <div className="btns-wrap">
                        <Button
                            className='btn-undo'
                            children='Undo'
                            onClick={handleUndo}
                            disabled={!isChanged}
                        />

                        <Button
                            className='btn-save'
                            type='submit'
                            children='Save'
                            disabled={!isChanged}
                        />
                    </div>

                </form>
            </Container>
        </section>
    )
}

export default EditUserPage