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
export const onCreateCompaniesByUser = /* GraphQL */ `
  subscription OnCreateCompaniesByUser {
    onCreateCompaniesByUser {
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
export const onUpdateCompaniesByUser = /* GraphQL */ `
  subscription OnUpdateCompaniesByUser {
    onUpdateCompaniesByUser {
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
export const onDeleteCompaniesByUser = /* GraphQL */ `
  subscription OnDeleteCompaniesByUser {
    onDeleteCompaniesByUser {
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
