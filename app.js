document.addEventListener("DOMContentLoaded", function () {
    let sequenceProxy = {
        initiator: null,
        stepOne: null,
        stepTwo: null,
        stepThree: null
    }
    const sequencer = {
        initiator: () => {
            console.log("Kickstart");
            const stepZero = document.querySelector('.step-0');
            stepZero.classList.toggle('hide');
            sequenceProxy["initiator"] = true;
        },
        stepOne: () => {
            const stepOne = document.querySelector('.step-1');
            stepOne.classList.toggle("hide");
            //get bootloader entries to remove class hide - display individual boot entry
            const bootloadEntries = document.querySelectorAll('.bootload-entry');
            [...bootloadEntries].map((bootloadEntry, index, arr) => {
                setTimeout(() => {
                    bootloadEntry.classList.toggle('hide');
                    const specStatus = bootloadEntry.querySelector('.bootload-spec-status');
                    if (specStatus) {
                        setTimeout(() => {
                            specStatus.classList.toggle('hide');
                        }, 200);
                    }
                    if (bootloadEntry === arr[arr.length - 1]) {
                        // set the end status for the step 1 animation here..
                        console.log("Bruh !! stop this madness");
                        setTimeout(() => {
                            stepOne.classList.toggle('hide');
                            sequenceProxy["stepOne"] = true;
                        }, 100);
                    }
                    bootloadEntry.scrollIntoView();
                }, 150 * index);
            });
        },
        stepTwo: () => {
            // using animationend event listener to mark end of animation
            const stepTwo = document.querySelector('.step-2');
            stepTwo.classList.toggle("hide");
            const targetNode = document.querySelector(".os-load-rom");
            const animationEnd = () => {
                // set the end state of animation for step 2 here...
                console.log("bruh !! Animation ended");
                setTimeout(() => {
                    sequenceProxy["stepTwo"] = true;
                    stepTwo.classList.toggle("hide");
                }, 100);
            }
            targetNode.addEventListener("animationend", animationEnd, false);
        },
        stepThree: () => {
            /**
     * @description A function to pause pipboy animation gif.
     *
     * It displays last frame (inside a pseudo selector) of gif animation to create effect of pausing the animation.
     */     const stepThree = document.querySelector('.step-3');
            stepThree.classList.toggle('hide');
            const setTimerforpipboy = () => {
                setTimeout(() => {
                    const pipboyAnimatedImg = document.querySelector('.pipboy-success');
                    document.querySelector('.pipboy-img-container').classList.add('show');
                    // set the animation end state for step 3 here
                    setTimeout(() => {
                        stepThree.classList.toggle('hide');
                        sequenceProxy[stepThree] = true;
                    }, 100);
                }, 2200);
            };

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
        },
        callNextStep(target) {
            const nextStep = Object.entries(target).filter(entry => !entry[1]);
            const nextStepProperty = nextStep[0][0];
            this[nextStepProperty]();
        },
        set(target, property, value) {
            if (property in target && value) {
                target[property] = value;
                this.callNextStep(target);
                return true;
            } else {
                return false;
            }
        }
    }
    sequenceProxy = new Proxy(sequenceProxy, sequencer);
    document.querySelector(".join-vaulttec-btn").addEventListener('click',function(){
        sequencer.initiator();
    });
});