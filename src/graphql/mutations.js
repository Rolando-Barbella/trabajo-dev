/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createCompany = /* GraphQL */ `
  mutation CreateCompany(
    $input: CreateCompanyInput!
    $condition: ModelCompanyConditionInput
  ) {
    createCompany(input: $input, condition: $condition) {
      id
      name
      image {
        bucket
        region
        key
      }
      description
      userId
      createdAt
      updatedAt
    }
  }
`;
export const updateCompany = /* GraphQL */ `
  mutation UpdateCompany(
    $input: UpdateCompanyInput!
    $condition: ModelCompanyConditionInput
  ) {
    updateCompany(input: $input, condition: $condition) {
      id
      name
      image {
        bucket
        region
        key
      }
      description
      userId
      createdAt
      updatedAt
    }
  }
`;
export const deleteCompany = /* GraphQL */ `
  mutation DeleteCompany(
    $input: DeleteCompanyInput!
    $condition: ModelCompanyConditionInput
  ) {
    deleteCompany(input: $input, condition: $condition) {
      id
      name
      image {
        bucket
        region
        key
      }
      description
      userId
      createdAt
      updatedAt
    }
  }
`;
export const createJob = /* GraphQL */ `
  mutation CreateJob(
    $input: CreateJobInput!
    $condition: ModelJobConditionInput
  ) {
    createJob(input: $input, condition: $condition) {
      id
      companyName
      companyDescription
      title
      logo {
        bucket
        region
        key
      }
      description
      userId
      salary
      hiringSteps
      hiringStepDescription
      typeOfCodingChallenge
      typeOfWork
      timeZone
      role
      hasbeenPaid
      skills
      createdAt
      updatedAt
    }
  }
`;
export const updateJob = /* GraphQL */ `
  mutation UpdateJob(
    $input: UpdateJobInput!
    $condition: ModelJobConditionInput
  ) {
    updateJob(input: $input, condition: $condition) {
      id
      companyName
      companyDescription
      title
      logo {
        bucket
        region
        key
      }
      description
      userId
      salary
      hiringSteps
      hiringStepDescription
      typeOfCodingChallenge
      typeOfWork
      timeZone
      role
      hasbeenPaid
      skills
      createdAt
      updatedAt
    }
  }
`;
export const deleteJob = /* GraphQL */ `
  mutation DeleteJob(
    $input: DeleteJobInput!
    $condition: ModelJobConditionInput
  ) {
    deleteJob(input: $input, condition: $condition) {
      id
      companyName
      companyDescription
      title
      logo {
        bucket
        region
        key
      }
      description
      userId
      salary
      hiringSteps
      hiringStepDescription
      typeOfCodingChallenge
      typeOfWork
      timeZone
      role
      hasbeenPaid
      skills
      createdAt
      updatedAt
    }
  }
`;
