import { useState, useEffect} from "react";
import LearningMaterials from "./LearningMaterial";

function SearchQuery() {

    const [query, setQuery] = useState(undefined);

    useEffect(() => {
        console.log(query);
        
    });

    const handleSearch = (event) =>{
        event.preventDefault();
        console.log(event.target[0].value)
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
            query && <LearningMaterials query = {query}/>
        }
        </div>
    )

}

export default SearchQuery;