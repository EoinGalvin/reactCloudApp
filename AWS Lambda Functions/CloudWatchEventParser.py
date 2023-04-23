import json
import boto3
import uuid


def lambda_handler(event, context):
    
    print("EVENT HAS BEEN RECIEVED")
    print(event)
    
    eventName = event['Records'][0]['eventName']
    print(eventName)
    
    if eventName == "INSERT":
        client_dynamo = boto3.resource('dynamodb')
        table = client_dynamo.Table('CognitoLearningInfoLookup')
        try:
            newImage = event['Records'][0]['dynamodb']['NewImage']
            
            uniqueId = str(uuid.uuid4())
            userId = newImage['userId']['S']
            LearningId = newImage['LearningId']['S']
            
            print("userid : " + userId)
            print("LearningId : " + LearningId)
            
            item = {
            "linkId": uniqueId,
            "learningId": LearningId,
            "userId": userId,
            }
            
            response = table.put_item(Item=item)
            
            print(response)
            
        except:
            raise
    else:
        print("This is not an insert so no changes made")
        
    
    
    
    return {
        'statusCode': 200,
        'body': json.dumps('Hello from Lambda!')
    }
