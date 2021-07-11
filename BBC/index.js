(() => {

    const actions = {
        action_event(flag){
            if(flag){
                document.querySelector('[data-index="4"] .action').style.transition = "1.0s 0.2s linear";
                document.querySelector('[data-index="4"] .action').style.transform = `translateX(${window.innerWidth / 2}px)`;
                setTimeout(function(){
                    document.querySelector('[data-index="4"] .action').style.opacity = 0;
                }, 1000);
            }else{
                document.querySelector('[data-index="4"] .action').style.transition = "0.1s linear";
                document.querySelector('[data-index="4"] .action').style.transform = `translateX(-100%)`;
                setTimeout(function(){
                    document.querySelector('[data-index="4"] .action').style.opacity = 1;
                }, 1000);
            }
        },
    }

    const step_elem = document.querySelectorAll('.step');
    const graphic_elem = document.querySelectorAll('.graphic-item');
    let current_item = graphic_elem[0]; //현재 활성화된 이미지
    let io_index;

    //현재 사용자가 바라보고 있는 이미지의 index를 가져옴
    const io = new IntersectionObserver((entries, observer) => {
        io_index = entries[0].target.dataset.index * 1;
    });

    for(let i = 0; i < step_elem.length; i++){
        //모든 step_elem에 observe를 붙힘
        io.observe(step_elem[i]);
        step_elem[i].dataset.index = i;
        graphic_elem[i].dataset.index = i;
    }

    function activate(action){
        current_item.classList.add('visible');
        if(action){
            actions[action](true);
        }
    }

    function inactivate(action){
        current_item.classList.remove('visible');
        if(action){
            actions[action](false);
        }
    }

    window.addEventListener('scroll', () => {
        let step;
        let bounding_rect;
        //현재 활성화중인 observe의 이전 step_elem과 다음 step_elem만 체크하여 반복을 줄임
        for(let i = io_index - 1; i <= io_index + 1; i++){
            step = step_elem[i];
            if(!step){
                continue;
            }

            //해당 요소의 위치값을 가져옴
            bounding_rect = step.getBoundingClientRect();

            //요소가 해당 구간안에 들어오면 이미지 변경
            if(bounding_rect.top > window.innerHeight * 0.1 && bounding_rect.top < window.innerHeight * 0.8){
                inactivate(current_item.dataset.action);
                current_item = graphic_elem[step.dataset.index];
                activate(current_item.dataset.action);
            }
        }
    });

    window.addEventListener('load', () => {
        setTimeout(() => scrollTo(0, 0), 100);
    });
    


    activate();
})();