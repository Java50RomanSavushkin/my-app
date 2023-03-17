import React, { useState } from "react";
import { Input } from "./Input";
export const InputTest:React.FC = () =>
{
    const [inputValue, setInputValue] = useState<string>('')
    function submit(value: string): string {
        let res = '';
        if(value.toLowerCase().includes("hello")) {
            res = "get tired of 'HELLO'";
        } else {
            setInputValue(value);
        }
        
        return res;
    }
    return <div>
        <Input submitFn={submit} placeHolder={"enter any text"} buttonName="enter"/>
        <p>{inputValue}</p>
    </div>
}