# SupportOps Frontend

A frontend interface for the SupportOps API, built with HTML, CSS, and JavaScript.

This project connects to a Django REST Framework backend and demonstrates full frontend/backend integration using Fetch API, JWT authentication, protected pages, localStorage, and complete ticket CRUD functionality.

## Project Overview

SupportOps Frontend allows users to register, log in, manage support tickets, view ticket analytics, and interact with backend-generated support automation features.

The goal of this project is to deeply understand how a frontend communicates with a REST API before moving into frontend frameworks like React.

## Backend Repository

Backend API:

```text
supportops-api
```

The backend includes:

- Django REST Framework API
- JWT authentication
- Ticket CRUD
- User ownership validation
- Automatic ticket categorization
- Automatic priority detection
- Suggested reply endpoint
- Analytics endpoint
- Filtering, search, and ordering
- Automated tests
- GitHub Actions CI
- Swagger/OpenAPI docs

## Frontend Stack

- HTML
- CSS
- JavaScript
- Fetch API
- JWT authentication
- localStorage
- REST API integration
- VS Code Live Server

## Features

- User registration
- User login
- JWT access and refresh token storage
- Protected dashboard page
- Logout functionality
- Ticket list from backend API
- Ticket detail page
- Create ticket form
- Edit ticket form
- Delete ticket flow
- Suggested reply display
- Dashboard ticket stats
- Status and priority badges
- Polished ticket cards
- Styled detail page
- Styled create/edit forms
- Loading and error message handling

## Pages

### Login/Register Page

```text
index.html
```

Handles user authentication.

Users can:

- Register a new account
- Log in with existing credentials
- Store JWT tokens in localStorage after successful login

### Dashboard Page

```text
dashboard.html
```

Protected page that displays ticket data from the backend.

Includes:

- Total tickets count
- Open tickets count
- High priority tickets count
- Ticket cards
- Status badges
- Priority badges
- Navigation to ticket detail page

### Create Ticket Page

```text
create-ticket.html
```

Allows authenticated users to create a new support ticket.

The backend automatically detects:

- Ticket category
- Ticket priority

### Ticket Detail Page

```text
ticket-detail.html
```

Displays full information for a single ticket.

Includes:

- Subject
- Message
- Status
- Category
- Priority
- Created date
- Suggested reply
- Edit ticket link
- Delete ticket button

### Edit Ticket Page

```text
edit-ticket.html
```

Allows authenticated users to update:

- Subject
- Message
- Status

Uses a PATCH request to update the ticket in the backend.

## JavaScript Files

```text
js/config.js
```

Stores the shared backend API base URL.

```text
js/auth.js
```

Handles registration and login logic.

```text
js/dashboard.js
```

Fetches tickets, renders dashboard stats, and displays ticket cards.

```text
js/create-ticket.js
```

Handles creating new tickets.

```text
js/ticket-detail.js
```

Fetches single ticket detail, suggested reply, and handles ticket deletion.

```text
js/edit-ticket.js
```

Loads existing ticket data and handles ticket updates.

## API Base URL

The frontend connects to the backend locally at:

```text
http://127.0.0.1:8000/api
```

Some pages use a shared config file:

```javascript
const API_BASE_URL = "http://127.0.0.1:8000/api";
```

Some pages use their own local API constants to avoid duplicate variable conflicts while learning plain JavaScript.

## Authentication Flow

The frontend uses JWT authentication.

After login, the backend returns:

- Access token
- Refresh token

These are stored in localStorage:

```javascript
localStorage.setItem("accessToken", data.access);
localStorage.setItem("refreshToken", data.refresh);
```

Protected API requests include the access token in the Authorization header:

```javascript
Authorization: `Bearer ${accessToken}`
```

If no access token exists, protected pages redirect the user back to:

```text
index.html
```

## Main API Interactions

### Get all tickets

```javascript
fetch(`${API_BASE_URL}/tickets/`, {
  method: "GET",
  headers: {
    Authorization: `Bearer ${accessToken}`,
  },
});
```

### Create ticket

```javascript
fetch(`${API_BASE_URL}/tickets/`, {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${accessToken}`,
  },
  body: JSON.stringify(ticketData),
});
```

### Get ticket detail

```javascript
fetch(`${DETAIL_API_BASE_URL}/tickets/${ticketId}/`, {
  method: "GET",
  headers: {
    Authorization: `Bearer ${token}`,
  },
});
```

### Update ticket

```javascript
fetch(`${EDIT_API_BASE_URL}/tickets/${ticketId}/`, {
  method: "PATCH",
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  },
  body: JSON.stringify(updatedTicket),
});
```

### Delete ticket

```javascript
fetch(`${DETAIL_API_BASE_URL}/tickets/${ticketId}/`, {
  method: "DELETE",
  headers: {
    Authorization: `Bearer ${token}`,
  },
});
```

### Get suggested reply

```javascript
fetch(`${DETAIL_API_BASE_URL}/tickets/${ticketId}/suggested-reply/`, {
  method: "GET",
  headers: {
    Authorization: `Bearer ${token}`,
  },
});
```

## How To Run Locally

### 1. Run the backend

Clone and run the backend project first:

```bash
git clone https://github.com/adrianatortja/supportops-api.git
cd supportops-api
```

Create and activate a virtual environment:

```bash
python -m venv venv
venv\Scripts\activate
```

Install dependencies:

```bash
pip install -r requirements.txt
```

Run migrations:

```bash
python manage.py migrate
```

Start the Django server:

```bash
python manage.py runserver
```

The backend should run at:

```text
http://127.0.0.1:8000
```

### 2. Run the frontend

Clone this frontend project:

```bash
git clone https://github.com/adrianatortja/supportops-frontend.git
cd supportops-frontend
```

Open the project in VS Code.

Use the Live Server extension and open:

```text
index.html
```

The frontend usually runs at:

```text
http://127.0.0.1:5500
```

## CORS Note

Because the frontend and backend run on different local ports, the Django backend needs CORS enabled.

Frontend:

```text
http://127.0.0.1:5500
```

Backend:

```text
http://127.0.0.1:8000
```

The backend uses `django-cors-headers` to allow requests from the frontend.

## What I Learned

Through this project, I practiced:

- Connecting a frontend to a REST API
- Using Fetch API for GET, POST, PATCH, and DELETE requests
- Handling JWT authentication manually
- Storing tokens in localStorage
- Protecting frontend pages
- Redirecting unauthenticated users
- Reading URL query parameters
- Rendering backend data dynamically
- Handling loading and error states
- Building full CRUD without a frontend framework
- Understanding the foundation before moving to React

## Screenshots

Screenshots can be added here later.

```text
assets/screenshots/dashboard.png
assets/screenshots/ticket-detail.png
assets/screenshots/create-ticket.png
assets/screenshots/edit-ticket.png
```

## Project Status

The frontend is functional and connected to the backend.

Completed:

- Authentication
- Protected dashboard
- Ticket list
- Ticket detail
- Create ticket
- Edit ticket
- Delete ticket
- Suggested reply display
- UI polish
- Status and priority badges

Possible future improvements:

- Token refresh handling
- Search and filtering UI
- Better form validation
- Toast notifications
- Deployment
- React version of the frontend