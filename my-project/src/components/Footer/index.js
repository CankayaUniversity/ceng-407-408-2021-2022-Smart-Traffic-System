import React from 'react'
import { animateScroll as scroll } from 'react-scroll'
import {
  FaFacebook,
  FaGithub,
  FaInstagram,
  FaLinkedin,
  FaTwitter,
  FaYoutube,
} from 'react-icons/fa'
import {
  FooterContainer,
  FooterWrap,
  FooterLinksContainer,
  FooterLinksWrapper,
  FooterLinkItems,
  FooterLinkTitle,
  FooterLink,
  SocialMedia,
  SocaialMediaWrap,
  SocialLogo,
  WebsiteRights,
  SocialIcons,
  SocialIconLink,
} from './FooterElements'

const Footer = () => {
  const toggleHome = () => {
    scroll.scrollToTop()
  }

  return (
    <FooterContainer>
      <FooterWrap>
        <FooterLinksContainer>
          <FooterLinksWrapper>
            <FooterLinkItems>
              <FooterLinkTitle>About Us</FooterLinkTitle>
              <FooterLink to='/signin'>How it works?</FooterLink>
              <FooterLink to='/signin'>Careers</FooterLink>
              <FooterLink to='/signin'>Project Members</FooterLink>
              <FooterLink to='/signin'>Investors</FooterLink>
              <FooterLink to='/signin'>Terms of Service</FooterLink>
            </FooterLinkItems>
            <FooterLinkItems>
              <FooterLinkTitle>Contact Us</FooterLinkTitle>
              <FooterLink to='contact'>Contact</FooterLink>
              <FooterLink to='contact'>Support</FooterLink>
              <FooterLink to='contact'>Sponsorships</FooterLink>
            </FooterLinkItems>
          </FooterLinksWrapper>
          <FooterLinksWrapper>
            <FooterLinkItems>
              <FooterLinkTitle>Videos</FooterLinkTitle>
              <FooterLink to='/'>The Camera Videos</FooterLink>
              <FooterLink to='/'>Ambassadors</FooterLink>
              <FooterLink to='/'>Agency</FooterLink>
              <FooterLink to='/'>Influencer</FooterLink>
            </FooterLinkItems>
            <FooterLinkItems>
              <FooterLinkTitle>Social Media</FooterLinkTitle>
              <FooterLink to='/'>Instagram</FooterLink>
              <FooterLink
                to='//www.github.com/CankayaUniversity/ceng-407-408-2021-2022-Smart-Traffic-System'
                target='_blank'
              >
                Github
              </FooterLink>
              <FooterLink to='/'>Facebook</FooterLink>
              <FooterLink to='/'>Youtube</FooterLink>
              <FooterLink to='/'>Linkedin</FooterLink>
              <FooterLink to='/'>Twitter</FooterLink>
            </FooterLinkItems>
          </FooterLinksWrapper>
        </FooterLinksContainer>
        <SocialMedia>
          <SocaialMediaWrap>
            <SocialLogo to='/' onClick={toggleHome}>
              Smart Traffic Systems
            </SocialLogo>
            <WebsiteRights>
              Smart Traffic Systems © {new Date().getFullYear()} All rights
              reserved.
            </WebsiteRights>
            <SocialIcons>
              <SocialIconLink href='/' target='_blank' aria-label='Facebook'>
                <FaFacebook />
              </SocialIconLink>
              <SocialIconLink href='/' target='_blank' aria-label='Instagram'>
                <FaInstagram />
              </SocialIconLink>
              <SocialIconLink
                href='//www.github.com/CankayaUniversity/ceng-407-408-2021-2022-Smart-Traffic-System'
                target='_blank'
                aria-label='Github'
              >
                <FaGithub />
              </SocialIconLink>
              <SocialIconLink href='/' target='_blank' aria-label='Youtube'>
                <FaYoutube />
              </SocialIconLink>
              <SocialIconLink href='/' target='_blank' aria-label='Linkedin'>
                <FaLinkedin />
              </SocialIconLink>
              <SocialIconLink href='/' target='_blank' aria-label='Twitter'>
                <FaTwitter />
              </SocialIconLink>
            </SocialIcons>
          </SocaialMediaWrap>
        </SocialMedia>
      </FooterWrap>
    </FooterContainer>
  )
}

export default Footer
