import { BellIcon, EmailIcon, MoonIcon, Search2Icon, SunIcon } from '@chakra-ui/icons';
import {
  Avatar,
  Box,
  Button,
  Center,
  Flex,
  Icon,
  IconButton,
  Input,
  InputGroup,
  InputRightAddon,
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuList,
  Stack,
  Tooltip,
  useColorMode,
  useColorModeValue,
  useDisclosure,
} from '@chakra-ui/react';
import { useCookies } from "react-cookie";
import { useNavigate } from 'react-router-dom';

export const Navbar2 = () => {
  const navigate = useNavigate();
  const { colorMode, toggleColorMode } = useColorMode();
  const [cookies, setCookie, removeCookie,] = useCookies(["userJwtToken"]);

  const clearCookie = () => {
    removeCookie("userJwtToken", { path: "/" });
    navigate("/");
  };

  return (
    <>
      <Box bg={useColorModeValue('gray.100', 'gray.900')} px={4}>
        <Flex h={16} alignItems={'center'} justifyContent={'space-between'}>
          <Box>
            <Button>
              fiverr.
            </Button>
          </Box>
          <InputGroup borderRadius={5} size="sm">
            <Input type="text" placeholder="Search..." border="1px solid #949494"
              width='1000px' left='5%' />
            <InputRightAddon
              p={0}
              border="none"
            >
              <Button size="sm" borderLeftRadius={0} borderRightRadius={3.3} border="1px solid #949494">
                <Icon as={Search2Icon} />
              </Button>
            </InputRightAddon>
          </InputGroup>

          <Flex alignItems={'center'}>
            <Stack direction={'row'} spacing={7}>

              <Tooltip hasArrow label='Notifications' placement='top'>
                <IconButton
                  variant='none'
                  colorScheme='black'
                  aria-label='Notifications'
                  boxSize={10}
                  icon={<BellIcon />} />
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
                  <MenuItem><a href="/" onClick={clearCookie}>Logout</a></MenuItem>
                </MenuList>
              </Menu>
            </Stack>
          </Flex>
        </Flex>
      </Box>
    </>
  );
}