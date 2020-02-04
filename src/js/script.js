$(document).ready(function () {
    $('.carousel__inner').slick({
        dots: true,
        infinite: true,
        speed: 1200,
        slidesToShow: 1,
        adaptiveHeight: false,
        autoplay: true,
        autoplaySpeed: 5000,
        arrows: true,
        prevArrow: '<button type="button" class="slick-prev"><img src="img/arrow/arrowLeft.png" /></button>',
        nextArrow: '<button type="button" class="slick-next"><img src="img/arrow/arrowRight.png" /></button>',
        responsive: [{
                breakpoint: 1200,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    infinite: true,
                    dots: true
                }
            },
            {
                breakpoint: 992,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    dots: true,
                    arrows: false
                }
            },
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    dots: true,
                    arrows: false
                }
            },
            {
                breakpoint: 576,
                settings: {
                    dots: true,
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    arrows: false
                }
            }
        ]
    });

    $('ul.catalog__tabs').on('click', 'li:not(.catalog__tab_active)', function () {
        $(this)
            .addClass('catalog__tab_active').siblings().removeClass('catalog__tab_active')
            .closest('div.container').find('div.catalog__content').removeClass('catalog__content_active').eq($(this).index()).addClass('catalog__content_active');
    });

    function toggleSlide(item) {
        $(item).each(function (i) {
            $(this).on('click', function (e) {
                e.preventDefault();
                $('.catalog-item__content').eq(i).toggleClass('catalog-item__content_active');
                $('.catalog-item__list').eq(i).toggleClass('catalog-item__list_active');
            });
        });
    }
    toggleSlide('.catalog-item__back');
    toggleSlide('.catalog-item__link');

    //Modal

    $('[data-modal=consultation]').on('click', function () {
        $('.overlay, #consultation').fadeIn(200);
    });

    // $('[data-modal=thanks]').on('click', function () {
    //     $('.overlay, #thanks').fadeIn(200);
    // });

    $('.modal__close').on('click', function () {
        $('.overlay, #consultation, #order, #thanks').fadeOut(200);
    });

    function validateForms(form) {
        $(form).validate({
            rules: {
                name: {
                    required: true,
                    minlength: 2
                },
                phone: {
                    required: true,
                    minlength: 11
                },
                email: {
                    required: true,
                    email: true
                }
            },
            messages: {
                name: {
                    required: "Нельзя оставлять пустым",
                    minlength: jQuery.validator.format("Минимальное количество символов должно быть {0}")
                },
                phone: {
                    required: "Нельзя оставлять пустым",
                    minlength: jQuery.validator.format("Минимальное количество символов должно быть {0}")
                },
                email: {
                    required: "Нельзя оставлять пустым",
                    email: "Введите корректный e-mail"
                }
            }
        });
    }
    validateForms('#consultation-form');
    validateForms('#consultation form');
    validateForms('#order form');
    $('input[name=phone]').mask("+7 (999) 999-99-99");


    $('.button_mini').each(function (i) {
        $(this).on('click', function () {
            $('#order .modal__descr').text($('.catalog-item__subtitle').eq(i).text());
            $('.overlay, #order').fadeIn(200);
        });
    });

    $('form').submit(function (e) {
        e.preventDefault();
        $.ajax({
            type: "POST",
            url: "mailer//smart.php",
            data: $(this).serialize()
        }).done(function () {
            $(this).find("input").val("");
            $('#consultation, #order').fadeOut(1000);
            // $('.overlay, #thanks').fadeIn(2000);
            $('.overlay').fadeOut(1000);
            $('form').trigger('reset');
        });
        return false;
    });

    //Smooth scroll nad pageup

    $(window).scroll(function () {
        if ($(this).scrollTop() > 1000) {
            $('.pageup').fadeIn(300);
        } else {
            $('.pageup').fadeOut(300);
        }
    });
    $("a[href='#up']").click(function () {
        const _href = $(this).attr("href");
        $("html, body").animate({
            scrollTop: $(_href).offset().top + "px"
        });
        return false;
    });
    new WOW().init();
});