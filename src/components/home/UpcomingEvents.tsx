import { getUpcomingEvents } from "@/lib/events";
import UpcomingEventsCarousel from "./UpcomingEventsCarousel";

// Server component: fetches upcoming concerts from WordPress (cached for 5 minutes)
// and hands them to the client carousel. Use it exactly as before: <UpcomingEvents />
export default async function UpcomingEvents() {
  const events = await getUpcomingEvents(12);
  return <UpcomingEventsCarousel events={events} />;
}
