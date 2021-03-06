enum Status {
  AC = 'AWAITING_CREDENTIALS',
  RFR = 'READY_FOR_REVIEW',
  UR = 'UNDER_REVIEW',
  AD = 'AWAITING_DECISION',
  A = 'APPROVED',
  D = 'DENIED'
}

enum StaffStatus {
  ACTIVE = 'ACTIVE',
  AFFILIATE = 'AFFILIATE',
  ASSOCIATE = 'ASSOCIATE',
  COMMUNITY = 'COMMUNITY',
  CONSULTING = 'CONSULTING',
  COURTESY = 'COURTESY',
  FACULTY = 'FACULTY',
  HONORARY = 'HONORARY',
  HOSPITALIST = 'HOSPITALIST',
  HOUSE_STAFF = 'HOUSE_STAFF',
  LOCUM_TENENS = 'LOCUM_TENENS',
  PROVISIONAL = 'PROVISIONAL',
  RESIDENT = 'RESIDENT',
  TEACHING = 'TEACHING'
}

enum ProvideType {
  APRN = 'APRN',
  ARNP = 'ARNP',
  CNS = 'CNS',
  CRNA = 'CRNA',
  DC = 'DC',
  DDS = 'DDS',
  DMD = 'DMD',
  DO = 'DO',
  DPM = 'DPM',
  LCMFT = 'LCMFT',
  LCMHC = 'LCMHC',
  LCP = 'LCP',
  LCPC = 'LCPC',
  MD = 'MD',
  NP = 'NP',
  PA = 'PA'
}

enum stage {
  DONE = 'DONE',
  PENDING = 'PENDING'
};

export {
  Status,
  StaffStatus,
  ProvideType,
  stage
}
