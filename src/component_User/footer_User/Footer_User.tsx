import { Box, Container, Typography, Link as MuiLink } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import type { FC, ReactNode } from 'react';

interface FooterLink {
  label: string;
  to: string;
}

interface FooterSectionProps {
  title: string;
  links: FooterLink[];
}

interface FooterTextLinkProps {
  href: string;
  children: ReactNode;
}

const Footer_User: FC = () => {
  return (
    <Box
      component="footer"

      sx={{
        borderTop: '1px solid #eee',
        mt: { xs: 6, sm: 8, md: 10 },
        py: { xs: 3, sm: 4, md: 6 },
      }}
    >
      <Container maxWidth="xl">

        <Box
          sx={{
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'space-between',
            gap: 3,
          }}
        >
          {/* Logo and Description */}
          <Box
            sx={{
              flexBasis: { xs: '100%', sm: '100%', md: '23%' },
              textAlign: { xs: 'center', md: 'left' },
            }}
          >

            <Typography
              variant="h5"
              sx={{
                fontWeight: 500,
                fontSize: { xs: '20px', sm: '24px', md: '26px' },
                letterSpacing: '.05rem',
                display: 'flex',
                justifyContent: { xs: 'center', md: 'flex-start' },
                alignItems: 'center',
                fontFamily: 'Poppins, sans-serif',
              }}
            >
              <span style={{ color: 'rgba(21, 44, 91, 1)' ,fontWeight:'700'}}>Stay</span>
              <span style={{ color: '#152C5B' }}>cation.</span>
            </Typography>
            <Typography
              variant="body2"
              color="text.secondary"
              sx={{ mt: 1, fontSize: '14px' }}
            >
              We kaboom your beauty holiday instantly and memorable.
            </Typography>
          </Box>

          {/* Beginners Section */}
          <FooterSection
            title="For Beginners"
            links={[
              { label: 'New Account', to: '/Register' },
              { label: 'Start Booking a Room', to: '/MasterUser/booking' },
              { label: 'Use Payments', to: '/MasterUser/booking' },
            ]}
          />

          {/* Explore Us */}
          <FooterSection
            title="Explore Us"
            links={[
              { label: 'Our Careers', to: '/MasterAdmin/users-list' },
              { label: 'Privacy', to: '#' },
              { label: 'Terms & Conditions', to: '#' },
            ]}
          />

          {/* Contact Section */}
          <Box
            sx={{
              flexBasis: { xs: '100%', sm: '48%', md: '23%' },
              textAlign: { xs: 'center', md: 'left' },
            }}
          >
            <Typography
              variant="subtitle1"
              sx={{
                fontWeight: 600,
                color: '#152C5B',
                fontSize: '18px',
                mb: 1,
              }}
            >
              Connect Us
            </Typography>

            <Box>
              <FooterTextLink href="mailto:support@staycation.id">
                support@staycation.id
              </FooterTextLink>
              <FooterTextLink href="tel:021-2208-1996">
                021 - 2208 - 1996
              </FooterTextLink>
              <Typography
                variant="body2"
                color="text.secondary"
                sx={{ fontSize: '14px' }}
              >
                Staycation, Kemang, Jakarta
              </Typography>
            </Box>
          </Box>
        </Box>

        {/* Footer Bottom */}

        <Box
          sx={{
            textAlign: 'center',
            mt: { xs: 4, sm: 5, md: 6 },
            pt: { xs: 3, sm: 4 },
            borderTop: { xs: '1px solid #eee', sm: 'none' },
          }}
        >

          <Typography
            variant="caption"
            color="text.secondary"
            sx={{ fontSize: { xs: '11px', sm: '12px' } }}
          >

            Copyright 2019 • All rights reserved • Staycation
          </Typography>
        </Box>
      </Container>
    </Box>
  );

};

const FooterSection: FC<FooterSectionProps> = ({ title, links }) => (
  <Box
    sx={{
      flexBasis: { xs: '100%', sm: '48%', md: '23%' },
      textAlign: { xs: 'center', md: 'left' },
    }}
  >
    <Typography
      variant="subtitle1"
      sx={{
        fontWeight: 600,
        color: '#152C5B',
        fontSize: '18px',
        mb: 1,
      }}
    >
      {title}
    </Typography>
    <Box>
      {links.map((link, index) => (
        <Typography
          key={index}
          variant="body2"
          sx={{ fontSize: '14px', mb: 0.5 }}
        >
          <MuiLink
            component={RouterLink}
            to={link.to}
            underline="none"
            color="text.secondary"
            sx={{
              '&:hover': { color: '#4e6ae3' },
            }}
          >
            {link.label}
          </MuiLink>
        </Typography>
      ))}
    </Box>
  </Box>
);

const FooterTextLink: FC<FooterTextLinkProps> = ({ href, children }) => (
  <Typography
    variant="body2"
    color="text.secondary"
    sx={{ fontSize: '14px', mb: 0.5 }}
  >
    <MuiLink
      href={href}
      underline="none"
      color="text.secondary"
      sx={{ '&:hover': { color: '#4e6ae3' } }}
    >
      {children}
    </MuiLink>
  </Typography>
);

export default Footer_User;
