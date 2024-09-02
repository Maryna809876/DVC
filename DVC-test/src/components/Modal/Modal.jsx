import React from "react";
import users from '../../data/users';
import departments from '../../data/departments';
import countries from '../../data/countries';
import statuses from '../../data/statuses';
import './Modal.scss'
import Button from "../Button/Button";

const Modal = () => {

    return (
        <>
            <div className="modal-overlay">
                <div className="modal-wrapper">
                    <h1 className="page-title">add user</h1>
                    <div className="modal-information-wrap">
                        <label>Full Name
                            <input
                                type="text"
                                name="name"
                            // value={tempUser.name || ''}
                            // onChange={handleInputChange}
                            />
                        </label>
                        <label>Department
                            <select
                                name="department"
                            // value={tempUser.department?.name || ''}
                            // onChange={handleInputChange}
                            >
                                {departments.map(dep => (
                                    <option key={dep.id} value={dep.name}>{dep.name}</option>
                                ))}
                            </select>
                        </label>
                        <label>Country
                            <select
                                name="country"
                            // value={tempUser.country?.name || ''}
                            // onChange={handleInputChange}                                
                            >
                                {countries.map(country => (
                                    <option key={country.id} value={country.name}>{country.name}</option>
                                ))}
                            </select>
                        </label>
                        <label>Status
                            <select
                                name="status"
                            // value={tempUser.status?.name || ''}
                            // onChange={handleInputChange}                               
                            >
                                {statuses.map(status => (
                                    <option key={status.id} value={status.name}>{status.name}</option>
                                ))}
                            </select>
                        </label>
                    </div>
                    <div className="btns-wrap">
                        <Button
                            className='btn-undo'
                            children='Undo'
                        // onClick={handleUndo}
                        // disabled={!isChanged}
                        />

                        <Button
                            className='btn-save'
                            type='submit'
                            children='Save'
                        // disabled={!isChanged} 
                        />
                    </div>
                </div>
            </div>
        </>
    )
}

export default Modal