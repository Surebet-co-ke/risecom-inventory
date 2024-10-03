import React, { useState } from 'react';
import { Box, Flex, Heading, Text, SimpleGrid, Image, Input } from "@chakra-ui/react";

import { membersData } from '../data/members';

const Members = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const filteredMembers = membersData.filter((member) =>
    member.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    member.workEmail.toLowerCase().includes(searchQuery.toLowerCase()) ||
    member.personalEmail.toLowerCase().includes(searchQuery.toLowerCase())
  );

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
        Members
      </Heading>

      {/* Search Input */}
      <Input 
        placeholder="Search by name, work email, or personal email"
        mb={6}
        value={searchQuery}
        onChange={handleSearchChange}
        width="50%"
        textAlign="center"
      />

      {/* Display Members */}
      <SimpleGrid columns={{ base: 1, md: 3 }} spacing={8} m={2} p={2}>
        {filteredMembers.map((member) => (
          <Box 
            key={member.id} 
            boxShadow="lg" 
            p={6} 
            rounded="md"
            _hover={{
                transform: "scale(1.02)", 
                boxShadow: "xl", 
                cursor: "pointer",
                transition: "transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out", 
              }}
            >
            <Image src={member.avatar} alt={member.name} mb={4} rounded="full" boxSize="200px" />

            <Heading as="h3" size="md" mb={2}>
              {member.name}
            </Heading>

            <Text fontSize="md" color="primary.800" opacity="0.8" mb={1}>
              Work Email: {member.workEmail}
            </Text>

            <Text fontSize="md" color="primary.800" opacity="0.8" mb={4}>
              Personal Email: {member.personalEmail}
            </Text>
            <Text fontSize="md" color="primary.800" opacity="0.8" mb={4}>
              Phone: {member.phone}
            </Text>
          </Box>
        ))}
      </SimpleGrid>
    </Flex>
  );
};

export default Members;
