import {
    createContext,
    useContext,
    useState,
    type SetStateAction
} from 'react'

import type { NotificationItem } from '../components/client/NavBar/NotificationItem'

type NotificationContextProp = {
    notifications: NotificationItem[]
    setNotifications: React.Dispatch<SetStateAction<NotificationItem[]>>
}

export const NotificationContext = createContext<NotificationContextProp|null>(null)

export function NotificationProvider ({ children }: {children:React.ReactNode}) {

    const [notifications, setNotifications] = useState<NotificationItem[]>([])

    return (
        <NotificationContext.Provider value={{
            notifications,
            setNotifications
        }}>
            {children}
        </NotificationContext.Provider>
    )
}

export function useNotificationContext() {
    const notificationContext = useContext(NotificationContext);

    if (!notificationContext) {
        throw new Error('useNotificationContext must be within NotificationContextProvider')
    }

    return notificationContext;
}