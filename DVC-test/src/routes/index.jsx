import { Routes, Route } from 'react-router-dom';

import EditUserPage from '../pages/EditUserPage/EditUserPage';
import UserPage from '../pages/UsersPage/UsersPage';

export default () => {
    return (
        <Routes>
            <Route path={'/'} element={<EditUserPage />} />
            <Route path={'edit'} element={<EditUserPage />} />
            <Route path={"/user"} element={<UserPage />} />


            <Route path={"*"} element={<div>404 Page is not found</div>} />
        </Routes>
    )
}
