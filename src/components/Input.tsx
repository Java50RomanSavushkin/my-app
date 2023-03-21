import React, {useEffect, useRef, useState} from "react";
import { Alert } from "./Alert";
type Props = {
    submitFn: (value: string)=>string;
    placeHolder: string;
    buttonName?: string;
}
export const Input: React.FC<Props> = ({submitFn, placeHolder, buttonName}) => {
    const inputElement = useRef<HTMLInputElement>(null);
    const [message, setMessage] = useState<string>('')
    
    function inputProcess() {
        const tempMessage = submitFn(inputElement.current!.value);
        if(!tempMessage) {
            inputElement.current!.value=''
        }
       setMessage(tempMessage);
    }
    return <div>
        <input type="text" placeholder={placeHolder} ref={inputElement}/>
        <button onClick={inputProcess}>{buttonName || "GO"}</button>
        {message && <Alert message={message}/>}
    </div>

}