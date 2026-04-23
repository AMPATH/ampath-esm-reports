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
  dc__gender__M__revisit_to_clinic_known_dm: number;
  dc__gender__F__revisit_to_clinic_known_dm: number;
  dc__gender__M__total_type_1_diabetes: number;
  dc__gender__F__total_type_1_diabetes: number;
  dc__gender__M__total_type_2_diabetes: number;
  dc__gender__F__total_type_2_diabetes: number;
  dc__gender__M__cumulative_htn_patient: number;
  dc__gender__F__cumulative_htn_patient: number;
  dc__gender__F__newly_diagnosed_htn_this_month: number;
  dc__gender__M__newly_diagnosed_htn_this_month: number;
  dc__gender__M__revisit_known_htn: number;
  dc__gender__F__revisit_known_htn: number;
  dc__gender__M__is_co_morbid: number;
  dc__gender__F__is_co_morbid: number;
  dc__gender__F__revisit_known_co_morbid: number;
  dc__gender__M__revisit_known_co_morbid: number;
  dc__gender__M__newly_diagnosed_co_morbid_this_month: number;
  dc__gender__F__newly_diagnosed_co_morbid_this_month: number;
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
  dc__gender__M__screened_for_tb_this_month: number;
  dc__gender__F__screened_for_tb_this_month: number;
  dc__gender__M__screened_postive_for_tb_this_month: number;
  dc__gender__F__screened_postive_for_tb_this_month: number;
  dc__gender__M__covered_by_shif: number;
  dc__gender__F__covered_by_shif: number;
  dc__gender__M__screened_for_diabetic_foot_this_month: number;
  dc__gender__F__screened_for_diabetic_foot_this_month: number;
  dc__gender__M__has_diabetic_foot: number;
  dc__gender__F__has_diabetic_foot: number;
  dc__gender__M__amputation_due_to_diabetic_foot: number;
  dc__gender__F__amputation_due_to_diabetic_foot: number;
  dc__gender__M__stroke_diagnosis: number;
  dc__gender__F__stroke_diagnosis: number;
  dc__gender__M__ischemic_heart_disease_diagnosis: number;
  dc__gender__F__ischemic_heart_disease_diagnosis: number;
  dc__gender__M__heart_failure_diagnosis: number;
  dc__gender__F__heart_failure_diagnosis: number;
  dc__gender__M__has_neuropathies: number;
  dc__gender__F__has_neuropathies: number;
  dc__gender__M__age_range__0_to_5__type_1_diabetes_mellitus: number;
  dc__gender__F__age_range__0_to_5__type_1_diabetes_mellitus: number;
  dc__gender__M__age_range__6_to_9__type_1_diabetes_mellitus: number;
  dc__gender__F__age_range__6_to_9__type_1_diabetes_mellitus: number;
  dc__gender__M__age_range__10_to_19__type_1_diabetes_mellitus: number;
  dc__gender__F__age_range__10_to_19__type_1_diabetes_mellitus: number;
  dc__gender__M__age_range__20_to_35__type_1_diabetes_mellitus: number;
  dc__gender__F__age_range__20_to_35__type_1_diabetes_mellitus: number;
  dc__gender__M__age_range__36_and_above__type_1_diabetes_mellitus: number;
  dc__gender__F__age_range__36_and_above__type_1_diabetes_mellitus: number;
  dc__gender__M__age_range__0_to_18__type_2_diabetes_mellitus: number;
  dc__gender__F__age_range__0_to_18__type_2_diabetes_mellitus: number;
  dc__gender__M__age_range__19_to_35__type_2_diabetes_mellitus: number;
  dc__gender__F__age_range__19_to_35__type_2_diabetes_mellitus: number;
  dc__gender__M__age_range__36_to_60__type_2_diabetes_mellitus: number;
  dc__gender__F__age_range__36_to_60__type_2_diabetes_mellitus: number;
  dc__gender__M__age_range__61_and_above__type_2_diabetes_mellitus: number;
  dc__gender__F__age_range__61_and_above__type_2_diabetes_mellitus: number;
};

export type Moh740Resp = {
  result: [Moh740Data];
};

export type Moh270Patient = {
  gender: string;
  amrs_universal_id: string;
  encounter_date: string;
  endDate: string;
  covered_by_shif: number;
  patient_uuid: string;
  birthdate: string;
  person_name: string;
  phone_number: string;
  county: string;
  sub_county: string;
  ward: string;
  landmark: string;
  patient_no: string;
  contact_of_the_treatment_supporter_and_relationship: string;
  diagnosis_at_enrolment: string;
  year_of_diagnosis: string;
  complications_at_enrollment: string;
};

export type Moh740RegisterDto = {
  endDate: string;
  locationUuid: string;
  indicators: string;
};

export type Moh740RegisterResp = {
  result: Moh270Patient[];
};
