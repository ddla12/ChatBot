/**
 * Answer constructor, answer returns a reply by an input
 * @class
 */
export default class Answer {
    constructor(data) {
        ({
            input: this.input,
            reply: this.reply,
        } = data);
    }
}
