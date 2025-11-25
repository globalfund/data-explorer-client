export interface PolylineTreeDataItem {
  name: string;
  value?: number;
  itemStyle?: {
    color: string;
  };
  children?: PolylineTreeDataItem[];
}

export interface PolylineTreeProps {
  data: PolylineTreeDataItem;
}

export const STORY_DATA_VARIANT_1: PolylineTreeDataItem = {
  name: "2022",
  children: [
    {
      name: "HIV",
      children: [
        {
          name: "Total number of HIV tests",
          value: 53074640,
          itemStyle: {
            color: "#0A2840",
          },
        },
        {
          name: "Pregnant women who know their HIV status",
          value: 43943450,
          itemStyle: {
            color: "#0A2840",
          },
        },
        {
          name: "People on antiretroviral therapy for HIV",
          value: 24471293,
          itemStyle: {
            color: "#0A2840",
          },
        },
        {
          name: "Young people aged 10-24 years reached by comprehensive sexuality education and/or life skills-based HIV education in or out of schools",
          value: 4001648,
          itemStyle: {
            color: "#0A2840",
          },
        },
        {
          name: "Adolescent girls and young women (AGYW) reached with HIV prevention programs services",
          value: 3566170,
          itemStyle: {
            color: "#0A2840",
          },
        },
        {
          name: "Sex workers reached with HIV prevention programs",
          value: 2731926,
          itemStyle: {
            color: "#0A2840",
          },
        },
        {
          name: "Pregnant women tested for syphilis",
          value: 2647380,
          itemStyle: {
            color: "#0A2840",
          },
        },
        {
          name: "Men who have sex with men reached with HIV prevention programs",
          value: 2605902,
          itemStyle: {
            color: "#0A2840",
          },
        },
        {
          name: "Number of HIV tests taken among men who have sex with men",
          value: 2408640,
          itemStyle: {
            color: "#0A2840",
          },
        },
        {
          name: "Number of HIV tests taken among other vulnerable population",
          value: 2294467,
          itemStyle: {
            color: "#0A2840",
          },
        },
        {
          name: "Number of HIV tests taken among sex workers",
          value: 2198995,
          itemStyle: {
            color: "#0A2840",
          },
        },
        {
          name: "Number of HIV tests taken among adolescents and youth",
          value: 2127567,
          itemStyle: {
            color: "#0A2840",
          },
        },
        {
          name: "Number of HIV tests taken among prisoners",
          value: 1532177,
          itemStyle: {
            color: "#0A2840",
          },
        },
        {
          name: "Number of HIV positive tests",
          value: 1294853,
          itemStyle: {
            color: "#0A2840",
          },
        },
        {
          name: "People who use drugs reached with HIV prevention programs",
          value: 1083995,
          itemStyle: {
            color: "#0A2840",
          },
        },
        {
          name: "Number of HIV tests taken among people who use drugs",
          value: 1034576,
          itemStyle: {
            color: "#0A2840",
          },
        },
        {
          name: "Other vulnerable populations reached with HIV prevention programs",
          value: 836845,
          itemStyle: {
            color: "#0A2840",
          },
        },
        {
          name: "Medical male circumcisions",
          value: 830749,
          itemStyle: {
            color: "#0A2840",
          },
        },
        {
          name: "HIV-positive pregnant women who received ART during pregnancy",
          value: 710418,
          itemStyle: {
            color: "#0A2840",
          },
        },
        {
          name: "Care and support services provided to people living with HIV",
          value: 512946,
          itemStyle: {
            color: "#0A2840",
          },
        },
        {
          name: "Infants tested for HIV",
          value: 473415,
          itemStyle: {
            color: "#0A2840",
          },
        },
        {
          name: "People newly diagnosed with HIV initiated on ART",
          value: 418533,
          itemStyle: {
            color: "#0A2840",
          },
        },
        {
          name: "Prisoners reached with HIV prevention programs",
          value: 204054,
          itemStyle: {
            color: "#0A2840",
          },
        },
        {
          name: "Sex workers who initiated oral antiretroviral pre-exposure prophylaxis",
          value: 198592,
          itemStyle: {
            color: "#0A2840",
          },
        },
        {
          name: "Transgender people reached with HIV prevention programs",
          value: 159092,
          itemStyle: {
            color: "#0A2840",
          },
        },
        {
          name: "Number of HIV tests taken among transgender population",
          value: 149303,
          itemStyle: {
            color: "#0A2840",
          },
        },
        {
          name: "Men who have sex with men who initiated oral antiretroviral pre-exposure prophylaxis",
          value: 61811,
          itemStyle: {
            color: "#0A2840",
          },
        },
        {
          name: "People receiving Opioid Substitution Therapy",
          value: 60441,
          itemStyle: {
            color: "#0A2840",
          },
        },
        {
          name: "People aged 10–24 years reached with HIV prevention programs",
          value: 45863,
          itemStyle: {
            color: "#0A2840",
          },
        },
        {
          name: "Adolescent girls and young women who initiated oral antiretroviral pre-exposure prophylaxis",
          value: 44273,
          itemStyle: {
            color: "#0A2840",
          },
        },
        {
          name: "People using pre-exposure prophylaxis",
          value: 30167,
          itemStyle: {
            color: "#0A2840",
          },
        },
        {
          name: "Transgender people who initiated oral antiretroviral pre-exposure prophylaxis",
          value: 3134,
          itemStyle: {
            color: "#0A2840",
          },
        },
      ],
      itemStyle: {
        color: "#0A2840",
      },
    },
    {
      name: "Malaria",
      children: [
        {
          name: "Suspected malaria cases that received a parasitological test",
          value: 321018609,
          itemStyle: {
            color: "#013E77",
          },
        },
        {
          name: "Insecticide-treated mosquito nets distributed",
          value: 219678398,
          itemStyle: {
            color: "#013E77",
          },
        },
        {
          name: "Cases of malaria treated",
          value: 165297849,
          itemStyle: {
            color: "#013E77",
          },
        },
        {
          name: "Children who received seasonal malaria chemoprophylaxis",
          value: 37103714,
          itemStyle: {
            color: "#013E77",
          },
        },
        {
          name: "Population covered by Indoor Residual Spraying",
          value: 18516771,
          itemStyle: {
            color: "#013E77",
          },
        },
        {
          name: "Pregnant women attending antenatal clinics who received intermittent preventive treatment for malaria",
          value: 14620922,
          itemStyle: {
            color: "#013E77",
          },
        },
        {
          name: "Households covered by Indoor Residual Spraying",
          value: 8451212,
          itemStyle: {
            color: "#013E77",
          },
        },
        {
          name: "Confirmed malaria cases fully investigated and classified",
          value: 78347,
          itemStyle: {
            color: "#013E77",
          },
        },
        {
          name: "Malaria foci fully investigated and classified",
          value: 38227,
          itemStyle: {
            color: "#013E77",
          },
        },
      ],
      itemStyle: {
        color: "#013E77",
      },
    },
    {
      name: "Tuberculosis",
      children: [
        {
          name: "People with TB treated",
          value: 6670422,
          itemStyle: {
            color: "#00B5AE",
          },
        },
        {
          name: "People in contact with TB patients received preventive therapy",
          value: 1542219,
          itemStyle: {
            color: "#00B5AE",
          },
        },
        {
          name: "TB patients with drug-susceptibility testing result for at least Rifampicin",
          value: 961896,
          itemStyle: {
            color: "#00B5AE",
          },
        },
        {
          name: "TB patients tested using WHO recommended rapid tests",
          value: 875351,
          itemStyle: {
            color: "#00B5AE",
          },
        },
        {
          name: "Rifampicin- and/or multidrug-resistant TB cases that began second-line treatment",
          value: 118075,
          itemStyle: {
            color: "#00B5AE",
          },
        },
        {
          name: "Care and support services provided to TB patients",
          value: 93538,
          itemStyle: {
            color: "#00B5AE",
          },
        },
        {
          name: "Rifampicin- and/or multidrug-resistant TB cases notified",
          value: 70621,
          itemStyle: {
            color: "#00B5AE",
          },
        },
        {
          name: "People with extensively drug-resistant TB on treatment",
          value: 435,
          itemStyle: {
            color: "#00B5AE",
          },
        },
      ],
      itemStyle: {
        color: "#00B5AE",
      },
    },
    {
      name: "TB/HIV",
      children: [
        {
          name: "People living with HIV in care screened for TB",
          value: 3989358,
          itemStyle: {
            color: "#C3EDFD",
          },
        },
        {
          name: "TB patients with documented HIV status",
          value: 2230611,
          itemStyle: {
            color: "#C3EDFD",
          },
        },
        {
          name: "People living with HIV on ART who initiated TB preventive therapy",
          value: 2202957,
          itemStyle: {
            color: "#C3EDFD",
          },
        },
        {
          name: "HIV-positive TB patients on antiretroviral therapy during TB treatment",
          value: 331349,
          itemStyle: {
            color: "#C3EDFD",
          },
        },
      ],
      itemStyle: {
        color: "#C3EDFD",
      },
    },
    {
      name: "RSSH",
      children: [
        {
          name: "Number of iCCM conditions treated among children under five in target areas",
          value: 2239104,
          itemStyle: {
            color: "#D9D9D9",
          },
        },
        {
          name: "Number of community based organizations that received a pre-defined package of training",
          value: 109,
          itemStyle: {
            color: "#D9D9D9",
          },
        },
      ],
      itemStyle: {
        color: "#D9D9D9",
      },
    },
  ],
};
