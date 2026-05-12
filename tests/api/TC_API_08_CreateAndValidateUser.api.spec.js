import { test, expect }
  from '@playwright/test';

import APIClient
  from '../../api-utils/apiClient.js';

import createUserPayload
  from '../../payloads/createUserPayload.json' assert { type: 'json' };

test.describe(
  'Create And Validate User API',
  () => {


  test(
    '@e2e Create User And Validate Response Flow',
    async ({ request }) => {

    const apiClient =
      new APIClient(request);

    console.log(
      '\nCreate User Payload:'
    );

    console.log(
      createUserPayload
    );

    const createUserResponse =
      await apiClient.post(
        '/api/users',
        createUserPayload
      );

    expect(
      createUserResponse.status()
    ).toBe(201);

    expect(
      createUserResponse.ok()
    ).toBeTruthy();

    const createResponseBody =
      await createUserResponse.json();

    console.log(
      '\nCreate User Response:'
    );

    console.log(
      createResponseBody
    );

    expect(
      createResponseBody.name
    ).toBe(
      createUserPayload.name
    );

    expect(
      createResponseBody.job
    ).toBe(
      createUserPayload.job
    );

    expect(
      createResponseBody
    ).toHaveProperty('id');

    const createdUserId =
      createResponseBody.id;

    console.log(
      `\nCreated User ID: ${createdUserId}`
    );

    const getUsersResponse =
      await apiClient.get(
        '/api/users?page=2'
      );

    expect(
      getUsersResponse.status()
    ).toBe(200);

    expect(
      getUsersResponse.ok()
    ).toBeTruthy();

    const getResponseBody =
      await getUsersResponse.json();

    console.log(
      '\nGET Users Response:'
    );

    console.log(
      getResponseBody
    );

    expect(
      getResponseBody.data.length
    ).toBeGreaterThan(0);

    expect(
      getResponseBody.data[0]
    ).toHaveProperty('id');

    expect(
      getResponseBody.data[0]
    ).toHaveProperty('email');

    expect(
      getUsersResponse
        .headers()['content-type']
    ).toContain(
      'application/json'
    );

  });

});