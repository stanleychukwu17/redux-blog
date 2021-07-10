import {connect} from 'react-redux'
import './SideComp.css'


const SideComp = (props) => {

    return (
        !props.logged_in_page_open && (
            <div className="it_fl HmLft_sd">
                <div className="SdrLst1">Lastest activites</div>
                <div className="SdrDts2">
                    <div><p>Stanley posted a new blog</p></div>
                    <div><p>Stanley posted a new blog</p></div>
                </div>
                <div className="ibm_hdr">
                    <div className="it_fl ibm_Ech"><p>Total blogs</p><p>5</p></div>
                    <div className="it_fl ibm_Ech"><p>Total likes</p><p>15</p></div>
                </div>
            </div>
        )
    );
}

let mapStateToProps = (state) => {
    return {'logged_in_page_open':state.logged_in_page_open}
}
export default connect(mapStateToProps)(SideComp);