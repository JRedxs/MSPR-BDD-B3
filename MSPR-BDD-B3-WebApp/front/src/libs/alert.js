import { useToast } from "@chakra-ui/react"

export function useCustomToast() {
  const toast = useToast()

  const showToast = ({ title, description, status }) => {
    toast({
      title      : title,
      position   : "top",
      description: description,
      status     : status,
      duration   : 5000,
      isClosable : true,
    })
  }

  return showToast
}
