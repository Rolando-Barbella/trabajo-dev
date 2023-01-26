/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateCompany = /* GraphQL */ `
  subscription OnCreateCompany($filter: ModelSubscriptionCompanyFilterInput) {
    onCreateCompany(filter: $filter) {
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
export const onUpdateCompany = /* GraphQL */ `
  subscription OnUpdateCompany($filter: ModelSubscriptionCompanyFilterInput) {
    onUpdateCompany(filter: $filter) {
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
export const onDeleteCompany = /* GraphQL */ `
  subscription OnDeleteCompany($filter: ModelSubscriptionCompanyFilterInput) {
    onDeleteCompany(filter: $filter) {
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
export const onCreateJob = /* GraphQL */ `
  subscription OnCreateJob($filter: ModelSubscriptionJobFilterInput) {
    onCreateJob(filter: $filter) {
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
export const onUpdateJob = /* GraphQL */ `
  subscription OnUpdateJob($filter: ModelSubscriptionJobFilterInput) {
    onUpdateJob(filter: $filter) {
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
export const onDeleteJob = /* GraphQL */ `
  subscription OnDeleteJob($filter: ModelSubscriptionJobFilterInput) {
    onDeleteJob(filter: $filter) {
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
