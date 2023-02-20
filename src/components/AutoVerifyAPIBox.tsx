import React, { useState, useEffect } from "react";

function AutoVerifierAPIBox() {
    const [status, setStatus] = useState("Checking API status...");
    const [remainingTime, setRemainingTime] = useState(35);

    useEffect(() => {
        const intervalId = setInterval(() => {
            setRemainingTime((prevRemainingTime) =>
                prevRemainingTime > 1 ? prevRemainingTime - 1 : 35
            );

            fetch("<API_URL>")
                .then((response) => {
                    if (response.status === 200) {
                        return response.json();
                    } else {
                        throw new Error("API is down");
                    }
                })
                .then((data) => {
                    setStatus(`API status: active, no of items: ${data.length}`);
                })
                .catch((error) => {
                    setStatus("API status: down");
                });
        }, 35000);

        return () => clearInterval(intervalId);
    }, []);

    return (
        <div>
            <span>{status}</span>
            <div>{remainingTime} seconds remaining for next API hit</div>
        </div>
    );
}

export default AutoVerifierAPIBox;
