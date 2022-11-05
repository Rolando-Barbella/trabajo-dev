/* tslint:disable */
/* eslint-disable */
//  This file was automatically generated and should not be edited.

export type CreateCompanyInput = {
  id?: string | null,
  name: string,
  image?: S3ObjectInput | null,
  description?: string | null,
  userId: string,
  jobTitle?: string | null,
  salary?: string | null,
};

export type S3ObjectInput = {
  bucket: string,
  region: string,
  key: string,
};

export type ModelCompanyConditionInput = {
  name?: ModelStringInput | null,
  description?: ModelStringInput | null,
  userId?: ModelIDInput | null,
  jobTitle?: ModelStringInput | null,
  salary?: ModelStringInput | null,
  and?: Array< ModelCompanyConditionInput | null > | null,
  or?: Array< ModelCompanyConditionInput | null > | null,
  not?: ModelCompanyConditionInput | null,
};

export type ModelStringInput = {
  ne?: string | null,
  eq?: string | null,
  le?: string | null,
  lt?: string | null,
  ge?: string | null,
  gt?: string | null,
  contains?: string | null,
  notContains?: string | null,
  between?: Array< string | null > | null,
  beginsWith?: string | null,
  attributeExists?: boolean | null,
  attributeType?: ModelAttributeTypes | null,
  size?: ModelSizeInput | null,
};

export enum ModelAttributeTypes {
  binary = "binary",
  binarySet = "binarySet",
  bool = "bool",
  list = "list",
  map = "map",
  number = "number",
  numberSet = "numberSet",
  string = "string",
  stringSet = "stringSet",
  _null = "_null",
}


export type ModelSizeInput = {
  ne?: number | null,
  eq?: number | null,
  le?: number | null,
  lt?: number | null,
  ge?: number | null,
  gt?: number | null,
  between?: Array< number | null > | null,
};

export type ModelIDInput = {
  ne?: string | null,
  eq?: string | null,
  le?: string | null,
  lt?: string | null,
  ge?: string | null,
  gt?: string | null,
  contains?: string | null,
  notContains?: string | null,
  between?: Array< string | null > | null,
  beginsWith?: string | null,
  attributeExists?: boolean | null,
  attributeType?: ModelAttributeTypes | null,
  size?: ModelSizeInput | null,
};

export type Company = {
  __typename: "Company",
  id: string,
  name: string,
  image?: S3Object | null,
  description?: string | null,
  userId: string,
  jobTitle?: string | null,
  salary?: string | null,
  createdAt: string,
  updatedAt: string,
};

export type S3Object = {
  __typename: "S3Object",
  bucket: string,
  region: string,
  key: string,
};

export type UpdateCompanyInput = {
  id: string,
  name?: string | null,
  image?: S3ObjectInput | null,
  description?: string | null,
  userId?: string | null,
  jobTitle?: string | null,
  salary?: string | null,
};

export type DeleteCompanyInput = {
  id: string,
};

export type CreateJobInput = {
  id?: string | null,
  companyName: string,
  title: string,
  logo?: S3ObjectInput | null,
  description: string,
  userId: string,
  salary: string,
  hiringSteps: number,
  hiringStepDescription?: string | null,
  typeOfCodingChallenge?: string | null,
  typeOfWork: string,
  timeZone: string,
  role: string,
  skills: Array< string | null >,
};

export type ModelJobConditionInput = {
  companyName?: ModelStringInput | null,
  title?: ModelStringInput | null,
  description?: ModelStringInput | null,
  userId?: ModelIDInput | null,
  salary?: ModelStringInput | null,
  hiringSteps?: ModelIntInput | null,
  hiringStepDescription?: ModelStringInput | null,
  typeOfCodingChallenge?: ModelStringInput | null,
  typeOfWork?: ModelStringInput | null,
  timeZone?: ModelStringInput | null,
  role?: ModelStringInput | null,
  skills?: ModelStringInput | null,
  and?: Array< ModelJobConditionInput | null > | null,
  or?: Array< ModelJobConditionInput | null > | null,
  not?: ModelJobConditionInput | null,
};

export type ModelIntInput = {
  ne?: number | null,
  eq?: number | null,
  le?: number | null,
  lt?: number | null,
  ge?: number | null,
  gt?: number | null,
  between?: Array< number | null > | null,
  attributeExists?: boolean | null,
  attributeType?: ModelAttributeTypes | null,
};

export type Job = {
  __typename: "Job",
  id: string,
  companyName: string,
  title: string,
  logo?: S3Object | null,
  description: string,
  userId: string,
  salary: string,
  hiringSteps: number,
  hiringStepDescription?: string | null,
  typeOfCodingChallenge?: string | null,
  typeOfWork: string,
  timeZone: string,
  role: string,
  skills: Array< string | null >,
  createdAt: string,
  updatedAt: string,
};

