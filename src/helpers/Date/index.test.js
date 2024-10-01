import { getMonth } from "./index";

describe("Date helper", () => {
    describe("When getMonth is called", () => {
        it("the function return janvier for 2022-01-01 as date", () => {
            const date = new Date(`2022-01-01`); // je crée une constante date où je stocke la date à tester
            const result = getMonth(date); // je passe ma constante date à la fonction getMonth et je stocke le résultat dans une fonction result
            expect(result).toBe(`janvier`) // je vérifie que result est égal à janvier
        });
        it("the function return juillet for 2022-07-08 as date", () => {
            const date = new Date(`2022-07-01`);
            const result = getMonth(date);
            expect(result).toBe(`juillet`)
        });
    });
})

