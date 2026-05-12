import { test, expect }
  from '@playwright/test';

import APIClient
  from '../../api-utils/apiClient.js';

import userPayload
  from '../../payloads/mockApiUserPayload.json' assert { type: 'json' };

test.describe(
  'MockAPI CRUD Flow',
  () => {

  test(
    '@e2e Full CRUD User Flow',
    async ({ request }) => {

    const apiClient =
      new APIClient(request);

    const baseURL =
      'https://6a02e16f0d92f63dd25460eb.mockapi.io';

    console.log(
      '\nCreate User Payload:'
    );

    console.log(userPayload);

    // Create user

    const createResponse =
      await apiClient.post(
        `${baseURL}/users`,
        userPayload
      );

    expect(
      createResponse.status()
    ).toBe(201);

    expect(
      createResponse.ok()
    ).toBeTruthy();

    const createBody =
      await createResponse.json();

    console.log(
      '\nCreated User Response:'
    );

    console.log(createBody);

    expect(
      createBody.name
    ).toBe(
      userPayload.name
    );

    expect(
      createBody.job
    ).toBe(
      userPayload.job
    );

    expect(
      createBody
    ).toHaveProperty('id');

    const userId =
      createBody.id;

    // Get created user

    const getUserResponse =
      await apiClient.get(
        `${baseURL}/users/${userId}`
      );

    expect(
      getUserResponse.status()
    ).toBe(200);

    expect(
      getUserResponse.ok()
    ).toBeTruthy();

    const getUserBody =
      await getUserResponse.json();

    console.log(
      '\nFetched User Response:'
    );

    console.log(getUserBody);

    expect(
      getUserBody.name
    ).toBe(
      userPayload.name
    );

    expect(
      getUserBody.job
    ).toBe(
      userPayload.job
    );

    // Update user

    const updatedPayload = {

      ...userPayload,

      job:
        'Senior QA Engineer'

    };

    console.log(
      '\nUpdated Payload:'
    );

    console.log(updatedPayload);

    const updateResponse =
      await apiClient.put(
        `${baseURL}/users/${userId}`,
        updatedPayload
      );

    expect(
      updateResponse.status()
    ).toBe(200);

    expect(
      updateResponse.ok()
    ).toBeTruthy();

    const updateBody =
      await updateResponse.json();

    console.log(
      '\nUpdated User Response:'
    );

    console.log(updateBody);

    expect(
      updateBody.job
    ).toBe(
      'Senior QA Engineer'
    );

    // Delete user

    const deleteResponse =
      await apiClient.delete(
        `${baseURL}/users/${userId}`
      );

    expect(
      deleteResponse.status()
    ).toBe(200);

    console.log(
      '\nUser Deleted Successfully'
    );

    // Validate deleted user

    const deletedUserResponse =
      await apiClient.get(
        `${baseURL}/users/${userId}`
      );

    expect(
      deletedUserResponse.status()
    ).toBe(404);

    console.log(
      '\nDeleted User Validation Passed'
    );

    

  });

});