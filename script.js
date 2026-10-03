/* =========================================
   ELEMENTS
========================================= */

const scenes = document.querySelectorAll(".scene");

const enterButton =
    document.getElementById("enterButton");

const messageNext =
    document.getElementById("messageNext");

const wishButton =
    document.getElementById("wishButton");

const releaseWish =
    document.getElementById("releaseWish");

const finalButton =
    document.getElementById("finalButton");

const replayButton =
    document.getElementById("replayButton");

const music =
    document.getElementById("music");

const musicButton =
    document.getElementById("musicButton");

const musicText =
    document.getElementById("musicText");

const cursorGlow =
    document.querySelector(".cursor-glow");

const starMessage =
    document.getElementById("starMessage");

const starMessageText =
    document.getElementById("starMessageText");

const continueStars =
    document.getElementById("continueStars");

const wishOrb =
    document.getElementById("wishOrb");

const wishResult =
    document.getElementById("wishResult");

const screenFlash =
    document.getElementById("screenFlash");


/* =========================================
   SCENE SYSTEM
========================================= */

let currentScene = 0;

function showScene(index) {

    if (index < 0 || index >= scenes.length) {
        return;
    }

    scenes.forEach((scene, i) => {

        scene.classList.toggle(
            "active",
            i === index
        );

    });

    currentScene = index;

    flashScreen();
}


/* =========================================
   SCREEN TRANSITION
========================================= */

function flashScreen() {

    screenFlash.classList.add("flash");

    setTimeout(() => {

        screenFlash.classList.remove("flash");

    }, 400);
}


/* =========================================
   ENTER EXPERIENCE
========================================= */

enterButton.addEventListener("click", async () => {

    await startMusic();

    showScene(1);

});


/* =========================================
   MESSAGE SCREEN
========================================= */

messageNext.addEventListener("click", () => {

    showScene(3);

});


/* =========================================
   MUSIC
========================================= */

let musicPlaying = false;

async function startMusic() {
    try {
        music.volume = 0;
        await music.play();

        let volume = 0;

        const fadeIn = setInterval(() => {
            volume = Math.min(volume + 0.02, 0.35);
            music.volume = volume;

            if (volume >= 0.35) {
                clearInterval(fadeIn);
            }
        }, 100);

        musicPlaying = true;
        musicText.textContent = "pause";
    } catch (error) {
        console.log("Music playback unavailable.");
    }
}


musicButton.addEventListener("click", async () => {

    if (musicPlaying) {

        music.pause();

        musicPlaying = false;

        musicText.textContent =
            "music";

    } else {

        await startMusic();

    }

});


/* =========================================
   CONSTELLATION
========================================= */

const stars =
    document.querySelectorAll(".star-point");

let discoveredStars = new Set();


stars.forEach((star, index) => {

    star.addEventListener("click", () => {

        const message =
            star.dataset.message;

        starMessageText.textContent =
            message;

        starMessage.classList.add("show");

        discoveredStars.add(index);

        /*
            Small visual feedback
        */

        star.style.transform =
            "scale(1.8)";

        setTimeout(() => {

            star.style.transform =
                "scale(1)";

        }, 500);


        /*
            If all stars were found
        */

        if (
            discoveredStars.size ===
            stars.length
        ) {

            setTimeout(() => {

                continueStars.classList.remove(
                    "hidden"
                );

            }, 700);

        }

    });

});


/* Continue after constellation */

continueStars.addEventListener("click", () => {

    showScene(2);

});


/* =========================================
   BIRTHDAY → WISH
========================================= */

wishButton.addEventListener("click", () => {

    showScene(4);

});


/* =========================================
   WISH
========================================= */

let wishReleased = false;

releaseWish.addEventListener("click", () => {

    if (wishReleased) {
        return;
    }

    wishReleased = true;

    wishOrb.classList.add("released");

    wishResult.textContent =
        "Whatever it is... I hope it finds its way to you. ♡";

    releaseWish.textContent =
        "your wish is out there ✦";

    releaseWish.style.opacity =
        ".6";

    releaseWish.style.pointerEvents =
        "none";

    createWishStars();

    setTimeout(() => {

        finalButton.classList.remove(
            "hidden"
        );

    }, 1800);

});


/* =========================================
   WISH PARTICLES
========================================= */

