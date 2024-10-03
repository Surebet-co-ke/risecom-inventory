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
        additionalText="a savings group where members pool resources and invest in shared goals."
        image="https://plus.unsplash.com/premium_photo-1680230177520-e87271066e5d?crop=entropy&cs=tinysrgb&fit=max&h=600&w=800"
        ctaText="Contact"
        ctaLink="/Contact"
      />
      <Footer />
    </Flex>
  )
};
