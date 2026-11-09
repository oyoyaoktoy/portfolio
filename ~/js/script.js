(function () {
  var root = document.documentElement;
  try {
    var saved = localStorage.getItem("theme");
    if (saved === "light" || saved === "dark") root.setAttribute("data-theme", saved);
  } catch (error) {}
  document.getElementById("theme-toggle").addEventListener("click", function () {
    var current = root.getAttribute("data-theme");
    var isDark = current ? current === "dark" : window.matchMedia("(prefers-color-scheme: dark)").matches;
    var next = isDark ? "light" : "dark";
    root.setAttribute("data-theme", next);
    try { localStorage.setItem("theme", next); } catch (error) {}
  });

  var viewer = document.getElementById("resume-viewer");
  var opener = document.getElementById("open-resume");
  var closer = document.getElementById("close-resume");
  function openViewer() { viewer.hidden = false; document.body.style.overflow = "hidden"; closer.focus(); }
  function closeViewer() { viewer.hidden = true; document.body.style.overflow = ""; opener.focus(); }
  opener.addEventListener("click", openViewer);
  closer.addEventListener("click", closeViewer);
  viewer.addEventListener("click", function (event) { if (event.target === viewer) closeViewer(); });
  document.addEventListener("keydown", function (event) { if (event.key === "Escape" && !viewer.hidden) closeViewer(); });

  var button = document.getElementById("copy-email");
  var status = document.getElementById("copied");
  button.addEventListener("click", function () {
    try {
      navigator.clipboard.writeText(button.dataset.email).then(function () {
        status.textContent = "Email copied";
      }, function () {
        status.textContent = "Select the email above and copy it.";
      });
    } catch (error) {
      status.textContent = "Select the email above and copy it.";
    }
  });
})();
