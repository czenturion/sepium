$(document).ready(function () {

    if ($.fancybox) {
        $("[data-fancybox]").fancybox({
            buttons: ["close"],
            protect: false,
        });
    }

    if (typeof Swiper !== "undefined") {
        $(".product-card").each(function () {
            const $card = $(this);
            const slider = $card.find(".product-card__slider.swiper")[0];
            if (!slider) return;

            const nextEl = $card.find(".swiper-button-next")[0];
            const prevEl = $card.find(".swiper-button-prev")[0];
            const pagEl = $card.find(".swiper-pagination")[0];

            if (!pagEl) {
                console.warn("Пагинация не найдена для карточки", $card);
                return;
            }

            new Swiper(slider, {
                loop: true,
                speed: 400,
                watchOverflow: true,
                autoplay: false,
                navigation: {
                    nextEl,
                    prevEl,
                },
                pagination: {
                    el: pagEl,
                    clickable: true,
                },
                breakpoints: {
                    0: {
                        autoplay: {
                            delay: 3000,
                            disableOnInteraction: false,
                        },
                    },
                    641: {
                        autoplay: false,
                    },
                },
            });
        });
    }

    $(".product-card__chips").on("click", ".chip", function (e) {
        e.stopPropagation();

        const $chipsContainer = $(this).closest(".product-card__chips");
        const $currentChip = $(this);
        const $oldActive = $chipsContainer.find(".chip--active");

        if ($oldActive.is($currentChip)) return;

        const $icon = $oldActive.find(".chip__icon");
        if ($icon.length) {
            $currentChip.prepend($icon);
        }

        $oldActive.removeClass("chip--active").attr("aria-pressed", "false");
        $currentChip.addClass("chip--active").attr("aria-pressed", "true");
    });

    $(".product-card__likes").on("click", function (e) {
        e.stopPropagation();
        $(this).toggleClass("product-card__likes--active");
        const isPressed = $(this).attr("aria-pressed") === "true";
        $(this).attr("aria-pressed", !isPressed);
    });

    $(".product-card").on("click", function (e) {
        if ($(e.target).closest(".js-interactive").length) return;

        window.open("/card", "_blank");
    });
});
