import Answer from "./Answer";
/**
 * Functions to help Reply()
 * @constant
 */
const Helper = {
    /**
     * Select a random string from an array
     * @param array
     * @returns Random string
     */
    choose(array) {
        return array[~~(Math.random() * array.length)];
    },
    /**
     * Select a random string by chance
     * @param arr
     * @returns Random string by chance
     */
    chance(array) {
        const maxChance = array.find((el) => el[1] == 1);
        return maxChance[0] || this.choose(array.filter((e) => e[1] >= Math.random()).map((e) => e[0]));
    }
};
/**
 * Replies generator
 * @param input
 * @param bot
 */
const Reply = (input, bot) => ({
    /**
     * Reply a string
     * @param reply
     */
    replyWith(reply) {
        bot.answers = [
            ...bot.answers,
            new Answer({
                input: input,
                reply: reply
            })
        ];
    },
    /**
     * Choose a random replie by a given array
     * @param options
     */
    chooseReply(options) {
        bot.answers = [
            ...bot.answers,
            new Answer({
                input: input,
                reply: () => Helper.choose(options)
            })
        ];
    },
    /**
     * Choose a random replie by chance
     * @param options
     */
    chanceOfReply(options) {
        bot.answers = [
            ...bot.answers,
            new Answer({
                input: input,
                reply: () => Helper.chance(options)
            })
        ];
    },
    /**
     * Get a reply from a remote source
     * @param callback
     */
    async fetchReply(callback) {
        bot.answers = [
            ...bot.answers,
            new Answer({
                input: input,
                reply: await callback()
            })
        ];
    },
});
export default Reply;
