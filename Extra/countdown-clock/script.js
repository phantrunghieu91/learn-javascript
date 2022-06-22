const months = ['01', '02', '03', '04', '05', '06', '07', '08', '09', 10, 11, 12];
const weekdays = ["Thứ hai", 'Thứ ba', 'Thứ tư', 'Thứ năm', 'Thứ sáu', 'Thứ bảy', 'Chủ nhật'];

const QUOC_TE_THIEU_NHI = '1 July, 2022 20:30:00';

// Time in miliseconds
const oneMinute = 60 * 1000;
const oneHour = 60 * oneMinute;
const oneDay = 24 * oneHour;
let countdown;

let futureDate = new Date(QUOC_TE_THIEU_NHI);

function getRemainingTime(targetDate) {
    let current = new Date();
    let futureTime = targetDate.getTime();    
    let currentTime = current.getTime();
    let remainTime = futureTime - currentTime;

    if(remainTime > 0){
        let days = Math.floor(remainTime / oneDay);
        let hours = Math.floor((remainTime % oneDay) / oneHour);
        let mins = Math.floor((remainTime % oneHour) / oneMinute);
        let secs = Math.floor((remainTime % oneMinute) / 1000);

        return [days, hours, mins, secs];
    } else {
        return -1;
    }
    
}

function displayCountdownClock(targetDate) {
    const cdClockItems = document.querySelectorAll('.countdown-clock h4');
    const cdClockDisplay = document.getElementById("countdown-clock");
    const cdClockDisplayDivs = cdClockDisplay.children;
    let cdClock = getRemainingTime(targetDate);
    if(cdClock != -1) {
        if(cdClockDisplayDivs.item(0).style.display == "none") {
            for(let i = 0; i < cdClockDisplayDivs.length; i++) {
                cdClockDisplayDivs.item(i).style.display = "flex";
            }
        } else {
            cdClockItems.forEach((item, index) => {
                item.textContent = format(cdClock[index]);
            }); 
        }   
    } else {
        clearInterval(countdown);
        for(let i = 0; i < cdClockDisplayDivs.length; i++) {
            cdClockDisplayDivs.item(i).style.display = "none";
        }
        const expiredAnnouce = document.createElement("h4");
        expiredAnnouce.setAttribute("id", "expired-annouce");
        expiredAnnouce.innerText = "Xin lỗi, sự kiện này đã hết hạn!";
        cdClockDisplay.appendChild(expiredAnnouce);
    }
    
}

function format(item) {
    return item < 10 ? `0${item}` : item;
}

function display() {
    const futureDateDisplay = document.getElementById("future-date");
    const year = futureDate.getFullYear();
    const month = futureDate.getMonth();
    const date = futureDate.getDate();
    const day = futureDate.getDay();
    const hours = futureDate.getHours();
    const mins = futureDate.getMinutes();

    futureDateDisplay.innerText = `${hours > 12 ? '0' + Math.abs(hours - 12) : format(hours)}:${format(mins)} ${hours > 12 ? 'PM' : 'AM'}, ${weekdays[day]}, ngày ${format(date)} tháng ${months[month]} năm ${year}.`;
    displayCountdownClock(futureDate);
    countdown = setInterval(() => {displayCountdownClock(futureDate)}, 1000);
}

display();