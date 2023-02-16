/* eslint-disable camelcase */
import React from "react";
import find from "lodash/find";
import filter from "lodash/filter";
import { Route, Redirect } from "react-router-dom";
import { PageLoader } from "app/modules/common/page-loader";
import { useFilterOptions } from "app/hooks/useFilterOptions";
import { NoMatchPage } from "app/modules/common/no-match-page";
import { FilterGroupOptionModel } from "app/components/ToolBoxPanel/components/filters/data";

export function V1RouteRedirections() {
  return (
    <React.Fragment>
      {/* Donors */}
      <Route
        exact
        path="/donors/home/:donor_partner?/:rep_cycle?"
        render={(routeProps: any) => (
          <DonorRedirect {...routeProps} viz="map" />
        )}
      />
      <Route
        exact
        path="/donors/partners/:donor_partner?/:rep_cycle?"
        render={(routeProps: any) => (
          <DonorRedirect {...routeProps} viz="treemap" />
        )}
      />
      <Route
        exact
        path="/donors/replenishment-periods/:donor_partner?/:rep_cycle?"
        render={(routeProps: any) => (
          <DonorRedirect {...routeProps} viz="time-cycle" />
        )}
      />
      {/* Investments */}
      <Route exact path="/investments/home">
        <Redirect to="/" />
      </Route>
      <Route
        exact
        path="/investments/locations/:location?/:component?/:partner_type?/:grant_status?"
        render={(routeProps: any) => (
          <InvestmentsRedirect
            {...routeProps}
            pageRoute="viz/disbursements/map"
          />
        )}
      />
      <Route
        exact
        path="/investments/components/:location?/:component?/:partner_type?/:grant_status?"
        render={(routeProps: any) => (
          <InvestmentsRedirect
            {...routeProps}
            pageRoute="viz/disbursements/treemap"
          />
        )}
      />
      <Route
        exact
        path="/investments/grants/:location?/:component?/:partner_type?/:grant_status?"
        render={(routeProps: any) => (
          <InvestmentsRedirect {...routeProps} pageRoute="grants" />
        )}
      />
      <Route
        exact
        path="/investments/partners/:location?/:component?/:partner_type?/:grant_status?"
      >
        <Redirect to="/" />
      </Route>
      <Route
        exact
        path="/investments/documents/:location?/:component?/:partner_type?/:grant_status?"
        render={(routeProps: any) => (
          <InvestmentsRedirect {...routeProps} pageRoute="documents" />
        )}
      />
      {/* Results */}
      <Route
        exact
        path="/results/:component/:location?"
        render={(routeProps: any) => {
          const { location, component } = routeProps.match.params;
          let filterString = "";
          if (location && location !== "-") {
            filterString += `locations=${location}&`;
          }
          if (component && component !== "-") {
            filterString += `components=${component}&`;
          }
          return (
            <Redirect
              to={`/results${
                filterString.length > 0 ? "?" : ""
              }${filterString}`}
            />
          );
        }}
      />
      {/* Detail pages */}
      <Route
        exact
        path="/investments/location/:location/:component?/:partner_type?/:grant_status?"
        render={(routeProps: any) => (
          <InvestmentsLocationRedirect {...routeProps} />
        )}
      />
      <Route
        exact
        path="/investments/grant/:grantId/:tab?/:location?/:component?/:partner_type?/:grant_status?"
        render={(routeProps: any) => {
          const { grantId, tab } = routeProps.match.params;
          return <Redirect to={`/grant/${grantId}${tab ? `/${tab}` : ""}`} />;
        }}
      />
      <Route
        exact
        path="/investments/partner/:partnerName/:location?/:component?/:partner_type?/:grant_status?"
        render={(routeProps: any) => <PartnerRedirect {...routeProps} />}
      />
      <Route exact path="/investments/about">
        <Redirect to="/about" />
      </Route>
      <Route path="*">
        <NoMatchPage />
      </Route>
    </React.Fragment>
  );
}

function PartnerRedirect(props: any) {
  const filterOptions = useFilterOptions({ returnFilterOptions: true });
  const [partnerId, setPartnerId] = React.useState<string | null>(null);
  const { location, component, partnerName, grant_status, partner_type } =
    props.match.params;

  React.useEffect(() => {
    const options = filterOptions?.["Partner Types"];
    if (options) {
      const allOptions: FilterGroupOptionModel[] = [];
      options.forEach((option: FilterGroupOptionModel) => {
        option.subOptions?.forEach((subOption: FilterGroupOptionModel) => {
          if (subOption.subOptions) {
            subOption.subOptions.forEach(
              (subSubOption: FilterGroupOptionModel) => {
                allOptions.push(subSubOption);
              }
            );
          } else {
            allOptions.push(subOption);
          }
        });
      });
      const fOption = find(allOptions, {
        label: decodeURIComponent(partnerName),
      });
      if (fOption) {
        setPartnerId(fOption.value);
      }
    }
  }, [filterOptions?.["Partner Types"]]);

  if (!partnerId) {
    return <PageLoader />;
  }

  let filterString = "";
  if (location && location !== "-") {
    filterString += `locations=${location}&`;
  }
  if (component && component !== "-") {
    filterString += `components=${component}&`;
  }
  if (grant_status && grant_status !== "-") {
    filterString += `status=${grant_status}&`;
  }
  if (partner_type && partner_type !== "-") {
    filterString += `partnerTypes=${partner_type}`;
  }

  return (
    <Redirect
      to={`/partner/${partnerId}/investments${
        filterString.length > 0 ? "?" : ""
      }${filterString}`}
    />
  );
}

