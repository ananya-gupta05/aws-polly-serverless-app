import boto3
import base64
import json

polly = boto3.client('polly')

def lambda_handler(event, context):
    try:
        body = json.loads(event.get('body', '{}'))
        text = body.get('text', '').strip()

        if not text:
            return {
                "statusCode": 400,
                "headers": {
                    "Access-Control-Allow-Origin": "*"
                },
                "body": "Text input is empty"
            }

        response = polly.synthesize_speech(
            Text=text,
            OutputFormat='mp3',
            VoiceId='Aditi'
        )

        audio_stream = response['AudioStream'].read()

        encoded_audio = base64.b64encode(audio_stream).decode('utf-8')

        return {
            "statusCode": 200,
            "headers": {
                "Content-Type": "audio/mpeg",
                "Access-Control-Allow-Origin": "*"
            },
            "body": encoded_audio,
            "isBase64Encoded": True
        }

    except Exception as e:
        return {
            "statusCode": 500,
            "headers": {
                "Access-Control-Allow-Origin": "*"
            },
            "body": str(e)
        }