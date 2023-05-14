import { useCookies } from "react-cookie";
import {
  Box,
  Flex,
  Avatar,
  Link,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
  useDisclosure,
  useColorModeValue,
  Stack,
  useColorMode,
  Center,
  InputGroup,
  InputLeftElement,
  Input,
  InputRightAddon,
  Icon,
  IconButton,
  Badge,
  Tooltip,
} from '@chakra-ui/react';
import { BellIcon, MoonIcon, Search2Icon, SunIcon, EmailIcon } from '@chakra-ui/icons';

// const NavLink = ({ children }: { children: ReactNode }) => (
//   <Link
//     px={2}
//     py={1}
//     rounded={'md'}
//     _hover={{
//       textDecoration: 'none',
//       bg: useColorModeValue('gray.200', 'gray.700'),
//     }}
//     href={'#'}>
//     {children}
//   </Link>
// );

export const Navbar2 = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <>
      <Box bg={useColorModeValue('gray.100', 'gray.900')} px={4}>
        <Flex h={16} alignItems={'center'} justifyContent={'space-between'}>
          <Box>fiverr.</Box>
          <InputGroup borderRadius={5} size="sm"> 
            <Input type="text" placeholder="Search..." border="1px solid #949494" 
              width='1000px' left='5%' />
            <InputRightAddon
            p={0}
            border="none"
            >
            <Button size="sm" borderLeftRadius={0} borderRightRadius={3.3} border="1px solid #949494">
                <Icon as={Search2Icon}/>
            </Button>
            </InputRightAddon>
            </InputGroup>

          <Flex alignItems={'center'}>
            <Stack direction={'row'} spacing={7}>
                
            <Tooltip hasArrow label='Notifications'placement='top'>
            <IconButton
                variant='none'
                colorScheme='black'
                aria-label='Notifications'
                boxSize={10}
                icon={<BellIcon />}/>
           </Tooltip>
           <Tooltip hasArrow label='Messages' placement='top'>
                <IconButton
                    variant='none'
                    colorScheme='black'
                    aria-label='Messages'
                    boxSize={10}
                    icon={<EmailIcon />}
                    />
            </Tooltip>
                <Button
                    variant='none'
                    colorScheme='black'
                    aria-label='Moon'
                    boxSize={10}
                    onClick={toggleColorMode} >
                        {colorMode === 'light' ? <MoonIcon /> : <SunIcon />}
                </Button>
                       
                
              <Menu>
                <MenuButton
                  as={Button}
                  rounded={'full'}
                  variant={'link'}
                  cursor={'pointer'}
                  minW={0}>
                  <Avatar
                    size={'sm'}
                    src={'https://avatars.dicebear.com/api/male/username.svg'}
                  />
                </MenuButton>
                <MenuList alignItems={'center'}>
                  <br />
                  <Center>
                    <Avatar
                      size={'2xl'}
                      src={'https://avatars.dicebear.com/api/male/username.svg'}
                    />
                  </Center>
                  <br />
                  <Center>
                    <p>Username</p>
                  </Center>
                  <br />
                  <MenuDivider />
                  <MenuItem><a href="/editClient">Manage Your Account</a></MenuItem>
                  <MenuItem><a href="/">Logout</a></MenuItem>
                </MenuList>
              </Menu>
            </Stack>
          </Flex>
        </Flex>
      </Box>
    </>
  );
}