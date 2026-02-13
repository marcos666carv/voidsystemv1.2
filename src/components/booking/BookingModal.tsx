import { ClientCalendar } from "@/components/booking/ClientCalendar";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

export function BookingModal() {
    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button>Book via Calendar</Button>
            </DialogTrigger>
            <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
                {/* Use a real service ID from DB if possible, or mock one that matches the seed data/schema */}
                <ClientCalendar
                    serviceId="s1" // Assuming 's1' exists from mockData or DB seed 
                    onSlotSelect={(date, time) => console.log('Selected', date, time)}
                />
            </DialogContent>
        </Dialog>
    )
}
