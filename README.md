Chatbot
=======

A library to make simple chatbots faster

 ```javascript
 const Bot = new ChatBot();

 Bot.to("greet").replyWith("Hello there!");

 Bot.readInput("greet").then(console.log);
 ```

Get started
===========

Via CDN:

```html
<script src="https://cdn.jsdelivr.net/npm/@darudlingilien/chatbot@1.0.0/cdn/chatbot.min.js"></script>
```

Via NPM:

```node
npm install @darudlingilien/chatbot
```

Documentation
=============

To create a chatbot you just need to create an instance of the ``ChatBot`` class, you can pass some **options** if you want:

```javascript
const Bot = new ChatBot({
    //Time to resolve replies
    delay: 1000,
    //All inputs must begin with this
    answerPrefix: "./", 
    //Error messages
    errors: {
        onUnknow: "Unknow input",
        onBadPrefix: "Invalid input prefix",
    }
});
```

## *to()*

``to(input: Input)``

To set some answers to your bot, you must call the ``to()`` method:

```javascript
Bot.to("greet")
```

``to()`` method returns the ``Reply`` object, with which you can set the **reply** *(or replies)* that you want to receive

```javascript
Bot.to("greet").replyWith("Hello world");
```

``to()`` method accepts ``string, RegExp`` and ``string[]``

```javascript
Bot.to("greet").replyWith("Hello world");
Bot.to(/^greet$/).replyWith("Hello world");
Bot.to(["greet", "greet me"]).replyWith("Hello world");
```

## Reply

Reply object has 4 methods:

1. *``replyWith(expr: string)``* -> set a basic reply
```javascript
Bot.to("greet").replyWith("Hello world");
```
2. *``fetchReply(callback: () => Promise<string>)``* -> Get a reply for a remote source
```javascript
Bot.to("greet").fetchReply(async() => {
    return await fetch("source")
        .then((response) => response.json())
        .then((reply) => reply);
});
```
3. *``chooseReply(replies: string[])``* -> Choose a random reply from an array (on each response reply is random)
```javascript
Bot.to("greet").chooseReply(["Hello world", "How are you?"]);
```
4. *``chanceOfReply(replies: [string, number][])``* Choose a replie by chance 
```javascript
Bot.to("greet").chooseReply([["Hello world", 0.6], ["How are you?", 0.5]]);
```

## readInput()

``readInput(expr: string)``

Read an string from a source, and try to resolve a proper reply to it. It returns a ``Promise<AnswerResponse>``

```javascript
Bot.readInput("greet").then(console.log);
```

``AnswerResponse`` interface:

```javascript
interface AnswerResponse {
    message: string,
    state: "error"|"success"
}
```

Contributing
============

Chatbot is actually really simple, we'll keep it updated with new features of course, if you wanna contribute...

1. Clone this repo locally
2. ``npm install``
3. Code...
4. ``npm run test``
5. Make a pull request

### **Do not commit directly to the main branch!**