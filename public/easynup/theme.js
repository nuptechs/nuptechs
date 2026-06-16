/* ════════════════════════════════════════════════════════════════════
   EasyNuP — alternância de tema (dark/light)
   - Lê/persiste a escolha em localStorage ('easynup-theme').
   - Injeta o botão sutil na navbar (.toc .inner) ou, na ausência, no body.
   - O anti-flash (FOUC) é feito por script inline no <head> de cada página;
     este arquivo só cuida do controle e da persistência.
   ════════════════════════════════════════════════════════════════════ */
(function () {
  "use strict";
  var KEY = "easynup-theme";
  var root = document.documentElement;

  function current() {
    return root.getAttribute("data-theme") === "light" ? "light" : "dark";
  }
  function apply(theme) {
    root.setAttribute("data-theme", theme);
    try { localStorage.setItem(KEY, theme); } catch (e) {}
    var btn = document.querySelector(".theme-toggle");
    if (btn) {
      var isLight = theme === "light";
      btn.setAttribute("aria-pressed", String(isLight));
      btn.setAttribute(
        "aria-label",
        isLight ? "Mudar para tema escuro" : "Mudar para tema claro"
      );
      var lbl = btn.querySelector(".lbl");
      if (lbl) lbl.textContent = isLight ? "Claro" : "Escuro";
    }
  }
  function toggle() {
    apply(current() === "light" ? "dark" : "light");
  }

  var SUN =
    '<span class="ico ico-sun"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="4.2"/><path d="M12 2.5v2.2M12 19.3v2.2M4.6 4.6l1.6 1.6M17.8 17.8l1.6 1.6M2.5 12h2.2M19.3 12h2.2M4.6 19.4l1.6-1.6M17.8 6.2l1.6-1.6"/></svg></span>';
  var MOON =
    '<span class="ico ico-moon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 14.5A8 8 0 1 1 9.5 4a6.3 6.3 0 0 0 10.5 10.5z"/></svg></span>';

  function build() {
    if (document.querySelector(".theme-toggle")) return;
    var btn = document.createElement("button");
    btn.type = "button";
    btn.className = "theme-toggle";
    btn.innerHTML = SUN + MOON + '<span class="lbl"></span>';
    btn.addEventListener("click", toggle);

    var host = document.querySelector("nav.toc .inner") || document.querySelector("nav.toc");
    if (host) {
      host.appendChild(btn);
    } else {
      // sem navbar: flutua no canto superior direito
      btn.style.position = "fixed";
      btn.style.top = "14px";
      btn.style.right = "16px";
      btn.style.zIndex = "200";
      document.body.appendChild(btn);
    }
    apply(current());
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", build);
  } else {
    build();
  }
})();
