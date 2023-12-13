import { Context, APIGatewayProxyEvent } from "aws-lambda";

export default function handler(
    lambda: (evt: APIGatewayProxyEvent, context: Context) => Promise<string>
) {
    return async function (event: APIGatewayProxyEvent, context: Context) {
        let body, statusCode;

        try {
            // Exécution de la fonction Lambda
            body = await lambda(event, context);
            statusCode = 200;
        } catch (error) {
            statusCode = 500;
            body = JSON.stringify({
                error: error instanceof Error ? error.message : String(error),
            });
        }

        // Retourner la réponse HTTP
        return {
            body,
            statusCode,
        };
    };
}
