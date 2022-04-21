import Dexie from "dexie";

export const db = new Dexie("chefMinute");

db.version(2).stores({
    recipe: "++id, name, userEmail"
});

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
        directions: string/text,
        userEmail: string
    }
*/
