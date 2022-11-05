/* tslint:disable */
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
      jobTitle
      salary
      createdAt
      updatedAt
    }
  }
`;
export const listCompanys = /* GraphQL */ `
  query ListCompanys(
    $filter: ModelCompanyFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listCompanys(filter: $filter, limit: $limit, nextToken: $nextToken) {
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
        jobTitle
        salary
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
        skills
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
