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
        },
      ],
    },
    {
      name: "Finance",
      results: [
        {
          type: "Investment",
          label: "Investments",
          value: "Investments",
        },
        {
          type: "Investment",
          label: "Budget",
          value: "Budget",
        },
        {
          type: "Investment",
          label: "Allocation",
          value: "Allocation",
        },
        {
          type: "Donor",
          label: "Pledges & Contributions",
          value: "Pledges & Contributions",
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
        },
        {
          type: "Active",
          label:
            "Program to strengthen the national response to HIV/AIDS and health systems in Niger",
          value: "NER-H-MSP",
        },
        {
          type: "Active",
          label:
            "Program to strengthen the national response to HIV/AIDS and health systems in Niger",
          value: "NER-H-MSP",
        },
        {
          type: "Active",
          label:
            "Program to strengthen the national response to HIV/AIDS and health systems in Niger",
          value: "NER-H-MSP",
        },
        {
          type: "Active",
          label:
            "Program to strengthen the national response to HIV/AIDS and health systems in Niger",
          value: "NER-H-MSP",
        },
        {
          type: "Active",
          label:
            "Program to strengthen the national response to HIV/AIDS and health systems in Niger",
          value: "NER-H-MSP",
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
        },
        {
          type: "",
          label:
            "HIV-positive pregnant women who received ART during pregnancy",
          value:
            "HIV-positive pregnant women who received ART during pregnancy",
        },
        {
          type: "",
          label: "Number of HIV tests taken among general population",
          value: "Number of HIV tests taken among general population",
        },
        {
          type: "",
          label: "Number of HIV tests taken among other vulnerable population",
          value: "Number of HIV tests taken among other vulnerable population",
        },
        {
          type: "",
          label:
            "People on ART with suppressed viral load at 12 months (<1000 copies/ml)",
          value:
            "People on ART with suppressed viral load at 12 months (<1000 copies/ml)",
        },
        {
          type: "",
          label: "Number of HIV tests taken among general population",
          value: "Number of HIV tests taken among general population",
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
