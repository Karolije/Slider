const init = function() {
    const imagesList = document.querySelectorAll('.gallery__item');
    imagesList.forEach( img => {
        img.dataset.sliderGroupName = Math.random() > 0.5 ? 'nice' : 'good';
        
    }); // za każdym przeładowaniem strony przydzielaj inną nazwę grupy dla zdjęcia

    runJSSlider();
    
    
}

document.addEventListener('DOMContentLoaded', init);

const runJSSlider = function() {
    const imagesSelector = '.gallery__item';
    const sliderRootSelector = '.js-slider'; 

    const imagesList = document.querySelectorAll(imagesSelector);
    const sliderRootElement = document.querySelector(sliderRootSelector);

    initEvents(imagesList, sliderRootElement);
    initCustomEvents(imagesList, sliderRootElement, imagesSelector);
}

const initEvents = function(imagesList, sliderRootElement) {
    imagesList.forEach( function(item)  {
        item.addEventListener('click', function(e) {
            fireCustomEvent(e.currentTarget, 'js-slider-img-click');
        });
        
    });

    // todo: 
    // utwórz nasłuchiwanie eventu o nazwie [click], który ma uruchomić event [js-slider-img-next]
    // na elemencie [.js-slider__nav--next]

    const navNext = sliderRootElement.querySelector('.js-slider__nav--next');

    navNext.addEventListener('click', function(e) {
        fireCustomEvent(e.currentTarget,'js-slider-img-next');
        e.stopPropagation();
        
    });
    

    // todo:
    // utwórz nasłuchiwanie eventu o nazwie [click], który ma uruchomić event [js-slider-img-prev]
    // na elemencie [.js-slider__nav--prev]
    const navPrev = sliderRootElement.querySelector('.js-slider__nav--prev');

    navPrev.addEventListener('click', function(e) {
        fireCustomEvent(e.currentTarget,'js-slider-img-prev');
        e.stopPropagation();
    });
    

    // todo:
    // utwórz nasłuchiwanie eventu o nazwie [click], który ma uruchomić event [js-slider-close]
    // tylko wtedy, gdy użytkownik kliknie w [.js-slider__zoom]
    const zoom = sliderRootElement.querySelector('.js-slider__zoom');
    

    zoom.addEventListener('click', function() {
        fireCustomEvent(zoom,'js-slider-close');
    
    });
    
}

const fireCustomEvent = function(element, name) {
    console.log(element.className, '=>', name);

    const event = new CustomEvent(name, {
        bubbles: true,
    });

    element.dispatchEvent( event );
}

const initCustomEvents = function(imagesList, sliderRootElement, imagesSelector) {
    imagesList.forEach(function(img) {
        img.addEventListener('js-slider-img-click', function(event) {
            onImageClick(event, sliderRootElement, imagesSelector);
        });
    });

    sliderRootElement.addEventListener('js-slider-img-next', onImageNext);
    sliderRootElement.addEventListener('js-slider-img-prev', onImagePrev);
    sliderRootElement.addEventListener('js-slider-close', onClose);
}

const onImageClick = function(event, sliderRootElement, imagesSelector) {
    // todo:  
    // 1. dodać klasę [.js-slider--active], aby pokazać całą sekcję

    

    sliderRootElement.classList.add('js-slider--active');

    // 2. wyszukać ściężkę (atrybut [src]) do klikniętego elementu i wstawić do [.js-slider__image]


    const currentImg = event.currentTarget.querySelector('img').getAttribute('src');

    const jsSliderImage = document.querySelector('.js-slider__image');

    jsSliderImage.setAttribute('src', currentImg)


    // 3. pobrać nazwę grupy zapisaną w dataset klikniętego elementu

    const currentGroup = event.currentTarget.dataset.sliderGroupName;


    // 4. wyszukać wszystkie zdjęcia należące do danej grupy, które wykorzystasz do osadzenia w dolnym pasku

    const imagesList = document.querySelectorAll('.gallery__item');
    const thumbsSrc = [];
    // .filter()
    imagesList.forEach( img => {
        if(img.dataset.sliderGroupName === currentGroup) {
            const allImagesSrc = img.querySelector('img').getAttribute('src');
            thumbsSrc.push(allImagesSrc);
            
        };
        
    })



    // 5. utworzyć na podstawie elementu [.js-slider__thumbs-item--prototype] zawartość dla [.js-slider__thumbs] 
const jsSliderThItem = document.querySelector('.js-slider__thumbs-item--prototype');
const jsSliderThumbs = document.querySelector('.js-slider__thumbs');

if(jsSliderThItem && jsSliderThumbs) {
    // const cloneJsSliderThItem = jsSliderThItem.cloneNode(true);
    // jsSliderThumbs.appendChild(cloneJsSliderThItem);

    thumbsSrc.forEach(function(src) {
        const cloneJsSliderThItem = jsSliderThItem.cloneNode(true);
        cloneJsSliderThItem.classList.remove('js-slider__thumbs-item--prototype');
        // cloneJsSliderThItem.querySelector('img').src = src;
        cloneJsSliderThItem.querySelector('img').setAttribute('src', src);
        jsSliderThumbs.appendChild(cloneJsSliderThItem);
    });
    
}


    // 6. zaznaczyć przy pomocy klasy [.js-slider__thumbs-image--current], który element jest aktualnie wyświetlany

    const footerCurrentImg = document.querySelectorAll('.js-slider__thumbs-image');



    // for (let i = 0; i < footerCurrentImg.length; i++) {
    //     const footerCurrentImgSrc = footerCurrentImg.querySelector('img').getAttribute('src');
    //     console.log(footerCurrentImgSrc);

    // }






    
    // event.currentTarget.classList.add('js-slider__thumbs-image--current');


    const currentJpg = event.currentTarget.querySelector('img').getAttribute('src');
    



    for (let i = 0; i < thumbsSrc.length; i++) {
        if (thumbsSrc[i] === currentJpg) {
            // ??.classList.add('js-slider__thumbs-image--current');
            console.log(currentJpg)
            console.log(thumbsSrc[i])
        }
    }
   
    
}

