const getAllBtn = () => {
    return document.querySelectorAll('button');
};
const addEventToBtn = () => {
    const allButton = getAllBtn();
    allButton.forEach(btn => {
        btn.addEventListener('click', (e) => {
            console.log(allButton.length);
            getPositionOnBtnWhenClick(e, btn);
        }, {once: true});
    }); 
};

const getPositionOnBtnWhenClick = (evt, element) => {
    const posX = evt.offsetX;
    const posY = evt.offsetY;
    console.log(posX, posY);
};