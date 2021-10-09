import { Bot, AnswerResponse, Input, BotOptions, ErrorMessages } from "./@types";
import Reply from "./Reply";
import Answer from "./Answer";

/**
 * ChatBot main class
 * @class
 */
export default class ChatBot implements Bot {
    answers         : Answer[] = [];
    errors?         : ErrorMessages;
    delay?          : number;
    answerPrefix?   : string;

    constructor(options?: BotOptions) {
        (options) && ({ 
            delay           : this.delay, 
            errors          : this.errors,
            answerPrefix    : this.answerPrefix,
        } = options);

        Object.seal(this);
    }

    /**
     * Set a reply to an input
     * @param input 
     */
    to(input: Input) {
        return Reply(input, this);
    }

    /**
     * Get a reply in async way
     * @param answer
     * @returns The answer with/without its delay
     */
    async resolveAnswer(answer: Answer): Promise<AnswerResponse> {
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
    findAnswerByInput(input: string): Answer|undefined {
        input = input.replace(this.answerPrefix || "", "");

        return this.answers!.find((answer) => {
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
    async readInput(input: string): Promise<AnswerResponse> {
        if((this.answerPrefix) && (!input.startsWith(this.answerPrefix))) {
            return { 
                state: "error",
                message: this.errors?.onBadPrefix || "Bad prefix"
            }
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