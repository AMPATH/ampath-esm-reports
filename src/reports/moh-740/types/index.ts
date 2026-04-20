export type ReportFilters = { startDate?: string; endDate?: string; month?: string };

export type Moh740Dto = {
  endDate: string;
  locationUuid: string;
};

export type Moh740Data = {
  location_id: number;
  dc__gender__M__cumulative_diabetes_patients_in_care: number;
  dc__gender__F__cumulative_diabetes_patients_in_care: number;
  dc__gender__M__newly_diagnosed_diabetes: number;
  dc__gender__F__newly_diagnosed_diabetes: number;
  dc__gender__M__total_type_1_diabetes: number;
  dc__gender__F__total_type_1_diabetes: number;
  dc__gender__M__total_type_2_diabetes: number;
  dc__gender__F__total_type_2_diabetes: number;
  dc__gender__M__cumulative_htn_patient: number;
  dc__gender__F__cumulative_htn_patient: number;
  dc__gender__M__age_range__10_to_19__diabetes_mellitus_type__diabetes_mellitus_type_1__total: number;
  dc__gender__M__age_range__10_to_19__has_htn: number;
  dc__gender__F__age_range__10_to_19__has_htn: number;
  dc__gender__M__age_range__19_to_35__has_htn: number;
  dc__gender__F__age_range__19_to_35__has_htn: number;
  dc__gender__M__age_range__36_to_60__has_htn: number;
  dc__gender__F__age_range__36_to_60__has_htn: number;
  dc__gender__M__age_range__60_and_above__has_htn: number;
  dc__gender__F__age_range__60_and_above__has_htn: number;
  dc__gender__M__age_range__10_to_19__total: number;
};

export type Moh740Resp = {
  result: [Moh740Data];
};
