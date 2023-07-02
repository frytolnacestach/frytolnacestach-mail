window.onload = function() {
	var hamburger = document.querySelector(".js_m-hamburger");
	hamburger.addEventListener("click", function() {
		var status = hamburger.getAttribute("data-hamburger");

		if (status === "close") {
			hamburger.setAttribute("data-hamburger", "open");
			hamburger.classList.add("open");
			document.querySelector(".js_m-nav-main").classList.add("open");
			document.documentElement.classList.add("no-scroll");
			document.body.classList.add("no-scroll");
		} else {
			hamburger.setAttribute("data-hamburger", "close");
			hamburger.classList.remove("open");
			document.querySelector(".js_m-nav-main").classList.remove("open");
			document.documentElement.classList.remove("no-scroll");
			document.body.classList.remove("no-scroll");
		}
	});

	var navLinks = document.querySelectorAll(".js_m-nav-main__link");
	navLinks.forEach(function(link) {
		link.addEventListener("click", function() {
			hamburger.setAttribute("data-hamburger", "close");
			hamburger.classList.remove("open");
			document.querySelector(".js_m-nav-main").classList.remove("open");
			document.documentElement.classList.remove("no-scroll");
			document.body.classList.remove("no-scroll");
		});
	});
}
