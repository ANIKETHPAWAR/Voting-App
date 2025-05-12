🗳️ Voting Application - Backend Project.
This is the backend of a secure and user-friendly voting system, designed to handle user authentication, candidate management, and the voting process. It ensures one vote per user and provides role-based access, with distinct functionalities for users and administrators.

🔑 Features
✅ User sign-up and login using Aadhar Card Number and password
 Also user must be legally elgible to vote 
📋 Users can view the list of candidates
🗳️ Users can vote for a candidate only once
🛠️ Admins can manage candidates (Add / Update / Delete)
🚫 Admins cannot vote
🔐 Secure authentication using JWT
🗂️ Clean API structure for easy integration

🛠️ Technologies Used
Node.js
Express.js
MongoDB
JSON Web Tokens (JWT) – for secure user authentication

📌 API Endpoints
🔐 Authentication
Method	Endpoint	Description
POST	/signup	Register a new user
POST	/login	Login an existing user

🧑‍💼 Candidates (Admin Only)
Method	Endpoint	Description
GET	/candidates	Get list of all candidates
POST	/candidates	Add a new candidate
PUT	/candidates/:id	Update candidate by ID
DELETE	/candidates/:id	Delete candidate by ID

🗳️ Voting (User Only)
Method	Endpoint	Description
POST	/candidates/vote/:id	Vote for a candidate (once only)
GET	/candidates/vote/count	Get vote counts for all candidates

👤 User Profile
Method	Endpoint	Description
GET	/users/profile	Get logged-in user's profile
PUT	/users/profile/password	Change user password

