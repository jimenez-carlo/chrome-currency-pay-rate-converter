# Conversion Calculator

A Manifest V3 Chrome Extension widget that performs two-way currency conversion alongside live pay calculations across **per hour**, **per day**, **per week**, **per bi month**, and **per month** periods[cite: 2, 4, 5].

## Features

* **Two-Way Currency Conversion:** Edit the top conversion rate or either currency's hourly rate to automatically update the counterpart rate and all downstream totals.
* **Multi-Period Breakdown:** Scales values step-by-step from **per hour** to **per day** (using editable hours), **per week** (using editable days), **per bi month** (`× 2`), and **per month** (`× 2`)[cite: 2, 4, 5].
* **Clear Editable vs. Read-Only Inputs:** Separates editable inputs from read-only fixed and calculated fields so values remain readable and easy to select[cite: 2, 3, 5].
* **Swap & Reset Controls:** Includes **Swap** to exchange currencies and hourly rates, and **Reset** to restore default values.
* **Compact Scrollbar-Free Widget:** Sized to fit cleanly inside the extension popup without scrollbars[cite: 7, 8].

## Project Structure

```text
conversion-calculator-extension/
├── manifest.json
├── popup.html
└── popup.js
