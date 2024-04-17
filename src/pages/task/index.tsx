import { Box } from '@chakra-ui/react'
import CenterContainer from '../../components/CenterContainer'
import TasksComponent from '../../components/TasksComponent'

export const Task = () => {
  return (
    <CenterContainer maxW='4xl' headingText='Suas Tarefas'>
      <Box
        py={{ base: '0', sm: '8' }}
        px={{ base: '10', sm: '10' }}
        bg={{ base: 'transparent', sm: 'bg.surface' }}
        boxShadow={{ base: 'none', sm: 'md' }}
        borderRadius={{ base: 'none', sm: 'xl' }}
      >
        <TasksComponent />
      </Box>
    </CenterContainer>
  )
}
