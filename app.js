document.addEventListener("DOMContentLoaded", function () {
    /**
     * @description A function to pause pipboy animation gif.
     *
     * It displays last frame (inside a pseudo selector) of gif animation to create effect of pausing the animation.
     */
    const setTimerforpipboy = () => {
        setTimeout(() => {
            document.querySelector('.pipboy-img-container').classList.add('show');
        }, 1200);
    };
    const bootloadEntries = document.querySelectorAll('.bootload-entry');
    document.body.style.overflow = "hidden";
    [...bootloadEntries].map((bootloadEntry,index)=>{
        setTimeout(() => {
            bootloadEntry.classList.toggle('hide');
            const specStatus = bootloadEntry.querySelector('.bootload-spec-status');
            if(specStatus) {
                setTimeout(() => {
                    specStatus.classList.toggle('hide');
                }, 200);
            }
            bootloadEntry.scrollIntoView();
        },130*index);
    });
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
});