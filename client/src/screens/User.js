
const User = () =>{

    
    const name = JSON.parse(window.localStorage.getItem('user')).user.name
    console.log(name)
    return (
            <div className="dashboard-header" style={{display:"flex", justifyContent:"center"}}>
                <h1>Welcome {name} !!!</h1>               
            </div>
    )
}

export default User;