/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateCompany = /* GraphQL */ `
  subscription OnCreateCompany {
    onCreateCompany {
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
export const onUpdateCompany = /* GraphQL */ `
  subscription OnUpdateCompany {
    onUpdateCompany {
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
export const onDeleteCompany = /* GraphQL */ `
  subscription OnDeleteCompany {
    onDeleteCompany {
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
export const onCreateJob = /* GraphQL */ `
  subscription OnCreateJob {
    onCreateJob {
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
export const onUpdateJob = /* GraphQL */ `
  subscription OnUpdateJob {
    onUpdateJob {
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
export const onDeleteJob = /* GraphQL */ `
  subscription OnDeleteJob {
    onDeleteJob {
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
