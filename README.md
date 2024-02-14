
# Collaborative Evaluation Hub

Welcome to the Collaborative Evaluation Hub! Our platform facilitates mutual evaluation and feedback on attributes like teamwork, innovation, and creativity. Join us in fostering constructive feedback and continuous improvement!
## Table of Contents

- [Introduction](#introduction)
- [Features](#features)
- [API Endpoints](#api-endpoints)
- [Setup Instructions](#setup-instructions)
## Introduction

Welcome to the Collaborative Evaluation Hub!

In today's interconnected world, feedback and evaluation play a crucial role in personal and professional development. The Collaborative Evaluation Hub offers a dynamic platform where users can engage in reciprocal evaluation, fostering a culture of constructive feedback and growth. Whether it's assessing teamwork dynamics, innovative thinking, or creative prowess, our platform provides a structured framework for users to evaluate and be evaluated by their peers.

With an intuitive interface and robust features, the Collaborative Evaluation Hub empowers both administrators and users to facilitate and participate in the evaluation process seamlessly. Admins have the tools to manage user accounts, oversee evaluations, and ensure the integrity of the system, while users can login to provide feedback, gain insights, and contribute to a collaborative learning environment.

Join us on a journey of self-improvement, collaboration, and mutual support with the Collaborative Evaluation Hub. Together, let's harness the power of feedback to unlock our full potential and drive continuous growth.


## Features

1. User Authentication:
Implements secure login system for admins and users with encrypted credentials.

2. User Evaluation:
Enables users to assess their peers based on attributes like teamwork, innovation, and creativity.

3. Feedback Options:
Provides flexible feedback choices, including strongly agree, agree, normal, disagree, and strongly disagree.

4.  User Management:
Allows admins to manage user accounts, including creation, updates, and deletion.

5.  Centralized Data Storage:
Stores all evaluations and feedback in a centralized database for easy access and reference.

6.  Profile Management:
Enables users to update their profile information and profile photo.

7.  Data Privacy:
Implements security measures to protect user data and maintain confidentiality.

8.  Customizable Evaluation Criteria:
Allows administrators to define and customize the attributes on which users can evaluate their peers, providing flexibility to tailor evaluations to the organization's specific needs and objectives. 
## API Endpoints

### Admin Routes

- `POST /api/admin/login`: Endpoint for admin login
- `POST /api/admin/signup`: Endpoint for admin signup
- `POST /api/admin/admin-reset`: Endpoint for admin to reset their password (requires admin authentication)
- `GET /api/admin/users`: Endpoint to get all users (requires admin authentication)
- `GET /api/admin/user/:id`: Endpoint to get a user by ID (requires admin authentication)
- `POST /api/admin/user-signup`: Endpoint for admin to add a user (requires admin authentication)
- `DELETE /api/admin/user-delete/:id`: Endpoint for admin to delete a user (requires admin authentication)
- `POST /api/admin/user-reset`: Endpoint for a user to reset their password (requires admin authentication)
- `PUT /api/admin/user-update/:id`: Endpoint for admin to update a user's info (requires admin authentication)

### User Routes

- `POST /api/user/login`: Endpoint for user login
- `POST /api/user/vote`: Endpoint for user to submit a vote (requires user authentication)
- `GET /api/user/users`: Endpoint to get users for voting (requires user authentication)

## Setup Instructions

1. Clone the repository.
2. Install dependencies using `npm install`.
3. Set up environment variables (dbURI, port and JWT Token).
4. Start the server using `npm start`.