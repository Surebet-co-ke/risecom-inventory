import { Link } from "react-router-dom";
import {
  Box,
  Flex,
  Text,
  Button,
  IconButton,
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  DrawerHeader,
  DrawerBody,
  useDisclosure,
} from "@chakra-ui/react";
import { ColorModeSwitcher } from "../ColorModeSwitcher";
import { useEffect, useState } from "react";
import { HiOutlineMenu } from 'react-icons/hi';

import Logo from "./Logo";

const MenuItem = (props) => {
  const { children, isLast, onClick, to = "/", ...rest } = props;
  return (
    <Text
      mb={{ base: isLast ? 0 : 4, sm: 0 }}
      mr={{ base: 0, sm: isLast ? 0 : 8 }}
      mt={{ base: 4 , sm: 0}}
      display="block"
      fontWeight="medium"
      letterSpacing="0.3px"
      lineHeight={{ base: "1.8", sm: "normal" }}
      _hover={{ transform: "translateY(-2px)" }}
      {...rest}
    >
      <Link to={to} onClick={onClick}>{children}</Link>
    </Text>
  );
};

const Header = (props) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [isMobile, setIsMobile] = useState(false);

  const toggleMobileView = () => {
    setIsMobile(window.innerWidth <= 768); 
  };

  useEffect(() => {
    toggleMobileView();
    window.addEventListener("resize", toggleMobileView);
    return () => {
      window.removeEventListener("resize", toggleMobileView);
    };
  }, []);

  return (
    <Flex
      as="nav"
      align="center"
      justify="space-between"
      wrap="wrap"
      w="100%"
      mb={4}
      p={8}
      bg={["primary.500", "primary.500", "transparent", "transparent"]}
      {...props}
    >
      <Flex align="center">
        <Logo height={44} />
      </Flex>

      {isMobile ? (
        <>
          <IconButton
            icon={<HiOutlineMenu />}
            aria-label="Open Menu"
            size="lg"
            variant="ghost"
            onClick={onOpen}
          />
          <Drawer placement="right" onClose={onClose} isOpen={isOpen}>
            <DrawerOverlay>
              <DrawerContent>
                <DrawerCloseButton />
                <DrawerHeader>Menu</DrawerHeader>
                <DrawerBody>
                  <Box>
                    <MenuItem to="/" onClick={onClose} isLast={false}>
                      Home
                    </MenuItem>                   
                    <MenuItem to="/members" onClick={onClose} isLast={false}>
                      Members
                    </MenuItem>
                    <MenuItem to="/inventories" onClick={onClose} isLast={false}>
                      Inventories
                    </MenuItem>
                    <MenuItem to="/allocations" onClick={onClose} isLast={false}>
                      Allocations
                    </MenuItem>                                         
                    <MenuItem to="/contact" onClick={onClose} isLast={true}>
                      <Button
                        size="sm"
                        rounded="md"
                        _hover={{
                          bg: [
                            "primary.100",
                            "primary.100",
                            "primary.600",
                            "primary.600",
                          ],
                        }}
                      >
                        Contact
                      </Button>
                    </MenuItem>
                    <MenuItem onClick={onClose}>
                      <ColorModeSwitcher />
                    </MenuItem>
                  </Box>
                </DrawerBody>
              </DrawerContent>
            </DrawerOverlay>
          </Drawer>
        </>
      ) : (
        <Box flexBasis={{ base: "100%", md: "auto" }}>
          <Flex
            align={["center", "center", "center", "center"]}
            justify={["center", "space-between", "flex-end", "flex-end"]}
            direction={["column", "row", "row", "row"]}
            pt={[4, 4, 0, 0]}
          >
            <MenuItem to="/">Home</MenuItem>
            <MenuItem to="/members">Members</MenuItem>
            <MenuItem to="/inventories">Inventories</MenuItem>
            <MenuItem to="/allocations">Allocations</MenuItem>           
            <MenuItem to="/contact">
              <Button
                size="sm"
                rounded="md"
                _hover={{
                  bg: [
                    "primary.100",
                    "primary.100",
                    "primary.600",
                    "primary.600",
                  ],
                }}
              >
                Contact
              </Button>
            </MenuItem>
            <MenuItem>
              <ColorModeSwitcher />
            </MenuItem>
          </Flex>
        </Box>
      )}
    </Flex>
  );
};

export default Header;
