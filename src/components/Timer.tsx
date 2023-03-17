import React, {useState, useEffect, useRef} from "react";
import timeZones from "../time-zones";
import { Input } from "./Input";
type Props = {
    cityCountry:string;
}
export const Timer:React.FC<Props> = ({cityCountry}) => {
const styles: React.CSSProperties = {backgroundColor:"lightblue",
fontSize: "2em"};

const [time, setTime] = useState<Date>(new Date());
const [inputCityCountry, setCityCountry] = useState<string>(cityCountry);
const timeZone = useRef<string|undefined>();
function tic() {
    setTime(new Date());
    
}
useEffect(
 () => {
    timeZone.current = getTimeZone(cityCountry);
 }, [cityCountry]
)

useEffect(() => {
    const interval = setInterval(tic, 2000);
    console.log("useEffect");
    return () => clearInterval(interval);
}, [])
function getTimeZone(value: string): string | undefined{
    const index = timeZones.findIndex(tz => JSON.stringify(tz).includes(value));
    console.log("getTimeZone")
    return index < 0 ? undefined : timeZones[index].name
} 
function submitFn(inputValue: string): string{
    const tempZone = getTimeZone(inputValue);
    let res: string = '';
    if(!tempZone) {
        res = `${inputValue} doesn't exists in the time zones`
    } else {
        timeZone.current = tempZone;
        setCityCountry(inputValue);
    }
    return res;

}
    return <div>
        <Input submitFn={submitFn} placeHolder={"Enter city or country"}/>
        <h2 >Current Time in {inputCityCountry}</h2>
        <p style={styles}>{time.toLocaleTimeString(undefined,
             {timeZone: timeZone.current})}</p>
    </div>
}