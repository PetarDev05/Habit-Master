# Information about API payloads

### Success response format: (success: true, statusCode, data, message)

### Error response format: (success: false, statusCode, errorCode, message)

---

## User routes

#### 1. Create acount

- Method: POST
- Route: /api/user/create-account
- Params: /
- Body: { username, email, password }
- Success Response: { newUser, accessToken }

---

#### 2. Sign-in to the account

- Method: PATCH
- Route: /api/user/sign-in
- Params: /
- Body: { username, password }
- Success Response: { existingUser, accessToken }

---

#### 3. Extend session

- Method: GET
- Route: /api/user/extend-session
- Params: /
- Body: /
- Success Response: { accessToken }

---

#### 4. Sign-out

- Method: PATCH
- Route: /api/user/:userId/sign-out
- Params: { userId }
- Body: /
- Success Response: null

---

#### 5. Delete account

- Method: DELETE
- Route: /api/user/delete-account
- Params: /
- Body: /
- Success Response: null

---

## Data routes

#### 1. Fetch data

- Method: GET
- Route: /api/user/
- Params: /
- Body: /
- Success Response: { weeks, habits, checkIns }

---

#### 2. Create new week

- Method: POST
- Route: /api/user/
- Params: /
- Body: { userDateString, habits }
- Success Response: { newWeek, newHabits, newCheckIns }

---

#### 3. Change checkIn status

- Method: PATCH
- Route: /api/user/:checkInId/check-in
- Params: { checkInId }
- Body: /
- Success Response: null

---

#### 4. Delete week

- Method: DELETE
- Route: /api/user/:weekId
- Params: { weekId }
- Body: /
- Success Response: null

---
