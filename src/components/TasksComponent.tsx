import { Box, Button, List, ListItem } from '@chakra-ui/react'

export default function TasksComponent() {
  return (
    <div>
      <h1>Tasks</h1>
      <Box mt={4} mb={8}>
        <List spacing={3}>
          <ListItem></ListItem>
        </List>
      </Box>
      <Button
        colorScheme='green'
        mt={8}
        onClick={() => alert('Creating task...')}
      >
        Add Task
      </Button>
    </div>
  )
}
