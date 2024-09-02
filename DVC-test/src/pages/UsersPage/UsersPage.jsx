import React, { useEffect, useState } from "react";

import Container from "../../components/Container/Container";
import usersData from '../../data/users';
import departments from '../../data/departments';
import countries from '../../data/countries';
import statuses from '../../data/statuses';
import Arrow from '../../pictures/svg/usersPage/arrow.svg?react';
import Bin from '../../pictures/svg/usersPage/bin.svg?react'

import './UsersPage.scss'
import Button from "../../components/Button/Button";

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

    const [users, setUsers] = useState(usersData);
    const [filteredUsers, setFilteredUsers] = useState(users);
    const [isAvailableStatus, setIsAvailableStatus] = useState(false);
    const [isAvailableCountry, setIsAvailableCountry] = useState(false);

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
                            <div className="dropdown-checkbox available">
                                <div className="dropdown-header" onClick={() => toggleDropdown('departments')}>
                                    {selectedFilters.departments.length > 0 ? `Selected ${selectedFilters.departments.length}` : 'Select Departments'}
                                    <Arrow className={dropdownStates.departments ? 'active' : ''} />
                                </div>
                                <div className={`dropdown-list ${dropdownStates.departments ? 'open' : ''}`}>
                                    {departments.map((dep) => {
                                        return <div className="dropdown-item">
                                            <label htmlFor={dep.name} className="dropdown-item"> {dep.name}</label>
                                            <input
                                                type="checkbox"
                                                name={dep.name}
                                                value={dep.name}
                                                checked={selectedFilters.departments.includes(dep.name)}
                                                onChange={handleFilterChange('departments')} />
                                        </div>
                                    })
                                    }
                                </div>
                            </div>

                            {/* Countries Filter */}
                            <div className={`dropdown-checkbox ${isAvailableStatus ? 'available' : ''}`}>
                                <div className="dropdown-header" onClick={() => toggleDropdown('countries')}>
                                    {isAvailableCountry && selectedFilters.countries.length > 0 ? `Selected ${selectedFilters.countries.length}` : 'Select country'}
                                    <Arrow className={dropdownStates.countries ? 'active' : ''} />
                                </div>
                                <div className={`dropdown-list ${dropdownStates.countries ? 'open' : ''}`}>
                                    {countries.map((country) => {
                                        return <div className="dropdown-item">
                                            <label htmlFor={country.name} className="dropdown-item"> {country.name}</label>
                                            <input
                                                type="checkbox"
                                                name={country.name}
                                                value={country.name}
                                                checked={selectedFilters.countries.includes(country.name)}

                                                onChange={handleFilterChange('countries')} />
                                        </div>
                                    })
                                    }
                                </div>
                            </div>

                            {/* Statuses Filter */}
                            <div className={`dropdown-checkbox ${isAvailableStatus ? 'available' : ''}`}>
                                <div className="dropdown-header" onClick={() => toggleDropdown('statuses')}>
                                    {isAvailableStatus && selectedFilters.statuses.length > 0 ? `Selected ${selectedFilters.statuses.length}` : 'Select status'}
                                    <Arrow className={dropdownStates.statuses ? 'active' : ''} />
                                </div>
                                <div className={`dropdown-list ${dropdownStates.statuses ? 'open' : ''}`}>
                                    {statuses.map((status) => {
                                        return <div className="dropdown-item" >
                                            <label
                                                htmlFor={status.name}
                                                className="dropdown-item">
                                                {status.name}</label>
                                            <input
                                                type="checkbox"
                                                name={status.name}
                                                value={status.name}
                                                checked={selectedFilters.statuses.includes(status.name)}

                                                onChange={handleFilterChange('statuses')} />
                                        </div>
                                    })
                                    }
                                </div>
                            </div>
                            <Bin className='delete-filters-btn' onClick={handleDeleteAllFiters} />
                        </div>
                        <Button children='Add User' />
                    </div>

                    {/* ////////////// */}
                    <table className="users-table">
                        <thead>
                            <tr>
                                <td>Full Name</td>
                                <td>Department</td>
                                <td>Country</td>
                                <td>Status</td>
                                <td></td>
                            </tr>
                        </thead>
                        <tbody>

                            {filteredUsers.map((user) => {
                                return <tr key={user.id}>
                                    <td>{user.name}</td>
                                    <td>{user.department.name}</td>
                                    <td>{user.country.name}</td>
                                    <td>{user.status.name}</td>
                                    <td><Bin className='delete-user-btn' onClick={() => handleDeleteUser(user.name)} /></td>
                                </tr>
                            })}
                        </tbody>
                    </table>


                </div>
            </Container>
        </section>
    )
}

export default UserPage