import React, { useState, useEffect, useRef } from "react";
import timeZones from "../time-zones";
type Props = {
    cityCountry: string;
}
export const Timer: React.FC<Props> = ({ cityCountry }) => {
    const styles: React.CSSProperties = {
        backgroundColor: "lightblue",
        fontSize: "2em"
    };

    const [time, setTime] = useState<Date>(new Date());
    const timeZone = useRef<string | undefined>();
    function tic() {
        setTime(new Date());

    }
    useEffect(
        () => {
            timeZone.current = getTimeZone();
        }, [cityCountry]
    )

    useEffect(() => {
        const interval = setInterval(tic, 2000);
        console.log("useEffect");
        return () => clearInterval(interval);
    }, [])
    function getTimeZone(): string | undefined {
        const index = timeZones.findIndex(tz => JSON.stringify(tz).includes(cityCountry));
        console.log("getTimeZone")
        return index < 0 ? undefined : timeZones[index].name
    }
    return <div>
        <h2 >Current Time in {cityCountry}</h2>
        <p style={styles}>{time.toLocaleTimeString(undefined,
            { timeZone: timeZone.current })}</p>
    </div>
}