const onImageNext = function(event) {
    console.log(this, 'onImageNext');
    // [this] wskazuje na element [.js-slider]
    
    // todo:
    // 1. wyszukać aktualny wyświetlany element przy pomocy [.js-slider__thumbs-image--current]

    const currentImage = document.querySelector('.js-slider__thumbs-image--current');
    
    // 2. znaleźć element następny do wyświetlenie względem drzewa DOM dla [.js-slider__thumbs]

    
    const nextEl = currentImage.nextElementSibling;
    console.log(nextEl);
   

    

    // 3. sprawdzić czy ten element istnieje - jeśli nie to [.nextElementSibling] zwróci [null]

    if(nextEl) {
        
        nextEl.classList.add('nextElementSibling');
    

    // 4. przełączyć klasę [.js-slider__thumbs-image--current] do odpowiedniego elementu
    currentImage.classList.remove('js-slider__thumbs-image--current');
    nextEl.classList.add('js-slider__thumbs-image--current');


    // 5. podmienić atrybut o nazwie [src] dla [.js-slider__image]

    const newCurrentImg = nextEl.querySelector('img').getAttribute('src');

    const jsSliderImage = document.querySelector('.js-slider__image');

    jsSliderImage.setAttribute('src', newCurrentImg);
    } else {
        const gallery = document.querySelector('.gallery')
        console.log(gallery.children[0])
        


        gallery.children[0].classList.add('nextElementSibling');
        currentImage.classList.remove('js-slider__thumbs-image--current');
    gallery.children[0].classList.add('js-slider__thumbs-image--current');

        const firstImg = gallery.children[0].querySelector('img').getAttribute('src');
        const jsSliderImage = document.querySelector('.js-slider__image');
        jsSliderImage.setAttribute('src', firstImg);

    }


}

const onImagePrev = function(event) {
    console.log(this, 'onImagePrev');
    // [this] wskazuje na element [.js-slider]
    
    // todo:
    // 1. wyszukać aktualny wyświetlany element przy pomocy [.js-slider__thumbs-image--current]

    const currentImage = document.querySelector('.js-slider__thumbs-image--current');
    

    // 2. znaleźć element poprzedni do wyświetlenie względem drzewa DOM dla [.js-slider__thumbs]

    const previousEl = currentImage.previousElementSibling;
    console.log(previousEl);
    
    // 3. sprawdzić czy ten element istnieje i czy nie posiada klasy [.js-slider__thumbs-item--prototype]
    //|| (previousEl.className.includes('js-slider__thumbs-item--prototype')) )

    if(previousEl !== null && !previousEl.className.includes('js-slider__thumbs-item--prototype')) {
    

    // 4. przełączyć klasę [.js-slider__thumbs-image--current] do odpowiedniego elementu

    currentImage.classList.remove('js-slider__thumbs-image--current');
    previousEl.classList.add('js-slider__thumbs-image--current');
    
    // 5. podmienić atrybut [src] dla [.js-slider__image]

    const newCurrentImg = previousEl.querySelector('img').getAttribute('src');

    const jsSliderImage = document.querySelector('.js-slider__image');

    jsSliderImage.setAttribute('src', newCurrentImg);
    } else {
        const gallery = document.querySelector('.gallery');
        const lastChild = gallery.lastElementChild;
        console.log(lastChild);
        currentImage.classList.remove('js-slider__thumbs-image--current');
    lastChild.classList.add('js-slider__thumbs-image--current');
    const newCurrentImg = lastChild.querySelector('img').getAttribute('src');

    const jsSliderImage = document.querySelector('.js-slider__image');
    jsSliderImage.setAttribute('src', newCurrentImg);
    }
    
}
    
const onClose = function(event) {
    // todo:
    // 1. należy usunać klasę [js-slider--active] dla [.js-slider]

    this.classList.remove('js-slider--active');


    // 2. należy usunać wszystkie dzieci dla [.js-slider__thumbs] pomijając [.js-slider__thumbs-item--prototype]

    
    
    const jsSliderThItem = document.querySelector('.js-slider__thumbs-item--prototype');

const jsSliderThumbs = document.querySelector('.js-slider__thumbs');

if(jsSliderThumbs && jsSliderThItem) {
    jsSliderThumbs.removeChild(jsSliderThItem);
}
}




