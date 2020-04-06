$(document).ready(function() {

    if ($('.feedback__slider').length) {

        let sliderImagesBox = document.querySelectorAll('.cards-box');
        sliderImagesBox.forEach(el => {
            let imageNodes = el.querySelectorAll('.card:not(.hide)')
            let arrIndexes = [];
            (() => {
               
                let start = 0;
                while (imageNodes.length > start) {
                    arrIndexes.push(start++);
                }
            })();

            let setIndex = (arr) => {
                for (let i = 0; i < imageNodes.length; i++) {
                    imageNodes[i].dataset.slide = arr[i] // Set indexes
                }
            }

            function next() {
                arrIndexes.unshift(arrIndexes.pop());
                setIndex(arrIndexes)
            }

            function prev() {
                arrIndexes.push(arrIndexes.shift());
                setIndex(arrIndexes)
            }

            document.querySelector('.feedback__nav-arr_right').addEventListener('click', next);
            document.querySelector('.feedback__nav-arr_left').addEventListener('click', prev);         
            el.addEventListener('click', next)
            setIndex(arrIndexes) // The first indexes addition
        });

    }

    toggleHoveredClass([$('.services__service'),
            $('.objects__slide'),
            $('.articles__slide')
        ],
        'hovered');

    function toggleHoveredClass(elems, hoveredClass) {
        elems.forEach(arr => {
            arr.each((i, elem) => {
                $(elem).on('mouseenter', function() {
                    $(this).addClass(`${$(elem).attr('class').split(' ')[0]}_${hoveredClass}`)
                });

                $(elem).on('mouseleave', function() {
                    $(this).removeClass(`${$(elem).attr('class').split(' ')[0]}_${hoveredClass}`)
                })
            })
        })
    }

    if ($('.video__video').length) {
        let link = $('.video__video').attr('data-src');
        let embedLink = createYouTubeEmbedLink(link);
        let previewPic = createYouTubePicPreview(embedLink);

        $('.video__thumb').css({ 'background-image': `url(${previewPic}` });
    }

    $('.video__video').on('click', function() {
        let link = $('.video__video').attr('data-src');
        let embedLink = createYouTubeEmbedLink(link);
        $('.video__video').append(`<iframe class="video__iframe" src="${embedLink}" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>`)
        $('.video__playbtn').css({ 'opacity': 0, 'visibility': 'hidden' });
    });

    if ($('.objects__slider').length) {
        $('.objects__slider').slick({
            slidesToShow: 3,
            slidesToScroll: 1,
            infinite: false,
            arrows: true,
            prevArrow: $('.objects__nav-arr_left'),
            nextArrow: $('.objects__nav-arr_right'),
            responsive: [{
                    breakpoint: 1030,
                    settings: {
                        slidesToShow: 2.3,
                    }
                },
               
            ]
        });
    }

    if ($('.services__slider').length) {
        $('.services__slider').slick({
            slidesToShow: 4,
            slidesToScroll: 1,
            infinite: false,
            arrows: true,
            prevArrow: $('.services__nav-arr_left'),
            nextArrow: $('.services__nav-arr_right'),
    
            responsive: [{
                    breakpoint: 1280,
                    settings: {
                        slidesToShow: 3,
                    }
                },
               
            ]
        });
    }

    if ($('.articles__slider').length) {
        $('.articles__slider').slick({
            slidesToShow: 2.2,
            slidesToScroll: 1,
            infinite: false,
            arrows: false,
        
        });
    }

    $('.header__nav-link').each((i, item) => {
        let sectionName = $(item).attr('class').slice($(item).attr('class').lastIndexOf('_') + 1);

        $(item).on('click', function(e) {
            scrollTo(e, $(item), $(`.${sectionName}`));
        });
    });

    $('.calculate-form__radio-input-container').on('click', function() {
        $(this).addClass('calculate-form__input-container_checked');
        $(this).find('input').attr('checked', 'checked');
        $(this).siblings('.calculate-form__radio-input-container').removeClass('calculate-form__input-container_checked');
        $(this).siblings('.calculate-form__radio-input-container').find('input').removeAttr('checked');
    })

    $('.calculate-form__checkbox-label').on('click', function(e) {
        if (!$(this).prev('input').attr('checked')) {
            console.log('has')
            $(this).prev('input').attr('checked', 'checked');
            $(this).parent().addClass('calculate-form__input-container_checked');
        } else {
            console.log('else')
            $(this).prev('input').removeAttr('checked', 'checked');
            $(this).parent().removeClass('calculate-form__input-container_checked');
        }
    });

    $('.calculate-form__checkbox-input-container').on('click', function(e) {
        if (!$(this).find('input').attr('checked')) {
            $(this).find('input').attr('checked', 'checked');
            $(this).addClass('calculate-form__input-container_checked');
        } else {
            $(this).find('input').removeAttr('checked', 'checked');
            $(this).removeClass('calculate-form__input-container_checked');
        }
    });

    $('.calculate__btn').on('click', function(e) {
    	e.preventDefault();
    	$('.calculate__form').addClass('calculate__form_active');
    });

    $('.calculate-form__back-btn').on('click', function(e) {
    	e.preventDefault();
    	$('.calculate__form').removeClass('calculate__form_active');
    });

    $('.calculate-form__fields_physical').on('submit', function(e) {
    	e.preventDefault();
    	console.log($(this).serializeArray());
    });

    $('.calculate-form__tab_legal').on('click', function() {
    	$(this).addClass('calculate-form__tab_active');
    	$(this).siblings().removeClass('calculate-form__tab_active');
    	$('.calculate-form__fields_physical').removeClass('calculate-form_active');
    	$('.calculate-form__fields_legal').addClass('calculate-form_active');
    });

    $('.calculate-form__tab_physical').on('click', function() {
    	$(this).addClass('calculate-form__tab_active');
    	$(this).siblings().removeClass('calculate-form__tab_active');
    	$('.calculate-form__fields_legal').removeClass('calculate-form_active');
    	$('.calculate-form__fields_physical').addClass('calculate-form_active');
    	
    });

    function scrollTo(e, link, section) {

        e.preventDefault();
        $('html, body').animate({ scrollTop: section.offset().top }, 700);
    }

    function createYouTubePicPreview(dataSrcStr) {
        let picStr = 'http://img.youtube.com/vi/';
        return picStr + dataSrcStr.slice(dataSrcStr.lastIndexOf('/') + 1, dataSrcStr.indexOf('?')) + '/0.jpg'
    }

    function createYouTubeEmbedLink(link) {
        let linkStart = 'https://www.youtube.com/embed/';
        let linkEnd = '?rel=0&showinfo=0&autoplay=1';
        let isParams = link.indexOf('&', link.indexOf('?') + 1) === -1 ? false : true;

        return isParams ?
            linkStart + link.slice(link.indexOf('=') + 1, link.indexOf('&')) + linkEnd :
            linkStart + link.slice(link.indexOf('=') + 1) + linkEnd
    }

    if ($('#map').length) {
        initMap();
    }

    function initMap() {
        ymaps.ready(function() {
            var myMap = new ymaps.Map('map', {
                    center: [51.530935892032936, 45.99973050859832],
                    zoom: 16.5,
                    controls: []
                }, {
                    searchControlProvider: 'yandex#search'
                }),

                myPlacemark = new ymaps.Placemark([51.530935892032936, 45.99973050859832], {}, {
                    iconImageHref: '../img/icons/marker.png',
                    iconLayout: 'default#image',

                });

            myMap.geoObjects.add(myPlacemark);
            myMap.container.fitToViewport();

            //     myMap.balloon.open([51.530897894033940,46.000697894033940], "Астраханская улица, 43к2", {
            //     // Опция: не показываем кнопку закрытия.
            //     closeButton: false
            // });
        });
    }
});