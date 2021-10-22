export interface ExpandableTableRowDocProps {
  title: string;
  link: string;
}

export interface ExpandableTableRowDocCategoryProps {
  name: string;
  count: number;
  docs: ExpandableTableRowDocProps[];
}

export interface ExpandableTableRowProps {
  name: string;
  link?: string;
  count?: number;
  docCategories?: ExpandableTableRowProps[];
  docs?: {
    title: string;
    link: string;
  }[];
}

export interface ExpandableTableProps {
  columns: string[];
  forceExpand?: boolean;
  rows: ExpandableTableRowProps[];
}

export const docsmockdata: ExpandableTableRowProps[] = [
  {
    name: "Afghanistan",
    count: 17,
    docCategories: [
      {
        name: "Application",
        count: 17,
        docs: [
          {
            title: " Funding Request HIV - 2020",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Funding Requests/AFG/2020/HIV/en/AFG-H_FundingRequest_2_en.zip",
          },
          {
            title: " Funding Request Malaria - 2020",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Funding Requests/AFG/2020/Malaria/en/AFG-M_FundingRequest_1_en.zip",
          },
          {
            title: " Funding Request Tuberculosis - 2017",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Funding Requests/AFG/2017/Tuberculosis/en/AFG-T_FundingRequest_0_en.zip",
          },
          {
            title: " Funding Request HIV - 2017",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Funding Requests/AFG/2017/HIV/en/AFG-H_FundingRequest_0_en.zip",
          },
          {
            title: " Funding Request Malaria - 2017",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Funding Requests/AFG/2017/Malaria/en/AFG-M_FundingRequest_0_en.zip",
          },
          {
            title: " Concept Note Malaria - 2015",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Concept Notes/AFG/2015/Malaria/en/AFG-M_ConceptNote_0_en.zip",
          },
          {
            title: " Concept Note HIV - 2015",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Concept Notes/AFG/2015/HIV/en/AFG-H_ConceptNote_0_en.zip",
          },
          {
            title: " Concept Note RSSH - 2014",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Concept Notes/AFG/2014/RSSH/en/AFG-S_ConceptNote_0_en.zip",
          },
          {
            title: " Concept Note Tuberculosis - 2014",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Concept Notes/AFG/2014/Tuberculosis/en/AFG-T_ConceptNote_0_en.zip",
          },
          {
            title: " Proposal HIV - Transitional Funding Mechanism",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Proposals/AFG/Transitional Funding Mechanism/HIV/en/AFG-TFM-HA_Proposal_0_en.pdf",
          },
          {
            title: " Proposal Tuberculosis - Round 10",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Proposals/AFG/Round 10/Tuberculosis/en/AFG-R10-TB_Proposal_0_en.pdf",
          },
          {
            title: " Proposal Tuberculosis - Round 08",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Proposals/AFG/Round 08/Tuberculosis/en/AFG-R08-TB_Proposal_0_en.pdf",
          },
          {
            title: " Proposal Malaria - Round 08",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Proposals/AFG/Round 08/Malaria/en/AFG-R08-ML_Proposal_0_en.pdf",
          },
          {
            title: " Proposal HIV - Round 07",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Proposals/AFG/Round 07/HIV/en/AFG-R07-HA_Proposal_0_en.pdf",
          },
          {
            title: " Proposal Malaria - Round 05",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Proposals/AFG/Round 05/Malaria/en/AFG-R05-ML_Proposal_0_en.pdf",
          },
          {
            title: " Proposal Tuberculosis - Round 04",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Proposals/AFG/Round 04/Tuberculosis/en/AFG-R04-TB_Proposal_0_en.pdf",
          },
          {
            title: " Proposal RSSH - Round 02",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Proposals/AFG/Round 02/RSSH/en/AFG-R02-Integrated_Proposal_0_en.pdf",
          },
        ],
      },
    ],
  },
  {
    name: "Africa",
    count: 12,
    docCategories: [
      {
        name: "Application",
        count: 12,
        docs: [
          {
            title: " Concept Note Malaria - 2016",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Concept Notes/QPA/Multicountry Southern Africa E8/2016/Malaria/en/QPA-M_ConceptNote_0_en.zip",
          },
          {
            title: " Concept Note Malaria - 2016",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Concept Notes/QPA/Multicountry Southern Africa MOSASWA/2016/Malaria/en/QPA-M_ConceptNote_1_en.zip",
          },
          {
            title: " Concept Note TB/HIV - 2016",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Concept Notes/QPA/Multicountry Eastern Africa IGAD/2016/TB_HIV/en/QPA-C_ConceptNote_0_en.zip",
          },
          {
            title: " Concept Note HIV - 2015",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Concept Notes/QPA/Multicountry Eastern Africa ANECCA/2015/HIV/en/QPA-H_ConceptNote_0_en.zip",
          },
          {
            title: " Concept Note HIV - 2015",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Concept Notes/QPA/Multicountry Southern Africa HIVOS/2015/HIV/en/QPA-H_ConceptNote_1_en.zip",
          },
          {
            title: " Concept Note HIV - 2015",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Concept Notes/QPA/Multicountry Southern Africa ARASA/2015/HIV/en/QPA-H_ConceptNote_2_en.zip",
          },
          {
            title: " Concept Note Tuberculosis - 2015",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Concept Notes/QPA/Multicountry Africa ECSA-HC/2015/Tuberculosis/en/QPA-T_ConceptNote_0_en.zip",
          },
          {
            title: " Concept Note Tuberculosis - 2015",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Concept Notes/QPA/Multicountry Southern Africa WHC/2015/Tuberculosis/en/QPA-T_ConceptNote_1_en.zip",
          },
          {
            title: " Proposal HIV - Round 09",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Proposals/QPA/Multicountry Southern Africa SADC/Round 09/HIV/en/MAS-R09-HA_Proposal_0_en.pdf",
          },
          {
            title: " Proposal Malaria - Round 05",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Proposals/QPA/Multicountry Africa (RMCC)/Round 05/Malaria/en/MAF-R05-ML_Proposal_0_en.pdf",
          },
          {
            title: " Proposal Malaria - Round 02",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Proposals/QPA/Multicountry Africa (RMCC)/Round 02/Malaria/en/MAF-R02-ML_RCCProposal_0_en.pdf",
          },
          {
            title: " Proposal Malaria - Round 02",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Proposals/QPA/Multicountry Africa (RMCC)/Round 02/Malaria/en/MAF-R02-ML_Proposal_0_en.pdf",
          },
        ],
      },
    ],
  },
  {
    name: "Albania",
    count: 4,
    docCategories: [
      {
        name: "Application",
        count: 4,
        docs: [
          {
            title: " Funding Request TB/HIV - 2019",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Funding Requests/ALB/2019/TB_HIV/en/ALB-C_FundingRequest_0_en.zip",
          },
          {
            title: " Concept Note TB/HIV - 2015",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Concept Notes/ALB/2015/TB_HIV/en/ALB-C_ConceptNote_0_en.zip",
          },
          {
            title: " Proposal Tuberculosis - Round 05",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Proposals/ALB/Round 05/Tuberculosis/en/ALB-R05-TB_Proposal_0_en.pdf",
          },
          {
            title: " Proposal HIV - Round 05",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Proposals/ALB/Round 05/HIV/en/ALB-R05-HA_Proposal_0_en.pdf",
          },
        ],
      },
    ],
  },
  {
    name: "Algeria",
    count: 4,
    docCategories: [
      {
        name: "Application",
        count: 4,
        docs: [
          {
            title: " Funding Request HIV - 2019",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Funding Requests/DZA/2019/HIV/en/DZA-H_FundingRequest_0_en.zip",
          },
          {
            title: " Concept Note HIV - 2016",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Concept Notes/DZA/2016/HIV/en/DZA-H_ConceptNote_0_en.zip",
          },
          {
            title: " Proposal HIV - Round 03",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Proposals/DZA/Round 03/HIV/fr/DZA-R03-HA_Proposal_0_fr.pdf",
          },
          {
            title: " Proposal HIV - Round 03",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Proposals/DZA/Round 03/HIV/en/DZA-R03-HA_Proposal_0_en.pdf",
          },
        ],
      },
    ],
  },
  {
    name: "Americas",
    count: 11,
    docCategories: [
      {
        name: "Application",
        count: 11,
        docs: [
          {
            title: " Funding Request Tuberculosis - 2020",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Funding Requests/QRA/Multicountry Americas ORAS-CONHU/2020/Tuberculosis/en/QRA-T_FundingRequest_2_en.zip",
          },
          {
            title: " Concept Note Tuberculosis - 2016",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Concept Notes/QRA/Multicountry Americas ORAS-CONHU/2016/Tuberculosis/en/QRA-T_ConceptNote_0_en.zip",
          },
          {
            title: " Concept Note HIV - 2016",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Concept Notes/QRA/Multicountry Americas CVC-COIN/2016/HIV/en/QRA-H_ConceptNote_2_en.zip",
          },
          {
            title: " Concept Note HIV - 2015",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Concept Notes/QRA/Multicountry Americas REDLACTRANS/2015/HIV/en/QRA-H_ConceptNote_1_en.zip",
          },
          {
            title: " Concept Note HIV - 2015",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Concept Notes/QRA/Multicountry Americas ICW/2015/HIV/en/QRA-H_ConceptNote_0_en.zip",
          },
          {
            title: " Proposal HIV - Round 10",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Proposals/QRA/Multicountry Americas REDTRASEX/Round 10/HIV/en/MAT-R10-HA_Proposal_0_en.pdf",
          },
          {
            title: " Proposal HIV - Round 09",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Proposals/QRA/Multicountry Americas COPRECOS/Round 09/HIV/en/MCP-R09-HA_Proposal_0_en.pdf",
          },
          {
            title: " Proposal HIV - Round 09",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Proposals/QRA/Multicountry Caribbean CARICOM-PANCAP/Round 09/HIV/en/MAC-R09-HA_Proposal_0_en.pdf",
          },
          {
            title: " Proposal HIV - Round 04",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Proposals/QRA/Round 04/HIV/en/MAM-R04-HA_Proposal_0_en.pdf",
          },
          {
            title: " Proposal HIV - Round 04",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Proposals/QRA/Multicountry Americas (CRN+)/Round 04/HIV/en/MAN-R04-HA_Proposal_0_en.pdf",
          },
          {
            title: " Proposal HIV - Round 03",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Proposals/QRA/Multicountry Caribbean CARICOM-PANCAP/Round 03/HIV/en/MAC-R03-HA_Proposal_0_en.pdf",
          },
        ],
      },
    ],
  },
  {
    name: "Angola",
    count: 14,
    docCategories: [
      {
        name: "Application",
        count: 14,
        docs: [
          {
            title: " Funding Request TB/HIV - 2017",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Funding Requests/AGO/2017/TB_HIV/en/AGO-C_FundingRequest_en.zip",
          },
          {
            title: " Funding Request Malaria - 2017",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Funding Requests/AGO/2017/Malaria/en/AGO-M_FundingRequest_0_en.zip",
          },
          {
            title: " Funding Request Malaria - 2017",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Funding Requests/AGO/2017/Malaria/en/AGO-M_FundingRequest_en.zip",
          },
          {
            title: " Funding Request TB/HIV - 2017",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Funding Requests/AGO/2017/TB_HIV/en/AGO-C_FundingRequest_0_en.zip",
          },
          {
            title: " Concept Note Malaria - 2015",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Concept Notes/AGO/2015/Malaria/en/AGO-M_ConceptNote_0_en.zip",
          },
          {
            title: " Concept Note TB/HIV - 2015",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Concept Notes/AGO/2015/TB_HIV/en/AGO-C_ConceptNote_0_en.zip",
          },
          {
            title: " Proposal HIV - Transitional Funding Mechanism",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Proposals/AGO/Transitional Funding Mechanism/HIV/en/AGO-TFM-HA_Proposal_0_en.pdf",
          },
          {
            title: " Proposal Malaria - Round 10",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Proposals/AGO/Round 10/Malaria/en/AGO-R10-ML_Proposal_0_en.pdf",
          },
          {
            title: " Proposal HIV - Round 10",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Proposals/AGO/Round 10/HIV/en/AGO-R10-HA_Proposal_0_en.pdf",
          },
          {
            title: " Proposal Tuberculosis - Round 09",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Proposals/AGO/Round 09/Tuberculosis/en/AGO-R09-TB_Proposal_0_en.pdf",
          },
          {
            title: " Proposal Malaria - Round 07",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Proposals/AGO/Round 07/Malaria/en/AGO-R07-ML_Proposal_0_en.pdf",
          },
          {
            title: " Proposal Tuberculosis - Round 04",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Proposals/AGO/Round 04/Tuberculosis/en/AGO-R04-TB_Proposal_0_en.pdf",
          },
          {
            title: " Proposal HIV - Round 04",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Proposals/AGO/Round 04/HIV/en/AGO-R04-HA_Proposal_0_en.pdf",
          },
          {
            title: " Proposal Malaria - Round 03",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Proposals/AGO/Round 03/Malaria/en/AGO-R03-ML_Proposal_0_en.pdf",
          },
        ],
      },
    ],
  },
  {
    name: "Argentina",
    count: 3,
    docCategories: [
      {
        name: "Application",
        count: 3,
        docs: [
          {
            title: " Proposal HIV - Round 10",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Proposals/ARG/Round 10/HIV/en/ARG-R10-HA_Proposal_0_en.pdf",
          },
          {
            title: " Proposal HIV - Round 01",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Proposals/ARG/Round 01/HIV/es/ARG-R01-HA_Proposal_0_es.pdf",
          },
          {
            title: " Proposal HIV - Round 01",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Proposals/ARG/Round 01/HIV/en/ARG-R01-HA_Proposal_0_en.pdf",
          },
        ],
      },
    ],
  },
  {
    name: "Armenia",
    count: 10,
    docCategories: [
      {
        name: "Application",
        count: 10,
        docs: [
          {
            title: " Funding Request HIV - 2018",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Funding Requests/ARM/2018/HIV/en/ARM-H_FundingRequest_0_en.zip",
          },
          {
            title: " Funding Request Tuberculosis - 2018",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Funding Requests/ARM/2018/Tuberculosis/en/ARM-T_FundingRequest_0_en.zip",
          },
          {
            title: " Concept Note HIV - 2015",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Concept Notes/ARM/2015/HIV/en/ARM-H_ConceptNote_0_en.zip",
          },
          {
            title: " Concept Note Tuberculosis - 2015",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Concept Notes/ARM/2015/Tuberculosis/en/ARM-T_ConceptNote_0_en.zip",
          },
          {
            title: " Proposal Tuberculosis - Round 10",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Proposals/ARM/Round 10/Tuberculosis/en/ARM-R10-TB_Proposal_0_en.pdf",
          },
          {
            title: " Proposal HIV - Round 08",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Proposals/ARM/Round 08/HIV/en/ARM-R08-HA_Proposal_0_en.pdf",
          },
          {
            title: " Proposal Tuberculosis - Round 08",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Proposals/ARM/Round 08/Tuberculosis/en/ARM-R08-TB_Proposal_0_en.pdf",
          },
          {
            title: " Proposal Tuberculosis - Round 05",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Proposals/ARM/Round 05/Tuberculosis/en/ARM-R05-TB_Proposal_0_en.pdf",
          },
          {
            title: " Proposal HIV - Round 02",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Proposals/ARM/Round 02/HIV/en/ARM-R02-HA_Proposal_0_en.pdf",
          },
          {
            title: " Proposal HIV - Round 02",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Proposals/ARM/Round 02/HIV/en/ARM-R02-HA_RCCProposal_0_en.pdf",
          },
        ],
      },
    ],
  },
  {
    name: "Asia",
    count: 2,
    docCategories: [
      {
        name: "Application",
        count: 2,
        docs: [
          {
            title: " Concept Note HIV - 2016",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Concept Notes/QSA/2016/HIV/en/QSA-H_ConceptNote_1_en.zip",
          },
          {
            title: " Proposal HIV - Round 10",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Proposals/QSA/Multicountry East Asia and Pacific APN/Round 10/HIV/en/MEA-R10-HA_Proposal_0_en.pdf",
          },
        ],
      },
    ],
  },
  {
    name: "Azerbaijan",
    count: 12,
    docCategories: [
      {
        name: "Application",
        count: 12,
        docs: [
          {
            title: " Funding Request TB/HIV - 2020",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Funding Requests/AZE/2020/TB_HIV/en/AZE-C_FundingRequest_1_en.zip",
          },
          {
            title: " Funding Request Tuberculosis - 2017",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Funding Requests/AZE/2017/Tuberculosis/en/AZE-T_FundingRequest_0_en.zip",
          },
          {
            title: " Funding Request HIV - 2017",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Funding Requests/AZE/2017/HIV/en/AZE-H_FundingRequest_0_en.zip",
          },
          {
            title: " Concept Note Tuberculosis - 2015",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Concept Notes/AZE/2015/Tuberculosis/en/AZE-T_ConceptNote_0_en.zip",
          },
          {
            title: " Concept Note HIV - 2015",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Concept Notes/AZE/2015/HIV/en/AZE-H_ConceptNote_0_en.zip",
          },
          {
            title: " Proposal Tuberculosis - Transitional Funding Mechanism",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Proposals/AZE/Transitional Funding Mechanism/Tuberculosis/en/AZE-TFM-TB_Proposal_0_en.pdf",
          },
          {
            title: " Proposal Tuberculosis - Round 09",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Proposals/AZE/Round 09/Tuberculosis/en/AZE-R09-TB_Proposal_0_en.pdf",
          },
          {
            title: " Proposal HIV - Round 09",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Proposals/AZE/Round 09/HIV/en/AZE-R09-HA_Proposal_0_en.pdf",
          },
          {
            title: " Proposal Malaria - Round 07",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Proposals/AZE/Round 07/Malaria/en/AZE-R07-ML_Proposal_0_en.pdf",
          },
          {
            title: " Proposal Tuberculosis - Round 07",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Proposals/AZE/Round 07/Tuberculosis/en/AZE-R07-TB_Proposal_0_en.pdf",
          },
          {
            title: " Proposal Tuberculosis - Round 05",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Proposals/AZE/Round 05/Tuberculosis/en/AZE-R05-TB_Proposal_0_en.pdf",
          },
          {
            title: " Proposal HIV - Round 04",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Proposals/AZE/Round 04/HIV/en/AZE-R04-HA_Proposal_0_en.pdf",
          },
        ],
      },
    ],
  },
  {
    name: "Bangladesh",
    count: 17,
    docCategories: [
      {
        name: "Application",
        count: 17,
        docs: [
          {
            title: " Funding Request Tuberculosis - 2020",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Funding Requests/BGD/2020/Tuberculosis/en/BGD-T_FundingRequest_1_en.zip",
          },
          {
            title: " Funding Request Malaria - 2020",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Funding Requests/BGD/2020/Malaria/en/BGD-M_FundingRequest_1_en.zip",
          },
          {
            title: " Funding Request Tuberculosis - 2017",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Funding Requests/BGD/2017/Tuberculosis/en/BGD-T_FundingRequest_0_en.zip",
          },
          {
            title: " Funding Request HIV - 2017",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Funding Requests/BGD/2017/HIV/en/BGD-H_FundingRequest_0_en.zip",
          },
          {
            title: " Funding Request Malaria - 2017",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Funding Requests/BGD/2017/Malaria/en/BGD-M_FundingRequest_0_en.zip",
          },
          {
            title: " Concept Note HIV - 2015",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Concept Notes/BGD/2015/HIV/en/BGD-H_ConceptNote_0_en.zip",
          },
          {
            title: " Concept Note Malaria - 2014",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Concept Notes/BGD/2014/Malaria/en/BGD-M_ConceptNote_0_en.zip",
          },
          {
            title: " Concept Note Tuberculosis - 2014",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Concept Notes/BGD/2014/Tuberculosis/en/BGD-T_ConceptNote_0_en.zip",
          },
          {
            title: " Proposal Tuberculosis - Round 10",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Proposals/BGD/Round 10/Tuberculosis/en/BAN-R10-TB_Proposal_0_en.pdf",
          },
          {
            title: " Proposal Malaria - Round 09",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Proposals/BGD/Round 09/Malaria/en/BAN-R09-ML_Proposal_0_en.pdf",
          },
          {
            title: " Proposal Tuberculosis - Round 08",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Proposals/BGD/Round 08/Tuberculosis/en/BAN-R08-TB_Proposal_0_en.pdf",
          },
          {
            title: " Proposal Malaria - Round 06",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Proposals/BGD/Round 06/Malaria/en/BAN-R06-ML_Proposal_0_en.pdf",
          },
          {
            title: " Proposal HIV - Round 06",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Proposals/BGD/Round 06/HIV/en/BAN-R06-HA_Proposal_0_en.pdf",
          },
          {
            title: " Proposal Tuberculosis - Round 05",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Proposals/BGD/Round 05/Tuberculosis/en/BAN-R05-TB_Proposal_0_en.pdf",
          },
          {
            title: " Proposal Tuberculosis - Round 03",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Proposals/BGD/Round 03/Tuberculosis/en/BAN-R03-TB_Proposal_0_en.pdf",
          },
          {
            title: " Proposal HIV - Round 02",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Proposals/BGD/Round 02/HIV/en/BAN-R02-HA_RCCProposal_0_en.pdf",
          },
          {
            title: " Proposal HIV - Round 02",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Proposals/BGD/Round 02/HIV/en/BAN-R02-HA_Proposal_0_en.pdf",
          },
        ],
      },
    ],
  },
  {
    name: "Belarus",
    count: 9,
    docCategories: [
      {
        name: "Application",
        count: 9,
        docs: [
          {
            title: " Funding Request Tuberculosis - 2018",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Funding Requests/BLR/2018/Tuberculosis/en/BLR-T_FundingRequest_0_en.zip",
          },
          {
            title: " Funding Request HIV - 2018",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Funding Requests/BLR/2018/HIV/en/BLR-H_FundingRequest_0_en.zip",
          },
          {
            title: " Concept Note Tuberculosis - 2015",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Concept Notes/BLR/2015/Tuberculosis/en/BLR-T_ConceptNote_0_en.zip",
          },
          {
            title: " Concept Note HIV - 2015",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Concept Notes/BLR/2015/HIV/en/BLR-H_ConceptNote_0_en.zip",
          },
          {
            title: " Proposal Tuberculosis - Round 09",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Proposals/BLR/Round 09/Tuberculosis/en/BLR-R09-TB_Proposal_0_en.pdf",
          },
          {
            title: " Proposal HIV - Round 08",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Proposals/BLR/Round 08/HIV/en/BLR-R08-HA_Proposal_0_en.pdf",
          },
          {
            title: " Proposal Tuberculosis - Round 06",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Proposals/BLR/Round 06/Tuberculosis/en/BLR-R06-TB_Proposal_0_en.pdf",
          },
          {
            title: " Proposal HIV - Round 03",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Proposals/BLR/Round 03/HIV/en/BLR-R03-HA_Proposal_0_en.pdf",
          },
          {
            title: " Proposal HIV - Round 03",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Proposals/BLR/Round 03/HIV/en/BLR-R03-HA_RCCProposal_0_en.pdf",
          },
        ],
      },
    ],
  },
  {
    name: "Belize",
    count: 4,
    docCategories: [
      {
        name: "Application",
        count: 4,
        docs: [
          {
            title: " Funding Request TB/HIV - 2018",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Funding Requests/BLZ/2018/TB_HIV/en/BLZ-C_FundingRequest_0_en.zip",
          },
          {
            title: " Concept Note TB/HIV - 2015",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Concept Notes/BLZ/2015/TB_HIV/en/BLZ-C_ConceptNote_0_en.zip",
          },
          {
            title: " Proposal HIV - Round 09",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Proposals/BLZ/Round 09/HIV/en/BEL-R09-HA_Proposal_0_en.pdf",
          },
          {
            title: " Proposal HIV - Round 03",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Proposals/BLZ/Round 03/HIV/en/BEL-R03-HA_Proposal_0_en.pdf",
          },
        ],
      },
    ],
  },
  {
    name: "Benin",
    count: 31,
    docCategories: [
      {
        name: "Application",
        count: 31,
        docs: [
          {
            title: " Funding Request Tuberculosis - 2020",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Funding Requests/BEN/2020/Tuberculosis/en/BEN-T_FundingRequest_2_en.zip",
          },
          {
            title: " Funding Request HIV - 2020",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Funding Requests/BEN/2020/HIV/en/BEN-H_FundingRequest_2_en.zip",
          },
          {
            title: " Funding Request HIV - 2017",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Funding Requests/BEN/2017/HIV/en/BEN-H_FundingRequest_0_en.zip",
          },
          {
            title: " Funding Request Malaria - 2017",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Funding Requests/BEN/2017/Malaria/en/BEN-M_FundingRequest_0_en.zip",
          },
          {
            title: " Funding Request Tuberculosis - 2017",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Funding Requests/BEN/2017/Tuberculosis/fr/BEN-T_FundingRequest_0_fr.zip",
          },
          {
            title: " Funding Request HIV - 2017",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Funding Requests/BEN/2017/HIV/fr/BEN-H_FundingRequest_0_fr.zip",
          },
          {
            title: " Funding Request RSSH - 2017",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Funding Requests/BEN/2017/RSSH/en/BEN-S_FundingRequest_0_en.zip",
          },
          {
            title: " Funding Request Malaria - 2017",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Funding Requests/BEN/2017/Malaria/fr/BEN-M_FundingRequest_0_fr.zip",
          },
          {
            title: " Funding Request Tuberculosis - 2017",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Funding Requests/BEN/2017/Tuberculosis/en/BEN-T_FundingRequest_0_en.zip",
          },
          {
            title: " Concept Note Malaria - 2015",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Concept Notes/BEN/2015/Malaria/en/BEN-M_ConceptNote_0_en.zip",
          },
          {
            title: " Concept Note Tuberculosis - 2015",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Concept Notes/BEN/2015/Tuberculosis/en/BEN-T_ConceptNote_0_en.zip",
          },
          {
            title: " Concept Note HIV - 2015",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Concept Notes/BEN/2015/HIV/en/BEN-H_ConceptNote_0_en.zip",
          },
          {
            title: " Proposal Malaria - Transitional Funding Mechanism",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Proposals/BEN/Transitional Funding Mechanism/Malaria/en/BEN-TFM-ML_Proposal_0_en.pdf",
          },
          {
            title: " Proposal Tuberculosis - Transitional Funding Mechanism",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Proposals/BEN/Transitional Funding Mechanism/Tuberculosis/en/BEN-TFM-TB_Proposal_0_en.pdf",
          },
          {
            title: " Proposal HIV - Round 09",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Proposals/BEN/Round 09/HIV/en/BEN-R09-HA_Proposal_0_en.pdf",
          },
          {
            title: " Proposal Tuberculosis - Round 09",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Proposals/BEN/Round 09/Tuberculosis/en/BEN-R09-TB_Proposal_0_en.pdf",
          },
          {
            title: " Proposal Malaria - Round 07",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Proposals/BEN/Round 07/Malaria/fr/BEN-R07-ML_Proposal_0_fr.pdf",
          },
          {
            title: " Proposal Malaria - Round 07",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Proposals/BEN/Round 07/Malaria/en/BEN-R07-ML_Proposal_0_en.pdf",
          },
          {
            title: " Proposal Tuberculosis - Round 06",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Proposals/BEN/Round 06/Tuberculosis/en/BEN-R06-TB_Proposal_0_en.pdf",
          },
          {
            title: " Proposal HIV - Round 05",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Proposals/BEN/Round 05/HIV/en/BEN-R05-HA_Proposal_0_en.pdf",
          },
          {
            title: " Proposal Malaria - Round 03",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Proposals/BEN/Round 03/Malaria/en/BEN-R03-ML_RCCProposal_0_en.pdf",
          },
          {
            title: " Proposal Malaria - Round 03",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Proposals/BEN/Round 03/Malaria/fr/BEN-R03-ML_Proposal_0_fr.pdf",
          },
          {
            title: " Proposal Malaria - Round 03",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Proposals/BEN/Round 03/Malaria/en/BEN-R03-ML_Proposal_0_en.pdf",
          },
          {
            title: " Proposal Malaria - Round 02",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Proposals/BEN/Round 02/Malaria/en/BEN-R02-ML_Proposal_0_en.pdf",
          },
          {
            title: " Proposal Tuberculosis - Round 02",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Proposals/BEN/Round 02/Tuberculosis/fr/BEN-R02-TB_Proposal_0_fr.pdf",
          },
          {
            title: " Proposal Malaria - Round 02",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Proposals/BEN/Round 02/Malaria/fr/BEN-R02-ML_Proposal_0_fr.pdf",
          },
          {
            title: " Proposal Tuberculosis - Round 02",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Proposals/BEN/Round 02/Tuberculosis/en/BEN-R02-TB_Proposal_0_en.pdf",
          },
          {
            title: " Proposal HIV - Round 02",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Proposals/BEN/Round 02/HIV/fr/BEN-R02-HA_Proposal_0_fr.pdf",
          },
          {
            title: " Proposal Malaria - Round 01",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Proposals/BEN/Round 01/Malaria/fr/BEN-R01-ML_Proposal_0_fr.pdf",
          },
          {
            title: " Proposal HIV - Round 01",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Proposals/BEN/Round 01/HIV/en/BEN-R01-HA_Proposal_0_en.pdf",
          },
          {
            title: " Proposal Malaria - Round 01",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Proposals/BEN/Round 01/Malaria/en/BEN-R01-ML_Proposal_0_en.pdf",
          },
        ],
      },
    ],
  },
  {
    name: "Bhutan",
    count: 15,
    docCategories: [
      {
        name: "Application",
        count: 15,
        docs: [
          {
            title: " Funding Request Malaria - 2020",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Funding Requests/BTN/2020/Malaria/en/BTN-M_FundingRequest_4_en.zip",
          },
          {
            title: " Funding Request Malaria - 2017",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Funding Requests/BTN/2017/Malaria/en/BTN-M_FundingRequest_0_en.zip",
          },
          {
            title: " Funding Request Tuberculosis - 2017",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Funding Requests/BTN/2017/Tuberculosis/en/BTN-T_FundingRequest_0_en.zip",
          },
          {
            title: " Funding Request HIV - 2017",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Funding Requests/BTN/2017/HIV/en/BTN-H_FundingRequest_0_en.zip",
          },
          {
            title: " Concept Note HIV - 2014",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Concept Notes/BTN/2014/HIV/en/BTN-H_ConceptNote_0_en.zip",
          },
          {
            title: " Concept Note Tuberculosis - 2014",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Concept Notes/BTN/2014/Tuberculosis/en/BTN-T_ConceptNote_0_en.zip",
          },
          {
            title: " Concept Note Malaria - 2014",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Concept Notes/BTN/2014/Malaria/en/BTN-M_ConceptNote_0_en.zip",
          },
          {
            title: " Proposal Malaria - Transitional Funding Mechanism",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Proposals/BTN/Transitional Funding Mechanism/Malaria/en/BTN-TFM-ML_Proposal_0_en.pdf",
          },
          {
            title: " Proposal HIV - Transitional Funding Mechanism",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Proposals/BTN/Transitional Funding Mechanism/HIV/en/BTN-TFM-HA_Proposal_0_en.pdf",
          },
          {
            title: " Proposal Tuberculosis - Transitional Funding Mechanism",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Proposals/BTN/Transitional Funding Mechanism/Tuberculosis/en/BTN-TFM-TB_Proposal_0_en.pdf",
          },
          {
            title: " Proposal Malaria - Round 07",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Proposals/BTN/Round 07/Malaria/en/BTN-R07-ML_Proposal_0_en.pdf",
          },
          {
            title: " Proposal Tuberculosis - Round 06",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Proposals/BTN/Round 06/Tuberculosis/en/BTN-R06-TB_Proposal_0_en.pdf",
          },
          {
            title: " Proposal HIV - Round 06",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Proposals/BTN/Round 06/HIV/en/BTN-R06-HA_Proposal_0_en.pdf",
          },
          {
            title: " Proposal Malaria - Round 04",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Proposals/BTN/Round 04/Malaria/en/BTN-R04-ML_Proposal_0_en.pdf",
          },
          {
            title: " Proposal Tuberculosis - Round 04",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Proposals/BTN/Round 04/Tuberculosis/en/BTN-R04-TB_Proposal_0_en.pdf",
          },
        ],
      },
    ],
  },
  {
    name: "Bolivia (Plurinational State)",
    count: 15,
    docCategories: [
      {
        name: "Application",
        count: 15,
        docs: [
          {
            title: " Funding Request Tuberculosis - 2019",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Funding Requests/BOL/2019/Tuberculosis/en/BOL-T_FundingRequest_0_en.zip",
          },
          {
            title: " Funding Request Malaria - 2018",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Funding Requests/BOL/2018/Malaria/en/BOL-M_FundingRequest_0_en.zip",
          },
          {
            title: " Funding Request HIV - 2018",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Funding Requests/BOL/2018/HIV/en/BOL-H_FundingRequest_0_en.zip",
          },
          {
            title: " Concept Note HIV - 2016",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Concept Notes/BOL/2016/HIV/en/BOL-H_ConceptNote_0_en.zip",
          },
          {
            title: " Concept Note Tuberculosis - 2015",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Concept Notes/BOL/2015/Tuberculosis/en/BOL-T_ConceptNote_0_en.zip",
          },
          {
            title: " Concept Note Malaria - 2015",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Concept Notes/BOL/2015/Malaria/en/BOL-M_ConceptNote_0_en.zip",
          },
          {
            title: " Proposal Tuberculosis - Round 09",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Proposals/BOL/Round 09/Tuberculosis/en/BOL-R09-TB_Proposal_0_en.pdf",
          },
          {
            title: " Proposal HIV - Round 09",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Proposals/BOL/Round 09/HIV/en/BOL-R09-HA_Proposal_0_en.pdf",
          },
          {
            title: " Proposal Malaria - Round 08",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Proposals/BOL/Round 08/Malaria/en/BOL-R08-ML_Proposal_0_en.pdf",
          },
          {
            title: " Proposal HIV - Round 03",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Proposals/BOL/Round 03/HIV/en/BOL-R03-HA_Proposal_0_en.pdf",
          },
          {
            title: " Proposal Tuberculosis - Round 03",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Proposals/BOL/Round 03/Tuberculosis/en/BOL-R03-TB_Proposal_0_en.pdf",
          },
          {
            title: " Proposal Malaria - Round 03",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Proposals/BOL/Round 03/Malaria/es/BOL-R03-ML_Proposal_0_es.pdf",
          },
          {
            title: " Proposal Tuberculosis - Round 03",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Proposals/BOL/Round 03/Tuberculosis/es/BOL-R03-TB_Proposal_0_es.pdf",
          },
          {
            title: " Proposal Malaria - Round 03",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Proposals/BOL/Round 03/Malaria/en/BOL-R03-ML_Proposal_0_en.pdf",
          },
          {
            title: " Proposal HIV - Round 03",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Proposals/BOL/Round 03/HIV/es/BOL-R03-HA_Proposal_0_es.pdf",
          },
        ],
      },
    ],
  },
  {
    name: "Bosnia and Herzegovina",
    count: 4,
    docCategories: [
      {
        name: "Application",
        count: 4,
        docs: [
          {
            title: " Proposal Tuberculosis - Round 09",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Proposals/BIH/Round 09/Tuberculosis/en/BIH-R09-TB_Proposal_0_en.pdf",
          },
          {
            title: " Proposal HIV - Round 09",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Proposals/BIH/Round 09/HIV/en/BIH-R09-HA_Proposal_0_en.pdf",
          },
          {
            title: " Proposal Tuberculosis - Round 06",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Proposals/BIH/Round 06/Tuberculosis/en/BIH-R06-TB_Proposal_0_en.pdf",
          },
          {
            title: " Proposal HIV - Round 05",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Proposals/BIH/Round 05/HIV/en/BIH-R05-HA_Proposal_0_en.pdf",
          },
        ],
      },
    ],
  },
  {
    name: "Botswana",
    count: 7,
    docCategories: [
      {
        name: "Application",
        count: 7,
        docs: [
          {
            title: " Funding Request Malaria - 2018",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Funding Requests/BWA/2018/Malaria/en/BWA-M_FundingRequest_0_en.zip",
          },
          {
            title: " Funding Request TB/HIV - 2018",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Funding Requests/BWA/2018/TB_HIV/en/BWA-C_FundingRequest_0_en.zip",
          },
          {
            title: " Concept Note TB/HIV - 2015",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Concept Notes/BWA/2015/TB_HIV/en/BWA-C_ConceptNote_0_en.zip",
          },
          {
            title: " Concept Note Malaria - 2015",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Concept Notes/BWA/2015/Malaria/en/BWA-M_ConceptNote_0_en.zip",
          },
          {
            title: " Proposal Tuberculosis - Transitional Funding Mechanism",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Proposals/BWA/Transitional Funding Mechanism/Tuberculosis/en/BOT-TFM-TB_Proposal_0_en.pdf",
          },
          {
            title: " Proposal Tuberculosis - Round 05",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Proposals/BWA/Round 05/Tuberculosis/en/BOT-R05-TB_Proposal_0_en.pdf",
          },
          {
            title: " Proposal HIV - Round 02",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Proposals/BWA/Round 02/HIV/en/BOT-R02-HA_Proposal_0_en.pdf",
          },
        ],
      },
    ],
  },
  {
    name: "Brazil",
    count: 2,
    docCategories: [
      {
        name: "Application",
        count: 2,
        docs: [
          {
            title: " Proposal Malaria - Round 08",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Proposals/BRA/Round 08/Malaria/en/BRA-R08-ML_Proposal_0_en.pdf",
          },
          {
            title: " Proposal Tuberculosis - Round 05",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Proposals/BRA/Round 05/Tuberculosis/en/BRA-R05-TB_Proposal_0_en.pdf",
          },
        ],
      },
    ],
  },
  {
    name: "Bulgaria",
    count: 5,
    docCategories: [
      {
        name: "Application",
        count: 5,
        docs: [
          {
            title: " Concept Note Tuberculosis - 2014",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Concept Notes/BGR/2014/Tuberculosis/en/BGR-T_ConceptNote_0_en.zip",
          },
          {
            title: " Proposal Tuberculosis - Round 08",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Proposals/BGR/Round 08/Tuberculosis/en/BUL-R08-TB_Proposal_0_en.pdf",
          },
          {
            title: " Proposal Tuberculosis - Round 06",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Proposals/BGR/Round 06/Tuberculosis/en/BUL-R06-TB_Proposal_0_en.pdf",
          },
          {
            title: " Proposal HIV - Round 02",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Proposals/BGR/Round 02/HIV/en/BUL-R02-HA_RCCProposal_0_en.pdf",
          },
          {
            title: " Proposal HIV - Round 02",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Proposals/BGR/Round 02/HIV/en/BUL-R02-HA_Proposal_0_en.pdf",
          },
        ],
      },
    ],
  },
  {
    name: "Burkina Faso",
    count: 18,
    docCategories: [
      {
        name: "Application",
        count: 18,
        docs: [
          {
            title: " Funding Request TB/HIV - 2020",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Funding Requests/BFA/2020/TB_HIV/en/BFA-C_FundingRequest_2_en.zip",
          },
          {
            title: " Funding Request Malaria - 2020",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Funding Requests/BFA/2020/Malaria/en/BFA-M_FundingRequest_2_en.zip",
          },
          {
            title: " Funding Request HIV - 2017",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Funding Requests/BFA/2017/HIV/en/BFA-H_FundingRequest_0_en.zip",
          },
          {
            title: " Funding Request Malaria - 2017",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Funding Requests/BFA/2017/Malaria/en/BFA-M_FundingRequest_0_en.zip",
          },
          {
            title: " Funding Request Tuberculosis - 2017",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Funding Requests/BFA/2017/Tuberculosis/en/BFA-T_FundingRequest_0_en.zip",
          },
          {
            title: " Concept Note RSSH - 2015",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Concept Notes/BFA/2015/RSSH/en/BFA-S_ConceptNote_0_en.zip",
          },
          {
            title: " Concept Note Malaria - 2015",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Concept Notes/BFA/2015/Malaria/en/BFA-M_ConceptNote_0_en.zip",
          },
          {
            title: " Concept Note TB/HIV - 2014",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Concept Notes/BFA/2014/TB_HIV/en/BFA-TH_ConceptNote_0_en.zip",
          },
          {
            title: " Proposal Malaria - Transitional Funding Mechanism",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Proposals/BFA/Transitional Funding Mechanism/Malaria/en/BUR-TFM-ML_Proposal_0_en.pdf",
          },
          {
            title: " Proposal HIV - Round 10",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Proposals/BFA/Round 10/HIV/en/BUR-R10-HA_Proposal_0_en.pdf",
          },
          {
            title: " Proposal Tuberculosis - Round 08",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Proposals/BFA/Round 08/Tuberculosis/en/BUR-R08-TB_Proposal_0_en.pdf",
          },
          {
            title: " Proposal Malaria - Round 08",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Proposals/BFA/Round 08/Malaria/en/BUR-R08-ML_Proposal_0_en.pdf",
          },
          {
            title: " Proposal Malaria - Round 07",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Proposals/BFA/Round 07/Malaria/en/BUR-R07-ML_Proposal_0_en.pdf",
          },
          {
            title: " Proposal HIV - Round 06",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Proposals/BFA/Round 06/HIV/en/BUR-R06-HA_Proposal_0_en.pdf",
          },
          {
            title: " Proposal Tuberculosis - Round 04",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Proposals/BFA/Round 04/Tuberculosis/fr/BUR-R04-TB_Proposal_0_fr.pdf",
          },
          {
            title: " Proposal Tuberculosis - Round 04",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Proposals/BFA/Round 04/Tuberculosis/en/BUR-R04-TB_Proposal_0_en.pdf",
          },
          {
            title: " Proposal HIV - Round 02",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Proposals/BFA/Round 02/HIV/en/BUR-R02-HA_Proposal_0_en.pdf",
          },
          {
            title: " Proposal Malaria - Round 02",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Proposals/BFA/Round 02/Malaria/en/BUR-R02-ML_Proposal_0_en.pdf",
          },
        ],
      },
    ],
  },
  {
    name: "Burundi",
    count: 16,
    docCategories: [
      {
        name: "Application",
        count: 16,
        docs: [
          {
            title: " Funding Request TB/HIV - 2020",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Funding Requests/BDI/2020/TB_HIV/en/BDI-C_FundingRequest_0_en.zip",
          },
          {
            title: " Funding Request TB/HIV - 2017",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Funding Requests/BDI/2017/TB_HIV/en/BDI-C_FundingRequest_0_en.zip",
          },
          {
            title: " Funding Request Malaria - 2017",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Funding Requests/BDI/2017/Malaria/en/BDI-M_FundingRequest_0_en.zip",
          },
          {
            title: " Funding Request Tuberculosis - 2017",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Funding Requests/BDI/2017/Tuberculosis/en/BDI-T_FundingRequest_0_en.zip",
          },
          {
            title: " Concept Note Malaria - 2015",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Concept Notes/BDI/2015/Malaria/en/BDI-M_ConceptNote_0_en.zip",
          },
          {
            title: " Concept Note TB/HIV - 2015",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Concept Notes/BDI/2015/TB_HIV/en/BDI-C_ConceptNote_0_en.zip",
          },
          {
            title: " Proposal Tuberculosis - Transitional Funding Mechanism",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Proposals/BDI/Transitional Funding Mechanism/Tuberculosis/en/BRN-TFM-TB_Proposal_0_en.pdf",
          },
          {
            title: " Proposal Malaria - Round 09",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Proposals/BDI/Round 09/Malaria/en/BRN-R09-ML_Proposal_0_en.pdf",
          },
          {
            title: " Proposal HIV - Round 08",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Proposals/BDI/Round 08/HIV/en/BRN-R08-HA_Proposal_0_en.pdf",
          },
          {
            title: " Proposal Tuberculosis - Round 07",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Proposals/BDI/Round 07/Tuberculosis/en/BRN-R07-TB_Proposal_0_en.pdf",
          },
          {
            title: " Proposal Tuberculosis - Round 07",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Proposals/BDI/Round 07/Tuberculosis/fr/BRN-R07-TB_Proposal_0_fr.pdf",
          },
          {
            title: " Proposal HIV - Round 05",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Proposals/BDI/Round 05/HIV/en/BRN-R05-HA_Proposal_0_en.pdf",
          },
          {
            title: " Proposal Malaria - Round 02",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Proposals/BDI/Round 02/Malaria/en/BRN-R02-ML_Proposal_0_en.pdf",
          },
          {
            title: " Proposal Malaria - Round 02",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Proposals/BDI/Round 02/Malaria/en/BRN-R02-ML_RCCProposal_0_en.pdf",
          },
          {
            title: " Proposal Malaria - Round 02",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Proposals/BDI/Round 02/Malaria/fr/BRN-R02-ML_RCCProposal_0_fr.pdf",
          },
          {
            title: " Proposal HIV - Round 01",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Proposals/BDI/Round 01/HIV/en/BRN-R01-HA_Proposal_0_en.pdf",
          },
        ],
      },
    ],
  },
  {
    name: "Cabo Verde",
    count: 5,
    docCategories: [
      {
        name: "Application",
        count: 5,
        docs: [
          {
            title: " Funding Request Multicomponent - 2017",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Funding Requests/CPV/2017/Multicomponent/en/CPV-Z_FundingRequest_0_en.zip",
          },
          {
            title: " Concept Note TB/HIV - 2015",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Concept Notes/CPV/2015/TB_HIV/en/CPV-TH_ConceptNote_0_en.zip",
          },
          {
            title: " Concept Note Malaria - 2014",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Concept Notes/CPV/2014/Malaria/en/CPV-M_ConceptNote_0_en.zip",
          },
          {
            title: " Proposal Malaria - Round 10",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Proposals/CPV/Round 10/Malaria/en/CAP-R10-ML_Proposal_0_en.pdf",
          },
          {
            title: " Proposal HIV - Round 08",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Proposals/CPV/Round 08/HIV/en/CAP-R08-HA_Proposal_0_en.pdf",
          },
        ],
      },
    ],
  },
  {
    name: "Cambodia",
    count: 22,
    docCategories: [
      {
        name: "Application",
        count: 22,
        docs: [
          {
            title: " Funding Request HIV - 2020",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Funding Requests/KHM/2020/HIV/en/KHM-H_FundingRequest_2_en.zip",
          },
          {
            title: " Funding Request RSSH - 2020",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Funding Requests/KHM/2020/RSSH/en/KHM-S_FundingRequest_2_en.zip",
          },
          {
            title: " Funding Request Tuberculosis - 2020",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Funding Requests/KHM/2020/Tuberculosis/en/KHM-T_FundingRequest_3_en.zip",
          },
          {
            title: " Funding Request TB/HIV - 2017",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Funding Requests/KHM/2017/TB_HIV/en/KHM-C_FundingRequest_0_en.zip",
          },
          {
            title: " Concept Note HIV - 2015",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Concept Notes/KHM/2015/HIV/en/KHM-H_ConceptNote_0_en.zip",
          },
          {
            title: " Concept Note RSSH - 2015",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Concept Notes/KHM/2015/RSSH/en/KHM-S_ConceptNote_0_en.zip",
          },
          {
            title: " Concept Note Malaria - 2014",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Concept Notes/KHM/2014/Malaria/en/KHM-M_ConceptNote_0_en.zip",
          },
          {
            title: " Concept Note Tuberculosis - 2014",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Concept Notes/KHM/2014/Tuberculosis/en/KHM-T_ConceptNote_0_en.zip",
          },
          {
            title: " Proposal Malaria - Round 09",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Proposals/KHM/Round 09/Malaria/en/CAM-R09-ML_Proposal_0_en.pdf",
          },
          {
            title: " Proposal HIV - Round 09",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Proposals/KHM/Round 09/HIV/en/CAM-R09-HA_Proposal_0_en.pdf",
          },
          {
            title: " Proposal HIV - Round 07",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Proposals/KHM/Round 07/HIV/en/CAM-R07-HA_Proposal_0_en.pdf",
          },
          {
            title: " Proposal Malaria - Round 06",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Proposals/KHM/Round 06/Malaria/en/CAM-R06-ML_Proposal_0_en.pdf",
          },
          {
            title: " Proposal Tuberculosis - Round 05",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Proposals/KHM/Round 05/Tuberculosis/en/CAM-R05-TB_Proposal_0_en.pdf",
          },
          {
            title: " Proposal HIV - Round 05",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Proposals/KHM/Round 05/HIV/en/CAM-R05-HA_Proposal_0_en.pdf",
          },
          {
            title: " Proposal Malaria - Round 04",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Proposals/KHM/Round 04/Malaria/en/CAM-R04-ML_Proposal_0_en.pdf",
          },
          {
            title: " Proposal HIV - Round 04",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Proposals/KHM/Round 04/HIV/en/CAM-R04-HA_Proposal_0_en.pdf",
          },
          {
            title: " Proposal Tuberculosis - Round 02",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Proposals/KHM/Round 02/Tuberculosis/en/CAM-R02-TB_Proposal_0_en.pdf",
          },
          {
            title: " Proposal HIV - Round 02",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Proposals/KHM/Round 02/HIV/en/CAM-R02-HA_Proposal_0_en.pdf",
          },
          {
            title: " Proposal Malaria - Round 02",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Proposals/KHM/Round 02/Malaria/en/CAM-R02-ML_AMFmApplication_0_en.pdf",
          },
          {
            title: " Proposal Malaria - Round 02",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Proposals/KHM/Round 02/Malaria/en/CAM-R02-ML_RCCProposal_0_en.pdf",
          },
          {
            title: " Proposal Malaria - Round 02",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Proposals/KHM/Round 02/Malaria/en/CAM-R02-ML_Proposal_0_en.pdf",
          },
          {
            title: " Proposal HIV - Round 01",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Proposals/KHM/Round 01/HIV/en/CAM-R01-HA_Proposal_0_en.pdf",
          },
        ],
      },
    ],
  },
  {
    name: "Cameroon",
    count: 14,
    docCategories: [
      {
        name: "Application",
        count: 14,
        docs: [
          {
            title: " Funding Request TB/HIV - 2020",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Funding Requests/CMR/2020/TB_HIV/en/CMR-C_FundingRequest_2_en.zip",
          },
          {
            title: " Funding Request TB/HIV - 2017",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Funding Requests/CMR/2017/TB_HIV/en/CMR-C_FundingRequest_0_en.zip",
          },
          {
            title: " Funding Request Malaria - 2017",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Funding Requests/CMR/2017/Malaria/en/CMR-M_FundingRequest_0_en.zip",
          },
          {
            title: " Concept Note TB/HIV - 2014",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Concept Notes/CMR/2014/TB_HIV/en/CMR-C_ConceptNote_0_en.zip",
          },
          {
            title: " Concept Note Malaria - 2014",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Concept Notes/CMR/2014/Malaria/en/CMR-M_ConceptNote_0_en.zip",
          },
          {
            title: " Proposal HIV - Round 10",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Proposals/CMR/Round 10/HIV/en/CMR-R10-HA_Proposal_0_en.pdf",
          },
          {
            title: " Proposal Tuberculosis - Round 09",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Proposals/CMR/Round 09/Tuberculosis/en/CMR-R09-TB_Proposal_0_en.pdf",
          },
          {
            title: " Proposal Malaria - Round 09",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Proposals/CMR/Round 09/Malaria/en/CMR-R09-ML_Proposal_0_en.pdf",
          },
          {
            title: " Proposal Malaria - Round 05",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Proposals/CMR/Round 05/Malaria/en/CMR-R05-ML_Proposal_0_en.pdf",
          },
          {
            title: " Proposal HIV - Round 05",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Proposals/CMR/Round 05/HIV/en/CMR-R05-HA_Proposal_0_en.pdf",
          },
          {
            title: " Proposal HIV - Round 04",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Proposals/CMR/Round 04/HIV/en/CMR-R04-HA_Proposal_0_en.pdf",
          },
          {
            title: " Proposal HIV - Round 03",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Proposals/CMR/Round 03/HIV/en/CMR-R03-HA_Proposal_0_en.pdf",
          },
          {
            title: " Proposal Tuberculosis - Round 03",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Proposals/CMR/Round 03/Tuberculosis/en/CMR-R03-TB_Proposal_0_en.pdf",
          },
          {
            title: " Proposal Malaria - Round 03",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Proposals/CMR/Round 03/Malaria/en/CMR-R03-ML_Proposal_0_en.pdf",
          },
        ],
      },
    ],
  },
  {
    name: "Caribbean",
    count: 3,
    docCategories: [
      {
        name: "Application",
        count: 3,
        docs: [
          {
            title: " Funding Request TB/HIV - 2018 null",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Funding Requests/QRB/2018/TB_HIV/en/QRB-C_FundingRequest_0_en.zip",
          },
          {
            title: " Concept Note TB/HIV - 2015",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Concept Notes/QRB/2015/TB_HIV/en/QRB-C_ConceptNote_0_en.zip",
          },
          {
            title: " Proposal HIV - Round 03",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Proposals/QRB/Multicountry Americas (OECS)/Round 03/HIV/en/MAE-R03-HA_Proposal_0_en.pdf",
          },
        ],
      },
    ],
  },
  {
    name: "Central African Republic",
    count: 16,
    docCategories: [
      {
        name: "Application",
        count: 16,
        docs: [
          {
            title: " Funding Request TB/HIV - 2020",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Funding Requests/CAF/2020/TB_HIV/en/CAF-C_FundingRequest_2_en.zip",
          },
          {
            title: " Funding Request Malaria - 2017",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Funding Requests/CAF/2017/Malaria/en/CAF-M_FundingRequest_0_en.zip",
          },
          {
            title: " Funding Request TB/HIV - 2017",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Funding Requests/CAF/2017/TB_HIV/en/CAF-C_FundingRequest_0_en.zip",
          },
          {
            title: " Concept Note Malaria - 2016",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Concept Notes/CAF/2016/Malaria/en/CAF-M_ConceptNote_0_en.zip",
          },
          {
            title: " Proposal HIV - Transitional Funding Mechanism",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Proposals/CAF/Transitional Funding Mechanism/HIV/en/CAF-TFM-HA_Proposal_0_en.pdf",
          },
          {
            title: " Proposal Tuberculosis - Round 09",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Proposals/CAF/Round 09/Tuberculosis/en/CAF-R09-TB_Proposal_0_en.pdf",
          },
          {
            title: " Proposal Malaria - Round 08",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Proposals/CAF/Round 08/Malaria/en/CAF-R08-ML_Proposal_0_en.pdf",
          },
          {
            title: " Proposal HIV - Round 07",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Proposals/CAF/Round 07/HIV/en/CAF-R07-HA_Proposal_0_en.pdf",
          },
          {
            title: " Proposal HIV - Round 07",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Proposals/CAF/Round 07/HIV/fr/CAF-R07-HA_Proposal_0_fr.pdf",
          },
          {
            title: " Proposal Tuberculosis - Round 04",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Proposals/CAF/Round 04/Tuberculosis/fr/CAF-R04-TB_Proposal_0_fr.pdf",
          },
          {
            title: " Proposal Tuberculosis - Round 04",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Proposals/CAF/Round 04/Tuberculosis/en/CAF-R04-TB_Proposal_0_en.pdf",
          },
          {
            title: " Proposal HIV - Round 04",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Proposals/CAF/Round 04/HIV/en/CAF-R04-HA_Proposal_0_en.pdf",
          },
          {
            title: " Proposal Malaria - Round 04",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Proposals/CAF/Round 04/Malaria/en/CAF-R04-ML_Proposal_0_en.pdf",
          },
          {
            title: " Proposal HIV - Round 04",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Proposals/CAF/Round 04/HIV/fr/CAF-R04-HA_Proposal_0_fr.pdf",
          },
          {
            title: " Proposal Malaria - Round 04",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Proposals/CAF/Round 04/Malaria/fr/CAF-R04-ML_Proposal_0_fr.pdf",
          },
          {
            title: " Proposal HIV - Round 02",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Proposals/CAF/Round 02/HIV/en/CAF-R02-HA_Proposal_0_en.pdf",
          },
        ],
      },
    ],
  },
  {
    name: "Central America",
    count: 13,
    docCategories: [
      {
        name: "Application",
        count: 13,
        docs: [
          {
            title: " Funding Request HIV - 2017",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Funding Requests/QRC/Multicountry Central Americas REDCA/2017/HIV/en/MAR-H_FundingRequest_0_en.zip",
          },
          {
            title: " Funding Request Tuberculosis - 2017",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Funding Requests/QRC/Multicountry Central Americas REDCA/2017/Tuberculosis/en/MAR-T_FundingRequest_0_en.zip",
          },
          {
            title: " Concept Note RSSH - 2015",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Concept Notes/QRC/Multicountry Central Americas REDCA/2015/RSSH/en/MAR-S_ConceptNote_0_en.zip",
          },
          {
            title: " Concept Note HIV - 2015",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Concept Notes/QRC/Multicountry Central Americas REDCA/2015/HIV/en/QRC-H_ConceptNote_1_en.zip",
          },
          {
            title: " Concept Note HIV - 2014",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Concept Notes/QRC/Multicountry Central Americas REDCA/2014/HIV/en/QRC-H_ConceptNote_0_en.zip",
          },
          {
            title: " Proposal HIV - Round 10",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Proposals/QRC/Multicountry Central Americas REDCA/Round 10/HIV/en/MAR-R10-HA_Proposal_0_en.pdf",
          },
          {
            title: " Proposal Tuberculosis - Round 10",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Proposals/QRC/Round 10/Tuberculosis/en/MOR-R10-TB_Proposal_0_en.pdf",
          },
          {
            title: " Proposal HIV - Round 10",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Proposals/QRC/Round 10/HIV/en/MOR-R10-HA_Proposal_0_en.pdf",
          },
          {
            title: " Proposal HIV - Round 07",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Proposals/QRC/Multicountry Central Americas REDCA/Round 07/HIV/en/MAR-R07-HA_Proposal_0_en.pdf",
          },
          {
            title: " Proposal HIV - Round 07",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Proposals/QRC/Multicountry Central Americas REDCA/Round 07/HIV/es/MAR-R07-HA_Proposal_0_es.pdf",
          },
          {
            title: " Proposal Tuberculosis - Round 06",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Proposals/QRC/Round 06/Tuberculosis/en/MOR-R06-TB_Proposal_0_en.pdf",
          },
          {
            title: " Proposal HIV - Round 06",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Proposals/QRC/Round 06/HIV/en/MOR-R06-HA_Proposal_0_en.pdf",
          },
          {
            title: " Proposal HIV - Round 01",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Proposals/QRC/Round 01/HIV/en/MOR-R01-HA_Proposal_0_en.pdf",
          },
        ],
      },
    ],
  },
  {
    name: "Chad",
    count: 15,
    docCategories: [
      {
        name: "Application",
        count: 15,
        docs: [
          {
            title: " Funding Request Multicomponent - 2018",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Funding Requests/TCD/2018/Multicomponent/en/TCD-Z_FundingRequest_0_en.zip",
          },
          {
            title: " Funding Request Malaria - 2017",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Funding Requests/TCD/2017/Malaria/en/TCD-M_FundingRequest_0_en.zip",
          },
          {
            title: " Concept Note Malaria - 2014",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Concept Notes/TCD/2014/Malaria/en/TCD-M_ConceptNote_0_en.zip",
          },
          {
            title: " Proposal Malaria - Transitional Funding Mechanism",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Proposals/TCD/Transitional Funding Mechanism/Malaria/en/TCD-TFM-ML_Proposal_0_en.pdf",
          },
          {
            title: " Proposal Malaria - Round 09",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Proposals/TCD/Round 09/Malaria/en/TCD-R09-ML_Proposal_0_en.pdf",
          },
          {
            title: " Proposal HIV - Round 08",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Proposals/TCD/Round 08/HIV/en/TCD-R08-HA_Proposal_0_en.pdf",
          },
          {
            title: " Proposal Tuberculosis - Round 08",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Proposals/TCD/Round 08/Tuberculosis/en/TCD-R08-TB_Proposal_0_en.pdf",
          },
          {
            title: " Proposal Malaria - Round 07",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Proposals/TCD/Round 07/Malaria/fr/TCD-R07-ML_Proposal_0_fr.pdf",
          },
          {
            title: " Proposal Malaria - Round 07",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Proposals/TCD/Round 07/Malaria/en/TCD-R07-ML_Proposal_0_en.pdf",
          },
          {
            title: " Proposal Malaria - Round 03",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Proposals/TCD/Round 03/Malaria/en/TCD-R03-ML_Proposal_0_en.pdf",
          },
          {
            title: " Proposal HIV - Round 03",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Proposals/TCD/Round 03/HIV/en/TCD-R03-HA_Proposal_0_en.pdf",
          },
          {
            title: " Proposal HIV - Round 03",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Proposals/TCD/Round 03/HIV/fr/TCD-R03-HA_Proposal_0_fr.pdf",
          },
          {
            title: " Proposal Malaria - Round 03",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Proposals/TCD/Round 03/Malaria/fr/TCD-R03-ML_Proposal_0_fr.pdf",
          },
          {
            title: " Proposal Tuberculosis - Round 02",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Proposals/TCD/Round 02/Tuberculosis/en/TCD-R02-TB_Proposal_0_en.pdf",
          },
          {
            title: " Proposal Tuberculosis - Round 02",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Proposals/TCD/Round 02/Tuberculosis/fr/TCD-R02-TB_Proposal_0_fr.pdf",
          },
        ],
      },
    ],
  },
  {
    name: "Chile",
    count: 1,
    docCategories: [
      {
        name: "Application",
        count: 1,
        docs: [
          {
            title: " Proposal HIV - Round 01",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Proposals/CHL/Round 01/HIV/en/CHL-R01-HA_Proposal_0_en.pdf",
          },
        ],
      },
    ],
  },
  {
    name: "China",
    count: 19,
    docCategories: [
      {
        name: "Application",
        count: 19,
        docs: [
          {
            title: " Proposal Malaria - Round 10",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Proposals/CHN/Round 10/Malaria/en/CHN-R10-ML_Proposal_0_en.pdf",
          },
          {
            title: " Proposal Tuberculosis - Round 09",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Proposals/CHN/Round 09/Tuberculosis/en/CHN-R09-TB_Proposal_0_en.pdf",
          },
          {
            title: " Proposal Malaria - Round 09",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Proposals/CHN/Round 09/Malaria/en/CHN-R09-ML_Proposal_0_en.pdf",
          },
          {
            title: " Proposal HIV - Round 08",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Proposals/CHN/Round 08/HIV/en/CHN-R08-HA_Proposal_0_en.pdf",
          },
          {
            title: " Proposal Tuberculosis - Round 08",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Proposals/CHN/Round 08/Tuberculosis/en/CHN-R08-TB_Proposal_0_en.pdf",
          },
          {
            title: " Proposal Tuberculosis - Round 07",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Proposals/CHN/Round 07/Tuberculosis/en/CHN-R07-TB_Proposal_0_en.pdf",
          },
          {
            title: " Proposal Malaria - Round 06",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Proposals/CHN/Round 06/Malaria/en/CHN-R06-ML_Proposal_0_en.pdf",
          },
          {
            title: " Proposal HIV - Round 06",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Proposals/CHN/Round 06/HIV/en/CHN-R06-HA_Proposal_0_en.pdf",
          },
          {
            title: " Proposal Tuberculosis - Round 05",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Proposals/CHN/Round 05/Tuberculosis/en/CHN-R05-TB_Proposal_0_en.pdf",
          },
          {
            title: " Proposal Malaria - Round 05",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Proposals/CHN/Round 05/Malaria/en/CHN-R05-ML_Proposal_0_en.pdf",
          },
          {
            title: " Proposal HIV - Round 05",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Proposals/CHN/Round 05/HIV/en/CHN-R05-HA_Proposal_0_en.pdf",
          },
          {
            title: " Proposal Tuberculosis - Round 04",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Proposals/CHN/Round 04/Tuberculosis/en/CHN-R04-TB_Proposal_0_en.pdf",
          },
          {
            title: " Proposal Tuberculosis - Round 04",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Proposals/CHN/Round 04/Tuberculosis/en/CHN-R04-TB_RCCProposal_0_en.pdf",
          },
          {
            title: " Proposal HIV - Round 04",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Proposals/CHN/Round 04/HIV/en/CHN-R04-HA_Proposal_0_en.pdf",
          },
          {
            title: " Proposal HIV - Round 03",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Proposals/CHN/Round 03/HIV/en/CHN-R03-HA_Proposal_0_en.pdf",
          },
          {
            title: " Proposal HIV - Round 03",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Proposals/CHN/Round 03/HIV/en/CHN-R03-HA_RCCProposal_0_en.pdf",
          },
          {
            title: " Proposal Tuberculosis - Round 01",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Proposals/CHN/Round 01/Tuberculosis/en/CHN-R01-TB_RCCProposal_0_en.pdf",
          },
          {
            title: " Proposal Tuberculosis - Round 01",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Proposals/CHN/Round 01/Tuberculosis/en/CHN-R01-TB_Proposal_0_en.pdf",
          },
          {
            title: " Proposal Malaria - Round 01",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Proposals/CHN/Round 01/Malaria/en/CHN-R01-ML_Proposal_0_en.pdf",
          },
        ],
      },
    ],
  },
  {
    name: "Colombia",
    count: 7,
    docCategories: [
      {
        name: "Application",
        count: 7,
        docs: [
          {
            title: " Funding Request HIV - 2018",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Funding Requests/COL/2018/HIV/en/COL-H_FundingRequest_0_en.zip",
          },
          {
            title: " Concept Note HIV - 2015",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Concept Notes/COL/2015/HIV/en/COL-H_ConceptNote_0_en.zip",
          },
          {
            title: " Proposal Tuberculosis - Round 10",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Proposals/COL/Round 10/Tuberculosis/en/COL-R10-TB_Proposal_0_en.pdf",
          },
          {
            title: " Proposal HIV - Round 09",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Proposals/COL/Round 09/HIV/en/COL-R09-HA_Proposal_0_en.pdf",
          },
          {
            title: " Proposal Malaria - Round 08",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Proposals/COL/Round 08/Malaria/en/COL-R08-ML_Proposal_0_en.pdf",
          },
          {
            title: " Proposal HIV - Round 02",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Proposals/COL/Round 02/HIV/en/COL-R02-HA_Proposal_0_en.pdf",
          },
          {
            title: " Proposal HIV - Round 02",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Proposals/COL/Round 02/HIV/es/COL-R02-HA_Proposal_0_es.pdf",
          },
        ],
      },
    ],
  },
  {
    name: "Comoros",
    count: 12,
    docCategories: [
      {
        name: "Application",
        count: 12,
        docs: [
          {
            title: " Funding Request HIV - 2018",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Funding Requests/COM/2018/HIV/fr/COM-H_FundingRequest_0_fr.zip",
          },
          {
            title: " Funding Request Tuberculosis - 2018",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Funding Requests/COM/2018/Tuberculosis/fr/COM-T_FundingRequest_0_fr.zip",
          },
          {
            title: " Funding Request HIV - 2018",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Funding Requests/COM/2018/HIV/en/COM-H_FundingRequest_0_en.zip",
          },
          {
            title: " Funding Request Malaria - 2018",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Funding Requests/COM/2018/Malaria/en/COM-M_FundingRequest_0_en.zip",
          },
          {
            title: " Concept Note HIV - 2015",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Concept Notes/COM/2015/HIV/en/COM-H_ConceptNote_0_en.zip",
          },
          {
            title: " Concept Note Malaria - 2015",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Concept Notes/COM/2015/Malaria/en/COM-M_ConceptNote_0_en.zip",
          },
          {
            title: " Concept Note Tuberculosis - 2014",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Concept Notes/COM/2014/Tuberculosis/en/COM-T_ConceptNote_0_en.zip",
          },
          {
            title: " Proposal HIV - Round 09",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Proposals/COM/Round 09/HIV/en/COM-R09-HA_Proposal_0_en.pdf",
          },
          {
            title: " Proposal Malaria - Round 08",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Proposals/COM/Round 08/Malaria/en/COM-R08-ML_Proposal_0_en.pdf",
          },
          {
            title: " Proposal HIV - Round 03",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Proposals/COM/Round 03/HIV/en/COM-R03-HA_Proposal_0_en.pdf",
          },
          {
            title: " Proposal HIV - Round 03",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Proposals/COM/Round 03/HIV/fr/COM-R03-HA_Proposal_0_fr.pdf",
          },
          {
            title: " Proposal Malaria - Round 02",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Proposals/COM/Round 02/Malaria/fr/COM-R02-ML_Proposal_0_fr.pdf",
          },
        ],
      },
    ],
  },
  {
    name: "Congo",
    count: 9,
    docCategories: [
      {
        name: "Application",
        count: 9,
        docs: [
          {
            title: " Funding Request Malaria - 2020",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Funding Requests/COG/2020/Malaria/en/COG-M_FundingRequest_0_en.zip",
          },
          {
            title: " Funding Request TB/HIV - 2020",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Funding Requests/COG/2020/TB_HIV/en/COG-C_FundingRequest_3_en.zip",
          },
          {
            title: " Funding Request TB/HIV - 2017",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Funding Requests/COG/2017/TB_HIV/en/COG-C_FundingRequest_0_en.zip",
          },
          {
            title: " Funding Request Malaria - 2017",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Funding Requests/COG/2017/Malaria/en/COG-M_FundingRequest_0_en.zip",
          },
          {
            title: " Concept Note TB/HIV - 2015",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Concept Notes/COG/2015/TB_HIV/en/COG-C_ConceptNote_0_en.zip",
          },
          {
            title: " Proposal HIV - Round 09",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Proposals/COG/Round 09/HIV/en/COG-R09-HA_Proposal_0_en.pdf",
          },
          {
            title: " Proposal Malaria - Round 08",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Proposals/COG/Round 08/Malaria/en/COG-R08-ML_Proposal_0_en.pdf",
          },
          {
            title: " Proposal Tuberculosis - Round 08",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Proposals/COG/Round 08/Tuberculosis/en/COG-R08-TB_Proposal_0_en.pdf",
          },
          {
            title: " Proposal HIV - Round 05",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Proposals/COG/Round 05/HIV/fr/COG-R05-HA_Proposal_0_fr.pdf",
          },
        ],
      },
    ],
  },
  {
    name: "Congo (Democratic Republic)",
    count: 17,
    docCategories: [
      {
        name: "Application",
        count: 17,
        docs: [
          {
            title: " Funding Request Malaria - 2020",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Funding Requests/COD/2020/Malaria/en/COD-M_FundingRequest_3_en.zip",
          },
          {
            title: " Funding Request RSSH - 2020",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Funding Requests/COD/2020/RSSH/en/COD-S_FundingRequest_3_en.zip",
          },
          {
            title: " Funding Request Malaria - 2017",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Funding Requests/COD/2017/Malaria/en/COD-M_FundingRequest_0_en.zip",
          },
          {
            title: " Funding Request TB/HIV - 2017",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Funding Requests/COD/2017/TB_HIV/en/COH-C_FundingRequest_0_en.zip",
          },
          {
            title: " Concept Note TB/HIV - 2014",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Concept Notes/COD/2014/TB_HIV/en/COD-TH_ConceptNote_0_en.zip",
          },
          {
            title: " Concept Note Malaria - 2014",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Concept Notes/COD/2014/Malaria/en/COD-M_ConceptNote_0_en.zip",
          },
          {
            title: " Proposal Malaria - Round 10",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Proposals/COD/Round 10/Malaria/en/ZAR-R10-ML_Proposal_0_en.pdf",
          },
          {
            title: " Proposal Tuberculosis - Round 09",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Proposals/COD/Round 09/Tuberculosis/en/ZAR-R09-TB_Proposal_0_en.pdf",
          },
          {
            title: " Proposal HIV - Round 08",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Proposals/COD/Round 08/HIV/en/ZAR-R08-HA_Proposal_0_en.pdf",
          },
          {
            title: " Proposal Malaria - Round 08",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Proposals/COD/Round 08/Malaria/en/ZAR-R08-ML_Proposal_0_en.pdf",
          },
          {
            title: " Proposal HIV - Round 07",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Proposals/COD/Round 07/HIV/fr/ZAR-R07-HA_Proposal_0_fr.pdf",
          },
          {
            title: " Proposal HIV - Round 07",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Proposals/COD/Round 07/HIV/en/ZAR-R07-HA_Proposal_0_en.pdf",
          },
          {
            title: " Proposal Tuberculosis - Round 06",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Proposals/COD/Round 06/Tuberculosis/en/ZAR-R06-TB_Proposal_0_en.pdf",
          },
          {
            title: " Proposal Tuberculosis - Round 05",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Proposals/COD/Round 05/Tuberculosis/en/ZAR-R05-TB_Proposal_0_en.pdf",
          },
          {
            title: " Proposal Malaria - Round 03",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Proposals/COD/Round 03/Malaria/fr/ZAR-R03-ML_Proposal_0_fr.pdf",
          },
          {
            title: " Proposal HIV - Round 03",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Proposals/COD/Round 03/HIV/fr/ZAR-R03-HA_Proposal_0_fr.pdf",
          },
          {
            title: " Proposal Tuberculosis - Round 02",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Proposals/COD/Round 02/Tuberculosis/en/ZAR-R02-TB_Proposal_0_en.pdf",
          },
        ],
      },
    ],
  },
  {
    name: "Costa Rica",
    count: 3,
    docCategories: [
      {
        name: "Application",
        count: 3,
        docs: [
          {
            title: " Funding Request HIV - 2017",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Funding Requests/CRI/2017/HIV/en/CRI-H_FundingRequest_0_en.zip",
          },
          {
            title: " Concept Note HIV - 2015",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Concept Notes/CRI/2015/HIV/en/CRI-H_ConceptNote_0_en.zip",
          },
          {
            title: " Proposal HIV - Round 02",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Proposals/CRI/Round 02/HIV/en/COR-R02-HA_Proposal_0_en.pdf",
          },
        ],
      },
    ],
  },
  {
    name: "Croatia",
    count: 1,
    docCategories: [
      {
        name: "Application",
        count: 1,
        docs: [
          {
            title: " Proposal HIV - Round 02",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Proposals/HRV/Round 02/HIV/en/HRV-R02-HA_Proposal_0_en.pdf",
          },
        ],
      },
    ],
  },
  {
    name: "Cuba",
    count: 7,
    docCategories: [
      {
        name: "Application",
        count: 7,
        docs: [
          {
            title: " Funding Request HIV - 2017",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Funding Requests/CUB/2017/HIV/en/CUB-H_FundingRequest_0_en.zip",
          },
          {
            title: " Concept Note HIV - 2014",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Concept Notes/CUB/2014/HIV/en/CUB-H_ConceptNote_0_en.zip",
          },
          {
            title: " Proposal Tuberculosis - Round 07",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Proposals/CUB/Round 07/Tuberculosis/en/CUB-R07-TB_Proposal_0_en.pdf",
          },
          {
            title: " Proposal Tuberculosis - Round 07",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Proposals/CUB/Round 07/Tuberculosis/es/CUB-R07-TB_Proposal_0_es.pdf",
          },
          {
            title: " Proposal HIV - Round 06",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Proposals/CUB/Round 06/HIV/en/CUB-R06-HA_Proposal_0_en.pdf",
          },
          {
            title: " Proposal HIV - Round 02",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Proposals/CUB/Round 02/HIV/en/CUB-R02-HA_RCCProposal_0_en.pdf",
          },
          {
            title: " Proposal HIV - Round 02",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Proposals/CUB/Round 02/HIV/en/CUB-R02-HA_Proposal_0_en.pdf",
          },
        ],
      },
    ],
  },
  {
    name: "Côte d'Ivoire",
    count: 19,
    docCategories: [
      {
        name: "Application",
        count: 19,
        docs: [
          {
            title: " Funding Request Tuberculosis - 2020",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Funding Requests/CIV/2020/Tuberculosis/en/CIV-T_FundingRequest_1_en.zip",
          },
          {
            title: " Funding Request Multicomponent - 2020",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Funding Requests/CIV/2020/Multicomponent/en/CIV-Z_FundingRequest_2_en.zip",
          },
          {
            title: " Funding Request Malaria - 2017",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Funding Requests/CIV/2017/Malaria/en/CIV-M_FundingRequest_0_en.zip",
          },
          {
            title: " Funding Request HIV - 2017",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Funding Requests/CIV/2017/HIV/en/CIV-H_FundingRequest_0_en.zip",
          },
          {
            title: " Funding Request Tuberculosis - 2017",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Funding Requests/CIV/2017/Tuberculosis/en/CIV-T_FundingRequest_0_en.zip",
          },
          {
            title: " Concept Note Tuberculosis - 2015",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Concept Notes/CIV/2015/Tuberculosis/en/CIV-T_ConceptNote_0_en.zip",
          },
          {
            title: " Concept Note Malaria - 2014",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Concept Notes/CIV/2014/Malaria/en/CIV-M_ConceptNote_0_en.zip",
          },
          {
            title: " Proposal Tuberculosis - Round 09",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Proposals/CIV/Round 09/Tuberculosis/en/CIV-R09-TB_Proposal_0_en.pdf",
          },
          {
            title: " Proposal HIV - Round 09",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Proposals/CIV/Round 09/HIV/en/CIV-R09-HA_Proposal_0_en.pdf",
          },
          {
            title: " Proposal Malaria - Round 08",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Proposals/CIV/Round 08/Malaria/en/CIV-R08-ML_Proposal_0_en.pdf",
          },
          {
            title: " Proposal Malaria - Round 06",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Proposals/CIV/Round 06/Malaria/en/CIV-R06-ML_Proposal_0_en.pdf",
          },
          {
            title: " Proposal Tuberculosis - Round 06",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Proposals/CIV/Round 06/Tuberculosis/en/CIV-R06-TB_Proposal_0_en.pdf",
          },
          {
            title: " Proposal HIV - Round 05",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Proposals/CIV/Round 05/HIV/en/CIV-R05-HA_Proposal_0_en.pdf",
          },
          {
            title: " Proposal Tuberculosis - Round 03",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Proposals/CIV/Round 03/Tuberculosis/en/CIV-R03-TB_Proposal_0_en.pdf",
          },
          {
            title: " Proposal HIV - Round 03",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Proposals/CIV/Round 03/HIV/en/CIV-R03-HA_Proposal_0_en.pdf",
          },
          {
            title: " Proposal HIV - Round 03",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Proposals/CIV/Round 03/HIV/fr/CIV-R03-HA_Proposal_0_fr.pdf",
          },
          {
            title: " Proposal Tuberculosis - Round 03",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Proposals/CIV/Round 03/Tuberculosis/fr/CIV-R03-TB_Proposal_0_fr.pdf",
          },
          {
            title: " Proposal HIV - Round 02",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Proposals/CIV/Round 02/HIV/fr/CIV-R02-HA_Proposal_0_fr.pdf",
          },
          {
            title: " Proposal HIV - Round 02",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Proposals/CIV/Round 02/HIV/en/CIV-R02-HA_Proposal_0_en.pdf",
          },
        ],
      },
    ],
  },
  {
    name: "Djibouti",
    count: 12,
    docCategories: [
      {
        name: "Application",
        count: 12,
        docs: [
          {
            title: " Funding Request Malaria - 2017",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Funding Requests/DJI/2017/Malaria/en/DJI-M_FundingRequest_0_en.zip",
          },
          {
            title: " Funding Request TB/HIV - 2017",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Funding Requests/DJI/2017/TB_HIV/en/DJI-C_FundingRequest_0_en.zip",
          },
          {
            title: " Concept Note TB/HIV - 2015",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Concept Notes/DJI/2015/TB_HIV/en/DJI-C_ConceptNote_0_en.zip",
          },
          {
            title: " Concept Note Malaria - 2014",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Concept Notes/DJI/2014/Malaria/en/DJI-M_ConceptNote_0_en.zip",
          },
          {
            title: " Proposal HIV - Transitional Funding Mechanism",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Proposals/DJI/Transitional Funding Mechanism/HIV/en/DJB-TFM-HA_Proposal_0_en.pdf",
          },
          {
            title: " Proposal Tuberculosis - Round 10",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Proposals/DJI/Round 10/Tuberculosis/en/DJB-R10-TB_Proposal_0_en.pdf",
          },
          {
            title: " Proposal Malaria - Round 09",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Proposals/DJI/Round 09/Malaria/en/DJB-R09-ML_Proposal_0_en.pdf",
          },
          {
            title: " Proposal Tuberculosis - Round 06",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Proposals/DJI/Round 06/Tuberculosis/en/DJB-R06-TB_Proposal_0_en.pdf",
          },
          {
            title: " Proposal Malaria - Round 06",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Proposals/DJI/Round 06/Malaria/en/DJB-R06-ML_Proposal_0_en.pdf",
          },
          {
            title: " Proposal HIV - Round 06",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Proposals/DJI/Round 06/HIV/en/DJB-R06-HA_Proposal_0_en.pdf",
          },
          {
            title: " Proposal HIV - Round 04",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Proposals/DJI/Round 04/HIV/fr/DJB-R04-HA_Proposal_0_fr.pdf",
          },
          {
            title: " Proposal HIV - Round 04",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Proposals/DJI/Round 04/HIV/en/DJB-R04-HA_Proposal_0_en.pdf",
          },
        ],
      },
    ],
  },
  {
    name: "Dominican Republic",
    count: 12,
    docCategories: [
      {
        name: "Application",
        count: 12,
        docs: [
          {
            title: " Funding Request HIV - 2018",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Funding Requests/DOM/2018/HIV/en/DOM-H_FundingRequest_0_en.zip",
          },
          {
            title: " Funding Request Tuberculosis - 2018",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Funding Requests/DOM/2018/Tuberculosis/en/DOM-T_FundingRequest_0_en.zip",
          },
          {
            title: " Concept Note HIV - 2015",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Concept Notes/DOM/2015/HIV/en/DOM-H_ConceptNote_0_en.zip",
          },
          {
            title: " Concept Note Tuberculosis - 2015",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Concept Notes/DOM/2015/Tuberculosis/en/DOM-T_ConceptNote_0_en.zip",
          },
          {
            title: " Proposal HIV - Round 08",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Proposals/DOM/Round 08/HIV/en/DMR-R08-HA_Proposal_0_en.pdf",
          },
          {
            title: " Proposal Tuberculosis - Round 07",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Proposals/DOM/Round 07/Tuberculosis/en/DMR-R07-TB_Proposal_0_en.pdf",
          },
          {
            title: " Proposal Tuberculosis - Round 03",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Proposals/DOM/Round 03/Tuberculosis/en/DMR-R03-TB_Proposal_0_en.pdf",
          },
          {
            title: " Proposal Tuberculosis - Round 03",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Proposals/DOM/Round 03/Tuberculosis/es/DMR-R03-TB_Proposal_0_es.pdf",
          },
          {
            title: " Proposal Tuberculosis - Round 03",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Proposals/DOM/Round 03/Tuberculosis/en/DMR-R03-TB_RCCProposal_0_en.pdf",
          },
          {
            title: " Proposal HIV - Round 02",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Proposals/DOM/Round 02/HIV/en/DMR-R02-HA_Proposal_0_en.pdf",
          },
          {
            title: " Proposal HIV - Round 02",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Proposals/DOM/Round 02/HIV/en/DMR-R02-HA_RCCProposal_0_en.pdf",
          },
          {
            title: " Proposal HIV - Round 02",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Proposals/DOM/Round 02/HIV/es/DMR-R02-HA_Proposal_0_es.pdf",
          },
        ],
      },
    ],
  },
  {
    name: "Eastern Africa",
    count: 1,
    docCategories: [
      {
        name: "Application",
        count: 1,
        docs: [
          {
            title: " Concept Note HIV - 2015",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Concept Notes/QPB/2015/HIV/en/QPB-H_ConceptNote_0_en.zip",
          },
        ],
      },
    ],
  },
  {
    name: "Ecuador",
    count: 9,
    docCategories: [
      {
        name: "Application",
        count: 9,
        docs: [
          {
            title: " Funding Request HIV - 2018",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Funding Requests/ECU/2018/HIV/en/ECU-H_FundingRequest_0_en.zip",
          },
          {
            title: " Concept Note HIV - 2016",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Concept Notes/ECU/2016/HIV/en/ECU-H_ConceptNote_0_en.zip",
          },
          {
            title: " Proposal HIV - Round 09",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Proposals/ECU/Round 09/HIV/en/ECU-R09-HA_Proposal_0_en.pdf",
          },
          {
            title: " Proposal Tuberculosis - Round 09",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Proposals/ECU/Round 09/Tuberculosis/en/ECU-R09-TB_Proposal_0_en.pdf",
          },
          {
            title: " Proposal Malaria - Round 08",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Proposals/ECU/Round 08/Malaria/en/ECU-R08-ML_Proposal_0_en.pdf",
          },
          {
            title: " Proposal Tuberculosis - Round 04",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Proposals/ECU/Round 04/Tuberculosis/es/ECU-R04-TB_Proposal_0_es.pdf",
          },
          {
            title: " Proposal Tuberculosis - Round 04",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Proposals/ECU/Round 04/Tuberculosis/en/ECU-R04-TB_Proposal_0_en.pdf",
          },
          {
            title: " Proposal HIV - Round 02",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Proposals/ECU/Round 02/HIV/es/ECU-R02-HA_Proposal_0_es.pdf",
          },
          {
            title: " Proposal HIV - Round 02",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Proposals/ECU/Round 02/HIV/en/ECU-R02-HA_Proposal_0_en.pdf",
          },
        ],
      },
    ],
  },
  {
    name: "Egypt",
    count: 6,
    docCategories: [
      {
        name: "Application",
        count: 6,
        docs: [
          {
            title: " Funding Request TB/HIV - 2018",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Funding Requests/EGY/2018/TB_HIV/en/EGY-C_FundingRequest_0_en.zip",
          },
          {
            title: " Proposal HIV - Transitional Funding Mechanism",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Proposals/EGY/Transitional Funding Mechanism/HIV/en/EGY-TFM-HA_Proposal_0_en.pdf",
          },
          {
            title: " Proposal Tuberculosis - Transitional Funding Mechanism",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Proposals/EGY/Transitional Funding Mechanism/Tuberculosis/en/EGY-TFM-TB_Proposal_0_en.pdf",
          },
          {
            title: " Proposal Tuberculosis - Round 06",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Proposals/EGY/Round 06/Tuberculosis/en/EGY-R06-TB_Proposal_0_en.pdf",
          },
          {
            title: " Proposal HIV - Round 06",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Proposals/EGY/Round 06/HIV/en/EGY-R06-HA_Proposal_0_en.pdf",
          },
          {
            title: " Proposal Tuberculosis - Round 02",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Proposals/EGY/Round 02/Tuberculosis/en/EGY-R02-TB_Proposal_0_en.pdf",
          },
        ],
      },
    ],
  },
  {
    name: "El Salvador",
    count: 11,
    docCategories: [
      {
        name: "Application",
        count: 11,
        docs: [
          {
            title: " Funding Request Tuberculosis - 2018",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Funding Requests/SLV/2018/Tuberculosis/en/SLV-T_FundingRequest_0_en.zip",
          },
          {
            title: " Funding Request HIV - 2018",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Funding Requests/SLV/2018/HIV/en/SLV-H_FundingRequest_0_en.zip",
          },
          {
            title: " Concept Note Malaria - 2016",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Concept Notes/SLV/2016/Malaria/en/SLV-M_ConceptNote_0_en.zip",
          },
          {
            title: " Concept Note Tuberculosis - 2015",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Concept Notes/SLV/2015/Tuberculosis/en/SLV-T_ConceptNote_0_en.zip",
          },
          {
            title: " Concept Note HIV - 2013",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Concept Notes/SLV/2013/HIV/en/SLV-H_ConceptNote_0_en.zip",
          },
          {
            title: " Proposal Tuberculosis - Round 09",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Proposals/SLV/Round 09/Tuberculosis/en/SLV-R09-TB_Proposal_0_en.pdf",
          },
          {
            title: " Proposal HIV - Round 07",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Proposals/SLV/Round 07/HIV/es/SLV-R07-HA_Proposal_0_es.pdf",
          },
          {
            title: " Proposal HIV - Round 07",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Proposals/SLV/Round 07/HIV/en/SLV-R07-HA_Proposal_0_en.pdf",
          },
          {
            title: " Proposal HIV - Round 02",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Proposals/SLV/Round 02/HIV/es/SLV-R02-HA_Proposal_0_es.pdf",
          },
          {
            title: " Proposal HIV - Round 02",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Proposals/SLV/Round 02/HIV/en/SLV-R02-HA_RCCProposal_0_en.pdf",
          },
          {
            title: " Proposal HIV - Round 02",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Proposals/SLV/Round 02/HIV/en/SLV-R02-HA_Proposal_0_en.pdf",
          },
        ],
      },
    ],
  },
  {
    name: "Equatorial Guinea",
    count: 3,
    docCategories: [
      {
        name: "Application",
        count: 3,
        docs: [
          {
            title: " Proposal Malaria - Round 05",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Proposals/GNQ/Round 05/Malaria/en/GNQ-R05-ML_Proposal_0_en.pdf",
          },
          {
            title: " Proposal HIV - Round 04",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Proposals/GNQ/Round 04/HIV/es/GNQ-R04-HA_Proposal_0_es.pdf",
          },
          {
            title: " Proposal HIV - Round 04",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Proposals/GNQ/Round 04/HIV/en/GNQ-R04-HA_Proposal_0_en.pdf",
          },
        ],
      },
    ],
  },
  {
    name: "Eritrea",
    count: 13,
    docCategories: [
      {
        name: "Application",
        count: 13,
        docs: [
          {
            title: " Funding Request Malaria - 2017",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Funding Requests/ERI/2017/Malaria/en/ERI-M_FundingRequest_0_en.zip",
          },
          {
            title: " Funding Request Tuberculosis - 2017",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Funding Requests/ERI/2017/Tuberculosis/en/ERT-T_FundingRequest_0_en.zip",
          },
          {
            title: " Funding Request HIV - 2017",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Funding Requests/ERI/2017/HIV/en/ERI-H_FundingRequest_0_en.zip",
          },
          {
            title: " Concept Note Malaria - 2015",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Concept Notes/ERI/2015/Malaria/en/ERI-M_ConceptNote_0_en.zip",
          },
          {
            title: " Proposal HIV - Round 10",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Proposals/ERI/Round 10/HIV/en/ERT-R10-HA_Proposal_0_en.pdf",
          },
          {
            title: " Proposal Tuberculosis - Round 10",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Proposals/ERI/Round 10/Tuberculosis/en/ERT-R10-TB_Proposal_0_en.pdf",
          },
          {
            title: " Proposal Malaria - Round 09",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Proposals/ERI/Round 09/Malaria/en/ERT-R09-ML_Proposal_0_en.pdf",
          },
          {
            title: " Proposal HIV - Round 08",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Proposals/ERI/Round 08/HIV/en/ERT-R08-HA_Proposal_0_en.pdf",
          },
          {
            title: " Proposal Malaria - Round 06",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Proposals/ERI/Round 06/Malaria/en/ERT-R06-ML_Proposal_0_en.pdf",
          },
          {
            title: " Proposal Tuberculosis - Round 06",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Proposals/ERI/Round 06/Tuberculosis/en/ERT-R06-TB_Proposal_0_en.pdf",
          },
          {
            title: " Proposal HIV - Round 05",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Proposals/ERI/Round 05/HIV/en/ERT-R05-HA_Proposal_0_en.pdf",
          },
          {
            title: " Proposal HIV - Round 03",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Proposals/ERI/Round 03/HIV/en/ERT-R03-HA_Proposal_0_en.pdf",
          },
          {
            title: " Proposal Malaria - Round 02",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Proposals/ERI/Round 02/Malaria/en/ERT-R02-ML_Proposal_0_en.pdf",
          },
        ],
      },
    ],
  },
  {
    name: "Estonia",
    count: 1,
    docCategories: [
      {
        name: "Application",
        count: 1,
        docs: [
          {
            title: " Proposal HIV - Round 02",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Proposals/EST/Round 02/HIV/en/EST-R02-HA_Proposal_0_en.pdf",
          },
        ],
      },
    ],
  },
  {
    name: "Eswatini",
    count: 15,
    docCategories: [
      {
        name: "Application",
        count: 15,
        docs: [
          {
            title: " Funding Request Malaria - 2020",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Funding Requests/SWZ/2020/Malaria/en/SWZ-M_FundingRequest_2_en.zip",
          },
          {
            title: " Funding Request TB/HIV - 2017",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Funding Requests/SWZ/2017/TB_HIV/en/SWZ-C_FundingRequest_0_en.zip",
          },
          {
            title: " Funding Request Malaria - 2017",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Funding Requests/SWZ/2017/Malaria/en/SWZ-M_FundingRequest_0_en.zip",
          },
          {
            title: " Concept Note TB/HIV - 2014",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Concept Notes/SWZ/2014/TB_HIV/en/SWZ-C_ConceptNote_0_en.zip",
          },
          {
            title: " Concept Note Malaria - 2014",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Concept Notes/SWZ/2014/Malaria/en/SWZ-M_ConceptNote_0_en.zip",
          },
          {
            title: " Proposal HIV - Transitional Funding Mechanism",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Proposals/SWZ/Transitional Funding Mechanism/HIV/en/SWZ-TFM-HA_Proposal_0_en.pdf",
          },
          {
            title: " Proposal Tuberculosis - Round 10",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Proposals/SWZ/Round 10/Tuberculosis/en/SWZ-R10-TB_Proposal_0_en.pdf",
          },
          {
            title: " Proposal Tuberculosis - Round 08",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Proposals/SWZ/Round 08/Tuberculosis/en/SWZ-R08-TB_Proposal_0_en.pdf",
          },
          {
            title: " Proposal Malaria - Round 08",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Proposals/SWZ/Round 08/Malaria/en/SWZ-R08-ML_Proposal_0_en.pdf",
          },
          {
            title: " Proposal HIV - Round 08",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Proposals/SWZ/Round 08/HIV/en/SWZ-R08-HA_Proposal_0_en.pdf",
          },
          {
            title: " Proposal HIV - Round 07",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Proposals/SWZ/Round 07/HIV/en/SWZ-R07-HA_Proposal_0_en.pdf",
          },
          {
            title: " Proposal HIV - Round 04",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Proposals/SWZ/Round 04/HIV/en/SWZ-R04-HA_Proposal_0_en.pdf",
          },
          {
            title: " Proposal Tuberculosis - Round 03",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Proposals/SWZ/Round 03/Tuberculosis/en/SWZ-R03-TB_Proposal_0_en.pdf",
          },
          {
            title: " Proposal Malaria - Round 02",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Proposals/SWZ/Round 02/Malaria/en/SWZ-R02-ML_Proposal_0_en.pdf",
          },
          {
            title: " Proposal HIV - Round 02",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Proposals/SWZ/Round 02/HIV/en/SWZ-R02-HA_Proposal_0_en.pdf",
          },
        ],
      },
    ],
  },
  {
    name: "Ethiopia",
    count: 18,
    docCategories: [
      {
        name: "Application",
        count: 18,
        docs: [
          {
            title: " Funding Request TB/HIV - 2017",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Funding Requests/ETH/2017/TB_HIV/en/ETH-C_FundingRequest_0_en.zip",
          },
          {
            title: " Funding Request Malaria - 2017",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Funding Requests/ETH/2017/Malaria/en/ETH-M_FundingRequest_0_en.zip",
          },
          {
            title: " Funding Request RSSH - 2017",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Funding Requests/ETH/2017/RSSH/en/ETH-S_FundingRequest_0_en.zip",
          },
          {
            title: " Concept Note Malaria - 2014",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Concept Notes/ETH/2014/Malaria/en/ETH-M_ConceptNote_0_en.zip",
          },
          {
            title: " Concept Note TB/HIV - 2014",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Concept Notes/ETH/2014/TB_HIV/en/ETH-TH_ConceptNote_0_en.zip",
          },
          {
            title: " Concept Note RSSH - 2014",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Concept Notes/ETH/2014/RSSH/en/ETH-S_ConceptNote_0_en.zip",
          },
          {
            title: " Proposal HIV - Transitional Funding Mechanism",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Proposals/ETH/Transitional Funding Mechanism/HIV/en/ETH-TFM-HA_Proposal_0_en.pdf",
          },
          {
            title: " Proposal Malaria - Transitional Funding Mechanism",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Proposals/ETH/Transitional Funding Mechanism/Malaria/en/ETH-TFM-ML_Proposal_0_en.pdf",
          },
          {
            title: " Proposal Tuberculosis - Round 09",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Proposals/ETH/Round 09/Tuberculosis/en/ETH-R09-TB_Proposal_0_en.pdf",
          },
          {
            title: " Proposal Malaria - Round 08",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Proposals/ETH/Round 08/Malaria/en/ETH-R08-ML_Proposal_0_en.pdf",
          },
          {
            title: " Proposal HIV - Round 07",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Proposals/ETH/Round 07/HIV/en/ETH-R07-HA_Proposal_0_en.pdf",
          },
          {
            title: " Proposal Tuberculosis - Round 06",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Proposals/ETH/Round 06/Tuberculosis/en/ETH-R06-TB_Proposal_0_en.pdf",
          },
          {
            title: " Proposal Malaria - Round 05",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Proposals/ETH/Round 05/Malaria/en/ETH-R05-ML_Proposal_0_en.pdf",
          },
          {
            title: " Proposal HIV - Round 04",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Proposals/ETH/Round 04/HIV/en/ETH-R04-HA_Proposal_0_en.pdf",
          },
          {
            title: " Proposal HIV - Round 02",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Proposals/ETH/Round 02/HIV/en/ETH-R02-HA_RCCProposal_0_en.pdf",
          },
          {
            title: " Proposal HIV - Round 02",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Proposals/ETH/Round 02/HIV/en/ETH-R02-HA_Proposal_0_en.pdf",
          },
          {
            title: " Proposal Malaria - Round 02",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Proposals/ETH/Round 02/Malaria/en/ETH-R02-ML_Proposal_0_en.pdf",
          },
          {
            title: " Proposal Tuberculosis - Round 01",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Proposals/ETH/Round 01/Tuberculosis/en/ETH-R01-TB_Proposal_0_en.pdf",
          },
        ],
      },
    ],
  },
  {
    name: "Fiji",
    count: 3,
    docCategories: [
      {
        name: "Application",
        count: 3,
        docs: [
          {
            title: " Concept Note Tuberculosis - 2014",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Concept Notes/FJI/2014/Tuberculosis/en/FJI-T_ConceptNote_0_en.zip",
          },
          {
            title: " Proposal HIV - Round 09",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Proposals/FJI/Round 09/HIV/en/FJI-R09-HA_Proposal_0_en.pdf",
          },
          {
            title: " Proposal Tuberculosis - Round 08",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Proposals/FJI/Round 08/Tuberculosis/en/FJI-R08-TB_Proposal_0_en.pdf",
          },
        ],
      },
    ],
  },
  {
    name: "Gabon",
    count: 7,
    docCategories: [
      {
        name: "Application",
        count: 7,
        docs: [
          {
            title: " Funding Request Tuberculosis - 2018",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Funding Requests/GAB/2018/Tuberculosis/en/GAB-T_FundingRequest_0_en.zip",
          },
          {
            title: " Concept Note Tuberculosis - 2015",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Concept Notes/GAB/2015/Tuberculosis/en/GAB-T_ConceptNote_0_en.zip",
          },
          {
            title: " Proposal HIV - Round 08",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Proposals/GAB/Round 08/HIV/en/GAB-R08-HA_Proposal_0_en.pdf",
          },
          {
            title: " Proposal Malaria - Round 05",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Proposals/GAB/Round 05/Malaria/en/GAB-R05-ML_Proposal_0_en.pdf",
          },
          {
            title: " Proposal Malaria - Round 04",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Proposals/GAB/Round 04/Malaria/fr/GAB-R04-ML_Proposal_0_fr.pdf",
          },
          {
            title: " Proposal Malaria - Round 04",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Proposals/GAB/Round 04/Malaria/en/GAB-R04-ML_Proposal_0_en.pdf",
          },
          {
            title: " Proposal HIV - Round 03",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Proposals/GAB/Round 03/HIV/fr/GAB-R03-HA_Proposal_0_fr.pdf",
          },
        ],
      },
    ],
  },
  {
    name: "Gambia",
    count: 13,
    docCategories: [
      {
        name: "Application",
        count: 13,
        docs: [
          {
            title: " Funding Request Malaria - 2017",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Funding Requests/GMB/2017/Malaria/en/GMB-M_FundingRequest_0_en.zip",
          },
          {
            title: " Funding Request TB/HIV - 2017",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Funding Requests/GMB/2017/TB_HIV/en/GMB-C_FundingRequest_0_en.zip",
          },
          {
            title: " Concept Note Malaria - 2015",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Concept Notes/GMB/2015/Malaria/en/GMB-M_ConceptNote_0_en.zip",
          },
          {
            title: " Concept Note Tuberculosis - 2015",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Concept Notes/GMB/2015/Tuberculosis/en/GMB-T_ConceptNote_0_en.zip",
          },
          {
            title: " Concept Note HIV - 2014",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Concept Notes/GMB/2014/HIV/en/GMB-H_ConceptNote_0_en.zip",
          },
          {
            title: " Proposal Malaria - Round 09",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Proposals/GMB/Round 09/Malaria/en/GMB-R09-ML_Proposal_0_en.pdf",
          },
          {
            title: " Proposal Tuberculosis - Round 09",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Proposals/GMB/Round 09/Tuberculosis/en/GMB-R09-TB_Proposal_0_en.pdf",
          },
          {
            title: " Proposal HIV - Round 08",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Proposals/GMB/Round 08/HIV/en/GMB-R08-HA_Proposal_0_en.pdf",
          },
          {
            title: " Proposal Malaria - Round 06",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Proposals/GMB/Round 06/Malaria/en/GMB-R06-ML_Proposal_0_en.pdf",
          },
          {
            title: " Proposal Tuberculosis - Round 05",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Proposals/GMB/Round 05/Tuberculosis/en/GMB-R05-TB_Proposal_0_en.pdf",
          },
          {
            title: " Proposal Malaria - Round 03",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Proposals/GMB/Round 03/Malaria/en/GMB-R03-ML_RCCProposal_0_en.pdf",
          },
          {
            title: " Proposal HIV - Round 03",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Proposals/GMB/Round 03/HIV/en/GMB-R03-HA_Proposal_0_en.pdf",
          },
          {
            title: " Proposal Malaria - Round 03",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Proposals/GMB/Round 03/Malaria/en/GMB-R03-ML_Proposal_0_en.pdf",
          },
        ],
      },
    ],
  },
  {
    name: "Georgia",
    count: 15,
    docCategories: [
      {
        name: "Application",
        count: 15,
        docs: [
          {
            title: " Funding Request Tuberculosis - 2018",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Funding Requests/GEO/2018/Tuberculosis/en/GEO-T_FundingRequest_0_en.zip",
          },
          {
            title: " Funding Request HIV - 2018",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Funding Requests/GEO/2018/HIV/en/GEO-H_FundingRequest_0_en.zip",
          },
          {
            title: " Concept Note HIV - 2015",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Concept Notes/GEO/2015/HIV/en/GEO-H_ConceptNote_0_en.zip",
          },
          {
            title: " Concept Note Tuberculosis - 2015",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Concept Notes/GEO/2015/Tuberculosis/en/GEO-T_ConceptNote_0_en.zip",
          },
          {
            title: " Proposal HIV - Round 10",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Proposals/GEO/Round 10/HIV/en/GEO-R10-HA_Proposal_0_en.pdf",
          },
          {
            title: " Proposal Tuberculosis - Round 10",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Proposals/GEO/Round 10/Tuberculosis/en/GEO-R10-TB_Proposal_0_en.pdf",
          },
          {
            title: " Proposal HIV - Round 09",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Proposals/GEO/Round 09/HIV/en/GEO-R09-HA_Proposal_0_en.pdf",
          },
          {
            title: " Proposal HIV - Round 06",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Proposals/GEO/Round 06/HIV/en/GEO-R06-HA_Proposal_0_en.pdf",
          },
          {
            title: " Proposal Tuberculosis - Round 06",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Proposals/GEO/Round 06/Tuberculosis/en/GEO-R06-TB_Proposal_0_en.pdf",
          },
          {
            title: " Proposal Malaria - Round 06",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Proposals/GEO/Round 06/Malaria/en/GEO-R06-ML_Proposal_0_en.pdf",
          },
          {
            title: " Proposal Tuberculosis - Round 04",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Proposals/GEO/Round 04/Tuberculosis/en/GEO-R04-TB_Proposal_0_en.pdf",
          },
          {
            title: " Proposal Tuberculosis - Round 04",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Proposals/GEO/Round 04/Tuberculosis/en/GEO-R04-TB_RCCProposal_0_en.pdf",
          },
          {
            title: " Proposal Malaria - Round 03",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Proposals/GEO/Round 03/Malaria/en/GEO-R03-ML_Proposal_0_en.pdf",
          },
          {
            title: " Proposal HIV - Round 02",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Proposals/GEO/Round 02/HIV/en/GEO-R02-HA_RCCProposal_0_en.pdf",
          },
          {
            title: " Proposal HIV - Round 02",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Proposals/GEO/Round 02/HIV/en/GEO-R02-HA_Proposal_0_en.pdf",
          },
        ],
      },
    ],
  },
  {
    name: "Ghana",
    count: 19,
    docCategories: [
      {
        name: "Application",
        count: 19,
        docs: [
          {
            title: " Funding Request Malaria - 2020",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Funding Requests/GHA/2020/Malaria/en/GHA-M_FundingRequest_2_en.zip",
          },
          {
            title: " Funding Request TB/HIV - 2020",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Funding Requests/GHA/2020/TB_HIV/en/GHA-C_FundingRequest_2_en.zip",
          },
          {
            title: " Funding Request TB/HIV - 2017",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Funding Requests/GHA/2017/TB_HIV/en/GHA-C_FundingRequest_0_en.zip",
          },
          {
            title: " Funding Request Malaria - 2017",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Funding Requests/GHA/2017/Malaria/en/GHA-M_FundingRequest_0_en.zip",
          },
          {
            title: " Concept Note TB/HIV - 2014",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Concept Notes/GHA/2014/TB_HIV/en/GHA-TH_ConceptNote_0_en.zip",
          },
          {
            title: " Concept Note Malaria - 2014",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Concept Notes/GHA/2014/Malaria/en/GHA-M_ConceptNote_0_en.zip",
          },
          {
            title: " Proposal HIV - Transitional Funding Mechanism",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Proposals/GHA/Transitional Funding Mechanism/HIV/en/GHN-TFM-HA_Proposal_0_en.pdf",
          },
          {
            title: " Proposal Tuberculosis - Round 10",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Proposals/GHA/Round 10/Tuberculosis/en/GHN-R10-TB_Proposal_0_en.pdf",
          },
          {
            title: " Proposal Malaria - Round 08",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Proposals/GHA/Round 08/Malaria/en/GHN-R08-ML_Proposal_0_en.pdf",
          },
          {
            title: " Proposal HIV - Round 08",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Proposals/GHA/Round 08/HIV/en/GHN-R08-HA_Proposal_0_en.pdf",
          },
          {
            title: " Proposal Tuberculosis - Round 05",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Proposals/GHA/Round 05/Tuberculosis/en/GHN-R05-TB_Proposal_0_en.pdf",
          },
          {
            title: " Proposal HIV - Round 05",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Proposals/GHA/Round 05/HIV/en/GHN-R05-HA_Proposal_0_en.pdf",
          },
          {
            title: " Proposal Malaria - Round 04",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Proposals/GHA/Round 04/Malaria/en/GHN-R04-ML_Proposal_0_en.pdf",
          },
          {
            title: " Proposal Malaria - Round 04",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Proposals/GHA/Round 04/Malaria/en/GHN-R04-ML_AMFmApplication_0_en.pdf",
          },
          {
            title: " Proposal Malaria - Round 04",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Proposals/GHA/Round 04/Malaria/en/GHN-R04-ML_RCCProposal_0_en.pdf",
          },
          {
            title: " Proposal Malaria - Round 02",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Proposals/GHA/Round 02/Malaria/en/GHN-R02-ML_RCCProposal_0_en.pdf",
          },
          {
            title: " Proposal Malaria - Round 02",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Proposals/GHA/Round 02/Malaria/en/GHN-R02-ML_Proposal_0_en.pdf",
          },
          {
            title: " Proposal Tuberculosis - Round 01",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Proposals/GHA/Round 01/Tuberculosis/en/GHN-R01-TB_Proposal_0_en.pdf",
          },
          {
            title: " Proposal HIV - Round 01",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Proposals/GHA/Round 01/HIV/en/GHN-R01-HA_Proposal_0_en.pdf",
          },
        ],
      },
    ],
  },
  {
    name: "Guatemala",
    count: 14,
    docCategories: [
      {
        name: "Application",
        count: 14,
        docs: [
          {
            title: " Funding Request HIV - 2020",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Funding Requests/GTM/2020/HIV/en/GTM-H_FundingRequest_0_en.zip",
          },
          {
            title: " Funding Request Tuberculosis - 2018",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Funding Requests/GTM/2018/Tuberculosis/en/GTM-T_FundingRequest_0_en.zip",
          },
          {
            title: " Funding Request HIV - 2018",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Funding Requests/GTM/2018/HIV/en/GTM-H_FundingRequest_0_en.zip",
          },
          {
            title: " Funding Request Malaria - 2018",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Funding Requests/GTM/2018/Malaria/en/GTM-M_FundingRequest_0_en.zip",
          },
          {
            title: " Concept Note Tuberculosis - 2015",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Concept Notes/GTM/2015/Tuberculosis/en/GTM-T_ConceptNote_0_en.zip",
          },
          {
            title: " Proposal Tuberculosis - Transitional Funding Mechanism",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Proposals/GTM/Transitional Funding Mechanism/Tuberculosis/en/GUA-TFM-TB_Proposal_0_en.pdf",
          },
          {
            title: " Proposal Malaria - Round 09",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Proposals/GTM/Round 09/Malaria/en/GUA-R09-ML_Proposal_0_en.pdf",
          },
          {
            title: " Proposal Tuberculosis - Round 06",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Proposals/GTM/Round 06/Tuberculosis/en/GUA-R06-TB_Proposal_0_en.pdf",
          },
          {
            title: " Proposal Malaria - Round 04",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Proposals/GTM/Round 04/Malaria/en/GUA-R04-ML_Proposal_0_en.pdf",
          },
          {
            title: " Proposal Malaria - Round 04",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Proposals/GTM/Round 04/Malaria/es/GUA-R04-ML_Proposal_0_es.pdf",
          },
          {
            title: " Proposal Malaria - Round 04",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Proposals/GTM/Round 04/Malaria/en/GUA-R04-ML_RCCProposal_0_en.pdf",
          },
          {
            title: " Proposal HIV - Round 03",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Proposals/GTM/Round 03/HIV/en/GUA-R03-HA_Proposal_0_en.pdf",
          },
          {
            title: " Proposal HIV - Round 03",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Proposals/GTM/Round 03/HIV/en/GUA-R03-HA_RCCProposal_0_en.pdf",
          },
          {
            title: " Proposal HIV - Round 03",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Proposals/GTM/Round 03/HIV/es/GUA-R03-HA_Proposal_0_es.pdf",
          },
        ],
      },
    ],
  },
  {
    name: "Guinea",
    count: 15,
    docCategories: [
      {
        name: "Application",
        count: 15,
        docs: [
          {
            title: " Funding Request Tuberculosis - 2017",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Funding Requests/GIN/2017/Tuberculosis/en/GIN-T_FundingRequest_0_en.zip",
          },
          {
            title: " Funding Request HIV - 2017",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Funding Requests/GIN/2017/HIV/en/GIN-H_FundingRequest_0_en.zip",
          },
          {
            title: " Funding Request Malaria - 2017",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Funding Requests/GIN/2017/Malaria/en/GIN-M_FundingRequest_0_en.zip",
          },
          {
            title: " Concept Note HIV - 2015",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Concept Notes/GIN/2015/HIV/en/GIN-H_ConceptNote_0_en.zip",
          },
          {
            title: " Concept Note Malaria - 2014",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Concept Notes/GIN/2014/Malaria/en/GIN-M_ConceptNote_0_en.zip",
          },
          {
            title: " Proposal Malaria - Round 10",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Proposals/GIN/Round 10/Malaria/en/GIN-R10-ML_Proposal_0_en.pdf",
          },
          {
            title: " Proposal HIV - Round 10",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Proposals/GIN/Round 10/HIV/en/GIN-R10-HA_Proposal_0_en.pdf",
          },
          {
            title: " Proposal Tuberculosis - Round 09",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Proposals/GIN/Round 09/Tuberculosis/en/GIN-R09-TB_Proposal_0_en.pdf",
          },
          {
            title: " Proposal HIV - Round 06",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Proposals/GIN/Round 06/HIV/en/GIN-R06-HA_Proposal_0_en.pdf",
          },
          {
            title: " Proposal Malaria - Round 06",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Proposals/GIN/Round 06/Malaria/en/GIN-R06-ML_Proposal_0_en.pdf",
          },
          {
            title: " Proposal Tuberculosis - Round 05",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Proposals/GIN/Round 05/Tuberculosis/en/GIN-R05-TB_Proposal_0_en.pdf",
          },
          {
            title: " Proposal HIV - Round 02",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Proposals/GIN/Round 02/HIV/en/GIN-R02-HA_Proposal_0_en.pdf",
          },
          {
            title: " Proposal Malaria - Round 02",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Proposals/GIN/Round 02/Malaria/en/GIN-R02-ML_Proposal_0_en.pdf",
          },
          {
            title: " Proposal HIV - Round 02",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Proposals/GIN/Round 02/HIV/fr/GIN-R02-HA_Proposal_0_fr.pdf",
          },
          {
            title: " Proposal Malaria - Round 02",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Proposals/GIN/Round 02/Malaria/fr/GIN-R02-ML_Proposal_0_fr.pdf",
          },
        ],
      },
    ],
  },
  {
    name: "Guinea-Bissau",
    count: 19,
    docCategories: [
      {
        name: "Application",
        count: 19,
        docs: [
          {
            title: " Funding Request Malaria - 2020",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Funding Requests/GNB/2020/Malaria/en/GNB-M_FundingRequest_1_en.zip",
          },
          {
            title: " Funding Request Multicomponent - 2017",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Funding Requests/GNB/2017/Multicomponent/en/GNB-Z_FundingRequest_0_en.zip",
          },
          {
            title: " Funding Request TB/HIV - 2017",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Funding Requests/GNB/2017/TB_HIV/fr/GNB-C_FundingRequest_0_fr.zip",
          },
          {
            title: " Funding Request Malaria - 2017",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Funding Requests/GNB/2017/Malaria/en/GNB-M_FundingRequest_0_en.zip",
          },
          {
            title: " Concept Note HIV - 2015",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Concept Notes/GNB/2015/HIV/en/GNB-H_ConceptNote_0_en.zip",
          },
          {
            title: " Concept Note Malaria - 2015",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Concept Notes/GNB/2015/Malaria/en/GNB-M_ConceptNote_0_en.zip",
          },
          {
            title: " Concept Note Tuberculosis - 2015",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Concept Notes/GNB/2015/Tuberculosis/en/GNB-T_ConceptNote_0_en.zip",
          },
          {
            title: " Proposal HIV - Transitional Funding Mechanism",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Proposals/GNB/Transitional Funding Mechanism/HIV/en/GNB-TFM-HA_Proposal_0_en.pdf",
          },
          {
            title: " Proposal Malaria - Round 09",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Proposals/GNB/Round 09/Malaria/en/GNB-R09-ML_Proposal_0_en.pdf",
          },
          {
            title: " Proposal Tuberculosis - Round 09",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Proposals/GNB/Round 09/Tuberculosis/en/GNB-R09-TB_Proposal_0_en.pdf",
          },
          {
            title: " Proposal Tuberculosis - Round 08",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Proposals/GNB/Round 08/Tuberculosis/en/GNB-R08-TB_Proposal_0_en.pdf",
          },
          {
            title: " Proposal HIV - Round 07",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Proposals/GNB/Round 07/HIV/en/GNB-R07-HA_Proposal_0_en.pdf",
          },
          {
            title: " Proposal HIV - Round 07",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Proposals/GNB/Round 07/HIV/fr/GNB-R07-HA_Proposal_0_fr.pdf",
          },
          {
            title: " Proposal Malaria - Round 06",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Proposals/GNB/Round 06/Malaria/en/GNB-R06-ML_Proposal_0_en.pdf",
          },
          {
            title: " Proposal Malaria - Round 04",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Proposals/GNB/Round 04/Malaria/en/GNB-R04-ML_Proposal_0_en.pdf",
          },
          {
            title: " Proposal HIV - Round 04",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Proposals/GNB/Round 04/HIV/en/GNB-R04-HA_Proposal_0_en.pdf",
          },
          {
            title: " Proposal Malaria - Round 04",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Proposals/GNB/Round 04/Malaria/fr/GNB-R04-ML_Proposal_0_fr.pdf",
          },
          {
            title: " Proposal Tuberculosis - Round 03",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Proposals/GNB/Round 03/Tuberculosis/en/GNB-R03-TB_Proposal_0_en.pdf",
          },
          {
            title: " Proposal Tuberculosis - Round 03",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Proposals/GNB/Round 03/Tuberculosis/fr/GNB-R03-TB_Proposal_0_fr.pdf",
          },
        ],
      },
    ],
  },
  {
    name: "Guyana",
    count: 13,
    docCategories: [
      {
        name: "Application",
        count: 13,
        docs: [
          {
            title: " Funding Request Malaria - 2019",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Funding Requests/GUY/2019/Malaria/en/GUY-M_FundingRequest_0_en.zip",
          },
          {
            title: " Funding Request Tuberculosis - 2018",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Funding Requests/GUY/2018/Tuberculosis/en/GUY-T_FundingRequest_0_en.zip",
          },
          {
            title: " Funding Request HIV - 2017",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Funding Requests/GUY/2017/HIV/en/GUY-H_FundingRequest_0_en.zip",
          },
          {
            title: " Concept Note Tuberculosis - 2015",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Concept Notes/GUY/2015/Tuberculosis/en/GUY-T_ConceptNote_0_en.zip",
          },
          {
            title: " Concept Note Malaria - 2015",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Concept Notes/GUY/2015/Malaria/en/GUY-M_ConceptNote_0_en.zip",
          },
          {
            title: " Proposal HIV - Round 08",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Proposals/GUY/Round 08/HIV/en/GYA-R08-HA_Proposal_0_en.pdf",
          },
          {
            title: " Proposal Tuberculosis - Round 08",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Proposals/GUY/Round 08/Tuberculosis/en/GYA-R08-TB_Proposal_0_en.pdf",
          },
          {
            title: " Proposal Malaria - Round 07",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Proposals/GUY/Round 07/Malaria/en/GYA-R07-ML_Proposal_0_en.pdf",
          },
          {
            title: " Proposal Tuberculosis - Round 04",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Proposals/GUY/Round 04/Tuberculosis/en/GYA-R04-TB_Proposal_0_en.pdf",
          },
          {
            title: " Proposal HIV - Round 03",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Proposals/GUY/Round 03/HIV/en/GYA-R03-HA_RCCProposal_0_en.pdf",
          },
          {
            title: " Proposal HIV - Round 03",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Proposals/GUY/Round 03/HIV/en/GYA-R03-HA_Proposal_0_en.pdf",
          },
          {
            title: " Proposal Malaria - Round 03",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Proposals/GUY/Round 03/Malaria/en/GYA-R03-ML_Proposal_0_en.pdf",
          },
          {
            title: " Proposal Malaria - Round 03",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Proposals/GUY/Round 03/Malaria/en/GYA-R03-ML_RCCProposal_0_en.pdf",
          },
        ],
      },
    ],
  },
  {
    name: "Haiti",
    count: 13,
    docCategories: [
      {
        name: "Application",
        count: 13,
        docs: [
          {
            title: " Funding Request Multicomponent - 2020",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Funding Requests/HTI/2020/Multicomponent/en/HTI-Z_FundingRequest_1_en.zip",
          },
          {
            title: " Funding Request TB/HIV - 2017",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Funding Requests/HTI/2017/TB_HIV/en/HTI-C_FundingRequest_0_en.zip",
          },
          {
            title: " Funding Request Malaria - 2017",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Funding Requests/HTI/2017/Malaria/en/HTI-M_FundingRequest_0_en.zip",
          },
          {
            title: " Concept Note Malaria - 2015",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Concept Notes/HTI/2015/Malaria/en/HTI-M_ConceptNote_0_en.zip",
          },
          {
            title: " Concept Note TB/HIV - 2015",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Concept Notes/HTI/2015/TB_HIV/en/HTI-C_ConceptNote_0_en.zip",
          },
          {
            title: " Proposal Tuberculosis - Round 09",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Proposals/HTI/Round 09/Tuberculosis/en/HTI-R09-TB_Proposal_0_en.pdf",
          },
          {
            title: " Proposal Malaria - Round 08",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Proposals/HTI/Round 08/Malaria/en/HTI-R08-ML_Proposal_0_en.pdf",
          },
          {
            title: " Proposal HIV - Round 07",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Proposals/HTI/Round 07/HIV/en/HTI-R07-HA_Proposal_0_en.pdf",
          },
          {
            title: " Proposal HIV - Round 05",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Proposals/HTI/Round 05/HIV/en/HTI-R05-HA_Proposal_0_en.pdf",
          },
          {
            title: " Proposal Tuberculosis - Round 03",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Proposals/HTI/Round 03/Tuberculosis/en/HTI-R03-TB_Proposal_0_en.pdf",
          },
          {
            title: " Proposal Malaria - Round 03",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Proposals/HTI/Round 03/Malaria/en/HTI-R03-ML_Proposal_0_en.pdf",
          },
          {
            title: " Proposal HIV - Round 01",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Proposals/HTI/Round 01/HIV/en/HTI-R01-HA_RCCProposal_0_en.pdf",
          },
          {
            title: " Proposal HIV - Round 01",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Proposals/HTI/Round 01/HIV/en/HTI-R01-HA_Proposal_0_en.pdf",
          },
        ],
      },
    ],
  },
  {
    name: "Honduras",
    count: 14,
    docCategories: [
      {
        name: "Application",
        count: 14,
        docs: [
          {
            title: " Funding Request Malaria - 2020",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Funding Requests/HND/2020/Malaria/en/HND-M_FundingRequest_1_en.zip",
          },
          {
            title: " Funding Request Tuberculosis - 2019",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Funding Requests/HND/2019/Tuberculosis/en/HND-T_FundingRequest_0_en.zip",
          },
          {
            title: " Funding Request HIV - 2019",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Funding Requests/HND/2019/HIV/en/HND-H_FundingRequest_0_en.zip",
          },
          {
            title: " Funding Request Malaria - 2017",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Funding Requests/HND/2017/Malaria/en/HND-M_FundingRequest_0_en.zip",
          },
          {
            title: " Concept Note Tuberculosis - 2016",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Concept Notes/HND/2016/Tuberculosis/en/HND-T_ConceptNote_0_en.zip",
          },
          {
            title: " Concept Note HIV - 2015",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Concept Notes/HND/2015/HIV/en/HND-H_ConceptNote_0_en.zip",
          },
          {
            title: " Concept Note Malaria - 2014",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Concept Notes/HND/2014/Malaria/en/HND-M_ConceptNote_0_en.zip",
          },
          {
            title: " Proposal Tuberculosis - Round 10",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Proposals/HND/Round 10/Tuberculosis/en/HND-R10-TB_Proposal_0_en.pdf",
          },
          {
            title: " Proposal HIV - Round 09",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Proposals/HND/Round 09/HIV/en/HND-R09-HA_Proposal_0_en.pdf",
          },
          {
            title: " Proposal Malaria - Round 01",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Proposals/HND/Round 01/Malaria/en/HND-R01-ML_RCCProposal_0_en.pdf",
          },
          {
            title: " Proposal HIV - Round 01",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Proposals/HND/Round 01/HIV/en/HND-R01-HA_RCCProposal_0_en.pdf",
          },
          {
            title: " Proposal Tuberculosis - Round 01",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Proposals/HND/Round 01/Tuberculosis/en/HND-R01-TB_Proposal_0_en.pdf",
          },
          {
            title: " Proposal HIV - Round 01",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Proposals/HND/Round 01/HIV/en/HND-R01-HA_Proposal_0_en.pdf",
          },
          {
            title: " Proposal Malaria - Round 01",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Proposals/HND/Round 01/Malaria/en/HND-R01-ML_Proposal_0_en.pdf",
          },
        ],
      },
    ],
  },
  {
    name: "India",
    count: 21,
    docCategories: [
      {
        name: "Application",
        count: 21,
        docs: [
          {
            title: " Funding Request HIV - 2017",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Funding Requests/IND/2017/HIV/en/IND-H_FundingRequest_0_en.zip",
          },
          {
            title: " Funding Request Tuberculosis - 2017",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Funding Requests/IND/2017/Tuberculosis/en/IND-T_FundingRequest_0_en.zip",
          },
          {
            title: " Funding Request Malaria - 2017",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Funding Requests/IND/2017/Malaria/en/IND-M_FundingRequest_0_en.zip",
          },
          {
            title: " Concept Note Malaria - 2015",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Concept Notes/IND/2015/Malaria/en/IND-M_ConceptNote_0_en.zip",
          },
          {
            title: " Concept Note TB/HIV - 2015",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Concept Notes/IND/2015/TB_HIV/en/IND-C_ConceptNote_0_en.zip",
          },
          {
            title: " Proposal HIV - Round 09",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Proposals/IND/Round 09/HIV/en/IDA-R09-HA_Proposal_0_en.pdf",
          },
          {
            title: " Proposal Malaria - Round 09",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Proposals/IND/Round 09/Malaria/en/IDA-R09-ML_Proposal_0_en.pdf",
          },
          {
            title: " Proposal Tuberculosis - Round 09",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Proposals/IND/Round 09/Tuberculosis/en/IDA-R09-TB_Proposal_0_en.pdf",
          },
          {
            title: " Proposal HIV - Round 07",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Proposals/IND/Round 07/HIV/en/IDA-R07-HA_Proposal_0_en.pdf",
          },
          {
            title: " Proposal Tuberculosis - Round 06",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Proposals/IND/Round 06/Tuberculosis/en/IDA-R06-TB_Proposal_0_en.pdf",
          },
          {
            title: " Proposal HIV - Round 06",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Proposals/IND/Round 06/HIV/en/IDA-R06-HA_Proposal_0_en.pdf",
          },
          {
            title: " Proposal HIV - Round 04",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Proposals/IND/Round 04/HIV/en/IDA-R04-HA_RCCProposal_0_en.pdf",
          },
          {
            title: " Proposal HIV - Round 04",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Proposals/IND/Round 04/HIV/en/IDA-R04-HA_Proposal_0_en.pdf",
          },
          {
            title: " Proposal Malaria - Round 04",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Proposals/IND/Round 04/Malaria/en/IDA-R04-ML_Proposal_0_en.pdf",
          },
          {
            title: " Proposal Tuberculosis - Round 04",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Proposals/IND/Round 04/Tuberculosis/en/IDA-R04-TB_Proposal_0_en.pdf",
          },
          {
            title: " Proposal TB/HIV - Round 03",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Proposals/IND/Round 03/TB_HIV/en/IDA-R03-HT_Proposal_0_en.pdf",
          },
          {
            title: " Proposal HIV - Round 02",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Proposals/IND/Round 02/HIV/en/IDA-R02-HA_RCCProposal_0_en.pdf",
          },
          {
            title: " Proposal Tuberculosis - Round 02",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Proposals/IND/Round 02/Tuberculosis/en/IDA-R02-TB_RCCProposal_0_en.pdf",
          },
          {
            title: " Proposal HIV - Round 02",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Proposals/IND/Round 02/HIV/en/IDA-R02-HA_Proposal_0_en.pdf",
          },
          {
            title: " Proposal Tuberculosis - Round 02",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Proposals/IND/Round 02/Tuberculosis/en/IDA-R02-TB_Proposal_0_en.pdf",
          },
          {
            title: " Proposal Tuberculosis - Round 01",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Proposals/IND/Round 01/Tuberculosis/en/IDA-R01-TB_Proposal_0_en.pdf",
          },
        ],
      },
    ],
  },
  {
    name: "Indonesia",
    count: 18,
    docCategories: [
      {
        name: "Application",
        count: 18,
        docs: [
          {
            title: " Funding Request Tuberculosis - 2020",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Funding Requests/IDN/2020/Tuberculosis/en/IDN-T_FundingRequest_0_en.zip",
          },
          {
            title: " Funding Request Malaria - 2017",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Funding Requests/IDN/2017/Malaria/en/IDN-M_FundingRequest_0_en.zip",
          },
          {
            title: " Funding Request TB/HIV - 2017",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Funding Requests/IDN/2017/TB_HIV/en/IDN-C_FundingRequest_0_en.zip",
          },
          {
            title: " Concept Note TB/HIV - 2015",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Concept Notes/IDN/2015/TB_HIV/en/IDN-C_ConceptNote_0_en.zip",
          },
          {
            title: " Concept Note RSSH - 2015",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Concept Notes/IDN/2015/RSSH/en/IDN-S_ConceptNote_0_en.zip",
          },
          {
            title: " Concept Note Malaria - 2014",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Concept Notes/IDN/2014/Malaria/en/IDN-M_ConceptNote_0_en.zip",
          },
          {
            title: " Proposal Malaria - Transitional Funding Mechanism",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Proposals/IDN/Transitional Funding Mechanism/Malaria/en/IND-TFM-ML_Proposal_0_en.pdf",
          },
          {
            title: " Proposal Tuberculosis - Round 10",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Proposals/IDN/Round 10/Tuberculosis/en/IND-R10-TB_Proposal_0_en.pdf",
          },
          {
            title: " Proposal HIV - Round 09",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Proposals/IDN/Round 09/HIV/en/IND-R09-HA_Proposal_0_en.pdf",
          },
          {
            title: " Proposal Tuberculosis - Round 08",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Proposals/IDN/Round 08/Tuberculosis/en/IND-R08-TB_Proposal_0_en.pdf",
          },
          {
            title: " Proposal HIV - Round 08",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Proposals/IDN/Round 08/HIV/en/IND-R08-HA_Proposal_0_en.pdf",
          },
          {
            title: " Proposal Malaria - Round 08",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Proposals/IDN/Round 08/Malaria/en/IND-R08-ML_Proposal_0_en.pdf",
          },
          {
            title: " Proposal Malaria - Round 06",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Proposals/IDN/Round 06/Malaria/en/IND-R06-ML_Proposal_0_en.pdf",
          },
          {
            title: " Proposal Tuberculosis - Round 05",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Proposals/IDN/Round 05/Tuberculosis/en/IND-R05-TB_Proposal_0_en.pdf",
          },
          {
            title: " Proposal HIV - Round 04",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Proposals/IDN/Round 04/HIV/en/IND-R04-HA_Proposal_0_en.pdf",
          },
          {
            title: " Proposal HIV - Round 01",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Proposals/IDN/Round 01/HIV/en/IND-R01-HA_Proposal_0_en.pdf",
          },
          {
            title: " Proposal Tuberculosis - Round 01",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Proposals/IDN/Round 01/Tuberculosis/en/IND-R01-TB_Proposal_0_en.pdf",
          },
          {
            title: " Proposal Malaria - Round 01",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Proposals/IDN/Round 01/Malaria/en/IND-R01-ML_Proposal_0_en.pdf",
          },
        ],
      },
    ],
  },
  {
    name: "Iran (Islamic Republic)",
    count: 8,
    docCategories: [
      {
        name: "Application",
        count: 8,
        docs: [
          {
            title: " Funding Request HIV - 2020",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Funding Requests/IRN/2020/HIV/en/IRN-H_FundingRequest_3_en.zip",
          },
          {
            title: " Funding Request HIV - 2017",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Funding Requests/IRN/2017/HIV/en/IRN-H_FundingRequest_0_en.zip",
          },
          {
            title: " Concept Note HIV - 2014",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Concept Notes/IRN/2014/HIV/en/IRN-H_ConceptNote_0_en.zip",
          },
          {
            title: " Proposal Malaria - Round 10",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Proposals/IRN/Round 10/Malaria/en/IRN-R10-ML_Proposal_0_en.pdf",
          },
          {
            title: " Proposal HIV - Round 08",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Proposals/IRN/Round 08/HIV/en/IRN-R08-HA_Proposal_0_en.pdf",
          },
          {
            title: " Proposal Tuberculosis - Round 07",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Proposals/IRN/Round 07/Tuberculosis/en/IRN-R07-TB_Proposal_0_en.pdf",
          },
          {
            title: " Proposal Malaria - Round 07",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Proposals/IRN/Round 07/Malaria/en/IRN-R07-ML_Proposal_0_en.pdf",
          },
          {
            title: " Proposal HIV - Round 02",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Proposals/IRN/Round 02/HIV/en/IRN-R02-HA_Proposal_0_en.pdf",
          },
        ],
      },
    ],
  },
  {
    name: "Iraq",
    count: 2,
    docCategories: [
      {
        name: "Application",
        count: 2,
        docs: [
          {
            title: " Proposal Tuberculosis - Round 09",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Proposals/IRQ/Round 09/Tuberculosis/en/IRQ-R09-TB_Proposal_0_en.pdf",
          },
          {
            title: " Proposal Tuberculosis - Round 06",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Proposals/IRQ/Round 06/Tuberculosis/en/IRQ-R06-TB_Proposal_0_en.pdf",
          },
        ],
      },
    ],
  },
  {
    name: "Jamaica",
    count: 5,
    docCategories: [
      {
        name: "Application",
        count: 5,
        docs: [
          {
            title: " Funding Request HIV - 2018",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Funding Requests/JAM/2018/HIV/en/JAM-H_FundingRequest_0_en.zip",
          },
          {
            title: " Concept Note HIV - 2015",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Concept Notes/JAM/2015/HIV/en/JAM-H_ConceptNote_0_en.zip",
          },
          {
            title: " Proposal HIV - Transitional Funding Mechanism",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Proposals/JAM/Transitional Funding Mechanism/HIV/en/JAM-TFM-HA_Proposal_0_en.pdf",
          },
          {
            title: " Proposal HIV - Round 07",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Proposals/JAM/Round 07/HIV/en/JAM-R07-HA_Proposal_0_en.pdf",
          },
          {
            title: " Proposal HIV - Round 03",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Proposals/JAM/Round 03/HIV/en/JAM-R03-HA_Proposal_0_en.pdf",
          },
        ],
      },
    ],
  },
  {
    name: "Jordan",
    count: 4,
    docCategories: [
      {
        name: "Application",
        count: 4,
        docs: [
          {
            title: " Proposal Tuberculosis - Round 10",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Proposals/JOR/Round 10/Tuberculosis/en/JOR-R10-TB_Proposal_0_en.pdf",
          },
          {
            title: " Proposal HIV - Round 06",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Proposals/JOR/Round 06/HIV/en/JOR-R06-HA_Proposal_0_en.pdf",
          },
          {
            title: " Proposal Tuberculosis - Round 05",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Proposals/JOR/Round 05/Tuberculosis/en/JOR-R05-TB_Proposal_0_en.pdf",
          },
          {
            title: " Proposal HIV - Round 02",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Proposals/JOR/Round 02/HIV/en/JOR-R02-HA_Proposal_0_en.pdf",
          },
        ],
      },
    ],
  },
  {
    name: "Kazakhstan",
    count: 9,
    docCategories: [
      {
        name: "Application",
        count: 9,
        docs: [
          {
            title: " Funding Request Tuberculosis - 2019",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Funding Requests/KAZ/2019/Tuberculosis/en/KAZ-T_FundingRequest_0_en.zip",
          },
          {
            title: " Funding Request HIV - 2017",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Funding Requests/KAZ/2017/HIV/en/KAZ-H_FundingRequest_0_en.zip",
          },
          {
            title: " Funding Request Tuberculosis - 2017",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Funding Requests/KAZ/2017/Tuberculosis/en/KAZ-T_FundingRequest_0_en.zip",
          },
          {
            title: " Concept Note Tuberculosis - 2014",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Concept Notes/KAZ/2014/Tuberculosis/en/KAZ-T_ConceptNote_0_en.zip",
          },
          {
            title: " Proposal HIV - Round 10",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Proposals/KAZ/Round 10/HIV/en/KAZ-R10-HA_Proposal_0_en.pdf",
          },
          {
            title: " Proposal Tuberculosis - Round 08",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Proposals/KAZ/Round 08/Tuberculosis/en/KAZ-R08-TB_Proposal_0_en.pdf",
          },
          {
            title: " Proposal HIV - Round 07",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Proposals/KAZ/Round 07/HIV/en/KAZ-R07-HA_Proposal_0_en.pdf",
          },
          {
            title: " Proposal Tuberculosis - Round 06",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Proposals/KAZ/Round 06/Tuberculosis/en/KAZ-R06-TB_Proposal_0_en.pdf",
          },
          {
            title: " Proposal HIV - Round 02",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Proposals/KAZ/Round 02/HIV/en/KAZ-R02-HA_Proposal_0_en.pdf",
          },
        ],
      },
    ],
  },
  {
    name: "Kenya",
    count: 16,
    docCategories: [
      {
        name: "Application",
        count: 16,
        docs: [
          {
            title: " Funding Request Malaria - 2017",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Funding Requests/KEN/2017/Malaria/en/KEN-M_FundingRequest_0_en.zip",
          },
          {
            title: " Funding Request TB/HIV - 2017",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Funding Requests/KEN/2017/TB_HIV/en/KEN-C_FundingRequest_0_en.zip",
          },
          {
            title: " Concept Note TB/HIV - 2015",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Concept Notes/KEN/2015/TB_HIV/en/KEN-TH_ConceptNote_0_en.zip",
          },
          {
            title: " Concept Note Malaria - 2015",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Concept Notes/KEN/2015/Malaria/en/KEN-M_ConceptNote_0_en.zip",
          },
          {
            title: " Proposal Malaria - Round 10",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Proposals/KEN/Round 10/Malaria/en/KEN-R10-ML_Proposal_0_en.pdf",
          },
          {
            title: " Proposal HIV - Round 10",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Proposals/KEN/Round 10/HIV/en/KEN-R10-HA_Proposal_0_en.pdf",
          },
          {
            title: " Proposal Tuberculosis - Round 09",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Proposals/KEN/Round 09/Tuberculosis/en/KEN-R09-TB_Proposal_0_en.pdf",
          },
          {
            title: " Proposal HIV - Round 07",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Proposals/KEN/Round 07/HIV/en/KEN-R07-HA_Proposal_0_en.pdf",
          },
          {
            title: " Proposal Tuberculosis - Round 06",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Proposals/KEN/Round 06/Tuberculosis/en/KEN-R06-TB_Proposal_0_en.pdf",
          },
          {
            title: " Proposal Tuberculosis - Round 05",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Proposals/KEN/Round 05/Tuberculosis/en/KEN-R05-TB_Proposal_0_en.pdf",
          },
          {
            title: " Proposal Malaria - Round 04",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Proposals/KEN/Round 04/Malaria/en/KEN-R04-ML_AMFmApplication_0_en.pdf",
          },
          {
            title: " Proposal Malaria - Round 04",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Proposals/KEN/Round 04/Malaria/en/KEN-R04-ML_Proposal_0_en.pdf",
          },
          {
            title: " Proposal Tuberculosis - Round 02",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Proposals/KEN/Round 02/Tuberculosis/en/KEN-R02-TB_Proposal_0_en.pdf",
          },
          {
            title: " Proposal Malaria - Round 02",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Proposals/KEN/Round 02/Malaria/en/KEN-R02-ML_Proposal_0_en.pdf",
          },
          {
            title: " Proposal HIV - Round 02",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Proposals/KEN/Round 02/HIV/en/KEN-R02-HA_Proposal_0_en.pdf",
          },
          {
            title: " Proposal HIV - Round 01",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Proposals/KEN/Round 01/HIV/en/KEN-R01-HA_Proposal_0_en.pdf",
          },
        ],
      },
    ],
  },
  {
    name: "Korea (Democratic Peoples Republic)",
    count: 6,
    docCategories: [
      {
        name: "Application",
        count: 6,
        docs: [
          {
            title: " Funding Request Tuberculosis - 2017",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Funding Requests/PRK/2017/Tuberculosis/en/PRK-T_FundingRequest_0_en.zip",
          },
          {
            title: " Funding Request Malaria - 2017",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Funding Requests/PRK/2017/Malaria/en/PRK-M_FundingRequest_0_en.zip",
          },
          {
            title: " Concept Note Tuberculosis - 2015",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Concept Notes/PRK/2015/Tuberculosis/en/PRK-T_ConceptNote_0_en.zip",
          },
          {
            title: " Concept Note Malaria - 2014",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Concept Notes/PRK/2014/Malaria/en/PRK-M_ConceptNote_0_en.zip",
          },
          {
            title: " Proposal Malaria - Round 08",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Proposals/PRK/Round 08/Malaria/en/PRK-R08-ML_Proposal_0_en.pdf",
          },
          {
            title: " Proposal Tuberculosis - Round 08",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Proposals/PRK/Round 08/Tuberculosis/en/PRK-R08-TB_Proposal_0_en.pdf",
          },
        ],
      },
    ],
  },
  {
    name: "Kosovo",
    count: 7,
    docCategories: [
      {
        name: "Application",
        count: 7,
        docs: [
          {
            title: " Funding Request Tuberculosis - 2018",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Funding Requests/QNA/2018/Tuberculosis/en/QNA-T_FundingRequest_0_en.zip",
          },
          {
            title: " Funding Request HIV - 2017",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Funding Requests/QNA/2017/HIV/en/QNA-H_FundingRequest_0_en.zip",
          },
          {
            title: " Concept Note Tuberculosis - 2015",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Concept Notes/QNA/2015/Tuberculosis/en/QNA-T_ConceptNote_0_en.zip",
          },
          {
            title: " Concept Note HIV - 2015",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Concept Notes/QNA/2015/HIV/en/QNA-H_ConceptNote_0_en.zip",
          },
          {
            title: " Proposal Tuberculosis - Round 09",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Proposals/QNA/Round 09/Tuberculosis/en/KOS-R09-TB_Proposal_0_en.pdf",
          },
          {
            title: " Proposal HIV - Round 07",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Proposals/QNA/Round 07/HIV/en/KOS-R07-HA_Proposal_0_en.pdf",
          },
          {
            title: " Proposal Tuberculosis - Round 04",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Proposals/QNA/Round 04/Tuberculosis/en/KOS-R04-TB_Proposal_0_en.pdf",
          },
        ],
      },
    ],
  },
  {
    name: "Kyrgyzstan",
    count: 11,
    docCategories: [
      {
        name: "Application",
        count: 11,
        docs: [
          {
            title: " Funding Request TB/HIV - 2017",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Funding Requests/KGZ/2017/TB_HIV/en/KGZ-C_FundingRequest_0_en.zip",
          },
          {
            title: " Concept Note TB/HIV - 2015",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Concept Notes/KGZ/2015/TB_HIV/en/KGZ-C_ConceptNote_0_en.zip",
          },
          {
            title: " Proposal HIV - Round 10",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Proposals/KGZ/Round 10/HIV/en/KGZ-R10-HA_Proposal_0_en.pdf",
          },
          {
            title: " Proposal Tuberculosis - Round 09",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Proposals/KGZ/Round 09/Tuberculosis/en/KGZ-R09-TB_Proposal_0_en.pdf",
          },
          {
            title: " Proposal Malaria - Round 08",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Proposals/KGZ/Round 08/Malaria/en/KGZ-R08-ML_Proposal_0_en.pdf",
          },
          {
            title: " Proposal HIV - Round 07",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Proposals/KGZ/Round 07/HIV/en/KGZ-R07-HA_Proposal_0_en.pdf",
          },
          {
            title: " Proposal HIV - Round 07",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Proposals/KGZ/Round 07/HIV/ru/KGZ-R07-HA_Proposal_0_ru.pdf",
          },
          {
            title: " Proposal Tuberculosis - Round 06",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Proposals/KGZ/Round 06/Tuberculosis/en/KGZ-R06-TB_Proposal_0_en.pdf",
          },
          {
            title: " Proposal Malaria - Round 05",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Proposals/KGZ/Round 05/Malaria/en/KGZ-R05-ML_Proposal_0_en.pdf",
          },
          {
            title: " Proposal HIV - Round 02",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Proposals/KGZ/Round 02/HIV/en/KGZ-R02-HA_Proposal_0_en.pdf",
          },
          {
            title: " Proposal Tuberculosis - Round 02",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Proposals/KGZ/Round 02/Tuberculosis/en/KGZ-R02-TB_Proposal_0_en.pdf",
          },
        ],
      },
    ],
  },
  {
    name: "Lao (Peoples Democratic Republic)",
    count: 21,
    docCategories: [
      {
        name: "Application",
        count: 21,
        docs: [
          {
            title: " Funding Request TB/HIV - 2020",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Funding Requests/LAO/2020/TB_HIV/en/LAO-C_FundingRequest_1_en.zip",
          },
          {
            title: " Funding Request HIV - 2017",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Funding Requests/LAO/2017/HIV/en/LAO-H_FundingRequest_0_en.zip",
          },
          {
            title: " Funding Request Tuberculosis - 2017",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Funding Requests/LAO/2017/Tuberculosis/en/LAO-T_FundingRequest_0_en.zip",
          },
          {
            title: " Concept Note HIV - 2015",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Concept Notes/LAO/2015/HIV/en/LAO-H_ConceptNote_0_en.zip",
          },
          {
            title: " Concept Note RSSH - 2015",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Concept Notes/LAO/2015/RSSH/en/LAO-S_ConceptNote_0_en.zip",
          },
          {
            title: " Concept Note Malaria - 2015",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Concept Notes/LAO/2015/Malaria/en/LAO-M_ConceptNote_0_en.zip",
          },
          {
            title: " Concept Note Tuberculosis - 2014",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Concept Notes/LAO/2014/Tuberculosis/en/LAO-T_ConceptNote_0_en.zip",
          },
          {
            title: " Proposal Malaria - Transitional Funding Mechanism",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Proposals/LAO/Transitional Funding Mechanism/Malaria/en/LAO-TFM-ML_Proposal_0_en.pdf",
          },
          {
            title: " Proposal Tuberculosis - Round 10",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Proposals/LAO/Round 10/Tuberculosis/en/LAO-R10-TB_Proposal_0_en.pdf",
          },
          {
            title: " Proposal HIV - Round 08",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Proposals/LAO/Round 08/HIV/en/LAO-R08-HA_Proposal_0_en.pdf",
          },
          {
            title: " Proposal Tuberculosis - Round 07",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Proposals/LAO/Round 07/Tuberculosis/en/LAO-R07-TB_Proposal_0_en.pdf",
          },
          {
            title: " Proposal Malaria - Round 07",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Proposals/LAO/Round 07/Malaria/en/LAO-R07-ML_Proposal_0_en.pdf",
          },
          {
            title: " Proposal HIV - Round 06",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Proposals/LAO/Round 06/HIV/en/LAO-R06-HA_Proposal_0_en.pdf",
          },
          {
            title: " Proposal Malaria - Round 06",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Proposals/LAO/Round 06/Malaria/en/LAO-R06-ML_Proposal_0_en.pdf",
          },
          {
            title: " Proposal HIV - Round 04",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Proposals/LAO/Round 04/HIV/en/LAO-R04-HA_Proposal_0_en.pdf",
          },
          {
            title: " Proposal HIV - Round 04",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Proposals/LAO/Round 04/HIV/en/LAO-R04-HA_RCCProposal_0_en.pdf",
          },
          {
            title: " Proposal Malaria - Round 04",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Proposals/LAO/Round 04/Malaria/en/LAO-R04-ML_Proposal_0_en.pdf",
          },
          {
            title: " Proposal Tuberculosis - Round 04",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Proposals/LAO/Round 04/Tuberculosis/en/LAO-R04-TB_Proposal_0_en.pdf",
          },
          {
            title: " Proposal Tuberculosis - Round 02",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Proposals/LAO/Round 02/Tuberculosis/en/LAO-R02-TB_Proposal_0_en.pdf",
          },
          {
            title: " Proposal HIV - Round 01",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Proposals/LAO/Round 01/HIV/en/LAO-R01-HA_Proposal_0_en.pdf",
          },
          {
            title: " Proposal Malaria - Round 01",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Proposals/LAO/Round 01/Malaria/en/LAO-R01-ML_Proposal_0_en.pdf",
          },
        ],
      },
    ],
  },
  {
    name: "Lesotho",
    count: 10,
    docCategories: [
      {
        name: "Application",
        count: 10,
        docs: [
          {
            title: " Funding Request TB/HIV - 2017",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Funding Requests/LSO/2017/TB_HIV/en/LSO-C_FundingRequest_0_en.zip",
          },
          {
            title: " Concept Note TB/HIV - 2015",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Concept Notes/LSO/2015/TB_HIV/en/LSO-C_ConceptNote_0_en.zip",
          },
          {
            title: " Proposal HIV - Round 09",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Proposals/LSO/Round 09/HIV/en/LSO-R09-HA_Proposal_0_en.pdf",
          },
          {
            title: " Proposal Tuberculosis - Round 08",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Proposals/LSO/Round 08/Tuberculosis/en/LSO-R08-TB_Proposal_0_en.pdf",
          },
          {
            title: " Proposal HIV - Round 08",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Proposals/LSO/Round 08/HIV/en/LSO-R08-HA_Proposal_0_en.pdf",
          },
          {
            title: " Proposal HIV - Round 07",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Proposals/LSO/Round 07/HIV/en/LSO-R07-HA_Proposal_0_en.pdf",
          },
          {
            title: " Proposal Tuberculosis - Round 06",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Proposals/LSO/Round 06/Tuberculosis/en/LSO-R06-TB_Proposal_0_en.pdf",
          },
          {
            title: " Proposal HIV - Round 05",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Proposals/LSO/Round 05/HIV/en/LSO-R05-HA_Proposal_0_en.pdf",
          },
          {
            title: " Proposal HIV - Round 02",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Proposals/LSO/Round 02/HIV/en/LSO-R02-HA_Proposal_0_en.pdf",
          },
          {
            title: " Proposal Tuberculosis - Round 02",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Proposals/LSO/Round 02/Tuberculosis/en/LSO-R02-TB_Proposal_0_en.pdf",
          },
        ],
      },
    ],
  },
  {
    name: "Liberia",
    count: 13,
    docCategories: [
      {
        name: "Application",
        count: 13,
        docs: [
          {
            title: " Funding Request Malaria - 2017",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Funding Requests/LBR/2017/Malaria/en/LBR-M_FundingRequest_0_en.zip",
          },
          {
            title: " Funding Request TB/HIV - 2017",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Funding Requests/LBR/2017/TB_HIV/en/LBR-C_FundingRequest_0_en.zip",
          },
          {
            title: " Concept Note TB/HIV - 2016",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Concept Notes/LBR/2016/TB_HIV/en/LBR-C_ConceptNote_0_en.zip",
          },
          {
            title: " Concept Note Malaria - 2016",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Concept Notes/LBR/2016/Malaria/en/LBR-M_ConceptNote_0_en.zip",
          },
          {
            title: " Proposal Tuberculosis - Round 10",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Proposals/LBR/Round 10/Tuberculosis/en/LBR-R10-TB_Proposal_0_en.pdf",
          },
          {
            title: " Proposal Malaria - Round 10",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Proposals/LBR/Round 10/Malaria/en/LBR-R10-ML_Proposal_0_en.pdf",
          },
          {
            title: " Proposal HIV - Round 08",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Proposals/LBR/Round 08/HIV/en/LBR-R08-HA_Proposal_0_en.pdf",
          },
          {
            title: " Proposal Tuberculosis - Round 07",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Proposals/LBR/Round 07/Tuberculosis/en/LBR-R07-TB_Proposal_0_en.pdf",
          },
          {
            title: " Proposal Malaria - Round 07",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Proposals/LBR/Round 07/Malaria/en/LBR-R07-ML_Proposal_0_en.pdf",
          },
          {
            title: " Proposal HIV - Round 06",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Proposals/LBR/Round 06/HIV/en/LBR-R06-HA_Proposal_0_en.pdf",
          },
          {
            title: " Proposal Malaria - Round 03",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Proposals/LBR/Round 03/Malaria/en/LBR-R03-ML_Proposal_0_en.pdf",
          },
          {
            title: " Proposal Tuberculosis - Round 02",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Proposals/LBR/Round 02/Tuberculosis/en/LBR-R02-TB_Proposal_0_en.pdf",
          },
          {
            title: " Proposal HIV - Round 02",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Proposals/LBR/Round 02/HIV/en/LBR-R02-HA_Proposal_0_en.pdf",
          },
        ],
      },
    ],
  },
  {
    name: "Madagascar",
    count: 20,
    docCategories: [
      {
        name: "Application",
        count: 20,
        docs: [
          {
            title: " Funding Request Tuberculosis - 2017",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Funding Requests/MDG/2017/Tuberculosis/fr/MDG-T_FundingRequest_0_fr.zip",
          },
          {
            title: " Funding Request HIV - 2017",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Funding Requests/MDG/2017/HIV/fr/MDG-H_FundingRequest_0_fr.zip",
          },
          {
            title: " Funding Request Malaria - 2017",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Funding Requests/MDG/2017/Malaria/en/MDG-M_FundingRequest_0_en.zip",
          },
          {
            title: " Concept Note Tuberculosis - 2015",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Concept Notes/MDG/2015/Tuberculosis/en/MDG-T_ConceptNote_0_en.zip",
          },
          {
            title: " Concept Note Malaria - 2015",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Concept Notes/MDG/2015/Malaria/en/MDG-M_ConceptNote_0_en.zip",
          },
          {
            title: " Concept Note HIV - 2015",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Concept Notes/MDG/2015/HIV/en/MDG-H_ConceptNote_0_en.zip",
          },
          {
            title: " Proposal Malaria - Round 09",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Proposals/MDG/Round 09/Malaria/en/MDG-R09-ML_Proposal_0_en.pdf",
          },
          {
            title: " Proposal Tuberculosis - Round 08",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Proposals/MDG/Round 08/Tuberculosis/en/MDG-R08-TB_Proposal_0_en.pdf",
          },
          {
            title: " Proposal HIV - Round 08",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Proposals/MDG/Round 08/HIV/en/MDG-R08-HA_Proposal_0_en.pdf",
          },
          {
            title: " Proposal Malaria - Round 07",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Proposals/MDG/Round 07/Malaria/en/MDG-R07-ML_Proposal_0_en.pdf",
          },
          {
            title: " Proposal Malaria - Round 07",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Proposals/MDG/Round 07/Malaria/en/MDG-R07-ML_AMFmApplication_0_en.pdf",
          },
          {
            title: " Proposal Tuberculosis - Round 04",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Proposals/MDG/Round 04/Tuberculosis/fr/MDG-R04-TB_Proposal_0_fr.pdf",
          },
          {
            title: " Proposal Malaria - Round 04",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Proposals/MDG/Round 04/Malaria/en/MDG-R04-ML_RCCProposal_0_en.pdf",
          },
          {
            title: " Proposal Tuberculosis - Round 04",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Proposals/MDG/Round 04/Tuberculosis/en/MDG-R04-TB_Proposal_0_en.pdf",
          },
          {
            title: " Proposal Malaria - Round 04",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Proposals/MDG/Round 04/Malaria/en/MDG-R04-ML_Proposal_0_en.pdf",
          },
          {
            title: " Proposal Malaria - Round 03",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Proposals/MDG/Round 03/Malaria/en/MDG-R03-ML_Proposal_0_en.pdf",
          },
          {
            title: " Proposal HIV - Round 03",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Proposals/MDG/Round 03/HIV/en/MDG-R03-HA_Proposal_0_en.pdf",
          },
          {
            title: " Proposal HIV - Round 03",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Proposals/MDG/Round 03/HIV/fr/MDG-R03-HA_Proposal_0_fr.pdf",
          },
          {
            title: " Proposal HIV - Round 02",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Proposals/MDG/Round 02/HIV/en/MDG-R02-HA_Proposal_0_en.pdf",
          },
          {
            title: " Proposal Malaria - Round 01",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Proposals/MDG/Round 01/Malaria/en/MDG-R01-ML_Proposal_0_en.pdf",
          },
        ],
      },
    ],
  },
  {
    name: "Malawi",
    count: 15,
    docCategories: [
      {
        name: "Application",
        count: 15,
        docs: [
          {
            title: " Funding Request TB/HIV - 2020",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Funding Requests/MWI/2020/TB_HIV/en/MWI-C_FundingRequest_1_en.zip",
          },
          {
            title: " Funding Request Malaria - 2020",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Funding Requests/MWI/2020/Malaria/en/MWI-M_FundingRequest_1_en.zip",
          },
          {
            title: " Funding Request Malaria - 2017",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Funding Requests/MWI/2017/Malaria/en/MWI-M_FundingRequest_0_en.zip",
          },
          {
            title: " Funding Request TB/HIV - 2017",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Funding Requests/MWI/2017/TB_HIV/en/MWI-C_FundingRequest_0_en.zip",
          },
          {
            title: " Concept Note Malaria - 2015",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Concept Notes/MWI/2015/Malaria/en/MWI-M_ConceptNote_0_en.zip",
          },
          {
            title: " Concept Note TB/HIV - 2015",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Concept Notes/MWI/2015/TB_HIV/en/MWI-C_ConceptNote_0_en.zip",
          },
          {
            title: " Proposal Tuberculosis - Transitional Funding Mechanism",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Proposals/MWI/Transitional Funding Mechanism/Tuberculosis/en/MLW-TFM-TB_Proposal_0_en.pdf",
          },
          {
            title: " Proposal Malaria - Round 09",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Proposals/MWI/Round 09/Malaria/en/MLW-R09-ML_Proposal_0_en.pdf",
          },
          {
            title: " Proposal Malaria - Round 07",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Proposals/MWI/Round 07/Malaria/en/MLW-R07-ML_Proposal_0_en.pdf",
          },
          {
            title: " Proposal HIV - Round 07",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Proposals/MWI/Round 07/HIV/en/MLW-R07-HA_Proposal_0_en.pdf",
          },
          {
            title: " Proposal Tuberculosis - Round 07",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Proposals/MWI/Round 07/Tuberculosis/en/MLW-R07-TB_Proposal_0_en.pdf",
          },
          {
            title: " Proposal HIV - Round 05",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Proposals/MWI/Round 05/HIV/en/MLW-R05-HA_Proposal_0_en.pdf",
          },
          {
            title: " Proposal Malaria - Round 02",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Proposals/MWI/Round 02/Malaria/en/MLW-R02-ML_Proposal_0_en.pdf",
          },
          {
            title: " Proposal HIV - Round 01",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Proposals/MWI/Round 01/HIV/en/MLW-R01-HA_RCCProposal_0_en.pdf",
          },
          {
            title: " Proposal HIV - Round 01",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Proposals/MWI/Round 01/HIV/en/MLW-R01-HA_Proposal_0_en.pdf",
          },
        ],
      },
    ],
  },
  {
    name: "Malaysia",
    count: 3,
    docCategories: [
      {
        name: "Application",
        count: 3,
        docs: [
          {
            title: " Funding Request HIV - 2018",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Funding Requests/MYS/2018/HIV/en/MYS-H_FundingRequest_0_en.zip",
          },
          {
            title: " Concept Note HIV - 2016",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Concept Notes/MYS/2016/HIV/en/MYS-H_ConceptNote_0_en.zip",
          },
          {
            title: " Proposal HIV - Round 10",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Proposals/MYS/Round 10/HIV/en/MYS-R10-HA_Proposal_0_en.pdf",
          },
        ],
      },
    ],
  },
  {
    name: "Maldives",
    count: 1,
    docCategories: [
      {
        name: "Application",
        count: 1,
        docs: [
          {
            title: " Proposal HIV - Round 06",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Proposals/MDV/Round 06/HIV/en/MDV-R06-HA_Proposal_0_en.pdf",
          },
        ],
      },
    ],
  },
  {
    name: "Mali",
    count: 15,
    docCategories: [
      {
        name: "Application",
        count: 15,
        docs: [
          {
            title: " Funding Request Malaria - 2018",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Funding Requests/MLI/2018/Malaria/en/MLI-M_FundingRequest_0_en.zip",
          },
          {
            title: " Funding Request TB/HIV - 2017",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Funding Requests/MLI/2017/TB_HIV/en/MLI-C_FundingRequest_0_en.zip",
          },
          {
            title: " Concept Note TB/HIV - 2015",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Concept Notes/MLI/2015/TB_HIV/en/MLI-C_ConceptNote_0_en.zip",
          },
          {
            title: " Concept Note Malaria - 2015",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Concept Notes/MLI/2015/Malaria/en/MLI-M_ConceptNote_0_en.zip",
          },
          {
            title: " Proposal Tuberculosis - Round 10",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Proposals/MLI/Round 10/Tuberculosis/en/MAL-R10-TB_Proposal_0_en.pdf",
          },
          {
            title: " Proposal Malaria - Round 10",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Proposals/MLI/Round 10/Malaria/en/MAL-R10-ML_Proposal_0_en.pdf",
          },
          {
            title: " Proposal HIV - Round 08",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Proposals/MLI/Round 08/HIV/en/MAL-R08-HA_Proposal_0_en.pdf",
          },
          {
            title: " Proposal Tuberculosis - Round 07",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Proposals/MLI/Round 07/Tuberculosis/en/MAL-R07-TB_Proposal_0_en.pdf",
          },
          {
            title: " Proposal Tuberculosis - Round 07",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Proposals/MLI/Round 07/Tuberculosis/fr/MAL-R07-TB_Proposal_0_fr.pdf",
          },
          {
            title: " Proposal Malaria - Round 06",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Proposals/MLI/Round 06/Malaria/en/MAL-R06-ML_Proposal_0_en.pdf",
          },
          {
            title: " Proposal Tuberculosis - Round 04",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Proposals/MLI/Round 04/Tuberculosis/en/MAL-R04-TB_Proposal_0_en.pdf",
          },
          {
            title: " Proposal HIV - Round 04",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Proposals/MLI/Round 04/HIV/fr/MAL-R04-HA_Proposal_0_fr.pdf",
          },
          {
            title: " Proposal HIV - Round 04",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Proposals/MLI/Round 04/HIV/en/MAL-R04-HA_Proposal_0_en.pdf",
          },
          {
            title: " Proposal Tuberculosis - Round 04",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Proposals/MLI/Round 04/Tuberculosis/fr/MAL-R04-TB_Proposal_0_fr.pdf",
          },
          {
            title: " Proposal Malaria - Round 01",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Proposals/MLI/Round 01/Malaria/en/MAL-R01-ML_Proposal_0_en.pdf",
          },
        ],
      },
    ],
  },
  {
    name: "Mauritania",
    count: 15,
    docCategories: [
      {
        name: "Application",
        count: 15,
        docs: [
          {
            title: " Funding Request Malaria - 2018",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Funding Requests/MRT/2018/Malaria/en/MRT-M_FundingRequest_0_en.zip",
          },
          {
            title: " Funding Request HIV - 2018",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Funding Requests/MRT/2018/HIV/en/MRT-H_FundingRequest_0_en.zip",
          },
          {
            title: " Funding Request Tuberculosis - 2018",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Funding Requests/MRT/2018/Tuberculosis/en/MRT-T_FundingRequest_0_en.zip",
          },
          {
            title: " Concept Note Tuberculosis - 2015",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Concept Notes/MRT/2015/Tuberculosis/en/MRT-T_ConceptNote_0_en.zip",
          },
          {
            title: " Concept Note HIV - 2015",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Concept Notes/MRT/2015/HIV/en/MRT-H_ConceptNote_0_en.zip",
          },
          {
            title: " Concept Note Malaria - 2015",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Concept Notes/MRT/2015/Malaria/en/MRT-M_ConceptNote_0_en.zip",
          },
          {
            title: " Proposal HIV - Transitional Funding Mechanism",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Proposals/MRT/Transitional Funding Mechanism/HIV/en/MRT-TFM-HA_Proposal_0_en.pdf",
          },
          {
            title: " Proposal HIV - Round 08",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Proposals/MRT/Round 08/HIV/en/MRT-R08-HA_Proposal_0_en.pdf",
          },
          {
            title: " Proposal Malaria - Round 06",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Proposals/MRT/Round 06/Malaria/en/MRT-R06-ML_Proposal_0_en.pdf",
          },
          {
            title: " Proposal Tuberculosis - Round 06",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Proposals/MRT/Round 06/Tuberculosis/en/MRT-R06-TB_Proposal_0_en.pdf",
          },
          {
            title: " Proposal HIV - Round 05",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Proposals/MRT/Round 05/HIV/en/MRT-R05-HA_Proposal_0_en.pdf",
          },
          {
            title: " Proposal Malaria - Round 02",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Proposals/MRT/Round 02/Malaria/fr/MRT-R02-ML_Proposal_0_fr.pdf",
          },
          {
            title: " Proposal Tuberculosis - Round 02",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Proposals/MRT/Round 02/Tuberculosis/en/MRT-R02-TB_Proposal_0_en.pdf",
          },
          {
            title: " Proposal Tuberculosis - Round 02",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Proposals/MRT/Round 02/Tuberculosis/fr/MRT-R02-TB_Proposal_0_fr.pdf",
          },
          {
            title: " Proposal Malaria - Round 02",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Proposals/MRT/Round 02/Malaria/en/MRT-R02-ML_Proposal_0_en.pdf",
          },
        ],
      },
    ],
  },
  {
    name: "Mauritius",
    count: 4,
    docCategories: [
      {
        name: "Application",
        count: 4,
        docs: [
          {
            title: " Funding Request HIV - 2020",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Funding Requests/MUS/2020/HIV/en/MUS-H_FundingRequest_0_en.zip",
          },
          {
            title: " Funding Request HIV - 2017",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Funding Requests/MUS/2017/HIV/en/MUS-H_FundingRequest_0_en.zip",
          },
          {
            title: " Concept Note HIV - 2014",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Concept Notes/MUS/2014/HIV/en/MUS-H_ConceptNote_0_en.zip",
          },
          {
            title: " Proposal HIV - Round 08",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Proposals/MUS/Round 08/HIV/en/MVS-R08-HA_Proposal_0_en.pdf",
          },
        ],
      },
    ],
  },
  {
    name: "Mexico",
    count: 1,
    docCategories: [
      {
        name: "Application",
        count: 1,
        docs: [
          {
            title: " Proposal HIV - Round 09",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Proposals/MEX/Round 09/HIV/en/MEX-R09-HA_Proposal_0_en.pdf",
          },
        ],
      },
    ],
  },
  {
    name: "Moldova",
    count: 11,
    docCategories: [
      {
        name: "Application",
        count: 11,
        docs: [
          {
            title: " Funding Request Tuberculosis - 2017",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Funding Requests/MDA/2017/Tuberculosis/en/MDA-T_FundingRequest_0_en.zip",
          },
          {
            title: " Funding Request HIV - 2017",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Funding Requests/MDA/2017/HIV/en/MDA-H_FundingRequest_0_en.zip",
          },
          {
            title: " Concept Note Tuberculosis - 2014",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Concept Notes/MDA/2014/Tuberculosis/en/MDA-T_ConceptNote_0_en.zip",
          },
          {
            title: " Concept Note HIV - 2014",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Concept Notes/MDA/2014/HIV/en/MDA-H_ConceptNote_0_en.zip",
          },
          {
            title: " Proposal Tuberculosis - Round 09",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Proposals/MDA/Round 09/Tuberculosis/en/MOL-R09-TB_Proposal_0_en.pdf",
          },
          {
            title: " Proposal HIV - Round 08",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Proposals/MDA/Round 08/HIV/en/MOL-R08-HA_Proposal_0_en.pdf",
          },
          {
            title: " Proposal Tuberculosis - Round 08",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Proposals/MDA/Round 08/Tuberculosis/en/MOL-R08-TB_Proposal_0_en.pdf",
          },
          {
            title: " Proposal Tuberculosis - Round 06",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Proposals/MDA/Round 06/Tuberculosis/en/MOL-R06-TB_Proposal_0_en.pdf",
          },
          {
            title: " Proposal HIV - Round 06",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Proposals/MDA/Round 06/HIV/en/MOL-R06-HA_Proposal_0_en.pdf",
          },
          {
            title: " Proposal TB/HIV - Round 01",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Proposals/MDA/Round 01/TB_HIV/en/MOL-R01-HT_Proposal_0_en.pdf",
          },
          {
            title: " Proposal Tuberculosis - Round 01",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Proposals/MDA/Round 01/Tuberculosis/en/MOL-R01-TB_Proposal_0_en.pdf",
          },
        ],
      },
    ],
  },
  {
    name: "Mongolia",
    count: 15,
    docCategories: [
      {
        name: "Application",
        count: 15,
        docs: [
          {
            title: " Funding Request TB/HIV - 2020",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Funding Requests/MNG/2020/TB_HIV/en/MNG-C_FundingRequest_1_en.zip",
          },
          {
            title: " Funding Request HIV - 2017",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Funding Requests/MNG/2017/HIV/en/MNG-H_FundingRequest_0_en.zip",
          },
          {
            title: " Funding Request Tuberculosis - 2017",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Funding Requests/MNG/2017/Tuberculosis/en/MNG-T_FundingRequest_0_en.zip",
          },
          {
            title: " Concept Note Tuberculosis - 2015",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Concept Notes/MNG/2015/Tuberculosis/en/MNG-T_ConceptNote_0_en.zip",
          },
          {
            title: " Concept Note HIV - 2014",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Concept Notes/MNG/2014/HIV/en/MNG-H_ConceptNote_0_en.zip",
          },
          {
            title: " Proposal Tuberculosis - Round 10",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Proposals/MNG/Round 10/Tuberculosis/en/MON-R10-TB_Proposal_0_en.pdf",
          },
          {
            title: " Proposal HIV - Round 09",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Proposals/MNG/Round 09/HIV/en/MON-R09-HA_Proposal_0_en.pdf",
          },
          {
            title: " Proposal HIV - Round 07",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Proposals/MNG/Round 07/HIV/en/MON-R07-HA_Proposal_0_en.pdf",
          },
          {
            title: " Proposal HIV - Round 05",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Proposals/MNG/Round 05/HIV/en/MON-R05-HA_Proposal_0_en.pdf",
          },
          {
            title: " Proposal Tuberculosis - Round 04",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Proposals/MNG/Round 04/Tuberculosis/en/MON-R04-TB_RCCProposal_0_en.pdf",
          },
          {
            title: " Proposal Tuberculosis - Round 04",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Proposals/MNG/Round 04/Tuberculosis/en/MON-R04-TB_Proposal_0_en.pdf",
          },
          {
            title: " Proposal HIV - Round 02",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Proposals/MNG/Round 02/HIV/en/MON-R02-HA_RCCProposal_0_en.pdf",
          },
          {
            title: " Proposal HIV - Round 02",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Proposals/MNG/Round 02/HIV/en/MON-R02-HA_Proposal_0_en.pdf",
          },
          {
            title: " Proposal Tuberculosis - Round 01",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Proposals/MNG/Round 01/Tuberculosis/en/MON-R01-TB_RCCProposal_0_en.pdf",
          },
          {
            title: " Proposal Tuberculosis - Round 01",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Proposals/MNG/Round 01/Tuberculosis/en/MON-R01-TB_Proposal_0_en.pdf",
          },
        ],
      },
    ],
  },
  {
    name: "Montenegro",
    count: 4,
    docCategories: [
      {
        name: "Application",
        count: 4,
        docs: [
          {
            title: " Funding Request HIV - 2018",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Funding Requests/MNE/2018/HIV/en/MNE-H_FundingRequest_0_en.zip",
          },
          {
            title: " Proposal HIV - Round 09",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Proposals/MNE/Round 09/HIV/en/MNT-R09-HA_Proposal_0_en.pdf",
          },
          {
            title: " Proposal Tuberculosis - Round 06",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Proposals/MNE/Round 06/Tuberculosis/en/MNT-R06-TB_Proposal_0_en.pdf",
          },
          {
            title: " Proposal HIV - Round 05",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Proposals/MNE/Round 05/HIV/en/MNT-R05-HA_Proposal_0_en.pdf",
          },
        ],
      },
    ],
  },
  {
    name: "Morocco",
    count: 2,
    docCategories: [
      {
        name: "Application",
        count: 2,
        docs: [
          {
            title: " Funding Request HIV - 2017",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Funding Requests/MAR/2017/HIV/en/MAR-H_FundingRequest_0_en.zip",
          },
          {
            title: " Funding Request Tuberculosis - 2017",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Funding Requests/MAR/2017/Tuberculosis/en/MAR-T_FundingRequest_0_en.zip",
          },
        ],
      },
    ],
  },
  {
    name: "Mozambique",
    count: 16,
    docCategories: [
      {
        name: "Application",
        count: 16,
        docs: [
          {
            title: " Funding Request Malaria - 2020",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Funding Requests/MOZ/2020/Malaria/en/MOZ-M_FundingRequest_0_en.zip",
          },
          {
            title: " Funding Request TB/HIV - 2020",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Funding Requests/MOZ/2020/TB_HIV/en/MOZ-C_FundingRequest_0_en.zip",
          },
          {
            title: " Funding Request TB/HIV - 2017",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Funding Requests/MOZ/2017/TB_HIV/en/MOZ-C_FundingRequest_0_en.zip",
          },
          {
            title: " Funding Request Malaria - 2017",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Funding Requests/MOZ/2017/Malaria/en/MOZ-M_FundingRequest_0_en.zip",
          },
          {
            title: " Concept Note TB/HIV - 2014",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Concept Notes/MOZ/2014/TB_HIV/en/MOZ-TH_ConceptNote_0_en.zip",
          },
          {
            title: " Concept Note Malaria - 2014",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Concept Notes/MOZ/2014/Malaria/en/MOZ-M_ConceptNote_0_en.zip",
          },
          {
            title: " Proposal Tuberculosis - Transitional Funding Mechanism",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Proposals/MOZ/Transitional Funding Mechanism/Tuberculosis/en/MOZ-TFM-TB_Proposal_0_en.pdf",
          },
          {
            title: " Proposal Malaria - Round 09",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Proposals/MOZ/Round 09/Malaria/en/MOZ-R09-ML_Proposal_0_en.pdf",
          },
          {
            title: " Proposal HIV - Round 09",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Proposals/MOZ/Round 09/HIV/en/MOZ-R09-HA_Proposal_0_en.pdf",
          },
          {
            title: " Proposal HIV - Round 08",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Proposals/MOZ/Round 08/HIV/en/MOZ-R08-HA_Proposal_0_en.pdf",
          },
          {
            title: " Proposal Tuberculosis - Round 07",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Proposals/MOZ/Round 07/Tuberculosis/en/MOZ-R07-TB_Proposal_0_en.pdf",
          },
          {
            title: " Proposal HIV - Round 06",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Proposals/MOZ/Round 06/HIV/en/MOZ-R06-HA_Proposal_0_en.pdf",
          },
          {
            title: " Proposal Malaria - Round 06",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Proposals/MOZ/Round 06/Malaria/en/MOZ-R06-ML_Proposal_0_en.pdf",
          },
          {
            title: " Proposal Malaria - Round 02",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Proposals/MOZ/Round 02/Malaria/en/MOZ-R02-ML_Proposal_0_en.pdf",
          },
          {
            title: " Proposal HIV - Round 02",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Proposals/MOZ/Round 02/HIV/en/MOZ-R02-HA_Proposal_0_en.pdf",
          },
          {
            title: " Proposal Tuberculosis - Round 02",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Proposals/MOZ/Round 02/Tuberculosis/en/MOZ-R02-TB_Proposal_0_en.pdf",
          },
        ],
      },
    ],
  },
  {
    name: "Myanmar",
    count: 11,
    docCategories: [
      {
        name: "Application",
        count: 11,
        docs: [
          {
            title: " Funding Request TB/HIV - 2020",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Funding Requests/MMR/2020/TB_HIV/en/MMR-C_FundingRequest_0_en.zip",
          },
          {
            title: " Funding Request TB/HIV - 2017",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Funding Requests/MMR/2017/TB_HIV/en/MMR-C_FundingRequest_0_en.zip",
          },
          {
            title: " Concept Note HIV - 2013",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Concept Notes/MMR/2013/HIV/en/MMR-H_ConceptNote_0_en.zip",
          },
          {
            title: " Concept Note Malaria - 2013",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Concept Notes/MMR/2013/Malaria/en/MMR-M_ConceptNote_0_en.zip",
          },
          {
            title: " Concept Note Tuberculosis - 2013",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Concept Notes/MMR/2013/Tuberculosis/en/MMR-T_ConceptNote_0_en.zip",
          },
          {
            title: " Proposal Malaria - Round 09",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Proposals/MMR/Round 09/Malaria/en/MYN-R09-ML_Proposal_0_en.pdf",
          },
          {
            title: " Proposal HIV - Round 09",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Proposals/MMR/Round 09/HIV/en/MYN-R09-HA_Proposal_0_en.pdf",
          },
          {
            title: " Proposal Tuberculosis - Round 09",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Proposals/MMR/Round 09/Tuberculosis/en/MYN-R09-TB_Proposal_0_en.pdf",
          },
          {
            title: " Proposal Malaria - Round 03",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Proposals/MMR/Round 03/Malaria/en/MYN-R03-ML_Proposal_0_en.pdf",
          },
          {
            title: " Proposal HIV - Round 03",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Proposals/MMR/Round 03/HIV/en/MYN-R03-HA_Proposal_0_en.pdf",
          },
          {
            title: " Proposal Tuberculosis - Round 02",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Proposals/MMR/Round 02/Tuberculosis/en/MYN-R02-TB_Proposal_0_en.pdf",
          },
        ],
      },
    ],
  },
  {
    name: "Namibia",
    count: 14,
    docCategories: [
      {
        name: "Application",
        count: 14,
        docs: [
          {
            title: " Funding Request Multicomponent - 2020",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Funding Requests/NAM/2020/Multicomponent/en/NAM-Z_FundingRequest_1_en.zip",
          },
          {
            title: " Funding Request TB/HIV - 2017",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Funding Requests/NAM/2017/TB_HIV/en/NAM-C_FundingRequest_0_en.zip",
          },
          {
            title: " Funding Request Malaria - 2017",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Funding Requests/NAM/2017/Malaria/en/NAM-M_FundingRequest_0_en.zip",
          },
          {
            title: " Concept Note TB/HIV - 2017",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Concept Notes/NAM/2017/TB_HIV/en/NAM-C_ConceptNote_0_en.zip",
          },
          {
            title: " Concept Note Malaria - 2016",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Concept Notes/NAM/2016/Malaria/en/NAM-M_ConceptNote_0_en.zip",
          },
          {
            title: " Proposal Tuberculosis - Round 10",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Proposals/NAM/Round 10/Tuberculosis/en/NMB-R10-TB_Proposal_0_en.pdf",
          },
          {
            title: " Proposal Malaria - Round 06",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Proposals/NAM/Round 06/Malaria/en/NMB-R06-ML_Proposal_0_en.pdf",
          },
          {
            title: " Proposal Tuberculosis - Round 05",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Proposals/NAM/Round 05/Tuberculosis/en/NMB-R05-TB_Proposal_0_en.pdf",
          },
          {
            title: " Proposal Malaria - Round 02",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Proposals/NAM/Round 02/Malaria/en/NMB-R02-ML_RCCProposal_0_en.pdf",
          },
          {
            title: " Proposal Malaria - Round 02",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Proposals/NAM/Round 02/Malaria/en/NMB-R02-ML_Proposal_0_en.pdf",
          },
          {
            title: " Proposal HIV - Round 02",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Proposals/NAM/Round 02/HIV/en/NMB-R02-HA_RCCProposal_0_en.pdf",
          },
          {
            title: " Proposal Tuberculosis - Round 02",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Proposals/NAM/Round 02/Tuberculosis/en/NMB-R02-TB_Proposal_0_en.pdf",
          },
          {
            title: " Proposal Tuberculosis - Round 02",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Proposals/NAM/Round 02/Tuberculosis/en/NMB-R02-TB_RCCProposal_0_en.pdf",
          },
          {
            title: " Proposal HIV - Round 02",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Proposals/NAM/Round 02/HIV/en/NMB-R02-HA_Proposal_0_en.pdf",
          },
        ],
      },
    ],
  },
  {
    name: "Nepal",
    count: 15,
    docCategories: [
      {
        name: "Application",
        count: 15,
        docs: [
          {
            title: " Funding Request Tuberculosis - 2017",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Funding Requests/NPL/2017/Tuberculosis/en/NPL-T_FundingRequest_0_en.zip",
          },
          {
            title: " Funding Request HIV - 2017",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Funding Requests/NPL/2017/HIV/en/NPL-H_FundingRequest_0_en.zip",
          },
          {
            title: " Funding Request Malaria - 2017",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Funding Requests/NPL/2017/Malaria/en/NPL-M_FundingRequest_0_en.zip",
          },
          {
            title: " Concept Note HIV - 2016",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Concept Notes/NPL/2016/HIV/en/NPL-H_ConceptNote_0_en.zip",
          },
          {
            title: " Concept Note Tuberculosis - 2016",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Concept Notes/NPL/2016/Tuberculosis/en/NPL-T_ConceptNote_0_en.zip",
          },
          {
            title: " Concept Note Malaria - 2016",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Concept Notes/NPL/2016/Malaria/en/NPL-M_ConceptNote_0_en.zip",
          },
          {
            title: " Proposal HIV - Round 10",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Proposals/NPL/Round 10/HIV/en/NEP-R10-HA_Proposal_0_en.pdf",
          },
          {
            title: " Proposal Tuberculosis - Round 09",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Proposals/NPL/Round 09/Tuberculosis/en/NEP-R09-TB_Proposal_0_en.pdf",
          },
          {
            title: " Proposal Malaria - Round 07",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Proposals/NPL/Round 07/Malaria/en/NEP-R07-ML_Proposal_0_en.pdf",
          },
          {
            title: " Proposal Tuberculosis - Round 07",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Proposals/NPL/Round 07/Tuberculosis/en/NEP-R07-TB_Proposal_0_en.pdf",
          },
          {
            title: " Proposal HIV - Round 07",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Proposals/NPL/Round 07/HIV/en/NEP-R07-HA_Proposal_0_en.pdf",
          },
          {
            title: " Proposal Tuberculosis - Round 04",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Proposals/NPL/Round 04/Tuberculosis/en/NEP-R04-TB_Proposal_0_en.pdf",
          },
          {
            title: " Proposal Malaria - Round 02",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Proposals/NPL/Round 02/Malaria/en/NEP-R02-ML_RCCProposal_0_en.pdf",
          },
          {
            title: " Proposal Malaria - Round 02",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Proposals/NPL/Round 02/Malaria/en/NEP-R02-ML_Proposal_0_en.pdf",
          },
          {
            title: " Proposal HIV - Round 02",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Proposals/NPL/Round 02/HIV/en/NEP-R02-HA_Proposal_0_en.pdf",
          },
        ],
      },
    ],
  },
  {
    name: "Nicaragua",
    count: 16,
    docCategories: [
      {
        name: "Application",
        count: 16,
        docs: [
          {
            title: " Funding Request Tuberculosis - 2018",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Funding Requests/NIC/2018/Tuberculosis/en/NIC-T_FundingRequest_0_en.zip",
          },
          {
            title: " Funding Request Malaria - 2018",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Funding Requests/NIC/2018/Malaria/en/NIC-M_FundingRequest_0_en.zip",
          },
          {
            title: " Funding Request HIV - 2017",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Funding Requests/NIC/2017/HIV/en/NIC-H_FundingRequest_0_en.zip",
          },
          {
            title: " Concept Note Tuberculosis - 2015",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Concept Notes/NIC/2015/Tuberculosis/en/NIC-T_ConceptNote_0_en.zip",
          },
          {
            title: " Concept Note Malaria - 2015",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Concept Notes/NIC/2015/Malaria/en/NIC-M_ConceptNote_0_en.zip",
          },
          {
            title: " Concept Note HIV - 2014",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Concept Notes/NIC/2014/HIV/en/NIC-H_ConceptNote_0_en.zip",
          },
          {
            title: " Proposal Malaria - Round 09",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Proposals/NIC/Round 09/Malaria/en/NIC-R09-ML_Proposal_0_en.pdf",
          },
          {
            title: " Proposal HIV - Round 08",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Proposals/NIC/Round 08/HIV/en/NIC-R08-HA_Proposal_0_en.pdf",
          },
          {
            title: " Proposal Malaria - Round 07",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Proposals/NIC/Round 07/Malaria/en/NIC-R07-ML_Proposal_0_en.pdf",
          },
          {
            title: " Proposal Malaria - Round 02",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Proposals/NIC/Round 02/Malaria/es/NIC-R02-ML_Proposal_0_es.pdf",
          },
          {
            title: " Proposal HIV - Round 02",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Proposals/NIC/Round 02/HIV/es/NIC-R02-HA_Proposal_0_es.pdf",
          },
          {
            title: " Proposal Malaria - Round 02",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Proposals/NIC/Round 02/Malaria/en/NIC-R02-ML_Proposal_0_en.pdf",
          },
          {
            title: " Proposal HIV - Round 02",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Proposals/NIC/Round 02/HIV/en/NIC-R02-HA_Proposal_0_en.pdf",
          },
          {
            title: " Proposal Tuberculosis - Round 02",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Proposals/NIC/Round 02/Tuberculosis/en/NIC-R02-TB_Proposal_0_en.pdf",
          },
          {
            title: " Proposal Tuberculosis - Round 02",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Proposals/NIC/Round 02/Tuberculosis/es/NIC-R02-TB_Proposal_0_es.pdf",
          },
          {
            title: " Proposal Tuberculosis - Round 02",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Proposals/NIC/Round 02/Tuberculosis/en/NIC-R02-TB_RCCProposal_0_en.pdf",
          },
        ],
      },
    ],
  },
  {
    name: "Niger",
    count: 20,
    docCategories: [
      {
        name: "Application",
        count: 20,
        docs: [
          {
            title: " Funding Request Multicomponent - 2018",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Funding Requests/NER/2018/Multicomponent/en/NER-Z_FundingRequest_0_en.zip",
          },
          {
            title: " Funding Request Malaria - 2017",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Funding Requests/NER/2017/Malaria/en/NER-M_FundingRequest_0_en.zip",
          },
          {
            title: " Funding Request HIV - 2017",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Funding Requests/NER/2017/HIV/en/NER-H_FundingRequest_0_en.zip",
          },
          {
            title: " Concept Note Tuberculosis - 2015",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Concept Notes/NER/2015/Tuberculosis/en/NER-T_ConceptNote_0_en.zip",
          },
          {
            title: " Concept Note Malaria - 2015",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Concept Notes/NER/2015/Malaria/en/NER-M_ConceptNote_0_en.zip",
          },
          {
            title: " Concept Note HIV - 2014",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Concept Notes/NER/2014/HIV/en/NER-H_ConceptNote_0_en.zip",
          },
          {
            title: " Proposal Malaria - Transitional Funding Mechanism",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Proposals/NER/Transitional Funding Mechanism/Malaria/en/NGR-TFM-ML_Proposal_0_en.pdf",
          },
          {
            title: " Proposal HIV - Transitional Funding Mechanism",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Proposals/NER/Transitional Funding Mechanism/HIV/en/NGR-TFM-HA_Proposal_0_en.pdf",
          },
          {
            title: " Proposal Tuberculosis - Round 10",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Proposals/NER/Round 10/Tuberculosis/en/NGR-R10-TB_Proposal_0_en.pdf",
          },
          {
            title: " Proposal Malaria - Round 07",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Proposals/NER/Round 07/Malaria/fr/NGR-R07-ML_Proposal_0_fr.pdf",
          },
          {
            title: " Proposal HIV - Round 07",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Proposals/NER/Round 07/HIV/en/NGR-R07-HA_Proposal_0_en.pdf",
          },
          {
            title: " Proposal HIV - Round 07",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Proposals/NER/Round 07/HIV/fr/NGR-R07-HA_Proposal_0_fr.pdf",
          },
          {
            title: " Proposal Malaria - Round 07",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Proposals/NER/Round 07/Malaria/en/NGR-R07-ML_Proposal_0_en.pdf",
          },
          {
            title: " Proposal Malaria - Round 05",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Proposals/NER/Round 05/Malaria/en/NGR-R05-ML_AMFmApplication_0_en.pdf",
          },
          {
            title: " Proposal Malaria - Round 05",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Proposals/NER/Round 05/Malaria/en/NGR-R05-ML_Proposal_0_en.pdf",
          },
          {
            title: " Proposal Tuberculosis - Round 05",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Proposals/NER/Round 05/Tuberculosis/en/NGR-R05-TB_Proposal_0_en.pdf",
          },
          {
            title: " Proposal HIV - Round 03",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Proposals/NER/Round 03/HIV/fr/NGR-R03-HA_Proposal_0_fr.pdf",
          },
          {
            title: " Proposal Malaria - Round 03",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Proposals/NER/Round 03/Malaria/en/NGR-R03-ML_Proposal_0_en.pdf",
          },
          {
            title: " Proposal HIV - Round 03",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Proposals/NER/Round 03/HIV/en/NGR-R03-HA_Proposal_0_en.pdf",
          },
          {
            title: " Proposal Malaria - Round 03",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Proposals/NER/Round 03/Malaria/fr/NGR-R03-ML_Proposal_0_fr.pdf",
          },
        ],
      },
    ],
  },
  {
    name: "Nigeria",
    count: 17,
    docCategories: [
      {
        name: "Application",
        count: 17,
        docs: [
          {
            title: " Funding Request Tuberculosis - 2018",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Funding Requests/NGA/2018/Tuberculosis/en/NGA-T_FundingRequest_0_en.zip",
          },
          {
            title: " Funding Request HIV - 2018",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Funding Requests/NGA/2018/HIV/en/NGA-H_FundingRequest_0_en.zip",
          },
          {
            title: " Funding Request TB/HIV - 2017",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Funding Requests/NGA/2017/TB_HIV/en/NGA-C_FundingRequest_0_en.zip",
          },
          {
            title: " Funding Request Malaria - 2017",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Funding Requests/NGA/2017/Malaria/en/NGA-M_FundingRequest_0_en.zip",
          },
          {
            title: " Concept Note TB/HIV - 2014",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Concept Notes/NGA/2014/TB_HIV/en/NGA-TH_ConceptNote_0_en.zip",
          },
          {
            title: " Concept Note Malaria - 2014",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Concept Notes/NGA/2014/Malaria/en/NGA-M_ConceptNote_0_en.zip",
          },
          {
            title: " Proposal Tuberculosis - Round 09",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Proposals/NGA/Round 09/Tuberculosis/en/NGA-R09-TB_Proposal_0_en.pdf",
          },
          {
            title: " Proposal HIV - Round 09",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Proposals/NGA/Round 09/HIV/en/NGA-R09-HA_Proposal_0_en.pdf",
          },
          {
            title: " Proposal Malaria - Round 08",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Proposals/NGA/Round 08/Malaria/en/NGA-R08-ML_Proposal_0_en.pdf",
          },
          {
            title: " Proposal Malaria - Round 08",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Proposals/NGA/Round 08/Malaria/en/NGA-R08-ML_AMFmApplication_0_en.pdf",
          },
          {
            title: " Proposal HIV - Round 08",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Proposals/NGA/Round 08/HIV/en/NGA-R08-HA_Proposal_0_en.pdf",
          },
          {
            title: " Proposal HIV - Round 05",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Proposals/NGA/Round 05/HIV/en/NGA-R05-HA_Proposal_0_en.pdf",
          },
          {
            title: " Proposal Tuberculosis - Round 05",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Proposals/NGA/Round 05/Tuberculosis/en/NGA-R05-TB_Proposal_0_en.pdf",
          },
          {
            title: " Proposal Malaria - Round 04",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Proposals/NGA/Round 04/Malaria/en/NGA-R04-ML_Proposal_0_en.pdf",
          },
          {
            title: " Proposal Tuberculosis - Round 02",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Proposals/NGA/Round 02/Tuberculosis/en/NGA-R02-TB_Proposal_0_en.pdf",
          },
          {
            title: " Proposal Malaria - Round 02",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Proposals/NGA/Round 02/Malaria/en/NGA-R02-ML_Proposal_0_en.pdf",
          },
          {
            title: " Proposal HIV - Round 01",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Proposals/NGA/Round 01/HIV/en/NGA-R01-HA_Proposal_0_en.pdf",
          },
        ],
      },
    ],
  },
  {
    name: "North Macedonia",
    count: 5,
    docCategories: [
      {
        name: "Application",
        count: 5,
        docs: [
          {
            title: " Proposal Tuberculosis - Round 10",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Proposals/MKD/Round 10/Tuberculosis/en/MKD-R10-TB_Proposal_0_en.pdf",
          },
          {
            title: " Proposal HIV - Round 10",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Proposals/MKD/Round 10/HIV/en/MKD-R10-HA_Proposal_0_en.pdf",
          },
          {
            title: " Proposal HIV - Round 07",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Proposals/MKD/Round 07/HIV/en/MKD-R07-HA_Proposal_0_en.pdf",
          },
          {
            title: " Proposal Tuberculosis - Round 05",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Proposals/MKD/Round 05/Tuberculosis/en/MKD-R05-TB_Proposal_0_en.pdf",
          },
          {
            title: " Proposal HIV - Round 03",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Proposals/MKD/Round 03/HIV/en/MKD-R03-HA_Proposal_0_en.pdf",
          },
        ],
      },
    ],
  },
  {
    name: "Oceania",
    count: 13,
    docCategories: [
      {
        name: "Application",
        count: 13,
        docs: [
          {
            title: " Funding Request TB/HIV - 2020",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Funding Requests/QUA/Multicountry Western Pacific/2020/TB_HIV/en/QUA-C_FundingRequest_3_en.zip",
          },
          {
            title: " Funding Request Malaria - 2017",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Funding Requests/QUA/Multicountry Western Pacific/2017/Malaria/en/QUA-M_FundingRequest_0_en.zip",
          },
          {
            title: " Funding Request TB/HIV - 2017",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Funding Requests/QUA/Multicountry Western Pacific/2017/TB_HIV/en/QUA-C_FundingRequest_0_en.zip",
          },
          {
            title: " Concept Note Tuberculosis - 2014",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Concept Notes/QUA/2014/Tuberculosis/en/QMJ-T_ConceptNote_0_en.zip",
          },
          {
            title: " Concept Note HIV - 2014",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Concept Notes/QUA/2014/HIV/en/QMJ-H_ConceptNote_0_en.zip",
          },
          {
            title: " Proposal Tuberculosis - Transitional Funding Mechanism",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Proposals/QUA/Transitional Funding Mechanism/Tuberculosis/en/MWP-TFM-TB_Proposal_0_en.pdf",
          },
          {
            title: " Proposal HIV - Round 07",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Proposals/QUA/Round 07/HIV/en/MWP-R07-HA_Proposal_0_en.pdf",
          },
          {
            title: " Proposal Tuberculosis - Round 07",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Proposals/QUA/Round 07/Tuberculosis/en/MWP-R07-TB_Proposal_0_en.pdf",
          },
          {
            title: " Proposal Malaria - Round 05",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Proposals/QUA/Round 05/Malaria/en/MWP-R05-ML_RCCProposal_0_en.pdf",
          },
          {
            title: " Proposal Malaria - Round 05",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Proposals/QUA/Round 05/Malaria/en/MWP-R05-ML_Proposal_0_en.pdf",
          },
          {
            title: " Proposal Malaria - Round 02",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Proposals/QUA/Round 02/Malaria/en/MWP-R02-ML_Proposal_0_en.pdf",
          },
          {
            title: " Proposal Tuberculosis - Round 02",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Proposals/QUA/Round 02/Tuberculosis/en/MWP-R02-TB_Proposal_0_en.pdf",
          },
          {
            title: " Proposal HIV - Round 02",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Proposals/QUA/Round 02/HIV/en/MWP-R02-HA_Proposal_0_en.pdf",
          },
        ],
      },
    ],
  },
  {
    name: "Pakistan",
    count: 19,
    docCategories: [
      {
        name: "Application",
        count: 19,
        docs: [
          {
            title: " Funding Request HIV - 2020",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Funding Requests/PAK/2020/HIV/en/PAK-H_FundingRequest_3_en.zip",
          },
          {
            title: " Funding Request Malaria - 2020",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Funding Requests/PAK/2020/Malaria/en/PAK-M_FundingRequest_0_en.zip",
          },
          {
            title: " Funding Request Malaria - 2017",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Funding Requests/PAK/2017/Malaria/en/PAK-M_FundingRequest_0_en.zip",
          },
          {
            title: " Funding Request Tuberculosis - 2017",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Funding Requests/PAK/2017/Tuberculosis/en/PAK-T_FundingRequest_0_en.zip",
          },
          {
            title: " Funding Request HIV - 2017",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Funding Requests/PAK/2017/HIV/en/PAK-H_FundingRequest_0_en.zip",
          },
          {
            title: " Concept Note HIV - 2015",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Concept Notes/PAK/2015/HIV/en/PAK-H_ConceptNote_0_en.zip",
          },
          {
            title: " Concept Note RSSH - 2015",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Concept Notes/PAK/2015/RSSH/en/PAK-S_ConceptNote_0_en.zip",
          },
          {
            title: " Concept Note Malaria - 2014",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Concept Notes/PAK/2014/Malaria/en/PAK-M_ConceptNote_0_en.zip",
          },
          {
            title: " Concept Note Tuberculosis - 2014",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Concept Notes/PAK/2014/Tuberculosis/en/PAK-T_ConceptNote_0_en.zip",
          },
          {
            title: " Proposal Malaria - Round 10",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Proposals/PAK/Round 10/Malaria/en/PKS-R10-ML_Proposal_0_en.pdf",
          },
          {
            title: " Proposal Tuberculosis - Round 09",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Proposals/PAK/Round 09/Tuberculosis/en/PKS-R09-TB_Proposal_0_en.pdf",
          },
          {
            title: " Proposal HIV - Round 09",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Proposals/PAK/Round 09/HIV/en/PKS-R09-HA_Proposal_0_en.pdf",
          },
          {
            title: " Proposal Tuberculosis - Round 08",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Proposals/PAK/Round 08/Tuberculosis/en/PKS-R08-TB_Proposal_0_en.pdf",
          },
          {
            title: " Proposal Malaria - Round 07",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Proposals/PAK/Round 07/Malaria/en/PKS-R07-ML_Proposal_0_en.pdf",
          },
          {
            title: " Proposal Tuberculosis - Round 03",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Proposals/PAK/Round 03/Tuberculosis/en/PKS-R03-TB_Proposal_0_en.pdf",
          },
          {
            title: " Proposal Malaria - Round 03",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Proposals/PAK/Round 03/Malaria/en/PKS-R03-ML_Proposal_0_en.pdf",
          },
          {
            title: " Proposal Malaria - Round 02",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Proposals/PAK/Round 02/Malaria/en/PKS-R02-ML_Proposal_0_en.pdf",
          },
          {
            title: " Proposal Tuberculosis - Round 02",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Proposals/PAK/Round 02/Tuberculosis/en/PKS-R02-TB_Proposal_0_en.pdf",
          },
          {
            title: " Proposal HIV - Round 02",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Proposals/PAK/Round 02/HIV/en/PKS-R02-HA_Proposal_0_en.pdf",
          },
        ],
      },
    ],
  },
  {
    name: "Palestine",
    count: 3,
    docCategories: [
      {
        name: "Application",
        count: 3,
        docs: [
          {
            title: " Proposal HIV - Transitional Funding Mechanism",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Proposals/PSE/Transitional Funding Mechanism/HIV/en/PSE-TFM-HA_Proposal_0_en.pdf",
          },
          {
            title: " Proposal Tuberculosis - Round 08",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Proposals/PSE/Round 08/Tuberculosis/en/PSE-R08-TB_Proposal_0_en.pdf",
          },
          {
            title: " Proposal HIV - Round 07",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Proposals/PSE/Round 07/HIV/en/PSE-R07-HA_Proposal_0_en.pdf",
          },
        ],
      },
    ],
  },
  {
    name: "Panama",
    count: 4,
    docCategories: [
      {
        name: "Application",
        count: 4,
        docs: [
          {
            title: " Funding Request TB/HIV - 2018",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Funding Requests/PAN/2018/TB_HIV/en/PAN-C_FundingRequest_0_en.zip",
          },
          {
            title: " Concept Note TB/HIV - 2015",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Concept Notes/PAN/2015/TB_HIV/en/PAN-C_ConceptNote_0_en.zip",
          },
          {
            title: " Proposal HIV - Round 10",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Proposals/PAN/Round 10/HIV/en/PAN-R10-HA_Proposal_0_en.pdf",
          },
          {
            title: " Proposal Tuberculosis - Round 01",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Proposals/PAN/Round 01/Tuberculosis/en/PAN-R01-TB_Proposal_0_en.pdf",
          },
        ],
      },
    ],
  },
  {
    name: "Papua New Guinea",
    count: 11,
    docCategories: [
      {
        name: "Application",
        count: 11,
        docs: [
          {
            title: " Funding Request TB/HIV - 2020",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Funding Requests/PNG/2020/TB_HIV/en/PNG-C_FundingRequest_2_en.zip",
          },
          {
            title: " Funding Request TB/HIV - 2017",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Funding Requests/PNG/2017/TB_HIV/en/PNG-C_FundingRequest_0_en.zip",
          },
          {
            title: " Funding Request Malaria - 2017",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Funding Requests/PNG/2017/Malaria/en/PNG-M_FundingRequest_0_en.zip",
          },
          {
            title: " Concept Note Tuberculosis - 2014",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Concept Notes/PNG/2014/Tuberculosis/en/PNG-T_ConceptNote_0_en.zip",
          },
          {
            title: " Concept Note Malaria - 2014",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Concept Notes/PNG/2014/Malaria/en/PNG-M_ConceptNote_0_en.zip",
          },
          {
            title: " Concept Note HIV - 2014",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Concept Notes/PNG/2014/HIV/en/PNG-H_ConceptNote_0_en.zip",
          },
          {
            title: " Proposal HIV - Round 10",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Proposals/PNG/Round 10/HIV/en/PNG-R10-HA_Proposal_0_en.pdf",
          },
          {
            title: " Proposal Malaria - Round 08",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Proposals/PNG/Round 08/Malaria/en/PNG-R08-ML_Proposal_0_en.pdf",
          },
          {
            title: " Proposal Tuberculosis - Round 06",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Proposals/PNG/Round 06/Tuberculosis/en/PNG-R06-TB_Proposal_0_en.pdf",
          },
          {
            title: " Proposal HIV - Round 04",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Proposals/PNG/Round 04/HIV/en/PNG-R04-HA_Proposal_0_en.pdf",
          },
          {
            title: " Proposal Malaria - Round 03",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Proposals/PNG/Round 03/Malaria/en/PNG-R03-ML_Proposal_0_en.pdf",
          },
        ],
      },
    ],
  },
  {
    name: "Paraguay",
    count: 14,
    docCategories: [
      {
        name: "Application",
        count: 14,
        docs: [
          {
            title: " Funding Request HIV - 2020",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Funding Requests/PRY/2020/HIV/en/PRY-H_FundingRequest_2_en.zip",
          },
          {
            title: " Funding Request Tuberculosis - 2018",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Funding Requests/PRY/2018/Tuberculosis/en/PRY-T_FundingRequest_0_en.zip",
          },
          {
            title: " Funding Request HIV - 2017",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Funding Requests/PRY/2017/HIV/en/PRY-H_FundingRequest_0_en.zip",
          },
          {
            title: " Concept Note Malaria - 2015",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Concept Notes/PRY/2015/Malaria/en/PRY-M_ConceptNote_0_en.zip",
          },
          {
            title: " Concept Note Tuberculosis - 2015",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Concept Notes/PRY/2015/Tuberculosis/en/PRY-T_ConceptNote_0_en.zip",
          },
          {
            title: " Concept Note HIV - 2014",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Concept Notes/PRY/2014/HIV/en/PRY-H_ConceptNote_0_en.zip",
          },
          {
            title: " Proposal Tuberculosis - Round 09",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Proposals/PRY/Round 09/Tuberculosis/en/PRY-R09-TB_Proposal_0_en.pdf",
          },
          {
            title: " Proposal HIV - Round 09",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Proposals/PRY/Round 09/HIV/en/PRY-R09-HA_Proposal_0_en.pdf",
          },
          {
            title: " Proposal HIV - Round 08",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Proposals/PRY/Round 08/HIV/en/PRY-R08-HA_Proposal_0_en.pdf",
          },
          {
            title: " Proposal Tuberculosis - Round 07",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Proposals/PRY/Round 07/Tuberculosis/en/PRY-R07-TB_Proposal_0_en.pdf",
          },
          {
            title: " Proposal HIV - Round 06",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Proposals/PRY/Round 06/HIV/en/PRY-R06-HA_Proposal_0_en.pdf",
          },
          {
            title: " Proposal Tuberculosis - Round 03",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Proposals/PRY/Round 03/Tuberculosis/en/PRY-R03-TB_RCCProposal_0_en.pdf",
          },
          {
            title: " Proposal Tuberculosis - Round 03",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Proposals/PRY/Round 03/Tuberculosis/es/PRY-R03-TB_Proposal_0_es.pdf",
          },
          {
            title: " Proposal Tuberculosis - Round 03",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Proposals/PRY/Round 03/Tuberculosis/en/PRY-R03-TB_Proposal_0_en.pdf",
          },
        ],
      },
    ],
  },
  {
    name: "Peru",
    count: 13,
    docCategories: [
      {
        name: "Application",
        count: 13,
        docs: [
          {
            title: " Funding Request Tuberculosis - 2018",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Funding Requests/PER/2018/Tuberculosis/en/PER-T_FundingRequest_0_en.zip",
          },
          {
            title: " Funding Request HIV - 2018",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Funding Requests/PER/2018/HIV/en/PER-H_FundingRequest_0_en.zip",
          },
          {
            title: " Concept Note Tuberculosis - 2015",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Concept Notes/PER/2015/Tuberculosis/en/PER-T_ConceptNote_0_en.zip",
          },
          {
            title: " Concept Note HIV - 2015",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Concept Notes/PER/2015/HIV/en/PER-H_ConceptNote_0_en.zip",
          },
          {
            title: " Proposal HIV - Round 10",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Proposals/PER/Round 10/HIV/en/PER-R10-HA_Proposal_0_en.pdf",
          },
          {
            title: " Proposal Tuberculosis - Round 08",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Proposals/PER/Round 08/Tuberculosis/en/PER-R08-TB_Proposal_0_en.pdf",
          },
          {
            title: " Proposal HIV - Round 06",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Proposals/PER/Round 06/HIV/en/PER-R06-HA_Proposal_0_en.pdf",
          },
          {
            title: " Proposal Tuberculosis - Round 05",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Proposals/PER/Round 05/Tuberculosis/en/PER-R05-TB_Proposal_0_en.pdf",
          },
          {
            title: " Proposal HIV - Round 05",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Proposals/PER/Round 05/HIV/en/PER-R05-HA_Proposal_0_en.pdf",
          },
          {
            title: " Proposal HIV - Round 02",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Proposals/PER/Round 02/HIV/en/PER-R02-HA_Proposal_0_en.pdf",
          },
          {
            title: " Proposal HIV - Round 02",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Proposals/PER/Round 02/HIV/es/PER-R02-HA_Proposal_0_es.pdf",
          },
          {
            title: " Proposal Tuberculosis - Round 02",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Proposals/PER/Round 02/Tuberculosis/es/PER-R02-TB_Proposal_0_es.pdf",
          },
          {
            title: " Proposal Tuberculosis - Round 02",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Proposals/PER/Round 02/Tuberculosis/en/PER-R02-TB_Proposal_0_en.pdf",
          },
        ],
      },
    ],
  },
  {
    name: "Philippines",
    count: 20,
    docCategories: [
      {
        name: "Application",
        count: 20,
        docs: [
          {
            title: " Funding Request Tuberculosis - 2020",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Funding Requests/PHL/2020/Tuberculosis/en/PHL-T_FundingRequest_1_en.zip",
          },
          {
            title: " Funding Request Malaria - 2020",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Funding Requests/PHL/2020/Malaria/en/PHL-M_FundingRequest_1_en.zip",
          },
          {
            title: " Funding Request HIV - 2020",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Funding Requests/PHL/2020/HIV/en/PHL-H_FundingRequest_1_en.zip",
          },
          {
            title: " Funding Request Malaria - 2017",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Funding Requests/PHL/2017/Malaria/en/PHL-M_FundingRequest_0_en.zip",
          },
          {
            title: " Funding Request Tuberculosis - 2017",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Funding Requests/PHL/2017/Tuberculosis/en/PHL-T_FundingRequest_0_en.zip",
          },
          {
            title: " Funding Request HIV - 2017",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Funding Requests/PHL/2017/HIV/en/PHL-H_FundingRequest_0_en.zip",
          },
          {
            title: " Concept Note HIV - 2014",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Concept Notes/PHL/2014/HIV/en/PHL-H_ConceptNote_0_en.zip",
          },
          {
            title: " Concept Note Malaria - 2014",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Concept Notes/PHL/2014/Malaria/en/PHL-M_ConceptNote_0_en.zip",
          },
          {
            title: " Concept Note Tuberculosis - 2013",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Concept Notes/PHL/2013/Tuberculosis/en/PHL-T_ConceptNote_0_en.zip",
          },
          {
            title: " Proposal HIV - Transitional Funding Mechanism",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Proposals/PHL/Transitional Funding Mechanism/HIV/en/PHL-TFM-HA_Proposal_0_en.pdf",
          },
          {
            title: " Proposal HIV - Round 06",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Proposals/PHL/Round 06/HIV/en/PHL-R06-HA_Proposal_0_en.pdf",
          },
          {
            title: " Proposal Malaria - Round 06",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Proposals/PHL/Round 06/Malaria/en/PHL-R06-ML_Proposal_0_en.pdf",
          },
          {
            title: " Proposal Malaria - Round 05",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Proposals/PHL/Round 05/Malaria/en/PHL-R05-ML_Proposal_0_en.pdf",
          },
          {
            title: " Proposal Tuberculosis - Round 05",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Proposals/PHL/Round 05/Tuberculosis/en/PHL-R05-TB_Proposal_0_en.pdf",
          },
          {
            title: " Proposal HIV - Round 05",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Proposals/PHL/Round 05/HIV/en/PHL-R05-HA_Proposal_0_en.pdf",
          },
          {
            title: " Proposal HIV - Round 03",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Proposals/PHL/Round 03/HIV/en/PHL-R03-HA_Proposal_0_en.pdf",
          },
          {
            title: " Proposal Malaria - Round 02",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Proposals/PHL/Round 02/Malaria/en/PHL-R02-ML_RCCProposal_0_en.pdf",
          },
          {
            title: " Proposal Malaria - Round 02",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Proposals/PHL/Round 02/Malaria/en/PHL-R02-ML_Proposal_0_en.pdf",
          },
          {
            title: " Proposal Tuberculosis - Round 02",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Proposals/PHL/Round 02/Tuberculosis/en/PHL-R02-TB_RCCProposal_0_en.pdf",
          },
          {
            title: " Proposal Tuberculosis - Round 02",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Proposals/PHL/Round 02/Tuberculosis/en/PHL-R02-TB_Proposal_0_en.pdf",
          },
        ],
      },
    ],
  },
  {
    name: "Romania",
    count: 7,
    docCategories: [
      {
        name: "Application",
        count: 7,
        docs: [
          {
            title: " Funding Request Tuberculosis - 2018",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Funding Requests/ROU/2018/Tuberculosis/en/ROU-T_FundingRequest_0_en.zip",
          },
          {
            title: " Concept Note Tuberculosis - 2014",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Concept Notes/ROU/2014/Tuberculosis/en/ROU-T_ConceptNote_0_en.zip",
          },
          {
            title: " Proposal Tuberculosis - Transitional Funding Mechanism",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Proposals/ROU/Transitional Funding Mechanism/Tuberculosis/en/ROM-TFM-TB_Proposal_0_en.pdf",
          },
          {
            title: " Proposal HIV - Round 06",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Proposals/ROU/Round 06/HIV/en/ROM-R06-HA_Proposal_0_en.pdf",
          },
          {
            title: " Proposal Tuberculosis - Round 06",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Proposals/ROU/Round 06/Tuberculosis/en/ROM-R06-TB_Proposal_0_en.pdf",
          },
          {
            title: " Proposal HIV - Round 02",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Proposals/ROU/Round 02/HIV/en/ROM-R02-HA_Proposal_0_en.pdf",
          },
          {
            title: " Proposal Tuberculosis - Round 02",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Proposals/ROU/Round 02/Tuberculosis/en/ROM-R02-TB_Proposal_0_en.pdf",
          },
        ],
      },
    ],
  },
  {
    name: "Russian Federation",
    count: 11,
    docCategories: [
      {
        name: "Application",
        count: 11,
        docs: [
          {
            title: " Concept Note HIV - 2014",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Concept Notes/RUS/2014/HIV/en/RUS-H_ConceptNote_0_en.zip",
          },
          {
            title: " Proposal HIV - Transitional Funding Mechanism",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Proposals/RUS/Transitional Funding Mechanism/HIV/en/RUS(ESVERO)-TFM-HA_Proposal_0_en.pdf",
          },
          {
            title: " Proposal HIV - Transitional Funding Mechanism",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Proposals/RUS/Transitional Funding Mechanism/HIV/en/RUS(OHI)-TFM-HA_Proposal_0_en.pdf",
          },
          {
            title: " Proposal Tuberculosis - Round 10",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Proposals/RUS/Round 10/Tuberculosis/en/RUS-R10-TB_Proposal_0_en.pdf",
          },
          {
            title: " Proposal HIV - Round 05",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Proposals/RUS/Round 05/HIV/en/RUS-R05-HA_Proposal_0_en.pdf",
          },
          {
            title: " Proposal Tuberculosis - Round 04",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Proposals/RUS/Round 04/Tuberculosis/en/RUS-R04-TB_Proposal_0_en.pdf",
          },
          {
            title: " Proposal HIV - Round 04",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Proposals/RUS/Round 04/HIV/en/RUS-R04-HA_Proposal_0_en.pdf",
          },
          {
            title: " Proposal HIV - Round 03",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Proposals/RUS/Round 03/HIV/en/RUS-R03-HA_Proposal_0_en.pdf",
          },
          {
            title: " Proposal Tuberculosis - Round 03",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Proposals/RUS/Round 03/Tuberculosis/en/RUS-R03-TB_Proposal_0_en.pdf",
          },
          {
            title: " Proposal TB/HIV - Round 03",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Proposals/RUS/Round 03/TB_HIV/en/RUS-R03-HT_Proposal_0_en.pdf",
          },
          {
            title: " Proposal Tuberculosis - Round 03",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Proposals/RUS/Round 03/Tuberculosis/en/RUS-R03-TB_RCCProposal_0_en.pdf",
          },
        ],
      },
    ],
  },
  {
    name: "Rwanda",
    count: 22,
    docCategories: [
      {
        name: "Application",
        count: 22,
        docs: [
          {
            title: " Funding Request Malaria - 2020",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Funding Requests/RWA/2020/Malaria/en/RWA-M_FundingRequest_4_en.zip",
          },
          {
            title: " Funding Request TB/HIV - 2020",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Funding Requests/RWA/2020/TB_HIV/en/RWA-C_FundingRequest_4_en.zip",
          },
          {
            title: " Funding Request TB/HIV - 2017",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Funding Requests/RWA/2017/TB_HIV/en/RWA-C_FundingRequest_0_en.zip",
          },
          {
            title: " Funding Request Malaria - 2017",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Funding Requests/RWA/2017/Malaria/en/RWA-M_FundingRequest_0_en.zip",
          },
          {
            title: " Concept Note Malaria - 2014",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Concept Notes/RWA/2014/Malaria/en/RWA-M_ConceptNote_0_en.zip",
          },
          {
            title: " Concept Note TB/HIV - 2014",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Concept Notes/RWA/2014/TB_HIV/en/RWA-TH_ConceptNote_0_en.zip",
          },
          {
            title: " Proposal HIV - Round 09",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Proposals/RWA/Round 09/HIV/en/RWN-R09-HA_Proposal_0_en.pdf",
          },
          {
            title: " Proposal Tuberculosis - Round 09",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Proposals/RWA/Round 09/Tuberculosis/en/RWN-R09-TB_Proposal_0_en.pdf",
          },
          {
            title: " Proposal Malaria - Round 08",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Proposals/RWA/Round 08/Malaria/en/RWN-R08-ML_Proposal_0_en.pdf",
          },
          {
            title: " Proposal HIV - Round 07",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Proposals/RWA/Round 07/HIV/en/RWN-R07-HA_Proposal_0_en.pdf",
          },
          {
            title: " Proposal Tuberculosis - Round 06",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Proposals/RWA/Round 06/Tuberculosis/en/RWN-R06-TB_Proposal_0_en.pdf",
          },
          {
            title: " Proposal HIV - Round 06",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Proposals/RWA/Round 06/HIV/en/RWN-R06-HA_Proposal_0_en.pdf",
          },
          {
            title: " Proposal Malaria - Round 05",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Proposals/RWA/Round 05/Malaria/en/RWN-R05-ML_Proposal_0_en.pdf",
          },
          {
            title: " Proposal Malaria - Round 05",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Proposals/RWA/Round 05/Malaria/en/RWN-R05-ML_AMFmApplication_0_en.pdf",
          },
          {
            title: " Proposal HIV - Round 05",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Proposals/RWA/Round 05/HIV/en/RWN-R05-HA_Proposal_0_en.pdf",
          },
          {
            title: " Proposal Tuberculosis - Round 04",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Proposals/RWA/Round 04/Tuberculosis/en/RWN-R04-TB_Proposal_0_en.pdf",
          },
          {
            title: " Proposal Tuberculosis - Round 04",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Proposals/RWA/Round 04/Tuberculosis/en/RWN-R04-TB_RCCProposal_0_en.pdf",
          },
          {
            title: " Proposal HIV - Round 03",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Proposals/RWA/Round 03/HIV/en/RWN-R03-HA_Proposal_0_en.pdf",
          },
          {
            title: " Proposal Malaria - Round 03",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Proposals/RWA/Round 03/Malaria/en/RWN-R03-ML_RCCProposal_0_en.pdf",
          },
          {
            title: " Proposal Malaria - Round 03",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Proposals/RWA/Round 03/Malaria/en/RWN-R03-ML_Proposal_0_en.pdf",
          },
          {
            title: " Proposal Tuberculosis - Round 01",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Proposals/RWA/Round 01/Tuberculosis/en/RWN-R01-TB_Proposal_0_en.pdf",
          },
          {
            title: " Proposal TB/HIV - Round 01",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Proposals/RWA/Round 01/TB_HIV/en/RWN-R01-HT_Proposal_0_en.pdf",
          },
        ],
      },
    ],
  },
  {
    name: "Sao Tome and Principe",
    count: 10,
    docCategories: [
      {
        name: "Application",
        count: 10,
        docs: [
          {
            title: " Funding Request Multicomponent - 2017",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Funding Requests/STP/2017/Multicomponent/en/STP-Z_FundingRequest_0_en.zip",
          },
          {
            title: " Concept Note Malaria - 2015",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Concept Notes/STP/2015/Malaria/en/STP-M_ConceptNote_0_en.zip",
          },
          {
            title: " Concept Note HIV - 2015",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Concept Notes/STP/2015/HIV/en/STP-H_ConceptNote_0_en.zip",
          },
          {
            title: " Concept Note Tuberculosis - 2014",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Concept Notes/STP/2014/Tuberculosis/en/STP-T_ConceptNote_0_en.zip",
          },
          {
            title: " Proposal HIV - Round 10",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Proposals/STP/Round 10/HIV/en/STP-R10-HA_Proposal_0_en.pdf",
          },
          {
            title: " Proposal Tuberculosis - Round 08",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Proposals/STP/Round 08/Tuberculosis/en/STP-R08-TB_Proposal_0_en.pdf",
          },
          {
            title: " Proposal Malaria - Round 07",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Proposals/STP/Round 07/Malaria/en/STP-R07-ML_Proposal_0_en.pdf",
          },
          {
            title: " Proposal HIV - Round 05",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Proposals/STP/Round 05/HIV/en/STP-R05-HA_Proposal_0_en.pdf",
          },
          {
            title: " Proposal Malaria - Round 04",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Proposals/STP/Round 04/Malaria/en/STP-R04-ML_Proposal_0_en.pdf",
          },
          {
            title: " Proposal Malaria - Round 04",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Proposals/STP/Round 04/Malaria/en/STP-R04-ML_RCCProposal_0_en.pdf",
          },
        ],
      },
    ],
  },
  {
    name: "Senegal",
    count: 22,
    docCategories: [
      {
        name: "Application",
        count: 22,
        docs: [
          {
            title: " Funding Request Multicomponent - 2020",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Funding Requests/SEN/2020/Multicomponent/en/SEN-Z_FundingRequest_2_en.zip",
          },
          {
            title: " Funding Request HIV - 2020",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Funding Requests/SEN/2020/HIV/en/SEN-H_FundingRequest_2_en.zip",
          },
          {
            title: " Funding Request Malaria - 2020",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Funding Requests/SEN/2020/Malaria/en/SEN-M_FundingRequest_2_en.zip",
          },
          {
            title: " Funding Request Malaria - 2017",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Funding Requests/SEN/2017/Malaria/en/SEN-M_FundingRequest_0_en.zip",
          },
          {
            title: " Funding Request Tuberculosis - 2017",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Funding Requests/SEN/2017/Tuberculosis/en/SEN-T_FundingRequest_0_en.zip",
          },
          {
            title: " Funding Request HIV - 2017",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Funding Requests/SEN/2017/HIV/en/SEN-H_FundingRequest_0_en.zip",
          },
          {
            title: " Concept Note RSSH - 2015",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Concept Notes/SEN/2015/RSSH/en/SEN-S_ConceptNote_0_en.zip",
          },
          {
            title: " Concept Note Malaria - 2014",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Concept Notes/SEN/2014/Malaria/en/SEN-M_ConceptNote_0_en.zip",
          },
          {
            title: " Concept Note HIV - 2014",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Concept Notes/SEN/2014/HIV/en/SEN-H_ConceptNote_0_en.zip",
          },
          {
            title: " Proposal Tuberculosis - Round 10",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Proposals/SEN/Round 10/Tuberculosis/en/SNG-R10-TB_Proposal_0_en.pdf",
          },
          {
            title: " Proposal Malaria - Round 10",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Proposals/SEN/Round 10/Malaria/en/SNG-R10-ML_Proposal_0_en.pdf",
          },
          {
            title: " Proposal HIV - Round 09",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Proposals/SEN/Round 09/HIV/en/SNG-R09-HA_Proposal_0_en.pdf",
          },
          {
            title: " Proposal Tuberculosis - Round 07",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Proposals/SEN/Round 07/Tuberculosis/en/SNG-R07-TB_Proposal_0_en.pdf",
          },
          {
            title: " Proposal Malaria - Round 07",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Proposals/SEN/Round 07/Malaria/fr/SNG-R07-ML_Proposal_0_fr.pdf",
          },
          {
            title: " Proposal Malaria - Round 07",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Proposals/SEN/Round 07/Malaria/en/SNG-R07-ML_Proposal_0_en.pdf",
          },
          {
            title: " Proposal Tuberculosis - Round 07",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Proposals/SEN/Round 07/Tuberculosis/fr/SNG-R07-TB_Proposal_0_fr.pdf",
          },
          {
            title: " Proposal HIV - Round 06",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Proposals/SEN/Round 06/HIV/fr/SNG-R06-HA_Proposal_0_fr.pdf",
          },
          {
            title: " Proposal HIV - Round 06",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Proposals/SEN/Round 06/HIV/en/SNG-R06-HA_Proposal_0_en.pdf",
          },
          {
            title: " Proposal Malaria - Round 04",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Proposals/SEN/Round 04/Malaria/en/SNG-R04-ML_Proposal_0_en.pdf",
          },
          {
            title: " Proposal Malaria - Round 04",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Proposals/SEN/Round 04/Malaria/fr/SNG-R04-ML_Proposal_0_fr.pdf",
          },
          {
            title: " Proposal Malaria - Round 01",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Proposals/SEN/Round 01/Malaria/en/SNG-R01-ML_Proposal_0_en.pdf",
          },
          {
            title: " Proposal HIV - Round 01",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Proposals/SEN/Round 01/HIV/en/SNG-R01-HA_Proposal_0_en.pdf",
          },
        ],
      },
    ],
  },
  {
    name: "Serbia",
    count: 6,
    docCategories: [
      {
        name: "Application",
        count: 6,
        docs: [
          {
            title: " Funding Request HIV - 2018",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Funding Requests/SRB/2018/HIV/en/SRB-H_FundingRequest_0_en.zip",
          },
          {
            title: " Proposal Tuberculosis - Round 09",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Proposals/SRB/Round 09/Tuberculosis/en/SRB-R09-TB_Proposal_0_en.pdf",
          },
          {
            title: " Proposal HIV - Round 08",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Proposals/SRB/Round 08/HIV/en/SRB-R08-HA_Proposal_0_en.pdf",
          },
          {
            title: " Proposal HIV - Round 06",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Proposals/SRB/Round 06/HIV/en/SRB-R06-HA_Proposal_0_en.pdf",
          },
          {
            title: " Proposal Tuberculosis - Round 03",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Proposals/SRB/Round 03/Tuberculosis/en/SER-R03-TB_Proposal_0_en.pdf",
          },
          {
            title: " Proposal HIV - Round 01",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Proposals/SRB/Round 01/HIV/en/SER-R01-HA_Proposal_0_en.pdf",
          },
        ],
      },
    ],
  },
  {
    name: "Sierra Leone",
    count: 16,
    docCategories: [
      {
        name: "Application",
        count: 16,
        docs: [
          {
            title: " Funding Request RSSH - 2017",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Funding Requests/SLE/2017/RSSH/en/SLE-S_FundingRequest_0_en.zip",
          },
          {
            title: " Funding Request Malaria - 2017",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Funding Requests/SLE/2017/Malaria/en/SLE-M_FundingRequest_0_en.zip",
          },
          {
            title: " Funding Request HIV - 2017",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Funding Requests/SLE/2017/HIV/en/SLE-H_FundingRequest_0_en.zip",
          },
          {
            title: " Funding Request Tuberculosis - 2017",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Funding Requests/SLE/2017/Tuberculosis/en/SLE-T_FundingRequest_0_en.zip",
          },
          {
            title: " Concept Note Malaria - 2016",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Concept Notes/SLE/2016/Malaria/en/SLE-M_ConceptNote_0_en.zip",
          },
          {
            title: " Concept Note RSSH - 2015",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Concept Notes/SLE/2015/RSSH/en/SLE-S_ConceptNote_0_en.zip",
          },
          {
            title: " Concept Note TB/HIV - 2015",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Concept Notes/SLE/2015/TB_HIV/en/SLE-C_ConceptNote_0_en.zip",
          },
          {
            title: " Proposal Tuberculosis - Transitional Funding Mechanism",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Proposals/SLE/Transitional Funding Mechanism/Tuberculosis/en/SLE-TFM-TB_Proposal_0_en.pdf",
          },
          {
            title: " Proposal Malaria - Round 10",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Proposals/SLE/Round 10/Malaria/en/SLE-R10-ML_Proposal_0_en.pdf",
          },
          {
            title: " Proposal HIV - Round 09",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Proposals/SLE/Round 09/HIV/en/SLE-R09-HA_Proposal_0_en.pdf",
          },
          {
            title: " Proposal Malaria - Round 07",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Proposals/SLE/Round 07/Malaria/en/SLE-R07-ML_Proposal_0_en.pdf",
          },
          {
            title: " Proposal Tuberculosis - Round 07",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Proposals/SLE/Round 07/Tuberculosis/en/SLE-R07-TB_Proposal_0_en.pdf",
          },
          {
            title: " Proposal HIV - Round 06",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Proposals/SLE/Round 06/HIV/en/SLE-R06-HA_Proposal_0_en.pdf",
          },
          {
            title: " Proposal HIV - Round 04",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Proposals/SLE/Round 04/HIV/en/SLE-R04-HA_Proposal_0_en.pdf",
          },
          {
            title: " Proposal Malaria - Round 04",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Proposals/SLE/Round 04/Malaria/en/SLE-R04-ML_Proposal_0_en.pdf",
          },
          {
            title: " Proposal Tuberculosis - Round 02",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Proposals/SLE/Round 02/Tuberculosis/en/SLE-R02-TB_Proposal_0_en.pdf",
          },
        ],
      },
    ],
  },
  {
    name: "Solomon Islands",
    count: 8,
    docCategories: [
      {
        name: "Application",
        count: 8,
        docs: [
          {
            title: " Funding Request Malaria - 2020",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Funding Requests/SLB/2020/Malaria/en/SLB-M_FundingRequest_2_en.zip",
          },
          {
            title: " Funding Request Tuberculosis - 2020",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Funding Requests/SLB/2020/Tuberculosis/en/SLB-T_FundingRequest_0_en.zip",
          },
          {
            title: " Funding Request Malaria - 2017",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Funding Requests/SLB/2017/Malaria/en/SLB-M_FundingRequest_0_en.zip",
          },
          {
            title: " Funding Request Tuberculosis - 2017",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Funding Requests/SLB/2017/Tuberculosis/en/SLB-T_FundingRequest_0_en.zip",
          },
          {
            title: " Concept Note Tuberculosis - 2014",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Concept Notes/SLB/2014/Tuberculosis/en/SLB-T_ConceptNote_0_en.zip",
          },
          {
            title: " Concept Note Malaria - 2014",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Concept Notes/SLB/2014/Malaria/en/SLB-M_ConceptNote_0_en.zip",
          },
          {
            title: " Proposal Tuberculosis - Round 08",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Proposals/SLB/Round 08/Tuberculosis/en/SLB-R08-TB_Proposal_0_en.pdf",
          },
          {
            title: " Proposal HIV - Round 08",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Proposals/SLB/Round 08/HIV/en/SLB-R08-HA_Proposal_0_en.pdf",
          },
        ],
      },
    ],
  },
  {
    name: "Somalia",
    count: 13,
    docCategories: [
      {
        name: "Application",
        count: 13,
        docs: [
          {
            title: " Funding Request Tuberculosis - 2017",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Funding Requests/SOM/2017/Tuberculosis/en/SOM-T_FundingRequest_0_en.zip",
          },
          {
            title: " Funding Request HIV - 2017",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Funding Requests/SOM/2017/HIV/en/SOM-H_FundingRequest_0_en.zip",
          },
          {
            title: " Funding Request Malaria - 2017",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Funding Requests/SOM/2017/Malaria/en/SOM-M_FundingRequest_0_en.zip",
          },
          {
            title: " Concept Note Malaria - 2014",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Concept Notes/SOM/2014/Malaria/en/SOM-M_ConceptNote_0_en.zip",
          },
          {
            title: " Concept Note HIV - 2014",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Concept Notes/SOM/2014/HIV/en/SOM-H_ConceptNote_0_en.zip",
          },
          {
            title: " Proposal Tuberculosis - Round 10",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Proposals/SOM/Round 10/Tuberculosis/en/SOM-R10-TB_Proposal_0_en.pdf",
          },
          {
            title: " Proposal Malaria - Round 10",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Proposals/SOM/Round 10/Malaria/en/SOM-R10-ML_Proposal_0_en.pdf",
          },
          {
            title: " Proposal HIV - Round 08",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Proposals/SOM/Round 08/HIV/en/SOM-R08-HA_Proposal_0_en.pdf",
          },
          {
            title: " Proposal Tuberculosis - Round 07",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Proposals/SOM/Round 07/Tuberculosis/en/SOM-R07-TB_Proposal_0_en.pdf",
          },
          {
            title: " Proposal Malaria - Round 06",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Proposals/SOM/Round 06/Malaria/en/SOM-R06-ML_Proposal_0_en.pdf",
          },
          {
            title: " Proposal HIV - Round 04",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Proposals/SOM/Round 04/HIV/en/SOM-R04-HA_Proposal_0_en.pdf",
          },
          {
            title: " Proposal Tuberculosis - Round 03",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Proposals/SOM/Round 03/Tuberculosis/en/SOM-R03-TB_Proposal_0_en.pdf",
          },
          {
            title: " Proposal Malaria - Round 02",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Proposals/SOM/Round 02/Malaria/en/SOM-R02-ML_Proposal_0_en.pdf",
          },
        ],
      },
    ],
  },
  {
    name: "South Africa",
    count: 9,
    docCategories: [
      {
        name: "Application",
        count: 9,
        docs: [
          {
            title: " Funding Request TB/HIV - 2018",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Funding Requests/ZAF/2018/TB_HIV/en/ZAF-C_FundingRequest_0_en.zip",
          },
          {
            title: " Concept Note TB/HIV - 2015",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Concept Notes/ZAF/2015/TB_HIV/en/ZAF-C_ConceptNote_0_en.zip",
          },
          {
            title: " Proposal HIV - Round 10",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Proposals/ZAF/Round 10/HIV/en/SAF-R10-HA_Proposal_0_en.pdf",
          },
          {
            title: " Proposal HIV - Round 09",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Proposals/ZAF/Round 09/HIV/en/SAF-R09-HA_Proposal_0_en.pdf",
          },
          {
            title: " Proposal HIV - Round 06",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Proposals/ZAF/Round 06/HIV/en/SAF-R06-HA_Proposal_0_en.pdf",
          },
          {
            title: " Proposal HIV - Round 03",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Proposals/ZAF/Round 03/HIV/en/SAF-R03-HA_RCCProposal_0_en.pdf",
          },
          {
            title: " Proposal HIV - Round 03",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Proposals/ZAF/Round 03/HIV/en/SAF-R03-HA_Proposal_0_en.pdf",
          },
          {
            title: " Proposal TB/HIV - Round 02",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Proposals/ZAF/Round 02/TB_HIV/en/SAF-R02-HT_Proposal_0_en.pdf",
          },
          {
            title: " Proposal TB/HIV - Round 01",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Proposals/ZAF/Round 01/TB_HIV/en/SAF-R01-HT_Proposal_0_en.pdf",
          },
        ],
      },
    ],
  },
  {
    name: "South America",
    count: 1,
    docCategories: [
      {
        name: "Application",
        count: 1,
        docs: [
          {
            title: " Proposal Malaria - Round 03",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Proposals/QRD/Multicountry Americas (Andean)/Round 03/Malaria/en/MAA-R03-ML_Proposal_0_en.pdf",
          },
        ],
      },
    ],
  },
  {
    name: "South Sudan",
    count: 11,
    docCategories: [
      {
        name: "Application",
        count: 11,
        docs: [
          {
            title: " Funding Request Malaria - 2017",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Funding Requests/SSD/2017/Malaria/en/SSD-M_FundingRequest_0_en.zip",
          },
          {
            title: " Funding Request HIV - 2017",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Funding Requests/SSD/2017/HIV/en/SSD-H_FundingRequest_0_en.zip",
          },
          {
            title: " Funding Request Tuberculosis - 2017",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Funding Requests/SSD/2017/Tuberculosis/en/SSD-T_FundingRequest_0_en.zip",
          },
          {
            title: " Concept Note HIV - 2015",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Concept Notes/SSD/2015/HIV/en/SSD-H_ConceptNote_0_en.zip",
          },
          {
            title: " Concept Note Malaria - 2014",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Concept Notes/SSD/2014/Malaria/en/SSD-M_ConceptNote_0_en.zip",
          },
          {
            title: " Concept Note Tuberculosis - 2014",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Concept Notes/SSD/2014/Tuberculosis/en/SSD-T_ConceptNote_0_en.zip",
          },
          {
            title: " Proposal HIV - Transitional Funding Mechanism",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Proposals/SSD/Transitional Funding Mechanism/HIV/en/SSD-TFM-HA_Proposal_0_en.pdf",
          },
          {
            title: " Proposal Tuberculosis - Transitional Funding Mechanism",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Proposals/SSD/Transitional Funding Mechanism/Tuberculosis/en/SSD-TFM-TB_Proposal_0_en.pdf",
          },
          {
            title: " Proposal Malaria - Round 10",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Proposals/SSD/Round 10/Malaria/en/SSD-R10-ML_Proposal_0_en.pdf",
          },
          {
            title: " Proposal HIV - Round 04",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Proposals/SSD/Round 04/HIV/en/SSD-R04-HA_Proposal_0_en.pdf",
          },
          {
            title: " Proposal Malaria - Round 02",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Proposals/SSD/Round 02/Malaria/en/SSD-R02-ML_Proposal_0_en.pdf",
          },
        ],
      },
    ],
  },
  {
    name: "South-Eastern Asia",
    count: 6,
    docCategories: [
      {
        name: "Application",
        count: 6,
        docs: [
          {
            title: " Funding Request Malaria - 2017",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Funding Requests/QSE/Multicountry East Asia and Pacific RAI/2017/Malaria/en/QSE-M_FundingRequest_0_en.zip",
          },
          {
            title: " Concept Note HIV - 2016",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Concept Notes/QSE/2016/HIV/en/QSE-H_ConceptNote_0_en.zip",
          },
          {
            title: " Concept Note Malaria - 2013",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Concept Notes/QSE/2013/Malaria/en/QSE-M_ConceptNote_0_en.zip",
          },
          {
            title: " Concept Note Malaria - 2013",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Concept Notes/QSE/Multicountry East Asia and Pacific RAI/2013/Malaria/en/QMU-M_ConceptNote_0_en.zip",
          },
          {
            title: " Proposal HIV - Round 10",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Proposals/QSE/Multicountry East Asia and Pacific HIVOS/Round 10/HIV/en/MEI-R10-HA_Proposal_0_en.pdf",
          },
          {
            title: " Proposal HIV - Round 09",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Proposals/QSE/Multicountry South Asia/Round 09/HIV/en/MSA-R09-HA_Proposal_0_en.pdf",
          },
        ],
      },
    ],
  },
  {
    name: "Sri Lanka",
    count: 14,
    docCategories: [
      {
        name: "Application",
        count: 14,
        docs: [
          {
            title: " Funding Request HIV - 2018",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Funding Requests/LKA/2018/HIV/en/LKA-H_FundingRequest_0_en.zip",
          },
          {
            title: " Funding Request Malaria - 2018",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Funding Requests/LKA/2018/Malaria/en/LKA-M_FundingRequest_0_en.zip",
          },
          {
            title: " Funding Request Tuberculosis - 2018",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Funding Requests/LKA/2018/Tuberculosis/en/LKA-T_FundingRequest_0_en.zip",
          },
          {
            title: " Concept Note Malaria - 2015",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Concept Notes/LKA/2015/Malaria/en/LKA-M_ConceptNote_0_en.zip",
          },
          {
            title: " Concept Note HIV - 2015",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Concept Notes/LKA/2015/HIV/en/LKA-H_ConceptNote_0_en.zip",
          },
          {
            title: " Concept Note Tuberculosis - 2015",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Concept Notes/LKA/2015/Tuberculosis/en/LKA-T_ConceptNote_0_en.zip",
          },
          {
            title: " Proposal Tuberculosis - Transitional Funding Mechanism",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Proposals/LKA/Transitional Funding Mechanism/Tuberculosis/en/SRL-TFM-TB_Proposal_0_en.pdf",
          },
          {
            title: " Proposal HIV - Round 09",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Proposals/LKA/Round 09/HIV/en/SRL-R09-HA_Proposal_0_en.pdf",
          },
          {
            title: " Proposal Malaria - Round 08",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Proposals/LKA/Round 08/Malaria/en/SRL-R08-ML_Proposal_0_en.pdf",
          },
          {
            title: " Proposal Tuberculosis - Round 06",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Proposals/LKA/Round 06/Tuberculosis/en/SRL-R06-TB_Proposal_0_en.pdf",
          },
          {
            title: " Proposal HIV - Round 06",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Proposals/LKA/Round 06/HIV/en/SRL-R06-HA_Proposal_0_en.pdf",
          },
          {
            title: " Proposal Malaria - Round 04",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Proposals/LKA/Round 04/Malaria/en/SRL-R04-ML_Proposal_0_en.pdf",
          },
          {
            title: " Proposal Malaria - Round 01",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Proposals/LKA/Round 01/Malaria/en/SRL-R01-ML_Proposal_0_en.pdf",
          },
          {
            title: " Proposal Tuberculosis - Round 01",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Proposals/LKA/Round 01/Tuberculosis/en/SRL-R01-TB_Proposal_0_en.pdf",
          },
        ],
      },
    ],
  },
  {
    name: "Sudan",
    count: 13,
    docCategories: [
      {
        name: "Application",
        count: 13,
        docs: [
          {
            title: " Funding Request Multicomponent - 2020",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Funding Requests/SDN/2020/Multicomponent/en/SDN-Z_FundingRequest_2_en.zip",
          },
          {
            title: " Funding Request Multicomponent - 2017",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Funding Requests/SDN/2017/Multicomponent/en/SDN-Z_FundingRequest_0_en.zip",
          },
          {
            title: " Concept Note TB/HIV - 2014",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Concept Notes/SDN/2014/TB_HIV/en/SDN-C_ConceptNote_0_en.zip",
          },
          {
            title: " Proposal Malaria - Round 10",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Proposals/SDN/Round 10/Malaria/en/SUD-R10-ML_Proposal_0_en.pdf",
          },
          {
            title: " Proposal HIV - Round 10",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Proposals/SDN/Round 10/HIV/en/SUD-R10-HA_Proposal_0_en.pdf",
          },
          {
            title: " Proposal HIV - Round 09",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Proposals/SDN/Round 09/HIV/en/SUD-R09-HA_Proposal_0_en.pdf",
          },
          {
            title: " Proposal Tuberculosis - Round 08",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Proposals/SDN/Round 08/Tuberculosis/en/SUD-R08-TB_Proposal_0_en.pdf",
          },
          {
            title: " Proposal Tuberculosis - Round 07",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Proposals/SDN/Round 07/Tuberculosis/en/SUD-R07-TB_Proposal_0_en.pdf",
          },
          {
            title: " Proposal Malaria - Round 07",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Proposals/SDN/Round 07/Malaria/en/SUD-R07-ML_Proposal_0_en.pdf",
          },
          {
            title: " Proposal Tuberculosis - Round 05",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Proposals/SDN/Round 05/Tuberculosis/en/SUD-R05-TB_Proposal_0_en.pdf",
          },
          {
            title: " Proposal HIV - Round 05",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Proposals/SDN/Round 05/HIV/en/SUD-R05-HA_Proposal_0_en.pdf",
          },
          {
            title: " Proposal HIV - Round 03",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Proposals/SDN/Round 03/HIV/en/SUD-R03-HA_Proposal_0_en.pdf",
          },
          {
            title: " Proposal Malaria - Round 02",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Proposals/SDN/Round 02/Malaria/en/SUD-R02-ML_Proposal_0_en.pdf",
          },
        ],
      },
    ],
  },
  {
    name: "Suriname",
    count: 11,
    docCategories: [
      {
        name: "Application",
        count: 11,
        docs: [
          {
            title: " Funding Request Malaria - 2020",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Funding Requests/SUR/2020/Malaria/en/SUR-M_FundingRequest_2_en.zip",
          },
          {
            title: " Funding Request Malaria - 2017",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Funding Requests/SUR/2017/Malaria/en/SUR-M_FundingRequest_0_en.zip",
          },
          {
            title: " Funding Request TB/HIV - 2017",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Funding Requests/SUR/2017/TB_HIV/en/SUR-C_FundingRequest_0_en.zip",
          },
          {
            title: " Concept Note TB/HIV - 2015",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Concept Notes/SUR/2015/TB_HIV/en/SUR-C_ConceptNote_0_en.zip",
          },
          {
            title: " Concept Note Malaria - 2014",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Concept Notes/SUR/2014/Malaria/en/SUR-M_ConceptNote_0_en.zip",
          },
          {
            title: " Proposal HIV - Transitional Funding Mechanism",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Proposals/SUR/Transitional Funding Mechanism/HIV/en/SUR-TFM-HA_Proposal_0_en.pdf",
          },
          {
            title: " Proposal Tuberculosis - Round 09",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Proposals/SUR/Round 09/Tuberculosis/en/SUR-R09-TB_Proposal_0_en.pdf",
          },
          {
            title: " Proposal Malaria - Round 07",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Proposals/SUR/Round 07/Malaria/en/SUR-R07-ML_Proposal_0_en.pdf",
          },
          {
            title: " Proposal HIV - Round 05",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Proposals/SUR/Round 05/HIV/en/SUR-R05-HA_Proposal_0_en.pdf",
          },
          {
            title: " Proposal Malaria - Round 04",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Proposals/SUR/Round 04/Malaria/en/SUR-R04-ML_Proposal_0_en.pdf",
          },
          {
            title: " Proposal HIV - Round 03",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Proposals/SUR/Round 03/HIV/en/SUR-R03-HA_Proposal_0_en.pdf",
          },
        ],
      },
    ],
  },
  {
    name: "Syrian Arab Republic",
    count: 3,
    docCategories: [
      {
        name: "Application",
        count: 3,
        docs: [
          {
            title: " Proposal Tuberculosis - Transitional Funding Mechanism",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Proposals/SYR/Transitional Funding Mechanism/Tuberculosis/en/SYR-TFM-TB_Proposal_0_en.pdf",
          },
          {
            title: " Proposal HIV - Round 10",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Proposals/SYR/Round 10/HIV/en/SYR-R10-HA_Proposal_0_en.pdf",
          },
          {
            title: " Proposal Tuberculosis - Round 06",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Proposals/SYR/Round 06/Tuberculosis/en/SYR-R06-TB_Proposal_0_en.pdf",
          },
        ],
      },
    ],
  },
  {
    name: "Tajikistan",
    count: 19,
    docCategories: [
      {
        name: "Application",
        count: 19,
        docs: [
          {
            title: " Funding Request TB/HIV - 2020",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Funding Requests/TJK/2020/TB_HIV/en/TJK-C_FundingRequest_1_en.zip",
          },
          {
            title: " Funding Request HIV - 2017",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Funding Requests/TJK/2017/HIV/en/TJK-H_FundingRequest_0_en.zip",
          },
          {
            title: " Funding Request Tuberculosis - 2017",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Funding Requests/TJK/2017/Tuberculosis/en/TJK-T_FundingRequest_0_en.zip",
          },
          {
            title: " Concept Note HIV - 2015",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Concept Notes/TJK/2015/HIV/en/TJK-H_ConceptNote_0_en.zip",
          },
          {
            title: " Concept Note Tuberculosis - 2015",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Concept Notes/TJK/2015/Tuberculosis/en/TJK-T_ConceptNote_0_en.zip",
          },
          {
            title: " Proposal Malaria - Transitional Funding Mechanism",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Proposals/TJK/Transitional Funding Mechanism/Malaria/en/TAJ-TFM-ML_Proposal_0_en.pdf",
          },
          {
            title: " Proposal Tuberculosis - Transitional Funding Mechanism",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Proposals/TJK/Transitional Funding Mechanism/Tuberculosis/en/TAJ-TFM-TB_Proposal_0_en.pdf",
          },
          {
            title: " Proposal HIV - Transitional Funding Mechanism",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Proposals/TJK/Transitional Funding Mechanism/HIV/en/TAJ-TFM-HA_Proposal_0_en.pdf",
          },
          {
            title: " Proposal Tuberculosis - Round 08",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Proposals/TJK/Round 08/Tuberculosis/en/TAJ-R08-TB_Proposal_0_en.pdf",
          },
          {
            title: " Proposal Malaria - Round 08",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Proposals/TJK/Round 08/Malaria/en/TAJ-R08-ML_Proposal_0_en.pdf",
          },
          {
            title: " Proposal HIV - Round 08",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Proposals/TJK/Round 08/HIV/en/TAJ-R08-HA_Proposal_0_en.pdf",
          },
          {
            title: " Proposal Tuberculosis - Round 06",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Proposals/TJK/Round 06/Tuberculosis/en/TAJ-R06-TB_Proposal_0_en.pdf",
          },
          {
            title: " Proposal HIV - Round 06",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Proposals/TJK/Round 06/HIV/en/TAJ-R06-HA_Proposal_0_en.pdf",
          },
          {
            title: " Proposal Malaria - Round 05",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Proposals/TJK/Round 05/Malaria/en/TAJ-R05-ML_Proposal_0_en.pdf",
          },
          {
            title: " Proposal HIV - Round 04",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Proposals/TJK/Round 04/HIV/en/TAJ-R04-HA_Proposal_0_en.pdf",
          },
          {
            title: " Proposal Tuberculosis - Round 03",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Proposals/TJK/Round 03/Tuberculosis/en/TAJ-R03-TB_RCCProposal_0_en.pdf",
          },
          {
            title: " Proposal Tuberculosis - Round 03",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Proposals/TJK/Round 03/Tuberculosis/en/TAJ-R03-TB_Proposal_0_en.pdf",
          },
          {
            title: " Proposal Tuberculosis - Round 03",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Proposals/TJK/Round 03/Tuberculosis/ru/TAJ-R03-TB_Proposal_0_ru.pdf",
          },
          {
            title: " Proposal HIV - Round 01",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Proposals/TJK/Round 01/HIV/en/TAJ-R01-HA_Proposal_0_en.pdf",
          },
        ],
      },
    ],
  },
  {
    name: "Tanzania (United Republic)",
    count: 23,
    docCategories: [
      {
        name: "Application",
        count: 23,
        docs: [
          {
            title: " Funding Request TB/HIV - 2020",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Funding Requests/TZA/2020/TB_HIV/en/TNZ-C_FundingRequest_0_en.zip",
          },
          {
            title: " Funding Request Malaria - 2020",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Funding Requests/TZA/2020/Malaria/en/TNZ-M_FundingRequest_0_en.zip",
          },
          {
            title: " Funding Request Malaria - 2017",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Funding Requests/TZA/2017/Malaria/en/TZA-M_FundingRequest_0_en.zip",
          },
          {
            title: " Funding Request TB/HIV - 2017",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Funding Requests/TZA/2017/TB_HIV/en/TZA-C_FundingRequest_0_en.zip",
          },
          {
            title: " Funding Request RSSH - 2017",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Funding Requests/TZA/2017/RSSH/en/TZA-S_FundingRequest_0_en.zip",
          },
          {
            title: " Concept Note Malaria - 2015",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Concept Notes/TZA/2015/Malaria/en/TZA-M_ConceptNote_0_en.zip",
          },
          {
            title: " Concept Note TB/HIV - 2014",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Concept Notes/TZA/2014/TB_HIV/en/TZA-TH_ConceptNote_0_en.zip",
          },
          {
            title: " Proposal Tuberculosis - Transitional Funding Mechanism",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Proposals/TZA/Transitional Funding Mechanism/Tuberculosis/en/TNZ-TFM-TB_Proposal_0_en.pdf",
          },
          {
            title: " Proposal HIV - Round 09",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Proposals/TZA/Round 09/HIV/en/TNZ-R09-HA_Proposal_0_en.pdf",
          },
          {
            title: " Proposal Malaria - Round 09",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Proposals/TZA/Round 09/Malaria/en/TNZ-R09-ML_Proposal_0_en.pdf",
          },
          {
            title: " Proposal Malaria - Round 08",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Proposals/TZA/Round 08/Malaria/en/TNZ-R08-ML_Proposal_0_en.pdf",
          },
          {
            title: " Proposal HIV - Round 08",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Proposals/TZA/Round 08/HIV/en/TNZ-R08-HA_Proposal_0_en.pdf",
          },
          {
            title: " Proposal Malaria - Round 07",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Proposals/TZA/Round 07/Malaria/en/TNZ-R07-ML_Proposal_0_en.pdf",
          },
          {
            title: " Proposal Malaria - Round 07",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Proposals/TZA/Round 07/Malaria/en/TNZ-R07-ML_AMFmApplication_0_en.pdf",
          },
          {
            title: " Proposal Tuberculosis - Round 06",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Proposals/TZA/Round 06/Tuberculosis/en/TNZ-R06-TB_Proposal_0_en.pdf",
          },
          {
            title: " Proposal HIV - Round 04",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Proposals/TZA/Round 04/HIV/en/TNZ-R04-HA_Proposal_0_en.pdf",
          },
          {
            title: " Proposal Malaria - Round 04",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Proposals/TZA/Round 04/Malaria/en/TNZ-R04-ML_Proposal_0_en.pdf",
          },
          {
            title: " Proposal HIV - Round 04",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Proposals/TZA/Round 04/HIV/en/TNZ-R04-HA_RCCProposal_0_en.pdf",
          },
          {
            title: " Proposal Tuberculosis - Round 03",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Proposals/TZA/Round 03/Tuberculosis/en/TNZ-R03-TB_Proposal_0_en.pdf",
          },
          {
            title: " Proposal TB/HIV - Round 03",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Proposals/TZA/Round 03/TB_HIV/en/TNZ-R03-HT_Proposal_0_en.pdf",
          },
          {
            title: " Proposal Malaria - Round 01",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Proposals/TZA/Round 01/Malaria/en/TNZ-R01-ML_Proposal_0_en.pdf",
          },
          {
            title: " Proposal HIV - Round 01",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Proposals/TZA/Round 01/HIV/en/TNZ-R01-HA_Proposal_0_en.pdf",
          },
          {
            title: " Proposal Malaria - Round 01",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Proposals/TZA/Round 01/Malaria/en/TNZ-R01-ML_RCCProposal_0_en.pdf",
          },
        ],
      },
    ],
  },
  {
    name: "Thailand",
    count: 16,
    docCategories: [
      {
        name: "Application",
        count: 16,
        docs: [
          {
            title: " Funding Request TB/HIV - 2020",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Funding Requests/THA/2020/TB_HIV/en/THA-C_FundingRequest_2_en.zip",
          },
          {
            title: " Funding Request TB/HIV - 2017",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Funding Requests/THA/2017/TB_HIV/en/THA-C_FundingRequest_0_en.zip",
          },
          {
            title: " Concept Note TB/HIV - 2014",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Concept Notes/THA/2014/TB_HIV/en/THA-C_ConceptNote_0_en.zip",
          },
          {
            title: " Proposal Malaria - Round 10",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Proposals/THA/Round 10/Malaria/en/THA-R10-ML_Proposal_0_en.pdf",
          },
          {
            title: " Proposal HIV - Round 10",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Proposals/THA/Round 10/HIV/en/THA-R10-HA_Proposal_0_en.pdf",
          },
          {
            title: " Proposal Tuberculosis - Round 10",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Proposals/THA/Round 10/Tuberculosis/en/THA-R10-TB_Proposal_0_en.pdf",
          },
          {
            title: " Proposal HIV - Round 08",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Proposals/THA/Round 08/HIV/en/THA-R08-HA_Proposal_0_en.pdf",
          },
          {
            title: " Proposal Tuberculosis - Round 08",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Proposals/THA/Round 08/Tuberculosis/en/THA-R08-TB_Proposal_0_en.pdf",
          },
          {
            title: " Proposal Malaria - Round 07",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Proposals/THA/Round 07/Malaria/en/THA-R07-ML_Proposal_0_en.pdf",
          },
          {
            title: " Proposal Tuberculosis - Round 06",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Proposals/THA/Round 06/Tuberculosis/en/THA-R06-TB_Proposal_0_en.pdf",
          },
          {
            title: " Proposal HIV - Round 03",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Proposals/THA/Round 03/HIV/en/THA-R03-HA_Proposal_0_en.pdf",
          },
          {
            title: " Proposal Malaria - Round 02",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Proposals/THA/Round 02/Malaria/en/THA-R02-ML_Proposal_0_en.pdf",
          },
          {
            title: " Proposal HIV - Round 02",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Proposals/THA/Round 02/HIV/en/THA-R02-HA_Proposal_0_en.pdf",
          },
          {
            title: " Proposal Tuberculosis - Round 01",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Proposals/THA/Round 01/Tuberculosis/en/THA-R01-TB_Proposal_0_en.pdf",
          },
          {
            title: " Proposal HIV - Round 01",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Proposals/THA/Round 01/HIV/en/THA-R01-HA_RCCProposal_0_en.pdf",
          },
          {
            title: " Proposal HIV - Round 01",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Proposals/THA/Round 01/HIV/en/THA-R01-HA_Proposal_0_en.pdf",
          },
        ],
      },
    ],
  },
  {
    name: "Timor-Leste",
    count: 15,
    docCategories: [
      {
        name: "Application",
        count: 15,
        docs: [
          {
            title: " Funding Request Tuberculosis - 2020",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Funding Requests/TLS/2020/Tuberculosis/en/TLS-T_FundingRequest_0_en.zip",
          },
          {
            title: " Funding Request HIV - 2020",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Funding Requests/TLS/2020/HIV/en/TLS-H_FundingRequest_0_en.zip",
          },
          {
            title: " Funding Request HIV - 2017",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Funding Requests/TLS/2017/HIV/en/TLS-H_FundingRequest_0_en.zip",
          },
          {
            title: " Funding Request Tuberculosis - 2017",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Funding Requests/TLS/2017/Tuberculosis/en/TLS-T_FundingRequest_0_en.zip",
          },
          {
            title: " Funding Request Malaria - 2017",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Funding Requests/TLS/2017/Malaria/en/TLS-M_FundingRequest_0_en.zip",
          },
          {
            title: " Concept Note Tuberculosis - 2015",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Concept Notes/TLS/2015/Tuberculosis/en/TLS-T_ConceptNote_0_en.zip",
          },
          {
            title: " Concept Note HIV - 2015",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Concept Notes/TLS/2015/HIV/en/TLS-H_ConceptNote_0_en.zip",
          },
          {
            title: " Proposal Tuberculosis - Transitional Funding Mechanism",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Proposals/TLS/Transitional Funding Mechanism/Tuberculosis/en/TMP-TFM-TB_Proposal_0_en.pdf",
          },
          {
            title: " Proposal Malaria - Round 10",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Proposals/TLS/Round 10/Malaria/en/TMP-R10-ML_Proposal_0_en.pdf",
          },
          {
            title: " Proposal HIV - Round 10",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Proposals/TLS/Round 10/HIV/en/TMP-R10-HA_Proposal_0_en.pdf",
          },
          {
            title: " Proposal Malaria - Round 07",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Proposals/TLS/Round 07/Malaria/en/TMP-R07-ML_Proposal_0_en.pdf",
          },
          {
            title: " Proposal Tuberculosis - Round 07",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Proposals/TLS/Round 07/Tuberculosis/en/TMP-R07-TB_Proposal_0_en.pdf",
          },
          {
            title: " Proposal HIV - Round 05",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Proposals/TLS/Round 05/HIV/en/TMP-R05-HA_Proposal_0_en.pdf",
          },
          {
            title: " Proposal Tuberculosis - Round 03",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Proposals/TLS/Round 03/Tuberculosis/en/TMP-R03-TB_Proposal_0_en.pdf",
          },
          {
            title: " Proposal Malaria - Round 02",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Proposals/TLS/Round 02/Malaria/en/TMP-R02-ML_Proposal_0_en.pdf",
          },
        ],
      },
    ],
  },
  {
    name: "Togo",
    count: 17,
    docCategories: [
      {
        name: "Application",
        count: 17,
        docs: [
          {
            title: " Funding Request Malaria - 2017",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Funding Requests/TGO/2017/Malaria/en/TGO-M_FundingRequest_0_en.zip",
          },
          {
            title: " Funding Request TB/HIV - 2017",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Funding Requests/TGO/2017/TB_HIV/en/TGO-C_FundingRequest_0_en.zip",
          },
          {
            title: " Concept Note Malaria - 2015",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Concept Notes/TGO/2015/Malaria/en/TGO-M_ConceptNote_0_en.zip",
          },
          {
            title: " Concept Note TB/HIV - 2015",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Concept Notes/TGO/2015/TB_HIV/en/TGO-TH_ConceptNote_0_en.zip",
          },
          {
            title: " Proposal Tuberculosis - Transitional Funding Mechanism",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Proposals/TGO/Transitional Funding Mechanism/Tuberculosis/en/TGO-TFM-TB_Proposal_0_en.pdf",
          },
          {
            title: " Proposal Malaria - Round 09",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Proposals/TGO/Round 09/Malaria/en/TGO-R09-ML_Proposal_0_en.pdf",
          },
          {
            title: " Proposal HIV - Round 08",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Proposals/TGO/Round 08/HIV/en/TGO-R08-HA_Proposal_0_en.pdf",
          },
          {
            title: " Proposal Tuberculosis - Round 06",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Proposals/TGO/Round 06/Tuberculosis/en/TGO-R06-TB_Proposal_0_en.pdf",
          },
          {
            title: " Proposal Malaria - Round 06",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Proposals/TGO/Round 06/Malaria/en/TGO-R06-ML_Proposal_0_en.pdf",
          },
          {
            title: " Proposal Malaria - Round 04",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Proposals/TGO/Round 04/Malaria/en/TGO-R04-ML_Proposal_0_en.pdf",
          },
          {
            title: " Proposal HIV - Round 04",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Proposals/TGO/Round 04/HIV/en/TGO-R04-HA_Proposal_0_en.pdf",
          },
          {
            title: " Proposal Malaria - Round 04",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Proposals/TGO/Round 04/Malaria/fr/TGO-R04-ML_Proposal_0_fr.pdf",
          },
          {
            title: " Proposal Malaria - Round 03",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Proposals/TGO/Round 03/Malaria/en/TGO-R03-ML_Proposal_0_en.pdf",
          },
          {
            title: " Proposal Tuberculosis - Round 03",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Proposals/TGO/Round 03/Tuberculosis/en/TGO-R03-TB_Proposal_0_en.pdf",
          },
          {
            title: " Proposal Malaria - Round 03",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Proposals/TGO/Round 03/Malaria/fr/TGO-R03-ML_Proposal_0_fr.pdf",
          },
          {
            title: " Proposal Tuberculosis - Round 03",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Proposals/TGO/Round 03/Tuberculosis/fr/TGO-R03-TB_Proposal_0_fr.pdf",
          },
          {
            title: " Proposal HIV - Round 02",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Proposals/TGO/Round 02/HIV/fr/TGO-R02-HA_Proposal_0_fr.pdf",
          },
        ],
      },
    ],
  },
  {
    name: "Tunisia",
    count: 5,
    docCategories: [
      {
        name: "Application",
        count: 5,
        docs: [
          {
            title: " Funding Request HIV - 2018",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Funding Requests/TUN/2018/HIV/en/TUN-H_FundingRequest_0_en.zip",
          },
          {
            title: " Concept Note HIV - 2015",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Concept Notes/TUN/2015/HIV/en/TUN-H_ConceptNote_0_en.zip",
          },
          {
            title: " Proposal HIV - Transitional Funding Mechanism",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Proposals/TUN/Transitional Funding Mechanism/HIV/en/TUN-TFM-HA_Proposal_0_en.pdf",
          },
          {
            title: " Proposal Tuberculosis - Round 08",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Proposals/TUN/Round 08/Tuberculosis/en/TUN-R08-TB_Proposal_0_en.pdf",
          },
          {
            title: " Proposal HIV - Round 06",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Proposals/TUN/Round 06/HIV/en/TUN-R06-HA_Proposal_0_en.pdf",
          },
        ],
      },
    ],
  },
  {
    name: "Turkey",
    count: 1,
    docCategories: [
      {
        name: "Application",
        count: 1,
        docs: [
          {
            title: " Proposal HIV - Round 04",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Proposals/TUR/Round 04/HIV/en/TUR-R04-HA_Proposal_0_en.pdf",
          },
        ],
      },
    ],
  },
  {
    name: "Turkmenistan",
    count: 3,
    docCategories: [
      {
        name: "Application",
        count: 3,
        docs: [
          {
            title: " Funding Request Tuberculosis - 2017",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Funding Requests/TKM/2017/Tuberculosis/en/TKM-T_FundingRequest_0_en.zip",
          },
          {
            title: " Concept Note Tuberculosis - 2015",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Concept Notes/TKM/2015/Tuberculosis/en/TKM-T_ConceptNote_0_en.zip",
          },
          {
            title: " Proposal Tuberculosis - Round 09",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Proposals/TKM/Round 09/Tuberculosis/en/TKM-R09-TB_Proposal_0_en.pdf",
          },
        ],
      },
    ],
  },
  {
    name: "Uganda",
    count: 19,
    docCategories: [
      {
        name: "Application",
        count: 19,
        docs: [
          {
            title: " Funding Request Malaria - 2020",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Funding Requests/UGA/2020/Malaria/en/UGA-M_FundingRequest_1_en.zip",
          },
          {
            title: " Funding Request TB/HIV - 2020",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Funding Requests/UGA/2020/TB_HIV/en/UGA-C_FundingRequest_1_en.zip",
          },
          {
            title: " Funding Request Malaria - 2017",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Funding Requests/UGA/2017/Malaria/en/UGA-M_FundingRequest_0_en.zip",
          },
          {
            title: " Funding Request TB/HIV - 2017",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Funding Requests/UGA/2017/TB_HIV/en/UGA-C_FundingRequest_0_en.zip",
          },
          {
            title: " Concept Note TB/HIV - 2014",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Concept Notes/UGA/2014/TB_HIV/en/UGA-TH_ConceptNote_0_en.zip",
          },
          {
            title: " Concept Note Malaria - 2014",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Concept Notes/UGA/2014/Malaria/en/UGA-M_ConceptNote_0_en.zip",
          },
          {
            title: " Concept Note RSSH - 2014",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Concept Notes/UGA/2014/RSSH/en/UGA-S_ConceptNote_0_en.zip",
          },
          {
            title: " Proposal HIV - Round 10",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Proposals/UGA/Round 10/HIV/en/UGD-R10-HA_Proposal_0_en.pdf",
          },
          {
            title: " Proposal Tuberculosis - Round 10",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Proposals/UGA/Round 10/Tuberculosis/en/UGD-R10-TB_Proposal_0_en.pdf",
          },
          {
            title: " Proposal Malaria - Round 10",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Proposals/UGA/Round 10/Malaria/en/UGD-R10-ML_Proposal_0_en.pdf",
          },
          {
            title: " Proposal HIV - Round 07",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Proposals/UGA/Round 07/HIV/en/UGD-R07-HA_Proposal_0_en.pdf",
          },
          {
            title: " Proposal Malaria - Round 07",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Proposals/UGA/Round 07/Malaria/en/UGD-R07-ML_Proposal_0_en.pdf",
          },
          {
            title: " Proposal Tuberculosis - Round 06",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Proposals/UGA/Round 06/Tuberculosis/en/UGD-R06-TB_Proposal_0_en.pdf",
          },
          {
            title: " Proposal Malaria - Round 04",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Proposals/UGA/Round 04/Malaria/en/UGD-R04-ML_AMFmApplication_0_en.pdf",
          },
          {
            title: " Proposal Malaria - Round 04",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Proposals/UGA/Round 04/Malaria/en/UGD-R04-ML_Proposal_0_en.pdf",
          },
          {
            title: " Proposal HIV - Round 03",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Proposals/UGA/Round 03/HIV/en/UGD-R03-HA_Proposal_0_en.pdf",
          },
          {
            title: " Proposal Malaria - Round 02",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Proposals/UGA/Round 02/Malaria/en/UGD-R02-ML_Proposal_0_en.pdf",
          },
          {
            title: " Proposal Tuberculosis - Round 02",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Proposals/UGA/Round 02/Tuberculosis/en/UGD-R02-TB_Proposal_0_en.pdf",
          },
          {
            title: " Proposal HIV - Round 01",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Proposals/UGA/Round 01/HIV/en/UGD-R01-HA_Proposal_0_en.pdf",
          },
        ],
      },
    ],
  },
  {
    name: "Ukraine",
    count: 6,
    docCategories: [
      {
        name: "Application",
        count: 6,
        docs: [
          {
            title: " Funding Request TB/HIV - 2017",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Funding Requests/UKR/2017/TB_HIV/en/UKR-C_FundingRequest_0_en.zip",
          },
          {
            title: " Concept Note TB/HIV - 2014",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Concept Notes/UKR/2014/TB_HIV/en/UKR-C_ConceptNote_0_en.zip",
          },
          {
            title: " Proposal HIV - Round 10",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Proposals/UKR/Round 10/HIV/en/UKR-R10-HA_Proposal_0_en.pdf",
          },
          {
            title: " Proposal Tuberculosis - Round 09",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Proposals/UKR/Round 09/Tuberculosis/en/UKR-R09-TB_Proposal_0_en.pdf",
          },
          {
            title: " Proposal HIV - Round 06",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Proposals/UKR/Round 06/HIV/en/UKR-R06-HA_Proposal_0_en.pdf",
          },
          {
            title: " Proposal HIV - Round 01",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Proposals/UKR/Round 01/HIV/en/UKR-R01-HA_Proposal_0_en.pdf",
          },
        ],
      },
    ],
  },
  {
    name: "Uruguay",
    count: 1,
    docCategories: [
      {
        name: "Application",
        count: 1,
        docs: [
          {
            title: " Proposal HIV - Round 10",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Proposals/URY/Round 10/HIV/en/URY-R10-HA_Proposal_0_en.pdf",
          },
        ],
      },
    ],
  },
  {
    name: "Uzbekistan",
    count: 13,
    docCategories: [
      {
        name: "Application",
        count: 13,
        docs: [
          {
            title: " Funding Request HIV - 2017",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Funding Requests/UZB/2017/HIV/en/UZB-H_FundingRequest_0_en.zip",
          },
          {
            title: " Funding Request Tuberculosis - 2017",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Funding Requests/UZB/2017/Tuberculosis/en/UZB-T_FundingRequest_0_en.zip",
          },
          {
            title: " Concept Note Tuberculosis - 2015",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Concept Notes/UZB/2015/Tuberculosis/en/UZB-T_ConceptNote_0_en.zip",
          },
          {
            title: " Concept Note HIV - 2015",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Concept Notes/UZB/2015/HIV/en/UZB-H_ConceptNote_0_en.zip",
          },
          {
            title: " Concept Note Malaria - 2015",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Concept Notes/UZB/2015/Malaria/en/UZB-M_ConceptNote_0_en.zip",
          },
          {
            title: " Proposal Tuberculosis - Transitional Funding Mechanism",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Proposals/UZB/Transitional Funding Mechanism/Tuberculosis/en/UZB-TFM-TB_Proposal_0_en.pdf",
          },
          {
            title: " Proposal HIV - Round 10",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Proposals/UZB/Round 10/HIV/en/UZB-R10-HA_Proposal_0_en.pdf",
          },
          {
            title: " Proposal Tuberculosis - Round 08",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Proposals/UZB/Round 08/Tuberculosis/en/UZB-R08-TB_Proposal_0_en.pdf",
          },
          {
            title: " Proposal Malaria - Round 08",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Proposals/UZB/Round 08/Malaria/en/UZB-R08-ML_Proposal_0_en.pdf",
          },
          {
            title: " Proposal Tuberculosis - Round 04",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Proposals/UZB/Round 04/Tuberculosis/en/UZB-R04-TB_Proposal_0_en.pdf",
          },
          {
            title: " Proposal Malaria - Round 04",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Proposals/UZB/Round 04/Malaria/en/UZB-R04-ML_Proposal_0_en.pdf",
          },
          {
            title: " Proposal HIV - Round 03",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Proposals/UZB/Round 03/HIV/en/UZB-R03-HA_RCCProposal_0_en.pdf",
          },
          {
            title: " Proposal HIV - Round 03",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Proposals/UZB/Round 03/HIV/en/UZB-R03-HA_Proposal_0_en.pdf",
          },
        ],
      },
    ],
  },
  {
    name: "Viet Nam",
    count: 15,
    docCategories: [
      {
        name: "Application",
        count: 15,
        docs: [
          {
            title: " Funding Request HIV - 2017",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Funding Requests/VNM/2017/HIV/en/VNM-H_FundingRequest_0_en.zip",
          },
          {
            title: " Funding Request Tuberculosis - 2017",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Funding Requests/VNM/2017/Tuberculosis/en/VNM-T_FundingRequest_0_en.zip",
          },
          {
            title: " Concept Note Malaria - 2015",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Concept Notes/VNM/2015/Malaria/en/VNM-M_ConceptNote_0_en.zip",
          },
          {
            title: " Concept Note TB/HIV - 2014",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Concept Notes/VNM/2014/TB_HIV/en/VNM-TH_ConceptNote_0_en.zip",
          },
          {
            title: " Proposal Malaria - Transitional Funding Mechanism",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Proposals/VNM/Transitional Funding Mechanism/Malaria/en/VTN-TFM-ML_Proposal_0_en.pdf",
          },
          {
            title: " Proposal HIV - Round 10",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Proposals/VNM/Round 10/HIV/en/VTN-R10-HA_Proposal_0_en.pdf",
          },
          {
            title: " Proposal HIV - Round 09",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Proposals/VNM/Round 09/HIV/en/VTN-R09-HA_Proposal_0_en.pdf",
          },
          {
            title: " Proposal Tuberculosis - Round 09",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Proposals/VNM/Round 09/Tuberculosis/en/VTN-R09-TB_Proposal_0_en.pdf",
          },
          {
            title: " Proposal HIV - Round 08",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Proposals/VNM/Round 08/HIV/en/VTN-R08-HA_Proposal_0_en.pdf",
          },
          {
            title: " Proposal Malaria - Round 07",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Proposals/VNM/Round 07/Malaria/en/VTN-R07-ML_Proposal_0_en.pdf",
          },
          {
            title: " Proposal Tuberculosis - Round 06",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Proposals/VNM/Round 06/Tuberculosis/en/VTN-R06-TB_Proposal_0_en.pdf",
          },
          {
            title: " Proposal HIV - Round 06",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Proposals/VNM/Round 06/HIV/en/VTN-R06-HA_Proposal_0_en.pdf",
          },
          {
            title: " Proposal Malaria - Round 03",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Proposals/VNM/Round 03/Malaria/en/VTN-R03-ML_Proposal_0_en.pdf",
          },
          {
            title: " Proposal HIV - Round 01",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Proposals/VNM/Round 01/HIV/en/VTN-R01-HA_Proposal_0_en.pdf",
          },
          {
            title: " Proposal Tuberculosis - Round 01",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Proposals/VNM/Round 01/Tuberculosis/en/VTN-R01-TB_Proposal_0_en.pdf",
          },
        ],
      },
    ],
  },
  {
    name: "Western Africa",
    count: 6,
    docCategories: [
      {
        name: "Application",
        count: 6,
        docs: [
          {
            title: " Concept Note HIV - 2016",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Concept Notes/QPF/Multicountry West Africa ITPC/2016/HIV/en/QPF-H_ConceptNote_2_en.zip",
          },
          {
            title: " Concept Note TB/HIV - 2016",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Concept Notes/QPF/Multicountry Western Africa ANCS/2016/TB_HIV/en/QPF-C_ConceptNote_0_en.zip",
          },
          {
            title: " Concept Note HIV - 2016",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Concept Notes/QPF/Multicountry Western Africa HI/2016/HIV/en/QPF-H_ConceptNote_1_en.zip",
          },
          {
            title: " Concept Note HIV - 2015",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Concept Notes/QPF/Multicountry West Africa ALCO/2015/HIV/en/QPF-H_ConceptNote_0_en.zip",
          },
          {
            title: " Proposal HIV - Transitional Funding Mechanism",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Proposals/QPF/Transitional Funding Mechanism/HIV/en/MAW-TFM-HA_Proposal_0_en.pdf",
          },
          {
            title: " Proposal HIV - Round 06",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Proposals/QPF/Round 06/HIV/en/MAW-R06-HA_Proposal_0_en.pdf",
          },
        ],
      },
    ],
  },
  {
    name: "Western Asia",
    count: 1,
    docCategories: [
      {
        name: "Application",
        count: 1,
        docs: [
          {
            title: " Funding Request Multicomponent - 2018",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Funding Requests/QSF/Multicountry HIV MENA IHAA/2018/Multicomponent/en/QSF-Z_FundingRequest_0_en.zip",
          },
        ],
      },
    ],
  },
  {
    name: "World",
    count: 7,
    docCategories: [
      {
        name: "Application",
        count: 7,
        docs: [
          {
            title: " Concept Note HIV - 2016",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Concept Notes/QMZ/Multicountry EECA ECOM/2016/HIV/en/QMZ-H_ConceptNote_1_en.zip",
          },
          {
            title: " Concept Note TB/HIV - 2016",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Concept Notes/QMZ/Multicountry EECA IHAU/2016/TB_HIV/en/QMZ-C_ConceptNote_0_en.zip",
          },
          {
            title: " Concept Note HIV - 2015",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Concept Notes/QMZ/Multicountry EECA ECUO/2015/HIV/en/QMZ-H_ConceptNote_0_en.zip",
          },
          {
            title: " Concept Note Tuberculosis - 2015",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Concept Notes/QMZ/Multicountry EECA PAS/2015/Tuberculosis/en/QMZ-T_ConceptNote_0_en.zip",
          },
          {
            title: " Concept Note HIV - 2013",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Concept Notes/QMZ/Multicountry EECA EHRN/2013/HIV/en/QMT-H_ConceptNote_0_en.zip",
          },
          {
            title: " Proposal HIV - Round 10",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Proposals/QMZ/Multicountry MENA HRA/Round 10/HIV/en/MMM-R10-HA_Proposal_0_en.pdf",
          },
          {
            title: " Proposal HIV - Round 01",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Proposals/QMZ/Round 01/HIV/en/WRL-R01-HA_Proposal_0_en.pdf",
          },
        ],
      },
    ],
  },
  {
    name: "Yemen",
    count: 7,
    docCategories: [
      {
        name: "Application",
        count: 7,
        docs: [
          {
            title: " Concept Note Malaria - 2014",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Concept Notes/YEM/2014/Malaria/en/YEM-M_ConceptNote_0_en.zip",
          },
          {
            title: " Proposal HIV - Transitional Funding Mechanism",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Proposals/YEM/Transitional Funding Mechanism/HIV/en/YEM-TFM-HA_Proposal_0_en.pdf",
          },
          {
            title: " Proposal Tuberculosis - Round 09",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Proposals/YEM/Round 09/Tuberculosis/en/YEM-R09-TB_Proposal_0_en.pdf",
          },
          {
            title: " Proposal Malaria - Round 07",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Proposals/YEM/Round 07/Malaria/en/YEM-R07-ML_Proposal_0_en.pdf",
          },
          {
            title: " Proposal Tuberculosis - Round 04",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Proposals/YEM/Round 04/Tuberculosis/en/YEM-R04-TB_Proposal_0_en.pdf",
          },
          {
            title: " Proposal HIV - Round 03",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Proposals/YEM/Round 03/HIV/en/YEM-R03-HA_Proposal_0_en.pdf",
          },
          {
            title: " Proposal Malaria - Round 02",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Proposals/YEM/Round 02/Malaria/en/YEM-R02-ML_Proposal_0_en.pdf",
          },
        ],
      },
    ],
  },
  {
    name: "Zambia",
    count: 15,
    docCategories: [
      {
        name: "Application",
        count: 15,
        docs: [
          {
            title: " Funding Request Malaria - 2020",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Funding Requests/ZMB/2020/Malaria/en/ZMB-M_FundingRequest_0_en.zip",
          },
          {
            title: " Funding Request Malaria - 2017",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Funding Requests/ZMB/2017/Malaria/en/ZMB-M_FundingRequest_0_en.zip",
          },
          {
            title: " Funding Request TB/HIV - 2017",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Funding Requests/ZMB/2017/TB_HIV/en/ZMB-C_FundingRequest_0_en.zip",
          },
          {
            title: " Concept Note Malaria - 2014",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Concept Notes/ZMB/2014/Malaria/en/ZMB-M_ConceptNote_0_en.zip",
          },
          {
            title: " Concept Note TB/HIV - 2014",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Concept Notes/ZMB/2014/TB_HIV/en/ZMB-C_ConceptNote_0_en.zip",
          },
          {
            title: " Proposal Tuberculosis - Transitional Funding Mechanism",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Proposals/ZMB/Transitional Funding Mechanism/Tuberculosis/en/ZAM-TFM-TB_Proposal_0_en.pdf",
          },
          {
            title: " Proposal Malaria - Transitional Funding Mechanism",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Proposals/ZMB/Transitional Funding Mechanism/Malaria/en/ZAM-TFM-ML_Proposal_0_en.pdf",
          },
          {
            title: " Proposal HIV - Round 10",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Proposals/ZMB/Round 10/HIV/en/ZAM-R10-HA_Proposal_0_en.pdf",
          },
          {
            title: " Proposal HIV - Round 08",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Proposals/ZMB/Round 08/HIV/en/ZAM-R08-HA_Proposal_0_en.pdf",
          },
          {
            title: " Proposal Malaria - Round 07",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Proposals/ZMB/Round 07/Malaria/en/ZAM-R07-ML_Proposal_0_en.pdf",
          },
          {
            title: " Proposal HIV - Round 04",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Proposals/ZMB/Round 04/HIV/en/ZAM-R04-HA_Proposal_0_en.pdf",
          },
          {
            title: " Proposal Malaria - Round 04",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Proposals/ZMB/Round 04/Malaria/en/ZAM-R04-ML_Proposal_0_en.pdf",
          },
          {
            title: " Proposal Malaria - Round 01",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Proposals/ZMB/Round 01/Malaria/en/ZAM-R01-ML_Proposal_0_en.pdf",
          },
          {
            title: " Proposal Tuberculosis - Round 01",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Proposals/ZMB/Round 01/Tuberculosis/en/ZAM-R01-TB_Proposal_0_en.pdf",
          },
          {
            title: " Proposal HIV - Round 01",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Proposals/ZMB/Round 01/HIV/en/ZAM-R01-HA_Proposal_0_en.pdf",
          },
        ],
      },
    ],
  },
  {
    name: "Zanzibar",
    count: 14,
    docCategories: [
      {
        name: "Application",
        count: 14,
        docs: [
          {
            title: " Funding Request TB/HIV - 2020",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Funding Requests/QNB/2020/TB_HIV/en/QNB-C_FundingRequest_1_en.zip",
          },
          {
            title: " Funding Request Malaria - 2020",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Funding Requests/QNB/2020/Malaria/en/QNB-M_FundingRequest_1_en.zip",
          },
          {
            title: " Funding Request TB/HIV - 2017",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Funding Requests/QNB/2017/TB_HIV/en/QNB-C_FundingRequest_0_en.zip",
          },
          {
            title: " Funding Request Malaria - 2017",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Funding Requests/QNB/2017/Malaria/en/QNB-M_FundingRequest_0_en.zip",
          },
          {
            title: " Concept Note TB/HIV - 2015",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Concept Notes/QNB/2015/TB_HIV/en/QNB-C_ConceptNote_0_en.zip",
          },
          {
            title: " Concept Note Malaria - 2015",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Concept Notes/QNB/2015/Malaria/en/QNB-M_ConceptNote_0_en.zip",
          },
          {
            title: " Proposal Tuberculosis - Round 10",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Proposals/QNB/Round 10/Tuberculosis/en/ZAN-R10-TB_Proposal_0_en.pdf",
          },
          {
            title: " Proposal Malaria - Round 08",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Proposals/QNB/Round 08/Malaria/en/ZAN-R08-ML_Proposal_0_en.pdf",
          },
          {
            title: " Proposal Malaria - Round 08",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Proposals/QNB/Round 08/Malaria/en/ZAN-R08-ML_AMFmApplication_0_en.pdf",
          },
          {
            title: " Proposal HIV - Round 06",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Proposals/QNB/Round 06/HIV/en/ZAN-R06-HA_Proposal_0_en.pdf",
          },
          {
            title: " Proposal Malaria - Round 04",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Proposals/QNB/Round 04/Malaria/en/ZAN-R04-ML_Proposal_0_en.pdf",
          },
          {
            title: " Proposal Tuberculosis - Round 03",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Proposals/QNB/Round 03/Tuberculosis/en/ZAN-R03-TB_Proposal_0_en.pdf",
          },
          {
            title: " Proposal HIV - Round 02",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Proposals/QNB/Round 02/HIV/en/ZAN-R02-HA_Proposal_0_en.pdf",
          },
          {
            title: " Proposal Malaria - Round 01",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Proposals/QNB/Round 01/Malaria/en/ZAN-R01-ML_Proposal_0_en.pdf",
          },
        ],
      },
    ],
  },
  {
    name: "Zimbabwe",
    count: 14,
    docCategories: [
      {
        name: "Application",
        count: 14,
        docs: [
          {
            title: " Funding Request TB/HIV - 2017",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Funding Requests/ZWE/2017/TB_HIV/en/ZWE-C_FundingRequest_0_en.zip",
          },
          {
            title: " Funding Request Malaria - 2017",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Funding Requests/ZWE/2017/Malaria/en/ZWE-M_FundingRequest_0_en.zip",
          },
          {
            title: " Concept Note HIV - 2015",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Concept Notes/ZWE/2015/HIV/en/ZWE-H_ConceptNote_0_en.zip",
          },
          {
            title: " Concept Note Malaria - 2014",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Concept Notes/ZWE/2014/Malaria/en/ZWE-M_ConceptNote_0_en.zip",
          },
          {
            title: " Concept Note Tuberculosis - 2014",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Concept Notes/ZWE/2014/Tuberculosis/en/ZWE-T_ConceptNote_0_en.zip",
          },
          {
            title: " Proposal Malaria - Round 10",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Proposals/ZWE/Round 10/Malaria/en/ZIM-R10-ML_Proposal_0_en.pdf",
          },
          {
            title: " Proposal Malaria - Round 08",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Proposals/ZWE/Round 08/Malaria/en/ZIM-R08-ML_Proposal_0_en.pdf",
          },
          {
            title: " Proposal Tuberculosis - Round 08",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Proposals/ZWE/Round 08/Tuberculosis/en/ZIM-R08-TB_Proposal_0_en.pdf",
          },
          {
            title: " Proposal HIV - Round 08",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Proposals/ZWE/Round 08/HIV/en/ZIM-R08-HA_Proposal_0_en.pdf",
          },
          {
            title: " Proposal Malaria - Round 05",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Proposals/ZWE/Round 05/Malaria/en/ZIM-R05-ML_Proposal_0_en.pdf",
          },
          {
            title: " Proposal Tuberculosis - Round 05",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Proposals/ZWE/Round 05/Tuberculosis/en/ZIM-R05-TB_Proposal_0_en.pdf",
          },
          {
            title: " Proposal HIV - Round 05",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Proposals/ZWE/Round 05/HIV/en/ZIM-R05-HA_Proposal_0_en.pdf",
          },
          {
            title: " Proposal Malaria - Round 01",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Proposals/ZWE/Round 01/Malaria/en/ZIM-R01-ML_Proposal_0_en.pdf",
          },
          {
            title: " Proposal HIV - Round 01",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Proposals/ZWE/Round 01/HIV/en/ZIM-R01-HA_Proposal_0_en.pdf",
          },
        ],
      },
    ],
  },
];
