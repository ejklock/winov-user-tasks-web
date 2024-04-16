import { Box } from '@chakra-ui/react'
import { useCallback, useContext, useEffect, useState } from 'react'
import CenterContainer from '../../components/CenterContainer'
import TasksComponent from '../../components/TasksComponent'
import { ApiPaginatedResponse } from '../../hooks/api/api.types'
import useApi from '../../hooks/api/use-api'
import AuthContext from '../../store/auth/auth.context-provider'

type Task = {
  id: number
  title: string
  description: string
  completed_at: Date
  created_at: Date
}

export const Task = () => {
  const [tasks, setTasks] = useState<ApiPaginatedResponse<Task>>()
  const { request, setError } = useApi<ApiPaginatedResponse<Task>>()
  const { globalLogOutDispatch } = useContext(AuthContext)

  const fetchData = useCallback(async () => {
    await request<ApiPaginatedResponse<Task>>(
      'GET',
      'tasks',
      undefined,
      undefined,
      setTasks,
      setError
    )
  }, [request, setError])

  useEffect(() => {
    fetchData()
  }, [])

  return (
    <CenterContainer headingText='Suas Tarefas'>
      <Box
        py={{ base: '0', sm: '8' }}
        px={{ base: '4', sm: '10' }}
        bg={{ base: 'transparent', sm: 'bg.surface' }}
        boxShadow={{ base: 'none', sm: 'md' }}
        borderRadius={{ base: 'none', sm: 'xl' }}
      >
        <TasksComponent />
      </Box>
    </CenterContainer>
  )
}
