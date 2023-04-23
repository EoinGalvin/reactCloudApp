import json
import boto3
import ast

from boto3.dynamodb.conditions import Key, Attr

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
    body = json.loads(event["body"])
    userId = body['userId']

    client_dynamo = boto3.resource('dynamodb')
    table = client_dynamo.Table('CognitoLearningInfoLookup')
    
    response = table.query(
        IndexName = 'userId-index',
        KeyConditionExpression=Key('userId').eq(userId)
        )
    
    if response['Items']:
        learningIds = []
        for item in response['Items']:
            learningIds.append(item['learningId'])
        

        #learningsForUserJsonString = "{ 'values': ["
        
        previousLearningData = []
        
        for learningIdsFound in learningIds:
            table2 = client_dynamo.Table('LearningInfo')
            response2 = table2.get_item(Key={'LearningId': learningIdsFound})
            
            previousLearningData.append(response2['Item'])
        
        return respond(previousLearningData)
            #learningsForUserJsonString = learningsForUserJsonString + str(response2['Item'])
            #learningsForUserJsonString = learningsForUserJsonString + ","

        #learningsForUserJsonString = learningsForUserJsonString[:-1]
        #learningsForUserJsonString = learningsForUserJsonString + "]"
        #learningsForUserJsonString = learningsForUserJsonString + "}"
        
        #data_dict = ast.literal_eval(learningsForUserJsonString)
        #return respond(data_dict)
    else:
        return respond("No data");
        