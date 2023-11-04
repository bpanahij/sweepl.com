/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createFAQ = /* GraphQL */ `
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
export const updateFAQ = /* GraphQL */ `
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
export const deleteFAQ = /* GraphQL */ `
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
export const createSegmentSchedule = /* GraphQL */ `
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
export const updateSegmentSchedule = /* GraphQL */ `
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
export const deleteSegmentSchedule = /* GraphQL */ `
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
