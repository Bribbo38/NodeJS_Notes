# User and Note Management Application

This is a simple **User and Note Management Application** built with **Node.js** and **MongoDB**. It allows administrators to manage users, create, update, and delete user accounts, as well as manage notes and tasks associated with those users.

### Features

- **User Management**: Admin can view, create, edit, delete, and reset user passwords.
- **Note Management**: Users can create notes with tasks, mark tasks as complete, and manage notes and tasks.
- **Authentication**: User login and session management to ensure only authorized access to the admin panel.

### Tech Stack

- **Backend**: Node.js, Express
- **Database**: MongoDB with Mongoose ODM
- **Frontend**: EJS for templating, Tailwind CSS for styling
- **Authentication**: Session-based authentication

---

## Prerequisites

To run this application locally, you'll need to have the following installed:

- **Node.js** (version 14.x or higher)
- **MongoDB** (local or cloud instance)

---

## Installation

Follow the steps below to get the application up and running:

1. Clone the repository:
   ```bash
   git clone https://github.com/Bribbo38/NodeJS_Notes.git
   cd NodeJS_Notes

2. Install dependencies:
   ```bash
   npm install

3. Start MongoDB if it's not running already:
   ```bash
   mongod
   
4. Start the application:
   ```bash
   npm run start

5. Visit the application in your browser:
   ```bash
   http://localhost:3000

# Usage
## User Side
- Users can create an account through the registration or the admin interface.
- Users can create, edit and delete notes a they like.
## Admin Side
- Admin can manage users, including creating, editing, and deleting accounts.
- Admin can also reset a user's password to a default value (Admin$00).