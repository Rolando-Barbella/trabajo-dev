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
      companiesByUser {
        items {
          id
          userID
          createdAt
          updatedAt
        }
        nextToken
      }
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
        companiesByUser {
          nextToken
        }
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const getCompaniesByUser = /* GraphQL */ `
  query GetCompaniesByUser($id: ID!) {
    getCompaniesByUser(id: $id) {
      id
      userID
      company {
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
        companiesByUser {
          nextToken
        }
        createdAt
        updatedAt
      }
      createdAt
      updatedAt
    }
  }
`;
export const listCompaniesByUsers = /* GraphQL */ `
  query ListCompaniesByUsers(
    $filter: ModelCompaniesByUserFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listCompaniesByUsers(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        userID
        company {
          id
          name
          description
          userId
          jobTitle
          salary
          createdAt
          updatedAt
        }
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const getBlog = /* GraphQL */ `
  query GetBlog($id: ID!) {
    getBlog(id: $id) {
      id
      name
      posts
      createdAt
      updatedAt
    }
  }
`;
export const listBlogs = /* GraphQL */ `
  query ListBlogs(
    $filter: ModelBlogFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listBlogs(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        name
        posts
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
