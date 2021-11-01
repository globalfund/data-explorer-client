/* eslint-disable camelcase */
import React from "react";
import find from "lodash/find";
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
        render={(routeProps: any) => {
          const { donor_partner, rep_cycle } = routeProps.match.params;
          let filterString = "";
          if (donor_partner) {
            filterString += `donors=${donor_partner}&`;
          }
          if (rep_cycle) {
            filterString += `replenishmentPeriods=${rep_cycle}&`;
          }
          return (
            <Redirect
              to={`/viz/pledges-contributions/map${
                filterString.length > 0 ? "?" : ""
              }${filterString}`}
            />
          );
        }}
      />
      <Route
        exact
        path="/donors/partners/:donor_partner?/:rep_cycle?"
        render={(routeProps: any) => {
          const { donor_partner, rep_cycle } = routeProps.match.params;
          let filterString = "";
          if (donor_partner) {
            filterString += `donors=${donor_partner}&`;
          }
          if (rep_cycle) {
            filterString += `replenishmentPeriods=${rep_cycle}&`;
          }
          return (
            <Redirect
              to={`/viz/pledges-contributions/treemap${
                filterString.length > 0 ? "?" : ""
              }${filterString}`}
            />
          );
        }}
      />
      <Route
        exact
        path="/donors/replenishment-periods/:donor_partner?/:rep_cycle?"
        render={(routeProps: any) => {
          const { donor_partner, rep_cycle } = routeProps.match.params;
          let filterString = "";
          if (donor_partner) {
            filterString += `donors=${donor_partner}&`;
          }
          if (rep_cycle) {
            filterString += `replenishmentPeriods=${rep_cycle}&`;
          }
          return (
            <Redirect
              to={`/viz/pledges-contributions/time-cycle${
                filterString.length > 0 ? "?" : ""
              }${filterString}`}
            />
          );
        }}
      />
      {/* Investments */}
      <Route exact path="/investments/home">
        <Redirect to="/" />
      </Route>
      <Route
        exact
        path="/investments/locations/:location?/:component?/:partner_type?/:grant_status?"
        render={(routeProps: any) => {
          const {
            location,
            component,
            grant_status,
            partner_type,
          } = routeProps.match.params;
          let filterString = "";
          if (location) {
            filterString += `locations=${location}&`;
          }
          if (component) {
            filterString += `components=${component}&`;
          }
          if (grant_status) {
            filterString += `status=${grant_status}&`;
          }
          if (partner_type) {
            filterString += `partnerTypes=${partner_type}`;
          }
          return (
            <Redirect
              to={`/viz/disbursements/map${
                filterString.length > 0 ? "?" : ""
              }${filterString}`}
            />
          );
        }}
      />
      <Route
        exact
        path="/investments/components/:location?/:component?/:partner_type?/:grant_status?"
        render={(routeProps: any) => {
          const {
            location,
            component,
            grant_status,
            partner_type,
          } = routeProps.match.params;
          let filterString = "";
          if (location) {
            filterString += `locations=${location}&`;
          }
          if (component) {
            filterString += `components=${component}&`;
          }
          if (grant_status) {
            filterString += `status=${grant_status}&`;
          }
          if (partner_type) {
            filterString += `partnerTypes=${partner_type}`;
          }
          return (
            <Redirect
              to={`/viz/disbursements/treemap${
                filterString.length > 0 ? "?" : ""
              }${filterString}`}
            />
          );
        }}
      />
      <Route
        exact
        path="/investments/grants/:location?/:component?/:partner_type?/:grant_status?"
        render={(routeProps: any) => {
          const {
            location,
            component,
            grant_status,
            partner_type,
          } = routeProps.match.params;
          let filterString = "";
          if (location) {
            filterString += `locations=${location}&`;
          }
          if (component) {
            filterString += `components=${component}&`;
          }
          if (grant_status) {
            filterString += `status=${grant_status}&`;
          }
          if (partner_type) {
            filterString += `partnerTypes=${partner_type}`;
          }
          return (
            <Redirect
              to={`/grants${filterString.length > 0 ? "?" : ""}${filterString}`}
            />
          );
        }}
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
        render={(routeProps: any) => {
          const {
            location,
            component,
            grant_status,
            partner_type,
          } = routeProps.match.params;
          let filterString = "";
          if (location) {
            filterString += `locations=${location}&`;
          }
          if (component) {
            filterString += `components=${component}&`;
          }
          if (grant_status) {
            filterString += `status=${grant_status}&`;
          }
          if (partner_type) {
            filterString += `partnerTypes=${partner_type}`;
          }
          return (
            <Redirect
              to={`/documents${
                filterString.length > 0 ? "?" : ""
              }${filterString}`}
            />
          );
        }}
      />
      {/* Results */}
      <Route
        exact
        path="/results/:component/:location?"
        render={(routeProps: any) => {
          const { location, component } = routeProps.match.params;
          let filterString = "";
          if (location) {
            filterString += `locations=${location}&`;
          }
          if (component && component !== "all") {
            filterString += `components=${component.replace("|", "/")}&`;
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
        render={(routeProps: any) => {
          const {
            location,
            component,
            grant_status,
            partner_type,
          } = routeProps.match.params;
          let filterString = "";
          if (component) {
            filterString += `components=${component}&`;
          }
          if (grant_status) {
            filterString += `status=${grant_status}&`;
          }
          if (partner_type) {
            filterString += `partnerTypes=${partner_type}`;
          }
          return (
            <Redirect
              to={`/location/${location}${
                filterString.length > 0 ? "?" : ""
              }${filterString}`}
            />
          );
        }}
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
  const {
    location,
    component,
    partnerName,
    grant_status,
    partner_type,
  } = props.match.params;

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
  if (location) {
    filterString += `locations=${location}&`;
  }
  if (component) {
    filterString += `components=${component}&`;
  }
  if (grant_status) {
    filterString += `status=${grant_status}&`;
  }
  if (partner_type) {
    filterString += `partnerTypes=${partner_type}`;
  }

  return (
    <Redirect
      to={`/partner/${partnerId}${
        filterString.length > 0 ? "?" : ""
      }${filterString}`}
    />
  );
}
