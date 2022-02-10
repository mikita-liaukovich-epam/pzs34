import React, { useState } from 'react';

import './Header.scss';

import { useDispatch, useSelector } from 'react-redux';
import { Button, Container, FormControl, InputGroup, Toast } from 'react-bootstrap'
import { addUser, deleteUser, getUser } from "../../utils/dbService";
import loginIcon from '../../assets/UI/padlock.png';
import userIcon from '../../assets/UI/user.png';
import { decrypt } from "../../utils/crypt";
import actions from "../../utils/actions";

export default function Header() {
  const { user } = useSelector(state => state);
  const [name, setName] = useState("");
  const [pwd, setPwd] = useState("");
  const [toast, setToast] = useState(null);
  const [tries, setTries] = useState(0);

  const dispatch = useDispatch();

  const handleLogin = (e) => {
    if (name && pwd) {
      getUser({ name }).then((res) => {

        if (decrypt(res.pwd || "") === pwd) {
          dispatch({type: actions.SET_USER, payload: { name }});
          setTries(0);
          setPwd("");
        } else if (!res.name) {
          const regExp = /[_@!+*#]/g;

          if (!pwd.match(regExp)) {
            setToast({subtitle: "Пароль должен включать специальные символы (_@!+*#) !"});
            return;
          }

          if (pwd.length >= 10 && name.length >= 6) {
            addUser({ name, pwd }).then(() => {
              setToast({subtitle: "Пользователь зарегистрирован успешно!"});
              dispatch({type: actions.SET_USER, payload: { name }});
              setPwd("");
            });
          } else {
            setToast({subtitle: "Минимальная длина пароля - 10, а имени - 6 символов!"});
          }
        } else {
          setTries((tries) => tries + 1);
          if (tries >= 3) {
            setToast({subtitle: "Вы превысили количество попыток входа!"});
          } else setToast({subtitle: "Неверный пароль!"});
        }
      });
    } else {
      setToast({subtitle: "Необходимо ввести имя и пароль!"});
    }
  }

  const handleDelete = () => {
    deleteUser(user);
    dispatch({type: actions.SET_USER, payload: null});
  }

  return (<>
    <header>
      <Container>
        <h2>ПЗС. Лабораторная работа 2.1</h2>

        <div className="centralized">
          <div className="image-wrapper">
            <img className="image" src={user ? userIcon : loginIcon} alt="" />
          </div>
          { !user && <>
            <InputGroup>
              <InputGroup.Text>Имя</InputGroup.Text>
              <FormControl
                type="text"
                placeholder="Ivan_Ivanov"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </InputGroup>
            <InputGroup>
              <InputGroup.Text>Пароль</InputGroup.Text>
              <FormControl
                type="password"
                placeholder="•••••••••"
                value={pwd}
                onChange={(e) => setPwd(e.target.value)}
              />
            </InputGroup>
            <Button variant="light" onClick={handleLogin}>Войти или зарегистрироваться</Button>
          </> }
          { user && <>
            <h5 className="mb-3">{user.name}</h5>
            <Button variant="light" onClick={() => dispatch({type: actions.SET_USER, payload: null})}>Выйти</Button>{' '}
            <Button variant="danger" onClick={handleDelete}>Удалить аккаунт</Button>{' '}
          </> }
        </div>
      </Container>
    </header>
    <Toast onClose={() => setToast(null)} show={!!toast} delay={3000} autohide className="notification">
      <Toast.Header>
        <img
          src={loginIcon}
          className="rounded me-2"
          alt=""
        />
        <strong className="me-auto">ПЗС</strong>
        <small>Сейчас</small>
      </Toast.Header>
      <Toast.Body>{toast?.subtitle}</Toast.Body>
    </Toast>
  </>)
}