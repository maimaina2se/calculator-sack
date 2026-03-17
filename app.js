const hargaPerSakInput = document.getElementById("hargaPerSak");
const totalKgInput = document.getElementById("totalKg");
const hargaJualInput = document.getElementById("hargaJual");

const hargaPerKgEl = document.getElementById("hargaPerKg");
const keuntunganPerKgEl = document.getElementById("keuntunganPerKg");
const keuntunganPerSakEl = document.getElementById("keuntunganPerSak");

const hargaPerKgHeroEl = document.getElementById("hargaPerKgHero");
const keuntunganPerKgHeroEl = document.getElementById("keuntunganPerKgHero");
const keuntunganPerSakHeroEl = document.getElementById("keuntunganPerSakHero");

const resetBtn = document.getElementById("resetBtn");
const formulaDetails = document.querySelector(".formula-collapsible");

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

function setText(el, text) {
  if (el) el.textContent = text;
}

function updateResults() {
  const hargaPerSak = parseNumber(hargaPerSakInput.value);
  const totalKg = parseNumber(totalKgInput.value);
  const hargaJual = parseNumber(hargaJualInput.value);

  const hargaPerKg = totalKg > 0 ? hargaPerSak / totalKg : 0;
  const keuntunganPerKg = hargaJual - hargaPerKg;
  const keuntunganPerSak = keuntunganPerKg * totalKg;

  const hargaPerKgText = formatCurrency(hargaPerKg);
  const keuntunganPerKgText = formatCurrency(keuntunganPerKg);
  const keuntunganPerSakText = formatCurrency(keuntunganPerSak);

  setText(hargaPerKgEl, hargaPerKgText);
  setText(keuntunganPerKgEl, keuntunganPerKgText);
  setText(keuntunganPerSakEl, keuntunganPerSakText);

  setText(hargaPerKgHeroEl, hargaPerKgText);
  setText(keuntunganPerKgHeroEl, keuntunganPerKgText);
  setText(keuntunganPerSakHeroEl, keuntunganPerSakText);
}

function resetForm() {
  hargaPerSakInput.value = "";
  totalKgInput.value = "";
  hargaJualInput.value = "";
  updateResults();
}


[hargaPerSakInput, totalKgInput, hargaJualInput].forEach((input) => {
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
