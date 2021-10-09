import ChatBot from "./ChatBot";

//To CDN
Object.defineProperty(window, "ChatBot", { value: ChatBot });

//Module
export default ChatBot;