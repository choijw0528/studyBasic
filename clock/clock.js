const clock = document.querySelector('#clock');

function currentTime() {
    const now = new Date();
    const hour = now.getHours();
    const minute = now.getMinutes();
    const second = now.getSeconds();

    // 현재 시간 영역
    const currentHour = hour < 10 ? "0" + hour : hour;
    const currentMinute = minute < 10 ? "0" + minute : minute;
    const currentSecond = second < 10 ? "0" + second : second;
    const currentTimer = currentHour + " : " + currentMinute + " : " + currentSecond;

    clock.innerHTML = currentTimer;

    // 디지털 시계 영역
    const hourType1 = document.querySelector('.segmentArea.hour .segmentWrap.type1');
    const hourType2 = document.querySelector('.segmentArea.hour .segmentWrap.type2');
    const minuteType1 = document.querySelector('.segmentArea.minute .segmentWrap.type1');
    const minuteType2 = document.querySelector('.segmentArea.minute .segmentWrap.type2');
    const secondType1 = document.querySelector('.segmentArea.second .segmentWrap.type1');
    const secondType2 = document.querySelector('.segmentArea.second .segmentWrap.type2');

    const hourNum1 = parseInt(hour / 10);
    const hourNum2 = hour % 10;
    const minuteNum1 = parseInt(minute / 10);
    const minuteNum2 = minute % 10;
    const secondNum1 = parseInt(second / 10);
    const secondNum2 = second % 10;

    hourType1.setAttribute('class', 'segmentWrap type1 segment' + hourNum1);
    hourType2.setAttribute('class', 'segmentWrap type2 segment' + hourNum2);
    minuteType1.setAttribute('class', 'segmentWrap type1 segment' + minuteNum1);
    minuteType2.setAttribute('class', 'segmentWrap type2 segment' + minuteNum2);
    secondType1.setAttribute('class', 'segmentWrap type1 segment' + secondNum1);
    secondType2.setAttribute('class', 'segmentWrap type2 segment' + secondNum2);

    // 아날로그 시계 영역
    const hourStick = document.querySelector('.analogClockArea .clockStick.hourStick');
    const minuteStick = document.querySelector('.analogClockArea .clockStick.minuteStick');
    const secondStick = document.querySelector('.analogClockArea .clockStick.secondStick');
    let minuteCheck;
    
    switch(parseInt(minute / 12)) {
        case 1:
            minuteCheck = 1;
            break;
        case 2:
            minuteCheck = 2;
            break;
        case 3:
            minuteCheck = 3;
            break;
        case 4:
            minuteCheck = 4;
            break;
        default:
            minuteCheck = 0;
            break;
    }

    if(minuteCheck === 1) {
        hourStick.setAttribute('style', 'transform: rotate(' + ((hour * 30) + (minuteCheck * 6)) + 'deg)');
        console.log('minuteCheck = 1');
    } else if(minuteCheck === 2) {
        hourStick.setAttribute('style', 'transform: rotate(' + ((hour * 30) + (minuteCheck * 6)) + 'deg)');
        console.log('minuteCheck = 2');
    } else if(minuteCheck === 3) {
        hourStick.setAttribute('style', 'transform: rotate(' + ((hour * 30) + (minuteCheck * 6))  + 'deg)');
        console.log('minuteCheck = 3');
    } else if(minuteCheck === 4) {
        hourStick.setAttribute('style', 'transform: rotate(' + ((hour * 30) + (minuteCheck * 6))  + 'deg)');
        console.log('minuteCheck = 4');
    } else if(minuteCheck === 0) {
        hourStick.setAttribute('style', 'transform: rotate(' + (hour * 30) + 'deg)');
    }

    minuteStick.setAttribute('style', 'transform: rotate(' + (minute * 6) + 'deg)');
    secondStick.setAttribute('style', 'transform: rotate(' + (second * 6) + 'deg)');
}

setInterval(currentTime, 1000);