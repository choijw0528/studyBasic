let today = new Date();
let dateCount = 1; // 날짜값
let cellCount = 0; // 요일 판단 값

function setPrevCalendar(e) {
    e.preventDefault();
    e.stopPropagation();

    today = new Date(today.getFullYear(), today.getMonth() - 1, today.getDate());
    drawCalendar();
}

function setTodayCalendar(e) {
    e.preventDefault();
    e.stopPropagation();

    today = new Date();
    drawCalendar();
}

function setNextCalendar(e) {
    e.preventDefault();
    e.stopPropagation();

    today = new Date(today.getFullYear(), today.getMonth() + 1, today.getDate());
    drawCalendar();
}

function setDate() {
    const dateText = document.querySelector('.dateArea .dateText');
    dateText.innerHTML = today.getFullYear() + "년 " + (today.getMonth() + 1) + "월";
}

function drawCell(day, number) {
    return `<span class="calendarCell ${day ? day : ''}" data-date='${number}'>${number ? number + '일' : ''}</span>`;
}

function drawFirstWeek(firstDate) {
    let t = '';
    // 남은 날짜 넣기 위한 변수
    const leftDateCount = 7 - firstDate.getDay();

    // 빈칸 넣기
    for(let i = 0; i < firstDate.getDay(); i++) {
        t += drawCell(`${cellCount % 7 === 0 ? 'holiday' : `${cellCount % 7 === 6 ? 'saturday' : ''}`}`);
        cellCount++;
    }
    
    // 남은 날짜 넣기
    for(let i = 1; i <= leftDateCount; i++) {
        t += drawCell(`${cellCount % 7 === 0 ? 'holiday' : `${cellCount % 7 === 6 ? 'saturday' : ''}`}`, dateCount++);
        cellCount++;
    }

    return t;
}

function drawWeek() {
    let t = '';
    let dayName = '';

    for(let i = 1; i <= 7; i++) {
        switch(i) {
            case 1:
                dayName = 'holiday';
                break;
            case 7:
                dayName = 'saturday';
                break;
            default:
                dayName = '';
                break;
        }

        t += drawCell(dayName, dateCount++);
    }

    return t;
}

function drawLastWeek(lastDate) {
    let t = '';
    // 남은 날짜 넣기 위한 변수
    const leftDateCount = lastDate.getDate() - dateCount + 1;
    
    // 남은 날짜 넣기
    for(let i = 1; i <= leftDateCount; i++) {
        t += drawCell(`${cellCount % 7 === 0 ? 'holiday' : `${cellCount % 7 === 6 ? 'saturday' : ''}`}`, dateCount++);
        cellCount++;
    }
    
    // 빈칸 넣기
    for(let i = 0; i < 7 - leftDateCount; i++) {
        t += drawCell(`${cellCount % 7 === 0 ? 'holiday' : `${cellCount % 7 === 6 ? 'saturday' : ''}`}`);
        cellCount++;
    }

    return t;
}

function setNumOfWeek(firstDate, lastDate) {
    let numOfWeek = 5;

    // 기본 주수를 5주로, 나머지 케이스 정리
    switch(lastDate.getDate()) {
        case 28:
            if(firstDate.getDay() === 0) {
                numOfWeek = 4;
            }
            break;
        case 30:
            if(firstDate.getDay() === 6) {
                numOfWeek = 6;
            }
            break;
        case 31:
            if(firstDate.getDay() === 5 || firstDate.getDay() === 6) {
                numOfWeek = 6;
            }
            break;
    }

    return numOfWeek;
}

function drawCalendar() {
    setDate();

    // 이달의 첫째날(요일 사용)
    // 빈 칸을 채우기, 이달의 주수 계산을 위해서 사용
    const firstDate = new Date(today.getFullYear(), today.getMonth(), 1);
    // 이달의 마지막날(날짜 사용)
    const lastDate = new Date(today.getFullYear(), today.getMonth() + 1, 0);
    const calendarDateArea = document.querySelector('.calendarDateArea');
    const weekOfMonth = setNumOfWeek(firstDate, lastDate);
    let t = '';

    // 날짜, 요일 판단 값 초기화
    dateCount = 1;
    cellCount = 0;
    
    for(let week = 1; week <= weekOfMonth; week++) {
        t += `
            <div class="calendarRow">
                ${week === 1 ? `${drawFirstWeek(firstDate)}` : `${week === weekOfMonth ? drawLastWeek(lastDate) : drawWeek()}` }
            </div>
            `;
        }
    
    calendarDateArea.innerHTML = t;
}

drawCalendar();


const cells = document.querySelectorAll('.calendarDateArea .calendarCell');
const popup = document.querySelector('.popup');
const popupDate = document.querySelector('.popup .scheduleDate');

const calendar = document.querySelector('#calendar');

let startDate, finishDate;

function drawSchedule(startDate, finishDate) {
    if(startDate > finishDate) {
        const temp = startDate;
        startDate = finishDate;
        finishDate = temp;
    
        console.log('startDate: ' + startDate + ' / finishDate: ' + finishDate);
    }

    const startIndex = startDate - 1;
    const finishIndex = finishDate - 1;

    for(let i = startIndex; i <= finishIndex; i++) {
        const noti = document.createElement('div');

        if(i === startIndex) {
            noti.setAttribute('class', 'noti startItem');
        } else if(i === finishIndex) {
            noti.setAttribute('class', 'noti finishItem');
        } else {
            noti.setAttribute('class', 'noti middleItem');
        }

        if(startIndex === finishIndex) {
            noti.setAttribute('class', 'noti item');
        }

        cells[i].appendChild(noti);
    }
}

calendar.addEventListener('click', function(e) {
});

cells.forEach(function(item) {
    item.addEventListener('mousedown', function(e) {
        // console.log('Down: ' + e.target.getAttribute('data-date'));
        startDate = Number(e.target.getAttribute('data-date'));
    })

    item.addEventListener('mouseup', function(e) {
        // console.log('Up: ' + e.target.getAttribute('data-date'));
        finishDate = Number(e.target.getAttribute('data-date'));

        popupOpen();
        // drawSchedule(startDate, finishDate);
        
        
        let t = '';
        if(startDate === finishDate) {
            // console.log(startDate);
            // console.log(finishDate);
            // console.log('같은날 선택');
            t += `${today.getFullYear()}. ${today.getMonth()}. ${startDate}`;    
        } else {
            t += `${today.getFullYear()}. ${today.getMonth()}. ${startDate} ~ ${today.getFullYear()}. ${today.getMonth()}. ${finishDate}`;
        }

        popupDate.innerHTML = t;
    })
});

function popupOpen() {
    popup.setAttribute('aria-hidden', 'false');
}

function popupClose() {
    popup.setAttribute('aria-hidden', 'true');
}

popup.addEventListener('click', function(e) {
    if(e.target === e.currentTarget) {
        popupClose();
    }
});
const btnCancel = document.querySelector('.popup .btnCancel');
const btnConfirm = document.querySelector('.popup .btnConfirm');

btnCancel.addEventListener('click', popupClose);
btnConfirm.addEventListener('click', popupClose);

// let t = '';
// t += `${today.getFullYear()}.${today.getMonth()}.${startDate} ~ ${today.getFullYear()}.${today.getMonth()}.${finishDate}`;
// popupDate.innerHTML = t;

if(startDate === finishDate) {
    console.log(startDate);
    console.log(finishDate);
    console.log('같은날 선택');
}