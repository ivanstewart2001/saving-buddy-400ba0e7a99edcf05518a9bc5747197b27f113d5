import React from "react";
import { startLogout } from "../../Actions/auth";
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
//style={{width:'14.28%', textAlign:'center', padding: '5px'}}
// /className="header" style={{bordersCollapse:'separate', bordersSpacing:'0 15px', width:'100%'}}
export const Header = ({ startLogout }) => (
    <table className="header">
      <tbody>
        <tr>
            <td>
              <Link to="/myDashboard" className="savingBuddyLink">
                <h1 className="borders">Saving Buddy</h1>
              </Link>
            </td>
            <td>
              <Link to="/bills" className="link">
                <h1 className="borders">Bills</h1>
              </Link>
            </td>
            <td>
            <Link to="/buckets" className="link">
              <h1 className="borders">Buckets</h1>
            </Link>
            </td>
            <td>
              <Link to="/calendar" className="link">
                <h1 className="borders">Calendar</h1>
              </Link>
            </td>
            <td>
              <Link to="/expenses" className="link">
                <h1 className="borders">Expenses</h1>
              </Link>
            </td>
            <td>
              <Link to="/income" className="link">
                <h1 className="borders">Income</h1>
              </Link>
            </td>
            <td>
              <Link to="/tips" className="link">
                <h1 className='borders' >Tips</h1>
              </Link>
            </td>
            <td >
              <button className="logoutbutton" onClick={startLogout}>Logout</button>
            </td>
        </tr>
      </tbody>
    </table>
);

const mapDispatchToProps = (dispatch) => ({
    startLogout: () => dispatch(startLogout())
});
  
export default connect(undefined, mapDispatchToProps)(Header);