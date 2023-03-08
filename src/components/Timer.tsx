import React, { useState, useEffect } from "react";
import timeZones from "../time-zones";
type Props = {
    cityCountry: string;
}

interface TimeZone {
    name: string;
    countryName: string;
    mainCities: string[];
}

export const Timer: React.FC<Props> = ({ cityCountry }) => {
    const styles: React.CSSProperties = {
        backgroundColor: "lightblue",
        fontSize: "2em"
    };

    function findTimeZoneByCityName(timeZones: TimeZone[], cityCountry: string) {
        for (let i = 0; i < timeZones.length; i++) {
            if (timeZones[i].mainCities.includes(cityCountry) || timeZones[i].countryName.includes(cityCountry)) {
                return timeZones[i].name;
            }

            for (let city of timeZones[i].mainCities) {
                if (city.includes(cityCountry)) {
                    return timeZones[i].name;
                }
            }
        }
        return "Asia/Jerusalem";
    }

    const [time, setTime] = useState<Date>(new Date());

    function tic() {
        setTime(new Date());

    }

    useEffect(() => {
        const interval = setInterval(tic, 2000);
        console.log("useEffect");
        return () => clearInterval(interval);
    }, [])

    const res: string = findTimeZoneByCityName(timeZones, cityCountry);

    return <div>
        <h2 >Current Time in {cityCountry}</h2>
        <p style={styles}>{time.toLocaleTimeString(undefined, { timeZone: res })}</p>
    </div>
}