import {connect} from 'react-redux'
import './SideComp.css'


const SideComp = () => {
    return (
        <div className="">
            <div className="SdrLst1">Lastest activites</div>
            <div className="SdrDts2">
                <div><p>Stanley posted a new blog</p></div>
                <div><p>Stanley posted a new blog</p></div>
            </div>
        </div>
    );
}

let mapStateToProps = (state) => {
    return {'logged_in_page_open':state.logged_in_page_open}
}
export default connect(mapStateToProps)(SideComp);