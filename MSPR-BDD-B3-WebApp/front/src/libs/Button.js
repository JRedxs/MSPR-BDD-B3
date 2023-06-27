import { Button} from "@chakra-ui/react"
import { useState } from "react"

export function useGenericButton({ label, colorScheme, loadingText }) {
  const [isLoading, setIsLoading] = useState(false)

  const handleClick = () => {
    setIsLoading(true)
    // Effectuez ici vos actions lors du clic sur le bouton
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
