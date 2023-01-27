/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getCompany = /* GraphQL */ `
  query GetCompany($id: ID!) {
    getCompany(id: $id) {
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
export const listCompanies = /* GraphQL */ `
  query ListCompanies(
    $filter: ModelCompanyFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listCompanies(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
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
      nextToken
    }
  }
`;
export const getJob = /* GraphQL */ `
  query GetJob($id: ID!) {
    getJob(id: $id) {
      id
      companyName
      companyDescription
      applyLink
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
export const listJobs = /* GraphQL */ `
  query ListJobs(
    $filter: ModelJobFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listJobs(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        companyName
        companyDescription
        applyLink
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
      nextToken
    }
  }
`;
