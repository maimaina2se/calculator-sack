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
  syncTotalKgWidth();
}

function countDigits(text) {
  return (text.match(/\d/g) || []).length;
}

function detectDecimalSeparator(raw, allowDecimal) {
  if (!allowDecimal) return null;
  const cleaned = raw.replace(/\s/g, "");
  if (cleaned.includes(",")) return ",";
  const dotMatches = cleaned.match(/\./g);
  if (dotMatches && dotMatches.length === 1) {
    const dotIndex = cleaned.indexOf(".");
    const right = cleaned.slice(dotIndex + 1);
    if (right.length <= 2) {
      return ".";
    }
  }
  return null;
}

function splitNumberParts(raw, allowDecimal) {
  const cleaned = raw.replace(/\s/g, "");
  const digitsOnly = cleaned.replace(/\D/g, "");
  if (!allowDecimal) {
    return { intPart: digitsOnly, decPart: "", hasDecimal: false };
  }

  const decimalSeparator = detectDecimalSeparator(cleaned, allowDecimal);
  if (!decimalSeparator) {
    return { intPart: digitsOnly, decPart: "", hasDecimal: false };
  }

  const sepIndex = cleaned.indexOf(decimalSeparator);
  const left = cleaned.slice(0, sepIndex);
  const right = cleaned.slice(sepIndex + 1);
  return {
    intPart: left.replace(/\D/g, ""),
    decPart: right.replace(/\D/g, ""),
    hasDecimal: true,
  };
}

function addThousandSeparators(digits) {
  if (!digits) return "";
  return digits.replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}

function formatInputValue(raw, allowDecimal) {
  const cleaned = raw.replace(/\s/g, "");
  const digitsCount = cleaned.replace(/\D/g, "").length;
  const { intPart, decPart, hasDecimal } = splitNumberParts(
    cleaned,
    allowDecimal
  );

  if (!hasDecimal && digitsCount === 0) {
    return "";
  }

  const needsLeadingZero = hasDecimal && intPart.length === 0;
  const formattedInt = addThousandSeparators(
    needsLeadingZero ? "0" : intPart
  );

  if (!allowDecimal) return formattedInt;

  if (decPart) {
    return `${formattedInt},${decPart}`;
  }

  if (hasDecimal) {
    return `${formattedInt},`;
  }

  return formattedInt;
}

function caretPosForDigits(formattedInt, digitsBefore) {
  if (digitsBefore <= 0) return 0;
  let digitsSeen = 0;
  for (let i = 0; i < formattedInt.length; i += 1) {
    if (/\d/.test(formattedInt[i])) {
      digitsSeen += 1;
      if (digitsSeen >= digitsBefore) {
        return i + 1;
      }
    }
  }
  return formattedInt.length;
}

function formatInputWithCaret(input, allowDecimal) {
  const raw = input.value;
  const caret = input.selectionStart ?? raw.length;
  const decimalSeparator = detectDecimalSeparator(raw, allowDecimal);
  let caretInDecimal = false;
  let intDigitsBefore = 0;
  let decDigitsBefore = 0;

  if (allowDecimal && decimalSeparator) {
    const sepIndex = raw.indexOf(decimalSeparator);
    if (sepIndex !== -1 && caret > sepIndex) {
      caretInDecimal = true;
      intDigitsBefore = countDigits(raw.slice(0, sepIndex));
      decDigitsBefore = countDigits(raw.slice(sepIndex + 1, caret));
    } else {
      intDigitsBefore = countDigits(raw.slice(0, caret));
    }
  } else {
    intDigitsBefore = countDigits(raw.slice(0, caret));
  }

  const formatted = formatInputValue(raw, allowDecimal);
  if (formatted === raw) return;

  input.value = formatted;

  if (!allowDecimal) {
    const pos = caretPosForDigits(formatted, intDigitsBefore);
    input.setSelectionRange(pos, pos);
    return;
  }

  const decimalIndex = formatted.indexOf(",");
  if (caretInDecimal && decimalIndex !== -1) {
    const maxDecLength = formatted.length - decimalIndex - 1;
    const pos =
      decimalIndex + 1 + Math.min(decDigitsBefore, maxDecLength);
    input.setSelectionRange(pos, pos);
    return;
  }

  const intPartFormatted =
    decimalIndex === -1 ? formatted : formatted.slice(0, decimalIndex);
  const pos = caretPosForDigits(intPartFormatted, intDigitsBefore);
  input.setSelectionRange(pos, pos);
}

function syncTotalKgWidth() {
  if (!totalKgInput) return;
  const placeholder = totalKgInput.getAttribute("placeholder") || "";
  const baseText = totalKgInput.value || placeholder;
  const length = Math.max(baseText.length, 4);
  totalKgInput.style.width = `${length}ch`;
}

const inputConfigs = [
  { input: hargaPerSakInput, allowDecimal: false },
  { input: totalKgInput, allowDecimal: true },
  { input: hargaJualInput, allowDecimal: false },
  { input: hargaPlastikBundleInput, allowDecimal: false },
];

inputConfigs
  .filter(({ input }) => input)
  .forEach(({ input, allowDecimal }) => {
    input.addEventListener("input", () => {
      formatInputWithCaret(input, allowDecimal);
      updateResults();
      if (input === totalKgInput) {
        syncTotalKgWidth();
      }
    });
  });

resetBtn.addEventListener("click", resetForm);

updateResults();
syncTotalKgWidth();

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
