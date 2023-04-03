import { useState, useEffect } from "react";
import LearningMaterials from "./LearningMaterial";
import Axios from 'axios';
import Youtube from 'react-youtube';
import Description from "./Description";

const API_URL_PREVIOUS_REQS = "https://52qgbt9ol7.execute-api.us-east-1.amazonaws.com/default/getPreviousLearningDataForUser";


function SearchQuery(username) {
    const [query, setQuery] = useState(undefined);
    const [previousData, setPreviousData] = useState(undefined);

    useEffect(() => {
        if (username) {
            getPreviousRequests();
        }
    }, [username]);


    useEffect(() => {
        if (previousData) {
            displayPrevious();
        }
    }, [previousData]);

    const handleSearch = (event) => {
        event.preventDefault();
        setQuery(event.target[0].value)
    }


    function getPreviousRequests() {
        Axios.post(API_URL_PREVIOUS_REQS, { userId: '3ca9a222-febc-423d-96ba-c2b18bc2e2b7' }).then(res => {
            setPreviousData(res.data)
        })
    }

    function displayPrevious() {
        if (typeof previousData !== 'undefined' && previousData.length > 0) {
            console.log(previousData);
            return(
            previousData.map((jsonObj) => {
                return(
                    <div>
                    <Description DescriptionText={jsonObj['Description']}></Description>
                    <Youtube videoId = {jsonObj['YoutubeURL'].slice(32)} opts = {{width: '320',height: '180'}}/>
                    </div>
                )
            })
            )
        }
    }

    return (
        <div>
            <form onSubmit={handleSearch}>
                <label>
                    What do you wish to learn about:
                    <input type="text" name="query" />
                </label>
                <input type="submit" value="Submit" />
            </form>
            {
                query && <LearningMaterials query={query} username={username.username} />
            }

        <h1>Previous Learning Queries</h1>
        {displayPrevious()}
        </div>
    )
}

export default SearchQuery;