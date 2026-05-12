import { test, expect }
  from '@playwright/test';

test.describe(
  'Valid And Invalid Response Testing',
  () => {

  test(
    '@regression Validate Successful And Failed Login Responses',
    async ({ request }) => {

    // VALID LOGIN

    const validLoginPayload = {

      email:
        'eve.holt@reqres.in',

      password:
        'cityslicka'

    };

    console.log(
      '\nValid Login Payload:'
    );

    console.log(
      validLoginPayload
    );

    const validLoginResponse =
      await request.post(
        '/api/login',
        {
          data:
            validLoginPayload
        }
      );

    expect(
      validLoginResponse.status()
    ).toBe(200);

    expect(
      validLoginResponse.ok()
    ).toBeTruthy();

    const validResponseBody =
      await validLoginResponse.json();

    console.log(
      '\nValid Login Response:'
    );

    console.log(
      validResponseBody
    );

    expect(
      validResponseBody
    ).toHaveProperty(
      'token'
    );

    expect(
      validResponseBody.token
    ).toBeTruthy();

    expect(
      validLoginResponse
        .headers()['content-type']
    ).toContain(
      'application/json'
    );

    // INVALID LOGIN

    const invalidLoginPayload = {

      email:
        'eve.holt@reqres.in'

    };

    console.log(
      '\nInvalid Login Payload:'
    );

    console.log(
      invalidLoginPayload
    );

    const invalidLoginResponse =
      await request.post(
        '/api/login',
        {
          data:
            invalidLoginPayload
        }
      );

    expect(
      invalidLoginResponse.status()
    ).toBe(400);

    expect(
      invalidLoginResponse.ok()
    ).toBeFalsy();

    const invalidResponseBody =
      await invalidLoginResponse.json();

    console.log(
      '\nInvalid Login Response:'
    );

    console.log(
      invalidResponseBody
    );

    expect(
      invalidResponseBody.error
    ).toBe(
      'Missing password'
    );

    expect(
      invalidLoginResponse
        .headers()['content-type']
    ).toContain(
      'application/json'
    );

  });

});