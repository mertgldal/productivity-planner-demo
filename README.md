# SmartPlan AI - AI-Powered Productivity Planner

SmartPlan AI is a mobile application designed to help users manage their tasks and time more effectively through personalized, AI-driven suggestions. This project is developed as part of a diploma thesis.

## 🚀 Features

* **Intelligent Task Management:** Create, organize, and track tasks with titles and deadlines.
* **AI-Powered Suggestions (Conceptual):** The app aims to provide proactive recommendations for task scheduling and prioritization (future development).
* **User Authentication:** Secure login and registration (currently mocked).
* **Navigation:**
    * Dashboard (Home)
    * All Tasks List
    * Create New Task
* **Cross-Platform:** Built with React Native and Expo.

## 🛠️ Tech Stack

* **Framework:** React Native with Expo
* **Routing:** Expo Router (file-system based)
* **State Management:** Zustand
* **Language:** TypeScript
* **UI Components:** Core React Native components, `@expo/vector-icons`
* **Date/Time Picker:** `@react-native-community/datetimepicker` (via `react-native-modal-datetime-picker` or direct usage)
* **IDE:** WebStorm (as mentioned by the developer)

## 📸 Screenshots

*(Here you will embed your screenshots. For example:)*

**Login Screen:**
![Login Screen](/assets/readme-screenshots/Media%20(5).jpg)

**Register Screen:**
![Register Screen](/assets/readme-screenshots/Media%20(4).jpg)

**Dashboard (Home Screen):**
![Dashboard Screen](/assets/readme-screenshots/Media%20(3).jpg)

**All Tasks Screen:**
![All Tasks Screen](/assets/readme-screenshots/Media%20(1).jpg)

**Create Task Screen:**
![Create Task Screen](/assets/readme-screenshots/Media%20(2).jpg)

## ⚙️ Setup and Running

1.  **Prerequisites:**
    * Node.js (LTS version recommended)
    * NPM or Yarn
    * Expo CLI: `npm install -g expo-cli` (if not already installed)
    * A physical device with the Expo Go app or an Android/iOS emulator.
    * (For native builds/certain scenarios without Android Studio): Correctly configured Android SDK (including Platform Tools and a JDK like OpenJDK 17) with `ANDROID_HOME` and `JAVA_HOME` environment variables set, and relevant SDK directories added to the system PATH.

2.  **Clone the repository (if applicable):**
    ```bash
    git clone <https://github.com/mertgldal/productivity-planner-demo>
    cd mobile_app 
    ```
    
3.  **Install dependencies:**
    ```bash
    npm install
    ```
    *(or `yarn install`)*

4.  **Run the application:**
    * To start the development server and see options (QR code for Expo Go, run on emulator/device):
        ```bash
        npm start 
        ```
        *(or `expo start`)*
    * To directly attempt to run on an Android emulator/device:
        ```bash
        npm run android
        ```
        *(or `expo start --android`)*
    * To directly attempt to run on an iOS simulator/device (macOS only):
        ```bash
        npm run ios
        ```
        *(or `expo start --ios`)*

## 📝 Project Structure (Expo Router)

The app uses Expo Router, with main navigation defined in `app/_layout.tsx` and route groups:
* `app/(auth)/`: Contains login and register screens.
* `app/(app)/`: Contains the main application screens accessible after authentication.
* `src/`: Contains reusable components, Zustand stores, type definitions, and utility functions.

## 📄 Report / App Concept Document

**App Name:** SmartPlan AI

**Purpose:** To help users manage tasks and time effectively with AI-driven suggestions.

**Key Features:** Intelligent task management (with deadlines), AI-powered planning suggestions (conceptual), user authentication.

**Target Audience:** Students, professionals, freelancers, and anyone seeking enhanced productivity.

**Unique Selling Proposition:** Proactive and personalized AI planning layer to reduce decision fatigue and optimize workflows.

---
