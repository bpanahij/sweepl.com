/* eslint-disable */
// this is an auto generated file. This will be overwritten

module.exports.createFAQ = /* GraphQL */ `
  mutation CreateFAQ(
    $input: CreateFAQInput!
    $condition: ModelFAQConditionInput
  ) {
    createFAQ(input: $input, condition: $condition) {
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
module.exports.updateFAQ = /* GraphQL */ `
  mutation UpdateFAQ(
    $input: UpdateFAQInput!
    $condition: ModelFAQConditionInput
  ) {
    updateFAQ(input: $input, condition: $condition) {
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
module.exports.deleteFAQ = /* GraphQL */ `
  mutation DeleteFAQ(
    $input: DeleteFAQInput!
    $condition: ModelFAQConditionInput
  ) {
    deleteFAQ(input: $input, condition: $condition) {
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
module.exports.createSegmentSchedule = /* GraphQL */ `
  mutation CreateSegmentSchedule(
    $input: CreateSegmentScheduleInput!
    $condition: ModelSegmentScheduleConditionInput
  ) {
    createSegmentSchedule(input: $input, condition: $condition) {
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
module.exports.updateSegmentSchedule = /* GraphQL */ `
  mutation UpdateSegmentSchedule(
    $input: UpdateSegmentScheduleInput!
    $condition: ModelSegmentScheduleConditionInput
  ) {
    updateSegmentSchedule(input: $input, condition: $condition) {
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
module.exports.deleteSegmentSchedule = /* GraphQL */ `
  mutation DeleteSegmentSchedule(
    $input: DeleteSegmentScheduleInput!
    $condition: ModelSegmentScheduleConditionInput
  ) {
    deleteSegmentSchedule(input: $input, condition: $condition) {
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
