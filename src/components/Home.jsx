import { Link } from "react-router-dom"
import {
  Box,
  Button,
  Flex,
  Image,
  Heading,
  Stack,
  Text,
} from "@chakra-ui/react"

export default function Home({
  title,
  subtitle,
  image,
  ctaLink,
  ctaText,
  additionalText,
  ...rest
}) {
  return (
    <Flex
      align="center"
      justify={{ base: "center", md: "space-around", xl: "space-between" }}
      direction={{ base: "column-reverse", md: "row" }}
      wrap="no-wrap"
      minH="70vh"
      px={8}
      mb={16}
      {...rest}
    >
      <Stack
        spacing={4}
        w={{ base: "80%", md: "40%" }}
        align={["center", "center", "flex-start", "flex-start"]}
      >
        <Heading
          as="h1"
          size="xl"
          fontWeight="bold"
          color="primary.800"
          textAlign={["center", "center", "left", "left"]}
        >
          {title}
        </Heading>
        <Heading
          as="h2"
          size="md"
          color="primary.800"
          opacity="0.8"
          fontWeight="bold"
          lineHeight={1.5}
          textAlign={["center", "center", "left", "left"]}
        >
          {subtitle}
        </Heading>
        <Heading
          as="h3"
          size="sm"
          color="primary.800"
          opacity="0.8"
          fontWeight="normal"
          lineHeight={1.5}
          textAlign={["center", "center", "left", "left"]}
        >
          {additionalText}
        </Heading>
        
        <Link to={ctaLink}>
          <Button
            borderRadius="8px"
            py="4"
            px="4"
            lineHeight="1"
            size="md"
          >
            {ctaText}
          </Button>
        </Link>
        <Text
          fontSize="xs"
          mt={2}
          textAlign="center"
          color="primary.800"
          opacity="0.6"
        >
          2024 To Present.
        </Text>
      </Stack>
      <Box w={{ base: "80%", md: "50%" }} mb={{ base: 12, md: 0 }}>
        <Image src={image} size="100%" rounded="1rem" shadow="2xl" />
      </Box>
    </Flex>
  )
}
