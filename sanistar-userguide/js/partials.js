document.addEventListener("DOMContentLoaded", () => {
    const sidebarTarget = document.getElementById("site-sidebar");
    const headerTarget = document.getElementById("site-header");
    const isContentPage = window.location.pathname.includes("/content/");
    const basePath = isContentPage ? "../" : "./";
    const setActiveNav = () => {
        const currentUrl = new URL(window.location.href);
        document.querySelectorAll(".sidebar-nav .nav-item[href]").forEach((link) => {
            const linkUrl = new URL(link.getAttribute("href"), currentUrl);
            if (linkUrl.pathname === currentUrl.pathname) {
                link.classList.add("active");
            }
        });
    };
    const buildOnThisPage = () => {
        if (!isContentPage) {
            return;
        }

        const content = document.querySelector(".content");
        if (!content || content.querySelector(".on-this-page")) {
            return;
        }

        const headings = Array.from(content.querySelectorAll("h2, h3"));
        const usedIds = new Set();
        const items = [];

        headings.forEach((heading) => {
            const text = heading.textContent?.trim();
            if (!text) {
                return;
            }

            let id = heading.id;
            if (!id) {
                id = text
                    .toLowerCase()
                    .replace(/[^a-z0-9\s-]/g, "")
                    .replace(/\s+/g, "-")
                    .replace(/-+/g, "-")
                    .replace(/^-|-$/g, "");
            }

            if (!id || usedIds.has(id)) {
                let suffix = 2;
                let candidate = id || "section";
                while (!candidate || usedIds.has(candidate)) {
                    candidate = `${id || "section"}-${suffix++}`;
                }
                id = candidate;
            }

            heading.id = id;
            usedIds.add(id);
            items.push({ id, text, level: heading.tagName.toLowerCase() });
        });

        if (!items.length) {
            return;
        }

        const nav = document.createElement("nav");
        nav.className = "on-this-page";
        nav.setAttribute("aria-label", "On this page");

        const title = document.createElement("div");
        title.className = "on-this-page-title";
        title.textContent = "On this page";

        const list = document.createElement("ul");
        items.forEach((item) => {
            const li = document.createElement("li");
            li.className = `on-this-page-item on-this-page-${item.level}`;
            const link = document.createElement("a");
            link.href = `#${item.id}`;
            link.textContent = item.text;
            li.appendChild(link);
            list.appendChild(li);
        });

        nav.appendChild(title);
        nav.appendChild(list);
        content.insertBefore(nav, content.firstChild);
    };
    const applyBasePath = (target) => {
        target.querySelectorAll("[data-src]").forEach((el) => {
            el.setAttribute("src", `${basePath}${el.dataset.src}`);
        });
        target.querySelectorAll("[data-href]").forEach((el) => {
            el.setAttribute("href", `${basePath}${el.dataset.href}`);
        });
    };

    const loadPartial = (path, target) =>
        fetch(path)
            .then((response) => {
                if (!response.ok) {
                    throw new Error(`Failed to load ${path}: ${response.status}`);
                }
                return response.text();
            })
            .then((html) => {
                target.innerHTML = html;
                applyBasePath(target);
            });

    const tasks = [];
    if (sidebarTarget) {
        tasks.push(loadPartial(`${basePath}partials/sidebar.html`, sidebarTarget));
    }
    if (headerTarget) {
        tasks.push(loadPartial(`${basePath}partials/header.html`, headerTarget));
    }

    Promise.all(tasks)
        .then(() => {
            setActiveNav();
        })
        .catch((err) => {
            console.error(err);
        })
        .finally(() => {
            buildOnThisPage();
        });
});
