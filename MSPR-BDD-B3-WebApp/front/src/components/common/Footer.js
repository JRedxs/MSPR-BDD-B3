import { Box, Text, Link, Flex, VStack, HStack, IconButton } from '@chakra-ui/react'
import { FaFacebook, FaTwitter, FaGoogle, FaInstagram, FaLinkedin, FaGithub } from 'react-icons/fa'

const Footer = () => {
	return (
		<Box bg="#956657" color="white" as="footer" py="4">
			<Flex
				direction={["column", "row"]}
				justify="space-between"
				align="flex-start"
				wrap="wrap"
				maxW="1200px"
				mx="auto"
				px={["4", "16"]}
			>
				<VStack align="start" mb="4" spacing={4}>
					<Text fontWeight="bold" textTransform="uppercase">RGPD</Text>
					<Link href='/rgpd/NoticeTraitementsDesDonnées.pdf' isExternal>Notice du traitement</Link>
				</VStack>
				<VStack align="start" mb="4" spacing={4}>
					<Text fontWeight="bold" textTransform="uppercase">Contact</Text>
					<Text><i className="fas fa-home mr-3"></i> EPSI Lille, 2 rue Alphonse Colas, Pl. du Concert, 59800 Lille</Text>
					<Text><i className="fas fa-envelope mr-3"></i> info@lille-epsi.fr</Text>
					<Text><i className="fas fa-phone mr-3"></i> 03 20 34 35 36</Text>
				</VStack>
				<VStack align="start" mb="4" spacing={4}>
					<Text fontWeight="bold" textTransform="uppercase">Follow us</Text>
					<HStack>
						<IconButton aria-label="Facebook" icon={<FaFacebook />} colorScheme="facebook" variant="ghost"/>
						<IconButton aria-label="Twitter" icon={<FaTwitter />} colorScheme="twitter" variant="ghost"/>
						<IconButton aria-label="Google" icon={<FaGoogle />} variant="ghost" color="red.500"/>
						<IconButton aria-label="Instagram" icon={<FaInstagram />} variant="ghost" color="pink.500"/>
						<IconButton aria-label="LinkedIn" icon={<FaLinkedin />} colorScheme="linkedin" variant="ghost"/>
						<IconButton aria-label="GitHub" icon={<FaGithub />} variant="ghost" color="gray.800"/>
					</HStack>
				</VStack>
			</Flex>
			<Box bg="rgba(0, 0, 0, 0.2)" p="3" textAlign="center">
				<Text as="b">EPSI Bachelor : Concepteur Developpeur d'Application : option fullstack 
				</Text>
			</Box>
		</Box>
	)
}

export default Footer
