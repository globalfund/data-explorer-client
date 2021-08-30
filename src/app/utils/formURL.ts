function getView() {
  if (window.location.pathname.indexOf("results") > -1) {
    return "results";
  }
  if (window.location.pathname.indexOf("pledges-contributions") > -1) {
    return "donors";
  }
  return "investments";
}

export function formURL(
  filters: {
    locations: string[];
    components: string[];
    partnerTypes: string[];
    status: string[];
    replenishmentPeriods: string[];
    donors: string[];
  },
  path: string,
  hash?: string
): string {
  /* investments */
  const locations = filters.locations
    .map((filter) => filter.replace("/", "|"))
    .join(",");
  const components = filters.components
    .map((filter) => filter.replace("/", "|"))
    .join(",");
  const partnerTypes = filters.partnerTypes
    .map((filter) => filter.replace("/", "|"))
    .join(",");
  const grantStatuses = filters.status.join(",");
  /* donors */
  const donors = filters.donors
    .map((filter) => filter.replace("/", "|"))
    .join(",");
  const repCycles = filters.replenishmentPeriods
    .map((filter) => filter.replace("/", "|"))
    .join(",");

  const paramArr = [];

  if (getView() === "investments") {
    if (locations === "") {
      if (components !== "" || partnerTypes !== "" || grantStatuses !== "") {
        paramArr.push("-");
      }
    } else {
      paramArr.push(locations);
    }

    if (components === "") {
      if (partnerTypes !== "" || grantStatuses !== "") {
        paramArr.push("-");
      }
    } else {
      paramArr.push(components);
    }

    if (partnerTypes === "") {
      if (grantStatuses !== "") {
        paramArr.push("-");
      }
    } else {
      paramArr.push(partnerTypes);
    }

    if (grantStatuses !== "") paramArr.push(grantStatuses);
  }

  if (getView() === "donors") {
    if (donors === "") {
      if (repCycles !== "") {
        paramArr.push("-");
      }
    } else {
      paramArr.push(donors);
    }

    if (repCycles !== "") paramArr.push(repCycles);
  }

  if (getView() === "results") {
    if (locations !== "") {
      paramArr.push(locations);
    }
  }

  const url = paramArr.join("/");

  return `${path}${url.length > 0 ? "/" : ""}${url}${hash || ""}`;
}
