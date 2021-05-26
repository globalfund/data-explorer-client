import React from "react";
import { SearchLayout } from "app/components/Search/layout";

export function Search() {
  const [value, setValue] = React.useState("");
  const [activeTab, setActiveTab] = React.useState(0);
  const results = [
    {
      name: "Location(s)",
      results: [
        {
          type: "Country",
          label: "Kenya",
          value: "KEN",
          link: "/location/KEN/investments",
        },
      ],
    },
    {
      name: "Finance",
      results: [
        {
          type: "Investment",
          label: "Disbursements",
          value: "Disbursements",
          link: "/viz/investments/disbursements",
        },
        {
          type: "Investment",
          label: "Budget",
          value: "Budget",
          link: "/viz/budgets/flow",
        },
        {
          type: "Investment",
          label: "Allocation",
          value: "Allocation",
          link: "/viz/allocations",
        },
        {
          type: "Donor",
          label: "Pledges & Contributions",
          value: "Pledges & Contributions",
          link: "/viz/pledges-contributions/time-cycle",
        },
      ],
    },
    {
      name: "Grant(s)",
      results: [
        {
          type: "Active",
          label:
            "Program to strengthen the national response to HIV/AIDS and health systems in Niger",
          value: "NER-H-MSP",
          link: "/grant/NER-H-MSP/investments",
        },
        {
          type: "Active",
          label:
            "Program to strengthen the national response to HIV/AIDS and health systems in Niger",
          value: "NER-H-MSP",
          link: "/grant/NER-H-MSP/investments",
        },
        {
          type: "Active",
          label:
            "Program to strengthen the national response to HIV/AIDS and health systems in Niger",
          value: "NER-H-MSP",
          link: "/grant/NER-H-MSP/investments",
        },
        {
          type: "Active",
          label:
            "Program to strengthen the national response to HIV/AIDS and health systems in Niger",
          value: "NER-H-MSP",
          link: "/grant/NER-H-MSP/investments",
        },
        {
          type: "Active",
          label:
            "Program to strengthen the national response to HIV/AIDS and health systems in Niger",
          value: "NER-H-MSP",
          link: "/grant/NER-H-MSP/investments",
        },
        {
          type: "Active",
          label:
            "Program to strengthen the national response to HIV/AIDS and health systems in Niger",
          value: "NER-H-MSP",
          link: "/grant/NER-H-MSP/investments",
        },
      ],
    },
    {
      name: "Result(s)",
      results: [
        {
          type: "",
          label: "People on antiretroviral for HIV",
          value: "People on antiretroviral for HIV",
          link: "/results",
        },
        {
          type: "",
          label:
            "HIV-positive pregnant women who received ART during pregnancy",
          value:
            "HIV-positive pregnant women who received ART during pregnancy",
          link: "/results",
        },
        {
          type: "",
          label: "Number of HIV tests taken among general population",
          value: "Number of HIV tests taken among general population",
          link: "/results",
        },
        {
          type: "",
          label: "Number of HIV tests taken among other vulnerable population",
          value: "Number of HIV tests taken among other vulnerable population",
          link: "/results",
        },
        {
          type: "",
          label:
            "People on ART with suppressed viral load at 12 months (<1000 copies/ml)",
          value:
            "People on ART with suppressed viral load at 12 months (<1000 copies/ml)",
          link: "/results",
        },
        {
          type: "",
          label: "Number of HIV tests taken among general population",
          value: "Number of HIV tests taken among general population",
          link: "/results",
        },
      ],
    },
    {
      name: "Document(s)",
      results: [],
    },
    {
      name: "Other(s)",
      results: [
        {
          type: "",
          label: "Eligibility",
          value: "Eligibility",
          link: "/viz/eligibility",
        },
      ],
    },
  ];

  return (
    <SearchLayout
      value={value}
      results={results}
      setValue={setValue}
      activeTab={activeTab}
      setActiveTab={setActiveTab}
    />
  );
}
