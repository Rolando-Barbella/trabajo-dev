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
