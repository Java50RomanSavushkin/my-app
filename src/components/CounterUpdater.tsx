import React from "react";
import { useDispatch, useSelector } from 'react-redux';
import { counterActions } from "../redux/counterSlice";
type Props = {
    operand: number
}
export const CounterUpdater: React.FC<Props> = ({ operand }) => {
    const dispatch = useDispatch();
    const authUser = useSelector<any,string>(state=>state.auth.authUser)
    return <div>
        <button onClick={() => dispatch(counterActions.increment(operand))}>
            Increment</button>
        <button onClick={() => dispatch(counterActions.decrement(operand))}>
            Decrement</button>
       { authUser.includes('admin') && <button onClick={() => dispatch(counterActions.reset())}>
            Reset</button>}

    </div>
}