function DonorRedirect(props: any) {
  const filterOptions = useFilterOptions({ returnFilterOptions: true });
  const [donorId, setDonorId] = React.useState<string | null>(null);
  const { donor_partner, rep_cycle } = props.match.params;

  React.useEffect(() => {
    const options = filterOptions?.Donors;
    const values = donor_partner?.split(",");
    if (options) {
      const allOptions: FilterGroupOptionModel[] = [];
      options.forEach((option: FilterGroupOptionModel) => {
        option.subOptions?.forEach((subOption: FilterGroupOptionModel) => {
          if (subOption.subOptions) {
            subOption.subOptions.forEach(
              (subSubOption: FilterGroupOptionModel) => {
                allOptions.push(subSubOption);
              }
            );
          } else {
            allOptions.push(subOption);
          }
        });
      });
      const fOptions: FilterGroupOptionModel[] = filter(
        allOptions,
        (o: FilterGroupOptionModel) =>
          find(values, (v: string) => v === o.label)
      ) as FilterGroupOptionModel[];
      if (fOptions) {
        setDonorId(
          fOptions
            .map((option: FilterGroupOptionModel) => option.value)
            .join(",")
        );
      }
    }
  }, [filterOptions?.Donors]);

  if (donor_partner && !donorId) {
    return <PageLoader />;
  }

  let filterString = "";
  if (donor_partner && donor_partner !== "-") {
    filterString += `donors=${donorId}&`;
  }
  if (rep_cycle && rep_cycle !== "-") {
    filterString += `replenishmentPeriods=${rep_cycle}&`;
  }

  return (
    <Redirect
      to={`/viz/pledges-contributions/${props.viz}${
        filterString.length > 0 ? "?" : ""
      }${filterString}`}
    />
  );
}

function InvestmentsRedirect(props: any) {
  const filterOptions = useFilterOptions({ returnFilterOptions: true });
  const [partnerTypes, setPartnerTypes] = React.useState<string | null>(null);
  const { location, component, grant_status, partner_type } =
    props.match.params;

  React.useEffect(() => {
    const options = filterOptions?.["Partner Types"];
    const values = partner_type?.split(",");
    if (options && values && values.length > 0) {
      const fOptions = filter(options, (o: FilterGroupOptionModel) =>
        find(values, (v: string) => v === o.label)
      ) as FilterGroupOptionModel[];
      if (fOptions) {
        setPartnerTypes(
          fOptions.map((o: FilterGroupOptionModel) => o.value).join(",")
        );
      }
    }
  }, [filterOptions?.["Partner Types"]]);

  if (partner_type && partner_type !== "-" && !partnerTypes) {
    return <PageLoader />;
  }

  let filterString = "";

  if (location && location !== "-") {
    filterString += `locations=${location}&`;
  }
  if (component && component !== "-") {
    filterString += `components=${component}&`;
  }
  if (grant_status && grant_status !== "-") {
    filterString += `status=${grant_status}&`;
  }
  if (partner_type && partner_type !== "-") {
    filterString += `partnerTypes=${partnerTypes}`;
  }
  return (
    <Redirect
      to={`/${props.pageRoute}${
        filterString.length > 0 ? "?" : ""
      }${filterString}`}
    />
  );
}

function InvestmentsLocationRedirect(props: any) {
  const filterOptions = useFilterOptions({ returnFilterOptions: true });
  const [partnerTypes, setPartnerTypes] = React.useState<string | null>(null);
  const { location, component, grant_status, partner_type } =
    props.match.params;

  React.useEffect(() => {
    const options = filterOptions?.["Partner Types"];
    const values = partner_type?.split(",");
    if (options && values && values.length > 0) {
      const fOptions = filter(options, (o: FilterGroupOptionModel) =>
        find(values, (v: string) => v === o.label)
      ) as FilterGroupOptionModel[];
      if (fOptions) {
        setPartnerTypes(
          fOptions.map((o: FilterGroupOptionModel) => o.value).join(",")
        );
      }
    }
  }, [filterOptions?.["Partner Types"]]);

  if (partner_type && partner_type !== "-" && !partnerTypes) {
    return <PageLoader />;
  }

  let filterString = "";

  if (component && component !== "-") {
    filterString += `components=${component}&`;
  }
  if (grant_status && grant_status !== "-") {
    filterString += `status=${grant_status}&`;
  }
  if (partner_type && partner_type !== "-" && partnerTypes) {
    filterString += `partnerTypes=${partnerTypes}`;
  }

  return (
    <Redirect
      to={`/location/${location}/overview${
        filterString.length > 0 ? "?" : ""
      }${filterString}`}
    />
  );
}
