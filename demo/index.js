const $form     = document.querySelector("form"),
    $input      = document.querySelector("input[type='text']"),
    $messages   = document.querySelector("#messages"),
    $submit     = document.querySelector("button");

const drawReply = (from, message, state = undefined) => {
    $messages.innerHTML += `
        <span class="${(from == "user") ? 'user' : `bot ${state}`}">
            <small>From: <strong>${from}</strong></small>
            <em>${message}</em>
        </span>
    `;

    $messages.scrollTop = $messages.scrollHeight;
};

const disabled = (value) => {
    [$input.disabled, $submit.disabled ] = Array(2).fill(value);
};

const Bot = new ChatBot({
    delay: 1500,
    answerPrefix: "./"
});

Bot.to(["greet", "greet me"]).replyWith("Hello there!");
Bot.to(["version", "chatbot info", "info"]).replyWith("Chatbot v1.0.0");
Bot.to("author").chooseReply(["Darud Lingilien", "ddla12", "Some guy of Venezuela"]);

$form.addEventListener("submit", async(e) => {
    e.preventDefault();

    disabled(true);

    document.querySelector("p").style.display = "block";

    drawReply('user', $input.value);

    await Bot.readInput($input.value).then((response) => drawReply('bot', response.message, response.state));

    disabled(false);

    document.querySelector("p").style.display = "none";

    $form.reset();
});
