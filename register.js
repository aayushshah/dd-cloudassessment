/***
 * Author: Aayush Shah
 * Register user with valid email Id
 */
import AWS from "aws-sdk";

const dynamoDb = new AWS.DynamoDB.DocumentClient();

export function main(event, context, callback) {
    // function to check if email is valid or not
    // @param email     email id string
    // return boolean 
    function emailIsValid(email) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
    }
    
    // Request body is passed in as a JSON encoded string in 'event.body'
    const data = JSON.parse(event.body)

    const params = {
        TableName: "User",
        // 'Item' contains the attributes of the item to be created
        // - 'Email': Email Id of the user
        Item: {
            Email: data.Email
        }
    };

    dynamoDb.put(params, (error) => {
        // Return error message for invalid input
        if (!emailIsValid(params.Item.Email)) {
            const response = {
                body: JSON.stringify({"UserMessage": "Invalid Email ID. Please provide valid email ID"})
            }
            callback(null, response)
            return
        }

        // Return general error message if request fails
        if (error) {
            const response = {
                body: JSON.stringify({"ErrorMessage": "Error while registering user"})
            };
            callback(null, response)
            return
        }

        // Return success message
        const response = {
            body: JSON.stringify({"UserMessage": "User has been successfully registered"})
        };
        callback(null, response)
    });
}
