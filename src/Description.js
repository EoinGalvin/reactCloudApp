import PropTypes from 'prop-types'
import './description.css'

const Description = ({ DescriptionText }) => (
    <div><p>{DescriptionText}</p></div>
  );
  
  Description.propTypes = {
    DescriptionText: PropTypes.string.isRequired
  };
  
  export default Description;