import React from "react";
import Container from "../Container/Container";
import Button from "../Button/Button";
import './Header.scss'
const Header = () => {
    return (
        <>
            <header className="g-header">
                <Container>
                    <Button
                        className={'edit-users-btn'}
                        to={'/edit'}
                        children={'Edit Users'}
                    />
                    <Button
                        className={'users-btn'}

                        to={'/user'}

                        children={'Users'}
                    />
                </Container>
            </header>

        </>
    )
}

export default Header