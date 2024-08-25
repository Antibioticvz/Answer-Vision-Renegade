# Answer Vision Renegade

Answer Vision Renegade is a Node.js application that extracts text from images using Tesseract.js and then uses either the OpenAI or LLaMA model to select the right answer based on provided prompt from the extracted text. This project demonstrates how to use image processing, natural language processing, and machine learning models in a practical application.

## Use Case: Quickly Answer Questions During Tests or Quizzes

Answer Vision Renegade is an ideal tool for quickly answering questions during tests or quizzes. By taking a screenshot of the question area and saving it to the `/src/images` folder, Answer Vision Renegade can extract the text from the image and use machine learning models to select the right answer. This allows you to save time during exams and focus on understanding the material rather than searching for answers.

## Features

- Extracts text from images using Tesseract.js
- Supports both OpenAI and LLaMA models for answer selection
- Uses environment variables for configuration
- TypeScript support with automatic compilation to JavaScript

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm (v6 or higher)

### Installation

1. Clone this repository:

```bash
git clone https://github.com/yourusername/answer-vision-renegade.git
cd answer-vision-renegade
```

2. Install dependencies:

```bash
npm install
```

3. Create a .env file with your configuration (see .env.example for an example).

4. Build the application:

```bash
npm run build
```

5. Start the application using either OpenAI or LLaMA model:

```bash
# For OpenAI model
npm run start:openai

# For LLaMA model
npm run start:llama
```

6. Add images to the /src/images folder, and the application will automatically process them and select the right answer based on the extracted text.

## Save Screenshots on Mac

To easily save screenshots to the `/src/images` folder in this project, you can set up a keyboard shortcut. Follow these steps:

1. Open **System Preferences** > **Keyboard** > **Shortcuts**.
2. Click on **Screen Shots** in the left sidebar.
3. Double-click on **Save screen shot to Pictures folder** and press your desired key combination (e.g., `Command + Option + S`).
4. Release the keys, then click on the text field next to it and navigate to your project's `/dist/images` folder.
5. Click **Save**.

Now you can take screenshots using your keyboard shortcut, and they will be saved directly to the `/dist/images` folder in this project.

### Contributing

Contributions are welcome! Please read our [CONTRIBUTING.md](CONTRIBUTING.md) for more information about how to contribute to this project.

### License

This project is licensed under the Apache License 2.0 - see the LICENSE file for details.