export type UpdateJobInput = {
  id: string,
  companyName?: string | null,
  title?: string | null,
  logo?: S3ObjectInput | null,
  description?: string | null,
  userId?: string | null,
  salary?: string | null,
  hiringSteps?: number | null,
  hiringStepDescription?: string | null,
  typeOfCodingChallenge?: string | null,
  typeOfWork?: string | null,
  timeZone?: string | null,
  role?: string | null,
  skills?: Array< string | null > | null,
};

export type DeleteJobInput = {
  id: string,
};

export type ModelCompanyFilterInput = {
  id?: ModelIDInput | null,
  name?: ModelStringInput | null,
  description?: ModelStringInput | null,
  userId?: ModelIDInput | null,
  jobTitle?: ModelStringInput | null,
  salary?: ModelStringInput | null,
  and?: Array< ModelCompanyFilterInput | null > | null,
  or?: Array< ModelCompanyFilterInput | null > | null,
  not?: ModelCompanyFilterInput | null,
};

export type ModelCompanyConnection = {
  __typename: "ModelCompanyConnection",
  items:  Array<Company | null >,
  nextToken?: string | null,
};

export type ModelJobFilterInput = {
  id?: ModelIDInput | null,
  companyName?: ModelStringInput | null,
  title?: ModelStringInput | null,
  description?: ModelStringInput | null,
  userId?: ModelIDInput | null,
  salary?: ModelStringInput | null,
  hiringSteps?: ModelIntInput | null,
  hiringStepDescription?: ModelStringInput | null,
  typeOfCodingChallenge?: ModelStringInput | null,
  typeOfWork?: ModelStringInput | null,
  timeZone?: ModelStringInput | null,
  role?: ModelStringInput | null,
  skills?: ModelStringInput | null,
  and?: Array< ModelJobFilterInput | null > | null,
  or?: Array< ModelJobFilterInput | null > | null,
  not?: ModelJobFilterInput | null,
};

export type ModelJobConnection = {
  __typename: "ModelJobConnection",
  items:  Array<Job | null >,
  nextToken?: string | null,
};

export type CreateCompanyMutationVariables = {
  input: CreateCompanyInput,
  condition?: ModelCompanyConditionInput | null,
};

