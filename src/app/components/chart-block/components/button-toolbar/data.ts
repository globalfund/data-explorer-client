export type InfoPanelType =
  | "global"
  | "expenditures"
  | "budgets"
  | "pledges_contributions";

export interface ChartBlockButtonToolbarProps {
  hashId: string;
  blockId: string;
  infoType: InfoPanelType;
  chartType?: string;
}

export interface InfoPanelProps {
  close: () => void;
  type: InfoPanelType;
}

export const NOTES_GLOBAL =
  "The geographical designations employed by the Global Fund do not represent or imply any opinion or judgment on the legal status of any country, territory, city or area on its governmental or state authorities, or on the delimitation of its frontiers or boundaries.<br/><br/>Financial amounts in currencies other than USD from 2014 onward were converted to USD using fixed Replenishment exchange rate, also referred to as the Reference Rate. Financial amounts before 2014 were converted using spot exchange rates.";

export const NOTES_EXPENDITURES =
  "Grant expenditures are published from the 2017-2019 grant cycle. For the 2017-2019 cycle, these amount have been cumulated to the end of the cycle.  From the 2020-2023 cycle on-wards, these amounts are available on an annual basis for each year in the cycle.";

export const NOTES_BUDGETS =
  "Grant budgets are published from the 2017-2019 grant cycle and have been annualized for each grant implementation period.";

export const NOTES_PLEDGES_CONTRIBUTIONS =
  "Where pledges have been made that are not specific to individual years, the amount shown as pledged for a period is the sum of contributions received in that period.<br/>The donor withholds a portion of its funding to use for technical assistance related to the Global Fund.<br/><br/> · Australia: 2014-2016, 2017-2019, 2020-2022, 2023-2025 <br />· Ecobank: 2014-2016, 2017-2019 <br />· France: 2011-2013, 2014-2016, 2017-2019, 2020-2022, 2023-2025 <br />· Germany: 2017-2019 <br />· Italy: 2017-2019, 2020-2022 <br />· Luxembourg: 2020-2022 <br />· Netherlands: 2014-2016, 2017-2019 <br />· Other Public: 2020-2022              <br />· United Kingdom: 2020-2022 <br />· United States: 2001-2005, 2006-2007, 2008-2010, 2011-2013, 2014-2016, 2017-2019, 2020-2022 , 2023-2025    <br />· Bill & Melinda Gates Foundation: 2023-2025        <br /> <br /> Contribution includes a EUR 5,5 million contribution from Gen. Catalunya in 2005-2008. <br />· Spain: 2001-2005, 2006-2007, 2008-2010 <br /> <br /> In addition to its contribution, the donor funded JPY 75 million in technical assistance related to the Global Fund for 2010-2019. <br />· Takeda Pharmaceutical: 2008-2010, 2011-2013, 2014-2016, 2017-2019 <br /> <br /> The U.S. contribution to the Global Fund is subject to legislative restrictions, including that, during 2004-2026, no U.S. government contribution may cause the total share of U.S. government funds contributed to exceed 33 percent of total cumulative contributions from all sources. <br /> · United States: 2001-2005, 2006-2007, 2008-2010, 2011-2013, 2014-2016, 2017-2019, 2020-2022, 2023-2025              <br /> <br /> A portion of this pledge, EUR 100 million, is reserved for debt cancellations under Debt2Health. · Germany: 2017-2019, 2023-2025              <br /> <br /> The donor withholds a portion of its funding to use for in-kind contributions related to the Global Fund. <br /> · Goodbye Malaria: 2017-2019, 2020-2022, 2023-2025 <br /> <br /> In addition to its contribution, the donor funds JPY 36 million in technical assistance related to the Global Fund for 2020-2022. <br /> · Takeda Pharmaceutical: 2020-2022";
