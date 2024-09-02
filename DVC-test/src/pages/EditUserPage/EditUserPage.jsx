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
    const [initialUser, setInitialUser] = useState({});
    const [tempUser, setTempUser] = useState({});

    const [isChanged, setIsChanged] = useState(false)

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
        console.log(name, value);

        switch (name) {
            case 'department':
                console.log('department');

                const selectedDepartment = departments.find(dep => dep.name === value)
                setTempUser(prevUser => ({
                    ...prevUser,
                    department: selectedDepartment
                }))
                console.log(tempUser);
                break;

            case 'country':
                console.log('country');

                const selectedCountry = countries.find(dep => dep.name === value)
                setTempUser(prevUser => ({
                    ...prevUser,
                    country: selectedCountry
                }))
                console.log(tempUser);
                break;

            case 'status':
                console.log('status');

                const selectedStatus = statuses.find(dep => dep.name === value)
                setTempUser(prevUser => ({
                    ...prevUser,
                    status: selectedStatus
                }))
                console.log(tempUser);
                break;

            default:
                break;
        }
        setIsChanged(true)
    }

    const handleSave = () => {
        setUser(tempUser);
        setInitialUser(tempUser);
        setIsChanged(false)
    }

    const handleUndo = () => {
        setTempUser(initialUser);
        setIsChanged(false)
    }

    useEffect(() => {
        console.log('tempUser updated:', tempUser);
    }, [tempUser]);

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
                                    value={tempUser.name || ''}
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