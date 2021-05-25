import { InputNode, InputLink } from "@nivo/network";

export interface NetworkVizProps {
  data: {
    nodes: InputNode[];
    links: InputLink[];
  };
  selectedNodeId: string | undefined;
  onNodeClick: (node: string, x: number, y: number) => void;
}

export const mockdata = {
  nodes: [
    {
      id: "Jan 2018 - Jun 2018",
      radius: 12,
      depth: 0,
      color: "#262C34",
      borderColor: "#ADB5BD",
    },
    {
      id: "Impact",
      radius: 12,
      depth: 1,
      color: "#ADB5BD",
      borderColor: "#262C34",
    },
    {
      id: "Coverage/Output",
      radius: 12,
      depth: 1,
      color: "#ADB5BD",
      borderColor: "#262C34",
    },
    {
      id: "Outcome",
      radius: 12,
      depth: 1,
      color: "#ADB5BD",
      borderColor: "#262C34",
    },
    {
      id: "Comprehensive prevention programs for MSM",
      radius: 12,
      depth: 2,
      color: "#fff",
      borderColor: "#262C34",
    },
    {
      id: "Module B",
      radius: 12,
      depth: 2,
      color: "#fff",
      borderColor: "#262C34",
    },
    {
      id: "Module C",
      radius: 12,
      depth: 2,
      color: "#fff",
      borderColor: "#262C34",
    },
    {
      id: "Result A-A",
      radius: 12,
      depth: 3,
      color: "#11AD6B",
      borderColor: "#262C34",
    },
    {
      id: "Result A-B",
      radius: 12,
      depth: 3,
      color: "#FFD646",
      borderColor: "#262C34",
    },
    {
      id: "Result A-C",
      radius: 12,
      depth: 3,
      color: "#11AD6B",
      borderColor: "#262C34",
    },
    {
      id: "Result B-A",
      radius: 12,
      depth: 3,
      color: "#11AD6B",
      borderColor: "#262C34",
    },
    {
      id: "Result B-B",
      radius: 12,
      depth: 3,
      color: "#11AD6B",
      borderColor: "#262C34",
    },
    {
      id: "Result B-C",
      radius: 12,
      depth: 3,
      color: "#FFD646",
      borderColor: "#262C34",
    },
    {
      id: "Result C-A",
      radius: 12,
      depth: 3,
      color: "#FA7355",
      borderColor: "#262C34",
    },
    {
      id: "Result C-B",
      radius: 12,
      depth: 3,
      color: "#11AD6B",
      borderColor: "#262C34",
    },
    {
      id: "Result C-C",
      radius: 12,
      depth: 3,
      color: "#FFD646",
      borderColor: "#262C34",
    },
  ],
  links: [
    {
      source: "Jan 2018 - Jun 2018",
      target: "Impact",
      distance: 20,
    },
    {
      source: "Jan 2018 - Jun 2018",
      target: "Coverage/Output",
      distance: 20,
    },
    {
      source: "Jan 2018 - Jun 2018",
      target: "Outcome",
      distance: 20,
    },
    {
      source: "Impact",
      target: "Comprehensive prevention programs for MSM",
      distance: 50,
    },
    {
      source: "Coverage/Output",
      target: "Module B",
      distance: 50,
    },
    {
      source: "Outcome",
      target: "Module C",
      distance: 50,
    },
    {
      source: "Comprehensive prevention programs for MSM",
      target: "Result A-A",
      distance: 120,
    },
    {
      source: "Comprehensive prevention programs for MSM",
      target: "Result A-B",
      distance: 120,
    },
    {
      source: "Comprehensive prevention programs for MSM",
      target: "Result A-C",
      distance: 120,
    },
    {
      source: "Module B",
      target: "Result B-A",
      distance: 120,
    },
    {
      source: "Module B",
      target: "Result B-B",
      distance: 120,
    },
    {
      source: "Module B",
      target: "Result B-C",
      distance: 120,
    },
    {
      source: "Module C",
      target: "Result C-A",
      distance: 120,
    },
    {
      source: "Module C",
      target: "Result C-B",
      distance: 120,
    },
    {
      source: "Module C",
      target: "Result C-C",
      distance: 120,
    },
  ],
};
