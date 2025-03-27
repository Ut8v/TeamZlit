import { Bell } from "lucide-react"
import * as Popover from "@radix-ui/react-popover"

const notifications = [
  { id: 1, message: "New comment on your post" },
  { id: 2, message: "You have a new follower" },
  { id: 3, message: "Weekly report is ready to view" },
]

export default function NotificationPopover() {
  return (
    <Popover.Root>
      <Popover.Trigger asChild>
        <button className="relative p-2 rounded-full hover:bg-gray-100">
          <Bell className="h-5 w-5" />
          {notifications.length > 0 && (
            <span className="absolute top-0 right-0 w-2 h-2 rounded-full bg-red-500"></span>
          )}
        </button>
      </Popover.Trigger>
      <Popover.Portal>
        <Popover.Content
          sideOffset={5}
          className="w-64 p-4 rounded-xl shadow-lg bg-white border border-gray-200 z-50"
        >
          <h3 className="text-sm font-semibold mb-2">Notifications</h3>
          <div className="space-y-2 max-h-60 overflow-auto">
            {notifications.length === 0 ? (
              <p className="text-sm text-gray-500">No new notifications</p>
            ) : (
              notifications.map((n) => (
                <div
                  key={n.id}
                  className="p-2 rounded-lg bg-gray-50 hover:bg-gray-100 text-sm"
                >
                  {n.message}
                </div>
              ))
            )}
          </div>
          <Popover.Arrow className="fill-white" />
        </Popover.Content>
      </Popover.Portal>
    </Popover.Root>
  )
}
