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
