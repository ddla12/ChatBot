import Answer from "./Answer";

export type Input = string|RegExp|string[];

export type Reply = string|(() => string);

export type AnswerState = "error"|"success";

export interface AnswerConstructor {
    readonly input  : Input,
    readonly reply : Reply,
}

export interface ErrorMessages {
    onUnknow?   : string,
    onBadPrefix?: string,
}

export interface AnswerResponse {
    message : string,
    state   : AnswerState,
}

export interface BotOptions {
    delay?          : number,
    errors?         : ErrorMessages,
    answerPrefix?   : string,
}

export interface Bot extends BotOptions {
    answers: Answer[]
}