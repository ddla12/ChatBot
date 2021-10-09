import { Bot, AnswerResponse, Input, BotOptions, ErrorMessages } from "./@types";
import Answer from "./Answer";
/**
 * ChatBot main class
 * @class
 */
export default class ChatBot implements Bot {
    answers: Answer[];
    errors?: ErrorMessages;
    delay?: number;
    answerPrefix?: string;
    constructor(options?: BotOptions);
    /**
     * Set a reply to an input
     * @param input
     */
    to(input: Input): {
        replyWith(reply: string): void;
        chooseReply(options: string[]): void;
        chanceOfReply(options: [string, number][]): void;
        fetchReply(callback: () => Promise<string>): Promise<void>;
    };
    /**
     * Get a reply in async way
     * @param answer
     * @returns The answer with/without its delay
     */
    resolveAnswer(answer: Answer): Promise<AnswerResponse>;
    /**
     * Find an Answer instance by an input
     * @param input
     * @returns The right Answer element
     */
    findAnswerByInput(input: string): Answer | undefined;
    /**
     * Get value of a source and look a proper answer to it
     * @param input
     * @returns A reply
     */
    readInput(input: string): Promise<AnswerResponse>;
}
