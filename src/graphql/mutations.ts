/* tslint:disable */
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
export const createCompaniesByUser = /* GraphQL */ `
  mutation CreateCompaniesByUser(
    $input: CreateCompaniesByUserInput!
    $condition: ModelCompaniesByUserConditionInput
  ) {
    createCompaniesByUser(input: $input, condition: $condition) {
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
export const updateCompaniesByUser = /* GraphQL */ `
  mutation UpdateCompaniesByUser(
    $input: UpdateCompaniesByUserInput!
    $condition: ModelCompaniesByUserConditionInput
  ) {
    updateCompaniesByUser(input: $input, condition: $condition) {
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
export const deleteCompaniesByUser = /* GraphQL */ `
  mutation DeleteCompaniesByUser(
    $input: DeleteCompaniesByUserInput!
    $condition: ModelCompaniesByUserConditionInput
  ) {
    deleteCompaniesByUser(input: $input, condition: $condition) {
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
export const createBlog = /* GraphQL */ `
  mutation CreateBlog(
    $input: CreateBlogInput!
    $condition: ModelBlogConditionInput
  ) {
    createBlog(input: $input, condition: $condition) {
      id
      name
      posts
      createdAt
      updatedAt
    }
  }
`;
export const updateBlog = /* GraphQL */ `
  mutation UpdateBlog(
    $input: UpdateBlogInput!
    $condition: ModelBlogConditionInput
  ) {
    updateBlog(input: $input, condition: $condition) {
      id
      name
      posts
      createdAt
      updatedAt
    }
  }
`;
export const deleteBlog = /* GraphQL */ `
  mutation DeleteBlog(
    $input: DeleteBlogInput!
    $condition: ModelBlogConditionInput
  ) {
    deleteBlog(input: $input, condition: $condition) {
      id
      name
      posts
      createdAt
      updatedAt
    }
  }
`;
