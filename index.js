class Slider {

    constructor() {
        this.left = -100;
        this.slider = document.querySelector("[data-functiomnality]");
        this.sliderItem = 0;
        this.loop = false;
        this.visibleItems = 9;
        this.autoslide = false;
        this.images = [
            "./photos/1.jpg", "./photos/2.jpg", "./photos/3.jpg",
            "./photos/4.jpg", "./photos/5.jpg", "./photos/6.jpg",
            "./photos/ng.jpg", "./photos/react.png", "./photos/vue.png"
        ];

        this.items = new Items(this.visibleItems, "DIV", this.slider);
        this.slides = this.items.createSlides(this.images);
        this.mainImg = this.mainContent();
        this.transformCount = 0;
    }

    autoSlide() {
        this.autoslide = !this.autoslide;
        if (this.autoslide) {
            this.interval = setInterval(() => {
                this.onSliderNext();
            }, 500)
        } else {
            clearInterval(this.interval);
        }
    }

    mainContent() {
        let main = document.createElement("DIV");
        main.className = "main";
        let img = document.createElement("img");
        img.setAttribute("src", `${this.images[0]}`);
        main.append(img);
        this.slider.prepend(main);
        return img;
    }

    onSliderPrev() {
        if (this.autoslide) {
            clearInterval(this.interval);
            this.autoslide = false;
        }

        if (this.sliderItem === 0 && !this.loop) return;

        if (this.sliderItem === 0) {
            this.sliderItem = 0;
        } else {
            this.sliderItem--;
        }

        if (this.loop) {
            let pop = this.images.pop();
            this.images.unshift(pop);
            this.prev(pop);
        }
        this.transformCount += 100;
        this.slides.style = `transform: translate(${this.transformCount}px)`;
        this.mainImg.setAttribute("src", `${this.images[this.sliderItem]}`);
    }

    stopAutoSlider() {
        if (this.autoslide) {
            clearInterval(this.interval);
            this.autoslide = false;
        }
        this.onSliderNext();
    }

    onSliderNext() {
        if (!this.loop && Math.ceil(this.images.length / this.sliderItem) <= 3) return;
        if (this.sliderItem < this.images.length - 1) {
            this.sliderItem++;
        } else {
            this.sliderItem = this.images.length - 1;
        }
        this.transformCount -= 100;
        this.slides.style = `transform: translate(${this.transformCount}px)`;
        console.log(this.sliderItem, " slider item");
        this.mainImg.setAttribute("src", `${this.images[this.sliderItem]}`);

        if (this.loop) {
            let shift = this.images.shift();
            console.log(shift);
            this.images.push(shift);
            this.next(shift);
        }

        console.log(this.images, "img array");
    }

    next(img) {
        this.slides.insertAdjacentHTML("afterbegin", `<div class="slides"><img class="mini-img" src=${img} alt="img"></div>`);
    }

    prev(img) {
        this.slides.insertAdjacentHTML("beforeend", `<div class="slides absolute" style=left:${this.left}><img class="mini-img" src=${img} alt="img"></div>`);
        this.left -= 100;
    }
}

class Items {
    constructor(itemsLength, elementName, slider) {
        this.itemsLength = itemsLength;
        this.slider = slider;
    }


    createSlides(images) {
        let div = document.createElement("div");
        div.className = "d-flex row-reverse";
        this.slider.append(div);
        for (let i = 0; i < this.itemsLength; i++) {
            div.insertAdjacentHTML("afterbegin", `<div class="slides"><img class="mini-img" src=${images[i]} alt="img"></div>`);
        }
        return div;
    }
}

class Buttons {
    constructor() {
        this.sliderClass = new Slider();
        this.slider = document.querySelector("[data-functiomnality]");

        this.buttonsDiv = document.createElement("div");
        this.buttonsDiv.className = "d-flex btns";

        this.loop = this.createButtons("Loop", "data-loop");
        this.autoSlide = this.createButtons("Auto Slide", "data-auto-slide");

        this.createNextPrev();


        this.loop.addEventListener("click", () => {
            this.sliderClass.loop = !this.sliderClass.loop;
        })

        this.autoSlide.addEventListener("click", () => {
            this.sliderClass.autoSlide();
        })
    }

    createButtons(context, dataAttrName) {
        let btn = document.createElement("button");
        btn.innerText = context;
        btn.className = "btn";
        btn.setAttribute(dataAttrName, '');
        this.buttonsDiv.append(btn);
        this.slider.append(this.buttonsDiv);
        return btn;
    }

    createNextPrev() {
        let div = document.createElement("div");
        div.className = "d-flex";
        this.slider.append(div);

        let btnDiv = document.createElement("div");
        btnDiv.className = "btns";

        let prevBtn = document.createElement("button");
        prevBtn.setAttribute("type", "button");
        prevBtn.className = "btn"
        prevBtn.innerText = " < ";
        prevBtn.addEventListener("click", this.sliderClass.onSliderPrev.bind(this.sliderClass));


        let nextBtn = document.createElement("button");
        nextBtn.setAttribute("type", "button");
        nextBtn.className = "btn"
        nextBtn.innerText = " > "
        nextBtn.addEventListener("click", this.sliderClass.stopAutoSlider.bind(this.sliderClass));

        btnDiv.append(prevBtn);
        btnDiv.append(nextBtn);

        div.append(btnDiv);
    }
}

new Buttons();