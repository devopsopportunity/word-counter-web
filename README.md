# word-counter-web

Word Counter: Dockerized web server for word counting, implemented in Node.js.

## Project Overview

The project consists of several important files:

- **app.spec.js**: Unit tests written in Jest.
- **Dockerfile**: Configuration file for building the Docker image.
- **index.html**: HTML file for the web interface.
- **index.js**: Main script for the command-line interface.
- **index-web.js**: Main script for the web interface.
- **start_web_server.sh**: Bash script for starting the web server.
- **test_10_parole.txt**: Sample text file for testing (10 words).
- **test.txt**: Sample text file for normal word counting.

## Getting Started

To use the application, follow these steps:

1. Clone the repository to your local machine.
2. Navigate to the project directory.
3. Ensure Node.js is installed on your system.
4. Install dependencies by running `npm install`.
5. Run the command-line version with `node index.js`.
6. Alternatively, start the web server with `./start_web_server.sh`.

**Note:** If you wish to enable debug mode, run the command with the `--debug` option.

You can also directly start the web part from the shell using `node index-web.js [--debug]`.

## Exercise Description

The application should:

- Read a file from a user-input path (local or web address).
- Count the total number of words, letters, and spaces in the file.
- Identify words repeated more than 10 times and indicate their frequency.
