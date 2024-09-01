import React, { useEffect, useState } from "react";

import Container from "../../components/Container/Container";
import users from '../../data/users';
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

    const toggleDropdown = (filterName) => {
        setDropdownStates(prevState => ({
            ...prevState,
            [filterName]: !prevState[filterName]
        }))
    }


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
                            <div className="dropdown-checkbox">
                                <div className="dropdown-header" onClick={() => toggleDropdown('departments')}>
                                    Select Departments
                                    <Arrow className={dropdownStates.departments ? 'active' : ''} />
                                </div>
                                <div className={`dropdown-list ${dropdownStates.departments ? 'open' : ''}`}>
                                    {departments.map((dep) => {
                                        return <div className="dropdown-item">
                                            <label for={dep.name} className="dropdown-item"> {dep.name}</label>
                                            <input type="checkbox" name={dep.name} value={dep.name} />
                                        </div>
                                    })
                                    }
                                </div>
                            </div>

                            {/* Countries Filter */}
                            <div className="dropdown-checkbox">
                                <div className="dropdown-header" onClick={() => toggleDropdown('countries')}>
                                    Select country
                                    <Arrow className={dropdownStates.countries ? 'active' : ''} />
                                </div>
                                <div className={`dropdown-list ${dropdownStates.countries ? 'open' : ''}`}>
                                    {countries.map((country) => {
                                        return <div className="dropdown-item">
                                            <label for={country.name} className="dropdown-item"> {country.name}</label>
                                            <input type="checkbox" name={country.name} value={country.name} />
                                        </div>
                                    })
                                    }
                                </div>
                            </div>

                            {/* Statuses Filter */}
                            <div className="dropdown-checkbox">
                                <div className="dropdown-header" onClick={() => toggleDropdown('statuses')}>
                                    Select status
                                    <Arrow className={dropdownStates.statuses ? 'active' : ''} />
                                </div>
                                <div className={`dropdown-list ${dropdownStates.statuses ? 'open' : ''}`}>
                                    {statuses.map((status) => {
                                        return <div className="dropdown-item">
                                            <label for={status.name} className="dropdown-item"> {status.name}</label>
                                            <input type="checkbox" name={status.name} value={status.name} />
                                        </div>
                                    })
                                    }
                                </div>
                            </div>
                            <Bin className='delete-filters-btn' />
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

                            {users.map((user) => {
                                return <tr key={user.id}>
                                    <td>{user.name}</td>
                                    <td>{user.department.name}</td>
                                    <td>{user.country.name}</td>
                                    <td>{user.status.name}</td>
                                    <td><Bin /></td>
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