export type CreateCompanyMutation = {
  createCompany?:  {
    __typename: "Company",
    id: string,
    name: string,
    image?:  {
      __typename: "S3Object",
      bucket: string,
      region: string,
      key: string,
    } | null,
    description?: string | null,
    userId: string,
    jobTitle?: string | null,
    salary?: string | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type UpdateCompanyMutationVariables = {
  input: UpdateCompanyInput,
  condition?: ModelCompanyConditionInput | null,
};

export type UpdateCompanyMutation = {
  updateCompany?:  {
    __typename: "Company",
    id: string,
    name: string,
    image?:  {
      __typename: "S3Object",
      bucket: string,
      region: string,
      key: string,
    } | null,
    description?: string | null,
    userId: string,
    jobTitle?: string | null,
    salary?: string | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type DeleteCompanyMutationVariables = {
  input: DeleteCompanyInput,
  condition?: ModelCompanyConditionInput | null,
};

export type DeleteCompanyMutation = {
  deleteCompany?:  {
    __typename: "Company",
    id: string,
    name: string,
    image?:  {
      __typename: "S3Object",
      bucket: string,
      region: string,
      key: string,
    } | null,
    description?: string | null,
    userId: string,
    jobTitle?: string | null,
    salary?: string | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type CreateJobMutationVariables = {
  input: CreateJobInput,
  condition?: ModelJobConditionInput | null,
};

export type CreateJobMutation = {
  createJob?:  {
    __typename: "Job",
    id: string,
    companyName: string,
    title: string,
    logo?:  {
      __typename: "S3Object",
      bucket: string,
      region: string,
      key: string,
    } | null,
    description: string,
    userId: string,
    salary: string,
    hiringSteps: number,
    hiringStepDescription?: string | null,
    typeOfCodingChallenge?: string | null,
    typeOfWork: string,
    timeZone: string,
    role: string,
    skills: Array< string | null >,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type UpdateJobMutationVariables = {
  input: UpdateJobInput,
  condition?: ModelJobConditionInput | null,
};

export type UpdateJobMutation = {
  updateJob?:  {
    __typename: "Job",
    id: string,
    companyName: string,
    title: string,
    logo?:  {
      __typename: "S3Object",
      bucket: string,
      region: string,
      key: string,
    } | null,
    description: string,
    userId: string,
    salary: string,
    hiringSteps: number,
    hiringStepDescription?: string | null,
    typeOfCodingChallenge?: string | null,
    typeOfWork: string,
    timeZone: string,
    role: string,
    skills: Array< string | null >,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type DeleteJobMutationVariables = {
  input: DeleteJobInput,
  condition?: ModelJobConditionInput | null,
};

export type DeleteJobMutation = {
  deleteJob?:  {
    __typename: "Job",
    id: string,
    companyName: string,
    title: string,
    logo?:  {
      __typename: "S3Object",
      bucket: string,
      region: string,
      key: string,
    } | null,
    description: string,
    userId: string,
    salary: string,
    hiringSteps: number,
    hiringStepDescription?: string | null,
    typeOfCodingChallenge?: string | null,
    typeOfWork: string,
    timeZone: string,
    role: string,
    skills: Array< string | null >,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type GetCompanyQueryVariables = {
  id: string,
};

export type GetCompanyQuery = {
  getCompany?:  {
    __typename: "Company",
    id: string,
    name: string,
    image?:  {
      __typename: "S3Object",
      bucket: string,
      region: string,
      key: string,
    } | null,
    description?: string | null,
    userId: string,
    jobTitle?: string | null,
    salary?: string | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type ListCompanysQueryVariables = {
  filter?: ModelCompanyFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListCompanysQuery = {
  listCompanys?:  {
    __typename: "ModelCompanyConnection",
    items:  Array< {
      __typename: "Company",
      id: string,
      name: string,
      image?:  {
        __typename: "S3Object",
        bucket: string,
        region: string,
        key: string,
      } | null,
      description?: string | null,
      userId: string,
      jobTitle?: string | null,
      salary?: string | null,
      createdAt: string,
      updatedAt: string,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type GetJobQueryVariables = {
  id: string,
};

export type GetJobQuery = {
  getJob?:  {
    __typename: "Job",
    id: string,
    companyName: string,
    title: string,
    logo?:  {
      __typename: "S3Object",
      bucket: string,
      region: string,
      key: string,
    } | null,
    description: string,
    userId: string,
    salary: string,
    hiringSteps: number,
    hiringStepDescription?: string | null,
    typeOfCodingChallenge?: string | null,
    typeOfWork: string,
    timeZone: string,
    role: string,
    skills: Array< string | null >,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type ListJobsQueryVariables = {
  filter?: ModelJobFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListJobsQuery = {
  listJobs?:  {
    __typename: "ModelJobConnection",
    items:  Array< {
      __typename: "Job",
      id: string,
      companyName: string,
      title: string,
      logo?:  {
        __typename: "S3Object",
        bucket: string,
        region: string,
        key: string,
      } | null,
      description: string,
      userId: string,
      salary: string,
      hiringSteps: number,
      hiringStepDescription?: string | null,
      typeOfCodingChallenge?: string | null,
      typeOfWork: string,
      timeZone: string,
      role: string,
      skills: Array< string | null >,
      createdAt: string,
      updatedAt: string,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type OnCreateCompanySubscription = {
  onCreateCompany?:  {
    __typename: "Company",
    id: string,
    name: string,
    image?:  {
      __typename: "S3Object",
      bucket: string,
      region: string,
      key: string,
    } | null,
    description?: string | null,
    userId: string,
    jobTitle?: string | null,
    salary?: string | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnUpdateCompanySubscription = {
  onUpdateCompany?:  {
    __typename: "Company",
    id: string,
    name: string,
    image?:  {
      __typename: "S3Object",
      bucket: string,
      region: string,
      key: string,
    } | null,
    description?: string | null,
    userId: string,
    jobTitle?: string | null,
    salary?: string | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnDeleteCompanySubscription = {
  onDeleteCompany?:  {
    __typename: "Company",
    id: string,
    name: string,
    image?:  {
      __typename: "S3Object",
      bucket: string,
      region: string,
      key: string,
    } | null,
    description?: string | null,
    userId: string,
    jobTitle?: string | null,
    salary?: string | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnCreateJobSubscription = {
  onCreateJob?:  {
    __typename: "Job",
    id: string,
    companyName: string,
    title: string,
    logo?:  {
      __typename: "S3Object",
      bucket: string,
      region: string,
      key: string,
    } | null,
    description: string,
    userId: string,
    salary: string,
    hiringSteps: number,
    hiringStepDescription?: string | null,
    typeOfCodingChallenge?: string | null,
    typeOfWork: string,
    timeZone: string,
    role: string,
    skills: Array< string | null >,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnUpdateJobSubscription = {
  onUpdateJob?:  {
    __typename: "Job",
    id: string,
    companyName: string,
    title: string,
    logo?:  {
      __typename: "S3Object",
      bucket: string,
      region: string,
      key: string,
    } | null,
    description: string,
    userId: string,
    salary: string,
    hiringSteps: number,
    hiringStepDescription?: string | null,
    typeOfCodingChallenge?: string | null,
    typeOfWork: string,
    timeZone: string,
    role: string,
    skills: Array< string | null >,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnDeleteJobSubscription = {
  onDeleteJob?:  {
    __typename: "Job",
    id: string,
    companyName: string,
    title: string,
    logo?:  {
      __typename: "S3Object",
      bucket: string,
      region: string,
      key: string,
    } | null,
    description: string,
    userId: string,
    salary: string,
    hiringSteps: number,
    hiringStepDescription?: string | null,
    typeOfCodingChallenge?: string | null,
    typeOfWork: string,
    timeZone: string,
    role: string,
    skills: Array< string | null >,
    createdAt: string,
    updatedAt: string,
  } | null,
};
