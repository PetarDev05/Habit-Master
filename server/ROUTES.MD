# ROUTES

## BASE: http//localhost:8000

### USER ROUTES

#### User routes base: /api/users

---

#### 1. REGISTER A USER

POST /create-account

Request params: /

Request body: { username, email, password }

##### SUCCESS RESPONSE:

- 200 { user, accessToken }

##### ERROR RESPONSE:

- 400 INVALID_CREDENTIALS
- 409 USER_ALREADY_EXISTS

---

#### 2. DELETE USER ACCOUNT

DELETE /:userId

Request params: { userId }

Request body: /

##### SUCCESS RESPONSE:

- 204 null

##### ERROR RESPONSE:

- 400 VALIDATION_ERROR

---

#### 3. LOGIN A USER

POST /login

Request params: /

Request body: { username, password }

##### SUCCESS RESPONSE:

- 200 { user, accessToken }

##### ERROR RESPONSE:

- 401 INVALID_CREDENTIALS
- 404 USER_NOT_FOUND

---

#### 4. LOGOUT A USER

POST /logout

Request params: /

Request body: /

##### SUCCESS RESPONSE:

- 204 null

##### ERROR RESPONSE:

- /

---

#### 5. EXTEND USER SESSION

POST /refresh

Request params: /

Request body: /

##### SUCCESS RESPONSE:

- 200 { accessToken }

##### ERROR RESPONSE:

- 401 TOKEN_MISSING
- 401 REFRESH_TOKEN_INVALID

============================================================

### WEEK ROUTES

#### Week routes base: /api/weeks

---

#### 1. GET ALL DATA

GET /:userId

Request params: { userId }

Request body: /

##### SUCCESS RESPONSE:

- 200 { weeks, habits, checkins }

##### ERROR RESPONSE:

- 400 VALIDATION_ERROR

---

#### 2. CREATE NEW WEEK

POST /:userId

Request params: { userId }

Request body: { startingDate, habits }

##### SUCCESS RESPONSE:

- 201 { newWeek, newHabits, newCheckins }

##### ERROR RESPONSE:

- 400 VALIDATION_ERROR
- 409 ACTIVE_WEEK_EXISTS
- 400 INVALID_WEEK_STATE

---

#### 3. CHANGE CHECKIN STATUS

POST /:checkInId/check-in

Request params: { checkInId }

Request body: /

##### SUCCESS RESPONSE:

- 200 { updatedCheckIn }

##### ERROR RESPONSE:

- 400 VALIDATION_ERROR
- 404 CHECKIN_NOT_FOUND
- 409 CONFLICT

---

#### 4. DELETE WEEK

DELETE /:weekId

Request params: { weekId }

Request body: /

##### SUCCESS RESPONSE:

- 200 null

##### ERROR RESPONSE:

- 400 VALIDATION_ERROR

---
