import YoutubeEmbed from "./YoutubeEmbed";
import Description from "./Description";
import { useState, useEffect } from "react";
import Axios from 'axios';
const URL1 = "https://1vqfhabk0j.execute-api.us-east-1.amazonaws.com/default/lambdapythoneoin1";
const URL2 = "https://1vqfhabk0j.execute-api.us-east-1.amazonaws.com/default/openAIgpt3_5_Turbo";

function LearningMaterials(props) {
    const [videoId, setVideoId] = useState(undefined);
    const [description, setDescription] = useState(undefined)
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        if(props.query){
            setIsLoading(true);
            setDescription(undefined);
            setVideoId(undefined);
            console.log("use effect");
            getYoutubeVideo();
            getGPTdesc();
        }
        
    }, [props.query]);

    function getYoutubeVideo() {
        Axios.post(URL1, { name: props.query }).then(res => {
            //console.log(res.data.videoId)
            let videoId = res.data.videoId
            setVideoId(videoId);
        })
    }

    function getGPTdesc() {
        Axios.post(URL2, { query:  props.query  }).then(res => {
            setDescription(res.data)
        })
    }


    useEffect(() => {
        if (videoId && description) {
            setIsLoading(false)
        }

    }, [videoId, description]);


    return (
        <div>
            {isLoading ? (
                <span>Fetching Results</span>
            ) :
                (<div>
                    <Description DescriptionText={description}></Description>
                    <YoutubeEmbed embedId={videoId}> </YoutubeEmbed>
                </div>)}
        </div>
    );
}

export default LearningMaterials;