import { Bell } from "lucide-react"
import * as Popover from "@radix-ui/react-popover"
import { useState } from "react"
import { useEffect } from "react"
import JoinTeamService from "@/services/joinTeam/joinTeam"

export default function NotificationPopover() {
    const [notifications, setNotifications] = useState([])

    const fetchNotifications = async () => {
        try{
        const response = await JoinTeamService.getNotification()
        if (response.success) {
            setNotifications(response.data.data.length > 0 ? response.data.data : [{ id: 0, message: "No new notifications" }])
        } else {
            console.error("Error fetching notifications:", response.message)
        }}
        catch (error) {
            console.error("Error fetching notifications:", error)
        }

    }
    useEffect(() => {
        fetchNotifications()
    }, [])

    const handleAcceptToTeam = async (notificationId, sender_id) => {
        try {
            const response = await JoinTeamService.acceptToTeam(notificationId, sender_id)
            if (response.success) {
                setNotifications((prev) => prev.filter((n) => n.id !== notificationId))
            } else {
                console.error("Error accepting to team:", response.message)
            }
        } catch (error) {
            console.error("Error accepting to team:", error)
        }
    }
    
  return (
    <Popover.Root>
  <Popover.Trigger asChild>
    <button className="relative p-2 rounded-full hover:bg-gray-100">
      <Bell className="h-5 w-5 text-white" />
      {notifications.length > 0 && (
        <span className="absolute top-0 right-0 w-2 h-2 rounded-full bg-red-500"></span>
      )}
    </button>
  </Popover.Trigger>
  <Popover.Portal>
    <Popover.Content
      sideOffset={5}
      className="w-72 p-4 rounded-xl shadow-lg bg-white border border-gray-200 z-50"
    >
      <h3 className="text-sm font-semibold mb-2">Notifications</h3>
      <div className="space-y-3 max-h-60 overflow-auto">
        {notifications.map((n) => (
          <div
            key={n.id}
            className="p-3 rounded-lg bg-gray-50 hover:bg-gray-100 text-sm border border-gray-200"
          >
            <p>{n.message}</p>
            {n.type === "request" && (
            <div className="mt-2 flex gap-2">
              <button 
                className="px-3 py-1 text-xs font-medium text-white bg-green-500 hover:bg-green-600 rounded-md"
                onClick={() => handleAcceptToTeam(n.id, n.sender_id)}
                >
                Accept
              </button>
              <button className="px-3 py-1 text-xs font-medium text-white bg-red-500 hover:bg-red-600 rounded-md">
                Reject
              </button>
            </div>
            )}
          </div>
        ))}
      </div>
      <Popover.Arrow className="fill-white" />
    </Popover.Content>
  </Popover.Portal>
</Popover.Root>

  )
}