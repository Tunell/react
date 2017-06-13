import React from "react";
import LoadJson from "./functions/LoadJson";
import {connect} from "react-redux";
import {fetchJsonWithSpecifiedStore} from "./materialGetters/materialGettersAction";


const mapStateToProps = (state) => ({
    user: state.user,
    users: state.resources.users.json,
});

    @connect(mapStateToProps)
export default class FileUpload extends React.Component {
    constructor(props) {
        super(props);
    }

    uploadFile(file, signedRequest, url){
        const xhr = new XMLHttpRequest();
        xhr.open('PUT', signedRequest);
        xhr.onreadystatechange = () => {
            if(xhr.readyState === 4){
                if(xhr.status === 200){
                    alert('Uploaded file!');
                }
                else{
                    alert('Could not upload file.');
                }
            }
        };
        xhr.send(file);
    }

    getSignedRequest(file){

        let myHeaders = new Headers();
        myHeaders.append('api_key', 'pellejohn')
        myHeaders.append('Authorization', 'Basic '+btoa('hubben:kunskapsnavet'))

        let myInit = {
            method: "GET",
            headers: myHeaders,
            mode: 'cors',
            cache: 'default',
            credentials: 'include',
            'Accept': 'application/json'
        };

        const {user, users} = this.props
        const [{name}] = users.filter( aUser => aUser.id == user)
        let url = `http://localhost:8080/api/sign-s3?file-name=${file.name}&file-type=${file.type}&entreprenad=${name}`
        const myRequest = new Request(url, myInit)
        fetch(myRequest)
            .then( res => {
                return res.json()
            } )
            .then( data => {
                return this.uploadFile(file, data.signedRequest, data.url)
            })
    }


    initUpload(){
        const files = document.getElementById('file-input').files;
        const file = files[0];
        if(file == null){
            return alert('No file selected.');
        }
        this.getSignedRequest(file);
    }

    render() {
        return (
            <div>
                <input type="file" id="file-input" onChange={ () => this.initUpload()}/>
            </div>
        )
    }
}

