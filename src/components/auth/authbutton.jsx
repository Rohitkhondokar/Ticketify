// "use client"


// import { Button } from "@/components/ui/button"
// import { useAuth } from "../context/auth_context"


// export function ProtectedButton({ children, onAuthenticatedClick, ...props }) {
//   const { user,setShowAuthModal } = useAuth()

//   const handleClick = () => {
//     if (user) {
//       // User is authenticated, perform the protected action
//       onAuthenticatedClick?.()
//     } else {
//       // User is not authenticated, show the auth modal
//     //   setIsModalOpen(true)
//       setShowAuthModal(true)
//     }
//   }

//   return (
//     <Button onClick={handleClick} {...props}>
//       {children}
//     </Button>
//   )
// }
