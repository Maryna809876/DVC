import React, { useEffect, useState } from "react";
import defaultUsers from '../../data/users';
import departments from '../../data/departments';
import countries from '../../data/countries';
import statuses from '../../data/statuses';
import './Modal.scss'
import Button from "../Button/Button";

const Modal = ({ onClose, users, setUsers }) => {


    const [selectedFields, setSelectedFields] = useState({
        name: '',
        department: '',
        country: '',
        status: ''
    })

    const handleChange = (type) => (event) => {
        const value = event.target.value
        setSelectedFields(prev => ({
            ...prev,
            [type]: value
        }))
    }

    const handleAddUser = () => {
        setUsers(prev => {
            const updatedUsers = [
                ...prev,
                {
                    name: selectedFields.name,
                    department: { name: selectedFields.department },
                    country: { name: selectedFields.country },
                    status: { name: selectedFields.status }
                }
            ];

            localStorage.setItem('users', JSON.stringify(updatedUsers));

            return updatedUsers;
        });

        onClose();
    };


    const handleCloseModal = () => {
        onClose()
    }

    return (
        <>
            <div className="modal-overlay" onClick={handleCloseModal}>
                <div className="modal-wrapper" onClick={(e) => e.stopPropagation()}>
                    <h1 className="page-title">add user</h1>
                    <div className="modal-information-wrap">
                        <div className="name-input">
                            <label>Full Name</label>
                            <input
                                type="text"
                                name="name"
                                placeholder="Enter full name"
                                onChange={handleChange('name')}
                            />
                        </div>


                        <div className="custom-select">
                            <label>Department</label>
                            <select
                                name="department"
                                onChange={handleChange('department')}
                            >
                                <option selected>{'Select department'}</option>
                                {departments.map(dep => (
                                    <option key={dep.id} value={dep.name}>{dep.name}</option>
                                ))}
                            </select>
                        </div>


                        <div className="custom-select">
                            <label>Country</label>
                            <select
                                name="country"
                                onChange={handleChange('country')}
                            >
                                <option selected>{'Select country'}</option>

                                {countries.map(country => (
                                    <option key={country.id} value={country.name}>{country.name}</option>
                                ))}
                            </select>
                        </div>

                        <div className="custom-select">
                            <label>Status</label>
                            <select
                                name="status"
                                onChange={handleChange('status')}
                            >
                                <option selected>{'Select status'}</option>

                                {statuses.map(status => (
                                    <option key={status.id} value={status.name}>{status.name}</option>
                                ))}
                            </select>
                        </div>

                    </div>
                    <div className="btns-wrap">
                        <Button
                            style={{ padding: '14px 27px' }}
                            className='btn-cancel'
                            children='Cancel'
                            onClick={handleCloseModal}
                        />

                        <Button
                            style={{ padding: '14px 62px' }}
                            className='btn-add'
                            children='Add'
                            onClick={handleAddUser}
                        />
                    </div>
                </div>
            </div>
        </>
    )
}

export default Modal