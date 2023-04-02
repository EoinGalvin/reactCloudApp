import { useState, useEffect} from "react";
import LearningMaterials from "./LearningMaterial";

function SearchQuery(username) {

    const [query, setQuery] = useState(undefined);

    useEffect(() => {
    });

    const handleSearch = (event) =>{
        event.preventDefault();
        setQuery(event.target[0].value)
    }

    return (
        <div>
        <form onSubmit = {handleSearch}>
            <label>
                Name:
                <input type="text" name="query" />
            </label>
            <input type="submit" value="Submit" />
        </form>
        {
            query && <LearningMaterials query = {query} username = {username.username}/>
        }
        </div>
    )

}

export default SearchQuery;