function createWishStars() {

    for (let i = 0; i < 25; i++) {

        const star =
            document.createElement("div");

        star.textContent =
            Math.random() > .5
                ? "✦"
                : "·";

        star.style.position =
            "fixed";

        star.style.left =
            "50%";

        star.style.top =
            "50%";

        star.style.color =
            "#aaa0ff";

        star.style.pointerEvents =
            "none";

        star.style.zIndex =
            "20";

        star.style.fontSize =
            `${8 + Math.random() * 14}px`;

        document.body.appendChild(star);


        const angle =
            Math.random() *
            Math.PI *
            2;

        const distance =
            100 +
            Math.random() *
            350;

        const x =
            Math.cos(angle) *
            distance;

        const y =
            Math.sin(angle) *
            distance;


        star.animate(

            [
                {
                    transform:
                        "translate(-50%, -50%) scale(0)",

                    opacity: 0
                },

                {
                    transform:
                        "translate(-50%, -50%) scale(1)",

                    opacity: 1
                },

                {
                    transform:
                        `translate(
                            calc(-50% + ${x}px),
                            calc(-50% + ${y}px)
                        )
                        scale(.3)`,

                    opacity: 0
                }
            ],

            {
                duration:
                    1600 +
                    Math.random() * 1000,

                easing:
                    "cubic-bezier(.2,.8,.2,1)"
            }

        );

        setTimeout(() => {

            star.remove();

        }, 3000);

    }

}


/* =========================================
   FINAL SCREEN
========================================= */

finalButton.addEventListener("click", () => {

    showScene(5);

});


/* =========================================
   REPLAY
========================================= */

replayButton.addEventListener("click", () => {

    discoveredStars.clear();

    stars.forEach(star => {

        star.style.transform =
            "scale(1)";

    });

    starMessage.classList.remove(
        "show"
    );

    continueStars.classList.add(
        "hidden"
    );


    wishReleased = false;

    wishOrb.classList.remove(
        "released"
    );

    wishResult.textContent = "";

    releaseWish.textContent =
        "let it go ✦";

    releaseWish.style.opacity =
        "1";

    releaseWish.style.pointerEvents =
        "auto";


    finalButton.classList.add(
        "hidden"
    );


    showScene(0);

});


/* =========================================
   CURSOR LIGHT
========================================= */

document.addEventListener("mousemove", (event) => {

    cursorGlow.style.left =
        `${event.clientX}px`;

    cursorGlow.style.top =
        `${event.clientY}px`;

});


/* =========================================
   STARFIELD
========================================= */

const canvas =
    document.getElementById(
        "starCanvas"
    );

const ctx =
    canvas.getContext("2d");

let starsBackground = [];

function resizeCanvas() {

    canvas.width =
        window.innerWidth;

    canvas.height =
        window.innerHeight;

    createBackgroundStars();

}


function createBackgroundStars() {

    starsBackground = [];

    const amount =
        Math.min(
            180,
            Math.floor(
                window.innerWidth *
                window.innerHeight /
                7000
            )
        );


    for (let i = 0; i < amount; i++) {

        starsBackground.push({

            x:
                Math.random() *
                canvas.width,

            y:
                Math.random() *
                canvas.height,

            radius:
                Math.random() *
                1.3 +
                .2,

            alpha:
                Math.random() *
                .7 +
                .2,

            speed:
                Math.random() *
                .02 +
                .005,

            phase:
                Math.random() *
                Math.PI *
                2

        });

    }

}


function drawStars(time) {

    ctx.clearRect(
        0,
        0,
        canvas.width,
        canvas.height
    );


    starsBackground.forEach(star => {

        const twinkle =
            Math.sin(
                time *
                star.speed +
                star.phase
            ) *
            .35;


        const alpha =
            Math.max(
                .05,
                star.alpha + twinkle
            );


        ctx.beginPath();

        ctx.arc(
            star.x,
            star.y,
            star.radius,
            0,
            Math.PI * 2
        );

        ctx.fillStyle =
            `rgba(
                220,
                218,
                255,
                ${alpha}
            )`;

        ctx.fill();

    });


    requestAnimationFrame(drawStars);

}


window.addEventListener(
    "resize",
    resizeCanvas
);

resizeCanvas();

requestAnimationFrame(
    drawStars
);


/* =========================================
   KEYBOARD SUPPORT
========================================= */

document.addEventListener(
    "keydown",
    event => {

        if (
            event.key === "Enter" &&
            currentScene === 0
        ) {

            enterButton.click();

        }

    }
);