import Youtube from 'react-youtube';
import Description from "./Description";
import { useState, useEffect } from "react";
import Axios from 'axios';

const API_URL_YOUTUBE = "https://52qgbt9ol7.execute-api.us-east-1.amazonaws.com/default/getYoutubeResponse";
const API_URL_GPT3 = "https://52qgbt9ol7.execute-api.us-east-1.amazonaws.com/default/getGPTdata";
const API_URL_DynamoDB = "https://52qgbt9ol7.execute-api.us-east-1.amazonaws.com/default/addLearningsToDynamo";

function LearningMaterials(props) {
    const [videoId, setVideoId] = useState(undefined);
    const [description, setDescription] = useState(undefined);
    const[learningId, setLearningId] = useState(undefined);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        if(props.query){
            setIsLoading(true);
            setDescription(undefined);
            setVideoId(undefined);
            getYoutubeVideo();
            getGPTdesc();
        }
    }, [props.query]);

    useEffect(() => {
        if(typeof videoId !== "undefined" && typeof description !== "undefined"){
            setIsLoading(false)
            let videoUrl = "https://www.youtube.com/watch?v=" + videoId;
            storeLearningData(videoUrl);
        }    
    },[videoId,description]);

    function getYoutubeVideo() {
        Axios.post(API_URL_YOUTUBE, { name: props.query }).then(res => {
            let videoId = res.data.videoId
            setVideoId(videoId);
        })
    }

    function getGPTdesc() {
        Axios.post(API_URL_GPT3, {query:props.query}).then(res => {
            setDescription(res.data)
        })
    }

    function storeLearningData(videoUrl){
        Axios.post(API_URL_DynamoDB, {Description: description, YoutubeURL: videoUrl, userId: props.username},{headers: {'x-api-key': 'bMACtU7bae8lMcEIzk5KY9XF5bQKFBtI25dPRrXB'}}).then(res => {
            setLearningId(res.data)
        })
    }
    return (
        <div>
            {isLoading ? (
                <span>Fetching Results for {props.username}</span>
            ) :
                (<div>
                    <Description DescriptionText={description}></Description>
                    <Youtube videoId = {videoId} opts = {{width: '320',height: '180'}}/>
                </div>)}
        </div>
    );
}
export default LearningMaterials;