import React, { useState } from "react";
import users from '../../data/users';
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

        setUsers(prev => [
            ...prev,
            {
                name: selectedFields.name,
                department: { name: selectedFields.department },
                country: { name: selectedFields.country },
                status: { name: selectedFields.status }
            }
        ]);
        onClose();
    }

    const handleCloseModal = () => {
        onClose()
    }

    return (
        <>
            <div className="modal-overlay" onClick={handleCloseModal}>
                <div className="modal-wrapper" onClick={(e) => e.stopPropagation()}>
                    <h1 className="page-title">add user</h1>
                    <div className="modal-information-wrap">
                        <label>Full Name
                            <input
                                type="text"
                                name="name"
                                placeholder="Enter full name"
                                onChange={handleChange('name')}
                            />
                        </label>
                        <label>Department
                            <select
                                name="department"
                                onChange={handleChange('department')}
                            >
                                <option selected>{'Select department'}</option>
                                {departments.map(dep => (
                                    <option key={dep.id} value={dep.name}>{dep.name}</option>
                                ))}
                            </select>
                        </label>
                        <label>Country
                            <select
                                name="country"
                                onChange={handleChange('country')}
                            >
                                <option selected>{'Select country'}</option>

                                {countries.map(country => (
                                    <option key={country.id} value={country.name}>{country.name}</option>
                                ))}
                            </select>
                        </label>
                        <label>Status
                            <select
                                name="status"
                                onChange={handleChange('status')}
                            >
                                <option selected>{'Select status'}</option>

                                {statuses.map(status => (
                                    <option key={status.id} value={status.name}>{status.name}</option>
                                ))}
                            </select>
                        </label>
                    </div>
                    <div className="btns-wrap">
                        <Button
                            className='btn-cancel'
                            children='Cancel'
                            onClick={handleCloseModal}
                        />

                        <Button
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