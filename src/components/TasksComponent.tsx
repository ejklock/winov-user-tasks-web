import {
  Box,
  Button,
  Flex,
  Table,
  TableCaption,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from '@chakra-ui/react'
import { useCallback, useContext, useEffect, useState } from 'react'
import { ApiPaginatedResponse } from '../hooks/api/api.types'
import useApi from '../hooks/api/use-api'
import AuthContext from '../store/auth/auth.context-provider'

type Task = {
  id: number
  title: string
  description: string
  completed_at: Date
  created_at: Date
}

export default function TasksComponent() {
  const [tasks, setTasks] = useState<ApiPaginatedResponse<Task>>()
  const { request, setError } = useApi<ApiPaginatedResponse<Task>>()
  const [page, setPage] = useState(1)
  const [perPage, setPerPage] = useState(1)
  const { globalLogOutDispatch } = useContext(AuthContext)

  const fetchData = useCallback(() => {
    setTasks(undefined)
    request<ApiPaginatedResponse<Task>>(
      'GET',
      `tasks?page=${page}&per_page=${perPage}`,
      undefined,
      undefined,
      setTasks,
      setError
    )
  }, [page, perPage, request, setTasks, setError])

  useEffect(() => {
    fetchData()
  }, [page])
  return (
    <div>
      <Box mt={4} mb={8}>
        <Button
          colorScheme='green'
          mt={8}
          onClick={() => alert('Creating task...')}
        >
          Add Task
        </Button>
        <TableContainer>
          <Table variant='simple'>
            <TableCaption>Gerencie suas tarefas</TableCaption>
            <Thead>
              <Tr>
                <Th>Tarefa</Th>
                <Th>Entregue?</Th>
                <Th>Ações</Th>
              </Tr>
            </Thead>
            <Tbody>
              {tasks?.data.map((task) => (
                <Tr key={task.id}>
                  <Td>{task.title}</Td>
                  <Td>{task.completed_at ? 'Sim' : 'Não'}</Td>
                  <Td>
                    <Button
                      colorScheme='red'
                      onClick={() => {
                        globalLogOutDispatch()
                      }}
                    >
                      Log Out
                    </Button>
                  </Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
          <Flex mt={4}>
            <Button
              onClick={() => setPage(page === 1 ? 1 : page - 1)}
              isDisabled={tasks?.links?.prev === null}
            >
              Anterior
            </Button>
            <Button
              ml={2}
              onClick={() => setPage(page + 1)}
              isDisabled={tasks?.links?.next === null}
            >
              Próximo
            </Button>
          </Flex>
        </TableContainer>
      </Box>
    </div>
  )
}
