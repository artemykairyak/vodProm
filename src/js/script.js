$(document).ready(function() {
    toggleHoveredClass([$('.services__service'),
            $('.objects__slide'),
            $('.articles__slide'),
            $('.products__card')
        ],
        'hovered');

    initFeedbackSlider();

    $(window).on('resize', function() {
        initFeedbackSlider();
    })

    function initFeedbackSlider() {
        if ($('.feedback__slider').length) {

            if ($(window).width() > 640) {
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
            } else {
                $('.feedback__slider').removeClass('cards-box')
                $('.feedback__slider').slick({
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    infinite: false,
                    arrows: true,
                    prevArrow: $('.feedback__nav-arr_left'),
                    nextArrow: $('.feedback__nav-arr_right'),

                });
            }
        }
    }

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
                {
                    breakpoint: 640,
                    settings: {
                        slidesToShow: 1.5,
                    }
                },
                {
                    breakpoint: 565,
                    settings: {
                        slidesToShow: 1.2,
                    }
                },
                {
                    breakpoint: 375,
                    settings: {
                        slidesToShow: 1,
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
                {
                    breakpoint: 860,
                    settings: {
                        slidesToShow: 2.3,
                    }
                },
                {
                    breakpoint: 640,
                    settings: {
                        slidesToShow: 2.1,
                    }
                },
                {
                    breakpoint: 565,
                    settings: {
                        slidesToShow: 1.5,
                    }
                },
                {
                    breakpoint: 375,
                    settings: {
                        slidesToShow: 1,
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
            responsive: [{
                    breakpoint: 860,
                    settings: {
                        slidesToShow: 1.2,
                    }
                },
                {
                    breakpoint: 375,
                    settings: {
                        slidesToShow: 1,
                    }
                },
            ]
        });
    }

    $('.header__burger').on('click', function() {
        $('.header__menu').addClass('header__menu_mobile-active');
    });

    $('.mobile-menu__close').on('click', function() {
        $('.header__menu').removeClass('header__menu_mobile-active');
    });

    $('.calculate-form__radio-input-container').on('click', function() {
        $(this).addClass('calculate-form__input-container_checked');
        $(this).find('input').attr('checked', 'checked');
        $(this).siblings('.calculate-form__radio-input-container').removeClass('calculate-form__input-container_checked');
        $(this).siblings('.calculate-form__radio-input-container').find('input').removeAttr('checked');
    })

    $('.calculate-form__checkbox-label').on('click', function(e) {
        if (!$(this).prev('input').attr('checked')) {
            $(this).prev('input').attr('checked', 'checked');
            $(this).parent().addClass('calculate-form__input-container_checked');
        } else {
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
        if ($('.calculate').hasClass('calculate_nonabsolute')) {
            $('.calculate').addClass('calculate_active-form');
            $('html, body').animate({ scrollTop: $('.calculate__form').offset().top }, 500);
        }
        $('.calculate__form').addClass('calculate__form_active');
        $('.calculate-form__tab:first').addClass('calculate-form__tab_active');
        $('.calculate-form:first').addClass('calculate-form_active');
    });

    $('.calculate-form__back-btn, .calculate-form__cancel').on('click', function() {
        $('.calculate').removeClass('calculate_active-form');
        $('.calculate__form').removeClass('calculate__form_active');
        $('.calculate-form__tab').removeClass('calculate-form__tab_active');
        $('.calculate-form').removeClass('calculate-form_active');
        setTimeout(() => {
            $('.calculate-form__content').removeClass('calculate-form__content_autoheight');
        }, 100)
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

        if ($(window).width() < 860) {
            $('.calculate-form__content').addClass('calculate-form__content_autoheight');
        }
    });

    $('.calculate-form__tab_physical').on('click', function() {
        $(this).addClass('calculate-form__tab_active');
        $(this).siblings().removeClass('calculate-form__tab_active');
        $('.calculate-form__fields_legal').removeClass('calculate-form_active');
        $('.calculate-form__fields_physical').addClass('calculate-form_active');
        $('.calculate-form__content').removeClass('calculate-form__content_autoheight');
    });

    $('.calculate-form__mobile-tab').on('click', function() {
        if (!$(this).hasClass('calculate-form__mobile-tab_active')) {
            $(this).siblings().removeClass('calculate-form__mobile-tab_active');
            $(this).addClass('calculate-form__mobile-tab_active');

            if ($(this).hasClass('calculate-form__mobile-tab_legal')) {
                $('.calculate-form__content').addClass('calculate-form__content_autoheight');

                $('.calculate-form__fields_legal').addClass('calculate-form_active')
                    .siblings().removeClass('calculate-form_active');
            } else {

                $('.calculate-form__content').removeClass('calculate-form__content_autoheight');

                $('.calculate-form__fields_physical').addClass('calculate-form_active')
                    .siblings().removeClass('calculate-form_active');
            }
        }

        $('.calculate-form__mobile-tabs').toggleClass('calculate-form__mobile-tabs_active')
    });

    $('.short-header__tab').on('click', function() {
        $(this).parent().find('.short-header__tab').siblings().removeClass('short-header__tab_active');
        $(this).addClass('short-header__tab_active');
        $('.services-tab-content, .projects-tab-content, .products-tab-content').fadeOut();

        if ($(this).hasClass('short-header__tab_physical')) {
            $('.services-tab-content_physical').fadeIn();
        }

        if ($(this).hasClass('short-header__tab_legal')) {
            $('.services-tab-content_legal').fadeIn();
            $('.objects__slider').slick('refresh');
        }

        if ($(this).hasClass('short-header__tab_industrial')) {
            !!$('.projects-tab-content_industrial').length ? $('.projects-tab-content_industrial').fadeIn() : $('.products-tab-content_industrial').fadeIn();
        }

        if ($(this).hasClass('short-header__tab_private')) {
            !!$('.projects-tab-content_private').length ? $('.projects-tab-content_private').fadeIn() : $('.products-tab-content_private').fadeIn();
        }
    });

    let card = document.createElement('a');
    card.className = 'projects-list__card';
    card.setAttribute('href', '#');
    card.innerHTML = `<div class="projects-list__card-header" style="background-image: url(img/projects/project1.jpg)">
                                <p class="projects-list__card-date">17/01/2020</p>
                                <p class="projects-list__card-type">Водоподготовка</p>
                            </div>
                            <div class="projects-list__card-content">
                                <p class="projects-list__card-title">
                                    СНТ "Машиностроитель"
                                </p>
                                <p class="projects-list__card-desc">
                                    Установка системы водоподготовки
                                </p>
                                <p class="projects-list__card-text">
                                    Перед началом соответствующих работ в воде наблюдалось повышенное содержание железа (8 единиц)
                                </p>
                                <svg class="projects-list__card-arr" width="27" height="24" viewBox="0 0 27 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M26.0607 13.0607C26.6464 12.4749 26.6464 11.5251 26.0607 10.9393L16.5147 1.3934C15.9289 0.807611 14.9792 0.807611 14.3934 1.3934C13.8076 1.97919 13.8076 2.92893 14.3934 3.51472L22.8787 12L14.3934 20.4853C13.8076 21.0711 13.8076 22.0208 14.3934 22.6066C14.9792 23.1924 15.9289 23.1924 16.5147 22.6066L26.0607 13.0607ZM0 13.5L25 13.5V10.5L0 10.5L0 13.5Z" fill="#FED361" />
                                </svg>
                            </div>`;

    let cards = $();

    for (let i = 0; i < 4; i++) {
        cards = cards.add($(card).clone());
    }

    $('.projects__load-btn_industrial').on('click', function() {
        let lastCard = $(this).closest('.projects-list').find('.projects-list__table').find('.projects-list__card:last')
        let offset = lastCard.offset().top + lastCard.outerHeight()
        $(this).closest('.projects-list').find('.projects-list__table').append(cards);
        $('html, body').animate({ scrollTop: offset }, 800);

    })

    if ($(window).width() < 640 && $('.short-header__tabs').length) {
        $('.short-header__tabs').slick({
            slidesToShow: 1.5,
            slidesToScroll: 1,
            focusOnSelect: true,
            variableWidth: true,
            infinite: false,
            arrows: false,
            responsive: [{
                breakpoint: 375,
                settings: {
                    slidesToShow: 1.3,
                }
            }, ]
        });
    }

    // function trunc(n) {
    //     // return .substr(0, n - 1) + (this.length > n ? '…' : '');
    // };

    function truncText(selector, len) {
        console.log(selector, len)
        if ($(selector).length > 0) {

            $(selector).each(function(i, item) {
                console.log(selector, $(item).text().trim().length)
                let shortText = ''
                if ($(item).text().trim().length > len) {
                    shortText = $(item).text().trim().substr(0, len - 1) + '…';
                    $(item).text(shortText)
                }
            });
        }
    }

    truncText('.objects__slide-desc', 150);
    truncText('.service__desc', 140);
    truncText('.articles__slide-desc', 210);
    truncText('.feedback__slide-message', 700);
    truncText('.projects-list__card-text', 180);
    truncText('.articles-list__article-desc', 115);
    truncText('.articles-list__article-title', 80);
    truncText('.more-articles__slide-desc', 150);

    if ($(window).width() < 640) {
        truncText('.articles-list__article-desc', 80);
    }

    if ($(window).width() < 370) {
        truncText('.more-articles__slide-desc', 120);
    }

    $('.back-btn').on('click', function() {
        console.log(history)
        history.back();
    })

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


    let scrollPrev = 0;

    $(window).scroll(function() {
        var scrolled = $(window).scrollTop();

        if (scrolled > 60 && scrolled > scrollPrev) {
            $('.header__menu').removeClass('header__menu_mobile-active');
            $('.header__menu').addClass('header__menu_hidden');

        } else {
            $('.header__menu').removeClass('header__menu_hidden');
        }
        scrollPrev = scrolled;
    });

    // PROJECT PAGE

    if ($('.project__slider').length) {
        $('.project__slider').on('init', function(event, slick) {
            $('.project__slider-total').text(slick.slideCount);
        });

        $('.project__slider').slick({
            slidesToShow: 1,
            slidesToScroll: 1,
            infinite: false,
            arrows: true,
            prevArrow: $('.project__slider-arr_left'),
            nextArrow: $('.project__slider-arr_right'),
        });

        $('.project__slider').on('afterChange', function(event, slick, currentSlide, nextSlide) {
            $('.project__slider-cur').text(currentSlide + 1);
        });

        if ($(window).width() < 640) {
            let navCount = $('.project__slider-count');
            navCount.detach();
            $('.project__slider-arr_left').after(navCount);
        }
    }

    if ($('.other-projects__slider').length) {
        $('.other-projects__slider').slick({
            slidesToShow: 4,
            slidesToScroll: 1,
            infinite: false,
            arrows: false,
            responsive: [{
                    breakpoint: 860,
                    settings: {
                        slidesToShow: 3.1,
                    }
                },
                {
                    breakpoint: 640,
                    settings: {
                        slidesToShow: 2.3,
                    }
                },
                {
                    breakpoint: 470,
                    settings: {
                        slidesToShow: 1.3,
                    }
                },
                {
                    breakpoint: 375,
                    settings: {
                        slidesToShow: 1.2,
                    }
                },
            ]
        });


    }

    // PRODUCTS PAGE

    $('.products__view-btn').on('click', function() {
        $(this).siblings().removeClass('products__view-btn_active');
        $(this).addClass('products__view-btn_active');

        if ($(this).hasClass('products__view-btn_list')) {
            $('.products__table').addClass('products__table_list');
        } else {
            $('.products__table').removeClass('products__table_list');
        }
    });

    if (('.products__sorting').length) {
        $('.products__sorting').on('click', function() {
            $(this).toggleClass('products__sorting_active');
            $('.products__filter').removeClass('products__filter_active');
        });

        $('.products__sorting-tab').on('click', function() {
            if (!$(this).hasClass('.products__sorting-tab_initial')) {
                let activeTab = $(this).detach();
                $('.products__sorting-tab_initial').remove();
                $('.products__sorting').prepend(activeTab);
                $(this).addClass('products__sorting-tab_active');
                $(this).siblings().removeClass('products__sorting-tab_active');
            }
        });

        $('.products__filter').on('click', function() {
            $(this).toggleClass('products__filter_active');
            $('.products__sorting').removeClass('products__sorting_active');
        });

        $('.products__filter-tab').on('click', function() {
            if (!$(this).hasClass('.products__filter-tab_initial')) {
                let activeTab = $(this).detach();
                $('.products__filter-tab_initial').remove();
                $('.products__filter').prepend(activeTab);
                $(this).addClass('products__filter-tab_active');
                $(this).siblings().removeClass('products__filter-tab_active');
            }
        });
    }

    // ARTICLES PAGE

    if (('.articles-list__sorting').length) {
        $('.articles-list__sorting').on('click', function() {
            $(this).toggleClass('articles-list__sorting_active');
            $('.articles-list__filter').removeClass('articles-list__filter_active');
        });

        $('.articles-list__sorting-tab').on('click', function() {
            if (!$(this).hasClass('.articles-list__sorting-tab_initial')) {
                let activeTab = $(this).detach();
                $('.articles-list__sorting-tab_initial').remove();
                $('.articles-list__sorting').prepend(activeTab);
                $(this).addClass('articles-list__sorting-tab_active');
                $(this).siblings().removeClass('articles-list__sorting-tab_active');
            }
        });

        $('.articles-list__filter').on('click', function() {
            $(this).toggleClass('articles-list__filter_active');
            $('.articles-list__sorting').removeClass('articles-list__sorting_active');
        });

        $('.articles-list__filter-tab').on('click', function() {
            if (!$(this).hasClass('.articles-list__filter-tab_initial')) {
                let activeTab = $(this).detach();
                $('.articles-list__filter-tab_initial').remove();
                $('.articles-list__filter').prepend(activeTab);
                $(this).addClass('articles-list__filter-tab_active');
                $(this).siblings().removeClass('articles-list__filter-tab_active');
            }
        });
    }

    // ARTICLE PAGE

    if ($('.more-articles__slider').length) {
        $('.more-articles__slider').slick({
            slidesToShow: 4,
            slidesToScroll: 1,
            infinite: false,
            arrows: true,
            prevArrow: $('.more-articles__nav-arr_left'),
            nextArrow: $('.more-articles__nav-arr_right'),
            responsive: [{
                    breakpoint: 1024,
                    settings: {
                        slidesToShow: 3.3,
                    }
                }, {
                    breakpoint: 860,
                    settings: {
                        slidesToShow: 2.5,
                    }
                },
                {
                    breakpoint: 640,
                    settings: {
                        slidesToShow: 2.3,
                    }
                },
                {
                    breakpoint: 565,
                    settings: {
                        slidesToShow: 1.7,
                    }
                },
                {
                    breakpoint: 470,
                    settings: {
                        slidesToShow: 1.3,
                    }
                },
                {
                    breakpoint: 375,
                    settings: {
                        slidesToShow: 1,
                    }
                },
            ]
        });
    }
});