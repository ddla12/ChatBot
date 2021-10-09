import Chatbot from "../src/index";

describe("Chatbot", () => {
    const Bot = new Chatbot({
        errors: {
            onUnknow: "I don't know what are you trying to say",
            onBadPrefix: "Invalid prefix!"
        },
        answerPrefix: "./"
    });

    describe("to() parameter is a string", () => {
        Bot.to("greet").replyWith("Hello world");
        Bot.to("language").chooseReply(["Spanish", "English"]);
        Bot.to("name").chanceOfReply([["Darud", 0.5], ["Lingilien", 0.75]]);

        test("Prefix is required", () => {
            return Bot.readInput("greet").then((answer) => {
                expect(answer.message).toStrictEqual("Invalid prefix!");
            });
        });

        test("greet returns 'Hello world'", () => {
            return Bot.readInput("./greet").then((answer) => {
                expect(answer.message).toStrictEqual("Hello world");
            });
        });

        test("language can return either 'Spanish' or 'English'", () => {
            return Bot.readInput("./language").then((answer) => {
                expect(["Spanish", "English"].includes(answer.message)).toBeTruthy();
            });
        });

        test("More chance to get 'Lingilien' when 'name' is readed", () => {
            const arr = [
                Bot.readInput("./name").then((answer) => answer.message),
                Bot.readInput("./name").then((answer) => answer.message),
                Bot.readInput("./name").then((answer) => answer.message),
                Bot.readInput("./name").then((answer) => answer.message),
                Bot.readInput("./name").then((answer) => answer.message),
            ];

            Promise.all(arr).then((answers) => {
                expect(answers.filter((a) => a === "Lingilien").length)
                    .toBeGreaterThan(answers.filter((a) => a === "Darud").length);
            })
        });
    });

    describe("to() parameter is a regexp" , () => {
        Bot.to(/^greet(\s+me)?$/).replyWith("Hello world");

        test("Responds to multiple variations", () => {
            const arr = [
                Bot.readInput("./greet").then((answer) => answer.message),
                Bot.readInput("./greet me").then((answer) => answer.message),
            ];

            Promise.all(arr).then((answers) => {
                expect(answers.every((a) => a === "Hello world")).toBeTruthy();
            });
        });
    });

    describe("to() is an string[]", () => {
        Bot.to(["greet", "greet me", "greetings"]).replyWith("Hello world");

        test("Responds either to 'greet' or 'greet me' or 'greetings'", () => {
            const arr = [
                Bot.readInput("./greet").then((answer) => answer.message),
                Bot.readInput("./greet me").then((answer) => answer.message),
                Bot.readInput("./greetings").then((answer) => answer.message),
            ];

            
            Promise.all(arr).then((answers) => {
                expect(answers.every((a) => a === "Hello world")).toBeTruthy();
            });
        });
    });
});