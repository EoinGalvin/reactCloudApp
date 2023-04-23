import json
from googleapiclient.discovery import build

api_key = "Hidden"

def respond(res):
    return {
        'statusCode': '200',
        'body': json.dumps(res),
        'headers': {
            'Access-Control-Allow-Headers': 'Content-Type,X-Amz-Date,Authorization,X-Api-Key,X-Amz-Security-Token',
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Credentials' : 'true',
            'Content-Type': 'application/json',
        },
    }
    

def lambda_handler(event, context):
   
   youtube = build('youtube','v3',developerKey=api_key)
   body = json.loads(event["body"])
   query = body['name'] + " tutorial"
   
   request = youtube.search().list(part="snippet",maxResults = 1,type = 'video' ,q = query)
   response = request.execute()
   
   videoId = response['items'][0]['id']['videoId']
   videoURL = "https://www.youtube.com/watch?v=" + videoId
   videoName = response['items'][0]['snippet']['title']

   return respond({
        "videoId": videoId,
        "videoURL":  videoURL,
        "videoName" : videoName
    })
  
   return respond(response)