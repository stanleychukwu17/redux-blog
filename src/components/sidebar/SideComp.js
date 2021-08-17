import {connect} from 'react-redux'
import { useQuery } from 'react-query';
import { BsReverseLayoutTextWindowReverse } from "react-icons/bs";
import { BiLike, BiCommentAdd } from "react-icons/bi";


import './SideComp.css'
import {newLike4BlogAdded} from '../../redux/actions'
import setup from '../setup'


async function fecthOnlyThisBlog (id) {
    const blogs = await fetch(`${setup.back_end_url}/blogs/one-blog/${id}`);
    const fbg = await blogs.json();
    return fbg;
}


const SideComp = (props) => {
    // fetches the indivial blog details
    const {data, isLoading} = useQuery(['one_blog', id], () => fecthOnlyThisBlog(id), {staleTime: 300000}); // 5 mintues of staletime

    props.newLike4BlogAdded({'blake':'van'}); // update the current likes for us

    return (
        !props.logged_in_page_open && (
            <div className="it_fl HmLft_sd">
                <div className="SdrLst1">Lastest activites</div>
                <div className="SdrDts2">
                    <div><p>Stanley posted a new blog</p></div>
                    <div><p>Stanley posted a new blog</p></div>
                </div>
                <div className="ibm_hdr">
                    <div className="it_fl ibm_Ech"><i><BsReverseLayoutTextWindowReverse /></i> 5</div>
                    <div className="it_fl ibm_Ech"><i><BiLike /></i> {props.likes}</div>
                    <div className="it_fl ibm_Ech"><i><BiCommentAdd /></i> 25</div>
                </div>
            </div>
        )
    );
}

let mapStateToProps = (state) => {
    return {'logged_in_page_open':state.logged_in_page_open, 'likes':state.likes}
}

let mapDispatchToProps = dispatch => {
    return {newLike4BlogAdded : (dts) => dispatch(newLike4BlogAdded(dts))}
}

export default connect(mapStateToProps, mapDispatchToProps)(SideComp);