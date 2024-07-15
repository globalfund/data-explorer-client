export const chartTooltipCommonConfig = (touch: boolean): any => ({
  padding: 16,
  show: !touch,
  confine: true,
  borderWidth: 0,
  trigger: "item",
  borderRadius: 16,
  triggerOn: "mousemove",
  boxShadow: "0px 0px 10px 0px rgba(152, 161, 170, 0.60)",
});
