AN backend of an authenticated blog platform

## 🛠️ Setting Up MongoDB Connection in Your Project

To connect your Node.js application to MongoDB using Mongoose, you need to store your database URL securely in a `.env` file.

### 📄 1. Create a `.env` file in your project root:
``` MONGO_URI=mongodb+srv://<username>:<password>@cluster0.mongodb.net/<dbname>?retryWrites=true&w=majority ```
> Replace `<username>`, `<password>`, and `<dbname>` with your actual MongoDB credentials.

### 🧬 2. Load environment variables using `dotenv`:
Make sure you've installed `dotenv`:
```bash
npm install dotenv
```
Then, at the top of your main file (e.g., index.js or server.js), add:
``` require('dotenv').config(); ```
