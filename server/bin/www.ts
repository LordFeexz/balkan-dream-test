import { config } from "dotenv";
import app from "..";

config();

const port = process.env.PORT ?? 3001;

app.listen(port, () => console.log(`app listening on port ${port}`));
