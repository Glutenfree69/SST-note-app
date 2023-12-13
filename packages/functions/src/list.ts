import { Table } from "sst/node/table";
import handler from "@notes/core/handler";
import dynamoDb from "@notes/core/dynamodb";

export const main = handler(async (event) => {
    const params = {
        TableName: Table.Notes.tableName,
        // 'KeyConditionExpression' définit la condition pour la requête
        // - 'userId = :userId': retourne uniquement les éléments avec le 'userId' correspondant
        KeyConditionExpression: "userId = :userId",
        // 'ExpressionAttributeValues' définit la valeur dans la condition
        // - ':userId': définit 'userId' comme étant l'ID de l'auteur
        ExpressionAttributeValues: {
            ":userId": "123",
        },
    };

    const result = await dynamoDb.query(params);

    // Retourner la liste correspondante d'éléments dans le corps de la réponse
    return JSON.stringify(result.Items);
});
