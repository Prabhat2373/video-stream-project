import React, { useState } from "react";

function ManualVerifierAPIBox({ apiDataUrl }: {
    apiDataUrl: string
}) {
    const [apiData, setApiData] = useState(null);

    const handleViewClick = () => {
        const cachedApiData = sessionStorage.getItem("apiData");

        if (cachedApiData) {
            setApiData(JSON.parse(cachedApiData));
        } else {
            fetch(apiDataUrl)
                .then((response) => {
                    if (response.status === 200) {
                        return response.json();
                    } else {
                        throw new Error("API is down");
                    }
                })
                .then((data) => {
                    setApiData(data);
                    sessionStorage.setItem("apiData", JSON.stringify(data));
                })
                .catch((error) => {
                    console.log(error);
                });
        }
    };

    const handleClearClick = () => {
        setApiData(null);
        sessionStorage.removeItem("apiData");
    };

    return (
        <div>
            <button onClick={handleViewClick}>View</button>
            <button onClick={handleClearClick}>Clear</button>
            {apiData && (
                <div>
                    <pre>{JSON.stringify(apiData, null, 2)}</pre>
                </div>
            )}
        </div>
    );
}

export default ManualVerifierAPIBox;
