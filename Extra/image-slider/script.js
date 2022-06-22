const imgsSrc = ['forest.jpg', 'man-walking-dog.jpg', 'random.jpg', 'wooden-bridge.jpg'];
const onlineImgs = ['https://funlifecrisis.com/wp-content/uploads/2018/06/Top-Photographic-Things-to-See-and-Do-in-Iceland.jpg',
'https://funlifecrisis.com/wp-content/uploads/2021/12/Fun-Life-Crisis-1.jpg']
const nextBtn = document.getElementById("next-btn");
const prevBtn = document.getElementById("prev-btn");

nextBtn.addEventListener('click', nextImage);
prevBtn.addEventListener('click', previousImage);

function renderImage() {
    const sliderContainer = document.getElementById("slider-container");
    for (let i = 0; i < onlineImgs.length; i++) {
        let slideDiv = document.createElement("div");
        slideDiv.classList.add("slide");
        slideDiv.style.left = `${i * 100}%`;
        let img = document.createElement("img");
        img.src = `${onlineImgs[i]}`;
        let imgPos = document.createElement("h1");
        imgPos.textContent = i + 1;
        slideDiv.appendChild(img);
        slideDiv.appendChild(imgPos);
        sliderContainer.appendChild(slideDiv);
    }

}

function getSlideDivs() {
    return document.querySelectorAll('.slide');
}

function getTranslateXValueOf(element) {
    let transformStyle = element.style.transform;
    return transformStyle.replace(/[^-.\d.]/g, '');
}

function nextImage() {
    let slideDivs = getSlideDivs();
    slideDivs.forEach(div => {        
        let prevValue = getTranslateXValueOf(div) == '' ? 0 : +getTranslateXValueOf(div);
        let nextValue = prevValue - 100;
        div.style.transform = `translateX(${nextValue}%)`;
    });    
    showButton();
}

function previousImage() {
    let slideDivs = getSlideDivs();
    slideDivs.forEach(div => {        
        let prevValue = getTranslateXValueOf(div) == '' ? 0 : +getTranslateXValueOf(div);
        div.style.transform = `translateX(${prevValue + 100}%)`;
    });    
    showButton();
}

function showButton() {
    let slideDivs = getSlideDivs();
    let translateXValue = getTranslateXValueOf(slideDivs[0]);    
    if(translateXValue == '' || translateXValue == 0) {
        prevBtn.style.display = 'none';
        nextBtn.style.display = 'inline-block';
    } else if(translateXValue == `-${100 * (slideDivs.length - 1)}`) {
        nextBtn.style.display = 'none';
        prevBtn.style.display = 'inline-block';
    } else {
        nextBtn.style.display = 'inline-block';
        prevBtn.style.display = 'inline-block';
    }
}

renderImage();
showButton()