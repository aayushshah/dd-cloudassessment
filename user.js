/***
 * Author: Aayush Shah
 * Send Email provided message as input by user 
 */
import AWS from "aws-sdk"

const ses = new AWS.SES()

export async function main(event, context, callback) {
    
    // Request body is passed in as a JSON encoded string in 'event.body'
    const data = JSON.parse(event.body)
    
    // Parameters required to send email
    const params = {
        Destination: {
            ToAddresses: ["aayushshah03@gmail.com"],
        },
        ConfigurationSetName: "dd-cloudassessment",
        Message: {
            Body: {
                Text: {
                    Charset: "UTF-8",
                    Data: data.Body
                }
            },
            Subject: {
                Charset: "UTF-8",
                Data: data.Subject
            }
        },
        Source: "viraj.padte@dataductus.com",
    };

    try {
        // Invoke the send email method using SES
        await ses.sendEmail(params).promise();

        // Return success message
        const response = {
            body: JSON.stringify({"UserMessage": "Email has been successfully sent."}),
        }
        callback(null, response)
    } catch (e) {
        console.log(e)
        // If error occured send error message
        const response = {
            body: JSON.stringify({"Error": "Error while sending the Email"})
        }
        callback(null, response)
        return
    }
}
