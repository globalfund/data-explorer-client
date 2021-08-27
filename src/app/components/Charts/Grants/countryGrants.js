const fs = require("fs");
const axios = require("axios");
const lodash = require("lodash");

const selectStr =
    "componentName,grantAgreementTitle,grantAgreementNumber,grantAgreementStatusTypeName,programStartDate,programEndDate,implementationPeriodStatusTypeName,implementationPeriodNumber,implementationPeriodStartDate,implementationPeriodEndDate,totalDisbursedAmount";


export function getMockData() {
    const filterStr = `geographicAreaCode_ISO3 eq 'IND'`;
    axios
        .all([
            axios.get(
                `https://data-service.theglobalfund.org/v3.3/odata/VGrantAgreementImplementationPeriods/?$select=${selectStr}&$filter=${filterStr}`,
                {
                    "Content-Type": "application/json",
                }
            ),
            axios.get(
                `https://data-service.theglobalfund.org/v3.3/odata/VGrantAgreements/?$select=grantAgreementNumber,performanceRatingCode&$filter=${filterStr}`,
                {
                    "Content-Type": "application/json",
                }
            ),
        ])
        .then((res) => {
            const ipData = res[0].data.value;
            const grantsData = res[1].data.value;
            const groupedGrants = lodash.groupBy(ipData, "grantAgreementNumber");
            const results = [];
            Object.keys(groupedGrants).forEach((grant) => {
                const items = groupedGrants[grant];
                results.push({
                    name: items[0].grantAgreementNumber,
                    years: [
                        parseInt(items[0].programStartDate.slice(0, 4), 10),
                        parseInt(items[0].programEndDate.slice(0, 4), 10),
                    ],
                    value: lodash.sumBy(items, "totalDisbursedAmount"),
                    component: items[0].componentName,
                    status: items[0].grantAgreementStatusTypeName,
                    rating: "None",
                    implementationPeriods: lodash.sortBy(
                        items.map((item) => ({
                            name: item.implementationPeriodNumber,
                            years: [
                                parseInt(item.implementationPeriodStartDate.slice(0, 4), 10),
                                parseInt(item.implementationPeriodEndDate.slice(0, 4), 10),
                            ],
                            value: item.totalDisbursedAmount,
                            status: item.implementationPeriodStatusTypeName,
                            rating: lodash.get(
                                lodash.find(grantsData, {
                                    grantAgreementNumber: item.grantAgreementNumber,
                                }),
                                "performanceRatingCode",
                                "None"
                            ),
                        })),
                        "name"
                    ),
                });
            });
            // fs.writeFile("grants.json", JSON.stringify(results), (err) => {
            //     if (err) console.error(err);
            // });
            console.log(JSON.stringify(results))
            return JSON.stringify(results);
        })
        .catch((err) => {
            console.log(err);
        });
}