const $form = document.querySelector("form"),
    $input  = document.querySelector("input[type='text']"),
    $box    = document.querySelector("div");

const Bot = new ChatBot();

Bot.to("greet").replyWith("Hello there!");

$form.addEventListener("submit", async(e) => {
    e.preventDefault();

    await Bot.readInput($input.value).then((response) => console.log(response.message));
});
