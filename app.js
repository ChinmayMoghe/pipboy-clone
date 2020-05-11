document.addEventListener("DOMContentLoaded", function () {
    /**
     * @description A function to pause pipboy animation gif.
     *
     * It displays last frame (inside a pseudo selector) of gif animation to create effect of pausing the animation.
     */
    const setTimerforpipboy = () => {
        setTimeout(() => {
            const pipboyAnimatedImg = document.querySelector('.pipboy-success');
            document.querySelector('.pipboy-img-container').classList.add('show');
            // set the animation end state for step 3 here
        }, 1200);
    };
    //get bootloader entries to remove class hide - display individual boot entry
    const bootloadEntries = document.querySelectorAll('.bootload-entry');
    console.log(bootloadEntries);
    [...bootloadEntries].map((bootloadEntry, index,arr) => {
        console.log(arr);
        setTimeout(() => {
            bootloadEntry.classList.toggle('hide');
            const specStatus = bootloadEntry.querySelector('.bootload-spec-status');
            if (specStatus) {
                setTimeout(() => {
                    specStatus.classList.toggle('hide');
                }, 140);
            }
            if(bootloadEntry === arr[arr.length - 1]) {
                // set the end status for the step 1 animation here..
                console.log("Bruh !! stop this madness");
            }
            bootloadEntry.scrollIntoView();
        }, 150 * index);
    });
    // loading images for pipboy loading screen
    const pipboyImage = new Image();
    const pipboyPauseImg = new Image();
    pipboyImage.onload = function () {
        console.log("Loaded animated image");
        setTimerforpipboy();
    };
    pipboyPauseImg.onload = function () {
        console.log("Loaded pause image");
    }
    pipboyImage.src = "images/pip-boy-sucess-animate.gif";
    pipboyPauseImg.src = "images/pipboy-success-pause.gif";

    // using animationend event listener to mark end of animation
    const targetNode = document.querySelector(".os-load-rom");
    const animationEnd = ()=> {
        // set the end state of animation for step 2 here...
        console.log("bruh !! Animation ended");
    }
    targetNode.addEventListener("animationend",animationEnd,false);
});