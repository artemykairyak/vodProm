$(document).ready(function() {

    // COMMON

    toggleHoveredClass([$('.services__service'),
            $('.objects__slide'),
            $('.articles__slide'),
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
        movingActive('.calculate-form__header', 'calculate-form__tab_active', '.calculate-form__line');
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
                    $('.calculate__form').removeClass('calculate__form_active');
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
            if ($('.projects-tab-content_industrial').length > 0) {
                $('.projects-tab-content_industrial').fadeIn();

            } else {
                $('.filters__filter_private').hide();
                $('.filters__filter_industrial').show();
                $('.products-tab-content_industrial').fadeIn();
            }
        }

        if ($(this).hasClass('short-header__tab_private')) {
            if ($('.projects-tab-content_private').length > 0) {

                $('.projects-tab-content_private').fadeIn()
            } else {
                $('.filters__filter_industrial').hide();
                $('.filters__filter_private').show();
                $('.products-tab-content_private').fadeIn();
            }
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

    function changeCategory(parent, child) {
        let parentHeight = parent.height();
        parent.css('height', parentHeight);
        let children = child.fadeOut();
        setTimeout(() => {
            children.remove();
            parent.css('height', 'auto')
        }, 300)
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
    truncText('.feedback__slide-text p', 700);
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
                url: 'http://vodprom.asap-lp.ru/php/mail_order_form.php',
                errorClass: 'modal-form__input_error',
                onLoadStart: () => {
                    $('.modal-form__send-btn').attr('disabled', 'disabled');
                },
                onSuccess: () => {
                    $('.modal_order').removeClass('modal_active');
                    showModal($('.modal_success'));
                    setTimeout(() => {
                        $('.modal_success').removeClass('modal_active')
                        $('.overlay').removeClass('overlay_active');
                    }, 1500);
                    $('.modal-form__send-btn').removeAttr('disabled');
                },
                onError: () => {
                    $('.modal-form__send-btn').removeAttr('disabled');
                }
            });
        });
    }

    function movingActive(parent, activeElem, line) {
        if ($(window).width() > 640 || parent == '.product-info__full-tabs') {
            let item = $(parent).children('button:not(.calculate-form__back-btn)');

            function activeChange() {
                let offsetBody = $(parent).offset().left,
                    widthItem = $(item).filter(`.${activeElem}`).width(),
                    offsetItem = $(item).filter(`.${activeElem}`).offset().left - offsetBody;
                if (offsetItem < 0) {
                    offsetItem = 0
                } else {
                    $(line).css({
                        "width": widthItem,
                        "left": offsetItem
                    });

                }
            }
            $(item).on('click', function() {
                activeChange();
            });
            setTimeout(function() {
                activeChange();
                $(line).css({
                    'display': 'block'
                })
            }, 200);
        }
    }

    if ($('.short-header__tabs').length > 0) {
        movingActive('.short-header__tabs', 'short-header__tab_active', '.short-header__line');
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
                url: 'http://vodprom.asap-lp.ru/php/mail_tender_form.php',
                errorClass: 'modal-form__input_error',
                onLoadStart: () => {
                    $('.modal-form__send-btn').attr('disabled', 'disabled');
                },
                onSuccess: function() {
                    $('.modal_order').removeClass('modal_active');
                    showModal($('.modal_success'));
                    setTimeout(() => {
                        $('.modal_success').removeClass('modal_active')
                        $('.overlay').removeClass('overlay_active');
                    }, 1500);
                    $('.modal-form__send-btn').removeAttr('disabled');
                },
                onError: function() {
                    $('.modal-form__send-btn').removeAttr('disabled');
                }
            });
        });
    }

    // PROJECTS PAGE

    if ($('.projects-list').length) {
        let offsets = {
            industrialOffset: 4,
            privateOffset: 4
        }
        $('.projects__load-btn_industrial').on('click', function() {
            $.ajax({
                url: 'http://vodprom.asap-lp.ru/ajax-projects.html',
                type: 'GET',
                dataType: 'json',
                data: {
                    offset: offsets.industrialOffset,
                    sortdir_tv: 'desc'
                },
                success: function(data) {
                    if (data.success) {
                        if (data.html) {
                            let lastCard = $('.projects-tab-content_industrial .projects-list__card:last');
                            let offset = lastCard.offset().top + lastCard.outerHeight();

                            $('.projects-tab-content_industrial').find('.projects-list__table').append(data.html);
                            offsets.industrialOffset += 4;
                            if ($('.projects-tab-content_industrial .projects-list__card').length === data.count) {
                                $('.projects__load-btn_industrial').hide()
                            }
                            truncText('.projects-list__card-text', 150);

                            $('html, body').animate({ scrollTop: offset }, 800);
                        }
                    }
                },
                error: function(error) {
                    console.log(error)
                }
            })
        });
        $('.projects__load-btn_private').on('click', function() {
            $.ajax({
                url: 'http://vodprom.asap-lp.ru/ajax-private-house.html',
                type: 'GET',
                dataType: 'json',
                data: {
                    offset: offsets.privateOffset,
                    sortdir_tv: 'desc'
                },
                success: function(data) {
                    if (data.success) {
                        if (data.html) {
                            let lastCard = $('.projects-tab-content_private .projects-list__card:last');
                            let offset = lastCard.offset().top + lastCard.outerHeight();
                            $('.projects-tab-content_private').find('.projects-list__table').append(data.html);
                            offsets.privateOffset += 4;
                            if ($('.projects-tab-content_private .projects-list__card').length === data.count) {
                                $('.projects__load-btn_private').hide()
                            }
                            truncText('.projects-list__card-text', 150);
                            $('html, body').animate({ scrollTop: offset }, 800);
                        }
                    }
                },
                error: function(error) {
                    console.log(error)
                }
            })
        })
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

    function convertQueryParamsToObject(queryString) {
        var params = queryString.substr(1).split('&');
        var paramsObj = {},
            i, param;

        if (params !== "") {
            for (i = 0; i < params.length; i += 1) {
                param = params[i].split('=');
                if (param.length === 2) {
                    paramsObj[param[0]] =
                        decodeURIComponent(param[1].replace(/\+/g, " "));
                }
            }
        }

        return paramsObj;
    }

    function createHash(offset, sortBy, sortDir, categoryId, parentId, type, pageClass) {
        let offsetValue = offset || 0,
            sortByValue = sortBy || '',
            sortDirValue = sortDir || '',
            categoryIdValue = categoryId || '',
            parentIdValue = parentId || '',
            typeValue = type,
            pageClassValue = pageClass;
        let queryString = `offset=${offsetValue}&sort_by=${sortByValue}&sort_dir=${sortDirValue}&category_id=${categoryIdValue}&parent_id=${parentIdValue}&type=${typeValue}&class=${pageClassValue}`;
        window.location.hash = '';
        window.location.hash = queryString;
    }

    // PRODUCTS PAGE
    if ($('.products-container').length > 0) {
        let offsets = {
            industrialOffset: 6,
            privateOffset: 6,
        }
        let categoryId = $('.filters__filter_active').attr('data-category');
        let sortBy = $('.products__sorting-tab_active').attr('data-sortby');
        let sortDir = $('.products__sorting-tab_active').attr('data-sortdir');
        let curPage = 1;
        let pageClass = 'products__pagination_industrial';

        $('.short-header__tab').on('click', function() {
            categoryId = '';
            curPage = 1;

            $('.filters__filter').removeClass('filters__filter_active');
            $('.products__filter-tab').removeClass('products__filter-tab_active')
            if ($('.short-header__tab_active').attr('data-parent') == 61) {
                pageClass = 'products__pagination_industrial';
                sendAJAX();
                $('.products__filter-tab_private').hide();
                $('.products__filter-tab_industrial').show();
                changeCategory($('.products__table_industrial'), $('.products__table_industrial .products__card'));
            } else {
                pageClass = 'products__pagination_private';
                sendAJAX();
                $('.products__filter-tab_private').show();
                $('.products__filter-tab_industrial').hide();
                changeCategory($('.products__table_private'), $('.products__table_private .products__card'));
            }
        });

        $('.filters__filter').on('click', function() {
            $(this).addClass('filters__filter_active');
            $(this).siblings().removeClass('filters__filter_active');
            categoryId = $('.filters__filter_active').attr('data-category');
            curPage = 1;

            if ($('.short-header__tab_active').attr('data-parent') == 61) {
                pageClass = 'products__pagination_industrial';
                sendAJAX();
                changeCategory($('.products__table_industrial'), $('.products__table_industrial .products__card'));
            } else {
                pageClass = 'products__pagination_private';
                sendAJAX();
                changeCategory($('.products__table_private'), $('.products__table_private .products__card'));
            }
        });

        $('.products__filter-tab').on('click', function() {
            if (!$(this).hasClass('.products__filter-tab_initial')) {
                let activeTab = $(this).detach();
                $('.products__filter-tab_initial').remove();
                $('.products__filter').prepend(activeTab);
                $(this).addClass('products__filter-tab_active');
                $(this).siblings().removeClass('products__filter-tab_active');
            }

            curPage = 1;
            if ($('.short-header__tab_active').attr('data-parent') == 61) {
                pageClass = 'products__pagination_industrial';
                // sendMobileAJAX();
                categoryId = $('.products__filter-tab_active').attr('data-category');
                sendAJAX();
                changeCategory($('.products__table_industrial'), $('.products__table_industrial .products__card'));
            } else {
                pageClass = 'products__pagination_private';
                categoryId = $('.products__filter-tab_active').attr('data-category');
                // sendMobileAJAX();
                sendAJAX();
                changeCategory($('.products__table_private'), $('.products__table_private .products__card'));
            }


        });

        let firstLoad = false;

        function readFromHash() {
            firstLoad = true;
            let url = new URL(window.location.href);
            let params = convertQueryParamsToObject(url.hash);
            sortDir = params.sort_dir;
            sortBy = params.sort_by;
            selectActiveSort(sortBy, sortDir);
            selectActiveCategory(params.category_id);
            sendAJAX(params);

        }

        if (window.location.hash) {
            readFromHash();
        }

        function selectActiveSort(sort_by, sort_dir) {
            if (sort_by && sort_dir) {
                let activeTab = $(`.products__sorting-tab[data-sortby = ${sort_by}][data-sortdir = ${sort_dir}]`).detach();
                $('.products__sorting-tab_initial').remove();
                $('.products__sorting').prepend(activeTab);
                $(activeTab).addClass('products__sorting-tab_active');
                $(activeTab).siblings().removeClass('products__sorting-tab_active');
            }
        }

        function selectActiveCategory(category_id) {
            if (category_id) {
                if ($(window).width() > 860) {
                    let desktopActiveCategory = $(`.filters__filter[data-category = ${category_id}]`);
                    $(desktopActiveCategory).addClass('filters__filter_active');
                    $(desktopActiveCategory).siblings().removeClass('filters__filter_active');
                } else {
                    let mobileActiveCategory = $(`.products__filter-tab[data-category = ${category_id}]`).detach();
                    $('.products__filter-tab_initial').remove();
                    $('.products__filter').prepend(mobileActiveCategory);
                    $(mobileActiveCategory).addClass('products__filter-tab_active');
                    $(mobileActiveCategory).siblings().removeClass('products__filter-tab_active');
                }
            }
        }

        $('.products__load-btn').on('click', function() {
            if ($(this).hasClass('projects__load-btn_industrial')) {
                pageClass = 'products__pagination_industrial';

            } else {
                pageClass = 'products__pagination_private';
            }
            curPage = curPage + 1;
            sendMobileAJAX();
        })

        // function sendMobileAJAX(hashParams) {
        //     let data = {};
        //     if (hashParams) {
        //         data = hashParams;
        //         categoryId = hashParams.category_id;

        //     } else {
        //         createHash(offsets.industrialOffset * (curPage - 1),
        //             sortBy, sortDir, categoryId, $('.short-header__tab_active').attr('data-parent'),
        //             'pdoPage', pageClass);
        //         data = {
        //             offset: offsets.industrialOffset * (curPage - 1),
        //             sort_by: sortBy,
        //             sort_dir: sortDir,
        //             category_id: categoryId,
        //             parent_id: $('.short-header__tab_active').attr('data-parent'),
        //             type: 'pdoPage',
        //             'class': pageClass
        //         }
        //     }
        //     $.ajax({
        //         url: 'http://vodprom.asap-lp.ru/ajax-products.html',
        //         type: 'GET',
        //         dataType: 'json',
        //         data: data,
        //         success: function(data) {
        //             if (data.success) {
        //                 if (data.html) {
        //                     // changeNav(data.nav);
        //                     if ($('.short-header__tab_active').attr('data-parent') == 61) {
        //                         if (firstLoad) {
        //                             $('.products__table_industrial').html(data.html);
        //                         } else {
        //                             $('.products__table_industrial').append(data.html);
        //                         }

        //                         console.log($('.products__table_industrial .products__card').length, data.count);
        //                         console.log($('.products__table_industrial .products__card'))
        //                         if ($('.products__table_industrial .products__card').length === data.count) {
        //                             $('.projects__load-btn_industrial').hide()
        //                         } else {
        //                             $('.projects__load-btn_industrial').show();
        //                         }
        //                     } else {
        //                         $('.products__table_private').append(data.html);
        //                         if ($('.products__table_private .products__card').length === data.count) {
        //                             $('.projects__load-btn_private').hide()
        //                         } else {
        //                             $('.projects__load-btn_private').show();
        //                         }
        //                     }




        //                     // if (!!hashParams && hashParams.parent_id == 61) {
        //                     //     $('.short-header__tab').removeClass('short-header__tab_active');
        //                     //     $('.short-header__tab_industrial').addClass('short-header__tab_active');
        //                     //     movingActive('.short-header__tabs', 'short-header__tab_active', '.short-header__line');
        //                     //     if (!mobile) {
        //                     //         changeCategory($('.products__table_industrial'), $('.products__table_industrial .products__card'));
        //                     //         $('.products__table_industrial').append(data.html);
        //                     //         if (hashParams.offset > 0) {
        //                     //             changeNav(data.nav, (hashParams.offset / 6) + 1);
        //                     //         }
        //                     //     } else {
        //                     //         console.log('OFFSET', offsets)
        //                     //         let lastProduct = $('.products__table_industrial .products__card:last');
        //                     //         let scrollOffset = lastProduct.offset().top + lastProduct.outerHeight();
        //                     //         $('.articles-list__table').append(data.html);
        //                     //         if ($('.products__card').length === data.count) {
        //                     //             $('.articles-list__load-btn').hide()
        //                     //         }
        //                     //         $('.products__table_industrial').append(data.html);
        //                     //         $('html, body').animate({ scrollTop: scrollOffset }, 800);
        //                     //     }
        //                     // }

        //                     // if (!!hashParams && hashParams.parent_id == 63) {
        //                     //     $('.short-header__tab').removeClass('short-header__tab_active');
        //                     //     $('.short-header__tab_private').addClass('short-header__tab_active');
        //                     //     movingActive('.short-header__tabs', 'short-header__tab_active', '.short-header__line');
        //                     //     changeCategory($('.products__table_private'), $('.products__table_private .products__card'));
        //                     //     $('.products__table_private').append(data.html);
        //                     //     $('.products-tab-content_industrial').removeClass('products-tab-content_active');
        //                     //     $('.products-tab-content_private').addClass('products-tab-content_active');
        //                     //     if (hashParams.offset > 0) {
        //                     //         changeNav(data.nav, (hashParams.offset / 6) + 1);
        //                     //     }

        //                     //     $('.filters__filter_industrial').hide();
        //                     //     $('.filters__filter_private').show();
        //                     // }
        //                 }
        //             }
        //         },
        //         error: function(error) {
        //             console.log(error)
        //         }
        //     });
        // }

        function sendAJAX(hashParams) {
            let data = {};

            if (hashParams) {
                data = hashParams;
                categoryId = hashParams.category_id;
            } else {
                data = {
                    offset: offsets.industrialOffset * (curPage - 1),
                    sort_by: sortBy,
                    sort_dir: sortDir,
                    category_id: categoryId,
                    parent_id: $('.short-header__tab_active').attr('data-parent'),
                    type: 'pdoPage',
                    'class': pageClass
                }
            }
            createHash(offsets.industrialOffset * (curPage - 1),
                sortBy, sortDir, categoryId, $('.short-header__tab_active').attr('data-parent'),
                'pdoPage', pageClass);
            $.ajax({
                url: 'http://vodprom.asap-lp.ru/ajax-products.html',
                type: 'GET',
                dataType: 'json',
                data: data,
                success: function(data) {
                    if (data.success) {
                        if (data.html) {
                            changeNav(data.nav);
                            if ($('.short-header__tab_active').attr('data-parent') == 61) {
                                $('.products__table_industrial').append(data.html);
                            } else {
                                $('.products__table_private').append(data.html);
                            }

                            if (!!hashParams && hashParams.parent_id == 61) {
                                $('.short-header__tab').removeClass('short-header__tab_active');
                                $('.short-header__tab_industrial').addClass('short-header__tab_active');
                                movingActive('.short-header__tabs', 'short-header__tab_active', '.short-header__line');

                                changeCategory($('.products__table_industrial'), $('.products__table_industrial .products__card'));
                                $('.products__table_industrial').append(data.html);
                                if (hashParams.offset > 0) {
                                    changeNav(data.nav, (hashParams.offset / 6) + 1);
                                }
                            }

                            if (!!hashParams && hashParams.parent_id == 63) {
                                $('.short-header__tab').removeClass('short-header__tab_active');
                                $('.short-header__tab_private').addClass('short-header__tab_active');
                                movingActive('.short-header__tabs', 'short-header__tab_active', '.short-header__line');
                                changeCategory($('.products__table_private'), $('.products__table_private .products__card'));
                                $('.products__table_private').append(data.html);
                                $('.products-tab-content_industrial').removeClass('products-tab-content_active');
                                $('.products-tab-content_private').addClass('products-tab-content_active');
                                if (hashParams.offset > 0) {
                                    changeNav(data.nav, (hashParams.offset / 6) + 1);
                                }

                                $('.filters__filter_industrial').hide();
                                $('.filters__filter_private').show();
                            }
                        }
                    }
                },
                error: function(error) {
                    console.log(error)
                }
            });
        }

        function changeNav(nav, hashPage) {
            $('.products__pagination').remove();
            $('.products__table').after($(nav));
            $('.products__pagination .products__pagination-page').removeClass('products__pagination-page_active');
            $('.products__pagination .products__pagination-page').each((i, item) => {
                if (!hashPage && $(item).text() == curPage) {
                    $(item).addClass('products__pagination-page_active')
                }

                if ($(item).text() == hashPage) {
                    $(item).addClass('products__pagination-page_active')
                }
            })
        }

        $('.products-tab-content').on('click', function(e) {
            if ($(e.target).hasClass('products__pagination-page') ||
                $(e.target).hasClass('products__pagination-prev') ||
                $(e.target).parent().hasClass('products__pagination-next') ||
                $(e.target).parent().hasClass('products__pagination-prev') ||
                $(e.target).hasClass('products__pagination-next')) {
                curPage = $(e.target).attr('data-page');
                if ($('.short-header__tab_active').attr('data-parent') == 61) {
                    pageClass = 'products__pagination_industrial';
                    sendAJAX();
                    changeCategory($('.products__table_industrial'), $('.products__table_industrial .products__card'));
                } else {
                    pageClass = 'products__pagination_private';
                    sendAJAX();
                    changeCategory($('.products__table_private'), $('.products__table_private .products__card'));
                }
            }
        });

        $('.products__sorting-tab').on('click', function() {
            if (!$(this).hasClass('.products__sorting-tab_initial')) {
                let activeTab = $(this).detach();
                $('.products__sorting-tab_initial').remove();
                $('.products__sorting').prepend(activeTab);
                $(this).addClass('products__sorting-tab_active');
                $(this).siblings().removeClass('products__sorting-tab_active');

                sortBy = $('.products__sorting-tab_active').attr('data-sortby');
                sortDir = $('.products__sorting-tab_active').attr('data-sortdir');
            }
            if ($('.short-header__tab_active').attr('data-parent') == 61) {
                pageClass = 'products__pagination_industrial';
                sendAJAX();
                changeCategory($('.products__table_industrial'), $('.products__table_industrial .products__card'));
            } else {
                pageClass = 'products__pagination_private';
                sendAJAX();
                changeCategory($('.products__table_private'), $('.products__table_private .products__card'));
            }

        });

    }



    $('.products__view-btn').on('click', function() {
        $(this).siblings().removeClass('products__view-btn_active');
        $(this).addClass('products__view-btn_active');

        if ($(this).hasClass('products__view-btn_list')) {
            if ($('.short-header__tab_industrial').hasClass('short-header__tab_active')) {
                $('.products__table_industrial').css('height', $('.products__table_industrial').height());
                $('.products__table_industrial .products__card').fadeOut(200, function() {
                    $('.products__table').addClass('products__table_list');
                    setTimeout(() => {
                        $('.products__table_industrial .products__card').fadeIn(200);
                        $('.products__table_industrial').css('height', 'auto');
                    }, 100)
                })
            } else {
                $('.products__table_private .products__card').fadeOut(200, function() {
                    $('.products__table_private').css('height', $('.products__table_private').height());
                    $('.products__table').addClass('products__table_list');
                    setTimeout(() => {
                        $('.products__table_private .products__card').fadeIn(200);
                        $('.products__table_private').css('height', 'auto');
                    }, 100)
                })
            }
        } else {
            if ($('.short-header__tab_industrial').hasClass('short-header__tab_active')) {
                $('.products__table_industrial').css('height', $('.products__table_industrial').height());
                $('.products__table_industrial .products__card').fadeOut(200, function() {
                    $('.products__table').removeClass('products__table_list');
                    setTimeout(() => {
                        $('.products__table_industrial .products__card').fadeIn(200)
                        $('.products__table_industrial').css('height', 'auto');
                    }, 100)
                })
            } else {
                $('.products__table_private .products__card').fadeOut(200, function() {
                    $('.products__table_private').css('height', $('.products__table_private').height());
                    $('.products__table').removeClass('products__table_list');
                    setTimeout(() => {
                        $('.products__table_private .products__card').fadeIn(200)
                        $('.products__table_private').css('height', 'auto');
                    }, 100)
                })
            }
        }
    });

    if ($('.products__sorting').length) {
        $('.products__sorting').on('click', function() {
            $(this).toggleClass('products__sorting_active');
            $('.products__filter').removeClass('products__filter_active');
        });

        // $('.products__sorting-tab').on('click', function() {
        //     if (!$(this).hasClass('.products__sorting-tab_initial')) {
        //         let activeTab = $(this).detach();
        //         $('.products__sorting-tab_initial').remove();
        //         $('.products__sorting').prepend(activeTab);
        //         $(this).addClass('products__sorting-tab_active');
        //         $(this).siblings().removeClass('products__sorting-tab_active');
        //     }
        // });

        $('.products__filter').on('click', function() {
            $(this).toggleClass('products__filter_active');
            $('.products__sorting').removeClass('products__sorting_active');
        });

        if ($(window).width() < 860) {
            let downloadBtn = $('.products__download-btn').detach();
            $('.products-wrapper').prepend(downloadBtn);
        }

        $('.products__card').on('click', function(e) {
            if ($(e.target).hasClass('products__card-order-btn')) {
                e.stopPropagation();
                return;
            }
        });
    }

    // ARTICLES PAGE
    if ($('.articles-list__load-btn').length > 0) {
        let categoryId = $('.articles-list__category_active').attr('data-id');
        let sortDir = $('.articles-list__sorting-tab_active').attr('data-sort');
        let articlesOffset = 6;

        $('.articles-list__load-btn').on('click', function() {
            $.ajax({
                url: 'http://vodprom.asap-lp.ru/ajax-articles.html',
                type: 'GET',
                dataType: 'json',
                data: {
                    offset: articlesOffset,
                    sortdir_pub: sortDir,
                    category_id: categoryId
                },
                success: function(data) {
                    if (data.success) {
                        if (data.html) {
                            let lastArticle = $('.articles-list__article:last');
                            let offset = lastArticle.offset().top + lastArticle.outerHeight();
                            $('.articles-list__table').append(data.html);
                            articlesOffset += 6;
                            if ($('.articles-list__article').length === data.count) {
                                $('.articles-list__load-btn').hide()
                            }
                            truncText('.articles-list__article-desc', 115);
                            $('html, body').animate({ scrollTop: offset }, 800);
                        }
                    }
                },
                error: function(error) {
                    console.log(error)
                }
            })
        });

        $('.articles-list__sorting-tab').on('click', function() {
            if (!$(this).hasClass('articles-list__sorting-tab_initial')) {
                let activeTab = $(this).detach();
                $('.articles-list__sorting-tab_initial').remove();
                $('.articles-list__sorting').prepend(activeTab);
                $(this).addClass('articles-list__sorting-tab_active');
                $(this).siblings().removeClass('articles-list__sorting-tab_active');
                sortDir = $('.articles-list__sorting-tab_active').attr('data-sort');
            }

            changeCategory($('.articles-list__table'), $('.articles-list__article'));


            articlesOffset = 0;

            $.ajax({
                url: 'http://vodprom.asap-lp.ru/ajax-articles.html',
                type: 'GET',
                dataType: 'json',
                data: {
                    offset: articlesOffset,
                    sortdir_pub: sortDir,
                    category_id: categoryId
                },
                success: function(data) {
                    if (data.success) {
                        if (data.html) {
                            $('.articles-list__table').append(data.html);
                            truncText('.articles-list__article-desc', 115);
                            articlesOffset += 6;
                            setTimeout(() => {
                                if ($('.articles-list__article').length === data.count) {
                                    $('.articles-list__load-btn').hide()
                                } else {
                                    $('.articles-list__load-btn').show()
                                }
                            }, 300);
                        }
                    }
                },
                error: function(error) {
                    console.log(error)
                }
            })
        });

        $('.articles-list__category, .articles-list__filter-tab').on('click', function() {
            changeCategory($('.articles-list__table'), $('.articles-list__article'));

            articlesOffset = 0;

            if ($(this).hasClass('articles-list__category')) {
                $(this).siblings().removeClass('articles-list__category_active');
                $(this).addClass('articles-list__category_active');
                categoryId = $('.articles-list__category_active').attr('data-id');
            }

            if ($(this).hasClass('articles-list__filter-tab')) {
                if (!$(this).hasClass('.articles-list__filter-tab_initial')) {
                    let activeTab = $(this).detach();
                    $('.articles-list__filter-tab_initial').remove();
                    $('.articles-list__filter').prepend(activeTab);
                    $(this).addClass('articles-list__filter-tab_active');
                    $(this).siblings().removeClass('articles-list__filter-tab_active');
                    categoryId = $('.articles-list__filter-tab_active').attr('data-id');
                }
            }

            $.ajax({
                url: 'http://vodprom.asap-lp.ru/ajax-articles.html',
                type: 'GET',
                dataType: 'json',
                data: {
                    offset: articlesOffset,
                    sortdir_pub: sortDir,
                    category_id: categoryId
                },
                success: function(data) {
                    if (data.success) {
                        if (data.html) {
                            $('.articles-list__table').append(data.html);
                            truncText('.articles-list__article-desc', 115);
                            articlesOffset += 6;
                            setTimeout(() => {
                                if ($('.articles-list__article').length === data.count) {
                                    $('.articles-list__load-btn').hide()
                                } else {
                                    $('.articles-list__load-btn').show()
                                }
                            }, 300);
                        }
                    }
                },
                error: function(error) {
                    console.log(error)
                }
            })
        });
    }

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

        $('.articles-list__filter').on('click', function() {
            $(this).toggleClass('articles-list__filter_active');
            $('.articles-list__sorting').removeClass('articles-list__sorting_active');
        });
    }

    // ARTICLE PAGE

    if ($('.more-articles__slider').length) {
        $('.article p img').parent().addClass('noalign');
        $('.breadcrumb-item.active').prev().remove();

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

    if ($('.product-info__full-tabs').length > 0) {
        movingActive('.product-info__full-tabs', 'product-info__full-tab_active', '.product-info__line');
    }

    if ($('.more-products__slider').length) {
        $('.breadcrumb-item.active').prev().remove();
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
            $('.product-info__full-tab-content').removeClass('product-info__full-tab-content_active');
            setTimeout(() => {
                movingActive('.product-info__full-tabs', 'product-info__full-tab_active', '.product-info__line');
            }, 300);
            if ($(this).hasClass('product-info__full-tab_features')) {
                $('.product-info__full-tab-content_features').addClass('product-info__full-tab-content_active');
            }

            if ($(this).hasClass('product-info__full-tab_description')) {
                $('.product-info__full-tab-content_description').addClass('product-info__full-tab-content_active');
            }
        });
    }

    function aboutPageMobileRebase() {
        let membersCount = $('.about__members__nav-count').detach();
        let teamLabel = $('.about__members-team-label').detach();
        let nav = $('.about__members__nav').detach();

        $('.about__members').prepend(membersCount, teamLabel);
        $('.about__members-team').prepend(nav);
    }

    // ABOUT PAGE

    if ($('.about__info').length) {
        $('.docs__license-slider a').simpleLightbox({});

        if ($(window).width() < 860) {
            aboutPageMobileRebase();
        }

        if ($(window).width() <= 640) {
           let aboutPic = $('.about__pic').detach();
           $('.about__text-title').after(aboutPic);
        }

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
        if ($('.cart').find('.success-order').length > 0 ||
            $('.cart').find('.alert-warning').length > 0) {
            $('.make-order').hide();
            if ($(window).height() > 550) {
                $('.footer').css({ 'position': 'fixed', 'bottom': '0', 'left': '0' });
            }
        } else {
            $('.make-order').show();
            $('.footer').css({});
        }

        if ($('.cart-list__card').length) {

            $('.cart-list__card-delete-btn, .cart-list__card-control').on('click', function(e) {
                e.stopPropagation();
            });

            $('.cart-list__card-control_amount').on('focus', function(e) {
                e.preventDefault();
                e.stopPropagation();
            });

            $('.cart-list__card-control_plus').on('click', function(e) {
                let amount = $(this).closest('.cart-list__card-controls').find($('.cart-list__card-control_amount'));
                amount.val(+amount.val() + 1);
            });

            $('.cart-list__card-control_minus').on('click', function(e) {
                let amount = $(this).closest('.cart-list__card-controls').find($('.cart-list__card-control_amount'));
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