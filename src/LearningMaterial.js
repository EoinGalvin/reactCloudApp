import YoutubeEmbed from "./YoutubeEmbed";
import Description from "./Description";
import { useState, useEffect } from "react";
import Axios from 'axios';
const API_URL_YOUTUBE = "https://1vqfhabk0j.execute-api.us-east-1.amazonaws.com/default/lambdapythoneoin1";
const API_URL_GPT3 = "https://1vqfhabk0j.execute-api.us-east-1.amazonaws.com/default/openAIgpt3_5_Turbo";
const API_URL_DynamoDB = "https://1vqfhabk0j.execute-api.us-east-1.amazonaws.com/default/dynamoLearningInfo";
const API_URL_LOOKUP = "https://1vqfhabk0j.execute-api.us-east-1.amazonaws.com/default/linkCognitoToLearnings";

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
        Axios.post(API_URL_DynamoDB, {Description: description, YoutubeURL: videoUrl, userId: props.username},{headers: {'x-api-key': 'qeg9dL1EZg8w7NgUrhs623oLpbuI0nzI5jL5YETC'}}).then(res => {
            setLearningId(res.data)
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
                <span>Fetching Results for {props.username}</span>
            ) :
                (<div>
                    <Description DescriptionText={description}></Description>
                    <YoutubeEmbed embedId={videoId}> </YoutubeEmbed>
                </div>)}
        </div>
    );
}
export default LearningMaterials;