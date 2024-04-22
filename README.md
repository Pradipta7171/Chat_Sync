# Chat Application

This is a real-time chat application that allows users to sign up, log in, and engage in instant messaging with other users. The application is built using the following technologies:

- **Front-end**: React, Chakra UI
- **Back-end**: Node.js, Express
- **Database**: MongoDB

The application is deployed and accessible at: https://chat-sync-s15y.onrender.com

## Features

- User authentication (sign up and log in)
- Real-time messaging
- Responsive design with Chakra UI

## Prerequisites

Before running the application, make sure you have the following installed on your system:

- Node.js (v12 or later)
- MongoDB (v4.0 or later)

## Installation

1. Clone the repository:

2. Navigate to the project directory:

3. Install the dependencies for both the client and server:

4.  Create a `.env` file in the root directory and add your MongoDB connection string:

5.  5. Start the development servers:
  

<img src="Screenshots/Screenshot 2024-04-22 181607.png" alt="Screenshot 1" />



<img src="Screenshots/Screenshot 2024-04-22 181724.png" alt="Screenshot 2" />



<img src="Screenshots/Screenshot 2024-04-22 181749.png" alt="Screenshot 3" />


This will concurrently start the server and client development servers.

## Errors Encountered

During the development process, the following errors were encountered and resolved:

1. **Failed to push some refs to remote repository**:
   This error occurred when trying to push local commits to the remote repository that had been updated with new commits since the last pull or clone. It was resolved by fetching the latest changes from the remote repository and merging them with the local branch.

2. **'frontend/' does not have a commit checked out**:
   This error occurred when trying to perform a Git operation within a subdirectory that was not a Git repository itself. It was resolved by navigating to the root directory of the Git repository and running the commands from there.

## Usage

1. Open your web browser and navigate to `http://localhost:3000`.
2. Sign up for a new account or log in with an existing one.
3. Start chatting with other users in real-time.

## Contributing

Contributions are welcome! If you find any issues or have suggestions for improvements, please open an issue or submit a pull request.

## License

This project is licensed under the [MIT License](LICENSE).

## Acknowledgements

- [React](https://reactjs.org/)
- [Chakra UI](https://chakra-ui.com/)
- [Node.js](https://nodejs.org/)
- [Express](https://expressjs.com/)
- [MongoDB](https://www.mongodb.com/)
