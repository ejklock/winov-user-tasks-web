import { Box, Button, Stack, Text } from '@chakra-ui/react'

import useAuth from '../../hooks/auth/use-auth'
import { AuthState } from '../../store/auth/auth.reducer'

export type MasterProps = {
  readonly children: React.ReactNode
  readonly authState?: AuthState
}

export default function Master({ children, authState }: MasterProps) {
  const { globalLogOutDispatch } = useAuth()

  return (
    <>
      {authState?.isLoggedIn ? (
        <Box bg='gray.100' p={4}>
          <Stack
            direction='row'
            align='center'
            justifyContent={'space-around'}
            spacing={4}
          >
            <>
              <Text>Bem vindo, {authState?.name || 'Guest'}</Text>

              <Button onClick={globalLogOutDispatch}>Logout</Button>
            </>
          </Stack>
        </Box>
      ) : null}

      {children}
    </>
  )
}
