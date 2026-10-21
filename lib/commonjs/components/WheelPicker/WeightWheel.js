"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.WeightWheel = void 0;
var _PlatformWheel = require("./PlatformWheel.js");
var _wheelHelpers = require("./wheelHelpers.js");
var _jsxRuntime = require("react/jsx-runtime");
const MAX_KG_VALUE = 90;
const GRAMS_OPTIONS_COUNT = 10;
const GRAMS_STEP = 100;
const GRAMS_PER_KG = 1000;
const KG_DECIMAL_PLACES = 2;
const LBS_FRACTION_STEP = 0.5;
const LBS_FRACTION_LIMIT = 15;
const LBS_INTEGER_LIMIT = 200;

/** 0.5…15 in halves, then 16…200. */
const LBS_VALUES = (() => {
  const values = [];
  for (let v = LBS_FRACTION_STEP; v <= LBS_FRACTION_LIMIT; v += LBS_FRACTION_STEP) {
    values.push(Number(v.toFixed(1)));
  }
  for (let v = LBS_FRACTION_LIMIT + 1; v <= LBS_INTEGER_LIMIT; v += 1) {
    values.push(v);
  }
  return values;
})();
const KG_VALUES = Array.from({
  length: MAX_KG_VALUE + 1
}, (_, i) => i);
const GRAM_VALUES = Array.from({
  length: GRAMS_OPTIONS_COUNT
}, (_, i) => i * GRAMS_STEP);
const findClosest = (arr, target) => arr.reduce((prev, curr) => Math.abs(curr - target) < Math.abs(prev - target) ? curr : prev);
const roundKg = kg => Number(kg.toFixed(KG_DECIMAL_PLACES));

/** Weight columns: kg + grams (100 g steps), or one lbs column. */
const WeightWheel = ({
  unit,
  weightKg,
  onChange,
  unitLabels,
  containerStyle,
  itemTextStyle,
  selectionIndicatorStyle,
  itemHeight,
  visibleItemCount,
  testID
}) => {
  let currentDisplayLbs = LBS_VALUES[0] ?? LBS_FRACTION_STEP;
  let currentKg = 0;
  let currentGr = 0;
  if (weightKg !== null) {
    if (unit === 'lbs') {
      currentDisplayLbs = findClosest(LBS_VALUES, (0, _wheelHelpers.kgToLbs)(weightKg));
    } else {
      const wholeKg = Math.floor(weightKg);
      const grams = Math.round((weightKg - wholeKg) * GRAMS_PER_KG);
      currentKg = wholeKg;
      currentGr = Math.round(grams / GRAMS_STEP) * GRAMS_STEP;
    }
  }
  const handleChangeLbs = lbsVal => {
    onChange(roundKg((0, _wheelHelpers.lbsToKg)(Number(lbsVal))));
  };
  const handleChangeKg = kgVal => {
    onChange(roundKg(Number(kgVal) + currentGr / GRAMS_PER_KG));
  };
  const handleChangeGr = grVal => {
    onChange(roundKg(currentKg + Number(grVal) / GRAMS_PER_KG));
  };
  const columns = unit === 'lbs' ? [{
    key: 'lbs',
    flex: 1,
    items: LBS_VALUES.map(val => ({
      label: `${(0, _wheelHelpers.formatWeightDisplayValue)(val)} ${unitLabels.pounds}`,
      value: val
    })),
    onValueChange: handleChangeLbs,
    selectedValue: currentDisplayLbs
  }] : [{
    key: 'kg',
    flex: 1,
    items: KG_VALUES.map(kg => ({
      label: `${kg} ${unitLabels.kilograms}`,
      value: kg
    })),
    onValueChange: handleChangeKg,
    selectedValue: currentKg
  }, {
    key: 'gr',
    flex: 1,
    items: GRAM_VALUES.map(gr => ({
      label: `${gr} ${unitLabels.grams}`,
      value: gr
    })),
    onValueChange: handleChangeGr,
    selectedValue: currentGr
  }];
  return /*#__PURE__*/(0, _jsxRuntime.jsx)(_PlatformWheel.PlatformWheel, {
    columns: columns,
    containerStyle: containerStyle,
    itemHeight: itemHeight,
    itemTextStyle: itemTextStyle,
    selectionIndicatorStyle: selectionIndicatorStyle,
    testID: testID,
    visibleItemCount: visibleItemCount
  });
};
exports.WeightWheel = WeightWheel;
//# sourceMappingURL=WeightWheel.js.map