function checkMobile() {
    // 모바일 여부 확인
    var isMobile = false;

    // PC 환경
    var filter = "win16|win32|win64|mac|macintel";

    if(navigator.platform) {
        isMobile = filter.indexOf(navigator.platform.toLowerCase()) < 0;
    }

    // 모바일의 경우 'typeMobile' 클래스 추가
    // if(isMobile) {
    //     const wrapper = document.querySelector('.wrap');

    //     wrapper.setAttribute('class', 'wrap typeMobile');
    // }

    if(!isMobile) {
        const links = document.querySelectorAll('li .link');

        links.forEach(function(item) {
            item.setAttribute('target', '_blank');
        });
    }
};

checkMobile();