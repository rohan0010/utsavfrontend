import React, { useState } from 'react'
import { Link } from "react-router-dom";
import { useDispatch } from 'react-redux';
import { fetchspecificproduct, fetchSearchGlobalTitle, fetchLowerPrice, fetchHigherPrice } from "../../../redux/actions/productActions";
const InsideMenu = ({ c }) => {
    const [yesMenu, setYesMenu] = useState(false);

    const dispatch = useDispatch();

    const menuOpen = () => {
        if (yesMenu) {
            setYesMenu(false);
        } else {
            setYesMenu(true);
        }
    }

    const callRedux = (categoryid, subcategoryid, cslug, sslug, cname) => {
        if (cname.includes("all") === true) {
            dispatch(fetchspecificproduct(categoryid, "", cslug, ""));

        }
        else {
            dispatch(fetchspecificproduct(categoryid, subcategoryid, cslug, sslug));
        }
        dispatch(fetchSearchGlobalTitle(null));
        dispatch(fetchLowerPrice(null));
        dispatch(fetchHigherPrice(null));

    }

    return (
        <div>
            <li className={!yesMenu ? "menu-item-has-children" : ""} onClick={menuOpen} >
                {/* <li key={i} className="menu-item-has-children" onClick={menuOpen}> */}
                <Link className="dropdownMenu">
                    {c.categoryname}
                </Link>
                <ul className="sub-menu">
                    {c.subcategory.filter(opt => opt.active !== false).map((s, j) => (
                        <li key={j} onClick={() => callRedux(c.categoryid, s.categoryid, c.slug, s.slug, s.categoryname)}>
                            <Link to={{ pathname: process.env.PUBLIC_URL + "/store/" + c.slug + "/" + s.slug, aboutProps: { categoryid: c.categoryid, subcategoryid: s.categoryid } }}>
                                {s.categoryname}
                            </Link>
                        </li>
                    ))}
                </ul>
            </li>
        </div>
    )
}

export default InsideMenu
