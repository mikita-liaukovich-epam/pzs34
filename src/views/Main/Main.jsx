import React, { useEffect, useState } from "react";
import Header from '../../components/Header/Header';
import { useDispatch } from 'react-redux';

import "./Main.scss";
import actions from '../../utils/actions';

export default function Main() {
  const dispatch = useDispatch();

  useEffect(() => {
    const ls = localStorage.getItem('assistant_theme');
    if (ls !== undefined) {
      dispatch({type: actions.SET_THEME, payload: JSON.parse(ls)})
      document.body.classList.toggle('dark-theme', JSON.parse(ls))
    } else {
      localStorage.setItem('assistant_theme', false)
    }
  }, [])

  return (<>
    <Header />
  </>)
}
