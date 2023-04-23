import json
import openai

openai.api_key = "Hidden"

model = "gpt-3.5-turbo"

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
   query = body['query']
   
   conversation = [{'role': 'system', 'content': "Give me an overview of "+query}]
   response = openai.ChatCompletion.create(model=model, messages=conversation)
   
   choices = response["choices"][0]["message"]["content"]

   return respond(choices)
