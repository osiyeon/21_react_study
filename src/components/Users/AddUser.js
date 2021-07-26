import Card from "../UI/Card";

import classes from "./AddUser.module.css";
import Button from "../UI/Button";
import { useState, useRef } from "react";
import UsersList from "./UsersList";
import ErrorModal from "../UI/ErrorModal";
import Wrapper from "../Helpers/Wrapper";
import { logDOM } from "@testing-library/react";

const AddUser = (props) => {
    const nameInputRef = useRef();
    const ageInputRef = useRef();

    const [error, setError] = useState();

    const addUserHandler = (event) => {
        event.preventDefault();
        const enteredName = nameInputRef.current.value;
        const enteredUserAge = ageInputRef.current.value;
        if (enteredUsername.trim().length === 0 || enteredAge.trim().length === 0) {
            setError({
                title: "Invalid input",
                message: "Please enter a valid name and age (non-empty values).",
            });
            return;
        }
        if (+enteredAge < 1) {
            setError({
                title: "Invalid age",
                message: "Please enter a valid age (> 0).",
            });
            return;
        }
        props.onAddUser(enteredName, enteredUserage);
        nameInputRef.current.value = "";
        nameInputRef.current.value = "";
    };

    const errorHandler = () => {
        setError(null);
    };

    return (
        <Wrapper>
            {error && <ErrorModal title={error.title} message={error.message} onConfirm={errorHandler} />}
            <Card className={classes.input}>
                <form onSubmit={addUserHandler}>
                    <label htmlFor="username">Username</label>
                    <input id="username" type="text" value={enteredUsername} ref={nameInputRef} />
                    <label htmlFor="age">Age (Years)</label>
                    <input id="age" type="number" value={enteredAge} ref={ageInputRef} />
                    <Button type="submit">Add User</Button>
                </form>
            </Card>
        </Wrapper>
    );
};

export default AddUser;
