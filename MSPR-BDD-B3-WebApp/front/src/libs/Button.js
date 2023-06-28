import { Button } from "@chakra-ui/react"
import { useState } from "react"
import { useNavigate } from "react-router-dom"

export function GenericButton({ label, colorScheme, loadingText, onClick, to }) {
  const [isLoading, setIsLoading] = useState(false)
  const navigate = useNavigate()

  const handleClick = () => {
    setIsLoading(true)

    if (onClick) {
      
      onClick()
    }

    if (to) {
      navigate(to)
    }

    setIsLoading(false)
  }

  return (
    <Button
      colorScheme={colorScheme}
      variant="solid"
      isLoading={isLoading}
      onClick={handleClick}
    >
      {isLoading ? loadingText : label}
    </Button>
  )
}
