import React from 'react'
import { Redirect } from 'react-router-dom';

export default function Logout() {
    sessionStorage.clear(); //Limpar a sessionStorage
    return (
        <Redirect to={{ pathname: '/' }} />//Redirecionar para a tela principal
    )
}
