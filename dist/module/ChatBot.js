import Reply from "./Reply";
/**
 * ChatBot main class
 * @class
 */
export default class ChatBot {
    constructor(options) {
        this.answers = [];
        (options) && ({
            delay: this.delay,
            errors: this.errors,
            answerPrefix: this.answerPrefix,
        } = options);
        Object.seal(this);
    }
    /**
     * Set a reply to an input
     * @param input
     */
    to(input) {
        return Reply(input, this);
    }
    /**
     * Get a reply in async way
     * @param answer
     * @returns The answer with/without its delay
     */
    async resolveAnswer(answer) {
        return new Promise((res) => {
            setTimeout(() => {
                res({
                    state: "success",
                    message: (typeof answer.reply == "string")
                        ? answer.reply
                        : answer.reply()
                });
            }, this.delay);
        });
    }
    /**
     * Find an Answer instance by an input
     * @param input
     * @returns The right Answer element
     */
    findAnswerByInput(input) {
        input = input.replace(this.answerPrefix || "", "");
        return this.answers.find((answer) => {
            return (typeof answer.input == "string")
                ? (answer.input === input)
                : ((answer.input instanceof Array)
                    ? answer.input.includes(input)
                    : answer.input.test(input));
        });
    }
    /**
     * Get value of a source and look a proper answer to it
     * @param input
     * @returns A reply
     */
    async readInput(input) {
        if ((this.answerPrefix) && (!input.startsWith(this.answerPrefix))) {
            return {
                state: "error",
                message: this.errors?.onBadPrefix || "Bad prefix"
            };
        }
        const answer = this.findAnswerByInput(input);
        return (!answer)
            ? {
                state: "error",
                message: this.errors?.onUnknow || "Unknow input"
            }
            : await this.resolveAnswer(answer);
    }
}
