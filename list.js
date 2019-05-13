/***
 * Author: Aayush Shah
 * List all the file names that are in S3 Bucket
 */
import AWS from "aws-sdk"
const s3 = new AWS.S3()

// Main handler function to list files
export async function main(event, context, callback) {
    const listFiles = () => {
        return new Promise((resolve, reject) => {
            // Parameters required to fetch Object
            const params = {
                Bucket: 'dd-cloudassessment',
            }
            // Invoke the listObjectV2 method for S3
            s3.listObjectsV2(params, (err, data) => {
                // If error occurs send error message
                if (err) {
                    const response = {
                        body: JSON.stringify({ 'ErrorMessage': 'Error while fetching list of files' })
                    }
                    callback(null, response)
                    return
                }
                // Filter response with file names only
                const fileList = data.Contents.map(data => {
                    if (!data.Key.endsWith("/")) {
                        return data.Key
                    }
                })

                const response = {
                    body: JSON.stringify({ "FileList": fileList.filter(data => data) })
                }
                return callback(null, response)
            });
        });
    };

    // Call async function list files
    await listFiles()
}
