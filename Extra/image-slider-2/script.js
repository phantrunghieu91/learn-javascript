class ImageSlide {
    constructor(src, description) {
        this.src = src;
        this.description = description;
    }

    getUrl = (path) => {
        return `${path}/${this.src}`;
    };
};

const imgsList = [new ImageSlide('1.jpg', "Beautiful Forest"), 
                new ImageSlide('2.jpg', 'Man with his dog in nature'),
                new ImageSlide('3.jpg', 'Ranom Grafiti'),
                new ImageSlide('4.jpg', 'A wooden bridge in forest')];

const renderPicture = () => {
    const sliderContainer = document.getElementById("slider-container");
    for( let i = 0; i < imgsList.length; i++) {
        let slide = document.createElement("div");
        slide.classList.add("slide");
        slide.style.left = `${100 * i}%`;

        let image = document.createElement("img");
        image.src = imgsList[i].getUrl("imgs");
        image.alt = imgsList[i].description;

        slide.appendChild(image);
        sliderContainer.appendChild(slide);
    }
};

const getSlideDivs = () => {
    return document.querySelectorAll('.slide');
};

const getTranslateXValueOf = (element) => {
    let transformStyle = element.style.transform;
    return transformStyle.replace(/[^-.\d.]/g, '');
}

const prevSlide = () => {
    let slideDivs = getSlideDivs();
    slideDivs.forEach(div => {
        let prevValue = getTranslateXValueOf(div) == '' ? 0 : +getTranslateXValueOf(div);
        let nextValue;
        if(prevValue == 0) {
            nextValue = -(slideDivs.length - 1) * 100;
        } else nextValue = prevValue + 100;
        div.style.transform = `translateX(${nextValue}%)`;
    });
};
const nextSlide = () => {
    let slideDivs = getSlideDivs();
    slideDivs.forEach((div, index) => {
        let prevValue = getTranslateXValueOf(div) == '' ? 0 : +getTranslateXValueOf(div);
        let nextValue;
        if(prevValue == (-(slideDivs.length - 1) * 100)) {
            nextValue = 0;
        } else nextValue = prevValue - 100;
        div.style.transform = `translateX(${nextValue}%)`;
    });
}
const prevBtn = document.getElementById('prev-btn');
const nextBtn = document.getElementById('next-btn');
prevBtn.addEventListener('click', prevSlide);
nextBtn.addEventListener('click', nextSlide);

renderPicture();