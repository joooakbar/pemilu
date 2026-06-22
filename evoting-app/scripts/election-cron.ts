import cron from "node-cron";
import "dotenv/config";
import { updateElectionStatus } from "./upadateElectionsStatus";

console.log("Election cron started...");

cron.schedule("*/10 * * * * *", async () => {
  console.log("Cron running...");

  try {
    await updateElectionStatus();
    console.log("Update election status success");
  } catch (err) {
    console.error("Cron error:", err);
  }
});
