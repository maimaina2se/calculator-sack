const hargaPerSakInput = document.getElementById("hargaPerSak");
const totalKgInput = document.getElementById("totalKg");
const hargaJualInput = document.getElementById("hargaJual");
const hargaPlastikBundleInput = document.getElementById("hargaPlastikBundle");

const hargaPerKgEl = document.getElementById("hargaPerKg");
const keuntunganPerKgEl = document.getElementById("keuntunganPerKg");
const keuntunganPerSakEl = document.getElementById("keuntunganPerSak");

const hargaPerKgHeroEl = document.getElementById("hargaPerKgHero");
const keuntunganPerKgHeroEl = document.getElementById("keuntunganPerKgHero");
const keuntunganPerSakHeroEl = document.getElementById("keuntunganPerSakHero");
const totalHargaPerKgHeroEl = document.getElementById("totalHargaPerKgHero");
const keuntunganPerKgBersihHeroEl = document.getElementById(
  "keuntunganPerKgBersihHero"
);
const keuntunganPerSakBersihHeroEl = document.getElementById(
  "keuntunganPerSakBersihHero"
);
const plastikPerKgEl = document.getElementById("plastikPerKg");
const plastikPerSakEl = document.getElementById("plastikPerSak");

const resetBtn = document.getElementById("resetBtn");
const formulaDetails = document.querySelector(".formula-collapsible");

const PLASTIK_PER_BUNDLE = 5 * 34;

const rupiah = new Intl.NumberFormat("id-ID", {
  style: "currency",
  currency: "IDR",
  maximumFractionDigits: 2,
});

function parseNumber(value) {
  if (!value) return 0;
  const cleaned = value
    .toString()
    .replace(/\s/g, "")
    .replace(/\./g, "")
    .replace(/,/g, ".");
  const num = Number(cleaned);
  return Number.isFinite(num) ? num : 0;
}

function formatCurrency(value) {
  if (!Number.isFinite(value)) return "Rp 0";
  return rupiah.format(value);
}

function formatOptional(value) {
  return Number.isFinite(value) ? formatCurrency(value) : "-";
}

function setText(el, text) {
  if (el) el.textContent = text;
}

function updateResults() {
  const hargaPerSak = parseNumber(hargaPerSakInput.value);
  const totalKg = parseNumber(totalKgInput.value);
  const hargaJual = parseNumber(hargaJualInput.value);
  const hargaPlastikBundle = hargaPlastikBundleInput
    ? parseNumber(hargaPlastikBundleInput.value)
    : 0;

  const hargaPerKg = totalKg > 0 ? hargaPerSak / totalKg : 0;
  const keuntunganPerKg = hargaJual - hargaPerKg;
  const keuntunganPerSak = keuntunganPerKg * totalKg;

  const plastikPerKgValue =
    hargaPlastikBundle > 0 ? hargaPlastikBundle / PLASTIK_PER_BUNDLE : 0;
  const plastikPerKgDisplay = hargaPlastikBundle > 0 ? plastikPerKgValue : null;
  const plastikPerSakDisplay =
    hargaPlastikBundle > 0 && totalKg > 0 ? plastikPerKgValue * totalKg : null;
  const plastikPerSakValue =
    hargaPlastikBundle > 0 && totalKg > 0 ? plastikPerKgValue * totalKg : 0;

  const totalHargaPerKg = hargaPerKg + plastikPerKgValue;
  const keuntunganPerKgBersih = keuntunganPerKg - plastikPerKgValue;
  const keuntunganPerSakBersih = keuntunganPerSak - plastikPerSakValue;

  const hargaPerKgText = formatCurrency(hargaPerKg);
  const keuntunganPerKgText = formatCurrency(keuntunganPerKg);
  const keuntunganPerSakText = formatCurrency(keuntunganPerSak);

  setText(hargaPerKgEl, hargaPerKgText);
  setText(keuntunganPerKgEl, keuntunganPerKgText);
  setText(keuntunganPerSakEl, keuntunganPerSakText);

  setText(hargaPerKgHeroEl, hargaPerKgText);
  setText(keuntunganPerKgHeroEl, keuntunganPerKgText);
  setText(keuntunganPerSakHeroEl, keuntunganPerSakText);
  setText(totalHargaPerKgHeroEl, formatCurrency(totalHargaPerKg));
  setText(
    keuntunganPerKgBersihHeroEl,
    formatCurrency(keuntunganPerKgBersih)
  );
  setText(
    keuntunganPerSakBersihHeroEl,
    formatCurrency(keuntunganPerSakBersih)
  );

  setText(plastikPerKgEl, formatOptional(plastikPerKgDisplay));
  setText(plastikPerSakEl, formatOptional(plastikPerSakDisplay));
}

function resetForm() {
  hargaPerSakInput.value = "";
  totalKgInput.value = "";
  hargaJualInput.value = "";
  if (hargaPlastikBundleInput) {
    hargaPlastikBundleInput.value = "";
  }
  updateResults();
}

[
  hargaPerSakInput,
  totalKgInput,
  hargaJualInput,
  hargaPlastikBundleInput,
]
  .filter(Boolean)
  .forEach((input) => {
    input.addEventListener("input", updateResults);
  });

resetBtn.addEventListener("click", resetForm);

updateResults();

if (formulaDetails && window.matchMedia) {
  const mq = window.matchMedia("(max-width: 720px)");
  const syncFormula = () => {
    if (mq.matches) {
      formulaDetails.removeAttribute("open");
    } else {
      formulaDetails.setAttribute("open", "");
    }
  };
  syncFormula();
  if (mq.addEventListener) {
    mq.addEventListener("change", syncFormula);
  } else if (mq.addListener) {
    mq.addListener(syncFormula);
  }
}

function blurActiveInput() {
  const active = document.activeElement;
  if (!active) return;
  if (active.tagName === "INPUT" || active.tagName === "TEXTAREA") {
    active.blur();
  }
}

let touchStartY = 0;
document.addEventListener(
  "touchstart",
  (event) => {
    if (event.touches.length === 1) {
      touchStartY = event.touches[0].clientY;
    }
  },
  { passive: true }
);

document.addEventListener(
  "touchmove",
  (event) => {
    if (event.touches.length !== 1) return;
    const deltaY = Math.abs(event.touches[0].clientY - touchStartY);
    if (deltaY > 10) {
      blurActiveInput();
    }
  },
  { passive: true }
);
