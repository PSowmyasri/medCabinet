import { useState } from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import { toast } from 'react-toastify';
import { addFile , addFolder} from '../actions/file';
import '../App.css';
const NewFile = () => {
    let history = useHistory();
    const folderId = history.location.state ? history.location.state.folderId : '';
    console.log(folderId)
    const [name, setName] = useState('');
    const [type, setType] = useState('Prescription');
    const [img, setImg] = useState(null);
    const currentUser = useSelector(state => state.authReducer).user;
    // console.log("current user " + currentUser.email);
    // const currentUser = JSON.parse(window.localStorage.getItem('user')).user;
    const handlefile = (event) => {
        setImg(event.target.value);
    }
    const onChangeName = (event) => {
        setName(event.target.value)
    }
    const onChangeFileType = (event) => {
        setType(event.target.value)
    }
    const handleUpload = async (event) => {
        try {
            event.preventDefault();
            const token = JSON.parse(window.localStorage.getItem('user')).token
            const formData = new FormData();
            formData.append('addedBy',currentUser.email);
            formData.append('fileName', name);
            formData.append('fileType',type);
            formData.append('content', img);
            // console.log(formData.values());
            // const res = await addFile(token, formData);
            if(folderId){
            const res = await addFile(token, {
                files: [{
                    name: name,
                    fileType: type,
                    content: img.toString("base64")
                }]

            }, folderId);
            console.log(res);
            toast.success("file uploaded");
        }
        else{

            const res = await addFolder(token, {
                addedBy: currentUser.email,
                files: [{
                    name: name,
                    fileType: type,
                    content: img.toString("base64")
                }]

            });
            // const res = await addFolder(token, formData);
            console.log(res);
            toast.success("file uploaded");
        }


        }
        catch (err) {
            console.log(err);
            toast.error(err.response.data.message)
        }

    }
    return (
        // <div>
        //     <input type="file" onChange={handlefile} />
        //     <button onClick={handleUpload}>Upload</button>
        // </div>
        <div className="col-md-12">
            <h2 style={{ display: "flex", justifyContent: "center" }}>Add your File</h2>
            <div className="card card-container">
                <form onSubmit={handleUpload}>
                    <div className='form-group' style={{ display: "flex", justifyContent: "left" }}>
                        <label htmlFor="name"> File Name</label>
                        <input
                            type='text'
                            className='form-control'
                            name='name'
                            value={name}
                            onChange={onChangeName} />
                    </div>

                    <div className='form-group' style={{ display: "flex", justifyContent: "left" }}>
                        <label htmlFor="Type">Choose File Type</label>
                        <select name='fileType' defaultValue={type} className='form-control' onChange={onChangeFileType}>
                            <option value='Prescription'>Prescription</option>
                            <option value='Report' > Report</option>
                        </select>
                    </div>
                    <div className='form-group' style={{ display: "flex", justifyContent: "center" }}>
                        {/* <label htmlFor="Type">select File</label> */}
                        <input type="file" onChange={handlefile} />
                    </div>
                    <div className="form-group" style={{ display: "flex", justifyContent: "center" }}>
                        <button className="btn-header">Upload</button>
                    </div>
                </form>
            </div>
        </div>
    )
}
export default NewFile;