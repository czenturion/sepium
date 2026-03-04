function initFancybox() {
    if (typeof $ === "undefined" || !$.fancybox) return;
    $("[data-fancybox]").fancybox({
        buttons: ["close"],
        protect: false,
    });
}

function initSwipers() {
    if (typeof Swiper === "undefined") return;

    document.querySelectorAll(".product-card__slider.swiper").forEach((root) => {
        const nextEl = root.querySelector(".swiper-button-next");
        const prevEl = root.querySelector(".swiper-button-prev");
        const pagEl = root.querySelector(".swiper-pagination");

        // eslint-disable-next-line no-new
        new Swiper(root, {
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