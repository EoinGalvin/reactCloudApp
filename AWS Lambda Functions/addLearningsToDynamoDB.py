import json
import boto3
import uuid

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
    
    client_dynamo = boto3.resource('dynamodb')
    table = client_dynamo.Table('LearningInfo')
    try:
        body = json.loads(event["body"])
        desc = body['Description']
        url = body['YoutubeURL']
        userId = body['userId']
        uniqueId = str(uuid.uuid4())

        
        item1 = {
                "LearningId": uniqueId,
                "Description": desc,
                "YoutubeURL": url,
                "userId" : userId
                }

        response = table.put_item(Item=item1)

        return respond("Data stored in DB for user : " + userId )
    except:
        raise
