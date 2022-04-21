import Dexie from "dexie";
import { populateDb } from "./populateDb";

export const db = new Dexie("chefMinute");

db.version(3).stores({
    recipe: "++id, name"
});

db.on("populate", populateDb);

/*
    recipe {
        id: UUID,
        name: string,
        description: string,
        rating: float,
        dificulty: string,
        timeToPrepare: integer,
        photoUrl: string,
        isFavorite: boolean,
        ingredients: string/array/text,
        directions: string/text
    }
*/
