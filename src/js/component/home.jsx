import React,{useState,useEffect} from "react";

//include images into your bundle
import rigoImage from "../../img/rigo-baby.jpg";

//create your first component
const Home = () => {
	const[listaTareas,setListaTareas]=useState(["Aprender React", "Aprender Python"])
	const [tarea, setTarea]=useState("")

	const crearUsuario= async()=>{
		try {
			const response= await fetch("https://playground.4geeks.com/todo/users/capapra29",{
				method:"POST",
				headers:{"Content-Type":"application/json"}
			})
			if(response.status==201){
				cargarTareas()
			}
			return true
		} catch (error) {
			console.log(error)
			return false
		}
	}

	const cargarTareas= async()=>{
		try {
			const response= await fetch("https://playground.4geeks.com/todo/users/capapra29",{
				method:"GET",
				headers:{"Content-Type":"application/json"}
			})
			if(response.status==404){
				crearUsuario()
				return
			}
			const data=await response.json()
			console.log (data)
			setListaTareas(data.todos)
			return true
		} catch (error) {
			console.log(error)
			return false
		}
	}
	const agregarTarea= async(evento)=>{
		evento.preventDefault()
		//setListaTareas([...listaTareas, tarea])
		const response=await fetch("https://playground.4geeks.com/todo/todos/capapra29",{
			method:"POST",
				headers:{"Content-Type":"application/json"},
				body: JSON.stringify({
					"label": tarea,
  					"is_done": false
				})
			})
			if(response.status==201){
				cargarTareas()
			}

		setTarea("")
	}
	const eventoEnter=(evento)=>{
		if(evento.key=="Enter"){
			agregarTarea(evento)
		}
	}
	const borrarTarea=async(evento, id)=> {
		evento.preventDefault()
		// let aux = listaTareas.filter((item,index)=>{
		// 	return(index!=  id)
		// })
		// setListaTareas(aux)
		const response=await fetch("https://playground.4geeks.com/todo/todos/"+id,{
			method:"DELETE",
				headers:{"Content-Type":"application/json"},
			})
			if(response.status==204){
				cargarTareas()
			}
	}

	useEffect(()=>{
cargarTareas()
	},[])
	return (
		<div className="text-center container">
			<h1> To Do List </h1>
			<input type="text" className="form-control" value={tarea} onChange={(e)=>setTarea(e.target.value)} onKeyDown={eventoEnter}/> 
			<div className="mt-3"> 
				<ul className="list-group">
					{listaTareas.map((item,index)=>(
						<li className="list-group-item" key={index}>
							{item.label}
							<i className="fa fa-trash float-end fs-4 text-danger icono-oculto"
							onClick={(evento)=> borrarTarea(evento,item.id)}> </i>
							</li>
					))}
					</ul>
				</div>
				<p className="mt-2 text-end">Tareas Pendientes: { listaTareas.length}
				</p>
		</div>
	);
};

export default Home;
