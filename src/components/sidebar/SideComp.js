import {connect} from 'react-redux'
import { useQuery } from 'react-query';
import {Link} from 'react-router-dom'
import { BsReverseLayoutTextWindowReverse } from "react-icons/bs";
import { BiUserPin, BiCommentAdd } from "react-icons/bi";


import './SideComp.css'
import setup from '../setup'


async function fetchAllActivities () {
    const acty = await fetch(`${setup.back_end_url}/activities/getActivities/`);
    const fbg = await acty.json();
    return fbg;
}


const SideComp = (props) => {
    // fetches the indivial blog details
    const {data, isLoading} = useQuery('getActivities', () => fetchAllActivities(), {staleTime: 300000}); // 5 mintues of staletime
    console.log(data)

    return (
        !props.logged_in_page_open && (
            <div className="it_fl HmLft_sd">
                <div className="SdrLst1">Lastest activites</div>
                <div className="SdrDts2">
                    {isLoading && <div>Loadding</div>}
                    {!isLoading && data?.rq.map(jk => <div className="SdrCC" key={jk.id} id={jk.id}><Link to={jk.url}>{jk.actTxt}</Link></div>)}
                </div>
                <div className="ibm_hdr">
                    <div className="it_fl ibm_Ech"><i><BsReverseLayoutTextWindowReverse /></i> {data?.totB}</div>
                    <div className="it_fl ibm_Ech"><i><BiUserPin /></i> {data?.totU}</div>
                    <div className="it_fl ibm_Ech"><i><BiCommentAdd /></i> {data?.totC}</div>
                </div>
            </div>
        )
    );
}

let mapStateToProps = (state) => {
    return {'logged_in_page_open':state.logged_in_page_open}
}

export default connect(mapStateToProps)(SideComp);