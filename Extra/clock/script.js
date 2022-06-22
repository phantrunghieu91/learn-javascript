// convert time value into miliseconds
const ONE_SEC = 1000;
const ONE_MIN = 60 * ONE_SEC;
const ONE_HOUR = 60 * ONE_MIN;
const ONE_DAY = 24 * ONE_HOUR;

function formatNumber(number) {
    return number < 10 ? `0${number}` : `${number}`;
}

class DigitalClock {
    constructor() {
        this.currentDate = new Date();
    }

    getCurrentTime () {
        return this.currentDate.getTime();
    }

    updateClockContainer(container, newTime) {
        let time = newTime.split("");
        const first = container.firstElementChild;
        if(first.textContent !== time[0]) this.updateClockNumber(first, time[0]);
        const second = container.lastElementChild;
        if(second.textContent !== time[1]) this.updateClockNumber(second, time[1]);
    }

    updateClockNumber(element, number) {
        const nextNum = element.lastElementChild.cloneNode();
        nextNum.textContent = number;
        element.appendChild(nextNum);
        element.classList.add("move");
        setTimeout(() => {
            element.classList.remove("move");
        }, 900);
        setTimeout(() => {
            element.removeChild(element.firstElementChild);
        }, 900);
    }
};

function runProgram(){
    const clockContainer = document.querySelector('.time');
    const digital = new DigitalClock();
    let hours = formatNumber(digital.currentDate.getHours());
    let mins = formatNumber(digital.currentDate.getMinutes());
    let secs = formatNumber(digital.currentDate.getSeconds());
    let currentTime = [hours, mins, secs];
    currentTime.forEach((time, index) => {
        digital.updateClockContainer(clockContainer.children[index], time);
    });
    setTimeout(runProgram, 1000);
}

runProgram();