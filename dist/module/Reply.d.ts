import { Bot, Input } from "@types";
/**
 * Replies generator
 * @param input
 * @param bot
 */
declare const Reply: (input: Input, bot: Bot) => {
    /**
     * Reply a string
     * @param reply
     */
    replyWith(reply: string): void;
    /**
     * Choose a random replie by a given array
     * @param options
     */
    chooseReply(options: string[]): void;
    /**
     * Choose a random replie by chance
     * @param options
     */
    chanceOfReply(options: [string, number][]): void;
    /**
     * Get a reply from a remote source
     * @param callback
     */
    fetchReply(callback: () => Promise<string>): Promise<void>;
};
export default Reply;
