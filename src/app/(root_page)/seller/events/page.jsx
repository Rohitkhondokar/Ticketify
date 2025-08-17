import SellerEventsClient from "@/components/SellerEventsClient";
import { getVendorEvents } from "../../../../../action/eventActions";

export default async function SellerEvents() {
  // Fetch vendor events from backend
  const vendorId = "1"; // Default vendor ID for now
  const eventsResult = await getVendorEvents(vendorId);

  const events = eventsResult.success ? eventsResult.data : [];

  return <SellerEventsClient events={events} />;
}
