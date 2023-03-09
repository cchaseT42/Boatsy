import github  from '../assets/github-mark-white.png'
import linkedin from '../assets/linkin.png'

function Footer() {
  return (
      <div className="footer">
          <div className='socials'>
            <a href="https://github.com/cchaseT42" target="_blank">
            <div className="github">
            <img id="socialimg" src={github}></img>
            </div>
            </a>
            <a href='https://www.linkedin.com/in/chase-towe-89673523a/' target="_blank">
            <div className='linkedin'>
            <img id="socialimg2" src={linkedin}></img>
            </div>
            </a>
          </div>
      </div>
  )
}

export default Footer
