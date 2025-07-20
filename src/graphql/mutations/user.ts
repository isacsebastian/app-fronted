export const UPDATE_USERS_PROFILE = `
  mutation UpdateUsersProfile($id: String!, $input: UpdateUsersProfileInput!) {
    updateUsersProfile(id: $id, updateUsersProfileInput: $input) {
      id
      firstName
      lastName
      phone
      secondaryPhone
      userType
      companyName
      taxId
      dateOfBirth
      gender
      avatar
      preferredLanguage
      timezone
      acceptsMarketing
      acceptsSms
      createdAt
      updatedAt
    }
  }
`;
