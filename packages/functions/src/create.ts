import * as uuid from "uuid";
import { Table } from "sst/node/table";
import handler from "@notes/core/handler";
import dynamoDb from "@notes/core/dynamodb";

export const main = handler(async (event) => {
    let data = {
        content: "",
        attachment: "",
    };

    if (event.body != null) {
        data = JSON.parse(event.body);
    }

    const params = {
        TableName: Table.Notes.tableName,
        Item: {
            // Les attributs de l'élément à créer
            userId: "123", // L'identifiant de l'auteur
            noteId: uuid.v1(), // Un uuid unique
            content: data.content, // Analysé à partir du corps de la requête
            attachment: data.attachment, // Analysé à partir du corps de la requête
            createdAt: Date.now(), // Timestamp Unix actuel
        },
    };

    await dynamoDb.put(params);

    return JSON.stringify(params.Item);
});
