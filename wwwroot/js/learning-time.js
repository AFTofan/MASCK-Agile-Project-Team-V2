document.addEventListener("DOMContentLoaded", () => {
    const input = document.getElementById("lt-input");
    const btn = document.getElementById("lt-generate");
    const out = document.getElementById("lt-output");

    btn?.addEventListener("click", async () => {
        const q = (input.value || "").trim();
        if (!q) {
            out.innerHTML = `<span class="text-muted">Type something first.</span>`;
            return;
        }

        // TEMP placeholder. Next step: call your backend endpoint (no keys in JS).
        out.innerHTML = `<div><b>Topic:</b> ${escapeHtml(q)}</div>
                     <div class="mt-2 text-muted">[Backend AI endpoint will generate this content next]</div>`;
    });
});

function escapeHtml(str) {
    return str.replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;");
}