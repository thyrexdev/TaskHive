import app from "./server";
import dotenv from "dotenv";
import logger from "./utils/logger";

dotenv.config();

const PORT = process.env.PORT;

app.listen(PORT, () => {
    logger.info(`Server is running on http://localhost:${PORT}`);
})