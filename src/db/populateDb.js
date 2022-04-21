import { db } from "./indexedDb";

export async function populateDb() {
    await db.recipe.bulkAdd([
        {
            name: "Burger Example",
            description: "This is a recipe sample",
            dificulty: "medium",
            rating: 4.9,
            timeToPrepare: 48,
            isFavorite: true,
            photoUrl:
                "https://images.unsplash.com/photo-1565299507177-b0ac66763828?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=722&q=80",
            ingredients: [
                "500g of ground lean beef",
                "1 large egg",
                "1/2 cup minced onion",
                "1/4 cup fine dried bread crumbs",
                "1 tablespoon of butter",
                "1 or 2 cloves garlic, peeled and minced",
                "1/2 teaspoon salt",
                "1/4 teaspoon pepper",
                "4 hamburger buns",
                "1 firm-ripe tomato sliced",
                "4 thin slices red onion"
            ],
            directions: [
                "In a bowl, mix ground beef, egg, onion, bread crumbs, Worcestershire, garlic, 1/2 teaspoon salt, and 1/4 teaspoon pepper until well blended. Divide mixture into four equal portions and shape each into a patty about 4 inches wide.",
                "Lay burgers on an oiled barbecue grill over a solid bed of hot coals or high heat on a gas grill (you can hold your hand at grill level only 2 to 3 seconds); close lid on gas grill. Cook burgers, turning once, until browned on both sides and no longer pink inside (cut to test), 7 to 8 minutes total. Remove from grill.",
                "Lay buns, cut side down, on grill and cook until lightly toasted, 30 seconds to 1 minute.",
                "Spread mayonnaise and ketchup on bun bottoms. Add lettuce, tomato, burger, onion, and salt and pepper to taste. Set bun tops in place."
            ]
        },
        {
            name: "Pizza Example",
            description: "This is another recipe sample",
            dificulty: "medium",
            rating: 4.7,
            timeToPrepare: 75,
            isFavorite: false,
            photoUrl:
                "https://images.unsplash.com/photo-1604382354936-07c5d9983bd3?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
            ingredients: [
                "1/2 cups (355 ml) warm water",
                "1 package (2 1/4 teaspoons) active dry yeast",
                "3 3/4 cups (490 g) bread flour",
                "2 tablespoons extra virgin olive oil (omit if cooking pizza in a wood-fired pizza oven)",
                "2 teaspoons salt",
                "1 teaspoon sugar",
                "Tomato sauce (smooth or pureed)",
                "Fresh soft mozzarella cheese, separated into small clumps",
                "Italian pepperoncini, thinly sliced",
                "Sliced black olives",
                "Onions, thinly sliced raw or caramelized",
                "Ham, thinly sliced"
            ],
            directions: [
                "Place the warm water in the large bowl of a heavy duty stand mixer. Sprinkle the yeast over the warm water and let it sit for 5 minutes until the yeast is dissolved. // After 5 minutes stir if the yeast hasn't dissolved completely. The yeast should begin to foam or bloom, indicating that the yeast is still active and alive.",
                "etc etc etc",
                "Use your fingertips to press down and make dents along the surface of the dough to prevent bubbling. Brush the top of the dough with olive oil (to prevent it from getting soggy from the toppings). Let rest another 10-15 minutes.",
                "etc etc etc",
                "Spoon on the tomato sauce, sprinkle with cheese, and place your desired toppings on the pizza. Be careful not to overload the pizza with too many toppings, or your pizza will be soggy.",
                "Bake pizza in the 240°C oven, one at a time, until the crust is browned and the cheese is golden, about 10-15 minutes. If you want, toward the end of the cooking time you can sprinkle on a little more cheese."
            ]
        }
    ]);
}
