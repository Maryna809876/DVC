import React, { useEffect, useRef, useState } from "react";

import Container from "../../components/Container/Container";
import defaultUsers from '../../data/users';
import departments from '../../data/departments';
import countries from '../../data/countries';
import statuses from '../../data/statuses';
import Arrow from '../../pictures/svg/usersPage/arrow.svg?react';
import Bin from '../../pictures/svg/usersPage/bin.svg?react'

import './UsersPage.scss'
import Button from "../../components/Button/Button";
import Modal from "../../components/Modal/Modal";

const UserPage = () => {

    const [dropdownStates, setDropdownStates] = useState({
        departments: false,
        countries: false,
        statuses: false,
    })

    const [selectedFilters, setSelectedFilters] = useState({
        departments: [],
        countries: [],
        statuses: [],
    });

    const [users, setUsers] = useState([]);
    const [filteredUsers, setFilteredUsers] = useState(users);
    const [isAvailableStatus, setIsAvailableStatus] = useState(false);
    const [isAvailableCountry, setIsAvailableCountry] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false)

    useEffect(() => {
        const storedUsers = JSON.parse(localStorage.getItem('users'));
        if (storedUsers && storedUsers.length > 0) {
            setUsers(storedUsers);
        } else {
            localStorage.setItem('users', JSON.stringify(defaultUsers));
            setUsers(defaultUsers);
        }
    }, []);

    useEffect(() => {
        if (users.length > 0) {
            localStorage.setItem('users', JSON.stringify(users));
        }
    }, [users]);

    const toggleDropdown = (filterName) => {
        if ((filterName === 'countries' || filterName === 'statuses')
            && !isAvailableStatus
            && !isAvailableCountry) {
            alert('Please choose 3 departments first')
        } else {
            setDropdownStates(prevState => ({
                ...prevState,
                [filterName]: !prevState[filterName]
            }))
        }
    }

    const handleFilterChange = (filterType) => (event) => {
        const { value, checked } = event.target;
        setSelectedFilters(prev => {
            const newFilters = checked
                ? [...prev[filterType], value]
                : prev[filterType].filter(item => item !== value);
            return {
                ...prev,
                [filterType]: newFilters
            }
        })
    }

    const handleDeleteAllFiters = () => {
        setSelectedFilters({
            departments: [],
            countries: [],
            statuses: [],
        })
    }

    const handleDeleteUser = (name) => {
        setUsers(prevUsers => prevUsers.filter(user => user.name !== name));
    };

    useEffect(() => {
        setIsAvailableStatus(selectedFilters.departments.length > 2)
        setIsAvailableCountry(selectedFilters.departments.length > 2)
    }, [selectedFilters.departments])

    useEffect(() => {
        let newFilteredUsers = users;

        if (selectedFilters.departments.length > 0) {
            newFilteredUsers = newFilteredUsers.filter(user =>
                selectedFilters.departments.includes(user.department.name)
            )
        }

        if (selectedFilters.countries.length > 0) {
            newFilteredUsers = newFilteredUsers.filter(user =>
                selectedFilters.countries.includes(user.country.name)
            )
        }

        if (selectedFilters.statuses.length > 0) {
            newFilteredUsers = newFilteredUsers.filter(user =>
                selectedFilters.statuses.includes(user.status.name)
            )
        }
        setFilteredUsers(newFilteredUsers);
    }, [selectedFilters, users])

    const handleModalOpen = () => {
        setIsModalOpen(true)
    }

    const handleModalClose = () => {
        setIsModalOpen(false)
    }

    const departmentsRef = useRef(null);
    const countriesRef = useRef(null);
    const statusesRef = useRef(null);


    const handleClickOutside = (event) => {
        if (
            departmentsRef.current &&
            !departmentsRef.current.contains(event.target) &&
            dropdownStates.departments
        ) {
            setDropdownStates((prevState) => ({
                ...prevState,
                departments: false,
            }));
        }

        if (
            countriesRef.current &&
            !countriesRef.current.contains(event.target) &&
            dropdownStates.countries
        ) {
            setDropdownStates((prevState) => ({
                ...prevState,
                countries: false,
            }));
        }

        if (
            statusesRef.current &&
            !statusesRef.current.contains(event.target) &&
            dropdownStates.statuses
        ) {
            setDropdownStates((prevState) => ({
                ...prevState,
                statuses: false,
            }));
        }
    };

    useEffect(() => {
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [dropdownStates]);

    return (
        <section className="user-page">
            <Container>
                <div className="page-wrapper" >
                    <h1 className="page-title">
                        USERS
                    </h1>
                    <p>Please add at least 3 departmetns to be able to proceed next steps.</p>
                    <div className="user-page-header">
                        <div className="filters-wrap">

                            {/* Departments Filter */}
                            <div ref={departmentsRef} className="dropdown-checkbox available">
                                <div
                                    className={`dropdown-header ${selectedFilters.departments.length > 0 ? 'selected' : 'not-selected'}`}

                                    onClick={() => toggleDropdown('departments')}>
                                    {selectedFilters.departments.length > 0
                                        ? `Selected (${selectedFilters.departments.length})`
                                        : 'Select Departments'}
                                    <Arrow className={dropdownStates.departments ? 'active' : ''} />
                                </div>
                                <div className={`dropdown-list ${dropdownStates.departments ? 'open' : ''}`}>
                                    {departments.map((dep) => {
                                        return <div className="dropdown-item">
                                            <input
                                                type="checkbox"
                                                id={dep.name}
                                                name={dep.name}
                                                value={dep.name}
                                                checked={selectedFilters.departments.includes(dep.name)}
                                                onChange={handleFilterChange('departments')}
                                            />
                                            <label htmlFor={dep.name}>
                                                {dep.name}
                                            </label>
                                        </div>


                                    })
                                    }
                                </div>
                            </div>

                            {/* Countries Filter */}
                            <div ref={countriesRef} className={`dropdown-checkbox ${isAvailableStatus ? 'available' : ''}`}>
                                <div
                                    className={`dropdown-header ${isAvailableCountry && selectedFilters.countries.length > 0 ? 'selected' : 'not-selected'}`}
                                    onClick={() => toggleDropdown('countries')}>
                                    {isAvailableCountry && selectedFilters.countries.length > 0 ? `Selected (${selectedFilters.countries.length})` : 'Select country'}
                                    <Arrow className={dropdownStates.countries ? 'active' : ''} />
                                </div>
                                <div className={`dropdown-list ${dropdownStates.countries ? 'open' : ''}`}>
                                    {countries.map((country) => {
                                        return <div className="dropdown-item">
                                            <input
                                                type="checkbox"
                                                id={country.name}
                                                name={country.name}
                                                value={country.name}
                                                checked={selectedFilters.countries.includes(country.name)}

                                                onChange={handleFilterChange('countries')} />
                                            <label htmlFor={country.name}> {country.name}</label>

                                        </div>


                                    })
                                    }
                                </div>
                            </div>

                            {/* Statuses Filter */}
                            <div ref={statusesRef} className={`dropdown-checkbox ${isAvailableStatus ? 'available' : ''}`}>
                                <div
                                    className={`dropdown-header ${isAvailableStatus && selectedFilters.statuses.length > 0 ? 'selected' : 'not-selected'}`}

                                    onClick={() => toggleDropdown('statuses')}>
                                    {isAvailableStatus && selectedFilters.statuses.length > 0 ? `Selected (${selectedFilters.statuses.length})` : 'Select status'}
                                    <Arrow className={dropdownStates.statuses ? 'active' : ''} />
                                </div>
                                <div className={`dropdown-list ${dropdownStates.statuses ? 'open' : ''}`}>
                                    {statuses.map((status) => {
                                        return <div className="dropdown-item" >

                                            <input
                                                type="checkbox"
                                                id={status.name}
                                                name={status.name}
                                                value={status.name}
                                                checked={selectedFilters.statuses.includes(status.name)}
                                                onChange={handleFilterChange('statuses')} />
                                            <label
                                                htmlFor={status.name}>
                                                {status.name}</label>
                                        </div>
                                    })
                                    }
                                </div>
                            </div>
                            <Bin className='delete-filters-btn' onClick={handleDeleteAllFiters} />
                        </div>
                        <Button children='Add User' onClick={handleModalOpen} />
                    </div>

                    <table className="users-table">
                        <thead>
                            <tr>
                                <td className="col-fullname">Full Name</td>
                                <td className="col-department">Department</td>
                                <td className="col-country">Country</td>
                                <td className="col-status">Status</td>
                                <td className="col-delete"></td>
                            </tr>
                        </thead>
                        <tbody>

                            {filteredUsers.map((user) => {
                                return <tr key={user.id}>
                                    <td className="col-fullname">{user.name}</td>
                                    <td className="col-department">{user.department.name}</td>
                                    <td className="col-country">{user.country.name}</td>
                                    <td className="col-status">{user.status.name}</td>
                                    <td className="col-delete">
                                        <Bin className="delete-user-btn" onClick={() => handleDeleteUser(user.name)} />
                                    </td>
                                </tr>
                            })}
                        </tbody>
                    </table>


                </div>
            </Container>

            {isModalOpen && <Modal onClose={handleModalClose} setUsers={setUsers} users={users} />}
        </section>
    )
}

export default UserPage