import { AnswerConstructor, Input, Reply } from "./@types";

/**
 * Answer constructor, answer returns a reply by an input
 * @class
 */
export default class Answer {
    readonly input  : Input;
    reply   : Reply;

    constructor(data: AnswerConstructor) {
        ({ 
            input: this.input, 
            reply: this.reply, 
        } = data);
    }
}