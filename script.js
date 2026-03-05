function initFancybox() {
    if (typeof $ === "undefined" || !$.fancybox) return;
    $("[data-fancybox]").fancybox({
        buttons: ["close"],
        protect: false,
    });
}

function initSwipers() {
    if (typeof Swiper === "undefined") return;

    document.querySelectorAll(".product-card").forEach((card) => {
        const slider = card.querySelector(".product-card__slider.swiper");
        if (!slider) return;

        const nextEl = slider.querySelector(".swiper-button-next");
        const prevEl = slider.querySelector(".swiper-button-prev");
        const pagEl = card.querySelector(".swiper-pagination");

        if (!pagEl) {
            console.warn("Пагинация не найдена для карточки", card);
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

function initCardClickOpen() {
    document.querySelectorAll(".product-card").forEach((card) => {
        let startX = 0;
        let startY = 0;
        let moved = false;

        card.addEventListener("pointerdown", (e) => {
            startX = e.clientX;
            startY = e.clientY;
            moved = false;
        });

        card.addEventListener("pointermove", (e) => {
            if (moved) return;
            const dx = Math.abs(e.clientX - startX);
            const dy = Math.abs(e.clientY - startY);
            if (dx + dy > 10) moved = true;
        });

        card.addEventListener("click", (e) => {
            if (moved) return;
            if (e.defaultPrevented) return;
            if (e.target.closest(".js-interactive")) return;

            const href = card.getAttribute("data-card-href");
            if (!href) return;

            window.open(href, "_blank", "noopener,noreferrer");
        });
    });
}

document.addEventListener("DOMContentLoaded", () => {
    initFancybox();
    initSwipers();
    initCardClickOpen();
});