import React, { useState } from "react";
import { Box, Flex, Heading, SimpleGrid, Button, AlertDialog, AlertDialogOverlay, AlertDialogContent, AlertDialogHeader, AlertDialogCloseButton, AlertDialogBody, AlertDialogFooter, useClipboard } from "@chakra-ui/react";
import { FaPhone, FaEnvelope } from "react-icons/fa";

const contactData = [
  { 
    id: 1, 
    name: "Phone", 
    icon: <FaPhone />, 
    number: "+254797124132" 
  },
  { 
    id: 2, 
    name: "Phone", 
    icon: <FaPhone />, 
    number: "+254797933327"  
  },
  { 
    id: 1, 
    name: "Phone", 
    icon: <FaPhone />, 
    number: "+254703755010" 
  },
  { 
    id: 2, 
    name: "Email", 
    icon: <FaEnvelope />, 
    email: "alexndegwa49@gmail.com" 
  },
];

const Contact = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [contactInfo, setContactInfo] = useState({});
    const { hasCopied: hasCopiedEmail, onCopy: onCopyEmail } = useClipboard(contactInfo.email);
    const { hasCopied: hasCopiedNumber, onCopy: onCopyNumber } = useClipboard(contactInfo.number);

    const onClose = () => setIsOpen(false);

    const handleContactClick = (info) => {
        setContactInfo(info);
        setIsOpen(true);
    };

  return (
    <Flex
      direction="column"
      align="center"
      maxW={{ xl: "1200px" }}
      m="0 auto"
    >
      <Heading 
        as="h2" 
        size="lg" 
        mb={4} 
        fontWeight="bold" 
        color="primary.800" 
        textAlign="center"
      >
        Contact
      </Heading>

      <SimpleGrid columns={{ base: 1, sm: 2, md: 4 }} spacing={8}>
        {contactData.map((contact) => (
          <Box key={contact.id} boxShadow="lg" p={6} rounded="md" textAlign="center">
            <Box fontSize="3xl" mb={4}>
              {contact.icon}
            </Box>
            <Heading as="h3" size="md" mb={2}>
              {contact.name}
            </Heading>
            {(contact.number || contact.email) && (
              <Button size="md" onClick={() => handleContactClick(contact)}>
                View
              </Button>
            )}
            {contact.link && (
              <Button as="a" size="md" href={contact.link} target="_blank" rel="noopener noreferrer">
                View
              </Button>
            )}
          </Box>
        ))}
      </SimpleGrid>

      {/* AlertDialog for showing contact info */}
      <AlertDialog isOpen={isOpen} onClose={onClose}>
        <AlertDialogOverlay />
        <AlertDialogContent>
          <AlertDialogHeader>{contactInfo.name}</AlertDialogHeader>
          <AlertDialogCloseButton />
          <AlertDialogBody>
            {contactInfo.number && (
              <>
                <p>{contactInfo.number}</p>
                <Button onClick={onCopyNumber} ml={3} mt={4}>
                  {hasCopiedNumber ? "Copied" : "Copy Number"}
                </Button>
              </>
            )}
            {contactInfo.email && (
              <>
                <p>{contactInfo.email}</p>
                <Button onClick={onCopyEmail} ml={3} mt={4}>
                  {hasCopiedEmail ? "Copied" : "Copy Email"}
                </Button>
                <Button as="a" href={`mailto:${contactInfo.email}`} ml={3} mt={4}>
                  Mail Us
                </Button>
              </>
            )}
          </AlertDialogBody>
          <AlertDialogFooter>
            <Button colorScheme="pink" bg="blue.600" onClick={onClose} ml={3}>
              Close
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </Flex>
  );
};

export default Contact;
