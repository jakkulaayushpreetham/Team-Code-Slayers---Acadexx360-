const mongoose = require("mongoose");

let isConnected = false;

const connectDB = async () => {
    try {
        // Set mongoose options for better error handling
        mongoose.set("bufferCommands", false);

        const uri = process.env.MONGO_URI || "mongodb://127.0.0.1:27017/acadexx360";

        await mongoose.connect(uri, {
            serverSelectionTimeoutMS: 5000, // Fail fast if DB is not available
        });

        isConnected = true;
        console.log("✅ MongoDB Connected:", uri);
    } catch (err) {
        isConnected = false;
        console.error("❌ MongoDB Connection Failed:", err.message);
        console.error("");
        console.error("╔══════════════════════════════════════════════════════════╗");
        console.error("║  MongoDB is NOT running!                                ║");
        console.error("║                                                         ║");
        console.error("║  Option 1: Start local MongoDB                          ║");
        console.error("║    > mongod                                             ║");
        console.error("║                                                         ║");
        console.error("║  Option 2: Use MongoDB Atlas (free tier)                ║");
        console.error("║    1. Go to https://cloud.mongodb.com                   ║");
        console.error("║    2. Create a free cluster                             ║");
        console.error("║    3. Get connection string                             ║");
        console.error("║    4. Update BACKEND/.env:                              ║");
        console.error("║       MONGO_URI=mongodb+srv://user:pass@cluster/acadex  ║");
        console.error("║    5. Restart the server                                ║");
        console.error("║                                                         ║");
        console.error("║  The server will keep running but API calls will fail.  ║");
        console.error("╚══════════════════════════════════════════════════════════╝");
        console.error("");
    }
};

const getConnectionStatus = () => isConnected;

module.exports = connectDB;
module.exports.getConnectionStatus = getConnectionStatus;
