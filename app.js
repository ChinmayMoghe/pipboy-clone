document.addEventListener("DOMContentLoaded", function () {
    // state object used to maintain state of app
    const imagePaths = ["images/LxjzCn.png", "images/pip-boy-sucess-animate.gif", "images/walking-pipboy.gif"];
    const checkImagesLoaded = path => new Promise(resolve => {
        const img = new Image();
        img.onload = () => resolve(true)
        img.src = path;
    });
    const loadImages = (imagePaths) => Promise.all(imagePaths.map(checkImagesLoaded));
    loadImages(imagePaths).then(loaded => {
        const allImagesLoaded = loaded.reduce((allStatus, currentStatus) => allStatus && currentStatus);
        if (allImagesLoaded) {
            document.querySelector('.loader').classList.toggle('hide');
            document.querySelector('.step-0').classList.toggle('hide');
        }
    });
    let sequenceProxy = {
        initiator: null,
        stepOne: null,
        stepTwo: null,
        stepThree: null,
        stepFour: null
    }
    //proxy handler object - used to call functions on set trap for Proxy
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
                setTimeout(() => {
                    sequenceProxy["stepTwo"] = true;
                    stepTwo.classList.toggle("hide");
                }, 1000);
            }
            targetNode.addEventListener("animationend", animationEnd);
        },
        stepThree: () => {
            const stepThree = document.querySelector('.step-3');
            stepThree.classList.toggle('hide');
            const setTimerforpipboy = () => {
                setTimeout(() => {
                    stepThree.classList.toggle('hide');
                    sequenceProxy["stepThree"] = true;
                }, 2200);
            };
            setTimerforpipboy();
        },
        stepFour: () => {
            const stepFour = document.querySelector(".step-4");
            stepFour.classList.toggle("hide");
            document.querySelector(".navbar-main li:first-child a").focus();
            sequenceProxy["stepFour"] = true;
        },
        callNextStep(target) {
            const nextStep = Object.entries(target).filter(entry => !entry[1]);
            if (nextStep.length > 0) {
                const nextStepProperty = nextStep[0][0];
                this[nextStepProperty]();
            }
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
    // create a Proxy to observe steps boolean value
    sequenceProxy = new Proxy(sequenceProxy, sequencer);
    //initiate a chain reaction
    document.querySelector(".join-vaulttec-btn").addEventListener('click', function () {
        sequencer.initiator();
    });
});