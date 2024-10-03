import { Flex } from "@chakra-ui/react"
import Header from "../components/Header"
import Footer from "../components/Footer"
import Home from "../components/Home"

export default function Landing(props) {
  return (
    <Flex
      direction="column"
      align="center"
      maxW={{ xl: "1200px" }}
      m="0 auto"
      {...props}
    >
      <Header />
      <Home
        title="risecom "
        subtitle="|•° Inventory | •° |"
        additionalText="............................................"
        image="https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8bGFwdG9wcyUyMGludmVudG9yeXxlbnwwfHwwfHx8MA%3D%3D?crop=entropy&cs=tinysrgb&fit=max&h=600&w=800"
        ctaText="Contact"
        ctaLink="/Contact"
      />
      <Footer />
    </Flex>
  )
};
