import { useState } from "react";
import ExpenseDate from "./ExpenseDate";
import Card from "../UI/Card";
import "./ExpenseItem.css";

const ExpenseItem = (props) => {
    // const [title, setTitle] = useState(props.title);
    //console.log('ExpenseItem evaluated by React'); //여기에 적어놓으면 4개 출력됨. ExpenseItem 4개 각각 부르기 때문

    // const clickHandler = () => {
    //     setTitle("Updated!");
    //     console.log(title); // 바뀌기 전 값이 출력됨
    // };

    return (
        <Card className="expense-item">
            <ExpenseDate date={props.date} />
            <div className="expense-item__description">
                <h2>{props.title}</h2>
                <div className="expense-item__price">${props.amount}</div>
            </div>
            {/* <button
                onClick={() => {
                    clickHandler();
                }}
            >
                Change Title
            </button> */}
        </Card>
    );
};

export default ExpenseItem;
