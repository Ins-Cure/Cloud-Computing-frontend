<div align="center">
<h1> Inscure Website </h1>

</div>
<img src="https://github.com/Ins-Cure/Cloud-Computing-frontend/assets/115334112/435d7906-fe11-4f85-adb0-8546e9e323a3" alt="md-1" width="600" style="border-radius:15px; margin-bottom:10px"/>


# How To Start ?

## Setting Up GCP

1. **Start a new project:**

   - Visit the [GCP Console](https://console.cloud.google.com/).
   - Click the project drop-down menu and choose "New Project".
   - Enter a name for your project and click "Create".

2. **Create an App Engine Applications:**

   - Open the Navigation Menu and type "App Engine".
   - On the App Engine page, click "Create Application".
   - Select a region for your app.
   - Choose the language and environment for your app.

## Setting Up Firebase

1. **Start a new Project**

   - Visit the [Firebase Console](https://firebase.google.com/).
   - Click on "Create Project".

2. **Create a new firestore database**

   - Go to the "Cloud Firestore" tab.
   - Enable the database.

3. **Add a new Web App Porject**

   - Click on the settings icon and then select "Project Settings".
   - Click the "Add App" button and choose the web platform.
   - Register your app.

4. **Save the firebase config Object**
   - Go to the app page that you registered.
   - Copy all the values inside the **firebaseConfig** object.

## **Clone The Project to your local Repositories**

1. **Open the Cloud Shell:**
   - Click the Cloud Shell icon in the top-right corner of the page.
   - Run the following code in your terminal:
   ```bash
   sudo apt-get update
   ```
   ```bash
   sudo apt install git
   ```
2. **Clone the the project:**
   - In the Cloud Shell terminal, clone the project using the following command:
   ```
   git clone https://github.com/Ahdaaa/inscure-fe
   ```

## Deploy The Next.js App to App Engine

1.  **Create a .env.local file:**

- Navigate to your app directory.
- Create a file called `.env.local`
- Populate the file with the following code:

  ```bash
  NEXT_PUBLIC_FIREBASE_APIKEY="[firebaseconfig value that you have copied earlier]"
  NEXT_PUBLIC_AUTHDOMAIN="[firebaseconfig value that you have copied earlier]"
  NEXT_PUBLIC_FBASE_AUTH_DOMAIN="[firebaseconfig value that you have copied earlier]"
  NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET="[firebaseconfig value that you have copied earlier]"
  NEXT_PUBLIC_FBASE_MESSAGING_SENDER_ID="[firebaseconfig value that you have copied earlier]"
  NEXT_PUBLIC_FBASE_APP_ID="[firebaseconfig value that you have copied earlier]"
  NEXT_PUBLIC_FBASE_MEASUREMENT_ID="[firebaseconfig value that you have copied earlier]"
  NEXT_PUBLIC_BASEAPI="[Your Backend API endpoints]"
  ```

2.  **Create an app.yaml file:**

- Create a file called `app.yaml`
- Populate the file with the following code:

  ```yaml
  runtime: nodejs22
  service: default

  handlers:
  - url: /.*
      secure: never
      script: auto

  env_variables:
  NODE_ENV: "production"
  ```

3. **Deploy your app to App engine**

   - To deploy your app to Google App Engine, run the following command (ensure you are inside the project directory):

   ```
   gcloud app deploy
   ```
