import { Table } from "sst/node/table";
import handler from "@notes/core/handler";
import dynamoDb from "@notes/core/dynamodb";

export const main = handler(async (event) => {
    const params = {
        TableName: Table.Notes.tableName,
        // 'Key' définit la clé de partition et la clé de tri de l'élément à récupérer
        Key: {
            userId: "123", // L'ID de l'auteur
            noteId: event?.pathParameters?.id, // L'ID de la note à partir du chemin
        },
    };

    const result = await dynamoDb.get(params);
    if (!result.Item) {
        throw new Error("Item not found.");
    }

    // Retourner l'élément récupéré
    return JSON.stringify(result.Item);
});
