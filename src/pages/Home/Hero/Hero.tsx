import Button, { ButtonProps} from '@mui/material/Button';
import { styled }from '@mui/material/styles';
import { blue } from '@mui/material/colors';
import { FaLongArrowAltRight } from "react-icons/fa";
import './Hero.css'

const HeaderCta = styled(Button)<ButtonProps>(({ theme }) => ({
  fontSize: '1.5rem',
  fontFamily: 'var(--primary-font)',
  fontWeight: 400,
  color: theme.palette.getContrastText(blue[500]),
  backgroundColor: blue[500],
  '&hover': {
    backgroundColor: blue[700],
  }
}));

function Hero() {
  return (
    <>
      <section className="hero-section">
        <div className="hero-content">
          <h1 className="hero-title">Your voice matters. Let the world hear it.</h1>
          <p className="hero-description">
          You’re not just writing—you’re helping others see. Someone needs your perspective to see things clearly.
          </p>
          <div className="hero-cta">
          <HeaderCta variant="contained"  component="a" href="#" sx={{ textTransform:  'capitalize'}}>Get Started <FaLongArrowAltRight />
          </HeaderCta>
          <Button variant="text" component="a" href="#" sx={{ textTransform:  'capitalize', fontSize: '1.8rem', fontFamily: 'var(--primary-font)', fontWeight: 400, color: 'var(--color-blue)'}}>
            Find top Stories</Button>
          </div>
        </div>
      </section>
    </>
  )
}

export default Hero
