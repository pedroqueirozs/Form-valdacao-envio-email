import styles from './Form.module.css'
import {useForm} from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import { useState } from 'react';
import emailjs from '@emailjs/browser'


const schema = yup.object({
  name: yup.string().required('O campo nome é obrigatório'),
  email: yup.string().email('Digite um e-mail valido ').required("O campo de e-mail é obrigatório"),
  password: yup.string().required('O campo senha é obrigatório'),
  confPassword: yup.string().required('Confirmar a senha é obrigatório').oneOf([yup.ref("password")],"As senhas devem ser iguais"),
}).required();

function Form (){
  const { register, handleSubmit, watch, formState: { errors } } = useForm({resolver: yupResolver(schema)});
  // const dados = data => console.log(data);
  // const dados = dadosUsuario=> console.log(dadosUsuario);

  const [name, setName]=useState()
  const [email, setEmail]=useState()
  const [password, setPassword]=useState()
  const [confPassword, setConfPassword]=useState()


  function dadosUsuario (){
    
    const templateParams= {
      from_name:name,
      from_senha:password,
      from_confSenha:confPassword,
      email:email,
    }
emailjs.send("service_jo9zlrj","template_3ty0r9u",templateParams,"MhH2FnQ333PYWHVKH" )
.then((response) =>{
  alert("Dados enviados com Sucesso ", response.status, response.text)
  setConfPassword =""
  setEmail=""
  setName=""
  setPassword=""

},(err)=>{
  alert=("Erro ao enviar os dados " ,err)
})
  }

  return(
    <div>
    <h1 >
    REGISTER
    </h1>

    <form className={styles.Form} onSubmit={handleSubmit(dadosUsuario)}>
    <input placeholder="Username" {...register("name") } onChange={(e)=>setName(e.target.value)} ></input>
    <span>{errors.name?.message}</span>

    <input placeholder="E-mail" {...register('email')} onChange={(e)=>setEmail(e.target.value)}></input>
    <span>{errors.email?.message}</span>

    <input type="password" placeholder="Password" {...register("password")}onChange={(e)=>setPassword(e.target.value)} ></input>
    <span>{errors.password?.message}</span>


    <input type ="password" placeholder=" Confirm Password" {...register("confPassword")} onChange={(e)=>setConfPassword(e.target.value)} ></input>
    <span>{errors.confPassword?.message}</span>

    <button type="submit">ENTER</button>
   
      
    <span>Already have an account? <a href="##">Sign In</a></span>
    </form>
    </div>
  )

}
export default Form