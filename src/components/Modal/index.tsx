import {
  Modal as ChakraModal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
} from '@chakra-ui/react'

type ModalProps = {
  readonly headerText: string
  readonly children: React.ReactNode
  readonly isOpen: boolean
  readonly onClose: () => void
  readonly onOpen: () => void
}

export default function Modal({
  headerText,
  isOpen,
  onClose,
  onOpen,
  children,
}: ModalProps) {
  return (
    <ChakraModal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>{headerText}</ModalHeader>
        <ModalCloseButton />
        <ModalBody>{children}</ModalBody>
      </ModalContent>
    </ChakraModal>
  )
}
