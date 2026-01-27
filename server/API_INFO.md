# Information about API payloads

## User routes

### Success response format: (success: false, statusCode, data, message)

### Error response format: (success: true, statusCode, errorCode, message)

---

#### 1. Create acount

- Method: POST
- Route: /api/user/create-account
- Body: { username, email, password }
- Success Response: { newUser, accessToken }

---

#### 2. Sign-in to the account

- Method: PATCH
- Route: /api/user/sign-in
- Body: { username, password }
- Success Response: { existingUser, accessToken }

---

#### 3. Extend session

- Method: GET
- Route: /api/user/extend-session
- Body: /
- Success Response: { accessToken }

---

#### 4. Sign-out

- Method: PATCH
- Route: /api/user/sign-out
- Body: /
- Success Response: null

---

#### 5. Delete account

- Method: DELETE
- Route: /api/user/create-account
- Body: /
- Success Response: null

---
