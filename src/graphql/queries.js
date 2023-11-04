/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getFAQ = /* GraphQL */ `
  query GetFAQ($id: ID!) {
    getFAQ(id: $id) {
      id
      question
      answer
      vector
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const listFAQS = /* GraphQL */ `
  query ListFAQS(
    $filter: ModelFAQFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listFAQS(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        question
        answer
        vector
        createdAt
        updatedAt
        __typename
      }
      nextToken
      __typename
    }
  }
`;
export const getSegmentSchedule = /* GraphQL */ `
  query GetSegmentSchedule($id: ID!) {
    getSegmentSchedule(id: $id) {
      id
      segment {
        lat
        long
        __typename
      }
      schedule {
        id
        dayOfWeek
        startTime
        endTime
        __typename
      }
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const listSegmentSchedules = /* GraphQL */ `
  query ListSegmentSchedules(
    $filter: ModelSegmentScheduleFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listSegmentSchedules(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        segment {
          lat
          long
          __typename
        }
        schedule {
          id
          dayOfWeek
          startTime
          endTime
          __typename
        }
        createdAt
        updatedAt
        __typename
      }
      nextToken
      __typename
    }
  }
`;
