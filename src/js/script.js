$(document).ready(function() {

    // COMMON

    toggleHoveredClass([$('.services__service'),
            $('.objects__slide'),
            $('.articles__slide'),
            $('.products__card'),
            $('.cart-list__card')
        ],
        'hovered');

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
    });

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
        let data = $(this).serializeArray();

        if (validateCalculationForm($(this))) {
            $.ajax({
                type: "POST",
                dataType: 'json',
                data: data,
                url: 'http://vodprom.asap-lp.ru/php/mail_vodoprom_for_individuals.php',
                beforeSend: function() {
                    $('.calculate-form__send-btn_physical').attr('disabled', 'disabled');
                    $('.calculate-form__content-error').removeClass('calculate-form__content-error_active');
                },
                success: (data) => {
                    $('.calculate-form__send-btn_physical').removeAttr('disabled');
                    showModal($('.modal_success'));
                    $('.calculate-form__radio-input-container')
                        .removeClass('calculate-form__input-container_checked');
                    $('.calculate-form__checkbox-input-container')
                        .removeClass('calculate-form__input-container_checked');
                    $('.calculate-form__checkbox-input').removeAttr('checked');
                    $(this)[0].reset();
                    setTimeout(() => {
                        $('.modal_success').removeClass('modal_active');
                        $('.overlay').removeClass('overlay_active');
                    }, 2000);
                },
                error(error) {
                    $('.calculate-form__content-error').addClass('calculate-form__content-error_active');
                    $('.calculate-form__send-btn_physical').removeAttr('disabled');
                    console.log(error);
                }
            });
        }
    });

    $('.modal__close').on('click', function() {
        $(this).closest('.modal').removeClass('modal_active');
        $('.overlay').removeClass('overlay_active');
    });

    $('.overlay').on('click', function() {
        $('.overlay').removeClass('overlay_active');
        $('.modal').removeClass('modal_active');
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

        if ($(this).hasClass('short-header__tab_goods')) {
            $('.cart-list').removeClass('cart-list_active');
            if ($('.cart-list_goods').length) {
                $('.cart-list_goods').addClass('cart-list_active');
            } else {
                $('.cart-list_services').addClass('cart-list_active');
            }
        }

        if ($(this).hasClass('short-header__tab_services')) {
            $('.cart-list').removeClass('cart-list_active');
            if ($('.cart-list_services').length) {
                $('.cart-list_services').addClass('cart-list_active');
            } else {
                $('.cart-list_goods').addClass('cart-list_active');

            }

        }
    });

    if ($(window).width() < 640 && $('.short-header__tabs').length) {
        initShortHeaderSlider();
    }

    function initShortHeaderSlider() {
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

    $(window).on('resize', function() {
        initFeedbackSlider();

        if ($(window).width() < 640) {
            initShortHeaderSlider();
        }
    });

    truncText('.objects__slide-desc', 150);
    truncText('.service__desc', 140);
    truncText('.articles__slide-desc', 210);
    truncText('.feedback__slide-message', 700);
    truncText('.projects-list__card-text', 150);
    truncText('.articles-list__article-desc', 115);
    truncText('.articles-list__article-title', 80);
    truncText('.more-articles__slide-desc', 150);

    $('.back-btn').on('click', function() {
        history.back();
    });

    if ($('#map').length) {
        initMap();
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

    $('.make-order__input').on('focus', function() {
        $(this).removeClass('make-order__input_error');
    });

    $('.make-order__policy-label').on('click', function() {
        $('.make-order__policy').removeClass('make-order__input_error');
        if (!document.querySelector('.make-order__policy').checked) {
            $(this).parent().addClass('make-order__checkbox-container_checked')
        } else {
            $(this).parent().removeClass('make-order__checkbox-container_checked')
        }
    });

    $('.modal-form__input').on('focus', function() {
        $(this).removeClass('modal-form__input_error');
    });

    $('.rates__card-order, .pricelist__btn, .service__btn').on('click', function() {
        showModal($('.modal_order'));

        let serviceInput = $('.modal_order').find('.modal-form__input_service');

        if ($(this).hasClass('rates__card-order')) {
            serviceInput.attr('value', $(this).closest('.rates__card').find('.rates__card-title').text());
        }

        if ($(this).hasClass('pricelist__btn')) {
            serviceInput.attr('value', $(this).closest('.pricelist__table-row').find('.pricelist__service').text());
        }

        if ($(this).hasClass('service__btn')) {
            serviceInput.attr('value', $(this).closest('.services__service').find('.service__title').text());
        }
    });

    if ($('.modal_order').length) {
        let orderForm = document.querySelector('.modal__form_order');

        orderForm.addEventListener('change', (e) => {
            if (e.target.getAttribute('type') === 'file') {
                $('.modal-form__docs-count').text(`Загружено ${e.target.files.length} файла(ов)`)
            }
        });

        orderForm.addEventListener('submit', function(e) {
            e.preventDefault();
            formValidate({
                form: orderForm,
                url: 'YOUR URL',
                errorClass: 'modal-form__input_error',
                onLoadStart: () => {
                    console.log('load start');
                },
                onSuccess: () => {
                    console.log('success');
                },
                onError: () => {
                    console.log('error')
                }
            });
        });
    }


    // INDEX PAGE

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

    if ($('.video__video').length) {

        initFeedbackSlider();

        let link = $('.video__video').attr('data-src');
        let embedLink = createYouTubeEmbedLink(link);
        let previewPic = createYouTubePicPreview(embedLink);

        $('.video__thumb').css({ 'background-image': `url(${previewPic}` });


        $('.video__video').on('click', function() {
            let link = $('.video__video').attr('data-src');
            let embedLink = createYouTubeEmbedLink(link);
            $('.video__video').append(`<iframe class="video__iframe" src="${embedLink}" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>`)
            $('.video__playbtn').css({ 'opacity': 0, 'visibility': 'hidden' });
        });


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

    // SERVICES PAGE

    $('.tenders__btn').on('click', function() {
        showModal($('.modal_tender'))
    });

    if ($('.modal_tender').length) {
        let tenderForm = document.querySelector('.modal__form_tender');

        tenderForm.addEventListener('change', (e) => {
            if (e.target.getAttribute('type') === 'file') {
                $('.modal-form__docs-count').text(`Загружено ${e.target.files.length} файла(ов)`)
            }
        });

        tenderForm.addEventListener('submit', function(e) {
            e.preventDefault();
            formValidate({
                form: tenderForm,
                url: 'YOUR URL',
                errorClass: 'modal-form__input_error',
                onLoadStart: () => {
                    console.log('load start');
                },
                onSuccess: () => {
                    console.log('success');
                },
                onError: () => {
                    console.log('error')
                }
            });
        });
    }

    // PROJECTS PAGE

    if ($('.projects-list').length) {
        let offsets = {
            industrialOffset: 3
        }
    $('.projects__load-btn_industrial').on('click', function() {
        $.ajax({
            url: 'assets/components/ajax-loading/AJAX.php',
            type: 'GET',
            dataType: 'json',
            data: {
                offset: offsets.industrialOffset
            },
            success: function(data) {
                if(data.success) {
                    if(data.html) {
                        $('.projects-tab-content_industrial').find('.projects-list__table').append(data.html);
                        offsets.industrialOffset += 3;
                    } else {
                        $('.projects__load-btn_industrial').hide()
                    }
                } 
            }
        })
    });
        // $('.projects__load-btn_industrial').on('click', function() {
        //     let lastCard = $(this).closest('.projects-list').find('.projects-list__table').find('.projects-list__card:last')
        //     let offset = lastCard.offset().top + lastCard.outerHeight()
        //     $(this).closest('.projects-list').find('.projects-list__table').append(cards);
        //     $('html, body').animate({ scrollTop: offset }, 800);
        // })
    }

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

        if ($(window).width() < 860) {
            let downloadBtn = $('.products__download-btn').detach();
            $('.products-wrapper').prepend(downloadBtn);
        }

        $('.products__card').on('click', function(e) {
            if($(e.target).hasClass('products__card-order-btn')) {
                console.log(1)
                e.stopPropagation();
                return;
            }
        });
    }

    // ARTICLES PAGE

    if ($('.articles-list').length) {
        if ($(window).width() < 640) {
            truncText('.articles-list__article-desc', 80);
        }

        if ($(window).width() < 370) {
            truncText('.more-articles__slide-desc', 120);
        }

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
                        slidesToShow: 1.2,
                    }
                },
            ]
        });
    }

    // PRODUCT PAGE

    if ($('.more-products__slider').length) {
        $('.more-products__slider').slick({
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

        $('.product-info__full-tab').on('click', function() {
            $(this).parent().find('.product-info__full-tab').siblings().removeClass('product-info__full-tab_active');
            $(this).addClass('product-info__full-tab_active');
            $('.product-info__full-tab-content').fadeOut();

            if ($(this).hasClass('product-info__full-tab_features')) {
                setTimeout(() => {
                    $('.product-info__full-tab-content_features').fadeIn();
                }, 200);
            }

            if ($(this).hasClass('product-info__full-tab_description')) {
                setTimeout(() => {
                    $('.product-info__full-tab-content_description').fadeIn();
                }, 200);
            }
        });
    }

    function aboutPageMobileRebase() {
        console.log(1)
        let membersCount = $('.about__members__nav-count').detach();
        let teamLabel = $('.about__members-team-label').detach();
        let nav = $('.about__members__nav').detach();

        $('.about__members').prepend(membersCount, teamLabel);
        $('.about__members-team').prepend(nav);
    }

    // ABOUT PAGE

    if ($('.about__members-slider').length) {
        $('.about__members-slider').on('init', function(event, slick) {
            $('.about__members__nav-total').text('0' + slick.slideCount);
        });

        $('.docs__license-slider a').simpleLightbox({});

        if ($(window).width() < 860) {
            aboutPageMobileRebase();
        }

        $('.about__members-slider').slick({
            slidesToShow: 1,
            slidesToScroll: 1,
            infinite: false,
            draggable: false,
            arrows: true,
            prevArrow: $('.about__members__nav-arr_left'),
            nextArrow: $('.about__members__nav-arr_right'),
            responsive: [{
                breakpoint: 860,
                settings: {
                    draggable: true,
                }
            }, ]
        });

        $('.about__members-slider').on('afterChange', function(event, slick, currentSlide, nextSlide) {
            $('.about__members__nav-cur').text(`0${currentSlide + 1}`);
        });

        $('.docs__license-slider').slick({
            slidesToShow: 5,
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
                        slidesToShow: 1.8,
                    }
                },
                {
                    breakpoint: 375,
                    settings: {
                        slidesToShow: 1.5,
                    }
                },
            ]
        });

        // $('.brands__slider').slick({
        //     slidesToShow: 3,
        //     slidesToScroll: 1,
        //     infinite: false,
        //     arrows: false,
        //     responsive: [{
        //             breakpoint: 860,
        //             settings: {
        //                 slidesToShow: 3.1,
        //             }
        //         },
        //         {
        //             breakpoint: 640,
        //             settings: {
        //                 slidesToShow: 2.3,
        //             }
        //         },
        //         {
        //             breakpoint: 470,
        //             settings: {
        //                 slidesToShow: 1.3,
        //             }
        //         },
        //         {
        //             breakpoint: 375,
        //             settings: {
        //                 slidesToShow: 1.2,
        //             }
        //         },
        //     ]
        // });

        $('.brands__brand').each((i, item) => {
            if (!$(item).find('img').attr('src')) {
                $(item).addClass('brands__brand_empty')
            }
        });

        if ($(window).width() < 470) {
            initBrandsSlider();
        }

        function initDocsTabsSlider() {
            $('.docs__tabs').slick({
                slidesToShow: 2,
                slidesToScroll: 1,
                focusOnSelect: true,
                variableWidth: true,
                infinite: false,
                arrows: false,
                responsive: [{
                        breakpoint: 565,
                        settings: {
                            slidesToShow: 1.8,
                        }
                    },
                    {
                        breakpoint: 375,
                        settings: {
                            slidesToShow: 1.3,
                        }
                    },
                ]
            });
        }


        function initBrandsSlider() {
            $('.brands__slider').slick({
                slidesToShow: 1.3,
                slidesToScroll: 1,
                infinite: false,
                arrows: false,
                responsive: [{
                    breakpoint: 470,
                    settings: {
                        slidesToShow: 1.2,
                    }
                }, ]
            });
        }
    }

    // CART PAGE

    $('.popup').on('click', function() {
        $(this).removeClass('popup_active');
    });

    if ($('.cart').length) {
        if($('.cart').find('.success-order').length > 0
            || $('.cart').find('.alert-warning').length > 0) {

            $('.make-order').hide();
            $('.footer').css({'position': 'fixed', 'bottom': '0', 'left': '0'});
        } else {
            $('.make-order').show();
            $('.footer').css({});
        }

        if($('.cart-list__card').length) {
            let form = document.querySelector('.make-order__order-form');

        // $('.ajax_form_offer').submit(function(e){
        //     e.preventDefault();
        //     var msg = $(this).serialize();
        //     var url = $(this).attr("action");
        //     $.ajax({
        //         type: "POST",
        //         url: url,
        //         data: msg,
        //         dataType: "json",
        //         success: function(data){
        //             if(data.success){
        //                 miniShop2.Message.success(data.message);
        //             }else{
        //                 miniShop2.Message.error(data.message);
        //             }
        //         }
        //     })
        // });

        form.addEventListener('submit', function(e) {
            // e.preventDefault();
            // formValidate({
            //     form: form,
            //     url: 'YOUR URL',
            //     errorClass: 'make-order__input_error',
            //     onLoadStart: () => {
            //         console.log('load start');
            //     },
            //     onSuccess: () => {
            //         console.log('success');
            //     },
            //     onError: () => {
            //         console.log('error')
            //     }
            // });
        });

        $('.cart-list__card-delete-btn, .cart-list__card-control').on('click', function(e) {
            e.stopPropagation();
        });

        $('.cart-list__card-control_amount').on('focus', function(e) {
            e.preventDefault();
            e.stopPropagation();
        });

        $('.cart-list__card-control_plus').on('click', function(e) {

            let amount = $(this).closest('.cart-list__card-controls').find($('.cart-list__card-control_amount'));
            console.log(amount)
            amount.val(+amount.val() + 1);
        });

        $('.cart-list__card-control_minus').on('click', function(e) {
            let amount = $(this).closest('.cart-list__card-controls').find($('.cart-list__card-control_amount'));
            console.log(amount)
            if (+amount.val() > 1) {
                amount.val(+amount.val() - 1);
            }
        });

        $('.make-order__input').on('focus', function() {
            $(this).removeClass('make-order__input_error');
        });

        $('.make-order__policy-label').on('click', function() {
            $('.make-order__policy').removeClass('make-order__input_error');
            if (!document.querySelector('.make-order__policy').checked) {
                $(this).parent().addClass('make-order__checkbox-container_checked')
            } else {
                $(this).parent().removeClass('make-order__checkbox-container_checked')
            }
        });
        }
        
    }

    // FUNCTIONS

    function formatPrice(elem, addText) {
        elem.text(parseFloat(elem.text()).toLocaleString() + ' ' + addText);
    };

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
    };

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
    };

    function truncText(selector, len) {
        if ($(selector).length > 0) {
            $(selector).each(function(i, item) {
                let shortText = ''
                if ($(item).text().trim().length > len) {
                    shortText = $(item).text().trim().substr(0, len - 1) + '…';
                    $(item).text(shortText)
                }
            });
        }
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
                    iconImageHref: 'assets/img/icons/marker.png',
                    iconLayout: 'default#image',

                });

            myMap.geoObjects.add(myPlacemark);
            myMap.container.fitToViewport();

            //     myMap.balloon.open([51.530897894033940,46.000697894033940], "Астраханская улица, 43к2", {
            //     // Опция: не показываем кнопку закрытия.
            //     closeButton: false
            // });
        });
    };

    function validateCalculationForm(form) {
        let errors = new Set();
        let radioTable = $('.calculate-form__checkbox-table:first');
        let checkboxTable = $('.calculate-form__checkbox-table:last');
        let inputs = $('.calculate-form__inputs-input-container');
        let contactInputs = $('.calculate-form__message-input');

        if (!radioTable.find($('.calculate-form__checkbox-input:checked')).length) {
            radioTable.addClass('calculate-form_error');
            errors.add('radio');
        } else {
            radioTable.removeClass('calculate-form_error');
        }

        if (!checkboxTable.find($('.calculate-form__checkbox-input:checked')).length) {
            checkboxTable.addClass('calculate-form_error');
            errors.add('checkbox');
        } else {
            checkboxTable.removeClass('calculate-form_error');
        }

        inputs.each((i, item) => {
            let input = $(item).find($('.calculate-form__input-input'));
            if (input.val() === '') {
                $(item).addClass('calculate-form_error');
                errors.add('input');
            } else {
                $(item).removeClass('calculate-form_error');
            }
        });

        if ($('.calculate-form__message-textarea').val() === '') {
            $('.calculate-form__message-textarea').addClass('calculate-form_error');
            errors.add('textarea');
        } else {
            $('.calculate-form__message-textarea').removeClass('calculate-form_error');
        };

        contactInputs.each((i, item) => {
            let input = $(item).find($('.calculate-form__input-input'));
            if ($(item).val() === '') {
                $(item).addClass('calculate-form_error');
                errors.add('input');
            } else {
                $(item).removeClass('calculate-form_error');
            }
        });

        return !(!!errors.size);
    };

    function showModal(modal) {
        $('.overlay').addClass('overlay_active');
        modal.addClass('modal_active');
    }
});