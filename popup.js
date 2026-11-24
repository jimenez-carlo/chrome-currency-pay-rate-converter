const els = {
  curr1: document.getElementById("curr1"),
  rate1Fixed: document.getElementById("rate1Fixed"),
  curr2: document.getElementById("curr2"),
  rate2Top: document.getElementById("rate2Top"),
  swapBtn: document.getElementById("swapBtn"),
  resetBtn: document.getElementById("resetBtn"),

  hdrCurr1: document.getElementById("hdrCurr1"),
  hourRate1: document.getElementById("hourRate1"),
  out1Hour: document.getElementById("out1Hour"),
  perHour1Ro: document.getElementById("perHour1Ro"),
  hrs1: document.getElementById("hrs1"),
  out1Day: document.getElementById("out1Day"),
  perDay1Ro: document.getElementById("perDay1Ro"),
  days1: document.getElementById("days1"),
  out1Week: document.getElementById("out1Week"),
  bimonth1Left: document.getElementById("bimonth1Left"),
  out1Bimonth: document.getElementById("out1Bimonth"),
  month1Left: document.getElementById("month1Left"),
  out1Month: document.getElementById("out1Month"),

  hdrCurr2: document.getElementById("hdrCurr2"),
  hourRate2: document.getElementById("hourRate2"),
  out2Hour: document.getElementById("out2Hour"),
  perHour2Ro: document.getElementById("perHour2Ro"),
  hrs2: document.getElementById("hrs2"),
  out2Day: document.getElementById("out2Day"),
  perDay2Ro: document.getElementById("perDay2Ro"),
  days2: document.getElementById("days2"),
  out2Week: document.getElementById("out2Week"),
  bimonth2Left: document.getElementById("bimonth2Left"),
  out2Bimonth: document.getElementById("out2Bimonth"),
  month2Left: document.getElementById("month2Left"),
  out2Month: document.getElementById("out2Month"),
};

let isUpdating = false;

function parseNum(raw) {
  const val = parseFloat(String(raw).replace(/,/g, "").trim());
  return Number.isFinite(val) ? val : null;
}

function rawNum(num) {
  if (Number.isInteger(num)) return String(num);
  return num.toFixed(6).replace(/0+$/, "").replace(/\.$/, "");
}

function fmtNum(num) {
  if (num === null) return "?";
  if (Number.isInteger(num)) {
    return num.toLocaleString("en-US", { maximumFractionDigits: 0 });
  }
  return num.toLocaleString("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
}

function getConversionFactor() {
  const top1 = parseNum(els.rate1Fixed.value);
  const top2 = parseNum(els.rate2Top.value);
  if (top1 === null || top1 === 0 || top2 === null) return null;
  return top2 / top1;
}

function updateColumn(rate, hrs, days, side) {
  const perHour = rate !== null ? 1 * rate : null;
  const perDay = perHour !== null && hrs !== null ? perHour * hrs : null;
  const perWeek = perDay !== null && days !== null ? perDay * days : null;
  const perBimonth = perWeek !== null ? perWeek * 2 : null;
  const perMonth = perBimonth !== null ? perBimonth * 2 : null;

  const perHourStr = fmtNum(perHour);
  const perDayStr = fmtNum(perDay);
  const perWeekStr = fmtNum(perWeek);
  const perBimonthStr = fmtNum(perBimonth);
  const perMonthStr = fmtNum(perMonth);

  if (side === "left") {
    els.out1Hour.value = perHourStr;
    els.perHour1Ro.value = perHourStr;
    els.out1Day.value = perDayStr;
    els.perDay1Ro.value = perDayStr;
    els.out1Week.value = perWeekStr;
    els.bimonth1Left.value = perWeekStr;
    els.out1Bimonth.value = perBimonthStr;
    els.month1Left.value = perBimonthStr;
    els.out1Month.value = perMonthStr;
  } else {
    els.out2Hour.value = perHourStr;
    els.perHour2Ro.value = perHourStr;
    els.out2Day.value = perDayStr;
    els.perDay2Ro.value = perDayStr;
    els.out2Week.value = perWeekStr;
    els.bimonth2Left.value = perWeekStr;
    els.out2Bimonth.value = perBimonthStr;
    els.month2Left.value = perBimonthStr;
    els.out2Month.value = perMonthStr;
  }
}

function recalculate() {
  const c1 = els.curr1.value.trim() || "USD";
  const c2 = els.curr2.value.trim() || "PHP";

  els.hdrCurr1.value = c1;
  els.hdrCurr2.value = c2;
  els.rate1Fixed.value = "1";

  const r1 = parseNum(els.hourRate1.value);
  const r2 = parseNum(els.hourRate2.value);
  const hrs = parseNum(els.hrs1.value);
  const days = parseNum(els.days1.value);

  updateColumn(r1, hrs, days, "left");
  updateColumn(r2, hrs, days, "right");
}

function handleChange(source) {
  if (isUpdating) return;
  isUpdating = true;
  try {
    const conv = getConversionFactor();

    if (source === "top_conv" || source === "left_rate") {
      const r1 = parseNum(els.hourRate1.value);
      if (r1 !== null && conv !== null) {
        els.hourRate2.value = rawNum(r1 * conv);
      }
    } else if (source === "right_rate") {
      const r2 = parseNum(els.hourRate2.value);
      if (r2 !== null && conv !== null && conv !== 0) {
        els.hourRate1.value = rawNum(r2 / conv);
      }
    } else if (source === "hrs1") {
      els.hrs2.value = els.hrs1.value;
    } else if (source === "hrs2") {
      els.hrs1.value = els.hrs2.value;
    } else if (source === "days1") {
      els.days2.value = els.days1.value;
    } else if (source === "days2") {
      els.days1.value = els.days2.value;
    }
  } finally {
    isUpdating = false;
  }

  recalculate();
}

function swapCurrencies() {
  const c1 = els.curr1.value;
  const c2 = els.curr2.value;
  const r1 = els.hourRate1.value;
  const r2 = els.hourRate2.value;

  isUpdating = true;
  try {
    els.curr1.value = c2;
    els.curr2.value = c1;
    els.hourRate1.value = r2;
    els.hourRate2.value = r1;
  } finally {
    isUpdating = false;
  }
  recalculate();
}

function resetDefaults() {
  isUpdating = true;
  try {
    els.curr1.value = "USD";
    els.rate1Fixed.value = "1";
    els.curr2.value = "PHP";
    els.rate2Top.value = "60";
    els.hourRate1.value = "9";
    els.hrs1.value = "8";
    els.days1.value = "5";
    els.hrs2.value = "8";
    els.days2.value = "5";
  } finally {
    isUpdating = false;
  }
  handleChange("left_rate");
}

els.curr1.addEventListener("input", () => handleChange("names"));
els.curr2.addEventListener("input", () => handleChange("names"));
els.rate2Top.addEventListener("input", () => handleChange("top_conv"));
els.hourRate1.addEventListener("input", () => handleChange("left_rate"));
els.hourRate2.addEventListener("input", () => handleChange("right_rate"));
els.hrs1.addEventListener("input", () => handleChange("hrs1"));
els.hrs2.addEventListener("input", () => handleChange("hrs2"));
els.days1.addEventListener("input", () => handleChange("days1"));
els.days2.addEventListener("input", () => handleChange("days2"));

els.swapBtn.addEventListener("click", swapCurrencies);
els.resetBtn.addEventListener("click", resetDefaults);

handleChange("left_rate");
