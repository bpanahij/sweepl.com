/* eslint-disable */
// this is an auto generated file. This will be overwritten

module.exports.onCreateFAQ = /* GraphQL */ `
  subscription OnCreateFAQ($filter: ModelSubscriptionFAQFilterInput) {
    onCreateFAQ(filter: $filter) {
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
module.exports.onUpdateFAQ = /* GraphQL */ `
  subscription OnUpdateFAQ($filter: ModelSubscriptionFAQFilterInput) {
    onUpdateFAQ(filter: $filter) {
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
module.exports.onDeleteFAQ = /* GraphQL */ `
  subscription OnDeleteFAQ($filter: ModelSubscriptionFAQFilterInput) {
    onDeleteFAQ(filter: $filter) {
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
module.exports.onCreateSegmentSchedule = /* GraphQL */ `
  subscription OnCreateSegmentSchedule(
    $filter: ModelSubscriptionSegmentScheduleFilterInput
  ) {
    onCreateSegmentSchedule(filter: $filter) {
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
module.exports.onUpdateSegmentSchedule = /* GraphQL */ `
  subscription OnUpdateSegmentSchedule(
    $filter: ModelSubscriptionSegmentScheduleFilterInput
  ) {
    onUpdateSegmentSchedule(filter: $filter) {
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
module.exports.onDeleteSegmentSchedule = /* GraphQL */ `
  subscription OnDeleteSegmentSchedule(
    $filter: ModelSubscriptionSegmentScheduleFilterInput
  ) {
    onDeleteSegmentSchedule(filter: $filter) {
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
