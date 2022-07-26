/* eslint-disable no-case-declarations */
/* eslint-disable sonarjs/no-duplicated-branches */
/* eslint-disable @typescript-eslint/no-redeclare */
import get from "lodash/get";
import find from "lodash/find";
import sumBy from "lodash/sumBy";
import filter from "lodash/filter";
import isEmpty from "lodash/isEmpty";
import { CommonPropTypes } from "react-csv/components/CommonPropTypes";
import {
  diseaseBurdens,
  incomeLevels,
} from "app/components/Charts/Eligibility/Scatterplot/data";

export function exportCSV(
  pathname: string,
  data: any,
  options: {
    selectedAggregation: string;
    investmentsMapView: string;
    donorMapView: string;
    isDetail: boolean;
    resultsSelectedYear: string;
  }
): CommonPropTypes {
  const csvData: any[] = [];
  const isComponent = options.selectedAggregation === "componentName";
  const yearDropdownNode = document.getElementById("generic-dropdown-input");
  switch (pathname) {
    case "/viz/disbursements/treemap":
      data.forEach((item: any) => {
        if (item._children) {
          item._children.forEach((child: any) => {
            csvData.push({
              component: item.name,
              location: child.name,
              disbursement: child.tooltip.totalInvestments.disbursed,
              committment: child.tooltip.totalInvestments.committed,
              signed: child.tooltip.totalInvestments.signed,
            });
          });
        } else {
          csvData.push({
            component: item.name,
            location: "",
            disbursement: item.tooltip.totalInvestments.disbursed,
            committment: item.tooltip.totalInvestments.committed,
            signed: item.tooltip.totalInvestments.signed,
          });
        }
      });
      return {
        data: csvData,
        filename: "disbursements-treemap.csv",
        headers: [
          { label: "Component", key: "component" },
          { label: "Location", key: "location" },
          { label: "Disbursement (USD)", key: "disbursement" },
          { label: "Committment (USD)", key: "committment" },
          { label: "Signed (USD)", key: "signed" },
        ],
      };
    case "/viz/disbursements/time-cycle":
      data.forEach((item: any) => {
        if (item.disbursedChildren && item.cumulativeChildren) {
          item.disbursedChildren.forEach((child: any) => {
            csvData.push({
              year: item.year,
              component: child.name,
              disbursement: child.value,
              cumulative: get(
                find(item.cumulativeChildren, { name: child.name }),
                "value",
                0
              ),
            });
          });
        }
      });
      return {
        data: csvData,
        filename: "disbursements-bar.csv",
        headers: [
          { label: "Year", key: "year" },
          { label: "Component", key: "component" },
          { label: "Disbursement (USD)", key: "disbursement" },
          { label: "Cumulative (USD)", key: "cumulative" },
        ],
      };
    case "/viz/disbursements/map":
      if (options.investmentsMapView === "countries") {
        data.countries.features.forEach((item: any) => {
          if (item.properties && !isEmpty(item.properties.data)) {
            csvData.push({
              location: item.properties.name,
              component: "-",
              count: sumBy(item.properties.data.components, "activitiesCount"),
              disbursement: item.properties.data.disbursed,
              committment: item.properties.data.committed,
              signed: item.properties.data.signed,
            });
            item.properties.data.components.forEach((component: any) => {
              csvData.push({
                location: item.properties.name,
                component: component.name,
                count: component.activitiesCount,
                disbursement: component.value,
                committment: "-",
                signed: "-",
              });
            });
          }
        });
      } else if (options.investmentsMapView === "multicountries") {
        data.multicountries.forEach((item: any) => {
          csvData.push({
            location: item.geoName,
            component: "-",
            count: sumBy(item.components, "activitiesCount"),
            disbursement: item.disbursed,
            committment: item.committed,
            signed: item.signed,
          });
          item.components.forEach((component: any) => {
            csvData.push({
              location: item.geoName,
              component: component.name,
              count: component.activitiesCount,
              disbursement: component.value,
              committment: "-",
              signed: "-",
            });
          });
        });
      }
      return {
        data: csvData,
        filename: `disbursements-${options.investmentsMapView}.csv`,
        headers: [
          { label: "Location", key: "location" },
          { label: "Component", key: "component" },
          { label: "Grants", key: "count" },
          { label: "Disbursement (USD)", key: "disbursement" },
          { label: "Committment (USD)", key: "committment" },
          { label: "Signed (USD)", key: "signed" },
        ],
      };
    case "/viz/disbursements/table":
      data.forEach((item: any) => {
        if (item._children) {
          item._children.forEach((child: any) => {
            csvData.push({
              component: item.name,
              location: child.name,
              disbursement: child.tooltip.totalInvestments.disbursed,
              committment: child.tooltip.totalInvestments.committed,
              signed: child.tooltip.totalInvestments.signed,
            });
          });
        } else {
          csvData.push({
            component: item.name,
            location: "",
            disbursement: item.tooltip.totalInvestments.disbursed,
            committment: item.tooltip.totalInvestments.committed,
            signed: item.tooltip.totalInvestments.signed,
          });
        }
      });
      return {
        data: csvData,
        filename: "investments.csv",
        headers: [
          { label: "Component", key: "component" },
          { label: "Location", key: "location" },
          { label: "Disbursement (USD)", key: "disbursement" },
          { label: "Committment (USD)", key: "committment" },
          { label: "Signed (USD)", key: "signed" },
        ],
      };
    case "/viz/signed/treemap":
      data.forEach((item: any) => {
        if (item._children) {
          item._children.forEach((child: any) => {
            csvData.push({
              component: item.name,
              location: child.name,
              disbursement: child.tooltip.totalInvestments.disbursed,
              committment: child.tooltip.totalInvestments.committed,
              signed: child.tooltip.totalInvestments.signed,
            });
          });
        } else {
          csvData.push({
            component: item.name,
            location: "",
            disbursement: item.tooltip.totalInvestments.disbursed,
            committment: item.tooltip.totalInvestments.committed,
            signed: item.tooltip.totalInvestments.signed,
          });
        }
      });
      return {
        data: csvData,
        filename: "signed-treemap.csv",
        headers: [
          { label: "Component", key: "component" },
          { label: "Location", key: "location" },
          { label: "Disbursement (USD)", key: "disbursement" },
          { label: "Committment (USD)", key: "committment" },
          { label: "Signed (USD)", key: "signed" },
        ],
      };
    case "/viz/signed/time-cycle":
      data.forEach((item: any) => {
        if (item.disbursedChildren && item.cumulativeChildren) {
          item.disbursedChildren.forEach((child: any) => {
            csvData.push({
              year: item.year,
              component: child.name,
              disbursement: child.value,
              cumulative: get(
                find(item.cumulativeChildren, { name: child.name }),
                "value",
                0
              ),
            });
          });
        }
      });
      return {
        data: csvData,
        filename: "signed-bar.csv",
        headers: [
          { label: "Year", key: "year" },
          { label: "Component", key: "component" },
          { label: "Disbursement (USD)", key: "disbursement" },
          { label: "Cumulative (USD)", key: "cumulative" },
        ],
      };
    case "/viz/signed/map":
      if (options.investmentsMapView === "countries") {
        data.countries.features.forEach((item: any) => {
          if (item.properties && !isEmpty(item.properties.data)) {
            csvData.push({
              location: item.properties.name,
              component: "-",
              count: sumBy(item.properties.data.components, "activitiesCount"),
              disbursement: item.properties.data.disbursed,
              committment: item.properties.data.committed,
              signed: item.properties.data.signed,
            });
            item.properties.data.components.forEach((component: any) => {
              csvData.push({
                location: item.properties.name,
                component: component.name,
                count: component.activitiesCount,
                disbursement: component.value,
                committment: "-",
                signed: "-",
              });
            });
          }
        });
      } else if (options.investmentsMapView === "multicountries") {
        data.multicountries.forEach((item: any) => {
          csvData.push({
            location: item.geoName,
            component: "-",
            count: sumBy(item.components, "activitiesCount"),
            disbursement: item.disbursed,
            committment: item.committed,
            signed: item.signed,
          });
          item.components.forEach((component: any) => {
            csvData.push({
              location: item.geoName,
              component: component.name,
              count: component.activitiesCount,
              disbursement: component.value,
              committment: "-",
              signed: "-",
            });
          });
        });
      }
      return {
        data: csvData,
        filename: `signed-${options.investmentsMapView}.csv`,
        headers: [
          { label: "Location", key: "location" },
          { label: "Component", key: "component" },
          { label: "Grants", key: "count" },
          { label: "Disbursement (USD)", key: "disbursement" },
          { label: "Committment (USD)", key: "committment" },
          { label: "Signed (USD)", key: "signed" },
        ],
      };
    case "/viz/signed/table":
      data.forEach((item: any) => {
        if (item._children) {
          item._children.forEach((child: any) => {
            csvData.push({
              component: item.name,
              location: child.name,
              disbursement: child.tooltip.totalInvestments.disbursed,
              committment: child.tooltip.totalInvestments.committed,
              signed: child.tooltip.totalInvestments.signed,
            });
          });
        } else {
          csvData.push({
            component: item.name,
            location: "",
            disbursement: item.tooltip.totalInvestments.disbursed,
            committment: item.tooltip.totalInvestments.committed,
            signed: item.tooltip.totalInvestments.signed,
          });
        }
      });
      return {
        data: csvData,
        filename: "signed.csv",
        headers: [
          { label: "Component", key: "component" },
          { label: "Location", key: "location" },
          { label: "Disbursement (USD)", key: "disbursement" },
          { label: "Committment (USD)", key: "committment" },
          { label: "Signed (USD)", key: "signed" },
        ],
      };
    case "/viz/commitment/treemap":
      data.forEach((item: any) => {
        if (item._children) {
          item._children.forEach((child: any) => {
            csvData.push({
              component: item.name,
              location: child.name,
              disbursement: child.tooltip.totalInvestments.disbursed,
              committment: child.tooltip.totalInvestments.committed,
              signed: child.tooltip.totalInvestments.signed,
            });
          });
        } else {
          csvData.push({
            component: item.name,
            location: "",
            disbursement: item.tooltip.totalInvestments.disbursed,
            committment: item.tooltip.totalInvestments.committed,
            signed: item.tooltip.totalInvestments.signed,
          });
        }
      });
      return {
        data: csvData,
        filename: "commitment-treemap.csv",
        headers: [
          { label: "Component", key: "component" },
          { label: "Location", key: "location" },
          { label: "Disbursement (USD)", key: "disbursement" },
          { label: "Committment (USD)", key: "committment" },
          { label: "Signed (USD)", key: "signed" },
        ],
      };
    case "/viz/commitment/time-cycle":
      data.forEach((item: any) => {
        if (item.disbursedChildren && item.cumulativeChildren) {
          item.disbursedChildren.forEach((child: any) => {
            csvData.push({
              year: item.year,
              component: child.name,
              disbursement: child.value,
              cumulative: get(
                find(item.cumulativeChildren, { name: child.name }),
                "value",
                0
              ),
            });
          });
        }
      });
      return {
        data: csvData,
        filename: "commitment-bar.csv",
        headers: [
          { label: "Year", key: "year" },
          { label: "Component", key: "component" },
          { label: "Disbursement (USD)", key: "disbursement" },
          { label: "Cumulative (USD)", key: "cumulative" },
        ],
      };
    case "/viz/commitment/map":
      if (options.investmentsMapView === "countries") {
        data.countries.features.forEach((item: any) => {
          if (item.properties && !isEmpty(item.properties.data)) {
            csvData.push({
              location: item.properties.name,
              component: "-",
              count: sumBy(item.properties.data.components, "activitiesCount"),
              disbursement: item.properties.data.disbursed,
              committment: item.properties.data.committed,
              signed: item.properties.data.signed,
            });
            item.properties.data.components.forEach((component: any) => {
              csvData.push({
                location: item.properties.name,
                component: component.name,
                count: component.activitiesCount,
                disbursement: component.value,
                committment: "-",
                signed: "-",
              });
            });
          }
        });
      } else if (options.investmentsMapView === "multicountries") {
        data.multicountries.forEach((item: any) => {
          csvData.push({
            location: item.geoName,
            component: "-",
            count: sumBy(item.components, "activitiesCount"),
            disbursement: item.disbursed,
            committment: item.committed,
            signed: item.signed,
          });
          item.components.forEach((component: any) => {
            csvData.push({
              location: item.geoName,
              component: component.name,
              count: component.activitiesCount,
              disbursement: component.value,
              committment: "-",
              signed: "-",
            });
          });
        });
      }
      return {
        data: csvData,
        filename: `commitment-${options.investmentsMapView}.csv`,
        headers: [
          { label: "Location", key: "location" },
          { label: "Component", key: "component" },
          { label: "Grants", key: "count" },
          { label: "Disbursement (USD)", key: "disbursement" },
          { label: "Committment (USD)", key: "committment" },
          { label: "Signed (USD)", key: "signed" },
        ],
      };
    case "/viz/commitment/table":
      data.forEach((item: any) => {
        if (item._children) {
          item._children.forEach((child: any) => {
            csvData.push({
              component: item.name,
              location: child.name,
              disbursement: child.tooltip.totalInvestments.disbursed,
              committment: child.tooltip.totalInvestments.committed,
              signed: child.tooltip.totalInvestments.signed,
            });
          });
        } else {
          csvData.push({
            component: item.name,
            location: "",
            disbursement: item.tooltip.totalInvestments.disbursed,
            committment: item.tooltip.totalInvestments.committed,
            signed: item.tooltip.totalInvestments.signed,
          });
        }
      });
      return {
        data: csvData,
        filename: "commitment.csv",
        headers: [
          { label: "Component", key: "component" },
          { label: "Location", key: "location" },
          { label: "Disbursement (USD)", key: "disbursement" },
          { label: "Committment (USD)", key: "committment" },
          { label: "Signed (USD)", key: "signed" },
        ],
      };
    case "/viz/budgets/flow":
      return {
        data,
        filename: "budgets-flow.csv",
        headers: [
          { label: "Source", key: "source" },
          { label: "Target", key: "target" },
          { label: "Budget (USD)", key: "value" },
        ],
      };
    case "/viz/budgets/time-cycle":
      data.forEach((item: any) => {
        const dataKeys = filter(
          Object.keys(item),
          (key: string) =>
            key !== "year" && key !== "amount" && key.indexOf("Color") === -1
        );
        dataKeys.forEach((key: string) => {
          csvData.push({
            component: key,
            year: item.year,
            value: item[key],
          });
        });
      });
      return {
        data: csvData,
        filename: "budgets-time-cycle.csv",
        headers: [
          { label: "Year", key: "year" },
          { label: "Component", key: "component" },
          { label: "Budget (USD)", key: "value" },
        ],
      };
    case "/viz/budgets/map":
      if (options.investmentsMapView === "countries") {
        data.countries.features.forEach((item: any) => {
          if (item.properties && !isEmpty(item.properties.data)) {
            csvData.push({
              location: item.properties.name,
              component: "-",
              budget: item.properties.data.value,
            });
            item.properties.data.components.forEach((component: any) => {
              csvData.push({
                location: item.properties.name,
                component: component.name,
                budget: component.value,
              });
            });
          }
        });
      } else if (options.investmentsMapView === "multicountries") {
        data.multicountries.forEach((item: any) => {
          csvData.push({
            location: item.geoName,
            component: "-",
            budget: item.value,
          });
          item.components.forEach((component: any) => {
            csvData.push({
              location: item.geoName,
              component: component.name,
              budget: component.value,
            });
          });
        });
      }
      return {
        data: csvData,
        filename: `budgets-${options.investmentsMapView}.csv`,
        headers: [
          { label: "Location", key: "location" },
          { label: "Component", key: "component" },
          { label: "Budget (USD)", key: "budget" },
        ],
      };
    case "/viz/allocations":
      data.keys.forEach((key: string, index: number) => {
        csvData.push({
          component: key,
          value: data.values[index],
        });
      });
      return {
        data: csvData,
        filename: "allocations.csv",
        headers: [
          { label: "Component", key: "component" },
          { label: "Allocation (USD)", key: "value" },
        ],
      };
    case "/viz/allocations/map":
      if (options.investmentsMapView === "countries") {
        data.countries.features.forEach((item: any) => {
          if (item.properties && !isEmpty(item.properties.data)) {
            csvData.push({
              location: item.properties.name,
              component: "-",
              budget: item.properties.data.value,
            });
            item.properties.data.components.forEach((component: any) => {
              csvData.push({
                location: item.properties.name,
                component: component.name,
                budget: component.value,
              });
            });
          }
        });
      } else if (options.investmentsMapView === "multicountries") {
        data.multicountries.forEach((item: any) => {
          csvData.push({
            location: item.geoName,
            component: "-",
            budget: item.value,
          });
          item.components.forEach((component: any) => {
            csvData.push({
              location: item.geoName,
              component: component.name,
              budget: component.value,
            });
          });
        });
      }
      return {
        data: csvData,
        filename: `allocations-${options.investmentsMapView}.csv`,
        headers: [
          { label: "Location", key: "location" },
          { label: "Component", key: "component" },
          { label: "Budget (USD)", key: "budget" },
        ],
      };
    case "/viz/allocations":
      data.keys.forEach((key: string, index: number) => {
        csvData.push({
          component: key,
          value: data.values[index],
        });
      });
      return {
        data: csvData,
        filename: "allocations.csv",
        headers: [
          { label: "Component", key: "component" },
          { label: "Allocation (USD)", key: "value" },
        ],
      };
    case "/viz/eligibility":
      if (options.isDetail) {
        filter(data, (comp: any) => comp.id.trim().length > 0).forEach(
          (comp: any) => {
            comp.data.forEach((item: any) => {
              csvData.push({
                year: item.x,
                component: item.y,
                incomeLevel: get(
                  incomeLevels,
                  `[${item.incomeLevel}]`,
                  item.incomeLevel
                ),
                diseaseBurden: get(
                  diseaseBurdens,
                  `[${item.diseaseBurden}]`,
                  item.diseaseBurden
                ),
                eligibility: item.eligibility,
              });
            });
          }
        );
        return {
          data: csvData,
          filename: "location-eligibility.csv",
          headers: [
            { label: "Year", key: "year" },
            { label: "Component", key: "component" },
            { label: "Income Level", key: "incomeLevel" },
            { label: "Disease Burden", key: "diseaseBurden" },
            { label: "Status", key: "eligibility" },
          ],
        };
      }
      data.forEach((item: any) => {
        item.items.forEach((subitem: any) => {
          csvData.push({
            [isComponent ? "component" : "location"]: item.name,
            [!isComponent ? "component" : "location"]: subitem.name,
            status: subitem.status,
          });
        });
      });
      return {
        data: csvData,
        filename: `eligibility-by-${
          isComponent ? "component" : "location"
        }-${yearDropdownNode?.getAttribute("value")}.csv`,
        headers: [
          { label: "Component", key: "component" },
          { label: "Location", key: "location" },
          { label: "Status", key: "status" },
        ],
      };
    case "/viz/eligibility/table":
      if (options.isDetail) {
        filter(data, (comp: any) => comp.id.trim().length > 0).forEach(
          (comp: any) => {
            comp.data.forEach((item: any) => {
              csvData.push({
                year: item.x,
                component: item.y,
                incomeLevel: get(
                  incomeLevels,
                  `[${item.incomeLevel}]`,
                  item.incomeLevel
                ),
                diseaseBurden: get(
                  diseaseBurdens,
                  `[${item.diseaseBurden}]`,
                  item.diseaseBurden
                ),
                eligibility: item.eligibility,
              });
            });
          }
        );
        return {
          data: csvData,
          filename: "location-eligibility.csv",
          headers: [
            { label: "Year", key: "year" },
            { label: "Component", key: "component" },
            { label: "Income Level", key: "incomeLevel" },
            { label: "Disease Burden", key: "diseaseBurden" },
            { label: "Status", key: "eligibility" },
          ],
        };
      }
      data.forEach((item: any) => {
        item.items.forEach((subitem: any) => {
          csvData.push({
            [isComponent ? "component" : "location"]: item.name,
            [!isComponent ? "component" : "location"]: subitem.name,
            status: subitem.status,
          });
        });
      });
      return {
        data: csvData,
        filename: `eligibility-by-${
          isComponent ? "component" : "location"
        }-${yearDropdownNode?.getAttribute("value")}.csv`,
        headers: [
          { label: "Component", key: "component" },
          { label: "Location", key: "location" },
          { label: "Status", key: "status" },
        ],
      };
    case "/viz/pledges-contributions/time-cycle":
      data.forEach((item: any) => {
        csvData.push({
          year: item.year,
          pledge: item.pledge,
          contribution: item.contribution,
        });
      });
      return {
        data: csvData,
        filename: "pledges-contributions-time-cycle.csv",
        headers: [
          { label: "Year", key: "year" },
          { label: "Pledge (USD)", key: "pledge" },
          { label: "Contribution (USD)", key: "contribution" },
        ],
      };
    case "/viz/pledges-contributions/treemap":
      const type =
        data && data[0] ? data[0].tooltip.componentsStats[0].name : "Pledge";
      data.forEach((item: any) => {
        csvData.push({
          donor: item.name,
          value: item.value,
        });
      });
      return {
        data: csvData,
        filename: `${type}-treemap.csv`,
        headers: [
          { label: "Donor", key: "donor" },
          { label: `${type} (USD)`, key: "value" },
        ],
      };
    case "/viz/pledges-contributions/map":
      if (options.donorMapView === "Public Sector") {
        data.layers.features.forEach((item: any) => {
          if (item.properties && !isEmpty(item.properties.data)) {
            csvData.push({
              location: item.properties.name,
              type: item.properties.data.amounts[0].label,
              value: item.properties.data.amounts[0].value,
            });
          }
        });
      } else {
        data.pins.map((pin: any) => {
          csvData.push({
            location: pin.geoName,
            type: pin.amounts[0].label,
            value: pin.amounts[0].value,
          });
        });
      }
      return {
        data: csvData,
        filename: `pledges-contributions-${options.donorMapView
          .toLowerCase()
          .replace(/ /g, "-")}.csv`,
        headers: [
          { label: "Donor", key: "location" },
          { label: "Type", key: "type" },
          { label: "Amount (USD)", key: "value" },
        ],
      };
    case "/viz/pledges-contributions/table":
      if (options.donorMapView === "Public Sector") {
        data.layers.features.forEach((item: any) => {
          if (item.properties && !isEmpty(item.properties.data)) {
            csvData.push({
              location: item.properties.name,
              type: item.properties.data.amounts[0].label,
              value: item.properties.data.amounts[0].value,
            });
          }
        });
      } else {
        data.pins.map((pin: any) => {
          csvData.push({
            location: pin.geoName,
            type: pin.amounts[0].label,
            value: pin.amounts[0].value,
          });
        });
      }
      return {
        data: csvData,
        filename: `pledges-contributions-${options.donorMapView
          .toLowerCase()
          .replace(/ /g, "-")}.csv`,
        headers: [
          { label: "Donor", key: "location" },
          { label: "Type", key: "type" },
          { label: "Amount (USD)", key: "value" },
        ],
      };
    case "/grants":
      return {
        data,
        filename: "grants.csv",
        headers: [
          { label: "Title", key: "title" },
          { label: "Status", key: "status" },
          { label: "Component", key: "component" },
          { label: "Location", key: "geoLocation" },
          { label: "Rating", key: "rating" },
          { label: "Disbursement (USD)", key: "disbursed" },
          { label: "Committment (USD)", key: "committed" },
          { label: "Signed (USD)", key: "signed" },
        ],
      };
    case "/grants/list":
      return {
        data,
        filename: "grants.csv",
        headers: [
          { label: "Title", key: "title" },
          { label: "Status", key: "status" },
          { label: "Component", key: "component" },
          { label: "Location", key: "geoLocation" },
          { label: "Rating", key: "rating" },
          { label: "Disbursement (USD)", key: "disbursed" },
          { label: "Committment (USD)", key: "committed" },
          { label: "Signed (USD)", key: "signed" },
        ],
      };
    case "/viz/grants":
      return {
        data,
        filename: "grants.csv",
        headers: [
          { label: "Title", key: "title" },
          { label: "Status", key: "status" },
          { label: "Component", key: "component" },
          { label: "Location", key: "geoLocation" },
          { label: "Rating", key: "rating" },
          { label: "Disbursement (USD)", key: "disbursed" },
          { label: "Committment (USD)", key: "committed" },
          { label: "Signed (USD)", key: "signed" },
        ],
      };
    case "/results":
      data.forEach((item: any) => {
        csvData.push({
          title: item.title,
          value: item.value,
          component: item.component,
          location: "-",
        });
        item.geoLocations.forEach((loc: any) => {
          csvData.push({
            title: item.title,
            value: loc.value,
            component: item.component,
            location: loc.name,
          });
        });
      });
      return {
        data: csvData,
        filename: `results-${options.resultsSelectedYear}.csv`,
        headers: [
          { label: "Title", key: "title" },
          { label: "Value", key: "value" },
          { label: "Location", key: "location" },
          { label: "Component", key: "component" },
        ],
      };
    case "/viz/results":
      data.forEach((item: any) => {
        item.geoLocations.forEach((loc: any) => {
          csvData.push({
            title: item.title,
            value: loc.value,
            component: item.component,
            location: loc.name,
          });
        });
      });
      return {
        data: csvData,
        filename: `results-${options.resultsSelectedYear}.csv`,
        headers: [
          { label: "Title", key: "title" },
          { label: "Value", key: "value" },
          { label: "Location", key: "location" },
          { label: "Component", key: "component" },
        ],
      };
    default:
      return {
        data: [],
        filename: "empty.csv",
        headers: [],
      };
  }
}
